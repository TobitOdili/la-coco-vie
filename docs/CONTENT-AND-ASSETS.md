# Content & Assets

The data model, the asset inventory, and **how to re-skin** the experience with different
content while keeping all functionality. This is the doc to read before the eventual
media/content swap.

- [The chapter data model](#the-chapter-data-model)
- [Asset inventory](#asset-inventory)
- [Filename quirks](#filename-quirks-read-before-renaming)
- [How to re-skin](#how-to-re-skin)
- [Hardcoded copy (not data-driven yet)](#hardcoded-copy-not-data-driven-yet)

---

## The chapter data model

Everything chapter-specific is driven by a single array, `CHAPTERS`, exported from
`composables/useChapterScene.js`. It is the **single source of truth** consumed by the scene
(`useChapterScene`) and by `app.vue` (audio, titles, body classes).

```js
export const CHAPTERS = [
  { slug, title, accent, accentLight, accentLighter, audio, video, poster, txt, svg, index },
  …4 entries…
]
```

| Field | Type | Used for |
|---|---|---|
| `slug` | string | body CSS class `--{slug}` → switches accent color vars in `main.css` |
| `title` | string | `document.title` on select |
| `accent` | hex | primary chapter color (logo tint, nav, shader `borderColor`) |
| `accentLight` | hex | About panel background |
| `accentLighter` | hex | (defined; available for tints) |
| `audio` | url | Howler ambient loop (hover/select) |
| `video` | url | `VideoTexture` film shown inside the poster on hover/select |
| `poster` | url | photo texture `poster-N.jpg` (currently superseded by the video in-frame) |
| `txt` | url | the floating center-text plane (`txt-N.png`) for this chapter |
| `svg` | url | the poster artwork (`pN.svg`) — the card face |
| `index` | int | 0-based chapter index |

### The four chapters (current placeholder content)

| idx | slug | title | accent | svg | txt | video | audio |
|---|---|---|---|---|---|---|---|
| 0 | `eat-marry-love` | Eat, Merry, Love | `#B32C05` | p1.svg | txt-1.png | eat-intro.mp4 | eat-merry-love.mp3 |
| 1 | `la-storia` | La Storia Dell'eleganza | `#304443` | p2.svg | txt-2.png | la-intro.mp4 | la-storia.mp3 |
| 2 | `wine-o-clock` | Wine O'Clock | `#353454` | p3.svg | txt-3.png | wine-intro.mp4 | wine-time.mp3 |
| 3 | `amour-getaway` | Amour Getaway | `#7E3C48` | p4.svg | txt-4.png | amour-intro.mp4 | amour-getway.mp3 |

`accentLight` / `accentLighter` per chapter live in both `CHAPTERS` and as CSS vars in
`assets/css/main.css` (the `.--{slug}` blocks) — **keep them in sync** if you change colors.

> The carousel renders **8** cards: chapters 0–3 plus a mirrored copy of each on the far side
> of the ring. You only define 4 chapters; the mirroring is automatic (`N=8` in the scene).

---

## Asset inventory

All under `public/` (served from the site root, base-URL-prefixed at runtime).

```
public/
├── images/
│   ├── p1.svg … p4.svg          Poster artwork — the card faces (one per chapter)
│   ├── txt-1.png … txt-4.png    Floating center-text art (the per-chapter headline)
│   ├── poster-1.jpg … -4.jpg    Photo textures (largely superseded by the in-frame video)
│   ├── logo.png                 Milla Nova logo, rendered into the shader + tinted
│   ├── noise.png                Film-grain overlay (animated via body::after) — 792 KB
│   └── favicon.ico
├── video/
│   ├── eat-intro.mp4            Chapter films, played as VideoTexture on hover/select
│   ├── la-intro.mp4
│   ├── wine-intro.mp4
│   └── amour-intro.mp4
├── audio/
│   ├── tick.mp3                 Carousel tick SFX
│   ├── eat-merry-love.mp3       Per-chapter ambient loops
│   ├── la-storia.mp3
│   ├── wine-time.mp3
│   └── amour-getway.mp3
└── fonts/
    ├── Bague.woff               Body / nav font
    └── Movie.woff               "Movie"-style display font (About copy)
```

### Inner-page COPY (Phase 2) — real, not placeholder

`composables/chapterPages.js` holds `CHAPTER_PAGES` + `DRESSES` and is **the only per-chapter thing** —
all four chapters render through the same components, so a layout change lands on every chapter at once
and a content swap is a change *there* plus the images.

The copy is the reference's own, **verbatim** (harvested 2026-07-22). Two things to know before editing:
- **Section counts are NOT uniform** — wine 3, eat-marry-love 5, la-storia 5, amour-getaway 3. Code that
  assumes 3 will be wrong.
- **Reference quirks are preserved deliberately** — e.g. "pallete" (sic) in wine II. Their duplicated
  "Chapter IV" label on eat-marry-love is the one thing corrected (to IV + V).

An earlier pass wrongly concluded this copy was unobtainable and shipped invented text; the file header
records the harvest method so that mistake isn't repeated.

### Inner-page assets (Phase 2 — all 4 chapters built)

See attribution in [ROADMAP](ROADMAP.md). **Provenance differs per asset class — this matters
for the re-skin, because only the film stills are ours to regenerate.**

```
public/images/gallery/
  wine-the-bride-01.jpg  wine-the-bride-02.jpg     THE BRIDE  (900×1200 / 1400×900)  ── from the reference
  wine-the-wine-01.jpg   …-02.jpg  …-03.jpg        THE WINE   (900×1200)             ── from the reference
  wine-the-people.jpg                              THE PEOPLE (900×1200)             ── from the reference
  eat-marry-love-01..06.jpg                        (900×1200)   ── PLACEHOLDER film stills
  la-storia-01..06.jpg                             (900×1200)   ── PLACEHOLDER film stills
  amour-getaway-01..04.jpg                         (900×1200)   ── PLACEHOLDER film stills
public/video/
  {wine,eat,la,amour}-intro.mp4                    chapter films (900×1200, 6–8.5s)
public/images/dresses/
  dress-01.jpg  dress-02.jpg                        Yaroslava / Malva (200×300, generic names)
  aggie · alaia · aldrans · aminata · andalusia ·
  antonelly · arcada · ariel · azalia  (.jpg)       REAL dresses (750×1000) from the collection site
```

**Gallery stills for the 3 non-wine chapters are placeholders**, extracted from each chapter's own
`public/video/*-intro.mp4` — so the imagery is at least on-theme (the processional, the black-tie
group under the floral arch, the Vespa send-off). To regenerate or re-cut them, install
`ffmpeg-static` **into a scratch directory** (not the repo, not brew) and grab frames:

```bash
npm install ffmpeg-static --prefix /tmp/scratch          # sandboxed; nothing touches the repo
FF=/tmp/scratch/node_modules/ffmpeg-static/ffmpeg
"$FF" -ss 3.2 -i public/video/eat-intro.mp4 -frames:v 1 -q:v 3 -y public/images/gallery/eat-marry-love-03.jpg
```

**The reference's real gallery photos are still outstanding.** They're obtainable — its inner pages
mount under a real touch tap (recipe at the top of
[PHASE-2-INNER-PAGES.md](PHASE-2-INNER-PAGES.md)); nobody has harvested the images yet.

**Dresses are real.** Names, photos and product links were scraped from
`millanova.com/collection/chapter-bride`, which — unlike the WebGL experience — is ordinary
server-rendered DOM and scrapes normally. `params` carries the collection tag rather than invented
silhouette/colour specs, except for the two originals where the reference showed real values.
The reference pairs **Yaroslava** with wine, **Markita** with la-storia, and **Kohana + Yaroslava**
with amour; we use the subset whose images we host.

Google Fonts (loaded via `<link>` in `nuxt.config.ts`): **Italiana**, **Monoton**,
**Over the Rainbow** — used by the loader and the per-chapter `.display` styles.

---

## Filename quirks (read before renaming)

These are intentional / historical — don't "fix" them without updating the references:

- **`amour-getway.mp3`** — misspelled ("getway"), mirrors the original site's filename. The
  `slug` is `amour-getaway`; the audio file is `amour-getway`.
- **`eat-merry-love.mp3` vs slug `eat-marry-love`** — the title is "Eat, Merry, Love" but the
  slug uses "marry". Audio file matches the title spelling; slug uses "marry".
- **`pN.svg` / `txt-N.png` / `poster-N.jpg` are 1-indexed**, while `CHAPTERS` is 0-indexed.
  Chapter index 0 → `p1.svg`, `txt-1.png`, `poster-1.jpg`.
- **`video` order** isn't strictly `1-2-3-4` named — they're `eat/la/wine/amour-intro.mp4`.

All references go through `CHAPTERS`, so the safe way to rename is: drop the new file in
`public/`, then update the path in `CHAPTERS`. Nothing else hardcodes these names.

---

## How to re-skin

The goal is to **keep functionality, swap content**. Because everything chapter-specific
flows through `CHAPTERS`, a re-skin is mostly data + assets, not logic.

### Same structure (still 4 chapters)
1. Replace the files in `public/images`, `public/video`, `public/audio` (keep dimensions/
   aspect ratios similar — see notes below).
2. Edit `CHAPTERS` in `useChapterScene.js`: `slug`, `title`, `accent`, `accentLight`,
   `accentLighter`, and the asset paths.
3. Mirror the new accent colors into the `.--{slug}` blocks in `assets/css/main.css`
   (and rename the blocks to the new slugs).
4. Update the logo (`public/images/logo.png`) and the About copy (see below).
5. Re-test hover/select/exit and re-verify colors against your new design.

### Different chapter count
Changing the number of chapters touches the scene geometry: `N` (currently 8 = 4×2) and the
mirroring math in the `createPoster` loop, plus the `i*45°` slot spacing. This is a **logic
change**, not just data — budget time for it and re-verify the intro spin + select rotation.

### Asset notes
- **Poster SVGs (`pN.svg`)** are rasterized to a 512×512 canvas before becoming a texture.
  Design them to read at that resolution; keep the card's aspect in mind (geometry is 24×32).
- **`txt-N.png`** is the center headline art on a 60×60 world-unit plane — transparent PNG,
  legible at small size.
- **Videos** are muted, looping, `playsInline`; `preload='none'` (so they don't block the
  loader — only the 13 textures gate loading). Keep them short and reasonably compressed.
- **`noise.png`** is a tiled grain texture; any seamless grain works.

---

## Brand & chrome copy → `site.config.js`

All chrome/brand text (everything that isn't per-chapter content) now lives in one file at
the repo root: **`site.config.js`**. Edit it to re-brand the shell — no component hunting.

```js
export const SITE = {
  brand, subtitle,
  titles:  { home, chapterSuffix },
  nav:     { aboutLabel, collectionLabel, collectionUrl },
  credit:  { prefix, name, url },
  about:   [ { text, gap? }, … ],   // about-panel paragraphs; `gap:true` adds spacing after
  googleFonts: [ 'Italiana', … ],   // → googleFontsHref() builds the <head> CSS2 URL
}
```

| Content | Field | Consumed by |
|---|---|---|
| Nav subtitle ("Chapter the bride") | `subtitle` | `SiteNav.vue` |
| Nav labels + Collection URL | `nav.*` | `SiteNav.vue` |
| Credit ("Made by Sarakuz" + link) | `credit.*` | `SiteNav.vue` |
| About-panel body | `about[]` | `AboutPanel.vue` |
| Home `<title>` + per-chapter title suffix | `titles.*` | `nuxt.config.ts`, `app.vue` |
| Google font families | `googleFonts[]` → `googleFontsHref()` | `nuxt.config.ts` |

### Still edited directly (by design)
| Item | Where | Why |
|---|---|---|
| **"MILLA NOVA" logo wordmark** | `components/SiteNav.vue` (inline `<svg>`) | It's vector art, not a string — clearly marked there as the brand element to swap. |
| In-shader logo (`logo.png`) | `public/images/logo.png` | Rendered into the 3D scene; replace the asset. |
| Local fonts (Bague, Movie) + per-chapter `.display` fonts | `assets/css/main.css` | CSS `@font-face` / font-family bindings. |
| Per-chapter colors | `CHAPTERS` **and** the `.--{slug}` blocks in `main.css` | Keep the two in sync. |
