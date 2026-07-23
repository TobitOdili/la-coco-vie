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
      title: SITE.titles.home,
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1, viewport-fit=cover' }
      ],
      link: [
        { rel: 'icon', href: `${baseURL}images/favicon.ico` },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        { rel: 'stylesheet', href: googleFontsHref() }
      ]
    }
  },
})
