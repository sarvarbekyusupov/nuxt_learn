<script setup lang="ts">
import { ROUTES } from '#constants/routes'

const { t } = useI18n()
const localePath = useLocalePath()

const navigation = [
  { name: 'common.welcome', href: ROUTES.HOME },
  // Add more links as your app grows
]
</script>

<template>
  <div class="min-h-screen bg-slate-50 font-sans antialiased">
    <!-- Navigation Header -->
    <header class="sticky top-0 z-40 w-full border-b border-slate-200/60 bg-white/80 backdrop-blur-md">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex h-16 items-center justify-between gap-4">
          <!-- Logo & Brand -->
          <div class="flex items-center gap-8">
            <NuxtLink :to="localePath(ROUTES.HOME)" class="flex items-center gap-2.5 no-underline group">
              <div class="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-900 text-white shadow-lg shadow-slate-900/10 group-hover:scale-105 transition-transform">
                <svg viewBox="0 0 24 24" class="h-5 w-5 fill-current">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                </svg>
              </div>
              <span class="text-lg font-bold tracking-tight text-slate-900">NuxtApp</span>
            </NuxtLink>

            <!-- Desktop Nav -->
            <nav class="hidden md:flex items-center gap-1">
              <NuxtLink
                v-for="item in navigation"
                :key="item.name"
                :to="localePath(item.href)"
                class="px-4 py-2 text-[0.925rem] font-medium text-slate-600 rounded-lg hover:text-slate-900 hover:bg-slate-100/80 transition-all"
                active-class="text-slate-900 bg-slate-100"
              >
                {{ t(item.name) }}
              </NuxtLink>
            </nav>
          </div>

          <!-- Actions -->
          <div class="flex items-center gap-3">
            <div class="mr-2">
              <LanguageSwitcher />
            </div>
            
            <div class="hidden sm:flex items-center gap-2">
              <NuxtLink :to="localePath(ROUTES.LOGIN)" class="px-4 py-2 text-[0.9rem] font-semibold text-slate-700 hover:text-slate-900 transition-colors">
                {{ t('auth.signIn') }}
              </NuxtLink>
              <NuxtLink :to="localePath(ROUTES.REGISTER)" class="px-5 py-2 text-[0.9rem] font-semibold bg-slate-900 text-white rounded-xl shadow-md shadow-slate-900/10 hover:bg-slate-800 transition-all active:scale-[0.98]">
                {{ t('auth.signUp') }}
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div class="max-w-4xl mx-auto">
        <slot />
      </div>
    </main>

    <!-- Footer -->
    <footer class="border-t border-slate-200 bg-white py-12">
      <div class="container mx-auto px-4 text-center">
        <p class="text-slate-500 text-sm font-medium">
          &copy; {{ new Date().getFullYear() }} NuxtApp. {{ t('common.allRightsReserved') || 'All rights reserved.' }}
        </p>
      </div>
    </footer>
  </div>
</template>
