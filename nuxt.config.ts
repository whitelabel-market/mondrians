import {defineNuxtConfig} from 'nuxt3'

// https://v3.nuxtjs.org/docs/directory-structure/nuxt.config
export default defineNuxtConfig({
    meta: {
        link: [
            {rel: 'preconnect', href: 'https://fonts.googleapis.com'},
            {rel: 'preconnect', href: 'https://fonts.gstatic.com', crossOrigin: true},
            {
                rel: 'stylesheet',
                href: 'https://fonts.googleapis.com/css2?family=Birthstone+Bounce&family=Inter:wght@400;500;600;700&display=swap'
            }
        ]
    },
    buildModules: ['@nuxtjs/tailwindcss'],
})
