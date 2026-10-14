<template>
  <div class="space-y-2">
    <div
      v-for="(item, idx) in items"
      :key="item.id || idx"
      class="bg-white dark:bg-surface-dark border border-neutral-200/90 dark:border-neutral-800 rounded-xl overflow-hidden transition-colors"
    >
      <button
        type="button"
        class="w-full px-4 py-3 text-left flex items-center justify-between gap-3  font-medium text-xs sm:text-sm text-neutral-900 dark:text-neutral-100 hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition-colors focus:outline-none"
        @click="toggle(item.id || String(idx))"
      >
        <div class="flex items-center gap-2">
          <span>{{ item.title }}</span>
          <span
            v-if="item.badge"
            class="text-[10px]  px-1.5 py-0.2 rounded bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300"
          >
            {{ item.badge }}
          </span>
        </div>
        <div
          :class="[
            'w-6 h-6 rounded-md flex items-center justify-center shrink-0 transition-transform duration-150 text-neutral-400',
            isOpen(item.id || String(idx)) ? 'rotate-180 text-primary-500' : ''
          ]"
        >
          <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </button>

      <div
        v-if="isOpen(item.id || String(idx))"
        class="px-4 pb-4 pt-1 text-xs text-neutral-600 dark:text-neutral-300 leading-relaxed border-t border-neutral-100 dark:border-neutral-800 "
      >
        <p>{{ item.content }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

export interface AccordionItem {
  id?: string
  title: string
  content: string
  badge?: string | number
}

const props = withDefaults(
  defineProps<{
    items: AccordionItem[]
    defaultOpenId?: string
    multiple?: boolean
  }>(),
  {
    defaultOpenId: '',
    multiple: false
  }
)

const openIds = ref<string[]>(props.defaultOpenId ? [props.defaultOpenId] : [])

function isOpen(id: string) {
  return openIds.value.includes(id)
}

function toggle(id: string) {
  if (isOpen(id)) {
    openIds.value = openIds.value.filter(item => item !== id)
  } else {
    if (props.multiple) {
      openIds.value.push(id)
    } else {
      openIds.value = [id]
    }
  }
}
</script>
