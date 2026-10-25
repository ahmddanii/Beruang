<template>
  <div class="py-8 sm:py-14 w-full max-w-[1720px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 2xl:px-20 space-y-12 sm:space-y-16 font-sans">
    
    <!-- Header -->
    <div class="max-w-4xl space-y-3.5">
      <h1 class="text-2xl sm:text-4xl lg:text-5xl font-poppins font-bold text-neutral-900 dark:text-white tracking-tight leading-tight">
        Mendorong 100.000 UMKM Indonesia Naik Kelas dan Terpercaya.
      </h1>

      <p class="text-xs sm:text-base text-neutral-600 dark:text-neutral-300 font-poppins leading-relaxed max-w-3xl">
        <strong>Beruang (Ber-Uang)</strong> lahir dari keresahan nyata: jutaan pengusaha lokal memiliki produk hebat dan pelanggan loyal, namun tersandung pencatatan arus kas dan minimnya tata kelola sehingga gagal mengakses modal ekspansi yang layak.
      </p>
    </div>

    <!-- 3 Core Pillars Bento Grid (Tactile Cards dengan Header Biru) -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-5 items-stretch">
      
      <!-- Pillar 1 -->
      <div class="group rounded-2xl card-tactile-gopay has-blue-banner overflow-hidden flex flex-col justify-between shadow-xs">
        <div class="w-full px-5 py-3 card-header-blue-banner flex items-center gap-2.5">
          <HugeiconsIcon :icon="Book02Icon" :size="18" class="text-white shrink-0" />
          <span class="text-xs font-poppins font-semibold uppercase tracking-wider text-white">
            1. EDUKATIF & TAKTIS
          </span>
        </div>
        <div class="w-full rounded-t-2xl bg-[#F6F8FA] dark:bg-[#13161F] p-5 flex flex-col justify-between flex-1 gap-3">
          <p class="text-xs sm:text-[13px] font-poppins text-neutral-600 dark:text-neutral-400 leading-relaxed">
            Mengurai konsep akuntansi dan tata kelola bisnis yang rumit menjadi rencana aksi mingguan yang taktis, terukur, dan mudah dieksekusi oleh pelaku usaha di lapangan.
          </p>
          <div class="pt-1">
            <span class="btn-pill-action scale-90 origin-left">
              <span>Kurikulum Praktis</span>
            </span>
          </div>
        </div>
      </div>

      <!-- Pillar 2 -->
      <div class="group rounded-2xl card-tactile-gopay has-blue-banner overflow-hidden flex flex-col justify-between shadow-xs">
        <div class="w-full px-5 py-3 card-header-blue-banner flex items-center gap-2.5">
          <HugeiconsIcon :icon="ShieldCheckIcon" :size="18" class="text-white shrink-0" />
          <span class="text-xs font-poppins font-semibold uppercase tracking-wider text-white">
            2. KREDIBILITAS FINANSIAL
          </span>
        </div>
        <div class="w-full rounded-t-2xl bg-[#F6F8FA] dark:bg-[#13161F] p-5 flex flex-col justify-between flex-1 gap-3">
          <p class="text-xs sm:text-[13px] font-poppins text-neutral-600 dark:text-neutral-400 leading-relaxed">
            Tidak ada klaim sepihak. Setiap metrik finansial melewati audit rekonsiliasi kas oleh konsultan berlisensi dan dilindungi standar privasi ketat di dalam Data Room.
          </p>
          <div class="pt-1">
            <span class="btn-pill-action scale-90 origin-left">
              <span>Audit Independen</span>
            </span>
          </div>
        </div>
      </div>

      <!-- Pillar 3 -->
      <div class="group rounded-2xl card-tactile-gopay has-blue-banner overflow-hidden flex flex-col justify-between shadow-xs">
        <div class="w-full px-5 py-3 card-header-blue-banner flex items-center gap-2.5">
          <HugeiconsIcon :icon="CoinsSwapIcon" :size="18" class="text-white shrink-0" />
          <span class="text-xs font-poppins font-semibold uppercase tracking-wider text-white">
            3. DAMPAK SEKTOR RIIL
          </span>
        </div>
        <div class="w-full rounded-t-2xl bg-[#F6F8FA] dark:bg-[#13161F] p-5 flex flex-col justify-between flex-1 gap-3">
          <p class="text-xs sm:text-[13px] font-poppins text-neutral-600 dark:text-neutral-400 leading-relaxed">
            Membantu UMKM membuka gerai baru, menyerap tenaga kerja lokal di daerah, serta menciptakan kemitraan pendanaan yang sehat, adil, dan transparan.
          </p>
          <div class="pt-1">
            <span class="btn-pill-action scale-90 origin-left">
              <span>Ekonomi Inklusif</span>
            </span>
          </div>
        </div>
      </div>

    </div>

    <!-- Impact Numbers Section (Tactile Container) -->
    <div class="p-6 sm:p-8 rounded-2xl card-tactile-gopay space-y-6">
      <div class="text-center max-w-lg mx-auto space-y-1">
        <h2 class="text-lg sm:text-xl font-poppins font-bold text-neutral-900 dark:text-white tracking-tight">
          Komitmen & Capaian Berkelanjutan
        </h2>
        <p class="text-xs font-poppins text-neutral-500 dark:text-neutral-400">
          Metrik pertumbuhan ekosistem kemitraan Beruang per September 2026.
        </p>
      </div>

      <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 text-center">
        <div class="p-4 rounded-xl bg-white dark:bg-[#13161F] border border-neutral-200/80 dark:border-neutral-800 space-y-1">
          <div class="font-poppins font-bold text-2xl sm:text-3xl text-neutral-900 dark:text-white tabular-nums">
            520+
          </div>
          <div class="text-xs font-poppins text-neutral-500">UMKM Terdampingi</div>
        </div>
        <div class="p-4 rounded-xl bg-white dark:bg-[#13161F] border border-neutral-200/80 dark:border-neutral-800 space-y-1">
          <div class="font-poppins font-bold text-2xl sm:text-3xl text-emerald-600 dark:text-emerald-400 tabular-nums">
            Rp 12.8M
          </div>
          <div class="text-xs font-poppins text-neutral-500">Penyaluran Modal</div>
        </div>
        <div class="p-4 rounded-xl bg-white dark:bg-[#13161F] border border-neutral-200/80 dark:border-neutral-800 space-y-1">
          <div class="font-poppins font-bold text-2xl sm:text-3xl text-[#0081A0] dark:text-[#2091AA] tabular-nums">
            25+
          </div>
          <div class="text-xs font-poppins text-neutral-500">Konsultan Mitra BNSP</div>
        </div>
        <div class="p-4 rounded-xl bg-white dark:bg-[#13161F] border border-neutral-200/80 dark:border-neutral-800 space-y-1">
          <div class="font-poppins font-bold text-2xl sm:text-3xl text-neutral-900 dark:text-white tabular-nums">
            94.2%
          </div>
          <div class="text-xs font-poppins text-neutral-500">Tingkat Kelulusan Audit</div>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import { HugeiconsIcon } from '@hugeicons/vue'
import {
  Book02Icon,
  ShieldCheckIcon,
  CoinsSwapIcon
} from '@hugeicons/core-free-icons'

useSeoMeta({
  title: 'Tentang Kami - Beruang',
  description: 'Misi Beruang dalam mendorong 100.000 UMKM Indonesia naik kelas melalui tata kelola finansial akuntabel dan akses pendanaan terverifikasi.'
})
</script>
