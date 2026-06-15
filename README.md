# La Coco Vie

A faithful, from-scratch **replica of the Milla Nova "Chapter the Bride" homepage**
([chapter.millanova.com](https://chapter.millanova.com/)) — a WebGL-driven, cinematic
bridal-fashion experience: a spinning 3D carousel of poster cards built in Three.js with
custom GLSL shaders, GSAP animation, spatial audio, and chapter transitions.

| | |
|---|---|
| **Live (replica)** | https://la-coco-vie.vercel.app/ |
| **Reference (original)** | https://chapter.millanova.com/ |
| **Secondary deploy** | https://tobitodili.github.io/la-coco-vie/ (GitHub Pages) |
| **Repo** | https://github.com/TobitOdili/la-coco-vie |

> ### ℹ️ What this project is
> This is a **technical study / replica** of the Milla Nova site, rebuilt independently
> in Nuxt + Three.js. The long-term plan is to **keep the functionality and interaction
> design but swap out the media, content, and branding** for a different project — with
> full credit to the original creators (Milla Nova; site by [Sarakuz](https://sarakuz.com)).
> The original artwork, video, audio, and copy in `public/` are placeholders standing in
> for the real reference experience and are **not** intended for redistribution. See
> [`docs/ROADMAP.md`](docs/ROADMAP.md) for the re-skin plan and attribution notes.

---

## Status

**Homepage complete (~9/10 parity); Phase 2 (chapter inner pages) — "card becomes the page" is built and live. Inner-page exit: both edges built — top edge done; bottom edge built as a scroll-driven outro (feel-tuning remaining).**

> 📋 **The single live tracker is [`docs/PHASE-2-INNER-PAGES.md`](docs/PHASE-2-INNER-PAGES.md) →
> "Running checklist (the board)"** — read it first for a cold pickup (current state, roadblocks, next steps).

- ✅ **Homepage:** intro animation, carousel rotate-on-scroll, hover (lift + film), click-to-select,
  audio, loading screen, custom cursor, noise overlay, per-card depth fade, per-chapter center text.
- ✅ **Phase 2 routing:** real `/{slug}` routes, **persistent WebGL shell** (no intro replay), the
  card-select animation *is* the transition into the page, URL = source of truth, deep-links +
  browser back/forward, per-slug prerender. **Wine O'Clock inner page built** (data-driven
  sub-chapters, galleries, dress-tail cards, scroll reveal); other 3 chapters are scaffolds.
- ✅ **"Card becomes the page":** hero **scroll-coupling** (card scrolls away 1:1 with the page;
  killed the old "purple overlay") + **edge-gated exits** (mid-page scroll free). **Top** edge
  (stable, done) reverse-rewinds the card into the ring (`deselectChapter`). **Bottom** edge is
  **built as a scroll-driven outro** (M1 + M2 Chunk A, prod-verified) — the reference's approach,
  no morph/snapshot: the page scrolls fully out while a WebGL ring "outro" section scrolls in on
  the chapter-accent (purple) background, spinning with the chapter's card missing; once the page is
  out the card descends from the top into its slot, then the ring rises to the homepage. Reversible,
  and the exit spins in the down-scroll direction (no spin reversal at home). The earlier
  snapshot/overscroll-coupling machinery (and `html-to-image`) was removed; 8 "morph the page into a
  card" approaches were tried and rejected before the reference decode confirmed the page is never
  morphed. Remaining work is **feel-tuning (M2)** — drop speed, bowl depth, bg-fade timing, sync. See
  `docs/PHASE-2-INNER-PAGES.md` for the build detail and the full bottom-edge saga.
- ✅ **Hardened (2026-06-12 re-review):** scroll-then-click hero alignment, rapid back/forward
  interrupt-safety, video play/pause lifecycle, background-tab robustness, input normalization.
  Verified on prod (Browserless probes) **and** a real browser (video + textures confirmed live).
- ⏸️ **Parked:** ring viewing-angle (#4) — needs the original's exact group tilt; low ROI.
- ✅ **Done (2026-06-12):** entry-spin normalized (**D**) · hover targeting driven off the front card ·
  dead `virtualscroll` dep removed (carousel is wheel-only; no mobile touch).
- 🔧 **Open:** option-B reference match (blocked on a `chapter.millanova.com` extension grant) ·
  other 3 chapters' content · re-skin (Phase 3).

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
| Scroll | **Lenis** (inner pages) · homepage carousel uses a window `wheel` listener (no touch yet — see ARCHITECTURE tech debt) |
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
  chapter/DressTail.vue      Dress card (photo + name + params + link)
composables/
  useChapterScene.js         ★ The whole 3D experience: scene, shaders, intro, select/exit
  chapterPages.js            Inner-page content: CHAPTER_PAGES + DRESSES (data only)
  useAudio.js                ⚠️ DEAD CODE — superseded by inline audio in app.vue (see ARCHITECTURE)
assets/css/main.css          Fonts, cursor, noise overlay, container, per-chapter color vars
public/                      Static assets — posters, videos, audio, fonts (see CONTENT-AND-ASSETS)
.github/workflows/deploy.yml GitHub Pages CI (npm run generate, base /la-coco-vie/)
```

`composables/useChapterScene.js` (~1300 lines) is where ~90% of the project lives. Read
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
