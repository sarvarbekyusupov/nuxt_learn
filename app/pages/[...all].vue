<script setup lang="ts">
import { ROUTES } from '#constants/routes'

definePageMeta({
  layout: false,
})

const { t } = useI18n()
const localePath = useLocalePath()
</script>

<template>
  <div class="page">
    <div class="language-pos">
      <LanguageSwitcher />
    </div>
    <div class="card">
      <span class="eyebrow">404</span>
      <h1 class="title">{{ t('common.error404.title') }}</h1>
      <p class="desc">{{ t('common.error404.subtitle') }}</p>
      <div class="actions">
        <router-link :to="localePath(ROUTES.HOME)" class="btn-primary">{{ t('common.error404.backHome') }}</router-link>
        <router-link :to="localePath(ROUTES.LOGIN)" class="btn-ghost">{{ t('common.error404.login') }}</router-link>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600&display=swap');

.page {
  min-height: 100vh;
  background: #f5f5f5;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'DM Sans', sans-serif;
  padding: 1.5rem;
  position: relative;
}

.language-pos {
  position: absolute;
  top: 1.5rem;
  right: 1.5rem;
}

.card {
  background: #fff;
  border-radius: 14px;
  padding: 2.25rem 2rem;
  width: 100%;
  max-width: 380px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.06), 0 4px 16px rgba(0,0,0,0.05);
  animation: up 0.4s ease both;
}

.eyebrow {
  display: inline-block;
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: #9ca3af;
  margin-bottom: 1rem;
}

.title {
  font-size: 1.5rem;
  font-weight: 600;
  color: #111;
  letter-spacing: -0.02em;
  margin: 0 0 0.5rem;
}

.desc {
  font-size: 0.875rem;
  color: #999;
  line-height: 1.6;
  margin: 0 0 2rem;
}

.actions {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.btn-primary,
.btn-ghost {
  display: block;
  text-align: center;
  text-decoration: none;
  padding: 0.65rem;
  border-radius: 8px;
  font-size: 0.9rem;
  font-weight: 500;
  transition: background 0.15s, border-color 0.15s;
}

.btn-primary {
  background: #111;
  color: #fff;
}
.btn-primary:hover { background: #333; }

.btn-ghost {
  background: #fff;
  color: #333;
  border: 1px solid #e5e7eb;
}
.btn-ghost:hover { background: #f9f9f9; border-color: #d1d5db; }

@keyframes up {
  from { opacity: 0; transform: translateY(12px); }
  to   { opacity: 1; transform: translateY(0); }
}
</style>
