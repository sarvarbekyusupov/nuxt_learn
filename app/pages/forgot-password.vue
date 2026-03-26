<script setup lang="ts">
import { Field, useForm } from 'vee-validate'
import { ROUTES } from '#constants/routes'
import { createForgotPasswordSchema } from '#validation/auth'
import { message } from 'ant-design-vue'
import { resetPassword, confirmResetPassword } from 'aws-amplify/auth'
import * as yup from 'yup'
import { toTypedSchema } from '@vee-validate/yup'
import { AUTH_VALIDATION } from '#constants/auth'

definePageMeta({
  layout: 'auth',
})

const { t } = useI18n()
const localePath = useLocalePath()

const isMounted = ref(false)
const isSubmitting = ref(false)
const currentStep = ref<'REQUEST' | 'CONFIRM'>('REQUEST')
const targetEmail = ref('')

// Step 1: Request Code Form
const requestForm = useForm({
  validationSchema: createForgotPasswordSchema(t),
  initialValues: { email: '' }
})

// Step 2: Confirm Reset Form Schema
const confirmSchema = toTypedSchema(
  yup.object({
    code: yup.string().required(t('auth.validation.confirmationCode.required') || 'Confirmation code is required'),
    newPassword: yup
      .string()
      .required(t('auth.validation.password.required'))
      .min(AUTH_VALIDATION.PASSWORD.MIN_LENGTH, t('auth.validation.password.tooShort'))
      .matches(AUTH_VALIDATION.PASSWORD.REGEX.UPPERCASE, t('auth.validation.password.uppercase'))
      .matches(AUTH_VALIDATION.PASSWORD.REGEX.LOWERCASE, t('auth.validation.password.lowercase'))
      .matches(AUTH_VALIDATION.PASSWORD.REGEX.NUMBER, t('auth.validation.password.number'))
      .matches(AUTH_VALIDATION.PASSWORD.REGEX.SPECIAL, t('auth.validation.password.special')),
    confirmNewPassword: yup
      .string()
      .required(t('auth.validation.confirmPassword.required'))
      .oneOf([yup.ref('newPassword')], t('auth.validation.confirmPassword.noMatch'))
  })
)

const confirmForm = useForm({
  validationSchema: confirmSchema,
  initialValues: { code: '', newPassword: '', confirmNewPassword: '' }
})

const onRequestSubmit = requestForm.handleSubmit(async (values) => {
  isSubmitting.value = true
  try {
    await resetPassword({ username: values.email })
    targetEmail.value = values.email
    currentStep.value = 'CONFIRM'
    message.info(t('auth.messages.resetLinkSent'))
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : t('auth.messages.error')
    message.error(errorMessage)
  } finally {
    isSubmitting.value = false
  }
})

const onConfirmSubmit = confirmForm.handleSubmit(async (values) => {
  isSubmitting.value = true
  try {
    await confirmResetPassword({
      username: targetEmail.value,
      confirmationCode: values.code,
      newPassword: values.newPassword
    })
    message.success(t('auth.messages.passwordResetSuccess') || 'Password reset successfully! Please sign in.')
    navigateTo(localePath(ROUTES.LOGIN))
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : t('auth.messages.error')
    message.error(errorMessage)
  } finally {
    isSubmitting.value = false
  }
})
onMounted(() => {
  isMounted.value = true
})
</script>

<template>
  <div class="animate-in fade-in slide-in-from-bottom-4 duration-1000 w-full max-w-sm mx-auto">
    <div v-if="isMounted">
      <!-- Step 1: Request Code -->
      <div v-show="currentStep === 'REQUEST'" class="w-full">
        <div class="flex items-center justify-center h-20 w-20 rounded-3xl bg-indigo-50 text-indigo-600 mb-8 mx-auto shadow-sm">
          <svg class="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z" />
          </svg>
        </div>

        <div class="text-center mb-10">
          <h1 class="text-3xl font-black text-slate-900 tracking-tight mb-3">{{ t('auth.forgotPassword') }}</h1>
          <p class="text-[1.05rem] text-slate-500 font-medium leading-relaxed">{{ t('auth.forgotPasswordSubtitle') }}</p>
        </div>

        <form class="space-y-6" @submit="onRequestSubmit">
          <div class="space-y-2">
            <label class="block text-[0.85rem] font-bold text-slate-700 uppercase tracking-wider ml-1">{{ t('auth.fields.email') }}</label>
            <Field v-slot="{ field, errorMessage }" name="email">
              <a-input 
                v-bind="field" 
                type="email" 
                :placeholder="t('auth.fields.emailPlaceholder')" 
                size="large" 
                class="rounded-2xl! bg-slate-50! border-slate-200! hover:border-slate-400! focus:border-slate-900! focus:ring-4! focus:ring-slate-900/5! transition-all! h-12! px-4!" 
              />
              <div v-if="errorMessage" class="text-red-500 text-[0.8rem] mt-1.5 font-semibold flex items-center gap-1 ml-1">
                <span class="inline-block w-1 h-1 rounded-full bg-red-500" /> {{ errorMessage }}
              </div>
            </Field>
          </div>

          <button
            class="group relative w-full py-4 bg-slate-900 text-white rounded-2xl text-[1rem] font-bold shadow-xl shadow-slate-900/20 hover:bg-slate-800 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 disabled:opacity-50"
            type="submit"
            :disabled="isSubmitting"
          >
            <span v-if="isSubmitting" class="inline-block animate-spin mr-2">⟳</span>
            <span class="relative z-10">{{ isSubmitting ? t('auth.actions.sendingResetLink') : t('auth.actions.sendResetLink') }}</span>
          </button>
        </form>
        
        <div class="mt-10 text-center">
          <NuxtLink :to="localePath(ROUTES.LOGIN)" class="text-[0.95rem] font-bold text-slate-400 hover:text-slate-900 transition-colors inline-flex items-center gap-2">
            <span>&larr;</span> {{ t('common.back') || 'Back to login' }}
          </NuxtLink>
        </div>
      </div>

      <!-- Step 2: Confirm Reset -->
      <div v-if="currentStep === 'CONFIRM'" class="animate-in fade-in slide-in-from-bottom-4 duration-1000 w-full">
        <div class="text-center mb-10">
          <h1 class="text-3xl font-black text-slate-900 tracking-tight mb-3">{{ t('auth.setNewPassword') || 'Set New Password' }}</h1>
          <p class="text-[1.05rem] text-slate-500 font-medium leading-relaxed">{{ t('auth.enterResetCode') || 'Enter the code and your new password.' }}</p>
        </div>

        <form class="space-y-6" @submit="onConfirmSubmit">
          <!-- Code Field -->
          <div class="space-y-2">
            <label class="block text-[0.85rem] font-bold text-slate-700 uppercase tracking-wider ml-1">{{ t('auth.fields.confirmationCode') || 'Confirmation Code' }}</label>
            <Field v-slot="{ field, errorMessage }" name="code">
              <a-input 
                v-bind="field" 
                placeholder="123456" 
                size="large" 
                class="rounded-2xl! bg-slate-50! border-slate-200! hover:border-slate-400! focus:border-slate-900! text-center! tracking-widest! text-xl! font-bold! h-12!" 
              />
              <div v-if="errorMessage" class="text-red-500 text-[0.8rem] mt-1.5 font-semibold flex items-center gap-1 ml-1">
                <span class="inline-block w-1 h-1 rounded-full bg-red-500" /> {{ errorMessage }}
              </div>
            </Field>
          </div>

          <!-- New Password Field -->
          <div class="space-y-2">
            <label class="block text-[0.85rem] font-bold text-slate-700 uppercase tracking-wider ml-1">{{ t('auth.fields.newPassword') || 'New Password' }}</label>
            <Field v-slot="{ field, errorMessage }" name="newPassword">
              <a-input-password 
                v-bind="field" 
                :placeholder="t('auth.fields.passwordPlaceholder')" 
                size="large" 
                class="rounded-2xl! bg-slate-50! border-slate-200! hover:border-slate-400! focus:border-slate-900! focus:ring-4! focus:ring-slate-900/5! transition-all! h-12! px-4!" 
              />
              <div v-if="errorMessage" class="text-red-500 text-[0.8rem] mt-1.5 font-semibold flex items-center gap-1 ml-1">
                <span class="inline-block w-1 h-1 rounded-full bg-red-500" /> {{ errorMessage }}
              </div>
            </Field>
          </div>

          <!-- Confirm New Password Field -->
          <div class="space-y-2">
            <label class="block text-[0.85rem] font-bold text-slate-700 uppercase tracking-wider ml-1">{{ t('auth.fields.confirmPassword') }}</label>
            <Field v-slot="{ field, errorMessage }" name="confirmNewPassword">
              <a-input-password 
                v-bind="field" 
                :placeholder="t('auth.fields.confirmPasswordPlaceholder')" 
                size="large" 
                class="rounded-2xl! bg-slate-50! border-slate-200! hover:border-slate-400! focus:border-slate-900! focus:ring-4! focus:ring-slate-900/5! transition-all! h-12! px-4!" 
              />
              <div v-if="errorMessage" class="text-red-500 text-[0.8rem] mt-1.5 font-semibold flex items-center gap-1 ml-1">
                <span class="inline-block w-1 h-1 rounded-full bg-red-500" /> {{ errorMessage }}
              </div>
            </Field>
          </div>

          <button
            class="group relative w-full py-4 bg-slate-900 text-white rounded-2xl text-[1rem] font-bold shadow-xl shadow-slate-900/20 hover:bg-slate-800 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 disabled:opacity-50"
            type="submit"
            :disabled="isSubmitting"
          >
            <span v-if="isSubmitting" class="inline-block animate-spin mr-2">⟳</span>
            <span class="relative z-10">{{ isSubmitting ? t('auth.actions.confirming') : (t('auth.actions.resetPassword') || 'Reset Password') }}</span>
          </button>
          
          <button 
            type="button"
            class="w-full py-2 text-[0.95rem] font-bold text-slate-400 hover:text-slate-900 transition-colors"
            @click="currentStep = 'REQUEST'"
          >
            {{ t('common.back') || 'Back' }}
          </button>
        </form>
      </div>
    </div>
  </div>
</template>
