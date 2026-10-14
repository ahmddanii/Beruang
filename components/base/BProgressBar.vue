<template>
  <div class="w-full">
    <!-- Header with label & percentage -->
    <div v-if="label || showPercentage" class="flex justify-between items-center mb-1.5 text-xs font-semibold text-neutral-700 dark:text-neutral-300">
      <span>{{ label }}</span>
      <span v-if="showPercentage" class="tabular-nums ">{{ clampedValue }}%</span>
    </div>

    <!-- Track -->
    <div
      :class="[
        'w-full bg-neutral-200 dark:bg-neutral-800 rounded-full overflow-hidden p-0.5 shadow-inner transition-all',
        heightClasses[size]
      ]"
      role="progressbar"
      :aria-valuenow="clampedValue"
      aria-valuemin="0"
      aria-valuemax="100"
    >
      <!-- Fill bar -->
      <div
        :class="[
          'h-full rounded-full transition-all duration-500 ease-out relative overflow-hidden',
          barVariants[variant]
        ]"
        :style="{ width: `${clampedValue}%` }"
      >
        <!-- Subtle tactile shine reflection -->
        <div class="absolute inset-x-0 top-0 h-1/3 bg-white/30 rounded-full pointer-events-none" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

type ProgressVariant = 'primary' | 'success' | 'warning' | 'gold' | 'danger'
type ProgressSize = 'sm' | 'md' | 'lg' | 'xl'

const props = withDefaults(
  defineProps<{
    value: number
    max?: number
    variant?: ProgressVariant
    size?: ProgressSize
    label?: string
    showPercentage?: boolean
  }>(),
  {
    max: 100,
    variant: 'primary',
    size: 'md',
    label: '',
    showPercentage: false
  }
)

const clampedValue = computed(() => {
  const pct = Math.round((props.value / props.max) * 100)
  return Math.min(100, Math.max(0, pct))
})

const heightClasses: Record<ProgressSize, string> = {
  sm: 'h-2.5',
  md: 'h-4',
  lg: 'h-6',
  xl: 'h-8'
}

const barVariants: Record<ProgressVariant, string> = {
  primary: 'bg-primary-500 shadow-[0_2px_0_0_#0236A6]',
  success: 'bg-success shadow-[0_2px_0_0_#148A58]',
  warning: 'bg-warning shadow-[0_2px_0_0_#D9820B]',
  gold: 'bg-gold shadow-[0_2px_0_0_#B88E00]',
  danger: 'bg-danger shadow-[0_2px_0_0_#D92A2A]'
}
</script>
