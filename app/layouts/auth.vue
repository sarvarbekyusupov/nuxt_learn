<script setup lang="ts">
const { t } = useI18n()
</script>

<template>
  <div class="min-h-screen w-full flex bg-white font-sans antialiased">
    <!-- Left Column: Branding/Visual (Hidden on smaller screens) -->
    <div class="hidden lg:flex lg:w-1/2 relative bg-slate-900 overflow-hidden items-center justify-center p-12">
      <!-- Decorative background elements -->
      <div class="absolute inset-0 bg-linear-to-br from-indigo-900 via-slate-900 to-blue-900 opacity-90" />
      <div class="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_left,var(--tw-gradient-stops))] from-blue-400/20 via-transparent to-transparent" />
      <div class="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(ellipse_at_bottom_right,var(--tw-gradient-stops))] from-indigo-400/20 via-transparent to-transparent" />
      
      <!-- Content -->
      <div class="relative z-10 text-white max-w-lg">
        <div class="flex items-center gap-3 mb-8">
          <div class="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-slate-900 shadow-xl">
            <svg viewBox="0 0 24 24" class="h-6 w-6 fill-current">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
            </svg>
          </div>
          <span class="text-2xl font-black tracking-tight">{{ t('auth.brand') || 'DanAds' }}</span>
        </div>
        
        <h2 class="text-4xl lg:text-5xl font-bold tracking-tight mb-6 leading-tight">
          {{ t('auth.tagline') || 'Elevate your workflow with premium tools.' }}
        </h2>
        
        <p class="text-lg text-slate-300 font-medium">
          Secure, scalable, and designed for modern teams. Log in to access your dashboard.
        </p>
      </div>
    </div>

    <!-- Right Column: Form Area -->
    <div class="w-full lg:w-1/2 flex flex-col relative bg-slate-50 lg:bg-white">
      <!-- Language Switcher -->
      <div class="absolute top-6 right-6 lg:top-8 lg:right-8 z-20">
        <CommonLanguageSwitcher />
      </div>

      <!-- Scrollable Form Container -->
      <div class="flex-1 flex flex-col justify-center items-center p-6 sm:p-12 lg:p-16 xl:p-24 overflow-y-auto">
        <div class="w-full max-w-md mx-auto bg-white p-8 sm:p-10 rounded-3xl shadow-sm border border-slate-100 lg:border-none lg:shadow-none lg:p-0">
          <!-- Mobile Logo -->
          <div class="flex lg:hidden items-center justify-center gap-3 mb-8">
            <div class="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-900 text-white shadow-md">
              <svg viewBox="0 0 24 24" class="h-5 w-5 fill-current">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
              </svg>
            </div>
            <span class="text-xl font-bold tracking-tight text-slate-900">{{ t('auth.brand') || 'DanAds' }}</span>
          </div>

          <!-- Dynamic Form Content -->
          <slot />
        </div>
      </div>
    </div>
  </div>
</template>
