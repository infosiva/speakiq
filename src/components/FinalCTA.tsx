'use client'
// components/FinalCTA.tsx — warm, conversation-forward bottom CTA
import { motion } from 'framer-motion'
import { FADE_UP, BUTTON_PRESS, SPRING_CINEMATIC, useMotionVariants } from '@/lib/motion'
import Link from 'next/link'
import { ShimmerButton } from '@/components/magicui/shimmer-button'

// Speech bubbles decorating the CTA
const SPEECH_SNIPPETS = [
  { text: '¡Perfecto!',   lang: '🇪🇸', pos: 'top-2 left-4 sm:left-12 rotate-[-4deg]' },
  { text: 'Très bien!',   lang: '🇫🇷', pos: 'top-4 right-4 sm:right-16 rotate-[3deg]' },
  { text: 'すごい！',      lang: '🇯🇵', pos: 'bottom-6 left-8 sm:left-20 rotate-[2deg]' },
  { text: 'Wunderbar!',   lang: '🇩🇪', pos: 'bottom-4 right-6 sm:right-24 rotate-[-3deg]' },
]

export default function FinalCTA() {
  const vars = useMotionVariants(FADE_UP)

  return (
    <section className="py-10 px-4 sm:px-6 border-t border-white/[0.05] relative overflow-hidden">
      {/* Floating speech bubbles */}
      {SPEECH_SNIPPETS.map((s, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.12, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className={`absolute hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-950/80 border border-indigo-500/20 text-sm text-white/60 shadow-lg ${s.pos} select-none pointer-events-none`}
        >
          <span>{s.lang}</span>
          <span className="font-medium">{s.text}</span>
        </motion.div>
      ))}

      {/* Glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{ background: 'radial-gradient(ellipse 60% 40% at 50% 60%, rgba(99,102,241,0.12) 0%, transparent 70%)' }}
      />

      <motion.div
        variants={vars as Parameters<typeof motion.div>[0]['variants']}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.4 }}
        className="relative max-w-xl mx-auto text-center flex flex-col items-center gap-6"
      >
        <div className="text-4xl">🗣️</div>
        <h2
          className="text-3xl sm:text-4xl font-black text-white leading-tight"
          style={{ fontFamily: "'Nunito', sans-serif" }}
        >
          Your brilliant friend who speaks 50 languages is waiting.
        </h2>
        <p className="text-white/45 text-base">
          No account needed. No credit card. Just pick a language and start talking.
        </p>

        <motion.div {...BUTTON_PRESS} transition={SPRING_CINEMATIC}>
          <Link href="/converse">
            <ShimmerButton
              background="rgba(79, 70, 229, 1)"
              shimmerColor="#c7d2fe"
              className="cta-pulse px-10 py-4 text-base font-bold min-h-[56px]"
            >
              Start your free conversation →
            </ShimmerButton>
          </Link>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-2.5">
          {['No sign-up', '3 free sessions', 'Any language', 'Cancel anytime'].map(pill => (
            <span
              key={pill}
              className="text-xs font-medium px-3 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300/70"
            >
              {pill}
            </span>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
