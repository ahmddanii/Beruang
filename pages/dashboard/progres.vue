<template>
  <div class="space-y-6 sm:space-y-8 pb-16 font-poppins text-neutral-900 dark:text-neutral-100">
    <!-- 1. Top Header: Title on Left & Action Controls (Month Filter + Unduh) on Right (Same Row) -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 min-h-[44px]">
      <div class="flex items-center gap-2.5 sm:gap-3">
        <HugeiconsIcon
          :icon="Coins01Icon"
          :size="26"
          :stroke-width="2.2"
          class="text-neutral-900 dark:text-white shrink-0"
        />
        <h1 class="font-poppins font-semibold text-2xl sm:text-3xl text-neutral-900 dark:text-white tracking-tight leading-tight">
          Catatan Kas
        </h1>
      </div>

      <!-- Action Controls: Month Filter Dropdown & Download PDF Button (Stacked full-width on mobile, side-by-side on desktop) -->
      <div class="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 shrink-0 w-full sm:w-auto [&>*]:w-full sm:[&>*]:w-auto">
        <!-- Month Filter Dropdown (Pilih Bulan: "Sekarang", "September 2026", ...) -->
        <div ref="monthDropdownRef" class="relative inline-block text-left w-full sm:w-auto shrink-0">
          <button
            type="button"
            class="btn-pill-action group w-full sm:w-auto justify-between sm:justify-center shrink-0"
            :aria-expanded="isMonthDropdownOpen"
            title="Pilih Periode Bulan Catatan Keuangan"
            @click="isMonthDropdownOpen = !isMonthDropdownOpen"
          >
            <!-- Calendar Icon -->
            <svg
              class="w-4 h-4 text-neutral-500 dark:text-neutral-400 transition-colors group-hover:text-neutral-800 dark:group-hover:text-white shrink-0 mr-1"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2.0"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <rect width="18" height="18" x="3" y="4" rx="2" />
              <path d="M16 2v4M8 2v4M3 10h18" />
            </svg>

            <span>{{ selectedMonthButtonLabel }}</span>

            <!-- Arrow Down Icon -->
            <svg
              class="w-4 h-4 text-neutral-500 dark:text-neutral-400 transition-transform duration-200 shrink-0 group-hover:text-neutral-800 dark:group-hover:text-white ml-0.5"
              :class="{ 'rotate-180': isMonthDropdownOpen }"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2.0"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="m6 9 6 6 6-6" />
            </svg>
          </button>

          <!-- Dropdown Menu Popover -->
          <div
            v-if="isMonthDropdownOpen"
            class="absolute right-0 mt-2 w-full sm:w-48 max-h-72 overflow-y-auto rounded-[8px] bg-white dark:bg-[#18191E] border border-[#CBD5E1] dark:border-neutral-700 shadow-xl p-1.5 z-50 font-poppins text-sm animate-in fade-in zoom-in-95 duration-150"
          >
            <div class="space-y-0.5">
              <button
                v-for="m in monthOptions"
                :key="m.id"
                type="button"
                :class="[
                  'w-full flex items-center justify-between px-3 py-2 rounded-[8px] text-sm font-poppins transition-all duration-150 text-left cursor-pointer',
                  selectedMonthId === m.id
                    ? 'bg-[#E6F4F7] hover:bg-[#D9EEF3] dark:bg-[#156374]/20 dark:hover:bg-[#156374]/30 text-[#156374] dark:text-[#50AABF] font-semibold border border-[#156374]/20 dark:border-[#50AABF]/25 shadow-2xs'
                    : 'text-[#475569] dark:text-neutral-300 font-medium hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100/80 dark:hover:bg-neutral-800/60 border border-transparent'
                ]"
                @click="selectMonth(m.id)"
              >
                <span>{{ m.label }}</span>
              </button>
            </div>
          </div>
        </div>

        <!-- Unduh Buku Kas Button (Green CTA) -->
        <BActionButton
          variant="green"
          icon="download"
          title="Unduh Rekapitulasi Kas"
          custom-class="w-full sm:w-auto justify-center text-center"
          @click="handleExportPdf"
        >
          Unduh Buku Kas
        </BActionButton>
      </div>
    </div>

    <!-- 2. Metric Container: 4 Equal Width Financial Cards (Apple Store Utility Card: rounded.lg 18px, spacing.lg 24px) -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 items-stretch w-full">
      <!-- Card 1: Saldo Kas Toko -->
      <div class="gsap-stat-card flex-1 w-full">
        <div class="stat-card-clean transition-all duration-200">
          <!-- 1. Top Header: Icon + Title & Badge -->
          <div class="flex items-center justify-between w-full gap-1.5">
            <div class="flex items-center gap-1.5 sm:gap-2 min-w-0">
              <div class="stat-card-icon-box shrink-0">
                <HugeiconsIcon
                  :icon="Coins01Icon"
                  :size="16"
                  :stroke-width="2.0"
                  class="text-[#156374] dark:text-[#50AABF] shrink-0"
                />
              </div>
              <span class="text-xs sm:text-sm font-poppins font-semibold text-neutral-800 dark:text-neutral-100 whitespace-nowrap tracking-[-0.01em]">
                Saldo Kas Toko
              </span>
            </div>
            <div class="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-emerald-100/90 text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-300 border border-emerald-200/80 dark:border-emerald-800/60 shrink-0">
              <span>Sehat</span>
            </div>
          </div>

          <!-- 2. Middle Value Row: font-semibold matching Beranda -->
          <div class="my-auto py-2.5 sm:py-3.5">
            <span class="text-xl sm:text-[22px] lg:text-[21px] xl:text-[24px] font-poppins font-semibold text-neutral-900 dark:text-white tabular-nums tracking-[-0.02em] whitespace-nowrap block leading-tight">
              Rp {{ displayedCashBalance.toLocaleString('id-ID') }}
            </span>
          </div>

          <!-- 3. Bottom Action Button: Catat Kas -->
          <div class="stat-card-actions">
            <BActionButton
              variant="green"
              icon="plus"
              @click="isCashDrawerOpen = true"
              custom-class="shrink-0"
            >
              Catat Kas
            </BActionButton>
          </div>
        </div>
      </div>

      <!-- Card 2: Modal Jualan (Diposisikan di sebelah kanan Saldo Kas Toko) -->
      <div class="gsap-stat-card flex-1 w-full">
        <div class="stat-card-clean transition-all duration-200">
          <!-- 1. Top Header: Icon + Title & Badge -->
          <div class="flex items-center justify-between w-full gap-1.5">
            <div class="flex items-center gap-1.5 sm:gap-2 min-w-0">
              <div class="stat-card-icon-box shrink-0">
                <HugeiconsIcon
                  :icon="MoneyBag01Icon"
                  :size="16"
                  :stroke-width="2.0"
                  class="text-[#156374] dark:text-[#50AABF] shrink-0"
                />
              </div>
              <span class="text-xs sm:text-sm font-poppins font-semibold text-neutral-800 dark:text-neutral-100 whitespace-nowrap tracking-[-0.01em]">
                Modal Jualan
              </span>
            </div>
            <div class="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-emerald-100/90 text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-300 border border-emerald-200/80 dark:border-emerald-800/60 shrink-0">
              <span>Hemat</span>
            </div>
          </div>

          <!-- 2. Middle Value Row: font-semibold matching Beranda -->
          <div class="my-auto py-2.5 sm:py-3.5">
            <span class="text-xl sm:text-[22px] lg:text-[21px] xl:text-[24px] font-poppins font-semibold text-neutral-900 dark:text-white tabular-nums tracking-[-0.02em] whitespace-nowrap block leading-tight">
              - Rp {{ displayedHpp.toLocaleString('id-ID') }}
            </span>
          </div>

          <!-- 3. Bottom Action Button: Cek Modal Jualan -->
          <div class="stat-card-actions">
            <BActionButton
              variant="default"
              icon="chevron"
              @click="setActiveTab('mutasi'); activeCategoryFilter = 'MODAL_JUALAN'"
              custom-class="shrink-0"
            >
              Cek Modal Jualan
            </BActionButton>
          </div>
        </div>
      </div>

      <!-- Card 3: Uang Masuk -->
      <div class="gsap-stat-card flex-1 w-full">
        <div class="stat-card-clean transition-all duration-200">
          <!-- 1. Top Header: Icon + Title & Badge -->
          <div class="flex items-center justify-between w-full gap-1.5">
            <div class="flex items-center gap-1.5 sm:gap-2 min-w-0">
              <div class="stat-card-icon-box shrink-0">
                <svg class="w-4 h-4 text-[#156374] dark:text-[#50AABF] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.0" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M17 7 7 17" />
                  <path d="M17 17H7V7" />
                </svg>
              </div>
              <span class="text-xs sm:text-sm font-poppins font-semibold text-neutral-800 dark:text-neutral-100 whitespace-nowrap tracking-[-0.01em]">
                Uang Masuk
              </span>
            </div>
            <div class="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-emerald-100/90 text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-300 border border-emerald-200/80 dark:border-emerald-800/60 shrink-0">
              <span>+9.8%</span>
            </div>
          </div>

          <!-- 2. Middle Value Row: font-semibold matching Beranda -->
          <div class="my-auto py-2.5 sm:py-3.5">
            <span class="text-xl sm:text-[22px] lg:text-[21px] xl:text-[24px] font-poppins font-semibold text-neutral-900 dark:text-white tabular-nums tracking-[-0.02em] whitespace-nowrap block leading-tight">
              + Rp {{ displayedIncome.toLocaleString('id-ID') }}
            </span>
          </div>

          <!-- 3. Bottom Action Button: Lihat Uang Masuk -->
          <div class="stat-card-actions">
            <BActionButton
              variant="default"
              icon="chevron"
              @click="setActiveTab('mutasi'); activeCategoryFilter = 'PEMASUKAN'"
              custom-class="shrink-0"
            >
              Lihat Uang Masuk
            </BActionButton>
          </div>
        </div>
      </div>

      <!-- Card 4: Biaya Operasional -->
      <div class="gsap-stat-card flex-1 w-full">
        <div class="stat-card-clean transition-all duration-200">
          <!-- 1. Top Header: Icon + Title & Badge -->
          <div class="flex items-center justify-between w-full gap-1.5">
            <div class="flex items-center gap-1.5 sm:gap-2 min-w-0">
              <div class="stat-card-icon-box shrink-0">
                <svg class="w-4 h-4 text-[#156374] dark:text-[#50AABF] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.0" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M7 17 17 7" />
                  <path d="M7 7h10v10" />
                </svg>
              </div>
              <span class="text-xs sm:text-sm font-poppins font-semibold text-neutral-800 dark:text-neutral-100 whitespace-nowrap tracking-[-0.01em]">
                Biaya Operasional
              </span>
            </div>
            <div class="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-rose-100/90 text-rose-800 dark:bg-rose-950/80 dark:text-rose-300 border border-rose-200/80 dark:border-rose-800/60 shrink-0">
              <span>Terkontrol</span>
            </div>
          </div>

          <!-- 2. Middle Value Row: font-semibold matching Beranda -->
          <div class="my-auto py-2.5 sm:py-3.5">
            <span class="text-xl sm:text-[22px] lg:text-[21px] xl:text-[24px] font-poppins font-semibold text-neutral-900 dark:text-white tabular-nums tracking-[-0.02em] whitespace-nowrap block leading-tight">
              - Rp {{ displayedOpex.toLocaleString('id-ID') }}
            </span>
          </div>

          <!-- 3. Bottom Action Button: Cek Beban Toko -->
          <div class="stat-card-actions">
            <BActionButton
              variant="default"
              icon="chevron"
              @click="setActiveTab('mutasi'); activeCategoryFilter = 'OPERASIONAL'"
              custom-class="shrink-0"
            >
              Cek Beban Toko
            </BActionButton>
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
        <HugeiconsIcon :icon="Coins01Icon" :size="isMobile ? 15 : 17" :stroke-width="activeTab === 'mutasi' ? 2.2 : 1.8" class="mr-1.5 sm:mr-2 shrink-0 transition-colors" />
        <span class="truncate leading-normal pb-0.5">
          {{ isMobile ? t('progres_tab_mutasi_short') : t('progres_tab_mutasi') }}
        </span>
      </button>

      <button
        type="button"
        :ref="el => setTabRef('bulanan', el)"
        class="segmented-pill-btn group"
        :class="activeTab === 'bulanan' ? 'is-active' : 'is-inactive'"
        @click="setActiveTab('bulanan')"
      >
        <HugeiconsIcon :icon="CheckmarkCircle01Icon" :size="isMobile ? 15 : 17" :stroke-width="activeTab === 'bulanan' ? 2.2 : 1.8" class="mr-1.5 sm:mr-2 shrink-0 transition-colors" />
        <span class="truncate leading-normal pb-0.5">
          {{ isMobile ? t('progres_tab_bulanan_short') : t('progres_tab_bulanan') }}
        </span>
      </button>

      <button
        type="button"
        :ref="el => setTabRef('tren', el)"
        class="segmented-pill-btn group"
        :class="activeTab === 'tren' ? 'is-active' : 'is-inactive'"
        @click="setActiveTab('tren')"
      >
        <HugeiconsIcon :icon="AnalyticsUpIcon" :size="isMobile ? 15 : 17" :stroke-width="activeTab === 'tren' ? 2.2 : 1.8" class="mr-1.5 sm:mr-2 shrink-0 transition-colors" />
        <span class="truncate leading-normal pb-0.5">
          {{ isMobile ? t('progres_tab_tren_short') : t('progres_tab_tren') }}
        </span>
      </button>
    </div>

    <!-- 4. TAB 1: BUKU MUTASI KAS HARIAN -->
    <div v-if="activeTab === 'mutasi'" class="gsap-tab-content space-y-6 sm:space-y-8">

      <!-- Interactive Daily Ledger Table Card (Matched with Beranda's Rapor Keuangan Bulanan container concept) -->
      <div id="daily-ledger-table" class="card-tactile-gopay rounded-[18px] overflow-hidden font-poppins">
        <!-- Container Header Bar -->
        <!-- Container Header Bar -->
        <div class="p-5 sm:p-8 space-y-4 border-b border-[#E2E8F0] dark:border-neutral-800 bg-[#FFFFFF] dark:bg-[#13161F]">
          <div class="space-y-1.5">
            <h2 class="text-lg sm:text-xl font-poppins font-bold text-neutral-900 dark:text-white tracking-tight">
              Daftar Mutasi Transaksi Kas Harian
            </h2>
            <p class="text-xs sm:text-sm font-poppins text-neutral-600 dark:text-neutral-400 leading-normal">
              Setiap catatan transaksi uang masuk dan keluar tersinkronisasi dengan bukti nota kasir.
            </p>
          </div>

          <!-- Joined Search & Filter Control Bar (Disatukan / Gabung menjadi satu kontrol ringkas & presisi) -->
          <div class="relative w-full rounded-[10px] border border-[#CBD5E1] dark:border-neutral-700 bg-neutral-50/70 dark:bg-[#1A1A1A] focus-within:border-[#00800e] dark:focus-within:border-[#00C058] focus-within:ring-2 focus-within:ring-[#00800e]/20 transition-all flex items-center min-h-[46px]">
            <!-- Left: Search Icon + Input -->
            <div class="relative flex-1 flex items-center min-w-0">
              <HugeiconsIcon
                :icon="Search01Icon"
                :size="16"
                :stroke-width="1.8"
                class="ml-3.5 text-neutral-400 dark:text-neutral-500 shrink-0 pointer-events-none"
              />
              <input
                v-model="searchQuery"
                type="text"
                aria-label="Cari transaksi kasir, nota, atau bahan baku"
                placeholder="Cari transaksi kasir, nota, bahan baku..."
                class="w-full pl-2.5 pr-2 py-2.5 bg-transparent border-0 text-xs sm:text-sm text-[#18181b] dark:text-[#FDFDFD] placeholder:text-neutral-400 dark:placeholder:text-neutral-500 focus:outline-none focus:ring-0 font-poppins min-w-0"
              />
              <button
                v-if="searchQuery"
                type="button"
                aria-label="Hapus pencarian"
                class="p-1.5 mr-1 text-neutral-400 hover:text-neutral-700 dark:hover:text-white cursor-pointer shrink-0"
                title="Hapus pencarian"
                @click="searchQuery = ''"
              >
                <HugeiconsIcon :icon="Cancel01Icon" :size="15" :stroke-width="2" />
              </button>
            </div>

            <!-- Divider Line -->
            <div class="h-6 w-px bg-neutral-300 dark:bg-neutral-700 shrink-0" aria-hidden="true" />

            <!-- Right: Filter Button Trigger (Joined seamlessly) -->
            <div ref="categoryDropdownRef" class="relative shrink-0">
              <button
                type="button"
                class="h-full px-3 sm:px-4 py-2.5 text-xs sm:text-sm font-poppins font-medium text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200/50 dark:hover:bg-neutral-800 transition-colors flex items-center gap-1.5 cursor-pointer whitespace-nowrap min-h-[46px]"
                :aria-expanded="isCategoryDropdownOpen"
                title="Filter Kategori Kas"
                @click="isCategoryDropdownOpen = !isCategoryDropdownOpen"
              >
                <HugeiconsIcon :icon="FilterHorizontalIcon" :size="14" :stroke-width="2" class="text-neutral-500 dark:text-neutral-400 shrink-0" />
                <span class="hidden sm:inline truncate">{{ activeCategoryLabel }}</span>
                <span class="sm:hidden truncate text-xs">{{ activeCategoryShortLabel }}</span>
                <svg
                  class="w-3.5 h-3.5 text-neutral-500 dark:text-neutral-400 transition-transform duration-200 shrink-0"
                  :class="{ 'rotate-180': isCategoryDropdownOpen }"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2.0"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </button>

              <!-- Dropdown Menu Popover -->
              <div
                v-if="isCategoryDropdownOpen"
                class="absolute right-0 top-full mt-1.5 w-52 sm:w-56 rounded-[10px] bg-white dark:bg-[#18191E] border border-[#CBD5E1] dark:border-neutral-700 shadow-xl p-1.5 z-50 font-poppins text-sm animate-in fade-in zoom-in-95 duration-150"
              >
                <div class="space-y-0.5">
                  <button
                    v-for="opt in categoryFilterOptions"
                    :key="opt.id"
                    type="button"
                    :class="[
                      'w-full flex items-center justify-between px-3 py-2 rounded-[8px] text-sm font-poppins transition-all duration-150 text-left cursor-pointer',
                      activeCategoryFilter === opt.id
                        ? 'bg-[#E6F4F7] hover:bg-[#D9EEF3] dark:bg-[#156374]/20 dark:hover:bg-[#156374]/30 text-[#156374] dark:text-[#50AABF] font-semibold border border-[#156374]/20 dark:border-[#50AABF]/25 shadow-2xs'
                        : 'text-[#475569] dark:text-neutral-300 font-medium hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100/80 dark:hover:bg-neutral-800/60 border border-transparent'
                    ]"
                    @click="selectCategoryFilter(opt.id)"
                  >
                    <span>{{ opt.label }}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- A. Mobile Tactile Card List View (Substituted for wide table on mobile < sm) -->
        <div class="sm:hidden divide-y divide-neutral-100 dark:divide-neutral-800">
          <div
            v-for="tx in filteredDailyTransactions"
            :key="`mobile-${tx.id}`"
            class="p-4 bg-white dark:bg-[#13161F] space-y-2.5"
          >
            <!-- Row 1: Tanggal + Kategori Badge -->
            <div class="flex items-center justify-between">
              <span class="text-xs text-neutral-500 dark:text-neutral-400 font-poppins tabular-nums">
                {{ formatShortDate(tx.date) }}
              </span>
              <span
                :class="[
                  'inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold border font-poppins',
                  tx.category === 'PEMASUKAN'
                    ? 'bg-emerald-50 text-emerald-800 border-emerald-200 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800'
                    : tx.category === 'MODAL_JUALAN'
                      ? 'bg-cyan-50 text-cyan-800 border-cyan-200 dark:bg-cyan-950/60 dark:text-cyan-300 dark:border-cyan-800'
                      : 'bg-sky-50 text-sky-800 border-sky-200 dark:bg-sky-950/60 dark:text-sky-300 dark:border-sky-800'
                ]"
              >
                {{ tx.category === 'PEMASUKAN' ? 'Uang Masuk' : tx.category === 'MODAL_JUALAN' ? 'Modal Jualan' : 'Biaya Operasional' }}
              </span>
            </div>

            <!-- Row 2: Title & Receipt number -->
            <div>
              <p class="text-sm font-poppins font-semibold text-neutral-900 dark:text-white leading-snug">
                {{ tx.title }}
              </p>
              <span class="text-xs font-poppins text-neutral-400 block mt-0.5">
                {{ tx.receiptNumber || 'NOTA/KASIR/AUTO' }}
              </span>
            </div>

            <!-- Row 3: Nominal & Actions -->
            <div class="flex items-center justify-between pt-1 border-t border-neutral-100 dark:border-neutral-800/80">
              <div>
                <span
                  :class="[
                    'font-bold text-sm tabular-nums block',
                    tx.category === 'PEMASUKAN'
                      ? 'text-emerald-700 dark:text-emerald-400'
                      : 'text-neutral-900 dark:text-white'
                  ]"
                >
                  {{ tx.category === 'PEMASUKAN' ? '+ ' : '- ' }}Rp {{ tx.amount.toLocaleString('id-ID') }}
                </span>
                <span class="text-[11px] text-neutral-500 dark:text-neutral-400 flex items-center gap-1 mt-0.5">
                  <HugeiconsIcon :icon="CreditCardIcon" :size="13" />
                  <span>{{ tx.paymentMethod }}</span>
                </span>
              </div>

              <!-- Mobile Action Buttons -->
              <div class="flex items-center gap-1">
                <button
                  type="button"
                  aria-label="Lihat bukti nota transaksi"
                  class="p-2 rounded-lg text-neutral-600 hover:text-[#156374] dark:hover:text-[#50AABF] hover:bg-[#E6F4F7] dark:hover:bg-[#156374]/20 transition-all cursor-pointer min-w-[40px] min-h-[40px] flex items-center justify-center"
                  title="Lihat Bukti Nota Transaksi"
                  @click="openReceiptModal(tx)"
                >
                  <HugeiconsIcon :icon="ViewIcon" :size="18" />
                </button>
                <button
                  type="button"
                  aria-label="Hapus catatan mutasi kas"
                  class="p-2 rounded-lg text-neutral-600 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-all cursor-pointer min-w-[40px] min-h-[40px] flex items-center justify-center"
                  title="Hapus Catatan Ini"
                  @click="handleDeleteTx(tx.id)"
                >
                  <HugeiconsIcon :icon="Delete02Icon" :size="18" />
                </button>
              </div>
            </div>
          </div>

          <!-- Empty State Mobile -->
          <div v-if="filteredDailyTransactions.length === 0" class="py-10 px-4 text-center text-neutral-500 dark:text-neutral-400">
            <HugeiconsIcon :icon="Coins01Icon" :size="28" class="mx-auto mb-2 text-neutral-300 dark:text-neutral-600" />
            <p class="font-poppins text-xs">Tidak ada transaksi yang cocok.</p>
            <button
              type="button"
              class="mt-2 text-xs font-semibold text-[#156374] dark:text-[#50AABF]"
              @click="activeCategoryFilter = 'ALL'; searchQuery = ''"
            >
              Reset Filter & Pencarian
            </button>
          </div>
        </div>

        <!-- B. Desktop Table (Hidden on mobile < sm, visible sm+) -->
        <div class="hidden sm:block overflow-x-auto w-full">
          <table class="w-full text-left text-sm font-poppins">
            <thead>
              <tr class="bg-[#FFFFFF] dark:bg-[#13161F] border-b border-[#E2E8F0] dark:border-neutral-800 text-neutral-800 dark:text-neutral-200 font-poppins text-xs sm:text-sm font-bold uppercase tracking-wider">
                <th class="py-4 sm:py-5 px-6 text-left font-bold w-28">Tanggal</th>
                <th class="py-4 sm:py-5 px-5 text-left font-bold w-40">Kategori</th>
                <th class="py-4 sm:py-5 px-5 text-left font-bold">Keterangan Transaksi</th>
                <th class="py-4 sm:py-5 px-5 text-left font-bold text-neutral-900 dark:text-white w-52">Nominal Kas</th>
                <th class="py-4 sm:py-5 px-6 text-right font-bold w-28">Tindakan</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-neutral-100 dark:divide-neutral-800/80 text-neutral-800 dark:text-neutral-200">
              <tr
                v-for="tx in filteredDailyTransactions"
                :key="tx.id"
                class="bg-white dark:bg-[#13161F] hover:bg-neutral-50/80 dark:hover:bg-neutral-800/50 transition-colors"
              >
                <!-- 1. Tanggal -->
                <td class="py-4 sm:py-5 px-6 text-left font-poppins whitespace-nowrap">
                  <span class="text-sm font-normal font-poppins text-neutral-900 dark:text-white tabular-nums">
                    {{ formatShortDate(tx.date) }}
                  </span>
                </td>

                <!-- 2. Kategori -->
                <td class="py-4 sm:py-5 px-5 text-left font-poppins whitespace-nowrap">
                  <span
                    :class="[
                      'inline-flex items-center px-2.5 py-1 rounded-[8px] text-xs font-semibold border font-poppins',
                      tx.category === 'PEMASUKAN'
                        ? 'bg-emerald-50 text-emerald-800 border-emerald-200 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800'
                        : tx.category === 'MODAL_JUALAN'
                          ? 'bg-cyan-50 text-cyan-800 border-cyan-200 dark:bg-cyan-950/60 dark:text-cyan-300 dark:border-cyan-800'
                          : 'bg-sky-50 text-sky-800 border-sky-200 dark:bg-sky-950/60 dark:text-sky-300 dark:border-sky-800'
                    ]"
                  >
                    {{ tx.category === 'PEMASUKAN' ? 'Uang Masuk' : tx.category === 'MODAL_JUALAN' ? 'Modal Jualan' : 'Biaya Operasional' }}
                  </span>
                </td>

                <!-- 3. Keterangan Transaksi -->
                <td class="py-4 sm:py-5 px-5 text-left font-poppins min-w-[200px]">
                  <p class="text-sm font-medium font-poppins text-neutral-900 dark:text-white truncate max-w-sm" :title="tx.title">
                    {{ tx.title }}
                  </p>
                  <span class="text-xs font-poppins font-medium text-neutral-600 dark:text-neutral-400 block truncate mt-0.5">
                    {{ tx.receiptNumber || 'NOTA/KASIR/AUTO' }}
                  </span>
                </td>

                <!-- 4. Nominal Kas -->
                <td class="py-4 sm:py-5 px-5 text-left font-poppins whitespace-nowrap">
                  <div class="flex flex-col items-start">
                    <span
                      :class="[
                        'font-semibold text-sm tabular-nums',
                        tx.category === 'PEMASUKAN'
                          ? 'text-emerald-800 dark:text-emerald-400'
                          : 'text-neutral-900 dark:text-white'
                      ]"
                    >
                      {{ tx.category === 'PEMASUKAN' ? '+ ' : '- ' }}Rp {{ tx.amount.toLocaleString('id-ID') }}
                    </span>
                    <span class="text-xs font-medium text-neutral-600 dark:text-neutral-400 font-poppins flex items-center gap-1.5 mt-0.5">
                      <HugeiconsIcon :icon="CreditCardIcon" :size="16" class="opacity-75 shrink-0" />
                      <span>{{ tx.paymentMethod }}</span>
                    </span>
                  </div>
                </td>

                <!-- 5. Tindakan -->
                <td class="py-4 sm:py-5 px-6 text-right font-poppins whitespace-nowrap">
                  <div class="flex items-center justify-end gap-3">
                    <button
                      type="button"
                      aria-label="Lihat bukti nota transaksi"
                      class="inline-flex items-center justify-center w-11 h-11 min-w-[44px] min-h-[44px] rounded-[8px] text-neutral-600 hover:text-[#156374] dark:hover:text-[#50AABF] hover:bg-[#E6F4F7] dark:hover:bg-[#156374]/20 transition-all cursor-pointer"
                      title="Lihat Bukti Nota Transaksi"
                      @click="openReceiptModal(tx)"
                    >
                      <HugeiconsIcon :icon="ViewIcon" :size="20" :stroke-width="2.0" />
                    </button>
                    <button
                      type="button"
                      aria-label="Hapus catatan mutasi kas"
                      class="inline-flex items-center justify-center w-11 h-11 min-w-[44px] min-h-[44px] rounded-[8px] text-neutral-600 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-all cursor-pointer"
                      title="Hapus Catatan Ini"
                      @click="handleDeleteTx(tx.id)"
                    >
                      <HugeiconsIcon :icon="Delete02Icon" :size="20" :stroke-width="2.0" />
                    </button>
                  </div>
                </td>
              </tr>

              <!-- Empty State -->
              <tr v-if="filteredDailyTransactions.length === 0">
                <td colspan="5" class="py-12 text-center text-neutral-500 dark:text-neutral-400">
                  <HugeiconsIcon :icon="Coins01Icon" :size="32" class="mx-auto mb-2 text-neutral-300 dark:text-neutral-600" />
                  <p class="font-poppins font-normal text-xs sm:text-sm">Tidak ada transaksi yang cocok dengan filter atau kata kunci.</p>
                  <button
                    type="button"
                    class="mt-2 text-xs font-semibold text-[#156374] dark:text-[#50AABF] hover:underline cursor-pointer"
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

    <!-- 5. TAB 2: REKAP KAS BULANAN TOKO -->
    <div v-else-if="activeTab === 'bulanan'" class="gsap-tab-content space-y-6 sm:space-y-8">
      <div class="card-tactile-gopay rounded-[18px] p-6 sm:p-8 space-y-6 font-poppins">
        <!-- Header Bar: Title on Left, Unduh Rekap CTA on Right (Sejajar) -->
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-neutral-100 dark:border-neutral-800/80">
          <div class="min-w-0 pr-2 space-y-1.5 flex-1">
            <h2 class="text-xl font-poppins font-bold text-neutral-900 dark:text-white tracking-tight">
              Rekap Kas Bulanan Toko
            </h2>
            <p class="text-sm font-poppins text-neutral-600 dark:text-neutral-400 leading-normal w-full">
              Histori seluruh catatan keuangan toko dari bulan ke bulan untuk memantau pendapatan, modal jualan, dan beban operasional secara berkala.
            </p>
          </div>

          <!-- Unduh Rekap Button (Green CTA, stacked full-width on mobile) -->
          <div class="flex items-center gap-2.5 shrink-0 w-full sm:w-auto [&>*]:w-full sm:[&>*]:w-auto">
            <BActionButton
              variant="green"
              icon="download"
              custom-class="w-full sm:w-auto justify-center text-center"
              title="Unduh Rekap Kas Bulanan"
              @click="handleExportPdf"
            >
              Unduh Rekap
            </BActionButton>
          </div>
        </div>

        <!-- Monthly Full Ledger Table (Desktop view: hidden on < sm) -->
        <div class="overflow-x-auto w-full hidden sm:block">
          <table class="w-full text-left text-sm font-poppins">
            <thead>
              <tr class="bg-[#FFFFFF] dark:bg-[#13161F] border-b border-[#E2E8F0] dark:border-neutral-800 text-neutral-800 dark:text-neutral-200 font-poppins text-xs sm:text-sm font-bold uppercase tracking-wider">
                <th class="py-4 sm:py-5 px-6 text-left font-bold">Periode Bulan</th>
                <th class="py-4 sm:py-5 px-5 text-left font-bold">Total Pendapatan</th>
                <th class="py-4 sm:py-5 px-5 text-left font-bold">Modal Jualan</th>
                <th class="py-4 sm:py-5 px-5 text-left font-bold">Biaya Operasional</th>
                <th class="py-4 sm:py-5 px-5 text-left font-bold text-neutral-800 dark:text-neutral-200">Rugi</th>
                <th class="py-4 sm:py-5 px-5 text-left font-bold text-neutral-900 dark:text-white">Untung Bersih</th>
                <th class="py-4 sm:py-5 px-6 text-left font-bold">Saldo Kas Akhir</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-neutral-100 dark:divide-neutral-800/80 text-neutral-800 dark:text-neutral-200 font-poppins">
              <tr
                v-for="rec in umkmStore.monthlyRecords"
                :key="`${rec.month}-${rec.year}`"
                class="bg-white dark:bg-[#13161F] hover:bg-neutral-50/80 dark:hover:bg-neutral-800/50 transition-colors"
              >
                <td class="py-4 sm:py-5 px-6 text-left font-poppins font-normal text-sm text-neutral-900 dark:text-white">
                  {{ rec.month }} {{ rec.year }}
                </td>
                <td class="py-4 sm:py-5 px-5 text-left font-poppins tabular-nums font-normal text-neutral-900 dark:text-white text-sm">
                  Rp {{ rec.omzet.toLocaleString('id-ID') }}
                </td>
                <td class="py-4 sm:py-5 px-5 text-left font-poppins tabular-nums font-normal text-neutral-600 dark:text-neutral-300 text-sm">
                  Rp {{ rec.hpp.toLocaleString('id-ID') }}
                </td>
                <td class="py-4 sm:py-5 px-5 text-left font-poppins tabular-nums font-normal text-neutral-600 dark:text-neutral-300 text-sm">
                  Rp {{ rec.opex.toLocaleString('id-ID') }}
                </td>
                <td class="py-4 sm:py-5 px-5 text-left font-poppins tabular-nums font-normal text-rose-600 dark:text-rose-400 text-sm">
                  Rp {{ ((rec as any).loss || 0).toLocaleString('id-ID') }}
                </td>
                <td class="py-4 sm:py-5 px-5 text-left font-poppins tabular-nums font-semibold text-emerald-800 dark:text-emerald-400 text-sm">
                  Rp {{ rec.netProfit.toLocaleString('id-ID') }}
                </td>
                <td class="py-4 sm:py-5 px-6 text-left font-poppins tabular-nums font-medium text-[#156374] dark:text-[#50AABF] text-sm">
                  Rp {{ rec.cashBalance.toLocaleString('id-ID') }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Monthly Full Ledger: Mobile Responsive Tactile Card List View (< sm) -->
        <div class="sm:hidden divide-y divide-neutral-100 dark:divide-neutral-800">
          <div
            v-for="rec in umkmStore.monthlyRecords"
            :key="`mobile-monthly-${rec.month}-${rec.year}`"
            class="p-4 space-y-3 bg-white dark:bg-[#13161F]"
          >
            <!-- Top: Periode Bulan & Untung Bersih Pill -->
            <div class="flex items-center justify-between gap-2">
              <span class="font-poppins font-bold text-sm text-neutral-900 dark:text-white">
                {{ rec.month }} {{ rec.year }}
              </span>
              <span class="text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 dark:bg-emerald-950/70 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800 tabular-nums">
                + Rp {{ rec.netProfit.toLocaleString('id-ID') }}
              </span>
            </div>

            <!-- Financial Metrics Grid -->
            <div class="grid grid-cols-3 gap-2 pt-1 text-center bg-neutral-50/80 dark:bg-neutral-800/40 p-2.5 rounded-xl border border-neutral-100 dark:border-neutral-800/80">
              <div>
                <span class="text-[10px] text-neutral-500 dark:text-neutral-400 block font-medium">Pendapatan</span>
                <span class="text-xs font-semibold text-neutral-900 dark:text-white tabular-nums block mt-0.5">
                  Rp {{ (rec.omzet / 1000000).toFixed(1) }} Jt
                </span>
              </div>
              <div class="border-x border-neutral-200 dark:border-neutral-700/60">
                <span class="text-[10px] text-neutral-500 dark:text-neutral-400 block font-medium">Modal Jualan</span>
                <span class="text-xs font-semibold text-neutral-700 dark:text-neutral-300 tabular-nums block mt-0.5">
                  Rp {{ (rec.hpp / 1000000).toFixed(1) }} Jt
                </span>
              </div>
              <div>
                <span class="text-[10px] text-neutral-500 dark:text-neutral-400 block font-medium">Saldo Kas</span>
                <span class="text-xs font-semibold text-[#156374] dark:text-[#50AABF] tabular-nums block mt-0.5">
                  Rp {{ (rec.cashBalance / 1000000).toFixed(1) }} Jt
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 6. TAB 3: GRAFIK PERGERAKAN UANG -->
    <div v-else-if="activeTab === 'tren'" class="gsap-tab-content space-y-6 sm:space-y-8">
      <!-- 1. Hero Line Chart: Pergerakan Uang Toko (Sesuai Desain Halaman Beranda) -->
      <div class="gsap-hero-chart card-tactile-gopay rounded-[18px] p-6 sm:p-8 space-y-9 sm:space-y-11">
        <!-- Header: Title, Subtitle, and Right Actions (Dropdown Chart Type, Dropdown Period) -->
        <div class="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-2 sm:pb-3">
          <!-- Left: Title & Subtitle -->
          <div class="min-w-0 max-w-xl">
            <div class="gsap-hero-header-title">
              <h2 class="text-xl font-poppins font-bold text-neutral-900 dark:text-white tracking-tight">
                Pergerakan Uang Toko
              </h2>
              <p class="text-xs sm:text-[14px] font-poppins text-neutral-500 dark:text-neutral-400 mt-2 sm:mt-2.5 leading-normal">
                Grafik pemantauan akumulasi saldo kas riil tokomu dari waktu ke waktu yang selalu tersinkronisasi.
              </p>
            </div>
          </div>

          <!-- Right: Actions Control (Dropdown Jenis Grafik + Dropdown Periode) -->
          <div class="flex items-center gap-2.5 sm:gap-3 flex-wrap lg:flex-nowrap shrink-0">
            <!-- 1. Dropdown Jenis Grafik (Menggantikan Pill Tab View, Bergaya btn-pill-action) -->
            <div ref="chartTypeDropdownRef" class="relative">
              <button
                type="button"
                :class="[
                  'btn-pill-action group cursor-pointer',
                  isChartTypeDropdownOpen ? 'bg-[#E6F4F7]! text-[#156374]! border-[#156374]/30! shadow-2xs' : ''
                ]"
                aria-haspopup="true"
                :aria-expanded="isChartTypeDropdownOpen"
                title="Pilih Jenis Tampilan Grafik"
                @click="toggleChartTypeDropdown"
              >
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

              <!-- Popover Dropdown Panel -->
              <div
                v-if="isChartTypeDropdownOpen"
                class="absolute right-0 top-full mt-1.5 w-44 rounded-[8px] bg-[#FFFFFF] dark:bg-[#18191E] border border-[#CBD5E1] dark:border-neutral-700 p-1.5 shadow-lg z-50 font-poppins text-sm animate-in fade-in zoom-in-95 duration-100"
              >
                <button
                  v-for="opt in chartTypeOptions"
                  :key="opt.id"
                  type="button"
                  :class="[
                    'w-full flex items-center justify-between px-3 py-2 rounded-[8px] text-sm font-poppins transition-all duration-150 text-left cursor-pointer',
                    chartPreviewMode === opt.id
                      ? 'bg-[#E6F4F7] hover:bg-[#D9EEF3] dark:bg-[#156374]/20 dark:hover:bg-[#156374]/30 text-[#156374] dark:text-[#50AABF] font-semibold border border-[#156374]/20 dark:border-[#50AABF]/25 shadow-2xs'
                      : 'text-[#64748B] dark:text-neutral-400 font-medium hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100/80 dark:hover:bg-neutral-800/60 border border-transparent'
                  ]"
                  @click="selectChartType(opt.id)"
                >
                  <span class="truncate">{{ opt.label }}</span>
                </button>
              </div>
            </div>

            <!-- 2. Dropdown Filter Periode (Bergaya btn-pill-action) -->
            <div ref="periodDropdownRef" class="relative">
              <button
                type="button"
                :class="[
                  'btn-pill-action group cursor-pointer',
                  isPeriodDropdownOpen ? 'bg-[#E6F4F7]! text-[#156374]! border-[#156374]/30! shadow-2xs' : ''
                ]"
                aria-haspopup="true"
                :aria-expanded="isPeriodDropdownOpen"
                title="Pilih Rentang Waktu"
                @click="togglePeriodDropdown"
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

              <!-- Popover Dropdown Panel -->
              <div
                v-if="isPeriodDropdownOpen"
                class="absolute right-0 top-full mt-1.5 w-44 rounded-[8px] bg-[#FFFFFF] dark:bg-[#18191E] border border-[#CBD5E1] dark:border-neutral-700 p-1.5 shadow-lg z-50 font-poppins text-sm animate-in fade-in zoom-in-95 duration-100"
              >
                <button
                  v-for="opt in heroFilterOptions"
                  :key="opt.id"
                  type="button"
                  :class="[
                    'w-full flex items-center justify-between px-3 py-2 rounded-[8px] text-sm font-poppins transition-all duration-150 text-left cursor-pointer',
                    selectedPeriod === opt.id
                      ? 'bg-[#E6F4F7] hover:bg-[#D9EEF3] dark:bg-[#156374]/20 dark:hover:bg-[#156374]/30 text-[#156374] dark:text-[#50AABF] font-semibold border border-[#156374]/20 dark:border-[#50AABF]/25 shadow-2xs'
                      : 'text-[#64748B] dark:text-neutral-400 font-medium hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100/80 dark:hover:bg-neutral-800/60 border border-transparent'
                  ]"
                  @click="selectPeriodFilter(opt.id)"
                >
                  <span>{{ opt.label }}</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Shadcn UI Line Chart - Linear / Bar / Area / Cashflow: Pergerakan Uang Toko -->
        <div class="gsap-hero-chart-body relative w-full h-64 sm:h-72 pt-6 sm:pt-8">
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

      <!-- 2. Bento Row: Komposisi Aliran Kas (Sesuai Desain Halaman Beranda) -->
      <div class="card-tactile-gopay rounded-[18px] p-6 sm:p-8 flex flex-col justify-between space-y-6 font-poppins">
        <!-- Header -->
        <div class="flex items-center justify-between pb-3 border-b border-neutral-100 dark:border-neutral-800/80 gap-5">
          <div class="min-w-0 pr-2 space-y-1.5">
            <h2 class="text-xl font-poppins font-bold text-neutral-900 dark:text-white tracking-tight">
              Komposisi Pengeluaran & Pendapatan Toko
            </h2>
            <p class="text-xs sm:text-sm font-poppins text-neutral-500 dark:text-neutral-400 leading-normal max-w-sm sm:max-w-md">
              Rincian proporsi perputaran uang: alokasi modal jualan, beban operasional, serta saldo untung bersih tokomu.
            </p>
          </div>
        </div>

        <!-- Body: 2-Column Layout (Donut on Left with Total below it, Clean List on Right) -->
        <div class="flex-1 grid grid-cols-1 sm:grid-cols-12 gap-6 sm:gap-8 items-center pb-1">
          <!-- Bagian 1 (Kiri): Donut Chart & Informasi Total Kas di Bawah Kiri -->
          <div class="sm:col-span-5 flex flex-col justify-between items-center sm:items-start h-full min-h-[280px]">
            <!-- Donut Chart Ring (Ukuran lebih besar, gagah, dan nyaman dilihat) -->
            <div class="relative w-52 h-52 sm:w-60 sm:h-60 my-auto mx-auto flex items-center justify-center">
              <canvas ref="donutCanvas" class="w-full h-full"></canvas>
            </div>

            <!-- Informasi Total Kas di Bagian Bawah Kiri -->
            <div class="pt-3 w-full text-center sm:text-left">
              <div class="text-xl sm:text-2xl font-poppins font-bold text-neutral-900 dark:text-white tabular-nums tracking-tight">
                Rp {{ calculatedPeriodOmzet.toLocaleString('id-ID') }}
              </div>
              <div class="text-xs sm:text-[13px] font-poppins font-medium text-neutral-500 dark:text-neutral-400 mt-1">
                Total Pendapatan ({{ selectedPeriodLabel }})
              </div>

              <!-- Quick Summary Metrics Pill -->
              <div class="mt-3 flex items-center justify-center sm:justify-start gap-2 flex-wrap">
                <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-[8px] text-xs font-medium bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300">
                  <span class="w-2 h-2 rounded-full bg-[#156374]"></span>
                  Beban: <strong class="tabular-nums">Rp {{ (calculatedPeriodHpp + calculatedPeriodOpex).toLocaleString('id-ID') }}</strong>
                </span>
                <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-[8px] text-xs font-semibold bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-200/80 dark:border-emerald-800/60">
                  <span class="w-2 h-2 rounded-full bg-[#00AA13]"></span>
                  Untung: <strong class="tabular-nums">{{ calculatedProfitPercent }}%</strong>
                </span>
              </div>
            </div>
          </div>

          <!-- Bagian 2 (Kanan): 3 Cards Informasi dengan Progress Bar Halus -->
          <div class="sm:col-span-7 space-y-3 flex-1 flex flex-col justify-center">
            <div
              v-for="(item, idx) in progresBreakdownItems"
              :key="item.label"
              role="button"
              tabindex="0"
              :aria-label="`${item.label}: Rp ${item.amount.toLocaleString('id-ID')} (${item.percent}%)`"
              class="card-btn-hover p-4 rounded-[12px] flex flex-col gap-2.5 group cursor-pointer transition-all"
              @mouseenter="activeHoveredItem = item; highlightDonutSegment(idx)"
              @mouseleave="activeHoveredItem = null; highlightDonutSegment(null)"
              @focus="activeHoveredItem = item; highlightDonutSegment(idx)"
              @blur="activeHoveredItem = null; highlightDonutSegment(null)"
              @keydown.enter="activeHoveredItem = item; highlightDonutSegment(idx)"
              @keydown.space.prevent="activeHoveredItem = item; highlightDonutSegment(idx)"
            >
              <!-- Top Row: Icon/Dot + Title + Subtitle on Left, Nominal + Percent on Right -->
              <div class="flex items-center justify-between gap-3 w-full">
                <div class="flex items-center gap-3 min-w-0">
                  <span
                    class="w-3 h-3 rounded-full shrink-0 transition-transform duration-200 group-hover:scale-125 shadow-2xs"
                    :style="{ backgroundColor: item.color }"
                  />
                  <div class="min-w-0 flex flex-col items-start">
                    <span class="font-poppins font-semibold text-sm sm:text-base text-neutral-900 dark:text-white leading-tight">
                      {{ item.label }}
                    </span>
                    <span class="text-xs font-poppins text-neutral-500 dark:text-neutral-400 mt-0.5 line-clamp-1">
                      {{ item.desc }}
                    </span>
                  </div>
                </div>

                <div class="flex flex-col items-end shrink-0">
                  <span class="font-poppins font-semibold text-sm sm:text-base text-neutral-900 dark:text-white tabular-nums">
                    Rp {{ item.amount.toLocaleString('id-ID') }}
                  </span>
                  <span
                    class="text-xs font-semibold px-2 py-0.5 rounded-full mt-0.5 tabular-nums"
                    :class="item.badgeClass"
                  >
                    {{ item.percent }}%
                  </span>
                </div>
              </div>

              <!-- Bottom Row: Sleek Progress Bar -->
              <div class="w-full h-1.5 rounded-full bg-neutral-200/70 dark:bg-neutral-800 overflow-hidden">
                <div
                  class="h-full rounded-full transition-all duration-500 ease-out"
                  :style="{ width: `${item.percent}%`, backgroundColor: item.color }"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 3. Tabel Rekapitulasi Arus Kas Bulanan (Sesuai Desain Halaman Beranda) -->
      <div class="card-tactile-gopay rounded-[18px] p-6 sm:p-8 space-y-6 font-poppins">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-neutral-100 dark:border-neutral-800/80">
          <div class="min-w-0 pr-2 space-y-1.5">
            <h2 class="text-xl font-poppins font-bold text-neutral-900 dark:text-white tracking-tight">
              Tabel Rekapitulasi Pergerakan Uang Bulanan
            </h2>
            <p class="text-xs sm:text-sm font-poppins text-neutral-500 dark:text-neutral-400 leading-normal max-w-sm sm:max-w-md">
              Rincian pembagian pendapatan, biaya, serta saldo kas tokomu sesuai periode yang dipilih.
            </p>
          </div>

          <!-- Ekspor Button (Stacked full-width on mobile) -->
          <div class="flex items-center gap-2.5 shrink-0 w-full sm:w-auto [&>*]:w-full sm:[&>*]:w-auto">
            <BActionButton
              variant="green"
              icon="download"
              custom-class="w-full sm:w-auto justify-center text-center"
              title="Unduh Tabel Rekapitulasi"
              @click="handleExportPdf"
            >
              Unduh Tabel
            </BActionButton>
          </div>
        </div>

        <!-- Monthly Breakdown Table (Desktop view: hidden on < sm) -->
        <div class="overflow-x-auto w-full hidden sm:block">
          <table class="w-full text-left text-sm font-poppins">
            <thead>
              <tr class="bg-[#FFFFFF] dark:bg-[#13161F] border-b border-[#E2E8F0] dark:border-neutral-800 text-neutral-800 dark:text-neutral-200 font-poppins text-xs sm:text-sm font-bold uppercase tracking-wider">
                <th class="py-4 sm:py-5 px-6 text-left font-bold">Periode Bulan</th>
                <th class="py-4 sm:py-5 px-5 text-left font-bold">Total Pendapatan</th>
                <th class="py-4 sm:py-5 px-5 text-left font-bold">Modal Jualan</th>
                <th class="py-4 sm:py-5 px-5 text-left font-bold">Biaya Operasional</th>
                <th class="py-4 sm:py-5 px-5 text-left font-bold text-neutral-800 dark:text-neutral-200">Rugi</th>
                <th class="py-4 sm:py-5 px-5 text-left font-bold text-neutral-900 dark:text-white">Untung Bersih</th>
                <th class="py-4 sm:py-5 px-6 text-left font-bold">Saldo Kas Akhir</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-neutral-100 dark:divide-neutral-800/80 text-neutral-800 dark:text-neutral-200 font-poppins">
              <tr
                v-for="rec in sortedFilteredRecords"
                :key="`${rec.month}-${rec.year}`"
                class="bg-white dark:bg-[#13161F] hover:bg-neutral-50/80 dark:hover:bg-neutral-800/50 transition-colors"
              >
                <td class="py-4 sm:py-5 px-6 text-left font-poppins font-normal text-sm text-neutral-900 dark:text-white">
                  {{ rec.month }} {{ rec.year }}
                </td>
                <td class="py-4 sm:py-5 px-5 text-left font-poppins tabular-nums font-normal text-neutral-900 dark:text-white text-sm">
                  Rp {{ rec.omzet.toLocaleString('id-ID') }}
                </td>
                <td class="py-4 sm:py-5 px-5 text-left font-poppins tabular-nums font-normal text-neutral-600 dark:text-neutral-300 text-sm">
                  Rp {{ rec.hpp.toLocaleString('id-ID') }}
                </td>
                <td class="py-4 sm:py-5 px-5 text-left font-poppins tabular-nums font-normal text-neutral-600 dark:text-neutral-300 text-sm">
                  Rp {{ rec.opex.toLocaleString('id-ID') }}
                </td>
                <td class="py-4 sm:py-5 px-5 text-left font-poppins tabular-nums font-normal text-rose-600 dark:text-rose-400 text-sm">
                  Rp {{ ((rec as any).loss || 0).toLocaleString('id-ID') }}
                </td>
                <td class="py-4 sm:py-5 px-5 text-left font-poppins tabular-nums font-semibold text-emerald-800 dark:text-emerald-400 text-sm">
                  Rp {{ rec.netProfit.toLocaleString('id-ID') }}
                </td>
                <td class="py-4 sm:py-5 px-6 text-left font-poppins tabular-nums font-medium text-[#156374] dark:text-[#50AABF] text-sm">
                  Rp {{ rec.cashBalance.toLocaleString('id-ID') }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Monthly Breakdown: Mobile Responsive Tactile Card List View (< sm) -->
        <div class="sm:hidden divide-y divide-neutral-100 dark:divide-neutral-800">
          <div
            v-for="rec in sortedFilteredRecords"
            :key="`mobile-breakdown-${rec.month}-${rec.year}`"
            class="p-4 space-y-3 bg-white dark:bg-[#13161F]"
          >
            <!-- Top: Periode Bulan & Untung Bersih Pill -->
            <div class="flex items-center justify-between gap-2">
              <span class="font-poppins font-bold text-sm text-neutral-900 dark:text-white">
                {{ rec.month }} {{ rec.year }}
              </span>
              <span class="text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 dark:bg-emerald-950/70 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800 tabular-nums">
                + Rp {{ rec.netProfit.toLocaleString('id-ID') }}
              </span>
            </div>

            <!-- Financial Metrics Grid -->
            <div class="grid grid-cols-3 gap-2 pt-1 text-center bg-neutral-50/80 dark:bg-neutral-800/40 p-2.5 rounded-xl border border-neutral-100 dark:border-neutral-800/80">
              <div>
                <span class="text-[10px] text-neutral-500 dark:text-neutral-400 block font-medium">Pendapatan</span>
                <span class="text-xs font-semibold text-neutral-900 dark:text-white tabular-nums block mt-0.5">
                  Rp {{ (rec.omzet / 1000000).toFixed(1) }} Jt
                </span>
              </div>
              <div class="border-x border-neutral-200 dark:border-neutral-700/60">
                <span class="text-[10px] text-neutral-500 dark:text-neutral-400 block font-medium">Modal Jualan</span>
                <span class="text-xs font-semibold text-neutral-700 dark:text-neutral-300 tabular-nums block mt-0.5">
                  Rp {{ (rec.hpp / 1000000).toFixed(1) }} Jt
                </span>
              </div>
              <div>
                <span class="text-[10px] text-neutral-500 dark:text-neutral-400 block font-medium">Saldo Kas</span>
                <span class="text-xs font-semibold text-[#156374] dark:text-[#50AABF] tabular-nums block mt-0.5">
                  Rp {{ (rec.cashBalance / 1000000).toFixed(1) }} Jt
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>



    <!-- 8. Slide-Over Sidebar Panel: Catat Kas Toko Baru -->
    <BCashEntryDrawer v-model="isCashDrawerOpen" />

    <!-- 8. Modal Lihat Bukti Nota Transaksi -->
    <BModal
      v-model="isReceiptModalOpen"
      title="Rincian Bukti Transaksi"
      subtitle="Dokumen resmi pencatatan kas toko yang telah divalidasi"
      size="md"
    >
      <div v-if="selectedTx" class="space-y-4 pt-1 font-poppins">
        <div class="p-5 rounded-2xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 space-y-3">
          <div class="flex items-center justify-between border-b border-neutral-200 dark:border-neutral-800 pb-3">
            <div>
              <span class="text-xs text-neutral-500 font-medium">Nomor Nota Rekonsiliasi</span>
              <p class="font-poppins font-bold text-sm text-neutral-900 dark:text-white">
                {{ selectedTx.receiptNumber || 'NOTA/KASIR/AUTO' }}
              </p>
            </div>
            <span class="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-400 border border-emerald-200">
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
              <span class="font-semibold text-cyan-800 dark:text-cyan-400">
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
            <span class="font-bold text-lg text-emerald-800 dark:text-emerald-400 tabular-nums">
              Rp {{ selectedTx.amount.toLocaleString('id-ID') }}
            </span>
          </div>
        </div>

        <div class="p-3.5 rounded-xl bg-blue-50/70 dark:bg-blue-950/30 border border-blue-200/70 dark:border-blue-900/40 text-xs text-neutral-600 dark:text-neutral-300 leading-relaxed">
          <p class="font-semibold text-cyan-800 dark:text-cyan-400 mb-0.5">Catatan Konsultan Pendamping:</p>
          <p>Dokumen bukti transaksi ini telah dicocokkan dengan mutasi rekening toko dan dinyatakan tervalidasi untuk rekam jejak pemodal.</p>
        </div>
      </div>
    </BModal>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, nextTick, onBeforeUnmount, watch } from 'vue'
import { useUmkmStore, type DailyTransaction } from '~/stores/umkm'
import { useLanguage } from '~/composables/useLanguage'
import gsap from 'gsap'
import Chart from 'chart.js/auto'
import { HugeiconsIcon } from '@hugeicons/vue'
import {
  Home03Icon,
  Coins01Icon,
  MoneyBag01Icon,
  Download01Icon,
  Search01Icon,
  Cancel01Icon,
  CheckmarkCircle01Icon,
  CreditCardIcon,
  Delete02Icon,
  ViewIcon,
  AnalyticsUpIcon,
  FilterHorizontalIcon,
  ArrowDownLeft01Icon,
  ShoppingBag01Icon,
  Building01Icon,
  Calendar01Icon,
  QrCodeIcon,
  Note01Icon
} from '@hugeicons/core-free-icons'

// Base components
import BActionButton from '~/components/base/BActionButton.vue'
import BDrawer from '~/components/base/BDrawer.vue'
import BModal from '~/components/base/BModal.vue'
import BShadcnLineChart from '~/components/base/BShadcnLineChart.vue'
import BCashEntryDrawer from '~/components/base/BCashEntryDrawer.vue'

definePageMeta({
  layout: 'dashboard',
  hideHeader: true
})

const umkmStore = useUmkmStore()
const { t } = useLanguage()

// Mobile viewport check for responsive tab strings
const isMobile = ref(false)
function checkMobile() {
  if (typeof window !== 'undefined') {
    isMobile.value = window.innerWidth < 640
  }
}

watch(isMobile, () => {
  nextTick(() => {
    updateTabIndicator(true)
  })
})

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
      duration: 0.28,
      ease: 'power2.out',
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

// Month Selector State & Controls
const selectedMonthId = ref<string>('current')
const isMonthDropdownOpen = ref(false)
const monthDropdownRef = ref<HTMLElement | null>(null)

const monthOptions = computed(() => {
  const records = umkmStore.monthlyRecords || []
  if (!records.length) {
    return [{ id: 'current', label: 'Sekarang', isCurrent: true, month: 'Oktober', year: 2026 }]
  }

  // Reverse chronological list: Oktober 2026 (Sekarang), September 2026, ...
  return [...records].reverse().map((r, idx) => {
    const isCurrent = idx === 0
    return {
      id: isCurrent ? 'current' : `${r.month}-${r.year}`,
      label: isCurrent ? 'Sekarang' : `${r.month} ${r.year}`,
      month: r.month,
      year: r.year,
      isCurrent,
      record: r
    }
  })
})

const selectedMonthButtonLabel = computed(() => {
  const selected = monthOptions.value.find(m => m.id === selectedMonthId.value)
  return selected ? selected.label : 'Sekarang'
})

function selectMonth(id: string) {
  selectedMonthId.value = id
  isMonthDropdownOpen.value = false
}

const selectedMonthRecord = computed(() => {
  const current = latestMonthRecord.value
  if (selectedMonthId.value === 'current') {
    return current
  }
  const found = (umkmStore.monthlyRecords || []).find(r => `${r.month}-${r.year}` === selectedMonthId.value)
  return found || current
})

const displayedCashBalance = computed(() => {
  return selectedMonthRecord.value.cashBalance || 75500000
})

const displayedIncome = computed(() => {
  if (selectedMonthId.value === 'current') {
    return totalIncome.value
  }
  return selectedMonthRecord.value.omzet || 0
})

const displayedHpp = computed(() => {
  if (selectedMonthId.value === 'current') {
    return totalHppExpense.value
  }
  return selectedMonthRecord.value.hpp || 0
})

const displayedOpex = computed(() => {
  if (selectedMonthId.value === 'current') {
    return totalOpexExpense.value
  }
  return selectedMonthRecord.value.opex || 0
})

// Trend Chart Filter & Type State (Matched 100% with Beranda)
const chartTypeDropdownRef = ref<HTMLElement | null>(null)
const periodDropdownRef = ref<HTMLElement | null>(null)
const chartPreviewMode = ref<'area' | 'bar' | 'cashflow'>('area')
const isChartTypeDropdownOpen = ref(false)
const isPeriodDropdownOpen = ref(false)

function toggleChartTypeDropdown() {
  isChartTypeDropdownOpen.value = !isChartTypeDropdownOpen.value
  if (isChartTypeDropdownOpen.value) {
    isPeriodDropdownOpen.value = false
  }
}

function togglePeriodDropdown() {
  isPeriodDropdownOpen.value = !isPeriodDropdownOpen.value
  if (isPeriodDropdownOpen.value) {
    isChartTypeDropdownOpen.value = false
  }
}

const chartTypeOptions: { id: 'area' | 'bar' | 'cashflow'; label: string }[] = [
  { id: 'area', label: 'Grafik Area' },
  { id: 'bar', label: 'Grafik Batang' },
  { id: 'cashflow', label: 'Arus Kas' }
]

const activeChartTypeLabel = computed(() => {
  return chartTypeOptions.find(o => o.id === chartPreviewMode.value)?.label || 'Grafik Area'
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

const heroFilterOptions: { id: '3m' | '6m' | '1y'; label: string }[] = [
  { id: '3m', label: '3 Bulan' },
  { id: '6m', label: '6 Bulan' },
  { id: '1y', label: '1 Tahun' }
]

const selectedPeriod = ref<'3m' | '6m' | '1y'>('6m')

const activePeriodLabel = computed(() => {
  const opt = heroFilterOptions.find(o => o.id === selectedPeriod.value)
  return opt ? opt.label : '6 Bulan'
})

function selectPeriodFilter(filter: '3m' | '6m' | '1y') {
  selectedPeriod.value = filter
  isPeriodDropdownOpen.value = false
}

const selectedPeriodLabel = computed(() => {
  if (selectedPeriod.value === '3m') return '3 Bulan Terakhir'
  if (selectedPeriod.value === '6m') return '6 Bulan Terakhir'
  return '1 Tahun Terakhir'
})

const heroFilteredRecords = computed(() => {
  const records = (umkmStore.monthlyRecords || []).map(r => ({
    ...r,
    outflow: (r.hpp || 0) + (r.opex || 0)
  }))
  if (selectedPeriod.value === '3m') {
    return records.slice(-3)
  } else if (selectedPeriod.value === '6m') {
    return records.slice(-6)
  }
  return records
})

const filteredMonthlyRecords = heroFilteredRecords

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

// Donut Chart State & Controls (Aliran Kas)
const donutCanvas = ref<HTMLCanvasElement | null>(null)
let donutChartInstance: any = null
const activeHoveredItem = ref<any | null>(null)

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

const progresBreakdownItems = computed(() => [
  {
    label: 'Modal Jualan',
    desc: 'Belanja bahan baku & persediaan stok',
    amount: calculatedPeriodHpp.value,
    percent: calculatedHppPercent.value,
    color: '#156374',
    badgeClass: 'bg-cyan-50 text-[#156374] border-cyan-200 dark:bg-cyan-950/60 dark:text-cyan-300 dark:border-cyan-800'
  },
  {
    label: 'Biaya Operasional',
    desc: 'Sewa toko, utilitas, listrik & beban usaha',
    amount: calculatedPeriodOpex.value,
    percent: calculatedOpexPercent.value,
    color: '#50AABF',
    badgeClass: 'bg-sky-50 text-[#2091AA] border-sky-200 dark:bg-sky-950/60 dark:text-sky-300 dark:border-sky-800'
  },
  {
    label: 'Untung Bersih',
    desc: 'Untung bersih kas yang aman diputarkan',
    amount: calculatedPeriodProfit.value,
    percent: calculatedProfitPercent.value,
    color: '#00AA13',
    badgeClass: 'bg-emerald-50 text-[#00880C] border-emerald-200 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800'
  }
])

function highlightDonutSegment(index: number | null) {
  if (!donutChartInstance) return
  const isDark = typeof document !== 'undefined' && document.documentElement.classList.contains('dark')
  const mutedGrey = isDark ? '#334155' : '#CBD5E1'
  const defaultColors = ['#156374', '#50AABF', '#00AA13']

  if (index !== null && index >= 0 && index < defaultColors.length) {
    donutChartInstance.data.datasets[0].backgroundColor = defaultColors.map((color, i) => (i === index ? color : mutedGrey))
  } else {
    donutChartInstance.data.datasets[0].backgroundColor = [...defaultColors]
  }

  // Slices do not pop-out / naik; only color changes to grey
  donutChartInstance.setActiveElements([])
  donutChartInstance.update('none')
}

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
          backgroundColor: ['#156374', '#50AABF', '#00AA13'],
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
      cutout: '64%',
      onHover: (_event: any, elements: any[]) => {
        if (elements && elements.length > 0) {
          const index = elements[0].index
          activeHoveredItem.value = progresBreakdownItems.value[index] || null
          highlightDonutSegment(index)
        } else {
          activeHoveredItem.value = null
          highlightDonutSegment(null)
        }
      },
      plugins: {
        legend: { display: false },
        tooltip: { enabled: false }
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
    calculatedPeriodHpp.value,
    calculatedPeriodOpex.value,
    calculatedPeriodProfit.value
  ]
  donutChartInstance.data.datasets[0].backgroundColor = ['#156374', '#50AABF', '#00AA13']
  donutChartInstance.data.datasets[0].borderWidth = 0
  donutChartInstance.data.datasets[0].hoverOffset = 0
  donutChartInstance.data.datasets[0].borderRadius = 8
  donutChartInstance.data.datasets[0].spacing = 4
  donutChartInstance.options.circumference = 360
  donutChartInstance.options.cutout = '64%'
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

// Daily Transaction Filter & Search
const activeCategoryFilter = ref<'ALL' | 'PEMASUKAN' | 'MODAL_JUALAN' | 'OPERASIONAL'>('ALL')
const searchQuery = ref('')
const isCategoryDropdownOpen = ref(false)
const categoryDropdownRef = ref<HTMLElement | null>(null)

function handleClickOutsideProgres(event: MouseEvent) {
  const target = event.target as Node | null
  if (!target) return
  if (
    isCategoryDropdownOpen.value &&
    categoryDropdownRef.value &&
    !categoryDropdownRef.value.contains(target)
  ) {
    isCategoryDropdownOpen.value = false
  }
  if (
    isMonthDropdownOpen.value &&
    monthDropdownRef.value &&
    !monthDropdownRef.value.contains(target)
  ) {
    isMonthDropdownOpen.value = false
  }
  if (
    isPeriodDropdownOpen.value &&
    periodDropdownRef.value &&
    !periodDropdownRef.value.contains(target)
  ) {
    isPeriodDropdownOpen.value = false
  }
  if (
    isChartTypeDropdownOpen.value &&
    chartTypeDropdownRef.value &&
    !chartTypeDropdownRef.value.contains(target)
  ) {
    isChartTypeDropdownOpen.value = false
  }
}

function handleEscapeKeyProgres(event: KeyboardEvent) {
  if (event.key === 'Escape') {
    isCashDrawerOpen.value = false
    isReceiptModalOpen.value = false
    isCategoryDropdownOpen.value = false
    isMonthDropdownOpen.value = false
    isPeriodDropdownOpen.value = false
    isChartTypeDropdownOpen.value = false
  }
}

const categoryFilterOptions = [
  { id: 'ALL' as const, label: 'Semua Transaksi', shortLabel: 'Semua' },
  { id: 'PEMASUKAN' as const, label: 'Uang Masuk', shortLabel: 'Masuk' },
  { id: 'MODAL_JUALAN' as const, label: 'Modal Jualan', shortLabel: 'Modal' },
  { id: 'OPERASIONAL' as const, label: 'Biaya Operasional', shortLabel: 'Operasional' }
]

const activeCategoryLabel = computed(() => {
  const opt = categoryFilterOptions.find(o => o.id === activeCategoryFilter.value)
  return opt ? opt.label : 'Semua Transaksi'
})

const activeCategoryShortLabel = computed(() => {
  const opt = categoryFilterOptions.find(o => o.id === activeCategoryFilter.value)
  return opt ? opt.shortLabel : 'Semua'
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

// Drawer State for BCashEntryDrawer
const route = useRoute()
const isCashDrawerOpen = ref(false)

function handleOpenCashDrawerEvent() {
  isCashDrawerOpen.value = true
}

watch(
  () => route.query.action,
  (action) => {
    if (action === 'catat-kas') {
      isCashDrawerOpen.value = true
    }
  },
  { immediate: true }
)

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
  alert('Menyiapkan berkas Buku Kas Resmi (PDF) Kopi Senja Nusantara untuk laporan pemodal...')
}

let handleResize: (() => void) | null = null
let gsapCtx: gsap.Context | null = null

onMounted(() => {
  nextTick(() => {
    updateTabIndicator(true)
    if (activeTab.value === 'tren') {
      initDonutChart()
    }
  })
  setTimeout(() => {
    updateTabIndicator(true)
    if (activeTab.value === 'tren') {
      initDonutChart()
    }
  }, 150)

  checkMobile()
  handleResize = () => {
    checkMobile()
    updateTabIndicator(true)
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

  if (typeof document !== 'undefined') {
    document.addEventListener('click', handleClickOutsideProgres)
    document.addEventListener('keydown', handleEscapeKeyProgres)
  }
  if (typeof window !== 'undefined') {
    window.addEventListener('open-cash-drawer', handleOpenCashDrawerEvent)
  }
})

onBeforeUnmount(() => {
  if (typeof document !== 'undefined') {
    document.removeEventListener('click', handleClickOutsideProgres)
    document.removeEventListener('keydown', handleEscapeKeyProgres)
  }
  if (typeof window !== 'undefined') {
    window.removeEventListener('open-cash-drawer', handleOpenCashDrawerEvent)
  }
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

<style scoped>
/* Hilangkan efek shadow, set background putih #FFFFFF & pertebal stroke konsisten pada container seperti di halaman beranda */
.card-tactile-gopay,
:deep(.card-tactile-gopay) {
  background-color: #FFFFFF !important;
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
