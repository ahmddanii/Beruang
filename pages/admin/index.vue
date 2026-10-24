<template>
  <div ref="adminOverviewRef" class="space-y-6 sm:space-y-8 pb-16 font-poppins text-neutral-900 dark:text-neutral-100">
    <!-- 1. Top Header: Identical to UMKM Beranda -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 min-h-[44px]">
      <div class="flex items-center gap-2.5 sm:gap-3">
        <HugeiconsIcon
          :icon="Home03Icon"
          :size="26"
          :stroke-width="2.2"
          class="text-neutral-900 dark:text-white shrink-0"
        />
        <h1 class="font-poppins font-semibold text-2xl sm:text-3xl text-neutral-900 dark:text-white tracking-tight leading-tight">
          Beranda
        </h1>
      </div>

      <div class="flex items-center gap-2.5 shrink-0 w-full sm:w-auto [&>*]:w-full sm:[&>*]:w-auto">
        <NuxtLink
          to="/admin/umkm"
          class="btn-pill-action justify-center"
        >
          <HugeiconsIcon :icon="Store01Icon" :size="16" :stroke-width="2" />
          <span>Kemitraan</span>
        </NuxtLink>
        <NuxtLink
          to="/admin/penugasan"
          class="btn-pill-action-green justify-center"
        >
          <HugeiconsIcon :icon="UserAdd01Icon" :size="16" :stroke-width="2.2" />
          <span>Tugaskan</span>
        </NuxtLink>
      </div>
    </div>

    <!-- 2. Metric Container: 4 Equal Width Cards (Identical .stat-card-clean Typography & Geometry to UMKM Beranda) -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 items-stretch w-full">
      <!-- Card 1: Total UMKM -->
      <div class="gsap-admin-card gsap-stat-card flex-1 w-full">
        <div class="stat-card-clean transition-all duration-200">
          <div class="flex items-center justify-between w-full gap-2">
            <div class="flex items-center gap-2 sm:gap-2.5 min-w-0">
              <div class="stat-card-icon-box">
                <HugeiconsIcon :icon="Store01Icon" :size="17" :stroke-width="2.0" class="text-[#156374] dark:text-[#50AABF] shrink-0" />
              </div>
              <span class="text-[13px] xl:text-[14px] font-poppins font-semibold text-neutral-800 dark:text-neutral-100 capitalize truncate tracking-[-0.01em]">
                Total UMKM
              </span>
            </div>
            <div class="stat-card-badge badge-green">
              <span>+12 Baru</span>
            </div>
          </div>

          <div class="my-auto py-2.5 sm:py-3.5">
            <span class="text-xl sm:text-[22px] lg:text-[21px] xl:text-[24px] font-poppins font-semibold text-neutral-900 dark:text-white tabular-nums tracking-[-0.02em] whitespace-nowrap block leading-tight">
              142 Usaha
            </span>
          </div>

          <div class="stat-card-actions">
            <NuxtLink to="/admin/umkm" class="btn-pill-action">
              <span>Lihat UMKM</span>
              <HugeiconsIcon :icon="ArrowRight01Icon" :size="16" :stroke-width="2" />
            </NuxtLink>
          </div>
        </div>
      </div>

      <!-- Card 2: Konsultan Aktif -->
      <div class="gsap-admin-card gsap-stat-card flex-1 w-full">
        <div class="stat-card-clean transition-all duration-200">
          <div class="flex items-center justify-between w-full gap-2">
            <div class="flex items-center gap-2 sm:gap-2.5 min-w-0">
              <div class="stat-card-icon-box">
                <HugeiconsIcon :icon="Briefcase01Icon" :size="17" :stroke-width="2.0" class="text-[#156374] dark:text-[#50AABF] shrink-0" />
              </div>
              <span class="text-[13px] xl:text-[14px] font-poppins font-semibold text-neutral-800 dark:text-neutral-100 capitalize truncate tracking-[-0.01em]">
                Konsultan Aktif
              </span>
            </div>
            <div class="stat-card-badge badge-green">
              <span>BNSP</span>
            </div>
          </div>

          <div class="my-auto py-2.5 sm:py-3.5">
            <span class="text-xl sm:text-[22px] lg:text-[21px] xl:text-[24px] font-poppins font-semibold text-neutral-900 dark:text-white tabular-nums tracking-[-0.02em] whitespace-nowrap block leading-tight">
              28 Mitra
            </span>
          </div>

          <div class="stat-card-actions">
            <NuxtLink to="/admin/penugasan" class="btn-pill-action">
              <span>Penugasan</span>
              <HugeiconsIcon :icon="ArrowRight01Icon" :size="16" :stroke-width="2" />
            </NuxtLink>
          </div>
        </div>
      </div>

      <!-- Card 3: Siap Didanai -->
      <div class="gsap-admin-card gsap-stat-card flex-1 w-full">
        <div class="stat-card-clean transition-all duration-200">
          <div class="flex items-center justify-between w-full gap-2">
            <div class="flex items-center gap-2 sm:gap-2.5 min-w-0">
              <div class="stat-card-icon-box">
                <HugeiconsIcon :icon="Award01Icon" :size="17" :stroke-width="2.0" class="text-[#156374] dark:text-[#50AABF] shrink-0" />
              </div>
              <span class="text-[13px] xl:text-[14px] font-poppins font-semibold text-neutral-800 dark:text-neutral-100 capitalize truncate tracking-[-0.01em]">
                Siap Didanai
              </span>
            </div>
            <div class="stat-card-badge badge-green">
              <span>Grade A</span>
            </div>
          </div>

          <div class="my-auto py-2.5 sm:py-3.5">
            <span class="text-xl sm:text-[22px] lg:text-[21px] xl:text-[24px] font-poppins font-semibold text-neutral-900 dark:text-white tabular-nums tracking-[-0.02em] whitespace-nowrap block leading-tight">
              38 Usaha
            </span>
          </div>

          <div class="stat-card-actions">
            <NuxtLink to="/admin/sertifikasi" class="btn-pill-action">
              <span>Sertifikasi</span>
              <HugeiconsIcon :icon="ArrowRight01Icon" :size="16" :stroke-width="2" />
            </NuxtLink>
          </div>
        </div>
      </div>

      <!-- Card 4: Modal Tersalur -->
      <div class="gsap-admin-card gsap-stat-card flex-1 w-full">
        <div class="stat-card-clean transition-all duration-200">
          <div class="flex items-center justify-between w-full gap-2">
            <div class="flex items-center gap-2 sm:gap-2.5 min-w-0">
              <div class="stat-card-icon-box">
                <HugeiconsIcon :icon="Coins01Icon" :size="17" :stroke-width="2.0" class="text-[#156374] dark:text-[#50AABF] shrink-0" />
              </div>
              <span class="text-[13px] xl:text-[14px] font-poppins font-semibold text-neutral-800 dark:text-neutral-100 capitalize truncate tracking-[-0.01em]">
                Modal Tersalur
              </span>
            </div>
            <div class="stat-card-badge badge-green">
              <span>Lancar</span>
            </div>
          </div>

          <div class="my-auto py-2.5 sm:py-3.5">
            <span class="text-xl sm:text-[22px] lg:text-[21px] xl:text-[24px] font-poppins font-semibold text-neutral-900 dark:text-white tabular-nums tracking-[-0.02em] whitespace-nowrap block leading-tight">
              Rp 4.200.000.000
            </span>
          </div>

          <div class="stat-card-actions">
            <NuxtLink to="/admin/investasi" class="btn-pill-action">
              <span>Alur Modal</span>
              <HugeiconsIcon :icon="ArrowRight01Icon" :size="16" :stroke-width="2" />
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>

    <!-- 3. Kemitraan UMKM Terkini (Tanpa Skor Pills, Menggunakan Tombol Putih Standar & Skala Teks UMKM) -->
    <section class="gsap-admin-section card-tactile-gopay rounded-[18px] p-6 sm:p-8 space-y-6 font-poppins">
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-neutral-100 dark:border-neutral-800/80">
        <div class="min-w-0 pr-2 space-y-1.5">
          <h2 class="text-lg sm:text-[21px] font-poppins font-bold text-neutral-900 dark:text-white tracking-tight">
            Kemitraan UMKM Terkini
          </h2>
          <p class="text-xs sm:text-[14px] font-poppins text-neutral-500 dark:text-neutral-400 leading-normal">
            Pemetaan UMKM binaan, konsultan pendamping yang ditugaskan, dan investor yang sedang terhubung.
          </p>
        </div>

        <NuxtLink
          to="/admin/umkm"
          class="btn-pill-action shrink-0 self-start sm:self-center"
        >
          <span>Lihat Semua</span>
          <HugeiconsIcon :icon="ArrowRight01Icon" :size="16" :stroke-width="2" />
        </NuxtLink>
      </div>

      <div class="space-y-3">
        <div
          v-for="item in topPartnerships"
          :key="item.id"
          class="p-4 sm:p-5 rounded-[14px] border border-[#CBD5E1] dark:border-neutral-800 bg-white dark:bg-[#13161F] flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4"
        >
          <!-- UMKM -->
          <div class="flex items-center gap-3.5 min-w-[230px]">
            <div class="w-10 h-10 rounded-full bg-[#E6F4F7] dark:bg-[#156374]/25 text-[#156374] dark:text-[#50AABF] flex items-center justify-center font-semibold text-sm shrink-0">
              {{ item.name.slice(0, 2).toUpperCase() }}
            </div>
            <div>
              <span class="font-semibold text-sm sm:text-base text-neutral-900 dark:text-white block leading-snug">
                {{ item.name }}
              </span>
              <span class="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 block mt-0.5">
                {{ item.owner }} • {{ item.sector }}
              </span>
            </div>
          </div>

          <!-- Consultant -->
          <div class="flex items-center gap-2.5 min-w-[210px]">
            <HugeiconsIcon :icon="Briefcase01Icon" :size="18" class="text-[#156374] dark:text-[#50AABF] shrink-0" />
            <div>
              <span class="text-xs font-medium text-neutral-500 dark:text-neutral-400 block">Konsultan Pendamping</span>
              <span class="text-sm font-semibold text-neutral-900 dark:text-white block mt-0.5">
                {{ item.consultantName }}
              </span>
            </div>
          </div>

          <!-- Investor -->
          <div class="flex items-center gap-2.5 min-w-[230px]">
            <HugeiconsIcon :icon="Coins01Icon" :size="18" class="text-[#00800e] dark:text-[#00C058] shrink-0" />
            <div>
              <span class="text-xs font-medium text-neutral-500 dark:text-neutral-400 block">Investor Terhubung</span>
              <span class="text-sm font-semibold text-neutral-900 dark:text-white block mt-0.5">
                {{ item.investorName }}
              </span>
              <span class="text-xs text-neutral-500 dark:text-neutral-400">
                {{ item.investorStage }}
              </span>
            </div>
          </div>

          <!-- Action Button Only (Score Pill Removed as Requested) -->
          <div class="flex items-center gap-2.5 shrink-0 self-end lg:self-center">
            <NuxtLink
              to="/admin/umkm"
              class="btn-pill-action"
            >
              <span>Detail</span>
              <HugeiconsIcon :icon="ArrowRight01Icon" :size="16" :stroke-width="2" />
            </NuxtLink>
          </div>
        </div>
      </div>
    </section>

    <!-- 4. Distribusi Kesiapan & Aktivitas Ekosistem -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-stretch">
      <!-- 1. Distribusi Kesiapan -->
      <section class="gsap-admin-section card-tactile-gopay rounded-[18px] p-6 sm:p-8 flex flex-col justify-between space-y-6 font-poppins">
        <div class="flex items-center justify-between gap-4">
          <div class="min-w-0 pr-2 space-y-1.5">
            <h2 class="text-lg sm:text-[21px] font-poppins font-bold text-neutral-900 dark:text-white tracking-tight">
              Distribusi Kesiapan UMKM
            </h2>
            <p class="text-xs sm:text-[14px] font-poppins text-neutral-500 dark:text-neutral-400 leading-normal">
              Proporsi kesiapan usaha binaan berdasarkan penilaian 5 pilar fundamental.
            </p>
          </div>
          <NuxtLink
            to="/admin/sertifikasi"
            class="btn-pill-action shrink-0"
          >
            <span>Sertifikasi</span>
            <HugeiconsIcon :icon="ArrowRight01Icon" :size="16" :stroke-width="2" />
          </NuxtLink>
        </div>

        <div class="space-y-5 pt-1">
          <div class="space-y-2">
            <div class="flex justify-between text-sm">
              <span class="font-semibold text-neutral-800 dark:text-neutral-200">Grade A (Siap Didanai • Skor ≥ 75)</span>
              <strong class="font-semibold text-[#00800e] dark:text-[#00C058] tabular-nums">38 Usaha (26,7%)</strong>
            </div>
            <div class="w-full h-3 rounded-full bg-neutral-100 dark:bg-neutral-800 border border-slate-200/70 dark:border-neutral-700 overflow-hidden">
              <div class="h-full bg-[#00800e] dark:bg-[#00C058] rounded-full" style="width: 26.7%" />
            </div>
          </div>

          <div class="space-y-2">
            <div class="flex justify-between text-sm">
              <span class="font-semibold text-neutral-800 dark:text-neutral-200">Grade B (Pendampingan • Skor 60–74)</span>
              <strong class="font-semibold text-[#156374] dark:text-[#50AABF] tabular-nums">74 Usaha (52,1%)</strong>
            </div>
            <div class="w-full h-3 rounded-full bg-neutral-100 dark:bg-neutral-800 border border-slate-200/70 dark:border-neutral-700 overflow-hidden">
              <div class="h-full bg-[#2091AA] rounded-full" style="width: 52.1%" />
            </div>
          </div>

          <div class="space-y-2">
            <div class="flex justify-between text-sm">
              <span class="font-semibold text-neutral-800 dark:text-neutral-200">Grade C (Tahap Awal • Skor &lt; 60)</span>
              <strong class="font-semibold text-amber-600 tabular-nums">30 Usaha (21,2%)</strong>
            </div>
            <div class="w-full h-3 rounded-full bg-neutral-100 dark:bg-neutral-800 border border-slate-200/70 dark:border-neutral-700 overflow-hidden">
              <div class="h-full bg-amber-500 rounded-full" style="width: 21.2%" />
            </div>
          </div>
        </div>
      </section>

      <!-- 2. Aktivitas Ekosistem Terkini -->
      <section class="gsap-admin-section card-tactile-gopay rounded-[18px] p-6 sm:p-8 flex flex-col justify-between space-y-6 font-poppins">
        <div class="flex items-center justify-between gap-4">
          <div class="min-w-0 pr-2 space-y-1.5">
            <h2 class="text-lg sm:text-[21px] font-poppins font-bold text-neutral-900 dark:text-white tracking-tight">
              Aktivitas Ekosistem Terkini
            </h2>
            <p class="text-xs sm:text-[14px] font-poppins text-neutral-500 dark:text-neutral-400 leading-normal">
              Catatan interaksi terbaru antara pelaku UMKM, konsultan, dan investor.
            </p>
          </div>
          <NuxtLink
            to="/admin/investasi"
            class="btn-pill-action shrink-0"
          >
            <span>Alur Modal</span>
            <HugeiconsIcon :icon="ArrowRight01Icon" :size="16" :stroke-width="2" />
          </NuxtLink>
        </div>

        <div class="divide-y divide-neutral-100 dark:divide-neutral-800/80">
          <div
            v-for="act in activityList"
            :key="act.id"
            class="py-3.5 first:pt-0 last:pb-0 space-y-1"
          >
            <div class="flex items-center justify-between gap-2 text-sm">
              <span class="font-semibold text-neutral-900 dark:text-white">
                {{ act.title }}
              </span>
              <span class="text-xs text-neutral-500 dark:text-neutral-400 tabular-nums shrink-0">
                {{ act.time }}
              </span>
            </div>
            <p class="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
              {{ act.desc }}
            </p>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { gsap } from 'gsap'
import { HugeiconsIcon } from '@hugeicons/vue'
import {
  Home03Icon,
  Store01Icon,
  Briefcase01Icon,
  Award01Icon,
  Coins01Icon,
  UserAdd01Icon,
  ArrowRight01Icon
} from '@hugeicons/core-free-icons'

definePageMeta({
  layout: 'dashboard',
  hideHeader: true
})

useHead({
  title: 'Beranda — Admin Beruang'
})

const adminOverviewRef = ref<HTMLElement | null>(null)
let gsapCtx: gsap.Context | null = null

const topPartnerships = [
  {
    id: 1,
    name: 'Kopi Kenangan Senja',
    owner: 'Budi Santoso',
    sector: 'Kuliner & F&B',
    consultantName: 'Rendra Pratama, S.E., Ak.',
    investorName: 'Nusantara Impact Capital',
    investorStage: 'Ruang Data Terbuka • Rp 250 Jt'
  },
  {
    id: 2,
    name: 'Batik Sekar Jagad',
    owner: 'Siti Lestari',
    sector: 'Kriya & Tekstil',
    consultantName: 'Nadia Kusuma, MBA, CFP',
    investorName: 'Nusantara Impact Capital',
    investorStage: 'Ruang Data Terbuka • Rp 320 Jt'
  },
  {
    id: 3,
    name: 'Sayur Hidroponik Segar',
    owner: 'Hendra Wijaya',
    sector: 'Agribisnis',
    consultantName: 'Rendra Pratama, S.E., Ak.',
    investorName: 'Koperasi Pemodal Lokal',
    investorStage: 'Pantau Portofolio • Rp 120 Jt'
  }
]

const activityList = [
  {
    id: 1,
    title: 'Kopi Kenangan Senja Mengunggah Kas Bulanan',
    desc: 'Pemasukan kas bulan berjalan sebesar Rp 100.000.000 berhasil diverifikasi konsultan.',
    time: '12 menit lalu'
  },
  {
    id: 2,
    title: 'Rendra Pratama Memvalidasi Legalitas Usaha',
    desc: 'Sertifikat Halal dan NIB milik Kopi Kenangan Senja dinyatakan lengkap.',
    time: '45 menit lalu'
  },
  {
    id: 3,
    title: 'Nusantara Impact Capital Mengajukan Minat Modal',
    desc: 'Tiket minat pendanaan Rp 250.000.000 diajukan pada Ruang Data Kopi Kenangan Senja.',
    time: '2 jam lalu'
  },
  {
    id: 4,
    title: 'Batik Sekar Jagad Meraih Grade A',
    desc: 'Lolos sertifikasi 5 pilar fundamental dengan skor 88/100.',
    time: '4 jam lalu'
  }
]

onMounted(() => {
  if (!adminOverviewRef.value) return
  gsapCtx = gsap.context(() => {
    gsap.fromTo(
      '.gsap-admin-card',
      { opacity: 0, y: 14 },
      { opacity: 1, y: 0, duration: 0.4, stagger: 0.06, ease: 'power2.out', clearProps: 'transform' }
    )
    gsap.fromTo(
      '.gsap-admin-section',
      { opacity: 0, y: 16 },
      { opacity: 1, y: 0, duration: 0.45, stagger: 0.08, delay: 0.1, ease: 'power2.out', clearProps: 'transform' }
    )
  }, adminOverviewRef.value)
})

onUnmounted(() => {
  gsapCtx?.revert()
})
</script>
