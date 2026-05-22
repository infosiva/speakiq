'use client'
// components/HeroDemo.tsx — animated AI conversation preview, speakiq-specific
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

const MESSAGES = [
  { role: 'ai',   text: 'How was your weekend? 😊', delay: 0 },
  { role: 'user', text: 'It was good! I went to a park.', delay: 1200 },
  { role: 'ai',   text: <><span className="text-emerald-400/90">Great sentence!</span> Try: <span className="text-indigo-300">&ldquo;It was wonderful — I explored a new park.&rdquo;</span></>, delay: 2600 },
]

export default function HeroDemo() {
  const [visible, setVisible] = useState(0)

  useEffect(() => {
    MESSAGES.forEach((msg, i) => {
      setTimeout(() => setVisible(i + 1), msg.delay + 500)
    })
    // Loop
    const loop = setInterval(() => {
      setVisible(0)
      MESSAGES.forEach((msg, i) => {
        setTimeout(() => setVisible(i + 1), msg.delay + 500)
      })
    }, 6500)
    return () => clearInterval(loop)
  }, [])

  return (
    <div className="rounded-2xl border border-white/[0.08] bg-black/40 overflow-hidden backdrop-blur-sm">
      {/* Window chrome */}
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

      {/* Chat messages */}
      <div className="p-5 space-y-4 font-mono text-sm min-h-[180px]">
        {MESSAGES.slice(0, visible).map((msg, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : ''}`}
          >
            {msg.role === 'ai' && (
              <span className="text-indigo-400/60 shrink-0 text-xs pt-0.5">AI</span>
            )}
            <span className={msg.role === 'ai' ? 'text-white/60' : 'text-white/70'}>
              {msg.text}
            </span>
            {msg.role === 'user' && (
              <span className="text-cyan-400/50 shrink-0 text-xs pt-0.5">you</span>
            )}
          </motion.div>
        ))}

        {/* Typing indicator */}
        {visible < MESSAGES.length && visible > 0 && (
          <div className="flex gap-3">
            <span className="text-indigo-400/60 shrink-0 text-xs pt-0.5">AI</span>
            <span className="flex items-center gap-1 text-white/30">
              <span className="w-1.5 h-1.5 rounded-full bg-white/30 animate-bounce" style={{ animationDelay: '0ms' }} />
              <span className="w-1.5 h-1.5 rounded-full bg-white/30 animate-bounce" style={{ animationDelay: '150ms' }} />
              <span className="w-1.5 h-1.5 rounded-full bg-white/30 animate-bounce" style={{ animationDelay: '300ms' }} />
            </span>
          </div>
        )}
      </div>

      {/* Score badge */}
      <div className="px-5 pb-4 flex items-center gap-2">
        <span className="text-[10px] text-white/20 font-mono">Grammar score</span>
        <div className="flex-1 h-1 bg-white/[0.06] rounded-full overflow-hidden">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-blue-400"
            initial={{ width: '0%' }}
            animate={{ width: visible >= 3 ? '82%' : '60%' }}
            transition={{ duration: 0.7, ease: 'easeOut', delay: 0.2 }}
          />
        </div>
        <span className="text-[10px] text-indigo-400/70 font-mono">{visible >= 3 ? '82' : '60'}%</span>
      </div>
    </div>
  )
}
