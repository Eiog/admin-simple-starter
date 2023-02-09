import NProgress from 'nprogress'
import type { NavigationGuardNext, RouteLocationNormalized } from 'vue-router'
import { verifyAccess } from '~/stores/helps'
/** 动态修改title */
export function useChangeTitle(to: RouteLocationNormalized) {
  const title = useTitle()
  const envTitle = import.meta.env.VITE_APP_TITLE || ''
  title.value = (to.meta.title ?? envTitle) as string
}
/** 使用进度条 */
export function useNProgress() {
  /** 进度条开始 */
  function start() {
    if (!NProgress.isStarted())
      NProgress.start()
  }
  /** 进度条结束 */
  function done() {
    NProgress.done()
  }
  return { start, done }
}
export const useTab = (to: RouteLocationNormalized) => {
  if (to.meta.hidden)
    return
  const { setTab } = useAccessStore()
  setTab({
    title: to.meta.title,
    name: to.name as string,
    path: to.path,
    access: to.meta.access,
    icon: to.meta.icon,
    keepAlive: to.meta.keepAlive,
  })
}
export const useAuth = (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext,
) => {
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
    return next('/no-access')
  }
  if (!to.meta.requiresAuth)
    return next()
}
