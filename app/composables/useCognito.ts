import { 
  signIn, 
  signUp, 
  signOut, 
  fetchUserAttributes, 
  getCurrentUser,
  type SignInInput,
  type SignUpInput,
  type AuthUser,
  type FetchUserAttributesOutput
} from 'aws-amplify/auth';

export interface CognitoUser extends AuthUser {
  attributes: FetchUserAttributesOutput;
}

export const useCognito = () => {
  const user = useState<CognitoUser | null>("cognito_user", () => null);
  const isLoading = useState("cognito_loading", () => false);

  const login = async ({ username, password }: SignInInput) => {
    isLoading.value = true;
    try {
      const { isSignedIn, nextStep } = await signIn({ username, password });
      if (isSignedIn) {
        await fetchUser();
      }
      return { isSignedIn, nextStep };
    } catch (error) {
      console.error("Cognito login error:", error);
      throw error;
    } finally {
      isLoading.value = false;
    }
  };

  const register = async ({ username, password, options: authOptions }: SignUpInput) => {
    isLoading.value = true;
    try {
      const result = await signUp({
        username,
        password,
        options: authOptions
      });
      return result;
    } catch (error) {
      console.error("Cognito registration error:", error);
      throw error;
    } finally {
      isLoading.value = false;
    }
  };

  const logout = async () => {
    try {
      await signOut();
      user.value = null;
    } catch (error) {
      console.error("Cognito logout error:", error);
    }
  };

  const fetchUser = async () => {
    if (!import.meta.client) return null;
    try {
      const currentUser = await getCurrentUser();
      const attributes = await fetchUserAttributes();
      user.value = { ...currentUser, attributes };
      return user.value;
    } catch {
      // console.debug("No active session");
      user.value = null;
      return null;
    }
  };

  return {
    user,
    isLoading,
    login,
    register,
    logout,
    fetchUser,
  };
};
