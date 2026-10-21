import { fileURLToPath } from 'node:url'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: false }, // reload trigger 2

  experimental: {
    appManifest: false
  },

  alias: {
    '#app-manifest': fileURLToPath(new URL('./stubs/app-manifest.mjs', import.meta.url))
  },

  vite: {
    resolve: {
      alias: {
        '#app-manifest': fileURLToPath(new URL('./stubs/app-manifest.mjs', import.meta.url))
      }
    },
    plugins: [
      {
        name: 'vite-plugin-fix-app-manifest',
        resolveId(id: string) {
          if (id === '#app-manifest') {
            return '\0#app-manifest'
          }
        },
        load(id: string) {
          if (id === '\0#app-manifest') {
            return 'export default {}'
          }
        }
      }
    ]
  },

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
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=JetBrains+Mono:wght@400;500;600&display=swap' }
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
  },

  runtimeConfig: {
    public: {
      apiBaseUrl: process.env.NUXT_PUBLIC_API_BASE_URL || 'https://beruang-api.fly.dev/api'
    }
  }
})
