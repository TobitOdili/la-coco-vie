<template>
  <Transition name="fade">
    <div
      v-if="visible"
      class="loader-overlay"
    >
      <span class="--la-storia">
        <span class="display loader">{{ progress }}</span>
      </span>
      <span class="--eat-marry-love" style="position: absolute;">
        <span class="display loader">%</span>
      </span>
    </div>
  </Transition>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const visible = ref(true)
const progress = ref(0)

const emit = defineEmits(['complete'])

onMounted(() => {
  // Original: loading overlay fades in 1s when assets are done loading
  // We use a 1s animation to match that timing
  const start = Date.now()
  const duration = 1000

  function update() {
    const elapsed = Date.now() - start
    const pct = Math.min(100, Math.floor((elapsed / duration) * 100))
    progress.value = pct

    if (pct < 100) {
      requestAnimationFrame(update)
    } else {
      // Fade out quickly (matching original's 1s fade)
      setTimeout(() => {
        visible.value = false
        emit('complete')
      }, 200)
    }
  }
  requestAnimationFrame(update)
})
</script>

<style scoped>
.loader-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: white;
  z-index: 40;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  padding-bottom: 5vh;
}

.display {
  display: inline-block;
  font-size: 3.75rem;
  line-height: 1em;
}

@media (min-width: 1024px) {
  .display { font-size: 8rem; }
}

@media (min-width: 1280px) {
  .display { font-size: 150px; }
}

.--la-storia .display {
  font-family: 'Italiana', sans-serif;
  color: #304443;
}

.--eat-marry-love {
  position: relative;
}

.--eat-marry-love .display {
  font-family: 'Over the Rainbow', cursive;
  color: #b32c05;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
