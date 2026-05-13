'use client'
import { useState, useEffect } from 'react'
import { BADGES, getUnlockedBadges } from '@/lib/gamification/badges'

export default function BadgesPage() {
  const [unlocked, setUnlocked] = useState<string[]>([])
  useEffect(() => { setUnlocked(getUnlockedBadges()) }, [])

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)] p-6">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-end gap-4 mb-2">
          <h1 className="text-2xl font-bold">Badges</h1>
          <span className="text-sm text-[var(--text-2)] pb-0.5">{unlocked.length}/{BADGES.length} earned</span>
        </div>
        {unlocked.length > 0 && (
          <div className="mb-6">
            <div className="w-full bg-white/10 rounded-full h-1.5">
              <div className="bg-[var(--theme-primary)] h-1.5 rounded-full transition-all" style={{ width: `${(unlocked.length / BADGES.length) * 100}%` }} />
            </div>
          </div>
        )}
        {unlocked.length === 0 && (
          <p className="text-sm text-[var(--text-2)] mb-6">Complete lessons and challenges to earn badges.</p>
        )}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {BADGES.map(badge => {
            const earned = unlocked.includes(badge.id)
            return (
              <div key={badge.id} className={`rounded-2xl border p-5 text-center transition-all ${
                earned ? 'bg-yellow-500/10 border-yellow-500/30' : 'bg-white/[0.03] border-white/5 opacity-40'
              }`}>
                <div className="text-5xl mb-3">{badge.icon}</div>
                <p className="font-semibold text-sm">{badge.title}</p>
                <p className="text-xs text-[var(--text-2)] mt-1.5 leading-relaxed">{badge.description}</p>
                {earned && <p className="text-xs text-yellow-400 mt-2 font-medium">Earned ✓</p>}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
