import { RouteRecordRaw } from 'vue-router';
import DefaultLayout from '~/layouts/DefaultLayout.vue';
import analysis from '~/views/index/analysis.vue';
const console = () => import('~/views/index/console.vue');
const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/analysis',
    component: DefaultLayout,
    meta: {
      title: '首页',
      description: '',
      icon: '',
      access: '',
      badge: '',
      show: true,
      sort: 0,
      root: false,
    },
    children: [
      {
        path: '/analysis',
        name: analysis.name,
        component: analysis,
        meta: {
          title: '分析页',
          icon: '',
          access: '',
          badge: '',
        },
      },
      {
        path: '/console',
        name: console.name,
        component: console,
        meta: {
          title: '控制台',
          icon: '',
          access: '',
          badge: '',
        },
      },
    ],
  },
];

export default routes;
