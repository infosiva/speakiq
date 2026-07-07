'use client'
import { useState } from 'react'
import Link from 'next/link'
import type { ContentOverrides } from '@/lib/content'
import LiveConversationPanel from './LiveConversationPanel'
import { usePromo } from '@/hooks/usePromo'

// ── Language data (5 hero flags matching design brief) ──────────────────────
export const HERO_LANGS = [
  { code: 'es', flag: '🇪🇸', name: 'Spanish' },
  { code: 'fr', flag: '🇫🇷', name: 'French'  },
  { code: 'ja', flag: '🇯🇵', name: 'Japanese' },
  { code: 'de', flag: '🇩🇪', name: 'German'  },
  { code: 'pt', flag: '🇧🇷', name: 'Portuguese' },
] as const

export type HeroLangCode = (typeof HERO_LANGS)[number]['code']

// ── Inline styles as constants to keep JSX clean ─────────────────────────────
const INDIGO  = '#6366f1'
const CYAN    = '#06b6d4'
const ACCENT_GRAD = `linear-gradient(135deg, ${INDIGO} 0%, ${CYAN} 100%)`
const ACCENT_GRAD_TEXT = `linear-gradient(135deg, ${INDIGO} 0%, ${CYAN} 100%)`

// Entry animation (applied via style so no extra CSS class needed)
function fadeUp(delay = 0): React.CSSProperties {
  return {
    animation: `sq-fade-up 0.6s cubic-bezier(0.23,1,0.32,1) ${delay}s both`,
  }
}

export default function HeroClient({ overrides = {} }: { overrides?: ContentOverrides }) {
  const [activeLang, setActiveLang] = useState<HeroLangCode>('es')
  const lang = HERO_LANGS.find(l => l.code === activeLang) ?? HERO_LANGS[0]
  const { isUnlocked, daysLeft } = usePromo()

  return (
    <>
      {/* ── Keyframes injected once ─────────────────────────────────── */}
      <style>{`
        @keyframes sq-fade-up {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0);    }
        }
        @keyframes sq-mesh-shift {
          0%   { background-position: 0% 50%;   }
          50%  { background-position: 100% 50%; }
          100% { background-position: 0% 50%;   }
        }
        @keyframes sq-orb-float {
          0%, 100% { transform: translateY(0)   scale(1);    }
          50%       { transform: translateY(-18px) scale(1.04); }
        }
        @keyframes sq-counter-pulse {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0.7; }
        }
        .sq-btn-primary {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 14px 28px;
          border-radius: 12px;
          font-weight: 800;
          font-size: 16px;
          color: #fff;
          background: ${ACCENT_GRAD};
          border: none;
          cursor: pointer;
          text-decoration: none;
          transition: transform 0.12s cubic-bezier(0.23,1,0.32,1),
                      box-shadow 0.12s cubic-bezier(0.23,1,0.32,1);
          box-shadow: 0 4px 24px rgba(99,102,241,0.4);
          white-space: nowrap;
          font-family: 'Nunito', sans-serif;
        }
        .sq-btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 32px rgba(99,102,241,0.55);
        }
        .sq-btn-primary:active {
          transform: scale(0.97) translateY(0);
          box-shadow: 0 2px 12px rgba(99,102,241,0.35);
        }
        @media (prefers-reduced-motion: reduce) {
          .sq-btn-primary { transition: none; }
          .sq-fade-up { animation: none !important; }
        }
      `}</style>

      {/* ── Two-column hero grid ─────────────────────────────────────── */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          gap: '32px',
          alignItems: 'center',
        }}
        className="lg:grid-cols-2"
      >

        {/* ── LEFT: copy + CTA ──────────────────────────────────────── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

          {/* Badge */}
          <div style={fadeUp(0)}>
            <span style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '6px 14px',
              borderRadius: '999px',
              border: '1px solid rgba(129,140,248,0.45)',
              background: 'rgba(99,102,241,0.22)',
              fontSize: '11px',
              fontWeight: 700,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: '#c7d2fe',
              fontFamily: "'DM Sans', sans-serif",
            }}>
              <span style={{
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                background: CYAN,
                display: 'inline-block',
                boxShadow: `0 0 6px ${CYAN}`,
                animation: 'sq-counter-pulse 2s ease-in-out infinite',
              }} />
              AI conversation partner &mdash; 50+ languages
            </span>
          </div>

          {/* H1 */}
          <div style={fadeUp(0.07)}>
            <h1
              style={{
                fontFamily: "'Nunito', sans-serif",
                fontSize: 'clamp(38px, 5.5vw, 62px)',
                fontWeight: 900,
                lineHeight: 1.05,
                letterSpacing: '-0.02em',
                margin: 0,
              }}
            >
              <span style={{ display: 'block', color: '#f8fafc' }}>
                {overrides.headline ?? 'Speak any language'}
              </span>
              <span style={{
                display: 'block',
                color: '#4338ca',
                backgroundImage: ACCENT_GRAD_TEXT,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                filter: `drop-shadow(0 0 28px rgba(99,102,241,0.5))`,
              }}>
                in minutes,
              </span>
              <span style={{ display: 'block', color: '#f8fafc' }}>not months.</span>
            </h1>
          </div>

          {/* Subtext */}
          <div style={fadeUp(0.13)}>
            <p style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: '16px',
              lineHeight: 1.65,
              color: 'rgba(248,250,252,0.72)',
              maxWidth: '420px',
              margin: 0,
            }}>
              {overrides.subheadline ?? 'AI corrects grammar as you speak. Adapts to your pace. No account needed.'}
            </p>
          </div>

          {/* Language selector row (compact, left panel) */}
          <div style={fadeUp(0.18)}>
            <p style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: '10px',
              fontWeight: 700,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.55)',
              marginBottom: '8px',
            }}>
              Choose language
            </p>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {HERO_LANGS.map(l => {
                const active = l.code === activeLang
                return (
                  <button
                    key={l.code}
                    onClick={() => setActiveLang(l.code)}
                    aria-label={`Practice ${l.name}`}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      padding: '6px 12px',
                      borderRadius: '10px',
                      border: `1px solid ${active ? 'rgba(129,140,248,0.6)' : 'rgba(255,255,255,0.14)'}`,
                      background: active ? 'rgba(99,102,241,0.28)' : '#1e293b',
                      color: active ? '#e0e7ff' : '#cbd5e1',
                      fontSize: '12px',
                      fontWeight: 700,
                      cursor: 'pointer',
                      transition: 'all 0.15s cubic-bezier(0.23,1,0.32,1)',
                      boxShadow: active ? '0 0 10px rgba(99,102,241,0.28)' : 'none',
                      fontFamily: "'DM Sans', sans-serif",
                    }}
                  >
                    <span style={{ fontSize: '16px', lineHeight: 1 }}>{l.flag}</span>
                    <span>{l.name}</span>
                  </button>
                )
              })}
            </div>
          </div>

          {/* CTA */}
          <div style={fadeUp(0.23)}>
            <Link
              href={`/converse?lang=${activeLang}`}
              className="sq-btn-primary"
            >
              <span style={{ fontSize: '18px' }}>{lang.flag}</span>
              {overrides.cta ?? `Start speaking ${lang.name} →`}
            </Link>
          </div>

          {/* Trust line */}
          <div style={{ ...fadeUp(0.28), display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
            {['Free', 'No account', 'Works on any device'].map((item, i) => (
              <span
                key={item}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '5px',
                  fontSize: '12px',
                  fontWeight: 600,
                  color: '#334e6e',
                  fontFamily: "'DM Sans', sans-serif",
                }}
              >
                {i > 0 && (
                  <span style={{ width: '3px', height: '3px', borderRadius: '50%', background: 'rgba(15,23,42,0.25)', display: 'inline-block', marginRight: '11px' }} />
                )}
                <span style={{
                  width: '14px',
                  height: '14px',
                  borderRadius: '50%',
                  background: 'rgba(6,182,212,0.18)',
                  border: '1px solid rgba(6,182,212,0.3)',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '9px',
                  color: CYAN,
                }}>&#10003;</span>
                {item}
              </span>
            ))}
          </div>

          {/* Promo code */}
          {isUnlocked ? (
            <div style={{ fontSize: '12px', fontWeight: 700, color: '#22d3ee', marginTop: '4px' }}>
              🎉 Pro access active — {daysLeft} day{daysLeft === 1 ? '' : 's'} remaining
            </div>
          ) : (
            <Link
              href="/pricing#promo"
              style={{ fontSize: '12px', color: 'rgba(255,255,255,0.55)', textDecoration: 'underline', marginTop: '4px', display: 'inline-block' }}
            >
              Have a promo code?
            </Link>
          )}
        </div>

        {/* ── RIGHT: live conversation panel ────────────────────────── */}
        <div
          style={{
            animation: 'sq-fade-up 0.7s cubic-bezier(0.23,1,0.32,1) 0.3s both',
          }}
          className="w-full mt-4 lg:mt-0"
        >
          <LiveConversationPanel activeLang={activeLang} onLangChange={setActiveLang} />
        </div>

      </div>

      {/* Mobile: horizontal bubble strip (shown below CTA on mobile, hidden on lg) */}
      <div
        className="lg:hidden"
        style={{
          marginTop: '8px',
          animation: 'sq-fade-up 0.7s cubic-bezier(0.23,1,0.32,1) 0.4s both',
        }}
      >
        <MobileBubbleStrip lang={activeLang} />
      </div>
    </>
  )
}

// ── Mobile horizontal bubble strip ──────────────────────────────────────────
function MobileBubbleStrip({ lang }: { lang: HeroLangCode }) {
  const BUBBLES: Record<HeroLangCode, { ai: string; user: string }> = {
    es: { ai: '¿Cómo estuvo tu fin de semana?', user: 'Estuvo bien, gracias!' },
    fr: { ai: 'Comment s\'était ton week-end?', user: 'C\'était bien, merci!' },
    ja: { ai: '週末はいかがでしたか？', user: 'よかったです、ありがとう！' },
    de: { ai: 'Wie war dein Wochenende?', user: 'Es war gut, danke!' },
    pt: { ai: 'Como foi o seu fim de semana?', user: 'Foi bom, obrigado!' },
  }
  const b = BUBBLES[lang]
  return (
    <div style={{
      display: 'flex',
      gap: '10px',
      overflowX: 'auto',
      paddingBottom: '4px',
      scrollSnapType: 'x mandatory',
    }}>
      {[
        { text: b.ai, isAi: true },
        { text: b.user, isAi: false },
      ].map((bubble, i) => (
        <div
          key={i}
          style={{
            flexShrink: 0,
            scrollSnapAlign: 'start',
            padding: '10px 14px',
            borderRadius: '14px',
            border: `1px solid ${bubble.isAi ? 'rgba(99,102,241,0.2)' : 'rgba(6,182,212,0.2)'}`,
            background: bubble.isAi ? 'rgba(99,102,241,0.10)' : 'rgba(6,182,212,0.08)',
            fontSize: '12px',
            color: 'rgba(255,255,255,0.75)',
            maxWidth: '200px',
            fontFamily: "'DM Sans', sans-serif",
          }}
        >
          <span style={{
            display: 'block',
            fontSize: '9px',
            fontWeight: 700,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: bubble.isAi ? 'rgba(99,102,241,0.7)' : 'rgba(6,182,212,0.7)',
            marginBottom: '4px',
          }}>
            {bubble.isAi ? 'AI Tutor' : 'You'}
          </span>
          {bubble.text}
        </div>
      ))}
    </div>
  )
}
