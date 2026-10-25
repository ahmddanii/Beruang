<template>
  <component
    :is="to ? NuxtLink : 'button'"
    :to="to"
    :type="to ? undefined : type"
    :disabled="disabled || loading"
    :class="[
      'btn-modern inline-flex flex-row items-center justify-center whitespace-nowrap focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500/30 focus-visible:ring-offset-1 transition-all select-none',
      sizeClasses[size],
      variantClasses[variant],
      block ? 'w-full' : '',
      (disabled || loading) ? 'opacity-50 cursor-not-allowed transform-none' : 'cursor-pointer',
      customClass
    ]"
    @click="$emit('click', $event)"
  >
    <!-- Loading spinner -->
    <svg
      v-if="loading"
      class="animate-spin -ml-0.5 mr-2 h-3.5 w-3.5 text-current shrink-0"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="3"></circle>
      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>

    <slot name="icon-left" />
    <span
      class="inline-flex flex-row items-center justify-center gap-2 whitespace-nowrap shrink-0"
      :class="{ 'opacity-0': loading && !showTextOnLoading }"
    >
      <slot />
    </span>
    <slot name="icon-right" />
  </component>
</template>

<script setup lang="ts">
import { resolveComponent } from 'vue'

const NuxtLink = resolveComponent('NuxtLink')

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger' | 'success' | 'gold' | 'outline'
type ButtonSize = 'sm' | 'md' | 'lg' | 'xl'

const props = withDefaults(
  defineProps<{
    variant?: ButtonVariant
    size?: ButtonSize
    type?: 'button' | 'submit' | 'reset'
    to?: string
    disabled?: boolean
    loading?: boolean
    block?: boolean
    showTextOnLoading?: boolean
    customClass?: string
  }>(),
  {
    variant: 'primary',
    size: 'md',
    type: 'button',
    disabled: false,
    loading: false,
    block: false,
    showTextOnLoading: true,
    customClass: ''
  }
)

defineEmits<{
  (e: 'click', event: MouseEvent): void
}>()

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'text-[14px] leading-[20px] font-bold px-4 py-1.5 rounded-full gap-2',
  md: 'text-[16px] leading-[24px] font-bold px-6 py-2 rounded-full gap-2',
  lg: 'text-[16px] leading-[24px] font-bold px-8 py-3 rounded-full gap-2.5',
  xl: 'text-[18px] leading-[24px] font-bold px-10 py-4 rounded-full gap-3'
}

const variantClasses: Record<ButtonVariant, string> = {
  primary: 'bg-primary-500 text-white shadow-xs hover:bg-primary-600 border border-transparent',
  secondary: 'bg-surface-subtle dark:bg-surface-dark text-neutral-800 dark:text-neutral-100 border border-neutral-200/80 dark:border-neutral-800 hover:bg-neutral-100 dark:hover:bg-surface-2-dark',
  outline: 'bg-transparent text-neutral-800 dark:text-neutral-100 border border-neutral-200/90 dark:border-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-800/60',
  ghost: 'bg-transparent text-primary-500 dark:text-primary-400 hover:bg-primary-50 dark:hover:bg-primary-tint border-0',
  danger: 'bg-danger text-white hover:bg-red-600 border border-transparent shadow-xs',
  success: 'bg-success text-white hover:bg-emerald-600 border border-transparent shadow-xs',
  gold: 'bg-gold text-neutral-900 hover:brightness-95 border border-gold-dark/20'
}
</script>
