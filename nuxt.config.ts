// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false, // Disable server-side rendering for Electron compatibility
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  css: ['@picocss/pico'],
})
