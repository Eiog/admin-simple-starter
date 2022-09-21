import { RouteRecordRaw } from 'vue-router';
import { markRaw } from 'vue';
import DefaultLayout from '~/layouts/DefaultLayout.vue';
const super_page = () => import('~/views/access-test/super-is-show.vue');
import RiSwordFill from '~icons/ri/sword-fill';
import RiAdminFill from '~icons/ri/admin-fill';
import RiFolderSettingsFill from '~icons/ri/folder-settings-fill';
const routes: RouteRecordRaw[] = [
  {
    path: '/access-test',
    component: DefaultLayout,
    redirect: '/access-test',
    meta: {
      title: '超级权限可见',
      description: '/access-test/super-is-show',
      icon: markRaw(RiSwordFill),
      access: 0b1111,
      badge: '',
      show: true,
      sort: 0,
      root: false,
      keepAlive: true,
      requiresAuth: true,
    },
    children: [
      {
        path: '/access-test/super-is-show',
        name: super_page.name,
        component: super_page,
        meta: {
          title: '超级权限才能看见我',
          description: '超级权限才能看见我',
          icon: markRaw(RiAdminFill),
          access: 0b1111,
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
