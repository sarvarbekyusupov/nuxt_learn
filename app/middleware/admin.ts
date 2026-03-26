import { useCognito } from '~/composables/useCognito'

export default defineNuxtRouteMiddleware(async (to) => {
  const { user, fetchUser } = useCognito()
  const localePath = useLocalePath()

  if (!user.value && import.meta.client) {
    await fetchUser()
  }

  // If the path starts with /admin and the user is not logged in, redirect to login
  if (!user.value && to.path.includes("/admin")) {
    return navigateTo(localePath("/login"));
  }

  // Add more specific admin checks here if needed (e.g. Cognito groups)
});
