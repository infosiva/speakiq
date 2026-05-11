import { NextRequest, NextResponse } from 'next/server'
import { callAI } from '@/lib/ai'

export async function POST(req: NextRequest) {
  const { stats } = await req.json()
  const system = `You are a friendly language coach. Return ONLY valid JSON.`
  const prompt = `Generate a weekly progress summary for a language learner.

Stats this week:
- Lessons completed: ${stats.lessons}
- Words learned: ${stats.words}
- Streak: ${stats.streak} days
- XP earned: ${stats.xp}
- Conversation turns: ${stats.conversationTurns}
- Languages studied: ${stats.languages?.join(', ') ?? 'unknown'}

Return:
{
  "headline": "<1 encouraging headline, max 10 words>",
  "summary": "<2-3 sentences about their progress>",
  "highlight": "<the single best thing they did this week>",
  "suggestion": "<one specific thing to focus on next week>"
}`

  try {
    const { text } = await callAI(system, [{ role: 'user', content: prompt }], 400, 'fast')
    const result = JSON.parse(text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim())
    return NextResponse.json(result)
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}
