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
//  • Bottom edge, keep scrolling DOWN → the "drop into the deck" exit: SCROLL-COUPLED.
//    Overscroll drives exit progress 0→1 live; the card deck rises from below to "catch"
//    the page, which shrinks + falls + fades into it (scene.setExitProgress). Past
//    COMMIT_PROGRESS it auto-completes; scroll back up before that cancels + restores.
//  • Top edge, keep scrolling UP → reverse (card un-grows back into the ring the way it
//    entered) via the existing deselect spin. (Unchanged — this already feels right.)
// (Previously the scene's global window-wheel handler exited on ANY up-scroll mid-page,
// and its reverse fired from trackpad bounce at the bottom — both removed in the scene.)
const START_THRESHOLD = 40       // px overscroll past the BOTTOM to begin the coupled exit
const EXIT_TRAVEL = 1100         // px of overscroll mapped to exit progress 0→1
const COMMIT_PROGRESS = 0.55     // past this the exit auto-completes (no snap-back)
const COMMIT_DUR = 0.9           // s to auto-complete from the commit point → home
const TOP_EXIT_THRESHOLD = 800   // px overscroll past the TOP to reverse-exit
// DOM "fall into the deck" shape (page = the .chapter-page wrapper; canvas is behind it):
const PAGE_MIN_SCALE = 0.40      // page shrinks 1 → this, origin bottom-centre
const PAGE_FALL_VH = 15          // page also drifts down this many vh as it shrinks
const FADE_START = 0.45          // page stays opaque until here (hero returns under cover),
const FADE_END = 0.90            //   then fades out by here, revealing the risen deck
let endAccum = 0                 // bottom overscroll accumulator (before the exit starts)
let topAccum = 0                 // top overscroll accumulator
let exitAccum = 0                // overscroll driving exit progress once started
let exitProgress = 0
let lastWheelT = 0               // last wheel-event time — a gap means a new gesture
let bottomExiting = false        // coupled bottom exit in progress (cancellable)
let committing = false           // bottom exit auto-completing to home (input locked)
let reverseExiting = false       // top reverse exit fired (navigating home)
let ready = false                // select-in settled — scroll + exit gestures enabled
let readyPoll = null
let forwardActive = false        // commit tween mid-flight (unmount cleanup)
let exitTl = null

const getScene = () => webglSceneRef?.value?.scene

// Map exit progress onto the scene (deck rises to catch) + the DOM page (shrinks/falls/fades).
function applyExit(p) {
  exitProgress = Math.min(1, Math.max(0, p))
  getScene()?.setExitProgress(exitProgress)
  const el = pageEl.value
  if (!el) return
  const scale = 1 - (1 - PAGE_MIN_SCALE) * exitProgress
  const fall = PAGE_FALL_VH * exitProgress
  // Opaque (covering the hero's return) until FADE_START, then fade to 0 by FADE_END.
  const fade = 1 - Math.max(0, (exitProgress - FADE_START) / (FADE_END - FADE_START))
  el.style.transformOrigin = '50% 100%'
  el.style.transform = `translateY(${fall}vh) scale(${scale})`
  el.style.opacity = String(Math.max(0, Math.min(1, fade)))
}

function startBottomExit() {
  const scene = getScene()
  if (!scene?.beginExit || !scene.beginExit()) { reverseExiting = true; router.push('/'); return }
  bottomExiting = true
  committing = false
  lenis?.stop()
  exitAccum = endAccum   // carry over the overscroll that tripped the start (no jump)
  applyExit(exitAccum / EXIT_TRAVEL)
}

// Past the commit point: animate the remaining progress to 1, then go home. Snappy +
// proportional so a near-complete pull finishes fast.
function commitExit() {
  if (committing) return
  committing = true
  forwardActive = true
  const p = { v: exitProgress }
  exitTl = gsap.timeline({
    onComplete: () => { forwardActive = false; bottomExiting = false; getScene()?.endExit(); router.push('/') },
  }).to(p, {
    v: 1,
    duration: Math.max(0.2, COMMIT_DUR * (1 - exitProgress)),
    ease: 'power2.out',
    onUpdate: () => applyExit(p.v),
  })
}

// Uncommitted exit aborted (scrolled back up): restore the selected/scrolled state.
function cancelBottomExit() {
  bottomExiting = false
  exitAccum = 0; exitProgress = 0; endAccum = 0
  getScene()?.cancelExit?.()
  const el = pageEl.value
  if (el) { el.style.transform = ''; el.style.opacity = ''; el.style.transformOrigin = '' }
  lenis?.start()
}

function onWheel(e) {
  if (!ready || !lenis || reverseExiting) return
  // Normalize deltas: Firefox fires deltaMode=1 (lines, ~3 per notch) — comparing raw line
  // counts against a pixel threshold made exits near-unreachable there. ~40px/line ≈
  // Chrome's ~120px notch (WebGLScene's VirtualScroll uses firefoxMultiplier 50 too).
  const dy = e.deltaY * (e.deltaMode === 1 ? 40 : e.deltaMode === 2 ? window.innerHeight : 1)
  const now = performance.now()

  // Once the coupled bottom exit is running, EVERY wheel drives progress: down advances,
  // up rewinds. Reaching 0 cancels; reaching COMMIT auto-completes.
  if (bottomExiting && !committing) {
    exitAccum = Math.max(0, exitAccum + dy)
    const p = exitAccum / EXIT_TRAVEL
    if (p <= 0) { cancelBottomExit(); return }
    applyExit(p)
    if (p >= COMMIT_PROGRESS) commitExit()
    return
  }
  if (committing) return   // auto-completing — ignore input

  // Not exiting yet: a 400ms gap is a new gesture (slow notches at an edge shouldn't add up).
  if (now - lastWheelT > 400) { endAccum = 0; topAccum = 0 }
  lastWheelT = now
  const atBottom = lenis.limit > 0 && lenis.scroll >= lenis.limit - 2
  const atTop = lenis.scroll <= 2
  if (atBottom && dy > 0) {                  // bottom edge, pushing down → begin coupled exit
    endAccum += dy; topAccum = 0
    if (endAccum >= START_THRESHOLD) startBottomExit()
  } else if (atTop && dy < 0) {              // top edge, pushing up → reverse exit (all pages)
    topAccum += -dy; endAccum = 0
    if (topAccum >= TOP_EXIT_THRESHOLD) doExitReverse()
  } else {                                   // mid-page → free scroll, no exit
    endAccum = 0; topAccum = 0
  }
}

// Top: reverse back into the ring — the existing deselect spin via the route watcher.
function doExitReverse() {
  if (reverseExiting) return
  reverseExiting = true
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

  // Hold scrolling until the select-in animation settles. Scrolling mid-select used
  // to (a) bank scrollOffsetPx that snapped the hero the moment isSelecting cleared
  // (teleport), and (b) let an accidental up-wheel trigger the top exit during entry.
  lenis.stop()
  const waitSettled = () => {
    const st = webglSceneRef?.value?.scene?.getState?.()
    // Strict: THIS chapter selected and fully settled. (`selectedIndex !== -1` alone
    // passes during a mid-flight deselect of the same chapter — back-then-forward —
    // which would open scrolling/exits during the resync re-select.)
    if (st && st.introComplete && st.selectedIndex === chapter.value?.index &&
        !st.isSelecting && !st.isDeselecting) {
      ready = true
      lenis?.start()
    } else {
      readyPoll = setTimeout(waitSettled, 200)
    }
  }
  waitSettled()

  pageEl.value?.addEventListener('wheel', onWheel, { passive: true })
})

onBeforeUnmount(() => {
  pageEl.value?.removeEventListener('wheel', onWheel)
  if (readyPoll) clearTimeout(readyPoll)
  // If we unmount mid-exit (nav/back click during a coupled OR committing bottom exit),
  // kill the tween and SNAP the return to its end pose before releasing — otherwise the
  // homepage is left with a half-exited scene (frozen group tilt / hero scale).
  exitTl?.kill()
  exitTl = null
  if (bottomExiting || forwardActive) {
    const scene = webglSceneRef?.value?.scene
    scene?.setExitProgress?.(1)
    scene?.endExit?.()
    bottomExiting = false
    forwardActive = false
  }
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
