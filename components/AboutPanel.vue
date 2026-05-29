<template>
  <Transition name="slide">
    <div v-if="isOpen" class="about-overlay">
      <div class="container my text-center">
        <div class="min-h-14" />
        <div class="star mb-8">
          <svg
            class="mx-auto w-3 h-3 md:w-5 md:h-5"
            viewBox="0 0 19 19"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9.5 0L11.5287 7.47131L19 9.5L11.5287 11.5287L9.5 19L7.47131 11.5287L0 9.5L7.47131 7.47131L9.5 0Z"
              fill="var(--accent)"
            />
          </svg>
        </div>
        <div class="w-full md:w-10/12 lg:w-8/12 mx-auto mt-4 lg:mt-8">
          <div
            v-for="(p, i) in SITE.about"
            :key="i"
            class="movie text-accent"
            :class="{ 'mb-6': p.gap }"
          >
            {{ p.text }}
          </div>
        </div>
      </div>
      <!-- Close button -->
      <button
        class="close-about menu-item"
        @click="$emit('close')"
      >
        ✕
      </button>
    </div>
  </Transition>
</template>

<script setup>
import { SITE } from '~/site.config'

defineProps({
  isOpen: { type: Boolean, default: false },
})
defineEmits(['close'])
</script>

<style scoped>
.about-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: var(--accentLight, #f3ebe4);
  z-index: 50;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.container {
  margin-left: auto;
  margin-right: auto;
  max-width: none;
  position: relative;
  width: 91.666667%;
  z-index: 1;
}

.my {
  margin-top: 2rem;
  margin-bottom: 2rem;
}

@media (min-width: 640px) {
  .my { margin-top: 4rem; margin-bottom: 4rem; }
}
@media (min-width: 1024px) {
  .my { margin-top: 6rem; margin-bottom: 6rem; }
}

.movie {
  font-family: 'Movie', sans-serif;
  font-size: 6.5vh;
  font-style: normal;
  font-weight: 400;
  line-height: 90%;
}

.text-accent { color: var(--accent); }

.close-about {
  position: fixed;
  top: 1rem;
  right: 1rem;
  font-size: 1.5rem;
  background: none;
  border: none;
  color: var(--accent);
  cursor: none;
  z-index: 60;
}

/* Transitions */
.slide-enter-active,
.slide-leave-active {
  transition: transform 0.7s cubic-bezier(0.86, 0, 0.07, 1);
}

.slide-enter-from,
.slide-leave-to {
  transform: translateX(-100%);
}
</style>
