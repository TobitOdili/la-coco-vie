# Roadmap

> **▶▶ THE RE-SKIN HAPPENED (2026-07-23).** This doc long described the *plan* to re-skin the Milla
> Nova replica for a real project. That is now DONE: the site is **Covenant &amp; Uvie's wedding site**
> — cards US / THE BIG DAY / IN FRAMES / WITH LOVE, each a bespoke inner page (the "thread" narrative).
> The re-skin mechanics below (swap `CHAPTERS`, textures, `chapterPages.js`, `site.config.js`) are the
> exact levers that were used. Current state → [`docs/PHASE-2-INNER-PAGES.md`](PHASE-2-INNER-PAGES.md).
> What's left is the couple's real content/media + per-page polish, not the re-skin itself.

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

## Phase 2 — Chapter inner pages ✅ (built & live; fidelity polish remains)

> **Live tracker (state / roadblocks / next steps):**
> [`PHASE-2-INNER-PAGES.md`](PHASE-2-INNER-PAGES.md) → "Running checklist (the board)".

**Built & live:** real `/{slug}` routes on a persistent WebGL shell (URL = source of truth,
deep-links + back/forward, per-slug prerender); the card-select animation *is* the transition;
the **"card becomes the page"** rework (hero scroll-coupling + edge-gated exits — the **top edge
reverse-spins back into the ring** and is done/stable; the **bottom edge is the scroll-driven "cluster-unfurl" outro** and is **DONE/user-approved**); and **all four inner pages as bespoke components**,
each with its own visual language (⚠️ they were originally a shared data-driven layout with the
reference's copy and dress popups — that model is gone; only the unused `ChapterSection` fallback
remains). A 2026-06-12 re-review + fix batch (interrupt-safety, video lifecycle, input hardening),
prod- and real-browser-verified.

**Decisions settled** (were open questions in Phase 1):
- **Routing**, not an in-place overlay (real shareable URLs; matches the original).
- Scene **stays mounted** (paused logic via `selectedIndex`) — never re-pays the 7 s intro.
- Content lives in a **parallel `CHAPTER_PAGES` model** (`composables/chapterPages.js`), not in `CHAPTERS`.

**Closed since (2026-07-22):**
- ✅ **Bottom-edge exit — DONE, user-approved.** The scroll-driven **"cluster-unfurl" outro**: the article
  scrolls fully out, then the whole deck (all 8 cards, **none hidden**) unfurls from a tight low cluster on
  the chapter accent, with one wine copy already in the deck and the second **dropping in from the top**;
  the ring rises + un-tilts to the homepage and the bg fades. Radius grows **monotonically** (an earlier dip
  read as "shrinks first, then expands"). Reversible; spins in the down-scroll direction. 9 "morph the page
  into a card" attempts were rejected and removed — don't reintroduce them.
- ✅ **All 4 chapters built.** ⚠️ Superseded: this described the pre-pivot shared-layout build using the
  reference's harvested copy. All four are now bespoke wedding pages; In Frames and With Love were
  each rebuilt again in August (film spools / wandering ink). ⚠️ The copy is no longer a placeholder
  everywhere: Coco &amp; Uvie is the couple's own words (2026-09-13) and the Gift Registry is their
  real list (2026-09-11). The welcome note in `site.config.js` is the main one still standing in.
- ✅ **Mobile / touch.** Carousel swipe + momentum (a real flick coasts — the velocity is a 90ms
  window, not the last touchmove delta), tap-vs-swipe guard, parked EXPLORE tap target, touch
  top-edge exit, and portrait geometry fixes. All gated on `isMobile`.
  ⚠️ **The touch top-edge exit was unreachable between 2026-09-12 and 2026-09-13** — the return's
  scrub sprang back to zero on every release, so a thumb could never finish it. See AUDIT #88.

⚠️ **ONE WEDDING (2026-09-06).** The traditional marriage (23 Oct) was removed at the couple's
request: `site.config` carries a single event, the countdown and the welcome note name only the
white wedding, and With Love's sign-off says "october 29". **The Big Day's calendar went entirely**
on 2026-09-06 (the page is the date, a heart and a countdown now), so the last of the traditional
marriage is **In Frames' `traditional` folder** — the only place a second day is still named.

**Remaining (per the board):**
- **Inner-page scaling vs the reference** — its copy is `16px/24px` Bague, headings use a striped display
  face scaled to width (ours is plain Bague), and images are **inset with margins** (ours are full-bleed).
  Measured, not yet applied. This is the main open fidelity gap.
- **Homepage card sizing on portrait** — cards read oversized/cropped. Root cause understood (three's `fov`
  is vertical, so portrait collapses the horizontal view), but every lever also moves the hero, which is
  currently correct — needs a compensating hero adjustment rather than a guess.
- ~~**Real gallery photos**~~ ✅ **DONE 2026-09-05.** Card films (2026-08-10), the In Frames reel
  (2026-08-11) and US's polaroids (2026-08-31) are all the couple's own. With Love's watermarked
  clipart stand-in and the last four of the reference site's own editorial stills were deleted
  2026-09-05. **Verified on a clean build: every shipped image, film and font is the couple's or
  generated; zero old-site strings in `.output/public`.** What is still outstanding is *content*,
  not provenance: the real gift list, and the wedding photos In Frames says are coming.
- **One destination left to fill** (was seven, counted 2026-08-31; two until 2026-09-13): In Frames'
  **"Add Your Photos" Drive folder**. ⚠️ The With Love payment link is no longer outstanding — it was
  ANSWERED rather than filled: the couple's two account numbers are in `SITE.gifts` and there is no
  payment link to wire up. RSVP is live, both maps are real keyless Google
  Maps URLs, and Add to Calendar builds a real `.ics` in the browser. The footer credit may never
  need one.
  - ⚠️ **None of them is a dead LINK any more.** A placeholder `#` used to render as
    `<a href="#" target="_blank">` — a control that opens a blank tab on nothing. `PopupCard`, the
    With Love cash CTA and the nav credit now all treat `#`/empty as "not wired up yet" and render
    as plain text or a plain card. Fill in the `url` and they become links again with no other
    change.
- Richer ScrollTrigger/Lenis parallax + inline films; section bg alternation (**G**).
- Code-health debt: split the ~1500-line `useChapterScene.js` god-module; perf/a11y (no
  `prefers-reduced-motion`). *(The 34M of MP4s is resolved — the new films total 6.6M.)*

### QA habit (carried from Phase 1)
Verify at each step: **deploy first, then probe the live prod URL** — never trust local rendering.
Browserless covers structure, geometry, timing and network (token in `.env.bless`). ⚠️ It **cannot
decode H.264**, so the card films need a real browser; Claude-in-Chrome was that tier but was **not
connected** as of 2026-08-11. See ARCHITECTURE → QA workflow.

---

## Phase 3 — Re-skin for a new project ✅ (done — this is the wedding site)

> ⚠️ This phase is **complete**: the re-skin happened on 2026-07-23 and the "new project" is
> Covenant &amp; Uvie's wedding site. The mechanics below are kept because they are still the exact
> levers for changing content — and because a future re-skin of this codebase would follow them again.

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

## Phase 4 — Ship-readiness 🔎 (opened 2026-09-15 by the full QA pass)

The four chapters are built and live; what is left is the difference between *built* and *ready to
be shared with a few hundred guests*. The survey, the measurements behind each item and the ordered
plan are in [`QA-2026-09-15.md`](QA-2026-09-15.md); the issues are **AUDIT #99–#112**, all open.

| round | what | why it is in this order |
|---|---|---|
| **1 — the link and the first screen** | share previews + per-route titles (#99) · re-ink the bottom chrome inside the hero (#100) · one countdown for both places (#104) | The link is the whole distribution model, and the bottom chrome is invisible on the first screen a guest ever sees. Highest value, lowest risk, no motion touched. |
| **2 — reading the pages** | copy vs the fixed nav (#101) · nine small labels to AA (#107) · the desktop tagline off the card tops (#102) | The reading experience, in the order a guest meets it. #102 wants the same derive-from-the-frustum treatment as #40/#84/#85. |
| **3 — reach** | keyboard-operable chrome (#105) · a reduced-motion contract (#106) · landscape phone (#103) · sub-44px targets (#109) | Smaller audiences, larger edits. #106 needs the contract decided before any code. |
| **4 — housekeeping** | drop 478 KB of unused SVGs (#108) · delete orphaned `POPUPS` + `marks[]` comments (#110) · `robots.txt` / sitemap / soft-404 (#112) · verify the five 403 registry links from Lagos (#111) | Cheap, and none of it is felt by a guest until it is wrong. |

⚠️ **Splitting `useChapterScene.js` (2,437 lines) is deliberately NOT in this phase.** It is the
right thing eventually and the wrong thing six weeks before a wedding: every item above is a small
verifiable edit, and a refactor underneath them turns a QA round into a regression hunt.

⚠️ **Still waiting on the couple, not on code:** In Frames' Drive folder and its photographs;
what The Big Day should say beyond the date (it currently carries no venue, time, dress code or
map); `SITE.countdownFrom`; the welcome-note copy; a human listen to the generated theme track; and
the three registry links that point at a collection or brand page rather than an exact product.

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
