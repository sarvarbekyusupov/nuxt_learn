import { useCognito } from '~/composables/useCognito'

export default defineNuxtRouteMiddleware(async (to) => {
  const { user, fetchUser } = useCognito()
  const localePath = useLocalePath()

  // Ensure we have the user state (fetch from storage if not in memory)
  if (!user.value && import.meta.client) {
    await fetchUser()
  }

  // If already logged in and trying to access login/register, go to home
  const authPages = ['/login', '/register']
  if (user.value && authPages.some(path => to.path.includes(path))) {
    return navigateTo(localePath('/'))
  }

  // If NOT logged in and trying to access a protected page, go to login
  // (Assuming this middleware is only applied to protected pages or we check paths)
  if (!user.value && !authPages.some(path => to.path.includes(path)) && to.path !== '/') {
     return navigateTo(localePath('/login'))
  }
})
