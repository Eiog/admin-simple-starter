import type { RouteRecordRaw } from 'vue-router'
import indexRoutes from './index.routes'
import textRoutes from './test.routes'
import accessRoutes from './access-test.routes'
import loginRoutes from './login.routes'

const routes: RouteRecordRaw[] = [
  ...indexRoutes,
  ...textRoutes,
  ...accessRoutes,
  ...loginRoutes,
  {
    path: '/not-found',
    name: 'not-found',
    component: () => import('~/views/error-page/not-found.vue'),
  },
  {
    path: '/no-access',
    name: 'no-access',
    component: () => import('~/views/error-page/no-access.vue'),
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/not-found',
  },
]
export default routes
