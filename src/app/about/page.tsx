import type { Metadata } from 'next'
import { siteConfig } from '@/lib/site.config'

export const metadata: Metadata = {
  title: `About | ${siteConfig.name}`,
  description: `Learn about ${siteConfig.name} — ${siteConfig.seo.description}`,
  robots: { index: true, follow: true },
  openGraph: {
    title: `About ${siteConfig.name}`,
    description: siteConfig.about?.mission ?? siteConfig.seo.description,
    type: 'website',
    siteName: siteConfig.name,
  },
}

export default function AboutPage() {
  return (
    <main className="max-w-3xl mx-auto px-4 sm:px-6 py-16 sm:py-24">

      {/* Hero */}
      <div className="mb-14">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-violet-500/40 bg-violet-500/10 text-violet-300 text-xs font-bold mb-6 backdrop-blur-sm">
          🌍 {siteConfig.name} · Built for language learners
        </div>
        <h1 className="text-4xl sm:text-5xl font-black tracking-tight leading-tight mb-5">
          Our Mission
        </h1>
        <p className="text-white/60 text-lg leading-relaxed max-w-xl">
          {siteConfig.about?.mission ?? siteConfig.subheadline}
        </p>
      </div>

      {/* How it works */}
      <section className="mb-14">
        <h2 className="text-2xl font-black mb-8">How It Works</h2>
        <div className="space-y-6">
          {siteConfig.howItWorks.map((step) => (
            <div key={step.step} className="flex gap-5 items-start">
              <div className="shrink-0 w-10 h-10 rounded-xl bg-violet-500/20 border border-violet-500/30 flex items-center justify-center font-black text-violet-300 text-sm">
                {step.step}
              </div>
              <div>
                <h3 className="font-bold text-white mb-1">{step.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="mb-14">
        <h2 className="text-2xl font-black mb-8">What You Get</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {siteConfig.features.map((f) => (
            <div key={f.title} className="p-4 rounded-2xl border border-white/[0.07] bg-white/[0.02]">
              <div className="text-2xl mb-2">{f.icon}</div>
              <h3 className="font-semibold text-white mb-1 text-sm">{f.title}</h3>
              <p className="text-white/40 text-xs leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Founder */}
      <section className="mb-14">
        <h2 className="text-2xl font-black mb-4">The Team</h2>
        <p className="text-white/50 text-sm leading-relaxed mb-4">{siteConfig.about?.founder ?? 'SpeakIQ is built by a small team passionate about language learning and AI.'}</p>
        <p className="text-white/50 text-sm leading-relaxed">
          We use state-of-the-art AI models to deliver personalised, high-quality language practice.
          Our systems continuously improve based on user feedback and the latest AI research.
          All AI-generated content is clearly presented as such — we believe in transparency.
        </p>
      </section>

      {/* Privacy */}
      <section className="mb-14">
        <h2 className="text-2xl font-black mb-4">Privacy First</h2>
        <p className="text-white/50 text-sm leading-relaxed">
          We collect only the data necessary to provide the service. Your learning progress is stored
          locally in your browser — we do not sell your data to third parties. See our{' '}
          <a href="/privacy" className="text-violet-400 hover:text-violet-300 underline underline-offset-2 transition">
            Privacy Policy
          </a>{' '}
          for full details.
        </p>
      </section>

      {/* Advertising */}
      <section className="mb-14">
        <h2 className="text-2xl font-black mb-4">Advertising</h2>
        <p className="text-white/50 text-sm leading-relaxed">
          {siteConfig.name} is supported by advertising through Google AdSense. Ads help us keep the service
          free for everyone. We work to ensure ads are relevant and non-intrusive.
        </p>
      </section>

      {/* Contact */}
      <section className="mb-10">
        <h2 className="text-2xl font-black mb-4">Get in Touch</h2>
        <p className="text-white/50 text-sm leading-relaxed">
          Feedback, bug reports, and partnership enquiries are all welcome. Reach us at{' '}
          <a href={`mailto:${siteConfig.email}`} className="text-violet-400 hover:text-violet-300 underline underline-offset-2 transition">
            {siteConfig.email}
          </a>{' '}
          or use our{' '}
          <a href="/contact" className="text-violet-400 hover:text-violet-300 underline underline-offset-2 transition">
            contact page
          </a>.
        </p>
      </section>

      <p className="opacity-30 text-xs">© {new Date().getFullYear()} {siteConfig.name}. All rights reserved.</p>
    </main>
  )
}
