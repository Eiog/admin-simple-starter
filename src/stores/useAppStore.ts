import { defineStore } from 'pinia';
export const useAppStore = defineStore(
  'appStore',
  () => {
    const darkMode = ref(false);
    const themePanelShow = ref(false);
    const language = ref<'zh_cn' | 'en_us'>('zh_cn');
    const layoutsMode = ref<'vertical' | 'horizontal'>('horizontal');
    const sideCollapsed = ref(false);
    const layouts = ref({
      sider: {
        show: true,
        width: 200,
        collapsedWidth: 60,
      },
      header: {
        show: true,
        fixed: true,
        height: 100,
      },
      footer: {
        show: true,
        fixed: true,
        height: 80,
      },
    });
    return {
      language,
      darkMode,
      themePanelShow,
      layoutsMode,
      sideCollapsed,
      layouts,
    };
  },
  {
    persist: {
      key: '__app__',
      paths: [''],
    },
  },
);
