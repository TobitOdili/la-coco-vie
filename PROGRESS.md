# La Coco Vie — Project Progress

> Last updated: 2026-05-24

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
- Click: carousel rotates chapter to front, body colour changes, card fills screen
- Back button: reverses all animations cleanly
- About panel toggle (blurs canvas)
- Sound On/Off toggle
- Loading screen with progress bar
- Per-chapter CSS body classes for background colour transitions

---

## ⚠️ Current Issues & Remaining Work

> Full audit with root causes, reproduction steps, and fix options in [`AUDIT.md`](./AUDIT.md)
> Last full audit: 2026-05-19 | Issues #11–13 added: 2026-05-24

### 🔴 High Priority

**[#13] Cards mirrored on hover — both copies lift** *(new — 2026-05-24)*
- Hovering a front card also raises the mirrored copy directly behind it (opposite side of ring)
- Root cause: `hoverChapter(chIdx)` filters by `chapterIdx`, which is shared by both the front and back copy (posters 1–4 and 5–8 map to the same chapters). Should filter by poster slot `i` instead.
- Fix: Change `getHoveredPoster` to return `data.i` (slot index); update `hoverChapter`/`unhoverChapter` to filter `p.i === slotI`; resolve `chapterIdx` from slot for audio/callbacks
- See AUDIT.md Issue #13 for full code patch

**[#12] Loading animation broken vs reference** *(new — 2026-05-24)*
- Ours: bottom-center counter, linear rAF timing, CSS opacity fade, fake 1s timer
- Original: bottom-left counter, two separate typefaces (Italiana for number, "Over the Rainbow" for %), GSAP ease, real asset-gated progress, GSAP wipe exit
- Root cause: `LoadingScreen.vue` uses `requestAnimationFrame` over a fixed 1s — no connection to actual asset load events in `useChapterScene.init()`
- Fix: Wire real progress from scene init load callbacks; drive counter with GSAP; add GSAP vertical-wipe exit
- See AUDIT.md Issue #12 for comparison table + all fix options

**[#8] Center text/logo offset to the right**
- Logo + "Chapter the bride" subtitle appear right-shifted
- Root cause: `.container` class is `91.67%` wide; `justify-center` centres within that inset, not the true viewport midpoint
- Fix: Use `w-full flex justify-center` directly (no container class) on the logo row

**[#9] Center text doesn't change on card hover** ✅ Fixed (2026-05-27)
- The center text IS rendered — it's the `txtMesh` (3D texture plane with `txt-1.png`) in `useChapterScene.js`. It was hardcoded to `txt-1.png` and never swapped on hover.
- Browserless inspection confirmed: hovering different cards always showed the same `txt-1.png` content
- Fix: Preloaded all 4 `txt-1..4.png` textures into a `txtTextures` array during init; `hoverChapter(chIdx)` now crossfades the material's `.map` to `txtTextures[chIdx]` (0.15s fade-out → swap → 0.25s fade-in). Last-hovered text persists after unhover (matches original).

**[#10] Horizontal scroll doesn't rotate carousel** ✅ Fixed (2026-05-24)
- Vertical scroll works perfectly; horizontal trackpad swipe does nothing
- Root cause: We pass only `event.deltaY`. Original uses `(de.y - de.x) / 2e4` — subtracts deltaX
- Fix: Changed both `vsInstance.on` and the `wheel` fallback in `WebGLScene.vue` to pass `deltaY - deltaX`

**[#1] Cursor clipping / viewport overflow**
- Cursor clips at bottom edge, overshoots at top
- Root cause (3 bugs): transform-based positioning vs original's top/left; html overflow:hidden; conflicting margin on `.cursor.active`
- Fix: Switch to top/left direct positioning; set html overflow to visible; remove margin conflict

**[#2] Viewport height — wrong height source**
- We use `window.innerHeight`; original uses `canvasContainer.getBoundingClientRect().height`
- Affects mouse precision on mobile/browsers where innerHeight includes browser chrome

### 🟡 Medium Priority

**[#11] Logo-to-txtMesh spacing too small** *(new — 2026-05-24)*
- The vertical gap between the CSS logo and the 3D `txtMesh` (`txt-1.png`) is too tight vs reference
- Root cause: `txtMesh.position.set(0, 0, 20)` — world Y=0 projects too high on screen given camera tilt. Original likely sets negative Y to push text lower.
- Fix: Try `txtMesh.position.set(0, -8, 20)` and iterate via Browserless side-by-side screenshots
- See AUDIT.md Issue #11 for full options

**[#3] Noise texture 404 on GitHub Pages**
- `_nuxt/images/noise.png` resolves to wrong path inside compiled CSS bundle
- Fix: Move to `assets/images/noise.png`; import via `url('~/assets/images/noise.png')`

**[#4] Card scale slightly too large**
- Wine O'Clock ~10% too close/large vs original
- Fix: Try `baseDistance = 44–46` or push camera to `z = 105`

**[#5] SVG colour saturation**
- Poster SVGs ~15% more saturated than original
- Fix: Add `renderer.toneMapping = THREE.NoToneMapping`

### 🟢 Lower Priority (future phases)

**[#6] Background card opacity falloff**
- Far-side ring cards too visible; original barely shows them
- Fix: Opacity falloff based on world Z position

**[#7] Scroll-driven chapter-exit transition**
- Only back button works; scrolling back should trigger reverse animation
- Fix: Implement `setPageProgress` driven by scroll delta when `selectedChapter !== null`

**Chapter inner pages** *(future)*
- La Storia, Wine O'Clock, Eat Marry Love, Amour Getaway each have full inner pages
- Uses ScrollTrigger, Mask, Gallery parallax, ImgText, Header, DressTail

**Dress tail cards** *(future)*
- Shows matched dresses per chapter on select
- Data: 11 dresses (`symphony`, `tasmania`, `sydney`, `markita`, etc.)

---

## 🐛 Bugs Fixed

| Bug | Fix |
|---|---|
| Camera parallax accumulated unboundedly → "Maximum call stack size exceeded" | Clamp displacement to ±5 units |
| `.nuxt/` build artifacts committed to git | Removed from tracking with `git rm --cached .nuxt/` |
| Asset paths 404 on GitHub Pages (`/images/` at root) | Use `import.meta.env.BASE_URL` via `asset()` helper, baked in at Vite build time |
| GitHub Pages ignoring `_nuxt/` folder | Added `.nojekyll` in deploy workflow |

---

## 🔧 Dev Setup & Workflow

### Start dev server
```bash
cd /data/.openclaw/workspace/millanova-replica
node_modules/.bin/nuxt dev --host 0.0.0.0 --port 3002 > /tmp/nuxt-dev.log 2>&1 &
```

### Start Cloudflare tunnel (so Browserless can reach localhost)
```bash
/tmp/cloudflared tunnel --url http://localhost:3002 --no-autoupdate > /tmp/cloudflared.log 2>&1 &
sleep 6 && grep -o 'https://[a-z0-9-]*\.trycloudflare\.com' /tmp/cloudflared.log
```

### Screenshot & compare via Browserless
```js
const { chromium } = require('/data/.openclaw/npm/node_modules/playwright-core');
const sharp = require('/usr/local/lib/node_modules/openclaw/node_modules/sharp');
// Connect:
const browser = await chromium.connectOverCDP(
  'wss://production-sfo.browserless.io?token=2UXcw0tWMcqAHH7310b17b71b4d61cda2ce4c9aaee3f60ed3'
);
// Wait 10s after page load for WebGL intro animation to complete
// Stitch side-by-side with sharp → save as comparison-vN.jpg
```

### Commit & push
```bash
cd /data/.openclaw/workspace/millanova-replica
git add -A && git commit -m "your message" && git push
```

---

## 📊 Similarity Progress

| Version | Score | Notes |
|---|---|---|
| v1 | ~5/10 | Basic Three.js carousel, wrong angles |
| v5 | ~6.5/10 | Shaders added, intro animation |
| v8 | ~7.2/10 | Correct camera, group tilt |
| v12 (current) | ~7.8/10 | Hover/select/audio all working |
| Target | 9-10/10 | Fix scale, saturation, depth order |

---

## 🗓 Session Log

### 2026-05-27 (session 5)
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
