<template>
  <div ref="rootEl" class="in-frames">
    <!-- ONE pinned sequence. Past the hero the page stops moving vertically: the
         title fades as the first spool loops in, the other two follow, the film
         runs, then they leave in reverse order while END OF REEL fades in.
         Vertical scroll resumes when this section ends. -->
    <section v-for="(s, i) in sections" :key="i"
      class="chapter-section room-scene reel-scene" :data-idx="i">
      <div class="reel-sticky">
        <div class="title-card lead-card">
          <div class="present">{{ s.present }}</div>
          <h2 class="film-title"><span>OUR JOURNEY</span><span>IN FRAMES</span></h2>
          <div class="present sub">{{ s.sub }}</div>
        </div>

        <div class="watermark" aria-hidden="true">{{ s.watermark }}</div>

        <div v-for="(sp, k) in SPOOLS" :key="k" class="spool"
          :style="{ '--angle': sp.angle + 'deg', '--top': sp.top + '%', '--z': sp.z }">
          <div class="film" :data-dir="sp.dir" :data-idx="k">
            <span class="perf top" aria-hidden="true" />
            <span class="perf bot" aria-hidden="true" />
            <figure v-for="n in SLOTS" :key="n" class="mini">
              <img :src="ready ? frameSrc(k, n) : undefined" alt="" aria-hidden="true" decoding="async" />
            </figure>
          </div>
        </div>

        <div class="title-card end-card">
          <div class="film-title small">{{ s.endTitle }}</div>
          <div class="present sub">{{ s.endSub }}</div>
        </div>

        <div class="grain" aria-hidden="true" />
        <div class="vignette" aria-hidden="true" />
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'

const props = defineProps({
  sections: { type: Array, required: true },
})

const frames = computed(() => props.sections.find((s) => s.kind === 'reel')?.frames || [])

// Three lengths of ONE film. `dir` is which way this one runs (film reverses
// around a roller, so alternating is authentic); `lead` offsets which exposure it
// starts on, so the frame leaving one spool is the frame entering the next.
// `in`/`out` are its slice of the sequence: they stagger so the spools arrive one
// after another and leave in REVERSE order.
const SPOOLS = [
  { angle: -29, top: 19, dir: 1, lead: 0, z: 3, in: [0.05, 0.21], out: [0.84, 0.95] },
  { angle: 17, top: 51, dir: -1, lead: 5, z: 2, in: [0.12, 0.28], out: [0.78, 0.90] },
  { angle: -21, top: 80, dir: 1, lead: 11, z: 1, in: [0.19, 0.35], out: [0.72, 0.84] },
]
const SLOTS = 34
const ADVANCE_FRAMES = 13
const RUN = [0.05, 0.88]          // the film is moving the whole time it is on screen
const TITLE_OUT = [0.02, 0.13]
const MARK_IN = [0.08, 0.20]
const END_IN = [0.86, 0.97]

const rootEl = ref(null)
const ready = ref(false)
let rafId = 0
let io = null
let pitches = []
let widths = []

const clamp01 = (v) => Math.min(1, Math.max(0, v))
const win = (p, [a, b]) => clamp01((p - a) / (b - a))
const smooth = (t) => t * t * (3 - 2 * t)

function frameSrc(spoolIdx, slot) {
  const list = frames.value
  if (!list.length) return undefined
  return list[(SPOOLS[spoolIdx].lead + slot) % list.length]
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

// Pitch (frame-to-frame distance) and the film's own length, both MEASURED — the
// wrap has to land exactly on the two-frame pattern, and the entrance has to
// travel exactly far enough to start off-screen.
function measure() {
  const films = rootEl.value?.querySelectorAll('.film') || []
  pitches = []
  widths = []
  films.forEach((f) => {
    const m = f.querySelectorAll('.mini')
    pitches.push(m.length > 1 ? m[1].offsetLeft - m[0].offsetLeft : 220)
    widths.push(f.offsetWidth || 3000)
  })
}

function tick() {
  const root = rootEl.value
  if (root) {
    const vh = window.innerHeight
    const scene = root.querySelector('.reel-scene')
    if (scene) {
      const r = scene.getBoundingClientRect()
      const p = clamp01(-r.top / Math.max(1, r.height - vh))

      // Title hands over to the dimmed line the spools run across.
      const lead = scene.querySelector('.lead-card')
      const mark = scene.querySelector('.watermark')
      const end = scene.querySelector('.end-card')
      if (lead) {
        const o = 1 - smooth(win(p, TITLE_OUT))
        lead.style.opacity = o.toFixed(3)
        lead.style.transform = `translate3d(0, ${(-14 * (1 - o)).toFixed(1)}px, 0)`
      }
      if (mark) mark.style.opacity = (0.3 * smooth(win(p, MARK_IN))).toFixed(3)
      if (end) {
        const o = smooth(win(p, END_IN))
        end.style.opacity = o.toFixed(3)
        end.style.transform = `translate3d(0, ${(14 * (1 - o)).toFixed(1)}px, 0)`
      }

      // The film runs continuously the whole time it is on screen; the exposures
      // alternate, so wrapping the travel at two pitches runs it forever with no
      // src reassignment and no visible seam.
      const advance = win(p, RUN) * ADVANCE_FRAMES
      const films = scene.querySelectorAll('.film')
      films.forEach((f, i) => {
        const sp = SPOOLS[i]
        const pitch = pitches[i] || 220
        const W = widths[i] || 3000
        const run = -sp.dir * ((((advance % 2) + 2) % 2) * pitch)
        // Enters from behind, leaves by carrying on in the same direction — a reel
        // running THROUGH the room, not backing out of it.
        const enter = (1 - smooth(win(p, sp.in))) * sp.dir * W
        const exit = smooth(win(p, sp.out)) * -sp.dir * W
        f.style.transform = `translate3d(${(run + enter + exit).toFixed(2)}px, 0, 0)`
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
  const scene = rootEl.value?.querySelector('.reel-scene')
  if (scene && 'IntersectionObserver' in window) {
    io = new IntersectionObserver(
      (e) => { if (e[0].isIntersecting) { preload(); io.disconnect(); io = null } },
      { rootMargin: '120% 0px' }
    )
    io.observe(scene)
  } else {
    preload()
  }
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
/* One flat room, cut into and out of. No overflow:hidden on a scene ROOT — it
   breaks position:sticky; it goes on the sticky child instead. */
.room-scene { position: relative; color: #EFE8F5; background: #241A33; }

/* The whole chapter is this one pinned block. */
.reel-scene { min-height: 460dvh; }
.reel-sticky {
  position: sticky;
  top: 0;
  height: 100dvh;
  overflow: hidden;
}

/* ── the cards that hand over to each other ── */
.title-card {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 0 8vw;
  z-index: 4;
  pointer-events: none;
}
.end-card { opacity: 0; }
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
.film-title.small { font-size: clamp(1.8rem, 4.5vw, 3.4rem); margin: 0 0 1.2rem; }
.sub { opacity: 0.5; }

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
  opacity: 0;
  padding: 0 10vw;
  z-index: 1;
}

/* ── the spools ── */
.spool {
  position: absolute;
  left: 50%;
  top: var(--top);
  width: 210vw;
  z-index: var(--z, 1);
  display: flex;
  justify-content: center;
  transform: translate(-50%, -50%) rotate(var(--angle));
  transform-origin: 50% 50%;
}
.film {
  position: relative;
  display: flex;
  align-items: center;
  width: max-content;        /* exactly as long as its frames — no bare tail */
  gap: 0.4rem;
  padding: 1.35rem 0;
  /* film stock, tinted toward the chapter's lavender rather than pure black, with
     a faint rim so the strips sit in the room instead of on top of it */
  background: #1B1428;
  box-shadow:
    inset 0 1px 0 rgba(195, 166, 216, 0.16),
    inset 0 -1px 0 rgba(195, 166, 216, 0.1),
    0 22px 44px -26px rgba(0, 0, 0, 0.9);
  will-change: transform;
}
.perf {
  position: absolute;
  left: 0;
  right: 0;
  height: 0.5rem;
  background-image: repeating-linear-gradient(
    to right,
    var(--accentLighter, #C3A6D8) 0 0.5rem,
    transparent 0.5rem 1.4rem
  );
  opacity: 0.6;
}
.perf.top { top: 0.34rem; }
.perf.bot { bottom: 0.34rem; }

.mini {
  position: relative;
  flex: none;
  width: clamp(5.6rem, 9.2vw, 10rem);
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
  /* the room is monochrome; a frame remembers its colour when you touch it */
  filter: grayscale(1) brightness(1.04) contrast(1.02);
  transition: filter 0.45s ease, transform 0.45s ease;
}
.mini:hover img {
  filter: grayscale(0) brightness(1.08) contrast(1.04) saturate(1.04);
  transform: scale(1.04);
}

/* ── the room ── */
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
  .reel-scene { min-height: 400dvh; }
  .spool { width: 280vw; }
  .mini { width: clamp(4.4rem, 20vw, 7rem); }
  .film { gap: 0.28rem; padding: 0.95rem 0; }
  .perf { height: 0.36rem; background-image: repeating-linear-gradient(to right, var(--accentLighter, #C3A6D8) 0 0.36rem, transparent 0.36rem 1rem); }
  .perf.top { top: 0.26rem; }
  .perf.bot { bottom: 0.26rem; }
}

@media (prefers-reduced-motion: reduce) {
  .grain, .vignette { animation: none; }
  .mini img { transition: none; }
}
</style>
