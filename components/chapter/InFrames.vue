<template>
  <div ref="rootEl" class="in-frames">
    <!-- ── Scene 0 · The house lights go down. A film-leader title card. ── -->
    <section class="chapter-section room-scene scene-title" :data-idx="0">
      <div class="title-card">
        <div class="present">COVENANT &amp; UVIE PRESENT</div>
        <div class="film-title">IN FRAMES</div>
        <div class="present sub">A LOVE STORY IN THREE ROLLS</div>
      </div>
    </section>

    <!-- ── Scene 1 · Roll 01 — the strip runs through the gate; scroll advances the film. ── -->
    <section
      class="chapter-section room-scene roll-scene"
      :data-idx="1"
      :style="{ height: `${100 + (exposures.length - 1) * 85}dvh` }"
    >
      <div class="gate-sticky">
        <div class="roll-head">ROLL 01 — {{ sections[1]?.title?.toUpperCase() }} · {{ String(exposures.length).padStart(2, '0') }} EXPOSURES</div>
        <div class="gate">
          <div class="strip" ref="stripEl">
            <figure v-for="(ex, i) in exposures" :key="i" class="film-frame">
              <img :src="ex.src" :alt="ex.cap" loading="eager" />
            </figure>
          </div>
          <div class="gate-vignette" aria-hidden="true" />
        </div>
        <div class="subtitle">{{ currentCap }}</div>
      </div>
    </section>

    <!-- ── Scene 2 · Leader countdown, then the reserved rolls. ── -->
    <section class="chapter-section room-scene leader-scene" :data-idx="2">
      <div class="leader-sticky">
        <svg class="leader-svg" viewBox="0 0 400 400" aria-hidden="true">
          <line x1="200" y1="0" x2="200" y2="400" stroke="#D6D5E8" stroke-width="1" opacity="0.25" />
          <line x1="0" y1="200" x2="400" y2="200" stroke="#D6D5E8" stroke-width="1" opacity="0.25" />
          <circle cx="200" cy="200" r="150" stroke="#D6D5E8" stroke-width="1.5" fill="none" opacity="0.35" />
          <circle
            ref="sweepEl" class="sweep" cx="200" cy="200" r="150" pathLength="1"
            stroke="#D6D5E8" stroke-width="3" fill="none" transform="rotate(-90 200 200)"
          />
        </svg>
        <div class="leader-num" ref="leaderNumEl">3</div>
      </div>
      <div class="reserved">
        <div v-for="(r, i) in reserved" :key="i" class="film-frame frame-blank">
          <div class="blank-inner">
            <div class="blank-roll">ROLL {{ String(i + 2).padStart(2, '0') }}</div>
            <div class="blank-title">{{ r.title }}</div>
            <div class="blank-note">exposures reserved — {{ r.note }}</div>
          </div>
        </div>
      </div>
    </section>

    <!-- ── Scene 3 · End of reel — the film runs out and the lights come back up. ── -->
    <section class="chapter-section room-scene scene-end" :data-idx="3">
      <div class="title-card">
        <div class="film-title small">END OF REEL</div>
        <div class="present sub">MORE EXPOSURES AFTER OCTOBER 27</div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'

const props = defineProps({
  sections: { type: Array, required: true },
})

const exposures = computed(() => props.sections[1]?.exposures || [])
const reserved = computed(() => props.sections[2]?.reserved || [])

const rootEl = ref(null)
const stripEl = ref(null)
const sweepEl = ref(null)
const leaderNumEl = ref(null)
const currentCap = ref('')

let rafId = 0

// Same scrub engine as BigDay: rAF reads scene rects so everything follows Lenis
// exactly and reverses for free. The roll scene translates the physical strip;
// the leader scene sweeps the countdown circle.
function tick() {
  const root = rootEl.value
  if (root) {
    const vh = window.innerHeight

    // Roll: p over the sticky travel drives the strip; per-frame glow + subtitle
    // come from each frame's real distance to the gate centre.
    const roll = root.querySelector('.roll-scene')
    const strip = stripEl.value
    if (roll && strip) {
      const r = roll.getBoundingClientRect()
      const p = Math.min(1, Math.max(0, -r.top / (r.height - vh)))
      const frames = strip.querySelectorAll('.film-frame')
      if (frames.length > 1) {
        const step = frames[1].offsetTop - frames[0].offsetTop
        strip.style.transform = `translateY(${(-p * (frames.length - 1) * step).toFixed(1)}px)`
        let cap = ''
        frames.forEach((f, i) => {
          const fr = f.getBoundingClientRect()
          const d = Math.abs(fr.top + fr.height / 2 - vh / 2) / vh
          const t = Math.min(1, Math.max(0, 1 - d * 2.2))
          f.style.opacity = String(0.25 + 0.75 * t)
          f.style.filter = `brightness(${(0.55 + 0.55 * t).toFixed(2)})`
          if (d < 0.1) cap = exposures.value[i]?.cap || ''
        })
        currentCap.value = cap
      }
    }

    // Leader: the countdown sweep. Each third of p is one number's full sweep.
    const leader = root.querySelector('.leader-scene .leader-sticky')?.parentElement
    if (leader && sweepEl.value && leaderNumEl.value) {
      const r = leader.getBoundingClientRect()
      const travel = Math.max(1, r.height - vh)
      const p = Math.min(1, Math.max(0, -r.top / travel)) * 0.999
      const n = 3 - Math.floor(p * 3)
      leaderNumEl.value.textContent = String(n)
      sweepEl.value.style.strokeDashoffset = String(1 - ((p * 3) % 1))
    }
  }
  rafId = requestAnimationFrame(tick)
}

onMounted(() => { rafId = requestAnimationFrame(tick) })
onBeforeUnmount(() => cancelAnimationFrame(rafId))
</script>

<style scoped>
/* The dark room. NO overflow:hidden on scene roots — it breaks position:sticky. */
.room-scene {
  position: relative;
  color: #d6d5e8;
}
.scene-title {
  min-height: 130dvh;
  background: linear-gradient(#d6d5e8, #454363 26%, #2b2a45 55%, #2b2a45);
  display: flex;
  align-items: center;
  justify-content: center;
}
.roll-scene { background: #2b2a45; }
.leader-scene { background: #2b2a45; }
.scene-end {
  min-height: 130dvh;
  background: linear-gradient(#2b2a45 30%, #454363 60%, #d6d5e8);
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
  font-size: clamp(2.6rem, 7.5vw, 6.5rem);
  line-height: 1.1;
  margin: 1.4rem 0;
  color: #d6d5e8;
}
.film-title.small { font-size: clamp(1.8rem, 4.5vw, 3.4rem); }
.sub { opacity: 0.5; }

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
.gate {
  position: relative;
  height: 64dvh;
  overflow: hidden;
  display: flex;
  justify-content: center;
}
/* Soft projector vignette above/below the gate window. */
.gate-vignette {
  position: absolute;
  inset: 0;
  pointer-events: none;
  background: linear-gradient(#2b2a45, transparent 18%, transparent 82%, #2b2a45);
}
.strip {
  will-change: transform;
  /* The film itself: darker than the room, sprocket holes down both edges. */
  background: #1d1c30;
  padding: 0 3.4rem;
  background-image:
    radial-gradient(0.55rem 0.8rem at 1.7rem 50%, rgba(214, 213, 232, 0.5) 58%, transparent 62%),
    radial-gradient(0.55rem 0.8rem at calc(100% - 1.7rem) 50%, rgba(214, 213, 232, 0.5) 58%, transparent 62%);
  background-size: 100% 3.2rem;
}
.film-frame {
  width: min(76vw, 92dvh);
  aspect-ratio: 3 / 2;
  margin: 3.2rem 0;
  overflow: hidden;
  border-radius: 4px;
}
.film-frame img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}
.subtitle {
  min-height: 1.6rem;
  font-family: 'Over the Rainbow', cursive;
  font-size: 1.15rem;
  opacity: 0.85;
}

/* ── the leader ── */
.leader-scene { min-height: 280dvh; }
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
  color: #d6d5e8;
}

/* ── reserved rolls ── */
.reserved {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4rem;
  padding: 14dvh 0 20dvh;
}
.frame-blank {
  background: #1d1c30;
  border: 1px dashed rgba(214, 213, 232, 0.35);
  display: flex;
  align-items: center;
  justify-content: center;
}
.blank-inner { text-align: center; }
.blank-roll {
  font-family: 'Bague', sans-serif;
  font-size: 0.7rem;
  letter-spacing: 0.3em;
  opacity: 0.45;
}
.blank-title {
  font-family: 'Italiana', serif;
  font-size: clamp(1.6rem, 3.4vw, 2.6rem);
  margin: 0.8rem 0;
  text-transform: uppercase;
  letter-spacing: 0.08em;
}
.blank-note {
  font-family: 'Over the Rainbow', cursive;
  font-size: 1rem;
  opacity: 0.6;
}

@media (max-width: 768px) {
  .film-frame { width: 88vw; }
  .strip { padding: 0 2rem; background-size: 100% 2.6rem;
    background-image:
      radial-gradient(0.45rem 0.65rem at 1rem 50%, rgba(214, 213, 232, 0.5) 58%, transparent 62%),
      radial-gradient(0.45rem 0.65rem at calc(100% - 1rem) 50%, rgba(214, 213, 232, 0.5) 58%, transparent 62%);
  }
  .gate { height: 56dvh; }
  .frame-blank { width: 88vw; }
}
</style>
