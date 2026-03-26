import { toTypedSchema } from "@vee-validate/yup";
import * as yup from "yup";
import { AUTH_VALIDATION } from "#constants/auth";

// ─── Factory functions for creating validation schemas with i18n ────────────────

export const createEmailSchema = (t: (key: string) => string) =>
  yup
    .string()
    .required(t("auth.validation.email.required"))
    .email(t("auth.validation.email.invalid"))
    .max(AUTH_VALIDATION.EMAIL.MAX_LENGTH, t("auth.validation.email.tooLong"));

export const createPasswordSchema = (t: (key: string) => string) =>
  yup
    .string()
    .required(t("auth.validation.password.required"))
    .min(AUTH_VALIDATION.PASSWORD.MIN_LENGTH, t("auth.validation.password.tooShort"))
    .max(AUTH_VALIDATION.PASSWORD.MAX_LENGTH, t("auth.validation.password.tooLong"))
    .matches(AUTH_VALIDATION.PASSWORD.REGEX.UPPERCASE, t("auth.validation.password.uppercase"))
    .matches(AUTH_VALIDATION.PASSWORD.REGEX.LOWERCASE, t("auth.validation.password.lowercase"))
    .matches(AUTH_VALIDATION.PASSWORD.REGEX.NUMBER, t("auth.validation.password.number"))
    .matches(AUTH_VALIDATION.PASSWORD.REGEX.SPECIAL, t("auth.validation.password.special"));

export const createNameSchema = (t: (key: string) => string) =>
  yup
    .string()
    .required(t("auth.validation.name.required"))
    .min(AUTH_VALIDATION.NAME.MIN_LENGTH, t("auth.validation.name.tooShort"))
    .max(AUTH_VALIDATION.NAME.MAX_LENGTH, t("auth.validation.name.tooLong"))
    .matches(
      AUTH_VALIDATION.NAME.REGEX,
      t("auth.validation.name.invalidChars"),
    );

// ─── Form schema factory functions ───────────────────────────────────────────────

export const createLoginSchema = (t: (key: string) => string) =>
  toTypedSchema(
    yup.object({
      email: createEmailSchema(t),
      password: yup.string().required(t("auth.validation.password.required")),
    })
  );

export const createRegisterSchema = (t: (key: string) => string) =>
  toTypedSchema(
    yup.object({
      name: createNameSchema(t),
      family_name: yup
        .string()
        .required(t("auth.validation.familyName.required"))
        .min(2, t("auth.validation.familyName.tooShort"))
        .max(100, t("auth.validation.familyName.tooLong")),
      email: createEmailSchema(t),
      password: createPasswordSchema(t),
      confirmPassword: yup
        .string()
        .required(t("auth.validation.confirmPassword.required"))
        .oneOf([yup.ref("password")], t("auth.validation.confirmPassword.noMatch")),
      birthdate: yup
        .string()
        .required(t("auth.validation.birthdate.required")),
      gender: yup
        .string()
        .required(t("auth.validation.gender.required")),
      picture: yup
        .string()
        .required(t("auth.validation.picture.required"))
        .url(t("auth.validation.picture.invalidUrl")),
      phone_number: yup
        .string()
        .required(t("auth.validation.phone.required"))
        .matches(/^\+[1-9]\d{1,14}$/, t("auth.validation.phone.invalid")),
    })
  );

export const createForgotPasswordSchema = (t: (key: string) => string) =>
  toTypedSchema(
    yup.object({
      email: createEmailSchema(t),
    })
  );
