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
import { toCanvas } from 'html-to-image'
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
let deCurrent = 0               // lerped actual de fed to the scene + the page-card flight
let coupleRaf = null
let capturing = false           // a page snapshot is being taken (guards re-entrant engage)
let pageSnapshot = null         // pre-warmed snapshot canvas of the visible page (engage uses it)

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

// ── Page snapshot (the bottom exit renders the PAGE onto a real 3D card) ──────────────────────────
// Embed the LOCAL @font-face fonts (Bague/Movie) as data URLs so the snapshot renders the real fonts
// without html-to-image stalling on the cross-origin Google-Fonts stylesheet. Computed once.
let fontEmbedCSS = null
async function getFontEmbedCSS() {
  if (fontEmbedCSS !== null) return fontEmbedCSS
  fontEmbedCSS = ''
  try {
    const base = (import.meta.env.BASE_URL || '/').replace(/\/$/, '')
    const faces = await Promise.all([['Bague', `${base}/fonts/Bague.woff`], ['Movie', `${base}/fonts/Movie.woff`]].map(
      async ([fam, url]) => {
        const buf = new Uint8Array(await (await fetch(url)).arrayBuffer())
        let bin = ''
        for (let i = 0; i < buf.length; i++) bin += String.fromCharCode(buf[i])
        return `@font-face{font-family:'${fam}';src:url(data:font/woff;base64,${btoa(bin)}) format('woff');font-display:block;}`
      }
    ))
    fontEmbedCSS = faces.join('\n')
  } catch (e) { /* leave empty — the snapshot falls back to system fonts */ }
  return fontEmbedCSS
}
// Debug: count non-transparent pixels in a captured canvas (and surface a taint/SecurityError).
function sampleCanvas(c) {
  if (!c) return null
  try {
    const ctx = c.getContext('2d')
    let opaque = 0, total = 0
    const step = 50
    for (let y = 0; y < c.height; y += step) for (let x = 0; x < c.width; x += step) {
      total++
      if (ctx.getImageData(x, y, 1, 1).data[3] > 8) opaque++
    }
    return { total, opaque }
  } catch (e) { return { err: String(e) } }   // SecurityError ⇒ tainted canvas (cross-origin content)
}
async function capturePage() {
  // Capture the LIVE wrapper: its visible sections are already revealed (opacity 1) by the page's
  // IntersectionObserver — an off-screen clone never fires the observer, so it captures transparent.
  // skipFonts avoids html-to-image stalling/erroring on the cross-origin Google-Fonts stylesheet (which
  // silently blanks the capture); the LOCAL article fonts go in via fontEmbedCSS instead.
  const el = pageEl.value
  if (!el) return null
  const dbg = /[?&]debug/.test(location.search)
  try {
    const css = await getFontEmbedCSS()
    const canvas = await toCanvas(el, {
      skipFonts: true,
      fontEmbedCSS: css,
      backgroundColor: '#f3ebe4',           // the chapter's accentLight (the article's bg)
      pixelRatio: Math.min(window.devicePixelRatio || 1, 2),
      filter: (n) => n.tagName !== 'VIDEO', // no videos in the article, but be safe
    })
    if (dbg) window.__capInfo = {
      fontCSSLen: css ? css.length : 0, scrollY: lenis ? lenis.scroll : 0,
      pageScrollTop: el.scrollTop, scrollTransform: scrollEl.value ? getComputedStyle(scrollEl.value).transform : null,
      w: canvas && canvas.width, h: canvas && canvas.height, sample: sampleCanvas(canvas),
    }
    return canvas
  } catch (e) { if (dbg) window.__capInfo = { error: String(e) }; console.warn('[exit] page snapshot failed', e); return null }
}
// Pre-warm the snapshot while the reader sits at the bottom so engaging the exit is instant (no hitch).
async function prewarmSnapshot() {
  if (capturing || coupling || exiting || pageSnapshot) return
  capturing = true
  pageSnapshot = await capturePage()
  capturing = false
}

// ── Scroll-coupled "drop into the deck" (bottom edge) ────────────────────────────────────────────
// Engage: snapshot the visible page → a real 3D card (scene.beginPageCard) and hide the DOM. Overscroll
// then scrubs `de`: scene.setPageCardProgress flies that card into the rising/spinning ring (tilting
// like a card) + reassembles the deck, handing off to the real poster at the catch. Reversible to commit.
async function startCouple(seedPx) {
  if (coupling || exiting || capturing) return
  const scene = webglSceneRef?.value?.scene
  if (!scene?.beginPageCard) return
  capturing = true
  const canvas = pageSnapshot || await capturePage()
  capturing = false
  if (/[?&]debug/.test(location.search)) window.__capEngage = { fromPrewarm: !!pageSnapshot, w: canvas && canvas.width, h: canvas && canvas.height, sample: sampleCanvas(canvas) }
  if (!canvas || coupling || exiting || !scene.beginPageCard(canvas)) return
  coupling = true
  lenis?.stop()                                   // we own the wheel now (overscroll scrubs de)
  if (pageEl.value) pageEl.value.style.opacity = '0'   // DOM hidden — the page-card IS the page now
  deTarget = Math.min(1, (seedPx || 0) / EXIT_TRAVEL)
  deCurrent = 0
  loopCouple()
}
function loopCouple() {
  coupleRaf = requestAnimationFrame(loopCouple)
  const scene = webglSceneRef?.value?.scene
  deCurrent += (deTarget - deCurrent) * 0.16      // smooth toward the scrubbed target (coupled feel)
  scene?.setPageCardProgress(deCurrent)
  if (deTarget >= COMMIT_DE && deCurrent >= COMMIT_DE - 0.03) commitCouple()
  else if (deTarget <= 0 && deCurrent <= 0.004) cancelCouple()
}
function commitCouple() {
  if (exiting) return
  exiting = true
  if (coupleRaf) { cancelAnimationFrame(coupleRaf); coupleRaf = null }
  coupling = false
  const scene = webglSceneRef?.value?.scene
  scene?.setPageCardProgress(1)
  scene?.endPageCard()                            // dispose the page-card + finalize the ring (idx=-1)…
  router.push('/')                                // …BEFORE navigate so the watcher won't double-deselect
}
function cancelCouple() {
  if (coupleRaf) { cancelAnimationFrame(coupleRaf); coupleRaf = null }
  coupling = false
  deTarget = 0; deCurrent = 0
  webglSceneRef?.value?.scene?.cancelPageCard()   // dispose the page-card + restore the selected hero
  if (pageEl.value) pageEl.value.style.opacity = ''   // reveal the DOM page again
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
  lenis.on('scroll', (e) => {
    scene?.setScroll(e.scroll)
    // Pre-warm the exit snapshot while the reader sits at the very bottom (invalidate when away),
    // so engaging the drop-into-deck is instant — no capture hitch.
    if (lenis && lenis.limit > 0 && e.scroll >= lenis.limit - 4) prewarmSnapshot()
    else if (!coupling && !capturing) pageSnapshot = null
  })
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
