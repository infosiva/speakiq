/**
 * site.config.ts — SpeakIQ site-wide configuration
 * All landing page copy, features, languages and testimonials live here.
 * No hardcoded strings in JSX — import from this file instead.
 */

export const siteConfig = {
  name: 'SpeakIQ',
  url: 'https://speakiq.app',
  tagline: 'Speak Any Language with AI',
  description: 'AI-powered conversation practice. Learn Spanish, French, Japanese, Hindi and 30+ languages through real dialogue.',
  subtagline: 'Real conversations, instant grammar corrections, and automatic flashcards — free to start, no account needed.',
  cta: 'Start Speaking Free',
  ctaHref: '/converse',
  email: 'info.siva@gmail.com',
  primaryColor: '#6366f1',
  color: '#7c3aed',

  chatbot: {
    openingMessage: 'Hola! 👋 Want to practice a language? Tell me which one and I\'ll chat with you right now.',
    apiEndpoint: '/api/chat',
  },

  stats: {
    users: 'early users',
    languages: '50+',
    sessionsToday: 'daily learning',
  },

  pricing: {
    free: {
      name: 'Free',
      price: '$0',
      sub: 'forever',
      features: ['20 full conversations/day', '50+ languages with native AI voices', '7 practice modes: speaking, writing, listening & more', 'AI pronunciation feedback', 'Auto flashcard generation', 'Daily streak tracking'],
    },
    pro: {
      name: 'Pro',
      price: '$9.99/mo',
      sub: '/month',
      features: ['Unlimited messages', 'Grammar reports', 'Progress saved forever', 'Priority AI speed'],
    },
  },

  seo: {
    title: 'SpeakIQ — AI Language Learning & Conversation Practice',
    description:
      'Practice speaking Spanish, French, Japanese and 30+ languages with AI. Real conversations, instant feedback.',
    keywords: [
      'language learning',
      'AI tutor',
      'speak Spanish',
      'learn French',
      'conversation practice',
      'AI language learning',
      'language practice',
      'learn Japanese',
      'AI conversation partner',
      'pronunciation practice',
      'vocabulary builder',
      'SpeakIQ',
    ],
  },

  statsLegacy: [
    { value: '50+', label: 'Languages' },
    { value: '7', label: 'Practice modes' },
    { value: '20', label: 'Free messages/day' },
    { value: '$7', label: 'Pro/month' },
  ],

  features: [
    {
      icon: '💬',
      title: 'Real Conversations',
      description: 'Chat naturally with your AI tutor in any language. Get corrections mid-conversation, just like a native speaker would.',
    },
    {
      icon: '📇',
      title: 'Auto Flashcards',
      description: 'Every vocabulary word from your session is automatically saved as a flashcard for later review.',
    },
    {
      icon: '📊',
      title: 'Grammar Reports',
      description: 'See a full breakdown of your grammar mistakes and corrections at the end of every session.',
    },
    {
      icon: '🔥',
      title: 'Streak Tracking',
      description: 'Build a daily habit with streak tracking. Practice a little every day and watch your fluency soar.',
    },
    {
      icon: '🎭',
      title: 'Roleplay Scenarios',
      description: 'Practice real-life situations — ordering at a restaurant, navigating an airport, a first date — all in your target language.',
    },
    {
      icon: '🌍',
      title: '50+ Languages',
      description: 'From Spanish and Japanese to Tamil and Swahili. Plus AI/Tech skills like Python and Prompt Engineering.',
    },
  ],

  languages: [
    { name: 'Spanish', flag: '🇪🇸' },
    { name: 'French', flag: '🇫🇷' },
    { name: 'German', flag: '🇩🇪' },
    { name: 'Japanese', flag: '🇯🇵' },
    { name: 'Mandarin', flag: '🇨🇳' },
    { name: 'Korean', flag: '🇰🇷' },
    { name: 'Italian', flag: '🇮🇹' },
    { name: 'Portuguese', flag: '🇵🇹' },
    { name: 'Hindi', flag: '🇮🇳' },
    { name: 'Arabic', flag: '🇸🇦' },
    { name: 'Tamil', flag: '🇮🇳' },
    { name: 'Turkish', flag: '🇹🇷' },
  ],

  testimonials: [
    {
      name: 'Maria S.',
      country: 'Brazil',
      flag: '🇧🇷',
      text: 'I practiced Spanish for 20 minutes and already felt more confident. The instant corrections are a game-changer.',
      stars: 5,
    },
    {
      name: 'Kenji T.',
      country: 'Japan',
      flag: '🇯🇵',
      text: 'SpeakIQ helped me prepare for my English job interview. The roleplay mode is exactly what I needed.',
      stars: 5,
    },
    {
      name: 'Aisha M.',
      country: 'Nigeria',
      flag: '🇳🇬',
      text: 'Learning French has never been this fun. I love that I can practice anytime, even at midnight!',
      stars: 5,
    },
  ],

  howItWorks: [
    {
      step: '1',
      title: 'Pick your language and level',
      description: 'Choose from 50+ languages and set your proficiency level — Beginner, Intermediate, or Advanced.',
    },
    {
      step: '2',
      title: 'Start a real conversation',
      description: 'Your AI tutor greets you in your target language and adapts to your level. Make mistakes — that\'s how you learn.',
    },
    {
      step: '3',
      title: 'Review and improve',
      description: 'Grammar corrections appear in real-time. Words are saved to flashcards. Your streak tracks daily progress.',
    },
  ],

  about: {
    mission:
      'SpeakIQ exists because language learning should feel like talking to a friend, not studying a textbook. We built an AI tutor that gives you the real conversation practice you need to become fluent — available 24/7, in any language, free to start.',
    founder:
      'Built by a solo developer who learned three languages the hard way and wanted to make fluency accessible to everyone.',
  },

  nav: [
    { label: 'Home', href: '/' },
    { label: 'Practice', href: '/converse' },
    { label: 'Languages', href: '/languages' },
    { label: 'Pricing', href: '/pricing' },
    { label: 'About', href: '/about' },
  ],
}
