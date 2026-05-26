// components/HeroSection.tsx — server component wrapper
// HeroClient is now self-contained: owns the 2-col grid + language picker + demo
import HeroClient from './HeroClient'

export default function HeroSection() {
  return (
    <section className="relative px-4 sm:px-6 pt-6 pb-6 max-w-6xl mx-auto">
      <HeroClient />
    </section>
  )
}
