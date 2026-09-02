<template>
  <div ref="rootEl" class="us-story">
    <section
      v-for="(scene, i) in scenes"
      :key="i"
      :ref="setSceneRef"
      class="chapter-section us-scene"
      :class="[`align-${scene.align || 'left'}`, { 'in-view': inView[i] }]"
      :data-idx="i"
    >
      <!-- Oversized faint numeral. In the hand too — nothing on this page is set in type. -->
      <div class="watermark" aria-hidden="true">{{ scene.num }}</div>

      <!-- The "stitch": a date-line that draws itself across as the scene arrives. -->
      <div class="stitch">
        <span class="stitch-label" data-unit>
          <template v-for="(w, k) in scene.dateW" :key="k"
            ><span class="w write" :data-window="w.win">{{ w.t }}</span>{{ ' ' }}</template
          >
        </span>
        <span class="stitch-line" aria-hidden="true" />
        <span class="stitch-dot" aria-hidden="true">·</span>
      </div>

      <div class="scene-grid">
        <!-- One taped polaroid per scene — settles straight(er) as it reveals. -->
        <figure v-if="scene.images?.[0]" class="polaroid">
          <span class="tape" aria-hidden="true" />
          <img :src="scene.images[0]" :alt="scene.caption || scene.title" loading="lazy" />
          <figcaption data-unit>
            <template v-for="(w, k) in scene.capW" :key="k"
              ><span class="w write" :data-window="w.win">{{ w.t }}</span>{{ ' ' }}</template
            >
          </figcaption>
        </figure>

        <div class="prose" data-unit>
          <h2 class="heading">
            <template v-for="(w, k) in scene.headW" :key="k"
              ><span class="w write" :data-window="w.win">{{ w.t }}</span>{{ ' ' }}</template
            >
          </h2>
          <p class="body">
            <template v-for="(w, k) in scene.bodyW" :key="k"
              ><span class="w write" :data-window="w.win">{{ w.t }}</span>{{ ' ' }}</template
            >
          </p>

          <!-- The two voices, arguing in the margins. -->
          <div class="notes">
            <div
              v-for="(n, j) in scene.notesW"
              :key="j"
              class="note"
              :class="`voice-${n.voice}`"
            >
              <template v-for="(w, k) in n.w" :key="k"
                ><span class="w write" :data-window="w.win">{{ w.t }}</span>{{ ' ' }}</template
              >
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'

const props = defineProps({
  sections: { type: Array, required: true },
})

// ── the hand ────────────────────────────────────────────────────────────────
// Every string on this page is WRITTEN, not faded in: each word is clipped from
// the right and un-clipped left-to-right off the scroll position, in sequence,
// so the line appears the way a pen lays it down. Same `.write` primitive
// WithLove uses; the only new part is that the windows are DERIVED from the word
// count instead of authored, so any copy length writes itself correctly (rule
// #4 — measure, don't author).
//
// ⚠️ OVER is what stops it reading as a stutter. A word takes OVER slots to
// complete but starts one slot after the last, so several are always mid-stroke
// — a hand moving, not a row of words switching on one at a time. At 1 it is a
// telegraph; much past 3 the words all finish together and the sequence is lost.
const OVER = 2.4

function words(text, a, b) {
  const list = String(text || '').split(/\s+/).filter(Boolean)
  const n = list.length
  if (!n) return []
  // Solve the slot so the LAST word finishes exactly at b, overlap included.
  const slot = (b - a) / (n - 1 + OVER)
  return list.map((t, k) => {
    const s = a + k * slot
    return { t, win: `${s.toFixed(4)},${(s + OVER * slot).toFixed(4)}` }
  })
}

// Where each part of a scene gets written — but note these are fractions of a
// WRITING UNIT (the elements carrying `data-unit`: the date line, the caption,
// and the prose block), not of the section.
//
// ⚠️ They used to be fractions of the SECTION, and that was wrong in a way only
// a phone showed. Desktop puts the polaroid beside the prose, so the prose sits
// mid-section; mobile stacks them, so the same prose sits near the BOTTOM of a
// much taller section. Identical section fractions therefore pointed at two
// completely different screen positions, and on mobile the body wrote itself
// below the fold. A unit that measures its OWN rect is right at every breakpoint
// without a single media query (rule #4 — measure, don't author).
const W = {
  head: [0, 0.30],
  body: [0.28, 0.74],
  note: [0.72, 0.88],   // +0.09 per voice, so he writes and then she answers
  full: [0, 1],         // the date line and the caption are a unit each
}

// A unit writes between two screen positions: it starts as its top clears the
// bottom edge and finishes with the whole unit comfortably in the reading band.
// ⚠️ The end is pulled UP for a tall unit (`vh − height − margin`) — otherwise a
// long block "finishes" while its last lines are still below the fold, which is
// exactly what the phone was doing.
const START_Y = 0.92
const END_Y = 0.30
const TAIL = 0.06

function unitProgress(r, vh) {
  const startY = START_Y * vh
  const endY = Math.max(TAIL * vh, Math.min(END_Y * vh, vh - r.height - TAIL * vh))
  return Math.min(1, Math.max(0, (startY - r.top) / Math.max(1, startY - endY)))
}

const scenes = computed(() =>
  props.sections.map((s) => ({
    ...s,
    dateW: words(s.date, ...W.full),
    capW: words(s.caption, ...W.full),
    headW: words(s.title, ...W.head),
    bodyW: words(s.body, ...W.body),
    notesW: (s.notes || []).map((n, j) => ({
      ...n,
      w: words(n.text, W.note[0] + j * 0.09, W.note[1] + j * 0.09),
    })),
  }))
)

// ── the loop ────────────────────────────────────────────────────────────────
// ⚠️ Queries the DOM inside tick() rather than holding refs: a template ref used
// inside v-for is an ARRAY, and reading `.style` off it throws on frame 1 and
// kills the whole loop silently (rule #2, AUDIT #18).
const rootEl = ref(null)
let rafId = 0

function tick() {
  const root = rootEl.value
  if (root) {
    const vh = window.innerHeight
    for (const unit of root.querySelectorAll('[data-unit]')) {
      const q = unitProgress(unit.getBoundingClientRect(), vh)
      for (const el of unit.querySelectorAll('.write')) {
        const win = el.dataset.window
        if (!win) continue
        const [a, b] = win.split(',').map(Number)
        const lp = Math.min(1, Math.max(0, (q - a) / (b - a)))
        // Most words are parked at 0 or 1 on any given frame; only the two or
        // three mid-stroke ones have actually changed. Writing all of them every
        // frame is ~116 style invalidations for no visible difference.
        const v = lp.toFixed(3)
        if (el.dataset.lp === v) continue
        el.dataset.lp = v
        el.style.clipPath = `inset(-0.25em ${((1 - lp) * 100).toFixed(2)}% -0.35em 0)`
      }
    }
  }
  rafId = requestAnimationFrame(tick)
}

// The polaroid keeps the latch. It is a physical object being set down, not a
// sentence — scrubbing its tilt would make it wobble every time you scrolled.
const sceneEls = []
const setSceneRef = (el) => { if (el) sceneEls.push(el) }
const inView = ref({})
let observer = null

onMounted(() => {
  observer = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (e.isIntersecting) {
          inView.value[+e.target.dataset.idx] = true
          observer.unobserve(e.target)
        }
      }
    },
    { threshold: 0.18 }
  )
  sceneEls.forEach((el) => observer.observe(el))
  rafId = requestAnimationFrame(tick)
})
onBeforeUnmount(() => {
  observer?.disconnect()
  cancelAnimationFrame(rafId)
})
</script>

<style scoped>
.us-scene {
  position: relative;
  min-height: 100dvh;
  box-sizing: border-box;
  padding: 16vh 7vw 12vh;
  color: var(--accent, #42221A);
  overflow: hidden;
}

/* ── a written word ──
   Each word is its own inline-block so it can be clipped independently. The
   space between them is a REAL text node in the template (`{{ ' ' }}`), not a
   margin — without it there is no soft-wrap opportunity between inline-blocks
   and a long line simply overflows instead of wrapping.
   The clip is inset vertically by a negative amount so a script hand's loops
   and descenders are never shaved off. */
.w {
  display: inline-block;
  clip-path: inset(-0.25em 100% -0.35em 0);
}

/* ── watermark numeral ── */
.watermark {
  position: absolute;
  top: 5vh;
  inset-inline-start: 5vw;
  font-family: 'Over the Rainbow', cursive;
  font-size: 30vh;
  line-height: 0.8;
  opacity: 0.07;
  pointer-events: none;
  user-select: none;
}
.align-right .watermark { inset-inline-start: auto; inset-inline-end: 5vw; }

/* ── the stitch (date-line) ── */
.stitch {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 7vh;
}
.stitch-label {
  font-family: 'Over the Rainbow', cursive;
  font-size: clamp(1rem, 1.5vw, 1.25rem);
  letter-spacing: 0.02em;
  white-space: nowrap;
  opacity: 0.75;
}
.stitch-line {
  display: block;
  height: 1px;
  background: currentColor;
  opacity: 0.45;
  width: 0;
  transition: width 1.4s cubic-bezier(0.22, 1, 0.36, 1) 0.2s;
}
.in-view .stitch-line { width: min(34vw, 22rem); }
.stitch-dot { opacity: 0.45; }

/* ── scene layout ── */
.scene-grid {
  display: flex;
  align-items: center;
  gap: 6vw;
}
.align-right .scene-grid { flex-direction: row-reverse; }

/* ── the taped polaroid ── */
.polaroid {
  flex: 0 0 auto;
  position: relative;
  margin: 0;
  background: #fffdf9;
  padding: 14px 14px 3.4rem;
  box-shadow: 0 18px 44px rgba(0, 0, 0, 0.16);
  transform: rotate(-6.5deg) translateY(30px);
  opacity: 0;
  transition: transform 1.2s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.9s ease;
}
.in-view .polaroid { transform: rotate(-3.5deg) translateY(0); opacity: 1; }
.align-right .polaroid { transform: rotate(6.5deg) translateY(30px); }
.align-right.in-view .polaroid { transform: rotate(3.5deg) translateY(0); }
.polaroid img {
  display: block;
  width: min(30vw, 24rem);
  aspect-ratio: 4 / 5;
  object-fit: cover;
}
.polaroid figcaption {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 1rem;
  text-align: center;
  font-family: 'Over the Rainbow', cursive;
  font-size: 1.05rem;
  color: var(--accent, #42221A);
  opacity: 0.85;
}
.tape {
  position: absolute;
  top: -14px;
  left: 50%;
  width: 7rem;
  height: 1.9rem;
  background: var(--accentLighter, #D2C3AE);
  opacity: 0.75;
  transform: translateX(-50%) rotate(-2deg);
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.08);
}

/* ── the prose + margin notes ── */
.prose {
  flex: 1 1 auto;
  max-width: 34rem;
  position: relative;
}

/* ⚠️ A script hand needs room the old sans did not. Over the Rainbow carries
   tall loops and deep descenders, so the heading's 0.92 line-height (fine for
   Bague) collided lines into each other; and at the sans's own size the body
   was thin and hard to read, hence the step up in size and leading. */
.heading {
  font-family: 'Over the Rainbow', cursive;
  font-weight: 400;
  font-size: clamp(2.2rem, 5vw, 4.25rem);
  line-height: 1.18;
  letter-spacing: 0.005em;
  margin: 0 0 1.75rem;
}
.body {
  font-family: 'Over the Rainbow', cursive;
  font-size: clamp(1.2rem, 1.75vw, 1.5rem);
  line-height: 1.85;
  opacity: 0.9;
  margin: 0;
}

.notes {
  margin-top: 2.75rem;
  display: flex;
  flex-direction: column;
  gap: 1.1rem;
}
.note {
  font-family: 'Over the Rainbow', cursive;
  font-size: clamp(1.15rem, 1.9vw, 1.55rem);
  line-height: 1.5;
  opacity: 0.95;
}
.note.voice-c {
  align-self: flex-start;
  transform: rotate(-2deg);
}
.note.voice-u {
  align-self: flex-end;
  text-align: right;
  transform: rotate(1.5deg);
  color: color-mix(in srgb, var(--accent, #42221A) 72%, var(--accentLight, #F2EEE8));
}

/* ── mobile: stack, keep the tilt ── */
@media (max-width: 768px) {
  .us-scene { padding: 12vh 8vw 10vh; }
  .scene-grid,
  .align-right .scene-grid { flex-direction: column; align-items: stretch; gap: 3.5rem; }
  .polaroid { align-self: center; }
  .polaroid img { width: min(72vw, 20rem); }
  .stitch { margin-bottom: 5vh; }
  .heading { font-size: clamp(2.1rem, 11vw, 3.4rem); }
  .body { font-size: 1.25rem; line-height: 1.8; }
}
</style>
