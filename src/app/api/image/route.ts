import { NextRequest, NextResponse } from 'next/server'
import { generateImage } from '@siva/shared-ui/lib/image-gen'

export async function POST(req: NextRequest) {
  try {
    const { prompt, width, height, style } = await req.json()

    if (!prompt?.trim()) {
      return NextResponse.json({ error: 'prompt required' }, { status: 400 })
    }

    const result = await generateImage(prompt, { width, height, style })

    if (!result.url) {
      return NextResponse.json({ error: 'No image generated' }, { status: 500 })
    }

    return NextResponse.json({ url: result.url, cached: result.cached, provider: result.provider })
  } catch (e) {
    console.error('[/api/image]', e)
    return NextResponse.json({ error: 'Image generation failed' }, { status: 500 })
  }
}
