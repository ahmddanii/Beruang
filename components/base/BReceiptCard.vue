<template>
  <div
    class="group relative rounded-2xl border border-neutral-200/90 dark:border-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-700 bg-white dark:bg-[#15161A] p-4 sm:p-5 flex flex-col justify-between select-none h-full transition-all duration-150 ease-out"
    :aria-label="`${label}: ${value}`"
  >
    <!-- TOP SECTION: FINANCIAL VOLATILITY CHART (BERSIH TANPA GRID, DENGAN TITIK PUNCAK BULAT SEMPURNA) -->
    <div class="relative w-full h-16 sm:h-20 overflow-hidden pt-0.5">
      <svg
        viewBox="0 0 280 64"
        preserveAspectRatio="none"
        class="w-full h-full overflow-visible"
      >
        <defs>
          <linearGradient id="volatilityProfitGradBlue" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#0066FF" stop-opacity="0.18" />
            <stop offset="100%" stop-color="#0066FF" stop-opacity="0.00" />
          </linearGradient>
        </defs>

        <!-- Area Fill Under Volatility Path -->
        <path
          d="M 5,46 L 14,42 L 22,45 L 30,40 L 38,44 L 46,48 L 55,41 L 64,43 L 72,38 L 80,42 L 89,39 L 98,43 L 107,37 L 116,41 L 125,36 L 134,40 L 143,35 L 152,38 L 162,32 L 171,35 L 180,28 L 190,31 L 200,24 L 210,27 L 220,20 L 230,22 L 240,16 L 248,19 L 256,12 L 264,14 L 272,8 L 275,10 L 275,64 L 5,64 Z"
          fill="url(#volatilityProfitGradBlue)"
        />

        <!-- Realistic Financial Volatility Curve Line -->
        <path
          d="M 5,46 L 14,42 L 22,45 L 30,40 L 38,44 L 46,48 L 55,41 L 64,43 L 72,38 L 80,42 L 89,39 L 98,43 L 107,37 L 116,41 L 125,36 L 134,40 L 143,35 L 152,38 L 162,32 L 171,35 L 180,28 L 190,31 L 200,24 L 210,27 L 220,20 L 230,22 L 240,16 L 248,19 L 256,12 L 264,14 L 272,8 L 275,10"
          fill="none"
          stroke="#0066FF"
          stroke-width="1.85"
          stroke-linecap="round"
          stroke-linejoin="round"
          vector-effect="non-scaling-stroke"
        />
      </svg>

      <!-- Peak Dot Indicator: Bulat Sempurna (HTML overlay yang tidak terdistorsi aspek rasio SVG) -->
      <div class="absolute right-0.5 top-1 pointer-events-none flex items-center justify-center">
        <span class="relative flex h-2.5 w-2.5">
          <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-60" />
          <span class="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary-600 ring-2 ring-white dark:ring-[#15161A]" />
        </span>
      </div>
    </div>

    <!-- BOTTOM SECTION: LABEL DENGAN PILL INDIKATOR & VALUE METRIK TEGAS -->
    <div class="space-y-1 mt-auto pt-2">
      <!-- Label Row: Label & Pill Indikator -->
      <div class="flex items-center justify-between gap-2">
        <p class="text-xs sm:text-sm font-sans font-semibold text-neutral-600 dark:text-neutral-300 leading-snug">
          {{ label }}
        </p>

        <!-- Pill Indikator: Naik = Hijau; Turun = Merah -->
        <span
          class="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] sm:text-xs font-sans font-semibold border whitespace-nowrap shrink-0 transition-colors shadow-2xs"
          :class="isUp
            ? 'bg-emerald-50 text-emerald-700 border-emerald-200/80 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800/60'
            : 'bg-rose-50 text-rose-700 border-rose-200/80 dark:bg-rose-950/60 dark:text-rose-300 dark:border-rose-800/60'"
        >
          <HugeiconsIcon
            :icon="isUp ? ArrowUp02Icon : ArrowDown02Icon"
            :size="12"
            :stroke-width="2.5"
            class="shrink-0"
          />
          <span class="tabular-nums">{{ badgeText }}</span>
        </span>
      </div>

      <!-- Headline Metric Besar -->
      <div class="flex items-baseline min-w-0">
        <span
          class="text-2xl sm:text-[26px] lg:text-[26px] xl:text-[28px] 2xl:text-[32px] font-heading font-semibold text-neutral-900 dark:text-white tabular-nums tracking-tight leading-none whitespace-nowrap"
        >
          {{ value }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { HugeiconsIcon } from '@hugeicons/vue'
import { ArrowUp02Icon, ArrowDown02Icon } from '@hugeicons/core-free-icons'

const props = withDefaults(
  defineProps<{
    label?: string
    value?: string
    badgeText?: string
    isUp?: boolean
  }>(),
  {
    label: 'Untung Bersih Bulan Ini',
    value: 'Rp 32.600.000',
    badgeText: '32%',
    isUp: true
  }
)
</script>
