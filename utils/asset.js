// ─────────────────────────────────────────────────────────────────────────────
// PUBLIC-ASSET URLS — the single base-path-aware helper.
//
// ⚠️ NEVER use `import.meta.env.BASE_URL` for this. Nuxt hardcodes Vite's client
// `base` to './' for PRODUCTION builds (its own assets are resolved through the
// build manifest instead), so BASE_URL is './' no matter what `app.baseURL` is —
// `NUXT_APP_BASE_URL=/la-coco-vie/` does not change it. That made every public
// asset URL relative (`./images/cu-p1.png`), which:
//   • happened to work on Vercel — served at the root, and `/with-love` has no
//     trailing slash, so `./images/…` resolved to `/images/…`; and
//   • 404'd on GitHub Pages, which serves prerendered routes WITH a trailing
//     slash, so it resolved one level too deep:
//     `/la-coco-vie/with-love/images/cu-p1.png`.
// Every image on every inner page was broken there (found 2026-08-10).
//
// `__APP_BASE__` is replaced at build time by `vite.define` in nuxt.config.ts
// with the same `app.baseURL` the deploy is configured with. The `typeof` guard
// keeps this file safe if it is ever evaluated without that define.
// ─────────────────────────────────────────────────────────────────────────────

const RAW = typeof __APP_BASE__ !== 'undefined' ? __APP_BASE__ : '/'

/** The app's base path, with any trailing slash removed ('' at the root). */
export const BASE = RAW.replace(/\/$/, '')

/** Absolute URL for a file in `public/`. Pass a root-relative path: asset('/images/x.png'). */
export const asset = (path) => `${BASE}${path}`
