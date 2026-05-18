import type { NextConfig } from 'next'

const TRACKER = 'http://31.97.56.148:3098'

const nextConfig: NextConfig = {
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },
  async rewrites() {
    return [
      { source: '/t.js', destination: `${TRACKER}/t.js` },
      { source: '/track', destination: `${TRACKER}/track` },
      { source: '/session', destination: `${TRACKER}/session` },
      { source: '/feedback', destination: `${TRACKER}/feedback` },
    ]
  },
  async headers() {
    return [
      {
        source: '/_next/static/(.*)',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }],
      },
      {
        source: '/favicon.svg',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=86400' }],
      },
      {
        source: '/(.*\\.svg|.*\\.png|.*\\.jpg|.*\\.webp|.*\\.woff2)',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=604800, stale-while-revalidate=86400' }],
      },
    ]
  },
}

export default nextConfig
