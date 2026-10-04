<template>
  <div class="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto  space-y-16 sm:space-y-20">
    <!-- Hero Section -->
    <div class="max-w-3xl space-y-5">


      <h1 class="text-3xl sm:text-5xl lg:text-6xl  font-bold text-neutral-900 dark:text-white tracking-tight leading-[1.08]">
        Akses Deal Flow UMKM yang Tervalidasi & Transparan.
      </h1>

      <p class="text-base sm:text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed max-w-2xl">
        Hilangkan risiko asimetri informasi dan pembukuan fiktif. Seluruh UMKM di direktori Beruang telah diaudit oleh konsultan bisnis profesional dan terbukti konsisten mencatat kas minimal 3 bulan.
      </p>

      <div class="flex flex-wrap items-center gap-3 pt-2">
        <NuxtLink to="/investor">
          <BButton variant="primary" size="lg" class="shadow-sm">
            Jelajahi Katalog Marketplace
          </BButton>
        </NuxtLink>
        <NuxtLink to="/daftar">
          <BButton variant="outline" size="lg">
            Daftar Akun Investor
          </BButton>
        </NuxtLink>
      </div>
    </div>

    <!-- 3 Pillars of Investor Protection (Bento Grid) -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <BCard padding="lg" class="space-y-3">
        <div class="w-10 h-10 rounded-xl bg-primary-100 dark:bg-primary-950 text-primary-600 dark:text-primary-400 flex items-center justify-center">
          <HugeiconsIcon :icon="Shield02Icon" :size="20" :stroke-width="1.75" />
        </div>
        <h3 class=" font-bold text-base text-neutral-900 dark:text-white">
          Pra-Audit Objektif Konsultan
        </h3>
        <p class="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
          Konsultan independen memeriksa rekonsiliasi kas riil, struktur unit economics, izin edar (NIB, P-IRT, Halal), dan standar SOP gerai sebelum usaha berhak tampil di katalog.
        </p>
      </BCard>

      <BCard padding="lg" class="space-y-3">
        <div class="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
          <HugeiconsIcon :icon="FileValidationIcon" :size="20" :stroke-width="1.75" />
        </div>
        <h3 class=" font-bold text-base text-neutral-900 dark:text-white">
          Data Room Ber-watermark Digital
        </h3>
        <p class="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
          Setiap permohonan akses data yang disetujui founder menyematkan identitas akun Anda secara digital pada seluruh lembar laporan P&L dan rekening koran untuk menjaga integritas kerahasiaan.
        </p>
      </BCard>

      <BCard padding="lg" class="space-y-3">
        <div class="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-950 text-amber-600 dark:text-amber-400 flex items-center justify-center">
          <HugeiconsIcon :icon="CoinsSwapIcon" :size="20" :stroke-width="1.75" />
        </div>
        <h3 class=" font-bold text-base text-neutral-900 dark:text-white">
          Kesepakatan Langsung Tanpa Potongan
        </h3>
        <p class="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
          Beruang tidak memotong bagi hasil investasi Anda. Eksekusi perjanjian kemitraan, bagi hasil, atau suntikan modal dilakukan secara mandiri atau dengan bantuan notaris rekanan.
        </p>
      </BCard>
    </div>

    <!-- Live Directory Preview Box (Saaspo Style) -->
    <div class="p-8 sm:p-10 rounded-3xl bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark space-y-6">
      <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <span class="text-xs  font-bold uppercase tracking-wider text-primary-600 dark:text-primary-400">
            Katalog Siap Pendanaan
          </span>
          <h2 class="text-2xl  font-bold text-neutral-900 dark:text-white mt-1">
            Lihat Contoh Peluang yang Sedang Terbuka
          </h2>
        </div>
        <NuxtLink to="/investor">
          <BButton variant="outline" size="sm">
            Lihat Semua 120+ UMKM →
          </BButton>
        </NuxtLink>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div class="p-4 rounded-xl bg-white dark:bg-neutral-900 border border-border-light dark:border-border-dark space-y-2">
          <div class="flex items-center justify-between text-[11px] text-neutral-500">
            <span class=" font-bold">BERU-KOP-01</span>
            <span class="text-emerald-600 font-bold">Skor Audit: 79/100</span>
          </div>
          <h4 class=" font-bold text-sm text-neutral-900 dark:text-white">
            Kopi Senja Nusantara
          </h4>
          <p class="text-xs text-neutral-500">
            F&B • Bandung • Margin Kotor 48.5%
          </p>
        </div>

        <div class="p-4 rounded-xl bg-white dark:bg-neutral-900 border border-border-light dark:border-border-dark space-y-2">
          <div class="flex items-center justify-between text-[11px] text-neutral-500">
            <span class=" font-bold">BERU-SMB-03</span>
            <span class="text-emerald-600 font-bold">Skor Audit: 88/100</span>
          </div>
          <h4 class=" font-bold text-sm text-neutral-900 dark:text-white">
            Sambal Bu Rudy Asli
          </h4>
          <p class="text-xs text-neutral-500">
            FMCG • Surabaya • Margin Kotor 52.0%
          </p>
        </div>

        <div class="p-4 rounded-xl bg-white dark:bg-neutral-900 border border-border-light dark:border-border-dark space-y-2">
          <div class="flex items-center justify-between text-[11px] text-neutral-500">
            <span class=" font-bold">BERU-BTK-07</span>
            <span class="text-emerald-600 font-bold">Skor Audit: 84/100</span>
          </div>
          <h4 class=" font-bold text-sm text-neutral-900 dark:text-white">
            Batik Lawasan Prabu
          </h4>
          <p class="text-xs text-neutral-500">
            Kriya Ekspor • Solo • Margin Kotor 55.4%
          </p>
        </div>
      </div>
    </div>

    <!-- Final CTA Banner -->
    <div class="p-8 sm:p-12 rounded-3xl bg-neutral-900 text-white dark:bg-surface-dark border border-neutral-800 dark:border-border-dark flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
      <div class="max-w-xl space-y-2">
        <h3 class="text-2xl sm:text-3xl  font-bold tracking-tight text-white">
          Mulai Investasi Berdampak untuk Sektor Riil
        </h3>
        <p class="text-xs sm:text-sm text-neutral-400 leading-relaxed">
          Dapatkan notifikasi deal baru setiap minggu yang cocok dengan kriteria sektor dan target tiket investasi Anda.
        </p>
      </div>

      <div class="shrink-0">
        <NuxtLink to="/daftar">
          <BButton variant="primary" size="lg">
            Daftar Akun Investor Sekarang
          </BButton>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import BCard from '~/components/base/BCard.vue'
import BButton from '~/components/base/BButton.vue'
import { HugeiconsIcon } from '@hugeicons/vue'
import {
  Shield02Icon,
  FileValidationIcon,
  CoinsSwapIcon
} from '@hugeicons/core-free-icons'
</script>
