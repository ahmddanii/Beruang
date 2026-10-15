<template>
  <div class="space-y-6 pb-20 font-sans text-neutral-900 dark:text-neutral-100">


    <!-- Editorial Greeting & Profile Header -->
    <header class="gsap-header pt-2 pb-5 sm:pb-6 border-b border-neutral-200/80 dark:border-neutral-800/80 relative z-10">
      <div class="flex items-start sm:items-center gap-4 sm:gap-6 lg:gap-7">
        <!-- Avatar Link to Profile Page with Thick White Border, Soft Black Shadow & Enlarged Green Verified Badge -->
        <div class="relative shrink-0 mt-0.5 sm:mt-0">
          <NuxtLink
            to="/dashboard/profile"
            class="relative group block"
            title="Buka Halaman Profil & Banner"
          >
            <!-- Avatar Container dengan Border Tebal Putih & Soft Black Shadow (Diperbesar) -->
            <div
              class="p-1.5 sm:p-2 lg:p-2.5 rounded-full bg-white dark:bg-[#151922] shadow-[0_6px_24px_rgba(0,0,0,0.14),0_2px_8px_rgba(0,0,0,0.06)]"
            >
              <img
                :src="umkmStore.profile.ownerAvatarUrl || authStore.currentUser?.avatar || '/images/user-profile.png'"
                :alt="umkmName"
                class="w-20 h-20 sm:w-28 sm:h-28 lg:w-32 lg:h-32 rounded-full object-cover block"
              />
            </div>
          </NuxtLink>

          <!-- Verified Badge Overlay di Pojok Kanan Atas Avatar (Warna Hijau & Diperbesar, Tanpa Zoom) -->
          <div
            v-if="isVerified"
            class="absolute top-0 right-0 sm:top-0.5 sm:right-0.5 z-20 group/badge"
          >
            <div
              class="relative inline-flex items-center justify-center cursor-help"
              tabindex="0"
              aria-label="Terverifikasi OSS RBA"
            >
              <!-- Verified Badge Rosette Hijau Khas Fintech/GoPay (Diperbesar) -->
              <svg
                class="w-7 h-7 sm:w-8 sm:h-8 lg:w-9 lg:h-9 shrink-0 drop-shadow-[0_2px_8px_rgba(0,166,42,0.4)]"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <linearGradient id="avatar-verified-green-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stop-color="#00C058" />
                    <stop offset="55%" stop-color="#00A62A" />
                    <stop offset="100%" stop-color="#007D13" />
                  </linearGradient>
                </defs>
                <path
                  d="M18.9905 19C18.3678 19.6175 17.2393 19.4637 16.4479 19.4637C15.4765 19.4637 15.0087 19.6537 14.3154 20.347C13.7251 20.9374 12.9337 22 12 22C11.0663 22 10.2749 20.9374 9.68457 20.347C8.99128 19.6537 8.52349 19.4637 7.55206 19.4637C6.76068 19.4637 5.63218 19.6175 5.00949 19C4.38181 18.3776 4.53628 17.2444 4.53628 16.4479C4.53628 15.4414 4.31616 14.9786 3.59938 14.2618C2.53314 13.1956 2.00002 12.6624 2 12C2.00001 11.3375 2.53312 10.8044 3.59935 9.73817C4.2392 9.09832 4.53628 8.46428 4.53628 7.55206C4.53628 6.76065 4.38249 5.63214 5 5.00944C5.62243 4.38178 6.7556 4.53626 7.55208 4.53626C8.46427 4.53626 9.09832 4.2392 9.73815 3.59937C10.8044 2.53312 11.3375 2 12 2C12.6625 2 13.1956 2.53312 14.2618 3.59937C14.9015 4.23907 15.5355 4.53626 16.4479 4.53626C17.2393 4.53626 18.3679 4.38247 18.9906 5C19.6182 5.62243 19.4637 6.75559 19.4637 7.55206C19.4637 8.55858 19.6839 9.02137 20.4006 9.73817C21.4669 10.8044 22 11.3375 22 12C22 12.6624 21.4669 13.1956 20.4006 14.2618C19.6838 14.9786 19.4637 15.4414 19.4637 16.4479C19.4637 17.2444 19.6182 18.3776 18.9905 19Z"
                  fill="url(#avatar-verified-green-gradient)"
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
                class="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2.5 py-1 rounded-lg bg-neutral-900 dark:bg-neutral-800 text-white text-[11px] font-sans font-medium whitespace-nowrap opacity-0 group-hover/badge:opacity-100 transition-all duration-150 pointer-events-none shadow-lg z-30 translate-y-1 group-hover/badge:translate-y-0 border border-neutral-700/60"
              >
                <div class="flex items-center gap-1.5">
                  <span class="text-emerald-300 font-medium">Terverifikasi OSS RBA</span>
                </div>
                <!-- Tooltip Arrow Pointer -->
                <div class="absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-4 border-transparent border-t-neutral-900 dark:border-t-neutral-800" />
              </div>
            </div>
          </div>
        </div>

        <!-- Right Content: Name row with Edit Profile button, and well-proportioned description -->
        <div class="flex-1 min-w-0 space-y-2 sm:space-y-3">
          <!-- Top Row: Name on left, Edit Profile button on right (Sejajar dengan nama UMKM) -->
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div class="flex items-center gap-2 flex-wrap min-w-0">
              <h1
                class="text-3xl sm:text-4xl lg:text-[40px] lg:leading-tight font-heading font-bold text-neutral-900 dark:text-white tracking-tight"
                style="font-weight: 700;"
              >
                {{ umkmName }}
              </h1>
            </div>

            <!-- Action Button: Edit Profil Usaha (Sejajar dengan nama UMKM) -->
            <NuxtLink
              to="/dashboard/profile"
              class="btn-pill-action group shrink-0 self-start sm:self-auto"
              title="Edit Profil Usaha"
            >
              <span>Edit Profil Usaha</span>
              <svg class="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </NuxtLink>
          </div>

          <!-- Description: Ukuran diperbesar dan nyaman dibaca secara editorial -->
          <p class="text-sm sm:text-base lg:text-[17px] text-neutral-600 dark:text-neutral-300 font-sans leading-relaxed max-w-xl md:max-w-2xl lg:max-w-3xl">
            {{ umkmDescription || 'Spesialis kopi arabika susu gula aren dengan 3 outlet aktif di Bandung & margin kotor stabil di atas 48%.' }}
          </p>
        </div>
      </div>
    </header>

    <!-- 1. Metric Grid: 4 Horizontal Financial Cards (Posisi Atas Sesuai Permintaan) -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-stretch">
      <!-- Card 1: Untung Bersih -->
      <div class="gsap-stat-card flex-1">
        <div class="group relative rounded-2xl card-tactile-gopay has-blue-banner hover:border-neutral-400 dark:hover:border-neutral-600 overflow-hidden flex flex-col justify-between select-none h-full transition-all duration-200">
          <!-- 1. Top: Container Biru untuk Title -->
          <div class="w-full px-5 sm:px-6 py-3 sm:py-3.5 card-header-blue-banner flex items-center gap-2.5 sm:gap-3">
            <HugeiconsIcon
              :icon="Money03Icon"
              :size="20"
              :stroke-width="2.2"
              class="text-white shrink-0"
            />
            <span class="text-xs sm:text-sm font-poppins font-semibold uppercase tracking-wider text-white truncate">
              UNTUNG BERSIH
            </span>
          </div>

          <!-- 2. Bottom: Container Informasi dengan Rounded Corner di Atas (Warna Biru Memenuhi di Belakangnya) -->
          <div class="w-full rounded-t-2xl bg-[#F6F8FA] dark:bg-[#13161F] px-5 sm:px-6 pt-4.5 pb-5 sm:pt-5 sm:pb-5.5 flex flex-col gap-3.5 sm:gap-4 flex-1">
            <!-- Middle Value Row -->
            <div>
              <span class="text-2xl sm:text-[28px] lg:text-3xl font-poppins font-bold text-neutral-900 dark:text-white tabular-nums tracking-tight block leading-tight">
                Rp 32.600.000
              </span>
              <!-- Subtext Row -->
              <div class="mt-2 text-xs sm:text-[13px] font-poppins text-neutral-500 dark:text-neutral-400 flex items-center gap-1.5 leading-normal">
                <span>Bulan Ini</span>
                <span class="text-emerald-600 dark:text-emerald-400 font-semibold tabular-nums">+12% (MoM)</span>
              </div>
            </div>

            <!-- Bottom Action Button Row -->
            <div class="pt-0.5">
              <button
                type="button"
                class="btn-pill-action group"
                @click="scrollToSection('breakdown')"
              >
                <span>Lihat Rincian</span>
                <svg class="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Card 2: Modal Jualan -->
      <div class="gsap-stat-card flex-1">
        <div class="group relative rounded-2xl card-tactile-gopay has-blue-banner hover:border-neutral-400 dark:hover:border-neutral-600 overflow-hidden flex flex-col justify-between select-none h-full transition-all duration-200">
          <!-- 1. Top: Container Biru untuk Title -->
          <div class="w-full px-5 sm:px-6 py-3 sm:py-3.5 card-header-blue-banner flex items-center gap-2.5 sm:gap-3">
            <HugeiconsIcon
              :icon="MoneyBag01Icon"
              :size="20"
              :stroke-width="2.2"
              class="text-white shrink-0"
            />
            <span class="text-xs sm:text-sm font-poppins font-semibold uppercase tracking-wider text-white truncate">
              MODAL JUALAN
            </span>
          </div>

          <!-- 2. Bottom: Container Informasi dengan Rounded Corner di Atas (Warna Biru Memenuhi di Belakangnya) -->
          <div class="w-full rounded-t-2xl bg-[#F6F8FA] dark:bg-[#13161F] px-5 sm:px-6 pt-4.5 pb-5 sm:pt-5 sm:pb-5.5 flex flex-col gap-3.5 sm:gap-4 flex-1">
            <!-- Middle Value Row -->
            <div>
              <span class="text-2xl sm:text-[28px] lg:text-3xl font-poppins font-bold text-neutral-900 dark:text-white tabular-nums tracking-tight block leading-tight">
                45.1%
              </span>
              <!-- Subtext Row -->
              <div class="mt-2 text-xs sm:text-[13px] font-poppins text-neutral-500 dark:text-neutral-400 flex items-center gap-1.5 leading-normal">
                <span>Target Maks. &lt; 50%</span>
                <span class="text-emerald-600 dark:text-emerald-400 font-semibold">(Sangat Hemat)</span>
              </div>
            </div>

            <!-- Bottom Action Button Row -->
            <div class="pt-0.5">
              <button
                type="button"
                class="btn-pill-action group"
                @click="scrollToSection('breakdown')"
              >
                <span>Kelola HPP</span>
                <svg class="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Card 3: Uang Masuk -->
      <div class="gsap-stat-card flex-1">
        <div class="group relative rounded-2xl card-tactile-gopay has-blue-banner hover:border-neutral-400 dark:hover:border-neutral-600 overflow-hidden flex flex-col justify-between select-none h-full transition-all duration-200">
          <!-- 1. Top: Container Biru untuk Title -->
          <div class="w-full px-5 sm:px-6 py-3 sm:py-3.5 card-header-blue-banner flex items-center gap-2.5 sm:gap-3">
            <svg class="w-5 h-5 text-white shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">
              <path d="M17 7 7 17" />
              <path d="M17 17H7V7" />
            </svg>
            <span class="text-xs sm:text-sm font-poppins font-semibold uppercase tracking-wider text-white truncate">
              UANG MASUK
            </span>
          </div>

          <!-- 2. Bottom: Container Informasi dengan Rounded Corner di Atas (Warna Biru Memenuhi di Belakangnya) -->
          <div class="w-full rounded-t-2xl bg-[#F6F8FA] dark:bg-[#13161F] px-5 sm:px-6 pt-4.5 pb-5 sm:pt-5 sm:pb-5.5 flex flex-col gap-3.5 sm:gap-4 flex-1">
            <!-- Middle Value Row -->
            <div>
              <span class="text-2xl sm:text-[28px] lg:text-3xl font-poppins font-bold text-neutral-900 dark:text-white tabular-nums tracking-tight block leading-tight">
                Rp 100.000.000
              </span>
              <!-- Subtext Row -->
              <div class="mt-2 text-xs sm:text-[13px] font-poppins text-neutral-500 dark:text-neutral-400 flex items-center gap-1.5 leading-normal">
                <span>30 Hari Terakhir</span>
                <span class="text-emerald-600 dark:text-emerald-400 font-semibold tabular-nums">+9.8%</span>
              </div>
            </div>

            <!-- Bottom Action Button Row -->
            <div class="pt-0.5">
              <button
                type="button"
                class="btn-pill-action group"
                @click="scrollToSection('table')"
              >
                <span>Lihat Semua</span>
                <svg class="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Card 4: Uang Keluar -->
      <div class="gsap-stat-card flex-1">
        <div class="group relative rounded-2xl card-tactile-gopay has-blue-banner hover:border-neutral-400 dark:hover:border-neutral-600 overflow-hidden flex flex-col justify-between select-none h-full transition-all duration-200">
          <!-- 1. Top: Container Biru untuk Title -->
          <div class="w-full px-5 sm:px-6 py-3 sm:py-3.5 card-header-blue-banner flex items-center gap-2.5 sm:gap-3">
            <svg class="w-5 h-5 text-white shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">
              <path d="M7 17 17 7" />
              <path d="M7 7h10v10" />
            </svg>
            <span class="text-xs sm:text-sm font-poppins font-semibold uppercase tracking-wider text-white truncate">
              UANG KELUAR
            </span>
          </div>

          <!-- 2. Bottom: Container Informasi dengan Rounded Corner di Atas (Warna Biru Memenuhi di Belakangnya) -->
          <div class="w-full rounded-t-2xl bg-[#F6F8FA] dark:bg-[#13161F] px-5 sm:px-6 pt-4.5 pb-5 sm:pt-5 sm:pb-5.5 flex flex-col gap-3.5 sm:gap-4 flex-1">
            <!-- Middle Value Row -->
            <div>
              <span class="text-2xl sm:text-[28px] lg:text-3xl font-poppins font-bold text-neutral-900 dark:text-white tabular-nums tracking-tight block leading-tight">
                Rp 67.400.000
              </span>
              <!-- Subtext Row -->
              <div class="mt-2 text-xs sm:text-[13px] font-poppins text-neutral-500 dark:text-neutral-400 flex items-center gap-1.5 leading-normal">
                <span>30 Hari Terakhir</span>
                <span class="text-neutral-500 dark:text-neutral-400 font-poppins">Total HPP & Beban</span>
              </div>
            </div>

            <!-- Bottom Action Button Row -->
            <div class="pt-0.5">
              <button
                type="button"
                class="btn-pill-action group"
                @click="isTransactionDrawerOpen = true"
              >
                <span>Catat Kas</span>
                <svg class="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 2. Hero Section: Clean Line Chart (Pergerakan Uang Toko) -->
    <div class="gsap-hero-chart card-tactile-gopay rounded-2xl p-5 sm:p-7 space-y-5">
      <!-- Header: Title, Subtitle, and Right Column (Macro Period Tabs sejajar dengan judul grafik di Kanan Atas) -->
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-5 pb-5 border-b border-neutral-100 dark:border-neutral-800/80">
        <!-- Left: Title & Subtitle -->
        <div class="space-y-1.5 sm:space-y-2 min-w-0 max-w-xl">
          <div class="gsap-hero-header-title">
            <h2 class="text-xl sm:text-2xl font-poppins font-bold text-neutral-900 dark:text-white tracking-tight">
              Pergerakan Uang Toko
            </h2>
            <p class="text-xs sm:text-[13px] font-poppins text-neutral-500 dark:text-neutral-400 mt-1 leading-normal">
              Grafik pemantauan akumulasi saldo kas riil toko dari waktu ke waktu secara real-time.
            </p>
          </div>
        </div>

        <!-- Right: Macro Time Period Filters (3 Bulan, 6 Bulan, 1 Tahun) di Kanan Atas (Sejajar dengan Judul) -->
        <div class="segmented-pill-container gsap-hero-header-tabs relative shrink-0">
          <!-- GSAP Animated Sliding Pill Indicator -->
          <div
            ref="tabIndicatorRef"
            class="segmented-pill-indicator"
            aria-hidden="true"
          />

          <button
            v-for="opt in heroFilterOptions"
            :key="opt.id"
            :ref="el => setTabButtonRef(opt.id, el)"
            type="button"
            class="segmented-pill-btn"
            :class="heroPeriodFilter === opt.id ? 'is-active' : 'is-inactive'"
            @click="setHeroPeriodFilter(opt.id)"
          >
            <span>{{ opt.label }}</span>
          </button>
        </div>
      </div>

      <!-- Shadcn UI Line Chart - Linear: Pergerakan Uang Toko -->
      <div class="gsap-hero-chart-body relative w-full h-72 sm:h-80 pt-1">
        <BShadcnLineChart
          :data="heroFilteredRecords"
          index="month"
          :categories="['cashBalance']"
          :config="heroChartConfig"
          curve-type="linear"
        />
      </div>

      <!-- Quick Summary Footer of Current Filter (Tombol Lihat Lebih Lengkap di Kanan Bawah Sejajar Periode Aktif) -->
      <div class="gsap-hero-footer pt-3.5 border-t border-neutral-100 dark:border-neutral-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs font-sans text-neutral-500 dark:text-neutral-400">
        <!-- Left: Guide text -->
        <div class="flex items-center gap-1.5">
          <span class="w-1.5 h-1.5 rounded-full bg-[#2091AA] animate-pulse shrink-0" />
          <span>Arahkan kursor pada kurva garis untuk melihat rincian saldo kas toko tiap bulan.</span>
        </div>

        <!-- Right: Periode Aktif & Tombol Lihat Lebih Lengkap (Sejajar di Kanan Bawah) -->
        <div class="flex items-center gap-4 shrink-0 flex-wrap sm:flex-nowrap">
          <span class="tabular-nums">Periode Aktif: <strong class="text-neutral-900 dark:text-white font-semibold">{{ heroFilteredRecords[0]?.month }} - {{ heroFilteredRecords[heroFilteredRecords.length - 1]?.month }} {{ heroFilteredRecords[heroFilteredRecords.length - 1]?.year }}</strong></span>

          <NuxtLink
            to="/dashboard/progres"
            class="btn-pill-action group shrink-0"
            title="Lihat Lebih Lengkap"
          >
            <span>Lihat Lebih Lengkap</span>
            <svg class="w-4 h-4 shrink-0 transition-transform duration-200 group-hover:translate-x-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </NuxtLink>
        </div>
      </div>
    </div>

    <!-- 3. Telemetry Bento Row: Lihat Aliran Kas & Tugas Hari Ini (Berdampingan) -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-5 items-stretch">
      <!-- Left: Container Kemana saja uang kamu? (Hanya berisi Rasio Aliran) -->
      <div id="cash-flow-breakdown" class="card-tactile-gopay rounded-2xl p-5 sm:p-6 flex flex-col justify-between space-y-4">
        <!-- Header: Title & Action (Jarak deskripsi diperlebar agar tidak terlalu dekat dengan tombol) -->
        <div class="flex items-center justify-between pb-3 border-b border-neutral-100 dark:border-neutral-800/80 gap-5 sm:gap-6">
          <div class="min-w-0 pr-2 sm:pr-4">
            <h2 class="text-xl sm:text-2xl font-poppins font-bold text-neutral-900 dark:text-white tracking-tight">
              Kemana saja uang kamu?
            </h2>
            <p class="text-xs sm:text-[13px] font-poppins text-neutral-500 dark:text-neutral-400 mt-1 leading-normal max-w-sm sm:max-w-md">
              Melihat rasio pembagian modal jualan, biaya operasional, serta untung bersih tokomu.
            </p>
          </div>

          <NuxtLink
            to="/dashboard/progres"
            class="btn-pill-action group shrink-0"
          >
            <span>Lihat Detail</span>
            <svg class="w-4 h-4 shrink-0 transition-transform duration-200 group-hover:translate-x-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </NuxtLink>
        </div>

        <!-- Body: 2-Column Layout (Chart on Left, Vertical Breakdown on Right with Colored Tactile Containers) -->
        <div class="flex-1 flex flex-col md:flex-row items-center justify-between gap-6 py-2">
          <!-- Left Column: Full Donut Chart with Centered Total (Diperbesar & Bersih) -->
          <div class="relative w-full md:w-[46%] lg:w-[45%] flex items-center justify-center h-[270px] sm:h-[300px] max-w-[300px] sm:max-w-[325px] mx-auto md:mx-0 shrink-0">
            <canvas ref="donutCanvas" class="w-full h-full"></canvas>

            <!-- Center Overlay: Total Pendapatan (Diperbesar) -->
            <div class="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none w-full px-2 z-10">
              <span class="font-poppins font-bold text-neutral-900 dark:text-white tabular-nums tracking-tight text-xl sm:text-2xl lg:text-[26px] whitespace-nowrap leading-tight">
                {{ formatDisplayedAmount(totalCalculatedOmzet) }}
              </span>
              <span class="text-xs sm:text-sm font-poppins font-medium text-neutral-500 dark:text-neutral-400 mt-1 sm:mt-1.5">
                Total Pendapatan
              </span>
            </div>
          </div>

          <!-- Right Column: Vertical Breakdown List (Disamakan ukurannya dengan kartu tugas di sebelah kanan) -->
          <div class="w-full md:w-[54%] lg:w-[55%] space-y-2.5 flex-1 flex flex-col justify-start py-0.5 pl-0 md:pl-2">
            <!-- 1. Modal Jualan (Mirip Persis dengan Design Task: card-tactile-gopay) -->
            <div
              class="p-3.5 sm:p-4 rounded-xl card-tactile-gopay hover:border-neutral-400 dark:hover:border-neutral-600 transition-colors flex items-center justify-between gap-4 group cursor-pointer"
              @mouseenter="highlightSlice(0)"
              @mouseleave="resetHighlight"
            >
              <div class="min-w-0 flex-1 flex flex-col items-start gap-1 sm:gap-1.5">
                <!-- Jenis / Kategori di Atas Judul -->
                <span class="px-2 py-0.5 rounded-md text-[10px] sm:text-[11px] font-poppins font-semibold border shrink-0 inline-flex items-center bg-blue-100/90 text-[#0066D6] border-blue-300 dark:bg-blue-950/70 dark:text-blue-300 dark:border-blue-800">
                  Modal Jualan
                </span>

                <!-- Nominal Rupiah (Fokus Utama) -->
                <h3 class="font-poppins font-bold text-sm sm:text-[15px] text-neutral-900 dark:text-white tabular-nums tracking-tight leading-snug line-clamp-1">
                  Rp {{ calculatedHppAmount.toLocaleString('id-ID') }}
                </h3>

                <!-- Rincian Porsi di Bagian Bawah -->
                <div class="flex items-center gap-1.5 text-[11px] sm:text-xs font-poppins text-neutral-500 dark:text-neutral-400 mt-0.5">
                  <span class="w-1.5 h-1.5 rounded-full bg-[#0066D6] shrink-0" />
                  <span>Porsi kas: <span class="font-medium text-neutral-700 dark:text-neutral-300 tabular-nums">{{ calculatedHppPercent }}% dari total</span></span>
                </div>
              </div>

              <!-- Pill Persentase di Sisi Kanan -->
              <span class="px-2.5 py-1 rounded-full bg-blue-50 text-[#0066D6] border border-blue-200 dark:bg-blue-950/60 dark:text-blue-300 dark:border-blue-800 text-xs sm:text-[13px] font-poppins font-bold tabular-nums shrink-0 shadow-xs">
                {{ calculatedHppPercent }}%
              </span>
            </div>

            <!-- 2. Biaya Operasional (Mirip Persis dengan Design Task: card-tactile-gopay) -->
            <div
              class="p-3.5 sm:p-4 rounded-xl card-tactile-gopay hover:border-neutral-400 dark:hover:border-neutral-600 transition-colors flex items-center justify-between gap-4 group cursor-pointer"
              @mouseenter="highlightSlice(1)"
              @mouseleave="resetHighlight"
            >
              <div class="min-w-0 flex-1 flex flex-col items-start gap-1 sm:gap-1.5">
                <!-- Jenis / Kategori di Atas Judul -->
                <span class="px-2 py-0.5 rounded-md text-[10px] sm:text-[11px] font-poppins font-semibold border shrink-0 inline-flex items-center bg-cyan-100/90 text-[#2091AA] border-cyan-300 dark:bg-cyan-950/70 dark:text-cyan-300 dark:border-cyan-800">
                  Biaya Operasional
                </span>

                <!-- Nominal Rupiah (Fokus Utama) -->
                <h3 class="font-poppins font-bold text-sm sm:text-[15px] text-neutral-900 dark:text-white tabular-nums tracking-tight leading-snug line-clamp-1">
                  Rp {{ calculatedOpexAmount.toLocaleString('id-ID') }}
                </h3>

                <!-- Rincian Porsi di Bagian Bawah -->
                <div class="flex items-center gap-1.5 text-[11px] sm:text-xs font-poppins text-neutral-500 dark:text-neutral-400 mt-0.5">
                  <span class="w-1.5 h-1.5 rounded-full bg-[#2091AA] shrink-0" />
                  <span>Porsi kas: <span class="font-medium text-neutral-700 dark:text-neutral-300 tabular-nums">{{ calculatedOpexPercent }}% dari total</span></span>
                </div>
              </div>

              <!-- Pill Persentase di Sisi Kanan -->
              <span class="px-2.5 py-1 rounded-full bg-cyan-50 text-[#2091AA] border border-cyan-200 dark:bg-cyan-950/60 dark:text-cyan-300 dark:border-cyan-800 text-xs sm:text-[13px] font-poppins font-bold tabular-nums shrink-0 shadow-xs">
                {{ calculatedOpexPercent }}%
              </span>
            </div>

            <!-- 3. Untung Bersih (Mirip Persis dengan Design Task: card-tactile-gopay) -->
            <div
              class="p-3.5 sm:p-4 rounded-xl card-tactile-gopay hover:border-neutral-400 dark:hover:border-neutral-600 transition-colors flex items-center justify-between gap-4 group cursor-pointer"
              @mouseenter="highlightSlice(2)"
              @mouseleave="resetHighlight"
            >
              <div class="min-w-0 flex-1 flex flex-col items-start gap-1 sm:gap-1.5">
                <!-- Jenis / Kategori di Atas Judul -->
                <span class="px-2 py-0.5 rounded-md text-[10px] sm:text-[11px] font-poppins font-semibold border shrink-0 inline-flex items-center bg-emerald-100/90 text-[#00880C] border-emerald-300 dark:bg-emerald-950/70 dark:text-emerald-300 dark:border-emerald-800">
                  Untung Bersih
                </span>

                <!-- Nominal Rupiah (Fokus Utama) -->
                <h3 class="font-poppins font-bold text-sm sm:text-[15px] text-[#00AA13] dark:text-emerald-400 tabular-nums tracking-tight leading-snug line-clamp-1">
                  Rp {{ calculatedProfitAmount.toLocaleString('id-ID') }}
                </h3>

                <!-- Rincian Porsi di Bagian Bawah -->
                <div class="flex items-center gap-1.5 text-[11px] sm:text-xs font-poppins text-neutral-500 dark:text-neutral-400 mt-0.5">
                  <span class="w-1.5 h-1.5 rounded-full bg-[#00AA13] shrink-0" />
                  <span>Margin untung: <span class="font-medium text-emerald-700 dark:text-emerald-300 tabular-nums">{{ calculatedProfitPercent }}% dari total</span></span>
                </div>
              </div>

              <!-- Pill Persentase di Sisi Kanan -->
              <span class="px-2.5 py-1 rounded-full bg-emerald-50 text-[#00880C] border border-emerald-200 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800 text-xs sm:text-[13px] font-poppins font-bold tabular-nums shrink-0 shadow-xs">
                {{ calculatedProfitPercent }}%
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- Right: Container Tugas Hari Ini -->
      <div id="daily-tasks-container" class="card-tactile-gopay rounded-2xl p-5 sm:p-6 flex flex-col justify-between space-y-4">
        <!-- Header: Title & Action (Jarak deskripsi diperlebar agar tidak terlalu dekat dengan tombol) -->
        <div class="flex items-center justify-between pb-3 border-b border-neutral-100 dark:border-neutral-800/80 gap-5 sm:gap-6">
          <div class="min-w-0 pr-2 sm:pr-4">
            <h2 class="text-xl sm:text-2xl font-poppins font-bold text-neutral-900 dark:text-white tracking-tight">
              Tugas Hari Ini
            </h2>
            <p class="text-xs sm:text-[13px] font-poppins text-neutral-500 dark:text-neutral-400 mt-1 leading-normal max-w-sm sm:max-w-md">
              Selesaikan tugas operasional harian tokomu agar pembukuan rapi dan siap validasi.
            </p>
          </div>

          <!-- Button Lihat Semua Tugas (Gaya Standar 4 Card: btn-pill-action) -->
          <NuxtLink
            to="/dashboard/rencana-aksi"
            class="btn-pill-action group shrink-0"
          >
            <span>Lihat Semua Tugas</span>
            <svg class="w-4 h-4 shrink-0 transition-transform duration-200 group-hover:translate-x-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </NuxtLink>
        </div>

        <!-- 3 Tasks Cards (Icon kiri dihapus, jenis task di atas judul, tanpa deskripsi, deadline di bawah, arrow hover sedikit maju) -->
        <div class="space-y-2.5 flex-1 flex flex-col justify-start py-0.5">
          <NuxtLink
            v-for="(task, idx) in displayedDailyTasks"
            :key="task.id"
            :to="task.link || '/dashboard/rencana-aksi'"
            class="p-3.5 sm:p-4 rounded-xl card-tactile-gopay hover:border-neutral-400 dark:hover:border-neutral-600 transition-colors flex items-center justify-between gap-4 group cursor-pointer"
          >
            <div class="min-w-0 flex-1 flex flex-col items-start gap-1 sm:gap-1.5">
              <!-- Jenis Task di Atas Judul -->
              <span
                class="px-2 py-0.5 rounded-md text-[10px] sm:text-[11px] font-poppins font-semibold border shrink-0 inline-flex items-center"
                :class="getTaskCategoryBadgeClass(task.category)"
              >
                {{ task.category }}
              </span>

              <!-- Judul Task (Fokus Utama) -->
              <h3 class="font-poppins font-bold text-sm sm:text-[15px] text-neutral-900 dark:text-white leading-snug line-clamp-1">
                {{ task.title }}
              </h3>

              <!-- Deadline / Tenggat Waktu di Bagian Bawah -->
              <div class="flex items-center gap-1.5 text-[11px] sm:text-xs font-poppins text-neutral-500 dark:text-neutral-400 mt-0.5">
                <svg class="w-3.5 h-3.5 text-neutral-400 dark:text-neutral-500 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
                <span>Tenggat: <span :class="idx === 0 ? 'font-semibold text-amber-600 dark:text-amber-400' : 'font-medium text-neutral-700 dark:text-neutral-300'">{{ task.deadline }}</span></span>
              </div>
            </div>

            <!-- Uncontained Green Arrow (Nudge halus saat hover) -->
            <svg
              class="w-5 h-5 text-[#00AA13] dark:text-emerald-400 shrink-0 transition-transform duration-200 ease-out group-hover:translate-x-0.5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2.4"
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

    <!-- 4. Rapor Keuangan Bulanan (Hanya 5 Baris, Font Poppins) -->
    <div id="verified-cashbook-table" class="card-tactile-gopay rounded-2xl p-5 sm:p-7 space-y-5">
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-neutral-100 dark:border-neutral-800/80">
        <div>
          <h2 class="text-xl sm:text-2xl font-poppins font-bold text-neutral-900 dark:text-white tracking-tight">
            Rapor Keuangan Bulanan
          </h2>
          <p class="text-xs sm:text-[13px] font-poppins text-neutral-500 dark:text-neutral-400 mt-1 leading-normal">
            Arus kas 5 bulan terakhir yang sudah dicek langsung oleh konsultan pendamping tokomu.
          </p>
        </div>

        <!-- Button Lihat Semua Laporan (Konsisten dengan button 4 card: btn-pill-action) -->
        <NuxtLink
          to="/dashboard/progres"
          class="btn-pill-action group shrink-0"
        >
          <span>Lihat Semua Laporan</span>
          <svg class="w-4 h-4 shrink-0 transition-transform duration-200 group-hover:translate-x-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
          </svg>
        </NuxtLink>
      </div>

      <div class="overflow-x-auto rounded-xl border border-neutral-200/80 dark:border-neutral-800 bg-white dark:bg-[#13161F] shadow-sm">
        <table class="w-full text-left text-sm font-poppins">
          <thead>
            <tr class="bg-neutral-50/90 dark:bg-neutral-900/80 border-b border-neutral-200 dark:border-neutral-800 text-neutral-700 dark:text-neutral-300 font-poppins text-xs font-semibold uppercase tracking-wider">
              <th class="py-3.5 px-4 text-left">Bulan</th>
              <th class="py-3.5 px-4 text-left">Total Pendapatan</th>
              <th class="py-3.5 px-4 text-left">Modal Jualan</th>
              <th class="py-3.5 px-4 text-left">Biaya Operasional</th>
              <th class="py-3.5 px-4 text-left font-bold text-neutral-900 dark:text-white">Untung Bersih</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-neutral-100 dark:divide-neutral-800/80 text-neutral-800 dark:text-neutral-200">
            <tr
              v-for="(rec, idx) in latestMonthlyRecords"
              :key="`${rec.month}-${rec.year}`"
              :class="[
                idx % 2 === 0
                  ? 'bg-white dark:bg-[#13161F]'
                  : 'bg-neutral-50/60 dark:bg-neutral-800/30',
                'hover:bg-blue-50/60 dark:hover:bg-neutral-800/80 transition-colors'
              ]"
            >
              <td class="py-4 px-4 text-left font-poppins font-semibold text-neutral-900 dark:text-white text-sm sm:text-base">
                {{ rec.month }} {{ rec.year }}
              </td>
              <td class="py-4 px-4 text-left font-poppins tabular-nums font-semibold text-neutral-900 dark:text-white">
                Rp {{ rec.omzet.toLocaleString('id-ID') }}
              </td>
              <td class="py-4 px-4 text-left font-poppins tabular-nums text-neutral-600 dark:text-neutral-300">
                Rp {{ rec.hpp.toLocaleString('id-ID') }}
              </td>
              <td class="py-4 px-4 text-left font-poppins tabular-nums text-neutral-600 dark:text-neutral-300">
                Rp {{ rec.opex.toLocaleString('id-ID') }}
              </td>
              <td class="py-4 px-4 text-left font-poppins tabular-nums font-bold text-[#00AA13] dark:text-emerald-400 text-sm sm:text-base">
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
  MoneyBag01Icon
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

// Status Verifikasi UMKM (OSS RBA terbit / bersertifikat)
const isVerified = computed(() => {
  return !!(umkmStore.profile?.certifiedAt || umkmStore.profile?.nib || umkmStore.profile?.fundingStatus === 'READY_FOR_FUNDING')
})

// 3 Task Harian untuk Container Tugas Hari Ini (dengan Deadline Tenggat Waktu)
const displayedDailyTasks = computed(() => {
  const deadlines = ['Hari ini, 17:00 WIB', 'Besok, 23:59 WIB', '18 Okt 2026, 18:00 WIB']
  return (umkmStore.tasks || []).slice(0, 3).map((t, idx) => ({
    ...t,
    deadline: deadlines[idx] || t.dueDate || 'Hari ini, 17:00 WIB',
    link: idx === 0 ? '/dashboard/progres' : idx === 1 ? '/dashboard/rencana-aksi' : '/dashboard/penilaian'
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

// Donut Chart State & Controls
const donutCanvas = ref<HTMLCanvasElement | null>(null)
const activeHoveredSlice = ref<number | null>(null)
let donutChartInstance: any = null

const donutCenterAmountClass = computed(() => {
  const len = formatDisplayedAmount(totalCalculatedOmzet.value).length
  // Jika nominal sangat panjang (>= 18 karakter, misal Rp 10.000.000.000)
  if (len >= 18) return 'text-sm sm:text-base lg:text-lg'
  // Jika nominal panjang (>= 15 karakter, misal Rp 100.000.000)
  if (len >= 15) return 'text-base sm:text-lg lg:text-xl'
  // Nominal ringkas (< 15 karakter, misal Rp 45.000.000)
  return 'text-lg sm:text-xl lg:text-[22px]'
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
          backgroundColor: ['#0066D6', '#2091AA', '#00AA13'],
          hoverBackgroundColor: ['#0052B3', '#1A7A8F', '#008F10'],
          borderWidth: 0,
          hoverOffset: 0,
          borderRadius: 6,
          spacing: 4
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      layout: {
        padding: {
          bottom: 6,
          top: 6,
          left: 6,
          right: 6
        }
      },
      rotation: -90,
      circumference: 360,
      cutout: '76%',
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
  donutChartInstance.data.datasets[0].backgroundColor = ['#0066D6', '#2091AA', '#00AA13']
  donutChartInstance.data.datasets[0].hoverBackgroundColor = ['#0052B3', '#1A7A8F', '#008F10']
  donutChartInstance.data.datasets[0].borderWidth = 0
  donutChartInstance.data.datasets[0].hoverOffset = 0
  donutChartInstance.data.datasets[0].borderRadius = 6
  donutChartInstance.data.datasets[0].spacing = 4
  donutChartInstance.options.circumference = 360
  donutChartInstance.options.cutout = '76%'
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
  activeHoveredSlice.value = null
  if (!donutChartInstance) return
  donutChartInstance.setActiveElements([])
  donutChartInstance.tooltip?.setActiveElements([], { x: 0, y: 0 })
  donutChartInstance.update()
}

// Hero Shadcn UI Chart Config & Period Logic
const heroPeriodFilter = ref<'3m' | '6m' | '1y'>('6m')

const heroChartConfig = {
  cashBalance: {
    label: 'Saldo Kas',
    color: '#2091AA'
  }
}

const heroFilterOptions: { id: '3m' | '6m' | '1y'; label: string }[] = [
  { id: '3m', label: '3 Bulan' },
  { id: '6m', label: '6 Bulan' },
  { id: '1y', label: '1 Tahun' }
]

// GSAP Sliding Pill Indicator Refs & State
const tabIndicatorRef = ref<HTMLElement | null>(null)
const tabButtonsRef = ref<Record<string, HTMLElement | null>>({})
let handleResizeTabs: (() => void) | null = null

function setTabButtonRef(id: string, el: any) {
  if (el) {
    tabButtonsRef.value[id] = el
  }
}

function updateTabIndicatorPosition(immediate = false) {
  const currentTab = heroPeriodFilter.value
  const indicatorEl = tabIndicatorRef.value
  if (!indicatorEl) return

  let targetEl = tabButtonsRef.value[currentTab]
  if (!targetEl && indicatorEl.parentElement) {
    targetEl = (indicatorEl.parentElement.querySelector('.segmented-pill-btn.is-active') ||
      indicatorEl.parentElement.querySelector('.segmented-pill-btn')) as HTMLElement
  }
  if (!targetEl) return

  const targetLeft = targetEl.offsetLeft
  const targetWidth = targetEl.offsetWidth

  if (immediate) {
    gsap.set(indicatorEl, {
      x: targetLeft,
      width: targetWidth,
      opacity: 1
    })
  } else {
    // Animasi geser dengan efek bounce ringan (back.out(1.5))
    gsap.to(indicatorEl, {
      x: targetLeft,
      width: targetWidth,
      opacity: 1,
      duration: 0.45,
      ease: 'back.out(1.5)',
      overwrite: 'auto'
    })
  }
}

watch(heroPeriodFilter, () => {
  nextTick(() => {
    updateTabIndicatorPosition(false)
  })
})

const heroFilteredRecords = computed(() => {
  const records = umkmStore.monthlyRecords || []
  if (heroPeriodFilter.value === '3m') {
    return records.slice(-3)
  } else if (heroPeriodFilter.value === '6m') {
    return records.slice(-6)
  }
  return records
})

function setHeroPeriodFilter(filter: '3m' | '6m' | '1y') {
  if (heroPeriodFilter.value === filter) {
    const indicatorEl = tabIndicatorRef.value
    if (indicatorEl) {
      gsap.fromTo(
        indicatorEl,
        { scale: 0.96 },
        { scale: 1, duration: 0.25, ease: 'back.out(2)', overwrite: 'auto' }
      )
    }
    return
  }
  heroPeriodFilter.value = filter
  updateTabIndicatorPosition(false)

  // GSAP micro-animation feedback on filter switch
  nextTick(() => {
    gsap.fromTo(
      '.gsap-hero-footer',
      { opacity: 0.7, y: 3 },
      { opacity: 1, y: 0, duration: 0.35, ease: 'power2.out', overwrite: 'auto' }
    )
  })
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
    .from(
      '.gsap-hero-footer',
      {
        opacity: 0,
        y: 6,
        duration: 0.35,
        ease: 'power2.out'
      },
      '-=0.2'
    )

  // Trigger HPP Progress bar ease-out animation
  setTimeout(() => {
    hppBarWidth.value = 45.1
  }, 200)

  // Initialize Charts
  initDonutChart()

  // Setup initial active tab indicator & responsive resize listener
  nextTick(() => {
    updateTabIndicatorPosition(true)
  })
  setTimeout(() => {
    updateTabIndicatorPosition(true)
  }, 60)
  setTimeout(() => {
    updateTabIndicatorPosition(true)
  }, 200)
  setTimeout(() => {
    updateTabIndicatorPosition(true)
  }, 450)

  handleResizeTabs = () => {
    updateTabIndicatorPosition(true)
  }
  window.addEventListener('resize', handleResizeTabs)
})

onBeforeUnmount(() => {
  if (handleResizeTabs) {
    window.removeEventListener('resize', handleResizeTabs)
    handleResizeTabs = null
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
  updateTabIndicatorPosition(false)
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
