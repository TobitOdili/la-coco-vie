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
//   • Bottom edge, keep scrolling DOWN → SCROLL-COUPLED "drop into the deck" (reversible). Continued
//     overscroll scrubs `de` 0→1: the 3D deck rises from below + spins forward COUPLED to the scroll
//     (scene.setExitProgress) while the chapter's own cards stay hidden; the DOM page visibly SHRINKS
//     toward the rising deck and, at the catch, hands off (fades out) to its real card fading in —
//     "the page becomes a card that drops into sync with the rest of the cards," which then rise to
//     centre + spin into the homepage ring. Scroll back up to cancel; commit + navigate at de≈1.
const EXIT_THRESHOLD = 800   // px of overscroll past the TOP edge to trigger the (reverse) exit
let endAccum = 0             // bottom overscroll accumulator (until the coupled exit engages)
let topAccum = 0             // top overscroll accumulator
let lastWheelT = 0           // last wheel-event time — a gap means a new gesture
let exiting = false          // an exit committed (navigating home) — lock out further input
let ready = false            // select-in settled — scroll + exit gestures enabled
let readyPoll = null
let settleTries = 0          // waitSettled attempts — bounded so a failed scene can't freeze the page
const SETTLE_DEADLINE = 40   // ~8s at 200ms/try before we enable scroll without the select-in handoff

// Scroll-coupled "drop into the deck" bottom exit (de 0→1, reversible). Engages after a small
// overscroll, then continued overscroll scrubs de; scroll back up past 0 cancels.
const ENGAGE_OVERSCROLL = 160   // px of bottom overscroll before the coupled exit engages
const EXIT_TRAVEL = 1100        // px of further overscroll mapped to a full de 0→1
const COMMIT_DE = 0.9           // de past which the exit commits (navigate home)
let coupling = false            // a coupled bottom exit is engaged (scrubbing de)
let deTarget = 0                // overscroll-accumulated target (0..1)
let deCurrent = 0               // lerped actual de fed to the scene + the page shrink
let coupleRaf = null
const smooth = (a, b, x) => { const k = Math.min(1, Math.max(0, (x - a) / (b - a))); return k * k * (3 - 2 * k) }

function onWheel(e) {
  if (!ready || !lenis || exiting) return
  // Normalize deltas: Firefox fires deltaMode=1 (lines, ~3 per notch) — comparing raw line
  // counts against a pixel threshold made exits near-unreachable there. ~40px/line ≈
  // Chrome's ~120px notch.
  const dy = e.deltaY * (e.deltaMode === 1 ? 40 : e.deltaMode === 2 ? window.innerHeight : 1)
  // Once the coupled drop-into-deck is engaged we own the wheel: scrub de (down advances, up reverses)
  // and prevent native scroll so it can't fight the shrink.
  if (coupling) {
    e.preventDefault?.()
    deTarget = Math.max(0, Math.min(1, deTarget + dy / EXIT_TRAVEL))
    return
  }
  const now = performance.now()
  if (now - lastWheelT > 400) { endAccum = 0; topAccum = 0 }   // a pause = a new gesture
  lastWheelT = now
  const atBottom = lenis.limit > 0 && lenis.scroll >= lenis.limit - 2
  const atTop = lenis.scroll <= 2
  if (atBottom && dy > 0) {            // bottom edge, pushing down → engage the coupled drop-into-deck
    endAccum += dy; topAccum = 0
    if (endAccum >= ENGAGE_OVERSCROLL) startCouple(endAccum - ENGAGE_OVERSCROLL)
  } else if (atTop && dy < 0) {        // top edge, pushing up → reverse rewind
    topAccum += -dy; endAccum = 0
    if (topAccum >= EXIT_THRESHOLD) doExit()
  } else {                             // mid-page → free scroll, no exit
    endAccum = 0; topAccum = 0
  }
}

// TOP edge / back button → plain REVERSE: navigate home; app.vue's route watcher runs deselectChapter().
function doExit() {
  if (exiting) return
  exiting = true
  lenis?.stop()
  router.push('/')
}

// ── Scroll-coupled "drop into the deck" (bottom edge) ────────────────────────────────────────────
// Engage once (beginExit captures the selected/scrolled pose), then overscroll scrubs `de`. The scene
// rises + spins the deck and keeps the chapter's cards hidden (setExitProgress); the DOM page shrinks
// toward the rising deck and hands off at the catch. Reversible until it commits at de≈1.
function startCouple(seedPx) {
  const scene = webglSceneRef?.value?.scene
  if (coupling || exiting || !scene?.beginExit || !scene.beginExit()) return
  coupling = true
  lenis?.stop()                                   // we own the wheel now (overscroll scrubs de)
  deTarget = Math.min(1, (seedPx || 0) / EXIT_TRAVEL)
  deCurrent = 0
  loopCouple()
}
function loopCouple() {
  coupleRaf = requestAnimationFrame(loopCouple)
  const scene = webglSceneRef?.value?.scene
  deCurrent += (deTarget - deCurrent) * 0.16      // smooth toward the scrubbed target (coupled feel)
  scene?.setExitProgress(deCurrent)
  applyPageShrink(deCurrent)
  if (deTarget >= COMMIT_DE && deCurrent >= COMMIT_DE - 0.03) commitCouple()
  else if (deTarget <= 0 && deCurrent <= 0.004) cancelCouple()
}
// The DOM page shrinks toward the low-rising deck + fades into it at the catch (its fade window matches
// the scene's HERO_REVEAL_* so the page hands off exactly as the real card fades in).
function applyPageShrink(de) {
  const el = pageEl.value
  if (!el) return
  const k = smooth(0, 0.62, de)                   // shrink/drift progress
  const s = 1 - 0.84 * k                          // scale 1 → 0.16 (card-ish)
  const ty = 14 * k                               // drift DOWN toward the rising deck (vh)
  el.style.transformOrigin = '50% 58%'
  el.style.transform = `translateY(${ty}vh) scale(${s})`
  el.style.opacity = String(1 - smooth(0.5, 0.8, de))   // fade into the deck at the catch
}
function commitCouple() {
  if (exiting) return
  exiting = true
  if (coupleRaf) { cancelAnimationFrame(coupleRaf); coupleRaf = null }
  coupling = false
  const scene = webglSceneRef?.value?.scene
  scene?.setExitProgress(1)
  scene?.endExit()                                // finalize the homepage ring (selectedIndex=-1)…
  router.push('/')                                // …BEFORE navigate so the watcher won't double-deselect
}
function cancelCouple() {
  if (coupleRaf) { cancelAnimationFrame(coupleRaf); coupleRaf = null }
  coupling = false
  deTarget = 0; deCurrent = 0
  webglSceneRef?.value?.scene?.cancelExit()       // restore the selected/scrolled hero (no teleport)
  const el = pageEl.value
  if (el) { el.style.transform = ''; el.style.opacity = ''; el.style.transformOrigin = '' }
  lenis?.start()                                  // resume reading the page
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

  // Non-passive so the coupled drop-into-deck can preventDefault() native scroll while scrubbing de.
  pageEl.value?.addEventListener('wheel', onWheel, { passive: false })
})

onBeforeUnmount(() => {
  pageEl.value?.removeEventListener('wheel', onWheel)
  if (readyPoll) clearTimeout(readyPoll)
  if (coupleRaf) cancelAnimationFrame(coupleRaf)
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
