'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { getDailyState, completeDailyChallenge } from '@/lib/gamification/daily-challenge'

interface Question { question: string; options: string[]; answer: number; explanation: string }
interface Challenge { title: string; questions: Question[] }

export default function DailyPage() {
  const [challenge,  setChallenge]  = useState<Challenge | null>(null)
  const [current,    setCurrent]    = useState(0)
  const [selected,   setSelected]   = useState<number | null>(null)
  const [score,      setScore]      = useState(0)
  const [finished,   setFinished]   = useState(false)
  const [loading,    setLoading]    = useState(false)

  useEffect(() => {
    const daily = getDailyState()
    if (daily.completed) { setFinished(true); setScore(daily.score); return }
    const prefs = JSON.parse(localStorage.getItem('speakfast-prefs') ?? '{}')
    if (!prefs.language) return
    const seed = new Date().toISOString().split('T')[0]
    setLoading(true)
    fetch('/api/daily-challenge', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ language: prefs.language, level: prefs.level ?? 'Beginner', seed }),
    })
      .then(r => r.json())
      .then(data => setChallenge(data))
      .finally(() => setLoading(false))
  }, [])

  function pick(idx: number) {
    if (selected !== null) return
    setSelected(idx)
  }

  function next() {
    const q = challenge!.questions[current]
    const correct = selected === q.answer ? 1 : 0
    const newScore = score + correct
    if (current + 1 >= challenge!.questions.length) {
      completeDailyChallenge(newScore)
      setScore(newScore)
      setFinished(true)
    } else {
      setCurrent(c => c + 1)
      setSelected(null)
      setScore(newScore)
    }
  }

  if (loading) return (
    <div className="min-h-screen bg-[var(--background)] flex items-center justify-center">
      <div className="text-center space-y-3">
        <div className="w-10 h-10 border-2 border-[var(--theme-primary)] border-t-transparent rounded-full animate-spin mx-auto" />
        <p className="text-sm text-[var(--text-2)]">Generating today&apos;s challenge...</p>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)] p-6">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold mb-1">Daily Challenge</h1>
        <p className="text-sm text-[var(--text-2)] mb-8">3 questions · Refreshes each day</p>

        {finished ? (
          <div className="glass-liquid rounded-2xl p-10 text-center space-y-4">
            <div className="text-7xl">{score === 3 ? '🏆' : score >= 2 ? '🎉' : '💪'}</div>
            <p className="text-3xl font-bold">{score}/3</p>
            <p className="text-[var(--text-2)]">{score === 3 ? 'Perfect score!' : score >= 2 ? 'Great job!' : 'Keep practising!'}</p>
            <p className="text-sm text-[var(--text-2)]">Come back tomorrow for a new challenge</p>
            <Link href="/converse" className="inline-block mt-2 px-6 py-3 bg-[var(--theme-primary)] rounded-xl text-sm font-medium hover:opacity-90 transition-opacity">
              Keep Practising →
            </Link>
          </div>
        ) : !challenge ? (
          <div className="glass-liquid rounded-2xl p-8 text-center space-y-4">
            <div className="text-4xl">📖</div>
            <p className="font-semibold">No language set yet</p>
            <p className="text-sm text-[var(--text-2)]">Set your language preferences on the home page first.</p>
            <Link href="/" className="inline-block px-5 py-2.5 bg-[var(--theme-primary)] rounded-xl text-sm font-medium hover:opacity-90 transition-opacity">
              Go to Home
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Progress */}
            <div className="flex items-center gap-3">
              <div className="flex gap-1.5">
                {challenge.questions.map((_, i) => (
                  <div key={i} className={`h-1.5 w-8 rounded-full transition-all ${
                    i < current ? 'bg-[var(--theme-primary)]' : i === current ? 'bg-[var(--theme-primary)]/50' : 'bg-white/10'
                  }`} />
                ))}
              </div>
              <span className="text-xs text-[var(--text-2)] ml-auto">{score} correct</span>
            </div>

            {/* Question card */}
            <div className="glass-liquid rounded-2xl p-6">
              <p className="text-xs text-[var(--text-2)] mb-3 uppercase tracking-wide">Question {current + 1}</p>
              <p className="text-lg font-semibold leading-snug">{challenge.questions[current].question}</p>
            </div>

            {/* Options */}
            <div className="space-y-2.5">
              {challenge.questions[current].options.map((opt, i) => {
                const isCorrect = i === challenge.questions[current].answer
                const isSelected = i === selected
                return (
                  <button
                    key={i}
                    onClick={() => pick(i)}
                    className={`w-full text-left rounded-xl border px-4 py-3.5 text-sm transition-all ${
                      selected === null
                        ? 'border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20'
                        : isCorrect
                        ? 'border-green-500/50 bg-green-500/10 text-green-400'
                        : isSelected
                        ? 'border-red-500/50 bg-red-500/10 text-red-400'
                        : 'border-white/5 bg-white/[0.02] opacity-40'
                    }`}
                  >
                    <span className="font-medium text-xs mr-3 opacity-50">{String.fromCharCode(65 + i)}</span>
                    {opt}
                  </button>
                )
              })}
            </div>

            {/* Explanation + Next */}
            {selected !== null && (
              <div className="space-y-3 pt-1">
                <div className="bg-white/5 border border-white/10 rounded-xl px-4 py-3">
                  <p className="text-xs text-[var(--text-2)] leading-relaxed">{challenge.questions[current].explanation}</p>
                </div>
                <button onClick={next} className="w-full py-3.5 bg-[var(--theme-primary)] rounded-xl text-sm font-medium hover:opacity-90 transition-opacity">
                  {current + 1 >= challenge.questions.length ? 'Finish Challenge' : 'Next Question →'}
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
