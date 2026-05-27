'use client'
// components/HeroClient.tsx — conversation-first hero with language picker
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
        {/* Trust badge */}
        <motion.div variants={childVars as Parameters<typeof motion.div>[0]['variants']}>
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-500/15 border border-indigo-500/25 text-indigo-300 text-xs font-bold uppercase tracking-widest">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            No account needed · free to try
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          variants={childVars as Parameters<typeof motion.h1>[0]['variants']}
          className="text-5xl sm:text-6xl font-black leading-[1.05] tracking-tight"
          style={{ fontFamily: "'Nunito', sans-serif" }}
        >
          <span className="block text-white">{overrides.headline ?? 'Start speaking'}</span>
          <span
            className="block bg-gradient-to-r from-indigo-400 via-violet-300 to-blue-200 bg-clip-text text-transparent"
            style={{ filter: 'drop-shadow(0 0 28px rgba(99,102,241,0.4))' }}
          >
            in minutes,
          </span>
          <span className="block text-white">not months.</span>
        </motion.h1>

        {/* Sub */}
        <motion.p
          variants={childVars as Parameters<typeof motion.p>[0]['variants']}
          className="text-white/55 text-base leading-relaxed max-w-md"
        >
          {overrides.subheadline ?? 'Your AI conversation partner corrects grammar, coaches pronunciation, and adapts to your pace — in 50+ languages.'}
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
                background="rgba(79, 70, 229, 1)"
                shimmerColor="#c7d2fe"
                className="px-8 py-4 text-base font-bold min-h-[52px] w-full sm:w-auto"
              >
                <span className="mr-1">{selectedLang.flag}</span> {overrides.cta ?? `Start speaking ${selectedLang.name}`}
              </ShimmerButton>
            </Link>
          </motion.div>
          <motion.div {...BUTTON_PRESS} transition={SPRING_CINEMATIC}>
            <Link
              href="/languages"
              className={btn.secondary + ' text-sm px-6 py-4 font-semibold min-h-[52px] flex items-center gap-2 justify-center'}
            >
              🌍 All 50+ languages
            </Link>
          </motion.div>
        </motion.div>

        {/* Trust pills */}
        <motion.div
          variants={childVars as Parameters<typeof motion.div>[0]['variants']}
          className="flex flex-wrap gap-2"
        >
          {['No sign-up', '3 free sessions', 'AI conversation partner', 'Works on mobile'].map(pill => (
            <span
              key={pill}
              className="text-[11px] font-medium px-2.5 py-1 rounded-full bg-white/[0.05] border border-white/[0.08] text-white/45"
            >
              {pill}
            </span>
          ))}
        </motion.div>
      </motion.div>

      {/* RIGHT — live conversation demo (desktop: right col; mobile: below CTA) */}
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
