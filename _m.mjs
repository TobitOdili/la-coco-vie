import { chromium } from 'playwright-core'
import { readFileSync } from 'node:fs'
const browser = await chromium.launch({ channel:'chrome' })
const page = await browser.newPage()
await page.goto('about:blank')
for (const n of [1,2,3,4]) {
  const b64 = readFileSync(`public/images/cu-p${n}.png`).toString('base64')
  const r = await page.evaluate(async (b) => {
    const img = new Image(); img.src = 'data:image/png;base64,'+b; await img.decode()
    const c = document.createElement('canvas'); c.width = img.width; c.height = img.height
    const g = c.getContext('2d'); g.drawImage(img,0,0)
    // the title lives in the top ~470px of a 1330-tall card; find the ink there
    const h = 470
    const d = g.getImageData(0,0,c.width,h).data
    const bg = [d[0],d[1],d[2]]
    let x0=1e9,x1=-1,y0=1e9,y1=-1
    for (let y=0;y<h;y++) for (let x=0;x<c.width;x++){
      const i=(y*c.width+x)*4
      if (Math.abs(d[i]-bg[0])+Math.abs(d[i+1]-bg[1])+Math.abs(d[i+2]-bg[2]) > 60){
        if(x<x0)x0=x; if(x>x1)x1=x; if(y<y0)y0=y; if(y>y1)y1=y }
    }
    return { w: img.width, h: img.height, inkW: x1-x0, left: x0, right: x1, top: y0, bottom: y1 }
  }, b64)
  console.log(`cu-p${n}.png ${r.w}x${r.h}  title ink: x ${r.left}–${r.right} (w ${r.inkW}, ${(r.inkW/r.w*100).toFixed(0)}% of card)  y ${r.top}–${r.bottom}`)
}
await browser.close()
