<template>
  <div
    ref="cursorRef"
    class="cursor"
    :class="{ active: isActive, parked: isTouch }"
    :style="{ '--cursorAccent': accent }"
  >
    <div class="cursor-box">
      <span class="explore">Explore</span>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

defineProps({
  // Accent of the card the circle is currently over (front card, or the open chapter).
  accent: { type: String, default: '#b32c05' },
})

const cursorRef = ref(null)
const isActive = ref(false)
// Touch devices have no pointer to follow, so the circle would sit at its off-screen start
// forever. The reference parks it on-screen instead — do the same (CSS centres it).
const isTouch = ref(false)

// Start offscreen — matches original EO constructor (mouse: {x:-100, y:-100})
let currentX = -100
let currentY = -100
let targetX = -100
let targetY = -100
let rafId = null

function lerp(a, b, t) {
  return a + (b - a) * t
}

function onMouseMove(e) {
  // A real pointer showed up (e.g. a hybrid device) — resume following it.
  isTouch.value = false
  targetX = e.clientX
  targetY = e.clientY
}

function loop() {
  if (!isTouch.value) {
    currentX = lerp(currentX, targetX, 0.2)
    currentY = lerp(currentY, targetY, 0.2)

    if (cursorRef.value) {
      // Centre cursor on pointer by offsetting half its current rendered size.
      // Original EO.update() uses hardcoded -12 (half of 24px rest size).
      // We read actual size so it stays centred during the active expand animation too.
      const half = cursorRef.value.offsetWidth / 2
      cursorRef.value.style.top = (currentY - half) + 'px'
      cursorRef.value.style.left = (currentX - half) + 'px'
    }
  }

  rafId = requestAnimationFrame(loop)
}

function activate() {
  isActive.value = true
}

function deactivate() {
  isActive.value = false
}

onMounted(() => {
  isTouch.value =
    typeof window !== 'undefined' &&
    (navigator.maxTouchPoints > 0 || 'ontouchstart' in window) &&
    !window.matchMedia('(pointer: fine)').matches
  window.addEventListener('mousemove', onMouseMove)
  loop()
})

onUnmounted(() => {
  window.removeEventListener('mousemove', onMouseMove)
  cancelAnimationFrame(rafId)
})

defineExpose({ activate, deactivate })
</script>

<style scoped>
/* Touch: park the circle on-screen (JS leaves top/left untouched in this mode) so it reads
   as a fixed viewport element, the way the reference does it. */
.cursor.parked {
  top: 50% !important;
  left: 50% !important;
  transform: translate(-50%, -50%);
}
</style>
