import { chromium } from 'playwright-core'
import { readFileSync } from 'node:fs'
const browser = await chromium.launch({ channel:'chrome', args:['--autoplay-policy=no-user-gesture-required'] })
const page = await browser.newPage()
await page.goto('about:blank')
const b64 = readFileSync('public/audio/theme.m4a').toString('base64')
console.log(JSON.stringify(await page.evaluate(async (b) => {
  const bytes = Uint8Array.from(atob(b), c => c.charCodeAt(0))
  // does it decode, and what is actually in it?
  const ctx = new AudioContext()
  const buf = await ctx.decodeAudioData(bytes.buffer.slice(0))
  const d = buf.getChannelData(0)
  let peak = 0, sum = 0
  for (let i = 0; i < d.length; i++) { const a = Math.abs(d[i]); if (a > peak) peak = a; sum += a }
  // is it silent anywhere for long? sample 40 windows
  const win = Math.floor(d.length / 40); const quiet = []
  for (let w = 0; w < 40; w++) { let m = 0
    for (let i = w*win; i < (w+1)*win; i++) m = Math.max(m, Math.abs(d[i]))
    if (m < 0.01) quiet.push(w) }
  return { seconds: +buf.duration.toFixed(2), rate: buf.sampleRate, channels: buf.numberOfChannels,
           peak: +peak.toFixed(3), meanAbs: +(sum/d.length).toFixed(4), silentWindows: quiet.length }
}, b64)))
await browser.close()
