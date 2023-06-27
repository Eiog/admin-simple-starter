import type { RouteRecordRaw } from 'vue-router'
import login_page from '~/views/login/login.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/login',
    component: login_page,
    meta: {
      title: '登录',
      hidden: true,
    },
  },
]

export default routes
