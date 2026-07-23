<template>
  <div
    ref="cursorRef"
    class="cursor"
    :class="{ active: isActive || parkedVisible, parked: isTouch, ready: parkedVisible }"
    :style="{ '--cursorAccent': accent }"
    @click="onExploreTap"
  >
    <div class="cursor-box">
      <span class="explore">Explore</span>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  // Accent of the card the circle is currently over (front card, or the open chapter).
  accent: { type: String, default: '#b32c05' },
  // True once the intro has settled and the front chapter is known — gates the parked button
  // so it can't appear mid-spin or flash a placeholder colour.
  exploreReady: { type: Boolean, default: false },
})
const emit = defineEmits(['explore'])

const cursorRef = ref(null)
const isActive = ref(false)
// The parked EXPLORE button shows only on touch AND once the cards have settled.
const parkedVisible = computed(() => isTouch.value && props.exploreReady)
// Touch devices have no pointer to follow, so the circle would sit at its off-screen start
// forever. The reference instead parks it on-screen in its EXPANDED state — a real "EXPLORE"
// button you tap to open the front chapter. Mirror that.
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

function onExploreTap() {
  // Only meaningful once parked + revealed; on desktop the circle is pointer-events:none.
  if (parkedVisible.value) emit('explore')
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
/* Touch: park the expanded circle low-centre as a tappable EXPLORE button (the reference's
   placement). JS leaves top/left alone in this mode, so these win. */
.cursor.parked {
  top: 75% !important;
  left: 50% !important;
  transform: translate(-50%, -50%);
  /* Hidden until the cards have settled (.ready), then eased in a beat later so the order
     reads: cards settle → wordmark → EXPLORE. */
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.5s ease 0.35s;
}
.cursor.parked.ready {
  opacity: 1;
  pointer-events: auto;   /* overrides the base `none` so the button is tappable */
  cursor: pointer;
}
</style>
