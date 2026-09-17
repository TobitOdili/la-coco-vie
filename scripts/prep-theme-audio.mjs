// ─────────────────────────────────────────────────────────────────────────────
// Prepare a supplied recording as the site's looping ambient bed.  Run:
//     node scripts/prep-theme-audio.mjs "new frames/<file>.mp3"
//
// Writes public/audio/theme.m4a (AAC 96 kbps CBR), which `SITE.themeAudio` points at and
// app.vue plays through Howler with `loop: true`.
//
// ⚠️ IT LOOPS FOREVER, SO THE JOIN IS THE WHOLE JOB. A commercial recording is mastered to be
// played once: it ends in silence and it STARTS AT FULL LEVEL. Measured on the supplied track —
// The Bayonne Orchestra's violin instrumental, 2:42 — the music stops at 158.0s but the file runs
// to 162.7s, so every loop would have played 4.6 SECONDS OF DEAD AIR and then jumped straight back
// in at −18 dBFS with no fade at all. As an ambient bed under a page that is silent by default,
// that reads as a fault rather than as music.
//
// So this does three things and nothing else — it is not a mastering tool:
//   • TRIM the dead tail back to `TAIL_SILENCE` of breath (found by scanning backwards for the
//     last 50ms window above `SILENCE_DB`, so it adapts to whatever is handed to it);
//   • FADE IN over `FADE_IN`s, because the source has no fade of its own;
//   • keep the recording's OWN fade-out, which is already musical.
//
// ⚠️ The render runs in Chrome's Web Audio and comes back as a WAV via a real download rather than
// base64 — the decoded stereo buffer is ~30 MB and pushing that through `page.evaluate` as a
// string is slow and fragile. `afconvert` then does the AAC encode (no ffmpeg on this machine).
// ─────────────────────────────────────────────────────────────────────────────
import { chromium } from 'playwright-core'
import { readFileSync } from 'node:fs'
import { execFileSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'

const HERE = dirname(fileURLToPath(import.meta.url))
const REPO = resolve(HERE, '..')
const OUT = `${REPO}/public/audio/theme.m4a`
const TMP_WAV = '/tmp/la-coco-vie-theme.wav'
const CHROME = process.env.CHROME_PATH || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'

const FADE_IN = 1.6        // seconds — the source has none of its own
const TAIL_SILENCE = 1.2   // seconds of breath kept after the music stops
const SILENCE_DB = -45     // what counts as "the music has stopped"
const BITRATE = 96000      // AAC CBR; the track is lazily loaded on first interaction

const src = process.argv[2]
if (!src) { console.error('usage: node scripts/prep-theme-audio.mjs "<source audio>"'); process.exit(1) }

const run = async () => {
  const b64 = readFileSync(resolve(REPO, src)).toString('base64')
  const browser = await chromium.launch({ executablePath: CHROME, downloadsPath: '/tmp' })
  const ctx = await browser.newContext({ acceptDownloads: true })
  const page = await ctx.newPage()
  await page.goto('about:blank')
  await page.evaluate(`window.__src = '${b64}'`)
  const info = await page.evaluate(`(async () => {
    const bin = atob(window.__src)
    const buf = new Uint8Array(bin.length); for (let i = 0; i < bin.length; i++) buf[i] = bin.charCodeAt(i)
    const actx = new AudioContext()
    const a = await actx.decodeAudioData(buf.buffer)
    const sr = a.sampleRate, ch = a.numberOfChannels, n = a.length
    const data = [...Array(ch)].map((_, c) => a.getChannelData(c))
    const rms = (from, to) => { let s = 0, m = 0
      for (let i = Math.max(0, from); i < Math.min(n, to); i++) { const v = data[0][i]; s += v * v; m++ }
      return Math.sqrt(s / Math.max(1, m)) }
    const db = (v) => 20 * Math.log10(Math.max(1e-6, v))
    const w = Math.round(sr * 0.05)
    let end = n
    for (let i = n - w; i > 0; i -= w) { if (db(rms(i, i + w)) > ${SILENCE_DB}) { end = i + w; break } }
    const outLen = Math.min(n, end + Math.round(sr * ${TAIL_SILENCE}))
    const fade = Math.round(sr * ${FADE_IN})
    // interleave to 16-bit PCM with the fade applied
    const pcm = new Int16Array(outLen * ch)
    for (let i = 0; i < outLen; i++) {
      const g = i < fade ? (i / fade) * (i / fade) : 1      // squared = a gentler opening
      for (let c = 0; c < ch; c++) {
        let v = data[c][i] * g
        v = Math.max(-1, Math.min(1, v))
        pcm[i * ch + c] = v < 0 ? v * 0x8000 : v * 0x7fff
      }
    }
    const bytes = pcm.length * 2
    const head = new ArrayBuffer(44); const dv = new DataView(head)
    const str = (o, s) => { for (let i = 0; i < s.length; i++) dv.setUint8(o + i, s.charCodeAt(i)) }
    str(0, 'RIFF'); dv.setUint32(4, 36 + bytes, true); str(8, 'WAVE'); str(12, 'fmt ')
    dv.setUint32(16, 16, true); dv.setUint16(20, 1, true); dv.setUint16(22, ch, true)
    dv.setUint32(24, sr, true); dv.setUint32(28, sr * ch * 2, true)
    dv.setUint16(32, ch * 2, true); dv.setUint16(34, 16, true); str(36, 'data'); dv.setUint32(40, bytes, true)
    const blob = new Blob([head, pcm.buffer], { type: 'audio/wav' })
    const url = URL.createObjectURL(blob)
    const a2 = document.createElement('a'); a2.href = url; a2.download = 'theme.wav'
    document.body.appendChild(a2); a2.click()
    return { sr, ch, srcDur: +(n / sr).toFixed(2), musicEndsAt: +(end / sr).toFixed(2), outDur: +(outLen / sr).toFixed(2) }
  })()`)
  const dl = await page.waitForEvent('download', { timeout: 120000 })
  await dl.saveAs(TMP_WAV)
  await browser.close()

  execFileSync('/usr/bin/afconvert', ['-f', 'm4af', '-d', 'aac', '-s', '0', '-b', String(BITRATE), TMP_WAV, OUT])
  const size = readFileSync(OUT).length
  console.log(`source      ${info.srcDur}s  (${info.ch}ch @ ${info.sr}Hz)`)
  console.log(`music ends  ${info.musicEndsAt}s  →  trimmed to ${info.outDur}s with ${TAIL_SILENCE}s of breath`)
  console.log(`fade-in     ${FADE_IN}s`)
  console.log(`wrote       ${OUT}  ${(size / 1048576).toFixed(2)} MB @ ${BITRATE / 1000} kbps AAC`)
}
run()
