'use client'
import { useState } from 'react'

const INDIGO = '#6366f1'
const CYAN   = '#06b6d4'

const questions = [
  {
    q: 'Which sentence is grammatically correct?',
    options: ["She don't know the answer.", "She doesn't know the answer.", 'She not know the answer.', 'She knowing the answer.'],
    correct: 1,
    explanation: '"Doesn\'t" is the correct third-person singular negative form of "do".',
  },
  {
    q: 'What does "eloquent" mean?',
    options: ['Confused', 'Well-spoken and persuasive', 'Angry', 'Quiet'],
    correct: 1,
    explanation: 'Eloquent means fluent, persuasive, and well-expressed in speech or writing.',
  },
  {
    q: 'Choose the correct preposition: "I\'m interested ___ learning English."',
    options: ['at', 'on', 'in', 'for'],
    correct: 2,
    explanation: '"Interested in" is the correct collocation in English.',
  },
  {
    q: 'Which word is a synonym for "happy"?',
    options: ['Melancholy', 'Elated', 'Anxious', 'Weary'],
    correct: 1,
    explanation: '"Elated" means very happy and excited.',
  },
  {
    q: 'What is the past tense of "speak"?',
    options: ['Speaked', 'Spoken', 'Spoke', 'Speaking'],
    correct: 2,
    explanation: '"Spoke" is the simple past tense. "Spoken" is the past participle.',
  },
]

export default function SampleLesson() {
  const [current, setCurrent]   = useState(0)
  const [selected, setSelected] = useState<number | null>(null)
  const [score, setScore]       = useState(0)
  const [done, setDone]         = useState(false)

  const q = questions[current]

  function handleAnswer(idx: number) {
    if (selected !== null) return
    setSelected(idx)
    if (idx === q.correct) setScore(s => s + 1)
    setTimeout(() => {
      if (current + 1 >= questions.length) {
        setDone(true)
      } else {
        setCurrent(c => c + 1)
        setSelected(null)
      }
    }, 1200)
  }

  return (
    <section style={{
      padding: '48px 16px',
      maxWidth: '100%',
      margin: '0 auto',
      background: `linear-gradient(180deg, #0d0b1e 0%, #120f2a 100%), radial-gradient(circle at 50% 0%, ${INDIGO}22, transparent 60%)`,
    }}>
      <div style={{ maxWidth: '680px', margin: '0 auto' }}>
      <style>{`
        .sq-lesson-btn {
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.10);
          border-radius: 10px;
          padding: 14px 16px;
          text-align: left;
          cursor: pointer;
          transition: background 0.18s cubic-bezier(0.23,1,0.32,1),
                      border-color 0.18s cubic-bezier(0.23,1,0.32,1);
          font-family: 'DM Sans', sans-serif;
          font-size: 14px;
          color: rgba(255,255,255,0.75);
          width: 100%;
        }
        .sq-lesson-btn:hover:not(:disabled) {
          background: rgba(99,102,241,0.12);
          border-color: rgba(99,102,241,0.35);
        }
        .sq-lesson-btn:active { transform: scale(0.97); }
        .sq-lesson-btn:disabled { cursor: default; }
        @media (prefers-reduced-motion: reduce) {
          .sq-lesson-btn { transition: none; }
        }
      `}</style>

      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '32px' }}>
        <span style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          padding: '5px 14px',
          borderRadius: '999px',
          border: `1px solid rgba(99,102,241,0.30)`,
          background: 'rgba(99,102,241,0.08)',
          fontSize: '11px',
          fontWeight: 700,
          letterSpacing: '0.08em',
          textTransform: 'uppercase' as const,
          color: '#a5b4fc',
          fontFamily: "'DM Sans', sans-serif",
          marginBottom: '12px',
        }}>
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: CYAN, display: 'inline-block' }} />
          Free sample lesson — no sign-up
        </span>
        <h2 style={{
          fontFamily: "'Nunito', sans-serif",
          fontSize: 'clamp(22px, 4vw, 30px)',
          fontWeight: 900,
          color: '#f1f5ff',
          margin: '8px 0 4px',
          letterSpacing: '-0.01em',
        }}>
          Try a real English lesson now
        </h2>
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: 'rgba(255,255,255,0.42)', margin: 0 }}>
          5 questions · grammar, vocabulary, and usage
        </p>
      </div>

      {done ? (
        /* ── Results card ── */
        <div style={{
          background: 'rgba(255,255,255,0.03)',
          border: '1px solid rgba(255,255,255,0.10)',
          borderRadius: 16,
          padding: '36px 24px',
          textAlign: 'center',
        }}>
          <div style={{
            fontSize: 56,
            fontWeight: 900,
            fontFamily: "'Nunito', sans-serif",
            background: `linear-gradient(135deg, ${INDIGO} 0%, ${CYAN} 100%)`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            lineHeight: 1.1,
          }}>{score}/5</div>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 15, color: 'rgba(255,255,255,0.65)', margin: '12px 0 24px' }}>
            {score >= 4
              ? 'Excellent! You\'re ready for advanced lessons.'
              : 'Good start! Keep practising to improve.'}
          </p>
          <a
            href="/sign-up"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              padding: '13px 28px',
              borderRadius: 12,
              fontWeight: 800,
              fontSize: 15,
              color: '#fff',
              background: `linear-gradient(135deg, ${INDIGO} 0%, ${CYAN} 100%)`,
              textDecoration: 'none',
              boxShadow: '0 4px 24px rgba(99,102,241,0.40)',
              fontFamily: "'Nunito', sans-serif",
              transition: 'transform 0.12s cubic-bezier(0.23,1,0.32,1), box-shadow 0.12s cubic-bezier(0.23,1,0.32,1)',
            }}
          >
            Continue learning →
          </a>
        </div>
      ) : (
        /* ── Question card ── */
        <div style={{
          background: 'rgba(255,255,255,0.03)',
          border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: 16,
          padding: '28px 24px',
        }}>
          {/* Progress bar */}
          <div style={{ marginBottom: 20 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
              <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: 'rgba(255,255,255,0.28)' }}>
                Question {current + 1} of {questions.length}
              </span>
              <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, fontWeight: 700, color: '#a5b4fc' }}>
                {score} correct
              </span>
            </div>
            <div style={{ height: 4, borderRadius: 999, background: 'rgba(255,255,255,0.08)' }}>
              <div style={{
                height: '100%',
                borderRadius: 999,
                width: `${(current / questions.length) * 100}%`,
                background: `linear-gradient(90deg, ${INDIGO}, ${CYAN})`,
                transition: 'width 0.35s cubic-bezier(0.23,1,0.32,1)',
              }} />
            </div>
          </div>

          {/* Question text */}
          <p style={{
            fontFamily: "'Nunito', sans-serif",
            fontSize: 17,
            fontWeight: 700,
            color: '#f1f5ff',
            marginBottom: 20,
            lineHeight: 1.45,
          }}>
            {q.q}
          </p>

          {/* Options */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {q.options.map((opt, i) => {
              let bgOverride = ''
              let borderOverride = ''
              if (selected !== null) {
                if (i === q.correct) {
                  bgOverride  = 'rgba(16,185,129,0.15)'
                  borderOverride = 'rgba(16,185,129,0.50)'
                } else if (i === selected) {
                  bgOverride  = 'rgba(239,68,68,0.12)'
                  borderOverride = 'rgba(239,68,68,0.40)'
                }
              }
              return (
                <button
                  key={i}
                  className="sq-lesson-btn"
                  onClick={() => handleAnswer(i)}
                  disabled={selected !== null}
                  style={bgOverride ? { background: bgOverride, borderColor: borderOverride } : {}}
                >
                  <span style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 22,
                    height: 22,
                    borderRadius: 6,
                    background: 'rgba(255,255,255,0.07)',
                    fontSize: 11,
                    fontWeight: 800,
                    color: 'rgba(255,255,255,0.40)',
                    marginRight: 10,
                    flexShrink: 0,
                    fontFamily: "'DM Sans', sans-serif",
                  }}>
                    {String.fromCharCode(65 + i)}
                  </span>
                  {opt}
                </button>
              )
            })}
          </div>

          {/* Explanation */}
          {selected !== null && (
            <p style={{
              marginTop: 16,
              padding: '10px 14px',
              borderRadius: 8,
              background: 'rgba(99,102,241,0.08)',
              border: '1px solid rgba(99,102,241,0.20)',
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 13,
              color: 'rgba(255,255,255,0.60)',
              lineHeight: 1.55,
            }}>
              {q.explanation}
            </p>
          )}
        </div>
      )}
      </div>
    </section>
  )
}
