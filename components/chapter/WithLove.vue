<template>
  <div ref="rootEl" class="with-love">
    <template v-for="(s, i) in sections" :key="i">
      <!-- ── Opening · the ink writes the thank-you, before anything is asked. ── -->
      <section v-if="s.kind === 'open'" class="chapter-section love-scene open-scene" :data-idx="i">
        <div class="lead fade" data-window="0.02,0.14">{{ s.lead }}</div>
        <div class="big-thanks write" data-window="0.08,0.34">{{ s.big }}</div>
        <svg class="flourish" viewBox="0 0 600 60" preserveAspectRatio="none" aria-hidden="true">
          <path class="scrub" data-window="0.30,0.42" pathLength="1"
            d="M 20 34 C 160 12, 300 12, 430 30 C 500 40, 560 34, 585 22"
            :stroke="ink" stroke-width="3" fill="none" stroke-linecap="round" />
        </svg>
        <div class="sub fade" data-window="0.38,0.50">{{ s.sub }}</div>
        <div class="pivot fade" data-window="0.52,0.64">{{ s.pivot }}</div>
      </section>

      <!-- ── Gifts · one ribbon runs the length of the page and TURNS as it goes.
           Each gift is printed on a stretch that the twist deliberately leaves flat
           and still, so the type never rides a fold; the turning lives in the spans
           between them and travels, so the page is moving even when you are not. ── -->
      <section v-else-if="s.kind === 'gifts'" class="chapter-section love-scene gifts-scene"
        :data-idx="i" :style="{ '--rows': s.items.length }">
        <!-- ⚠️ STICKY + one viewport of canvas, not a canvas the height of the section.
             The twist travels every frame, so the geometry is rebuilt every frame; at
             1440×2600 × dpr2 that is 14M pixels of redraw per frame. Pinned to the
             viewport it is 1440×900 and the draw only covers the visible slice. -->
        <div class="stage"><canvas class="ribbon" aria-hidden="true" /></div>

        <article v-for="(it, j) in s.items" :key="j" class="knot"
          :class="[!side && j % 2 ? 'to-left' : 'to-right', { 'is-taken': it.claimed }]"
          tabindex="0" :style="knots[j]">
          <h3 class="gift-name">{{ it.name }}</h3>
          <span v-if="it.claimed" class="gift-taken">already given</span>
          <!-- Slides out from behind the ribbon; it is the only thing on the page that
               is not the ribbon, so it stays small and it stays quiet. -->
          <div class="slip">
            <img class="slip-shot" :src="it.image" alt="" aria-hidden="true" decoding="async" />
            <p class="slip-note">{{ it.memory }}</p>
          </div>
        </article>
      </section>

      <!-- ── Even better · not a section. The dock card raises a flag and this
           opens ON the page — sending money is a conversation, not a jump to
           another tab. Ink on paper, like the rest of the chapter: no box. ── -->
      <Teleport v-else-if="s.kind === 'cashPanel'" to="body">
        <transition name="panel">
          <div v-if="panel === 'cash'" class="cash-layer" @click.self="panel = null">
            <div class="cash-panel" role="dialog" aria-modal="true" :aria-label="s.heading">
              <button type="button" class="cash-x" aria-label="Close" @click="panel = null">
                <svg viewBox="0 0 12 12" aria-hidden="true">
                  <path d="M2 2 L10 10 M10 2 L2 10" stroke="currentColor" stroke-width="1.3" fill="none" />
                </svg>
              </button>
              <h3 class="cash-heading">{{ s.heading }}</h3>
              <p class="cash-body">{{ s.body }}</p>
              <a class="cash-cta" :href="s.url" target="_blank" rel="noopener noreferrer">{{ s.cta }}</a>
            </div>
          </div>
        </transition>
      </Teleport>

      <!-- ── Signing · the ink splits in two and signs both names. ── -->
      <section v-else-if="s.kind === 'sign'" class="chapter-section love-scene sign-scene" :data-idx="i">
        <div class="closer fade" data-window="0.08,0.22">{{ s.closer }}</div>
        <div class="sign-block">
          <svg class="fork" viewBox="0 0 1000 160" preserveAspectRatio="none" aria-hidden="true">
            <path class="scrub" data-window="0.12,0.24" pathLength="1" d="M 500 0 C 500 40, 500 70, 500 88"
              :stroke="ink" stroke-width="2.5" fill="none" stroke-linecap="round" opacity="0.55" />
            <path class="scrub" data-window="0.24,0.34" pathLength="1" d="M 500 88 C 440 118, 300 128, 230 160"
              :stroke="ink" stroke-width="2.5" fill="none" stroke-linecap="round" opacity="0.55" />
            <path class="scrub" data-window="0.24,0.34" pathLength="1" d="M 500 88 C 560 118, 700 128, 770 160"
              :stroke="ink" stroke-width="2.5" fill="none" stroke-linecap="round" opacity="0.55" />
          </svg>
          <div class="sig-row">
            <div class="sig">
              <span class="sig-name write" data-window="0.30,0.42">{{ s.names[0] }}</span>
              <svg class="sig-line" viewBox="0 0 360 24" preserveAspectRatio="none" aria-hidden="true">
                <path class="scrub" data-window="0.42,0.52" pathLength="1" d="M 12 14 C 120 6, 250 6, 348 12"
                  :stroke="ink" stroke-width="2.5" fill="none" stroke-linecap="round" />
              </svg>
            </div>
            <div class="sig">
              <span class="sig-name write" data-window="0.38,0.50">{{ s.names[1] }}</span>
              <svg class="sig-line" viewBox="0 0 360 24" preserveAspectRatio="none" aria-hidden="true">
                <path class="scrub" data-window="0.50,0.60" pathLength="1" d="M 12 14 C 120 6, 250 6, 348 12"
                  :stroke="ink" stroke-width="2.5" fill="none" stroke-linecap="round" />
              </svg>
            </div>
          </div>
        </div>
        <div class="tail fade" data-window="0.62,0.74">{{ s.tail }}</div>
      </section>
    </template>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, nextTick } from 'vue'

defineProps({
  sections: { type: Array, required: true },
})

const ink = '#2E4A52'

// Raised by the docked "Even better," card, which lives in `[slug].vue`.
// ⚠️ Teleported to <body>: `.chapter-page` is `fixed; z-index: 10`, a stacking
// context nothing inside can escape — the same trap In Frames' window hit.
const panel = useState('chapterPanel', () => null)
function onPanelKey(e) { if (e.key === 'Escape' && panel.value) panel.value = null }

const rootEl = ref(null)
const box = ref({ w: 1000, h: 1000 })
let rafId = 0
let ro = null

// ── The ribbon ──────────────────────────────────────────────────────────────
// A ribbon is a flat strip twisted about its own centreline. Seen head-on, a strip
// rotated by θ presents a width of `w·cos θ` — so the band pinches to nothing every
// time θ passes a quarter turn, and past it you are looking at the BACK of the same
// piece of material. That is the whole model: one angle per point along the ribbon.
//
//   halfWidth(u) = RIBBON_W · |cos θ(u)|
//   face(u)      = sign(cos θ(u))          → front stock, or the same stock shaded
//
// θ is a travelling wave, `sin(2π(u·K − phase))`, and `phase` advances every frame —
// which is the motion. ⚠️ It is the TWIST that travels, not the material: a torsional
// wave running down a hanging ribbon is a real thing, and it means the names printed
// on the ribbon never move an inch while the ribbon turns underneath them.
const TWIST = Math.PI * 1.05     // rad — enough to carry θ past ±π/2 and show the back
const FRONT = [239, 230, 212]
const BACK = [206, 195, 171]
const SHADE = [116, 106, 88]
const EDGE = 'rgba(46, 74, 82, 0.32)'

// ⚠️ NO ENVELOPE, and the names are NOT printed on the ribbon. The first cut held the
// twist flat under each word so the type had somewhere level to sit — which forced the
// ribbon to be wide enough to carry a name (224px) with long still panels between the
// turns, and at those proportions it stopped reading as a ribbon and started reading as
// a chain of lozenges. A ribbon reads as a ribbon at about five to one. So the strip is
// narrow now, the twist is uniform and travels the whole length, and the names sit
// BESIDE it — flat, legible, and still while the material turns past them.
const mix = (c1, c2, t) =>
  `rgb(${Math.round(c1[0] + (c2[0] - c1[0]) * t)},${Math.round(c1[1] + (c2[1] - c1[1]) * t)},${Math.round(c1[2] + (c2[2] - c1[2]) * t)})`

// ── Measure ─────────────────────────────────────────────────────────────────
// The ribbon's shape and the words' places come from the section's own box, so the
// breakpoints are free. Only `phase` changes per frame.
// ⚠️ NOT a template `ref`. This canvas lives inside the sections `v-for`, and a ref
// bound inside a `v-for` resolves to an ARRAY — so `cvEl.value.style` was `undefined`,
// the tick threw on its first frame inside the section, and because the rAF is
// re-armed at the END of the tick the whole loop died silently: no ribbon, no reveals,
// one console error. Fourth time this trap has bitten this codebase; query the DOM.
let cv = null
const knots = ref([])
const side = ref(false)   // true = portrait: everything reads to the right of the ribbon
let geo = null           // { H, W, cx, amp, wave, halfW, stops, K }
let knotEls = []

function centreX(u) {
  return geo.cx + geo.amp * Math.sin(Math.PI * 2 * u * geo.wave + 0.6)
}

function measure() {
  const root = rootEl.value
  const scene = root?.querySelector('.gifts-scene')
  if (!scene) return
  const r = scene.getBoundingClientRect()
  const W = r.width
  const H = r.height
  const n = scene.querySelectorAll('.knot').length
  if (!n || !W || !H) return
  box.value = { w: W, h: H }

  // ⚠️ PORTRAIT PUTS THE RIBBON TO ONE SIDE. Centred on a 390px screen there is no room
  // for a word on either side of it — measured: names ran off BOTH edges. So on a narrow
  // screen the ribbon falls down the left third and every word reads out to the right of
  // it, which is also just a better column to read.
  const narrow = W < 700
  side.value = narrow
  // Ribbon proportions: about 5:1 between turns. Wider than this and it is a sash.
  const halfW = narrow ? Math.min(W * 0.10, 46) : Math.min(W * 0.065, 82)
  // ⚠️ A real wander. At 58px the ribbon was a vertical band in the middle of an empty
  // page; it has to travel across the frame for the fall to read as a fall.
  const amp = narrow ? Math.min(W * 0.07, 44) : Math.min(W * 0.15, 196)

  // The words: evenly down the page, alternating sides, clear of the strip.
  const top = 0.09
  const bot = 0.92
  const stops = []
  for (let j = 0; j < n; j++) stops.push(top + ((bot - top) * j) / Math.max(1, n - 1))

  geo = {
    H, W, halfW, amp,
    cx: narrow ? W * 0.26 : W / 2,
    wave: 1.1,                  // lateral wander over the whole length
    // ⚠️ θ = TWIST·sin(2π(u·K − phase)) crosses ±π/2 FOUR times per period, so a period
    // is four turns, not one. At K = (n+1)·1.4 that was a turn every 40px. K = 1.5 puts
    // one turn roughly every 470px, which is a ribbon falling, not a corkscrew.
    K: 1.5,
    stops,
  }

  const pad = halfW + Math.min(W * 0.022, 30)
  // ⚠️ In portrait the word's width is MEASURED, not set in vw. Every word starts at
  // `centreX + pad` and the ribbon wanders, so a fixed 56vw ran the longest ones off the
  // right edge by a few pixels at the ribbon's rightmost swing.
  knots.value = stops.map((u, j) => {
    const x = centreX(u) + (!narrow && j % 2 ? -pad : pad)
    const st = { '--y': `${(u * H).toFixed(1)}px`, '--x': `${x.toFixed(1)}px` }
    if (narrow) st['--w'] = `${Math.max(120, W - x - 16).toFixed(0)}px`
    return st
  })
  knotEls = [...scene.querySelectorAll('.knot')]
  cv = scene.querySelector('.ribbon')
  sizeCanvas()
}

let dpr = 1
function sizeCanvas() {
  if (!cv) return
  dpr = Math.min(2, window.devicePixelRatio || 1)
  const w = cv.clientWidth
  const h = cv.clientHeight
  if (!w || !h) return
  cv.width = Math.round(w * dpr)
  cv.height = Math.round(h * dpr)
}

// ── Draw ────────────────────────────────────────────────────────────────────
// One quad per 5px of ribbon, shaded by how square-on that bit of it is — which is
// what gives the material its sheen. Only the slice inside the viewport is built.
function drawRibbon(offset, vh) {
  if (!cv || !geo) return
  const ctx = cv.getContext('2d')
  if (!ctx) return
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
  ctx.clearRect(0, 0, cv.width, cv.height)

  const STEP = 5
  const y0 = Math.max(0, offset - STEP)
  const y1 = Math.min(geo.H, offset + vh + STEP)
  if (y1 <= y0) return

  const pts = []
  for (let y = y0; y <= y1; y += STEP) {
    const u = y / geo.H
    const th = TWIST * Math.sin(Math.PI * 2 * (u * geo.K - phase))
    const c = Math.cos(th)
    // Taper to a point at both ends, so the ribbon runs out rather than being cut off.
    const t0 = Math.min(1, y / (geo.H * 0.055))
    const t1 = Math.min(1, (geo.H - y) / (geo.H * 0.055))
    const taper = Math.sin((Math.PI / 2) * Math.max(0, Math.min(1, t0))) * Math.sin((Math.PI / 2) * Math.max(0, Math.min(1, t1)))
    const cx = centreX(u)
    // The normal, from the centreline's own slope — the ribbon leans as it wanders.
    const dx = geo.amp * Math.PI * 2 * geo.wave * Math.cos(Math.PI * 2 * u * geo.wave + 0.6) / geo.H
    const m = Math.hypot(1, dx)
    const w = geo.halfW * Math.abs(c) * taper
    pts.push({ x: cx, y: y - offset, nx: 1 / m, ny: -dx / m, w, c })
  }

  // ⚠️ ONE silhouette path for the shadow, drawn before the quads. Setting a canvas
  // shadow on 250 adjacent quads shadows each of them onto the next and the ribbon comes
  // out with a seam every 5px; the outline has to be a single path.
  ctx.save()
  ctx.shadowColor = 'rgba(24, 34, 40, 0.20)'
  ctx.shadowBlur = 22
  ctx.shadowOffsetY = 9
  ctx.fillStyle = 'rgba(0,0,0,1)'
  ctx.beginPath()
  pts.forEach((p, k) => {
    const x = p.x + p.nx * p.w
    const y = p.y + p.ny * p.w
    if (k === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y)
  })
  for (let k = pts.length - 1; k >= 0; k--) {
    const p = pts[k]
    ctx.lineTo(p.x - p.nx * p.w, p.y - p.ny * p.w)
  }
  ctx.closePath()
  ctx.fill()
  ctx.restore()

  // Split at every pinch: on each side of one, you are looking at a different face.
  let i = 0
  while (i < pts.length - 1) {
    let j = i + 1
    const front = pts[i].c >= 0
    while (j < pts.length && (pts[j].c >= 0) === front) j++
    for (let k = i; k < j - 1; k++) {
      const p = pts[k]
      const q = pts[k + 1]
      const shade = 1 - Math.abs((p.c + q.c) / 2)
      ctx.fillStyle = mix(front ? FRONT : BACK, SHADE, shade * 0.5)
      ctx.beginPath()
      ctx.moveTo(p.x + p.nx * p.w, p.y + p.ny * p.w)
      ctx.lineTo(q.x + q.nx * q.w, q.y + q.ny * q.w)
      ctx.lineTo(q.x - q.nx * q.w, q.y - q.ny * q.w)
      ctx.lineTo(p.x - p.nx * p.w, p.y - p.ny * p.w)
      ctx.closePath()
      ctx.fill()
    }
    // ⚠️ `Math.max(…, i + 1)`. When two consecutive samples straddle a pinch the inner
    // walk cannot advance, `j` stays at `i + 1`, and `i = j - 1` puts `i` back where it
    // started — an infinite loop inside requestAnimationFrame, which hangs the tab hard
    // enough that a headless probe times out with no error to show for it.
    i = Math.max(j - 1, i + 1)
  }

  // The two selvedges, drawn last so they sit crisply on top of the quads.
  ctx.strokeStyle = EDGE
  ctx.lineWidth = 1
  for (const side of [1, -1]) {
    ctx.beginPath()
    pts.forEach((p, k) => {
      const x = p.x + side * p.nx * p.w
      const y = p.y + side * p.ny * p.w
      if (k === 0) ctx.moveTo(x, y)
      else ctx.lineTo(x, y)
    })
    ctx.stroke()
  }
}

// Touch has no hover: open the slip when its gift reaches the middle of the screen
// instead. Pointer devices keep the hover, which feels better.
const coarse = () => window.matchMedia('(hover: none)').matches
const clamp01 = (v) => Math.min(1, Math.max(0, v))

// `phase` is the whole animation. It drifts on its own so the ribbon is turning when
// you are still, and scrolling gusts it — the twist runs faster while the page moves
// and eases back to its drift when it stops.
let phase = 0
let lastTop = null
let gust = 0
// ⚠️ The ribbon turns continuously and forever. That is the point of the page, and it is
// exactly what someone who has asked their system for less motion does not want, so the
// twist is frozen at its resting shape for them — the ribbon is still there, it just
// stops travelling.
const stillness = () => import.meta.client && window.matchMedia('(prefers-reduced-motion: reduce)').matches
let calm = false

function tick() {
  const root = rootEl.value
  if (root) {
    const vh = window.innerHeight
    for (const scene of root.querySelectorAll('.love-scene')) {
      const r = scene.getBoundingClientRect()
      const p = clamp01((vh - r.top) / (r.height + vh))
      for (const el of scene.querySelectorAll('.scrub, .fade, .write')) {
        const win = el.dataset.window
        if (!win) continue
        const [a, b] = win.split(',').map(Number)
        const lp = clamp01((p - a) / (b - a))
        if (el.classList.contains('scrub')) el.style.strokeDashoffset = String(1 - lp)
        else if (el.classList.contains('write')) el.style.clipPath = `inset(-0.3em ${((1 - lp) * 100).toFixed(1)}% -0.45em 0)`
        else el.style.opacity = String(lp)
      }
      if (!scene.classList.contains('gifts-scene') || !geo) continue

      const v = lastTop === null ? 0 : lastTop - r.top
      lastTop = r.top
      gust += (Math.min(60, Math.abs(v)) - gust) * 0.08
      if (!calm) phase += 0.00055 + gust * 0.00022

      // Nothing to draw while the section is off screen — and the canvas is sticky, so
      // it would otherwise keep painting over the scenes either side of it.
      const on = r.bottom > -40 && r.top < vh + 40
      if (cv) cv.style.opacity = on ? '1' : '0'
      if (on) drawRibbon(-r.top, vh)

      const near = coarse()
      for (let j = 0; j < knotEls.length; j++) {
        const el = knotEls[j]
        const u = geo.stops[j]
        // A word appears just before the ribbon carries it into the middle of the frame.
        const at = (u * geo.H + vh / 2) / (geo.H + vh)
        el.style.setProperty('--in', clamp01((p - (at - 0.07)) / 0.05).toFixed(3))
        if (near) el.classList.toggle('is-near', Math.abs(p - at) < 0.04)
      }
    }
  }
  rafId = requestAnimationFrame(tick)
}

let resizeT = 0
const onResize = () => { clearTimeout(resizeT); resizeT = setTimeout(measure, 150) }

onMounted(async () => {
  window.addEventListener('keydown', onPanelKey)
  calm = stillness()
  await nextTick()
  measure()
  // The section's height comes from `min-height` in vh and the canvas from `100%` of a
  // sticky box — neither is final on the first tick.
  requestAnimationFrame(() => measure())
  document.fonts?.ready.then(() => setTimeout(measure, 60))
  const scene = rootEl.value?.querySelector('.gifts-scene')
  if (scene && 'ResizeObserver' in window) { ro = new ResizeObserver(onResize); ro.observe(scene) }
  window.addEventListener('resize', onResize)
  rafId = requestAnimationFrame(tick)
})
onBeforeUnmount(() => {
  window.removeEventListener('keydown', onPanelKey)
  panel.value = null
  cancelAnimationFrame(rafId)
  window.removeEventListener('resize', onResize)
  ro?.disconnect()
  clearTimeout(resizeT)
})
</script>

<style scoped>
.love-scene {
  position: relative;
  color: var(--accent, #2E4A52);
  background: var(--accentLight, #E8EDF2);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 12vh 8vw;
  box-sizing: border-box;
}
.scrub { stroke-dasharray: 1; stroke-dashoffset: 1; }
.fade { opacity: 0; }
/* ⚠️ Vertical slack on the clip. `inset(0 …% 0 0)` clips at the line box, and a
   script face's descenders hang BELOW it — the y of "thank you" was cut off at the
   tail. Same fix US needed. */
.write { clip-path: inset(-0.3em 100% -0.45em 0); }

/* ── opening ── */
.open-scene { min-height: 116dvh; }
.lead {
  font-family: 'Bague', sans-serif;
  font-size: 0.8rem;
  letter-spacing: 0.26em;
  text-transform: uppercase;
  opacity: 0.6;
  margin-bottom: 2.4rem;
}
.big-thanks { font-family: 'Over the Rainbow', cursive; font-size: clamp(3.4rem, 12vw, 9rem); line-height: 1; }
.flourish { width: min(46vw, 30rem); height: 3.4rem; margin-top: -0.4rem; }
.sub { font-family: 'Italiana', serif; font-size: clamp(1.2rem, 2.4vw, 1.9rem); margin-top: 1.6rem; max-width: 32rem; }
.pivot {
  font-family: 'Bague', sans-serif;
  font-size: 0.82rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  opacity: 0.55;
  margin-top: 4rem;
  max-width: 30rem;
}

/* ── the ribbon ── */
.gifts-scene {
  display: block;
  min-height: calc(var(--rows, 6) * 58vh + 44vh);
  padding: 0;
  /* ⚠️ NO `overflow: hidden` here. It would make this element its own scrollport and
     the sticky stage inside it would stick to a box that never scrolls — i.e. behave
     as if it were static. The canvas is viewport-sized and clips itself. */
}
.stage {
  position: sticky;
  top: 0;
  height: 100dvh;
  pointer-events: none;
  z-index: 0;
}
.ribbon {
  display: block;
  width: 100%;
  height: 100%;
  opacity: 0;
  transition: opacity 0.25s linear;
}

/* A word printed on the ribbon. It sits in a stretch the twist is enveloped to leave
   flat, so it never has to follow a fold. */
.knot {
  position: absolute;
  left: var(--x, 50%);
  top: var(--y, 0);
  transform: translateY(-50%);
  width: var(--w, min(13rem, 34vw));
  text-align: start;
  z-index: 2;
  outline: none;
  opacity: var(--in, 0);
}
.to-left { transform: translate(-100%, -50%); text-align: end; }
/* A short leader, so the word reads as belonging to the ribbon rather than floating
   next to it — the strip is pinched to a point at some of these heights and a word
   112px from a point has nothing to hold on to. */
.knot::after {
  content: '';
  position: absolute;
  top: 50%;
  width: 1.4rem;
  height: 1px;
  background: currentColor;
  opacity: 0.35;
  color: #3A3327;
}
.to-right::after { right: 100%; margin-right: 0.55rem; }
.to-left::after { left: 100%; margin-left: 0.55rem; }
.gift-name {
  margin: 0;
  font-family: 'Bague', sans-serif;
  font-weight: 700;
  font-size: clamp(0.72rem, 0.98vw, 0.9rem);
  letter-spacing: 0.15em;
  text-transform: uppercase;
  line-height: 1.6;
  color: #3A3327;
  cursor: default;
}
.gift-taken {
  display: block;
  margin-top: 0.35rem;
  font-family: 'Bague', sans-serif;
  font-size: 0.56rem;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  opacity: 0.55;
  color: #3A3327;
}
.is-taken .gift-name { opacity: 0.5; text-decoration: line-through; text-decoration-thickness: 1px; }

/* The slip slides out from behind the ribbon — the only thing on the page that is not
   the ribbon, so it stays small and quiet. */
.slip {
  position: absolute;
  top: 50%;
  width: clamp(9rem, 15vw, 12rem);
  padding: 0.85rem 0.85rem 0.95rem;
  background: #F6F3EC;
  box-shadow: 0 10px 24px rgba(24, 34, 40, 0.14);
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.5s ease, transform 0.6s cubic-bezier(0.2, 0.72, 0.24, 1);
}
.slip { top: calc(100% + 0.9rem); }
.to-right .slip { left: 0; transform: translateY(-0.6rem) rotate(0.9deg); }
.to-left .slip { right: 0; transform: translateY(-0.6rem) rotate(-0.9deg); }
.knot:hover .slip,
.knot:focus-visible .slip,
.knot.is-near .slip { opacity: 1; transform: translateY(0) rotate(var(--tilt, 0.9deg)); }
.to-left { --tilt: -0.9deg; }
.slip-shot {
  display: block;
  width: 100%;
  aspect-ratio: 5 / 3;
  object-fit: cover;
  filter: grayscale(1) contrast(1.04);
  opacity: 0.85;
}
.slip-note {
  margin: 0.6rem 0 0;
  font-family: 'Bague', sans-serif;
  font-size: clamp(0.6rem, 0.8vw, 0.7rem);
  line-height: 1.55;
  color: #2E4A52;
  opacity: 0.85;
}
.knot:focus-visible .gift-name { text-decoration: underline; text-underline-offset: 0.35em; }

/* ── even better — the on-page panel ── */
.cash-layer {
  position: fixed;
  inset: 0;
  /* Above the nav (20) and About (50); below the custom cursor (100). */
  z-index: 70;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8vh 6vw;
  background: color-mix(in srgb, #E8EDF2 88%, transparent);
  backdrop-filter: blur(3px);
  cursor: none;
}
.cash-panel {
  position: relative;
  width: min(30rem, 100%);
  text-align: center;
  color: #2E4A52;
}
.cash-x {
  position: absolute;
  top: -2.4rem;
  inset-inline-end: 0;
  width: 1.5rem;
  height: 1.5rem;
  appearance: none;
  -webkit-appearance: none;
  border: 0;
  background: none;
  padding: 0.25rem;
  color: #2E4A52;
  opacity: 0.5;
  cursor: none;
  transition: opacity 0.25s ease;
}
.cash-x:hover, .cash-x:focus-visible { outline: none; opacity: 1; }
.cash-x svg { width: 100%; height: 100%; display: block; }
.panel-enter-active, .panel-leave-active { transition: opacity 0.3s ease; }
.panel-enter-from, .panel-leave-to { opacity: 0; }

/* ⚠️ These three had NO rules at all — the panel's own words rendered in the
   browser default, on a chapter that is otherwise ink on paper. */
.cash-heading {
  font-family: 'Over the Rainbow', cursive;
  font-size: clamp(2.1rem, 6vw, 3.2rem);
  line-height: 1.1;
  margin: 0 0 1.2rem;
  font-weight: 400;
}
.cash-body {
  font-family: 'Italiana', serif;
  font-size: clamp(1.05rem, 2.2vw, 1.35rem);
  line-height: 1.6;
  margin: 0 auto 2.4rem;
  max-width: 26rem;
  opacity: 0.85;
}
.cash-cta {
  display: inline-block;
  font-family: 'Bague', sans-serif;
  font-size: 0.78rem;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  text-decoration: none;
  color: inherit;
  padding-bottom: 0.35rem;
  border-bottom: 1px solid currentColor;
  opacity: 0.75;
  cursor: none;
  transition: opacity 0.25s ease;
}
.cash-cta:hover, .cash-cta:focus-visible { outline: none; opacity: 1; }

/* ── signing ── */
.sign-scene { min-height: 112dvh; }
.closer { font-family: 'Italiana', serif; font-size: clamp(1.4rem, 3vw, 2.4rem); margin-bottom: 2rem; }
.sign-block { width: min(82vw, 46rem); display: flex; flex-direction: column; align-items: stretch; }
.fork { width: 100%; height: 6.5rem; pointer-events: none; }
.sig-row { display: flex; justify-content: space-between; gap: 2rem; }
.sig { flex: 1; display: flex; flex-direction: column; align-items: center; }
.sig-name { font-family: 'Over the Rainbow', cursive; font-size: clamp(1.6rem, 4.6vw, 3.2rem); }
.sig-line { width: min(20rem, 34vw); height: 1.5rem; }
.tail {
  font-family: 'Bague', sans-serif;
  font-size: 0.78rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  opacity: 0.55;
  margin-top: 3rem;
}

/* ── portrait ── */
@media (max-width: 767px) {
  .gifts-scene { min-height: calc(var(--rows, 6) * 46vh + 36vh); }
  .slip { width: 100%; }
}

@media (prefers-reduced-motion: reduce) {
  .slip { transition: opacity 0.3s ease; }
}
</style>
