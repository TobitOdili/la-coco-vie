import { chromium } from 'playwright-core'
const browser = await chromium.launch({ channel:'chrome', args:['--autoplay-policy=no-user-gesture-required'] })
const ctx = await browser.newContext({ viewport:{width:1440,height:900}, deviceScaleFactor:1 })
const page = await ctx.newPage()
const errs=[], reqs=[]
page.on('pageerror', e=>errs.push(String(e).slice(0,120)))
page.on('request', r => { if (/\.(m4a|mp3)$/.test(r.url())) reqs.push(r.url().split('/').pop()) })
await page.goto('http://localhost:5099/', { waitUntil:'networkidle' })
await page.waitForTimeout(9500)
console.log('audio requested before any interaction:', JSON.stringify(reqs))
// the sound toggle is the first interaction on plenty of visits
await page.evaluate(() => {
  const el = [...document.querySelectorAll('.menu-item')].find(b => /^(on|off)$/i.test((b.textContent||'').trim()))
  if (!el) throw new Error('sound toggle not found')
  el.click()
})
await page.waitForTimeout(2500)
console.log('after toggling sound      :', JSON.stringify(reqs))
console.log(JSON.stringify(await page.evaluate(() => {
  const a = [...document.querySelectorAll('audio')].map(x => ({ src: x.src.split('/').pop(), paused: x.paused, loop: x.loop, vol: x.volume, muted: x.muted, t: +x.currentTime.toFixed(1) }))
  return { htmlAudioEls: a }
})))
console.log('errors:', errs.length, errs.slice(0,2))
await browser.close()
