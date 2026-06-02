'use client'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { STAGGER_CONTAINER, FADE_UP, SPRING_CINEMATIC, BUTTON_PRESS, useMotionVariants } from '@/lib/motion'
import { siteConfig } from '@/lib/site.config'
import type { ContentOverrides } from '@/lib/content'
import { ShimmerButton } from '@/components/magicui/shimmer-button'
import { btn } from '@/lib/theme'
import Link from 'next/link'
import LanguagePicker, { LANGUAGES } from './LanguagePicker'
import HeroDemo from './HeroDemo'
import type { SelectedLanguage } from './LanguagePicker'
import { Zap } from 'lucide-react'

// Duolingo-inspired XP progress bar — fills on hover, resets on leave
function XPBar() {
  const [fill, setFill] = useState(62)
  return (
    <div
      className="flex items-center gap-3 cursor-default select-none"
      onMouseEnter={() => setFill(88)}
      onMouseLeave={() => setFill(62)}
    >
      <span className="text-[11px] font-bold text-violet-300/70 uppercase tracking-widest whitespace-nowrap">
        Daily XP
      </span>
      <div className="flex-1 h-2 rounded-full bg-white/[0.07] overflow-hidden">
        <div
          className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-violet-400"
          style={{
            width: `${fill}%`,
            transition: 'width 0.6s cubic-bezier(0.23,1,0.32,1)',
          }}
        />
      </div>
      <span className="text-[11px] font-bold text-violet-300/60 tabular-nums">{fill}/100</span>
    </div>
  )
}

export default function HeroClient({ overrides = {} }: { overrides?: ContentOverrides }) {
  const [selectedLang, setSelectedLang] = useState<SelectedLanguage>(LANGUAGES[0])

  const containerVars = useMotionVariants(STAGGER_CONTAINER(0.07))
  const childVars     = useMotionVariants(FADE_UP)

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-center">

      {/* LEFT — copy + picker + CTAs */}
      <motion.div
        variants={containerVars as Parameters<typeof motion.div>[0]['variants']}
        initial="hidden"
        animate="show"
        className="flex flex-col gap-3"
      >
        {/* Live learner badge — Duolingo-style streak pill */}
        <motion.div variants={childVars as Parameters<typeof motion.div>[0]['variants']}>
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-violet-500/12 border border-violet-500/25 text-violet-300 text-xs font-bold uppercase tracking-widest">
            <Zap size={10} className="fill-violet-400 text-violet-400" />
            2,847 learners speaking today · free to start
          </span>
        </motion.div>

        {/* Headline — Nunito, large, Duolingo bounce energy */}
        <motion.h1
          variants={childVars as Parameters<typeof motion.h1>[0]['variants']}
          className="text-5xl sm:text-6xl font-black leading-[1.05] tracking-tight"
          style={{ fontFamily: "'Nunito', sans-serif" }}
        >
          <span className="block text-white">{overrides.headline ?? 'Speak any language'}</span>
          <span
            className="block bg-gradient-to-r from-violet-400 via-indigo-300 to-blue-300 bg-clip-text text-transparent"
            style={{ filter: 'drop-shadow(0 0 32px rgba(139,92,246,0.45))' }}
          >
            in minutes,
          </span>
          <span className="block text-white/90">not months.</span>
        </motion.h1>

        {/* XP bar — gamification signal */}
        <motion.div variants={childVars as Parameters<typeof motion.div>[0]['variants']}>
          <XPBar />
        </motion.div>

        {/* Sub */}
        <motion.p
          variants={childVars as Parameters<typeof motion.p>[0]['variants']}
          className="text-white/50 text-[15px] leading-relaxed max-w-md"
          style={{ fontFamily: "'Nunito', sans-serif" }}
        >
          {overrides.subheadline ?? 'AI conversation partner that corrects grammar, coaches pronunciation, and adapts to your pace — 50+ languages.'}
        </motion.p>

        {/* Language picker */}
        <motion.div variants={childVars as Parameters<typeof motion.div>[0]['variants']}>
          <LanguagePicker selected={selectedLang} onSelect={setSelectedLang} />
        </motion.div>

        {/* CTAs */}
        <motion.div
          variants={childVars as Parameters<typeof motion.div>[0]['variants']}
          className="flex flex-col sm:flex-row gap-3 pt-1"
        >
          <motion.div {...BUTTON_PRESS} transition={SPRING_CINEMATIC}>
            <Link href={`/converse?lang=${selectedLang.code}`}>
              <ShimmerButton
                background="rgba(109, 40, 217, 1)"
                shimmerColor="#ddd6fe"
                className="px-8 py-4 text-base font-bold min-h-[52px] w-full sm:w-auto"
                style={{ fontFamily: "'Nunito', sans-serif" }}
              >
                <span className="mr-1">{selectedLang.flag}</span> {overrides.cta ?? `Start speaking ${selectedLang.name}`}
              </ShimmerButton>
            </Link>
          </motion.div>
          <motion.div {...BUTTON_PRESS} transition={SPRING_CINEMATIC}>
            <Link
              href="/languages"
              className={btn.secondary + ' text-sm px-6 py-4 font-semibold min-h-[52px] flex items-center gap-2 justify-center'}
              style={{ fontFamily: "'Nunito', sans-serif" }}
            >
              🌍 50+ languages
            </Link>
          </motion.div>
        </motion.div>

        {/* Trust pills — compact row */}
        <motion.div
          variants={childVars as Parameters<typeof motion.div>[0]['variants']}
          className="flex flex-wrap gap-2"
        >
          {['No sign-up', '3 free sessions', 'AI grammar coach', 'Works on mobile'].map(pill => (
            <span
              key={pill}
              className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-violet-500/[0.07] border border-violet-500/[0.12] text-violet-300/60"
              style={{ fontFamily: "'Nunito', sans-serif" }}
            >
              {pill}
            </span>
          ))}
        </motion.div>
      </motion.div>

      {/* RIGHT — live conversation demo */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
        className="w-full mt-2 lg:mt-0"
      >
        <HeroDemo language={selectedLang} />
      </motion.div>
    </div>
  )
}
