'use client'
/* SpeakIQ — subtle sound wave bg, no floating text */
export default function AnimatedBackground() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden" aria-hidden>
      {/* Sky-blue tint gradient */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(ellipse 70% 50% at 40% 20%, rgba(2,132,199,0.08) 0%, transparent 60%), radial-gradient(ellipse 50% 60% at 75% 75%, rgba(14,165,233,0.06) 0%, transparent 60%)',
      }} />

      {/* Sound wave SVG */}
      <svg className="absolute" style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)', opacity: 0.08 }}
        width="800" height="200" viewBox="0 0 800 200" xmlns="http://www.w3.org/2000/svg">
        {[1,2,3,4,5].map(i => (
          <ellipse key={i}
            cx="400" cy="100"
            rx={i * 70} ry={i * 14}
            fill="none" stroke="#0284c7" strokeWidth="1.5"
            opacity={1 / i}
          >
            <animate attributeName="rx" values={`${i*70};${i*80};${i*70}`} dur={`${2+i*0.5}s`} repeatCount="indefinite" />
            <animate attributeName="ry" values={`${i*14};${i*18};${i*14}`} dur={`${2+i*0.5}s`} repeatCount="indefinite" />
            <animate attributeName="opacity" values={`${1/i};${0.6/i};${1/i}`} dur={`${2+i*0.5}s`} repeatCount="indefinite" />
          </ellipse>
        ))}
      </svg>

      {/* Waveform lines */}
      <svg className="absolute inset-0 w-full h-full" style={{ opacity: 0.06 }} xmlns="http://www.w3.org/2000/svg">
        {[0.3, 0.5, 0.7].map((y, i) => (
          <polyline key={i}
            points={Array.from({length: 80}, (_, j) => {
              const x = (j / 79) * 1200
              const amp = 20 + i * 15
              const freq = 0.04 + i * 0.02
              return `${x},${y * 800 + Math.sin(j * freq * Math.PI) * amp}`
            }).join(' ')}
            fill="none" stroke="#0284c7" strokeWidth="1.5"
          >
            <animate attributeName="points"
              values={
                Array.from({length: 80}, (_, j) => {
                  const x = (j / 79) * 1200
                  const amp = 20 + i * 15
                  const freq = 0.04 + i * 0.02
                  return `${x},${y * 800 + Math.sin(j * freq * Math.PI) * amp}`
                }).join(' ') + ';' +
                Array.from({length: 80}, (_, j) => {
                  const x = (j / 79) * 1200
                  const amp = 20 + i * 15
                  const freq = 0.04 + i * 0.02
                  return `${x},${y * 800 + Math.sin((j + 20) * freq * Math.PI) * amp}`
                }).join(' ') + ';' +
                Array.from({length: 80}, (_, j) => {
                  const x = (j / 79) * 1200
                  const amp = 20 + i * 15
                  const freq = 0.04 + i * 0.02
                  return `${x},${y * 800 + Math.sin(j * freq * Math.PI) * amp}`
                }).join(' ')
              }
              dur={`${4 + i}s`} repeatCount="indefinite" />
          </polyline>
        ))}
      </svg>


<div className="orb orb-1" style={{ background: 'radial-gradient(circle, rgba(2,132,199,0.12), rgba(14,165,233,0.05) 60%, transparent)', top: '-80px', left: '-60px' }} />
      <div className="orb orb-2" style={{ background: 'radial-gradient(circle, rgba(14,165,233,0.08), transparent 70%)', bottom: '5%', right: '-80px' }} />
    </div>
  )
}
