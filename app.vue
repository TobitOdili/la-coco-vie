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
import { ref, computed, onMounted, onUnmounted, watch, provide } from 'vue'
import { CHAPTERS } from '~/composables/useChapterScene'
import { SITE } from '~/site.config'

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
  webglSceneRef.value?.scene?.selectChapter?.(idx)
}
const chapterClass = computed(() => (currentChapter.value ? `--${currentChapter.value.slug}` : ''))

// Document title — via useHead so Nuxt's head system manages it (assigning
// document.title directly gets clobbered by Nuxt's managed <title>).
const pageTitle = computed(() =>
  currentChapter.value ? `${currentChapter.value.title} ${SITE.titles.chapterSuffix}` : SITE.titles.home
)
useHead({ title: pageTitle })

function onLoaded() { loaded.value = true }

// Real asset-load progress from the scene (Issue #12). Monotonic so it never jumps back.
function onProgress(pct) { if (pct > loadProgress.value) loadProgress.value = pct }

// ── Audio (lazily initialized on first user interaction) ─────────────────────
let howlerModule = null
let sounds = []
let tickSound = null
let audioInitialized = false

async function initAudio() {
  if (audioInitialized) return
  audioInitialized = true
  try {
    const { Howl, Howler } = await import('howler')
    howlerModule = Howler
    const base = (import.meta.env.BASE_URL || '/').replace(/\/$/, '')
    tickSound = new Howl({ src: [`${base}/audio/tick.mp3`], volume: 0.4 })
    sounds = CHAPTERS.map((ch) => new Howl({ src: [ch.audio], loop: true, volume: 0, html5: true }))
  } catch (e) {
    console.warn('Audio init failed:', e)
  }
}

// ── Navigation intents → all funnel through the URL ──────────────────────────
// Scene fired a click-select → reflect it in the URL. The route watcher sees the
// scene is already animating and won't re-trigger.
function onChapterSelect(idx) {
  const slug = CHAPTERS[idx].slug
  if (route.params.slug !== slug) router.push(`/${slug}`)
}
// The nav logo / back button was used → go home.
function goHome() { if (route.params.slug) router.push('/') }

function onChapterHover(idx) {
  cursorRef.value?.activate()
  if (soundOn.value && sounds.length) {
    sounds.forEach((s, i) => {
      if (i === idx) { s.volume(0.12); if (!s.playing()) s.play() }
      else s.volume(0)
    })
  }
}
function onChapterUnhover() {
  cursorRef.value?.deactivate()
  if (sounds.length) sounds.forEach((s) => s.volume(0))
}

function toggleAbout() { aboutOpen.value = !aboutOpen.value }
function toggleSound() {
  soundOn.value = !soundOn.value
  if (howlerModule) howlerModule.mute(!soundOn.value)
}

// React to chapter changes for ambient audio — driven by the route.
watch(selectedChapterIdx, (idx) => {
  if (!sounds.length) return
  sounds.forEach((s, i) => {
    if (idx !== null && i === idx && soundOn.value) { s.volume(0.5); if (!s.playing()) s.play() }
    else s.volume(0)
  })
})

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

const initAudioOnce = () => initAudio()

onMounted(() => {
  window.addEventListener('click', initAudioOnce, { once: true })
  window.addEventListener('touchstart', initAudioOnce, { once: true })

  // Resolve the noise texture to an ABSOLUTE url (see Issue #3 / ARCHITECTURE).
  const base = (import.meta.env.BASE_URL || '/').replace(/\/$/, '')
  const noiseUrl = new URL(`${base}/images/noise.png`, window.location.href).href
  document.documentElement.style.setProperty('--noise-url', `url('${noiseUrl}')`)

  // Apply any deep-linked chapter once the intro finishes (selection is gated until
  // then). onReady re-syncs from whatever the route is AT THAT MOMENT — no stale state.
  const scene = webglSceneRef.value?.scene
  if (scene) {
    scene.onReady(() => syncSceneToRoute())
    syncSceneToRoute() // in case we mounted already-ready
  }
})

onUnmounted(() => {
  if (resyncTimer) clearTimeout(resyncTimer)
  sounds.forEach((s) => s.unload())
  tickSound?.unload()
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
