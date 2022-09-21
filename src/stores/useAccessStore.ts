import { defineStore } from 'pinia';
import routes from '~/routers/routes';
import { verifyAuth, routes2Menu, keepAliveName } from './helps';
import { Component } from 'vue';
type Tab = {
  title: string;
  path: string;
  access: number;
  icon?: Component;
};
export const useAccessStore = defineStore(
  'accessStore',
  () => {
    const baseRoutes = ref(routes);
    const authRoutes = computed(() => verifyAuth(routes, access.value));
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
    const token = ref<string | undefined>();
    const refreshed = ref(true);
    const currentTabPath = ref();
    const currentTabIndex = computed(() =>
      authTabs.value.findIndex((item) => item.path === currentTabPath.value),
    );
    const tabs = ref<Tab[]>([]);
    const authTabs = computed(() => {
      const _tabs: Tab[] = [];
      tabs.value.forEach((tab) => {
        if ((access.value & tab.access) === tab.access) _tabs.push(tab);
      });
      return _tabs;
    });
    const setTab = (route: Tab) => {
      currentTabPath.value = route.path;
      if (tabs.value?.some((item) => item.path === route.path)) return;
      tabs.value?.push(route);
    };

    return {
      baseRoutes,
      authRoutes,
      authMenu,
      keepAliveRoute,
      userInfo,
      access,
      token,
      refreshed,
      tabs,
      currentTabIndex,
      currentTabPath,
      setTab,
      authTabs,
    };
  },
  {
    persist: {
      key: '__access__',
      paths: [''],
    },
  },
);
