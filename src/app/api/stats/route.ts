import { NextRequest, NextResponse } from 'next/server'

let counts = { sessionsCompleted: 0, wordsSpoken: 0, feedbackGenerated: 0 }

export async function GET() {
  return NextResponse.json(counts)
}

export async function POST(req: NextRequest) {
  const { event } = await req.json()
  if (event === 'session_completed') counts.sessionsCompleted++
  if (event === 'words_spoken') counts.wordsSpoken++
  if (event === 'feedback_generated') counts.feedbackGenerated++
  return NextResponse.json({ ok: true })
}
