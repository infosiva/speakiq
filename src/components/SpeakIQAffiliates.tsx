'use client';

/**
 * Contextual affiliate component for SpeakIQ.
 * Promotes language learning platforms that complement AI conversation practice.
 * Replace AFFILIATE_LINKS with your actual tracking URLs.
 */

const AFFILIATE_LINKS = [
  {
    name: 'iTalki',
    tagline: 'Book 1-on-1 lessons with native-speaking tutors',
    cta: 'Find a Tutor →',
    url: 'https://italki.com/?affiliate=siva', // TODO: replace with real affiliate link
    color: '#e64a19',
    icon: '👨‍🏫',
  },
  {
    name: 'Preply',
    tagline: 'Affordable language tutors from $5/hr',
    cta: 'Browse Tutors →',
    url: 'https://preply.com/?affiliate=siva', // TODO: replace with real affiliate link
    color: '#4caf50',
    icon: '🎓',
  },
  {
    name: 'Babbel',
    tagline: 'Structured courses to complement your conversation practice',
    cta: 'Try Babbel Free →',
    url: 'https://babbel.com/?affiliate=siva', // TODO: replace with real affiliate link
    color: '#f44336',
    icon: '📚',
  },
];

export default function SpeakIQAffiliates() {
  return (
    <section className="my-10 rounded-2xl border border-emerald-500/20 bg-emerald-950/20 p-6 backdrop-blur">
      <h3 className="mb-1 text-sm font-bold uppercase tracking-widest text-emerald-400/60">
        Accelerate your learning
      </h3>
      <p className="mb-5 text-xs text-emerald-300/40">
        Pair AI practice with these proven language tools
      </p>
      <div className="grid gap-3 sm:grid-cols-3">
        {AFFILIATE_LINKS.map((a) => (
          <a
            key={a.name}
            href={a.url}
            target="_blank"
            rel="noopener sponsored"
            className="group flex flex-col rounded-xl border border-emerald-500/10 bg-emerald-900/20 p-4 transition-all hover:border-emerald-500/30 hover:bg-emerald-900/30"
          >
            <div className="mb-2 text-xl">{a.icon}</div>
            <div className="mb-1 text-sm font-semibold text-emerald-100 group-hover:text-white">
              {a.name}
            </div>
            <div className="mb-3 text-xs text-emerald-300/50">{a.tagline}</div>
            <div
              className="mt-auto inline-block rounded-lg px-3 py-1.5 text-xs font-bold text-white transition-opacity hover:opacity-90"
              style={{ background: a.color }}
            >
              {a.cta}
            </div>
          </a>
        ))}
      </div>
      <p className="mt-3 text-center text-[10px] text-emerald-400/30">
        Sponsored · We may earn a commission at no cost to you
      </p>
    </section>
  );
}
