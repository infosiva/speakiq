'use client'
import { useState, useRef } from 'react'

interface Props {
  targetText: string
  language: string
  onScore?: (score: number) => void
}

declare global {
  interface Window { SpeechRecognition: any; webkitSpeechRecognition: any }
}

const LANG_MAP: Record<string, string> = {
  Spanish: 'es-ES', French: 'fr-FR', German: 'de-DE',
  Italian: 'it-IT', Japanese: 'ja-JP', Korean: 'ko-KR',
  Mandarin: 'zh-CN', 'Mandarin Chinese': 'zh-CN',
  Portuguese: 'pt-PT', Hindi: 'hi-IN', Arabic: 'ar-SA',
}

export function PronunciationScorer({ targetText, language, onScore }: Props) {
  const [listening, setListening] = useState(false)
  const [spoken,    setSpoken]    = useState('')
  const [result,    setResult]    = useState<{ score: number; feedback: string; tip: string } | null>(null)
  const [loading,   setLoading]   = useState(false)
  const recRef = useRef<any>(null)

  function start() {
    const SR = window.SpeechRecognition ?? window.webkitSpeechRecognition
    if (!SR) { alert('Speech recognition not supported in this browser.'); return }
    const rec = new SR()
    rec.lang = LANG_MAP[language] ?? 'en-US'
    rec.interimResults = false
    rec.onresult = async (e: any) => {
      const text = e.results[0][0].transcript
      setSpoken(text)
      setListening(false)
      setLoading(true)
      try {
        const r = await fetch('/api/pronunciation', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ spoken: text, expected: targetText, language }),
        })
        const data = await r.json()
        setResult(data)
        onScore?.(data.score)
      } finally { setLoading(false) }
    }
    rec.onend = () => setListening(false)
    recRef.current = rec
    rec.start()
    setListening(true)
    setResult(null)
  }

  const scoreColor = !result ? '' : result.score >= 80 ? 'text-green-400' : result.score >= 50 ? 'text-yellow-400' : 'text-red-400'

  return (
    <div className="rounded-xl border border-white/10 bg-white/5 p-4 space-y-3">
      <p className="text-sm text-[var(--text-2)]">Say it out loud:</p>
      <p className="font-semibold text-lg">{targetText}</p>
      <button
        onClick={start}
        disabled={listening || loading}
        className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
          listening
            ? 'bg-red-500/20 text-red-400 border border-red-500/40 animate-pulse'
            : 'bg-white/10 hover:bg-white/15 text-white border border-white/10'
        }`}
      >
        {listening ? '🎙️ Listening...' : loading ? '⏳ Scoring...' : '🎤 Pronounce'}
      </button>
      {spoken && <p className="text-xs text-[var(--text-2)]">Heard: &ldquo;{spoken}&rdquo;</p>}
      {result && (
        <div className="space-y-1">
          <p className={`text-2xl font-bold ${scoreColor}`}>{result.score}/100</p>
          <p className="text-sm">{result.feedback}</p>
          <p className="text-xs text-[var(--text-2)]">💡 {result.tip}</p>
        </div>
      )}
    </div>
  )
}
