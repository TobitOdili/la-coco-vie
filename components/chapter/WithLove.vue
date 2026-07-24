<template>
  <div ref="rootEl" class="with-love">
    <template v-for="(s, i) in sections" :key="i">
      <!-- ── Opening · the ink writes the thank-you, before anything is asked. ── -->
      <section v-if="s.kind === 'open'" class="chapter-section love-scene open-scene" :data-idx="i">
        <div class="lead fade" data-window="0.04,0.24">{{ s.lead }}</div>
        <div class="big-thanks write" data-window="0.14,0.58">{{ s.big }}</div>
        <svg class="flourish" viewBox="0 0 600 60" preserveAspectRatio="none" aria-hidden="true">
          <path class="scrub" data-window="0.5,0.72" pathLength="1"
            d="M 20 34 C 160 12, 300 12, 430 30 C 500 40, 560 34, 585 22"
            :stroke="ink" stroke-width="3" fill="none" stroke-linecap="round" />
        </svg>
        <div class="sub fade" data-window="0.6,0.8">{{ s.sub }}</div>
        <div class="pivot fade" data-window="0.8,0.97">{{ s.pivot }}</div>
      </section>

      <!-- ── Gift · a future memory, the gift circled like a catalogue, thank-you. ── -->
      <section v-else-if="s.kind === 'gift'" class="chapter-section love-scene gift-scene" :data-idx="i">
        <svg class="connector" viewBox="0 0 1000 1000" preserveAspectRatio="none" aria-hidden="true">
          <path class="scrub" data-window="0,0.82" pathLength="1"
            d="M 500 0 C 540 240, 452 470, 500 690 C 522 830, 492 930, 500 1000"
            :stroke="ink" stroke-width="2.5" fill="none" stroke-linecap="round" opacity="0.5" />
        </svg>
        <div class="gift-stanza">
          <div class="memory write" data-window="0.06,0.42">{{ s.memory }}</div>
          <div class="gift-wrap">
            <span class="gift-name fade" data-window="0.18,0.42">{{ s.gift }}</span>
            <svg class="circle" viewBox="0 0 640 200" aria-hidden="true">
              <path class="scrub" data-window="0.46,0.78" pathLength="1"
                d="M 120 108 C 70 60, 300 34, 430 42 C 560 50, 600 96, 560 138 C 520 178, 240 182, 130 158 C 70 144, 66 96, 150 74"
                :stroke="ink" stroke-width="3" fill="none" stroke-linecap="round" />
            </svg>
          </div>
          <div class="thanks fade" data-window="0.74,0.92">{{ s.thanks }}</div>
        </div>
      </section>

      <!-- ── Signing · the ink splits in two and signs both names. ── -->
      <section v-else-if="s.kind === 'sign'" class="chapter-section love-scene sign-scene" :data-idx="i">
        <div class="closer fade" data-window="0.14,0.34">{{ s.closer }}</div>
        <div class="sign-block">
          <!-- Trunk descends, forks, and each branch runs INTO the start of a name. -->
          <svg class="fork" viewBox="0 0 1000 160" preserveAspectRatio="none" aria-hidden="true">
            <path class="scrub" data-window="0.2,0.4" pathLength="1"
              d="M 500 0 C 500 40, 500 70, 500 88"
              :stroke="ink" stroke-width="2.5" fill="none" stroke-linecap="round" opacity="0.55" />
            <path class="scrub" data-window="0.4,0.54" pathLength="1"
              d="M 500 88 C 440 118, 300 128, 230 160"
              :stroke="ink" stroke-width="2.5" fill="none" stroke-linecap="round" opacity="0.55" />
            <path class="scrub" data-window="0.4,0.54" pathLength="1"
              d="M 500 88 C 560 118, 700 128, 770 160"
              :stroke="ink" stroke-width="2.5" fill="none" stroke-linecap="round" opacity="0.55" />
          </svg>
          <div class="sig-row">
            <div class="sig">
              <span class="sig-name write" data-window="0.52,0.72">{{ s.names[0] }}</span>
              <svg class="sig-line" viewBox="0 0 360 24" preserveAspectRatio="none" aria-hidden="true">
                <path class="scrub" data-window="0.7,0.82" pathLength="1"
                  d="M 12 14 C 120 6, 250 6, 348 12" :stroke="ink" stroke-width="2.5" fill="none" stroke-linecap="round" />
              </svg>
            </div>
            <div class="sig">
              <span class="sig-name write" data-window="0.64,0.84">{{ s.names[1] }}</span>
              <svg class="sig-line" viewBox="0 0 360 24" preserveAspectRatio="none" aria-hidden="true">
                <path class="scrub" data-window="0.82,0.92" pathLength="1"
                  d="M 12 14 C 120 6, 250 6, 348 12" :stroke="ink" stroke-width="2.5" fill="none" stroke-linecap="round" />
              </svg>
            </div>
          </div>
        </div>
        <div class="tail fade" data-window="0.88,1">{{ s.tail }}</div>
      </section>
    </template>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

defineProps({
  sections: { type: Array, required: true },
})

const ink = '#2E4A52'
const rootEl = ref(null)
let rafId = 0

// Same rAF scrub engine as BigDay/InFrames, plus `.write` — a left-to-right clip
// reveal that reads as the ink writing the text. Every animated element declares
// data-window="start,end" (its slice of the SCENE's 0→1 progress).
function tick() {
  const root = rootEl.value
  if (root) {
    const vh = window.innerHeight
    for (const scene of root.querySelectorAll('.love-scene')) {
      const r = scene.getBoundingClientRect()
      const p = Math.min(1, Math.max(0, (vh - r.top) / (r.height + vh)))
      for (const el of scene.querySelectorAll('.scrub, .fade, .write')) {
        const [a, b] = el.dataset.window.split(',').map(Number)
        const lp = Math.min(1, Math.max(0, (p - a) / (b - a)))
        if (el.classList.contains('scrub')) el.style.strokeDashoffset = String(1 - lp)
        else if (el.classList.contains('write')) el.style.clipPath = `inset(0 ${((1 - lp) * 100).toFixed(1)}% 0 0)`
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
.love-scene {
  position: relative;
  color: var(--accent, #2E4A52);
  background: var(--accentLight, #E8EDF2);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 12vh 8vw;
  box-sizing: border-box;
}
.scrub { stroke-dasharray: 1; stroke-dashoffset: 1; }
.fade { opacity: 0; }
.write { clip-path: inset(0 100% 0 0); }

/* ── opening ── */
.open-scene { min-height: 128dvh; }
.lead {
  font-family: 'Bague', sans-serif;
  font-size: 0.8rem;
  letter-spacing: 0.26em;
  text-transform: uppercase;
  opacity: 0.6;
  margin-bottom: 2.4rem;
}
.big-thanks {
  font-family: 'Over the Rainbow', cursive;
  font-size: clamp(3.4rem, 12vw, 9rem);
  line-height: 1;
}
.flourish { width: min(46vw, 30rem); height: 3.4rem; margin-top: -0.4rem; }
.sub {
  font-family: 'Italiana', serif;
  font-size: clamp(1.2rem, 2.4vw, 1.9rem);
  margin-top: 1.6rem;
  max-width: 32rem;
}
.pivot {
  font-family: 'Bague', sans-serif;
  font-size: 0.82rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  opacity: 0.55;
  margin-top: 4rem;
  max-width: 30rem;
}

/* ── gift stanza ── */
.gift-scene { min-height: 118dvh; }
.connector { position: absolute; inset: 0; width: 100%; height: 100%; pointer-events: none; }
.gift-stanza { position: relative; z-index: 1; }
.memory {
  font-family: 'Over the Rainbow', cursive;
  font-size: clamp(1.3rem, 2.6vw, 2rem);
  opacity: 0.9;
  margin-bottom: 2.6rem;
}
.gift-wrap { position: relative; display: inline-block; padding: 0.6rem 1.4rem; }
.gift-name {
  font-family: 'Bague', sans-serif;
  font-weight: 700;
  font-size: clamp(1.8rem, 4.6vw, 3.4rem);
  letter-spacing: 0.01em;
}
.circle {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%) scale(1.18);
  width: 100%;
  height: 200%;
  pointer-events: none;
  overflow: visible;
}
.thanks {
  font-family: 'Over the Rainbow', cursive;
  font-size: 1.15rem;
  opacity: 0.75;
  margin-top: 2.8rem;
}

/* ── signing ── */
.sign-scene { min-height: 150dvh; }
.closer {
  font-family: 'Italiana', serif;
  font-size: clamp(1.4rem, 3vw, 2.4rem);
  margin-bottom: 2rem;
}
.sign-block {
  width: min(82vw, 46rem);
  display: flex;
  flex-direction: column;
  align-items: stretch;
}
.fork { width: 100%; height: 6.5rem; pointer-events: none; }
.sig-row {
  display: flex;
  justify-content: space-evenly;
  align-items: flex-start;
  margin-top: -0.5rem;
}
.sig { display: flex; flex-direction: column; align-items: center; }
.sig-name {
  font-family: 'Over the Rainbow', cursive;
  font-size: clamp(2.4rem, 6vw, 4.4rem);
  line-height: 1.1;
}
.sig-line { width: clamp(9rem, 20vw, 15rem); height: 1.4rem; }
.tail {
  font-family: 'Bague', sans-serif;
  font-size: 0.82rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  opacity: 0.6;
  margin-top: 4rem;
}

@media (max-width: 768px) {
  .sig-row { flex-direction: column; gap: 3rem; align-items: center; }
  .gift-scene, .open-scene { min-height: 108dvh; }
  .sign-scene { min-height: 160dvh; }
}
</style>
