'use client'
// components/HowItWorksSection.tsx — 3-step flow with speech/voice motifs
import { motion } from 'framer-motion'
import { siteConfig } from '@/lib/site.config'
import { FADE_UP, STAGGER_CONTAINER, useMotionVariants } from '@/lib/motion'
import Link from 'next/link'

const STEP_COLORS = [
  { border: 'border-indigo-500/30', bg: 'bg-indigo-500/10', text: 'text-indigo-300', num: 'text-indigo-500/20' },
  { border: 'border-violet-500/30', bg: 'bg-violet-500/10', text: 'text-violet-300', num: 'text-violet-500/20' },
  { border: 'border-blue-500/30',   bg: 'bg-blue-500/10',   text: 'text-blue-300',   num: 'text-blue-500/20'   },
]

export default function HowItWorksSection() {
  const containerVars = useMotionVariants(STAGGER_CONTAINER(0.15))
  const itemVars      = useMotionVariants(FADE_UP)

  return (
    <section
      id="how-it-works"
      className="border-t border-white/[0.05]"
      style={{ background: 'linear-gradient(180deg, #0d0b1e 0%, #120f2a 100%)' }}
    >
      <div className="py-10 px-4 sm:px-6 max-w-5xl mx-auto">
      <motion.div
        variants={containerVars as Parameters<typeof motion.div>[0]['variants']}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.25 }}
      >
        <motion.div
          variants={itemVars as Parameters<typeof motion.div>[0]['variants']}
          className="text-center mb-7"
        >
          <h2
            className="text-3xl font-black text-white mb-3"
            style={{ fontFamily: "'Nunito', sans-serif" }}
          >
            Start a real conversation in 3 steps
          </h2>
          <p className="text-white/40 text-sm max-w-sm mx-auto">
            No textbooks, no drills. Just you and your AI tutor — speaking from minute one.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
          {/* Arrow connectors — desktop */}
          <div className="hidden md:block absolute top-10 left-[33%] w-[11%] flex items-center justify-center" aria-hidden="true">
            <div className="h-px w-full bg-gradient-to-r from-indigo-500/30 to-violet-500/30" />
          </div>
          <div className="hidden md:block absolute top-10 left-[57%] w-[11%] flex items-center justify-center" aria-hidden="true">
            <div className="h-px w-full bg-gradient-to-r from-violet-500/30 to-blue-500/30" />
          </div>

          {siteConfig.howItWorks.map((step, idx) => {
            const color = STEP_COLORS[idx] ?? STEP_COLORS[0]
            return (
              <motion.div
                key={step.step}
                variants={itemVars as Parameters<typeof motion.div>[0]['variants']}
                className={`flex flex-col gap-4 p-6 rounded-2xl border ${color.border} bg-white/[0.02] relative`}
              >
                {/* Step number watermark */}
                <span className={`absolute top-4 right-5 text-6xl font-black leading-none select-none ${color.num}`}>
                  {String(step.step).padStart(2, '0')}
                </span>
                {/* Icon */}
                <div className={`w-12 h-12 rounded-xl ${color.bg} border ${color.border} flex items-center justify-center text-2xl`}>
                  {step.icon}
                </div>
                <h3 className="text-white font-bold text-base leading-tight">{step.title}</h3>
                <p className="text-white/45 text-sm leading-relaxed">{step.desc}</p>
              </motion.div>
            )
          })}
        </div>

        {/* CTA below steps */}
        <motion.div
          variants={itemVars as Parameters<typeof motion.div>[0]['variants']}
          className="flex justify-center mt-10"
        >
          <Link
            href="/converse"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-indigo-300 bg-indigo-500/10 border border-indigo-500/25 hover:bg-indigo-500/20 transition-all duration-150"
          >
            Try it free — no sign-up →
          </Link>
        </motion.div>
      </motion.div>
      </div>
    </section>
  )
}
