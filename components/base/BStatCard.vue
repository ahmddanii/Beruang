<template>
  <component
    :is="to ? NuxtLink : 'div'"
    :to="to"
    :class="[
      'bg-white dark:bg-[#15161A] border border-neutral-200/90 dark:border-neutral-800/90 rounded-2xl p-5 flex flex-col justify-between transition-colors duration-150',
      to ? 'hover:border-neutral-300 dark:hover:border-neutral-700 cursor-pointer active:scale-[0.99] transition-transform' : '',
      customClass
    ]"
  >
    <div>
      <!-- Top Label & Badge/Action -->
      <div class="flex items-start justify-between gap-2 mb-3">
        <span class="text-sm font-sans font-semibold text-neutral-700 dark:text-neutral-200 leading-snug">
          {{ label }}
        </span>
        <div v-if="$slots.badge || badgeText" class="shrink-0">
          <slot name="badge">
            <span
              v-if="badgeText"
              :class="[
                'inline-flex items-center gap-1 text-xs font-sans font-semibold px-2.5 py-0.5 rounded-md border whitespace-nowrap',
                badgeVariantClass
              ]"
            >
              {{ badgeText }}
            </span>
          </slot>
        </div>
      </div>

      <!-- Main Metric Amount -->
      <div class="space-y-1.5">
        <div class="flex flex-wrap items-baseline gap-2">
          <span class="text-2xl sm:text-3xl font-heading font-bold text-neutral-900 dark:text-white tabular-nums tracking-tight leading-tight whitespace-nowrap">
            {{ value }}
          </span>
          <span
            v-if="trend"
            :class="[
              'inline-flex items-center text-xs font-semibold px-2 py-0.5 rounded whitespace-nowrap',
              trendIsPositive ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300' : 'bg-red-50 text-red-700 dark:bg-red-950/60 dark:text-red-300'
            ]"
          >
            {{ trend }}
          </span>
        </div>

        <p v-if="subtitle" class="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 font-sans leading-relaxed">
          {{ subtitle }}
        </p>
      </div>
    </div>

    <!-- Bottom micro-footer / auxiliary metadata (optional) -->
    <div
      v-if="$slots.footer || footerText"
      class="mt-4 pt-3 border-t border-neutral-100 dark:border-neutral-800/80 flex items-center justify-between text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 font-medium gap-2"
    >
      <slot name="footer">
        <span class="leading-normal">{{ footerText }}</span>
        <span v-if="actionText" class="text-primary-600 dark:text-primary-400 font-semibold inline-flex items-center gap-1 shrink-0 whitespace-nowrap">
          {{ actionText }}
          <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </span>
      </slot>
    </div>
  </component>
</template>

<script setup lang="ts">
import { computed, resolveComponent } from 'vue'

const NuxtLink = resolveComponent('NuxtLink')

const props = withDefaults(
  defineProps<{
    label: string
    value: string | number
    subtitle?: string
    trend?: string
    trendIsPositive?: boolean
    badgeText?: string
    badgeVariant?: 'success' | 'warning' | 'primary' | 'neutral' | 'gold'
    footerText?: string
    actionText?: string
    to?: string
    customClass?: string
  }>(),
  {
    subtitle: '',
    trend: '',
    trendIsPositive: true,
    badgeText: '',
    badgeVariant: 'neutral',
    footerText: '',
    actionText: '',
    to: '',
    customClass: ''
  }
)

const badgeVariantClass = computed(() => {
  switch (props.badgeVariant) {
    case 'success':
      return 'bg-emerald-50 text-emerald-700 border-emerald-200/70 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800/60'
    case 'warning':
      return 'bg-amber-50 text-amber-800 border-amber-200/70 dark:bg-amber-950/60 dark:text-amber-300 dark:border-amber-800/60'
    case 'primary':
      return 'bg-primary-50 text-primary-700 border-primary-200/70 dark:bg-primary-950/60 dark:text-primary-300 dark:border-primary-800/60'
    case 'gold':
      return 'bg-amber-100/60 text-amber-900 border-amber-300/80 dark:bg-amber-950/70 dark:text-amber-300'
    default:
      return 'bg-neutral-100 text-neutral-600 border-neutral-200 dark:bg-neutral-800 dark:text-neutral-300 dark:border-neutral-700'
  }
})
</script>
