'use client'
import { useEffect, useRef } from 'react'
import confetti from 'canvas-confetti'

interface CelebrationOverlayProps {
  trigger: boolean   // flip true to fire; reset to false after consuming
  message?: string
  onDone?: () => void
}

export function CelebrationOverlay({ trigger, message = '🎉 Great job!', onDone }: CelebrationOverlayProps) {
  const firedRef = useRef(false)

  useEffect(() => {
    if (!trigger || firedRef.current) return
    firedRef.current = true

    confetti({
      particleCount: 120,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#7c3aed', '#a855f7', '#fbbf24', '#34d399', '#f472b6'],
    })

    const t = setTimeout(() => {
      firedRef.current = false
      onDone?.()
    }, 2500)
    return () => clearTimeout(t)
  }, [trigger, onDone])

  if (!trigger) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
      <div className="animate-bounce-once bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl px-8 py-5 text-3xl font-bold text-white shadow-2xl">
        {message}
      </div>
    </div>
  )
}
