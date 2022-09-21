import { RouteRecordRaw } from 'vue-router';
import { markRaw } from 'vue';
import DefaultLayout from '~/layouts/DefaultLayout.vue';
const access_test = () => import('~/views/test/access-test.vue');
const form_test = () => import('~/views/test/form-test.vue');
import RiSwordFill from '~icons/ri/sword-fill';
import RiAdminFill from '~icons/ri/admin-fill';
import RiFolderSettingsFill from '~icons/ri/folder-settings-fill';
const routes: RouteRecordRaw[] = [
  {
    path: '/test',
    component: DefaultLayout,
    redirect: '/test/access',
    meta: {
      title: '业务测试',
      description: '/test',
      icon: markRaw(RiSwordFill),
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
        path: '/test/access',
        name: Symbol(access_test.name),
        component: access_test,
        meta: {
          title: '权限测试',
          description: '/test/access',
          icon: markRaw(RiAdminFill),
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
        path: '/test/form',
        name: Symbol(form_test.name),
        component: form_test,
        meta: {
          title: '表格测试',
          description: '/test/form',
          icon: markRaw(RiFolderSettingsFill),
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
