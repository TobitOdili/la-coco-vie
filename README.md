# La Coco Vie — Covenant &amp; Uvie

**The wedding website of Covenant (Odili) &amp; Uvie (Dan-Egua)** — *"A Love Story in Chapters."*
A WebGL-driven, cinematic experience: a spinning 3D carousel of poster cards (Three.js + custom
GLSL shaders, GSAP, Lenis, spatial audio) where each card is a chapter of the couple's story that
opens into its own bespoke scroll page.

| | |
|---|---|
| **Live** | https://la-coco-vie.vercel.app/ |
| **Repo** | https://github.com/TobitOdili/la-coco-vie |
| **Secondary deploy** | https://tobitodili.github.io/la-coco-vie/ (GitHub Pages) |

> ### ℹ️ What this project is (and its history)
> The **engine** was first built as a faithful, from-scratch **replica of the Milla Nova "Chapter
> the Bride" homepage** ([chapter.millanova.com](https://chapter.millanova.com/), site by
> [Sarakuz](https://sarakuz.com)) — a technical study. As of **2026-07-23** it has been **re-skinned
> into Covenant &amp; Uvie's wedding site**: the four cards became the journey **US → THE BIG DAY →
> IN FRAMES → WITH LOVE**, each with its own bespoke inner page. Full credit to the original
> creators for the interaction design. Remaining Milla Nova media in `public/` (films, some gallery
> stills) are **aspect-correct placeholders** awaiting the couple's own photos/video, and are **not**
> for redistribution.
>
> ⚠️ **ALL copy, dates, venues, and the registry are PLACEHOLDERS** pending the couple's real
> details. The wedding date (October 27, 2026) is user-confirmed; the year is assumed 2026.

---

## Status

**The four-chapter journey is fully built, all live. Every inner page is a bespoke scroll
experience unified by one motif — a thread that runs through the whole site.**

> 📋 **The single live tracker is [`docs/PHASE-2-INNER-PAGES.md`](docs/PHASE-2-INNER-PAGES.md)** —
> read it first for a cold pickup (current state, the full change log, next steps). This README is
> the orientation; that doc is the source of truth.

- ✅ **Homepage carousel** — intro animation, rotate-on-scroll (wheel + touch), **per-card
  hover/click** (any visible card lifts + its film plays, not just the front — `posterAtScreen`),
  the hover lift **follows the ring** as it scrolls, live cursor tint, click-to-open, the couple's
  names + date + **countdown**, a welcome note (the About panel), and RSVP.
- ✅ **The four bespoke inner pages** (the *thread* narrative — one line runs the whole site):
  - **US** — "the margin notes": the story in two handwritten voices, taped polaroids.
  - **THE BIG DAY** — "the hours": scroll scrubs the day from morning light into night; two threads
    **tie the knot** at the ceremony (sticky, reversible). Photo-free.
  - **IN FRAMES** — "the screening room": the page goes dark, the thread becomes a **film strip**
    that scroll-advances through a projector gate; academy countdowns; future galleries are
    "reserved" title cards.
  - **WITH LOVE** — "thank-you in advance": the thread becomes **ink** that writes the thank-you,
    circles each gift like a catalogue, and **splits in two to sign** both names → RSVP.
- ✅ **Shared engine** — persistent WebGL shell (no intro replay across routes), URL = source of
  truth, real `/{slug}` routes + prerender, deep-links + browser back/forward. A shared
  scroll-scrubbed line-drawing engine (`.scrub`/`.fade`/`.write`, rAF vs scene rects) powers the
  inner pages; floating white "moment/utility/registry" cards recur on every page.
- ✅ **Exits** — top edge reverse-rewinds into the ring; bottom edge is the scroll-driven
  **cluster-unfurl outro** (user-approved). Both reversible.
- ✅ **Mobile / touch** — swipe + momentum, tap-vs-swipe guard, parked EXPLORE button, portrait
  geometry fixes. (Re-verify the latest homepage refinements on device — see the tracker.)
- 🔧 **Open** — real content/media from the couple (copy, photos, registry, RSVP destination);
  per-page polish (In Frames flagged, Big Day: traditional-wedding date + thread motion); favicon
  still Milla Nova's; portrait card-sizing; code-health (split the ~1500-line scene module,
  `prefers-reduced-motion`, 34M MP4s).

Full live status → [`PROGRESS.md`](PROGRESS.md) · issue history → [`AUDIT.md`](AUDIT.md) · plan → [`docs/ROADMAP.md`](docs/ROADMAP.md)

---

## Quick start

```bash
npm install
npm run dev      # → http://localhost:3001
```

### Other commands
```bash
npm run build    # production build (.output/)
npm run generate # static export (used by the GitHub Pages CI)
npm run preview   # preview a production build
```

> **macOS build gotcha:** `node_modules` was first installed on Linux, so the platform
> rollup binary can be missing locally. If `npm run build` errors with
> `Cannot find module @rollup/rollup-darwin-arm64`, run once:
> `npm i -D @rollup/rollup-darwin-arm64 --no-save`. (Doesn't affect `npm run dev` or CI.)

---

## Tech stack

| Layer | Choice |
|---|---|
| Framework | **Nuxt 3** (SPA mode — `ssr: false`) |
| UI | Vue 3 `<script setup>` |
| 3D / WebGL | **Three.js** + custom GLSL vertex & fragment shaders |
| Animation | **GSAP** (timelines, eased tweens; `GSDevTools` under `?debug`) |
| Audio | **Howler.js** (per-chapter ambient loops) |
| Scroll | **Lenis** (inner pages) · homepage carousel: window `wheel` listener + touch handlers with release momentum on `#canvas-hit-layer` |
| Styling | Tailwind v4 (via `@tailwindcss/vite`) + `assets/css/main.css` |
| Fonts | Bague & Movie (local `.woff`) + Italiana / Monoton / Over the Rainbow (Google Fonts) |
| Hosting | **Vercel** (primary, auto-deploys `main`) + GitHub Pages (CI fallback) |
| QA tooling | **Browserless** (cloud headless, geometry/probes) + **Claude-in-Chrome** (real browser: video/textures) — see ARCHITECTURE → QA workflow |

---

## Repository map

```
site.config.js               ★ Brand/chrome copy — single source of truth for a re-skin
app.vue                      Persistent shell — routing = source of truth, audio, About, loading
nuxt.config.ts               Nuxt/Vite/Tailwind config, <head>, base URL, per-slug prerender, font links
pages/
  index.vue                  Inert (the WebGL carousel IS the homepage)
  [slug].vue                 Chapter inner page — Lenis scroll, hero coupling, edge-gated exits
components/
  WebGLScene.vue             Mounts the Three.js canvas; wires DOM events → scene
  CustomCursor.vue           Lerped custom cursor (24px → 140px "EXPLORE")
  SiteNav.vue                Top nav (About · logo · Collection) + bottom bar (credit · sound)
  AboutPanel.vue             Full-screen About overlay
  LoadingScreen.vue          Asset-gated loading counter (GSAP)
  chapter/ChapterSection.vue Inner-page section block (heading + copy + gallery, fade-up reveal)
  chapter/DressTail.vue      Dress card (photo + name + params + link) — rendered as a viewport-pinned popup
  chapter/ChapterEnd.vue     Chapter-end: "Discover dress from the chapter" + Wedding/Evening pills + socials + disclaimer
composables/
  useChapterScene.js         ★ The whole 3D experience: scene, shaders, intro, select/exit
  chapterPages.js            Inner-page content: CHAPTER_PAGES + DRESSES (data only)
  useAudio.js                ⚠️ DEAD CODE — superseded by inline audio in app.vue (see ARCHITECTURE)
assets/css/main.css          Fonts, cursor, noise overlay, container, per-chapter color vars
public/                      Static assets — posters, videos, audio, fonts (see CONTENT-AND-ASSETS)
.github/workflows/deploy.yml GitHub Pages CI (npm run generate, base /la-coco-vie/)
```

`composables/useChapterScene.js` (~1500 lines) is where ~90% of the project lives. Read
[`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md) before editing it. **Debug:** load any route with
`?debug` (on the initial URL) for scene probes + the GSAP timeline scrubber.

---

## Documentation map

Each doc has **one job** — start with the README, then go deep where needed.

| Doc | Purpose |
|---|---|
| **README.md** (this file) | Orientation: what/why, quick start, repo map, doc index |
| [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md) | **How it works** — scene, shaders, state flow, file-by-file, QA workflow |
| [`docs/CONTENT-AND-ASSETS.md`](docs/CONTENT-AND-ASSETS.md) | Chapter data model + asset inventory + **how to re-skin** |
| [`docs/ROADMAP.md`](docs/ROADMAP.md) | Phases (homepage → inner pages → re-skin) + attribution |
| [`docs/PHASE-2-INNER-PAGES.md`](docs/PHASE-2-INNER-PAGES.md) | **Next up** — scope & build plan for the chapter inner pages |
| [`PROGRESS.md`](PROGRESS.md) | **Living status** — what works, resolved/open issues, dev workflow, session log |
| [`AUDIT.md`](AUDIT.md) | Issue-by-issue **forensic history** (root causes, fixes, commit refs) |

---

## Deployment

- **Vercel** is primary and auto-deploys on push to `main`. Base URL `/`.
- **GitHub Pages** builds via `.github/workflows/deploy.yml` (`npm run generate` with
  `NUXT_APP_BASE_URL=/la-coco-vie/`, adds `.nojekyll` so `_nuxt/` assets serve).

Asset paths are resolved at build time via `import.meta.env.BASE_URL` so the same code
works under both `/` (Vercel) and `/la-coco-vie/` (Pages). See ARCHITECTURE → "Base URL & assets".

---

## Credits

Original concept, design, artwork, and films © **Milla Nova** — site by **Sarakuz**.
This repository is an independent technical reconstruction for learning and as a base for
a separately-credited future project. It is not affiliated with or endorsed by Milla Nova.
