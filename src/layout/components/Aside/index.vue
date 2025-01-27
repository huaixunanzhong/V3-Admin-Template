<script setup lang="ts">
import Logo from '@/layout/components/Logo/index.vue'
import Menu from '@/layout/components/Menu/index.vue'
</script>

<template>
  <div>
    <Logo />
    <el-scrollbar>
      <Menu />
    </el-scrollbar>
  </div>
</template>

<style scoped></style>
