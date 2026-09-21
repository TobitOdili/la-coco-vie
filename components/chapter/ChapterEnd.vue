<template>
  <footer ref="root" class="chapter-end" :class="{ 'in-view': visible }">
    <!-- ⚠️ h2, not h3. Every chapter now opens with the site's single h1 (app.vue), and this
         footer is the only heading The Big Day has — an h3 there skipped a level with nothing
         in between (AUDIT #112). The class carries the styling; the level carries the outline. -->
    <h2 class="end-title">See you there.</h2>

    <!-- ⚠️ THE DATE, AND NOTHING ELSE ABOUT THE DAY. Same rule as The Big Day's page: a guest
         who has not RSVP'd gets the date and the form, never the time, the venue or the
         programme. `dateLabel` is the one string every surface on the site reads. -->
    <p class="end-date">{{ SITE.dateLabel }}</p>

    <div class="pills">
      <a class="pill" :href="SITE.nav.collectionUrl" target="_blank" rel="noopener noreferrer">
        RSVP <span class="arrow">↗</span>
      </a>
    </div>

    <!-- ⚠️ NO GIFT ACCOUNTS HERE (2026-09-15). They were in every chapter's footer for two days
         — "add their account details across the site" — and the couple asked for them back on FOR
         OUR NEXT CHAPTER alone, which is the page that is about giving. A wedding footer that asks
         on all four chapters asks too often. `components/GiftAccounts.vue` still carries the
         `tone="footer"` styling for the day it belongs here again. -->

    <div class="socials">
      <span class="hashtag">#LaCocoVie26</span>
    </div>
  </footer>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { SITE } from '~/site.config'

defineProps({
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
.in-view .socials { transition-delay: 0.26s; }

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
  opacity: 0.85;
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
/* ⚠️ THE QUIET VOICE HAS A FLOOR NOW (AUDIT #107). Every functional label in this site is the
   chapter's ink further lightened by an opacity, and the deep contrast scan on 2026-09-20 found
   26 instances under AA — the worst at 2.19:1. Measured per chapter against its own ground, the
   opacity needed for 4.5:1 runs 0.66 (Coco & Uvie's ink on paper) to 0.78 (The Big Day's on its
   sage). 0.82 clears all four with margin and is still visibly quieter than the copy it sits
   under; large type (>=24px) needs only 0.60, so 0.68 there. Raise the FLOOR, not the ink. */
  letter-spacing: 0.22em;
  font-size: 0.82rem;
  opacity: 0.82;
}
</style>
