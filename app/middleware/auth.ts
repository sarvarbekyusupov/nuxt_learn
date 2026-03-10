export default defineNuxtRouteMiddleware((to, from) => {
  // This is a stub for authentication logic.
  // you would check if the user is logged in via Pinia or a cookie.
  const isLoggedIn = false;

  if (!isLoggedIn && to.path !== "/login" && to.path !== "/register") {
    // return navigateTo('/login')
  }
});
