<template>
  <div v-if="chapter" ref="pageEl" class="chapter-page">
    <!-- ── the top veil ────────────────────────────────────────────────────────────────────
         ⚠️ THE SAME COLOUR AS THE GROUND IT SITS ON, so it is not a box and has no edge: the
         page's paper is `--accentLight` and so is this, fading to nothing over ~130px. It
         exists because copy scrolled clean under the fixed nav — measured on /us at 5 of 15
         scroll positions on a 360px phone, with "Will you do life with me?" crossing the
         wordmark (AUDIT #101). Type now dissolves into the paper as it reaches the chrome.
         ⚠️ IT IS OFF INSIDE THE HERO. At the top of a chapter the ground is the film, not the
         paper, and a paper-coloured band there would be a stripe across the photograph — so its
         opacity is driven by the scroll and only arrives once the article is what is up there.
         That also keeps it clear of the RETURN: the top-edge pull only charges at scroll 0,
         where this is fully transparent, so it can never paint over the accent band. -->
    <div class="top-veil" :style="{ opacity: topVeil }" aria-hidden="true" />

    <!-- Single content child = Lenis's scrolled element (wrapper is .chapter-page). -->
    <div ref="scrollEl" class="chapter-scroll">
      <!-- Hero: transparent so the WebGL card (animated to fill the screen by the
           select transition, in app.vue's persistent scene) reads as the hero. As
           you scroll, the scene couples the card to the scroll so it rises away. -->
      <section class="chapter-hero" aria-hidden="true" />

      <!-- Built inner page (data-driven) when content exists for this chapter.
           Each chapter can have a bespoke treatment (US = the margin-notes scrapbook);
           the generic ChapterSection loop is the fallback. Bespoke components must
           render `.chapter-section` roots with data-idx so the popup observer works. -->
      <div v-if="pageContent" class="chapter-content">
        <UsStory v-if="chapter.slug === 'us'" :sections="pageContent.sections" />
        <BigDay v-else-if="chapter.slug === 'the-big-day'" :sections="pageContent.sections" />
        <InFrames v-else-if="chapter.slug === 'in-frames'" :sections="pageContent.sections" />
        <WithLove v-else-if="chapter.slug === 'with-love'" :sections="pageContent.sections" />
        <template v-else>
          <ChapterSection
            v-for="(section, i) in pageContent.sections"
            :key="i"
            :data-idx="i"
            :section="section"
          />
        </template>
        <ChapterEnd :chapter="chapter" />
        <!-- ── "back to the chapters", the last thing on the page ──────────────────────────────
             ⚠️ IN THE FLOW, NOT FIXED. The bottom exit is the page scrolling off the top of the
             frame, so the signpost for it belongs to the PAGE: it rides up and leaves with
             everything else instead of hanging over the deck that is arriving behind it, which is
             what made it read as a loading spinner laid on the animation. `--p` is the exit's own
             progress, so the ring closes exactly as the page clears — and at rest, while you are
             still reading the footer, it is simply the last line of the chapter with an open
             circle under it. (Its twin for the TOP edge lives in `SiteNav`, where the wordmark is.) -->
        <div class="leave-cue" :style="{ '--p': pullBottom }">
          <span class="leave-label">back to the chapters</span>
          <span class="leave-ring">
            <svg viewBox="0 0 44 44" focusable="false" aria-hidden="true">
              <circle class="leave-track" cx="22" cy="22" r="20" />
              <circle class="leave-draw" cx="22" cy="22" r="20" />
            </svg>
            <i class="leave-chev" aria-hidden="true" />
          </span>
        </div>
      </div>

      <!-- …otherwise the scaffold (safety net — all four chapters have content). -->
      <section v-else class="chapter-body">
        <h1 class="chapter-title">{{ chapter.title }}</h1>
        <p class="chapter-note">This chapter is still being written — check back soon.</p>
      </section>

      <!-- Scroll-driven exit "outro": transparent, so the WebGL ring shows through as the article scrolls
           out above it. Scrolling through it drives the ring reassembly (scene.setExitProgress, de 0→1);
           reaching the bottom navigates home. (Reference: the page scrolls fully out, the ring rises in.) -->
      <section ref="outroEl" class="chapter-outro" aria-hidden="true" />
    </div>

    <!-- ── The scroll cue: the first inch of the thread ───────────────────────────────────────
         Every chapter here is built on a line of ink that draws itself as you scroll — the knot on
         The Big Day, the flourishes on With Love, the rules on US. So the prompt is that same pen,
         starting the stroke and stopping: a hairline that draws downward and waits for you to pull
         the rest of it. ⚠️ A rail with a bouncing dot is the one scroll hint every site on earth
         has, which is exactly why it read as generic and stuck out — it belonged to no page.
         ⚠️ NOT UNTIL THE CARD HAS BECOME THE PAGE (`cueReady`). It used to mount with the route, so
         it was on screen through the whole ~1.5s select — telling you to scroll a card that was
         still turning into a page. It retires for good on the first real scroll — a prompt still
         there after you have obeyed it is noise — and stands down while a pull is live, since by
         then the visitor plainly knows how to move the page. ── -->
    <div class="scroll-cue" :class="{ ready: cueReady, gone: cueSeen || pullTop > 0 }" aria-hidden="true">
      <svg class="cue-thread" viewBox="0 0 24 68" preserveAspectRatio="xMidYMin meet" focusable="false">
        <!-- The thread is already there, faintly, the whole way down; the pen goes over it. Without
             the ghost the stroke has nowhere visible to be going, and the cue was reported as
             unnoticeable — which it was, at one hairline drawing into empty space. -->
        <path class="cue-ghost" d="M 12 2 C 12 14, 8.5 23, 12 34 C 14.6 42, 11.6 53, 12 65" />
        <path class="cue-ink" pathLength="1" d="M 12 2 C 12 14, 8.5 23, 12 34 C 14.6 42, 11.6 53, 12 65" />
      </svg>
      <span class="cue-label">read on</span>
    </div>

    <!-- Floating popup cards — pinned to the viewport bottom-center; content is the in-view
         section's popups (moments / map + calendar / registry), gone at the chapter end. -->
    <transition name="popups">
      <div v-if="activePopups.length" class="popup-stack">
        <PopupCard v-for="p in activePopups" :key="p.title" :popup="p" />
      </div>
    </transition>
  </div>
</template>

<script setup>
import { computed, onMounted, onBeforeUnmount, inject, ref, watch } from 'vue'
import Lenis from 'lenis'
import { CHAPTERS } from '~/composables/useChapterScene'
import { CHAPTER_PAGES, POPUPS } from '~/composables/chapterPages'
import ChapterSection from '~/components/chapter/ChapterSection.vue'
import UsStory from '~/components/chapter/UsStory.vue'
import BigDay from '~/components/chapter/BigDay.vue'
import InFrames from '~/components/chapter/InFrames.vue'
import WithLove from '~/components/chapter/WithLove.vue'
import ChapterEnd from '~/components/chapter/ChapterEnd.vue'
import PopupCard from '~/components/chapter/PopupCard.vue'

const route = useRoute()
const router = useRouter()
const chapter = computed(() => CHAPTERS.find((c) => c.slug === route.params.slug))
const pageContent = computed(() => CHAPTER_PAGES[route.params.slug])

// ⚠️ A URL THAT IS NOT A CHAPTER GOES HOME, AND SAYS SO IN THE ADDRESS BAR. This route is
// `[slug]`, so it matches anything — `/definitley-not-a-page` rendered the homepage under its
// own wrong URL, with the homepage's title, at HTTP 200 (AUDIT #112). `replace`, not `push`:
// a typo should not become a step in the visitor's history that Back returns them to.
// ⚠️ The HTTP status stays 200 and cannot not be: this is a static SPA, and the host serving
// the shell has no idea which slugs the bundle knows about. What is fixed is the lie the
// ADDRESS BAR was telling.
watch(
  chapter,
  (c) => { if (!c && route.params.slug) router.replace('/') },
  { immediate: true }
)

// Floating popup cards: the active (most in-view) section's popups, shown in one fixed
// overlay at the viewport bottom-center (so they're never affected by the content scroll).
const activeIdx = ref(-1)
const sectionRatios = new Map()
let sectionObserver = null
const activePopups = computed(() => {
  const s = pageContent.value?.sections?.[activeIdx.value]
  return (s?.popups || []).map((key) => POPUPS[key]).filter(Boolean)
})

// Reach the persistent WebGL scene (provided by app.vue) so page scroll can drive
// the hero-card coupling (P1). It's the same scene instance across all routes.
const webglSceneRef = inject('webglSceneRef', null)

// The hero card presses back the way you are pulling it — the only thing that CAN answer at scroll
// 0, where the whole screen is that card. A few percent of the viewport at a full charge.
// The TOP edge's charge, shared with SiteNav — the cue for that edge belongs where the wordmark is,
// inside the band of accent the pull opens above the page card. (The BOTTOM edge's cue is in this
// page's own content, at the end of it.)
const navPull = useState('homePull', () => 0)
// The cue's own 0→1 — it finishes at FOLD_FROM, where the veil is only half drawn. See pushPull.
const navCue = useState('homeCue', () => 0)
// Set at the moment of commit and cleared by SiteNav once its veil has faded: the page itself
// unmounts on the next tick, so it cannot be the thing that plays the veil out.
const navLeaving = useState('homeLeaving', () => false)

// ⚠️ THE PULL IS THE ANIMATION. It used to charge a threshold and then fire a 2.5s timeline —
// "it seems to completely handoff to play the rest of the animation almost like a video". Every
// pixel of the pull now scrubs `setBackProgress`, so the whole return is reversible at any point
// and reaching 1 IS the arrival; there is nothing left to play afterwards.
// (The old `setHeroPull` nudge is gone with it: the scrub shrinks the hero card itself, which
// opens the accent around it far more plainly than pressing it down a few percent ever did.)
let backEngaged = false
function pushPull() {
  const scene = webglSceneRef?.value?.scene
  // The veil reads the raw pull; the cue completes at the end of the FIRST stage, because the cue
  // closing IS "the animation completing within the page".
  navPull.value = pullTop.value
  navCue.value = Math.min(1, pullTop.value / FOLD_FROM)
  // The band: the picture goes down, the article goes with it, and the line above them is the
  // return. `--band` lets the cue sit in the opening rather than guess at it.
  const band = bandPx()
  scene?.setHeroPull?.(band)
  if (scrollEl.value) scrollEl.value.style.transform = band ? `translate3d(0, ${band}px, 0)` : ''
  if (import.meta.client) document.documentElement.style.setProperty('--band', band + 'px')
  // ⚠️ RE-PROBE THE NAV'S GROUND. `syncNavInk` otherwise only runs on Lenis scroll events, and the
  // pull STOPS Lenis — so the flag was whatever the last scroll left it as while the veil, which is
  // the chapter's pale paper, washed in underneath the nav. Measured mid-pull: menu ink
  // rgb(239,232,245) on a near-white veil.
  syncNavInk()
  if (!scene) return
  if (pullTop.value > 0 && !backEngaged) {
    // ⚠️ LAND ON THE TOP FIRST, THEN CAPTURE. The pull engages anywhere inside TOP_EDGE, and
    // `beginBack` zeroes the scene's scroll coupling as it snapshots the pose — so capturing while
    // the page was still a few pixels down dropped the hero card by those pixels in one frame,
    // right at the start of the return. Order matters: scroll home, then snapshot, then stop.
    lenis?.scrollTo(0, { immediate: true })
    backEngaged = !!scene.beginBack?.()
    // ⚠️ THE SCROLLER STANDS DOWN WHILE THE PULL OWNS THE GESTURE. Without this a push back down
    // unwound the pull AND scrolled the page in the same notches, so reversing a return left you a
    // few hundred pixels into the chapter with no way to pull again. One gesture, one meaning.
    if (backEngaged) lenis?.stop()
  }
  if (!backEngaged) return
  if (pullTop.value <= 0) {
    scene.cancelBack?.()
    scene.setHeroPull?.(0)
    if (scrollEl.value) scrollEl.value.style.transform = ''
    if (import.meta.client) document.documentElement.style.setProperty('--band', '0px')
    backEngaged = false
    if (!exiting) lenis?.start()
    return
  }
  // ⚠️ THE SCENE ONLY MOVES IN THE SECOND STAGE. Below FOLD_FROM this is 0 — `beginBack` has
  // captured the pose and is holding it, so the chapter sits there whole while the loader draws.
  scene.setBackProgress(Math.max(0, (pullTop.value - FOLD_FROM) / (1 - FOLD_FROM)))
}

// ⚠️ LETTING GO IS A DECISION, NOT A RETREAT. This used to spring every release back to 0 — which
// is right for a brush against the top edge and catastrophic for anything else, because the pull is
// 800px long and a gesture is 120–200px: the journey was wound back between every notch and every
// swipe, and the homepage was unreachable by any input but one unbroken trackpad flick. Past this
// point the gesture has plainly been made, so the release finishes it; below it, nothing happened.
// ⚠️ The posters are home by BACK_POSTERS (0.60) and the accent ground has cleared by BACK_BG
// (0.64), so what settles after this is the last of the group's tilt — a finish, not a playback.
// ⚠️ PAST THE FOLD'S START, deliberately: releasing can only commit once the card has visibly
// begun going back, so "I let go and it went home" is never a surprise.
const RELEASE_COMMIT = 0.62
// The inverse of `pullFrom` — the release drives `pullTop` directly and has to keep the pixel
// accumulator honest, or a new gesture would resume from the wrong place.
const accumFor = (p) => deadZone() + Math.pow(Math.min(1, Math.max(0, p)), 1 / PULL_GAMMA) * (threshold() - deadZone())
const RELEASE_STEP = 0.055   // per frame, springing back — about 210ms from just under the commit
// ⚠️ THE FINISH DECELERATES. A flat step covered the last stretch at a constant rate and arrived at
// full speed, which after a slow scrub reads as the animation being taken away and played — the
// exact complaint the scrub was built to answer. Closing a fraction of the REMAINING distance each
// frame eases out on its own: about 450ms from the commit point, fastest at the moment you let go
// and slowest as it lands.
const SETTLE_EASE = 0.085    // fraction of what is left, per frame
// ⚠️ THE RETURN COMMITS BEFORE ITS LAST FEW PERCENT, for the same reason the bottom exit does at
// `COMMIT_AT`. The settle closes a FRACTION of what is left each frame (AUDIT #95, so it
// decelerates instead of arriving at full speed), which makes the tail an exponential creep — and
// a creep hands `endBack` a deck that has already stopped. Committing here leaves it moving.
// ⚠️ 0.08 of the PULL is not 8% of anything anyone can see. Everything on this scrub runs through
// a smoothstep, which is flat at its end: `ease(0.92)` is 0.9814, so the pose, tilt and background
// jump under 2% of their range. The rotation jumps more (~4% of the turn, because it blends in
// linear travel — see BACK_SPIN_CARRY) and that is the point: the render lerp turns that into
// velocity rather than a snap, which is the momentum `BACK_FOLLOW` then carries.
// Measured travel after the commit: 154.5° at 0.004, 164.0° here, against 141.5° before any of it.
const SETTLE_SNAP = 0.08     // hand over to endBack's follow-through this close to 1

let releaseRaf = 0
function releasePull() {
  cancelAnimationFrame(releaseRaf)
  if (!pullTop.value) { pushPull(); return }
  if (pullTop.value >= RELEASE_COMMIT) { settlePull(); return }
  const step = () => {
    pullTop.value = Math.max(0, pullTop.value - RELEASE_STEP)
    topAccum = accumFor(pullTop.value)
    pushPull()
    if (pullTop.value > 0) releaseRaf = requestAnimationFrame(step)
  }
  releaseRaf = requestAnimationFrame(step)
}

// Released past the commit: carry the same scrub the rest of the way and go. ⚠️ Still the SAME
// function — `setBackProgress` through `pushPull` — so the finish is the tail of the motion the
// visitor was driving and not a separate animation played over it. A new gesture interrupts it
// (both input handlers cancel `releaseRaf`) right up until `doExit` fires.
function settlePull() {
  const step = () => {
    const left = 1 - pullTop.value
    pullTop.value = left <= SETTLE_SNAP ? 1 : pullTop.value + left * SETTLE_EASE
    topAccum = accumFor(pullTop.value)
    pushPull()
    if (pullTop.value < 1) releaseRaf = requestAnimationFrame(step)
    else doExit()
  }
  releaseRaf = requestAnimationFrame(step)
}

// The cue retires on the first real scroll; the two pulls are 0→1 toward the homepage.
// ⚠️ `cueReady` is the SETTLE, not the mount. The select takes ~1.5s to turn the card you clicked
// into this page, and a "read on" sitting over the middle of that is telling you to scroll
// something that has not arrived. Set from the same poll that opens scrolling.
const cueReady = ref(false)
const cueSeen = ref(false)
// 0 inside the hero, 1 once the article is what passes under the nav. Ramped across the
// second half of the first screen, so it is fully on before any copy can reach the chrome.
const topVeil = ref(0)
const pullTop = ref(0)
const pullBottom = ref(0)
// A section asking to be scrolled to (see the listener registered in onMounted).
// ⚠️ Ignored while the page is leaving: a jump during the outro would fight the exit,
// which is itself a scroll position.
function onScrollTo(e) {
  const el = e.detail?.el
  if (!el || !lenis || exiting) return
  lenis.scrollTo(el, { duration: 1.1 })
  e.detail.handled = true
}

const pageEl = ref(null)
const scrollEl = ref(null)
const outroEl = ref(null)
let lenis = null

// Exit gestures (current). TOP edge: overscroll UP past EXIT_THRESHOLD → navigate home, and app.vue's
// route watcher runs scene.deselectChapter() (hero shrinks, ring reverse-spins back). Seamless because
// at scroll 0 you're already looking at the WebGL hero through the transparent .chapter-hero.
// BOTTOM exit is being REBUILT scroll-driven (per the reference: the page scrolls fully out and a ring
// "outro" section scrolls in) — see docs/PHASE-2-INNER-PAGES.md. Until then the bottom edge is inert
// (use the top edge, the back button, or the nav logo to leave).
// ⚠️ A LONG PULL, DELIBERATELY. This is no longer a trigger — it is the LENGTH OF THE ANIMATION.
// Every pixel scrubs the whole return (see `pushPull`), so the threshold is how much gesture the
// visitor gets to spend watching the chapter fold back into the deck, and how much room they have
// to change their mind. 420px was right for a charge-and-fire; it is over in a blink as a scrub.
// ⚠️ AND IT HAS TO BE REACHABLE IN ONE ORDINARY GESTURE. 1150 was not: a mouse wheel moves ~120px
// a notch and a thumb swipes ~200px, and `releasePull` threw the whole journey away the moment the
// gesture ended — so every notch and every swipe drew a little of the return and then wound it
// back. Measured on the shipped build: seven consecutive 200px swipes each peaked at p=0.59 and
// each sprang to 0; six wheel notches 900ms apart each peaked at 0.10 and each sprang to 0. The
// return was unreachable by anything but one unbroken trackpad flick. See RELEASE_COMMIT below —
// letting go past that point FINISHES it — and these are sized so one comfortable gesture gets
// there: 560px of wheel (≈4.7 notches, or one flick) and 182px of thumb.
const EXIT_THRESHOLD = 860  // px of overscroll past the TOP edge — the full length of the return
// ── resistance ───────────────────────────────────────────────────────────────
// ⚠️ THE RETURN SHOULD COST SOMETHING. Straight px ÷ length made the first notch at the top edge
// move the whole chapter, so brushing the top while reading started the page folding away. Two
// things stand in the way now, and neither is a delay — both are things you can feel:
//   • A DEAD ZONE. The first stretch of overscroll does nothing at all, so the top edge is a wall
//     before it is a handle and an accidental nudge cannot begin the return.
//   • A GAMMA. Past the dead zone, progress is `u ^ PULL_GAMMA` with the exponent above 1, so the
//     early travel buys less than the late travel: it takes real effort to get the return moving
//     and then it comes with you. That is what a spring feels like.
// ⚠️ These are load-bearing on reachability — see AUDIT #88, where the return was unreachable for
// two days. Every change here has to be re-measured against a 200px thumb swipe and a wheel roll.
// ⚠️ RAISED 2026-09-16 (user: "make reverse scroll a little more resistive"). Re-measured
// against the reachability floor that #88 was about — the commit point is now 208px of thumb
// (was 179) and ~666px of wheel, about 5.5 notches (was 589, 4.9). One ordinary swipe still
// arrives; a brush against the top edge is now a wall rather than a handle.
const DEAD_WHEEL = 110       // px of overscroll that buys nothing
const DEAD_TOUCH = 45
const PULL_GAMMA = 1.6
const deadZone = () => (touchMode ? DEAD_TOUCH : DEAD_WHEEL)
function pullFrom(px) {
  const d = deadZone()
  const u = Math.min(1, Math.max(0, (px - d) / Math.max(1, threshold() - d)))
  return Math.pow(u, PULL_GAMMA)
}
// ── the two stages ───────────────────────────────────────────────────────────
// ⚠️ THE PAGE STAYS A PAGE UNTIL THE RING HAS CLOSED. User: "would be even better to see the
// animation complete within the page before reversing the card back into homepage." So the pull is
// in two halves and the SCENE does not move at all in the first one: the veil washes down and the
// loader draws and completes, with the chapter still whole under it; only past this does the card
// begin folding back into the deck. The cue gets its own 0→1 over the first stage (`homeCue`) while
// the veil keeps the raw pull, which is why there are two shared values rather than one.
const FOLD_FROM = 0.5
// ── the band ───────────────────────────────────────────────────────
// ⚠️ THE PAGE IS THE INDICATOR NOW. User, 2026-09-16: "sliding down from the top of a card to go
// back to home does the right thing with the animation, but it isn't clear enough. Let's actually
// use the page itself to show the return … move the picture down (on mobile), add the text/circle
// animation as a line on top of the page while it moves down, then take it out when the animation
// completes."
// So stage one no longer washes a veil over everything (that was AUDIT #89's near-miss, and it
// muted the very thing the visitor is driving). Instead the hero card AND the article slide DOWN
// together by `bandPx`, opening a band of the chapter's accent at the top of the frame — and the
// return's line lives in that band, where the wordmark was. Pulling literally opens the door you
// are leaving by.
// ⚠️ The card is moved by the SCENE (`setHeroPull`), not by CSS: at scroll 0 the top of the frame
// IS the WebGL card seen through a transparent `.chapter-hero`, so moving the DOM alone would move
// nothing anyone can see. The DOM shift is for the sliver of article that can be on screen inside
// TOP_EDGE, so the two never separate.
// ⚠️ It opens over the FIRST STAGE ONLY and then holds: past FOLD_FROM the card is folding back
// into the deck and a band that kept growing would just be pushing a shrinking card around.
const BAND_MAX = () => Math.max(96, Math.min(176, Math.round(window.innerHeight * 0.22)))
const bandPx = () => BAND_MAX() * Math.min(1, pullTop.value / FOLD_FROM)
let topAccum = 0             // top overscroll accumulator — the scrub's position, in px
let touching = false         // a finger is down right now
// ⚠️ NOT `touching`. The release runs AFTER touchend, so reading "is a finger down" there picked
// the wheel's threshold to rescale a pull that had been measured against the thumb's.
let touchMode = false        // the last gesture was a finger — so the touch threshold is in play
const threshold = () => (touchMode ? EXIT_THRESHOLD_TOUCH : EXIT_THRESHOLD)
let lastWheelT = 0           // last wheel-event time — a gap means a new gesture
let wheelIdle = null         // …and the timer that notices the gap when no further event comes
let exiting = false          // an exit committed (navigating home) — lock out further input
let ready = false            // select-in settled — scroll + exit gestures enabled
let readyPoll = null
let settleTries = 0          // waitSettled attempts — bounded so a failed scene can't freeze the page
const SETTLE_DEADLINE = 40   // ~8s at 200ms/try before we enable scroll without the select-in handoff

// Scroll-driven BOTTOM exit (the reference's "outro" section). As you scroll the article into the
// transparent .chapter-outro, scroll position maps to `de` → scene.setExitProgress. The article FULLY
// scrolls out over [outroTop-vh, outroTop] (de 0→DROP_START) while the ring spins on the accent bg with
// the wine slot empty; then over [outroTop, limit] (de DROP_START→1) the wine card drops from the top.
// Reversible (scroll back up → cancelExit restores the article); de→1 (page bottom) commits + navigates.
const DROP_START = 0.45      // de at which the page is fully out → the drop begins (MATCH useChapterScene.js)
// ⚠️ THE EXIT COMMITS BEFORE THE PAGE'S LAST PIXEL. Lenis eases into the bottom of a scroller, so
// the final ~80px produce almost no `de` — the deck arrived at the homepage already stopped, and the
// next wheel notch (the homepage rotates ~3× faster per pixel than the exit does) made it leap. That
// velocity step is what read as a stutter at the handover. Committing here leaves the deck with
// somewhere to go, and `endExit(true)` carries it the rest of the way on a tween.
const COMMIT_AT = 0.955
// ⚠️ NOT `<= 2`. Lenis EASES into the top rather than landing on it — traced coming up from a read:
// 47 → 17 → 7 → 3 → 1 over four notches, all of them after the page had visibly stopped moving. At a
// 2px tolerance those four notches did nothing at all, which reads as the top edge being dead. The
// pull engages inside this band and snaps the scroller to 0 as it does, so nothing is left hanging.
const TOP_EDGE = 8
let exitEngaged = false      // beginExit() has fired (the ring is reassembling under the scroll)

function onWheel(e) {
  if (!ready || !lenis || exiting) return
  // Normalize deltas: Firefox fires deltaMode=1 (lines, ~3 per notch) — comparing raw line counts
  // against a pixel threshold made exits near-unreachable there. ~40px/line ≈ Chrome's ~120px notch.
  const dy = e.deltaY * (e.deltaMode === 1 ? 40 : e.deltaMode === 2 ? window.innerHeight : 1)
  touchMode = false
  const now = performance.now()
  // ⚠️ 700ms, not 400: a trackpad pauses mid-gesture more than that and the charge was being
  // thrown away under a finger that had not left the pad.
  // ⚠️ A GESTURE GAP RELEASES THE PULL, IT DOES NOT ERASE IT. Zeroing the accumulator snapped the
  // whole scene home in one frame; the release springs it back instead, through the same function.
  if (now - lastWheelT > 700 && topAccum > 0) releasePull()
  lastWheelT = now
  // ⚠️ AND IT NEEDS A TIMER, not just the next event's timestamp. A wheel has no "end": stop
  // scrolling and no further events arrive, so a check that lives inside the handler never runs and
  // a half-drawn return sat there indefinitely — the same shape as AUDIT #62 on touch.
  clearTimeout(wheelIdle)
  wheelIdle = setTimeout(() => { if (topAccum > 0) releasePull() }, 700)
  if (lenis.scroll <= TOP_EDGE) {
    // ⚠️ SIGNED, NOT ONE-WAY. `-dy` is positive pulling up and negative pushing back down, so the
    // scrub runs both ways under the same gesture — which is the whole of "I can actually reverse
    // it". Clamped at 0, where `pushPull` hands the page back to the scroll coupling.
    cancelAnimationFrame(releaseRaf)
    topAccum = Math.max(0, topAccum - dy)
    pullTop.value = pullFrom(topAccum)
    pushPull()
    if (pullTop.value >= 1) doExit()
  } else if (topAccum > 0) {
    releasePull()
  }
}

// Touch equivalent of the TOP-edge exit (mobile) — without this the only way off a chapter on a
// phone was the nav logo. A finger covers ground faster than a wheel, so the same journey is a
// shorter number. (The BOTTOM exit needs nothing extra: it's driven by Lenis scroll position,
// which native touch scrolling already produces.)
const EXIT_THRESHOLD_TOUCH = 265
let touchLastY = 0
function onTouchStart(e) {
  const t = e.touches[0]
  if (!t) return
  touching = true
  touchMode = true
  touchLastY = t.clientY
  cancelAnimationFrame(releaseRaf)            // a new finger takes over from a spring-back
}
function onTouchMove(e) {
  if (!ready || !lenis || exiting) return
  const t = e.touches[0]
  if (!t) return
  const dy = touchLastY - t.clientY           // negative ⇒ dragging the page DOWN (scrolling up)
  touchLastY = t.clientY
  touchMode = true
  if (lenis.scroll <= TOP_EDGE) {
    topAccum = Math.max(0, topAccum - dy)     // signed — see the note in onWheel
    pullTop.value = pullFrom(topAccum)
    pushPull()
    if (pullTop.value >= 1) doExit()
  } else if (topAccum > 0) {
    releasePull()
  }
}

// ⚠️ The pull has to RELEASE — a value driven by a move handler needs an end handler, or it is only
// ever correct mid-gesture (AUDIT #62). It springs back rather than snapping: the scene is scrubbed
// to wherever the pull is, so zeroing it in one frame would teleport the whole chapter home.
function onTouchEnd() {
  touching = false
  releasePull()
}

// TOP edge → the scrub has already reached 1, so the scene is home; this only finalizes the flags
// and navigates. ⚠️ `endBack()` BEFORE the push, exactly as the bottom exit does: it clears
// `selectedIndex`, which is what stops app.vue's route watcher firing a second, animated deselect
// over the top of a return that has already happened.
function doExit() {
  if (exiting) return
  exiting = true
  lenis?.stop()
  cancelAnimationFrame(releaseRaf)
  webglSceneRef?.value?.scene?.endBack?.()
  backEngaged = false
  navLeaving.value = true   // hold the veil across the route change — SiteNav fades it and clears this
  router.push('/')
}

// ── nav legibility ──────────────────────────────────────────────────────────
// ⚠️ The nav is inked in the chapter's `accent`, and TWO backgrounds on every
// chapter page are that same accent: In Frames' room, and the exit background the
// scene paints behind the ring as you scroll off the bottom. Where they meet, the
// nav disappears — measured contrast ratios of 1.08 on With Love and The Big Day,
// 1.33 on In Frames, 1.46 on US. This flag flips it to `accentLight` over those,
// and `SiteNav` reads it. Shared state rather than props because the page owns the
// scroll and the nav is mounted a level above it.
const navOnDark = useState('navOnDark', () => false)

// ⚠️ MEASURED, not guessed. The first attempt keyed this off "In Frames is a dark
// chapter" and "the exit has begun", and both were wrong: In Frames' page ground is
// its LIGHT tone and only the room section is dark, and the exit spends its first
// half scrolling the article out over a light background. The nav flipped to light
// while the ground was still light — contrast 1.02–1.07, no better than before.
// So: read what is ACTUALLY behind the nav. Walk the elements under the nav's
// centre point, skip the nav itself, and take the first one with an opaque
// background. The WebGL canvas has no CSS background, so the exit — which paints
// the chapter accent through the renderer's clear colour — is OR'd in separately.
const NAV_PROBE_Y = 10
function syncNavInk() { navOnDark.value = groundIsDark() }
function groundIsDark() {
  if (!import.meta.client) return false
  const els = document.elementsFromPoint(Math.round(window.innerWidth / 2), NAV_PROBE_Y)
  for (const el of els) {
    if (el.closest('.\\!fixed')) continue          // the nav's own fixed bars
    if (el === document.body || el === document.documentElement) break
    const bg = getComputedStyle(el).backgroundColor
    const m = bg.match(/[\d.]+/g)
    if (!m) continue
    if (m.length > 3 && Number(m[3]) < 0.5) continue  // see-through, keep walking
    // ⚠️ TWO COMPONENT SCALES. `rgb()/rgba()` computes to 0–255, but anything written with
    // `color-mix()` — which is how the chapter tints are blended — computes to
    // `color(srgb r g b / a)` with components in 0–1. Read as 0–255 those come out at a
    // luminance of ~0.003, i.e. BLACK, so the nav flipped to its light ink over a pale panel
    // and vanished. Measured on With Love's cash panel: wordmark rgb(232,237,242) on a
    // rgb(232,237,242) ground.
    const k = bg.startsWith('color(') ? 255 : 1
    const lum = (c) => { const v = (c * k) / 255; return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4 }
    return 0.2126 * lum(+m[0]) + 0.7152 * lum(+m[1]) + 0.0722 * lum(+m[2]) < 0.35
  }
  // Nothing opaque in the DOM means we are looking straight at the canvas — and WHICH canvas
  // matters.
  // ⚠️ INSIDE THE HERO THE CANVAS IS THE CARD, NOT THE CLEAR COLOUR. A selected chapter's clear
  // colour is its ACCENT (it is what fills beneath the card on a phone), and the select fades it
  // in over 1.4s — so this fallback was answering "dark" for a nav sitting on the card's own PALE
  // title band, and answering it DIFFERENTLY from run to run depending where in that 1.4s the
  // 400ms probe happened to land. Measured on one build, one route, two frame sizes: dark ink at
  // 1440x900 and light ink, invisible on pale green, at 1920x1080.
  // Inside the hero the answer is known without probing anything — every chapter's card is printed
  // on that chapter's light tone — and past the hero the article's own opaque background is under
  // the nav, so the walk above returns before it ever reaches this line. What is left is the exit,
  // where the card has gone and the accent really is the ground: the case this was written for.
  // ⚠️ THE BAND IS THE CHAPTER ACCENT, AND ALL FOUR ACCENTS ARE DARK (#41492D, #42221A, #453350,
  // #2E4A52). Once the pull has opened it past the nav's own probe line the nav is sitting on that
  // accent, not on the card's pale title band — so the hero shortcut below would ink it dark on
  // dark. This is the one case where the ground genuinely changes without the scroll moving.
  if (backEngaged && bandPx() > NAV_PROBE_Y) return true
  if (!exitEngaged && lenis && lenis.scroll < window.innerHeight * 0.9) return false
  return !!webglSceneRef?.value?.scene?.clearIsDark?.()
}

// BOTTOM exit — driven by scroll position within the .chapter-outro section.
function updateExit(scrollY) {
  if (!ready || exiting || !lenis) return
  const outro = outroEl.value
  const scene = webglSceneRef?.value?.scene
  if (!outro || !scene?.setExitProgress) return
  const vh = window.innerHeight
  const outroTop = outro.offsetTop      // the article is fully scrolled out at this scroll position
  const end = lenis.limit               // page bottom
  let de
  if (scrollY < outroTop) {
    de = Math.max(0, (scrollY - (outroTop - vh)) / vh) * DROP_START          // article scrolling out
  } else {
    const span = Math.max(1, end - outroTop)
    de = DROP_START + Math.min(1, (scrollY - outroTop) / span) * (1 - DROP_START)  // the drop
  }
  // The exit background is the chapter accent, so the nav must go light over it.
  if (de <= 0) {
    if (exitEngaged) { scene.cancelExit?.(); exitEngaged = false }  // scrolled back up into the article
    pullBottom.value = 0
    return
  }
  if (!exitEngaged) {
    if (!scene.beginExit?.()) return   // capture the selected/scrolled state + start the reassembly
    exitEngaged = true
  }
  scene.setExitProgress(de)
  // ⚠️ THE RING CLOSES EXACTLY AS THE PAGE LEAVES THE FRAME. `DROP_START` is the `de` at which the
  // article has fully scrolled out, so that is the moment the ring is describing and that is where
  // it completes — not 0.50, and not still filling over the deck afterwards. It then gets out of
  // the way inside a tenth of `de`: past that point the deck coming up to meet you says it better
  // than a progress ring can, and a ring left over the spinning deck reads as a loading spinner.
  // ⚠️ NO FADE-OUT any more. The cue is part of the page now, so it leaves the frame by scrolling
  // off the top with everything else; fading it as well would only mean the ring un-drew itself in
  // the instant before it went, and un-drew visibly on the way back up.
  pullBottom.value = Math.max(0, Math.min(1, (de - 0.03) / (DROP_START - 0.03)))
  if (de >= COMMIT_AT) commitExit()
}

// ⚠️ Is the article's own background over the canvas? `.chapter-hero` (100dvh) and
// `.chapter-outro` are both TRANSPARENT — the scene shows through them — but everything between
// is `.chapter-content`, which is opaque and fills the fixed page. Through that whole stretch,
// which on these pages is several screens, the canvas is drawing for nobody. Telling the scene
// lets it skip the draw and keep every other update, so nothing is out of place when the outro
// uncovers it.
function syncCanvasCover(scrollY) {
  const outro = outroEl.value
  const scene = webglSceneRef?.value?.scene
  if (!scene?.setCanvasHidden) return
  const vh = window.innerHeight
  scene.setCanvasHidden(!!outro && scrollY >= vh + 2 && scrollY < outro.offsetTop - vh)
}
function commitExit() {
  if (exiting) return
  exiting = true
  pullBottom.value = 0
  const scene = webglSceneRef?.value?.scene
  // ⚠️ NO `setExitProgress(1)` FIRST. It used to snap the pose to its final frame before finalizing,
  // which now means cutting the catch — the give the landing puts through the deck — off mid-swing.
  // `endExit(true)` finalizes from wherever the scroll actually left it and rides the rest out.
  scene?.endExit?.(true)    // finalize the homepage ring (selectedIndex=-1) BEFORE navigate so the…
  router.push('/')          // …route watcher won't also fire deselectChapter
}

onMounted(() => {
  if (!chapter.value) { navigateTo('/'); return }

  const scene = webglSceneRef?.value?.scene

  // Lenis drives the inner page's smooth scroll (the single clock). Each scroll
  // tick we feed the position to the scene, which moves the hero card up in
  // lockstep — the card "scrolls away" instead of being overlaid (P1). autoRaf
  // runs Lenis's own rAF; the scene reads the value in its render loop.
  lenis = new Lenis({
    wrapper: pageEl.value,
    content: scrollEl.value,
    autoRaf: true,
  })
  lenis.on('scroll', (e) => {
    scene?.setScroll(e.scroll); syncNavInk(); updateExit(e.scroll); syncCanvasCover(e.scroll)
    if (!cueSeen.value && e.scroll > 40) cueSeen.value = true
    const vh = window.innerHeight || 800
    topVeil.value = Math.max(0, Math.min(1, (e.scroll - vh * 0.55) / (vh * 0.3)))
    // Left the top edge — whatever the pull had reached is no longer true.
    if (e.scroll > 2 && topAccum > 0) releasePull()   // scrolled away from the top edge
  })
  // ⚠️ Also on arrival: a chapter selected at scroll 0 already has the accent
  // painted behind the transparent hero, so the nav can be invisible before the
  // visitor has scrolled at all. And `updateExit` early-returns in several states,
  // which is why this cannot live inside it.
  syncNavInk()
  setTimeout(syncNavInk, 400)
  scene?.setScroll(0)

  // ⚠️ THE ONE WAY A SECTION MOVES THIS PAGE. Lenis owns the scroller, and anything that sets
  // scrollTop behind it — a native in-page anchor, scrollIntoView, window.scrollTo — is reverted
  // on Lenis's next frame. A section that wants to jump somewhere (With Love's registry sends you
  // down to the accounts) dispatches this instead of scrolling, and sets `handled` so the sender
  // knows not to fall back to the native behaviour it would otherwise need off this page.
  pageEl.value?.addEventListener('chapter:scrollto', onScrollTo)

  // Hold scrolling until the select-in animation settles. Scrolling mid-select used
  // to (a) bank scrollOffsetPx that snapped the hero the moment isSelecting cleared
  // (teleport), and (b) let an accidental up-wheel trigger the top exit during entry.
  lenis.stop()
  const waitSettled = () => {
    const st = webglSceneRef?.value?.scene?.getState?.()
    // Strict: THIS chapter selected and fully settled. (`selectedIndex !== -1` alone
    // passes during a mid-flight deselect of the same chapter — back-then-forward —
    // which would open scrolling/exits during the resync re-select.)
    const settled = st && st.introComplete && st.selectedIndex === chapter.value?.index &&
        !st.isSelecting && !st.isDeselecting
    if (settled) {
      ready = true
      lenis?.start()
      // A beat after the card lands, so the cue arrives rather than appears.
      setTimeout(() => { cueReady.value = true }, 420)
    } else if (settleTries >= SETTLE_DEADLINE) {
      // Deadline fallback: if the scene never settles (e.g. WebGL init threw, so introComplete
      // never flips), don't leave the page frozen with Lenis stopped — enable scroll + the
      // edge-exit gestures so the (DOM) content is readable and the user can navigate home.
      console.warn('[chapter] scene did not settle in time — enabling scroll without the select-in handoff')
      ready = true
      lenis?.start()
      cueReady.value = true
    } else {
      settleTries += 1
      readyPoll = setTimeout(waitSettled, 200)
    }
  }
  waitSettled()

  pageEl.value?.addEventListener('wheel', onWheel, { passive: true })
  pageEl.value?.addEventListener('touchstart', onTouchStart, { passive: true })
  pageEl.value?.addEventListener('touchmove', onTouchMove, { passive: true })
  pageEl.value?.addEventListener('touchend', onTouchEnd, { passive: true })
  pageEl.value?.addEventListener('touchcancel', onTouchEnd, { passive: true })

  // Track the active section for the floating popup cards (the most in-view section wins).
  if (pageContent.value && pageEl.value) {
    sectionObserver = new IntersectionObserver(
      (entries) => {
        // Ratio is measured against the VIEWPORT, not the section: a section taller than
        // viewport/0.45 could never reach the old element-relative threshold, so its popups
        // silently never showed (The Big Day's 250vh knot scene is exactly that case).
        for (const e of entries) {
          const vh = e.rootBounds?.height || window.innerHeight
          sectionRatios.set(+e.target.dataset.idx, e.intersectionRect.height / vh)
        }
        let best = -1, bestR = 0.45
        sectionRatios.forEach((r, idx) => { if (r >= bestR) { bestR = r; best = idx } })
        activeIdx.value = best
      },
      { root: pageEl.value, threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1] }
    )
    pageEl.value.querySelectorAll('.chapter-section').forEach((el) => sectionObserver.observe(el))
  }
})

onBeforeUnmount(() => {
  navOnDark.value = false   // the homepage has no dark ground
  // …and no pull in progress (unless one is landing, which SiteNav plays out and then clears)
  if (!navLeaving.value) { navPull.value = 0; navCue.value = 0 }
  pageEl.value?.removeEventListener('wheel', onWheel)
  pageEl.value?.removeEventListener('touchstart', onTouchStart)
  pageEl.value?.removeEventListener('touchmove', onTouchMove)
  pageEl.value?.removeEventListener('chapter:scrollto', onScrollTo)
  pageEl.value?.removeEventListener('touchend', onTouchEnd)
  pageEl.value?.removeEventListener('touchcancel', onTouchEnd)
  sectionObserver?.disconnect()
  if (readyPoll) clearTimeout(readyPoll)
  clearTimeout(wheelIdle)
  cancelAnimationFrame(releaseRaf)
  // Leaving mid-exit (e.g. the back button while in the outro) → finalize to a clean homepage ring.
  if (exitEngaged && !exiting) webglSceneRef?.value?.scene?.endExit?.()
  lenis?.destroy()
  lenis = null
  webglSceneRef?.value?.scene?.setScroll(0)
  webglSceneRef?.value?.scene?.setHeroPull?.(0)
  // The band is a document-level custom property and a transform on the scrolled element: both
  // outlive this component unless they are put back. A stale `--band` would size the next
  // chapter's cue against a pull that is over.
  if (import.meta.client) document.documentElement.style.setProperty('--band', '0px')
  if (scrollEl.value) scrollEl.value.style.transform = ''
  // ⚠️ ALWAYS. A `true` left behind here would follow the visitor to the homepage, which has no
  // page to clear it, and blank the canvas.
  webglSceneRef?.value?.scene?.setCanvasHidden?.(false)
})
</script>

<style scoped>
/* Full-screen scroll container above the canvas/hit-layer (z-5) but below the
   nav (z-20) and About panel (z-50). */
.chapter-page {
  position: fixed;
  inset: 0;
  z-index: 10;
  /* `inset: 0` already sizes this to the fixed-position viewport. An explicit 100dvh on top of
     it fights iOS Safari, whose dynamic viewport changes as the URL bar shows/hides — which
     left the page offset from the canvas on entry. Percentage of the inset box is stable. */
  height: 100%;
  overflow-x: hidden;
  overflow-y: auto;
}
/* Lenis adds .lenis-smooth to the wrapper — kill native smooth so it doesn't fight. */
.chapter-page.lenis-smooth {
  scroll-behavior: auto;
}

/* The single scrolled content element (Lenis `content`). */
.chapter-scroll {
  position: relative;
  width: 100%;
}

/* Transparent hero — the WebGL hero shows through here. */
.chapter-hero {
  height: 100dvh;
}

/* Scroll-driven exit "outro" — transparent, so the WebGL ring (on the accent bg) shows through as the
   article scrolls out above it. 1vh of that is the article leaving; the REST is the drop.
   ⚠️ 250vh gave the drop 150vh of scroll, which was fine while the ring also had to unfurl and rise
   through it. It does not any more — the ring is finished before it is uncovered — so 150vh of scroll
   for one falling card was a long wait with nothing else happening. 200vh ⇒ 100vh of drop. */
.chapter-outro {
  height: 200vh;
}

/* Content scrolls up over the (fixed) WebGL hero on the chapter's light accent. */
.chapter-content {
  background: var(--accentLight, #F2EEE8);
}

/* ── the scroll cue ──────────────────────────────────────────────────────────
   The first inch of the thread: a hairline that draws itself down the page and waits. Same pen as
   the knot on The Big Day and the flourishes on this chapter — which is the point, because the rail
   and bouncing dot this replaces belonged to no page in particular. ⚠️ Below `.popup-stack` (15)
   and clear of it: both live at the bottom centre. */
.scroll-cue {
  position: fixed;
  left: 50%;
  bottom: 2.4rem;
  transform: translateX(-50%) translateY(0.9rem);
  z-index: 14;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.9s ease, transform 0.9s cubic-bezier(0.2, 0.72, 0.24, 1);
}
/* Arrives only once the card has finished becoming the page — see the template. */
.scroll-cue.ready { opacity: 1; transform: translateX(-50%) translateY(0); }
.scroll-cue.ready.gone { opacity: 0; transform: translateX(-50%) translateY(0.7rem); }
.cue-thread { width: 1.6rem; height: 4.9rem; display: block; overflow: visible; }
.cue-ghost {
  fill: none;
  stroke: currentColor;
  stroke-width: 1;
  vector-effect: non-scaling-stroke;
  stroke-linecap: round;
  opacity: 0.24;
}
.cue-ink {
  fill: none;
  stroke: currentColor;
  /* ⚠️ `non-scaling-stroke`: a stroke-width is meaningless without its viewBox scale, and 1.15
     in a 24-unit box drawn at 1.5rem is not 1.15px. This pins it to the site's hairline. */
  stroke-width: 1.15;
  vector-effect: non-scaling-stroke;
  stroke-linecap: round;           /* the round cap IS the nib — it draws its own pen tip */
  stroke-dasharray: 1;
  stroke-dashoffset: 1;
  animation: cue-draw 3.4s cubic-bezier(0.38, 0.1, 0.26, 1) infinite;
}
/* Draw, hold, lift. ⚠️ Opacity is 0 at both ends of the cycle, which is what makes the
   dashoffset snapping back to 1 invisible — there is no reset to see. */
@keyframes cue-draw {
  0%   { stroke-dashoffset: 1; opacity: 0; }
  8%   { opacity: 0.95; }
  48%  { stroke-dashoffset: 0; opacity: 0.95; }
  84%  { stroke-dashoffset: 0; opacity: 0.95; }
  100% { stroke-dashoffset: 0; opacity: 0; }
}
/* ⚠️ THE WORD DOES NOT BLINK. It was faded in and out on the stroke's cycle, which left the whole
   cue reading as nothing at all for about a second in every three — the exact complaint the rail
   and dot earned. The pen is the motion; the word is just there. */
.cue-label {
  font-size: 0.7rem;
  letter-spacing: 0.34em;
  text-indent: 0.34em;             /* tracking adds a trailing gap; this re-centres the word */
  opacity: 0.92;
}

/* ── "back to the chapters" — the last thing on the page ─────────────────────
   In the flow, on the page's own paper, in the page's own ink. It is the chapter's closing line
   with a ring under it; the ring closes as the page leaves. ⚠️ NOT `fixed` and NOT tied to `--p`
   for its visibility: at rest, halfway down the footer, it is simply there. Only the ring's
   circumference reads the exit. */
/* Below the nav (z 20), above everything the page draws — including the popups (15) and the
   scroll cue (14), both of which would otherwise pass under the chrome too. */
.top-veil {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 8.5rem;
  z-index: 18;
  pointer-events: none;
  background: linear-gradient(
    to bottom,
    var(--accentLight, #F2EEE8) 0%,
    var(--accentLight, #F2EEE8) 46%,
    color-mix(in srgb, var(--accentLight, #F2EEE8) 55%, transparent) 72%,
    transparent 100%
  );
  transition: opacity 0.25s linear;
}
@media (max-width: 640px) { .top-veil { height: 7rem; } }

.leave-cue {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.9rem;
  padding: 0 8vw 9vh;
  background: var(--accentLight, #F2EEE8);
  color: var(--accent, #333);
  text-align: center;
}
.leave-label {
  font-family: 'Bague', sans-serif;
  font-size: 0.7rem;
  letter-spacing: 0.28em;
  text-transform: uppercase;
  /* AUDIT #107: the quiet voice has a floor — 0.82 clears 4.5:1 on every chapter ground. */
  opacity: 0.82;
}
.leave-ring { position: relative; display: block; width: 2.75rem; height: 2.75rem; }
.leave-ring svg { width: 100%; height: 100%; display: block; overflow: visible; }
.leave-track, .leave-draw { fill: none; stroke: currentColor; }
/* ⚠️ `non-scaling-stroke`, NOT a tuned number. A stroke-width is meaningless without its viewBox
   scale — 1.15 in a 44-unit box drawn at 2.75rem is not 1.15px, and changes again with the root
   size. This pins it to the hairline the rest of the site's ink is drawn at. */
.leave-track { stroke-width: 1; vector-effect: non-scaling-stroke; opacity: 0.28; }
.leave-draw {
  stroke-width: 1.15;
  vector-effect: non-scaling-stroke;
  stroke-linecap: round;
  stroke-dasharray: 125.664;                 /* 2πr, r = 20 */
  stroke-dashoffset: calc(125.664 * (1 - var(--p, 0)));
  transform: rotate(-90deg);                 /* start at 12 o'clock */
  transform-origin: 50% 50%;
  opacity: 0.8;
}
.leave-chev {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0.44rem;
  height: 0.44rem;
  margin: -0.16rem 0 0 -0.22rem;
  border-left: 1px solid currentColor;
  border-top: 1px solid currentColor;
  transform: rotate(225deg);
  opacity: 0.5;
}

/* ── the ink ──────────────────────────────────────────────────────────────────
   ⚠️ THERE IS NO KNOWING WHAT IS BEHIND THESE, and that is why the first pass was invisible. Every
   chapter's hero is its CARD blown up to fill the frame, so what lands under a cue depends on the
   card, on the orientation, and — once the film starts — on the frame: measured, the same point is
   pale paper on one hero and a night photograph on another. And the ground cannot be read from the
   DOM, because the hero IS the canvas: `elementsFromPoint` falls straight through it, which is why
   the nav's own probe has to fall back to asking the renderer what colour it cleared to.
     So: near-white with a TIGHT dark outline, the way type is set over photography everywhere. The
   outline is stacked short shadows rather than `-webkit-text-stroke`, which at this size closes up
   the counters. It carries over paper, over a face, and over the accent the exit paints behind the
   deck — and it introduces no box, which this chapter's whole language is against.
   ⚠️ The cues also sit at the BOTTOM for this reason, both of them: the top of the frame is where
   every hero puts its title, and nothing legible survives being set on top of 12vh of Italiana. */
.scroll-cue { color: var(--accentLight, #F6F3EC); }
.cue-label {
  font-family: 'Bague', sans-serif;
  text-transform: uppercase;
  /* ⚠️ The outline can only do so much for the glyph it is drawn around: at 9px with 0.3em of
     tracking there is barely any glyph to outline, and over the palest hero the label stayed
     faint while the ring beside it read fine. The type had to gain some mass first. */
  text-shadow:
    0 0 1px rgba(16, 14, 11, 0.95),
    0 0 1px rgba(16, 14, 11, 0.95),
    0 0 3px rgba(16, 14, 11, 0.8),
    0 1px 8px rgba(16, 14, 11, 0.5);
}
.cue-thread {
  filter: drop-shadow(0 0 1px rgba(16, 14, 11, 0.85)) drop-shadow(0 1px 5px rgba(16, 14, 11, 0.45));
}

@media (max-width: 640px) {
  .scroll-cue { bottom: 1.9rem; }
  .cue-thread { height: 4.1rem; }
  .leave-ring { width: 2.4rem; height: 2.4rem; }
}

@media (prefers-reduced-motion: reduce) {
  /* The stroke is simply drawn, once, and stays. */
  .cue-ink { animation: none; stroke-dashoffset: 0; opacity: 0.9; }
  .cue-ghost { opacity: 0; }
}

/* Floating popup cards — pinned to the VIEWPORT bottom-centre over the content.
   MUST be `fixed`, not `absolute`: .chapter-page is a scroll container (overflow-y: auto), and
   absolutely-positioned children of a scroller scroll WITH the content — so these sat at the
   bottom only at scroll 0 and then slid up and off the top as you read. `fixed` resolves
   against the viewport (no transformed ancestor here — Lenis scrolls .chapter-page natively via
   scrollTop, and these live OUTSIDE .chapter-scroll), so they stay put. */
.popup-stack {
  position: fixed;
  bottom: 1.75rem;
  left: 50%;
  transform: translateX(-50%);
  z-index: 15;
  display: flex;
  gap: 0.75rem;
}
.popups-enter-active,
.popups-leave-active { transition: opacity 0.5s ease, transform 0.5s ease; }
.popups-enter-from,
.popups-leave-to { opacity: 0; transform: translate(-50%, 1.5rem); }

/* Scaffold fallback (unbuilt chapters) */
.chapter-body {
  min-height: 100dvh;
  background: var(--accentLight, #F2EEE8);
  color: var(--accent, #333);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 10vh 8vw;
  text-align: center;
}
.chapter-title {
  font-family: 'Movie', sans-serif;
  font-size: 12vh;
  line-height: 0.9;
  margin: 0;
}
.chapter-note {
  max-width: 42rem;
  margin-top: 2rem;
  font-size: 0.95rem;
  line-height: 1.6;
  opacity: 0.8;
}
</style>
