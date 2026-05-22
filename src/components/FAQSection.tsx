'use client'
// components/FAQSection.tsx — inline accordion, no Radix dependency
// Content mirrors SchemaOrg JSON-LD — single source of truth in siteConfig.faq
import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { siteConfig } from '@/lib/site.config'

export default function FAQSection() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section id="faq" className="py-14 px-4 sm:px-6 max-w-3xl mx-auto border-t border-white/[0.05]">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-black text-white mb-2">Frequently asked questions</h2>
        <p className="text-white/40 text-sm">Everything you need to know</p>
      </div>

      <div className="flex flex-col gap-2">
        {siteConfig.faq.map((item, i) => (
          <div
            key={i}
            className="rounded-xl border border-white/[0.07] bg-white/[0.02] overflow-hidden"
          >
            <button
              onClick={() => setOpen(open === i ? null : i)}
              className="w-full flex items-center justify-between px-5 py-4 text-left text-sm font-semibold text-white/80 hover:text-white transition-colors"
              aria-expanded={open === i}
            >
              {item.q}
              <ChevronDown
                size={16}
                className={`text-white/30 transition-transform duration-200 shrink-0 ml-3 ${open === i ? 'rotate-180' : ''}`}
              />
            </button>
            {open === i && (
              <div className="px-5 pb-4 text-sm text-white/50 leading-relaxed">
                {item.a}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}
