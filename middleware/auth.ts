/** @format */

export default defineNuxtRouteMiddleware(() => {
    const token = useToken();
    if (!token?.value) {
        return navigateTo('/');
    }
});
