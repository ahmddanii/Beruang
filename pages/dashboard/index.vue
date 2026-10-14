<template>
  <div class="space-y-8 sm:space-y-10 pb-24 font-sans text-neutral-900 dark:text-neutral-100">

    <!-- Greeting & Profile Header -->
    <header class="gsap-header pt-2 pb-6 border-b border-neutral-200/80 dark:border-neutral-800/80 relative z-10">
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div class="flex items-start sm:items-center gap-4 min-w-0">
          <!-- Mini Avatar Link to Profile Page -->
          <NuxtLink
            to="/dashboard/profile"
            class="relative group shrink-0"
            title="Buka Halaman Profil"
          >
            <img
              :src="umkmStore.profile.ownerAvatarUrl || authStore.currentUser?.avatar || '/images/user-profile.png'"
              :alt="umkmName"
              class="w-14 h-14 sm:w-16 sm:h-16 rounded-full object-cover ring-2 ring-neutral-200/80 dark:ring-neutral-800 group-hover:ring-blue-500 transition-all shadow-2xs"
            />
            <span class="absolute bottom-0 right-0 w-4 h-4 rounded-full bg-emerald-500 ring-2 ring-white dark:ring-[#0F1014]" />
          </NuxtLink>

          <div class="space-y-1 min-w-0 text-left">
            <div class="flex items-center gap-2 flex-wrap">
              <h1 class="text-[26px] sm:text-[34px] leading-[32px] sm:leading-[44px] font-heading font-bold text-neutral-900 dark:text-white tracking-tight">
                {{ umkmName }}
              </h1>

              <!-- Semantic Info Badge: Terverifikasi (H: 24px -> R: 12px) -->
              <span class="inline-flex items-center gap-1 h-6 px-3 rounded-[12px] bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 border border-blue-200/80 dark:border-blue-800 text-[12px] leading-[16px] font-sans font-semibold">
                <HugeiconsIcon :icon="CheckmarkBadge01Icon" :size="14" />
                <span>Terverifikasi</span>
              </span>
            </div>

            <!-- Ideal Text Length (max-w-2xl) & WCAG Line Height 24px -->
            <p class="text-[14px] leading-[20px] sm:text-[16px] sm:leading-[24px] text-neutral-600 dark:text-neutral-300 font-sans max-w-2xl text-left">
              {{ umkmDescription || 'Spesialis kopi arabika susu gula aren dengan 3 outlet aktif di Bandung & margin kotor stabil di atas 48%.' }}
            </p>
          </div>
        </div>

        <!-- Action Buttons: Catat Kas & Edit Profile (H: 48px -> R: 16px) -->
        <div class="flex items-center gap-3 shrink-0 w-full sm:w-auto">
          <button
            type="button"
            class="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 h-12 px-5 rounded-[16px] bg-blue-600 hover:bg-blue-700 text-white text-[14px] leading-[20px] font-semibold shadow-xs transition-all active:scale-95 cursor-pointer"
            @click="isTransactionDrawerOpen = true"
          >
            <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M12 5v14m-7-7h14" />
            </svg>
            <span>Catat Kas Baru</span>
          </button>

          <NuxtLink
            to="/dashboard/profile"
            class="inline-flex items-center justify-center gap-2 h-12 px-4 rounded-[16px] bg-white dark:bg-[#18191E] border border-neutral-200/90 dark:border-neutral-800 hover:border-neutral-400 dark:hover:border-neutral-600 text-[14px] leading-[20px] font-medium text-neutral-700 dark:text-neutral-200 hover:text-neutral-900 dark:hover:text-white transition-all shadow-2xs active:scale-95 cursor-pointer"
            title="Edit Profile Usaha"
          >
            <HugeiconsIcon :icon="PencilEdit01Icon" :size="16" :stroke-width="1.8" />
            <span>Edit Profil</span>
          </NuxtLink>
        </div>
      </div>
    </header>

    <!-- 1. Metric Grid: 4 Kartu Keuangan Golden Ratio & Spatial Grid Kelipatan 8 -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 xl:gap-6 items-stretch">
      <!-- Card 1: Laba Bersih Bulan Ini (Semantic: Success) -->
      <div class="gsap-stat-card flex-1">
        <div class="group relative rounded-[24px] border border-neutral-200/90 dark:border-neutral-800 hover:border-emerald-400/80 dark:hover:border-emerald-500/60 bg-white dark:bg-[#15161A] p-5 sm:p-6 flex flex-col justify-between select-none h-full transition-all duration-150 shadow-2xs text-left">
          <div class="flex items-center justify-between gap-2">
            <span class="text-[14px] leading-[20px] font-medium text-neutral-600 dark:text-neutral-400">
              Laba Bersih
            </span>
            <!-- Fully Rounded Icon (H: 32px -> R: 16px) -->
            <span class="w-8 h-8 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
              <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="9" />
                <path d="M14.8 9A2 2 0 0 0 13 8h-2a2 2 0 1 0 0 4h2a2 2 0 1 1 0 4h-2a2 2 0 0 1-1.8-1" />
                <path d="M12 6v2m0 8v2" />
              </svg>
            </span>
          </div>

          <!-- Golden Ratio & Fibonacci Metric Value (21px on 4-col lg / 26px on mobile & xl) -->
          <div class="mt-4">
            <span class="text-[24px] sm:text-[24px] lg:text-[21px] xl:text-[26px] leading-[30px] sm:leading-[32px] lg:leading-[28px] xl:leading-[32px] font-bold text-neutral-900 dark:text-white tabular-nums tracking-tight whitespace-nowrap block">
              Rp 32.600.000
            </span>
          </div>

          <!-- Micro Performance (Semantic Success: Single Clean Line) -->
          <div class="mt-4 pt-3 border-t border-neutral-100 dark:border-neutral-800/80 flex items-center justify-between gap-2 text-[12px] leading-[16px]">
            <span class="inline-flex items-center gap-1 font-semibold text-emerald-600 dark:text-emerald-400 shrink-0">
              <svg class="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <path d="m18 15-6-6-6 6"/>
              </svg>
              <span>+12%</span>
            </span>
            <span class="text-neutral-500 dark:text-neutral-400 text-right shrink-0">Bulan lalu</span>
          </div>
        </div>
      </div>

      <!-- Card 2: Saldo Kas (Semantic: Info) -->
      <div class="gsap-stat-card flex-1">
        <div class="group relative rounded-[24px] border border-neutral-200/90 dark:border-neutral-800 hover:border-blue-400/80 dark:hover:border-blue-500/60 bg-white dark:bg-[#15161A] p-5 sm:p-6 flex flex-col justify-between select-none h-full transition-all duration-150 shadow-2xs text-left">
          <div class="flex items-center justify-between gap-2">
            <span class="text-[14px] leading-[20px] font-medium text-neutral-600 dark:text-neutral-400">
              Saldo Kas
            </span>
            <!-- Fully Rounded Icon (H: 32px -> R: 16px) -->
            <span class="w-8 h-8 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
              <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                <rect x="2" y="4" width="20" height="16" rx="3" />
                <path d="M16 12h.01" />
              </svg>
            </span>
          </div>

          <!-- Golden Ratio & Fibonacci Metric Value -->
          <div class="mt-4">
            <span class="text-[24px] sm:text-[24px] lg:text-[21px] xl:text-[26px] leading-[30px] sm:leading-[32px] lg:leading-[28px] xl:leading-[32px] font-bold text-neutral-900 dark:text-white tabular-nums tracking-tight whitespace-nowrap block">
              Rp 75.500.000
            </span>
          </div>

          <!-- Micro Performance (Semantic Info: Single Clean Line) -->
          <div class="mt-4 pt-3 border-t border-neutral-100 dark:border-neutral-800/80 flex items-center justify-between gap-2 text-[12px] leading-[16px]">
            <span class="inline-flex items-center gap-1.5 font-semibold text-blue-600 dark:text-blue-400 shrink-0">
              <span class="w-2 h-2 rounded-full bg-blue-500 shrink-0"></span>
              <span>Aman</span>
            </span>
            <span class="text-neutral-500 dark:text-neutral-400 text-right shrink-0">3-4 bulan</span>
          </div>
        </div>
      </div>

      <!-- Card 3: Arus Kas Masuk (Semantic: Success) -->
      <div class="gsap-stat-card flex-1">
        <div class="group relative rounded-[24px] border border-neutral-200/90 dark:border-neutral-800 hover:border-emerald-400/80 dark:hover:border-emerald-500/60 bg-white dark:bg-[#15161A] p-5 sm:p-6 flex flex-col justify-between select-none h-full transition-all duration-150 shadow-2xs text-left">
          <div class="flex items-center justify-between gap-2">
            <span class="text-[14px] leading-[20px] font-medium text-neutral-600 dark:text-neutral-400">
              Uang Masuk
            </span>
            <!-- Fully Rounded Icon (H: 32px -> R: 16px) -->
            <span class="w-8 h-8 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
              <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">
                <path d="M17 7 7 17" />
                <path d="M17 17H7V7" />
              </svg>
            </span>
          </div>

          <!-- Golden Ratio & Fibonacci Metric Value -->
          <div class="mt-4">
            <span class="text-[24px] sm:text-[24px] lg:text-[21px] xl:text-[26px] leading-[30px] sm:leading-[32px] lg:leading-[28px] xl:leading-[32px] font-bold text-neutral-900 dark:text-white tabular-nums tracking-tight whitespace-nowrap block">
              Rp 100.000.000
            </span>
          </div>

          <!-- Micro Performance (Semantic Success: Single Clean Line) -->
          <div class="mt-4 pt-3 border-t border-neutral-100 dark:border-neutral-800/80 flex items-center justify-between gap-2 text-[12px] leading-[16px]">
            <span class="inline-flex items-center gap-1 font-semibold text-emerald-600 dark:text-emerald-400 shrink-0">
              <svg class="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <path d="m18 15-6-6-6 6"/>
              </svg>
              <span>+9.8%</span>
            </span>
            <span class="text-neutral-500 dark:text-neutral-400 text-right shrink-0">30 hari</span>
          </div>
        </div>
      </div>

      <!-- Card 4: Arus Kas Keluar (Semantic: Error / Pengeluaran) -->
      <div class="gsap-stat-card flex-1">
        <div class="group relative rounded-[24px] border border-neutral-200/90 dark:border-neutral-800 hover:border-rose-400/80 dark:hover:border-rose-500/60 bg-white dark:bg-[#15161A] p-5 sm:p-6 flex flex-col justify-between select-none h-full transition-all duration-150 shadow-2xs text-left">
          <div class="flex items-center justify-between gap-2">
            <span class="text-[14px] leading-[20px] font-medium text-neutral-600 dark:text-neutral-400">
              Uang Keluar
            </span>
            <!-- Fully Rounded Icon (H: 32px -> R: 16px) -->
            <span class="w-8 h-8 rounded-full bg-rose-500/10 text-rose-600 dark:text-rose-400 flex items-center justify-center shrink-0">
              <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">
                <path d="M7 17 17 7" />
                <path d="M7 7h10v10" />
              </svg>
            </span>
          </div>

          <!-- Golden Ratio & Fibonacci Metric Value -->
          <div class="mt-4">
            <span class="text-[24px] sm:text-[24px] lg:text-[21px] xl:text-[26px] leading-[30px] sm:leading-[32px] lg:leading-[28px] xl:leading-[32px] font-bold text-neutral-900 dark:text-white tabular-nums tracking-tight whitespace-nowrap block">
              Rp 67.400.000
            </span>
          </div>

          <!-- Micro Performance (Semantic Warning: Single Clean Line) -->
          <div class="mt-4 pt-3 border-t border-neutral-100 dark:border-neutral-800/80 flex items-center justify-between gap-2 text-[12px] leading-[16px]">
            <span class="inline-flex items-center gap-1 font-semibold text-rose-600 dark:text-rose-400 shrink-0">
              <svg class="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <path d="m6 9 6 6 6-6"/>
              </svg>
              <span>Terkendali</span>
            </span>
            <span class="text-neutral-500 dark:text-neutral-400 text-right shrink-0">Bulan ini</span>
          </div>
        </div>
      </div>
    </div>

    <!-- 2. Hero Section: Grafik Tren Saldo Kas Toko (Law of Proximity & Spatial Padding) -->
    <div class="gsap-hero-chart bg-white dark:bg-[#15161A] border border-neutral-200/90 dark:border-neutral-800 rounded-[24px] p-6 sm:p-8 space-y-6 text-left">
      <!-- Heading H2: Jarak atas 32px (dari space-y), jarak bawah ke deskripsi 8px, ke konten 24px -->
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-neutral-100 dark:border-neutral-800/80">
        <div>
          <h2 class="text-[21px] sm:text-[26px] leading-[28px] sm:leading-[32px] font-heading font-semibold text-neutral-900 dark:text-white tracking-tight text-left">
            Tren Saldo Kas Toko
          </h2>
          <p class="mt-2 text-[14px] leading-[20px] sm:text-[16px] sm:leading-[24px] text-neutral-600 dark:text-neutral-300 font-sans max-w-xl text-left">
            Grafik perkembangan saldo kas riil toko Anda tiap bulan secara berkala.
          </p>
        </div>

        <div class="flex flex-wrap items-center gap-4 justify-between sm:justify-end">
          <!-- Legend Indicator (Mikro kelipatan 4) -->
          <div class="flex items-center gap-2 text-[12px] leading-[16px] font-sans font-medium">
            <span class="flex items-center gap-1">
              <span class="w-3 h-0.5 rounded-full bg-[#0066FF]" />
              <span class="w-2 h-2 rounded-full border-2 border-[#0066FF] bg-white dark:bg-[#15161A]" />
              <span class="w-3 h-0.5 rounded-full bg-[#0066FF]" />
            </span>
            <span class="text-neutral-700 dark:text-neutral-300 font-semibold">Saldo Kas</span>
          </div>

          <!-- Time Period Filters: Fully Rounded (H: 36px -> R: 18px / Inner Button H: 30px -> R: 15px) -->
          <div class="inline-flex p-1 rounded-[18px] bg-neutral-100 dark:bg-neutral-800/80 border border-neutral-200/80 dark:border-neutral-700/80">
            <button
              v-for="opt in heroFilterOptions"
              :key="opt.id"
              type="button"
              :class="[
                'px-3 py-1 rounded-[14px] text-[12px] leading-[16px] font-sans font-semibold transition-all cursor-pointer',
                heroPeriodFilter === opt.id
                  ? 'bg-white dark:bg-[#15161A] text-neutral-900 dark:text-white shadow-2xs'
                  : 'text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white'
              ]"
              @click="setHeroPeriodFilter(opt.id)"
            >
              {{ opt.label }}
            </button>
          </div>
        </div>
      </div>

      <!-- Line Chart Canvas (Tinggi kelipatan 8 & 32: 256px sm: 288px md: 320px) -->
      <div
        class="relative w-full h-64 sm:h-72 md:h-80 pt-2"
        @mouseleave="onHeroChartMouseLeave"
      >
        <canvas ref="heroChartCanvas" class="w-full h-full"></canvas>
      </div>

      <!-- Quick Summary Footer: Padding atas 16px (pt-4) -->
      <div class="pt-4 border-t border-neutral-100 dark:border-neutral-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-[13px] leading-[20px] font-sans text-neutral-500 dark:text-neutral-400">
        <div class="flex items-center gap-2">
          <span class="w-2 h-2 rounded-full bg-blue-500 shrink-0" />
          <span>Sentuh atau arahkan kursor ke garis grafik untuk melihat saldo kas per bulan.</span>
        </div>
        <div class="flex flex-wrap items-center gap-4 tabular-nums">
          <span>Periode: <strong class="text-neutral-900 dark:text-white font-semibold">{{ heroFilteredRecords[0]?.month }} - {{ heroFilteredRecords[heroFilteredRecords.length - 1]?.month }} {{ heroFilteredRecords[heroFilteredRecords.length - 1]?.year }}</strong></span>
          <span>Posisi Kas Terkini: <strong class="text-blue-600 dark:text-blue-400 font-bold font-mono text-[14px]">Rp {{ (heroFilteredRecords[heroFilteredRecords.length - 1]?.cashBalance || 75500000).toLocaleString('id-ID') }}</strong></span>
        </div>
      </div>
    </div>

    <!-- 3. Buku Catatan Kas Bulanan (Law of Proximity, Nested Radius, & De-cluttered View) -->
    <div id="verified-cashbook-table" class="bg-white dark:bg-[#15161A] border border-neutral-200/90 dark:border-neutral-800 rounded-[24px] p-6 sm:p-8 space-y-6 text-left">
      <!-- Section Header -->
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-neutral-100 dark:border-neutral-800/80">
        <div>
          <h2 class="text-[21px] sm:text-[26px] leading-[28px] sm:leading-[32px] font-heading font-semibold text-neutral-900 dark:text-white tracking-tight text-left">
            Laporan Buku Kas Bulanan
          </h2>
          <p class="mt-2 text-[14px] leading-[20px] sm:text-[16px] sm:leading-[24px] text-neutral-600 dark:text-neutral-300 font-sans max-w-xl text-left">
            Arus kas bulanan yang sudah dicek dan terverifikasi rapi sesuai standar akuntansi UMKM.
          </p>
        </div>

        <button
          type="button"
          class="inline-flex items-center justify-center gap-2 h-10 px-4 rounded-[12px] border border-neutral-300 dark:border-neutral-700 text-[13px] leading-[16px] font-heading font-semibold text-neutral-800 dark:text-neutral-100 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors active:scale-[0.96] cursor-pointer"
          @click="isTransactionDrawerOpen = true"
        >
          <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
          </svg>
          <span>Input Kas Baru</span>
        </button>
      </div>

      <!-- DESKTOP / TABLET VIEW: Crisp Table (md ke atas) -->
      <div class="hidden md:block overflow-x-auto">
        <table class="w-full text-left font-sans">
          <thead>
            <tr class="border-b border-neutral-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-400 font-heading text-[12px] leading-[16px] font-bold uppercase tracking-wider">
              <th class="py-3.5 px-4 text-left">Bulan Periode</th>
              <th class="py-3.5 px-4 text-right">Penjualan (Omzet)</th>
              <th class="py-3.5 px-4 text-right">Biaya Bahan (HPP)</th>
              <th class="py-3.5 px-4 text-right">Gaji & Sewa</th>
              <th class="py-3.5 px-4 text-right font-bold text-neutral-900 dark:text-white">Uang Bersih (Laba)</th>
              <th class="py-3.5 px-4 text-center">Status Audit</th>
              <th class="py-3.5 px-4 text-right">Aksi</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-neutral-100 dark:divide-neutral-800 text-neutral-800 dark:text-neutral-200">
            <tr
              v-for="rec in displayedDesktopRecords"
              :key="rec.month"
              class="hover:bg-neutral-50/70 dark:hover:bg-neutral-900/60 transition-colors"
            >
              <td class="py-4 px-4 font-heading font-bold text-neutral-900 dark:text-white text-[15px] leading-[20px] text-left">
                {{ rec.month }} {{ rec.year }}
              </td>
              <td class="py-4 px-4 text-right font-mono tabular-nums font-semibold text-neutral-900 dark:text-white text-[14px] leading-[20px]">
                Rp {{ rec.omzet.toLocaleString('id-ID') }}
              </td>
              <td class="py-4 px-4 text-right font-mono tabular-nums text-neutral-600 dark:text-neutral-300 text-[14px] leading-[20px]">
                Rp {{ rec.hpp.toLocaleString('id-ID') }}
              </td>
              <td class="py-4 px-4 text-right font-mono tabular-nums text-neutral-600 dark:text-neutral-300 text-[14px] leading-[20px]">
                Rp {{ rec.opex.toLocaleString('id-ID') }}
              </td>
              <td class="py-4 px-4 text-right font-mono tabular-nums font-bold text-emerald-600 dark:text-emerald-400 text-[15px] leading-[20px]">
                Rp {{ rec.netProfit.toLocaleString('id-ID') }}
              </td>
              <td class="py-4 px-4 text-center">
                <!-- Fully Rounded Status Badge (H: 24px -> R: 12px) -->
                <span class="inline-flex items-center gap-1.5 h-6 px-3 rounded-[12px] bg-emerald-50 text-emerald-800 border border-emerald-200/80 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800 text-[12px] leading-[16px] font-sans font-semibold">
                  <span class="w-2 h-2 rounded-full bg-emerald-500" />
                  <span>Valid BNSP</span>
                </span>
              </td>
              <td class="py-4 px-4 text-right">
                <button
                  type="button"
                  class="p-2 rounded-[8px] text-neutral-500 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors cursor-pointer"
                  title="Lihat Rincian Laporan"
                  @click="openDetailMonth(rec)"
                >
                  <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="12" cy="12" r="1" />
                    <circle cx="19" cy="12" r="1" />
                    <circle cx="5" cy="12" r="1" />
                  </svg>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- MOBILE VIEW: De-cluttered Cards with Nested Radius Formula (R_inner = R_outer - Padding = 24 - 16 = 8px) -->
      <div class="md:hidden space-y-4">
        <div
          v-for="rec in displayedMobileRecords"
          :key="rec.month"
          class="p-4 rounded-[24px] border border-neutral-200/90 dark:border-neutral-800 bg-neutral-50/60 dark:bg-neutral-900/50 space-y-3 text-left"
        >
          <!-- Header Baris: Bulan & Badge Valid (H: 24px -> R: 12px) -->
          <div class="flex items-center justify-between">
            <span class="font-heading font-bold text-neutral-900 dark:text-white text-[16px] leading-[24px]">
              {{ rec.month }} {{ rec.year }}
            </span>
            <span class="inline-flex items-center gap-1.5 h-6 px-3 rounded-[12px] bg-emerald-50 text-emerald-800 border border-emerald-200/80 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800 text-[12px] leading-[16px] font-sans font-semibold">
              <span class="w-2 h-2 rounded-full bg-emerald-500" />
              <span>Valid BNSP</span>
            </span>
          </div>

          <!-- Highlight Uang Bersih (Nested Radius: R = 24 - 16 = 8px) -->
          <div class="p-3 rounded-[8px] bg-white dark:bg-[#15161A] border border-neutral-200/80 dark:border-neutral-800/80 flex items-center justify-between">
            <div>
              <span class="text-[12px] leading-[16px] text-neutral-500 dark:text-neutral-400 font-medium block">Uang Bersih (Laba)</span>
              <span class="text-[18px] sm:text-[21px] leading-[24px] font-bold text-emerald-600 dark:text-emerald-400 font-mono tabular-nums">
                Rp {{ rec.netProfit.toLocaleString('id-ID') }}
              </span>
            </div>
            <!-- Action Button Fully Rounded (H: 32px -> R: 16px) -->
            <button
              type="button"
              class="h-8 px-3 rounded-[16px] text-[12px] leading-[16px] font-semibold bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 text-neutral-700 dark:text-neutral-200 transition-colors cursor-pointer"
              @click="openDetailMonth(rec)"
            >
              Lihat Grafik
            </button>
          </div>

          <!-- Rincian Pemasukan & Beban 2 Kolom (Nested Radius: R = 8px) -->
          <div class="grid grid-cols-2 gap-2 text-left">
            <div class="p-3 rounded-[8px] bg-white dark:bg-[#15161A] border border-neutral-100 dark:border-neutral-800/60">
              <span class="text-neutral-500 dark:text-neutral-400 block mb-1 text-[12px] leading-[16px]">Penjualan (Omzet)</span>
              <span class="font-semibold font-mono tabular-nums text-neutral-900 dark:text-white text-[13px] leading-[20px] block">
                Rp {{ rec.omzet.toLocaleString('id-ID') }}
              </span>
            </div>
            <div class="p-3 rounded-[8px] bg-white dark:bg-[#15161A] border border-neutral-100 dark:border-neutral-800/60">
              <span class="text-neutral-500 dark:text-neutral-400 block mb-1 text-[12px] leading-[16px]">Beban & Operasional</span>
              <span class="font-semibold font-mono tabular-nums text-rose-600 dark:text-rose-400 text-[13px] leading-[20px] block">
                Rp {{ (rec.hpp + rec.opex).toLocaleString('id-ID') }}
              </span>
            </div>
          </div>
        </div>

        <!-- De-clutter Toggle: Tombol Lihat Riwayat Lengkap (Mencegah Halaman Terlalu Panjang) -->
        <div class="pt-2 text-center">
          <button
            type="button"
            class="w-full inline-flex items-center justify-center gap-2 h-11 px-4 rounded-[12px] border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#15161A] text-[13px] leading-[20px] font-semibold text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-900 transition-colors cursor-pointer"
            @click="isAllMonthlyRecordsShown = !isAllMonthlyRecordsShown"
          >
            <span>{{ isAllMonthlyRecordsShown ? 'Tampilkan 4 Bulan Terakhir Saja' : `Lihat Riwayat Lengkap (${umkmStore.monthlyRecords.length} Bulan)` }}</span>
            <svg
              class="w-4 h-4 transition-transform duration-200"
              :class="{ 'rotate-180': isAllMonthlyRecordsShown }"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <path stroke-linecap="round" stroke-linejoin="round" d="m19 9-7 7-7-7" />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- SLIDE-OVER SHEET: Form Catat Kas Toko Baru (Spatial Grid Kelipatan 8 & 4) -->
    <BDrawer
      v-model="isTransactionDrawerOpen"
      title="Catat Kas Toko Baru"
      subtitle="Buku Catatan Penjualan & Biaya Harian"
    >
      <div class="space-y-4 text-left">
        <div>
          <label class="block text-[13px] leading-[20px] font-heading font-semibold text-neutral-800 dark:text-neutral-200 mb-1.5">
            Tanggal Pembukuan
          </label>
          <input
            type="date"
            class="w-full h-11 px-4 text-[14px] leading-[20px] rounded-[12px] border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            :value="new Date().toISOString().substring(0, 10)"
          />
        </div>

        <div>
          <label class="block text-[13px] leading-[20px] font-heading font-semibold text-neutral-800 dark:text-neutral-200 mb-1.5">
            Total Penjualan Hari Ini (Omzet)
          </label>
          <div class="relative">
            <span class="absolute inset-y-0 left-0 pl-4 flex items-center text-[14px] text-neutral-500 font-mono font-semibold">Rp</span>
            <input
              type="text"
              placeholder="3.500.000"
              class="w-full h-11 pl-11 pr-4 text-[15px] leading-[20px] rounded-[12px] border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white font-mono focus:outline-none focus:ring-2 focus:ring-blue-500/20 font-semibold"
            />
          </div>
        </div>

        <div>
          <label class="block text-[13px] leading-[20px] font-heading font-semibold text-neutral-800 dark:text-neutral-200 mb-1.5">
            Biaya Belanja Bahan & Pengeluaran
          </label>
          <div class="relative">
            <span class="absolute inset-y-0 left-0 pl-4 flex items-center text-[14px] text-neutral-500 font-mono font-semibold">Rp</span>
            <input
              type="text"
              placeholder="1.200.000"
              class="w-full h-11 pl-11 pr-4 text-[15px] leading-[20px] rounded-[12px] border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white font-mono focus:outline-none focus:ring-2 focus:ring-blue-500/20 font-semibold"
            />
          </div>
        </div>

        <div>
          <label class="block text-[13px] leading-[20px] font-heading font-semibold text-neutral-800 dark:text-neutral-200 mb-1.5">
            Catatan Tambahan
          </label>
          <textarea
            rows="3"
            placeholder="Contoh: Beli 2 karung biji kopi & bayar listrik toko..."
            class="w-full p-4 text-[14px] leading-[20px] rounded-[12px] border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white font-sans focus:outline-none focus:ring-2 focus:ring-blue-500/20 resize-none"
          ></textarea>
        </div>
      </div>

      <template #footer="{ close }">
        <div class="flex items-center justify-end gap-3 w-full">
          <button
            type="button"
            class="h-11 px-5 rounded-[12px] border border-neutral-300 dark:border-neutral-700 text-[13px] leading-[16px] font-heading font-semibold text-neutral-800 dark:text-neutral-200 hover:bg-neutral-100 transition-colors active:scale-[0.96] cursor-pointer"
            @click="close"
          >
            Batal
          </button>
          <button
            type="button"
            class="h-11 px-6 rounded-[12px] bg-blue-600 hover:bg-blue-700 text-white text-[13px] leading-[16px] font-heading font-semibold shadow-xs transition-colors active:scale-[0.96] cursor-pointer"
            @click="close"
          >
            Simpan Catatan Kas
          </button>
        </div>
      </template>
    </BDrawer>

    <!-- Modal Edit Cepat Nama & Deskripsi UMKM -->
    <BModal
      v-model="isQuickEditModalOpen"
      title="Edit Profil Usaha"
      subtitle="Perbarui nama usaha dan deskripsi singkat secara langsung pada beranda."
      size="md"
    >
      <div class="space-y-4 pt-1 text-left">
        <div>
          <label class="block text-[13px] leading-[20px] font-heading font-semibold text-neutral-800 dark:text-neutral-200 mb-1.5">
            Nama Usaha (UMKM) <span class="text-rose-500">*</span>
          </label>
          <input
            v-model="editStoreName"
            type="text"
            maxlength="60"
            placeholder="Contoh: Kopi Senja Nusantara"
            class="w-full h-11 px-4 text-[14px] leading-[20px] rounded-[12px] border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white font-sans focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors"
          />
        </div>

        <div>
          <div class="flex items-center justify-between mb-1.5">
            <label class="block text-[13px] leading-[20px] font-heading font-semibold text-neutral-800 dark:text-neutral-200">
              Deskripsi Singkat UMKM
            </label>
            <span
              :class="[
                'text-[12px] font-sans font-medium tabular-nums transition-colors',
                editDescription.length >= 340
                  ? 'text-rose-600 dark:text-rose-400 font-semibold'
                  : editDescription.length >= 300
                    ? 'text-amber-600 dark:text-amber-400'
                    : 'text-neutral-400 dark:text-neutral-500'
              ]"
            >
              {{ editDescription.length }} / 350 Karakter
            </span>
          </div>

          <textarea
            v-model="editDescription"
            rows="4"
            maxlength="350"
            placeholder="Tuliskan deskripsi singkat mengenai usaha, produk unggulan, atau target ekspansi Anda (maks. 350 karakter)..."
            class="w-full p-4 text-[14px] leading-[20px] rounded-[12px] border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white font-sans focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 resize-none transition-colors"
          ></textarea>
          <p class="text-[12px] leading-[16px] text-neutral-500 dark:text-neutral-400 font-sans mt-1">
            Deskripsi ini ditampilkan di bawah nama UMKM pada beranda dan katalog investor.
          </p>
        </div>

        <!-- Alert Error jika ada -->
        <div
          v-if="editError"
          class="p-3 rounded-[12px] bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/50 text-rose-700 dark:text-rose-300 text-[13px] leading-[20px] font-sans flex items-center gap-2"
        >
          <HugeiconsIcon :icon="Alert01Icon" :size="16" class="shrink-0" />
          <span>{{ editError }}</span>
        </div>
      </div>

      <template #footer="{ close }">
        <div class="flex items-center justify-end gap-3 w-full">
          <button
            type="button"
            class="h-11 px-5 rounded-[12px] border border-neutral-300 dark:border-neutral-700 text-[13px] leading-[16px] font-heading font-semibold text-neutral-800 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors active:scale-[0.97] cursor-pointer"
            @click="close"
          >
            Batal
          </button>
          <button
            type="button"
            class="h-11 px-6 rounded-[12px] bg-blue-600 hover:bg-blue-700 text-white text-[13px] leading-[16px] font-heading font-semibold shadow-xs transition-colors active:scale-[0.97] flex items-center gap-1.5 cursor-pointer"
            @click="saveQuickEdit"
          >
            <HugeiconsIcon :icon="CheckmarkCircle01Icon" :size="16" />
            <span>Simpan Perubahan</span>
          </button>
        </div>
      </template>
    </BModal>

    <!-- Floating Success Toast Notification -->
    <Teleport to="body">
      <transition
        enter-active-class="transition-all duration-300 ease-out"
        enter-from-class="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
        enter-to-class="opacity-100 translate-y-0 sm:scale-100"
        leave-active-class="transition-all duration-200 ease-in"
        leave-from-class="opacity-100 translate-y-0 sm:scale-100"
        leave-to-class="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
      >
        <div
          v-if="showToastSuccess"
          class="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-3.5 rounded-[16px] bg-neutral-900/95 dark:bg-white text-white dark:text-neutral-900 shadow-xl border border-neutral-800 dark:border-neutral-200 backdrop-blur-md"
        >
          <div class="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 dark:text-emerald-600 flex items-center justify-center shrink-0">
            <HugeiconsIcon :icon="CheckmarkCircle01Icon" :size="15" />
          </div>
          <span class="text-[13px] leading-[20px] font-sans font-medium">
            Profil UMKM berhasil diperbarui!
          </span>
        </div>
      </transition>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { HugeiconsIcon } from '@hugeicons/vue'
import {
  CheckmarkBadge01Icon,
  PencilEdit01Icon,
  CheckmarkCircle01Icon,
  Alert01Icon
} from '@hugeicons/core-free-icons'
import { useAuthStore } from '~/stores/auth'
import { useUmkmStore, type MonthlyRecord } from '~/stores/umkm'
import Chart from 'chart.js/auto'
import { gsap } from 'gsap'
import BDrawer from '~/components/base/BDrawer.vue'
import BModal from '~/components/base/BModal.vue'

definePageMeta({
  layout: 'dashboard'
})

const authStore = useAuthStore()
const umkmStore = useUmkmStore()

const umkmName = computed(() => {
  return umkmStore.profile.name || authStore.currentUser?.businessName || 'Kopi Senja Nusantara'
})

const umkmDescription = computed(() => {
  const desc = umkmStore.profile.description || umkmStore.profile.pitchSummary || ''
  return desc.length > 350 ? desc.slice(0, 350).trim() + '...' : desc
})

// De-cluttered Record Lists (Tampilkan 4 bulan terbaru default untuk mencegah kepadatan visual)
const isAllMonthlyRecordsShown = ref(false)

const displayedDesktopRecords = computed(() => {
  return umkmStore.monthlyRecords || []
})

const displayedMobileRecords = computed(() => {
  const records = umkmStore.monthlyRecords || []
  if (isAllMonthlyRecordsShown.value) {
    return records
  }
  return records.slice(-4)
})

// Quick Edit Modal State & Handlers
const isQuickEditModalOpen = ref(false)
const editStoreName = ref('')
const editDescription = ref('')
const editError = ref('')
const showToastSuccess = ref(false)

function openQuickEditModal() {
  editStoreName.value = umkmStore.profile.name || 'Kopi Senja Nusantara'
  editDescription.value = umkmStore.profile.description || umkmStore.profile.pitchSummary || ''
  editError.value = ''
  isQuickEditModalOpen.value = true
}

function saveQuickEdit() {
  const trimmedName = editStoreName.value.trim()
  if (!trimmedName) {
    editError.value = 'Nama UMKM tidak boleh kosong.'
    return
  }

  let trimmedDesc = editDescription.value.trim()
  if (trimmedDesc.length > 350) {
    trimmedDesc = trimmedDesc.slice(0, 350).trim()
  }

  umkmStore.updateQuickProfile(trimmedName, trimmedDesc)
  if (authStore.currentUser) {
    authStore.currentUser.businessName = trimmedName
  }

  isQuickEditModalOpen.value = false
  showToastSuccess.value = true
  setTimeout(() => {
    showToastSuccess.value = false
  }, 3000)
}

// Hero Line Chart State & Logic
const heroChartCanvas = ref<HTMLCanvasElement | null>(null)
let heroChartInstance: any = null
const heroPeriodFilter = ref<'3m' | '6m' | '1y'>('6m')

const heroFilterOptions = [
  { id: '3m', label: '3 Bulan' },
  { id: '6m', label: '6 Bulan' },
  { id: '1y', label: '1 Tahun' }
]

const heroFilteredRecords = computed(() => {
  const records = umkmStore.monthlyRecords || []
  if (heroPeriodFilter.value === '3m') {
    return records.slice(-3)
  } else if (heroPeriodFilter.value === '6m') {
    return records.slice(-6)
  }
  return records
})

function initHeroChart() {
  if (!heroChartCanvas.value) return
  if (heroChartInstance) {
    heroChartInstance.destroy()
    heroChartInstance = null
  }

  const isDark = typeof document !== 'undefined' && document.documentElement.classList.contains('dark')
  const ctx = heroChartCanvas.value.getContext('2d')

  let splineFillGradient: any = 'rgba(0, 102, 255, 0.08)'
  if (ctx) {
    const grad = ctx.createLinearGradient(0, 0, 0, 320)
    grad.addColorStop(0, isDark ? 'rgba(0, 102, 255, 0.16)' : 'rgba(0, 102, 255, 0.12)')
    grad.addColorStop(0.65, isDark ? 'rgba(0, 102, 255, 0.04)' : 'rgba(0, 102, 255, 0.02)')
    grad.addColorStop(1, 'rgba(0, 102, 255, 0.0)')
    splineFillGradient = grad
  }

  heroChartInstance = new Chart(heroChartCanvas.value, {
    type: 'line',
    data: {
      labels: heroFilteredRecords.value.map(r => r.month),
      datasets: [
        {
          label: 'Saldo Kas Toko',
          data: heroFilteredRecords.value.map(r => r.cashBalance),
          borderColor: '#0066FF',
          backgroundColor: splineFillGradient,
          fill: true,
          borderWidth: 3.2,
          cubicInterpolationMode: 'monotone',
          tension: 0.38,
          pointRadius: 4,
          pointHoverRadius: 7,
          pointBackgroundColor: isDark ? '#15161A' : '#FFFFFF',
          pointBorderColor: '#0066FF',
          pointBorderWidth: 3,
          pointHoverBackgroundColor: '#0066FF',
          pointHoverBorderColor: isDark ? '#15161A' : '#FFFFFF',
          pointHoverBorderWidth: 3.5,
          pointHitRadius: 18
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      interaction: {
        mode: 'index',
        intersect: false
      },
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: isDark ? '#FFFFFF' : '#111827',
          titleColor: isDark ? '#0F172A' : '#FFFFFF',
          bodyColor: isDark ? '#64748B' : '#9CA3AF',
          padding: { top: 9, bottom: 9, left: 14, right: 14 },
          cornerRadius: 10,
          borderColor: isDark ? 'rgba(0, 0, 0, 0.08)' : 'rgba(255, 255, 255, 0.1)',
          borderWidth: 1,
          displayColors: false,
          caretSize: 6,
          caretPadding: 6,
          titleFont: { family: 'Poppins', size: 14, weight: 'bold' },
          bodyFont: { family: 'Poppins', size: 12, weight: 'normal' },
          callbacks: {
            title: (items: any[]) => {
              const val = items[0]?.raw || 0
              return 'Rp ' + Number(val).toLocaleString('id-ID')
            },
            label: (ctx: any) => {
              const idx = ctx.dataIndex ?? 0
              const rec = heroFilteredRecords.value[idx]
              return rec ? `${rec.month} ${rec.year}` : ''
            }
          }
        }
      },
      scales: {
        x: {
          grid: {
            display: true,
            color: isDark ? 'rgba(255, 255, 255, 0.06)' : 'rgba(0, 0, 0, 0.05)',
            borderDash: [4, 4]
          },
          ticks: {
            font: { family: 'Poppins', size: 12, weight: '600' },
            color: isDark ? '#9CA3AF' : '#6B7280',
            padding: 8
          },
          border: { display: false }
        },
        y: {
          grid: {
            display: true,
            color: isDark ? 'rgba(255, 255, 255, 0.06)' : 'rgba(0, 0, 0, 0.05)',
            borderDash: [4, 4]
          },
          ticks: {
            font: { family: 'Poppins', size: 11 },
            color: isDark ? '#6B7280' : '#9CA3AF',
            callback: (val: any) => `Rp ${(Number(val) / 1000000).toFixed(0)} Jt`,
            padding: 8
          },
          border: { display: false }
        }
      }
    }
  })
}

function updateHeroChart() {
  if (!heroChartInstance) {
    initHeroChart()
    return
  }
  const isDark = typeof document !== 'undefined' && document.documentElement.classList.contains('dark')
  const ctx = heroChartCanvas.value?.getContext('2d')
  let splineFillGradient: any = 'rgba(0, 102, 255, 0.08)'
  if (ctx) {
    const grad = ctx.createLinearGradient(0, 0, 0, 320)
    grad.addColorStop(0, isDark ? 'rgba(0, 102, 255, 0.16)' : 'rgba(0, 102, 255, 0.12)')
    grad.addColorStop(0.65, isDark ? 'rgba(0, 102, 255, 0.04)' : 'rgba(0, 102, 255, 0.02)')
    grad.addColorStop(1, 'rgba(0, 102, 255, 0.0)')
    splineFillGradient = grad
  }

  heroChartInstance.data.labels = heroFilteredRecords.value.map(r => r.month)
  heroChartInstance.data.datasets[0].data = heroFilteredRecords.value.map(r => r.cashBalance)
  heroChartInstance.data.datasets[0].backgroundColor = splineFillGradient
  heroChartInstance.data.datasets[0].pointHoverBorderColor = isDark ? '#15161A' : '#FFFFFF'
  heroChartInstance.update()
}

function onHeroChartMouseLeave() {
  // Chart.js handles tooltip clearing
}

function setHeroPeriodFilter(filter: '3m' | '6m' | '1y') {
  heroPeriodFilter.value = filter
  updateHeroChart()
}

onMounted(() => {
  umkmStore.initBannerFromStorage()
  umkmStore.initAvatarFromStorage()
  umkmStore.initQuickProfileFromStorage()
  if (umkmStore.profile.name && authStore.currentUser) {
    authStore.currentUser.businessName = umkmStore.profile.name
  }
  if (umkmStore.profile.ownerAvatarUrl) {
    authStore.updateAvatar(umkmStore.profile.ownerAvatarUrl)
  }

  // GSAP Entrance
  gsap.from('.gsap-header', {
    opacity: 0,
    y: -10,
    duration: 0.5,
    ease: 'power2.out'
  })
  gsap.from('.gsap-stat-card', {
    opacity: 0,
    y: 15,
    duration: 0.5,
    stagger: 0.06,
    ease: 'power2.out',
    delay: 0.08
  })
  gsap.from('.gsap-hero-chart', {
    opacity: 0,
    y: 15,
    duration: 0.5,
    ease: 'power2.out',
    delay: 0.14
  })

  // Initialize Chart
  initHeroChart()
})

onBeforeUnmount(() => {
  if (heroChartInstance) {
    heroChartInstance.destroy()
    heroChartInstance = null
  }
})

// Slide-Over Drawers State
const isTransactionDrawerOpen = ref(false)

function openDetailMonth(record: MonthlyRecord) {
  heroPeriodFilter.value = '1y'
  updateHeroChart()
  const el = document.querySelector('.gsap-hero-chart')
  if (el) el.scrollIntoView({ behavior: 'smooth' })
}
</script>


