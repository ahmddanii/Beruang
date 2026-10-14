<template>
  <div class="inline-flex items-center p-1 rounded-xl bg-neutral-100 dark:bg-neutral-800/80 border border-neutral-200/60 dark:border-neutral-700/60 select-none">
    <button
      v-for="tab in tabs"
      :key="tab.id"
      type="button"
      :class="[
        'px-3.5 sm:px-4 py-2 rounded-lg text-xs sm:text-sm  font-semibold transition-all duration-150 inline-flex items-center gap-2 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500/30 active:scale-[0.96] whitespace-nowrap shrink-0',
        modelValue === tab.id
          ? 'bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white shadow-xs'
          : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
      ]"
      @click="$emit('update:modelValue', tab.id)"
    >
      <span>{{ tab.label }}</span>
      <span
        v-if="tab.count !== undefined"
        :class="[
          'text-xs px-2 py-0.5 rounded-md  font-semibold transition-colors',
          modelValue === tab.id
            ? 'bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-white font-bold'
            : 'bg-neutral-200/70 dark:bg-neutral-700/70 text-neutral-700 dark:text-neutral-300'
        ]"
      >
        {{ tab.count }}
      </span>
    </button>
  </div>
</template>

<script setup lang="ts">
export interface PillTabItem {
  id: string
  label: string
  count?: number | string
}

defineProps<{
  tabs: PillTabItem[]
  modelValue: string
}>()

defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()
</script>
