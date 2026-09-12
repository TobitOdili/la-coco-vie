<template>
  <div>
    <!-- ⚠️ FIRST, so both nav bars (later siblings at the same z-20) paint on top of it. Nested
         inside one of them it washed out WELCOME and RSVP, which is not the nav stepping aside —
         it is the nav looking broken. See `.back-veil`. -->
    <div v-if="homePull > 0 || homeLeaving" class="back-veil" :class="{ leaving: homeLeaving }"
      :style="{ '--p': homeLeaving ? 1 : homePull }" aria-hidden="true" />

    <!-- Top navigation bar -->
    <div class="!fixed z-20 top-0 w-full">
      <div class="container flex justify-between mt-2 md:mt-6">
        <!-- Left: About -->
        <div>
          <div class="menu-item" @click="$emit('toggle-about')">
            <!-- Was `hidden md:block`: on a phone that left an invisible click target and no
                 way into About at all. The reference shows this label at mobile widths too,
                 and it fits (ABOUT + the 136px centre logo + COLLECTION inside 390px). -->
            <span>{{ SITE.nav.aboutLabel }}</span>
          </div>
        </div>
        <!-- Right: Collection link -->
        <div>
          <a
            :href="SITE.nav.collectionUrl"
            rel="noopener noreferrer"
            target="_blank"
            class="menu-item"
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
          <div
            class="wordmark whitespace-nowrap text-[17px] lg:text-[26px] pointer-events-auto"
            :style="{ color: navInk, opacity: 1 - homePull }"
            @click="$emit('go-home')"
          >
            COVENANT <span class="amp">&amp;</span> UVIE
          </div>
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
          <div v-if="homePull > 0 || homeLeaving" class="pull-cue" :class="{ leaving: homeLeaving }"
            :style="{ '--p': homeLeaving ? 1 : homePull }" aria-hidden="true">
            <span class="pull-ring">
              <svg viewBox="0 0 44 44" focusable="false">
                <circle class="pull-track" cx="22" cy="22" r="20" />
                <circle class="pull-draw" cx="22" cy="22" r="20" />
              </svg>
              <i class="pull-chev" />
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
    <div class="!fixed z-20 bottom-0 w-full pointer-events-none">
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
            <div class="text-[8px]">
              <span class="opacity-40">{{ SITE.credit.prefix }}</span>{{ SITE.credit.name }}
            </div>
          </div>
        </component>

        <!-- Sound toggle -->
        <div class="menu-item pointer-events-auto" @click="$emit('toggle-sound')">
          <span>{{ soundOn ? 'On' : 'Off' }}</span>
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            :style="{ fill: 'var(--accent)' }"
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
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, watch, onBeforeUnmount } from 'vue'
import { SITE } from '~/site.config'

// Whole days until the next wedding (static per page load — day resolution needs no
// timer). ⚠️ ONE day as of 2026-09-06 — the traditional marriage was removed site-wide at
// the couple's request. The rollover code is deliberately UNCHANGED: `find`ing the first
// event still ahead works identically for one row, and a second day returns by adding one.
// Both the number and the label are derived from the SAME event, so they cannot disagree.
const nextEvent = computed(() => {
  const now = Date.now()
  return (SITE.events || []).find((e) => new Date(e.date).getTime() > now) || null
})
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
// Set by the page at the moment it commits, cleared here once the veil has played out — the page
// unmounts on the next tick, so it cannot be the thing that fades its own overlay.
const homeLeaving = useState('homeLeaving', () => false)
let leaveT = null
watch(homeLeaving, (on) => {
  clearTimeout(leaveT)
  if (!on) return
  leaveT = setTimeout(() => { homeLeaving.value = false; homePull.value = 0 }, 620)
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
.back-veil {
  position: fixed;
  inset: 0;
  z-index: 19;
  pointer-events: none;
  background: color-mix(in srgb, var(--accentLight, #F3F1EC) 88%, transparent);
  /* ⚠️ THE WASH THICKENS, IT DOES NOT ARRIVE OPAQUE. The mask says how far down the page it has
     reached; this says how much of the scene it is hiding, and the scene behind it is the thing
     the visitor is actually driving — a veil that is already solid at half a pull turns the
     return back into a loading screen with an animation somewhere underneath it. */
  opacity: calc(0.22 + var(--p, 0) * 0.66);
  backdrop-filter: blur(calc(var(--p, 0) * 7px)) saturate(0.9);
  -webkit-backdrop-filter: blur(calc(var(--p, 0) * 7px)) saturate(0.9);
  -webkit-mask-image: linear-gradient(to bottom,
    #000 0%,
    #000 calc(var(--p, 0) * 112%),
    transparent calc(var(--p, 0) * 112% + 14%));
  mask-image: linear-gradient(to bottom,
    #000 0%,
    #000 calc(var(--p, 0) * 112%),
    transparent calc(var(--p, 0) * 112% + 14%));
  transition: opacity 0.55s ease;
}
/* Committed: hold it whole for the route change, then let it go and reveal the deck. */
.back-veil.leaving { opacity: 0 !important; }

/* ── going back: the loader that was the logo ────────────────────────────────
   Starts where the wordmark is and travels to the middle of the frame as the veil reaches it. */
.pull-cue {
  position: fixed;
  left: 50%;
  /* ⚠️ INTERPOLATED FROM THE WORDMARK'S OWN LINE to the centre of the frame. Pinned to either end
     it is a second element appearing beside the first; moving between them is what makes it read
     as the mark becoming the loader. */
  top: calc(0.9rem + var(--p, 0) * (50vh - 2.6rem));
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: calc(0.2rem + var(--p, 0) * 0.7rem);
  white-space: nowrap;
  pointer-events: none;
  z-index: 21;
  /* The ink is the chapter's, because the veil under it is the chapter's paper. */
  color: var(--accent, #333);
  opacity: calc(var(--p, 0) * 1.5);
  transition: opacity 0.45s ease;
}
.pull-cue.leaving { opacity: 0; }
.pull-ring {
  position: relative;
  display: block;
  /* Grows with the pull, from a mark the size of the wordmark's cap-height to a loader. */
  width: calc(1.15rem + var(--p, 0) * 1.75rem);
  height: calc(1.15rem + var(--p, 0) * 1.75rem);
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
  font-size: 0.6rem;
  letter-spacing: 0.26em;
  text-transform: uppercase;
  /* Holds off until the mark has left the wordmark's line — two words in one place is a collision. */
  opacity: calc(max(0, var(--p, 0) - 0.28) * 1.4);
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
</style>
