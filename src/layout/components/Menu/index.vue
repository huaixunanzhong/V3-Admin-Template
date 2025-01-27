<script setup lang="ts">
import type { RouteRecordRaw } from 'vue-router'
import MenuItem from '@/layout/components/Menu/MenuItem.vue'
import { useRouteStore } from '@/stores'
import { computed } from 'vue'

interface Props {
  menus?: RouteRecordRaw[]
}

const props = defineProps<Props>()

const mode = 'vertical'
const route = useRoute()
const routerStore = useRouteStore()

const sideBarRoutes = computed(() => {
  console.log(routerStore.routes)
  return props.menus ? props.menus : routerStore.routes
})
// 当前页激活路径 先从activeMenu入手
const activeMenu = computed(() => {
  const { meta, path } = route
  if (meta?.activeMenu) {
    return meta.activeMenu
  }
  return path
})
</script>

<template>
  <el-menu
    :mode="mode"
    :default-active="activeMenu"
    active-text-color="#ffd04b"
    background-color="#545c64"
    class="el-menu-vertical-demo"
    text-color="#fff"
  >
    <MenuItem
      v-for="(item, index) in sideBarRoutes"
      :key="index"
      :item="item"
    />
  </el-menu>
</template>

<style scoped></style>
