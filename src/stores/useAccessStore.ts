import { defineStore } from 'pinia'
import type { Component } from 'vue'
import { routes2Menu, verifyAccess, verifyAuth } from './helps'
import routes from '~/routers/routes'

interface Tab {
  title?: string
  path: string
  name?: string
  access?: number[]
  icon?: Component
  keepAlive?: boolean
}
export const useAccessStore = defineStore(
  'accessStore',
  () => {
    const tabs = ref<Tab[]>([])
    const access = ref<number[]>([])
    const authTabs = computed(() => {
      const _tabs: Tab[] = []
      tabs.value.forEach((tab) => {
        if (verifyAccess(tab.access, access.value))
          _tabs.push(tab)
      })
      return _tabs
    })
    const token = ref<string | undefined>()
    const refreshed = ref(false)
    const currentTabPath = ref<string>('/')
    const baseRoutes = ref(routes)
    const authRoutes = computed(() => verifyAuth(routes, access.value))
    const authMenu = computed(() => routes2Menu(authRoutes.value))
    const keepAliveRoute = computed(
      () =>
        tabs.value
          .filter(item => item.keepAlive)
          .map(item => item.name) as string[],
    )
    const userInfo = ref<Access.User | undefined>({
      id: '10000',
      account: 'aman',
      name: '阿满',
      avatar:
        'http://aman-blog-oss.oss-cn-beijing.aliyuncs.com/2022-8-5/20190927103132_ZPTkU-2a8f20438489e4068a057f5e0f5458c0.jpeg',
    })
    const authTabIndex = computed(() =>
      authTabs.value.findIndex(item => item.path === currentTabPath.value),
    )
    const realTabIndex = computed(() =>
      tabs.value.findIndex(item => item.path === currentTabPath.value),
    )
    const setTab = (route: Tab) => {
      currentTabPath.value = route.path
      if (tabs.value?.some(item => item.path === route.path))
        return
      tabs.value?.push(route)
    }
    const routerShow = ref(true)
    const excludeKeepAlive = ref<string | undefined>(undefined)
    const refresh = () => {
      excludeKeepAlive.value = authTabs.value[authTabIndex.value].name
      routerShow.value = false
      nextTick(() => {
        routerShow.value = true
        excludeKeepAlive.value = undefined
      })
    }
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
      authTabIndex,
      realTabIndex,
      currentTabPath,
      setTab,
      authTabs,
      routerShow,
      excludeKeepAlive,
      refresh,
    }
  },
  {
    persist: {
      key: '__access__',
      paths: ['token'],
    },
  },
)
