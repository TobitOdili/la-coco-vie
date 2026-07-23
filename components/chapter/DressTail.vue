<template>
  <!-- Generalized floating popup card (was the dress card): photo and url are both
       optional — registry items may be text-only, "moment" polaroids may not link. -->
  <component
    :is="dress.url ? 'a' : 'div'"
    class="dress-tail"
    :href="dress.url || undefined"
    :target="dress.url ? '_blank' : undefined"
    :rel="dress.url ? 'noopener noreferrer' : undefined"
  >
    <img
      v-if="dress.photo"
      class="dress-photo"
      :src="dress.photo"
      :alt="dress.title"
      loading="lazy"
    />
    <div class="dress-meta">
      <div class="dress-name">{{ dress.title }}</div>
      <div v-for="(p, i) in dress.params" :key="i" class="dress-param">{{ p }}</div>
    </div>
  </component>
</template>

<script setup>
defineProps({
  dress: { type: Object, required: true }, // { title, params[], photo?, url? }
})
</script>

<style scoped>
.dress-tail {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.5rem 0.75rem;
  background: rgba(255, 255, 255, 0.85);
  border-radius: 0.5rem;
  box-shadow: 0 6px 24px rgba(0, 0, 0, 0.12);
  backdrop-filter: blur(4px);
  text-decoration: none;
  color: var(--accent, #333);
  cursor: none;
  transition: transform 0.3s ease;
}
.dress-tail:hover {
  transform: translateY(-3px);
}
.dress-photo {
  width: 44px;
  height: 60px;
  object-fit: cover;
  border-radius: 0.25rem;
  flex: none;
}
.dress-meta {
  font-size: 11px;
  line-height: 1.4;
}
.dress-name {
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.04em;
}
.dress-param {
  opacity: 0.6;
  text-transform: lowercase;
}
</style>
