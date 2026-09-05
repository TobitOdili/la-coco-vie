import { chromium } from 'playwright-core'
const OUT='/private/tmp/claude-501/-Users-tobitodili-Documents-GitHub-la-coco-vie/56e28c16-f7cf-4a97-be21-a3429dee6dc2/scratchpad/shots'
const b=await chromium.launch({channel:'chrome'})
const centre=(p)=>p.evaluate(async()=>{const el=document.querySelector('.chapter-page'),sc=document.querySelector('.wall')
  const bs=[...sc.querySelectorAll('.band')]
  const c=(bs[0].getBoundingClientRect().top+bs[bs.length-1].getBoundingClientRect().bottom)/2
  el.scrollTop += c - innerHeight*0.5; await new Promise(r=>setTimeout(r,900))})
for (const [nm,w,h,touch] of [['mob',390,844,true],['desk',1440,900,false]]) {
  const p=await b.newPage({viewport:{width:w,height:h},hasTouch:touch,isMobile:touch})
  const errs=[]; p.on('pageerror',e=>errs.push(e.message)); p.on('console',m=>{if(m.type()==='error')errs.push(m.text())})
  await p.goto('http://localhost:5099/with-love',{waitUntil:'networkidle'})
  await p.waitForSelector('.with-love'); await p.waitForTimeout(2600)
  await centre(p); await p.waitForTimeout(1000)
  if (!touch) {
    const t=await p.evaluate(()=>{let best=null,bd=1e9
      document.querySelectorAll('.word').forEach(x=>{const r=x.getBoundingClientRect()
        if(r.top<160||r.bottom>620||r.left<300||r.right>1140) return
        const d=Math.abs(r.top+r.height/2-380)+Math.abs(r.left+r.width/2-700)
        if(d<bd){bd=d;best={x:r.left+r.width/2,y:r.top+r.height/2,t:x.textContent.trim()}}}); return best})
    console.log('  target:', t&&t.t)
    if(t){await p.mouse.move(t.x,t.y); await p.waitForTimeout(1700)}
  }
  const r=await p.evaluate(()=>{const rv=[...document.querySelectorAll('.reveal')].find(x=>x.classList.contains('open'))
    const rb=rv&&rv.getBoundingClientRect(); const bd=document.querySelector('.band').getBoundingClientRect()
    return { bandWidth:Math.round(bd.width), onWords:document.querySelectorAll('.word.on').length,
      revealInFrame: !!rb && rb.left>=0 && rb.right<=innerWidth && rb.top>=0 && rb.bottom<=innerHeight,
      revealBox: rb?[Math.round(rb.left),Math.round(rb.top),Math.round(rb.width)]:null,
      hOverflow: document.documentElement.scrollWidth>innerWidth }})
  console.log(nm, JSON.stringify(r), 'errors', errs.length?errs:'none')
  await p.screenshot({path:`${OUT}/wa-${nm}.png`}); await p.close()
}
await b.close()
