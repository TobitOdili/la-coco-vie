<template>
  <section
    ref="root"
    class="chapter-section"
    :class="[`align-${section.align || 'left'}`, { 'in-view': visible }]"
  >
    <div class="split">
      <div class="media">
        <img class="shot" :src="sideImage" :alt="`${section.title}`" loading="lazy" />
      </div>

      <div class="copy">
        <div class="watermark" aria-hidden="true">{{ section.num }}</div>
        <div class="num">Chapter {{ section.num }}</div>
        <h2 class="heading">{{ section.title }}</h2>
        <p class="body">{{ section.body }}</p>
      </div>
    </div>

    <!-- Full-bleed immersive bands (the reference's big single photos between copy blocks). -->
    <img
      v-for="(src, i) in fullImages"
      :key="i"
      class="full-shot"
      :src="src"
      :alt="`${section.title} ${i + 1}`"
      loading="lazy"
    />
  </section>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'

const props = defineProps({
  section: { type: Object, required: true },
})

// First image leads the split (the side photo); the rest become full-bleed bands.
const sideImage = computed(() => props.section.images?.[0] || '')
const fullImages = computed(() => (props.section.images || []).slice(1))

// Reveal on first enter (latches — content shouldn't re-hide on scroll-up). The
// the floating popup cards are a separate, page-level concern (they toggle with the active section).
const root = ref(null)
const visible = ref(false)
let observer = null
onMounted(() => {
  observer = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting) {
        visible.value = true
        observer.disconnect()
      }
    },
    { threshold: 0.18 }
  )
  if (root.value) observer.observe(root.value)
})
onBeforeUnmount(() => observer?.disconnect())
</script>

<style scoped>
.chapter-section {
  position: relative;
}

/* Immersive split: a full-height photo flush to one edge + the copy on the other. */
.split {
  display: flex;
  min-height: 100dvh;
  align-items: stretch;
}
.align-right .split { flex-direction: row-reverse; }

.media {
  flex: 0 0 50%;
  overflow: hidden;
}
.shot {
  width: 100%;
  height: 100dvh;
  object-fit: cover;
  display: block;
  opacity: 0;
  transform: scale(1.05);
  transition: opacity 1s ease, transform 1.6s ease;
}
.in-view .shot { opacity: 1; transform: none; }

.copy {
  flex: 1 1 50%;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 10vh 7vw;
  box-sizing: border-box;
  color: var(--accent, #333);
}
.copy > :not(.watermark) {
  opacity: 0;
  transform: translateY(34px);
  transition: opacity 0.9s ease 0.1s, transform 0.9s ease 0.1s;
}
.in-view .copy > :not(.watermark) { opacity: 1; transform: none; }

/* Oversized faint section numeral behind the copy. */
.watermark {
  position: absolute;
  top: 4vh;
  inset-inline-start: 5vw;
  font-family: 'Bague', sans-serif;
  font-weight: 700;
  font-size: 26vh;
  line-height: 0.8;
  opacity: 0.06;
  pointer-events: none;
  user-select: none;
}

.num {
  text-transform: uppercase;
  letter-spacing: 0.16em;
  font-size: 0.8rem;
  opacity: 0.6;
  margin-bottom: 1rem;
}
.heading {
  font-family: 'Bague', sans-serif;
  font-weight: 700;
  font-size: clamp(2.75rem, 8vw, 7rem);
  line-height: 0.92;
  letter-spacing: 0.02em;
  margin: 0 0 1.5rem;
}
.body {
  max-width: 32rem;
  font-size: 1.05rem;
  line-height: 1.7;
  opacity: 0.85;
  margin: 0;
}

.full-shot {
  width: 100%;
  height: 92dvh;
  object-fit: cover;
  display: block;
  opacity: 0;
  transform: scale(1.05);
  transition: opacity 1.1s ease, transform 1.8s ease;
}
.in-view .full-shot { opacity: 1; transform: none; }

@media (max-width: 768px) {
  .split { flex-direction: column; }
  .align-right .split { flex-direction: column; }
  .media { flex: none; }
  .shot { height: 62dvh; }
  .copy { padding: 8vh 8vw; }
  .heading { font-size: clamp(2.5rem, 14vw, 5rem); }
  .full-shot { height: 70dvh; }
}
</style>
