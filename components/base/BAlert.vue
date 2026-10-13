<template>
  <div
    v-if="visible"
    :class="[
      'rounded-2xl p-4 border transition-all duration-300 flex items-start gap-3.5',
      variantClasses[variant],
      customClass
    ]"
    role="alert"
  >
    <!-- Icon or Mascot badge -->
    <div class="shrink-0 mt-0.5">
      <!-- AI Anomaly Special Icon -->
      <div
        v-if="variant === 'ai-anomaly'"
        class="w-9 h-9 rounded-xl bg-warning/20 text-warning-dark border border-warning/40 flex items-center justify-center font-bold text-sm"
      >
        <svg class="w-5 h-5 text-warning-dark" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      </div>

      <slot v-else name="icon">
        <div :class="['w-8 h-8 rounded-xl flex items-center justify-center', iconBg[variant]]">
          <!-- Success -->
          <svg v-if="variant === 'success'" class="w-4 h-4 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7" />
          </svg>
          <!-- Warning -->
          <svg v-else-if="variant === 'warning'" class="w-4 h-4 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <!-- Danger -->
          <svg v-else-if="variant === 'danger'" class="w-4 h-4 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <!-- Info -->
          <svg v-else class="w-4 h-4 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
      </slot>
    </div>

    <!-- Content -->
    <div class="flex-1 min-w-0">
      <div class="flex items-center gap-2 mb-0.5">
        <h4 class=" font-semibold text-sm text-neutral-900 dark:text-neutral-100">
          {{ title }}
        </h4>
        <span
          v-if="variant === 'ai-anomaly'"
          class="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-warning-light text-warning-dark border border-warning/30"
        >
          AI Anomaly Alert
        </span>
      </div>

      <div class="text-xs text-neutral-600 dark:text-neutral-300 leading-relaxed">
        <slot>
          {{ message }}
        </slot>
      </div>

      <!-- Action buttons -->
      <div v-if="$slots.action" class="mt-2.5 flex items-center gap-2">
        <slot name="action" />
      </div>
    </div>

    <!-- Dismiss button -->
    <button
      v-if="dismissible"
      type="button"
      class="text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200 transition-colors p-1"
      @click="dismiss"
    >
      <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
      </svg>
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

type AlertVariant = 'info' | 'success' | 'warning' | 'danger' | 'ai-anomaly'

const props = withDefaults(
  defineProps<{
    title: string
    message?: string
    variant?: AlertVariant
    dismissible?: boolean
    customClass?: string
  }>(),
  {
    message: '',
    variant: 'info',
    dismissible: true,
    customClass: ''
  }
)

const emit = defineEmits<{
  (e: 'dismiss'): void
}>()

const visible = ref(true)

function dismiss() {
  visible.value = false
  emit('dismiss')
}

const variantClasses: Record<AlertVariant, string> = {
  info: 'bg-primary-50/70 border-primary-200 dark:bg-primary-950/30 dark:border-primary-800',
  success: 'bg-emerald-50/70 border-emerald-200 dark:bg-emerald-950/30 dark:border-emerald-800',
  warning: 'bg-amber-50/70 border-amber-200 dark:bg-amber-950/30 dark:border-amber-800',
  danger: 'bg-red-50/70 border-red-200 dark:bg-red-950/30 dark:border-red-800',
  'ai-anomaly': 'bg-gradient-to-r from-amber-50 to-orange-50/80 border-amber-300 dark:from-neutral-900 dark:to-neutral-900 dark:border-amber-700/70 shadow-sm'
}

const iconBg: Record<AlertVariant, string> = {
  info: 'bg-primary-100 dark:bg-primary-900',
  success: 'bg-emerald-100 dark:bg-emerald-900',
  warning: 'bg-amber-100 dark:bg-amber-900',
  danger: 'bg-red-100 dark:bg-red-900',
  'ai-anomaly': 'bg-warning-light'
}
</script>
