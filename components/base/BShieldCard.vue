<template>
  <component
    :is="to ? NuxtLink : 'div'"
    :to="to"
    class="group relative rounded-2xl border border-neutral-200/90 dark:border-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-700 bg-white dark:bg-[#15161A] p-4 sm:p-5 flex flex-col justify-between select-none h-full transition-all duration-150 ease-out active:scale-[0.99] transform-gpu"
    style="-webkit-tap-highlight-color: transparent; outline: none;"
    :aria-label="`${label}: ${targetAmount}`"
  >
    <!-- TOP SECTION: HEADER DENGAN PILLS CEK SYARAT DI POJOK KANAN ATAS -->
    <div class="space-y-3.5">
      <div class="flex items-center justify-between gap-2">
        <span class="text-xs sm:text-sm  font-medium text-neutral-500 dark:text-neutral-400 whitespace-nowrap">
          4 dari 5 Syarat Lengkap
        </span>

        <!-- Cek Syarat dibuat menjadi pills di pojok kanan atas -->
        <span
          class="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs  font-semibold bg-primary-50 text-primary-700 dark:bg-primary-950/70 dark:text-primary-300 border border-primary-200/80 dark:border-primary-800/60 hover:bg-primary-100 dark:hover:bg-primary-900/60 transition-colors whitespace-nowrap cursor-pointer"
        >
          <span>Cek Syarat</span>
          <span class="text-[10px]">→</span>
        </span>
      </div>

      <!-- Single Unified Progress Bar: Satu Kesatuan dengan Gradasi Biru (Kiri Terang -> Kanan Gelap) -->
      <div class="w-full py-0.5">
        <div class="w-full h-3.5 sm:h-4 bg-neutral-100 dark:bg-neutral-800/90 rounded-full overflow-hidden p-0.5 border border-neutral-200/60 dark:border-neutral-700/60">
          <div
            class="h-full rounded-full transition-all duration-300 ease-out"
            :style="{
              width: `${progress}%`,
              background: 'linear-gradient(90deg, #7BB2FF 0%, #0066FF 100%)'
            }"
          />
        </div>
      </div>
    </div>

    <!-- BOTTOM SECTION: KONSISTEN PATOKAN DENGAN CARD LABA BERSIH (LABEL & METRIC BESAR DI BAWAH) -->
    <div class="space-y-1 mt-auto pt-3">
      <!-- Label "Kesiapan Modal" -->
      <p class="text-xs sm:text-sm  font-semibold text-neutral-600 dark:text-neutral-300 leading-snug">
        {{ label }}
      </p>

      <!-- Headline Metric Besar "Rp 250.000.000" (Ukuran Persis Sesuai Card 1 & Card 2) -->
      <div class="flex items-baseline min-w-0">
        <span
          class="text-2xl sm:text-3xl lg:text-[34px] xl:text-[36px] font-heading font-semibold text-neutral-900 dark:text-white tabular-nums tracking-tight leading-none whitespace-nowrap"
        >
          {{ targetAmount }}
        </span>
      </div>
    </div>
  </component>
</template>

<script setup lang="ts">
import { resolveComponent } from 'vue'

const NuxtLink = resolveComponent('NuxtLink')

withDefaults(
  defineProps<{
    label?: string
    targetAmount?: string
    progress?: number
    to?: string
  }>(),
  {
    label: 'Kesiapan Modal',
    targetAmount: 'Rp 250.000.000',
    progress: 80,
    to: '/dashboard/penilaian'
  }
)
</script>
