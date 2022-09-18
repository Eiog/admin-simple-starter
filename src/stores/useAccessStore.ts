import { defineStore } from 'pinia';
import routes from '~/routers/routes';
export const useAccessStore = defineStore(
  'accessStore',
  () => {
    const baseRoutes = ref(routes);
    return {
      baseRoutes,
    };
  },
  {
    persist: {
      key: '__access__',
      paths: [''],
    },
  },
);
