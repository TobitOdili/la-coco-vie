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
            <div class="sprocket" aria-hidden="true" />
            <div class="window">
              <img v-for="(ex, k) in exposures" :key="k" class="exposure"
                :class="{ on: k === active }" :src="reelReady ? ex.src : undefined"
                :alt="k === active ? ex.cap : ''" decoding="async" />
              <div class="shutter" aria-hidden="true" />
            </div>
            <div class="sprocket" aria-hidden="true" />
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

    // The reel. A projector does not slide film past a window — it holds a frame,
    // closes the shutter, pulls the next one down, and opens again. So the picture
    // is SWAPPED at the exact moment the shutter is shut, and only the sprocket
    // holes travel continuously.
    const reel = root.querySelector('.reel-scene')
    const shutter = reel?.querySelector('.shutter')
    const sprockets = reel ? reel.querySelectorAll('.sprocket') : []
    if (reel && shutter) {
      const r = reel.getBoundingClientRect()
      const p = Math.min(1, Math.max(0, -r.top / Math.max(1, r.height - vh)))
      const n = exposures.value.length
      const q = p * (n - 1)
      const nearest = Math.round(q)
      const d = Math.abs(q - nearest)          // distance to a frame change
      const shut = Math.min(1, Math.max(0, 1 - d / 0.11))

      active.value = Math.min(n - 1, Math.max(0, nearest))
      currentCap.value = shut > 0.85 ? '' : exposures.value[active.value]?.cap || ''

      // Shutter blink + a little gate judder while the frame is being pulled.
      shutter.style.opacity = (shut * 0.96).toFixed(3)
      const judder = shut * 5 * Math.sin(q * 47)
      shutter.parentElement.style.transform = `translateY(${judder.toFixed(2)}px)`

      // The film edges stay put; the perforations run. 3.2rem per hole (see CSS).
      const holes = `${(q * -3.2).toFixed(3)}rem`
      sprockets.forEach((el) => { el.style.backgroundPositionY = holes })
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
/* The dark room. NO overflow:hidden on scene roots — it breaks position:sticky. */
.room-scene { position: relative; color: #EFE8F5; }

/* Long, many-stopped ramps in and out. Two-stop gradients over this much distance
   band badly and land as a hard edge against the chapter's pale background. */
.scene-title {
  min-height: 112dvh;
  background: linear-gradient(
    #EFE8F5 0%, #E2D8EC 8%, #BCA9CE 20%, #8E76A8 33%,
    #5F4A7C 46%, #3E2E52 62%, #2A1E3B 78%, #241A33 92%, #241A33 100%
  );
  display: flex;
  align-items: center;
  justify-content: center;
}
.reel-scene, .leader-scene { background: #241A33; }
.scene-end {
  min-height: 84dvh;
  background: linear-gradient(
    #241A33 0%, #241A33 12%, #2A1E3B 26%, #3E2E52 40%,
    #5F4A7C 55%, #8E76A8 70%, #BCA9CE 83%, #E2D8EC 94%, #EFE8F5 100%
  );
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
/* The projector: fixed film edges either side of one fixed window. */
.projector {
  display: flex;
  align-items: stretch;
  background: #170F22;
  padding: 1.1rem 0;
  box-shadow: 0 30px 60px -30px rgba(0, 0, 0, 0.8);
}
.sprocket {
  width: 3.4rem;
  flex: none;
  background-image: radial-gradient(
    0.6rem 0.85rem at 50% 1.6rem, rgba(239, 232, 245, 0.9) 58%, transparent 63%
  );
  background-size: 100% 3.2rem;
  background-repeat: repeat-y;
}
.window {
  position: relative;
  width: min(72vw, 84dvh);
  aspect-ratio: 3 / 2;
  overflow: hidden;
  background: #0E0916;
  will-change: transform;
}
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
.shutter {
  position: absolute;
  inset: 0;
  background: #0B0712;
  opacity: 0;
  pointer-events: none;
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
  .sprocket { width: 2rem; background-size: 100% 2.6rem;
    background-image: radial-gradient(0.45rem 0.65rem at 50% 1.3rem, rgba(239, 232, 245, 0.6) 58%, transparent 62%);
  }
  .leader-scene { min-height: 260dvh; }
}

@media (prefers-reduced-motion: reduce) {
  .window { will-change: auto; }
}
</style>
