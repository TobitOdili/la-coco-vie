<template>
  <div ref="rootEl" class="with-love">
    <template v-for="(s, i) in sections" :key="i">
      <!-- ── Opening · the ink writes the thank-you, before anything is asked. ── -->
      <section v-if="s.kind === 'open'" class="chapter-section love-scene open-scene" :data-idx="i">
        <div class="lead fade" data-window="0.13,0.25">{{ s.lead }}</div>
        <div class="big-thanks write" data-window="0.08,0.34">{{ s.big }}</div>
        <svg class="flourish" viewBox="0 0 600 60" preserveAspectRatio="none" aria-hidden="true">
          <path class="scrub" data-window="0.30,0.42" pathLength="1"
            d="M 20 34 C 160 12, 300 12, 430 30 C 500 40, 560 34, 585 22"
            :stroke="ink" stroke-width="3" fill="none" stroke-linecap="round" />
        </svg>
        <div class="sub fade" data-window="0.38,0.50">{{ s.sub }}</div>
        <div class="pivot fade" data-window="0.52,0.64">{{ s.pivot }}</div>
      </section>

      <!-- ── Gifts · the names ARE the page. Five bands of the gift list running
           across the screen at their own speeds, forever; point at a word and its
           band eases to a stop and the thing opens underneath it. No illustration
           to keep current — adding a gift is adding a word. ── -->
      <section v-else-if="s.kind === 'gifts'" class="chapter-section love-scene wall"
        :class="{ busy: active.some((a) => a >= 0), touch }"
        :data-idx="i" :style="{ '--rows': bands.length }">
        <!-- ⚠️ ABOVE the bands, not over them. The wall runs edge to edge and a title laid on top of
             it would be competing with moving type for the same pixels; on its own line it reads as
             what it is — the heading of a list. In the couple's hand, like the thank-you and the
             two signatures. -->
        <h2 v-if="s.title" class="wall-title fade" data-window="0.02,0.16">{{ s.title }}</h2>
        <div v-for="(band, r) in bands" :key="r" class="band"
          :class="{ solid: r % 2 === 1, on: active[r] >= 0 }"
          :style="{ '--fs': mo[r]?.fs || 1 }" @pointerleave="clearBand(r)">
          <div class="track">
            <!-- ⚠️ The list is repeated until it is wider than the viewport PLUS one
                 whole repetition, because the wrap subtracts exactly one repetition's
                 width — anything less and a gap crosses the screen once per loop. -->
            <span v-for="c in (copies[r] || 3)" :key="c" class="grp">
              <!-- ⚠️ THE NAME IS THE LINK. It used to be a button whose panel carried a separate
                   "see it ↗", which puts the thing you want two moves away from the thing you are
                   already pointing at. `<a>` when the item has a page, `<button>` when it does not
                   — three of the ten have no indexed product URL, and a link that goes nowhere is
                   worse than no link. -->
              <component :is="items[w.i]?.url ? 'a' : 'button'" v-for="(w, k) in band" :key="k"
                class="word" :class="{ taken: w.claimed, link: !!items[w.i]?.url }" :data-i="w.i"
                :href="items[w.i]?.url || undefined"
                :target="items[w.i]?.url ? '_blank' : undefined"
                :rel="items[w.i]?.url ? 'noopener noreferrer' : undefined"
                :type="items[w.i]?.url ? undefined : 'button'"
                @pointerenter="setBand(r, w.i, $event)" @focus="setBand(r, w.i, $event)">
                {{ w.name }}<i class="sep" aria-hidden="true" />
              </component>
            </span>
          </div>
          <!-- ── the annotation ──────────────────────────────────────────────────────────────
               Opens beneath whichever word you are on and TRACKS it while the band coasts to a
               halt, so it never appears to jump into place. ⚠️ NOT A CARD. This was a cream box
               with a drop shadow — a UI popover on a chapter that is otherwise ink on paper, and
               it read as something bolted on. It is a margin note now: a hairline drawn from the
               word down to the couple's own hand, with the specifics under it in small caps.
               The paper behind it just thickens (see `.reveal::before`) — no border, no corner,
               no shadow. -->
          <div class="reveal" :class="{ open: active[r] >= 0 }">
            <svg class="reveal-tie" viewBox="0 0 90 26" preserveAspectRatio="none" aria-hidden="true">
              <path pathLength="1" d="M 3 1 C 3 12, 8 19, 24 23 C 42 26, 62 25, 86 22"
                fill="none" :stroke="ink" stroke-width="1.2" stroke-linecap="round"
                vector-effect="non-scaling-stroke" />
            </svg>
            <!-- ⚠️ Only when there IS one. Bound to a null `src` the browser renders a
                 broken-image box, which is a worse placeholder than no placeholder. -->
            <img v-if="itemAt(active[r])?.image" class="reveal-shot"
              :src="itemAt(active[r]).image" alt="" aria-hidden="true" decoding="async" />
            <p v-if="itemAt(active[r])?.product" class="reveal-spec">
              <span class="spec-what">{{ itemAt(active[r]).product }}</span>
              <span v-if="itemAt(active[r])?.price" class="spec-price">{{ itemAt(active[r]).price }}</span>
            </p>
            <!-- The second way to give this particular gift. ⚠️ A LINK ONLY IF IT GOES SOMEWHERE:
                 the per-item payment links do not exist yet, so until one does this is the offer
                 written down, not a button that lands nowhere. -->
            <a v-if="itemAt(active[r])?.cashUrl" class="reveal-cash" :href="itemAt(active[r]).cashUrl"
              target="_blank" rel="noopener noreferrer" @pointerdown.stop>or send the cash instead ↗</a>
            <span v-else class="reveal-cash is-pending">or send the cash instead</span>
          </div>
        </div>
      </section>

      <!-- ── Even better · a section, and a shortcut to it ──────────────────────────────────────
           ⚠️ A SECTION IN THE FLOW, set the way the popup is set — ink on paper, centred, no box of
           its own. It was a fixed card that grew into a bigger card, and then a popup that opened
           ITSELF as you scrolled past the gifts; both were an overlay arriving uninvited over a page
           the reader was in the middle of. You scroll into this one and out of it like everything
           else on the chapter, and nothing is ever covered.
           The little fixed card survives as a shortcut from anywhere else on the page — it opens the
           same words as a popup on a tap — and stands down while its own section is on screen, which
           is the one place it would be repeating itself. ── -->
      <template v-else-if="s.kind === 'cashPanel'">
        <section class="chapter-section love-scene cash-scene" :data-idx="i">
          <h3 class="cash-heading write" data-window="0.16,0.34">{{ s.heading }}</h3>
          <p class="cash-body fade" data-window="0.28,0.44">{{ s.body }}</p>
          <!-- ⚠️ A LINK ONLY IF IT GOES SOMEWHERE. `url` is still a placeholder `#`, and this is
               the page's one call to action: a guest who taps it and lands nowhere is worse off
               than one who reads that it is coming. -->
          <div class="cash-act fade" data-window="0.40,0.56">
            <a v-if="s.url && s.url !== '#'" class="cash-cta" :href="s.url"
              target="_blank" rel="noopener noreferrer">{{ s.cta }}</a>
            <span v-else class="cash-cta is-pending">the payment link is coming soon</span>
          </div>
        </section>

        <div class="cash-dock" :class="{ live: dockLive && !panelOpen }">
          <button type="button" class="dock-hit" :aria-expanded="panelOpen" @click="openPanel">
            <span class="dock-eyebrow">{{ s.heading }}</span>
            <span class="dock-note">{{ s.note }}</span>
          </button>
        </div>
        <!-- ⚠️ NOT TELEPORTED TO <body>, and that is load-bearing. Lenis listens for wheel on
             `.chapter-page`; a full-screen layer parented to the body sits OUTSIDE that element, so
             every wheel event over it would die on the layer and the reader would be stuck behind
             it. Rendered in place the events bubble to the scroller and the page keeps moving
             underneath. It sits under the nav (z-20) rather than over it, which is right: the way
             out stays reachable. -->
        <transition name="panel">
          <div v-if="panelOpen" class="cash-layer" @click.self="closePanel">
            <div class="cash-panel" role="dialog" aria-modal="false" :aria-label="s.heading">
              <button type="button" class="cash-x" aria-label="Close" @click="closePanel">
                <svg viewBox="0 0 12 12" aria-hidden="true">
                  <path d="M2 2 L10 10 M10 2 L2 10" stroke="currentColor" stroke-width="1.3" fill="none" />
                </svg>
              </button>
              <h3 class="cash-heading">{{ s.heading }}</h3>
              <p class="cash-body">{{ s.body }}</p>
              <a v-if="s.url && s.url !== '#'" class="cash-cta" :href="s.url"
                target="_blank" rel="noopener noreferrer">{{ s.cta }}</a>
              <span v-else class="cash-cta is-pending">the payment link is coming soon</span>
            </div>
          </div>
        </transition>
      </template>

      <!-- ── Signing · the ink splits in two and signs both names. ── -->
      <section v-else-if="s.kind === 'sign'" class="chapter-section love-scene sign-scene" :data-idx="i">
        <div class="closer fade" data-window="0.08,0.22">{{ s.closer }}</div>
        <div class="sign-block">
          <svg class="fork" viewBox="0 0 1000 160" preserveAspectRatio="none" aria-hidden="true">
            <path class="scrub" data-window="0.12,0.24" pathLength="1" d="M 500 0 C 500 40, 500 70, 500 88"
              :stroke="ink" stroke-width="2.5" fill="none" stroke-linecap="round" opacity="0.55" />
            <path class="scrub" data-window="0.24,0.34" pathLength="1" d="M 500 88 C 440 118, 300 128, 230 160"
              :stroke="ink" stroke-width="2.5" fill="none" stroke-linecap="round" opacity="0.55" />
            <path class="scrub" data-window="0.24,0.34" pathLength="1" d="M 500 88 C 560 118, 700 128, 770 160"
              :stroke="ink" stroke-width="2.5" fill="none" stroke-linecap="round" opacity="0.55" />
          </svg>
          <div class="sig-row">
            <div class="sig">
              <span class="sig-name write" data-window="0.30,0.42">{{ s.names[0] }}</span>
              <svg class="sig-line" viewBox="0 0 360 24" preserveAspectRatio="none" aria-hidden="true">
                <path class="scrub" data-window="0.42,0.52" pathLength="1" d="M 12 14 C 120 6, 250 6, 348 12"
                  :stroke="ink" stroke-width="2.5" fill="none" stroke-linecap="round" />
              </svg>
            </div>
            <div class="sig">
              <span class="sig-name write" data-window="0.38,0.50">{{ s.names[1] }}</span>
              <svg class="sig-line" viewBox="0 0 360 24" preserveAspectRatio="none" aria-hidden="true">
                <path class="scrub" data-window="0.50,0.60" pathLength="1" d="M 12 14 C 120 6, 250 6, 348 12"
                  :stroke="ink" stroke-width="2.5" fill="none" stroke-linecap="round" />
              </svg>
            </div>
          </div>
        </div>
        <div class="tail fade" data-window="0.62,0.74">{{ s.tail }}</div>
      </section>
    </template>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, onBeforeUnmount, nextTick } from 'vue'

const props = defineProps({
  sections: { type: Array, required: true },
})

const ink = '#2E4A52'

// ── the card, and the panel ────────────────────────────────────────────────
// `dockLive` is whether the little card is on screen at all; `panelOpen` is whether the popup it
// opens is up. ⚠️ ONLY `dockLive` COMES FROM THE SCROLL NOW. The popup used to open itself past the
// gift list, which is an overlay arriving uninvited over a page someone is reading — that content
// is a section of its own now, and the popup is only ever something you asked for.
const dockLive = ref(false)
const panelOpen = ref(false)
function openPanel() { panelOpen.value = true }
function closePanel() { panelOpen.value = false }
// ⚠️ A panel that covers the page needs a way out that is not a mouse. It is dismissible with the
// backdrop and the ×, but the keyboard has to work too — and this one can arrive without ever
// having been asked for, which makes Escape the first thing a visitor will reach for.
function onKey(e) { if (e.key === 'Escape' && panelOpen.value) closePanel() }

const rootEl = ref(null)
let rafId = 0
let ro = null

// ── The wall ────────────────────────────────────────────────────────────────
// Five bands, each carrying the whole gift list, each starting the list at a different
// place and running at its own speed in its own direction. Nothing is illustrated and
// nothing is measured off the page: the motion IS the page.
// ⚠️ BAND COUNT FOLLOWS THE SHAPE OF THE SCREEN. Six bands fill a 16:9 desktop and leave
// a tall tablet (768×1024) covered by 34% — a wall with two thirds of the screen empty
// above and below it. Bigger type is not the answer on a narrow screen: at the size that
// would fill 1024px of height, one gift name is wider than the viewport. More bands is.
const rowsFor = () =>
  import.meta.client && window.innerHeight / window.innerWidth >= 1.15 ? 8 : 6
const items = ref([])
const bands = ref([])
const copies = ref([])
const active = ref([])
const touch = ref(false)

// Per-band motion state. `v` is the live speed and it EASES toward `target`, which is
// zero while you are on that band — so a band coasts to a halt and picks up again
// rather than switching on and off. That deceleration is most of the feel of the page.
const mo = reactive([])
let trackEls = []
let bandEls = []
let revealEls = []
let wordEls = []          // the live element under the pointer, per band
let scrubScenes = []      // cached scroll-scrubbed elements, per scene — see measure()
let panelBox = []         // per-band rects for the reveal panel, read in tick's READ phase
let touchTick = 0         // syncTouch runs on every 5th frame — see tick()
let dockWall = null       // the gift list, the cash section, and the signature — the card's cues
let dockCash = null
let dockSign = null

const itemAt = (i) => (i >= 0 ? items.value[i] : null)

function setBand(r, i, e) {
  active.value[r] = i
  const el = e?.currentTarget || null
  // ⚠️ The chosen word needs its own class, not just `:hover`. On touch there is no
  // hover at all, so without this the band would open its panel while every word in it
  // stayed ghosted — which is what the first portrait build looked like.
  if (wordEls[r] && wordEls[r] !== el) wordEls[r].classList.remove('on')
  if (el) el.classList.add('on')
  wordEls[r] = el
}
function clearBand(r) {
  active.value[r] = -1
  wordEls[r]?.classList.remove('on')
  wordEls[r] = null
}

function buildBands(list) {
  items.value = list
  const n = list.length
  const rows = Math.max(2, rowsFor())
  const out = []
  const sh = rng(7)
  for (let r = 0; r < rows; r++) {
    // ⚠️ SHUFFLED per band, not rotated. Rotating one order gives every band the same
    // cyclic sequence, so they slide past each other looking like five copies of the
    // same strip at different offsets — which is exactly how the first cut read.
    const idx = Array.from({ length: n }, (_, k) => k)
    for (let k = n - 1; k > 0; k--) {
      const m = Math.floor(sh() * (k + 1))
      const t = idx[k]; idx[k] = idx[m]; idx[m] = t
    }
    out.push(idx.map((i) => ({ i, name: list[i].name, claimed: !!list[i].claimed })))
  }
  bands.value = out
  copies.value = out.map(() => 3)
  active.value = out.map(() => -1)
  mo.length = 0
  const rnd = rng(41)
  for (let r = 0; r < rows; r++) {
    mo.push({
      dir: r % 2 ? -1 : 1,
      // 24–58 px/s. Slow enough that a word can be read as it passes.
      speed: (0.40 + rnd() * 0.58),
      // Bands are not all the same size — a wall has depth, a table does not.
      fs: (0.62 + rnd() * 0.62).toFixed(3),
      v: 0,
      // ⚠️ A different starting phase per band. With every band starting at 0 the word
      // boundaries line up in columns down the wall and the repetition — unavoidable with
      // six items — becomes the first thing you see. `ph` is a FRACTION of one repetition,
      // applied once the width is known.
      ph: rnd(),
      off: 0,
      w: 0,
    })
  }
}

// ── Measure ─────────────────────────────────────────────────────────────────
// One repetition's width per band, then enough repetitions to cover the viewport plus
// one more. Re-run on resize and once the web font has actually loaded, because the
// width of a word in a fallback face is not the width of the word.
function measure() {
  const root = rootEl.value
  const scene = root?.querySelector('.wall')
  if (!scene) return
  bandEls = [...scene.querySelectorAll('.band')]
  trackEls = bandEls.map((b) => b.querySelector('.track'))
  revealEls = bandEls.map((b) => b.querySelector('.reveal'))
  // ⚠️ Cached here, not re-queried every frame. `querySelectorAll` allocates a fresh NodeList on
  // each call and this loop ran four of them per frame; `measure()` already re-runs on resize and
  // on `document.fonts.ready`, which is exactly when this set can change.
  dockWall = root?.querySelector('.wall') || null
  dockCash = root?.querySelector('.cash-scene') || null
  dockSign = root?.querySelector('.sign-scene') || null
  scrubScenes = [...(root?.querySelectorAll('.love-scene') || [])].map((el) => ({
    el,
    p: 0,
    els: [...el.querySelectorAll('.scrub, .fade, .write')]
      .filter((e) => e.dataset.window)
      .map((e) => {
        const [a, b] = e.dataset.window.split(',').map(Number)
        return { el: e, a, b, last: '', kind: e.classList.contains('scrub') ? 'scrub' : e.classList.contains('write') ? 'write' : 'fade' }
      }),
  }))
  const vw = scene.clientWidth || window.innerWidth
  const next = []
  bandEls.forEach((b, r) => {
    const grp = b.querySelector('.grp')
    const w = grp ? grp.getBoundingClientRect().width : 0
    if (mo[r]) {
      if (!mo[r].w && w) mo[r].off = mo[r].ph * w   // seed the phase the first time only
      mo[r].w = w
    }
    next[r] = w > 8 ? Math.ceil((vw + w) / w) + 1 : 3
  })
  copies.value = next
}

// Touch has no hover: open whichever band is nearest the middle of the screen, on the
// word nearest the middle of it. Pointer devices keep the hover, which feels better.
// ⚠️ ONE MediaQueryList, made once. This was `window.matchMedia(…).matches` called from inside
// the rAF loop — a fresh query object parsed and allocated on every frame, on the page that
// profiled as the site's most script-heavy by a factor of 3.7.
let coarseMQ = null
const coarse = () => {
  if (!coarseMQ && typeof window !== 'undefined') coarseMQ = window.matchMedia('(hover: none)')
  return !!coarseMQ?.matches
}
// ⚠️ Six bands of type sliding across the screen forever is exactly what someone who has
// asked their system for less motion does not want. For them the wall simply holds still;
// everything else about the page — the reveal, the focus states — still works.
const stillness = () => import.meta.client && window.matchMedia('(prefers-reduced-motion: reduce)').matches
let calm = false
const clamp01 = (v) => Math.min(1, Math.max(0, v))

function rng(seed) {
  let t = seed * 1103515245 + 12345
  return () => {
    t = (t * 1103515245 + 12345) % 2147483648
    return t / 2147483648
  }
}

// ⚠️ READ EVERYTHING, THEN WRITE EVERYTHING. Reading a rect after writing a style forces the
// browser to flush layout synchronously, and interleaved — read scene 1, write its elements, read
// scene 2 — that happened several times a frame over the most expensive layout tree on the site:
// eight bands of nowrap text, each far wider than the screen. Measured at 20× CPU throttling this
// page was the ONLY one that broke (p90 36.6ms, 13 of 98 frames over 32ms) while the other three
// held 60fps, which is what pointed here rather than at the scrub engine in general.
function tick() {
  const root = rootEl.value
  if (root) {
    const vh = window.innerHeight

    // ── READ ──
    for (const s of scrubScenes) {
      const r = s.el.getBoundingClientRect()
      s.p = clamp01((vh - r.top) / (r.height + vh))
    }
    // ── the card ── on screen from the gift list until the signature has gone, and NOT over its
    // own section: there it would be a shortcut to the thing you are already reading.
    // ⚠️ Written only when the answer changes, so this is a comparison per frame, not a write.
    if (dockWall && dockSign) {
      const w = dockWall.getBoundingClientRect()
      const g = dockSign.getBoundingClientRect()
      const c = dockCash?.getBoundingClientRect()
      // The cash section counts as "on screen" generously — half a viewport either side — so the
      // card is gone well before you reach it and back only once it is properly behind you, rather
      // than blinking in and out at the section's own edges.
      const onCash = !!c && c.top < vh * 0.72 && c.bottom > vh * 0.28
      const live = w.top < vh && g.bottom > vh * 0.2 && !onCash
      if (dockLive.value !== live) dockLive.value = live
    }

    if (bandEls.length) {
      const near = coarse()
      if (touch.value !== near) touch.value = near
      // ⚠️ NOT EVERY FRAME. syncTouch reads a rect for all eight bands and then scans the words of
      // whichever one wins — to answer "which band is nearest the middle of the screen", which
      // cannot meaningfully change in 16ms. Every 5th frame is still ~12 checks a second.
      if (near && (touchTick = (touchTick + 1) % 5) === 0) syncTouch(vh)
      for (let r = 0; r < bandEls.length; r++) {
        const we = wordEls[r]
        panelBox[r] = (revealEls[r] && active.value[r] >= 0 && we)
          // ⚠️ `offsetWidth` belongs in here too — it is a layout read, and left in the write
          // phase below it re-flushed layout right after the track transforms went out.
          ? { bb: bandEls[r].getBoundingClientRect(), wb: we.getBoundingClientRect(), w: revealEls[r].offsetWidth || 220 }
          : null
      }
    }

    // ── WRITE ──
    for (const s of scrubScenes) {
      for (const it of s.els) {
        const lp = clamp01((s.p - it.a) / (it.b - it.a))
        // Most of these are parked at 0 or 1 on any given frame — only the few mid-stroke have
        // actually changed. (UsStory has done this since 2026-09-02; the wall had not.)
        const v = lp.toFixed(4)
        if (it.last === v) continue
        it.last = v
        if (it.kind === 'scrub') it.el.style.strokeDashoffset = String(1 - lp)
        else if (it.kind === 'write') it.el.style.clipPath = `inset(-0.3em ${((1 - lp) * 100).toFixed(1)}% -0.45em 0)`
        else it.el.style.opacity = String(lp)
      }
    }

    if (bandEls.length) {
      for (let r = 0; r < bandEls.length; r++) {
        const m = mo[r]
        const track = trackEls[r]
        if (!m || !track || !m.w) continue
        const held = active.value[r] >= 0
        m.v += ((held || calm ? 0 : m.speed) - m.v) * 0.045
        m.off += m.v
        if (m.off >= m.w) m.off -= m.w
        // ⚠️ Both directions run the SAME accumulator and wrap on the same width; only
        // the sign of the translate differs. Running one of them backwards through the
        // wrap is how a marquee ends up with a seam.
        const x = m.dir > 0 ? -m.off : m.off - m.w
        // ⚠️ Skip the write when the strip has not actually moved a visible amount. A held or
        // calm band still creeps by fractions of a pixel as its velocity eases to zero, and each
        // write dirties a track holding hundreds of words for style recalc — which is where this
        // page's time went (0.472s of recalc against The Big Day's 0.078s over the same scroll).
        const xs = x.toFixed(1)
        if (m.lastX !== xs) { m.lastX = xs; track.style.transform = `translate3d(${xs}px,0,0)` }

        // The panel follows its word while the band is still coasting — off rects taken above.
        const rev = revealEls[r]
        const box = panelBox[r]
        if (rev && box) {
          const bb = box.bb
          const wb = box.wb
          // ⚠️ CLAMPED AGAINST THE VIEWPORT, not against the band. The word it follows is
          // on an endless strip and is very often half off one edge, so unclamped the panel
          // went with it — measured at left: -536 on a 390px screen. And the band is NOT a
          // reliable ruler: it is a flex item wrapping a track of nowrap content, so its own
          // border box is far wider than the screen. The viewport is the only honest bound.
          const w = box.w
          const lo = 10 - bb.left
          const hi = window.innerWidth - w - 10 - bb.left
          rev.style.left = `${Math.max(lo, Math.min(hi, wb.left - bb.left)).toFixed(1)}px`
        }
      }
    }
  }
  rafId = requestAnimationFrame(tick)
}

// The touch equivalent of a hover: the band closest to the middle of the screen opens,
// on whichever of its words is closest to the middle of that band.
let lastTouchBand = -1
function syncTouch(vh) {
  let best = -1
  let bestD = vh * 0.22
  bandEls.forEach((b, r) => {
    const bb = b.getBoundingClientRect()
    const d = Math.abs(bb.top + bb.height / 2 - vh * 0.42)
    if (d < bestD) { bestD = d; best = r }
  })
  if (best === lastTouchBand) return
  if (lastTouchBand >= 0) clearBand(lastTouchBand)
  lastTouchBand = best
  if (best < 0) return
  const b = bandEls[best]
  const bb = b.getBoundingClientRect()
  let win = null
  let wd = Infinity
  b.querySelectorAll('.word').forEach((w) => {
    const r = w.getBoundingClientRect()
    const d = Math.abs(r.left + r.width / 2 - (bb.left + bb.width * 0.4))
    if (d < wd) { wd = d; win = w }
  })
  if (win) setBand(best, +win.dataset.i, { currentTarget: win })
}

let resizeT = 0
const onResize = () => {
  clearTimeout(resizeT)
  resizeT = setTimeout(() => {
    // A rotation can change the band count; rebuild only when it actually differs, so an
    // ordinary resize does not re-roll every speed and phase under the reader.
    if (bands.value.length !== Math.max(2, rowsFor())) buildBands(items.value)
    nextTick(measure)
  }, 150)
}

onMounted(async () => {
  calm = stillness()
  buildBands(props.sections.find((x) => x.kind === 'gifts')?.items || [])
  await nextTick()
  measure()
  requestAnimationFrame(() => measure())
  document.fonts?.ready.then(() => setTimeout(measure, 60))
  const scene = rootEl.value?.querySelector('.wall')
  if (scene && 'ResizeObserver' in window) { ro = new ResizeObserver(onResize); ro.observe(scene) }
  window.addEventListener('resize', onResize)
  window.addEventListener('keydown', onKey)
  rafId = requestAnimationFrame(tick)
})
onBeforeUnmount(() => {
  cancelAnimationFrame(rafId)
  window.removeEventListener('resize', onResize)
  window.removeEventListener('keydown', onKey)
  ro?.disconnect()
  clearTimeout(resizeT)
})
</script>

<style scoped>
.love-scene {
  position: relative;
  color: var(--accent, #2E4A52);
  background: var(--accentLight, #E8EDF2);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 12vh 8vw;
  box-sizing: border-box;
}
.scrub { stroke-dasharray: 1; stroke-dashoffset: 1; }
.fade { opacity: 0; }
/* ⚠️ Vertical slack on the clip. `inset(0 …% 0 0)` clips at the line box, and a
   script face's descenders hang BELOW it — the y of "thank you" was cut off at the
   tail. Same fix US needed. */
.write { clip-path: inset(-0.3em 100% -0.45em 0); }

/* ── opening ── */
.open-scene { min-height: 98dvh; }
.lead {
  font-family: 'Bague', sans-serif;
  font-size: 0.8rem;
  letter-spacing: 0.26em;
  text-transform: uppercase;
  opacity: 0.6;
  margin-bottom: 2.4rem;
}
.big-thanks { font-family: 'Over the Rainbow', cursive; font-size: clamp(3.4rem, 12vw, 9rem); line-height: 1; }
.flourish { width: min(46vw, 30rem); height: 3.4rem; margin-top: -0.4rem; }
.sub { font-family: 'Italiana', serif; font-size: clamp(1.2rem, 2.4vw, 1.9rem); margin-top: 1.6rem; max-width: 32rem; }
.pivot {
  font-family: 'Bague', sans-serif;
  font-size: 0.82rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  opacity: 0.55;
  margin-top: 4rem;
  max-width: 30rem;
}

/* ── the wall ── */
.wall {
  /* ⚠️ Centred, not top-aligned. The section is taller than the bands so the wall has
     somewhere to travel through as you scroll; block layout put all of that slack at the
     bottom and left ~450px of empty page above the first band, which is the one thing a
     wall of type cannot afford. */
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: calc(var(--rows, 6) * 11vh + 78vh);
  padding: 6vh 0;
  /* Every band overruns both edges by a whole repetition — that is what makes the loop
     seamless — so the section has to keep it. */
  overflow: hidden;
}
/* The list's own heading, in the couple's hand. ⚠️ `flex: none` — the wall is a centred column and
   a heading that can be squeezed is a heading that moves as the band count changes with the screen. */
.wall-title {
  flex: none;
  margin: 0 0 4vh;
  font-family: 'Over the Rainbow', cursive;
  font-weight: 400;
  font-size: clamp(2rem, 5.5vw, 3.6rem);
  line-height: 1.05;
  text-align: center;
  color: var(--accent, #2E4A52);
  opacity: 0;
}

.band {
  position: relative;
  margin-bottom: 2.2vh;
  /* ⚠️ A flex item's automatic minimum size is its MIN-CONTENT size, and this one wraps a
     nowrap track thirteen screens wide — so the band's own border box measured 10,562px.
     Harmless to look at (the wall clips it) but it makes the band useless as a coordinate
     space, which is how the reveal panel ended up positioned off the screen. */
  width: 100%;
  min-width: 0;
}
.band:last-child { margin-bottom: 0; }
.track {
  display: flex;
  white-space: nowrap;
  will-change: transform;
}
.grp { display: inline-flex; align-items: baseline; }

.word {
  appearance: none;
  -webkit-appearance: none;
  border: 0;
  background: none;
  padding: 0;
  display: inline-flex;
  align-items: baseline;
  font-family: 'Bague', sans-serif;
  font-weight: 700;
  /* ⚠️ Sized off the LARGER of the two axes, and capped high. On vw alone a tall tablet
     (768×1024) got 40px type on a 1024px-high screen and the wall covered 34% of it, while
     a 2560 desktop hit the old 4.8rem cap and covered 42%. `max(vw, vh)` keeps the wall
     filling the frame in portrait, and the higher cap lets it keep growing on a big one. */
  font-size: calc(clamp(2.2rem, max(5.2vw, 3.6vh), 6.4rem) * var(--fs, 1));
  letter-spacing: 0.05em;
  line-height: 1.1;
  text-transform: uppercase;
  white-space: nowrap;
  cursor: none;
  /* ⚠️ OUTLINE is the resting state. Five solid bands of 4rem type is a shout; hollow,
     the wall is a texture you look through, and the one you point at fills in. */
  color: transparent;
  -webkit-text-stroke: 1px rgba(46, 74, 82, 0.55);
  transition: color 0.5s ease, -webkit-text-stroke-color 0.5s ease, opacity 0.5s ease;
}
/* Alternating bands come pre-filled, so the wall has weight before you touch it. */
.solid .word {
  color: rgba(46, 74, 82, 0.16);
  -webkit-text-stroke-color: rgba(46, 74, 82, 0.22);
}
.band:hover .word { opacity: 0.42; }
/* While one band is open the rest step back, so the panel has something to sit on and
   the eye is not asked to read a moving wall and a still card at the same time.
   ⚠️ On touch a band is ALWAYS open — the one nearest the middle of the screen — so the
   full 0.16 would leave the entire wall permanently ghosted. It still steps back, just
   far less, which is enough for the panel to read against it. */
.wall.busy:not(.touch) .band:not(.on) .word { opacity: 0.16; }
.wall.busy.touch .band:not(.on) .word { opacity: 0.45; }
.word.on {
  opacity: 1;
  color: #2E4A52;
  -webkit-text-stroke-color: #2E4A52;
}
.band:hover .word:hover,
.word:focus-visible {
  opacity: 1;
  outline: none;
  color: #2E4A52;
  -webkit-text-stroke-color: #2E4A52;
}
.word.taken { text-decoration: line-through; text-decoration-thickness: 2px; opacity: 0.4; }

/* The separator between one name and the next — a small mark, so the stream reads as a
   list and not as one very long word. */
.sep {
  display: inline-block;
  width: 0.30em;
  height: 0.30em;
  margin: 0 0.72em 0.2em;
  border-radius: 50%;
  background: currentColor;
  border: 1px solid rgba(46, 74, 82, 0.45);
  background: transparent;
  flex: none;
}

/* ── the annotation ──────────────────────────────────────────────────────────
   ⚠️ NO CARD. This was a cream box with a 30px drop shadow: a UI popover dropped onto a chapter
   that is ink on paper everywhere else, and it read exactly like that. A margin note instead — a
   hairline drawn from the word, the couple's hand under it, the specifics in small caps. The only
   help it gets with legibility is the paper thickening behind it (`::before`), which has no edge
   anywhere and so is not a box. */
.reveal {
  position: absolute;
  top: calc(100% - 0.35rem);
  left: 0;
  width: clamp(12rem, 19vw, 16rem);
  padding: 0 0.2rem 0.4rem;
  /* ⚠️ The scene centres its text; a margin note has to hang off the left of the word it belongs
     to, or the drawn tie points at nothing. */
  text-align: left;
  opacity: 0;
  transform: translateY(-0.4rem);
  pointer-events: none;
  transition: opacity 0.38s ease, transform 0.55s cubic-bezier(0.2, 0.72, 0.24, 1);
  z-index: 3;
}
/* The paper, a little heavier where the note sits. ⚠️ `z-index: -1` is safe inside `.reveal`'s own
   stacking context (z-index: 3), so this cannot slide behind the band's words. */
.reveal::before {
  content: '';
  position: absolute;
  inset: -0.9rem -1.5rem -1.6rem -1.4rem;
  background: radial-gradient(72% 64% at 26% 34%,
    var(--accentLight, #E8EDF2) 0%,
    color-mix(in srgb, var(--accentLight, #E8EDF2) 88%, transparent) 58%,
    transparent 100%);
  z-index: -1;
  pointer-events: none;
}
/* ⚠️ `pointer-events: auto` once open. The band keeps the note alive because the note is INSIDE
   the band, so moving onto it is not a pointerleave. */
.reveal.open { opacity: 1; transform: translateY(0); pointer-events: auto; }
/* The tie: the same pen as the flourishes above, drawn on open rather than on scroll. */
.reveal-tie {
  display: block;
  width: 5.2rem;
  height: 1.15rem;
  margin: 0 0 0.25rem 0.1rem;
  overflow: visible;
}
.reveal-tie path {
  stroke-dasharray: 1;
  stroke-dashoffset: 1;
  opacity: 0.5;
  transition: stroke-dashoffset 0.55s cubic-bezier(0.3, 0.7, 0.3, 1) 0.06s;
}
.reveal.open .reveal-tie path { stroke-dashoffset: 0; }
.reveal-shot {
  display: block;
  width: 62%;
  aspect-ratio: 5 / 4;
  object-fit: cover;
  filter: grayscale(1) contrast(1.04);
  opacity: 0.8;
  margin-bottom: 0.55rem;
}
.reveal-spec {
  display: flex;
  flex-direction: column;
  gap: 0.18rem;
  margin: 0;
  font-family: 'Bague', sans-serif;
  font-size: clamp(0.54rem, 0.7vw, 0.64rem);
  letter-spacing: 0.13em;
  text-transform: uppercase;
  line-height: 1.5;
  color: #2E4A52;
}
.spec-what { opacity: 0.55; }
.spec-price { opacity: 0.8; letter-spacing: 0.18em; }
/* The other way to give this one — in the couple's hand, because it is them asking rather than the
   shop describing. ⚠️ `pointer-events: auto` comes from `.reveal.open`; the band keeps the note
   alive because the note is inside the band. */
.reveal-cash {
  display: inline-block;
  margin-top: 0.5rem;
  font-family: 'Over the Rainbow', cursive;
  font-size: clamp(0.92rem, 1.18vw, 1.1rem);
  line-height: 1.3;
  color: #2E4A52;
  text-decoration: none;
  opacity: 0.9;
  cursor: none;
  transition: opacity 0.25s ease;
}
a.reveal-cash { border-bottom: 1px solid currentColor; padding-bottom: 1px; }
a.reveal-cash:hover, a.reveal-cash:focus-visible { opacity: 1; outline: none; }
/* No link yet — the offer, written down, with nothing to press. */
.reveal-cash.is-pending { opacity: 0.6; }

/* ── even better — the section ───────────────────────────────────────────────
   Set exactly the way the popup is set: ink on paper, centred, nothing around it. It is a section
   of the chapter now rather than a layer over one. */
.cash-scene {
  min-height: 96dvh;
  text-align: center;
  padding: 10vh 8vw;
  box-sizing: border-box;
}
.cash-scene .cash-heading { margin: 0 0 1.4rem; }
.cash-scene .cash-body { margin: 0 auto 2.8rem; }
.cash-act { display: block; }

/* ── even better — the card, and what it opens ───────────────────────────────
   ⚠️ THE CARD DOES NOT GROW. A previous cut had it blow itself out in place into a 46rem panel,
   which is a bigger widget sitting on top of the page, not the thing that was asked for: "blow it
   out almost like it was clicked… it had a pop up that didn't have the background of the widget."
   So the card stays a card and the POPUP is what opens — on a tap, and by itself over the stretch
   of scroll past the gift list. */
.cash-dock {
  position: fixed;
  left: 50%;
  bottom: 1.75rem;
  /* ⚠️ Above `.popup-stack` (15), below the nav (20). */
  z-index: 16;
  width: min(22rem, 86vw);
  box-sizing: border-box;
  background: #F6F3EC;
  color: #2E4A52;
  border-radius: 0.95rem;
  box-shadow: 0 16px 38px rgba(24, 34, 40, 0.18);
  overflow: hidden;
  text-align: center;
  opacity: 0;
  pointer-events: none;
  transform: translateX(-50%) translateY(1.2rem);
  transition: opacity 0.45s ease, transform 0.6s cubic-bezier(0.2, 0.72, 0.24, 1);
}
.cash-dock.live {
  opacity: 1;
  pointer-events: auto;
  transform: translateX(-50%) translateY(0);
}
.dock-hit {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.3rem;
  width: 100%;
  appearance: none;
  -webkit-appearance: none;
  border: 0;
  background: none;
  color: inherit;
  padding: 1rem 1.4rem;
  cursor: none;
}
.dock-hit:focus-visible { outline: 1px solid currentColor; outline-offset: -4px; }
.dock-eyebrow {
  font-family: 'Over the Rainbow', cursive;
  font-size: clamp(1.25rem, 2.4vw, 1.7rem);
  line-height: 1.1;
}
.dock-note {
  font-family: 'Bague', sans-serif;
  font-size: 0.68rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  opacity: 0.55;
}

/* The panel: ink on paper over a washed-out page, no box of its own. */
.cash-layer {
  position: fixed;
  inset: 0;
  /* ⚠️ Inside `.chapter-page`'s stacking context (z-10), which means UNDER the nav — deliberately.
     This panel can arrive without being asked for, so the way out has to stay reachable. */
  z-index: 40;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8vh 6vw;
  background: color-mix(in srgb, var(--accentLight, #E8EDF2) 88%, transparent);
  backdrop-filter: blur(3px);
  -webkit-backdrop-filter: blur(3px);
  cursor: none;
}
.cash-panel {
  position: relative;
  width: min(30rem, 100%);
  text-align: center;
  color: #2E4A52;
}
.cash-x {
  position: absolute;
  top: -2.4rem;
  inset-inline-end: 0;
  width: 1.5rem;
  height: 1.5rem;
  appearance: none;
  -webkit-appearance: none;
  border: 0;
  background: none;
  padding: 0.25rem;
  color: #2E4A52;
  opacity: 0.5;
  cursor: none;
  transition: opacity 0.25s ease;
}
.cash-x:hover, .cash-x:focus-visible { outline: none; opacity: 1; }
.cash-x svg { width: 100%; height: 100%; display: block; }
.panel-enter-active, .panel-leave-active { transition: opacity 0.42s ease; }
.panel-enter-from, .panel-leave-to { opacity: 0; }
.cash-heading {
  font-family: 'Over the Rainbow', cursive;
  font-size: clamp(2.1rem, 6vw, 3.2rem);
  line-height: 1.1;
  margin: 0 0 1.2rem;
  font-weight: 400;
}
.cash-body {
  font-family: 'Italiana', serif;
  font-size: clamp(1.05rem, 2.2vw, 1.35rem);
  line-height: 1.6;
  margin: 0 auto 2.4rem;
  max-width: 26rem;
  opacity: 0.85;
}
.cash-cta {
  display: inline-block;
  font-family: 'Bague', sans-serif;
  font-size: 0.78rem;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  text-decoration: none;
  color: inherit;
  padding-bottom: 0.35rem;
  border-bottom: 1px solid currentColor;
  opacity: 0.75;
  cursor: none;
  transition: opacity 0.25s ease;
}
.cash-cta:hover, .cash-cta:focus-visible { outline: none; opacity: 1; }
.cash-cta.is-pending { border-bottom-style: dashed; opacity: 0.5; cursor: default; }

@media (prefers-reduced-motion: reduce) {
  .cash-dock, .cash-dock *, .reveal, .reveal-tie path { transition-duration: 0.01ms !important; }
}

/* ── signing ── */
.sign-scene { min-height: 96dvh; }
.closer { font-family: 'Italiana', serif; font-size: clamp(1.4rem, 3vw, 2.4rem); margin-bottom: 2rem; }
.sign-block { width: min(82vw, 46rem); display: flex; flex-direction: column; align-items: stretch; }
.fork { width: 100%; height: 6.5rem; pointer-events: none; }
.sig-row { display: flex; justify-content: space-between; gap: 2rem; }
.sig { flex: 1; display: flex; flex-direction: column; align-items: center; }
.sig-name { font-family: 'Over the Rainbow', cursive; font-size: clamp(1.6rem, 4.6vw, 3.2rem); }
.sig-line { width: min(20rem, 34vw); height: 1.5rem; }
.tail {
  font-family: 'Bague', sans-serif;
  font-size: 0.78rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  opacity: 0.55;
  margin-top: 3rem;
}

/* ── portrait ── */
@media (max-width: 767px) {
  .wall { min-height: calc(var(--rows, 6) * 9vh + 70vh); padding: 5vh 0; }
  .band { margin-bottom: 2.6vh; }
  .word { font-size: calc(clamp(1.75rem, max(9.4vw, 4.2vh), 3.1rem) * var(--fs, 1)); }
  .reveal { width: min(15rem, 62vw); }
}

@media (prefers-reduced-motion: reduce) {
  .reveal { transition: opacity 0.3s ease; }
}
</style>
