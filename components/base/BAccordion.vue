<template>
  <div class="space-y-2.5">
    <div
      v-for="(item, idx) in items"
      :key="item.id || idx"
      class="bg-white dark:bg-[#13161F] border border-neutral-200/90 dark:border-neutral-800 rounded-2xl overflow-hidden transition-all duration-200 shadow-2xs"
    >
      <button
        type="button"
        class="w-full px-5 py-3.5 text-left flex items-center justify-between gap-3 font-poppins font-semibold text-xs sm:text-sm text-neutral-900 dark:text-white hover:bg-neutral-50/80 dark:hover:bg-neutral-800/40 transition-colors focus:outline-none cursor-pointer"
        @click="toggle(item.id || String(idx))"
      >
        <div class="flex items-center gap-2.5 min-w-0 pr-2">
          <span class="leading-snug">{{ item.title }}</span>
          <span
            v-if="item.badge"
            class="text-[10px] px-2 py-0.5 rounded-full font-bold bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 shrink-0"
          >
            {{ item.badge }}
          </span>
        </div>
        <div
          :class="[
            'w-6 h-6 rounded-full flex items-center justify-center shrink-0 transition-all duration-200 text-neutral-400',
            isOpen(item.id || String(idx))
              ? 'rotate-180 text-[#0081A0] dark:text-[#2091AA] bg-[#0081A0]/10 dark:bg-[#0081A0]/20'
              : 'hover:bg-neutral-100 dark:hover:bg-neutral-800'
          ]"
        >
          <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </button>

      <Transition
        enter-active-class="transition-all duration-200 ease-out"
        enter-from-class="opacity-0 -translate-y-1"
        enter-to-class="opacity-100 translate-y-0"
        leave-active-class="transition-all duration-150 ease-in"
        leave-from-class="opacity-100 translate-y-0"
        leave-to-class="opacity-0 -translate-y-1"
      >
        <div
          v-if="isOpen(item.id || String(idx))"
          class="px-5 pb-4 pt-1 text-xs sm:text-[13px] font-poppins text-neutral-600 dark:text-neutral-300 leading-relaxed border-t border-neutral-100 dark:border-neutral-800/80"
        >
          <p>{{ item.content }}</p>
        </div>
      </Transition>
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
    multiple: true
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

function openAll() {
  openIds.value = props.items.map((item, idx) => item.id || String(idx))
}

function closeAll() {
  openIds.value = []
}

defineExpose({
  openAll,
  closeAll,
  openIds
})
</script>
