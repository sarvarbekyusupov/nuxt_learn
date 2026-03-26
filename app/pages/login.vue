<script setup lang="ts">
import { Field, useForm } from 'vee-validate'
import { ROUTES } from '#constants/routes'
import { createLoginSchema } from '#validation/auth'
import { useCognito } from '@/composables/useCognito'
import { message } from 'ant-design-vue'

definePageMeta({
  layout: 'auth',
})

const { t } = useI18n()
const localePath = useLocalePath()
const { login: cognitoLogin, user } = useCognito()

const rememberMe = ref(false)
const isSubmitting = ref(false)

const form = useForm({
  validationSchema: createLoginSchema(t),
  initialValues: {
    email: '',
    password: ''
  }
})

const onSubmit = form.handleSubmit(async (values) => {
  isSubmitting.value = true
  try {
    const { isSignedIn, nextStep } = await cognitoLogin({
      username: values.email,
      password: values.password
    })

    if (isSignedIn) {
      message.success(t('auth.messages.loginSuccess'))
      return navigateTo(localePath(ROUTES.HOME))
    }
    
    if (nextStep?.signInStep === 'CONFIRM_SIGN_UP') {
      message.info(t('auth.messages.confirmSignUpRequired') || 'Please confirm your sign up.')
    }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : t('auth.messages.error');
    message.error(errorMessage)
  } finally {
    isSubmitting.value = false
  }
})

onMounted(() => {
  if (user.value) {
    navigateTo(localePath(ROUTES.HOME))
  }
})
</script>

<template>
  <div class="animate-in fade-in slide-in-from-bottom-4 duration-1000 w-full max-w-sm mx-auto">
    <div class="mb-10">
      <h1 class="text-4xl font-black text-slate-900 tracking-tight mb-3">
        {{ t('auth.signIn') }}
      </h1>
      <p class="text-[1.05rem] text-slate-500 font-medium leading-relaxed">
        {{ t('auth.signInSubtitle') || 'Welcome back! Please enter your details.' }}
      </p>
    </div>

    <form class="space-y-6" @submit="onSubmit">
      <!-- Email Field -->
      <div class="space-y-2">
        <label class="block text-[0.85rem] font-bold text-slate-700 uppercase tracking-wider ml-1">
          {{ t('auth.fields.email') }}
        </label>
        <Field v-slot="{ value, handleChange, handleBlur, errorMessage }" name="email">
          <a-input 
            :value="value"
            :placeholder="t('auth.fields.emailPlaceholder')" 
            size="large" 
            class="rounded-2xl! bg-slate-50! border-slate-200! hover:border-slate-400! focus:border-slate-900! focus:ring-4! focus:ring-slate-900/5! transition-all! h-12! px-4! text-[0.95rem]!" 
            @update:value="handleChange"
            @blur="handleBlur"
          />
          <div v-if="errorMessage" class="text-red-500 text-[0.8rem] mt-1.5 font-semibold flex items-center gap-1 ml-1 animate-in fade-in slide-in-from-top-1">
            <span class="inline-block w-1 h-1 rounded-full bg-red-500" /> {{ errorMessage }}
          </div>
        </Field>
      </div>

      <!-- Password Field -->
      <div class="space-y-2">
        <div class="flex justify-between items-center w-full px-1">
          <label class="block text-[0.85rem] font-bold text-slate-700 uppercase tracking-wider">
            {{ t('auth.fields.password') }}
          </label>
          <NuxtLink :to="localePath(ROUTES.FORGOT_PASSWORD)" class="text-[0.85rem] font-bold text-slate-500 hover:text-slate-900 transition-colors">
            {{ t('auth.forgotPasswordLink') }}
          </NuxtLink>
        </div>
        <Field v-slot="{ value, handleChange, handleBlur, errorMessage }" name="password">
          <a-input-password 
            :value="value"
            :placeholder="t('auth.fields.passwordPlaceholder')" 
            size="large" 
            class="rounded-2xl! bg-slate-50! border-slate-200! hover:border-slate-400! focus:border-slate-900! focus:ring-4! focus:ring-slate-900/5! transition-all! h-12! px-4! text-[0.95rem]!" 
            @update:value="handleChange"
            @blur="handleBlur"
          />
          <div v-if="errorMessage" class="text-red-500 text-[0.8rem] mt-1.5 font-semibold flex items-center gap-1 ml-1 animate-in fade-in slide-in-from-top-1">
            <span class="inline-block w-1 h-1 rounded-full bg-red-500" /> {{ errorMessage }}
          </div>
        </Field>
      </div>

      <div class="flex items-center py-1">
        <a-checkbox v-model:checked="rememberMe" class="custom-checkbox text-slate-600 font-bold text-[0.9rem]">
          {{ t('auth.rememberMe') }}
        </a-checkbox>
      </div>

      <button
        class="group relative w-full py-4 bg-slate-900 text-white rounded-2xl text-[1rem] font-bold shadow-xl shadow-slate-900/20 hover:bg-slate-800 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
        type="submit"
        :disabled="isSubmitting"
      >
        <span v-if="isSubmitting" class="inline-block animate-spin mr-2">⟳</span>
        <span class="relative z-10">{{ isSubmitting ? t('auth.actions.signingIn') : t('auth.signIn') }}</span>
        <div class="absolute inset-0 rounded-2xl bg-linear-to-r from-white/0 via-white/5 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity" />
      </button>
    </form>

    <div class="mt-12">
      <div class="relative flex items-center justify-center">
        <div class="absolute inset-0 flex items-center">
          <div class="w-full border-t border-slate-200" />
        </div>
        <span class="relative px-4 bg-white lg:bg-white text-slate-400 text-[0.8rem] font-bold uppercase tracking-widest">
          {{ t('auth.noAccount') }}
        </span>
      </div>
      
      <div class="mt-8 text-center">
        <NuxtLink :to="localePath(ROUTES.REGISTER)" class="inline-flex items-center justify-center w-full py-4 bg-white border-2 border-slate-100 text-slate-900 rounded-2xl text-[0.95rem] font-bold hover:border-slate-200 hover:bg-slate-50 transition-all duration-300 active:scale-[0.98]">
          {{ t('auth.signUpLink') }}
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Custom styling for Ant Design components  */
:deep(.ant-input-affix-wrapper) {
  padding-left: 1rem !important;
  padding-right: 1rem !important;
}

:deep(.ant-checkbox-inner) {
  border-radius: 6px !important;
  width: 18px !important;
  height: 18px !important;
  border-color: #cbd5e1 !important;
}

:deep(.ant-checkbox-checked .ant-checkbox-inner) {
  background-color: #0f172a !important;
  border-color: #0f172a !important;
}

:deep(.ant-checkbox-wrapper:hover .ant-checkbox-inner) {
  border-color: #0f172a !important;
}
</style>
