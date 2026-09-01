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
              <img :src="ready ? frameSrc(k, q) : undefined" alt="" decoding="async" />
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
            <span class="mat">
              <span class="glass">
                <img :src="ready ? p.src : undefined" :alt="p.note" decoding="async" />
              </span>
              <span class="note">{{ p.note }}</span>
            </span>
          </button>
        </div>
      </div>

      <footer class="proc-foot">
        <div class="counter">
          {{ String(presented + 1).padStart(2, '0') }}<i>/</i>{{ String(prints.length).padStart(2, '0') }}
        </div>
        <div class="hint">{{ hintText }}</div>
        <div class="more">{{ s.endSub }}</div>
      </footer>

      <!-- ── the opened print: a plain fixed overlay, deliberately OUTSIDE the 3D
           stage so its FLIP can't compose with the field's perspective ── -->
      <div class="lightbox" :class="{ on: open !== null }">
        <div class="lb-scrim" @click="close()" />
        <figure v-if="open !== null" class="lb-card">
          <span class="glass">
            <img :src="prints[open]?.src" :alt="prints[open]?.note" />
          </span>
          <figcaption class="note">{{ prints[open]?.note }}</figcaption>
        </figure>
      </div>
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

const rootEl = ref(null)
const ready = ref(false)
const slots = ref(22)
const presented = ref(0)
const open = ref(null)
const hovering = ref(false)
const inView = ref(false)
const hintText = ref('drag to move through · click to open')

let rafId = 0
let io = null
let autoTimer = 0
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

function place(el, u) {
  const a = Math.abs(u)
  const r = printW * R_PER_W * (a / (a + R_K))
  const phi = u * D_PHI
  const x = r * Math.cos(phi - Math.PI / 2)
  const y = r * Math.sin(phi - Math.PI / 2) * Y_SQUASH
  const z = -u * printW * Z_PER_W
  // depth falloff to faint ghosts, plus a fast dissolve once it has passed you
  let o = 1 - Math.max(0, a - FADE_FROM) / FADE_OVER * (1 - GHOST_FLOOR)
  o = Math.max(GHOST_FLOOR, Math.min(1, o))
  if (u < 0) o = Math.max(0, 1 + u * 1.6)          // dissolves as it sweeps past
  el.style.transform =
    `translate3d(${(x + px).toFixed(1)}px, ${(y + py).toFixed(1)}px, ${z.toFixed(1)}px)` +
    ` rotateZ(${(u * TILT).toFixed(2)}deg)`
  el.style.opacity = o.toFixed(3)
  el.style.zIndex = String(Math.round(500 - a * 10))
  el.classList.toggle('is-front', a < 0.5)
  el.style.pointerEvents = o > 0.35 ? 'auto' : 'none'
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
let startTarget = 0
let lastX = 0
let lastT = 0
let vel = 0
function slotsPerPx() {
  const w = rootEl.value?.querySelector('.print')?.offsetWidth || 240
  return 1 / (w * 0.9)
}
function onDown(e) {
  if (open.value !== null) return
  dragging = true
  dragged = false
  downX = lastX = e.clientX
  downY = e.clientY
  startTarget = target
  lastT = performance.now()
  vel = 0
}
function onMove(e) {
  const el = rootEl.value?.querySelector('.proc-scene')
  if (el) {
    const r = el.getBoundingClientRect()
    mx = ((e.clientX - r.left) / Math.max(1, r.width)) * 2 - 1
    my = ((e.clientY - r.top) / Math.max(1, r.height)) * 2 - 1
  }
  if (!dragging) return
  const dx = e.clientX - downX
  if (Math.abs(dx) > 12 && Math.abs(dx) > Math.abs(e.clientY - downY)) dragged = true
  target = startTarget - dx * slotsPerPx()
  const now = performance.now()
  const dt = Math.max(16, now - lastT)
  vel = ((e.clientX - lastX) * slotsPerPx()) / (dt / 1000)
  lastX = e.clientX
  lastT = now
}
function onUp() {
  if (!dragging) return
  dragging = false
  // a throw carries on, then settles on a whole slot so a print is always centred
  target = Math.round(target - vel * 0.22)
  vel = 0
  restartAuto()
  setTimeout(() => { dragged = false }, 50)
}

function onPrintClick(k) {
  if (dragged) return
  if (open.value !== null) { close(); return }
  if (k === presented.value) openPrint(k)
  else glideTo(k)
}

// ── the lightbox: FLIP from the print's real position on screen ──────────────
function openPrint(k) {
  const src = rootEl.value?.querySelector(`.print[data-k="${k}"]`)
  if (!src) return
  const s = src.getBoundingClientRect()
  open.value = k
  stopAuto()
  nextTick(() => {
    // ⚠️ NOT a template ref: this <figure> lives inside the sections v-for, so a
    // ref would be collected as an ARRAY and `.getBoundingClientRect` would not
    // exist on it (the codebase has learned this one twice now).
    const el = rootEl.value?.querySelector('.lb-card')
    if (!el) return
    const t = el.getBoundingClientRect()
    const sc = s.width / t.width
    el.style.transition = 'none'
    el.style.transform =
      `translate(${(s.left + s.width / 2 - (t.left + t.width / 2)).toFixed(1)}px,` +
      ` ${(s.top + s.height / 2 - (t.top + t.height / 2)).toFixed(1)}px) scale(${sc.toFixed(3)})`
    el.style.opacity = '0.6'
    requestAnimationFrame(() => requestAnimationFrame(() => {
      el.style.transition = ''
      el.style.transform = 'none'
      el.style.opacity = '1'
    }))
  })
}
function close() {
  if (open.value === null) return
  const k = open.value
  const src = rootEl.value?.querySelector(`.print[data-k="${k}"]`)
  const el = rootEl.value?.querySelector('.lb-card')
  if (src && el) {
    const s = src.getBoundingClientRect()
    const t = el.getBoundingClientRect()
    el.style.transform =
      `translate(${(s.left + s.width / 2 - (t.left + t.width / 2)).toFixed(1)}px,` +
      ` ${(s.top + s.height / 2 - (t.top + t.height / 2)).toFixed(1)}px) scale(${(s.width / t.width).toFixed(3)})`
    el.style.opacity = '0'
    setTimeout(() => { open.value = null; restartAuto() }, 420)
  } else {
    open.value = null
    restartAuto()
  }
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

    rootEl.value.querySelectorAll('.print').forEach((el) => {
      place(el, slotOf(Number(el.dataset.k)))
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
  if (window.matchMedia?.('(hover: none)').matches) {
    hintText.value = 'swipe to move through · tap to open'
  }
  measure()
  rafId = requestAnimationFrame(tick)
  window.addEventListener('resize', onResize)
  window.addEventListener('keydown', onKey)
  const scene = rootEl.value?.querySelector('.proc-scene')
  if (scene && 'IntersectionObserver' in window) {
    io = new IntersectionObserver((e) => {
      inView.value = e[0].isIntersecting
      if (inView.value) { preload(); restartAuto() } else { stopAuto() }
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
  stopAuto()
  clearTimeout(resizeT)
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
.field {
  position: relative;
  width: var(--print-w);
  /* the mat's real height: 6% top + a 3:2 window at 88% width + the note + 6%.
     It was 1.3× the width, which left two thirds of the board empty. */
  height: calc(var(--print-w) * 0.8);
  transform-style: preserve-3d;
}

/* A mounted print: mat board, the picture behind glass, the note on the mat. */
.print {
  position: absolute;
  inset: 0;
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
  will-change: transform, opacity;
}
.mat {
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
.hint {
  font-family: 'Shadows Into Light', cursive;
  font-size: 1rem;
  color: #C3A6D8;
  opacity: 0.6;
}
.more {
  font-family: 'Bague', sans-serif;
  font-size: 0.6rem;
  letter-spacing: 0.28em;
  opacity: 0.34;
}

/* ── the opened print ── */
.lightbox {
  position: fixed;
  inset: 0;
  z-index: 80;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
}
.lightbox.on { pointer-events: auto; }
.lb-scrim {
  position: absolute;
  inset: 0;
  background: rgba(10, 6, 16, 0.86);
  opacity: 0;
  transition: opacity 0.45s ease;
}
.lightbox.on .lb-scrim { opacity: 1; }
.lb-card {
  position: relative;
  margin: 0;
  width: min(86vw, 46rem);
  box-sizing: border-box;
  padding: 2.2% 2.2% 0;
  background: #1D1429;
  box-shadow:
    inset 0 0 0 1px rgba(195, 166, 216, 0.3),
    0 50px 90px -30px rgba(0, 0, 0, 0.95);
  transform-origin: 50% 50%;
  transition: transform 0.62s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.42s ease;
}
.lb-card .glass { aspect-ratio: 3 / 2; }
.lb-card .glass img { filter: none; }
.lb-card .note {
  opacity: 0.92;
  font-size: clamp(1rem, 2vw, 1.35rem);
  padding: 1.1rem 0.4rem 1.2rem;
}

@media (max-width: 768px) {
  .proc-scene { padding: 6vh 5vw 7rem; --print-w: min(74vw, 20rem); }
  .spool { width: 240vw; }
  .mini { width: clamp(4.2rem, 20vw, 7rem); }
  .film { gap: 0.28rem; padding: 0.8rem 0; }
  .wordmark { font-size: clamp(1.6rem, 10vw, 3rem); padding-top: 12vh; }
  .proc-foot { padding-bottom: 3rem; }
  .lb-card { width: 88vw; }
}

@media (prefers-reduced-motion: reduce) {
  .room-grain { animation: none; }
  .lb-card { transition: opacity 0.3s ease; }
}
</style>
