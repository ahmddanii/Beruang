<template>
  <div ref="containerRef" class="relative inline-block text-left select-none">
    <!-- Trigger Slot or Default Button -->
    <div @click="toggle">
      <slot name="trigger" :is-open="isOpen">
        <button
          type="button"
          :class="[
            'btn-pill-action group cursor-pointer',
            isOpen ? 'bg-[#E6F4F7]! text-[#156374]! border-[#156374]/30! shadow-2xs' : ''
          ]"
        >
          <span>{{ label }}</span>
          <svg
            :class="['w-3.5 h-3.5 text-neutral-400 dark:text-neutral-500 transition-transform duration-200 shrink-0', isOpen ? 'rotate-180' : '']"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2.2"
          >
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
          'absolute z-40 mt-1.5 w-48 rounded-[8px] bg-white dark:bg-[#18191E] border border-[#CBD5E1] dark:border-neutral-700 p-1.5 shadow-lg focus:outline-none font-poppins text-sm',
          align === 'right' ? 'right-0' : 'left-0'
        ]"
      >
        <slot :close="close">
          <button
            v-for="item in items"
            :key="item.value"
            type="button"
            :class="[
              'w-full flex items-center justify-between px-3 py-2 rounded-[8px] text-sm font-poppins transition-all duration-150 text-left cursor-pointer',
              modelValue === item.value
                ? 'bg-[#E6F4F7] hover:bg-[#D9EEF3] dark:bg-[#156374]/20 dark:hover:bg-[#156374]/30 text-[#156374] dark:text-[#50AABF] font-semibold border border-[#156374]/20 dark:border-[#50AABF]/25 shadow-2xs'
                : 'text-[#64748B] dark:text-neutral-400 font-medium hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100/80 dark:hover:bg-neutral-800/60 border border-transparent'
            ]"
            @click="select(item.value)"
          >
            <span>{{ item.label }}</span>
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
