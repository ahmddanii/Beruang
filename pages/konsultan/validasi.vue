<template>
  <div class="space-y-6 sm:space-y-8 pb-16 font-sans">
    
    <!-- 1. HEADER CARD (Tactile GoPay Style) -->
    <div class="card-tactile-gopay rounded-3xl p-6 sm:p-7 text-left">
      <div class="space-y-1">
        <h1 class="text-xl sm:text-2xl font-poppins font-bold text-neutral-900 dark:text-white">
          Validasi Kas & Laporan Bulanan UMKM
        </h1>
        <p class="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 max-w-2xl">
          Verifikasi kesesuaian laporan keuangan bulanan yang diinput UMKM terhadap bukti transaksi rekening koran & struk POS untuk standar calon investor.
        </p>
      </div>
    </div>

    <!-- 2. QUICK TELEMETRY STATS CARDS (Menggunakan Style BMetricBannerCard Dashboard) -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-stretch">
      <!-- Total Antrean -->
      <BMetricBannerCard
        title="TOTAL ANTREAN"
        :icon="Task01Icon"
        :value="konsultanStore.validationsQueue.length"
        unit="Laporan"
        subtitle="Status"
        subvalue="Perlu Tindakan"
        subvalue-color="amber"
        class="cursor-pointer transition-all duration-150 hover:-translate-y-0.5 active:translate-y-0"
        @click="setTab('queue')"
      />

      <!-- Kas Terverifikasi -->
      <BMetricBannerCard
        title="TERVERIFIKASI"
        :icon="CheckmarkCircle01Icon"
        :value="verifiedCount"
        unit="Laporan"
        subtitle="Status"
        subvalue="Tuntas Sah"
        subvalue-color="green"
        class="cursor-pointer transition-all duration-150 hover:-translate-y-0.5 active:translate-y-0"
        @click="setTab('history')"
      />

      <!-- Total Omzet Diperiksa -->
      <BMetricBannerCard
        title="TOTAL OMZET"
        :icon="Money03Icon"
        :value="totalOmzetFormatted"
        unit="Juta"
        subtitle="Cakupan"
        subvalue="Semua UMKM"
        subvalue-color="blue"
        class="transition-all duration-150"
      />

      <!-- Rata-rata Margin Bersih -->
      <BMetricBannerCard
        title="RATA-RATA MARGIN"
        :icon="AnalyticsUpIcon"
        :value="avgMarginPct"
        unit="%"
        subtitle="Kondisi"
        subvalue="Sehat Ideal"
        subvalue-color="green"
        class="transition-all duration-150"
      />
    </div>

    <!-- 3. Macro Segmented Pill Switcher (Tab Navigasi Makro - GoPay Green Edition Sesuai Klien Aktif & Permintaan Masuk) -->
    <div class="segmented-pill-container is-gopay-green w-full relative">
      <!-- GSAP Animated Sliding Pill Indicator -->
      <div
        ref="tabIndicatorRef"
        class="segmented-pill-indicator"
        aria-hidden="true"
      />

      <!-- Tab 1: Antrean Menunggu Validasi -->
      <button
        type="button"
        :ref="el => setTabButtonRef('queue', el)"
        class="segmented-pill-btn group"
        :class="activeTab === 'queue' ? 'is-active' : 'is-inactive'"
        @click="setTab('queue')"
      >
        <HugeiconsIcon
          :icon="Task01Icon"
          :size="16"
          :stroke-width="activeTab === 'queue' ? 2.2 : 1.8"
          class="mr-2 shrink-0 transition-colors"
        />
        <span class="truncate">Antrean Menunggu Validasi</span>
        <span
          v-if="konsultanStore.validationsQueue.length > 0"
          :class="[
            'ml-2 px-2 py-0.5 rounded-full text-[11px] font-bold tabular-nums leading-none transition-colors',
            activeTab === 'queue'
              ? 'bg-white/25 text-white'
              : 'bg-amber-500/15 text-amber-700 dark:text-amber-300 border border-amber-300/50 dark:border-transparent animate-pulse'
          ]"
        >
          {{ konsultanStore.validationsQueue.length }} Antrean
        </span>
        <span
          v-else
          :class="[
            'ml-2 px-2 py-0.5 rounded-full text-[11px] font-medium tabular-nums leading-none transition-colors',
            activeTab === 'queue'
              ? 'bg-white/25 text-white'
              : 'bg-neutral-300/60 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400'
          ]"
        >
          0
        </span>
      </button>

      <!-- Tab 2: Riwayat Kas Terverifikasi -->
      <button
        type="button"
        :ref="el => setTabButtonRef('history', el)"
        class="segmented-pill-btn group"
        :class="activeTab === 'history' ? 'is-active' : 'is-inactive'"
        @click="setTab('history')"
      >
        <HugeiconsIcon
          :icon="CheckmarkCircle01Icon"
          :size="16"
          :stroke-width="activeTab === 'history' ? 2.2 : 1.8"
          class="mr-2 shrink-0 transition-colors"
        />
        <span class="truncate">Riwayat Buku Kas Terverifikasi</span>
        <span
          :class="[
            'ml-2 px-2 py-0.5 rounded-full text-[11px] font-bold tabular-nums leading-none transition-colors',
            activeTab === 'history'
              ? 'bg-white/25 text-white'
              : 'bg-neutral-300/60 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300'
          ]"
        >
          {{ (konsultanStore.validatedHistory || []).length }}
        </span>
      </button>
    </div>

    <!-- Notification Toast if action successful -->
    <transition enter-active-class="transition duration-200 ease-out" enter-from-class="opacity-0 -translate-y-2" enter-to-class="opacity-100 translate-y-0">
      <div
        v-if="toastMsg"
        class="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 flex items-center justify-between gap-3 text-xs text-emerald-800 dark:text-emerald-200"
      >
        <div class="flex items-center gap-2.5">
          <HugeiconsIcon :icon="CheckmarkCircle01Icon" :size="18" class="text-emerald-600 dark:text-emerald-400 shrink-0" />
          <span>{{ toastMsg }}</span>
        </div>
        <button type="button" @click="toastMsg = ''" class="text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 font-bold px-2 py-1 cursor-pointer">✕</button>
      </div>
    </transition>

    <!-- 4. MAIN CARD: DUA SUB-TAB (ANTREAN MENUNGGU VALIDASI & RIWAYAT TERVERIFIKASI) Identik Klien Aktif & Permintaan Masuk -->
    <div class="card-tactile-gopay p-6 sm:p-8 rounded-3xl space-y-6 text-left">
      <!-- Search & Filter Controls: Search memanjang penuh ke kiri, Filter di kanan persis Klien Aktif -->
      <div class="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
        <!-- 1. Search Field -->
        <div class="relative flex-1">
          <div class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-400">
            <HugeiconsIcon :icon="Search01Icon" :size="16" :stroke-width="1.8" />
          </div>
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Cari nama UMKM, bulan, dokumen bukti, atau catatan..."
            class="w-full pl-10 pr-4 py-2.5 rounded-full text-xs border border-neutral-200 dark:border-white/10 bg-white dark:bg-[#1A1D26] text-neutral-900 dark:text-white placeholder-neutral-400 focus:outline-none focus:border-[#0081A0] focus:ring-2 focus:ring-[#0081A0]/20 transition-all shadow-2xs"
          />
        </div>

        <!-- 2. Dropdown Filter Klien Binaan -->
        <div class="relative shrink-0 min-w-[180px]">
          <div class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-400">
            <HugeiconsIcon :icon="FilterIcon" :size="14" :stroke-width="2" />
          </div>
          <select
            v-model="selectedClient"
            class="w-full pl-9 pr-8 py-2.5 rounded-full text-xs font-poppins font-medium border border-neutral-200 dark:border-white/10 bg-white dark:bg-[#1A1D26] text-neutral-800 dark:text-neutral-100 focus:outline-none focus:border-[#0081A0] focus:ring-2 focus:ring-[#0081A0]/20 transition-all appearance-none cursor-pointer shadow-2xs"
          >
            <option value="ALL">Semua Klien Binaan</option>
            <option
              v-for="c in konsultanStore.clients"
              :key="c.id"
              :value="c.name"
            >
              {{ c.name }}
            </option>
          </select>
          <div class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-neutral-400">
            <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>

        <!-- 3. Dropdown Filter Periode Bulan -->
        <div class="relative shrink-0 min-w-[150px]">
          <select
            v-model="selectedPeriod"
            class="w-full px-4 pr-8 py-2.5 rounded-full text-xs font-poppins font-medium border border-neutral-200 dark:border-white/10 bg-white dark:bg-[#1A1D26] text-neutral-800 dark:text-neutral-100 focus:outline-none focus:border-[#0081A0] focus:ring-2 focus:ring-[#0081A0]/20 transition-all appearance-none cursor-pointer shadow-2xs"
          >
            <option value="ALL">Semua Periode</option>
            <option value="September 2026">September 2026</option>
            <option value="Agustus 2026">Agustus 2026</option>
            <option value="Juli 2026">Juli 2026</option>
          </select>
          <div class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-neutral-400">
            <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>

        <!-- 4. Reset Filter Button (Jika filter aktif) -->
        <div v-if="hasActiveFilters" class="flex items-center shrink-0">
          <button
            type="button"
            class="px-3.5 py-2.5 rounded-full text-xs font-poppins font-semibold text-neutral-600 dark:text-neutral-300 bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors flex items-center justify-center gap-1.5 cursor-pointer whitespace-nowrap shadow-2xs"
            @click="resetFilters"
          >
            <span>Reset</span>
          </button>
        </div>
      </div>

      <!-- =================================================================== -->
      <!-- TAB 1 CONTENT: ANTREAN MENUNGGU VALIDASI                            -->
      <!-- =================================================================== -->
      <div v-if="activeTab === 'queue'" class="gsap-validasi-tab-content space-y-6">
      <!-- Empty State if no pending validations -->
      <div
        v-if="filteredQueue.length === 0"
        class="card-tactile-gopay rounded-3xl p-10 sm:p-14 text-center border border-neutral-200/80 dark:border-neutral-800/80 bg-white dark:bg-[#13161F]"
      >
        <div class="w-14 h-14 mx-auto rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 flex items-center justify-center mb-3.5 shadow-xs">
          <HugeiconsIcon :icon="CheckmarkCircle01Icon" :size="28" :stroke-width="2" />
        </div>
        <h3 class="font-poppins font-bold text-base sm:text-lg text-neutral-900 dark:text-white">
          {{ hasActiveFilters ? 'Tidak Ada Antrean yang Cocok dengan Filter' : 'Semua Laporan Kas Telah Tervalidasi!' }}
        </h3>
        <p class="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 max-w-md mx-auto mt-1 leading-relaxed">
          {{ hasActiveFilters ? 'Coba ubah kata kunci pencarian atau sesuaikan pilihan filter untuk menemukan berkas pelaporan lainnya.' : 'Bagus sekali! Tidak ada berkas buku kas bulanan UMKM yang tertunda saat ini. Semua laporan telah diperiksa.' }}
        </p>
        <button
          v-if="hasActiveFilters"
          type="button"
          class="mt-4 px-4 py-2 rounded-xl text-xs font-poppins font-semibold text-[#0081A0] bg-blue-50 dark:bg-blue-950/40 hover:bg-blue-100 transition-colors"
          @click="resetFilters"
        >
          Reset Filter Pencarian
        </button>
      </div>

      <!-- List of Validation Cards (Inspirasi Lengkap dari Tab Validasi Klien UMKM) -->
      <div v-else class="space-y-6">
        <div
          v-for="item in filteredQueue"
          :key="item.id"
          class="card-tactile-gopay rounded-3xl p-6 sm:p-7 space-y-6 border border-neutral-200/80 dark:border-neutral-800/80 bg-white dark:bg-[#13161F] text-left transition-all"
        >
          <!-- Top Row: Client Info, Periode, Diajukan Pada, & Margin Summary -->
          <div class="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-neutral-100 dark:border-neutral-800 gap-3">
            <div class="space-y-1">
              <div class="flex items-center gap-2 flex-wrap">
                <!-- Client Pill Link -->
                <NuxtLink
                  :to="`/konsultan/klien/${item.clientId}`"
                  class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-poppins font-bold text-neutral-800 dark:text-neutral-200 bg-neutral-100 dark:bg-neutral-800/80 hover:bg-neutral-200 hover:text-[#0081A0] transition-colors"
                >
                  <HugeiconsIcon :icon="Store01Icon" :size="13" class="text-neutral-500" />
                  <span>{{ item.clientName }}</span>
                </NuxtLink>

                <!-- Period Badge -->
                <span class="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-blue-50 dark:bg-blue-950/50 text-[#0081A0] dark:text-[#2091AA] border border-blue-200/60 dark:border-blue-800/60">
                  Periode: {{ item.month }}
                </span>

                <!-- Client ID Tag -->
                <span class="text-[11px] text-neutral-400 font-mono">ID: {{ item.clientId }}</span>
              </div>

              <p class="text-xs text-neutral-500 dark:text-neutral-400 font-poppins pt-0.5">
                Diajukan pada {{ item.submittedAt }} • Menunggu pengesahan resmi konsultan
              </p>
            </div>

            <!-- Calculated Margin Indicator -->
            <div class="flex items-center gap-3 sm:text-right shrink-0">
              <div class="px-3 py-1.5 rounded-xl bg-neutral-50 dark:bg-neutral-800/50 border border-neutral-200/60 dark:border-neutral-700/60">
                <span class="text-[10px] text-neutral-400 block font-medium uppercase tracking-wider">Margin Kotor</span>
                <span class="text-sm font-poppins font-extrabold text-[#0081A0] dark:text-[#2091AA] tabular-nums">
                  {{ Math.round(((item.omzet - item.hpp) / item.omzet) * 100) }}%
                </span>
              </div>
              <div class="px-3 py-1.5 rounded-xl bg-emerald-50/80 dark:bg-emerald-950/40 border border-emerald-200/60 dark:border-emerald-800/60">
                <span class="text-[10px] text-emerald-600/80 dark:text-emerald-400/80 block font-medium uppercase tracking-wider">Untung Bersih</span>
                <span class="text-sm font-poppins font-extrabold text-[#00AA13] dark:text-emerald-400 tabular-nums">
                  {{ Math.round(((item.omzet - item.hpp - item.opex) / item.omzet) * 100) }}%
                </span>
              </div>
            </div>
          </div>

          <!-- 4 Financial Metrics Bento (Inspirasi Presisi Halaman Klien UMKM) -->
          <div class="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            <!-- Omzet Penjualan -->
            <div class="p-4 rounded-2xl bg-[#F6F8FA] dark:bg-[#18191E] border border-neutral-200/70 dark:border-neutral-800 space-y-1">
              <span class="text-xs text-neutral-500 font-medium">Omzet Penjualan</span>
              <div class="flex items-baseline gap-1 mt-0.5">
                <span class="font-poppins font-extrabold text-lg sm:text-xl text-[#0081A0] dark:text-[#2091AA] tabular-nums">
                  Rp {{ item.omzet.toLocaleString('id-ID') }}
                </span>
              </div>
              <p class="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
                ↑ Pelaporan Kas Masuk
              </p>
            </div>

            <!-- Modal Jualan (HPP) -->
            <div class="p-4 rounded-2xl bg-[#F6F8FA] dark:bg-[#18191E] border border-neutral-200/70 dark:border-neutral-800 space-y-1">
              <span class="text-xs text-neutral-500 font-medium">Modal Jualan (HPP)</span>
              <div class="flex items-baseline gap-1 mt-0.5">
                <span class="font-poppins font-extrabold text-lg sm:text-xl text-rose-600 dark:text-rose-400 tabular-nums">
                  Rp {{ item.hpp.toLocaleString('id-ID') }}
                </span>
              </div>
              <p class="text-[11px] text-neutral-500 dark:text-neutral-400">
                Rasio HPP {{ Math.round((item.hpp / item.omzet) * 100) }}%
              </p>
            </div>

            <!-- Beban Operasional -->
            <div class="p-4 rounded-2xl bg-[#F6F8FA] dark:bg-[#18191E] border border-neutral-200/70 dark:border-neutral-800 space-y-1">
              <span class="text-xs text-neutral-500 font-medium">Beban Operasional</span>
              <div class="flex items-baseline gap-1 mt-0.5">
                <span class="font-poppins font-extrabold text-lg sm:text-xl text-neutral-900 dark:text-white tabular-nums">
                  Rp {{ item.opex.toLocaleString('id-ID') }}
                </span>
              </div>
              <p class="text-[11px] text-neutral-500 dark:text-neutral-400">
                Gaji tim, sewa & utilitas
              </p>
            </div>

            <!-- Untung Bersih Riil -->
            <div class="p-4 rounded-2xl bg-[#F6F8FA] dark:bg-[#18191E] border border-neutral-200/70 dark:border-neutral-800 space-y-1">
              <span class="text-xs text-neutral-500 font-medium">Untung Bersih Riil</span>
              <div class="flex items-baseline gap-1 mt-0.5">
                <span class="font-poppins font-extrabold text-lg sm:text-xl text-[#00AA13] dark:text-emerald-400 tabular-nums">
                  Rp {{ (item.omzet - item.hpp - item.opex).toLocaleString('id-ID') }}
                </span>
              </div>
              <p class="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
                Margin Bersih {{ Math.round(((item.omzet - item.hpp - item.opex) / item.omzet) * 100) }}%
              </p>
            </div>
          </div>

          <!-- Bukti Dokumen Terlampir dari UMKM (Inspirasi Presisi Halaman Klien UMKM) -->
          <div class="space-y-3">
            <h4 class="font-poppins font-bold text-xs sm:text-sm text-neutral-900 dark:text-white flex items-center gap-2">
              <HugeiconsIcon :icon="File01Icon" :size="16" class="text-[#0081A0]" />
              <span>Dokumen Bukti Keuangan Terlampir</span>
            </h4>

            <div class="p-3.5 rounded-2xl bg-[#F6F8FA] dark:bg-[#18191E] border border-neutral-200/70 dark:border-neutral-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/40 text-[#0081A0] flex items-center justify-center shrink-0">
                  <HugeiconsIcon :icon="File01Icon" :size="20" />
                </div>
                <div>
                  <p class="text-xs font-poppins font-bold text-neutral-900 dark:text-white">
                    {{ item.proofDocument }}
                  </p>
                  <p class="text-[11px] text-neutral-500 dark:text-neutral-400">
                    {{ item.notes || 'Lampiran rekap mutasi bank dan POS outlet usaha.' }}
                  </p>
                </div>
              </div>

              <div class="flex items-center gap-2 shrink-0 self-end sm:self-auto">
                <span class="px-2.5 py-1 rounded-lg text-[11px] font-semibold bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 border border-emerald-200/60 dark:border-emerald-800/60">
                  Cocok & Lengkap
                </span>
                <button
                  type="button"
                  class="px-3 py-1.5 rounded-xl text-xs font-poppins font-semibold text-[#0081A0] dark:text-[#2091AA] hover:bg-blue-100/60 dark:hover:bg-blue-950/60 transition-colors cursor-pointer"
                  @click="openDocModal(item)"
                >
                  Lihat Dokumen ↗
                </button>
              </div>
            </div>
          </div>

          <!-- Consultant Validation Notes & Action -->
          <div class="space-y-2 pt-1">
            <label class="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 font-poppins">
              Catatan Rekomendasi Validasi Konsultan (Untuk UMKM & Investor)
            </label>
            <textarea
              v-model="consultantNotesMap[item.id]"
              rows="2"
              class="w-full px-4 py-2.5 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-[#18191E] text-neutral-900 dark:text-white text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-[#00AA13]"
              :placeholder="`Tuliskan catatan hasil pemeriksaan buku kas periode ${item.month} untuk ${item.clientName}...`"
            />
          </div>

          <!-- Action Buttons -->
          <div class="pt-3 border-t border-neutral-100 dark:border-neutral-800 flex flex-col sm:flex-row items-stretch sm:items-center justify-end gap-3">
            <button
              type="button"
              class="px-4 py-2.5 rounded-xl text-xs font-poppins font-semibold border border-rose-300 dark:border-rose-800 text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors cursor-pointer"
              @click="openRevisionModal(item)"
            >
              Minta Revisi Pencatatan
            </button>
            <button
              type="button"
              class="px-5 py-2.5 rounded-xl text-xs font-poppins font-bold text-white bg-[#00AA13] hover:bg-[#009210] active:scale-[0.98] transition-all cursor-pointer shadow-sm flex items-center justify-center gap-2"
              @click="approveValidation(item)"
            >
              <HugeiconsIcon :icon="CheckmarkCircle01Icon" :size="16" />
              <span>Sahkan & Validasi Kas Bulan Ini</span>
            </button>
          </div>
        </div>
      </div>
    </div>

      <!-- =================================================================== -->
      <!-- TAB 2 CONTENT: RIWAYAT BUKU KAS TERVERIFIKASI                       -->
      <!-- =================================================================== -->
      <div v-else class="gsap-validasi-tab-content space-y-6">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-neutral-200/70 dark:border-neutral-800 gap-2">
          <div>
            <h3 class="font-poppins font-bold text-base sm:text-lg text-neutral-900 dark:text-white">
              Log Riwayat Buku Kas Terverifikasi
            </h3>
            <p class="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
              Daftar laporan keuangan bulanan seluruh UMKM binaan yang telah disahkan keabsahannya untuk calon investor.
            </p>
          </div>

          <span class="text-xs text-neutral-400 font-poppins">
            Total {{ filteredHistory.length }} Laporan Dicatat
          </span>
        </div>

        <!-- Table View -->
        <div class="overflow-x-auto -mx-6 sm:mx-0 rounded-2xl border border-neutral-200/80 dark:border-white/10 bg-white dark:bg-[#18191E] shadow-2xs">
          <table class="min-w-full text-left text-xs">
            <thead>
              <tr class="border-b border-neutral-200/70 dark:border-neutral-800 text-neutral-400 font-semibold uppercase tracking-wider text-[10px]">
                <th class="py-3 px-4 whitespace-nowrap">Periode</th>
                <th class="py-3 px-4 whitespace-nowrap">UMKM Binaan</th>
                <th class="py-3 px-4 whitespace-nowrap">Omzet Penjualan</th>
                <th class="py-3 px-4 whitespace-nowrap">Modal Jualan (HPP)</th>
                <th class="py-3 px-4 whitespace-nowrap">Untung Bersih</th>
                <th class="py-3 px-4 whitespace-nowrap">Tanggal Audit</th>
                <th class="py-3 px-4 text-center whitespace-nowrap">Status</th>
                <th class="py-3 px-4 whitespace-nowrap">Catatan Konsultan</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-neutral-100 dark:divide-neutral-800/60 font-medium">
              <tr
                v-for="log in filteredHistory"
                :key="log.id"
                class="hover:bg-neutral-50/60 dark:hover:bg-neutral-800/30 transition-colors"
              >
                <!-- Periode -->
                <td class="py-3.5 px-4 font-poppins font-bold text-neutral-900 dark:text-white whitespace-nowrap">
                  {{ log.month }}
                </td>

                <!-- UMKM Binaan -->
                <td class="py-3.5 px-4 whitespace-nowrap">
                  <NuxtLink
                    :to="`/konsultan/klien/${log.clientId}`"
                    class="font-poppins font-semibold text-neutral-800 dark:text-neutral-200 hover:text-[#0081A0] transition-colors"
                  >
                    {{ log.clientName }}
                  </NuxtLink>
                </td>

                <!-- Omzet -->
                <td class="py-3.5 px-4 text-[#0081A0] dark:text-[#2091AA] font-bold tabular-nums whitespace-nowrap">
                  Rp {{ (log.omzet / 1000000).toLocaleString('id-ID', { minimumFractionDigits: 1, maximumFractionDigits: 1 }) }} Juta
                </td>

                <!-- HPP -->
                <td class="py-3.5 px-4 text-rose-600 dark:text-rose-400 font-bold tabular-nums whitespace-nowrap">
                  Rp {{ (log.hpp / 1000000).toLocaleString('id-ID', { minimumFractionDigits: 1, maximumFractionDigits: 1 }) }} Juta
                </td>

                <!-- Untung Bersih -->
                <td class="py-3.5 px-4 text-[#00AA13] dark:text-emerald-400 font-bold tabular-nums whitespace-nowrap">
                  Rp {{ ((log.omzet - log.hpp - log.opex) / 1000000).toLocaleString('id-ID', { minimumFractionDigits: 1, maximumFractionDigits: 1 }) }} Juta
                </td>

                <!-- Tanggal Audit -->
                <td class="py-3.5 px-4 text-neutral-500 tabular-nums whitespace-nowrap">
                  {{ log.verifiedAt }}
                </td>

                <!-- Status -->
                <td class="py-3.5 px-4 text-center whitespace-nowrap">
                  <span
                    v-if="log.status === 'VERIFIED'"
                    class="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 dark:bg-emerald-950/50 text-[#00AA13] dark:text-emerald-400 border border-emerald-200/50 dark:border-emerald-800/50"
                  >
                    <HugeiconsIcon :icon="CheckmarkCircle01Icon" :size="12" />
                    Terverifikasi
                  </span>
                  <span
                    v-else
                    class="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 dark:bg-amber-950/50 text-amber-700 dark:text-amber-400 border border-amber-200/50 dark:border-amber-800/50"
                  >
                    Perlu Revisi
                  </span>
                </td>

                <!-- Catatan Konsultan -->
                <td class="py-3.5 px-4 text-neutral-600 dark:text-neutral-300 text-xs max-w-xs truncate" :title="log.consultantNotes">
                  {{ log.consultantNotes || '-' }}
                </td>
              </tr>

              <tr v-if="filteredHistory.length === 0">
                <td colspan="8" class="py-8 text-center text-neutral-400 font-poppins text-xs">
                  Tidak ada riwayat laporan kas yang sesuai filter.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- MODAL 1: PRATINJAU DOKUMEN BUKTI KEUANGAN -->
    <div
      v-if="showDocModal && selectedDocItem"
      class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs"
      @click.self="showDocModal = false"
    >
      <div class="card-tactile-gopay rounded-3xl p-6 sm:p-7 max-w-xl w-full bg-white dark:bg-[#13161F] border border-neutral-200 dark:border-neutral-800 shadow-2xl space-y-5 text-left">
        <div class="flex items-center justify-between pb-3 border-b border-neutral-100 dark:border-neutral-800">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/40 text-[#0081A0] flex items-center justify-center shrink-0">
              <HugeiconsIcon :icon="File01Icon" :size="20" />
            </div>
            <div>
              <h3 class="font-poppins font-bold text-sm sm:text-base text-neutral-900 dark:text-white">
                Pratinjau Dokumen Keuangan
              </h3>
              <p class="text-xs text-neutral-500 font-mono">
                {{ selectedDocItem.proofDocument }}
              </p>
            </div>
          </div>
          <button
            type="button"
            class="text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 p-1 cursor-pointer font-bold"
            @click="showDocModal = false"
          >
            ✕
          </button>
        </div>

        <!-- Document Details Bento -->
        <div class="space-y-3 text-xs">
          <div class="p-4 rounded-2xl bg-[#F6F8FA] dark:bg-[#18191E] border border-neutral-200/70 dark:border-neutral-800 space-y-2">
            <div class="flex justify-between">
              <span class="text-neutral-500">UMKM Pengirim:</span>
              <span class="font-semibold text-neutral-800 dark:text-neutral-200">{{ selectedDocItem.clientName }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-neutral-500">Periode Pelaporan:</span>
              <span class="font-semibold text-neutral-800 dark:text-neutral-200">{{ selectedDocItem.month }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-neutral-500">Waktu Pengunggahan:</span>
              <span class="font-mono text-neutral-700 dark:text-neutral-300">{{ selectedDocItem.submittedAt }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-neutral-500">Integritas Berkas:</span>
              <span class="font-semibold text-emerald-600 dark:text-emerald-400">Tersertifikasi SHA-256 Valid</span>
            </div>
          </div>

          <!-- Simulated PDF Transaction Excerpt -->
          <div class="p-4 rounded-2xl bg-neutral-900 text-white font-mono text-[11px] space-y-2 leading-relaxed">
            <div class="flex justify-between text-neutral-400 border-b border-neutral-800 pb-1.5">
              <span>RINGKASAN BUKTI TRANSAKSI KAS</span>
              <span class="text-emerald-400">STATUS: MATCHED</span>
            </div>
            <div class="space-y-1 text-neutral-300">
              <p>• Total Kredit Masuk (Omzet): Rp {{ selectedDocItem.omzet.toLocaleString('id-ID') }}</p>
              <p>• Total Debit Bahan Baku (HPP): Rp {{ selectedDocItem.hpp.toLocaleString('id-ID') }}</p>
              <p>• Total Pengeluaran Operasional (Opex): Rp {{ selectedDocItem.opex.toLocaleString('id-ID') }}</p>
              <p class="text-emerald-400">• Saldo Laba Terverifikasi: Rp {{ (selectedDocItem.omzet - selectedDocItem.hpp - selectedDocItem.opex).toLocaleString('id-ID') }}</p>
            </div>
            <p class="text-[10px] text-neutral-500 pt-1">
              Catatan: Berkas telah diautentikasi terhadap sinkronisasi QRIS & mutasi rekening bank usaha.
            </p>
          </div>
        </div>

        <div class="pt-2 flex justify-end gap-2.5">
          <button
            type="button"
            class="px-4 py-2 rounded-xl text-xs font-poppins font-semibold border border-neutral-300 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
            @click="showDocModal = false"
          >
            Tutup
          </button>
          <button
            type="button"
            class="px-4 py-2 rounded-xl text-xs font-poppins font-semibold bg-[#0081A0] text-white hover:bg-[#00708C] transition-colors flex items-center gap-1.5"
            @click="downloadSampleProof(selectedDocItem)"
          >
            <span>Unduh Berkas PDF Asli</span>
          </button>
        </div>
      </div>
    </div>

    <!-- MODAL 2: MINTA REVISI CATATAN KAS -->
    <div
      v-if="showRevisionModal && selectedRevisionItem"
      class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs"
      @click.self="showRevisionModal = false"
    >
      <div class="card-tactile-gopay rounded-3xl p-6 sm:p-7 max-w-lg w-full bg-white dark:bg-[#13161F] border border-neutral-200 dark:border-neutral-800 shadow-2xl space-y-4 text-left">
        <div class="space-y-1 pb-3 border-b border-neutral-100 dark:border-neutral-800">
          <h3 class="font-poppins font-bold text-base sm:text-lg text-neutral-900 dark:text-white">
            Minta Revisi Pencatatan Kas
          </h3>
          <p class="text-xs text-neutral-500 dark:text-neutral-400">
            Kirimkan instruksi perbaikan kepada <strong>{{ selectedRevisionItem.clientName }}</strong> untuk periode {{ selectedRevisionItem.month }}.
          </p>
        </div>

        <div class="space-y-2">
          <label class="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 font-poppins">
            Alasan / Bagian yang Perlu Diperbaiki
          </label>
          <textarea
            v-model="revisionReason"
            rows="3"
            class="w-full px-4 py-2.5 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-[#18191E] text-neutral-900 dark:text-white text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-rose-500"
            placeholder="Contoh: Lampiran mutasi rekening halaman 2 terpotong atau terdapat selisih HPP bahan baku sebesar Rp 1,5 jt..."
          />
        </div>

        <div class="pt-2 flex justify-end gap-2.5">
          <button
            type="button"
            class="px-4 py-2 rounded-xl text-xs font-poppins font-semibold border border-neutral-300 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
            @click="showRevisionModal = false"
          >
            Batal
          </button>
          <button
            type="button"
            class="px-4 py-2 rounded-xl text-xs font-poppins font-bold bg-rose-600 hover:bg-rose-700 text-white transition-colors"
            @click="confirmRevision"
          >
            Kirim Permintaan Revisi
          </button>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import { ref, computed, nextTick, onMounted, onBeforeUnmount } from 'vue'
import gsap from 'gsap'
import { useKonsultanStore, type ProgressValidationItem, type ProgressValidationHistoryItem } from '~/stores/konsultan'
import BMetricBannerCard from '~/components/base/BMetricBannerCard.vue'
import { HugeiconsIcon } from '@hugeicons/vue'
import {
  Task01Icon,
  CheckmarkCircle01Icon,
  Money03Icon,
  AnalyticsUpIcon,
  Search01Icon,
  FilterIcon,
  File01Icon,
  Store01Icon
} from '@hugeicons/core-free-icons'

definePageMeta({
  layout: 'dashboard'
})

const konsultanStore = useKonsultanStore()

// State Navigasi Tab & GSAP Sliding Pill Indicator (Identik dengan Klien Aktif & Permintaan Masuk)
const activeTab = ref<'queue' | 'history'>('queue')
const tabIndicatorRef = ref<HTMLElement | null>(null)
const tabButtonsRef = ref<Record<string, HTMLElement | null>>({})

function setTabButtonRef(id: string, el: any) {
  if (el) {
    tabButtonsRef.value[id] = el
  }
}

function updateTabIndicatorPosition(immediate = false) {
  const current = activeTab.value
  const indicatorEl = tabIndicatorRef.value
  if (!indicatorEl) return

  let targetEl = tabButtonsRef.value[current]
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
    // Animasi geser dengan tactile bounce back.out(1.5) khas Beruang UMKM
    gsap.to(indicatorEl, {
      x: targetLeft,
      width: targetWidth,
      opacity: 1,
      duration: 0.42,
      ease: 'back.out(1.5)',
      overwrite: 'auto'
    })
  }
}

function setTab(tab: 'queue' | 'history') {
  activeTab.value = tab
  nextTick(() => {
    updateTabIndicatorPosition()
    gsap.fromTo(
      '.gsap-validasi-tab-content',
      { opacity: 0, y: 8 },
      { opacity: 1, y: 0, duration: 0.32, ease: 'power2.out', clearProps: 'all' }
    )
  })
}

let handleResizeTabs: (() => void) | null = null

onMounted(() => {
  nextTick(() => {
    updateTabIndicatorPosition(true)
  })
  setTimeout(() => {
    updateTabIndicatorPosition(true)
  }, 100)
  setTimeout(() => {
    updateTabIndicatorPosition(true)
  }, 300)
  handleResizeTabs = () => {
    updateTabIndicatorPosition(true)
  }
  window.addEventListener('resize', handleResizeTabs)
})

onBeforeUnmount(() => {
  if (handleResizeTabs) {
    window.removeEventListener('resize', handleResizeTabs)
  }
})

// State Filter & Search
const searchQuery = ref('')
const selectedClient = ref('ALL')
const selectedPeriod = ref('ALL')
const selectedStatus = ref('ALL')

// State Catatan Konsultan per Item
const consultantNotesMap = ref<Record<string, string>>({})

// State Modals & Toast
const showDocModal = ref(false)
const selectedDocItem = ref<ProgressValidationItem | null>(null)

const showRevisionModal = ref(false)
const selectedRevisionItem = ref<ProgressValidationItem | null>(null)
const revisionReason = ref('')

const toastMsg = ref('')

// Computed Telemetry Metrics
const queueItems = computed(() => konsultanStore.validationsQueue || [])
const historyItems = computed(() => konsultanStore.validatedHistory || [])

const verifiedCount = computed(() => {
  return historyItems.value.filter(h => h.status === 'VERIFIED').length
})

const totalOmzetFormatted = computed(() => {
  const queueSum = queueItems.value.reduce((acc, curr) => acc + curr.omzet, 0)
  const historySum = historyItems.value.reduce((acc, curr) => acc + curr.omzet, 0)
  const total = queueSum + historySum
  return (total / 1000000).toLocaleString('id-ID', { maximumFractionDigits: 0 })
})

const avgMarginPct = computed(() => {
  const allItems = [
    ...queueItems.value.map(v => ((v.omzet - v.hpp - v.opex) / v.omzet) * 100),
    ...historyItems.value.map(h => ((h.omzet - h.hpp - h.opex) / h.omzet) * 100)
  ]
  if (allItems.length === 0) return '0'
  const sum = allItems.reduce((acc, curr) => acc + curr, 0)
  return Math.round(sum / allItems.length).toString()
})

const hasActiveFilters = computed(() => {
  return searchQuery.value.trim() !== '' || selectedClient.value !== 'ALL' || selectedPeriod.value !== 'ALL' || selectedStatus.value !== 'ALL'
})

// Filtered Queue
const filteredQueue = computed(() => {
  return queueItems.value.filter(item => {
    // Search Query
    if (searchQuery.value.trim()) {
      const q = searchQuery.value.toLowerCase()
      const matchClient = item.clientName.toLowerCase().includes(q)
      const matchMonth = item.month.toLowerCase().includes(q)
      const matchDoc = item.proofDocument.toLowerCase().includes(q)
      const matchNotes = (item.notes || '').toLowerCase().includes(q)
      if (!matchClient && !matchMonth && !matchDoc && !matchNotes) return false
    }

    // Client Filter
    if (selectedClient.value !== 'ALL' && item.clientName !== selectedClient.value) {
      return false
    }

    // Period Filter
    if (selectedPeriod.value !== 'ALL' && item.month !== selectedPeriod.value) {
      return false
    }

    // Status Filter (untuk antrean, statusnya selalu PENDING)
    if (selectedStatus.value === 'DONE' || selectedStatus.value === 'REVISED') {
      return false
    }

    return true
  })
})

// Filtered History
const filteredHistory = computed(() => {
  return historyItems.value.filter(item => {
    // Search Query
    if (searchQuery.value.trim()) {
      const q = searchQuery.value.toLowerCase()
      const matchClient = item.clientName.toLowerCase().includes(q)
      const matchMonth = item.month.toLowerCase().includes(q)
      const matchNotes = (item.consultantNotes || '').toLowerCase().includes(q)
      if (!matchClient && !matchMonth && !matchNotes) return false
    }

    // Client Filter
    if (selectedClient.value !== 'ALL' && item.clientName !== selectedClient.value) {
      return false
    }

    // Period Filter
    if (selectedPeriod.value !== 'ALL' && item.month !== selectedPeriod.value) {
      return false
    }

    // Status Filter
    if (selectedStatus.value === 'PENDING') {
      return false
    }
    if (selectedStatus.value === 'DONE' && item.status !== 'VERIFIED') {
      return false
    }
    if (selectedStatus.value === 'REVISED' && item.status !== 'REVISED') {
      return false
    }

    return true
  })
})

function resetFilters() {
  searchQuery.value = ''
  selectedClient.value = 'ALL'
  selectedPeriod.value = 'ALL'
  selectedStatus.value = 'ALL'
}

function openDocModal(item: ProgressValidationItem) {
  selectedDocItem.value = item
  showDocModal.value = true
}

function downloadSampleProof(item: ProgressValidationItem) {
  alert(`Mengunduh berkas keuangan terenkripsi: ${item.proofDocument}`)
  showDocModal.value = false
}

function openRevisionModal(item: ProgressValidationItem) {
  selectedRevisionItem.value = item
  revisionReason.value = ''
  showRevisionModal.value = true
}

function confirmRevision() {
  if (!selectedRevisionItem.value) return
  const item = selectedRevisionItem.value
  konsultanStore.rejectValidation(item.id, revisionReason.value || 'Catatan bukti kas perlu disesuaikan kembali.')
  showRevisionModal.value = false
  toastMsg.value = `Permintaan revisi kas periode ${item.month} telah dikirimkan ke ${item.clientName}.`
  selectedRevisionItem.value = null
}

function approveValidation(item: ProgressValidationItem) {
  const notes = consultantNotesMap.value[item.id] || 'Laporan kas bulanan telah diverifikasi sesuai bukti rekening koran & struk POS.'
  konsultanStore.approveValidation(item.id, notes)
  toastMsg.value = `Laporan kas ${item.clientName} periode ${item.month} berhasil disahkan & terverifikasi!`
}
</script>
