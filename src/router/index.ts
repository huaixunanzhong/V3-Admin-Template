import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'

/** 默认布局 */
const Layout = () => import('@/layout/index.vue')

const constantRoutes: RouteRecordRaw[] = [
  {
    path: '/redirect',
    component: Layout,
    meta: { hidden: true },
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/redirect/index.vue')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index.vue'),
    meta: { hidden: true }
  },
  {
    path: '/:pathMatch(.*)*',
    component: () => import('@/views/error/404.vue'),
    meta: { hidden: true }
  },
  {
    path: '/403',
    component: () => import('@/views/error/403.vue'),
    meta: { hidden: true }
  },
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/home/index.vue'),
    redirect: '/home',
    meta: { hidden: false },
    children: [
      {
        path: '/home',
        component: () => import('@/views/home/index.vue'),
        name: 'HomeIndex',
        meta: {
          title: '首页',
          icon: 'icon-dashboard',
          svgIcon: 'menu-home',
          affix: true,
          hidden: false,
          breadcrumb: false
        }
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_PUBLIC_PATH),
  routes: constantRoutes,
  scrollBehavior: () => ({ left: 0, top: 0 })
})

// setupRouterGuard(router)

/**
 * @description 重置路由
 * @description 动态路由必须带name，否则可能会不能完全重置干净
 */
// export function resetRouter() {
//   try {
//     const routeStore = useRouterStore()
//     routeStore.asyncRoutes.forEach((route) => {
//       const { name } = route
//       if (name) {
//         return router.hasRoute(name) && router.removeRoute(name)
//       }
//     })
//   } catch {
//     // 强制刷新浏览器
//     window.location.reload()
//   }
// }

export default router
