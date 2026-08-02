'use client'

/**
 * Inline "have a promo code?" toggle + input.
 * Rendered inside HeroClient only when NOT unlocked (HeroClient already
 * owns the isUnlocked banner via usePromo()).
 */

import { useState } from 'react'

export default function PromoBar() {
  const [open, setOpen] = useState(false)
  const [code, setCode] = useState('')
  const [status, setStatus] = useState<'idle' | 'checking' | 'invalid'>('idle')

  async function submit() {
    if (!code.trim()) return
    setStatus('checking')
    try {
      const res = await fetch('/api/promo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code }),
      })
      const data = await res.json()
      if (data.valid) {
        window.location.reload()
      } else {
        setStatus('invalid')
      }
    } catch {
      setStatus('invalid')
    }
  }

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        style={{ fontSize: '12px', color: 'rgba(255,255,255,0.55)', textDecoration: 'underline', marginTop: '4px', display: 'inline-block', background: 'none', border: 'none', cursor: 'pointer' }}
      >
        Have a promo code?
      </button>
    )
  }

  return (
    <div style={{ marginTop: '4px' }}>
      <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
        <input
          value={code}
          onChange={(e) => { setCode(e.target.value); setStatus('idle') }}
          onKeyDown={(e) => e.key === 'Enter' && submit()}
          placeholder="Enter code"
          style={{ borderRadius: '6px', border: '1px solid rgba(124,58,237,0.4)', padding: '4px 8px', fontSize: '12px', background: 'rgba(255,255,255,0.05)', color: '#fff' }}
        />
        <button
          onClick={submit}
          disabled={status === 'checking'}
          style={{ borderRadius: '6px', padding: '4px 10px', fontSize: '12px', fontWeight: 700, color: '#fff', background: '#7c3aed', opacity: status === 'checking' ? 0.6 : 1 }}
        >
          {status === 'checking' ? '...' : 'Apply'}
        </button>
      </div>
      {status === 'invalid' && <p style={{ color: '#f87171', fontSize: '11px', marginTop: '4px' }}>Invalid code</p>}
    </div>
  )
}
