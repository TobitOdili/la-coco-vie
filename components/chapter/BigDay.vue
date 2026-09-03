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
              :class="{ open: openDay === cell, engaged: hoverDay === cell || pinned === cell }"
              :style="{ '--i': 3 + Math.floor(k / 7) }"
              :aria-expanded="openDay === cell"
              :aria-label="`${cell} ${monthName(s)} — ${markOf(s, cell).label}`"
              @mouseenter="enter(cell)"
              @mouseleave="leave()"
              @focus="enter(cell)"
              @blur="leave()"
              @click="tap(cell)"
            >
              <span class="n">{{ cell }}</span>
              <!-- ── written beside the date on hover ──
                   The calendar carries more than the ring on its own now: the
                   times and what they are, added in the same marker.
                   ⚠️ It extends toward the MIDDLE of the month (left from a
                   late-week column, right from an early one) so it can never run
                   off the edge of the grid, and `.marked` carries a z-index so the
                   annotation always paints over its neighbours rather than under
                   whichever cells happen to come later in the DOM. -->
              <span
                class="ann"
                :class="k % 7 >= 4 ? 'ann-left' : 'ann-right'"
                aria-hidden="true"
              >
                <span
                  v-for="(e, m) in markOf(s, cell).events"
                  :key="m"
                  class="ann-line"
                >{{ e.time }} · {{ e.name }}</span>
              </span>
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

        <!-- ── the day, written out ──
             ⚠️ EVERY card is rendered, stacked in ONE grid cell, and only the
             active one is shown. The panel is therefore always as tall as its
             tallest card and moving between the two dates cannot shift the page
             underneath. A reserved `min-height` could not do this: the white
             wedding has two events and the traditional has one, so whichever
             number was picked, the other day moved everything below it.
             ⚠️ Centred, and the big day-numeral is gone. It repeated the date
             that is already ringed a few centimetres above it, and a second set
             of large numerals competed with the calendar's own. -->
        <div class="detail">
          <div class="card-stack">
            <div
              v-for="(m, j) in s.marks || []"
              :key="m.day"
              class="card"
              :class="{ on: m.day === activeDay(s) }"
              :aria-hidden="m.day === activeDay(s) ? null : 'true'"
            >
              <div class="card-kicker">{{ longDate(s, m.day) }}</div>
              <h3 class="card-title">{{ m.label }}</h3>
              <span class="card-rule" aria-hidden="true" />
              <div class="evs" :class="{ pair: (m.events || []).length > 1 }">
                <div v-for="(e, k2) in m.events" :key="k2" class="ev">
                  <span class="ev-time">{{ e.time }}</span>
                  <span class="ev-name">{{ e.name }}</span>
                  <span class="ev-place">{{ e.venue }}<i>·</i>{{ e.address }}</span>
                  <a class="ev-map" :href="e.map || '#'" target="_blank" rel="noopener noreferrer">
                    open in maps ↗
                  </a>
                </div>
              </div>
              <div class="card-dress">{{ m.dress }}</div>
            </div>
          </div>
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
import { asset } from '~/utils/asset'

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
// The full date, spelled out, as the card's kicker. ⚠️ Derived from the month
// like everything else here, so it can never disagree with the grid above it.
const DOW_LONG = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
function longDate(s, day) {
  const y = yearOf(s)
  const m = monthOf(s)
  const dow = DOW_LONG[new Date(Date.UTC(y, m - 1, day)).getUTCDay()]
  return `${dow} ${day} ${MONTHS[m - 1]} ${y}`
}

// ── the easter egg: each date has its own sound ─────────────────────────────
// ⚠️ Entirely OPTIONAL and silent by default. A mark with no `sound`, or one whose
// file fails to load, plays nothing — the page must never depend on audio being
// present. Howler's mute is global, so the site's own sound toggle already
// governs these; there is no second switch.
const howls = {}
let audioReady = false

async function initAudio() {
  if (audioReady) return
  audioReady = true
  const marks = (cal.value?.marks || []).filter((m) => m.sound)
  if (!marks.length) return
  try {
    const { Howl } = await import('howler')
    for (const m of marks) {
      howls[m.day] = new Howl({
        src: [asset(m.sound)],
        volume: 0.5,
        html5: true,
        onloaderror: () => { howls[m.day] = null },
        onplayerror: () => { howls[m.day] = null },
      })
    }
  } catch { /* audio is a bonus; never let it break the page */ }
}

function hush(except) {
  for (const [d, h] of Object.entries(howls)) {
    if (!h || Number(d) === except) continue
    if (h.playing()) h.fade(h.volume(), 0, 220)
  }
}
function playFor(day) {
  const h = howls[day]
  hush(day)
  if (!h || h.playing()) return
  h.volume(0.5)
  h.play()
}
function stopFor(day) {
  const h = howls[day]
  if (h?.playing()) h.fade(h.volume(), 0, 320)
}

function enter(day) {
  hoverDay.value = day
  playFor(day)
}
function leave() {
  const d = hoverDay.value
  hoverDay.value = null
  if (d != null) stopFor(d)
}
// Touch has no hover: the tap both pins the card and triggers the sound.
function tap(day) {
  const was = pinned.value
  pinned.value = was === day ? null : day
  if (pinned.value === day) playFor(day)
  else stopFor(day)
}

// Latch on first enter, then never touch the DOM again — this page's job is to be
// read, so it holds still. (No rAF loop anywhere in this component.)
const sceneEls = []
const setSceneRef = (el) => { if (el) sceneEls.push(el) }
const inView = ref({})
let observer = null

onMounted(() => {
  initAudio()
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
onBeforeUnmount(() => {
  observer?.disconnect()
  for (const h of Object.values(howls)) h?.unload?.()
})
</script>

<style scoped>
.day-scene {
  position: relative;
  min-height: 100dvh;
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  /* ⚠️ `max(…, 7rem)` because the site nav is ~88px tall and 9vh is only 81px at
     900px — with the taller detail panel the content stops being centred (it no
     longer fits with room to spare) and starts at the padding edge instead, which
     put "October" underneath the nav. A vh-only top padding cannot guarantee that
     clearance at any viewport height. */
  padding: max(8vh, 7rem) 6vw 6vh;
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
  aspect-ratio: 1 / 0.55;
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
/* ⚠️ `z-index` so the hover annotation paints OVER its neighbours. Without it the
   note is only above cells that come EARLIER in the DOM, so it reads correctly
   extending left and is buried extending right. */
.marked { cursor: none; color: var(--marker); z-index: 5; }
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

/* ── written beside the date on hover ── */
.ann {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
  white-space: nowrap;
  font-family: 'Caveat', 'Bradley Hand', cursive;
  font-weight: 600;
  font-size: clamp(0.8rem, 1.5vw, 1.05rem);
  line-height: 1.25;
  color: var(--marker);
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.3s ease, transform 0.35s cubic-bezier(0.22, 1, 0.36, 1);
}
/* toward the middle of the month, so it can never run off the grid */
.ann-left { right: 100%; margin-inline-end: 0.7rem; text-align: end; align-items: flex-end; }
.ann-right { left: 100%; margin-inline-start: 0.7rem; text-align: start; align-items: flex-start; }
.ann-left { transform: translate(0.5rem, -50%); }
.ann-right { transform: translate(-0.5rem, -50%); }
/* ⚠️ `.engaged`, NOT `.open`. `openDay` falls back to the first wedding so the
   panel below is never empty — which meant the 23rd's annotation was written
   across the calendar permanently, from the moment the page loaded. The note
   should only appear when someone actually points at (or taps) the date. */
.marked:hover .ann,
.marked:focus-visible .ann,
.marked.engaged .ann { opacity: 0.9; transform: translate(0, -50%); }

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

/* ── the day, written out ── */
.detail {
  position: relative;
  margin-top: clamp(1.2rem, 2.6vh, 1.8rem);
  padding-top: clamp(1rem, 2vh, 1.5rem);
  border-top: 1px solid color-mix(in srgb, currentColor 22%, transparent);
}
/* ⚠️ One grid cell for every card, so the panel is always as tall as its tallest
   and swapping days cannot shift the page. See AUDIT #28. */
.card-stack { display: grid; }
.card {
  grid-area: 1 / 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  opacity: 0;
  transform: translateY(6px);
  transition: opacity 0.26s ease, transform 0.26s ease;
  pointer-events: none;
}
.card.on { opacity: 1; transform: none; pointer-events: auto; }

.card-kicker {
  font-family: 'Bague', sans-serif;
  font-size: 0.62rem;
  letter-spacing: 0.3em;
  text-transform: uppercase;
  opacity: 0.55;
}
.card-title {
  font-family: 'Italiana', serif;
  font-weight: 400;
  font-size: clamp(1.4rem, 3.2vw, 2.2rem);
  line-height: 1.1;
  margin: 0.45rem 0 0;
}
/* a short stroke in the marker's own colour, tying the panel to the ring above */
.card-rule {
  display: block;
  width: 2.4rem;
  height: 2px;
  margin: 0.75rem 0 1.05rem;
  border-radius: 2px;
  background: var(--marker);
  opacity: 0.75;
}

/* Two events sit SIDE BY SIDE with a hairline between them, which is what makes
   the white wedding read as one day with two parts rather than as a longer list. */
.evs { display: flex; flex-wrap: wrap; justify-content: center; }
.ev {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.22rem;
  padding: 0 clamp(1.1rem, 3.5vw, 2.4rem);
  font-family: 'Bague', sans-serif;
}
.evs.pair .ev + .ev {
  border-inline-start: 1px solid color-mix(in srgb, currentColor 18%, transparent);
}
.ev-time {
  font-size: 0.62rem;
  letter-spacing: 0.26em;
  text-transform: uppercase;
  opacity: 0.6;
}
.ev-name { font-family: 'Italiana', serif; font-size: clamp(1rem, 2.1vw, 1.3rem); }
.ev-place {
  font-size: 0.8rem;
  line-height: 1.6;
  opacity: 0.66;
  max-width: 15rem;
}
.ev-place i { font-style: normal; opacity: 0.5; margin: 0 0.45em; }
.ev-map {
  margin-top: 0.15rem;
  font-size: 0.62rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--marker);
  text-decoration: none;
  border-bottom: 1px solid color-mix(in srgb, var(--marker) 45%, transparent);
  cursor: none;
}
.card-dress {
  font-family: 'Bague', sans-serif;
  font-size: 0.66rem;
  letter-spacing: 0.24em;
  text-transform: uppercase;
  opacity: 0.5;
  margin-top: 1.15rem;
}

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
  /* ⚠️ Same nav-clearance problem as the desktop rule above, and this media query
     was quietly overriding the fix: 8vh is 67px on a 844px phone and the nav
     bottom is 72. */
  .day-scene { padding: max(8vh, 5.5rem) 4vw 8.5rem; }
  .cal-head { gap: 0.6rem; margin-bottom: 1.2rem; }
  .cal-grid { column-gap: 0.1rem; }
  .cell { aspect-ratio: 1 / 0.96; }
  .dow { font-size: 0.5rem; letter-spacing: 0.1em; padding-bottom: 0.45rem; }
  .n { font-size: 1.22rem; }
  .scrawl { font-size: 0.7rem; top: 80%; }
  .detail { margin-top: 1.6rem; }
  /* Two events stack on a phone — side by side they were ~7rem each. */
  .evs.pair { flex-direction: column; gap: 1.2rem; }
  .evs.pair .ev + .ev {
    border-inline-start: 0;
    border-top: 1px solid color-mix(in srgb, currentColor 18%, transparent);
    padding-top: 1.2rem;
  }
  .ev { padding: 0 0.5rem; }
  /* The annotation would cover half the month at phone widths. */
  .ann { display: none; }
  .note-line { grid-template-columns: 1fr; gap: 0.25rem; }
}

@media (prefers-reduced-motion: reduce) {
  .set,
  .marker-ring path,
  .scrawl,
  .ann,
  .card { transition: none; }
}
</style>
