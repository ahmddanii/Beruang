<template>
  <span
    :class="[
      'inline-flex items-center font-medium transition-colors select-none',
      pill ? 'rounded-full' : 'rounded-lg',
      sizeClasses[size],
      variantClasses[variant],
      customClass
    ]"
  >
    <!-- Status dot -->
    <span
      v-if="dot"
      :class="['rounded-full mr-1.5', dotSizes[size], dotColors[variant]]"
    />

    <slot name="icon" />
    <span><slot /></span>
  </span>
</template>

<script setup lang="ts">
type BadgeVariant = 'success' | 'warning' | 'danger' | 'primary' | 'neutral' | 'gold'
type BadgeSize = 'sm' | 'md' | 'lg'

const props = withDefaults(
  defineProps<{
    variant?: BadgeVariant
    size?: BadgeSize
    pill?: boolean
    dot?: boolean
    customClass?: string
  }>(),
  {
    variant: 'neutral',
    size: 'md',
    pill: true,
    dot: false,
    customClass: ''
  }
)

const sizeClasses: Record<BadgeSize, string> = {
  sm: 'text-xs font-semibold px-2.5 py-0.5 gap-1',
  md: 'text-xs sm:text-sm font-semibold px-3 py-1 gap-1.5',
  lg: 'text-sm sm:text-base font-semibold px-3.5 py-1.5 gap-2'
}

const dotSizes: Record<BadgeSize, string> = {
  sm: 'w-1.5 h-1.5',
  md: 'w-2 h-2',
  lg: 'w-2.5 h-2.5'
}

const variantClasses: Record<BadgeVariant, string> = {
  success: 'bg-emerald-50 text-emerald-700 border border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-800',
  warning: 'bg-amber-50 text-amber-800 border border-amber-200 dark:bg-amber-950/40 dark:text-amber-300 dark:border-amber-800',
  danger: 'bg-red-50 text-red-700 border border-red-200 dark:bg-red-950/40 dark:text-red-300 dark:border-red-800',
  primary: 'bg-primary-50 text-primary-700 border border-primary-200 dark:bg-primary-950/40 dark:text-primary-300 dark:border-primary-800',
  neutral: 'bg-neutral-100 text-neutral-700 border border-neutral-200 dark:bg-neutral-800 dark:text-neutral-300 dark:border-neutral-700',
  gold: 'bg-gold-light text-neutral-900 border border-gold-dark/30 font-semibold shadow-xs'
}

const dotColors: Record<BadgeVariant, string> = {
  success: 'bg-emerald-500',
  warning: 'bg-amber-500',
  danger: 'bg-red-500',
  primary: 'bg-primary-500',
  neutral: 'bg-neutral-400',
  gold: 'bg-gold-dark'
}
</script>
