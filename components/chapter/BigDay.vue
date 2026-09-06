<template>
  <div ref="rootEl" class="big-day">
    <template v-for="(s, i) in sections" :key="i">
      <!-- ── The month · every other date recedes; the one that matters is inked and
           ringed. ⚠️ EVERY WINDOW ON THE NON-STICKY SCENES ENDS BY ~0.50. `p = 0.5` is
           "the scene is centred in the viewport", so anything opening later than that
           plays while the content is already leaving the top of the screen — which is
           exactly what the previous cut of this page did (`.count-tail` opened at 0.72,
           measured on screen at 14%). ── -->
      <section v-if="s.kind === 'calendar'" class="chapter-section day-scene cal-scene" :data-idx="i">
        <div class="kicker fade" data-window="0.06,0.13">{{ s.kicker }}</div>
        <div class="month fade" data-window="0.10,0.18">{{ monthName(s.monthISO) }}</div>

        <div class="cal fade" data-window="0.12,0.24">
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
              <path class="scrub" data-window="0.26,0.42" pathLength="1"
                d="M 74 22 C 92 36, 94 62, 74 78 C 54 94, 22 90, 10 70
                   C -2 50, 8 24, 32 14 C 54 5, 78 12, 86 30"
                :stroke="ink" stroke-width="2.4" fill="none" stroke-linecap="round" />
            </svg>
          </div>
        </div>

        <p class="note fade" data-window="0.42,0.52">{{ s.note }}</p>
      </section>

      <!-- ── The knot · ⚠️ RESTORED VERBATIM from `b5a52348`. Two threads arrive from
           either edge, cross, loop around one another and leave as one line. A pass on
           2026-09-06 redrew this as a literal heart; the user's note was that the shape
           the threads actually make is the thing worth keeping. Do not tidy these curves.
           ⚠️ Every window sits inside [0.29, 0.71] — the sticky hold for a 240dvh scene
           around a 100dvh child. Outside it the drawing plays to an empty frame. ── -->
      <section v-else-if="s.kind === 'knot'" class="chapter-section day-scene knot-scene" :data-idx="i">
        <div class="knot-hold">
          <div class="knot-word fade" data-window="0.31,0.37">{{ s.before }}</div>
          <!-- ⚠️ viewBox cropped to the INK (y 300→760). The paths live in a 0–760 space
               but only draw from ~312 down, and the empty top pushed the first word out of
               the sticky frame and slid the drawing under the fixed nav. -->
          <svg class="knot" viewBox="0 300 1000 460" fill="none" aria-hidden="true">
            <path class="scrub" data-window="0.34,0.50" pathLength="1"
              d="M -20 340 C 180 340, 300 336, 420 356 C 470 364, 500 380, 505 408
                 C 510 444, 470 462, 430 448 C 380 430, 372 372, 420 340
                 C 462 312, 520 330, 540 380 C 556 420, 540 470, 505 510
                 C 470 545, 480 580, 500 605"
              :stroke="ink" stroke-width="2.6" fill="none" stroke-linecap="round" />
            <path class="scrub" data-window="0.38,0.55" pathLength="1"
              d="M 1020 340 C 820 340, 700 336, 580 356 C 530 364, 500 380, 495 408
                 C 490 444, 530 462, 570 448 C 620 430, 628 372, 580 340
                 C 538 312, 480 330, 460 380 C 444 420, 460 470, 495 510
                 C 530 545, 520 580, 500 605"
              :stroke="ink" stroke-width="2.6" fill="none" stroke-linecap="round" />
            <path class="scrub" data-window="0.55,0.63" pathLength="1" d="M 500 605 L 500 760"
              :stroke="ink" stroke-width="2.6" fill="none" stroke-linecap="round" />
          </svg>
          <div class="knot-word fade" data-window="0.63,0.69">{{ s.after }}</div>
        </div>
      </section>

      <!-- ── The countdown · plainly a countdown. Days, hours, minutes, read at a glance. ── -->
      <section v-else-if="s.kind === 'countdown'" class="chapter-section day-scene count-scene" :data-idx="i">
        <div class="kicker fade" data-window="0.08,0.16">{{ s.lead }}</div>
        <div class="clock fade" data-window="0.14,0.28">
          <div v-for="(u, k) in units" :key="u.label" class="unit">
            <span class="u-num">{{ u.value }}</span>
            <span class="u-label">{{ u.label }}</span>
            <span v-if="k < units.length - 1" class="u-rule" aria-hidden="true" />
          </div>
        </div>
        <!-- The seconds, as a line that sweeps once a minute rather than a fourth number.
             It is the only thing on the page that moves on its own. -->
        <div class="sweep fade" data-window="0.24,0.34" aria-hidden="true">
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
const pad = (n) => String(n).padStart(2, '0')
const units = computed(() => [
  { label: 'days', value: String(Math.floor(left.value / 86400000)) },
  { label: 'hours', value: pad(Math.floor((left.value % 86400000) / 3600000)) },
  { label: 'minutes', value: pad(Math.floor((left.value % 3600000) / 60000)) },
])
const secs = computed(() => Math.floor((left.value % 60000) / 1000))

// ── The shared scrub engine ─────────────────────────────────────────────────
const clamp01 = (v) => Math.min(1, Math.max(0, v))
function tick() {
  const root = rootEl.value
  if (root) {
    const vh = window.innerHeight
    for (const scene of root.querySelectorAll('.day-scene')) {
      const r = scene.getBoundingClientRect()
      const p = clamp01((vh - r.top) / (r.height + vh))
      for (const el of scene.querySelectorAll('.scrub, .fade')) {
        const win = el.dataset.window
        if (!win) continue
        const [a, b] = win.split(',').map(Number)
        const lp = clamp01((p - a) / (b - a))
        if (el.classList.contains('scrub')) el.style.strokeDashoffset = String(1 - lp)
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
   clipped ancestor makes `position: sticky` behave as static (fixed once in `4586dd48`). */
.knot-scene { min-height: 240dvh; padding-inline: 0; display: block; }
.knot-hold {
  position: sticky;
  top: 0;
  height: 100dvh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1.4rem;
}
.knot { width: min(62vw, 42rem); height: auto; overflow: visible; }
.knot-word {
  font-family: 'Italiana', serif;
  font-size: clamp(1.1rem, 2.6vw, 1.8rem);
  letter-spacing: 0.08em;
}

/* ── the countdown ── */
.count-scene { min-height: 122dvh; }
.clock {
  display: flex;
  align-items: flex-start;
  gap: clamp(1.4rem, 6vw, 4.5rem);
  margin-top: clamp(1.8rem, 5vh, 3.2rem);
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
.u-rule {
  /* ⚠️ Sized as a PERCENTAGE of the unit, not in `em`. `em` here resolves against the
     inherited 16px root, not the 8.5rem numeral beside it, so the rules rendered as 11px
     ticks floating above the numbers instead of hairlines between them. */
  position: absolute;
  top: 10%;
  right: calc(-1 * clamp(0.7rem, 3vw, 2.25rem));
  width: 1px;
  height: 46%;
  background: currentColor;
  opacity: 0.18;
}
.sweep {
  width: min(70vw, 26rem);
  height: 1px;
  margin-top: clamp(2.4rem, 6vh, 4rem);
  background: currentColor;
  opacity: 0.14;
  position: relative;
}
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
  .knot-scene { min-height: 210dvh; }
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
  .knot-hold { padding-top: 4.5rem; box-sizing: border-box; gap: 0.5rem; }
  .knot-word { font-size: clamp(0.9rem, 2.4vw, 1.15rem); }
  .day-scene { padding-top: max(14vh, 5.5rem); }
  .cal { width: min(60vw, 32rem); margin-top: 0.7rem; grid-auto-rows: clamp(1.3rem, 6vh, 2rem); }
  .u-num { font-size: clamp(2.4rem, 7vw, 4rem); }
  .sweep { margin-top: 1.4rem; }
}
</style>
