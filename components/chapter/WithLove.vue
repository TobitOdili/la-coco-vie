<template>
  <div ref="rootEl" class="album">
    <template v-for="(s, i) in sections" :key="i">
      <!-- ── Cover · the book, closed. Everything after this is a page of it. ── -->
      <section v-if="s.kind === 'cover'" class="chapter-section album-scene cover-scene" :data-idx="i">
        <div class="cover-card paste" data-window="0.02,0.30" data-rot="-1.1" data-depth="0.35">
          <span class="cover-lead">{{ s.lead }}</span>
          <h2 class="cover-title">{{ s.big }}</h2>
          <svg class="rule" viewBox="0 0 400 12" preserveAspectRatio="none" aria-hidden="true">
            <path class="scrub" data-window="0.18,0.44" pathLength="1" d="M 8 6 L 392 6"
              :stroke="ink" stroke-width="1.5" fill="none" stroke-linecap="round" />
          </svg>
          <p class="cover-sub">{{ s.sub }}</p>
        </div>
        <p class="cover-pivot fade" data-window="0.52,0.78">{{ s.pivot }}</p>
      </section>

      <!-- ── Spread · a page of the album; cut-outs paste themselves down. ── -->
      <section v-else-if="s.kind === 'spread'" class="chapter-section album-scene spread-scene" :data-idx="i">
        <div class="page">
          <!-- The thread's last form: the stitch binding the album, drawn top→bottom. -->
          <svg class="stitch drawdown" data-window="0.02,0.8" viewBox="0 0 6 200"
            preserveAspectRatio="none" aria-hidden="true">
            <path d="M 3 0 L 3 200" :stroke="ink" stroke-width="1.4" fill="none"
              stroke-dasharray="5 7" stroke-linecap="round" opacity="0.45" />
          </svg>

          <header class="page-head">
            <span class="page-no fade" data-window="0.02,0.16">{{ s.no }}</span>
            <h3 class="page-heading fade" data-window="0.04,0.2">{{ s.heading }}</h3>
            <p class="page-note fade" data-window="0.09,0.28">{{ s.note }}</p>
          </header>

          <div class="collage">
            <figure v-for="(it, j) in s.items" :key="j" class="item paste"
              :class="{ 'is-claimed': it.claimed }"
              :style="{ '--w': it.w + '%', '--rot': it.rot + 'deg' }"
              :data-window="itemWindow(j, s.items.length)"
              :data-rot="it.rot"
              :data-depth="0.3 + j * 0.22">
              <div class="lift">
                <img :src="it.image" :alt="it.name" loading="lazy" decoding="async" />
                <span class="tape" aria-hidden="true"></span>
                <span v-if="it.claimed" class="stamp" aria-hidden="true">taken</span>
              </div>
              <figcaption :aria-disabled="it.claimed ? 'true' : undefined">
                <span class="label">{{ it.name }}</span>
                <span class="cap">{{ it.caption }}</span>
                <span v-if="it.claimed" class="sr-taken">— already given, thank you</span>
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      <!-- ── Cash · the one call to action in the whole album. ── -->
      <section v-else-if="s.kind === 'cash'" class="chapter-section album-scene cash-scene" :data-idx="i">
        <div class="envelope paste" data-window="0.08,0.40" data-rot="-0.7" data-depth="0.3">
          <span class="flap" aria-hidden="true"></span>
          <h3 class="cash-heading">{{ s.heading }}</h3>
          <p class="cash-body">{{ s.body }}</p>
          <a class="cash-cta" :href="s.url">{{ s.cta }}</a>
          <p class="cash-note">{{ s.note }}</p>
        </div>
        <p class="cash-sign fade" data-window="0.56,0.8">{{ s.sign }}</p>
      </section>
    </template>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

defineProps({
  sections: { type: Array, required: true },
})

const ink = '#2E4A52'
const rootEl = ref(null)
let rafId = 0

// Each item gets its own slice of the scene so a spread pastes down in sequence
// rather than all at once.
function itemWindow(j, n) {
  const start = 0.16 + j * (0.42 / Math.max(1, n))
  return `${start.toFixed(3)},${(start + 0.3).toFixed(3)}`
}

// Gentle overshoot — the cut-out drops slightly past its resting angle and settles.
function easeOutBack(t) {
  const c1 = 1.0
  const c3 = c1 + 1
  return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2)
}

// Same rAF scrub engine as BigDay/InFrames — every animated element declares
// data-window="start,end" (its slice of the SCENE's 0→1 progress). Types:
//   .fade      opacity
//   .scrub     SVG stroke draw-on
//   .drawdown  clip reveal, top → bottom (the binding stitch)
//   .paste     the cut-out settling onto the page (+ depth parallax)
// Only transform/opacity are touched per frame; shadows are CSS (a per-frame
// drop-shadow recompute on a full-size PNG is what makes this kind of page crawl).
function tick() {
  const root = rootEl.value
  if (root) {
    const vh = window.innerHeight
    for (const scene of root.querySelectorAll('.album-scene')) {
      const r = scene.getBoundingClientRect()
      const p = Math.min(1, Math.max(0, (vh - r.top) / (r.height + vh)))
      for (const el of scene.querySelectorAll('.scrub, .fade, .drawdown, .paste')) {
        const [a, b] = el.dataset.window.split(',').map(Number)
        const lp = Math.min(1, Math.max(0, (p - a) / (b - a)))

        if (el.classList.contains('scrub')) {
          el.style.strokeDashoffset = String(1 - lp)
        } else if (el.classList.contains('drawdown')) {
          el.style.clipPath = `inset(0 0 ${((1 - lp) * 100).toFixed(1)}% 0)`
        } else if (el.classList.contains('paste')) {
          const e = easeOutBack(lp)
          const rot = Number(el.dataset.rot || 0)
          const depth = Number(el.dataset.depth || 0)
          const drift = (p - 0.5) * depth * 30      // parallax: pages breathe apart
          const y = (1 - e) * 26 + drift
          const scale = 1 + (1 - e) * 0.045
          const tilt = rot - (1 - e) * 4            // lands into its pasted angle
          el.style.transform = `translate3d(0, ${y.toFixed(2)}px, 0) rotate(${tilt.toFixed(2)}deg) scale(${scale.toFixed(3)})`
          el.style.opacity = String(Math.min(1, lp * 1.7))
        } else {
          el.style.opacity = String(lp)
        }
      }
    }
  }
  rafId = requestAnimationFrame(tick)
}

onMounted(() => { rafId = requestAnimationFrame(tick) })
onBeforeUnmount(() => cancelAnimationFrame(rafId))
</script>

<style scoped>
/* The chapter's cool blue is the SURFACE; the album pages are warm paper on top. */
.album {
  --paper: #f4efe5;
  --paper-edge: #e2d9c8;
  color: var(--accent, #2e4a52);
  background: var(--accentLight, #e8edf2);
}

.album-scene {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: clamp(4rem, 12vh, 9rem) 1.25rem;
  min-height: 100vh;
}

/* ── Cover ────────────────────────────────────────────────────────────────── */
.cover-card {
  background: var(--paper);
  border: 1px solid var(--paper-edge);
  outline: 1px solid var(--paper);
  outline-offset: -9px;
  padding: clamp(2.5rem, 7vw, 5rem) clamp(2rem, 8vw, 6rem);
  text-align: center;
  max-width: 44rem;
  box-shadow: 0 22px 40px -26px rgba(20, 24, 28, 0.5);
  will-change: transform, opacity;
}
.cover-lead {
  display: block;
  font-size: 0.78rem;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  opacity: 0.62;
}
.cover-title {
  font-family: 'Bague', sans-serif;
  text-transform: uppercase;
  letter-spacing: 0.16em;
  font-size: clamp(2.4rem, 8vw, 4.6rem);
  line-height: 1;
  margin: 0.7em 0 0.5em;
}
.rule { display: block; width: 100%; height: 12px; }
.rule .scrub { stroke-dasharray: 1; stroke-dashoffset: 1; }
.cover-sub {
  margin: 1.6rem auto 0;
  max-width: 26rem;
  font-size: 0.98rem;
  line-height: 1.65;
  opacity: 0.78;
}
.cover-pivot {
  margin-top: clamp(2.5rem, 7vh, 5rem);
  max-width: 34rem;
  text-align: center;
  font-size: 1.02rem;
  line-height: 1.7;
  opacity: 0;
}

/* ── A page of the album ──────────────────────────────────────────────────── */
.page {
  position: relative;
  width: min(72rem, 100%);
  background: var(--paper);
  border: 1px solid var(--paper-edge);
  padding: clamp(2.25rem, 5vw, 4rem) clamp(1.5rem, 5vw, 4.5rem) clamp(3rem, 7vw, 5rem);
  box-shadow: 0 26px 50px -34px rgba(20, 24, 28, 0.55);
}
.stitch {
  position: absolute;
  left: 14px;
  top: 8%;
  height: 84%;
  width: 6px;
}

.page-head { margin-bottom: clamp(2rem, 5vw, 3.25rem); padding-left: 1.5rem; }
.page-no {
  display: block;
  font-family: 'Bague', sans-serif;
  font-size: 0.74rem;
  letter-spacing: 0.34em;
  text-transform: uppercase;
  opacity: 0;
}
.page-heading {
  font-family: 'Bague', sans-serif;
  text-transform: uppercase;
  letter-spacing: 0.13em;
  font-size: clamp(1.5rem, 4.2vw, 2.4rem);
  margin: 0.45em 0 0.3em;
  opacity: 0;
}
.page-note {
  max-width: 32rem;
  font-size: 0.94rem;
  line-height: 1.65;
  opacity: 0;
}

/* ── The collage ──────────────────────────────────────────────────────────── */
.collage {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: center;
  gap: clamp(1.75rem, 4vw, 3.5rem) clamp(1.5rem, 3.5vw, 3rem);
}
.item {
  width: var(--w, 36%);
  min-width: 13rem;
  margin: 0;
  opacity: 0;
  will-change: transform, opacity;
}
.item:nth-child(even) { margin-top: clamp(1.5rem, 4vw, 3.25rem); }

.lift {
  position: relative;
  display: block;
  transition: transform 0.55s cubic-bezier(0.2, 0.7, 0.3, 1), filter 0.55s ease;
  filter: drop-shadow(0 10px 12px rgba(20, 24, 28, 0.22));
}
.item:hover .lift {
  transform: translateY(-9px) scale(1.055) rotate(calc(var(--rot, 0deg) * -1));
  filter: drop-shadow(0 24px 26px rgba(20, 24, 28, 0.28));
}
.lift img { display: block; width: 100%; height: auto; }

/* One strip of tape, never five. */
.tape {
  position: absolute;
  top: -0.55rem;
  left: 50%;
  width: clamp(2.6rem, 7%, 4.2rem);
  height: 1.15rem;
  transform: translateX(-50%) rotate(-4deg);
  background: rgba(255, 253, 245, 0.62);
  border-left: 1px solid rgba(20, 24, 28, 0.07);
  border-right: 1px solid rgba(20, 24, 28, 0.07);
  box-shadow: 0 1px 2px rgba(20, 24, 28, 0.09);
}

figcaption {
  display: block;
  margin-top: 1.1rem;
  padding-left: 0.15rem;
}
.label {
  display: block;
  font-family: 'Bague', sans-serif;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  font-size: 0.76rem;
}
.cap {
  display: block;
  margin-top: 0.4rem;
  font-size: 0.87rem;
  line-height: 1.55;
  opacity: 0.7;
}

/* Claimed — supported, unused until gifts are tracked. */
.is-claimed .lift { filter: grayscale(1) opacity(0.45) drop-shadow(0 6px 8px rgba(20, 24, 28, 0.16)); }
.is-claimed:hover .lift { transform: none; }
.is-claimed .label { text-decoration: line-through; opacity: 0.55; }
.is-claimed .cap { opacity: 0.42; }
.stamp {
  position: absolute;
  bottom: 12%;
  left: 50%;
  transform: translateX(-50%) rotate(-7deg);
  font-family: 'Bague', sans-serif;
  text-transform: uppercase;
  letter-spacing: 0.3em;
  font-size: 0.7rem;
  padding: 0.3rem 0.75rem;
  border: 1.5px solid currentColor;
  opacity: 0.62;
}
.sr-taken {
  position: absolute;
  width: 1px; height: 1px;
  overflow: hidden;
  clip-path: inset(50%);
}

/* ── The cash card ────────────────────────────────────────────────────────── */
.envelope {
  position: relative;
  background: var(--paper);
  border: 1px solid var(--paper-edge);
  padding: clamp(3rem, 7vw, 4.5rem) clamp(1.75rem, 6vw, 4rem) clamp(2.25rem, 5vw, 3rem);
  max-width: 34rem;
  text-align: center;
  box-shadow: 0 22px 42px -28px rgba(20, 24, 28, 0.5);
  will-change: transform, opacity;
}
/* the flap */
.flap {
  position: absolute;
  inset: 0 0 auto 0;
  height: 4.5rem;
  background: linear-gradient(to bottom, rgba(20, 24, 28, 0.045), rgba(20, 24, 28, 0));
  clip-path: polygon(0 0, 100% 0, 50% 100%);
  border-bottom: 1px solid var(--paper-edge);
}
.cash-heading {
  font-family: 'Bague', sans-serif;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  font-size: clamp(1.15rem, 3.4vw, 1.6rem);
  margin: 0 0 1rem;
}
.cash-body { font-size: 0.95rem; line-height: 1.7; opacity: 0.8; margin: 0 0 1.9rem; }
.cash-cta {
  display: inline-block;
  font-family: 'Bague', sans-serif;
  text-transform: uppercase;
  letter-spacing: 0.2em;
  font-size: 0.76rem;
  padding: 0.85rem 2rem;
  border: 1px solid currentColor;
  color: inherit;
  text-decoration: none;
  transition: background 0.4s ease, color 0.4s ease;
}
.cash-cta:hover { background: var(--accent, #2e4a52); color: var(--paper); }
.cash-note { margin: 1.4rem 0 0; font-size: 0.78rem; line-height: 1.6; opacity: 0.55; }
.cash-sign {
  margin-top: clamp(2.5rem, 6vh, 4rem);
  font-family: 'Bague', sans-serif;
  text-transform: uppercase;
  letter-spacing: 0.22em;
  font-size: 0.78rem;
  opacity: 0;
}

/* ── Portrait ─────────────────────────────────────────────────────────────── */
@media (max-width: 767px) {
  .item { width: 82% !important; min-width: 0; }
  .item:nth-child(even) { margin-top: 0; }
  .page { padding-left: 1.4rem; padding-right: 1.4rem; }
  .stitch { left: 6px; }
  .page-head { padding-left: 0.9rem; }
}

@media (prefers-reduced-motion: reduce) {
  .lift { transition: none; }
}
</style>
