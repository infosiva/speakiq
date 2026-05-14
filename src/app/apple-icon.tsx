import { ImageResponse } from 'next/og'

export const size = { width: 180, height: 180 }
export const contentType = 'image/png'

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 180,
          height: 180,
          borderRadius: 40,
          background: 'linear-gradient(135deg, #7c3aed, #4f46e5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 90,
          fontWeight: 900,
          color: 'white',
          fontFamily: 'system-ui, sans-serif',
          letterSpacing: '-4px',
        }}
      >
        SQ
      </div>
    ),
    { ...size }
  )
}
