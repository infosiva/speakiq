import { ImageResponse } from 'next/og'
export const size = { width: 180, height: 180 }
export const contentType = 'image/png'
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div style={{ width: 180, height: 180, background: '#0e9aa7', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12 }}>
        <div style={{ width: 20, height: 44, borderRadius: 10, background: 'rgba(255,255,255,0.6)' }} />
        <div style={{ width: 20, height: 100, borderRadius: 10, background: '#fff' }} />
        <div style={{ width: 20, height: 68, borderRadius: 10, background: 'rgba(255,255,255,0.85)' }} />
        <div style={{ width: 14, height: 14, borderRadius: 7, background: '#fff' }} />
      </div>
    ),
    { ...size }
  )
}
