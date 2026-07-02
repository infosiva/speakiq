// components/HeroSection.tsx — server component wrapper
import { getContentOverrides } from '@/lib/content'
import HeroClient from './HeroClient'

export default async function HeroSection() {
  const overrides = await getContentOverrides()
  return (
    <section
      style={{
        background: 'linear-gradient(145deg, #0f0a1e 0%, #1a0d35 50%, #0d0a2a 100%)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Subtle violet orb */}
      <div style={{
        position: 'absolute', top: '-120px', right: '-80px',
        width: '500px', height: '500px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(124,58,237,0.18) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', bottom: '-80px', left: '-60px',
        width: '400px', height: '400px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(6,182,212,0.10) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />
      <div className="relative px-4 sm:px-6 pt-10 pb-12 max-w-6xl mx-auto">
        <HeroClient overrides={overrides} />
      </div>
    </section>
  )
}
