<template>
  <div
    class="group relative rounded-2xl border border-neutral-200/90 dark:border-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-700 bg-white dark:bg-[#15161A] p-4 sm:p-5 flex flex-col justify-between select-none h-full transition-all duration-150 ease-out active:scale-[0.99] transform-gpu"
    :aria-label="`${label}: ${value}`"
  >
    <!-- TOP SECTION: FINANCIAL VOLATILITY CHART (WARNA BIRU PLATFORM BERUANG) -->
    <div class="relative w-full h-14 sm:h-16 overflow-hidden pt-0.5">
      <svg
        viewBox="0 0 280 64"
        preserveAspectRatio="none"
        class="w-full h-full overflow-visible"
      >
        <defs>
          <linearGradient id="volatilityProfitGradBlue" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#0066FF" stop-opacity="0.22" />
            <stop offset="100%" stop-color="#0066FF" stop-opacity="0.00" />
          </linearGradient>
        </defs>

        <!-- 3 Horizontal Faint Dashed Grid Lines -->
        <g stroke="currentColor" class="text-neutral-200/80 dark:text-neutral-800" stroke-dasharray="3 3" stroke-width="1">
          <line x1="0" y1="16" x2="280" y2="16" />
          <line x1="0" y1="34" x2="280" y2="34" />
          <line x1="0" y1="52" x2="280" y2="52" />
        </g>

        <!-- Area Fill Under Volatility Path (Biru Platform) -->
        <path
          d="M 5,34 L 12,30 L 18,38 L 25,33 L 32,42 L 38,50 L 45,35 L 52,33 L 58,44 L 65,35 L 72,40 L 78,38 L 84,32 L 90,36 L 98,27 L 105,27 L 109,6 L 112,18 L 116,36 L 119,30 L 122,35 L 125,26 L 127,62 L 130,22 L 133,36 L 136,25 L 142,28 L 150,28 L 155,48 L 161,50 L 168,43 L 174,48 L 182,38 L 189,40 L 197,42 L 204,46 L 212,35 L 219,38 L 226,34 L 234,42 L 242,39 L 250,34 L 258,38 L 266,35 L 275,38 L 275,64 L 5,64 Z"
          fill="url(#volatilityProfitGradBlue)"
        />

        <!-- Realistic Financial Volatility Curve Line (Biru Platform #0066FF) -->
        <path
          d="M 5,34 L 12,30 L 18,38 L 25,33 L 32,42 L 38,50 L 45,35 L 52,33 L 58,44 L 65,35 L 72,40 L 78,38 L 84,32 L 90,36 L 98,27 L 105,27 L 109,6 L 112,18 L 116,36 L 119,30 L 122,35 L 125,26 L 127,62 L 130,22 L 133,36 L 136,25 L 142,28 L 150,28 L 155,48 L 161,50 L 168,43 L 174,48 L 182,38 L 189,40 L 197,42 L 204,46 L 212,35 L 219,38 L 226,34 L 234,42 L 242,39 L 250,34 L 258,38 L 266,35 L 275,38"
          fill="none"
          stroke="#0066FF"
          stroke-width="1.85"
          stroke-linecap="round"
          stroke-linejoin="round"
          vector-effect="non-scaling-stroke"
        />

        <!-- Peak Dot Indicator di Puncak Spike -->
        <circle cx="109" cy="6" r="4" fill="#0066FF" opacity="0.3" />
        <circle cx="109" cy="6" r="2.2" fill="#0066FF" />
      </svg>
    </div>

    <!-- BOTTOM SECTION: TEKS DI BAWAH & MARGIN UP DI SAMPING ANGKA BESAR -->
    <div class="space-y-1 mt-auto pt-3">
      <!-- Label "Laba Bersih Bulan Ini" -->
      <p class="text-xs sm:text-sm  font-semibold text-neutral-600 dark:text-neutral-300 leading-snug">
        {{ label }}
      </p>

      <!-- Headline Metric Besar + Margin Up di Samping Angka -->
      <div class="flex items-baseline gap-1.5 sm:gap-2 min-w-0">
        <span
          class="text-2xl sm:text-[25px] lg:text-[26px] xl:text-[28px]  font-black text-neutral-900 dark:text-white tabular-nums tracking-tight leading-none whitespace-nowrap"
        >
          {{ value }}
        </span>

        <!-- Margin Up di Samping Angka Besar (Bukan Berupa Pills Mengambang) -->
        <span class="inline-flex items-center gap-0.5 sm:gap-1 text-[11px] sm:text-xs xl:text-sm  font-bold text-primary-600 dark:text-primary-400 whitespace-nowrap shrink-0">
          <svg class="w-3 h-3 sm:w-3.5 sm:h-3.5 stroke-[2.5]" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
          </svg>
          <span>{{ badgeText }}</span>
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    label?: string
    value?: string
    badgeText?: string
  }>(),
  {
    label: 'Laba Bersih Bulan Ini',
    value: 'Rp 32.600.000',
    badgeText: 'Margin Up 32%'
  }
)
</script>
