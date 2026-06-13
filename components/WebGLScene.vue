<template>
  <div id="canvas-container">
    <canvas ref="canvasRef" id="webgl-canvas" />
    <!-- Interaction layer: sits above canvas but below nav (z-5), covers full viewport -->
    <div
      ref="hitLayerRef"
      id="canvas-hit-layer"
      @click="onHitClick"
    />
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useChapterScene } from '~/composables/useChapterScene'

const emit = defineEmits(['chapter-select', 'chapter-hover', 'chapter-unhover', 'progress', 'chapter-deselect'])

const canvasRef = ref(null)
const hitLayerRef = ref(null)
const scene = useChapterScene()

function onHitClick(e) {
  scene.onClick(e)
}

// Wheel → carousel scroll. (The `virtualscroll` dep was dead: the installed package is an
// unrelated custom-scrollbar widget whose constructor threw on our config, so the code
// always fell back to this listener anyway. Removed the dead import.) Touch/mobile is a
// known gap — `wheel` doesn't cover it; revisit with the real `virtual-scroll` lib if needed.
function onWheel(e) {
  scene.onScroll(e.deltaY - e.deltaX)
}

onMounted(async () => {
  if (!canvasRef.value) return

  // Relay real asset-load progress to the loader (Issue #12).
  // Registered BEFORE init() so we catch every texture load.
  scene.onProgress((pct) => emit('progress', pct))

  await scene.init(canvasRef.value)

  // Safety net: scene is fully ready — guarantee the loader can complete
  // even if the asset count drifts.
  emit('progress', 100)

  scene.onSelect((idx) => {
    emit('chapter-select', idx)
  })

  scene.onHover((idx, hovering) => {
    if (hovering) {
      emit('chapter-hover', idx)
    } else {
      emit('chapter-unhover', idx)
    }
  })

  // Scene self-initiated deselect (scroll-back exit, Issue #7) — let app.vue
  // reset its state. The scene already runs the reverse animation.
  scene.onDeselect(() => {
    emit('chapter-deselect')
  })

  // Mouse tracking on window (doesn't block events)
  window.addEventListener('mousemove', scene.onMouseMove)

  // Wheel drives the homepage carousel scroll.
  window.addEventListener('wheel', onWheel, { passive: true })

  // Resize — listen to both window resize and visualViewport resize (mobile)
  window.addEventListener('resize', handleResize)
  if (window.visualViewport) {
    window.visualViewport.addEventListener('resize', handleResize)
  }
})

function handleResize() {
  scene.onResize(window.innerWidth, window.innerHeight)
}

onUnmounted(() => {
  window.removeEventListener('mousemove', scene.onMouseMove)
  window.removeEventListener('wheel', onWheel)
  window.removeEventListener('resize', handleResize)
  if (window.visualViewport) {
    window.visualViewport.removeEventListener('resize', handleResize)
  }
  scene.destroy()
})

defineExpose({ scene })
</script>
