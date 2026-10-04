<template>
  <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-24">
    <div class="bg-neutral-950 dark:bg-[#111318] text-white rounded-3xl p-8 sm:p-14 lg:p-16 text-center space-y-7 relative overflow-hidden border border-neutral-800 shadow-xl">
      <!-- Architectural Monospace Marker (Anti-Slop: No generic gradient blur) -->
      <div class="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-neutral-900 border border-neutral-800 text-[11px] font-mono text-neutral-400">
        <span class="text-primary-400 font-bold">§ 05</span>
        <span class="text-neutral-600">/</span>
        <span>GERBANG SINDIKASI MODAL NASIONAL</span>
      </div>

      <div class="max-w-3xl mx-auto space-y-3">
        <h2 class="text-3xl sm:text-4xl lg:text-5xl font-heading font-extrabold tracking-tight text-balance">
          Rapatkan Barisan. Siapkan Bisnismu Masuk Pasar Modal UMKM.
        </h2>
        <p class="text-xs sm:text-sm text-neutral-400 leading-relaxed max-w-xl mx-auto font-sans">
          Bergabung bersama 520+ pemilik usaha yang telah membuktikan bahwa pembukuan kas yang rapi adalah tiket paling bernilai di mata investor.
        </p>
      </div>

      <div class="pt-2 flex flex-wrap items-center justify-center gap-3">
        <NuxtLink
          to="/daftar"
          class="inline-flex items-center gap-2 px-7 py-3.5 rounded-2xl font-heading font-bold text-xs sm:text-sm bg-primary-500 hover:bg-primary-600 text-white shadow-xs transition-all active:scale-[0.98]"
        >
          <span>Daftarkan Usaha untuk Audit Gratis</span>
          <HugeiconsIcon :icon="ArrowRight01Icon" :size="16" :stroke-width="2" />
        </NuxtLink>

        <NuxtLink
          to="/untuk-konsultan"
          class="inline-flex items-center gap-2 px-7 py-3.5 rounded-2xl font-heading font-semibold text-xs sm:text-sm border border-neutral-800 hover:bg-neutral-900 text-neutral-300 transition-all active:scale-[0.98]"
        >
          <span>Bergabung Sebagai Konsultan BNSP</span>
        </NuxtLink>
      </div>

      <div class="pt-4 border-t border-neutral-900 text-[11px] font-mono text-neutral-500 flex flex-wrap items-center justify-center gap-6">
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
