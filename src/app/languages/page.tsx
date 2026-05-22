import type { Metadata } from 'next'
import Link from 'next/link'
import { siteConfig } from '@/lib/site.config'

export const metadata: Metadata = {
  title: `Languages | ${siteConfig.name}`,
  description: `Practice 50+ languages with AI on ${siteConfig.name}. Spanish, French, Japanese, Hindi, Arabic and many more.`,
  robots: { index: true, follow: true },
  openGraph: {
    title: `Languages — ${siteConfig.name}`,
    description: `Practice 50+ languages with AI on ${siteConfig.name}.`,
    type: 'website',
    siteName: siteConfig.name,
  },
}

const LANGUAGES = [
  { name: 'Spanish', flag: '🇪🇸', learners: '~500M speakers' },
  { name: 'French', flag: '🇫🇷', learners: '~300M speakers' },
  { name: 'German', flag: '🇩🇪', learners: '~130M speakers' },
  { name: 'Japanese', flag: '🇯🇵', learners: '~130M speakers' },
  { name: 'Mandarin', flag: '🇨🇳', learners: '~1.1B speakers' },
  { name: 'Korean', flag: '🇰🇷', learners: '~80M speakers' },
  { name: 'Italian', flag: '🇮🇹', learners: '~65M speakers' },
  { name: 'Portuguese', flag: '🇵🇹', learners: '~260M speakers' },
  { name: 'Hindi', flag: '🇮🇳', learners: '~600M speakers' },
  { name: 'Arabic', flag: '🇸🇦', learners: '~420M speakers' },
  { name: 'Tamil', flag: '🇮🇳', learners: '~80M speakers' },
  { name: 'Turkish', flag: '🇹🇷', learners: '~85M speakers' },
  { name: 'Dutch', flag: '🇳🇱', learners: '~25M speakers' },
  { name: 'Swedish', flag: '🇸🇪', learners: '~10M speakers' },
  { name: 'Polish', flag: '🇵🇱', learners: '~45M speakers' },
  { name: 'Greek', flag: '🇬🇷', learners: '~13M speakers' },
  { name: 'Russian', flag: '🇷🇺', learners: '~260M speakers' },
  { name: 'Vietnamese', flag: '🇻🇳', learners: '~97M speakers' },
  { name: 'Thai', flag: '🇹🇭', learners: '~60M speakers' },
  { name: 'Indonesian', flag: '🇮🇩', learners: '~270M speakers' },
  { name: 'Hebrew', flag: '🇮🇱', learners: '~10M speakers' },
  { name: 'Persian', flag: '🇮🇷', learners: '~80M speakers' },
  { name: 'Swahili', flag: '🇰🇪', learners: '~200M speakers' },
  { name: 'Bengali', flag: '🇧🇩', learners: '~230M speakers' },
]

export default function LanguagesPage() {
  return (
    <main className="max-w-5xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
      <div className="mb-12 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-indigo-500/40 bg-indigo-500/10 text-indigo-300 text-xs font-bold mb-6">
          🌍 50+ Languages Available
        </div>
        <h1 className="text-4xl sm:text-5xl font-black tracking-tight leading-tight mb-4">
          Every Language. One AI Tutor.
        </h1>
        <p className="text-white/50 text-lg max-w-xl mx-auto leading-relaxed">
          Practice any of 50+ world languages through real AI conversation — available 24/7, free to start.
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mb-12">
        {LANGUAGES.map((lang) => (
          <Link
            key={lang.name}
            href={`/converse`}
            className="flex items-center gap-3 p-3.5 rounded-2xl border border-white/[0.07] bg-white/[0.02] hover:bg-indigo-500/10 hover:border-indigo-500/30 transition-all group"
          >
            <span className="text-2xl shrink-0">{lang.flag}</span>
            <div className="min-w-0">
              <div className="font-semibold text-sm text-white group-hover:text-indigo-300 transition-colors truncate">{lang.name}</div>
              <div className="text-[10px] text-white/30 truncate">{lang.learners}</div>
            </div>
          </Link>
        ))}
      </div>

      <div className="text-center">
        <p className="text-white/40 text-sm mb-6">Plus AI/Tech skills: Python, JavaScript, SQL, Prompt Engineering and more.</p>
        <Link
          href="/converse"
          className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl font-bold text-sm text-white transition-all hover:-translate-y-0.5"
          style={{ background: 'linear-gradient(135deg, #6366f1, #06b6d4)' }}
        >
          Start Practicing Free →
        </Link>
      </div>
    </main>
  )
}
