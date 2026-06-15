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

## Phase 2 — Chapter inner pages 🟢 (in progress — core built & live)

> **Live tracker (state / roadblocks / next steps):**
> [`PHASE-2-INNER-PAGES.md`](PHASE-2-INNER-PAGES.md) → "Running checklist (the board)".

**Built & live:** real `/{slug}` routes on a persistent WebGL shell (URL = source of truth,
deep-links + back/forward, per-slug prerender); the card-select animation *is* the transition;
the **"card becomes the page"** rework (hero scroll-coupling + edge-gated exits — the **top edge
reverse-spins back into the ring** and is done/stable; the **bottom edge is a scroll-driven "outro"
section** and is **BUILT** (M1 + M2 Chunk A, prod-verified) — feel-tuning remains, see below); the **Wine O'Clock** inner page as a full data-driven
vertical slice (3 sub-chapters, galleries, dress-tail cards, fade-up reveal); a 2026-06-12
re-review + fix batch (interrupt-safety, video lifecycle, input hardening), prod- and
real-browser-verified.

**Decisions settled** (were open questions in Phase 1):
- **Routing**, not an in-place overlay (real shareable URLs; matches the original).
- Scene **stays mounted** (paused logic via `selectedIndex`) — never re-pays the 7 s intro.
- Content lives in a **parallel `CHAPTER_PAGES` model** (`composables/chapterPages.js`), not in `CHAPTERS`.

**Remaining (per the board):**
- **Bottom-edge exit — feel-tuning (M2 Chunk B).** The scroll-driven "outro" is **BUILT** (M1 + M2
  Chunk A, prod-verified, HEAD `49df9f17`) — it's the reference's outro with **no page morph/snapshot**:
  a transparent `.chapter-outro` section below the article drives `de` → `scene.setExitProgress`. The
  article **scrolls fully out the top**; the ring assembles + spins on the chapter-accent (purple)
  background with the chapter's own **card missing**; once the page is out the **card descends from the
  top** into its empty slot (reads as the page becoming a card — pure illusion); the ring then rises +
  un-tilts to the homepage and the bg fades to light. Spins in the **down-scroll direction (no spin
  reversal at home)**; scroll-coupled + reversible; commits + navigates `/` at the bottom. The 8 earlier
  "morph the page into a card" attempts (snapshot, drop-into-deck, per-slug split, …) were **all rejected
  and removed** — don't reintroduce them. **Remaining:** feel-tuning (drop speed, bowl depth, bg-fade
  timing, drop↔slot sync). Full mechanism + the open steers: [`PHASE-2-INNER-PAGES.md`](PHASE-2-INNER-PAGES.md).
- **D** — normalize the entry-spin magnitude (varies per chapter / >1 turn).
- Hover targeting (side-card hover lifts a neighbor); richer ScrollTrigger/Lenis parallax + inline films.
- **The other 3 chapters' content + assets** (la-storia / eat-marry-love / amour-getaway are scaffolds; only
  Wine O'Clock is built) — the largest single cost; ~11 dresses shared across chapters (`symphony`,
  `tasmania`, `sydney`, `markita`, …).
- **Mobile / touch** — the carousel + inner-page exits are **wheel-only** (the dead `virtualscroll` dep was
  dropped 2026-06-12; wire `virtual-scroll` (hyphen) if touch is wanted).
- Docs/code-health debt: split the 1430-line `useChapterScene.js` god-module; perf/a11y (no
  `prefers-reduced-motion`, 34M MP4s); remove `useAudio.js`.

### QA habit (carried from Phase 1)
Verify at each step: Browserless probes/geometry on prod + a real-browser pass (Claude-in-Chrome)
for video/textures/feel. See ARCHITECTURE → QA workflow.

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
