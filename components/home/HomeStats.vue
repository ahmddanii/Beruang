<template>
  <!-- pt-0 pb-16 (0px / 128px) -> maybe py-16 (128px)? Let's use pt-8 pb-16 (64px / 128px) -->
  <section class="max-w-7xl mx-auto px-4 sm:px-8 lg:px-8 pb-24">
    <!-- Outer container: bg-white / dark:#15161A, border #EAEAEA / #26272F, radius 24px -->
    <div class="rounded-[24px] bg-white dark:bg-[#15161A] border border-[#EAEAEA] dark:border-[#26272F] shadow-xs overflow-hidden">
      <!-- Grid layout with dividers matching border color -->
      <div class="grid grid-cols-2 lg:grid-cols-4 divide-y lg:divide-y-0 lg:divide-x divide-[#EAEAEA] dark:divide-[#26272F]">
        
        <!-- Stat 1 -->
        <div class="p-8 flex flex-col gap-2">
          <span class="text-[16px]  font-semibold text-neutral-500 dark:text-neutral-400 leading-[24px]">
            UMKM Tersertifikasi
          </span>
          <div class="text-[42px]  font-extrabold text-neutral-900 dark:text-white tabular-nums  leading-[52px]">
            520+
          </div>
          <span class="text-[12px] text-emerald-600 dark:text-emerald-400 font-bold leading-[16px]">
            +18% lolos audit bulan ini
          </span>
        </div>

        <!-- Stat 2 -->
        <div class="p-8 flex flex-col gap-2">
          <span class="text-[16px]  font-semibold text-neutral-500 dark:text-neutral-400 leading-[24px]">
            Konsultan Lisensi
          </span>
          <div class="text-[42px]  font-extrabold text-neutral-900 dark:text-white tabular-nums  leading-[52px]">
            28
          </div>
          <span class="text-[12px] text-neutral-500 dark:text-neutral-400 font-bold leading-[16px]">
            Audit mandiri 5 pilar resmi
          </span>
        </div>

        <!-- Stat 3 -->
        <div class="p-8 flex flex-col gap-2">
          <span class="text-[16px]  font-semibold text-neutral-500 dark:text-neutral-400 leading-[24px]">
            Investor & Sindikasi
          </span>
          <div class="text-[42px]  font-extrabold text-neutral-900 dark:text-white tabular-nums  leading-[52px]">
            140+
          </div>
          <span class="text-[12px] text-neutral-500 dark:text-neutral-400 font-bold leading-[16px]">
            Angel & venture partners
          </span>
        </div>

        <!-- Stat 4 -->
        <div class="p-8 flex flex-col gap-2">
          <span class="text-[16px]  font-semibold text-neutral-500 dark:text-neutral-400 leading-[24px]">
            Margin Bersih Rata-rata
          </span>
          <div class="text-[42px]  font-extrabold text-primary-500 tabular-nums  leading-[52px]">
            32.6%
          </div>
          <span class="text-[12px] text-emerald-600 dark:text-emerald-400 font-bold leading-[16px]">
            0% Gagal Bayar (NPL Nol)
          </span>
        </div>

      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
// Stateless clean metrics ledger
</script>
