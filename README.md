# speakiq

AI-powered language-learning-bot app built with Next.js and Claude AI

**Live:** https://language-learning-bot-blue.vercel.app

## Tech stack
Next.js, React, TypeScript, Tailwind CSS, Stripe

## Run locally
```bash
git clone https://github.com/infosiva/speakiq.git && cd speakiq
npm install
cp .env.example .env.local   # names only, fill in your own values
npm run dev                    # http://localhost:3000
```

## Scripts
- `npm run dev`
- `npm run build`
- `npm run start`

## Environment variables
Names only; never commit real values. Everything is optional unless the feature needs it.

**AI providers (free-first chain; any one is enough):** `GEMINI_API_KEY`, `GROQ_API_KEY`, `OLLAMA_HOST`

- `CLERK_SECRET_KEY`
- `GNEWS_API_KEY`
- `NEXT_PUBLIC_APP_URL`
- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
- `NOTIFY_EMAIL`
- `PROMO_CODES`
- `RESEND_API_KEY`
- `RESEND_AUDIENCE_ID`
- `STRIPE_PRICE_ID`
- `STRIPE_SECRET_KEY`

## Deploy
Vercel (`vercel --prod`). Set the variables above in the project settings.

## Status & open items
See `HANDOFF.md` if present; otherwise open an issue.
