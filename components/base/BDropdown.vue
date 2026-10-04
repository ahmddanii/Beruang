<template>
  <div ref="containerRef" class="relative inline-block text-left select-none">
    <!-- Trigger Slot or Default Button -->
    <div @click="toggle">
      <slot name="trigger" :is-open="isOpen">
        <button
          type="button"
          class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-neutral-200/90 dark:border-neutral-800 bg-white dark:bg-neutral-900 text-xs font-heading font-medium text-neutral-700 dark:text-neutral-200 hover:bg-neutral-50 dark:hover:bg-neutral-800/80 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500/20 active:scale-[0.96]"
        >
          <span>{{ label }}</span>
          <svg class="w-3.5 h-3.5 text-neutral-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </slot>
    </div>

    <!-- Dropdown Menu Panel -->
    <transition
      enter-active-class="transition duration-100 ease-out"
      enter-from-class="transform scale-95 opacity-0"
      enter-to-class="transform scale-100 opacity-100"
      leave-active-class="transition duration-75 ease-in"
      leave-from-class="transform scale-100 opacity-100"
      leave-to-class="transform scale-95 opacity-0"
    >
      <div
        v-if="isOpen"
        :class="[
          'absolute z-40 mt-1.5 w-48 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200/90 dark:border-neutral-800 p-1 shadow-dropdown focus:outline-none',
          align === 'right' ? 'right-0' : 'left-0'
        ]"
      >
        <slot :close="close">
          <button
            v-for="item in items"
            :key="item.value"
            type="button"
            :class="[
              'w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-heading font-medium transition-colors text-left',
              modelValue === item.value
                ? 'bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-white'
                : 'text-neutral-600 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-800/60'
            ]"
            @click="select(item.value)"
          >
            <span>{{ item.label }}</span>
            <svg
              v-if="modelValue === item.value"
              class="w-3.5 h-3.5 text-primary-500"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2.5"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </button>
        </slot>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

export interface DropdownItem {
  label: string
  value: string | number
}

const props = withDefaults(
  defineProps<{
    label?: string
    items?: DropdownItem[]
    modelValue?: string | number
    align?: 'left' | 'right'
  }>(),
  {
    label: 'Pilih',
    items: () => [],
    modelValue: '',
    align: 'right'
  }
)

const emit = defineEmits<{
  (e: 'update:modelValue', value: string | number): void
  (e: 'select', value: string | number): void
}>()

const isOpen = ref(false)
const containerRef = ref<HTMLElement | null>(null)

function toggle() {
  isOpen.value = !isOpen.value
}

function close() {
  isOpen.value = false
}

function select(val: string | number) {
  emit('update:modelValue', val)
  emit('select', val)
  close()
}

function handleClickOutside(event: MouseEvent) {
  if (containerRef.value && !containerRef.value.contains(event.target as Node)) {
    close()
  }
}

function handleKeydown(event: KeyboardEvent) {
  if (event.key === 'Escape' && isOpen.value) {
    close()
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
  document.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
  document.removeEventListener('keydown', handleKeydown)
})
</script>
