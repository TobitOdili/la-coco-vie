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

### Inner-page assets (Phase 2 — Wine O'Clock so far)

Downloaded from the reference as study placeholders (see attribution in [ROADMAP](ROADMAP.md)).
The reference names gallery photos `{slug}-{sub-chapter}-NN.jpg`, mapping cleanly to the 3
sub-chapters:

```
public/images/gallery/
  wine-the-bride-01.jpg  wine-the-bride-02.jpg     THE BRIDE  (900×1200 / 1400×900)
  wine-the-wine-01.jpg   …-02.jpg  …-03.jpg        THE WINE   (900×1200)
  wine-the-people.jpg                              THE PEOPLE (900×1200)
public/video/
  {wine,eat,la,amour}-intro.jpg                    video poster frames (1080×1080)
public/images/dresses/
  dress-01.jpg  dress-02.jpg                        dress-tail thumbnails (200×300)
```

TODO when building dress tails: the dress thumbnails came from a CDN with hashed names and
are renamed generically — map them to the real dress names (Malva, Yaroslava, …) in the
`DRESSES` model. The other 3 chapters' gallery photos aren't downloaded yet (fetch per the
same `{slug}-{sub}-NN.jpg` pattern when building them).

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
