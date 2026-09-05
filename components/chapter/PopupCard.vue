<template>
  <!-- A floating popup card pinned to the viewport while its section is active. Generic:
       photo and url are both optional — registry items may be text-only, "moment"
       polaroids may not link, map/calendar cards link out. (Was DressTail.vue.) -->
  <!-- ⚠️ Three shapes, not two: a link out (`url`), a plain card, or — new — a
       BUTTON that opens something on the page (`action`). With Love's cash card
       needs the last one: sending money is a conversation, not a jump to another
       tab. -->
  <!-- ⚠️ A PLACEHOLDER URL IS NOT A DESTINATION. `#` was rendering as
       <a href="#" target="_blank"> — a card that opens a blank tab on nothing. Cards
       whose destination is not wired up yet render as plain cards until it is. -->
  <component
    :is="popup.action ? 'button' : link ? 'a' : 'div'"
    class="popup-card"
    :class="{ 'is-static': !popup.action && !link }"
    :type="popup.action ? 'button' : undefined"
    :href="link || undefined"
    :target="link ? '_blank' : undefined"
    :rel="link ? 'noopener noreferrer' : undefined"
    @click="popup.action && open()"
  >
    <img
      v-if="popup.photo"
      class="popup-photo"
      :src="popup.photo"
      :alt="popup.title"
      loading="lazy"
    />
    <div class="popup-meta">
      <div class="popup-name">{{ popup.title }}</div>
      <div v-for="(p, i) in popup.params" :key="i" class="popup-param">{{ p }}</div>
    </div>
  </component>
</template>

<script setup>
import { computed } from 'vue'
const props = defineProps({
  popup: { type: Object, required: true }, // { title, params[], photo?, url?, action? }
})

// Shared with the chapter component that owns the panel — the dock lives in
// `[slug].vue`, the content belongs to the page.
// `#` and '' both mean "not wired up yet", and neither is somewhere to send a guest.
const link = computed(() => {
  const u = props.popup?.url
  return u && u !== '#' ? u : null
})

const openPanel = useState('chapterPanel', () => null)
const open = () => { openPanel.value = props?.popup?.action ?? null }
</script>

<style scoped>
.popup-card {
  appearance: none;
  -webkit-appearance: none;
  border: 0;
  font: inherit;
  text-align: start;
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
.popup-card:hover {
  transform: translateY(-3px);
}
/* Nothing to click — do not offer the lift that says there is. */
.popup-card.is-static { cursor: default; }
.popup-card.is-static:hover { transform: none; }
.popup-photo {
  width: 44px;
  height: 60px;
  object-fit: cover;
  border-radius: 0.25rem;
  flex: none;
}
.popup-meta {
  font-size: 11px;
  line-height: 1.4;
}
.popup-name {
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.04em;
}
.popup-param {
  opacity: 0.6;
  text-transform: lowercase;
}
</style>
