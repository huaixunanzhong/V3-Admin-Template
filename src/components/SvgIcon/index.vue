<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  width?: string
  height?: string
  name: string
  prefix?: string
}
const props = withDefaults(defineProps<Props>(), {
  width: '1em',
  height: '1em',
  prefix: 'icon'
})

const symbolId = computed(() => `#${props.prefix}-${props.name}`)
</script>

<template>
  <svg :style="{ width, height, overflow: 'hidden' }">
    <use :href="symbolId" fill="currentColor" />
  </svg>
</template>
