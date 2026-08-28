# Phase 2 — Chapter Inner Pages (Scope)

Scope and build plan for the per-chapter inner pages. **This doc is the single live tracker** —
start here. (It grew from the original Milla Nova replica build; the ▼ HANDOFF box is the current
state, everything below it is history — newest first.)

> ## ▶▶▶ HANDOFF SNAPSHOT (2026-07-23) — read this first
> **What this is:** the **wedding site of Covenant (Odili) & Uvie (Dan-Egua)** — "A Love Story in
> Chapters." A Three.js carousel of 4 poster cards; each opens a bespoke scroll page. Built on an
> engine that began as a Milla Nova replica (`chapter.millanova.com`) and was re-skinned.
> **DONE & LIVE (all prod-verified):** the four chapters US / THE BIG DAY / IN FRAMES / WITH LOVE,
> each a **bespoke inner page** (the "thread" motif — see the STATE entries); homepage carousel with
> per-card hover/click (`posterAtScreen`), scroll-following lift, live cursor tint, names + date +
> countdown, welcome note, RSVP; both exit edges; mobile/touch; the **wedding colour palette**
> (per-chapter hexes in the ▼ palette entry); and **AMBIENT AUDIO** (Howler.js inline in `app.vue`:
> a per-chapter looping track from `CHAPTERS[i].audio` + a `tick` sound, lazy-init on first gesture,
> volume fades hover 0.12 / select 0.5, sound toggle in `SiteNav`). Repo cleaned up + docs current.
> **PLACEHOLDER (waiting on the couple):** all copy, the date's YEAR (Oct 27 confirmed, 2026 assumed),
> venues, the registry items, the RSVP destination (`#rsvp`), gallery photos (Milla Nova stills), the
> card films, the favicon (still Milla Nova's), **and the 4 AUDIO tracks** — currently the reference's
> own files (`eat-merry-love`/`la-storia`/`wine-time`/`amour-getway`.mp3), to be replaced with the
> couple's wedding music (one loop per chapter; rename to the new slugs + update `CHAPTERS[i].audio`).
> **NEXT / OPEN:** real content + media (incl. audio); per-page polish (In Frames flagged "could be
> better"; Big Day wants the traditional-wedding date + thread-motion consistency); portrait
> card-sizing ("passable"); code-health (split the ~1500-line `useChapterScene.js`;
> `prefers-reduced-motion`; 34M MP4s).
> **Regenerate card art:** `npm run gen:textures` (see [`scripts/README.md`](../scripts/README.md)).
> **Audio matches the reference** (verified 2026-07-23 via Browserless: `chapter.millanova.com` uses
> the same Howler.js + the same 4 loop files + tick — our audio is a faithful port, not missing).

**▶▶ FIXED (2026-08-10, `67693fd3`) — GITHUB PAGES ASSETS (every image on every inner page).**
`import.meta.env.BASE_URL` **cannot** build public-asset URLs in Nuxt: Vite's client `base` is
hardcoded to `'./'` for production builds, so `NUXT_APP_BASE_URL=/la-coco-vie/` never reached it and
every asset URL came out relative. Vercel worked **by luck** (root-served, `/with-love` has no
trailing slash); Pages 404'd because it serves prerendered routes **with** a trailing slash, so
`./images/…` resolved to `/la-coco-vie/with-love/images/…`. Now baked at build time via
`vite.define.__APP_BASE__` and consumed by ONE helper, **`utils/asset.js`** — the four hand-rolled
copies (app.vue ×2, chapterPages.js, useChapterScene.js) are gone. `--noise-url` resolves against
`window.location.origin` (trailing-slash-proof) rather than `.href`.
**Verified on BOTH hosts:** 8/8 album images load, `srcs` correctly prefixed
(`/la-coco-vie/images/…` vs `/images/…`), **zero failed requests**, and video/audio/fonts/favicon
200 on both. **Method worth reusing: grep the emitted bundle** (`grep -o '"/\(images\|video\|audio\)/[^"]*"'
.output/public/_nuxt/*.js`) — the bug was invisible in config and only obvious in the build output.

**▶▶ STATE (2026-08-11, later) — IN FRAMES: flat room, real perfs, locked advance, live flicker.**
Four user notes, all applied on top of the entry below.
- **NO gradients.** The nine-stop ramps are gone; the room is flat `#241A33` and the page **cuts**
  in and out. (Verified: `background-image: none` on both end scenes.)
- **Perforations are rectangular cut-outs**, much larger — a `repeating-linear-gradient` on an inset
  child (1.6rem hole on a **4.4rem pitch**), not the small ovals a radial-gradient drew.
  ⚠️ `PITCH_REM` in the script MUST match that gradient or the holes stop landing on their notches.
- ⚠️ **ONE NOTCH PER FRAME, one number driving everything.** The film no longer glides with scroll:
  it HOLDS for the first 62% of each frame's scroll range then pulls through exactly one perforation
  (smootherstep). That single `pull` drives the sprockets, the shutter (shut across the pull), the
  swap (at `pull === 0.5`, when the shutter is fully shut) and the frame slip — so they cannot drift.
  The old version glided the sprockets continuously while cutting the picture at integers, which is
  why the switch never lined up. **Prod-measured:** sprocket Y steps 0 → −70.2 → −140.8 px (= exactly
  4.4rem × 16), shutter peaks 0.85–1.00 mid-pull, frame index increments across it.
- ⚠️ **FLICKER MEANS CONTINUOUS, NOT ON-SCROLL.** The first attempt was a scroll-triggered blink;
  what was wanted is the projector never being steady. Now time-based CSS: uneven lamp swell, fast
  **stepped** brightness jitter (`steps()` so it jumps, not fades), drifting film grain, gate weave,
  intermittent hairline scratches, edge halation. **Prod-verified while stationary:** 6 distinct
  flicker opacities and 12 distinct weave transforms sampled over ~2s with no scrolling.
  All opacity/transform only, all off under `prefers-reduced-motion`.
- Follow-up: the artefacts initially **stacked into a muddy picture** — flicker peaks cut to 0.12,
  halation spread/weight down, grain 0.22→0.15, plus a static `brightness(1.08)` on the exposures.

**▶▶ STATE (2026-08-11) — IN FRAMES REWORKED: countdown first, one gate (`9853e51a`+).**
Order is now TITLE ("Our Journey In Frames") → **LEADER** → REEL → END. The 3·2·1 countdown runs
**before any photograph**, pinned for its full 300dvh.
⚠️ **The gate no longer slides a strip past a window — it IS one window.** A projector holds a
frame, shuts the shutter, pulls the next down, opens again. So the exposure is **swapped at the
exact moment the shutter is fully closed** (no crossfade — a projector cuts), with a small gate
judder during the pull. The film edges stay put; only the perforations travel with scroll
(`background-position-y`), which cues each frame in. Photos are the couple's own Car Selfie / BW
beanie on repeat, `public/images/reel/` (1500px, ~300kB).
**Reserved rolls (Traditional / White Wedding) are GONE** — one reel only. The floating card is now
**"Add Your Photos" → a shared Drive folder** for guests' own shots (⚠️ url still `'#'`).
⚠️ **LOADING ORDER (the reason the countdown moved):** title + countdown are type and SVG and paint
immediately; the photographs are not requested until the leader is within 1.5 viewports
(IntersectionObserver, `rootMargin: '150% 0px'`), and the pinned countdown is the window they land
in. **Soft, not a gate** — a slow network just fills the reel in later, and `img.onerror` counts too
so one bad file can never strand it. Verified on prod: **zero `/images/reel/` requests before
scrolling**, both fetched during the countdown. The countdown states what it is doing
("THREADING THE REEL · n%") rather than hiding it.
**Edges/spacing:** the in/out gradients were two-stop ramps that banded and hit the pale background
as a hard edge — both are nine-stop now; `.scene-end` lost 46dvh and `.--in-frames .chapter-end`
(scoped in main.css) drops its full-viewport height so the lights come up straight into the RSVP.
⚠️⚠️ **BUG WORTH REMEMBERING — a template ref used inside `v-for` is collected as an ARRAY.** Every
element the frame loop drives sits inside the sections `v-for`, so `sweepEl.value.style` was
`undefined` and threw on the first frame; because the throw happened *before* the
`requestAnimationFrame` at the end of `tick()`, **the entire rAF loop died silently** — the page
looked half-alive (images loaded, nothing moved) rather than broken. Query the DOM inside `tick()`
instead (`9853e51a`'s follow-up). Applies to every bespoke chapter component that renders scenes
through `v-for`.

**▶▶ STATE (2026-08-10, latest) — WITH LOVE IS THE INK PAGE AGAIN, EVOLVED (`2c2ba73d`+).**
The album (below) was **reverted at the user's request** — they preferred the original ink concept.
What's live now: the opening thank-you and the signing are the originals; the gifts are **scattered
left and right down the page** and **one wandering line threads them, lassoing each name** as it
arrives; **hovering a gift fades its picture in on a torn paper scrap**.
⚠️ **The curve is MEASURED, not authored** — `measure()` reads where the words actually land, runs a
Catmull-Rom spline through those points, and splits it into per-gift segments whose scrub windows
come from *when each word will be centred in the viewport*. So the line arrives exactly as you reach
a word, and portrait can stack everything centred without the path lying. Re-measures on resize, via
ResizeObserver, and after **`document.fonts.ready`** (web fonts change text metrics — without it the
lassos sit around the wrong box). The lassos use the same spline helper (1.05 turns, wobbling radius,
a tail) so line and loop share a hand. Torn edges = 3 deterministic ragged polygons built once at
module load and cycled.
⚠️ **Touch has no hover** — the scrap reveals when its gift is nearest the middle of the screen
instead (`(hover: none)` branch in the frame loop). Note headless Chrome reports `hover: none`, so a
Browserless shot exercises the TOUCH path, not `:hover`.
**Tuning learned on prod:** the first pass at 62vh/gift + a 150dvh signing scene read far too sparse
(rows are 46vh now, with a small per-gift vertical offset so they don't march); the line at
2.2px/0.5 opacity vanished against the pale background (now 2.6/0.62). The **signing windows were
shifted earlier** (names finish ~0.76 not ~0.92) — the old page's documented "signature rides high
toward the nav" nit came back with the scene, and this is the fix.
Kept from the album: the cash card (only CTA, no account details, `url` still `'#'`) and `claimed`.

**▶▶ SUPERSEDED (kept for the reasoning) — "THE ALBUM" (`7799f09d`).** The registry page was
the site's weakest and the user said so. **Diagnosis worth keeping:** it was built out of *US's*
vocabulary — cursive `.write`, pen-loop circles, script signatures — against the rule that no two
chapters share a visual language; and it was four identical stanzas in which the one page with a
JOB (pick a gift) handed its only affordance to a floating card.
**Now:** a cover, three paper spreads, a cash card. Each item is a cut-out that **pastes down** as
its slice of the scene scrolls (drops in tilted + slightly large, `easeOutBack` overshoot, settles
under one strip of tape); items sit at different depths and drift apart as the page moves; hover
**picks a cut-out up** (it counter-rotates the parent's angle to straighten). Voice is **printed
type only** — letterspaced caps, set captions, never script; that single rule is what keeps this
page and US distinct. The thread's last form here is the **stitch binding the spine**, drawn
top→bottom per spread (`.drawdown`).
**User decisions (2026-08-10):** NO prices, NO per-item links — the cash card is the only CTA, and
it shows **no account details** (payment link or get-in-touch; `url` still `'#'` — needs deciding).
`claimed: true` support (greyscale + struck label + stamp + aria) is built and **shipped unused**.
⚠️ **Perf rule learned:** the frame loop touches **only transform/opacity**. Shadows are static CSS
with a hover transition — a per-frame `drop-shadow` recompute on full-size PNGs is what makes a
collage page crawl. New scrub types beside `.fade`/`.scrub`: **`.paste`** and **`.drawdown`**.
⚠️ **Placeholder art:** ONE stock clipart cut-out for every item
(`public/images/registry/placeholder-item.png`), **watermark deliberately left in** — it's a free
preview, not a licensed asset. Swap per item via `image:`.
**Asset sourcing dead ends (don't repeat):** Openverse CC0 → rawpixel's "png sticker" collection
looks perfect but the public preview URLs have a **checkerboard baked into the pixels**
(`hasAlpha: false`, background alternating 238/255) — unusable, and clipart anyway. Wikimedia
Commons PD PNGs: essentially none with real alpha. CC0 photography: all *scenes*, nothing isolated.
**The real fix is retailer product images of the couple's actual items.**
The four `reg*` entries in `POPUPS` are now **orphaned** (the album has no floating cards).

**▶▶ STATE (2026-08-10) — THE COUPLE'S OWN CARD FILMS ARE IN.** The four hover/select films are no
longer Milla Nova's: `public/video/{us,the-big-day,in-frames,with-love}.mp4`, sourced from the
**`new frames/`** drop folder at the repo root (tracked in git — that's where the couple's raw media
lands, photos included). `CHAPTERS[i].video` updated; the old `*-intro.mp4` deleted (recoverable
before `5d44726c`); `public/video/` went 32M → 6.6M.
⚠️ **Encode gotcha — the card shader wants 900×1200 (3:4), silent.** The sources are SQUARE phone
exports (546–720px, ~4.5 Mbps, with AAC): feeding a square texture into the 3:4 window stretches
faces vertically. They're **cropped to fill** (`scale=-2:1200,crop=900:1200:X:0`), `-an`, CRF 23 —
recipe + the per-file X offsets in [CONTENT-AND-ASSETS → Swapping the card films](CONTENT-AND-ASSETS.md#swapping-the-card-films).
`with-love` needed `X=240` (not the centre 150) to keep his face in frame; frames were contact-sheeted
across each clip before shipping because the subjects move.
⚠️ **Video does NOT decode in ANY headless engine** (Browserless included) — a prod probe can confirm
the files fetch 200 and the `<video>` elements reach `readyState`/`videoWidth`, but *how the films
look on the cards* needs a real browser or the user. **Still placeholder:** gallery stills, ambient
audio, favicon.

## 🚀 Pick up from here (cold start)

1. `npm install` → `npm run dev` → http://localhost:3001 (macOS build gotcha + commands in the [README](../README.md)).
2. Read [`docs/ARCHITECTURE.md`](ARCHITECTURE.md) before touching `composables/useChapterScene.js`. The
   exit model: TOP edge → `pages/[slug].vue doExit()` → `router.push('/')` → watcher runs the scene's
   `deselectChapter` (reverse). BOTTOM edge = the scroll-driven **cluster-unfurl outro**, driven by
   `beginExit`/`setExitProgress`/`cancelExit`/`endExit`. **Both edges are done.**
   ⚠️ Anything positional or timing-related in the scene is likely **orientation-dependent**. Several
   constants that look like magic numbers are landscape-derived (`2.07` = fill-width at the desktop camera
   distance; `SELECTED_Y -43`; the -30 card-hide offset). Portrait broke on every one of them. Check
   `isMobile` before assuming a constant is universal.
3. **Debug:** load any route with **`?debug`** *on the initial URL* (e.g. `/wine-o-clock?debug`) for
   `window.__heroDebug()/__camDebug()/__probe()`, deterministic exit scrubbing
   (`__exitBegin()`→`__exitScrub(0..1)`→`__exitEnd()`, `__setScroll(px)`), and `__gsdev()` (GSAP scrubber).
4. **Verify** the way this project does (ARCHITECTURE → QA workflow): deploy first (Vercel auto-builds
   `main`; check `state:READY` via the Vercel MCP), then Browserless against the **prod** URL.
   🔑 **The Browserless token lives in `.env.bless` at the repo root** (gitignored, `BLESS_TOKEN=…`) —
   load it with `export $(cat .env.bless)` before running probes; no need to ask the user for it.
   ⚠️ The Claude Code in-app Browser pane CANNOT verify this site: its tab is `document.hidden`, rAF
   never fires, so the loader/intro freeze (~28%). Use scratchpad playwright-core → prod, or Browserless.
   ⚠️ **Two hard-won rules** (see the bottom-exit saga): (a) verify exits on the **real wheel→DOM path**
   (dispatch real `wheel` events), NOT the `__exitScrub` scene scrub — it bypasses the DOM and misleads;
   (b) Browserless `captureScreenshot` latency can't time a sub-2s animation — use a **screenshot-free
   `evaluate` probe** (sample `transform`/`opacity`/`__camDebug` over time), screenshots for the look only.

**▶▶ STATE (2026-07-23, evening — post-pivot progress, HEAD `6d57d155`).**
- **Date is real: OCTOBER 27** (year still assumed 2026 — confirm). Countdown, copy, poster credit
  lines all updated.
- **Card faces: individualized typefaces are FINAL** (Us=Over the Rainbow · Big Day=Italiana ·
  In Frames=Monoton · With Love=Bague). An all-Monoton pass was tried and REVERTED — the user
  called it monotonous; don't unify the card faces again.
- **US inner page: bespoke "margin notes" treatment BUILT + user-approved** ("simple and nice").
  `components/chapter/UsStory.vue`: per-scene stitch date-line (draws on reveal), ONE taped
  polaroid (settles from a deeper tilt, cursive caption), two-voice margin notes landing in
  sequence (his 0.7s, hers 1.3s), same accent/watermark/reveal language as the rest.
  ⚠️ Bespoke chapter components MUST render `.chapter-section` roots with `data-idx` — the
  popup observer in `pages/[slug].vue` keys on them.
- **Design principle from the user for the remaining pages:** do NOT reuse a single visual
  vocabulary across pages — derive each page's treatment from its PURPOSE and journey stage.
  Approved narrative: **THE THREAD** — one line runs the whole site: two threads (US's stitch
  lines + two voices) → they TIE THE KNOT at the Big Day's ceremony → become the FILM strip
  (In Frames, dark "screening room") → become INK that writes and signs (With Love).
- **THE BIG DAY = "The Hours" — BUILT + prod-verified (`4586dd48`), awaiting user reaction.**
  `components/chapter/BigDay.vue`: 4 scenes, one falling light (sage → noon → golden → deep-
  green night; text flips light at dusk); scroll-scrubbed SVG thread per scene (pathLength=1
  dash trick + rAF reading scene rects — follows Lenis, reverses free); THE KNOT: 260dvh sticky
  scene at 12:00, his/hers threads draw from opposite edges, interlace, twist, continue as one;
  'we do.' + ceremony facts land after; photo-free page. Giant Italiana hour numerals.
  ⚠️ Gotchas: (a) `overflow:hidden` on a scene KILLS position:sticky (it becomes the sticky
  containment box) — the knot pinned to the scene top until removed; (b) the active-section
  observer in `pages/[slug].vue` now measures `intersectionRect.height / rootBounds.height`
  (viewport-relative) — the old element-relative 0.45 threshold could never fire for sections
  taller than vh/0.45 (the documented latent trap; the knot scene is exactly that). Popups
  verified tracking all four scenes on desktop + mobile emulation, 0 console errors.
- **Big Day follow-ups (user, 2026-07-23 — "I see the vision", parked while pages build out):**
  (1) add the TRADITIONAL wedding date/eventing (the day currently only tells the white-wedding
  story); (2) the thread's MOTION CONSISTENCY between scenes (segments draw at per-scene rates);
  (3) the page is CONTENT-THIN — more to read/do per scene when real details arrive; (4) user
  LIKES the add-to-calendar card; wants a real MAP widget card later.
- **IN FRAMES = "The Screening Room" — BUILT + prod-verified (`3730fbae`), awaiting user reaction.**
  `components/chapter/InFrames.vue`: the one page that goes DARK (chapter deep-purple #2b2a45).
  Film-leader title card → THE GATE (sticky projector window; scroll translates a physical film
  strip through it via rAF; sprocket holes = repeating radial-gradients, zero assets; each frame
  brightens as it reaches gate centre, caption flickers on beneath in the handwriting voice) →
  THE LEADER (academy countdown, crosshairs + scroll-scrubbed sweep circle + Monoton 3→2→1) →
  RESERVED ROLLS (The Traditional / The White Wedding as dashed blank "exposures reserved"
  frames) → END OF REEL card, gradient lifts the lights back into the RSVP outro. Roll 01 = 5
  placeholder exposures w/ subtitle captions. **Projector DWELL:** the strip position is
  double-smoothstepped so frames rest centred in the gate and transition quickly (a naive linear
  advance left every frame half-in/half-out and murky — fixed `3730fbae`). Verified desktop +
  mobile: strip advances, captions swap at frame centre, leader counts 3→1, popups track, 0 errors.
  ⚠️ **KNOWN NIT (tunable):** sprocket holes render but read too subtle on prod — the strip bar
  (#1d1c30) is too close to the room (#2b2a45); needs more contrast / wider bar. CSS is correct
  (isolated test passes); it's a value tweak, not a bug.
  **User (2026-07-23): "In Frames could be better" — circle back to polish ALL pages after the
  four are built.** Don't treat any page as final yet.
- **WITH LOVE = "Thank-You in Advance" — BUILT + prod-verified (`d75375a5`).** `components/chapter/
  WithLove.vue`, the thread's final form (INK). OPENING: the ink writes "thank you" via a new
  `.write` scrub type (L→R `clip-path: inset()` reveal = handwriting), flourish draws beneath.
  GIFTS as PROMISES: each gift written as its future memory ("slow sunday mornings → the espresso
  machine"), the ink CIRCLES the gift name (scrubbed pen-loop ellipse, non-distorting `viewBox`);
  the registry LINK stays the floating white card, tracked per stanza (the recurring element the
  user likes). SIGNING: the trunk forks and each branch runs INTO the start of a name (fixed from
  a first pass where branches dropped past the names); both names write in cursive, underlined;
  flows into ChapterEnd's RSVP. All scroll-scrubbed, reversible, ~zero media. Verified: 6 scenes,
  circles + cards track, signatures write, 0 errors.
  ⚠️ CIRCLE-BACK POLISH: signature completion timing rides high toward the nav late in the scene
  (transient mid-scroll; centered during natural scroll) — shift `.write` windows earlier.

- **HOMEPAGE feel fixes (`7dd5ca82`, prod-verified).** (1) Hover felt laggy — the lift tween used
  `power2.inOut` (eases IN, ~0.3s of near-zero motion); now `power2.out` + 1.0s→0.55s so it starts
  on contact. (2) The explore-cursor accent went stale after a wheel-scroll (it only updated on
  mousemove): `onFrontChapterCallback` fired only from `setTxtChapter`, whose idle call was gated
  on `hoveredIndex===-1`. The front chapter is now reported every idle frame (decoupled from hover,
  `lastFrontChapter` guard) so `--cursorAccent` tracks the ring as it settles. Verified: wheel-only
  scroll (no mousemove) changed front 2→0 and the tint followed `#353454→#B32C05`; hover blend→2.0.
  (3) The whole hover LIFT now follows the scroll too (`e4e77382`): while hovering, every idle frame
  re-targets the lift, so the flatten + film + text + colour all travel with the ring.
  (4) ANY card is now hoverable/clickable, not just the front (`8229121b`). The flat hitboxes don't
  follow the shader bend, so the code couldn't tell WHICH card was under the pointer and always
  lifted/opened the front. New `posterAtScreen()` projects each poster's centre to screen and picks
  the nearest to the cursor (front half of the ring only); unified via `resolveHoverTarget()` +
  `applyHover()`, shared by onMouseMove, the per-frame scroll re-target, AND onClick (a side card
  rotates to front then opens). Cursor tint reports the HOVERED card's accent (front when idle).
  Verified: grid sweep lifts 3+ distinct chapters incl. non-front; click a side card → its route;
  scroll hand-off preserved; 0 errors. (Consequence: gaps BETWEEN cards lift nothing now — correct.)
  (5) Bottom-edge hover FLICKER fixed (`4ab2c880`): a lifting card moves its own hitbox up off the
  cursor, so the per-frame re-resolve unhovered → dropped → re-hit → oscillated. The re-resolve now
  only SWITCHES cards (never unhovers); leaving the deck is onMouseMove's job. Verified: hover blend
  holds 2.00 across 12 samples (stable), move-off still unhovers (blend→0), 0 errors.
- **⭐ WEDDING PALETTE adopted (2026-07-23, `93a04a6b`, prod-verified all 4 chapters + home).**
  Replaced the Milla Nova reference colors with the couple's actual wedding palette, one hue family
  per chapter (user-approved after a preview; retires the jarring rust-red). Wedding hexes are the
  EXACT mid-tones; each chapter's dark ink + pale card bg are derived from the family:
  | chapter | accent (ink) | accentLight (bg) | accentLighter (mid) | deep tone (components) |
  |---|---|---|---|---|
  | us | `#42221A` chocolate | `#F2EEE8` | `#D2C3AE` mocha | — |
  | the-big-day | `#41492D` | `#E9ECE2` | `#A6B18A` sage | `#9BA66F` olive |
  | in-frames | `#453350` | `#EFE8F5` | `#C3A6D8` lavender | `#9F7BB8` purple; room `#241A33` |
  | with-love | `#2E4A52` | `#E8EDF2` | `#9FB4C8` dusty blue | `#6FAFC0` teal |
  Touched: `CHAPTERS` + `main.css` vars; regenerated `cu-p1..4` + `cu-txt1..4` (bg=pale, ink=accent,
  via `scratchpad/gen-textures.mjs`); the 4 bespoke components' hardcoded palettes (Big Day day→night
  shifted to olive; In Frames room → deep purple `#241A33`, still "lights-down" dark; With Love ink →
  teal); chrome fallbacks default to chocolate. With Love went pink→blue/teal (palette has no pink).
- **MOBILE audit of the homepage refinements (2026-07-23, prod @390×844).** All relevant ones
  present + working: cursor/EXPLORE tint tracks front during scroll (front 1→3, tint followed);
  per-card TAP-to-select resolves via `posterAtScreen` at portrait (tap → `/us`); tighter tagline
  renders compact in the upper-middle, not cropped; parked EXPLORE button shows + tints; 0 errors.
  Hover-only fixes (snappy ease, lift-follows-scroll, per-card lift, bottom-edge flicker) correctly
  no-op on touch (`lastCursor` off-screen; "only switch, never unhover" guard). The desktop-only
  collision fix (`IDLE_Y_DESKTOP`/`TXT_SCALE_DESKTOP`) is NOT needed on mobile — portrait already
  separates wordmark (upper-third, `TXT_Y_MOBILE`+fitTxtMesh) from the card; verified no collision.
- **HOMEPAGE tagline tightened (`4ab2c880`).** Too airy vs the reference's squeezed block. In
  `scratchpad/gen-textures.mjs`: line-height 0.94→0.82, `.sm` margins 14→3px, letter-spacing
  looser→tighter, size bump (xl 180→204, sm 74→86) — tighter spacing offsets the size so vertical
  extent doesn't grow (no re-collision with the dropped ring). Regenerated `cu-txt1..4.png`.
- **HOMEPAGE desktop text/card collision FIXED (`40c6c1a8`, prod-verified 1.35 + 1.6).** The big
  central tagline mesh and the card ring shared the same vertical band → the front card covered
  the wordmark's lower half. Two DESKTOP-ONLY levers (mobile keeps its fitTxtMesh scale + 0 idle):
  `TXT_SCALE_DESKTOP 0.82` (was fixed 1.0) + `IDLE_Y_DESKTOP -12` via a new `idleCarouselY()`
  used at init/deselect/endExit. Select still drops to the absolute `SELECTED_Y`, so the verified
  hero framing is untouched; select→deselect returns the ring to -12 with no drift. Now reads like
  the reference: big central tagline, cards in a lower arc. (Portrait card-sizing "passable"
  issue is separate + still open.)

**▶▶ ALL FOUR INNER PAGES ARE NOW BESPOKE (the thread narrative complete): US (voices) → THE BIG
DAY (light + the knot) → IN FRAMES (darkness + the film strip) → WITH LOVE (ink that signs).**
The generic `ChapterSection` loop is now only the unused fallback. Next: the user wants a POLISH
pass over ALL pages (In Frames flagged first), plus real content/media, plus the Big Day
follow-ups. No page is final.

**▶ THE PIVOT (2026-07-23).** The site is no longer a Milla Nova replica: it is now **the
wedding site of Covenant (Odili) & Uvie (Dan-Egua)** — "A Love Story in Chapters" (HEAD `cd48cb2b`,
live + prod-verified). The conventional wedding pages became the four ring cards: **US** (story) →
**THE BIG DAY** (events; popups = 📍 map / 🗓 calendar cards) → **IN FRAMES** (gallery) → **WITH LOVE**
(registry; popups = gift cards). Chapter-end CTA = "See you there — RSVP"; homepage carries the names
wordmark + date + countdown; the About panel is the welcome note. The scene machinery is untouched.
**ALL content is PLACEHOLDER** (invented date Dec 12 2026, [bracketed] facts, Milla Nova stills,
dummy registry, '#rsvp'). Texture pipeline gotchas: poster SVGs must be **pre-rendered to PNG**
(SVG-as-image won't wait for embedded fonts at drawImage); `cu-logo.png` **alpha is load-bearing**
(shader: mix(poster, accent, logo.a) — opaque bg floods the card accent); posterTex needs
colorSpace=SRGB on the PNG path. Old replica copy recoverable at `a4224399`.

**▶ Pre-pivot state (2026-07-22 handoff).** Three things closed since the previous handoff: the
**bottom-edge exit is DONE and user-approved**, **all four chapters are built with the reference's REAL
copy**, and **mobile/touch works**. What remained was layout *fidelity* (scaling), not function — see
▼ "What's left" (those items now serve the wedding skin).
The exit is the reference's scroll-driven outro (decoded from `millanova frames/`, gitignored) — NO page morph.

## ⚠️ VERIFICATION STATUS — read before trusting anything above

**"Done" below does not uniformly mean "confirmed working on a real device."** Three different levels of
evidence are mixed together. This table is the honest state as of `ce885d53`. **Nothing after `43c1e6d8`
has been seen on a real phone**, and the last commit of the session was never rendered at all.

| Change | Commit | Evidence | Status |
|---|---|---|---|
| Cluster-unfurl exit (all cards present, monotonic radius) | `41812cff` `185f9f8b` | User on the live site (_"I love it"_) **+** Browserless prod probe: mid-exit poses, `endExit` → clean full-radius ring, 0 errors | ✅ **Confirmed** |
| Inner-page layout rework (wine slice) | `722ed89e` | Browserless prod: 3 sections, popups present, chapter-end, images load, 0 errors — at 800×600 | ✅ Emulated |
| 3 chapters built (placeholder copy) | `ce585648` | Browserless prod per chapter: `sections: 3`, `scaffold: false`, end title, popups | ✅ Emulated |
| Touch carousel, tap-select, chapter scroll, top-pull exit | `9e80bb6d` `ebe33618` | Browserless CDP touch @390×844: swipe rotates (`scrollRotY 0→-0.76`), tap selects, chapter scrolls `0→1395`, top-pull → `/` | ✅ Emulated |
| ABOUT nav label on phones | `d93b9b07` | Visible in the user's device screenshot | ✅ **Confirmed** |
| **Real harvested copy — the 5-section chapters** | `a4224399` | 2026-07-23 local-headless→prod @390×844: la-storia AND eat-marry-love render **5 sections each**; dress popups appear for sections 0 & 1 (pinned 723–839). Browserless cross-check: real copy renders on prod, 0 errors | ✅ Emulated |
| Tap must hit the deck (no more "tap anywhere selects") | `8c67c360` | ❌ No probe run; user never confirmed | ⚠️ **UNVERIFIED** |
| Wordmark scaling + no wrong-chapter flash | `8c67c360` `9b8659ce` | Emulated screenshot: text legible, correct chapter, unclipped | ✅ Emulated |
| Swipe release momentum | `8c67c360` | ❌ Never measured | ⚠️ **UNVERIFIED** |
| `.chapter-page` `100dvh` → `100%` | `8c67c360` | ❌ **A hypothesis about iOS's dynamic viewport.** Never confirmed to fix anything | ⚠️ **UNVERIFIED** |
| Entry cadence (3.8s spin; cards → wordmark → EXPLORE) | `16347dde` | ❌ Never verified, on device or emulated | ⚠️ **UNVERIFIED** |
| Dress popups pinned to viewport | `eb87d5c2` | Browserless: `getBoundingClientRect` 723–816 in an 844 viewport across 3 scroll positions | ✅ Emulated, measured |
| EXPLORE button off chapter pages | `43c1e6d8` | Emulated: chapter scrolled `375→1875` afterwards | ✅ Emulated |
| Portrait hero geometry (`heroFillScale`, `SELECTED_Y_MOBILE`) | `49306bc0` | User's device screenshot: hero **does** now fill the top — but that same shot exposed the card bug below | 🟡 **Partly confirmed** |
| Ring-card clearance, first attempt (−62) | `5444da3e` | User's device screenshot: **still broken** — cards still visible | ❌ **Was insufficient** |
| Ring-card clearance, corrected (−101, derived) | `17da487c` | 2026-07-23 local-headless→prod @390×844: non-hero cards at world y −90…−138 (frustum floor −62), screenshot clean (hero + accent, no card shapes); hero at y=11 | ✅ Emulated, measured |
| Desktop regression pass (post-`722ed89e`) | — | 2026-07-23 local-headless→prod @1440×900: intro rests 4π, tilt 25/70/15°, wheel rotates; hero `SELECTED_Y −43`/`scaleX 3.31` (bit-identical fill-width), ring at −73…−121; popups pinned 820–896 at 3 scroll positions; striped wordmark band leads the hero; 0 errors | ✅ Emulated |
| Inner pages on a real phone | — | User, 2026-07-23: **"workable for now. Still not perfect"** — first device sign-off since the fixes; fidelity gaps remain (hero leads with photo, card sizing) | 🟡 **Confirmed workable** |

**RESOLVED 2026-07-23:** the user confirmed the inner pages are **"workable for now. Still not
perfect"** on a real phone, and a desktop regression pass (homepage + chapter, geometry + popups +
wheel) passed clean. Remaining gaps are *fidelity* (see "What's left"), not breakage.

**⚠️ Latent trap found 2026-07-23 (not currently visible):** the active-section IntersectionObserver
in `pages/[slug].vue` requires `intersectionRatio ≥ 0.45`, but the ratio is relative to the SECTION's
own height — a section taller than `viewportHeight/0.45` can NEVER activate. Wine's section 1 (2121px
mobile / 2556px desktop, max ratio 0.35–0.40) is the only such section today and carries no dresses,
so nothing is visibly lost — but giving dresses to any tall section will silently never show them.
Fix when touched: compare `intersectionRect.height / rootBounds.height` instead.

**⭐ THE SINGLE MOST USEFUL THING IN THIS DOC: the reference's inner pages CAN be read.** An earlier pass
concluded its copy was "permanently un-scrapeable" and shipped invented placeholder text — that was **wrong**.
`chapter.millanova.com` is a pure-WebGL SPA: `setSelected()` rotates but never mounts, a synthetic click does
nothing, and a cold deep-link bounces to `/`. But a **real touch TAP on the front card under mobile emulation
mounts the inner page** (route flips, `scrollHeight` 844 → 6481, real DOM text appears). Recipe: emulate
390×844 + `Emulation.setTouchEmulationEnabled` → load `/` → swipe N× to rotate the ring → tap (195, 500) →
scroll with `window.scrollTo` (CDP touch events blow the 59 s Browserless session cap) → read
`document.body.innerText`. Rotation cycles wine → eat-marry-love → amour-getaway → wine; **`rot=4` reaches
la-storia**. Cap the scroll below the outro or the reference's own exit fires and dumps you back to `/`.
The same trick is how you'd harvest its real GALLERY PHOTOS (still outstanding — ours are film stills).

**⭐ Decoded reference mechanism (the north star).** The chapter page is normal scrolling DOM. You scroll
past its footer and the **WHOLE page scrolls up and out**. Below it a tall **"outro" section** scrolls in
and reveals the WebGL ring on the **chapter-accent (purple) background** — positioned LOW, viewed *into the
cylinder* (front cards arc across the bottom, blank backs at the top), **spinning, with the chapter's own
card MISSING (slot empty)**. Once the page is fully out, that card **descends from the top of the viewport**
into its slot, synced to the spin — which (since the page already left the top) reads as the page becoming
a card (**pure illusion, no morph**). Keep scrolling → the ring rises + un-tilts to the homepage, bg fades
to light. Scroll-coupled + reversible. The exit spins in the **down-scroll direction** so it flows into the
homepage idle with **no spin reversal**. (Every prior "morph the page" approach failed — full log in the
saga below. Top ≠ bottom, and that's fine.)

**✅ BUILT & prod-verified (M1 = `38e2cce2`; M2-ChunkA = `0c1edfee`+`49df9f17`):**
- **Plumbing (M1):** transparent `.chapter-outro` (250vh) below the article in `pages/[slug].vue`;
  `updateExit(scroll)` maps scroll → `de` → `scene.setExitProgress(de)`; reversible (`cancelExit`); `de`→1
  commits → `endExit` + navigate `/`. Leaving mid-exit (back button) finalizes to a clean ring.
- **Background:** `renderer.setClearColor(exitBg, exitBgAlpha)` in `animate()`; `exitBg.set(chapter.accent)`
  + a fade-in tween on `selectChapter`; faded back out on `deselectChapter`/`endExit`; driven 1→0 over de
  0.7→1 by `setExitProgress`. The ring spins on the accent during the exit, → light at the homepage.
- **No spin reversal:** `EXIT_SPIN` = `toRad(-300)` (NEGATIVE — matches `onScroll`'s `scrollRotationY -=
  delta*0.0008` down-scroll). Verified: animRotY 7.07→1.83 (decreasing).
- **Gotcha fixed:** `animate()`'s idle depth-fade uOpacity lerp was overriding the card opacity → gated on
  `!isDeselecting` so `setExitProgress` owns the chapter cards' opacity through the exit.

**✅ EXIT FINISHED — "cluster-unfurl" (`41812cff` + `185f9f8b`; user: _"I love it, nailed it RIGHT ON"_).**
The M2-ChunkA "hide the wine card, drop it in" model was WRONG and is gone. Corrected from the user's own
frames (`millanova frames/bottom cards cluster/`): the deck is **never hidden**. Final mechanism —
- **All 8 cards present throughout**; ONE wine copy (the mirror) rides in the deck from the start while only
  the SECOND (the hero) waits off-top and **drops in** during the unfurl. (Before: both were hidden, one
  dropped and the other *materialised* — the user spotted the mismatch immediately.)
- **Ring RADIUS grows MONOTONICALLY** `CLUSTER_R 18 → baseDistance 40` via `ss(t)`. It originally *dipped*
  (40→18→40), which read as "shrinks first, then expands" — the user's words. Never reintroduce the dip.
- Card faces stay visible on the purple the whole way; the centre wordmark holds out until the homepage
  settles (the reference shows no floating wordmark mid-unfurl).
- **Because the exit now animates card x/z, every exit-out path restores the ring**: `cancelExit` and
  `deselectChapter` reset x/z, and `endExit` snaps the FULL homepage pose (carousel.y, group tilt, every
  poster's position/scale/framing/opacity). `endExit` is called alone when Back is pressed mid-scroll, so it
  can't assume `setExitProgress(1)` ran first — that path also used to leave the ring low/tilted.
- Tunables: `CLUSTER_R`, `BOWL_Y`/`BOWL_TILT`, `DROP_START 0.45` (**mirrored in `pages/[slug].vue`**),
  `EXIT_SPIN`, `HERO_FIT_END`. Prod-verified: mid-exit all 8 present with one wine visible + second hidden;
  `endExit` → clean full-radius ring (`carouselPosY 0`, tilt 25/70/15°); 0 console errors.
- Deferred by the user: an angular fan-out (reads slightly cylindrical, but they're happy).

**✅ ALL FOUR CHAPTERS BUILT — with the reference's REAL copy (`ce585648` → `a4224399`).** Section counts
differ and are NOT uniform: **wine 3, eat-marry-love 5, la-storia 5, amour-getaway 3**. Reference quirks
preserved verbatim ("pallete" sic in wine II); their duplicated "Chapter IV" label on eat-marry-love is
corrected to IV + V. Galleries are **placeholder film stills** extracted from each chapter's own
`public/video/*-intro.mp4`; DRESSES are **real** (names/photos/links scraped from
`millanova.com/collection/chapter-bride`, which unlike the WebGL experience IS ordinary DOM).

**✅ MOBILE/TOUCH WORKS (`9e80bb6d` → `17da487c`).** See the mobile section below — the carousel was
wheel-only, so a phone couldn't turn the ring at all.

**▶ WHAT'S LEFT — fidelity, not function.**
1. **Inner-page SCALING vs the reference** (measured, not yet applied): reference copy is `16px/24px` Bague;
   its headings use a striped display face scaled to fit width (ours is plain Bague); its images are **inset
   with margins**, ours are full-bleed edge-to-edge.
2. **Homepage card sizing on portrait** — cards are still oversized/cropped. Root cause is known and is the
   same class as the wordmark bug: three's `fov` is VERTICAL, so portrait collapses the horizontal view.
   Every lever (camera distance, fov, group scale) also moves the hero, which is currently *correct* — so it
   needs a compensating hero adjustment. Don't guess at it.
3. **Mobile hero framing** — the card is anchored top-edge-to-viewport-top, but the reference leads with the
   WORDMARK band; ours shows the photo. Likely a small `SELECTED_Y_MOBILE` adjustment.
4. **Real gallery photos** from the reference (harvest recipe at the top of this doc).
5. Code-health: split the ~1500-line `useChapterScene.js`; perf/a11y (no `prefers-reduced-motion`, 34M MP4s).

**VERIFY** on prod via Browserless; `?debug` hooks `__setScroll/__exitBegin/__exitScrub/__exitEnd`,
`__heroDebug()`, `__camDebug()`. ⚠️ **Two verification rules learned the hard way this session:**
(a) **assert on-screen POSITION, not DOM presence** — "popupCards: 2" passed while the popups were scrolled
off the top for an entire release; use `getBoundingClientRect()` vs the viewport. (b) **`/tmp/bless/` is NOT
durable** — macOS wiped it mid-session, taking `playwright-core` and every probe with it. Build the harness
in the session scratchpad instead (`npm install playwright-core` there; same trick with `ffmpeg-static` for
video frames — no brew, no repo deps).

**2026-06-14 hygiene (done, pushed + deployed — `ced2dac7`, `011aa323`).** Untracked
`node_modules` (18,630 files) + `.output` (33) — both were committed despite `.gitignore` (.git was
~120M). Removed the dead `virtualscroll` from `nuxt.config.ts` optimizeDeps + the no-op
`build.rollupOptions.external:[]`; base-prefixed the favicon href (was 404ing on the `/la-coco-vie/`
Pages subpath); gitignored `.claude/settings.local.json`. `nuxt prepare` passes.

**2026-06-14 code-health (done, pushed + deployed + prod-verified — `f2749c3a`).** Three verified
lifecycle fixes (normal running path unchanged): `destroy()` now kills the tracked intro tweens +
select/deselect timelines and traverse-disposes all GPU resources (was renderer-only → leaked every
geometry/material/texture on teardown/HMR); the render loop pauses on `document.hidden` and resumes on
visibility (GSAP keeps its own ticker so tweens still complete); `waitSettled` in `pages/[slug].vue` is
now bounded (~8s deadline → enables scroll + edge-exits) so a failed WebGL init can't freeze the page.
Browserless-verified on prod (homepage + a chapter deep-link, 0 errors). Still queued from the review:
split the now-1430-line `useChapterScene.js` god-module.

**Earlier 2026-06-14 bottom-exit attempts (all prod-verified, then rejected/superseded — full detail in the
saga below).** #6 forward ride-into-ring (`8eca9bef`, "doesn't work" — article→poster cross-fade); #7
scroll-coupled DOM CSS-shrink "drop into the deck" (`228c1baf`, "literally just shrinks" as a flat 2D rect);
#8 page snapshot on a real 3D WebGL card (`990b372a`, capture solved through 4 chained bugs). All abandoned
once the reference decode showed the page is **never morphed** — see `🔁 P2 — Bottom-edge exit — the FULL
saga` (approaches 6–8 + the decoded mechanism + the scroll-driven plan).

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
- [x] **E — Scroll exits (P2) — BOTH EDGES DONE.** **Top edge** (overscroll up → `doExit()` → `deselectChapter` reverse-rewind; also back button / nav logo / a 180px finger-pull on touch). **Bottom edge = the "cluster-unfurl" outro** — user-approved 2026-07-22 (`41812cff` + `185f9f8b`). All 8 cards present and unfurling on a MONOTONIC radius (never re-add the dip); one wine copy already in the deck, the second drops in. 9 "morph the page" approaches were tried and rejected before the reference decode — don't reintroduce them. 👉 Mechanism + tunables: the STATE banner at the top.
- [x] **D — Normalize entry spin (P2)**: select spin pinned to one consistent FORWARD turn. *(2026-06-12)* The 7s intro rests `animatedRotationY` at `+4π` and the old target `toRad(φ−90)` was a small absolute angle → the entry tweened ~2 turns BACKWARD by a chapter-dependent amount. Now: collapse the accumulated whole turns (subtract the same multiple of 2π from the lerp anchor `rotation.y` so it's invisible — rotation is 2π-periodic), then advance forward to the front angle, clamped into `[180°,540°)`. Verified (local headless CDP, all 4 chapters): forward spins of **315/360/405/450°** (eat-marry-love/la-storia/wine/amour — the 135° spread is the cards' real 45°-apart ring positions), each landing front-centre (`x:0,z:40,dist:66`); select→deselect→reselect cycle lands the ring back at rest (`animRotY 0`) with no drift; zero console errors.
- [x] **Hover targeting (P2)**: driven off the front card. *(2026-06-12)* The flat hitboxes don't follow the shader bend, so a raw raycast over the visible front card resolved to a neighbour slot and lifted the wrong card. `onMouseMove` now treats any hitbox hit as "cursor over the carousel" and lifts the front copy (`frontPoster().i`), mirroring the click fix; misses unhover. Verified (CDP): at a bug spot whose raw raycast → ch1, the lifted card is now the front ch2 (single slot, `blend:2`); off-carousel unhovers; no errors.
- [ ] **F — Robustness matrix**: deep-link / click / re-select / exit-by-scroll / exit-by-button / rapid-repeat all verified.

**Mobile / touch — DONE 2026-07-22** (`9e80bb6d` → `17da487c`). The carousel was **wheel-only**, so a phone
couldn't turn the ring at all. Every change is gated on `isMobile` (`aspectRatio < 1`) — desktop untouched.
- [x] **Touch drives the carousel** — handlers on `#canvas-hit-layer` → `scene.onScroll`, mirroring the wheel's
      `deltaY - deltaX` at ×2.5, **plus release momentum** (velocity ×0.94 decay) because it otherwise stopped
      dead on finger-lift and read as "stuck". `touch-action: none` on that layer is load-bearing — without it
      the browser claims the gesture and the ring never turns.
- [x] **Tap-vs-swipe guard** — browsers synthesise a click after a drag, so swiping also selected a card.
      >12px travel now swallows the trailing click for 400ms.
- [x] **Deliberate tap target** — `onClick` used to fall through to the front card even when the raycast
      MISSED, so a tap anywhere on screen opened a chapter. A hitbox hit is now required.
- [x] **Parked EXPLORE button** — on touch the cursor parks expanded/filled/labelled at 50%/75% and opens the
      front chapter; tinted to the card beneath via a new `onFrontChapter` scene callback → `--cursorAccent`.
      Gated on intro-complete (it used to appear mid-spin and flash a placeholder colour) **and on `isHome`**
      (it takes pointer-events, so on a chapter page it was a 140px dead zone swallowing scroll).
- [x] **Wordmark on portrait** — `fitTxtMesh()` scales the fixed 60-unit plane to the visible width (three's
      `fov` is VERTICAL, so portrait sees only ~34 units across and it was cropped both edges); it also starts
      hidden with `currentTxtChapter = -1` so it never flashes the wrong chapter; and sits in the upper third.
- [x] **Entry cadence** — portrait spin 3.8s (was 6s) with `introComplete` cued to the card settle, so the
      order is cards → wordmark → EXPLORE instead of a 1.1s dead gap.
- [x] **Portrait hero geometry** — `aspectRatio * 2.07` is really `(2·60·tan(fov/2))/24`, a fill-width value
      derived for the DESKTOP camera distance; it's now derived live (`heroFillScale()`, still 2.071 on
      desktop). `SELECTED_Y_MOBILE = 11` (vs -43) — at -43 the portrait hero sat at world -60.9…-25.1 against a
      visible band of -29…+29, i.e. almost entirely below the screen.
- [x] **Hidden ring cards** — the "push them out of frame" offset must clear the frustum at the ring's
      DEEPEST card (z=-40, d=150, band ±62), not the front (±29). Derived now; desktop keeps -30 because its
      ~106-unit hero simply occludes the deck.
- [x] **ABOUT nav label** restored on phones (`hidden md:block` left no way into About at all).
- [x] **`.chapter-page`** `height: 100dvh` → `100%` (iOS's dynamic viewport shifts under the URL bar).

**Later — content & polish**
- [ ] **Inner-page scaling vs the reference** — copy `16px/24px` Bague; headings in a striped display face
      scaled to width (ours is plain Bague); images **inset with margins** (ours are full-bleed). Measured,
      not applied.
- [ ] **Homepage card sizing on portrait** — oversized/cropped; see "What's left" for why it needs care.
- [ ] **G — Section bg** alternates dark/light accent like the reference.
- [ ] Richer parallax (ScrollTrigger/Lenis) + inline films in sections.
- [ ] Real gallery photos from the reference (ours are film stills) — harvest recipe at the top.
- [x] ~~Other 3 chapters' `CHAPTER_PAGES` content~~ — **DONE** (`ce585648`, real copy `a4224399`).

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
5. **Real live page drops in `exitChapterDrop`** (`9553e44e`, since removed): shrink the actual
   `.chapter-page` (CSS `scale 1→0.14` toward centre + late fade) while `scene.exitChapterDrop`
   reassembles the ring forward **+360°** (chapter card returns to front-centre) + **hides both chapter
   copies** during the drop (no duplicate) + fades them back over the last 0.5s. Mechanism prod-verified
   (probe: `scale 1.0→0.14`, opaque until ~1.4s → **no disappear**; reassembles; 0 errors). ❌
   **Insufficient (user, 2026-06-13):** *"the page just does a centre shrinking while the rings rotate
   separately."* This is the fundamental constraint above — a 2D shrink can't rotate *with* the 3D ring.
   (The "half of it" = the bottom article scaling from an off-centre origin.)

6. **Forward ride-into-the-ring `setExitProgress`** (`8eca9bef`): the DOM cross-fades out while the REAL
   poster card returns from off-top and rotates into the ring (faithful to `setPageProgress`). Prod-verified
   (card rides in while DOM fades, 0 errors). ❌ User: *"it simply doesn't work"* — it's an article→poster
   cross-fade, not the page becoming a card.
7. **Scroll-coupled DOM CSS-shrink "drop into the deck"** (`228c1baf`): overscroll scrubs `de`; the deck
   rises from below + spins while the DOM page shrinks (`scale 1→0.16`) toward it + hands off at the catch.
   Reversible, prod-verified both ways. ❌ User: the page *"literally just shrinks"* as a FLAT 2D rect next
   to the tilted 3D cards; and the ring should appear BEFORE the edge.
8. **Page snapshot on a real 3D card** (`990b372a`): `html-to-image` rasterises the visible page onto a
   WebGL plane that flies into the ring (fixes the 2D-flat problem). The CAPTURE took 4 chained fixes —
   Google-Fonts CORS blank (`skipFonts`); off-screen clone captures transparent (sections start `opacity:0`,
   IntersectionObserver never fires off-screen → capture LIVE); Lenis uses native `scrollTop` not transform
   (capture full content + `drawImage`-crop the slice); pixel/taint sampling to verify. Page-card
   prod-verified showing the real article + flying in. ❌ Abandoned anyway — the reference decode (below)
   showed the page is never morphed at all, so no snapshot is needed.

**⭐ THE ACTUAL REFERENCE MECHANISM (decoded from a screen-capture of `chapter.millanova.com`, 2026-06-14
— supersedes the "fundamental constraint" framing above).** The reference does NOT morph the page. The
chapter page is normal scrolling DOM; you scroll past its footer and the WHOLE page scrolls up and out.
Below it a tall **"outro" section** scrolls in and reveals the WebGL ring (positioned LOW, viewed *into*
the cylinder — front cards arc across the bottom, blank card-backs at the top). Scrolling rotates the ring
(coupled) and a card **drops in from the top** — which, since the page already scrolled out the top, reads
as the page becoming a card (**pure illusion, no morph**). Keep scrolling → the ring rises + un-tilts into
the homepage state. Fully scroll-coupled + reversible. **Every approach 1–8 failed because they tried to
morph the visible page; the reference scrolls it away instead. Top ≠ bottom, and that's fine.**

**▶ The plan + the cleanup are in the `ACTIVE WORK` banner at the top of this doc.** In short: add a tall
transparent outro section below the footer; the article scrolls out normally; map outro-scroll → `de` →
`scene.setExitProgress(de)` (REUSED — ring rises/spins/un-tilts, hero returns from off-top = the card drop);
transition the bg; navigate `/` at `de`→1. The snapshot/coupling machinery was removed 2026-06-14; the
`beginExit`/`setExitProgress`/`cancelExit`/`endExit` primitives are kept for the rebuild (`exitChapterDrop`
deleted).

**⚠️ Verification protocol (still applies):** drive exits on the **REAL scroll path** (dispatch real `wheel`
events / scroll Lenis), NOT the `__exitScrub` scene scrub (it bypasses the DOM and misled twice). For
sub-2s motion use a **screenshot-free `evaluate` probe** sampling transforms/opacity + `__camDebug`/`__heroDebug`
over time (Browserless screenshot latency can't time it); screenshots for the static look. Probe scripts
live under `/tmp/bless/*.mjs`.

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
