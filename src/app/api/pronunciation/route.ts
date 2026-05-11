import { NextRequest, NextResponse } from 'next/server'
import { callAI } from '@/lib/ai'

export async function POST(req: NextRequest) {
  const { spoken, expected, language } = await req.json()
  if (!spoken || !expected) return NextResponse.json({ error: 'Missing params' }, { status: 400 })

  const system = `You are a pronunciation coach. Return ONLY valid JSON.`
  const prompt = `A student learning ${language} tried to say: "${expected}"
What they said (from speech recognition): "${spoken}"

Rate their pronunciation and return:
{
  "score": <0-100 integer>,
  "feedback": "<1 sentence specific feedback>",
  "tip": "<1 sentence improvement tip>"
}`

  try {
    const { text } = await callAI(system, [{ role: 'user', content: prompt }], 200, 'fast')
    const result = JSON.parse(text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim())
    return NextResponse.json(result)
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}
