import { resolve } from 'pathe';

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  routeRules: {
    '/auth/**': {},
    // default rule
    '/**': { ssr: false },
  },
  imports: {
    dirs: ['composables/**', 'shared/stores/**'],
  },
  vite: {
    define: {
      'process.env.DEBUG': false,
    },
  },
  build: {
    transpile: ['vuetify'],
  },
  css: [
    'vuetify/lib/styles/main.sass',
    '@mdi/font/css/materialdesignicons.min.css',
    '@/assets/styles/global.scss',
  ],
  runtimeConfig: {
    public: {
      baseURL: process.env.BASE_URL || 'http://localhost:8000/api/v1',
      wsURL: process.env.WS_URL || 'ws://localhost:8000/ws',
    },
  },
  modules: ['@pinia/nuxt', '@vueuse/nuxt', 'nuxt-lodash'],
  pinia: {
    autoImports: ['defineStore'],
  },
});
