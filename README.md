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
> creators for the interaction design. The **card films are now the couple's own** (2026-08-10);
> the remaining Milla Nova media in `public/` (gallery stills, the ambient audio, the favicon) are
> **aspect-correct placeholders** awaiting their own, and are **not** for redistribution.
>
> ⚠️ **ALL copy, dates, venues, and the registry are PLACEHOLDERS** pending the couple's real
> details. The dates are the couple's real ones, confirmed 2026-08-31: the **traditional
> marriage on FRIDAY 23 October 2026** and the **white wedding + reception on Thursday 29
> October 2026**. (They replaced a single placeholder date of October 27.)

---

## Status

**The four-chapter journey is fully built, all live.** Each inner page is a bespoke scroll
experience with **its own visual vocabulary** — deliberately so. (The "one thread through the whole
site" framing held until In Frames became the film spools; the rule that survived, and matters more,
is that no two pages share a language. Breaking it is what made With Love fail its first review.)

> 📋 **The single live tracker is [`docs/PHASE-2-INNER-PAGES.md`](docs/PHASE-2-INNER-PAGES.md)** —
> read it first for a cold pickup (current state, the full change log, next steps). This README is
> the orientation; that doc is the source of truth.

- ✅ **Homepage carousel** — intro animation, rotate-on-scroll (wheel + touch), **per-card
  hover/click** (any *visible* card lifts + its film plays — resolved by screen-space containment,
  so faded background cards are not hoverable), the hover lift **follows the ring** as it scrolls,
  live cursor tint, click-to-open with a **tap confirmation** that holds until the chapter is up,
  the couple's names + date + **countdown**, a welcome note (the About panel), and RSVP.
  The deck rests **upright** and leans only with live input — the pointer on desktop, the swipe on
  touch.
- ✅ **The four bespoke inner pages** (the *thread* narrative — one line runs the whole site):
  - **US** — "the margin notes": the story in two handwritten voices, taped polaroids. ⚠️ The page
    is **written, not set** — nothing on it is type. Every string is in the hand (Over the Rainbow)
    and appears **word by word off the scroll position**, each word un-clipped left to right the way
    a pen lays it down, so scrolling back un-writes it. The heading finishes before the body starts,
    then he writes in the margin and she answers.
  - **THE BIG DAY** — "the calendar": October 2026 as a page off a wall calendar, with the two
    wedding days **ringed in marker** and annotated by hand (*traditional* · *white wedding*), and
    **both days set out side by side** beneath it — full date, name, events, dress code, and a
    working **Add to calendar** (the `.ics` is built in the browser, one day or both). Nothing swaps
    on hover, so nothing can shift; hovering a ringed date only **draws a line from it out to the
    margin**, where the times are written in marker. The grid is computed from the month, so the
    weekday alignment can't go stale. Each date can also carry **its own sound** on hover (wired;
    the files are still to come). A second scene, **Getting there**, puts the two venues on their
    own maps — Oguta, Imo and Ikeja, Lagos, about 500km apart — tinted into the chapter's palette,
    each with **Get directions** using the visitor's own location.
  - **IN FRAMES** — **the archive**: a window sits in the room, its title bar showing a path —
    `...\Media\` — with the couple's three events as folders inside it: *traditional*, *white
    wedding*, *reception*. **Click** one (hovering only brightens it) and the folder physically
    **opens**, then the window **navigates into it** the way a file browser does: the path appends
    (`...\Media\traditional`), the status bar goes from `3 FOLDERS` to `0 ITEMS`, and you get
    **Empty Folder** with a back chevron and a **Go Back** button. Behind it all, the same three
    film spools drift across on their own clock under the grain, the vignette and the big faint
    wordmark. ⚠️ Nothing in the window is handwritten — these are file names and UI, so they are set
    in Bague. ⚠️ The nine photographs that used to be the subject here are **gone by request**: they
    were the couple's history, and the pictures this chapter is about are the wedding's, which don't
    exist yet. The page says so rather than standing in for them.
  - **WITH LOVE** — the **ink** writes the thank-you, then the gift names become the page: six
    bands of the list sliding across the screen at their own speeds, forever. Point at a word and
    its band coasts to a halt, the word fills in solid, the rest of the wall steps back, and the
    item opens beneath it. ⚠️ **Third design.** A strung room of paper tags and a turning satin
    ribbon came first; both were rejected, and for the same reason — *a quiet, scroll-revealed page
    is this chapter's failure mode.* ⚠️ **No artwork at all**, which is also why it stays current
    for free: adding a gift is adding a word. Ends by splitting in two to sign both names → RSVP.
- ✅ **Shared engine** — persistent WebGL shell (no intro replay across routes), URL = source of
  truth, real `/{slug}` routes + prerender, deep-links + browser back/forward. Every bespoke page
  runs the same rAF pattern (read scene rects each frame → follows Lenis exactly, reverses for free)
  with per-page scrub types (`.scrub`/`.fade`/`.write`/`.drawdown`); floating white cards recur on
  US, Big Day and In Frames. With Love and In Frames additionally **derive their geometry from
  measurement** — see ARCHITECTURE → Bespoke inner pages.
- ✅ **Exits** — top edge reverse-rewinds into the ring; bottom edge is the scroll-driven
  **cluster-unfurl outro** (user-approved). Both reversible.
- ✅ **Mobile / touch** — swipe + momentum, tap-vs-swipe guard, parked EXPLORE button, portrait
  geometry fixes; the homepage refinements are device-verified.
- ✅ **Homepage card copy** — each card face carries what its chapter is (*Our Journey So Far*,
  *Wedding Details: Times and Dates*, *Wedding Photos & Videos*, *Support Our Wedding in Cash or
  Kind*). ⚠️ That text is **baked into generated PNGs** (`scripts/gen-textures.mjs`), so grepping
  the source will never find it — re-run the script after any copy or date change.
- ✅ **Wedding colour palette** — one hue family per chapter (US beige/chocolate · Big Day sage/olive ·
  In Frames lavender/purple · With Love dusty-blue/teal). Card art is **generated**:
  `npm run gen:textures` (see [`scripts/README.md`](scripts/README.md)).
- ✅ **The couple's own media, starting to land** — the four **card films**
  (`public/video/{slug}.mp4`) and the In Frames **reel photos** (`public/images/reel/`) are theirs.
  Raw media is dropped in **`new frames/`** at the repo root; see
  [CONTENT-AND-ASSETS](docs/CONTENT-AND-ASSETS.md) for the encode/cut-out recipes.
- ✅ **Asset URLs are base-path correct on both hosts** — everything goes through
  [`utils/asset.js`](utils/asset.js). ⚠️ `import.meta.env.BASE_URL` **cannot** be used for this in
  Nuxt; it silently broke every image on the GitHub Pages deploy. See ARCHITECTURE → Base URL.
- 🔧 **Open** — the rest of the real content/media (copy, gallery stills, ambient audio, the
  registry list + its item art); **eight dead links to fill — RSVP (the primary CTA, on every page),
  the With Love cash card, the In Frames Drive folder, all three maps (now inline links inside the
  calendar's day card), Add to Calendar (one `.ics` carrying both wedding days), and the footer
  credit**; Big Day follow-ups
  (traditional-wedding date, thread-motion consistency, a real map card); favicon still Milla Nova's;
  portrait card-sizing; code-health (split the ~1500-line scene module).

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
| QA tooling | **Browserless** (cloud headless — geometry, probes, screenshots; token in `.env.bless`). ⚠️ It cannot decode H.264, so the **films** and anything about *feel* need a human (Claude-in-Chrome, the real-browser tier, was not connected as of 2026-08-11). Films + both breakpoints were user-confirmed 2026-08-31. See ARCHITECTURE → QA workflow |

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
  chapter/UsStory.vue        ★ US — "the margin notes": every string written word-by-word on scroll
  chapter/BigDay.vue         ★ THE BIG DAY — "the calendar", days ringed in marker (bespoke page)
  chapter/InFrames.vue       ★ IN FRAMES — "the archive": a window you navigate, folders inside
  chapter/WithLove.vue       ★ WITH LOVE — the wall: the gift names slide, forever
  chapter/ChapterSection.vue Generic section block — now the unused fallback
  chapter/PopupCard.vue      Floating white card (moment / utility / registry) pinned to the viewport
  chapter/ChapterEnd.vue     Chapter-end: "See you there — RSVP" + socials + disclaimer
composables/
  useChapterScene.js         ★ The whole 3D experience: scene, shaders, intro, select/exit + CHAPTERS
  chapterPages.js            Inner-page content: CHAPTER_PAGES + POPUPS (data only)
utils/asset.js               ★ The ONLY way to build a public-asset URL (base-path aware)
assets/css/main.css          Fonts, cursor, noise overlay, container, per-chapter color vars
public/                      Static assets — posters, films, audio, fonts (see CONTENT-AND-ASSETS)
new frames/                  📁 Media drop — the couple's raw photos/films, processed into public/
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
