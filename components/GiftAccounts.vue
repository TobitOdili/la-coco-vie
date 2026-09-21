<template>
  <div class="accounts" :class="`tone-${tone}`">
    <p v-if="note" class="acc-note">{{ note }}</p>
    <ul class="acc-list">
      <li v-for="a in accounts" :key="a.number" class="acc">
        <!-- ⚠️ THE WHOLE ROW IS THE BUTTON, not the digits. An account number is not something
             anyone wants to READ — it is something they want in their banking app — and as a
             ~130×20px target the digits alone were a thumb-sized miss on a phone. -->
        <button
          type="button"
          class="acc-hit"
          data-cursor="morph"
          data-cursor-pad="4"
          :class="{ ok: copied === a.number, bad: failed === a.number }"
          :aria-label="`Copy the ${a.bank} account number, ${spoken(a.number)}`"
          @click="copy(a.number)"
        >
          <span class="acc-bank">{{ a.bank }}</span>
          <span class="digits">{{ a.number }}</span>
          <span class="acc-name">{{ a.name }}</span>
          <span class="acc-state" aria-hidden="true">
            <i v-if="copied === a.number" class="tick" />{{ state(a.number) }}
          </span>
        </button>
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
// THE COUPLE'S ACCOUNTS — the one component that renders them.
//
// ⚠️ THE NUMBERS LIVE IN site.config.js, not here.
// ⚠️ 2026-09-15 — FOR OUR NEXT CHAPTER ONLY. They were in every other chapter's footer as well
// ("across the site", 2026-09-13); the couple asked for them back on the gift page alone. The
// `tone="footer"` styling is kept because a footer is exactly where they would go again.
// ─────────────────────────────────────────────────────────────────────────────
const props = defineProps({
  tone: { type: String, default: 'page' },     // 'page' | 'footer'
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
  if (copied.value === n) return 'copied'
  if (failed.value === n) return 'press and hold to copy'
  return 'tap to copy'
}

// ⚠️ BOTH PATHS, EVERY TIME, AND THE SYNCHRONOUS ONE FIRST.
// `navigator.clipboard.writeText` is a promise, and Safari only honours it while the call is still
// inside the user gesture — so `await`ing it and only then falling back leaves the fallback running
// outside the gesture, where `execCommand` is refused too. And the async API is simply unavailable
// in the cases a wedding site actually meets: an in-app webview (Instagram, WhatsApp), a non-secure
// origin, or a browser that has not granted clipboard-write.
// So: run the old synchronous copy first, and fire the modern one as well. They write the same
// string, so whichever lands, lands — and the feedback is true if EITHER of them reports success.
function copy(n) {
  clearTimeout(timer)
  const sync = execCopy(n)
  if (navigator.clipboard?.writeText) {
    try {
      navigator.clipboard.writeText(n).then(
        () => settle(n, true),
        () => { if (!sync) settle(n, false) }
      )
      if (!sync) return          // no verdict yet — let the promise answer
    } catch {
      /* fall through to the synchronous verdict */
    }
  }
  settle(n, sync)
}

function settle(n, ok) {
  clearTimeout(timer)
  copied.value = ok ? n : ''
  failed.value = ok ? '' : n
  said.value = ok ? `${n} copied` : 'Could not copy — press and hold the number to copy it'
  // Back to the resting label. ⚠️ Cleared on unmount: a timer writing into a dead ref is the
  // classic leak here.
  timer = setTimeout(() => { copied.value = ''; failed.value = ''; said.value = '' }, 2600)
}

// execCommand is deprecated and is still the only thing that works inside an in-app webview.
// ⚠️ A TEXTAREA IS SELECTED WITH `select()`, NEVER WITH A RANGE. Its value is not its DOM contents,
// so `range.selectNodeContents(textarea)` selects NOTHING — and because the range was then made the
// document selection, it also cleared whatever the textarea had. `execCommand('copy')` still
// returned **true**, so the first cut of this reported "copied" and copied nothing, which is worse
// than failing. Verified against a sentinel value on the real clipboard, not against that return.
// ⚠️ `setSelectionRange` after `select()` is the iOS half: Safari ignores `select()` on a readonly
// textarea. `readonly` itself stays, or iOS raises the keyboard over the page.
// ⚠️ Off-screen, not `display:none` and not `opacity:0` — there has to be something to select — and
// 16px, or iOS zooms the whole page as it focuses.
function execCopy(n) {
  const active = document.activeElement
  const ta = document.createElement('textarea')
  try {
    ta.value = n
    ta.setAttribute('readonly', '')
    ta.style.cssText =
      'position:fixed;top:0;left:-9999px;width:2em;height:2em;padding:0;border:0;' +
      'outline:0;box-shadow:none;background:transparent;font-size:16px;'
    document.body.appendChild(ta)
    ta.focus()
    ta.select()
    ta.setSelectionRange(0, n.length)
    return document.execCommand('copy')
  } catch {
    return false
  } finally {
    ta.remove()
    // Put focus back where the visitor left it, or the page scrolls to the top on some engines.
    if (active && active.focus) { try { active.focus() } catch { /* not focusable any more */ } }
  }
}

onBeforeUnmount(() => clearTimeout(timer))
</script>

<style scoped>
.accounts { color: inherit; }
.acc-list { list-style: none; margin: 0; padding: 0; }
.acc-hit {
  appearance: none;
  -webkit-appearance: none;
  border: 0;
  background: none;
  color: inherit;
  font: inherit;
  text-align: inherit;
  /* The site draws its own cursor; a native one would appear beside it. */
  cursor: none;
  -webkit-tap-highlight-color: transparent;
}
.acc-hit:focus-visible { outline: 1px solid currentColor; outline-offset: 3px; }
/* Held by the cursor. The row already carries the padding that makes it a target (44px floor,
   AUDIT #109), so filling it needs no layout at all — and an account number you are about to
   copy is exactly the thing that should light up under the pointer. */
.acc-hit.cursor-held {
  background: var(--accent, #2E4A52);
  color: var(--accentLight, #F6F3EC);
  border-radius: 0.55rem;
}
.digits {
  /* Tabular figures so the two numbers line up under each other, and enough tracking
     that a guest can read a digit at a time without losing their place. */
  font-variant-numeric: tabular-nums;
  letter-spacing: 0.12em;
}
.tick {
  display: inline-block;
  width: 0.62em;
  height: 0.32em;
  margin-inline-end: 0.5em;
  border-left: 1.5px solid currentColor;
  border-bottom: 1.5px solid currentColor;
  transform: rotate(-45deg) translateY(-0.12em);
}
.sr {
  position: absolute;
  width: 1px; height: 1px;
  overflow: hidden;
  clip-path: inset(50%);
  white-space: nowrap;
}

/* ── With Love's voice: ink on paper, the number given room ─────────────────
   No box and no rule around anything — the only line on the block is the hairline BETWEEN the two
   accounts, the same mark the signatures and the margin notes on this chapter are drawn with. */
.tone-page { font-family: 'Bague', sans-serif; }
.tone-page .acc-note {
  font-family: 'Over the Rainbow', cursive;
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
  gap: 1.4rem 2rem;
}
.tone-page .acc { display: flex; }
.tone-page .acc-hit {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.42rem;
  /* ⚠️ A REAL TARGET. The padding is the tap area: 44px is the floor anyone can hit on a phone
     without aiming, and the digits alone were half that. */
  padding: 0.9rem 1.4rem;
  text-transform: uppercase;
  font-size: clamp(0.62rem, 0.8vw, 0.72rem);
  letter-spacing: 0.18em;
}
/* The divider is on the SECOND account, drawn on its leading edge — so one account has no stray
   rule and three would each get one without another rule being written.
   ⚠️ AND IT NEEDS THE PADDING TO MATCH THE GAP, or the two accounts are not equidistant from it.
   A border sits ON the element's edge: the 2rem flex gap is all on the FIRST account's side, and the
   second account's box begins at the rule itself. Invisible while both are ink on paper — but the
   cursor morph fills the row it is holding (AUDIT #142), and the fill of the second account ran
   straight over the divider while the first stopped a clear 2rem short. User, 2026-09-21: *"hovering
   over the second account details overlays the divider … are they not spaced equidistant from the
   divider?"* They were not. Padding the second account by the same 2rem the gap gives the first puts
   the rule in the middle of the space, with 32px of air on each side of it — which is exactly what
   the stacked rule below already does with `padding-top` against its own 1.2rem gap. */
.tone-page .acc + .acc {
  border-inline-start: 1px solid currentColor;
  padding-inline-start: 2rem;
}
/* ⚠️ THESE TWO NAME WHICH ACCOUNT IS WHICH — the most consequential small type in the site, and
   they sat at 2.70:1 (AUDIT #107). 0.82 puts them over 4.5:1 on every chapter ground. */
.tone-page .acc-bank { opacity: 0.82; }
.tone-page .acc-name { opacity: 0.82; }
.tone-page .digits {
  font-size: clamp(1.12rem, 1.9vw, 1.4rem);
  letter-spacing: 0.16em;
  opacity: 0.95;
  border-bottom: 1px solid currentColor;
  padding-bottom: 0.3rem;
  transition: opacity 0.25s ease, border-color 0.25s ease;
}
.tone-page .acc-hit:hover .digits { opacity: 1; }
.tone-page .acc-state {
  display: inline-flex;
  align-items: center;
  font-size: 0.6rem;
  letter-spacing: 0.2em;
  opacity: 0.82;
  transition: opacity 0.2s ease;
}
/* ⚠️ THE FEEDBACK HAS TO BE SEEN. A 0.42-opacity label swapping one small-caps word for another is
   not an answer to "did that work?" — the whole row states it: the number goes solid, the rule
   under it fills in, and the line beneath becomes a ticked CO PIED at full strength. */
.tone-page .acc-hit.ok .digits { opacity: 1; border-bottom-width: 2px; }
.tone-page .acc-hit.ok .acc-state { opacity: 1; font-weight: 500; }
.tone-page .acc-hit.bad .acc-state { opacity: 0.9; }

/* ── the chrome's voice: quiet, one line each (kept for a footer that wants them again) ── */
.tone-footer {
  font-family: 'Bague', sans-serif;
  text-transform: uppercase;
  letter-spacing: 0.14em;
  font-size: 0.72rem;
  line-height: 1.9;
}
.tone-footer .acc-note { margin: 0 0 0.7rem; opacity: 0.45; letter-spacing: 0.18em; }
.tone-footer .acc-list { display: flex; flex-direction: column; gap: 0.2rem; align-items: center; }
.tone-footer .acc-hit {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  justify-content: center;
  gap: 0.1rem 0.7rem;
  padding: 0.5rem 0.8rem;
  opacity: 0.78;
}
.tone-footer .acc-hit:hover, .tone-footer .acc-hit.ok { opacity: 1; }
.tone-footer .acc-bank, .tone-footer .acc-name { opacity: 0.7; }
.tone-footer .digits { border-bottom: 1px solid currentColor; padding-bottom: 1px; }
.tone-footer .acc-state { font-size: 0.6rem; letter-spacing: 0.16em; opacity: 0.45; }
.tone-footer .acc-hit.ok .acc-state { opacity: 1; }

/* A phone has no room for two columns, and a vertical rule between stacked rows is just a stray
   mark — it becomes the gap it was standing in for. */
@media (max-width: 700px) {
  .tone-page .acc-list { flex-direction: column; gap: 1.2rem; }
  .tone-page .acc + .acc {
    border-inline-start: 0;
    /* ⚠️ …and the inline padding with it, or the second account sits 2rem in from the first. */
    padding-inline-start: 0;
    border-top: 1px solid color-mix(in srgb, currentColor 35%, transparent);
    padding-top: 1.2rem;
  }
}

@media (prefers-reduced-motion: reduce) {
  .digits, .acc-state { transition-duration: 0.01ms !important; }
}
</style>
