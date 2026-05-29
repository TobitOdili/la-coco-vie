import tailwindcss from '@tailwindcss/vite'
import { SITE, googleFontsHref } from './site.config'

export default defineNuxtConfig({
  devServer: {
    host: '0.0.0.0',
    allowedHosts: ['all'],
  },
  compatibilityDate: '2024-04-03',
  devtools: { enabled: false },
  css: ['~/assets/css/main.css'],
  ssr: false,
  vite: {
    plugins: [tailwindcss()],
    server: {
      allowedHosts: 'all',
    },
    optimizeDeps: {
      include: ['three', 'gsap', 'howler', 'lenis', 'virtualscroll'],
    },
    build: {
      rollupOptions: {
        external: [],
      },
    },
  },
  app: {
    baseURL: process.env.NUXT_APP_BASE_URL || '/',
    head: {
      title: SITE.titles.home,
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1, viewport-fit=cover' }
      ],
      link: [
        { rel: 'icon', href: '/images/favicon.ico' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        { rel: 'stylesheet', href: googleFontsHref() }
      ]
    }
  },
})
