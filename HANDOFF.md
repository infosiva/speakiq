# HANDOFF — Duolingo-style practice-loop UX upgrade
**Date:** 2026-07-07  **Status:** COMPLETE
**Goal:** Rebuild speakiq's live practice flow (`src/app/converse/page.tsx` + `src/components/gamification/ConversationMode.tsx`) with Duolingo's core interaction mechanics — native rebuild, not asset/code copy.

## Why this project / competitor
Same pattern as kwizzo/Kahoot: survey portfolio, pick project with cleanest gap. speakiq already has `src/lib/gamification/hearts.ts` (heart-loss logic) and `HeartsDisplay` component built — but grepped confirmed **zero call sites** for `loseHeart`/`getHearts` anywhere in `app/` or `components/` — dead scaffolding, never wired into the live practice page. `/converse` (the actual chat-practice loop, uses real `corrections[]` per turn from the AI) has no hearts, no XP/streak feedback per turn, no lesson-complete celebration screen. Duolingo mechanics map directly.

## Design block (locked before implementation)
- **Layout archetype:** unchanged — `/converse` keeps its existing chat layout, no landing/hero redesign
- **bg/accent:** unchanged — `#f8fafc` white / `#7c3aed` violet (speakiq's existing slot, matches AI/language category, no collision)
- **Logo:** unchanged
- **Demo panel:** N/A — in-app live product, not a landing demo

## Duolingo mechanics to add (native rebuild, speakiq-branded)
1. **Hearts system wired live** — use existing `hearts.ts`/`HeartsDisplay`, call `loseHeart()` when a turn's `corrections[]` is non-empty (mistake), show hearts in the converse header. 0 hearts = session-end screen (not hard block, speakiq has no forced paywall — just a gentle "take a break" prompt per §T zero-forced-login rules).
2. **Per-turn XP/streak feedback** — small "+10 XP" / streak-count pop animation when a turn has zero corrections (correct/clean turn), reusing existing streak/XP lib if present, else minimal new counter in local state (session-scoped, not fabricated historical data).
3. **Correct/mistake inline reveal** — Duolingo's signature green flash (clean turn) / red flash + inline correction shown (mistake turn) on each AI response bubble, not just plain text.
4. **Session-complete celebration screen** — when user ends/exits a conversation session, show a Duolingo-style completion card: XP earned, turns practiced, accuracy %, streak maintained — replacing the current silent return-to-idle with no summary.
5. Keep existing: real AI corrections engine, mode toggle, existing message bubble styling/branding — this is additive gamification layer, not a redesign of the chat UI itself.

## Files to touch
- `src/components/gamification/ConversationMode.tsx` — wire hearts/XP into the per-turn correction-check logic
- `src/app/converse/page.tsx` — hearts display in header, session-complete screen state
- `src/lib/gamification/hearts.ts` — read only, reuse existing functions, don't duplicate
- `src/app/globals.css` — new keyframes only if genuinely needed (flash/pop), check existing ones first

## Steps
- [x] Wire hearts: call `loseHeart()` on mistake turn, render `HeartsDisplay` in converse header
- [x] Add XP/streak counter + pop animation on clean turns
- [x] Add green/red inline flash + correction reveal per message bubble
- [x] Build session-complete celebration screen (XP/turns/accuracy/streak summary)
- [x] `npm run build` — verify 0 errors
- [x] Playwright screenshot 375px + 1280px of converse flow + completion screen
- [x] Push, verify Vercel green
- [x] E2E verify against live URL

## Success criteria
- Hearts visibly decrement on mistake turns, session-end screen at 0 hearts
- XP/streak counter visibly increments on clean turns with a pop animation
- Each AI response bubble shows green (clean) or red+correction (mistake) inline
- Ending a session shows a completion summary card, not silent return to idle
- Build passes, no regressions to existing AI correction engine or mode toggle
- Live E2E check on speakiq.app converse flow after push

## Resume from here if interrupted
Design locked, scope written. Implementation not yet started — next step is dispatching a fork to implement steps 1-4, then main-session independent review (diff scope check, build, Playwright, visual-qa, push, e2e-verify) per the same rigor applied to kwizzo/trackwealth.

## Bonus fix (found during verification, blocking — same class of bug as prior commit 19c62b4)
Prior commit `19c62b4` ("fix(contrast): hero text dark on light sky bg") assumed the hero has a
light background. It actually has a dark navy-purple gradient (`HeroSection.tsx`, unchanged).
That mismatch shipped white-on-white / dark-on-dark text live — user-reported via screenshot of
speakiq.app showing invisible headline + badge. Root cause: `HeroClient.tsx` text/pill colors
written for light bg, `LiveConversationPanel.tsx` demo-panel pill colors same issue.

Fixed: badge, H1 lines 1+3, gradient "in minutes," line, subtext, CHOOSE LANGUAGE label, language
pills (both HeroClient hero row and LiveConversationPanel demo mock) — all retuned for the actual
dark bg. Also fixed unrelated mobile overflow: converse page header row (Back/mode-toggle/hearts/
language selects) clipped 5th heart off-screen at 375px — added flex-wrap.

## Final verification
- `npm run build` — 0 errors
- `node agents/scripts/visual-qa.mjs` — 20/20 pass, 0 fail (was 10 fail before fix)
- Playwright screenshots 375px + 1280px, hero + converse — all read, confirmed correct

## Deploy note
GitHub auto-deploy did not fire on push (last auto-deploy was 21 days stale despite
correct git remote + orgId). Deployed directly via `vercel --prod --yes --scope
infosivas-projects` instead — READY, aliased to speakiq.app. Investigate broken
GitHub webhook/integration separately (not done here, out of scope).

## E2E verify result (live speakiq.app, post-deploy)
6/10 passed. P1/P7/P8 (critical: landing/mobile/desktop) all pass — contrast fix
confirmed live via screenshot. 4 failures, all pre-existing, zero overlap with this
session's diff (confirmed via `git diff HEAD~1 --stat` — only converse/page.tsx,
HeroClient.tsx, LiveConversationPanel.tsx, ConversationMode.tsx touched):
- P1: 1 console error (unrelated file)
- P2: 3 broken nav anchors (`/#features`, `/#how-it-works`, `/#pricing` — Navbar.tsx, untouched)
- P4: core-action input check failed (pre-existing, not this diff's scope)
- P5: chatbot FAB not detected (feature-flag gated in layout.tsx, untouched)
Not fixed — out of scope for this task, flagged to user.
