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

      <!-- ── Gifts · the words are scattered; one line wanders through and lassoes
           each in turn. The curve is MEASURED from where the words actually land
           (see measure()), so it stays true at any width. ── -->
      <section v-else-if="s.kind === 'gifts'" class="chapter-section love-scene gifts-scene"
        :data-idx="i" :style="{ '--rows': s.items.length }">
        <svg class="trace" :viewBox="`0 0 ${box.w} ${box.h}`" aria-hidden="true">
          <path v-for="(seg, k) in segments" :key="`s${k}`" class="scrub" :data-window="seg.win"
            pathLength="1" :d="seg.d" :stroke="ink" stroke-width="2.6" fill="none"
            stroke-linecap="round" opacity="0.62" />
          <path v-for="(lo, k) in loops" :key="`l${k}`" class="scrub" :data-window="lo.win"
            pathLength="1" :d="lo.d" :stroke="ink" stroke-width="2.6" fill="none"
            stroke-linecap="round" />
        </svg>

        <div v-for="(it, j) in s.items" :key="j" class="gift"
          :class="[it.x < 50 ? 'side-right' : 'side-left', { 'is-claimed': it.claimed }]"
          :style="{ '--x': it.x + '%', '--row': j, '--dy': DY[j % DY.length] }">
          <p class="memory">{{ it.memory }}</p>
          <h3 class="gift-name">{{ it.name }}</h3>
          <!-- The scrap: torn paper, fades in on hover — or, on touch, when the
               gift reaches the middle of the screen (see the isNear pass). -->
          <figure class="scrap" :style="{ clipPath: TORN[j % TORN.length] }">
            <img :src="it.image" alt="" aria-hidden="true" decoding="async" />
          </figure>
          <span v-if="it.claimed" class="taken">already given — thank you</span>
        </div>
      </section>

      <!-- ── Or, simply · not a section. The dock card raises a flag and this
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

// Raised by the docked "Or, simply —" card, which lives in `[slug].vue`.
// ⚠️ Teleported to <body>: `.chapter-page` is `fixed; z-index: 10`, a stacking
// context nothing inside can escape — the same trap In Frames' window hit.
const panel = useState('chapterPanel', () => null)
function onPanelKey(e) { if (e.key === 'Escape' && panel.value) panel.value = null }
const rootEl = ref(null)
const box = ref({ w: 1000, h: 1000 })
const segments = ref([])
const loops = ref([])
let rafId = 0
let ro = null

// ── Torn-paper edges ────────────────────────────────────────────────────────
// Three deterministic ragged polygons, built once at module load rather than
// hand-writing 60 coordinates. Cycled per item so neighbours don't match.
// A little vertical jitter so six gifts don't read as a list.
const DY = ['0vh', '4vh', '-3vh', '6vh', '-2vh', '3vh']

const TORN = (() => {
  let seed = 7
  const rnd = () => ((seed = (seed * 1103515245 + 12345) & 0x7fffffff) / 0x7fffffff)
  const edge = (n, fixed, from, to, horizontal, inward) => {
    const pts = []
    for (let i = 0; i <= n; i++) {
      const t = from + ((to - from) * i) / n
      const j = fixed + (rnd() - 0.5) * inward
      pts.push(horizontal ? `${t.toFixed(1)}% ${j.toFixed(1)}%` : `${j.toFixed(1)}% ${t.toFixed(1)}%`)
    }
    return pts
  }
  return [0, 1, 2].map(() => [
    ...edge(9, 2, 0, 100, true, 5),      // top
    ...edge(7, 98, 0, 100, false, 6),    // right
    ...edge(9, 98, 100, 0, true, 5),     // bottom
    ...edge(7, 2, 100, 0, false, 6),     // left
  ]).map((pts) => `polygon(${pts.join(', ')})`)
})()

// ── Curve helpers ───────────────────────────────────────────────────────────
// Catmull-Rom through the points, emitted as cubic béziers — used for BOTH the
// wandering line and the hand-drawn lassos, so they share a hand.
function crSegment(p0, p1, p2, p3) {
  const c1 = { x: p1.x + (p2.x - p0.x) / 6, y: p1.y + (p2.y - p0.y) / 6 }
  const c2 = { x: p2.x - (p3.x - p1.x) / 6, y: p2.y - (p3.y - p1.y) / 6 }
  return `M ${p1.x.toFixed(1)} ${p1.y.toFixed(1)} C ${c1.x.toFixed(1)} ${c1.y.toFixed(1)}, ${c2.x.toFixed(1)} ${c2.y.toFixed(1)}, ${p2.x.toFixed(1)} ${p2.y.toFixed(1)}`
}
function crPath(pts) {
  if (pts.length < 2) return ''
  let d = `M ${pts[0].x.toFixed(1)} ${pts[0].y.toFixed(1)}`
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i - 1] || pts[i]
    const p1 = pts[i]
    const p2 = pts[i + 1]
    const p3 = pts[i + 2] || p2
    const c1 = { x: p1.x + (p2.x - p0.x) / 6, y: p1.y + (p2.y - p0.y) / 6 }
    const c2 = { x: p2.x - (p3.x - p1.x) / 6, y: p2.y - (p3.y - p1.y) / 6 }
    d += ` C ${c1.x.toFixed(1)} ${c1.y.toFixed(1)}, ${c2.x.toFixed(1)} ${c2.y.toFixed(1)}, ${p2.x.toFixed(1)} ${p2.y.toFixed(1)}`
  }
  return d
}
// A lasso: 1.05 turns around the word's box with a wobbling radius and a tail,
// so it reads as drawn by hand rather than stamped.
// ⚠️ SEEDED, not `Math.random()`. `measure()` re-runs on every resize and on
// `document.fonts.ready`, so a live random would re-roll the whole drawing under
// the reader — the line would twitch on every breakpoint. A seed per item gives a
// hand that is different everywhere and the same every time.
function rng(seed) {
  let t = seed * 1103515245 + 12345
  return () => {
    t = (t * 1103515245 + 12345) % 2147483648
    return t / 2147483648
  }
}

// ⚠️ NO TWO LASSOS ALIKE. This used to be one ellipse with a fixed wobble, drawn
// six times — same size, same start angle, same overshoot, and it read as a
// repeated graphic rather than as something drawn by hand. Everything is now
// rolled per item: the radii, where the pen starts, how far past the start it
// carries on (sometimes more than a full extra turn), how much the radius drifts
// as it goes round, and a per-vertex jitter. A real circling of a word is never
// closed and never round.
function lasso(cx, cy, w, h, seed = 1) {
  const r = rng(seed * 7 + 3)
  const rx = w / 2 + 18 + r() * 22
  const ry = h / 2 + 9 + r() * 14
  const from = Math.PI * (0.75 + r() * 0.9)
  // 1.05–1.55 turns: some barely close, some come round again
  const turns = 1.05 + r() * 0.5
  const to = from + Math.PI * 2 * turns
  const drift = 0.06 + r() * 0.1        // the loop spirals slightly as it goes
  const freq = 2.2 + r() * 2.4          // how many bumps around the ring
  const amp = 0.03 + r() * 0.05
  const phase = r() * Math.PI * 2
  const tilt = (r() - 0.5) * 0.28       // the whole loop leans a little
  const N = 26
  const pts = []
  for (let i = 0; i <= N; i++) {
    const t = i / N
    const a = from + (to - from) * t
    const wob = 1 + amp * Math.sin(a * freq + phase) - drift * t
    let x = Math.cos(a) * rx * wob
    let y = Math.sin(a) * ry * wob
    // lean it, so it is not axis-aligned
    const cs = Math.cos(tilt), sn = Math.sin(tilt)
    pts.push({ x: cx + x * cs - y * sn, y: cy + x * sn + y * cs })
  }
  return crPath(pts)
}

function lassoOld(cx, cy, w, h) {
  const rx = w / 2 + 26
  const ry = h / 2 + 14
  const pts = []
  const from = Math.PI * 1.1
  const to = from + Math.PI * 2.15
  const N = 16
  for (let i = 0; i <= N; i++) {
    const a = from + ((to - from) * i) / N
    const wob = 1 + 0.045 * Math.sin(a * 3.1) - 0.02 * (i / N)
    pts.push({ x: cx + Math.cos(a) * rx * wob, y: cy + Math.sin(a) * ry * wob })
  }
  return crPath(pts)
}

// ── Measure: build the curve from where the words ACTUALLY are ──────────────
// Authoring a fixed path and positioning words to match breaks at every
// breakpoint. This measures instead, so `x` and the media queries are free.
function measure() {
  const root = rootEl.value
  const scene = root?.querySelector('.gifts-scene')
  if (!scene) return
  const sr = scene.getBoundingClientRect()
  const names = [...scene.querySelectorAll('.gift-name')]
  if (!names.length) return

  const vh = window.innerHeight
  const H = sr.height
  box.value = { w: sr.width, h: H }

  const anchors = names.map((el) => {
    const r = el.getBoundingClientRect()
    // ⚠️ `blockTop` is the top of the WHOLE gift — the memory line sits above the
    // name, and clearing only the name still ran the line through the sentence.
    const block = el.closest('.gift').getBoundingClientRect()
    return {
      x: r.left - sr.left + r.width / 2,
      y: r.top - sr.top + r.height / 2,
      w: r.width,
      h: r.height,
      blockTop: block.top - sr.top,
      el,
    }
  })

  // Where each gift sits in the SCENE's 0→1 progress when it is centred in the
  // viewport — the scrub windows hang off this, so the line arrives exactly when
  // you are looking at the word.
  const at = anchors.map((a) => (a.y + vh / 2) / (H + vh))

  // ⚠️ THE CURVE IS THE ORIGINAL ONE — through each gift's CENTRE, which is what
  // made it wander. An earlier pass re-routed it around the words with entry and
  // exit points instead, and that straightened it out: leaning the control points
  // toward the neighbours flattened the tangents, and the middle runs came out
  // almost dead straight (measured bows of 2–4px). The line the user liked is the
  // one that threads the centres.
  //
  // So the curve is not changed at all. What changes is what gets DRAWN: each
  // segment is sampled and split around the padded box of every gift — the name
  // AND the memory line above it — and only the stretches outside them are
  // emitted. The line runs its original path, disappears where the lasso takes
  // over, and picks up again on the far side. Each surviving stretch inherits a
  // slice of its segment's window, in proportion to where it sits along it, so
  // the timing still reads left-to-right.
  const PAD = 18
  const base = [
    { x: anchors[0].x, y: 0 },
    ...anchors.map((a) => ({ x: a.x, y: a.y })),
    { x: anchors[anchors.length - 1].x, y: H },
  ]
  const baseStops = [Math.max(0.01, at[0] - 0.14), ...at, 1]

  // ⚠️ A WANDER POINT between every pair. Trimming the line around the words takes
  // the curviest part of each Catmull-Rom segment with it — a spline bends most
  // near its endpoints, where it turns to meet its neighbours' tangents, and those
  // ends are exactly what sits against the words. Left alone the surviving middles
  // were long straight diagonals. So each run gets a control point pushed
  // PERPENDICULAR to it, alternating side, which puts the bow back where the ink
  // actually survives.
  // ⚠️ A WANDER, not a bulge. One perpendicular midpoint per run gave every stretch
  // the same symmetrical bow — predictable, and read as a repeated graphic. Each
  // run now gets THREE offsets at uneven positions along it, each with its own
  // seeded size and side, so no two behave alike. And roughly every other run
  // takes a CURL: a tight three-point detour that carries the line past itself and
  // back, the way a pen doodles rather than draws.
  const pts = []
  const stops = []
  for (let i = 0; i < base.length; i++) {
    pts.push(base[i]); stops.push(baseStops[i])
    if (i === base.length - 1) break
    const p = base[i], q = base[i + 1]
    const dx = q.x - p.x, dy = q.y - p.y
    const len = Math.hypot(dx, dy) || 1
    const nx = -dy / len, ny = dx / len        // unit perpendicular
    const r = rng(i * 13 + 5)
    const push = (t, off) => {
      pts.push({ x: p.x + dx * t + nx * off, y: p.y + dy * t + ny * off })
      stops.push(baseStops[i] + (baseStops[i + 1] - baseStops[i]) * t)
    }
    let side = r() < 0.5 ? 1 : -1
    // three uneven waypoints — the amplitude falls off toward the ends so the
    // line still meets each gift roughly head-on
    const ts = [0.2 + r() * 0.1, 0.46 + r() * 0.1, 0.74 + r() * 0.1]
    for (const t of ts) {
      const taper = Math.sin(Math.PI * t)
      push(t, side * len * (0.14 + r() * 0.24) * taper)
      side *= -1                                // alternate, so it snakes
    }
    // …and sometimes it loops back on itself
    if (r() < 0.55) {
      const lt = 0.55 + r() * 0.2
      const rad = len * (0.07 + r() * 0.06)
      const dir = r() < 0.5 ? 1 : -1
      const cx = p.x + dx * lt, cy = p.y + dy * lt
      for (let k = 1; k <= 5; k++) {
        const a = (k / 5) * Math.PI * 2 * dir + Math.atan2(dy, dx)
        pts.push({ x: cx + Math.cos(a) * rad, y: cy + Math.sin(a) * rad * 0.8 })
        stops.push(baseStops[i] + (baseStops[i + 1] - baseStops[i]) * (lt + k * 0.006))
      }
    }
  }
  // the waypoints were pushed in `ts` order but the loop appends after them —
  // sort so the path (and its scrub windows) still run top to bottom
  const order = pts.map((pt, k) => k).sort((a2, b2) => stops[a2] - stops[b2])
  const sortedPts = order.map((k) => pts[k])
  const sortedStops = order.map((k) => stops[k])
  pts.length = 0; stops.length = 0
  pts.push(...sortedPts); stops.push(...sortedStops)

  // Every box the ink must stay out of, in scene coordinates.
  const blocks = []
  for (const sel of ['.gift-name', '.memory']) {
    for (const el of scene.querySelectorAll(sel)) {
      const r = el.getBoundingClientRect()
      if (!r.width) continue
      blocks.push({
        l: r.left - sr.left - PAD, r: r.right - sr.left + PAD,
        t: r.top - sr.top - PAD, b: r.bottom - sr.top + PAD,
      })
    }
  }
  const inside = (x, y) => blocks.some((k) => x > k.l && x < k.r && y > k.t && y < k.b)

  const segs = []
  const probe = document.createElementNS('http://www.w3.org/2000/svg', 'path')
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i - 1] || pts[i]
    const p3 = pts[i + 2] || pts[i + 1]
    const a = stops[i]
    const b = Math.max(stops[i + 1], a + 0.02)
    const d = crSegment(p0, pts[i], pts[i + 1], p3)
    probe.setAttribute('d', d)
    const L = probe.getTotalLength()
    if (!L) continue
    const STEP = 3
    let run = null
    const flush = (endT) => {
      if (!run || run.pts.length < 2) { run = null; return }
      const wa = a + (b - a) * (run.t0 / L)
      const wb = Math.max(wa + 0.008, a + (b - a) * (endT / L))
      segs.push({
        d: 'M ' + run.pts.map((q) => `${q.x.toFixed(1)} ${q.y.toFixed(1)}`).join(' L '),
        win: `${wa.toFixed(3)},${wb.toFixed(3)}`,
      })
      run = null
    }
    for (let t = 0; t <= L; t += STEP) {
      const q = probe.getPointAtLength(t)
      if (inside(q.x, q.y)) { flush(t); continue }
      if (!run) run = { t0: t, pts: [] }
      run.pts.push(q)
    }
    flush(L)
  }
  segments.value = segs
  loops.value = anchors.map((a, j) => ({
    d: lasso(a.x, a.y, a.w, a.h, j + 1),
    win: `${at[j].toFixed(3)},${(at[j] + 0.045).toFixed(3)}`,
  }))

  // Text fades in just ahead of the line reaching it.
  anchors.forEach((a, j) => {
    const gift = a.el.closest('.gift')
    gift.dataset.at = String(at[j])
    const nameW = `${Math.max(0, at[j] - 0.1).toFixed(3)},${Math.max(0.02, at[j] - 0.02).toFixed(3)}`
    const memW = `${Math.max(0, at[j] - 0.15).toFixed(3)},${Math.max(0.02, at[j] - 0.07).toFixed(3)}`
    a.el.classList.add('fade'); a.el.dataset.window = nameW
    const mem = gift.querySelector('.memory')
    if (mem) { mem.classList.add('fade'); mem.dataset.window = memW }
  })
}

// Touch has no hover: reveal the scrap when its gift is nearest the middle of
// the screen instead. Pointer devices keep the hover, which feels better.
const coarse = () => window.matchMedia('(hover: none)').matches

function tick() {
  const root = rootEl.value
  if (root) {
    const vh = window.innerHeight
    for (const scene of root.querySelectorAll('.love-scene')) {
      const r = scene.getBoundingClientRect()
      const p = Math.min(1, Math.max(0, (vh - r.top) / (r.height + vh)))
      for (const el of scene.querySelectorAll('.scrub, .fade, .write')) {
        const win = el.dataset.window
        if (!win) continue
        const [a, b] = win.split(',').map(Number)
        const lp = Math.min(1, Math.max(0, (p - a) / (b - a)))
        if (el.classList.contains('scrub')) el.style.strokeDashoffset = String(1 - lp)
        else if (el.classList.contains('write')) el.style.clipPath = `inset(-0.3em ${((1 - lp) * 100).toFixed(1)}% -0.45em 0)`
        else el.style.opacity = String(lp)
      }
      if (coarse() && scene.classList.contains('gifts-scene')) {
        for (const gift of scene.querySelectorAll('.gift')) {
          const at = Number(gift.dataset.at || -1)
          gift.classList.toggle('is-near', at >= 0 && Math.abs(p - at) < 0.035)
        }
      }
    }
  }
  rafId = requestAnimationFrame(tick)
}

let resizeT = 0
const onResize = () => { clearTimeout(resizeT); resizeT = setTimeout(measure, 150) }

onMounted(async () => {
  window.addEventListener('keydown', onPanelKey)
  await nextTick()
  measure()
  // Web fonts change text metrics — the lassos would sit around the wrong box.
  document.fonts?.ready.then(() => setTimeout(measure, 60))
  // The scene's own height shifts as images decode; re-measure when it does.
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

/* ── the gift map ── */
.gifts-scene {
  display: block;
  min-height: calc(var(--rows, 6) * 46vh + 38vh);
  padding: 0;
  /* no overflow:hidden — the scraps and lassos deliberately break the box */
}
.trace {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  overflow: visible;
}
.gift {
  position: absolute;
  left: var(--x, 50%);
  top: calc(var(--row, 0) * 46vh + 24vh + var(--dy, 0vh));
  transform: translateX(-50%);
  width: min(26rem, 60vw);
  z-index: 1;
}
.memory {
  font-family: 'Over the Rainbow', cursive;
  font-size: clamp(1.05rem, 2.1vw, 1.6rem);
  opacity: 0.9;
  margin: 0 0 0.75rem;
  line-height: 1.45;
}
.gift-name {
  display: inline-block;
  font-family: 'Bague', sans-serif;
  font-weight: 700;
  font-size: clamp(1.5rem, 3.4vw, 2.6rem);
  margin: 0;
  padding: 0.15em 0.35em;
  cursor: default;
}

/* the torn scrap — hover on pointers, centre-of-screen on touch */
.scrap {
  position: absolute;
  top: 50%;
  width: clamp(9rem, 17vw, 14rem);
  margin: 0;
  padding: 0.9rem 0.9rem 1.4rem;
  background: #f4efe5;
  opacity: 0;
  transform: translateY(-42%) scale(0.94) rotate(-2.5deg);
  transition: opacity 0.55s ease, transform 0.55s cubic-bezier(0.2, 0.7, 0.3, 1);
  pointer-events: none;
  filter: drop-shadow(0 14px 18px rgba(20, 24, 28, 0.22));
}
.side-right .scrap { left: 100%; margin-left: 0.5rem; }
.side-left .scrap { right: 100%; margin-right: 0.5rem; transform: translateY(-42%) scale(0.94) rotate(2.5deg); }
.gift:hover .scrap,
.gift.is-near .scrap { opacity: 1; transform: translateY(-46%) scale(1) rotate(-1.4deg); }
.side-left .gift:hover .scrap,
.gift.side-left.is-near .scrap { transform: translateY(-46%) scale(1) rotate(1.4deg); }
.scrap img { display: block; width: 100%; height: auto; }

.is-claimed .gift-name { opacity: 0.45; text-decoration: line-through; }
.taken {
  display: block;
  margin-top: 0.5rem;
  font-family: 'Bague', sans-serif;
  font-size: 0.66rem;
  letter-spacing: 0.24em;
  text-transform: uppercase;
  opacity: 0.5;
}

/* ── or, simply — the on-page panel ── */
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

/* ── cash ── */
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

/* ── portrait: stack the words; the curve re-measures itself ── */
@media (max-width: 767px) {
  .gift { left: 50% !important; width: 84vw; top: calc(var(--row, 0) * 44vh + 22vh); }
  .gifts-scene { min-height: calc(var(--rows, 6) * 44vh + 34vh); }
  .scrap {
    position: relative;
    left: auto; right: auto; top: auto;
    margin: 1.2rem auto 0;
    width: min(11rem, 46vw);
    transform: scale(0.96) rotate(-1.6deg);
  }
  .side-left .scrap { transform: scale(0.96) rotate(1.6deg); }
  .gift:hover .scrap, .gift.is-near .scrap { transform: scale(1) rotate(-1.2deg); }
}

@media (prefers-reduced-motion: reduce) {
  .scrap { transition: opacity 0.3s ease; }
}
</style>
