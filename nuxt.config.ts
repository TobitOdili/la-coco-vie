import tailwindcss from '@tailwindcss/vite'
import { SITE, googleFontsHref } from './site.config'

// Base path for the deploy target. GitHub Pages serves under /la-coco-vie/
// (set via NUXT_APP_BASE_URL in the deploy workflow); Vercel serves at root.
// Head <link> hrefs are NOT auto-prefixed by Nuxt, so we prefix them by hand.
const baseURL = process.env.NUXT_APP_BASE_URL || '/'

export default defineNuxtConfig({
  devServer: {
    host: '0.0.0.0',
    allowedHosts: ['all'],
  },
  compatibilityDate: '2024-04-03',
  devtools: { enabled: false },
  css: ['~/assets/css/main.css'],
  ssr: false,
  // Emit a static shell for each chapter route so deep links resolve on static hosts
  // (GitHub Pages has no SPA rewrite). Vercel doesn't need this but it's harmless.
  // NOTE: keep this list in sync with the `slug`s in CHAPTERS (composables/
  // useChapterScene.js). Hardcoded here to avoid importing the Three.js-heavy scene
  // module into the build config.
  nitro: {
    prerender: {
      routes: ['/', '/us', '/the-big-day', '/in-frames', '/with-love'],
    },
  },
  vite: {
    plugins: [tailwindcss()],
    // The app's base path, baked in at build time for utils/asset.js. Nuxt sets
    // Vite's client `base` to './' in production, so `import.meta.env.BASE_URL`
    // CANNOT be used to build public-asset URLs — see utils/asset.js.
    define: {
      __APP_BASE__: JSON.stringify(baseURL),
    },
    server: {
      allowedHosts: 'all',
    },
    optimizeDeps: {
      include: ['three', 'gsap', 'howler', 'lenis'],
    },
  },
  app: {
    baseURL,
    head: {
      // ⚠️ `lang` IS THE ONE HEAD FIELD THAT HAS TO BE HERE. Everything else per-route is
      // injected into the prerendered shells by scripts/gen-head.mjs (see AUDIT #99) — but
      // htmlAttrs are rendered into every shell by Nuxt itself, so this is the cheapest
      // place for it, and a page with no `lang` is read out in the reader's default voice.
      htmlAttrs: { lang: 'en' },
      title: SITE.titles.home,
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1, viewport-fit=cover' },
        // A floor, so no route is ever description-less even if gen-head.mjs is skipped.
        // The per-route text that actually ships is SITE.share — see that, and gen-head.
        { name: 'description', content: SITE.share.home.desc },
        { name: 'theme-color', content: '#f7f6f4' },
      ],
      link: [
        { rel: 'icon', type: 'image/png', href: `${baseURL}images/cu-favicon.png` },
        { rel: 'apple-touch-icon', href: `${baseURL}images/cu-favicon.png` },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        { rel: 'stylesheet', href: googleFontsHref() }
      ]
    }
  },
})
