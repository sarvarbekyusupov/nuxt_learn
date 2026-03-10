<script setup lang="ts">
import { Field } from 'vee-validate'
import { ROUTES } from '#constants/routes'
import { useAuthForm } from '@/composables/useAuthForm'

definePageMeta({
  layout: 'auth',
})

const { onSubmit, isSubmitting, t, localePath } = useAuthForm('login')

const rememberMe = ref(false)

async function handleGoogleLogin() {
  const { t } = useI18n()
  const { message } = await import('ant-design-vue')
  message.info(t('auth.messages.googleLogin'))
}
</script>

<template>
  <div>
    <h1 class="text-3xl font-bold text-slate-900 tracking-tight mb-2">{{ t('auth.signIn') }}</h1>
    <p class="text-[0.95rem] text-slate-500 leading-relaxed mb-8">{{ t('auth.signInSubtitle') || 'Please enter your details to sign in.' }}</p>

    <form @submit="onSubmit">
      <!-- Email Field -->
      <div class="mb-4.5">
        <label class="block text-[0.875rem] font-semibold text-slate-700 mb-1.5">{{ t('auth.fields.email') }}</label>
        <Field v-slot="{ field, errorMessage }" name="email">
          <a-input v-bind="field" :placeholder="t('auth.fields.emailPlaceholder')" size="large" />
          <div v-if="errorMessage" class="text-red-500 text-[0.8rem] mt-1.5 font-medium">{{ errorMessage }}</div>
        </Field>
      </div>

      <!-- Password Field -->
      <div class="mb-4.5">
        <div class="flex justify-between items-center w-full mb-1.5">
          <label class="block text-[0.875rem] font-semibold text-slate-700">{{ t('auth.fields.password') }}</label>
          <NuxtLink :to="localePath(ROUTES.FORGOT_PASSWORD)" class="text-[0.85rem] font-medium text-slate-500 hover:text-slate-900 transition-colors">{{ t('auth.forgotPasswordLink') }}</NuxtLink>
        </div>
        <Field v-slot="{ field, errorMessage }" name="password">
          <a-input-password v-bind="field" :placeholder="t('auth.fields.passwordPlaceholder')" size="large" />
          <div v-if="errorMessage" class="text-red-500 text-[0.8rem] mt-1.5 font-medium">{{ errorMessage }}</div>
        </Field>
      </div>

      <div class="mt-1 mb-6">
        <a-checkbox v-model:checked="rememberMe">{{ t('auth.rememberMe') }}</a-checkbox>
      </div>

      <button
        class="w-full py-3 bg-slate-900 text-white rounded-xl text-[0.95rem] font-semibold shadow-md shadow-slate-900/10 hover:bg-slate-800 hover:shadow-lg transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100"
        type="submit"
        :disabled="isSubmitting"
      >
        {{ isSubmitting ? t('auth.actions.signingIn') : t('auth.signIn') }}
      </button>
    </form>

    <div class="flex items-center gap-4 my-6 text-[0.85rem] font-medium text-slate-400 before:flex-1 before:h-px before:bg-slate-200 after:flex-1 after:h-px after:bg-slate-200">
      <span>{{ t('common.or') }}</span>
    </div>

    <button
      class="w-full flex items-center justify-center gap-3 py-3 bg-white border border-slate-200/80 rounded-xl text-[0.95rem] font-semibold text-slate-700 shadow-sm hover:bg-slate-50 hover:text-slate-900 hover:border-slate-300 transition-all active:scale-[0.98]"
      type="button"
      @click="handleGoogleLogin"
    >
      <svg width="20" height="20" viewBox="0 0 24 24">
        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
      </svg>
      {{ t('auth.continueWithGoogle') }}
    </button>

    <p class="text-center text-[0.9rem] text-slate-500 mt-6 mb-0 font-medium">
      {{ t('auth.noAccount') }}
      <NuxtLink :to="localePath(ROUTES.REGISTER)" class="text-slate-900 font-semibold no-underline hover:underline">{{ t('auth.signUpLink') }}</NuxtLink>
    </p>
  </div>
</template>
