<template>
  <div class="app-root" :class="chapterClass" ref="appRoot">
    <!-- Loading screen -->
    <LoadingScreen v-if="!loaded" :progress="loadProgress" @complete="onLoaded" />

    <!-- Custom cursor -->
    <CustomCursor ref="cursorRef" />

    <!-- WebGL Scene — persistent across routes (never unmounts, so no intro replay) -->
    <WebGLScene
      ref="webglSceneRef"
      @chapter-select="onChapterSelect"
      @chapter-hover="onChapterHover"
      @chapter-unhover="onChapterUnhover"
      @progress="onProgress"
      @chapter-deselect="onChapterDeselect"
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
const currentAccent = computed(() => currentChapter.value?.accent || '#b32c05')
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
// Scene fired scroll-back exit, or the nav logo / back button was used → go home.
function onChapterDeselect() { if (route.params.slug) router.push('/') }
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
let pendingIdx = null
function syncSceneToRoute() {
  const scene = webglSceneRef.value?.scene
  if (!scene) return
  const idx = slugToIdx(route.params.slug)
  const st = scene.getState()
  if (idx === -1) {
    if (st.selectedIndex !== -1 && !st.isDeselecting) scene.deselectChapter()
  } else if (!st.introComplete) {
    pendingIdx = idx // defer until the intro finishes (deep link on fresh load)
  } else if (st.selectedIndex !== idx && !st.isSelecting) {
    scene.selectChapter(idx)
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

  // Apply any deep-linked chapter once the intro finishes (selection is gated until then).
  const scene = webglSceneRef.value?.scene
  if (scene) {
    scene.onReady(() => {
      if (pendingIdx !== null) { scene.selectChapter(pendingIdx); pendingIdx = null }
      else syncSceneToRoute()
    })
    syncSceneToRoute() // in case we mounted already-ready
  }
})

onUnmounted(() => {
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
