import type { Router } from 'vue-router'
import { useRouteStore } from '@/stores'

export const setupRouterGuard = (router: Router) => {
  router.beforeEach(async (to, from, next) => {
    console.log(to, from, next)
    const routeStore = useRouteStore()

    const res = await routeStore.generateRoutes()
    console.log(res, 'res')
    next()
  })
}
