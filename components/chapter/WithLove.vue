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

      <!-- ── Gifts · one thread strung down the page, a tag hanging from each drape.
           The thread is NOT drawn: every span is a CATENARY solved from its two
           anchors (see `catenary`) — the curve a real string makes under its own
           weight. That is the whole idea. The previous pass invented a wandering
           line and then spent five rounds trying to make an invented curve look
           inevitable; a curve that exists in physics needs no tuning, and a tag is
           an object that already knows how to hang. ── -->
      <section v-else-if="s.kind === 'gifts'" class="chapter-section love-scene gifts-scene"
        :data-idx="i" :style="{ '--rows': Math.ceil(s.items.length / perLine) }">
        <!-- ⚠️ It FADES, it does not draw. Scrubbing a `stroke-dashoffset` down six
             catenaries costs ~11,000px of ink against ~2,400px of scroll — the pen
             races, and no window is wide enough to fix it. But a string strung across
             a room was never drawn in the first place: it is simply there. Fading it
             retires the draw-speed problem instead of tuning it, and it is the truer
             behaviour for the object. The arrival belongs to the tags. -->
        <svg class="thread fade" data-window="0.02,0.09"
          :viewBox="`0 0 ${box.w} ${box.h}`" aria-hidden="true">
          <path v-for="(dr, k) in drapes" :key="`d${k}`" :d="dr.d" :stroke="ink"
            stroke-width="1.4" fill="none" stroke-linecap="round" opacity="0.72" />
        </svg>

        <!-- One tag per gift. It hangs from the point on the thread where the string
             actually sags lowest, which is why they alternate across the page without
             any `x` being art-directed: the sag moves toward the lower anchor. -->
        <!-- Focusable, because turning the tag over is the only way to read the note and
             a hover is not an affordance a keyboard has. -->
        <article v-for="(it, j) in s.items" :key="j" class="tag" tabindex="0"
          :class="{ 'is-taken': it.claimed }" :style="tagPos[j]">
          <div class="swing">
            <div class="flip">
              <div class="face front">
                <svg class="paper" viewBox="0 0 120 168" aria-hidden="true">
                  <path :d="TAG_D" fill-rule="evenodd" />
                  <circle class="eyelet" cx="60" :cy="HOLE_Y" r="9.5" />
                </svg>
                <div class="front-in">
                  <span class="tag-name">{{ it.name }}</span>
                  <span v-if="it.claimed" class="tag-taken">already given</span>
                </div>
              </div>
              <div class="face back">
                <svg class="paper" viewBox="0 0 120 168" aria-hidden="true">
                  <path :d="TAG_D" fill-rule="evenodd" />
                  <circle class="eyelet" cx="60" :cy="HOLE_Y" r="9.5" />
                </svg>
                <div class="back-in">
                  <img class="tag-shot" :src="it.image" alt="" aria-hidden="true" decoding="async" />
                  <p class="tag-note">{{ it.memory }}</p>
                </div>
              </div>
            </div>
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
const drapes = ref([])
const tagPos = ref([])
let rafId = 0
let ro = null

// ── The tag ─────────────────────────────────────────────────────────────────
// A luggage tag: a pointed top, a punched hole, softened bottom corners. ONE path
// with two subpaths and `fill-rule="evenodd"`, so the hole is genuinely empty —
// the thread passes behind the paper and shows through it. A hole filled with the
// page colour would hide the string and the whole conceit with it.
// Coordinates are the 120×168 viewBox; HOLE_Y is what the CSS uses to hang the tag
// from exactly that point, so the two can never drift apart.
const HOLE_Y = 21
const TAG_D =
  'M 60 6 L 112 30 Q 116 32 116 36 L 116 156 Q 116 164 108 164 L 12 164 Q 4 164 4 156 ' +
  'L 4 36 Q 4 32 8 30 Z ' +
  `M 66 ${HOLE_Y} A 6 6 0 1 1 54 ${HOLE_Y} A 6 6 0 1 1 66 ${HOLE_Y} Z`

// ── The catenary ────────────────────────────────────────────────────────────
// y = y₀ + a·[cosh((x − mid)/a) − cosh(half/a)] — the shape a hanging chain takes
// between two anchors at the SAME height. `a` is the tension, and it is easier to
// author the sag than the tension, so `solveA` inverts it: sag(a) = a(cosh(half/a) − 1)
// is strictly decreasing in `a`, which is all a bisection needs.
//
// ⚠️ THE ANCHORS ARE LEVEL, and this is the whole layout. The first pass strung one
// long thread in DESCENDING swags — nail high on the left, lower on the right, lower
// again on the left — because a descending swag sags toward its lower anchor, which
// alternates the tags across the page for free. It does, and it also makes every swag
// dip through the two below it: sag came out at ~415px against a row of 275, so the
// page read as a pile of crossing arcs rather than as one string. Level lines cannot
// cross. The thread stays continuous because it turns OUTSIDE the frame — each line
// runs off one edge, drops to the next line's height in the margin nobody sees, and
// comes back. One string, three passes, no visible corner.
function solveA(half, sag) {
  let lo = half / 60
  let hi = half * 60
  for (let i = 0; i < 46; i++) {
    const a = (lo + hi) / 2
    if (a * (Math.cosh(half / a) - 1) > sag) lo = a
    else hi = a
  }
  return (lo + hi) / 2
}

function levelLine(y, x0, x1, sag) {
  const mid = (x0 + x1) / 2
  const half = Math.abs(x1 - x0) / 2
  const a = solveA(half, sag)
  const base = a * Math.cosh(half / a)
  // ⚠️ MINUS the cosh, not plus. In screen space y grows downward, so a hanging line is
  // a cosh REFLECTED: anchors at `y`, and the middle at `y + sag`. Written the other way
  // round it solves and samples perfectly and draws three arches.
  // ⚠️ `tilt` — nobody strings a line dead level. A few pixels of difference between the
  // two nails is applied as a linear shear across the span. The true unequal-anchor
  // catenary is a different solve, but at this tilt (≈0.6°) the two differ by hundredths
  // of a pixel — second-order in Δy/span — so this keeps one solver instead of two.
  return {
    at: (x, tilt = 0) => y + base - a * Math.cosh((x - mid) / a) + tilt * ((x - x0) / (x1 - x0) - 0.5),
    x0, x1,
  }
}

const toPath = (pts) => 'M ' + pts.map((q) => `${q.x.toFixed(1)} ${q.y.toFixed(1)}`).join(' L ')

// ⚠️ SEEDED, not `Math.random()`. `measure()` re-runs on resize and on
// `document.fonts.ready`; a live random would re-string the whole page under the
// reader every time. One hand, strung the same way every time.
function rng(seed) {
  let t = seed * 1103515245 + 12345
  return () => {
    t = (t * 1103515245 + 12345) % 2147483648
    return t / 2147483648
  }
}

// ── Measure ─────────────────────────────────────────────────────────────────
// Everything is derived from the section's own box, so the breakpoints are free.
// Tags per line. ⚠️ TWO ONLY IF THERE IS ROOM: at 390px a pair of 118px tags share a
// 390px line and the bands they are placed in overlap, so they collided. Portrait gets
// one tag per line and twice as many lines.
const perLine = ref(2)
const syncPerLine = () => { perLine.value = window.innerWidth < 700 ? 1 : 2 }
const tags = []          // per-tag swing state, rebuilt on every measure
let tagEls = []

function measure() {
  const root = rootEl.value
  const scene = root?.querySelector('.gifts-scene')
  if (!scene) return
  const r = scene.getBoundingClientRect()
  const W = r.width
  const H = r.height
  const n = scene.querySelectorAll('.tag').length
  if (!n || !W) return
  box.value = { w: W, h: H }

  const vh = window.innerHeight
  const atY = (y) => (y + vh / 2) / (H + vh)
  // The real, untransformed height of a hanging tag — read, not assumed, because it is
  // set in `clamp()` against the viewport and changes under every breakpoint.
  const tagH = scene.querySelector('.swing')?.offsetHeight || 200

  const PER_LINE = perLine.value
  const lines = Math.ceil(n / PER_LINE)
  const EDGE = 0.13                        // how far past each edge the nails sit
  const x0 = -EDGE * W
  const x1 = (1 + EDGE) * W
  const rnd = rng(23)

  // Vertical rhythm: a line needs to clear its own sag AND the tags hanging off it
  // before the next one starts. Anything tighter and the page reads as a tangle.
  const SAG = Math.min(H * 0.10, W * 0.135)
  // A line needs to clear its own sag AND everything hanging off it before the next one
  // starts. Anything tighter reads as a tangle; much looser and you only ever see one
  // line at a time, which is a lonelier page than this one wants to be.
  const need = SAG + tagH + Math.max(112, H * 0.06)
  const top = Math.max(H * 0.11, SAG + 40)
  // ⚠️ The tags hang BELOW their anchors, by up to the deepest sag on the page — so the
  // last one clears the bottom only if the row grid is solved against the hole, not
  // against the nail. It overflowed by 15px when this was reckoned from the nail.
  const room = H * 0.97 - tagH - SAG * 1.34 - 22 - top
  const row = Math.max(need, lines > 1 ? room / (lines - 1) : need)

  const pts = []
  const pos = []
  tags.length = 0
  for (let li = 0; li < lines; li++) {
    const y = top + li * row
    // Each line is strung by the same hand, not the same machine.
    const line = levelLine(y, x0, x1, SAG * (0.72 + rnd() * 0.62))
    const tilt = (rnd() - 0.5) * 44
    const N = 40
    const seq = []
    for (let i = 0; i <= N; i++) {
      const x = x0 + ((x1 - x0) * i) / N
      seq.push({ x, y: line.at(x, tilt) })
    }
    // Serpentine: even lines run left→right, odd ones right→left, so the polyline's
    // own join between two lines IS the drop at the nail — off-frame, and clipped.
    pts.push(...(li % 2 === 0 ? seq : seq.reverse()))

    for (let k = 0; k < PER_LINE; k++) {
      const j = li * PER_LINE + k
      if (j >= n) break
      // One band per slot, and the tag sits somewhere inside its own band — so no two
      // are ever in the same column and none can collide with its neighbour.
      const b0 = 0.10 + (k * 0.78) / PER_LINE
      const b1 = 0.10 + ((k + 1) * 0.78) / PER_LINE
      const tx = W * (b0 + (b1 - b0) * (0.08 + rnd() * 0.84))
      const ty = line.at(tx, tilt)
      // No two tags are quite the same size, and one always hangs more crooked than
      // its neighbour. Six identical rectangles at six identical angles is a grid.
      pos.push({ '--x': `${tx.toFixed(1)}px`, '--y': `${ty.toFixed(1)}px`, '--scale': (0.9 + rnd() * 0.2).toFixed(3) })
      const ha = atY(ty)
      tags.push({
        at: ha,
        // Tags on the same line arrive a beat apart, left to right, the way you would
        // notice them — not all six at once when the line comes into view.
        wa: Math.max(0, ha - 0.075 + k * 0.022),
        wb: Math.max(0.02, ha - 0.02 + k * 0.022),
        // A tag that has been handled hangs a touch crooked.
        base: (rnd() - 0.5) * 7.5,
        mass: 0.75 + rnd() * 0.55,
        a: 0,
        v: 0,
      })
    }
  }

  drapes.value = [{ d: toPath(pts) }]
  tagPos.value = pos
  // ⚠️ Queried from the root, never a `ref` inside `v-for` — that yields an ARRAY,
  // and reading it as an element has silently blanked a section three times now.
  tagEls = [...scene.querySelectorAll('.tag')]
}

// Touch has no hover: turn the tag over when it reaches the middle of the screen
// instead. Pointer devices keep the hover, which feels better.
const coarse = () => window.matchMedia('(hover: none)').matches
const clamp01 = (v) => Math.min(1, Math.max(0, v))

// The swing is driven by how fast the section is moving up the screen — no scroll
// listener, no Lenis coupling, just the section's own rect, which the tick already
// has in hand. A spring with real overshoot, so the tags settle rather than stop.
const SWING = 7          // degrees at full gust
let lastTop = null

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
      if (!scene.classList.contains('gifts-scene') || !tagEls.length) continue

      const gust = lastTop === null ? 0 : Math.max(-1, Math.min(1, (lastTop - r.top) / 40))
      lastTop = r.top
      const near = coarse()
      for (let j = 0; j < tagEls.length; j++) {
        const st = tags[j]
        if (!st) continue
        st.v += (gust * st.mass * SWING - st.a) * 0.05
        st.v *= 0.92
        st.a += st.v
        const el = tagEls[j]
        el.style.setProperty('--in', clamp01((p - st.wa) / (st.wb - st.wa)).toFixed(3))
        el.style.setProperty('--rot', `${(st.base + st.a).toFixed(2)}deg`)
        if (near) el.classList.toggle('is-near', Math.abs(p - st.at) < 0.045)
      }
    }
  }
  rafId = requestAnimationFrame(tick)
}

let resizeT = 0
const onResize = () => { clearTimeout(resizeT); resizeT = setTimeout(() => { syncPerLine(); measure() }, 150) }

onMounted(async () => {
  window.addEventListener('keydown', onPanelKey)
  syncPerLine()
  await nextTick()
  measure()
  await nextTick()
  measure()   // the tags exist only after the first pass gave them a position
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

/* ── the line and what hangs from it ── */
.gifts-scene {
  display: block;
  min-height: calc(var(--rows, 3) * 46vh + 42vh);
  padding: 0;
  /* The drapes are anchored off both edges on purpose — clip them, so the page
     never scrolls sideways to reach a knot nobody is meant to see. */
  overflow: hidden;
}
.thread {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

.tag {
  position: absolute;
  left: var(--x, 50%);
  top: var(--y, 0);
  width: 0;
  height: 0;
  z-index: 1;
}
.swing {
  position: absolute;
  left: 0;
  top: 0;
  width: calc(clamp(6.4rem, 9.2vw, 8.2rem) * var(--scale, 1));
  /* The tag hangs from its HOLE, so the box is offset by exactly where the hole is
     punched in the 120×168 artwork (21/168 = 12.5%) and turns about that same point.
     One number, used twice, or the tag pivots somewhere it has no hole. */
  transform: translate(-50%, -12.5%) rotate(var(--rot, 0deg)) translateY(calc((1 - var(--in, 0)) * -9px));
  transform-origin: 50% 12.5%;
  perspective: 1000px;
  opacity: var(--in, 0);
  will-change: transform;
}
.flip {
  position: relative;
  transform-style: preserve-3d;
  transition: transform 0.75s cubic-bezier(0.2, 0.72, 0.24, 1);
}
.tag:hover .flip,
.tag:focus-visible .flip,
.tag.is-near .flip { transform: rotateY(180deg); }
.tag { outline: none; }
.tag:focus-visible .paper { stroke-opacity: 0.9; stroke-width: 1.4; }

.face {
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
  position: relative;
}
.back { position: absolute; inset: 0; transform: rotateY(180deg); }
.paper {
  display: block;
  width: 100%;
  height: auto;
  /* ⚠️ WARM stock on a cool ground. At #F4F1EA the paper sat within 0.08 of the page's
     own luminance and every tag looked half-faded even at full opacity — the reveal was
     blamed for what was really a value problem. */
  fill: #EFE6D4;
  stroke: #2E4A52;
  stroke-width: 0.9;
  stroke-opacity: 0.42;
  filter: drop-shadow(0 5px 9px rgba(20, 30, 36, 0.11));
}
/* The reinforcing ring a real tag has punched into it. */
.eyelet { fill: none; stroke: #2E4A52; stroke-width: 0.7; stroke-opacity: 0.3; }
.is-taken .eyelet { stroke-opacity: 0.2; }
.front-in,
.back-in {
  position: absolute;
  /* below the hole, inside the paper */
  inset: 22% 10% 7%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}
.tag-name {
  font-family: 'Bague', sans-serif;
  font-size: clamp(0.56rem, 0.78vw, 0.68rem);
  letter-spacing: 0.16em;
  text-transform: uppercase;
  line-height: 1.55;
  color: #2E4A52;
}
.tag-taken {
  font-family: 'Bague', sans-serif;
  font-size: 0.52rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  opacity: 0.5;
}
.is-taken .tag-name { opacity: 0.45; text-decoration: line-through; text-decoration-thickness: 1px; }
.is-taken .paper { fill: #EEEAE1; }

.back-in { justify-content: flex-start; gap: 0.55rem; padding-top: 0.1rem; }
.tag-shot {
  width: 100%;
  aspect-ratio: 5 / 3;
  object-fit: cover;
  display: block;
  filter: grayscale(1) contrast(1.05);
  opacity: 0.82;
}
.tag-note {
  margin: 0;
  /* ⚠️ Bague, not Italiana. A display serif set at 10px on a 130px tag is decoration,
     not a sentence — and the tag reads better as ONE typographic object anyway: the
     name in caps on the front, the note in the same face lowercase on the back. */
  font-family: 'Bague', sans-serif;
  font-size: clamp(0.6rem, 0.82vw, 0.72rem);
  line-height: 1.5;
  color: #2E4A52;
  opacity: 0.88;
}

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

/* ── portrait: a narrower room, so the string is strung tighter ── */
@media (max-width: 767px) {
  .gifts-scene { min-height: calc(var(--rows, 3) * 42vh + 38vh); }
  .swing { width: calc(min(7.4rem, 34vw) * var(--scale, 1)); }
}

@media (prefers-reduced-motion: reduce) {
  .flip { transition: transform 0.3s ease; }
  .swing { transition: none; }
}
</style>
