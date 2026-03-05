<script setup lang="ts">
import { useForm, Field } from 'vee-validate'
import { createLoginSchema } from '@/utils/auth/validation'
import { message } from 'ant-design-vue'
import { ROUTES } from '@/utils/routes'
import { AUTH_API_CONFIG } from '@/utils/auth/constants'

definePageMeta({
  layout: false,
})

const { t } = useI18n()
const localePath = useLocalePath()

const { handleSubmit, isSubmitting } = useForm({ validationSchema: createLoginSchema(t) })

const rememberMe = ref(false)

const onSubmit = handleSubmit(async (_values) => {
  try {
    await new Promise(resolve => setTimeout(resolve, AUTH_API_CONFIG.MOCK_DELAY_MS))
    message.success(t('auth.messages.loginSuccess'))
  } catch {
    message.error(t('auth.messages.error'))
  }
})

async function handleGoogleLogin() {
  message.info(t('auth.messages.googleLogin'))
}
</script>

<template>
  <div class="page">
    <div class="card">
      <h1 class="title">{{ t('auth.signIn') }}</h1>

      <form @submit="onSubmit">
        <!-- Email Field -->
        <div class="form-group">
          <label class="label">{{ t('auth.fields.email') }}</label>
          <Field v-slot="{ field, errorMessage }" name="email">
            <a-input v-bind="field" :placeholder="t('auth.fields.emailPlaceholder')" size="large" />
            <div v-if="errorMessage" class="error-text">{{ errorMessage }}</div>
          </Field>
        </div>

        <!-- Password Field -->
        <div class="form-group">
          <div class="pass-label">
            <label class="label">{{ t('auth.fields.password') }}</label>
            <NuxtLink :to="localePath(ROUTES.FORGOT_PASSWORD)" class="forgot">{{ t('auth.forgotPasswordLink') }}</NuxtLink>
          </div>
          <Field v-slot="{ field, errorMessage }" name="password">
            <a-input-password v-bind="field" :placeholder="t('auth.fields.passwordPlaceholder')" size="large" />
            <div v-if="errorMessage" class="error-text">{{ errorMessage }}</div>
          </Field>
        </div>

        <div class="remember">
          <a-checkbox v-model:checked="rememberMe">{{ t('auth.rememberMe') }}</a-checkbox>
        </div>

        <button class="submit" type="submit" :disabled="isSubmitting">
          {{ isSubmitting ? t('auth.actions.signingIn') : t('auth.signIn') }}
        </button>
      </form>

      <div class="divider"><span>{{ t('common.or') }}</span></div>

      <button class="google" type="button" @click="handleGoogleLogin">
        <svg width="18" height="18" viewBox="0 0 24 24">
          <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
          <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
          <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
          <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
        </svg>
        {{ t('auth.continueWithGoogle') }}
      </button>

      <p class="footer">
        {{ t('auth.noAccount') }}
        <NuxtLink :to="localePath(ROUTES.REGISTER)">{{ t('auth.signUpLink') }}</NuxtLink>
      </p>
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
  margin: 0 0 1.5rem;
}

.form-group {
  margin-bottom: 1rem;
}

.label {
  display: block;
  font-size: 0.825rem;
  font-weight: 500;
  color: #444;
  margin-bottom: 0.25rem;
}

.error-text {
  color: #c53030;
  font-size: 0.75rem;
  margin-top: 0.375rem;
}

.pass-label {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-bottom: 0.25rem;
}

.forgot {
  font-size: 0.8rem;
  color: #888;
  text-decoration: none;
}
.forgot:hover { color: #333; }

.remember {
  margin: -0.25rem 0 1.25rem;
}

.submit {
  width: 100%;
  padding: 0.65rem;
  background: #111;
  color: #fff;
  border: none;
  border-radius: 8px;
  font-size: 0.9rem;
  font-weight: 500;
  font-family: inherit;
  cursor: pointer;
  transition: background 0.15s;
}
.submit:hover:not(:disabled) { background: #333; }
.submit:disabled { opacity: 0.55; cursor: not-allowed; }

.divider {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin: 1.25rem 0;
  font-size: 0.8rem;
  color: #ccc;
}
.divider::before, .divider::after {
  content: '';
  flex: 1;
  height: 1px;
  background: #eee;
}
.divider span { color: #bbb; }

.google {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.6rem;
  padding: 0.65rem;
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  font-size: 0.875rem;
  font-weight: 500;
  font-family: inherit;
  color: #333;
  cursor: pointer;
  transition: background 0.15s, border-color 0.15s;
}
.google:hover { background: #f9f9f9; border-color: #d1d5db; }

.footer {
  text-align: center;
  font-size: 0.825rem;
  color: #999;
  margin-top: 1.25rem;
  margin-bottom: 0;
}
.footer a { color: #111; font-weight: 500; text-decoration: none; }
.footer a:hover { text-decoration: underline; }

/* Ant Design overrides */
:deep(.ant-input),
:deep(.ant-input-affix-wrapper) {
  border-radius: 8px !important;
  border-color: #e5e7eb !important;
  font-size: 0.875rem !important;
  font-family: inherit !important;
}
:deep(.ant-input-affix-wrapper-focused),
:deep(.ant-input:focus) {
  border-color: #111 !important;
  box-shadow: 0 0 0 2px rgba(0,0,0,0.06) !important;
}
:deep(.ant-checkbox-wrapper) {
  font-size: 0.825rem !important;
  color: #666 !important;
}

@keyframes up {
  from { opacity: 0; transform: translateY(12px); }
  to   { opacity: 1; transform: translateY(0); }
}
</style>