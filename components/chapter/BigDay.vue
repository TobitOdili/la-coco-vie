<template>
  <div ref="rootEl" class="big-day">
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
      <div v-if="s.kind === 'calendar'" class="cal-wrap" :class="{ landed }">
        <!-- ⚠️ A DECK, not a page. The visitor's OWN current month is on top and the
             months flip up and over — bound at the top edge, the way a wall
             calendar is — until October is showing. Only the last page carries the
             marks, so nothing is interactive until you have arrived. The pages are
             grid-stacked so the deck is as tall as its tallest month and the page
             cannot jump as a shorter month is revealed. -->
        <div class="cal-deck" :style="{ '--flip': flipMs + 'ms' }">
          <div
            v-for="(pg, pi) in pages"
            :key="`${pg.y}-${pg.m}`"
            class="cal-page"
            :class="{ flipped: pi < flipped, 'is-target': pi === pages.length - 1 }"
            :style="{ zIndex: pages.length - pi }"
            :aria-hidden="pi !== pages.length - 1 || null"
          >
            <header class="cal-head">
              <h2 class="month">{{ MONTHS[pg.m - 1] }}</h2>
              <div class="year">{{ pg.y }}</div>
            </header>

            <div class="cal-grid">
              <div v-for="d in DOW" :key="`h-${d}`" class="dow">{{ d }}</div>

              <template v-for="(cell, k) in grid(pg.y, pg.m)" :key="k">
                <div v-if="!cell" class="cell pad" aria-hidden="true" />

                <!-- a ringed day: the interactive one -->
                <button
                  v-else-if="pi === pages.length - 1 && markOf(s, cell)"
                  type="button"
                  class="cell day marked"
                  :class="{ open: openDay === cell }"
                  :aria-expanded="openDay === cell"
                  :aria-label="`${cell} ${MONTHS[pg.m - 1]} — ${markOf(s, cell).label}`"
                  @mouseenter="enter(cell)"
                  @mouseleave="leave()"
                  @focus="enter(cell)"
                  @blur="leave()"
                  @click="tap(cell)"
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
                      :style="{ '--ring-delay': (0.15 + markIndex(s, cell) * 0.45) + 's' }"
                    />
                  </svg>
                  <span
                    class="scrawl"
                    :style="{
                      '--rot': (markOf(s, cell).rot || -6) + 'deg',
                      '--scrawl-delay': (0.75 + markIndex(s, cell) * 0.45) + 's',
                    }"
                  >
                    {{ markOf(s, cell).scrawl }}
                  </span>
                </button>

                <div v-else class="cell day">
                  <span class="n">{{ cell }}</span>
                </div>
              </template>
            </div>
          </div>
        </div>

        <!-- The detail for whichever ringed day is active.
             ⚠️ EVERY card is rendered, stacked in ONE grid cell, and only the
             active one is shown. The panel is therefore always as tall as its
             tallest card, so moving between the two dates cannot shift the page
             underneath — a reserved `min-height` could not do this, because the
             two days have different numbers of events and the taller one always
             overflowed whatever number was picked. -->
        <div class="detail" :class="{ ready: landed }">
          <div class="card-stack">
            <div
              v-for="(m, j) in s.marks || []"
              :key="m.day"
              class="card"
              :class="{ on: m.day === activeDay(s) }"
              :aria-hidden="m.day === activeDay(s) ? null : 'true'"
            >
              <div class="card-date">
                <span class="card-day">{{ m.day }}</span>
                <span class="card-md">{{ shortDate(s, m.day) }}</span>
              </div>
              <div class="card-body">
                <div class="card-title">{{ m.label }}</div>
                <div v-for="(e, k) in m.events" :key="k" class="ev">
                  <span class="ev-time">{{ e.time }}</span>
                  <span class="ev-name">{{ e.name }}</span>
                  <span class="ev-place">{{ e.venue }} · {{ e.address }}</span>
                  <a class="ev-map" :href="e.map || '#'" target="_blank" rel="noopener noreferrer">
                    open in maps ↗
                  </a>
                </div>
                <div class="card-dress">{{ m.dress }}</div>
                <div class="card-acts">
                  <button type="button" class="act" @click="download(s, [m])">
                    add to calendar ↓
                  </button>
                  <button
                    v-if="(s.marks || []).length > 1"
                    type="button"
                    class="act subtle"
                    @click="download(s, s.marks)"
                  >
                    both days ↓
                  </button>
                </div>
              </div>
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

const cal = computed(() => props.sections.find((s) => s.kind === 'calendar'))
const yearOf = (s) => Number(s.monthISO.split('-')[0])
const monthOf = (s) => Number(s.monthISO.split('-')[1])

// ── the flip ────────────────────────────────────────────────────────────────
// The deck opens on the visitor's OWN current month and flips forward to the
// wedding month. ⚠️ Capped: a visitor far enough out would otherwise sit through
// a dozen flips. And if they arrive in or after the month, there is nothing to
// flip through — the calendar is simply already open at October.
const MAX_PAGES = 9
// ⚠️ Budget the WHOLE riffle, not each flip. One flip should be a deliberate turn
// and nine should be a riffle, which only works if the count divides a fixed
// total rather than multiplying a fixed per-flip duration.
const RIFFLE_MS = 1250
const FLIP_MIN = 150
const FLIP_MAX = 700

const pages = computed(() => {
  const s = cal.value
  if (!s) return []
  const ty = yearOf(s)
  const tm = monthOf(s)
  const target = ty * 12 + (tm - 1)
  const now = new Date()
  let from = now.getFullYear() * 12 + now.getMonth()
  if (from >= target) from = target
  if (target - from > MAX_PAGES - 1) from = target - (MAX_PAGES - 1)
  const out = []
  for (let i = from; i <= target; i += 1) out.push({ y: Math.floor(i / 12), m: (i % 12) + 1 })
  return out
})

const flipMs = computed(() => {
  const n = Math.max(0, pages.value.length - 1)
  if (!n) return 0
  return Math.round(Math.min(FLIP_MAX, Math.max(FLIP_MIN, RIFFLE_MS / n)))
})

const flipped = ref(0)   // how many pages have turned
const landed = ref(false) // October is showing: ring the dates
let timers = []

function runFlip() {
  const n = pages.value.length - 1
  const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
  if (n <= 0 || reduce) {
    flipped.value = Math.max(0, n)
    landed.value = true
    return
  }
  for (let i = 1; i <= n; i += 1) {
    timers.push(setTimeout(() => { flipped.value = i }, 260 + (i - 1) * flipMs.value))
  }
  // The rings are drawn once the last page has actually settled, not when its
  // flip was scheduled — otherwise they ink in behind a page still turning.
  timers.push(setTimeout(() => { landed.value = true }, 260 + n * flipMs.value + 140))
}

// DERIVED from the month, so the weekday alignment can never drift out of sync
// with the dates: leading blanks = the 1st's weekday, then the days themselves.
function grid(y, m) {
  const pad = new Date(Date.UTC(y, m - 1, 1)).getUTCDay()
  const days = new Date(Date.UTC(y, m, 0)).getUTCDate()
  const cells = Array(pad).fill(null)
  for (let d = 1; d <= days; d += 1) cells.push(d)
  while (cells.length % 7 !== 0) cells.push(null)
  return cells
}

// ── which day is showing ────────────────────────────────────────────────────
const hoverDay = ref(null)
const pinned = ref(null)

// With nothing hovered or pinned the FIRST wedding shows: an empty panel would be
// a hole in the page, and the most useful default state is real detail.
const firstMarkDay = computed(() => {
  const marks = cal.value?.marks || []
  return marks.length ? Math.min(...marks.map((m) => m.day)) : null
})
const openDay = computed(() => hoverDay.value ?? pinned.value ?? firstMarkDay.value)

const markOf = (s, day) => (s.marks || []).find((m) => m.day === day) || null
const markIndex = (s, day) => (s.marks || []).findIndex((m) => m.day === day)
const activeDay = (s) => (markOf(s, openDay.value) ? openDay.value : firstMarkDay.value)
function shortDate(s, day) {
  const y = yearOf(s)
  const m = monthOf(s)
  const dow = DOW[new Date(Date.UTC(y, m - 1, day)).getUTCDay()]
  return `${dow} · ${String(day).padStart(2, '0')}.${String(m).padStart(2, '0')}.${String(y).slice(2)}`
}

// ── the easter egg: each date has its own sound ─────────────────────────────
// ⚠️ Entirely OPTIONAL and silent by default. A mark with no `sound`, or one whose
// file fails to load, simply plays nothing — the page must never depend on audio
// being present. Howler's mute is global, so the site's own sound toggle already
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
function play(day) {
  const h = howls[day]
  hush(day)
  if (!h || h.playing()) return
  h.volume(0.5)
  h.play()
}
function stop(day) {
  const h = howls[day]
  if (h?.playing()) h.fade(h.volume(), 0, 320)
}

function enter(day) {
  hoverDay.value = day
  play(day)
}
function leave() {
  const d = hoverDay.value
  hoverDay.value = null
  if (d != null) stop(d)
}
// Touch has no hover: the tap both pins the card and triggers the sound.
function tap(day) {
  const was = pinned.value
  pinned.value = was === day ? null : day
  if (pinned.value === day) play(day)
  else stop(day)
}

// ── add to calendar ─────────────────────────────────────────────────────────
// Built in the browser and handed over as a Blob — no service to hook up, no
// third party, and it works offline. ⚠️ These are ALL-DAY events on purpose: the
// times are still placeholders, and an event at a made-up hour is worse than one
// with no hour at all. When real times land, give each `events[]` entry an ISO
// `start`/`end` and emit timed VEVENTs instead.
const pad2 = (n) => String(n).padStart(2, '0')
function icsDate(y, m, d) { return `${y}${pad2(m)}${pad2(d)}` }

function buildIcs(s, marks) {
  const y = yearOf(s)
  const m = monthOf(s)
  const stamp = new Date().toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '')
  const out = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//la coco vie//wedding//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
  ]
  for (const mk of marks) {
    const next = new Date(Date.UTC(y, m - 1, mk.day + 1))
    const where = (mk.events || [])
      .map((e) => [e.venue, e.address].filter(Boolean).join(', '))
      .filter(Boolean)
      .join(' / ')
    const desc = (mk.events || [])
      .map((e) => [e.time, e.name, e.venue].filter(Boolean).join(' · '))
      .join('\\n')
    out.push(
      'BEGIN:VEVENT',
      `UID:${icsDate(y, m, mk.day)}-${mk.day}@lacocovie`,
      `DTSTAMP:${stamp}`,
      `DTSTART;VALUE=DATE:${icsDate(y, m, mk.day)}`,
      `DTEND;VALUE=DATE:${icsDate(next.getUTCFullYear(), next.getUTCMonth() + 1, next.getUTCDate())}`,
      `SUMMARY:Covenant & Uvie — ${mk.label}`,
      where ? `LOCATION:${where}` : null,
      desc ? `DESCRIPTION:${desc}` : null,
      'END:VEVENT'
    )
  }
  out.push('END:VCALENDAR')
  // RFC 5545 wants CRLF, and Outlook is the one that actually cares.
  // ⚠️ It also caps a line at 75 OCTETS and requires longer ones to be folded onto
  // continuation lines starting with a space. Nothing here exceeds that while the
  // venues are `[placeholder]`, which is exactly why it would have shipped broken:
  // the first real address is what would push LOCATION over and make the file
  // reject in strict clients. Folded now, while it is cheap.
  return out.filter(Boolean).map(fold).join('\r\n')
}

function fold(line) {
  const bytes = new TextEncoder().encode(line)
  if (bytes.length <= 75) return line
  const parts = []
  let cur = ''
  let len = 0
  for (const ch of line) {
    const n = new TextEncoder().encode(ch).length
    // 74 on continuation lines: the leading space counts toward the 75.
    if (len + n > (parts.length ? 74 : 75)) { parts.push(cur); cur = ''; len = 0 }
    cur += ch
    len += n
  }
  if (cur) parts.push(cur)
  return parts.map((p, i) => (i ? ` ${p}` : p)).join('\r\n')
}

function download(s, marks) {
  const blob = new Blob([buildIcs(s, marks)], { type: 'text/calendar;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = marks.length > 1 ? 'covenant-and-uvie.ics' : `covenant-and-uvie-${marks[0].day}.ics`
  document.body.appendChild(a)
  a.click()
  a.remove()
  setTimeout(() => URL.revokeObjectURL(url), 1000)
}

// ── arrival ─────────────────────────────────────────────────────────────────
// Latch on first enter, then hold still — this page's job is to be read.
const sceneEls = []
const setSceneRef = (el) => { if (el) sceneEls.push(el) }
const inView = ref({})
// ⚠️ NOT a template ref. `.cal-deck` lives inside the sections `v-for`, and a ref
// used inside v-for is collected as an ARRAY — passing that array to
// `observe()` throws inside onMounted, which kills the whole component mount and
// renders NOTHING, silently. Third time this codebase has paid for that lesson
// (rule #2, AUDIT #18). Query the DOM off the root instead.
const rootEl = ref(null)
let observer = null
let deckObs = null

onMounted(() => {
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

  // ⚠️ The flip gets its OWN observer, on the DECK, and it is deliberately not a
  // threshold. The section is 1008px tall and starts a full screen below the
  // hero, so `threshold: 0.12` on the section fires while the calendar itself is
  // still ~400px BELOW the fold — the whole riffle would play where nobody could
  // see it, which is exactly how In Frames' nudge went missing three times.
  //
  // `threshold: 0` plus a rootMargin band is the formulation that cannot fail: it
  // fires when the deck overlaps the middle of the viewport, and "any overlap" is
  // reachable no matter how tall the element or how short the screen — whereas any
  // threshold above 0 is unreachable once the element outgrows the viewport.
  const deck = rootEl.value?.querySelector('.cal-deck')
  if (deck) {
    deckObs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue
          deckObs.disconnect()
          runFlip()
          initAudio()
        }
      },
      { rootMargin: '-18% 0px -28% 0px', threshold: 0 }
    )
    deckObs.observe(deck)
  }
})
onBeforeUnmount(() => {
  observer?.disconnect()
  deckObs?.disconnect()
  timers.forEach(clearTimeout)
  timers = []
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

/* ⚠️ The deck is a GRID STACK: every month page sits in the same cell, so the deck
   is as tall as the tallest month in the run and revealing a 5-row month behind a
   6-row one cannot shorten the page under the reader. `perspective` lives here —
   on the parent — because a page cannot give itself one. */
.cal-deck {
  display: grid;
  perspective: 1600px;
  perspective-origin: 50% 0%;
}
.cal-page {
  grid-area: 1 / 1;
  /* Bound at the top edge, like the wall calendar this is imitating. */
  transform-origin: 50% 0%;
  backface-visibility: hidden;
  /* Opaque, or the pages beneath show through the one on top. */
  background: #F1F3EC;
  transition:
    transform var(--flip, 400ms) cubic-bezier(0.45, 0, 0.7, 0.35),
    opacity var(--flip, 400ms) ease-in;
}
.cal-page.flipped {
  transform: rotateX(-104deg);
  opacity: 0;
  pointer-events: none;
}
/* Only the month you have arrived at is interactive. */
.cal-page:not(.is-target) { pointer-events: none; }

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
/* Drawn once the deck has LANDED on the wedding month — not on reveal, or the
   dates ink in behind a page that is still turning. Dasharray is the path's own
   length, rounded up; each ring waits its turn via --ring-delay. */
.marker-ring path {
  stroke-dasharray: 430;
  stroke-dashoffset: 430;
  transition: stroke-dashoffset 0.95s ease;
}
.landed .marked .marker-ring path {
  stroke-dashoffset: 0;
  transition-delay: var(--ring-delay, 0.15s);
}

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
  transition: opacity 0.5s ease;
  transition-delay: var(--scrawl-delay, 0.75s);
  pointer-events: none;
}
.landed .scrawl { opacity: 0.92; }

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
  opacity: 0;
  transition: opacity 0.5s ease 0.25s;
}
.detail.ready { opacity: 1; }

/* ⚠️ THE FIX FOR THE LAYOUT SHIFT. Every card occupies the SAME grid cell, so the
   stack is always as tall as the tallest card and moving between the two dates
   changes nothing about the page's height. The old version rendered one card at a
   time under a reserved `min-height`, which can only ever be right for one of
   them — the white wedding has two events and the traditional has one, so
   whichever number was chosen, the other day shifted everything below it. */
.card-stack { display: grid; }
.card {
  grid-area: 1 / 1;
  display: flex;
  gap: clamp(1.2rem, 4vw, 2.6rem);
  align-items: flex-start;
  opacity: 0;
  transform: translateY(5px);
  transition: opacity 0.24s ease, transform 0.24s ease;
  pointer-events: none;
}
.card.on { opacity: 1; transform: none; pointer-events: auto; }
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
/* The two calendar actions sit with the maps links, which is where someone
   already is when they are working out whether they can come. */
.card-acts { display: flex; flex-wrap: wrap; gap: 1rem; margin-top: 0.9rem; }
.act {
  appearance: none;
  -webkit-appearance: none;
  border: 0;
  background: none;
  padding: 0;
  font-family: 'Bague', sans-serif;
  font-size: 0.72rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--marker);
  border-bottom: 1px solid color-mix(in srgb, var(--marker) 45%, transparent);
  cursor: none;
  transition: border-color 0.25s ease, opacity 0.25s ease;
}
.act:hover, .act:focus-visible { outline: none; border-bottom-color: var(--marker); }
.act.subtle { opacity: 0.62; }
.act.subtle:hover { opacity: 1; }

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
  .detail { margin-top: 1.6rem; }
  .card { gap: 1rem; }
  .card-day { font-size: 2.4rem; }
  .ev-time { display: block; min-width: 0; margin-bottom: 0.1rem; }
  .note-line { grid-template-columns: 1fr; gap: 0.25rem; }
}

@media (prefers-reduced-motion: reduce) {
  .set,
  .cal-page,
  .marker-ring path,
  .scrawl,
  .detail,
  .card { transition: none; }
  /* runFlip() also skips straight to the target month when this is set. */
}
</style>
