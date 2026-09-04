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
//     and the In Frames reel. ⚠️ `/images/gallery/` and `/images/dresses/` were
//     DELETED on 2026-09-03 — 4.6 MB of the reference site's own photographs,
//     referenced by nothing but still being deployed at guessable URLs. Originally:
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

  // “The Big Day” — utility cards (maps / calendar / dress code). Two weddings, so
  // each day carries its own map(s); ONE calendar card on the cover covers both days
  // (a single .ics with two events), which also keeps the dock to two cards wide —
  // three would overflow a 390px phone, since .popup-stack is one flex row.
  calBoth: {
    title: '🗓 Add to Calendar',
    params: ['both days · one file'],
    url: '#',
  },
  // ⚠️ Keep params SHORT (ideally one line each). These dock at the viewport bottom on
  // a phone, and every extra wrapped line raises the dock over the page's own copy.
  // ⚠️ The three MAP links moved INTO the calendar's expanding card (2026-08-31) — a
  // docked card would have covered the very panel it duplicated. They live on
  // `marks[].events[].map` in the-big-day below; there are no map popups any more.
  // ⚠️ ORPHANED 2026-08-31 — each day's dress code is now written on its own card in
  // the calendar (`marks[].dress`). Kept only in case a docked version is wanted again.
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
  // ⚠️ Was a bordered box mid-page on With Love ("or, simply —"). The user's note:
  // it read as out of character — a hard rectangle with a button, on a chapter that
  // is otherwise ink on paper. It is the floating dock card now, the same widget the
  // other chapters use, so the offer is present without interrupting the writing.
  cashNote: {
    title: 'Even better,',
    params: ['monetize your gift to us'],
    // ⚠️ `action` (not `url`) — this opens the panel ON the page rather than
    // jumping to another tab. WithLove renders it; PopupCard only raises the flag.
    action: 'cash',
  },
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
  //
  // ⚠️ 2026-09-02 — the page is now WRITTEN, not set: every string here is rendered in
  // the hand (Over the Rainbow) and revealed WORD BY WORD off the scroll position. Two
  // consequences for whoever writes the real copy:
  //   • `body` is capped at ~3 SHORT sentences per scene on purpose. Handwriting is
  //     roughly 1.4× the height of the old sans at the same measure, and every word
  //     costs scroll travel — a long paragraph turns the section into a marathon.
  //   • `date` is lower-case now. It used to be an upper-case, letter-spaced label;
  //     neither survives a script hand, which has no capitals worth spacing out.
  us: {
    sections: [
      {
        num: 'I',
        title: 'The Meeting',
        date: 'lorem ipsum',
        body:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor ' +
          'incididunt ut labore et dolore magna. Ut enim ad minim veniam, quis nostrud.',
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
        date: 'dolor sit amet',
        body:
          'Duis aute irure dolor in reprehenderit in voluptate velit. Esse cillum dolore ' +
          'eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.',
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
        date: 'consectetur elit',
        body:
          'Sed ut perspiciatis unde omnis iste natus error sit. Voluptatem accusantium ' +
          'doloremque laudantium, totam rem aperiam. Eaque ipsa quae ab illo inventore.',
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

  // “The Big Day” renders through the bespoke BigDay component (“The Calendar”):
  // October 2026 as a page off a wall calendar, with the two wedding days RINGED in
  // marker and annotated by hand. Hovering (or tapping) a ringed date swaps the detail
  // panel below the grid — motion is navigation, never decoration.
  //   ⚠️ 2026-08-31 — this replaced a “Two Invitations” pass, which the user said "lost
  //   its flair… looks like every other page on the internet", and before that “The
  //   Hours”, whose drawn thread "takes the attention off the info". Two rules came out
  //   of those: DATES ARE NUMERALS (spelled-out dates were "confusing and terrible UX"),
  //   and nothing on this page may move while a guest is reading it.
  // Fields: kind ('calendar'|'notes').
  //   calendar = { monthISO, marks[{ day, label, scrawl, rot, dress,
  //                events[{ time, name, venue, address, map }] }] }
  //     • The GRID IS COMPUTED from monthISO — never hand-write the weekday alignment.
  //     • `scrawl` is the marker note written across the day; keep it 1–2 short words
  //       or it overruns its cell on a phone. `rot` is its angle in degrees.
  //     • No floating popups on this scene: the expanding card IS the detail, and a
  //       docked card would sit on top of it.
  //   notes = { title, lines[{ label, value }] } — the practical leftovers.
  'the-big-day': {
    sections: [
      {
        kind: 'calendar',
        num: 'I',
        title: 'October 2026',
        monthISO: '2026-10',
        marks: [
          {
            day: 23,
            label: 'Traditional Marriage',
            scrawl: 'traditional',
            rot: -7,
            // ── THE HOVER EASTER EGG ──
            // A path under `public/` turns it on; hovering (or, on touch, tapping)
            // this date then plays it. e.g. sound: '/audio/trad.wav'
            // ⚠️ Optional and OFF by default: a mark with no `sound`, or one whose
            // file fails to load, is simply silent. The page must never depend on
            // audio existing. The site's own sound toggle already governs these —
            // Howler's mute is global, so there is no second switch.
            // ⏳ AWAITING FILES (2026-09-03): the user is sourcing the traditional
            // cue; the white wedding wants a royalty-free "Here Comes the Bride".
            sound: null,
            dress: 'Colours of the day: [tbc]',
            // ⚠️ A real place (user, 2026-09-03), city-level until the venue is
            // confirmed. Both the day card and the map section below build their
            // Google Maps and directions URLs from this one string, so they can
            // never disagree — and it replaced `map: '#'` on each event, which was
            // a dead link a guest could actually reach.
            place: 'Oguta, Imo, Nigeria',
            events: [
              { time: '[time]', name: 'The Ceremony', venue: '[venue name]', address: '[address]' },
            ],
          },
          {
            day: 29,
            label: 'White Wedding / Reception',
            scrawl: 'white wedding',
            rot: 5,
            sound: null,   // ← royalty-free "Here Comes the Bride" goes here
            dress: 'Dress code: [tbc]',
            place: 'Ikeja, Lagos, Nigeria',
            events: [
              { time: '[time]', name: 'The Ceremony', venue: '[venue name]', address: '[address]' },
              { time: '[time]', name: 'The Reception', venue: '[venue name]', address: '[address]' },
            ],
          },
        ],
        popups: [],
        align: 'center',
      },
      // ⚠️ REPLACED the "Good to know" list (user, 2026-09-03). That section was
      // five lines of `[placeholder]` answering questions nobody had asked yet;
      // where the two days actually ARE is the question every guest has, and the
      // two are 500km apart, which a list of labels hid completely.
      //
      // `place` is the only input — the component derives the map embed and the
      // directions URL from it, so there is nothing here to keep in sync. When a
      // venue is confirmed, put the full address in `place` and both the pin and
      // the directions sharpen from the city to the door.
      {
        kind: 'map',
        num: 'II',
        title: 'Getting there',
        sub: 'Two days, two states — about 500km apart. Plan for the journey between them.',
        places: [
          {
            label: 'Traditional Marriage',
            when: 'Friday 23 October',
            place: 'Oguta, Imo, Nigeria',
            venue: '[venue — tbc]',
          },
          {
            label: 'White Wedding / Reception',
            when: 'Thursday 29 October',
            place: 'Ikeja, Lagos, Nigeria',
            venue: '[venue — tbc]',
          },
        ],
        popups: [],
        align: 'center',
      },
    ],
  },

  // “In Frames” renders through the bespoke InFrames component — THE PROCESSION:
  // the couple's photographs, mounted, spiralling out of the dark toward you. One
  // is always PRESENTED at the front in colour with its note; the rest orbit away
  // as faint ghosts. Drag/swipe to bring the next forward, click the front one to
  // open it, and it advances on its own if left alone.
  //   ⚠️ 2026-08-31 (v5) — designed FROM THE HOMEPAGE'S GRAMMAR: one physical
  //   object, one continuous gesture, a depth-opacity falloff to faint ghosts, the
  //   big faint wordmark behind it, lerped pointer parallax, and a front item that
  //   is the active one. NOT its geometry — a ring seen from outside would read as
  //   the homepage repeated, so this RECEDES instead of orbiting.
  //   ⚠️ Nothing is scroll-driven and nothing pins. Four earlier iterations locked
  //   the scroll and every one was rejected.
  // Fields (one section, kind 'reel'):
  //   frames[] — the SPOOL thumbs: the room's texture, drifting far behind at 0.12.
  //   prints[] — { src, note } for the procession. 3:2 at 1200px (they get opened
  //              large). Add or remove freely; the geometry is computed from the
  //              count, so nothing else needs touching.
  'in-frames': {
    sections: [
      {
        kind: 'reel',
        num: '01',
        title: 'Our Journey In Frames',
        present: 'COVENANT & UVIE PRESENT',
        sub: 'A LOVE STORY, ONE FRAME AT A TIME',
        // ⚠️ NOT RENDERED any more (2026-09-02). The window's own empty state says
        // "Photos and videos coming soon", and a footer saying MORE PICTURES COMING
        // SOON under it was both a duplicate and a contradiction of it. Kept only
        // because other chapters read the field.
        endSub: 'MORE PICTURES COMING SOON',
        frames: [
          asset('/images/reel/car-selfie-sm.jpg'),
          asset('/images/reel/bw-beanie-sm.jpg'),
          asset('/images/reel/summer-fit-sm.jpg'),
          asset('/images/reel/dinner-date-sm.jpg'),
          asset('/images/reel/hanging-ledge-sm.jpg'),
        ],
        // ── THE FOLDERS (2026-09-02) ──
        // ⚠️ The nine "prints" that used to be the subject of this page are GONE, at
        // the user's request: they were the couple's HISTORY, and the photographs
        // this chapter is actually about are the wedding's — which do not exist yet.
        // So the page is honest about that now: three labelled folders, one per
        // event, each of which opens to an empty window.
        // `name` is BOTH the tile's label and the path segment the title bar
        // appends, so `root` + `\\` + `name` is what a visitor reads at the top of
        // the window. ⚠️ Lower case on purpose — the user's own example was
        // `...\\Media\\traditional`. When the real photographs land, give a folder an
        // `items[]` and the window renders them where the empty state is.
        // ⚠️ NOT handwritten any more (user, 2026-09-02): file names and the empty
        // state are UI text, so they are set in Bague like the rest of the window's
        // chrome. Shadows Into Light is no longer used on this page.
        root: '...\\Media',
        folders: [
          { name: 'traditional' },
          { name: 'white wedding' },
          { name: 'reception' },
        ],
        emptyTitle: 'Empty Folder',
        emptyNote: 'Photos & videos will be available soon.',
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
        // ⚠️ LOREM IPSUM (user, 2026-09-03) — the page is being reviewed for the
        // line and the layout, not for words. ⚠️ Keep `name` to SHORT words: it is
        // circled by a lasso sized from its own box, and a name that wraps to two
        // lines makes the loop sprawl across both. Three or four short words, like
        // the real gifts had. `memory` lengths are kept roughly as
        // they were on purpose: the trace is MEASURED from where these actually
        // land, so shortening them all to the same length would flatter the curve
        // in a way the real copy would not. Real gifts land when the couple pick
        // them; `x` (0–100) is the horizontal position each one sits at.
        items: [
          {
            memory: 'lorem ipsum dolor sit amet, consectetur adipiscing.',
            name: 'lorem ipsum dolor',
            image: PLACEHOLDER_ITEM, x: 34, claimed: false,
          },
          {
            memory: 'sed do eiusmod tempor incididunt ut labore et dolore.',
            name: 'dolor sit amet',
            image: PLACEHOLDER_ITEM, x: 68, claimed: false,
          },
          {
            memory: 'ut enim ad minim veniam, quis nostrud exercitation.',
            name: 'sed do eiusmod',
            image: PLACEHOLDER_ITEM, x: 36, claimed: false,
          },
          {
            memory: 'duis aute irure dolor in reprehenderit in voluptate velit.',
            name: 'ut labore et dolore',
            image: PLACEHOLDER_ITEM, x: 70, claimed: false,
          },
          {
            memory: 'excepteur sint occaecat cupidatat non proident, sunt.',
            name: 'minim veniam quis',
            image: PLACEHOLDER_ITEM, x: 32, claimed: false,
          },
          {
            memory: 'qui officia deserunt mollit anim.',
            name: 'ex ea commodo',
            image: PLACEHOLDER_ITEM, x: 66, claimed: false,
          },
        ],
        popups: ['cashNote'],
      },
      // ⚠️ Not a section — the panel the `cashNote` dock card opens. It replaced a
      // bordered box that sat mid-page and read as out of character on a chapter
      // that is otherwise ink on paper.
      {
        kind: 'cashPanel',
        heading: 'even better —',
        body:
          'if you would rather send something toward the honeymoon, that is more than ' +
          'welcome, and we will think of you every single day of it.',
        cta: 'open the payment link',
        // ⚠️ PLACEHOLDER — the couple's payment destination goes here.
        url: '#',
        popups: [],
      },
      {
        kind: 'sign',
        closer: 'with love,',
        names: ['Covenant', 'Uvie'],
        tail: 'see you on october 23 & 29.',
        popups: [],
      },
    ],
  },
}
