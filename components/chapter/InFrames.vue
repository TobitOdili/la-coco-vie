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
            <figure v-for="n in slots[k]" :key="n" class="mini">
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
// ── The geometry that makes entry sequential and exit reversed ───────────────
// Write R for the room's width along a spool's axis. A spool takes exactly R of
// travel to fill (first touch → fully covering) and R to empty, whatever its film
// length. So:
//   • offsets R apart  ⇒ each spool finishes arriving exactly as the next begins;
//   • a spool starts emptying at (offset + its film length), so giving the LAST
//     spool the SHORTEST film makes it empty FIRST — a reversed exit at one single
//     constant speed, which per-spool speeds could never give us.
// EXIT_START is when the last spool begins to leave, in units of R. It must exceed
// SPOOLS.length so the shortest film is still longer than the room; higher values
// hold all three on screen together for longer, at the cost of a longer page.
const EXIT_START = 3.8
const slots = ref([18, 18, 18])
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
let geom = []
let total = 7000

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

  const room = spools[0]?.offsetWidth || 2000
  const pitch = Math.max(...pitches) || 200
  const N = SPOOLS.length

  // Each spool's own film length. Longest first, one room-width apart, so they
  // arrive in order and leave in the opposite order (see EXIT_START above).
  const lengths = SPOOLS.map((_, i) => (EXIT_START + (N - 1 - 2 * i)) * room)

  // Solve each spool's slot count from its own length — they differ now.
  const need = lengths.map((L) => Math.max(6, Math.ceil(L / pitch) + 1))
  if (need.some((n, i) => n !== slots.value[i])) {   // converges in one pass
    slots.value = need
    nextTick(measure)
    return
  }

  geom = SPOOLS.map((_, i) => ({
    offset: i * room,                                 // R apart ⇒ strictly sequential
    half: ((widths[i] || lengths[i]) + room) / 2,     // centre offset at first touch
  }))
  // The journey ends when the FIRST spool — the one with the longest film — is gone.
  total = geom[0].offset + (widths[0] || lengths[0]) + room
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
      const travelled = p * total
      const films = scene.querySelectorAll('.film')
      films.forEach((f, i) => {
        const g = geom[i]
        if (!g) return
        // −half = just touching the room, 0 = centred, +half = fully gone.
        const pos = travelled - g.offset - g.half
        f.style.transform = `translate3d(${(-SPOOLS[i].dir * pos).toFixed(2)}px, 0, 0)`
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
.reel-scene { min-height: 860dvh; }
.reel-sticky {
  position: sticky;
  top: 0;
  height: 100dvh;
  overflow: hidden;

  /* ── ONE KNOB: how far out of the background the reel comes ──
     The spools are BACKGROUND, not overlay: the room's colour shows through them,
     and because the backdrop is the room's own flat colour, a plain opacity IS the
     room's colour wash — no separate tint layer needed. Raise to bring the reel
     forward, lower to sink it further under the page. */
  --reel-veil: 0.34;
  --reel-veil-hover: 0.62;
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
  /* Above the spools, not behind them. The line used to be the reel's backdrop;
     now the reel is the page's backdrop, so the order inverts.
     ⚠️ pointer-events is load-bearing: this element is inset:0, so once it paints
     above the spools it also HIT-TESTS above them and silently eats strip hover. */
  z-index: 4;
  pointer-events: none;
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
     (A background layer can't take an opacity of its own, so the alpha is baked in.)
     The stock is now a SHADE OF THE ROOM rather than its own near-black — a
     different black would read as a separate object sitting on the page. */
  background-color: #221A30;
  background-image:
    repeating-linear-gradient(to right, rgba(195, 166, 216, 0.4) 0 0.5rem, transparent 0.5rem 1.4rem),
    repeating-linear-gradient(to right, rgba(195, 166, 216, 0.4) 0 0.5rem, transparent 0.5rem 1.4rem);
  background-size: 100% 0.5rem;
  background-position: 0 0.34rem, 0 calc(100% - 0.34rem);
  background-repeat: repeat-x;
  /* NO shadow and NO rim light. Both are "I am above the surface" cues, and the
     reel is meant to read as though it runs UNDER the page. The veil below is what
     seats it: the room's own colour shows through the whole strip, composited as
     one group, and the room's grain + vignette already paint over the top of it. */
  opacity: var(--reel-veil);
  transition: opacity 0.5s ease;
  will-change: transform;
}
.mini {
  position: relative;
  flex: none;
  width: clamp(7rem, 12.5vw, 13.5rem);
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
  /* Monochrome and flattened — under the veil a contrasty frame punches back
     through and reads as a pasted-on photo. A frame remembers its colour when you
     touch it. */
  filter: grayscale(1) brightness(1.1) contrast(0.9);
  transition: filter 0.5s ease;
}
/* Hover SURFACES a strip: it rises out of the background and takes its colour
   back, whole-spool (a reel is one length of film, not forty buttons). */
.film:hover {
  opacity: var(--reel-veil-hover);
}
.film:hover .mini img {
  filter: grayscale(0) brightness(1.02) contrast(1) saturate(1.02);
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
  .reel-scene { min-height: 720dvh; }
  .spool { width: 215vw; }
  .mini { width: clamp(5.4rem, 27vw, 9rem); }
  .film { gap: 0.28rem; padding: 0.95rem 0; }
  .film {
    background-image:
      repeating-linear-gradient(to right, rgba(195, 166, 216, 0.4) 0 0.36rem, transparent 0.36rem 1rem),
      repeating-linear-gradient(to right, rgba(195, 166, 216, 0.4) 0 0.36rem, transparent 0.36rem 1rem);
    background-size: 100% 0.36rem;
    background-position: 0 0.26rem, 0 calc(100% - 0.26rem);
  }
}

@media (prefers-reduced-motion: reduce) {
  .grain, .vignette { animation: none; }
  .mini img, .film { transition: none; }
}
</style>
