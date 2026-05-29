# Homepage Audit — Replica vs Original
> Conducted: 2026-05-19  
> Tools: Browserless (Playwright/CDP), original JS bundle analysis, side-by-side Browserless screenshots  
> Scope: Homepage only (chapter.millanova.com vs the replica)

> **Doc map:** this file is the **forensic issue history** — per-issue root causes, fixes,
> and commit refs (numbered #1–#15). For orientation start at [`README.md`](README.md);
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
| ~~3~~ | ~~Noise texture 404 — relative `--noise-url` resolves vs the `_nuxt/` CSS bundle~~ | ~~🟡 Medium~~ | ✅ Fixed (`1078a8f3`) — resolve `--noise-url` to an absolute URL via `new URL(path, location.href)`. Affected Vercel too (not just GH-Pages). Grain verified rendering live. |
| 4 | Card scale → actually ring viewing-angle (tilt) | 🟡 Medium | ⏸️ Parked — GPU extraction confirms fov 45° + radius 40 already match; residual is subtle tilt, no clean target. See §Issue #4. |
| ~~5~~ | ~~SVG colour saturation~~ | ~~🟡 Medium~~ | ✅ Closed — `NoToneMapping`+`SRGBColorSpace` already set; colours match in side-by-side. |
| ~~6~~ | ~~Background card opacity falloff~~ | ~~🟢 Low~~ | ✅ Fixed (`26ee0406` + `52b8cf9b`) — `uOpacity` uniform driven by per-card distance to camera (smoothstep 95→125, floor 0.2); far cards now faint ghosts like the original. Verified live. |
| ~~7~~ | ~~Scroll-driven chapter exit~~ | ~~🟢 Low~~ | ✅ Fixed (`bcc9b342`) — back-scroll past threshold runs the reverse animation via `onScroll`; `onDeselect` callback resets app state. Verified live. |
| ~~15~~ | ~~Chapter selection broken — hit layer click-transparent~~ | 🔴 High | ✅ Fixed (`bbedb5ec`) — `#canvas-hit-layer` inherited `pointer-events:none`; clicks fell through to `.app-root` so `@click` never fired. Set `pointer-events:auto`. Found while verifying #7; verified live (clicking now selects). |
