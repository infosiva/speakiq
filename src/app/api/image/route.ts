import { NextRequest, NextResponse } from 'next/server'
import { AI_LIMITER } from '@/lib/rateLimit'
import crypto from 'crypto'

interface ImageGenOptions {
  width?: number
  height?: number
  model?: 'schnell' | 'dev'
  style?: string
}

function hashPrompt(prompt: string, opts: ImageGenOptions): string {
  return crypto.createHash('sha256').update(JSON.stringify({ prompt, ...opts })).digest('hex').slice(0, 32)
}

async function checkKvCache(hash: string): Promise<string | null> {
  try {
    const { kv } = await import('@vercel/kv')
    return await kv.get<string>(`img:${hash}`)
  } catch { return null }
}

async function setKvCache(hash: string, url: string): Promise<void> {
  try {
    const { kv } = await import('@vercel/kv')
    await kv.set(`img:${hash}`, url, { ex: 60 * 60 * 24 * 30 })
  } catch { /* KV not configured */ }
}

async function generateFal(prompt: string, opts: ImageGenOptions): Promise<string> {
  const { fal } = await import('@fal-ai/client')
  const model = opts.model === 'dev' ? 'fal-ai/flux/dev' : 'fal-ai/flux/schnell'
  const finalPrompt = opts.style ? `${opts.style}, ${prompt}` : prompt
  const result = await fal.subscribe(model, {
    input: {
      prompt: finalPrompt,
      image_size: { width: opts.width ?? 1024, height: opts.height ?? 1024 },
      num_inference_steps: opts.model === 'dev' ? 28 : 4,
      enable_safety_checker: true,
    },
  }) as { data: { images: Array<{ url: string }> } }
  const url = result.data?.images?.[0]?.url
  if (!url) throw new Error('fal: no image returned')
  return url
}

async function generateLeonardo(prompt: string, opts: ImageGenOptions): Promise<string> {
  const apiKey = process.env.LEONARDO_API_KEY
  if (!apiKey) throw new Error('LEONARDO_API_KEY not set')
  const genRes = await fetch('https://cloud.leonardo.ai/api/rest/v1/generations', {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      prompt,
      modelId: 'aa77f04e-3eec-4034-9c07-d0a29272434',
      width: opts.width ?? 1024,
      height: opts.height ?? 1024,
      num_images: 1,
      guidance_scale: 7,
      nsfw: false,
    }),
  })
  const gen = await genRes.json()
  const generationId = gen.sdGenerationJob?.generationId
  if (!generationId) throw new Error('Leonardo: no generation ID')
  for (let i = 0; i < 15; i++) {
    await new Promise(r => setTimeout(r, 2000))
    const poll = await fetch(`https://cloud.leonardo.ai/api/rest/v1/generations/${generationId}`, {
      headers: { 'Authorization': `Bearer ${apiKey}` },
    })
    const data = await poll.json()
    const imgs = data.generations_by_pk?.generated_images
    if (imgs?.length > 0) return imgs[0].url as string
  }
  throw new Error('Leonardo: generation timed out')
}

async function generateImage(prompt: string, opts: ImageGenOptions = {}) {
  const hash = hashPrompt(prompt, opts)
  const cached = await checkKvCache(hash)
  if (cached) return { url: cached, cached: true, provider: 'fal' as const }

  if (process.env.FAL_KEY) {
    try {
      const { fal } = await import('@fal-ai/client')
      fal.config({ credentials: process.env.FAL_KEY })
      const url = await generateFal(prompt, opts)
      await setKvCache(hash, url)
      return { url, cached: false, provider: 'fal' as const }
    } catch (e) { console.error('[image-gen] fal failed:', e) }
  }

  if (process.env.LEONARDO_API_KEY) {
    const url = await generateLeonardo(prompt, opts)
    await setKvCache(hash, url)
    return { url, cached: false, provider: 'leonardo' as const }
  }

  throw new Error('No image generation provider configured (FAL_KEY or LEONARDO_API_KEY required)')
}

export async function POST(req: NextRequest) {
  const limited = AI_LIMITER.check(req); if (limited) return limited
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
