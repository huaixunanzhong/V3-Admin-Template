<script setup lang="ts">
import type { RouteRecordRaw } from 'vue-router'

defineOptions({ name: 'MenuItem' })

interface Props {
  item: RouteRecordRaw
}

const props = withDefaults(defineProps<Props>(), {})

const attrs = useAttrs()

const onlyOneChildren = ref<RouteRecordRaw | null>(null)
const isOneShowChildren = ref(false)
const handleFunction = () => {
  const children = props.item?.children?.length ? props.item.children : []
  const showingChildrens = children.filter((i) => i.meta?.hidden === false)
  if (showingChildrens.length) {
    onlyOneChildren.value = showingChildrens[showingChildrens.length - 1]
  }
  if (showingChildrens.length === 1) {
    isOneShowChildren.value = true
  }
  if (showingChildrens.length === 0) {
    onlyOneChildren.value = {
      ...props.item,
      meta: { ...props.item.meta, noShowingChildren: true }
    } as any
    isOneShowChildren.value = true
  }
}

handleFunction()
</script>

<template>
  <template v-if="!item.meta?.hidden">
    <el-menu-item
      v-if="
        isOneShowChildren &&
        (!onlyOneChildren?.children || onlyOneChildren?.meta?.onShowChildren) &&
        !item?.meta?.alwaysShow
      "
      v-bind="attrs"
      :index="onlyOneChildren?.path"
    >
      <span>{{ onlyOneChildren?.meta?.title }}</span>
    </el-menu-item>
    <el-sub-menu
      v-else
      v-bind="attrs"
      :index="item?.path"
      :title="item?.meta?.title"
    >
      <template #title>
        <span>{{ item?.meta?.title }}</span>
      </template>
      <!--      <el-menu-item-group>-->
      <MenuItem
        v-for="child in item?.children"
        :key="child.path"
        :item="child"
      ></MenuItem>
      <!--      </el-menu-item-group>-->
    </el-sub-menu>
  </template>
</template>

<style scoped></style>
