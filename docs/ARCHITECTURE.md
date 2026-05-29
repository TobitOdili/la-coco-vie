# Architecture

How the replica works, end to end. Read this before editing `composables/useChapterScene.js`.

- [Mental model](#mental-model)
- [State ownership & data flow](#state-ownership--data-flow)
- [File-by-file](#file-by-file)
- [The 3D scene](#the-3d-scene-usechapterscenejs)
- [The shaders](#the-shaders)
- [Lifecycle: intro → idle → select → exit](#lifecycle-intro--idle--select--exit)
- [Interaction reference](#interaction-reference)
- [Base URL & assets](#base-url--assets)
- [Known tech debt](#known-tech-debt)
- [QA workflow (Browserless)](#qa-workflow-browserless)

---

## Mental model

The page is a **single full-screen WebGL canvas** with a thin layer of HTML/Vue chrome
floating on top (nav, cursor, about panel, loader). There are no routes yet — it's a
single SPA view (`app.vue`).

The 3D scene is a **ring of 8 poster cards** (4 chapters, each duplicated on the opposite
side of the ring). The ring is tilted dramatically and viewed at an angle, so it reads as
a diagonal cluster rather than a flat wheel. Scrolling rotates the ring; hovering a card
lifts/flattens it and plays its film; clicking selects a chapter (card fills the screen);
scrolling back exits.

Everything visual is driven by **per-card shader uniforms** animated with GSAP:
`blendFactor` (curved↔flat↔hover), `progress` (carousel↔fullscreen), `uOpacity` (depth fade).

---

## State ownership & data flow

**`app.vue` owns UI state** (selected chapter, audio, about panel, loading). **The scene
owns 3D state** (rotation, hover, selection internals) and notifies `app.vue` via callbacks.

```
            ┌─────────────────────────────── app.vue ───────────────────────────────┐
            │  selectedChapterIdx · soundOn · aboutOpen · loaded · loadProgress       │
            │  (Howler audio is handled INLINE here, not via useAudio.js)             │
            └───────────▲───────────────────────────────────────────────┬────────────┘
                        │ events (emit)                                  │ props / method calls
            ┌───────────┴───────────────── WebGLScene.vue ───────────────▼────────────┐
            │  mounts canvas · registers scene callbacks · forwards DOM events         │
            │  scene.onSelect / onHover / onDeselect / onProgress  →  emit(...)         │
            │  window mousemove → scene.onMouseMove                                     │
            │  VirtualScroll / wheel → scene.onScroll(deltaY - deltaX)                  │
            └───────────────────────────────┬─────────────────────────────────────────┘
                                             │
                              ┌──────────────▼───────────────┐
                              │   useChapterScene() (the 3D)  │
                              │   init · animate loop · GSAP  │
                              └───────────────────────────────┘
```

**Callback contract** (scene → WebGLScene → app):

| Scene callback | Emitted event | `app.vue` handler | Does |
|---|---|---|---|
| `onSelect(chIdx)` | `chapter-select` | `onChapterSelect` | sets selected chapter, title, audio |
| `onHover(chIdx, hovering)` | `chapter-hover` / `chapter-unhover` | `onChapterHover` / `onChapterUnhover` | cursor activate + audio fade |
| `onDeselect()` | `chapter-deselect` | `onChapterDeselect` | resets state (scroll-back exit) |
| `onProgress(pct)` | `progress` | `onProgress` | drives the loader counter |

> **Why two exit paths share one reset:** the back button (`goHome`) and scroll-back both
> need to clear UI state. `goHome` calls `scene.deselectChapter()` (runs the animation) then
> `resetChapterState()`. Scroll-back runs the animation **inside the scene** and fires
> `onDeselect` so `app.vue` only does `resetChapterState()` — the animation isn't run twice.

---

## File-by-file

### `app.vue`
Root component and state owner. Renders `LoadingScreen`, `CustomCursor`, `WebGLScene`,
`SiteNav`, `AboutPanel`. Handles:
- Selection/deselection state + document title + per-chapter body class (`--wine-o-clock`
  etc., which switches the CSS accent-color variables).
- **Audio inline** via Howler (lazy-initialised on first user gesture). Each chapter has a
  looping ambient track; volume fades up on hover (0.12), louder on select (0.5), out on leave.
- Sets `--noise-url` to an **absolute** URL (see [Base URL & assets](#base-url--assets)).

### `components/WebGLScene.vue`
Thin bridge. Mounts the `<canvas>` inside `#canvas-container`, calls `scene.init()`,
registers the scene callbacks, and forwards browser events into the scene. Also contains
`#canvas-hit-layer` — a transparent `pointer-events:auto` div at `z-5` that captures clicks
(the `@click` selection handler lives here) and hosts the VirtualScroll instance.

### `components/CustomCursor.vue`
Self-contained lerped cursor (rAF loop, lerp 0.2). Rest = 24px ring; `.active` = 140px
black disc with "EXPLORE". `activate()` / `deactivate()` are called by `app.vue` on hover.
Positioned via `top`/`left` (not transform) to avoid clipping — see AUDIT #1.

### `components/SiteNav.vue`
Fixed chrome: top row (About · centered MILLA NOVA logo + "Chapter the bride" · Collection),
bottom row (Sarakuz credit · sound toggle). Logo + nav tint with the current `--accent` var.

### `components/AboutPanel.vue`
Full-screen overlay (`z-50`), slides in with a GSAP-free CSS transition. Background uses the
current chapter's `--accentLight`. Static "IMMERSE YOURSELF…" copy.

### `components/LoadingScreen.vue`
Asset-gated counter. Receives `progress` (0–100) from `app.vue`, GSAP-eases the displayed
number toward it, plays a GSAP fade-out on reaching 100. Light-gray, centered, Italiana
number + Over-the-Rainbow `%`. 12 s safety timeout so it can never hang. See AUDIT #12.

### `site.config.js`
Brand/chrome copy in one object (`SITE`) + `googleFontsHref()`. Consumed by `nuxt.config.ts`
(title, fonts), `app.vue` (titles), `SiteNav.vue` (subtitle/nav/credit), `AboutPanel.vue`
(about copy). The single file to edit for a re-skin's text — see CONTENT-AND-ASSETS. (Per-
chapter content stays in `CHAPTERS`; the logo wordmark stays as an `<svg>` in `SiteNav`.)

### `composables/useChapterScene.js` ★
The whole 3D experience. Detailed below.

### `composables/useAudio.js` ⚠️ DEAD CODE
A self-contained audio composable that is **never imported**. `app.vue` reimplements audio
inline instead. Kept for now but safe to delete — see [Known tech debt](#known-tech-debt).

---

## The 3D scene (`useChapterScene.js`)

`useChapterScene()` returns `{ init, onMouseMove, onClick, onScroll, onResize, destroy,
onSelect, onHover, onProgress, onDeselect, deselectChapter, getState }`. It closes over all
scene state (renderer, camera, groups, posters, flags).

### Scene graph
```
scene
├── camera            desktop (0,-15,100) fov 45 · mobile (0,0,110)
├── txtMesh           the floating center-text plane (added to scene root, not the group,
│                     so it ignores the group tilt; lookAt(camera) every frame)
└── groupG            the dramatic tilt: desktop (25°,70°,15°) · mobile (22°,0,0)
    └── carousel      rotates on scroll/select
        └── 8 × mesh  poster cards (each with a child hitbox Mesh for raycasting)
```

### Key constants (top of the composable)
| Const | Value | Meaning |
|---|---|---|
| `N` | 8 | poster slots = 4 chapters × 2 mirror copies |
| `baseDistance` | 40 | ring radius at rest (**confirmed = original `ve=40`**) |
| `introDistance` | 75 | start radius for the fly-in |
| `SELECTED_Y` | -70 | carousel Y when a chapter is selected |
| `DEPTH_FADE_NEAR / FAR` | 95 / 125 | distance range for far-card opacity fade (#6) |
| `DEPTH_FADE_FLOOR` | 0.2 | far cards fade to faint, not invisible |
| `SCROLL_EXIT_THRESHOLD` | 500 | accumulated back-scroll to exit a chapter (#7) |
| `txtMesh.position` | (0,-8,20) | center text; y=-8 clears the logo (#11) |

### Poster slots
Each of the 8 slots is built by `createPoster(i, chapterIdx, logoTexture)`. Slot `i` (1–8)
sits at `intRotationY = i*45°` around the ring. Slots 5–8 are the mirror copies of chapters
1–4 (`chapterIdx = i>4 ? i-4 : i`, 0-based after `-1`). Each poster object stores
`{ mesh, hitbox, material, chapterIdx, i, intRotationY, baseX/Z, introX/Z, baseY }`.

> **Slot `i` vs `chapterIdx` is load-bearing.** Two slots share a `chapterIdx`. Hover must
> key on **slot `i`** (only the card under the cursor reacts — AUDIT #13), while
> audio/video/text/selection key on **`chapterIdx`**. `chapterIdxForSlot(i)` bridges them.

### Front-card detection
`frontChapterIdx()` returns the chapter of the poster whose **world position is nearest the
camera**. This is robust to the combined group-tilt + carousel-rotation (a rotation-angle
calc is not — see AUDIT #14). It drives the center text when idle.

---

## The shaders

Both shaders are inline template strings near the top of `useChapterScene.js`.

### Vertex shader — cylindrical bend
Bends the flat `PlaneGeometry` into an arc so cards curve around the ring. The bend amount
is `angleOfArc = lengthOfArc / axisPosition.z` — i.e. **the ring radius (`axisPosition.z`,
= `baseDistance`) controls curvature**: smaller radius → more curved. `blendFactor` mixes
between the bent (carousel) position and a flat plane (`mix(bentPosition, p, blendFactor)`),
so `blendFactor` 0→1 straightens a card, and 2 is the hover state.

### Fragment shader — layered composite
Composites three textures with `progress`-driven UV transforms:
1. `posterTexture` — the chapter SVG artwork (`p1–p4.svg`)
2. `photoTexture` — the chapter film (`VideoTexture`), shown inside the poster frame
3. `logoTexture` — the Milla Nova logo, tinted with `borderColor` (the chapter accent)

`progress` (0 = carousel, 1 = fullscreen) drives how the poster reframes into a full-screen
layout on selection. Back faces render near-white to blend with the page. The final alpha is
multiplied by `uOpacity` for the depth fade (#6).

> Color: `renderer.outputColorSpace = SRGBColorSpace` and `toneMapping = NoToneMapping` are
> set so SVG/video colors match the original (AUDIT #5).

---

## Lifecycle: intro → idle → select → exit

### Intro (`runIntro`, ~7 s, fired at end of `init`)
1. Carousel spins **720°** over 6 s (`power3.inOut`).
2. Each poster flies in from `introDistance (75) → baseDistance (40)`, staggered.
3. Camera mouse-bias lerps from `(-10,-10)` → `(0.5,0.5)` (strong initial left-push).
4. At 7 s: `introComplete = true`, and the center text snaps to the front card.

### Idle (carousel)
The `animate()` rAF loop each frame:
- Lerps camera parallax from the mouse (spring: `mouse*0.7 - displacement/18`).
- Lerps `carousel.rotation.y` toward `scrollRotationY + animatedRotationY` (factor 0.06).
- Updates per-card `uOpacity` from distance-to-camera (smoothstep 95→125, floor 0.2).
- Keeps `txtMesh` facing the camera and synced to `frontChapterIdx()`.

### Select (`selectChapter(chIdx)`, ~3 s GSAP timeline)
Rotates the chosen chapter's front copy to camera, drops the carousel to `SELECTED_Y`,
flattens `groupG` to `(0,0,0)`, and animates the selected posters `blendFactor→1`,
`progress→1`, `scale→aspectRatio*2.07` (fills screen). Other posters drop away. Sets
`isSelecting` (gates scroll-exit during the animation). Notifies `app.vue` via `onSelect`.

### Exit (`deselectChapter`, ~2.5 s)
Reverses everything: restores group tilt, carousel Y, all poster uniforms/scale/position.
Sets `isDeselecting`. Two triggers:
- **Back button** → `app.vue goHome()` → `scene.deselectChapter()` + `resetChapterState()`.
- **Scroll back** → in `onScroll`, accumulating upward scroll past `SCROLL_EXIT_THRESHOLD`
  calls `deselectChapter()` + fires `onDeselect()` (which resets app state). Down-scroll
  resets the accumulator. (#7)

---

## Interaction reference

| Input | Where handled | Effect |
|---|---|---|
| Mouse move | `window` → `scene.onMouseMove` | camera parallax + raycast hover detection |
| Hover card | `onMouseMove` → `hoverChapter(slotI)` | lift (`y+7`), flatten (`blendFactor→2`), play film, swap center text, cursor "EXPLORE", audio fade-in |
| Wheel / trackpad | `#canvas-hit-layer` VirtualScroll → `onScroll(deltaY - deltaX)` | rotate carousel (idle) **or** accumulate exit (selected). `deltaX` included so horizontal swipes rotate too (#10) |
| Click card | `#canvas-hit-layer` `@click` → `onClick` → `selectChapter` | select chapter. **Requires `pointer-events:auto` on the hit layer** (AUDIT #15) |
| Scroll up (in chapter) | `onScroll` | exit chapter (#7) |
| Back / logo click | `SiteNav` → `app.vue goHome` | exit chapter |

---

## Base URL & assets

The same build must work at `/` (Vercel) and `/la-coco-vie/` (GitHub Pages). Asset paths use
`const asset = p => `${base}${p}`` where `base = import.meta.env.BASE_URL` (baked at build).

⚠️ **CSS `url()` gotcha (AUDIT #3):** a relative `url()` set into a CSS custom property is
resolved by the browser relative to the **CSS bundle** (`_nuxt/…`), not the document — which
404s. So `--noise-url` is built with `new URL(path, window.location.href).href` to force an
absolute URL. Apply the same pattern for any future CSS-var asset paths.

---

## Known tech debt

| Item | Notes |
|---|---|
| `composables/useAudio.js` | **Dead code** — never imported; `app.vue` does audio inline. Safe to delete (verify no future import first). |
| `dist` symlink | Tracked in git but points to a stale Linux path (`/data/.openclaw/...`). Broken locally; should be `git rm`'d. |
| `#4` ring tilt | Parked — replica reads slightly more face-on than the original. Needs the original's exact group rotation (couldn't extract cleanly). See AUDIT #4. |
| Hardcoded deselect angles | `deselectChapter` hardcodes `(25°,70°,15°)`; if the group tilt ever changes, update it there too. |

---

## QA workflow (Browserless)

Visual parity is checked against the live original via **Browserless** (cloud headless
Chrome over CDP). The token lives only in the local QA scripts under `/tmp/bless/` — **never
commit it.** Scripts use `playwright-core` + `sharp` to capture and stitch comparisons.

Hard-won gotchas (keep these in mind):
- **WebGL intro:** wait ~12–13 s after load before a steady-state screenshot.
- **Early frames / loader:** `page.screenshot()` blocks on font loading and times out during
  load — use raw CDP `Page.captureScreenshot` instead. Throttle the network
  (`Network.emulateNetworkConditions`) to hold the loader on screen.
- **Matched comparisons:** pin the mouse to center before capturing (parallax shifts the
  camera). The two sites may still rest at different carousel rotations.
- **Clicking/hovering cards:** hitboxes are flat `BoxGeometry` at each card's center while the
  visible card is shader-curved — aiming at the visible card misses. **Sweep the mouse and
  watch for `.cursor.active`** to find a real hitbox, then click that point.
- **Viewport quirk:** under `connectOverCDP`, `window.innerWidth/Height` may report 800×600
  while the screenshot canvas is larger — judge layout from computed styles, not screenshot px.
- **Extracting the original's params:** scene objects are in closures, but matrices reach the
  GPU — hook `uniformMatrix4fv` to read camera fov/aspect (force a re-upload via resize). This
  is how #4's "fov 45 / radius 40 already match" was confirmed.
