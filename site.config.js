// ─────────────────────────────────────────────────────────────────────────────
// SITE CONFIG — brand / chrome content (single source of truth)
//
// COVENANT & UVIE — the wedding site. Everything chrome-level lives here so a
// content pass is data-only. Consumed by: nuxt.config.ts (title + Google fonts),
// app.vue (document titles), SiteNav.vue (wordmark, subtitle, countdown, nav,
// credit), AboutPanel.vue (welcome-note copy).
//
// ⚠️ PLACEHOLDERS (2026-07-23, awaiting the couple's real details):
//   • events / dateLabel — ONE wedding: the white wedding + reception, Thu 29 Oct 2026.
//     ⚠️ The traditional marriage (23 Oct) was on the site until 2026-09-06 and was
//     removed at the couple's request. The Big Day's inner page still carries both
//     days — see docs/PHASE-2-INNER-PAGES.md.
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

  // ⚠️ ONE DAY. The traditional marriage (23 Oct) was removed site-wide on 2026-09-06 at
  // the couple's request: the site counts down to the white wedding and nothing else.
  // The array shape is kept — SiteNav still `find`s the next event ahead and rolls over —
  // so a second day can come back by adding a row, sorted ascending. Time is a
  // placeholder; the DATE is the couple's real one.
  events: [
    { name: 'White Wedding / Reception', date: '2026-10-29T12:00:00+01:00', label: 'October 29, 2026 · Lagos' },
  ],
  dateLabel: 'October 29, 2026 · Lagos',

  // ⚠️ REMOVED from the nav on 2026-09-03 at the user's request — the homepage
  // wordmark now runs straight into the date and countdown. The string is kept
  // because `chapterPages`/docs still describe the site this way; nothing renders it.
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
    // The real RSVP destination (user, 2026-09-03). This is the site's primary
    // call to action — it appears in the nav AND at the end of all four chapters.
    collectionUrl: 'https://lal.so/e/9j09CHqj2sn',
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
      text: 'WE ARE COVENANT & UVIE, and on OCTOBER 29, 2026 we are GETTING MARRIED.',
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
  // ⚠️ 'Shadows Into Light' was IN FRAMES' hand (the note under a mounted print) and
  // was DROPPED on 2026-09-03, one request lighter: that page became a file browser
  // and its names and empty state are UI text, not handwriting. If a hand ever comes
  // back to In Frames it goes here — and it must be a THIRD one, never US's or THE
  // BIG DAY's.
  googleFonts: ['Italiana', 'Monoton', 'Over the Rainbow', 'Caveat:wght@600;700'],
}

// Build the Google Fonts CSS2 URL from the family list above.
export function googleFontsHref() {
  const families = SITE.googleFonts.map((f) => `family=${f.replace(/ /g, '+')}`).join('&')
  return `https://fonts.googleapis.com/css2?${families}&display=swap`
}
