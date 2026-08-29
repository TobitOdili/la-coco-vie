<template>
  <div ref="rootEl" class="in-frames">
    <template v-for="(s, i) in sections" :key="i">
      <!-- ── Title · you land here. Nothing running yet. ── -->
      <section v-if="s.kind === 'title'" class="chapter-section room-scene scene-title" :data-idx="i">
        <div class="title-card">
          <div class="present">{{ s.present }}</div>
          <h2 class="film-title"><span>OUR JOURNEY</span><span>IN FRAMES</span></h2>
          <div class="present sub">{{ s.sub }}</div>
        </div>
      </section>

      <!-- ── Spools · three lengths of ONE film crossing the page. Every spool is
           driven by the same advance, so they run as a single unit; the direction
           alternates the way film reverses around a roller. ── -->
      <section v-else-if="s.kind === 'spools'" class="chapter-section room-scene spools-scene" :data-idx="i">
        <div class="spools-sticky">
          <div class="watermark" aria-hidden="true">{{ s.watermark }}</div>

          <div v-for="(sp, k) in SPOOLS" :key="k" class="spool"
            :style="{ '--angle': sp.angle + 'deg', '--top': sp.top + '%', '--z': sp.z }">
            <div class="film" :data-dir="sp.dir">
              <span class="perf top" aria-hidden="true" />
              <span class="perf bot" aria-hidden="true" />
              <figure v-for="n in SLOTS" :key="n" class="mini">
                <img :src="ready ? frameSrc(k, n) : undefined" alt="" aria-hidden="true" decoding="async" />
              </figure>
            </div>
          </div>

          <div class="grain" aria-hidden="true" />
          <div class="vignette" aria-hidden="true" />
        </div>
      </section>

      <!-- ── End of reel ── -->
      <section v-else-if="s.kind === 'end'" class="chapter-section room-scene scene-end" :data-idx="i">
        <div class="title-card">
          <div class="film-title small">END OF REEL</div>
          <div class="present sub">MORE EXPOSURES AFTER OCTOBER 27</div>
        </div>
      </section>
    </template>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'

const props = defineProps({
  sections: { type: Array, required: true },
})

const frames = computed(() => props.sections.find((s) => s.kind === 'spools')?.frames || [])

// The three lengths of film. `dir` is which way this one runs (film reverses
// around a roller, so alternating is authentic, not a cheat); `lead` offsets which
// exposure it starts on, so the one leaving a spool is the one entering the next.
const SPOOLS = [
  { angle: -29, top: 19, dir: 1, lead: 0, z: 3 },
  { angle: 17, top: 51, dir: -1, lead: 5, z: 2 },
  { angle: -21, top: 84, dir: 1, lead: 11, z: 1 },
]
// Enough frames to overhang both edges at every angle; the film only ever travels
// two pitches before it wraps, so the ends never come into view.
const SLOTS = 16
const ADVANCE_FRAMES = 15   // frames of film pulled across the whole scene

const rootEl = ref(null)
const ready = ref(false)
let rafId = 0
let io = null
let pitches = []

// Alternate the exposures along each spool, continuing the count from the spool
// before it — so it reads as one strip of film, not three loops.
function frameSrc(spoolIdx, slot) {
  const list = frames.value
  if (!list.length) return undefined
  return list[(SPOOLS[spoolIdx].lead + slot) % list.length]
}

// Two files, both small. Requested as the spools come into range rather than on
// load, so the title paints first; soft, never a gate.
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

// Pitch = the real distance between two frames, measured rather than assumed, so
// the wrap lands exactly on the pattern and never shows a seam.
function measure() {
  const films = rootEl.value?.querySelectorAll('.film') || []
  pitches = [...films].map((f) => {
    const m = f.querySelectorAll('.mini')
    return m.length > 1 ? m[1].offsetLeft - m[0].offsetLeft : 220
  })
}

function tick() {
  const root = rootEl.value
  if (root) {
    const vh = window.innerHeight
    const scene = root.querySelector('.spools-scene')
    if (scene) {
      const r = scene.getBoundingClientRect()
      const p = Math.min(1, Math.max(0, -r.top / Math.max(1, r.height - vh)))
      const advance = p * ADVANCE_FRAMES

      // The exposures alternate, so the pattern repeats every 2 frames: wrapping
      // the travel at two pitches keeps the film running forever without ever
      // needing to re-assign a src, and the wrap is invisible.
      const films = root.querySelectorAll('.film')
      films.forEach((f, i) => {
        const pitch = pitches[i] || 220
        const dir = Number(f.dataset.dir || 1)
        const off = (((advance % 2) + 2) % 2) * pitch
        f.style.transform = `translate3d(${(-dir * off).toFixed(2)}px, 0, 0)`
      })
    }
  }
  rafId = requestAnimationFrame(tick)
}

let resizeT = 0
const onResize = () => { clearTimeout(resizeT); resizeT = setTimeout(measure, 150) }

onMounted(() => {
  measure()
  rafId = requestAnimationFrame(tick)
  window.addEventListener('resize', onResize)
  const scene = rootEl.value?.querySelector('.spools-scene')
  if (scene && 'IntersectionObserver' in window) {
    io = new IntersectionObserver(
      (e) => { if (e[0].isIntersecting) { preload(); io.disconnect(); io = null } },
      { rootMargin: '120% 0px' }
    )
    io.observe(scene)
  } else {
    preload()
  }
  // The frames have no intrinsic size until they decode; re-measure once they do.
  document.fonts?.ready.then(() => setTimeout(measure, 60))
})
onBeforeUnmount(() => {
  cancelAnimationFrame(rafId)
  window.removeEventListener('resize', onResize)
  io?.disconnect()
  clearTimeout(resizeT)
})
</script>

<style scoped>
/* One flat room, cut into and out of. NO gradients, and no overflow:hidden on a
   scene root — it breaks position:sticky. */
.room-scene { position: relative; color: #EFE8F5; background: #241A33; }
.scene-title, .scene-end {
  display: flex;
  align-items: center;
  justify-content: center;
}
.scene-title { min-height: 104dvh; }
.scene-end { min-height: 84dvh; }

.title-card { text-align: center; padding: 0 8vw; }
.present {
  font-family: 'Bague', sans-serif;
  font-size: 0.78rem;
  letter-spacing: 0.34em;
  opacity: 0.65;
}
.film-title {
  font-family: 'Monoton', cursive;
  font-size: clamp(2rem, 6vw, 4.8rem);
  line-height: 1.18;
  margin: 1.4rem 0;
  color: #EFE8F5;
  font-weight: 400;
}
.film-title span { display: block; }
.film-title.small { font-size: clamp(1.8rem, 4.5vw, 3.4rem); }
.sub { opacity: 0.5; }

/* ── the spools ── */
.spools-scene { min-height: 330dvh; }
.spools-sticky {
  position: sticky;
  top: 0;
  height: 100dvh;
  overflow: hidden;          /* on the STICKY child, never the scene root */
}
.watermark {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Bague', sans-serif;
  font-size: clamp(0.85rem, 2.1vw, 1.55rem);
  letter-spacing: 0.42em;
  text-align: center;
  opacity: 0.26;
  padding: 0 10vw;
}

.spool {
  position: absolute;
  left: 50%;
  top: var(--top);
  width: 210vw;
  z-index: var(--z, 1);
  transform: translate(-50%, -50%) rotate(var(--angle));
  transform-origin: 50% 50%;
}
.film {
  position: relative;
  display: flex;
  align-items: center;
  gap: 0.34rem;
  padding: 1.05rem 0;
  background: #170F22;
  box-shadow: 0 22px 40px -26px rgba(0, 0, 0, 0.9);
  will-change: transform;
}
/* Perforations run the length of the film, above and below the frames, and
   travel with it because they live inside the translated element. */
.perf {
  position: absolute;
  left: 0;
  right: 0;
  height: 0.42rem;
  background-image: repeating-linear-gradient(
    to right,
    #EFE8F5 0 0.42rem,
    transparent 0.42rem 1.15rem
  );
  opacity: 0.82;
}
.perf.top { top: 0.3rem; }
.perf.bot { bottom: 0.3rem; }

.mini {
  position: relative;
  flex: none;
  width: clamp(4.4rem, 7.2vw, 7.6rem);
  aspect-ratio: 3 / 2;
  margin: 0;
  background: #0E0916;
  overflow: hidden;
}
.mini img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  filter: brightness(1.05) contrast(1.02);
}

/* The room, not the picture: a little grain and a vignette so the spools sit in
   a space rather than on a flat panel. Runs on time, independent of scroll. */
.grain, .vignette { position: absolute; inset: 0; pointer-events: none; }
.grain {
  background-image: var(--noise-url);
  background-size: 200px 200px;
  opacity: 0.13;
  mix-blend-mode: overlay;
  animation: grain-shift 0.6s steps(1, end) infinite;
  z-index: 6;
}
.vignette {
  box-shadow: inset 0 0 14rem 4rem rgba(10, 6, 16, 0.7);
  z-index: 5;
  animation: room-breathe 6s ease-in-out infinite;
}
@keyframes grain-shift {
  0%   { background-position: 0 0 }
  20%  { background-position: -37px 21px }
  40%  { background-position: 44px -18px }
  60%  { background-position: -22px -41px }
  80%  { background-position: 29px 33px }
  100% { background-position: 0 0 }
}
@keyframes room-breathe {
  0%, 100% { opacity: 0.9 }
  50%      { opacity: 1 }
}

@media (max-width: 768px) {
  .spools-scene { min-height: 300dvh; }
  .spool { width: 260vw; }
  .mini { width: clamp(3.6rem, 17vw, 5.6rem); }
  .film { gap: 0.35rem; padding: 1.1rem 0; }
  .perf { height: 0.45rem; background-image: repeating-linear-gradient(to right, #EFE8F5 0 0.45rem, transparent 0.45rem 1.25rem); }
  .perf.top { top: 0.3rem; }
  .perf.bot { bottom: 0.3rem; }
}

@media (prefers-reduced-motion: reduce) {
  .grain, .vignette { animation: none; }
}
</style>
