<template>
  <div class="app-root" :class="chapterClass" ref="appRoot">
    <!-- Loading screen -->
    <LoadingScreen v-if="!loaded" @complete="onLoaded" />

    <!-- Custom cursor -->
    <CustomCursor ref="cursorRef" />

    <!-- WebGL Scene -->
    <WebGLScene
      ref="webglSceneRef"
      @chapter-select="onChapterSelect"
      @chapter-hover="onChapterHover"
      @chapter-unhover="onChapterUnhover"
    />

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
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { CHAPTERS } from '~/composables/useChapterScene'

const appRoot = ref(null)
const cursorRef = ref(null)
const webglSceneRef = ref(null)
const aboutOpen = ref(false)
const selectedChapterIdx = ref(null)
const soundOn = ref(false)
const isHome = ref(true)
const loaded = ref(false)

// Audio (lazily initialized on first user interaction)
let howlerModule = null
let sounds = []
let tickSound = null
let audioInitialized = false

const currentChapter = computed(() =>
  selectedChapterIdx.value !== null ? CHAPTERS[selectedChapterIdx.value] : null
)

const currentAccent = computed(() => currentChapter.value?.accent || '#b32c05')

const chapterClass = computed(() => {
  if (selectedChapterIdx.value !== null && currentChapter.value) {
    return `--${currentChapter.value.slug}`
  }
  return ''
})

function onLoaded() {
  loaded.value = true
}

async function initAudio() {
  if (audioInitialized) return
  audioInitialized = true
  try {
    const { Howl, Howler } = await import('howler')
    howlerModule = Howler
    const base = (import.meta.env.BASE_URL || '/').replace(/\/$/, '')
    tickSound = new Howl({ src: [`${base}/audio/tick.mp3`], volume: 0.4 })
    sounds = CHAPTERS.map((ch) => new Howl({
      src: [ch.audio],
      loop: true,
      volume: 0,
      html5: true,
    }))
  } catch (e) {
    console.warn('Audio init failed:', e)
  }
}

function onChapterSelect(idx) {
  selectedChapterIdx.value = idx
  isHome.value = false
  if (currentChapter.value) {
    document.title = `${currentChapter.value.title} — Chapter Milla Nova`
  }
  if (soundOn.value && sounds[idx]) {
    sounds.forEach((s, i) => {
      if (i === idx) { s.volume(0.5); if (!s.playing()) s.play() }
      else s.volume(0)
    })
  }
}

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

function toggleAbout() {
  aboutOpen.value = !aboutOpen.value
}

function goHome() {
  webglSceneRef.value?.scene?.deselectChapter()
  selectedChapterIdx.value = null
  isHome.value = true
  document.title = 'Chapter — Milla Nova'
  sounds.forEach((s) => s.volume(0))
}

function toggleSound() {
  soundOn.value = !soundOn.value
  if (howlerModule) howlerModule.mute(!soundOn.value)
}

const initAudioOnce = () => initAudio()

onMounted(() => {
  window.addEventListener('click', initAudioOnce, { once: true })
  window.addEventListener('touchstart', initAudioOnce, { once: true })
  const base = (import.meta.env.BASE_URL || '/').replace(/\/$/, '')
  document.documentElement.style.setProperty('--noise-url', `url('${base}/images/noise.png')`)
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
