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
            <figure v-for="n in slots" :key="n" class="mini">
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
import { ref, computed, onMounted, onBeforeUnmount, nextTick } from 'vue'

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
  { angle: -29, top: 19, dir: 1, lead: 0, z: 3 },
  { angle: 17, top: 51, dir: -1, lead: 5, z: 2 },
  { angle: -21, top: 80, dir: 1, lead: 11, z: 1 },
]
// How much longer than the room each length of film is. Three room-widths means a
// spool stays fully covering the room for a long stretch, so all three overlap.
const FILM_OVER_ROOM = 3
// How far apart the spools sit ALONG the film, as a fraction of the distance one
// needs to cross the room. This is what staggers their arrival.
const STAGGER_OF_CROSS = 0.2
// Slot count is SOLVED, not fixed: just enough frames to span the spool plus the
// wrap. Any longer and the film has further to travel to clear the room on entry,
// which forces the entry to move faster than the run to keep up.
const slots = ref(18)
const TITLE_OUT = [0.02, 0.11]
const MARK_IN = [0.07, 0.18]
const END_IN = [0.86, 0.98]

const rootEl = ref(null)
const ready = ref(false)
let rafId = 0
let io = null
let pitches = []
let widths = []
// Entry/exit windows are DERIVED, not authored: a spool has to travel roughly
// (filmWidth + spoolWidth)/2 to clear the room, and it should cover that ground at
// the same px-per-scroll the running film does — otherwise it whips in and the
// motion reads as two different speeds. measure() solves for the duration.
// Distances, all measured. `cross` is how far a spool travels to go from fully
// off-screen to fully off the far side; `total` is the whole journey for all three.
let geom = { cross: 3000, stagger: 600, total: 7000 }

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
  const spools = rootEl.value?.querySelectorAll('.spool') || []
  pitches = []
  widths = []
  films.forEach((f) => {
    const m = f.querySelectorAll('.mini')
    pitches.push(m.length > 1 ? m[1].offsetLeft - m[0].offsetLeft : 220)
    widths.push(f.offsetWidth || 3000)
  })
  if (!pitches.length) return

  const spoolW = spools[0]?.offsetWidth || 2000
  const pitch = Math.max(...pitches) || 200

  // Film length is solved, not fixed: long enough to hold the room covered while
  // it crosses. Too short and the room empties between spools; too long and there
  // is nothing to gain but DOM.
  const need = Math.max(10, Math.ceil((spoolW * FILM_OVER_ROOM) / pitch))
  if (need !== slots.value) {       // converges in one pass: `need` doesn't depend on it
    slots.value = need
    nextTick(measure)
    return
  }

  const filmW = Math.max(...widths) || spoolW * FILM_OVER_ROOM
  const cross = (filmW + spoolW) / 2          // fully off one side → fully off the other
  const stagger = cross * STAGGER_OF_CROSS
  geom = { cross, stagger, total: 2 * cross + (SPOOLS.length - 1) * stagger }
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
      const endIn = smooth(win(p, END_IN))
      // the dimmed line belongs to the spools — it leaves with them, so it never
      // sits behind END OF REEL
      if (mark) mark.style.opacity = (0.3 * smooth(win(p, MARK_IN)) * (1 - endIn)).toFixed(3)
      if (end) {
        const o = endIn
        end.style.opacity = o.toFixed(3)
        end.style.transform = `translate3d(0, ${(14 * (1 - o)).toFixed(1)}px, 0)`
      }

      // ── ONE constant rate for entry, run AND exit ──
      // The entrance is not a separate animation on top of the run: it IS the run.
      // The film simply starts far enough back to be off-screen and travels at a
      // single speed for the whole sequence, so there is no gear change when a
      // spool arrives or leaves. (The previous version added an entrance transform
      // to a running film, so during entry the two stacked and it moved at roughly
      // double speed — with a smoothstep peaking 1.5x on top of that.)
      // Consequence, deliberately accepted: the spools leave in the order they
      // arrived. First in, first out is what a length of film actually does; a
      // reverse-order exit would need one of them to move at a different speed.
      const travelled = p * geom.total
      const films = scene.querySelectorAll('.film')
      films.forEach((f, i) => {
        const sp = SPOOLS[i]
        // −cross = fully off the incoming side, 0 = centred, +cross = fully gone.
        const pos = travelled - i * geom.stagger - geom.cross
        f.style.transform = `translate3d(${(-sp.dir * pos).toFixed(2)}px, 0, 0)`
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
.reel-scene { min-height: 640dvh; }
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
  width: 132vw;
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
  /* Film stock AND its perforations in a single paint. They used to be two wide
     absolutely-positioned children, which rasterise as their own layers on a strip
     this long and visibly settle a beat after the film itself stops — the edges
     appeared to "catch up". As background layers they cannot lag: same paint.
     (The colour is the chapter's --accentLighter at 62%; a background layer can't
     take an opacity of its own.) */
  background-color: #1B1428;
  background-image:
    repeating-linear-gradient(to right, rgba(195, 166, 216, 0.62) 0 0.5rem, transparent 0.5rem 1.4rem),
    repeating-linear-gradient(to right, rgba(195, 166, 216, 0.62) 0 0.5rem, transparent 0.5rem 1.4rem);
  background-size: 100% 0.5rem;
  background-position: 0 0.34rem, 0 calc(100% - 0.34rem);
  background-repeat: repeat-x;
  box-shadow:
    inset 0 1px 0 rgba(195, 166, 216, 0.16),
    inset 0 -1px 0 rgba(195, 166, 216, 0.1),
    0 22px 44px -26px rgba(0, 0, 0, 0.9);
  will-change: transform;
}
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
  .reel-scene { min-height: 540dvh; }
  .spool { width: 215vw; }
  .mini { width: clamp(4.4rem, 20vw, 7rem); }
  .film { gap: 0.28rem; padding: 0.95rem 0; }
  .film {
    background-image:
      repeating-linear-gradient(to right, rgba(195, 166, 216, 0.62) 0 0.36rem, transparent 0.36rem 1rem),
      repeating-linear-gradient(to right, rgba(195, 166, 216, 0.62) 0 0.36rem, transparent 0.36rem 1rem);
    background-size: 100% 0.36rem;
    background-position: 0 0.26rem, 0 calc(100% - 0.26rem);
  }
}

@media (prefers-reduced-motion: reduce) {
  .grain, .vignette { animation: none; }
  .mini img { transition: none; }
}
</style>
