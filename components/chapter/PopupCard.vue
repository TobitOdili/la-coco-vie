<template>
  <!-- A floating popup card pinned to the viewport while its section is active. Generic:
       photo and url are both optional — registry items may be text-only, "moment"
       polaroids may not link, map/calendar cards link out. (Was DressTail.vue.) -->
  <!-- ⚠️ Three shapes, not two: a link out (`url`), a plain card, or — new — a
       BUTTON that opens something on the page (`action`). With Love's cash card
       needs the last one: sending money is a conversation, not a jump to another
       tab. -->
  <component
    :is="popup.action ? 'button' : popup.url ? 'a' : 'div'"
    class="popup-card"
    :type="popup.action ? 'button' : undefined"
    :href="!popup.action && popup.url ? popup.url : undefined"
    :target="!popup.action && popup.url ? '_blank' : undefined"
    :rel="!popup.action && popup.url ? 'noopener noreferrer' : undefined"
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
const props = defineProps({
  popup: { type: Object, required: true }, // { title, params[], photo?, url?, action? }
})

// Shared with the chapter component that owns the panel — the dock lives in
// `[slug].vue`, the content belongs to the page.
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
