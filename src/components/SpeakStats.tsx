'use client'
// components/SpeakStats.tsx — compact progress pill strip
// Reads stats from localStorage key 'speakiq_stats' and displays them inline.
// Called from converse/page.tsx — 'use client' so localStorage is safe.

import { useEffect, useState } from 'react'

interface Stats {
  sessionsCompleted: number
  wordsPracticed: number
  /** Array of recent accuracy scores (0-100) — last 5 sessions */
  accuracyHistory: number[]
}

const STORAGE_KEY = 'speakiq_stats'

function defaultStats(): Stats {
  return { sessionsCompleted: 0, wordsPracticed: 0, accuracyHistory: [] }
}

export function loadStats(): Stats {
  if (typeof window === 'undefined') return defaultStats()
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? (JSON.parse(raw) as Stats) : defaultStats()
  } catch {
    return defaultStats()
  }
}

export function saveStats(patch: Partial<Stats>) {
  if (typeof window === 'undefined') return
  try {
    const current = loadStats()
    const updated: Stats = { ...current, ...patch }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
  } catch { /* quota exceeded — ignore */ }
}

/** Increment session count + optionally push an accuracy score */
export function recordSession(accuracyScore?: number) {
  const s = loadStats()
  const history = accuracyScore != null
    ? [...s.accuracyHistory.slice(-4), accuracyScore]
    : s.accuracyHistory
  saveStats({
    sessionsCompleted: s.sessionsCompleted + 1,
    accuracyHistory:   history,
  })
}

/** Increment word count */
export function recordWords(count: number) {
  const s = loadStats()
  saveStats({ wordsPracticed: s.wordsPracticed + count })
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function SpeakStats() {
  const [stats, setStats] = useState<Stats>(defaultStats())
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setStats(loadStats())
    setMounted(true)

    // Refresh when localStorage changes in same tab (other components call saveStats)
    const onStorage = () => setStats(loadStats())
    window.addEventListener('storage', onStorage)
    return () => window.removeEventListener('storage', onStorage)
  }, [])

  if (!mounted) return null // avoid SSR mismatch

  const { sessionsCompleted, wordsPracticed, accuracyHistory } = stats

  // Compute trend from last 2 scores
  let trendSymbol = ''
  let trendColor  = 'text-white/40'
  if (accuracyHistory.length >= 2) {
    const last  = accuracyHistory[accuracyHistory.length - 1]
    const prev  = accuracyHistory[accuracyHistory.length - 2]
    if (last > prev)      { trendSymbol = '↑'; trendColor = 'text-emerald-400' }
    else if (last < prev) { trendSymbol = '↓'; trendColor = 'text-red-400' }
    else                  { trendSymbol = '→'; trendColor = 'text-white/40' }
  }

  const latestAccuracy = accuracyHistory.length
    ? accuracyHistory[accuracyHistory.length - 1]
    : null

  const pills: { label: string; value: string | number; accent?: string }[] = [
    { label: 'Sessions',  value: sessionsCompleted, accent: 'text-teal-400' },
    { label: 'Words',     value: wordsPracticed,    accent: 'text-sky-400' },
    ...(latestAccuracy != null
      ? [{ label: 'Accuracy', value: `${latestAccuracy}% ${trendSymbol}`, accent: trendColor }]
      : []),
  ]

  // Don't render if no data yet
  if (sessionsCompleted === 0 && wordsPracticed === 0) return null

  return (
    <div className="flex flex-wrap items-center gap-2" aria-label="Practice statistics">
      {pills.map(pill => (
        <div
          key={pill.label}
          className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/[0.05] border border-white/[0.08]"
        >
          <span className="text-[10px] text-white/30 font-medium">{pill.label}</span>
          <span className={`text-[11px] font-bold ${pill.accent ?? 'text-white/70'}`}>
            {pill.value}
          </span>
        </div>
      ))}
    </div>
  )
}
