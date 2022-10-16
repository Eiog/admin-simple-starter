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
  setTab({
    title: to.meta.title,
    name: to.name as string,
    path: to.path,
    access: to.meta.access,
    icon: to.meta.icon,
    keepAlive: to.meta.keepAlive,
  });
};
export const useAuth = (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext,
) => {
  const { access, refreshed } = storeToRefs(useAccessStore());
  if (!refreshed.value && to.meta.requiresAuth)
    return next(`/login?redirect=${to.path}`);

  if (refreshed.value && to.path === '/login') return next(from.path);
  if (refreshed.value && to.meta.requiresAuth) {
    if (
      access.value &&
      to.meta.access &&
      verifyAuth(access.value, to.meta.access)
    )
      return next();
    return next('/no-access');
  }
  if (!to.meta.requiresAuth) return next();
};
const verifyAuth = (access: number, requireAccess: number) =>
  (access & requireAccess) === requireAccess;
