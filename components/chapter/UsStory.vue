<template>
  <div class="us-story">
    <section
      v-for="(scene, i) in sections"
      :key="i"
      :ref="setSceneRef"
      class="chapter-section us-scene"
      :class="[`align-${scene.align || 'left'}`, { 'in-view': inView[i] }]"
      :data-idx="i"
    >
      <!-- Oversized faint numeral, same treatment as the other inner pages. -->
      <div class="watermark" aria-hidden="true">{{ scene.num }}</div>

      <!-- The "stitch": a date-line that draws itself across as the scene arrives. -->
      <div class="stitch">
        <span class="stitch-label">{{ scene.date }}</span>
        <span class="stitch-line" aria-hidden="true" />
        <span class="stitch-dot" aria-hidden="true">·</span>
      </div>

      <div class="scene-grid">
        <!-- One taped polaroid per scene — settles straight(er) as it reveals. -->
        <figure v-if="scene.images?.[0]" class="polaroid">
          <span class="tape" aria-hidden="true" />
          <img :src="scene.images[0]" :alt="scene.caption || scene.title" loading="lazy" />
          <figcaption>{{ scene.caption }}</figcaption>
        </figure>

        <div class="prose">
          <h2 class="heading">{{ scene.title }}</h2>
          <p class="body">{{ scene.body }}</p>

          <!-- The two voices, arguing in the margins. -->
          <div class="notes">
            <div
              v-for="(n, j) in scene.notes || []"
              :key="j"
              class="note"
              :class="`voice-${n.voice}`"
            >
              {{ n.text }}
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

defineProps({
  sections: { type: Array, required: true },
})

// Same latch-on-first-enter reveal the other chapter components use.
const sceneEls = []
const setSceneRef = (el) => { if (el) sceneEls.push(el) }
const inView = ref({})
let observer = null
onMounted(() => {
  observer = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (e.isIntersecting) {
          inView.value[+e.target.dataset.idx] = true
          observer.unobserve(e.target)
        }
      }
    },
    { threshold: 0.18 }
  )
  sceneEls.forEach((el) => observer.observe(el))
})
onBeforeUnmount(() => observer?.disconnect())
</script>

<style scoped>
.us-scene {
  position: relative;
  min-height: 100dvh;
  box-sizing: border-box;
  padding: 16vh 7vw 12vh;
  color: var(--accent, #b32c05);
  overflow: hidden;
}

/* ── watermark numeral (matches ChapterSection) ── */
.watermark {
  position: absolute;
  top: 5vh;
  inset-inline-start: 5vw;
  font-family: 'Bague', sans-serif;
  font-weight: 700;
  font-size: 26vh;
  line-height: 0.8;
  opacity: 0.06;
  pointer-events: none;
  user-select: none;
}
.align-right .watermark { inset-inline-start: auto; inset-inline-end: 5vw; }

/* ── the stitch (date-line) ── */
.stitch {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 7vh;
}
.stitch-label {
  font-family: 'Bague', sans-serif;
  font-size: 0.75rem;
  letter-spacing: 0.28em;
  white-space: nowrap;
}
.stitch-line {
  display: block;
  height: 1px;
  background: currentColor;
  opacity: 0.45;
  width: 0;
  transition: width 1.4s cubic-bezier(0.22, 1, 0.36, 1) 0.2s;
}
.in-view .stitch-line { width: min(34vw, 22rem); }
.stitch-dot { opacity: 0.45; }

/* ── scene layout ── */
.scene-grid {
  display: flex;
  align-items: center;
  gap: 6vw;
}
.align-right .scene-grid { flex-direction: row-reverse; }

/* ── the taped polaroid ── */
.polaroid {
  flex: 0 0 auto;
  position: relative;
  margin: 0;
  background: #fffdf9;
  padding: 14px 14px 3.4rem;
  box-shadow: 0 18px 44px rgba(0, 0, 0, 0.16);
  transform: rotate(-6.5deg) translateY(30px);
  opacity: 0;
  transition: transform 1.2s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.9s ease;
}
.in-view .polaroid { transform: rotate(-3.5deg) translateY(0); opacity: 1; }
.align-right .polaroid { transform: rotate(6.5deg) translateY(30px); }
.align-right.in-view .polaroid { transform: rotate(3.5deg) translateY(0); }
.polaroid img {
  display: block;
  width: min(30vw, 24rem);
  aspect-ratio: 4 / 5;
  object-fit: cover;
}
.polaroid figcaption {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 1rem;
  text-align: center;
  font-family: 'Over the Rainbow', cursive;
  font-size: 1.05rem;
  color: var(--accent, #b32c05);
  opacity: 0.85;
}
.tape {
  position: absolute;
  top: -14px;
  left: 50%;
  width: 7rem;
  height: 1.9rem;
  background: var(--accentLighter, #f0d7bf);
  opacity: 0.75;
  transform: translateX(-50%) rotate(-2deg);
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.08);
}

/* ── the prose + margin notes ── */
.prose {
  flex: 1 1 auto;
  max-width: 34rem;
  position: relative;
}
.prose > .heading,
.prose > .body {
  opacity: 0;
  transform: translateY(34px);
  transition: opacity 0.9s ease 0.15s, transform 0.9s ease 0.15s;
}
.in-view .prose > .heading,
.in-view .prose > .body { opacity: 1; transform: none; }

.heading {
  font-family: 'Bague', sans-serif;
  font-weight: 700;
  font-size: clamp(2.75rem, 7vw, 6rem);
  line-height: 0.92;
  letter-spacing: 0.02em;
  margin: 0 0 1.5rem;
}
.body {
  font-size: 1.05rem;
  line-height: 1.7;
  opacity: 0.85;
  margin: 0;
}

.notes {
  margin-top: 2.5rem;
  display: flex;
  flex-direction: column;
  gap: 1.1rem;
}
.note {
  font-family: 'Over the Rainbow', cursive;
  font-size: clamp(1.15rem, 1.9vw, 1.55rem);
  line-height: 1.4;
  opacity: 0;
  transition: opacity 0.8s ease, transform 0.8s ease;
}
.note.voice-c {
  align-self: flex-start;
  transform: rotate(-2deg) translateY(16px);
}
.note.voice-u {
  align-self: flex-end;
  text-align: right;
  opacity: 0;
  transform: rotate(1.5deg) translateY(16px);
  color: color-mix(in srgb, var(--accent, #b32c05) 72%, var(--accentLight, #f3ebe4));
}
/* The voices land one after the other — he speaks, then she answers. */
.in-view .note.voice-c { opacity: 0.95; transform: rotate(-2deg); transition-delay: 0.7s; }
.in-view .note.voice-u { opacity: 0.95; transform: rotate(1.5deg); transition-delay: 1.3s; }

/* ── mobile: stack, keep the tilt ── */
@media (max-width: 768px) {
  .us-scene { padding: 12vh 8vw 10vh; }
  .scene-grid,
  .align-right .scene-grid { flex-direction: column; align-items: stretch; gap: 3.5rem; }
  .polaroid { align-self: center; }
  .polaroid img { width: min(72vw, 20rem); }
  .stitch { margin-bottom: 5vh; }
  .in-view .stitch-line { width: 100%; }
  .heading { font-size: clamp(2.5rem, 13vw, 4.5rem); }
}
</style>
