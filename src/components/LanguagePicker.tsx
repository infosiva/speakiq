'use client'
// components/LanguagePicker.tsx — interactive flag scroll picker for hero
// Shows a horizontal scroll of language flags; clicking one sets active language context
import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { SPRING_CINEMATIC } from '@/lib/motion'

const LANGUAGES = [
  { code: 'es', flag: '🇪🇸', name: 'Spanish',    greeting: '¡Hola! ¿Cómo estás?',        translation: 'Hi! How are you?' },
  { code: 'fr', flag: '🇫🇷', name: 'French',     greeting: 'Bonjour! Comment vas-tu?',   translation: 'Hello! How are you?' },
  { code: 'ja', flag: '🇯🇵', name: 'Japanese',   greeting: 'こんにちは！元気ですか？',         translation: 'Hello! Are you well?' },
  { code: 'de', flag: '🇩🇪', name: 'German',     greeting: 'Hallo! Wie geht es Ihnen?',  translation: 'Hello! How are you?' },
  { code: 'pt', flag: '🇧🇷', name: 'Portuguese', greeting: 'Olá! Tudo bem?',             translation: 'Hello! All good?' },
  { code: 'zh', flag: '🇨🇳', name: 'Mandarin',   greeting: '你好！你好吗？',                translation: 'Hello! How are you?' },
  { code: 'it', flag: '🇮🇹', name: 'Italian',    greeting: 'Ciao! Come stai?',           translation: 'Hi! How are you?' },
  { code: 'ko', flag: '🇰🇷', name: 'Korean',     greeting: '안녕하세요! 어떻게 지내세요?',      translation: 'Hello! How are you?' },
  { code: 'ar', flag: '🇸🇦', name: 'Arabic',     greeting: 'مرحباً! كيف حالك؟',          translation: 'Hello! How are you?' },
  { code: 'hi', flag: '🇮🇳', name: 'Hindi',      greeting: 'नमस्ते! आप कैसे हैं?',        translation: 'Hello! How are you?' },
  { code: 'tr', flag: '🇹🇷', name: 'Turkish',    greeting: 'Merhaba! Nasılsın?',         translation: 'Hello! How are you?' },
  { code: 'ru', flag: '🇷🇺', name: 'Russian',    greeting: 'Привет! Как дела?',           translation: 'Hi! How are you?' },
]

export interface SelectedLanguage {
  code: string
  flag: string
  name: string
  greeting: string
  translation: string
}

interface LanguagePickerProps {
  onSelect: (lang: SelectedLanguage) => void
  selected: SelectedLanguage
}

export default function LanguagePicker({ onSelect, selected }: LanguagePickerProps) {
  const scrollRef = useRef<HTMLDivElement>(null)

  return (
    <div className="flex flex-col gap-2">
      <p className="text-[11px] text-white/35 font-semibold uppercase tracking-widest">
        Pick a language to start
      </p>
      <div
        ref={scrollRef}
        className="flex gap-2 overflow-x-auto pb-1 no-scrollbar"
        style={{ scrollSnapType: 'x mandatory' }}
      >
        {LANGUAGES.map((lang) => {
          const isActive = lang.code === selected.code
          return (
            <motion.button
              key={lang.code}
              whileTap={{ scale: 0.93 }}
              transition={SPRING_CINEMATIC}
              onClick={() => onSelect(lang)}
              aria-label={`Practice ${lang.name}`}
              style={{ scrollSnapAlign: 'start' }}
              className={`
                shrink-0 flex flex-col items-center gap-1 px-3 py-2 rounded-xl border text-center
                transition-all duration-150 cursor-pointer
                ${isActive
                  ? 'bg-indigo-500/25 border-indigo-400/50 shadow-[0_0_12px_rgba(99,102,241,0.35)]'
                  : 'bg-white/[0.04] border-white/[0.08] hover:bg-white/[0.08] hover:border-white/[0.15]'}
              `}
            >
              <span className="text-2xl leading-none">{lang.flag}</span>
              <span className={`text-[10px] font-semibold whitespace-nowrap ${isActive ? 'text-indigo-300' : 'text-white/40'}`}>
                {lang.name}
              </span>
            </motion.button>
          )
        })}
      </div>
    </div>
  )
}

export { LANGUAGES }
export type { SelectedLanguage as Language }
