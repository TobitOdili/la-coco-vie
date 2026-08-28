<template>
  <div ref="rootEl" class="in-frames">
    <template v-for="(s, i) in sections" :key="i">
      <!-- ── Title · the house lights go down. ── -->
      <section v-if="s.kind === 'title'" class="chapter-section room-scene scene-title" :data-idx="i">
        <div class="title-card">
          <div class="present">{{ s.present }}</div>
          <h2 class="film-title">
            <span>OUR JOURNEY</span>
            <span>IN FRAMES</span>
          </h2>
          <div class="present sub">{{ s.sub }}</div>
        </div>
      </section>

      <!-- ── Leader · the 3·2·1 countdown, pinned. It runs BEFORE any photograph,
           which is also the window the reel media loads in (see preload()). ── -->
      <section v-else-if="s.kind === 'leader'" class="chapter-section room-scene leader-scene" :data-idx="i">
        <div class="leader-sticky">
          <svg class="leader-svg" viewBox="0 0 400 400" aria-hidden="true">
            <line x1="200" y1="0" x2="200" y2="400" stroke="#EFE8F5" stroke-width="1" opacity="0.25" />
            <line x1="0" y1="200" x2="400" y2="200" stroke="#EFE8F5" stroke-width="1" opacity="0.25" />
            <circle cx="200" cy="200" r="150" stroke="#EFE8F5" stroke-width="1.5" fill="none" opacity="0.35" />
            <circle class="sweep" cx="200" cy="200" r="150" pathLength="1"
              stroke="#EFE8F5" stroke-width="3" fill="none" transform="rotate(-90 200 200)" />
          </svg>
          <div class="leader-num">3</div>
          <!-- Honest about the wait rather than hiding it: the countdown IS the loader. -->
          <div class="threading" :class="{ done: reelReady }">
            {{ reelReady ? 'REEL THREADED' : `THREADING THE REEL · ${loadPct}%` }}
          </div>
        </div>
      </section>

      <!-- ── The reel · ONE gate. The film edges stay put, the sprockets travel,
           and the exposure is swapped behind a closed shutter. ── -->
      <section v-else-if="s.kind === 'reel'" class="chapter-section room-scene reel-scene" :data-idx="i"
        :style="{ height: `${110 + (exposures.length - 1) * 80}dvh` }">
        <div class="gate-sticky">
          <div class="roll-head">
            ROLL 01 — {{ String(exposures.length).padStart(2, '0') }} EXPOSURES
          </div>
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
              <!-- Projector artefacts. These run on TIME, not scroll: the lamp is
                   never steady, so the picture is never steady, even when you stop. -->
              <div class="lamp" aria-hidden="true" />
              <div class="flicker" aria-hidden="true" />
              <div class="grain" aria-hidden="true" />
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
      </section>

      <!-- ── End of reel · the film runs out and the lights come up. ── -->
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

const exposures = computed(() => props.sections.find((s) => s.kind === 'reel')?.exposures || [])

const rootEl = ref(null)
// ⚠️ These elements live inside a v-for, and a template ref inside v-for is
// collected as an ARRAY — `sweepEl.value.style` is then undefined, which threw
// every frame and killed the rAF loop outright. Query the DOM instead.
const currentCap = ref('')
const active = ref(0)
const reelReady = ref(false)
const loadPct = ref(0)

let rafId = 0
let io = null

// One perforation per frame. PITCH_REM must match the repeating gradient in the
// CSS (.sprocket i) or the holes will not land on their notches.
const PITCH_REM = 4.4
const PULL_START = 0.62          // hold for this much of each frame, then pull
let _rem = 0
const remPx = () => (_rem ||= parseFloat(getComputedStyle(document.documentElement).fontSize) || 16)

// ── Loading order ───────────────────────────────────────────────────────────
// The title card and the countdown are type + SVG — they cost nothing and must
// paint immediately. The photographs are the only heavy thing here, so they are
// not requested until the countdown is near in view, and the pinned countdown gives
// them time to arrive. Not a hard gate: if they are slow the reel simply fills
// in as they land. (Repeated srcs collapse to one request each via the cache.)
function preload() {
  const srcs = [...new Set(exposures.value.map((e) => e.src))]
  if (!srcs.length) { reelReady.value = true; return }
  let done = 0
  const bump = () => {
    done += 1
    loadPct.value = Math.round((done / srcs.length) * 100)
    if (done >= srcs.length) reelReady.value = true
  }
  for (const src of srcs) {
    const img = new Image()
    img.onload = bump
    img.onerror = bump          // never strand the reel on one bad file
    img.src = src
  }
}

// Same rAF scrub engine as the other bespoke pages: read scene rects each frame
// so everything follows Lenis exactly and reverses for free.
function tick() {
  const root = rootEl.value
  if (root) {
    const vh = window.innerHeight

    // Leader: each third of the pinned travel is one number's full sweep.
    const leader = root.querySelector('.leader-scene')
    const sweep = leader?.querySelector('.sweep')
    const num = leader?.querySelector('.leader-num')
    if (leader && sweep && num) {
      const r = leader.getBoundingClientRect()
      const travel = Math.max(1, r.height - vh)
      const p = Math.min(1, Math.max(0, -r.top / travel)) * 0.999
      num.textContent = String(3 - Math.floor(p * 3))
      sweep.style.strokeDashoffset = String(1 - ((p * 3) % 1))
    }

    // The reel. A projector holds a frame still, then yanks the next one down in
    // one quick pull while the shutter is shut. So the film is NOT glided along
    // with the scroll — it DWELLS, then pulls exactly one perforation, and the
    // sprockets, the picture and the shutter are all driven by that same pull
    // value so they cannot drift apart.
    const reel = root.querySelector('.reel-scene')
    const shutter = reel?.querySelector('.shutter')
    const pullEl = reel?.querySelector('.pull')
    const sprockets = reel ? reel.querySelectorAll('.sprocket i') : []
    if (reel && shutter) {
      const r = reel.getBoundingClientRect()
      const p = Math.min(1, Math.max(0, -r.top / Math.max(1, r.height - vh)))
      const n = exposures.value.length
      const q = p * (n - 1)
      const i0 = Math.min(n - 2, Math.floor(q))
      const frac = Math.min(1, Math.max(0, q - i0))

      // Hold for the first ~62% of each frame's scroll, then pull through.
      const t = Math.min(1, Math.max(0, (frac - PULL_START) / (1 - PULL_START)))
      const pull = t * t * t * (t * (t * 6 - 15) + 10)   // smootherstep

      // The film's position in perforations — integer while held, +1 across a pull.
      const film = i0 + pull
      const holes = (-(film * PITCH_REM * remPx())).toFixed(2)
      sprockets.forEach((el) => { el.style.transform = `translate3d(0, ${holes}px, 0)` })

      // Shutter is shut across the pull and fully open while the frame is held.
      const shut = pull > 0 && pull < 1 ? Math.pow(Math.sin(Math.PI * pull), 0.6) : 0
      shutter.style.opacity = shut.toFixed(3)

      // The picture swaps at the exact middle of the pull — the instant the
      // shutter is fully shut — so the cut is never visible.
      active.value = Math.min(n - 1, pull < 0.5 ? i0 : i0 + 1)

      // …and the frame slips through the gate as it is pulled: the outgoing frame
      // rides up, the incoming one drops in from below, the jump hidden by the shutter.
      if (pullEl) {
        const slip = (pull < 0.5 ? pull : pull - 1) * 42
        pullEl.style.transform = `translate3d(0, ${(-slip).toFixed(2)}px, 0)`
      }

      currentCap.value = shut > 0.6 ? '' : exposures.value[active.value]?.cap || ''
    }
  }
  rafId = requestAnimationFrame(tick)
}

onMounted(() => {
  rafId = requestAnimationFrame(tick)
  const leader = rootEl.value?.querySelector('.leader-scene')
  if (leader && 'IntersectionObserver' in window) {
    io = new IntersectionObserver(
      (entries) => { if (entries[0].isIntersecting) { preload(); io.disconnect(); io = null } },
      { rootMargin: '150% 0px' }
    )
    io.observe(leader)
  } else {
    preload()
  }
})
onBeforeUnmount(() => { cancelAnimationFrame(rafId); io?.disconnect() })
</script>

<style scoped>
/* The dark room. NO overflow:hidden on scene roots — it breaks position:sticky.
   NO gradients either: the room is one flat colour and the page cuts into it and
   out of it, the way a cinema does. */
.room-scene { position: relative; color: #EFE8F5; background: #241A33; }
.scene-title {
  min-height: 112dvh;
  display: flex;
  align-items: center;
  justify-content: center;
}
.scene-end {
  min-height: 84dvh;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* ── title cards ── */
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

/* ── the leader ── */
.leader-scene { min-height: 300dvh; }
.leader-sticky {
  position: sticky;
  top: 0;
  height: 100dvh;
  display: flex;
  align-items: center;
  justify-content: center;
}
.leader-svg { width: min(44vw, 40dvh); }
.sweep { stroke-dasharray: 1; stroke-dashoffset: 1; }
.leader-num {
  position: absolute;
  font-family: 'Monoton', cursive;
  font-size: clamp(4rem, 9vw, 7.5rem);
  color: #EFE8F5;
}
.threading {
  position: absolute;
  bottom: 12dvh;
  font-family: 'Bague', sans-serif;
  font-size: 0.68rem;
  letter-spacing: 0.3em;
  opacity: 0.55;
  transition: opacity 0.8s ease;
}
.threading.done { opacity: 0; }

/* ── the gate ── */
.gate-sticky {
  position: sticky;
  top: 0;
  height: 100dvh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1.2rem;
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
  box-shadow: 0 30px 60px -30px rgba(0, 0, 0, 0.8);
}

/* Perforations: proper rectangular cut-outs, one per frame. The pitch here MUST
   match PITCH_REM in the script or the holes stop landing on their notches. */
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
  width: min(72vw, 84dvh);
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

/* ── projector artefacts — all on TIME, so the picture is never still ── */
.lamp, .flicker, .grain, .scratch, .halation, .shutter {
  position: absolute;
  inset: 0;
  pointer-events: none;
}
/* the lamp breathing: a slow, uneven swell of light */
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
/* film grain, shifted every few frames */
.grain {
  background-image: var(--noise-url);
  background-size: 200px 200px;
  opacity: 0.22;
  mix-blend-mode: overlay;
  animation: grain-shift 0.55s steps(1, end) infinite;
}
/* dust in the gate: hairline scratches that come and go */
.scratch {
  inset: -6% 0;
  width: 1px;
  background: linear-gradient(transparent, rgba(239, 232, 245, 0.55) 12%, rgba(239, 232, 245, 0.4) 80%, transparent);
}
.scratch.s1 { left: 31%; animation: scratch-a 6.7s linear infinite; }
.scratch.s2 { left: 68%; animation: scratch-b 9.3s linear infinite; }
/* light bleeding around the edge of the gate */
.halation {
  box-shadow: inset 0 0 5rem 1.5rem rgba(0, 0, 0, 0.55);
  animation: halation-pulse 4.1s ease-in-out infinite;
}
.shutter { background: #0B0712; opacity: 0; }

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

.subtitle {
  min-height: 1.6rem;
  font-family: 'Over the Rainbow', cursive;
  font-size: 1.15rem;
  opacity: 0.85;
  text-align: center;
  padding: 0 6vw;
}

@media (max-width: 768px) {
  .window { width: 74vw; }
  .sprocket { width: 2.6rem; }
  .sprocket i { left: 0.5rem; right: 0.5rem; }
  .leader-scene { min-height: 260dvh; }
}

/* The whole point of this page is the flicker, but it is exactly the kind of
   motion that triggers people — hold the picture still if they asked for that. */
@media (prefers-reduced-motion: reduce) {
  .weave, .lamp, .flicker, .grain, .scratch, .halation { animation: none; }
  .flicker { opacity: 0.05; }
}
</style>
