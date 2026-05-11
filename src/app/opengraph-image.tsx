import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'SpeakIQ — AI Language Tutor'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(135deg, #0a0a1a 0%, #1a0a3a 50%, #0a1a2a 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'sans-serif',
          position: 'relative',
        }}
      >
        {/* Background glow orbs */}
        <div style={{
          position: 'absolute', top: 80, left: 120,
          width: 400, height: 400, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(124,58,237,0.35) 0%, transparent 70%)',
        }} />
        <div style={{
          position: 'absolute', bottom: 60, right: 100,
          width: 350, height: 350, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(6,182,212,0.25) 0%, transparent 70%)',
        }} />

        {/* Badge */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 8,
          padding: '8px 20px', borderRadius: 999,
          background: 'rgba(124,58,237,0.2)',
          border: '1px solid rgba(124,58,237,0.4)',
          color: '#c4b5fd', fontSize: 18, fontWeight: 700,
          marginBottom: 28,
        }}>
          🌍 50+ Languages · AI Native Speaker Tutor
        </div>

        {/* Headline */}
        <div style={{
          fontSize: 80, fontWeight: 900,
          color: '#ffffff', textAlign: 'center',
          lineHeight: 1.1, marginBottom: 24,
        }}>
          Your AI Language
          <br />
          <span style={{ background: 'linear-gradient(90deg, #7c3aed, #06b6d4)', backgroundClip: 'text', color: 'transparent' }}>
            Tutor — 24/7
          </span>
        </div>

        {/* Sub */}
        <div style={{
          fontSize: 28, color: 'rgba(255,255,255,0.55)',
          textAlign: 'center', maxWidth: 700, lineHeight: 1.5, marginBottom: 40,
        }}>
          Real conversations · Instant corrections · Auto flashcards
        </div>

        {/* CTA pill */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 12,
          padding: '14px 36px', borderRadius: 16,
          background: 'linear-gradient(135deg, #7c3aed, #06b6d4)',
          color: '#ffffff', fontSize: 24, fontWeight: 800,
        }}>
          Start free at speakiq.app
        </div>
      </div>
    ),
    { ...size }
  )
}
