# HANDOFF — speakiq competitive differentiation redesign
**Date:** 2026-08-04  **Status:** IN PROGRESS
**Goal:** Differentiate speakiq from Yoodli (enterprise/gated) via zero-auth interactive landing demo — visitor speaks/types a line, sees live confidence/filler-word score animate — plus fix the §0-BG-CONTRAST bug found in SpeakStats.

## §0-BG-CONTRAST grep results (ran first, per instructions)
Flagged 9 files. Triaged all:
- **REAL BUG: `src/components/SpeakStats.tsx`** — `text-white/*` + `bg-white/[0.05]` pills, rendered on `page.tsx` after `LiveStatsBar` (light `--surface-2:#faf5ff` bg), inherits page's light `--background:#f8fafc`. No local bg set. Invisible text below the fold — QA screenshot only checks above-fold, this is why it was never caught. SAME ROOT CAUSE as the documented SampleLesson/`/converse` incidents.
- False positives (self-contained dark bg or nested inside dark-bg parent, confirmed safe):
  - `NewsletterForm.tsx` — pricing/page.tsx root sets dark gradient bg
  - `PhonemeDisplay.tsx` — only used inside `ConversationMode` (`/converse`, dark bg root)
  - `LanguagePicker.tsx` — only used inside `HeroDemo` (self-contained `bg-[#0d0b1e]/80` card)
  - `HeroDemo.tsx` — sets its own `bg-[#0d0b1e]/80` (grep missed bracket-class bg)
  - `progress-ring.tsx` — dead code, not imported anywhere
  - `ConversationMode.tsx` — used only in `/converse` (dark bg root, fixed in prior incident)
  - `PronunciationScorer.tsx` / `CelebrationOverlay.tsx` — used only in `/lesson` (dark bg root)

## Design tokens (confirmed via globals.css, no code change needed)
`--background: #f8fafc` / `--accent: #7c3aed` / `--accent-2: #9333ea` — matches task brief, no MASTER.md collision (MASTER.md doc is stale, says #fdf4ff/#7e22ce — will sync at end).

## Files to touch
- `src/components/SpeakStats.tsx` — fix bg-contrast bug (own background, or move inline dark-safe styling)
- `src/components/HeroSection.tsx` / `HeroDemo.tsx` — add zero-auth live "speak/type a line → animated confidence + filler-word score" interactive block (differentiation feature)
- `src/app/icon.tsx` — verify accent match
- `design-system/MASTER.md` — sync speakiq token row to actual values

## Steps
- [x] §0-BG-CONTRAST grep + triage
- [x] Confirm bg/accent no collision
- [x] Fix SpeakStats contrast bug
- [x] Confirm existing layout is T2-compliant (education/quiz split) — keep, no full redesign needed
- [x] Add zero-auth interactive demo differentiation (speak/type → live score) — `TryItLive.tsx`, reuses `/api/pronunciation` (added AI_LIMITER rate limit — route now public-facing), inserted in `HeroClient.tsx` under `LiveConversationPanel`
- [ ] Verify navbar branding + icon.tsx accent match
- [ ] Verify chatbot / feedback / promo already wired (confirmed present: SmartChat/FloatingChatWrapper, FeedbackWidget, PromoBar/usePromo/promoCode.ts)
- [ ] Zero fake data check
- [ ] Build gate + Playwright 375/1280 screenshots (hero AND below-fold AND /converse, /lesson, /pricing)
- [ ] Commit + push + e2e-verify

## Differentiation feature detail
`src/components/TryItLive.tsx` (new) — sits below the scripted `LiveConversationPanel` demo.
Visitor types (primary, zero-friction) or speaks (Web Speech API, optional) a target
phrase in the active hero language → POSTs to `/api/pronunciation` (existing route,
same contract as gated `/lesson` flow's `PronunciationScorer.tsx`) → shows real
AI-generated score/feedback/tip, animated in. No auth, no new AI prompt/route logic,
just a typed-input path onto the existing scorer. Added `AI_LIMITER` (10/min/IP) to
`/api/pronunciation/route.ts` since it's now reachable from the public landing page.

## Success criteria
- SpeakStats text readable (contrast >= 2.5:1) on landing page
- New interactive demo requires zero auth, shows real (not fake) output
- Build exits 0, e2e-verify P1-P10 reported

## Resume from here if interrupted
SpeakStats fix + TryItLive differentiation feature done. Next: verify navbar/favicon accent, chatbot/feedback/promo correctness, fake-data sweep, then build gate.
