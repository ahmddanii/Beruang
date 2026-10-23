<template>
  <component
    :is="to ? NuxtLink : 'div'"
    :to="to"
    class="group relative rounded-2xl border border-neutral-200/90 dark:border-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-700 bg-white dark:bg-[#15161A] p-4 sm:p-5 flex flex-col justify-between cursor-pointer overflow-hidden h-full transition-all duration-150 ease-out"
    style="-webkit-tap-highlight-color: transparent; outline: none;"
    :aria-label="`${label}: ${value}`"
  >
    <!-- 1. CARDS LAYER (KARTU TERSUSUN OTENTIK DI BELAKANG SAKU, HARMONIS DALAM PALET BIRU) -->
    <div class="absolute inset-x-0 top-0 h-36 pointer-events-none z-0 px-3.5 sm:px-4">
      <!-- Kotak Belakang: Diperpanjang lebarnya (w-[94%]), posisi/tinggi diturunkan (mt-5), tanpa shadow -->
      <div
        class="relative mx-auto w-[94%] h-24 rounded-t-xl bg-[#C6DCFE] dark:bg-[#1E2E4A] border border-[#A8C7FA] dark:border-[#2D436B] mt-5"
      />

      <!-- Kotak Depan: Posisi/tinggi diturunkan (top-10), tanpa shadow & tanpa efek hover naik -->
      <div
        class="absolute left-3.5 right-3.5 sm:left-4 sm:right-4 top-10 h-24 rounded-t-xl bg-[#EEF4FF] dark:bg-[#161F30] border border-[#D0E2FF] dark:border-[#243552]"
      />
    </div>

    <!-- 2. FRONT WALLET SLEEVE (SAKU DEPAN DENGAN CHAMFER CUT-OUT YANG TIDAK TERDISTORSI TINGGI KARTU) -->
    <div class="absolute inset-x-0 top-14 bottom-0 pointer-events-none z-10 flex flex-col">
      <!-- Chamfer Top Edge: Fixed height so chamfer does not vertically stretch -->
      <svg
        class="w-full h-8 text-white dark:text-[#15161A] shrink-0"
        viewBox="0 0 320 28"
        preserveAspectRatio="none"
      >
        <!-- Fill Saku Putih -->
        <path
          d="M 0,24 L 42,24 Q 47,24 50,21 L 76,8 Q 80,6 85,6 L 235,6 Q 240,6 244,8 L 270,21 Q 273,24 278,24 L 320,24 L 320,28 L 0,28 Z"
          fill="currentColor"
        />
        <!-- Top Rim Stroke Garis Bibir Saku -->
        <path
          d="M 0,24 L 42,24 Q 47,24 50,21 L 76,8 Q 80,6 85,6 L 235,6 Q 240,6 244,8 L 270,21 Q 273,24 278,24 L 320,24"
          fill="none"
          stroke="currentColor"
          class="text-neutral-200/90 dark:text-neutral-800"
          stroke-width="1.5"
          vector-effect="non-scaling-stroke"
        />
      </svg>
      <!-- Solid Pocket Body: Stretches seamlessly to bottom -->
      <div class="w-full flex-1 bg-white dark:bg-[#15161A] -mt-[1px]" />
    </div>

    <!-- 3. TOP SPACER (MENJAMIN KONSISTENSI STRUKTUR FLEXBOX 1:1 DENGAN BRECEIPTCARD) -->
    <div class="relative w-full h-12 sm:h-14 pointer-events-none" />

    <!-- 4. BOTTOM SECTION: LABEL & VALUE KONSISTEN PERSIS DENGAN CARD LAINNYA -->
    <div class="relative z-20 space-y-1 mt-auto pt-2">
      <!-- Eyebrow: Label "Saldo Kas Toko" -->
      <p class="text-xs sm:text-sm font-sans font-semibold text-neutral-600 dark:text-neutral-300 leading-snug">
        {{ label }}
      </p>

      <!-- Primary Amount: Nominal Proporsional & Tegas Tanpa Terpotong -->
      <div class="flex items-baseline min-w-0">
        <span
          class="text-2xl sm:text-[26px] lg:text-[26px] xl:text-[28px] 2xl:text-[32px] font-heading font-semibold text-neutral-900 dark:text-white tabular-nums tracking-tight leading-none whitespace-nowrap"
        >
          {{ value }}
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
    value?: string
    to?: string
  }>(),
  {
    label: 'Saldo Kas Toko',
    value: 'Rp 75.500.000',
    to: '/dashboard/progres'
  }
)
</script>
