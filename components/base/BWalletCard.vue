<template>
  <component
    :is="to ? NuxtLink : 'div'"
    :to="to"
    class="group relative rounded-2xl border border-neutral-200/90 dark:border-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-700 bg-white dark:bg-[#15161A] flex flex-col justify-between cursor-pointer overflow-hidden select-none h-full transition-colors duration-150"
    style="-webkit-tap-highlight-color: transparent; outline: none;"
    :aria-label="`${label}: ${value}`"
  >
    <!-- TOP WALLET INTERIOR (2 KARTU TERSUSUN OTENTIK DI DALAM SAKU DOMPET) -->
    <div class="relative w-full h-15 sm:h-16 pt-1 sm:pt-1.5 overflow-hidden pointer-events-none">
      <!-- 1. Kotak Belakang: Kotak Biru di Belakangnya (Lebih lebar tapi tidak sama dengan kotak putih) -->
      <div
        class="mx-auto w-[88%] sm:w-[90%] h-14 rounded-t-xl border border-b-0 border-[#AFD0F8] dark:border-[#274070] bg-[#C8DCFB] dark:bg-[#1D2F54]"
      />

      <!-- 2. Kotak Depan: Diturunkan sedikit & tingginya diturunkan sesuai instruksi user -->
      <div
        class="absolute left-2.5 right-2.5 sm:left-3 sm:right-3 top-5 sm:top-5.5 h-9 sm:h-10 rounded-t-xl border border-b-0 border-[#CFE1FC] dark:border-[#22355C] bg-[#F3F7FE] dark:bg-[#16233E] z-2"
      />
    </div>

    <!-- FRONT WALLET SLEEVE / POCKET (BAGIAN DEPAN DOMPET DENGAN SILUET BENTUK DOMPET ASLI) -->
    <div class="relative z-10 -mt-4 sm:-mt-4.5 flex-1 flex flex-col justify-end min-h-[105px] sm:min-h-[110px]">
      <!-- SVG Silhouette Cover Dompet Putih (Konsisten dengan background putih card lainnya) -->
      <svg
        class="absolute inset-0 w-full h-full pointer-events-none select-none text-white dark:text-[#15161A]"
        viewBox="0 0 320 160"
        preserveAspectRatio="none"
      >
        <!-- Fill Shape Cover Putih: Rendah di sisi kiri (y=16), melengkung halus naik ke plateau tengah (y=6), datar di tengah, melengkung turun ke sisi kanan (y=16), lalu turun ke bawah (y=160) -->
        <path
          d="M 0,16 C 20,16 30,6 54,6 L 266,6 C 290,6 300,16 320,16 L 320,160 L 0,160 Z"
          fill="currentColor"
        />
        <!-- Top Rim Stroke Only (Garis Bibir Atas Dompet) -->
        <path
          d="M 0,16 C 20,16 30,6 54,6 L 266,6 C 290,6 300,16 320,16"
          fill="none"
          stroke="currentColor"
          class="text-neutral-200/90 dark:text-neutral-800"
          stroke-width="1.5"
          vector-effect="non-scaling-stroke"
        />
      </svg>

      <!-- Pocket Content (Teks di Bagian Depan Dompet) -->
      <div class="relative z-10 px-4 sm:px-4.5 pb-4 sm:pb-5 pt-3 space-y-1 mt-auto">
        <!-- Eyebrow: Label "Saldo Kas Toko" -->
        <p class="text-xs sm:text-sm font-sans font-semibold text-neutral-600 dark:text-neutral-300 leading-snug">
          {{ label }}
        </p>

        <!-- Primary Amount: Nominal Besar Konsisten Sejajar dengan Card Laba Bersih -->
        <div class="flex items-baseline min-w-0">
          <span
            class="text-2xl sm:text-[25px] lg:text-[26px] xl:text-[28px] font-heading font-black text-neutral-900 dark:text-white tabular-nums tracking-tight leading-none whitespace-nowrap"
          >
            {{ value }}
          </span>
        </div>
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
