import { useForm } from "vee-validate";
import { message } from "ant-design-vue";
import { useI18n } from "vue-i18n";
import {
  createLoginSchema,
  createRegisterSchema,
  createForgotPasswordSchema,
} from "#validation/auth";
import { AUTH_API_CONFIG } from "#constants/auth";
import { ROUTES } from "#constants/routes";

export function useAuthForm(type: "login" | "register" | "forgot-password") {
  const { t } = useI18n();
  const localePath = useLocalePath();
  const authToken = useCookie("auth_token");

  const schemaMap = {
    login: createLoginSchema,
    register: createRegisterSchema,
    "forgot-password": createForgotPasswordSchema,
  };

  const schema = schemaMap[type](t);

  const form = useForm({
    validationSchema: schema,
  });

  const onSubmit = form.handleSubmit(async (values) => {
    try {
      await new Promise((resolve) =>
        setTimeout(resolve, AUTH_API_CONFIG.MOCK_DELAY_MS),
      );

      const successMessageMap = {
        login: "auth.messages.loginSuccess",
        register: "auth.messages.registerSuccess",
        "forgot-password": "auth.messages.resetLinkSent",
      };

      message.success(t(successMessageMap[type]));

      if (type === "login") {
        authToken.value = "mock_admin_token";
        return navigateTo(localePath(ROUTES.ADMIN));
      }

      return values;
    } catch {
      message.error(t("auth.messages.error"));
    }
  });

  return {
    ...form,
    onSubmit,
    t,
    localePath,
  };
}
