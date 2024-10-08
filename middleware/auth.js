
export default defineNuxtRouteMiddleware((to, from) => {
  const userId = useCookie('userId');
  if (to.path == "/signin" && userId.value) {
    return navigateTo("/");
  }
  if (to.path == "/signout" && !userId.value) {
    return navigateTo("/explore");
  }
})