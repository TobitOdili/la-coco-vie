// ─────────────────────────────────────────────────────────────────────────────
// Smaller variants of the heavy art, for small screens.  Run:
//     node scripts/gen-image-variants.mjs
//
// Writes, into public/images/:
//   cu-txt1..4-sm.png   1024×1024  (from the 2048² originals)
//   us/<name>-sm.jpg    600px wide (from the ~900px originals)
//
// ⚠️ WHY. Measured 2026-09-16: every route shipped 1.8–2.3 MB of images and the bytes were
// IDENTICAL on a 360px phone and a 2560px desktop — nothing scaled to anything. The taglines were
// the worst offender after the grain tile: four 2048×2048 PNGs (~575 KB) that a phone renders at
// about 390 CSS px, and which cost ~67 MB of VRAM decoded (4 × 2048² × 4 bytes) on exactly the
// devices least able to spare it.
//
// ⚠️ THE CHOICE IS MADE AT LOAD TIME, IN THE SCENE, not by the browser: these are WebGL textures,
// so there is no <img> and `srcset` cannot help. See `txtFor()` in composables/useChapterScene.js
// — and keep the threshold there and the size here in step.
//
// ⚠️ RE-RUN THIS AFTER `gen-textures.mjs`. The variants are derived from the originals and will
// silently keep showing the old art otherwise.
// ─────────────────────────────────────────────────────────────────────────────
import { chromium } from 'playwright-core'
import { readFileSync, writeFileSync, readdirSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'

const HERE = dirname(fileURLToPath(import.meta.url))
const IMG = resolve(HERE, '..', 'public/images')
const CHROME = process.env.CHROME_PATH || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'

// [source, output, longest edge, mime, quality]
const JOBS = [
  ...[1, 2, 3, 4].map((i) => [`cu-txt${i}.png`, `cu-txt${i}-sm.png`, 1024, 'image/png', 1]),
  ...readdirSync(`${IMG}/us`).filter((f) => /\.jpe?g$/i.test(f) && !/-sm\./.test(f))
    .map((f) => [`us/${f}`, `us/${f.replace(/\.jpe?g$/i, '-sm.jpg')}`, 600, 'image/jpeg', 0.82]),
  // ⚠️ THE REEL THUMBS ARE DECORATION, and tiny decoration at that: In Frames drifts them
  // behind the room at 0.12 opacity in a 95.8px box, and they were shipping at 560px — 5.8x
  // oversized on every phone and tablet, 2.66x at 1920 (AUDIT #138). There is no larger
  // original in that folder; the `-sm` files ARE the sources, so this is a second step down.
  // ⚠️ SOURCE IN scripts/assets/reel/, OUTPUT IN public/ — the 560px files were the only
  // copies and were being deployed for a 96px slot. They are sources now, like the poster
  // SVGs (AUDIT #108); only the 240px thumbs ship. 393 KB → 47 KB.
  ...readdirSync(`${HERE}/assets/reel`).filter((f) => /-sm\.jpe?g$/i.test(f))
    .map((f) => [`../../scripts/assets/reel/${f}`, `reel/${f.replace(/-sm\.jpe?g$/i, '-xs.jpg')}`, 240, 'image/jpeg', 0.8]),
]

const run = async () => {
  const browser = await chromium.launch({ executablePath: CHROME })
  const page = await (await browser.newContext()).newPage()
  await page.goto('about:blank')
  for (const [src, out, edge, mime, q] of JOBS) {
    const b64 = readFileSync(`${IMG}/${src}`).toString('base64')
    const mimeIn = /\.png$/i.test(src) ? 'image/png' : 'image/jpeg'
    const dataUrl = await page.evaluate(`(async () => {
      const img = new Image()
      await new Promise((res, rej) => { img.onload = res; img.onerror = rej
        img.src = 'data:${mimeIn};base64,${b64}' })
      const k = Math.min(1, ${edge} / Math.max(img.width, img.height))
      const c = document.createElement('canvas')
      c.width = Math.round(img.width * k); c.height = Math.round(img.height * k)
      const x = c.getContext('2d')
      // Canvas downscaling in one step is box-ish and soft; 'high' asks for the good filter.
      x.imageSmoothingEnabled = true; x.imageSmoothingQuality = 'high'
      x.drawImage(img, 0, 0, c.width, c.height)
      return c.toDataURL('${mime}', ${q})
    })()`)
    const buf = Buffer.from(dataUrl.split(',')[1], 'base64')
    writeFileSync(`${IMG}/${out}`, buf)
    const was = readFileSync(`${IMG}/${src}`).length
    console.log(`${src.padEnd(26)} ${(was / 1024).toFixed(0).padStart(5)} KB  →  ${out.padEnd(30)} ${(buf.length / 1024).toFixed(0).padStart(5)} KB`)
  }
  await browser.close()
}
run()
