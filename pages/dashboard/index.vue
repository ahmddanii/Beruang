<template>
  <div class="space-y-6 sm:space-y-8 pb-16 font-poppins text-neutral-900 dark:text-neutral-100">

    <!-- 1. Top Header: Title on Left & Action Controls (Edit Profil) on Right (1 Baris Sejajar ala Catatan Kas) -->
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

      <!-- Action Controls: Filter Lihat Cabang & Edit Profil Button (Stacked full-width on mobile, right-aligned on desktop) -->
      <div class="flex items-center gap-2.5 shrink-0 w-full sm:w-auto [&>*]:w-full sm:[&>*]:w-auto">
        <!-- Filter Lihat Cabang Button -->
        <button
          type="button"
          :class="[
            'btn-pill-action group justify-center cursor-pointer shadow-none',
            isBranchModalOpen || umkmStore.selectedBranchIds.length > 0
              ? 'bg-[#E6F4F7]! text-[#156374]! border-[#156374]/30! dark:bg-[#156374]/25! dark:text-[#50AABF]! dark:border-[#50AABF]/35!'
              : ''
          ]"
          aria-haspopup="dialog"
          :aria-expanded="isBranchModalOpen"
          title="Pilih Cabang Usaha untuk Memfilter Pergerakan Uang Toko"
          @click="isBranchModalOpen = true"
        >
          <HugeiconsIcon
            :icon="Store01Icon"
            :size="15"
            :stroke-width="2"
            class="text-[#156374] dark:text-[#50AABF] shrink-0"
          />
          <span>{{ activeBranchButtonLabel }}</span>
          <HugeiconsIcon
            :icon="ArrowDown01Icon"
            :size="15"
            :stroke-width="2.2"
            :class="[
              'text-neutral-400 dark:text-neutral-500 transition-transform duration-200 shrink-0',
              isBranchModalOpen ? 'rotate-180' : ''
            ]"
          />
        </button>

        <!-- Edit Profil Button -->
        <NuxtLink
          to="/dashboard/profile"
          class="btn-pill-action group justify-center focus-visible:ring-2 focus-visible:ring-[#156374] focus-visible:outline-hidden transition-all duration-150"
          title="Edit Profil Usaha"
        >
          <span>Edit Profil</span>
          <HugeiconsIcon
            :icon='Edit03Icon'
            :size='16'
            :stroke-width='2.0'
            class='shrink-0 transition-transform duration-200 group-hover:translate-x-0.5'
          />
        </NuxtLink>
      </div>
    </div>

    <!-- 1. Metric Container: 4 Equal Width Financial Cards (Apple Store Utility Card: rounded.lg 18px, spacing.lg 24px) -->
    <div
      class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 items-stretch w-full"
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
            <div class="flex items-center gap-2.5">
              <div class="w-7.5 h-7.5 rounded-lg bg-neutral-200 dark:bg-neutral-800" />
              <div class="h-4 w-20 rounded-md bg-neutral-200 dark:bg-neutral-800" />
            </div>
            <div class="h-5 w-12 rounded-full bg-neutral-200 dark:bg-neutral-800" />
          </div>
          <div class="my-auto py-3">
            <div class="h-8 w-32 rounded-md bg-neutral-200 dark:bg-neutral-800" />
          </div>
          <div class="h-8 w-24 rounded-full bg-neutral-200 dark:bg-neutral-800" />
        </div>
      </template>

      <!-- Ideal State: 4 Financial Metric Cards -->
      <template v-else>
        <!-- Card 1: Untung Bersih -->
        <div class="gsap-stat-card flex-1 w-full">
          <div class="stat-card-clean transition-all duration-200">
            <!-- 1. Top Header: Icon + Title & Badge -->
            <div class="flex items-center justify-between w-full gap-2">
              <div class="flex items-center gap-2 sm:gap-2.5 min-w-0">
                <div class="stat-card-icon-box">
                  <HugeiconsIcon
                    :icon="Coins01Icon"
                    :size="17"
                    :stroke-width="2.0"
                    class="text-[#156374] dark:text-[#50AABF] shrink-0"
                  />
                </div>
                <span class="text-[13px] xl:text-[14px] font-poppins font-semibold text-neutral-800 dark:text-neutral-100 capitalize truncate tracking-[-0.01em]">
                  Untung Bersih
                </span>
              </div>
              <div class="stat-card-badge badge-green">
                <span>+12%</span>
              </div>
            </div>

            <!-- 2. Middle Value Row: Apple lead scale (21px - 24px font-semibold) -->
            <div class="my-auto py-2.5 sm:py-3.5">
              <span class="text-xl sm:text-[22px] lg:text-[21px] xl:text-[24px] font-poppins font-semibold text-neutral-900 dark:text-white tabular-nums tracking-[-0.02em] whitespace-nowrap block leading-tight">
                {{ currentNetProfitDisplay }}
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
          <div class="stat-card-clean transition-all duration-200">
            <!-- 1. Top Header: Icon + Title & Badge -->
            <div class="flex items-center justify-between w-full gap-2">
              <div class="flex items-center gap-2 sm:gap-2.5 min-w-0">
                <div class="stat-card-icon-box">
                  <HugeiconsIcon
                    :icon="MoneyBag01Icon"
                    :size="17"
                    :stroke-width="2.0"
                    class="text-[#156374] dark:text-[#50AABF] shrink-0"
                  />
                </div>
                <span class="text-[13px] xl:text-[14px] font-poppins font-semibold text-neutral-800 dark:text-neutral-100 capitalize truncate tracking-[-0.01em]">
                  Modal Jualan
                </span>
              </div>
              <div class="stat-card-badge badge-green">
                <span>Hemat</span>
              </div>
            </div>

            <!-- 2. Middle Value Row: Apple lead scale (21px - 24px font-semibold) -->
            <div class="my-auto py-2.5 sm:py-3.5">
              <span class="text-xl sm:text-[22px] lg:text-[21px] xl:text-[24px] font-poppins font-semibold text-neutral-900 dark:text-white tabular-nums tracking-[-0.02em] whitespace-nowrap block leading-tight">
                {{ currentHppDisplay }}
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
          <div class="stat-card-clean transition-all duration-200">
            <!-- 1. Top Header: Icon + Title & Badge -->
            <div class="flex items-center justify-between w-full gap-2">
              <div class="flex items-center gap-2 sm:gap-2.5 min-w-0">
                <div class="stat-card-icon-box">
                  <svg class="w-4 h-4 text-[#156374] dark:text-[#50AABF] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.0" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M17 7 7 17" />
                    <path d="M17 17H7V7" />
                  </svg>
                </div>
                <span class="text-[13px] xl:text-[14px] font-poppins font-semibold text-neutral-800 dark:text-neutral-100 capitalize truncate tracking-[-0.01em]">
                  Uang Masuk
                </span>
              </div>
              <div class="stat-card-badge badge-green">
                <span>+9.8%</span>
              </div>
            </div>

            <!-- 2. Middle Value Row: Apple lead scale (21px - 24px font-semibold) -->
            <div class="my-auto py-2.5 sm:py-3.5">
              <span class="text-xl sm:text-[22px] lg:text-[21px] xl:text-[24px] font-poppins font-semibold text-neutral-900 dark:text-white tabular-nums tracking-[-0.02em] whitespace-nowrap block leading-tight">
                {{ currentInflowDisplay }}
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
          <div class="stat-card-clean transition-all duration-200">
            <!-- 1. Top Header: Icon + Title & Badge -->
            <div class="flex items-center justify-between w-full gap-2">
              <div class="flex items-center gap-2 sm:gap-2.5 min-w-0">
                <div class="stat-card-icon-box">
                  <svg class="w-4 h-4 text-[#156374] dark:text-[#50AABF] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.0" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M7 17 17 7" />
                    <path d="M7 7h10v10" />
                  </svg>
                </div>
                <span class="text-[13px] xl:text-[14px] font-poppins font-semibold text-neutral-800 dark:text-neutral-100 capitalize truncate tracking-[-0.01em]">
                  Uang Keluar
                </span>
              </div>
              <div class="stat-card-badge badge-red">
                <span>-4%</span>
              </div>
            </div>

            <!-- 2. Middle Value Row: Apple lead scale (21px - 24px font-semibold) -->
            <div class="my-auto py-2.5 sm:py-3.5">
              <span class="text-xl sm:text-[22px] lg:text-[21px] xl:text-[24px] font-poppins font-semibold text-neutral-900 dark:text-white tabular-nums tracking-[-0.02em] whitespace-nowrap block leading-tight">
                {{ currentOutflowDisplay }}
              </span>
            </div>

            <!-- 3. Bottom Action Button: Catat Kas -->
            <div class="stat-card-actions">
              <BActionButton
                variant="green"
                icon="plus"
                @click="isTransactionDrawerOpen = true"
                custom-class="shrink-0"
              >
                Catat Kas
              </BActionButton>
            </div>
          </div>
        </div>
      </template>
    </div>

    <!-- 2. Hero Section: Clean Line Chart (Pergerakan Uang Toko) -->
    <div class="gsap-hero-chart card-tactile-gopay rounded-[18px] p-6 sm:p-8 space-y-9 sm:space-y-11">
      <!-- Header: Title, Subtitle, and Right Actions (Dropdown Chart Type, Dropdown Period, Button Lihat Detail) -->
      <div class="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-2 sm:pb-3">
        <!-- Left: Title & Subtitle -->
        <div class="min-w-0 max-w-xl">
          <div class="gsap-hero-header-title">
            <h2 class="text-lg sm:text-[21px] font-poppins font-bold text-neutral-900 dark:text-white tracking-tight">
              Pergerakan Uang Toko
            </h2>
            <p class="text-xs sm:text-[14px] font-poppins text-neutral-500 dark:text-neutral-400 mt-2 sm:mt-2.5 leading-normal">
              Grafik pemantauan akumulasi saldo kas riil tokomu dari waktu ke waktu yang selalu tersinkronisasi.
            </p>
          </div>
        </div>

        <!-- Right: Actions Control (Dropdown Jenis Grafik + Dropdown Periode + Button Lihat Detail) -->
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
                <span v-if="chartPreviewMode === opt.id" class="w-1.5 h-1.5 rounded-full bg-[#156374] dark:bg-[#50AABF] shrink-0 ml-2" />
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
                  heroPeriodFilter === opt.id
                    ? 'bg-[#E6F4F7] hover:bg-[#D9EEF3] dark:bg-[#156374]/20 dark:hover:bg-[#156374]/30 text-[#156374] dark:text-[#50AABF] font-semibold border border-[#156374]/20 dark:border-[#50AABF]/25 shadow-2xs'
                    : 'text-[#64748B] dark:text-neutral-400 font-medium hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100/80 dark:hover:bg-neutral-800/60 border border-transparent'
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
              <path d="m9 18 6-6-6-6" />
            </svg>
          </NuxtLink>
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

    <!-- 3. Telemetry Bento Row: Lihat Aliran Kas & Tugas Hari Ini -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-stretch">
      <!-- Left: Container Kemana saja uang kamu? -->
      <div id="cash-flow-breakdown" class="card-tactile-gopay rounded-[18px] p-6 sm:p-8 flex flex-col justify-between space-y-6">
        <!-- Header: Title & Action -->
        <div class="flex items-center justify-between gap-4 sm:gap-5">
          <div class="min-w-0 pr-2 space-y-2">
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
              <path d="m9 18 6-6-6-6" />
            </svg>
          </NuxtLink>
        </div>

        <!-- Body: Donut Chart on Left with Total Kas below it, Clean List on Right -->
        <div class="flex-1 grid grid-cols-1 sm:grid-cols-12 gap-5 sm:gap-6 items-center pb-1">
          <!-- Bagian 1 (Kiri): Donut Chart & Informasi Total Kas di Bawah Kiri -->
          <div class="sm:col-span-5 flex flex-col justify-between items-center sm:items-start h-full min-h-[230px]">
            <!-- Donut Chart Ring (Tanpa tulisan di tengah) -->
            <div class="relative w-40 h-40 sm:w-44 sm:h-44 my-auto mx-auto flex items-center justify-center">
              <canvas ref="donutCanvas" class="w-full h-full"></canvas>
            </div>

            <!-- Informasi Total Kas di Bagian Bawah Kiri -->
            <div class="pt-3 w-full text-center sm:text-left">
              <div class="text-xl sm:text-2xl font-poppins font-bold text-neutral-900 dark:text-white tabular-nums tracking-tight">
                Rp {{ totalCalculatedOmzet.toLocaleString('id-ID') }}
              </div>
              <div class="text-xs sm:text-[13px] font-poppins font-medium text-neutral-500 dark:text-neutral-400 mt-1">
                Akumulasi pemasukan bulan berjalan
              </div>
            </div>
          </div>

          <!-- Bagian 2 (Kanan): 3 Cards Informasi dengan Tinggi, Font & Jarak yang Sama Persis dengan Tugas Hari Ini -->
          <div class="sm:col-span-7 space-y-3.5 flex-1 flex flex-col justify-center">
            <div
              v-for="(item, idx) in breakdownItems"
              :key="item.label"
              role="button"
              tabindex="0"
              :aria-label="`${item.label}: Rp ${item.amount.toLocaleString('id-ID')} (${item.percent}%)`"
              class="card-btn-hover p-3.5 sm:p-4 rounded-[12px] flex items-center justify-between gap-3.5 group cursor-pointer"
              @mouseenter="activeHoveredItem = item; highlightDonutSegment(idx)"
              @mouseleave="activeHoveredItem = null; highlightDonutSegment(null)"
              @focus="activeHoveredItem = item; highlightDonutSegment(idx)"
              @blur="activeHoveredItem = null; highlightDonutSegment(null)"
              @keydown.enter="activeHoveredItem = item; highlightDonutSegment(idx)"
              @keydown.space.prevent="activeHoveredItem = item; highlightDonutSegment(idx)"
            >
              <!-- Left: Bullet dot + Label + Nominal Subtitle (Sama persis jarak dan ukuran font dengan Tugas Hari Ini) -->
              <div class="flex items-center gap-3.5 min-w-0">
                <span
                  class="w-2.5 h-2.5 rounded-full shrink-0 transition-transform duration-200 group-hover:scale-125"
                  :style="{ backgroundColor: item.color }"
                />
                <div class="min-w-0 flex flex-col items-start">
                  <!-- Title: Sama persis dengan judul task (text-sm sm:text-[15px] font-semibold) -->
                  <span class="font-poppins font-semibold text-sm sm:text-[15px] text-neutral-900 dark:text-white leading-snug line-clamp-1">
                    {{ item.label }}
                  </span>
                  <!-- Nominal / Body: Sama persis dengan ukuran deadline task (text-xs sm:text-[14px] mt-1.5) -->
                  <span class="text-xs sm:text-[14px] font-poppins font-normal text-neutral-500 dark:text-neutral-400 mt-1.5 tabular-nums">
                    Rp {{ item.amount.toLocaleString('id-ID') }}
                  </span>
                </div>
              </div>

              <!-- Right: Percentage (text-sm sm:text-[15px] font-semibold) -->
              <div class="flex items-center gap-2 shrink-0">
                <span class="font-poppins font-semibold text-sm sm:text-[15px] text-neutral-900 dark:text-white tabular-nums">
                  {{ item.percent }}%
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Right: Container Tugas Hari Ini -->
      <div id="daily-tasks-container" class="card-tactile-gopay rounded-[18px] p-6 sm:p-8 flex flex-col justify-between space-y-6">
        <!-- Header: Title & Action -->
        <div class="flex items-center justify-between gap-4 sm:gap-5">
          <div class="min-w-0 pr-2 space-y-2">
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
              <path d="m9 18 6-6-6-6" />
            </svg>
          </NuxtLink>
        </div>

        <!-- 3 Tasks Cards -->
        <div class="space-y-3.5 flex-1 flex flex-col justify-start pb-1">
          <NuxtLink
            v-for="(task, idx) in displayedDailyTasks"
            :key="task.id"
            :to="task.link || '/dashboard/rencana-aksi'"
            class="card-btn-hover p-3.5 sm:p-4 rounded-[12px] flex items-center justify-between gap-3.5 group cursor-pointer"
          >
            <div class="min-w-0 flex-1 flex flex-col items-start gap-1">
              <!-- Judul Task -->
              <h3 class="font-poppins font-semibold text-sm sm:text-[15px] text-neutral-900 dark:text-white leading-snug line-clamp-1">
                {{ task.title }}
              </h3>

              <!-- Deadline di Bagian Bawah: Sama ukuran dan font weight dengan deskripsi container -->
              <div class="flex items-center gap-1.5 text-xs sm:text-[14px] font-poppins font-normal text-neutral-500 dark:text-neutral-400 mt-1.5">
                <svg class="w-4 h-4 text-neutral-400 dark:text-neutral-500 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
                  <line x1="16" x2="16" y1="2" y2="6" />
                  <line x1="8" x2="8" y1="2" y2="6" />
                  <line x1="3" x2="21" y1="10" y2="10" />
                </svg>
                <span>Deadline: {{ task.deadline }}</span>
              </div>
            </div>

            <!-- Uncontained Green Chevron -->
            <svg
              class="w-4 h-4 text-[#54DE63] dark:text-[#54DE63] shrink-0 transition-transform duration-200 ease-out group-hover:translate-x-0.5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2.0"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="m9 18 6-6-6-6" />
            </svg>
          </NuxtLink>
        </div>
      </div>
    </div>

    <!-- 4. Rapor Keuangan Bulanan -->
    <div id="verified-cashbook-table" class="card-tactile-gopay rounded-[18px] overflow-hidden font-poppins">
      <div class="p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E2E8F0] dark:border-neutral-800 bg-[#FFFFFF] dark:bg-[#13161F]">
        <div class="space-y-2 sm:space-y-2.5">
          <h2 class="text-lg sm:text-[21px] font-poppins font-bold text-neutral-900 dark:text-white tracking-tight">
            Rapor Keuangan Bulanan
          </h2>
          <p class="text-xs sm:text-[14px] font-poppins text-neutral-500 dark:text-neutral-400 leading-normal">
            Arus kas 5 bulan terakhir yang sudah dicek langsung oleh konsultan pendamping tokomu.
          </p>
        </div>

        <div class="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3 shrink-0 w-full sm:w-auto [&>*]:w-full sm:[&>*]:w-auto">
          <!-- Button Unduh Laporan Terbaru (CSV) -->
          <button
            type="button"
            class="btn-pill-action-green group shrink-0 cursor-pointer justify-center"
            title="Unduh Laporan Keuangan Terbaru (CSV)"
            @click="downloadThreeMonthsReport"
          >
            <HugeiconsIcon :icon="ArrowDownToLineIcon" :size="15" :stroke-width="2.2" class="text-white transition-transform duration-200 group-hover:translate-y-0.5" />
            <span>Unduh Laporan Terbaru</span>
          </button>

          <!-- Button Lihat Semua (Renamed from Lihat Semua Laporan) -->
          <NuxtLink
            to="/dashboard/progres"
            class="btn-pill-action group shrink-0 justify-center"
          >
            <span>Lihat Semua</span>
            <svg class="w-4 h-4 shrink-0 transition-transform duration-200 group-hover:translate-x-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.0" stroke-linecap="round" stroke-linejoin="round">
              <path d="m9 18 6-6-6-6" />
            </svg>
          </NuxtLink>
        </div>
      </div>

      <!-- Table Langsung: Desktop View (hidden on < sm) -->
      <div class="overflow-x-auto w-full hidden sm:block">
        <table class="w-full text-left text-xs sm:text-[14px] font-poppins">
          <thead>
            <tr class="bg-[#FFFFFF] dark:bg-[#13161F] border-b border-[#E2E8F0] dark:border-neutral-800 text-neutral-800 dark:text-neutral-200 font-poppins text-xs sm:text-[12.5px] font-bold uppercase tracking-wider">
              <th class="py-4 sm:py-5 px-6 text-left font-bold">Bulan</th>
              <th class="py-4 sm:py-5 px-5 text-left font-bold">Total Pendapatan</th>
              <th class="py-4 sm:py-5 px-5 text-left font-bold">Modal Jualan</th>
              <th class="py-4 sm:py-5 px-5 text-left font-bold">Biaya Operasional</th>
              <th class="py-4 sm:py-5 px-5 text-left font-bold text-neutral-800 dark:text-neutral-200">Rugi</th>
              <th class="py-4 sm:py-5 px-6 text-left font-bold text-neutral-900 dark:text-white">Untung Bersih</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-neutral-100 dark:divide-neutral-800/80 text-neutral-800 dark:text-neutral-200">
            <!-- 5-State UX Matrix: Empty State -->
            <tr v-if="!latestMonthlyRecords || latestMonthlyRecords.length === 0">
              <td colspan="6" class="py-12 text-center">
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
                    class="btn-pill-action group mt-2 cursor-pointer focus-visible:ring-2 focus-visible:ring-[#2091AA] focus-visible:outline-hidden transition-all duration-150 ease-[cubic-bezier(0.22,1,0.36,1)]"
                    @click="isTransactionDrawerOpen = true"
                  >
                    <span>Catat Kas Pertama</span>
                    <svg
                      class="w-4 h-4 shrink-0 origin-center transition-transform duration-300 ease-out group-hover:rotate-180"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2.0"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <path d="M12 5v14M5 12h14" />
                    </svg>
                  </button>
                </div>
              </td>
            </tr>

            <tr
              v-for="rec in latestMonthlyRecords"
              :key="`${rec.month}-${rec.year}`"
              class="bg-white dark:bg-[#13161F] hover:bg-neutral-50/80 dark:hover:bg-neutral-800/50 transition-colors"
            >
              <td class="py-4 sm:py-5 px-6 text-left font-poppins font-normal text-neutral-900 dark:text-white text-xs sm:text-[13px]">
                {{ rec.month }} {{ rec.year }}
              </td>
              <td class="py-4 sm:py-5 px-5 text-left font-poppins tabular-nums font-normal text-neutral-900 dark:text-white">
                Rp {{ rec.omzet.toLocaleString('id-ID') }}
              </td>
              <td class="py-4 sm:py-5 px-5 text-left font-poppins tabular-nums font-normal text-neutral-600 dark:text-neutral-300">
                Rp {{ rec.hpp.toLocaleString('id-ID') }}
              </td>
              <td class="py-4 sm:py-5 px-5 text-left font-poppins tabular-nums font-normal text-neutral-600 dark:text-neutral-300">
                Rp {{ rec.opex.toLocaleString('id-ID') }}
              </td>
              <td class="py-4 sm:py-5 px-5 text-left font-poppins tabular-nums font-normal text-rose-600 dark:text-rose-400 text-xs sm:text-[13px]">
                Rp {{ ((rec as any).loss || 0).toLocaleString('id-ID') }}
              </td>
              <td class="py-4 sm:py-5 px-6 text-left font-poppins tabular-nums font-normal text-[#00AA13] dark:text-emerald-400 text-xs sm:text-[13px]">
                Rp {{ rec.netProfit.toLocaleString('id-ID') }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Mobile Responsive Tactile Card List View (< sm) -->
      <div class="sm:hidden divide-y divide-neutral-100 dark:divide-neutral-800">
        <!-- Empty State Mobile -->
        <div v-if="!latestMonthlyRecords || latestMonthlyRecords.length === 0" class="p-6 text-center space-y-3">
          <p class="font-poppins text-xs text-neutral-500 dark:text-neutral-400">
            Belum ada rapor keuangan bulanan.
          </p>
          <button
            type="button"
            class="btn-pill-action w-full justify-center text-xs"
            @click="isTransactionDrawerOpen = true"
          >
            Catat Kas Pertama
          </button>
        </div>

        <div
          v-for="rec in latestMonthlyRecords"
          :key="`m-rec-${rec.month}-${rec.year}`"
          class="p-4 space-y-3 bg-white dark:bg-[#13161F]"
        >
          <!-- Top: Periode Bulan & Untung Bersih Pill -->
          <div class="flex items-center justify-between gap-2">
            <span class="font-poppins font-bold text-sm text-neutral-900 dark:text-white">
              {{ rec.month }} {{ rec.year }}
            </span>
            <span class="text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-50 text-[#00AA13] dark:bg-emerald-950/70 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800 tabular-nums">
              + Rp {{ rec.netProfit.toLocaleString('id-ID') }}
            </span>
          </div>

          <!-- Financial Metrics Grid: Total Pendapatan, Modal Jualan, Biaya Operasional -->
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
              <span class="text-[10px] text-neutral-500 dark:text-neutral-400 block font-medium">Operasional</span>
              <span class="text-xs font-semibold text-neutral-700 dark:text-neutral-300 tabular-nums block mt-0.5">
                Rp {{ (rec.opex / 1000000).toFixed(1) }} Jt
              </span>
            </div>
          </div>
        </div>
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
            Total Penjualan Hari Ini
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
            class="px-4 py-2.5 rounded-xl border border-neutral-300 dark:border-neutral-700 text-xs sm:text-sm font-heading font-semibold text-neutral-800 dark:text-neutral-200 hover:bg-neutral-100 transition-colors"
            @click="close"
          >
            Batal
          </button>
          <button
            type="button"
            class="px-5 py-2.5 rounded-xl bg-primary-500 hover:bg-primary-600 text-white text-xs sm:text-sm font-heading font-semibold shadow-xs transition-colors"
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
            class="px-4 py-2.5 rounded-xl border border-neutral-300 dark:border-neutral-700 text-xs sm:text-sm font-heading font-semibold text-neutral-800 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
            @click="close"
          >
            Batal
          </button>
          <button
            type="button"
            class="px-5 py-2.5 rounded-xl bg-primary-500 hover:bg-primary-600 text-white text-xs sm:text-sm font-heading font-semibold shadow-xs transition-colors flex items-center gap-1.5"
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
    <!-- Modal Filter Cabang Toko (Sesuai Konsep Modal Wilayah Jaringan Investor) -->
    <Teleport to="body">
      <div
        v-if="isBranchModalOpen"
        class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-150 font-poppins"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-cabang-title"
        @click.self="isBranchModalOpen = false"
      >
        <div class="w-full max-w-2xl rounded-[22px] bg-[#FFFFFF] dark:bg-[#13161F] border border-[#CBD5E1] dark:border-neutral-800 shadow-none overflow-hidden flex flex-col max-h-[86vh]">
          <!-- Modal Header -->
          <div class="px-6 py-4 sm:py-5 border-b border-neutral-100 dark:border-neutral-800 flex items-start justify-between gap-4 shrink-0">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-xl bg-[#E6F4F7] dark:bg-[#156374]/25 text-[#156374] dark:text-[#50AABF] flex items-center justify-center shrink-0">
                <HugeiconsIcon :icon="Store01Icon" :size="20" :stroke-width="2" />
              </div>
              <div>
                <h2 id="modal-cabang-title" class="text-base sm:text-lg font-poppins font-bold text-neutral-900 dark:text-white leading-tight">
                  Pilih Cabang Usaha
                </h2>
                <p class="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
                  Centang satu atau beberapa gerai cabang untuk menyaring pergerakan uang toko dan 4 kartu finansial utama.
                </p>
              </div>
            </div>

            <button
              type="button"
              class="w-8 h-8 rounded-lg text-neutral-400 hover:text-neutral-700 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 flex items-center justify-center transition-colors cursor-pointer shrink-0"
              aria-label="Tutup Modal Cabang"
              @click="isBranchModalOpen = false"
            >
              <HugeiconsIcon :icon="Cancel01Icon" :size="18" :stroke-width="2.2" />
            </button>
          </div>

          <!-- Search & "Semua Cabang" Master Checklist Row -->
          <div class="px-6 pt-4 pb-3 border-b border-neutral-100 dark:border-neutral-800 space-y-3 shrink-0 bg-[#F8FAFC]/60 dark:bg-[#18191E]/50">
            <!-- Search Input inside Modal (Full-width rata kanan-kiri) -->
            <div class="relative w-full">
              <span class="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none flex items-center">
                <HugeiconsIcon :icon="Search01Icon" :size="16" :stroke-width="2" />
              </span>
              <input
                v-model="branchSearchQuery"
                type="text"
                placeholder="Cari nama atau lokasi cabang usaha (misal: Riau, Dago, Sudirman)..."
                class="w-full h-10 pl-10 pr-9 rounded-xl border border-[#CBD5E1] dark:border-neutral-700 bg-white dark:bg-[#13161F] text-xs sm:text-sm text-neutral-900 dark:text-white placeholder:text-neutral-400 focus:outline-none focus:border-[#156374] dark:focus:border-[#50AABF] focus:ring-2 focus:ring-[#156374]/20 transition-all font-poppins"
              />
              <button
                v-if="branchSearchQuery"
                type="button"
                class="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-700 dark:hover:text-white cursor-pointer"
                @click="branchSearchQuery = ''"
              >
                <HugeiconsIcon :icon="Cancel01Icon" :size="14" />
              </button>
            </div>

            <!-- Master Option: Semua Cabang -->
            <div
              class="p-3 sm:p-3.5 rounded-xl border transition-all flex items-center justify-between gap-3 cursor-pointer select-none shadow-none"
              :class="[
                umkmStore.selectedBranchIds.length === 0
                  ? 'border-[#00800e]/30 dark:border-[#00C058]/40 bg-[#F6FCF7] dark:bg-[#00800e]/10'
                  : 'border-[#CBD5E1] dark:border-neutral-800 bg-white dark:bg-[#18191E] hover:bg-[#F8FAFC] dark:hover:bg-[#262626]'
              ]"
              @click="umkmStore.clearBranchSelection()"
            >
              <div class="min-w-0 pr-2">
                <span class="text-xs sm:text-sm font-semibold text-neutral-900 dark:text-white block">
                  Semua Cabang
                </span>
              </div>
              <div
                :class="[
                  'w-5 h-5 rounded-md border flex items-center justify-center shrink-0 transition-colors',
                  umkmStore.selectedBranchIds.length === 0
                    ? 'border-[#00800e] dark:border-[#00C058] bg-[#00800e] dark:bg-[#00C058] text-white'
                    : 'border-slate-300 dark:border-neutral-600 bg-white dark:bg-neutral-800 text-transparent'
                ]"
              >
                <HugeiconsIcon v-if="umkmStore.selectedBranchIds.length === 0" :icon="Tick02Icon" :size="13" :stroke-width="3" />
              </div>
            </div>
          </div>

          <!-- Scrollable Checklist Body: Max 3 Columns -->
          <div class="px-6 py-4 overflow-y-auto space-y-3 flex-1">
            <template v-if="filteredBranchList.length > 0">
              <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
                <div
                  v-for="branch in filteredBranchList"
                  :key="branch.id"
                  class="p-3 rounded-xl border transition-all flex items-center justify-between gap-2.5 cursor-pointer select-none shadow-none"
                  :class="[
                    isBranchChecked(branch.id)
                      ? 'border-[#00800e]/30 dark:border-[#00C058]/40 bg-[#F6FCF7] dark:bg-[#00800e]/10'
                      : 'border-[#CBD5E1] dark:border-neutral-800 bg-white dark:bg-[#18191E] hover:bg-[#F8FAFC] dark:hover:bg-[#262626]'
                  ]"
                  @click="umkmStore.toggleBranchSelection(branch.id)"
                >
                  <div class="min-w-0 pr-1 space-y-0.5">
                    <span class="text-xs sm:text-[13px] font-semibold text-neutral-800 dark:text-neutral-200 truncate block">
                      {{ branch.name }}
                    </span>
                    <span class="text-[11px] text-neutral-500 dark:text-neutral-400 truncate block">
                      {{ branch.location }}
                    </span>
                  </div>
                  <div
                    :class="[
                      'w-5 h-5 rounded-md border flex items-center justify-center shrink-0 transition-colors',
                      isBranchChecked(branch.id)
                        ? 'border-[#00800e] dark:border-[#00C058] bg-[#00800e] dark:bg-[#00C058] text-white'
                        : 'border-slate-300 dark:border-neutral-600 bg-white dark:bg-neutral-800 text-transparent'
                    ]"
                  >
                    <HugeiconsIcon v-if="isBranchChecked(branch.id)" :icon="Tick02Icon" :size="13" :stroke-width="3" />
                  </div>
                </div>
              </div>
            </template>

            <!-- Empty Search Result inside Modal -->
            <div v-else class="py-8 text-center space-y-2">
              <p class="text-xs sm:text-sm font-semibold text-neutral-700 dark:text-neutral-300">
                Cabang "{{ branchSearchQuery }}" tidak ditemukan
              </p>
              <p class="text-xs text-neutral-500">
                Tambahkan cabang baru melalui menu Profil Usaha.
              </p>
            </div>
          </div>

          <!-- Modal Footer -->
          <div class="px-6 py-4 border-t border-neutral-100 dark:border-neutral-800 bg-[#F8FAFC] dark:bg-[#18191E] flex flex-col sm:flex-row sm:items-center justify-between gap-3 shrink-0">
            <div class="flex items-center gap-3 text-xs">
              <span class="font-medium text-neutral-600 dark:text-neutral-400">
                Status:
                <strong class="text-neutral-900 dark:text-white font-semibold">
                  {{ umkmStore.selectedBranchIds.length === 0 ? 'Semua Cabang' : `${umkmStore.selectedBranchIds.length} Cabang Dipilih` }}
                </strong>
              </span>
              <button
                v-if="umkmStore.selectedBranchIds.length > 0"
                type="button"
                class="text-xs font-semibold text-red-600 dark:text-red-400 hover:underline cursor-pointer"
                @click="umkmStore.clearBranchSelection()"
              >
                Reset Pilihan
              </button>
            </div>

            <div class="flex items-center justify-end gap-2.5">
              <BActionButton
                variant="green"
                :huge-icon="CheckmarkCircle01Icon"
                custom-class="w-full sm:w-auto justify-center"
                @click="isBranchModalOpen = false"
              >
                Terapkan Cabang
              </BActionButton>
            </div>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount, watch, nextTick } from 'vue'
import { HugeiconsIcon } from '@hugeicons/vue'
import {
  CheckmarkBadge01Icon,
  PencilEdit01Icon,
  Edit03Icon,
  CheckmarkCircle01Icon,
  Alert01Icon,
  BanknoteIcon,
  ArrowRight01Icon,
  Money03Icon,
  MoneyBag01Icon,
  Coins01Icon,
  ArrowDownToLineIcon,
  Home03Icon,
  Store01Icon,
  ArrowDown01Icon,
  Tick02Icon,
  Cancel01Icon,
  Search01Icon
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
import BVerifiedBadge from '~/components/base/BVerifiedBadge.vue'

definePageMeta({
  layout: 'dashboard',
  hideHeader: true
})

function handleDownloadReport() {
  if (typeof window !== 'undefined') {
    window.print()
  }
}

const authStore = useAuthStore()
const umkmStore = useUmkmStore()

// Modal Filter Cabang Toko & Logika Per-Cabang
const isBranchModalOpen = ref(false)
const branchSearchQuery = ref('')

const filteredBranchList = computed(() => {
  const q = branchSearchQuery.value.toLowerCase().trim()
  const list = umkmStore.branches || []
  if (!q) return list
  return list.filter(b =>
    b.name.toLowerCase().includes(q) ||
    b.location.toLowerCase().includes(q) ||
    (b.address && b.address.toLowerCase().includes(q))
  )
})

const activeBranchButtonLabel = computed(() => {
  return umkmStore.activeBranchLabel || 'Semua'
})

function isBranchChecked(branchId: string): boolean {
  return umkmStore.selectedBranchIds.includes(branchId)
}

// Active Branch Filter Ratio (scales the 4 financial cards and Pergerakan Uang Toko)
const activeBranchRatio = computed(() => {
  return umkmStore.activeBranchRatio || 1
})

const currentNetProfitDisplay = computed(() => {
  return 'Rp ' + Math.round(32600000 * activeBranchRatio.value).toLocaleString('id-ID')
})

const currentHppDisplay = computed(() => {
  return 'Rp ' + Math.round(45100000 * activeBranchRatio.value).toLocaleString('id-ID')
})

const currentInflowDisplay = computed(() => {
  return 'Rp ' + Math.round(100000000 * activeBranchRatio.value).toLocaleString('id-ID')
})

const currentOutflowDisplay = computed(() => {
  return 'Rp ' + Math.round(67400000 * activeBranchRatio.value).toLocaleString('id-ID')
})

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

const timeGreeting = computed(() => {
  const hour = new Date().getHours()
  if (hour >= 4 && hour < 11) {
    return { text: 'Selamat pagi', emoji: '☀️' }
  } else if (hour >= 11 && hour < 15) {
    return { text: 'Selamat siang', emoji: '🌤️' }
  } else if (hour >= 15 && hour < 18) {
    return { text: 'Selamat sore', emoji: '🌅' }
  } else {
    return { text: 'Selamat malam', emoji: '🌙' }
  }
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

// 3 Task Harian untuk Container Tugas Hari Ini (dengan Deadline Tenggat Waktu Seragam)
const displayedDailyTasks = computed(() => {
  const defaultTasks = [
    { id: 'task-1', title: 'Catat Penjualan & Modal Harian', deadline: 'Hari ini, 17:00 WIB', link: '/dashboard/progres' },
    { id: 'task-2', title: 'Perbarui Bukti Pembukuan Kas', deadline: 'Hari ini, 17:00 WIB', link: '/dashboard/rencana-aksi' },
    { id: 'task-3', title: 'Cek Kelengkapan Izin Usaha NIB', deadline: 'Hari ini, 17:00 WIB', link: '/dashboard/penilaian' }
  ]
  const tasks = (umkmStore.tasks || []).slice(0, 3)
  if (tasks.length < 3) {
    return defaultTasks
  }
  return tasks.map((t, idx) => ({
    ...t,
    deadline: 'Hari ini, 17:00 WIB',
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

const calculatedHppAmount = computed(() => Math.round(45100000 * activeBranchRatio.value))
const calculatedOpexAmount = computed(() => Math.round(22300000 * activeBranchRatio.value))
const calculatedProfitAmount = computed(() => Math.round(32600000 * activeBranchRatio.value))
const totalCalculatedOmzet = computed(() => Math.round(100000000 * activeBranchRatio.value))

function formatDisplayedAmount(val: number) {
  return 'Rp ' + val.toLocaleString('id-ID')
}

// Donut Chart State & Controls (Gaya Minimalis Modern Referensi)
const donutCanvas = ref<HTMLCanvasElement | null>(null)
let donutChartInstance: any = null
const activeHoveredItem = ref<any | null>(null)

const breakdownItems = computed(() => [
  {
    label: 'Modal Jualan',
    amount: calculatedHppAmount.value,
    percent: calculatedHppPercent.value,
    color: '#156374',
    badgeClass: 'bg-cyan-50 text-[#156374] border-cyan-200 dark:bg-cyan-950/60 dark:text-cyan-300 dark:border-cyan-800'
  },
  {
    label: 'Biaya Operasional',
    amount: calculatedOpexAmount.value,
    percent: calculatedOpexPercent.value,
    color: '#50AABF',
    badgeClass: 'bg-sky-50 text-[#2091AA] border-sky-200 dark:bg-sky-950/60 dark:text-sky-300 dark:border-sky-800'
  },
  {
    label: 'Untung Bersih',
    amount: calculatedProfitAmount.value,
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
            calculatedHppAmount.value,
            calculatedOpexAmount.value,
            calculatedProfitAmount.value
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
      cutout: '68%',
      onHover: (_event: any, elements: any[]) => {
        if (elements && elements.length > 0) {
          const index = elements[0].index
          activeHoveredItem.value = breakdownItems.value[index] || null
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
    calculatedHppAmount.value,
    calculatedOpexAmount.value,
    calculatedProfitAmount.value
  ]
  donutChartInstance.data.datasets[0].backgroundColor = ['#156374', '#50AABF', '#00AA13']
  donutChartInstance.data.datasets[0].borderWidth = 0
  donutChartInstance.data.datasets[0].hoverOffset = 0
  donutChartInstance.data.datasets[0].borderRadius = 6
  donutChartInstance.data.datasets[0].spacing = 4
  donutChartInstance.options.circumference = 360
  donutChartInstance.options.cutout = '68%'
  donutChartInstance.update()
}

watch(donutCanvas, (newEl) => {
  if (newEl) {
    nextTick(() => {
      initDonutChart()
    })
  }
})

watch(activeBranchRatio, () => {
  nextTick(() => {
    updateDonutChart()
  })
})

// Hero Shadcn UI Chart Config, Preview Switcher & Period Logic
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

function handleClickOutsideDashboard(event: MouseEvent) {
  const target = event.target as Node
  if (chartTypeDropdownRef.value && !chartTypeDropdownRef.value.contains(target)) {
    isChartTypeDropdownOpen.value = false
  }
  if (periodDropdownRef.value && !periodDropdownRef.value.contains(target)) {
    isPeriodDropdownOpen.value = false
  }
}

function handleKeydownEscape(event: KeyboardEvent) {
  if (event.key === 'Escape') {
    isChartTypeDropdownOpen.value = false
    isPeriodDropdownOpen.value = false
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

const heroPeriodFilter = ref<'3m' | '6m' | '1y'>('6m')

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
  const ratio = activeBranchRatio.value
  const records = (umkmStore.monthlyRecords || []).map(r => ({
    ...r,
    omzet: Math.round((r.omzet || 0) * ratio),
    hpp: Math.round((r.hpp || 0) * ratio),
    opex: Math.round((r.opex || 0) * ratio),
    outflow: Math.round(((r.hpp || 0) + (r.opex || 0)) * ratio),
    netProfit: Math.round((r.netProfit || 0) * ratio),
    cashBalance: Math.round((r.cashBalance || 0) * ratio)
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
  const headers = ['Bulan', 'Tahun', 'Total Pendapatan', 'Modal Jualan', 'Biaya Operasional', 'Rugi', 'Untung Bersih']
  const rows = records.map(r => [
    `"${r.month}"`,
    r.year,
    r.omzet,
    r.hpp,
    r.opex,
    (r as any).loss || 0,
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
  link.setAttribute('download', `Laporan_Keuangan_Terbaru_${umkmName.value.replace(/\s+/g, '_')}_2026.csv`)
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

  // Initialize Branches & Charts
  umkmStore.initBranchesFromStorage()
  initDonutChart()

  if (import.meta.client) {
    document.addEventListener('click', handleClickOutsideDashboard)
    document.addEventListener('keydown', handleKeydownEscape)
  }
})

onBeforeUnmount(() => {
  if (donutChartInstance) {
    donutChartInstance.destroy()
    donutChartInstance = null
  }
  if (import.meta.client) {
    document.removeEventListener('click', handleClickOutsideDashboard)
    document.removeEventListener('keydown', handleKeydownEscape)
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
/* Hilangkan efek shadow, set background putih #FFFFFF & pertebal stroke konsisten pada container di halaman beranda */
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
