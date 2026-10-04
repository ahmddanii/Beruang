<template>
  <div class="flex items-center gap-2 overflow-x-auto pb-2 pt-1 no-scrollbar select-none">
    <div
      v-for="filter in filters"
      :key="filter.id"
      class="relative shrink-0"
    >
      <select
        :value="filter.value"
        class="appearance-none bg-white dark:bg-surface-dark border border-border-light dark:border-border-dark text-neutral-800 dark:text-neutral-200 text-xs font-heading font-medium pl-3.5 pr-8 py-2 rounded-xl hover:border-neutral-400 dark:hover:border-neutral-600 focus:outline-none focus:ring-1 focus:ring-primary-500 cursor-pointer shadow-xs transition-colors"
        @change="$emit('update:filter', { id: filter.id, value: ($event.target as HTMLSelectElement).value })"
      >
        <option
          v-for="opt in filter.options"
          :key="opt.value"
          :value="opt.value"
          class="bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100"
        >
          {{ filter.label }}: {{ opt.label }}
        </option>
      </select>

      <!-- Custom Chevron Down Icon -->
      <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2.5 text-neutral-400">
        <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </div>

    <!-- Active filter clear button (if any filter is active) -->
    <button
      v-if="hasActiveFilter"
      type="button"
      class="shrink-0 text-xs font-heading font-medium text-neutral-400 hover:text-danger px-2.5 py-1.5 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
      @click="$emit('reset')"
    >
      Reset Filter
    </button>
  </div>
</template>

<script setup lang="ts">
export interface FilterOption {
  label: string
  value: string
}

export interface FilterItem {
  id: string
  label: string
  value: string
  options: FilterOption[]
}

defineProps<{
  filters: FilterItem[]
  hasActiveFilter?: boolean
}>()

defineEmits<{
  (e: 'update:filter', payload: { id: string; value: string }): void
  (e: 'reset'): void
}>()
</script>
