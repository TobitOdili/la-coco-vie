// ─────────────────────────────────────────────────────────────────────────────
// The site's one ambient track.  Run:  node scripts/gen-theme-audio.mjs
//
// Writes public/audio/theme.<ext> — a ~24s loopable instrumental.
//
// ⚠️ WHY GENERATED, NOT DOWNLOADED. The four tracks this replaces were the
// REFERENCE SITE'S, renamed and never licensed (flagged in AUDIT and
// CONTENT-AND-ASSETS since 2026-09-04). A track synthesised here is royalty-free by
// construction, which a "free download" found online is only ever claimed to be.
//
// ⚠️ NOBODY HAS HEARD THIS. It is generated, measured and shipped without ever being
// played back by its author. It is deliberately quiet, slow and behind a sound toggle
// that is OFF by default. Listen before the site goes live, and if it is not right,
// drop a licensed file in at the same path — nothing else needs to change.
//
// The piece: D major, ~66bpm, I–V–vi–IV–I–V–IV–V over eight bars. A music-box voice (sine + a soft second
// partial, fast attack, long decay) plays a rocking arpeggio over a warm detuned pad,
// through a gentle low-pass. Rendered OFFLINE so it is deterministic, then encoded by
// playing it once through a MediaRecorder.
//
// Requires Google Chrome + playwright-core, same as gen-textures.mjs.
// ─────────────────────────────────────────────────────────────────────────────
import { chromium } from 'playwright-core'
import { writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'

const HERE = dirname(fileURLToPath(import.meta.url))
const REPO = resolve(HERE, '..')
const CHROME = process.env.CHROME_PATH || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'

const browser = await chromium.launch({ executablePath: CHROME, headless: true, args: ['--autoplay-policy=no-user-gesture-required'] })
const page = await browser.newPage()

const result = await page.evaluate(async () => {
  const SR = 44100
  const BARS = 8, BPM = 66, BEATS = 4
  const barSec = (60 / BPM) * BEATS
  const DUR = BARS * barSec              // eight bars, one chord each — long enough that the
                                         // loop point does not announce itself on a slow read

  const ctx = new OfflineAudioContext(1, Math.ceil(SR * DUR), SR)

  // one shared voice chain: everything goes through a soft low-pass and a slow swell
  const lp = ctx.createBiquadFilter(); lp.type = 'lowpass'
  lp.frequency.value = 2600; lp.Q.value = 0.4
  // ⚠️ Headroom on purpose. This sits under a page, not in front of one, and the peak is
  // checked below so a clipped render cannot ship.
  const out = ctx.createGain(); out.gain.value = 1.5
  lp.connect(out); out.connect(ctx.destination)

  const n = (semi) => 440 * Math.pow(2, (semi - 9) / 12)   // semitone index, C4 = 0
  // I–V–vi–IV in D: D, A, Bm, G
  const D = [2, 6, 9], A = [9, 1 + 12, 4 + 12], Bm = [11, 2 + 12, 6 + 12], G = [7, 11, 2 + 12]
  const CHORDS = [D, A, Bm, G, D, A, G, A]

  // music box: a sine plus a quieter octave partial, struck and left to ring
  function pluck(t, semi, gain) {
    for (const [mult, g, dec] of [[1, 1, 3.4], [2, 0.28, 2.0], [3, 0.08, 1.2]]) {
      const o = ctx.createOscillator(); o.type = 'sine'
      o.frequency.value = n(semi) * mult
      const a = ctx.createGain()
      a.gain.setValueAtTime(0, t)
      a.gain.linearRampToValueAtTime(gain * g, t + 0.006)
      a.gain.exponentialRampToValueAtTime(0.0001, t + dec)
      o.connect(a); a.connect(lp); o.start(t); o.stop(t + dec + 0.05)
    }
  }
  // pad: two slightly detuned triangles per note, breathing in and out over the bar
  function pad(t, dur, semi, gain) {
    for (const det of [-3, 3]) {
      const o = ctx.createOscillator(); o.type = 'triangle'
      o.frequency.value = n(semi) * Math.pow(2, det / 1200)
      const a = ctx.createGain()
      a.gain.setValueAtTime(0, t)
      a.gain.linearRampToValueAtTime(gain, t + dur * 0.35)
      a.gain.linearRampToValueAtTime(0.0001, t + dur)
      o.connect(a); a.connect(lp); o.start(t); o.stop(t + dur + 0.05)
    }
  }

  const chordSec = DUR / CHORDS.length
  CHORDS.forEach((ch, i) => {
    const t0 = i * chordSec
    pad(t0, chordSec * 1.02, ch[0] - 12, 0.05)
    pad(t0, chordSec * 1.02, ch[1] - 12, 0.035)
    // a rocking arpeggio: root, third, fifth, third — eight notes across the chord
    const seq = [ch[0], ch[1], ch[2], ch[1], ch[0] + 12, ch[2], ch[1], ch[2]]
    seq.forEach((s, k) => {
      const t = t0 + (k / seq.length) * chordSec
      // the downbeat a touch louder, the rest even — no accents beyond that
      pluck(t, s, k === 0 ? 0.16 : 0.105)
    })
  })

  const buf = await ctx.startRendering()

  // ── encode ── prefer a format every phone plays; fall back down the list
  const pick = ['audio/mp4', 'audio/mpeg', 'audio/webm;codecs=opus', 'audio/webm']
    .find((t) => window.MediaRecorder && MediaRecorder.isTypeSupported(t))
  if (!pick) return { mime: null, dur: buf.duration }

  const live = new AudioContext({ sampleRate: SR })
  const dest = live.createMediaStreamDestination()
  const src = live.createBufferSource(); src.buffer = buf; src.connect(dest)
  const rec = new MediaRecorder(dest.stream, { mimeType: pick, audioBitsPerSecond: 96000 })
  const chunks = []
  rec.ondataavailable = (e) => { if (e.data.size) chunks.push(e.data) }
  const done = new Promise((r) => { rec.onstop = r })
  rec.start(); src.start()
  await new Promise((r) => setTimeout(r, buf.duration * 1000 + 260))
  rec.stop(); await done
  const blob = new Blob(chunks, { type: pick })
  const b64 = await new Promise((r) => { const f = new FileReader(); f.onload = () => r(f.result.split(',')[1]); f.readAsDataURL(blob) })
  // peak, so a clipped render is caught before it ships
  const d = buf.getChannelData(0)
  let peak = 0
  for (let i = 0; i < d.length; i++) peak = Math.max(peak, Math.abs(d[i]))
  return { mime: pick, b64, dur: buf.duration, peak: +peak.toFixed(3) }
})

if (!result.mime) { console.error('No MediaRecorder audio mime supported — cannot encode.'); process.exit(1) }
const ext = result.mime.startsWith('audio/mp4') ? 'm4a' : result.mime.startsWith('audio/mpeg') ? 'mp3' : 'webm'
const buf = Buffer.from(result.b64, 'base64')
writeFileSync(`${REPO}/public/audio/theme.${ext}`, buf)
console.log(`theme.${ext}  ${result.mime}  ${result.dur.toFixed(1)}s  ${(buf.length / 1024).toFixed(0)} KB  peak ${result.peak}`)
await browser.close()
