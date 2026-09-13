<template>
  <div class="accounts" :class="`tone-${tone}`">
    <p v-if="note" class="acc-note">{{ note }}</p>
    <ul class="acc-list">
      <li v-for="a in accounts" :key="a.number" class="acc">
        <span class="acc-bank">{{ a.bank }}</span>
        <!-- ⚠️ THE NUMBER IS THE BUTTON. An account number is not something anyone wants to
             read — it is something they want in their banking app, and on a phone that means
             not transcribing eleven digits from one screen to another. -->
        <button
          type="button"
          class="acc-number"
          :aria-label="`Copy the ${a.bank} account number, ${spoken(a.number)}`"
          @click="copy(a.number)"
        >
          <span class="digits">{{ a.number }}</span>
        </button>
        <span class="acc-name">{{ a.name }}</span>
        <!-- ⚠️ AFTER THE NAME, not between it and the number. An account is read as three things
             in order — bank, number, whose it is — and a "copy" hint wedged into the middle of
             that breaks the one line a guest is actually trying to read. It is the affordance,
             so it comes last. -->
        <span class="acc-state" aria-hidden="true">{{ state(a.number) }}</span>
      </li>
    </ul>
    <!-- Announced, not drawn: the state swap above is aria-hidden because it reads as a
         label change rather than as an event. -->
    <span class="sr" role="status" aria-live="polite">{{ said }}</span>
  </div>
</template>

<script setup>
import { ref, onBeforeUnmount } from 'vue'
import { SITE } from '~/site.config'

// ─────────────────────────────────────────────────────────────────────────────
// THE COUPLE'S ACCOUNTS — the one component that renders them, in two voices.
//
// ⚠️ THE NUMBERS LIVE IN site.config.js, not here. Both places that show them (the chapter
// footer and With Love's "even better" section) render THIS, so there is exactly one copy of
// the details on the site and no chance of two that disagree.
//
// `tone` is the only difference between the two:
//   • 'footer' — the site's chrome voice. Bague small caps, quiet, one line per account.
//   • 'page'   — With Love's own. The same facts set as ink on paper, with the number given
//     the size it needs to be read off a screen, and a hairline between the two accounts.
// ─────────────────────────────────────────────────────────────────────────────
const props = defineProps({
  tone: { type: String, default: 'footer' },   // 'footer' | 'page'
  // Omit to use the config's own line; pass '' for no line at all.
  note: { type: String, default: () => SITE.gifts?.note || '' },
})

const accounts = SITE.gifts?.accounts || []

// Spell the digits out for a screen reader — "7861462222" is read as a single
// seven-billion-something number otherwise, which is unusable as an account number.
const spoken = (n) => String(n).split('').join(' ')

const copied = ref('')
const failed = ref('')
const said = ref('')
let timer = 0

function state(n) {
  if (failed.value === n) return 'select and copy'
  if (copied.value === n) return 'copied'
  return 'copy'
}

async function copy(n) {
  clearTimeout(timer)
  let ok = false
  try {
    // The modern path needs a secure context AND permission; neither is guaranteed
    // (an http:// preview, an in-app webview), so the failure is expected, not exceptional.
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(n)
      ok = true
    }
  } catch {
    ok = false
  }
  if (!ok) ok = legacyCopy(n)
  copied.value = ok ? n : ''
  failed.value = ok ? '' : n
  said.value = ok ? `${n} copied` : 'Could not copy — select the number to copy it'
  // Back to the resting label. ⚠️ Cleared on unmount: the chapter footer goes away with the
  // route, and a timer writing into a dead ref is the classic leak here.
  timer = setTimeout(() => { copied.value = ''; failed.value = ''; said.value = '' }, 2400)
}

// execCommand is deprecated and still the only thing that works outside a secure context.
function legacyCopy(n) {
  try {
    const ta = document.createElement('textarea')
    ta.value = n
    ta.setAttribute('readonly', '')
    ta.style.cssText = 'position:fixed;top:0;left:-9999px;opacity:0'
    document.body.appendChild(ta)
    ta.select()
    const ok = document.execCommand('copy')
    document.body.removeChild(ta)
    return ok
  } catch {
    return false
  }
}

onBeforeUnmount(() => clearTimeout(timer))
</script>

<style scoped>
.accounts { color: inherit; }
.acc-list {
  list-style: none;
  margin: 0;
  padding: 0;
}
.acc-number {
  appearance: none;
  -webkit-appearance: none;
  border: 0;
  background: none;
  padding: 0;
  color: inherit;
  font: inherit;
  text-align: inherit;
  /* The site draws its own cursor; a native one would appear beside it. */
  cursor: none;
}
.acc-number:focus-visible { outline: 1px solid currentColor; outline-offset: 3px; }
.digits {
  /* Tabular figures so the two numbers line up under each other, and enough tracking
     that a guest can read a digit at a time without losing their place. */
  font-variant-numeric: tabular-nums;
  letter-spacing: 0.12em;
}
.sr {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip-path: inset(50%);
  white-space: nowrap;
}

/* ── the chrome's voice: quiet, one line each ──────────────────────────────── */
.tone-footer {
  font-family: 'Bague', sans-serif;
  text-transform: uppercase;
  letter-spacing: 0.14em;
  font-size: 0.72rem;
  line-height: 1.9;
}
.tone-footer .acc-note {
  margin: 0 0 0.7rem;
  opacity: 0.45;
  letter-spacing: 0.18em;
}
.tone-footer .acc-list {
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
}
.tone-footer .acc {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  justify-content: center;
  gap: 0.1rem 0.7rem;
  opacity: 0.72;
}
.tone-footer .acc-bank { opacity: 0.62; }
.tone-footer .acc-name { opacity: 0.62; }
.tone-footer .acc-number {
  display: inline-flex;
  align-items: baseline;
  border-bottom: 1px solid currentColor;
  padding-bottom: 1px;
  transition: opacity 0.25s ease;
  opacity: 0.9;
}
.tone-footer .acc-number:hover { opacity: 1; }
.tone-footer .acc-state {
  font-size: 0.6rem;
  letter-spacing: 0.16em;
  opacity: 0.45;
}

/* ── With Love's voice: ink on paper, the number given room ─────────────────
   No box, no rule around anything — the only line on the whole block is the hairline
   BETWEEN the two accounts, which is the same mark the signatures and the margin notes
   on this chapter are drawn with. */
.tone-page { font-family: 'Bague', sans-serif; }
.tone-page .acc-note {
  font-family: 'Over the Rainbow', cursive;
  text-transform: none;
  letter-spacing: 0;
  font-size: clamp(1.15rem, 2vw, 1.45rem);
  line-height: 1.4;
  margin: 0 0 2rem;
  opacity: 0.8;
}
.tone-page .acc-list {
  display: flex;
  flex-wrap: wrap;
  align-items: stretch;
  justify-content: center;
  gap: 1.4rem 3.2rem;
}
.tone-page .acc {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.42rem;
  text-transform: uppercase;
  font-size: clamp(0.58rem, 0.75vw, 0.68rem);
  letter-spacing: 0.18em;
}
/* The divider is on the SECOND account, drawn on its leading edge — so one account has no
   stray rule and three would each get one without another rule being written. */
.tone-page .acc + .acc {
  border-inline-start: 1px solid currentColor;
  padding-inline-start: 3.2rem;
  margin-inline-start: -1.8rem;
}
.tone-page .acc-bank { opacity: 0.55; }
.tone-page .acc-name { opacity: 0.55; }
.tone-page .acc-number { display: block; }
.tone-page .digits {
  font-size: clamp(1.12rem, 1.9vw, 1.4rem);
  letter-spacing: 0.16em;
  opacity: 0.95;
  border-bottom: 1px solid currentColor;
  padding-bottom: 0.3rem;
  transition: opacity 0.25s ease;
}
.tone-page .acc-number:hover .digits { opacity: 1; }
.tone-page .acc-state {
  font-size: 0.56rem;
  letter-spacing: 0.2em;
  opacity: 0.42;
}

/* A phone has no room for two columns, and a vertical rule between stacked rows is
   just a stray mark — it becomes the gap it was standing in for. */
@media (max-width: 700px) {
  .tone-page .acc-list { flex-direction: column; gap: 2rem; }
  .tone-page .acc + .acc {
    border-inline-start: 0;
    padding-inline-start: 0;
    margin-inline-start: 0;
    padding-top: 2rem;
    border-top: 1px solid color-mix(in srgb, currentColor 35%, transparent);
  }
}

@media (prefers-reduced-motion: reduce) {
  .acc-number, .digits { transition-duration: 0.01ms !important; }
}
</style>
