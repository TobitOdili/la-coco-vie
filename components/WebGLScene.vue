<template>
  <canvas ref="canvasRef" id="webgl-canvas" />
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useChapterScene } from '~/composables/useChapterScene'

const emit = defineEmits(['chapter-select', 'chapter-hover', 'chapter-unhover'])

const canvasRef = ref(null)
const scene = useChapterScene()

let vsInstance = null

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

  // Mouse tracking
  window.addEventListener('mousemove', scene.onMouseMove)
  // Click
  canvasRef.value.addEventListener('click', scene.onClick)

  // VirtualScroll for smooth wheel/touch
  try {
    const VS = (await import('virtualscroll')).default
    vsInstance = new VS({ touchMultiplier: 25, firefoxMultiplier: 50 })
    vsInstance.on((event) => scene.onScroll(event.deltaY))
  } catch (e) {
    window.addEventListener('wheel', (e) => scene.onScroll(e.deltaY), { passive: true })
  }

  // Resize
  window.addEventListener('resize', handleResize)
})

function handleResize() {
  scene.onResize(window.innerWidth, window.innerHeight)
}

onUnmounted(() => {
  window.removeEventListener('mousemove', scene.onMouseMove)
  window.removeEventListener('resize', handleResize)
  vsInstance?.destroy()
  scene.destroy()
})

defineExpose({ scene })
</script>
