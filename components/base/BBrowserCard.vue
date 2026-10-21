<template>
  <div
    :class="[
      'bg-white dark:bg-surface-dark rounded-2xl border border-border-light dark:border-border-dark overflow-hidden transition-all duration-200 shadow-card dark:shadow-card-dark',
      interactive ? 'hover:border-neutral-300 dark:hover:border-neutral-700 hover:shadow-card-hover dark:hover:shadow-card-dark-hover' : ''
    ]"
  >
    <!-- Browser Chrome Header Bar -->
    <div class="px-4 py-2.5 bg-surface-light dark:bg-surface-2-dark border-b border-border-light dark:border-border-dark flex items-center justify-between gap-3 select-none">
      <!-- 3 Mac-style dots -->
      <div class="flex items-center gap-1.5 shrink-0">
        <span class="w-2.5 h-2.5 rounded-full bg-[#FF5F56] border border-[#E0443E]/40" />
        <span class="w-2.5 h-2.5 rounded-full bg-[#FFBD2E] border border-[#DEA123]/40" />
        <span class="w-2.5 h-2.5 rounded-full bg-[#27C93F] border border-[#1AAB29]/40" />
      </div>

      <!-- Address Bar Pill -->
      <div class="flex-1 max-w-xs mx-auto">
        <div class="bg-white dark:bg-surface-dark border border-border-light dark:border-border-dark rounded-lg px-3 py-1 flex items-center justify-center gap-1.5 text-[11px]  text-neutral-500 dark:text-text-secondary-dark truncate">
          <svg class="w-3 h-3 text-neutral-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
          <span class="truncate">{{ url || 'beruang.id/platform' }}</span>
        </div>
      </div>

      <!-- Optional Right Tag / Badge -->
      <div class="shrink-0 text-right min-w-[36px]">
        <slot name="badge">
          <span v-if="badgeText" class="text-[10px]  px-2 py-0.5 rounded-md bg-primary-100 dark:bg-primary-tint text-primary-600 dark:text-primary-400 font-semibold">
            {{ badgeText }}
          </span>
        </slot>
      </div>
    </div>

    <!-- Inner Browser Window Content -->
    <div class="p-5 sm:p-6 bg-white dark:bg-surface-dark">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    url?: string
    badgeText?: string
    interactive?: boolean
  }>(),
  {
    url: 'beruang.id/app',
    badgeText: '',
    interactive: false
  }
)
</script>
