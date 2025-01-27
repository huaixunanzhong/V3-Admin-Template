import type { SystemMenuItem } from '@/apis/system'
import type { RouteRecordRaw } from 'vue-router'
import { getUserAsyncRoutes as getAsyncRoutes } from '@/apis/user'
import { constantRoutes } from '@/router'
import { mapTree, transformPathToName } from '@/utils'
import { cloneDeep } from 'lodash-es'
import { defineStore } from 'pinia'
import { ref } from 'vue'

const Layout = () => import('@/layout/index.vue')

// 匹配views里面所有的.vue文件
const modules = import.meta.glob('@/views/**/*.vue')

/** 加载模块 */
export const loadView = (view: string) => {
  let res
  for (const path in modules) {
    const dir = path.split('views/')[1].split('.vue')[0]
    if (dir === view) {
      res = () => modules[path]()
    }
  }
  return res
}

/** 将component由字符串转成真正的模块 */
const transformComponentView = (component: string) => {
  if (component === 'Layout') {
    return Layout as never
  } else {
    return loadView(component) as never
  }
}

const formatAsyncRoutes = (menus: SystemMenuItem[]) => {
  if (!menus.length) return []
  menus.sort((a, b) => (a?.sort ?? 0) - (b?.sort ?? 0)) // 排序
  const routes = mapTree(menus, (item) => {
    // item.children.sort((a, b) => (a?.sort ?? 0) - (b?.sort ?? 0))
    return {
      path: item.path,
      name: transformPathToName(item.path),
      component: transformComponentView(item.component),
      redirect: item.redirect,
      meta: {
        hidden: item.hidden,
        keepAlive: item.keepAlive,
        title: item.title,
        svgIcon: item.svgIcon,
        icon: item.icon,
        affix: item.affix,
        breadcrumb: item.breadcrumb,
        showInTabs: item.showInTabs,
        activeMenu: item.activeMenu,
        alwaysShow: item.alwaysShow
      }
    }
  })

  return routes as RouteRecordRaw[]
}

const storeSetup = () => {
  const routes = ref<RouteRecordRaw[]>([])
  const asyncRoutes = ref<RouteRecordRaw[]>([])

  const setRoutes = (data: RouteRecordRaw[]) => {
    console.log(data, 'data')
    routes.value = constantRoutes.concat(data)
    asyncRoutes.value = data
  }

  const generateRoutes = (): Promise<RouteRecordRaw[]> => {
    return new Promise((resolve) => {
      const res = getAsyncRoutes()
      const asyncRoutes = formatAsyncRoutes(res as any)
      setRoutes(asyncRoutes)
      const cloneRoutes = cloneDeep(asyncRoutes)
      resolve(cloneRoutes)
    })
  }
  return {
    routes,
    asyncRoutes,
    generateRoutes
  }
}

export const useRouteStore = defineStore('route', storeSetup, {
  persist: true
})
