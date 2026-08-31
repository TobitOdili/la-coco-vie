<template>
  <div ref="rootEl" class="in-frames">
    <!-- ── ONE PINNED SEQUENCE: the projector in front, the reel behind ──────
         The title fades as the spools begin threading in behind; the countdown
         runs INSIDE the gate (3·2·1, one per third) while they arrive; then the
         projector pulls through the exposures, notch by notch, and END OF REEL
         releases the pin.

         ⚠️ THE PIN IS OWNED BY THE PROJECTION, NOT THE SPOOLS. The scene's height
         is derived from the exposure count, and the spools are driven at a fixed
         px-of-film-per-px-of-scroll (their original rate) rather than being
         stretched to fit. So the reel is simply still crossing when the section
         releases — deliberately. Tying the pin to the spools' full journey is
         what made this section outstay its welcome. -->
    <section
      v-for="(s, i) in sections"
      :key="i"
      class="chapter-section room-scene reel-scene"
      :data-idx="i"
      :style="{ minHeight: `${sceneVh}dvh` }"
    >
      <div class="reel-sticky">
        <!-- ── BACKGROUND: three lengths of one film crossing the room ── -->
        <div v-for="(sp, k) in SPOOLS" :key="k" class="spool"
          :style="{ '--angle': sp.angle + 'deg', '--top': sp.top + '%', '--z': sp.z }">
          <div class="film" :data-dir="sp.dir" :data-idx="k">
            <figure v-for="n in slots[k]" :key="n" class="mini">
              <img :src="ready ? frameSrc(k, n) : undefined" alt="" aria-hidden="true" decoding="async" />
            </figure>
          </div>
        </div>

        <div class="watermark" aria-hidden="true">{{ s.watermark }}</div>

        <!-- ── FOREGROUND: the projector ── -->
        <div class="stage">
          <div class="roll-head">ROLL 01 — {{ String(exposures.length).padStart(2, '0') }} EXPOSURES</div>
          <div class="projector">
            <div class="sprocket" aria-hidden="true"><i /></div>
            <div class="window">
              <!-- gate weave (time) → pull-down (scroll) → the exposures -->
              <div class="weave">
                <div class="pull">
                  <img v-for="(ex, k) in exposures" :key="k" class="exposure"
                    :class="{ on: k === active }" :src="reelReady ? ex.src : undefined"
                    :alt="k === active ? ex.cap : ''" decoding="async" />
                </div>
              </div>

              <!-- the academy leader, INSIDE the gate: it is what the projector is
                   showing before the first exposure, not a separate screen -->
              <div class="leader">
                <svg class="leader-svg" viewBox="0 0 400 400" aria-hidden="true">
                  <line x1="200" y1="0" x2="200" y2="400" stroke="currentColor" stroke-width="1" opacity="0.25" />
                  <line x1="0" y1="200" x2="400" y2="200" stroke="currentColor" stroke-width="1" opacity="0.25" />
                  <circle cx="200" cy="200" r="150" stroke="currentColor" stroke-width="1.5" fill="none" opacity="0.3" />
                  <circle class="sweep" cx="200" cy="200" r="150" pathLength="1"
                    stroke="currentColor" stroke-width="3" fill="none" transform="rotate(-90 200 200)" />
                </svg>
                <div class="leader-num">3</div>
                <!-- honest about the wait rather than hiding it: the leader IS the loader -->
                <div class="threading" :class="{ done: reelReady }">
                  {{ reelReady ? 'REEL THREADED' : `THREADING THE REEL · ${loadPct}%` }}
                </div>
              </div>

              <!-- projector artefacts — all on TIME, so the picture is never still -->
              <div class="lamp" aria-hidden="true" />
              <div class="flicker" aria-hidden="true" />
              <div class="gate-grain" aria-hidden="true" />
              <div class="scratch s1" aria-hidden="true" />
              <div class="scratch s2" aria-hidden="true" />
              <div class="halation" aria-hidden="true" />
              <!-- the shutter, driven by scroll: shut while the frame is pulled -->
              <div class="shutter" aria-hidden="true" />
            </div>
            <div class="sprocket" aria-hidden="true"><i /></div>
          </div>
          <div class="subtitle">{{ currentCap }}</div>
        </div>

        <div class="title-card lead-card">
          <div class="present">{{ s.present }}</div>
          <h2 class="film-title"><span>OUR JOURNEY</span><span>IN FRAMES</span></h2>
          <div class="present sub">{{ s.sub }}</div>
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

const reel = computed(() => props.sections.find((s) => s.kind === 'reel'))
const frames = computed(() => reel.value?.frames || [])
const exposures = computed(() => reel.value?.exposures || [])

// Three lengths of ONE film. `dir` is which way this one runs (film reverses
// around a roller, so alternating is authentic); `lead` offsets which exposure it
// starts on, so the frame leaving one spool is the frame entering the next.
const SPOOLS = [
  { angle: -29, top: 19, dir: 1, lead: 0, z: 3 },
  { angle: 17, top: 51, dir: -1, lead: 5, z: 2 },
  { angle: -21, top: 80, dir: 1, lead: 11, z: 1 },
]
// ── The geometry that makes entry sequential ─────────────────────────────────
// Write R for the room's width along a spool's axis. A spool takes exactly R of
// travel to fill (first touch → fully covering) and R to empty, whatever its film
// length. Offsets R apart therefore mean each spool finishes arriving exactly as
// the next begins, which is what reads as one continuous length of film.
const EXIT_START = 3.8
const slots = ref([18, 18, 18])

// ── The pinned timeline, in scene progress ──────────────────────────────────
const TITLE_OUT = [0.02, 0.10]   // the card hands over
const MARK_IN = [0.05, 0.14]     // the dimmed line comes up behind the spools
const MARK_OUT = [0.16, 0.26]    // …and leaves again as the gate takes the stage
const STAGE_IN = [0.10, 0.20]    // the projector settles in
const LEADER = [0.13, 0.34]      // 3·2·1, one per third, INSIDE the gate
const EXPO = [0.34, 0.90]        // the exposures, notch by notch
const END_IN = [0.90, 0.99]

// The pin lasts as long as the PROJECTION needs and no longer: a lead-in, the
// countdown, one screen-ish of scroll per exposure, and the end card.
const sceneVh = computed(() => 200 + Math.max(0, exposures.value.length - 1) * 85)

// One perforation per frame. PITCH_REM must match the repeating gradient in the
// CSS (.sprocket i) or the holes will not land on their notches.
const PITCH_REM = 4.4
const PULL_START = 0.62          // hold for this much of each frame, then pull
let _rem = 0
const remPx = () => (_rem ||= parseFloat(getComputedStyle(document.documentElement).fontSize) || 16)

// The spools' original pace, in screens of scroll for the whole journey. Their
// travel is scroll-px × rate, NOT progress × total — so shortening the pin to fit
// the projection leaves the film running at exactly the speed it always did.
const SPOOL_REF_TRAVEL_VH = 7.6

const rootEl = ref(null)
const ready = ref(false)
const reelReady = ref(false)
const loadPct = ref(0)
const active = ref(0)
const currentCap = ref('')

let rafId = 0
let io = null
let pitches = []
let widths = []
let geom = []
let total = 7000
let spoolRate = 1

const clamp01 = (v) => Math.min(1, Math.max(0, v))
const win = (p, [a, b]) => clamp01((p - a) / (b - a))
const smooth = (t) => t * t * (3 - 2 * t)

function frameSrc(spoolIdx, slot) {
  const list = frames.value
  if (!list.length) return undefined
  return list[(SPOOLS[spoolIdx].lead + slot) % list.length]
}

// The spool thumbs are small and go in first; the exposures are the heavy things
// and are only requested when the scene is near, with the countdown giving them
// time to land. Not a hard gate — a slow reel simply fills in as it arrives.
function preload() {
  const thumbs = [...new Set(frames.value)]
  if (!thumbs.length) ready.value = true
  let doneT = 0
  for (const src of thumbs) {
    const img = new Image()
    const bump = () => { if (++doneT >= thumbs.length) ready.value = true }
    img.onload = bump
    img.onerror = bump
    img.src = src
  }
  const shots = [...new Set(exposures.value.map((e) => e.src))]
  if (!shots.length) { reelReady.value = true; return }
  let doneE = 0
  for (const src of shots) {
    const img = new Image()
    const bump = () => {
      doneE += 1
      loadPct.value = Math.round((doneE / shots.length) * 100)
      if (doneE >= shots.length) reelReady.value = true
    }
    img.onload = bump
    img.onerror = bump          // never strand the reel on one bad file
    img.src = src
  }
}

// Pitch, film length and slot counts are all MEASURED, so the geometry survives
// any breakpoint. `spoolRate` converts scroll pixels → film pixels.
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
  const lengths = SPOOLS.map((_, i) => (EXIT_START + (N - 1 - 2 * i)) * room)

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
  total = geom[0].offset + (widths[0] || lengths[0]) + room
  spoolRate = total / Math.max(1, SPOOL_REF_TRAVEL_VH * window.innerHeight)
}

function tick() {
  const root = rootEl.value
  if (root) {
    const vh = window.innerHeight
    const scene = root.querySelector('.reel-scene')
    if (scene) {
      const r = scene.getBoundingClientRect()
      const travel = Math.max(1, r.height - vh)
      const scrolled = Math.min(travel, Math.max(0, -r.top))
      const p = scrolled / travel

      const endIn = smooth(win(p, END_IN))

      const lead = scene.querySelector('.lead-card')
      if (lead) {
        const o = 1 - smooth(win(p, TITLE_OUT))
        lead.style.opacity = o.toFixed(3)
        lead.style.transform = `translate3d(0, ${(-14 * (1 - o)).toFixed(1)}px, 0)`
      }
      const mark = scene.querySelector('.watermark')
      if (mark) {
        // it belongs to the entrance: up behind the arriving spools, gone once the
        // gate owns the room, and never behind END OF REEL
        const o = 0.3 * smooth(win(p, MARK_IN)) * (1 - smooth(win(p, MARK_OUT)))
        mark.style.opacity = o.toFixed(3)
      }
      const end = scene.querySelector('.end-card')
      if (end) {
        end.style.opacity = endIn.toFixed(3)
        end.style.transform = `translate3d(0, ${(14 * (1 - endIn)).toFixed(1)}px, 0)`
      }

      // ── the spools: ONE constant rate, independent of the pin's length ──
      const travelled = scrolled * spoolRate
      scene.querySelectorAll('.film').forEach((f, i) => {
        const g = geom[i]
        if (!g) return
        const pos = travelled - g.offset - g.half   // −half = touching, 0 = centred
        f.style.transform = `translate3d(${(-SPOOLS[i].dir * pos).toFixed(2)}px, 0, 0)`
      })

      // ── the projector ──
      const stage = scene.querySelector('.stage')
      if (stage) {
        const o = smooth(win(p, STAGE_IN)) * (1 - endIn)
        stage.style.opacity = o.toFixed(3)
        stage.style.transform = `translate3d(0, ${(18 * (1 - smooth(win(p, STAGE_IN)))).toFixed(1)}px, 0)`
      }

      // the leader: each third of its window is one number's full sweep
      const leader = scene.querySelector('.leader')
      const sweep = scene.querySelector('.sweep')
      const num = scene.querySelector('.leader-num')
      const lp = win(p, LEADER)
      if (leader && sweep && num) {
        const t = Math.min(0.999, lp)
        num.textContent = String(3 - Math.floor(t * 3))
        sweep.style.strokeDashoffset = String(1 - ((t * 3) % 1))
        // it cuts out the moment the first exposure is up — a leader does not fade
        leader.style.opacity = lp >= 1 ? '0' : '1'
      }

      // A projector holds a frame still, then yanks the next one down in one quick
      // pull while the shutter is shut. So the film is NOT glided along with the
      // scroll — it DWELLS, then pulls exactly one perforation, and the sprockets,
      // the picture and the shutter all come off that same pull value.
      const shutter = scene.querySelector('.shutter')
      const pullEl = scene.querySelector('.pull')
      const sprockets = scene.querySelectorAll('.sprocket i')
      const n = exposures.value.length
      if (shutter && n > 1) {
        const q = win(p, EXPO) * (n - 1)
        const i0 = Math.min(n - 2, Math.floor(q))
        const frac = clamp01(q - i0)

        const t = clamp01((frac - PULL_START) / (1 - PULL_START))
        const pull = t * t * t * (t * (t * 6 - 15) + 10)   // smootherstep

        const film = i0 + pull
        const holes = (-(film * PITCH_REM * remPx())).toFixed(2)
        sprockets.forEach((el) => { el.style.transform = `translate3d(0, ${holes}px, 0)` })

        const shut = pull > 0 && pull < 1 ? Math.pow(Math.sin(Math.PI * pull), 0.6) : 0
        shutter.style.opacity = shut.toFixed(3)

        // the picture swaps at the exact middle of the pull — the instant the
        // shutter is fully shut — so the cut is never visible
        active.value = Math.min(n - 1, pull < 0.5 ? i0 : i0 + 1)

        if (pullEl) {
          const slip = (pull < 0.5 ? pull : pull - 1) * 42
          pullEl.style.transform = `translate3d(0, ${(-slip).toFixed(2)}px, 0)`
        }
        currentCap.value =
          lp < 1 || shut > 0.6 ? '' : exposures.value[active.value]?.cap || ''
      }
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
      { rootMargin: '150% 0px' }
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

.reel-sticky {
  position: sticky;
  top: 0;
  height: 100dvh;
  overflow: hidden;

  /* ── ONE KNOB: how far out of the background the reel comes ──
     The spools are BACKGROUND, not overlay: the room's colour shows through them,
     and because the backdrop is the room's flat colour, a plain opacity IS the
     room's colour wash — no separate tint layer needed. */
  --reel-veil: 0.3;
  --reel-veil-hover: 0.52;
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
  z-index: 6;
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
  /* Above the spools, not behind them — the reel is the page's backdrop now.
     ⚠️ pointer-events is load-bearing: this element is inset:0, so once it paints
     above the spools it also HIT-TESTS above them and silently eats strip hover. */
  z-index: 4;
  pointer-events: none;
}

/* ── the spools (background) ── */
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
  /* Film stock AND its perforations in a single paint. As absolutely-positioned
     children they rasterise as their own layers on a strip this long and settle a
     beat late — the edges appear to "catch up". As background layers they cannot.
     The stock is a SHADE OF THE ROOM, not its own near-black: a different black
     would read as a separate object sitting on the page. */
  background-color: #221A30;
  background-image:
    repeating-linear-gradient(to right, rgba(195, 166, 216, 0.4) 0 0.5rem, transparent 0.5rem 1.4rem),
    repeating-linear-gradient(to right, rgba(195, 166, 216, 0.4) 0 0.5rem, transparent 0.5rem 1.4rem);
  background-size: 100% 0.5rem;
  background-position: 0 0.34rem, 0 calc(100% - 0.34rem);
  background-repeat: repeat-x;
  /* NO shadow and NO rim light. Both are "I am above the surface" cues, and the
     reel runs UNDER the page. */
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
     through and reads as a pasted-on photo. */
  filter: grayscale(1) brightness(1.1) contrast(0.9);
  transition: filter 0.5s ease;
}
/* Hover surfaces a strip: it rises out of the background and takes its colour
   back, whole-spool (a reel is one length of film, not forty buttons). */
.film:hover { opacity: var(--reel-veil-hover); }
.film:hover .mini img {
  filter: grayscale(0) brightness(1.02) contrast(1) saturate(1.02);
}

/* ── the projector (foreground) ── */
/* A soft scrim seats the projector in front of the room: without it the roll head
   and the caption compete with whatever strip happens to be crossing behind them.
   It darkens only the immediate surround, so the reel still reads at the edges. */
.stage::before {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(62% 60% at 50% 50%, rgba(18, 11, 27, 0.78), transparent 74%);
  pointer-events: none;
}
.stage > * { position: relative; }
.stage {
  position: absolute;
  inset: 0;
  z-index: 5;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  opacity: 0;
  pointer-events: none;
}
.roll-head {
  font-family: 'Bague', sans-serif;
  font-size: 0.72rem;
  letter-spacing: 0.3em;
  opacity: 0.6;
}
.projector {
  display: flex;
  align-items: stretch;
  background: #170F22;
  padding: 1.1rem 0;
  /* the one shadow left in the chapter: the projector IS in front of the room */
  box-shadow: 0 34px 70px -34px rgba(0, 0, 0, 0.85);
}

/* Perforations: rectangular cut-outs, one per frame. The pitch here MUST match
   PITCH_REM in the script or the holes stop landing on their notches. */
.sprocket {
  position: relative;
  width: 4.4rem;
  flex: none;
  overflow: hidden;
}
.sprocket i {
  position: absolute;
  left: 1rem;
  right: 1rem;
  top: -60rem;
  bottom: -60rem;
  display: block;
  background-image: repeating-linear-gradient(
    to bottom,
    #EFE8F5 0 1.6rem,
    transparent 1.6rem 4.4rem
  );
  will-change: transform;
}

.window {
  position: relative;
  width: min(64vw, 74dvh);
  aspect-ratio: 3 / 2;
  overflow: hidden;
  background: #0E0916;
}
.weave { position: absolute; inset: 0; animation: gate-weave 2.3s ease-in-out infinite; }
.pull { position: absolute; inset: 0; will-change: transform; }
.exposure {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0;
}
/* No crossfade: a projector cuts. The swap happens behind the closed shutter. */
.exposure.on { opacity: 1; }

/* ── the leader, inside the gate ── */
.leader {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #EFE8F5;
  background: #0E0916;
}
.leader-svg { width: min(70%, 74%); height: auto; }
.sweep { stroke-dasharray: 1; stroke-dashoffset: 1; }
.leader-num {
  position: absolute;
  font-family: 'Monoton', cursive;
  font-size: clamp(2.6rem, 7vw, 5.6rem);
  line-height: 1;
}
.threading {
  position: absolute;
  bottom: 8%;
  font-family: 'Bague', sans-serif;
  font-size: 0.62rem;
  letter-spacing: 0.28em;
  opacity: 0.55;
  transition: opacity 0.8s ease;
}
.threading.done { opacity: 0; }

/* ── projector artefacts — all on TIME, so the picture is never still ── */
.lamp, .flicker, .gate-grain, .scratch, .halation, .shutter {
  position: absolute;
  inset: 0;
  pointer-events: none;
}
.lamp {
  background: radial-gradient(120% 90% at 50% 45%, rgba(255, 246, 224, 0.16), transparent 70%);
  mix-blend-mode: screen;
  animation: lamp-swell 5.5s ease-in-out infinite;
}
/* the fast, ugly one: the lamp is AC and the shutter is mechanical, so the
   brightness never settles. steps() so it jumps rather than fades. */
.flicker {
  background: #000;
  animation: gate-flicker 1.9s steps(1, end) infinite;
}
.gate-grain {
  background-image: var(--noise-url);
  background-size: 200px 200px;
  opacity: 0.22;
  mix-blend-mode: overlay;
  animation: grain-shift 0.55s steps(1, end) infinite;
}
.scratch {
  inset: -6% 0;
  width: 1px;
  background: linear-gradient(transparent, rgba(239, 232, 245, 0.55) 12%, rgba(239, 232, 245, 0.4) 80%, transparent);
}
.scratch.s1 { left: 31%; animation: scratch-a 6.7s linear infinite; }
.scratch.s2 { left: 68%; animation: scratch-b 9.3s linear infinite; }
.halation {
  box-shadow: inset 0 0 5rem 1.5rem rgba(0, 0, 0, 0.55);
  animation: halation-pulse 4.1s ease-in-out infinite;
}
.shutter { background: #0B0712; opacity: 0; z-index: 3; }

.subtitle {
  min-height: 1.5rem;
  font-family: 'Bague', sans-serif;
  font-size: 0.72rem;
  letter-spacing: 0.26em;
  text-transform: uppercase;
  opacity: 0.7;
  text-align: center;
  padding: 0 6vw;
}

/* ── the room ── */
.grain, .vignette { position: absolute; inset: 0; pointer-events: none; }
.grain {
  background-image: var(--noise-url);
  background-size: 200px 200px;
  opacity: 0.13;
  mix-blend-mode: overlay;
  animation: grain-shift 0.6s steps(1, end) infinite;
  z-index: 8;
}
.vignette {
  box-shadow: inset 0 0 14rem 4rem rgba(10, 6, 16, 0.7);
  z-index: 7;
  animation: room-breathe 6s ease-in-out infinite;
}

@keyframes gate-weave {
  0%   { transform: translate3d(0, 0, 0) }
  18%  { transform: translate3d(0.5px, -0.7px, 0) }
  37%  { transform: translate3d(-0.4px, 0.5px, 0) }
  55%  { transform: translate3d(0.3px, 0.6px, 0) }
  74%  { transform: translate3d(-0.5px, -0.3px, 0) }
  100% { transform: translate3d(0, 0, 0) }
}
@keyframes lamp-swell {
  0%, 100% { opacity: 0.55 }
  30%      { opacity: 0.95 }
  62%      { opacity: 0.4 }
  81%      { opacity: 0.8 }
}
@keyframes gate-flicker {
  0%   { opacity: 0.04 }
  6%   { opacity: 0.13 }
  11%  { opacity: 0.02 }
  17%  { opacity: 0.09 }
  23%  { opacity: 0.17 }
  29%  { opacity: 0.03 }
  36%  { opacity: 0.07 }
  43%  { opacity: 0.02 }
  49%  { opacity: 0.14 }
  56%  { opacity: 0.05 }
  62%  { opacity: 0.10 }
  69%  { opacity: 0.02 }
  75%  { opacity: 0.19 }
  82%  { opacity: 0.06 }
  88%  { opacity: 0.03 }
  94%  { opacity: 0.11 }
  100% { opacity: 0.04 }
}
@keyframes grain-shift {
  0%   { background-position: 0 0 }
  20%  { background-position: -37px 21px }
  40%  { background-position: 44px -18px }
  60%  { background-position: -22px -41px }
  80%  { background-position: 29px 33px }
  100% { background-position: 0 0 }
}
@keyframes scratch-a {
  0%, 62%   { opacity: 0 }
  64%       { opacity: 0.5; transform: translateX(0) }
  71%       { opacity: 0.28; transform: translateX(6px) }
  74%, 100% { opacity: 0 }
}
@keyframes scratch-b {
  0%, 34%   { opacity: 0 }
  36%       { opacity: 0.34; transform: translateX(0) }
  44%       { opacity: 0.18; transform: translateX(-9px) }
  47%, 100% { opacity: 0 }
}
@keyframes halation-pulse {
  0%, 100% { opacity: 0.85 }
  45%      { opacity: 1 }
}
@keyframes room-breathe {
  0%, 100% { opacity: 0.9 }
  50%      { opacity: 1 }
}

@media (max-width: 768px) {
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
  .window { width: 78vw; }
  .sprocket { width: 1.9rem; }
  .sprocket i { left: 0.4rem; right: 0.4rem; }
  .leader-num { font-size: 2.4rem; }
  .subtitle { font-size: 0.62rem; letter-spacing: 0.2em; }
}

/* The whole point of this page is the flicker, but it is exactly the kind of
   motion that triggers people — hold the picture still if they asked for that. */
@media (prefers-reduced-motion: reduce) {
  .grain, .vignette, .weave, .lamp, .flicker, .gate-grain, .scratch, .halation { animation: none; }
  .flicker { opacity: 0.05; }
  .mini img, .film { transition: none; }
}
</style>
