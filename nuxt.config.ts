import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: false },
  css: ['~/assets/css/main.css'],
  ssr: false,
  vite: {
    plugins: [tailwindcss()],
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
    head: {
      title: 'Chapter — Milla Nova',
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' }
      ],
      link: [
        { rel: 'icon', href: '/images/favicon.ico' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Italiana&family=Monoton&family=Over+the+Rainbow&display=swap' }
      ]
    }
  },
})
