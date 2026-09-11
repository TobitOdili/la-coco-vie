import { chromium } from 'playwright-core'
const browser = await chromium.launch({ channel:'chrome' })
for (const [w,h] of [[390,844],[1440,900]]) {
  const ctx = await browser.newContext({ viewport:{width:w,height:h}, deviceScaleFactor:1, hasTouch:w<900, isMobile:w<900 })
  const page = await ctx.newPage()
  await page.goto('http://localhost:5099/with-love', { waitUntil:'networkidle' })
  await page.waitForTimeout(9500)
  console.log(`\n${w}x${h}   scroll% | wall.bottom/vh | sign.top/vh`)
  for (let i=0;i<=20;i++) {
    const f = i/20
    const r = await page.evaluate(async (f) => {
      const s=document.querySelector('.chapter-page'); s.scrollTop=(s.scrollHeight-innerHeight)*f
      await new Promise(r=>setTimeout(r,90))
      const vh=innerHeight
      const w=document.querySelector('.wall').getBoundingClientRect()
      const g=document.querySelector('.sign-scene').getBoundingClientRect()
      return { wb:+(w.bottom/vh).toFixed(2), gt:+(g.top/vh).toFixed(2) }
    }, f)
    console.log(`   ${(f*100).toFixed(0).padStart(3)}%      ${String(r.wb).padStart(6)}        ${String(r.gt).padStart(6)}`)
  }
  await ctx.close()
}
await browser.close()
