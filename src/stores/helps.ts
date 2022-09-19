import { RouteRecordRaw } from 'vue-router';
import { MenuOption, NIcon } from 'naive-ui';
export const verifyAuth = (routes: RouteRecordRaw[], access?: number) => {
  const authRoutes: RouteRecordRaw[] = [];
  routes.forEach((route) => {
    const requireAccess = route.meta?.access;
    if (requireAccess && access && (access & requireAccess) === requireAccess) {
      if (route.children) {
        route.children = verifyAuth(route.children, access);
      }
      let authRoute = route;
      if (route.children)
        authRoute.children = verifyAuth(route.children, access);
      authRoutes.push(authRoute);
    }
  });
  return authRoutes;
};
export const routes2Menu = (routes: RouteRecordRaw[]) => {
  const authMenu: MenuOption[] = [];
  routes = routes.sort((a, b) => {
    return a.meta && b.meta ? b.meta.sort - a.meta.sort : 0;
  });
  routes.forEach((route) => {
    if (route.meta && route.meta.show) {
      if (route.meta?.root) {
        route.children?.forEach((childrenRoute) => {
          authMenu.push({
            label: childrenRoute.meta?.title,
            key: childrenRoute.path,
            icon: () => renderIcon(childrenRoute),
          });
        });
        return;
      }
      if (!route.meta?.root) {
        route.children?.forEach((childrenRoute) => {
          if (childrenRoute.meta?.root) {
            authMenu.push({
              label: childrenRoute.meta?.title,
              key: childrenRoute.path,
              icon: () => renderIcon(childrenRoute),
            });
          }
        });
      }
      if (
        !route.meta.root &&
        !route.children?.every((item) => item.meta?.root)
      ) {
        authMenu.push({
          label: route.meta.title,
          key: route.path,
          icon: () => renderIcon(route),
          children: route.children ? routes2Menu(route.children) : undefined,
        });
      }
    }
  });
  return authMenu;
};
const renderIcon = (icon?: RouteRecordRaw) => {
  const iconComponent = icon?.meta?.icon;
  return iconComponent
    ? h(NIcon, null, { default: () => h(iconComponent) })
    : undefined;
};
export const keepAliveName = (routes: RouteRecordRaw[]) => {
  const keepAliveNames: string[] = [];
  routes.forEach((route) => {
    if (route.meta?.keepAlive && route.name)
      keepAliveNames.push(route.name as string);
    if (route.children) keepAliveNames.push(...keepAliveName(route.children));
  });
  return keepAliveNames;
};
