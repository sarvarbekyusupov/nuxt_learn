export const AUTH_VALIDATION = {
  EMAIL: {
    MAX_LENGTH: 255,
  },
  PASSWORD: {
    MIN_LENGTH: 8,
    MAX_LENGTH: 128,
    REGEX: {
      UPPERCASE: /[A-Z]/,
      LOWERCASE: /[a-z]/,
      NUMBER: /[0-9]/,
      SPECIAL: /[^A-Za-z0-9]/,
    },
  },
  NAME: {
    MIN_LENGTH: 2,
    MAX_LENGTH: 100,
    REGEX: /^[a-zA-Z\s'-]+$/,
  },
} as const

export const AUTH_API_CONFIG = {
  MOCK_DELAY_MS: 1500,
} as const
