<template>
  <div>
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
          <!-- BRAND WORDMARK — the couple's names. -->
          <div
            class="wordmark whitespace-nowrap text-[17px] lg:text-[26px] pointer-events-auto"
            :style="{ color: navInk }"
            @click="$emit('go-home')"
          >
            COVENANT <span class="amp">&amp;</span> UVIE
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
import { computed, watch } from 'vue'
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

// `.menu-item` is coloured from main.css, so the flag has to reach CSS too.
watch(navOnDark, (on) => {
  if (import.meta.client) document.body.classList.toggle('nav-on-dark', !!on)
}, { immediate: true })

defineEmits(['toggle-about', 'go-home', 'toggle-sound'])
</script>

<style scoped>
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
