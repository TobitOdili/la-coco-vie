<template>
  <div class="big-day">
    <!-- ── TWO INVITATIONS ──────────────────────────────────────────────────
         The chapter is the site's only piece of formal print: a cover that
         answers "which days?" in one image, then one invitation per wedding.

         The page's job is logistics, so the INFORMATION is the composition and
         motion never competes with it: each sheet sets itself (a short stagger,
         everything done inside ~1.3s) and is then COMPLETELY STILL while you
         read. There is no rAF loop and nothing scrubs — the previous version
         drew a thread continuously through each scene, and peripheral motion
         beats static text every time, so an address could never hold your eye.

         The two invitations are printed on different stock: the traditional is
         a deep olive field, centred and ornamented; the white wedding is the
         pale sheet, asymmetric and spare. Two days, two typographies, nothing
         explained in words. -->
    <section
      v-for="(s, i) in sections"
      :key="i"
      :ref="setSceneRef"
      class="chapter-section invite-scene"
      :class="[`is-${s.kind}`, s.variant ? `on-${s.variant}` : '', { 'in-view': inView[i] }]"
      :data-idx="i"
    >
      <!-- ── the cover: both dates at once ── -->
      <div v-if="s.kind === 'cover'" class="sheet cover-sheet">
        <div class="eyebrow set" :style="{ '--i': 0 }">{{ s.eyebrow }}</div>
        <p class="lead set" :style="{ '--i': 1 }">{{ s.lead }}</p>

        <div class="two-dates">
          <div class="date-col set" :style="{ '--i': 2 }">
            <div class="numeral">{{ s.dates[0].n }}</div>
            <div class="date-weekday">{{ s.dates[0].weekday }}</div>
            <div class="date-label">{{ s.dates[0].label }}</div>
          </div>
          <span class="col-rule" :style="{ '--i': 3 }" aria-hidden="true" />
          <div class="date-col set" :style="{ '--i': 3 }">
            <div class="numeral">{{ s.dates[1].n }}</div>
            <div class="date-weekday">{{ s.dates[1].weekday }}</div>
            <div class="date-label">{{ s.dates[1].label }}</div>
          </div>
        </div>

        <p class="cover-note set" :style="{ '--i': 4 }">{{ s.note }}</p>
      </div>

      <!-- ── an invitation ── -->
      <div v-else class="sheet invite-sheet">
        <div class="ghost" aria-hidden="true">{{ s.dateNumerals }}</div>

        <div class="rank set" :style="{ '--i': 0 }">{{ s.rank }}</div>
        <span class="rule" :style="{ '--i': 1 }" aria-hidden="true" />
        <span v-if="s.variant === 'traditional'" class="orn" :style="{ '--i': 2 }" aria-hidden="true" />

        <h2 class="invite-title set" :style="{ '--i': 2 }">{{ s.label }}</h2>

        <div class="date-words set" :style="{ '--i': 3 }">
          <span class="weekday">{{ s.weekday }}</span>
          <span class="words">{{ s.dateWords }}</span>
          <span class="words year">{{ s.yearWords }}</span>
        </div>

        <span class="rule short" :style="{ '--i': 4 }" aria-hidden="true" />

        <dl class="order">
          <div
            v-for="(e, j) in s.events"
            :key="j"
            class="event set"
            :style="{ '--i': 5 + j }"
          >
            <dt class="event-time">{{ e.time }}</dt>
            <dd class="event-body">
              <div class="event-name">{{ e.name }}</div>
              <div class="event-venue">{{ e.venue }}</div>
              <div class="event-address">{{ e.address }}</div>
            </dd>
          </div>
        </dl>

        <div class="dress set" :style="{ '--i': 5 + s.events.length }">{{ s.dress }}</div>
        <div class="note set" :style="{ '--i': 6 + s.events.length }">{{ s.note }}</div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

defineProps({
  sections: { type: Array, required: true },
})

// Latch on first enter, then never touch the DOM again — the whole point of this
// page is that it stops moving. (The other bespoke pages run an rAF loop because
// their motion IS the scroll; here motion is only an arrival.)
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
    { threshold: 0.14 }
  )
  sceneEls.forEach((el) => observer.observe(el))
})
onBeforeUnmount(() => observer?.disconnect())
</script>

<style scoped>
.invite-scene {
  position: relative;
  min-height: 100dvh;
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  padding: 14vh 7vw 12vh;
  overflow: hidden;
  color: var(--accent, #41492D);
  background: #F1F3EC;
}

/* ── the two stocks ──
   A hard cut from pale to deep and back: two invitations printed on two
   different papers. (This is also the long-open "section bg alternates
   dark/light" item, delivered for this chapter.) */
.is-cover { background: linear-gradient(#F1F3EC, #E9ECE2); }
.on-traditional { background: #2E3620; color: #E9ECE2; }
.on-white { background: #F1F3EC; color: #41492D; }

.sheet { position: relative; z-index: 1; width: 100%; }

/* ── the arrival: a short set, then stillness ──
   Everything lands within ~1.3s of the sheet entering. Nothing animates
   afterwards, and nothing is tied to scroll. */
.set {
  opacity: 0;
  transform: translateY(14px);
  transition:
    opacity 0.62s ease,
    transform 0.62s cubic-bezier(0.22, 1, 0.36, 1);
  transition-delay: calc(var(--i, 0) * 90ms);
}
.in-view .set { opacity: 1; transform: none; }

/* Rules draw once, quickly, and stop — they are typographic furniture, not a
   thread being pulled through the page. */
.rule {
  display: block;
  height: 1px;
  background: currentColor;
  opacity: 0.32;
  transform: scaleX(0);
  transition: transform 0.55s cubic-bezier(0.22, 1, 0.36, 1);
  transition-delay: calc(var(--i, 0) * 90ms);
}
.in-view .rule { transform: scaleX(1); }

/* ── the cover ── */
.cover-sheet { text-align: center; max-width: 54rem; margin: 0 auto; }
.eyebrow {
  font-family: 'Bague', sans-serif;
  font-size: 0.72rem;
  letter-spacing: 0.36em;
  text-transform: uppercase;
  opacity: 0.6;
}
.lead {
  font-family: 'Italiana', serif;
  font-size: clamp(1.9rem, 4.6vw, 3.4rem);
  line-height: 1.18;
  margin: 1.6rem 0 0;
}
.two-dates {
  display: flex;
  align-items: stretch;
  justify-content: center;
  gap: clamp(1.6rem, 6vw, 5rem);
  margin: clamp(3rem, 7vh, 5rem) 0 0;
}
.col-rule {
  width: 1px;
  align-self: stretch;
  background: currentColor;
  opacity: 0.22;
  transform: scaleY(0);
  transition: transform 0.6s cubic-bezier(0.22, 1, 0.36, 1);
  transition-delay: calc(var(--i, 0) * 90ms);
}
.in-view .col-rule { transform: scaleY(1); }
.date-col { min-width: 0; }
.numeral {
  font-family: 'Italiana', serif;
  font-size: clamp(4.4rem, 15vw, 11rem);
  line-height: 0.9;
  letter-spacing: 0.02em;
}
.date-weekday {
  font-family: 'Italiana', serif;
  font-size: clamp(0.95rem, 1.8vw, 1.3rem);
  margin-top: 0.6rem;
  opacity: 0.75;
}
.date-label {
  font-family: 'Bague', sans-serif;
  font-size: 0.66rem;
  letter-spacing: 0.3em;
  text-transform: uppercase;
  margin-top: 0.7rem;
  opacity: 0.85;
}
.cover-note {
  font-family: 'Bague', sans-serif;
  font-size: 0.94rem;
  line-height: 1.8;
  opacity: 0.7;
  max-width: 34rem;
  margin: clamp(2.6rem, 6vh, 4rem) auto 0;
}

/* ── an invitation, shared bones ── */
/* The date as a cropped watermark. It BLEEDS OFF THE BOTTOM edge rather than
   sitting behind the copy: centred behind centred text it fought the very
   information this page exists to present (the date words read over its strokes). */
.ghost {
  position: absolute;
  inset-inline-start: 50%;
  bottom: -0.24em;
  transform: translateX(-50%);
  font-family: 'Italiana', serif;
  font-size: clamp(7rem, 26vw, 22rem);
  line-height: 1;
  opacity: 0.05;
  pointer-events: none;
  user-select: none;
  white-space: nowrap;
  z-index: -1;
}
.rank {
  font-family: 'Bague', sans-serif;
  font-size: 0.68rem;
  letter-spacing: 0.42em;
  text-transform: uppercase;
  opacity: 0.65;
}
.invite-title { margin: 1.5rem 0 0; font-weight: 400; }
.date-words { margin-top: 1.5rem; }
.weekday,
.words {
  display: block;
  font-family: 'Italiana', serif;
  line-height: 1.5;
}
.weekday {
  font-family: 'Bague', sans-serif;
  font-size: 0.7rem;
  letter-spacing: 0.34em;
  text-transform: uppercase;
  opacity: 0.7;
  margin-bottom: 0.7rem;
}
.words { font-size: clamp(1.05rem, 2.1vw, 1.5rem); }
.words.year { opacity: 0.66; }

.order { margin: 2.2rem 0 0; padding: 0; }
.event { margin: 0 0 1.6rem; }
.event:last-child { margin-bottom: 0; }
.event-time {
  font-family: 'Bague', sans-serif;
  font-size: 0.72rem;
  letter-spacing: 0.28em;
  text-transform: uppercase;
  opacity: 0.7;
}
.event-body { margin: 0; }
.event-name {
  font-family: 'Italiana', serif;
  font-size: clamp(1.25rem, 2.6vw, 1.8rem);
  line-height: 1.3;
  margin-top: 0.35rem;
}
.event-venue,
.event-address {
  font-family: 'Bague', sans-serif;
  font-size: 0.9rem;
  line-height: 1.7;
  opacity: 0.72;
}
.dress,
.note {
  font-family: 'Bague', sans-serif;
  font-size: 0.86rem;
  line-height: 1.8;
}
.dress {
  margin-top: 2.4rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  opacity: 0.8;
}
.note { margin-top: 0.8rem; opacity: 0.6; }

/* ── I · THE TRADITIONAL — centred, ornamented, dense ── */
.on-traditional .invite-sheet {
  text-align: center;
  max-width: 44rem;
  margin: 0 auto;
}
.on-traditional .invite-title {
  font-family: 'Italiana', serif;
  font-size: clamp(2.4rem, 6.4vw, 4.8rem);
  line-height: 1.06;
  letter-spacing: 0.03em;
}
.on-traditional .rule { width: min(30rem, 68%); margin: 1.5rem auto 0; }
.on-traditional .rule.short { width: min(11rem, 34%); margin-top: 2.2rem; }
/* the ornament: a set diamond between the rules — type furniture, not drawing */
.on-traditional .orn {
  display: block;
  width: 0.42rem;
  height: 0.42rem;
  margin: 1.4rem auto -0.6rem;
  background: currentColor;
  opacity: 0.5;
  transform: rotate(45deg) scale(0);
  transition: transform 0.5s cubic-bezier(0.22, 1, 0.36, 1);
  transition-delay: calc(var(--i, 0) * 90ms);
}
/* .in-view and .on-traditional are the SAME element (the section), so this is a
   compound selector, not a descendant one. */
.on-traditional.in-view .orn { transform: rotate(45deg) scale(1); }
.on-traditional .order { margin-top: 2.6rem; }
.on-traditional .event-time { letter-spacing: 0.34em; }
.on-traditional .ghost { opacity: 0.055; }   /* light-on-dark reads hotter */

/* ── II · THE WHITE WEDDING — asymmetric, spare, modern ── */
.on-white .invite-sheet {
  text-align: start;
  max-width: 52rem;
  margin: 0 auto;
}
.on-white .invite-title {
  font-family: 'Bague', sans-serif;
  font-weight: 700;
  font-size: clamp(2.1rem, 5.4vw, 4rem);
  line-height: 1;
  letter-spacing: 0.01em;
  text-transform: uppercase;
}
.on-white .rule { width: min(26rem, 60%); margin: 1.4rem 0 0; }
.on-white .rule.short { width: 6rem; margin-top: 2.2rem; }
.on-white .ghost {
  inset-inline-start: auto;
  inset-inline-end: -1.5vw;
  transform: none;
  font-size: clamp(6rem, 22vw, 18rem);
  opacity: 0.05;
}
/* the order of the day reads as a schedule: time in the margin, event beside it */
.on-white .order {
  display: grid;
  grid-template-columns: minmax(6rem, 9rem) 1fr;
  column-gap: clamp(1.2rem, 4vw, 3rem);
  row-gap: 1.8rem;
}
.on-white .event {
  display: contents;
  margin: 0;
}
.on-white .event-time { padding-top: 0.55rem; }
.on-white .event-name { margin-top: 0; }

@media (max-width: 768px) {
  /* ⚠️ The floating map/calendar cards are FIXED to the viewport bottom (.popup-stack
     in [slug].vue) and are ~108px tall on a phone, and the white wedding's sheet is
     taller than the viewport. Bottom padding CANNOT fix that overlap: once a scene
     outgrows 100dvh the sheet's position is pinned by padding-TOP, so raising
     padding-bottom only grows the section and leaves the copy exactly where it was
     (measured: content ended at the same viewport y with 11rem as with 0).
     What actually clears the dock is a shorter column — a tighter top offset and
     tighter vertical rhythm — plus shorter card text in chapterPages.js. */
  .invite-scene { padding: 8vh 8vw 9rem; }
  .invite-sheet .date-words { margin-top: 1rem; }
  .invite-sheet .rule.short { margin-top: 1.5rem; }
  .invite-sheet .order { margin-top: 1.6rem; }
  .invite-sheet .dress { margin-top: 1.5rem; }
  .invite-sheet .event-venue,
  .invite-sheet .event-address { line-height: 1.55; }
  .on-white .invite-title { font-size: 1.9rem; }
  .on-traditional .invite-title { font-size: clamp(2rem, 9vw, 2.8rem); }
  .two-dates { gap: 1.4rem; }
  .numeral { font-size: clamp(3.6rem, 21vw, 6rem); }
  .date-label { font-size: 0.58rem; letter-spacing: 0.22em; }
  .on-traditional .rule { width: 78%; }
  .on-white .order {
    grid-template-columns: 1fr;
    row-gap: 0.4rem;
  }
  /* stacked: the time sits above its event again, so the pair must not split */
  .on-white .event { display: block; margin-bottom: 1.15rem; }
  .on-white .event-time { padding-top: 0; }
  .on-white .event-name { margin-top: 0.35rem; }
}

@media (prefers-reduced-motion: reduce) {
  .set,
  .rule,
  .col-rule,
  .on-traditional .orn { transition: none; }
}
</style>
