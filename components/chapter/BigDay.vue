<template>
  <div ref="rootEl" class="big-day">
    <!-- ── Scene 0 · Daybreak — the landing. The thread enters and the day begins. ── -->
    <section class="chapter-section day-scene scene-daybreak" :data-idx="0">
      <div class="date-lockup">
        <div class="big-date">27 · 10 · 26</div>
        <div class="date-sub">{{ sections[0]?.body }}</div>
      </div>
      <svg class="thread" viewBox="0 0 1000 900" preserveAspectRatio="none" aria-hidden="true">
        <path
          class="scrub"
          data-window="0,0.9"
          pathLength="1"
          d="M 500 0 L 500 900"
          :stroke="ink" stroke-width="4" fill="none"
        />
      </svg>
    </section>

    <!-- ── Scene 1 · 12:00 — the knot. Two threads tie, scrubbed by scroll, reversible. ── -->
    <section class="chapter-section day-scene scene-knot" :data-idx="1">
      <div class="knot-sticky">
        <div class="hour hour-center">12:00</div>
        <svg class="knot-svg" viewBox="0 0 1000 740" fill="none" aria-hidden="true">
          <path
            class="scrub" data-window="0.05,0.55" pathLength="1"
            d="M -20 340 C 180 340, 300 336, 420 356 C 470 364, 500 380, 505 408 C 510 444, 470 462, 430 448 C 380 430, 372 372, 420 340 C 462 312, 520 330, 540 380 C 556 420, 540 470, 505 510 C 470 545, 480 580, 500 605"
            :stroke="ink" stroke-width="5" stroke-linecap="round"
          />
          <path
            class="scrub" data-window="0.1,0.6" pathLength="1"
            d="M 1020 340 C 820 340, 700 336, 580 356 C 530 364, 500 380, 495 408 C 490 444, 530 462, 570 448 C 620 430, 628 372, 580 340 C 538 312, 480 330, 460 380 C 444 420, 460 470, 495 510 C 530 545, 520 580, 500 605"
            :stroke="ink" stroke-width="3.5" stroke-linecap="round" opacity="0.55"
          />
          <path
            class="scrub" data-window="0.62,0.8" pathLength="1"
            d="M 500 605 L 500 740"
            :stroke="ink" stroke-width="5" stroke-linecap="round"
          />
        </svg>
        <div class="vow fade" data-window="0.66,0.82">{{ sections[1]?.vow }}</div>
        <div class="info info-center fade" data-window="0.78,0.95">
          <div class="info-title">{{ sections[1]?.title }}</div>
          <div v-for="(l, i) in sections[1]?.lines" :key="i" class="info-line">{{ l }}</div>
        </div>
      </div>
    </section>

    <!-- ── Scene 2 · 16:00 — the reception. One thread, one easy loop. ── -->
    <section class="chapter-section day-scene scene-evening" :data-idx="2">
      <svg class="thread" viewBox="0 0 1000 1200" preserveAspectRatio="none" aria-hidden="true">
        <path
          class="scrub" data-window="0,1" pathLength="1"
          d="M 500 0 L 500 320 C 500 430, 620 450, 620 540 C 620 640, 400 640, 400 540 C 400 470, 500 450, 500 560 L 500 1200"
          :stroke="ink" stroke-width="4" fill="none" stroke-linecap="round"
        />
      </svg>
      <div class="hour hour-side">16:00</div>
      <div class="info info-side fade" data-window="0.35,0.6">
        <div class="info-title">{{ sections[2]?.title }}</div>
        <div v-for="(l, i) in sections[2]?.lines" :key="i" class="info-line">{{ l }}</div>
      </div>
    </section>

    <!-- ── Scene 3 · 22:00 — the party. The thread loses its manners. Night falls. ── -->
    <section class="chapter-section day-scene scene-night" :data-idx="3">
      <svg class="thread" viewBox="0 0 1000 1400" preserveAspectRatio="none" aria-hidden="true">
        <path
          class="scrub" data-window="0,1" pathLength="1"
          d="M 500 0 L 500 260
             C 500 360, 700 340, 690 460 C 680 570, 330 520, 330 650
             C 330 760, 760 700, 730 830 C 705 940, 300 900, 320 1020
             C 338 1120, 660 1080, 640 1180 C 625 1260, 460 1250, 500 1320 L 500 1400"
          stroke="#E9ECE2" stroke-width="4" fill="none" stroke-linecap="round"
        />
      </svg>
      <div class="hour hour-side hour-light">22:00</div>
      <div class="info info-side info-light fade" data-window="0.3,0.55">
        <div class="info-title">{{ sections[3]?.title }}</div>
        <div v-for="(l, i) in sections[3]?.lines" :key="i" class="info-line">{{ l }}</div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

defineProps({
  sections: { type: Array, required: true },
})

const ink = '#41492D'
const rootEl = ref(null)
let rafId = 0

// Scroll-scrubbed drawing. Every .scrub path (pathLength=1, dasharray=1) and .fade
// element declares data-window="start,end" — the slice of its SCENE's progress over
// which it draws/appears. Scrubbing is driven by rAF reading layout each frame (a
// handful of rects; cheap), so it follows Lenis exactly and reverses for free.
function sceneProgress(scene, vh) {
  const r = scene.getBoundingClientRect()
  if (scene.classList.contains('scene-knot')) {
    // Sticky scene: progress = how far through the sticky's travel we are.
    return Math.min(1, Math.max(0, -r.top / (r.height - vh)))
  }
  // Flowing scene: 0 when its top enters at the bottom, 1 as its bottom leaves the top.
  return Math.min(1, Math.max(0, (vh - r.top) / (r.height + vh)))
}

function tick() {
  const root = rootEl.value
  if (root) {
    const vh = window.innerHeight
    for (const scene of root.querySelectorAll('.day-scene')) {
      const p = sceneProgress(scene, vh)
      for (const el of scene.querySelectorAll('.scrub, .fade')) {
        const [a, b] = el.dataset.window.split(',').map(Number)
        const lp = Math.min(1, Math.max(0, (p - a) / (b - a)))
        if (el.classList.contains('scrub')) el.style.strokeDashoffset = String(1 - lp)
        else el.style.opacity = String(lp)
      }
    }
  }
  rafId = requestAnimationFrame(tick)
}

onMounted(() => { rafId = requestAnimationFrame(tick) })
onBeforeUnmount(() => cancelAnimationFrame(rafId))
</script>

<style scoped>
.day-scene {
  position: relative;
  /* No overflow:hidden here — it turns the scene into the sticky containment box and
     kills the knot's position:sticky. The thread SVGs are inset:0 so nothing bleeds. */
  color: var(--accent, #41492D);
}

/* The falling light: each scene fades from the previous scene's sky to its own. */
.scene-daybreak { min-height: 120dvh; background: linear-gradient(#F1F3EC, #E9ECE2); }
.scene-knot { height: 260dvh; background: linear-gradient(#E9ECE2, #DEE2D2 30%, #DEE2D2); }
.scene-evening { min-height: 160dvh; background: linear-gradient(#DEE2D2, #C2C79E 55%, #9BA66F); }
.scene-night { min-height: 180dvh; background: linear-gradient(#9BA66F, #5A6440 30%, #2E3620 60%, #232A18); }

/* The thread — stretched to the scene, centred; the vertical run stays centred. */
.thread {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
}
.scrub { stroke-dasharray: 1; stroke-dashoffset: 1; }
.fade { opacity: 0; }

/* ── daybreak lockup ── */
.scene-daybreak { display: flex; align-items: flex-start; justify-content: center; }
.date-lockup {
  position: relative;
  z-index: 1;
  text-align: center;
  margin-top: 22dvh;
  background: inherit;
  padding: 0.5rem 2.5rem;
}
.big-date {
  font-family: 'Italiana', serif;
  font-size: clamp(3.2rem, 9vw, 8rem);
  line-height: 1;
  letter-spacing: 0.06em;
}
.date-sub {
  margin-top: 1rem;
  font-family: 'Bague', sans-serif;
  font-size: 0.8rem;
  letter-spacing: 0.3em;
  text-transform: uppercase;
  opacity: 0.6;
}

/* ── the knot scene ── */
.knot-sticky {
  position: sticky;
  top: 0;
  height: 100dvh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.knot-svg { width: min(72vw, 56rem); }
.hour {
  font-family: 'Italiana', serif;
  line-height: 1;
  user-select: none;
}
.hour-center {
  font-size: clamp(4rem, 11vw, 9rem);
  opacity: 0.16;
  margin-bottom: -2vh;
}
.vow {
  font-family: 'Italiana', serif;
  font-size: clamp(1.4rem, 2.6vw, 2.2rem);
  letter-spacing: 0.04em;
  margin-top: -1vh;
}
.info { font-family: 'Bague', sans-serif; }
.info-center { text-align: center; margin-top: 2.2rem; }
.info-title {
  font-weight: 700;
  font-size: 1rem;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  margin-bottom: 0.6rem;
}
.info-line { font-size: 0.92rem; line-height: 1.8; opacity: 0.75; }

/* ── flowing scenes (reception / party) ── */
.hour-side {
  position: absolute;
  top: 18%;
  inset-inline-end: 8vw;
  font-size: clamp(3.4rem, 9vw, 8rem);
  opacity: 0.16;
}
.scene-night .hour-side { inset-inline-end: auto; inset-inline-start: 8vw; }
.info-side {
  position: absolute;
  top: 42%;
  inset-inline-end: 8vw;
  max-width: 20rem;
  text-align: end;
}
.scene-night .info-side { inset-inline-end: auto; inset-inline-start: 8vw; text-align: start; }
.hour-light, .info-light { color: #E9ECE2; }

@media (max-width: 768px) {
  .knot-svg { width: 94vw; }
  .scene-knot { height: 230dvh; }
  .info-side { max-width: 15rem; }
  .date-lockup { margin-top: 18dvh; }
}
</style>
