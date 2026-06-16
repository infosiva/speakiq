import type { Metadata } from 'next'
import Script from 'next/script'
import './globals.css'
import { ClerkProvider } from '@clerk/nextjs'
import SharedNavbar from '@/components/SharedNavbar'
import Footer from '../../components/Footer'
import DesignEffects from '@/components/DesignEffects'
import AnimatedBackground from '@/components/AnimatedBackground'
import ChatBot from '@/components/ChatBot'
import { getSiteFlags } from '@/lib/flags'
import BackToTop from '@/components/BackToTop'
import FloatingChatWrapper from '@/components/FloatingChatWrapper'
import PageStats from '@/components/PageStats'
import type { BrandConfig } from '@/components/SharedNavbar'
import CookieConsent from "../../components/CookieConsent";
import StickyFooterCTA from "../../components/StickyFooterCTA";
import SchemaOrg from '@/components/SchemaOrg'
import FeedbackWidget from '@/components/FeedbackWidget'
import { siteConfig } from '@/lib/site.config'
import { loadSiteTheme, buildThemeStyleTag, isWidgetHidden } from '@/lib/theme-loader'

const SITE_NAME = siteConfig.name ?? siteConfig.siteName
const SITE_URL  = siteConfig.url  ?? `https://${siteConfig.domain}`

const brand: BrandConfig = {
  name: SITE_NAME,
  tagline: siteConfig.subtagline ?? siteConfig.subheadline,
  icon: 'SQ',
  color: siteConfig.primaryColor ?? '#0284c7',
  url: SITE_URL,
  logoSrc: '/logo.svg',
  navLinks: siteConfig.nav,
  cta: { label: 'Start Free', href: '/converse' },
}

export const metadata: Metadata = {
  title: siteConfig.seo.title,
  description: siteConfig.seo.description,
  openGraph: {
    title: siteConfig.seo.title,
    description: siteConfig.seo.description,
    type: 'website',
    locale: 'en_US',
    siteName: SITE_NAME,
    url: SITE_URL,
    images: [{ url: '/og.png', width: 1200, height: 630, alt: `${SITE_NAME} — AI Language Learning` }],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.seo.title,
    description: siteConfig.seo.description,
    images: ['/og.png'],
    site: '@speakiqapp',
  },
  robots: { index: true, follow: true },
  metadataBase: new URL(SITE_URL),
  alternates: { canonical: SITE_URL },
}

const clerkAppearance = {
  variables: {
    colorPrimary: '#7c3aed',
    colorBackground: '#1c1830',
    colorText: '#ffffff',
    colorTextSecondary: '#9ca3af',
    colorInputBackground: '#2a2545',
    colorInputText: '#ffffff',
    colorNeutral: '#ffffff',
    colorShimmer: '#7c3aed',
    borderRadius: '12px',
    fontSize: '15px',
  },
}

const hasClerkKeys = !!(
  process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY &&
  process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY !== 'pk_test_REPLACE_ME'
)

function MaybeClerk({ children }: { children: React.ReactNode }) {
  if (!hasClerkKeys) return <>{children}</>
  return <ClerkProvider appearance={clerkAppearance}>{children}</ClerkProvider>
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const [flags, theme] = await Promise.all([
    getSiteFlags('speakiq'),
    loadSiteTheme('speakiq'),
  ])

  const themeCSS = buildThemeStyleTag(theme, {
    background: '#f0f9ff',
    primary: '#0284c7',
    secondary: '#0ea5e9',
  })

  return (
    <MaybeClerk>
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="google-adsense-account" content="ca-pub-4237294630161176" />
        <meta name="Impact-Site-Verification" content="cec1d783-d697-4f52-a52f-2677e900984f" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/favicon.svg" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@700;800;900&family=DM+Sans:wght@400;500;600&display=swap" rel="stylesheet" />
        <style dangerouslySetInnerHTML={{ __html: `
          :root {
            --theme-primary: #0284c7;
            --theme-secondary: #0ea5e9;
            --theme-base: #f0f9ff;
            --background: #f0f9ff;
            --surface-1: #ffffff;
            --surface-2: #e0f2fe;
            --foreground: #0c2333;
            --text-2: #4b6b80;
            --border-default: rgba(2,132,199,0.14);
            --border-strong: rgba(2,132,199,0.25);
            --radius: 1rem;
            --radius-lg: 1.5rem;
            --radius-xl: 2rem;
          }
          body { font-family: 'DM Sans', system-ui, sans-serif !important; }
          h1, h2, h3, .display { font-family: 'Nunito', sans-serif !important; }
          .glass {
            background: rgba(255,255,255,0.65) !important;
            border-color: rgba(2,132,199,0.12) !important;
          }
          ${themeCSS}
        `}} />

        <SchemaOrg />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebApplication",
          "name": "SpeakIQ",
          "url": "https://speakiq.app",
          "description": "AI language tutor for 50+ languages. Practice speaking, get instant corrections, and build fluency — no account needed.",
          "applicationCategory": "EducationApplication",
          "operatingSystem": "Web",
          "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
        }) }} />
      </head>
      <body className="flex flex-col min-h-screen">
        <Script defer data-domain="speakiq.app" src="https://plausible.io/js/script.js" strategy="afterInteractive" />
        <Script defer data-site="speakiq.app" src="http://31.97.56.148:3098/t.js" strategy="afterInteractive" />
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4237294630161176"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
        <AnimatedBackground />
        <DesignEffects />
        <PageStats site="speakiq.app" />
        <div id="layout-nav"><SharedNavbar brand={brand} /></div>
        <main className="flex-1 pt-16">{children}</main>
        <div id="layout-footer" className="relative z-10 bg-[#e0f2fe] border-t border-sky-200"><Footer siteName="SpeakIQ" tagline="AI language tutor — 50+ languages, no account needed." /></div>
      {flags.chatbot && !isWidgetHidden(theme, 'chatbot') && <ChatBot />}
      {!isWidgetHidden(theme, 'backToTop') && <BackToTop accentColor="#0284c7" />}
      {!isWidgetHidden(theme, 'cookieConsent') && <CookieConsent />}
      {!isWidgetHidden(theme, 'stickyFooterCTA') && <StickyFooterCTA />}
      <FloatingChatWrapper />
      <FeedbackWidget siteName="SpeakIQ" accentColor="#0ea5e9" position="left" />
      </body>
    </html>
    </MaybeClerk>
  )
}
