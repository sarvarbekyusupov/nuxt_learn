import { fileURLToPath } from 'url'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },

  css: ["@/assets/css/main.css"],

  alias: {
    "#constants": fileURLToPath(new URL("./app/utils/constants", import.meta.url)),
    "#validation": fileURLToPath(new URL("./app/utils/validation", import.meta.url)),
    "#types": fileURLToPath(new URL("./app/types", import.meta.url)),
  },

  runtimeConfig: {
    apiSecret: "", // Can be overridden by NUXT_API_SECRET
    public: {
      externalApiUrl: "", // Can be overridden by NUXT_PUBLIC_EXTERNAL_API_URL
      cognito: {
        authority: "https://cognito-idp.eu-north-1.amazonaws.com/eu-north-1_V8ZgFNwsi",
        region: "eu-north-1",
        userPoolId: "eu-north-1_V8ZgFNwsi",
        clientId: "223odc5gh18q8s0kflnt5emju5",
        redirectUri: "https://d84l1y8p4kdic.cloudfront.net",
        domain: "https://eu-north-1v8zgfnwsi.auth.eu-north-1.amazoncognito.com",
        logoutUri: "https://d84l1y8p4kdic.cloudfront.net",
      },
    },
  },

  modules: [
    "@pinia/nuxt",
    "@nuxt/devtools",
    "@nuxt/eslint",
    "@nuxt/ui",
    "@ant-design-vue/nuxt",
    "@nuxtjs/i18n",
  ],

  i18n: {
    langDir: "../i18n/locales",
    locales: [
      { code: "en", name: "English", file: "en.json" },
      { code: "uz", name: "Uzbek", file: "uz.json" },
      { code: "ru", name: "Russian", file: "ru.json" },
    ],
    defaultLocale: "en",
    strategy: "prefix_except_default",
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: "i18n_redirected",
      alwaysRedirect: true,
      fallbackLocale: "en",
    },
  },

  imports: {
    presets: [
      {
        from: "vee-validate",
        imports: ["useForm", "useField", "defineField"],
      },
    ],
  },

  vite: {
    define: {
      "window.global": {},
    },
  },
});
