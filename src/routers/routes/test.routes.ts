import { RouteRecordRaw } from 'vue-router';
import DefaultLayout from '~/layouts/DefaultLayout.vue';
const access_test = () => import('~/views/test/access-test.vue');
const form_test = () => import('~/views/test/form-test.vue');
const routes: RouteRecordRaw[] = [
  {
    path: '/test',
    component: DefaultLayout,
    redirect: '/test/access',
    meta: {
      title: '业务测试',
      icon: '',
      access: '',
      badge: '',
    },
    children: [
      {
        path: '/test/access',
        name: access_test.name,
        component: access_test,
        meta: {
          title: '权限测试',
          icon: '',
          access: '',
          badge: '',
        },
      },
      {
        path: '/test/form',
        name: form_test.name,
        component: form_test,
        meta: {
          title: '表格测试',
          icon: '',
          access: '',
          badge: '',
        },
      },
    ],
  },
];

export default routes;
