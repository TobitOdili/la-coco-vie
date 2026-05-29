# Phase 2 — Chapter Inner Pages (Scope)

Scope and build plan for the per-chapter inner pages. Grounded in a live inspection of the
original (`/wine-o-clock`) on 2026-05-29. Status: **not yet started** — this is the plan.

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
