<template>
  <div id="canvas-container">
    <canvas ref="canvasRef" id="webgl-canvas" />
    <!-- Interaction layer: sits above canvas but below nav (z-5), covers full viewport -->
    <div
      ref="hitLayerRef"
      id="canvas-hit-layer"
      @click="onHitClick"
    />
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useChapterScene, CHAPTERS } from '~/composables/useChapterScene'

const emit = defineEmits(['chapter-select', 'chapter-hover', 'chapter-unhover', 'progress', 'chapter-front'])

const canvasRef = ref(null)
const hitLayerRef = ref(null)
const scene = useChapterScene()
// Captured in setup (not in the async onMounted, where the Nuxt context is no longer
// guaranteed): the chapter the visitor LANDED on, if any.
const bootSlug = useRoute().params.slug

function onHitClick(e) {
  // Ignore the click a swipe leaves behind (see onTouchEnd) — otherwise rotating the
  // carousel on a phone would also select whatever card you scrolled past.
  if (performance.now() < suppressClickUntil) return
  scene.onClick(e)
}

// Wheel → carousel scroll. (The `virtualscroll` dep was dead: the installed package is an
// unrelated custom-scrollbar widget whose constructor threw on our config, so the code
// always fell back to this listener anyway. Removed the dead import.)
function onWheel(e) {
  scene.onScroll(e.deltaY - e.deltaX)
}

// Touch → carousel drag (mobile). The carousel used to be wheel-ONLY, so on a phone the ring
// simply didn't respond. Listeners live on the hit layer, so they're inert while a chapter page
// (z-10) covers it. `touch-action: none` on that layer stops the browser hijacking the gesture
// for scroll/zoom, which is why these can stay passive.
//
// ⚠️ THIS IS A DRAG, NOT A SCROLL — it goes through `scene.onDrag(px)`, which converts finger
// pixels to ring rotation 1:1 off the camera, NOT through `onScroll` with a tuned multiplier.
// The old handler mirrored the wheel's `deltaY - deltaX` mapping, which put the horizontal axis
// the wrong way round: the deck ran backwards under your thumb. A drag is direct manipulation
// and its only correct mapping is "the card under the finger stays under the finger".
//
// ⚠️ VERTICAL still mirrors the WHEEL, deliberately: a flick up on a phone should do what a
// wheel-down does on a laptop. Only the horizontal axis is direct manipulation, which is why
// the two terms below have opposite signs — that is not a bug to tidy up.
const TAP_SLOP = 12          // px of travel below which a touch still counts as a tap
let touchLastX = 0
let touchLastY = 0
let touchTravel = 0          // accumulated travel this gesture — distinguishes swipe from tap
let touchVel = 0             // last per-move delta — seeds the release momentum
let momentumRaf = null
let suppressClickUntil = 0
let touching = false
function onTouchStart(e) {
  const t = e.touches[0]
  if (!t) return
  cancelAnimationFrame(momentumRaf)   // a new touch overrides any coasting
  touchLastX = t.clientX
  touchLastY = t.clientY
  touchTravel = 0
  touchVel = 0
  touching = true
  scene.setDragging?.(true)           // the gesture owns the ring from here until the coast dies
}
function onTouchMove(e) {
  if (!touching) return
  const t = e.touches[0]
  if (!t) return
  const right = t.clientX - touchLastX   // finger to the RIGHT ⇒ positive
  const up = touchLastY - t.clientY      // finger UP ⇒ positive, the sense of wheel deltaY
  touchLastX = t.clientX
  touchLastY = t.clientY
  touchTravel += Math.abs(right) + Math.abs(up)
  const px = right - up
  touchVel = px
  scene.onDrag(px)
}
function onTouchEnd() {
  touching = false
  // Browsers synthesize a click after a touch even when it travelled — so a swipe would
  // otherwise ALSO select a card. Swallow the trailing click after a real drag.
  if (touchTravel > TAP_SLOP) suppressClickUntil = performance.now() + 400
  // Momentum. Without this the ring stops dead the instant the finger lifts, which reads as
  // "stuck" next to the desktop wheel (where a stream of events keeps it gliding).
  // ⚠️ The coast is also the DECELERATION. While the gesture owns the ring the render lerp is out
  // of the way, so this 0.94 decay is the only thing slowing the deck down — release `setDragging`
  // when it dies, not when the finger lifts, or the ring's speed drops off a cliff at touchend.
  cancelAnimationFrame(momentumRaf)
  if (Math.abs(touchVel) < 0.6) { scene.setDragging?.(false); return }
  const coast = () => {
    touchVel *= 0.94
    if (Math.abs(touchVel) < 0.05) { scene.setDragging?.(false); return }
    scene.onDrag(touchVel)
    momentumRaf = requestAnimationFrame(coast)
  }
  // ⚠️ Run the first step NOW, not on the next frame. Scheduling it with rAF leaves the frame
  // after touchend with no drag applied at all — measured as a single 0-rotation frame between a
  // 0.021 rad drag step and a 0.020 rad coast step, i.e. a visible hitch exactly at the moment
  // the finger lifts, which is the moment you are looking at the deck.
  coast()
}

onMounted(async () => {
  if (!canvasRef.value) return

  // Relay real asset-load progress to the loader (Issue #12).
  // Registered BEFORE init() so we catch every texture load.
  scene.onProgress((pct) => emit('progress', pct))

  // ⚠️ The URL we BOOTED on, read once. If it names a chapter, the scene skips the homepage
  // intro and arrives on that chapter instead (see runArrive) — a reload of an inner page
  // used to sit through the whole carousel assembly before selecting anything.
  await scene.init(canvasRef.value, {
    deepLinkIdx: bootSlug ? CHAPTERS.findIndex((c) => c.slug === bootSlug) : -1,
  })

  // Safety net: scene is fully ready — guarantee the loader can complete
  // even if the asset count drifts.
  emit('progress', 100)

  scene.onSelect((idx) => {
    emit('chapter-select', idx)
  })

  // Which card is currently front-facing → lets the explore cursor tint to it.
  scene.onFrontChapter((idx) => {
    emit('chapter-front', idx)
  })

  scene.onHover((idx, hovering) => {
    if (hovering) {
      emit('chapter-hover', idx)
    } else {
      emit('chapter-unhover', idx)
    }
  })

  // Mouse tracking on window (doesn't block events)
  window.addEventListener('mousemove', scene.onMouseMove)

  // Wheel drives the homepage carousel scroll.
  window.addEventListener('wheel', onWheel, { passive: true })

  // Touch drives it on mobile. Bound to the hit layer (not window) so a chapter page
  // covering it takes the gesture instead.
  const hit = hitLayerRef.value
  if (hit) {
    hit.addEventListener('touchstart', onTouchStart, { passive: true })
    hit.addEventListener('touchmove', onTouchMove, { passive: true })
    hit.addEventListener('touchend', onTouchEnd, { passive: true })
    hit.addEventListener('touchcancel', onTouchEnd, { passive: true })
  }

  // Resize — listen to both window resize and visualViewport resize (mobile)
  window.addEventListener('resize', handleResize)
  if (window.visualViewport) {
    window.visualViewport.addEventListener('resize', handleResize)
  }
})

function handleResize() {
  scene.onResize(window.innerWidth, window.innerHeight)
}

onUnmounted(() => {
  cancelAnimationFrame(momentumRaf)
  scene.setDragging?.(false)
  window.removeEventListener('mousemove', scene.onMouseMove)
  window.removeEventListener('wheel', onWheel)
  const hit = hitLayerRef.value
  if (hit) {
    hit.removeEventListener('touchstart', onTouchStart)
    hit.removeEventListener('touchmove', onTouchMove)
    hit.removeEventListener('touchend', onTouchEnd)
    hit.removeEventListener('touchcancel', onTouchEnd)
  }
  window.removeEventListener('resize', handleResize)
  if (window.visualViewport) {
    window.visualViewport.removeEventListener('resize', handleResize)
  }
  scene.destroy()
})

defineExpose({ scene })
</script>
