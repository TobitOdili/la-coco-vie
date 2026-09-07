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
               it up at the seam.
               ⚠️ WIDTH IS MEASURED, NOT TYPED. The knot is drawn in a 1000-unit viewBox at
               2.6 units, so on screen its ink is 2.6 × (rendered width ÷ 1000) — 1.75px at
               1440, 0.93px on a phone. A hard-coded 2.6px div was visibly fatter than the
               line it continues. `inkW` carries the real number to every plain-pixel stroke
               on this page. -->
          <div class="knot-stem" :style="{ width: inkW + 'px' }" aria-hidden="true">
            <span class="stem-line grow" data-window="0.58,0.63" />
          </div>
        </div>
      </section>

      <!-- ── The countdown · the thread arrives, and stops. It comes down the centre and
           ends at "until then" — it does not enclose the clock. Underneath, each unit is a
           dial: a ring whose circumference drains away over that unit's own cycle and snaps
           back full the instant the number beneath it changes. Days empty over 24h, hours
           over 60 minutes, minutes over 60 seconds — so the minutes ring is the only thing
           on the page that visibly moves, and all three are exactly in step with the
           numerals they surround. ── -->
      <section v-else-if="s.kind === 'countdown'" class="chapter-section day-scene count-scene" :data-idx="i">
        <!-- One path, measured: it has to begin at the section's own top edge (which is the
             seam the knot's stem ends on) and stop short of the kicker. The <svg> carries no
             viewBox, so its user units ARE the section's CSS pixels. -->
        <svg class="thread" aria-hidden="true">
          <path class="scrub" data-window="0.03,0.28" pathLength="1" :d="stem"
            :stroke="ink" :stroke-width="inkW" fill="none" stroke-linecap="round" />
        </svg>

        <div class="kicker fade" data-window="0.22,0.29">{{ s.lead }}</div>
        <div class="clock fade" data-window="0.32,0.42">
          <div v-for="u in units" :key="u.label" class="unit">
            <div class="u-dial">
              <!-- The drain is a CONIC MASK, not a dash: the tail ramps out over `--ramp`
                   instead of ending on a hard cut, so the ring reads as fading away rather
                   than as a progress bar. `--a1` is where it has got to; `--a0` is where the
                   ramp begins. `vector-effect` keeps the stroke in real pixels, so it is the
                   same weight as the knot's ink at every size. -->
              <svg class="u-ring" viewBox="0 0 100 100" aria-hidden="true"
                :style="{ '--a0': ringA0(u.f) + 'deg', '--a1': ringA1(u.f) + 'deg' }">
                <circle cx="50" cy="50" r="48" fill="none" :stroke="ink"
                  :stroke-width="inkW" vector-effect="non-scaling-stroke" />
              </svg>
              <span class="u-num">{{ u.value }}</span>
            </div>
            <span class="u-label">{{ u.label }}</span>
          </div>
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

// ── The countdown, and the three dials ──────────────────────────────────────
// ⚠️ `now` is driven by the rAF loop, NOT a 1s interval. Each ring's fraction has to be
// continuous or the minutes dial steps in sixtieths once a second; a CSS transition would
// smooth that but would then smear the scroll reveal by a second as well.
const now = ref(Date.now())
const left = computed(() => Math.max(0, new Date(SITE.events[0].date).getTime() - now.value))
const pad2 = (n) => String(n).padStart(2, '0')
// `f` is the fraction of THAT unit's own cycle still to run, so it reaches 0 and resets to
// 1 at exactly the moment the numeral beside it changes.
const units = computed(() => {
  const L = left.value
  return [
    { label: 'days', value: String(Math.floor(L / 86400000)), f: (L % 86400000) / 86400000 },
    { label: 'hours', value: pad2(Math.floor((L % 86400000) / 3600000)), f: (L % 3600000) / 3600000 },
    { label: 'minutes', value: pad2(Math.floor((L % 3600000) / 60000)), f: (L % 60000) / 60000 },
  ]
})

// How much of each ring is drawn, multiplied by the scroll reveal so the dials draw
// themselves in to their current reading rather than fading on as finished shapes.
const RAMP = 26                    // degrees of soft tail
const ringReveal = ref(0)
const ringA1 = (f) => +(f * ringReveal.value * 360).toFixed(2)
const ringA0 = (f) => +Math.max(0, ringA1(f) - RAMP).toFixed(2)

// ── Measured geometry ───────────────────────────────────────────────────────
// The knot is drawn at 2.6 units in a 1000-unit viewBox, so its ink on screen is
// 2.6 × width/1000. Every plain-pixel stroke on this page takes its weight from that.
const inkW = ref(1.75)
const stem = ref('')
let sig = ''
function syncFrame(root) {
  const knot = root.querySelector('.knot')
  const sec = root.querySelector('.count-scene')
  if (!sec) return
  const kick = sec.querySelector('.kicker')
  const S = sec.getBoundingClientRect()
  const K = kick ? kick.getBoundingClientRect() : null
  const kw = knot ? knot.getBoundingClientRect().width : 0
  // Offsets INSIDE the section, so the signature is stable while the page scrolls — this
  // runs every frame and must be free when nothing has moved.
  const next = [Math.round(kw), Math.round(S.width), K ? Math.round(K.top - S.top) : -1].join(',')
  if (next === sig) return
  sig = next

  if (kw) inkW.value = Math.max(0.5, Math.round(2.6 * kw / 1000 * 100) / 100)
  const cx = Math.round(S.width / 2)
  const stop = K ? (K.top - S.top) - Math.min(18, Math.max(8, S.height * 0.012)) : S.height * 0.4
  stem.value = `M ${cx} 0 V ${Math.round(stop * 10) / 10}`
}

// ── The shared scrub engine ─────────────────────────────────────────────────
const clamp01 = (v) => Math.min(1, Math.max(0, v))
const RING_WIN = [0.36, 0.48]
function tick() {
  const root = rootEl.value
  if (root) {
    now.value = Date.now()
    syncFrame(root)
    const vh = window.innerHeight
    for (const scene of root.querySelectorAll('.day-scene')) {
      const r = scene.getBoundingClientRect()
      const p = clamp01((vh - r.top) / (r.height + vh))
      if (scene.classList.contains('count-scene')) {
        ringReveal.value = clamp01((p - RING_WIN[0]) / (RING_WIN[1] - RING_WIN[0]))
      }
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

onMounted(() => { rafId = requestAnimationFrame(tick) })
onBeforeUnmount(() => { cancelAnimationFrame(rafId) })
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
/* width comes from `inkW` — see the template. */
.knot-stem { position: relative; }
.stem-line { position: absolute; inset: 0; background: currentColor; }
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
  /* ⚠️ ONE SOURCE FOR THE SCALE. The dial is sized off the numeral, so the ring can never
     end up too small to hold its own number at some in-between width. */
  --num: clamp(2.6rem, 12vw, 8rem);
  display: flex;
  align-items: flex-start;
  gap: clamp(1.4rem, 6vw, 4.5rem);
  margin-top: clamp(3rem, 9vh, 5.5rem);
}
.unit { position: relative; display: flex; flex-direction: column; align-items: center; }
.u-dial {
  position: relative;
  width: calc(var(--num) * 1.62);
  height: calc(var(--num) * 1.62);
  display: flex;
  align-items: center;
  justify-content: center;
}
.u-ring {
  position: absolute;
  inset: 0;
  overflow: visible;
  /* The drain. Opaque to `--a0`, ramped out by `--a1`, gone after that — so the tail of
     the circumference dissolves instead of stopping dead. Both angles are written from
     the component; at `--a1: 0deg` the whole mask is transparent and the ring is gone. */
  -webkit-mask-image: conic-gradient(from -90deg, #000 0deg, #000 var(--a0, 0deg), transparent var(--a1, 0deg));
  mask-image: conic-gradient(from -90deg, #000 0deg, #000 var(--a0, 0deg), transparent var(--a1, 0deg));
}
.u-num {
  font-family: 'Italiana', serif;
  font-size: var(--num);
  line-height: 0.94;
  /* The dial is a fixed width, so a digit change can no longer shunt the row — but tabular
     figures keep the numeral itself from shifting inside its own ring. */
  font-variant-numeric: tabular-nums;
}
.u-label {
  font-family: 'Bague', sans-serif;
  font-size: clamp(0.56rem, 1.1vw, 0.72rem);
  letter-spacing: 0.28em;
  text-transform: uppercase;
  opacity: 0.55;
  margin-top: 1rem;
}

@media (max-width: 767px) {
  .knot { width: 92vw; }
  .cal { width: 92vw; grid-auto-rows: clamp(1.8rem, 5.2vh, 2.6rem); }
  .clock { gap: 1.5rem; }
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
  .clock { --num: clamp(2rem, 6.2vw, 3.4rem); margin-top: clamp(1.4rem, 6vh, 2.4rem); }
  .u-label { margin-top: 0.55rem; }
}
</style>
