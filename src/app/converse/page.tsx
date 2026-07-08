'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ConversationMode, HeartsDisplay } from '@/components/gamification'
import type { SessionStats } from '@/components/gamification/ConversationMode'

type PracticeMode = 'drills' | 'conversation'

const LANGUAGES = ['Spanish', 'French', 'German', 'Italian', 'Japanese', 'Korean', 'Mandarin Chinese', 'Portuguese', 'Hindi', 'Arabic']
const LEVELS = ['Beginner', 'Intermediate', 'Advanced']

const EMPTY_STATS: SessionStats = { xp: 0, turnsPracticed: 0, cleanTurns: 0, streak: 0 }

export default function ConversePage() {
  const [language, setLanguage] = useState('Spanish')
  const [level, setLevel] = useState('Beginner')
  const [key, setKey] = useState(0) // remount ConversationMode on language/level change
  const [mode, setMode] = useState<PracticeMode>('conversation')
  const [stats, setStats] = useState<SessionStats>(EMPTY_STATS)
  const [sessionEnded, setSessionEnded] = useState(false)

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    const footer = document.getElementById('layout-footer')
    if (footer) footer.style.display = 'none'
    return () => {
      document.body.style.overflow = ''
      const f = document.getElementById('layout-footer')
      if (f) f.style.display = ''
    }
  }, [])

  useEffect(() => {
    const prefs = localStorage.getItem('speakfast-prefs')
    if (prefs) {
      const p = JSON.parse(prefs)
      if (p.language) setLanguage(p.language)
      if (p.level) setLevel(p.level)
    }
    // Restore saved mode
    const savedMode = localStorage.getItem('sq_mode') as PracticeMode | null
    if (savedMode === 'drills' || savedMode === 'conversation') setMode(savedMode)
  }, [])

  function switchMode(m: PracticeMode) {
    setMode(m)
    localStorage.setItem('sq_mode', m)
    setKey(k => k + 1) // remount chat on mode switch
  }

  function changeLanguage(lang: string) {
    setLanguage(lang)
    setKey(k => k + 1)
  }

  function changeLevel(lvl: string) {
    setLevel(lvl)
    setKey(k => k + 1)
  }

  function endSession() {
    setSessionEnded(true)
  }

  function startNewSession() {
    setStats(EMPTY_STATS)
    setSessionEnded(false)
    setKey(k => k + 1)
  }

  return (
    <div
      className="flex flex-col text-white overflow-hidden"
      style={{
        position: 'fixed', top: '4rem', left: 0, right: 0, bottom: 0,
        background: 'linear-gradient(180deg, #0d0b1e 0%, #120f2a 100%)',
      }}
    >
      {/* Compact top bar — always visible, never shrinks */}
      <div className="border-b border-white/[0.06] bg-white/[0.02] backdrop-blur-md shrink-0">
        <div className="max-w-3xl w-full mx-auto px-4 sm:px-6 py-1.5 flex flex-wrap items-center gap-2 sm:gap-3 sm:h-12">
          <Link href="/" className="text-white/40 hover:text-white/80 transition-colors text-sm shrink-0">← Back</Link>

          {/* Mode toggle — Drills vs Conversation */}
          <div className="flex items-center gap-1 rounded-lg border border-white/[0.10] bg-white/[0.03] p-0.5 shrink-0">
            {([
              { id: 'drills'       as const, label: '📝 Drills' },
              { id: 'conversation' as const, label: '💬 Conversation' },
            ] as const).map(m => (
              <button
                key={m.id}
                onClick={() => switchMode(m.id)}
                className={`px-2.5 py-1 rounded-md text-[11px] font-bold transition-all ${
                  mode === m.id
                    ? 'bg-[var(--theme-primary)] text-white'
                    : 'text-white/40 hover:text-white/70'
                }`}
              >
                {m.label}
              </button>
            ))}
          </div>

          {mode === 'conversation' && !sessionEnded && (
            <HeartsDisplay className="shrink-0" />
          )}

          <div className="sm:ml-auto flex gap-1.5 shrink-0">
            <select
              value={language}
              onChange={e => changeLanguage(e.target.value)}
              className="bg-white/10 border border-white/10 rounded-lg px-2 py-1 text-xs outline-none focus:border-[var(--theme-primary)] cursor-pointer max-w-[110px] sm:max-w-none"
            >
              {LANGUAGES.map(l => <option key={l} value={l}>{l}</option>)}
            </select>
            <select
              value={level}
              onChange={e => changeLevel(e.target.value)}
              className="bg-white/10 border border-white/10 rounded-lg px-2 py-1 text-xs outline-none focus:border-[var(--theme-primary)] cursor-pointer"
            >
              {LEVELS.map(l => <option key={l} value={l}>{l}</option>)}
            </select>
            {mode === 'conversation' && !sessionEnded && stats.turnsPracticed > 0 && (
              <button
                onClick={endSession}
                className="px-2.5 py-1 rounded-lg text-[11px] font-bold text-white/50 hover:text-white/90 border border-white/10 hover:border-white/30 transition-colors"
              >
                End session
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Chat — fills remaining height */}
      <div className="flex-1 min-h-0 overflow-hidden">
        <div className="max-w-3xl w-full mx-auto px-4 sm:px-6 h-full flex flex-col py-3">
          {sessionEnded ? (
            <SessionCompleteCard stats={stats} onRestart={startNewSession} />
          ) : mode === 'drills' ? (
            <div className="flex-1 min-h-0 flex flex-col items-center justify-center gap-4 text-center px-4">
              <div className="text-4xl">📝</div>
              <h2 className="text-white font-bold text-lg">Drill Mode</h2>
              <p className="text-white/50 text-sm max-w-sm leading-relaxed">
                Focused pronunciation and vocabulary drills. Type or speak a word and get
                syllable-by-syllable feedback on exactly where your pronunciation breaks down.
              </p>
              <ConversationMode
                key={key}
                language={language}
                level={level}
                tutorName="Drill Coach"
                className="flex-1 min-h-0 w-full max-w-2xl"
                onStatsChange={setStats}
                onHeartsDepleted={endSession}
              />
            </div>
          ) : (
            <ConversationMode
              key={key}
              language={language}
              level={level}
              tutorName="Luna"
              className="flex-1 min-h-0"
              onStatsChange={setStats}
              onHeartsDepleted={endSession}
            />
          )}
        </div>
      </div>
    </div>
  )
}

function SessionCompleteCard({ stats, onRestart }: { stats: SessionStats; onRestart: () => void }) {
  const accuracy = stats.turnsPracticed > 0 ? Math.round((stats.cleanTurns / stats.turnsPracticed) * 100) : 0
  return (
    <div className="flex-1 min-h-0 flex flex-col items-center justify-center gap-5 text-center px-4">
      <div className="text-5xl animate-bounce-once">🎉</div>
      <h2 className="text-white font-bold text-2xl">Session complete!</h2>
      <div className="grid grid-cols-2 gap-3 w-full max-w-xs">
        <div className="rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3">
          <p className="text-2xl font-bold text-[var(--theme-primary)]">{stats.xp}</p>
          <p className="text-[11px] text-white/50 mt-0.5">XP earned</p>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3">
          <p className="text-2xl font-bold text-white">{stats.turnsPracticed}</p>
          <p className="text-[11px] text-white/50 mt-0.5">Turns practiced</p>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3">
          <p className="text-2xl font-bold text-green-400">{accuracy}%</p>
          <p className="text-[11px] text-white/50 mt-0.5">Accuracy</p>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3">
          <p className="text-2xl font-bold text-orange-400">🔥{stats.streak}</p>
          <p className="text-[11px] text-white/50 mt-0.5">Streak</p>
        </div>
      </div>
      <button
        onClick={onRestart}
        className="px-5 py-2.5 bg-[var(--theme-primary)] rounded-xl text-sm font-medium hover:opacity-90 transition-opacity"
      >
        Start new session
      </button>
    </div>
  )
}
