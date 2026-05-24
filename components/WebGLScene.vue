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

const emit = defineEmits(['chapter-select', 'chapter-hover', 'chapter-unhover'])

const canvasRef = ref(null)
const hitLayerRef = ref(null)
const scene = useChapterScene()

let vsInstance = null

function onHitClick(e) {
  scene.onClick(e)
}

onMounted(async () => {
  if (!canvasRef.value) return

  await scene.init(canvasRef.value)

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

  // Mouse tracking on window (doesn't block events)
  window.addEventListener('mousemove', scene.onMouseMove)

  // VirtualScroll for smooth wheel/touch
  try {
    const VS = (await import('virtualscroll')).default
    vsInstance = new VS({ el: hitLayerRef.value, touchMultiplier: 25, firefoxMultiplier: 50 })
    vsInstance.on((event) => scene.onScroll(event.deltaY - event.deltaX))
  } catch (e) {
    window.addEventListener('wheel', (e) => scene.onScroll(e.deltaY - e.deltaX), { passive: true })
  }

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
  window.removeEventListener('resize', handleResize)
  if (window.visualViewport) {
    window.visualViewport.removeEventListener('resize', handleResize)
  }
  vsInstance?.destroy()
  scene.destroy()
})

defineExpose({ scene })
</script>
