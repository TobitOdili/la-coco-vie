// ─────────────────────────────────────────────────────────────────────────────
// CHAPTER PAGES — the inner-page content for the Covenant & Uvie journey.
// Pure data (no three/gsap). Rendered by pages/[slug].vue via ChapterSection /
// PopupCard (floating cards) / ChapterEnd.
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
//       while that section is active (the floating popup cards).
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
  // “Us” renders through the bespoke UsStory component (the margin-notes scrapbook),
  // which reads the extra per-scene fields: date (the stitch line), notes[] (the
  // two-voice handwritten margin notes; voice 'c' = Covenant, 'u' = Uvie), caption
  // (under the taped polaroid — images[0] only; this page is deliberately media-light).
  us: {
    sections: [
      {
        num: 'I',
        title: 'The Meeting',
        date: 'MARCH 2019',
        body:
          'Every story has a page one. Ours was an ordinary afternoon that refused to stay ' +
          'ordinary — a mutual friend, a borrowed seat, and a conversation neither of us ' +
          'wanted to end. [Placeholder — the real how-we-met story goes here, 3–5 sentences.]',
        notes: [
          { voice: 'c', text: 'he swears it was instant' },
          { voice: 'u', text: 'it took me a week. worth it.' },
        ],
        images: [asset('/images/gallery/eat-marry-love-01.jpg')],
        caption: 'the first hello',
        popups: ['momentHello'],
        align: 'left',
      },
      {
        num: 'II',
        title: 'The Question',
        date: 'THE QUESTION',
        body:
          'Years, road trips, and a hundred small kindnesses later — one of us got down on ' +
          'one knee. There was a speech, and there were tears. [Placeholder — the proposal ' +
          'story: where it happened, who was in on it, what was said.]',
        notes: [
          { voice: 'c', text: 'rehearsed for weeks. forgot every word.' },
          { voice: 'u', text: 'the tears came first. his.' },
        ],
        images: [asset('/images/gallery/eat-marry-love-03.jpg')],
        caption: 'she said yes',
        popups: ['momentYes'],
        align: 'right',
      },
      {
        num: 'III',
        title: 'The Yes',
        date: 'AND NOW',
        body:
          'Two families becoming one, two names on one invitation. We are Covenant Odili ' +
          'and Uvie Dan-Egua, and we cannot wait to write the next chapter with everyone ' +
          'we love in the room. [Placeholder — a short closing note that hands the reader ' +
          'on to The Big Day.]',
        notes: [
          { voice: 'c', text: 'two names, one invitation' },
          { voice: 'u', text: 'see you there — U & C' },
        ],
        images: [asset('/images/gallery/eat-marry-love-05.jpg')],
        caption: 'october twenty-seven',
        popups: [],
        align: 'left',
      },
    ],
  },

  // “The Big Day” renders through the bespoke BigDay component (“The Hours”): scroll
  // scrubs the day from morning light into night; the two threads TIE THE KNOT at
  // 12:00 (sticky, reversible). Scenes are info signposts hung off the thread — this
  // page is deliberately photo-free. Fields: time, lines[] (short skimmable facts),
  // vow (the caption at the knot), body (scene 0’s subtitle). No images.
  'the-big-day': {
    sections: [
      {
        num: '—',
        time: '07:00',
        title: 'Daybreak',
        body: 'the day, hour by hour',
        popups: [],
        align: 'center',
      },
      {
        num: 'I',
        time: '12:00',
        title: 'The Ceremony',
        vow: 'we do.',
        lines: [
          'doors open 11:30 — sit close, sing loud',
          '[venue name + address — placeholder]',
        ],
        popups: ['mapCeremony', 'calCeremony'],
        align: 'center',
      },
      {
        num: 'II',
        time: '16:00',
        title: 'The Reception',
        lines: [
          'dinner · toasts · the first dance',
          '[venue name + address — placeholder]',
          'if you leave hungry, that is on you',
        ],
        popups: ['mapReception'],
        align: 'right',
      },
      {
        num: 'III',
        time: '22:00',
        title: 'The Party',
        lines: [
          'the floor opens and does not close',
          'until they beg us to stop',
          'dress to celebrate [colours — placeholder]',
        ],
        popups: ['dressCode'],
        align: 'left',
      },
    ],
  },

  // “In Frames” renders through the bespoke InFrames component (“The Screening Room”):
  // the page goes dark, the thread becomes the film strip, and scroll advances the
  // film through a projector gate — one photo owning the screen at a time. Fields:
  // sections[1].exposures[] = { src, cap } (Roll 01; caps are the subtitles);
  // sections[2].reserved[] = the future rolls' title cards.
  'in-frames': {
    sections: [
      { num: '—', title: 'Now Showing', popups: [], align: 'center' },
      {
        num: '01',
        title: 'The Pre-Wedding',
        exposures: [
          { src: asset('/images/gallery/wine-the-bride-01.jpg'), cap: 'we tried to act natural' },
          { src: asset('/images/gallery/wine-the-bride-02.jpg'), cap: 'this one survived the laughing fit' },
          { src: asset('/images/gallery/wine-the-wine-01.jpg'), cap: 'golden hour, borrowed jacket' },
          { src: asset('/images/gallery/wine-the-wine-02.jpg'), cap: 'the photographer said “again”' },
          { src: asset('/images/gallery/wine-the-people.jpg'), cap: 'everyone we love, one frame' },
        ],
        popups: ['fullAlbum'],
        align: 'center',
      },
      {
        num: '02–03',
        title: 'Reserved',
        reserved: [
          { title: 'The Traditional', note: 'date tbc' },
          { title: 'The White Wedding', note: 'october 27, 2026' },
        ],
        popups: [],
        align: 'center',
      },
      { num: '—', title: 'End of Reel', popups: [], align: 'center' },
    ],
  },

  // “With Love” renders through the bespoke WithLove component (“Thank-You in Advance”):
  // the thread becomes INK — it writes the thank-you, circles each gift like something
  // marked in a catalogue, then splits in two to SIGN both names. No shop; each gift is
  // written as the future memory it becomes, and the registry link is the floating card.
  // Fields: kind ('open'|'gift'|'sign'); gift scenes = { memory, gift, popups:[regKey] }.
  'with-love': {
    sections: [
      {
        kind: 'open',
        lead: 'before you give us a single thing —',
        big: 'thank you',
        sub: 'your presence on the day is the whole gift. truly.',
        pivot: 'but if your love language comes wrapped with a bow…',
        popups: [],
      },
      {
        kind: 'gift',
        memory: 'slow sunday mornings — two cups, no hurry.',
        gift: 'the espresso machine',
        thanks: 'thank you.',
        popups: ['regEspresso'],
      },
      {
        kind: 'gift',
        memory: 'every table we will set for the people we love.',
        gift: 'dinnerware for twelve',
        thanks: 'thank you.',
        popups: ['regDinner'],
      },
      {
        kind: 'gift',
        memory: 'for everywhere we have not been yet.',
        gift: 'a weekender for two',
        thanks: 'thank you.',
        popups: ['regLuggage'],
      },
      {
        kind: 'gift',
        memory: 'the first of many, many adventures.',
        gift: 'the honeymoon fund',
        thanks: 'thank you.',
        popups: ['regFund'],
      },
      {
        kind: 'sign',
        closer: 'with love,',
        names: ['Covenant', 'Uvie'],
        tail: 'see you on october 27.',
        popups: [],
      },
    ],
  },
}
