'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { siteConfig } from '@/lib/site.config'

// Fire-and-forget pageview stat
function postStats() {
  try {
    fetch('http://31.97.56.148:3099/api/stats', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ site: 'speakiq.app', event: 'pageview' }),
      keepalive: true,
    }).catch(() => {/* ignore */})
  } catch { /* ignore */ }
}

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] },
  }),
}

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
}

export default function HomePage() {
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  useEffect(() => { postStats() }, [])

  return (
    <div className="overflow-x-hidden">
      {/* ── Background ── */}
      <div className="fixed inset-0 pointer-events-none z-0" style={{
        backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px)`,
        backgroundSize: '28px 28px',
      }} aria-hidden="true" />
      <div className="fixed inset-0 pointer-events-none z-0" style={{
        background: `radial-gradient(ellipse 80% 60% at 20% 30%, rgba(99,102,241,0.35) 0%, transparent 60%),
                     radial-gradient(ellipse 60% 50% at 80% 70%, rgba(6,182,212,0.22) 0%, transparent 55%)`,
      }} aria-hidden="true" />
      <div className="fixed inset-0 pointer-events-none z-0" style={{
        background: `radial-gradient(ellipse 100% 100% at 50% 50%, transparent 40%, rgba(6,6,16,0.9) 100%)`,
      }} aria-hidden="true" />

      {/* ── Hero ── */}
      <section className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 pt-20 pb-16 sm:pt-28 sm:pb-24 text-center">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={stagger}
          className="flex flex-col items-center"
        >
          {/* Badge */}
          <motion.div variants={fadeUp} custom={0}>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-indigo-500/40 bg-indigo-500/10 text-indigo-300 text-xs font-bold mb-6 backdrop-blur-sm">
              🌍 {siteConfig.stats.languages} Languages · AI Conversation Practice · Free to Start
            </div>
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={fadeUp}
            custom={1}
            className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight leading-[1.08] mb-5 max-w-3xl"
          >
            {siteConfig.tagline}
          </motion.h1>
          {/* ── Social proof bar (Duolingo-style) ── */}
          <motion.div initial={mounted ? { opacity: 0, y: 8 } : false} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.5 }}
            className="flex flex-wrap items-center justify-center gap-4 py-4 mb-2">
            {[
              { icon: '🌍', val: '50+', label: 'languages' },
              { icon: '🗣️', val: 'Real-time', label: 'corrections' },
              { icon: '⭐', val: 'AI-powered', label: 'feedback' },
              { icon: '🔥', val: 'Free', label: 'to start' },
            ].map(s => (
              <div key={s.label} className="flex items-center gap-1.5 text-sm">
                <span>{s.icon}</span>
                <span className="font-black text-white">{s.val}</span>
                <span style={{ color: 'rgba(167,243,208,0.5)' }}>{s.label}</span>
              </div>
            ))}
          </motion.div>

          {/* Subheading */}
          <motion.p
            variants={fadeUp}
            custom={2}
            className="text-white/55 text-lg sm:text-xl max-w-xl leading-relaxed mb-8"
          >
            {siteConfig.description}
          </motion.p>

          {/* CTAs */}
          <motion.div variants={fadeUp} custom={3} className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/converse"
              className="px-7 py-3.5 rounded-xl font-bold text-sm text-white transition-all hover:-translate-y-0.5 active:translate-y-0"
              style={{ background: 'linear-gradient(135deg, #6366f1, #06b6d4)', boxShadow: '0 0 30px rgba(99,102,241,0.35)' }}
            >
              Start Free →
            </Link>
            <Link
              href="/converse"
              className="px-7 py-3.5 rounded-xl font-bold text-sm text-white/70 border border-white/10 bg-white/[0.04] hover:bg-white/[0.08] hover:text-white transition-all hover:-translate-y-0.5"
            >
              See Demo
            </Link>
          </motion.div>
        </motion.div>

        {/* Hero chat preview */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="mt-14 max-w-xl mx-auto rounded-2xl border border-white/[0.08] bg-black/40 overflow-hidden backdrop-blur-sm"
        >
          <div className="flex items-center gap-2 px-4 py-3 border-b border-white/[0.05] bg-white/[0.02]">
            <div className="w-2.5 h-2.5 rounded-full bg-red-400/50" />
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-400/50" />
            <div className="w-2.5 h-2.5 rounded-full bg-green-400/50" />
            <span className="ml-2 text-[11px] text-white/25 font-mono">speakiq · live session</span>
            <span className="ml-auto flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[10px] text-emerald-400/60">AI ready</span>
            </span>
          </div>
          <div className="p-5 space-y-3 font-mono text-sm">
            <div className="flex gap-3">
              <span className="text-indigo-400/60 shrink-0 text-xs pt-0.5">tutor</span>
              <span className="text-white/60">Hola! ¿Cómo te llamas? 👋 Let&apos;s practice Spanish.</span>
            </div>
            <div className="flex gap-3 justify-end">
              <span className="text-white/50">Me llamo Alex. Soy de Australia.</span>
              <span className="text-cyan-400/50 shrink-0 text-xs pt-0.5">you</span>
            </div>
            <div className="flex gap-3">
              <span className="text-indigo-400/60 shrink-0 text-xs pt-0.5">tutor</span>
              <span className="text-white/60">¡Perfecto! <span className="text-emerald-400/80">✓ Great sentence!</span> Now tell me about your day — ¿Cómo fue tu día?</span>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ── Stats bar ── */}
      <motion.section
        initial={mounted ? { opacity: 0 } : false}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="relative z-10 border-y border-white/[0.06] bg-white/[0.02] py-5"
      >
        <div className="max-w-3xl mx-auto px-4 flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
          {[
            { value: siteConfig.stats.users, label: 'learners' },
            { value: siteConfig.stats.languages, label: 'languages' },
            { value: siteConfig.stats.sessionsToday, label: 'sessions today' },
          ].map(s => (
            <div key={s.label} className="flex items-center gap-2">
              <span className="text-xl font-black text-white">{s.value}</span>
              <span className="text-white/35 text-sm">{s.label}</span>
            </div>
          ))}
        </div>
      </motion.section>

      {/* ── Features ── */}
      <section className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 py-20 sm:py-28">
        <motion.div
          initial={mounted ? { opacity: 0, y: 16 } : false}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-black mb-3">Everything you need to get fluent</h2>
          <p className="text-white/45 text-base max-w-lg mx-auto">Real AI conversation, not rote drills. Practice the way native speakers actually talk.</p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {siteConfig.features.map((f) => (
            <motion.div
              key={f.title}
              variants={fadeUp}
              className="p-5 rounded-2xl border border-white/[0.07] bg-white/[0.02] hover:bg-indigo-500/[0.05] hover:border-indigo-500/20 transition-all group"
            >
              <div className="text-3xl mb-3">{f.icon}</div>
              <h3 className="font-bold text-white mb-1.5 text-sm group-hover:text-indigo-300 transition-colors">{f.title}</h3>
              <p className="text-white/40 text-xs leading-relaxed">{f.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ── How it works ── */}
      <section className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 pb-20 sm:pb-28">
        <motion.div
          initial={mounted ? { opacity: 0, y: 16 } : false}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-black mb-3">How it works</h2>
          <p className="text-white/45 text-base">Three steps to start speaking confidently.</p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {siteConfig.howItWorks.map((step) => (
            <motion.div key={step.step} variants={fadeUp} className="flex flex-col items-center text-center p-6">
              <div className="w-12 h-12 rounded-2xl bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center font-black text-indigo-300 text-lg mb-4">
                {step.step}
              </div>
              <h3 className="font-bold text-white mb-2 text-sm">{step.title}</h3>
              <p className="text-white/40 text-xs leading-relaxed">{step.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ── Pricing ── */}
      <section id="pricing" className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 pb-20 sm:pb-28">
        <motion.div
          initial={mounted ? { opacity: 0, y: 16 } : false}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <h2 className="text-3xl sm:text-4xl font-black mb-3">Simple pricing</h2>
          <p className="text-white/45 text-base">Start free. Upgrade when you&apos;re ready.</p>
        </motion.div>

        <motion.div
          initial={mounted ? { opacity: 0, y: 20 } : false}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 sm:grid-cols-2 gap-4"
        >
          {/* Free */}
          <div className="p-6 rounded-2xl border border-white/[0.08] bg-white/[0.02]">
            <div className="text-xs font-bold uppercase tracking-widest text-white/30 mb-1">{siteConfig.pricing.free.name}</div>
            <div className="text-3xl font-black text-white/50 mb-0.5">{siteConfig.pricing.free.price}</div>
            <div className="text-xs text-white/20 mb-5">{siteConfig.pricing.free.sub}</div>
            <ul className="space-y-2 mb-6">
              {siteConfig.pricing.free.features.map(f => (
                <li key={f} className="flex items-center gap-2 text-xs text-white/35">
                  <span className="text-white/20">✓</span>{f}
                </li>
              ))}
            </ul>
            <Link href="/converse" className="block w-full py-2.5 rounded-xl text-xs font-bold text-center text-white/50 border border-white/10 hover:bg-white/[0.04] transition-all">
              Get started free
            </Link>
          </div>

          {/* Pro */}
          <div className="p-6 rounded-2xl border border-indigo-500/30 bg-indigo-950/40 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-transparent pointer-events-none" />
            <div className="text-xs font-bold uppercase tracking-widest text-indigo-400 mb-1">{siteConfig.pricing.pro.name}</div>
            <div className="text-3xl font-black text-white mb-0.5">{siteConfig.pricing.pro.price}</div>
            <div className="text-xs text-indigo-500 mb-5">{siteConfig.pricing.pro.sub}</div>
            <ul className="space-y-2 mb-6">
              {siteConfig.pricing.pro.features.map(f => (
                <li key={f} className="flex items-center gap-2 text-xs text-white/60">
                  <span className="text-indigo-400">✓</span>{f}
                </li>
              ))}
            </ul>
            <Link
              href="/pricing"
              className="block w-full py-2.5 rounded-xl text-xs font-bold text-center text-white transition-all hover:-translate-y-0.5"
              style={{ background: 'linear-gradient(135deg, #6366f1, #06b6d4)' }}
            >
              Upgrade to Pro →
            </Link>
          </div>
        </motion.div>
      </section>

      {/* ── Languages marquee ── */}
      <section className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 pb-20 sm:pb-28">
        <motion.div
          initial={mounted ? { opacity: 0, y: 16 } : false}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <h2 className="text-3xl sm:text-4xl font-black mb-3">50+ Languages</h2>
          <p className="text-white/45 text-base">From Spanish and Japanese to Tamil and Swahili.</p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
          className="flex flex-wrap gap-2.5 justify-center"
        >
          {siteConfig.languages.map((lang) => (
            <motion.div key={lang.name} variants={fadeUp}>
              <Link
                href="/converse"
                className="flex items-center gap-2 px-3 py-2 rounded-xl border border-white/[0.07] bg-white/[0.02] hover:bg-indigo-500/10 hover:border-indigo-500/25 transition-all text-sm font-medium text-white/60 hover:text-white"
              >
                <span>{lang.flag}</span>
                <span>{lang.name}</span>
              </Link>
            </motion.div>
          ))}
          <motion.div variants={fadeUp}>
            <Link href="/languages" className="flex items-center gap-2 px-3 py-2 rounded-xl border border-indigo-500/20 bg-indigo-500/5 text-indigo-400 text-sm font-medium hover:bg-indigo-500/10 transition-all">
              + 38 more →
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* ── CTA bottom ── */}
      <motion.section
        initial={mounted ? { opacity: 0, y: 20 } : false}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 pb-24 text-center"
      >
        <div className="rounded-3xl border border-indigo-500/20 bg-indigo-500/5 p-10 sm:p-14">
          <h2 className="text-3xl sm:text-4xl font-black mb-4">Ready to speak?</h2>
          <p className="text-white/50 text-base mb-8 max-w-sm mx-auto">
            Join {siteConfig.stats.users} practicing with AI. Start free, no account needed.
          </p>
          <Link
            href="/converse"
            className="inline-flex items-center gap-2 px-9 py-4 rounded-xl font-black text-base text-white transition-all hover:-translate-y-0.5"
            style={{ background: 'linear-gradient(135deg, #6366f1, #06b6d4)', boxShadow: '0 0 40px rgba(99,102,241,0.4)' }}
          >
            Start Speaking Free →
          </Link>
          <p className="text-white/20 text-xs mt-4">No credit card · 20 free messages/day</p>
        </div>
      </motion.section>
    </div>
  )
}
