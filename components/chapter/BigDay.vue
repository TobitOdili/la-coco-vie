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
              <!-- ── the leader line, and the note out in the margin ──
                   A line is drawn from the date out to the side of the calendar
                   and the note is written at the end of it, clear of the grid,
                   rather than over the neighbouring dates.
                   ⚠️ `--span` is how many columns lie between this date and the
                   edge it runs toward, so the line's length is expressed in the
                   cell's own width and stays correct at every viewport — the
                   percentages resolve against the cell, which is the containing
                   block. It runs toward the NEARER edge, so it never crosses the
                   whole month. -->
              <span
                class="lead"
                :class="k % 7 >= 3 ? 'to-right' : 'to-left'"
                :style="{ '--span': k % 7 >= 3 ? 6 - (k % 7) : k % 7 }"
                aria-hidden="true"
              >
                <svg class="lead-line" viewBox="0 0 100 32" preserveAspectRatio="none">
                  <path d="M 0 30 C 22 29, 44 12, 100 4" />
                </svg>
              </span>
              <span
                class="side-note"
                :class="k % 7 >= 3 ? 'to-right' : 'to-left'"
                :style="{ '--span': k % 7 >= 3 ? 6 - (k % 7) : k % 7 }"
                aria-hidden="true"
              >
                <span
                  v-for="(e, m) in markOf(s, cell).events"
                  :key="m"
                  class="side-line"
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

        <!-- ── both days, side by side ──
             ⚠️ Neither card swaps any more. They used to alternate on hover,
             which is what produced the layout shift in the first place and meant
             a guest could only ever read one day at a time — for two weddings
             500km apart, seeing them together is the whole point. Hovering a
             ringed date now only EMPHASISES its card (and draws the line up on
             the calendar); nothing appears or disappears, so there is nothing
             left that could shift. -->
        <div class="detail">
          <div class="cards">
            <div
              v-for="(m, j) in s.marks || []"
              :key="m.day"
              class="card"
              :class="{ lit: hoverDay === m.day || pinned === m.day }"
            >
              <div class="card-kicker">{{ longDate(s, m.day) }}</div>
              <h3 class="card-title">{{ m.label }}</h3>
              <span class="card-rule" aria-hidden="true" />
              <div class="evs">
                <div v-for="(e, k2) in m.events" :key="k2" class="ev">
                  <span class="ev-time">{{ e.time }}</span>
                  <span class="ev-name">{{ e.name }}</span>
                  <span class="ev-place">{{ e.venue }}<i>·</i>{{ e.address }}</span>
                </div>
              </div>
              <div class="card-dress">{{ m.dress }}</div>
              <div class="card-acts">
                <button type="button" class="act" @click="download(s, [m])">
                  Add to calendar
                </button>
                <a
                  class="act"
                  :href="mapsUrl(m.place)"
                  target="_blank"
                  rel="noopener noreferrer"
                >Open in maps ↗</a>
              </div>
            </div>
          </div>
          <div v-if="(s.marks || []).length > 1" class="detail-foot">
            <button type="button" class="act both" @click="download(s, s.marks)">
              Add both days to calendar
            </button>
          </div>
        </div>
      </div>

      <!-- ── getting there ──
           Two venues 500km apart, each on its own map, with a directions link
           that uses the visitor's own location. ⚠️ The embed needs no API key,
           and the iframe is TINTED to the chapter's palette rather than left as
           stock Google blue-and-white — see `.map-frame`. -->
      <div v-else class="map-wrap">
        <h2 class="map-title set" :style="{ '--i': 0 }">{{ s.title }}</h2>
        <p v-if="s.sub" class="map-sub set" :style="{ '--i': 1 }">{{ s.sub }}</p>

        <div class="maps">
          <div
            v-for="(pl, j) in s.places || []"
            :key="j"
            class="place set"
            :style="{ '--i': 2 + j }"
          >
            <div class="map-frame">
              <iframe
                :src="embedUrl(pl.place)"
                :title="`Map of ${pl.place}`"
                loading="lazy"
                referrerpolicy="no-referrer-when-downgrade"
                allowfullscreen
              />
            </div>
            <div class="place-meta">
              <div class="place-when">{{ pl.when }}</div>
              <h3 class="place-label">{{ pl.label }}</h3>
              <div class="place-where">{{ pl.place }}</div>
              <div class="place-venue">{{ pl.venue }}</div>
              <div class="place-acts">
                <a class="act" :href="dirUrl(pl.place)" target="_blank" rel="noopener noreferrer">
                  Get directions ↗
                </a>
                <a class="act subtle" :href="mapsUrl(pl.place)" target="_blank" rel="noopener noreferrer">
                  Open in maps ↗
                </a>
              </div>
            </div>
          </div>
        </div>
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

// ── maps ────────────────────────────────────────────────────────────────────
// All three URLs are derived from the ONE `place` string on the data, so a pin, a
// directions route and a link can never point at three different things.
// ⚠️ No API key anywhere. The embed uses the keyless `output=embed` form, and
// directions use the documented Maps URLs scheme, which resolves the visitor's
// own origin for them. If a keyed Embed API is ever wanted (for a styled map
// rather than a CSS-tinted one), only `embedUrl` has to change.
const q = (place) => encodeURIComponent(place || '')
const embedUrl = (place) => `https://maps.google.com/maps?q=${q(place)}&z=11&hl=en&output=embed`
const mapsUrl = (place) => `https://www.google.com/maps/search/?api=1&query=${q(place)}`
const dirUrl = (place) => `https://www.google.com/maps/dir/?api=1&destination=${q(place)}`

// ── add to calendar ────────────────────────────────────────────────────────
// Built in the browser and handed over as a Blob — no service to hook up, no
// third party, and it works offline. ⚠️ ALL-DAY events on purpose: the times are
// still placeholders, and an event at a made-up hour is worse than one with no
// hour at all. When real times land, give each `events[]` entry an ISO
// `start`/`end` and emit timed VEVENTs instead.
const pad2 = (n) => String(n).padStart(2, '0')
const icsDate = (y, m, d) => `${y}${pad2(m)}${pad2(d)}`

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
      mk.place ? `LOCATION:${mk.place}` : null,
      desc ? `DESCRIPTION:${desc}` : null,
      'END:VEVENT'
    )
  }
  out.push('END:VCALENDAR')
  return out.filter(Boolean).map(fold).join('\r\n')
}

// ⚠️ RFC 5545 caps a line at 75 OCTETS and folds longer ones onto continuation
// lines starting with a space. Nothing here exceeds that while the venues are
// `[placeholder]`, which is precisely why it would ship broken: the first real
// address is what pushes LOCATION over and makes the file reject in strict
// clients. Folded now, while it is cheap.
function fold(line) {
  if (new TextEncoder().encode(line).length <= 75) return line
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
  return parts.map((pp, i) => (i ? ` ${pp}` : pp)).join('\r\n')
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
  margin-bottom: clamp(0.9rem, 2.2vh, 1.5rem);
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
  aspect-ratio: 1 / 0.5;
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

/* ── the leader line, and the note in the margin ── */
/* The line's length is `--span` cell-widths plus the column gaps it crosses.
   Percentages here resolve against the CELL, which is the containing block, so
   this stays right at every viewport without measuring anything. */
/* ⚠️ OFF below 1280px, and the number is measured rather than chosen: the note is
   8.5rem wide with a 1.1rem lead-in, so a symmetric margin on both sides needs
   `928px (the grid) + 2 × 154px = 1236px` of viewport before the note can sit
   outside the calendar at all. Below that it ran off the right edge — 29px over at
   1200, 103px at 1024. Narrowing the note enough to fit 1024 would have meant
   three wrapped lines, and widening the margin would have meant shrinking the
   calendar itself, which is the part that works. So it is a large-screen
   enhancement: the rings, the scrawls and the programme below carry everything on
   their own. */
.lead,
.side-note { display: none; }

@media (min-width: 1280px) {
.lead,
.side-note {
  display: block;
  position: absolute;
  top: 50%;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.28s ease;
}
/* ⚠️ The line RISES on its way out, ending `--rise` above the row's centre line.
   Drawn flat at the cell's mid-height it ran straight through the numerals it
   passed — the 24 looked struck through, which on a calendar reads as cancelled.
   Someone annotating a real month draws around the numbers, not across them. */
.lead {
  --rise: 26px;
  height: calc(var(--rise) + 4px);
  top: calc(50% - var(--rise) - 4px);
  width: calc(var(--span, 1) * 100% + var(--span, 1) * 0.4rem + 0.7rem);
  transform: none;
}
.lead.to-right { left: 100%; }
.lead.to-left { right: 100%; }
.lead-line { display: block; width: 100%; height: 100%; overflow: visible; }
.lead-line path {
  fill: none;
  stroke: var(--marker);
  /* ⚠️ The viewBox is squashed by `preserveAspectRatio: none`, which would scale
     the stroke with it; this keeps it an even hairline however long the run is. */
  vector-effect: non-scaling-stroke;
  stroke-width: 1.5;
  stroke-linecap: round;
}
/* ⚠️ A CLIP WIPE, not a dash reveal — and this is the bug the user spotted as
   "the 29th one looks broken". It WAS broken: `pathLength="1"` +
   `stroke-dasharray: 1` + `vector-effect: non-scaling-stroke` +
   `preserveAspectRatio="none"` do not agree with one another. `pathLength`
   normalises the dash maths in USER space while non-scaling-stroke applies the
   pattern in SCREEN space, and under a non-uniform stretch the ratio between the
   two varies along the path — so the single "full length" dash ran out early and
   the following gap became visible mid-line. It got worse the longer the run,
   which is exactly why the 23rd (145px, one column) looked right and the 29th
   (278px, two columns) came out in two pieces. A clip-path wipe is immune to all
   of it: it reveals rendered pixels and knows nothing about path length. */
.lead {
  clip-path: inset(-3px 100% -3px 0);
  transition: opacity 0.28s ease, clip-path 0.5s ease;
}
.marked:hover .lead,
.marked:focus-visible .lead,
.marked.engaged .lead { clip-path: inset(-3px 0 -3px 0); }

.side-note {
  /* sits on the END of the line, which is above the row, not on it */
  --rise: 26px;
  top: calc(50% - var(--rise));
  display: flex;
  flex-direction: column;
  gap: 0.1rem;
  width: 8.5rem;
  transform: translateY(-50%);
  font-family: 'Caveat', 'Bradley Hand', cursive;
  font-weight: 600;
  font-size: clamp(0.82rem, 1.4vw, 1.02rem);
  line-height: 1.2;
  color: var(--marker);
}
.side-note.to-right {
  left: calc(100% + var(--span, 1) * 100% + var(--span, 1) * 0.4rem + 1.1rem);
}
.side-note.to-left {
  right: calc(100% + var(--span, 1) * 100% + var(--span, 1) * 0.4rem + 1.1rem);
  text-align: end;
}

.marked:hover .lead,
.marked:focus-visible .lead,
.marked.engaged .lead,
.marked:hover .side-note,
.marked:focus-visible .side-note,
.marked.engaged .side-note { opacity: 0.92; }
}   /* end @media (min-width: 1280px) */

/* ⚠️ Keyed off `.engaged`, NOT `.open`. `openDay` falls back to the first wedding
   so the panel below is never empty, which had the 23rd's note drawn across the
   calendar permanently from page load. The note belongs to pointing, not to
   selection. */

/* hover / focus / open — the ring inks in and the day gets a faint wash */
.marked:hover,
.marked:focus-visible { outline: none; }
.marked:hover .ring,
.marked:focus-visible .ring,
.marked.open .marker-ring { opacity: 1; }
/* ⚠️ NO background wash. A filled circle behind the date was the one piece of
   UI-looking chrome on a page that is otherwise a printed month with marker on
   it — it read as a selected state in an app. The ring inking in is the whole
   feedback, and it is the page's own language. */

/* ── the day, written out ── */
.detail {
  position: relative;
  margin-top: clamp(1.2rem, 2.6vh, 1.8rem);
  padding-top: clamp(1rem, 2vh, 1.5rem);
  border-top: 1px solid color-mix(in srgb, currentColor 22%, transparent);
}
/* ⚠️ Both days at once, in two columns with a hairline between them. Nothing is
   hidden and nothing swaps, which is the structural end of AUDIT #28: there is no
   longer anything that could shift, because nothing appears or disappears. The
   stacked-single-card version fixed the shift but still only let a guest read one
   of two weddings 500km apart at a time. */
.cards {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: clamp(1.5rem, 4vw, 3rem);
}
.card {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  opacity: 0.72;
  transition: opacity 0.3s ease;
}
.cards .card + .card {
  border-inline-start: 1px solid color-mix(in srgb, currentColor 16%, transparent);
  padding-inline-start: clamp(1.5rem, 4vw, 3rem);
  margin-inline-start: calc(clamp(1.5rem, 4vw, 3rem) * -1);
}
/* Hovering a ringed date brings its card forward; it never hides the other. */
.card.lit { opacity: 1; }
.cards:not(:hover) .card { opacity: 0.88; }

.detail-foot { margin-top: clamp(0.9rem, 1.8vh, 1.2rem); text-align: center; }

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
  margin: 0.6rem 0 0.85rem;
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
  margin-top: 0.9rem;
}

.card-acts {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.35rem 1.1rem;
  margin-top: 0.8rem;
}
.act {
  appearance: none;
  -webkit-appearance: none;
  border: 0;
  background: none;
  padding: 0;
  font-family: 'Bague', sans-serif;
  font-size: 0.64rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--marker);
  text-decoration: none;
  border-bottom: 1px solid color-mix(in srgb, var(--marker) 42%, transparent);
  cursor: none;
  transition: border-color 0.25s ease, opacity 0.25s ease;
}
.act:hover, .act:focus-visible { outline: none; border-bottom-color: var(--marker); }
.act.subtle { opacity: 0.6; }
.act.subtle:hover { opacity: 1; }
.act.both { letter-spacing: 0.2em; }

/* ── getting there ── */
.map-wrap { width: 100%; max-width: 64rem; }
.map-title {
  font-family: 'Italiana', serif;
  font-weight: 400;
  font-size: clamp(2rem, 5.5vw, 3.4rem);
  line-height: 1;
  margin: 0 0 0.7rem;
  text-align: center;
}
.map-sub {
  font-family: 'Bague', sans-serif;
  font-size: 0.86rem;
  line-height: 1.6;
  opacity: 0.6;
  text-align: center;
  max-width: 34rem;
  margin: 0 auto clamp(2rem, 4.5vh, 3rem);
}

.maps {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: clamp(1.5rem, 4vw, 3rem);
}
.place { display: flex; flex-direction: column; }

/* ⚠️ The map is TINTED rather than styled. A keyless embed cannot be restyled —
   that needs the JS Maps API and an API key — so the iframe is filtered into the
   chapter's own sage/olive family instead: desaturate, warm it, rotate the
   remaining hue off Google's blue, and lift it slightly so it sits on the page's
   near-white rather than punching a bright hole in it. It is the only way to make
   a third-party map belong to a page like this without a key. */
.map-frame {
  position: relative;
  aspect-ratio: 4 / 3;
  overflow: hidden;
  background: #E3E7DA;
  box-shadow: inset 0 0 0 1px color-mix(in srgb, currentColor 20%, transparent);
}
.map-frame iframe {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  border: 0;
  display: block;
  filter: grayscale(0.82) sepia(0.32) hue-rotate(26deg) saturate(0.8) contrast(0.94) brightness(1.05);
  transition: filter 0.5s ease;
}
.place:hover .map-frame iframe { filter: grayscale(0.34) sepia(0.16) hue-rotate(20deg) saturate(1) contrast(1) brightness(1.02); }

.place-meta { padding-top: 1.15rem; text-align: center; }
.place-when {
  font-family: 'Bague', sans-serif;
  font-size: 0.6rem;
  letter-spacing: 0.3em;
  text-transform: uppercase;
  opacity: 0.55;
}
.place-label {
  font-family: 'Italiana', serif;
  font-weight: 400;
  font-size: clamp(1.15rem, 2.4vw, 1.6rem);
  line-height: 1.15;
  margin: 0.4rem 0 0.55rem;
}
.place-where {
  font-family: 'Bague', sans-serif;
  font-size: 0.9rem;
  line-height: 1.5;
}
.place-venue {
  font-family: 'Bague', sans-serif;
  font-size: 0.78rem;
  opacity: 0.5;
  margin-top: 0.2rem;
}
.place-acts {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.4rem 1.1rem;
  margin-top: 0.9rem;
}

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
  /* One column on a phone — two cards side by side were ~150px each. */
  .cards { grid-template-columns: 1fr; gap: 1.6rem; }
  .cards .card + .card {
    border-inline-start: 0;
    padding-inline-start: 0;
    margin-inline-start: 0;
    border-top: 1px solid color-mix(in srgb, currentColor 16%, transparent);
    padding-top: 1.6rem;
  }
  .card { opacity: 1; }
  .evs { flex-direction: column; gap: 1rem; }
  .evs .ev + .ev {
    border-inline-start: 0;
    border-top: 1px solid color-mix(in srgb, currentColor 18%, transparent);
    padding-top: 1rem;
  }
  .ev { padding: 0 0.5rem; }
  .maps { grid-template-columns: 1fr; gap: 2rem; }
  .map-frame { aspect-ratio: 3 / 2; }
}

@media (prefers-reduced-motion: reduce) {
  .set,
  .marker-ring path,
  .scrawl,
  .lead,
  .lead-line path,
  .side-note,
  .card { transition: none; }
}
</style>
