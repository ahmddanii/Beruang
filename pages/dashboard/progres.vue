<template>
  <div class="space-y-6 pb-20 font-sans text-neutral-900 dark:text-neutral-100 select-none">
    <!-- 1. Top Page Actions -->
    <div class="flex items-center justify-end gap-2.5 pb-2 shrink-0 flex-wrap">
      <!-- Unduh Buku Kas Button (Sesuai Desain Button Kembali di Halaman Profil Usaha) -->
      <button
        type="button"
        class="inline-flex items-center gap-2 px-4 py-2 sm:py-2.5 rounded-xl bg-white hover:bg-neutral-100/80 dark:bg-[#18191E] dark:hover:bg-neutral-800/80 border border-neutral-200/90 hover:border-neutral-400 dark:border-neutral-800 dark:hover:border-neutral-600 text-xs sm:text-sm font-poppins font-semibold text-neutral-700 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white transition-all shadow-2xs active:scale-95 cursor-pointer"
        title="Unduh Rekapitulasi Kas"
        @click="handleExportPdf"
      >
        <HugeiconsIcon :icon="Download01Icon" :size="16" :stroke-width="2" />
        <span>Unduh Buku Kas</span>
      </button>

      <!-- Primary 3D Action: Catat Kas Hari Ini -->
      <button
        type="button"
        class="btn-3d-blue px-4 sm:px-5 py-2 sm:py-2.5 text-xs sm:text-sm font-poppins font-semibold shadow-xs active:scale-95 cursor-pointer hover:translate-y-0"
        @click="isCashDrawerOpen = true"
      >
        <HugeiconsIcon :icon="Coins01Icon" :size="17" :stroke-width="2.2" />
        <span>+ Catat Kas Hari Ini</span>
      </button>
    </div>

    <!-- 2. Metric Grid: 4 Horizontal Financial Cards (Sesuai Referensi Beranda: Saldo, Uang Masuk, Modal Jualan, Biaya Operasional) -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-stretch">
      <!-- Card 1: Saldo Kas Toko -->
      <div class="gsap-stat-card flex-1">
        <div class="group relative rounded-2xl card-tactile-gopay has-blue-banner hover:border-neutral-400 dark:hover:border-neutral-600 overflow-hidden flex flex-col justify-between select-none h-full transition-all duration-200">
          <!-- 1. Top: Container Biru untuk Title -->
          <div class="w-full px-5 sm:px-6 py-3 sm:py-3.5 card-header-blue-banner flex items-center gap-2.5 sm:gap-3">
            <HugeiconsIcon
              :icon="Coins01Icon"
              :size="20"
              :stroke-width="2.2"
              class="text-white shrink-0"
            />
            <span class="text-xs sm:text-sm font-poppins font-semibold uppercase tracking-wider text-white truncate">
              SALDO KAS TOKO
            </span>
          </div>

          <!-- 2. Bottom: Container Informasi dengan Rounded Corner di Atas -->
          <div class="w-full rounded-t-2xl bg-[#F6F8FA] dark:bg-[#13161F] px-5 sm:px-6 pt-4.5 pb-5 sm:pt-5 sm:pb-5.5 flex flex-col gap-3.5 sm:gap-4 flex-1">
            <!-- Middle Value Row -->
            <div>
              <span class="text-2xl sm:text-[28px] lg:text-3xl font-poppins font-bold text-neutral-900 dark:text-white tabular-nums tracking-tight block leading-tight">
                Rp {{ (latestMonthRecord.cashBalance || 75500000).toLocaleString('id-ID') }}
              </span>
              <!-- Subtext Row -->
              <div class="mt-2 text-xs sm:text-[13px] font-poppins text-neutral-500 dark:text-neutral-400 flex items-center gap-1.5 leading-normal">
                <span>Kas Aktif</span>
                <span class="text-emerald-600 dark:text-emerald-400 font-semibold tabular-nums">Margin Sehat 32.6%</span>
              </div>
            </div>

            <!-- Bottom Action Button Row -->
            <div class="pt-0.5">
              <button
                type="button"
                class="btn-pill-action group cursor-pointer"
                @click="isCashDrawerOpen = true"
              >
                <span>+ Catat Kas</span>
                <svg class="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Card 2: Uang Masuk -->
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

          <!-- 2. Bottom: Container Informasi dengan Rounded Corner di Atas -->
          <div class="w-full rounded-t-2xl bg-[#F6F8FA] dark:bg-[#13161F] px-5 sm:px-6 pt-4.5 pb-5 sm:pt-5 sm:pb-5.5 flex flex-col gap-3.5 sm:gap-4 flex-1">
            <!-- Middle Value Row -->
            <div>
              <span class="text-2xl sm:text-[28px] lg:text-3xl font-poppins font-bold text-emerald-600 dark:text-emerald-400 tabular-nums tracking-tight block leading-tight">
                + Rp {{ totalIncome.toLocaleString('id-ID') }}
              </span>
              <!-- Subtext Row -->
              <div class="mt-2 text-xs sm:text-[13px] font-poppins text-neutral-500 dark:text-neutral-400 flex items-center gap-1.5 leading-normal">
                <span>Penjualan Harian</span>
                <span class="text-emerald-600 dark:text-emerald-400 font-semibold tabular-nums">+9.8% (MoM)</span>
              </div>
            </div>

            <!-- Bottom Action Button Row -->
            <div class="pt-0.5">
              <button
                type="button"
                class="btn-pill-action group cursor-pointer"
                @click="setActiveTab('mutasi'); activeCategoryFilter = 'PEMASUKAN'"
              >
                <span>Filter Masuk</span>
                <svg class="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Card 3: Modal Jualan -->
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

          <!-- 2. Bottom: Container Informasi dengan Rounded Corner di Atas -->
          <div class="w-full rounded-t-2xl bg-[#F6F8FA] dark:bg-[#13161F] px-5 sm:px-6 pt-4.5 pb-5 sm:pt-5 sm:pb-5.5 flex flex-col gap-3.5 sm:gap-4 flex-1">
            <!-- Middle Value Row -->
            <div>
              <span class="text-2xl sm:text-[28px] lg:text-3xl font-poppins font-bold text-[#0066D6] dark:text-blue-400 tabular-nums tracking-tight block leading-tight">
                - Rp {{ totalHppExpense.toLocaleString('id-ID') }}
              </span>
              <!-- Subtext Row -->
              <div class="mt-2 text-xs sm:text-[13px] font-poppins text-neutral-500 dark:text-neutral-400 flex items-center gap-1.5 leading-normal">
                <span>Bahan Baku Toko</span>
                <span class="text-emerald-600 dark:text-emerald-400 font-semibold">(Hemat)</span>
              </div>
            </div>

            <!-- Bottom Action Button Row -->
            <div class="pt-0.5">
              <button
                type="button"
                class="btn-pill-action group cursor-pointer"
                @click="setActiveTab('mutasi'); activeCategoryFilter = 'MODAL_JUALAN'"
              >
                <span>Kelola Modal</span>
                <svg class="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Card 4: Biaya Operasional -->
      <div class="gsap-stat-card flex-1">
        <div class="group relative rounded-2xl card-tactile-gopay has-blue-banner hover:border-neutral-400 dark:hover:border-neutral-600 overflow-hidden flex flex-col justify-between select-none h-full transition-all duration-200">
          <!-- 1. Top: Container Biru untuk Title -->
          <div class="w-full px-5 sm:px-6 py-3 sm:py-3.5 card-header-blue-banner flex items-center gap-2.5 sm:gap-3">
            <svg class="w-5 h-5 text-white shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">
              <path d="M7 17 17 7" />
              <path d="M7 7h10v10" />
            </svg>
            <span class="text-xs sm:text-sm font-poppins font-semibold uppercase tracking-wider text-white truncate">
              BIAYA OPERASIONAL
            </span>
          </div>

          <!-- 2. Bottom: Container Informasi dengan Rounded Corner di Atas -->
          <div class="w-full rounded-t-2xl bg-[#F6F8FA] dark:bg-[#13161F] px-5 sm:px-6 pt-4.5 pb-5 sm:pt-5 sm:pb-5.5 flex flex-col gap-3.5 sm:gap-4 flex-1">
            <!-- Middle Value Row -->
            <div>
              <span class="text-2xl sm:text-[28px] lg:text-3xl font-poppins font-bold text-neutral-900 dark:text-white tabular-nums tracking-tight block leading-tight">
                - Rp {{ totalOpexExpense.toLocaleString('id-ID') }}
              </span>
              <!-- Subtext Row -->
              <div class="mt-2 text-xs sm:text-[13px] font-poppins text-neutral-500 dark:text-neutral-400 flex items-center gap-1.5 leading-normal">
                <span>Sewa, Listrik, Wi-Fi</span>
                <span class="text-[#2091AA] dark:text-[#50AABF] font-semibold">(Terkontrol)</span>
              </div>
            </div>

            <!-- Bottom Action Button Row -->
            <div class="pt-0.5">
              <button
                type="button"
                class="btn-pill-action group cursor-pointer"
                @click="setActiveTab('mutasi'); activeCategoryFilter = 'OPERASIONAL'"
              >
                <span>Rincian Beban</span>
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

    <!-- 3. Macro Segmented Pill Switcher (Tab Navigasi Makro Full Rata Kiri Kanan - GoPay Green Edition) -->
    <div class="segmented-pill-container is-gopay-green w-full relative">
      <!-- GSAP Animated Sliding Pill Indicator -->
      <div
        ref="tabIndicatorRef"
        class="segmented-pill-indicator"
        aria-hidden="true"
      />

      <button
        type="button"
        :ref="el => setTabRef('mutasi', el)"
        class="segmented-pill-btn group"
        :class="activeTab === 'mutasi' ? 'is-active' : 'is-inactive'"
        @click="setActiveTab('mutasi')"
      >
        <HugeiconsIcon :icon="Coins01Icon" :size="17" :stroke-width="activeTab === 'mutasi' ? 2.2 : 1.8" class="mr-2 shrink-0 transition-colors" />
        <span class="truncate">Buku Mutasi Kas Harian</span>
      </button>

      <button
        type="button"
        :ref="el => setTabRef('bulanan', el)"
        class="segmented-pill-btn group"
        :class="activeTab === 'bulanan' ? 'is-active' : 'is-inactive'"
        @click="setActiveTab('bulanan')"
      >
        <HugeiconsIcon :icon="CheckmarkCircle01Icon" :size="17" :stroke-width="activeTab === 'bulanan' ? 2.2 : 1.8" class="mr-2 shrink-0 transition-colors" />
        <span class="truncate">Rapor Bulanan & Rekonsiliasi</span>
      </button>

      <button
        type="button"
        :ref="el => setTabRef('tren', el)"
        class="segmented-pill-btn group"
        :class="activeTab === 'tren' ? 'is-active' : 'is-inactive'"
        @click="setActiveTab('tren')"
      >
        <HugeiconsIcon :icon="AnalyticsUpIcon" :size="17" :stroke-width="activeTab === 'tren' ? 2.2 : 1.8" class="mr-2 shrink-0 transition-colors" />
        <span class="truncate">Grafik Tren & Aliran Kas</span>
      </button>
    </div>

    <!-- 4. TAB 1: BUKU MUTASI KAS HARIAN -->
    <div v-if="activeTab === 'mutasi'" class="gsap-tab-content space-y-6">

      <!-- Interactive Daily Ledger Table Card -->
      <div class="card-tactile-gopay rounded-2xl p-5 sm:p-7 space-y-5 border font-poppins">
        <!-- Filter & Search Controls Bar -->
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-neutral-100 dark:border-neutral-800/80">
          <div>
            <h2 class="text-lg sm:text-xl font-poppins font-bold text-neutral-900 dark:text-white">
              Daftar Mutasi Transaksi Kas Harian
            </h2>
            <p class="text-xs text-neutral-500 font-poppins mt-0.5">
              Setiap catatan transaksi uang masuk dan keluar tersinkronisasi dengan bukti nota kasir.
            </p>
          </div>

          <!-- Category Filter Dropdown (Pill Gradient Style with Arrow Down) -->
          <div class="relative inline-block text-left shrink-0">
            <!-- Dropdown Trigger Button -->
            <button
              type="button"
              class="btn-pill-gradient group flex items-center gap-2 cursor-pointer transition-all duration-150 active:scale-95 select-none"
              :aria-expanded="isCategoryDropdownOpen"
              title="Filter Kategori Mutasi"
              @click="isCategoryDropdownOpen = !isCategoryDropdownOpen"
            >
              <!-- Category Indicator Dot -->
              <span
                :class="[
                  'w-2 h-2 rounded-full shrink-0',
                  activeCategoryFilter === 'PEMASUKAN' ? 'bg-[#00AA13]' :
                  activeCategoryFilter === 'MODAL_JUALAN' ? 'bg-[#0066D6]' :
                  activeCategoryFilter === 'OPERASIONAL' ? 'bg-[#2091AA]' : 'bg-neutral-400'
                ]"
              />

              <span class="font-poppins font-medium text-xs sm:text-sm text-neutral-900 dark:text-white">
                {{ activeCategoryLabel }}
              </span>

              <span class="text-[11px] font-semibold tabular-nums text-neutral-400 bg-neutral-100 dark:bg-neutral-800 px-1.5 py-0.5 rounded-full">
                {{ getCategoryCount(activeCategoryFilter) }}
              </span>

              <!-- Arrow Down Icon -->
              <svg
                class="w-4 h-4 text-neutral-500 dark:text-neutral-400 transition-transform duration-200 shrink-0 group-hover:text-neutral-800 dark:group-hover:text-white ml-0.5"
                :class="{ 'rotate-180': isCategoryDropdownOpen }"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2.2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="m6 9 6 6 6-6" />
              </svg>
            </button>

            <!-- Backdrop for Outside Click -->
            <div
              v-if="isCategoryDropdownOpen"
              class="fixed inset-0 z-40 bg-transparent"
              @click="isCategoryDropdownOpen = false"
            />

            <!-- Dropdown Menu Popover (GoPay Tactile Style) -->
            <div
              v-if="isCategoryDropdownOpen"
              class="absolute right-0 sm:right-0 mt-2 w-60 rounded-2xl bg-white dark:bg-[#18191E] border border-neutral-200/90 dark:border-neutral-800 shadow-2xl p-1.5 z-50 font-poppins animate-in fade-in zoom-in-95 duration-150 select-none"
            >
              <div class="px-3 py-2 border-b border-neutral-100 dark:border-neutral-800/80 mb-1 flex items-center justify-between text-[11px]">
                <span class="font-semibold text-neutral-400 dark:text-neutral-500 uppercase tracking-wider">
                  Kategori Kas
                </span>
                <span class="text-neutral-400 font-medium">
                  {{ umkmStore.dailyTransactions.length }} Total
                </span>
              </div>

              <div class="space-y-0.5">
                <button
                  v-for="opt in categoryFilterOptions"
                  :key="opt.id"
                  type="button"
                  :class="[
                    'w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs transition-all cursor-pointer',
                    activeCategoryFilter === opt.id
                      ? 'bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-white font-semibold shadow-2xs'
                      : 'text-neutral-600 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-800/60 hover:text-neutral-900 dark:hover:text-white font-medium'
                  ]"
                  @click="selectCategoryFilter(opt.id)"
                >
                  <div class="flex items-center gap-2.5">
                    <span
                      :class="[
                        'w-2 h-2 rounded-full shrink-0',
                        opt.id === 'PEMASUKAN' ? 'bg-[#00AA13]' :
                        opt.id === 'MODAL_JUALAN' ? 'bg-[#0066D6]' :
                        opt.id === 'OPERASIONAL' ? 'bg-[#2091AA]' : 'bg-neutral-400'
                      ]"
                    />
                    <span>{{ opt.label }}</span>
                  </div>

                  <div class="flex items-center gap-2">
                    <span class="text-[11px] font-semibold tabular-nums text-neutral-400">
                      {{ getCategoryCount(opt.id) }}
                    </span>
                    <svg
                      v-if="activeCategoryFilter === opt.id"
                      class="w-3.5 h-3.5 text-[#2091AA] dark:text-[#50AABF] shrink-0"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <path d="M20 6 9 17l-5-5" />
                    </svg>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Search Input -->
        <div class="relative">
          <HugeiconsIcon
            :icon="Search01Icon"
            :size="16"
            :stroke-width="1.8"
            class="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none"
          />
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Cari transaksi berdasarkan nama bahan, kasir, nota, atau keterangan..."
            class="w-full pl-9 pr-4 py-2.5 rounded-xl text-xs sm:text-sm bg-neutral-50 dark:bg-[#18191E] border border-neutral-200 dark:border-neutral-700/80 text-neutral-900 dark:text-white placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-[#2091AA]/30 transition-all font-poppins"
          />
        </div>

        <!-- Table -->
        <div class="overflow-x-auto rounded-xl border border-neutral-200/80 dark:border-neutral-800 bg-white dark:bg-[#13161F] shadow-2xs">
          <table class="w-full text-left text-sm font-poppins">
            <thead>
              <tr class="bg-neutral-50/90 dark:bg-neutral-900/80 border-b border-neutral-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-400 text-xs font-semibold uppercase tracking-wider font-poppins">
                <th class="py-3.5 px-4 text-left font-poppins w-28">Tanggal</th>
                <th class="py-3.5 px-4 text-left font-poppins w-40">Kategori</th>
                <th class="py-3.5 px-4 text-left font-poppins">Keterangan Transaksi</th>
                <th class="py-3.5 px-4 text-left font-bold font-poppins text-neutral-900 dark:text-white w-52">Nominal Kas</th>
                <th class="py-3.5 px-4 text-right font-poppins w-24">Tindakan</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-neutral-100 dark:divide-neutral-800/80 text-neutral-800 dark:text-neutral-200 font-poppins">
              <tr
                v-for="(tx, idx) in filteredDailyTransactions"
                :key="tx.id"
                :class="[
                  idx % 2 === 0 ? 'bg-white dark:bg-[#13161F]' : 'bg-neutral-50/60 dark:bg-neutral-800/30',
                  'hover:bg-blue-50/50 dark:hover:bg-neutral-800/70 transition-colors'
                ]"
              >
                <!-- 1. Tanggal (Ringkas '15 Okt') -->
                <td class="py-3.5 px-4 text-left font-poppins whitespace-nowrap">
                  <span class="text-xs sm:text-sm font-semibold font-poppins text-neutral-900 dark:text-white tabular-nums">
                    {{ formatShortDate(tx.date) }}
                  </span>
                </td>

                <!-- 2. Kategori (Badge Label Tunggal) -->
                <td class="py-3.5 px-4 text-left font-poppins whitespace-nowrap">
                  <span
                    :class="[
                      'inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-semibold border font-poppins',
                      tx.category === 'PEMASUKAN'
                        ? 'bg-emerald-50 text-[#00AA13] border-emerald-200 dark:bg-emerald-950/60 dark:text-emerald-400 dark:border-emerald-800'
                        : tx.category === 'MODAL_JUALAN'
                          ? 'bg-blue-50 text-[#0066D6] border-blue-200 dark:bg-blue-950/60 dark:text-blue-400 dark:border-blue-800'
                          : 'bg-cyan-50 text-[#2091AA] border-cyan-200 dark:bg-cyan-950/60 dark:text-cyan-400 dark:border-cyan-800'
                    ]"
                  >
                    {{ tx.category === 'PEMASUKAN' ? 'Uang Masuk' : tx.category === 'MODAL_JUALAN' ? 'Modal Jualan' : 'Biaya Operasional' }}
                  </span>
                </td>

                <!-- 3. Keterangan Transaksi (1 Baris Padat + No. Nota Muted di Bawahnya) -->
                <td class="py-3.5 px-4 text-left font-poppins min-w-[200px]">
                  <p class="text-xs sm:text-sm font-semibold font-poppins text-neutral-900 dark:text-white truncate max-w-sm" :title="tx.title">
                    {{ tx.title }}
                  </p>
                  <span class="text-[11px] font-mono text-neutral-400 dark:text-neutral-500 block truncate mt-0.5">
                    {{ tx.receiptNumber || 'NOTA/KASIR/AUTO' }}
                  </span>
                </td>

                <!-- 4. Nominal Kas & Metode Bayar Monokrom (Bebas Polusi Badge) -->
                <td class="py-3.5 px-4 text-left font-poppins whitespace-nowrap">
                  <div class="flex flex-col items-start">
                    <span
                      :class="[
                        'font-bold text-sm sm:text-base tabular-nums',
                        tx.category === 'PEMASUKAN'
                          ? 'text-[#00AA13] dark:text-emerald-400'
                          : 'text-neutral-900 dark:text-white'
                      ]"
                    >
                      {{ tx.category === 'PEMASUKAN' ? '+ ' : '- ' }}Rp {{ tx.amount.toLocaleString('id-ID') }}
                    </span>
                    <span class="text-[11px] font-medium text-neutral-400 dark:text-neutral-500 font-poppins flex items-center gap-1 mt-0.5">
                      <HugeiconsIcon :icon="CreditCardIcon" :size="12" class="opacity-60 shrink-0" />
                      <span>{{ tx.paymentMethod }}</span>
                    </span>
                  </div>
                </td>

                <!-- 5. Tindakan -->
                <td class="py-3.5 px-4 text-right font-poppins whitespace-nowrap">
                  <div class="flex items-center justify-end gap-1.5">
                    <button
                      type="button"
                      class="p-1.5 rounded-lg text-neutral-500 hover:text-[#2091AA] dark:hover:text-[#50AABF] hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors cursor-pointer"
                      title="Lihat Bukti Nota Transaksi"
                      @click="openReceiptModal(tx)"
                    >
                      <HugeiconsIcon :icon="ViewIcon" :size="16" />
                    </button>
                    <button
                      type="button"
                      class="p-1.5 rounded-lg text-neutral-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/40 transition-colors cursor-pointer"
                      title="Hapus Catatan Ini"
                      @click="handleDeleteTx(tx.id)"
                    >
                      <HugeiconsIcon :icon="Delete02Icon" :size="16" />
                    </button>
                  </div>
                </td>
              </tr>

              <!-- Empty State -->
              <tr v-if="filteredDailyTransactions.length === 0">
                <td colspan="5" class="py-12 text-center text-neutral-500 dark:text-neutral-400">
                  <HugeiconsIcon :icon="Coins01Icon" :size="32" class="mx-auto mb-2 text-neutral-300 dark:text-neutral-600" />
                  <p class="font-poppins font-medium text-sm">Tidak ada transaksi yang cocok dengan filter atau kata kunci.</p>
                  <button
                    type="button"
                    class="mt-2 text-xs font-semibold text-[#2091AA] dark:text-[#50AABF] hover:underline cursor-pointer"
                    @click="activeCategoryFilter = 'ALL'; searchQuery = ''"
                  >
                    Reset Filter & Pencarian
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- 5. TAB 2: RAPOR BULANAN & REKONSILIASI KAS -->
    <div v-else-if="activeTab === 'bulanan'" class="gsap-tab-content space-y-6">
      <div class="card-tactile-gopay rounded-2xl p-5 sm:p-7 space-y-5 border">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-neutral-100 dark:border-neutral-800/80">
          <div>
            <h2 class="text-xl sm:text-2xl font-poppins font-bold text-neutral-900 dark:text-white tracking-tight">
              Rapor Rekonsiliasi Kas Bulanan Lengkap
            </h2>
            <p class="text-xs sm:text-[13px] font-poppins text-neutral-500 dark:text-neutral-400 mt-1 leading-normal">
              Histori seluruh laporan keuangan toko dari Januari hingga Oktober 2026 yang telah dicek langsung oleh konsultan pendamping tokomu.
            </p>
          </div>

          <div class="flex items-center gap-2">
            <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-poppins font-bold bg-emerald-50 text-[#00AA13] dark:bg-emerald-950/60 dark:text-emerald-400 border border-emerald-200">
              <HugeiconsIcon :icon="CheckmarkCircle01Icon" :size="14" />
              <span>10 Bulan Terverifikasi Bersih</span>
            </span>
          </div>
        </div>

        <!-- Monthly Full Ledger Table -->
        <div class="overflow-x-auto rounded-xl border border-neutral-200/80 dark:border-neutral-800 bg-white dark:bg-[#13161F] shadow-2xs">
          <table class="w-full text-left text-sm font-poppins">
            <thead>
              <tr class="bg-neutral-50/90 dark:bg-neutral-900/80 border-b border-neutral-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-400 text-xs font-semibold uppercase tracking-wider">
                <th class="py-3.5 px-4 text-left">Periode Bulan</th>
                <th class="py-3.5 px-4 text-left">Total Pendapatan</th>
                <th class="py-3.5 px-4 text-left">Modal Jualan (HPP)</th>
                <th class="py-3.5 px-4 text-left">Biaya Operasional</th>
                <th class="py-3.5 px-4 text-left font-bold text-neutral-900 dark:text-white">Untung Bersih</th>
                <th class="py-3.5 px-4 text-left">Saldo Kas Akhir</th>
                <th class="py-3.5 px-4 text-center">Status Validasi</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-neutral-100 dark:divide-neutral-800/80 text-neutral-800 dark:text-neutral-200">
              <tr
                v-for="(rec, idx) in umkmStore.monthlyRecords"
                :key="`${rec.month}-${rec.year}`"
                :class="[
                  idx % 2 === 0 ? 'bg-white dark:bg-[#13161F]' : 'bg-neutral-50/60 dark:bg-neutral-800/30',
                  'hover:bg-blue-50/50 dark:hover:bg-neutral-800/70 transition-colors'
                ]"
              >
                <td class="py-3.5 px-4 text-left font-poppins font-semibold text-neutral-900 dark:text-white">
                  {{ rec.month }} {{ rec.year }}
                </td>
                <td class="py-3.5 px-4 text-left font-poppins tabular-nums font-semibold text-neutral-900 dark:text-white">
                  Rp {{ rec.omzet.toLocaleString('id-ID') }}
                </td>
                <td class="py-3.5 px-4 text-left font-poppins tabular-nums text-neutral-600 dark:text-neutral-300">
                  Rp {{ rec.hpp.toLocaleString('id-ID') }}
                </td>
                <td class="py-3.5 px-4 text-left font-poppins tabular-nums text-neutral-600 dark:text-neutral-300">
                  Rp {{ rec.opex.toLocaleString('id-ID') }}
                </td>
                <td class="py-3.5 px-4 text-left font-poppins tabular-nums font-bold text-[#00AA13] dark:text-emerald-400">
                  Rp {{ rec.netProfit.toLocaleString('id-ID') }}
                </td>
                <td class="py-3.5 px-4 text-left font-poppins tabular-nums font-semibold text-[#2091AA] dark:text-[#50AABF]">
                  Rp {{ rec.cashBalance.toLocaleString('id-ID') }}
                </td>
                <td class="py-3.5 px-4 text-center font-poppins">
                  <span class="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400 border border-emerald-200">
                    <HugeiconsIcon :icon="CheckmarkCircle01Icon" :size="13" />
                    <span>Terverifikasi</span>
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- 6. TAB 3: GRAFIK TREN & ALIRAN KAS -->
    <div v-else-if="activeTab === 'tren'" class="gsap-tab-content space-y-6">
      <!-- 1. Hero Line Chart: Tren Pergerakan & Aliran Kas (Sesuai Desain Halaman Beranda) -->
      <div class="card-tactile-gopay rounded-2xl p-5 sm:p-7 space-y-5 border font-poppins">
        <!-- Header: Title, Subtitle, and Right Macro Time Period Filters -->
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-5 pb-5 border-b border-neutral-100 dark:border-neutral-800/80">
          <div class="space-y-1.5 min-w-0 max-w-xl">
            <h2 class="text-xl sm:text-2xl font-poppins font-bold text-neutral-900 dark:text-white tracking-tight">
              Tren Pergerakan & Aliran Kas Toko
            </h2>
            <p class="text-xs sm:text-[13px] font-poppins text-neutral-500 dark:text-neutral-400 mt-1 leading-normal">
              Histori akumulasi pendapatan, modal belanja bahan baku, biaya operasional, dan saldo kas toko secara komprehensif.
            </p>
          </div>

          <!-- Macro Time Period Filters (3 Bulan, 6 Bulan, 1 Tahun) with GSAP Sliding Pill Indicator -->
          <div class="segmented-pill-container relative shrink-0">
            <div
              ref="periodIndicatorRef"
              class="segmented-pill-indicator"
              aria-hidden="true"
            />
            <button
              v-for="opt in timeFilterOptions"
              :key="opt.id"
              :ref="el => setPeriodButtonRef(opt.id, el)"
              type="button"
              class="segmented-pill-btn"
              :class="selectedPeriod === opt.id ? 'is-active' : 'is-inactive'"
              @click="setPeriodFilter(opt.id)"
            >
              <span>{{ opt.label }}</span>
            </button>
          </div>
        </div>

        <!-- Linear Trend Chart Body -->
        <div class="relative w-full h-72 sm:h-80 pt-1">
          <BShadcnLineChart
            :data="filteredMonthlyRecords"
            index="month"
            :categories="['omzet', 'cashBalance', 'netProfit', 'hpp']"
            :config="progresChartConfig"
            curve-type="linear"
          />
        </div>

        <!-- Quick Summary Footer of Current Filter -->
        <div class="pt-3.5 border-t border-neutral-100 dark:border-neutral-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs font-sans text-neutral-500 dark:text-neutral-400">
          <!-- Left: Guide text with pulse dot -->
          <div class="flex items-center gap-1.5">
            <span class="w-1.5 h-1.5 rounded-full bg-[#2091AA] animate-pulse shrink-0" />
            <span class="font-poppins">Arahkan kursor pada kurva garis untuk melihat rincian saldo kas & mutasi bulanan.</span>
          </div>

          <!-- Right: Legend Indicators & Periode Aktif -->
          <div class="flex items-center gap-4 flex-wrap sm:flex-nowrap">
            <div class="flex items-center gap-3 flex-wrap">
              <div class="flex items-center gap-1.5">
                <span class="w-2.5 h-2.5 rounded-full bg-[#0066D6] shrink-0" />
                <span class="text-[11px] font-poppins font-medium text-neutral-700 dark:text-neutral-300">Pendapatan</span>
              </div>
              <div class="flex items-center gap-1.5">
                <span class="w-2.5 h-2.5 rounded-full bg-[#2091AA] shrink-0" />
                <span class="text-[11px] font-poppins font-medium text-neutral-700 dark:text-neutral-300">Saldo Kas</span>
              </div>
              <div class="flex items-center gap-1.5">
                <span class="w-2.5 h-2.5 rounded-full bg-[#00AA13] shrink-0" />
                <span class="text-[11px] font-poppins font-medium text-neutral-700 dark:text-neutral-300">Untung Bersih</span>
              </div>
              <div class="flex items-center gap-1.5">
                <span class="w-2.5 h-2.5 rounded-full bg-[#F59E0B] shrink-0" />
                <span class="text-[11px] font-poppins font-medium text-neutral-700 dark:text-neutral-300">Modal Jualan</span>
              </div>
            </div>
            <span class="tabular-nums font-poppins shrink-0">
              Periode: <strong class="text-neutral-900 dark:text-white font-semibold">{{ currentActivePeriodLabel }}</strong>
            </span>
          </div>
        </div>
      </div>

      <!-- 2. Bento Row: Komposisi Aliran Kas (Sesuai Desain Halaman Beranda) -->
      <div class="card-tactile-gopay rounded-2xl p-5 sm:p-7 space-y-4 border font-poppins">
        <!-- Header -->
        <div class="flex items-center justify-between pb-3 border-b border-neutral-100 dark:border-neutral-800/80 gap-5">
          <div>
            <h2 class="text-xl sm:text-2xl font-poppins font-bold text-neutral-900 dark:text-white tracking-tight">
              Komposisi Aliran Kas Toko
            </h2>
            <p class="text-xs sm:text-[13px] font-poppins text-neutral-500 dark:text-neutral-400 mt-1 leading-normal">
              Rasio pembagian perputaran uang: modal belanja jualan, biaya operasional, dan sisa untung bersih tokomu.
            </p>
          </div>
        </div>

        <!-- Body: 2-Column Layout (Donut on Left, Vertical Breakdown on Right) -->
        <div class="flex flex-col md:flex-row items-center justify-between gap-6 py-2">
          <!-- Left Column: Donut Chart with Centered Total -->
          <div class="relative w-full md:w-[46%] lg:w-[45%] flex items-center justify-center h-[260px] sm:h-[280px] max-w-[280px] sm:max-w-[310px] mx-auto md:mx-0 shrink-0">
            <canvas ref="donutCanvas" class="w-full h-full"></canvas>

            <!-- Center Overlay: Total Pendapatan -->
            <div class="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none w-full px-2 z-10">
              <span class="font-poppins font-bold text-neutral-900 dark:text-white tabular-nums tracking-tight text-xl sm:text-2xl whitespace-nowrap leading-tight">
                Rp {{ calculatedPeriodOmzet.toLocaleString('id-ID') }}
              </span>
              <span class="text-xs sm:text-sm font-poppins font-medium text-neutral-500 dark:text-neutral-400 mt-1">
                Total Pendapatan ({{ selectedPeriodLabel }})
              </span>
            </div>
          </div>

          <!-- Right Column: Vertical Breakdown Cards -->
          <div class="w-full md:w-[54%] lg:w-[55%] space-y-2.5 flex-1 flex flex-col justify-start py-0.5">
            <!-- 1. Modal Jualan -->
            <div
              class="p-3.5 sm:p-4 rounded-xl card-tactile-gopay hover:border-neutral-400 dark:hover:border-neutral-600 transition-colors flex items-center justify-between gap-4 group cursor-pointer"
              @mouseenter="highlightSlice(0)"
              @mouseleave="resetHighlight"
            >
              <div class="min-w-0 flex-1 flex flex-col items-start gap-1">
                <span class="px-2 py-0.5 rounded-md text-[10px] sm:text-[11px] font-poppins font-semibold border shrink-0 inline-flex items-center bg-blue-100/90 text-[#0066D6] border-blue-300 dark:bg-blue-950/70 dark:text-blue-300 dark:border-blue-800">
                  Modal Jualan (Bahan Baku)
                </span>
                <h3 class="font-poppins font-bold text-sm sm:text-[15px] text-neutral-900 dark:text-white tabular-nums tracking-tight leading-snug">
                  Rp {{ calculatedPeriodHpp.toLocaleString('id-ID') }}
                </h3>
                <div class="flex items-center gap-1.5 text-[11px] sm:text-xs font-poppins text-neutral-500 dark:text-neutral-400 mt-0.5">
                  <span class="w-1.5 h-1.5 rounded-full bg-[#0066D6] shrink-0" />
                  <span>Porsi kas: <span class="font-medium text-neutral-700 dark:text-neutral-300 tabular-nums">{{ calculatedHppPercent }}% dari total</span></span>
                </div>
              </div>
              <span class="px-2.5 py-1 rounded-full bg-blue-50 text-[#0066D6] border border-blue-200 dark:bg-blue-950/60 dark:text-blue-300 dark:border-blue-800 text-xs sm:text-[13px] font-poppins font-bold tabular-nums shrink-0 shadow-xs">
                {{ calculatedHppPercent }}%
              </span>
            </div>

            <!-- 2. Biaya Operasional -->
            <div
              class="p-3.5 sm:p-4 rounded-xl card-tactile-gopay hover:border-neutral-400 dark:hover:border-neutral-600 transition-colors flex items-center justify-between gap-4 group cursor-pointer"
              @mouseenter="highlightSlice(1)"
              @mouseleave="resetHighlight"
            >
              <div class="min-w-0 flex-1 flex flex-col items-start gap-1">
                <span class="px-2 py-0.5 rounded-md text-[10px] sm:text-[11px] font-poppins font-semibold border shrink-0 inline-flex items-center bg-cyan-100/90 text-[#2091AA] border-cyan-300 dark:bg-cyan-950/70 dark:text-cyan-300 dark:border-cyan-800">
                  Biaya Operasional (Sewa & Beban)
                </span>
                <h3 class="font-poppins font-bold text-sm sm:text-[15px] text-neutral-900 dark:text-white tabular-nums tracking-tight leading-snug">
                  Rp {{ calculatedPeriodOpex.toLocaleString('id-ID') }}
                </h3>
                <div class="flex items-center gap-1.5 text-[11px] sm:text-xs font-poppins text-neutral-500 dark:text-neutral-400 mt-0.5">
                  <span class="w-1.5 h-1.5 rounded-full bg-[#2091AA] shrink-0" />
                  <span>Porsi kas: <span class="font-medium text-neutral-700 dark:text-neutral-300 tabular-nums">{{ calculatedOpexPercent }}% dari total</span></span>
                </div>
              </div>
              <span class="px-2.5 py-1 rounded-full bg-cyan-50 text-[#2091AA] border border-cyan-200 dark:bg-cyan-950/60 dark:text-cyan-300 dark:border-cyan-800 text-xs sm:text-[13px] font-poppins font-bold tabular-nums shrink-0 shadow-xs">
                {{ calculatedOpexPercent }}%
              </span>
            </div>

            <!-- 3. Untung Bersih -->
            <div
              class="p-3.5 sm:p-4 rounded-xl card-tactile-gopay hover:border-neutral-400 dark:hover:border-neutral-600 transition-colors flex items-center justify-between gap-4 group cursor-pointer"
              @mouseenter="highlightSlice(2)"
              @mouseleave="resetHighlight"
            >
              <div class="min-w-0 flex-1 flex flex-col items-start gap-1">
                <span class="px-2 py-0.5 rounded-md text-[10px] sm:text-[11px] font-poppins font-semibold border shrink-0 inline-flex items-center bg-emerald-100/90 text-[#00880C] border-emerald-300 dark:bg-emerald-950/70 dark:text-emerald-300 dark:border-emerald-800">
                  Untung Bersih (Laba Bersih)
                </span>
                <h3 class="font-poppins font-bold text-sm sm:text-[15px] text-[#00AA13] dark:text-emerald-400 tabular-nums tracking-tight leading-snug">
                  Rp {{ calculatedPeriodProfit.toLocaleString('id-ID') }}
                </h3>
                <div class="flex items-center gap-1.5 text-[11px] sm:text-xs font-poppins text-neutral-500 dark:text-neutral-400 mt-0.5">
                  <span class="w-1.5 h-1.5 rounded-full bg-[#00AA13] shrink-0" />
                  <span>Margin untung: <span class="font-medium text-emerald-700 dark:text-emerald-300 tabular-nums">{{ calculatedProfitPercent }}% dari total</span></span>
                </div>
              </div>
              <span class="px-2.5 py-1 rounded-full bg-emerald-50 text-[#00880C] border border-emerald-200 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800 text-xs sm:text-[13px] font-poppins font-bold tabular-nums shrink-0 shadow-xs">
                {{ calculatedProfitPercent }}%
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- 3. Tabel Rekapitulasi Arus Kas Bulanan (Sesuai Desain Halaman Beranda) -->
      <div class="card-tactile-gopay rounded-2xl p-5 sm:p-7 space-y-5 border font-poppins">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-neutral-100 dark:border-neutral-800/80">
          <div>
            <h2 class="text-xl sm:text-2xl font-poppins font-bold text-neutral-900 dark:text-white tracking-tight">
              Tabel Rekapitulasi Arus Kas Bulanan
            </h2>
            <p class="text-xs sm:text-[13px] font-poppins text-neutral-500 dark:text-neutral-400 mt-1 leading-normal">
              Rincian pembagian pendapatan, biaya, serta akumulasi saldo kas toko sesuai periode yang dipilih.
            </p>
          </div>

          <!-- Periode badge & Ekspor Button -->
          <div class="flex items-center gap-2.5 shrink-0">
            <span class="text-xs font-semibold px-3 py-1.5 rounded-xl bg-emerald-50 text-[#00AA13] dark:bg-emerald-950/60 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800">
              {{ filteredMonthlyRecords.length }} Bulan Terekam
            </span>
            <button
              type="button"
              class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-white hover:bg-neutral-100/80 dark:bg-[#18191E] dark:hover:bg-neutral-800/80 border border-neutral-200/90 dark:border-neutral-800 text-xs font-poppins font-semibold text-neutral-700 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white transition-all shadow-2xs cursor-pointer active:scale-95"
              @click="handleExportPdf"
            >
              <HugeiconsIcon :icon="Download01Icon" :size="15" />
              <span>Ekspor Tabel</span>
            </button>
          </div>
        </div>

        <div class="overflow-x-auto rounded-xl border border-neutral-200/80 dark:border-neutral-800 bg-white dark:bg-[#13161F] shadow-2xs">
          <table class="w-full text-left text-sm font-poppins">
            <thead>
              <tr class="bg-neutral-50/90 dark:bg-neutral-900/80 border-b border-neutral-200 dark:border-neutral-800 text-neutral-700 dark:text-neutral-300 font-poppins text-xs font-semibold uppercase tracking-wider">
                <th class="py-3.5 px-4 text-left">Bulan</th>
                <th class="py-3.5 px-4 text-left">Total Pendapatan</th>
                <th class="py-3.5 px-4 text-left">Modal Jualan (HPP)</th>
                <th class="py-3.5 px-4 text-left">Biaya Operasional</th>
                <th class="py-3.5 px-4 text-left font-bold text-neutral-900 dark:text-white">Untung Bersih</th>
                <th class="py-3.5 px-4 text-left">Saldo Kas Akhir</th>
                <th class="py-3.5 px-4 text-center">Status Validasi</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-neutral-100 dark:divide-neutral-800/80 text-neutral-800 dark:text-neutral-200">
              <tr
                v-for="(rec, idx) in sortedFilteredRecords"
                :key="`${rec.month}-${rec.year}`"
                :class="[
                  idx % 2 === 0
                    ? 'bg-white dark:bg-[#13161F]'
                    : 'bg-neutral-50/60 dark:bg-neutral-800/30',
                  'hover:bg-blue-50/60 dark:hover:bg-neutral-800/80 transition-colors'
                ]"
              >
                <td class="py-3.5 px-4 text-left font-poppins font-semibold text-neutral-900 dark:text-white text-sm sm:text-base">
                  {{ rec.month }} {{ rec.year }}
                </td>
                <td class="py-3.5 px-4 text-left font-poppins tabular-nums font-semibold text-neutral-900 dark:text-white">
                  Rp {{ rec.omzet.toLocaleString('id-ID') }}
                </td>
                <td class="py-3.5 px-4 text-left font-poppins tabular-nums text-neutral-600 dark:text-neutral-300">
                  Rp {{ rec.hpp.toLocaleString('id-ID') }}
                </td>
                <td class="py-3.5 px-4 text-left font-poppins tabular-nums text-neutral-600 dark:text-neutral-300">
                  Rp {{ rec.opex.toLocaleString('id-ID') }}
                </td>
                <td class="py-3.5 px-4 text-left font-poppins tabular-nums font-bold text-[#00AA13] dark:text-emerald-400 text-sm sm:text-base">
                  Rp {{ rec.netProfit.toLocaleString('id-ID') }}
                </td>
                <td class="py-3.5 px-4 text-left font-poppins tabular-nums font-semibold text-[#2091AA] dark:text-[#50AABF]">
                  Rp {{ rec.cashBalance.toLocaleString('id-ID') }}
                </td>
                <td class="py-3.5 px-4 text-center font-poppins">
                  <span class="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400 border border-emerald-200">
                    <HugeiconsIcon :icon="CheckmarkCircle01Icon" :size="13" />
                    <span>Terverifikasi</span>
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>



    <!-- 8. Slide-Over Sheet: Catat Kas Toko Baru (BDrawer) -->
    <BDrawer
      v-model="isCashDrawerOpen"
      title="Catat Kas Toko Baru"
      subtitle="Buku Catatan Penjualan & Pengeluaran Toko Harian"
    >
      <form @submit.prevent="handleSaveTransaction" class="space-y-4 pt-1 font-poppins">
        <!-- Tanggal Transaksi -->
        <div>
          <label class="block text-xs sm:text-sm font-semibold text-neutral-800 dark:text-neutral-200 mb-1.5">
            Tanggal Pembukuan
          </label>
          <input
            v-model="newTxForm.date"
            type="text"
            required
            placeholder="Contoh: 15 Oktober 2026"
            class="w-full px-3.5 py-2.5 text-sm rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#2091AA]/30 font-poppins"
          />
        </div>

        <!-- Kategori Transaksi -->
        <div>
          <label class="block text-xs sm:text-sm font-semibold text-neutral-800 dark:text-neutral-200 mb-1.5">
            Kategori Transaksi
          </label>
          <div class="grid grid-cols-3 gap-2">
            <button
              type="button"
              :class="[
                'p-2.5 rounded-xl text-xs font-semibold border flex flex-col items-center gap-1 transition-all cursor-pointer',
                newTxForm.category === 'PEMASUKAN'
                  ? 'bg-emerald-50 text-[#00AA13] border-emerald-300 dark:bg-emerald-950/60 dark:border-emerald-700 shadow-2xs'
                  : 'bg-white dark:bg-neutral-900 border-neutral-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-400'
              ]"
              @click="newTxForm.category = 'PEMASUKAN'"
            >
              <span>Uang Masuk</span>
              <span class="text-[10px] text-neutral-400 font-normal">Penjualan</span>
            </button>
            <button
              type="button"
              :class="[
                'p-2.5 rounded-xl text-xs font-semibold border flex flex-col items-center gap-1 transition-all cursor-pointer',
                newTxForm.category === 'MODAL_JUALAN'
                  ? 'bg-blue-50 text-[#0066D6] border-blue-300 dark:bg-blue-950/60 dark:border-blue-700 shadow-2xs'
                  : 'bg-white dark:bg-neutral-900 border-neutral-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-400'
              ]"
              @click="newTxForm.category = 'MODAL_JUALAN'"
            >
              <span>Modal Jualan</span>
              <span class="text-[10px] text-neutral-400 font-normal">Bahan Baku</span>
            </button>
            <button
              type="button"
              :class="[
                'p-2.5 rounded-xl text-xs font-semibold border flex flex-col items-center gap-1 transition-all cursor-pointer',
                newTxForm.category === 'OPERASIONAL'
                  ? 'bg-cyan-50 text-[#2091AA] border-cyan-300 dark:bg-cyan-950/60 dark:border-cyan-700 shadow-2xs'
                  : 'bg-white dark:bg-neutral-900 border-neutral-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-400'
              ]"
              @click="newTxForm.category = 'OPERASIONAL'"
            >
              <span>Operasional</span>
              <span class="text-[10px] text-neutral-400 font-normal">Sewa/Listrik</span>
            </button>
          </div>
        </div>

        <!-- Nama Transaksi -->
        <div>
          <label class="block text-xs sm:text-sm font-semibold text-neutral-800 dark:text-neutral-200 mb-1.5">
            Nama Transaksi / Pengeluaran
          </label>
          <input
            v-model="newTxForm.title"
            type="text"
            required
            placeholder="Contoh: Belanja Biji Kopi Arabika 20kg"
            class="w-full px-3.5 py-2.5 text-sm rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#2091AA]/30 font-poppins"
          />
        </div>

        <!-- Nominal Uang -->
        <div>
          <label class="block text-xs sm:text-sm font-semibold text-neutral-800 dark:text-neutral-200 mb-1.5">
            Nominal Rupiah
          </label>
          <div class="relative">
            <span class="absolute inset-y-0 left-0 pl-3.5 flex items-center text-sm font-bold text-neutral-500 font-poppins">Rp</span>
            <input
              v-model.number="newTxForm.amount"
              type="number"
              required
              min="1000"
              placeholder="1.500.000"
              class="w-full pl-10 pr-3.5 py-2.5 text-sm sm:text-base rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white tabular-nums font-bold focus:outline-none focus:ring-2 focus:ring-[#2091AA]/30 font-poppins"
            />
          </div>
        </div>

        <!-- Metode Pembayaran -->
        <div>
          <label class="block text-xs sm:text-sm font-semibold text-neutral-800 dark:text-neutral-200 mb-1.5">
            Metode Pembayaran
          </label>
          <select
            v-model="newTxForm.paymentMethod"
            class="w-full px-3.5 py-2.5 text-sm rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#2091AA]/30 font-poppins cursor-pointer"
          >
            <option value="QRIS">QRIS / e-Wallet</option>
            <option value="TRANSFER">Transfer Bank / Giro</option>
            <option value="TUNAI">Uang Tunai (Kasir Fisik)</option>
          </select>
        </div>

        <!-- Catatan Tambahan -->
        <div>
          <label class="block text-xs sm:text-sm font-semibold text-neutral-800 dark:text-neutral-200 mb-1.5">
            Catatan Tambahan / Nomor Nota
          </label>
          <textarea
            v-model="newTxForm.notes"
            rows="2"
            placeholder="Contoh: Pembelian langsung di pasar grosir, nota terlampir fisik."
            class="w-full px-3.5 py-2.5 text-sm rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#2091AA]/30 font-poppins leading-relaxed"
          ></textarea>
        </div>

        <div class="pt-3 flex items-center justify-end gap-3 border-t border-neutral-200 dark:border-neutral-800">
          <button
            type="button"
            class="px-4 py-2.5 rounded-xl border border-neutral-300 dark:border-neutral-700 text-xs sm:text-sm font-poppins font-medium text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors cursor-pointer"
            @click="isCashDrawerOpen = false"
          >
            Batal
          </button>
          <button
            type="submit"
            class="btn-3d-blue px-5 py-2.5 text-xs sm:text-sm font-poppins font-semibold cursor-pointer"
          >
            Simpan ke Buku Kas
          </button>
        </div>
      </form>
    </BDrawer>

    <!-- 8. Modal Lihat Bukti Nota Transaksi -->
    <BModal
      v-model="isReceiptModalOpen"
      title="Rincian Bukti Transaksi"
      subtitle="Dokumen resmi pencatatan kas toko yang telah diverifikasi"
      size="md"
    >
      <div v-if="selectedTx" class="space-y-4 pt-1 font-poppins">
        <div class="p-5 rounded-2xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 space-y-3">
          <div class="flex items-center justify-between border-b border-neutral-200 dark:border-neutral-800 pb-3">
            <div>
              <span class="text-xs text-neutral-400 font-medium">Nomor Nota Rekonsiliasi</span>
              <p class="font-poppins font-bold text-sm text-neutral-900 dark:text-white">
                {{ selectedTx.receiptNumber || 'NOTA/KASIR/AUTO' }}
              </p>
            </div>
            <span class="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400 border border-emerald-200">
              Tervalidasi
            </span>
          </div>

          <div class="space-y-2 text-xs sm:text-sm">
            <div class="flex items-center justify-between">
              <span class="text-neutral-500">Nama Transaksi</span>
              <span class="font-semibold text-neutral-900 dark:text-white text-right">{{ selectedTx.title }}</span>
            </div>
            <div class="flex items-center justify-between">
              <span class="text-neutral-500">Tanggal Transaksi</span>
              <span class="font-medium text-neutral-800 dark:text-neutral-200">{{ selectedTx.date }}</span>
            </div>
            <div class="flex items-center justify-between">
              <span class="text-neutral-500">Metode Pembayaran</span>
              <span class="font-medium text-neutral-800 dark:text-neutral-200">{{ selectedTx.paymentMethod }}</span>
            </div>
            <div class="flex items-center justify-between">
              <span class="text-neutral-500">Kategori Kas</span>
              <span class="font-semibold text-[#2091AA] dark:text-[#50AABF]">
                {{ selectedTx.category === 'PEMASUKAN' ? 'Uang Masuk' : selectedTx.category === 'MODAL_JUALAN' ? 'Modal Jualan' : 'Biaya Operasional' }}
              </span>
            </div>
            <div v-if="selectedTx.notes" class="flex items-start justify-between gap-4 pt-1">
              <span class="text-neutral-500 shrink-0">Catatan Detail</span>
              <span class="font-medium text-neutral-800 dark:text-neutral-200 text-right">{{ selectedTx.notes }}</span>
            </div>
          </div>

          <div class="pt-3 border-t border-neutral-200 dark:border-neutral-800 flex items-center justify-between">
            <span class="font-bold text-sm text-neutral-900 dark:text-white">Total Nominal</span>
            <span class="font-bold text-lg text-[#00AA13] dark:text-emerald-400 tabular-nums">
              Rp {{ selectedTx.amount.toLocaleString('id-ID') }}
            </span>
          </div>
        </div>

        <div class="p-3.5 rounded-xl bg-blue-50/70 dark:bg-blue-950/30 border border-blue-200/70 dark:border-blue-900/40 text-xs text-neutral-600 dark:text-neutral-300 leading-relaxed">
          <p class="font-semibold text-[#2091AA] dark:text-[#50AABF] mb-0.5">Catatan Konsultan Pendamping:</p>
          <p>Dokumen bukti transaksi ini telah dicocokkan dengan mutasi rekening giro toko dan dinyatakan sah untuk rekam jejak investor.</p>
        </div>
      </div>
    </BModal>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, nextTick, onBeforeUnmount, watch } from 'vue'
import { useUmkmStore, type DailyTransaction } from '~/stores/umkm'
import gsap from 'gsap'
import Chart from 'chart.js/auto'
import { HugeiconsIcon } from '@hugeicons/vue'
import {
  Home03Icon,
  Coins01Icon,
  MoneyBag01Icon,
  Download01Icon,
  Search01Icon,
  CheckmarkCircle01Icon,
  CreditCardIcon,
  Delete02Icon,
  ViewIcon,
  AnalyticsUpIcon
} from '@hugeicons/core-free-icons'

// Base components
import BDrawer from '~/components/base/BDrawer.vue'
import BModal from '~/components/base/BModal.vue'
import BShadcnLineChart from '~/components/base/BShadcnLineChart.vue'

definePageMeta({
  layout: 'dashboard'
})

const umkmStore = useUmkmStore()

// State Tab Switcher
const activeTab = ref<'mutasi' | 'bulanan' | 'tren'>('mutasi')
const tabIndicatorRef = ref<HTMLElement | null>(null)
const tabRefs = new Map<string, HTMLElement>()

function setTabRef(id: string, el: any) {
  if (el) tabRefs.set(id, el as HTMLElement)
}

function updateTabIndicator(immediate = false) {
  const indicatorEl = tabIndicatorRef.value
  if (!indicatorEl) return

  const targetEl = tabRefs.get(activeTab.value)
  if (!targetEl) return

  const targetLeft = targetEl.offsetLeft
  const targetWidth = targetEl.offsetWidth

  if (immediate) {
    gsap.set(indicatorEl, { x: targetLeft, width: targetWidth, opacity: 1 })
  } else {
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

function setActiveTab(tab: 'mutasi' | 'bulanan' | 'tren') {
  if (activeTab.value === tab) return
  activeTab.value = tab
  updateTabIndicator(false)
  nextTick(() => {
    gsap.fromTo(
      '.gsap-tab-content',
      { opacity: 0, y: 8 },
      { opacity: 1, y: 0, duration: 0.35, ease: 'power2.out', clearProps: 'all' }
    )
    if (tab === 'tren') {
      setTimeout(() => {
        updatePeriodIndicator(true)
        initDonutChart()
      }, 50)
    }
  })
}

// Latest Monthly Record (Bulan Aktif / Rekonsiliasi Terakhir)
const latestMonthRecord = computed(() => {
  const records = umkmStore.monthlyRecords || []
  return records[records.length - 1] || {
    month: 'Oktober',
    year: 2026,
    omzet: 100000000,
    hpp: 45100000,
    opex: 22300000,
    netProfit: 32600000,
    cashBalance: 75500000,
    status: 'VERIFIED'
  }
})

// Summary Metrics for Daily Cashflow
const totalIncome = computed(() => {
  return (umkmStore.dailyTransactions || [])
    .filter(t => t.category === 'PEMASUKAN')
    .reduce((acc, t) => acc + t.amount, 0)
})

const totalHppExpense = computed(() => {
  return (umkmStore.dailyTransactions || [])
    .filter(t => t.category === 'MODAL_JUALAN')
    .reduce((acc, t) => acc + t.amount, 0)
})

const totalOpexExpense = computed(() => {
  return (umkmStore.dailyTransactions || [])
    .filter(t => t.category === 'OPERASIONAL')
    .reduce((acc, t) => acc + t.amount, 0)
})

// Trend Chart Filter State & Sliding Pill Indicator
const timeFilterOptions = [
  { id: '3m', label: '3 Bulan' },
  { id: '6m', label: '6 Bulan' },
  { id: '1y', label: '1 Tahun' }
] as const

const selectedPeriod = ref<'3m' | '6m' | '1y'>('6m')
const periodIndicatorRef = ref<HTMLElement | null>(null)
const periodButtonsRef = ref<Record<string, HTMLElement | null>>({})

function setPeriodButtonRef(id: string, el: any) {
  if (el) {
    periodButtonsRef.value[id] = el
  }
}

function updatePeriodIndicator(immediate = false) {
  const indicatorEl = periodIndicatorRef.value
  if (!indicatorEl) return

  let targetEl = periodButtonsRef.value[selectedPeriod.value]
  if (!targetEl && indicatorEl.parentElement) {
    targetEl = (indicatorEl.parentElement.querySelector('.segmented-pill-btn.is-active') ||
      indicatorEl.parentElement.querySelector('.segmented-pill-btn')) as HTMLElement
  }
  if (!targetEl) return

  const targetLeft = targetEl.offsetLeft
  const targetWidth = targetEl.offsetWidth

  if (immediate) {
    gsap.set(indicatorEl, { x: targetLeft, width: targetWidth, opacity: 1 })
  } else {
    gsap.to(indicatorEl, {
      x: targetLeft,
      width: targetWidth,
      opacity: 1,
      duration: 0.35,
      ease: 'power2.out',
      overwrite: 'auto'
    })
  }
}

function setPeriodFilter(periodId: '3m' | '6m' | '1y') {
  selectedPeriod.value = periodId
  updatePeriodIndicator(false)
}

const selectedPeriodLabel = computed(() => {
  if (selectedPeriod.value === '3m') return '3 Bulan Terakhir'
  if (selectedPeriod.value === '6m') return '6 Bulan Terakhir'
  return '1 Tahun Terakhir'
})

const filteredMonthlyRecords = computed(() => {
  const records = umkmStore.monthlyRecords || []
  if (selectedPeriod.value === '3m') return records.slice(-3)
  if (selectedPeriod.value === '6m') return records.slice(-6)
  return records
})

const sortedFilteredRecords = computed(() => {
  const records = [...filteredMonthlyRecords.value]
  return records.reverse()
})

const currentActivePeriodLabel = computed(() => {
  const records = filteredMonthlyRecords.value
  if (!records.length) return 'Bulan Ini'
  const first = records[0]
  const last = records[records.length - 1]
  return `${first.month} - ${last.month} ${last.year}`
})

const progresChartConfig = {
  omzet: {
    label: 'Total Pendapatan',
    color: '#0066D6'
  },
  cashBalance: {
    label: 'Saldo Kas Toko',
    color: '#2091AA'
  },
  netProfit: {
    label: 'Untung Bersih',
    color: '#00AA13'
  },
  hpp: {
    label: 'Modal Jualan (Bahan)',
    color: '#F59E0B'
  }
}

// Donut Chart State & Controls (Aliran Kas)
const donutCanvas = ref<HTMLCanvasElement | null>(null)
let donutChartInstance: any = null

const calculatedPeriodOmzet = computed(() => {
  return filteredMonthlyRecords.value.reduce((acc, r) => acc + (r.omzet || 0), 0)
})
const calculatedPeriodHpp = computed(() => {
  return filteredMonthlyRecords.value.reduce((acc, r) => acc + (r.hpp || 0), 0)
})
const calculatedPeriodOpex = computed(() => {
  return filteredMonthlyRecords.value.reduce((acc, r) => acc + (r.opex || 0), 0)
})
const calculatedPeriodProfit = computed(() => {
  return filteredMonthlyRecords.value.reduce((acc, r) => acc + (r.netProfit || 0), 0)
})

const calculatedHppPercent = computed(() => {
  const total = calculatedPeriodOmzet.value || 1
  return ((calculatedPeriodHpp.value / total) * 100).toFixed(1)
})
const calculatedOpexPercent = computed(() => {
  const total = calculatedPeriodOmzet.value || 1
  return ((calculatedPeriodOpex.value / total) * 100).toFixed(1)
})
const calculatedProfitPercent = computed(() => {
  const total = calculatedPeriodOmzet.value || 1
  return ((calculatedPeriodProfit.value / total) * 100).toFixed(1)
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
            calculatedPeriodHpp.value,
            calculatedPeriodOpex.value,
            calculatedPeriodProfit.value
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
              const total = calculatedPeriodOmzet.value
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
  donutChartInstance.data.datasets[0].data = [
    calculatedPeriodHpp.value,
    calculatedPeriodOpex.value,
    calculatedPeriodProfit.value
  ]
  donutChartInstance.update()
}

watch([donutCanvas, activeTab], ([newCanvas, curTab]) => {
  if (newCanvas && curTab === 'tren') {
    nextTick(() => {
      initDonutChart()
    })
  }
})

watch(filteredMonthlyRecords, () => {
  if (activeTab.value === 'tren') {
    nextTick(() => {
      updateDonutChart()
    })
  }
})

function highlightSlice(index: number) {
  if (!donutChartInstance) return
  donutChartInstance.tooltip?.setActiveElements([{ datasetIndex: 0, index }], { x: 0, y: 0 })
  donutChartInstance.update()
}

function resetHighlight() {
  if (!donutChartInstance) return
  donutChartInstance.setActiveElements([])
  donutChartInstance.tooltip?.setActiveElements([], { x: 0, y: 0 })
  donutChartInstance.update()
}

// Daily Transaction Filter & Search
const activeCategoryFilter = ref<'ALL' | 'PEMASUKAN' | 'MODAL_JUALAN' | 'OPERASIONAL'>('ALL')
const searchQuery = ref('')
const isCategoryDropdownOpen = ref(false)

const categoryFilterOptions = [
  { id: 'ALL' as const, label: 'Semua Transaksi' },
  { id: 'PEMASUKAN' as const, label: 'Uang Masuk' },
  { id: 'MODAL_JUALAN' as const, label: 'Modal Jualan' },
  { id: 'OPERASIONAL' as const, label: 'Biaya Operasional' }
]

const activeCategoryLabel = computed(() => {
  const opt = categoryFilterOptions.find(o => o.id === activeCategoryFilter.value)
  return opt ? opt.label : 'Semua Transaksi'
})

function selectCategoryFilter(id: 'ALL' | 'PEMASUKAN' | 'MODAL_JUALAN' | 'OPERASIONAL') {
  activeCategoryFilter.value = id
  isCategoryDropdownOpen.value = false
}

function getCategoryCount(id: 'ALL' | 'PEMASUKAN' | 'MODAL_JUALAN' | 'OPERASIONAL') {
  const all = umkmStore.dailyTransactions || []
  if (id === 'ALL') return all.length
  return all.filter(t => t.category === id).length
}

function formatShortDate(dateStr: string) {
  if (!dateStr) return '-'
  const parts = dateStr.trim().split(' ')
  if (parts.length >= 2) {
    const day = parts[0]
    const month = parts[1].slice(0, 3)
    return `${day} ${month}`
  }
  return dateStr
}

const filteredDailyTransactions = computed(() => {
  let list = umkmStore.dailyTransactions || []

  if (activeCategoryFilter.value !== 'ALL') {
    list = list.filter(t => t.category === activeCategoryFilter.value)
  }

  if (searchQuery.value.trim()) {
    const q = searchQuery.value.toLowerCase().trim()
    list = list.filter(t =>
      t.title.toLowerCase().includes(q) ||
      (t.notes && t.notes.toLowerCase().includes(q)) ||
      (t.receiptNumber && t.receiptNumber.toLowerCase().includes(q)) ||
      t.paymentMethod.toLowerCase().includes(q)
    )
  }

  return list
})

// Drawer Form State
const isCashDrawerOpen = ref(false)
const newTxForm = ref({
  date: '15 Oktober 2026',
  title: '',
  category: 'PEMASUKAN' as 'PEMASUKAN' | 'MODAL_JUALAN' | 'OPERASIONAL',
  amount: 0,
  paymentMethod: 'QRIS' as 'QRIS' | 'TRANSFER' | 'TUNAI',
  notes: ''
})

function handleSaveTransaction() {
  if (!newTxForm.value.title || newTxForm.value.amount <= 0) return

  umkmStore.addDailyTransaction({
    date: newTxForm.value.date,
    title: newTxForm.value.title,
    category: newTxForm.value.category,
    amount: newTxForm.value.amount,
    paymentMethod: newTxForm.value.paymentMethod,
    receiptNumber: `NOTA/${Date.now().toString().slice(-6)}`,
    notes: newTxForm.value.notes
  })

  // Reset form
  newTxForm.value = {
    date: '15 Oktober 2026',
    title: '',
    category: 'PEMASUKAN',
    amount: 0,
    paymentMethod: 'QRIS',
    notes: ''
  }
  isCashDrawerOpen.value = false
}

function handleDeleteTx(id: string) {
  if (confirm('Hapus catatan mutasi kas ini?')) {
    umkmStore.deleteDailyTransaction(id)
  }
}

// Receipt Modal State
const isReceiptModalOpen = ref(false)
const selectedTx = ref<DailyTransaction | null>(null)

function openReceiptModal(tx: DailyTransaction) {
  selectedTx.value = tx
  isReceiptModalOpen.value = true
}

function handleExportPdf() {
  alert('Menyiapkan berkas Buku Kas Resmi (PDF) Kopi Senja Nusantara untuk ekspor investor...')
}

let handleResize: (() => void) | null = null
let gsapCtx: gsap.Context | null = null

onMounted(() => {
  nextTick(() => {
    updateTabIndicator(true)
    if (activeTab.value === 'tren') {
      updatePeriodIndicator(true)
      initDonutChart()
    }
  })
  setTimeout(() => {
    updateTabIndicator(true)
    if (activeTab.value === 'tren') {
      updatePeriodIndicator(true)
      initDonutChart()
    }
  }, 150)

  handleResize = () => {
    updateTabIndicator(true)
    if (activeTab.value === 'tren') {
      updatePeriodIndicator(true)
    }
  }
  window.addEventListener('resize', handleResize)

  // GSAP Entrance (Halus, bersahaja, profesional)
  gsapCtx = gsap.context(() => {
    // 1. Metric Stat Cards Stagger
    gsap.from('.gsap-stat-card', {
      opacity: 0,
      y: 12,
      stagger: 0.06,
      duration: 0.45,
      ease: 'power2.out',
      clearProps: 'all'
    })

    // 2. Segmented Macro Tabs
    gsap.from('.segmented-pill-container', {
      opacity: 0,
      y: 8,
      duration: 0.4,
      delay: 0.15,
      ease: 'power2.out',
      clearProps: 'all'
    })

    // 3. Tab Content Section
    gsap.from('.gsap-tab-content', {
      opacity: 0,
      y: 10,
      duration: 0.4,
      delay: 0.22,
      ease: 'power2.out',
      clearProps: 'all'
    })
  })
})

onBeforeUnmount(() => {
  if (handleResize) {
    window.removeEventListener('resize', handleResize)
    handleResize = null
  }
  if (donutChartInstance) {
    donutChartInstance.destroy()
    donutChartInstance = null
  }
  if (gsapCtx) {
    gsapCtx.revert()
    gsapCtx = null
  }
})
</script>
