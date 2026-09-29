import { NextRequest, NextResponse } from 'next/server'
import { CHAT_LIMITER } from '@/lib/rateLimit'

export const maxDuration = 60

// This is the chatbot FloatingChatWrapper actually calls (verified 2026-08-04 —
// SmartChat/ChatBot/floatchat route were dead scaffolding pointing nowhere).
// Scoped system prompt + multi-tier fallback + rate limit per §J/§Y/§Z5.
const SYSTEM_PROMPT = `You are the SpeakIQ assistant — help with speaking practice, pronunciation, interview prep, language learning, and using the SpeakIQ app. Be concise, warm, and encouraging (3-5 sentences unless detail is needed).

If asked anything outside speaking/language practice, respond: "I'm trained for SpeakIQ. For that, try Google or ChatGPT!"`

async function callGroq(model: string, userMsg: string, key: string) {
  const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${key}` },
    body: JSON.stringify({
      model,
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        { role: 'user', content: userMsg },
      ],
      max_tokens: 400,
    }),
  })
  if (!res.ok) throw new Error(`groq ${model} ${res.status}`)
  const data = await res.json()
  const text = data.choices?.[0]?.message?.content
  if (!text) throw new Error('empty response')
  return text
}

// Last-resort fallback when every Groq model fails (bad key / outage / rate limit)
async function geminiFallback(system: string, userText: string, maxTokens = 400): Promise<string | null> {
  const gk = process.env.GEMINI_API_KEY
  if (!gk) return null
  try {
    const r = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-lite:generateContent?key=${gk}`, {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ systemInstruction: { parts: [{ text: system }] }, contents: [{ role: 'user', parts: [{ text: userText }] }], generationConfig: { maxOutputTokens: maxTokens, temperature: 0.6 } }),
    })
    if (!r.ok) return null
    return (await r.json()).candidates?.[0]?.content?.parts?.[0]?.text ?? null
  } catch { return null }
}

export async function POST(req: NextRequest) {
  const limited = CHAT_LIMITER.check(req)
  if (limited) return limited

  const { messages } = await req.json()
  const userMsg = messages?.[messages.length - 1]?.content || ''

  const groqKey = process.env.GROQ_API_KEY || ''
  if (!groqKey) return NextResponse.json({ text: 'Chat is resting — try again in a moment.' })

  // Fallback chain: primary Groq model → faster Groq model → graceful message.
  // Never a 500 or blank screen to the user (§Y).
  for (const model of ['qwen/qwen3.8-27b', 'openai/gpt-oss-20b']) {
    try {
      const text = await callGroq(model, userMsg, groqKey)
      return NextResponse.json({ text })
    } catch { /* try next tier */ }
  }
  const gt = await geminiFallback(SYSTEM_PROMPT, userMsg)
  if (gt) return NextResponse.json({ text: gt })
  return NextResponse.json({ text: 'Chat is temporarily unavailable. Please try again shortly.' }, { status: 503 })
}
