<template>
  <div class="app-root" :class="chapterClass" ref="appRoot">
    <!-- Loading screen -->
    <LoadingScreen v-if="!loaded" :progress="loadProgress" @complete="onLoaded" />

    <!-- Custom cursor / explore circle — tinted to whichever card it sits over. On touch it
         parks on-screen as the tappable EXPLORE button (the reference's mobile affordance). -->
    <CustomCursor
      ref="cursorRef"
      :accent="cursorAccent"
      :explore-ready="exploreReady && isHome"
      @explore="onExploreTap"
    />

    <!-- WebGL Scene — persistent across routes (never unmounts, so no intro replay) -->
    <WebGLScene
      ref="webglSceneRef"
      @chapter-select="onChapterSelect"
      @chapter-hover="onChapterHover"
      @chapter-unhover="onChapterUnhover"
      @progress="onProgress"
      @chapter-front="onChapterFront"
    />

    <!-- ⚠️ THE ONLY <h1> IN THE SITE, and it is spoken, not seen. Every visible title here is
         either drawn in WebGL (the hero, the deck) or set as art in a PNG, so a screen reader
         and a crawler had nothing to read: /us started at h2, /with-love at h3, and the
         homepage and The Big Day had no headings at all (AUDIT #112). It changes with the
         route, so there is exactly one per view and it always names the page you are on. -->
    <h1 class="sr-only">{{ pageHeading }}</h1>

    <!-- Routed page content. Empty on '/' (the scene IS the homepage); the chapter
         inner page renders here on '/{slug}'. -->
    <NuxtPage />

    <!-- Navigation (always visible) -->
    <SiteNav
      :is-home="isHome"
      :accent-color="currentAccent"
      :sound-on="soundOn"
      @toggle-about="toggleAbout"
      @go-home="goHome"
      @toggle-sound="toggleSound"
    />

    <!-- About panel -->
    <AboutPanel :is-open="aboutOpen" @close="toggleAbout" />
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, watch, provide, nextTick } from 'vue'
import { CHAPTERS } from '~/composables/useChapterScene'
import { SITE } from '~/site.config'
import { asset } from '~/utils/asset'

// ── Routing is the single source of truth for which chapter is open ──────────
// '/'        → homepage (carousel)
// '/{slug}'  → that chapter selected + its inner page. The scene runs the
//              select/deselect animations; the route watcher below drives them.
const route = useRoute()
const router = useRouter()
const slugToIdx = (slug) => (slug ? CHAPTERS.findIndex((c) => c.slug === slug) : -1)

const appRoot = ref(null)
const cursorRef = ref(null)
const webglSceneRef = ref(null)
// Let the routed inner page reach the persistent scene (e.g. to feed inner-page
// scroll into the hero-card coupling — P1). The ref resolves once WebGLScene mounts.
provide('webglSceneRef', webglSceneRef)
const aboutOpen = ref(false)
const soundOn = ref(false)
const loaded = ref(false)
const loadProgress = ref(0)

// Derived from the route — no manual selection state to keep in sync.
const selectedChapterIdx = computed(() => {
  const i = slugToIdx(route.params.slug)
  return i === -1 ? null : i
})
const isHome = computed(() => !route.params.slug)
const currentChapter = computed(() =>
  selectedChapterIdx.value !== null ? CHAPTERS[selectedChapterIdx.value] : null
)
const currentAccent = computed(() => currentChapter.value?.accent || '#42221A')

// The FRONT-facing card on the carousel (scene-reported). On the homepage no chapter is
// route-selected, so this is what the explore circle tints itself to — matching the reference,
// where the circle reflects the card beneath it.
const frontChapterIdx = ref(-1)
// Gates the parked EXPLORE button. The scene reports the front chapter the moment the intro
// completes (i.e. once the cards have settled), so waiting on it means the button can't appear
// mid-spin — and can't flash the placeholder accent before the real chapter is known.
// It's ALSO gated on isHome: the button takes pointer-events, so leaving it up on a chapter
// page put a 140px dead zone mid-screen that swallowed scroll gestures.
const exploreReady = ref(false)
function onChapterFront(idx) {
  frontChapterIdx.value = idx
  exploreReady.value = true
}
const cursorAccent = computed(
  () => currentChapter.value?.accent || CHAPTERS[frontChapterIdx.value]?.accent || '#42221A'
)

// The parked EXPLORE button (touch) opens the front chapter — the deliberate tap target, so a
// stray tap on empty screen no longer selects anything.
function onExploreTap() {
  if (!isHome.value) return
  const idx = frontChapterIdx.value
  if (idx < 0) return
  cursorRef.value?.confirm()
  webglSceneRef.value?.scene?.selectChapter?.(idx)
}
const chapterClass = computed(() => (currentChapter.value ? `--${currentChapter.value.slug}` : ''))

// Document title — via useHead so Nuxt's head system manages it (assigning
// document.title directly gets clobbered by Nuxt's managed <title>).
// ⚠️ THIS IS THE CLIENT-SIDE HALF ONLY. With `ssr: false` none of it reaches a crawler or a
// link unfurler, which read the HTML they are served and stop — the shells are rewritten
// after the build by `scripts/gen-head.mjs` (AUDIT #99). Both halves read `SITE.share`, so
// what a visitor's tab says and what WhatsApp says cannot drift apart.
const shareKey = computed(() => (currentChapter.value ? currentChapter.value.slug : 'home'))
// The h1's text: the chapter's own name, or the couple's line on the homepage. Deliberately
// NOT the document title — a heading that repeats the tab's suffix reads as noise aloud.
const pageHeading = computed(() =>
  currentChapter.value ? currentChapter.value.title : `${SITE.brand} — ${SITE.subtitle}`
)
const share = computed(() => SITE.share[shareKey.value] || SITE.share.home)
const pageTitle = computed(() => share.value.title)
useHead({
  title: pageTitle,
  meta: [
    { name: 'description', content: () => share.value.desc },
    { property: 'og:title', content: () => share.value.title },
    { property: 'og:description', content: () => share.value.desc },
    { property: 'og:url', content: () => `${SITE.url}/${currentChapter.value ? currentChapter.value.slug + '/' : ''}` },
    { property: 'og:image', content: () => `${SITE.url}/og/${shareKey.value}.jpg` },
  ],
})

function onLoaded() { loaded.value = true }

// Real asset-load progress from the scene (Issue #12). Monotonic so it never jumps back.
function onProgress(pct) { if (pct > loadProgress.value) loadProgress.value = pct }

// ── Audio (lazily initialized on first user interaction) ─────────────────────
// ⚠️ ONE TRACK, NOT ONE PER CHAPTER. It used to build four Howls and cross-fade their volumes on
// hover and on every route change; the music is the SITE'S now, so it simply plays while sound is
// on and the chapter you are reading makes no difference to it. (`tickSound` went with that: it was
// constructed and unloaded and never once played.)
let howlerModule = null
let theme = null
let audioInitialized = false

async function initAudio() {
  if (audioInitialized) return
  audioInitialized = true
  try {
    const { Howl, Howler } = await import('howler')
    howlerModule = Howler
    theme = new Howl({ src: [asset(SITE.themeAudio)], loop: true, volume: 0.5, html5: true })
    Howler.mute(!soundOn.value)
    theme.play()
    // ⚠️ `loop: true` IS NOT ENOUGH WITH `html5: true`, AND NEITHER IS THE `end` EVENT. Howler
    // carries `_loop: true` on the Howl but never puts `loop` on the underlying <audio> node on
    // this path, and its `end` never fires either — so the bed played ONCE and stopped for good.
    // Measured across the end of the track: `currentTime` ran 156.7 → 159.3 and then sat there
    // `paused` for every sample after. Nobody would ever have reported it — the music simply stops
    // two and a half minutes in, on a site where sound is off by default and most visits are
    // shorter than the track.
    // The browser's own `loop` is the reliable mechanism (and seamless — it does not re-buffer), so
    // set it on the node itself. `_sounds[0]._node` is private, hence the optional chaining and the
    // `end` handler kept behind it: if the shape ever changes, the fallback still restarts it.
    const node = theme._sounds?.[0]?._node
    if (node) node.loop = true
    theme.on('end', () => { if (!theme.playing()) theme.play() })
  } catch (e) {
    console.warn('Audio init failed:', e)
  }
}

// ── Navigation intents → all funnel through the URL ──────────────────────────
// Scene fired a click-select → reflect it in the URL. The route watcher sees the
// scene is already animating and won't re-trigger.
function onChapterSelect(idx) {
  // Acknowledge the input immediately: the circle lights up and stays expanded until the
  // chapter page is actually up. Selecting takes ~1.5s, and the circle used to collapse to
  // the 24px dot the moment hover ended — so a tap looked like it had done nothing while
  // the page was still coming.
  cursorRef.value?.confirm()
  // ⚠️ Release from HERE as well as from the route watcher. On a DEEP LINK the scene
  // auto-selects and calls this, but `route.params.slug` never CHANGES — it was already
  // the destination — so the watcher never fired and the circle stayed expanded for the
  // whole visit, parking a 104px EXPLORE blob over the page's own content. Set and
  // release now live together.
  releaseConfirmWhenSettled()
  const slug = CHAPTERS[idx].slug
  if (route.params.slug !== slug) router.push(`/${slug}`)
}
// The nav logo / back button was used → go home.
function goHome() { if (route.params.slug) router.push('/') }

function onChapterHover() {
  cursorRef.value?.activate()
}
function onChapterUnhover() {
  cursorRef.value?.deactivate()
}

// ── The cursor takes the shape of an inner-page control ──────────────────────────────────────
// Opt-in, by `data-cursor="morph"` on the control itself: the circle becomes that control's
// outline (CustomCursor.morphTo) and the control gets `.cursor-held` to change its own colour.
// Both halves are needed — see the note in CustomCursor on why the ring cannot simply fill it.
//
// ⚠️ ONE DELEGATED `pointerover` DOES BOTH ENTER AND LEAVE. It fires on every element the pointer
// enters, so walking off a button onto the page fires it on the page, `closest` returns null, and
// the morph is released — no matching pointerout to keep in sync, and nothing to leak if a control
// is removed mid-hover (the loop checks isConnected too).
const MORPH_SEL = '[data-cursor="morph"]'
let heldEl = null
function holdCursor(el) {
  if (heldEl === el) return
  heldEl?.classList.remove('cursor-held')
  heldEl = el
  if (el) {
    el.classList.add('cursor-held')
    cursorRef.value?.morphTo(el)
  } else {
    cursorRef.value?.unmorph()
  }
}
function onPointerOver(e) {
  // Touch has no hover: the "hover" a tap synthesizes would leave a button stuck in its held
  // colour for as long as the page stayed open. Same lesson as the parked EXPLORE circle.
  if (e.pointerType === 'touch') return holdCursor(null)
  holdCursor(e.target instanceof Element ? e.target.closest(MORPH_SEL) : null)
}
// The pointer leaving the window fires no pointerover anywhere, so it needs saying separately.
function onPointerLeaveWindow() { holdCursor(null) }

function toggleAbout() { aboutOpen.value = !aboutOpen.value }
async function toggleSound() {
  soundOn.value = !soundOn.value
  // ⚠️ `await initAudio()` first. The toggle IS the first interaction on plenty of visits, and the
  // window-level `once` listener that normally builds the audio may not have run yet — without this
  // the first tap on the speaker did nothing at all.
  await initAudio()
  howlerModule?.mute(!soundOn.value)
  if (soundOn.value && theme && !theme.playing()) theme.play()
}

// Drive the scene to match the URL. Handles browser back/forward and deep links;
// for an in-app card click the scene is already animating (guarded by getState).
// Always re-derives the target from the CURRENT route (the old deferred `pendingIdx`
// went stale: deep-link → navigate home before the intro ended → at intro end the
// scene force-selected, and force-navigated back to, the abandoned chapter).
// When an animation is mid-flight, re-sync shortly after instead of dropping the
// intent (e.g. back-then-forward during the deselect used to strand the chapter
// page over the idle carousel because the re-select was silently skipped).
let resyncTimer = null
function scheduleResync() {
  if (resyncTimer) return
  resyncTimer = setTimeout(() => { resyncTimer = null; syncSceneToRoute() }, 300)
}
function syncSceneToRoute() {
  const scene = webglSceneRef.value?.scene
  if (!scene) return
  const idx = slugToIdx(route.params.slug)
  const st = scene.getState()
  if (!st.introComplete) return // onReady re-syncs from the current route at intro end
  if (idx === -1) {
    if (st.selectedIndex !== -1 && !st.isDeselecting) scene.deselectChapter()
  } else if (st.selectedIndex !== idx) {
    if (st.isSelecting || st.isDeselecting) scheduleResync()
    else scene.selectChapter(idx)
  } else if (st.isDeselecting) {
    scheduleResync() // same chapter mid-deselect (back-then-forward) — re-select once it lands
  }
}
watch(() => route.params.slug, syncSceneToRoute)

// The confirmation holds from the tap until the chapter is actually ON SCREEN. A route
// change is the wrong anchor — router.push lands within a tick, so releasing there would
// flash the confirmation for a single frame and defeat the point. The real "page loaded"
// moment is the end of the scene's select animation (~1.5s), when the card has finished
// becoming the page. Polled, with a cap so a stalled animation can never strand the circle.
let confirmTimer = null
async function releaseConfirmWhenSettled() {
  await nextTick()
  clearInterval(confirmTimer)
  const started = Date.now()
  confirmTimer = setInterval(() => {
    const st = webglSceneRef.value?.scene?.getState?.()
    // `!st` guards a scene that never mounted; the 2.5s cap guards a stalled animation.
    // Neither may be reached before the animation actually starts, which is why this is
    // kicked off from onChapterSelect (after confirm()) rather than on mount.
    if (!st || !st.isSelecting || Date.now() - started > 2500) {
      clearInterval(confirmTimer)
      confirmTimer = null
      cursorRef.value?.endConfirm()
    }
  }, 100)
}
watch(() => route.params.slug, releaseConfirmWhenSettled)
watch(() => route.params.slug, () => holdCursor(null))

const initAudioOnce = () => initAudio()

onMounted(() => {
  document.addEventListener('pointerover', onPointerOver)
  document.addEventListener('pointerleave', onPointerLeaveWindow)
  window.addEventListener('click', initAudioOnce, { once: true })
  window.addEventListener('touchstart', initAudioOnce, { once: true })

  // Resolve the noise texture to an ABSOLUTE url (see Issue #3 / ARCHITECTURE). Same for the
  // laurel the wordmark's cursor wears — a CSS mask needs a real URL, and `asset()` is what knows
  // about the base path a GitHub Pages build is served under.
  const noiseUrl = new URL(asset('/images/noise.png'), window.location.origin).href
  document.documentElement.style.setProperty('--noise-url', `url('${noiseUrl}')`)
  const laurelUrl = new URL(asset('/images/laurel.png'), window.location.origin).href
  document.documentElement.style.setProperty('--laurel-url', `url('${laurelUrl}')`)

  // Apply any deep-linked chapter once the intro finishes (selection is gated until
  // then). onReady re-syncs from whatever the route is AT THAT MOMENT — no stale state.
  const scene = webglSceneRef.value?.scene
  if (scene) {
    scene.onReady(() => syncSceneToRoute())
    syncSceneToRoute() // in case we mounted already-ready
  }
})

onUnmounted(() => {
  document.removeEventListener('pointerover', onPointerOver)
  document.removeEventListener('pointerleave', onPointerLeaveWindow)
  clearInterval(confirmTimer)
  if (resyncTimer) clearTimeout(resyncTimer)
  theme?.unload()
})
</script>

<style>
html, body {
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: #fff;
}

.app-root {
  width: 100vw;
  height: 100vh;
  height: 100dvh;
  overflow: hidden;
  position: relative;
}
</style>
