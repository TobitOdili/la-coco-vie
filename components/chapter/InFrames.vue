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

        <!-- ── the folders ──
             A vertical run, each one stepped further right — a cascade, the way
             folders sit when you drop them somewhere. Drawn in the room's own
             materials (the print mat's fill and its lavender hairline) rather
             than as an OS icon, so it reads as part of this page and not as
             borrowed chrome. -->
        <div class="shelf">
          <button
            v-for="(f, k) in folders"
            type="button"
            :key="k"
            class="folder"
            :class="{ lit: openIdx === k }"
            :style="{ '--k': k }"
            :data-k="k"
            :aria-label="`${f.name} — empty, pictures coming soon`"
            @click="openFolder(k, $event)"
          >
            <span class="ic" aria-hidden="true">
              <span class="ic-tab" />
              <span class="ic-back" />
              <span class="ic-front" />
            </span>
            <span class="label">
              <span class="fname">{{ f.name }}</span>
              <span class="fmeta">EMPTY</span>
            </span>
          </button>
        </div>

        <footer class="arc-foot">
          <div class="more">{{ s.endSub }}</div>
        </footer>
      </div>
    </section>

    <!-- ── the window ──
         ⚠️ TELEPORTED TO <body>, and it has to be. `.room-inner` clips its own
         overflow for the film, so a window growing out of a folder could not
         leave that box — but the real reason is one level up: `.chapter-page` is
         `position: fixed; z-index: 10`, which makes it a STACKING CONTEXT, and
         nothing inside it can paint above a sibling of it no matter how high its
         own z-index. Measured before the fix: at (20,20) the topmost element was
         the site nav (`z-20`), sitting on top of a modal set to `z-index: 60`.
         Same trap as the raised print that a scrim painted over. Teleporting puts
         the layer beside the nav rather than under it; z-70 clears the nav (20)
         and the About panel (50) while staying under the custom cursor (100). -->
    <Teleport to="body">
    <div v-if="openIdx !== null" class="win-layer" :class="{ closing }">
      <div class="scrim" @click="close()" />
      <div
        class="win"
        role="dialog"
        aria-modal="true"
        :aria-label="openFolderData?.title"
      >
        <header class="win-bar">
          <span class="win-dots" aria-hidden="true"><i /><i /><i /></span>
          <span class="win-title">{{ openFolderData?.title }}</span>
          <button type="button" class="win-x" aria-label="Close" @click="close()">
            <svg viewBox="0 0 12 12" aria-hidden="true">
              <path d="M2 2 L10 10 M10 2 L2 10" stroke="currentColor" stroke-width="1.3" />
            </svg>
          </button>
        </header>
        <div class="win-body">
          <span class="empty-ic" aria-hidden="true">
            <span class="ic-tab" />
            <span class="ic-back" />
            <span class="ic-front" />
          </span>
          <p class="empty-msg">{{ emptyText }}</p>
          <p class="empty-sub">0 ITEMS</p>
        </div>
      </div>
    </div>
    </Teleport>
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

// ── the window ──────────────────────────────────────────────────────────────
const openIdx = ref(null)
const closing = ref(false)
const openFolderData = computed(() =>
  openIdx.value === null ? null : folders.value[openIdx.value]
)
let fromRect = null
let closeT = 0
let lastTrigger = null

// ⚠️ A real FLIP, not a fade. The window is laid out where it will END UP, then
// transformed back onto the folder icon that was clicked and released — so it
// genuinely grows out of that folder instead of appearing over it. Doing it the
// other way (animating width/height toward a target) lays out every frame and
// cannot be composited.
function mapTo(el, rect) {
  const to = el.getBoundingClientRect()
  if (!to.width || !to.height) return ''
  const sx = Math.max(0.04, rect.width / to.width)
  const sy = Math.max(0.04, rect.height / to.height)
  const dx = rect.left + rect.width / 2 - (to.left + to.width / 2)
  const dy = rect.top + rect.height / 2 - (to.top + to.height / 2)
  return `translate(${dx.toFixed(1)}px, ${dy.toFixed(1)}px) scale(${sx.toFixed(4)}, ${sy.toFixed(4)})`
}

async function openFolder(k, ev) {
  clearTimeout(closeT)
  closing.value = false
  lastTrigger = ev?.currentTarget || null
  const icon = lastTrigger?.querySelector('.ic')
  fromRect = (icon || lastTrigger)?.getBoundingClientRect() || null
  openIdx.value = k
  await nextTick()
  // ⚠️ document, not rootEl — the layer is teleported out of this component.
  const win = document.querySelector('.win-layer .win')
  if (!win || !fromRect) return
  const t = mapTo(win, fromRect)
  if (!t) return
  win.style.transition = 'none'
  win.style.transform = t
  win.style.opacity = '0'
  // ⚠️ Read a layout property to force the browser to commit that start state.
  // Without it both writes coalesce into one style recalc and the element simply
  // appears at its final position — the animation silently does not happen.
  void win.offsetWidth
  win.style.transition = ''
  win.style.transform = ''
  win.style.opacity = ''
  document.querySelector('.win-layer .win-x')?.focus?.({ preventScroll: true })
}

function close() {
  if (openIdx.value === null || closing.value) return
  const win = document.querySelector('.win-layer .win')
  closing.value = true
  if (win && fromRect) {
    win.style.transform = mapTo(win, fromRect)
    win.style.opacity = '0'
  }
  // Matches the CSS transition; the element is only unmounted once it has
  // finished travelling back into the folder it came out of.
  closeT = setTimeout(() => {
    openIdx.value = null
    closing.value = false
    lastTrigger?.focus?.({ preventScroll: true })
    lastTrigger = null
  }, 380)
}

function onKey(e) {
  if (e.key === 'Escape' && openIdx.value !== null) { e.preventDefault(); close() }
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
  clearTimeout(closeT)
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

/* ── the folders ── */
.shelf {
  position: relative;
  z-index: 20;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: clamp(1rem, 2.6vh, 1.9rem);
  /* ⚠️ No auto margin. `margin-bottom: auto` pinned the cascade to the top of the
     room, where its first folder landed directly on top of the IN FRAMES
     wordmark. Centred in the room instead, it clears the wordmark by ~120px at
     900px tall — and the footer is taken out of the flow below so it cannot drag
     the group upward again. */
  margin: 0;
}
.folder {
  /* Each one steps further right than the last — a cascade, not a list. */
  margin-inline-start: calc(var(--k, 0) * clamp(1.6rem, 4.5vw, 3.4rem));
  display: flex;
  align-items: center;
  gap: clamp(0.9rem, 2vw, 1.5rem);
  appearance: none;
  -webkit-appearance: none;
  border: 0;
  background: none;
  padding: 0.4rem;
  margin-block: 0;
  color: inherit;
  font: inherit;
  text-align: start;
  cursor: none;
  transition: transform 0.4s cubic-bezier(0.22, 1, 0.36, 1);
}
.folder:hover, .folder:focus-visible { outline: none; transform: translateX(6px); }

/* The icon: the print mat's own fill and lavender hairline, folded into a
   folder — three panels, so the front one can tip forward on its own. */
.ic {
  position: relative;
  flex: none;
  width: clamp(3.4rem, 7vw, 5.2rem);
  aspect-ratio: 5 / 4;
  --edge: rgba(195, 166, 216, 0.22);
}
.ic-tab, .ic-back, .ic-front {
  position: absolute;
  box-sizing: border-box;
  background: #17101F;
  box-shadow: inset 0 0 0 1px var(--edge);
  transition: box-shadow 0.4s ease, transform 0.45s cubic-bezier(0.22, 1, 0.36, 1);
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
/* the front flap — it tips forward as the folder opens */
.ic-front {
  inset: 42% 0 0 0;
  border-radius: 2px 2px 3px 3px;
  background: #1D1529;
  transform-origin: 50% 100%;
  transform: perspective(280px) rotateX(0deg);
}
.folder:hover .ic-front,
.folder:focus-visible .ic-front { transform: perspective(280px) rotateX(-26deg); }
.folder:hover .ic-tab,
.folder:hover .ic-back,
.folder:hover .ic-front,
.folder:focus-visible .ic-tab,
.folder:focus-visible .ic-back,
.folder:focus-visible .ic-front { box-shadow: inset 0 0 0 1px rgba(195, 166, 216, 0.5); }
/* held open while its window is up */
.folder.lit .ic-front { transform: perspective(280px) rotateX(-42deg); }
.folder.lit .ic-tab,
.folder.lit .ic-back,
.folder.lit .ic-front { box-shadow: inset 0 0 0 1px rgba(195, 166, 216, 0.62); }

.label { display: flex; flex-direction: column; gap: 0.3rem; min-width: 0; }
.fname {
  font-family: 'Shadows Into Light', 'Bradley Hand', cursive;
  font-size: clamp(1.05rem, 2.1vw, 1.55rem);
  line-height: 1;
  color: #C3A6D8;
  white-space: nowrap;
}
.fmeta {
  font-family: 'Bague', sans-serif;
  font-size: 0.54rem;
  letter-spacing: 0.28em;
  opacity: 0.32;
}

.arc-foot {
  /* Out of the flow, so the folders centre on the ROOM rather than on
     "folders + footer" as a block. */
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 20;
  text-align: center;
  /* ⚠️ Clears the floating popup dock, which is FIXED to the viewport bottom at
     1.75rem and stands ~62px tall. 4.5rem was enough while this footer was in
     flow (the room's own 6vh bottom padding sat under it too); taking it out of
     the flow removed that, and the line landed behind the dock. */
  padding-bottom: 7.5rem;
}
.more {
  font-family: 'Bague', sans-serif;
  font-size: 0.6rem;
  letter-spacing: 0.28em;
  opacity: 0.34;
}

/* ── the window ── */
.win-layer {
  position: fixed;
  inset: 0;
  /* Above the site nav (20) and the About panel (50); below the custom cursor
     (100) and the grain overlay (1000), both of which must stay on top. */
  z-index: 70;
  cursor: none;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 6vh 5vw;
  box-sizing: border-box;
}
.scrim {
  position: absolute;
  inset: 0;
  background: rgba(9, 5, 14, 0.62);
  backdrop-filter: blur(2px);
  opacity: 1;
  transition: opacity 0.34s ease;
  cursor: none;
}
.closing .scrim { opacity: 0; }

.win {
  position: relative;
  width: min(34rem, 100%);
  background: #1B1428;
  box-shadow:
    inset 0 0 0 1px rgba(195, 166, 216, 0.22),
    0 40px 90px -30px rgba(0, 0, 0, 0.95);
  /* The FLIP animates this; the JS only writes transform and opacity. */
  transition:
    transform 0.46s cubic-bezier(0.22, 1, 0.36, 1),
    opacity 0.3s ease;
  transform-origin: 50% 50%;
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
.win-x {
  flex: none;
  appearance: none;
  -webkit-appearance: none;
  border: 0;
  background: none;
  padding: 0.3rem;
  width: 1.5rem;
  height: 1.5rem;
  color: #C3A6D8;
  opacity: 0.6;
  cursor: none;
  transition: opacity 0.25s ease;
}
.win-x:hover, .win-x:focus-visible { outline: none; opacity: 1; }
.win-x svg { width: 100%; height: 100%; fill: none; }

.win-body {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.9rem;
  padding: clamp(2.2rem, 5.5vh, 3.4rem) 1.5rem clamp(2rem, 5vh, 3rem);
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
  .shelf { gap: 1.15rem; margin-top: 4vh; }
  .folder { gap: 0.85rem; }
  .win { width: 100%; }
}

@media (prefers-reduced-motion: reduce) {
  .win, .ic-front, .folder, .scrim { transition: none; }
  .room-grain { animation: none; }
}
</style>
