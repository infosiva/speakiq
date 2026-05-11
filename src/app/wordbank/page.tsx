'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { getAllCards, getDueCards, reviewCard, WordCard } from '@/lib/gamification/sm2'

export default function WordBankPage() {
  const [cards,    setCards]    = useState<WordCard[]>([])
  const [dueCards, setDueCards] = useState<WordCard[]>([])
  const [search,   setSearch]   = useState('')
  const [review,   setReview]   = useState<WordCard | null>(null)
  const [revealed, setRevealed] = useState(false)

  useEffect(() => {
    setCards(getAllCards())
    setDueCards(getDueCards())
  }, [])

  const filtered = cards.filter(c =>
    c.word.toLowerCase().includes(search.toLowerCase()) ||
    c.translation.toLowerCase().includes(search.toLowerCase())
  )

  function startReview() { setReview(dueCards[0] ?? null); setRevealed(false) }

  function grade(q: 0 | 1 | 2 | 3 | 4 | 5) {
    if (!review) return
    reviewCard(review.word, q)
    const remaining = getDueCards()
    setDueCards(remaining)
    setReview(remaining[0] ?? null)
    setRevealed(false)
    setCards(getAllCards())
  }

  if (review) return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)] flex items-center justify-center p-6">
      <div className="max-w-sm w-full">
        <p className="text-center text-[var(--text-2)] text-sm mb-6">{dueCards.length} cards left today</p>
        <div className="bg-white/5 rounded-2xl p-8 text-center border border-white/10 min-h-[200px] flex flex-col items-center justify-center">
          <p className="text-3xl font-bold mb-2">{review.word}</p>
          <p className="text-xs text-[var(--text-2)]">{review.language}</p>
          {revealed && <p className="mt-4 text-xl text-[var(--theme-primary)]">{review.translation}</p>}
        </div>
        {!revealed ? (
          <button onClick={() => setRevealed(true)} className="w-full mt-4 py-3 bg-white/10 rounded-xl text-sm font-medium hover:bg-white/15 transition-colors">
            Reveal
          </button>
        ) : (
          <div className="grid grid-cols-4 gap-2 mt-4">
            {([ ['Again', 0, 'bg-red-500/20 text-red-400'], ['Hard', 2, 'bg-yellow-500/20 text-yellow-400'], ['Good', 3, 'bg-green-500/20 text-green-400'], ['Easy', 5, 'bg-blue-500/20 text-blue-400'] ] as [string, number, string][]).map(([label, q, cls]) => (
              <button key={label} onClick={() => grade(q as 0|1|2|3|4|5)} className={`py-2 rounded-lg text-xs font-medium ${cls}`}>
                {label}
              </button>
            ))}
          </div>
        )}
        <button onClick={() => setReview(null)} className="w-full mt-3 text-xs text-[var(--text-2)] hover:text-white transition-colors">
          Exit review
        </button>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)] p-6">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center gap-3 mb-6">
          <Link href="/" className="text-[var(--text-2)] hover:text-white transition-colors">← Back</Link>
          <h1 className="text-2xl font-bold">Word Bank</h1>
          <span className="ml-auto text-sm text-[var(--text-2)]">{cards.length} words</span>
        </div>

        {dueCards.length > 0 && (
          <button onClick={startReview} className="w-full mb-6 py-3 bg-[var(--theme-primary)] rounded-xl text-sm font-medium hover:opacity-90 transition-opacity">
            Review {dueCards.length} due card{dueCards.length > 1 ? 's' : ''}
          </button>
        )}

        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search words..."
          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm outline-none mb-4 focus:border-[var(--theme-primary)] transition-colors"
        />

        {filtered.length === 0 ? (
          <p className="text-center text-[var(--text-2)] py-12">No words yet. Complete lessons to build your word bank.</p>
        ) : (
          <div className="space-y-2">
            {filtered.map(c => (
              <div key={`${c.language}-${c.word}`} className="flex items-center gap-4 bg-white/5 rounded-xl px-4 py-3 border border-white/5">
                <div className="flex-1">
                  <span className="font-medium">{c.word}</span>
                  <span className="text-[var(--text-2)] mx-2">—</span>
                  <span className="text-[var(--text-2)] text-sm">{c.translation}</span>
                </div>
                <span className="text-xs text-[var(--text-2)]">{c.language}</span>
                <span className="text-xs text-[var(--text-2)]">×{c.totalReviews}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
