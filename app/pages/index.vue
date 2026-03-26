<script setup lang="ts">
import { ROUTES } from '#constants/routes'

definePageMeta({
  layout: 'default',
})

const { t } = useI18n()
</script>

<template>
  <div class="text-center py-12">
    <div class="inline-flex h-16 w-16 items-center justify-center rounded-3xl bg-slate-100 text-slate-900 mb-8 animate-bounce">
      <svg class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    </div>

    <h1 class="text-4xl md:text-6xl font-black text-slate-900 tracking-tight mb-6 lg:leading-[1.15]">
      {{ t('common.welcome') }}
    </h1>

    <p class="text-lg md:text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto mb-12 font-medium">
      {{ t('common.welcomeSubtitle') }}
    </p>

    <div class="flex flex-col sm:flex-row items-center justify-center gap-4">
      <NuxtLinkLocale 
        :to="ROUTES.PRODUCTS" 
        class="w-full sm:w-auto px-8 py-4 bg-slate-900 text-white rounded-2xl text-[1.05rem] font-bold shadow-xl shadow-slate-900/10 hover:bg-slate-800 hover:scale-[1.02] active:scale-[0.98] transition-all"
      >
        {{ t('products.browse') }}
      </NuxtLinkLocale>
    </div>
  </div>
</template>

