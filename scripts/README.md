# scripts/

Build-time asset generation. Not shipped to the browser.

## `gen-textures.mjs` — the card-art generator

Regenerates every generated texture the WebGL scene uses, into `public/images/`:

| Output | What it is |
|---|---|
| `cu-p1..4.svg` | Poster card **faces** — editable SVG sources (bg = chapter `accentLight`, title in the chapter font, ink = `accent`). |
| `cu-p1..4.png` | The same faces **rendered to PNG** — this is what the scene loads. |
| `cu-txt1..4.png` | The centre **tagline** art (2048×2048, transparent) — the four lines of type **and the laurel badge** under them (`COCO & UVIE / 2026`, drawn by `laurelSvg()`, in the chapter's ink). |
| `cu-logo.png` | The nav/card **wordmark** (480×480, transparent). |
| `cu-favicon.png` | The **browser-tab mark** (180×180) — the ampersand, on the site's ground. Replaced the reference site's star `favicon.ico`, deleted 2026-09-03. |

```bash
node scripts/gen-textures.mjs            # or:  npm run gen:textures
node scripts/gen-textures.mjs --taglines # ONLY cu-txt*.png — leaves the card faces alone
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

## `prep-theme-audio.mjs` — the site's ambient bed, prepared for looping

```bash
node scripts/prep-theme-audio.mjs "new frames/<file>.mp3"
```

Writes `public/audio/theme.m4a` (AAC 96 kbps CBR) from a supplied recording. **This is what ships**
since 2026-09-17: The Bayonne Orchestra's violin instrumental of "Can't Help Falling in Love",
chosen by the couple after the generated bed below was rejected.

⚠️ **It loops forever, so the join is the whole job.** A commercial recording is mastered to be
played once: it ends in silence and it **starts at full level**. Measured on the supplied track —
the music stops at 158.0s but the file runs to 162.7s, so every loop would have played **4.6 seconds
of dead air** and then jumped back in at −18 dBFS with no fade. Under a page that is silent by
default, that reads as a fault rather than as music. The script trims the tail back to 1.2s of
breath (scanning backwards for the last 50ms window above −45 dBFS, so it adapts to any source),
fades the head in over 1.6s, and keeps the recording's own fade-out. After: head starts at
−72 dBFS, tail ends at −60 — silence joins silence.

⚠️ The render runs in Chrome's Web Audio and comes back as a WAV via a real **download**, not
base64: the decoded stereo buffer is ~30 MB and pushing that through `page.evaluate` as a string is
slow and fragile. `afconvert` does the AAC encode (there is no ffmpeg on this machine).

⚠️ **Looping needs a line in `app.vue`, not just this file** — see AUDIT #120. Howler's
`loop: true` does nothing on its `html5: true` path.

---

## `gen-theme-audio.mjs` — the generated bed (no longer what ships)

```bash
node scripts/gen-theme-audio.mjs
```

Writes `public/audio/theme.m4a`. ⚠️ **Superseded on 2026-09-17** — running it now would overwrite
the couple's chosen track with the synthesised one. Kept because it is the fallback if the licensing
of the current recording ever needs to be clean (see `site.config.js`).

⚠️ It is **generated**, which is the point: it is royalty-free by construction rather than by
someone's claim. It replaced four per-chapter tracks that were the **reference site's**, renamed and
never licensed. ⚠️ **It has never been listened to by a human.** Audition it; if it is not right,
drop a licensed file in at that path and change nothing else. Sound is OFF by default.


---

## ~~`gen-noise.mjs`~~ — removed 2026-09-16, and worth knowing why

There was briefly a generator here that replaced `public/images/noise.png` — the reference site's
500×500 full-colour RGBA grain tile — with a synthesised 180² greyscale one: 773 KB down to 61 KB,
and **34–43% of every page's image payload**. The user's verdict on the live result was *"the
grains are TOO MUCH … it's gone from elegant grains to straight up noise."* The original file is
restored, byte for byte, and the generator is deleted rather than left loaded.

⚠️ **The mistake was the test, not the numbers.** It was A/B'd — same crop, jitter animation
frozen, old tile against new — but the crop was **260×160 px**, and grain is a full-screen texture.
At that size a coarser tile reads as "slightly denser"; across a whole viewport the same difference
reads as dirt. Two further traps in the same attempt: synthesising noise to match the original's
*statistics* (alpha ceiling, percentile distribution, bimodal grey) produced something visibly
wrong, because grain is read as a field rather than as a histogram; and a 180² tile repeats 2.8×
more often across a 500px span than the original did, which the small crop could not show at all.

⚠️ **If this is attempted again:** resample the ACTUAL original rather than synthesising a new
one (that preserves its grain character exactly), keep the tile large enough not to repeat more
often than 500px, and judge it **full-screen, on more than one route, at more than one size** —
ideally against the live site, not a crop. The 773 KB is worth reclaiming; it is not worth the look.

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
is the higher-resolution one. Measured after wiring, with the grain tile left as it was: phone payload on `/` went
1823 KB → **1304 KB**, and a 1440 desktop at 2× correctly still gets the full-size taglines.
