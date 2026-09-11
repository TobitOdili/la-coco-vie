import { chromium } from 'playwright-core'
const OUT='/private/tmp/claude-501/-Users-tobitodili-Documents-GitHub-la-coco-vie/bf8e29b7-7298-4bb2-a056-a2aa89527ff0/scratchpad'
const browser = await chromium.launch({ channel:'chrome' })
const ctx = await browser.newContext({ viewport:{width:1440,height:900}, deviceScaleFactor:1 })
const page = await ctx.newPage()
const errs=[]; page.on('pageerror', e=>errs.push(String(e).slice(0,120)))
await page.goto('http://localhost:5099/with-love', { waitUntil:'networkidle' })
await page.waitForTimeout(9500)
const r = await page.evaluate(() => {
  const names = [...new Set([...document.querySelectorAll('.word')].map(w=>w.textContent.trim()))]
  const links = [...document.querySelectorAll('.reveal-link')].map(a=>a.getAttribute('href'))
  return { uniqueNames: names.length, names, bands: document.querySelectorAll('.band').length }
})
console.log('gift names on the wall:', r.uniqueNames, JSON.stringify(r.names))
console.log('bands:', r.bands)
// open one and read the panel
await page.evaluate(() => { const s=document.querySelector('.chapter-page'); s.scrollTop = s.scrollHeight*0.34 })
await page.waitForTimeout(1400)
// ⚠️ The words never stop moving, so Playwright's hover() refuses ("element is not stable").
// The component listens for pointerenter; dispatch it.
await page.evaluate(() => {
  const w = [...document.querySelectorAll('.word')].find(x => x.textContent.includes('corner sofa'))
  w.dispatchEvent(new PointerEvent('pointerenter', { bubbles: true }))
})
await page.waitForTimeout(900)
const panel = await page.evaluate(() => { const p = document.querySelector('.reveal.open')
  return p ? { note: p.querySelector('.reveal-note')?.textContent, spec: p.querySelector('.reveal-spec')?.textContent?.trim(), link: p.querySelector('.reveal-link')?.getAttribute('href') } : null })
console.log('open panel:', JSON.stringify(panel))
await page.screenshot({ path:`${OUT}/gifts.png` })
console.log('errors:', errs.length, errs.slice(0,2))
await browser.close()
