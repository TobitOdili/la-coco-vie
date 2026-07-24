<template>
  <footer ref="root" class="chapter-end" :class="{ 'in-view': visible }">
    <h3 class="end-title">See you there.</h3>

    <div class="pills">
      <a class="pill" :href="SITE.nav.collectionUrl" target="_blank" rel="noopener noreferrer">
        RSVP <span class="arrow">↗</span>
      </a>
    </div>

    <div class="socials">
      <!-- PLACEHOLDER — the couple's hashtag / Instagram when they have one. -->
      <span class="hashtag">#CovenantAndUvie</span>
    </div>

    <p class="disclaimer">
      Placeholder details — dates, times, venues and links on this page are stand-ins
      until Covenant &amp; Uvie confirm the real ones. Keep scrolling to return to the
      chapters.
    </p>
  </footer>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { SITE } from '~/site.config'

const props = defineProps({
  chapter: { type: Object, required: true }, // { slug, title, … }
})

const root = ref(null)
const visible = ref(false)
let observer = null
onMounted(() => {
  observer = new IntersectionObserver(
    (entries) => { if (entries[0].isIntersecting) { visible.value = true; observer.disconnect() } },
    { threshold: 0.25 }
  )
  if (root.value) observer.observe(root.value)
})
onBeforeUnmount(() => observer?.disconnect())
</script>

<style scoped>
.chapter-end {
  min-height: 100dvh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  padding: 14vh 8vw;
  box-sizing: border-box;
  text-align: center;
  color: var(--accent, #333);
  background: var(--accentLight, #F2EEE8);
}
.chapter-end > * {
  opacity: 0;
  transform: translateY(28px);
  transition: opacity 0.9s ease, transform 0.9s ease;
}
.in-view > * { opacity: 1; transform: none; }
.in-view .pills { transition-delay: 0.1s; }
.in-view .socials { transition-delay: 0.2s; }
.in-view .disclaimer { transition-delay: 0.3s; }

.end-title {
  font-family: 'Bague', sans-serif;
  font-weight: 500;
  font-size: clamp(1.5rem, 3.5vw, 2.4rem);
  letter-spacing: 0.01em;
  margin: 0;
}
.pills {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  justify-content: center;
}
.pill {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: var(--accent, #333);
  color: var(--accentLight, #fff);
  text-decoration: none;
  font-family: 'Bague', sans-serif;
  font-size: 1.05rem;
  letter-spacing: 0.02em;
  padding: 0.85rem 1.75rem;
  border-radius: 9999px;
  cursor: none;
  transition: transform 0.3s ease, opacity 0.3s ease;
}
.pill:hover { transform: translateY(-2px); }
.arrow { font-size: 0.9em; opacity: 0.8; }

.socials {
  display: flex;
  gap: 1.5rem;
  color: var(--accent, #333);
}
.socials a { color: inherit; cursor: none; transition: opacity 0.3s ease; }
.socials a:hover { opacity: 0.6; }
.hashtag {
  font-family: 'Bague', sans-serif;
  letter-spacing: 0.08em;
  opacity: 0.7;
}

.disclaimer {
  max-width: 40rem;
  margin: 0;
  font-family: 'Bague', sans-serif;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  font-size: 0.85rem;
  line-height: 1.9;
  opacity: 0.45;
}
</style>
