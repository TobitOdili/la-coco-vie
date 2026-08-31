# Architecture

How the scene works, end to end. Read this before editing `composables/useChapterScene.js`.

> **▶▶ Re-skinned to the Covenant &amp; Uvie wedding site (2026-07-23).** The engine is unchanged; the
> four chapter **slugs are now** `us` / `the-big-day` / `in-frames` / `with-love`. Older examples in
> this doc using `wine-o-clock` / `eat-marry-love` etc. describe the same mechanics with the old
> slugs. Each chapter now renders a **bespoke** inner-page component (`UsStory` / `BigDay` /
> `InFrames` / `WithLove`) selected in `pages/[slug].vue`; the generic `ChapterSection` loop is the
> unused fallback. Bespoke components must keep `.chapter-section` + `data-idx` roots (the floating-
> card observer keys on them). Homepage hover/click resolve the card under the pointer via
> `posterAtScreen()` (not the front-only shortcut). See [`PHASE-2-INNER-PAGES.md`](PHASE-2-INNER-PAGES.md).

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

The page is a **persistent full-screen WebGL canvas** with a thin layer of HTML/Vue chrome
floating on top (nav, cursor, about panel, loader) **plus a routed `<NuxtPage/>`**. `app.vue`
is the persistent shell (the scene never unmounts → no intro replay); the **URL is the source
of truth** for which chapter is open (`/` = homepage carousel, `/{slug}` = that chapter selected
+ its inner page).

The 3D scene is a **ring of 8 poster cards** (4 chapters, each duplicated on the opposite
side of the ring). The ring is tilted dramatically and viewed at an angle, so it reads as
a diagonal cluster rather than a flat wheel. On the homepage: scrolling rotates the ring;
hovering a card lifts/flattens it and plays its film; **clicking selects the front-facing
chapter** → the card flattens + grows into the inner-page **hero** and the URL changes to
`/{slug}`. On the inner page: the hero is **coupled to scroll** (it rises away as you read —
"card becomes the page"), and the chapter is exited two ways — overscrolling past the **top edge**
(reverse rewind), or scrolling **down** into a transparent `.chapter-outro` "outro" section that maps
scroll → `de` 0→1 → `setExitProgress(de)`: the page scrolls out, the ring reassembles on the chapter's
accent background and drops its card back in (see [Lifecycle → exit](#exit-edge-gated-in-pagesslugvue)).

Everything visual is driven by **per-card shader uniforms** animated with GSAP:
`blendFactor` (curved↔flat↔hover), `progress` (carousel↔fullscreen), `uOpacity` (depth fade).

> ⚠️ This doc was reconciled with the code on **2026-06-12** after the "card-becomes-the-page"
> rework. If a section disagrees with the code, the code wins — and please fix the doc. The
> live status/roadblocks/next-steps board lives in
> [`PHASE-2-INNER-PAGES.md`](PHASE-2-INNER-PAGES.md) (read that first for a cold pickup).

---

## State ownership & data flow

**`app.vue` owns UI state** (selected chapter, audio, about panel, loading). **The scene
owns 3D state** (rotation, hover, selection internals) and notifies `app.vue` via callbacks.

```
            ┌─────────────────────────────── app.vue ───────────────────────────────┐
            │  selectedChapterIdx · soundOn · aboutOpen · loaded · loadProgress       │
            │  (Howler audio is handled INLINE here, not in a separate composable)    │
            └───────────▲───────────────────────────────────────────────┬────────────┘
                        │ events (emit)                                  │ props / method calls
            ┌───────────┴───────────────── WebGLScene.vue ───────────────▼────────────┐
            │  mounts canvas · registers scene callbacks · forwards DOM events         │
            │  scene.onSelect / onHover / onProgress  →  emit(...)                      │
            │  window mousemove → scene.onMouseMove                                     │
            │  window wheel → scene.onScroll(deltaY − deltaX)  (homepage carousel only) │
            │  (inner-page scroll is owned by pages/[slug].vue via Lenis → setScroll)   │
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
| `onSelect(chIdx)` | `chapter-select` | `onChapterSelect` | a click-select happened → push `/{slug}` |
| `onHover(chIdx, hovering)` | `chapter-hover` / `chapter-unhover` | `onChapterHover` / `onChapterUnhover` | cursor activate + audio fade |
| `onProgress(pct)` | `progress` | `onProgress` | drives the loader counter |
| `onReady(cb)` | — (direct) | — | fires once when the intro ends → app applies any deep-link |
| `onFrontChapter(idx)` | `chapter-front` | `onChapterFront` | front-facing chapter changed → tint the explore cursor + gate the parked EXPLORE button |

> **Routing is the single source of truth (the big change from Phase 1).** Selection is no
> longer app-local state — it's derived from `route.params.slug`. A `watch(route.params.slug)`
> (`syncSceneToRoute` in `app.vue`) drives `scene.selectChapter` / `deselectChapter` on every
> URL change (browser back/forward, deep links, in-app pushes). It's guarded by
> `scene.getState()` so it never double-runs an in-flight animation, and it **re-syncs after a
> short delay** (`scheduleResync`) if an animation is mid-flight (so back-then-forward lands
> correctly). On a fresh deep-link load it defers via `scene.onReady()` until the 7 s intro ends.
> All exit *intents* funnel to `router.push('/')`; the page edges and the back button just push.

---

## File-by-file

### `app.vue` — the persistent shell
Root component + state owner. Renders `LoadingScreen`, `CustomCursor`, `WebGLScene`,
`<NuxtPage/>` (routed inner page), `SiteNav`, `AboutPanel` — none of which unmount across
routes (so no intro replay). Handles:
- **Routing as source of truth**: `selectedChapterIdx` / `isHome` / accent / body class are
  all *computed* from `route.params.slug`. The route watcher (`syncSceneToRoute`) drives the
  scene's select/deselect; `provide('webglSceneRef', …)` so the routed page can reach the scene.
- Document title via `useHead({ title })` (assigning `document.title` directly gets clobbered
  by Nuxt once `pages/` is active).
- **Audio inline** via Howler (lazy-initialised on first user gesture). Each chapter has a
  looping ambient track (`CHAPTERS[i].audio`, `html5:true`) + a `tick` sound; volume fades up on
  hover (0.12), louder on select (0.5), out on leave; the `SiteNav` sound toggle mutes Howler
  globally. This is a faithful port of the reference's audio (verified 2026-07-23 via Browserless —
  `chapter.millanova.com` uses the same Howler.js + the same files). ⚠️ **The 4 tracks are
  PLACEHOLDERS** (the reference's own mp3s, named off the old chapter slugs) — swap for the couple's
  wedding music and update `CHAPTERS[i].audio`. (`useAudio.js` was a *separate* never-imported
  composable, deleted 2026-07-23; it was not this working path.)
- Sets `--noise-url` to an **absolute** URL (see [Base URL & assets](#base-url--assets)).

### `pages/index.vue` + `pages/[slug].vue`
`index.vue` is **inert** (the WebGL carousel *is* the homepage; this just renders nothing).
`[slug].vue` is the chapter inner page: validates the slug against `CHAPTERS` (unknown →
`navigateTo('/')`), renders `CHAPTER_PAGES[slug]` content when present (else a scaffold), and
owns the inner-page scroll + exit:
- **Lenis** smooth scroll (wrapper `.chapter-page`, content `.chapter-scroll`); each scroll
  tick → `scene.setScroll(px)` for the 1:1 hero coupling (P1), **and** → `updateExit(scroll)`.
- **Top-edge exit** via a `wheel` listener (gated until the select-in settles): overscroll up past
  the **top** edge past `EXIT_THRESHOLD` (800 px) → `doExit()` → `router.push('/')` → route watcher →
  `deselectChapter()` (reverse rewind; DOM unmounts on navigate, one WebGL motion). `doExit()` takes
  no args — only the top edge calls it.
- **Bottom-edge exit (BUILT, scroll-driven)** via a transparent `.chapter-outro` section (250vh)
  below the article. `updateExit(scrollY)` maps scroll position → `de` 0→1: over the first leg the
  article scrolls fully out (`de` 0→`DROP_START`), then over the rest the ring's card drops in
  (`DROP_START`→1), calling `scene.setExitProgress(de)` each tick. Scrolling back up before commit →
  `cancelExit()` (restores the article); `de`→1 (page bottom) → `commitExit()` → `endExit()` then
  `router.push('/')`. Fully reversible, no morph/snapshot — the old snapshot / page-shrink "literal
  merge" machinery is gone. **Feel-tuning is the remaining work — see
  [PHASE-2-INNER-PAGES.md](PHASE-2-INNER-PAGES.md) (M2 Chunk B).** See [Lifecycle → exit](#exit-edge-gated-in-pagesslugvue).

### `composables/chapterPages.js`
Inner-page content (`CHAPTER_PAGES[slug].sections[]` + the `DRESSES` table). Lightweight data
module — no three/gsap. Only Wine O'Clock is filled in; others fall back to the scaffold.

### Inner-page components (`components/chapter/`)
Each chapter has a **bespoke** page component, selected by slug in `pages/[slug].vue`. **They
deliberately share no visual vocabulary** — that rule matters more than any motif, and breaking it is
what made With Love read as a repeat of US and get rebuilt.

| file | what it is | how it moves |
|---|---|---|
| `UsStory.vue` | margin notes — two handwritten voices, taped polaroids | `.scrub` / `.fade` per scene |
| `BigDay.vue` | "The Calendar" — October 2026 as a wall-calendar page, the two wedding days ringed in marker; hover/tap a ringed date to swap the detail panel | IntersectionObserver latch: it sets, then holds still |
| `InFrames.vue` | a **projector** in front, **three spools of the same film crossing behind it**; the 3·2·1 leader runs inside the gate, then exposures are pulled through notch by notch | notch-locked pull for the gate; one constant-rate transform for the spools |
| `WithLove.vue` | the ink wanders past scattered gift words and **lassoes** each | measured spline + `.scrub`/`.write` |

**The shared engine** is an rAF loop per component: it reads each scene's `getBoundingClientRect()`
every frame and drives per-element `data-window="a,b"` attributes → `strokeDashoffset` (`.scrub` SVG
paths with `pathLength=1`), `opacity` (`.fade`), an L→R clip reveal (`.write`), or a top→bottom clip
(`.drawdown`). Reversible, follows Lenis exactly, ~zero media.

⚠️ **Five rules these components keep re-learning the hard way:**
1. **Bespoke components MUST render `.chapter-section` roots with `data-idx`** — the floating-card
   observer in `[slug].vue` keys on them.
2. **A template ref used inside `v-for` is collected as an ARRAY.** `el.value.style` is then
   `undefined` and throws on the first frame; because the throw precedes the `requestAnimationFrame`
   at the end of `tick()`, **the entire rAF loop dies silently** — the page looks half-alive (images
   load, nothing animates) rather than broken. Query the DOM inside `tick()` instead.
3. **Never animate an entrance *on top of* something already moving.** The two transforms sum (~2×)
   and a smoothstep peaks at 1.5× its own average on top of that. In Frames' spools start off-screen
   and travel at **one constant rate** for entry, crossing and exit — the entrance IS the run.
   **Corollary worth knowing:** you can still choreograph order without touching speed. A strip takes
   `R` of travel to fill and `R` to empty (R = the room's width along its axis) *whatever its length*,
   so offsets `R` apart give strictly sequential entry, and a **shorter film empties sooner** — which
   is how In Frames arrives 1·2·3 and leaves 3·2·1 with every spool at the same rate. Reach for
   geometry before you reach for per-element timing.
4. **Measure, don't author.** With Love's curve is splined through the words' real positions; In
   Frames solves its slot count, frame pitch, film length, cross distance and stagger from the
   laid-out DOM. That is what makes both survive any breakpoint. **Re-measure after
   `document.fonts.ready`** — web fonts change text metrics and leave geometry pointing at where the
   text used to be.
5. **`overflow:hidden` on a scene root kills `position:sticky`** (the root becomes the containment
   box). Put it on the sticky child.

⚠️ **Class names in scoped CSS still collide with TAILWIND's utility layer.** `<style scoped>` scopes
the selector, not the NAME, so a component class called `ring` also matches Tailwind's `.ring`
utility — which is how every ringed date on the calendar acquired a 1px square box-shadow that no
amount of `border: 0` could remove (AUDIT #26). Avoid `ring`, `grid`, `container`, `shadow`,
`hidden`, `block`, `fixed`… — prefix instead (`marker-ring`, `cal-grid`).
⚠️ **A `<button>` needs `appearance: none`,** not just `border: 0`, or the UA paints its native
widget frame.
⚠️ **Motion has to stop where the page's job is to be READ** (The Big Day, 2026-08-31). That page
was a thread drawn continuously through every scene with the venue and times hung off it, and the
user's note was that it "takes the attention off the info". Peripheral motion beats static text every
time, so an address could never hold the eye. It now has **no rAF loop at all**: an IntersectionObserver
latches each sheet on first enter, a ~1.3s stagger sets it, and then nothing on the page moves again.
Use the scrub engine when the motion IS the content; use a latch when the content is the content.
⚠️ **Bottom padding cannot push copy clear of the floating popup dock.** `.popup-stack` is `fixed` to
the viewport bottom, and once a scene outgrows `100dvh` its sheet is pinned by padding-**top** — so
raising padding-bottom just grows the section and leaves the copy at the same viewport y (measured:
identical with 11rem and with 0). Shorten the column instead, and keep popup `params` to one line.

⚠️ **A pinned section should be as long as its FOREGROUND needs** (In Frames, 2026-08-31). The
scene's height comes from `exposures.length`, and the background spools are driven at a fixed
px-of-film-per-px-of-scroll (`SPOOL_REF_TRAVEL_VH`, their original pace) instead of `progress ×
total`. That decoupling is the whole trick: the pin can be re-cut to whatever the projection needs
without the background changing speed, and the reel is simply still crossing when the section
releases. Tying the pin to the background's full journey is what made this section outstay its
welcome at 8.6 screens; it is 5.4 now.

⚠️ **In Frames' reel is BACKGROUND, not overlay** (2026-08-31). The spools carry the room's own
colour wash and its grain, and have **no shadow and no rim light** — both are "I am above the
surface" cues. One knob does it: `--reel-veil` on `.reel-sticky` (0.34; `--reel-veil-hover` 0.62
surfaces a strip you touch). Because the backdrop is the room's flat colour, a plain group opacity
*is* the colour overlay — no separate tint layer is needed, and compositing the strip as one group
stops the stock, perforations and frames dimming each other where they overlap.
⚠️ The dimmed "COVENANT & UVIE PRESENT" line now paints **above** the spools (it is page text; the
reel is the page's backdrop). It is `inset: 0`, so it needs `pointer-events: none` — otherwise it
also hit-tests above the strips and silently eats the whole-strip hover.

⚠️ **Two rendering traps worth knowing:** a wide absolutely-positioned child of a long transformed
strip rasterises as **its own layer and settles a beat late** (In Frames' perforations "caught up"
after the film stopped until they became background layers on the film itself); and an `<img>` with
`height:auto` is **0px tall until it decodes**, so `loading="lazy"` can collapse a whole layout —
reserve the ratio or load eagerly.

`ChapterSection.vue` is the generic section block, now only the unused fallback. `PopupCard.vue` is
the floating card pinned bottom-centre (photo + url both optional). `ChapterEnd.vue` = the shared
"See you there — RSVP" footer; In Frames tightens it via `.--in-frames .chapter-end` in `main.css`.

Textures (`public/images/cu-*`) are generated — see [`scripts/README.md`](../scripts/README.md)
(`npm run gen:textures`).

### `components/WebGLScene.vue`
Thin bridge. Mounts the `<canvas>` inside `#canvas-container`, calls `scene.init()`,
registers the scene callbacks, and forwards browser events into the scene. Contains
`#canvas-hit-layer` — a transparent `pointer-events:auto` div at `z-5` that captures clicks
(the `@click` selection handler lives here).
> Homepage scroll is a **`window`-level `onWheel` listener** → `scene.onScroll`. (The old
> `virtualscroll` dep was dead — an unrelated custom-scrollbar widget whose constructor threw — so a
> `catch`-installed wheel listener was always the real handler; the dead path + dep were removed
> 2026-06-12.) **Touch was added 2026-07-22**: `touchstart/move/end` on `#canvas-hit-layer` feed
> `scene.onScroll` (mirroring the wheel's `deltaY - deltaX`, ×2.5) with release momentum, plus a
> tap-vs-swipe guard. `touch-action: none` on that layer is load-bearing — without it the browser
> claims the gesture and the ring never turns. `scene.onScroll` no-ops while a chapter is open (the
> inner page owns scrolling), so the global listener is harmless there.

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

### `composables/chapterPages.js`
Inner-page content as pure data: `CHAPTER_PAGES[slug].sections[]` (each bespoke component reads the
fields it needs — `notes`/`caption` for US; `time`/`lines`/`vow` for Big Day; a single `kind:'reel'`
section with `frames[]` for In Frames; `kind`/`memory`/`items[]` for With Love) + the `POPUPS` table
(floating-card content). All copy/dates/registry here are PLACEHOLDERS. ⚠️ Four `reg*` popup entries
are **orphaned** — With Love shows its items in the page now.

---

## The 3D scene (`useChapterScene.js`)

`useChapterScene()` returns `{ init, onMouseMove, onClick, onScroll, onResize, destroy,
onSelect, onHover, onFrontChapter, onProgress, onReady, selectChapter, deselectChapter, setScroll,
beginExit, setExitProgress, cancelExit, endExit, getState }`. It closes over all scene state
(renderer, camera, groups, posters, flags). `getState()` → `{ selectedIndex, hoveredIndex,
introComplete, isSelecting, isDeselecting }`. (There is no `exitChapterDrop` / page-card /
snapshot export anymore — that machinery was removed.)

- `selectChapter(chIdx)` / `deselectChapter()` — entry + the **top/back-button** exit. `deselectChapter`
  snaps the hero to `baseY`, **reverse**-spins `animatedRotationY → preSelectRot`, re-tilts the group,
  restores carousel-Y + all poster uniforms/scale/position. (Driven by the route watcher.)
- `setScroll(px)` — inner-page scroll position → 1:1 hero coupling (P1).
- `beginExit()` / `setExitProgress(0→1)` / `cancelExit()` / `endExit()` — the scrubbable **bottom-exit
  primitives** that reassemble the ring (mirror the reference's scroll-driven "outro", which never morphs
  the page). `beginExit` captures the selected/scrolled state (`exitStart`); `setExitProgress` is
  **two-phase** around `DROP_START` (0.45): phase A [0..0.45] the article scrolls out while the deck
  gathers into a low, steeply-tilted **cluster** (`BOWL_Y` −58, `BOWL_TILT`, radius → `CLUSTER_R` 18) and
  spins; phase B [0.45..1] the cluster **unfurls** back out to the full ring, rising + un-tilting to the
  homepage, while the chapter's **second** card copy descends from off-top into its slot. **All 8 cards
  stay present and visible** — ONE copy of the chapter's card rides in the deck the whole time; only the
  second drops in. The radius grows **monotonically** (`ss(t)`); an earlier version dipped 40→18→40 and
  read as "shrinks first, then expands" — don't reintroduce it. Because x/z are animated, `cancelExit`,
  `endExit` and `deselectChapter` all restore the ring; `endExit` is called ALONE when Back is pressed
  mid-scroll, so it snaps the full homepage pose rather than assuming `setExitProgress(1)` ran.
  The spin uses `EXIT_SPIN` (**negative**, −300°) so it turns the same way a homepage down-scroll does
  → no spin reversal landing on `/`. `cancelExit` lerps every transform back to the captured start (user
  scrolled back up before committing); `endExit` finalizes the homepage ring (`selectedIndex = −1`). The
  inner page's `.chapter-outro` section drives `de` by scroll position (`updateExit`); the `?debug`
  `__exitScrub/__exitEnd` hooks also call them. See [PHASE-2-INNER-PAGES.md](PHASE-2-INNER-PAGES.md).
- `onReady(cb)` — fires once at intro end (deep-link selection is deferred until then).

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
| `SELECTED_Y` | **-43** | carousel Y when a chapter is selected (top-anchors the full-bleed hero) |
| hero scale | `aspectRatio * 2.07` | reference-tuned full-bleed scale at `progress=1` |
| `EXIT_SPIN` | **`−300°`** | ring spin for the `setExitProgress` bottom-exit; **negative** so it turns the same way a homepage down-scroll does → no spin reversal landing on `/` |
| `DROP_START` | `0.45` | `de` split between phase A (page-out + bowl-assemble) and phase B (card drop). **Must match the copy in `pages/[slug].vue`.** |
| `BOWL_Y` / `BOWL_TILT` | −58 / steep | the low "look-into-the-cylinder" bowl the ring assembles into during phase A |
| `DEPTH_FADE_NEAR / FAR` | 95 / 125 | distance range for far-card opacity fade (#6) |
| `DEPTH_FADE_FLOOR` | 0.2 | far cards fade to faint, not invisible |
| `txtMesh.position` | (0,-8,20) | center text; y=-8 clears the logo (#11) |

> The old `SCROLL_EXIT_THRESHOLD` (scene-level scroll-back exit, #7) was **removed** — exits now
> live in `pages/[slug].vue` at the page edges (`END_EXIT_THRESHOLD = 800` px overscroll there).

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
- Lerps camera parallax from the mouse (spring: `mouse*0.7 - displacement/18`). The mouse input
  is **clamped to ±1.2 once `introComplete`** — a background-tab load suspends rAF and starves the
  intro's mouse tween, which otherwise dragged the camera way off-axis until the first mousemove.
- Lerps `carousel.rotation.y` toward `scrollRotationY + animatedRotationY` (factor 0.06).
- Updates per-card `uOpacity` from distance-to-camera (smoothstep 95→125, floor 0.2).
- Keeps `txtMesh` facing the camera and synced to `frontChapterIdx()`.
- **While a chapter is open**: drives the hero up from `setScroll`'s value (1:1 screen coupling, P1)
  — except during the select-in / exit animations, which own the hero transform.

### Select (`selectChapter(chIdx)`, ~3 s GSAP timeline)
The chosen chapter becomes a single full-bleed **hero**:
- Clears any active hover first (hover is gated while selected, so it could never un-fire).
- `targetRot = toRad(φ−90) − scrollRotationY` — parks the hero front-centre **regardless of how
  far the homepage carousel was scrolled** (the `− scrollRotationY` is load-bearing; without it,
  scroll-then-click parked the card off-axis).
- Drops the carousel to `SELECTED_Y`, flattens `groupG` to `(0,0,0)`, eases the camera back to
  its on-axis base, and animates **the single front copy** (`selectedHero`) `blendFactor→1`,
  `progress→1`, `scale→aspectRatio*2.07`. All other posters drop away.
  - ⚠️ **`selectedHero` = the copy of `chIdx` CURRENTLY NEAREST the camera** (the card actually
    clicked), chosen by a min-`distanceToSquared` scan — **not** `posters.find()`. Each chapter
    has two identical copies 180° apart; `posters.find()` always returns the lower one (slots
    1–4), so whenever the **mirror** copy (5–8) was in front, the old code made the *back* copy
    the hero and spun the deck to bring its twin round — the clicked card rotated away (fixed
    2026-07-23). The forced-forward `targetRot` normalization then spins the chosen (front) copy
    ~360° and lands it front, so the clicked card is the hero with no spin reversal.
- `onComplete`: clears `isSelecting`, re-applies the hero scale from the *current* aspect (resize
  safety), and **plays the chapter film** (covers deep-link selects that never hovered).
- The select + deselect timelines are tracked (`selectTl` / `deselectTl`) and killed if interrupted,
  so rapid back/forward can't leave a stale `onComplete` clobbering state.

### Exit (in `pages/[slug].vue`)
There is **no scene-level scroll-back exit** (`scene.onScroll` no-ops while selected). The inner page
drives two exits — a top-edge reverse rewind and a scroll-driven bottom "outro":

| Trigger | Animation | Path |
|---|---|---|
| **Back button / nav logo** (any time) | reverse-spin into the ring | `router.push('/')` → watcher → `deselectChapter()` |
| **Top edge**, overscroll up | reverse rewind | `doExit()` → `router.push('/')` → `deselectChapter()` |
| **Bottom**, scroll down into `.chapter-outro` (BUILT) | scroll-coupled ring reassembly + card drop | `updateExit` → `setExitProgress(de)` → `commitExit` → `endExit` + `router.push('/')` |

- **`doExit()`** (`pages/[slug].vue`): fires once **top-edge** overscroll exceeds `EXIT_THRESHOLD`
  (800 px); stops Lenis and `router.push('/')` (DOM unmounts → only WebGL animates). It takes no args —
  only the top edge calls it.
- **`deselectChapter()`** (~2.5 s, top/back): snaps the hero to ring-centre (`baseY`), reverse-spins
  `animatedRotationY → preSelectRot`, restores tilt / carousel-Y / all posters. Smooth from the top
  (hero already on-screen at scroll 0).
- **Bottom exit — BUILT, scroll-driven (M1 + M2 Chunk A, prod-verified).** A transparent
  `.chapter-outro` section (250vh) sits below the article. Each Lenis tick calls `updateExit(scrollY)`,
  which maps scroll position → `de` 0→1 → `scene.setExitProgress(de)` — fully scroll-coupled and
  reversible (scroll back up → `cancelExit()` restores the article), no page morph or snapshot. It runs
  in **two phases** around `DROP_START` (0.45, present in *both* this file and `useChapterScene.js`):
  phase A [0..0.45] the article scrolls fully out + the deck gathers into the low cluster (`BOWL_Y`,
  `BOWL_TILT`, radius → `CLUSTER_R`) and spins — **all cards present**; phase B [0.45..1] the cluster
  unfurls back to the full ring and rises/un-tilts home while the chapter's **second** card copy descends
  from off-top into its slot (the first already rides in the deck). The spin uses a
  **negative** `EXIT_SPIN` (−300°) so it matches a homepage down-scroll → no reversal at `/`. Throughout,
  the scene background is the **chapter accent** (`renderer.setClearColor(exitBg, exitBgAlpha)` in
  `animate()`; `exitBg` set + faded in by `selectChapter`, driven 1→0 over `de` 0.7→1 by
  `setExitProgress`, faded out by `deselectChapter`/`endExit`) — the ring spins on e.g. wine `#353454`,
  fading to the light homepage. `de`→1 → `commitExit()` → `endExit()` (`selectedIndex = −1`) then
  `router.push('/')`. **DONE and user-approved 2026-07-22** — see
  [PHASE-2-INNER-PAGES.md](PHASE-2-INNER-PAGES.md) for the tunables (`CLUSTER_R`, `BOWL_Y`/`BOWL_TILT`,
  `DROP_START`, `EXIT_SPIN`, `HERO_FIT_END`).
- The select-in's idle depth-fade `uOpacity` lerp in `animate()` is gated on `!isDeselecting` so
  `setExitProgress` owns the chapter cards' opacity during the bottom exit.
- Mid-page scrolling is **free**; the bottom exit only engages once you scroll into `.chapter-outro`.

---

## Interaction reference

| Input | Where handled | Effect |
|---|---|---|
| Mouse move | `window` → `scene.onMouseMove` | camera parallax + raycast hover detection |
| Hover card (homepage) | `onMouseMove` → `hoverChapter(slotI)` | lift (`y+7`), flatten (`blendFactor→2`), play film, swap center text, cursor "EXPLORE", audio fade-in |
| Wheel / trackpad (homepage) | `onWheel` window listener → `scene.onScroll(deltaY − deltaX)` | rotate the carousel (`deltaX` so horizontal swipes rotate too, #10). **No-op while a chapter is open.** Touch isn't wired (would need `virtual-scroll`). |
| Click (homepage) | `#canvas-hit-layer` `@click` → `onClick` → selects the **front-facing** card | The flat hitboxes don't follow the shader bend, so `onClick` selects `frontChapterIdx()` (what the center text shows), not the raw raycast hit. Requires `pointer-events:auto` (AUDIT #15). |
| Wheel (inner page) | `.chapter-page` (Lenis) + a `wheel` listener | mid-page = smooth scroll (drives the hero coupling); **top-edge overscroll** → reverse exit; **scrolling into `.chapter-outro`** → scroll-coupled bottom exit (`updateExit` → `setExitProgress`) (see Lifecycle → exit) |
| Back / logo click | `SiteNav` → `app.vue goHome` → `router.push('/')` | exit chapter (reverse-spin) |

---

## Base URL & assets

The same build must work at `/` (Vercel) and `/la-coco-vie/` (GitHub Pages). **All public-asset
URLs go through one helper — `asset()` in [`utils/asset.js`](../utils/asset.js)** — and nothing
else should build them by hand.

⚠️ **`import.meta.env.BASE_URL` DOES NOT WORK for this** (fixed 2026-08-10; it had been the
mechanism, and this doc previously documented it). Nuxt hardcodes Vite's client `base` to `'./'`
for **production** builds — its own bundle assets resolve through the build manifest instead — so
`BASE_URL` is `'./'` regardless of `app.baseURL`, and `NUXT_APP_BASE_URL=/la-coco-vie/` does not
change it. Every public asset URL therefore came out **relative** (`./images/cu-p1.png`), which:

- **worked on Vercel by luck** — served at the root, and `/with-love` carries no trailing slash,
  so `./images/…` resolved to `/images/…`; but
- **404'd on GitHub Pages**, which serves prerendered routes **with** a trailing slash
  (`/la-coco-vie/with-love/`), so it resolved one level too deep:
  `/la-coco-vie/with-love/images/cu-p1.png`. Every image on every inner page was broken there.

The base is now baked in at build time by `vite.define.__APP_BASE__` in `nuxt.config.ts` (same
value as `app.baseURL`), so `asset('/images/x.png')` yields `/images/x.png` on Vercel and
`/la-coco-vie/images/x.png` on Pages. **Verify a base-path change by grepping the built bundle**
(`grep -o '"/\(images\|video\|audio\)/[^"]*"' .output/public/_nuxt/*.js`), not just the rendered page.

⚠️ **CSS `url()` gotcha (AUDIT #3):** a relative `url()` set into a CSS custom property is
resolved by the browser relative to the **CSS bundle** (`_nuxt/…`), not the document — which
404s. So `--noise-url` is built with `new URL(asset(path), window.location.origin).href` to force
an absolute URL. (It resolved against `window.location.href` until 2026-08-10 — fine only while
the path was already absolute; `origin` is the trailing-slash-proof form.) Apply the same pattern
for any future CSS-var asset paths.

---

## Known tech debt

| Item | Notes |
|---|---|
| **Orientation-dependent constants** | Several scene constants look universal but are **landscape-derived**, and portrait broke on every one: `aspectRatio * 2.07` (really fill-width at the *desktop* camera distance — now derived by `heroFillScale()`), `SELECTED_Y -43` (now `SELECTED_Y_MOBILE`), the card-hide offset (must clear the frustum at the ring's DEEPEST card, ±62, not the front's ±29), and the fixed 60-unit wordmark plane (now `fitTxtMesh()`). Check `isMobile` before assuming a constant is universal. |
| **Hover/click resolution** | The flat raycast hitboxes don't follow the shader bend, so a raycast can't say *which* card was hit — the picker was deleted 2026-08-11. Hover is now **screen-space containment**: project each poster's box and test whether the pointer is inside it. Three rules, each fixing a real bug — (1) candidates must be in the **near half** and **`uOpacity ≥ 0.75`**, so faded background cards can't be hovered (they were swapping the centre wordmark to an invisible chapter); (2) **acquire ≠ release** — the release territory is 1.45× the acquire one, because a single threshold at a boundary always oscillates; (3) the territory is measured from the card's **RESTING** position, with the hover lift subtracted back out through the ring's tilt quaternion — otherwise the region travels with the lift and the hysteresis is defeated. Shared by `onMouseMove`, the per-frame scroll re-target, and `onClick`. See AUDIT #22/#23. |
| **Card lean (`uAngle`)** | `uAngle` Z-rotates every card before the bend, i.e. it is how far the deck leans. It rests at **0° (upright)** and is deflected only by live input: the pointer on desktop (gated on `hasPointer`, so a touch device never inherits a stale value), and **the ring's own angular velocity** on touch, which settles back upright. ⚠️ It used to be `mouse.x * 10 + 10` while the intro tweens the mouse proxy to 0.5 — a permanent 15° lean that touch could never correct (AUDIT #24). `LEAN_MAX_DEG` (10) is the tunable; a fast coast sits near that clamp. |
| Debug instrumentation | `__heroDebug` / `__camDebug` / `__probe` / `__exitBegin/Scrub/End` and `__gsdev()` (GSAP DevTools) are gated behind **`?debug` on the initial load URL**. Inert otherwise. Fine to ship; remove if you want them gone. |
| **Palette** | The wedding colours live in `CHAPTERS` (`composables/useChapterScene.js`) + the `.--{slug}` vars in `assets/css/main.css` + the `CH` array in `scripts/gen-textures.mjs` — keep all three in sync. The four bespoke components also hardcode family tones (Big Day's `#77854A` marker, In Frames' `#241A33` room, With Love's teal ink). |
| `dist` symlink | Was tracked pointing at a stale path; now gitignored. |
| **Dead inner-page assets** | `public/images/dresses/` (848 KB) is fully unreferenced since the dress popups were retired; most of `public/images/gallery/` (3.8 MB) is too — but **US still pulls four files from it**, so don't clear the directory blindly. They go when the couple's photos arrive. |
| **Eight dead links** | Everything a guest can click that goes nowhere: **RSVP** (`SITE.nav.collectionUrl`, in the nav *and* every chapter end — the primary CTA), With Love's **cash card**, In Frames' **"Add Your Photos"** Drive folder, **all three maps** (the traditional's, plus the ceremony's and the reception's), **Add to Calendar** (one card on the Big Day cover, so its `.ics` must carry BOTH days), and the bottom-left **credit** link. (It was seven until the two-wedding rebuild added the third map; an earlier version said "three" and undercounted the Big Day popups entirely.) |
| **No real-browser QA tier** | Claude-in-Chrome was unavailable as of 2026-08-11 and Browserless has no H.264 decoder, so **nothing automated can see the card films or judge feel**. Not currently blocking: the user confirmed the films working and both breakpoints looking right on 2026-08-31. But it means any future change to the films, or to motion feel, needs a human — plan for that rather than assuming a probe will catch it. |
| **God-module** | `useChapterScene.js` is ~1500 lines. Splitting it (shaders / intro / select-exit / hover) is the main open refactor; deferred (high-risk, low-urgency). |
| ~~`onDeselect` / `useAudio.js` dead code~~ | Removed 2026-07-23. |
| `#4` ring tilt | Parked — replica reads slightly more face-on than the original. Needs the original's exact group rotation (couldn't extract cleanly). See AUDIT #4. |
| Hardcoded exit/deselect angles | `deselectChapter` and `setExitProgress`'s `homeTilt` both hardcode the homepage `(25°,70°,15°)` (desktop) / `(22°,0,0)` (mobile) group tilt; `setExitProgress` also hardcodes `BOWL_TILT` (and `DROP_START` is duplicated in `pages/[slug].vue`). If any changes, update every copy. |
| Doc-drift risk | This file lagged the code badly before the 2026-06-12 reconcile. When you change the scene/exit model, update the affected section here in the same commit. |

---

## QA workflow

There are two complementary ways to capture the running site. **For our own
geometry/layout work, prefer the local one** — it's instant and renders at the real aspect.

### ★ Local fast loop (preferred for iterating our own build)
Run the dev server and screenshot it with **local system Chrome** via Playwright — real
1440×900 (aspect 1.6), real WebGL, no deploy wait, no aspect quirk. Edit → Nuxt hot-reloads
→ re-screenshot in seconds.

```bash
# 1. dev server (via Bash bg — the Claude Preview MCP fails with EPERM in this sandbox)
npm run dev                                   # → http://localhost:3001
# 2. screenshot at a real 1.6 viewport with WebGL (system Chrome, no download):
#    playwright-core chromium.launch({ channel: 'chrome', headless: true,
#      args: ['--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader'] })
#    newContext({ viewport: { width: 1440, height: 900 } }) → goto localhost:3001/<route>
```
Requires Google Chrome installed (it is, at `/Applications/Google Chrome.app`). Software
WebGL (SwiftShader) renders the Three.js scene fine. Helper: `/tmp/bless/local.mjs`.

> ⚠️ **Headless limits (verify these on a REAL browser, not headless):**
> - **The DEV build doesn't render image textures under headless** — under `npm run dev`, the
>   poster SVGs / txt PNGs draw **blank** in headless screenshots (cards show as flat
>   accent-colored frames; the selected hero is a plain accent block). This is a **dev-build**
>   quirk, **not** a SwiftShader limit: the **same local headless Chrome renders those textures
>   fine against a PROD build** (`la-coco-vie.vercel.app`), as does Browserless. Confirmed
>   2026-05-30 by capturing the identical Vercel URL with both engines. (This is what caused the
>   earlier false "wordmark missing / SwiftShader can't render textures" diagnosis.)
> - **Video renders in NO headless engine** — the inline film shows blank under both local
>   SwiftShader and Browserless, on dev *and* prod. Video decode needs a **real browser** (or ask
>   the user).
> - **Lazy `<img>` don't load on programmatic scroll** in headless → gallery/dress images look
>   broken in headless screenshots but are served `200` and load fine for real users.
> - **Conclusion:** trust the headless loop for **layout / geometry / DOM / z-index / scene
>   transforms** (via `__heroDebug`) on the **dev** server. To check **SVG/PNG textures** in
>   headless, point a headless capture at the **deployed (prod) URL**, or use **Browserless**
>   against prod. Use a **real browser** (or ask the user) for **video** and **lazy images**.

> **Why this matters:** Browserless (below) renders the page at **800×600 / aspect 1.33** under
> `connectOverCDP` (a CDP quirk), so its screenshots mis-frame WebGL geometry. The local loop
> renders at the true 1.6 — use it for any hero/scene tuning. (The Preview MCP can't run the
> dev server here — `EPERM: uv_cwd` — so start it via Bash.)

### Browserless (for comparing against the LIVE original / deployed site)
Visual parity vs the live original uses **Browserless** (cloud headless Chrome over CDP) —
needed because it can reach public URLs (`chapter.millanova.com`, the Vercel deploy) that a
local browser comparison would still need. The token lives only in local scripts under
`/tmp/bless/` — **never commit it.** Scripts use `playwright-core` + `sharp`.

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
- **Browserless caps sessions at ~60 s** (per plan) — for multi-step suites, open one connection
  per test, not one for the whole run. Add `&timeout=59000` to the WS URL.
- **`Page.captureScreenshot` latency is too coarse to time sub-3 s animations** (frames land
  unevenly). To judge *timing/monotonicity*, sample state with a fast screenshot-free `evaluate`
  probe (`style.opacity`, `__heroDebug` scaleX, `__camDebug` posY); use screenshots only for *look*.
- **The 0.06 rotation lerp tail is visible for seconds at headless fps** — probe the parked hero
  ~8 s after a select, not immediately, or you'll read a mid-converge value as "off-axis".

### Real browser — Claude in Chrome (textures + video + reference)
The headless loops can't render **video** (no codec) and Browserless can't scroll the reference's
inner page. For those, drive the user's real Chrome via the **Claude-in-Chrome extension**
(`mcp__Claude_in_Chrome__*`) — it shows real WebGL textures + playing films at the true viewport.
Gotchas learned 2026-06-12:
- **A background tab suspends rAF** → the scene freezes and screenshots look broken (not real).
  Use computer-use `open_application("Google Chrome")` to foreground it first (it's granted at
  "read" tier — visible + screenshottable, but clicks/typing are blocked; the *extension* does the
  driving, computer-use just screenshots the real pixels).
- The extension needs a **per-domain grant** — `la-coco-vie.vercel.app` works; the **reference
  (`chapter.millanova.com`) must be granted by the user** in the extension UI before you can drive it.
- Load with **`?debug`** to get the probes/scrub hooks in this browser too.
