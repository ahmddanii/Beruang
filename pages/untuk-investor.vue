<template>
  <div class="py-8 sm:py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-10 sm:space-y-12 font-sans">
    
    <!-- Hero Section -->
    <div class="max-w-3xl space-y-4">
      <!-- Top Pill Badge (Sesuai Gaya Beranda UMKM) -->
      <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white dark:bg-[#13161F] shadow-[0_2px_8px_rgba(0,0,0,0.05)] border border-neutral-200/90 dark:border-neutral-800 text-xs sm:text-sm font-poppins font-medium text-neutral-800 dark:text-neutral-200 w-fit">
        <span class="text-[#0081A0] dark:text-[#2091AA] font-bold">📈</span>
        <span>Akses Investor Terverifikasi</span>
      </div>

      <h1 class="text-2xl sm:text-3xl lg:text-4xl font-poppins font-bold text-neutral-900 dark:text-white tracking-tight leading-snug">
        Akses Deal Flow UMKM yang Tervalidasi & Transparan.
      </h1>

      <p class="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 font-poppins leading-relaxed max-w-2xl">
        Hilangkan risiko asimetri informasi dan pembukuan fiktif. Seluruh UMKM di direktori Beruang telah diaudit oleh konsultan bisnis profesional dan terbukti konsisten mencatat kas minimal 3 bulan.
      </p>

      <div class="flex flex-wrap items-center gap-3 pt-2">
        <NuxtLink to="/investor" class="btn-3d-blue px-5 py-2.5 rounded-full text-xs sm:text-sm font-poppins font-semibold shadow-sm inline-flex items-center gap-2">
          <span>Jelajahi Katalog Marketplace</span>
          <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
          </svg>
        </NuxtLink>
        <NuxtLink to="/daftar" class="btn-pill-action">
          <span>Daftar Akun Investor</span>
        </NuxtLink>
      </div>
    </div>

    <!-- 3 Pillars of Investor Protection (Tactile Cards dengan Header Biru) -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-5 items-stretch">
      
      <!-- Pillar 1 -->
      <div class="group rounded-2xl card-tactile-gopay has-blue-banner overflow-hidden flex flex-col justify-between shadow-xs">
        <div class="w-full px-5 py-3 card-header-blue-banner flex items-center gap-2.5">
          <HugeiconsIcon :icon="Shield02Icon" :size="18" class="text-white shrink-0" />
          <span class="text-xs font-poppins font-semibold uppercase tracking-wider text-white">
            PRA-AUDIT OBJEKTIF
          </span>
        </div>
        <div class="w-full rounded-t-2xl bg-[#F6F8FA] dark:bg-[#13161F] p-5 flex flex-col justify-between flex-1 gap-3">
          <p class="text-xs sm:text-[13px] font-poppins text-neutral-600 dark:text-neutral-400 leading-relaxed">
            Konsultan independen memeriksa rekonsiliasi kas riil, struktur unit economics, izin edar (NIB, P-IRT, Halal), dan standar SOP gerai sebelum usaha berhak tampil di katalog.
          </p>
          <div class="pt-1">
            <span class="btn-pill-action scale-90 origin-left">
              <span>Metrik Terverifikasi</span>
            </span>
          </div>
        </div>
      </div>

      <!-- Pillar 2 -->
      <div class="group rounded-2xl card-tactile-gopay has-blue-banner overflow-hidden flex flex-col justify-between shadow-xs">
        <div class="w-full px-5 py-3 card-header-blue-banner flex items-center gap-2.5">
          <HugeiconsIcon :icon="FileValidationIcon" :size="18" class="text-white shrink-0" />
          <span class="text-xs font-poppins font-semibold uppercase tracking-wider text-white">
            DATA ROOM AMAN
          </span>
        </div>
        <div class="w-full rounded-t-2xl bg-[#F6F8FA] dark:bg-[#13161F] p-5 flex flex-col justify-between flex-1 gap-3">
          <p class="text-xs sm:text-[13px] font-poppins text-neutral-600 dark:text-neutral-400 leading-relaxed">
            Setiap permohonan akses data menyematkan identitas digital akun Anda pada seluruh lembar laporan P&L dan rekening koran untuk menjaga integritas kerahasiaan.
          </p>
          <div class="pt-1">
            <span class="btn-pill-action scale-90 origin-left">
              <span>Watermark Digital</span>
            </span>
          </div>
        </div>
      </div>

      <!-- Pillar 3 -->
      <div class="group rounded-2xl card-tactile-gopay has-blue-banner overflow-hidden flex flex-col justify-between shadow-xs">
        <div class="w-full px-5 py-3 card-header-blue-banner flex items-center gap-2.5">
          <HugeiconsIcon :icon="CoinsSwapIcon" :size="18" class="text-white shrink-0" />
          <span class="text-xs font-poppins font-semibold uppercase tracking-wider text-white">
            LANGSUNG TANPA POTONGAN
          </span>
        </div>
        <div class="w-full rounded-t-2xl bg-[#F6F8FA] dark:bg-[#13161F] p-5 flex flex-col justify-between flex-1 gap-3">
          <p class="text-xs sm:text-[13px] font-poppins text-neutral-600 dark:text-neutral-400 leading-relaxed">
            Beruang tidak memotong bagi hasil investasi Anda. Eksekusi perjanjian kemitraan, bagi hasil, atau suntikan modal dilakukan secara mandiri atau dengan bantuan notaris rekanan.
          </p>
          <div class="pt-1">
            <span class="btn-pill-action scale-90 origin-left">
              <span>0% Potongan Bagi Hasil</span>
            </span>
          </div>
        </div>
      </div>

    </div>

    <!-- Live Directory Preview Box (Card Tactile Style) -->
    <div class="p-5 sm:p-7 rounded-2xl card-tactile-gopay space-y-4">
      <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-3 border-b border-neutral-200/80 dark:border-neutral-800">
        <div>
          <span class="text-xs font-poppins font-bold uppercase tracking-wider text-[#0081A0] dark:text-[#2091AA]">
            Katalog Siap Pendanaan
          </span>
          <h2 class="text-lg sm:text-xl font-poppins font-bold text-neutral-900 dark:text-white mt-0.5">
            Contoh Peluang Usaha Terverifikasi
          </h2>
        </div>
        <NuxtLink to="/investor" class="btn-pill-action shrink-0">
          <span>Lihat 120+ UMKM Lainnya</span>
          <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
          </svg>
        </NuxtLink>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
        <!-- Item 1 -->
        <div class="p-3.5 rounded-xl bg-white dark:bg-[#13161F] border border-neutral-200/80 dark:border-neutral-800 space-y-1.5 shadow-xs">
          <div class="flex items-center justify-between text-[11px] font-poppins text-neutral-500">
            <span class="font-bold">BERU-KOP-01</span>
            <span class="text-emerald-600 font-bold">Skor Audit: 79/100</span>
          </div>
          <h4 class="font-poppins font-bold text-sm text-neutral-900 dark:text-white">
            Kopi Senja Nusantara
          </h4>
          <p class="text-[11px] font-poppins text-neutral-500">
            F&B • Bandung • Margin Kotor 48.5%
          </p>
        </div>

        <!-- Item 2 -->
        <div class="p-3.5 rounded-xl bg-white dark:bg-[#13161F] border border-neutral-200/80 dark:border-neutral-800 space-y-1.5 shadow-xs">
          <div class="flex items-center justify-between text-[11px] font-poppins text-neutral-500">
            <span class="font-bold">BERU-SMB-03</span>
            <span class="text-emerald-600 font-bold">Skor Audit: 88/100</span>
          </div>
          <h4 class="font-poppins font-bold text-sm text-neutral-900 dark:text-white">
            Sambal Bu Rudy Asli
          </h4>
          <p class="text-[11px] font-poppins text-neutral-500">
            FMCG • Surabaya • Margin Kotor 52.0%
          </p>
        </div>

        <!-- Item 3 -->
        <div class="p-3.5 rounded-xl bg-white dark:bg-[#13161F] border border-neutral-200/80 dark:border-neutral-800 space-y-1.5 shadow-xs">
          <div class="flex items-center justify-between text-[11px] font-poppins text-neutral-500">
            <span class="font-bold">BERU-BTK-07</span>
            <span class="text-emerald-600 font-bold">Skor Audit: 84/100</span>
          </div>
          <h4 class="font-poppins font-bold text-sm text-neutral-900 dark:text-white">
            Batik Lawasan Prabu
          </h4>
          <p class="text-[11px] font-poppins text-neutral-500">
            Kriya Ekspor • Solo • Margin Kotor 55.4%
          </p>
        </div>
      </div>
    </div>

    <!-- Final CTA Banner (Brand Teal-Navy Gradient Container) -->
    <div class="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-[#0B2533] via-[#0F3548] to-[#124B66] text-white border border-cyan-500/20 shadow-lg flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
      <div class="max-w-xl space-y-1.5">
        <h3 class="text-lg sm:text-xl font-poppins font-bold tracking-tight text-white">
          Mulai Investasi Berdampak untuk Sektor Riil
        </h3>
        <p class="text-xs text-cyan-100/80 font-poppins leading-relaxed">
          Dapatkan notifikasi deal baru setiap minggu yang cocok dengan kriteria sektor dan target tiket investasi Anda.
        </p>
      </div>

      <div class="shrink-0">
        <NuxtLink to="/daftar" class="px-5 py-2.5 rounded-full bg-white hover:bg-neutral-100 text-[#0081A0] text-xs sm:text-sm font-poppins font-bold shadow-md inline-flex items-center gap-2 transition-all active:scale-[0.98]">
          <span>Daftar Akun Investor Sekarang</span>
          <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
          </svg>
        </NuxtLink>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import { HugeiconsIcon } from '@hugeicons/vue'
import {
  Shield02Icon,
  FileValidationIcon,
  CoinsSwapIcon
} from '@hugeicons/core-free-icons'

useSeoMeta({
  title: 'Untuk Investor - Beruang',
  description: 'Akses deal flow UMKM Indonesia yang tervalidasi, transparan, dan telah melewati audit 5 pilar berlisensi.'
})
</script>
