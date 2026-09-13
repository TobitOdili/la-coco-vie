<template>
  <footer ref="root" class="chapter-end" :class="{ 'in-view': visible }">
    <h3 class="end-title">See you there.</h3>

    <!-- ⚠️ THE DATE, AND NOTHING ELSE ABOUT THE DAY. Same rule as The Big Day's page: a guest
         who has not RSVP'd gets the date and the form, never the time, the venue or the
         programme. `dateLabel` is the one string every surface on the site reads. -->
    <p class="end-date">{{ SITE.dateLabel }}</p>

    <div class="pills">
      <a class="pill" :href="SITE.nav.collectionUrl" target="_blank" rel="noopener noreferrer">
        RSVP <span class="arrow">↗</span>
      </a>
    </div>

    <!-- ⚠️ NOT ON WITH LOVE. That chapter IS the gift list and gives these same two accounts a
         section of their own a screen and a half above this one; printing them again under it
         reads as asking twice. Every other chapter ends here, so this is where they go. -->
    <GiftAccounts v-if="showGifts" tone="footer" />

    <div class="socials">
      <span class="hashtag">#LaCocoVie26</span>
    </div>
  </footer>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { SITE } from '~/site.config'
import GiftAccounts from '~/components/GiftAccounts.vue'

const props = defineProps({
  chapter: { type: Object, required: true }, // { slug, title, … }
})

const showGifts = computed(() => props.chapter?.slug !== 'with-love')

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
  /* ⚠️ NOT a full screen. It holds ~340px of content — a line, a button, a hashtag — and at
     100dvh that was 500px of nothing wrapped round it on a phone, on every chapter. It is a
     closing panel, not a scene: it needs air, not a viewport. */
  min-height: 62dvh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  padding: 9vh 8vw;
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
.in-view .end-date { transition-delay: 0.08s; }
.in-view .pills { transition-delay: 0.16s; }
.in-view .accounts { transition-delay: 0.26s; }
.in-view .socials { transition-delay: 0.34s; }

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

/* ⚠️ The old PLACEHOLDER DISCLAIMER lived here — "dates, times, venues and links on this page
   are stand-ins" — and it also told the reader to keep scrolling to get back to the chapters.
   Both are gone: the details it apologised for are the couple's real ones now, and the way back
   is a cue of its own below this footer (`.leave-cue` in pages/[slug].vue), which draws a closing
   ring as the page leaves rather than describing the gesture in a sentence. */
.end-date {
  margin: -1rem 0 0;
  font-family: 'Bague', sans-serif;
  text-transform: uppercase;
  letter-spacing: 0.22em;
  font-size: 0.8rem;
  opacity: 0.55;
}
</style>
