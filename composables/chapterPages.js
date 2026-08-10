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

import { asset } from '~/utils/asset'

// ⚠️ PLACEHOLDER registry art — ONE stock clipart cut-out standing in for every
// item, so the album's layout/motion can be judged before the real list exists.
// It carries the stock vendor's watermark on purpose (it is a free preview, not a
// licensed asset) — swap per item via `image:` before launch. See
// docs/CONTENT-AND-ASSETS.md → "The registry album".
const PLACEHOLDER_ITEM = asset('/images/registry/placeholder-item.png')

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
  // ⚠️ The four reg* cards above are ORPHANED as of 2026-08-10: the With Love
  // album renders its items in the page and has no floating popups. Kept only
  // in case the album ever wants a utility card; delete if it never does.
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
  // ── WITH LOVE — "the album": a scrapbook of cut-outs, pasted page by page. ──
  // No prices, no per-item links (user decision 2026-08-10): the items say what
  // we'd love, and the ONE call to action is the cash card at the end.
  // Item shape: { name, caption, image, w (page-width %), rot (deg), claimed }
  //   • `claimed: true` greys an item out + marks it taken. Supported but unused
  //     until gifts are actually tracked.
  'with-love': {
    sections: [
      {
        kind: 'cover',
        big: 'with love',
        lead: 'before you give us a single thing —',
        sub: 'your presence on the day is the whole gift. truly.',
        pivot: 'but if your love language comes wrapped with a bow, we kept a little book of wishes.',
        popups: [],
      },
      {
        kind: 'spread',
        no: 'i',
        heading: 'for the kitchen',
        note: 'where most of our arguing — and all of our eating — will happen.',
        items: [
          {
            name: 'the espresso machine',
            caption: 'slow sunday mornings, two cups, no hurry.',
            image: PLACEHOLDER_ITEM, w: 44, rot: -3.2, claimed: false,
          },
          {
            name: 'dinnerware for twelve',
            caption: 'every table we will set for the people we love.',
            image: PLACEHOLDER_ITEM, w: 36, rot: 2.6, claimed: false,
          },
          {
            name: 'a good, heavy pot',
            caption: 'the jollof will be judged. we intend to be ready.',
            image: PLACEHOLDER_ITEM, w: 33, rot: -1.4, claimed: false,
          },
        ],
        popups: [],
      },
      {
        kind: 'spread',
        no: 'ii',
        heading: 'for the home',
        note: 'the small things that turn an address into a place you want to be.',
        items: [
          {
            name: 'linens, the soft kind',
            caption: 'for the first morning we wake up somewhere that is ours.',
            image: PLACEHOLDER_ITEM, w: 40, rot: 2.1, claimed: false,
          },
          {
            name: 'a lamp for the corner',
            caption: 'the one we will read under, badly, until far too late.',
            image: PLACEHOLDER_ITEM, w: 32, rot: -2.8, claimed: false,
          },
          {
            name: 'frames, empty for now',
            caption: 'we have a wedding coming. they will not stay empty.',
            image: PLACEHOLDER_ITEM, w: 37, rot: 1.5, claimed: false,
          },
        ],
        popups: [],
      },
      {
        kind: 'spread',
        no: 'iii',
        heading: 'for the going',
        note: 'because staying in is lovely, and leaving is lovelier.',
        items: [
          {
            name: 'a weekender for two',
            caption: 'for everywhere we have not been yet.',
            image: PLACEHOLDER_ITEM, w: 42, rot: -2.2, claimed: false,
          },
          {
            name: 'the picnic basket',
            caption: 'optimistic, in this weather. we are doing it anyway.',
            image: PLACEHOLDER_ITEM, w: 34, rot: 3.1, claimed: false,
          },
        ],
        popups: [],
      },
      {
        kind: 'cash',
        heading: 'or, simply —',
        body:
          'if you would rather send something toward the honeymoon, that is more than ' +
          'welcome, and we will think of you every single day of it.',
        cta: 'how to send it',
        // ⚠️ PLACEHOLDER — becomes a payment link or a get-in-touch destination.
        // NO bank details on the page (user decision 2026-08-10).
        url: '#',
        note: 'no account numbers here, on purpose — this just puts you in touch with us.',
        sign: 'with love, Covenant & Uvie',
        popups: [],
      },
    ],
  },
}
