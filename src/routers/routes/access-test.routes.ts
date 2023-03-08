import type { RouteRecordRaw } from 'vue-router'
import { markRaw } from 'vue'
import layout from '~/layouts/default.vue'
import RiSwordFill from '~icons/ri/sword-fill'
import RiAdminFill from '~icons/ri/admin-fill'
const routes: RouteRecordRaw[] = [
  {
    path: '/access-test',
    component: layout,
    redirect: '/access-test',
    meta: {
      title: '超级权限可见',
      description: '/access-test/super-is-show',
      icon: markRaw(RiSwordFill),
      access: [0, 1, 2, 3],
      keepAlive: true,
      requiresAuth: true,
    },
    children: [
      {
        path: '/access-test/super-is-show',
        name: 'super-is-show',
        component: () => import('~/views/access-test/super-is-show.vue'),
        meta: {
          title: '超级权限才能看见我',
          description: '超级权限才能看见我',
          icon: markRaw(RiAdminFill),
          access: [3],
          keepAlive: true,
          requiresAuth: true,
        },
      },
    ],
  },
]

export default routes
