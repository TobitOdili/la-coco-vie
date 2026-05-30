// ─────────────────────────────────────────────────────────────────────────────
// CHAPTER PAGE CONTENT — the inner (scroll) page per chapter (Phase 2).
//
// The spine of which chapters exist + their colors/films/posters is CHAPTERS
// (composables/useChapterScene.js). This file holds the *inner page* content:
// the sub-chapters, their copy, gallery images, and dress-tail references.
//
// Copy below was transcribed from the reference inner pages; some sentence tails
// were cut off in capture and reasonably completed — refine against the original
// when polishing. This is a lightweight data module (no three/gsap).
// ─────────────────────────────────────────────────────────────────────────────

const base = (import.meta.env.BASE_URL || '/').replace(/\/$/, '')
const asset = (p) => `${base}${p}`

// Dresses referenced by the dress-tail cards. Metadata from the reference payload;
// only the dresses used by built chapters have local images so far (the rest will
// be downloaded when those chapters are built — see docs/CONTENT-AND-ASSETS.md).
export const DRESSES = {
  yaroslava: {
    title: 'Yaroslava',
    photo: asset('/images/dresses/dress-01.jpg'),
    params: ['silhouette: straight', 'color: ivory'],
    url: 'https://millanova.com/dress/yaroslava',
  },
  malva: {
    title: 'Malva',
    photo: asset('/images/dresses/dress-02.jpg'),
    params: ['silhouette: straight', 'color: ivory'],
    url: 'https://millanova.com/dress/malva',
  },
}

// Inner-page content, keyed by chapter slug. Only Wine O'Clock is built so far
// (the vertical slice); other slugs fall back to a scaffold in pages/[slug].vue.
export const CHAPTER_PAGES = {
  'wine-o-clock': {
    sections: [
      {
        num: 'I',
        title: 'THE BRIDE',
        body:
          'Meet Ivy, a self-sufficient and open-minded woman who turned her love for wine ' +
          'into her career. She wanted to share her passion with closest friends, so she ' +
          'organized an intimate wedding in a picturesque Italian vineyard to enjoy a ' +
          'carefree, fun yet flawless celebration, reflecting her approach to life.',
        images: [
          asset('/images/gallery/wine-the-bride-01.jpg'),
          asset('/images/gallery/wine-the-bride-02.jpg'),
        ],
        dresses: ['malva', 'yaroslava'],
        align: 'right',
      },
      {
        num: 'II',
        title: 'THE WINE',
        body:
          'Wine is an art form: nuanced, multifaceted, precise, impressive, and endlessly ' +
          'surprising. From the taste, scent, and color to the making process — it is ' +
          'beautiful in every way, much like a wedding day.',
        images: [
          asset('/images/gallery/wine-the-wine-01.jpg'),
          asset('/images/gallery/wine-the-wine-02.jpg'),
          asset('/images/gallery/wine-the-wine-03.jpg'),
        ],
        align: 'left',
      },
      {
        num: 'III',
        title: 'THE PEOPLE',
        body:
          'Surrounded by your dearest friends, you share the most important moment in your ' +
          'life — a ceremony nestled in the heart of the vineyard, raising a glass to love.',
        images: [asset('/images/gallery/wine-the-people.jpg')],
        align: 'right',
      },
    ],
  },
}
