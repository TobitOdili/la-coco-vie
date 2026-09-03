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

// One entry per chapter (index-aligned with CHAPTERS). bg = accentLight, ink = accent.
// `sub` is the line UNDER the title on the card face — what this chapter is, in a
// guest's words. ⚠️ It replaced two generic lines that were on all four cards, the
// second of which read "OCTOBER TWENTY-SEVEN · TWENTY TWENTY-SIX": a date that has
// been wrong since the couple confirmed the 23rd and the 29th, spelled out in a
// style the user had already rejected elsewhere. It was baked into a PNG, so no
// amount of grepping the data would have found it — only opening the card art.
const CH = [
  {
    n: 1, bg: '#F2EEE8', ink: '#42221A', font: 'rainbow',
    title: [['Us', 230, 300]],   // [text, baseline-y, font-size]
    sub: 'Our Journey So Far',
    tagline: [
      ['TWO STORIES,', 'xl'], ['ONE', 'sm'], ['BEGINNING —', 'xl'],
      ['the TALE of', 'sm'], ['COVENANT', 'xl'], ['&', 'sm'], ['UVIE', 'xl'],
    ],
  },
  {
    n: 2, bg: '#E9ECE2', ink: '#41492D', font: 'italiana',
    title: [['THE BIG', 200, 190], ['DAY', 390, 190]],
    sub: 'Wedding Details: Times and Dates',
    tagline: [
      ['SAVE the DATE —', 'xl'], ['CEREMONY,', 'xl'], ['RECEPTION,', 'xl'],
      ['and a NIGHT of', 'sm'], ['DANCING', 'xl'], ['under the STARS', 'sm'],
    ],
  },
  {
    n: 3, bg: '#EFE8F5', ink: '#453350', font: 'monoton',
    title: [['IN', 200, 150], ['FRAMES', 380, 150]],
    sub: 'Wedding Photos & Videos',
    tagline: [
      ['MAGICAL MOMENTS:', 'xl'], ['PICTURES & VIDEOS', 'xl'],
      ['WORTH a', 'sm'], ['THOUSAND WORDS', 'xl'],
    ],
  },
  {
    n: 4, bg: '#E8EDF2', ink: '#2E4A52', font: 'bague',
    title: [['WITH', 210, 200], ['LOVE', 400, 200]],
    sub: 'Support Our Wedding in Cash or Kind',
    tagline: [
      ['YOUR PRESENCE', 'xl'], ['is the', 'sm'], ['GREATEST GIFT —', 'xl'],
      ['but if YOU INSIST,', 'sm'], ['HERE IS OUR', 'xl'], ['WISHLIST', 'xl'],
    ],
  },
]

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
    .map(([t, y, px]) => `<text x="500" y="${y}" text-anchor="middle" font-family="${f.fam}" font-size="${px}" fill="${c.ink}">${t}</text>`)
    .join('\n')
  const svg = `<svg width="1000" height="1330" viewBox="0 0 1000 1330" fill="none" xmlns="http://www.w3.org/2000/svg">
<style>${face(f)}${face(FONTS.bague)}</style>
<rect width="1000" height="1330" fill="${c.bg}"/>
${titleEls}
<g opacity="0.62" fill="${c.ink}" font-family="Bague" font-size="30" letter-spacing="2">
<text x="500" y="1262" text-anchor="middle">${c.sub.replace(/&/g, '&amp;')}</text>
</g>
</svg>`
  writeFileSync(`${IMG}/cu-p${c.n}.svg`, svg)
  // ── poster PNG (fonts baked in — render the SVG inside a real page) ──
  await shoot(
    `<!doctype html><body style="margin:0"><img src="data:image/svg+xml;base64,${Buffer.from(svg).toString('base64')}" style="width:1000px;height:1330px"></body>`,
    { width: 1000, height: 1330, out: `${IMG}/cu-p${c.n}.png`, wait: 1200 }
  )
  // ── tagline PNG ──
  const lines = c.tagline.map(([t, k]) => `<div class="${k}">${t}</div>`).join('')
  await shoot(
    `<!doctype html><style>${face(FONTS.italiana)}${face(FONTS.bague)}
    html,body{margin:0;width:2048px;height:2048px;background:transparent;overflow:hidden}
    .wrap{width:100%;height:100%;display:flex;flex-direction:column;justify-content:center;align-items:center;color:${c.ink};text-align:center}
    .xl{font-family:'Italiana',serif;font-size:204px;line-height:0.82;letter-spacing:-0.01em}
    .sm{font-family:'Bague',serif;font-size:86px;line-height:1.0;letter-spacing:0.06em;opacity:0.9;margin:3px 0}
    </style><body><div class="wrap">${lines}</div></body>`,
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
