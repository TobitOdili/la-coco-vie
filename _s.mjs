import { chromium } from 'playwright-core'
const ROUTES = ['/', '/us', '/the-big-day', '/in-frames', '/with-love']
const SIZES = [[320,568],[390,844],[844,390],[768,1024],[1440,900],[1920,1080]]
const browser = await chromium.launch({ channel: 'chrome' })
let bad = 0
for (const r of ROUTES) for (const [w,h] of SIZES) {
  const t = w < 900
  const ctx = await browser.newContext({ viewport:{width:w,height:h}, deviceScaleFactor:1, hasTouch:t, isMobile:t })
  const page = await ctx.newPage()
  const errs=[], fails=[]
  page.on('pageerror', e=>errs.push(String(e).slice(0,100)))
  page.on('requestfailed', q=>fails.push(q.url().slice(-60)))
  await page.goto('http://localhost:5099'+r, { waitUntil:'networkidle' })
  await page.waitForTimeout(2600)
  const info = await page.evaluate(async () => {
    const sleep=ms=>new Promise(x=>setTimeout(x,ms))
    const sc=document.querySelector('.chapter-page')
    let ovf = document.documentElement.scrollWidth > innerWidth+1
    if (sc) { for (let i=0;i<=18;i++){ sc.scrollTop=(sc.scrollHeight-innerHeight)*i/20; await sleep(55); if (sc.scrollWidth>innerWidth+1) ovf=true } sc.scrollTop=0 }
    const dead = [...document.querySelectorAll('a[href]')].filter(a=>{const h=a.getAttribute('href');return !h||h==='#'}).length
    return { ovf, dead }
  })
  const flag = info.ovf||errs.length||fails.length||info.dead
  if (flag) { bad++; console.log(`${r} ${w}x${h} ovf:${info.ovf} err:${errs.length} fail:${fails.length} dead:${info.dead} <<<`); if(errs.length)console.log('   ',errs.slice(0,2)) }
  await ctx.close()
}
await browser.close()
console.log(bad ? `${bad} rows with problems` : 'site sweep clean: 0 overflow / 0 errors / 0 failed requests / 0 dead links')
