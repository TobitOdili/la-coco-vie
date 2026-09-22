<template>
  <div
    ref="cursorRef"
    class="cursor"
    :class="[{ active: isActive || parkedVisible || confirming, parked: isTouch, ready: parkedVisible, confirming, morphed }, morphStyle]"
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
  accent: { type: String, default: '#42221A' },
  // True once the intro has settled and the front chapter is known — gates the parked button
  // so it can't appear mid-spin or flash a placeholder colour.
  exploreReady: { type: Boolean, default: false },
})
const emit = defineEmits(['explore'])

const cursorRef = ref(null)
const isActive = ref(false)
// Set the moment a card is chosen, cleared once the destination page is up. While it is
// set the circle stays expanded and lit, so the tap is acknowledged for the whole wait.
const confirming = ref(false)
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
let moveEvent = 'pointermove'

// ── The morph: over a control, the circle becomes that control's shape ───────────────────────
// The reference does this on its inner pages and it is the whole hover language there — the
// cursor stops being a dot near the button and becomes the button's own outline while the button
// changes colour under it. User, 2026-09-21: "the cursor morph to take the shape of the buttons
// while they change color."
//
// ⚠️ IT OUTLINES THE CONTROL, IT DOES NOT FILL IT, and that is a constraint rather than a taste:
// this element is a child of .app-root at z-index 100 and the chapter page is a sibling at 10, so
// nothing inside the page can ever be painted above it. A filled morph would bury the label of
// the very button it is advertising. The colour change belongs to the button (.cursor-held).
const morphed = ref(false)
// ⚠️ A CONTROL CAN ASK FOR ITS OWN MARK. `data-cursor-style="pill"` puts `morph-pill` on the
// cursor, and the stylesheet decides what that looks like — the plain ring is only the default.
// The nav uses it. (A `laurel` style once flanked the wordmark with the couple's wreath; it was
// built, seen and rejected on 2026-09-22 — the mechanism stays, that mark does not.)
const morphStyle = ref('')
let morphEl = null          // the element being shadowed, or null
let morphPad = 6            // px the ring sits outside it — data-cursor-pad overrides
let morphPadX = 6           // …and data-cursor-pad-x, when a mark needs more air sideways than above
let morphArrived = false    // has the glide finished? once true the ring is glued, not chased

function morphTo(el) {
  if (isTouch.value || !el || el === morphEl) return
  morphEl = el
  morphPad = Number(el.dataset.cursorPad) || 6
  morphPadX = Number(el.dataset.cursorPadX) || morphPad
  morphStyle.value = el.dataset.cursorStyle ? 'morph-' + el.dataset.cursorStyle : ''
  morphArrived = false
  morphed.value = true
  // ⚠️ READ ONCE, NOT PER FRAME. getComputedStyle forces style resolution; the rect below is
  // re-read every frame because it moves, but a button's corner radius does not.
  const n = cursorRef.value
  if (n) {
    const raw = getComputedStyle(el).borderTopLeftRadius
    // A ring outside a rounded box needs the pad added to its radius to stay concentric. A
    // percentage radius is already relative to the ring's own box, so it passes straight through;
    // an absurd pill radius is clamped to half the box by the browser, not by us.
    // ⚠️ A PAD MAY BE NEGATIVE, so clamp. The nav's items are 4rem tall boxes around a 14px word;
    // a ring on their full height is a rectangle of empty space, so they pull it IN to the type.
    n.style.setProperty('--morphRadius', raw.includes('%') ? raw : Math.max(0, (parseFloat(raw) || 0) + morphPad) + 'px')
  }
}

function unmorph() {
  morphEl = null
  morphArrived = false
  if (!morphed.value) return
  morphed.value = false
  morphStyle.value = ''
  const n = cursorRef.value
  if (n) { n.style.width = ''; n.style.height = ''; n.style.removeProperty('--morphRadius') }
}

function lerp(a, b, t) {
  return a + (b - a) * t
}

// ⚠️ ONLY A REAL POINTER MAY UN-PARK THE CIRCLE — AND `mousemove` CANNOT TELL YOU THAT. A tap
// on a phone makes the browser synthesize a mousemove at the touch point for compatibility, so
// every tap on a card looked like a mouse arriving: `parked` came off mid-tap, which stopped the
// `.parked.confirming` rule that is supposed to retire the EXPLORE button from applying, and the
// same element then lerped in from its off-screen start to land under the finger. User,
// 2026-09-21: "tapping on a card on mobile causes the initial explore circle to disappear and
// another to materialize/animate into where I tapped — that breaks immersion." It read as two
// circles because it moved like two. `pointermove` carries `pointerType`, which is the only
// thing that actually answers the question; the mousemove path below is the fallback for a
// browser without PointerEvent, where `pointerType` is undefined and the guard lets it through.
function onPointerMove(e) {
  if (e.pointerType && e.pointerType !== 'mouse' && e.pointerType !== 'pen') return
  // A real pointer showed up (e.g. a hybrid device) — resume following it. Start it where the
  // pointer IS: lerping from the off-screen start is the same fly-in this just stopped being.
  if (isTouch.value) { currentX = e.clientX; currentY = e.clientY }
  isTouch.value = false
  targetX = e.clientX
  targetY = e.clientY
}

function onExploreTap() {
  // Only meaningful once parked + revealed; on desktop the circle is pointer-events:none.
  if (parkedVisible.value) emit('explore')
}

function loop() {
  // A control can leave under a held morph — a panel closes, the route changes — and a ring
  // locked to a detached node would hang in the frame forever.
  if (morphEl && !morphEl.isConnected) unmorph()

  if (!isTouch.value) {
    if (morphEl) {
      // ⚠️ RE-READ EVERY FRAME. The chapter pages scroll under Lenis, which MOVES the button;
      // a rect captured at hover time would leave the ring behind within one flick.
      const r = morphEl.getBoundingClientRect()
      targetX = r.left + r.width / 2
      targetY = r.top + r.height / 2
      if (cursorRef.value) {
        cursorRef.value.style.width = (r.width + morphPadX * 2) + 'px'
        cursorRef.value.style.height = (r.height + morphPad * 2) + 'px'
      }
    }

    // ⚠️ GLIDE IN, THEN STICK. The same 0.2 lerp that gives the circle its weight leaves a
    // morphed ring trailing its button by ~30px down a fast scroll, which reads as the ring
    // having come loose. Chase until it arrives, then follow exactly.
    if (morphArrived) {
      currentX = targetX
      currentY = targetY
    } else {
      currentX = lerp(currentX, targetX, 0.2)
      currentY = lerp(currentY, targetY, 0.2)
      if (morphEl && Math.abs(currentX - targetX) < 1.5 && Math.abs(currentY - targetY) < 1.5) morphArrived = true
    }

    if (cursorRef.value) {
      // Centre cursor on pointer by offsetting half its current rendered size.
      // Original EO.update() uses hardcoded -12 (half of 24px rest size).
      // We read actual size so it stays centred during the active expand animation too —
      // and both axes, because a morphed ring is no longer square.
      const halfW = cursorRef.value.offsetWidth / 2
      const halfH = cursorRef.value.offsetHeight / 2
      cursorRef.value.style.top = (currentY - halfH) + 'px'
      cursorRef.value.style.left = (currentX - halfW) + 'px'
    }
  }

  rafId = requestAnimationFrame(loop)
}

function activate() {
  isActive.value = true
}

function deactivate() {
  // A confirmed tap owns the circle until the page lands — an unhover fired by the
  // select animation must not shrink it back to the dot mid-transition.
  if (confirming.value) return
  isActive.value = false
}

function confirm() { confirming.value = true }
function endConfirm() { confirming.value = false }

onMounted(() => {
  isTouch.value =
    typeof window !== 'undefined' &&
    (navigator.maxTouchPoints > 0 || 'ontouchstart' in window) &&
    !window.matchMedia('(pointer: fine)').matches
  moveEvent = typeof window.PointerEvent === 'function' ? 'pointermove' : 'mousemove'
  window.addEventListener(moveEvent, onPointerMove)
  loop()
})

onUnmounted(() => {
  window.removeEventListener(moveEvent, onPointerMove)
  cancelAnimationFrame(rafId)
})

defineExpose({ activate, deactivate, confirm, endConfirm, morphTo, unmorph })
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
/* ⚠️ GONE ONCE TAPPED. `confirming` used to only light the circle and hold it expanded until
   the destination page was up — on touch that parked a big EXPLORE blob over the chapter you
   had just opened, for the whole transition. It acknowledges the tap (the 0.18s squeeze and
   brighten in main.css) and then leaves. Must come AFTER `.ready`: same specificity, so order
   is what decides. */
.cursor.parked.confirming {
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.3s ease 0.08s;
}
/* ⚠️ SIZED TO THE SCREEN, not to the 104px the pointer version uses. On a 390px phone that is
   27% of the width sitting over the deck; and one fixed size across a 320 and a 430 screen is
   proportionally a different button on each. The label has to come with it — 14px inside a
   68px circle runs edge to edge. Touch only: `.parked` is set only when there is no pointer. */
.cursor.parked.active {
  width: clamp(4.25rem, 20vw, 6rem);
  height: clamp(4.25rem, 20vw, 6rem);
}
.cursor.parked .explore {
  font-size: clamp(9px, 2.6vw, 13px);
  letter-spacing: 0.04em;
}
</style>
