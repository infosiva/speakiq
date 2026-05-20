'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

export default function PageStats({ site }: { site: string }) {
  const pathname = usePathname()

  useEffect(() => {
    // Fire-and-forget — never blocks render
    try {
      fetch('http://31.97.56.148:3099/api/stats', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          site,
          path: pathname,
          userAgent: navigator.userAgent,
          timestamp: new Date().toISOString(),
        }),
        // keepalive ensures the request completes even if page navigates away
        keepalive: true,
      }).catch(() => {/* ignore network errors */})
    } catch {
      // ignore any synchronous errors
    }
  }, [pathname, site])

  return null
}
