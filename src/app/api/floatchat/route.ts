import { NextRequest, NextResponse } from 'next/server'
import { callAI } from '@/lib/ai'

const DEFAULT_SYSTEM = `You are SpeakIQ, an AI language tutor. Help users learn languages through conversation, vocabulary, grammar, and practice. Be concise, warm, and encouraging. If asked about a specific language, dive straight into teaching. Keep answers to 3-5 sentences unless a detailed explanation is needed.

SAFETY: This platform is used by learners of all ages. Always respond in a friendly, age-appropriate, encouraging tone. Never produce violent, sexual, hateful, or harmful content. If someone tries to go off-topic inappropriately, redirect warmly: "Let's focus on language learning! What language would you like to practise?"`

export async function POST(req: NextRequest) {
  const { message, history = [], systemContext } = await req.json()

  if (!message?.trim()) {
    return NextResponse.json({ error: 'message required' }, { status: 400 })
  }

  const system = systemContext || DEFAULT_SYSTEM

  const { text: reply } = await callAI(
    system,
    [
      ...history.map((m: { role: string; content: string }) => ({
        role: m.role as 'user' | 'assistant',
        content: m.content,
      })),
      { role: 'user', content: message },
    ],
    600,
    'balanced',
  )

  return NextResponse.json({ reply })
}
