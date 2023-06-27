import type { RouteLocationNormalized } from 'vue-router'

export function useRouteTab(to: RouteLocationNormalized) {
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
