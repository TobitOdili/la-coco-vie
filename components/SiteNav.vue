<template>
  <div>
    <!-- ⚠️ THE VEIL IS GONE (2026-09-16). A frosted wash over the whole frame was the old answer to
         "show me the return", and the user's verdict was that it "isn't clear enough" — which it
         was not: it dimmed the deck reassembling behind it (AUDIT #89 already had to halve it once)
         and it said nothing about WHERE you were going. The page itself is the indicator now: the
         hero card and the article slide DOWN, opening a band of the chapter accent at the top, and
         `.pull-cue` below is the line that lives in that band. Nothing is painted over anything. -->

    <!-- ⚠️ THE ONLY WAY INTO A CHAPTER WITHOUT A POINTER. The deck is a WebGL canvas: a card is
         not an element, so it cannot be tabbed to, and until this there was no DOM route into any
         chapter at all (AUDIT #105). These are real links to the real routes — the route watcher
         in app.vue drives the same select the click does — visually hidden until one takes focus,
         at which point `.sr-focusable` brings it back on screen so the visitor can see where they
         are. First in the DOM, so it is the first thing Tab reaches. -->
    <nav class="chapter-jump" aria-label="Chapters">
      <ul>
        <li v-for="c in CHAPTERS" :key="c.slug">
          <NuxtLink :to="`/${c.slug}`" class="sr-only sr-focusable">{{ c.title }}</NuxtLink>
        </li>
      </ul>
    </nav>

    <!-- Top navigation bar -->
    <div class="!fixed z-20 top-0 w-full">
      <div class="container flex justify-between mt-2 md:mt-6">
        <!-- Left: About -->
        <!-- ⚠️ A BUTTON, NOT A DIV WITH A CLICK. These three controls — WELCOME, the wordmark and
             the sound toggle — were `<div @click>`, which means no tab stop, no Enter or Space, no
             role and no focus ring: twelve presses of Tab on the homepage reached exactly ONE
             element, the RSVP link, and a keyboard visitor could not open the welcome note, mute
             the music or go home (AUDIT #105). `.menu-item` carries the look; `button` carries the
             behaviour, and `appearance:none` below takes back what the UA stylesheet adds. -->
        <div>
          <button type="button" class="menu-item nav-btn" data-cursor="morph" data-cursor-style="pill" data-cursor-pad="-10" data-cursor-pad-x="12" @click="$emit('toggle-about')">
            <!-- Was `hidden md:block`: on a phone that left an invisible click target and no
                 way into About at all. The reference shows this label at mobile widths too,
                 and it fits (ABOUT + the 136px centre logo + COLLECTION inside 390px). -->
            <span>{{ SITE.nav.aboutLabel }}</span>
          </button>
        </div>
        <!-- Right: Collection link -->
        <div>
          <a
            :href="SITE.nav.collectionUrl"
            rel="noopener noreferrer"
            target="_blank"
            class="menu-item"
            data-cursor="morph"
            data-cursor-style="pill"
            data-cursor-pad="-10"
            data-cursor-pad-x="12"
          >
            <span>{{ SITE.nav.collectionLabel }}</span>
            <svg
              class="h-[12px] w-[12px] lg:h-[14px] lg:w-[14px]"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10.6688 6.27614L4.93109 12.0139L3.98828 11.0711L9.72601 5.33333H4.66883V4H12.0021V11.3333H10.6688V6.27614Z"
              />
            </svg>
          </a>
        </div>
      </div>
    </div>

    <!-- Center logo -->
    <div class="!fixed z-20 top-3 w-full pointer-events-none">
      <div class="container flex justify-center mt-2 md:mt-6">
        <!-- ⚠️ `pointer-events-auto` and the click belong to the WORDMARK ONLY, never
             to this wrapper. The wrapper is as wide as its widest child, and its
             widest child is the countdown line — "OCTOBER 29, 2026 · LAGOS ·
             53 DAYS TO GO" spans ~300px of a 390px phone. Sitting on `top-3` with the
             same `z-20` as the nav bar but LATER in the DOM, that invisible box was
             painted over the WELCOME label and swallowed every tap on it: on a phone
             there was no way into the welcome panel at all. Measured —
             `elementFromPoint` over WELCOME returned this div, not the nav. -->
        <div class="text-center">
          <!-- BRAND WORDMARK — the couple's names. ⚠️ It GIVES WAY to the return cue while a
               top-edge pull is charging (see `.pull-cue` below): the pull opens a band of the
               chapter's accent at the top of the frame, and this is the space inside it. Two things
               in one place is a collision; a handover is not. -->
          <button
            type="button"
            class="wordmark nav-btn whitespace-nowrap text-[17px] lg:text-[26px] pointer-events-auto"
            :style="{ '--wm-ink': navInk, opacity: wordmarkFade, letterSpacing: wordmarkTrack }"
            :aria-label="isHome ? 'Covenant and Uvie' : 'Back to the chapters'"
            @click="$emit('go-home')"
          >
            COVENANT <span class="amp">&amp;</span> UVIE
          </button>
          <!-- ── going back: the veil, and the loader that was the logo ──────────────────────
               ⚠️ THIS IS A SCRUB, NOT A SPINNER. `--p` is how far the top-edge pull has been drawn,
               0→1, and the whole return is scrubbed to the same number — so the veil coming down,
               the ring closing and the chapter folding back into the deck are one motion the
               visitor is driving, reversible at any point.
               The veil washes DOWN FROM THE TOP (a gradient mask whose edge is `--p`), frosting the
               page as it goes; the loader starts where the wordmark is, which fades out under it,
               and travels to the middle of the frame as the veil reaches it. That is the "morph
               from the logo": it begins as the thing it replaces.
               Its twin for the BOTTOM exit lives at the very end of the chapter's own content —
               the two edges leave by different doors and the signpost belongs at each one. -->
          <!-- ⚠️ `homeCue`, NOT `homePull`. The cue runs its whole 0→1 over the FIRST HALF of the
               pull and then holds, because the ring closing is the thing that has to finish while
               the chapter is still a page — the card only starts folding back after it. The veil
               above keeps the raw pull, so the two are deliberately out of step. -->
          <div v-if="homeCue > 0 || homeLeaving" class="pull-cue" :class="{ leaving: homeLeaving }"
            :style="{ '--p': homeLeaving ? 1 : homeCue, '--o': homeLeaving ? 0 : cueOpacity }" aria-hidden="true">
            <!-- ⚠️ A LINE, AND IT GROWS OUT OF THE WORDMARK. The rule extends left and right from
                 exactly where the ampersand sits while the letters around it fade, so the mark does
                 not swap for the loader — it opens into it. The ring is the ampersand's replacement
                 and it is the same optical size at p=0, which is what makes the handover read as
                 one object rather than two. -->
            <span class="pull-rule">
              <i class="rule-seg" />
              <span class="pull-ring">
                <svg viewBox="0 0 44 44" focusable="false">
                  <circle class="pull-track" cx="22" cy="22" r="20" />
                  <circle class="pull-draw" cx="22" cy="22" r="20" />
                </svg>
                <i class="pull-chev" />
              </span>
              <i class="rule-seg" />
            </span>
            <span class="pull-label">back to the chapters</span>
          </div>
          <!-- Countdown (homepage only). ONE wedding as of 2026-09-06 — it counts to the
               white wedding. The rollover logic is kept (see site.config) so a second day
               can return by adding a row. Times in site.config are placeholders. -->
          <div
            v-if="isHome && daysToGo > 0"
            class="countdown text-accent uppercase text-[10px] lg:text-xs tracking-[0.2em] mt-1 opacity-70"
          >
            {{ countLabel }} · {{ daysToGo }} days to go
          </div>
        </div>
      </div>
    </div>

    <!-- Bottom bar -->
    <!-- ⚠️ THE FOOT READS ITS OWN GROUND (2026-09-21). `over-hero` used to be "any chapter", and
         the ink came from `nav-on-dark` — a probe at the TOP of the screen. See syncFootInk in
         pages/[slug].vue for what that cost. Now: `foot-dark` picks the ink, `over-hero` adds the
         outline, and the outline is on ONLY over the hero film. -->
    <div class="!fixed z-20 bottom-0 w-full pointer-events-none foot-bar"
         :class="{ 'over-hero': !isHome && footOnFilm, 'foot-dark': !isHome && footOnDark }">
      <div class="container flex justify-between pb-2 md:pb-6">
        <!-- The couple's own credit. ⚠️ A LINK ONLY IF IT GOES SOMEWHERE: `credit.url`
             is a placeholder `#`, and as an <a target="_blank"> that opened a blank tab
             on the visitor. It renders as plain text until there is a real destination. -->
        <component
          :is="creditLink ? 'a' : 'div'"
          :href="creditLink || undefined"
          :rel="creditLink ? 'noopener noreferrer' : undefined"
          :target="creditLink ? '_blank' : undefined"
          class="pointer-events-auto"
        >
          <div class="flex items-center menu-item">
            <!-- ⚠️ 8px at 0.4 opacity measured 2.25:1 — the least readable type in the site, on
                 every route (AUDIT #107). 10px at 0.75 clears 4.5:1 and is still the quietest
                 thing on the screen. -->
            <div class="text-[10px] credit-line">
              <span class="credit-prefix">{{ SITE.credit.prefix }}</span>{{ SITE.credit.name }}
            </div>
          </div>
        </component>

        <!-- Sound toggle -->
        <button
          type="button"
          class="menu-item nav-btn pointer-events-auto"
          data-cursor="morph"
          data-cursor-style="pill"
          data-cursor-pad="-10"
          data-cursor-pad-x="12"
          :aria-pressed="soundOn"
          :aria-label="soundOn ? 'Sound on — turn it off' : 'Sound off — turn it on'"
          @click="$emit('toggle-sound')"
        >
          <span class="sound-label">{{ soundOn ? 'On' : 'Off' }}</span>
          <svg
            class="sound-icon"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              v-if="soundOn"
              d="M10 7.22006L6.60282 9.99957H3V13.9996H6.60282L10 16.7791V7.22006ZM5.88889 15.9996H2C1.44772 15.9996 1 15.5519 1 14.9996V8.99958C1 8.44729 1.44772 7.99958 2 7.99958H5.88889L11.1834 3.66772C11.3971 3.49286 11.7121 3.52436 11.887 3.73808C11.9601 3.82741 12 3.93928 12 4.0547V19.9445C12 20.2206 11.7761 20.4445 11.5 20.4445C11.3846 20.4445 11.2727 20.4046 11.1834 20.3315L5.88889 15.9996ZM15.5 8.76041C16.9478 9.94291 17.9 11.8611 17.9 13.9996C17.9 16.1381 16.9478 18.0563 15.5 19.2388L14.1823 17.6983C15.2806 16.8209 16 15.4898 16 13.9996C16 12.5094 15.2806 11.1783 14.1823 10.3009L15.5 8.76041ZM19.002 5.3645C21.4418 7.39706 23 10.5222 23 13.9996C23 17.477 21.4418 20.6022 19.002 22.6348L17.6664 21.1089C19.7473 19.4295 21.1 16.8717 21.1 13.9996C21.1 11.1275 19.7473 8.56979 17.6664 6.89037L19.002 5.3645Z"
            />
            <path
              v-else
              d="M10 7.22006L6.60282 9.99957H3V13.9996H6.60282L10 16.7791V7.22006ZM5.88889 15.9996H2C1.44772 15.9996 1 15.5519 1 14.9996V8.99958C1 8.44729 1.44772 7.99958 2 7.99958H5.88889L11.1834 3.66772C11.3971 3.49286 11.7121 3.52436 11.887 3.73808C11.9601 3.82741 12 3.93928 12 4.0547V19.9445C12 20.2206 11.7761 20.4445 11.5 20.4445C11.3846 20.4445 11.2727 20.4046 11.1834 20.3315L5.88889 15.9996ZM20.4142 11.9996L23.9497 15.5351L22.5355 16.9494L19 13.4138L15.4645 16.9494L14.0503 15.5351L17.5858 11.9996L14.0503 8.46404L15.4645 7.04983L19 10.5854L22.5355 7.04983L23.9497 8.46404L20.4142 11.9996Z"
            />
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, watch, onBeforeUnmount } from 'vue'
import { SITE } from '~/site.config'
// The four chapters, for the keyboard route above. ⚠️ This is the same list the scene builds
// the ring from, so the links cannot drift from the deck.
import { CHAPTERS } from '~/composables/useChapterScene'

// Whole days until the next wedding (static per page load — day resolution needs no
// timer). ⚠️ ONE day as of 2026-09-06 — the traditional marriage was removed site-wide at
// the couple's request. The rollover code is deliberately UNCHANGED: `find`ing the first
// event still ahead works identically for one row, and a second day returns by adding one.
// Both the number and the label are derived from the SAME event, so they cannot disagree.
const nextEvent = computed(() => {
  const now = Date.now()
  return (SITE.events || []).find((e) => new Date(e.date).getTime() > now) || null
})
// ── the wordmark's handover ──────────────────────────────────────────
// ⚠️ SHAPED IN JS, NOT WITH A CSS TRANSITION. `homeCue` IS the scrub, so a transition on anything
// driven by it lags the finger by its own duration — that is AUDIT #94, and it is most of what
// "glitchy" meant last time. A smoothstep gives the ease without ever being behind the gesture.
// The mark is gone by 45% of the first stage, well before the rule reaches its full width, so the
// two are never both at full strength: it reads as one thing becoming another.
const smoothstep = (a, b, x) => {
  const t = Math.min(1, Math.max(0, (x - a) / (b - a)))
  return t * t * (3 - 2 * t)
}
const wordmarkFade = computed(() => 1 - smoothstep(0, 0.45, homeCue.value))
// ⚠️ AND IT IS TAKEN OUT AS THE FOLD FINISHES. User: "then take it out when the animation
// completes." Two reasons, and the second is the one that bites: the line has said everything it
// has to say once the ring has closed, AND the ground underneath it is on its way from the
// chapter's dark accent to the homepage's white (`BACK_BG`, 64% of the second stage) — so a mark
// inked in `--accentLight` that stayed up would fade into the paper it is sitting on. It leaves on
// its own terms instead, over the stretch where the card is folding back into the deck.
const cueOpacity = computed(() =>
  Math.min(1, homeCue.value * 4) * (1 - smoothstep(0.62, 0.92, homePull.value)))
// A hair of extra tracking as it goes, so the letters look like they are being drawn apart into
// the rule rather than simply switched off.
const wordmarkTrack = computed(() => `${(smoothstep(0, 0.45, homeCue.value) * 0.18).toFixed(3)}em`)

const daysToGo = computed(() =>
  nextEvent.value
    ? Math.max(0, Math.ceil((new Date(nextEvent.value.date) - Date.now()) / 86400000))
    : 0
)
const countLabel = computed(() =>
  nextEvent.value === (SITE.events || [])[0] ? SITE.dateLabel : nextEvent.value?.label
)

// ⚠️ Over a dark ground the nav's own accent IS the background — see the flag's
// definition in `pages/[slug].vue`. Flip to the chapter's light tone there.
// A placeholder URL is not a destination. `#` and '' both mean "not wired up yet".
const creditLink = computed(() => {
  const u = SITE.credit?.url
  return u && u !== '#' ? u : null
})

const navOnDark = useState('navOnDark', () => false)
// Set by the chapter page from a probe at the BOTTOM of the screen — see syncFootInk there.
const footOnDark = useState('footOnDark', () => false)
const footOnFilm = useState('footOnFilm', () => false)

const props = defineProps({
  isHome: {
    type: Boolean,
    default: true,
  },
  accentColor: {
    type: String,
    default: '#42221A',
  },
  soundOn: {
    type: Boolean,
    default: false,
  },
})

// The wordmark, and every `.menu-item` via the CSS below, flip together.
const navInk = computed(() => (navOnDark.value ? 'var(--accentLight)' : props.accentColor))

// How far a top-edge pull has charged, 0→1. Written by the chapter page (which owns the gesture),
// read here because the cue belongs where the wordmark is — see the template.
const homePull = useState('homePull', () => 0)
// The cue's own progress — it completes at the halfway point of the pull. See pages/[slug].vue.
const homeCue = useState('homeCue', () => 0)
// Set by the page at the moment it commits, cleared here once the veil has played out — the page
// unmounts on the next tick, so it cannot be the thing that fades its own overlay.
const homeLeaving = useState('homeLeaving', () => false)
let leaveT = null
watch(homeLeaving, (on) => {
  clearTimeout(leaveT)
  if (!on) return
  leaveT = setTimeout(() => { homeLeaving.value = false; homePull.value = 0; homeCue.value = 0 }, 620)
})
onBeforeUnmount(() => clearTimeout(leaveT))

// `.menu-item` is coloured from main.css, so the flag has to reach CSS too.
watch(navOnDark, (on) => {
  if (import.meta.client) document.body.classList.toggle('nav-on-dark', !!on)
}, { immediate: true })

defineEmits(['toggle-about', 'go-home', 'toggle-sound'])
</script>

<style scoped>
/* ── going back: the veil ────────────────────────────────────────────────────
   Frosted paper washing down over the chapter as the pull is drawn. ⚠️ THE MASK IS THE ANIMATION:
   the layer is full-screen and always the same colour, and `--p` moves the edge of a gradient that
   reveals it downward — so "fades in down from the top across the page" is one interpolation with
   nothing to keep in sync. Below the nav's own z-20 bars so WELCOME and RSVP stay legible on top of
   it, and above everything else. */

/* ── going back: the line the wordmark opens into ─────────────────────────────
   ⚠️ IT STAYS ON THE WORDMARK'S LINE. The old cue TRAVELLED from here to the middle of the frame,
   which made sense when a veil was closing over everything and the loader had to be found in it.
   It does not now: the band opening below is the thing that moves, and the return's mark belongs
   exactly where the mark it replaces was. Nothing chases anything.
   ⚠️ The ink is `--accentLight`, not `--accent`: the band this sits in is the renderer's clear
   colour, which is always the chapter's DARK accent. Same reasoning as AUDIT #78. */
.pull-cue {
  position: fixed;
  left: 50%;
  top: 0.9rem;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: calc(0.35rem + var(--p, 0) * 0.5rem);
  white-space: nowrap;
  pointer-events: none;
  z-index: 21;
  color: var(--accentLight, #F3F1EC);
  /* It leads the thing it indicates — up inside the first quarter, while the RING is what tracks
     the journey. Same reason as before; see AUDIT #93. The fade-OUT is shaped in JS (`cueOpacity`)
     because it has to be a curve and a CSS transition would lag the scrub. */
  opacity: var(--o, 0);
  /* No transition while the pull is driving it — AUDIT #94. */
  transition: none;
}
.pull-cue.leaving { opacity: 0; transition: opacity 0.4s ease; }

/* The rule itself: two hairlines growing out from the ring, left and right. They start at zero
   width, so at the moment of handover there is only the ring sitting where the ampersand was. */
.pull-rule {
  display: flex;
  align-items: center;
  gap: calc(var(--p, 0) * 0.6rem);
}
.rule-seg {
  display: block;
  height: 1px;
  background: currentColor;
  /* ⚠️ Capped in rem as well as vw. On a 1920 frame a pure vw rule ran most of the width of the
     screen and stopped reading as a mark under the nav; on a 360 phone a pure rem rule was longer
     than the frame. min() of the two holds the same proportion at both ends. */
  width: calc(var(--p, 0) * min(22vw, 7.5rem));
  opacity: calc(0.25 + var(--p, 0) * 0.45);
  transition: none;
}

.pull-ring {
  position: relative;
  display: block;
  /* ⚠️ IT STARTS AT THE AMPERSAND'S SIZE AND STAYS A MARK. The old one grew to 4rem because it
     was alone in the middle of an empty frosted screen. Here it is one element of a line under the
     nav, and 4rem in that company is a dinner plate — the rule extending either side is what
     carries the sense of progress now, and the ring only has to hold the arc. */
  width: calc(1.15rem + var(--p, 0) * 0.85rem);
  height: calc(1.15rem + var(--p, 0) * 0.85rem);
  flex: none;
  transition: none;
}
.pull-ring svg { width: 100%; height: 100%; display: block; overflow: visible; }
.pull-track, .pull-draw { fill: none; stroke: currentColor; }
/* ⚠️ `non-scaling-stroke`: a stroke-width is meaningless without its viewBox scale. This pins it
   to the site's hairline whatever the rem size works out to. */
.pull-track { stroke-width: 1; vector-effect: non-scaling-stroke; opacity: 0.3; }
.pull-draw {
  stroke-width: 1.15;
  vector-effect: non-scaling-stroke;
  stroke-linecap: round;
  stroke-dasharray: 125.664;                 /* 2πr, r = 20 */
  stroke-dashoffset: calc(125.664 * (1 - var(--p, 0)));
  transform: rotate(-90deg);                 /* start at 12 o'clock */
  transform-origin: 50% 50%;
}
.pull-chev {
  position: absolute;
  top: 50%;
  left: 50%;
  width: calc(0.26rem + var(--p, 0) * 0.2rem);
  height: calc(0.26rem + var(--p, 0) * 0.2rem);
  margin: calc(-0.17rem - var(--p, 0) * 0.08rem) 0 0 calc(-0.13rem - var(--p, 0) * 0.1rem);
  border-left: 1px solid currentColor;
  border-top: 1px solid currentColor;
  transform: rotate(45deg);
  opacity: 0.85;
}
.pull-label {
  font-family: 'Bague', ui-sans-serif, sans-serif;
  font-size: 0.68rem;
  letter-spacing: 0.26em;
  text-transform: uppercase;
  /* Holds off until the mark has left the wordmark's line — two words in one place is a collision —
     and then arrives quickly, because it is the half of the cue that says what is happening. */
  opacity: calc(max(0, var(--p, 0) - 0.1) * 3.4);
}

.wordmark {
  font-family: 'Bague', ui-sans-serif, sans-serif;
  letter-spacing: 0.14em;
  line-height: 1.1;
  /* ⚠️ SHRINK TO THE TEXT. As a block `div` inside a flex item whose widest child is the
     countdown, the wordmark's BOX stretched to the countdown's ~300px while its text sat
     centred at ~135px — and that box carries `pointer-events-auto` and the go-home click.
     Nothing broke only because WELCOME happened to win the hit test by paint order; this
     is the exact shape of AUDIT #32, where the same geometry swallowed every tap on
     WELCOME. `inline-block` makes the clickable area equal the words. */
  display: inline-block;
}
/* ⚠️ At 17px + 0.14em the centred wordmark is ~98px wide, and on a 320px screen WELCOME
   and RSVP leave it under 90px of clear space between them — measured 35px of it sitting
   ON TOP of "WELCOME" at 320, 25 at 360, 18 at 390. Every common phone. Tighten the
   tracking and drop a point below 400px; both edges clear from 320 up. */
@media (max-width: 400px) {
  .wordmark {
    font-size: 14px;
    letter-spacing: 0.08em;
  }
}
/* ⚠️ THE COUNTDOWN IS THE WIDEST THING IN THE NAV, and it sits on the same line as
   WELCOME and RSVP. "OCTOBER 29, 2026 · LAGOS · 53 DAYS TO GO" is ~300px at 10px/0.2em;
   at 320 the labels leave it ~180px, so it ran straight through both of them. (The
   wordmark above it is only ~135px and was always clear — an earlier sweep blamed it for
   this because the wordmark's BOX stretches to the countdown's width.) Below 520px it
   drops onto its own line under the nav row and tightens its tracking. */
@media (max-width: 520px) {
  .countdown {
    margin-top: 1.5rem;
    letter-spacing: 0.1em;
    font-size: 9px;
  }
}
.wordmark .amp {
  font-family: 'Italiana', serif;
  letter-spacing: 0;
}

.container {
  margin-left: auto;
  margin-right: auto;
  max-width: none;
  position: relative;
  width: 91.666667%;
  z-index: 1;
}

/* ── The chrome's controls are buttons now (AUDIT #105) ──────────────────────
   `.menu-item` was written for a <div>; a <button> arrives with a UA background, border,
   font and padding of its own. This takes those back without touching the class the rest of
   the chrome shares. The focus ring is deliberately NOT removed: it is the only thing telling
   a keyboard visitor where they are, and it appears on `:focus-visible` only, so a mouse
   click never shows it. */
.nav-btn {
  appearance: none;
  -webkit-appearance: none;
  background: none;
  border: 0;
  padding: 0;
  margin: 0;
  font: inherit;
  color: inherit;
  cursor: pointer;
  text-align: inherit;
}
.nav-btn:focus-visible {
  outline: 2px solid currentColor;
  outline-offset: 4px;
  border-radius: 4px;
}
/* The jump list holds no space until one of its links takes focus. */
.chapter-jump ul { list-style: none; margin: 0; padding: 0; }

.credit-prefix { opacity: 0.75; }

/* ── A phone on its side (AUDIT #103) ─────────────────────────────────────────
   ⚠️ THE CHROME DOES NOT SCALE AND THE SCENE DOES. `fitScale()` pulls the camera back on a
   short frame so the whole 3D composition shrinks, while this bar stays in CSS pixels — at
   844x390 the nav ate the top 88px and the credit row another 66, leaving the deck 236px of
   a 390px frame and making it look like a model of itself. Nothing here changes the type's
   role, only how much room it takes when there is none: measured, this gives the scene back
   about 50px, a fifth of what it had. */
@media (orientation: landscape) and (max-height: 460px) {
  .container.flex { margin-top: 0.25rem !important; padding-bottom: 0.25rem !important; }
  .wordmark { font-size: 15px !important; }
  .countdown { font-size: 9px !important; margin-top: 0.1rem !important; letter-spacing: 0.16em !important; }
  .menu-item { height: 2.4rem !important; font-size: 10px !important; }
}

/* ⚠️ The wordmark is 24px tall and it is the way home (AUDIT #109). It became a <button> in the
   same pass that found this, which is how it started being measured at all. The hit area is
   grown with a pseudo-element rather than padding: the nav is a flex row measured to the pixel
   and padding would move the date line under it. */
.wordmark { position: relative; }
/* ⚠️ THE INK COMES THROUGH A VARIABLE SO THAT :hover CAN HAVE IT. It used to be bound straight to
   `style="color:"`, and an inline style beats every stylesheet — there was no way to write a hover
   state for the couple's own names at all.
   ⚠️ AND THE NAMES DO NOT GET A RING. Every other control in the chrome does; the wordmark had one
   for a day and a wreath for a day before that, and neither was wanted (2026-09-24: "completely
   remove the pill effect on the logo hover. Maybe just change its color or something"). So this is
   the only control whose whole answer is its own ink.
   ⚠️ IT DEEPENS ON PAPER AND BRIGHTENS ON A DARK GROUND, which is the one formulation that cannot
   fail: the nav sits on paper, on a moving film and on the accent mid-exit, and mixing toward the
   opposite tone would LOSE contrast on half of them. `nav-on-dark` already knows which case it is
   — it is the same flag that picks the ink in the first place. */
.wordmark {
  color: var(--wm-ink);
  transition: color 0.3s ease;
}
.wordmark:hover,
.wordmark:focus-visible { color: color-mix(in srgb, var(--wm-ink) 62%, #0B0A08 38%); }
body.nav-on-dark .wordmark:hover,
body.nav-on-dark .wordmark:focus-visible { color: color-mix(in srgb, var(--wm-ink) 62%, #FFFDF8 38%); }
@media (prefers-reduced-motion: reduce) { .wordmark { transition-duration: 0.01ms; } }
.wordmark::after {
  content: '';
  position: absolute;
  left: -0.5rem;
  right: -0.5rem;
  top: -11px;
  bottom: -11px;
}

/* ── The bottom chrome, over a hero ───────────────────────────────────────────
   ⚠️ AT THE TOP OF A CHAPTER THE GROUND IS A FILM, NOT THE PAGE. The credit and the sound
   toggle are `--accentLight` sitting on whatever the hero happens to be showing, and over a
   pale frame they disappeared entirely — photographed at 1440x900 on The Big Day, the credit
   was invisible (AUDIT #100). It cannot be fixed with a colour: the ground is a moving
   photograph and is not readable from the DOM at all (AUDIT #66).
   The scroll cue beside them already solved this, and this is the same answer — a stacked
   dark outline, tight enough not to close the counters at 10px, no box and no veil. It is
   applied ONLY while a chapter is open (`.over-hero`), because on the homepage these sit on
   paper and the outline would be a smudge on nothing. */
/* ⚠️ THE FOOT'S INK, AND IT OUT-SPECIFIES `body.nav-on-dark .menu-item` ON PURPOSE. These rules
   are scoped, so each compiles with a [data-v-…] attribute — (0,3,0) and (0,4,0) against that
   rule's (0,2,1) — which is what takes the bottom bar out from under a flag read at the top of
   the screen. The homepage never sets either flag, so it is the chapter accent there as before. */
.foot-bar .menu-item { color: var(--accent); }
.foot-bar.foot-dark .menu-item { color: var(--accentLight); }

.over-hero .credit-line,
.over-hero .sound-label {
  /* ⚠️ THE INK OVER A FILM IS THE LIGHT TONE NOW, so this outline is carrying more than it did.
     It used to sit under the chapter's DARK accent — which the nav's top probe happened to be
     serving here — and that pair is only readable on a pale frame; light ink with a dark outline
     is readable on both, which is the point of an outline. One more 2px layer, because at 10px on
     the pale wall of In Frames' film the old stack was marginal. */
  text-shadow:
    0 0 1px rgba(16, 14, 11, 0.95),
    0 0 1px rgba(16, 14, 11, 0.95),
    0 0 2px rgba(16, 14, 11, 0.85),
    0 0 3px rgba(16, 14, 11, 0.75),
    0 1px 8px rgba(16, 14, 11, 0.45);
}
.over-hero .sound-icon {
  filter: drop-shadow(0 0 1px rgba(16, 14, 11, 0.9)) drop-shadow(0 1px 5px rgba(16, 14, 11, 0.45));
}
</style>