<template>
  <div
    ref="cursorRef"
    class="cursor"
    :class="{ active: isActive }"
  >
    <div class="cursor-box">
      <span class="explore">Explore</span>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const cursorRef = ref(null)
const isActive = ref(false)

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
  targetX = e.clientX
  targetY = e.clientY
}

function loop() {
  currentX = lerp(currentX, targetX, 0.2)
  currentY = lerp(currentY, targetY, 0.2)

  if (cursorRef.value) {
    // Centre cursor on pointer by offsetting half its current rendered size.
    // Original EO.update() uses hardcoded -12 (half of 24px rest size).
    // We read actual size so it stays centred during the active expand animation too.
    const half = cursorRef.value.offsetWidth / 2
    cursorRef.value.style.top  = (currentY - half) + 'px'
    cursorRef.value.style.left = (currentX - half) + 'px'
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
  window.addEventListener('mousemove', onMouseMove)
  loop()
})

onUnmounted(() => {
  window.removeEventListener('mousemove', onMouseMove)
  cancelAnimationFrame(rafId)
})

defineExpose({ activate, deactivate })
</script>
