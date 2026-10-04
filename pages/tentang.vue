<template>
  <div class="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto font-sans space-y-16">
    <!-- Header -->
    <div class="max-w-3xl space-y-5">
      <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-100 dark:bg-primary-950/60 text-primary-700 dark:text-primary-300 border border-primary-200 dark:border-primary-800 text-xs font-heading font-semibold">
        <span class="w-1.5 h-1.5 rounded-full bg-primary-500" />
        <span>Visi & Misi Beruang</span>
      </div>

      <h1 class="text-3xl sm:text-5xl lg:text-6xl font-heading font-bold text-neutral-900 dark:text-white tracking-tight leading-[1.08]">
        Mendorong 100.000 UMKM Indonesia Naik Kelas dan Terpercaya.
      </h1>

      <p class="text-base sm:text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed max-w-2xl">
        <strong>Beruang (Ber-Uang)</strong> lahir dari keresahan nyata: jutaan pengusaha lokal memiliki produk hebat dan pelanggan loyal, namun tersandung pencatatan arus kas dan minimnya tata kelola sehingga gagal mengakses modal ekspansi yang layak.
      </p>
    </div>

    <!-- 3 Core Pillars Bento Grid -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <BCard padding="lg" class="space-y-3">
        <div class="w-10 h-10 rounded-xl bg-primary-100 dark:bg-primary-950 text-primary-600 dark:text-primary-400 flex items-center justify-center">
          <HugeiconsIcon :icon="Book02Icon" :size="20" :stroke-width="1.75" />
        </div>
        <h3 class="font-heading font-bold text-base text-neutral-900 dark:text-white">
          1. Edukatif & Terstruktur
        </h3>
        <p class="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
          Mengurai konsep akuntansi dan tata kelola bisnis yang rumit menjadi rencana aksi mingguan yang taktis, terukur, dan mudah dieksekusi oleh pelaku usaha di lapangan.
        </p>
      </BCard>

      <BCard padding="lg" class="space-y-3">
        <div class="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
          <HugeiconsIcon :icon="ShieldCheckIcon" :size="20" :stroke-width="1.75" />
        </div>
        <h3 class="font-heading font-bold text-base text-neutral-900 dark:text-white">
          2. Kredibilitas Finansial
        </h3>
        <p class="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
          Tidak ada klaim sepihak. Setiap metrik finansial melewati audit rekonsiliasi kas oleh konsultan berlisensi dan dilindungi standar privasi ketat di dalam Data Room.
        </p>
      </BCard>

      <BCard padding="lg" class="space-y-3">
        <div class="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-950 text-amber-600 dark:text-amber-400 flex items-center justify-center">
          <HugeiconsIcon :icon="CoinsSwapIcon" :size="20" :stroke-width="1.75" />
        </div>
        <h3 class="font-heading font-bold text-base text-neutral-900 dark:text-white">
          3. Dampak Ekonomi Riil
        </h3>
        <p class="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
          Membantu UMKM membuka gerai baru, menyerap tenaga kerja lokal di daerah, serta menciptakan kemitraan pendanaan yang sehat, adil, dan transparan.
        </p>
      </BCard>
    </div>

    <!-- Impact Numbers Section -->
    <div class="p-8 sm:p-12 rounded-3xl bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark space-y-8">
      <div class="text-center max-w-xl mx-auto space-y-2">
        <h2 class="text-2xl sm:text-3xl font-heading font-bold text-neutral-900 dark:text-white tracking-tight">
          Komitmen & Capaian Berkelanjutan
        </h2>
        <p class="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400">
          Metrik pertumbuhan ekosistem kemitraan Beruang per September 2026.
        </p>
      </div>

      <div class="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
        <div class="space-y-1">
          <div class="font-heading font-bold text-3xl sm:text-4xl text-neutral-900 dark:text-white tabular-nums">
            500+
          </div>
          <div class="text-xs text-neutral-500 font-medium">UMKM Terdampingi</div>
        </div>
        <div class="space-y-1">
          <div class="font-heading font-bold text-3xl sm:text-4xl text-emerald-600 dark:text-emerald-400 tabular-nums">
            Rp 12.8M
          </div>
          <div class="text-xs text-neutral-500 font-medium">Penyaluran Modal Kemitraan</div>
        </div>
        <div class="space-y-1">
          <div class="font-heading font-bold text-3xl sm:text-4xl text-primary-600 dark:text-primary-400 tabular-nums">
            25+
          </div>
          <div class="text-xs text-neutral-500 font-medium">Konsultan Mitra Berlisensi</div>
        </div>
        <div class="space-y-1">
          <div class="font-heading font-bold text-3xl sm:text-4xl text-neutral-900 dark:text-white tabular-nums">
            94.2%
          </div>
          <div class="text-xs text-neutral-500 font-medium">Tingkat Kelulusan Rencana Aksi</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import BCard from '~/components/base/BCard.vue'
import { HugeiconsIcon } from '@hugeicons/vue'
import {
  Book02Icon,
  ShieldCheckIcon,
  CoinsSwapIcon
} from '@hugeicons/core-free-icons'
</script>
