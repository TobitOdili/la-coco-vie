# scripts/

Build-time asset generation. Not shipped to the browser.

## `gen-textures.mjs` — the card-art generator

Regenerates every generated texture the WebGL scene uses, into `public/images/`:

| Output | What it is |
|---|---|
| `cu-p1..4.svg` | Poster card **faces** — editable SVG sources (bg = chapter `accentLight`, title in the chapter font, ink = `accent`). |
| `cu-p1..4.png` | The same faces **rendered to PNG** — this is what the scene loads. |
| `cu-txt1..4.png` | The centre **tagline** art (2048×2048, transparent). |
| `cu-logo.png` | The nav/card **wordmark** (480×480, transparent). |
| `cu-favicon.png` | The **browser-tab mark** (180×180) — the ampersand, on the site's ground. Replaced the reference site's star `favicon.ico`, deleted 2026-09-03. |

```bash
node scripts/gen-textures.mjs        # or:  npm run gen:textures
```

Needs Google Chrome installed (override with `CHROME_PATH=…`) and the `playwright-core`
devDependency (already in `package.json`). The three Google-font subsets live in
`scripts/fonts/`; Bague comes from `public/fonts/Bague.woff`.

### Editing the palette / copy
The chapter **colours** (`bg`/`ink`), **titles**, **taglines** and the **`sub`** line are the `CH`
array at the top of `gen-textures.mjs`. `title` is the big name on the card; `sub` is the line
underneath it saying what the chapter is; `tagline` is the centre art that swaps in on hover.
⚠️ **Card copy is baked into PNGs, so grepping the source will never find it.** The `sub` line
replaced two generic lines that had been carrying `OCTOBER TWENTY-SEVEN · TWENTY TWENTY-SIX` on all
four cards long after the couple confirmed the real date — a wrong date on the homepage that only
opening the card art would reveal. (There is ONE wedding day since 2026-09-06: 29 October 2026.) Re-run this script after ANY copy or date change. Colours MUST stay in sync with:
- `CHAPTERS` in `composables/useChapterScene.js` (`accent` = `ink`, `accentLight` = `bg`)
- the `.--{slug}` custom properties in `assets/css/main.css`

### Three gotchas baked into the script (don't undo them)
1. **Ship the PNG, not the SVG.** An SVG loaded as an `<img>` does not block its load event on
   embedded `@font-face` fonts, so the scene's SVG→canvas path draws the title **blank**. The
   script renders each face inside a real page (which repaints once fonts decode) → PNG.
2. **The logo must be transparent-background.** The fragment shader uses the logo texture's
   **alpha** as the mask for the accent-tinted wordmark strip; an opaque background floods the
   whole card with the accent colour.
3. **Font subsets need the `text=` param.** The subsets here were fetched from Google Fonts css2
   with `&text=<A–Z…>` — the default css2 woff2 is latin-EXT only and has no A–Z.

---

## `gen-stills.mjs` — the card windows' first frame

```bash
node scripts/gen-stills.mjs          # or:  npm run gen:stills
```

Writes `public/images/still-{slug}.jpg` — frame **0.04s** of each chapter film, at most 720px wide.

⚠️ **RE-RUN IT AFTER ANY FILM SWAP.** Two things depend on it and both break silently:
1. **The card's window is empty until a film has played**, and on a touch device — where nothing
   hovers — that means until the visitor opens the chapter. The still is what the window shows at
   rest. Priming the `<video>` elements instead works and costs the whole 6.3 MB of film to display
   four motionless frames (Chrome fetches short files entire, whatever `preload` says).
2. **The still is where the shader reads each film's ASPECT RATIO** (`photoAspect`). The card's
   photo window is drawn for 3:4, and two of the films are 9:16 phone video — the shader crops
   rather than stretches, and it sizes that crop from `stillTex.image`. A stale still means a wrongly
   cropped chapter. (The video's real dimensions are re-read at the handover as a backstop, so the
   cost of forgetting is a wrong FIRST frame rather than a permanently squashed card. Don't rely on
   it.) See AUDIT #82 and the `photoFocus` note in the fragment shader.

Same requirements as `gen-textures.mjs`: Google Chrome plus `playwright-core`. It serves
`public/` over a throwaway `node:http` server with Range support — Chrome will not SEEK a `<video>`
otherwise, and an `about:blank` page cannot load `file://` media at all.

---

## `gen-theme-audio.mjs` — the site's one ambient track

```bash
node scripts/gen-theme-audio.mjs
```

Writes `public/audio/theme.m4a`, the single ambient bed for the whole site (`SITE.themeAudio`).

⚠️ It is **generated**, which is the point: it is royalty-free by construction rather than by
someone's claim. It replaced four per-chapter tracks that were the **reference site's**, renamed and
never licensed. ⚠️ **It has never been listened to by a human.** Audition it; if it is not right,
drop a licensed file in at that path and change nothing else. Sound is OFF by default.

---

## `gen-noise.mjs` — the film-grain tile

```bash
node scripts/gen-noise.mjs
```

Writes `public/images/noise.png`, the grain tiled by `body::after` (opacity 0.4) and by In Frames'
`.room-grain` (scaled to 200px, opacity 0.13).

⚠️ **It replaced a 773 KB file.** The tile that shipped until 2026-09-16 was the reference site's:
500×500 **full-colour RGBA** with 204 distinct alpha levels and 253 distinct reds. Random colour
does not compress, so it was 250,000 px × ~3.1 bytes — and **34–43% of every page's image payload**,
downloaded identically by a 360px phone and a 2560px desktop. The generated tile is 180×180,
greyscale, with grey and alpha quantised to 16 levels: **60.8 KB**, and the look is unchanged.

⚠️ **The four numbers at the top were matched BY EYE, A/B, not derived.** The first attempt
reproduced the original's statistics exactly (alpha ceiling 220, 67% of pixels under alpha 32,
hard-bimodal grey) and looked wrong — sparse hard specks where the original is a fine even texture.
Grain reads as a field, not as a histogram: many faint pixels, not a few strong ones. If you change
`ALPHA_MAX`, `ALPHA_GAMMA`, `DARK_HI` or `LIGHT_LO`, do the A/B again — freeze `body::after`'s
animation, screenshot the same crop of flat paper, and compare against the previous tile.

---

## `gen-image-variants.mjs` — smaller art for smaller screens

```bash
node scripts/gen-image-variants.mjs
```

Writes `cu-txt1..4-sm.png` (1024², from the 2048² originals) and `public/images/us/*-sm.jpg`
(600px wide, from the ~900px originals).

⚠️ **Re-run it after `gen-textures.mjs`.** The variants are derived from the originals and will
silently keep showing the old art otherwise.

⚠️ **The two consumers choose differently, and they have to.** The polaroids are `<img>`, so the
browser picks via `srcset`/`sizes` in `UsStory.vue`. The taglines are **WebGL textures** — there is
no element for `srcset` to act on — so `txtFor()` in `composables/useChapterScene.js` picks at load
time. Keep the 1024 here and the threshold there in step.

⚠️ **The tagline test is DEVICE pixels, not CSS pixels.** A 390px phone at 3× has 1170 real pixels
and a 1440 laptop at 1× has 1440 — by CSS width alone the phone looks like the smaller screen and
is the higher-resolution one. Measured after wiring: phone payload on `/` went 1823 KB → **909 KB**,
and a 1440 desktop at 2× correctly still gets the full-size taglines.
