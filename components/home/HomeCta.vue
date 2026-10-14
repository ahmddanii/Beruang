<template>
  <section class="max-w-7xl mx-auto px-4 sm:px-8 lg:px-8 pb-32">
    <div class="bg-neutral-950 dark:bg-[#111318] text-white rounded-[24px] p-8 sm:p-16 lg:p-24 text-center flex flex-col gap-12 relative overflow-hidden border border-neutral-800 shadow-xl">
      


      <div class="max-w-3xl mx-auto flex flex-col gap-6">
        <h2 class="text-[42px] sm:text-[68px]  font-extrabold tracking-tight text-balance leading-[52px] sm:leading-[84px]">
          Rapatkan Barisan. Siapkan Bisnismu Masuk Pasar Modal UMKM.
        </h2>
        <p class="text-[16px] text-neutral-400 leading-[24px] max-w-xl mx-auto ">
          Bergabung bersama 520+ pemilik usaha yang telah membuktikan bahwa pembukuan kas yang rapi adalah tiket paling bernilai di mata investor.
        </p>
      </div>

      <div class="pt-4 flex flex-wrap items-center justify-center gap-4">
        <NuxtLink
          to="/daftar"
          class="inline-flex items-center gap-2 px-8 py-4 h-[56px] rounded-[28px]  font-bold text-[16px] bg-primary-500 hover:bg-primary-600 text-white shadow-xs transition-all active:scale-[0.98] leading-[24px]"
        >
          <span>Daftarkan Usaha untuk Audit Gratis</span>
          <HugeiconsIcon :icon="ArrowRight01Icon" :size="16" :stroke-width="2" />
        </NuxtLink>

        <NuxtLink
          to="/untuk-konsultan"
          class="inline-flex items-center gap-2 px-8 py-4 h-[56px] rounded-[28px]  font-semibold text-[16px] border border-neutral-800 hover:bg-neutral-900 text-neutral-300 transition-all active:scale-[0.98] leading-[24px]"
        >
          <span>Bergabung Sebagai Konsultan BNSP</span>
        </NuxtLink>
      </div>

      <div class="pt-8 border-t border-neutral-900 text-[12px]  text-neutral-500 flex flex-wrap items-center justify-center gap-8 leading-[16px]">
        <span>✓ 100% Proteksi Kerahasiaan Data</span>
        <span>✓ Lisensi Sertifikasi BNSP</span>
        <span>✓ Bebas Skema Utang Berbunga</span>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { HugeiconsIcon } from '@hugeicons/vue'
import { ArrowRight01Icon } from '@hugeicons/core-free-icons'
</script>
