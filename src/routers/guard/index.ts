import type { Router } from 'vue-router'
import { useAuth, useChangeTitle, useNProgress, useTab } from './helps'
const useGuard = (router: Router) => {
  const { start, done } = useNProgress()
  router.beforeEach((to, from, next) => {
    start()
    useTab(to)
    useAuth(to, from, next)
  })
  router.afterEach((to) => {
    useChangeTitle(to)
    done()
  })
}
export default useGuard
