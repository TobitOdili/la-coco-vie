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
function lasso(cx, cy, w, h) {
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
    return {
      x: r.left - sr.left + r.width / 2,
      y: r.top - sr.top + r.height / 2,
      w: r.width,
      h: r.height,
      el,
    }
  })

  // Where each gift sits in the SCENE's 0→1 progress when it is centred in the
  // viewport — the scrub windows hang off this, so the line arrives exactly when
  // you are looking at the word.
  const at = anchors.map((a) => (a.y + vh / 2) / (H + vh))

  // ⚠️ THE LINE MUST NOT CROSS THE WORDS. It used to run through each gift's
  // CENTRE, so the spline struck straight through the name it was meant to be
  // circling. Each anchor now contributes TWO points — an entry just above the
  // word and an exit just below — and the segment BETWEEN them is not drawn at
  // all: the lasso is what joins them. The line comes down, the loop goes round,
  // the line carries on.
  const PAD = 16
  const pts = [{ x: anchors[0].x, y: 0 }]
  const stops = [Math.max(0.01, at[0] - 0.14)]
  const skip = new Set()          // indices of segments the lasso replaces
  anchors.forEach((a, j) => {
    pts.push({ x: a.x, y: a.y - (a.h / 2 + PAD) })   // entry, above the word
    stops.push(Math.max(0.01, at[j] - 0.01))
    skip.add(pts.length - 1)                          // entry → exit is the lasso
    pts.push({ x: a.x, y: a.y + (a.h / 2 + PAD) })   // exit, below the word
    stops.push(at[j] + 0.045)
  })
  pts.push({ x: anchors[anchors.length - 1].x, y: H })
  stops.push(1)

  const segs = []
  for (let i = 0; i < pts.length - 1; i++) {
    if (skip.has(i)) continue     // the lasso owns this stretch
    const p0 = pts[i - 1] || pts[i]
    const p3 = pts[i + 2] || pts[i + 1]
    const a = stops[i]
    const b = Math.max(stops[i + 1], a + 0.02)
    segs.push({ d: crSegment(p0, pts[i], pts[i + 1], p3), win: `${a.toFixed(3)},${b.toFixed(3)}` })
  }
  segments.value = segs
  loops.value = anchors.map((a, j) => ({
    d: lasso(a.x, a.y, a.w, a.h),
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
