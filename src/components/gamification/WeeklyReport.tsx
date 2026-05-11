'use client'
import { useState } from 'react'

interface Report { headline: string; summary: string; highlight: string; suggestion: string }

function getWeekStats() {
  const lessons = JSON.parse(localStorage.getItem('speakfast-lessons') ?? '[]')
  const weekAgo = new Date(Date.now() - 7 * 86400000).toISOString().split('T')[0]
  const thisWeek = lessons.filter((l: { date: string }) => l.date >= weekAgo)
  const known = JSON.parse(localStorage.getItem('speakfast-known') ?? '[]')
  const streak = JSON.parse(localStorage.getItem('speakfast-streak') ?? '{"streak":0}')
  const xp = parseInt(localStorage.getItem('speakfast-xp') ?? '0')
  const langs = [...new Set(thisWeek.map((l: { language: string }) => l.language))] as string[]
  return { lessons: thisWeek.length, words: known.length, streak: streak.streak, xp, conversationTurns: 0, languages: langs }
}

export function WeeklyReport() {
  const [report,  setReport]  = useState<Report | null>(null)
  const [loading, setLoading] = useState(false)
  const [shown,   setShown]   = useState(false)

  async function generate() {
    setLoading(true)
    try {
      const stats = getWeekStats()
      const r = await fetch('/api/weekly-report', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ stats }),
      })
      const data = await r.json()
      setReport(data)
      setShown(true)
    } finally { setLoading(false) }
  }

  if (!shown) return (
    <button
      onClick={generate}
      disabled={loading}
      className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-sm hover:bg-white/10 transition-all disabled:opacity-50"
    >
      {loading ? '⏳ Generating...' : '📊 Weekly Report'}
    </button>
  )

  if (!report) return null

  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-6 space-y-4 max-w-md">
      <div className="flex items-center gap-2">
        <span className="text-2xl">📊</span>
        <h3 className="font-bold text-lg">{report.headline}</h3>
      </div>
      <p className="text-sm text-[var(--foreground)]">{report.summary}</p>
      <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-3">
        <p className="text-xs text-green-400 font-semibold mb-1">🏆 Best this week</p>
        <p className="text-sm">{report.highlight}</p>
      </div>
      <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-3">
        <p className="text-xs text-blue-400 font-semibold mb-1">🎯 Next week focus</p>
        <p className="text-sm">{report.suggestion}</p>
      </div>
    </div>
  )
}
