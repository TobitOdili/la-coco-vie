<template>
  <div ref="rootEl" class="in-frames">
    <!-- ── THE ARCHIVE ──────────────────────────────────────────────────────
         The chapter's subject used to be nine of the couple's photographs,
         mounted and spiralling out of the dark. Those were their HISTORY, and
         the photographs this chapter is about are the WEDDING's — which do not
         exist yet. So the page stopped pretending: three labelled folders, one
         per event, each of which opens to an empty window that says so.

         ⚠️ The room is unchanged and load-bearing: the same film spools drifting
         far behind on their own clock, the same grain, vignette and big faint
         wordmark. Take those away and this is a file browser on a dark
         rectangle. They are what keep it the same chapter.

         ⚠️ THE SECTION IS NO LONGER PINNED. The pin existed to give the nine
         prints somewhere to travel; with nothing to scroll through it would be
         5.6 screens of dead height. Back to one screen. -->
    <section
      v-for="(s, i) in sections"
      :key="i"
      class="chapter-section room-scene arc-scene"
      :data-idx="i"
    >
      <div class="room-inner">
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

        <!-- the wordmark sits BEHIND the subject, the way the homepage's
             tagline sits behind the ring -->
        <h2 class="wordmark" aria-hidden="true">IN FRAMES</h2>

        <div class="room-grain" aria-hidden="true" />
        <div class="room-vignette" aria-hidden="true" />

        <!-- ── the window ──
             It is not a popup any more. One window sits in the room with the
             folders inside it, and clicking a folder NAVIGATES the window — the
             way a file browser does — rather than throwing a second window over
             the page. That also means no overlay, no scrim, and none of the
             stacking-context fight a fixed layer inside `.chapter-page` loses. -->
        <div class="win">
          <header class="win-bar">
            <span class="win-dots" aria-hidden="true"><i /><i /><i /></span>
            <!-- ⚠️ Always rendered, only hidden. With `v-if` the bar had no back
                 button at the root and gained a 1.35rem one inside a folder,
                 which made the whole WINDOW 7px taller the moment you navigated
                 — the exact shift the stacked views exist to prevent. Reserve
                 the slot with `visibility`, never `display: none`. -->
            <button
              type="button"
              class="win-back"
              :class="{ off: path === null }"
              :tabindex="path === null ? -1 : 0"
              :aria-hidden="path === null || null"
              aria-label="Back to all folders"
              @click="back()"
            >
              <svg viewBox="0 0 12 12" aria-hidden="true">
                <path d="M7.5 1.5 L3 6 L7.5 10.5" stroke="currentColor" stroke-width="1.3" fill="none" />
              </svg>
            </button>
            <span class="win-title">{{ path === null ? s.title : folders[path]?.title }}</span>
          </header>

          <!-- ⚠️ Both views live in ONE grid cell, so the window is always as tall
               as its tallest view and navigating cannot resize it under the
               reader. Same reason the Big Day's day cards are stacked. -->
          <div class="win-views">
            <div class="view view-root" :class="{ on: path === null }" :aria-hidden="path !== null || null">
              <ul class="grid-list">
                <li v-for="(f, k) in folders" :key="k">
                  <button
                    type="button"
                    class="folder"
                    :class="{ opening: opening === k }"
                    :data-k="k"
                    :tabindex="path === null ? 0 : -1"
                    :aria-label="`${f.name} — empty, ${emptyText.toLowerCase()}`"
                    @click="enter(k)"
                  >
                    <span class="ic" aria-hidden="true">
                      <span class="ic-tab" />
                      <span class="ic-back" />
                      <span class="ic-front" />
                    </span>
                    <span class="fname">{{ f.name }}</span>
                    <span class="fmeta">EMPTY</span>
                  </button>
                </li>
              </ul>
            </div>

            <div class="view view-empty" :class="{ on: path !== null }" :aria-hidden="path === null || null">
              <span class="empty-ic" aria-hidden="true">
                <span class="ic-tab" />
                <span class="ic-back" />
                <span class="ic-front" />
              </span>
              <p class="empty-msg">{{ emptyText }}</p>
            </div>
          </div>

          <footer class="win-status">
            {{ path === null ? `${folders.length} FOLDERS` : '0 ITEMS' }}
          </footer>
        </div>

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
const folders = computed(() => reel.value?.folders || [])
const emptyText = computed(() => reel.value?.empty || 'pictures coming soon')

const rootEl = ref(null)
const ready = ref(false)
const slots = ref(14)
const inView = ref(false)

// ── navigating the window ──────────────────────────────────────────────────
// `path` is null at the root (the folders) or a folder index (its contents).
// ⚠️ Clicking is the ONLY trigger — hovering does nothing but brighten the
// hairline. A folder that fell open under the pointer read as a preview of
// something that was about to happen on its own.
const path = ref(null)
const opening = ref(null)
let navT = 0

// The folder is given time to actually OPEN before the window moves on, so the
// two read as one action — you open the folder, then you are inside it — rather
// than as a click that happens to be followed by a transition.
const OPEN_MS = 300

function enter(k) {
  if (path.value !== null) return
  clearTimeout(navT)
  opening.value = k
  navT = setTimeout(() => { path.value = k }, OPEN_MS)
}

function back() {
  clearTimeout(navT)
  path.value = null
  // the folder closes again on the way out
  navT = setTimeout(() => { opening.value = null }, 220)
}

function onKey(e) {
  if (e.key === 'Escape' && path.value !== null) { e.preventDefault(); back() }
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
let pitch = 200
let period = 1000
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

function preload() {
  const srcs = [...new Set(frames.value)]
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

// ── the loop ────────────────────────────────────────────────────────────────
// Time-based, not scroll-based: the film runs at its own pace whether or not the
// visitor is moving. Nothing else on this page animates per frame.
// ⚠️ Queries the DOM inside tick() — a template ref used inside v-for is an
// ARRAY, and reading `.style` off it throws on frame 1, killing the loop
// silently (rule #2, AUDIT #18).
let rafId = 0
let last = 0
let phase = 0

function tick(now) {
  if (!last) last = now
  const dt = Math.min(0.05, (now - last) / 1000)
  last = now
  if (inView.value && rootEl.value) {
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

let io = null
let resizeT = 0
const onResize = () => { clearTimeout(resizeT); resizeT = setTimeout(measure, 150) }

onMounted(() => {
  preload()
  nextTick(measure)
  const scene = rootEl.value?.querySelector('.arc-scene')
  if (scene) {
    io = new IntersectionObserver(
      (entries) => { for (const e of entries) inView.value = e.isIntersecting },
      // A screen early, so the film is already running by the time it is seen.
      { rootMargin: '80% 0px', threshold: 0 }
    )
    io.observe(scene)
  }
  window.addEventListener('resize', onResize)
  window.addEventListener('keydown', onKey)
  rafId = requestAnimationFrame(tick)
})
onBeforeUnmount(() => {
  io?.disconnect()
  window.removeEventListener('resize', onResize)
  window.removeEventListener('keydown', onKey)
  cancelAnimationFrame(rafId)
  clearTimeout(resizeT)
  clearTimeout(navT)
})
</script>

<style scoped>
.room-scene { position: relative; color: #EFE8F5; background: #241A33; }
.arc-scene { position: relative; min-height: 100dvh; }

/* ⚠️ overflow:hidden lives on the INNER wrapper, never on the scene root. The
   room's film has to be clipped, but a scene root that clips becomes the
   containment box for anything sticky inside it (rule #5, three occurrences). */
.room-inner {
  position: relative;
  min-height: 100dvh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  padding: 6vh 5vw 6vh;
  box-sizing: border-box;
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

/* The wordmark behind the subject — the homepage puts its tagline here too. */
.wordmark {
  position: absolute;
  inset: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  font-family: 'Monoton', cursive;
  font-weight: 400;
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

/* ── the folders, inside the window ── */
.folder {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.55rem;
  appearance: none;
  -webkit-appearance: none;
  border: 0;
  background: none;
  padding: clamp(0.7rem, 2vw, 1.1rem) 0.3rem;
  color: inherit;
  font: inherit;
  cursor: none;
  transition: background 0.3s ease;
}
/* ⚠️ Hover does NOT open the folder — only a click does. A flap that fell open
   under the pointer read as a preview of something about to happen by itself.
   Hover is a faint wash and a brighter hairline, nothing more. */
.folder:hover, .folder:focus-visible {
  outline: none;
  background: rgba(195, 166, 216, 0.05);
}

/* The icon: the print mat's own fill and lavender hairline, folded into a
   folder — three panels, so the front one can tip forward on its own. */
.ic {
  position: relative;
  flex: none;
  width: clamp(2.6rem, 7vw, 3.9rem);
  aspect-ratio: 5 / 4;
  --edge: rgba(195, 166, 216, 0.22);
}
.ic-tab, .ic-back, .ic-front {
  position: absolute;
  box-sizing: border-box;
  background: #17101F;
  box-shadow: inset 0 0 0 1px var(--edge);
  transition: box-shadow 0.35s ease, transform 0.34s cubic-bezier(0.3, 1.05, 0.4, 1);
}
/* the little tab, top-left, like every folder ever drawn */
.ic-tab {
  left: 0;
  top: 0;
  width: 44%;
  height: 22%;
  border-radius: 3px 6px 0 0;
}
.ic-back { inset: 16% 0 0 0; border-radius: 0 4px 3px 3px; }
/* the front flap — it tips forward only once the folder is opened */
.ic-front {
  inset: 42% 0 0 0;
  border-radius: 2px 2px 3px 3px;
  background: #1D1529;
  transform-origin: 50% 100%;
  transform: perspective(280px) rotateX(0deg);
}
.folder:hover .ic-tab,
.folder:hover .ic-back,
.folder:hover .ic-front,
.folder:focus-visible .ic-tab,
.folder:focus-visible .ic-back,
.folder:focus-visible .ic-front { box-shadow: inset 0 0 0 1px rgba(195, 166, 216, 0.5); }

/* THE opening — the one thing a click animates before the window moves on. */
.folder.opening .ic-front { transform: perspective(280px) rotateX(-58deg); }
.folder.opening .ic-tab,
.folder.opening .ic-back,
.folder.opening .ic-front { box-shadow: inset 0 0 0 1px rgba(195, 166, 216, 0.62); }

.fname {
  font-family: 'Shadows Into Light', 'Bradley Hand', cursive;
  font-size: clamp(0.85rem, 2vw, 1.15rem);
  line-height: 1.15;
  color: #C3A6D8;
  text-align: center;
}
.fmeta {
  font-family: 'Bague', sans-serif;
  font-size: 0.5rem;
  letter-spacing: 0.24em;
  opacity: 0.3;
}

/* ── the window ── */
.win {
  position: relative;
  z-index: 20;
  width: min(36rem, 100%);
  background: #1B1428;
  box-shadow:
    inset 0 0 0 1px rgba(195, 166, 216, 0.22),
    0 40px 90px -30px rgba(0, 0, 0, 0.95);
}
.win-bar {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.6rem 0.7rem 0.6rem 0.85rem;
  border-bottom: 1px solid rgba(195, 166, 216, 0.16);
}
.win-dots { display: flex; gap: 0.34rem; flex: none; }
.win-dots i {
  width: 0.42rem;
  height: 0.42rem;
  border-radius: 50%;
  background: rgba(195, 166, 216, 0.3);
}
.win-title {
  flex: 1 1 auto;
  font-family: 'Bague', sans-serif;
  font-size: 0.6rem;
  letter-spacing: 0.28em;
  text-transform: uppercase;
  opacity: 0.82;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.win-back {
  flex: none;
  appearance: none;
  -webkit-appearance: none;
  border: 0;
  background: none;
  padding: 0.25rem;
  width: 1.35rem;
  height: 1.35rem;
  margin-inline-start: -0.1rem;
  color: #C3A6D8;
  opacity: 0.7;
  cursor: none;
  transition: opacity 0.25s ease;
}
.win-back.off { visibility: hidden; pointer-events: none; }
.win-back:hover, .win-back:focus-visible { outline: none; opacity: 1; }
.win-back svg { width: 100%; height: 100%; display: block; }

/* ⚠️ ONE grid cell for both views: the window is then always as tall as its
   tallest view, so navigating into a folder cannot resize it under the reader.
   The same fix as the Big Day's stacked day cards, and for the same reason — a
   reserved height can only ever be right for one of the two. */
.win-views { display: grid; }
.view {
  grid-area: 1 / 1;
  opacity: 0;
  pointer-events: none;
  /* ⚠️ NO lateral travel. The user asked for the opening and nothing sliding
     side to side, so a view goes forward and back in DEPTH (a small scale) and
     fades — you move into the folder rather than the window moving across. */
  transform: scale(0.97);
  transition: opacity 0.28s ease, transform 0.34s cubic-bezier(0.22, 1, 0.36, 1);
}
.view.on { opacity: 1; pointer-events: auto; transform: none; }
/* the outgoing root recedes rather than rising, so the pair reads as depth */
.view-root:not(.on) { transform: scale(1.04); }

.grid-list {
  list-style: none;
  margin: 0;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: clamp(0.4rem, 1.5vw, 1rem);
  padding: clamp(1.8rem, 4.5vh, 2.8rem) clamp(0.9rem, 3vw, 1.8rem);
}

.view-empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  padding: clamp(1.8rem, 4.5vh, 2.8rem) 1.5rem;
  text-align: center;
}

.win-status {
  font-family: 'Bague', sans-serif;
  font-size: 0.54rem;
  letter-spacing: 0.28em;
  opacity: 0.42;
  padding: 0.55rem 0.85rem;
  border-top: 1px solid rgba(195, 166, 216, 0.14);
}
/* the same folder, drawn large and faint — an empty directory */
.empty-ic {
  position: relative;
  width: clamp(3.6rem, 9vw, 5rem);
  aspect-ratio: 5 / 4;
  --edge: rgba(195, 166, 216, 0.3);
  opacity: 0.75;
}
.empty-ic .ic-front { transform: perspective(280px) rotateX(-34deg); }
.empty-msg {
  margin: 0;
  font-family: 'Shadows Into Light', 'Bradley Hand', cursive;
  font-size: clamp(1.1rem, 2.4vw, 1.5rem);
  line-height: 1;
  color: #C3A6D8;
}
.empty-sub {
  margin: 0;
  font-family: 'Bague', sans-serif;
  font-size: 0.56rem;
  letter-spacing: 0.28em;
  /* 0.3 on this ground was effectively invisible — it read as an empty gap. */
  opacity: 0.55;
}

@media (max-width: 768px) {
  .room-inner { padding: 5vh 7vw 5vh; }
  .film { gap: 0.28rem; padding: 0.8rem 0; }
  .win { width: 100%; }
  .grid-list { gap: 0.25rem; padding: 1.6rem 0.6rem; }
  .folder { padding: 0.6rem 0.15rem; gap: 0.45rem; }
  .fname { font-size: 0.82rem; }
}

@media (prefers-reduced-motion: reduce) {
  .ic-front, .folder, .view { transition: none; }
  .room-grain { animation: none; }
}
</style>
