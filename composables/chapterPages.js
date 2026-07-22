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
// PROVENANCE
//  • COPY — VERBATIM from the reference (chapter.millanova.com), harvested 2026-07-22.
//    Getting it needed a real TOUCH TAP on the front card under mobile emulation: the site
//    is a pure-WebGL SPA whose inner pages never mount for `setSelected()` or a synthetic
//    click, and cold deep-links bounce to `/`. (An earlier pass wrongly concluded the copy
//    was unobtainable and shipped invented placeholder text — this replaced it.)
//    Section COUNTS differ per chapter: wine 3, eat-marry-love 5, la-storia 5, amour 3.
//    Reference quirks kept as-is: "pallete" (sic) in wine II. Their numbering labels the
//    last two eat-marry-love sections both "Chapter IV" — corrected here to IV and V.
//  • GALLERIES — still PLACEHOLDER: frames extracted from each chapter's own
//    public/video/*-intro.mp4. The reference's real gallery photos are a later swap.
//  • DRESSES — real names/photos/links from millanova.com/collection/chapter-bride. The
//    reference pairs Yaroslava with wine, Markita with la-storia, Kohana+Yaroslava with
//    amour; we use the subset whose images we host.
// ─────────────────────────────────────────────────────────────────────────────

const base = (import.meta.env.BASE_URL || '/').replace(/\/$/, '')
const asset = (p) => `${base}${p}`
const dressUrl = (slug) => `https://millanova.com/dress/${slug}`

// Dresses referenced by the dress-tail popups. `params` mirrors the reference's own format
// (it shows e.g. "silhouette: straight"); the collection tag is used where we didn't capture specs.
export const DRESSES = {
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
  aggie: { title: 'Aggie', photo: asset('/images/dresses/aggie.jpg'), params: ['collection: chapter bride'], url: dressUrl('aggie') },
  alaia: { title: 'Alaia', photo: asset('/images/dresses/alaia.jpg'), params: ['collection: chapter bride'], url: dressUrl('alaia') },
  aldrans: { title: 'Aldrans', photo: asset('/images/dresses/aldrans.jpg'), params: ['collection: chapter bride'], url: dressUrl('aldrans') },
  aminata: { title: 'Aminata', photo: asset('/images/dresses/aminata.jpg'), params: ['collection: chapter bride'], url: dressUrl('aminata') },
  andalusia: { title: 'Andalusia', photo: asset('/images/dresses/andalusia.jpg'), params: ['collection: chapter bride'], url: dressUrl('andalusia') },
  antonelly: { title: 'Antonelly', photo: asset('/images/dresses/antonelly.jpg'), params: ['collection: chapter bride'], url: dressUrl('antonelly') },
  arcada: { title: 'Arcada', photo: asset('/images/dresses/arcada.jpg'), params: ['collection: chapter bride'], url: dressUrl('arcada') },
  ariel: { title: 'Ariel', photo: asset('/images/dresses/ariel.jpg'), params: ['collection: chapter bride'], url: dressUrl('ariel') },
  azalia: { title: 'Azalia', photo: asset('/images/dresses/azalia.jpg'), params: ['collection: chapter bride'], url: dressUrl('azalia') },
}

// sections[]: { num, title, body, images[], dresses[], align }
//   • images[0]  → the full-height photo in the split (flush to one edge)
//   • images[1…] → full-bleed bands below the split
//   • dresses[]  → the floating popups shown while that section is the active one
export const CHAPTER_PAGES = {
  'wine-o-clock': {
    sections: [
      {
        num: 'I',
        title: 'THE BRIDE',
        body:
          'Meet Ivy, a self-sufficient and open-minded professional sommelier who has turned her ' +
          'love for wine into her career. She wanted to share her passion with closest friends, so ' +
          'she organized an intimate wedding in a picturesque Italian vineyard to enjoy a carefree ' +
          'fun yet flawless celebration, reflecting her approach to life.',
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
          'surprising. From the taste, scent, color, and the making process – it’s beautiful in ' +
          'every way. Treat yourself to a glass and let each sip transport your pallete to a new ' +
          'experience.',
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
          'Surrounded by your dearest friends, you share the most important moment in your life – ' +
          'a ceremony nestled in the embrace of nature. In the company of those who have stood by ' +
          'you through thick and thin, this is an intimate atmosphere that wraps you in the warmth ' +
          'of shared laughter, heartfelt conversations, and unrestrained fun.',
        images: [asset('/images/gallery/wine-the-people.jpg')],
        align: 'right',
      },
    ],
  },

  'eat-marry-love': {
    sections: [
      {
        num: 'I',
        title: 'The bride',
        body:
          'This is Eleonora, she’s been dreaming about her wedding day since she was a little ' +
          'girl, with a clear idea of how she wants it to unfold. She’s steadfast in her opinions, ' +
          'unwavering, and formidable in the debate. She values her cultural heritage, so there is ' +
          'no doubt about the theme of the wedding she chose. Eleanor’s special mission? Winning ' +
          'the affection of a mama’s boy.',
        images: [
          asset('/images/gallery/eat-marry-love-01.jpg'),
          asset('/images/gallery/eat-marry-love-02.jpg'),
        ],
        dresses: ['aggie', 'alaia'],
        align: 'right',
      },
      {
        num: 'II',
        title: 'The Taste',
        body:
          'Food can be considered a cornerstone of Italian culture, and, of course, food will play ' +
          'a central role in an Italian-styled wedding. It’s always a great idea to invite a guest ' +
          'chef, who will craft freshly made dishes, ensuring guests savor an unforgettable ' +
          'culinary show that captures the essence of la dolce vita.',
        images: [asset('/images/gallery/eat-marry-love-03.jpg')],
        dresses: ['aldrans'],
        align: 'left',
      },
      {
        num: 'III',
        title: 'The Vibrancy',
        body:
          'Under the glow of the scorching sun, amid lush flora and fruity scents, ' +
          'Italian-inspired weddings are destined to burst with vibrant colors. From the boundless ' +
          'picturesque landscapes, scenic winery vistas, and endless sea views, each shade tells a ' +
          'story of passion, romance, and gioia di vivere.',
        images: [asset('/images/gallery/eat-marry-love-04.jpg')],
        align: 'right',
      },
      {
        num: 'IV',
        title: 'The Energy',
        body:
          'Italians are renowned for their expressiveness, and thus, a wedding would only be ' +
          'complete with a lively atmosphere brimming with energy that embodies the spirit of ' +
          'Italian rich cultural charm. Turn on the volume and let yourself loose!',
        images: [asset('/images/gallery/eat-marry-love-05.jpg')],
        align: 'left',
      },
      {
        num: 'V',
        title: 'The Mamma',
        body:
          'Introducing: the life of the party, the star of the tango championships, and the one ' +
          'person who can truly rattle our bride’s nerves – the groom’s mother! She is domineering, ' +
          'overly caring, and always knows best. Despite occasionally not knowing when to step ' +
          'back, her deep love for the newlyweds and her charismatic presence are what make this ' +
          'reception unforgettable.',
        images: [asset('/images/gallery/eat-marry-love-06.jpg')],
        align: 'right',
      },
    ],
  },

  'la-storia': {
    sections: [
      {
        num: 'I',
        title: 'The bride',
        body:
          'Meet the bride – Katie. She’s been dreaming about her wedding day since she was a ' +
          'little girl, with a clear idea of how she wants it to unfold. She’s the bride who brings ' +
          'her entire family to the dress fitting, valuing her father’s choices the most. Adhering ' +
          'to all traditions, she prepared something new, something blue, and something borrowed. ' +
          'Her ceremony mirrors her lifestyle: elegant, traditional, lively, and a bit showy.',
        images: [
          asset('/images/gallery/la-storia-01.jpg'),
          asset('/images/gallery/la-storia-02.jpg'),
        ],
        dresses: ['aminata', 'andalusia'],
        align: 'right',
      },
      {
        num: 'II',
        title: 'The Style',
        body:
          'Creating a truly timeless yet impressively elegant wedding is no easy task. The tricky ' +
          'part is to mingle the casual ambiance amidst the splendor effortlessly. While every ' +
          'detail is imbued with elegance and every touch is filled with lushness, there should be ' +
          'a balance of all to ensure an air of ease for the guests.',
        images: [asset('/images/gallery/la-storia-03.jpg')],
        dresses: ['antonelly'],
        align: 'left',
      },
      {
        num: 'III',
        title: 'The Bride Tribe',
        body:
          'Meet a tight-knit circle of confidantes who ensure the wedding proceeds flawlessly. ' +
          'They’re always wrapped up in the world around them, too busy to talk about themselves, ' +
          'but they’ll always find time to catch up and discuss everyone else’s lives in detail. ' +
          'In their world, loyalty reigns supreme, and drama rules over all.',
        images: [asset('/images/gallery/la-storia-04.jpg')],
        align: 'right',
      },
      {
        num: 'IV',
        title: 'The Moment',
        body:
          'With weddings overflowing with activities, newlyweds often overlook the importance of ' +
          'pausing to savor the moment together. Amidst the bustling celebration with a whirlwind ' +
          'schedule, Katie and Luke managed to take a step back, capturing the moment in their ' +
          'memories, savoring it, and truly appreciating the day.',
        images: [asset('/images/gallery/la-storia-05.jpg')],
        align: 'left',
      },
      {
        num: 'V',
        title: 'The Bash',
        body:
          'As the tally of glasses consumed becomes a mystery, the true bash begins. For it is ' +
          'amidst your nearest friends that you can abandon restraint, casting off inhibitions. ' +
          'And the most pleasing part is that the venue has the knack for shrouding any ' +
          'undesirable details from public scrutiny.',
        images: [asset('/images/gallery/la-storia-06.jpg')],
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
          'Introducing the bride – Viki. She struggles to stay in one place, fueled by her ' +
          'insatiable thirst for adventure. She found a husband who shares her adventurous spirit ' +
          'and supports any wild ideas she has. She is unconventional, imaginative, and strives ' +
          'diligently for independence.',
        images: [
          asset('/images/gallery/amour-getaway-01.jpg'),
          asset('/images/gallery/amour-getaway-02.jpg'),
        ],
        dresses: ['arcada', 'yaroslava'],
        align: 'right',
      },
      {
        num: 'II',
        title: 'THE INTIMACY',
        body:
          'Introducing the lovebirds: Viki and Michael. Despite their penchant for grand ' +
          'celebrations, their deepest desire is to exchange vows in private atop a mountain or on ' +
          'the edge of a cliff in another country. However, the parents who organized the wedding ' +
          'had a different opinion.',
        images: [asset('/images/gallery/amour-getaway-03.jpg')],
        dresses: ['azalia'],
        align: 'left',
      },
      {
        num: 'III',
        title: 'HAPPILY EVER AFTER',
        body:
          'Newlyweds have served the official part of the celebration, and they finally can with a ' +
          'clear conscience escape earlier to their amour getaway across the highway "Happily Ever ' +
          'After". Cheers!',
        images: [asset('/images/gallery/amour-getaway-04.jpg')],
        align: 'right',
      },
    ],
  },
}
