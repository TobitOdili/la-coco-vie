<template>
  <div ref="rootEl" class="in-frames">
    <!-- ── THE DECK ─────────────────────────────────────────────────────────
         A stack of mounted prints in a dark room, with three lengths of the
         same film crossing far behind them.

         ⚠️ NOTHING HERE IS SCROLL-DRIVEN AND NOTHING PINS THE PAGE. The spools
         autoplay on TIME (a seamless loop, see `phase`), and the deck is driven
         by interaction plus an autoflip timer. Scroll passes straight through
         this section — the three previous iterations all locked it, and locking
         is what made the chapter outstay its welcome. -->
    <section
      v-for="(s, i) in sections"
      :key="i"
      class="chapter-section room-scene deck-scene"
      :data-idx="i"
    >
      <!-- ── BACKGROUND: the reel, running on its own ── -->
      <div class="reel-room" aria-hidden="true">
        <div v-for="(sp, k) in SPOOLS" :key="k" class="spool"
          :style="{ '--angle': sp.angle + 'deg', '--top': sp.top + '%' }">
          <div class="film">
            <figure v-for="n in slots" :key="n" class="mini">
              <img :src="ready ? frameSrc(k, n) : undefined" alt="" decoding="async" />
            </figure>
          </div>
        </div>
      </div>

      <div class="room-grain" aria-hidden="true" />
      <div class="room-vignette" aria-hidden="true" />

      <!-- ── FOREGROUND: the deck ── -->
      <div class="deck-wrap" :class="{ lifted: open !== null }">
        <header class="deck-head">
          <h2 class="film-title"><span>OUR JOURNEY</span><span>IN FRAMES</span></h2>
          <div class="present sub">{{ s.sub }}</div>
        </header>

        <div
          class="deck"
          :class="{ 'is-open': open !== null }"
          @pointerdown="onDown"
          @pointermove="onMove"
          @pointerup="onUp"
          @pointercancel="onUp"
          @mouseenter="hovering = true"
          @mouseleave="hovering = false"
        >
          <button
            v-for="(c, k) in cards"
            :key="k"
            ref="cardEls"
            type="button"
            class="card"
            :class="cardClass(k)"
            :style="cardStyle(k)"
            :aria-hidden="rel(k) > VISIBLE"
            :tabindex="rel(k) === 0 ? 0 : -1"
            :aria-label="open === k ? `${c.note} — close` : `${c.note} — open`"
            @click="onCardClick(k)"
          >
            <span class="mount">
              <span class="shot">
                <img :src="ready ? c.src : undefined" :alt="c.note" decoding="async" />
              </span>
            </span>
            <span class="note">{{ c.note }}</span>
          </button>
        </div>

        <footer class="deck-foot">
          <div class="counter">
            {{ String(index + 1).padStart(2, '0') }} <i>/</i> {{ String(cards.length).padStart(2, '0') }}
          </div>
          <div class="hint">{{ hintText }}</div>
          <div class="more">{{ s.endSub }}</div>
        </footer>
      </div>

      <!-- tapping the room closes an opened card -->
      <div class="scrim" :class="{ on: open !== null }" @click="close()" aria-hidden="true" />
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
const cards = computed(() => reel.value?.cards || [])

// Three lengths of ONE film crossing behind the deck. `dir` is which way this one
// runs (film reverses around a roller, so alternating is authentic); `lead` offsets
// which frame it starts on, so the same strip never lines up with itself.
const SPOOLS = [
  { angle: -29, top: 19, dir: 1, lead: 0, speed: 26 },
  { angle: 17, top: 51, dir: -1, lead: 2, speed: 22 },
  { angle: -21, top: 80, dir: 1, lead: 4, speed: 29 },
]

const VISIBLE = 3            // cards deep enough in the stack to still be drawn
const AUTOFLIP_MS = 5200
const FLY_MS = 560           // must match .is-leaving / .is-entering in the CSS

const rootEl = ref(null)
const cardEls = ref([])
const ready = ref(false)
const slots = ref(22)
const index = ref(0)
const open = ref(null)
const openTf = ref('')
const leaving = ref(null)    // { i, dir } — the card currently flying off
const entering = ref(null)   // index of a card arriving from off-stage (going back)
const hovering = ref(false)
const inView = ref(false)
const hintText = ref('click a card to open it · drag to flip')

let rafId = 0
let io = null
let autoTimer = 0
let busy = false
let flyT = 0
let last = 0
let phase = 0                // px of film travelled, wrapped to one repeat
let period = 1               // px after which the strip repeats identically
let pitch = 200

const n = () => cards.value.length

// ── the deck ────────────────────────────────────────────────────────────────
// Position in the stack: 0 = the face of the deck, 1..VISIBLE = behind it.
const rel = (k) => (k - index.value + n() * 2) % Math.max(1, n())

function cardClass(k) {
  return {
    'is-face': rel(k) === 0 && open.value === null,
    'is-open': open.value === k,
    'is-leaving': leaving.value?.i === k,
    'is-entering': entering.value === k,
    'is-buried': rel(k) > VISIBLE && leaving.value?.i !== k,
  }
}

function cardStyle(k) {
  if (open.value === k) return { transform: openTf.value, zIndex: 60 }
  const r = rel(k)
  if (leaving.value?.i === k) return { zIndex: 50 }        // transform comes from the class
  if (entering.value === k) return { zIndex: 50 }
  // Each card behind the face sits a little lower, a little smaller, a little
  // turned — a real stack is never square.
  const t = Math.min(r, VISIBLE + 1)
  return {
    transform: `translate3d(${(t * 9).toFixed(1)}px, ${(t * 11).toFixed(1)}px, 0)` +
      ` rotate(${(t * 2.2).toFixed(2)}deg) scale(${(1 - t * 0.05).toFixed(3)})`,
    zIndex: 40 - t,
    opacity: r > VISIBLE ? 0 : 1,
  }
}

function go(dir) {
  const total = n()
  if (busy || total < 2 || open.value !== null) return
  busy = true
  clearTimeout(flyT)
  if (dir > 0) {
    leaving.value = { i: index.value, dir: 1 }
    index.value = (index.value + 1) % total
  } else {
    const target = (index.value - 1 + total) % total
    entering.value = target        // starts off-stage with transitions suppressed
    index.value = target
    // one frame with the start transform applied, then release it into the stack
    nextTick(() => requestAnimationFrame(() => requestAnimationFrame(() => {
      entering.value = null
    })))
  }
  flyT = setTimeout(() => { leaving.value = null; busy = false }, FLY_MS)
  restartAuto()
}

// ── open / close: the card animates ALL THE WAY from where it sits in the deck
// to the middle of the screen, and back again. FLIP, so there is no jump: we
// measure the card where it is, then transform it to the target. ──────────────
function openCard(k) {
  const el = cardEls.value?.[k]
  if (!el) return
  const r = el.getBoundingClientRect()
  const targetW = Math.min(window.innerWidth * 0.84, window.innerHeight * 0.62, 34 * remPx())
  const scale = Math.max(1, targetW / Math.max(1, r.width))
  const dx = window.innerWidth / 2 - (r.left + r.width / 2)
  const dy = window.innerHeight / 2 - (r.top + r.height / 2)
  openTf.value = `translate3d(${dx.toFixed(1)}px, ${dy.toFixed(1)}px, 0) scale(${scale.toFixed(3)}) rotate(0deg)`
  open.value = k
  stopAuto()
}
function close() {
  if (open.value === null) return
  open.value = null
  openTf.value = ''
  restartAuto()
}
function onCardClick(k) {
  if (dragged) return                       // a swipe must not also open a card
  if (open.value === k) { close(); return }
  if (open.value !== null) { close(); return }
  if (rel(k) === 0) openCard(k)
  else go(1)                                // tapping the stack behind = next
}

// ── drag / swipe ────────────────────────────────────────────────────────────
let downX = 0
let downY = 0
let dragging = false
let dragged = false
function onDown(e) {
  if (open.value !== null) return
  dragging = true
  dragged = false
  downX = e.clientX
  downY = e.clientY
}
function onMove(e) {
  if (!dragging) return
  const dx = e.clientX - downX
  if (Math.abs(dx) > 14 && Math.abs(dx) > Math.abs(e.clientY - downY)) dragged = true
}
function onUp(e) {
  if (!dragging) return
  dragging = false
  const dx = e.clientX - downX
  if (Math.abs(dx) > 42 && Math.abs(dx) > Math.abs(e.clientY - downY)) {
    go(dx < 0 ? 1 : -1)
    // swallow the click the browser synthesises after a drag
    setTimeout(() => { dragged = false }, 60)
  } else {
    dragged = false
  }
}
function onKey(e) {
  if (!inView.value) return
  if (e.key === 'Escape') close()
  else if (e.key === 'ArrowRight') go(1)
  else if (e.key === 'ArrowLeft') go(-1)
}

// ── autoflip ────────────────────────────────────────────────────────────────
// Runs only while the section is on screen and nobody is touching it.
function stopAuto() { clearInterval(autoTimer); autoTimer = 0 }
function restartAuto() {
  stopAuto()
  if (!inView.value || open.value !== null) return
  autoTimer = setInterval(() => {
    if (hovering.value || dragging || open.value !== null) return
    go(1)
  }, AUTOFLIP_MS)
}

// ── the reel, on time ───────────────────────────────────────────────────────
let _rem = 0
const remPx = () => (_rem ||= parseFloat(getComputedStyle(document.documentElement).fontSize) || 16)

function frameSrc(spoolIdx, slot) {
  const list = frames.value
  if (!list.length) return undefined
  return list[(SPOOLS[spoolIdx].lead + slot) % list.length]
}

function preload() {
  const srcs = [...new Set([...frames.value, ...cards.value.map((c) => c.src)])]
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

// The strip repeats every `frames.length` frames, so translating by exactly that
// distance puts an identical frame in every position — which is what makes the
// loop seamless with no duplicated DOM. The film only has to be long enough to
// overhang the room by one repeat at each end.
function measure() {
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

function tick(now) {
  if (!last) last = now
  const dt = Math.min(0.05, (now - last) / 1000)   // clamp: a backgrounded tab
  last = now
  if (inView.value) {
    phase += dt
    const films = rootEl.value?.querySelectorAll('.film') || []
    films.forEach((f, i) => {
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
    hintText.value = 'tap a card to open it · swipe to flip'
  }
  measure()
  rafId = requestAnimationFrame(tick)
  window.addEventListener('resize', onResize)
  window.addEventListener('keydown', onKey)
  const scene = rootEl.value?.querySelector('.deck-scene')
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
  clearTimeout(flyT)
})
</script>

<style scoped>
/* The dark room. The section is a normal height and nothing sticks — scroll goes
   straight through it. */
.room-scene { position: relative; color: #EFE8F5; background: #241A33; }
.deck-scene {
  min-height: 100dvh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10vh 6vw 9vh;
  box-sizing: border-box;
}

/* ── the reel, far behind ── */
.reel-room {
  position: absolute;
  inset: 0;
  overflow: hidden;       /* clip the strips, NOT the deck — an opened card grows */
  pointer-events: none;
  /* ⚠️ ONE KNOB. The reel is deep background here, well under the deck: it reads
     as texture in the room rather than as something you are meant to look at. */
  --reel-veil: 0.16;
}
.spool {
  position: absolute;
  left: 50%;
  top: var(--top);
  width: 150vw;
  display: flex;
  justify-content: center;
  transform: translate(-50%, -50%) rotate(var(--angle));
  transform-origin: 50% 50%;
}
.film {
  position: relative;
  display: flex;
  align-items: center;
  width: max-content;
  gap: 0.4rem;
  padding: 1.2rem 0;
  /* Stock and perforations in ONE paint: as absolutely-positioned children they
     rasterise as their own layers on a strip this long and settle a beat late. */
  background-color: #221A30;
  background-image:
    repeating-linear-gradient(to right, rgba(195, 166, 216, 0.4) 0 0.5rem, transparent 0.5rem 1.4rem),
    repeating-linear-gradient(to right, rgba(195, 166, 216, 0.4) 0 0.5rem, transparent 0.5rem 1.4rem);
  background-size: 100% 0.5rem;
  background-position: 0 0.34rem, 0 calc(100% - 0.34rem);
  background-repeat: repeat-x;
  opacity: var(--reel-veil);
  will-change: transform;
}
.mini {
  flex: none;
  width: clamp(6rem, 11vw, 12rem);
  aspect-ratio: 3 / 2;
  margin: 0;
  background: #1B1428;
  overflow: hidden;
}
.mini img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  filter: grayscale(1) brightness(1.05) contrast(0.88);
}

.room-grain, .room-vignette { position: absolute; inset: 0; pointer-events: none; }
.room-grain {
  background-image: var(--noise-url);
  background-size: 200px 200px;
  opacity: 0.13;
  mix-blend-mode: overlay;
  animation: grain-shift 0.6s steps(1, end) infinite;
  z-index: 2;
}
.room-vignette {
  box-shadow: inset 0 0 14rem 4rem rgba(10, 6, 16, 0.72);
  z-index: 3;
}
@keyframes grain-shift {
  0%   { background-position: 0 0 }
  20%  { background-position: -37px 21px }
  40%  { background-position: 44px -18px }
  60%  { background-position: -22px -41px }
  80%  { background-position: 29px 33px }
  100% { background-position: 0 0 }
}

/* ── the deck ── */
.deck-wrap {
  position: relative;
  /* ⚠️ This z-index makes a STACKING CONTEXT, so the opened card's own z-index is
     resolved INSIDE it — the scrim (z 50, a sibling of this wrap) painted straight
     over the card it was supposed to sit behind. The wrap itself has to clear the
     scrim while a card is open. */
  z-index: 10;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: clamp(1.4rem, 4vh, 2.6rem);
  width: 100%;
}
.deck-wrap.lifted { z-index: 60; }
/* The wrap has to clear the scrim so the opened card is lit — but that lifts the
   title and the footer over it too, leaving them crisp while everything else dims.
   Fade them by hand so the card is the only thing on. */
.deck-wrap.lifted .deck-head,
.deck-wrap.lifted .deck-foot { opacity: 0.12; }
.deck-head, .deck-foot { transition: opacity 0.45s ease; }
.deck-head { text-align: center; }
.film-title {
  font-family: 'Monoton', cursive;
  font-weight: 400;
  font-size: clamp(1.5rem, 4vw, 3rem);
  line-height: 1.2;
  margin: 0 0 0.9rem;
  color: #EFE8F5;
}
.film-title span { display: block; }
.present {
  font-family: 'Bague', sans-serif;
  font-size: 0.7rem;
  letter-spacing: 0.32em;
  opacity: 0.6;
}

.deck {
  position: relative;
  width: var(--card-w);
  height: var(--card-h);
  --card-w: clamp(13rem, 22vw, 17rem);
  --card-h: calc(var(--card-w) * 1.24);
  touch-action: pan-y;      /* let the page scroll vertically; we own the x-drag */
}

/* A mounted print: dark card stock, the picture inset in its own frame, the note
   written underneath. Deliberately NOT US's white taped polaroid. */
.card {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  padding: 0.7rem 0.7rem 0.55rem;
  box-sizing: border-box;
  border: 0;
  appearance: none;
  -webkit-appearance: none;
  background: #1B1428;
  box-shadow:
    inset 0 0 0 1px rgba(195, 166, 216, 0.16),
    0 24px 44px -22px rgba(0, 0, 0, 0.9);
  color: inherit;
  font: inherit;
  cursor: none;
  transform-origin: 50% 50%;
  transition:
    transform 0.62s cubic-bezier(0.22, 1, 0.36, 1),
    opacity 0.42s ease,
    box-shadow 0.4s ease;
  will-change: transform;
}
.mount {
  position: relative;
  display: block;
  width: 100%;
  flex: 1 1 auto;
  min-height: 0;
  padding: 0.42rem;
  box-sizing: border-box;
  background: #120C1B;
  box-shadow: inset 0 0 0 1px rgba(195, 166, 216, 0.22);
}
.shot {
  display: block;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: #0E0916;
}
.shot img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transition: filter 0.5s ease;
  filter: grayscale(0.35) contrast(1.02);
}
.is-face .shot img,
.is-open .shot img { filter: none; }
.note {
  font-family: 'Shadows Into Light', 'Bradley Hand', cursive;
  font-size: clamp(0.9rem, 1.5vw, 1.1rem);
  line-height: 1.1;
  color: #C3A6D8;
  opacity: 0.9;
  white-space: nowrap;
}

/* the face of the deck lifts a little, the way the home cards do */
.is-face:hover,
.is-face:focus-visible {
  outline: none;
  box-shadow:
    inset 0 0 0 1px rgba(195, 166, 216, 0.3),
    0 34px 54px -22px rgba(0, 0, 0, 0.95);
}
.deck:not(.is-open) .is-face:hover { transform: translate3d(0, -10px, 0) scale(1.02) !important; }

.is-buried { pointer-events: none; }
.is-open {
  box-shadow: 0 50px 90px -30px rgba(0, 0, 0, 0.95);
  cursor: none;
}

/* flying off the top of the deck, and arriving back onto it */
.is-leaving {
  transform: translate3d(0, -52%, 0) rotate(-9deg) scale(1.04) !important;
  opacity: 0;
  transition:
    transform 0.56s cubic-bezier(0.4, 0, 0.2, 1),
    opacity 0.56s ease;
  pointer-events: none;
}
.is-entering {
  transform: translate3d(0, -52%, 0) rotate(9deg) scale(1.04) !important;
  opacity: 0;
  transition: none !important;
}

.deck-foot {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  text-align: center;
}
.counter {
  font-family: 'Bague', sans-serif;
  font-size: 0.78rem;
  letter-spacing: 0.26em;
}
.counter i { font-style: normal; opacity: 0.4; margin: 0 0.15rem; }
.hint {
  font-family: 'Shadows Into Light', cursive;
  font-size: 1rem;
  color: #C3A6D8;
  opacity: 0.62;
}
.more {
  font-family: 'Bague', sans-serif;
  font-size: 0.62rem;
  letter-spacing: 0.28em;
  opacity: 0.38;
}

.scrim {
  position: absolute;
  inset: 0;
  z-index: 50;
  background: rgba(12, 7, 20, 0.72);
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.5s ease;
}
.scrim.on { opacity: 1; pointer-events: auto; }

@media (max-width: 768px) {
  .deck-scene { padding: 8vh 6vw 9rem; }
  .spool { width: 235vw; }
  .mini { width: clamp(4.6rem, 22vw, 7.5rem); }
  .film { gap: 0.28rem; padding: 0.85rem 0; }
  .film {
    background-image:
      repeating-linear-gradient(to right, rgba(195, 166, 216, 0.4) 0 0.36rem, transparent 0.36rem 1rem),
      repeating-linear-gradient(to right, rgba(195, 166, 216, 0.4) 0 0.36rem, transparent 0.36rem 1rem);
    background-size: 100% 0.36rem;
    background-position: 0 0.26rem, 0 calc(100% - 0.26rem);
  }
  .deck { --card-w: min(62vw, 15rem); }
  .film-title { font-size: clamp(1.3rem, 7vw, 2rem); }
}

@media (prefers-reduced-motion: reduce) {
  .room-grain { animation: none; }
  .card { transition: opacity 0.3s ease; }
}
</style>
