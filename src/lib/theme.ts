/**
 * lib/theme.ts — speakiq theme constants (indigo/blue palette)
 * Hardcoded rather than derived from vertical.config to avoid that dependency.
 */

export const theme = {
  // Gradient on hero / CTA buttons
  gradient:        'from-indigo-600 to-blue-400',
  gradientHover:   'hover:from-indigo-700 hover:to-blue-500',
  gradientText:    'bg-gradient-to-r from-indigo-400 to-blue-200 bg-clip-text text-transparent',

  // Solid fills
  solid:           'bg-indigo-600',
  solidHover:      'hover:bg-indigo-700',
  solidLight:      'bg-indigo-500/10',

  // Borders & rings
  border:          'border-indigo-500/30',
  ring:            'ring-indigo-500/40',
  focusRing:       'focus:ring-indigo-500',

  // Text
  textAccent:      'text-indigo-400',
  textAccentBold:  'text-indigo-300',

  // Badge / pill
  badge:           'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30',

  // Card
  card:            'bg-white/[0.03] border border-white/[0.06] backdrop-blur-sm rounded-2xl',
  cardHover:       'hover:border-indigo-500/30 hover:bg-white/[0.06] transition-all duration-200',

  // Glow
  glow:            'shadow-lg shadow-indigo-500/10',
  glowHover:       'hover:shadow-xl hover:shadow-indigo-500/20',
}

// Full button style helpers
export const btn = {
  primary:   `inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white bg-gradient-to-r ${theme.gradient} ${theme.gradientHover} ${theme.glow} ${theme.glowHover} transition-all duration-200`,
  secondary: `inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white/80 bg-white/[0.06] border ${theme.border} hover:bg-white/[0.10] transition-all duration-200`,
  ghost:     `inline-flex items-center gap-2 px-4 py-2 rounded-lg font-medium ${theme.textAccent} hover:bg-white/[0.06] transition-all duration-200`,
}
