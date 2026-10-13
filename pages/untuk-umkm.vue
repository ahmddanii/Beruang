<template>
  <div class="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto  space-y-16 sm:space-y-20">
    <!-- Hero Section -->
    <div class="max-w-3xl space-y-5">


      <h1 class="text-3xl sm:text-5xl lg:text-6xl  font-bold text-neutral-900 dark:text-white tracking-tight leading-[1.08]">
        Bisnismu, Siap Naik Kelas dan Didanai.
      </h1>

      <p class="text-base sm:text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed max-w-2xl">
        Kendalikan kebocoran biaya bahan baku, pisahkan kas pribadi dan kas warung, serta susun dokumen legalitas usahamu bersama konsultan bisnis berpengalaman.
      </p>

      <div class="flex flex-wrap items-center gap-3 pt-2">
        <NuxtLink to="/daftar">
          <BButton variant="primary" size="lg" class="shadow-sm">
            Mulai Audit Mandiri (Gratis)
          </BButton>
        </NuxtLink>
        <NuxtLink to="/tentang">
          <BButton variant="outline" size="lg">
            Pelajari Metodologi
          </BButton>
        </NuxtLink>
      </div>
    </div>

    <!-- 4 Pillar Features (Bento Grid) -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <BCard padding="lg" class="space-y-3">
        <div class="w-10 h-10 rounded-xl bg-primary-100 dark:bg-primary-950 text-primary-600 dark:text-primary-400 flex items-center justify-center">
          <HugeiconsIcon :icon="Analytics01Icon" :size="20" :stroke-width="1.75" />
        </div>
        <h3 class=" font-bold text-base text-neutral-900 dark:text-white">
          Diagnosa 5 Aspek
        </h3>
        <p class="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
          Ukur kekuatan bisnis dari arus kas, margin kotor, kepatuhan legalitas, efisiensi operasional, dan potensi pasar secara objektif.
        </p>
      </BCard>

      <BCard padding="lg" class="space-y-3">
        <div class="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
          <HugeiconsIcon :icon="UserGroupIcon" :size="20" :stroke-width="1.75" />
        </div>
        <h3 class=" font-bold text-base text-neutral-900 dark:text-white">
          Konsultan Pendamping
        </h3>
        <p class="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
          Dibimbing langsung praktisi berpengalaman untuk menuntaskan checklist mingguan tanpa rasa bingung atau kewalahan.
        </p>
      </BCard>

      <BCard padding="lg" class="space-y-3">
        <div class="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-950 text-amber-600 dark:text-amber-400 flex items-center justify-center">
          <HugeiconsIcon :icon="AlertCircleIcon" :size="20" :stroke-width="1.75" />
        </div>
        <h3 class=" font-bold text-base text-neutral-900 dark:text-white">
          AI Anomaly Alert
        </h3>
        <p class="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
          Deteksi otomatis dini saat terjadi kenaikan harga bahan baku atau penurunan margin agar cash flow usahamu tetap aman.
        </p>
      </BCard>

      <BCard padding="lg" class="space-y-3">
        <div class="w-10 h-10 rounded-xl bg-purple-100 dark:bg-purple-950 text-purple-600 dark:text-purple-400 flex items-center justify-center">
          <HugeiconsIcon :icon="Award01Icon" :size="20" :stroke-width="1.75" />
        </div>
        <h3 class=" font-bold text-base text-neutral-900 dark:text-white">
          Sertifikasi Siap Modal
        </h3>
        <p class="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
          Raih lencana resmi "Ready for Funding" untuk membuka akses ke ratusan pemodal terverifikasi di katalog marketplace.
        </p>
      </BCard>
    </div>

    <!-- Before vs After Comparison Grid -->
    <div class="space-y-6">
      <div class="max-w-2xl">
        <h2 class="text-2xl sm:text-3xl  font-bold text-neutral-900 dark:text-white tracking-tight">
          Transformasi Usahamu Bersama Beruang
        </h2>
        <p class="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 mt-1">
          Perbedaan nyata sebelum dan setelah mengikuti alur pendampingan taktis Beruang.
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- Before Card -->
        <div class="p-6 rounded-2xl bg-surface-light dark:bg-surface-dark border border-red-200/80 dark:border-red-950/60 space-y-4">
          <div class="flex items-center gap-2.5">
            <div class="w-7 h-7 rounded-lg bg-red-100 dark:bg-red-950/60 text-red-600 flex items-center justify-center shrink-0">
              <HugeiconsIcon :icon="Cancel01Icon" :size="16" :stroke-width="2" />
            </div>
            <h3 class=" font-bold text-base text-red-600 dark:text-red-400">
              Sebelum Masuk Pembinaan
            </h3>
          </div>
          <ul class="space-y-3 text-xs sm:text-sm text-neutral-600 dark:text-neutral-400">
            <li class="flex items-start gap-2.5">
              <span class="text-red-500 font-bold">•</span>
              <span>Uang pribadi dan kas harian warung sering tercampur di satu dompet atau rekening.</span>
            </li>
            <li class="flex items-start gap-2.5">
              <span class="text-red-500 font-bold">•</span>
              <span>Tidak tahu persis berapa HPP dan margin riil sebenarnya dari tiap menu/produk.</span>
            </li>
            <li class="flex items-start gap-2.5">
              <span class="text-red-500 font-bold">•</span>
              <span>Bingung cara mengurus izin NIB RBA, P-IRT, atau sertifikasi Halal secara mandiri.</span>
            </li>
            <li class="flex items-start gap-2.5">
              <span class="text-red-500 font-bold">•</span>
              <span>Mengajukan pinjaman ke bank atau pemodal ditolak karena tidak punya catatan keuangan rapi.</span>
            </li>
          </ul>
        </div>

        <!-- After Card -->
        <div class="p-6 rounded-2xl bg-surface-light dark:bg-surface-dark border border-emerald-200/80 dark:border-emerald-950/60 space-y-4">
          <div class="flex items-center gap-2.5">
            <div class="w-7 h-7 rounded-lg bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 flex items-center justify-center shrink-0">
              <HugeiconsIcon :icon="CheckmarkCircle01Icon" :size="16" :stroke-width="2" />
            </div>
            <h3 class=" font-bold text-base text-emerald-600 dark:text-emerald-400">
              Setelah Tervalidasi di Beruang
            </h3>
          </div>
          <ul class="space-y-3 text-xs sm:text-sm text-neutral-700 dark:text-neutral-300">
            <li class="flex items-start gap-2.5">
              <span class="text-emerald-500 font-bold">•</span>
              <span>Rekening operasional terpisah rapi dengan rekonsiliasi kas mingguan yang disiplin.</span>
            </li>
            <li class="flex items-start gap-2.5">
              <span class="text-emerald-500 font-bold">•</span>
              <span>Notifikasi dini otomatis saat terjadi lonjakan harga bahan baku sehingga margin tetap terjaga.</span>
            </li>
            <li class="flex items-start gap-2.5">
              <span class="text-emerald-500 font-bold">•</span>
              <span>Dokumen perizinan lengkap dan diaudit langsung oleh konsultan bisnis terakreditasi.</span>
            </li>
            <li class="flex items-start gap-2.5">
              <span class="text-emerald-500 font-bold">•</span>
              <span>Memiliki lencana <strong>Ready for Funding</strong> dan terhubung langsung dengan pemodal terkurasi.</span>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <!-- Final Call to Action Box -->
    <div class="p-8 sm:p-12 rounded-3xl bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
      <div class="max-w-xl space-y-2">
        <h3 class="text-2xl sm:text-3xl  font-bold text-neutral-900 dark:text-white tracking-tight">
          Cari Tahu Skor Kesiapan Usahamu Hari Ini
        </h3>
        <p class="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
          Hanya butuh 5 menit untuk mengisi 5 indikator fundamental bisnismu. Dapatkan rencana aksi perbaikan pertama tanpa biaya.
        </p>
      </div>

      <div class="shrink-0">
        <NuxtLink to="/daftar">
          <BButton variant="primary" size="lg">
            Daftar Sekarang (Gratis)
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
  Analytics01Icon,
  UserGroupIcon,
  AlertCircleIcon,
  Award01Icon,
  Cancel01Icon,
  CheckmarkCircle01Icon
} from '@hugeicons/core-free-icons'
</script>
