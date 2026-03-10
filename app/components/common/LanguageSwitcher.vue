<script setup lang="ts">
type Locale = 'en' | 'uz' | 'ru'
const { locale, locales, setLocale } = useI18n()

const switchLocale = (newLocale: string) => {
  setLocale(newLocale as Locale)
}
</script>

<template>
  <div class="flex items-center p-1 bg-white/60 backdrop-blur-md border border-slate-200/50 rounded-full shadow-sm">
    <button
      v-for="loc in locales"
      :key="typeof loc === 'string' ? loc : loc.code"
      class="relative px-3 py-1.5 text-xs font-semibold rounded-full transition-all duration-200 ease-out uppercase"
      :class="[
        locale === (typeof loc === 'string' ? loc : loc.code)
          ? 'text-slate-900 bg-white shadow-[0_2px_8px_rgba(0,0,0,0.08)] scale-100'
          : 'text-slate-500 hover:text-slate-700 hover:bg-slate-50/50 scale-95'
      ]"
      @click="switchLocale(typeof loc === 'string' ? loc : loc.code)"
    >
      {{ (typeof loc === 'string' ? loc : loc.code) }}
    </button>
  </div>
</template>
