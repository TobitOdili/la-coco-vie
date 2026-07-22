// ─────────────────────────────────────────────────────────────────────────────
// CHAPTER PAGE CONTENT — the inner (scroll) page per chapter (Phase 2).
//
// The spine of which chapters exist + their colors/films/posters is CHAPTERS
// (composables/useChapterScene.js). This file holds the *inner page* content:
// the sub-chapters, their copy, gallery images, and dress-tail references.
//
// ⚠️ THIS FILE IS THE ONLY PER-CHAPTER THING. All four chapters render through the
// SAME components (ChapterSection / DressTail / ChapterEnd), so a layout change lands
// on every chapter at once, and a content swap is a change *here* plus the images.
//
// Provenance of the current (placeholder) content:
//  • wine-o-clock — copy transcribed from the reference inner page back when it still
//    served real DOM routes; gallery photos pulled from the reference then.
//  • la-storia / eat-marry-love / amour-getaway — the reference is pure-WebGL now and its
//    inner pages can't be read by any tool, so the copy here is ORIGINAL themed placeholder
//    written to each chapter's film, and the gallery stills are frames extracted from that
//    chapter's own `public/video/*-intro.mp4`. Swap wholesale at re-skin time.
//  • DRESSES — real names/photos/links from millanova.com/collection/chapter-bride.
// ─────────────────────────────────────────────────────────────────────────────

const base = (import.meta.env.BASE_URL || '/').replace(/\/$/, '')
const asset = (p) => `${base}${p}`
const dressUrl = (slug) => `https://millanova.com/dress/${slug}`

// Dresses referenced by the dress-tail popups. Names/photos/links are real (scraped from
// the Chapter: Bride collection); `params` is intentionally the collection tag rather than
// invented silhouette/colour specs.
export const DRESSES = {
  // wine-o-clock (original pair)
  yaroslava: {
    title: 'Yaroslava',
    photo: asset('/images/dresses/dress-01.jpg'),
    params: ['silhouette: straight', 'color: ivory'],
    url: dressUrl('yaroslava'),
  },
  malva: {
    title: 'Malva',
    photo: asset('/images/dresses/dress-02.jpg'),
    params: ['silhouette: straight', 'color: ivory'],
    url: dressUrl('malva'),
  },
  // eat-marry-love
  aggie: { title: 'Aggie', photo: asset('/images/dresses/aggie.jpg'), params: ['collection: chapter bride'], url: dressUrl('aggie') },
  alaia: { title: 'Alaia', photo: asset('/images/dresses/alaia.jpg'), params: ['collection: chapter bride'], url: dressUrl('alaia') },
  aldrans: { title: 'Aldrans', photo: asset('/images/dresses/aldrans.jpg'), params: ['collection: chapter bride'], url: dressUrl('aldrans') },
  // la-storia
  aminata: { title: 'Aminata', photo: asset('/images/dresses/aminata.jpg'), params: ['collection: chapter bride'], url: dressUrl('aminata') },
  andalusia: { title: 'Andalusia', photo: asset('/images/dresses/andalusia.jpg'), params: ['collection: chapter bride'], url: dressUrl('andalusia') },
  antonelly: { title: 'Antonelly', photo: asset('/images/dresses/antonelly.jpg'), params: ['collection: chapter bride'], url: dressUrl('antonelly') },
  // amour-getaway
  arcada: { title: 'Arcada', photo: asset('/images/dresses/arcada.jpg'), params: ['collection: chapter bride'], url: dressUrl('arcada') },
  ariel: { title: 'Ariel', photo: asset('/images/dresses/ariel.jpg'), params: ['collection: chapter bride'], url: dressUrl('ariel') },
  azalia: { title: 'Azalia', photo: asset('/images/dresses/azalia.jpg'), params: ['collection: chapter bride'], url: dressUrl('azalia') },
}

// Inner-page content, keyed by chapter slug. Every entry has the same shape:
//   sections[]: { num, title, body, images[], dresses[], align }
//     • images[0]  → the full-height photo in the split (flush to one edge)
//     • images[1…] → full-bleed bands below the split
//     • dresses[]  → the floating popups shown while that section is the active one
//     • align      → which side the photo sits on ('left' | 'right'), alternating
export const CHAPTER_PAGES = {
  'wine-o-clock': {
    sections: [
      {
        num: 'I',
        title: 'THE BRIDE',
        body:
          'Meet Ivy, a self-sufficient and open-minded professional sommelier who turned her ' +
          'love for wine into her career. She wanted to share her passion with closest friends, so she ' +
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

  'eat-marry-love': {
    sections: [
      {
        num: 'I',
        title: 'THE BRIDE',
        body:
          'Meet Delia, a chef who measures love the way she measures a recipe — generously. ' +
          'A wedding, to her, was never about the ceremony alone; it was an excuse to gather ' +
          'everyone she adores around one impossibly long table and feed them until the ' +
          'candles burned all the way down.',
        images: [
          asset('/images/gallery/eat-marry-love-01.jpg'),
          asset('/images/gallery/eat-marry-love-02.jpg'),
        ],
        dresses: ['aggie', 'alaia'],
        align: 'right',
      },
      {
        num: 'II',
        title: 'THE FEAST',
        body:
          'Course after course carried out beneath the olive trees: bread torn by hand, ' +
          'tomatoes still warm from the sun, and a cake that took three days and four ' +
          'arguments. Here the menu is the vow — written in a language everyone at the ' +
          'table already understands.',
        images: [asset('/images/gallery/eat-marry-love-03.jpg')],
        dresses: ['aldrans'],
        align: 'left',
      },
      {
        num: 'III',
        title: 'THE MERRIMENT',
        body:
          'By the time the plates were cleared, nobody was still sitting. Cousins danced ' +
          'with strangers, somebody’s grandmother claimed the toast, and the celebration ' +
          'spilled off the table into the dark and simply kept going.',
        images: [asset('/images/gallery/eat-marry-love-04.jpg')],
        align: 'right',
      },
    ],
  },

  'la-storia': {
    sections: [
      {
        num: 'I',
        title: 'THE BRIDE',
        body:
          'Meet Giulia, an archivist of beautiful things, raised in a house where every dress ' +
          'carried a story and nothing was ever thrown away. She didn’t want a wedding that ' +
          'looked bought — she wanted one that felt inherited.',
        images: [
          asset('/images/gallery/la-storia-01.jpg'),
          asset('/images/gallery/la-storia-02.jpg'),
        ],
        dresses: ['aminata', 'andalusia'],
        align: 'right',
      },
      {
        num: 'II',
        title: 'THE HERITAGE',
        body:
          'Her mother’s veil, her grandmother’s earrings, and a silk that took an entire ' +
          'season to track down. Elegance, in this family, was never only an aesthetic — it ' +
          'is a form of memory, handed over carefully and worn again.',
        images: [asset('/images/gallery/la-storia-03.jpg')],
        dresses: ['antonelly'],
        align: 'left',
      },
      {
        num: 'III',
        title: 'THE CEREMONY',
        body:
          'Black tie beneath a canopy of roses, an aisle of old stone, and the particular ' +
          'hush that falls when something is being done properly. Nothing hurried, nothing ' +
          'improvised — every detail exactly where it had always been meant to be.',
        images: [asset('/images/gallery/la-storia-04.jpg')],
        align: 'right',
      },
    ],
  },

  'amour-getaway': {
    sections: [
      {
        num: 'I',
        title: 'THE BRIDE',
        body:
          'Meet Noor, who fell in love on a delayed train and has been chasing that feeling ' +
          'ever since. She never wanted a venue so much as a destination — and a good reason ' +
          'to keep driving once the vows had been said.',
        images: [
          asset('/images/gallery/amour-getaway-01.jpg'),
          asset('/images/gallery/amour-getaway-02.jpg'),
        ],
        dresses: ['arcada', 'ariel'],
        align: 'right',
      },
      {
        num: 'II',
        title: 'THE ESCAPE',
        body:
          'A villa on a hill, a pair of borrowed scooters, and a route mapped carefully ' +
          'between the sea and the vineyards. The wedding was less an event than an ' +
          'itinerary; every guest arrived holding a map.',
        images: [asset('/images/gallery/amour-getaway-03.jpg')],
        dresses: ['azalia'],
        align: 'left',
      },
      {
        num: 'III',
        title: 'THE ROAD',
        body:
          'Confetti of white silk, ribbons knotted to the mirrors, and the two of them ' +
          'pulling away while everybody waved scarves into the wind. The honeymoon, as far ' +
          'as they were concerned, started in the driveway.',
        images: [asset('/images/gallery/amour-getaway-04.jpg')],
        align: 'right',
      },
    ],
  },
}
