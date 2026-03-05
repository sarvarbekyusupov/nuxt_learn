<script setup lang="ts">
import { type SupportedLocale, LOCALE_NAMES } from '@/utils/i18n'

const { locale, locales, setLocale } = useI18n()

const switchLocale = (newLocale: string) => {
  setLocale(newLocale as SupportedLocale)
}
</script>

<template>
  <div class="language-switcher">
    <button
      v-for="loc in locales"
      :key="typeof loc === 'string' ? loc : loc.code"
      :class="['locale-btn', { active: locale === (typeof loc === 'string' ? loc : loc.code) }]"
      @click="switchLocale(typeof loc === 'string' ? loc : loc.code)"
    >
      {{ LOCALE_NAMES[(typeof loc === 'string' ? loc : loc.code) as SupportedLocale] || (typeof loc === 'string' ? loc : loc.name) }}
    </button>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600&display=swap');

.language-switcher {
  display: flex;
  gap: 0.5rem;
  align-items: center;
  font-family: 'DM Sans', sans-serif;
}

.locale-btn {
  padding: 0.375rem 0.75rem;
  font-size: 0.875rem;
  font-weight: 500;
  font-family: inherit;
  border: 1px solid #e5e7eb;
  background: #fff;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.15s;
  color: #666;
}

.locale-btn:hover {
  background: #f9f9f9;
  border-color: #d1d5db;
  color: #111;
}

.locale-btn.active {
  background: #111;
  border-color: #111;
  color: #fff;
}
</style>