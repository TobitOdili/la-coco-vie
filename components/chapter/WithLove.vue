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

      <!-- ── Gifts · the names ARE the page. Five bands of the gift list running
           across the screen at their own speeds, forever; point at a word and its
           band eases to a stop and the thing opens underneath it. No illustration
           to keep current — adding a gift is adding a word. ── -->
      <section v-else-if="s.kind === 'gifts'" class="chapter-section love-scene wall"
        :class="{ busy: active.some((a) => a >= 0), touch }"
        :data-idx="i" :style="{ '--rows': bands.length }">
        <div v-for="(band, r) in bands" :key="r" class="band"
          :class="{ solid: r % 2 === 1, on: active[r] >= 0 }"
          :style="{ '--fs': mo[r]?.fs || 1 }" @pointerleave="clearBand(r)">
          <div class="track">
            <!-- ⚠️ The list is repeated until it is wider than the viewport PLUS one
                 whole repetition, because the wrap subtracts exactly one repetition's
                 width — anything less and a gap crosses the screen once per loop. -->
            <span v-for="c in (copies[r] || 3)" :key="c" class="grp">
              <button v-for="(w, k) in band" :key="k" type="button" class="word"
                :class="{ taken: w.claimed }" :data-i="w.i"
                @pointerenter="setBand(r, w.i, $event)" @focus="setBand(r, w.i, $event)">
                {{ w.name }}<i class="sep" aria-hidden="true" />
              </button>
            </span>
          </div>
          <!-- Opens beneath whichever word you are on, and TRACKS it while the band
               coasts to a halt, so it never appears to jump into place. -->
          <div class="reveal" :class="{ open: active[r] >= 0 }">
            <!-- ⚠️ Only when there IS one. Bound to a null `src` the browser renders a
                 broken-image box, which is a worse placeholder than no placeholder. -->
            <img v-if="itemAt(active[r])?.image" class="reveal-shot"
              :src="itemAt(active[r]).image" alt="" aria-hidden="true" decoding="async" />
            <p class="reveal-note">{{ itemAt(active[r])?.memory }}</p>
          </div>
        </div>
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
              <!-- ⚠️ A LINK ONLY IF IT GOES SOMEWHERE. `url` is still a placeholder `#`,
                   and this is the page's one call to action: a guest who taps it and lands
                   nowhere is worse off than one who reads that it is coming. -->
              <a v-if="s.url && s.url !== '#'" class="cash-cta" :href="s.url"
                target="_blank" rel="noopener noreferrer">{{ s.cta }}</a>
              <span v-else class="cash-cta is-pending">the payment link is coming soon</span>
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
import { ref, reactive, onMounted, onBeforeUnmount, nextTick } from 'vue'

const props = defineProps({
  sections: { type: Array, required: true },
})

const ink = '#2E4A52'

// Raised by the docked "Even better," card, which lives in `[slug].vue`.
// ⚠️ Teleported to <body>: `.chapter-page` is `fixed; z-index: 10`, a stacking
// context nothing inside can escape — the same trap In Frames' window hit.
const panel = useState('chapterPanel', () => null)
function onPanelKey(e) { if (e.key === 'Escape' && panel.value) panel.value = null }

const rootEl = ref(null)
let rafId = 0
let ro = null

// ── The wall ────────────────────────────────────────────────────────────────
// Five bands, each carrying the whole gift list, each starting the list at a different
// place and running at its own speed in its own direction. Nothing is illustrated and
// nothing is measured off the page: the motion IS the page.
// ⚠️ BAND COUNT FOLLOWS THE SHAPE OF THE SCREEN. Six bands fill a 16:9 desktop and leave
// a tall tablet (768×1024) covered by 34% — a wall with two thirds of the screen empty
// above and below it. Bigger type is not the answer on a narrow screen: at the size that
// would fill 1024px of height, one gift name is wider than the viewport. More bands is.
const rowsFor = () =>
  import.meta.client && window.innerHeight / window.innerWidth >= 1.15 ? 8 : 6
const items = ref([])
const bands = ref([])
const copies = ref([])
const active = ref([])
const touch = ref(false)

// Per-band motion state. `v` is the live speed and it EASES toward `target`, which is
// zero while you are on that band — so a band coasts to a halt and picks up again
// rather than switching on and off. That deceleration is most of the feel of the page.
const mo = reactive([])
let trackEls = []
let bandEls = []
let revealEls = []
let wordEls = []          // the live element under the pointer, per band

const itemAt = (i) => (i >= 0 ? items.value[i] : null)

function setBand(r, i, e) {
  active.value[r] = i
  const el = e?.currentTarget || null
  // ⚠️ The chosen word needs its own class, not just `:hover`. On touch there is no
  // hover at all, so without this the band would open its panel while every word in it
  // stayed ghosted — which is what the first portrait build looked like.
  if (wordEls[r] && wordEls[r] !== el) wordEls[r].classList.remove('on')
  if (el) el.classList.add('on')
  wordEls[r] = el
}
function clearBand(r) {
  active.value[r] = -1
  wordEls[r]?.classList.remove('on')
  wordEls[r] = null
}

function buildBands(list) {
  items.value = list
  const n = list.length
  const rows = Math.max(2, rowsFor())
  const out = []
  const sh = rng(7)
  for (let r = 0; r < rows; r++) {
    // ⚠️ SHUFFLED per band, not rotated. Rotating one order gives every band the same
    // cyclic sequence, so they slide past each other looking like five copies of the
    // same strip at different offsets — which is exactly how the first cut read.
    const idx = Array.from({ length: n }, (_, k) => k)
    for (let k = n - 1; k > 0; k--) {
      const m = Math.floor(sh() * (k + 1))
      const t = idx[k]; idx[k] = idx[m]; idx[m] = t
    }
    out.push(idx.map((i) => ({ i, name: list[i].name, claimed: !!list[i].claimed })))
  }
  bands.value = out
  copies.value = out.map(() => 3)
  active.value = out.map(() => -1)
  mo.length = 0
  const rnd = rng(41)
  for (let r = 0; r < rows; r++) {
    mo.push({
      dir: r % 2 ? -1 : 1,
      // 24–58 px/s. Slow enough that a word can be read as it passes.
      speed: (0.40 + rnd() * 0.58),
      // Bands are not all the same size — a wall has depth, a table does not.
      fs: (0.62 + rnd() * 0.62).toFixed(3),
      v: 0,
      // ⚠️ A different starting phase per band. With every band starting at 0 the word
      // boundaries line up in columns down the wall and the repetition — unavoidable with
      // six items — becomes the first thing you see. `ph` is a FRACTION of one repetition,
      // applied once the width is known.
      ph: rnd(),
      off: 0,
      w: 0,
    })
  }
}

// ── Measure ─────────────────────────────────────────────────────────────────
// One repetition's width per band, then enough repetitions to cover the viewport plus
// one more. Re-run on resize and once the web font has actually loaded, because the
// width of a word in a fallback face is not the width of the word.
function measure() {
  const root = rootEl.value
  const scene = root?.querySelector('.wall')
  if (!scene) return
  bandEls = [...scene.querySelectorAll('.band')]
  trackEls = bandEls.map((b) => b.querySelector('.track'))
  revealEls = bandEls.map((b) => b.querySelector('.reveal'))
  const vw = scene.clientWidth || window.innerWidth
  const next = []
  bandEls.forEach((b, r) => {
    const grp = b.querySelector('.grp')
    const w = grp ? grp.getBoundingClientRect().width : 0
    if (mo[r]) {
      if (!mo[r].w && w) mo[r].off = mo[r].ph * w   // seed the phase the first time only
      mo[r].w = w
    }
    next[r] = w > 8 ? Math.ceil((vw + w) / w) + 1 : 3
  })
  copies.value = next
}

// Touch has no hover: open whichever band is nearest the middle of the screen, on the
// word nearest the middle of it. Pointer devices keep the hover, which feels better.
const coarse = () => window.matchMedia('(hover: none)').matches
// ⚠️ Six bands of type sliding across the screen forever is exactly what someone who has
// asked their system for less motion does not want. For them the wall simply holds still;
// everything else about the page — the reveal, the focus states — still works.
const stillness = () => import.meta.client && window.matchMedia('(prefers-reduced-motion: reduce)').matches
let calm = false
const clamp01 = (v) => Math.min(1, Math.max(0, v))

function rng(seed) {
  let t = seed * 1103515245 + 12345
  return () => {
    t = (t * 1103515245 + 12345) % 2147483648
    return t / 2147483648
  }
}

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
    }

    if (bandEls.length) {
      const near = coarse()
      if (touch.value !== near) touch.value = near
      if (near) syncTouch(vh)
      for (let r = 0; r < bandEls.length; r++) {
        const m = mo[r]
        const track = trackEls[r]
        if (!m || !track || !m.w) continue
        const held = active.value[r] >= 0
        m.v += ((held || calm ? 0 : m.speed) - m.v) * 0.045
        m.off += m.v
        if (m.off >= m.w) m.off -= m.w
        // ⚠️ Both directions run the SAME accumulator and wrap on the same width; only
        // the sign of the translate differs. Running one of them backwards through the
        // wrap is how a marquee ends up with a seam.
        const x = m.dir > 0 ? -m.off : m.off - m.w
        track.style.transform = `translate3d(${x.toFixed(2)}px,0,0)`

        // The panel follows its word while the band is still coasting.
        const rev = revealEls[r]
        const we = wordEls[r]
        if (rev && held && we) {
          const bb = bandEls[r].getBoundingClientRect()
          const wb = we.getBoundingClientRect()
          // ⚠️ CLAMPED AGAINST THE VIEWPORT, not against the band. The word it follows is
          // on an endless strip and is very often half off one edge, so unclamped the panel
          // went with it — measured at left: -536 on a 390px screen. And the band is NOT a
          // reliable ruler: it is a flex item wrapping a track of nowrap content, so its own
          // border box is far wider than the screen. The viewport is the only honest bound.
          const w = rev.offsetWidth || 220
          const lo = 10 - bb.left
          const hi = window.innerWidth - w - 10 - bb.left
          rev.style.left = `${Math.max(lo, Math.min(hi, wb.left - bb.left)).toFixed(1)}px`
        }
      }
    }
  }
  rafId = requestAnimationFrame(tick)
}

// The touch equivalent of a hover: the band closest to the middle of the screen opens,
// on whichever of its words is closest to the middle of that band.
let lastTouchBand = -1
function syncTouch(vh) {
  let best = -1
  let bestD = vh * 0.22
  bandEls.forEach((b, r) => {
    const bb = b.getBoundingClientRect()
    const d = Math.abs(bb.top + bb.height / 2 - vh * 0.42)
    if (d < bestD) { bestD = d; best = r }
  })
  if (best === lastTouchBand) return
  if (lastTouchBand >= 0) clearBand(lastTouchBand)
  lastTouchBand = best
  if (best < 0) return
  const b = bandEls[best]
  const bb = b.getBoundingClientRect()
  let win = null
  let wd = Infinity
  b.querySelectorAll('.word').forEach((w) => {
    const r = w.getBoundingClientRect()
    const d = Math.abs(r.left + r.width / 2 - (bb.left + bb.width * 0.4))
    if (d < wd) { wd = d; win = w }
  })
  if (win) setBand(best, +win.dataset.i, { currentTarget: win })
}

let resizeT = 0
const onResize = () => {
  clearTimeout(resizeT)
  resizeT = setTimeout(() => {
    // A rotation can change the band count; rebuild only when it actually differs, so an
    // ordinary resize does not re-roll every speed and phase under the reader.
    if (bands.value.length !== Math.max(2, rowsFor())) buildBands(items.value)
    nextTick(measure)
  }, 150)
}

onMounted(async () => {
  window.addEventListener('keydown', onPanelKey)
  calm = stillness()
  buildBands(props.sections.find((x) => x.kind === 'gifts')?.items || [])
  await nextTick()
  measure()
  requestAnimationFrame(() => measure())
  document.fonts?.ready.then(() => setTimeout(measure, 60))
  const scene = rootEl.value?.querySelector('.wall')
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

/* ── the wall ── */
.wall {
  /* ⚠️ Centred, not top-aligned. The section is taller than the bands so the wall has
     somewhere to travel through as you scroll; block layout put all of that slack at the
     bottom and left ~450px of empty page above the first band, which is the one thing a
     wall of type cannot afford. */
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: calc(var(--rows, 6) * 11vh + 78vh);
  padding: 6vh 0;
  /* Every band overruns both edges by a whole repetition — that is what makes the loop
     seamless — so the section has to keep it. */
  overflow: hidden;
}
.band {
  position: relative;
  margin-bottom: 2.2vh;
  /* ⚠️ A flex item's automatic minimum size is its MIN-CONTENT size, and this one wraps a
     nowrap track thirteen screens wide — so the band's own border box measured 10,562px.
     Harmless to look at (the wall clips it) but it makes the band useless as a coordinate
     space, which is how the reveal panel ended up positioned off the screen. */
  width: 100%;
  min-width: 0;
}
.band:last-child { margin-bottom: 0; }
.track {
  display: flex;
  white-space: nowrap;
  will-change: transform;
}
.grp { display: inline-flex; align-items: baseline; }

.word {
  appearance: none;
  -webkit-appearance: none;
  border: 0;
  background: none;
  padding: 0;
  display: inline-flex;
  align-items: baseline;
  font-family: 'Bague', sans-serif;
  font-weight: 700;
  /* ⚠️ Sized off the LARGER of the two axes, and capped high. On vw alone a tall tablet
     (768×1024) got 40px type on a 1024px-high screen and the wall covered 34% of it, while
     a 2560 desktop hit the old 4.8rem cap and covered 42%. `max(vw, vh)` keeps the wall
     filling the frame in portrait, and the higher cap lets it keep growing on a big one. */
  font-size: calc(clamp(2.2rem, max(5.2vw, 3.6vh), 6.4rem) * var(--fs, 1));
  letter-spacing: 0.05em;
  line-height: 1.1;
  text-transform: uppercase;
  white-space: nowrap;
  cursor: none;
  /* ⚠️ OUTLINE is the resting state. Five solid bands of 4rem type is a shout; hollow,
     the wall is a texture you look through, and the one you point at fills in. */
  color: transparent;
  -webkit-text-stroke: 1px rgba(46, 74, 82, 0.55);
  transition: color 0.5s ease, -webkit-text-stroke-color 0.5s ease, opacity 0.5s ease;
}
/* Alternating bands come pre-filled, so the wall has weight before you touch it. */
.solid .word {
  color: rgba(46, 74, 82, 0.16);
  -webkit-text-stroke-color: rgba(46, 74, 82, 0.22);
}
.band:hover .word { opacity: 0.42; }
/* While one band is open the rest step back, so the panel has something to sit on and
   the eye is not asked to read a moving wall and a still card at the same time.
   ⚠️ On touch a band is ALWAYS open — the one nearest the middle of the screen — so the
   full 0.16 would leave the entire wall permanently ghosted. It still steps back, just
   far less, which is enough for the panel to read against it. */
.wall.busy:not(.touch) .band:not(.on) .word { opacity: 0.16; }
.wall.busy.touch .band:not(.on) .word { opacity: 0.45; }
.word.on {
  opacity: 1;
  color: #2E4A52;
  -webkit-text-stroke-color: #2E4A52;
}
.band:hover .word:hover,
.word:focus-visible {
  opacity: 1;
  outline: none;
  color: #2E4A52;
  -webkit-text-stroke-color: #2E4A52;
}
.word.taken { text-decoration: line-through; text-decoration-thickness: 2px; opacity: 0.4; }

/* The separator between one name and the next — a small mark, so the stream reads as a
   list and not as one very long word. */
.sep {
  display: inline-block;
  width: 0.30em;
  height: 0.30em;
  margin: 0 0.72em 0.2em;
  border-radius: 50%;
  background: currentColor;
  border: 1px solid rgba(46, 74, 82, 0.45);
  background: transparent;
  flex: none;
}

.reveal {
  position: absolute;
  top: calc(100% + 0.7rem);
  left: 0;
  width: clamp(11rem, 17vw, 14rem);
  padding: 0.9rem 0.9rem 1rem;
  background: #F6F3EC;
  box-shadow: 0 14px 30px rgba(24, 34, 40, 0.16);
  opacity: 0;
  transform: translateY(-0.55rem);
  pointer-events: none;
  transition: opacity 0.4s ease, transform 0.55s cubic-bezier(0.2, 0.72, 0.24, 1);
  z-index: 3;
}
.reveal.open { opacity: 1; transform: translateY(0); }
.reveal-shot + .reveal-note { margin-top: 0.65rem; }
.reveal-shot {
  display: block;
  width: 100%;
  aspect-ratio: 5 / 3;
  object-fit: cover;
  filter: grayscale(1) contrast(1.04);
  opacity: 0.86;
}
.reveal-note {
  margin: 0;
  font-family: 'Bague', sans-serif;
  font-size: clamp(0.6rem, 0.8vw, 0.7rem);
  line-height: 1.55;
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
.cash-cta.is-pending { border-bottom-style: dashed; opacity: 0.5; cursor: default; }

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

/* ── portrait ── */
@media (max-width: 767px) {
  .wall { min-height: calc(var(--rows, 6) * 9vh + 70vh); padding: 5vh 0; }
  .band { margin-bottom: 2.6vh; }
  .word { font-size: calc(clamp(1.75rem, max(9.4vw, 4.2vh), 3.1rem) * var(--fs, 1)); }
  .reveal { width: min(15rem, 62vw); }
}

@media (prefers-reduced-motion: reduce) {
  .reveal { transition: opacity 0.3s ease; }
}
</style>
