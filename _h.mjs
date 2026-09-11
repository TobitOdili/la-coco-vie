import { chromium } from 'playwright-core'
const OUT='/private/tmp/claude-501/-Users-tobitodili-Documents-GitHub-la-coco-vie/bf8e29b7-7298-4bb2-a056-a2aa89527ff0/scratchpad'
const browser = await chromium.launch({ channel:'chrome' })
const ctx = await browser.newContext({ viewport:{width:1440,height:900}, deviceScaleFactor:1 })
const page = await ctx.newPage()
const errs=[]; page.on('pageerror',e=>errs.push(String(e).slice(0,110)))
await page.goto('http://localhost:5099/', { waitUntil:'networkidle' })
await page.waitForTimeout(9500)
await page.screenshot({ path:`${OUT}/ring-titles.png` })
console.log('errors:', errs.length, errs.slice(0,2))
await browser.close()
