import { defineNuxtConfig } from 'nuxt3'
import nodePolyfills from 'rollup-plugin-polyfill-node'

const production = process.env.NODE_ENV === 'production'

// https://v3.nuxtjs.org/docs/directory-structure/nuxt.config
export default defineNuxtConfig({
  meta: {
    link: [
      { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
      { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossOrigin: true },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Birthstone+Bounce&family=Inter:wght@400;500;600;700&display=swap'
      }
    ]
  },
  buildModules: ['@nuxtjs/tailwindcss'],
  build: {
    transpile: ['@headlessui/vue']
  },
  vite: {
    plugins: [
      // ↓ Needed for development mode
      !production && nodePolyfills({
        include: ['node_modules/**/*.js', new RegExp('node_modules/.vite/.*js')]
      })
    ],
    build: {
      rollupOptions: {
        plugins: [
          // ↓ Needed for build
          nodePolyfills()
        ]
      },
      // ↓ Needed for build if using WalletConnect and other providers
      commonjsOptions: {
        transformMixedEsModules: true
      }
    }

  }
})
