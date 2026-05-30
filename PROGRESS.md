# La Coco Vie — Project Progress

> **Doc map:** new here? Start with [`README.md`](README.md). How it works →
> [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md) · assets/re-skin →
> [`docs/CONTENT-AND-ASSETS.md`](docs/CONTENT-AND-ASSETS.md) · plan →
> [`docs/ROADMAP.md`](docs/ROADMAP.md) · issue forensics → [`AUDIT.md`](AUDIT.md).
> **This file is the living status log** (what works, resolved/open issues, dev workflow, sessions).

> Last updated: 2026-05-29

---

## 🎯 What We're Building

A **pixel-perfect replica** of [chapter.millanova.com](https://chapter.millanova.com/) — a luxurious, WebGL-driven bridal fashion experience by Milla Nova.

The original site is a showpiece of interactive 3D web design: a spinning carousel of poster cards built in Three.js, rich GLSL shaders, GSAP animations, spatial audio, and cinematic chapter transitions. Our goal is to match it as closely as possible — visually, technically, and in feel.

**Repo:** https://github.com/TobitOdili/la-coco-vie  
**Local path:** `/data/.openclaw/workspace/millanova-replica/`  
**Dev server:** `node_modules/.bin/nuxt dev --host 0.0.0.0 --port 3002`

---

## 🛠 Tech Stack

| Layer | Technology |
|---|---|
| Framework | Nuxt 3 (SSR disabled — SPA mode) |
| UI | Vue 3, TailwindCSS v4 |
| 3D / WebGL | Three.js with custom GLSL vertex + fragment shaders |
| Animation | GSAP (timelines, ScrollTrigger) |
| Audio | Howler.js (per-chapter ambient loops, carousel tick SFX) |
| Scroll | VirtualScroll (`touchMultiplier: 25`) |
| Fonts | Bague (woff), Movie (woff), Italiana, Monoton, Over the Rainbow |
| Screenshots | Playwright via Browserless (cloud WebGL browser) |
| Tunnel | Cloudflare tunnel → Browserless can reach local dev server |

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
baseDistance = 42   // ring radius at rest
introDistance = 75  // start distance for fly-in intro
```

### Group tilt (the dramatic diagonal cluster look)
```js
groupG.rotation.order = 'YXZ'
groupG.rotation.set(toRad(25), toRad(-70), toRad(15))
// Negative Y intentionally pushes the cluster left
```

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

- Custom cursor (lerped, 24px → 140px "EXPLORE", cubic-bezier(`.68,-.6,.32,1.6`))
- Film grain noise overlay (animated)
- Scroll-driven carousel rotation (VirtualScroll)
- Hover: video plays, card flattens (`blendFactor → 2`), card lifts `y+7`
- Audio: chapter tracks fade in on hover, louder on select, fade out on unhover
- Click: carousel rotates chapter to front, body colour changes, card fills screen (hit layer now `pointer-events:auto` — selection was silently broken)
- Back button **and scroll-back** both exit a chapter (reverse animation)
- About panel toggle (blurs canvas)
- Sound On/Off toggle
- Loading screen — **real asset-gated** counter (gates on 13 textures), GSAP-eased number, GSAP fade exit, light-gray centered styling matching the original
- Center txt (`txtMesh`) follows the front-facing card and swaps on hover (crossfade)
- Hover affects only the single card under the cursor (not its mirrored ring copy)
- Horizontal trackpad scroll rotates the carousel
- Film-grain noise overlay rendering correctly (absolute-resolved asset URL)
- Far-side ring cards fade to faint ghosts (depth-based opacity falloff)
- Per-chapter CSS body classes for background colour transitions
- Real `/{slug}` chapter routes — card-select animates into the page; deep-links, browser back/forward, and per-slug prerender all work (Phase 2 skeleton)
- Wine O'Clock inner page — data-driven sub-chapters (THE BRIDE / THE WINE / THE PEOPLE) with copy, galleries, dress-tail cards, and scroll reveal (Phase 2 content slice)

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

**[#7] Scroll-driven chapter-exit transition** ✅ Fixed (`bcc9b342`, verified live)
- Only the back button exited a chapter; scrolling back should too.
- Fix in `useChapterScene.js`: while selected, `onScroll` accumulates upward scroll (`delta<0`); past `SCROLL_EXIT_THRESHOLD` (500) it runs the existing `deselectChapter()` + fires `onDeselect`. `isSelecting`/`isDeselecting` flags prevent re-trigger during in/out animations. `WebGLScene` relays `onDeselect` → `chapter-deselect` → `app.vue` `resetChapterState()` (shared with `goHome`).

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
| v24 (current) | ~9/10 | + scroll-back exit (#7); fixed broken chapter selection (#15, pointer-events) |
| Target | 9.5-10/10 | Ring viewing-angle (#4, parked — needs original's exact tilt), then inner pages / dress cards |

---

## 🗓 Session Log

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
