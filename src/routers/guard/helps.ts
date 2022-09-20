import NProgress from 'nprogress';
import { RouteLocationNormalized, NavigationGuardNext } from 'vue-router';

/**动态修改title */
export function useChangeTitle(to: RouteLocationNormalized) {
  const title = useTitle();
  const envTitle = import.meta.env.VITE_APP_TITLE || '';
  title.value = (to.meta.title ?? envTitle) as string;
}
/**使用进度条 */
export function useNProgress() {
  /**进度条开始 */
  function start() {
    if (!NProgress.isStarted()) {
      NProgress.start();
    }
  }
  /**进度条结束 */
  function done() {
    NProgress.done();
  }
  return { start, done };
}
export const useTab = (to: RouteLocationNormalized) => {
  if (!to.meta.show) return;
  const { setTab } = useAccessStore();
  setTab({ title: to.meta.title, path: to.path, icon: to.meta.icon });
};
export const useAuth = (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext,
) => {
  const { access, refreshed } = storeToRefs(useAccessStore());
  console.log(from, to);

  if (!refreshed.value && to.meta.requiresAuth) {
    next(`/login?redirect=${to.path}`);
  }
  if (refreshed.value && to.path === '/login') next(from.path);
  if (refreshed.value && to.meta.requiresAuth) {
    if (
      access.value &&
      to.meta.access &&
      verifyAuth(access.value, to.meta.access)
    ) {
      next();
    }
    next(from.path);
  }
  if (!to.meta.requiresAuth) next();
};
const verifyAuth = (access: number, requireAccess: number) =>
  (access & requireAccess) === requireAccess;
const refreshToken = () =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(true);
    }, 5000);
  });
const routerRedirect = (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext,
  token?: string,
  access?: number,
) => {
  if (!token && to.meta.requiresAuth) {
    next('/login');
  }
  if (token && to.path === '/login') {
    next(from.path);
  }
  if (token && to.meta.requiresAuth) {
    if (access && to.meta.access && verifyAuth(access, to.meta.access)) {
      next();
    } else {
      next(from.path);
    }
  }
  if (!to.meta.requiresAuth) {
    next();
  }
};
