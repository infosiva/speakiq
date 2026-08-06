'use client'
// components/TryItLive.tsx — zero-auth interactive demo, differentiates speakiq
// from Yoodli's gated/enterprise demo. Visitor types (or speaks) a line in the
// active hero language and gets a REAL AI-scored pronunciation/fluency result,
// right on the landing page, no signup. Reuses the same /api/pronunciation
// route + scoring contract as the gated /lesson flow (PronunciationScorer.tsx)
// — ponytail: no new API, no new AI prompt, just a typed-input path onto the
// existing voice-only scorer so the landing demo doesn't force a mic prompt.
import { useState, useRef, useEffect } from 'react'
import type { HeroLangCode } from './HeroClient'
import { HERO_LANGS } from './HeroClient'

const TARGET_PHRASES: Record<HeroLangCode, string> = {
  es: 'Buenos días, ¿cómo estás?',
  fr: "Bonjour, comment allez-vous?",
  de: 'Guten Tag, wie geht es Ihnen?',
  ja: 'おはようございます、元気ですか？',
  pt: 'Bom dia, como você está?',
}

const LANG_SPEECH_MAP: Record<HeroLangCode, string> = {
  es: 'es-ES', fr: 'fr-FR', de: 'de-DE', ja: 'ja-JP', pt: 'pt-PT',
}

declare global {
  interface Window { SpeechRecognition: any; webkitSpeechRecognition: any }
}

type Result = { score: number; feedback: string; tip: string }

export default function TryItLive({ activeLang }: { activeLang: HeroLangCode }) {
  const [text, setText] = useState('')
  const [listening, setListening] = useState(false)
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<Result | null>(null)
  const [error, setError] = useState('')
  const recRef = useRef<any>(null)

  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  const lang = HERO_LANGS.find(l => l.code === activeLang) ?? HERO_LANGS[0]
  const target = TARGET_PHRASES[activeLang]
  const canListen = mounted && (window.SpeechRecognition || window.webkitSpeechRecognition)

  async function score(spoken: string) {
    if (!spoken.trim()) return
    setLoading(true)
    setError('')
    setResult(null)
    try {
      const r = await fetch('/api/pronunciation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ spoken, expected: target, language: lang.name }),
      })
      if (r.status === 429) { setError('Too many tries — wait a moment and try again.'); return }
      const data = await r.json()
      if (data.error) { setError('Could not score that — try again.'); return }
      setResult(data)
    } catch {
      setError('Something went wrong — try again.')
    } finally {
      setLoading(false)
    }
  }

  function startMic() {
    const SR = window.SpeechRecognition ?? window.webkitSpeechRecognition
    if (!SR) return
    const rec = new SR()
    rec.lang = LANG_SPEECH_MAP[activeLang] ?? 'en-US'
    rec.interimResults = false
    rec.onresult = (e: any) => {
      const spoken = e.results[0][0].transcript
      setText(spoken)
      setListening(false)
      score(spoken)
    }
    rec.onend = () => setListening(false)
    recRef.current = rec
    rec.start()
    setListening(true)
    setResult(null)
  }

  const scoreColor = !result ? '' : result.score >= 80 ? 'text-emerald-600' : result.score >= 50 ? 'text-amber-600' : 'text-red-600'

  return (
    <div
      className="w-full mt-4 rounded-2xl p-4"
      style={{ background: 'var(--card,#ffffff)', border: '1px solid var(--border,#e2e8f0)' }}
    >
      <p className="text-xs font-semibold" style={{ color: 'var(--accent,#7c3aed)' }}>
        TRY IT YOURSELF — no signup
      </p>
      <p className="text-sm mt-1" style={{ color: 'var(--foreground,#0f172a)' }}>
        Say or type: <span className="font-semibold">&ldquo;{target}&rdquo;</span>
      </p>

      <div className="flex items-center gap-2 mt-3">
        <input
          type="text"
          value={text}
          onChange={e => setText(e.target.value)}
          onKeyDown={e => { if (e.key === 'Enter') score(text) }}
          placeholder={`Type it in ${lang.name}...`}
          className="flex-1 text-sm px-3 py-2 rounded-lg outline-none"
          style={{ background: 'var(--surface-2,#f8fafc)', border: '1px solid var(--border,#e2e8f0)', color: 'var(--foreground,#0f172a)' }}
        />
        {canListen && (
          <button
            onClick={startMic}
            disabled={listening || loading}
            title="Speak instead"
            className={`shrink-0 px-3 py-2 rounded-lg text-sm border transition-all ${listening ? 'animate-pulse' : ''}`}
            style={{
              background: listening ? 'rgba(220,38,38,0.08)' : 'var(--surface-2,#f8fafc)',
              borderColor: listening ? 'rgba(220,38,38,0.3)' : 'var(--border,#e2e8f0)',
              color: listening ? '#dc2626' : 'var(--foreground,#0f172a)',
            }}
          >
            {listening ? '🎙️' : '🎤'}
          </button>
        )}
        <button
          onClick={() => score(text)}
          disabled={loading || listening || !text.trim()}
          className="shrink-0 px-4 py-2 rounded-lg text-sm font-semibold text-white disabled:opacity-40 transition-all active:scale-[0.97]"
          style={{ background: 'var(--accent,#7c3aed)' }}
        >
          {loading ? 'Scoring…' : 'Score me'}
        </button>
      </div>

      {error && <p className="text-xs mt-2 text-red-600">{error}</p>}

      {result && (
        <div className="mt-3 pt-3" style={{ borderTop: '1px solid var(--border,#e2e8f0)' }}>
          <p className={`text-2xl font-black ${scoreColor}`}>{result.score}<span className="text-sm font-medium">/100</span></p>
          <p className="text-sm mt-1" style={{ color: 'var(--foreground,#0f172a)' }}>{result.feedback}</p>
          <p className="text-xs mt-1 text-slate-500">💡 {result.tip}</p>
        </div>
      )}
    </div>
  )
}
