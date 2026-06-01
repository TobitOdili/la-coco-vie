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

**Homepage complete (~9/10 parity); Phase 2 (chapter inner pages) underway.**

- ✅ **Homepage done:** intro animation, carousel, hover, click-to-select, scroll-back exit,
  audio, loading screen, custom cursor, noise overlay, per-card depth fade, per-chapter center text.
- 🟢 **Phase 2 — routing + Wine O'Clock content landed:** real `/{slug}` chapter routes,
  persistent WebGL shell (no intro replay), the card-select animation *is* the transition into
  the page, deep-links + browser back/forward, per-slug prerender. **Wine O'Clock inner page
  built** (data-driven sub-chapters, galleries, dress-tail cards, scroll reveal). Other 3
  chapters are scaffolds. See [`docs/PHASE-2-INNER-PAGES.md`](docs/PHASE-2-INNER-PAGES.md).
- 🔧 **Active rework — "card becomes the page":** the selected card spins/grows into the inner-page
  hero. Click→correct-card, camera, rotation, **scroll-coupling** (hero scrolls away 1:1 with the
  page; fixes the old "purple overlay"), and **scroll-end reverse exit** (overscroll past the bottom
  spins the card back into the ring) are all done. **Live tracker:**
  [`docs/PHASE-2-INNER-PAGES.md`](docs/PHASE-2-INNER-PAGES.md) → "Running checklist (the board)".
- ⏸️ **Parked:** ring viewing-angle (#4) — needs the original's exact group tilt; low ROI.
- 🔮 **Next:** normalize the entry spin (D) → hover targeting → richer motion → other chapters → re-skin.

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
| Animation | **GSAP** (timelines, eased tweens) |
| Audio | **Howler.js** (per-chapter ambient loops) |
| Scroll | `virtualscroll` (smoothed wheel/touch) |
| Styling | Tailwind v4 (via `@tailwindcss/vite`) + `assets/css/main.css` |
| Fonts | Bague & Movie (local `.woff`) + Italiana / Monoton / Over the Rainbow (Google Fonts) |
| Hosting | **Vercel** (primary, auto-deploys `main`) + GitHub Pages (CI fallback) |
| QA tooling | **Browserless** (cloud headless Chrome) for visual diffing vs the original |

---

## Repository map

```
site.config.js               ★ Brand/chrome copy — single source of truth for a re-skin
app.vue                      Root component — state owner (selection, audio, about, loading)
nuxt.config.ts               Nuxt/Vite/Tailwind config, <head>, base URL, font links
components/
  WebGLScene.vue             Mounts the Three.js canvas; wires DOM events → scene
  CustomCursor.vue           Lerped custom cursor (24px → 140px "EXPLORE")
  SiteNav.vue                Top nav (About · logo · Collection) + bottom bar (credit · sound)
  AboutPanel.vue             Full-screen About overlay
  LoadingScreen.vue          Asset-gated loading counter (GSAP)
composables/
  useChapterScene.js         ★ The whole 3D experience: scene, shaders, intro, interactions
  useAudio.js                ⚠️ DEAD CODE — superseded by inline audio in app.vue (see ARCHITECTURE)
assets/css/main.css          Fonts, cursor, noise overlay, container, per-chapter color vars
public/                      Static assets — posters, videos, audio, fonts (see CONTENT-AND-ASSETS)
.github/workflows/deploy.yml GitHub Pages CI (npm run generate, base /la-coco-vie/)
```

`composables/useChapterScene.js` (~1000 lines) is where ~90% of the project lives. Read
[`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md) before editing it.

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
