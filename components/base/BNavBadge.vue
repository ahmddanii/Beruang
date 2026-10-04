<template>
  <component
    :is="to ? NuxtLink : 'div'"
    :to="to"
    :class="[
      'inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition-all select-none text-xs  font-medium group',
      active
        ? 'text-neutral-900 dark:text-white font-semibold'
        : 'text-neutral-500 dark:text-text-secondary-dark hover:text-neutral-900 dark:hover:text-white'
    ]"
  >
    <span>{{ label }}</span>
    <span
      v-if="count !== undefined && count !== null"
      :class="[
        'text-[10px]  font-bold px-1.5 py-0.2 rounded-md tabular-nums transition-colors',
        active
          ? 'bg-primary-500 text-white'
          : 'bg-primary-100 dark:bg-primary-tint text-primary-600 dark:text-primary-400 group-hover:bg-primary-500 group-hover:text-white'
      ]"
    >
      {{ count }}
    </span>
  </component>
</template>

<script setup lang="ts">
import { resolveComponent } from 'vue'

const NuxtLink = resolveComponent('NuxtLink')

defineProps<{
  label: string
  count?: string | number
  to?: string
  active?: boolean
}>()
</script>
