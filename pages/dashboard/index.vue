<template>
  <div class="space-y-6 sm:space-y-8 pb-16 font-poppins text-neutral-900 dark:text-neutral-100">

    <!-- Editorial Greeting & Profile Header (Without bottom border divider) -->
    <header class="gsap-header pt-2 sm:pt-3 pb-2 relative z-10">
      <div class="space-y-2 sm:space-y-3 w-full">
        <!-- Top Row: Name + Verified Checkmark on Left, Edit Profil Button on Right -->
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div class="flex items-center gap-2.5 flex-wrap min-w-0">
            <h1
              class="text-2xl sm:text-[28px] lg:text-[30px] font-poppins font-bold text-neutral-900 dark:text-white tracking-tight leading-[1.15]"
            >
              {{ umkmName }}
            </h1>

            <!-- Verified Badge Rosette Green Gradient (matching Catat Kas button) placed beside UMKM name -->
            <div
              v-if="isVerified"
              class="inline-flex items-center group/badge cursor-help relative"
              title="Terverifikasi OSS RBA"
            >
              <svg
                class="w-6 h-6 sm:w-6.5 sm:h-6.5 shrink-0"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <linearGradient id="name-verified-green-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stop-color="#24C85E" />
                    <stop offset="100%" stop-color="#16A34A" />
                  </linearGradient>
                </defs>
                <path
                  d="M18.9905 19C18.3678 19.6175 17.2393 19.4637 16.4479 19.4637C15.4765 19.4637 15.0087 19.6537 14.3154 20.347C13.7251 20.9374 12.9337 22 12 22C11.0663 22 10.2749 20.9374 9.68457 20.347C8.99128 19.6537 8.52349 19.4637 7.55206 19.4637C6.76068 19.4637 5.63218 19.6175 5.00949 19C4.38181 18.3776 4.53628 17.2444 4.53628 16.4479C4.53628 15.4414 4.31616 14.9786 3.59938 14.2618C2.53314 13.1956 2.00002 12.6624 2 12C2.00001 11.3375 2.53312 10.8044 3.59935 9.73817C4.2392 9.09832 4.53628 8.46428 4.53628 7.55206C4.53628 6.76065 4.38249 5.63214 5 5.00944C5.62243 4.38178 6.7556 4.53626 7.55208 4.53626C8.46427 4.53626 9.09832 4.2392 9.73815 3.59937C10.8044 2.53312 11.3375 2 12 2C12.6625 2 13.1956 2.53312 14.2618 3.59937C14.9015 4.23907 15.5355 4.53626 16.4479 4.53626C17.2393 4.53626 18.3679 4.38247 18.9906 5C19.6182 5.62243 19.4637 6.75559 19.4637 7.55206C19.4637 8.55858 19.6839 9.02137 20.4006 9.73817C21.4669 10.8044 22 11.3375 22 12C22 12.6624 21.4669 13.1956 20.4006 14.2618C19.6838 14.9786 19.4637 15.4414 19.4637 16.4479C19.4637 17.2444 19.6182 18.3776 18.9905 19Z"
                  fill="url(#name-verified-green-gradient)"
                />
                <path
                  d="M8.75 12.5L10.8 14.5L15.25 9.75"
                  stroke="#ffffff"
                  stroke-width="2.4"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>

              <!-- Custom Floating Tooltip -->
              <div
                class="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2.5 py-1 rounded-lg bg-neutral-900 dark:bg-neutral-800 text-white text-[11px] font-poppins font-medium whitespace-nowrap opacity-0 group-hover/badge:opacity-100 transition-all duration-150 pointer-events-none shadow-lg z-30 translate-y-1 group-hover/badge:translate-y-0 border border-neutral-700/60"
              >
                <span class="text-emerald-300 font-medium">Terverifikasi OSS RBA</span>
                <div class="absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-4 border-transparent border-t-neutral-900 dark:border-t-neutral-800" />
              </div>
            </div>
          </div>

          <!-- Action Button: Edit Profil -->
          <NuxtLink
            to="/dashboard/profile"
            class="btn-pill-action group shrink-0 self-start sm:self-auto focus-visible:ring-2 focus-visible:ring-[#156374] focus-visible:outline-hidden active:scale-[0.98] transition-all duration-150"
            title="Edit Profil"
          >
            <span>Edit Profil</span>
            <svg class="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.0" stroke-linecap="round" stroke-linejoin="round">
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </NuxtLink>
        </div>

        <!-- Description: Rata kiri kanan (text-justify), ukuran sesuai body container (text-sm sm:text-[14px]) -->
        <p class="text-justify text-sm sm:text-[14px] text-neutral-600 dark:text-neutral-400 font-poppins leading-relaxed">
          {{ umkmDescription || 'Spesialis kopi arabika susu gula aren dengan 3 outlet aktif di Bandung & margin kotor stabil di atas 48%. Menargetkan ekspansi 2 gerai cloud kitchen dan standardisasi roastery terpusat.' }}
        </p>
      </div>
    </header>

    <!-- 1. Metric Container: 4 Equal Width Financial Cards (Apple Store Utility Card: rounded.lg 18px, spacing.lg 24px) -->
    <div
      class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-stretch w-full"
      :aria-busy="isPageLoading"
    >
      <!-- Loading State: Zero-CLS Shimmer Skeletons -->
      <template v-if="isPageLoading">
        <div
          v-for="i in 4"
          :key="`skel-stat-${i}`"
          class="stat-card-clean animate-pulse min-h-[190px]"
        >
          <div class="flex items-center justify-between w-full">
            <div class="flex items-center gap-3">
              <div class="w-8 h-8 rounded-lg bg-neutral-200 dark:bg-neutral-800" />
              <div class="h-4 w-24 rounded-md bg-neutral-200 dark:bg-neutral-800" />
            </div>
            <div class="h-6 w-14 rounded-full bg-neutral-200 dark:bg-neutral-800" />
          </div>
          <div class="my-auto py-4">
            <div class="h-9 w-36 rounded-md bg-neutral-200 dark:bg-neutral-800" />
          </div>
          <div class="h-9 w-28 rounded-full bg-neutral-200 dark:bg-neutral-800" />
        </div>
      </template>

      <!-- Ideal State: 4 Financial Metric Cards -->
      <template v-else>
        <!-- Card 1: Untung Bersih -->
        <div class="gsap-stat-card flex-1 w-full">
          <div class="stat-card-clean select-none transition-all duration-200">
            <!-- 1. Top Header: Icon + Title & Badge -->
            <div class="flex items-center justify-between w-full gap-2">
              <div class="flex items-center gap-2.5 sm:gap-3 min-w-0">
                <div class="stat-card-icon-box">
                  <HugeiconsIcon
                    :icon="Coins01Icon"
                    :size="18"
                    :stroke-width="2.0"
                    class="text-[#156374] dark:text-[#50AABF] shrink-0"
                  />
                </div>
                <span class="text-sm sm:text-[14px] font-poppins font-semibold text-neutral-800 dark:text-neutral-100 capitalize truncate tracking-[-0.01em]">
                  Untung Bersih
                </span>
              </div>
              <div class="stat-card-badge badge-green">
                <span>+12%</span>
              </div>
            </div>

            <!-- 2. Middle Value Row: Apple lead scale (26px - 28px font-semibold) -->
            <div class="my-auto py-2.5 sm:py-3.5">
              <span class="text-2xl sm:text-[26px] lg:text-[28px] font-poppins font-semibold text-neutral-900 dark:text-white tabular-nums tracking-[-0.02em] block leading-tight">
                Rp 32.600.000
              </span>
            </div>

            <!-- 3. Bottom Action Button: Lihat Rincian -->
            <div class="stat-card-actions">
              <BActionButton
                variant="default"
                icon="chevron"
                @click="scrollToSection('breakdown')"
                custom-class="shrink-0"
              >
                Lihat Rincian
              </BActionButton>
            </div>
          </div>
        </div>

        <!-- Card 2: Modal Jualan -->
        <div class="gsap-stat-card flex-1 w-full">
          <div class="stat-card-clean select-none transition-all duration-200">
            <!-- 1. Top Header: Icon + Title & Badge -->
            <div class="flex items-center justify-between w-full gap-2">
              <div class="flex items-center gap-2.5 sm:gap-3 min-w-0">
                <div class="stat-card-icon-box">
                  <HugeiconsIcon
                    :icon="MoneyBag01Icon"
                    :size="18"
                    :stroke-width="2.0"
                    class="text-[#156374] dark:text-[#50AABF] shrink-0"
                  />
                </div>
                <span class="text-sm sm:text-[14px] font-poppins font-semibold text-neutral-800 dark:text-neutral-100 capitalize truncate tracking-[-0.01em]">
                  Modal Jualan
                </span>
              </div>
              <div class="stat-card-badge badge-green">
                <span>Hemat</span>
              </div>
            </div>

            <!-- 2. Middle Value Row: Apple lead scale (26px - 28px font-semibold) -->
            <div class="my-auto py-2.5 sm:py-3.5">
              <span class="text-2xl sm:text-[26px] lg:text-[28px] font-poppins font-semibold text-neutral-900 dark:text-white tabular-nums tracking-[-0.02em] block leading-tight">
                Rp 45.100.000
              </span>
            </div>

            <!-- 3. Bottom Action Button -->
            <div class="stat-card-actions">
              <BActionButton
                variant="default"
                icon="chevron"
                @click="scrollToSection('breakdown')"
                custom-class="shrink-0"
              >
                Kelola Modal
              </BActionButton>
            </div>
          </div>
        </div>

        <!-- Card 3: Uang Masuk -->
        <div class="gsap-stat-card flex-1 w-full">
          <div class="stat-card-clean select-none transition-all duration-200">
            <!-- 1. Top Header: Icon + Title & Badge -->
            <div class="flex items-center justify-between w-full gap-2">
              <div class="flex items-center gap-2.5 sm:gap-3 min-w-0">
                <div class="stat-card-icon-box">
                  <svg class="w-4 h-4 text-[#156374] dark:text-[#50AABF] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.0" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M17 7 7 17" />
                    <path d="M17 17H7V7" />
                  </svg>
                </div>
                <span class="text-sm sm:text-[14px] font-poppins font-semibold text-neutral-800 dark:text-neutral-100 capitalize truncate tracking-[-0.01em]">
                  Uang Masuk
                </span>
              </div>
              <div class="stat-card-badge badge-green">
                <span>+9.8%</span>
              </div>
            </div>

            <!-- 2. Middle Value Row: Apple lead scale (26px - 28px font-semibold) -->
            <div class="my-auto py-2.5 sm:py-3.5">
              <span class="text-2xl sm:text-[26px] lg:text-[28px] font-poppins font-semibold text-neutral-900 dark:text-white tabular-nums tracking-[-0.02em] block leading-tight">
                Rp 100.000.000
              </span>
            </div>

            <!-- 3. Bottom Action Button -->
            <div class="stat-card-actions">
              <BActionButton
                variant="default"
                icon="chevron"
                @click="scrollToSection('table')"
                custom-class="shrink-0"
              >
                Lihat Semua
              </BActionButton>
            </div>
          </div>
        </div>

        <!-- Card 4: Uang Keluar -->
        <div class="gsap-stat-card flex-1 w-full">
          <div class="stat-card-clean select-none transition-all duration-200">
            <!-- 1. Top Header: Icon + Title & Badge -->
            <div class="flex items-center justify-between w-full gap-2">
              <div class="flex items-center gap-2.5 sm:gap-3 min-w-0">
                <div class="stat-card-icon-box">
                  <svg class="w-4 h-4 text-[#156374] dark:text-[#50AABF] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.0" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M7 17 17 7" />
                    <path d="M7 7h10v10" />
                  </svg>
                </div>
                <span class="text-sm sm:text-[14px] font-poppins font-semibold text-neutral-800 dark:text-neutral-100 capitalize truncate tracking-[-0.01em]">
                  Uang Keluar
                </span>
              </div>
              <div class="stat-card-badge badge-red">
                <span>-4%</span>
              </div>
            </div>

            <!-- 2. Middle Value Row: Apple lead scale (26px - 28px font-semibold) -->
            <div class="my-auto py-2.5 sm:py-3.5">
              <span class="text-2xl sm:text-[26px] lg:text-[28px] font-poppins font-semibold text-neutral-900 dark:text-white tabular-nums tracking-[-0.02em] block leading-tight">
                Rp 67.400.000
              </span>
            </div>

            <!-- 3. Bottom Action Buttons: Grid 2 Kolom -->
            <div class="stat-card-actions grid-cols-2">
              <BActionButton
                variant="green"
                icon="plus"
                @click="isTransactionDrawerOpen = true"
                custom-class="w-full justify-center"
              >
                Catat Kas
              </BActionButton>
              <BActionButton
                variant="default"
                icon="chevron"
                @click="scrollToSection('table')"
                custom-class="w-full justify-center"
              >
                Lihat Rincian
              </BActionButton>
            </div>
          </div>
        </div>
      </template>
    </div>

    <!-- 2. Hero Section: Clean Line Chart (Pergerakan Uang Toko) -->
    <div class="gsap-hero-chart card-tactile-gopay rounded-[18px] p-6 sm:p-7 space-y-6">
      <!-- Header: Title, Subtitle, and Right Actions (Dropdown Chart Type, Dropdown Period, Button Lihat Detail) -->
      <div class="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-2 sm:pb-3">
        <!-- Left: Title & Subtitle -->
        <div class="space-y-1.5 min-w-0 max-w-xl">
          <div class="gsap-hero-header-title">
            <h2 class="text-lg sm:text-[21px] font-poppins font-bold text-neutral-900 dark:text-white tracking-tight">
              Pergerakan Uang Toko
            </h2>
            <p class="text-xs sm:text-[14px] font-poppins text-neutral-500 dark:text-neutral-400 mt-1 leading-normal">
              Grafik pemantauan akumulasi saldo kas riil tokomu dari waktu ke waktu yang selalu tersinkronisasi.
            </p>
          </div>
        </div>

        <!-- Right: Actions Control (Dropdown Jenis Grafik + Dropdown Periode + Button Lihat Detail) -->
        <div class="flex items-center gap-2.5 sm:gap-3 flex-wrap lg:flex-nowrap shrink-0">
          <!-- 1. Dropdown Jenis Grafik (Menggantikan Pill Tab View, Bergaya btn-pill-action) -->
          <div class="relative">
            <button
              type="button"
              class="btn-pill-action group cursor-pointer"
              aria-haspopup="true"
              :aria-expanded="isChartTypeDropdownOpen"
              title="Pilih Jenis Tampilan Grafik"
              @click="isChartTypeDropdownOpen = !isChartTypeDropdownOpen"
            >
              <!-- Active Chart Type Icon -->
              <svg v-if="chartPreviewMode === 'area'" class="w-3.5 h-3.5 text-[#156374] dark:text-[#50AABF] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M3 20h18" />
                <path d="m3 14 5-5 5 4 8-8v15H3z" />
              </svg>
              <svg v-else-if="chartPreviewMode === 'bar'" class="w-3.5 h-3.5 text-[#156374] dark:text-[#50AABF] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                <rect x="3" y="12" width="4" height="8" rx="1" />
                <rect x="10" y="7" width="4" height="13" rx="1" />
                <rect x="17" y="3" width="4" height="17" rx="1" />
              </svg>
              <svg v-else class="w-3.5 h-3.5 text-[#54DE63] dark:text-[#54DE63] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M7 16V4m0 0L3 8m4-4l4 4m6 4v12m0 0l4-4m-4 4l-4-4" />
              </svg>

              <span>{{ activeChartTypeLabel }}</span>

              <svg
                :class="['w-3.5 h-3.5 text-neutral-400 dark:text-neutral-500 transition-transform duration-200 shrink-0', isChartTypeDropdownOpen ? 'rotate-180' : '']"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2.2"
              >
                <path stroke-linecap="round" stroke-linejoin="round" d="m6 9 6 6 6-6" />
              </svg>
            </button>

            <!-- Backdrop -->
            <div
              v-if="isChartTypeDropdownOpen"
              class="fixed inset-0 z-30 bg-transparent"
              @click="isChartTypeDropdownOpen = false"
            />

            <!-- Popover Dropdown Panel -->
            <div
              v-if="isChartTypeDropdownOpen"
              class="absolute right-0 top-full mt-1.5 w-60 rounded-xl bg-[#FDFDFD] dark:bg-[#18191E] border border-[#E2E8F0] dark:border-neutral-700 p-1.5 shadow-xl z-40 font-poppins text-xs"
            >
              <button
                v-for="opt in chartTypeOptions"
                :key="opt.id"
                type="button"
                :class="[
                  'w-full flex items-center justify-between px-3 py-2.5 rounded-lg font-medium transition-colors text-left cursor-pointer',
                  chartPreviewMode === opt.id
                    ? 'bg-[#E6F4F7] dark:bg-[#156374]/30 text-[#156374] dark:text-[#50AABF] font-semibold'
                    : 'text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800'
                ]"
                @click="selectChartType(opt.id)"
              >
                <div class="flex items-center gap-2.5 min-w-0">
                  <svg v-if="opt.id === 'area'" class="w-3.5 h-3.5 shrink-0 text-[#156374] dark:text-[#50AABF]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M3 20h18" />
                    <path d="m3 14 5-5 5 4 8-8v15H3z" />
                  </svg>
                  <svg v-else-if="opt.id === 'bar'" class="w-3.5 h-3.5 shrink-0 text-[#156374] dark:text-[#50AABF]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                    <rect x="3" y="12" width="4" height="8" rx="1" />
                    <rect x="10" y="7" width="4" height="13" rx="1" />
                    <rect x="17" y="3" width="4" height="17" rx="1" />
                  </svg>
                  <svg v-else class="w-3.5 h-3.5 shrink-0 text-[#54DE63] dark:text-[#54DE63]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M7 16V4m0 0L3 8m4-4l4 4m6 4v12m0 0l4-4m-4 4l-4-4" />
                  </svg>
                  <span class="truncate">{{ opt.label }}</span>
                </div>
                <span v-if="chartPreviewMode === opt.id" class="w-1.5 h-1.5 rounded-full bg-[#156374] dark:bg-[#50AABF] shrink-0 ml-2" />
              </button>
            </div>
          </div>

          <!-- 2. Dropdown Filter Periode (Bergaya btn-pill-action) -->
          <div class="relative">
            <button
              type="button"
              class="btn-pill-action group cursor-pointer"
              aria-haspopup="true"
              :aria-expanded="isPeriodDropdownOpen"
              title="Pilih Rentang Waktu"
              @click="isPeriodDropdownOpen = !isPeriodDropdownOpen"
            >
              <svg class="w-3.5 h-3.5 text-neutral-400 dark:text-neutral-500 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
                <line x1="16" x2="16" y1="2" y2="6" />
                <line x1="8" x2="8" y1="2" y2="6" />
                <line x1="3" x2="21" y1="10" y2="10" />
              </svg>
              <span>{{ activePeriodLabel }}</span>
              <svg
                :class="['w-3.5 h-3.5 text-neutral-400 dark:text-neutral-500 transition-transform duration-200 shrink-0', isPeriodDropdownOpen ? 'rotate-180' : '']"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2.2"
              >
                <path stroke-linecap="round" stroke-linejoin="round" d="m6 9 6 6 6-6" />
              </svg>
            </button>

            <!-- Backdrop to close dropdown -->
            <div
              v-if="isPeriodDropdownOpen"
              class="fixed inset-0 z-30 bg-transparent"
              @click="isPeriodDropdownOpen = false"
            />

            <!-- Popover Dropdown Panel -->
            <div
              v-if="isPeriodDropdownOpen"
              class="absolute right-0 top-full mt-1.5 w-36 rounded-xl bg-[#FDFDFD] dark:bg-[#18191E] border border-[#E2E8F0] dark:border-neutral-700 p-1 shadow-xl z-40 font-poppins text-xs"
            >
              <button
                v-for="opt in heroFilterOptions"
                :key="opt.id"
                type="button"
                :class="[
                  'w-full flex items-center justify-between px-3 py-2 rounded-lg font-medium transition-colors text-left cursor-pointer',
                  heroPeriodFilter === opt.id
                    ? 'bg-[#E6F4F7] dark:bg-[#156374]/30 text-[#156374] dark:text-[#50AABF] font-semibold'
                    : 'text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800'
                ]"
                @click="selectPeriodFilter(opt.id)"
              >
                <span>{{ opt.label }}</span>
                <span v-if="heroPeriodFilter === opt.id" class="w-1.5 h-1.5 rounded-full bg-[#156374] dark:bg-[#50AABF]" />
              </button>
            </div>
          </div>

          <!-- 3. Button Lihat Detail -->
          <NuxtLink
            to="/dashboard/progres"
            class="btn-pill-action group shrink-0"
            title="Lihat Detail"
          >
            <span>Lihat Detail</span>
            <svg class="w-4 h-4 shrink-0 transition-transform duration-200 group-hover:translate-x-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.0" stroke-linecap="round" stroke-linejoin="round">
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </NuxtLink>
        </div>
      </div>

      <!-- Shadcn UI Line Chart - Linear / Bar / Area / Cashflow: Pergerakan Uang Toko -->
      <div class="gsap-hero-chart-body relative w-full h-60 sm:h-64 pt-4 sm:pt-6">
        <BShadcnLineChart
          :data="heroFilteredRecords"
          index="month"
          :categories="currentHeroChartCategories"
          :config="currentHeroChartConfig"
          curve-type="linear"
          :show-area="chartPreviewMode === 'area'"
          :mode="chartPreviewMode"
        />
      </div>
    </div>

    <!-- 3. Telemetry Bento Row: Lihat Aliran Kas & Tugas Hari Ini -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-6 items-stretch">
      <!-- Left: Container Kemana saja uang kamu? -->
      <div id="cash-flow-breakdown" class="card-tactile-gopay rounded-[18px] p-6 sm:p-7 flex flex-col justify-between space-y-6">
        <!-- Header: Title & Action (No hairline border-b, ample bottom padding) -->
        <div class="flex items-center justify-between pb-2 sm:pb-3 gap-4 sm:gap-5">
          <div class="min-w-0 pr-2 space-y-1">
            <h2 class="text-lg sm:text-[21px] font-poppins font-bold text-neutral-900 dark:text-white tracking-tight">
              Kemana saja uang kamu?
            </h2>
            <p class="text-xs sm:text-[14px] font-poppins text-neutral-500 dark:text-neutral-400 leading-normal max-w-sm sm:max-w-md">
              Melihat rasio pembagian modal jualan, biaya operasional, serta untung bersih tokomu.
            </p>
          </div>

          <NuxtLink
            to="/dashboard/progres"
            class="btn-pill-action group shrink-0"
          >
            <span>Lihat Detail</span>
            <svg class="w-4 h-4 shrink-0 transition-transform duration-200 group-hover:translate-x-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.0" stroke-linecap="round" stroke-linejoin="round">
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </NuxtLink>
        </div>

        <!-- Body: Ample padding, enlarged Donut Chart & 3 Stat Cards -->
        <div class="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-7 items-center pt-2 sm:pt-4 pb-1">
          <!-- Bagian 1: Donut Chart Besar & Info Total Pendapatan di Bawah Kiri -->
          <div class="flex flex-col justify-between items-center sm:items-start h-full min-h-[230px]">
            <!-- Donut Chart Ring di Bagian Tengah (Enlarged size, no top legend labels) -->
            <div class="relative w-40 h-40 sm:w-44 sm:h-44 my-auto mx-auto flex items-center justify-center">
              <canvas ref="donutCanvas" class="w-full h-full"></canvas>
            </div>

            <!-- Informasi Total di Bagian Bawah Kiri -->
            <div class="pt-3 select-none w-full text-center sm:text-left">
              <div class="text-lg sm:text-xl font-poppins font-bold text-neutral-900 dark:text-white tabular-nums tracking-tight">
                Total: Rp 100.000.000 (100%)
              </div>
              <div class="text-xs sm:text-[13px] font-poppins font-medium text-neutral-500 dark:text-neutral-400 mt-1">
                {{ currentActiveSliceIndex !== null ? displayedMetricLabel : 'Akumulasi pemasukan bulan berjalan' }}
              </div>
            </div>
          </div>

          <!-- Bagian 2: 3 Card Informasi (Title, Body Nominal, & Progress Bar) -->
          <div class="space-y-3.5 flex-1 flex flex-col justify-center">
            <div
              v-for="(item, idx) in breakdownItems"
              :key="item.label"
              class="p-3.5 sm:p-4 rounded-[12px] bg-[#FFFFFF] dark:bg-[#18191E] border border-[#E2E8F0] dark:border-neutral-800 transition-all duration-150 cursor-pointer flex flex-col justify-center group"
              :class="[
                currentActiveSliceIndex === idx
                  ? 'border-[#156374]! dark:border-[#50AABF]! ring-2 ring-[#156374]/20 bg-[#E6F4F7]/40! dark:bg-[#156374]/20!'
                  : 'hover:border-neutral-400 dark:hover:border-neutral-600'
              ]"
              @mouseenter="highlightSlice(idx)"
              @mouseleave="resetHighlight"
              @click="toggleSelectSlice(idx)"
            >
              <!-- Title: Label Informasi -->
              <div class="flex items-center justify-between gap-2">
                <div class="flex items-center gap-2 min-w-0">
                  <span
                    class="w-2.5 h-2.5 rounded-full shrink-0"
                    :style="{ backgroundColor: item.color }"
                  />
                  <span class="font-poppins font-semibold text-xs sm:text-[14px] text-neutral-800 dark:text-neutral-200 truncate">
                    {{ item.label }}
                  </span>
                </div>
                <span class="text-xs sm:text-[12px] font-poppins font-semibold text-neutral-500 dark:text-neutral-400 tabular-nums shrink-0">
                  {{ item.percent }}%
                </span>
              </div>

              <!-- Body: Nominal dari Masing-Masing Informasi -->
              <div class="mt-1 font-poppins font-bold text-sm sm:text-[15px] text-neutral-900 dark:text-white tabular-nums tracking-tight">
                Rp {{ item.amount.toLocaleString('id-ID') }}
              </div>

              <!-- Progress Bar Indikator Visual -->
              <div class="mt-2 w-full h-1.5 rounded-full bg-neutral-200/70 dark:bg-neutral-800 overflow-hidden">
                <div
                  class="h-full rounded-full transition-all duration-300"
                  :style="{
                    width: `${item.percent}%`,
                    backgroundColor: item.color
                  }"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Right: Container Tugas Hari Ini -->
      <div id="daily-tasks-container" class="card-tactile-gopay rounded-[18px] p-6 sm:p-7 flex flex-col justify-between space-y-6">
        <!-- Header: Title & Action (No hairline border-b, ample bottom padding) -->
        <div class="flex items-center justify-between pb-2 sm:pb-3 gap-4 sm:gap-5">
          <div class="min-w-0 pr-2 space-y-1">
            <h2 class="text-lg sm:text-[21px] font-poppins font-bold text-neutral-900 dark:text-white tracking-tight">
              Tugas Hari Ini
            </h2>
            <p class="text-xs sm:text-[14px] font-poppins text-neutral-500 dark:text-neutral-400 leading-normal max-w-sm sm:max-w-md">
              Selesaikan tugas operasional harian tokomu agar pembukuan rapi dan siap validasi.
            </p>
          </div>

          <!-- Button Lihat Semua (Renamed from Lihat Semua Tugas) -->
          <NuxtLink
            to="/dashboard/rencana-aksi"
            class="btn-pill-action group shrink-0"
          >
            <span>Lihat Semua</span>
            <svg class="w-4 h-4 shrink-0 transition-transform duration-200 group-hover:translate-x-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.0" stroke-linecap="round" stroke-linejoin="round">
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </NuxtLink>
        </div>

        <!-- 4 Tasks Cards (Ample vertical padding & uniform neutral deadline color) -->
        <div class="space-y-3 flex-1 flex flex-col justify-start pt-2 sm:pt-4 pb-1">
          <NuxtLink
            v-for="(task, idx) in displayedDailyTasks"
            :key="task.id"
            :to="task.link || '/dashboard/rencana-aksi'"
            class="p-3.5 sm:p-4 rounded-[12px] bg-[#FFFFFF] dark:bg-[#18191E] border border-[#E2E8F0] dark:border-neutral-800 hover:border-neutral-400 dark:hover:border-neutral-600 transition-colors flex items-center justify-between gap-3.5 group cursor-pointer"
          >
            <div class="min-w-0 flex-1 flex flex-col items-start gap-1">
              <!-- Judul Task -->
              <h3 class="font-poppins font-semibold text-xs sm:text-[14px] text-neutral-900 dark:text-white leading-snug line-clamp-1">
                {{ task.title }}
              </h3>

              <!-- Deadline di Bagian Bawah: Uniform neutral text color (no special colors) -->
              <div class="flex items-center gap-1.5 text-xs sm:text-[12px] font-poppins text-neutral-500 dark:text-neutral-400 mt-0.5">
                <svg class="w-3.5 h-3.5 text-neutral-400 dark:text-neutral-500 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
                  <line x1="16" x2="16" y1="2" y2="6" />
                  <line x1="8" x2="8" y1="2" y2="6" />
                  <line x1="3" x2="21" y1="10" y2="10" />
                </svg>
                <span>Deadline: {{ task.deadline }}</span>
              </div>
            </div>

            <!-- Uncontained Green Arrow -->
            <svg
              class="w-4 h-4 text-[#54DE63] dark:text-[#54DE63] shrink-0 transition-transform duration-200 ease-out group-hover:translate-x-0.5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2.0"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M5 12h14" />
              <path d="m13 6 6 6-6 6" />
            </svg>
          </NuxtLink>
        </div>
      </div>
    </div>

    <!-- 4. Rapor Keuangan Bulanan -->
    <div id="verified-cashbook-table" class="card-tactile-gopay rounded-[18px] overflow-hidden font-poppins">
      <div class="px-6 sm:px-7 pt-6 sm:pt-7 pb-5 sm:pb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E2E8F0] dark:border-neutral-800 bg-[#FDFDFD] dark:bg-[#13161F]">
        <div class="space-y-1">
          <h2 class="text-lg sm:text-[21px] font-poppins font-bold text-neutral-900 dark:text-white tracking-tight">
            Rapor Keuangan Bulanan
          </h2>
          <p class="text-xs sm:text-[14px] font-poppins text-neutral-500 dark:text-neutral-400 leading-normal">
            Arus kas 5 bulan terakhir yang sudah dicek langsung oleh konsultan pendamping tokomu.
          </p>
        </div>

        <div class="flex items-center gap-2.5 sm:gap-3 shrink-0 flex-wrap sm:flex-nowrap">
          <!-- Button Unduh 3 Bulan Terakhir (CSV) -->
          <button
            type="button"
            class="btn-pill-action group shrink-0 cursor-pointer"
            title="Unduh Laporan Keuangan 3 Bulan Terakhir (CSV)"
            @click="downloadThreeMonthsReport"
          >
            <HugeiconsIcon :icon="ArrowDownToLineIcon" :size="15" :stroke-width="2.2" class="text-neutral-600 dark:text-neutral-300 transition-transform duration-200 group-hover:translate-y-0.5" />
            <span>Unduh 3 Bulan Terakhir</span>
          </button>

          <!-- Button Lihat Semua (Renamed from Lihat Semua Laporan) -->
          <NuxtLink
            to="/dashboard/progres"
            class="btn-pill-action group shrink-0"
          >
            <span>Lihat Semua</span>
            <svg class="w-4 h-4 shrink-0 transition-transform duration-200 group-hover:translate-x-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.0" stroke-linecap="round" stroke-linejoin="round">
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </NuxtLink>
        </div>
      </div>

      <!-- Table Langsung -->
      <div class="overflow-x-auto w-full">
        <table class="w-full text-left text-xs sm:text-[14px] font-poppins">
          <thead>
            <tr class="bg-[#FDFDFD] dark:bg-[#13161F] border-b border-[#E2E8F0] dark:border-neutral-800 text-neutral-700 dark:text-neutral-300 font-poppins text-xs sm:text-[12.5px] font-semibold uppercase tracking-wider">
              <th class="py-3 px-5 text-left">Bulan</th>
              <th class="py-3 px-4 text-left">Total Pendapatan</th>
              <th class="py-3 px-4 text-left">Modal Jualan</th>
              <th class="py-3 px-4 text-left">Biaya Operasional</th>
              <th class="py-3 px-5 text-left font-bold text-neutral-900 dark:text-white">Untung Bersih</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-neutral-100 dark:divide-neutral-800/80 text-neutral-800 dark:text-neutral-200">
            <!-- 5-State UX Matrix: Empty State -->
            <tr v-if="!latestMonthlyRecords || latestMonthlyRecords.length === 0">
              <td colspan="5" class="py-12 text-center">
                <div class="flex flex-col items-center justify-center max-w-sm mx-auto space-y-2.5 px-4">
                  <div class="w-10 h-10 rounded-xl bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center text-neutral-400 dark:text-neutral-500">
                    <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                      <rect width="18" height="18" x="3" y="3" rx="2" />
                      <path d="M3 9h18" />
                      <path d="M9 21V9" />
                    </svg>
                  </div>
                  <div>
                    <h3 class="font-poppins font-semibold text-xs sm:text-sm text-neutral-800 dark:text-neutral-200">
                      Belum Ada Rapor Keuangan
                    </h3>
                    <p class="font-poppins text-[11px] text-neutral-500 dark:text-neutral-400 mt-1 leading-relaxed">
                      Catat transaksi kas tokomu secara teratur untuk mengaktifkan rekapitulasi performa bisnis otomatis.
                    </p>
                  </div>
                  <button
                    type="button"
                    class="btn-pill-action mt-2 cursor-pointer focus-visible:ring-2 focus-visible:ring-[#2091AA] focus-visible:outline-hidden active:scale-[0.98] transition-all duration-150 ease-[cubic-bezier(0.22,1,0.36,1)]"
                    @click="isTransactionDrawerOpen = true"
                  >
                    <span>Catat Kas Pertama</span>
                  </button>
                </div>
              </td>
            </tr>

            <tr
              v-for="rec in latestMonthlyRecords"
              :key="`${rec.month}-${rec.year}`"
              class="bg-white dark:bg-[#13161F] hover:bg-neutral-50/80 dark:hover:bg-neutral-800/50 transition-colors"
            >
              <td class="py-3 px-4 sm:px-5 text-left font-poppins font-semibold text-neutral-900 dark:text-white text-xs sm:text-[13px]">
                {{ rec.month }} {{ rec.year }}
              </td>
              <td class="py-3 px-3.5 sm:px-4 text-left font-poppins tabular-nums font-semibold text-neutral-900 dark:text-white">
                Rp {{ rec.omzet.toLocaleString('id-ID') }}
              </td>
              <td class="py-3 px-3.5 sm:px-4 text-left font-poppins tabular-nums text-neutral-600 dark:text-neutral-300">
                Rp {{ rec.hpp.toLocaleString('id-ID') }}
              </td>
              <td class="py-3 px-3.5 sm:px-4 text-left font-poppins tabular-nums text-neutral-600 dark:text-neutral-300">
                Rp {{ rec.opex.toLocaleString('id-ID') }}
              </td>
              <td class="py-3 px-4 sm:px-5 text-left font-poppins tabular-nums font-bold text-[#00AA13] dark:text-emerald-400 text-xs sm:text-[13px]">
                Rp {{ rec.netProfit.toLocaleString('id-ID') }}
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
import { ref, computed, onMounted, onBeforeUnmount, watch, nextTick } from 'vue'
import { HugeiconsIcon } from '@hugeicons/vue'
import {
  CheckmarkBadge01Icon,
  PencilEdit01Icon,
  CheckmarkCircle01Icon,
  Alert01Icon,
  BanknoteIcon,
  ArrowRight01Icon,
  Money03Icon,
  MoneyBag01Icon,
  Coins01Icon,
  ArrowDownToLineIcon
} from '@hugeicons/core-free-icons'
import { useAuthStore } from '~/stores/auth'
import { useUmkmStore, type MonthlyRecord } from '~/stores/umkm'
import Chart from 'chart.js/auto'
import { gsap } from 'gsap'
import BShadcnLineChart from '~/components/base/BShadcnLineChart.vue'
import BStatCard from '~/components/base/BStatCard.vue'
import BWalletCard from '~/components/base/BWalletCard.vue'
import BReceiptCard from '~/components/base/BReceiptCard.vue'
import BDropdown from '~/components/base/BDropdown.vue'
import BDrawer from '~/components/base/BDrawer.vue'
import BModal from '~/components/base/BModal.vue'
import BActionButton from '~/components/base/BActionButton.vue'

definePageMeta({
  layout: 'dashboard'
})

function handleDownloadReport() {
  if (typeof window !== 'undefined') {
    window.print()
  }
}

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

// Status Verifikasi UMKM (OSS RBA terbit / bersertifikat)
const isVerified = computed(() => {
  return !!(umkmStore.profile?.certifiedAt || umkmStore.profile?.nib || umkmStore.profile?.fundingStatus === 'READY_FOR_FUNDING')
})

// 4 Task Harian untuk Container Tugas Hari Ini (dengan Deadline Tenggat Waktu Seragam)
const displayedDailyTasks = computed(() => {
  const defaultTasks = [
    { id: 'task-1', title: 'Catat Penjualan & Modal Harian', deadline: 'Hari ini, 17:00 WIB', link: '/dashboard/progres' },
    { id: 'task-2', title: 'Perbarui Bukti Pembukuan Kas', deadline: 'Hari ini, 17:00 WIB', link: '/dashboard/rencana-aksi' },
    { id: 'task-3', title: 'Cek Kelengkapan Izin Usaha NIB', deadline: 'Hari ini, 17:00 WIB', link: '/dashboard/penilaian' },
    { id: 'task-4', title: 'Verifikasi Faktur Suplai Kopi', deadline: 'Hari ini, 17:00 WIB', link: '/dashboard/rencana-aksi' }
  ]
  const tasks = (umkmStore.tasks || []).slice(0, 4)
  if (tasks.length < 4) {
    return defaultTasks
  }
  return tasks.map((t, idx) => ({
    ...t,
    deadline: 'Hari ini, 17:00 WIB',
    link: idx === 0 ? '/dashboard/progres' : idx === 1 ? '/dashboard/rencana-aksi' : idx === 2 ? '/dashboard/penilaian' : '/dashboard/rencana-aksi'
  }))
})

// Urutan bulan kalender untuk sorting data finansial
const monthOrderMap: Record<string, number> = {
  'Januari': 1,
  'Februari': 2,
  'Maret': 3,
  'April': 4,
  'Mei': 5,
  'Juni': 6,
  'Juli': 7,
  'Agustus': 8,
  'September': 9,
  'Oktober': 10,
  'November': 11,
  'Desember': 12
}

// 5-State UX Matrix: Reactive Loading State
const isPageLoading = computed(() => (umkmStore as any).loading || false)

// Top 5 Rapor Keuangan Bulanan Terbaru (Bulan terbaru di posisi paling atas, terlama di bawah)
const latestMonthlyRecords = computed(() => {
  const records = [...(umkmStore.monthlyRecords || [])]
  return records
    .sort((a, b) => {
      const yearDiff = (b.year || 0) - (a.year || 0)
      if (yearDiff !== 0) return yearDiff
      const monthA = monthOrderMap[a.month] || 0
      const monthB = monthOrderMap[b.month] || 0
      return monthB - monthA
    })
    .slice(0, 5)
})

function getTaskCategoryBadgeClass(category: string) {
  const cat = (category || '').toLowerCase()
  if (cat.includes('operasional')) {
    return 'bg-amber-100/90 text-amber-800 border-amber-300 dark:bg-amber-950/70 dark:text-amber-300 dark:border-amber-800'
  }
  if (cat.includes('finansial') || cat.includes('keuangan')) {
    return 'bg-blue-100/90 text-blue-800 border-blue-300 dark:bg-blue-950/70 dark:text-blue-300 dark:border-blue-800'
  }
  if (cat.includes('legalitas') || cat.includes('hukum')) {
    return 'bg-purple-100/90 text-purple-800 border-purple-300 dark:bg-purple-950/70 dark:text-purple-300 dark:border-purple-800'
  }
  if (cat.includes('pemasaran') || cat.includes('marketing')) {
    return 'bg-rose-100/90 text-rose-800 border-rose-300 dark:bg-rose-950/70 dark:text-rose-300 dark:border-rose-800'
  }
  return 'bg-neutral-100 text-neutral-700 border-neutral-300 dark:bg-neutral-800 dark:text-neutral-300 dark:border-neutral-700'
}


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

// Donut Chart State & Controls (Gaya Referensi Donut Card)
const donutCanvas = ref<HTMLCanvasElement | null>(null)
const activeHoveredSlice = ref<number | null>(null)
const activeSelectedSlice = ref<number | null>(null)
let donutChartInstance: any = null

const breakdownItems = computed(() => [
  {
    label: 'Modal Jualan',
    amount: calculatedHppAmount.value,
    percent: calculatedHppPercent.value,
    color: '#3DD5FF',
    badgeClass: 'bg-cyan-50 text-[#156374] border-cyan-200 dark:bg-cyan-950/60 dark:text-cyan-300 dark:border-cyan-800'
  },
  {
    label: 'Biaya Operasional',
    amount: calculatedOpexAmount.value,
    percent: calculatedOpexPercent.value,
    color: '#156374',
    badgeClass: 'bg-cyan-50 text-[#156374] border-cyan-200 dark:bg-cyan-950/60 dark:text-cyan-300 dark:border-cyan-800'
  },
  {
    label: 'Untung Bersih',
    amount: calculatedProfitAmount.value,
    percent: calculatedProfitPercent.value,
    color: '#54DE63',
    badgeClass: 'bg-emerald-50 text-[#00880C] border-emerald-200 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800'
  }
])

function toggleSelectSlice(idx: number) {
  if (activeSelectedSlice.value === idx) {
    activeSelectedSlice.value = null
    resetHighlight()
  } else {
    activeSelectedSlice.value = idx
    highlightSlice(idx)
  }
}

const currentActiveSliceIndex = computed(() => {
  if (activeHoveredSlice.value !== null) return activeHoveredSlice.value
  if (activeSelectedSlice.value !== null) return activeSelectedSlice.value
  return null
})

const displayedMetricAmount = computed(() => {
  const idx = currentActiveSliceIndex.value
  if (idx !== null && breakdownItems.value[idx]) {
    return 'Rp ' + breakdownItems.value[idx].amount.toLocaleString('id-ID')
  }
  return formatDisplayedAmount(totalCalculatedOmzet.value)
})

const displayedMetricLabel = computed(() => {
  const idx = currentActiveSliceIndex.value
  if (idx !== null && breakdownItems.value[idx]) {
    return `${breakdownItems.value[idx].label} (${breakdownItems.value[idx].percent}%)`
  }
  return 'Total Pendapatan'
})

const displayedMetricBadgeText = computed(() => {
  const idx = currentActiveSliceIndex.value
  if (idx !== null && breakdownItems.value[idx]) {
    return `${breakdownItems.value[idx].percent}% Porsi`
  }
  return `+${calculatedProfitPercent.value}% Untung Bersih`
})

const displayedMetricBadgeClass = computed(() => {
  const idx = currentActiveSliceIndex.value
  if (idx !== null && breakdownItems.value[idx]) {
    return breakdownItems.value[idx].badgeClass
  }
  return 'bg-emerald-50 text-[#00880C] border-emerald-200 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800'
})

function initDonutChart() {
  if (!donutCanvas.value) return

  if (donutChartInstance) {
    donutChartInstance.destroy()
    donutChartInstance = null
  }

  donutChartInstance = new Chart(donutCanvas.value, {
    type: 'doughnut',
    data: {
      labels: ['Modal Jualan', 'Biaya Operasional', 'Untung Bersih'],
      datasets: [
        {
          data: [
            calculatedHppAmount.value,
            calculatedOpexAmount.value,
            calculatedProfitAmount.value
          ],
          backgroundColor: ['#3DD5FF', '#156374', '#54DE63'],
          hoverBackgroundColor: ['#28C4ED', '#0E4E5C', '#3EC54E'],
          borderWidth: 0,
          hoverOffset: 0,
          borderRadius: 8,
          spacing: 5
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      layout: {
        padding: {
          bottom: 4,
          top: 4,
          left: 4,
          right: 4
        }
      },
      rotation: -90,
      circumference: 360,
      cutout: '66%',
      onHover: (event: any, elements: any[]) => {
        if (elements && elements.length > 0) {
          activeHoveredSlice.value = elements[0].index
        } else if (activeSelectedSlice.value === null) {
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
  donutChartInstance.data.labels = ['Modal Jualan', 'Biaya Operasional', 'Untung Bersih']
  donutChartInstance.data.datasets[0].data = [
    calculatedHppAmount.value,
    calculatedOpexAmount.value,
    calculatedProfitAmount.value
  ]
  donutChartInstance.data.datasets[0].backgroundColor = ['#3DD5FF', '#156374', '#54DE63']
  donutChartInstance.data.datasets[0].hoverBackgroundColor = ['#28C4ED', '#0E4E5C', '#3EC54E']
  donutChartInstance.data.datasets[0].borderWidth = 0
  donutChartInstance.data.datasets[0].hoverOffset = 0
  donutChartInstance.data.datasets[0].borderRadius = 8
  donutChartInstance.data.datasets[0].spacing = 5
  donutChartInstance.options.circumference = 360
  donutChartInstance.options.cutout = '66%'
  donutChartInstance.update()
}

watch(donutCanvas, (newEl) => {
  if (newEl) {
    nextTick(() => {
      initDonutChart()
    })
  }
})

function highlightSlice(index: number) {
  activeHoveredSlice.value = index
  if (!donutChartInstance) return
  donutChartInstance.tooltip?.setActiveElements([{ datasetIndex: 0, index }], { x: 0, y: 0 })
  donutChartInstance.update()
}

function resetHighlight() {
  if (activeSelectedSlice.value !== null) {
    activeHoveredSlice.value = null
    return
  }
  activeHoveredSlice.value = null
  if (!donutChartInstance) return
  donutChartInstance.setActiveElements([])
  donutChartInstance.tooltip?.setActiveElements([], { x: 0, y: 0 })
  donutChartInstance.update()
}

// Hero Shadcn UI Chart Config, Preview Switcher & Period Logic
const chartPreviewMode = ref<'area' | 'bar' | 'cashflow'>('area')
const isChartTypeDropdownOpen = ref(false)

const chartTypeOptions: { id: 'area' | 'bar' | 'cashflow'; label: string }[] = [
  { id: 'area', label: 'Grafik Area (Saldo Kas)' },
  { id: 'bar', label: 'Grafik Batang (Saldo Kas)' },
  { id: 'cashflow', label: 'Arus Kas (Masuk vs Keluar)' }
]

const activeChartTypeLabel = computed(() => {
  return chartTypeOptions.find(o => o.id === chartPreviewMode.value)?.label || 'Grafik Area (Saldo Kas)'
})

function selectChartType(mode: 'area' | 'bar' | 'cashflow') {
  chartPreviewMode.value = mode
  isChartTypeDropdownOpen.value = false
}

const currentHeroChartCategories = computed(() => {
  if (chartPreviewMode.value === 'cashflow') {
    return ['omzet', 'outflow']
  }
  return ['cashBalance']
})

const currentHeroChartConfig = computed(() => {
  if (chartPreviewMode.value === 'cashflow') {
    return {
      omzet: {
        label: 'Uang Masuk',
        color: '#54DE63'
      },
      outflow: {
        label: 'Uang Keluar',
        color: '#156374'
      }
    }
  }
  return {
    cashBalance: {
      label: 'Saldo Kas',
      color: '#156374'
    }
  }
})

const heroPeriodFilter = ref<'3m' | '6m' | '1y'>('6m')
const isPeriodDropdownOpen = ref(false)

const heroChartConfig = {
  cashBalance: {
    label: 'Saldo Kas',
    color: '#156374'
  }
}

const heroFilterOptions: { id: '3m' | '6m' | '1y'; label: string }[] = [
  { id: '3m', label: '3 Bulan' },
  { id: '6m', label: '6 Bulan' },
  { id: '1y', label: '1 Tahun' }
]

const activePeriodLabel = computed(() => {
  return heroFilterOptions.find(o => o.id === heroPeriodFilter.value)?.label || '6 Bulan'
})

function selectPeriodFilter(filter: '3m' | '6m' | '1y') {
  heroPeriodFilter.value = filter
  isPeriodDropdownOpen.value = false
}

const heroFilteredRecords = computed(() => {
  const records = (umkmStore.monthlyRecords || []).map(r => ({
    ...r,
    outflow: (r.hpp || 0) + (r.opex || 0)
  }))
  if (heroPeriodFilter.value === '3m') {
    return records.slice(-3)
  } else if (heroPeriodFilter.value === '6m') {
    return records.slice(-6)
  }
  return records
})

// Unduh Rapor Keuangan 3 Bulan Terakhir (Agustus, September, Oktober 2026) format CSV
function downloadThreeMonthsReport() {
  const records = latestMonthlyRecords.value.slice(0, 3)
  const headers = ['Bulan', 'Tahun', 'Total Pendapatan (Omzet)', 'Modal Jualan (HPP)', 'Biaya Operasional (OPEX)', 'Untung Bersih (Net Profit)']
  const rows = records.map(r => [
    `"${r.month}"`,
    r.year,
    r.omzet,
    r.hpp,
    r.opex,
    r.netProfit
  ])

  const csvContent = [
    headers.join(','),
    ...rows.map(row => row.join(','))
  ].join('\r\n')

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.setAttribute('href', url)
  link.setAttribute('download', `Laporan_Keuangan_3Bulan_${umkmName.value.replace(/\s+/g, '_')}_2026.csv`)
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
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

  // Fetch live dashboard data from API
  umkmStore.fetchDashboardData()

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

  // GSAP Hero Chart ("Pergerakan Uang Toko") Entrance Choreography
  const heroTl = gsap.timeline({ delay: 0.12 })
  heroTl
    .from('.gsap-hero-chart', {
      opacity: 0,
      y: 16,
      duration: 0.55,
      ease: 'power2.out'
    })
    .from(
      ['.gsap-hero-header-title', '.gsap-hero-header-tabs'],
      {
        opacity: 0,
        y: 8,
        duration: 0.4,
        stagger: 0.06,
        ease: 'power2.out'
      },
      '-=0.3'
    )
    .from(
      '.gsap-hero-chart-body',
      {
        opacity: 0,
        duration: 0.4,
        ease: 'power1.out'
      },
      '-=0.2'
    )

  // Trigger HPP Progress bar ease-out animation
  setTimeout(() => {
    hppBarWidth.value = 45.1
  }, 200)

  // Initialize Charts
  initDonutChart()
})

onBeforeUnmount(() => {
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

<style scoped>
/* Hilangkan efek shadow, set background putih #FDFDFD & pertebal stroke konsisten pada container di halaman beranda */
.card-tactile-gopay,
:deep(.card-tactile-gopay) {
  background-color: #FDFDFD !important;
  box-shadow: none !important;
  border-width: 1.5px !important;
  border-color: #E2E8F0 !important;
}

.dark .card-tactile-gopay,
:deep(.dark .card-tactile-gopay),
:deep(.dark) .card-tactile-gopay {
  background-color: #13161F !important;
  border-color: rgba(255, 255, 255, 0.15) !important;
}

.card-tactile-gopay::before,
:deep(.card-tactile-gopay::before) {
  display: none !important;
  box-shadow: none !important;
}
</style>
