// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: false },

  modules: [
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt',
    '@vueuse/nuxt'
  ],

  css: [
    '~/assets/css/main.css'
  ],

  build: {
    transpile: ['@hugeicons/vue', '@hugeicons/core-free-icons']
  },

  app: {
    head: {
      title: 'Beruang - Naik Kelas & Siap Didanai',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { 
          name: 'description', 
          content: 'Platform pengembangan bisnis & pendanaan terverifikasi untuk UMKM Indonesia bersama konsultan bisnis profesional dan investor.' 
        },
        { name: 'theme-color', content: '#1f52eb' }
      ],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/logo.svg' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&family=JetBrains+Mono:wght@400;500;600&display=swap' }
      ]
    }
  },

  // Hybrid rendering: SSR for public marketing pages, SPA/CSR for authenticated app dashboards
  routeRules: {
    '/dashboard/**': { ssr: false },
    '/konsultan/**': { ssr: false },
    '/investor/**': { ssr: false },
    '/admin/**': { ssr: false },
    '/onboarding/**': { ssr: false },
    '/dev/**': { ssr: false }
  },

  tailwindcss: {
    cssPath: '~/assets/css/main.css',
    configPath: 'tailwind.config.ts',
    exposeConfig: false,
    viewer: false
  }
})
