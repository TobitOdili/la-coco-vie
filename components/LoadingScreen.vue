<template>
  <div v-if="visible" ref="overlayRef" class="loader-overlay">
    <span class="num">
      <span class="display loader">{{ displayPct }}</span>
    </span>
    <span class="pct">
      <span class="display loader">%</span>
    </span>
  </div>
</template>

<script setup>
import { ref, watch, onMounted, onUnmounted } from 'vue'
import { gsap } from 'gsap'

// Real asset-load progress (0–100) driven by the scene (Issue #12).
const props = defineProps({
  progress: { type: Number, default: 0 },
})

const emit = defineEmits(['complete'])

const visible = ref(true)
const overlayRef = ref(null)
const displayPct = ref(0)

// GSAP tweens a private value toward the real progress so the counter eases
// smoothly instead of snapping with each asset load.
const counter = { val: 0 }
let exited = false
let safetyTimer = null

function playExit() {
  if (exited) return
  exited = true
  if (safetyTimer) { clearTimeout(safetyTimer); safetyTimer = null }
  // GSAP fade-out exit (replaces the old CSS opacity transition).
  gsap.to(overlayRef.value, {
    opacity: 0,
    duration: 0.6,
    ease: 'power2.inOut',
    onComplete: () => {
      visible.value = false
      emit('complete')
    },
  })
}

watch(
  () => props.progress,
  (target) => {
    gsap.to(counter, {
      val: target,
      duration: 0.6,
      ease: 'power2.out',
      overwrite: true,
      onUpdate: () => { displayPct.value = Math.round(counter.val) },
      onComplete: () => {
        if (target >= 100) playExit()
      },
    })
  }
)

onMounted(() => {
  // Safety fallback: if real progress never reaches 100 (e.g. init throws or a
  // WebGL failure), force-complete after 12s so the loader can't hang forever.
  safetyTimer = setTimeout(() => {
    displayPct.value = 100
    playExit()
  }, 12000)
})

onUnmounted(() => {
  if (safetyTimer) clearTimeout(safetyTimer)
})
</script>

<style scoped>
.loader-overlay {
  position: fixed;
  inset: 0;
  width: 100%;
  height: 100%;
  background: #fff;
  z-index: 40;
  /* Centered (matches the live original: justify-center items-center pb-[5vh]) */
  display: flex;
  justify-content: center;
  align-items: center;
  padding-bottom: 5vh;
  /* Subtle light-gray counter (original uses text-zinc-200) */
  color: #e4e4e7;
}

.display {
  display: inline-block;
  line-height: 1em;
  color: #e4e4e7;
  font-size: 3.75rem;
}

@media (min-width: 1024px) {
  .display { font-size: 8rem; }
}

@media (min-width: 1280px) {
  .display { font-size: 150px; }
}

/* Number — Italiana serif */
.num .display {
  font-family: 'Italiana', sans-serif;
}

/* Percent — Over the Rainbow cursive, offset to the right of the number
   (absolute so the number stays centered as its digit count changes). */
.pct {
  position: absolute;
}

.pct .display {
  font-family: 'Over the Rainbow', cursive;
}
</style>
