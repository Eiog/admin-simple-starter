import { Router } from 'vue-router';
import { useNProgress, useChangeTitle, useTab, useAuth } from './helps';
const useGuard = (router: Router) => {
  const { start, done } = useNProgress();
  router.beforeEach((to, from, next) => {
    start();
    useTab(to);
    useAuth(to, from, next);
  });
  router.afterEach((to, from) => {
    useChangeTitle(to);
    done();
  });
};
export default useGuard;
