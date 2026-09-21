// ─────────────────────────────────────────────────────────────────────────────
// Share-card generator — the image a link unfurls to.  Run:  npm run gen:og
//
// Produces public/og/{home,us,the-big-day,in-frames,with-love}.jpg at 1200×630, the size
// every unfurler crops to. Committed to the repo: `scripts/gen-head.mjs` points the shells
// at them on every build, and THAT script must stay browser-free so it can run on Vercel.
// This one needs Chrome, like gen-textures.mjs, so it is a local step whose output ships.
//
// Each card is the chapter's own ground and ink with its own still beside it — the same
// photograph the card's film opens on, so the preview looks like the page it opens.
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
const jpg = (p) => `data:image/jpeg;base64,${b64(p)}`
const laurel = b64(`${HERE}/assets/laurel.png`)

const CARDS = [
  { key: 'home', bg: '#F7F6F4', ink: '#2E2A24', photo: `${IMG}/still-us.jpg`,
    over: 'THE WEDDING OF', title: 'COVENANT & UVIE', under: SITE.subtitle, badge: true },
  { key: 'us', bg: '#F2EEE8', ink: '#42221A', photo: `${IMG}/still-us.jpg`,
    over: 'CHAPTER ONE', title: 'COCO & UVIE', under: 'two stories, one beginning' },
  { key: 'the-big-day', bg: '#E9ECE2', ink: '#41492D', photo: `${IMG}/still-the-big-day.jpg`,
    over: 'CHAPTER TWO', title: 'THE BIG DAY', under: 'ceremony, reception, and a night of dancing' },
  { key: 'in-frames', bg: '#EFE8F5', ink: '#453350', photo: `${IMG}/still-in-frames.jpg`,
    over: 'CHAPTER THREE', title: 'IN FRAMES', under: 'photographs and film from the day' },
  { key: 'with-love', bg: '#E8EDF2', ink: '#2E4A52', photo: `${IMG}/still-with-love.jpg`,
    over: 'CHAPTER FOUR', title: 'FOR OUR NEXT CHAPTER', under: 'your presence is the greatest gift' },
]

const browser = await chromium.launch({ executablePath: CHROME, headless: true })

for (const c of CARDS) {
  // ⚠️ The title's size is set from its LENGTH, not by a media query: "FOR OUR NEXT CHAPTER"
  // is twice "IN FRAMES" and a single size either wraps one or leaves the other tiny.
  const size = c.title.length > 16 ? 76 : c.title.length > 11 ? 92 : 112
  const html = `<!doctype html><style>
    ${face(FONTS.italiana)}${face(FONTS.bague)}
    *{margin:0;padding:0;box-sizing:border-box}
    html,body{width:1200px;height:630px;overflow:hidden}
    .card{width:1200px;height:630px;display:flex;background:${c.bg};color:${c.ink};position:relative}
    .type{flex:0 0 660px;padding:74px 56px 64px 76px;display:flex;flex-direction:column;justify-content:space-between}
    .over{font-family:'Bague',serif;font-size:19px;letter-spacing:0.34em;text-transform:uppercase;opacity:0.75}
    .title{font-family:'Italiana',serif;font-size:${size}px;line-height:0.95;letter-spacing:-0.005em}
    .under{font-family:'Bague',serif;font-size:23px;letter-spacing:0.05em;opacity:0.82;margin-top:20px;max-width:30ch}
    .foot{font-family:'Bague',serif;font-size:19px;letter-spacing:0.19em;text-transform:uppercase;opacity:0.8;
          display:flex;align-items:center;gap:18px}
    .wreath{width:96px;height:54px;background:currentColor;flex:0 0 auto;
      -webkit-mask:url(data:image/png;base64,${laurel}) center/contain no-repeat}
    .shot{flex:1 1 auto;position:relative;overflow:hidden}
    .shot img{width:100%;height:100%;object-fit:cover;object-position:center 32%;display:block}
    /* the ground bleeds a little way into the photograph so the two are one card, not two */
    .shot::after{content:'';position:absolute;inset:0;background:linear-gradient(90deg, ${c.bg} 0%, ${c.bg}00 22%)}
  </style><body><div class="card">
    <div class="type">
      <div>
        <div class="over">${c.over}</div>
        <div class="title" style="margin-top:16px">${c.title.replace(/&/g, '&amp;')}</div>
        <div class="under">${c.under}</div>
      </div>
      <div class="foot">${c.badge ? '<span class="wreath"></span>' : ''}<span>${SITE.dateLabel.replace(/·/g, '·')}</span></div>
    </div>
    <div class="shot"><img src="${jpg(c.photo)}"></div>
  </div></body>`

  const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 })
  await page.setContent(html, { waitUntil: 'load' })
  await page.waitForTimeout(900)
  await page.screenshot({ path: `${OUT}/${c.key}.jpg`, type: 'jpeg', quality: 86 })
  await page.close()
  console.log(`og/${c.key}.jpg`)
}
await browser.close()
console.log('done — commit public/og/, gen-head.mjs points the shells at it')
