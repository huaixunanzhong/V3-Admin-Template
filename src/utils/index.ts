import { isExternal } from '@/utils/validate'
import { camelCase, map, upperFirst } from 'lodash-es'

interface TreeNode {
  [key: string]: any // 允许任意属性
  children?: TreeNode[] // 子节点是可选的
}

/**
 * @desc 遍历树形结构数据，并对每个节点进行映射操作
 * @param treeData 树数据
 * @param iterate 映射函数
 * @param options 选项，默认children
 */
export const mapTree = (
  treeData: TreeNode[],
  iterate: (item: TreeNode) => TreeNode,
  options = { children: 'children' }
) => {
  const { children } = options
  return map(treeData, (item) => {
    console.log(item, 'newItem')
    const newItem = iterate(item)
    if (item[children] && item[children].length > 0) {
      newItem[children] = mapTree(item[children], iterate, options)
    }
    return newItem
  })
}

/**
 * @description 动态路由 path 转 name
 * @demo /system => System
 * @demo /system/menu => SystemMenu
 * @demo /data-manage/detail => DataManageDetail
 */
export const transformPathToName = (path: string) => {
  if (!path) return ''
  if (isExternal) return ''
  return upperFirst(camelCase(path))
}
