'use client'
import { useEffect, useState } from 'react'

interface Stats { sessionsCompleted: number; wordsSpoken: number; feedbackGenerated: number }

export default function LiveStatsBar() {
  const [stats, setStats] = useState<Stats>({ sessionsCompleted: 0, wordsSpoken: 0, feedbackGenerated: 0 })

  useEffect(() => {
    fetch('/api/stats').then(r => r.json()).then(setStats).catch(() => {})
  }, [])

  if (!stats.sessionsCompleted && !stats.wordsSpoken && !stats.feedbackGenerated) return null

  return (
    <div className="border-y py-3 px-5" style={{ background: 'var(--surface-2,#faf5ff)', borderColor: 'var(--border,#e9d5ff)' }}>
      <div className="mx-auto flex max-w-5xl justify-center gap-8 flex-wrap">
        {stats.sessionsCompleted > 0 && (
          <div className="text-center">
            <span className="block text-[20px] font-black" style={{ color: 'var(--theme-primary,#9333ea)' }}>{stats.sessionsCompleted}</span>
            <span className="text-[11px] text-slate-500">sessions completed this session</span>
          </div>
        )}
        {stats.feedbackGenerated > 0 && (
          <div className="text-center">
            <span className="block text-[20px] font-black" style={{ color: 'var(--theme-primary,#9333ea)' }}>{stats.feedbackGenerated}</span>
            <span className="text-[11px] text-slate-500">feedback generated</span>
          </div>
        )}
      </div>
    </div>
  )
}
