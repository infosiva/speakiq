// components/HeroSection.tsx — server component wrapper
// HeroClient is now self-contained: owns the 2-col grid + language picker + demo
import { getContentOverrides } from '@/lib/content'
import HeroClient from './HeroClient'

export default async function HeroSection() {
  const overrides = await getContentOverrides()
  return (
    <section className="relative px-4 sm:px-6 pt-6 pb-6 max-w-6xl mx-auto">
      <HeroClient overrides={overrides} />
    </section>
  )
}
