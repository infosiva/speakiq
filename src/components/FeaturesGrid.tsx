'use client'
// components/FeaturesGrid.tsx — speakiq bento, conversation/voice-first
import { motion } from 'framer-motion'
import { siteConfig } from '@/lib/site.config'
import { FADE_UP, STAGGER_CONTAINER, CARD_HOVER, SPRING_CINEMATIC, useMotionVariants } from '@/lib/motion'

// Accent colors per feature slot
const ACCENTS = [
  'from-indigo-500/15 border-indigo-500/20',
  'from-violet-500/10 border-violet-500/15',
  'from-blue-500/10 border-blue-500/15',
  'from-indigo-500/10 border-indigo-500/15',
  'from-cyan-500/10 border-cyan-500/15',
  'from-violet-500/10 border-violet-500/15',
]

export default function FeaturesGrid() {
  const containerVars = useMotionVariants(STAGGER_CONTAINER(0.08))
  const itemVars      = useMotionVariants(FADE_UP)

  return (
    <section id="features" className="py-10 px-4 sm:px-6 max-w-5xl mx-auto border-t border-white/[0.05]">
      <div className="text-center mb-6">
        <h2
          className="text-3xl font-black text-white mb-3"
          style={{ fontFamily: "'Nunito', sans-serif" }}
        >
          Everything you need to actually speak
        </h2>
        <p className="text-white/40 text-sm">Not flashcards. Real conversation coaching, powered by AI.</p>
      </div>

      <motion.div
        variants={containerVars as Parameters<typeof motion.div>[0]['variants']}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.15 }}
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 auto-rows-auto gap-4"
      >
        {siteConfig.features.map((f, idx) => {
          const isLarge = f.size === 'large'
          const isWide  = f.size === 'wide'
          const accent  = ACCENTS[idx % ACCENTS.length]

          return (
            <motion.div
              key={f.title}
              variants={itemVars as Parameters<typeof motion.div>[0]['variants']}
              {...CARD_HOVER}
              transition={SPRING_CINEMATIC}
              className={`
                rounded-2xl border bg-gradient-to-br ${accent} bg-white/[0.02] p-6 flex flex-col gap-3 cursor-default select-none
                ${isLarge ? 'md:col-span-1 md:row-span-2' : ''}
                ${isWide  ? 'sm:col-span-2 md:col-span-2' : ''}
              `}
            >
              <span className={`leading-none ${isLarge ? 'text-4xl' : 'text-3xl'}`}>{f.icon}</span>
              <div className={`font-bold text-white ${isLarge ? 'text-lg' : 'text-sm'}`}>{f.title}</div>
              <div className={`text-white/45 leading-relaxed ${isLarge ? 'text-sm' : 'text-xs'}`}>{f.desc}</div>
            </motion.div>
          )
        })}
      </motion.div>
    </section>
  )
}
