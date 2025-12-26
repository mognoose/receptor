// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  css: ['@picocss/pico'],
  runtimeConfig: {
    imagekitPrivateKey: process.env.IMAGEKIT_PRIVATE_KEY,
    invitationKey: process.env.INVITATION_KEY,
    public: {
      imagekitPublicKey: process.env.IMAGEKIT_PUBLIC_KEY,
      imagekitUrlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
      firebase: {
        apiKey: process.env.FIREBASE_API_KEY,
        authDomain: process.env.FIREBASE_AUTH_DOMAIN,
        projectId: process.env.FIREBASE_PROJECT_ID,
        storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
        messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
        appId: process.env.FIREBASE_APP_ID,
        measurementId: process.env.FIREBASE_MEASUREMENT_ID,
      }
    }
  }
})
