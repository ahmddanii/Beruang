<template>
  <div class="py-8 sm:py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-10 sm:space-y-12 font-sans">
    
    <!-- Hero Section -->
    <div class="max-w-3xl space-y-3">
      <h1 class="text-2xl sm:text-3xl lg:text-4xl font-poppins font-bold text-neutral-900 dark:text-white tracking-tight leading-snug">
        Bisnismu, Siap Naik Kelas dan Didanai.
      </h1>

      <p class="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 font-poppins leading-relaxed max-w-2xl">
        Kendalikan kebocoran biaya bahan baku, pisahkan kas pribadi dan kas warung, serta susun dokumen legalitas usahamu bersama konsultan bisnis berpengalaman.
      </p>

      <div class="flex flex-wrap items-center gap-3 pt-2">
        <NuxtLink to="/daftar" class="btn-3d-blue px-5 py-2.5 rounded-full text-xs sm:text-sm font-poppins font-semibold shadow-sm inline-flex items-center gap-2">
          <span>Mulai Audit Mandiri (Gratis)</span>
          <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
          </svg>
        </NuxtLink>
        <NuxtLink to="/tentang" class="btn-pill-action">
          <span>Pelajari Metodologi</span>
        </NuxtLink>
      </div>
    </div>

    <!-- 4 Pillar Features (Tactile Cards Sesuai Gambar Beranda) -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-stretch">
      
      <!-- Feature 1 -->
      <div class="group rounded-2xl card-tactile-gopay has-blue-banner overflow-hidden flex flex-col justify-between shadow-xs">
        <div class="w-full px-4 py-2.5 card-header-blue-banner flex items-center gap-2">
          <HugeiconsIcon :icon="Analytics01Icon" :size="16" class="text-white shrink-0" />
          <span class="text-xs font-poppins font-semibold uppercase tracking-wider text-white">
            DIAGNOSA 5 ASPEK
          </span>
        </div>
        <div class="w-full rounded-t-2xl bg-[#F6F8FA] dark:bg-[#13161F] p-4 flex flex-col justify-between flex-1 gap-3">
          <p class="text-xs font-poppins text-neutral-600 dark:text-neutral-400 leading-relaxed">
            Ukur kekuatan bisnis dari arus kas, margin kotor, kepatuhan legalitas, dan efisiensi operasional secara objektif.
          </p>
          <div class="pt-1">
            <NuxtLink to="/daftar" class="btn-pill-action scale-90 origin-left">
              <span>Cek Skor Usaha</span>
            </NuxtLink>
          </div>
        </div>
      </div>

      <!-- Feature 2 -->
      <div class="group rounded-2xl card-tactile-gopay has-blue-banner overflow-hidden flex flex-col justify-between shadow-xs">
        <div class="w-full px-4 py-2.5 card-header-blue-banner flex items-center gap-2">
          <HugeiconsIcon :icon="UserGroupIcon" :size="16" class="text-white shrink-0" />
          <span class="text-xs font-poppins font-semibold uppercase tracking-wider text-white">
            KONSULTAN BNSP
          </span>
        </div>
        <div class="w-full rounded-t-2xl bg-[#F6F8FA] dark:bg-[#13161F] p-4 flex flex-col justify-between flex-1 gap-3">
          <p class="text-xs font-poppins text-neutral-600 dark:text-neutral-400 leading-relaxed">
            Dibimbing langsung praktisi berpengalaman untuk menuntaskan checklist mingguan tanpa rasa bingung atau kewalahan.
          </p>
          <div class="pt-1">
            <NuxtLink to="/daftar" class="btn-pill-action scale-90 origin-left">
              <span>Pilih Pendamping</span>
            </NuxtLink>
          </div>
        </div>
      </div>

      <!-- Feature 3 -->
      <div class="group rounded-2xl card-tactile-gopay has-blue-banner overflow-hidden flex flex-col justify-between shadow-xs">
        <div class="w-full px-4 py-2.5 card-header-blue-banner flex items-center gap-2">
          <HugeiconsIcon :icon="AlertCircleIcon" :size="16" class="text-white shrink-0" />
          <span class="text-xs font-poppins font-semibold uppercase tracking-wider text-white">
            AI ANOMALY ALERT
          </span>
        </div>
        <div class="w-full rounded-t-2xl bg-[#F6F8FA] dark:bg-[#13161F] p-4 flex flex-col justify-between flex-1 gap-3">
          <p class="text-xs font-poppins text-neutral-600 dark:text-neutral-400 leading-relaxed">
            Deteksi otomatis saat terjadi kenaikan harga bahan baku atau penurunan margin agar cash flow usahamu tetap aman.
          </p>
          <div class="pt-1">
            <span class="btn-pill-action scale-90 origin-left opacity-90">
              <span>Sistem Aktif</span>
            </span>
          </div>
        </div>
      </div>

      <!-- Feature 4 -->
      <div class="group rounded-2xl card-tactile-gopay has-blue-banner overflow-hidden flex flex-col justify-between shadow-xs">
        <div class="w-full px-4 py-2.5 card-header-blue-banner flex items-center gap-2">
          <HugeiconsIcon :icon="Award01Icon" :size="16" class="text-white shrink-0" />
          <span class="text-xs font-poppins font-semibold uppercase tracking-wider text-white">
            SIAP MODAL
          </span>
        </div>
        <div class="w-full rounded-t-2xl bg-[#F6F8FA] dark:bg-[#13161F] p-4 flex flex-col justify-between flex-1 gap-3">
          <p class="text-xs font-poppins text-neutral-600 dark:text-neutral-400 leading-relaxed">
            Raih lencana resmi "Ready for Funding" untuk membuka akses ke ratusan pemodal terverifikasi di katalog marketplace.
          </p>
          <div class="pt-1">
            <NuxtLink to="/investor" class="btn-pill-action scale-90 origin-left">
              <span>Lihat Katalog</span>
            </NuxtLink>
          </div>
        </div>
      </div>

    </div>

    <!-- Before vs After Comparison Grid -->
    <div class="space-y-4">
      <div class="max-w-xl">
        <h2 class="text-xl sm:text-2xl font-poppins font-bold text-neutral-900 dark:text-white tracking-tight">
          Transformasi Usahamu Bersama Beruang
        </h2>
        <p class="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 mt-0.5">
          Perbedaan nyata sebelum dan setelah mengikuti alur pendampingan taktis Beruang.
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <!-- Before Card -->
        <div class="p-5 rounded-2xl card-tactile-gopay border-red-200/60 dark:border-red-950/40 space-y-3">
          <div class="flex items-center gap-2 pb-2 border-b border-red-100 dark:border-red-950/40">
            <div class="w-6 h-6 rounded-md bg-red-100 dark:bg-red-950/60 text-red-600 flex items-center justify-center shrink-0">
              <HugeiconsIcon :icon="Cancel01Icon" :size="14" :stroke-width="2.2" />
            </div>
            <h3 class="font-poppins font-bold text-sm text-red-600 dark:text-red-400">
              Sebelum Masuk Pembinaan
            </h3>
          </div>
          <ul class="space-y-2 text-xs font-poppins text-neutral-600 dark:text-neutral-400">
            <li class="flex items-start gap-2">
              <span class="text-red-500 font-bold">•</span>
              <span>Uang pribadi dan kas harian warung sering tercampur di satu rekening.</span>
            </li>
            <li class="flex items-start gap-2">
              <span class="text-red-500 font-bold">•</span>
              <span>Tidak tahu persis berapa HPP dan margin riil sebenarnya dari tiap menu.</span>
            </li>
            <li class="flex items-start gap-2">
              <span class="text-red-500 font-bold">•</span>
              <span>Bingung cara mengurus izin NIB RBA, P-IRT, atau sertifikasi Halal secara mandiri.</span>
            </li>
            <li class="flex items-start gap-2">
              <span class="text-red-500 font-bold">•</span>
              <span>Mengajukan pinjaman ke pemodal ditolak karena tidak punya catatan kas rapi.</span>
            </li>
          </ul>
        </div>

        <!-- After Card -->
        <div class="p-5 rounded-2xl card-tactile-gopay border-emerald-200/60 dark:border-emerald-950/40 space-y-3">
          <div class="flex items-center gap-2 pb-2 border-b border-emerald-100 dark:border-emerald-950/40">
            <div class="w-6 h-6 rounded-md bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 flex items-center justify-center shrink-0">
              <HugeiconsIcon :icon="CheckmarkCircle01Icon" :size="14" :stroke-width="2.2" />
            </div>
            <h3 class="font-poppins font-bold text-sm text-emerald-600 dark:text-emerald-400">
              Setelah Tervalidasi di Beruang
            </h3>
          </div>
          <ul class="space-y-2 text-xs font-poppins text-neutral-700 dark:text-neutral-300">
            <li class="flex items-start gap-2">
              <span class="text-emerald-500 font-bold">•</span>
              <span>Rekening operasional terpisah rapi dengan rekonsiliasi kas mingguan disiplin.</span>
            </li>
            <li class="flex items-start gap-2">
              <span class="text-emerald-500 font-bold">•</span>
              <span>Notifikasi dini otomatis saat terjadi lonjakan harga bahan baku untuk jaga margin.</span>
            </li>
            <li class="flex items-start gap-2">
              <span class="text-emerald-500 font-bold">•</span>
              <span>Dokumen perizinan lengkap dan diaudit langsung oleh konsultan berlisensi.</span>
            </li>
            <li class="flex items-start gap-2">
              <span class="text-emerald-500 font-bold">•</span>
              <span>Memiliki lencana <strong>Ready for Funding</strong> dan terhubung langsung ke pemodal.</span>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <!-- Final Call to Action Box (Tactile Brand Teal-Navy Container) -->
    <div class="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-[#0B2533] via-[#0F3548] to-[#124B66] text-white border border-cyan-500/20 shadow-lg flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
      <div class="max-w-lg space-y-1.5">
        <h3 class="text-lg sm:text-xl font-poppins font-bold text-white tracking-tight">
          Cari Tahu Skor Kesiapan Usahamu Hari Ini
        </h3>
        <p class="text-xs text-cyan-100/80 font-poppins leading-relaxed">
          Hanya butuh 5 menit untuk mengisi 5 indikator fundamental bisnismu. Dapatkan rencana aksi perbaikan pertama tanpa biaya.
        </p>
      </div>

      <div class="shrink-0">
        <NuxtLink to="/daftar" class="px-5 py-2.5 rounded-full bg-white hover:bg-neutral-100 text-[#0081A0] text-xs sm:text-sm font-poppins font-bold shadow-md inline-flex items-center gap-2 transition-all active:scale-[0.98]">
          <span>Daftar Sekarang (Gratis)</span>
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
  Analytics01Icon,
  UserGroupIcon,
  AlertCircleIcon,
  Award01Icon,
  Cancel01Icon,
  CheckmarkCircle01Icon
} from '@hugeicons/core-free-icons'

useSeoMeta({
  title: 'Untuk UMKM - Beruang',
  description: 'Program pendampingan dan sertifikasi kelayakan pendanaan untuk usaha mikro, kecil, dan menengah.'
})
</script>
