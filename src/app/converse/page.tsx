'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ConversationMode } from '@/components/gamification'

const LANGUAGES = ['Spanish', 'French', 'German', 'Italian', 'Japanese', 'Korean', 'Mandarin Chinese', 'Portuguese', 'Hindi', 'Arabic']
const LEVELS = ['Beginner', 'Intermediate', 'Advanced']

export default function ConversePage() {
  const [language, setLanguage] = useState('Spanish')
  const [level, setLevel] = useState('Beginner')
  const [key, setKey] = useState(0) // remount ConversationMode on language/level change

  useEffect(() => {
    const prefs = localStorage.getItem('speakfast-prefs')
    if (prefs) {
      const p = JSON.parse(prefs)
      if (p.language) setLanguage(p.language)
      if (p.level) setLevel(p.level)
    }
  }, [])

  function changeLanguage(lang: string) {
    setLanguage(lang)
    setKey(k => k + 1)
  }

  function changeLevel(lvl: string) {
    setLevel(lvl)
    setKey(k => k + 1)
  }

  return (
    <div className="flex flex-col text-[var(--foreground)]" style={{ height: 'calc(100vh - 4rem)' }}>
      <div className="max-w-3xl w-full mx-auto px-4 sm:px-6 flex flex-col flex-1 min-h-0">
        {/* Compact top bar */}
        <div className="flex items-center gap-3 py-3 shrink-0">
          <Link href="/" className="text-[var(--text-2)] hover:text-white transition-colors text-sm">← Back</Link>
          <h1 className="text-lg font-bold">AI Conversation</h1>
          <div className="ml-auto flex gap-2">
            <select
              value={language}
              onChange={e => changeLanguage(e.target.value)}
              className="bg-white/10 border border-white/10 rounded-lg px-2 py-1.5 text-xs outline-none focus:border-[var(--theme-primary)] cursor-pointer"
            >
              {LANGUAGES.map(l => <option key={l} value={l}>{l}</option>)}
            </select>
            <select
              value={level}
              onChange={e => changeLevel(e.target.value)}
              className="bg-white/10 border border-white/10 rounded-lg px-2 py-1.5 text-xs outline-none focus:border-[var(--theme-primary)] cursor-pointer"
            >
              {LEVELS.map(l => <option key={l} value={l}>{l}</option>)}
            </select>
          </div>
        </div>

        {/* Chat — fills remaining height */}
        <ConversationMode key={key} language={language} level={level} tutorName="Luna" className="flex-1 min-h-0" />
      </div>
    </div>
  )
}
