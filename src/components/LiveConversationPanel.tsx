'use client'
// LiveConversationPanel.tsx
// Right-panel hero component: animated chat bubbles (CSS keyframes cascade),
// language flag selector row, live learner counter pill.
// Indigo #6366f1 + Cyan #06b6d4 accent. No JS timers needed for visual effect.
import { useState } from 'react'
import type { HeroLangCode } from './HeroClient'
import { HERO_LANGS } from './HeroClient'

const INDIGO = '#6366f1'
const CYAN   = '#06b6d4'

// ── Conversation scripts per language ────────────────────────────────────────
const SCRIPTS: Record<HeroLangCode, {
  ai1: string
  user: string
  userRaw: string    // what the user originally typed (with mistake)
  correction: string // AI correction text
  correctionLabel: string
}> = {
  es: {
    ai1: 'How was your weekend?',
    user: 'Estuvo bien, gracias!',
    userRaw: 'Estuvo bien, gracias!',
    correction: 'Great! Try: "¡Estuvo muy bien, gracias!" — sounds more natural.',
    correctionLabel: 'Grammar tip',
  },
  fr: {
    ai1: 'Comment s\'était ton week-end?',
    user: 'C\'était bien, merci!',
    userRaw: 'C\'était bien, merci!',
    correction: 'Très bien! Try: "C\'était fantastique!" — more expressive.',
    correctionLabel: 'Vocabulary tip',
  },
  ja: {
    ai1: '週末はいかがでしたか？',
    user: 'よかったです、ありがとう！',
    userRaw: 'よかったです、ありがとう！',
    correction: '素晴らしい！Try: "最高でした！" — stronger expression.',
    correctionLabel: 'Fluency tip',
  },
  de: {
    ai1: 'Wie war dein Wochenende?',
    user: 'Es war gut, danke!',
    userRaw: 'Es war gut, danke!',
    correction: 'Sehr gut! Try: "Es war wunderbar!" — more enthusiastic.',
    correctionLabel: 'Grammar tip',
  },
  pt: {
    ai1: 'Como foi o seu fim de semana?',
    user: 'Foi bom, obrigado!',
    userRaw: 'Foi bom, obrigado!',
    correction: 'Ótimo! Try: "Foi incrível, obrigado!" — more natural phrasing.',
    correctionLabel: 'Fluency tip',
  },
}

interface Props {
  activeLang: HeroLangCode
  onLangChange: (lang: HeroLangCode) => void
}

export default function LiveConversationPanel({ activeLang, onLangChange }: Props) {
  const script = SCRIPTS[activeLang]

  // Re-trigger CSS animation on lang change via key prop cascade
  const animKey = activeLang

  return (
    <>
      <style>{`
        /* Bubble cascade: each bubble fades+slides in with increasing delay */
        @keyframes lcp-bubble-in {
          from { opacity: 0; transform: translateY(10px) scale(0.96); }
          to   { opacity: 1; transform: translateY(0)   scale(1);    }
        }
        @keyframes lcp-typing-dot {
          0%, 80%, 100% { transform: translateY(0);    opacity: 0.4; }
          40%            { transform: translateY(-4px); opacity: 1;   }
        }
        @keyframes lcp-blink-cursor {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0; }
        }
        @keyframes lcp-correction-in {
          from { opacity: 0; transform: translateX(-6px); }
          to   { opacity: 1; transform: translateX(0);    }
        }
        @keyframes lcp-counter-glow {
          0%, 100% { box-shadow: 0 0 0 0 rgba(6,182,212,0); }
          50%       { box-shadow: 0 0 12px 2px rgba(6,182,212,0.22); }
        }
        /* Gradient mesh background animation */
        @keyframes lcp-mesh {
          0%   { background-position: 0% 50%;   }
          50%  { background-position: 100% 50%; }
          100% { background-position: 0% 50%;   }
        }
        @media (prefers-reduced-motion: reduce) {
          [class*="lcp-"] { animation-duration: 0.01ms !important; }
        }
      `}</style>

      <div style={{
        borderRadius: '20px',
        border: '1px solid rgba(99,102,241,0.22)',
        background: 'linear-gradient(145deg, rgba(10,10,20,0.92) 0%, rgba(13,11,30,0.88) 100%)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        overflow: 'hidden',
        boxShadow: '0 24px 64px rgba(0,0,0,0.55), 0 0 0 1px rgba(99,102,241,0.12), inset 0 1px 0 rgba(255,255,255,0.05)',
        position: 'relative',
      }}>

        {/* Subtle gradient mesh orb in panel background */}
        <div aria-hidden style={{
          position: 'absolute',
          top: '-30%',
          right: '-20%',
          width: '260px',
          height: '260px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(99,102,241,0.12) 0%, transparent 70%)',
          pointerEvents: 'none',
          animation: 'lcp-mesh 8s ease-in-out infinite',
          backgroundSize: '200% 200%',
        }} />
        <div aria-hidden style={{
          position: 'absolute',
          bottom: '-20%',
          left: '-10%',
          width: '200px',
          height: '200px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(6,182,212,0.09) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />

        {/* ── Panel header ──────────────────────────────────────────── */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '12px 16px',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
          background: 'rgba(99,102,241,0.06)',
        }}>
          {/* Traffic lights */}
          <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
            <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: 'rgba(255,95,87,0.5)' }} />
            <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: 'rgba(255,189,46,0.5)' }} />
            <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: 'rgba(39,201,63,0.5)' }} />
          </div>

          {/* Title */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '7px' }}>
            <VoiceWave />
            <span style={{
              fontSize: '11px',
              fontWeight: 700,
              color: 'rgba(165,180,252,0.7)',
              fontFamily: 'ui-monospace, "JetBrains Mono", monospace',
              letterSpacing: '0.03em',
            }}>
              AI tutor · live session
            </span>
          </div>

          {/* Live counter pill */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '5px',
            padding: '4px 10px',
            borderRadius: '999px',
            border: '1px solid rgba(6,182,212,0.3)',
            background: 'rgba(6,182,212,0.08)',
            animation: 'lcp-counter-glow 3s ease-in-out infinite',
          }}>
            <span style={{
              width: '5px',
              height: '5px',
              borderRadius: '50%',
              background: CYAN,
              display: 'inline-block',
              boxShadow: `0 0 5px ${CYAN}`,
            }} />
            <span style={{
              fontSize: '10px',
              fontWeight: 700,
              color: CYAN,
              fontFamily: "'DM Sans', sans-serif",
              whiteSpace: 'nowrap',
            }}>
              AI · live session
            </span>
          </div>
        </div>

        {/* ── Language flag selector row ─────────────────────────────── */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          padding: '10px 16px',
          borderBottom: '1px solid rgba(255,255,255,0.04)',
        }}>
          <span style={{
            fontSize: '9px',
            fontWeight: 700,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.22)',
            fontFamily: 'ui-monospace, monospace',
            whiteSpace: 'nowrap',
          }}>
            lang:
          </span>
          {HERO_LANGS.map(l => {
            const active = l.code === activeLang
            return (
              <button
                key={l.code}
                onClick={() => onLangChange(l.code)}
                aria-label={`Switch to ${l.name}`}
                title={l.name}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '5px',
                  padding: '4px 10px',
                  borderRadius: '8px',
                  border: `1px solid ${active ? 'rgba(99,102,241,0.5)' : 'rgba(255,255,255,0.07)'}`,
                  background: active ? 'rgba(99,102,241,0.2)' : 'rgba(255,255,255,0.03)',
                  cursor: 'pointer',
                  transition: 'all 0.13s cubic-bezier(0.23,1,0.32,1)',
                  boxShadow: active ? '0 0 8px rgba(99,102,241,0.3)' : 'none',
                  color: active ? '#c7d2fe' : 'rgba(255,255,255,0.35)',
                  fontSize: '11px',
                  fontWeight: 700,
                  fontFamily: "'DM Sans', sans-serif",
                }}
              >
                <span style={{ fontSize: '15px', lineHeight: 1 }}>{l.flag}</span>
                <span style={{ display: active ? 'inline' : 'none' }}>{l.name}</span>
              </button>
            )
          })}
        </div>

        {/* ── Chat area ─────────────────────────────────────────────── */}
        <div
          key={animKey}
          style={{
            padding: '20px 16px 16px',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            minHeight: '220px',
          }}
        >
          {/* AI bubble 1 — appears first */}
          <div style={{
            display: 'flex',
            alignItems: 'flex-start',
            gap: '8px',
            animation: 'lcp-bubble-in 0.4s cubic-bezier(0.23,1,0.32,1) 0.1s both',
          }}>
            <AiAvatar />
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', maxWidth: '75%' }}>
              <div style={{
                padding: '10px 14px',
                borderRadius: '16px',
                borderTopLeftRadius: '4px',
                background: 'rgba(99,102,241,0.12)',
                border: '1px solid rgba(99,102,241,0.2)',
                fontSize: '13.5px',
                lineHeight: 1.55,
                color: 'rgba(255,255,255,0.82)',
                fontFamily: "'DM Sans', sans-serif",
              }}>
                {script.ai1}
              </div>
              <span style={{
                fontSize: '10px',
                color: 'rgba(255,255,255,0.22)',
                paddingLeft: '4px',
                fontFamily: 'ui-monospace, monospace',
              }}>
                SpeakIQ AI
              </span>
            </div>
          </div>

          {/* User bubble — appears with delay */}
          <div style={{
            display: 'flex',
            justifyContent: 'flex-end',
            animation: 'lcp-bubble-in 0.4s cubic-bezier(0.23,1,0.32,1) 0.7s both',
          }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', alignItems: 'flex-end', maxWidth: '75%' }}>
              <div style={{
                padding: '10px 14px',
                borderRadius: '16px',
                borderTopRightRadius: '4px',
                background: `linear-gradient(135deg, rgba(99,102,241,0.28) 0%, rgba(6,182,212,0.18) 100%)`,
                border: '1px solid rgba(99,102,241,0.3)',
                fontSize: '13.5px',
                lineHeight: 1.55,
                color: 'rgba(255,255,255,0.88)',
                fontFamily: "'DM Sans', sans-serif",
              }}>
                {script.user}
              </div>
              <span style={{
                fontSize: '10px',
                color: 'rgba(255,255,255,0.22)',
                paddingRight: '4px',
                fontFamily: 'ui-monospace, monospace',
              }}>
                You
              </span>
            </div>
          </div>

          {/* AI correction bubble — appears last with green highlight */}
          <div style={{
            display: 'flex',
            alignItems: 'flex-start',
            gap: '8px',
            animation: 'lcp-bubble-in 0.4s cubic-bezier(0.23,1,0.32,1) 1.4s both',
          }}>
            <AiAvatar />
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', maxWidth: '80%' }}>
              <div style={{
                padding: '10px 14px',
                borderRadius: '16px',
                borderTopLeftRadius: '4px',
                background: 'rgba(16,185,129,0.08)',
                border: '1px solid rgba(16,185,129,0.25)',
                fontSize: '13.5px',
                lineHeight: 1.55,
                color: 'rgba(255,255,255,0.82)',
                fontFamily: "'DM Sans', sans-serif",
              }}>
                {/* Correction label pill */}
                <span style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px',
                  padding: '2px 8px',
                  borderRadius: '6px',
                  background: 'rgba(16,185,129,0.18)',
                  border: '1px solid rgba(16,185,129,0.3)',
                  fontSize: '9px',
                  fontWeight: 800,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  color: '#34d399',
                  marginBottom: '6px',
                  marginRight: '6px',
                  fontFamily: 'ui-monospace, monospace',
                  animation: 'lcp-correction-in 0.3s cubic-bezier(0.23,1,0.32,1) 1.7s both',
                }}>
                  &#10003; {script.correctionLabel}
                </span>
                {script.correction}
              </div>
              <span style={{
                fontSize: '10px',
                color: 'rgba(255,255,255,0.22)',
                paddingLeft: '4px',
                fontFamily: 'ui-monospace, monospace',
              }}>
                SpeakIQ AI
              </span>
            </div>
          </div>

          {/* Typing indicator — shows briefly after correction */}
          <div style={{
            display: 'flex',
            alignItems: 'flex-start',
            gap: '8px',
            animation: 'lcp-bubble-in 0.3s cubic-bezier(0.23,1,0.32,1) 2.1s both',
            opacity: 0, // start invisible — animation fills it in
          }}>
            <AiAvatar dim />
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              padding: '10px 14px',
              borderRadius: '16px',
              borderTopLeftRadius: '4px',
              background: 'rgba(99,102,241,0.08)',
              border: '1px solid rgba(99,102,241,0.12)',
            }}>
              {[0, 150, 300].map(delay => (
                <span
                  key={delay}
                  style={{
                    width: '6px',
                    height: '6px',
                    borderRadius: '50%',
                    background: 'rgba(99,102,241,0.55)',
                    display: 'inline-block',
                    animation: `lcp-typing-dot 1.2s ease-in-out ${delay}ms infinite`,
                  }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* ── Fluency score bar ──────────────────────────────────────── */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          padding: '10px 16px 14px',
          borderTop: '1px solid rgba(255,255,255,0.04)',
        }}>
          <span style={{
            fontSize: '9px',
            fontWeight: 700,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.22)',
            whiteSpace: 'nowrap',
            fontFamily: 'ui-monospace, monospace',
          }}>
            fluency score
          </span>
          <div style={{
            flex: 1,
            height: '4px',
            borderRadius: '999px',
            background: 'rgba(255,255,255,0.06)',
            overflow: 'hidden',
          }}>
            <div
              key={`bar-${animKey}`}
              style={{
                height: '100%',
                width: '78%',
                borderRadius: '999px',
                background: `linear-gradient(90deg, ${INDIGO}, ${CYAN})`,
                boxShadow: `0 0 8px rgba(99,102,241,0.6)`,
                animation: 'lcp-bar-fill 1.2s cubic-bezier(0.23,1,0.32,1) 1.8s both',
              }}
            />
          </div>
          <span style={{
            fontSize: '11px',
            fontWeight: 800,
            color: INDIGO,
            fontFamily: 'ui-monospace, monospace',
            width: '36px',
            textAlign: 'right',
          }}>78%</span>
        </div>

        {/* Bar fill keyframe */}
        <style>{`
          @keyframes lcp-bar-fill {
            from { width: 0%; }
            to   { width: 78%; }
          }
        `}</style>

      </div>
    </>
  )
}

// ── Sub-components ────────────────────────────────────────────────────────────

function AiAvatar({ dim = false }: { dim?: boolean }) {
  return (
    <div style={{
      width: '28px',
      height: '28px',
      borderRadius: '50%',
      background: dim ? 'rgba(99,102,241,0.12)' : `linear-gradient(135deg, rgba(99,102,241,0.4) 0%, rgba(6,182,212,0.25) 100%)`,
      border: `1px solid ${dim ? 'rgba(99,102,241,0.15)' : 'rgba(99,102,241,0.35)'}`,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0,
      marginTop: '2px',
    }}>
      <span style={{
        fontSize: '10px',
        fontWeight: 800,
        color: dim ? 'rgba(99,102,241,0.4)' : '#a5b4fc',
        fontFamily: 'ui-monospace, monospace',
      }}>
        AI
      </span>
    </div>
  )
}

function VoiceWave() {
  return (
    <span style={{ display: 'flex', alignItems: 'center', gap: '2px', height: '12px' }} aria-hidden>
      {[3, 6, 9, 6, 3].map((h, i) => (
        <span
          key={i}
          style={{
            width: '2px',
            height: `${h}px`,
            borderRadius: '999px',
            background: `linear-gradient(to top, ${INDIGO}, ${CYAN})`,
            display: 'inline-block',
            animation: `lcp-typing-dot 1.1s ease-in-out ${i * 100}ms infinite`,
          }}
        />
      ))}
    </span>
  )
}
