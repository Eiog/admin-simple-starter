import type { NavigationGuardNext, RouteLocationNormalized } from 'vue-router'

export function useRouteAuth(to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext) {
  const { access, refreshed, token, userInfo } = storeToRefs(useAccessStore())
  if (!refreshed.value && token.value && to.meta.requiresAuth) {
    loginApi
      .status({ token: token.value })
      .then((res) => {
        userInfo.value = res.userInfo
        access.value = res.access
        refreshed.value = true
        token.value = res.token
        next()
      })
      .catch(() => {
        refreshed.value = false
        token.value = undefined
        userInfo.value = undefined
        access.value = []
        next(`/login?redirect=${to.path}`)
      })
    return
  }
  if (!refreshed.value && !token.value && to.meta.requiresAuth)
    return next(`/login?redirect=${to.path}`)

  if (refreshed.value && to.path === '/login')
    return next(from.path)
  if (refreshed.value && to.meta.requiresAuth) {
    if (
      access.value
      && to.meta.access
      && verifyAccess(to.meta.access, access.value)
    )
      return next()
    return next('/error-page/no-access')
  }
  if (!to.meta.requiresAuth)
    return next()
}
