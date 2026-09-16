// ─────────────────────────────────────────────────────────────────────────────
// Grain tile generator.  Run:  node scripts/gen-noise.mjs
//
// Writes public/images/noise.png — the film-grain overlay tiled by `body::after`
// (opacity 0.4) and by In Frames' `.room-grain` (scaled to 200px, opacity 0.13).
//
// ⚠️ WHY THIS SCRIPT EXISTS. The tile that shipped until 2026-09-16 was the reference site's:
// 500×500 FULL-COLOUR RGBA with 204 distinct alpha levels and 253 distinct reds — 773 KB, and
// **34–43% of every page's image payload**, downloaded identically by a 360px phone and a 2560px
// desktop. Random colour does not compress, which is the whole story: 250,000 px × ~3.1 bytes.
//
// Grain at 0.4 opacity over a near-neutral site carries no colour information anyone can see —
// measured, only 41.5% of its pixels were even grey — so this generates a GREYSCALE tile and
// quantises both grey and alpha to 16 levels. Fewer symbols compress; the look is unchanged.
//
// ⚠️ THE TILE IS SMALLER (500 → 180) AND THAT IS SAFE HERE, but it is the one parameter that could
// show: a repeating tile can reveal its seam. Two things hide it — `body::after` is 20rem larger
// than the viewport and jitters by up to 9rem every 100ms (the `noise` keyframes), and In Frames
// already rescales it to 200px. Checked side by side against the old tile at 390 and 1440.
//
// ⚠️ THE NUMBERS WERE MATCHED BY EYE AGAINST THE OLD TILE, A/B, ON THE SAME CROP WITH THE JITTER
// ANIMATION FROZEN — not derived. The first attempt reproduced the original's *statistics*
// (alpha ceiling 220, 67% of pixels under alpha 32, hard-bimodal grey) and looked WRONG: sparse
// hard specks where the original is a fine even texture. Grain is read as a field, not as a
// histogram. A low ceiling with a gentle curve puts many faint pixels on screen instead of a few
// strong ones, which is what "fine" actually means here. If you change any of these four, do the
// A/B again: freeze `body::after`'s animation, screenshot the same crop of flat paper, compare.
// ─────────────────────────────────────────────────────────────────────────────
import { chromium } from 'playwright-core'
import { writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'

const HERE = dirname(fileURLToPath(import.meta.url))
const OUT = resolve(HERE, '..', 'public/images/noise.png')
const CHROME = process.env.CHROME_PATH || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'

const SIZE = Number(process.env.N_SIZE || 180)        // tile edge, px
const LEVELS = Number(process.env.N_LEVELS || 16)      // quantisation steps for BOTH grey and alpha
const ALPHA_MAX = Number(process.env.N_AMAX || 90)    // alpha ceiling — see the note below
const ALPHA_GAMMA = Number(process.env.N_GAMMA || 1.6) // weighting of the alpha curve
const DARK_HI = Number(process.env.N_DARK || 130)     // top of the dark speck range
const LIGHT_LO = Number(process.env.N_LIGHT || 138)   // bottom of the light speck range

const run = async () => {
  const browser = await chromium.launch({ executablePath: CHROME })
  const page = await (await browser.newContext()).newPage()
  await page.goto('about:blank')
  const dataUrl = await page.evaluate(`(() => {
    const SIZE = ${SIZE}, LEVELS = ${LEVELS}, AMAX = ${ALPHA_MAX}, GAMMA = ${ALPHA_GAMMA}
    const DARK_HI = ${DARK_HI}, LIGHT_LO = ${LIGHT_LO}
    const q = (v, max) => Math.round(Math.round(v / (max / LEVELS)) * (max / LEVELS))
    const c = document.createElement('canvas'); c.width = c.height = SIZE
    const ctx = c.getContext('2d')
    const img = ctx.createImageData(SIZE, SIZE)
    const d = img.data
    for (let i = 0; i < d.length; i += 4) {
      // bimodal grey: the original's reds clustered at both ends, which is what makes grain read
      // as specks of light AND dark rather than a grey fog.
      const g = q(Math.random() < 0.5 ? Math.random() * DARK_HI : LIGHT_LO + Math.random() * (255 - LIGHT_LO), 255)
      const a = q(Math.pow(Math.random(), GAMMA) * AMAX, 255)
      d[i] = d[i + 1] = d[i + 2] = g
      d[i + 3] = a
    }
    ctx.putImageData(img, 0, 0)
    return c.toDataURL('image/png')
  })()`)
  writeFileSync(OUT, Buffer.from(dataUrl.split(',')[1], 'base64'))
  await browser.close()
  console.log('wrote', OUT)
}
run()
