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
          <!-- ⚠️ ONE stroke per run, loop included — see measure(). There is no
               separate lasso path any more, so there is no second opacity either:
               a pen does not change weight when it comes round a word. -->
          <path v-for="(seg, k) in segments" :key="`s${k}`" class="scrub" :data-window="seg.win"
            pathLength="1" :d="seg.d" :stroke="ink" stroke-width="2.6" fill="none"
            stroke-linecap="round" stroke-linejoin="round" opacity="0.85" />
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
const segments = ref([])
let rafId = 0
let ro = null

// A little vertical jitter so six gifts don't read as a list.
// ⚠️ HALVED. The jitter is what stops the gifts reading as a list, but at ±6vh it also swung
// the gap between consecutive words by ±15% — and the pen gets exactly one gap's worth of
// scroll to cross each gap, so it visibly sped up and slowed down with the jitter.
const DY = ['0vh', '3vh', '-2vh', '4vh', '-1.5vh', '2vh']

// ── Torn-paper edges ────────────────────────────────────────────────────────
// Three deterministic ragged polygons, built once at module load rather than
// hand-writing 60 coordinates. Cycled per item so neighbours don't match.

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
// Everything here builds POINTS; the whole trace is emitted as one polyline per stroke.
// Continuity is by construction — each piece is handed the previous piece's REAL tangent
// (read off its last two samples, not an idealised angle) — so there is nothing for a
// spline fit to overshoot and no corner where two pieces meet.
const unit = (x, y) => { const m = Math.hypot(x, y) || 1; return { x: x / m, y: y / m } }
const along = (p, d, k) => ({ x: p.x + d.x * k, y: p.y + d.y * k })
const headDir = (pts) => unit(pts[1].x - pts[0].x, pts[1].y - pts[0].y)
const tailDir = (pts) => {
  const n = pts.length
  return unit(pts[n - 1].x - pts[n - 2].x, pts[n - 1].y - pts[n - 2].y)
}

function cubic(p0, p1, p2, p3, n) {
  const out = []
  for (let i = 0; i <= n; i++) {
    const t = i / n
    const u = 1 - t
    out.push({
      x: u * u * u * p0.x + 3 * u * u * t * p1.x + 3 * u * t * t * p2.x + t * t * t * p3.x,
      y: u * u * u * p0.y + 3 * u * u * t * p1.y + 3 * u * t * t * p2.y + t * t * t * p3.y,
    })
  }
  return out
}

// ⚠️ SEEDED, not `Math.random()`. `measure()` re-runs on every resize and on
// `document.fonts.ready`, so a live random would re-roll the whole drawing under the
// reader — the line would twitch on every breakpoint. A seed per piece gives a hand that
// is different everywhere and the same every time.
function rng(seed) {
  let t = seed * 1103515245 + 12345
  return () => {
    t = (t * 1103515245 + 12345) % 2147483648
    return t / 2147483648
  }
}

// ── The circle round a word ─────────────────────────────────────────────────
// ⚠️ THE EXIT IS A TANGENT, NOT A BEARING. The previous build aimed the pen out of each
// loop by setting the ellipse's ANGLE PARAMETER to the bearing of the next stop — but the
// tangent at parameter `a` is perpendicular to the radius there, so the pen left the circle
// at 90° to where it was going and the line came off in a hard V (the corner in the
// screenshot). `angleFor` inverts it properly: hand it a direction and it returns the
// parameter whose TANGENT points that way, so the stroke flows out already travelling.
//
// The entry is one-and-a-bit turns EARLIER on the same ellipse, so no two loops open at the
// same place, and the incoming line matches whatever tangent that lands on.
function makeLoop(cx, cy, w, h, dOut, seed) {
  const r = rng(seed * 7 + 3)
  // ⚠️ The vertical margin is boxed in on both sides: below 19px the loop cuts into the
  // name's own padded no-go box, above ~34 it grazes the memory line above. `.memory`
  // carries the bottom margin that opens that window.
  const rx = w / 2 + 24 + r() * 16
  const ry = h / 2 + 18 + r() * 8
  // ⚠️ The lean is CAPPED BY THE WIDTH. These ellipses are wide (rx tracks the word, ~150px),
  // and a flat 0.13rad on one of those lifts its far end by 20px — straight into the sentence
  // above. Cap the lift instead of the angle, so a short word can still lean like a hand.
  const tilt = (r() - 0.5) * 2 * Math.min(0.15, 13 / rx)
  const amp = 0.045 + r() * 0.05
  const freq = 2.0 + r() * 2.4
  const phase = r() * Math.PI * 2
  const drift = 0.02 + r() * 0.04
  const cs = Math.cos(tilt)
  const sn = Math.sin(tilt)
  const angleFor = (d) => {
    const dx = d.x * cs + d.y * sn          // un-lean the direction into the ellipse's frame
    const dy = -d.x * sn + d.y * cs
    return Math.atan2(-dx / rx, dy / ry)    // tangent(a) ∝ (-rx sin a, ry cos a)
  }
  const to = angleFor(dOut)
  const turns = 1.02 + r() * 0.15           // no two alike; a hand overshoots, it does not orbit
  const from = to - Math.PI * 2 * turns
  const N = Math.max(64, Math.round((to - from) / 0.08))
  const pts = []
  for (let i = 0; i <= N; i++) {
    const t = i / N
    const a = from + (to - from) * t
    const wob = 1 + amp * Math.sin(a * freq + phase) - drift * t
    const x = Math.cos(a) * rx * wob
    const y = Math.sin(a) * ry * wob
    pts.push({ x: cx + x * cs - y * sn, y: cy + x * sn + y * cs })
  }
  return pts
}

// ── Doodles on the way down ─────────────────────────────────────────────────
// `bloom` is a closed detour: it starts and ends at the same point on the same tangent, so
// it splices into a leg without a join. The radius envelope is `sin(πu)^1.4`, whose slope is
// zero at both ends, which is what keeps that tangent clean.
function bloom(p, t, r0, turns, ratio, side, r) {
  const nx = -t.y * side
  const ny = t.x * side
  const cx = p.x + nx * r0
  const cy = p.y + ny * r0
  const a0 = Math.atan2(p.y - cy, p.x - cx)
  const N = Math.max(52, Math.round(turns * 46))
  const wob = 0.06 + r() * 0.09
  const out = []
  for (let i = 1; i <= N; i++) {
    const u = i / N
    const a = a0 + side * Math.PI * 2 * turns * u
    const rr =
      r0 *
      (1 - (1 - ratio) * Math.sin(Math.PI * u) ** 1.4) *
      (1 + wob * Math.sin(Math.PI * u) * Math.sin(3 * Math.PI * u))
    out.push({ x: cx + Math.cos(a) * rr, y: cy + Math.sin(a) * rr })
  }
  return out
}

// A rose, drawn the way anyone doodles one: the pen runs into a tight centre and spirals out
// through two and a half scalloped turns, each turn a little wider than the last. Unlike
// `bloom` it does NOT return — it finishes wherever the last petal ends, and the leg picks up
// from there, which is what stops it reading as a stamped-on graphic.
function rose(p, t, side, r) {
  const r0 = 7 + r() * 5
  const R = 72 + r() * 26
  const turns = 2.3 + r() * 0.6
  const lobes = 5
  const petal = 0.09 + r() * 0.07
  const ph = r() * Math.PI * 2
  const cx = p.x - t.y * side * r0
  const cy = p.y + t.x * side * r0
  const a0 = Math.atan2(p.y - cy, p.x - cx)
  const N = Math.round(turns * 64)
  const out = []
  for (let i = 1; i <= N; i++) {
    const u = i / N
    const a = a0 + side * Math.PI * 2 * turns * u
    const rr = (r0 + (R - r0) * u ** 0.78) * (1 + petal * Math.sin(lobes * a + ph))
    out.push({ x: cx + Math.cos(a) * rr, y: cy + Math.sin(a) * rr })
  }
  return out
}

// ── The line between two words ──────────────────────────────────────────────
// Leaves `p0` on `d0`, arrives at `p3` on `d3` — both handed in from the loops either side,
// so the whole trace is one hand. The character on top is a perpendicular displacement with
// a `sin²` envelope: `sin` alone is zero at the ends but its SLOPE is not, and that put a
// ~15° kink at both joins.
function sweep(p0, d0, p3, d3, style, r) {
  const L = Math.hypot(p3.x - p0.x, p3.y - p0.y) || 1
  const p1 = along(p0, d0, L * (0.34 + r() * 0.24))
  const p2 = along(p3, d3, -L * (0.34 + r() * 0.24))
  const N = Math.max(40, Math.round(L / 4))
  const base = cubic(p0, p1, p2, p3, N)
  const side = r() < 0.5 ? -1 : 1
  const amp = (style === 'wave' ? 0.10 + r() * 0.05 : 0.11 + r() * 0.07) * L
  const freq = 1.3 + r() * 1.4
  const phase = r() * Math.PI * 2
  const out = []
  for (let i = 0; i <= N; i++) {
    const s = i / N
    const a = base[Math.max(0, i - 1)]
    const b = base[Math.min(N, i + 1)]
    const t = unit(b.x - a.x, b.y - a.y)
    const env = Math.sin(Math.PI * s) ** 2
    // ⚠️ Even the plain bow gets a second, smaller lobe. A single `sin²` lobe is a perfect
    // arc, and six perfect arcs down a page is exactly the "predictable" the user flagged.
    const d = style === 'wave'
      ? Math.sin(Math.PI * 2 * freq * s + phase)
      : 1 + 0.4 * Math.sin(Math.PI * 2 * s + phase)
    const off = side * amp * d * env
    out.push({ x: base[i].x - t.y * off, y: base[i].y + t.x * off })
  }
  return out
}

function makeLeg(p0, d0, p3, d3, style, seed) {
  const r = rng(seed * 131 + 17)
  const pts = sweep(p0, d0, p3, d3, style, r)
  if (style !== 'curl' && style !== 'rose') return pts

  // Early enough on the leg that the lift before the next note never truncates it.
  const N = pts.length - 1
  const i0 = Math.round(N * (0.28 + r() * 0.16))
  const lo = Math.max(0, i0 - 1)
  const hi = Math.min(N, i0 + 1)
  const t0 = unit(pts[hi].x - pts[lo].x, pts[hi].y - pts[lo].y)
  const s0 = r() < 0.5 ? -1 : 1

  // A loop-the-loop comes back to where it left, so it splices into the leg untouched.
  if (style === 'curl') {
    const orn = bloom(pts[i0], t0, 34 + r() * 16, 1, 1, s0, r)
    return [...pts.slice(0, i0 + 1), ...orn, ...pts.slice(i0 + 1)]
  }
  // The rose does NOT come back — it opens outward and finishes somewhere else entirely, so
  // the rest of the leg is re-drawn from wherever the bloom left the pen.
  const orn = rose(pts[i0], t0, s0, r)
  const q = orn[orn.length - 1]
  const qd = unit(q.x - orn[orn.length - 2].x, q.y - orn[orn.length - 2].y)
  return [...pts.slice(0, i0 + 1), ...orn, ...sweep(q, qd, p3, d3, 'sway', r)]
}

// The legs are not allowed to look like each other. One rose on the page (it is a moment,
// not a texture), at most two loop-the-loops, and never the same character twice running.
const LEG_STYLES = ['sway', 'wave', 'curl', 'rose']
function legStyles(n, seed) {
  const r = rng(seed)
  const out = []
  let roses = 0
  let curls = 0
  for (let i = 0; i < n; i++) {
    let pick = 'sway'
    for (let tries = 0; tries < 10; tries++) {
      pick = LEG_STYLES[Math.floor(r() * LEG_STYLES.length)]
      if (pick === out[i - 1]) continue
      if (pick === 'rose' && (roses >= 1 || i === 0 || i === n - 1)) continue
      if (pick === 'curl' && curls >= 2) continue
      break
    }
    if (pick === 'rose') roses += 1
    if (pick === 'curl') curls += 1
    out.push(pick)
  }
  if (!roses && n > 2) out[1 + Math.floor(r() * (n - 2))] = 'rose'
  return out
}

// Truncate a point list where it first enters any of `boxes` — this is what makes the pen
// lift just above each note instead of writing through it.
function cutAt(pts, boxes) {
  for (let i = 0; i < pts.length; i++) {
    const { x, y } = pts[i]
    if (boxes.some((k) => x > k.l && x < k.r && y > k.t && y < k.b)) return pts.slice(0, i)
  }
  return pts
}

// ── Measure: build the curve from where the words ACTUALLY are ──────────────
// Authoring a fixed path and positioning words to match breaks at every breakpoint. This
// measures instead, so `x` and the media queries are free.
function measure() {
  const root = rootEl.value
  const scene = root?.querySelector('.gifts-scene')
  if (!scene) return
  const sr = scene.getBoundingClientRect()
  const names = [...scene.querySelectorAll('.gift-name')]
  if (!names.length) return

  const vh = window.innerHeight
  const H = sr.height
  const W = sr.width
  box.value = { w: W, h: H }

  const anchors = names.map((el) => {
    const r = el.getBoundingClientRect()
    return {
      x: r.left - sr.left + r.width / 2,
      y: r.top - sr.top + r.height / 2,
      w: r.width,
      h: r.height,
      el,
    }
  })
  const n = anchors.length

  // Where a y sits in the SCENE's 0→1 progress when it is centred in the viewport — the
  // scrub windows hang off this, so the ink arrives when you are looking at the word.
  const atY = (y) => (y + vh / 2) / (H + vh)
  const at = anchors.map((a) => atY(a.y))

  // ⚠️ Kept PER GIFT, not in one pile. A loop necessarily sits inside its own word's padded
  // box (the ellipse's 45° points are well within a box padded by 18), so testing a leg
  // against the word it has just circled cut every leg off at birth.
  const PAD = 18
  const boxesOf = (gift) =>
    [...gift.querySelectorAll('.gift-name, .memory')]
      .map((el) => el.getBoundingClientRect())
      .filter((r) => r.width)
      .map((r) => ({
        l: r.left - sr.left - PAD, r: r.right - sr.left + PAD,
        t: r.top - sr.top - PAD, b: r.bottom - sr.top + PAD,
      }))
  const own = anchors.map((a) => boxesOf(a.el.closest('.gift')))
  const all = own.flat()
  const allBut = (j) => all.filter((k) => !own[j].includes(k))

  // 1 — the circles. Each is told the direction it must LEAVE in, which is simply where the
  //     next word is; the last one leaves downward, off the page.
  const outDir = (j) =>
    j < n - 1
      ? unit(anchors[j + 1].x - anchors[j].x, anchors[j + 1].y - anchors[j].y)
      : unit(anchors[j].x < W / 2 ? 0.32 : -0.32, 1)
  const rings = anchors.map((a, j) => makeLoop(a.x, a.y, a.w, a.h, outDir(j), j + 1))

  // 2 — the head, the legs, the tail. Every leg is handed the tangent of the loop it leaves
  //     and the tangent of the loop it is aiming at, then cut where it would cross a note.
  const styles = legStyles(n + 1, 91)
  // ⚠️ The rose costs ~600px of extra ink, and every leg has exactly one gift-to-gift span of
  // scroll to spend — so put it where there is the most: the widest gap between two words.
  // Anywhere else and that one stroke visibly races the rest of the page.
  {
    const spans = []
    for (let j = 0; j < n - 1; j++) spans.push({ k: j + 1, d: at[j + 1] - at[j] })
    spans.sort((a, b) => b.d - a.d)
    const target = spans.length ? spans[0].k : -1
    styles.forEach((st, i) => { if (st === 'rose' && i !== target) styles[i] = i % 2 ? 'wave' : 'sway' })
    if (target >= 0) styles[target] = 'rose'
  }
  const strokes = []

  const head = makeLeg(
    { x: anchors[0].x + (anchors[0].x < W / 2 ? -46 : 46), y: 0 },
    unit(anchors[0].x < W / 2 ? 0.22 : -0.22, 1),
    rings[0][0], headDir(rings[0]),
    styles[0], 3
  )
  strokes.push(cutAt(head, all))

  for (let j = 0; j < n - 1; j++) {
    const ring = rings[j]
    const leg = makeLeg(
      ring[ring.length - 1], tailDir(ring),
      rings[j + 1][0], headDir(rings[j + 1]),
      styles[j + 1], j + 11
    )
    strokes.push([...ring, ...cutAt(leg, allBut(j))])
  }

  const last = rings[n - 1]
  const tail = makeLeg(
    last[last.length - 1], tailDir(last),
    { x: anchors[n - 1].x + (anchors[n - 1].x < W / 2 ? 70 : -70), y: H },
    unit(0, 1),
    styles[n], n + 11
  )
  strokes.push([...last, ...cutAt(tail, allBut(n - 1))])

  // 3 — the clock. ⚠️ ONE STROKE PER GIFT-TO-GIFT SPAN. The old build derived each window
  //     from the surviving fraction of a trimmed segment, which packed a whole loop plus its
  //     run into a sliver of scroll — the line raced ahead of the reader. Chaining the
  //     windows gift to gift gives every stroke the full span between two words, which is
  //     the most scroll there is to give it, and drops the pen to ~2.2px of ink per px of
  //     scroll (it was ~3.7).
  const LEAD = 0.03
  const wins = [null]
  for (let j = 0; j < n - 1; j++) wins.push([at[j] - LEAD, at[j + 1] - LEAD])
  wins.push(null)

  // ⚠️ The head and the tail have no next word to chain to, and sizing their windows
  // geometrically made them the two odd strokes on the page — the head crawled (0.9px of
  // ink per px of scroll) and the tail dawdled (1.4) between middles running at ~3. Give
  // them however much scroll they need to travel at the SAME pace as everything else.
  const runLen = (pts) => {
    let L = 0
    for (let i = 1; i < pts.length; i++) L += Math.hypot(pts[i].x - pts[i - 1].x, pts[i].y - pts[i - 1].y)
    return L
  }
  const lens = strokes.map(runLen)
  const total = H + vh
  const rates = wins
    .map((w, k) => (w ? lens[k] / Math.max(1, (w[1] - w[0]) * total) : null))
    .filter((r) => r != null)
    .sort((a, b) => a - b)
  const pace = rates.length ? rates[rates.length >> 1] : 3
  wins[0] = [Math.max(0.004, at[0] - LEAD - lens[0] / (pace * total)), Math.max(0.02, at[0] - LEAD)]
  wins[n] = [at[n - 1] - LEAD, Math.min(1, at[n - 1] - LEAD + lens[n] / (pace * total))]

  segments.value = strokes
    .map((pts, k) => {
      if (!pts || pts.length < 3) return null
      const wa = Math.max(0, Math.min(0.99, wins[k][0]))
      const wb = Math.max(wa + 0.01, Math.min(1, wins[k][1]))
      return {
        d: 'M ' + pts.map((q) => `${q.x.toFixed(1)} ${q.y.toFixed(1)}`).join(' L '),
        win: `${wa.toFixed(3)},${wb.toFixed(3)}`,
      }
    })
    .filter(Boolean)

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
  min-height: calc(var(--rows, 6) * 72vh + 42vh);
  padding: 0;
  /* no overflow:hidden — the scraps and the loops deliberately break the box */
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
  top: calc(var(--row, 0) * 72vh + 30vh + var(--dy, 0vh));
  transform: translateX(-50%);
  width: min(26rem, 60vw);
  z-index: 1;
}
.memory {
  font-family: 'Over the Rainbow', cursive;
  font-size: clamp(1.05rem, 2.1vw, 1.6rem);
  opacity: 0.9;
  /* ⚠️ Room for the lasso, and the reason the loop has a vertical margin to play with at
     all. The circle is sized from the NAME's box: below +19px it cuts into that box's own
     padded no-go zone, above roughly +34px it grazes this sentence. 3rem is what opens
     that window wide enough for the radii, the wobble and the lean to vary per item. */
  margin: 0 0 3rem;
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

/* ⚠️ These three had NO rules at all — the panel's own words rendered in the browser
   default, on a chapter that is otherwise ink on paper. Same hand as the rest of the
   page: the heading in the script face, the sentence in Italiana, and the link as a
   ruled word rather than a button (a bordered box here is what got this section moved
   out of the page in the first place). */
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

/* ── portrait: stack the words; the curve re-measures itself ── */
@media (max-width: 767px) {
  .gift { left: 50% !important; width: 84vw; top: calc(var(--row, 0) * 54vh + 24vh); }
  .gifts-scene { min-height: calc(var(--rows, 6) * 54vh + 36vh); }
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
