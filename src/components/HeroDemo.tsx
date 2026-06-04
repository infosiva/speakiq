'use client'
// components/HeroDemo.tsx — conversation-first hero demo with language context
// Shows realistic chat bubbles with translation, voice wave, and animated typing
import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState, useCallback } from 'react'
import type { SelectedLanguage } from './LanguagePicker'

// Conversation scripts per language (greeting + user reply + AI correction)
const SCRIPTS: Record<string, Array<{ role: 'ai' | 'user'; text: string; translation?: string; tip?: string }>> = {
  es: [
    { role: 'ai',   text: '¡Hola! ¿Cómo estuvo tu fin de semana?', translation: 'Hi! How was your weekend?' },
    { role: 'user', text: 'Fue bueno. Fui a un parque.' },
    { role: 'ai',   text: '¡Perfecto! Try: "Fue genial — exploré un parque nuevo."', translation: 'Great job! A more natural phrase.', tip: 'grammar' },
  ],
  fr: [
    { role: 'ai',   text: 'Bonjour! Comment s\'est passé ton week-end?', translation: 'Hello! How was your weekend?' },
    { role: 'user', text: 'C\'était bien. Je suis allé au parc.' },
    { role: 'ai',   text: 'Bravo! Essaie: "C\'était fantastique — j\'ai découvert un nouveau parc."', translation: 'Excellent phrasing upgrade!', tip: 'vocabulary' },
  ],
  ja: [
    { role: 'ai',   text: 'こんにちは！週末はいかがでしたか？', translation: 'Hello! How was your weekend?' },
    { role: 'user', text: 'よかったです。公園に行きました。' },
    { role: 'ai',   text: '素晴らしい！Try: "最高でした — 新しい公園を探検しました！"', translation: 'Perfect! More expressive phrasing.', tip: 'fluency' },
  ],
  de: [
    { role: 'ai',   text: 'Hallo! Wie war dein Wochenende?', translation: 'Hello! How was your weekend?' },
    { role: 'user', text: 'Es war gut. Ich war im Park.' },
    { role: 'ai',   text: 'Sehr gut! Versuch: "Es war toll — ich habe einen neuen Park entdeckt."', translation: 'Great sentence upgrade!', tip: 'grammar' },
  ],
  pt: [
    { role: 'ai',   text: 'Olá! Como foi o seu fim de semana?', translation: 'Hello! How was your weekend?' },
    { role: 'user', text: 'Foi bom. Fui ao parque.' },
    { role: 'ai',   text: 'Ótimo! Tente: "Foi incrível — explorei um parque novo."', translation: 'More natural phrasing!', tip: 'fluency' },
  ],
  default: [
    { role: 'ai',   text: 'Hello! How was your weekend?', translation: 'Start the conversation' },
    { role: 'user', text: 'It was good! I went to a park.' },
    { role: 'ai',   text: 'Great sentence! Try: "It was wonderful — I explored a brand new park."', translation: 'More expressive version!', tip: 'grammar' },
  ],
}

const TIP_COLORS: Record<string, string> = {
  grammar:    'text-emerald-400',
  vocabulary: 'text-sky-400',
  fluency:    'text-violet-400',
}

interface HeroDemoProps {
  language: SelectedLanguage
}

export default function HeroDemo({ language }: HeroDemoProps) {
  const [visible, setVisible] = useState(0)
  const [isTyping, setIsTyping] = useState(false)
  const [score, setScore] = useState(62)

  const script = SCRIPTS[language.code] ?? SCRIPTS.default

  const runSequence = useCallback(() => {
    setVisible(0)
    setScore(62)
    setIsTyping(false)

    const timers: ReturnType<typeof setTimeout>[] = []

    timers.push(setTimeout(() => { setIsTyping(true) }, 400))
    timers.push(setTimeout(() => { setIsTyping(false); setVisible(1) }, 1600))
    timers.push(setTimeout(() => { setVisible(2) }, 3000))
    timers.push(setTimeout(() => { setIsTyping(true) }, 3400))
    timers.push(setTimeout(() => { setIsTyping(false); setVisible(3); setScore(88) }, 4800))

    return timers
  }, [])

  useEffect(() => {
    const timers = runSequence()
    const loop = setInterval(() => {
      timers.forEach(clearTimeout)
      runSequence()
    }, 8000)
    return () => {
      timers.forEach(clearTimeout)
      clearInterval(loop)
    }
  }, [language.code, runSequence])

  return (
    <div className="rounded-2xl border border-indigo-500/20 bg-[#0d0b1e]/80 overflow-hidden backdrop-blur-md shadow-xl shadow-indigo-900/30">

      {/* Header bar */}
      <div className="flex items-center gap-2.5 px-4 py-3 border-b border-white/[0.06] bg-indigo-950/40">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-red-400/50" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-400/50" />
          <div className="w-2.5 h-2.5 rounded-full bg-green-400/50" />
        </div>
        <div className="flex items-center gap-2 ml-1">
          <span className="text-base leading-none">{language.flag}</span>
          <span className="text-[11px] text-white/40 font-medium">{language.name} · live session</span>
        </div>
        <div className="ml-auto flex items-center gap-1.5">
          <VoiceWave />
          <span className="text-[10px] text-indigo-400/70">AI tutor active</span>
        </div>
      </div>

      {/* Chat area */}
      <div className="p-5 space-y-3 min-h-[200px] flex flex-col justify-end">
        <AnimatePresence mode="wait">
          {script.slice(0, visible).map((msg, i) => (
            <motion.div
              key={`${language.code}-${i}`}
              initial={{ opacity: 0, y: 10, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className={`flex gap-2 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {msg.role === 'ai' && (
                <div className="w-6 h-6 rounded-full bg-indigo-500/30 border border-indigo-400/30 flex items-center justify-center shrink-0 mt-0.5">
                  <span className="text-[10px]">AI</span>
                </div>
              )}
              <div className={`max-w-[80%] flex flex-col gap-1 ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                <div className={`
                  px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed
                  ${msg.role === 'ai'
                    ? 'bg-indigo-950/70 border border-indigo-500/15 text-white/80 rounded-tl-sm'
                    : 'bg-indigo-600/30 border border-indigo-400/20 text-white/85 rounded-tr-sm'}
                `}>
                  {msg.text}
                  {msg.tip && (
                    <span className={`ml-2 text-[10px] font-semibold uppercase tracking-wide ${TIP_COLORS[msg.tip] ?? 'text-emerald-400'}`}>
                      +{msg.tip}
                    </span>
                  )}
                </div>
                {msg.translation && (
                  <span className="text-[10px] text-white/25 px-1">{msg.translation}</span>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Typing indicator */}
        {isTyping && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex gap-2 items-start"
          >
            <div className="w-6 h-6 rounded-full bg-indigo-500/30 border border-indigo-400/30 flex items-center justify-center shrink-0 mt-0.5">
              <span className="text-[10px]">AI</span>
            </div>
            <div className="px-3.5 py-2.5 rounded-2xl rounded-tl-sm bg-indigo-950/70 border border-indigo-500/15">
              <span className="flex items-center gap-1">
                {[0, 150, 300].map(delay => (
                  <span
                    key={delay}
                    className="w-1.5 h-1.5 rounded-full bg-indigo-400/60 animate-bounce"
                    style={{ animationDelay: `${delay}ms` }}
                  />
                ))}
              </span>
            </div>
          </motion.div>
        )}
      </div>

      {/* Score bar */}
      <div className="px-5 pb-4 flex items-center gap-3 border-t border-white/[0.04] pt-3">
        <span className="text-[10px] text-white/25 font-medium whitespace-nowrap">Fluency score</span>
        <div className="flex-1 h-1.5 bg-white/[0.06] rounded-full overflow-hidden">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-indigo-500 via-violet-400 to-blue-400"
            animate={{ width: `${score}%` }}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.1 }}
          />
        </div>
        <motion.span
          key={score}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-[11px] text-indigo-400 font-bold tabular-nums w-8 text-right"
        >
          {score}%
        </motion.span>
      </div>
    </div>
  )
}

// VoiceWave — animated bars mimicking microphone input
function VoiceWave() {
  return (
    <span className="flex items-center gap-[2px] h-3" aria-hidden="true">
      {[3, 5, 8, 5, 3].map((h, i) => (
        <span
          key={i}
          className="w-[2px] rounded-full bg-indigo-400/60 animate-voice-wave"
          style={{
            height: `${h}px`,
            animationDelay: `${i * 80}ms`,
          }}
        />
      ))}
    </span>
  )
}
