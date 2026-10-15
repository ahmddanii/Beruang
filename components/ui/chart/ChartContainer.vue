<template>
  <div class="w-full relative">
    <slot />
  </div>
</template>

<script setup lang="ts">
export interface ChartConfigItem {
  label: string
  color: string
}

export type ChartConfig = Record<string, ChartConfigItem>

defineProps<{
  config?: ChartConfig
}>()
</script>
