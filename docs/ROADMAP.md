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
section**, rebuild pending — see below); the **Wine O'Clock** inner page as a full data-driven
vertical slice (3 sub-chapters, galleries, dress-tail cards, fade-up reveal); a 2026-06-12
re-review + fix batch (interrupt-safety, video lifecycle, input hardening), prod- and
real-browser-verified.

**Decisions settled** (were open questions in Phase 1):
- **Routing**, not an in-place overlay (real shareable URLs; matches the original).
- Scene **stays mounted** (paused logic via `selectedIndex`) — never re-pays the 7 s intro.
- Content lives in a **parallel `CHAPTER_PAGES` model** (`composables/chapterPages.js`), not in `CHAPTERS`.

**Remaining (per the board):**
- **Bottom-edge exit — rebuild as a scroll-driven "outro" section.** A 2026-06-14 reference decode
  (`chapter.millanova.com`) showed the page is **never morphed**: the article scrolls fully out the
  top and a tall transparent **outro section** below the footer scrolls in, revealing the WebGL ring;
  outro-scroll drives `scene.setExitProgress(de)` (ring rises/spins/un-tilts, the hero returns from
  off-top so the "card drop" reads as illusion), then navigates `/` at `de`→1 — scroll-coupled and
  reversible. The 8 earlier "morph the page into a card" attempts (snapshot, drop-into-deck,
  per-slug split, …) were **all rejected and removed**; the bottom edge is temporarily inert pending
  this rebuild. Full mechanism + plan: [`PHASE-2-INNER-PAGES.md`](PHASE-2-INNER-PAGES.md).
- **D** — normalize the entry-spin magnitude (varies per chapter / >1 turn).
- Hover targeting (side-card hover lifts a neighbor); richer ScrollTrigger/Lenis parallax + inline films.
- **The other 3 chapters' content + assets** (la-storia / eat-marry-love / amour-getaway are scaffolds) —
  the largest single cost; ~11 dresses shared across chapters (`symphony`, `tasmania`, `sydney`, `markita`, …).
- Docs/tech-debt: ~~drop the dead `virtualscroll` dep~~ (done 2026-06-12 — carousel is wheel-only, no mobile touch); remove `useAudio.js`.

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
