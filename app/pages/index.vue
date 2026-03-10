<script setup lang="ts">
import { ROUTES } from '#constants/routes'

definePageMeta({
  layout: 'default',
})

const { t } = useI18n()
const localePath = useLocalePath()
</script>

<template>
  <div class="text-center">
    <div class="inline-flex h-16 w-16 items-center justify-center rounded-3xl bg-slate-100 text-slate-900 mb-8 animate-bounce">
      <svg class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    </div>
    
    <h1 class="text-4xl md:text-5xl font-black text-slate-900 tracking-tight mb-6 lg:leading-[1.15]">
      {{ t('common.welcome') }}
    </h1>
    
    <p class="text-lg md:text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto mb-12 font-medium">
      {{ t('common.welcomeSubtitle') }}
    </p>

    <div class="flex flex-col sm:flex-row items-center justify-center gap-4">
      <NuxtLink 
        :to="localePath(ROUTES.REGISTER)" 
        class="w-full sm:w-auto px-8 py-4 bg-slate-900 text-white rounded-2xl text-[1.05rem] font-bold shadow-xl shadow-slate-900/10 hover:bg-slate-800 hover:scale-[1.02] active:scale-[0.98] transition-all"
      >
        {{ t('auth.actions.createAccount') || 'Get Started' }}
      </NuxtLink>
      
      <NuxtLink 
        :to="localePath(ROUTES.LOGIN)" 
        class="w-full sm:w-auto px-8 py-4 bg-white text-slate-700 border border-slate-200 rounded-2xl text-[1.05rem] font-bold hover:bg-slate-50 hover:border-slate-300 transition-all"
      >
        {{ t('auth.signIn') }}
      </NuxtLink>
    </div>

    <!-- Feature Section -->
    <div class="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8">
      <div v-for="i in 3" :key="i" class="p-8 bg-white border border-slate-200/60 rounded-3xl shadow-sm text-left">
        <div class="h-10 w-10 bg-slate-100 rounded-xl mb-6" />
        <h3 class="text-lg font-bold text-slate-900 mb-2">Modern Nuxt 4</h3>
        <p class="text-slate-500 text-sm leading-relaxed">Built with the latest standards and best practices for performance and scalability.</p>
      </div>
    </div>
  </div>
</template>
