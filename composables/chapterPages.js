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
//   • POPUPS — the docked cards. One entry now (In Frames' album invite); the dummy registry
//     and map cards were deleted on 2026-09-20, see the note on the export.
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

// ⚠️ REGISTRY ART IS `null` UNTIL IT IS REAL. Every item used to point at one stock
// clipart cut-out carrying the vendor's own watermark — a free preview, never a
// licensed asset — and the wall rendered it, watermark and all, on every reveal. The
// panel now sizes itself to whatever is there: give an item an `image:` and it shows
// one, leave it null and the note stands alone. See docs/CONTENT-AND-ASSETS.md.

// ── The floating popup cards ─────────────────────────────────────────────────
// ⚠️ CLEANED 2026-09-20 (AUDIT #110). Six of the seven entries were referenced by nothing and
// each carried a `url: '#'`; they are gone, along with the comments that described them. One
// remains, and one section references it.
// ⚠️ AND THE COMMENTS THAT WERE WRONG ARE GONE WITH THEM. Several described
// `marks[].events[].map` and `marks[].dress` "in the-big-day below" — that chapter has no
// `marks`. Its calendar section carries `monthISO`, `mark`, `kicker` and `note`, and it renders
// no maps, no .ics and no dress code at all. Where this file and the data disagree, the data is
// right; that is what put the note here in the first place.
export const POPUPS = {
  // The one card the site still docks: In Frames' invitation to add your own photographs.
  //
  // ⚠️ SIX OF THE SEVEN ENTRIES WERE DELETED ON 2026-09-20 (AUDIT #110). Every one had been
  // orphaned for weeks and each carried a `url: '#'` — a dead link kept alive in data:
  //   • calBoth / dressCode — the calendar and the dress code are written ON the calendar's own
  //     cards now (`marks[].events[].map`, `marks[].dress`), because a docked card covered the
  //     very panel it duplicated (2026-08-31).
  //   • regFund / regEspresso / regDinner / regLuggage — placeholder registry items from before
  //     the couple's real list existed. With Love renders its items in the page and has never
  //     had floating popups (orphaned 2026-08-10).
  // The US popups went earlier still (2026-09-13, user: "remove the widgets on that coco & uvie
  // page. we won't need them"); their two images are in `new frames/` and in git at 6297b0a5.
  // Anything here is rendered by `PopupCard` and keyed from a section's `popups[]` — of which
  // exactly one, In Frames', is non-empty.
  //
  // ⚠️ PLACEHOLDER url — swap for the real Google Drive folder link. Until then PopupCard
  // renders this as a plain card rather than a link, and the copy does not promise a jump:
  // the `↗` was an arrow on a card that went nowhere.
  fullAlbum: {
    title: 'Add Your Photos',
    params: ['your shots from the day', 'a shared drive link is coming'],
    url: '#',
  },
}

// ── The four chapters ────────────────────────────────────────────────────────
export const CHAPTER_PAGES = {
  // “Us” renders through the bespoke UsStory component (the margin-notes scrapbook).
  // Per-scene fields: num (the faint watermark numeral), title, body[] (the paragraphs),
  // images[0] (the taped polaroid — one per scene; this page is deliberately media-light),
  // align, and the two optional ones below.
  //
  // ⚠️ 2026-09-13 — THE COPY IS THE COUPLE’S OWN, and it arrived without two things the
  // component still supports, so both are now optional and neither is rendered here:
  //   • `date` — the stitch line’s label. There are no dates in what they wrote, and this page
  //     will not invent one. The stitch still DRAWS (it is the rule that opens a scene); it just
  //     carries no words. Give a scene a `date` and the label comes back.
  //   • `notes[]` — the two-voice margin notes (voice 'c' = Covenant, 'u' = Uvie), and `caption`
  //     under the polaroid. Same reasoning: they are the couple’s voices, so the couple write
  //     them. The margin notes are the page’s best trick and it is worth asking for one per
  //     scene — two short lines, one each.
  //
  // ⚠️ 2026-09-02 — the page is WRITTEN, not set: every string here is rendered in the hand
  // (Over the Rainbow) and revealed WORD BY WORD off the scroll position. Consequences for
  // whoever edits the copy:
  //   • Every word costs scroll travel. The bodies below run 50–80 words against the ~30 the
  //     lorem had, which is roughly where a scene stops reading as a note and starts reading as
  //     a page — treat that as the ceiling, not the target.
  //   • `body` IS AN ARRAY. The writing runs continuously across the paragraphs, so splitting a
  //     block costs nothing in pacing; a '\n' inside one is a hard line break within a paragraph.
  //   • A paragraph may be { t, ask: true } — one size up, for the line a scene is built around.
  //     There is exactly one on the page (“Will you do life with me?”) and it should stay that way.
  //   • Lower case is the house style here. It used to be upper-case letter-spaced labels;
  //     neither survives a script hand, which has no capitals worth spacing out. (The couple’s
  //     own sentence case in the bodies is theirs and is kept verbatim.)
  us: {
    sections: [
      {
        num: 'I',
        // ⚠️ THE COUPLE’S OWN WORDS (2026-09-13), verbatim — the first real copy on this page,
        // replacing the lorem that stood in while the typography was reviewed. Two things about it
        // that are deliberate and must survive an edit: it opens in the THIRD person (“neither of
        // them knew”) and lands in the FIRST (“we think that’s a pretty good story”), and the
        // British spelling is theirs. “The Meeting” became “Boy Meets Girl” in the same pass.
        title: 'Boy Meets Girl',
        // `body` IS AN ARRAY OF PARAGRAPHS, and the writing runs continuously across all of them
        // — one pen, not one per block (see `paras()` in UsStory). A newline inside a string is a
        // hard line break WITHIN a paragraph, for lines that belong together and must not close up:
        // the two “Not …” questions below are one thought in two lines, not two paragraphs.
        body: [
          'Neither of them knew they were meeting someone who would eventually become their ' +
            'favourite person. There was no dramatic soundtrack or perfectly timed slow-motion ' +
            'moment, just two people crossing paths and, without really knowing it, starting ' +
            'something that would become quite special.',
          'Somewhere along the way, they went from “you and me” to us.',
          'And honestly, we think that’s a pretty good story.',
        ],
        images: [asset('/images/us/tower-bridge.jpg')],
        popups: [],
        align: 'left',
      },
      {
        num: 'II',
        title: 'The Question',
        body: [
          'Eventually, there was a question that needed answering.',
          'Not “What are we having for dinner?”\nNot “Did you take the last snack?”',
          'A slightly more important one:',
          // `ask` is the one emphasis this page has: the line the whole scene is built around,
          // written larger in the same hand. Use it once per page at most — a second one is just
          // a bigger font size.
          { t: '“Will you do life with me?”', ask: true },
          'There were probably a few nerves, a lot of excitement, and one answer that mattered most.',
          'Thankfully, it was yes.',
        ],
        // ⚠️ The couple’s own photograph of the proposal (2026-09-13, from `new frames/The
        // Question.JPG`), which replaced a reused shot of a brunch. 1638×2048 down to 900×1125 —
        // the polaroid draws at 4/5, so the source crops by nothing.
        images: [asset('/images/us/the-question.jpg')],
        popups: [],
        align: 'right',
      },
      {
        num: 'III',
        title: 'The Yes',
        body: [
          'And now, here we are.',
          'Still best friends, still figuring things out, still making each other laugh, and now ' +
            'officially signing up to do all of life together.',
          'There will be adventures, inside jokes, the occasional “what do you mean?”, lots of ' +
            'food, and hopefully a lifetime of choosing each other through it all.',
          'So, this is the beginning of our next chapter.',
          'We’re so happy you’re here to celebrate it with us. 🤍',
        ],
        images: [asset('/images/us/trad-portrait.jpg')],
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
  // ⚠️ THE DATE IS THE ONLY FACT ON THIS PAGE (user, 2026-09-06): "I don't want anyone
  // who hasn't RSVP'd to get any info on the wedding beyond the date." Removed with that
  // instruction: the October calendar grid, both venue maps, every time/venue/address/dress
  // line, and the hover that revealed them. The RSVP is the gate; this page is the invitation.
  // ⚠️ Do not re-add a `place`, a time or a programme here. Those belong behind the RSVP.
  // ⚠️ THE DATE IS THE ONLY FACT ON THIS PAGE (user, 2026-09-06): "I don't want anyone
  // who hasn't RSVP'd to get any info on the wedding beyond the date." No times, no venue,
  // no dress code, no map, and no hover that reveals any of them. The RSVP is the gate.
  // ⚠️ Do not re-add a `place`, a time or a programme here.
  'the-big-day': {
    sections: [
      {
        // The month, rendered as a ghost — every other date barely there, the one that
        // matters inked and ringed. A calendar is the fastest way to read "a Thursday, late
        // October"; making 30 of its 31 numerals recede is what stops it looking like a
        // widget. The grid is BUILT from `monthISO`, so it can never disagree with itself.
        kind: 'calendar',
        kicker: 'save the date',
        monthISO: '2026-10',
        mark: 29,
        note: 'everything else — where, when, what to wear — comes with your rsvp.',
      },
      {
        // ⚠️ THE ORIGINAL KNOT, restored verbatim from `b5a52348` ("two threads tie the knot
        // at noon"). It was briefly redrawn as a literal heart on 2026-09-06 and that was
        // wrong — the shape the two threads make as they cross and loop is the thing worth
        // keeping. Do not "tidy" these curves.
        kind: 'knot',
        before: 'two people,',
        after: 'one special day.',
      },
      {
        // ⚠️ The thread that leaves the knot below "one special day." does not stop at the
        // section boundary — it comes down the centre of this scene, parts around the
        // clock and closes under it into the line the numbers stand on. `lead` is drawn
        // INSIDE a break in that thread, so keep it short: BigDay measures the kicker and
        // opens a gap around it, and a two-line kicker makes a long hole in the line.
        kind: 'countdown',
        lead: 'until then',
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
        // ⚠️ `-xs` (240px), not `-sm` (560px): these are drawn in a ~96px box at 0.12 opacity
        // and were 5.8x oversized on every phone (AUDIT #138). From gen-image-variants.mjs.
        frames: [
          asset('/images/reel/car-selfie-xs.jpg'),
          asset('/images/reel/bw-beanie-xs.jpg'),
          asset('/images/reel/summer-fit-xs.jpg'),
          asset('/images/reel/dinner-date-xs.jpg'),
          asset('/images/reel/hanging-ledge-xs.jpg'),
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
        // ⚠️ CHRONOLOGICAL — the window reads as the day in order.
        // ⚠️ `traditional` was REMOVED here on 2026-09-07. The traditional marriage was taken
        // off the site sitewide on 2026-09-06 at the couple's request and this folder was the
        // last place it was still named; adding folders was the moment to finish that. One
        // line to put back if it was meant to stay.
        folders: [
          { name: 'pre-wedding shoot' },
          { name: 'white wedding' },
          { name: 'reception' },
          { name: 'after-party' },
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
        pivot: 'but if you insist…',
        popups: [],
      },
      {
        kind: 'gifts',
        // The section's own title, in the couple's hand — see `.wall-title` in WithLove.
        title: 'Gift Registry',
        // ⚠️ THE COUPLE'S REAL LIST (2026-09-11), by its REAL NAMES (2026-09-12). `name` is the word
        // that rides the wall, and it is now the product's own brand-and-model rather than a
        // description of it: a registry is a list of THINGS, and "oraimo TenderPot" is what a guest
        // will be looking at on the shop page. Kept to two or three short words all the same — a
        // name that wraps makes the annotation under it sprawl across both lines.
        // ⚠️ BRAND + PRODUCT, NOT BRAND + SKU. Where the thing has a real product name it is used
        // (TenderPot, EasyBistro, NanoCell, ADA); where the "name" is only a model code it reads as
        // a part number on a wall of display type — "HISENSE 390SH-FC" — so those say what the
        // thing IS and the code moves down into `product`, where someone checking a listing wants it.
        // ⚠️ `product` is the spec line, `price` the figure, `url` the product page. There is NO
        // per-item payment link and there is no longer a field for one: `cashUrl` was on all ten
        // items, was null on all ten, and rendered on every reveal as an offer with nothing behind
        // it. The couple's answer (2026-09-13) was that there are two accounts, not ten links — so
        // the reveal's "or send the cash instead" now walks the reader down to `SITE.gifts` in the
        // section below, and the same two accounts sit in every other chapter's footer.
        // ⚠️ PRICES ARE A SNAPSHOT, not a feed — the couple's own figures on 2026-09-11, and Nigerian
        // retail moves. They are deliberately prefixed "about".
        // ⚠️ Three `url`s are NOT the product page: see the notes on those items.
        // ⚠️ `x` (0–100) is legacy from the ink design and unused by the wall.
        items: [
          {
            name: 'oraimo TenderPot',
            product: 'pressure cooker · 6L · 1000W · 9 programs',
            price: 'about ₦116,900',
            url: 'https://ng.oraimo.com/product/oraimo-tenderpot-6l-1000w-fast-cooking-&-9-programs-electric-pressure-cooker',
            image: null, x: 18, claimed: false,
          },
          {
            name: 'oraimo KitchNova',
            product: 'pressure cooker · 6L · 1200W · 80kPa',
            // ⚠️ NOT the product page — oraimo NG has no indexed URL for this model, so this is
            // the pressure-cooker collection. Swap it the moment one exists.
            price: 'about ₦115,900',
            url: 'https://ng.oraimo.com/collections/pressure-cooker',
            image: null, x: 63, claimed: false,
          },
          {
            name: 'oraimo EasyBistro',
            product: '2-in-1 grill and sandwich breakfast station',
            price: 'about ₦102,900',
            url: 'https://ng.oraimo.com/product/oraimo-easybristo-2-in-1-grill-and-sandwich-maker-breakfast-station',
            image: null, x: 24, claimed: false,
          },
          {
            name: 'oraimo BakeAir Pro',
            product: 'air oven · 8-in-1 · 20L · 230°C',
            price: 'about ₦165,900',
            url: 'https://ng.oraimo.com/product/oraimo-bakeair-pro-versatile-20l-large-capacity-air-oven-oao-561a',
            image: null, x: 70, claimed: false,
          },
          {
            name: 'LG NanoCell',
            product: 'NANO80 4K smart television · 65" · Fouani',
            price: null,
            url: 'https://fouanistore.com/product/726',
            image: null, x: 40, claimed: false,
          },
          {
            name: 'Maxi Dehumidifier',
            product: '30L · model 30DEN7 · Fouani',
            // ⚠️ NO product page and NO price found on Fouani — the name renders without a link
            // rather than pointing at a guess.
            price: null,
            url: null,
            image: null, x: 55, claimed: false,
          },
          {
            name: 'Hisense Refrigerator',
            product: 'side-by-side · 541L · model 71WS-RC · Fouani',
            // ⚠️ NOT the product page — this model is not indexed; it is Fouani's Hisense listing.
            price: null,
            url: 'https://fouanistore.com/search?brand=Hisense',
            image: null, x: 12, claimed: false,
          },
          {
            name: 'Taeillo ADA',
            product: 'L-shaped corner sofa',
            price: 'about ₦369,998',
            url: 'https://taeillo.com/products/ada-l-shaped',
            image: null, x: 86, claimed: false,
          },
          {
            name: 'oraimo OminiMix',
            product: 'stand mixer · 1900W · 6 speeds · all-metal gears',
            price: null,
            url: 'https://ng.oraimo.com/product/oraimo-ominimix-6-speeds-durable-all-metal-gears-stand-mixer-obl-551a-graphitegrey',
            image: null, x: 30, claimed: false,
          },
          {
            name: 'Hisense Chest Freezer',
            product: '297L · model 390SH-FC · Fouani',
            price: null,
            url: 'https://fouanistore.com/product/200',
            image: null, x: 72, claimed: false,
          },
        ],
        // ⚠️ NO dock popup here (2026-09-11). With Love owns its own — see `cashPanel` below.
        popups: [],
      },
      // ⚠️ Not a section — the panel the `cashNote` dock card opens. It replaced a
      // bordered box that sat mid-page and read as out of character on a chapter
      // that is otherwise ink on paper.
      {
        // ⚠️ A REAL SECTION IN THE PAGE FLOW (2026-09-12), set the way the popup was set — ink on
        // paper, centred, no box. It used to be a fixed card that grew, and then a popup that opened
        // itself on scroll; both were an overlay arriving uninvited over the page. A section is the
        // honest version: you scroll into it and out of it like everything else on the chapter.
        // The little fixed card survives as a shortcut from anywhere on the page (it still opens the
        // popup on a tap) and stands down while its own section is on screen.
        kind: 'cashPanel',
        heading: 'even better —',
        // The one line the card shows while it is still a card.
        note: 'send cash instead',
        body: 'if you would rather send us cash, that is more than welcome.',
        // ⚠️ NO `cta` AND NO `url`. This section carried 'open the payment link' pointing at '#',
        // which the component drew as "the payment link is coming soon" — the page's one call to
        // action, permanently pending. It renders <GiftAccounts> instead: the couple's two real
        // accounts, out of site.config.js, which is also what the footers show.
        popups: [],
      },
      {
        kind: 'sign',
        closer: 'with love,',
        names: ['Covenant', 'Uvie'],
        tail: 'see you on october 29.',
        popups: [],
      },
    ],
  },
}
