import { defineStore } from 'pinia';
import routes from '~/routers/routes';
import { verifyAuth, routes2Menu, keepAliveName } from './helps';
export const useAccessStore = defineStore(
  'accessStore',
  () => {
    const baseRoutes = ref(routes);
    const authRoutes = computed(() =>
      verifyAuth(baseRoutes.value, access.value),
    );
    const authMenu = computed(() => routes2Menu(authRoutes.value));
    const keepAliveRoute = computed(() => keepAliveName(baseRoutes.value));
    const userInfo = ref<Access.User | undefined>({
      id: '10000',
      account: 'aman',
      name: '阿满',
      access: 0b1111,
      role: 'admin',
      avatar:
        'http://aman-blog-oss.oss-cn-beijing.aliyuncs.com/2022-8-5/20190927103132_ZPTkU-2a8f20438489e4068a057f5e0f5458c0.jpeg',
    });
    const access = ref(0b1111);
    return {
      baseRoutes,
      authRoutes,
      authMenu,
      keepAliveRoute,
      userInfo,
      access,
    };
  },
  {
    persist: {
      key: '__access__',
      paths: [''],
    },
  },
);
