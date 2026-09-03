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
four cards long after the couple confirmed the 23rd and the 29th — a wrong date on the homepage that
only opening the card art would reveal. Re-run this script after ANY copy or date change. Colours MUST stay in sync with:
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
