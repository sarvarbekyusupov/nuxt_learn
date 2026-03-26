<script setup lang="ts">
const { locale, locales } = useI18n()
const switchLocalePath = useSwitchLocalePath()
</script>

<template>
  <div class="flex items-center p-1 bg-slate-100/80 border border-slate-200/60 rounded-full shadow-sm backdrop-blur-sm">
    <NuxtLink
      v-for="loc in locales"
      :key="typeof loc === 'string' ? loc : loc.code"
      :to="switchLocalePath(typeof loc === 'string' ? loc : loc.code)"
      class="relative px-3 py-1.5 text-[0.7rem] font-bold rounded-full transition-all duration-300 ease-out uppercase no-underline flex items-center justify-center min-w-[40px]"
      :class="[
        locale === (typeof loc === 'string' ? loc : loc.code)
          ? 'text-white bg-slate-900 shadow-md scale-100'
          : 'text-slate-500 hover:text-slate-800 hover:bg-slate-200/50 scale-95'
      ]"
    >
      {{ (typeof loc === 'string' ? loc : loc.code) }}
    </NuxtLink>
  </div>
</template>
