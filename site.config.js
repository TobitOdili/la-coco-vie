// ─────────────────────────────────────────────────────────────────────────────
// SITE CONFIG — brand / chrome content (single source of truth)
//
// Everything chrome-level and brand-specific lives here so a re-skin is data-only.
// Consumed by: nuxt.config.ts (title + Google fonts), app.vue (document titles),
// SiteNav.vue (subtitle, nav, credit), AboutPanel.vue (about copy).
//
// NOT here (by design):
//   • Per-chapter content (titles, colors, posters, films, audio) → `CHAPTERS` in
//     composables/useChapterScene.js. See docs/CONTENT-AND-ASSETS.md.
//   • The "MILLA NOVA" logo wordmark is vector art, not a string — it stays as an
//     inline <svg> in SiteNav.vue (clearly marked there as the one brand-art element
//     to swap on re-skin).
//   • Local @font-face (Bague, Movie) + per-chapter .display fonts → assets/css/main.css.
// ─────────────────────────────────────────────────────────────────────────────

export const SITE = {
  // Brand name, used to build document titles.
  brand: 'Milla Nova',

  // Subtitle shown under the nav logo on the homepage.
  subtitle: 'Chapter the bride',

  // Document <title>s.
  titles: {
    home: 'Chapter — Milla Nova',
    // Per-chapter title = `${chapter.title} ${chapterSuffix}` (set in app.vue on select).
    chapterSuffix: '— Chapter Milla Nova',
  },

  // Top navigation.
  nav: {
    aboutLabel: 'About',
    collectionLabel: 'Collection',
    collectionUrl: 'https://millanova.com/collection/chapter-bride',
  },

  // Bottom-left credit.
  credit: {
    prefix: 'Made by ',
    name: 'Sarakuz',
    url: 'https://sarakuz.com',
  },

  // About-panel body. Each entry is one paragraph; `gap: true` adds spacing after it
  // (matches the original's break before the final paragraph).
  about: [
    { text: 'IMMERSE YOURSELF into the CINEMATOGRAPHICAL-LIKE EXPERIENCE' },
    { text: 'to DISCOVER our NEWEST COLLECTION "CHAPTER BRIDE".', gap: true },
    {
      text:
        'the COLLECTION SHOWCASE COMPRISES FOUR DISTINCT FILMS about ITALIAN-INSPIRED ' +
        'WEDDINGS, EACH WITH ITS OWN STORYLINE and WEDDING THEME, yet all CENTERED AROUND ' +
        'the MAIN FOCUS: the BRIDE, who BECOMES the FOCAL POINT of the ENTIRE WEDDING JOURNEY.',
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
