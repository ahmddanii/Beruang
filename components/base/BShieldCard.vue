<template>
  <component
    :is="to ? NuxtLink : 'div'"
    :to="to"
    class="group relative rounded-2xl border border-neutral-200/90 dark:border-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-700 bg-white dark:bg-[#15161A] p-4 sm:p-5 flex flex-col justify-between h-full transition-all duration-150 ease-out"
    style="-webkit-tap-highlight-color: transparent; outline: none;"
    :aria-label="`${label}: ${targetAmount}`"
  >
    <!-- TOP SECTION: HEADER DENGAN PILLS CEK SYARAT DI POJOK KANAN ATAS (PLAFON TERBUKA DIHAPUS) -->
    <div class="space-y-3">
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

      <!-- Segmented Pills: Warna Biru Platform (Makin Ke Kanan Makin Gelap, Kiri Terang) -->
      <div class="flex items-center gap-[3px] sm:gap-1 w-full py-0.5">
        <div
          v-for="i in totalTicks"
          :key="i"
          class="flex-1 h-5 sm:h-5.5 rounded-full transition-colors duration-150"
          :class="i > filledTicks ? 'bg-neutral-200/70 dark:bg-neutral-800' : ''"
          :style="getPillStyle(i)"
        />
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
          class="text-2xl sm:text-[25px] lg:text-[26px] xl:text-[28px]  font-black text-neutral-900 dark:text-white tabular-nums tracking-tight leading-none whitespace-nowrap"
        >
          {{ targetAmount }}
        </span>
      </div>
    </div>
  </component>
</template>

<script setup lang="ts">
import { computed, resolveComponent } from 'vue'

const NuxtLink = resolveComponent('NuxtLink')

const props = withDefaults(
  defineProps<{
    label?: string
    targetAmount?: string
    progress?: number
    to?: string
    totalTicks?: number
  }>(),
  {
    label: 'Kesiapan Modal',
    targetAmount: 'Rp 250.000.000',
    progress: 80,
    to: '/dashboard/penilaian',
    totalTicks: 28
  }
)

const filledTicks = computed(() => {
  return Math.round((props.progress / 100) * props.totalTicks)
})

// Gradasi per pill warna biru platform: kiri terang (light blue) makin ke kanan makin gelap (deep royal blue)
function getPillStyle(i: number) {
  if (i > filledTicks.value) {
    return {}
  }
  // Lightness dari 76% (terang di kiri) menurun ke 36% (gelap di kanan), hue 218 (biru platform)
  const factor = (i - 1) / Math.max(1, filledTicks.value - 1)
  const lightness = 76 - factor * 40
  return {
    backgroundColor: `hsl(218, 92%, ${lightness.toFixed(1)}%)`
  }
}
</script>
