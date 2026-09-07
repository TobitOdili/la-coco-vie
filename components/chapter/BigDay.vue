<template>
  <div ref="rootEl" class="big-day">
    <template v-for="(s, i) in sections" :key="i">
      <!-- ── The month · every other date recedes; the one that matters is inked and
           ringed.

           ⚠️ TIMING IS EXPRESSED IN SCREEN POSITION, NOT IN TASTE. For a non-sticky
           scene of height H, `p = (vh − top) / (H + vh)`, so the scene's own top sits at
           `T = 1 − p·(H + vh)/vh` viewport-heights down the screen and the centred content
           rides ~0.66vh below that. Every window below was derived from where its content
           actually is when the window opens — never nudged by feel. Get this wrong and the
           effect plays to an empty frame (the cut before 0507241d opened `.count-tail` at
           0.72, which measured on screen at 14%). ── -->
      <section v-if="s.kind === 'calendar'" class="chapter-section day-scene cal-scene" :data-idx="i">
        <div class="kicker fade" data-window="0.33,0.38">{{ s.kicker }}</div>
        <div class="month fade" data-window="0.35,0.41">{{ monthName(s.monthISO) }}</div>

        <div class="cal fade" data-window="0.37,0.46">
          <div v-for="d in DOW" :key="d" class="dow">{{ d }}</div>
          <div v-for="n in lead(s.monthISO)" :key="`b${n}`" class="cell blank" />
          <div v-for="d in days(s.monthISO)" :key="d" class="cell"
            :class="{ marked: d === s.mark }">
            <span class="num">{{ d }}</span>
            <!-- The ring lives INSIDE its cell, so it needs no measurement and scales
                 with the grid at every breakpoint.
                 ⚠️ CLASS NAME `day-ring`, NEVER `ring`. Tailwind ships a `.ring` utility
                 (`box-shadow: 0 0 0 3px …`) and SCOPED CSS DOES NOT SCOPE THE CLASS NAME —
                 so `class="ring"` painted a 1px rectangle around this very cell. That is
                 AUDIT #26, on this same calendar, walked into a second time. -->
            <svg v-if="d === s.mark" class="day-ring" viewBox="0 0 100 100" aria-hidden="true">
              <path class="scrub" data-window="0.47,0.545" pathLength="1"
                d="M 74 22 C 92 36, 94 62, 74 78 C 54 94, 22 90, 10 70
                   C -2 50, 8 24, 32 14 C 54 5, 78 12, 86 30"
                :stroke="ink" stroke-width="2.4" fill="none" stroke-linecap="round" />
            </svg>
          </div>
        </div>

        <p class="note fade" data-window="0.535,0.59">{{ s.note }}</p>
      </section>

      <!-- ── The knot · ⚠️ RESTORED VERBATIM from `b5a52348`. Two threads arrive from
           either edge, cross, loop around one another and leave as one line. A pass on
           2026-09-06 redrew this as a literal heart; the user's note was that the shape
           the threads actually make is the thing worth keeping. Do not tidy these curves.

           ⚠️ `min-height` IS PART OF THE TIMING. Every window here was solved against
           H = 170dvh; changing the height at a breakpoint (there used to be a 210dvh
           mobile override) re-maps p → screen position and the drawing drifts. Height is
           the same at every size — only the ink's own scale changes.

           ⚠️ `padding: 0` on the scene, deliberately. The sticky hold is constrained by
           its containing block's PADDING box, so a bottom pad releases the pin that many
           vh before the scene ends — which is exactly the seam the stem has to cross. With
           no padding, the pin lets go at the precise moment the countdown scene's top
           reaches the viewport bottom, so the stem below "one special day" and the stem at
           the top of the clock are one unbroken line. ── -->
      <section v-else-if="s.kind === 'knot'" class="chapter-section day-scene knot-scene" :data-idx="i">
        <div class="knot-hold">
          <!-- The spacer and the stem are both `flex: 1 1 0`, so they split the leftover
               height evenly: the drawing stays optically centred AND the stem is guaranteed
               to reach the hold's bottom edge, whatever the viewport. -->
          <span class="knot-spacer" aria-hidden="true" />
          <div class="knot-core">
            <div class="knot-word fade" data-window="0.19,0.25">{{ s.before }}</div>
            <!-- ⚠️ viewBox cropped to the INK (y 300→760). The paths live in a 0–760 space
                 but only draw from ~312 down, and the empty top pushed the first word out of
                 the sticky frame and slid the drawing under the fixed nav. -->
            <svg class="knot" viewBox="0 300 1000 460" fill="none" aria-hidden="true">
              <path class="scrub" data-window="0.25,0.44" pathLength="1"
                d="M -20 340 C 180 340, 300 336, 420 356 C 470 364, 500 380, 505 408
                   C 510 444, 470 462, 430 448 C 380 430, 372 372, 420 340
                   C 462 312, 520 330, 540 380 C 556 420, 540 470, 505 510
                   C 470 545, 480 580, 500 605"
                :stroke="ink" stroke-width="2.6" fill="none" stroke-linecap="round" />
              <path class="scrub" data-window="0.27,0.47" pathLength="1"
                d="M 1020 340 C 820 340, 700 336, 580 356 C 530 364, 500 380, 495 408
                   C 490 444, 530 462, 570 448 C 620 430, 628 372, 580 340
                   C 538 312, 480 330, 460 380 C 444 420, 460 470, 495 510
                   C 530 545, 520 580, 500 605"
                :stroke="ink" stroke-width="2.6" fill="none" stroke-linecap="round" />
              <path class="scrub" data-window="0.47,0.53" pathLength="1" d="M 500 605 L 500 760"
                :stroke="ink" stroke-width="2.6" fill="none" stroke-linecap="round" />
            </svg>
            <div class="knot-word fade" data-window="0.53,0.58">{{ s.after }}</div>
          </div>
          <!-- The thread leaving the knot. It grows down out of the last word and is still
               growing when the pin releases — at which point the countdown's own stem picks
               it up at the seam. -->
          <div class="knot-stem" aria-hidden="true">
            <span class="stem-line grow" data-window="0.58,0.63" />
          </div>
        </div>
      </section>

      <!-- ── The countdown · the same thread, arriving. It comes down the centre, parts
           around the clock, and closes underneath it into the line the numbers stand on;
           from the middle of that line it drops once more to the seconds.

           The frame is MEASURED, not hand-drawn: `syncThread()` reads the real rects of the
           kicker, the clock and the seconds line and rebuilds the path whenever they move.
           That is what makes it survive the numbers themselves changing — "9 days" is a
           narrower clock than "128 days", and the embrace has to know. ── -->
      <section v-else-if="s.kind === 'countdown'" class="chapter-section day-scene count-scene" :data-idx="i">
        <svg class="thread" aria-hidden="true">
          <path class="scrub" data-window="0.03,0.28" pathLength="1" :d="thread.stem"
            :stroke="ink" stroke-width="2.6" fill="none" stroke-linecap="round" />
          <!-- Two paths, not one: a single path with two subpaths would draw the left arm
               to completion before the right one started, and the point of the gesture is
               that the thread parts. -->
          <path class="scrub" data-window="0.31,0.44" pathLength="1" :d="thread.armL"
            :stroke="ink" stroke-width="2.6" fill="none" stroke-linecap="round" />
          <path class="scrub" data-window="0.31,0.44" pathLength="1" :d="thread.armR"
            :stroke="ink" stroke-width="2.6" fill="none" stroke-linecap="round" />
          <path class="scrub" data-window="0.45,0.50" pathLength="1" :d="thread.tail"
            :stroke="ink" stroke-width="2.6" fill="none" stroke-linecap="round" />
        </svg>

        <div class="kicker fade" data-window="0.22,0.29">{{ s.lead }}</div>
        <div class="clock fade" data-window="0.35,0.45">
          <div v-for="u in units" :key="u.label" class="unit">
            <span class="u-num">{{ u.value }}</span>
            <span class="u-label">{{ u.label }}</span>
          </div>
        </div>
        <!-- The seconds, as a line that fills once a minute rather than a fourth number.
             ⚠️ THE FADE GOES ON THE WRAPPER. The track used to carry `.fade` itself, and
             the engine's inline `opacity` overrode the 0.14 that made it a track — so the
             ink-coloured fill was sweeping across an ink-coloured bar, invisible. -->
        <div class="sweep-wrap fade" data-window="0.47,0.53" aria-hidden="true">
          <span class="sweep-track" />
          <span class="sweep-fill" :style="{ transform: `scaleX(${secs / 60})` }" />
        </div>
      </section>
    </template>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { SITE } from '~/site.config'

defineProps({
  sections: { type: Array, required: true },
})

const ink = '#41492D'
const rootEl = ref(null)
let rafId = 0
let clockId = 0

// ── The month grid ──────────────────────────────────────────────────────────
// Built from the ISO month so the weekday columns, the leading blanks and the day
// count can never disagree with each other or with the date on the card.
const DOW = ['s', 'm', 't', 'w', 't', 'f', 's']
const parse = (iso) => { const [y, m] = iso.split('-').map(Number); return { y, m } }
const monthName = (iso) => {
  const { y, m } = parse(iso)
  return new Date(Date.UTC(y, m - 1, 1)).toLocaleDateString('en-GB', { month: 'long', year: 'numeric', timeZone: 'UTC' })
}
// ⚠️ UTC throughout. `new Date(y, m-1, 1)` is LOCAL, so west of Greenwich the 1st can
// resolve to the previous day and shift the whole grid by a column.
const lead = (iso) => { const { y, m } = parse(iso); return new Date(Date.UTC(y, m - 1, 1)).getUTCDay() }
const days = (iso) => {
  const { y, m } = parse(iso)
  return new Date(Date.UTC(y, m, 0)).getUTCDate()
}

// ── The countdown ───────────────────────────────────────────────────────────
const now = ref(Date.now())
const left = computed(() => Math.max(0, new Date(SITE.events[0].date).getTime() - now.value))
const pad2 = (n) => String(n).padStart(2, '0')
const units = computed(() => [
  { label: 'days', value: String(Math.floor(left.value / 86400000)) },
  { label: 'hours', value: pad2(Math.floor((left.value % 86400000) / 3600000)) },
  { label: 'minutes', value: pad2(Math.floor((left.value % 3600000) / 60000)) },
])
const secs = computed(() => Math.floor((left.value % 60000) / 1000))

// ── The thread that becomes the clock ───────────────────────────────────────
// Four paths in CSS pixels (the <svg> carries no viewBox, so its user units ARE the
// section's pixels — no `preserveAspectRatio: none` stretching a hairline into a wedge).
const thread = ref({ stem: '', armL: '', armR: '', tail: '' })
let threadSig = ''
const n1 = (v) => Math.round(v * 10) / 10

function syncThread(root) {
  const sec = root.querySelector('.count-scene')
  if (!sec) return
  const clockEl = sec.querySelector('.clock')
  const sweepEl = sec.querySelector('.sweep-wrap')
  const kickEl = sec.querySelector('.kicker')
  if (!clockEl || !sweepEl) return

  const S = sec.getBoundingClientRect()
  const C = clockEl.getBoundingClientRect()
  const W = sweepEl.getBoundingClientRect()
  const K = kickEl ? kickEl.getBoundingClientRect() : null

  // Every term is an OFFSET INSIDE the section, so the signature doesn't change as the
  // page scrolls — this runs on every frame and must be free when nothing has moved.
  const sig = [S.width, S.height, C.left - S.left, C.top - S.top, C.width, C.height,
    W.top - S.top, K ? K.top - S.top : 0, K ? K.height : 0].map((v) => Math.round(v)).join(',')
  if (sig === threadSig) return
  threadSig = sig

  const w = S.width
  const cx = Math.round(w / 2)
  const clockTop = C.top - S.top
  const clockBot = C.bottom - S.top
  const kickTop = K ? K.top - S.top : clockTop - 40
  const kickBot = K ? K.bottom - S.top : clockTop - 26

  // `a` is the height of the S-curve that opens the thread into two, and it has to live
  // in the gap the layout actually gives us between the kicker and the numbers.
  const gapAbove = Math.max(24, clockTop - kickBot)
  const br = Math.min(14, gapAbove * 0.22)          // the breath either side of the kicker
  const a = Math.min(130, gapAbove - br)   // taller fan ⇒ the thread drapes instead of squaring off
  const y0 = clockTop - a                            // where the thread parts
  const pad = Math.max(10, Math.min(46, w * 0.045))  // clearance around the clock
  const l = Math.max(6, C.left - S.left - pad)
  const r = Math.min(w - 6, C.right - S.left + pad)
  const yb = clockBot + Math.max(16, Math.min(46, a * 0.42))   // the line they stand on
  const ys = W.top - S.top                                      // the seconds
  const c = Math.max(12, Math.min(a * 0.8, (yb - clockTop) * 0.5, (cx - l) * 0.45))

  const lowerStem = y0 - (kickBot + br)
  thread.value = {
    stem: K
      ? `M ${cx} 0 V ${n1(kickTop - br)}` + (lowerStem > 2 ? ` M ${cx} ${n1(kickBot + br)} V ${n1(y0)}` : '')
      : `M ${cx} 0 V ${n1(y0)}`,
    armL: arm(cx, y0, a, l, yb, c, 1),
    armR: arm(cx, y0, a, r, yb, c, -1),
    tail: `M ${cx} ${n1(yb)} V ${n1(ys)}`,
  }
}

// One arm: an S out of the stem (leaving vertical, arriving vertical at the clock's top
// edge), straight down the outside, then a rounded corner into the baseline running back
// to the centre — where the two arms meet.
function arm(cx, y0, a, x, yb, c, sgn) {
  return `M ${cx} ${n1(y0)}`
    + ` C ${cx} ${n1(y0 + a * 0.55)}, ${n1(x)} ${n1(y0 + a * 0.45)}, ${n1(x)} ${n1(y0 + a)}`
    + ` L ${n1(x)} ${n1(yb - c)}`
    + ` C ${n1(x)} ${n1(yb - c * 0.45)}, ${n1(x + sgn * c * 0.45)} ${n1(yb)}, ${n1(x + sgn * c)} ${n1(yb)}`
    + ` L ${cx} ${n1(yb)}`
}

// ── The shared scrub engine ─────────────────────────────────────────────────
const clamp01 = (v) => Math.min(1, Math.max(0, v))
function tick() {
  const root = rootEl.value
  if (root) {
    syncThread(root)
    const vh = window.innerHeight
    for (const scene of root.querySelectorAll('.day-scene')) {
      const r = scene.getBoundingClientRect()
      const p = clamp01((vh - r.top) / (r.height + vh))
      for (const el of scene.querySelectorAll('.scrub, .fade, .grow')) {
        const win = el.dataset.window
        if (!win) continue
        const [a, b] = win.split(',').map(Number)
        const lp = clamp01((p - a) / (b - a))
        if (el.classList.contains('scrub')) el.style.strokeDashoffset = String(1 - lp)
        else if (el.classList.contains('grow')) el.style.transform = `scaleY(${lp})`
        else el.style.opacity = String(lp)
      }
    }
  }
  rafId = requestAnimationFrame(tick)
}

onMounted(() => {
  rafId = requestAnimationFrame(tick)
  clockId = setInterval(() => { now.value = Date.now() }, 1000)
})
onBeforeUnmount(() => {
  cancelAnimationFrame(rafId)
  clearInterval(clockId)
})
</script>

<style scoped>
.day-scene {
  position: relative;
  color: var(--accent, #41492D);
  background: var(--accentLight, #E9ECE2);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: max(11vh, 7rem) 6vw 10vh;
  box-sizing: border-box;
}
.scrub { stroke-dasharray: 1; stroke-dashoffset: 1; }
.fade { opacity: 0; }
.grow { transform: scaleY(0); transform-origin: top center; }

.kicker {
  font-family: 'Bague', sans-serif;
  font-size: 0.78rem;
  letter-spacing: 0.3em;
  text-transform: uppercase;
  opacity: 0.6;
}

/* ── the month ── */
.cal-scene { min-height: 132dvh; }
.month {
  font-family: 'Italiana', serif;
  font-size: clamp(1.6rem, 4vw, 3rem);
  letter-spacing: 0.06em;
  margin-top: 1.4rem;
}
.cal {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: clamp(0.1rem, 0.9vw, 0.7rem);
  width: min(88vw, 44rem);
  margin-top: clamp(1.2rem, 3.4vh, 2.4rem);
  /* ⚠️ ROWS ARE SIZED BY HEIGHT, not by an aspect ratio. Square cells in a 44rem grid are
     ~95px each, and six rows of them put the one date that matters below the fold — the
     month title and the circled day were never on screen together, which is the entire
     point of showing a calendar. */
  grid-auto-rows: clamp(2rem, 6.4vh, 3.4rem);
}
.dow {
  font-family: 'Bague', sans-serif;
  font-size: clamp(0.5rem, 1vw, 0.68rem);
  letter-spacing: 0.24em;
  text-transform: uppercase;
  opacity: 0.38;
  padding-bottom: 0.6rem;
}
.cell {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}
.num {
  font-family: 'Italiana', serif;
  font-size: clamp(0.85rem, 2.2vw, 1.65rem);
  line-height: 1;
  /* ⚠️ The whole idea: thirty numerals that recede and one that does not. */
  opacity: 0.22;
}
.marked .num { opacity: 1; }
.day-ring {
  /* A square centred on the numeral — the cells are wide and short, so an inset-based
     ring came out as a flat ellipse. */
  position: absolute;
  left: 50%;
  top: 50%;
  width: clamp(2.1rem, 5.6vh, 3rem);
  height: clamp(2.1rem, 5.6vh, 3rem);
  transform: translate(-50%, -50%);
  overflow: visible;
  pointer-events: none;
}
.note {
  font-family: 'Bague', sans-serif;
  font-size: 0.82rem;
  letter-spacing: 0.06em;
  line-height: 1.7;
  opacity: 0.62;
  max-width: 26rem;
  margin: clamp(2rem, 5vh, 3.4rem) 0 0;
}

/* ── the knot ── */
/* ⚠️ NO `overflow: hidden` here — this is the sticky child's containment box, and a
   clipped ancestor makes `position: sticky` behave as static (fixed once in `4586dd48`).
   ⚠️ NO PADDING either, and the SAME HEIGHT AT EVERY BREAKPOINT — see the template. */
.knot-scene { min-height: 170dvh; padding: 0; display: block; }
.knot-hold {
  position: sticky;
  top: 0;
  height: 100dvh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  gap: 0;
}
.knot-spacer, .knot-stem { flex: 1 1 0; }
.knot-core {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.4rem;
}
.knot-stem { position: relative; width: 2.6px; }
.stem-line {
  position: absolute;
  inset: 0;
  background: currentColor;
  border-radius: 1px;
}
.knot { width: min(62vw, 42rem); height: auto; overflow: visible; }
.knot-word {
  font-family: 'Italiana', serif;
  font-size: clamp(1.1rem, 2.6vw, 1.8rem);
  letter-spacing: 0.08em;
}

/* ── the countdown ── */
.count-scene { min-height: 130dvh; }
.thread {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  overflow: visible;
  pointer-events: none;
}
.clock {
  display: flex;
  align-items: flex-start;
  gap: clamp(1.4rem, 6vw, 4.5rem);
  /* ⚠️ THIS GAP IS THE FAN. `syncThread` sizes the S-curve that opens the thread into
     two from the space between the kicker and the numbers — a shallow gap makes a wide,
     flat canopy that reads as a box rather than a draped thread. */
  margin-top: clamp(4rem, 13vh, 8rem);
}
.unit { position: relative; display: flex; flex-direction: column; align-items: center; }
.u-num {
  font-family: 'Italiana', serif;
  font-size: clamp(3.2rem, 13vw, 8.5rem);
  line-height: 0.94;
  font-variant-numeric: tabular-nums;
  /* ⚠️ Tabular figures AND a floor on the width: without both, "09"→"10" and the
     minute rolling over would shunt the whole row sideways every tick. */
  min-width: 1.7em;
}
.u-label {
  font-family: 'Bague', sans-serif;
  font-size: clamp(0.56rem, 1.1vw, 0.72rem);
  letter-spacing: 0.28em;
  text-transform: uppercase;
  opacity: 0.55;
  margin-top: 0.9rem;
}
.sweep-wrap {
  position: relative;
  width: min(70vw, 26rem);
  height: 2px;
  margin-top: clamp(3rem, 8vh, 5rem);
}
.sweep-track { position: absolute; inset: 0; background: currentColor; opacity: 0.16; }
.sweep-fill {
  position: absolute;
  inset: 0;
  background: currentColor;
  transform-origin: left center;
  /* One second at a time — no easing, so it reads as a clock and not as an animation. */
  transition: transform 0.9s linear;
}

@media (max-width: 767px) {
  .knot { width: 92vw; }
  .cal { width: 92vw; grid-auto-rows: clamp(1.8rem, 5.2vh, 2.6rem); }
  .clock { gap: 1.2rem; }
  .u-num { min-width: 1.5em; }
}

/* ⚠️ SHORT VIEWPORTS, NOT NARROW ONES. A landscape phone is 844px WIDE, so every width
   query misses it, and a 390px sticky frame cannot hold a word, the knot and another word.
   `and (orientation: landscape)` matters too: a 320×568 portrait phone is also under
   600px tall and had its knot shrunk by half when this was width-agnostic. */
@media (max-height: 600px) and (orientation: landscape) {
  .knot { width: min(42vw, 23rem); }
  .knot-hold { padding-top: 4.5rem; box-sizing: border-box; }
  .knot-core { gap: 0.5rem; }
  .knot-word { font-size: clamp(0.9rem, 2.4vw, 1.15rem); }
  .day-scene { padding-top: max(14vh, 5.5rem); }
  .cal { width: min(60vw, 32rem); margin-top: 0.7rem; grid-auto-rows: clamp(1.3rem, 6vh, 2rem); }
  .u-num { font-size: clamp(2.4rem, 7vw, 4rem); }
  .clock { margin-top: clamp(1.6rem, 7vh, 2.6rem); }
  .sweep-wrap { margin-top: 1.6rem; }
}
</style>
