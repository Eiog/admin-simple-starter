import { RouteRecordRaw } from 'vue-router';
import indexRoutes from './index.routes';
import testRoutes from './test.routes';
const routes: RouteRecordRaw[] = [
  ...indexRoutes,
  ...testRoutes,
  {
    path: '/not-found',
    name: 'not-found',
    component: () => import('~/views/not-found/not-found.vue'),
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/not-found',
  },
];
export default routes;
