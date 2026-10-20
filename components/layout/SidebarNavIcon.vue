<template>
  <HugeiconsIcon
    :icon="outlineIcon"
    :size="size"
    :stroke-width="active ? 2.0 : 1.75"
    :class="[
      'transition-colors duration-150 shrink-0',
      extraClass || (active
        ? 'text-[#156374] dark:text-[#50AABF]'
        : 'text-[#64748B] dark:text-neutral-400 group-hover:text-neutral-900 dark:group-hover:text-white')
    ]"
    aria-hidden="true"
  />
</template>

<script setup lang="ts">
import { HugeiconsIcon } from '@hugeicons/vue'

withDefaults(
  defineProps<{
    to?: string
    outlineIcon: any
    active?: boolean
    size?: number
    extraClass?: string
  }>(),
  {
    active: false,
    size: 20,
    extraClass: ''
  }
)
</script>
