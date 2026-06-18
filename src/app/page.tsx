// app/page.tsx — SERVER COMPONENT (no 'use client')
// Assembles sections in order from siteConfig.layout.sectionOrder.
// Crawlers (GPTBot, ClaudeBot, PerplexityBot) read plain HTML from every section.
import { siteConfig } from '@/lib/site.config'
import { Suspense } from 'react'
import HeroSection       from '@/components/HeroSection'
import MarqueeBar        from '@/components/MarqueeBar'
import HowItWorksSection from '@/components/HowItWorksSection'
import FeaturesGrid      from '@/components/FeaturesGrid'
import PricingSection    from '@/components/PricingSection'
import FAQSection        from '@/components/FAQSection'
import FinalCTA          from '@/components/FinalCTA'
import SpeakStats        from '@/components/SpeakStats'
import SampleLesson      from '@/components/SampleLesson'
import LiveStatsBar      from '@/components/LiveStatsBar'

const SECTION_MAP: Record<string, React.ReactNode> = {
  hero:         <HeroSection />,
  sampleLesson: <SampleLesson />,
  liveStats:   <LiveStatsBar />,
  speakStats:  <Suspense fallback={null}><SpeakStats /></Suspense>,
  marquee:     <MarqueeBar />,
  howItWorks:  <HowItWorksSection />,
  features:    <Suspense fallback={<div className="h-96" />}><FeaturesGrid /></Suspense>,
  pricing:     <PricingSection />,
  faq:         <FAQSection />,
  finalCta:    <FinalCTA />,
}

export default function HomePage() {
  const { sectionOrder, hideSections } = siteConfig.layout
  const visible = sectionOrder.filter(id => !hideSections.includes(id))

  return (
    <div className="flex flex-col">
      {visible.map(id => (
        <div key={id}>
          {SECTION_MAP[id] ?? null}
        </div>
      ))}
    </div>
  )
}
