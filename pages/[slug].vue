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
import gsap from 'gsap'
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
//   • Top edge, keep scrolling UP → REVERSE rewind: navigate home, the app.vue route watcher runs
//     scene.deselectChapter() (hero shrinks, ring reverse-spins back). Seamless because at scroll 0
//     you're already looking at the WebGL hero through the transparent .chapter-hero.
//   • Bottom edge, keep scrolling DOWN → FORWARD ride-into-the-ring (the reference's setPageProgress):
//     the REAL selected card returns from its scrolled-off position and rotates into the deck spinning
//     forward, while the opaque DOM article CROSS-FADES out (no transform) to reveal it. One WebGL
//     motion + a fade — NOT a 2D DOM shrink over a separately-spinning scene (the prior dead ends).
const EXIT_THRESHOLD = 800   // px of overscroll past an edge to trigger the exit
let endAccum = 0             // bottom overscroll accumulator
let topAccum = 0             // top overscroll accumulator
let lastWheelT = 0           // last wheel-event time — a gap means a new gesture
let exiting = false          // an exit fired (navigating home) — lock out further input
let ready = false            // select-in settled — scroll + exit gestures enabled
let readyPoll = null
let settleTries = 0          // waitSettled attempts — bounded so a failed scene can't freeze the page
const SETTLE_DEADLINE = 40   // ~8s at 200ms/try before we enable scroll without the select-in handoff

function onWheel(e) {
  if (!ready || !lenis || exiting) return
  // Normalize deltas: Firefox fires deltaMode=1 (lines, ~3 per notch) — comparing raw line
  // counts against a pixel threshold made exits near-unreachable there. ~40px/line ≈
  // Chrome's ~120px notch.
  const dy = e.deltaY * (e.deltaMode === 1 ? 40 : e.deltaMode === 2 ? window.innerHeight : 1)
  const now = performance.now()
  if (now - lastWheelT > 400) { endAccum = 0; topAccum = 0 }   // a pause = a new gesture
  lastWheelT = now
  const atBottom = lenis.limit > 0 && lenis.scroll >= lenis.limit - 2
  const atTop = lenis.scroll <= 2
  if (atBottom && dy > 0) {            // bottom edge, pushing down → forward "drop into deck"
    endAccum += dy; topAccum = 0
    if (endAccum >= EXIT_THRESHOLD) doExit(true)
  } else if (atTop && dy < 0) {        // top edge, pushing up → reverse rewind
    topAccum += -dy; endAccum = 0
    if (topAccum >= EXIT_THRESHOLD) doExit(false)
  } else {                             // mid-page → free scroll, no exit
    endAccum = 0; topAccum = 0
  }
}

// BOTTOM edge → forward ride-into-the-ring, the faithful reference mechanism (window.setPageProgress).
// scene.beginExit() captures the selected card's current (scrolled-off) pose; a single GSAP tween then
// drives de 0→1 through scene.setExitProgress(de), which returns the REAL card home, scales it hero→1,
// and rotates it into the deck spinning forward (+290°) with the other cards rising from below — ONE
// clock, one coordinate system. The DOM page only CROSS-FADES its opacity out (no transform) once the
// card is home (~de FADE_START), revealing the real card to ride in; it unmounts on navigate. endExit()
// finalizes the homepage ring BEFORE router.push so the route watcher sees selectedIndex=-1 and doesn't
// also fire deselectChapter. (Top edge / back / a scene without beginExit → plain reverse via the watcher.)
function doExit(fromBottom) {
  if (exiting) return
  exiting = true
  lenis?.stop()
  const scene = webglSceneRef?.value?.scene
  if (fromBottom && scene?.beginExit && scene.beginExit()) {
    const el = pageEl.value
    const FADE_START = 0.45   // hero is home by here (HERO_RETURN_END) — start revealing the real card
    const FADE_END = 0.62
    const driver = { de: 0 }
    gsap.to(driver, {
      de: 1,
      duration: 2.6,
      ease: 'power4.inOut',
      onUpdate: () => {
        scene.setExitProgress(driver.de)
        if (el) {
          const o = driver.de <= FADE_START ? 1
            : driver.de >= FADE_END ? 0
            : 1 - (driver.de - FADE_START) / (FADE_END - FADE_START)
          el.style.opacity = String(o)
        }
      },
      onComplete: () => { scene.endExit(); router.push('/') },
    })
    return
  }
  router.push('/')   // top edge / back → deselectChapter via the watcher
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

  // Hold scrolling until the select-in animation settles. Scrolling mid-select used
  // to (a) bank scrollOffsetPx that snapped the hero the moment isSelecting cleared
  // (teleport), and (b) let an accidental up-wheel trigger the top exit during entry.
  lenis.stop()
  const waitSettled = () => {
    const st = webglSceneRef?.value?.scene?.getState?.()
    // Strict: THIS chapter selected and fully settled. (`selectedIndex !== -1` alone
    // passes during a mid-flight deselect of the same chapter — back-then-forward —
    // which would open scrolling/exits during the resync re-select.)
    const settled = st && st.introComplete && st.selectedIndex === chapter.value?.index &&
        !st.isSelecting && !st.isDeselecting
    if (settled) {
      ready = true
      lenis?.start()
    } else if (settleTries >= SETTLE_DEADLINE) {
      // Deadline fallback: if the scene never settles (e.g. WebGL init threw, so introComplete
      // never flips), don't leave the page frozen with Lenis stopped — enable scroll + the
      // edge-exit gestures so the (DOM) content is readable and the user can navigate home.
      console.warn('[chapter] scene did not settle in time — enabling scroll without the select-in handoff')
      ready = true
      lenis?.start()
    } else {
      settleTries += 1
      readyPoll = setTimeout(waitSettled, 200)
    }
  }
  waitSettled()

  pageEl.value?.addEventListener('wheel', onWheel, { passive: true })
})

onBeforeUnmount(() => {
  pageEl.value?.removeEventListener('wheel', onWheel)
  if (readyPoll) clearTimeout(readyPoll)
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
