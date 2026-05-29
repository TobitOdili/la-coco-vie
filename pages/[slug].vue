<template>
  <div v-if="chapter" class="chapter-page">
    <!-- Hero: transparent so the WebGL card (animated to fill the screen by the
         select transition, in app.vue's persistent scene) reads as the hero. -->
    <section class="chapter-hero" aria-hidden="true" />

    <!-- Scaffold content. The real sections — sub-chapters, gallery/parallax,
         inline films, dress-tail cards — land in the Phase 2 content pass. This
         proves routing + the select transition + scroll all work end to end. -->
    <section class="chapter-body">
      <h1 class="chapter-title">{{ chapter.title }}</h1>
      <p class="chapter-note">
        Inner-page scaffold. Routing, the card-to-page transition, and scroll are wired.
        Sub-chapters, galleries, films, and dress-tail cards arrive in the content pass —
        see <code>docs/PHASE-2-INNER-PAGES.md</code>.
      </p>
    </section>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { CHAPTERS } from '~/composables/useChapterScene'

// Validate the slug against the chapter data; unknown slugs bounce home.
const route = useRoute()
const chapter = computed(() => CHAPTERS.find((c) => c.slug === route.params.slug))

onMounted(() => {
  if (!chapter.value) navigateTo('/')
})
</script>

<style scoped>
/* Full-screen scroll container above the canvas/hit-layer (z-5) but below the
   nav (z-20) and About panel (z-50), so the logo/back and About stay clickable. */
.chapter-page {
  position: fixed;
  inset: 0;
  z-index: 10;
  height: 100dvh;
  overflow-x: hidden;
  overflow-y: auto;
}

/* Transparent hero — the WebGL hero shows through here. */
.chapter-hero {
  height: 100dvh;
}

.chapter-body {
  min-height: 100dvh;
  background: var(--accentLight, #f3ebe4);
  color: var(--accent, #333);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 10vh 8vw;
  text-align: center;
}

.chapter-title {
  font-family: 'Movie', sans-serif;
  font-size: 12vh;
  line-height: 0.9;
  margin: 0;
}

.chapter-note {
  max-width: 42rem;
  margin-top: 2rem;
  font-size: 0.95rem;
  line-height: 1.6;
  opacity: 0.8;
}
</style>
