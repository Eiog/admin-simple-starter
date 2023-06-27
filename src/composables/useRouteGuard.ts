import type { Router } from 'vue-router'

export function useRouteGuard(router: Router) {
  const { start, done } = useNProgress()
  router.beforeEach((to, from, next) => {
    start()
    useRouteTab(to)
    useRouteAuth(to, from, next)
  })
  router.afterEach((to) => {
    useChangeTitle(to)
    done()
  })
}
