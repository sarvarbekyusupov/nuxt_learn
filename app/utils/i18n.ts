export const SUPPORTED_LOCALES = {
  EN: 'en',
  UZ: 'uz',
  RU: 'ru',
} as const

export type SupportedLocale = typeof SUPPORTED_LOCALES[keyof typeof SUPPORTED_LOCALES]

export const LOCALE_NAMES: Record<SupportedLocale, string> = {
  [SUPPORTED_LOCALES.EN]: 'EN',
  [SUPPORTED_LOCALES.UZ]: 'UZ',
  [SUPPORTED_LOCALES.RU]: 'RU',
}
