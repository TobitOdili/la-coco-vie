<template>
  <div class="big-day">
    <!-- ── THE CALENDAR ─────────────────────────────────────────────────────
         The month itself, as a page off a wall calendar: October 2026 with the
         two wedding days ringed in marker and annotated by hand. One image
         answers a guest's first question — WHICH DAYS — and the marker notes
         say which is which without a sentence of explanation.

         The grid is COMPUTED from `monthISO`, never authored, so changing the
         month is a one-line data edit and the weekday alignment cannot go stale.

         Motion is navigation, not decoration: hovering (or tapping) a ringed
         date swaps the detail panel below the grid. Nothing scrubs and nothing
         draws continuously while you read — that was the complaint that killed
         the thread version. Dates are NUMERALS everywhere; spelling them out
         read as an affectation and was worse to scan. -->
    <section
      v-for="(s, i) in sections"
      :key="i"
      :ref="setSceneRef"
      class="chapter-section day-scene"
      :class="[`is-${s.kind}`, { 'in-view': inView[i] }]"
      :data-idx="i"
    >
      <!-- ── the month ── -->
      <div v-if="s.kind === 'calendar'" class="cal-wrap">
        <header class="cal-head">
          <h2 class="month set" :style="{ '--i': 0 }">{{ monthName(s) }}</h2>
          <div class="year set" :style="{ '--i': 1 }">{{ yearOf(s) }}</div>
        </header>

        <div class="cal-grid">
          <div v-for="d in DOW" :key="`h-${d}`" class="dow set" :style="{ '--i': 2 }">{{ d }}</div>

          <template v-for="(cell, k) in gridOf(s)" :key="k">
            <div v-if="!cell" class="cell pad" aria-hidden="true" />

            <!-- a ringed day: the interactive one -->
            <button
              v-else-if="markOf(s, cell)"
              type="button"
              class="cell day marked"
              :class="{ open: openDay === cell }"
              :style="{ '--i': 3 + Math.floor(k / 7) }"
              :aria-expanded="openDay === cell"
              :aria-label="`${cell} ${monthName(s)} — ${markOf(s, cell).label}`"
              @mouseenter="hoverDay = cell"
              @mouseleave="hoverDay = null"
              @focus="hoverDay = cell"
              @blur="hoverDay = null"
              @click="pinned = pinned === cell ? null : cell"
            >
              <span class="n">{{ cell }}</span>
              <!-- the marker ring: one rough loop that overshoots and doesn't close -->
              <svg class="marker-ring" viewBox="0 0 120 96" aria-hidden="true">
                <path
                  :d="RING"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="3.4"
                  stroke-linecap="round"
                />
              </svg>
              <span class="scrawl" :style="{ '--rot': (markOf(s, cell).rot || -6) + 'deg' }">
                {{ markOf(s, cell).scrawl }}
              </span>
            </button>

            <div v-else class="cell day" :style="{ '--i': 3 + Math.floor(k / 7) }">
              <span class="n">{{ cell }}</span>
            </div>
          </template>
        </div>

        <!-- the detail for whichever ringed day is active -->
        <div class="detail" :class="{ 'is-pinned': pinned !== null }">
          <transition name="swap" mode="out-in">
            <div v-if="activeMark(s)" :key="activeDay(s)" class="card">
              <div class="card-date">
                <span class="card-day">{{ activeDay(s) }}</span>
                <span class="card-md">{{ shortDate(s, activeDay(s)) }}</span>
              </div>
              <div class="card-body">
                <div class="card-title">{{ activeMark(s).label }}</div>
                <div v-for="(e, j) in activeMark(s).events" :key="j" class="ev">
                  <span class="ev-time">{{ e.time }}</span>
                  <span class="ev-name">{{ e.name }}</span>
                  <span class="ev-place">{{ e.venue }} · {{ e.address }}</span>
                  <a class="ev-map" :href="e.map || '#'" target="_blank" rel="noopener noreferrer">
                    open in maps ↗
                  </a>
                </div>
                <div class="card-dress">{{ activeMark(s).dress }}</div>
              </div>
            </div>
          </transition>
          <div class="hint" aria-hidden="true">{{ hintText }}</div>
        </div>
      </div>

      <!-- ── good to know ── -->
      <div v-else class="notes-wrap">
        <h2 class="notes-title set" :style="{ '--i': 0 }">{{ s.title }}</h2>
        <ul class="notes">
          <li
            v-for="(n, j) in s.lines"
            :key="j"
            class="note-line set"
            :style="{ '--i': 1 + j }"
          >
            <span class="note-label">{{ n.label }}</span>
            <span class="note-value">{{ n.value }}</span>
          </li>
        </ul>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'

const props = defineProps({
  sections: { type: Array, required: true },
})

const DOW = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
]
// One rough marker loop — it overshoots the start and never quite closes, which is
// what stops it reading as a drawn UI circle.
const RING =
  'M 92 20 C 78 7, 40 5, 22 21 C 5 36, 8 67, 27 79 C 47 92, 89 90, 103 72 ' +
  'C 115 56, 110 29, 88 17 C 76 11, 61 10, 50 13'

const hoverDay = ref(null)
const pinned = ref(null)

// With nothing hovered or pinned the FIRST wedding shows: an empty panel would be
// a hole in the page, and the most useful default state is real detail.
const cal = computed(() => props.sections.find((s) => s.kind === 'calendar'))
const firstMarkDay = computed(() => {
  const marks = cal.value?.marks || []
  return marks.length ? Math.min(...marks.map((m) => m.day)) : null
})
const openDay = computed(() => hoverDay.value ?? pinned.value ?? firstMarkDay.value)

const yearOf = (s) => Number(s.monthISO.split('-')[0])
const monthOf = (s) => Number(s.monthISO.split('-')[1])
const monthName = (s) => MONTHS[monthOf(s) - 1]

// DERIVED from the month, so the weekday alignment can never drift out of sync
// with the dates: leading blanks = the 1st's weekday, then the days themselves.
function gridOf(s) {
  const y = yearOf(s)
  const m = monthOf(s)
  const pad = new Date(Date.UTC(y, m - 1, 1)).getUTCDay()
  const days = new Date(Date.UTC(y, m, 0)).getUTCDate()
  const cells = Array(pad).fill(null)
  for (let d = 1; d <= days; d += 1) cells.push(d)
  while (cells.length % 7 !== 0) cells.push(null)
  return cells
}
const markOf = (s, day) => (s.marks || []).find((m) => m.day === day) || null
const activeDay = (s) => (markOf(s, openDay.value) ? openDay.value : firstMarkDay.value)
const activeMark = (s) => markOf(s, activeDay(s))
function shortDate(s, day) {
  const y = yearOf(s)
  const m = monthOf(s)
  const dow = DOW[new Date(Date.UTC(y, m - 1, day)).getUTCDay()]
  return `${dow} · ${String(day).padStart(2, '0')}.${String(m).padStart(2, '0')}.${String(y).slice(2)}`
}

// Touch devices never hover, so the hint has to name the gesture they actually have.
const hintText = ref('hover a ringed date')

// Latch on first enter, then never touch the DOM again — this page's job is to be
// read, so it holds still. (No rAF loop anywhere in this component.)
const sceneEls = []
const setSceneRef = (el) => { if (el) sceneEls.push(el) }
const inView = ref({})
let observer = null

onMounted(() => {
  if (window.matchMedia?.('(hover: none)').matches) hintText.value = 'tap a ringed date'
  observer = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (e.isIntersecting) {
          inView.value[+e.target.dataset.idx] = true
          observer.unobserve(e.target)
        }
      }
    },
    { threshold: 0.12 }
  )
  sceneEls.forEach((el) => observer.observe(el))
})
onBeforeUnmount(() => observer?.disconnect())
</script>

<style scoped>
.day-scene {
  position: relative;
  min-height: 100dvh;
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  padding: 9vh 6vw 7vh;
  color: var(--accent, #41492D);
  background: #F1F3EC;

  /* The marker is a brighter, warmer olive than the printed ink — a second hand on
     the same page, still inside the chapter's own colour family. */
  --marker: #77854A;
}
.is-notes { background: #E9ECE2; }

/* the arrival: a short set, then stillness (no rAF, nothing scroll-tied) */
.set {
  opacity: 0;
  transform: translateY(12px);
  transition:
    opacity 0.6s ease,
    transform 0.6s cubic-bezier(0.22, 1, 0.36, 1);
  transition-delay: calc(var(--i, 0) * 70ms);
}
.in-view .set { opacity: 1; transform: none; }

/* ── the month ── */
.cal-wrap { width: 100%; max-width: 58rem; }
.cal-head {
  display: flex;
  align-items: baseline;
  justify-content: center;
  gap: 1rem;
  margin-bottom: clamp(1.2rem, 3vh, 2rem);
}
.month {
  font-family: 'Italiana', serif;
  font-weight: 400;
  font-size: clamp(2.4rem, 6.4vw, 4.4rem);
  line-height: 1;
  letter-spacing: 0.04em;
  margin: 0;
}
.year {
  font-family: 'Bague', sans-serif;
  font-size: clamp(0.8rem, 1.6vw, 1.05rem);
  letter-spacing: 0.34em;
  opacity: 0.55;
}

.cal-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  column-gap: 0.4rem;
  row-gap: clamp(0.2rem, 0.8vh, 0.55rem);
}
.dow {
  font-family: 'Bague', sans-serif;
  font-size: 0.6rem;
  letter-spacing: 0.26em;
  text-transform: uppercase;
  opacity: 0.45;
  text-align: center;
  padding-bottom: 0.7rem;
}

/* No boxes and no borders — a printed month, not a UI widget. The cells are only
   the rhythm the numerals sit on. */
.cell {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  aspect-ratio: 1 / 0.6;
  /* ⚠️ `appearance: none` is load-bearing: a ringed day is a real <button> (so it is
     keyboard-reachable), and border:0 alone does NOT stop the UA painting the native
     widget frame — a square box appeared around each ringed date. */
  appearance: none;
  -webkit-appearance: none;
  border: 0;
  background: none;
  padding: 0;
  margin: 0;
  color: inherit;
  font: inherit;
}
.pad { visibility: hidden; }
.n {
  font-family: 'Italiana', serif;
  font-size: clamp(1.05rem, 2.6vw, 1.9rem);
  line-height: 1;
  opacity: 0.42;
  transition: opacity 0.35s ease;
}

/* ── a ringed day ── */
.marked { cursor: none; color: var(--marker); }
.marked .n { opacity: 1; color: var(--accent, #41492D); }
.marker-ring {
  position: absolute;
  inset: -16% -10%;
  width: 120%;
  height: 132%;
  overflow: visible;
  opacity: 0.88;
  pointer-events: none;
  transition: opacity 0.3s ease;
}
/* ⚠️ This was `.ring` and picked up TAILWIND's `ring` utility — `.ring` sets a
   `--tw-ring-shadow` of `0 0 0 1px currentcolor`, which painted a crisp SQUARE
   outline around every ringed date. Scoped-CSS class names share the global
   namespace with Tailwind's utility layer; check a new class name against it. */
/* drawn once, on reveal: dasharray is the path's own length, rounded up */
.marker-ring path {
  stroke-dasharray: 430;
  stroke-dashoffset: 430;
  transition: stroke-dashoffset 0.95s ease;
}
.in-view .marked .marker-ring path { stroke-dashoffset: 0; transition-delay: 0.7s; }

/* the note, written across the day in marker */
.scrawl {
  position: absolute;
  top: 76%;
  left: 50%;
  transform: translateX(-50%) rotate(var(--rot, -6deg));
  transform-origin: 50% 0;
  font-family: 'Caveat', 'Bradley Hand', cursive;
  font-weight: 700;
  font-size: clamp(0.85rem, 1.7vw, 1.15rem);
  line-height: 1;
  white-space: nowrap;
  color: var(--marker);
  opacity: 0;
  transition: opacity 0.5s ease 1.1s;
  pointer-events: none;
}
.in-view .scrawl { opacity: 0.92; }

/* hover / focus / open — the ring inks in and the day gets a faint wash */
.marked:hover,
.marked:focus-visible { outline: none; }
.marked:hover .ring,
.marked:focus-visible .ring,
.marked.open .marker-ring { opacity: 1; }
.marked::after {
  content: '';
  position: absolute;
  inset: -18% -12%;
  border-radius: 50%;
  background: currentColor;
  opacity: 0;
  transition: opacity 0.35s ease;
  z-index: -1;
}
.marked:hover::after,
.marked:focus-visible::after,
.marked.open::after { opacity: 0.1; }

/* ── the detail panel ── */
.detail {
  position: relative;
  margin-top: clamp(1.4rem, 3.2vh, 2.2rem);
  padding-top: clamp(1.1rem, 2.2vh, 1.6rem);
  border-top: 1px solid color-mix(in srgb, currentColor 22%, transparent);
  /* reserved, so swapping days never shifts the page under the reader */
  min-height: 9.5rem;
}
.card { display: flex; gap: clamp(1.2rem, 4vw, 2.6rem); align-items: flex-start; }
.card-date { flex: none; text-align: center; }
.card-day {
  display: block;
  font-family: 'Italiana', serif;
  font-size: clamp(2.6rem, 7vw, 4.4rem);
  line-height: 0.9;
}
.card-md {
  display: block;
  font-family: 'Bague', sans-serif;
  font-size: 0.64rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  opacity: 0.6;
  margin-top: 0.55rem;
  white-space: nowrap;
}
.card-body { min-width: 0; }
.card-title {
  font-family: 'Italiana', serif;
  font-size: clamp(1.3rem, 3vw, 2rem);
  line-height: 1.1;
  margin-bottom: 0.85rem;
}
.ev { margin-bottom: 0.75rem; font-family: 'Bague', sans-serif; }
.ev-time {
  display: inline-block;
  min-width: 5.5rem;
  font-size: 0.7rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  opacity: 0.7;
}
.ev-name { font-size: 0.95rem; font-weight: 700; }
.ev-place {
  display: block;
  font-size: 0.86rem;
  line-height: 1.65;
  opacity: 0.7;
  margin-top: 0.15rem;
}
.ev-map {
  display: inline-block;
  margin-top: 0.2rem;
  font-size: 0.72rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--marker);
  text-decoration: none;
  border-bottom: 1px solid color-mix(in srgb, var(--marker) 45%, transparent);
  cursor: none;
}
.card-dress {
  font-family: 'Bague', sans-serif;
  font-size: 0.76rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  opacity: 0.75;
  margin-top: 1rem;
}
.hint {
  position: absolute;
  top: calc(100% + 0.2rem);
  inset-inline-end: 0;
  font-family: 'Caveat', cursive;
  font-weight: 600;
  font-size: 1.05rem;
  color: var(--marker);
  opacity: 0.6;
  transform: rotate(-4deg);
  pointer-events: none;
  transition: opacity 0.3s ease;
}
.is-pinned .hint { opacity: 0; }

.swap-enter-active,
.swap-leave-active { transition: opacity 0.22s ease, transform 0.22s ease; }
.swap-enter-from { opacity: 0; transform: translateY(6px); }
.swap-leave-to { opacity: 0; transform: translateY(-6px); }

/* ── good to know ── */
.notes-wrap { width: 100%; max-width: 46rem; }
.notes-title {
  font-family: 'Italiana', serif;
  font-weight: 400;
  font-size: clamp(2rem, 5.5vw, 3.4rem);
  line-height: 1;
  margin: 0 0 clamp(1.6rem, 3.5vh, 2.4rem);
}
.notes { list-style: none; margin: 0; padding: 0; }
.note-line {
  display: grid;
  grid-template-columns: minmax(7rem, 11rem) 1fr;
  gap: clamp(1rem, 3vw, 2rem);
  padding: 1.05rem 0;
  border-top: 1px solid color-mix(in srgb, currentColor 16%, transparent);
  font-family: 'Bague', sans-serif;
}
.note-label {
  font-size: 0.7rem;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  opacity: 0.6;
  padding-top: 0.2rem;
}
.note-value { font-size: 0.98rem; line-height: 1.7; }

@media (max-width: 768px) {
  /* ⚠️ 9rem of bottom room: the floating popup dock is FIXED to the viewport
     bottom, and bottom padding only helps while the scene still fits 100dvh. */
  .day-scene { padding: 8vh 4vw 8.5rem; }
  .cal-head { gap: 0.6rem; margin-bottom: 1.2rem; }
  .cal-grid { column-gap: 0.1rem; }
  .cell { aspect-ratio: 1 / 0.96; }
  .dow { font-size: 0.5rem; letter-spacing: 0.1em; padding-bottom: 0.45rem; }
  .n { font-size: 1.22rem; }
  .scrawl { font-size: 0.7rem; top: 80%; }
  .detail { min-height: 14rem; margin-top: 1.6rem; }
  .card { gap: 1rem; }
  .card-day { font-size: 2.4rem; }
  .ev-time { display: block; min-width: 0; margin-bottom: 0.1rem; }
  .hint { top: auto; bottom: -1.5rem; inset-inline-end: auto; inset-inline-start: 0; }
  .note-line { grid-template-columns: 1fr; gap: 0.25rem; }
}

@media (prefers-reduced-motion: reduce) {
  .set,
  .marker-ring path,
  .scrawl,
  .swap-enter-active,
  .swap-leave-active { transition: none; }
}
</style>
