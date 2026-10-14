<template>
  <div
    :class="[
      'flex items-start gap-3.5 p-3.5 rounded-xl border transition-all duration-150 select-none cursor-pointer',
      modelValue
        ? 'bg-neutral-50/80 dark:bg-neutral-900/60 border-neutral-200/80 dark:border-neutral-800'
        : 'bg-white dark:bg-neutral-900 border-neutral-200 dark:border-neutral-800 hover:border-primary-300 dark:hover:border-primary-700 shadow-xs hover:shadow-card'
    ]"
    role="checkbox"
    :aria-checked="modelValue"
    tabindex="0"
    @click="toggle"
    @keydown.space.prevent="toggle"
    @keydown.enter.prevent="toggle"
  >
    <!-- Modern Checkbox Box -->
    <div
      :class="[
        'w-5 h-5 rounded-md flex items-center justify-center shrink-0 transition-all duration-150 mt-0.5',
        modelValue
          ? 'bg-emerald-600 text-white shadow-xs'
          : 'border border-border-light dark:border-border-dark bg-white dark:bg-neutral-900 hover:border-primary-400'
      ]"
    >
      <transition
        enter-active-class="transition duration-150 ease-out transform"
        enter-from-class="scale-0 opacity-0"
        enter-to-class="scale-100 opacity-100"
        leave-active-class="transition duration-100 ease-in transform"
        leave-from-class="scale-100 opacity-100"
        leave-to-class="scale-0 opacity-0"
      >
        <svg
          v-if="modelValue"
          class="w-4 h-4 text-white stroke-[3.5]"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <polyline points="20 6 9 17 4 12" />
        </svg>
      </transition>
    </div>

    <!-- Content -->
    <div class="flex-1 min-w-0">
      <div class="flex items-center gap-2 flex-wrap">
        <h4
          :class="[
            'text-sm sm:text-base font-semibold transition-all duration-150',
            modelValue
              ? 'line-through text-neutral-400 dark:text-neutral-500'
              : 'text-neutral-900 dark:text-neutral-100'
          ]"
        >
          {{ title }}
        </h4>
        <span
          v-if="category"
          class="text-xs px-2.5 py-0.5 rounded-full font-medium bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 border border-neutral-200/60 dark:border-neutral-700/60"
        >
          {{ category }}
        </span>
      </div>

      <p
        v-if="description"
        :class="[
          'text-xs sm:text-sm mt-1 leading-relaxed transition-colors',
          modelValue ? 'text-neutral-400 dark:text-neutral-600' : 'text-neutral-600 dark:text-neutral-300'
        ]"
      >
        {{ description }}
      </p>

      <div v-if="dueDate || consultantNote" class="mt-2 flex items-center gap-3 text-xs text-neutral-600 dark:text-neutral-300 font-medium">
        <span v-if="dueDate" class="inline-flex items-center gap-1 ">
          <svg class="w-3.5 h-3.5 text-neutral-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2" stroke-width="2"/>
            <line x1="16" y1="2" x2="16" y2="6" stroke-width="2"/>
            <line x1="8" y1="2" x2="8" y2="6" stroke-width="2"/>
            <line x1="3" y1="10" x2="21" y2="10" stroke-width="2"/>
          </svg>
          {{ dueDate }}
        </span>
        <span v-if="consultantNote" class="italic text-primary-600 dark:text-primary-400">
          Note: {{ consultantNote }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    modelValue: boolean
    title: string
    description?: string
    category?: string
    dueDate?: string
    consultantNote?: string
    disabled?: boolean
  }>(),
  {
    description: '',
    category: '',
    dueDate: '',
    consultantNote: '',
    disabled: false
  }
)

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
  (e: 'change', value: boolean): void
}>()

function toggle() {
  if (props.disabled) return
  const next = !props.modelValue
  emit('update:modelValue', next)
  emit('change', next)
}
</script>
