<template>
  <div class="py-8 sm:py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-10 sm:space-y-12 font-sans">
    
    <!-- Hero Section -->
    <div class="max-w-3xl space-y-4">
      <!-- Top Pill Badge (Sesuai Gaya Beranda UMKM) -->
      <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white dark:bg-[#13161F] shadow-[0_2px_8px_rgba(0,0,0,0.05)] border border-neutral-200/90 dark:border-neutral-800 text-xs sm:text-sm font-poppins font-medium text-neutral-800 dark:text-neutral-200 w-fit">
        <span class="text-[#0081A0] dark:text-[#2091AA] font-bold">🎓</span>
        <span>Kemitraan Konsultan BNSP</span>
      </div>

      <h1 class="text-2xl sm:text-3xl lg:text-4xl font-poppins font-bold text-neutral-900 dark:text-white tracking-tight leading-snug">
        Dampingi UMKM Naik Kelas dengan Keahlian Nyata.
      </h1>

      <p class="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 font-poppins leading-relaxed max-w-2xl">
        Salurkan kepakaran Anda dalam tata kelola keuangan dan operasional. Manfaatkan sistem supervisi cerdas berbasis AI Anomaly Alert untuk membimbing puluhan usaha binaan secara efektif dan terukur.
      </p>

      <div class="flex flex-wrap items-center gap-3 pt-2">
        <NuxtLink to="/daftar" class="btn-3d-blue px-5 py-2.5 rounded-full text-xs sm:text-sm font-poppins font-semibold shadow-sm inline-flex items-center gap-2">
          <span>Daftar Sebagai Konsultan Mitra</span>
          <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
          </svg>
        </NuxtLink>
        <NuxtLink to="/faq" class="btn-pill-action">
          <span>Pelajari Syarat Kemitraan</span>
        </NuxtLink>
      </div>
    </div>

    <!-- 3 Core Advantages (Tactile Cards dengan Header Biru) -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-5 items-stretch">
      
      <!-- Advantage 1 -->
      <div class="group rounded-2xl card-tactile-gopay has-blue-banner overflow-hidden flex flex-col justify-between shadow-xs">
        <div class="w-full px-5 py-3 card-header-blue-banner flex items-center gap-2.5">
          <HugeiconsIcon :icon="CoinsSwapIcon" :size="18" class="text-white shrink-0" />
          <span class="text-xs font-poppins font-semibold uppercase tracking-wider text-white">
            INSENTIF PROFESIONAL
          </span>
        </div>
        <div class="w-full rounded-t-2xl bg-[#F6F8FA] dark:bg-[#13161F] p-5 flex flex-col justify-between flex-1 gap-3">
          <p class="text-xs sm:text-[13px] font-poppins text-neutral-600 dark:text-neutral-400 leading-relaxed">
            Dapatkan kompensasi pendampingan terstruktur per klien UMKM serta bonus keberhasilan saat UMKM binaan Anda berhasil mengamankan pendanaan.
          </p>
          <div class="pt-1">
            <span class="btn-pill-action scale-90 origin-left">
              <span>Success Fee Transparan</span>
            </span>
          </div>
        </div>
      </div>

      <!-- Advantage 2 -->
      <div class="group rounded-2xl card-tactile-gopay has-blue-banner overflow-hidden flex flex-col justify-between shadow-xs">
        <div class="w-full px-5 py-3 card-header-blue-banner flex items-center gap-2.5">
          <HugeiconsIcon :icon="AlertCircleIcon" :size="18" class="text-white shrink-0" />
          <span class="text-xs font-poppins font-semibold uppercase tracking-wider text-white">
            AI ANOMALY ALERT
          </span>
        </div>
        <div class="w-full rounded-t-2xl bg-[#F6F8FA] dark:bg-[#13161F] p-5 flex flex-col justify-between flex-1 gap-3">
          <p class="text-xs sm:text-[13px] font-poppins text-neutral-600 dark:text-neutral-400 leading-relaxed">
            Tidak perlu memeriksa manual baris transaksi setiap hari. Algoritma memindai lonjakan HPP >10% dan deviasi margin kotor secara otomatis.
          </p>
          <div class="pt-1">
            <span class="btn-pill-action scale-90 origin-left">
              <span>Supervisi Cerdas</span>
            </span>
          </div>
        </div>
      </div>

      <!-- Advantage 3 -->
      <div class="group rounded-2xl card-tactile-gopay has-blue-banner overflow-hidden flex flex-col justify-between shadow-xs">
        <div class="w-full px-5 py-3 card-header-blue-banner flex items-center gap-2.5">
          <HugeiconsIcon :icon="Award01Icon" :size="18" class="text-white shrink-0" />
          <span class="text-xs font-poppins font-semibold uppercase tracking-wider text-white">
            REPUTASI TERAKREDITASI
          </span>
        </div>
        <div class="w-full rounded-t-2xl bg-[#F6F8FA] dark:bg-[#13161F] p-5 flex flex-col justify-between flex-1 gap-3">
          <p class="text-xs sm:text-[13px] font-poppins text-neutral-600 dark:text-neutral-400 leading-relaxed">
            Nama dan profil profesional Anda tercantum resmi pada sertifikat Ready for Funding yang Anda terbitkan untuk klien.
          </p>
          <div class="pt-1">
            <span class="btn-pill-action scale-90 origin-left">
              <span>Portofolio Sah BNSP</span>
            </span>
          </div>
        </div>
      </div>

    </div>

    <!-- 4 Tactical Consultation Steps -->
    <div class="space-y-4">
      <div class="max-w-xl">
        <h2 class="text-xl sm:text-2xl font-poppins font-bold text-neutral-900 dark:text-white tracking-tight">
          Alur Kerja Konsultan Pendamping di Beruang
        </h2>
        <p class="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 mt-0.5">
          Framework terstruktur 4 langkah yang memudahkan supervisi multi-klien tanpa kehilangan kualitas kedalaman audit.
        </p>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
        <div class="p-4 rounded-xl card-tactile-gopay space-y-2">
          <span class="font-poppins font-bold text-[11px] text-[#0081A0] dark:text-[#2091AA] uppercase tracking-wider">
            LANGKAH 01
          </span>
          <h4 class="font-poppins font-bold text-sm text-neutral-900 dark:text-white">
            Penugasan Klien
          </h4>
          <p class="text-xs font-poppins text-neutral-600 dark:text-neutral-400 leading-relaxed">
            Menerima penugasan UMKM yang telah menyelesaikan diagnosa awal sesuai spesialisasi sektor Anda.
          </p>
        </div>

        <div class="p-4 rounded-xl card-tactile-gopay space-y-2">
          <span class="font-poppins font-bold text-[11px] text-[#0081A0] dark:text-[#2091AA] uppercase tracking-wider">
            LANGKAH 02
          </span>
          <h4 class="font-poppins font-bold text-sm text-neutral-900 dark:text-white">
            Susun Rencana Aksi
          </h4>
          <p class="text-xs font-poppins text-neutral-600 dark:text-neutral-400 leading-relaxed">
            Menetapkan checklist prioritas mingguan (pemisahan kas, pendaftaran NIB, standarisasi resep).
          </p>
        </div>

        <div class="p-4 rounded-xl card-tactile-gopay space-y-2">
          <span class="font-poppins font-bold text-[11px] text-[#0081A0] dark:text-[#2091AA] uppercase tracking-wider">
            LANGKAH 03
          </span>
          <h4 class="font-poppins font-bold text-sm text-neutral-900 dark:text-white">
            Audit Kas & Verifikasi
          </h4>
          <p class="text-xs font-poppins text-neutral-600 dark:text-neutral-400 leading-relaxed">
            Memeriksa konsistensi rekonsiliasi kas riil 3 bulan berturut-turut dengan bantuan notifikasi AI anomaly.
          </p>
        </div>

        <div class="p-4 rounded-xl card-tactile-gopay space-y-2">
          <span class="font-poppins font-bold text-[11px] text-[#0081A0] dark:text-[#2091AA] uppercase tracking-wider">
            LANGKAH 04
          </span>
          <h4 class="font-poppins font-bold text-sm text-neutral-900 dark:text-white">
            Penerbitan Sertifikat
          </h4>
          <p class="text-xs font-poppins text-neutral-600 dark:text-neutral-400 leading-relaxed">
            Mengesahkan predikat "Ready for Funding" untuk mempublikasikan profil bisnis klien ke katalog marketplace investor.
          </p>
        </div>
      </div>
    </div>

    <!-- Final Call to Action -->
    <div class="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-[#0B2533] via-[#0F3548] to-[#124B66] text-white border border-cyan-500/20 shadow-lg flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
      <div class="max-w-xl space-y-1.5">
        <h3 class="text-lg sm:text-xl font-poppins font-bold text-white tracking-tight">
          Bergabung Bersama Jaringan Konsultan Terpilih
        </h3>
        <p class="text-xs text-cyan-100/80 font-poppins leading-relaxed">
          Kirimkan portofolio keahlian Anda dan mulailah mendampingi bisnis lokal bertransformasi menjadi usaha berdaya tahan tinggi.
        </p>
      </div>

      <div class="shrink-0">
        <NuxtLink to="/daftar" class="px-5 py-2.5 rounded-full bg-white hover:bg-neutral-100 text-[#0081A0] text-xs sm:text-sm font-poppins font-bold shadow-md inline-flex items-center gap-2 transition-all active:scale-[0.98]">
          <span>Daftar Sebagai Konsultan</span>
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
  CoinsSwapIcon,
  AlertCircleIcon,
  Award01Icon
} from '@hugeicons/core-free-icons'

useSeoMeta({
  title: 'Untuk Konsultan - Beruang',
  description: 'Program kemitraan konsultan bisnis berlisensi BNSP untuk pendampingan tata kelola dan audit UMKM Indonesia.'
})
</script>
