<template>
  <div v-if="chapter" ref="pageEl" class="chapter-page">
    <!-- Single content child = Lenis's scrolled element (wrapper is .chapter-page). -->
    <div ref="scrollEl" class="chapter-scroll">
      <!-- Hero: transparent so the WebGL card (animated to fill the screen by the
           select transition, in app.vue's persistent scene) reads as the hero. As
           you scroll, the scene couples the card to the scroll so it rises away. -->
      <section class="chapter-hero" aria-hidden="true" />

      <!-- Built inner page (data-driven) when content exists for this chapter… -->
      <div v-if="pageContent" class="chapter-content">
        <ChapterSection
          v-for="(section, i) in pageContent.sections"
          :key="i"
          :section="section"
        />
        <footer class="chapter-end">
          <button class="back-link" @click="$router.push('/')">↑ Back to chapters</button>
        </footer>
      </div>

      <!-- …otherwise the scaffold (chapters not yet built: la-storia, eat, amour). -->
      <section v-else class="chapter-body">
        <h1 class="chapter-title">{{ chapter.title }}</h1>
        <p class="chapter-note">
          Inner-page scaffold. Content for this chapter is not built yet — see
          <code>docs/PHASE-2-INNER-PAGES.md</code>.
        </p>
      </section>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, onBeforeUnmount, inject, ref } from 'vue'
import Lenis from 'lenis'
import { gsap } from 'gsap'
import { CHAPTERS } from '~/composables/useChapterScene'
import { CHAPTER_PAGES } from '~/composables/chapterPages'
import ChapterSection from '~/components/chapter/ChapterSection.vue'

const route = useRoute()
const router = useRouter()
const chapter = computed(() => CHAPTERS.find((c) => c.slug === route.params.slug))
const pageContent = computed(() => CHAPTER_PAGES[route.params.slug])

// Reach the persistent WebGL scene (provided by app.vue) so page scroll can drive
// the hero-card coupling (P1). It's the same scene instance across all routes.
const webglSceneRef = inject('webglSceneRef', null)

const pageEl = ref(null)
const scrollEl = ref(null)
let lenis = null

// Exit gestures live ONLY at the page edges — mid-page scrolling is free.
//  • Bottom edge, keep scrolling DOWN  → forward return (card spins forward back into
//    the ring as the ring reassembles + content slides away). Reference setPageProgress.
//  • Top edge,    keep scrolling UP    → reverse (card un-grows back into the ring the
//    way it entered) via the existing deselect spin.
// (Previously the scene's global window-wheel handler exited on ANY up-scroll mid-page,
// and its reverse fired from trackpad bounce at the bottom — both removed in the scene.)
const END_EXIT_THRESHOLD = 800   // px of overscroll past an edge to trigger
const EXIT_SPIN_DUR = 3.0        // option B: forward spin/ring-reassemble (reference's 3s tween)
const EXIT_SLIDE_DUR = 1.0       // option B: content slide-out (reference's 1s)
let endAccum = 0                 // bottom overscroll accumulator
let topAccum = 0                 // top overscroll accumulator
let exiting = false
let forwardActive = false        // a forward exit tween is mid-flight (unmount cleanup)
let exitTl = null

function onWheel(e) {
  if (exiting || !lenis) return
  const atBottom = lenis.limit > 0 && lenis.scroll >= lenis.limit - 2
  const atTop = lenis.scroll <= 2
  if (atBottom && e.deltaY > 0) {            // bottom edge, pushing down → exit
    endAccum += e.deltaY; topAccum = 0
    if (endAccum >= END_EXIT_THRESHOLD) {
      // Wine O'Clock: bottom exit = the SAME reverse-spin as the top edge (option A —
      // known-good, identical timing/feel). Other chapters: the forward "drop into the
      // ring" experiment (option B — replicating the reference) lives on doExitForward.
      if (route.params.slug === 'wine-o-clock') doExitReverse()
      else doExitForward()
    }
  } else if (atTop && e.deltaY < 0) {        // top edge, pushing up → reverse exit (all pages)
    topAccum += -e.deltaY; endAccum = 0
    if (topAccum >= END_EXIT_THRESHOLD) doExitReverse()
  } else {                                   // mid-page → free scroll, no exit
    endAccum = 0; topAccum = 0
  }
}

// OPTION B (non-Wine pages): replicate the reference's `c()` bottom exit — the forward
// "drop into the spinning ring." A 3s power4.inOut tween drives `setExitProgress` (the
// +290° forward spin + ring reassemble, mirroring the reference's window.setPageProgress),
// while the page CONTENT slides out to the side over ~1s (reference slides .chapter-container
// /.tails to x:100%). The hero is snapped to ring-centre in beginExit, so it's a full-bleed
// card shrinking in place as the content slides off and the ring spins up around it.
function doExitForward() {
  if (exiting) return
  exiting = true
  lenis?.stop()
  const scene = webglSceneRef?.value?.scene
  if (!scene || typeof scene.beginExit !== 'function' || !scene.beginExit()) { router.push('/'); return }
  forwardActive = true
  const el = scrollEl.value
  const p = { v: 0 }
  exitTl = gsap.timeline({
    onComplete: () => { forwardActive = false; scene.endExit(); router.push('/') },
  })
    .to(p, { v: 1, duration: EXIT_SPIN_DUR, ease: 'power4.inOut',
             onUpdate: () => scene.setExitProgress(p.v) }, 0)
    .to(el, { xPercent: 110, duration: EXIT_SLIDE_DUR, ease: 'power2.in' }, 0)
}

// Top: reverse back into the ring — the existing deselect spin via the route watcher.
function doExitReverse() {
  if (exiting) return
  exiting = true
  lenis?.stop()
  router.push('/')   // app.vue route watcher → scene.deselectChapter() (reverse-spin into ring)
}

onMounted(() => {
  if (!chapter.value) { navigateTo('/'); return }

  const scene = webglSceneRef?.value?.scene

  // Lenis drives the inner page's smooth scroll (the single clock). Each scroll
  // tick we feed the position to the scene, which moves the hero card up in
  // lockstep — the card "scrolls away" instead of being overlaid (P1). autoRaf
  // runs Lenis's own rAF; the scene reads the value in its render loop.
  lenis = new Lenis({
    wrapper: pageEl.value,
    content: scrollEl.value,
    autoRaf: true,
  })
  lenis.on('scroll', (e) => scene?.setScroll(e.scroll))
  scene?.setScroll(0)

  pageEl.value?.addEventListener('wheel', onWheel, { passive: true })
})

onBeforeUnmount(() => {
  pageEl.value?.removeEventListener('wheel', onWheel)
  // If we unmount mid-exit for any other reason, kill the tween and release the
  // scene's exit lock so it doesn't get stuck in the selected/exiting state.
  exitTl?.kill()
  exitTl = null
  // Only release the forward-exit lock if a forward tween was actually mid-flight;
  // the reverse exit uses deselectChapter() and must not be cut short here.
  if (forwardActive) webglSceneRef?.value?.scene?.endExit?.()
  lenis?.destroy()
  lenis = null
  webglSceneRef?.value?.scene?.setScroll(0)
})
</script>

<style scoped>
/* Full-screen scroll container above the canvas/hit-layer (z-5) but below the
   nav (z-20) and About panel (z-50). */
.chapter-page {
  position: fixed;
  inset: 0;
  z-index: 10;
  height: 100dvh;
  overflow-x: hidden;
  overflow-y: auto;
}
/* Lenis adds .lenis-smooth to the wrapper — kill native smooth so it doesn't fight. */
.chapter-page.lenis-smooth {
  scroll-behavior: auto;
}

/* The single scrolled content element (Lenis `content`). */
.chapter-scroll {
  position: relative;
  width: 100%;
}

/* Transparent hero — the WebGL hero shows through here. */
.chapter-hero {
  height: 100dvh;
}

/* Content scrolls up over the (fixed) WebGL hero on the chapter's light accent. */
.chapter-content {
  background: var(--accentLight, #f3ebe4);
}

.chapter-end {
  min-height: 40vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--accentLight, #f3ebe4);
}
.back-link {
  font-family: 'Bague', sans-serif;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  font-size: 0.85rem;
  color: var(--accent, #333);
  background: none;
  border: 1px solid currentColor;
  border-radius: 9999px;
  padding: 0.75rem 1.5rem;
  cursor: none;
}

/* Scaffold fallback (unbuilt chapters) */
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
