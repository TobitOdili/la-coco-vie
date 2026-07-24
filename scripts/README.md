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

```bash
node scripts/gen-textures.mjs        # or:  npm run gen:textures
```

Needs Google Chrome installed (override with `CHROME_PATH=…`) and the `playwright-core`
devDependency (already in `package.json`). The three Google-font subsets live in
`scripts/fonts/`; Bague comes from `public/fonts/Bague.woff`.

### Editing the palette / copy
The chapter **colours** (`bg`/`ink`) and **titles/taglines** are the `CH` array at the top of
`gen-textures.mjs`. Colours MUST stay in sync with:
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
