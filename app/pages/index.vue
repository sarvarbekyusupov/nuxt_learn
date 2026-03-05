<script setup lang="ts">
import { ROUTES } from '@/utils/routes'

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
      <h1 class="title">{{ t('common.welcome') }}</h1>
      <p class="subtitle">{{ t('common.welcomeSubtitle') }}</p>

      <div class="actions">
        <router-link :to="localePath(ROUTES.LOGIN)" class="btn-primary">{{ t('auth.signIn') }}</router-link>
        <router-link :to="localePath(ROUTES.REGISTER)" class="btn-ghost">{{ t('auth.signUp') }}</router-link>
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

.title {
  font-size: 1.5rem;
  font-weight: 600;
  color: #111;
  letter-spacing: -0.02em;
  margin-bottom: 0.5rem;
}

.subtitle {
  font-size: 0.875rem;
  color: #999;
  margin-bottom: 2rem;
  line-height: 1.5;
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