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

// Touch → carousel scroll (mobile). The carousel used to be wheel-ONLY, so on a phone the
// ring simply didn't respond. Mirrors the wheel mapping (deltaY - deltaX) using per-move
// finger deltas, scaled up so a comfortable swipe turns a meaningful arc (cards sit 45°
// apart; ~300px of swipe ≈ 34°). Listeners live on the hit layer, so they're inert while a
// chapter page (z-10) covers it. `touch-action: none` on that layer stops the browser
// hijacking the gesture for scroll/zoom, which is why these can stay passive.
const TOUCH_SCALE = 2.5
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
}
function onTouchMove(e) {
  if (!touching) return
  const t = e.touches[0]
  if (!t) return
  const dy = touchLastY - t.clientY   // finger up ⇒ positive, same sense as wheel deltaY
  const dx = touchLastX - t.clientX
  touchLastX = t.clientX
  touchLastY = t.clientY
  touchTravel += Math.abs(dy) + Math.abs(dx)
  const delta = (dy - dx) * TOUCH_SCALE
  touchVel = delta
  scene.onScroll(delta)
}
function onTouchEnd() {
  touching = false
  // Browsers synthesize a click after a touch even when it travelled — so a swipe would
  // otherwise ALSO select a card. Swallow the trailing click after a real drag.
  if (touchTravel > TAP_SLOP) suppressClickUntil = performance.now() + 400
  // Momentum. Without this the ring stops dead the instant the finger lifts, which reads as
  // "stuck" next to the desktop wheel (where a stream of events keeps it gliding).
  cancelAnimationFrame(momentumRaf)
  if (Math.abs(touchVel) < 0.6) return
  const coast = () => {
    touchVel *= 0.94
    if (Math.abs(touchVel) < 0.05) return
    scene.onScroll(touchVel)
    momentumRaf = requestAnimationFrame(coast)
  }
  momentumRaf = requestAnimationFrame(coast)
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
