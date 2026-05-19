# Homepage Audit — Replica vs Original
> Conducted: 2026-05-19  
> Tools: Browserless (Playwright/CDP), original JS bundle analysis, side-by-side Browserless screenshots  
> Scope: Homepage only (chapter.millanova.com vs tobitodili.github.io/la-coco-vie/)

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

## Issue #3 — Noise Texture 404 on GitHub Pages 🟡 MEDIUM

### Symptom
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
baseDistance = 42  // ring radius — may be slightly too small (cards appear closer)
```

### Fix Plan
- Try `baseDistance = 44–46` to push cards slightly further apart
- Or nudge camera to `z = 105`

---

## Issue #5 — SVG Colour Saturation 🟡 MEDIUM

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

### Symptom
Cards at the far side of the ring are too visible in our replica. Original barely shows them.

### Fix Plan
- Add opacity falloff based on card's world Z position
- Cards facing away from camera should fade toward 0 opacity

---

## Issue #7 — Scroll-driven Chapter Exit 🟢 LOW

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
