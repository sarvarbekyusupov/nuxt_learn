import { Amplify } from 'aws-amplify';

export default defineNuxtPlugin((_nuxtApp) => {
  const config = useRuntimeConfig();
  const cognitoConfig = config.public.cognito;

  Amplify.configure({
    Auth: {
      Cognito: {
        userPoolId: cognitoConfig.userPoolId,
        userPoolClientId: cognitoConfig.clientId,
        loginWith: {
          email: true,
        },
      },
    },
  });
});
