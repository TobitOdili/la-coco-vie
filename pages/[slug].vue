<template>
  <div v-if="chapter" ref="pageEl" class="chapter-page">
    <!-- Single content child = Lenis's scrolled element (wrapper is .chapter-page). -->
    <div ref="scrollEl" class="chapter-scroll">
      <!-- Hero: transparent so the WebGL card (animated to fill the screen by the
           select transition, in app.vue's persistent scene) reads as the hero. As
           you scroll, the scene couples the card to the scroll so it rises away. -->
      <section class="chapter-hero" aria-hidden="true" />

      <!-- Built inner page (data-driven) when content exists for this chapter.
           Each chapter can have a bespoke treatment (US = the margin-notes scrapbook);
           the generic ChapterSection loop is the fallback. Bespoke components must
           render `.chapter-section` roots with data-idx so the popup observer works. -->
      <div v-if="pageContent" class="chapter-content">
        <UsStory v-if="chapter.slug === 'us'" :sections="pageContent.sections" />
        <BigDay v-else-if="chapter.slug === 'the-big-day'" :sections="pageContent.sections" />
        <InFrames v-else-if="chapter.slug === 'in-frames'" :sections="pageContent.sections" />
        <WithLove v-else-if="chapter.slug === 'with-love'" :sections="pageContent.sections" />
        <template v-else>
          <ChapterSection
            v-for="(section, i) in pageContent.sections"
            :key="i"
            :data-idx="i"
            :section="section"
          />
        </template>
        <ChapterEnd :chapter="chapter" />
      </div>

      <!-- …otherwise the scaffold (safety net — all four chapters have content). -->
      <section v-else class="chapter-body">
        <h1 class="chapter-title">{{ chapter.title }}</h1>
        <p class="chapter-note">This chapter is still being written — check back soon.</p>
      </section>

      <!-- Scroll-driven exit "outro": transparent, so the WebGL ring shows through as the article scrolls
           out above it. Scrolling through it drives the ring reassembly (scene.setExitProgress, de 0→1);
           reaching the bottom navigates home. (Reference: the page scrolls fully out, the ring rises in.) -->
      <section ref="outroEl" class="chapter-outro" aria-hidden="true" />
    </div>

    <!-- ── The scroll cue. A hairline with a rising dot: the gesture that moves this page is a
         swipe UP, and the dot goes the way the content does. It retires for good on the first
         real scroll — a prompt that is still there after you have obeyed it is noise. ── -->
    <div class="scroll-cue" :class="{ gone: cueSeen }" aria-hidden="true">
      <span class="cue-rail"><i class="cue-dot" /></span>
      <span class="cue-label">scroll</span>
    </div>

    <!-- ── "you are about to go back". Both edges of a chapter lead home, and until now neither
         said so: the top takes a sustained pull (800px of wheel, 180px of finger) and the bottom
         commits at the end of the outro. These fill as you approach, so the exit is something you
         can see coming and stop. `--p` is 0 the rest of the time, which is why they need no
         `v-if` — at 0 they are invisible and inert. ── -->
    <div class="home-cue home-cue--top" :style="{ '--p': pullTop }" aria-hidden="true">
      <span class="home-rail"><i class="home-fill" /></span>
      <span class="home-label">back to the chapters</span>
    </div>
    <div class="home-cue home-cue--bottom" :style="{ '--p': pullBottom }" aria-hidden="true">
      <span class="home-rail"><i class="home-fill" /></span>
      <span class="home-label">back to the chapters</span>
    </div>

    <!-- Floating popup cards — pinned to the viewport bottom-center; content is the in-view
         section's popups (moments / map + calendar / registry), gone at the chapter end. -->
    <transition name="popups">
      <div v-if="activePopups.length" class="popup-stack">
        <PopupCard v-for="p in activePopups" :key="p.title" :popup="p" />
      </div>
    </transition>
  </div>
</template>

<script setup>
import { computed, onMounted, onBeforeUnmount, inject, ref } from 'vue'
import Lenis from 'lenis'
import { CHAPTERS } from '~/composables/useChapterScene'
import { CHAPTER_PAGES, POPUPS } from '~/composables/chapterPages'
import ChapterSection from '~/components/chapter/ChapterSection.vue'
import UsStory from '~/components/chapter/UsStory.vue'
import BigDay from '~/components/chapter/BigDay.vue'
import InFrames from '~/components/chapter/InFrames.vue'
import WithLove from '~/components/chapter/WithLove.vue'
import ChapterEnd from '~/components/chapter/ChapterEnd.vue'
import PopupCard from '~/components/chapter/PopupCard.vue'

const route = useRoute()
const router = useRouter()
const chapter = computed(() => CHAPTERS.find((c) => c.slug === route.params.slug))
const pageContent = computed(() => CHAPTER_PAGES[route.params.slug])

// Floating popup cards: the active (most in-view) section's popups, shown in one fixed
// overlay at the viewport bottom-center (so they're never affected by the content scroll).
const activeIdx = ref(-1)
const sectionRatios = new Map()
let sectionObserver = null
const activePopups = computed(() => {
  const s = pageContent.value?.sections?.[activeIdx.value]
  return (s?.popups || []).map((key) => POPUPS[key]).filter(Boolean)
})

// Reach the persistent WebGL scene (provided by app.vue) so page scroll can drive
// the hero-card coupling (P1). It's the same scene instance across all routes.
const webglSceneRef = inject('webglSceneRef', null)

// The cue retires on the first real scroll; the two pulls are 0→1 toward the homepage.
const cueSeen = ref(false)
const pullTop = ref(0)
const pullBottom = ref(0)

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
  if (now - lastWheelT > 400) { topAccum = 0; pullTop.value = 0 }   // a pause = a new gesture
  lastWheelT = now
  if (lenis.scroll <= 2 && dy < 0) {          // top edge, pushing up → reverse rewind home
    topAccum += -dy
    pullTop.value = Math.min(1, topAccum / EXIT_THRESHOLD)
    if (topAccum >= EXIT_THRESHOLD) doExit()
  } else {
    topAccum = 0
    pullTop.value = 0
  }
}

// Touch equivalent of the TOP-edge exit (mobile) — without this the only way off a chapter
// on a phone was the nav logo. A finger-pull needs a much smaller threshold than a wheel's
// 800px to feel deliberate. (The BOTTOM exit needs nothing extra: it's driven by Lenis
// scroll position, which native touch scrolling already produces.)
const EXIT_THRESHOLD_TOUCH = 180
let touchLastY = 0
function onTouchStart(e) {
  const t = e.touches[0]
  if (!t) return
  touchLastY = t.clientY
  topAccum = 0                                // each touch is a fresh gesture
}
function onTouchMove(e) {
  if (!ready || !lenis || exiting) return
  const t = e.touches[0]
  if (!t) return
  const dy = touchLastY - t.clientY           // negative ⇒ dragging the page DOWN (scrolling up)
  touchLastY = t.clientY
  if (lenis.scroll <= 2 && dy < 0) {
    topAccum += -dy
    pullTop.value = Math.min(1, topAccum / EXIT_THRESHOLD_TOUCH)
    if (topAccum >= EXIT_THRESHOLD_TOUCH) doExit()
  } else {
    topAccum = 0
    pullTop.value = 0
  }
}

// ⚠️ The pull has to RELEASE. Without this the rail stayed lit at whatever the finger reached and
// sat there for the rest of the visit — `onTouchMove`'s own reset only runs while a finger is still
// moving, and a pull that stops short simply stops producing events.
function onTouchEnd() {
  topAccum = 0
  pullTop.value = 0
}

// TOP edge / back button → navigate home; app.vue's route watcher runs deselectChapter() (reverse).
function doExit() {
  if (exiting) return
  exiting = true
  lenis?.stop()
  router.push('/')
}

// ── nav legibility ──────────────────────────────────────────────────────────
// ⚠️ The nav is inked in the chapter's `accent`, and TWO backgrounds on every
// chapter page are that same accent: In Frames' room, and the exit background the
// scene paints behind the ring as you scroll off the bottom. Where they meet, the
// nav disappears — measured contrast ratios of 1.08 on With Love and The Big Day,
// 1.33 on In Frames, 1.46 on US. This flag flips it to `accentLight` over those,
// and `SiteNav` reads it. Shared state rather than props because the page owns the
// scroll and the nav is mounted a level above it.
const navOnDark = useState('navOnDark', () => false)

// ⚠️ MEASURED, not guessed. The first attempt keyed this off "In Frames is a dark
// chapter" and "the exit has begun", and both were wrong: In Frames' page ground is
// its LIGHT tone and only the room section is dark, and the exit spends its first
// half scrolling the article out over a light background. The nav flipped to light
// while the ground was still light — contrast 1.02–1.07, no better than before.
// So: read what is ACTUALLY behind the nav. Walk the elements under the nav's
// centre point, skip the nav itself, and take the first one with an opaque
// background. The WebGL canvas has no CSS background, so the exit — which paints
// the chapter accent through the renderer's clear colour — is OR'd in separately.
const NAV_PROBE_Y = 10
function syncNavInk() { navOnDark.value = groundIsDark() }
function groundIsDark() {
  if (!import.meta.client) return false
  const els = document.elementsFromPoint(Math.round(window.innerWidth / 2), NAV_PROBE_Y)
  for (const el of els) {
    if (el.closest('.\\!fixed')) continue          // the nav's own fixed bars
    if (el === document.body || el === document.documentElement) break
    const m = getComputedStyle(el).backgroundColor.match(/[\d.]+/g)
    if (!m) continue
    if (m.length > 3 && Number(m[3]) < 0.5) continue  // see-through, keep walking
    const lum = (c) => { const v = c / 255; return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4 }
    return 0.2126 * lum(+m[0]) + 0.7152 * lum(+m[1]) + 0.0722 * lum(+m[2]) < 0.35
  }
  // Nothing opaque in the DOM means we are looking straight at the canvas.
  return !!webglSceneRef?.value?.scene?.clearIsDark?.()
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
  // The exit background is the chapter accent, so the nav must go light over it.
  if (de <= 0) {
    if (exitEngaged) { scene.cancelExit?.(); exitEngaged = false }  // scrolled back up into the article
    pullBottom.value = 0
    return
  }
  if (!exitEngaged) {
    if (!scene.beginExit?.()) return   // capture the selected/scrolled state + start the reassembly
    exitEngaged = true
  }
  scene.setExitProgress(de)
  // ⚠️ Only over the LAST stretch. `de` starts climbing the moment the article begins scrolling
  // out, and a "you are leaving" line that appears a whole screen early is just a label.
  pullBottom.value = Math.max(0, Math.min(1, (de - 0.62) / 0.34))
  if (de >= 0.999) commitExit()
}

// ⚠️ Is the article's own background over the canvas? `.chapter-hero` (100dvh) and
// `.chapter-outro` are both TRANSPARENT — the scene shows through them — but everything between
// is `.chapter-content`, which is opaque and fills the fixed page. Through that whole stretch,
// which on these pages is several screens, the canvas is drawing for nobody. Telling the scene
// lets it skip the draw and keep every other update, so nothing is out of place when the outro
// uncovers it.
function syncCanvasCover(scrollY) {
  const outro = outroEl.value
  const scene = webglSceneRef?.value?.scene
  if (!scene?.setCanvasHidden) return
  const vh = window.innerHeight
  scene.setCanvasHidden(!!outro && scrollY >= vh + 2 && scrollY < outro.offsetTop - vh)
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
  lenis.on('scroll', (e) => {
    scene?.setScroll(e.scroll); syncNavInk(); updateExit(e.scroll); syncCanvasCover(e.scroll)
    if (!cueSeen.value && e.scroll > 40) cueSeen.value = true
    // Left the top edge — whatever the pull had reached is no longer true.
    if (e.scroll > 2 && pullTop.value) pullTop.value = 0
  })
  // ⚠️ Also on arrival: a chapter selected at scroll 0 already has the accent
  // painted behind the transparent hero, so the nav can be invisible before the
  // visitor has scrolled at all. And `updateExit` early-returns in several states,
  // which is why this cannot live inside it.
  syncNavInk()
  setTimeout(syncNavInk, 400)
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
  pageEl.value?.addEventListener('touchstart', onTouchStart, { passive: true })
  pageEl.value?.addEventListener('touchmove', onTouchMove, { passive: true })
  pageEl.value?.addEventListener('touchend', onTouchEnd, { passive: true })
  pageEl.value?.addEventListener('touchcancel', onTouchEnd, { passive: true })

  // Track the active section for the floating popup cards (the most in-view section wins).
  if (pageContent.value && pageEl.value) {
    sectionObserver = new IntersectionObserver(
      (entries) => {
        // Ratio is measured against the VIEWPORT, not the section: a section taller than
        // viewport/0.45 could never reach the old element-relative threshold, so its popups
        // silently never showed (The Big Day's 250vh knot scene is exactly that case).
        for (const e of entries) {
          const vh = e.rootBounds?.height || window.innerHeight
          sectionRatios.set(+e.target.dataset.idx, e.intersectionRect.height / vh)
        }
        let best = -1, bestR = 0.45
        sectionRatios.forEach((r, idx) => { if (r >= bestR) { bestR = r; best = idx } })
        activeIdx.value = best
      },
      { root: pageEl.value, threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1] }
    )
    pageEl.value.querySelectorAll('.chapter-section').forEach((el) => sectionObserver.observe(el))
  }
})

onBeforeUnmount(() => {
  navOnDark.value = false   // the homepage has no dark ground
  pageEl.value?.removeEventListener('wheel', onWheel)
  pageEl.value?.removeEventListener('touchstart', onTouchStart)
  pageEl.value?.removeEventListener('touchmove', onTouchMove)
  pageEl.value?.removeEventListener('touchend', onTouchEnd)
  pageEl.value?.removeEventListener('touchcancel', onTouchEnd)
  sectionObserver?.disconnect()
  if (readyPoll) clearTimeout(readyPoll)
  // Leaving mid-exit (e.g. the back button while in the outro) → finalize to a clean homepage ring.
  if (exitEngaged && !exiting) webglSceneRef?.value?.scene?.endExit?.()
  lenis?.destroy()
  lenis = null
  webglSceneRef?.value?.scene?.setScroll(0)
  // ⚠️ ALWAYS. A `true` left behind here would follow the visitor to the homepage, which has no
  // page to clear it, and blank the canvas.
  webglSceneRef?.value?.scene?.setCanvasHidden?.(false)
})
</script>

<style scoped>
/* Full-screen scroll container above the canvas/hit-layer (z-5) but below the
   nav (z-20) and About panel (z-50). */
.chapter-page {
  position: fixed;
  inset: 0;
  z-index: 10;
  /* `inset: 0` already sizes this to the fixed-position viewport. An explicit 100dvh on top of
     it fights iOS Safari, whose dynamic viewport changes as the URL bar shows/hides — which
     left the page offset from the canvas on entry. Percentage of the inset box is stable. */
  height: 100%;
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
   article scrolls out above it. 1vh of that is the article leaving; the REST is the drop.
   ⚠️ 250vh gave the drop 150vh of scroll, which was fine while the ring also had to unfurl and rise
   through it. It does not any more — the ring is finished before it is uncovered — so 150vh of scroll
   for one falling card was a long wait with nothing else happening. 200vh ⇒ 100vh of drop. */
.chapter-outro {
  height: 200vh;
}

/* Content scrolls up over the (fixed) WebGL hero on the chapter's light accent. */
.chapter-content {
  background: var(--accentLight, #F2EEE8);
}

/* ── the scroll cue ──────────────────────────────────────────────────────────
   Hairline + a rising dot, in the chapter's own ink. The gesture that moves this page is a
   swipe UP, and the dot travels the way the content does. ⚠️ Below `.popup-stack` (15) and
   clear of it: both live at the bottom centre. */
.scroll-cue {
  position: fixed;
  left: 50%;
  bottom: 1.3rem;
  transform: translateX(-50%);
  z-index: 14;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.55rem;
  color: var(--accent, #333);
  pointer-events: none;
  opacity: 0.7;
  transition: opacity 0.7s ease, transform 0.7s cubic-bezier(0.2, 0.72, 0.24, 1);
}
.scroll-cue.gone { opacity: 0; transform: translateX(-50%) translateY(0.7rem); }
.cue-rail { position: relative; width: 1px; height: 2.6rem; background: currentColor; opacity: 0.22; }
.cue-dot {
  position: absolute;
  left: 50%;
  width: 4px;
  height: 4px;
  margin-left: -2px;
  border-radius: 50%;
  background: currentColor;
  animation: cue-rise 2.2s cubic-bezier(0.45, 0, 0.25, 1) infinite;
}
@keyframes cue-rise {
  0%   { top: 100%; opacity: 0; }
  16%  { opacity: 1; }
  78%  { opacity: 1; }
  100% { top: -3px; opacity: 0; }
}
.cue-label {
  font-family: 'Bague', sans-serif;
  font-size: 0.58rem;
  letter-spacing: 0.3em;
  text-transform: uppercase;
  opacity: 0.7;
}
/* ⚠️ BOTH CUES SIT OVER THE HERO, which is a photograph or a film — the chapter's ink on the
   chapter's paper is the right colour for the page and unreadable on top of a picture. A halo in
   the page's own light accent holds the type against anything without introducing a box, which
   this chapter's whole language is against. */
.cue-label, .home-label {
  text-shadow:
    0 0 7px var(--accentLight, #F6F3EC),
    0 0 3px var(--accentLight, #F6F3EC),
    0 0 1px var(--accentLight, #F6F3EC);
}
.cue-rail, .home-rail { box-shadow: 0 0 6px var(--accentLight, #F6F3EC); }

/* ── "you are about to go back" ───────────────────────────────────────────────
   One rail per edge, filling as the exit is approached. ⚠️ `--p` is 0 almost always, and at 0
   these are transparent and `pointer-events: none` — which is why they need no `v-if`. */
.home-cue {
  position: fixed;
  left: 50%;
  transform: translateX(-50%);
  z-index: 14;
  display: flex;
  align-items: center;
  gap: 0.55rem;
  color: var(--accent, #333);
  pointer-events: none;
  opacity: calc(var(--p, 0) * 1.2);
}
.home-cue--top { top: 6.4rem; flex-direction: column; }
.home-cue--bottom { bottom: 1.3rem; flex-direction: column-reverse; }
.home-rail { position: relative; width: 6rem; height: 1px; background: currentColor; opacity: 0.2; }
.home-fill {
  position: absolute;
  inset: 0;
  background: currentColor;
  transform: scaleX(var(--p, 0));
  transform-origin: left center;
}
.home-label {
  font-family: 'Bague', sans-serif;
  font-size: 0.58rem;
  letter-spacing: 0.26em;
  text-transform: uppercase;
  opacity: 0.8;
  white-space: nowrap;
}

@media (prefers-reduced-motion: reduce) {
  .cue-dot { animation: none; top: 40%; }
}

/* Floating popup cards — pinned to the VIEWPORT bottom-centre over the content.
   MUST be `fixed`, not `absolute`: .chapter-page is a scroll container (overflow-y: auto), and
   absolutely-positioned children of a scroller scroll WITH the content — so these sat at the
   bottom only at scroll 0 and then slid up and off the top as you read. `fixed` resolves
   against the viewport (no transformed ancestor here — Lenis scrolls .chapter-page natively via
   scrollTop, and these live OUTSIDE .chapter-scroll), so they stay put. */
.popup-stack {
  position: fixed;
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
  background: var(--accentLight, #F2EEE8);
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
