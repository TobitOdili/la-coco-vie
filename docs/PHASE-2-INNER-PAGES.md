# Phase 2 — Chapter Inner Pages (Scope)

Scope and build plan for the per-chapter inner pages. Grounded in a live inspection of the
original (`/wine-o-clock`) on 2026-05-29.

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
| A. Hero geometry | On select, move the chosen card to a deterministic full-bleed hero transform in front of the camera (not just flatten-in-place). Compute scale to fill the frustum → resolution-independent. |
| B. Lenis | Inner page becomes a Lenis-driven smooth scroll (Lenis already a dep) — the shared clock. |
| C. Scroll coupling | Each frame, read Lenis scroll and drive the hero card up/away in lockstep with the DOM content → card scrolls off as content scrolls in. One clock = always in sync, no seam. |
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
