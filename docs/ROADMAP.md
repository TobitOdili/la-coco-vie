# Roadmap

Where the project has been and where it's going. For live issue status see
[`PROGRESS.md`](../PROGRESS.md); for forensic issue history see [`AUDIT.md`](../AUDIT.md).

---

## Phase 1 — Homepage replica ✅ (current, ~9/10 parity)

Rebuild the Milla Nova "Chapter the Bride" **homepage** from scratch: WebGL carousel, intro
animation, hover/select/exit interactions, audio, custom cursor, loading screen, noise
overlay. **Complete** — every tracked issue is resolved or consciously parked.

Remaining homepage polish (optional, low priority):
- **#4 — ring viewing-angle** (parked). Replica reads slightly more face-on than the
  original. Needs the original's exact group rotation, which couldn't be cleanly extracted;
  closing it is high-risk tuning for marginal gain. Revisit only with a better extraction.

---

## Phase 2 — Chapter inner pages 🔮 (next)

Each chapter on the original has a full inner page reached after selection. Not yet built.
From analysis of the original, an inner page composes roughly these pieces:

- **Header** — chapter title treatment / hero.
- **ScrollTrigger-driven sequence** — scroll scrubs through sections.
- **Mask** — masked reveal transitions.
- **Gallery parallax** — image gallery with depth/parallax on scroll.
- **ImgText** — alternating image + text blocks.
- **DressTail** — the dress cards (see Phase 2b).

### Phase 2b — Dress-tail cards
On select, the original shows matched dresses for the chapter. Data set is ~**11 dresses**
(`symphony`, `tasmania`, `sydney`, `markita`, …). Will need its own data model alongside
`CHAPTERS`.

### Suggested approach
- Introduce real routing (Nuxt pages) for the inner pages, or an in-place scroll section that
  takes over after `selectChapter` — decide based on how the original transitions.
- Reuse `CHAPTERS` as the data spine; extend it (or add a parallel `CHAPTER_PAGES` model)
  rather than hardcoding per-page content.
- Keep the homepage scene mounted/paused vs unmounted decision explicit (WebGL context cost).
- Build the QA habit from Phase 1: Browserless side-by-side vs the original at each step
  (see ARCHITECTURE → QA workflow).

---

## Phase 3 — Re-skin for a new project 🔮 (later)

Keep **all functionality and interaction design**, swap **media, content, and branding** for
a separate project — with full credit to the original creators.

Mechanics are documented in [`CONTENT-AND-ASSETS.md`](CONTENT-AND-ASSETS.md):
- Brand/chrome copy is now centralized in **`site.config.js`** (done as re-skin pre-work) —
  a re-brand of the shell is data-only.
- Per-chapter content (titles, colors, posters, films, audio) is **data + assets** via the
  `CHAPTERS` array — not logic.
- Changing the **number** of chapters is a logic change (scene geometry: `N`, mirroring,
  slot spacing).
- Remaining non-config brand elements: the logo wordmark (`<svg>` in `SiteNav.vue`), the
  in-shader `logo.png`, and the local fonts / per-chapter `.display` fonts in `main.css`.

---

## Attribution

The original **"Chapter the Bride"** concept, design, artwork, films, audio, and copy are
© **Milla Nova**; the original site was built by **[Sarakuz](https://sarakuz.com)**.

This repository is an **independent technical reconstruction** built for learning and as a
functional base for a separately-branded future project. The placeholder assets in `public/`
reproduce the reference experience and are **not for redistribution**. Any derived project
must replace those assets with its own and credit the original creators where the interaction
design is derivative.

This project is not affiliated with, sponsored by, or endorsed by Milla Nova or Sarakuz.
