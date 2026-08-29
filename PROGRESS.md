# La Coco Vie — Project Progress

> **▶▶ PIVOT (2026-07-23):** the project is no longer a Milla Nova replica — it is now the
> **Covenant &amp; Uvie wedding site** ("A Love Story in Chapters"). The four cards became the journey
> **US → THE BIG DAY → IN FRAMES → WITH LOVE**, each a bespoke inner page unified by the *thread*
> motif; the homepage carries the couple's names/date/countdown, welcome note, and RSVP. The Three.js
> **engine is unchanged** — this was the planned content-and-skin swap. Entries below that predate
> this and say "replica"/wine-o-clock/etc. describe the engine's history. Current state + full recent
> change log live in [`docs/PHASE-2-INNER-PAGES.md`](docs/PHASE-2-INNER-PAGES.md) (the source of truth).
> ALL copy/dates/venues/registry are PLACEHOLDERS pending the couple's details.

> **Doc map:** new here? Start with [`README.md`](README.md). How it works →
> [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md) · assets/re-skin →
> [`docs/CONTENT-AND-ASSETS.md`](docs/CONTENT-AND-ASSETS.md) · plan →
> [`docs/ROADMAP.md`](docs/ROADMAP.md) · issue forensics → [`AUDIT.md`](AUDIT.md).
> **This file is the living status log** (what works, resolved/open issues, dev workflow, sessions).

> Last updated: **2026-08-11**. All four inner pages are bespoke and live; the couple's own card
> films and In Frames reel photos are in; asset URLs are base-path correct on both hosts.
> **In Frames and With Love were both rebuilt from scratch this cycle** — see the tracker.
>
> ⚠️ **Verification is uneven — see the VERIFICATION STATUS table in [`docs/PHASE-2-INNER-PAGES.md`](docs/PHASE-2-INNER-PAGES.md) before trusting any "done" here.** Everything shipped in
> August was prod-probed via Browserless (structure, geometry, timing, network) — but **Browserless
> cannot decode H.264 and Claude-in-Chrome was not connected**, so *how the card films look* is
> unverified by tooling. The chapter inner pages were last confirmed on a real phone in July
> ("workable for now"); the two August rebuilds have **not** been device-checked.

---

## 🎯 What We're Building

**Covenant &amp; Uvie's wedding site** — "A Love Story in Chapters": a spinning 3D carousel of four
poster cards, each opening into its own bespoke scroll page (US · THE BIG DAY · IN FRAMES · WITH LOVE).

> ⚠️ This section used to read *"a pixel-perfect replica of chapter.millanova.com"*. That was the
> **engine's origin, not the goal** — the replica was built as a technical study and re-skinned into
> the wedding site on 2026-07-23. Fidelity to the reference is no longer a success criterion; the
> couple's story is. Reference-fidelity notes in older entries below should be read in that light.

**Repo:** https://github.com/TobitOdili/la-coco-vie  
**Local path:** `/Users/tobitodili/Documents/GitHub/la-coco-vie` (macOS)  
**Dev server:** `npm run dev` → http://localhost:3001  · **Live:** https://la-coco-vie.vercel.app/ (auto-deploys `main`)

---

## 🛠 Tech Stack

| Layer | Technology |
|---|---|
| Framework | Nuxt 3 (SSR disabled — SPA mode) |
| UI | Vue 3, TailwindCSS v4 |
| 3D / WebGL | Three.js with custom GLSL vertex + fragment shaders |
| Animation | GSAP (timelines, eased tweens) |
| Audio | Howler.js (per-chapter ambient loops, carousel tick SFX) |
| Scroll | **Lenis** (inner pages) · homepage carousel = window wheel listener (`virtualscroll` dep is dead) |
| Fonts | Bague (woff), Movie (woff), Italiana, Monoton, Over the Rainbow |
| QA | Browserless (headless geometry/probes, vs the original) + Claude-in-Chrome (real browser: video/textures) |

---

## 📁 Key Files

| File | Purpose |
|---|---|
| `composables/useChapterScene.js` | Entire 3D scene: carousel geometry, shaders, animations, interactions |
| `components/WebGLScene.vue` | Three.js canvas mount + event wiring |
| `components/CustomCursor.vue` | Lerped cursor — 24px at rest → 140px "EXPLORE" on hover |
| `components/SiteNav.vue` | Top nav (About, logo, Collection, sound toggle) |
| `components/AboutPanel.vue` | About overlay |
| `components/LoadingScreen.vue` | Intro loading screen with progress bar |
| `app.vue` | Root — audio init, chapter select/deselect state |
| `assets/css/main.css` | Fonts, noise overlay, cursor CSS |
| `nuxt.config.ts` | SSR off, Tailwind Vite plugin, head config |

---

## 🗂 Assets

All in `/public/`:

```
/images/p1-p4.svg           — poster artwork SVGs (chapter illustrations)
/images/poster-1-4.jpg      — photo textures (blended on hover/select)
/images/logo.png            — Milla Nova logo (rendered in shader as overlay)
/images/txt-1-4.png         — floating chapter title textures (in-scene)
/images/noise.png           — film grain overlay texture
/audio/tick.mp3             — carousel tick sound
/audio/eat-merry-love.mp3   — chapter 1 ambient loop
/audio/la-storia.mp3        — chapter 2 ambient loop
/audio/amour-getway.mp3     — chapter 3 (note: typo matches original filename)
/audio/wine-time.mp3        — chapter 4 ambient loop
/video/eat-intro.mp4        — chapter 1 video (plays on hover/select)
/video/la-intro.mp4         — chapter 2
/video/wine-intro.mp4       — chapter 3
/video/amour-intro.mp4      — chapter 4
/fonts/Bague.woff
/fonts/Movie.woff
```

---

## 🎡 3D Scene — How It Works

The carousel is `N=8` poster slots (4 chapters × 2, mirrored around a ring).

### Camera
```js
camera.position.set(0, -15, 100)
camera.fov = 45
```

### Carousel ring
```js
baseDistance = 40   // ring radius at rest (= original ve=40)
introDistance = 75  // start distance for fly-in intro
SELECTED_Y  = -43   // carousel Y when a chapter is selected
```

### Group tilt (the dramatic diagonal cluster look)
```js
// uses THREE default 'XYZ' order (matches original)
groupG.rotation.set(toRad(25), toRad(70), toRad(15))   // desktop; mobile = (22°,0,0)
```
> The exact source values + the full exit model are documented in
> [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md) (the authoritative reference; this section is a quick recap).

### Intro animation sequence (6 seconds)
1. Mouse lerps from `(-1, -1)` → `(0, 0)` — power3.inOut
2. Carousel spins 720° landing at `startRot = 90°` (Wine O'Clock front)
3. Posters fly in from `distance 75 → 42`, staggered 0.2s each

### Shaders
- **Vertex shader**: bends PlaneGeometry into a cylindrical arc; `blendFactor` controls carousel (curved) → selected (flat) transition
- **Fragment shader**: composites `posterTexture` (SVG) + `photoTexture` (video) + `logoTexture` with progress-driven UV transforms

### Key uniforms per poster
| Uniform | Meaning |
|---|---|
| `axisPosition.z` | Ring radius — animated during intro and select |
| `blendFactor` | 0 = curved carousel, 1 = flat, 2 = hover (desktop) |
| `progress` | 0 = carousel mode, 1 = selected/fullscreen |
| `borderColor` | Chapter accent color, used for logo tint |

### Chapter data
```js
slugs   = ['eat-marry-love', 'la-storia', 'wine-o-clock', 'amour-getaway']
colors  = ['#B32C05', '#304443', '#353454', '#7E3C48']   // accent
light   = ['#F3EBE4', '#D7DDDD', '#D6D5E8', '#FFE7F7']   // accentLight
lighter = ['#f0d7bf', '#a0aeae', '#b3b0db', '#f0c3e1']   // accentLighter
// Body gets CSS class: .--wine-o-clock, .--la-storia, etc.
```

---

## ✅ What's Working

**Homepage**
- Custom cursor (lerped, 24px → 140px "EXPLORE", cubic-bezier(`.68,-.6,.32,1.6`))
- Film-grain noise overlay (animated, absolute-resolved asset URL)
- Scroll rotates the carousel (window wheel listener; horizontal swipes too via `deltaY − deltaX`)
- Hover: film plays, card flattens (`blendFactor → 2`), card lifts `y+7`, center text swaps — single card only
- Audio: chapter tracks fade in on hover, louder on select, fade out on unhover
- Click selects the **front-facing** card → flattens + grows into the hero → URL `/{slug}` (scroll-then-click lands front-centre)
- Far-side ring cards fade to faint ghosts (depth falloff); per-chapter CSS body classes; About + sound toggles
- Loading screen — real asset-gated counter (13 textures), GSAP-eased, GSAP fade exit

**Phase 2 — inner pages ("card becomes the page")**
- Real `/{slug}` routes on a persistent shell; deep-links, browser back/forward, per-slug prerender; URL = source of truth
- Inner-page content (Wine: THE BRIDE / THE WINE / THE PEOPLE, copy, galleries, dress-tail cards, fade-up reveal)
- **Top exit DONE**: top overscroll-up (and back button / nav logo) → `doExit()` → `router.push('/')` → route watcher runs `deselectChapter()` (hero shrinks, ring reverse-spins back into the carousel)
- **Bottom exit BUILT scroll-driven** (M1 + M2 Chunk A, prod-verified `49df9f17`): the page is NOT morphed. A tall transparent `.chapter-outro` (250vh) below the article maps scroll → `de` → `scene.setExitProgress(de)`, reversible (`cancelExit`), committing at `de`→1 (`endExit` + navigate `/`). Two-phase (`DROP_START = 0.45`): phase A = article fully scrolls out + ring assembles into a low bowl and spins on the **accent background** (`setClearColor(exitBg, exitBgAlpha)`, wine `#353454`) with the wine card HIDDEN; phase B = the card descends from off-top + fades in ("drops from the top") + ring rises to the light homepage. `EXIT_SPIN` is negative (−300°) so there's no spin reversal into the homepage idle. Feel-tuning (M2 Chunk B) remaining. See [`docs/PHASE-2-INNER-PAGES.md`](docs/PHASE-2-INNER-PAGES.md).
- Film plays on select-complete (incl. deep-links) and pauses on every exit; rapid back/forward is interrupt-safe

---

## ⚠️ Current Issues & Remaining Work

> Full audit with root causes, reproduction steps, and fix options in [`AUDIT.md`](./AUDIT.md)
> Last full audit: 2026-05-19 | Issues #11–13 added: 2026-05-24 | #1,#2,#9,#10,#12,#13 resolved: 2026-05-27

### ✅ Resolved — high priority

**[#1] Cursor clipping / viewport overflow** ✅ (`59d6d91b`)
- Switched cursor to top/left direct positioning, set `html { overflow: visible }`, removed the conflicting `.cursor.active` margin.

**[#2] Viewport height — wrong height source** ✅ (`59d6d91b`)
- Now derives height from `#canvas-container` `getBoundingClientRect()` instead of `window.innerHeight` (avoids mobile browser-chrome error).

**[#9] Center text doesn't change on hover** ✅ (`1ec352e2`, verified live)
- The center text IS the `txtMesh` (3D texture plane), not HTML — it was hardcoded to `txt-1.png`.
- Fix: preloaded all 4 `txt-1..4.png` into `txtTextures[]`; `hoverChapter` crossfades the material `.map` to the hovered chapter's txt (0.15s out → swap → 0.25s in).
- _Refined by #14 (`e4e80d2e`): the crossfade now lives in `setTxtChapter()`, and unhover reverts to the front card's text instead of persisting the last-hovered (matches original)._

**[#10] Horizontal scroll doesn't rotate carousel** ✅ (`c9562a21`, verified live)
- Both `vsInstance.on` and the `wheel` fallback in `WebGLScene.vue` now pass `deltaY - deltaX` (was only `deltaY`), matching the original's `(de.y - de.x)`.

**[#13] Cards mirrored on hover — both copies lift** ✅ (`e05e638e`, verified live)
- `hoverChapter` filtered by `chapterIdx`, shared by both ring copies.
- Fix: `getHoveredPoster` returns slot index `i`; added `chapterIdxForSlot(i)`; `hoverChapter`/`unhoverChapter` act on the single slot poster. `chapterIdx` resolved internally for video/txt/audio, and in `onClick` so selection still animates both copies (correct).

**[#12] Loading animation broken vs reference** ✅ (`57efe8dd` + `96e0d083`, verified live)
- ⚠️ **Audit correction:** a live Browserless DOM probe proved the original is **centered light-gray `zinc-200` "0%"** (Italiana number + Over the Rainbow cursive %), NOT the bottom-left teal/red the audit first described. Progress is real asset-gated.
- Fix (full real-gating, 4 files): `useChapterScene.js` `onProgress` callback fires `reportProgress()` after each of 13 texture loads (1 logo + 4 txt + 8 posters; videos `preload='none'`, excluded); `WebGLScene.vue` relays a `progress` event + `progress:100` safety after init; `app.vue` holds a monotonic `loadProgress`; `LoadingScreen.vue` GSAP-eases the counter, GSAP fade exit, light-gray centered restyle, 12s safety timeout.
- **Follow-up bug (`96e0d083`):** the absolute `%` initially covered the number (only "%" visible). Restructured to a relative `.counter` wrapping the in-flow number with the `%` at `left:100%` so both glyphs sit side-by-side. Verified on Browserless.
- Validated with a local `nuxt build`.

### ✅ Closed after verification (no code change needed)

**[#8] Center text/logo offset right** — Browserless side-by-side (2026-05-27, captured twice) shows "MILLA NOVA" / "CHAPTER THE BRIDE" centered identically to the original; no right-shift. The cursor/viewport fix (`59d6d91b`) resolved the symptom. Closed.

**[#5] SVG colour saturation** — `renderer.toneMapping = THREE.NoToneMapping` + `outputColorSpace = SRGBColorSpace` are already set (line ~331); poster card colours read the same as the original in the side-by-side. No over-saturation observed. Closed (reopen if a closer colour sample disagrees).

### ✅ Resolved — medium / low

**[#11] Logo-to-txtMesh spacing too small** ✅ Fixed (`55e0b4b1`, verified live)
- Vertical gap between the CSS logo and the 3D `txtMesh` was too tight vs reference. Confirmed real in the 2026-05-27 side-by-side.
- Root cause: `txtMesh.position.set(0, 0, 20)` — world Y=0 projects too high given camera tilt.
- Fix: moved to `txtMesh.position.set(0, -8, 20)` (~110px lower on screen). Browserless confirms the center text now clears the logo/subtitle with a matching "+" marker gap, like the original.

**[#14] Default center text doesn't match the front-facing card** ✅ Fixed (`e4e80d2e`, rest-state verified live)
- On load the center `txtMesh` showed `txtTextures[0]` regardless of which card was at front (showed La Storia "EMBARK…" while the front card was different).
- Fix in `useChapterScene.js`:
  - `setTxtChapter(chIdx, instant)` — centralizes the crossfade (refactored out of #9's `hoverChapter`); no-ops if already showing that chapter
  - `frontChapterIdx()` — poster **nearest the camera** (robust to group tilt + carousel rotation, which a rotation-angle calc can't be)
  - animate loop keeps the center text synced to the front card when idle (`introComplete && selectedIndex===-1 && hoveredIndex===-1`); intro completion sets it instantly
- Verified via Browserless: rest text now reads the front card's copy (Amour Getaway) in the correct pink color — was mismatched before.
- ⚠️ **Behavior refinement to #9:** unhover now reverts to the **front card's** text (via the animate-loop front-tracking) instead of persisting the last-hovered chapter — this matches the original. Hover-swap logic itself is unchanged (couldn't re-screenshot hover on Browserless — curved cards' flat hitboxes are hard to target remotely; verify manually as #9 was).
- Note: which card rests at front (Amour vs the original's choice) is the parked rotation/#4 territory; #14 only ensures the text matches *our* front card.

**[#3] Noise texture 404** ✅ Fixed (`1078a8f3`, verified live)
- The grain overlay was missing — and it affected **Vercel too**, not just GH-Pages (the old note was wrong).
- Root cause: `BASE_URL` builds as `./`, so `--noise-url` was `url('./images/noise.png')`. A relative `url()` in a CSS custom property resolves relative to the **`_nuxt/` CSS bundle** that consumes it → `_nuxt/images/noise.png` → 404 → Vercel SPA rewrite serves `index.html` (`text/html`, 200) → broken `background-image`. Real PNG was always fine at `/images/noise.png`.
- Fix: in `app.vue`, resolve to an absolute URL with `new URL(path, location.href).href` before setting the var. Verified live (grain renders; var is absolute `https://…/images/noise.png`).

**[#6] Background card opacity falloff** ✅ Fixed (`26ee0406` + `52b8cf9b`, verified live)
- Far-side ring cards rendered as prominent white rectangles; the original keeps them as faint ghosts.
- Fix in `useChapterScene.js`: `uOpacity` uniform multiplied into the final fragment alpha; set each frame from the card's distance to camera (`smoothstep` 95→125, floor 0.2), gated to carousel mode and lerped to avoid pops. First pass (fade to 0) over-faded; the 0.2 floor matched the original's faint-back-card look.

**[#7] Scroll-driven chapter-exit transition** ✅ Fixed (`bcc9b342`) → ⚠️ **REMOVED/SUPERSEDED (session 12)**
- *Historical:* the scene's `onScroll` accumulated upward scroll past `SCROLL_EXIT_THRESHOLD` (500) → `deselectChapter()` + `onDeselect`.
- **Superseded:** once the inner pages got their own Lenis scroll, this scene-level exit fired on *any* mid-page up-scroll (the homepage wheel listener is global). It was **deleted** — exits now live in `pages/[slug].vue`, gated to the page top/bottom edges (`onDeselect` is no longer fired). See [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md) → Lifecycle → exit, and session 12.

**[#15] Chapter selection broken — hit layer click-transparent** ✅ Fixed (`bbedb5ec`, verified live) 🔴 *(found while verifying #7)*
- Clicking a card did nothing — selection never fired. Hover + scroll masked it.
- Root cause: `#canvas-hit-layer` (carries `@click`) inherited `pointer-events:none` from `#canvas-container`; `elementFromPoint` returned `.app-root`, so clicks fell through.
- Fix: `pointer-events:auto` on `#canvas-hit-layer` (assets/css/main.css). Verified live — clicking now selects (card fills screen), which unblocked #7.

### 🟢 Still open

**[#16] About panel gray-on-gray from homepage** 🟢 Low (found 2026-05-29)
- Opening About with no chapter selected → gray text on gray bg (invisible). After selecting a chapter it's fine.
- Cause: `AboutPanel` uses `var(--accent)`/`var(--accentLight)`, only set by the per-chapter body class; they default to `gray` on the homepage. Pre-existing (not from the `site.config` change).
- Next: confirm the original's behavior first, then either set non-gray `html` defaults or give the About overlay its own default colors. See AUDIT.md §Issue #16.

### ⏸️ Parked

**[#4] Card scale → ring viewing-angle** — ⏸️ Parked (2026-05-27)
- Reframed: not card scale. Matched-parallax capture + scroll-sweep showed the replica's ring reads **face-on/wide-bowl** vs the original's **edge-on/tight-cluster** — a viewing-angle (group-tilt) difference.
- **Live GPU-uniform extraction from the original** (hooked `uniformMatrix4fv`, forced projection re-upload via resize) confirms the major params **already match**: camera **FOV = 45°**, aspect 1.6, ring **radius = 40** (`ve=40`). Group Y-tilt ≈ `(-0.146, 0.81, 0.568)` vs our `(-0.089, 0.773, 0.628)` — off by only a few degrees.
- The AUDIT's old lever (`baseDistance 44–46` / camera `z=105`) is **wrong** — those match. Residual is a subtle tilt; the 70° Y-spin can't be isolated from the carousel rotation in a single capture, so there's no exact target to copy.
- Parked: closing it means blind tilt-nudging + updating `deselect`'s hardcoded angles + re-verifying intro/select — high-risk, low-ROI. See AUDIT.md §Issue #4.

### 🔮 Future phases (not bugs)

**Chapter inner pages** *(Phase 2 — in progress)* — 🟢 **Routing skeleton + transition + Wine O'Clock content landed.** Real `/{slug}` routes, persistent WebGL shell, card-select = transition, deep-links/back-forward, per-slug prerender; **Wine O'Clock inner page built** (data-driven sub-chapters + galleries + dress tails + scroll reveal). Remaining: richer ScrollTrigger/Lenis parallax, inline films, the other 3 chapters' content/assets, polish. Scope + status: [`docs/PHASE-2-INNER-PAGES.md`](docs/PHASE-2-INNER-PAGES.md).

**Dress tail cards** *(future)* — matched dresses per chapter on select (11 dresses: `symphony`, `tasmania`, `sydney`, `markita`, etc.).

---

## 🐛 Bugs Fixed

| Bug | Fix |
|---|---|
| Camera parallax accumulated unboundedly → "Maximum call stack size exceeded" | Clamp displacement to ±5 units |
| `.nuxt/` build artifacts committed to git | Removed from tracking with `git rm --cached .nuxt/` |
| Asset paths 404 on GitHub Pages (`/images/` at root) | Use `import.meta.env.BASE_URL` via `asset()` helper, baked in at Vite build time |
| GitHub Pages ignoring `_nuxt/` folder | Added `.nojekyll` in deploy workflow |
| Loader `%` covered the number (only "%" visible) — absolute span with no offset | Relative `.counter` + `%` at `left:100%` so both glyphs sit side-by-side (`96e0d083`) |
| Deep-link `<title>` stuck on home title — manual `document.title` clobbered by Nuxt head (once `pages/` active) | Manage title via reactive `useHead({ title })` instead |
| Re-selecting a chapter produced no card spin / "floated weirdly" | Deselect never reset `carousel.animatedRotationY` (re-select spun target→target = no-op) + no tween `overwrite` (stacking). Capture `preSelectRot`, reverse-spin to it on deselect, `overwrite:true` on all select/deselect tweens |
| Clicking a card selected the wrong chapter; hero skewed | (a) raycast hitboxes are flat but cards are shader-bent → click missed/hit neighbor → `onClick` selects `frontChapterIdx`; (b) select rotation `-(φ)` only worked for wine → `(φ-90)°`; (c) parallax froze camera off-axis → ease camera to base on select |

---

## 🔧 Dev Setup & Workflow

> **Environment note (2026-05-27):** work now happens locally at
> `/Users/tobitodili/Documents/GitHub/la-coco-vie` (macOS, Node 23). The primary
> deploy is **Vercel** (`https://la-coco-vie.vercel.app/`), auto-built from `main`
> on push. GitHub Pages (`tobitodili.github.io/la-coco-vie/`) still exists as a
> secondary target. No Cloudflare tunnel is needed for comparison anymore — we
> compare against the deployed Vercel/GH-Pages URLs directly.

### Start dev server
```bash
npm run dev   # nuxt dev on port 3001
```

### Build (local validation)
```bash
npm run build
```
> ⚠️ `node_modules` was originally installed on Linux, so rollup's native binary
> is missing on macOS. If `nuxt build` errors with
> `Cannot find module @rollup/rollup-darwin-arm64`, run once:
> `npm i -D @rollup/rollup-darwin-arm64 --no-save`. Build artifacts under
> `.output/` are git-tracked but should NOT be committed with feature work —
> stage source files explicitly.

### Screenshot & compare via Browserless (the workflow we use)
Install helpers in a scratch dir (`/tmp/bless`): `npm i playwright-core sharp`.
playwright-core is CommonJS, so import its default and destructure:
```js
import pkg from '/tmp/bless/node_modules/playwright-core/index.js'
const { chromium } = pkg
const browser = await chromium.connectOverCDP(
  'wss://production-sfo.browserless.io?token=<TOKEN>'   // token is secret — never commit
)
```
Gotchas learned:
- **WebGL intro:** wait ~12s after `goto` before the steady-state screenshot.
- **Loader/early frames:** `page.screenshot()` blocks "waiting for fonts" and
  times out during load — use raw CDP instead:
  `await client.send('Page.captureScreenshot', { format: 'jpeg', quality: 85 })`.
- **Capturing the loader:** throttle the network via
  `Network.emulateNetworkConditions` (~0.9–1.5 mbps) so the loader stays on
  screen; poll for `.loader-overlay` then grab the frame + computed styles.
- **Viewport quirk:** under `connectOverCDP`, `page.evaluate` may report
  `window.innerWidth/Height` as 800×600 while the screenshot canvas is larger —
  judge centering by computed `justifyContent/alignItems`, not by raw screenshot x.
- **Matched comparisons:** pin the mouse to dead-center (`page.mouse.move(W/2,H/2)`)
  before capturing — mouse parallax shifts the camera, and different cursor positions
  make two runs look different. Even so, the two sites may rest at different carousel
  rotations; a scroll-sweep filmstrip (`page.mouse.wheel`) helps find matched states.
- **Extracting the original's Three.js params (no source access):** the scene objects
  are in closures (unreachable from `window`), but the camera's matrices hit the GPU.
  Hook `WebGL(2)RenderingContext.prototype.uniformMatrix4fv` to capture 4×4 uniforms.
  Projection matrix (column-major) has `m[11]=-1, m[15]=0` → `fov = 2·atan(1/m[5])`,
  `aspect = m[5]/m[0]`. NOTE: Three.js caches the projection uniform, so force a
  re-upload by resizing the viewport during capture. Per-object modelView matrices
  (`m[15]=1`) reveal the group's Y-axis tilt (the Y-spin can't be isolated from the
  carousel rotation in a single frame). See `/tmp/bless/extract.mjs`.
- Stitch side-by-side / contact sheets with `sharp`.

### Commit & push
```bash
git add <specific source files>   # avoid `git add -A` — keeps .output/ artifacts out
git commit -m "your message" && git push   # Vercel auto-deploys from main
```

---

## 📊 Similarity Progress

| Version | Score | Notes |
|---|---|---|
| v1 | ~5/10 | Basic Three.js carousel, wrong angles |
| v5 | ~6.5/10 | Shaders added, intro animation |
| v8 | ~7.2/10 | Correct camera, group tilt |
| v12 | ~7.8/10 | Hover/select/audio all working |
| v17 | ~8.5/10 | Fixed cursor, viewport, hover txt swap, single-card hover, horizontal scroll, real-gated loader |
| v22 | ~9/10 | + logo-txt spacing (#11), front-card text (#14), noise texture (#3), far-card opacity falloff (#6); #5/#8 confirmed already-correct |
| v24 | ~9/10 | + scroll-back exit (#7, later removed); fixed broken chapter selection (#15, pointer-events) |
| v-phase2 (current) | ~9/10 homepage + Phase 2 core | Routing + persistent shell, Wine inner page, top exit done (reverse-spin into ring); bottom exit being rebuilt scroll-driven (page scrolls out → ring outro section) — 2026-06-14 reframe + cleanup |
| Target | 9.5-10/10 | Option-B reference match + entry-spin (D) + hover; other 3 chapters' content; then re-skin |

---

## 🗓 Session Log

### 2026-07-22 (session 18) — exit finished · all 4 chapters (real copy) · mobile/touch
16 commits, `41812cff` → `17da487c`. Three tracks closed; what's left is fidelity, not function.

**1. Bottom exit — DONE & user-approved** (`41812cff`, `185f9f8b`). User: _"I love it. I nailed it RIGHT ON."_
- The M2-ChunkA "hide the wine card, drop it in" model was **wrong** and is gone. Corrected against the
  user's own capture (`millanova frames/bottom cards cluster/`): the deck is **never hidden**. All 8 cards
  are present; ONE wine copy rides in the deck from the start and only the SECOND drops in from the top.
  (The old model hid both, dropped one and *materialised* the other — the user caught the mismatch at once.)
- Ring **radius now grows monotonically** `CLUSTER_R 18 → 40`. It used to dip (40→18→40), which the user
  described exactly: _"it shrinks first, then expands — that's weird."_ **Never reintroduce the dip.**
- Because the exit animates card x/z, every exit-out path now restores the ring (`cancelExit`,
  `deselectChapter`, and `endExit` — which is called *alone* when Back is pressed mid-scroll, so it can't
  assume `setExitProgress(1)` ran). That also fixed a pre-existing bug where Back mid-exit left the ring
  low/tilted.

**2. All four chapters built — with the reference's REAL copy** (`722ed89e`, `ce585648`, `a4224399`).
- Layout reworked to the reference: immersive full-height split, **viewport-pinned dress popups**, and a new
  `ChapterEnd` ("Discover dress from the chapter" + Wedding/Evening pills + socials + disclaimer).
- ⭐ **Correction of an earlier wrong conclusion.** A previous pass declared the reference's copy
  "permanently un-scrapeable" and shipped invented placeholder text. A real **touch tap under mobile
  emulation mounts its inner pages** — recipe in PHASE-2-INNER-PAGES. All four chapters were then harvested
  verbatim. Structure was wrong too: **la-storia and eat-marry-love have 5 sections, not 3**, and wine's
  copy had been truncated mid-thought.
- Galleries are placeholder stills pulled from each chapter's own film via a scratchpad `ffmpeg-static`
  (no brew, no repo deps). Dresses are real, scraped from the collection site (ordinary DOM, unlike the
  WebGL experience).

**3. Mobile / touch** (`9e80bb6d` → `17da487c`). The carousel was **wheel-only** — a phone couldn't turn the
ring at all. Everything is gated on `isMobile`; desktop is untouched. Full list on the PHASE-2 board.
The recurring theme: **constants that looked universal were landscape-derived**, and portrait broke on each —
`aspectRatio * 2.07` (fill-width at the *desktop* camera distance), `SELECTED_Y -43`, the -30 card-hide
offset, and the 60-unit wordmark plane. Two also turned out to be **desktop bugs**, not mobile-only: the
dress popups were `position: absolute` inside a scroll container (so they slid off the top on every
platform), and the ring cards have always been in-frame on desktop — merely occluded by the huge hero.

**⚠️ What is NOT verified (do not assume this session ended clean):**
- The **5-section** chapters (la-storia, eat-marry-love) were never rendered-checked after the copy
  rewrite — they went 3 → 5 sections in `a4224399`.
- The tap-target fix, swipe momentum, the entry cadence, and the `100dvh → 100%` iOS change were **never
  verified** — the last is only a hypothesis about iOS's dynamic viewport.
- The final ring-card clearance (`17da487c`) is **arithmetic only** — never rendered, never seen.
- **Whether the inner pages are actually fixed on a phone is an open question.** The user reported them
  broken repeatedly; real causes were found and fixed, but the end state was never confirmed on a device.
- **No desktop regression pass** since `722ed89e`. Two bugs fixed here (dress popups positioned
  `absolute` inside a scroll container; ring cards in-frame but occluded) were **not** mobile-only.

**Verification lessons (both cost a release):**
- **Assert on-screen position, not DOM presence.** "`popupCards: 2`" passed while the popups were scrolled
  off the top. Use `getBoundingClientRect()` against the viewport.
- **`/tmp/bless/` is not durable** — macOS wiped it mid-session with `playwright-core` and every probe.
  Build the harness in the session scratchpad.

### 2026-06-15 (session 17) — bottom-exit scroll-driven outro: M1 + M2 Chunk A (built, prod-verified)
- **Built the reference's scroll-driven bottom "outro"** (no page morph/snapshot). A transparent
  `.chapter-outro` section (250vh) sits below the article in `pages/[slug].vue`; its scroll position
  maps to a progress `de`, fed to `scene.setExitProgress(de)`. Reversible — scrolling back up into the
  article fires `cancelExit()`; `de`→1 at the page bottom commits → `endExit()` + `router.push('/')`.
  Reuses the `beginExit`/`setExitProgress`/`cancelExit`/`endExit` ring primitives (HEAD `49df9f17`).
- **M1 (`38e2cce2`)** — the outro section + scroll→`de`→`setExitProgress` wiring (ring reassembles
  under the scroll).
- **M2 Chunk A** — the *feel* pass, prod-verified:
  - **Two-phase exit** (`DROP_START = 0.45`, a const duplicated in both `pages/[slug].vue` and
    `composables/useChapterScene.js`): **phase A** `[0..0.45]` = the article fully scrolls out + the
    ring assembles into a low "look-into-the-cylinder" bowl and spins **with the wine card HIDDEN**
    (its slot empty); **phase B** `[0.45..1]` = the wine card descends from off-top + fades in
    ("drops from the top") + the ring rises to the homepage. (`65dac7ca`, `eebb6611`, `0c1edfee`.)
  - **Accent background** — `renderer.setClearColor(exitBg, exitBgAlpha)` in `animate()`; `exitBg`
    is set to the chapter accent on select (wine `#353454`) at `exitBgAlpha = 1`, and during the
    exit fades to transparent (light homepage) over `de` `0.7→1`. The ring spins on the accent
    through the outro. (`0c1edfee`.)
  - **No spin reversal** — `EXIT_SPIN` flipped **negative** (`toRad(-300)`) so the outro spin runs
    in the homepage down-scroll direction and flows straight into the idle (was reversing). (`0c1edfee`.)
  - **Bugfix (`49df9f17`)** — `animate()`'s idle depth-fade was lerping `uOpacity` back up and
    overriding the phase-A wine-card hide; now gated on `!isDeselecting` (the exit owns `uOpacity`
    via `setExitProgress`).
- **Handoff — mid-M2, awaiting feel-steers.** Open **M2 Chunk B** steers (4): drop speed/read, bowl
  depth, bg-fade timing, and the spin↔drop sync. Then the broader remaining work: the **other 3
  chapters'** inner content (only Wine O'Clock is built), mobile/touch for the outro, and code-health
  debt (split the ~1430-line `useChapterScene.js` god-module; perf/a11y). Canonical tracker:
  [`docs/PHASE-2-INNER-PAGES.md`](docs/PHASE-2-INNER-PAGES.md).

### 2026-06-14 (session 16) — bottom-exit reframe (page scrolls out → ring outro) + cleanup
- **Reference decode (chapter.millanova.com screen-capture) reframed the whole bottom exit.** The page
  is **never morphed into a card**. You scroll past the article footer and the **whole page scrolls up
  and out**; below it a scroll-driven "outro" section scrolls in and reveals the WebGL ring; further
  scroll rotates the ring while a card "drops in from the top" — which, because the page already scrolled
  out the top, *reads* as the page becoming a card (pure illusion, no morph). Keep scrolling → the ring
  rises into the homepage state. Scroll-coupled + reversible. Top ≠ bottom, and that's fine.
- **8 rejected approaches** (all tried to MORPH the visible page into a card): reverse-mirror; forward
  ride-into-ring; DOM CSS-shrink "drop into the deck"; an `html-to-image` page-snapshot rendered on a
  3D WebGL card; `exitChapterDrop`; and overscroll-coupling variants. None matched the reference feel.
- **New plan (scroll-driven, not yet built):** a tall transparent "outro" section below the footer; the
  article scrolls out normally; outro-scroll → `scene.setExitProgress(de)`; navigate `/` at `de`→1. Reuses
  the kept `beginExit`/`setExitProgress`/`cancelExit`/`endExit` ring-reassembly primitives.
- **Cleanup (committed `c2b8b0c5`):** ripped out the snapshot/page-card + overscroll-coupling machinery —
  `html-to-image` dependency gone; `capturePage`/`beginPageCard`/`setPageCardProgress`/`exitChapterDrop`/
  `startCouple` deleted (~290 net lines). `pages/[slug].vue` is back to **TOP-edge reverse exit only**
  (`doExit()` → `router.push('/')` → watcher runs `scene.deselectChapter()`); bottom exit temporarily
  **INERT** (top edge / back button / nav logo still go home).
- **Also done 2026-06-14** (pushed + deployed + prod-verified): repo hygiene (untracked `node_modules`/
  `.output`, removed dead `virtualscroll` config, base-prefixed favicon); code-health (full `destroy()`
  disposal, render-loop visibility gate, bounded `waitSettled`).
- Canonical live tracker updated: [`docs/PHASE-2-INNER-PAGES.md`](docs/PHASE-2-INNER-PAGES.md).

### 2026-06-12 (session 15) — Fable re-review → fix batch → prod-verified
- **Full re-review** (5-auditor multi-agent sweep, hand-verified, adversarial diff review): 2 P1s,
  ~7 P2s, ~10 doc-drift items. All code fixes shipped in `36d4384d` + `30e14d46`:
  - **P1 scroll-then-click**: homepage scrolling before clicking parked the hero off-front by the
    scrolled amount (`scrollRotationY` never compensated in the select target). Fixed; prod-verified
    EXACT (hero (0,40), total rot 0.0000).
  - **P1 unmount mid-forward-exit**: froze the scene half-exited → unmount now snaps `setExitProgress(1)`.
  - **Interrupt-safety**: both select/deselect timelines tracked & killed on interruption (stale
    onComplete clobbering); back-then-forward mid-deselect now re-selects (prod-verified); stale
    `pendingIdx` deep-link yank-back removed (route-derived resync).
  - **Restoration/fidelity**: option-B exit restores center txt; hover cleared on select (stuck
    EXPLORE cursor + lift-pop); films play on deep-link select, pause on every exit; resize
    rescales the hero; ready-gating (Lenis stopped until select settles); Firefox deltaMode;
    400ms gesture-gap; post-intro parallax clamp (background-tab camera drift).
- **Debug tooling**: probes gated behind `?debug` (initial-load URL!) + `__exitBegin/__exitScrub/
  __exitEnd`; `__gsdev()` mounts GSAP DevTools **on demand** — auto-creating it hijacked the global
  timeline (paused at recorded end → froze selects/exits under ?debug; caught by the prod suite).
- **Prod regression suite** (Browserless, per-test sessions — plan caps at 60s): T1 hero exact ✅,
  wine bottom exit ✅, film-paused-after-exit ✅, la-storia forward exit ✅, back-then-forward ✅.
  Video-plays-in-hero is headless-unverifiable (no MP4 codec: `NotSupportedError`) → real-browser item.
- **Tooling lessons**: headless fps makes the 0.06 rotation lerp tail visible for seconds (probe late);
  interleaved CDP probes look like gesture pauses to the 400ms accumulator reset (wheel continuously,
  probe after); Claude-in-Chrome background tabs suspend rAF entirely (focus the tab before driving).

### 2026-06-01 (session 14) — Wine bottom exit = top exit (option A); option B parked for reference capture
- **User insight:** the top-edge exit is the known-correct one; the custom forward bottom-exit felt
  "detached." Decision: for Wine O'Clock make the bottom exit *identical* to the top (reuse the reverse
  `deselectChapter`); experiment with the reference's forward "drop into the ring" on a different page.
- **Change:** `deselectChapter` now **snaps the hero to ring-centre (`baseY`) before the reverse-spin**,
  so it starts from the hero pose regardless of inner-page scroll (P1 coupling had moved it off-screen).
  No-op at the top (already baseY) → the correct top exit is unchanged; fixes bottom + Back-after-scroll.
  `pages/[slug].vue` branches the bottom edge by slug: `wine-o-clock → doExitReverse()` (= top), other
  chapters → `doExitForward()` (option B slot).
- **Verified on prod:** captured Wine's top vs bottom exit side-by-side — both start from the full-bleed
  hero and run the same reverse-spin into the ring. Bottom == top.
- **Option B prototyped & live (non-Wine pages):** `doExitForward` now mirrors the reference's `c()` —
  a 3s `power4.inOut` tween drives the forward +290° spin / ring-reassemble (`setExitProgress`) while the
  content slides out (`xPercent:110`, ~1s); hero snapped to ring-centre → full-bleed card shrinks in place
  as the ring spins up around it. Verified on prod (la-storia: card → shrink → spinning ring → carousel).
  Open polish: white body shows when content slides off (reference keeps chapter colour); refine timing
  from live feedback. A user screen-recording of the reference's bottom exit would still help nail it.

### 2026-06-01 (session 13) — bottom-exit visual polish (3 rounds vs prod capture)
Iterated the forward bottom-exit until it reads as the full-bleed hero shrinking in place + the ring
reassembling around it, watchable start-to-finish. Each round root-caused by capturing prod:
- **R1 "shifts sideways, then a page underneath shrinks":** the `xPercent` content slide cleared before
  the ring arrived → blank-white gap. → replaced with an **opacity crossfade** (no sideways motion).
- **R2 end flicker:** `onComplete` reset `el.style.opacity=''` → content flashed full-opacity one frame
  before navigating. → removed the reset.
- **R3 "it vanishes, then I catch only the tail":** `beginExit` started the hero's return from its
  *scrolled-off-screen* Y (hidden fly-in) + the crossfade was *lagged* (opaque until 30%). → **snap the
  hero's return start to ring-centre `baseY`** (hidden under the opaque page) and **reveal early**
  (`opacity = 1 − min(1, p.v/0.22)`).
- **Verified on prod** with a combined screenshot-free `evaluate` probe (content `style.opacity` +
  `__heroDebug` scaleX + `__camDebug` posY): content `1→0` by ~0.4 s while hero still ~2× scale, then
  `heroScaleX 2.0→1.0` + `carousel.y −25→0` fully visible → forward spin → rest carousel. Frames confirm.
- **Tooling lesson:** Browserless screenshot latency makes fixed-interval frame timing unreliable for
  sub-3 s animations — judge timing/monotonicity with the fast `evaluate` probe, screenshots for the look.

### 2026-06-01 (session 12) — edge-gated exits (fix: mid-page up-scroll exited / bottom broke)
- **User bugs:** (1) scrolling UP anywhere mid-page triggered the reverse exit; (2) reaching the
  bottom "broke." **Stepped back & root-caused both to one thing:** the `virtualscroll` package's API
  doesn't match, so `WebGLScene.vue`'s `vsInstance.on(...)` throws → `catch` installs a **window-level**
  wheel listener feeding `scene.onScroll`. On the inner page that still fired the scene's old `#7` exit,
  which accumulated *any* up-scroll (no page-position check) → `deselectChapter()` after ~500px
  (confirmed on prod: 2 up-scrolls mid-page → home). At the bottom, trackpad bounce → brief negative
  deltas → same reverse fired, colliding with the forward exit.
- **Fix:** scene `onScroll` now ignores wheel while a chapter is open (only the homepage carousel
  scrolls); removed `#7` (`scrollExitAccum`/`SCROLL_EXIT_THRESHOLD`). All exits moved to the **page
  edges** (Lenis-gated): **top** overscroll-up → reverse (`router.push('/')` → `deselectChapter`),
  **bottom** overscroll-down → forward return. Mid-page = free scroll.
- **Verified** (local headless): mid-page up = no exit (scroll 1544→1114), top-edge up = exit,
  bottom-edge down = forward exit, no console errors. Prod confirm next.
- **Tech debt noted:** `virtualscroll` dep is dead (always hits the catch) — remove the broken
  `new VS()`/`.on()` path; the window wheel listener is the real handler.

### 2026-06-01 (session 11) — step E reworked: forward "return from bottom" exit
- **User feedback:** the first step-E pass *rewound* (snapped the card to the top, played the entry
  backward). Reworked to the reference's behavior: the card shrinks back into the ring spinning
  **forward**, the ring reassembling from the bottom, content sliding away — a continuation, not a rewind.
- **Decoded the reference** (`DFxf35Yj.js`, via Browserless): the exit is a *scrubbed forward return*,
  `window.setPageProgress(de)` (their `ue`) — `animatedRotationY: X→X+290°`, `carousel.y −70→0`,
  `w.value 1→0`, `group flat→tilt`, hero `scale→1`, `blend/progress→0`, others `y→0`. Driven by the
  page's `c()`: a 3s power4.inOut tween (`onUpdate`→setPageProgress, `onComplete`→navigateHome) while
  `.chapter-container`/`.tails` slide out. Confirmed frame-by-frame by scrubbing their setPageProgress
  0→1 in Browserless (contact sheet): hero shrinks + ring reassembles from the bottom, spinning forward.
- **Recreated:** scene `beginExit()/setExitProgress(de)/endExit()` (forward lerp of all transforms,
  +290°), distinct from `deselectChapter()` (back-button reverse). Page `doExit()` runs a 2.6s
  power4.inOut tween scrubbing it + slides `.chapter-scroll` out; page stays mounted through the
  animation, then `router.push('/')`.
- **Verified** (local headless): forward rotY delta **+5.06 rad = 290°**, `carousel.y −43→0`, route
  `/wine-o-clock → /`, page unmounts, no errors. Visual/textured confirm on prod via Browserless.
- Note: the reference's per-chapter exit is finicky on a cold load (works reliably after EML→back→Wine);
  ours is deterministic since `beginExit()` snapshots live state each time.

### 2026-06-01 (session 10) — P2 step E (scroll-end exit, first pass) + running board
- **Added a running checklist board** at the top of `docs/PHASE-2-INNER-PAGES.md` (single tracker;
  A–G + P1/P2/P3 with checkboxes) so progress isn't scattered across the doc.
- **Built step E — scroll-end reverse exit (P2).** `pages/[slug].vue` now has a `wheel` listener
  that accumulates downward delta **only at the Lenis bottom** (`scroll >= limit−2`); past
  `END_EXIT_THRESHOLD` (800px) → `router.push('/')` → app.vue route watcher → `deselectChapter()`
  (the existing reverse-spin back into the ring). Upward/not-at-end wheel resets the accumulator;
  one-shot `exiting` guard. Mirror of the homepage's #7 top-exit.
  - **Verified** (local dev headless): scroll to bottom + overscroll → `/wine-o-clock` → `/`,
    `.chapter-page` unmounts, no console errors. Follow-ups: touch/mobile (wheel-only now), tune
    threshold if trackpad inertia over-triggers.

### 2026-05-30 (session 9) — P1 scroll-coupling (card scrolls away)
- **Fixed P1 — the "purple overlay."** The hero card was effectively fixed (canvas `position:fixed`,
  scene never moved the hero) while `.chapter-content` scrolled over it → a lavender seam cutting
  into the card. Now the **card is coupled to the inner-page scroll** and rises away in lockstep
  (steps B + C of the card-becomes-the-page rework).
  - `pages/[slug].vue`: wrapped content in a single `.chapter-scroll` child and added a **Lenis**
    smooth scroll (wrapper `.chapter-page`, `autoRaf`); each `'scroll'` tick → `scene.setScroll(px)`.
  - `composables/useChapterScene.js`: new `setScroll(px)`; `animate()` moves
    `selectedHero.mesh.position.y` up by `px·worldPerPx` (`worldPerPx = 2·dz·tan(fov/2)/height` at the
    card's depth) — **exact 1:1 on-screen coupling**, clamped at 1.3 viewports. `selectedHero`
    captured on select, reset on select/deselect/unmount.
  - `app.vue`: `provide('webglSceneRef', …)` so the routed page reaches the persistent scene.
  - **Verified**: local real-1.6 Chrome (`__heroDebug`) — hero world-Y `-43 → -3.2 → 21.6` exactly
    tracks `scrollTop 0 → 720 → ≥1170` per the 1:1 math; clean hero↔content boundary mid-scroll;
    no console errors. Browserless reference re-confirm: original canvas is `fixed` + card-coupled —
    our mechanic matches. ⚠️ Headless SwiftShader doesn't render card textures/video — **the
    textured look still needs a real-browser confirm.**
  - Full write-up + tuning notes: `docs/PHASE-2-INNER-PAGES.md` → P1 entry + "Step B/C complete."
  - Next: P2 **step E** (scroll-end → reverse-spin exit), then richer parallax + other chapters.

### 2026-05-29 (session 8) — card-as-page rework + careful audit
- **Iteration tooling fixed:** local fast loop = `npm run dev` (Bash bg) + Playwright **system
  Chrome** headless at real **1440×900** with WebGL. No deploy wait, no Browserless 1.33 quirk.
  ⚠️ Headless **doesn't render card textures (wordmark/video) or lazy images** — those are fine
  on real browsers; use headless for layout/geometry only. (See ARCHITECTURE → QA workflow.)
- **Hero geometry (Step A):** single front-card hero; **camera recenter on select** (fixed the
  skew — parallax had frozen the camera off-axis); **select rotation fixed for ALL chapters**
  (`targetRot=(φ-90)°`, was only correct for wine).
- **"Different card on click" FIXED:** root-caused via JS probe + reference compare — the raycast
  hitboxes are flat and don't follow the cards' shader bend, so clicking the visible card missed
  or hit a neighbor. `onClick` now selects the front-facing card (`frontChapterIdx`). Verified.
- **Careful audit + issue list** (no code changed): the remaining "purple overlay" is the
  **fixed card + scrolling content overlap** — the WebGL canvas is fixed at 0–900 and
  `.chapter-content` scrolls over it; the card must scroll away (B/C, Lenis). Full prioritized
  list + verification caveats in `docs/PHASE-2-INNER-PAGES.md` → "Careful audit + ISSUE LIST".
- **Correction:** the earlier "wordmark missing at 1.6" was a **headless artifact** — the hero
  renders correctly on real browsers (user-confirmed).
- ⚠️ Temp debug instrumentation (`__heroDebug`/`__camDebug`/`__probe`) still in `init()` — remove
  before final handoff.

### 2026-05-29 (session 7)
- **Phase 2 kickoff — routing skeleton + transition (verified live).** Introduced Nuxt `pages/`
  with `app.vue` as a **persistent shell** (scene/nav/cursor/loader never unmount → no intro
  replay). Real `/{slug}` chapter routes; **URL is the single source of truth** for selection
  (state computed from `route.params.slug`; a watcher drives `scene.selectChapter/deselect` on
  route change for back/forward + deep links; `scene.onReady` defers deep-link selection until
  the intro ends). The existing card-select animation **is** the transition (card fills →
  `[slug].vue` transparent hero shows it through → scroll reveals the scaffold body).
  `nitro.prerender` emits per-slug shells for GH-Pages. Scene API gained `selectChapter`,
  `onReady`, enriched `getState`, idempotent select guard.
  - Verified on Wine O'Clock: deep-link → intro → auto-select → scroll → back-home.
  - Fixed a deep-link `<title>` bug: first tried `immediate:true` on a `document.title` watch
    (didn't work — once `pages/` is active, Nuxt's head system clobbers manual `document.title`),
    then switched to a reactive `useHead({ title })`. Verified live (`/wine-o-clock` →
    "Wine O'Clock — Chapter Milla Nova").
  - **Downloaded + committed Wine O'Clock inner-page assets** from the reference (~2MB: 6
    gallery photos named `{slug}-{sub}-NN.jpg`, 4 video poster frames, 2 dress thumbnails) per
    the user's download+commit choice. Documented in CONTENT-AND-ASSETS (incl. dress-name TODO).
  - #7 scroll-exit to be re-done at the page level. Full status in `docs/PHASE-2-INNER-PAGES.md`.
- **Fixed the re-select transition (verified live).** Selecting a chapter a second time
  produced no card spin and "floated weirdly." Two causes: (1) deselect never reset
  `carousel.animatedRotationY`, so the second select's rotation tween ran target→target (a
  no-op); (2) no `overwrite` on tweens, so a re-select during a still-settling deselect stacked
  conflicting tweens. Fix: capture `preSelectRot` on select and **reverse-spin back to it on
  deselect** (also matches the reference's spin-back-into-the-ring), `overwrite:true` on all
  select/deselect tweens, `killTweensOf(carousel)`, and tween `animatedRotationY` directly.
  Verified via Browserless: both first and second selects animate the card into the hero.
  ⏳ Still pending: scroll-at-end-of-inner-page → reverse-spin exit (the #7 reimplementation;
  currently exit is via the nav logo / back button, which does the reverse spin).
- **Built the Wine O'Clock inner page (content vertical slice, verified live).** New
  `composables/chapterPages.js` (`CHAPTER_PAGES` + `DRESSES`); `components/chapter/`
  `ChapterSection.vue` + `DressTail.vue`; `pages/[slug].vue` renders content when present
  (else scaffold). 3 sub-chapters (THE BRIDE / THE WINE / THE PEOPLE) with copy transcribed
  from the reference, 6 gallery images, 2 dress cards (Malva/Yaroslava), IntersectionObserver
  fade-up reveal. Copy tails approximated; richer ScrollTrigger/Lenis parallax + inline films
  + other 3 chapters are the next steps. Also gitignored the stale `dist` symlink.

### 2026-05-29 (session 6)
- **Documentation pass for handoff.** Added `README.md` (front door) + `docs/` set:
  `ARCHITECTURE.md` (how it works), `CONTENT-AND-ASSETS.md` (data model + re-skin guide),
  `ROADMAP.md` (phases + attribution). Added doc-map banners to AUDIT.md/PROGRESS.md. Chose
  in-repo docs over a wiki (travels with the code). Removed the broken tracked `dist` symlink.
- **Re-skin pre-work: `site.config.js`.** Lifted all brand/chrome copy (subtitle, nav labels +
  Collection URL, credit, About paragraphs, document titles, Google font families) into one
  `SITE` object + `googleFontsHref()`. Wired into `nuxt.config.ts`, `app.vue`, `SiteNav.vue`,
  `AboutPanel.vue`. Zero behavior change — generated font URL is byte-identical; verified
  strings bundle and `nuxt build` passes. Logo wordmark left as `<svg>` in SiteNav (marked).
  Documented `useAudio.js` as dead code (left in place).

### 2026-05-27 (session 5)
- **[#12] Reworked loading animation (full real-gating)** *(verified live)* — Browserless DOM probe of the live original corrected the audit's description (it's centered light-gray `zinc-200`, not bottom-left teal/red). Wired real asset-load progress scene→app→loader (13 textures), GSAP-eased counter, GSAP fade exit, 12s safety fallback. Touched `useChapterScene.js`, `WebGLScene.vue`, `app.vue`, `LoadingScreen.vue`. Local `nuxt build` passes.
  - **Follow-up (`96e0d083`):** Browserless check caught the absolute `%` covering the number (only "%" visible). Restructured to a relative `.counter` with the number in flow and `%` at `left:100%` — both glyphs now visible side-by-side. Re-verified on Browserless (shows "0%" correctly).
  - Noted: under throttle the `%` rendered as a plain glyph (Over the Rainbow Google Font still downloading) — transient, not a layout bug.
- **Audit accuracy pass:** corrected AUDIT.md #12 (centered light-gray, not bottom-left teal/red). Flagged two likely-stale issues for re-verification before any code change: **#8** (nav/logo looked centered in Browserless) and **#5** (`renderer.toneMapping = NoToneMapping` is already set, line ~331). Noted **#3** is GitHub-Pages-specific and may not reproduce on Vercel.
- **[#11] Fixed** logo-to-txtMesh spacing (`txtMesh.position.y` 0 → -8); verified live. **[#8] & [#5] closed** after Browserless verification. **[#14] added** (default text ≠ front card).
- **[#4] investigated → parked.** Matched-parallax capture + scroll-sweep reframed it as a ring viewing-angle (tilt) difference, not card scale. Extracted the original's live params via a `uniformMatrix4fv` GPU hook: **fov 45°, radius 40 already match**; residual is a subtle tilt with no cleanly-extractable target. Not worth risky geometry surgery — parked.
- **[#7] Fixed** scroll-back chapter exit — upward scroll past a threshold runs the reverse animation (`onScroll` → `deselectChapter` + `onDeselect` callback → `app.vue` state reset). Verified live.
- **[#15] Found & fixed (🔴) while verifying #7: chapter selection was silently broken.** `#canvas-hit-layer` inherited `pointer-events:none` from `#canvas-container`, so card clicks fell through to `.app-root` and `@click` never fired. Set `pointer-events:auto`. Verified live (clicking now selects). Hover/scroll had masked it. ⚠️ **Browserless lesson:** card hitboxes are flat `BoxGeometry` at mesh center while the visible card is shader-curved — to click/select reliably in Browserless, hunt for a hitbox by sweeping the mouse and checking `.cursor.active`, rather than aiming at the visible card.
- **[#6] Fixed** far-side cards too visible. Added a `uOpacity` uniform driven by per-card distance to camera (smoothstep 95→125, floor 0.2), gated to carousel mode + lerped. First pass faded fully (over-faded vs original); the 0.2 floor matched the original's faint-ghost back cards. Verified live; also confirmed #14 center text unaffected.
- **[#3] Fixed** missing noise/grain texture (affected Vercel too). Relative `--noise-url` (`./images/noise.png`, from `BASE_URL='./'`) resolved vs the `_nuxt/` CSS bundle → 404 → SPA `text/html` fallback. Now resolved to an absolute URL via `new URL(path, location.href)`. Grain verified rendering live.
- **[#14] Fixed** default center text not matching the front card. `frontChapterIdx()` (nearest poster to camera) + `setTxtChapter()` driven from the animate loop; intro completion sets it instantly. Rest-state verified live (text matches front Amour card, pink). Refines #9: unhover now reverts to the front card's text. Hover-swap logic unchanged (Browserless can't reliably hit the curved cards' flat hitboxes to re-screenshot — confirm hover manually).
- **[#13] Fixed mirrored hover** *(verified live)* — hover is now keyed by slot index `i` instead of `chapterIdx`. Changes in `composables/useChapterScene.js`:
  - `getHoveredPoster` returns the raycast-hit slot `i` (not `chapterIdx`); added `chapterIdxForSlot(i)` helper
  - `onMouseMove` tracks the slot in `hoveredIndex`; resolves chapterIdx for the audio/cursor callback so app.vue still gets 0–3
  - `hoverChapter(slotI)` / `unhoverChapter(slotI)` now act on the single hovered poster (`posters.find(p => p.i === slotI)`); resolve chIdx internally for video + txt swap
  - `onClick` resolves chapterIdx from slot before `selectChapter`, so clicking still selects the whole chapter (both copies animate) — unchanged
  - Verified `node --check` passes; preserves #9 txt swap, audio, selection, video play/pause
- **[#9] Fixed center text not changing on hover** *(verified live)* — diagnosed via Browserless side-by-side: the center "EMBARK ON A FEAST..." text is the `txtMesh` (3D texture plane), not an HTML overlay. It was hardcoded to `txt-1.png` and never updated.
- Changes in `composables/useChapterScene.js`:
  - Added `txtTextures = []` to scene state
  - Replaced single `loadTexture('txt-1.png')` with `Promise.all(CHAPTERS.map(ch => loadTexture(ch.txt)))` — preloads all 4 chapter txt textures during init
  - In `hoverChapter(chIdx)`: added GSAP crossfade — opacity to 0 (0.15s) → swap `txtMat.map` → opacity to 1 (0.25s). Guarded against repeat swaps when same texture is already showing.
  - Left `unhoverChapter` alone so the last-hovered chapter's text persists (matches original behavior)

### 2026-05-24 (session 4)
- **[#10] Fixed horizontal scroll** — changed both `vsInstance.on` and `wheel` fallback in `WebGLScene.vue` to pass `event.deltaY - event.deltaX` (was only passing `deltaY`). Matches original's `(de.y - de.x)` formula. Horizontal trackpad swipes now rotate the carousel.
- AUDIT.md and PROGRESS.md status updated: #1, #2 marked ✅ Fixed (were done in `59d6d91b` but table was stale); #10 marked ✅ Fixed

### 2026-05-24 (session 3)
- User confirmed progress from last session worked
- 3 new issues reported and documented (see AUDIT.md #11–13):
  - **#11** Logo-to-txtMesh spacing too small — root cause: `txtMesh` world Y=0 projects too high; fix: nudge Y to ~-8
  - **#12** Loading animation broken — fake 1s rAF timer, wrong layout, no GSAP; fix: real asset gating + GSAP counter + wipe exit
  - **#13** Cards mirrored on hover — both front and back copies lift; root cause: `hoverChapter` filters by `chapterIdx` (shared by both copies); fix: switch hover key to slot index `i`
- Source code inspected for all 3: `LoadingScreen.vue`, `useChapterScene.js` (hoverChapter, createPoster, txtMesh position)
- All fix options documented with code snippets in AUDIT.md
- PROGRESS.md issue list restructured with numbered IDs for cross-referencing

### 2026-05-19 (session 2)
- User reported 3 new issues: center text offset, text not changing on hover, horizontal scroll broken
- Full JS bundle analysis confirmed root causes for all 3 (see AUDIT.md issues #8–10)
- Horizontal scroll: 1-line fix identified (`deltaY - deltaX`)
- Hover text: missing `ae()` system — needs new component + GSAP wiring
- Center text offset: `.container` width causing false centering
- Cursor/viewport fixes confirmed working on both Vercel and GitHub Pages
- AUDIT.md and PROGRESS.md updated with all new findings

### 2026-05-18 → 2026-05-19
- Reverse-engineered the full Milla Nova Chapter homepage from source
- Identified Three.js + GSAP + GLSL shader architecture
- Built from scratch: carousel geometry, cylindrical shader, intro fly-in, hover/select interactions
- Integrated Howler.js audio, VirtualScroll scroll handler, custom cursor
- Set up Browserless + Cloudflare tunnel for pixel comparison workflow
- Iterated through 12 comparison versions, reaching 7.8/10 similarity
- Published to GitHub: https://github.com/TobitOdili/la-coco-vie
- Set up GitHub Actions deploy → GitHub Pages (https://tobitodili.github.io/la-coco-vie/)
- Fixed asset path 404s on GitHub Pages using `import.meta.env.BASE_URL` baked at Vite build time
- Full homepage audit conducted (2026-05-19): Browserless DOM metrics + original JS bundle analysis
- Identified cursor clipping root causes (3 bugs), viewport height mismatch, noise 404, and more — see AUDIT.md
- Next: fix cursor clipping (Issues #1 → top/left positioning + html overflow fix)
