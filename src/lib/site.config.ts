// src/lib/site.config.ts — THE ONLY FILE TO EDIT to rebrand or reconfigure SpeakIQ
// All sections, copy, FAQ, pricing, and layout variants are driven from here.

export type HeroVariant = 'split' | 'centered' | 'minimal'

export interface SiteConfig {
  siteName: string
  domain: string
  themeColor: string
  heroBadge: string
  headline: string[]
  subheadline: string
  ctaPrimary: { text: string; href: string }
  ctaSecondary: { text: string; href: string }
  freeTier: {
    pills: string[]
    gateHeadline: string
    gateSubtext: string
    gateCtaText: string
    gateCtaHref: string
    gateSecondaryText: string
  }
  socialProof: {
    marqueeItems: string[]
    stat?: string
  }
  howItWorks: Array<{ step: number; icon: string; title: string; desc: string }>
  features: Array<{ icon: string; title: string; desc: string; size?: 'large' | 'wide' | 'medium' }>
  pricing: {
    free: {
      name: string
      price: string
      period: string
      features: Array<{ text: string; included: boolean }>
      cta: { text: string; href: string }
    }
    pro: {
      name: string
      price: string
      period: string
      badge?: string
      features: Array<{ text: string; included: boolean }>
      cta: { text: string; href: string }
    }
  }
  faq: Array<{ q: string; a: string }>
  finalCta: { headline: string; subtext: string; ctaText: string; ctaHref: string }
  layout: { heroVariant: HeroVariant; sectionOrder: string[]; hideSections: string[] }
  seo: { title: string; description: string; ogImage: string; llmsDescription: string }
  nav: Array<{ label: string; href: string }>
  chatbot: { welcomeMessage: string; botName: string; placeholder: string }

  // Legacy fields used by existing pages (kept for backwards compatibility)
  name?: string
  url?: string
  tagline?: string
  description?: string
  subtagline?: string
  cta?: string
  ctaHref?: string
  email?: string
  primaryColor?: string
  color?: string
  stats?: { users: string; languages: string; sessionsToday: string }
  languages?: Array<{ name: string; flag: string }>
  testimonials?: Array<{ name: string; country: string; flag: string; text: string; stars: number }>
  about?: { mission: string; founder: string }
  statsLegacy?: Array<{ value: string; label: string }>
}

export const siteConfig: SiteConfig = {
  // ── New SiteConfig fields ────────────────────────────────────────────────
  siteName:   'SpeakIQ',
  domain:     'speakiq.app',
  themeColor: 'indigo',

  heroBadge:    'speakiq · AI language coach · free to try',
  headline:     ["Not just 'try again' —", 'AI that tells you exactly why.'],
  subheadline:  'Real-time AI speech coach that pinpoints the exact syllable, explains the fix, and tracks your progress.',
  ctaPrimary:   { text: '🗣️ Start Talking Free', href: '/converse' },
  ctaSecondary: { text: '🌍 See Languages',      href: '/languages' },

  freeTier: {
    pills:             ['3 free sessions', 'Any language', 'No sign-up'],
    gateHeadline:      "You've used your 3 free sessions!",
    gateSubtext:       "Ready to go further? Upgrade to unlimited practice.",
    gateCtaText:       'Upgrade to Pro — $9.99/mo',
    gateCtaHref:       '/pricing',
    gateSecondaryText: 'Come back free tomorrow',
  },

  socialProof: {
    marqueeItems: [
      '🇪🇸 Spanish', '🇫🇷 French', '🇩🇪 German', '🇯🇵 Japanese',
      '🇧🇷 Portuguese', '🇮🇳 Hindi', '🇨🇳 Mandarin', '🇮🇹 Italian',
      '🇰🇷 Korean', '🇸🇦 Arabic', '🇹🇷 Turkish', '🇳🇱 Dutch',
    ],
  },

  howItWorks: [
    { step: 1, icon: '🌍', title: 'Pick a language', desc: 'Choose from 50+ languages and your proficiency level — Beginner to Advanced.' },
    { step: 2, icon: '🤖', title: 'AI coaches you live', desc: 'Your AI tutor speaks with you, corrects grammar in real-time, and adapts to your pace.' },
    { step: 3, icon: '📈', title: 'Track your progress', desc: 'Streak tracking, flashcards, and grammar reports show your improvement daily.' },
  ],

  features: [
    { icon: '🎙️', title: 'AI Pronunciation Feedback', desc: 'Hear yourself, get instant phonetic coaching. Sound more natural with every session.', size: 'large' },
    { icon: '🌍', title: '50+ Languages',              desc: 'From Spanish and Japanese to Tamil and Swahili. Any language, any level.',           size: 'medium' },
    { icon: '💬', title: 'Conversation Practice',      desc: 'Real dialogue with an AI tutor that adapts to your style and pace.',                 size: 'medium' },
    { icon: '✏️', title: 'Grammar Correction',         desc: 'Mistakes corrected mid-conversation, just like a native speaker would.',             size: 'medium' },
    { icon: '📊', title: 'Progress Tracking',          desc: 'Daily streaks, XP, flashcard bank, and weekly grammar reports in one dashboard.',    size: 'wide'   },
    { icon: '📴', title: 'Offline Mode',               desc: 'Saved vocabulary and flashcards work offline. Practice anywhere, anytime.',          size: 'medium' },
  ],

  pricing: {
    free: {
      name: 'Free', price: '$0', period: 'forever',
      features: [
        { text: '3 sessions per day',          included: true  },
        { text: '50+ languages',               included: true  },
        { text: 'AI grammar correction',       included: true  },
        { text: 'Daily streak tracking',       included: true  },
        { text: 'Unlimited sessions',          included: false },
        { text: 'Grammar reports',             included: false },
      ],
      cta: { text: 'Start Free →', href: '/converse' },
    },
    pro: {
      name: 'Pro', price: '$9.99', period: '/month', badge: 'Popular',
      features: [
        { text: 'Unlimited sessions',          included: true },
        { text: 'Full grammar reports',        included: true },
        { text: 'Progress saved forever',      included: true },
        { text: 'Priority AI speed',           included: true },
        { text: 'Roleplay scenarios',          included: true },
        { text: 'Export flashcards & reports', included: true },
      ],
      cta: { text: 'Upgrade to Pro', href: '/pricing' },
    },
  },

  faq: [
    { q: 'Is SpeakIQ free?',
      a: 'Yes — SpeakIQ is free to start with 3 full sessions per day. No credit card or account required to begin.' },
    { q: 'What languages does SpeakIQ support?',
      a: 'SpeakIQ supports 50+ languages including Spanish, French, German, Japanese, Mandarin, Portuguese, Hindi, Arabic, Tamil, Korean, Italian, and more.' },
    { q: 'How does AI coaching work?',
      a: "Your AI tutor engages you in real conversation in your target language. It corrects grammar mistakes mid-chat, coaches pronunciation, and saves vocabulary as flashcards automatically." },
    { q: 'Is SpeakIQ better than Duolingo?',
      a: 'SpeakIQ focuses on real conversational fluency — you practice speaking and writing in full sentences, not drills. It\'s a complement to apps like Duolingo, not a replacement.' },
    { q: 'What does Pro include?',
      a: "Pro gives you unlimited daily sessions, full grammar reports, roleplay scenarios, priority AI response speed, and the ability to export your flashcards and progress reports." },
  ],

  finalCta: {
    headline: 'Start speaking confidently today',
    subtext:  'Free to start. No account. Works on any device.',
    ctaText:  '🗣️ Start Free Session →',
    ctaHref:  '/converse',
  },

  layout: {
    heroVariant:  'split',
    sectionOrder: ['hero', 'sampleLesson', 'liveStats', 'speakStats', 'marquee', 'howItWorks', 'features', 'pricing', 'faq', 'finalCta'],
    hideSections: [],
  },

  seo: {
    title:           'SpeakIQ — AI Language Learning & Speaking Coach',
    description:     'Practice speaking Spanish, French, Japanese and 50+ languages with AI. Real conversations, instant grammar feedback, no tutor needed.',
    ogImage:         '/og.png',
    llmsDescription: 'SpeakIQ is a free AI language learning and speaking coach at speakiq.app. It provides real conversation practice in 50+ languages with instant grammar correction, pronunciation coaching, and automatic flashcard generation. Free tier: 3 sessions/day, no account required. Pro: unlimited sessions, grammar reports, roleplay scenarios.',
  },

  nav: [
    { label: 'Home',       href: '/' },
    { label: 'Features',   href: '/#features' },
    { label: 'How it works', href: '/#how-it-works' },
    { label: 'Pricing',    href: '/#pricing' },
    { label: 'Languages',  href: '/languages' },
    { label: 'About',      href: '/about' },
  ],

  chatbot: {
    welcomeMessage: 'Tell me which language you\'re learning and I\'ll start a real conversation with you right now — corrections included.',
    botName:        'SpeakBot',
    placeholder:    'Ask me about language practice…',
  },

  // ── Legacy fields (keep existing pages working) ───────────────────────────
  name:         'SpeakIQ',
  url:          'https://speakiq.app',
  tagline:      'Speak Any Language with AI',
  description:  'AI-powered conversation practice. Learn Spanish, French, Japanese, Hindi and 50+ languages through real dialogue.',
  subtagline:   'Real conversations, instant grammar corrections, and automatic flashcards — free to start, no account needed.',
  cta:          'Start Speaking Free',
  ctaHref:      '/converse',
  email:        'info.siva@gmail.com',
  primaryColor: '#6366f1',
  color:        '#7c3aed',

  stats: {
    users:         'early users',
    languages:     '50+',
    sessionsToday: 'daily learning',
  },

  languages: [
    { name: 'Spanish',    flag: '🇪🇸' },
    { name: 'French',     flag: '🇫🇷' },
    { name: 'German',     flag: '🇩🇪' },
    { name: 'Japanese',   flag: '🇯🇵' },
    { name: 'Mandarin',   flag: '🇨🇳' },
    { name: 'Korean',     flag: '🇰🇷' },
    { name: 'Italian',    flag: '🇮🇹' },
    { name: 'Portuguese', flag: '🇵🇹' },
    { name: 'Hindi',      flag: '🇮🇳' },
    { name: 'Arabic',     flag: '🇸🇦' },
    { name: 'Tamil',      flag: '🇮🇳' },
    { name: 'Turkish',    flag: '🇹🇷' },
  ],

  testimonials: [
    { name: 'Maria S.', country: 'Brazil', flag: '🇧🇷',  text: 'I practiced Spanish for 20 minutes and already felt more confident. The instant corrections are a game-changer.', stars: 5 },
    { name: 'Kenji T.', country: 'Japan',  flag: '🇯🇵',  text: 'SpeakIQ helped me prepare for my English job interview. The roleplay mode is exactly what I needed.', stars: 5 },
    { name: 'Aisha M.', country: 'Nigeria', flag: '🇳🇬', text: 'Learning French has never been this fun. I love that I can practice anytime, even at midnight!', stars: 5 },
  ],

  about: {
    mission: 'SpeakIQ exists because language learning should feel like talking to a friend, not studying a textbook. We built an AI tutor that gives you the real conversation practice you need to become fluent — available 24/7, in any language, free to start.',
    founder: 'Built by a solo developer who learned three languages the hard way and wanted to make fluency accessible to everyone.',
  },

  statsLegacy: [
    { value: '50+', label: 'Languages' },
    { value: '7',   label: 'Practice modes' },
    { value: '3',   label: 'Free sessions/day' },
    { value: '$10', label: 'Pro/month' },
  ],
}

export default siteConfig
