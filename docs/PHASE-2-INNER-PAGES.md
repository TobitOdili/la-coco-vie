# Phase 2 — Chapter Inner Pages (Scope)

Scope and build plan for the per-chapter inner pages. Grounded in a live inspection of the
original (`/wine-o-clock`) on 2026-05-29. **This doc is the single live tracker** — start here.

## 🚀 Pick up from here (cold start)

1. `npm install` → `npm run dev` → http://localhost:3001 (macOS build gotcha + commands in the [README](../README.md)).
2. Read [`docs/ARCHITECTURE.md`](ARCHITECTURE.md) before touching `composables/useChapterScene.js`. The
   exit model lives in `pages/[slug].vue` (`doExit(fromBottom)`) + the scene's `deselectChapter` (top)
   / `exitChapterDrop` (bottom, current) / the dormant `beginExit`/`setExitProgress`/`cancelExit`/`endExit`.
3. **Debug:** load any route with **`?debug`** *on the initial URL* (e.g. `/wine-o-clock?debug`) for
   `window.__heroDebug()/__camDebug()/__probe()`, deterministic exit scrubbing
   (`__exitBegin()`→`__exitScrub(0..1)`→`__exitEnd()`, `__setScroll(px)`), and `__gsdev()` (GSAP scrubber).
4. **Verify** the way this project does (ARCHITECTURE → QA workflow): deploy first (Vercel auto-builds
   `main`; check `state:READY` via the Vercel MCP), then Browserless against the **prod** URL.
   ⚠️ **Two hard-won rules** (see the bottom-exit saga): (a) verify exits on the **real wheel→DOM path**
   (dispatch real `wheel` events), NOT the `__exitScrub` scene scrub — it bypasses the DOM and misleads;
   (b) Browserless `captureScreenshot` latency can't time a sub-2s animation — use a **screenshot-free
   `evaluate` probe** (sample `transform`/`opacity`/`__camDebug` over time), screenshots for the look only.

**▶ ACTIVE WORK (2026-06-13): bottom-edge exit "page becomes a card in the deck."** The current prod
build shrinks the real DOM page into the ring but reads as two separate motions (a 2D DOM layer can't
rotate with the 3D ring). The agreed fix is the **proper literal merge** (snapshot the page → a 3D card
that rides the chapter's card into the ring). **Read the `🔁 P2 — Bottom-edge exit — the FULL saga`
section below** for every approach already tried, why each failed, the fundamental constraint, and the
M1–M3 plan **before touching the exit.**

**⚠️ 2026-06-14 review steer (re-decide before resuming the exit).** A verified repo review concluded
the snapshot **M1–M3 plan is the highest-risk / lowest-leverage** option. The bottom-exit problem is
self-inflicted: `animate()`'s scroll-coupling (`useChapterScene.js` ~815-821) deliberately pushes the
real 3D hero card ~1.3 viewports off-screen, so by the page bottom the opaque DOM is all that's left to
animate. The **dormant** `beginExit`/`setExitProgress`/`endExit` (`useChapterScene.js` 1214-1325, only
reachable via `?debug`) is *already* a coupled, cancelable **forward** exit on the REAL hero card — it
captures the scrolled-off `heroY`, lerps it home early, un-frames it into the ring, and spins forward.
That's the proven top-exit stability applied forward, reusing ~150 already-debugged lines. The missing
piece is the hand-off: cross-dissolve the DOM `opacity` → the real 3D card over the first ~30% of the
gesture (**no** DOM transform), and rework line 1291 (it hard-hides the hero for `de>0` — a leftover
from rejected approach #1). Cheaper first experiment: a **poster-handoff** (fade the DOM to the
chapter's poster image and let the real poster card carry it in). Re-evaluate M1–M3 vs. this when
cycling back to the exit.

**2026-06-14 hygiene (done, committed local — `ced2dac7`, `011aa323` — not pushed).** Untracked
`node_modules` (18,630 files) + `.output` (33) — both were committed despite `.gitignore` (.git was
~120M). Removed the dead `virtualscroll` from `nuxt.config.ts` optimizeDeps + the no-op
`build.rollupOptions.external:[]`; base-prefixed the favicon href (was 404ing on the `/la-coco-vie/`
Pages subpath); gitignored `.claude/settings.local.json`. `nuxt prepare` passes.

**2026-06-14 code-health (done, committed local — `f2749c3a` — not pushed).** Three verified
lifecycle fixes (normal running path unchanged): `destroy()` now kills the tracked intro tweens +
select/deselect timelines and traverse-disposes all GPU resources (was renderer-only → leaked every
geometry/material/texture on teardown/HMR); the render loop pauses on `document.hidden` and resumes on
visibility (GSAP keeps its own ticker so tweens still complete); `waitSettled` in `pages/[slug].vue` is
now bounded (~8s deadline → enables scroll + edge-exits) so a failed WebGL init can't freeze the page.
`nuxt generate` passes; **a Vercel deploy is still needed to visually confirm** tab-switch resume + that
the exits behave. Still queued from the review: split the 1411-line `useChapterScene.js` god-module.

**▶▶ 2026-06-14 BOTTOM-EXIT MECHANISM SOLVED (commit `8eca9bef`, prod-verified).** Approach #6 — the
forward **ride-into-the-ring**, the faithful reference `setPageProgress`, reusing the dormant
`beginExit`/`setExitProgress`/`endExit`. `pages/[slug].vue doExit(true)` → `beginExit()` → one GSAP
`power4.inOut` tween (2.6s) drives `de 0→1` through `setExitProgress()` → `endExit()`+navigate. The DOM
`.chapter-page` only **cross-fades** opacity 1→0 (FADE 0.45→0.62, **NO transform**) once the real card is
home; `setExitProgress` no longer hides the hero (the approach-#1 leftover), so the REAL card is what
rotates into the deck. **Why it's not a 6th dead end:** the prior fails were 2D-DOM-transform-over-scene
(#1), snapshot-blank (#4), or disappear-then-ring (#3); this keeps the real 3D card visible and rides it
in while the DOM merely fades — exactly the reference. **Verified via the REAL wheel→DOM path**
(`/tmp/bless/exitprobe.mjs`, NOT `__exitScrub`): jump `deltaY60000` → settle → overscroll `deltaY2000`,
then sampled — card rides in (`scaleX 2.76→1`, `blend/progress 1→0`) WHILE the DOM fades, 0 console
errors, lands on the homepage ring (`+290°`, a different card at front, as the reference does).
⚠️ **OPEN — the reveal FEEL (needs the user's eye on the live site; video plays there, not in Browserless):**
the probe shows the card is already ~halfway shrunk + receding (`scaleX~1.47`, `dist 70→116`) when the
DOM finishes fading (~de 0.6) — it shrinks *during* the reveal. For a cleaner "the article literally
becomes the card" hand-off, retune so the card **holds full-bleed through the reveal, then shrinks**: set
`SHRINK_START` (`useChapterScene.js` ~283) ≈ `FADE_END` and `HERO_RETURN_END` ≈ `FADE_START`.
`exitChapterDrop` is now **unused/dead** (delete with the other dormant-exit cleanup once the feel is locked).

**Other roadblocks**
- **Option B reference match** is blocked on the Claude extension granted on **`chapter.millanova.com`**
  (a user action). Mechanism already decoded (`window.setPageProgress`, +290° forward) — a fidelity match.
  Note: the reference also exposes `window.setSelected`, so Browserless may now scrub it without the grant.
- **No mobile/touch on the homepage carousel** — wheel-only (the dead `virtualscroll` dep was removed
  2026-06-12; wire `virtual-scroll` (hyphen) if touch is wanted).

**Done & verified (2026-06-12):** ✅ **D** entry-spin normalized · ✅ hover targeting off the front card ·
✅ dead `virtualscroll` dep removed · ✅ top-edge exit. **After the bottom exit:** the **other 3 chapters'
content** (`CHAPTER_PAGES` + galleries/dresses) · real-browser confirms (video-in-hero).

## ✅ Running checklist (the board)

**This is the live tracker** — check items off here as they land. Detail for each lives in the
sections below ("card-becomes-the-page rework" step table A–G + the "Careful audit + ISSUE LIST").

**Done**
- [x] **A — Hero geometry**: selected card → full-bleed, straight, centered hero.
- [x] Click selects the correct front-facing card (all 4 chapters) + camera recenters (no skew).
- [x] **B — Lenis** smooth scroll on the inner page.
- [x] **C — Scroll coupling (P1, "purple overlay")**: hero card scrolls away 1:1 with the page. *(live 2026-05-30, `005d849f`)*

**Next up — motion**
- [~] **E — Edge-gated scroll exits (P2)** — mid-page scroll is **free**; exits only at the page edges, past `EXIT_THRESHOLD` (800px) → `doExit(fromBottom)`. **Top edge: DONE & stable** (`deselectChapter` reverse-rewind into the ring; also the back button). **Bottom edge: IN PROGRESS** — many approaches tried; current prod (`9553e44e`, `exitChapterDrop`) shrinks the real DOM page into the reassembling ring but reads as **two separate motions** (a 2D DOM shrink can't rotate *with* the 3D ring). **Next: proper literal merge** (snapshot the page → a 3D card that rides the chapter's card into the ring, in step). 👉 **Full saga + all rejected approaches + the fundamental constraint + the M1–M3 plan + the verification protocol: see the `🔁 P2 — Bottom-edge exit — the FULL saga` section below.**
- [x] **D — Normalize entry spin (P2)**: select spin pinned to one consistent FORWARD turn. *(2026-06-12)* The 7s intro rests `animatedRotationY` at `+4π` and the old target `toRad(φ−90)` was a small absolute angle → the entry tweened ~2 turns BACKWARD by a chapter-dependent amount. Now: collapse the accumulated whole turns (subtract the same multiple of 2π from the lerp anchor `rotation.y` so it's invisible — rotation is 2π-periodic), then advance forward to the front angle, clamped into `[180°,540°)`. Verified (local headless CDP, all 4 chapters): forward spins of **315/360/405/450°** (eat-marry-love/la-storia/wine/amour — the 135° spread is the cards' real 45°-apart ring positions), each landing front-centre (`x:0,z:40,dist:66`); select→deselect→reselect cycle lands the ring back at rest (`animRotY 0`) with no drift; zero console errors.
- [x] **Hover targeting (P2)**: driven off the front card. *(2026-06-12)* The flat hitboxes don't follow the shader bend, so a raw raycast over the visible front card resolved to a neighbour slot and lifted the wrong card. `onMouseMove` now treats any hitbox hit as "cursor over the carousel" and lifts the front copy (`frontPoster().i`), mirroring the click fix; misses unhover. Verified (CDP): at a bug spot whose raw raycast → ch1, the lifted card is now the front ch2 (single slot, `blend:2`); off-carousel unhovers; no errors.
- [ ] **F — Robustness matrix**: deep-link / click / re-select / exit-by-scroll / exit-by-button / rapid-repeat all verified.

**Later — content & polish**
- [ ] **G — Section bg** alternates dark/light accent like the reference.
- [ ] Richer parallax (ScrollTrigger/Lenis) + inline films in sections.
- [ ] Other 3 chapters' `CHAPTER_PAGES` content + gallery/dress assets (P3 — currently scaffolds).
- [ ] Polish: exact heading typeface + verbatim copy.

**Re-review fix batch (2026-06-12) — shipped & prod-verified**
- [x] P1: scroll-then-click parked the hero off-axis (scrollRotationY now compensated; verified exact — hero (0,40), totalRot 0).
- [x] P1: leaving a page mid-forward-exit froze the scene half-exited (unmount now snaps `setExitProgress(1)`).
- [x] Interrupt-safety: select AND deselect timelines tracked + killed on interruption; back-then-forward re-selects (prod-verified); `pendingIdx` stale-deep-link bug removed.
- [x] Restoration: option-B exit restores center txt; hover cleared on select (stuck EXPLORE cursor / lift-pop); films play on deep-link select + pause on every exit (paused-after-exit prod-verified).
- [x] Input: ready-gating until select settles; Firefox deltaMode normalization; 400ms gesture-gap reset.
- [x] Robustness: post-intro parallax clamp (background-tab camera drift).
- [ ] **Real-browser confirms pending**: video-plays-in-hero (headless has no MP4 codec), exit feel/GIFs, reference EML→back→Wine capture.

**Before handoff**
- [x] Scene instrumentation now gated behind `?debug` (+ new `__exitBegin/__exitScrub/__exitEnd`; `__gsdev()` mounts the GSAP DevTools scrubber on demand — do NOT auto-create it: it hijacks the global timeline). ⚠️ Headless probe scripts must load with `?debug` on the initial URL.
- [x] Removed the dead `virtualscroll` path in `WebGLScene.vue` + dropped the dep. *(2026-06-12)* The installed `virtualscroll@1.0.7` was an unrelated custom-scrollbar widget whose constructor threw on our config, so the `catch` (a window `wheel` listener) was always the real handler. `WebGLScene.vue` now uses a named `onWheel` listener directly (removed on unmount); dep gone from `package.json` + lockfile. Verified (CDP): wheel ticks still rotate the carousel (`scrollRotY 0→−0.77`), no console errors. Note: still wheel-only → **no touch on the homepage carousel** (mobile) — wire `virtual-scroll` (hyphen) if touch is wanted.
- [ ] **Docs-drift pass** (confirmed by the re-review): ARCHITECTURE.md still describes the removed scene-level scroll-exit (#7/SCROLL_EXIT_THRESHOLD), says SELECTED_Y=-70 (code -43), "no routes yet", plural-poster select, and a never-fired onDeselect callback; PROGRESS top sections say baseDistance 42 / tilt -70° (code 40/+70) + scroll-back claims; README lists "scroll-back exit" as shipped.

---

> **▶ Active work: "card-becomes-the-page" rework — see [that section](#card-becomes-the-page-rework-active).**
> The current inner page renders the WebGL card as a fixed background block (clipped, low)
> behind a separate DOM overlay. Reworking so the card *is* the scrolling hero.

> **Status (2026-05-29):**
> - ✅ **Routing skeleton + transition** (steps 1–2) — verified.
> - ✅ **Wine O'Clock content vertical slice** (steps 3, 4-partial, 6) — verified: hero +
>   3 sub-chapters (THE BRIDE / THE WINE / THE PEOPLE) with copy, galleries, and dress-tail
>   cards (Malva, Yaroslava), data-driven from `CHAPTER_PAGES` + `DRESSES`, with a
>   IntersectionObserver fade-up reveal.
> - 🔲 **Remaining:** richer ScrollTrigger/Lenis parallax (step 4 full + 5), inline films
>   (step 5), other 3 chapters' content + assets (step 7), and polish (exact heading font,
>   verbatim copy). See [Skeleton — what landed](#skeleton--what-landed).

- [What an inner page is](#what-an-inner-page-is)
- [Section breakdown](#section-breakdown)
- [The big decision: how home → inner page works](#the-big-decision-how-home--inner-page-works)
- [Routing](#routing)
- [Data model](#data-model)
- [Dependencies](#dependencies)
- [Assets needed](#assets-needed)
- [Risks & unknowns](#risks--unknowns)
- [Suggested build order](#suggested-build-order)

---

## What an inner page is

From inspecting the original's `/wine-o-clock`:

| Property | Finding |
|---|---|
| URL | **Real route** `/{slug}` (e.g. `/wine-o-clock`, `/eat-marry-love`) — `200`; `/chapter/...` is `404` |
| Length | **~6320px (~10.5 viewport-heights)** of vertical scroll |
| Media | ~7 `<video>` (films), photo galleries, parallax images, 1 canvas (the shared WebGL) |
| Structure | hero → 3 numbered sub-chapters → galleries/parallax/films → dress-tail cards → end |
| Headings | Big display **SVG/styled text** (no semantic `h1/h2/h3`) |
| Key classes | `chapter-container`, `parallax`, `img`, `text`, `tails`, `chapter-end` |

It's a **scroll-driven editorial narrative** per chapter, much larger than the homepage in
content but lighter technically (mostly DOM/scroll, not WebGL).

---

## Section breakdown

In document order (per the filmstrip capture):

1. **Hero** — the chapter title wordmark (e.g. "WINE O'CLOCK") on the chapter accent
   background; nav logo top-left. This is the landing state after selection.
2. **Sub-chapters ×3** — each a numbered display heading + intro copy:
   - *Chapter I — THE BRIDE* · *Chapter II — THE WINE* · *Chapter III — THE PEOPLE*
   - (names differ per chapter; structure is consistent)
3. **ImgText blocks** — alternating image + paragraph, alignment varies (`text-left`,
   `md:text-center`). The narrative body.
4. **Gallery + parallax** — photo grids and parallax-on-scroll imagery (vineyard wedding
   photos). `parallax` class.
5. **Films** — embedded chapter videos play inline as you scroll.
6. **DressTail cards** — floating cards naming matched dresses (e.g. "Malva", "Yaroslava"),
   pinned over imagery. `tails` class → see [Data model](#data-model).
7. **Chapter end** — closing section (`chapter-end`), presumably a CTA / return.

Reusable components to build (names mirror the original): `Header`, `ImgText`, `Gallery`
(parallax), `Mask` (reveal transitions), `DressTail`, plus a `ChapterPage` container.

---

## The big decision: how home → inner page works

This is the **central architecture choice** and should be settled before building.

Today: selecting a card runs an in-place WebGL animation (card flattens + fills screen) and
stays on `/` — there is no inner content and no route change.

The original: selecting a card changes the URL to `/{slug}` and reveals the scroll page.

**Options:**

| Option | How | Pros | Cons |
|---|---|---|---|
| **A — Route + handoff** (recommended) | Card-select animation plays, then navigate to `/{slug}`; the inner page mounts as a scrolling DOM view; the WebGL canvas is paused/hidden (or reused for the hero). Exit reverses to `/`. | Matches original (real URLs, shareable, back-button works); clean separation of scene vs page | Must coordinate the select animation with the route transition; manage WebGL lifecycle |
| **B — In-place overlay** | No routing; the inner content scrolls in over the scene as an overlay. | Simplest state-wise; no SSR/prerender concerns | No real URLs (worse SEO/shareability); diverges from original; #7 scroll-exit logic gets more tangled |

Recommendation: **A**. It matches the reference, gives real shareable chapter URLs, and keeps
the scene and the page as separate concerns. The existing select/deselect animation becomes
the *transition* into/out of the route.

**Open sub-questions for Option A:**
- Does the WebGL scene stay mounted (paused) or unmount on an inner page? (Context cost vs
  re-init cost — the homepage intro is ~7s, so re-init on every back is undesirable; lean
  toward keeping it mounted/paused.)
- Is the hero wordmark the WebGL card continuing to fill the screen, or a DOM element? The
  original's select animation flattens the card to fullscreen — that fullscreen card likely
  *is* the hero. Worth confirming before committing.

---

## Routing

Adding routes means introducing Nuxt `pages/`:
- `pages/index.vue` — the current homepage (move `app.vue`'s view here, or keep `app.vue` as
  the shell and add `<NuxtPage/>`).
- `pages/[slug].vue` — the chapter inner page; validates `slug` against `CHAPTERS`.

⚠️ **Deploy implications:**
- **Vercel** handles SPA route fallback automatically.
- **GitHub Pages** is static — `npm run generate` must **prerender every `/{slug}`** (Nuxt
  route rules / `nitro.prerender.routes`, or `crawlLinks`). Otherwise deep links 404.
- Keep the `import.meta.env.BASE_URL` asset pattern; verify it holds under nested routes.

---

## Data model

Extend the content layer (see [CONTENT-AND-ASSETS.md](CONTENT-AND-ASSETS.md)). `CHAPTERS`
stays the spine; add a parallel structure for page content rather than bloating `CHAPTERS`:

```
CHAPTER_PAGES[slug] = {
  hero:        { title, … },
  subChapters: [ { number: 'I', title: 'THE BRIDE', body, media[] }, … ],   // ×3
  gallery:     [ image|video … ],
  dresses:     [ 'malva', 'yaroslava', … ],   // refs into a DRESSES table
}
DRESSES = { symphony, tasmania, sydney, markita, … }   // ~11 dresses: name, image, link
```

The dress set is ~**11 dresses** (`symphony`, `tasmania`, `sydney`, `markita`, …) shared
across chapters; each chapter references a subset.

---

## Dependencies

- **GSAP ScrollTrigger** — the scroll-driven reveals/parallax. GSAP core is already used;
  ScrollTrigger is a separate plugin import (free) — add it.
- **Lenis** — already in `package.json` (`lenis`) but currently unused on the homepage
  (which uses `virtualscroll`). Lenis is the likely smooth-scroll engine for the inner pages.
  Decide: Lenis for inner pages, keep VirtualScroll for the homepage carousel.
- No other new runtime deps anticipated.

---

## Assets needed

Inner pages are **content-heavy**. Per chapter, roughly:
- The hero wordmark (already have `txt-*`/poster art; may need a larger treatment).
- Many **photographs** (galleries) — not currently in `public/` (homepage only had 4 posters).
- The **films** (already have 4 `*-intro.mp4`; inner pages showed ~7 videos — may need more/longer cuts).
- **Dress images** for the ~11 dresses.

For the replica these are placeholders sourced from the reference; for the eventual re-skin
they're replaced wholesale (per [ROADMAP](ROADMAP.md) / [CONTENT-AND-ASSETS](CONTENT-AND-ASSETS.md)).
This is the **largest single cost** of Phase 2 and should be scoped explicitly with the user.

---

## Risks & unknowns

- **Transition coordination** (select animation ↔ route change) is the trickiest part —
  prototype it first on one chapter.
- **WebGL lifecycle** across routes (keep-alive vs re-init); avoid replaying the 7s intro.
- **GitHub Pages prerender** of dynamic routes — verify early or Pages deep-links break.
- **Asset volume** — galleries/films/dresses dwarf the homepage's asset set.
- **Exact section content & order** beyond the 3 sub-chapters wasn't fully mapped — do a
  deeper per-section Browserless capture before building each component.

---

## Suggested build order

Incremental, verify-against-original at each step (same workflow as Phase 1):

1. **Routing skeleton** — `pages/index.vue` + `pages/[slug].vue` (validates slug), back-nav,
   GH-Pages prerender config. No content yet.
2. **Transition** — wire card-select → navigate to `/{slug}`; reverse on exit. Resolve the
   WebGL keep-alive question. Get the *plumbing* solid on one chapter before styling.
3. **Hero + one sub-chapter** — build `Header` + `ImgText` for Wine O'Clock; match typography.
4. **Gallery + parallax + Mask** — ScrollTrigger reveals; add Lenis smooth scroll.
5. **Films inline** — embedded video sections.
6. **DressTail** — the dress-card system + `DRESSES` data.
7. **Generalize to all 4 chapters** via `CHAPTER_PAGES` data.
8. **Polish pass** — Browserless side-by-side per section.

Recommend doing **Wine O'Clock end-to-end first** as the vertical slice, then replicate.

---

## Skeleton — what landed

Steps 1–2 are done and verified live (Wine O'Clock). Architecture as built:

- **Persistent shell**: `app.vue` holds the WebGL scene, nav, cursor, loader, and About —
  these never unmount, so navigating chapters does **not** replay the 7s intro. It renders
  `<NuxtPage/>` for route content.
- **Pages**: `pages/index.vue` (inert — the carousel is the home content) and
  `pages/[slug].vue` (chapter scaffold; unknown slug → `navigateTo('/')`).
- **URL is the single source of truth**: `selectedChapterIdx` / `isHome` / accent / body
  class are all computed from `route.params.slug`.
  - Card click → scene runs the select animation → `app` does `router.push('/{slug}')`.
  - Nav logo / back button / scroll-exit → `router.push('/')`.
  - A `watch(route.params.slug)` reconciles **browser back/forward + deep links** by driving
    `scene.selectChapter` / `deselectChapter` (guarded by `getState()` so it never double-runs
    an in-progress animation).
  - Deep-link on a fresh load defers selection via `scene.onReady()` until the intro ends.
- **The transition IS the existing select animation** — the card fills the screen and shows
  through `[slug].vue`'s transparent hero section; scrolling reveals the (scaffold) body.
- **Prerender**: `nitro.prerender.routes` emits `/{slug}/index.html` shells for GH-Pages.

### Verified
Deep-link `/wine-o-clock` → intro → auto-select (card-as-hero) → scroll → back-to-home. URL,
page mount/unmount, slug validation, and document title all correct.

### Wine O'Clock content — what landed (vertical slice)
- **Data model**: `composables/chapterPages.js` — `CHAPTER_PAGES['wine-o-clock'].sections[]`
  ({ num, title, body, images[], dresses[], align }) + `DRESSES` (Yaroslava→`dress-01.jpg`,
  Malva→`dress-02.jpg`; full 11-dress metadata available from the reference payload for later).
- **Components**: `components/chapter/ChapterSection.vue` (numbered label + display heading +
  body + gallery, alternating left/right, IntersectionObserver fade-up) and `DressTail.vue`
  (photo + name + params + link to millanova.com/dress/…).
- **Page**: `pages/[slug].vue` renders `CHAPTER_PAGES` content when present, else the scaffold
  (la-storia / eat-marry-love / amour-getaway still scaffold). Transparent hero shows the
  WebGL card; content scrolls up over it on the chapter's `--accentLight`.
- **Verified live**: 3 sections, 6 gallery images, 2 dress cards, scroll + reveal all render.

### Known follow-ups (content phase)
- **Richer scroll** — swap the IntersectionObserver reveal for ScrollTrigger + Lenis parallax
  (gallery depth, pinned headings) to match the reference's motion. `lenis` is already a dep.
- **Inline films** — the reference embeds chapter videos within sections; the slice uses
  gallery stills only.
- **Other 3 chapters** — add their `CHAPTER_PAGES` entries + download galleries (same
  `{slug}-{sub}-NN.jpg` pattern) + remaining dress images/metadata.
- **Polish** — match the reference's exact heading typeface and verify copy verbatim.
- **Scroll-back exit (#7) on inner pages:** the inner-page overlay captures scroll, so the
  *scene's* scroll-exit doesn't fire on a routed chapter. Exit is currently via nav logo /
  back button / browser-back — which now plays the **reverse-spin** back into the ring.
  Re-implement "scroll past the *end* of the inner page → `router.push('/')`" at the page
  level (the reference's exit trigger) when building the scroll content.
- **Select-spin magnitude:** the re-select bug is fixed (reset `animatedRotationY` +
  `overwrite` tweens — see PROGRESS Bugs Fixed). The spin currently runs from the post-intro
  rest rotation (4π), so it's a large multi-turn spin; tune toward the reference's single
  controlled turn if desired.
- **Hero fidelity:** the scaffold hero is transparent (shows the filled WebGL card). Confirm
  whether the original's hero is exactly that or a separate treatment when styling.
- **Keep `nitro.prerender.routes` in sync** with chapter slugs (also hardcoded in nuxt.config).
- **#16** (About gray-on-gray) only affects the homepage; on an inner page the accent is set.

---

## Card-becomes-the-page rework (ACTIVE)

Reworking the inner page so the card literally becomes the scrolling hero (matches the
reference). Approach chosen: **full WebGL hero coupled to scroll via Lenis** (2026-05-29).

### Reference mechanics (confirmed via Browserless)
- Fixed full-viewport WebGL canvas (`position:fixed; top:0`) + **native-scrolling DOM** on top
  (real `scrollHeight` ~6320).
- Flattened card = full-bleed hero on the chapter's **dark accent**; as you scroll, the card
  **scrolls away** (coupled to scroll), sub-chapters scroll through, ending in a
  "Discover dress from the chapter" + disclaimer section.
- **Scroll past the end → card reverse-spins back into the carousel ring** (the exit).

### Our gaps (what made it look like a clipped background block)
1. Hero geometry wrong — flattened card renders low/clipped, not full-bleed top-anchored.
2. No scroll coupling — card is fixed behind a separate DOM overlay; never "becomes the page".
3. No scroll-end exit — only the back button exits.

### Plan (Wine O'Clock first, then generalizes via data)
| Step | What |
|---|---|
| A. Hero geometry ✅ | On select, move the chosen card to a deterministic full-bleed hero transform in front of the camera (not just flatten-in-place). Compute scale to fill the frustum → resolution-independent. |
| B. Lenis ✅ | Inner page becomes a Lenis-driven smooth scroll (Lenis already a dep) — the shared clock. (Shipped 2026-05-30 — see P1 above.) |
| C. Scroll coupling ✅ | Each frame, read Lenis scroll and drive the hero card up/away in lockstep with the DOM content → card scrolls off as content scrolls in. One clock = always in sync, no seam. (Shipped 2026-05-30 — `scene.setScroll`, 1:1 `worldPerPx`.) |
| D. Entry spin | Deterministic ring → spin → grow-to-hero; normalize rotation to a consistent single turn that always plays (builds on the re-select fix). |
| E. Exit spin | Scroll past the end → shrink + reverse-spin into the ring → `router.push('/')`. Back button stays as a shortcut. |
| F. Robustness | Browserless matrix: deep-link, click, re-select, exit-by-scroll, exit-by-button, rapid repeat — all must work. |
| G. Styling | Section bg alternates dark/light accent like the reference (hero on dark accent). |

### Considered & rejected
- **DOM hero handoff** (swap WebGL card → matching DOM hero after the spin): simpler/robust
  native scroll, but risks a visible seam at the WebGL→DOM swap. Rejected for fidelity.
- **Fix geometry only (incremental)**: smaller, but doesn't deliver scroll-away/reverse.

### Progress log — Step A (hero geometry)
- ✅ **`SELECTED_Y` -70 → -43**: the card was positioned ~55 units below the camera look-at
  → rendered low/clipped ("background block"). -43 top-anchors it; the wordmark now reads as
  an upper hero. (The card already fills viewport *width* via `scale = aspectRatio*2.07`.)
- ❌ **Single-card hero attempt — reverted**: scaling only `posters.find(chapterIdx===c)`
  showed a **near-white back-facing** card → that copy is the *back* one; the art-facing front
  copy is the other. Restored scaling both copies (art shows, but slightly tilted + ~84% width
  from the back copy overlapping).
- 🔲 **Open**: identify the front *art-facing* copy (so we hero a single clean card) and fix
  the tilt/full-width. Both depend on knowing each copy's world orientation after the select
  rotation — **next step: instrument the scene** (expose poster world matrices / facing to
  `window` under a debug flag) and read it via Browserless `evaluate`, instead of guessing
  blind across 2-min deploy cycles.

### Progress log — Step A, cont. (instrumentation results)
- Added temporary `window.__heroDebug()` / `__camDebug()` (read poster world pos/dist/normal,
  camera/group/carousel state via Browserless `evaluate`). **Remove before shipping.**
- **Confirmed**: the front (visible/art-facing) hero is the **higher-`intRotationY` mirror
  copy** (i+4), not `posters.find()` (which returns the lower copy → ends at the BACK,
  renders near-white). Group is fully flat; the earlier tilt/wash was purely the back copy
  overlapping. ✅ **Fix kept**: hero = the single front copy (`heroPoster`); hide the rest.
- **Dead end**: a camera-derived "cover" scale blew the plane up and pushed the content
  off-screen — the **fragment shader frames the hero into a sub-region of the plane** at
  `progress=1`, so mesh scale must match the hand-tuned `aspectRatio*2.07`, not fill the
  frustum. Reverted scale + `SELECTED_Y=-43`.
- ⚠️ **Verification blocked in-sandbox**: Browserless renders the page at **800×600 (aspect
  1.33)** (CDP quirk), not the real 1.6 — so screenshots aren't representative for geometry.
  **The real full-bleed look must be confirmed on a real 1.6 browser.** If the hero isn't
  edge-to-edge there, tune `aspectRatio*2.07` / `SELECTED_Y` with that feedback (can't tune
  blind against the 1.33 buffer).

### ✅ Step A complete (2026-05-29)
Hero is now a clean, straight, centered, **full-bleed** single card (matches the reference's
static hero — fills top ~50%, content below). The fixes that got there:
1. **Single front-card hero** — scale only the higher-`intRotationY` mirror copy (the one that
   ends nearest the camera); hide the rest. (Both-scaled caused the back copy to overlap.)
2. **Camera recenter on select** — when selected, ease the camera back to base + center lookAt.
   Parallax was gating off and freezing the camera off-axis → the hero looked skewed. (Real bug,
   not just a Browserless artifact.)
3. **Width-fill scale** — `s = (2·dist·tan(fov/2)·aspect / 24)·1.03`. Aspect cancels → full-bleed
   on any viewport (and verifiable on the 1.33 buffer). Replaced the magic `aspectRatio*2.07`.

Still to do: **B/C** (Lenis scroll-coupling so the hero scrolls away as the page), **E**
(scroll-end reverse-spin into the ring), strip the temporary `__heroDebug`/`__camDebug`, and
confirm the real-browser look. `SELECTED_Y=-43` gives a top-~50% hero; nudge if the user wants
it higher/lower.

### Iteration tooling FIXED (2026-05-29)
Established a **local fast loop**: `npm run dev` (Bash bg) + Playwright driving **system Chrome**
headless at real **1440×900 / aspect 1.6** with WebGL (SwiftShader). Edit → hot-reload →
screenshot in seconds — no deploy wait, no Browserless 1.33-aspect distortion. See
[ARCHITECTURE → QA workflow](ARCHITECTURE.md#qa-workflow). This unblocks all remaining WebGL tuning.

**First real-1.6 finding:** at the true aspect the hero card fills full width as a top band, but
the **wordmark ("WINE O'CLOCK") is out of frame** — the shader frames the wordmark/logo at a
fixed UV (progress=1 layout) that doesn't land in the hero band at 1.6 (it showed only on the
wrong 1.33 buffer). SELECTED_Y is very sensitive (−43 = blank top band; −15 = card rides off
the top). **Next hero sub-task:** dial the wordmark into the hero at 1.6 (likely the shader's
progress=1 logo placement or a paired scale/SELECTED_Y), now fast to iterate. Reverted to the
`aspectRatio*2.07` / SELECTED_Y=−43 baseline.

### Full check (2026-05-29) — user-reported regressions confirmed
Ran the local fast loop (real 1.6) clicking from the homepage + deep-linking all 4 chapters:
1. **"Different card on click" — CONFIRMED, root-caused, FIXED.** `targetRot = -(intRotationY)`
   only parked WINE at the front; la-storia/eat/amour landed at the ring SIDE (z≈0, x≈40).
   Fix: a copy at ring angle φ faces the camera at carousel rotation `(φ-90)°` — derive
   targetRot from the chosen hero copy. Verified all 4 chapters now land front-center
   (x=0, z=+40, dist=66).
2. **"Overlay over the card" — CONFIRMED.** Two contributors: (a) unbuilt chapters render the
   scaffold whose **opaque `--accentLight` bg** covers the card; (b) the hero card itself is
   currently **blank lavender (wordmark out of frame at 1.6)** so it reads as a plain block.
3. **"Bottom doesn't wrap back to a card" — CONFIRMED but EXPECTED** — the scroll-end reverse
   (step E) isn't built yet.

**Hero wordmark at 1.6 is finicky** — the shader frames the wordmark/logo at a fixed UV that
doesn't land in the hero band at 1.6, and `SELECTED_Y` sweeps behave unintuitively (the plane
is ~3× the viewport height; parent transforms make projection hard to reason about). **Next:
extract the reference's exact selected-card transform** (scale + world position) via the same
`uniformMatrix4fv` GPU instrumentation used for the homepage camera — ground-truth instead of
guessing — then match it.

---

### ✅ Step B/C complete — scroll-coupling (2026-05-30)
The hero card now **scrolls away coupled to the inner-page scroll** (fixes P1, the "purple overlay").
- **Lenis on the inner page** (`pages/[slug].vue`): wrapper `.chapter-page`, content `.chapter-scroll`
  (content wrapped in one child so Lenis has a single scrolled element), `autoRaf:true`. Each
  `'scroll'` tick → `scene.setScroll(lenis.scroll)`.
- **Scene coupling** (`useChapterScene.js`): new `setScroll(px)` stores `scrollOffsetPx`; the
  `animate()` loop (gated to the settled selected state) sets
  `selectedHero.mesh.position.y = baseY + min(px, 1.3·vh)·worldPerPx`, where
  `worldPerPx = 2·dz·tan(fov/2)/height` at the card's depth `dz = camera.z − heroZ`. That's exact
  1:1 on-screen coupling (`HERO_SCROLL_FACTOR=1`): scroll N px ⇒ card rises N px on screen, so the
  full-bleed hero is gone by ~1 viewport and its bottom edge stays locked to the content's top edge.
  `selectedHero` captured in `selectChapter`, cleared on deselect; `scrollOffsetPx` reset on both.
- **Plumbing**: `app.vue` `provide('webglSceneRef', …)` so the routed page reaches the persistent scene.
- **Verified** (local real-1.6 Chrome + Browserless reference compare): see the ✅ P1 entry below.
- **Tuning note**: the reference card may recede slightly *slower* than 1:1 (a gentle parallax) — our
  1:1 matches the documented P1 spec ("gone by ~1 viewport"); revisit `HERO_SCROLL_FACTOR` / the
  `.chapter-hero` height during the step-G styling pass if a closer pacing match is wanted.
- **Next**: P2 **step E** (scroll-*end* → reverse-spin exit) pairs naturally with this — the card is
  already mid-exit as you reach the bottom.

## 🔎 Careful audit + ISSUE LIST (2026-05-29)

Investigated with every tool: local real-1.6 Chrome (layout/geometry), JS DOM/z-index probes,
the `__heroDebug`/`__probe` scene instrumentation, and a side-by-side reference comparison.
**No code changed in this audit** — this is the prioritized backlog for the card-as-page rework.

### ✅ Fixed earlier this session
- Re-select transition (reset `animatedRotationY` + `overwrite` tweens) — repeatable spin.
- Card **skew** → camera eased back to base on select (parallax had frozen it off-axis).
- **Wrong card on click** → `onClick` selects the front-facing card; the raycast hitboxes are
  flat and don't follow the shader bend, so trusting them hit empty space / a neighbor.
- Correct **select rotation for all chapters** (`targetRot = (φ-90)°`); single front-card hero.

### ✅ P1 — Hero card doesn't scroll; content overlays it  ← the "purple overlay" — FIXED (2026-05-30)
- **Symptom (user SS2):** scrolling the inner page slid a lavender band over the hero card's
  video — a two-tone seam cutting into it.
- **Root cause (measured):** the WebGL canvas/card is `position:fixed` at 0–900 and never moved.
  `.chapter-content` (`accentLight` = `rgb(214,213,232)`) scrolled up to `top:200` **over** the
  fixed card (`#webgl-canvas` stays 0–900). The card never scrolled away.
- **Reference (re-confirmed via Browserless 2026-05-30):** the canvas is `position:fixed; top:0`
  too and never moves — it's the **card *within* the scene** that's coupled to scroll. At scroll 0
  the wine-accent card is full-bleed (wordmark up top); by ~1 viewport the wordmark has scrolled
  off and the next section rises from the bottom.
- **Fix (B + C — shipped):** the inner page (`pages/[slug].vue`) now runs a **Lenis** smooth
  scroll (wrapper `.chapter-page`, content `.chapter-scroll`); each scroll tick feeds
  `lenis.scroll` → `scene.setScroll(px)`. The scene's `animate()` loop moves the hero card
  (`selectedHero.mesh.position.y`) **up by exactly the on-screen pixels scrolled** — computed via
  `worldPerPx = 2·dz·tan(fov/2)/height` at the card's depth (1:1 screen coupling, `HERO_SCROLL_FACTOR=1`).
  So a 1-viewport scroll raises the full-bleed card by exactly one viewport → it clears the top
  cleanly; the card's receding bottom edge stays locked to the content's rising top edge (no seam).
  Clamped at 1.3 viewports (it's gone by then). `app.vue` `provide`s the scene ref so the routed
  page can reach the persistent scene. Reset to 0 on select/deselect + page unmount.
- **Verified:** local real-1.6 Chrome loop (`__heroDebug`, dev build): hero world-Y `-43 → -3.2 →
  21.6` tracking `scrollTop 0 → 720 → ≥1170` (matches the 1:1 math exactly); clean hero↔content
  boundary at the transition; no console errors. Browserless reference re-confirm: original canvas
  is `fixed` + card-coupled — our mechanic matches. ⚠️ The dev build doesn't draw SVG/PNG textures
  under headless (dev-build quirk — see the corrected caveat below; prod renders them fine), and
  **video renders in no headless engine** → confirm the fully-textured scroll on a real browser, or
  by **deploying P1 and Browserless-capturing the prod URL** (SVG/wordmark will render there).

### 🔁 P2 — Bottom-edge exit — the FULL saga (all approaches + why each failed) — HANDOFF

The **top-edge** exit has been solid since 2026-06-01 (`deselectChapter` reverse-rewind — see end of
this section). The **bottom-edge** exit has been reworked many times and is **still in progress as of
2026-06-13**. This is the complete record so the dead ends aren't re-tried.

**⭐ The fundamental constraint (read first).** The top exit works *without any snapshot* because at
scroll 0 you're looking at the actual WebGL hero card *through* the transparent `.chapter-hero` section
— it's already a 3D object, so it simply shrinks/rotates into the ring. At the BOTTOM you've scrolled
past that: the hero card is off the top and you're looking at the **opaque DOM article**. There is **no
3D card on screen**. A flat **2D DOM** element **cannot rotate with the 3D WebGL ring** — so for the
bottom content to become a card that drops *in step* with the deck, it MUST be **rasterised into the 3D
layer** (a snapshot → texture on a card). There is no 2D shortcut; every 2D attempt reads as "the page
does its thing, the ring does its thing — separately."

**Reference mechanism (decoded from `DFxf35Yj.js`; the FORWARD-return north star).**
`window.setPageProgress(de)` maps 0→1 onto paused `fromTo` timelines — `animatedRotationY: X→X+290°`
(forward, continues the entry direction), `carousel.y −70→0`, group flat→tilt, selected card
`scale hero→1`, `blend/progress 1→0`, other cards `y→0`; driven by a 3s `power4.inOut` dummy tween.
Net: the hero shrinks and the ring reassembles spinning forward into the carousel.

**Approaches tried (chronological) — and why each was rejected:**
1. **Scroll-coupled DOM "drop into the deck"** (`97df22da`, `8fbfc3ef`): overscroll drives a DOM
   transform on `.chapter-page` (shrink/fall/fade) OVER the live scene while `setExitProgress` spins the
   ring. ❌ **Two competing layers** — the chapter's WebGL card was visible spinning behind the receding
   page ("wine card in the bg"). Hiding both chapter copies didn't fix the two-layer feel. ⚠️ *Trap:* I
   verified via the `__exitScrub` debug hook, which scrubs the SCENE in isolation and **bypasses the
   real wheel→DOM path** → it read "clean" while the live page didn't.
2. **Reuse the top exit at the bottom** (`4f11d0c6`): both edges → `router.push('/')` → `deselectChapter`.
   ❌ At the bottom the hero is off the top, so `deselectChapter`'s snap-to-`baseY` made the card **jump
   to centre** = "snaps to the top, then plays the top animation."
3. **Forward-spin mirror `exitChapterForward`** (`82b1296b`): a dedicated single-WebGL bottom exit —
   forward +290°, hero brought in from below (mirror its off-top offset), DOM unmounts on navigate.
   ❌ The page **"just disappears, then a spinning ring appears"** — `router.push` unmounts the DOM
   instantly and the WebGL hero rises as a *separate* thing; no continuity from the article you read.
4. **Literal merge via `html-to-image` snapshot** (`ee14cffa`, `e98d739d`): snapshot `.chapter-page` →
   full-bleed WebGL plane (camera child) → hide DOM → shrink the plane into the ring. ❌ The snapshot
   came out **blank** — it captured the page's *transparent top* (`.chapter-hero`), not the scrolled
   view, because **Lenis scrolls via a CSS `transform`** `html-to-image` didn't replicate — and it was
   **slow** (~1.5s; `skipFonts:true` stopped it stalling on the cross-origin Google-Fonts `cssRules`
   SecurityError, but still slow + blank). Dep removed.
5. **Real live page drops in `exitChapterDrop`** (`9553e44e`, **CURRENT on prod**): shrink the actual
   `.chapter-page` (CSS `scale 1→0.14` toward centre + late fade) while `scene.exitChapterDrop`
   reassembles the ring forward **+360°** (chapter card returns to front-centre) + **hides both chapter
   copies** during the drop (no duplicate) + fades them back over the last 0.5s. Mechanism prod-verified
   (probe: `scale 1.0→0.14`, opaque until ~1.4s → **no disappear**; reassembles; 0 errors). ❌
   **Insufficient (user, 2026-06-13):** *"the page just does a centre shrinking while the rings rotate
   separately."* This is the fundamental constraint above — a 2D shrink can't rotate *with* the 3D ring.
   (The "half of it" = the bottom article scaling from an off-centre origin.)

**▶ Chosen path forward — proper literal merge (snapshot → 3D card riding the hero's path).** The page
MUST be in the 3D layer (constraint above). User-approved 2026-06-13. Milestones (each user-tested):
- **M1 — corrected capture (not blank):** capture the *visible bottom* view reliably. `html-to-image`
  on `.chapter-page` grabs the transparent top because of the Lenis transform. Fix: capture an
  **off-screen clone** of `.chapter-scroll` with the transform removed (full article from the top), then
  **crop the visible viewport slice** (`source y = lenis.scroll`, height = viewport) → a viewport-correct
  canvas. Clone off-screen so the live page doesn't visibly jump during capture.
- **M2 — ride the card into the ring:** put that image on a plane that follows the **chapter's card along
  the same path the top exit uses** (full-bleed → ring slot: position + 3D rotation + scale, in step with
  the forward spin) so it **rotates with the ring**, then **hand off to the poster** (fade the page-plane
  out as it lands).
- **M3 — perf + robustness:** **pre-warm** the capture (capture once on reaching the bottom, in the
  background → exit is instant, no hitch); cancel/reverse symmetry; no pops.

**Dormant primitives kept for this:** `beginExit / setExitProgress / cancelExit / endExit` in
`useChapterScene.js` (only the `?debug __exitScrub` hooks call them) — the scrubbable forward-return
machinery, reserved for the M2 ride-into-ring driver. The scene's current bottom-exit entry point is
`exitChapterDrop(onDone)`; the page drives it from `doExit(true)` in `pages/[slug].vue`.

**⚠️ Verification protocol (learned the hard way — FOLLOW IT):**
- Verify exits on the **REAL wheel→DOM path**: dispatch real `wheel` events — one big `deltaY:60000` to
  jump → wait ~2.6s for Lenis to settle at the bottom → an overscroll `deltaY:2000` push. NOT the
  `__exitScrub` scene scrub (it bypasses the DOM path — it misled the verification twice).
- Browserless `Page.captureScreenshot` latency **cannot time a sub-2s animation** (frames land
  late/faded — it repeatedly missed the mid-drop). Use a **screenshot-free `evaluate` probe** sampling
  `getComputedStyle(el).transform`/`opacity` + `__camDebug` over time; screenshots only for the static
  end-state look. Probe scripts live under `/tmp/exit-*.json` driven by `/tmp/bless/exitscrub.mjs`.

**Top-edge exit (STABLE).** Overscroll up past `EXIT_THRESHOLD` (800px) → `doExit(false)` →
`router.push('/')` → route watcher → `deselectChapter()`: snap hero to `baseY`, reverse-spin
`animatedRotationY → preSelectRot`, restore group tilt / carousel-Y / all poster uniforms+scale+position
over ~2.5s. Same animation serves the back button / nav logo. Mid-page scroll is free (only the literal
edges trigger exits; the scene's `onScroll` no-ops while a chapter is open).

**`virtualscroll` history (resolved 2026-06-12).** The installed `virtualscroll` dep had a different API,
so `WebGLScene.vue`'s `vsInstance.on(...)` threw and the `catch` installed a **window wheel listener** —
which was the *real* scroll handler all along. The broken path + dep were removed; `WebGLScene.vue` now
uses a direct named `onWheel` window listener. (Consequence: still **wheel-only — no touch** on the
homepage carousel; mobile/touch is an open item.)

### ✅ P2 — Hover targeting driven off the front card (2026-06-12)
- Was the same shader-bend issue as the click: `getHoveredPoster` tests flat hitboxes, so hovering
  the visible front card lifted a neighbour slot. **Fix (option a):** `onMouseMove` now treats any
  hitbox hit as "cursor over the carousel" and lifts the front copy (`frontPoster().i`) — consistent
  with the click fix; a ray miss unhovers. Verified (CDP): bug spot whose raw raycast → ch1 now lifts
  the front ch2 (single slot, `blend:2`); off-carousel unhovers; no errors.
- *(Not done — option b:* bend-aware hitboxes for true per-card side hover. Front-card hover matches
  the click model, so this is only worth it if the reference shows independent side-card lift.)

### ✅ P2 — Select-spin magnitude normalized (2026-06-12)
- **Was:** the entry spun `animatedRotationY` from the post-intro rest (`4π`) to `(φ-90)°` — a
  small absolute angle — so it actually unwound ~2 turns BACKWARD by a chapter-dependent amount.
- **Fix (`useChapterScene.js` `selectChapter`):** collapse the accumulated whole turns first
  (`restTurns = round(animatedRotationY/2π)`; subtract `restTurns·2π` from BOTH `animatedRotationY`
  and the lerp anchor `rotation.y` so the collapse is invisible), set `preSelectRot` to that
  normalized rest, then advance forward (`while (targetRot − animatedRotationY < π) targetRot += 2π`)
  so every chapter spins FORWARD into `[180°,540°)`.
- **Verified** (local headless CDP): forward 315/360/405/450° per chapter, all front-centre;
  deselect reverse lands the ring at `animRotY 0`; reselect repeats cleanly; no console errors.

### 🟢 P3 — Minor / expected
- **Unbuilt chapters** (la-storia, eat-marry-love, amour-getaway) render the scaffold (opaque
  `accentLight`) over the card — expected. **Fix:** add their `CHAPTER_PAGES` entries + download
  galleries (`{slug}-{sub}-NN.jpg` pattern) + dress images (same as Wine). Until then the
  scaffold is the intended placeholder.
- **"EXPLORE" position** differs between our SS and the reference — that's the custom *cursor*
  (follows the mouse), not a layout bug. **Action:** no fix expected; just confirm it's a
  non-issue when reviewing on a real browser.

### ℹ️ Verification caveats (tooling, NOT site bugs) — corrected 2026-05-30
- **The DEV build doesn't render SVG/PNG textures under headless** — under `npm run dev`, the
  poster SVGs / wordmark / txt PNGs draw blank in headless captures (cards = flat accent frames;
  selected hero = a plain accent block). This is a **dev-build** quirk, **NOT** a SwiftShader
  limit. Proven 2026-05-30: the **same local headless Chrome renders those textures against the
  PROD URL** (`la-coco-vie.vercel.app/wine-o-clock`) — and so does Browserless. So the earlier
  "wordmark missing at 1.6 = headless/SwiftShader artifact" was mis-attributed; it's dev-vs-prod.
  The hero framing (`SELECTED_Y=-43`, full-bleed scale) is good (confirmed on prod + real browsers).
- **Video renders in NO headless engine** (local SwiftShader *or* Browserless), dev or prod —
  needs a real browser. This is the one thing only the user / a real browser can confirm.
- **Headless doesn't trigger lazy `<img>` loads** on programmatic scroll → gallery/dress images
  look broken in headless but are served `200` and load fine on real browsers.
- **Net:** local headless dev loop = **layout/geometry/DOM** (via `__heroDebug`). For **SVG/PNG
  textures**, capture the **prod URL** (local headless or Browserless). For **video** + **lazy
  images**, use a **real browser** (or the user). Browserless's only real edge is reaching public
  prod URLs; it renders at 800×600/1.33 so it's worse for geometry framing.

### 🧹 Tech debt to clear before final handoff
- Remove the temporary scene instrumentation (`window.__heroDebug` / `__camDebug` / `__probe`)
  in `useChapterScene.js` `init()` (or gate behind a `?debug` flag).
