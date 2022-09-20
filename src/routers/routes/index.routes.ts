import { RouteRecordRaw } from 'vue-router';
import { markRaw } from 'vue';
import DefaultLayout from '~/layouts/DefaultLayout.vue';
import analysis from '~/views/index/analysis.vue';
const console = () => import('~/views/index/console.vue');
import RiCpuFill from '~icons/ri/cpu-fill';
import RiBubbleChartFill from '~icons/ri/bubble-chart-fill';
import RiAppsFill from '~icons/ri/apps-fill';
const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/analysis',
    component: DefaultLayout,
    name: Symbol(DefaultLayout.name),
    meta: {
      title: '首页',
      description: 'home',
      icon: markRaw(RiCpuFill),
      access: 0b0001,
      badge: '',
      show: true,
      sort: 0,
      root: false,
      keepAlive: true,
      requiresAuth: true,
    },
    children: [
      {
        path: '/analysis',
        name: Symbol(analysis.name),
        component: analysis,
        meta: {
          title: '分析页',
          description: 'analysis',
          icon: markRaw(RiBubbleChartFill),
          access: 0b0001,
          badge: '',
          show: true,
          sort: 0,
          root: false,
          keepAlive: true,
          requiresAuth: true,
        },
      },
      {
        path: '/console',
        name: Symbol(console.name),
        component: console,
        meta: {
          title: '控制台',
          description: 'console',
          icon: markRaw(RiAppsFill),
          access: 0b0001,
          badge: '',
          show: true,
          sort: 0,
          root: false,
          keepAlive: true,
          requiresAuth: true,
        },
      },
    ],
  },
];

export default routes;
