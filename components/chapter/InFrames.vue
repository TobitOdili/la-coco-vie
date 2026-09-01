<template>
  <div ref="rootEl" class="in-frames">
    <!-- ── THE PROCESSION ───────────────────────────────────────────────────
         The chapter's sculpture: the couple's photographs, mounted, spiralling
         out of the dark toward you. One is always PRESENTED at the front, in
         colour, with its note; the rest orbit away into the room as faint
         ghosts. Drag (or swipe) to bring the next one forward; it advances on
         its own if you leave it alone; click the front one and it comes all the
         way up to you.

         ⚠️ THIS IS THE HOMEPAGE'S GRAMMAR, NOT ITS SHAPE. The homepage is one
         physical object turned by one continuous gesture, with a depth-opacity
         falloff to faint ghosts, a big faint wordmark behind it, mouse parallax
         on a lerp, and a front item that is the active one. All of that is here.
         What is deliberately NOT here is its geometry: a ring of cards seen from
         outside would read as the homepage repeated. This recedes instead of
         orbiting — a journey coming toward you, which is what the page is about.

         ⚠️ NOTHING IS SCROLL-DRIVEN AND NOTHING PINS. Scroll passes straight
         through; four earlier iterations locked it and every one was rejected. -->
    <section
      v-for="(s, i) in sections"
      :key="i"
      class="chapter-section room-scene proc-scene"
      :data-idx="i"
    >
      <!-- the room: the film this all came off, drifting far behind everything -->
      <div class="reel-room" aria-hidden="true">
        <div v-for="(sp, k) in SPOOLS" :key="k" class="spool"
          :style="{ '--angle': sp.angle + 'deg', '--top': sp.top + '%' }">
          <div class="film">
            <figure v-for="q in slots" :key="q" class="mini">
              <img :src="ready ? frameSrc(k, q) : undefined" alt="" decoding="async" draggable="false" />
            </figure>
          </div>
        </div>
      </div>

      <!-- the wordmark sits BEHIND the procession, the way the homepage's
           tagline sits behind the ring -->
      <h2 class="wordmark" aria-hidden="true">IN FRAMES</h2>

      <div class="room-grain" aria-hidden="true" />
      <div class="room-vignette" aria-hidden="true" />

      <!-- ── the procession ── -->
      <div
        class="stage"
        @pointerdown="onDown"
        @pointermove="onMove"
        @pointerup="onUp"
        @pointercancel="onUp"
        @pointerleave="onUp"
        @dragstart.prevent
        @mouseenter="hovering = true"
        @mouseleave="hovering = false"
      >
        <div class="field">
          <button
            v-for="(p, k) in prints"
            :key="k"
            type="button"
            class="print"
            :data-k="k"
            :aria-label="`${p.note} — ${k === presented ? 'open' : 'bring forward'}`"
            @click="onPrintClick(k)"
          >
            <span class="faces">
            <span class="mat face">
              <span class="glass">
                <img :src="ready ? p.src : undefined" :alt="p.note" decoding="async" draggable="false" />
              </span>
              <span class="note">{{ p.note }}</span>
            </span>
            <!-- the back of the print, the way you'd write on one in pencil -->
            <span class="mat back" aria-hidden="true">
              <span class="back-note">{{ p.back || p.note }}</span>
              <span class="back-rule" />
              <span class="back-no">N<sup>o</sup> {{ String(k + 1).padStart(2, '0') }}</span>
            </span>
            </span>
          </button>
        </div>
        <!-- lays a raised print back into the deck -->
        <div class="catcher" :class="{ on: open !== null }" @click="lay()" aria-hidden="true" />
      </div>

      <footer class="proc-foot">
        <div class="counter">
          {{ String(presented + 1).padStart(2, '0') }}<i>/</i>{{ String(prints.length).padStart(2, '0') }}
        </div>
        <div class="more">{{ s.endSub }}</div>
      </footer>
    </section>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount, nextTick } from 'vue'

const props = defineProps({
  sections: { type: Array, required: true },
})

const reel = computed(() => props.sections.find((s) => s.kind === 'reel'))
const frames = computed(() => reel.value?.frames || [])
const prints = computed(() => reel.value?.prints || [])

// ── the sculpture ───────────────────────────────────────────────────────────
// Slot u (0 = presented) sits at depth −u·Z_STEP, on an orbit that opens out from
// the centre as it recedes: r(u) = R0·u/(u+K). u=0 is dead centre and in your
// face; everything behind spirals outward and away. Anything with u<0 has already
// passed the camera and is dissolving.
// ⚠️ MEASURED, not authored: the depth step and the orbit are multiples of the
// print's own width, so the sculpture holds its proportions at every viewport.
const Z_PER_W = 1.05        // depth between slots, in print-widths
const R_PER_W = 1.5         // the orbit's outer limit, in print-widths
const D_PHI = 0.46          // radians of spiral per slot
const R_K = 0.8             // how fast the orbit opens out
const Y_SQUASH = 0.34       // flatten the arc: it should sweep sideways into the
                            // room, not climb into the wordmark's band
const TILT = 3.2            // deg of roll per slot, so nothing sits perfectly square
// Faint ghosts, like the homepage's far-side cards (DEPTH_FADE_FLOOR = 0.2 there).
const GHOST_FLOOR = 0.16
const FADE_FROM = 0.35      // slots before the fade starts
const FADE_OVER = 5.2       // …and how many it takes to reach the floor

const AUTO_MS = 5600
const SPRING = 6.2          // how hard progress chases its target
const RAISE_SPRING = 7.5
const RAISE_Z = 90          // a little toward the viewer, so it clears the deck

const rootEl = ref(null)
const ready = ref(false)
const slots = ref(22)
const presented = ref(0)
const open = ref(null)
const hovering = ref(false)
const inView = ref(false)
// raise/flip are animated in the SAME rAF loop as everything else. A CSS
// transition would fight the per-frame transform writes, and the raised card has
// to keep its cursor parallax alive while it is up.
let raise = 0
let raiseTarget = 0
let flip = 0
let flipTarget = 0
let dragDx = 0            // the small lead the front card takes under the finger
let cueT = -1             // >=0 while the one-time "you can swipe this" nudge runs
let cued = false

let rafId = 0
let io = null
let autoTimer = 0
let layT = 0
let last = 0
// motion model: `progress` chases `target`; the drag moves the target directly and
// a release snaps it to a whole slot, so a print always settles dead centre.
let progress = 0
let target = 0
let printW = 240            // measured; everything spatial is a multiple of it
let phase = 0               // the background film's own clock
let period = 1
let pitch = 200
// pointer parallax, lerped the way the homepage lerps its camera parallax
let mx = 0
let my = 0
let px = 0
let py = 0

const n = () => Math.max(1, prints.value.length)

// ── geometry ────────────────────────────────────────────────────────────────
// The visible window is [-1, N-1): exactly one print is past the camera at a time
// and the rest recede, so the wrap happens where nothing is visible anyway.
function slotOf(k) {
  const N = n()
  let u = (k - progress) % N
  if (u < -1) u += N
  if (u >= N - 1) u -= N
  return u
}

// How big a raised print gets: as large as the room allows, capped so the mat and
// its note always fit the viewport.
function raisedScale() {
  const w = Math.min(window.innerWidth * 0.84, 44 * 16, (window.innerHeight * 0.74) / 0.8)
  return Math.max(1, w / Math.max(1, printW)) / (1 + RAISE_Z / 1400)
}

function place(el, u, k) {
  const a = Math.abs(u)
  const r = printW * R_PER_W * (a / (a + R_K))
  const phi = u * D_PHI
  let x = r * Math.cos(phi - Math.PI / 2)
  let y = r * Math.sin(phi - Math.PI / 2) * Y_SQUASH
  let z = -u * printW * Z_PER_W
  let rotZ = u * TILT

  let o = 1 - Math.max(0, a - FADE_FROM) / FADE_OVER * (1 - GHOST_FLOOR)
  o = Math.max(GHOST_FLOOR, Math.min(1, o))

  // ⚠️ The card leaving the front goes UP AND BACK, not toward the camera. Sending
  // it past the viewer read as a card being thrown at you; this reads as the top
  // one being lifted off and put behind, which is what it is.
  if (u < 0) {
    const t = Math.min(1, -u)
    y -= 0.34 * printW * t
    z = -t * printW * Z_PER_W * 1.7
    rotZ = -t * 7
    o = Math.max(0, 1 - t * 1.9)
  }

  // the front card carries the finger a little, and the one-time nudge cue
  if (a < 0.5) x += dragDx + cueOffset()

  let sc = 1
  let rotY = 0
  let rotX = 0
  if (open.value === k && raise > 0) {
    // ── the print rises out of the deck, and keeps its parallax while it is up ──
    const S = raisedScale()
    x = x * (1 - raise) + px * 2.4 * raise
    y = y * (1 - raise) + (raisedY() + py * 2.4) * raise
    z = z * (1 - raise) + RAISE_Z * raise
    rotZ *= 1 - raise
    sc = 1 + (S - 1) * raise
    rotY = mx * 7 * raise             // a physical thing tips toward the cursor
    rotX = -my * 5 * raise
    o = 1
  }

  el.style.transform =
    `translate3d(${(x + (open.value === k ? 0 : px)).toFixed(1)}px,` +
    ` ${(y + (open.value === k ? 0 : py)).toFixed(1)}px, ${z.toFixed(1)}px)` +
    ` rotateY(${rotY.toFixed(2)}deg) rotateX(${rotX.toFixed(2)}deg)` +
    ` rotateZ(${rotZ.toFixed(2)}deg) scale(${sc.toFixed(3)})`
  el.style.opacity = o.toFixed(3)
  // ⚠️ The TURN goes on the inner wrapper, not on .print. An element with
  // `opacity`/`will-change: opacity` is forced to `transform-style: flat`, which
  // silently disables backface-visibility on its children — the card flipped to
  // show its own front, mirrored, instead of its back.
  const faces = el.firstElementChild
  if (faces) faces.style.transform = `rotateY(${(open.value === k ? flip : 0).toFixed(2)}deg)`
  el.style.zIndex = String(open.value === k ? 900 : Math.round(500 - a * 10))
  el.classList.toggle('is-front', a < 0.5 && open.value === null)
  el.classList.toggle('is-raised', open.value === k)
  el.style.pointerEvents = (open.value !== null ? open.value === k : o > 0.35) ? 'auto' : 'none'
}

// The stage is not vertically centred in the section (the footer takes room), so a
// raised print has to be offset to land in the middle of the SCREEN.
function raisedY() {
  const st = rootEl.value?.querySelector('.stage')
  if (!st) return 0
  const r = st.getBoundingClientRect()
  return window.innerHeight / 2 - (r.top + r.height / 2)
}

// A one-time nudge when the section arrives: the front print swings left, then
// right, then settles. It replaces the written instructions.
function cueOffset() {
  if (cueT < 0) return 0
  const t = Math.min(1, cueT / 1.5)
  return -26 * Math.sin(t * Math.PI * 2) * (1 - t)
}

// ── moving through ──────────────────────────────────────────────────────────
function glideTo(k) {
  const N = n()
  let d = ((k - target) % N + N + N / 2) % N - N / 2   // shortest way round
  target += d
  restartAuto()
}
function step(dir) { target += dir; restartAuto() }

function stopAuto() { clearInterval(autoTimer); autoTimer = 0 }
function restartAuto() {
  stopAuto()
  if (!inView.value || open.value !== null) return
  autoTimer = setInterval(() => {
    if (hovering.value || dragging || open.value !== null) return
    target += 1
  }, AUTO_MS)
}

// ── drag ────────────────────────────────────────────────────────────────────
let dragging = false
let dragged = false
let downX = 0
let downY = 0
let axis = null            // null until the gesture declares itself 'x' or 'y'
const SWIPE_MIN = 46       // px before a swipe counts

function onDown(e) {
  if (open.value !== null) return
  dragging = true
  dragged = false
  axis = null
  downX = e.clientX
  downY = e.clientY
  dragDx = 0
  cueT = -1                // any touch cancels the cue; they already know
}
function onMove(e) {
  // ⚠️ Parallax only where there is a real pointer. On touch a tap would set mx/my
  // once and leave the raised print permanently offset from the middle of the
  // screen — the homepage gates its deck lean on the same test.
  const el = hasPointer ? rootEl.value?.querySelector('.proc-scene') : null
  if (el) {
    const r = el.getBoundingClientRect()
    mx = ((e.clientX - r.left) / Math.max(1, r.width)) * 2 - 1
    my = ((e.clientY - r.top) / Math.max(1, r.height)) * 2 - 1
  }
  if (!dragging) return
  const dx = e.clientX - downX
  const dy = e.clientY - downY
  // decide once, then stay decided — a gesture that keeps changing its mind is
  // what makes a swipe scroll the page half way through
  if (!axis && (Math.abs(dx) > 8 || Math.abs(dy) > 8)) {
    axis = Math.abs(dx) > Math.abs(dy) ? 'x' : 'y'
  }
  if (axis !== 'x') return
  dragged = true
  // ⚠️ The finger only LEADS the front card by a few px. It used to scrub the
  // target continuously and then Math.round() it on release, so any swipe short of
  // a whole slot visibly moved forward and sprang back — that was the bounce.
  dragDx = Math.max(-34, Math.min(34, dx * 0.3))
}
function onUp() {
  if (!dragging) return
  const committed = axis === 'x' && Math.abs(dragDx) >= SWIPE_MIN * 0.3
  dragging = false
  axis = null
  if (committed) {
    target += dragDx < 0 ? 1 : -1     // one card off the top, no rubber band
    restartAuto()
  }
  dragDx = 0
  setTimeout(() => { dragged = false }, 50)
}

function onPrintClick(k) {
  if (dragged) return
  if (open.value === k) { turn(); return }        // tap a raised print → turn it over
  if (open.value !== null) { lay(); return }
  if (k === presented.value) openPrint(k)
  else glideTo(k)
}

function openPrint(k) {
  open.value = k
  raiseTarget = 1
  flipTarget = 0
  stopAuto()
}
// tapping a raised print turns it over; tapping outside lays it back in the deck
function turn() { flipTarget = flipTarget ? 0 : 180 }
function lay() {
  if (open.value === null) return
  raiseTarget = 0
  flipTarget = 0
  restartAuto()
  // hold the identity until it has actually settled back, or it snaps home
  clearTimeout(layT)
  layT = setTimeout(() => { if (raiseTarget === 0) open.value = null }, 620)
}

let stageEl = null
let hasPointer = true
function onTouchMove(e) {
  if (axis === 'x' || open.value !== null) e.preventDefault()
}

function onKey(e) {
  if (!inView.value) return
  if (e.key === 'Escape') close()
  else if (e.key === 'ArrowRight') step(1)
  else if (e.key === 'ArrowLeft') step(-1)
  else if ((e.key === 'Enter' || e.key === ' ') && open.value === null &&
    document.activeElement?.classList?.contains('print')) {
    e.preventDefault()
    onPrintClick(Number(document.activeElement.dataset.k))
  }
}

// ── the room's film ─────────────────────────────────────────────────────────
const SPOOLS = [
  { angle: -29, top: 16, dir: 1, lead: 0, speed: 20 },
  { angle: 17, top: 52, dir: -1, lead: 2, speed: 17 },
  { angle: -21, top: 84, dir: 1, lead: 4, speed: 23 },
]
function frameSrc(spoolIdx, slot) {
  const list = frames.value
  if (!list.length) return undefined
  return list[(SPOOLS[spoolIdx].lead + slot) % list.length]
}
// The strip repeats every frames.length frames, so travelling exactly that far
// puts an identical frame in every position — a seamless loop, no cloned DOM.
function measure() {
  printW = rootEl.value?.querySelector('.field')?.offsetWidth || printW
  const film = rootEl.value?.querySelector('.film')
  const spool = rootEl.value?.querySelector('.spool')
  if (!film || !spool) return
  const m = film.querySelectorAll('.mini')
  pitch = m.length > 1 ? m[1].offsetLeft - m[0].offsetLeft : 200
  period = Math.max(1, pitch * Math.max(1, frames.value.length))
  const room = spool.offsetWidth || 2000
  const need = Math.ceil((room + 2 * period) / pitch) + 2
  if (need !== slots.value) { slots.value = need; nextTick(measure) }
}

function preload() {
  const srcs = [...new Set([...frames.value, ...prints.value.map((p) => p.src)])]
  if (!srcs.length) { ready.value = true; return }
  let done = 0
  const bump = () => { if (++done >= srcs.length) ready.value = true }
  for (const src of srcs) {
    const img = new Image()
    img.onload = bump
    img.onerror = bump
    img.src = src
  }
}

function tick(now) {
  if (!last) last = now
  const dt = Math.min(0.05, (now - last) / 1000)
  last = now
  if (inView.value && rootEl.value) {
    // progress chases target — frame-rate independent, so a 120Hz screen and a
    // 60Hz one settle over the same amount of TIME
    progress += (target - progress) * (1 - Math.exp(-dt * SPRING))
    const N = n()
    presented.value = ((Math.round(progress) % N) + N) % N

    // the same lerped pointer parallax the homepage camera uses
    px += (mx * 14 - px) * (1 - Math.exp(-dt * 3))
    py += (my * 9 - py) * (1 - Math.exp(-dt * 3))

    raise += (raiseTarget - raise) * (1 - Math.exp(-dt * RAISE_SPRING))
    flip += (flipTarget - flip) * (1 - Math.exp(-dt * RAISE_SPRING))
    if (cueT >= 0) { cueT += dt; if (cueT > 1.5) cueT = -1 }

    rootEl.value.querySelectorAll('.print').forEach((el) => {
      const k = Number(el.dataset.k)
      place(el, slotOf(k), k)
    })

    phase += dt
    rootEl.value.querySelectorAll('.film').forEach((f, i) => {
      const sp = SPOOLS[i]
      if (!sp) return
      const x = ((phase * sp.speed) % period) * sp.dir
      f.style.transform = `translate3d(${(-x).toFixed(2)}px, 0, 0)`
    })
  }
  rafId = requestAnimationFrame(tick)
}

let resizeT = 0
const onResize = () => { clearTimeout(resizeT); resizeT = setTimeout(measure, 150) }

onMounted(() => {
  hasPointer = !!window.matchMedia?.('(pointer: fine)').matches
  measure()
  rafId = requestAnimationFrame(tick)
  window.addEventListener('resize', onResize)
  window.addEventListener('keydown', onKey)
  // ⚠️ `touch-action: pan-y` alone is not enough: the browser keeps the option of
  // scrolling, so a swipe that drifts a few px vertically gets taken as a scroll
  // mid-gesture. Once the gesture has declared itself horizontal we preventDefault
  // it — which needs a NON-PASSIVE listener, hence this rather than @touchmove.
  stageEl = rootEl.value?.querySelector('.stage')
  stageEl?.addEventListener('touchmove', onTouchMove, { passive: false })
  const scene = rootEl.value?.querySelector('.proc-scene')
  if (scene && 'IntersectionObserver' in window) {
    io = new IntersectionObserver((e) => {
      inView.value = e[0].isIntersecting
      if (inView.value) {
        preload()
        restartAuto()
        // the visual cue replaces the written directions — once, on arrival
        if (!cued) { cued = true; setTimeout(() => { if (open.value === null) cueT = 0 }, 900) }
      } else stopAuto()
    }, { rootMargin: '80% 0px', threshold: 0 })
    io.observe(scene)
  } else {
    inView.value = true
    preload()
    restartAuto()
  }
  document.fonts?.ready.then(() => setTimeout(measure, 60))
})
onBeforeUnmount(() => {
  cancelAnimationFrame(rafId)
  window.removeEventListener('resize', onResize)
  window.removeEventListener('keydown', onKey)
  io?.disconnect()
  stageEl?.removeEventListener('touchmove', onTouchMove)
  stopAuto()
  clearTimeout(resizeT)
  clearTimeout(layT)
})
</script>

<style scoped>
.room-scene { position: relative; color: #EFE8F5; background: #241A33; }
.proc-scene {
  min-height: 100dvh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  padding: 6vh 5vw 6vh;
  box-sizing: border-box;
  /* the front print is the SUBJECT — it should be big enough to look at */
  --print-w: clamp(15rem, 29vw, 25rem);
}

/* ── the room's film, far behind ── */
.reel-room { position: absolute; inset: 0; overflow: hidden; pointer-events: none; }
.spool {
  position: absolute;
  left: 50%;
  top: var(--top);
  width: 150vw;
  display: flex;
  justify-content: center;
  transform: translate(-50%, -50%) rotate(var(--angle));
}
.film {
  position: relative;
  display: flex;
  align-items: center;
  width: max-content;
  gap: 0.4rem;
  padding: 1.1rem 0;
  background-color: #221A30;
  background-image:
    repeating-linear-gradient(to right, rgba(195, 166, 216, 0.4) 0 0.5rem, transparent 0.5rem 1.4rem),
    repeating-linear-gradient(to right, rgba(195, 166, 216, 0.4) 0 0.5rem, transparent 0.5rem 1.4rem);
  background-size: 100% 0.5rem;
  background-position: 0 0.34rem, 0 calc(100% - 0.34rem);
  background-repeat: repeat-x;
  /* barely there. At 0.12 the strips fought the wordmark and made the room busy;
     the composition needs a quiet ground for the procession to read against. */
  opacity: 0.06;
  will-change: transform;
}
.mini {
  flex: none;
  width: clamp(5rem, 10vw, 11rem);
  aspect-ratio: 3 / 2;
  margin: 0;
  background: #1B1428;
  overflow: hidden;
}
.mini img { width: 100%; height: 100%; object-fit: cover; display: block; filter: grayscale(1); }

/* The wordmark behind the sculpture — the homepage puts its tagline here too. */
.wordmark {
  position: absolute;
  inset: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-family: 'Monoton', cursive;
  font-weight: 400;
  /* Upper third, like the homepage's tagline — which sits ABOVE its lower arc of
     cards rather than behind them. Overlapping the subject just made noise. */
  justify-content: flex-start;
  /* clear the site nav — the chapter wordmark sitting under COVENANT & UVIE read
     as one collided lockup */
  padding-top: 13vh;
  font-size: clamp(1.5rem, 5vw, 4.2rem);
  line-height: 1;
  letter-spacing: 0.12em;
  white-space: nowrap;
  color: #EFE8F5;
  opacity: 0.09;
  pointer-events: none;
  user-select: none;
  z-index: 1;
}

.room-grain, .room-vignette { position: absolute; inset: 0; pointer-events: none; }
.room-grain {
  background-image: var(--noise-url);
  background-size: 200px 200px;
  opacity: 0.13;
  mix-blend-mode: overlay;
  animation: grain-shift 0.6s steps(1, end) infinite;
  z-index: 30;
}
.room-vignette {
  box-shadow: inset 0 0 15rem 4.5rem rgba(9, 5, 14, 0.8);
  z-index: 29;
}
@keyframes grain-shift {
  0%   { background-position: 0 0 }
  20%  { background-position: -37px 21px }
  40%  { background-position: 44px -18px }
  60%  { background-position: -22px -41px }
  80%  { background-position: 29px 33px }
  100% { background-position: 0 0 }
}

/* ── the procession ── */
.stage {
  position: relative;
  z-index: 10;
  flex: 1 1 auto;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  perspective: 1400px;
  perspective-origin: 50% 50%;
  touch-action: pan-y;     /* the page keeps vertical scroll; we take the x-drag */
}
/* the raised card has to clear the catcher, and the catcher has to clear the deck */
.field {
  position: relative;
  z-index: 3;
  width: var(--print-w);
  /* the mat's real height: 6% top + a 3:2 window at 88% width + the note + 6%.
     It was 1.3× the width, which left two thirds of the board empty. */
  height: calc(var(--print-w) * 0.8);
  transform-style: preserve-3d;
}

/* A mounted print: mat board, the picture behind glass, the note on the mat. */
/* ⚠️ `user-drag` is load-bearing, not cosmetic: without it Chrome starts a native
   image drag the moment a swipe begins on a photograph, fires pointercancel, and
   the swipe dies on its first move. */
.print {
  position: absolute;
  inset: 0;
  user-select: none;
  -webkit-user-select: none;
  -webkit-user-drag: none;
  perspective: 1400px;
  padding: 0;
  margin: 0;
  border: 0;
  appearance: none;
  -webkit-appearance: none;
  background: none;
  color: inherit;
  font: inherit;
  cursor: none;
  transform-style: preserve-3d;
  will-change: transform;
}
/* The turn happens here, in its own clean 3D context. */
.faces {
  position: absolute;
  inset: 0;
  transform-style: preserve-3d;
  will-change: transform;
}
/* Two faces on one card. `backface-visibility: hidden` on both is what makes the
   turn work — without it the front shows through, mirrored, from behind. */
.mat {
  position: absolute;
  inset: 0;
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding: 6% 6% 0;
  background: #17101F;
  box-shadow:
    inset 0 0 0 1px rgba(195, 166, 216, 0.18),
    0 26px 50px -26px rgba(0, 0, 0, 0.95);
  transition: box-shadow 0.5s ease, background 0.5s ease;
}
/* ⚠️ The window FILLS the mat's remaining height rather than declaring its own
   aspect-ratio. With a fixed ratio the mat kept a band of dead board under the
   note whenever the two did not happen to add up. */
.back {
  transform: rotateY(180deg);
  align-items: center;
  justify-content: center;
  gap: 1.1rem;
  padding: 12%;
  text-align: center;
}
.back-note {
  font-family: 'Shadows Into Light', 'Bradley Hand', cursive;
  font-size: clamp(1rem, 2.4vw, 1.6rem);
  line-height: 1.35;
  color: #C3A6D8;
}
.back-rule { display: block; width: 38%; height: 1px; background: currentColor; opacity: 0.22; }
.back-no {
  font-family: 'Bague', sans-serif;
  font-size: 0.62rem;
  letter-spacing: 0.3em;
  opacity: 0.45;
}
.back-no sup { font-size: 0.7em; }

/* lays a raised print back down; sits under the raised card, over the rest */
.catcher {
  position: absolute;
  inset: -50vmax;
  z-index: 2;
  background: rgba(10, 6, 16, 0.72);
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.5s ease;
}
.catcher.on { opacity: 1; pointer-events: auto; }

.glass {
  display: block;
  width: 100%;
  flex: 1 1 auto;
  min-height: 0;
  overflow: hidden;
  background: #0E0916;
  box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.6);
}
.glass img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  /* the room is monochrome; the print at the front remembers its colour */
  filter: grayscale(1) brightness(0.92) contrast(0.95);
  transition: filter 0.7s ease;
}
.note {
  font-family: 'Shadows Into Light', 'Bradley Hand', cursive;
  font-size: clamp(0.78rem, 1.1vw, 0.98rem);
  line-height: 1;
  color: #C3A6D8;
  text-align: center;
  padding: 0.7rem 0.2rem;
  opacity: 0;
  transition: opacity 0.6s ease;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* the one at the front: lit, in colour, its note legible */
.print.is-front .glass img { filter: none; }
.print.is-front .note { opacity: 0.92; }
.print.is-raised { z-index: 900; }
.print.is-raised .mat {
  box-shadow:
    inset 0 0 0 1px rgba(195, 166, 216, 0.34),
    0 0 9rem 1.4rem rgba(159, 123, 184, 0.2),
    0 60px 90px -34px rgba(0, 0, 0, 0.95);
}
.print.is-raised .glass img { filter: none; }
.print.is-raised .note { opacity: 0.92; }

.print.is-front .mat {
  background: #1D1429;
  box-shadow:
    inset 0 0 0 1px rgba(195, 166, 216, 0.34),
    0 0 7rem 1rem rgba(159, 123, 184, 0.22),
    0 34px 60px -26px rgba(0, 0, 0, 0.95);
}

.proc-foot {
  position: relative;
  z-index: 20;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.55rem;
  text-align: center;
  flex: none;
  /* clear the floating popup dock, which is fixed to the viewport bottom */
  padding-bottom: 4.5rem;
}
.counter {
  font-family: 'Bague', sans-serif;
  font-size: 0.74rem;
  letter-spacing: 0.3em;
}
.counter i { font-style: normal; opacity: 0.35; margin: 0 0.45em; }
.more {
  font-family: 'Bague', sans-serif;
  font-size: 0.6rem;
  letter-spacing: 0.28em;
  opacity: 0.34;
}


@media (max-width: 768px) {
  .proc-scene { padding: 6vh 5vw 7rem; --print-w: min(74vw, 20rem); }
  .spool { width: 240vw; }
  .mini { width: clamp(4.2rem, 20vw, 7rem); }
  .film { gap: 0.28rem; padding: 0.8rem 0; }
  .wordmark { font-size: clamp(1.6rem, 10vw, 3rem); padding-top: 12vh; }
  .proc-foot { padding-bottom: 3rem; }
  .back { padding: 10%; gap: 0.8rem; }
}

@media (prefers-reduced-motion: reduce) {
  .room-grain { animation: none; }
}
</style>
