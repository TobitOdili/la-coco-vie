// ─────────────────────────────────────────────────────────────────────────────
// First-frame stills for the card photo windows.  Run:  node scripts/gen-stills.mjs
//
// Produces public/images/still-{slug}.jpg — one per chapter film.
//
// ⚠️ WHY THIS EXISTS. The card's photo window IS the video texture; there is no still
// behind it. So until a film had played, every window on the homepage was empty — and on
// a touch device, where nothing hovers, they stayed empty. Priming the <video> elements
// instead works, but measured on a prod build it pulls the WHOLE 6.3 MB of film to show
// four motionless frames (Chrome fetches short files entire, whatever `preload` says).
// These four JPEGs are ~40 KB each and load with the poster textures.
//
// Requires Google Chrome + playwright-core, same as gen-textures.mjs.
// ─────────────────────────────────────────────────────────────────────────────
import { chromium } from 'playwright-core'
import { writeFileSync, statSync, createReadStream } from 'node:fs'
import { createServer } from 'node:http'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'

const HERE = dirname(fileURLToPath(import.meta.url))
const REPO = resolve(HERE, '..')
const CHROME = process.env.CHROME_PATH || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
const SLUGS = ['the-big-day', 'us', 'in-frames', 'with-love']
// ⚠️ Match the frame the film actually starts on — the window has to hand over to playback
// without a cut. 0.04s, not 0: some encoders' first sample sits fractionally after zero.
const AT = 0.04
const MAX_W = 720          // the window is a few hundred px on screen; 720 is already generous

// ⚠️ Serve the films over HTTP rather than pointing the <video> at a file:// URL. An
// about:blank page cannot load file:// media at all (the first cut of this script failed on
// exactly that), and Chrome will not SEEK unless the server answers Range requests — which
// is the whole job here. Fifteen lines of node:http beats another dependency.
const srv = createServer((req, res) => {
  const path = decodeURIComponent(req.url.split('?')[0])
  // The page itself: an empty document, only so that the <video> below is SAME-ORIGIN with
  // the media it loads. Everything else is read straight out of public/.
  if (path === '/') {
    res.writeHead(200, { 'Content-Type': 'text/html' })
    return res.end('<!doctype html><meta charset="utf-8"><title>stills</title>')
  }
  const file = `${REPO}/public${path}`
  let st
  try { st = statSync(file) } catch { res.writeHead(404); return res.end() }
  if (st.isDirectory()) { res.writeHead(404); return res.end() }
  const size = st.size
  const range = req.headers.range
  const head = { 'Content-Type': 'video/mp4', 'Accept-Ranges': 'bytes' }
  if (range) {
    const [a, b] = range.replace('bytes=', '').split('-')
    const start = parseInt(a, 10) || 0
    const end = b ? parseInt(b, 10) : size - 1
    res.writeHead(206, { ...head, 'Content-Range': `bytes ${start}-${end}/${size}`, 'Content-Length': end - start + 1 })
    return createReadStream(file, { start, end }).pipe(res)
  }
  res.writeHead(200, { ...head, 'Content-Length': size })
  createReadStream(file).pipe(res)
})
await new Promise((r) => srv.listen(0, '127.0.0.1', r))
const ORIGIN = `http://127.0.0.1:${srv.address().port}`

const browser = await chromium.launch({ executablePath: CHROME, headless: true })
const page = await browser.newPage()
await page.goto(`${ORIGIN}/`)   // same-origin with the media, so the <video> is allowed to load it
for (const slug of SLUGS) {
  const dataUrl = await page.evaluate(async ({ src, at, maxW }) => {
    const v = document.createElement('video')
    v.src = src; v.muted = true; v.playsInline = true; v.preload = 'auto'
    document.body.appendChild(v)
    await new Promise((res, rej) => {
      v.addEventListener('loadeddata', res, { once: true })
      v.addEventListener('error', () => rej(new Error('load failed')), { once: true })
    })
    await new Promise((res) => { v.addEventListener('seeked', res, { once: true }); v.currentTime = at })
    const w = Math.min(maxW, v.videoWidth)
    const h = Math.round((w / v.videoWidth) * v.videoHeight)
    const c = document.createElement('canvas'); c.width = w; c.height = h
    c.getContext('2d').drawImage(v, 0, 0, w, h)
    return { url: c.toDataURL('image/jpeg', 0.82), w, h, natural: [v.videoWidth, v.videoHeight] }
  }, { src: `${ORIGIN}/video/${slug}.mp4`, at: AT, maxW: MAX_W })

  const buf = Buffer.from(dataUrl.url.split(',')[1], 'base64')
  const out = `${REPO}/public/images/still-${slug}.jpg`
  writeFileSync(out, buf)
  console.log(`still-${slug}.jpg  ${dataUrl.w}×${dataUrl.h} (from ${dataUrl.natural.join('×')})  ${(buf.length / 1024).toFixed(0)} KB`)
}
await browser.close()
srv.close()
