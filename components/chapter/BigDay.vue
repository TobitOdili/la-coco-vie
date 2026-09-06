<template>
  <div ref="rootEl" class="big-day">
    <template v-for="(s, i) in sections" :key="i">
      <!-- ── The date · the only fact on this page. Everything a guest could want to
           know beyond it — where, when, what to wear — lives behind the RSVP. ── -->
      <section v-if="s.kind === 'date'" class="chapter-section day-scene date-scene" :data-idx="i">
        <div class="kicker fade" data-window="0.04,0.16">{{ s.kicker }}</div>
        <h2 class="the-day">
          <span class="d-day write" data-window="0.10,0.30">{{ s.day }}</span>
          <span class="d-date write" data-window="0.24,0.52">{{ s.date }}</span>
          <span class="d-year write" data-window="0.46,0.70">{{ s.year }}</span>
        </h2>
        <!-- The thread starts here and runs the length of the page. -->
        <svg class="thread" viewBox="0 0 100 400" preserveAspectRatio="none" aria-hidden="true">
          <path class="scrub" data-window="0.62,0.98" pathLength="1" d="M 50 0 L 50 400"
            :stroke="ink" stroke-width="1.6" fill="none" vector-effect="non-scaling-stroke" />
        </svg>
        <p class="note fade" data-window="0.72,0.86">{{ s.note }}</p>
      </section>

      <!-- ── The knot · two threads arrive from either side, draw a heart between them
           and leave as one line. ⚠️ The scene must NOT have `overflow: hidden`: it is the
           sticky child's containment box, and a clipped ancestor makes `position: sticky`
           behave as static — the knot then pinned to the scene's top and scrolled away
           with it instead of holding (fixed once already in `4586dd48`). ── -->
      <!-- ⚠️ EVERY WINDOW HERE LIVES INSIDE [0.29, 0.71], WHICH IS THE STICKY HOLD.
           The scene is 240dvh around a 100dvh sticky child, so it pins when the scene top
           reaches 0 (p = vh/(2.4vh+vh) = 0.294) and lets go when its bottom reaches the
           viewport floor (p = 0.706). Windows outside that band draw while the frame is
           already sliding away — the tail and "one day." were at 0.76 and 0.80 and both
           played to an audience that had left. -->
      <section v-else-if="s.kind === 'knot'" class="chapter-section day-scene knot-scene" :data-idx="i">
        <div class="knot-hold">
          <div class="knot-word fade" data-window="0.30,0.37">{{ s.before }}</div>
          <!-- ⚠️ THE viewBox IS CROPPED TO THE INK (y 280→780), not to the path's own
               coordinate space. The drawing only occupies y 300–760 of a 0–760 box, so an
               uncropped viewBox gave the element ~240px of empty height above the heart —
               which pushed "two people," clean out of the sticky frame and slid the heart
               up under the fixed nav. The box has to be the picture. -->
          <svg class="knot" viewBox="0 280 1000 500" fill="none" aria-hidden="true">
            <!-- Left thread: in from the edge, up over the left lobe, down to the point. -->
            <path class="scrub" data-window="0.33,0.49" pathLength="1"
              d="M -20 300 C 200 300, 360 330, 470 378 C 486 386, 495 391, 500 396
                 C 492 366, 474 344, 450 336 C 408 322, 372 348, 372 388
                 C 372 432, 428 496, 500 548"
              :stroke="ink" stroke-width="2.6" fill="none" stroke-linecap="round" />
            <!-- Right thread: the mirror of it, so the two meet at the notch and again
                 at the point. Drawn a beat later, so you see them arrive in turn. -->
            <path class="scrub" data-window="0.37,0.54" pathLength="1"
              d="M 1020 300 C 800 300, 640 330, 530 378 C 514 386, 505 391, 500 396
                 C 508 366, 526 344, 550 336 C 592 322, 628 348, 628 388
                 C 628 432, 572 496, 500 548"
              :stroke="ink" stroke-width="2.6" fill="none" stroke-linecap="round" />
            <!-- and on, as one. -->
            <path class="scrub" data-window="0.54,0.62" pathLength="1" d="M 500 548 L 500 760"
              :stroke="ink" stroke-width="2.6" fill="none" stroke-linecap="round" />
          </svg>
          <div class="knot-word fade" data-window="0.62,0.68">{{ s.after }}</div>
        </div>
      </section>

      <!-- ── The countdown · spelled, not ticked. ── -->
      <section v-else-if="s.kind === 'countdown'" class="chapter-section day-scene count-scene" :data-idx="i">
        <div class="kicker fade" data-window="0.06,0.20">{{ s.lead }}</div>
        <p class="count-words write" data-window="0.14,0.62">{{ spelled }}</p>
        <div class="count-unit fade" data-window="0.40,0.56">{{ s.unit }}</div>
        <!-- The only live thing on the page, and it moves once a minute. -->
        <div class="count-fine fade" data-window="0.58,0.72">{{ fine }}</div>
        <div class="count-tail fade" data-window="0.72,0.86">{{ s.tail }}</div>
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

// ── The countdown ───────────────────────────────────────────────────────────
// ⚠️ SPELLED, NOT TICKED. A digital clock counting down in seconds is the one thing
// this site has no vocabulary for — it belongs to a product launch, not to an
// invitation. The number is written out in words in the chapter's own face, and the
// only thing that moves does so once a minute.
const now = ref(Date.now())
const target = computed(() => new Date(SITE.events[0].date).getTime())
const left = computed(() => Math.max(0, target.value - now.value))
const days = computed(() => Math.floor(left.value / 86400000))
const hours = computed(() => Math.floor((left.value % 86400000) / 3600000))
const mins = computed(() => Math.floor((left.value % 3600000) / 60000))

const ONES = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine',
  'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen',
  'eighteen', 'nineteen']
const TENS = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety']
function words(n) {
  if (n < 20) return ONES[n]
  if (n < 100) return TENS[Math.floor(n / 10)] + (n % 10 ? `-${ONES[n % 10]}` : '')
  const h = Math.floor(n / 100)
  const r = n % 100
  return `${ONES[h]} hundred${r ? ` and ${words(r)}` : ''}`
}
const spelled = computed(() => (left.value <= 0 ? 'today' : words(days.value)))
// Minute resolution: alive, but never frantic. Singular/plural matters at this size.
const plural = (n, w) => `${n} ${w}${n === 1 ? '' : 's'}`
const fine = computed(() =>
  left.value <= 0 ? '' : `${plural(hours.value, 'hour')}, ${plural(mins.value, 'minute')}`
)

// ── The shared scrub engine ─────────────────────────────────────────────────
// Same rAF pattern as every other bespoke page: read each scene's rect per frame and
// drive `data-window="a,b"` → dash offset (`.scrub`), opacity (`.fade`) or an L→R clip
// (`.write`). Reversible, follows Lenis exactly, no observers to go stale.
const clamp01 = (v) => Math.min(1, Math.max(0, v))
function tick() {
  const root = rootEl.value
  if (root) {
    const vh = window.innerHeight
    for (const scene of root.querySelectorAll('.day-scene')) {
      const r = scene.getBoundingClientRect()
      const p = clamp01((vh - r.top) / (r.height + vh))
      for (const el of scene.querySelectorAll('.scrub, .fade, .write')) {
        const win = el.dataset.window
        if (!win) continue
        const [a, b] = win.split(',').map(Number)
        const lp = clamp01((p - a) / (b - a))
        if (el.classList.contains('scrub')) el.style.strokeDashoffset = String(1 - lp)
        else if (el.classList.contains('write')) el.style.clipPath = `inset(-0.25em ${((1 - lp) * 100).toFixed(1)}% -0.35em 0)`
        else el.style.opacity = String(lp)
      }
    }
  }
  rafId = requestAnimationFrame(tick)
}

onMounted(() => {
  rafId = requestAnimationFrame(tick)
  clockId = setInterval(() => { now.value = Date.now() }, 30000)
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
  padding: max(10vh, 7rem) 8vw 10vh;
  box-sizing: border-box;
}
.scrub { stroke-dasharray: 1; stroke-dashoffset: 1; }
.fade { opacity: 0; }
/* ⚠️ Vertical slack on the clip: `inset(0 …% 0 0)` clips at the line box and shaves a
   serif's descenders. Same fix US and With Love needed. */
.write { clip-path: inset(-0.25em 100% -0.35em 0); }

.kicker {
  font-family: 'Bague', sans-serif;
  font-size: 0.78rem;
  letter-spacing: 0.28em;
  text-transform: uppercase;
  opacity: 0.6;
}

/* ── the date ── */
.date-scene { min-height: 118dvh; }
.the-day {
  margin: 2.4rem 0 0;
  font-weight: 400;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.1em;
}
.the-day span { display: block; font-family: 'Italiana', serif; line-height: 1.06; }
.d-day { font-size: clamp(2.6rem, 8vw, 6rem); }
.d-date { font-size: clamp(2rem, 6vw, 4.6rem); }
.d-year { font-size: clamp(1.1rem, 2.6vw, 1.9rem); letter-spacing: 0.12em; opacity: 0.72; }
.note {
  font-family: 'Bague', sans-serif;
  font-size: 0.82rem;
  letter-spacing: 0.06em;
  line-height: 1.7;
  opacity: 0.62;
  max-width: 26rem;
  margin: 0;
}
/* The thread runs from the date down into the knot. */
.thread { width: 2px; height: clamp(6rem, 14vh, 11rem); margin: 3.2rem 0; overflow: visible; }

/* ── the knot ── */
/* ⚠️ NO `overflow: hidden` on this scene — see the template note. */
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
.knot { width: min(64vw, 44rem); height: auto; overflow: visible; }
.knot-word {
  font-family: 'Italiana', serif;
  font-size: clamp(1.1rem, 2.6vw, 1.8rem);
  letter-spacing: 0.08em;
}

/* ── the countdown ── */
.count-scene { min-height: 128dvh; }
.count-words {
  margin: 1.8rem 0 0;
  font-family: 'Italiana', serif;
  /* One word or two ("fifty-three", "one hundred and four") — it has to fit either. */
  font-size: clamp(2.4rem, 9vw, 7rem);
  line-height: 1.02;
  max-width: 14em;
}
.count-unit {
  font-family: 'Bague', sans-serif;
  font-size: 0.86rem;
  letter-spacing: 0.34em;
  text-transform: uppercase;
  margin-top: 0.9rem;
  opacity: 0.7;
}
.count-fine {
  font-family: 'Bague', sans-serif;
  font-size: 0.72rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  margin-top: 2.6rem;
  opacity: 0.5;
}
.count-tail {
  font-family: 'Italiana', serif;
  font-size: clamp(1rem, 2.2vw, 1.5rem);
  margin-top: 1.2rem;
  opacity: 0.66;
}

@media (max-width: 767px) {
  .knot { width: 92vw; }
  .knot-scene { min-height: 210dvh; }
  .date-scene, .count-scene { padding-inline: 7vw; }
}

/* ⚠️ SHORT VIEWPORTS, NOT NARROW ONES. A landscape phone is 844px WIDE and 390 tall, so
   every width query misses it — and the sticky frame is only 390px, into which a word, a
   540×270 knot and another word do not fit: measured top 60, i.e. under the fixed nav.
   The knot is sized off the width by construction (viewBox 1000×500), so on a short frame
   it has to be capped by hand, and the hold needs the nav's height reserved. */
/* ⚠️ `and (orientation: landscape)` — without it this also catches a 320×568 PORTRAIT
   phone, whose height is under 600 too, and shrank the knot from 294px wide to 141. Short
   AND wide is the case that needs help; short and narrow already has the width rule. */
@media (max-height: 600px) and (orientation: landscape) {
  .knot { width: min(44vw, 24rem); }
  .knot-hold {
    padding-top: 4.5rem;
    box-sizing: border-box;
    gap: 0.5rem;
  }
  .knot-word { font-size: clamp(0.9rem, 2.4vw, 1.15rem); }
  .date-scene, .count-scene { padding-top: max(14vh, 6rem); }
  .the-day { margin-top: 1.2rem; }
  .thread { height: clamp(3rem, 8vh, 5rem); margin: 1.6rem 0; }
}

@media (prefers-reduced-motion: reduce) {
  .day-scene { scroll-behavior: auto; }
}
</style>
