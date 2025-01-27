<script setup lang="ts">
import Aside from '@/layout/components/Aside/index.vue'
import Header from '@/layout/components/Header/index.vue'
import Main from '@/layout/components/Main/index.vue'
</script>

<template>
  <div class="common-layout">
    <el-container>
      <Aside />
      <el-container>
        <Header />
        <Main />
      </el-container>
    </el-container>
  </div>
</template>

<style scoped></style>
