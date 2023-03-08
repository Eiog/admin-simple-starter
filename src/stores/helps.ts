import type { RouteRecordRaw } from 'vue-router'
import type { MenuOption } from 'naive-ui'
import { NIcon } from 'naive-ui'
import _ from 'lodash-es'
import { colord } from 'colord'
export const verifyAccess = (requireAccess?: number[], access?: number[]) => {
  if (!access || !Array.isArray(access))
    return false
  if (!requireAccess || requireAccess.length === 0)
    return true
  return access.some(item => requireAccess.includes(item))
}
export const verifyAuth = (routes: RouteRecordRaw[], access?: number[]) => {
  const authRoutes: RouteRecordRaw[] = []
  routes.forEach((route) => {
    const requireAccess = route.meta?.access
    if (Array.isArray(requireAccess) && verifyAccess(requireAccess, access)) {
      const authRoute = _.cloneDeep(route)
      if (route.children)
        authRoute.children = verifyAuth(route.children, access)
      authRoutes.push(authRoute)
    }
  })
  return authRoutes
}
const renderIcon = (icon?: RouteRecordRaw) => {
  const iconComponent = icon?.meta?.icon
  return iconComponent
    ? h(NIcon, null, { default: () => h(iconComponent) })
    : undefined
}
export const routes2Menu = (routes: RouteRecordRaw[]) => {
  const authMenu: MenuOption[] = []
  routes = routes.sort((a, b) => {
    return (a.meta && b.meta && a.meta.sort && b.meta.sort)
      ? b.meta.sort - a.meta.sort
      : 0
  })
  routes.forEach((route) => {
    if (route.meta?.hidden)
      return
    if (route.meta?.menuGroupKey) {
      const key = route.meta.menuGroupKey
      const index = authMenu.findIndex(f => f.key === key)
      if (index > -1) {
        authMenu[index].children?.push({ key: route.path, label: route.meta.title })
        return
      }
      authMenu.push({ key, label: route.meta.menuGroupLabel, type: 'group', children: [{ key: route.path, label: route.meta.title }] })
      return
    }
    authMenu.push({ key: route.path, label: route.meta?.title })
  })
  return authMenu
}

export const keepAliveName = (routes: RouteRecordRaw[]) => {
  const keepAliveNames: string[] = []
  routes.forEach((route) => {
    if (route.meta?.keepAlive && route.name)
      keepAliveNames.push(route.name as string)
    if (route.children)
      keepAliveNames.push(...keepAliveName(route.children))
  })
  return keepAliveNames
}
export const getSatusColor = (color = '#ff461f') => {
  return {
    color,
    hover: colord(color).lighten(0.1).toHex(),
    pressed: colord(color).darken(0.1).toHex(),
    suppl: colord(color).lighten(0.1).toHex(),
  }
}
