// components/MarqueeBar.tsx — language flag ticker, server component, CSS-only animation
import { siteConfig } from '@/lib/site.config'

export default function MarqueeBar() {
  const items = [...siteConfig.socialProof.marqueeItems, ...siteConfig.socialProof.marqueeItems]

  return (
    <section
      aria-label="Supported languages"
      className="py-5 border-y border-white/[0.05] overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #0d0b1e 0%, #120f2a 100%)' }}
    >
      <div className="flex items-center gap-4 mb-3 px-4 sm:px-6 max-w-6xl mx-auto">
        <span className="text-[11px] text-white/30 font-semibold uppercase tracking-widest whitespace-nowrap">
          50+ languages
        </span>
        <div className="flex-1 h-px bg-white/[0.06]" />
      </div>
      <div className="marquee-wrapper">
        <div className="marquee-track gap-3">
          {items.map((item, i) => (
            <span
              key={i}
              className="flex items-center gap-2 text-sm text-white/50 font-medium whitespace-nowrap select-none px-3 py-1.5 rounded-lg bg-white/[0.03] border border-white/[0.06]"
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
