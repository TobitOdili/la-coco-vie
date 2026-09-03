// ─────────────────────────────────────────────────────────────────────────────
// SITE CONFIG — brand / chrome content (single source of truth)
//
// COVENANT & UVIE — the wedding site. Everything chrome-level lives here so a
// content pass is data-only. Consumed by: nuxt.config.ts (title + Google fonts),
// app.vue (document titles), SiteNav.vue (wordmark, subtitle, countdown, nav,
// credit), AboutPanel.vue (welcome-note copy).
//
// ⚠️ PLACEHOLDERS (2026-07-23, awaiting the couple's real details):
//   • events / dateLabel — user-confirmed 2026-08-31: TWO weddings, the traditional
//     on FRI 23 Oct 2026 and the white wedding + reception on Thu 29 Oct 2026.
//     (Oct 27 was the original single placeholder; the traditional was briefly
//     recorded as the 25th and corrected to the 23rd by the user on 2026-09-02.)
//   • rsvpUrl — dead link until an RSVP destination exists
//   • the welcome-note copy below — tone draft for correction
//
// NOT here (by design):
//   • Per-chapter content (titles, colors, posters, films, audio) → `CHAPTERS` in
//     composables/useChapterScene.js. See docs/CONTENT-AND-ASSETS.md.
//   • Local @font-face (Bague, Movie) + per-chapter .display fonts → assets/css/main.css.
// ─────────────────────────────────────────────────────────────────────────────

export const SITE = {
  // Brand name, used to build document titles + the nav wordmark.
  brand: 'Covenant & Uvie',

  // The big day is TWO days. In order — the countdown in SiteNav targets whichever
  // is still ahead and ROLLS OVER to the next once one has passed, so keep these
  // sorted ascending. Times are placeholders; the DATES are the couple's real ones.
  events: [
    { name: 'Traditional Marriage',  date: '2026-10-23T12:00:00+01:00', label: 'October 23, 2026 · Lagos' },
    { name: 'White Wedding / Reception', date: '2026-10-29T12:00:00+01:00', label: 'October 29, 2026 · Lagos' },
  ],
  // Shown while both days are still ahead; after the first passes, the countdown
  // switches to that event's own label.
  dateLabel: 'October 23 & 29, 2026 · Lagos',

  // Subtitle shown under the nav wordmark on the homepage.
  subtitle: 'A love story in chapters',

  // Document <title>s.
  titles: {
    home: 'Covenant & Uvie — A Love Story in Chapters',
    // Per-chapter title = `${chapter.title} ${chapterSuffix}` (set in app.vue on select).
    chapterSuffix: '— Covenant & Uvie',
  },

  // Top navigation.
  nav: {
    aboutLabel: 'Welcome',
    collectionLabel: 'RSVP',
    // PLACEHOLDER — point at the real RSVP form / WhatsApp / mailto when it exists.
    collectionUrl: '#rsvp',
  },

  // Bottom-left credit.
  credit: {
    prefix: 'With love, ',
    name: 'C & U',
    url: '#',
  },

  // Welcome-note panel (the old About). Each entry is one paragraph; `gap: true`
  // adds spacing after it. PLACEHOLDER copy — the couple's own words go here.
  about: [
    { text: 'WELCOME to OUR CORNER of the INTERNET — and THANK YOU for BEING HERE.' },
    {
      text: 'WE ARE COVENANT & UVIE, and on OCTOBER 23 & 29, 2026 we are GETTING MARRIED.',
      gap: true,
    },
    {
      text:
        'THIS SITE is OUR STORY told in FOUR CHAPTERS: how WE BECAME US, EVERYTHING you ' +
        'NEED to KNOW about THE BIG DAY, the MOMENTS we have CAPTURED so far, and a ' +
        'LITTLE WISHLIST for the GENEROUS of HEART. SPIN the CARDS, PICK a CHAPTER, ' +
        'and COME ALONG — WE SAVED YOU a SEAT.',
    },
  ],

  // Google Fonts loaded in <head>. The CSS2 URL is built from this list in nuxt.config.ts.
  // (Local fonts Bague/Movie are declared via @font-face in assets/css/main.css.)
  // ⚠️ 'Caveat' is THE BIG DAY's marker hand (annotations on the calendar). It is
  // deliberately NOT 'Over the Rainbow' — that is US's voice, a thin looping pen, and
  // the two pages must not share a hand. Caveat is a chunkier felt-tip scrawl.
  // ⚠️ A hand per page that needs one, and they must stay distinct: 'Over the
  // Rainbow' is US's looping pen and 'Caveat' is THE BIG DAY's felt-tip marker.
  // Never reuse one page's hand on another — that is what made With Love fail its
  // first review.
  // ⚠️ 'Shadows Into Light' was IN FRAMES' hand (the note under a mounted print)
  // and is UNUSED as of 2026-09-02: that page became a file browser, and the user's
  // note was that file names and the empty state must not be handwritten. It stays
  // in this list only so the slot is still reserved for In Frames if a hand ever
  // returns there — if it does not, drop it and save the request.
  googleFonts: ['Italiana', 'Monoton', 'Over the Rainbow', 'Caveat:wght@600;700', 'Shadows Into Light'],
}

// Build the Google Fonts CSS2 URL from the family list above.
export function googleFontsHref() {
  const families = SITE.googleFonts.map((f) => `family=${f.replace(/ /g, '+')}`).join('&')
  return `https://fonts.googleapis.com/css2?${families}&display=swap`
}
