// ─────────────────────────────────────────────────────────────────────────────
// Head injector for the prerendered shells.  Runs on EVERY build:
//   "build": "nuxt build && node scripts/gen-head.mjs"
//
// ⚠️ WHY THIS EXISTS AND WHY IT IS NOT `useHead`. The site is `ssr: false`, so Nuxt
// prerenders one SPA shell per route and the head in it comes from `app.head` in
// nuxt.config — one title for five URLs. `useHead` in a page runs client-side, which a
// crawler or an unfurler never reaches: WhatsApp reads the HTML it is served and stops.
// Until 2026-09-20 every chapter link previewed as the homepage, with no description and
// no image (AUDIT #99). This rewrites the shells after the build, from `SITE.share`.
//
// ⚠️ PURE NODE, NO BROWSER, NO NETWORK — it runs on Vercel's builder. The og:image files
// it points at are generated separately by `scripts/gen-og.mjs` (which does need Chrome)
// and committed; this script only checks that they exist and says so if they do not.
//
// Also writes: sitemap.xml (from the same route list) and checks robots.txt is in place.
// ─────────────────────────────────────────────────────────────────────────────
import { readFileSync, writeFileSync, existsSync, statSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'
import { SITE } from '../site.config.js'

const HERE = dirname(fileURLToPath(import.meta.url))
const REPO = resolve(HERE, '..')
// ⚠️ THE BUILD OUTPUT IS NOT ALWAYS `.output/public` — THE PRESET DECIDES. The static and
// node presets write `.output/public`, which is what a local `npm run build` produces; Vercel's
// preset writes `.vercel/output/static`, and that is the one that runs in CI. This script
// hardcoded the first and so exited 1 on EVERY Vercel deploy (2026-09-21), failing a build that
// passed locally and on the two static hosts. Probe both and take the one built most recently,
// so a stale `.vercel/output` from an old `vercel build` can never shadow a fresh `nuxt build`.
const CANDIDATES = [
  process.env.GEN_HEAD_OUT,
  process.env.NITRO_OUTPUT_DIR && `${process.env.NITRO_OUTPUT_DIR}/public`,
  `${REPO}/.output/public`,
  `${REPO}/.vercel/output/static`,
].filter(Boolean)
const OUT = CANDIDATES
  .filter((d) => existsSync(`${d}/index.html`))
  .sort((a, b) => statSync(`${b}/index.html`).mtimeMs - statSync(`${a}/index.html`).mtimeMs)[0]
const SITE_URL = (process.env.SITE_URL || SITE.url).replace(/\/$/, '')

// slug → the file that serves it. '' is the homepage.
const ROUTES = [['', 'home'], ['us', 'us'], ['the-big-day', 'the-big-day'], ['in-frames', 'in-frames'], ['with-love', 'with-love']]

const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

if (!OUT) {
  console.error('gen-head: no prerendered build found — looked in:')
  for (const d of CANDIDATES) console.error(`  ${d}`)
  console.error('Run `nuxt build` first, or point GEN_HEAD_OUT at the output directory.')
  process.exit(1)
}
console.log(`gen-head: writing into ${OUT.replace(REPO + '/', '')}`)

let missingOg = 0
for (const [slug, key] of ROUTES) {
  const file = `${OUT}/${slug ? slug + '/' : ''}index.html`
  if (!existsSync(file)) { console.warn(`gen-head: ${file} missing — skipped`); continue }
  const share = SITE.share[key]
  const url = `${SITE_URL}/${slug ? slug + '/' : ''}`
  const ogFile = `og/${key}.jpg`
  if (!existsSync(`${OUT}/${ogFile}`)) missingOg++
  const ogUrl = `${SITE_URL}/${ogFile}`

  let html = readFileSync(file, 'utf8')

  // ⚠️ REPLACE, NEVER APPEND. Two <title> elements is undefined behaviour and some unfurlers
  // take the first — which would be the one this is trying to fix. The same is true of
  // `description` and `theme-color`, which nuxt.config sets as a floor for the running app:
  // leaving those in place shipped the HOMEPAGE description on all five routes, under the
  // right one, where a crawler reading the first match would never see the difference.
  html = html.replace(/<title>[\s\S]*?<\/title>/, `<title>${esc(share.title)}</title>`)
  html = html.replace(/<meta name="description"[^>]*>\n?/g, '')
  html = html.replace(/<meta name="theme-color"[^>]*>\n?/g, '')

  const tags = [
    `<meta name="description" content="${esc(share.desc)}">`,
    `<link rel="canonical" href="${url}">`,
    `<meta property="og:type" content="website">`,
    `<meta property="og:site_name" content="${esc(SITE.brand)}">`,
    `<meta property="og:title" content="${esc(share.title)}">`,
    `<meta property="og:description" content="${esc(share.desc)}">`,
    `<meta property="og:url" content="${url}">`,
    `<meta property="og:image" content="${ogUrl}">`,
    `<meta property="og:image:width" content="1200">`,
    `<meta property="og:image:height" content="630">`,
    `<meta property="og:image:alt" content="${esc(share.title)}">`,
    `<meta property="og:locale" content="en_NG">`,
    `<meta name="twitter:card" content="summary_large_image">`,
    `<meta name="twitter:title" content="${esc(share.title)}">`,
    `<meta name="twitter:description" content="${esc(share.desc)}">`,
    `<meta name="twitter:image" content="${ogUrl}">`,
    `<meta name="theme-color" content="#f7f6f4">`,
  ].join('\n')

  // Idempotent: strip a previous run's block before inserting.
  html = html.replace(/<!--head:start-->[\s\S]*?<!--head:end-->\n?/, '')
  html = html.replace('</head>', `<!--head:start-->\n${tags}\n<!--head:end-->\n</head>`)

  writeFileSync(file, html)
  console.log(`gen-head: /${slug}  ${share.title}`)
}

// ── sitemap ──────────────────────────────────────────────────────────────────
// Static five-line sitemap; `lastmod` is the build date, which is true of a site whose
// content is baked into the bundle.
const today = new Date().toISOString().slice(0, 10)
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${ROUTES.map(([slug]) => `  <url><loc>${SITE_URL}/${slug ? slug + '/' : ''}</loc><lastmod>${today}</lastmod></url>`).join('\n')}
</urlset>
`
writeFileSync(`${OUT}/sitemap.xml`, sitemap)
console.log('gen-head: sitemap.xml')

if (!existsSync(`${OUT}/robots.txt`)) console.warn('gen-head: ⚠️ robots.txt missing from public/')
if (missingOg) console.warn(`gen-head: ⚠️ ${missingOg} og image(s) missing — run \`node scripts/gen-og.mjs\``)
