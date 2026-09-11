import { chromium } from 'playwright-core'
const OUT='/private/tmp/claude-501/-Users-tobitodili-Documents-GitHub-la-coco-vie/bf8e29b7-7298-4bb2-a056-a2aa89527ff0/scratchpad'
const browser = await chromium.launch({ channel:'chrome' })
for (const [w,h] of [[390,844],[1440,900]]) {
  const ctx = await browser.newContext({ viewport:{width:w,height:h}, deviceScaleFactor:1, hasTouch:w<900, isMobile:w<900 })
  const page = await ctx.newPage()
  const errs=[]; page.on('pageerror',e=>errs.push(String(e).slice(0,120)))
  await page.goto('http://localhost:5099/with-love', { waitUntil:'networkidle' })
  await page.waitForTimeout(9500)
  const read = () => page.evaluate(() => {
    const d = document.querySelector('.cash-dock')
    if (!d) return null
    const r = d.getBoundingClientRect()
    return { live: d.classList.contains('live'), open: d.classList.contains('open'),
             w: Math.round(r.width), h: Math.round(r.height), bottom: Math.round(r.bottom) }
  })
  const at = async (frac) => { await page.evaluate(f => { const s=document.querySelector('.chapter-page'); s.scrollTop = (s.scrollHeight-innerHeight)*f }, frac)
    await page.waitForTimeout(1400); return read() }
  const rows = []
  for (const f of [0.20, 0.36, 0.42, 0.46, 0.50, 0.54, 0.58, 0.66, 0.80]) rows.push([f, await at(f)])
  console.log(`\n${w}x${h}`)
  for (const [f, r] of rows) console.log(`  scroll ${(f*100).toFixed(0).padStart(3)}%  live:${r?.live} open:${r?.open}  ${r?.w}x${r?.h}px`)
  // screenshots of both states
  await at(0.30); await page.screenshot({ path:`${OUT}/dock-card-${w}.png` })
  await at(0.47); await page.screenshot({ path:`${OUT}/dock-open-${w}.png` })
  // tapping folds it back and the scroll does not immediately overrule
  await page.evaluate(() => document.querySelector('.dock-hit').click())
  await page.waitForTimeout(900)
  console.log('  after tapping while open:', JSON.stringify(await read()))
  console.log('  errors:', errs.length, errs.slice(0,2))
  await ctx.close()
}
await browser.close()
