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
});
