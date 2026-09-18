<template>
  <div v-if="visible" ref="overlayRef" class="loader-overlay">
    <span class="counter">
      <span class="num"><span
        v-for="(d, i) in digits"
        :key="i"
        class="glyph"
        :class="face[i]"
      >{{ d }}</span></span>
      <span class="pct glyph" :class="face[3]">%</span>
    </span>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'
import { gsap } from 'gsap'

// Real asset-load progress (0–100) driven by the scene (Issue #12).
const props = defineProps({
  progress: { type: Number, default: 0 },
})

const emit = defineEmits(['complete'])

const visible = ref(true)
const overlayRef = ref(null)
const displayPct = ref(0)
const digits = computed(() => String(displayPct.value).split(''))

// ── The count is set in three hands at once ───────────────────────────────────
// ⚠️ EVERY GLYPH IS ITS OWN SPAN because each one is re-cast in a different face every 100ms
// while the site loads — the 1, the 0s and the % are never reliably the same typeface twice,
// and the number you finally read is whichever hand each glyph happened to land in. It is the
// reference's own trick (user, 2026-09-18: "that fun font gets randomly assigned to the 1, or
// either of the 0's, or even the % sign … it's different every time"), and decoded from its
// bundle it is exactly this: four spans, a 100ms interval, and `gsap.utils.random(0, 2, 1)`
// picking a chapter's display class for each.
// ⚠️ THREE FACES, NOT FOUR. The reference's fourth chapter face is its body font (Bague) and
// its random(0,2,1) can never reach it — so the effect is always DISPLAY type, never body
// type dropped into a display size. Ours takes the same three, which happen to be the same
// three families: the serif, the cursive, and the one with the concentric strokes.
// ⚠️ NOT CAVEAT. `site.config.js` keeps one hand per page and forbids sharing them: Caveat is
// THE BIG DAY's marker and it does not appear anywhere else, chrome included.
const FACES = ['f-italiana', 'f-monoton', 'f-rainbow']
// The opening cast mirrors the reference's markup (serif, strokes, cursive, cursive) so the
// very first frame is already mixed, before the first shuffle lands.
const face = ref(['f-italiana', 'f-monoton', 'f-rainbow', 'f-rainbow'])
const pick = () => FACES[(Math.random() * FACES.length) | 0]
let shuffleTimer = null
function stopShuffle() {
  if (shuffleTimer) { clearInterval(shuffleTimer); shuffleTimer = null }
}

// GSAP tweens a private value toward the real progress so the counter eases
// smoothly instead of snapping with each asset load.
const counter = { val: 0 }
let exited = false
let safetyTimer = null

function playExit() {
  if (exited) return
  exited = true
  stopShuffle()
  if (safetyTimer) { clearTimeout(safetyTimer); safetyTimer = null }
  // GSAP fade-out exit (replaces the old CSS opacity transition).
  gsap.to(overlayRef.value, {
    opacity: 0,
    duration: 0.6,
    ease: 'power2.inOut',
    onComplete: () => {
      visible.value = false
      emit('complete')
    },
  })
}

watch(
  () => props.progress,
  (target) => {
    gsap.to(counter, {
      val: target,
      duration: 0.6,
      ease: 'power2.out',
      overwrite: true,
      onUpdate: () => {
        displayPct.value = Math.round(counter.val)
        // ⚠️ THE LAST READING IS FROZEN, and the reference freezes it too (it clears both of its
        // intervals at 99). The number a visitor actually reads — 100% — then holds still for
        // the second the overlay takes to fade, instead of flickering through three faces on
        // its way out. Stopping at 100 would be a beat too late: the tween lands there and the
        // fade starts in the same frame.
        if (displayPct.value >= 99) stopShuffle()
      },
      onComplete: () => {
        if (target >= 100) playExit()
      },
    })
  }
)

onMounted(() => {
  // ⚠️ Nothing re-casts itself for a visitor who asked for less motion — they get the opening
  // mix, held. The glyphs never change colour or brightness, so this is a preference, not a
  // flashing-content problem, but a number that rewrites itself ten times a second is motion.
  const still = typeof window !== 'undefined' && window.matchMedia
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
    : false
  if (!still) {
    shuffleTimer = setInterval(() => {
      face.value = [pick(), pick(), pick(), pick()]
    }, 100)
  }
  // Safety fallback: if real progress never reaches 100 (e.g. init throws or a
  // WebGL failure), force-complete after 12s so the loader can't hang forever.
  safetyTimer = setTimeout(() => {
    displayPct.value = 100
    playExit()
  }, 12000)
})

onUnmounted(() => {
  stopShuffle()
  if (safetyTimer) clearTimeout(safetyTimer)
})
</script>

<style scoped>
.loader-overlay {
  position: fixed;
  inset: 0;
  width: 100%;
  height: 100%;
  background: #fff;
  z-index: 40;
  /* Centered (matches the live original: justify-center items-center pb-[5vh]) */
  display: flex;
  justify-content: center;
  align-items: center;
  padding-bottom: 5vh;
  /* Subtle light-gray counter (original uses text-zinc-200) */
  color: #e4e4e7;
}

/* The number is the centered element; the % hangs off its right edge.
   .counter shrink-wraps to the number's width (the % is absolute / out of
   flow), so the digit count (1–3 chars) never shifts the % onto the number.
   ⚠️ And it absorbs the shuffle: the three faces set the same digit at three
   different widths, so the number's own width changes under the re-casting.
   Hanging the % off `left: 100%` keeps it against the last digit whatever
   happens, and centring `.counter` keeps the whole group still. */
.counter {
  position: relative;
  display: inline-block;
}

.num,
.pct {
  display: inline-block;
  line-height: 1em;
  color: #e4e4e7;
  font-size: 3.75rem;
}

@media (min-width: 1024px) {
  .num, .pct { font-size: 8rem; }
}

@media (min-width: 1280px) {
  .num, .pct { font-size: 150px; }
}

/* One glyph, one face — the class is re-picked from JS. */
.glyph { display: inline-block; line-height: 1em; }
.f-italiana { font-family: 'Italiana', serif; }
.f-monoton { font-family: 'Monoton', cursive; }
.f-rainbow { font-family: 'Over the Rainbow', cursive; }

/* Percent — sits just to the right of the number (matches the original's
   asymmetric typography); its face is shuffled with the digits. */
.pct {
  position: absolute;
  left: 100%;
  top: 0;
  margin-left: 0.08em;
  white-space: nowrap;
}
</style>
