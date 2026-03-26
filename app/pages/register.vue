<script setup lang="ts">
import { useForm, useField } from 'vee-validate'
import { ROUTES } from '#constants/routes'
import { createRegisterSchema } from '#validation/auth'
import { useCognito } from '@/composables/useCognito'
import { message } from 'ant-design-vue'
import { confirmSignUp } from 'aws-amplify/auth'

definePageMeta({
  layout: 'auth',
})

const { t } = useI18n()
const localePath = useLocalePath()
const { register: cognitoRegister, user } = useCognito()

const isMounted = ref(false)
const isSubmitting = ref(false)
const isConfirming = ref(false)
const registeredEmail = ref('')

// Initialize form
const form = useForm({
  validationSchema: createRegisterSchema(t),
  initialValues: {
    name: '',
    family_name: '',
    email: '',
    password: '',
    confirmPassword: '',
    birthdate: '',
    gender: '',
    picture: '',
    phone_number: ''
  }
})

// Define individual fields for granular control and absolute sync
const { value: name, errorMessage: nameError } = useField<string>('name')
const { value: family_name, errorMessage: familyNameError } = useField<string>('family_name')
const { value: email, errorMessage: emailError } = useField<string>('email')
const { value: password, errorMessage: passwordError } = useField<string>('password')
const { value: confirmPassword, errorMessage: confirmPasswordError } = useField<string>('confirmPassword')
const { value: birthdate, errorMessage: birthdateError } = useField<string>('birthdate')
const { value: gender, errorMessage: genderError } = useField<string>('gender')
const { value: picture, errorMessage: pictureError } = useField<string>('picture')
const { value: phone_number, errorMessage: phoneNumberError } = useField<string>('phone_number')

const onSubmit = form.handleSubmit(
  async (submitValues) => {
    console.log('--- CREATING ACCOUNT ---')
    console.log('Sending to Cognito:', { ...submitValues, password: '[HIDDEN]' })
    isSubmitting.value = true
    try {
      const result = await cognitoRegister({
        username: submitValues.email,
        password: submitValues.password,
        options: {
          userAttributes: {
            name: submitValues.name,
            family_name: submitValues.family_name,
            email: submitValues.email,
            birthdate: submitValues.birthdate,
            gender: submitValues.gender,
            picture: submitValues.picture,
            phone_number: submitValues.phone_number
          }
        }
      })

      if (result.nextStep.signUpStep === 'CONFIRM_SIGN_UP') {
        isConfirming.value = true
        registeredEmail.value = submitValues.email
        message.info(t('auth.messages.confirmCodeSent'))
      } else {
        message.success(t('auth.messages.registerSuccess'))
        return navigateTo(localePath(ROUTES.LOGIN))
      }
    } catch (err: unknown) {
      const error = err as Error
      console.error('Cognito Error:', error)
      if (error.name === 'UsernameExistsException') {
        form.setFieldError('email', t('auth.validation.email.exists'))
      } else {
        message.error(error.message || t('auth.messages.error'))
      }
    } finally {
      isSubmitting.value = false
    }
  },
  ({ errors }) => {
    console.error('Validation failed:', errors)
    console.log('Actual state of refs:', {
      name: name.value,
      email: email.value,
      gender: gender.value
    })
    message.error(t('auth.messages.validationError'))
  }
)

// Confirmation logic
const confirmationCode = ref('')
const onConfirm = async () => {
  if (!confirmationCode.value) return
  isSubmitting.value = true
  try {
    await confirmSignUp({
      username: registeredEmail.value,
      confirmationCode: confirmationCode.value
    })
    message.success(t('auth.messages.confirmSuccess'))
    return navigateTo(localePath(ROUTES.LOGIN))
  } catch (err: unknown) {
    const error = err as Error
    message.error(error.message || t('auth.messages.error'))
  } finally {
    isSubmitting.value = false
  }
}

onMounted(() => {
  isMounted.value = true
  if (user.value) navigateTo(localePath(ROUTES.HOME))
})
</script>

<template>
  <div class="animate-in fade-in slide-in-from-bottom-4 duration-1000 w-full max-w-2xl mx-auto">
    <div v-if="isMounted">
      <!-- Registration Form -->
      <div v-show="!isConfirming" class="w-full">
        <div class="mb-8 text-center lg:text-left">
          <h1 class="text-4xl font-black text-slate-900 tracking-tight mb-3">{{ t('auth.signUp') }}</h1>
          <p class="text-[1.05rem] text-slate-500 font-medium">{{ t('auth.signUpSubtitle') }}</p>
        </div>

        <form class="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5" @submit.prevent="onSubmit">
          <!-- Name -->
          <div class="space-y-2">
            <label class="block text-[0.8rem] font-bold text-slate-700 uppercase ml-1">{{ t('auth.fields.fullName') }}</label>
            <a-input 
              v-model:value="name"
              :status="nameError ? 'error' : ''"
              :placeholder="t('auth.fields.fullNamePlaceholder')" 
              size="large" 
              class="rounded-2xl! bg-slate-50! h-12!" 
            />
            <div v-if="nameError" class="text-red-500 text-[0.75rem] mt-1 ml-1 font-semibold">{{ nameError }}</div>
          </div>

          <!-- Family Name -->
          <div class="space-y-2">
            <label class="block text-[0.8rem] font-bold text-slate-700 uppercase ml-1">{{ t('auth.fields.familyName') }}</label>
            <a-input 
              v-model:value="family_name"
              :status="familyNameError ? 'error' : ''"
              :placeholder="t('auth.fields.familyNamePlaceholder')" 
              size="large" 
              class="rounded-2xl! bg-slate-50! h-12!" 
            />
            <div v-if="familyNameError" class="text-red-500 text-[0.75rem] mt-1 ml-1 font-semibold">{{ familyNameError }}</div>
          </div>

          <!-- Email -->
          <div class="space-y-2 md:col-span-2">
            <label class="block text-[0.8rem] font-bold text-slate-700 uppercase ml-1">{{ t('auth.fields.email') }}</label>
            <a-input 
              v-model:value="email"
              type="email" 
              :status="emailError ? 'error' : ''"
              :placeholder="t('auth.fields.emailPlaceholder')" 
              size="large" 
              class="rounded-2xl! bg-slate-50! h-12!" 
            />
            <div v-if="emailError" class="text-red-500 text-[0.75rem] mt-1 ml-1 font-semibold">{{ emailError }}</div>
          </div>

          <!-- Phone -->
          <div class="space-y-2">
            <label class="block text-[0.8rem] font-bold text-slate-700 uppercase ml-1">{{ t('auth.fields.phone') }}</label>
            <a-input 
              v-model:value="phone_number"
              :status="phoneNumberError ? 'error' : ''"
              placeholder="+1234567890" 
              size="large" 
              class="rounded-2xl! bg-slate-50! h-12!" 
            />
            <div v-if="phoneNumberError" class="text-red-500 text-[0.75rem] mt-1 ml-1 font-semibold">{{ phoneNumberError }}</div>
          </div>

          <!-- Birthdate -->
          <div class="space-y-2">
            <label class="block text-[0.8rem] font-bold text-slate-700 uppercase ml-1">{{ t('auth.fields.birthdate') }}</label>
            <a-input 
              v-model:value="birthdate"
              type="date" 
              :status="birthdateError ? 'error' : ''"
              size="large" 
              class="rounded-2xl! bg-slate-50! h-12!" 
            />
            <div v-if="birthdateError" class="text-red-500 text-[0.75rem] mt-1 ml-1 font-semibold">{{ birthdateError }}</div>
          </div>

          <!-- Gender -->
          <div class="space-y-2">
            <label class="block text-[0.8rem] font-bold text-slate-700 uppercase ml-1">{{ t('auth.fields.gender') }}</label>
            <a-select 
              v-model:value="gender"
              :status="genderError ? 'error' : ''"
              class="w-full! rounded-2xl! bg-slate-50! h-12!" 
              size="large"
            >
              <a-select-option value="male">Male</a-select-option>
              <a-select-option value="female">Female</a-select-option>
              <a-select-option value="other">Other</a-select-option>
            </a-select>
            <div v-if="genderError" class="text-red-500 text-[0.75rem] mt-1 ml-1 font-semibold">{{ genderError }}</div>
          </div>

          <!-- Picture -->
          <div class="space-y-2">
            <label class="block text-[0.8rem] font-bold text-slate-700 uppercase ml-1">{{ t('auth.fields.picture') }}</label>
            <a-input 
              v-model:value="picture"
              :status="pictureError ? 'error' : ''"
              placeholder="https://example.com/photo.jpg" 
              size="large" 
              class="rounded-2xl! bg-slate-50! h-12!" 
            />
            <div v-if="pictureError" class="text-red-500 text-[0.75rem] mt-1 ml-1 font-semibold">{{ pictureError }}</div>
          </div>

          <!-- Password -->
          <div class="space-y-2">
            <label class="block text-[0.8rem] font-bold text-slate-700 uppercase ml-1">{{ t('auth.fields.password') }}</label>
            <a-input-password 
              v-model:value="password"
              :status="passwordError ? 'error' : ''"
              :placeholder="t('auth.fields.passwordPlaceholder')" 
              size="large" 
              class="rounded-2xl! bg-slate-50! h-12!" 
            />
            <div v-if="passwordError" class="text-red-500 text-[0.75rem] mt-1 ml-1 font-semibold">{{ passwordError }}</div>
          </div>

          <!-- Confirm Password -->
          <div class="space-y-2">
            <label class="block text-[0.8rem] font-bold text-slate-700 uppercase ml-1">{{ t('auth.fields.confirmPassword') }}</label>
            <a-input-password 
              v-model:value="confirmPassword"
              :status="confirmPasswordError ? 'error' : ''"
              :placeholder="t('auth.fields.confirmPasswordPlaceholder')" 
              size="large" 
              class="rounded-2xl! bg-slate-50! h-12!" 
            />
            <div v-if="confirmPasswordError" class="text-red-500 text-[0.75rem] mt-1 ml-1 font-semibold">{{ confirmPasswordError }}</div>
          </div>

          <div class="md:col-span-2 mt-6">
            <button
              class="group relative w-full py-4 bg-slate-900 text-white rounded-2xl text-[1rem] font-bold shadow-xl shadow-slate-900/20 hover:bg-slate-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              type="submit"
              :disabled="isSubmitting"
            >
              <span v-if="isSubmitting" class="inline-block animate-spin mr-2">⟳</span>
              <span>{{ isSubmitting ? t('auth.actions.creatingAccount') : t('auth.actions.createAccount') }}</span>
            </button>
          </div>
        </form>

        <div class="mt-10 text-center">
          <NuxtLink :to="localePath(ROUTES.LOGIN)" class="text-slate-500 font-bold hover:text-slate-900 transition-colors">
            {{ t('auth.signInLink') }}
          </NuxtLink>
        </div>
      </div>

      <!-- Confirmation View -->
      <div v-if="isConfirming" class="text-center max-w-sm mx-auto">
        <h1 class="text-3xl font-black text-slate-900 mb-3">{{ t('auth.confirmAccount') }}</h1>
        <p class="text-slate-500 mb-10">{{ t('auth.confirmSubtitle') }} <b>{{ registeredEmail }}</b></p>

        <div class="space-y-6">
          <a-input 
            v-model:value="confirmationCode"
            placeholder="123456" 
            size="large" 
            class="rounded-2xl! bg-slate-50! text-center! tracking-[0.5em]! text-2xl! font-black! py-4!" 
          />
          <button
            class="w-full py-4 bg-slate-900 text-white rounded-2xl font-bold shadow-xl disabled:opacity-50"
            :disabled="isSubmitting"
            @click="onConfirm"
          >
            <span v-if="isSubmitting" class="inline-block animate-spin mr-2">⟳</span>
            {{ t('auth.actions.confirm') }}
          </button>
          <button class="w-full py-2 text-slate-400 font-bold" @click="isConfirming = false">
            {{ t('common.back') }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
:deep(.ant-select-selector) {
  border-radius: 1rem !important;
  background-color: #f8fafc !important;
  height: 3rem !important;
  display: flex !important;
  align-items: center !important;
}
</style>
