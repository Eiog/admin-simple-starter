import type { RouteRecordRaw } from 'vue-router'
const routes: RouteRecordRaw[] = [

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
