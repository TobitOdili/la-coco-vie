# Issue History — root causes, fixes, commits
> Started 2026-05-19 as a homepage audit (replica vs `chapter.millanova.com`); **since the
> 2026-07-23 pivot it is the project-wide bug ledger** for the wedding site. Issues #1–#16 are the
> original replica audit and are framed against the reference; **#17+ are wedding-site bugs** and
> have nothing to do with fidelity.
> Tools: Browserless (Playwright/CDP) against the live prod URL, bundle greps, DOM/computed-style probes.

> **Doc map:** this file is the **forensic issue history** — per-issue root causes, fixes,
> and commit refs (numbered #1–#35). For orientation start at [`README.md`](README.md);
> how-it-works is [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md); live status is
> [`PROGRESS.md`](PROGRESS.md). The **Priority Order table near the bottom is the quickest
> index** of every issue and its status.

---

## Method

1. **Screenshots** — Both sites captured at 1440×900 via Browserless after 12s (full intro animation)
2. **JS bundle pull** — Original's 4 JS bundles fetched and grepped for cursor, viewport, and scene logic
3. **DOM metrics** — Computed styles, element dimensions, and overflow values extracted via Playwright `evaluate()`
4. **Cursor simulation** — Mouse moved to center, bottom edge (y=870), and top edge (y=30) on both sites

---

## Issue #1 — Cursor Clipping (VIEWPORT) 🔴 HIGH

### Symptom
User reports: cursor gets clipped at the bottom of the page, and appears to go past the top.

### Root Cause — Two separate bugs

#### Bug A: Positioning method mismatch
| | Our Replica | Original |
|---|---|---|
| Cursor position method | `transform: translate(X, Y)` | `top: Ypx; left: Xpx` |
| Initial offscreen position | `top: -200px; left: -200px` | `top: -100px; left: -100px` (mouse init) |

Our cursor uses CSS `transform: translate()` starting from `top: -200px; left: -200px`. This means the actual rendered position is `top - 200 + translateY`. When the mouse is near the top of the screen (y < 200), the cursor renders **above the viewport** — the `-200px` fixed offset fights with the transform. At the bottom, the cursor is technically still within bounds, but because of the fixed top/left anchor being off-screen, edge behaviour is wrong.

**Original approach** (from `EO.update()` in bundle):
```js
this.cursorEl.style.top  = t - 12 + "px"   // lerped Y, minus half cursor size (24/2)
this.cursorEl.style.left = e - 12 + "px"   // lerped X, minus half cursor size (24/2)
```
Direct `top`/`left` positioning. No transform. No offset anchor fighting.

#### Bug B: Parent overflow clipping
| | Our Replica | Original |
|---|---|---|
| Cursor parent overflow | `hidden` | `visible` |
| `<html>` overflow | `hidden` | `visible` |

Our cursor `.cursor` element lives inside `.app-root` which has `overflow: hidden`. Even though the cursor itself is `position: fixed`, **some browsers clip fixed children to their containing block when an ancestor has `overflow: hidden` and a transform or filter applied**. The original has `html { overflow: visible }` — only `body` is `overflow: hidden`.

From our DOM metrics:
```json
"parentOverflow": "hidden",   // replica — WRONG
"htmlOverflow": "hidden"      // replica — WRONG

"parentOverflow": "visible",  // original — correct
"htmlOverflow": "visible"     // original — correct
```

#### Bug C: Active state size centering
Our `.cursor.active` CSS uses `margin: -70px 0 0 -70px` to re-center the expanded 140px cursor. But since we use `transform` for positioning, this margin stacks on top of the transform in an unpredictable way.

Original sizes the cursor-box via the element's own `top/left` positioning with no negative margins — the `setHover` method animates the element directly.

### Fix Plan
- Change cursor from `transform`-based to `top`/`left`-based positioning (match original `EO.update()`)
- Remove `top: -200px; left: -200px` initial position — use `top: -100px; left: -100px` (matches original mouse init)
- Remove `margin: -70px 0 0 -70px` from `.cursor.active` — recenter via the position calc instead
- Fix `html { overflow: hidden }` → `html { overflow: visible }` (only body should clip)
- Move cursor element out of `.app-root` or ensure no ancestor has `overflow: hidden` with transforms

---

## Issue #2 — Viewport Height (canvas/scene) 🔴 HIGH

### Symptom
Scene renderer and mouse Y coordinate use `window.innerHeight`, but on mobile and certain browsers this includes the browser chrome (address bar), causing the bottom ~60-80px to be miscalculated.

### Root Cause
**Original** uses a dedicated `canvas-container` div and derives height from its bounding rect:
```js
const o = document.getElementById("canvas-container")
const A = () => o.getBoundingClientRect().height   // actual rendered height
```

**Our replica** uses `window.innerHeight` directly:
```js
// useChapterScene.js line 308:
return { w: window.innerWidth, h: window.innerHeight }
// WebGLScene.vue line 66:
scene.onResize(window.innerWidth, window.innerHeight)
```

This also affects the mouse Y normalisation in `mousemove`:
- **Original**: `y: de.y / A() * 2 - 1` — uses container height
- **Ours**: `y: de.clientY / window.innerHeight * 2 - 1`

On desktop these are identical, but on mobile/some browsers `innerHeight` includes browser chrome.

### Fix Plan
- Add `id="canvas-container"` to the WebGL canvas wrapper div
- Use `canvasContainer.getBoundingClientRect().height` for all height calculations
- Update both `onResize()` and the `mousemove` Y normalisation

---

## Issue #3 — Noise Texture 404 🟡 MEDIUM

> ✅ **RESOLVED 2026-05-27 (`1078a8f3`).** Affected **Vercel too**, not just GitHub Pages.
> Confirmed root cause: this build's `import.meta.env.BASE_URL` is `./`, so `app.vue`
> set `--noise-url: url('./images/noise.png')`. A **relative** `url()` in a CSS custom
> property is resolved by the browser relative to the **stylesheet that consumes it**
> (the `_nuxt/` CSS bundle), not the document → `_nuxt/images/noise.png`. That path 404s
> and Vercel's SPA rewrite returns `index.html` (`content-type: text/html`, HTTP 200), so
> the overlay had HTML as its `background-image` → no grain. The real PNG was always fine
> at `/images/noise.png` (`image/png`, 792 KB).
>
> **Fix:** resolve to an absolute URL before setting the var:
> `new URL(`${base}/images/noise.png`, window.location.href).href` → yields
> `/images/noise.png` on Vercel root and `/<repo>/images/noise.png` on GH-Pages. Verified
> live: `--noise-url` is now an absolute `https://…/images/noise.png` and the grain renders.

### Symptom (original)
`https://tobitodili.github.io/la-coco-vie/_nuxt/images/noise.png` → 404  
(Note the `_nuxt/` prefix — wrong path)

### Root Cause
The CSS `var(--noise-url)` approach works, but the Vite CSS processor is inlining the `url('/images/noise.png')` reference into the compiled CSS bundle at `_nuxt/entry.xxx.css` — and resolving it relative to that bundle's location inside `_nuxt/`, producing `_nuxt/images/noise.png` which doesn't exist.

The `--noise-url` CSS variable set via JS in `onMounted()` arrives **after** the initial CSS paint — there's a flash before it kicks in, and on GitHub Pages the CSS bundle's own reference fails first.

### Fix Plan  
- Move `noise.png` to `assets/images/noise.png` (not `public/`) and import it in CSS as `url('~/assets/images/noise.png')` — Vite will hash and bundle it correctly
- Or reference it directly in a `<style>` block inside a Vue component where Vite can resolve it

---

## Issue #4 — Card Scale / Camera Distance 🟡 MEDIUM

> ⚠️ **Reframed + largely de-risked (2026-05-27).** The original symptom ("cards ~10%
> too large/close") was wrong. A matched-parallax Browserless capture + scroll-sweep
> showed the real difference is the **ring reads face-on/wide-bowl in the replica vs
> edge-on/tight-cluster in the original** — a *viewing-angle* difference, not card scale.
>
> **Live GPU-uniform extraction from the original** (hooked `uniformMatrix4fv`,
> forced a projection re-upload via resize) then confirmed the major params ALREADY MATCH:
> - **Camera FOV = 45°** — matches replica exactly
> - **Aspect 1.6**, projection standard perspective
> - **`baseDistance` (ring radius) = 40** — already matches (`ve=40`, line 243)
> - **Group Y-axis tilt** ≈ `(-0.146, 0.81, 0.568)` vs replica's computed
>   `(-0.089, 0.773, 0.628)` for `(25°,70°,15°)` XYZ — close, off by a few degrees
>   (original slightly more upright / less Z-lean).
>
> So the AUDIT's old fix (`baseDistance 44–46`, camera `z=105`) is **wrong** — those
> already match. The residual is a **subtle group-tilt difference**, and the exact target
> can't be cleanly extracted: the 70° Y-spin is entangled with the carousel rotation in a
> single-frame capture, so there's no precise angle to copy.
>
> **Status: parked.** Closing the gap means blind-nudging the tilt (~few degrees) +
> updating `deselectChapter`'s hardcoded `(25°,70°,15°)` + re-verifying intro/select each
> cycle — high-risk, low-ROI with no target value. Revisit only if the original's full
> group rotation can be recovered (e.g. multi-card modelView decomposition).
>
> _(Original symptom/notes below retained for history.)_

### Symptom
Wine O'Clock card appears ~10% too large/close vs original. Cards spread too wide.

### Original values (from bundle):
```js
O._initialPosition = new Q(0, -15, 100)  // camera z=100
// baseDistance not directly found but inferred from geometry
```

### Our values:
```js
camera.position.set(0, -15, 100)  // matches ✅
baseDistance = 40  // ring radius — CONFIRMED matches original (ve=40)
```

### Fix Plan (superseded — see note above)
- ~~Try `baseDistance = 44–46`~~ — already 40 (matches original); do not change
- ~~Or nudge camera to `z = 105`~~ — fov/projection confirmed matching

---

## Issue #5 — SVG Colour Saturation 🟡 MEDIUM

> ⚠️ **Likely already addressed (2026-05-27).** `useChapterScene.js` (line ~331)
> already sets `renderer.toneMapping = THREE.NoToneMapping` and
> `renderer.outputColorSpace = THREE.SRGBColorSpace` — i.e. the fix below is in
> place. If saturation still differs from the original, the cause is elsewhere
> (e.g. SVGs are rasterised to a 512×512 canvas then wrapped in a `CanvasTexture`;
> check that `CanvasTexture.colorSpace = SRGBColorSpace` and the canvas draw isn't
> shifting colour). **Re-verify with a Browserless side-by-side before changing code.**


### Symptom
Poster SVGs render ~15% more saturated than original.

### Root Cause
Our renderer may be applying tone mapping on top of sRGB output. Original uses:
- `renderer.outputColorSpace = THREE.SRGBColorSpace`
- `renderer.toneMapping = THREE.NoToneMapping` (inferred — no tone mapping refs found in bundle)

### Fix Plan
- Add `renderer.toneMapping = THREE.NoToneMapping` to scene setup
- Verify `renderer.outputColorSpace = THREE.SRGBColorSpace` is set

---

## Issue #6 — Background Card Opacity 🟢 LOW

> ✅ **RESOLVED 2026-05-27 (`26ee0406` + `52b8cf9b`).** Far-side cards rendered as
> prominent white rectangles; the original keeps them as faint ghosts.
> **Implemented:** added a `uOpacity` uniform multiplied into the final fragment alpha
> (both front/back-face branches). Each frame, in carousel mode only, `uOpacity` is set
> per card from its distance to the camera — `smoothstep(DEPTH_FADE_NEAR=95 →
> DEPTH_FADE_FAR=125)` with a `DEPTH_FADE_FLOOR=0.2` so far cards fade to faint (not
> gone, matching the original). Gated to `introComplete && selectedIndex===-1` (selected/
> intro cards stay opaque) and lerped (0.1) to avoid pops at intro-end and during scroll.
> First pass (full fade to 0) over-faded vs the original; the 0.2 floor matched it.
> Verified live: back cards are faint outlines like the original.

### Symptom
Cards at the far side of the ring are too visible in our replica. Original barely shows them.

### Fix Plan
- Add opacity falloff based on card's world Z position
- Cards facing away from camera should fade toward 0 opacity

---

## Issue #7 — Scroll-driven Chapter Exit 🟢 LOW

> ✅ **RESOLVED 2026-05-27 (`bcc9b342`).** Implemented as a scroll-back *trigger* (not a
> scrubbed progress). In `onScroll`, while a chapter is selected, upward scroll (`delta<0`)
> accumulates; past `SCROLL_EXIT_THRESHOLD` (500) it calls the existing `deselectChapter()`
> and fires a new `onDeselect` callback. Down-scroll resets the accumulator.
> `isSelecting`/`isDeselecting` flags gate against re-triggering during the in/out
> animations. `WebGLScene` relays `onDeselect` as a `chapter-deselect` event; `app.vue`
> `resetChapterState()` (shared with the back button's `goHome`). Verified live.
>
> ⚠️ **Discovered while verifying #7 — see Issue #15 (chapter selection was broken).**
> Scroll-exit is unreachable if you can't enter a chapter; #15's fix was the prerequisite.

### Symptom
Scrolling back while on a chapter page should trigger the reverse animation. Currently only the back button works.

### Original approach (from bundle):
```js
// setPageProgress referenced in scroll handler
window.setPageProgress = (v) => { ... }
```

### Fix Plan
- Implement `setPageProgress` that drives the reverse animation based on scroll delta when `selectedChapter !== null`

---

## Issue #8 — Center Text/Logo Offset to the Right 🔴 HIGH (new)

> ⚠️ **Possibly stale — re-verify first (2026-05-27).** In the Browserless
> side-by-side during the #9/#12 work, our top nav + centered logo looked
> well-aligned vs the original (no obvious right-shift). The cursor/viewport
> fixes (`59d6d91b`) may have already resolved the visual symptom. Capture a fresh
> side-by-side and confirm the offset still exists before touching `.container`.


### Symptom
The center logo + "Chapter the bride" subtitle appear offset to the right instead of being truly centered on the viewport.

### Root Cause
In `SiteNav.vue`, the center logo wrapper uses:
```html
<div class="!fixed z-20 top-3 w-full pointer-events-none">
  <div class="container flex justify-center mt-2 md:mt-6">
```
Our `.container` class in `main.css` is:
```css
.container {
  margin-left: auto;
  margin-right: auto;
  max-width: none;
  width: 91.666667%;  /* ← this is the problem */
}
```
`justify-center` centres *within the container*, not the full viewport. Since `.container` is `91.67%` wide with auto margins, the centre of the container is the centre of the viewport — BUT the left/right nav items (About, Collection) also live inside a `.container`, so everything is inset. The logo appears centred within that inset container, but visually reads as right-shifted because the left nav text is longer than the right.

The **original** places the logo in its own full-width `w-full` row and centres it absolutely:
```js
// From original bundle - YC class:
YC = { class: "container flex justify-center mt-2 md:mt-6" }
// BUT the logo is in its own separate fixed div, not sharing a row with About/Collection
```
Actually the original also uses `container justify-center` — the real difference is the original has a dedicated full-width centered row for the logo separate from the nav row, and the nav items are truly equal-width on both sides. Our nav items have different text lengths creating visual asymmetry.

### Fix Plan
- The logo container is already in its own row — check if the issue is the `container` width (91.67%) vs viewport width
- Switch logo container to use `w-full` with `flex justify-center` directly (no container class), or
- Verify the original uses the same container approach — if so, the offset may come from `.container` width mismatch vs original
- Also check: original uses `px-` padding not a width-restricted container

---

## Issue #9 — Center Text Doesn't Change on Card Hover 🔴 HIGH (new)

### Symptom
In the original, hovering over a card changes the center text/description displayed. In our replica it stays static.

### Root Cause — Missing `ae()` hover text system
The original has a dedicated hover text update function called `ae(chapterIndex, isInstant)` which is triggered from the hover detection logic:
```js
// From original bundle:
function ae(de, xe=false) {
  const Pe = xe ? 0.4 : 0.1
  // chapter 1 or 5 (wine-o-clock mirrored)
  if (de === 1 || de === 5) { ye(2); ie(l?.["wine-time"], Pe) }
  if (de === 2 || de === 6) { ye(1); ie(l?.["la-storia"], Pe) }
  // etc. per chapter
}
// Called on hover:
xe+1===1 && ae(3, true)
xe+1===2 && ae(2, true)
xe+1===3 && ae(1, true)
xe+1===4 && ae(4, true)
```
`ye(idx)` fades in the correct chapter text block, `ie(sound, vol)` fades in the chapter audio. The text shown is the chapter description (the "IMMERSE YOURSELF..." text in the About panel style).

In our replica:
- The "IMMERSE YOURSELF" text lives only inside `AboutPanel.vue` (the about overlay)
- There is **no center-screen text block** on the homepage that changes per chapter
- The `onHover` callback in `app.vue` only calls `cursorRef.activate()` and fades audio — no text update

### What's missing
- A `copyright`/center text component on the homepage (the original has `.copyright` class with chapter-specific text)
- A reactive text state driven by `hoverChapterIdx`
- The original shows chapter-specific text at the bottom-center on hover, not a generic label

### Fix Plan
- Add a `CopyrightText.vue` component (or inline in `app.vue`) showing chapter text on hover
- Wire up to the existing `onChapterHover(idx)` / `onChapterUnhover()` events
- Chapter texts: same "IMMERSE YOURSELF..." copy, or per-chapter subtitle
- Animate in/out with GSAP fade (opacity 0→1, duration 0.1–0.4s)

---

## Issue #10 — Horizontal Scroll Doesn't Rotate Carousel 🔴 HIGH (new)

### Symptom
Vertical scroll rotates the carousel correctly. Horizontal scroll (trackpad two-finger swipe left/right) doesn't work.

### Root Cause — `deltaX` ignored in scroll handler

**Original scroll handler:**
```js
Ve.on(de => {
  let xe = (de.y - de.x) / 2e4  // ← COMBINES deltaY and deltaX
  // ...
  B.scrollRotationY = f(-THREE.degToRad(xe - Ne) * 360, $, 0.001)
})
```
The original uses `(de.y - de.x)` — it **subtracts deltaX from deltaY**, so horizontal scrolling left also rotates the carousel (in the opposite direction to vertical scroll right).

**Our scroll handler (`useChapterScene.js` line 792):**
```js
function onScroll(delta) {
  scrollRotationY -= delta * 0.0008  // ← only uses deltaY passed from VirtualScroll
}
```
And in `WebGLScene.vue`:
```js
vsInstance.on((event) => scene.onScroll(event.deltaY))  // ← deltaX is dropped!
```

### Fix Plan
- Change VirtualScroll handler to pass `deltaY - deltaX` (matching original formula)
- Update `onScroll` or pass combined delta: `scene.onScroll(event.deltaY - event.deltaX)`
- Small change, big improvement for trackpad users

---

## Raw DOM Metrics Comparison

| Metric | Replica | Original |
|---|---|---|
| `html` overflow | `hidden` ❌ | `visible` ✅ |
| `body` overflow | `hidden` ✅ | `hidden` ✅ |
| `body` height | `900px` | `0px` (canvas only) |
| Canvas width/height | `1440 × 900` | `1440 × 900` ✅ |
| Canvas style | no inline style | `1440px × 900px` inline |
| Cursor position method | `transform: translate()` ❌ | `top/left px` ✅ |
| Cursor parent overflow | `hidden` ❌ | `visible` ✅ |
| 404 errors | noise.png × 2 ❌ | none ✅ |
| JS console errors | 3 ❌ | 0 ✅ |

---

## Priority Order

1. 🔴 **Cursor clipping** — fix positioning method + overflow — **(tackling this first)**
2. 🔴 **Viewport height** — use container getBoundingClientRect
3. 🟡 **Noise texture 404** — move to assets or fix CSS url resolution
4. 🟡 **Card scale** — baseDistance tweak
5. 🟡 **SVG saturation** — NoToneMapping
6. 🟢 **Background card opacity**
7. 🟢 **Scroll-driven chapter exit**

---

## Issue #11 — Logo-to-TextMesh Spacing Too Small 🟡 MEDIUM (new — 2026-05-24)

### Symptom
The vertical gap between the Milla Nova logo SVG (in `SiteNav.vue`) and the floating `txtMesh` (the `txt-1.png` chapter-title plane rendered in 3D space) is noticeably tighter in our replica vs the original. The logo and the 3D text feel cramped together.

### How to Reproduce
1. Load both sites side by side at 1440×900 (Browserless screenshot or browser devtools)
2. Look at the area just below the top nav logo — the `txt-1.png` floating title mesh sits too close underneath

### Root Cause (likely)
The `txtMesh` lives in 3D world space at `position.set(0, 0, 20)` (z-depth only, `y=0`). The logo is a CSS-fixed 2D element at `top: ~40–60px` from viewport top. At `camera.position.set(0, -15, 100)` with `fov=45`, a mesh at world `(0, 0, 20)` projects to the upper portion of the viewport (camera is looking slightly down from y=-15). The original's JS bundle confirmed `le.position.z = 20` but did **not** confirm the `x`/`y` — it's likely the original sets a meaningful negative Y to push the text lower on screen, away from the logo.

### Fix Options

**Option A — Adjust txtMesh world Y** *(recommended, surgical)*
```js
// In useChapterScene.js, change:
txtMesh.position.set(0, 0, 20)
// To something like:
txtMesh.position.set(0, -8, 20)   // push down in world space → appears lower on screen
```
Start with `-8` and iterate via Browserless comparison screenshots.

**Option B — Adjust the logo CSS top offset**
In `SiteNav.vue`, the center logo div uses `top-3` + `mt-2 md:mt-6`. Reducing `top-3` pushes the logo up, increasing the visual gap. Less surgical — doesn't fix the root; affects logo position relative to the nav.

**Option C — Scale txtMesh down**
The txtMesh is `60×60` world units. Reducing to `50×50` or `45×45` reduces apparent size and may reduce visual crowding:
```js
const txtGeo = new THREE.PlaneGeometry(50, 50)
```

### Verification Method
- Start dev server + Cloudflare tunnel
- Browserless screenshots of both sites at 1440×900, 12s after load (post-intro)
- Stitch side-by-side with `sharp`, measure pixel Y from logo bottom edge to txtMesh top edge

---

## Issue #12 — Loading Animation Broken vs Reference 🔴 HIGH (new — 2026-05-24)

> ✅ **RESOLVED 2026-05-27.** During the fix, a live Browserless DOM probe of the
> original revealed this section's original description was **inaccurate**. Corrections:
> - **Position:** NOT bottom-left. The original overlay is `flex justify-center
>   items-center pb-[5vh]` — i.e. **centered**, nudged slightly up.
> - **Colour:** NOT dark-teal number + red %. Both glyphs are **light gray**
>   (`text-zinc-200`, rgb 228,228,231) on white. Subtle/monochrome.
> - **Fonts:** Italiana (number) + Over the Rainbow cursive (%) — confirmed correct.
> - **Progress:** confirmed **real asset-gated** (stuck at 0% under heavy throttle).
> - **Exit:** could not be captured under throttle; implemented as a GSAP opacity
>   fade (easy to swap for a wipe later if desired).
>
> **Implemented:** `useChapterScene.js` reports progress after each of 13 texture
> loads (1 logo + 4 txt + 8 posters; videos use `preload='none'`, excluded) via a new
> `onProgress` callback. `WebGLScene.vue` relays it as a `progress` event (plus a
> `progress:100` safety emit after init). `app.vue` holds a monotonic `loadProgress`
> ref passed to `LoadingScreen.vue`, which GSAP-eases the counter toward it and plays a
> GSAP fade exit on reaching 100. A 12s safety timeout guarantees the loader can never
> hang. Restyled to the corrected light-gray/centered design.


### Symptom
Our loading screen behaves and looks differently from the original. Ours: white overlay, counter 0→100 at bottom-center, disappears after ~1.2s with a CSS fade. Original has a cinematic multi-element animated cover.

### How to Reproduce
1. Hard-refresh `https://chapter.millanova.com/` (Ctrl+Shift+R or incognito)
2. Observe loading animation before carousel appears
3. Compare to `https://tobitodili.github.io/la-coco-vie/`
4. Or: DevTools Network → throttle to "Slow 3G" for exaggerated slow loading

### What the Original Does (from prior JS bundle analysis)
1. **Large counter (0→100)** at **bottom-left** of screen — not centered
2. **Two separate typefaces side-by-side**: Italiana (serif, dark teal) for the number; "Over the Rainbow" (cursive, red) for the `%` — `%` is `position: absolute`, offset right of the number to create asymmetric typography
3. Counter driven by **GSAP with custom easing** — fast at start, decelerating near 100
4. **Gated on real asset loading** — counter reflects actual texture/video/audio load progress, not a fixed timer
5. **Exit: GSAP-driven vertical wipe or transform** — not a simple CSS opacity fade

### What Ours Does Wrong
| Aspect | Ours | Original |
|---|---|---|
| Counter position | bottom-center | bottom-left |
| `%` placement | inline, same `<span>` as number | `position: absolute`, offset separately |
| Easing | linear `requestAnimationFrame` over 1s | GSAP with custom ease |
| Duration | fixed 1-second timer | tied to real asset load events |
| Exit animation | CSS `transition: opacity 0.5s` | GSAP transform/wipe |
| Asset gating | none (fake progress) | real `onLoad`/`canplay` callbacks |

### Root Cause
`LoadingScreen.vue` uses a `requestAnimationFrame` loop counting from 0→100 over 1 second — no connection to actual asset loading. The `useChapterScene.js` `init()` runs async texture/video loading in parallel; the loader hides at 1.2s regardless of whether the scene is ready.

### Fix Options

**Option A — GSAP counter + real asset gating** *(recommended, closest to original)*
Emit progress events from `useChapterScene.init()` as each asset loads:
```js
// useChapterScene.js init() — count assets:
let loaded = 0
const total = N + 4  // 8 poster textures + 4 video elements
const onAssetLoad = () => { loaded++; onProgress?.(Math.round((loaded / total) * 100)) }
// Pass onAssetLoad to loadTexture() callbacks and video canplay events
```
In `LoadingScreen.vue`, receive `progress` prop and drive counter with GSAP:
```js
gsap.to(counterRef, { innerText: 100, snap: { innerText: 1 }, ease: 'power2.out', duration: totalLoadTime })
```

**Option B — Fix visual layout only** *(cosmetic-only, quicker)*
Keep fake timer but fix layout to match reference:
- Align counter to `padding-left: 5vw` (bottom-left)
- Make `%` span `position: absolute` with `left: <counter-width>px`
- Replace rAF with a GSAP tween on the counter value

**Option C — Add GSAP exit wipe**
Replace `<Transition name="fade">` exit with GSAP vertical slide:
```js
gsap.to(loaderEl.value, { yPercent: -100, duration: 0.8, ease: 'power3.inOut', onComplete: () => emit('complete') })
```
Can be combined with Option A or B.

### Verification Method
- DevTools → Network → throttle to "Slow 3G"
- Compare both sites' loaders at reduced speed
- Key things to observe: counter position, `%` layout, easing feel, exit style

---

## Issue #13 — Cards Mirrored on Hover (Both Copies Lift Together) 🔴 HIGH (new — 2026-05-24)

### Symptom
Hovering over a front-facing card (e.g. Wine O'Clock) causes **both** the front card and the mirrored copy directly behind it (opposite side of ring) to lift and go to `blendFactor=2.0`. On the original, only the card the cursor is over reacts.

### How to Reproduce
1. Load the replica, wait for intro animation to complete
2. Hover over the front card (Wine O'Clock at ~12 o'clock on the ring)
3. Observe: front card lifts ✅, but the back copy (at ~6 o'clock) also lifts ❌

### Root Cause — `chapterIdx` used as hover key instead of poster slot `i`

Carousel has `N=8` slots. Posters 1–4 and posters 5–8 share the same `chapterIdx` values:

```js
// useChapterScene.js line 410:
const chapterIdx = i > 4 ? i - 4 : i  // i=5→chapterIdx=1, i=6→2, i=7→3, i=8→4
```

So `i=3` (Wine O'Clock front) and `i=7` (Wine O'Clock back) both have `chapterIdx=3`.

The hover functions filter by `chapterIdx`, which matches BOTH copies:
```js
// hoverChapter (line 672):
const targets = posters.filter((p) => p.chapterIdx === chIdx)
// → matches BOTH i=3 AND i=7 → both get blendFactor=2, both lift y+7
```

The original tracks hover by individual poster slot index (`i`), not by chapter. The raycaster returns the specific mesh hit, and only that mesh gets the hover effect — not all copies of the same chapter.

### Fix Options

**Option A — Hover by slot index `i` instead of `chapterIdx`** *(recommended)*

Change `getHoveredPoster` to return `data.i` (slot) instead of `data.chapterIdx`; update `hoverChapter`/`unhoverChapter` to filter by `i`; look up `chapterIdx` from slot when needed for audio/callback:

```js
// getHoveredPoster — return slot i:
if (data && data.i !== undefined) return data.i

// hoveredIndex now tracks slot i, not chapterIdx
let hoveredIndex = -1

function hoverChapter(slotI) {
  const p = posters.find((p) => p.i === slotI)
  if (!p) return
  gsap.to(p.material.uniforms.blendFactor, { value: 2.0, duration: 1.0, ease: 'power2.inOut', overwrite: true })
  gsap.to(p.mesh.position, { y: p.baseY + 7, duration: 1.0, ease: 'power2.inOut', overwrite: true })
  const vid = videoElements[p.chapterIdx]
  if (vid) vid.play().catch(() => {})
}

function unhoverChapter(slotI) {
  const p = posters.find((p) => p.i === slotI)
  if (!p) return
  gsap.to(p.material.uniforms.blendFactor, { value: 0.0, duration: 1.0, ease: 'power2.inOut', overwrite: true })
  gsap.to(p.mesh.position, { y: p.baseY, duration: 1.0, ease: 'power2.inOut', overwrite: true })
  const vid = videoElements[p.chapterIdx]
  if (vid) vid.pause()
}

// onMouseMove — pass chapterIdx to callback (for audio/cursor in app.vue):
const slotI = getHoveredPoster(e.clientX, e.clientY)
if (slotI !== hoveredIndex) {
  if (hoveredIndex !== -1) {
    const prevChIdx = posters.find(p => p.i === hoveredIndex)?.chapterIdx ?? -1
    unhoverChapter(hoveredIndex)
    onHoverCallback?.(prevChIdx, false)
  }
  hoveredIndex = slotI
  if (slotI !== -1) {
    const chIdx = posters.find(p => p.i === slotI)?.chapterIdx ?? -1
    hoverChapter(slotI)
    onHoverCallback?.(chIdx, true)
  }
}
```

**Option B — Camera-facing dot product check** *(more complex, more faithful to original)*
Before applying hover, check whether the card's surface normal points toward the camera. If `dot(cardNormal, cameraDir) < 0`, the card is facing away — skip it. Works at the geometry level but requires computing world-space normals per frame.

**Option C — Z-depth filter on raycaster hits**
The raycaster's `intersects` array is sorted by distance. The front card (closer to camera) will always be `intersects[0]`. Only apply hover to the first hit — don't walk the full list. This might already be the case in `getHoveredPoster` since it returns on first hit, but the bug is in `hoverChapter` which then fans out to both copies via `chapterIdx`. Option A fixes it at the root.

### Verification Method
- After fix: open DevTools console, add `console.log('hover slot', slotI)` in `hoverChapter`
- Hover front card — should log one slot only
- Visually confirm back card stays flat
- Check that audio still triggers correctly (chapterIdx-driven, not slot-driven)

---

## Issue #14 — Default Center Text Doesn't Match Front Card 🟡 MEDIUM (new — 2026-05-27)

### Symptom
On load (no hover), the center `txtMesh` shows the wrong chapter's text relative to
the front-facing carousel card. Browserless side-by-side: both sites rest with
**Wine O'Clock** at front, but the original's center text matches it
("…WEDDING JOURNEY THROUGH THE **VINEYARDS**") while the replica shows La Storia's
text ("EMBARK ON A FEAST… **HEART OF ITALY**").

### Root Cause
Issue #9 fixed the *hover* swap (`hoverChapter` crossfades `txtMat.map` to the hovered
chapter's txt), but the **initial** texture is hardcoded:
```js
const txtMat = new THREE.MeshBasicMaterial({ map: txtTextures[0], ... }) // always txt-1
```
`txtTextures[0]` is chapter 0 (Eat, Marry, Love → `txt-1.png`), independent of which
card the intro leaves at front (Wine O'Clock, `startRot = 90°`). The original keeps the
center text in sync with the front card — i.e. it updates on carousel rotation, not only
on hover (the `ae()` system is driven by scroll/front-index too).

### Fix Plan (deferred — flagged to revisit)
- **Minimum:** after `runIntro()` settles, set `txtMat.map` to the front card's chapter
  txt (Wine O'Clock) so the default state matches.
- **Full:** drive the txt from the carousel's current front index so it updates as the
  ring rotates (overlaps with the `ae()` / scroll-driven work in #7). Resolve front index
  from `carousel.animatedRotationY` → nearest slot → `chapterIdxForSlot()`.

### ✅ Resolved (`e4e80d2e`, 2026-05-27) — Full approach
Implemented the full version, but front-index is resolved by **world-space proximity**
rather than rotation angle (the group's 70° Y-tilt makes an angle calc unreliable):
- `setTxtChapter(chIdx, instant)` centralizes the crossfade (pulled out of `hoverChapter`).
- `frontChapterIdx()` = poster whose `getWorldPosition()` is nearest `camera.position`.
- animate loop calls `setTxtChapter(frontChapterIdx())` when idle (`introComplete &&
  selectedIndex===-1 && hoveredIndex===-1`); `runIntro`'s completion sets it instantly.
- Side effect (intended): unhover now reverts to the front card's text instead of
  persisting the last-hovered (supersedes #9's persist behavior; matches original).
- Verified live (rest state): center text matches the front card in the correct colour.

---

## Issue #15 — Chapter Selection Broken (hit layer click-transparent) 🔴 HIGH (found 2026-05-27)

### Symptom
Clicking a poster did nothing — no chapter selection. Hover (cursor/text/lift) and scroll
(carousel rotation) worked, masking it. Found while trying to verify #7 on Browserless:
even clicking a confirmed hitbox (cursor went `.active`) never selected.

### Root Cause
`#canvas-hit-layer` (which carries `@click="onHitClick"` and hosts VirtualScroll) sits
inside `#canvas-container`, which has `pointer-events: none`. `pointer-events` is an
**inherited** property, so the hit layer inherited `none` and was click-transparent —
`document.elementFromPoint(720, 450)` returned `.app-root`, not the hit layer. The Vue
`@click` therefore never fired. (Hover survives via the `window` `mousemove` listener;
scroll survives via VirtualScroll's own listeners.)

### Fix (`bbedb5ec`)
Set `pointer-events: auto` on `#canvas-hit-layer` to override the inherited `none`. The
layer is `z-5`, below nav (`z-20`) / about / loader (`z-40`), so those still receive their
own clicks; only the open scene area becomes clickable (the intended behaviour). Verified
live: clicking a card now selects it (fills screen), which in turn unblocked #7.

---

## Issue #16 — About panel gray-on-gray from homepage 🟠 HIGH (found 2026-05-29, FIXED 2026-09-03)

### Symptom
Opening the About panel **from the homepage** (no chapter selected) renders the copy as
gray text on a gray background — effectively invisible. Opening About *after* selecting a
chapter looks correct (the chapter's accent colors apply).

### Root Cause
`AboutPanel` styles use `var(--accent)` (text) and `var(--accentLight)` (background). Those
vars are only set by the per-chapter body class `--{slug}` (`assets/css/main.css`), which is
only applied while a chapter is selected. With no chapter active, the `html` defaults applied —
and all three defaults were the literal keyword **`gray`**, so the text colour and the panel
background resolved to the *same* value. Measured on the built site before the fix:
`background: rgb(128,128,128)`, `color: rgb(128,128,128)`.

### Fix
The `html` defaults are a real palette now — the site's own ink and ground
(`--accent: #33312C`, `--accentLight: #F3F1EC`, `--accentLighter: #C9C4B8`) — so the welcome
panel is legible with no chapter selected, and any other homepage element that reads `--accent`
gets the site's ink instead of a placeholder grey. A chapter class still overrides all three.
**Verified on the production build, both viewports:** `rgb(243,241,236)` ground,
`rgb(51,49,44)` ink.

⚠️ **This sat open for three months as 🟢 LOW because the summary said "gray-on-gray", which
sounds like a contrast nit.** It was not: the welcome panel — the site's introduction, one of
three things in the nav — showed *nothing at all*. The user reported it as "the welcome slide
in doesn't show anything". Two identical values is an invisible element, not a low-contrast one;
grade it by what a visitor sees, not by how the cause reads.

---

## Issue #17 — Every image 404s on GitHub Pages (base URL) 🔴 HIGH (found & fixed 2026-08-10)

### Symptom
On https://tobitodili.github.io/la-coco-vie/ every image on every inner chapter page failed —
card art, noise, taglines, the lot. Vercel was unaffected, so it went unnoticed for months.

### Root cause
Asset URLs were built from `import.meta.env.BASE_URL`. **Nuxt pins Vite's client `base` to `'./'`
for production builds** (its own bundle assets resolve through the build manifest instead), so
`BASE_URL` is `'./'` regardless of `app.baseURL` — `NUXT_APP_BASE_URL=/la-coco-vie/` never reached
it. The generated bundle literally contained `"./".replace(/\/$/,"")`. Every asset URL was therefore
**relative**, and:
- **Vercel worked by luck** — served at the root, and `/with-love` has no trailing slash, so
  `./images/…` resolved to `/images/…`;
- **Pages 404'd** — it serves prerendered routes **with** a trailing slash, so the same string
  resolved one directory too deep: `/la-coco-vie/with-love/images/cu-p1.png`.

### Fix — `67693fd3`
Base is baked in at build time via `vite.define.__APP_BASE__` and consumed by **one** helper,
`utils/asset.js`. The four hand-rolled copies (app.vue ×2, chapterPages.js, useChapterScene.js) are
gone — four copies of one line is how this reached every asset in the project. `--noise-url` now
resolves against `window.location.origin` rather than `.href` (trailing-slash-proof).

### Verified
Both hosts: 8/8 page images load, srcs correctly prefixed (`/la-coco-vie/images/…` vs `/images/…`),
**zero failed requests**; video/audio/fonts/favicon 200 on both. **Method worth reusing: grep the
emitted bundle** — the bug was invisible in the config and obvious in `.output/public/_nuxt/*.js`.

---

## Issue #18 — A template ref inside `v-for` silently killed the rAF loop 🔴 HIGH (2026-08-11)

### Symptom
In Frames deployed looking half-alive: images loaded, popups tracked, **nothing animated**. No
visible error to a casual look.

### Root cause
Every element the frame loop drives sat inside the sections `v-for`, and **Vue collects a template
ref used inside `v-for` as an ARRAY**. `sweepEl.value.style` was therefore `undefined` and threw on
the first frame — and because the throw happened *before* the `requestAnimationFrame` call at the end
of `tick()`, **the entire loop died after one frame**. The IntersectionObserver preload was
independent, so media still loaded, which is what made it look half-working rather than broken.

### Fix — `5d19b9e7`
Query the DOM inside `tick()` instead of holding refs. Applies to any bespoke chapter component that
renders its scenes through `v-for`.

---

## Issue #19 — Lazy cut-outs collapsed the layout 🟡 MEDIUM (2026-08-10)

### Symptom
With Love's paper pages shrink-wrapped to their headers; spreads appeared to overlap and one page
rendered with no page around it at all.

### Root cause
An `<img>` with `height:auto` is **0px tall until it decodes**. With `loading="lazy"` the frames had
no height until scrolled into view, so each page had nothing to hold it open.

### Fix — `8f60e207`
Eager loading (eight images, one shared file) plus an inline `aspect-ratio` per item to reserve the
box, `object-fit: contain` so a swapped-in image of a different shape letterboxes rather than
distorts, and a `min-height` on the page.

---

## Issue #20 — Perforations lagged the film they belong to 🟢 LOW (2026-08-11)

### Symptom
When the In Frames spools stopped, the sprocket-hole strips along the outer edges kept moving for a
moment — "almost like it's catching up".

### Root cause
The perforations were two absolutely-positioned children spanning the full length of a very long
transformed strip. Each becomes **its own rasterised layer**, and those settle a beat after the
element they sit inside.

### Fix — `c1c5b8e1`
Painted into `.film`'s own `background-image` (two repeating gradients positioned top and bottom), so
they are part of the same paint as the film stock and cannot lag by construction.

---

## Issue #21 — Entrance animation stacked on a moving element 🟡 MEDIUM (2026-08-11)

### Symptom
The In Frames spools whipped in far faster than they then ran, with a visible gear change as they
settled — even though both were scroll-tied.

### Root cause
During its entrance a spool was doing two things at once: running (its own transform) and arriving (a
second transform added on top). The two **summed** to roughly double speed — and the entrance used a
smoothstep, whose rate peaks at 1.5× its own average, so the worst moment was around 3×. **No window
tuning can fix summed motions.**

### Fix — `c1c5b8e1`
The entrance *is* the run: each spool starts far enough back to be off-screen and travels at one
constant rate for entry, crossing and exit, with no easing on the ends. Prod-measured at **9272 px/p
across every sample from p=0 to p=0.90**.

### Correction (same day)
This entry originally recorded a trade — "spools now leave in arrival order, since a reverse-order
exit would require one of them to move at a different speed". **That was wrong.** A reversed exit
needs per-spool film **lengths**, not speeds: a spool empties at `offset + its film length`, so the
last to arrive empties first if its film is shortest, with every spool still moving at one rate.
Shipped that way; see the tracker's sequential-spools entry.

---

## Issue #22 — Hover flickers at a card's bottom edge 🔴 HIGH (2026-08-11)

### Symptom
Resting the cursor at the very bottom edge of any card made it oscillate between hovered and
not-hovered. Reported twice; an earlier fix (`4ab2c880`) reduced but did not remove it.

### Root cause — two moving parts, both self-inflicted
1. A hovered card **lifts** (`baseY + 7`), which moves its own hitbox up off the pointer. The
   raycast then misses → unhover → the card drops → the hitbox returns under the pointer → hover.
   `4ab2c880` stopped the per-frame re-resolve from unhovering, but `onMouseMove` still could, so
   the smallest movement at the edge resumed the loop.
2. After switching to a screen-space test, **the release region itself still travelled with the
   lift** — so releasing dropped the card, which slid the region back under the pointer, which
   re-acquired. Same oscillation, one step removed. Hysteresis cannot fix a moving boundary.

### Fix — `de1d05f9` + follow-up
Hover is resolved by **containment in screen space**, with two different thresholds: ACQUIRE
requires the pointer inside the card's projected territory, RELEASE requires it outside a **1.45×**
larger one. And the territory is measured from the card's **resting** position (the hover lift is
subtracted back out, rotated through the ring's tilt quaternion), so what a card owns never depends
on whether it is currently hovered.

### Verified on prod
Parked at the edge: 14/14 samples stable. Creeping down through the edge in 4px steps: **one** clean
release (was five flips).

---

## Issue #23 — Background cards were hoverable 🟡 MEDIUM (2026-08-11)

### Symptom
Hovering could latch onto a faded card at the back of the ring — which swapped the centre wordmark
to a chapter that isn't visible on screen.

### Root cause
Hover picked the **nearest projected centre** among the near half of the ring. There was no
containment test (so a pointer over a back card still grabbed some front card) and no visibility
test (so a depth-faded ghost was a legal target).

### Fix
Candidates must now be in the near half, **at or above 0.75 `uOpacity`**, and actually contain the
pointer. Verified on prod: hoverable slots are exactly `[2,3,4]` — the cards at opacity 0.96/1.0/1.0
— while slot 5 (0.73) and slots 1,6,7,8 (0.20–0.22) are correctly excluded.

---

## Issue #24 — The deck rested leaning left (worse on mobile) 🟡 MEDIUM (2026-08-11)

### Symptom
Cards looked tilted/offset to the left on both screens, noticeably worse on phones.

### Root cause
`uAngle` Z-rotates every card before the cylindrical bend, and it was `mouse.x * 10 + 10`. The intro
tweens its mouse proxy to **0.5**, so the deck came to rest at a permanent **15° lean** — and on
touch, where no `mousemove` ever fires, nothing could ever bring it back. Desktop hid this because
moving the pointer varied it; mobile froze at the intro's value forever.

### Fix
Rest is **0° (upright)**; input only deflects from there. Desktop follows the pointer (and only once
a real pointer has moved — `hasPointer`, so a touch device can't inherit a stale value). Touch leans
with **the ring's own angular velocity** and settles upright.

⚠️ **Calibration note:** the touch lean was first driven by an accumulator over raw scroll deltas
and shipped twice at constants that produced **under 1°** — invisible. That accumulator was not
measurable from outside; the ring's per-frame rotation is. Prod-measured after the change: rest
0.24°, peak 10.2° during a swipe (the `LEAN_MAX_DEG` clamp), tracking the ring's direction.

---

## Issue #25 — Deep-linking to a chapter left the EXPLORE cursor stuck expanded 🟠 HIGH (2026-08-31)

### Symptom
Opening any chapter URL directly (`/the-big-day`, a shared link, a refresh) left the custom cursor
parked in its expanded 104px **EXPLORE** state for the entire visit, dragging a filled blob over the
page's own content. Clicking through from the homepage was fine. Found while building the calendar,
where the blob sat exactly on top of the dates a guest is meant to hover.

### Root cause
`confirm()` and its release lived in two different places. The scene auto-selects the chapter on a
deep link and emits select → `onChapterSelect` → `cursorRef.confirm()`. The release was a
`watch(() => route.params.slug, …)` poll — but on a deep link **the slug never changes**, it was
already the destination, so the watcher never fired and nothing ever called `endConfirm()`. Adding
`immediate: true` would not have fixed it either: on mount the scene has not started selecting, so
the poll would clear the flag *before* `confirm()` set it.

### Fix
`releaseConfirmWhenSettled()` is now kicked off from `onChapterSelect` itself, right after
`confirm()` — set and release in one place — and the route watcher still calls it for the
click-through path. **Verified on prod:** the cursor's class on a deep-linked chapter page is now
plain `cursor` (was `cursor active confirming`).

---

## Issue #26 — A square outline around every ringed calendar date 🟡 MEDIUM (2026-08-31)

### Symptom
Each marked day on the new calendar carried a crisp 1px square outline in the marker colour — as if
the button had a border. `border: 0`, `outline: none`, `background: none` and `appearance: none` all
made no difference.

### Root cause
**A class-name collision with Tailwind's utility layer.** The marker circle's SVG was
`class="ring"`, and Tailwind v4 emits `.ring { --tw-ring-shadow: 0 0 0 1px currentcolor }` — the
utility applied its own box-shadow ring to the SVG's box. Scoped component CSS does **not** scope the
class NAME: it still matches global utility rules. Nothing in the component could have overridden it,
which is why every "remove the border" fix failed.

### Fix
Renamed to `.marker-ring` (and `.grid` → `.cal-grid` for the same reason). **Check new class names
against Tailwind's utility list** — `ring`, `grid`, `container`, `hidden`, `block`, `fixed`, `shadow`
and friends are all taken.

---

## Issue #27 — In Frames: the deck bounced, and the swipe cue was never seen 🟠 HIGH (2026-09-02)

Two user-reported defects on the procession, filed together because the second was uncovered while
fixing the first, and both are instances of a class this codebase keeps hitting.

### Symptom
1. *"There is still a bouncing effect while scrolling through."* Every print visibly surged forward
   and pulled back as it crossed the front of the deck — most obvious on desktop, where the wheel
   gives a steady rate.
2. *"I don't see the animation to nudge or visualize that a user can swipe."* The left-right nudge
   was implemented and running, and no visitor could ever have seen it.
3. Alongside these: the per-card hover expansion was to go, and the prints were to behave as
   individual animatable 3D elements rather than a rigid array.

### Root cause
**(1) A special-cased exit path — not the spring, which is where I looked first.** The departing
print had its own formula sending it up and back, so a card came forward to `z = 0` and then
**retreated**. That was a leftover from the stepped version, where "take the top card and put it
behind" was the intended read; under continuous flow it is simply a bounce. A *second*, smaller
contributor: the nudge cue fired mid-scroll, swinging the front print sideways while the deck was
already moving underneath it.

**(2) The tall-section visibility-threshold trap — twice in a row, which makes THREE occurrences in
this codebase** (see also the active-section observer in `[slug].vue`):
- The cue's observer used `threshold: 0.55`. Once the section became **5.64 screens** tall, at most
  `1/5.64 ≈ 18%` of it can ever be visible, so the threshold could **never** be met.
- Its replacement gated on the **clamped** scroll progress `p`, which reads `0` for the entire page
  *above* the element — so the cue burned both of its runs while the section was still off-screen.
  Caught only by instrumenting and seeing `cueRuns: 2` before a visitor could possibly have arrived.

### Fix
- **One formula for the whole range**, `z = −u·pitch`, monotonic; only the fade is special-cased.
- The cue gates on the **unclamped** ratio, and now fires only after the scroll has been **still for
  0.8s** — any movement cancels it outright.
- **Each print smooths its own slot** toward the deck's position (`rate = 9 − min(5,|u|)·0.85`), so
  the deeper ones trail more and they read as objects with weight.
- Per-card hover expansion removed; the deck still leans toward the pointer, but **as one object**.

**Verified on the production build and then on prod** (`56522682`): **0 depth reversals** and a
strictly monotonic z trace across a full pass; 25 distinct z values in 25 samples of a slow scroll;
unfurl spanning 38px stacked → 541px open; lean swinging −4.5° → +3.6°; the cue silent while
scrolling and running once stopped; zero console errors. Per-print inertia on prod after settling:
`[43, 42, 63, 64, 60, 56, 51, 47, 43]` — 8 distinct values of 9.

⚠️ **Verification caveat, recorded so it is not mistaken for a regression later:** the *first* prod
run reported 1 reversal and suspiciously uniform per-card deltas. That was the probe sampling
mid-animation before the page had settled, not a defect — two clean re-runs and a properly-settled
inertia check confirmed it.

---

> ⚠️ **#28–#30 were all found in the Big Day rework that shipped as `df65d160` and was REVERTED in
> full as `c067839b`** (user: *"it's worse now imo"*). The fixes are therefore NOT in the code
> today, and #28 and #30 describe defects that came back with the revert. They are kept because the
> root causes are properties of this codebase — #29 especially, which is the third occurrence of a
> trap that produces a blank page with no error — and because whoever rebuilds this page will walk
> straight into all three again otherwise.

## Issue #28 — Moving between the two wedding dates shifted the whole page 🟡 MEDIUM (2026-09-02; fix reverted, re-landed 2026-09-03)

### Symptom
User: *"I don't love the layout shift at the bottom when I hover between the two dates."* Everything
below the calendar's detail panel jumped as the panel swapped from one day to the other.

### Root cause
**A reserved `min-height`, which no number could have fixed.** The panel rendered one card at a time
under `min-height: 9.5rem` (14rem on mobile). But the white wedding has **two** events and the
traditional has **one**, so the two cards are genuinely different heights — whatever value was
reserved was correct for one day and wrong for the other, and the taller card overflowed it every
time. Reserving space only works when the panes are the same size, which is exactly when you don't
need to reserve it.

### Fix
**Stack them.** Every card is rendered into the *same* CSS grid cell (`grid-area: 1 / 1`) with only
the active one visible, so the container is automatically as tall as its tallest child and the swap
is a pure cross-fade. **Measured: 0px of movement** across a full hover cycle on both 1440×900 and
390×844, where the reserved version moved on every change. Generalised in ARCHITECTURE.

⚠️ **This fix shipped, was reverted with the rest of `df65d160`, and was asked for again by name on
2026-09-03** — the layout shift was the user's *first* note both times. It is back in the code, and
the same technique now also holds In Frames' window steady between its two views. Do not reach for a
reserved height here a third time.

---

## Issue #29 — The Big Day rendered a completely blank section, with no error 🟠 HIGH (2026-09-02, code reverted)

### Symptom
After adding the month-flip, the entire calendar disappeared: `.cal-wrap`, `.cal-deck` and every
`.cal-page` were absent from the DOM. **No console error, no page error** — the section was simply
empty. An earlier build of the same component had rendered fine.

### Root cause
**A template ref used inside `v-for` — third occurrence (see #18).** The flip needed to observe the
deck, so it got `ref="deckEl"`. But `.cal-deck` sits inside the `v-for` over `sections`, and Vue
collects a ref used inside `v-for` as an **ARRAY**. `deckObs.observe(deckEl.value)` therefore threw
an `IntersectionObserver.observe` type error *inside `onMounted`* — and a throw in `onMounted`
**aborts the component mount**, so nothing rendered at all. The throw is swallowed by Vue's error
handling, which is why there was nothing in the console to point at.

### Fix
Query the DOM off a ref on the component **root** (outside every `v-for`):
`rootEl.value?.querySelector('.cal-deck')`. Same resolution as #18 and the In Frames rAF loop.
⚠️ **Recognise the symptom**: a bespoke component that renders NOTHING, silently, is almost always a
throw in `onMounted` — and in this codebase that is almost always a `v-for` ref.

---

## Issue #30 — The month-flip would have played entirely below the fold 🟠 HIGH (2026-09-02, caught pre-ship; feature reverted)

### Symptom
Caught by instrumentation before release, not by a user. The new entrance — flipping from the
visitor's current month to October — was triggered by the section's existing `threshold: 0.12`
IntersectionObserver latch. That fires correctly, but measured from the live build the calendar
section is **1008px tall and starts a full screen below the hero**, so at 12% visibility the deck
itself is still roughly **400px below the fold**. The whole riffle would have run and finished
before it was ever on screen.

### Root cause
The same family as AUDIT #27 and the `[slug].vue` active-section observer — **a trigger tuned to the
section rather than to the thing being animated**. Fourth and fifth encounters with it in this
codebase.

### Fix
The flip gets **its own observer, on the deck**, at `rootMargin: '-18% 0px -28% 0px'` with
`threshold: 0`. ⚠️ **Prefer that shape to any threshold above 0**: "any overlap with the middle band"
is reachable no matter how tall the element or how short the screen, whereas a fractional threshold
silently becomes impossible the moment the element outgrows the viewport. **Verified: the deck is
100% visible for every sampled frame of the flip**, on both 1440×900 and 390×844.

---

## Issue #31 — The calendar's leader line rendered in two pieces 🟡 MEDIUM (2026-09-03)

### Symptom
User, with a screenshot: *"the 29th one looks broken."* It was. The line drawn from the 29th out to
the margin rendered as **two disjoint segments with a visible gap** in the middle. The 23rd's line —
identical code, identical markup — looked perfect.

### Root cause
**Four features that each work fine and do not work together:** `pathLength="1"` +
`stroke-dasharray: 1` (the dash-reveal idiom used everywhere else in this codebase) +
`vector-effect: non-scaling-stroke` + `preserveAspectRatio="none"`.

`pathLength` normalises the dash arithmetic against the path's length in **user** space, while
`non-scaling-stroke` applies the dash pattern in **screen** space. Under a *non-uniform* stretch —
`preserveAspectRatio="none"` mapping a 100×32 viewBox onto 278×30px — the ratio between those two
lengths is not constant along the path, so the single "full length" dash ran out before the end of
the visible stroke and the gap that follows it in the pattern became visible.

⚠️ **This is why one line looked right and the other did not.** The distortion scales with the run:
the 23rd's line spans one column (145px) and stayed within its dash; the 29th's spans two (278px)
and did not. Measured — `getTotalLength()` reported `103.59` user units for a 278px rendered path,
and `stroke-dasharray` computed to `1px`.

### Fix
Stop revealing with a dash. The line uses a **`clip-path` wipe** (`inset(-3px 100% -3px 0)` →
`inset(-3px 0 -3px 0)`), which reveals rendered pixels and knows nothing about path length, so none
of the four interact at all. **Verified: the path's ink is now 278px across a 278px box.**
⚠️ The marker RING still uses a dash reveal and is fine — it has a uniform `preserveAspectRatio`,
no `pathLength`, and an authored `stroke-dasharray: 430`. The trap needs the non-uniform stretch.

---

## Issue #32 — No way into the welcome panel on a phone 🟠 HIGH (2026-09-03)

### Symptom
Found while verifying the fix for #16 on mobile: the welcome panel opened on desktop but tapping
**WELCOME** on a 390px phone did nothing at all. No error, no flicker — the tap simply went
somewhere else.

### Root cause
**An invisible wrapper, as wide as its widest child.** The centre wordmark block carries
`pointer-events-auto` and the `go-home` click on a `div` that wraps *both* the wordmark **and the
countdown line** — and that line reads `OCTOBER 23 & 29, 2026 · LAGOS · 50 DAYS TO GO`, roughly
330px of a 390px screen. The block is `!fixed top-3` with the same `z-20` as the nav bar but comes
**later in the DOM**, so its box was painted straight over the WELCOME label at the top left.
Measured: `elementFromPoint` over WELCOME returned `DIV.text-center.pointer-events-auto`, not the
nav item. Every tap on WELCOME was firing `go-home` instead.

⚠️ It could not happen on desktop, where the same line is a small fraction of a 1440px viewport and
never reaches the left edge. The countdown only became long enough to cause it when the date changed
to **two** weddings — a copy change breaking a hit target three components away.

### Fix
`pointer-events-auto` and the click handler moved onto the **wordmark itself**; the wrapper and the
countdown are inert. **Verified on the production build at 390×844:** `elementFromPoint` over
WELCOME now returns the label's own `SPAN`, and the panel opens on tap.

---

## Issue #33 — The nav vanished into the page on every chapter 🟠 HIGH (2026-09-03)

### Symptom
User: *"the logo and header elements are same color as the header bg and doesn't show till the user
scrolls down."* Reported on With Love; it was every chapter.

### Root cause
**The nav is inked in the chapter's `accent`, and two backgrounds on every chapter page ARE that
accent:** the exit background the scene paints behind the reassembling ring as you scroll off the
bottom, and In Frames' dark room. Measured contrast where they meet — **1.08** on With Love and The
Big Day, **1.33** on In Frames, **1.46** on US. Anything under 3 is unreadable; 1.08 is invisible.

### Fix, and two wrong turns worth recording
The flag that flips the nav to `accentLight` is **measured, not inferred**, and the first two
attempts were both inferred and both wrong:
1. *"In Frames is a dark chapter, so go light there"* — but its page GROUND is its light tone and
   only the room section is dark. *"The exit has begun (de > 0.12)"* — but the exit spends its first
   half scrolling the article out over the light ground. The nav went light over light: 1.02–1.07,
   no better than before.
2. Walking the DOM behind the nav for the first opaque background fixed the CSS cases (With Love
   1.08 → 5.68, US 1.46 → 4.51) but not the canvas: the WebGL clear colour has no CSS background to
   find. The scene exposes `clearIsDark()` for that.
⚠️ And it could not live inside `updateExit()`, which early-returns in several states — including at
scroll 0, where a selected chapter already has the accent painted behind the transparent hero. It
runs on every Lenis scroll and once on arrival.

---

## Issue #34 — "thank you" was clipped at the descender 🟡 MEDIUM (2026-09-03)

### Symptom
User: *"Thank you seems cutoff on the bottom of the Y."*

### Root cause
The `.write` clip-path reveal was `inset(0 …% 0 0)` — zero vertical inset, so it clipped at the line
box, and the script face's descenders hang **below** it. The tail of the y was shaved off.

### Fix
`inset(-0.3em …% -0.45em 0)`, the same slack US's writing already had.
⚠️ **This is the second page to need it.** Any clip-path reveal over a script face needs negative
vertical inset; the line box is not the ink box.

---

## Issue #35 — Fixing the line's crossings straightened it out 🟡 MEDIUM (2026-09-03)

### Symptom
User, after #33's fix landed: *"Now it's just straight lines between the items which sucks… it still
cuts into the text above."*

### Root cause — two, and the first was self-inflicted
1. **Re-routing straightened it.** The previous fix replaced each gift's centre point with an entry
   above and an exit below, both at the word's own x. A Catmull-Rom's tangent at a point is the
   direction between its NEIGHBOURS — two points stacked vertically give a vertical tangent at both
   ends of every run, so the line left one gift straight down and arrived at the next straight down.
   Measured bows from the chord: **2–16px**.
2. **It still crossed the memory line.** The padding cleared the gift's NAME only; the memory
   sentence sits above it, in its own box, and the line went through that instead.

### Fix
**Do not re-route the curve — trim what is drawn.** The point list is the original one (through each
centre, which is what made it wander). Each segment is then sampled and split around the padded box
of every `.gift-name` AND `.memory`, and only the stretches outside them are emitted, each inheriting
a slice of its segment's window in proportion to where it sits along it.

⚠️ **Trimming removes the curviest part of a spline**, which is why that alone was not enough: a
Catmull-Rom bends most near its endpoints, where it turns to meet its neighbours — and those ends are
exactly what sits against the words. So each run also gets a control point pushed PERPENDICULAR to
it, alternating side and scaled by the run's own length, which puts the bow back where the ink
survives. Measured after: **0 segments crossing a name, 0 crossing a memory**, bows up to 21px across
14 stretches.

---

## Updated Priority Order (as of 2026-05-27)

| # | Issue | Priority | Status |
|---|---|---|---|
| ~~13~~ | ~~Cards mirrored on hover — hover key is `chapterIdx`, should be slot `i`~~ | ~~🔴 High~~ | ✅ Fixed (`e05e638e`) — hover now keyed by slot `i`; `getHoveredPoster` returns slot, `chapterIdxForSlot()` resolves chapter for video/txt/audio/select. Only the hovered copy lifts. Verified live. |
| ~~12~~ | ~~Loading animation broken — fake timer, wrong layout, no GSAP exit~~ | ~~🔴 High~~ | ✅ Fixed (`57efe8dd` + `96e0d083`) — real asset-gated progress (13 textures) wired scene→app→loader; GSAP-eased counter + GSAP fade exit; restyled to match LIVE original (light-gray `zinc-200`, centered); `%` offset right of the number so both show. Verified live. ⚠️ Original's design differs from this audit's earlier description — see correction in §Issue #12. |
| ~~1~~ | ~~Cursor clipping — wrong positioning method + overflow~~ | ~~🔴 High~~ | ✅ Fixed (`59d6d91b`) |
| ~~2~~ | ~~Viewport height — use `getBoundingClientRect` not `innerHeight`~~ | ~~🔴 High~~ | ✅ Fixed (`59d6d91b`) |
| ~~9~~ | ~~Center text doesn't change on hover — `txtMesh` hardcoded to `txt-1.png`~~ | ~~🔴 High~~ | ✅ Fixed (`1ec352e2`) — preloaded all 4 txt textures into `txtTextures[]`; `hoverChapter` crossfades `txtMat.map` to hovered chapter's txt (0.15s out → swap → 0.25s in); last-hovered persists. Verified live. |
| ~~10~~ | ~~Horizontal scroll doesn't rotate carousel — `deltaX` ignored~~ | ~~🔴 High~~ | ✅ Fixed (`c9562a21`) — both `vsInstance.on` and `wheel` fallback now pass `deltaY - deltaX` |
| ~~8~~ | ~~Center text/logo offset right — container width centering~~ | ~~🔴 High~~ | ✅ Closed — Browserless side-by-side (×2) shows nav/logo centered identically; no shift. Resolved by `59d6d91b`. |
| ~~11~~ | ~~Logo-to-txtMesh spacing too small — txtMesh world Y=0 too high~~ | ~~🟡 Medium~~ | ✅ Fixed (`55e0b4b1`) — `txtMesh.position.y` 0 → -8 (~110px lower); text now clears the logo/subtitle. Verified live. |
| ~~14~~ | ~~Default center text doesn't match front-facing card (initial txt hardcoded)~~ | ~~🟡 Medium~~ | ✅ Fixed (`e4e80d2e`) — `frontChapterIdx()` (nearest poster to camera) drives `setTxtChapter()` from the animate loop; intro completion sets it instantly. Rest-state verified live. |
## Issue #36 — The nav wordmark sat on top of "WELCOME" on every common phone 🟠 HIGH

### Symptom
On `/{slug}` at 320, 360 and 390px the centred `COVENANT & UVIE` wordmark ran into the WELCOME label.

### Root cause
17px type at `0.14em` tracking is ~98px wide, and WELCOME + RSVP do not leave the centre that much
room on a phone. Nothing was measuring it: every earlier "verified at 390×844" pass was
FEATURE-scoped (does the folder window fit, does the calendar header clear the nav), so a chrome
overlap present on all five routes went unseen for months.

### Fix
`14px` / `0.08em` below 400px. Measured overlap **35px @320, 25px @360, 18px @390 → clear by 19px+**.

⚠️ On the HOMEPAGE the same measurement reads negative for a different and harmless reason: the
`.wordmark` is a block `div` inside a flex item whose widest child is the countdown line, so its BOX
stretches to the countdown while its text stays centred. `elementFromPoint` over WELCOME returns
WELCOME, so taps land correctly — cf. #32, which was the same geometry when it *did* bite.

---

## Issue #37 — Watermarked stock clipart was the registry art, on the live site 🔴 HIGH

### Symptom
Every gift on With Love revealed the same picture, with `CoolClips.com` across the bottom of it.

### Root cause
`placeholder-item.png` was added as a deliberate stand-in — a free *preview*, not a licensed asset —
and the code comment said so. It then survived four redesigns of the page because each rebuild
carried `image:` through untouched.

### Fix
Deleted. `image` is `null` until it is real and the reveal panel sizes itself to what is there.
⚠️ **A placeholder that renders is not a placeholder, it is content.** If it must ship, it has to
look like an absence.

---

## Issue #38 — 3.2 MB of unreferenced media shipped on every build 🟡 MEDIUM

### Symptom
Nothing visible — which is why it lasted.

### Root cause
Two retired designs left their assets behind: the reference site's own editorial wedding stills
(`{amour,eat,la,wine}-intro.jpg`, ~1.1 MB — models, not the couple) and 11 `proj-*` prints from the
In Frames version that the folder window replaced (2.1 MB). Both were tracked, deployed, and
referenced by nothing.

### Fix
Deleted (recoverable from git). ⚠️ **`.output/public` is NOT wiped between builds**, so a local probe
was still serving files that no longer existed in `public/` — a stale local deploy can hide exactly
this class of problem. Always `rm -rf .output` before an asset audit.

---

## Issue #39 — A placeholder `#` rendered as a link that opens a blank tab 🟡 MEDIUM

### Symptom
The With Love cash CTA, In Frames' "Add Your Photos" card and the nav credit were all
`<a href="#" target="_blank">` — controls that open an empty tab on nothing.

### Fix
`#` and `''` now mean "not wired up yet" in all three places: `PopupCard` renders a plain card, the
CTA renders plain text, the credit renders a `div`. Fill in the `url` and they become links again
with no other change. **Prod-swept: 0 `href="#"` anchors on any route at any size.**

---

## Issue #40 — The homepage composition never scaled with viewport HEIGHT 🟠 HIGH

### Symptom
On a landscape phone (844×390) the carousel showed two half-cards and the centre tagline sitting on
top of them.

### Root cause
`isMobile = aspectRatio < 1`, so a landscape phone is treated as a desktop — and every constant in
the scene (camera y/z, the ring's idle height, the wordmark plane's y) was tuned against a ~900px
frame with nothing keyed to height. The ring is *meant* to bleed off the bottom (it does at 1440×900
and that is the approved look); at 390px tall there is nothing left of it.

### Fix
`fitScale()` pulls the camera back below **560px** of height and is exactly `1` above it, so no size
the design was drawn for moves by a pixel (verified: camera z stays 100 at 600/800/900, 110 portrait).
⚠️ **The first version of this fix made it worse.** `DEPTH_FADE_NEAR/FAR` are DISTANCES, so pulling
the camera back put every card past the far threshold at once and the whole ring washed out to the
0.2 opacity floor — a fit that "worked" and left a grey ghost. The fade thresholds scale with the
same factor. Card opacities at 844×390 now track 1440×900's within 0.07.

---

## Issue #41 — The countdown ran straight through WELCOME and RSVP on every phone 🟠 HIGH

### Symptom
At 320–390px the homepage's date line overlapped both nav labels.

### Root cause
It is the **widest thing in the nav** — "OCTOBER 29, 2026 · LAGOS · 53 DAYS TO GO" is ~300px at
10px/0.2em — and it sits on the same line as labels that leave it ~180px. ⚠️ **A previous sweep saw
this and blamed the wrong element:** it measured `.wordmark`, whose box stretches to the countdown's
width, decided that was an artifact, and moved on. The artifact was real AND there was a genuine
overlap underneath it, in a sibling.

### Fix
Below 520px the countdown drops onto its own line under the nav row, at 9px/0.1em.

---

## Issue #42 — The wordmark's click target was as wide as the countdown 🟡 MEDIUM

### Symptom
None visible — taps on WELCOME still worked.

### Root cause
`.wordmark` is a block `div` inside a flex item whose widest child is the countdown, so its box
stretched to ~300px while its text sat centred at ~135px — and that box carries `pointer-events-auto`
and the go-home click. It only ever worked because WELCOME won the hit test by paint order. **This is
the exact geometry of #32**, where the same shape swallowed every tap on WELCOME.

### Fix
`display: inline-block`, so the clickable area equals the words. Verified: box 135px at 320,
`elementFromPoint` over WELCOME and RSVP returns each label at all eight widths tested.

---

## Issue #43 — Effects began after their content had left the screen 🟠 HIGH

### Symptom
User: *"lots of the effects on my laptop don't start till the page is almost all the way past the
viewport."*

### Root cause
On a scene-progress page `p = 0.5` means "the scene is centred", so a window opening at 0.72 fires
when its element is at the very top edge. The Big Day (rebuilt the same day) had `.count-tail` and
`.note` at 0.72 — **measured at 14% and 29% of the screen**, and its date-scene thread at 0.62.
⚠️ **The first audit blamed the wrong page.** Run against US with a scene-progress model it reported
31 late effects and four at negative positions; US is on a per-block model (`unitProgress`) and,
measured correctly, every one of its 116 words starts between 64% and 100% of the screen. In Frames
and With Love were clean throughout.

### Fix
Every non-sticky window on The Big Day now ends by ~0.5. **Prod-measured across 13 viewports
(320×568 → 2560×1440, including 1440×700): the latest any effect starts is 88% of the screen.**

---

## Issue #44 — Tailwind's `.ring` utility drew a box round the calendar date, again 🟡 MEDIUM

### Symptom
A 1px rectangle around the ringed 29.

### Root cause
`class="ring"` on the SVG. **Scoped CSS does not scope the class NAME**, so Tailwind's global `.ring`
utility applied its `box-shadow`. This is **AUDIT #26 verbatim, on the same calendar, walked into a
second time** — the rule was already written in ARCHITECTURE.md.

### Fix
`day-ring`. ⚠️ Never name a class after a Tailwind utility, however well-scoped the component is.

---

| ~~3~~ | ~~Noise texture 404 — relative `--noise-url` resolves vs the `_nuxt/` CSS bundle~~ | ~~🟡 Medium~~ | ✅ Fixed (`1078a8f3`) — resolve `--noise-url` to an absolute URL via `new URL(path, location.href)`. Affected Vercel too (not just GH-Pages). Grain verified rendering live. |
| 4 | Card scale → actually ring viewing-angle (tilt) | 🟡 Medium | ⏸️ Parked — GPU extraction confirms fov 45° + radius 40 already match; residual is subtle tilt, no clean target. See §Issue #4. |
| ~~5~~ | ~~SVG colour saturation~~ | ~~🟡 Medium~~ | ✅ Closed — `NoToneMapping`+`SRGBColorSpace` already set; colours match in side-by-side. |
| ~~6~~ | ~~Background card opacity falloff~~ | ~~🟢 Low~~ | ✅ Fixed (`26ee0406` + `52b8cf9b`) — `uOpacity` uniform driven by per-card distance to camera (smoothstep 95→125, floor 0.2); far cards now faint ghosts like the original. Verified live. |
| ~~7~~ | ~~Scroll-driven chapter exit~~ | ~~🟢 Low~~ | ✅ Fixed (`bcc9b342`) — back-scroll past threshold runs the reverse animation via `onScroll`; `onDeselect` callback resets app state. Verified live. |
| ~~15~~ | ~~Chapter selection broken — hit layer click-transparent~~ | 🔴 High | ✅ Fixed (`bbedb5ec`) — `#canvas-hit-layer` inherited `pointer-events:none`; clicks fell through to `.app-root` so `@click` never fired. Set `pointer-events:auto`. Found while verifying #7; verified live (clicking now selects). |
| ~~16~~ | ~~About panel gray-on-gray when opened from homepage~~ | ~~🟠 High~~ | ✅ **Fixed 2026-09-03** — both vars resolved to the literal `gray`, so the welcome panel showed NOTHING. The `html` defaults are the site's real palette now. Mis-graded 🟢 Low for three months. See §Issue #16. |
| ~~33~~ | ~~The nav vanished into the page on every chapter~~ | ~~🟠 High~~ | ✅ Fixed 2026-09-03 — nav ink is the chapter accent and so are the exit background and In Frames' room. Contrast 1.08→5.68 (With Love), 1.46→4.51 (US). Measured ground, not inferred. See §Issue #33. |
| ~~35~~ | ~~Fixing the line's crossings straightened it out~~ | ~~🟡 Medium~~ | ✅ Fixed — don't re-route the curve, TRIM what is drawn; and add a perpendicular wander point, because trimming removes a spline's curviest part. 0 crossings, bows 2–16px → up to 21px. See §Issue #35. |
| ~~34~~ | ~~"thank you" clipped at the descender~~ | ~~🟡 Medium~~ | ✅ Fixed — a `.write` clip with zero vertical inset shaves a script face's descenders. See §Issue #34. |
| ~~32~~ | ~~No way into the welcome panel on a phone~~ | ~~🟠 High~~ | ✅ Fixed 2026-09-03 — the centre wordmark block's `pointer-events-auto` wrapper is as wide as the countdown line and was painted over the WELCOME label, swallowing every tap. Moved onto the wordmark itself. See §Issue #32. |
| ~~17~~ | ~~Every image 404s on GitHub Pages — `import.meta.env.BASE_URL` is `'./'` in Nuxt production builds~~ | ~~🔴 High~~ | ✅ Fixed (`67693fd3`) — baked via `vite.define.__APP_BASE__`, one helper `utils/asset.js`. Verified on both hosts. See §Issue #17. |
| ~~18~~ | ~~Template ref inside `v-for` is an array → threw on frame 1 → killed the whole rAF loop~~ | ~~🔴 High~~ | ✅ Fixed (`5d19b9e7`) — query the DOM inside `tick()`. See §Issue #18. |
| ~~19~~ | ~~`loading="lazy"` cut-outs are 0px tall until decode, collapsing the page layout~~ | ~~🟡 Medium~~ | ✅ Fixed (`8f60e207`) — eager + reserved `aspect-ratio` + page `min-height`. See §Issue #19. |
| ~~20~~ | ~~Perforations rasterise as their own layers and settle after the film stops~~ | ~~🟢 Low~~ | ✅ Fixed (`c1c5b8e1`) — painted into `.film`'s background. See §Issue #20. |
| ~~21~~ | ~~Entrance animated on top of a moving element → ~2–3× speed, then a gear change~~ | ~~🟡 Medium~~ | ✅ Fixed (`c1c5b8e1`) — the entrance IS the run; one constant rate, prod-measured 9272 px/p throughout. See §Issue #21. |
| ~~22~~ | ~~Hover flickers at a card's bottom edge (lift moves the hitbox, then moved the release region too)~~ | ~~🔴 High~~ | ✅ Fixed — screen-space containment, 1.45× release hysteresis, territory measured from the card's RESTING position. Prod: 14/14 stable parked, 1 clean release moving through. See §Issue #22. |
| ~~23~~ | ~~Faded background cards were hoverable and swapped the centre wordmark~~ | ~~🟡 Medium~~ | ✅ Fixed — near half + `uOpacity ≥ 0.75` + containment. Prod: hoverable = slots [2,3,4] only. See §Issue #23. |
| ~~24~~ | ~~Deck rested leaning 15° (permanent on touch — no mousemove to correct it)~~ | ~~🟡 Medium~~ | ✅ Fixed — rest 0°, pointer deflects on desktop, ring angular velocity on touch. Prod: rest 0.24°, swipe peak 10.2°. See §Issue #24. |
| ~~25~~ | ~~Deep-linking to a chapter left the EXPLORE cursor stuck expanded~~ | ~~🟠 High~~ | ✅ Fixed — `confirm()` and its release now live in one place (`releaseConfirmWhenSettled()` from `onChapterSelect`); the route watcher never fired on a deep link because the slug never changed. Prod: class is plain `cursor`. See §Issue #25. |
| ~~26~~ | ~~A square outline around every ringed calendar date~~ | ~~🟡 Medium~~ | ✅ Fixed — the SVG's `class="ring"` collided with **Tailwind's `.ring` utility**; renamed `.marker-ring` / `.cal-grid`. Scoped CSS does not scope the class NAME. See §Issue #26. |
| ~~27~~ | ~~In Frames: the deck bounced while scrolling, and the swipe cue was never visible~~ | ~~🟠 High~~ | ✅ Fixed (`56522682`) — a special-cased exit path made every print surge and retreat; the cue hit the tall-section threshold trap **twice** (3rd/4th occurrences). Prod: 0 depth reversals, per-print inertia 8 distinct of 9. See §Issue #27. |
| ~~28~~ | ~~Moving between the two wedding dates shifted the whole page~~ | ~~🟡 Medium~~ | ✅ **Structurally impossible now (2026-09-03)** — both days are shown side by side, so nothing appears or disappears on hover. Fixed → reverted → re-landed as a stacked swap → then superseded entirely. Prod-build: 0px. See §Issue #28. |
| ~~31~~ | ~~The calendar's leader line rendered in two pieces~~ | ~~🟡 Medium~~ | ✅ Fixed — `pathLength` + `stroke-dasharray` + `non-scaling-stroke` + `preserveAspectRatio="none"` disagree about path length under a non-uniform stretch. Replaced the dash reveal with a `clip-path` wipe. See §Issue #31. |
| ~~29~~ | ~~The Big Day rendered a completely blank section, with no error~~ | ~~🟠 High~~ | ✅ Fixed then reverted with the feature — but the TRAP is permanent: a `v-for` template ref is an ARRAY, `observe()` throws in `onMounted`, and the mount aborts silently (3rd occurrence, cf. #18). See §Issue #29. |
| ~~36~~ | ~~The nav wordmark sat on top of "WELCOME" on every common phone~~ | ~~🟠 High~~ | ✅ Fixed 2026-09-05 — 35px of overlap at 320, 25 at 360, 18 at 390, on all five routes. Every earlier mobile check was feature-scoped and never looked at the chrome. See §Issue #36. |
| ~~37~~ | ~~Watermarked stock clipart was the registry art, on the live site~~ | ~~🔴 High~~ | ✅ Fixed 2026-09-05 — a free-preview cut-out with the vendor's watermark, carried through four redesigns of With Love. `image` is null until it is real. See §Issue #37. |
| ~~38~~ | ~~3.2 MB of unreferenced media shipped on every build~~ | ~~🟡 Medium~~ | ✅ Fixed 2026-09-05 — the reference site's own editorial stills + 11 orphaned prints. `.output/public` is not wiped between builds and was hiding it. See §Issue #38. |
| ~~39~~ | ~~A placeholder `#` rendered as a link that opens a blank tab~~ | ~~🟡 Medium~~ | ✅ Fixed 2026-09-05 — `#`/'' now mean "not wired up yet" in PopupCard, the With Love CTA and the nav credit. Prod-swept: 0 dead anchors. See §Issue #39. |
| ~~40~~ | ~~The homepage composition never scaled with viewport HEIGHT~~ | ~~🟠 High~~ | ✅ Fixed 2026-09-05 — landscape phone showed two half-cards under the tagline. Camera pulls back below 560px of height; the depth-fade thresholds had to scale with it or the ring washes out. See §Issue #40. |
| ~~41~~ | ~~The countdown ran straight through WELCOME and RSVP on every phone~~ | ~~🟠 High~~ | ✅ Fixed 2026-09-06 — it is the widest element in the nav and shares a line with both labels. An earlier sweep saw the overlap and blamed the wordmark's stretched box. See §Issue #41. |
| ~~42~~ | ~~The wordmark's click target was as wide as the countdown~~ | ~~🟡 Medium~~ | ✅ Fixed 2026-09-06 — a block `div` carrying `pointer-events-auto` stretched to its sibling's width; same geometry as #32, working only by paint order. `inline-block`. See §Issue #42. |
| ~~43~~ | ~~Effects began after their content had left the screen~~ | ~~🟠 High~~ | ✅ Fixed 2026-09-06 — windows past `p=0.5` fire as content leaves the top. The first audit blamed US, which is on a different clock entirely. Latest start now 88% of screen. See §Issue #43. |
| ~~44~~ | ~~Tailwind's `.ring` utility drew a box round the calendar date, again~~ | ~~🟡 Medium~~ | ✅ Fixed 2026-09-06 — `class="ring"` a second time on the same calendar; scoped CSS does not scope the NAME. Renamed `day-ring`. See §Issue #44 and #26. |
| ~~45~~ | ~~The seconds line was invisible — a `.fade` window overwrote the opacity that made it a track~~ | ~~🟡 Medium~~ | ✅ Fixed 2026-09-06 — the scrub engine writes `style.opacity` on whatever carries `data-window`, so the CSS `opacity: 0.14` on the track lost to it: an ink fill sweeping across an ink bar. The fade belongs on a wrapper. The original verification proved the transform *moved*, not that anything was *visible*. |
| ~~46~~ | ~~The thread continuing the knot was half again as thick as the knot~~ | ~~🟡 Medium~~ | ✅ Fixed 2026-09-07 — the knot's `stroke-width: 2.6` is **viewBox units in a 1000-unit box**, so its ink is 1.75px at 1440 and 0.93px on a phone; the plain-pixel stem and thread used `2.6` as pixels. A stroke-width is meaningless without its viewBox scale. `inkW` is measured from the knot's rendered width and shared. |
| ~~47~~ | ~~The ring finished assembling before the page had scrolled out, so the landing played twice~~ | ~~🟠 High~~ | ✅ Fixed 2026-09-07 — `.chapter-outro` is TRANSPARENT, so the bottom-exit's "behind the article" phase is not hidden: it is a window opening from the bottom of the frame, right over the low bowl. Driving the deck's rise and radius off that phase meant the ring was measurably complete at `de = 0.30` with the article still covering the top third; phase B then rebuilt it. One `asm` clock now, 12% of it behind the page. |
| ~~48~~ | ~~The exit built a cluster that never needed building, and dropped its card where it could not be seen~~ | ~~🟠 High~~ | ✅ Fixed 2026-09-07 — selecting a chapter never changed the ring's radius or slots, only pushed the other cards down, so the exit's "gather to radius 18 then unfurl" was animating a restoration that did not exist; at radius 18 on a 40-unit ring eight cards overlap into a knot. And `EXIT_SPIN` at −300° carried the one empty slot from front-centre to the BACK, where the depth falloff dims it to 0.2. The pose now settles inside `SETTLE_END` before any of it is uncovered, and the spin is one slot. |
| ~~49~~ | ~~Cloudflare deploy failed: "Nuxt 3.13.2 cannot be automatically configured, update to at least 3.21.0"~~ | ~~🟠 High~~ | ✅ Fixed 2026-09-07 — nothing to do with the app. With no wrangler config in the repo root, `wrangler deploy` runs its **framework auto-setup**, detects Nuxt and enforces a version floor that exists for wiring **Nitro up as a server-side Worker**. This site is `ssr: false` with every route prerendered — `.output/public` is a finished static site and there is no server to run. `wrangler.jsonc` declares a static-assets Worker with no script, wrangler stops guessing, and the deploy is just an upload. ⚠️ Do NOT satisfy the check by upgrading Nuxt eight minors to deploy a renderer for a site with nothing to render. |
| ~~50~~ | ~~Every card's photo window was empty until you hovered it~~ | ~~🟠 High~~ | ✅ Fixed 2026-09-07 — the window IS the video texture, and the films are `preload='none'` and only `play()` on hover. Measured on a prod build, nine seconds after load: readyState 0, videoWidth 0, **not one byte of any .mp4 requested**. On touch, where nothing hovers, the windows stayed empty until a chapter was opened. Fixed with build-time first-frame stills (`scripts/gen-stills.mjs`), **184 KB for all four**; priming the `<video>` elements instead was measured at **7 MB** — Chrome fetches short files whole whatever `preload` says. |
| ~~51~~ | ~~The new window stills rendered gamma-dark — faces as near-black silhouettes~~ | ~~🟠 High~~ | ✅ Fixed 2026-09-07 — the card shader is a hand-written `ShaderMaterial`: three injects **no** colour-space decode into it and no encode out of it, so texels go straight to the framebuffer. A `VideoTexture`'s frames arrive raw and land correctly; tagging the still `SRGBColorSpace` made three upload it as an sRGB internal format, so the **hardware** decoded it to linear — a decode the film beside it never gets — and those linear values written to an sRGB framebuffer read as a gamma-darkened picture. `NoColorSpace`. Proven by rendering the same card, same frame, same geometry from each: mean RGB now **[100,91,92] for both**. ⚠️ The poster FACE still needs `SRGBColorSpace` — do not make them consistent. |
| ~~52~~ | ~~Swiping left/right on a phone turned the carousel backwards, and lagged the finger~~ | ~~🟠 High~~ | ✅ Fixed 2026-09-07 — **inverted:** the touch handler mirrored the wheel's `deltaY - deltaX`, but a wheel is a scroll and a drag is direct manipulation; measured (tracking one poster's world x across a known wheel delta) `rotation.y` DOWN moves a front card LEFT, and a rightward swipe was lowering it. **Lag:** the 0.06 render lerp is a ~0.27s smoother for the wheel — under a finger the per-frame step was still ACCELERATING when the finger lifted (0.003 → 0.016) and the deck then coasted a further 56% on its own. A touch gesture now owns the rotation outright from touchstart until the coast dies, and `onDrag(px)` derives rotation-per-pixel from the camera so the card under the finger stays under it. Drag steps are now a flat 0.021 rad/frame, the release seam is 0.00026 rad, and the coast decays monotonically. |
| ~~53~~ | ~~Coming home from a chapter froze the deck for 2.5s — no card could be opened~~ | ~~🟠 High~~ | ✅ Fixed 2026-09-07 — `deselectChapter`'s timeline only clears `selectedIndex` in its `onComplete`, and both `onClick` and `resolveHoverTarget` returned early on `selectedIndex !== -1`. So every tap and hover was dropped for the whole 2.5s return, which cleared on its own and therefore looked like it cleared "when I scrolled". `selectChapter` had always known how to interrupt a running deselect; that path was simply unreachable from a click. Both gates are now `selectedIndex !== -1 && !isDeselecting`, and the idempotence check no longer swallows re-opening the chapter you just left (on touch that is EXPLORE doing nothing, since it always targets the front card). |
| ~~54~~ | ~~The parked EXPLORE button stayed over the page after you tapped it, at 104px on every phone~~ | ~~🟡 Medium~~ | ✅ Fixed 2026-09-07 — `confirming` only lit the circle and held it expanded until the destination was up, which on touch parks a 104px blob over the chapter for the whole transition (27% of a 390px screen, and proportionally a different button on a 320 vs a 430). It acknowledges the tap and then fades. Size and label are `clamp()`d to the viewport. |
| ~~55~~ | ~~The In Frames folder grid was hard-coded to 3 columns against a data-driven list~~ | ~~🟡 Medium~~ | ✅ Fixed 2026-09-07 — a fourth folder left one orphan on its own row. `auto-fit` is not the fix either: the same four came out 1-up at 320px, 2×2 at 390, 4-across at 768 and 3+1 at 1440. The column count is derived from the folder count now (≤2 narrow, ≤4 wide) — balanced at every width, whatever the data holds. |
| ~~56~~ | ~~The homepage ring's resting tilt was typed out in six places~~ | ~~🟡 Medium~~ | ✅ Fixed 2026-09-07 — init, resize, deselect, endExit and setExitProgress each carried their own copy, with a standing warning in ARCHITECTURE to keep them in sync by hand. One `homeTilt()`. Which is what made "the cards look bent to the right" a one-line change (roll 15° → 8°) instead of a six-line one. |
| ~~57~~ | ~~The WebGL scene drew every frame while the article completely covered it~~ | ~~🟠 High~~ | ✅ Fixed 2026-09-07 — a chapter page is `position: fixed; inset: 0` with an opaque background, and between the transparent hero and the transparent outro it hides the canvas entirely; the scene went on drawing eight shader-heavy cards at up to 2× DPR for every frame of a multi-screen article. `setCanvasHidden` skips only the draw, so the hero's coupling and the ring's pose are still exact when the outro uncovers them. **Measured: 91–93% of draws removed** on the three long chapters, 40% on In Frames; the homepage still draws 61/s. |
| ~~58~~ | ~~With Love was the site's most expensive page by 3.7×, and it was `matchMedia` in a rAF loop~~ | ~~🟡 Medium~~ | ✅ Fixed 2026-09-07 — at 20× CPU throttling this was the ONLY page that broke 60fps while the other three held. ⚠️ **The obvious cause was the wrong one**: a read/write split to stop layout thrashing changed nothing, because `Performance.getMetrics` showed layout was 0.058s against 0.642s of script and 0.472s of style recalc. The real costs were `window.matchMedia(…)` constructed **every frame**, `syncTouch` reading eight rects every frame to answer a question that cannot change in 16ms, and a `translate3d` written to every band every frame even when it had not moved a visible pixel. Script −27%, style recalc −24%. |
| ~~59~~ | ~~Half a screen of dead space wrapped every closing panel, on every chapter~~ | ~~🟡 Medium~~ | ✅ Fixed 2026-09-07 — `.chapter-end` is ~340px of content and was pinned at `100dvh`. It is 62dvh now. The scrub scenes came down too (The Big Day 132/130 → 112dvh, With Love 116/112 → 98/96), which is real dead scroll and not padding: it is the runway the scroll-scrubbed effects play over, so **every window was re-measured after the change** rather than assumed. One had begun finishing below the fold and was retimed. Pages: The Big Day ~7000 → 6381px, With Love → 5891px. |
| ~~60~~ | ~~All four ambient tracks were the reference site's, renamed and never licensed~~ | ~~🔴 High~~ | ✅ Fixed 2026-09-11 — flagged here since 2026-09-04 and survived the "the old site is gone" sweep because a **rename defeats a filename audit**. All four are deleted (plus `tick.mp3`, which was constructed and unloaded and never once played), replaced by ONE generated loop, `SITE.themeAudio`. Generated rather than downloaded on purpose: royalty-free by construction beats royalty-free by someone's claim. ⚠️ Unheard by its author — measured only (29s, peak 0.456, no silent windows) and shipped behind a sound toggle that is off by default. |
| ~~61~~ | ~~The payment dock's two scroll conditions could never both be true~~ | ~~🟡 Medium~~ | ✅ Caught before shipping 2026-09-11 — the first cut opened the dock on `wall.bottom < 0.62vh && sign.top > 0.46vh`. Those are **ADJACENT sections**, so the two values are the same number at every scroll position, and the condition was really "between 0.46 and 0.62" — a 0.16vh slot the whole effect fell through, which a 5%-step scroll probe stepped straight over. One `edge` value and one band. ⚠️ When two rects come from neighbouring sections, check whether you are reading one number twice. |
| ~~62~~ | ~~The "going home" rail stayed lit for the rest of the visit once you pulled~~ | ~~🟡 Medium~~ | ✅ Caught before shipping 2026-09-11 — the pull indicator is reset in `onTouchMove`'s else branch, which only runs **while a finger is still moving**. A pull that stops short of the threshold simply stops producing events, so the rail froze at whatever it had reached. Reset on `touchend`/`touchcancel`, on the wheel's gesture gap, and on any scroll away from the top edge. ⚠️ A value driven by a move handler needs an END handler, or it is only ever correct mid-gesture. |
| ~~63~~ | ~~Fixing the "packed" unfurl removed the arrival instead of the packing~~ | ~~🟠 High~~ | ✅ Fixed 2026-09-11 — the 2026-09-07 pass blamed the packed look on a radius gather (real, and correctly deleted) and then finished the whole pose change inside `SETTLE_END` = 0.03 of `de`, leaving a motionless deck with one card falling into it: *"I still want to see some rotation and the page to be caught in the deck of cards."* The packing had a different cause — **a select flattens `groupG` to (0,0,0), and a ring with no look-down is seen edge-on**, every card collapsed onto one line. The arrival is back as one `pose` gauge over height/look-down/yaw/roll, starting at `POSE_HEAD` 0.66 (behind the article) and finishing at `POSE_END` 0.80, plus a damped catch that opens BEFORE the landing. ⚠️ **Do not remove a motion to fix how it looks; find which term is wrong.** |
| ~~64~~ | ~~A net exit spin of any size puts the landing off a phone screen~~ | ~~🟠 High~~ | ✅ Fixed 2026-09-11 — the empty slot is the selected chapter's and the select leaves it front and centre, so every degree the exit NETS carries the one moment it is built around off the middle of the screen. −300° put it at the back of the ring (AUDIT #48); −45° "kept it in the front arc" — measured at 1440×900, true. At **390×844 the front card alone spans 90% of the frame and only ~±15° of the ring is on screen**: filmed, the dropping card never appeared at all. And **zero was wrong too**: a select flattens `groupG` *yaw and all*, so restoring the desktop's 70° group yaw turns the whole ring — with a net of zero the card came to rest at world x 38, `normalDotCam` 0.07, edge-on in the wings. The first fix swung 62° out and back to a net of `−homeTilt().y`, which landed correctly and **did not turn enough** — reported the same day as *"there is no pre-rotation… revert to how it was when it would fully rotate"*. The turn is now a **whole revolution** plus that same net term (−430° desktop, −360° mobile), constant-rate from the first pixel so the article lifts off a deck already mid-spin: 253° behind the article, 177° watched, at about the degrees-per-pixel of the original −300°. ⚠️ How big a turn is and where it ends are two separate decisions — a revolution changes nothing about where anything ends up, which is what lets both be satisfied at once. |
| ~~65~~ | ~~The "stutter" returning home was a velocity step, not a dropped frame~~ | ~~🟡 Medium~~ | ✅ Fixed 2026-09-11 — reported as a momentary stutter at the handover. **Measured first: 16.7ms flat across the commit at 1× and at 4× CPU throttle, zero long tasks.** The real cause: Lenis eases into the bottom of a scroller, so the page's last ~80px produce almost no `de` and the deck arrived at the homepage *stopped* — then the next wheel notch hit the homepage's own scroll-rotation, ~3× faster per pixel. Rotation step at the seam **0.002 → 0.022 rad/frame (11×)**. Committing at `COMMIT_AT` 0.955 and handing over via `endExit(true)` (the catch finishing on a 0.55s tween, `EXIT_FOLLOW` carrying −7° for 0.9s) brings it to **0.010 → 0.011 (1.1×)**. ⚠️ When something "stutters", measure the frame times before assuming they are the problem. |
| ~~66~~ | ~~Both scroll cues were invisible, and each ink failed at the opposite end of the screen~~ | ~~🟠 High~~ | ✅ Fixed 2026-09-11 — reported as *"I didn't see any indication or nudge to scroll and back to homepage"*: both had shipped. Measured on all four heroes, chapter ink at the bottom of the frame was unreadable on every one; light ink was then unreadable on two of them at the TOP. A hero is the chapter's CARD blown up to fill the frame, so what sits under a fixed overlay depends on the card, the orientation and (once the film starts) the frame — the same 6.4rem is pale paper on US at 1440×900 and a night photograph at 390×844 — and the ground **cannot be read from the DOM**, since the hero is the canvas and `elementsFromPoint` falls through it. Near-white with a tight dark outline, both cues at the BOTTOM (the top of the frame is where every hero puts 12vh of Italiana), and the return signal redrawn as a ring that closes. |
| ~~67~~ | ~~The scroll prompt appeared before the page it was prompting~~ | ~~🟡 Medium~~ | ✅ Fixed 2026-09-11 — the cue mounted with the route, so it was on screen for the whole ~1.5s select: *"it shows up immediately, I click on a card, which shouldn't be."* It waits on `cueReady` now, set from the same settle poll that opens scrolling, plus a beat. ⚠️ A prompt keyed to the ROUTE is keyed to the wrong thing whenever the route change is the start of an animation rather than the end of one. |
| ~~68~~ | ~~The scroll cue was the one piece of UI on the site that belonged to no page~~ | ~~🟡 Medium~~ | ✅ Fixed 2026-09-11 — *"too generic and sort of sticks out in a bad way."* It was a rail with a bouncing dot, which is the scroll hint every site on earth has. Every chapter here is built on a line of ink that draws itself as you scroll, so the cue is that same pen: a hairline that draws down over a faint ghost of where the line is going, with the word steady beneath it. ⚠️ The word used to fade in and out on the stroke's cycle — which left the whole cue reading as nothing for about a second in every three, i.e. the "unnoticeable" it was meant to fix. Animate the mark, not the label. |
| ~~69~~ | ~~The nav vanished over the cash panel: a colour read in the wrong units~~ | ~~🟠 High~~ | ✅ Fixed 2026-09-11 — the nav decides its ink by reading the background colour of whatever is under it. `rgb()`/`rgba()` compute to 0–255, but anything written with `color-mix()` — which is how the chapter tints are blended — computes to **`color(srgb r g b / a)`, components in 0–1**. Read as 0–255 that is a luminance of ~0.003, i.e. black, so the nav flipped to its LIGHT ink over a pale panel: measured, wordmark `rgb(232,237,242)` on a `rgb(232,237,242)` ground. ⚠️ Parse the notation, not just the numbers a regex finds in it. |
| ~~70~~ | ~~"Blow it out as if it were clicked" was built as a bigger widget~~ | ~~🟠 High~~ | ✅ Fixed 2026-09-11 — the card was made to morph in place into a 46rem panel, which has its own background and covers what is behind it. What a click already did was open a washed, blurred, boxless overlay, and that is what "as if it were clicked" meant. The overlay is restored and now opens itself over the stretch between the gift list and the signature. ⚠️ **It is no longer teleported to `<body>`**: Lenis listens for wheel on `.chapter-page`, so a layer parented outside that element swallows every wheel event — a panel that opens itself would have trapped the reader behind it. Rendered in place it scrolls through (measured 3,932px with the panel up) and sits under the nav, which keeps the way out reachable. |
| ~~71~~ | ~~The exit staged two thirds of its arrival in a sixth of the scroll, on camera~~ | ~~🟠 High~~ | ✅ Fixed 2026-09-11 — *"I can see the cards rapidly shift up before they start to rotate."* `POSE_HEAD` was ANIMATED over the first 0.16 of `de`: twenty world units of rise at **eight times** the rate of everything after it, then a dead stop until 0.22 — and the article has uncovered 36% of the screen by 0.16, so the burst and the plateau were both visible. The other cards were worse (30–86 units of travel replayed inside 0.14). Both are now PLACED on the first scrubbed frame, `de` ≈ 0.001, where the article still covers everything, and one even curve carries the rest: the ring's rise per 0.04 of `de` went from a 3.8-unit spike to a smooth 0.00→0.70 bell. ⚠️ A head start you have to reach is a burst; a head start you begin from is free — do it in the frame nobody can see, and make the undo explicit. |
| ~~72~~ | ~~The return ring finished late and then sat over the deck like a spinner~~ | ~~🟡 Medium~~ | ✅ Fixed 2026-09-11 — it filled to 1 at `de` 0.50 and lingered to 0.72, which is past the point the article has gone: *"the loading animation should be at the end of the page transiting into a card, not overlaid on the rotating chapter cards… the circle should complete around when the page moves fully off viewport."* It now completes exactly at `DROP_START` — the `de` at which the page has cleared the frame — and is gone a tenth of `de` later. ⚠️ A progress indicator has to be describing something; once the page is gone it is describing nothing, and a ring over a moving deck reads as a loading spinner. |
| ~~73~~ | ~~Pulling up at the top of a chapter looked like nothing was happening~~ | ~~🟠 High~~ | ✅ Fixed 2026-09-11 — *"I can't see any animation when I'm reverse scrolling to return to homepage."* Two causes: the threshold was 800px of wheel, more than a trackpad flick produces, so the ring charged to about half and the 400ms gesture gap threw it away; and the only feedback was at the far end of the screen from the gesture. Now 420px (140px of finger) with a 700ms gap, and the hero card **presses back the way you pull it** — at scroll 0 the whole screen IS that card, so it is the only thing that can answer where the gesture is. Measured: a band of the chapter accent opens at the top of the frame as the ring fills. |
| ~~74~~ | ~~The deck stopped turning the moment the card landed, then started again~~ | ~~🟡 Medium~~ | ✅ Fixed 2026-09-11 — *"on the card dropping into the stack, I still notice a tiny pause before horizontal scroll resumes."* The turn ended at the landing, leaving a stretch of scroll and then the route change with the deck perfectly still. `SPIN_TO` now outlasts the drop (0.98 against a 0.90 landing): 140°/de as the card seats, 44°/de at the commit, where `EXIT_FOLLOW` picks it up. Measured across the handover: −0.158 → −0.100 → −0.093 → −0.089 rad/frame, monotone. ⚠️ It costs nothing in landing accuracy — the turn is 98.7% done at the landing, so the gap is 5.6° off centre. |
| ~~75~~ | ~~The phone carousel had no inertia because the coast was seeded from the last event~~ | ~~🟠 High~~ | ✅ Fixed 2026-09-11 — *"it doesn't even have that inertia feeling where they keep going if I flick em."* The release momentum took the FINAL `touchmove` delta, and a finger decelerates before it lifts, so the last event of a gesture is routinely the smallest one in it: the fastest swipe on the page handed the coast a value near zero and the deck stopped dead. The speed is now read over a 90ms window (summed travel ÷ elapsed span, not ÷ the window — a short or 120Hz gesture would under-report), boosted 1.25×, capped, and decayed at 0.955 (~370ms) rather than 0.94. ⚠️ Frame times were never the problem: 16.7ms at p50 AND p90 on the phone viewport at 6× CPU throttle. |
| 30 | The month-flip would have played entirely below the fold | 🟠 High | ↩️ Moot — the flip was reverted. The RULE stands: `threshold: 0` + a `rootMargin` band is the only trigger shape that cannot go unreachable. See §Issue #30. |
