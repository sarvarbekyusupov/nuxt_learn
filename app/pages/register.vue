<script setup lang="ts">
import { Field } from 'vee-validate'
import { ROUTES } from '#constants/routes'
import { useAuthForm } from '@/composables/useAuthForm'

definePageMeta({
  layout: 'auth',
})

const { onSubmit, isSubmitting, t, localePath } = useAuthForm('register')
</script>


<template>
  <div>
    <h1 class="text-3xl font-bold text-slate-900 tracking-tight mb-2">{{ t('auth.signUp') }}</h1>
    <p class="text-[0.95rem] text-slate-500 leading-relaxed mb-8">{{ t('auth.signUpSubtitle') || 'Create an account to get started.' }}</p>

    <form @submit="onSubmit">
      <!-- Name Field -->
      <div class="mb-4.5">
        <label class="block text-[0.875rem] font-semibold text-slate-700 mb-1.5">{{ t('auth.fields.fullName') }}</label>
        <Field v-slot="{ field, errorMessage }" name="name">
          <a-input v-bind="field" :placeholder="t('auth.fields.fullNamePlaceholder')" size="large" />
          <div v-if="errorMessage" class="text-red-500 text-[0.8rem] mt-1.5 font-medium">{{ errorMessage }}</div>
        </Field>
      </div>

      <!-- Email Field -->
      <div class="mb-4.5">
        <label class="block text-[0.875rem] font-semibold text-slate-700 mb-1.5">{{ t('auth.fields.email') }}</label>
        <Field v-slot="{ field, errorMessage }" name="email">
          <a-input v-bind="field" type="email" :placeholder="t('auth.fields.emailPlaceholder')" size="large" />
          <div v-if="errorMessage" class="text-red-500 text-[0.8rem] mt-1.5 font-medium">{{ errorMessage }}</div>
        </Field>
      </div>

      <!-- Password Field -->
      <div class="mb-4.5">
        <label class="block text-[0.875rem] font-semibold text-slate-700 mb-1.5">{{ t('auth.fields.password') }}</label>
        <div class="text-[0.8rem] font-medium text-slate-400 mb-2">{{ t('auth.passwordHint') }}</div>
        <Field v-slot="{ field, errorMessage }" name="password">
          <a-input-password v-bind="field" :placeholder="t('auth.fields.passwordPlaceholder')" size="large" />
          <div v-if="errorMessage" class="text-red-500 text-[0.8rem] mt-1.5 font-medium">{{ errorMessage }}</div>
        </Field>
      </div>

      <!-- Confirm Password Field -->
      <div class="mb-6">
        <label class="block text-[0.875rem] font-semibold text-slate-700 mb-1.5">{{ t('auth.fields.confirmPassword') }}</label>
        <Field v-slot="{ field, errorMessage }" name="confirmPassword">
          <a-input-password v-bind="field" :placeholder="t('auth.fields.confirmPasswordPlaceholder')" size="large" />
          <div v-if="errorMessage" class="text-red-500 text-[0.8rem] mt-1.5 font-medium">{{ errorMessage }}</div>
        </Field>
      </div>

      <button
        class="w-full py-3 mt-2 bg-slate-900 text-white rounded-xl text-[0.95rem] font-semibold shadow-md shadow-slate-900/10 hover:bg-slate-800 hover:shadow-lg transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100"
        type="submit"
        :disabled="isSubmitting"
      >
        {{ isSubmitting ? t('auth.actions.creatingAccount') : t('auth.actions.createAccount') }}
      </button>
    </form>

    <p class="text-center text-[0.9rem] text-slate-500 mt-6 mb-0 font-medium">
      {{ t('auth.haveAccount') }}
      <router-link :to="localePath(ROUTES.LOGIN)" class="text-slate-900 font-semibold no-underline hover:underline">{{ t('auth.signInLink') }}</router-link>
    </p>
  </div>
</template>
