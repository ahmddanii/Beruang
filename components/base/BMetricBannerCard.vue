<template>
  <div class="flex-1 min-w-0">
    <div class="group relative rounded-2xl card-tactile-gopay has-blue-banner hover:border-neutral-400 dark:hover:border-neutral-600 overflow-hidden flex flex-col justify-between select-none h-full transition-all duration-200">
      <!-- 1. Top: Container Biru untuk Title -->
      <div class="w-full px-4 sm:px-4.5 py-3 card-header-blue-banner flex items-center gap-2 sm:gap-2.5">
        <HugeiconsIcon
          v-if="icon"
          :icon="icon"
          :size="18"
          :stroke-width="2.2"
          class="text-white shrink-0"
        />
        <slot name="icon" />
        <span class="text-[11px] sm:text-xs font-poppins font-semibold uppercase tracking-wider text-white truncate">
          {{ title }}
        </span>
      </div>

      <!-- 2. Bottom: Container Informasi dengan Rounded Corner di Atas -->
      <div class="w-full rounded-t-2xl bg-[#F6F8FA] dark:bg-[#13161F] px-4 sm:px-4.5 pt-4 pb-4.5 sm:pt-4.5 sm:pb-5 flex flex-col gap-3 sm:gap-3.5 flex-1 justify-between overflow-hidden">
        <!-- Middle Value Row -->
        <div>
          <div class="flex items-baseline gap-1.5">
            <span class="text-2xl sm:text-[28px] lg:text-3xl font-poppins font-bold text-neutral-900 dark:text-white tabular-nums tracking-tight leading-tight">
              {{ value }}
            </span>
            <span v-if="unit" class="text-xs sm:text-sm font-medium text-neutral-500 dark:text-neutral-400 font-poppins">
              {{ unit }}
            </span>
          </div>
          <!-- Subtext Row -->
          <div v-if="subtitle || subvalue" class="mt-2 text-[11px] sm:text-xs font-poppins text-neutral-500 dark:text-neutral-400 flex items-center gap-1.5 leading-normal truncate" :title="`${subtitle} ${subvalue}`.trim()">
            <span v-if="subtitle" class="shrink-0">{{ subtitle }}</span>
            <span
              v-if="subvalue"
              :class="[
                'font-semibold tabular-nums truncate',
                subvalueColor === 'green' ? 'text-emerald-600 dark:text-emerald-400' :
                subvalueColor === 'amber' ? 'text-amber-600 dark:text-amber-400' :
                subvalueColor === 'blue' ? 'text-[#0081A0] dark:text-[#2091AA]' :
                'text-neutral-600 dark:text-neutral-300'
              ]"
            >
              {{ subvalue }}
            </span>
          </div>
        </div>

        <!-- Bottom Action Button Row -->
        <div v-if="actionLabel" class="pt-0.5 w-full">
          <NuxtLink
            v-if="to"
            :to="to"
            class="btn-pill-action btn-banner-full group"
          >
            <span class="truncate">{{ actionLabel }}</span>
            <svg class="w-4 h-4 shrink-0 transition-transform group-hover:translate-x-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </NuxtLink>
          <button
            v-else
            type="button"
            class="btn-pill-action btn-banner-full group cursor-pointer"
            @click="$emit('action')"
          >
            <span class="truncate">{{ actionLabel }}</span>
            <svg class="w-4 h-4 shrink-0 transition-transform group-hover:translate-x-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { HugeiconsIcon } from '@hugeicons/vue'

withDefaults(
  defineProps<{
    title: string
    icon?: any
    value: string | number
    unit?: string
    subtitle?: string
    subvalue?: string
    subvalueColor?: 'green' | 'amber' | 'blue' | 'neutral'
    actionLabel?: string
    to?: string
  }>(),
  {
    icon: undefined,
    unit: '',
    subtitle: '',
    subvalue: '',
    subvalueColor: 'green',
    actionLabel: '',
    to: ''
  }
)

defineEmits<{
  (e: 'action'): void
}>()
</script>

<style scoped>
.btn-pill-action.btn-banner-full {
  display: flex !important;
  width: 100% !important;
  max-width: 100% !important;
  box-sizing: border-box !important;
  align-items: center !important;
  justify-content: space-between !important;
  padding: 0 0.875rem !important;
  overflow: hidden !important;
}
</style>
