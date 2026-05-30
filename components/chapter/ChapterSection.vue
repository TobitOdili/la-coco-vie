<template>
  <section
    ref="root"
    class="chapter-section"
    :class="[`align-${section.align || 'left'}`, { 'in-view': visible }]"
  >
    <div class="media">
      <img
        v-for="(src, i) in section.images"
        :key="i"
        class="shot"
        :src="src"
        :alt="`${section.title} ${i + 1}`"
        loading="lazy"
      />
    </div>

    <div class="copy">
      <div class="num">Chapter {{ section.num }}</div>
      <h2 class="heading">{{ section.title }}</h2>
      <p class="body">{{ section.body }}</p>

      <div v-if="resolvedDresses.length" class="dresses">
        <DressTail v-for="d in resolvedDresses" :key="d.title" :dress="d" />
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { DRESSES } from '~/composables/chapterPages'
import DressTail from '~/components/chapter/DressTail.vue'

const props = defineProps({
  section: { type: Object, required: true },
})

const resolvedDresses = computed(() =>
  (props.section.dresses || []).map((slug) => DRESSES[slug]).filter(Boolean)
)

// Lightweight scroll reveal (fade-up on first enter). A richer ScrollTrigger/
// Lenis parallax pass can replace this later (see docs/PHASE-2-INNER-PAGES.md).
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
  min-height: 100dvh;
  display: flex;
  align-items: center;
  gap: 4vw;
  padding: 12vh 8vw;
  box-sizing: border-box;
}
.align-right { flex-direction: row-reverse; }

.media {
  flex: 1 1 45%;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}
.shot {
  width: 100%;
  height: auto;
  display: block;
  border-radius: 2px;
  /* staggered reveal */
  opacity: 0;
  transform: translateY(40px);
  transition: opacity 0.9s ease, transform 0.9s ease;
}
.in-view .shot { opacity: 1; transform: none; }
.in-view .shot:nth-child(2) { transition-delay: 0.12s; }
.in-view .shot:nth-child(3) { transition-delay: 0.24s; }

.copy {
  flex: 1 1 55%;
  color: var(--accent, #333);
  opacity: 0;
  transform: translateY(40px);
  transition: opacity 0.9s ease 0.1s, transform 0.9s ease 0.1s;
}
.in-view .copy { opacity: 1; transform: none; }

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
  font-size: clamp(3rem, 9vw, 8rem);
  line-height: 0.92;
  letter-spacing: 0.02em;
  margin: 0 0 1.5rem;
}
.body {
  max-width: 34rem;
  font-size: 1.05rem;
  line-height: 1.7;
  opacity: 0.85;
  margin: 0;
}
.dresses {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-top: 2.5rem;
}

@media (max-width: 768px) {
  .chapter-section,
  .align-right { flex-direction: column; justify-content: center; }
  .heading { font-size: clamp(2.5rem, 16vw, 5rem); }
}
</style>
