<template>
  <div
    :class="[
      'bg-white dark:bg-surface-dark rounded-2xl border transition-colors duration-150',
      highlighted
        ? 'border-primary-500/50 bg-primary-50/20 dark:bg-primary-950/20'
        : 'border-neutral-200/90 dark:border-neutral-800 shadow-xs',
      interactive ? 'hover:border-neutral-300 dark:hover:border-neutral-700 cursor-pointer active:scale-[0.99] transition-transform' : '',
      paddingClasses[padding],
      customClass
    ]"
    @click="interactive ? $emit('click', $event) : undefined"
  >
    <!-- Highlighted Banner (optional) -->
    <div
      v-if="highlighted && highlightLabel"
      class="inline-flex items-center gap-1.5 px-2.5 py-0.5 mb-4 rounded-full text-xs font-medium bg-primary-50 text-primary-700 dark:bg-primary-950/70 dark:text-primary-300 border border-primary-200/80 dark:border-primary-800"
    >
      <slot name="highlight-icon">
        <span class="w-1.5 h-1.5 rounded-full bg-primary-500" />
      </slot>
      <span>{{ highlightLabel }}</span>
    </div>

    <!-- Header slot -->
    <div v-if="$slots.header" class="mb-4 pb-3 border-b border-border-light dark:border-border-dark">
      <slot name="header" />
    </div>

    <!-- Main Content -->
    <div>
      <slot />
    </div>

    <!-- Footer slot -->
    <div v-if="$slots.footer" class="mt-4 pt-3 border-t border-border-light dark:border-border-dark">
      <slot name="footer" />
    </div>
  </div>
</template>

<script setup lang="ts">
type CardPadding = 'none' | 'sm' | 'md' | 'lg'

withDefaults(
  defineProps<{
    highlighted?: boolean
    highlightLabel?: string
    interactive?: boolean
    padding?: CardPadding
    customClass?: string
  }>(),
  {
    highlighted: false,
    highlightLabel: '',
    interactive: false,
    padding: 'md',
    customClass: ''
  }
)

defineEmits<{
  (e: 'click', event: MouseEvent): void
}>()

const paddingClasses: Record<CardPadding, string> = {
  none: 'p-0',
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-7 sm:p-8'
}
</script>
