import { RouteRecordRaw } from 'vue-router';
import login_page from '~/views/login/login.vue';
const routes: RouteRecordRaw[] = [
  {
    path: '/login',
    component: login_page,
    meta: {
      title: '业务测试',
    },
  },
];

export default routes;
