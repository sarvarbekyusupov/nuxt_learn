// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },

  modules: [
    "@pinia/nuxt",
    "@nuxt/devtools",
    "@nuxt/eslint",
    "@nuxt/ui",
    "@ant-design-vue/nuxt",
    "@nuxtjs/i18n",
  ],

  i18n: {
    langDir: "locales",
    locales: [
      { code: "en", name: "English", file: "en.json" },
      { code: "uz", name: "Uzbek", file: "uz.json" },
      { code: "ru", name: "Russian", file: "ru.json" },
    ],
    defaultLocale: "en",
    strategy: "prefix_except_default",
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      alwaysRedirect: true,
      fallbackLocale: 'en'
    }
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