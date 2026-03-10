export default defineNuxtRouteMiddleware((to) => {
  const authToken = useCookie("auth_token");

  // If the path starts with /admin and the auth_token cookie is missing, redirect to login
  if (!authToken.value && to.path.startsWith("/admin")) {
    const localePath = useLocalePath();
    return navigateTo(localePath("/login"));
  }
});
