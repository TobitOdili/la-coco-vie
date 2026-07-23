// ─────────────────────────────────────────────────────────────────────────────
// SITE CONFIG — brand / chrome content (single source of truth)
//
// COVENANT & UVIE — the wedding site. Everything chrome-level lives here so a
// content pass is data-only. Consumed by: nuxt.config.ts (title + Google fonts),
// app.vue (document titles), SiteNav.vue (wordmark, subtitle, countdown, nav,
// credit), AboutPanel.vue (welcome-note copy).
//
// ⚠️ PLACEHOLDERS (2026-07-23, awaiting the couple's real details):
//   • weddingDate / dateLabel — invented (Dec 12 2026)
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

  // The big day. Drives the countdown in SiteNav. PLACEHOLDER date.
  weddingDate: '2026-12-12T12:00:00+01:00',
  dateLabel: 'December 12, 2026 · Lagos',

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
      text: 'WE ARE COVENANT & UVIE, and on DECEMBER 12, 2026 we are GETTING MARRIED.',
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
  googleFonts: ['Italiana', 'Monoton', 'Over the Rainbow'],
}

// Build the Google Fonts CSS2 URL from the family list above.
export function googleFontsHref() {
  const families = SITE.googleFonts.map((f) => `family=${f.replace(/ /g, '+')}`).join('&')
  return `https://fonts.googleapis.com/css2?${families}&display=swap`
}
