<script setup lang="ts">
import { Field } from 'vee-validate'
import { ROUTES } from '#constants/routes'
import { useAuthForm } from '@/composables/useAuthForm'

definePageMeta({
  layout: 'auth',
})

const { onSubmit, isSubmitting, t, localePath } = useAuthForm('forgot-password')
</script>

<template>
  <div>
    <h1 class="text-3xl font-bold text-slate-900 tracking-tight mb-2">{{ t('auth.forgotPassword') }}</h1>
    <p class="text-[0.95rem] text-slate-500 leading-relaxed mb-8">{{ t('auth.forgotPasswordSubtitle') }}</p>

    <form @submit="onSubmit">
      <div class="mb-6">
        <label class="block text-[0.875rem] font-semibold text-slate-700 mb-1.5">{{ t('auth.fields.email') }}</label>
        <Field v-slot="{ field, errorMessage }" name="email">
          <a-input v-bind="field" type="email" :placeholder="t('auth.fields.emailPlaceholder')" size="large" />
          <div v-if="errorMessage" class="text-red-500 text-[0.8rem] mt-1.5 font-medium">{{ errorMessage }}</div>
        </Field>
      </div>

      <button
        class="w-full py-3 mt-2 bg-slate-900 text-white rounded-xl text-[0.95rem] font-semibold shadow-md shadow-slate-900/10 hover:bg-slate-800 hover:shadow-lg transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100"
        type="submit"
        :disabled="isSubmitting"
      >
        {{ isSubmitting ? t('auth.actions.sendingResetLink') : t('auth.actions.sendResetLink') }}
      </button>
    </form>

    <p class="text-center text-[0.9rem] text-slate-500 mt-6 mb-0 font-medium">
      {{ t('auth.rememberPassword') }}
      <router-link :to="localePath(ROUTES.LOGIN)" class="text-slate-900 font-semibold no-underline hover:underline">{{ t('auth.signInLinkForgot') }}</router-link>
    </p>
  </div>
</template>
