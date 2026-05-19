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

let currentX = -200
let currentY = -200
let targetX = -200
let targetY = -200
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
    cursorRef.value.style.transform = `translate(${currentX}px, ${currentY}px)`
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
