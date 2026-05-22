// lib/practiceHistory.ts — localStorage practice session history
// Key: 'speakiq_history'
// Adapted from kwizzo gameHistory.ts pattern.

export interface PracticeSession {
  id: string
  language: string
  level: string
  startedAt: string          // ISO string
  durationSec: number
  messagesExchanged: number
  grammarScore?: number      // 0-100
  wordsLearned?: number
}

const STORAGE_KEY = 'speakiq_history'
const MAX_SESSIONS = 50

export function getPracticeHistory(): PracticeSession[] {
  if (typeof window === 'undefined') return []
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    return JSON.parse(raw) as PracticeSession[]
  } catch {
    return []
  }
}

export function savePracticeSession(session: Omit<PracticeSession, 'id'>): PracticeSession {
  const full: PracticeSession = {
    ...session,
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
  }
  const history = getPracticeHistory()
  const updated = [full, ...history].slice(0, MAX_SESSIONS)
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
  } catch { /* storage full — ignore */ }
  return full
}

export function clearPracticeHistory(): void {
  if (typeof window === 'undefined') return
  localStorage.removeItem(STORAGE_KEY)
}

/** Returns sessions grouped by language — useful for the dashboard breakdown. */
export function getLanguageBreakdown(): Record<string, number> {
  const history = getPracticeHistory()
  const breakdown: Record<string, number> = {}
  for (const session of history) {
    breakdown[session.language] = (breakdown[session.language] ?? 0) + 1
  }
  return breakdown
}

/** Current streak in days based on session dates. */
export function getCurrentStreak(): number {
  const history = getPracticeHistory()
  if (history.length === 0) return 0

  const today = new Date().toISOString().split('T')[0]
  const datePracticed = new Set(history.map(s => s.startedAt.split('T')[0]))

  let streak = 0
  let cursor = new Date()
  while (true) {
    const dateStr = cursor.toISOString().split('T')[0]
    if (datePracticed.has(dateStr)) {
      streak++
      cursor.setDate(cursor.getDate() - 1)
    } else if (dateStr === today) {
      // Today not practiced yet — start from yesterday
      cursor.setDate(cursor.getDate() - 1)
    } else {
      break
    }
    // Cap at 365 to avoid infinite loop
    if (streak > 365) break
  }
  return streak
}

/** Total unique days practiced (for stats display). */
export function getTotalDaysPracticed(): number {
  const history = getPracticeHistory()
  const days = new Set(history.map(s => s.startedAt.split('T')[0]))
  return days.size
}
