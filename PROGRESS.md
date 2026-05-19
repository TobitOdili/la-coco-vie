# La Coco Vie — Project Progress

> Last updated: 2026-05-19

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

### 🔴 High Priority (to reach 9/10 similarity)

**1. Stack overlap / nesting**
- Card rotation angles create slightly wrong depth order
- The secondary cards behind Wine O'Clock don't nest as convincingly as the original
- `toRad(-90 - intRotationY)` — needs closer comparison against original

**2. Card scale slightly too large**
- Wine O'Clock appears ~10% too close/large vs original
- Candidates: increase `baseDistance` from 42 → 44, or push camera back to `z = 105`

**3. SVG colour saturation**
- Poster SVGs render ~15% more saturated than the original
- Possibly needs `renderer.toneMapping = THREE.NoToneMapping`
- Original uses `THREE.SRGBColorSpace` output but no tone mapping

### 🟡 Medium Priority

**4. Background card visibility**
- Cards at the far side of the ring are too visible in our replica
- Original barely shows them — need opacity falloff based on world Z position

**5. Scroll-driven chapter-exit transition**
- When on a chapter page, scrolling back should trigger the reverse animation (`setPageProgress`)
- Currently only the back button works; scroll-back is not implemented

### 🟢 Lower Priority (future phases)

**6. Chapter inner pages**
- La Storia, Wine O'Clock, Eat Marry Love, Amour Getaway each have full inner pages
- These use ScrollTrigger reveals, Mask component, Gallery parallax, ImgText, Header, DressTail
- Placeholder components exist in the original: `Wrapper.vue`, `Placeholder.vue`, `Trigger.vue`, `Gallery.vue`

**7. Dress tail cards** (bottom bar)
- Shows matched dresses per chapter on select
- Data: 11 dresses (`symphony`, `tasmania`, `sydney`, `markita`, etc.)
- Each chapter triggers specific dress IDs via a `Trigger` component

---

## 🐛 Bugs Fixed

| Bug | Fix |
|---|---|
| Camera parallax accumulated unboundedly → "Maximum call stack size exceeded" | Clamp displacement to ±5 units |
| `.nuxt/` build artifacts committed to git | Removed from tracking with `git rm --cached .nuxt/` |

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

### 2026-05-18 → 2026-05-19
- Reverse-engineered the full Milla Nova Chapter homepage from source
- Identified Three.js + GSAP + GLSL shader architecture
- Built from scratch: carousel geometry, cylindrical shader, intro fly-in, hover/select interactions
- Integrated Howler.js audio, VirtualScroll scroll handler, custom cursor
- Set up Browserless + Cloudflare tunnel for pixel comparison workflow
- Iterated through 12 comparison versions, reaching 7.8/10 similarity
- Published to GitHub: https://github.com/TobitOdili/la-coco-vie
- Established this living PROGRESS.md document for ongoing tracking
