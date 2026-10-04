<template>
  <div class="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto font-sans space-y-16 sm:space-y-20">
    <!-- Hero Section -->
    <div class="max-w-3xl space-y-5">
      <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-100 dark:bg-primary-950/60 text-primary-700 dark:text-primary-300 border border-primary-200 dark:border-primary-800 text-xs font-heading font-semibold">
        <span class="w-1.5 h-1.5 rounded-full bg-primary-500" />
        <span>Kemitraan Praktisi & Konsultan Bisnis</span>
      </div>

      <h1 class="text-3xl sm:text-5xl lg:text-6xl font-heading font-bold text-neutral-900 dark:text-white tracking-tight leading-[1.08]">
        Dampingi UMKM Naik Kelas dengan Keahlian Nyata.
      </h1>

      <p class="text-base sm:text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed max-w-2xl">
        Salurkan kepakaran Anda dalam tata kelola keuangan dan operasional. Manfaatkan sistem supervisi cerdas berbasis AI Anomaly Alert untuk membimbing puluhan usaha binaan secara efektif dan terukur.
      </p>

      <div class="flex flex-wrap items-center gap-3 pt-2">
        <NuxtLink to="/daftar">
          <BButton variant="primary" size="lg" class="shadow-sm">
            Daftar Sebagai Konsultan Mitra
          </BButton>
        </NuxtLink>
        <NuxtLink to="/faq">
          <BButton variant="outline" size="lg">
            Pelajari Syarat Kemitraan
          </BButton>
        </NuxtLink>
      </div>
    </div>

    <!-- 3 Core Advantages (Bento Grid) -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <BCard padding="lg" class="space-y-3">
        <div class="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
          <HugeiconsIcon :icon="CoinsSwapIcon" :size="20" :stroke-width="1.75" />
        </div>
        <h3 class="font-heading font-bold text-base text-neutral-900 dark:text-white">
          Insentif Dampingan Profesional
        </h3>
        <p class="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
          Dapatkan kompensasi pendampingan terstruktur per klien UMKM serta bonus keberhasilan (success fee) saat UMKM binaan Anda berhasil mengamankan pendanaan kemitraan.
        </p>
      </BCard>

      <BCard padding="lg" class="space-y-3">
        <div class="w-10 h-10 rounded-xl bg-primary-100 dark:bg-primary-950 text-primary-600 dark:text-primary-400 flex items-center justify-center">
          <HugeiconsIcon :icon="AlertCircleIcon" :size="20" :stroke-width="1.75" />
        </div>
        <h3 class="font-heading font-bold text-base text-neutral-900 dark:text-white">
          Toolkit Cerdas AI Anomaly Alert
        </h3>
        <p class="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
          Tidak perlu memeriksa manual baris transaksi setiap hari. Algoritma kami memindai lonjakan HPP >10% dan deviasi margin kotor untuk langsung memberikan alert di dashboard Anda.
        </p>
      </BCard>

      <BCard padding="lg" class="space-y-3">
        <div class="w-10 h-10 rounded-xl bg-purple-100 dark:bg-purple-950 text-purple-600 dark:text-purple-400 flex items-center justify-center">
          <HugeiconsIcon :icon="Award01Icon" :size="20" :stroke-width="1.75" />
        </div>
        <h3 class="font-heading font-bold text-base text-neutral-900 dark:text-white">
          Portofolio & Reputasi Terakreditasi
        </h3>
        <p class="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
          Nama dan profil profesional Anda tercantum resmi pada sertifikat Ready for Funding yang Anda terbitkan, memperkuat rekam jejak konsultan Anda di mata komunitas bisnis nasional.
        </p>
      </BCard>
    </div>

    <!-- 4 Tactical Consultation Steps -->
    <div class="space-y-6">
      <div class="max-w-2xl">
        <h2 class="text-2xl sm:text-3xl font-heading font-bold text-neutral-900 dark:text-white tracking-tight">
          Alur Kerja Konsultan Pendamping di Beruang
        </h2>
        <p class="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 mt-1">
          Framework terstruktur 4 langkah yang memudahkan supervisi multi-klien tanpa kehilangan kualitas kedalaman audit.
        </p>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div class="p-6 rounded-2xl bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark space-y-3">
          <span class="font-mono font-bold text-xs text-primary-600 dark:text-primary-400">
            LANGKAH 01
          </span>
          <h4 class="font-heading font-bold text-base text-neutral-900 dark:text-white">
            Penugasan Klien Baru
          </h4>
          <p class="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
            Menerima penugasan UMKM yang telah menyelesaikan diagnosa mandiri awal sesuai spesialisasi sektor Anda.
          </p>
        </div>

        <div class="p-6 rounded-2xl bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark space-y-3">
          <span class="font-mono font-bold text-xs text-primary-600 dark:text-primary-400">
            LANGKAH 02
          </span>
          <h4 class="font-heading font-bold text-base text-neutral-900 dark:text-white">
            Susun Rencana Aksi
          </h4>
          <p class="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
            Menetapkan checklist prioritas mingguan (misal pemisahan rekening kas, pendaftaran NIB, standarisasi resep).
          </p>
        </div>

        <div class="p-6 rounded-2xl bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark space-y-3">
          <span class="font-mono font-bold text-xs text-primary-600 dark:text-primary-400">
            LANGKAH 03
          </span>
          <h4 class="font-heading font-bold text-base text-neutral-900 dark:text-white">
            Audit Kas & Verifikasi
          </h4>
          <p class="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
            Memeriksa konsistensi rekonsiliasi kas riil 3 bulan berturut-turut dengan bantuan notifikasi AI anomaly.
          </p>
        </div>

        <div class="p-6 rounded-2xl bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark space-y-3">
          <span class="font-mono font-bold text-xs text-primary-600 dark:text-primary-400">
            LANGKAH 04
          </span>
          <h4 class="font-heading font-bold text-base text-neutral-900 dark:text-white">
            Penerbitan Sertifikat
          </h4>
          <p class="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
            Mengesahkan predikat "Ready for Funding" untuk mempublikasikan profil bisnis klien ke katalog marketplace investor.
          </p>
        </div>
      </div>
    </div>

    <!-- Final Call to Action -->
    <div class="p-8 sm:p-12 rounded-3xl bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
      <div class="max-w-xl space-y-2">
        <h3 class="text-2xl sm:text-3xl font-heading font-bold text-neutral-900 dark:text-white tracking-tight">
          Bergabung Bersama Jaringan Konsultan Terpilih
        </h3>
        <p class="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
          Kirimkan portofolio keahlian Anda dan mulailah mendampingi bisnis lokal bertransformasi menjadi usaha yang berdaya tahan tinggi.
        </p>
      </div>

      <div class="shrink-0">
        <NuxtLink to="/daftar">
          <BButton variant="primary" size="lg">
            Daftar Sebagai Konsultan
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
  CoinsSwapIcon,
  AlertCircleIcon,
  Award01Icon
} from '@hugeicons/core-free-icons'
</script>
