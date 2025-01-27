import type { MockSystemMenuItem } from '../../../mock/_data/_type'
import menuData from '../../../mock/_data/system_menu'

/** 获取用户路由信息 */
export const getUserAsyncRoutes = (): MockSystemMenuItem[] => {
  // return new Promise((resolve) => {
  // setTimeout(() => {
  // resolve(menuData)
  // }, 300)
  // })
  return menuData
}
