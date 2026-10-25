<template>
  <div class="space-y-6 sm:space-y-8 pb-20 font-sans">
    
    <!-- 1. HEADER BANNER: Portofolio & Permintaan Klien Binaan -->
    <div class="p-1.5 sm:p-2 rounded-3xl bg-neutral-200/50 dark:bg-neutral-800/40 border border-neutral-300/40 dark:border-neutral-700/30 shadow-xs">
      <div class="p-6 sm:p-8 lg:p-10 rounded-[calc(1.5rem-0.25rem)] bg-white dark:bg-[#13161F] border border-neutral-200/80 dark:border-white/10 relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div class="space-y-3 max-w-2xl relative z-10 text-left">

          <h1 class="text-2xl sm:text-3xl lg:text-4xl font-heading font-extrabold text-neutral-900 dark:text-white tracking-tight leading-tight">
            Klien
          </h1>

          <p class="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed font-sans max-w-2xl">
            Kelola arahan perbaikan klien aktif, pantau kepatuhan catatan kas, dan tinjau pengajuan bimbingan baru dari pelaku UMKM.
          </p>
        </div>
      </div>
    </div>

    <!-- 2. METRIC BANNER CARDS: TOTAL BINAAN, PERMINTAAN, SIAP MODAL -->
    <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 items-stretch">
      <!-- Card 1: Total Klien -->
      <BMetricBannerCard
        title="TOTAL KLIEN"
        :icon="UserIcon"
        :value="konsultanStore.clients.length"
        unit="Usaha"
        subtitle="Status"
        subvalue="Semua Aktif"
        subvalue-color="green"
        class="cursor-pointer transition-all hover:-translate-y-0.5"
        @click="showAllActive"
      />

      <!-- Card 2: Permintaan Masuk -->
      <BMetricBannerCard
        title="PERMINTAAN"
        :icon="UserAdd01Icon"
        :value="konsultanStore.pendingRequestsCount"
        unit="UMKM"
        subtitle="Tindakan"
        :subvalue="konsultanStore.pendingRequestsCount > 0 ? `${konsultanStore.pendingRequestsCount} Menunggu` : 'Tuntas'"
        :subvalue-color="konsultanStore.pendingRequestsCount > 0 ? 'amber' : 'green'"
        class="cursor-pointer transition-all hover:-translate-y-0.5"
        @click="setTab('permintaan')"
      />

      <!-- Card 3: Siap Modal -->
      <BMetricBannerCard
        title="SIAP MODAL"
        :icon="Award01Icon"
        :value="readyCount"
        unit="Usaha"
        subtitle="Kelayakan"
        :subvalue="`${readyCount} Siap Danai`"
        subvalue-color="green"
        class="cursor-pointer transition-all hover:-translate-y-0.5"
        @click="filterByReady"
      />
    </div>

    <!-- 3. Macro Segmented Pill Switcher (Tab Navigasi Makro - GoPay Green Edition Sesuai Rangkuman & Roadmap) -->
    <div class="segmented-pill-container is-gopay-green w-full relative">
      <!-- GSAP Animated Sliding Pill Indicator -->
      <div
        ref="tabIndicatorRef"
        class="segmented-pill-indicator"
        aria-hidden="true"
      />

      <!-- Tab 1: Klien Aktif -->
      <button
        type="button"
        :ref="el => setTabButtonRef('aktif', el)"
        class="segmented-pill-btn group"
        :class="currentTab === 'aktif' ? 'is-active' : 'is-inactive'"
        @click="setTab('aktif')"
      >
        <HugeiconsIcon
          :icon="UserIcon"
          :size="16"
          :stroke-width="currentTab === 'aktif' ? 2.2 : 1.8"
          class="mr-2 shrink-0 transition-colors"
        />
        <span class="truncate">Klien Aktif</span>
        <span
          :class="[
            'ml-2 px-2 py-0.5 rounded-full text-[11px] font-bold tabular-nums leading-none transition-colors',
            currentTab === 'aktif'
              ? 'bg-white/25 text-white'
              : 'bg-neutral-300/60 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300'
          ]"
        >
          {{ konsultanStore.clients.length }}
        </span>
      </button>

      <!-- Tab 2: Permintaan Masuk -->
      <button
        type="button"
        :ref="el => setTabButtonRef('permintaan', el)"
        class="segmented-pill-btn group"
        :class="currentTab === 'permintaan' ? 'is-active' : 'is-inactive'"
        @click="setTab('permintaan')"
      >
        <HugeiconsIcon
          :icon="UserAdd01Icon"
          :size="16"
          :stroke-width="currentTab === 'permintaan' ? 2.2 : 1.8"
          class="mr-2 shrink-0 transition-colors"
        />
        <span class="truncate">Permintaan Masuk</span>
        <span
          v-if="konsultanStore.pendingRequestsCount > 0"
          :class="[
            'ml-2 px-2 py-0.5 rounded-full text-[11px] font-bold tabular-nums leading-none transition-colors',
            currentTab === 'permintaan'
              ? 'bg-white/25 text-white'
              : 'bg-amber-500/15 text-amber-700 dark:text-amber-300 border border-amber-300/50 dark:border-transparent animate-pulse'
          ]"
        >
          {{ konsultanStore.pendingRequestsCount }} Baru
        </span>
        <span
          v-else
          :class="[
            'ml-2 px-2 py-0.5 rounded-full text-[11px] font-medium tabular-nums leading-none transition-colors',
            currentTab === 'permintaan'
              ? 'bg-white/25 text-white'
              : 'bg-neutral-300/60 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400'
          ]"
        >
          0
        </span>
      </button>
    </div>

    <!-- 4. MAIN CARD: DUA SUB-TAB (KLIEN AKTIF & PERMINTAAN MASUK) -->
    <div class="card-tactile-gopay p-6 sm:p-8 rounded-3xl space-y-6 text-left">
      <!-- =================================================================== -->
      <!-- TAB 1 CONTENT: DAFTAR KLIEN AKTIF                                   -->
      <!-- =================================================================== -->
      <div v-if="currentTab === 'aktif'" class="gsap-klien-tab-content space-y-6">
        <!-- Search & Filter Controls: Search memanjang penuh ke kiri, Filter di kanan -->
        <div class="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <!-- 1. Search Field -->
          <div class="relative flex-1">
            <div class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-400">
              <HugeiconsIcon :icon="Search01Icon" :size="16" :stroke-width="1.8" />
            </div>
            <input
              v-model="searchClient"
              type="text"
              placeholder="Cari nama usaha, pemilik, atau kota binaan..."
              class="w-full pl-10 pr-4 py-2.5 rounded-full text-xs border border-neutral-200 dark:border-white/10 bg-white dark:bg-[#1A1D26] text-neutral-900 dark:text-white placeholder-neutral-400 focus:outline-none focus:border-[#0081A0] focus:ring-2 focus:ring-[#0081A0]/20 transition-all shadow-2xs"
            />
          </div>

          <!-- 2. Filter Dropdown -->
          <div class="relative shrink-0 min-w-[180px]">
            <div class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-400">
              <HugeiconsIcon :icon="FilterIcon" :size="14" :stroke-width="2" />
            </div>
            <select
              v-model="selectedClientFilter"
              class="w-full pl-9 pr-8 py-2.5 rounded-full text-xs font-semibold border border-neutral-200 dark:border-white/10 bg-white dark:bg-[#1A1D26] text-neutral-800 dark:text-neutral-100 focus:outline-none focus:border-[#0081A0] focus:ring-2 focus:ring-[#0081A0]/20 transition-all shadow-2xs appearance-none cursor-pointer"
            >
              <option
                v-for="f in clientFilterOptions"
                :key="f.key"
                :value="f.key"
              >
                {{ f.label }}
              </option>
            </select>
            <div class="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-neutral-400">
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>

        <!-- Client Cards Grid -->
        <div v-if="filteredClients.length > 0" class="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div
            v-for="client in filteredClients"
            :key="client.id"
            class="p-5 sm:p-6 rounded-2xl bg-white dark:bg-[#18191E] border border-neutral-200/80 dark:border-white/10 hover:border-[#0081A0]/60 dark:hover:border-[#0081A0]/60 transition-all shadow-xs flex flex-col justify-between space-y-4"
          >
            <!-- Top Row: Identitas Klien & Skor -->
            <div class="flex items-start justify-between gap-3">
              <div class="space-y-1">
                <span class="text-[10px] text-neutral-400 font-bold uppercase tracking-wider block">
                  {{ client.sector }}
                </span>
                <h3 class="font-heading font-extrabold text-lg text-neutral-900 dark:text-white leading-tight">
                  {{ client.name }}
                </h3>
                <p class="text-xs text-neutral-500 dark:text-neutral-400 font-sans">
                  Pemilik: <strong class="text-neutral-800 dark:text-neutral-200">{{ client.owner }}</strong> • {{ client.city }}
                </p>
              </div>

              <!-- Health Badge -->
              <div class="flex items-center gap-2 shrink-0">
                <span
                  :class="[
                    'inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border shrink-0',
                    client.status === 'healthy'
                      ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800'
                      : client.status === 'warning'
                      ? 'bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800'
                      : 'bg-red-50 dark:bg-red-950/60 text-red-700 dark:text-red-300 border-red-200 dark:border-red-800'
                  ]"
                >
                  <span
                    :class="[
                      'w-1.5 h-1.5 rounded-full',
                      client.status === 'healthy' ? 'bg-emerald-500' : client.status === 'warning' ? 'bg-amber-500' : 'bg-red-500'
                    ]"
                  />
                  <span>Skor: {{ client.healthScore }}/100</span>
                </span>
              </div>
            </div>

            <!-- Key Metrics Triage Row -->
            <div class="grid grid-cols-3 gap-2.5 p-3 rounded-xl bg-neutral-50 dark:bg-[#13161F] border border-neutral-200/70 dark:border-white/5 text-center">
              <div>
                <span class="text-[10px] text-neutral-400 block font-semibold uppercase">Target Modal</span>
                <span class="text-xs font-extrabold text-neutral-900 dark:text-white tabular-nums">
                  Rp {{ (client.fundingTarget / 1000000).toFixed(0) }} Jt
                </span>
              </div>
              <div>
                <span class="text-[10px] text-neutral-400 block font-semibold uppercase">Action Plan</span>
                <span class="text-xs font-extrabold text-[#0081A0] dark:text-[#2091AA] tabular-nums">
                  {{ client.tasksCompleted }}/{{ client.totalTasks }} Tuntas
                </span>
              </div>
              <div>
                <span class="text-[10px] text-neutral-400 block font-semibold uppercase">Pertumbuhan</span>
                <span :class="['text-xs font-extrabold tabular-nums', client.growthPct >= 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-500']">
                  {{ client.growthPct >= 0 ? `+${client.growthPct}%` : `${client.growthPct}%` }}
                </span>
              </div>
            </div>

            <!-- Footer Actions: Beri Action Plan & Detail Diagnosa -->
            <div class="flex items-center justify-between pt-3 border-t border-neutral-100 dark:border-neutral-800 text-xs gap-2">
              <div class="flex items-center gap-1.5 text-neutral-400 text-[11px] truncate">
                <span>Audit: {{ client.lastAuditDate }}</span>
                <span v-if="client.monthlyFee" class="text-emerald-600 dark:text-emerald-400 font-semibold">• Fee: Rp {{ (client.monthlyFee / 1000000).toFixed(1) }} Jt/bln</span>
              </div>

              <div class="flex items-center shrink-0">
                <NuxtLink
                  :to="`/konsultan/klien/${client.id}`"
                  class="px-3.5 py-1.5 rounded-full bg-[#0081A0] hover:bg-[#00708C] text-white font-bold text-xs transition-all flex items-center gap-1.5 shadow-2xs group cursor-pointer"
                >
                  <span>Lihat Detail Klien</span>
                  <HugeiconsIcon :icon="ArrowRight01Icon" :size="13" :stroke-width="2" class="transition-transform group-hover:translate-x-0.5" />
                </NuxtLink>
              </div>
            </div>
          </div>
        </div>

        <div
          v-else
          class="py-12 text-center text-xs text-neutral-500"
        >
          Tidak ada data klien binaan pada filter pencarian ini.
        </div>
      </div>

      <!-- =================================================================== -->
      <!-- TAB 2 CONTENT: PERMINTAAN BIMBINGAN MASUK                           -->
      <!-- =================================================================== -->
      <div v-else class="gsap-klien-tab-content space-y-6">
        <!-- Search & Filter Controls -->
        <div class="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <!-- 1. Search Field -->
          <div class="relative flex-1">
            <div class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-400">
              <HugeiconsIcon :icon="Search01Icon" :size="16" :stroke-width="1.8" />
            </div>
            <input
              v-model="searchRequest"
              type="text"
              placeholder="Cari nama usaha, pemilik, atau kota pengaju..."
              class="w-full pl-10 pr-4 py-2.5 rounded-full text-xs border border-neutral-200 dark:border-white/10 bg-white dark:bg-[#1A1D26] text-neutral-900 dark:text-white placeholder-neutral-400 focus:outline-none focus:border-[#0081A0] focus:ring-2 focus:ring-[#0081A0]/20 transition-all shadow-2xs"
            />
          </div>

          <!-- 2. Sort / Filter Dropdown (Fee Termahal, Termurah, Omzet, Skor) -->
          <div class="relative shrink-0 min-w-[200px]">
            <div class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-400">
              <HugeiconsIcon :icon="FilterIcon" :size="14" :stroke-width="2" />
            </div>
            <select
              v-model="selectedRequestSort"
              class="w-full pl-9 pr-8 py-2.5 rounded-full text-xs font-semibold border border-neutral-200 dark:border-white/10 bg-white dark:bg-[#1A1D26] text-neutral-800 dark:text-neutral-100 focus:outline-none focus:border-[#0081A0] focus:ring-2 focus:ring-[#0081A0]/20 transition-all shadow-2xs appearance-none cursor-pointer"
            >
              <option
                v-for="opt in requestSortOptions"
                :key="opt.key"
                :value="opt.key"
              >
                {{ opt.label }}
              </option>
            </select>
            <div class="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-neutral-400">
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>

        <!-- Request Cards List -->
        <!-- Request Cards Grid (Identik dengan Klien Aktif) -->
        <div v-if="filteredRequests.length > 0" class="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div
            v-for="req in filteredRequests"
            :key="req.id"
            class="p-5 sm:p-6 rounded-2xl bg-white dark:bg-[#18191E] border border-neutral-200/80 dark:border-white/10 hover:border-[#0081A0]/60 dark:hover:border-[#0081A0]/60 transition-all shadow-xs flex flex-col justify-between space-y-4 text-left"
          >
            <!-- Top Row: Identitas Usaha & Skor Kesehatan -->
            <div class="flex items-start justify-between gap-3">
              <div class="space-y-1">
                <span class="text-[10px] text-neutral-400 font-bold uppercase tracking-wider block">
                  {{ req.sector }}
                </span>
                <h3 class="font-heading font-extrabold text-lg text-neutral-900 dark:text-white leading-tight">
                  {{ req.businessName }}
                </h3>
                <p class="text-xs text-neutral-500 dark:text-neutral-400 font-sans">
                  Pemilik: <strong class="text-neutral-800 dark:text-neutral-200">{{ req.ownerName }}</strong> • {{ req.city }}
                </p>
              </div>

              <!-- Health Score Badge (Identik dengan Klien Aktif) -->
              <span
                :class="[
                  'inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border shrink-0',
                  req.healthScore >= 75
                    ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800'
                    : req.healthScore >= 60
                    ? 'bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800'
                    : 'bg-red-50 dark:bg-red-950/60 text-red-700 dark:text-red-300 border-red-200 dark:border-red-800'
                ]"
              >
                <span
                  :class="[
                    'w-1.5 h-1.5 rounded-full',
                    req.healthScore >= 75 ? 'bg-emerald-500' : req.healthScore >= 60 ? 'bg-amber-500' : 'bg-red-500'
                  ]"
                />
                <span>Skor: {{ req.healthScore }}/100</span>
              </span>
            </div>

            <!-- Key Metrics Triage Row (Identik 3 Kolom) -->
            <div class="grid grid-cols-3 gap-2.5 p-3 rounded-xl bg-neutral-50 dark:bg-[#13161F] border border-neutral-200/70 dark:border-white/5 text-center">
              <div>
                <span class="text-[10px] text-neutral-400 block font-semibold uppercase">Omzet/Bulan</span>
                <span class="text-xs font-extrabold text-neutral-900 dark:text-white tabular-nums">
                  Rp {{ (req.revenue / 1000000).toFixed(0) }} Jt
                </span>
              </div>
              <div>
                <span class="text-[10px] text-neutral-400 block font-semibold uppercase">Tawaran Fee</span>
                <span class="text-xs font-extrabold text-[#0081A0] dark:text-[#2091AA] tabular-nums">
                  Rp {{ (((req.offeredFee || (req.revenue >= 35000000 ? 2000000 : req.revenue >= 25000000 ? 1500000 : 1200000))) / 1000000).toFixed(1) }} Jt
                </span>
              </div>
              <div>
                <span class="text-[10px] text-neutral-400 block font-semibold uppercase">Durasi</span>
                <span class="text-xs font-extrabold text-neutral-800 dark:text-neutral-200 tabular-nums">
                  {{ req.durationMonths || 3 }} Bulan
                </span>
              </div>
            </div>

            <!-- Footer Actions: Lihat Detail & Terima Binaan -->
            <div class="flex items-center justify-between pt-3 border-t border-neutral-100 dark:border-neutral-800 text-xs gap-2">
              <span class="text-neutral-400 text-[11px] truncate shrink min-w-0" :title="'Diajukan: ' + req.requestedAt">
                {{ req.requestedAt }}
              </span>

              <!-- Tombol Aksi Tunggal: Lihat Detail -->
              <button
                type="button"
                class="px-3.5 sm:px-4 py-1.5 rounded-full bg-[#0081A0] hover:bg-[#00708C] text-white font-bold text-xs transition-all flex items-center gap-1.5 shadow-2xs cursor-pointer active:scale-[0.98] shrink-0"
                @click="openDetailModal(req)"
              >
                <HugeiconsIcon :icon="ViewIcon" :size="13" :stroke-width="2" />
                <span>Lihat Detail</span>
                <HugeiconsIcon :icon="ArrowRight01Icon" :size="12" :stroke-width="2" />
              </button>
            </div>
          </div>
        </div>

        <!-- Empty State -->
        <div
          v-else
          class="p-12 rounded-3xl bg-neutral-50 dark:bg-[#13161F] border border-neutral-200/80 dark:border-white/10 text-center space-y-3"
        >
          <div class="w-14 h-14 rounded-2xl bg-[#0081A0]/10 text-[#0081A0] flex items-center justify-center mx-auto">
            <HugeiconsIcon :icon="UserAdd01Icon" :size="26" :stroke-width="1.8" />
          </div>
          <h3 class="font-heading font-bold text-base text-neutral-900 dark:text-white">
            Tidak Ada Permintaan Bimbingan
          </h3>
          <p class="text-xs text-neutral-500 max-w-sm mx-auto">
            {{ searchRequest ? 'Tidak ada data permintaan yang sesuai kata kunci pencarian.' : 'Belum ada pengajuan bimbingan baru dari pelaku UMKM.' }}
          </p>
        </div>
      </div>

    </div>

    <!-- ===================================================================== -->
    <!-- MODAL: KONFIRMASI TOLAK PERMINTAAN                                    -->
    <!-- ===================================================================== -->
    <BModal
      v-model="showRejectModal"
      size="md"
      title="Tolak Permintaan Bimbingan"
    >
      <div class="space-y-4 text-left py-2">
        <p class="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed">
          Apakah kamu yakin ingin menolak permohonan bimbingan dari <strong class="text-neutral-900 dark:text-white">{{ activeRequestModal?.businessName }}</strong>?
        </p>

        <div class="space-y-1.5">
          <label class="block text-xs font-bold uppercase tracking-wider text-neutral-600 dark:text-neutral-400">
            Alasan Penolakan (Opsional)
          </label>
          <select
            v-model="rejectReason"
            class="w-full px-3.5 py-2.5 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-[#1A1D26] text-xs sm:text-sm text-neutral-900 dark:text-white focus:outline-none focus:border-[#0081A0]"
          >
            <option value="Kapasitas kuota bimbingan konsultan saat ini sedang penuh.">Kapasitas kuota bimbingan penuh</option>
            <option value="Bidang usaha di luar spesialisasi keahlian konsultan.">Bidang usaha di luar spesialisasi</option>
            <option value="Lokasi operasional di luar jangkauan pendampingan.">Lokasi di luar jangkauan pendampingan</option>
            <option value="Data pencatatan kas awal belum memenuhi kriteria minimum.">Data kas awal belum memenuhi kriteria</option>
          </select>
        </div>
      </div>

      <template #footer>
        <button
          type="button"
          class="px-4 py-2 rounded-full border border-neutral-200 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800 text-xs font-bold text-neutral-700 dark:text-neutral-300 transition-colors cursor-pointer"
          @click="showRejectModal = false"
        >
          Batal
        </button>
        <button
          type="button"
          class="px-5 py-2 rounded-full bg-red-600 hover:bg-red-700 text-white text-xs font-bold shadow-xs transition-colors cursor-pointer"
          @click="confirmReject"
        >
          Ya, Tolak Permintaan
        </button>
      </template>
    </BModal>


    <!-- ===================================================================== -->
    <!-- MODAL: DETAIL PENGAJUAN / PERMINTAAN BIMBINGAN                       -->
    <!-- ===================================================================== -->
    <BModal
      v-model="showDetailModal"
      size="lg"
      title="Detail Pengajuan Bimbingan"
    >
      <div v-if="selectedRequestDetail" class="space-y-5 text-left py-1">
        <!-- Header Usaha Info -->
        <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-2xl bg-neutral-50 dark:bg-[#13161F] border border-neutral-200/80 dark:border-white/10">
          <div class="flex items-start gap-3.5">
            <div class="w-12 h-12 rounded-xl bg-white dark:bg-[#1A1D26] border border-neutral-200 dark:border-white/10 flex items-center justify-center text-[#0081A0] shadow-2xs shrink-0 mt-0.5">
              <HugeiconsIcon :icon="Store01Icon" :size="24" :stroke-width="1.8" />
            </div>
            <div>
              <span class="text-[10px] text-neutral-400 font-bold uppercase tracking-wider block">
                {{ selectedRequestDetail.sector }}
              </span>
              <h3 class="font-heading font-extrabold text-lg text-neutral-900 dark:text-white leading-tight">
                {{ selectedRequestDetail.businessName }}
              </h3>
              <p class="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
                Pemilik: <strong class="text-neutral-800 dark:text-neutral-200">{{ selectedRequestDetail.ownerName }}</strong> • {{ selectedRequestDetail.city }}
              </p>
            </div>
          </div>

          <!-- Status Badge -->
          <span
            v-if="selectedRequestDetail.status === 'PENDING'"
            class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-500/10 text-amber-700 dark:text-amber-300 border border-amber-500/20 shrink-0"
          >
            <span class="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
            <span>Menunggu Konfirmasi</span>
          </span>
          <span
            v-else-if="selectedRequestDetail.status === 'ACCEPTED'"
            class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#00AA13]/10 text-[#00AA13] dark:text-[#22C55E] border border-[#00AA13]/20 shrink-0"
          >
            <HugeiconsIcon :icon="CheckmarkCircle01Icon" :size="13" :stroke-width="2.2" />
            <span>Diterima Menjadi Binaan</span>
          </span>
          <span
            v-else
            class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-red-500/10 text-red-600 dark:text-red-400 border border-red-500/20 shrink-0"
          >
            <HugeiconsIcon :icon="Cancel01Icon" :size="13" :stroke-width="2.2" />
            <span>Permintaan Ditolak</span>
          </span>
        </div>

        <!-- 4-Grid Financial & Proposal Metrics -->
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div class="p-3.5 rounded-xl bg-white dark:bg-[#1A1D26] border border-neutral-200/80 dark:border-white/10">
            <span class="text-[10px] text-neutral-400 font-semibold uppercase block">Omzet/Bulan</span>
            <span class="text-sm font-extrabold text-neutral-900 dark:text-white tabular-nums">
              Rp {{ (selectedRequestDetail.revenue / 1000000).toFixed(0) }} Juta
            </span>
          </div>

          <div class="p-3.5 rounded-xl bg-white dark:bg-[#1A1D26] border border-neutral-200/80 dark:border-white/10">
            <span class="text-[10px] text-neutral-400 font-semibold uppercase block">Skor Kesehatan</span>
            <span class="text-sm font-extrabold text-emerald-600 dark:text-emerald-400 tabular-nums">
              {{ selectedRequestDetail.healthScore }}/100
            </span>
          </div>

          <div class="p-3.5 rounded-xl bg-emerald-500/10 dark:bg-emerald-500/15 border border-emerald-500/25">
            <span class="text-[10px] text-emerald-700 dark:text-emerald-400 font-semibold uppercase block">Tawaran Fee</span>
            <span class="text-sm font-extrabold text-emerald-700 dark:text-emerald-300 tabular-nums">
              Rp {{ (((selectedRequestDetail.offeredFee || (selectedRequestDetail.revenue >= 35000000 ? 2000000 : selectedRequestDetail.revenue >= 25000000 ? 1500000 : 1200000))) / 1000000).toFixed(1) }} Jt<span class="text-[10px] font-normal">/bln</span>
            </span>
          </div>

          <div class="p-3.5 rounded-xl bg-neutral-50 dark:bg-[#1A1D26] border border-neutral-200/80 dark:border-white/10">
            <span class="text-[10px] text-neutral-400 font-semibold uppercase block">Durasi Kontrak</span>
            <span class="text-sm font-extrabold text-neutral-900 dark:text-white tabular-nums">
              {{ selectedRequestDetail.durationMonths || 3 }} Bulan
            </span>
          </div>
        </div>

        <!-- Pesan Pengajuan / Kebutuhan Bimbingan -->
        <div class="space-y-1.5">
          <label class="text-xs font-bold text-neutral-700 dark:text-neutral-300">
            Pesan & Kebutuhan Bimbingan dari UMKM:
          </label>
          <div class="p-4 rounded-2xl bg-neutral-50 dark:bg-[#13161F] border border-neutral-200/70 dark:border-white/10 text-xs sm:text-sm text-neutral-700 dark:text-neutral-200 leading-relaxed font-sans">
            "{{ selectedRequestDetail.message }}"
          </div>
          <p class="text-[11px] text-neutral-400">
            Diajukan pada {{ selectedRequestDetail.requestedAt }}
          </p>
        </div>

        <!-- Rejection reason if rejected -->
        <div v-if="selectedRequestDetail.status === 'REJECTED' && selectedRequestDetail.rejectionReason" class="p-3 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900/40 text-xs text-red-600 dark:text-red-400">
          <strong>Alasan Penolakan:</strong> {{ selectedRequestDetail.rejectionReason }}
        </div>
      </div>

      <template #footer>
        <div class="flex items-center justify-between w-full">
          <button
            type="button"
            class="px-4 py-2 rounded-full border border-neutral-200 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800 text-xs font-bold text-neutral-700 dark:text-neutral-300 transition-colors cursor-pointer"
            @click="showDetailModal = false"
          >
            Tutup
          </button>

          <div v-if="selectedRequestDetail?.status === 'PENDING'" class="flex items-center gap-2">
            <button
              type="button"
              class="px-4 py-2 rounded-full border border-neutral-200 dark:border-neutral-700 hover:border-red-400 hover:text-red-600 text-neutral-600 dark:text-neutral-400 text-xs font-bold transition-all cursor-pointer bg-white dark:bg-[#1A1D26]"
              @click="openRejectModalFromDetail(selectedRequestDetail)"
            >
              Tolak Permintaan
            </button>
            <button
              type="button"
              class="px-5 py-2 rounded-full bg-[#0081A0] hover:bg-[#00708C] text-white text-xs font-bold shadow-xs transition-all active:scale-[0.98] cursor-pointer flex items-center gap-1.5"
              @click="acceptFromDetail(selectedRequestDetail)"
            >
              <HugeiconsIcon :icon="CheckmarkBadge01Icon" :size="14" :stroke-width="2.2" />
              <span>Buka Perjanjian & Terima</span>
            </button>
          </div>

          <div v-else-if="selectedRequestDetail?.status === 'ACCEPTED'" class="flex items-center gap-2">
            <NuxtLink
              :to="`/konsultan/rencana-aksi?client=${selectedRequestDetail.umkmId}`"
              class="px-4 py-2 rounded-full bg-[#0081A0] hover:bg-[#00708C] text-white text-xs font-bold shadow-xs transition-all flex items-center gap-1.5"
              @click="showDetailModal = false"
            >
              <HugeiconsIcon :icon="Task01Icon" :size="14" :stroke-width="2" />
              <span>Beri Action Plan</span>
            </NuxtLink>
          </div>
        </div>
      </template>
    </BModal>

    <!-- ===================================================================== -->
    <!-- MODAL: POPUP SUKSES PENERIMAAN KLIEN UMKM                            -->
    <!-- ===================================================================== -->
    <BModal
      v-model="showAcceptedSuccessModal"
      size="md"
      title="Kemitraan Resmi Disepakati"
      subtitle="Klien UMKM binaan telah berhasil diterima & disahkan."
      @close="closeAcceptedSuccessModal"
    >
      <div class="space-y-5 text-center py-2">
        <div class="w-16 h-16 rounded-3xl bg-gradient-to-tr from-[#0081A0] to-[#00AA13] text-white flex items-center justify-center mx-auto shadow-lg shadow-[#00AA13]/20">
          <HugeiconsIcon :icon="CheckmarkBadge01Icon" :size="32" :stroke-width="2.2" />
        </div>

        <div class="space-y-1.5">
          <h3 class="font-heading font-extrabold text-lg sm:text-xl text-neutral-900 dark:text-white leading-tight">
            Klien <span class="text-[#0081A0] dark:text-[#2091AA]">{{ acceptedClientName }}</span> Diterima!
          </h3>
          <p class="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed max-w-sm mx-auto">
            Perjanjian komitmen pendampingan telah resmi ditandatangani. Pelaku usaha kini resmi menjadi UMKM binaan aktifmu.
          </p>
        </div>

        <div class="p-4 rounded-2xl bg-[#F6F8FA] dark:bg-[#1A1D26] border border-[#E2E8F0] dark:border-white/10 text-left space-y-2">
          <div class="flex items-center justify-between text-xs">
            <span class="text-neutral-500 dark:text-neutral-400">Status Pembinaan:</span>
            <span class="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-[#00AA13]/10 text-[#00AA13] dark:text-[#22C55E]">
              Binaan Aktif Baru
            </span>
          </div>
          <div class="flex items-center justify-between text-xs">
            <span class="text-neutral-500 dark:text-neutral-400">Rekomendasi Pertama:</span>
            <span class="font-bold text-neutral-800 dark:text-neutral-200">
              Susun Action Plan 30 Hari
            </span>
          </div>
        </div>
      </div>

      <template #footer>
        <div class="flex flex-col sm:flex-row items-center justify-between gap-3 w-full">
          <button
            type="button"
            class="w-full sm:w-auto px-5 py-2.5 rounded-full border border-neutral-200 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800 text-xs font-bold text-neutral-700 dark:text-neutral-300 transition-colors cursor-pointer text-center"
            @click="closeAcceptedSuccessModal"
          >
            Lihat Daftar Binaan
          </button>
          <NuxtLink
            :to="`/konsultan/rencana-aksi?client=${acceptedClientId}`"
            class="w-full sm:w-auto px-6 py-2.5 rounded-full bg-[#0081A0] hover:bg-[#00708C] text-white text-xs sm:text-sm font-bold shadow-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer"
            @click="closeAcceptedSuccessModal"
          >
            <HugeiconsIcon :icon="Task01Icon" :size="15" :stroke-width="2" />
            <span>Susun Rencana Aksi</span>
          </NuxtLink>
        </div>
      </template>
    </BModal>

    <!-- Toast Notification: Kontrak Berhasil Disahkan -->
    <Teleport to="body">
      <transition
        enter-active-class="transition-all duration-300 ease-out"
        enter-from-class="opacity-0 translate-y-3"
        enter-to-class="opacity-100 translate-y-0"
        leave-active-class="transition-all duration-200 ease-in"
        leave-from-class="opacity-100 translate-y-0"
        leave-to-class="opacity-0 translate-y-3"
      >
        <div
          v-if="showToast"
          class="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-3.5 rounded-2xl bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 shadow-2xl border border-neutral-700 dark:border-neutral-200"
        >
          <HugeiconsIcon :icon="CheckmarkCircle01Icon" :size="20" :stroke-width="2.5" class="text-[#00AA13]" />
          <span class="text-xs sm:text-sm font-semibold">{{ toastMessage }}</span>
        </div>
      </transition>
    </Teleport>

  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, onBeforeUnmount, nextTick } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import gsap from 'gsap'
import { useKonsultanStore, type ClientMentorshipRequest } from '~/stores/konsultan'
import BModal from '~/components/base/BModal.vue'
import BMetricBannerCard from '~/components/base/BMetricBannerCard.vue'
import { HugeiconsIcon } from '@hugeicons/vue'
import {
  UserGroupIcon,
  UserIcon,
  UserAdd01Icon,
  Award01Icon,
  Task01Icon,
  Search01Icon,
  FilterIcon,
  Store01Icon,
  CheckmarkCircle01Icon,
  CheckmarkBadge01Icon,
  PencilEdit01Icon,
  Delete02Icon,
  Cancel01Icon,
  ArrowRight01Icon,
  ViewIcon
} from '@hugeicons/core-free-icons'

definePageMeta({
  layout: 'dashboard'
})

const route = useRoute()
const router = useRouter()
const konsultanStore = useKonsultanStore()

// Top Sub-Tabs: 'aktif' | 'permintaan' (Style & GSAP Animated Pill identik dengan Switcher 3 Bulan 6 Bulan di UMKM)
const currentTab = ref<'aktif' | 'permintaan'>('aktif')
const tabIndicatorRef = ref<HTMLElement | null>(null)
const tabButtonsRef = ref<Record<string, HTMLElement | null>>({})
let handleResizeTabs: (() => void) | null = null

function setTabButtonRef(id: string, el: any) {
  if (el) {
    tabButtonsRef.value[id] = el
  }
}

function updateTabIndicatorPosition(immediate = false) {
  const current = currentTab.value
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

onMounted(async () => {
  if (route.query.tab === 'permintaan') {
    currentTab.value = 'permintaan'
  }
  checkAcceptedQuery()
  await Promise.all([
    konsultanStore.fetchClients(),
    konsultanStore.fetchRequests()
  ])
  nextTick(() => {
    updateTabIndicatorPosition(true)
  })
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

watch(() => route.query.tab, (newTab) => {
  if (newTab === 'permintaan') {
    currentTab.value = 'permintaan'
  } else {
    currentTab.value = 'aktif'
  }
  nextTick(() => {
    updateTabIndicatorPosition(false)
    gsap.fromTo(
      '.gsap-klien-tab-content',
      { opacity: 0, y: 8 },
      { opacity: 1, y: 0, duration: 0.32, ease: 'power2.out', clearProps: 'all' }
    )
  })
})

function setTab(tab: 'aktif' | 'permintaan') {
  currentTab.value = tab
  router.replace({
    query: {
      ...route.query,
      tab: tab === 'permintaan' ? 'permintaan' : undefined
    }
  })
  nextTick(() => {
    updateTabIndicatorPosition(false)
    gsap.fromTo(
      '.gsap-klien-tab-content',
      { opacity: 0, y: 8 },
      { opacity: 1, y: 0, duration: 0.32, ease: 'power2.out', clearProps: 'all' }
    )
  })
}

function showAllActive() {
  setTab('aktif')
  selectedClientFilter.value = 'ALL'
}

function filterByReady() {
  setTab('aktif')
  selectedClientFilter.value = 'READY'
}

// ---------------- Tab 1: Klien Aktif State ----------------
const searchClient = ref('')
const selectedClientFilter = ref('ALL')

const clientFilterOptions = [
  { key: 'ALL', label: 'Semua Binaan' },
  { key: 'HEALTHY', label: 'Prima' },
  { key: 'ATTENTION', label: 'Perlu Pendampingan' },
  { key: 'READY', label: 'Siap Modal' }
]

const readyCount = computed(() => {
  return konsultanStore.clients.filter(c => c.fundingStatus === 'READY_FOR_FUNDING').length
})

const filteredClients = computed(() => {
  return konsultanStore.clients.filter(c => {
    const matchFilter = selectedClientFilter.value === 'ALL' ||
      (selectedClientFilter.value === 'HEALTHY' && c.status === 'healthy') ||
      (selectedClientFilter.value === 'ATTENTION' && (c.status === 'warning' || c.status === 'danger')) ||
      (selectedClientFilter.value === 'READY' && c.fundingStatus === 'READY_FOR_FUNDING')

    const matchSearch = searchClient.value === '' ||
      c.name.toLowerCase().includes(searchClient.value.toLowerCase()) ||
      c.city.toLowerCase().includes(searchClient.value.toLowerCase()) ||
      c.owner.toLowerCase().includes(searchClient.value.toLowerCase())

    return matchFilter && matchSearch
  })
})

// ---------------- Tab 2: Permintaan Masuk State ----------------
const selectedRequestSort = ref<'LATEST' | 'FEE_DESC' | 'FEE_ASC' | 'REVENUE_DESC' | 'SCORE_DESC' | 'DURATION_DESC'>('LATEST')
const searchRequest = ref('')

const requestSortOptions = [
  { key: 'LATEST', label: 'Terbaru Diajukan' },
  { key: 'FEE_DESC', label: 'Fee Tertinggi (Termahal)' },
  { key: 'FEE_ASC', label: 'Fee Terendah (Termurah)' },
  { key: 'REVENUE_DESC', label: 'Omzet Terbesar' },
  { key: 'SCORE_DESC', label: 'Skor Bisnis Tertinggi' },
  { key: 'DURATION_DESC', label: 'Durasi Terlama' }
]

const showRejectModal = ref(false)
const showDetailModal = ref(false)
const showAcceptedSuccessModal = ref(false)
const acceptedClientName = ref('')
const acceptedClientId = ref('')
const selectedRequestDetail = ref<ClientMentorshipRequest | null>(null)
const activeRequestModal = ref<ClientMentorshipRequest | null>(null)
const rejectReason = ref('Kapasitas kuota bimbingan konsultan saat ini sedang penuh.')

function checkAcceptedQuery() {
  if (route.query.acceptedClient || route.query.acceptedName) {
    acceptedClientName.value = (route.query.acceptedName as string) || 'UMKM Binaan'
    acceptedClientId.value = (route.query.acceptedClient as string) || ''
    showAcceptedSuccessModal.value = true
    currentTab.value = 'aktif'
  }
}

watch(() => route.query.acceptedClient, (val) => {
  if (val) {
    checkAcceptedQuery()
  }
})

function closeAcceptedSuccessModal() {
  showAcceptedSuccessModal.value = false
  router.replace({
    query: {
      ...route.query,
      acceptedClient: undefined,
      acceptedName: undefined
    }
  })
}

const showToast = ref(false)
const toastMessage = ref('')
let toastTimer: any = null

function triggerToast(msg: string) {
  if (toastTimer) clearTimeout(toastTimer)
  toastMessage.value = msg
  showToast.value = true
  toastTimer = setTimeout(() => {
    showToast.value = false
  }, 4500)
}

function openDetailModal(req: ClientMentorshipRequest) {
  selectedRequestDetail.value = req
  showDetailModal.value = true
}

function openRejectModalFromDetail(req: ClientMentorshipRequest) {
  showDetailModal.value = false
  openRejectModal(req)
}

function acceptFromDetail(req: ClientMentorshipRequest) {
  showDetailModal.value = false
  router.push(`/konsultan/klien/perjanjian/${req.id}`)
}

const filteredRequests = computed(() => {
  const q = searchRequest.value.toLowerCase().trim()
  
  // 1. Search matching & only show PENDING requests (accepted clients move out to Klien Aktif)
  const list = konsultanStore.clientRequests.filter(req => {
    const isPending = req.status === 'PENDING' || !req.status
    const matchSearch = !q ||
      req.businessName.toLowerCase().includes(q) ||
      req.ownerName.toLowerCase().includes(q) ||
      req.city.toLowerCase().includes(q) ||
      req.sector.toLowerCase().includes(q)
    return isPending && matchSearch
  })

  // 2. Sort by selected criterion (termahal, termurah, omzet, skor, durasi)
  return [...list].sort((a, b) => {
    const feeA = a.offeredFee || (a.revenue >= 35000000 ? 2000000 : a.revenue >= 25000000 ? 1500000 : 1200000)
    const feeB = b.offeredFee || (b.revenue >= 35000000 ? 2000000 : b.revenue >= 25000000 ? 1500000 : 1200000)
    const durA = a.durationMonths || 3
    const durB = b.durationMonths || 3

    if (selectedRequestSort.value === 'FEE_DESC') {
      return feeB - feeA
    } else if (selectedRequestSort.value === 'FEE_ASC') {
      return feeA - feeB
    } else if (selectedRequestSort.value === 'REVENUE_DESC') {
      return b.revenue - a.revenue
    } else if (selectedRequestSort.value === 'SCORE_DESC') {
      return b.healthScore - a.healthScore
    } else if (selectedRequestSort.value === 'DURATION_DESC') {
      return durB - durA
    }
    return 0
  })
})

function handleAccept(req: ClientMentorshipRequest) {
  router.push(`/konsultan/klien/perjanjian/${req.id}`)
}

function openRejectModal(req: ClientMentorshipRequest) {
  activeRequestModal.value = req
  rejectReason.value = 'Kapasitas kuota bimbingan konsultan saat ini sedang penuh.'
  showRejectModal.value = true
}

function confirmReject() {
  if (activeRequestModal.value) {
    konsultanStore.rejectRequest(activeRequestModal.value.id, rejectReason.value)
    showRejectModal.value = false
  }
}

function handleReconsider(req: ClientMentorshipRequest) {
  req.status = 'PENDING'
}
</script>
