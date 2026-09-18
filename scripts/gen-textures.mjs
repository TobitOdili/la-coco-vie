// ─────────────────────────────────────────────────────────────────────────────
// Texture generator for the Covenant & Uvie card art. Run:  node scripts/gen-textures.mjs
//
// Produces, into public/images/:
//   cu-p1..4.svg   — poster card FACES, editable SVG sources (bg = chapter accentLight,
//                    title in the chapter font, ink = chapter accent) at 1000×1330
//   cu-p1..4.png   — the SAME faces rendered to PNG. ⚠️ SHIP THE PNGs: an SVG loaded as an
//                    <img> does NOT block its load event on embedded @font-face fonts, so the
//                    scene's SVG→canvas texture path draws the title BLANK. Rendering here via a
//                    real page (which repaints after fonts decode) bakes the glyphs in.
//   cu-txt1..4.png — the centre TAGLINE art (2048×2048, transparent), Italiana/Bague
//   cu-logo.png    — the nav/card wordmark (480×480, TRANSPARENT — its alpha is the shader's
//                    accent mask; an opaque bg would flood the whole card with the accent colour)
//   cu-favicon.png — the browser-tab mark (180×180). Replaced the reference site's star.
//
// Requires: Google Chrome installed + `npm i -D playwright-core` (the repo has it as a dep).
// The three Google-font subsets live beside this file in scripts/fonts/ (fetched with the
// css2 `text=` param so A–Z is present — the default css2 woff2 is latin-EXT only). Bague is
// the repo's own public/fonts/Bague.woff. Colours here MUST match CHAPTERS in
// composables/useChapterScene.js + the .--slug vars in assets/css/main.css.
// ⚠️ ALL FOUR CARD TITLES ARE ONE FACE — Italiana (user, 2026-09-11: "use the same font type
// for the page titles"). They used to be four different display faces (Over the Rainbow, Italiana,
// Monoton, Bague), one per chapter. Italiana is the site's display voice already: the taglines'
// `.xl` lines, the countdown numerals, the month, the knot's words, the nav ampersand.
// ⚠️ SWITCHING A FACE MEANS RE-FITTING THE SIZE, not just the name — a title is `[text, baseline,
// size]` and the sizes here were tuned to each old face's width. The BASELINES are deliberately
// unchanged: they clear the shader's photo window, which slices a title that sits too low and only
// shows it on the ring, never on the flat PNG. Measure the rendered PNG, don't eyeball the SVG.
// ─────────────────────────────────────────────────────────────────────────────
import { chromium } from 'playwright-core'
import { readFileSync, writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'

const HERE = dirname(fileURLToPath(import.meta.url))
const REPO = resolve(HERE, '..')
const IMG = `${REPO}/public/images`
const CHROME = process.env.CHROME_PATH || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'

const b64 = (p) => readFileSync(p).toString('base64')
const FONTS = {
  rainbow: { fam: 'Over the Rainbow', fmt: 'woff2', data: b64(`${HERE}/fonts/Over+the+Rainbow.woff2`) },
  italiana: { fam: 'Italiana', fmt: 'woff2', data: b64(`${HERE}/fonts/Italiana.woff2`) },
  monoton: { fam: 'Monoton', fmt: 'woff2', data: b64(`${HERE}/fonts/Monoton.woff2`) },
  bague: { fam: 'Bague', fmt: 'woff', data: b64(`${REPO}/public/fonts/Bague.woff`) },
}
const face = (f) => `@font-face{font-family:'${f.fam}';src:url(data:font/${f.fmt};base64,${f.data}) format('${f.fmt}');}`

// ⚠️ KEYED BY TEXTURE NUMBER (`n`), NOT BY RING ORDER. `cu-p1` is the couple, 2 the day,
// 3 the frames, 4 the gifts — and CHAPTERS in useChapterScene.js is now ordered
// The Big Day → Coco & Uvie → In Frames → For Our Next Chapter, so the two no longer
// line up. Each chapter points at its own `n`; renumbering these to match the ring would
// repaint every card with another chapter's face. bg = accentLight, ink = accent.
// `sub` is the line UNDER the title on the card face — what this chapter is, in a
// guest's words. ⚠️ It replaced two generic lines that were on all four cards, the
// second of which read "OCTOBER TWENTY-SEVEN · TWENTY TWENTY-SIX": a date that has
// been wrong since the couple confirmed the 23rd and the 29th, spelled out in a
// style the user had already rejected elsewhere. It was baked into a PNG, so no
// amount of grepping the data would have found it — only opening the card art.
const CH = [
  {
    n: 1, bg: '#F2EEE8', ink: '#42221A', font: 'italiana',
    // ⚠️ THE LAST BASELINE MUST CLEAR ~385. The shader opens a photo window over the card's
    // lower two-thirds, and it is NOT in this art's coordinate space — the only reliable
    // ruler is the cards that already work: In Frames' lowest title baseline is 380 and is
    // clear, "Coco & Uvie" at 440 and "CHAPTER" at 500 were both sliced in half by it.
    title: [['COCO', 215, 190], ['& UVIE', 380, 190]],   // [text, baseline-y, font-size]
    sub: 'all the way to I do',
    tagline: [
      ['TWO STORIES,', 'xl'], ['ONE BEGINNING:', 'xl'],
      ['our JOURNEY', 'sm'], ['SO FAR', 'xl'],
    ],
  },
  {
    n: 2, bg: '#E9ECE2', ink: '#41492D', font: 'italiana',
    title: [['THE BIG', 200, 190], ['DAY', 390, 190]],
    sub: 'official countdown to our special day',
    // ⚠️ The font subsets beside this script were fetched with the css2 `text=` param, so they
    // hold A–Z and the lower case but NOT arbitrary accents. "JÉ KÁ JÓ" lived here until
    // 2026-09-11 and was exactly that risk; if you reintroduce an accented word, CHECK THE PNG.
    tagline: [
      ['SAVE the DATE —', 'xl'], ['CEREMONY,', 'xl'], ['RECEPTION,', 'xl'],
      ['and a NIGHT of', 'sm'], ['DANCING', 'xl'],
    ],
  },
  {
    n: 3, bg: '#EFE8F5', ink: '#453350', font: 'italiana',
    title: [['IN', 200, 200], ['FRAMES', 380, 200]],
    sub: 'Wedding Photos & Videos',
    tagline: [
      ['MAGICAL MOMENTS:', 'xl'], ['PICTURES & VIDEOS', 'xl'],
      ['WORTH a', 'sm'], ['THOUSAND WORDS', 'xl'],
    ],
  },
  {
    n: 4, bg: '#E8EDF2', ink: '#2E4A52', font: 'italiana',
    title: [['FOR OUR', 235, 132], ['NEXT CHAPTER', 378, 132]],
    sub: 'Support Our Wedding in Cash or Kind',
    tagline: [
      ['YOUR PRESENCE', 'xl'], ['is the', 'sm'], ['GREATEST GIFT —', 'xl'],
      ['but if YOU INSIST,', 'sm'], ['HERE IS OUR', 'xl'], ['WISHLIST', 'xl'],
    ],
  },
]

// ── The laurel ───────────────────────────────────────────────────────────────
// ⚠️ THIS IS THE REFERENCE SITE'S OWN WREATH, and it is here on the owner's instruction: *"that
// svg is not copyrighted, we already had it on ours and deleted it"* — which is literally true of
// this repo. Their four tagline textures (`public/images/txt-1..4.png`) were tracked here until
// d8d7641a (2026-07-24) and the wreath was baked into all four. Two hand-drawn replacements and
// one CC0 substitute were all rejected; this is the mark the couple asked for.
// ⚠️ HOW IT WAS TAKEN OUT: their texture is a flat single-colour raster, so `scripts/` has a
// one-off that flood-fills its components and keeps only those reaching past r=150 from the badge
// centre — the two branches — dropping the 23 glyph blobs of "BEST LOVE STORY / 2024" that sat
// inside. What is stored is an ALPHA MASK (white on transparent, 446×250), not their artwork in
// their colour: the ink below paints through it, so every chapter gets the wreath in its own.
// ⚠️ 446px is plenty. The badge is drawn at 560 in a 2048² texture that renders about 130px wide
// on a 1440 screen — the mask is downsampled at every size the site actually uses.
const LAUREL = readFileSync(`${HERE}/assets/laurel.png`).toString('base64')
const LAUREL_W = 446, LAUREL_H = 250

// The badge: the wreath, with the names above its tips and the year down in the bowl — the same
// arrangement their own badge uses. `currentColor` carries the chapter ink to BOTH the mask fill
// and the type, so there is one colour to set.
const BADGE_W = 560
const badgeHtml = () => `<div class="badge">
  <div class="wreath"></div>
  <div class="bn b1">COCO</div>
  <div class="bn b2">&amp; UVIE</div>
  <div class="by">2026</div>
</div>`

const badgeCss = `
  /* ⚠️ The container carries the ink; everything inside inherits it through currentColor. */
  .badge{position:relative;width:${BADGE_W}px;height:${Math.round((BADGE_W * LAUREL_H) / LAUREL_W) + 43}px;margin-top:56px}
  .badge .wreath{position:absolute;left:0;bottom:0;width:100%;height:${Math.round((BADGE_W * LAUREL_H) / LAUREL_W)}px;
    background:currentColor;
    -webkit-mask:url(data:image/png;base64,${LAUREL}) center/contain no-repeat;
    mask:url(data:image/png;base64,${LAUREL}) center/contain no-repeat}
  .badge .bn,.badge .by{position:absolute;left:0;right:0;text-align:center;font-family:'Bague',serif;line-height:1}
  .badge .bn{font-size:48px;letter-spacing:0.04em}
  .badge .b1{top:40px}
  .badge .b2{top:100px}
  .badge .by{font-size:30px;letter-spacing:0.22em;top:216px;opacity:0.9}
`

const ONLY_TAGLINES = process.argv.includes('--taglines')

const browser = await chromium.launch({ executablePath: CHROME, headless: true })

async function shoot(html, { width, height, out, omitBackground = false, wait = 900 }) {
  const page = await browser.newPage({ viewport: { width, height }, deviceScaleFactor: 1 })
  await page.setContent(html, { waitUntil: 'load' })
  await page.waitForTimeout(wait)
  await page.screenshot({ path: out, omitBackground })
  await page.close()
}

for (const c of CH) {
  const f = FONTS[c.font]
  // ── poster face SVG (editable source) ──
  const titleEls = c.title
    // ⚠️ ESCAPE the title too, not just the sub: "Coco & Uvie" is a title now, and a bare
    // `&` makes the SVG unparseable — the card would render as a blank rectangle.
    .map(([t, y, px]) => `<text x="500" y="${y}" text-anchor="middle" font-family="${f.fam}" font-size="${px}" fill="${c.ink}">${t.replace(/&/g, '&amp;')}</text>`)
    .join('\n')
  const svg = `<svg width="1000" height="1330" viewBox="0 0 1000 1330" fill="none" xmlns="http://www.w3.org/2000/svg">
<style>${face(f)}${face(FONTS.bague)}${face(FONTS.rainbow)}</style>
<rect width="1000" height="1330" fill="${c.bg}"/>
${titleEls}
<!-- ⚠️ The note is HANDWRITTEN (2026-09-06). A script face wants no tracking and a
     larger size than the 30px/2 tracking this used to carry in Bague. -->
<g opacity="0.72" fill="${c.ink}" font-family="Over the Rainbow" font-size="46">
<text x="500" y="1258" text-anchor="middle">${c.sub.replace(/&/g, '&amp;')}</text>
</g>
</svg>`
  // ⚠️ `--taglines` regenerates ONLY cu-txt*.png. The card faces are byte-stable output from
  // the same source, but re-rendering them means re-rasterising four fonts in whatever Chrome
  // happens to be installed — noise in the diff for no change in the art. Use the flag when
  // the edit is to the tagline side.
  if (!ONLY_TAGLINES) {
    writeFileSync(`${IMG}/cu-p${c.n}.svg`, svg)
    // ── poster PNG (fonts baked in — render the SVG inside a real page) ──
    await shoot(
      `<!doctype html><body style="margin:0"><img src="data:image/svg+xml;base64,${Buffer.from(svg).toString('base64')}" style="width:1000px;height:1330px"></body>`,
      { width: 1000, height: 1330, out: `${IMG}/cu-p${c.n}.png`, wait: 1200 }
    )
  }
  // ── tagline PNG ──
  const lines = c.tagline.map(([t, k]) => `<div class="${k}">${t}</div>`).join('')
  await shoot(
    `<!doctype html><style>${face(FONTS.italiana)}${face(FONTS.bague)}
    html,body{margin:0;width:2048px;height:2048px;background:transparent;overflow:hidden}
    .wrap{width:100%;height:100%;display:flex;flex-direction:column;justify-content:center;align-items:center;color:${c.ink};text-align:center}
    .xl{font-family:'Italiana',serif;font-size:204px;line-height:0.82;letter-spacing:-0.01em}
    .sm{font-family:'Bague',serif;font-size:86px;line-height:1.0;letter-spacing:0.06em;opacity:0.9;margin:3px 0}
    /* ⚠️ The badge is part of the TAGLINE texture, not a second plane. One plane means one
       fade, one depth sort and one scale — and the whole group stays centred in the square,
       which is what the scene positions. It also means the badge takes the chapter's ink for
       free. The margin is the gap under the last line of type. */
    ${badgeCss}
    </style><body><div class="wrap">${lines}${badgeHtml()}</div></body>`,
    { width: 2048, height: 2048, out: `${IMG}/cu-txt${c.n}.png`, omitBackground: true }
  )
  console.log(`cu-p${c.n} + cu-txt${c.n} written`)
}

// ── favicon ──
// ⚠️ The old `public/images/favicon.ico` was the REFERENCE SITE's four-pointed star,
// inherited with the replica and never replaced — pale blue-grey, and on a light tab
// bar close to invisible. This is the couple's own mark instead: the ampersand from
// the wordmark, in the site's ink on its own ground, which still reads at 16px.
// A PNG is fine for `rel="icon"` in every browser that matters; no .ico needed.
await shoot(
  `<!doctype html><style>${face(FONTS.italiana)}
  html,body{margin:0;width:180px;height:180px;background:#F3F1EC;overflow:hidden}
  .wrap{width:100%;height:100%;display:flex;justify-content:center;align-items:center}
  .amp{font-family:'Italiana',serif;font-size:150px;line-height:1;color:#33312C}
  </style><body><div class="wrap"><div class="amp">&amp;</div></div></body>`,
  { width: 180, height: 180, out: `${IMG}/cu-favicon.png`, wait: 700 }
)
console.log('cu-favicon written')

// ── logo (transparent — alpha is the shader's accent mask) ──
await shoot(
  `<!doctype html><style>${face(FONTS.bague)}
  html,body{margin:0;width:480px;height:480px;background:transparent;overflow:hidden}
  .wrap{width:100%;height:100%;display:flex;justify-content:center;align-items:center}
  .mark{font-family:'Bague',serif;font-size:42px;letter-spacing:0.12em;color:#111}
  </style><body><div class="wrap"><div class="mark">COVENANT&nbsp;&amp;&nbsp;UVIE</div></div></body>`,
  { width: 480, height: 480, out: `${IMG}/cu-logo.png`, omitBackground: true, wait: 600 }
)
console.log('cu-logo written')

await browser.close()
console.log('done — all textures regenerated into public/images/')
