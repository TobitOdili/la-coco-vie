// ─────────────────────────────────────────────────────────────────────────────
// CHAPTER PAGES — the inner-page content for the Covenant & Uvie journey.
// Pure data (no three/gsap). Rendered by pages/[slug].vue via ChapterSection /
// DressTail (popup cards) / ChapterEnd.
//
// ⚠️ EVERYTHING BELOW IS PLACEHOLDER (2026-07-23). The couple will correct:
//   • COPY — written to demonstrate placement + tone, not facts. Every date,
//     venue, time and story beat is invented; [bracketed notes] mark what to fill.
//   • IMAGES — reused Milla Nova film stills (right aspect ratios, wrong people).
//     Swap for the couple's shoots, keeping roughly the same counts per section.
//   • POPUPS — dummy registry items / map links; urls are '#' dead links.
//
// (The previous Milla Nova replica content — the reference's verbatim harvested
// copy — is preserved in git history at a4224399 should it ever be needed.)
//
// Shape:
//   CHAPTER_PAGES[slug].sections[] = { num, title, body, images[], popups[], align }
//     • images[0] leads the split; the rest render as full-bleed bands.
//     • popups[] → keys into POPUPS: the floating cards pinned to the viewport
//       while that section is active (the old dress cards, generalized).
//   POPUPS[key] = { title, params[], photo?, url? } — photo and url are optional.
// ─────────────────────────────────────────────────────────────────────────────

const base = (import.meta.env.BASE_URL || '/').replace(/\/$/, '')
const asset = (p) => `${base}${p}`

// ── The floating popup cards ─────────────────────────────────────────────────
export const POPUPS = {
  // “Us” — captioned moments (polaroids that follow the story).
  momentHello: {
    title: 'The First Hello',
    params: ['lagos · march 2019', 'placeholder moment'],
    photo: asset('/images/gallery/eat-marry-love-01.jpg'),
  },
  momentYes: {
    title: 'She Said Yes',
    params: ['the proposal · placeholder'],
    photo: asset('/images/gallery/eat-marry-love-04.jpg'),
  },

  // “The Big Day” — utility cards (maps / calendar / dress code).
  mapCeremony: {
    title: '📍 The Ceremony',
    params: ['oct 27, 2026 · 12 noon', 'venue tbc — open in maps'],
    url: '#',
  },
  calCeremony: {
    title: '🗓 Add to Calendar',
    params: ['placeholder — ics link coming'],
    url: '#',
  },
  mapReception: {
    title: '📍 The Reception',
    params: ['oct 27, 2026 · 4 pm', 'venue tbc — open in maps'],
    url: '#',
  },
  dressCode: {
    title: 'The Dress Code',
    params: ['colours of the day: tbc', 'come beautiful, come comfy'],
  },

  // “In Frames” — album link.
  fullAlbum: {
    title: 'The Full Album',
    params: ['every photo, one place', 'coming soon'],
    url: '#',
  },

  // “With Love” — dummy registry items until the real list arrives.
  regFund: {
    title: 'The Honeymoon Fund',
    params: ['contribute any amount', 'placeholder link'],
    url: '#',
  },
  regEspresso: {
    title: 'Espresso Machine',
    params: ['for slow sunday mornings', 'placeholder item'],
    url: '#',
  },
  regDinner: {
    title: 'Dinnerware for Twelve',
    params: ['for the tables we will host', 'placeholder item'],
    url: '#',
  },
  regLuggage: {
    title: 'Weekender Luggage',
    params: ['for everywhere we have not been', 'placeholder item'],
    url: '#',
  },
}

// ── The four chapters ────────────────────────────────────────────────────────
export const CHAPTER_PAGES = {
  us: {
    sections: [
      {
        num: 'I',
        title: 'The Meeting',
        body:
          'Every story has a page one. Ours was an ordinary afternoon that refused to stay ' +
          'ordinary — a mutual friend, a borrowed seat, and a conversation neither of us ' +
          'wanted to end. Covenant swears he knew by the second cup of coffee. Uvie says ' +
          'it took a week. We have agreed to disagree, forever. [Placeholder — the real ' +
          'how-we-met story goes here, 3–5 sentences.]',
        images: [
          asset('/images/gallery/eat-marry-love-01.jpg'),
          asset('/images/gallery/eat-marry-love-02.jpg'),
        ],
        popups: ['momentHello'],
        align: 'left',
      },
      {
        num: 'II',
        title: 'The Question',
        body:
          'Years, road trips, and a hundred small kindnesses later — one of us got down on ' +
          'one knee. There was a speech, carefully rehearsed and instantly forgotten. There ' +
          'were tears, though we still argue about whose came first. [Placeholder — the ' +
          'proposal story: where it happened, who was in on it, what was said.]',
        images: [asset('/images/gallery/eat-marry-love-03.jpg')],
        popups: ['momentYes'],
        align: 'right',
      },
      {
        num: 'III',
        title: 'The Yes',
        body:
          'And now — this. Two families becoming one, two names on one invitation. We are ' +
          'Covenant Odili and Uvie Dan-Egua, and we cannot wait to write the next chapter ' +
          'with everyone we love in the room. [Placeholder — a short closing note that ' +
          'hands the reader on to The Big Day.]',
        images: [
          asset('/images/gallery/eat-marry-love-05.jpg'),
          asset('/images/gallery/eat-marry-love-06.jpg'),
        ],
        popups: [],
        align: 'left',
      },
    ],
  },

  'the-big-day': {
    sections: [
      {
        num: 'I',
        title: 'The Ceremony',
        body:
          'The part where we say the words. Join us at twelve noon on October 27, 2026 ' +
          'as we exchange our vows. Doors open at 11:30 — come ' +
          'early, sit close, sing loud. [Placeholder — church/venue name and address, plus ' +
          'any notes on parking or arrival.]',
        images: [
          asset('/images/gallery/la-storia-01.jpg'),
          asset('/images/gallery/la-storia-02.jpg'),
        ],
        popups: ['mapCeremony', 'calCeremony'],
        align: 'left',
      },
      {
        num: 'II',
        title: 'The Reception',
        body:
          'Then we eat. From four o’clock the celebration moves to the reception venue ' +
          '[placeholder — name and address]: dinner, toasts, and the small matter of our ' +
          'first dance. If you leave hungry, that is entirely on you.',
        images: [asset('/images/gallery/la-storia-03.jpg')],
        popups: ['mapReception'],
        align: 'right',
      },
      {
        num: 'III',
        title: 'The Party',
        body:
          'And then we dance. The band hands over to the DJ, the lights come down, and the ' +
          'floor is open until we are asked — politely but firmly — to leave. Dress to ' +
          'celebrate. [Placeholder — after-party details, dress-code specifics, colours of ' +
          'the day.]',
        images: [
          asset('/images/gallery/la-storia-04.jpg'),
          asset('/images/gallery/la-storia-05.jpg'),
        ],
        popups: ['dressCode'],
        align: 'left',
      },
    ],
  },

  'in-frames': {
    sections: [
      {
        num: 'I',
        title: 'The Pre-Wedding',
        body:
          'We put on our good clothes, stood where the photographer pointed, and tried to ' +
          'act natural. These are the frames that survived the laughing fits. [Placeholder ' +
          '— a line or two about the pre-wedding shoot: where, when, and by whom.]',
        images: [
          asset('/images/gallery/wine-the-bride-01.jpg'),
          asset('/images/gallery/wine-the-bride-02.jpg'),
        ],
        popups: ['fullAlbum'],
        align: 'left',
      },
      {
        num: 'II',
        title: 'The Traditional',
        body:
          'Colour, culture, and both families in their finest. This gallery fills after ' +
          'the traditional ceremony — check back soon. [Placeholder — swap in the ' +
          'traditional-engagement photos when they exist.]',
        images: [asset('/images/gallery/wine-the-wine-01.jpg')],
        popups: [],
        align: 'right',
      },
      {
        num: 'III',
        title: 'The White Wedding',
        body:
          'The aisle, the vows, the exit through a corridor of confetti. This chapter is ' +
          'still being written — the frames land here after October 27. [Placeholder — ' +
          'the post-wedding gallery.]',
        images: [
          asset('/images/gallery/wine-the-wine-02.jpg'),
          asset('/images/gallery/wine-the-people.jpg'),
        ],
        popups: [],
        align: 'left',
      },
    ],
  },

  'with-love': {
    sections: [
      {
        num: 'I',
        title: 'Your Presence',
        body:
          'Let us say it plainly: the greatest gift is you, in the room, on the day. ' +
          'Travel safely, dance freely, and consider every obligation fulfilled. ' +
          '[Placeholder — the couple’s own words on gifts; keep it warm and short.]',
        images: [
          asset('/images/gallery/amour-getaway-01.jpg'),
          asset('/images/gallery/amour-getaway-02.jpg'),
        ],
        popups: ['regFund'],
        align: 'left',
      },
      {
        num: 'II',
        title: 'The Wishlist',
        body:
          'But if your love language comes wrapped with a bow — here is a small wishlist ' +
          'for the home we are building. Anything on it, in any measure, will be ' +
          'treasured. [Placeholder — the real registry replaces these dummy cards; each ' +
          'card links out to the store or fund.]',
        images: [asset('/images/gallery/amour-getaway-03.jpg')],
        popups: ['regEspresso', 'regDinner', 'regLuggage'],
        align: 'right',
      },
    ],
  },
}
