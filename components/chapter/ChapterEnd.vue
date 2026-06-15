<template>
  <footer ref="root" class="chapter-end" :class="{ 'in-view': visible }">
    <h3 class="end-title">Discover dress from the chapter</h3>

    <div class="pills">
      <a class="pill" :href="weddingUrl" target="_blank" rel="noopener noreferrer">
        Wedding <span class="arrow">↗</span>
      </a>
      <a class="pill" :href="eveningUrl" target="_blank" rel="noopener noreferrer">
        Evening <span class="arrow">↗</span>
      </a>
    </div>

    <div class="socials">
      <a href="https://www.instagram.com/millanova_official/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
        <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.6">
          <rect x="3" y="3" width="18" height="18" rx="5" />
          <circle cx="12" cy="12" r="4" />
          <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
        </svg>
      </a>
      <a href="https://www.tiktok.com/@millanova" target="_blank" rel="noopener noreferrer" aria-label="TikTok">
        <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
          <path d="M16.5 3c.3 2.1 1.6 3.6 3.5 3.9v2.4c-1.3.1-2.5-.3-3.6-1v6.1c0 3.2-2.6 5.6-5.7 5.3-2.7-.3-4.7-2.6-4.6-5.3.1-2.8 2.6-5 5.4-4.8v2.5c-.4-.1-.9-.2-1.3-.1-1.3.2-2.2 1.3-2.1 2.6.1 1.2 1.1 2.2 2.4 2.2 1.4 0 2.4-1 2.4-2.5V3h3.2z" />
        </svg>
      </a>
    </div>

    <p class="disclaimer">
      Disclaimer: names, characters, and stories presented are fictional and include a
      humorous undertone. Any resemblance to real individuals is purely coincidental.
    </p>
  </footer>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'

const props = defineProps({
  chapter: { type: Object, required: true }, // { slug, title, … }
})

// The reference's pills filter the collection; for the replica they point at the live
// collection (a content swap can repoint these per-chapter later).
const weddingUrl = computed(() => 'https://millanova.com/collection/chapter-bride')
const eveningUrl = computed(() => 'https://millanova.com/collection/chapter-bride')

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
  background: var(--accentLight, #f3ebe4);
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
