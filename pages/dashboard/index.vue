<template>
  <div class="space-y-6 pb-20 font-sans text-neutral-900 dark:text-neutral-100">


    <!-- Editorial Greeting & Profile Header -->
    <header class="gsap-header pt-2 pb-5 sm:pb-6 border-b border-neutral-200/80 dark:border-neutral-800/80 relative z-10">
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div class="flex items-center gap-3.5 min-w-0">
          <!-- Mini Avatar Link to Profile Page -->
          <NuxtLink
            to="/dashboard/profile"
            class="relative group shrink-0"
            title="Buka Halaman Profil & Banner"
          >
            <img
              :src="umkmStore.profile.ownerAvatarUrl || authStore.currentUser?.avatar || '/images/user-profile.png'"
              :alt="umkmName"
              class="w-12 h-12 sm:w-14 sm:h-14 rounded-full object-cover ring-2 ring-neutral-200/80 dark:ring-neutral-800 group-hover:ring-primary-500 transition-all shadow-2xs"
            />
            <span class="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full bg-emerald-500 ring-2 ring-white dark:ring-[#0F1014]" />
          </NuxtLink>

          <div class="space-y-1 min-w-0">
            <div class="flex items-center gap-2 flex-wrap">
              <h1 class="text-2xl sm:text-3xl font-heading font-semibold text-neutral-900 dark:text-white tracking-tight">
                {{ umkmName }}
              </h1>

              <!-- Verified Icon with Tooltip on Hover -->
              <div class="relative group/verified inline-flex items-center">
                <div
                  class="inline-flex items-center justify-center text-primary-500 dark:text-primary-400 hover:text-primary-600 dark:hover:text-primary-300 transition-colors cursor-help"
                  tabindex="0"
                  aria-label="Terverifikasi OSS RBA"
                >
                  <HugeiconsIcon
                    :icon="CheckmarkBadge01Icon"
                    :size="24"
                    class="text-primary-500 dark:text-primary-400"
                  />
                </div>

                <!-- Custom Floating Tooltip -->
                <div
                  class="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2.5 py-1 rounded-lg bg-neutral-900 dark:bg-neutral-800 text-white text-[11px] font-sans font-medium whitespace-nowrap opacity-0 group-hover/verified:opacity-100 transition-all duration-150 pointer-events-none shadow-lg z-30 translate-y-1 group-hover/verified:translate-y-0 border border-neutral-700/60"
                >
                  <div class="flex items-center gap-1.5">
                    <HugeiconsIcon :icon="CheckmarkBadge01Icon" :size="13" class="text-emerald-400" />
                    <span>Terverifikasi OSS RBA</span>
                  </div>
                  <!-- Tooltip Arrow Pointer -->
                  <div class="absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-4 border-transparent border-t-neutral-900 dark:border-t-neutral-800" />
                </div>
              </div>
            </div>

            <p class="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 font-sans leading-relaxed line-clamp-2 max-w-2xl">
              {{ umkmDescription || 'Spesialis kopi arabika susu gula aren dengan 3 outlet aktif di Bandung & margin kotor stabil di atas 48%.' }}
            </p>
          </div>
        </div>

        <!-- Action Buttons: Edit Profile Usaha -->
        <div class="flex items-center gap-2.5 shrink-0 sm:self-center">
          <NuxtLink
            to="/dashboard/profile"
            class="inline-flex items-center gap-2 px-3.5 py-2 sm:px-4 sm:py-2 rounded-xl bg-white dark:bg-[#18191E] border border-neutral-200/90 dark:border-neutral-800 hover:border-neutral-400 dark:hover:border-neutral-600 text-xs sm:text-sm font-poppins font-medium text-neutral-700 dark:text-neutral-200 hover:text-neutral-900 dark:hover:text-white transition-all shadow-2xs active:scale-95 cursor-pointer"
            title="Edit Profile Usaha"
          >
            <HugeiconsIcon :icon="PencilEdit01Icon" :size="16" :stroke-width="1.8" />
            <span>Edit Profile Usaha</span>
          </NuxtLink>
        </div>
      </div>
    </header>

    <!-- 1. Metric Grid: 4 Horizontal Financial Cards (Posisi Atas Sesuai Permintaan) -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-stretch">
      <!-- Card 1: Laba Bersih Bulan Ini -->
      <div class="gsap-stat-card flex-1">
        <div class="group relative rounded-2xl border border-neutral-200/90 dark:border-neutral-800 hover:border-blue-400/90 dark:hover:border-blue-500/60 bg-white dark:bg-[#15161A] hover:bg-blue-50/40 dark:hover:bg-blue-950/20 p-5 sm:p-6 flex flex-col justify-between select-none h-full transition-all duration-200 shadow-2xs">
          <!-- Top Row: Icon + Label + Info Tooltip -->
          <div class="flex items-center justify-between gap-2">
            <div class="flex items-center gap-2 min-w-0">
              <span class="w-6 h-6 rounded-full bg-blue-500/10 text-[#0066FF] dark:text-blue-400 flex items-center justify-center shrink-0 border border-blue-500/20">
                <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                  <circle cx="12" cy="12" r="9" />
                  <path d="M14.8 9A2 2 0 0 0 13 8h-2a2 2 0 1 0 0 4h2a2 2 0 1 1 0 4h-2a2 2 0 0 1-1.8-1" />
                  <path d="M12 6v2m0 8v2" />
                </svg>
              </span>
              <span class="text-[11px] sm:text-xs font-poppins font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 truncate">
                LABA BERSIH BULAN INI
              </span>
            </div>

            <!-- Info Tooltip Icon (i) -->
            <div class="relative group/info inline-flex items-center shrink-0">
              <button
                type="button"
                class="w-4 h-4 rounded-full text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200 transition-colors flex items-center justify-center cursor-help"
                aria-label="Info Laba Bersih"
              >
                <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="16" x2="12" y2="12" />
                  <line x1="12" y1="8" x2="12.01" y2="8" />
                </svg>
              </button>
              <div class="absolute bottom-full right-0 mb-2 px-2.5 py-1 rounded-lg bg-neutral-900 dark:bg-neutral-800 text-white text-[11px] font-poppins font-medium whitespace-nowrap opacity-0 group-hover/info:opacity-100 transition-all duration-150 pointer-events-none shadow-lg z-30 translate-y-1 group-hover/info:translate-y-0 border border-neutral-700/60">
                <span>Keuntungan bersih setelah beban HPP & operasional</span>
                <div class="absolute top-full right-1.5 -mt-1 border-4 border-transparent border-t-neutral-900 dark:border-t-neutral-800" />
              </div>
            </div>
          </div>

          <!-- Middle Value Row -->
          <div class="mt-4 sm:mt-5">
            <span class="text-2xl sm:text-[28px] lg:text-3xl font-poppins font-bold text-neutral-900 dark:text-white tabular-nums tracking-tight block">
              Rp 32.600.000
            </span>
          </div>

          <!-- Subtext Row -->
          <div class="mt-1.5 sm:mt-2 text-xs sm:text-[13px] font-poppins text-neutral-500 dark:text-neutral-400 flex items-center gap-1.5">
            <span>Bulan Ini</span>
            <span class="text-emerald-600 dark:text-emerald-400 font-semibold tabular-nums">+12% (MoM)</span>
          </div>

          <!-- Bottom Action Button Row -->
          <div class="mt-5 sm:mt-6 pt-1">
            <button
              type="button"
              class="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-neutral-100 hover:bg-neutral-200/90 dark:bg-neutral-800/80 dark:hover:bg-neutral-700/80 border border-neutral-200/90 dark:border-neutral-700/70 text-sm font-poppins font-semibold text-neutral-800 dark:text-neutral-200 transition-colors shadow-2xs active:scale-95 cursor-pointer"
              @click="scrollToSection('breakdown')"
            >
              <span>Lihat Rincian</span>
              <svg class="w-4 h-4 opacity-75" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                <path d="m9 18 6-6-6-6" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <!-- Card 2: Porsi Modal Bahan -->
      <div class="gsap-stat-card flex-1">
        <div class="group relative rounded-2xl border border-neutral-200/90 dark:border-neutral-800 hover:border-amber-400/90 dark:hover:border-amber-500/60 bg-white dark:bg-[#15161A] hover:bg-amber-50/40 dark:hover:bg-amber-950/20 p-5 sm:p-6 flex flex-col justify-between select-none h-full transition-all duration-200 shadow-2xs">
          <!-- Top Row: Icon + Label + Info Tooltip -->
          <div class="flex items-center justify-between gap-2">
            <div class="flex items-center gap-2 min-w-0">
              <span class="w-6 h-6 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0 border border-amber-500/20">
                <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="m7 16 3-3-3-3" />
                  <path d="M10 13H3" />
                  <path d="m17 8-3 3 3 3" />
                  <path d="M14 11h7" />
                </svg>
              </span>
              <span class="text-[11px] sm:text-xs font-poppins font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 truncate">
                PORSI MODAL BAHAN
              </span>
            </div>

            <!-- Info Tooltip Icon (i) -->
            <div class="relative group/info inline-flex items-center shrink-0">
              <button
                type="button"
                class="w-4 h-4 rounded-full text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200 transition-colors flex items-center justify-center cursor-help"
                aria-label="Info Modal Bahan"
              >
                <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="16" x2="12" y2="12" />
                  <line x1="12" y1="8" x2="12.01" y2="8" />
                </svg>
              </button>
              <div class="absolute bottom-full right-0 mb-2 px-2.5 py-1 rounded-lg bg-neutral-900 dark:bg-neutral-800 text-white text-[11px] font-poppins font-medium whitespace-nowrap opacity-0 group-hover/info:opacity-100 transition-all duration-150 pointer-events-none shadow-lg z-30 translate-y-1 group-hover/info:translate-y-0 border border-neutral-700/60">
                <span>Rasio HPP bahan baku dibanding total omzet bulanan</span>
                <div class="absolute top-full right-1.5 -mt-1 border-4 border-transparent border-t-neutral-900 dark:border-t-neutral-800" />
              </div>
            </div>
          </div>

          <!-- Middle Value Row -->
          <div class="mt-4 sm:mt-5">
            <span class="text-2xl sm:text-[28px] lg:text-3xl font-poppins font-bold text-neutral-900 dark:text-white tabular-nums tracking-tight block">
              45.1%
            </span>
          </div>

          <!-- Subtext Row -->
          <div class="mt-1.5 sm:mt-2 text-xs sm:text-[13px] font-poppins text-neutral-500 dark:text-neutral-400 flex items-center gap-1.5">
            <span>Target Maks. &lt; 50%</span>
            <span class="text-emerald-600 dark:text-emerald-400 font-semibold">(Sangat Hemat)</span>
          </div>

          <!-- Bottom Action Button Row -->
          <div class="mt-5 sm:mt-6 pt-1">
            <button
              type="button"
              class="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-neutral-100 hover:bg-neutral-200/90 dark:bg-neutral-800/80 dark:hover:bg-neutral-700/80 border border-neutral-200/90 dark:border-neutral-700/70 text-sm font-poppins font-semibold text-neutral-800 dark:text-neutral-200 transition-colors shadow-2xs active:scale-95 cursor-pointer"
              @click="scrollToSection('breakdown')"
            >
              <span>Kelola HPP</span>
              <svg class="w-4 h-4 opacity-75" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                <path d="m9 18 6-6-6-6" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <!-- Card 3: Arus Kas Masuk -->
      <div class="gsap-stat-card flex-1">
        <div class="group relative rounded-2xl border border-neutral-200/90 dark:border-neutral-800 hover:border-emerald-400/90 dark:hover:border-emerald-500/60 bg-white dark:bg-[#15161A] hover:bg-emerald-50/40 dark:hover:bg-emerald-950/20 p-5 sm:p-6 flex flex-col justify-between select-none h-full transition-all duration-200 shadow-2xs">
          <!-- Top Row: Icon + Label + Info Tooltip -->
          <div class="flex items-center justify-between gap-2">
            <div class="flex items-center gap-2 min-w-0">
              <span class="w-6 h-6 rounded-full bg-emerald-500/10 text-emerald-500 dark:text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-500/20">
                <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M17 7 7 17" />
                  <path d="M17 17H7V7" />
                </svg>
              </span>
              <span class="text-[11px] sm:text-xs font-poppins font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 truncate">
                ARUS KAS MASUK
              </span>
            </div>

            <!-- Info Tooltip Icon (i) -->
            <div class="relative group/info inline-flex items-center shrink-0">
              <button
                type="button"
                class="w-4 h-4 rounded-full text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200 transition-colors flex items-center justify-center cursor-help"
                aria-label="Info Kas Masuk"
              >
                <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="16" x2="12" y2="12" />
                  <line x1="12" y1="8" x2="12.01" y2="8" />
                </svg>
              </button>
              <div class="absolute bottom-full right-0 mb-2 px-2.5 py-1 rounded-lg bg-neutral-900 dark:bg-neutral-800 text-white text-[11px] font-poppins font-medium whitespace-nowrap opacity-0 group-hover/info:opacity-100 transition-all duration-150 pointer-events-none shadow-lg z-30 translate-y-1 group-hover/info:translate-y-0 border border-neutral-700/60">
                <span>Total akumulasi seluruh omzet penjualan yang masuk kas</span>
                <div class="absolute top-full right-1.5 -mt-1 border-4 border-transparent border-t-neutral-900 dark:border-t-neutral-800" />
              </div>
            </div>
          </div>

          <!-- Middle Value Row -->
          <div class="mt-4 sm:mt-5">
            <span class="text-2xl sm:text-[28px] lg:text-3xl font-poppins font-bold text-neutral-900 dark:text-white tabular-nums tracking-tight block">
              Rp 100.000.000
            </span>
          </div>

          <!-- Subtext Row -->
          <div class="mt-1.5 sm:mt-2 text-xs sm:text-[13px] font-poppins text-neutral-500 dark:text-neutral-400 flex items-center gap-1.5">
            <span>30 Hari Terakhir</span>
            <span class="text-emerald-600 dark:text-emerald-400 font-semibold tabular-nums">+9.8%</span>
          </div>

          <!-- Bottom Action Button Row -->
          <div class="mt-5 sm:mt-6 pt-1">
            <button
              type="button"
              class="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-neutral-100 hover:bg-neutral-200/90 dark:bg-neutral-800/80 dark:hover:bg-neutral-700/80 border border-neutral-200/90 dark:border-neutral-700/70 text-sm font-poppins font-semibold text-neutral-800 dark:text-neutral-200 transition-colors shadow-2xs active:scale-95 cursor-pointer"
              @click="scrollToSection('table')"
            >
              <span>Lihat Semua</span>
              <svg class="w-4 h-4 opacity-75" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                <path d="m9 18 6-6-6-6" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <!-- Card 4: Arus Kas Keluar -->
      <div class="gsap-stat-card flex-1">
        <div class="group relative rounded-2xl border border-neutral-200/90 dark:border-neutral-800 hover:border-rose-400/90 dark:hover:border-rose-500/60 bg-white dark:bg-[#15161A] hover:bg-rose-50/40 dark:hover:bg-rose-950/20 p-5 sm:p-6 flex flex-col justify-between select-none h-full transition-all duration-200 shadow-2xs">
          <!-- Top Row: Icon + Label + Info Tooltip -->
          <div class="flex items-center justify-between gap-2">
            <div class="flex items-center gap-2 min-w-0">
              <span class="w-6 h-6 rounded-full bg-rose-500/10 text-[#F43F5E] dark:text-rose-400 flex items-center justify-center shrink-0 border border-rose-500/20">
                <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M7 17 17 7" />
                  <path d="M7 7h10v10" />
                </svg>
              </span>
              <span class="text-[11px] sm:text-xs font-poppins font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 truncate">
                ARUS KAS KELUAR
              </span>
            </div>

            <!-- Info Tooltip Icon (i) -->
            <div class="relative group/info inline-flex items-center shrink-0">
              <button
                type="button"
                class="w-4 h-4 rounded-full text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200 transition-colors flex items-center justify-center cursor-help"
                aria-label="Info Kas Keluar"
              >
                <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="16" x2="12" y2="12" />
                  <line x1="12" y1="8" x2="12.01" y2="8" />
                </svg>
              </button>
              <div class="absolute bottom-full right-0 mb-2 px-2.5 py-1 rounded-lg bg-neutral-900 dark:bg-neutral-800 text-white text-[11px] font-poppins font-medium whitespace-nowrap opacity-0 group-hover/info:opacity-100 transition-all duration-150 pointer-events-none shadow-lg z-30 translate-y-1 group-hover/info:translate-y-0 border border-neutral-700/60">
                <span>Total pengeluaran biaya bahan baku dan operasional toko</span>
                <div class="absolute top-full right-1.5 -mt-1 border-4 border-transparent border-t-neutral-900 dark:border-t-neutral-800" />
              </div>
            </div>
          </div>

          <!-- Middle Value Row -->
          <div class="mt-4 sm:mt-5">
            <span class="text-2xl sm:text-[28px] lg:text-3xl font-poppins font-bold text-neutral-900 dark:text-white tabular-nums tracking-tight block">
              Rp 67.400.000
            </span>
          </div>

          <!-- Subtext Row -->
          <div class="mt-1.5 sm:mt-2 text-xs sm:text-[13px] font-poppins text-neutral-500 dark:text-neutral-400 flex items-center gap-1.5">
            <span>30 Hari Terakhir</span>
            <span class="text-neutral-500 dark:text-neutral-400 font-poppins">Total HPP & Beban</span>
          </div>

          <!-- Bottom Action Button Row -->
          <div class="mt-5 sm:mt-6 pt-1">
            <button
              type="button"
              class="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-neutral-100 hover:bg-neutral-200/90 dark:bg-neutral-800/80 dark:hover:bg-neutral-700/80 border border-neutral-200/90 dark:border-neutral-700/70 text-sm font-poppins font-semibold text-neutral-800 dark:text-neutral-200 transition-colors shadow-2xs active:scale-95 cursor-pointer"
              @click="isTransactionDrawerOpen = true"
            >
              <span>Catat Kas</span>
              <svg class="w-4 h-4 opacity-75" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">
                <path d="M12 5v14m-7-7h14" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- 2. Hero Section: Clean Line Chart (Tren Saldo Kas Toko) -->
    <div class="gsap-hero-chart bg-white dark:bg-[#15161A] border border-neutral-200/90 dark:border-neutral-800 rounded-2xl p-5 sm:p-7 space-y-5">
      <!-- Header: Title, Legend, and Macro Period Tabs -->
      <div class="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-neutral-100 dark:border-neutral-800/80">
        <div>
          <div>
            <h2 class="text-xl sm:text-2xl font-heading font-semibold text-neutral-900 dark:text-white tracking-tight">
              Tren Saldo Kas Toko
            </h2>
          </div>
          <p class="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 mt-1 font-sans leading-relaxed">
            Grafik pemantauan akumulasi saldo kas riil toko dari waktu ke waktu secara real-time.
          </p>
        </div>

        <div class="flex flex-wrap items-center gap-4 sm:gap-6">
          <!-- Legend Indicator (Platform Blue Spline with Target Dot) -->
          <div class="flex items-center gap-3 text-xs font-sans font-medium">
            <div class="flex items-center gap-1.5">
              <span class="flex items-center gap-0.5">
                <span class="w-3 h-0.5 rounded-full bg-[#0066FF]" />
                <span class="w-2.5 h-2.5 rounded-full border-2 border-[#0066FF] bg-white dark:bg-[#15161A]" />
                <span class="w-3 h-0.5 rounded-full bg-[#0066FF]" />
              </span>
              <span class="text-neutral-700 dark:text-neutral-300 font-semibold">Saldo Kas Toko</span>
            </div>
          </div>

          <!-- Macro Time Period Filters (3 Bulan, 6 Bulan, 1 Tahun / YTD) -->
          <div class="inline-flex p-1 rounded-xl bg-neutral-100 dark:bg-neutral-800/80 border border-neutral-200/80 dark:border-neutral-700/80">
            <button
              v-for="opt in heroFilterOptions"
              :key="opt.id"
              type="button"
              :class="[
                'px-3 py-1 rounded-lg text-xs font-sans font-semibold transition-all cursor-pointer',
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

      <!-- Line Chart Canvas -->
      <div
        class="relative w-full h-72 sm:h-80 pt-1"
        @mouseleave="onHeroChartMouseLeave"
      >
        <canvas ref="heroChartCanvas" class="w-full h-full"></canvas>
      </div>

      <!-- Quick Summary Footer of Current Filter -->
      <div class="pt-3 border-t border-neutral-100 dark:border-neutral-800/80 flex flex-wrap items-center justify-between gap-3 text-xs font-sans text-neutral-500 dark:text-neutral-400">
        <div class="flex items-center gap-1.5">
          <span class="w-1.5 h-1.5 rounded-full bg-blue-500" />
          <span>Arahkan kursor pada kurva garis untuk melihat rincian saldo kas toko tiap bulan.</span>
        </div>
        <div class="flex items-center gap-4 tabular-nums">
          <span>Periode Aktif: <strong class="text-neutral-900 dark:text-white font-semibold">{{ heroFilteredRecords[0]?.month }} - {{ heroFilteredRecords[heroFilteredRecords.length - 1]?.month }} {{ heroFilteredRecords[heroFilteredRecords.length - 1]?.year }}</strong></span>
          <span>Posisi Saldo Terakhir: <strong class="text-[#0066FF] font-bold font-mono">Rp {{ (heroFilteredRecords[heroFilteredRecords.length - 1]?.cashBalance || 75500000).toLocaleString('id-ID') }}</strong></span>
        </div>
      </div>
    </div>

    <!-- 3. Cash Flow Telemetry Container: Lihat Aliran Kas -->
    <div id="cash-flow-breakdown" class="bg-white dark:bg-[#15161A] border border-neutral-200/90 dark:border-neutral-800 rounded-2xl p-5 sm:p-6 flex flex-col justify-between space-y-5">
      <!-- Header: Title & Info Badge Total Riil -->
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-neutral-100 dark:border-neutral-800/80">
        <div>
          <h2 class="text-lg sm:text-xl font-heading font-semibold text-neutral-900 dark:text-white tracking-tight">
            Lihat Aliran Kas
          </h2>
          <p class="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 mt-0.5 font-sans leading-relaxed">
            Melihat pembagian biaya bahan baku, sewa & gaji, serta laba bersih tokomu berdasarkan total riil bulan ini.
          </p>
        </div>

        <!-- Static Badge: Total Riil Bulan Ini -->
        <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-neutral-100 dark:bg-neutral-800/80 border border-neutral-200/90 dark:border-neutral-700/80 text-xs font-poppins font-semibold text-neutral-800 dark:text-neutral-200 shadow-2xs self-start sm:self-auto">
          <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span>Total Riil Bulan Ini (Oktober 2026)</span>
        </div>
      </div>

      <!-- Donut Chart & Detailed Breakdown Split Bento Layout -->
      <div class="grid grid-cols-1 md:grid-cols-12 gap-4 sm:gap-5 items-stretch flex-1">
        <!-- Donut Chart Column (md:col-span-12 lg:col-span-5) -->
        <div class="md:col-span-12 lg:col-span-5 flex flex-col justify-between p-5 sm:p-6 rounded-2xl bg-neutral-50/70 dark:bg-[#18191E] border border-neutral-200/80 dark:border-neutral-800/80 shadow-2xs overflow-hidden relative">
          <!-- Top Row: Header & Category Count -->
          <div class="w-full flex items-center justify-between text-xs font-sans">
            <span class="font-heading font-semibold text-neutral-900 dark:text-white text-sm sm:text-base">
              Rasio Aliran
            </span>
            <span class="px-2.5 py-0.5 rounded-full text-[11px] font-sans font-semibold bg-neutral-200/70 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 border border-neutral-300/60 dark:border-neutral-700/60">
              3 Kategori Pos
            </span>
          </div>

          <!-- Semi-Donut Canvas (Arch) -->
          <div class="w-full pt-2 sm:pt-3 relative flex items-end justify-center min-h-[185px] sm:min-h-[200px] md:min-h-[210px]">
            <canvas ref="donutCanvas" class="w-full h-full max-h-[210px]"></canvas>

            <!-- Center Overlay inside the Semi-Donut Arch (Informasi Pos Kas) -->
            <div class="absolute bottom-1 sm:bottom-2 inset-x-0 flex flex-col items-center justify-center text-center select-none pb-0.5 pointer-events-auto">
              <div class="w-full max-w-[215px] space-y-1 sm:space-y-1.5">
                <!-- 1. Bahan Baku -->
                <button
                  type="button"
                  class="w-full flex items-center justify-between px-2.5 py-1 rounded-lg transition-all duration-200 cursor-pointer shadow-2xs border text-[11px] font-poppins text-left"
                  :class="activeHoveredSlice === 0
                    ? 'bg-amber-100/90 dark:bg-amber-950/60 border-amber-300 dark:border-amber-700 text-amber-900 dark:text-amber-200 scale-[1.02]'
                    : 'bg-white/95 dark:bg-neutral-900/95 border-neutral-200/80 dark:border-neutral-800 text-neutral-700 dark:text-neutral-300 hover:border-amber-300 dark:hover:border-amber-700 hover:bg-amber-50/60 dark:hover:bg-amber-950/30'"
                  @mouseenter="highlightSlice(0)"
                  @mouseleave="resetHighlight()"
                >
                  <div class="flex items-center gap-1.5 min-w-0">
                    <span class="w-2 h-2 rounded-full bg-amber-500 shrink-0"></span>
                    <span class="font-medium truncate">Bahan Baku</span>
                  </div>
                  <span class="font-bold text-amber-600 dark:text-amber-400 tabular-nums shrink-0">
                    {{ calculatedHppPercent }}%
                  </span>
                </button>

                <!-- 2. Gaji & Sewa -->
                <button
                  type="button"
                  class="w-full flex items-center justify-between px-2.5 py-1 rounded-lg transition-all duration-200 cursor-pointer shadow-2xs border text-[11px] font-poppins text-left"
                  :class="activeHoveredSlice === 1
                    ? 'bg-blue-100/90 dark:bg-blue-950/60 border-blue-300 dark:border-blue-700 text-blue-900 dark:text-blue-200 scale-[1.02]'
                    : 'bg-white/95 dark:bg-neutral-900/95 border-neutral-200/80 dark:border-neutral-800 text-neutral-700 dark:text-neutral-300 hover:border-blue-300 dark:hover:border-blue-700 hover:bg-blue-50/60 dark:hover:bg-blue-950/30'"
                  @mouseenter="highlightSlice(1)"
                  @mouseleave="resetHighlight()"
                >
                  <div class="flex items-center gap-1.5 min-w-0">
                    <span class="w-2 h-2 rounded-full bg-[#0066FF] shrink-0"></span>
                    <span class="font-medium truncate">Gaji & Sewa</span>
                  </div>
                  <span class="font-bold text-blue-600 dark:text-blue-400 tabular-nums shrink-0">
                    {{ calculatedOpexPercent }}%
                  </span>
                </button>

                <!-- 3. Uang Bersih / Tabungan -->
                <button
                  type="button"
                  class="w-full flex items-center justify-between px-2.5 py-1 rounded-lg transition-all duration-200 cursor-pointer shadow-2xs border text-[11px] font-poppins text-left"
                  :class="activeHoveredSlice === 2
                    ? 'bg-emerald-100/90 dark:bg-emerald-950/60 border-emerald-300 dark:border-emerald-700 text-emerald-900 dark:text-emerald-200 scale-[1.02]'
                    : 'bg-white/95 dark:bg-neutral-900/95 border-neutral-200/80 dark:border-neutral-800 text-neutral-700 dark:text-neutral-300 hover:border-emerald-300 dark:hover:border-emerald-700 hover:bg-emerald-50/60 dark:hover:bg-emerald-950/30'"
                  @mouseenter="highlightSlice(2)"
                  @mouseleave="resetHighlight()"
                >
                  <div class="flex items-center gap-1.5 min-w-0">
                    <span class="w-2 h-2 rounded-full bg-emerald-500 shrink-0"></span>
                    <span class="font-medium truncate">Uang Bersih</span>
                  </div>
                  <span class="font-bold text-emerald-600 dark:text-emerald-400 tabular-nums shrink-0">
                    {{ calculatedProfitPercent }}%
                  </span>
                </button>
              </div>
            </div>
          </div>

          <!-- Card Kecil di Bawah Donut Chart Setengah dengan Teks Besar -->
          <div class="w-full mt-3 p-4 sm:p-4.5 rounded-2xl bg-white dark:bg-[#15161A] border border-neutral-200/90 dark:border-neutral-800 shadow-2xs flex items-center justify-between gap-3.5 transition-all hover:border-neutral-300 dark:hover:border-neutral-700">
            <div class="space-y-0.5 min-w-0">
              <div class="flex items-center gap-1.5 text-xs font-poppins font-medium text-neutral-500 dark:text-neutral-400">
                <span>Total Kas Riil Bulan Ini</span>
                <span class="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              </div>
              <p class="text-2xl sm:text-3xl font-heading font-bold text-neutral-900 dark:text-white tabular-nums tracking-tight">
                {{ formatDisplayedAmount(totalCalculatedOmzet) }}
              </p>
            </div>

            <div class="flex items-center gap-2.5 shrink-0">
              <div class="text-right hidden sm:block">
                <span class="text-[11px] font-poppins font-semibold text-emerald-600 dark:text-emerald-400 block">
                  100% Terpetakan
                </span>
                <span class="text-[10px] text-neutral-400 font-sans block">
                  Oktober 2026
                </span>
              </div>
              <div class="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 flex items-center justify-center shadow-2xs">
                <HugeiconsIcon :icon="BanknoteIcon" :size="22" :stroke-width="1.8" />
              </div>
            </div>
          </div>
        </div>

        <!-- Right Column: 3 Detailed Explanation Cards (md:col-span-12 lg:col-span-7) -->
        <div class="md:col-span-12 lg:col-span-7 flex flex-col justify-between gap-3">
          <!-- 1: Bahan Baku -->
          <div
            class="p-3 sm:p-3.5 rounded-2xl bg-white dark:bg-[#18191E] border border-neutral-200/90 dark:border-neutral-800 hover:border-amber-400/80 dark:hover:border-amber-500/60 transition-all duration-200 cursor-pointer group shadow-2xs space-y-1.5"
            @mouseenter="highlightSlice(0)"
            @mouseleave="resetHighlight()"
          >
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-2">
              <div class="flex items-center gap-2 min-w-0">
                <span class="w-2.5 h-2.5 rounded-full bg-amber-500 shrink-0"></span>
                <span class="font-heading font-semibold text-sm sm:text-[15px] text-neutral-900 dark:text-white">
                  1. Belanja Bahan Baku
                </span>
                <span class="px-2 py-0.5 rounded-full text-[10px] sm:text-[11px] font-sans font-semibold bg-amber-50 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300 border border-amber-200/80 dark:border-amber-800/60 shrink-0">
                  {{ calculatedHppPercent }}%
                </span>
              </div>
              <span class="font-heading font-semibold text-neutral-900 dark:text-white text-sm sm:text-base tabular-nums shrink-0">
                {{ formatDisplayedAmount(calculatedHppAmount) }}
              </span>
            </div>
            <p class="text-xs text-neutral-600 dark:text-neutral-300 leading-relaxed font-sans">
              Pembelian bahan baku utama minuman (kopi, susu, perisa), kemasan cup, dan perlengkapan saji harian.
            </p>
            <div class="pt-1.5 border-t border-neutral-100 dark:border-neutral-800/80 flex items-center justify-between text-xs">
              <span class="text-neutral-500 dark:text-neutral-400 font-sans font-medium">Kondisi Pengeluaran:</span>
              <span class="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-sans font-semibold bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-200/80 dark:border-emerald-800/60">
                Sangat Hemat (&lt; 50%)
              </span>
            </div>
          </div>

          <!-- 2: Gaji & Sewa -->
          <div
            class="p-3 sm:p-3.5 rounded-2xl bg-white dark:bg-[#18191E] border border-neutral-200/90 dark:border-neutral-800 hover:border-blue-400/80 dark:hover:border-blue-500/60 transition-all duration-200 cursor-pointer group shadow-2xs space-y-1.5"
            @mouseenter="highlightSlice(1)"
            @mouseleave="resetHighlight()"
          >
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-2">
              <div class="flex items-center gap-2 min-w-0">
                <span class="w-2.5 h-2.5 rounded-full bg-[#0066FF] shrink-0"></span>
                <span class="font-heading font-semibold text-sm sm:text-[15px] text-neutral-900 dark:text-white">
                  2. Gaji Karyawan & Sewa
                </span>
                <span class="px-2 py-0.5 rounded-full text-[10px] sm:text-[11px] font-sans font-semibold bg-blue-50 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300 border border-blue-200/80 dark:border-blue-800/60 shrink-0">
                  {{ calculatedOpexPercent }}%
                </span>
              </div>
              <span class="font-heading font-semibold text-neutral-900 dark:text-white text-sm sm:text-base tabular-nums shrink-0">
                {{ formatDisplayedAmount(calculatedOpexAmount) }}
              </span>
            </div>
            <p class="text-xs text-neutral-600 dark:text-neutral-300 leading-relaxed font-sans">
              Beban upah staf gerai operasional, sewa tempat kedai, listrik, air, dan utilitas bulanan.
            </p>
            <div class="pt-1.5 border-t border-neutral-100 dark:border-neutral-800/80 flex items-center justify-between text-xs">
              <span class="text-neutral-500 dark:text-neutral-400 font-sans font-medium">Efisiensi Operasional:</span>
              <span class="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-sans font-semibold bg-blue-50 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300 border border-blue-200/80 dark:border-blue-800/60">
                Wajar & Sehat (22.3%)
              </span>
            </div>
          </div>

          <!-- 3: Uang Masuk Tabungan -->
          <div
            class="p-3 sm:p-3.5 rounded-2xl bg-white dark:bg-[#18191E] border border-neutral-200/90 dark:border-neutral-800 hover:border-emerald-400/80 dark:hover:border-emerald-500/60 transition-all duration-200 cursor-pointer group shadow-2xs space-y-1.5"
            @mouseenter="highlightSlice(2)"
            @mouseleave="resetHighlight()"
          >
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-2">
              <div class="flex items-center gap-2 min-w-0">
                <span class="w-2.5 h-2.5 rounded-full bg-emerald-500 shrink-0"></span>
                <span class="font-heading font-semibold text-sm sm:text-[15px] text-neutral-900 dark:text-white">
                  3. Uang Masuk Tabungan
                </span>
                <span class="px-2 py-0.5 rounded-full text-[10px] sm:text-[11px] font-sans font-semibold bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-200/80 dark:border-emerald-800/60 shrink-0">
                  {{ calculatedProfitPercent }}%
                </span>
              </div>
              <span class="font-heading font-semibold text-emerald-600 dark:text-emerald-400 text-sm sm:text-base tabular-nums shrink-0">
                {{ formatDisplayedAmount(calculatedProfitAmount) }}
              </span>
            </div>
            <p class="text-xs text-neutral-600 dark:text-neutral-300 leading-relaxed font-sans">
              Uang bersih yang masuk ke rekening kas toko dan siap dialokasikan untuk cadangan ekspansi.
            </p>
            <div class="pt-1.5 border-t border-neutral-100 dark:border-neutral-800/80 flex items-center justify-between text-xs">
              <span class="text-neutral-500 dark:text-neutral-400 font-sans font-medium">Evaluasi Laba:</span>
              <span class="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-sans font-semibold bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-200/80 dark:border-emerald-800/60">
                Optimal & Sehat (32.6%)
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 4. Panduan Sinyal Harian Tokomu (Traffic Light Clean Cards) -->
    <div class="space-y-4">
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <h2 class="text-xl sm:text-2xl font-heading font-semibold text-neutral-900 dark:text-white tracking-tight">
            Panduan Sinyal Harian Tokomu
          </h2>
          <p class="text-sm text-neutral-600 dark:text-neutral-300 font-sans mt-0.5">
            Kondisi penting yang perlu kamu pantau hari ini agar bisnis tetap untung dan aman.
          </p>
        </div>
        <span class="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 font-sans">
          Pembimbing: <strong class="text-neutral-900 dark:text-white font-semibold">{{ umkmStore.profile.consultantName }}</strong> (BNSP #7281)
        </span>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <!-- 1: Hijau -->
        <div class="p-5 sm:p-6 rounded-2xl bg-white dark:bg-[#15161A] border border-neutral-200/90 dark:border-neutral-800 flex flex-col justify-between space-y-4">
          <div class="space-y-2.5">
            <div class="flex items-center justify-between">
              <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-sans font-semibold bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-200/70 dark:border-emerald-800/60">
                <span class="w-2 h-2 rounded-full bg-emerald-500" />
                <span>Kondisi Aman</span>
              </span>
              <span class="text-xs sm:text-sm font-medium text-neutral-600 dark:text-neutral-400">Kas Usaha</span>
            </div>
            <h3 class="font-heading font-semibold text-base sm:text-lg text-neutral-900 dark:text-white leading-snug">
              Uang Toko & Uang Pribadi Sudah 100% Terpisah
            </h3>
            <p class="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed font-sans">
              Tidak ada penarikan kas pribadi yang tercampur kas usaha. Pembelian bahan baku terencana langsung dari supplier rekanan menghemat belanja modal hingga 4.2%.
            </p>
          </div>
          <div class="pt-3.5 border-t border-neutral-100 dark:border-neutral-800 text-xs sm:text-sm text-emerald-700 dark:text-emerald-400 font-semibold">
            Pertahankan setoran kas setiap malam jam 21:00.
          </div>
        </div>

        <!-- 2: Kuning -->
        <div class="p-5 sm:p-6 rounded-2xl bg-white dark:bg-[#15161A] border border-neutral-200/90 dark:border-neutral-800 flex flex-col justify-between space-y-4">
          <div class="space-y-2.5">
            <div class="flex items-center justify-between">
              <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-sans font-semibold bg-amber-50 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border border-amber-200/70 dark:border-amber-800/60">
                <span class="w-2 h-2 rounded-full bg-amber-500" />
                <span>Perlu Perhatian</span>
              </span>
              <span class="text-xs sm:text-sm font-medium text-neutral-600 dark:text-neutral-400">Potongan Mitra</span>
            </div>
            <h3 class="font-heading font-semibold text-base sm:text-lg text-neutral-900 dark:text-white leading-snug">
              Beban Komisi Pesan Antar Online Cukup Tinggi
            </h3>
            <p class="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed font-sans">
              Potongan komisi aplikasi pesan antar memakan margin operasional sekitar Rp 6.800.000 bulan lalu. Sebaiknya optimalkan promosi datang langsung ke kedai.
            </p>
          </div>
          <div class="pt-3.5 border-t border-neutral-100 dark:border-neutral-800 text-xs sm:text-sm text-amber-700 dark:text-amber-400 font-semibold">
            Saran: Buat kartu loyalitas stempel untuk pelanggan takeaway/dine-in langsung.
          </div>
        </div>

        <!-- 3: Biru / Peluang Emas -->
        <div class="p-5 sm:p-6 rounded-2xl bg-white dark:bg-[#15161A] border border-primary-200/90 dark:border-primary-900/60 flex flex-col justify-between space-y-4">
          <div class="space-y-2.5">
            <div class="flex items-center justify-between">
              <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-sans font-semibold bg-primary-50 dark:bg-primary-950/60 text-primary-700 dark:text-primary-300 border border-primary-200/70 dark:border-primary-800/60">
                <span>Peluang Modal</span>
              </span>
              <span class="text-xs sm:text-sm text-primary-700 dark:text-primary-300 font-mono font-bold">Tiket Rp 250 Jt</span>
            </div>
            <h3 class="font-heading font-semibold text-base sm:text-lg text-neutral-900 dark:text-white leading-snug">
              1 Investor Angel Ingin Biayai Gerai Baru
            </h3>
            <p class="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed font-sans">
              Hendro Wicaksono telah meninjau pembukuan terverifikasi tokomu dan berminat menyuntikkan tiket pendanaan ekspansi cabang.
            </p>
          </div>
          <button
            type="button"
            class="w-full px-4 py-2.5 rounded-xl bg-primary-500 hover:bg-primary-600 text-white text-xs sm:text-sm font-heading font-semibold flex items-center justify-between transition-colors active:scale-[0.96] cursor-pointer"
            @click="openInvestorDrawer"
          >
            <span>Buka Surat Tawaran</span>
            <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- 5. Riwayat Arus Kas Terverifikasi (Table matching Trueform Reference) -->
    <div id="verified-cashbook-table" class="bg-white dark:bg-[#15161A] border border-neutral-200/90 dark:border-neutral-800 rounded-2xl p-5 sm:p-7 space-y-5">
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-neutral-100 dark:border-neutral-800/80">
        <div>
          <h2 class="text-xl sm:text-2xl font-heading font-semibold text-neutral-900 dark:text-white tracking-tight">
            Laporan Buku Kas Bulanan Terverifikasi
          </h2>
          <p class="text-sm text-neutral-600 dark:text-neutral-300 font-sans mt-0.5">
            Arus kas 5 bulan terakhir yang sudah dicek langsung oleh konsultan pendamping tokomu.
          </p>
        </div>

        <button
          type="button"
          class="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl border border-neutral-300 dark:border-neutral-700 text-xs sm:text-sm font-heading font-semibold text-neutral-800 dark:text-neutral-100 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors active:scale-[0.96]"
          @click="isTransactionDrawerOpen = true"
        >
          <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
          </svg>
          <span>Input Kas Baru</span>
        </button>
      </div>

      <div class="overflow-x-auto">
        <table class="w-full text-left text-sm font-sans">
          <thead>
            <tr class="border-b border-neutral-200 dark:border-neutral-800 text-neutral-700 dark:text-neutral-300 font-heading text-xs font-bold uppercase tracking-wider">
              <th class="py-3.5 px-3">Bulan Periode</th>
              <th class="py-3.5 px-3 text-right">Omzet Penjualan</th>
              <th class="py-3.5 px-3 text-right">Bahan Baku (HPP)</th>
              <th class="py-3.5 px-3 text-right">Gaji & Sewa</th>
              <th class="py-3.5 px-3 text-right font-bold text-neutral-900 dark:text-white">Uang Bersih (Laba)</th>
              <th class="py-3.5 px-3 text-center">Status Audit</th>
              <th class="py-3.5 px-3 text-right">Aksi</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-neutral-100 dark:divide-neutral-800 text-neutral-800 dark:text-neutral-200">
            <tr
              v-for="rec in umkmStore.monthlyRecords"
              :key="rec.month"
              class="hover:bg-neutral-50/70 dark:hover:bg-neutral-900/60 transition-colors"
            >
              <td class="py-4 px-3 font-heading font-bold text-neutral-900 dark:text-white text-sm sm:text-base">
                {{ rec.month }} {{ rec.year }}
              </td>
              <td class="py-4 px-3 text-right font-mono tabular-nums font-semibold text-neutral-900 dark:text-white">
                Rp {{ rec.omzet.toLocaleString('id-ID') }}
              </td>
              <td class="py-4 px-3 text-right font-mono tabular-nums text-neutral-600 dark:text-neutral-300">
                Rp {{ rec.hpp.toLocaleString('id-ID') }}
              </td>
              <td class="py-4 px-3 text-right font-mono tabular-nums text-neutral-600 dark:text-neutral-300">
                Rp {{ rec.opex.toLocaleString('id-ID') }}
              </td>
              <td class="py-4 px-3 text-right font-mono tabular-nums font-bold text-emerald-600 dark:text-emerald-400 text-sm sm:text-base">
                Rp {{ rec.netProfit.toLocaleString('id-ID') }}
              </td>
              <td class="py-4 px-3 text-center">
                <span class="inline-flex items-center gap-1.5 text-xs font-sans font-semibold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200/80 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800">
                  <span class="w-2 h-2 rounded-full bg-emerald-500" />
                  <span>Valid BNSP</span>
                </span>
              </td>
              <td class="py-4 px-3 text-right">
                <button
                  type="button"
                  class="p-1.5 rounded-lg text-neutral-500 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
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
    </div>


    <!-- SLIDE-OVER SHEET 2: Record Cash Entry Sheet -->
    <BDrawer
      v-model="isTransactionDrawerOpen"
      title="Catat Kas Toko Baru"
      subtitle="Buku Catatan Penjualan & Biaya Harian"
    >
      <div class="space-y-4">
        <div>
          <label class="block text-xs sm:text-sm font-heading font-semibold text-neutral-800 dark:text-neutral-200 mb-1.5">
            Tanggal Pembukuan
          </label>
          <input
            type="date"
            class="w-full px-3.5 py-2.5 text-sm rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500/20"
            :value="new Date().toISOString().substring(0, 10)"
          />
        </div>

        <div>
          <label class="block text-xs sm:text-sm font-heading font-semibold text-neutral-800 dark:text-neutral-200 mb-1.5">
            Total Penjualan Hari Ini (Omzet)
          </label>
          <div class="relative">
            <span class="absolute inset-y-0 left-0 pl-3.5 flex items-center text-sm text-neutral-500 font-mono font-semibold">Rp</span>
            <input
              type="text"
              placeholder="3.500.000"
              class="w-full pl-10 pr-3.5 py-2.5 text-sm sm:text-base rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white font-mono focus:outline-none focus:ring-2 focus:ring-primary-500/20 font-semibold"
            />
          </div>
        </div>

        <div>
          <label class="block text-xs sm:text-sm font-heading font-semibold text-neutral-800 dark:text-neutral-200 mb-1.5">
            Biaya Belanja Bahan Baku (Kopi/Susu)
          </label>
          <div class="relative">
            <span class="absolute inset-y-0 left-0 pl-3.5 flex items-center text-sm text-neutral-500 font-mono font-semibold">Rp</span>
            <input
              type="text"
              placeholder="1.200.000"
              class="w-full pl-10 pr-3.5 py-2.5 text-sm sm:text-base rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white font-mono focus:outline-none focus:ring-2 focus:ring-primary-500/20 font-semibold"
            />
          </div>
        </div>

        <div>
          <label class="block text-xs sm:text-sm font-heading font-semibold text-neutral-800 dark:text-neutral-200 mb-1.5">
            Catatan Tambahan
          </label>
          <textarea
            rows="3"
            placeholder="Contoh: Beli 2 karung biji kopi Temanggung di pasar induk..."
            class="w-full px-3.5 py-2.5 text-sm rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white font-sans focus:outline-none focus:ring-2 focus:ring-primary-500/20 leading-relaxed"
          ></textarea>
        </div>
      </div>

      <template #footer="{ close }">
        <div class="flex items-center justify-end gap-3 w-full">
          <button
            type="button"
            class="px-4 py-2.5 rounded-xl border border-neutral-300 dark:border-neutral-700 text-xs sm:text-sm font-heading font-semibold text-neutral-800 dark:text-neutral-200 hover:bg-neutral-100 transition-colors active:scale-[0.96]"
            @click="close"
          >
            Batal
          </button>
          <button
            type="button"
            class="px-5 py-2.5 rounded-xl bg-primary-500 hover:bg-primary-600 text-white text-xs sm:text-sm font-heading font-semibold shadow-xs transition-colors active:scale-[0.96]"
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
      <div class="space-y-4 pt-1">
        <!-- Input Nama UMKM -->
        <div>
          <label class="block text-xs sm:text-sm font-heading font-semibold text-neutral-800 dark:text-neutral-200 mb-1.5">
            Nama Usaha (UMKM) <span class="text-rose-500">*</span>
          </label>
          <input
            v-model="editStoreName"
            type="text"
            maxlength="60"
            placeholder="Contoh: Kopi Senja Nusantara"
            class="w-full px-3.5 py-2.5 text-sm sm:text-base rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white font-sans focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-colors"
          />
        </div>

        <!-- Input Deskripsi Singkat UMKM -->
        <div>
          <div class="flex items-center justify-between mb-1.5">
            <label class="block text-xs sm:text-sm font-heading font-semibold text-neutral-800 dark:text-neutral-200">
              Deskripsi Singkat UMKM
            </label>
            <span
              :class="[
                'text-[11px] font-sans font-medium tabular-nums transition-colors',
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
            class="w-full px-3.5 py-2.5 text-sm rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white font-sans focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 leading-relaxed transition-colors resize-none"
          ></textarea>
          <p class="text-[11px] text-neutral-500 dark:text-neutral-400 font-sans mt-1">
            Deskripsi ini ditampilkan di bawah nama UMKM pada beranda dan katalog investor.
          </p>
        </div>

        <!-- Alert Error jika ada -->
        <div
          v-if="editError"
          class="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/50 text-rose-700 dark:text-rose-300 text-xs font-sans flex items-center gap-2"
        >
          <HugeiconsIcon :icon="Alert01Icon" :size="16" class="shrink-0" />
          <span>{{ editError }}</span>
        </div>
      </div>

      <template #footer="{ close }">
        <div class="flex items-center justify-end gap-3 w-full">
          <button
            type="button"
            class="px-4 py-2.5 rounded-xl border border-neutral-300 dark:border-neutral-700 text-xs sm:text-sm font-heading font-semibold text-neutral-800 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors active:scale-[0.97]"
            @click="close"
          >
            Batal
          </button>
          <button
            type="button"
            class="px-5 py-2.5 rounded-xl bg-primary-500 hover:bg-primary-600 text-white text-xs sm:text-sm font-heading font-semibold shadow-xs transition-colors active:scale-[0.97] flex items-center gap-1.5"
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
          class="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-4 py-3 rounded-2xl bg-neutral-900/95 dark:bg-white text-white dark:text-neutral-900 shadow-xl border border-neutral-800 dark:border-neutral-200 backdrop-blur-md"
        >
          <div class="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 dark:text-emerald-600 flex items-center justify-center shrink-0">
            <HugeiconsIcon :icon="CheckmarkCircle01Icon" :size="15" />
          </div>
          <span class="text-xs sm:text-sm font-sans font-medium">
            Profil UMKM berhasil diperbarui!
          </span>
        </div>
      </transition>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount, watch } from 'vue'
import { HugeiconsIcon } from '@hugeicons/vue'
import {
  CheckmarkBadge01Icon,
  PencilEdit01Icon,
  CheckmarkCircle01Icon,
  Alert01Icon,
  BanknoteIcon
} from '@hugeicons/core-free-icons'
import { useAuthStore } from '~/stores/auth'
import { useUmkmStore, type MonthlyRecord } from '~/stores/umkm'
import Chart from 'chart.js/auto'
import { gsap } from 'gsap'
import BStatCard from '~/components/base/BStatCard.vue'
import BWalletCard from '~/components/base/BWalletCard.vue'
import BReceiptCard from '~/components/base/BReceiptCard.vue'
import BDropdown from '~/components/base/BDropdown.vue'
import BDrawer from '~/components/base/BDrawer.vue'
import BModal from '~/components/base/BModal.vue'

definePageMeta({
  layout: 'dashboard'
})

const authStore = useAuthStore()
const umkmStore = useUmkmStore()

// Period selection
const selectedPeriod = ref('month')
const periodOptions = [
  { label: 'Bulan Ini', value: 'month' },
  { label: 'Pekan Ini', value: 'week' },
  { label: 'Tahun 2026', value: 'year' }
]

const selectedPeriodLabel = computed(() => {
  return periodOptions.find(p => p.value === selectedPeriod.value)?.label || 'Bulan Ini'
})

const ownerFirstName = computed(() => {
  const name = authStore.currentUser?.name || umkmStore.profile.ownerName || 'Fikri'
  return name.split(' ')[0]
})

const umkmName = computed(() => {
  return umkmStore.profile.name || authStore.currentUser?.businessName || 'Kopi Senja Nusantara'
})

const umkmDescription = computed(() => {
  const desc = umkmStore.profile.description || umkmStore.profile.pitchSummary || ''
  return desc.length > 350 ? desc.slice(0, 350).trim() + '...' : desc
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

// 4 Metric Cards Interactive State (3 Bulan Terakhir)
interface SparkPoint {
  x: number
  y: number
  date: string
  value: string
}

const netProfitPoints: SparkPoint[] = [
  { x: 20, y: 50, date: 'Agustus', value: 'Rp 28.000.000' },
  { x: 140, y: 28, date: 'September', value: 'Rp 31.500.000' },
  { x: 260, y: 12, date: 'Oktober', value: 'Rp 32.600.000' }
]

const cashInflowPoints: SparkPoint[] = [
  { x: 20, y: 50, date: 'Agustus', value: 'Rp 82.000.000' },
  { x: 140, y: 30, date: 'September', value: 'Rp 91.000.000' },
  { x: 260, y: 10, date: 'Oktober', value: 'Rp 100.000.000' }
]

const cashOutflowPoints: SparkPoint[] = [
  { x: 20, y: 46, date: 'Agustus', value: 'Rp 54.000.000' },
  { x: 140, y: 32, date: 'September', value: 'Rp 59.500.000' },
  { x: 260, y: 14, date: 'Oktober', value: 'Rp 67.400.000' }
]

const hoveredProfitPoint = ref<SparkPoint | null>(null)
const hoveredInflowPoint = ref<SparkPoint | null>(null)
const hoveredOutflowPoint = ref<SparkPoint | null>(null)

function handleSparklineHover(e: MouseEvent, type: 'profit' | 'inflow' | 'outflow') {
  const target = e.currentTarget as HTMLElement
  const rect = target.getBoundingClientRect()
  if (!rect.width) return
  const relX = Math.max(0, Math.min(280, ((e.clientX - rect.left) / rect.width) * 280))

  const points = type === 'profit' ? netProfitPoints : type === 'inflow' ? cashInflowPoints : cashOutflowPoints
  let nearest = points[0]
  let minDist = Math.abs(points[0].x - relX)
  for (let i = 1; i < points.length; i++) {
    const d = Math.abs(points[i].x - relX)
    if (d < minDist) {
      minDist = d
      nearest = points[i]
    }
  }

  if (type === 'profit') hoveredProfitPoint.value = nearest
  else if (type === 'inflow') hoveredInflowPoint.value = nearest
  else hoveredOutflowPoint.value = nearest
}

function clearSparklineHover(type: 'profit' | 'inflow' | 'outflow') {
  if (type === 'profit') hoveredProfitPoint.value = null
  else if (type === 'inflow') hoveredInflowPoint.value = null
  else hoveredOutflowPoint.value = null
}

const hppBarWidth = ref(0)

// Total Riil Aliran Kas Bulan Ini (Oktober 2026)
const calculatedHppPercent = computed(() => 45.1)
const calculatedOpexPercent = computed(() => 22.3)
const calculatedProfitPercent = computed(() => 32.6)

const calculatedHppAmount = computed(() => 45100000)
const calculatedOpexAmount = computed(() => 22300000)
const calculatedProfitAmount = computed(() => 32600000)
const totalCalculatedOmzet = computed(() => 100000000)

function formatDisplayedAmount(val: number) {
  return 'Rp ' + val.toLocaleString('id-ID')
}

// Donut Chart State & Controls
const donutCanvas = ref<HTMLCanvasElement | null>(null)
const activeHoveredSlice = ref<number | null>(null)
let donutChartInstance: any = null

function initDonutChart() {
  if (!donutCanvas.value) return

  if (donutChartInstance) {
    donutChartInstance.destroy()
    donutChartInstance = null
  }

  const isDark = typeof document !== 'undefined' && document.documentElement.classList.contains('dark')

  donutChartInstance = new Chart(donutCanvas.value, {
    type: 'doughnut',
    data: {
      labels: ['Belanja Bahan Baku', 'Gaji Karyawan & Sewa', 'Uang Masuk Tabungan'],
      datasets: [
        {
          data: [
            calculatedHppAmount.value,
            calculatedOpexAmount.value,
            calculatedProfitAmount.value
          ],
          backgroundColor: ['#F59E0B', '#0066FF', '#10B981'],
          hoverBackgroundColor: ['#D97706', '#0052CC', '#059669'],
          borderColor: isDark ? '#18191E' : '#FFFFFF',
          borderWidth: 3,
          hoverOffset: 6,
          borderRadius: 4,
          spacing: 3
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      layout: {
        padding: {
          bottom: 0,
          top: 4,
          left: 4,
          right: 4
        }
      },
      rotation: -90,
      circumference: 180,
      cutout: '60%',
      onHover: (_event: any, elements: any[]) => {
        if (elements && elements.length > 0) {
          activeHoveredSlice.value = elements[0].index
        } else {
          activeHoveredSlice.value = null
        }
      },
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: '#111827',
          titleColor: '#FFFFFF',
          bodyColor: '#E5E7EB',
          padding: 12,
          cornerRadius: 10,
          titleFont: { family: 'Poppins', size: 12, weight: 'bold' },
          bodyFont: { family: 'Poppins', size: 12 },
          callbacks: {
            label: (ctx: any) => {
              const val = ctx.raw as number
              const total = totalCalculatedOmzet.value
              const pct = ((val / total) * 100).toFixed(1)
              return ` ${ctx.label}: Rp ${val.toLocaleString('id-ID')} (${pct}%)`
            }
          }
        }
      },
      animation: {
        animateRotate: true,
        animateScale: true,
        duration: 550
      }
    }
  })
}

function updateDonutChart() {
  if (!donutChartInstance) return
  const isDark = typeof document !== 'undefined' && document.documentElement.classList.contains('dark')
  donutChartInstance.data.datasets[0].data = [
    calculatedHppAmount.value,
    calculatedOpexAmount.value,
    calculatedProfitAmount.value
  ]
  donutChartInstance.data.datasets[0].borderColor = isDark ? '#18191E' : '#FFFFFF'
  donutChartInstance.update()
}

function highlightSlice(index: number) {
  activeHoveredSlice.value = index
  if (!donutChartInstance) return
  donutChartInstance.setActiveElements([{ datasetIndex: 0, index }])
  donutChartInstance.tooltip?.setActiveElements([{ datasetIndex: 0, index }], { x: 0, y: 0 })
  donutChartInstance.update()
}

function resetHighlight() {
  activeHoveredSlice.value = null
  if (!donutChartInstance) return
  donutChartInstance.setActiveElements([])
  donutChartInstance.tooltip?.setActiveElements([], { x: 0, y: 0 })
  donutChartInstance.update()
}

// Hero Composed Chart State & Logic
const heroChartCanvas = ref<HTMLCanvasElement | null>(null)
let heroChartInstance: any = null
const heroPeriodFilter = ref<'3m' | '6m' | '1y'>('6m')

const heroFilterOptions = [
  { id: '3m', label: '3 Bulan' },
  { id: '6m', label: '6 Bulan' },
  { id: '1y', label: '1 Tahun (YTD)' }
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
          pointRadius: 0,
          pointHoverRadius: 7,
          pointBackgroundColor: isDark ? '#15161A' : '#FFFFFF',
          pointBorderColor: '#0066FF',
          pointBorderWidth: 3.5,
          pointHoverBackgroundColor: '#0066FF',
          pointHoverBorderColor: isDark ? '#15161A' : '#FFFFFF',
          pointHoverBorderWidth: 3.5,
          pointHitRadius: 16
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
          bodyFont: { family: 'Poppins', size: 11, weight: 'normal' },
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
  // Chart.js clears active element smoothly
}

function setHeroPeriodFilter(filter: '3m' | '6m' | '1y') {
  heroPeriodFilter.value = filter
  updateHeroChart()
}

onMounted(() => {
  // Restore custom banner, avatar, & profile from localStorage if exists
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

  // Trigger HPP Progress bar ease-out animation
  setTimeout(() => {
    hppBarWidth.value = 45.1
  }, 200)

  // Initialize Charts
  initHeroChart()
  initDonutChart()
})

onBeforeUnmount(() => {
  if (heroChartInstance) {
    heroChartInstance.destroy()
    heroChartInstance = null
  }
  if (donutChartInstance) {
    donutChartInstance.destroy()
    donutChartInstance = null
  }
})

// Slide-Over Drawers State
const isTransactionDrawerOpen = ref(false)

function openInvestorDrawer() {
  navigateTo('/dashboard/pendanaan')
}

function openDetailMonth(record: MonthlyRecord) {
  heroPeriodFilter.value = '1y'
  updateHeroChart()
  const idx = heroFilteredRecords.value.findIndex(m => m.month === record.month)
  if (idx !== -1) {
    hoveredHeroIndex.value = idx
    updateHeroChartColors()
  }
}

function scrollToSection(type: 'breakdown' | 'table') {
  if (type === 'breakdown') {
    const el = document.getElementById('cash-flow-breakdown')
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  } else if (type === 'table') {
    const el = document.getElementById('verified-cashbook-table')
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }
}
</script>
