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
//     ✅ DONE for the whole US page (2026-08-31 — polaroids AND both popup cards)
//     and the In Frames reel. ⚠️ NOTHING references `/images/gallery/` any more:
//     all 3.8 MB of Milla Nova stills there are now unused (kept, not deleted).
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
  // ⚠️ 2026-08-31 — the couple’s own photos, and LOREM IPSUM copy to match the US page
  // (see the `us` chapter below). Real words + card titles land with the real content.
  momentHello: {
    title: 'Lorem Ipsum',
    params: ['dolor sit amet · adipiscing', 'consectetur elit'],
    photo: asset('/images/us/neon-restaurant.jpg'),
  },
  momentYes: {
    title: 'Dolor Sit Amet',
    params: ['sed do eiusmod · tempor'],
    photo: asset('/images/us/love-big-ben.jpg'),
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

  // “In Frames” — the shared Drive folder guests upload their own shots into.
  // ⚠️ PLACEHOLDER url — swap for the real Google Drive folder link.
  fullAlbum: {
    title: 'Add Your Photos',
    params: ['your shots from the day', 'upload to our shared drive ↗'],
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
  //
  // ⚠️ 2026-08-31 — the POLAROIDS are now the couple’s OWN photos (from `new frames/`,
  // resized to 900px into `/images/us/`), and every string except the section HEADINGS
  // is deliberate LOREM IPSUM at the user’s request — the page is being reviewed for
  // layout/typography, not for copy. Real words land when the couple write them.
  us: {
    sections: [
      {
        num: 'I',
        title: 'The Meeting',
        date: 'LOREM IPSUM',
        body:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor ' +
          'incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis ' +
          'nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        notes: [
          { voice: 'c', text: 'lorem ipsum dolor sit amet' },
          { voice: 'u', text: 'consectetur adipiscing elit' },
        ],
        images: [asset('/images/us/tower-bridge.jpg')],
        caption: 'lorem ipsum dolor',
        popups: ['momentHello'],
        align: 'left',
      },
      {
        num: 'II',
        title: 'The Question',
        date: 'DOLOR SIT AMET',
        body:
          'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu ' +
          'fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in ' +
          'culpa qui officia deserunt mollit anim id est laborum.',
        notes: [
          { voice: 'c', text: 'sed do eiusmod tempor incididunt' },
          { voice: 'u', text: 'ut labore et dolore magna' },
        ],
        images: [asset('/images/us/brunch-day.jpg')],
        caption: 'consectetur adipiscing',
        popups: ['momentYes'],
        align: 'right',
      },
      {
        num: 'III',
        title: 'The Yes',
        date: 'CONSECTETUR ELIT',
        body:
          'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium ' +
          'doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore ' +
          'veritatis et quasi architecto beatae vitae dicta sunt explicabo.',
        notes: [
          { voice: 'c', text: 'quis nostrud exercitation' },
          { voice: 'u', text: 'ullamco laboris nisi ut aliquip' },
        ],
        images: [asset('/images/us/trad-portrait.jpg')],
        caption: 'sed do eiusmod',
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

  // “In Frames” renders through the bespoke InFrames component — ONE pinned
  // sequence, not a stack of sections. Past the hero the page stops moving
  // vertically: the title fades as the first spool loops in, the other two follow,
  // three lengths of ONE film run across the room, then they leave in reverse
  // order while END OF REEL fades in. Vertical scroll resumes after that, into the
  // RSVP and the outro.
  'in-frames': {
    sections: [
      {
        kind: 'reel',
        num: '01',
        title: 'Our Journey In Frames',
        present: 'COVENANT & UVIE PRESENT',
        sub: 'A LOVE STORY, ONE FRAME AT A TIME',
        // The dimmed line the spools run over once the title has gone.
        watermark: 'COVENANT & UVIE PRESENT',
        endTitle: 'END OF REEL',
        endSub: 'MORE EXPOSURES AFTER OCTOBER 27',
        // ⚠️ PLACEHOLDER — the two photos alternate along every spool. Add more and
        // they cycle in order; the component reads the array length.
        frames: [
          asset('/images/reel/car-selfie-sm.jpg'),
          asset('/images/reel/bw-beanie-sm.jpg'),
        ],
        popups: ['fullAlbum'],
        align: 'center',
      },
    ],
  },

  // “With Love” renders through the bespoke WithLove component (“Thank-You in Advance”):
  // the thread becomes INK — it writes the thank-you, circles each gift like something
  // marked in a catalogue, then splits in two to SIGN both names. No shop; each gift is
  // written as the future memory it becomes, and the registry link is the floating card.
  // Fields: kind ('open'|'gift'|'sign'); gift scenes = { memory, gift, popups:[regKey] }.
  // ── WITH LOVE — "the ink": one line wanders the page and lassoes each gift. ──
  // The gift words are scattered across the page; a single scroll-drawn line
  // threads them, looping around each name as it arrives. Hovering a gift (or,
  // on touch, scrolling it to the middle of the screen) fades its picture in on
  // a torn scrap of paper.
  // Item shape: { memory, name, image, x (% across the page), claimed }
  //   • `x` is the art direction — alternate sides so the line has to travel.
  //     The CURVE ITSELF IS MEASURED from where the words actually land, so `x`
  //     can change freely and mobile can stack them centred without breaking it.
  //   • `claimed: true` greys an item out + marks it taken. Supported but unused
  //     until gifts are actually tracked.
  // No prices, no per-item links (user decision 2026-08-10); the cash card near
  // the end is the only call to action, and shows NO account details.
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
        kind: 'gifts',
        items: [
          {
            memory: 'slow sunday mornings — two cups, no hurry.',
            name: 'the espresso machine',
            image: PLACEHOLDER_ITEM, x: 34, claimed: false,
          },
          {
            memory: 'every table we will set for the people we love.',
            name: 'dinnerware for twelve',
            image: PLACEHOLDER_ITEM, x: 68, claimed: false,
          },
          {
            memory: 'the jollof will be judged. we intend to be ready.',
            name: 'a good, heavy pot',
            image: PLACEHOLDER_ITEM, x: 36, claimed: false,
          },
          {
            memory: 'for the first morning we wake up somewhere that is ours.',
            name: 'linens, the soft kind',
            image: PLACEHOLDER_ITEM, x: 70, claimed: false,
          },
          {
            memory: 'the one we will read under, badly, until far too late.',
            name: 'a lamp for the corner',
            image: PLACEHOLDER_ITEM, x: 32, claimed: false,
          },
          {
            memory: 'for everywhere we have not been yet.',
            name: 'a weekender for two',
            image: PLACEHOLDER_ITEM, x: 66, claimed: false,
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
        popups: [],
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
