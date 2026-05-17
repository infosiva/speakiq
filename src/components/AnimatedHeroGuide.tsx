'use client'

import { useEffect, useRef, useState } from 'react'

const ACCENT = '#7c3aed'
const ACCENT2 = '#4f46e5'

const features = [
  { icon: '🗣️', title: 'Conversational AI Tutor', desc: 'Practice real conversations with SpeakBot. It adapts to your level — beginner to advanced — in 50+ languages.' },
  { icon: '🔥', title: 'Streak & XP System', desc: 'Daily lessons build streaks. Earn XP, unlock badges, climb leaderboards. Gamification that actually works.' },
  { icon: '🎯', title: 'Adaptive Difficulty', desc: 'AI tracks what you struggle with and drills those exact patterns. No wasted time on stuff you already know.' },
  { icon: '📚', title: 'Word Bank & Lessons', desc: 'Vocabulary flashcards, grammar lessons, pronunciation guides — structured path from zero to fluent.' },
]

const steps = [
  { num: '01', title: 'Pick a language', desc: 'Choose from 50+ languages. AI sets your level via a quick placement test.' },
  { num: '02', title: 'Daily 5-min lesson', desc: 'SpeakBot guides you through vocabulary, phrases, and real conversation practice.' },
  { num: '03', title: 'Track your streak', desc: 'XP, badges, and streak flames keep you coming back. Miss a day — lose your streak.' },
  { num: '04', title: 'Speak with confidence', desc: 'Months of daily practice = real fluency. No classroom needed.' },
]

const LANGS = ['🇪🇸 Spanish', '🇫🇷 French', '🇩🇪 German', '🇯🇵 Japanese', '🇧🇷 Portuguese', '🇮🇹 Italian']

function ParticleBg() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')!
    let raf: number
    let w = canvas.offsetWidth, h = canvas.offsetHeight
    canvas.width = w; canvas.height = h

    const particles = Array.from({ length: 60 }, () => ({
      x: Math.random() * w, y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.45, vy: (Math.random() - 0.5) * 0.45,
      r: Math.random() * 1.8 + 0.4,
      opacity: Math.random() * 0.45 + 0.1,
    }))

    function draw() {
      ctx.clearRect(0, 0, w, h)
      for (const p of particles) {
        p.x += p.vx; p.y += p.vy
        if (p.x < 0) p.x = w; if (p.x > w) p.x = 0
        if (p.y < 0) p.y = h; if (p.y > h) p.y = 0
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(124,58,237,${p.opacity})`
        ctx.fill()
      }
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 95) {
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.strokeStyle = `rgba(124,58,237,${0.07 * (1 - dist / 95)})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        }
      }
      raf = requestAnimationFrame(draw)
    }
    draw()
    const resize = () => { w = canvas.offsetWidth; h = canvas.offsetHeight; canvas.width = w; canvas.height = h }
    window.addEventListener('resize', resize)
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize) }
  }, [])

  return <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.65, pointerEvents: 'none' }} />
}

export default function AnimatedHeroGuide() {
  const [visible, setVisible] = useState(false)
  const [activeStep, setActiveStep] = useState(0)
  const [langIdx, setLangIdx] = useState(0)

  useEffect(() => {
    setVisible(true)
    const t = setInterval(() => setActiveStep(s => (s + 1) % steps.length), 3000)
    const l = setInterval(() => setLangIdx(i => (i + 1) % LANGS.length), 1800)
    return () => { clearInterval(t); clearInterval(l) }
  }, [])

  return (
    <>
      <style>{`
        @keyframes sq-fade-up { from { opacity:0; transform:translateY(24px); } to { opacity:1; transform:translateY(0); } }
        @keyframes sq-glow { 0%,100%{opacity:0.35;} 50%{opacity:0.9;} }
        @keyframes sq-float { 0%,100%{transform:translateY(0);} 50%{transform:translateY(-8px);} }
        @keyframes sq-shimmer { 0%{background-position:200% center;} 100%{background-position:-200% center;} }
        @keyframes sq-lang { 0%,80%{opacity:1;transform:translateY(0);} 90%{opacity:0;transform:translateY(-8px);} 95%{opacity:0;transform:translateY(8px);} 100%{opacity:1;transform:translateY(0);} }
        .sq-shimmer-text {
          background: linear-gradient(90deg, #7c3aed, #a78bfa, #c4b5fd, #7c3aed);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: sq-shimmer 4s linear infinite;
        }
        .sq-card { transition: transform 200ms cubic-bezier(.23,1,.32,1), box-shadow 200ms cubic-bezier(.23,1,.32,1); }
        .sq-card:hover { transform: translateY(-6px); box-shadow: 0 20px 40px rgba(124,58,237,0.15), 0 0 0 1px rgba(124,58,237,0.2); }
        @media (max-width: 640px) { .sq-grid { grid-template-columns: 1fr !important; } .sq-steps { flex-direction: column !important; } }
      `}</style>

      <section style={{ position: 'relative', overflow: 'hidden', background: 'linear-gradient(180deg, #0d0b1e 0%, #120f2a 100%)', padding: '80px 24px 60px' }}>
        <ParticleBg />
        <div style={{ position: 'absolute', top: -80, right: '20%', width: 450, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(124,58,237,0.1) 0%, transparent 70%)', animation: 'sq-glow 7s ease-in-out infinite', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: -60, left: '10%', width: 300, height: 300, borderRadius: '50%', background: 'radial-gradient(circle, rgba(79,70,229,0.09) 0%, transparent 70%)', animation: 'sq-glow 9s ease-in-out infinite 2s', pointerEvents: 'none' }} />

        <div style={{ position: 'relative', maxWidth: 720, margin: '0 auto', textAlign: 'center', opacity: visible ? 1 : 0, animation: visible ? 'sq-fade-up 0.6s ease-out' : 'none' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(124,58,237,0.1)', border: '1px solid rgba(124,58,237,0.25)', borderRadius: 99, padding: '6px 16px', marginBottom: 24 }}>
            <span style={{ fontSize: 14 }}>🌍</span>
            <span style={{ fontSize: 12, color: ACCENT, fontWeight: 600, letterSpacing: '0.05em' }}>AI LANGUAGE TUTOR · FREE TO START</span>
          </div>

          <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3.25rem)', fontWeight: 800, lineHeight: 1.1, marginBottom: 16, color: '#eef2ff' }}>
            Learn{' '}
            <span style={{ display: 'inline-block', animation: 'sq-lang 1.8s ease-in-out infinite', color: '#a78bfa', minWidth: 140 }}>
              {LANGS[langIdx]}
            </span>
            <br />
            <span className="sq-shimmer-text">with AI. Actually fluent.</span>
          </h1>
          <p style={{ fontSize: 17, color: 'rgba(238,242,255,0.6)', lineHeight: 1.7, maxWidth: 540, margin: '0 auto 36px' }}>
            SpeakIQ gives you a conversational AI tutor, streak tracking, and adaptive lessons — built for real progress, not just app streaks.
          </p>

          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="/converse" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '13px 28px', borderRadius: 12, background: `linear-gradient(135deg, ${ACCENT}, ${ACCENT2})`, color: '#fff', fontWeight: 700, fontSize: 15, textDecoration: 'none', boxShadow: '0 4px 20px rgba(124,58,237,0.35)', transition: 'transform 150ms ease' }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.transform = 'scale(1.04)'}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.transform = 'scale(1)'}
            >Start speaking free →</a>
            <a href="#how-it-works" style={{ display: 'inline-flex', alignItems: 'center', padding: '13px 24px', borderRadius: 12, border: '1px solid rgba(124,58,237,0.25)', color: ACCENT, fontWeight: 600, fontSize: 15, textDecoration: 'none', background: 'rgba(124,58,237,0.05)' }}>How it works</a>
          </div>

          {/* Streak badges preview */}
          <div style={{ display: 'flex', gap: 10, justifyContent: 'center', marginTop: 32, flexWrap: 'wrap' }}>
            {['🔥 7-day streak', '⚡ 250 XP', '🏆 Level 3', '🎯 B1 Spanish'].map((badge, i) => (
              <div key={i} style={{ padding: '5px 12px', borderRadius: 20, background: 'rgba(124,58,237,0.08)', border: '1px solid rgba(124,58,237,0.18)', fontSize: 12, color: 'rgba(238,242,255,0.55)', fontWeight: 600, animation: `sq-fade-up 0.4s ease-out ${0.1 + i * 0.08}s both` }}>
                {badge}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ background: '#0d0b1e', padding: '60px 24px' }}>
        <div style={{ maxWidth: 1080, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 40 }}>
            <h2 style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)', fontWeight: 700, color: '#eef2ff', marginBottom: 10 }}>Everything you need to go fluent</h2>
            <p style={{ color: 'rgba(238,242,255,0.45)', fontSize: 15 }}>AI tutor + structured path + gamification</p>
          </div>
          <div className="sq-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16 }}>
            {features.map((f, i) => (
              <div key={i} className="sq-card" style={{ padding: '24px', background: 'rgba(124,58,237,0.04)', border: '1px solid rgba(124,58,237,0.12)', borderRadius: 16, animation: `sq-fade-up 0.5s ease-out ${i * 0.1}s both` }}>
                <div style={{ fontSize: 28, marginBottom: 12, animation: 'sq-float 4s ease-in-out infinite', display: 'inline-block' }}>{f.icon}</div>
                <h3 style={{ fontSize: 15, fontWeight: 700, color: '#eef2ff', marginBottom: 6 }}>{f.title}</h3>
                <p style={{ fontSize: 13.5, color: 'rgba(238,242,255,0.5)', lineHeight: 1.6 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="how-it-works" style={{ background: 'linear-gradient(180deg, #0d0b1e 0%, #120f2a 100%)', padding: '60px 24px 80px' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <h2 style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)', fontWeight: 700, color: '#eef2ff', marginBottom: 10 }}>From zero to conversational in 4 steps</h2>
          </div>
          <div className="sq-steps" style={{ display: 'flex', gap: 0, position: 'relative' }}>
            <div style={{ position: 'absolute', top: 28, left: '12%', right: '12%', height: 1, background: 'rgba(124,58,237,0.12)', pointerEvents: 'none' }} />
            {steps.map((s, i) => (
              <div key={i} onClick={() => setActiveStep(i)} style={{ flex: 1, textAlign: 'center', padding: '0 12px', cursor: 'pointer' }}>
                <div style={{ width: 56, height: 56, borderRadius: '50%', background: activeStep === i ? `linear-gradient(135deg, ${ACCENT}, ${ACCENT2})` : 'rgba(124,58,237,0.08)', border: `2px solid ${activeStep === i ? ACCENT : 'rgba(124,58,237,0.2)'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', transition: 'all 300ms cubic-bezier(.23,1,.32,1)', boxShadow: activeStep === i ? '0 0 20px rgba(124,58,237,0.4)' : 'none' }}>
                  <span style={{ fontSize: 11, fontWeight: 800, color: activeStep === i ? '#fff' : ACCENT, letterSpacing: '0.05em' }}>{s.num}</span>
                </div>
                <h3 style={{ fontSize: 13, fontWeight: 700, color: activeStep === i ? ACCENT : '#eef2ff', marginBottom: 6, transition: 'color 300ms' }}>{s.title}</h3>
                <p style={{ fontSize: 12, color: 'rgba(238,242,255,0.45)', lineHeight: 1.5, maxWidth: 160, margin: '0 auto' }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
