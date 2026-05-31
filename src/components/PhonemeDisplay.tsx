'use client'
// components/PhonemeDisplay.tsx — syllable-level pronunciation breakdown
// Shows word split into segments colored green (correct) or red (needs work).
// Usage: <PhonemeDisplay word="pronunciation" segments={[...]} />

interface Segment {
  text: string
  /** 'correct' = green, 'error' = red, 'neutral' = muted white */
  status: 'correct' | 'error' | 'neutral'
  /** optional tooltip shown on hover, e.g. IPA hint */
  hint?: string
}

interface PhonemeDisplayProps {
  /** Display label above the breakdown */
  label?: string
  /** Ordered syllable segments */
  segments: Segment[]
  /** Optional short coaching note shown below */
  note?: string
}

const STATUS_CLASSES: Record<Segment['status'], string> = {
  correct: 'text-emerald-400 border-emerald-500/40 bg-emerald-500/10',
  error:   'text-red-400   border-red-500/40   bg-red-500/10',
  neutral: 'text-white/50  border-white/10     bg-white/[0.03]',
}

export default function PhonemeDisplay({ label, segments, note }: PhonemeDisplayProps) {
  if (!segments.length) return null

  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 space-y-2">
      {label && (
        <p className="text-[10px] font-semibold uppercase tracking-widest text-white/30">
          {label}
        </p>
      )}

      {/* Segment row */}
      <div className="flex flex-wrap items-center gap-1.5" aria-label="Phoneme breakdown">
        {segments.map((seg, i) => (
          <span key={i} className="group relative inline-flex flex-col items-center">
            <span
              className={`
                inline-block px-2 py-1 rounded-lg border text-sm font-bold tracking-wide
                transition-transform duration-150 group-hover:scale-110
                ${STATUS_CLASSES[seg.status]}
              `}
              title={seg.hint}
            >
              {seg.text}
            </span>
            {/* Tooltip / hint */}
            {seg.hint && (
              <span className="
                absolute bottom-full mb-1.5 left-1/2 -translate-x-1/2
                whitespace-nowrap rounded-md bg-[#1a1840] border border-white/10
                px-2 py-0.5 text-[10px] text-white/60
                opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-150 z-10
              ">
                {seg.hint}
              </span>
            )}
          </span>
        ))}
      </div>

      {/* Legend */}
      <div className="flex items-center gap-3 pt-0.5">
        <LegendDot color="emerald" label="Correct" />
        <LegendDot color="red"     label="Needs work" />
      </div>

      {/* Coaching note */}
      {note && (
        <p className="text-xs text-indigo-300/70 leading-relaxed border-t border-white/[0.06] pt-2">
          💡 {note}
        </p>
      )}
    </div>
  )
}

function LegendDot({ color, label }: { color: 'emerald' | 'red'; label: string }) {
  return (
    <span className="flex items-center gap-1">
      <span
        className={`w-2 h-2 rounded-full ${color === 'emerald' ? 'bg-emerald-400' : 'bg-red-400'}`}
        aria-hidden
      />
      <span className="text-[10px] text-white/30">{label}</span>
    </span>
  )
}

// ─── Convenience helper ────────────────────────────────────────────────────────
// Splits a plain string into neutral segments by syllable boundary marks (·)
// e.g. splitByDots("PRON·UN·CI·A·TION") → Segment[]
export function splitByDots(dotted: string, errorIndices: number[] = []): Segment[] {
  return dotted.split('·').map((part, i) => ({
    text:   part,
    status: errorIndices.includes(i) ? 'error' : 'correct',
  }))
}
