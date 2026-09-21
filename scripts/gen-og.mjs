// ─────────────────────────────────────────────────────────────────────────────
// Share-card generator — the image a link unfurls to.  Run:  npm run gen:og
//
// Produces public/og/{home,us,the-big-day,in-frames,with-love}.jpg at 1200×630, the size
// every unfurler crops to. Committed to the repo: `scripts/gen-head.mjs` points the shells
// at them on every build, and THAT script must stay browser-free so it can run on Vercel.
// This one needs Chrome, like gen-textures.mjs, so it is a local step whose output ships.
//
// ⚠️ NO PHOTOGRAPHS. The first cut put each chapter's own still beside the type — a reasonable
// idea, and wrong for this site: the couple, 2026-09-21, *"let's keep it more along the lines of
// the site language. Maybe the text mesh against the homepage bg or some elements lifted from the
// site - No photos though."* So every card is now built from things the site already draws:
//   • the chapter's paper (`accentLight`) under the same grain the page wears (public/images/noise.png,
//     at the body::after opacity), so the ground IS the ground;
//   • the CENTRE TAGLINE ITSELF — public/images/cu-txt{1..4}.png, the very texture the WebGL scene
//     hangs in the middle of the deck, already inked in its chapter's colour and already carrying
//     the couple's wreath under it. Cropped to its own ink (measured per file, they are 2048² with
//     the art in the middle) so the card is the artwork rather than a picture of a big canvas.
//   • and nothing else but a hairline and the date.
// The homepage card is the one exception: there is no single tagline for it, so it is the title
// block the site would set — the names in Italiana with the wreath under them.
//
// ⚠️ COLOURS ARE COPIED, NOT IMPORTED. `CHAPTERS` lives in composables/useChapterScene.js,
// which imports Three.js — pulling that into a build script drags the whole engine with it
// (the same reason nuxt.config hardcodes the prerender routes). Keep these in sync with
// CHAPTERS and with `CH` in gen-textures.mjs; they are the same four pairs.
// ─────────────────────────────────────────────────────────────────────────────
import { chromium } from 'playwright-core'
import { readFileSync, mkdirSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'
import { SITE } from '../site.config.js'

const HERE = dirname(fileURLToPath(import.meta.url))
const REPO = resolve(HERE, '..')
const IMG = `${REPO}/public/images`
const OUT = `${REPO}/public/og`
const CHROME = process.env.CHROME_PATH || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
mkdirSync(OUT, { recursive: true })

const b64 = (p) => readFileSync(p).toString('base64')
const FONTS = {
  italiana: { fam: 'Italiana', fmt: 'woff2', data: b64(`${HERE}/fonts/Italiana.woff2`) },
  bague: { fam: 'Bague', fmt: 'woff', data: b64(`${REPO}/public/fonts/Bague.woff`) },
}
const face = (f) => `@font-face{font-family:'${f.fam}';src:url(data:font/${f.fmt};base64,${f.data}) format('${f.fmt}');}`
const png = (p) => `data:image/png;base64,${b64(p)}`
const laurel = b64(`${HERE}/assets/laurel.png`)

// ⚠️ `crop` is the tagline's ink bounding box inside its 2048² texture, measured from the alpha
// channel. It is here rather than computed at run time because it only changes when the taglines
// are regenerated — and when they are, re-measure: the four are not the same shape (1.19 to 1.79).
const CARDS = [
  { key: 'home', bg: '#F7F6F4', ink: '#2E2A24', title: true },
  { key: 'us', bg: '#F2EEE8', ink: '#42221A', eyebrow: 'Coco & Uvie',
    txt: `${IMG}/cu-txt1.png`, crop: { x: 318, y: 528, w: 1403, h: 999 } },
  { key: 'the-big-day', bg: '#E9ECE2', ink: '#41492D', eyebrow: 'The Big Day',
    txt: `${IMG}/cu-txt2.png`, crop: { x: 306, y: 435, w: 1431, h: 1176 } },
  { key: 'in-frames', bg: '#EFE8F5', ink: '#453350', eyebrow: 'In Frames',
    txt: `${IMG}/cu-txt3.png`, crop: { x: 136, y: 528, w: 1784, h: 999 } },
  { key: 'with-love', bg: '#E8EDF2', ink: '#2E4A52', eyebrow: 'For Our Next Chapter',
    txt: `${IMG}/cu-txt4.png`, crop: { x: 274, y: 398, w: 1499, h: 1259 } },
]

const browser = await chromium.launch({ executablePath: CHROME, headless: true })
const noise = png(`${IMG}/noise.png`)

for (const c of CARDS) {
  // ⚠️ THE TAGLINE IS PLACED BY ITS CROP, NOT BY `object-fit`. The art sits in the middle of a
  // 2048² texture with a different margin on every side, so fitting the whole file would centre the
  // CANVAS and leave the artwork off-centre and small. Scaling the image up by (2048 / crop) and
  // pulling it back by the crop's own origin puts the ink itself in the box.
  const art = c.txt ? (() => {
    // ⚠️ 360, not 400. The tallest of the four (For Our Next Chapter, 1.19:1) filled the box and
    // its wreath then sat ON the footer rule — measured, 1px of clearance. The widest (In Frames,
    // 1.79:1) is limited by the width anyway, so this costs it nothing.
    const box = { w: 900, h: 360 }                       // the room the artwork gets
    const k = Math.min(box.w / c.crop.w, box.h / c.crop.h)
    const full = 2048 * k
    return `<div class="art" style="width:${(c.crop.w * k).toFixed(1)}px;height:${(c.crop.h * k).toFixed(1)}px">
      <img src="${png(c.txt)}" style="width:${full.toFixed(1)}px;height:${full.toFixed(1)}px;
        margin-left:${(-c.crop.x * k).toFixed(1)}px;margin-top:${(-c.crop.y * k).toFixed(1)}px">
    </div>`
  })() : ''

  const html = `<!doctype html><style>
    ${face(FONTS.italiana)}${face(FONTS.bague)}
    *{margin:0;padding:0;box-sizing:border-box}
    html,body{width:1200px;height:630px;overflow:hidden}
    .card{width:1200px;height:630px;background:${c.bg};color:${c.ink};position:relative;
      display:flex;flex-direction:column;align-items:center;justify-content:center;
      padding:64px 80px;text-align:center}
    /* the page's own grain, at the page's own opacity — see body::after in assets/css/main.css */
    .card::after{content:'';position:absolute;inset:-40px;background-image:url(${noise});
      background-position:center;opacity:0.4;pointer-events:none}
    .art{overflow:hidden;flex:0 0 auto}
    .art img{display:block}
    .eyebrow{font-family:'Bague',serif;font-size:19px;letter-spacing:0.34em;text-transform:uppercase;
      opacity:0.7;margin-bottom:30px}
    .title{font-family:'Italiana',serif;font-size:118px;line-height:1.0;letter-spacing:0.005em}
    .over{font-family:'Bague',serif;font-size:20px;letter-spacing:0.36em;text-transform:uppercase;opacity:0.7}
    .under{font-family:'Bague',serif;font-size:24px;letter-spacing:0.05em;opacity:0.8;margin-top:22px}
    .wreath{width:150px;height:84px;background:currentColor;margin:26px auto 0;
      -webkit-mask:url(data:image/png;base64,${laurel}) center/contain no-repeat}
    /* the footer is the site's own hairline-and-small-caps, nothing more */
    .foot{position:absolute;left:80px;right:80px;bottom:46px;display:flex;justify-content:space-between;
      align-items:center;font-family:'Bague',serif;font-size:18px;letter-spacing:0.2em;
      text-transform:uppercase;opacity:0.72}
    .rule{position:absolute;left:80px;right:80px;bottom:96px;height:1px;background:currentColor;opacity:0.25}
  </style><body><div class="card">
    ${c.title ? `<div class="over">The wedding of</div>
        <div class="title" style="margin-top:22px">COVENANT &amp; UVIE</div>
        <div class="under">${SITE.subtitle}</div>
        <div class="wreath"></div>`
      : `<div class="eyebrow">${c.eyebrow}</div>${art}`}
    <div class="rule"></div>
    <div class="foot"><span>${SITE.dateLabel}</span><span>${SITE.url.replace(/^https?:\/\//, '')}</span></div>
  </div></body>`

  const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 })
  await page.setContent(html, { waitUntil: 'load' })
  await page.waitForTimeout(900)
  await page.screenshot({ path: `${OUT}/${c.key}.jpg`, type: 'jpeg', quality: 88 })
  await page.close()
  console.log(`og/${c.key}.jpg`)
}
await browser.close()
console.log('done — commit public/og/, gen-head.mjs points the shells at it')
