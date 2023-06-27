import type { RouteRecordRaw } from 'vue-router'
import type { MenuOption } from 'naive-ui'
import { NIcon } from 'naive-ui'
import _ from 'lodash-es'
import { colord } from 'colord'

export function verifyAccess(requireAccess?: number[], access?: number[]) {
  if (!access || !Array.isArray(access))
    return false
  if (!requireAccess)
    return true
  return access.some(item => requireAccess.includes(item))
}
export function verifyAuth(routes: RouteRecordRaw[], access?: number[]) {
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
function renderIcon(icon?: RouteRecordRaw) {
  const iconComponent = icon?.meta?.icon
  return iconComponent
    ? h(NIcon, null, { default: () => h(iconComponent) })
    : undefined
}
export function routes2Menu(routes: RouteRecordRaw[]) {
  const authMenu: MenuOption[] = []
  routes = routes.sort((a, b) => {
    return (a.meta && b.meta && a.meta.sort && b.meta.sort)
      ? b.meta.sort - a.meta.sort
      : 0
  })
  routes.forEach((route) => {
    if (route.meta && !route.meta.hidden) {
      if (route.meta?.root) {
        route.children?.forEach((childrenRoute) => {
          authMenu.push({
            label: childrenRoute.meta?.title,
            key: childrenRoute.path,
            icon: () => renderIcon(childrenRoute),
          })
        })
        return
      }
      if (!route.meta?.root) {
        route.children?.forEach((childrenRoute) => {
          if (childrenRoute.meta?.root) {
            authMenu.push({
              label: childrenRoute.meta?.title,
              key: childrenRoute.path,
              icon: () => renderIcon(childrenRoute),
            })
          }
        })
      }
      if (
        !route.meta.root
        && !route.children?.every(item => item.meta?.root)
      ) {
        authMenu.push({
          label: route.meta.title,
          key: route.path,
          icon: () => renderIcon(route),
          children: route.children ? routes2Menu(route.children) : undefined,
        })
      }
    }
  })
  return authMenu
}

export function keepAliveName(routes: RouteRecordRaw[]) {
  const keepAliveNames: string[] = []
  routes.forEach((route) => {
    if (route.meta?.keepAlive && route.name)
      keepAliveNames.push(route.name as string)
    if (route.children)
      keepAliveNames.push(...keepAliveName(route.children))
  })
  return keepAliveNames
}
export function getSatusColor(color = '#ff461f') {
  return {
    color,
    hover: colord(color).lighten(0.1).toHex(),
    pressed: colord(color).darken(0.1).toHex(),
    suppl: colord(color).lighten(0.1).toHex(),
  }
}
