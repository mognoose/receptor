import { useAuth } from '~~/composables/useAuth';

// This middleware checks if the user is authenticated.
export default defineNuxtRouteMiddleware((to, from) => {
  const { user } = useAuth();

  if (!user.value) {
    return navigateTo({
      path: '/login',
      query: {
        redirect: to.fullPath,
      },
    });
  }
});
