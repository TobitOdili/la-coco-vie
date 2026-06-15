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
          :data-idx="i"
          :section="section"
        />
        <ChapterEnd :chapter="chapter" />
      </div>

      <!-- …otherwise the scaffold (chapters not yet built: la-storia, eat, amour). -->
      <section v-else class="chapter-body">
        <h1 class="chapter-title">{{ chapter.title }}</h1>
        <p class="chapter-note">
          Inner-page scaffold. Content for this chapter is not built yet — see
          <code>docs/PHASE-2-INNER-PAGES.md</code>.
        </p>
      </section>

      <!-- Scroll-driven exit "outro": transparent, so the WebGL ring shows through as the article scrolls
           out above it. Scrolling through it drives the ring reassembly (scene.setExitProgress, de 0→1);
           reaching the bottom navigates home. (Reference: the page scrolls fully out, the ring rises in.) -->
      <section ref="outroEl" class="chapter-outro" aria-hidden="true" />
    </div>

    <!-- Floating dress popups — pinned to the viewport bottom-center; content is the in-view
         section's dresses (the reference's scroll-following dress cards), gone at the chapter end. -->
    <transition name="popups">
      <div v-if="activeDresses.length" class="dress-popups">
        <DressTail v-for="d in activeDresses" :key="d.title" :dress="d" />
      </div>
    </transition>
  </div>
</template>

<script setup>
import { computed, onMounted, onBeforeUnmount, inject, ref } from 'vue'
import Lenis from 'lenis'
import { CHAPTERS } from '~/composables/useChapterScene'
import { CHAPTER_PAGES, DRESSES } from '~/composables/chapterPages'
import ChapterSection from '~/components/chapter/ChapterSection.vue'
import ChapterEnd from '~/components/chapter/ChapterEnd.vue'
import DressTail from '~/components/chapter/DressTail.vue'

const route = useRoute()
const router = useRouter()
const chapter = computed(() => CHAPTERS.find((c) => c.slug === route.params.slug))
const pageContent = computed(() => CHAPTER_PAGES[route.params.slug])

// Floating dress popups: the active (most in-view) section's dresses, shown in one fixed
// overlay at the viewport bottom-center (so they're never affected by the content scroll).
const activeIdx = ref(-1)
const sectionRatios = new Map()
let sectionObserver = null
const activeDresses = computed(() => {
  const s = pageContent.value?.sections?.[activeIdx.value]
  return (s?.dresses || []).map((slug) => DRESSES[slug]).filter(Boolean)
})

// Reach the persistent WebGL scene (provided by app.vue) so page scroll can drive
// the hero-card coupling (P1). It's the same scene instance across all routes.
const webglSceneRef = inject('webglSceneRef', null)

const pageEl = ref(null)
const scrollEl = ref(null)
const outroEl = ref(null)
let lenis = null

// Exit gestures (current). TOP edge: overscroll UP past EXIT_THRESHOLD → navigate home, and app.vue's
// route watcher runs scene.deselectChapter() (hero shrinks, ring reverse-spins back). Seamless because
// at scroll 0 you're already looking at the WebGL hero through the transparent .chapter-hero.
// BOTTOM exit is being REBUILT scroll-driven (per the reference: the page scrolls fully out and a ring
// "outro" section scrolls in) — see docs/PHASE-2-INNER-PAGES.md. Until then the bottom edge is inert
// (use the top edge, the back button, or the nav logo to leave).
const EXIT_THRESHOLD = 800   // px of overscroll past the TOP edge to trigger the (reverse) exit
let topAccum = 0             // top overscroll accumulator
let lastWheelT = 0           // last wheel-event time — a gap means a new gesture
let exiting = false          // an exit committed (navigating home) — lock out further input
let ready = false            // select-in settled — scroll + exit gestures enabled
let readyPoll = null
let settleTries = 0          // waitSettled attempts — bounded so a failed scene can't freeze the page
const SETTLE_DEADLINE = 40   // ~8s at 200ms/try before we enable scroll without the select-in handoff

// Scroll-driven BOTTOM exit (the reference's "outro" section). As you scroll the article into the
// transparent .chapter-outro, scroll position maps to `de` → scene.setExitProgress. The article FULLY
// scrolls out over [outroTop-vh, outroTop] (de 0→DROP_START) while the ring spins on the accent bg with
// the wine slot empty; then over [outroTop, limit] (de DROP_START→1) the wine card drops from the top.
// Reversible (scroll back up → cancelExit restores the article); de→1 (page bottom) commits + navigates.
const DROP_START = 0.45      // de at which the page is fully out → the drop begins (MATCH useChapterScene.js)
let exitEngaged = false      // beginExit() has fired (the ring is reassembling under the scroll)

function onWheel(e) {
  if (!ready || !lenis || exiting) return
  // Normalize deltas: Firefox fires deltaMode=1 (lines, ~3 per notch) — comparing raw line counts
  // against a pixel threshold made exits near-unreachable there. ~40px/line ≈ Chrome's ~120px notch.
  const dy = e.deltaY * (e.deltaMode === 1 ? 40 : e.deltaMode === 2 ? window.innerHeight : 1)
  const now = performance.now()
  if (now - lastWheelT > 400) topAccum = 0   // a pause = a new gesture
  lastWheelT = now
  if (lenis.scroll <= 2 && dy < 0) {          // top edge, pushing up → reverse rewind home
    topAccum += -dy
    if (topAccum >= EXIT_THRESHOLD) doExit()
  } else {
    topAccum = 0
  }
}

// TOP edge / back button → navigate home; app.vue's route watcher runs deselectChapter() (reverse).
function doExit() {
  if (exiting) return
  exiting = true
  lenis?.stop()
  router.push('/')
}

// BOTTOM exit — driven by scroll position within the .chapter-outro section.
function updateExit(scrollY) {
  if (!ready || exiting || !lenis) return
  const outro = outroEl.value
  const scene = webglSceneRef?.value?.scene
  if (!outro || !scene?.setExitProgress) return
  const vh = window.innerHeight
  const outroTop = outro.offsetTop      // the article is fully scrolled out at this scroll position
  const end = lenis.limit               // page bottom
  let de
  if (scrollY < outroTop) {
    de = Math.max(0, (scrollY - (outroTop - vh)) / vh) * DROP_START          // article scrolling out
  } else {
    const span = Math.max(1, end - outroTop)
    de = DROP_START + Math.min(1, (scrollY - outroTop) / span) * (1 - DROP_START)  // the drop
  }
  if (de <= 0) {
    if (exitEngaged) { scene.cancelExit?.(); exitEngaged = false }  // scrolled back up into the article
    return
  }
  if (!exitEngaged) {
    if (!scene.beginExit?.()) return   // capture the selected/scrolled state + start the reassembly
    exitEngaged = true
  }
  scene.setExitProgress(de)
  if (de >= 0.999) commitExit()
}
function commitExit() {
  if (exiting) return
  exiting = true
  const scene = webglSceneRef?.value?.scene
  scene?.setExitProgress(1)
  scene?.endExit?.()        // finalize the homepage ring (selectedIndex=-1) BEFORE navigate so the…
  router.push('/')          // …route watcher won't also fire deselectChapter
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
  lenis.on('scroll', (e) => { scene?.setScroll(e.scroll); updateExit(e.scroll) })
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

  // Track the active section for the floating dress popups (the most in-view section wins).
  if (pageContent.value && pageEl.value) {
    sectionObserver = new IntersectionObserver(
      (entries) => {
        for (const e of entries) sectionRatios.set(+e.target.dataset.idx, e.intersectionRatio)
        let best = -1, bestR = 0.45
        sectionRatios.forEach((r, idx) => { if (r >= bestR) { bestR = r; best = idx } })
        activeIdx.value = best
      },
      { root: pageEl.value, threshold: [0, 0.25, 0.45, 0.7, 1] }
    )
    pageEl.value.querySelectorAll('.chapter-section').forEach((el) => sectionObserver.observe(el))
  }
})

onBeforeUnmount(() => {
  pageEl.value?.removeEventListener('wheel', onWheel)
  sectionObserver?.disconnect()
  if (readyPoll) clearTimeout(readyPoll)
  // Leaving mid-exit (e.g. the back button while in the outro) → finalize to a clean homepage ring.
  if (exitEngaged && !exiting) webglSceneRef?.value?.scene?.endExit?.()
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

/* Scroll-driven exit "outro" — transparent, so the WebGL ring (on the accent bg) shows through as the
   article scrolls out above it. ~1 vh of the article scrolls out, then the rest is the drop scroll. */
.chapter-outro {
  height: 250vh;
}

/* Content scrolls up over the (fixed) WebGL hero on the chapter's light accent. */
.chapter-content {
  background: var(--accentLight, #f3ebe4);
}

/* Floating dress popups — fixed to the viewport bottom-center over the content. */
.dress-popups {
  position: absolute;
  bottom: 1.75rem;
  left: 50%;
  transform: translateX(-50%);
  z-index: 15;
  display: flex;
  gap: 0.75rem;
}
.popups-enter-active,
.popups-leave-active { transition: opacity 0.5s ease, transform 0.5s ease; }
.popups-enter-from,
.popups-leave-to { opacity: 0; transform: translate(-50%, 1.5rem); }

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
