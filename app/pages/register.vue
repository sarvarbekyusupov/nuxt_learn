<script setup lang="ts">
import { useForm, Field } from 'vee-validate'
import { createRegisterSchema } from '@/utils/auth/validation'
import { message } from 'ant-design-vue'
import { ROUTES } from '@/utils/routes'
import { AUTH_API_CONFIG } from '@/utils/auth/constants'

definePageMeta({
  layout: false,
})

const { t } = useI18n()
const localePath = useLocalePath()
const { handleSubmit, isSubmitting } = useForm({ validationSchema: createRegisterSchema(t) })

const onSubmit = handleSubmit(async (_values) => {
  try {
    await new Promise(resolve => setTimeout(resolve, AUTH_API_CONFIG.MOCK_DELAY_MS))
    message.success(t('auth.messages.registerSuccess'))
  } catch {
    message.error(t('auth.messages.error'))
  }
})
</script>

<template>
  <div class="page">
    <div class="card">
      <h1 class="title">{{ t('auth.signUp') }}</h1>

      <form @submit="onSubmit">
        <!-- Name Field -->
        <div class="form-group">
          <label class="label">{{ t('auth.fields.fullName') }}</label>
          <Field v-slot="{ field, errorMessage }" name="name">
            <a-input v-bind="field" :placeholder="t('auth.fields.fullNamePlaceholder')" size="large" />
            <div v-if="errorMessage" class="error-text">{{ errorMessage }}</div>
          </Field>
        </div>

        <!-- Email Field -->
        <div class="form-group">
          <label class="label">{{ t('auth.fields.email') }}</label>
          <Field v-slot="{ field, errorMessage }" name="email">
            <a-input v-bind="field" type="email" :placeholder="t('auth.fields.emailPlaceholder')" size="large" />
            <div v-if="errorMessage" class="error-text">{{ errorMessage }}</div>
          </Field>
        </div>

        <!-- Password Field -->
        <div class="form-group">
          <label class="label">{{ t('auth.fields.password') }}</label>
          <div class="password-hint">{{ t('auth.passwordHint') }}</div>
          <Field v-slot="{ field, errorMessage }" name="password">
            <a-input-password v-bind="field" :placeholder="t('auth.fields.passwordPlaceholder')" size="large" />
            <div v-if="errorMessage" class="error-text">{{ errorMessage }}</div>
          </Field>
        </div>

        <!-- Confirm Password Field -->
        <div class="form-group">
          <label class="label">{{ t('auth.fields.confirmPassword') }}</label>
          <Field v-slot="{ field, errorMessage }" name="confirmPassword">
            <a-input-password v-bind="field" :placeholder="t('auth.fields.confirmPasswordPlaceholder')" size="large" />
            <div v-if="errorMessage" class="error-text">{{ errorMessage }}</div>
          </Field>
        </div>

        <button class="submit" type="submit" :disabled="isSubmitting">
          {{ isSubmitting ? t('auth.actions.creatingAccount') : t('auth.actions.createAccount') }}
        </button>
      </form>

      <p class="footer">
        {{ t('auth.haveAccount') }}
        <router-link :to="localePath(ROUTES.LOGIN)">{{ t('auth.signInLink') }}</router-link>
      </p>
    </div>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600&display=swap');

.page {
  min-height: 100vh;
  height: 100%;
  width: 100%;
  background: #f5f5f5;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'DM Sans', sans-serif;
  padding: 1.5rem;
  box-sizing: border-box;
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

.password-hint {
  font-size: 0.75rem;
  color: #999;
  margin-bottom: 0.375rem;
}

.submit {
  width: 100%;
  padding: 0.65rem;
  margin-top: 0.25rem;
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

.footer {
  text-align: center;
  font-size: 0.825rem;
  color: #999;
  margin-top: 1.25rem;
  margin-bottom: 0;
}
.footer a { color: #111; font-weight: 500; text-decoration: none; }
.footer a:hover { text-decoration: underline; }

/* Ant overrides */
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

@keyframes up {
  from { opacity: 0; transform: translateY(12px); }
  to   { opacity: 1; transform: translateY(0); }
}
</style>