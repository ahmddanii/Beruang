<template>
  <div class="space-y-6 pb-20 font-sans text-neutral-900 dark:text-neutral-100 select-none">
    <!-- 1. Top Page Controls -->
    <div class="flex items-center justify-end gap-2.5 pb-2 shrink-0 flex-wrap">
      <!-- Proposal Button -->
      <button
        type="button"
        class="btn-pill-gradient group"
        title="Unduh Proposal Usaha & Kemitraan (PDF)"
        @click="handleExportProposal"
      >
        <HugeiconsIcon :icon="Download01Icon" :size="15" :stroke-width="2" class="text-neutral-700 dark:text-neutral-200" />
        <span>Unduh Proposal (PDF)</span>
      </button>

      <!-- Primary 3D Action: Rayakan Kelulusan jika 4/4, atau Panduan Kesiapan jika belum lolos -->
      <button
        v-if="fundingGate.isReadyForFunding"
        type="button"
        class="btn-3d-green px-4 sm:px-5 py-2 sm:py-2.5 text-xs sm:text-sm font-poppins font-semibold shadow-xs cursor-pointer"
        @click="triggerCelebration"
      >
        <HugeiconsIcon :icon="Award01Icon" :size="17" :stroke-width="2.2" />
        <span>Rayakan Kelulusan</span>
      </button>
      <NuxtLink
        v-else
        to="/dashboard/rencana-aksi"
        class="btn-pill-action group cursor-pointer inline-flex items-center gap-1.5 font-poppins font-semibold"
      >
        <HugeiconsIcon :icon="Award01Icon" :size="16" :stroke-width="2" />
        <span>Perkuat Kesiapan ({{ fundingGate.passedCount }}/{{ fundingGate.totalCount }})</span>
      </NuxtLink>
    </div>

    <!-- 2. Editorial Header Banner (GoPay Tactile Card) -->
    <div class="gsap-header-card rounded-3xl card-tactile-gopay p-6 sm:p-7 relative overflow-hidden border border-neutral-200/80 dark:border-neutral-800/80 bg-white dark:bg-[#13161F]">
      <!-- Background Ambient Glow -->
      <div class="absolute -right-16 -top-16 w-56 h-56 rounded-full bg-[#2091AA]/10 dark:bg-[#2091AA]/15 blur-3xl pointer-events-none" />
      <div class="absolute right-36 -bottom-16 w-48 h-48 rounded-full bg-[#00AA13]/10 dark:bg-[#00AA13]/10 blur-3xl pointer-events-none" />

      <div class="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div class="space-y-2 max-w-2xl">
          <div :class="['inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-poppins font-semibold border', fundingGate.isReadyForFunding ? 'bg-[#00AA13]/10 dark:bg-[#00AA13]/20 text-[#00AA13] dark:text-emerald-400 border-[#00AA13]/20 dark:border-emerald-500/30' : 'bg-amber-100/90 text-amber-800 dark:bg-amber-950/80 dark:text-amber-300 border-amber-200/80 dark:border-amber-800/60']">
            <HugeiconsIcon :icon="fundingGate.isReadyForFunding ? CheckmarkCircle01Icon : Award01Icon" :size="14" :stroke-width="2" />
            <span>Status Kemitraan: {{ fundingGate.isReadyForFunding ? 'Lolos 4/4 Syarat Gate' : `${fundingGate.passedCount}/${fundingGate.totalCount} Syarat Terpenuhi` }}</span>
          </div>

          <h1 class="text-2xl sm:text-3xl font-heading font-bold text-neutral-900 dark:text-white tracking-tight">
            Akses Modal Usaha & Kemitraan Investor
          </h1>

          <p class="text-sm sm:text-[15px] text-neutral-600 dark:text-neutral-300 font-sans leading-relaxed">
            Kelola sertifikasi kelayakan pendanaan tokomu, simulasikan proyeksi bagi hasil investasi, serta tanggapi permintaan izin akses data keuangan privat dari mitra investor terakreditasi.
          </p>
        </div>

        <!-- Right Quick Stat Pills -->
        <div class="grid grid-cols-2 gap-3 shrink-0">
          <div class="p-3.5 sm:p-4 rounded-2xl bg-neutral-50/80 dark:bg-[#18191E] border border-neutral-200/70 dark:border-neutral-800 flex flex-col justify-center min-w-[140px]">
            <span class="text-xs text-neutral-500 dark:text-neutral-400 font-medium">Target Akses Modal</span>
            <div class="flex items-baseline gap-1 mt-0.5">
              <span class="font-poppins font-extrabold text-xl sm:text-2xl text-[#2091AA] dark:text-[#50AABF] tabular-nums">
                {{ formatTargetModal(fundingGate.fundingTarget || umkmStore.profile.fundingTarget) }}
              </span>
            </div>
            <span class="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium mt-0.5">
              {{ fundingGate.isReadyForFunding ? 'Ekspansi 2 Cabang' : 'Rencana Kemitraan' }}
            </span>
          </div>

          <div class="p-3.5 sm:p-4 rounded-2xl bg-neutral-50/80 dark:bg-[#18191E] border border-neutral-200/70 dark:border-neutral-800 flex flex-col justify-center min-w-[140px]">
            <span class="text-xs text-neutral-500 dark:text-neutral-400 font-medium">Permintaan Investor</span>
            <div class="flex items-baseline gap-1.5 mt-0.5">
              <span class="font-poppins font-extrabold text-2xl text-neutral-900 dark:text-white tabular-nums">
                {{ pendingRequestsCount }}
              </span>
              <span class="text-xs text-amber-600 dark:text-amber-400 font-bold">Menunggu</span>
            </div>
            <span class="text-[11px] text-neutral-400 mt-0.5">
              Data Room Privat
            </span>
          </div>
        </div>
      </div>
    </div>

    <!-- 3. Macro Segmented Pill Switcher (4 Tab Lengkap) -->
    <div class="segmented-pill-container relative shrink-0 flex-nowrap overflow-x-auto max-w-full">
      <!-- GSAP Sliding Pill Indicator -->
      <div
        ref="tabIndicatorRef"
        class="segmented-pill-indicator"
        aria-hidden="true"
      />

      <button
        type="button"
        :ref="el => setTabRef('gate', el)"
        class="segmented-pill-btn"
        :class="activeTab === 'gate' ? 'is-active' : 'is-inactive'"
        @click="setActiveTab('gate')"
      >
        <HugeiconsIcon :icon="Award01Icon" :size="16" class="mr-1.5" />
        <span>Status Kesiapan (Funding Gate)</span>
        <span :class="['ml-1.5 px-2 py-0.5 rounded-full text-[11px] font-bold tabular-nums', fundingGate.isReadyForFunding ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300' : 'bg-neutral-100 text-neutral-700 dark:bg-neutral-800 dark:text-neutral-300']">
          {{ fundingGate.passedCount }}/{{ fundingGate.totalCount }} {{ fundingGate.isReadyForFunding ? 'Lolos' : 'Terpenuhi' }}
        </span>
      </button>

      <button
        type="button"
        :ref="el => setTabRef('requests', el)"
        class="segmented-pill-btn"
        :class="activeTab === 'requests' ? 'is-active' : 'is-inactive'"
        @click="setActiveTab('requests')"
      >
        <HugeiconsIcon :icon="UserGroupIcon" :size="16" class="mr-1.5" />
        <span>Tawaran Investor Masuk</span>
        <span
          v-if="pendingRequestsCount > 0"
          class="ml-1.5 px-2 py-0.5 rounded-full text-[11px] font-bold tabular-nums bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300"
        >
          {{ pendingRequestsCount }} Baru
        </span>
      </button>

      <button
        type="button"
        :ref="el => setTabRef('simulation', el)"
        class="segmented-pill-btn"
        :class="activeTab === 'simulation' ? 'is-active' : 'is-inactive'"
        @click="setActiveTab('simulation')"
      >
        <HugeiconsIcon :icon="AnalyticsUpIcon" :size="16" class="mr-1.5" />
        <span>Simulasi Akses Modal</span>
        <span class="ml-1.5 px-2 py-0.5 rounded-full text-[11px] font-bold tabular-nums bg-[#E6F4F7] text-[#2091AA] dark:bg-[#2091AA]/20 dark:text-[#50AABF]">
          Kalkulator
        </span>
      </button>

      <button
        type="button"
        :ref="el => setTabRef('preview', el)"
        class="segmented-pill-btn"
        :class="activeTab === 'preview' ? 'is-active' : 'is-inactive'"
        @click="setActiveTab('preview')"
      >
        <HugeiconsIcon :icon="Store01Icon" :size="16" class="mr-1.5" />
        <span>Pratinjau Kartu Publik</span>
      </button>
    </div>

    <!-- 4. TAB 1: Funding Gate Status -->
    <div v-if="activeTab === 'gate'" class="space-y-6">
      <!-- Celebration Hero Card -->
      <div class="card-tactile-gopay rounded-3xl p-6 sm:p-8 relative overflow-hidden border border-neutral-200/80 dark:border-neutral-800">
        <div class="flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
          <div class="max-w-xl space-y-3">
            <div :class="['inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs sm:text-sm font-poppins font-semibold border', fundingGate.isReadyForFunding ? 'bg-emerald-50 dark:bg-emerald-950/60 text-[#00AA13] dark:text-emerald-400 border-emerald-200 dark:border-emerald-800' : 'bg-amber-50 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border-amber-200 dark:border-amber-800']">
              <HugeiconsIcon :icon="Award01Icon" :size="15" :stroke-width="2" />
              <span>{{ fundingGate.isReadyForFunding ? 'Sertifikasi Kesiapan Resmi Beruang' : 'Tahap Penataan & Evaluasi Kesiapan Modal' }}</span>
            </div>

            <h2 class="text-2xl sm:text-3xl font-poppins font-bold text-neutral-900 dark:text-white tracking-tight">
              {{ fundingGate.isReadyForFunding ? 'Selamat! Tokomu Resmi "Ready for Funding".' : `Tokomu Sedang Membangun Rekam Jejak (${fundingGate.passedCount}/${fundingGate.totalCount} Syarat Terpenuhi)` }}
            </h2>

            <p class="text-sm sm:text-base text-neutral-700 dark:text-neutral-300 leading-relaxed font-sans">
              <template v-if="fundingGate.isReadyForFunding">
                Konsultan pendamping <strong>{{ fundingGate.consultantName }}</strong> telah mengesahkan seluruh syarat tata kelola dan kesehatan kas tokomu. Profil terkurasi usahamu kini dapat ditemukan oleh sindikasi investor di katalog marketplace.
              </template>
              <template v-else>
                Untuk memperoleh sertifikasi resmi "Ready for Funding" dan membuka akses pendanaan dari sindikasi investor terakreditasi, penuhi 4 syarat gerbang di bawah ini bersama konsultan pendamping tokomu.
              </template>
            </p>

            <div class="pt-2 flex flex-wrap items-center gap-4 text-xs sm:text-sm font-medium font-poppins">
              <span class="text-neutral-500">{{ fundingGate.isReadyForFunding ? 'Tanggal Sertifikasi:' : 'Status Pendampingan:' }}</span>
              <span class="text-neutral-900 dark:text-white font-bold">{{ fundingGate.isReadyForFunding ? fundingGate.certifiedAt : fundingGate.consultantName }}</span>
              <span class="text-neutral-300 dark:text-neutral-700">•</span>
              <span class="text-neutral-500">Target Modal:</span>
              <span class="text-[#2091AA] dark:text-[#50AABF] font-bold tabular-nums">
                {{ formatTargetModal(fundingGate.fundingTarget || umkmStore.profile.fundingTarget) }}
              </span>
            </div>
          </div>

          <!-- Celebration or Cheering Mascot SiBeru -->
          <div class="shrink-0">
            <SiBeru :state="fundingGate.isReadyForFunding ? 'celebrate' : 'happy'" size="lg" />
          </div>
        </div>
      </div>

      <!-- 4 Syarat Kelulusan Gate Checklist -->
      <div class="card-tactile-gopay rounded-2xl p-6 sm:p-7 space-y-5">
        <div class="flex items-center justify-between border-b border-neutral-100 dark:border-neutral-800/80 pb-4">
          <div>
            <h3 class="font-poppins font-bold text-lg sm:text-xl text-neutral-900 dark:text-white">
              Daftar Verifikasi 4 Syarat Gerbang Kesiapan Modal
            </h3>
            <p class="text-xs sm:text-[13px] font-poppins text-neutral-500 dark:text-neutral-400 mt-0.5">
              Seluruh syarat wajib berstatus hijau agar sertifikat kesiapan tidak mengalami penangguhan.
            </p>
          </div>
          <span :class="['inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-poppins font-bold border shrink-0', fundingGate.isReadyForFunding ? 'bg-emerald-50 text-[#00AA13] dark:bg-emerald-950/60 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800' : 'bg-neutral-100 text-neutral-700 border-neutral-200 dark:bg-neutral-800 dark:text-neutral-300 dark:border-neutral-700']">
            <HugeiconsIcon :icon="fundingGate.isReadyForFunding ? CheckmarkCircle01Icon : Award01Icon" :size="14" :stroke-width="2" />
            <span>{{ fundingGate.passedCount }} dari {{ fundingGate.totalCount }} Terpenuhi</span>
          </span>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div
            v-for="req in fundingGate.criteria"
            :key="req.id || req.title"
            :class="[
              'p-4 sm:p-5 rounded-xl border flex items-start gap-3.5 transition-all',
              req.passed
                ? 'border-emerald-200/80 dark:border-emerald-800/60 bg-emerald-50/40 dark:bg-emerald-950/20'
                : 'border-neutral-200 dark:border-neutral-800/80 bg-neutral-50/50 dark:bg-[#18191E]'
            ]"
          >
            <div
              :class="[
                'w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5 shadow-2xs',
                req.passed
                  ? 'bg-[#00AA13] text-white'
                  : 'bg-neutral-200 dark:bg-neutral-700 text-neutral-600 dark:text-neutral-300'
              ]"
            >
              <HugeiconsIcon :icon="req.passed ? CheckmarkCircle01Icon : Award01Icon" :size="18" :stroke-width="2.2" />
            </div>
            <div class="space-y-1">
              <h4 class="font-poppins font-bold text-sm sm:text-base text-neutral-900 dark:text-white">
                {{ req.title }}
              </h4>
              <p class="text-xs sm:text-[13px] text-neutral-700 dark:text-neutral-300 leading-relaxed font-sans">
                {{ req.description }}
              </p>
              <span
                :class="[
                  'inline-block mt-2 text-xs font-poppins font-bold px-2.5 py-0.5 rounded-md border',
                  req.passed
                    ? 'text-[#00AA13] dark:text-emerald-300 bg-white dark:bg-neutral-800 border-emerald-200 dark:border-emerald-700'
                    : 'text-amber-800 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/40 border-amber-200 dark:border-amber-800/50'
                ]"
              >
                {{ req.statusLabel }}
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- Quick Action Cards to other tabs -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div class="card-tactile-gopay rounded-2xl p-6 space-y-3">
          <div class="flex items-center gap-2.5 pb-2 border-b border-neutral-100 dark:border-neutral-800">
            <HugeiconsIcon :icon="UserGroupIcon" :size="20" class="text-[#2091AA] dark:text-[#50AABF]" />
            <h3 class="font-poppins font-bold text-base text-neutral-900 dark:text-white">
              Permintaan Akses Investor Masuk
            </h3>
          </div>
          <p class="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
            Terdapat <strong>{{ pendingRequestsCount }} investor terverifikasi</strong> yang menunggu izin darimu untuk membuka data room laporan keuangan privat.
          </p>
          <div class="pt-2">
            <button
              type="button"
              class="btn-pill-action group"
              @click="setActiveTab('requests')"
            >
              <span>Tinjau Tawaran Investor ({{ pendingRequestsCount }})</span>
              <svg class="w-4 h-4 shrink-0 transition-transform duration-200 group-hover:translate-x-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        <div class="card-tactile-gopay rounded-2xl p-6 space-y-3">
          <div class="flex items-center gap-2.5 pb-2 border-b border-neutral-100 dark:border-neutral-800">
            <HugeiconsIcon :icon="Store01Icon" :size="20" class="text-[#2091AA] dark:text-[#50AABF]" />
            <h3 class="font-poppins font-bold text-base text-neutral-900 dark:text-white">
              Keterlihatan di Katalog Marketplace
            </h3>
          </div>
          <p class="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
            Pastikan profil publik tokomu terlihat memikat bagi investor dengan rasio efisiensi bahan dan pertumbuhan positif, tanpa membuka angka rupiah riil.
          </p>
          <div class="pt-2">
            <button
              type="button"
              class="btn-pill-action group"
              @click="setActiveTab('preview')"
            >
              <span>Lihat Tampilan Kartu Publik</span>
              <svg class="w-4 h-4 shrink-0 transition-transform duration-200 group-hover:translate-x-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- 5. TAB 2: Permintaan Akses Investor (Tawaran Masuk) -->
    <div v-else-if="activeTab === 'requests'" class="space-y-6">
      <!-- Security Notice Banner -->
      <div class="p-4 sm:p-5 rounded-2xl bg-blue-50/70 dark:bg-blue-950/30 border border-blue-200/70 dark:border-blue-900/40 flex items-start gap-3.5">
        <HugeiconsIcon :icon="Shield02Icon" :size="22" class="text-[#2091AA] dark:text-[#50AABF] shrink-0 mt-0.5" />
        <div class="space-y-0.5 text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed font-sans">
          <p class="font-poppins font-bold text-neutral-900 dark:text-white">Proteksi Data Room Keuangan Berlisensi</p>
          <p>Saat Anda menyetujui permintaan, investor hanya dapat membaca berkas pembukuan dengan watermark digital otomatis berisi nama dan ID pemohon. Riwayat akses tercatat permanen di sistem Beruang.</p>
        </div>
      </div>

      <!-- Empty State if no requests -->
      <div v-if="umkmStore.investorRequests.length === 0" class="card-tactile-gopay rounded-2xl p-8 sm:p-12 text-center space-y-4">
        <div class="w-14 h-14 rounded-2xl bg-[#E6F4F7] text-[#2091AA] dark:bg-[#2091AA]/20 dark:text-[#50AABF] flex items-center justify-center mx-auto shadow-2xs">
          <HugeiconsIcon :icon="UserGroupIcon" :size="28" :stroke-width="2.2" />
        </div>
        <div class="max-w-md mx-auto space-y-1">
          <h3 class="font-poppins font-bold text-base sm:text-lg text-neutral-900 dark:text-white">
            Belum Ada Permintaan Akses Investor
          </h3>
          <p class="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 font-sans leading-relaxed">
            Permintaan akses data room privat dari sindikasi investor akan muncul di sini setelah tokomu memenuhi 4 syarat gerbang pendanaan (Funding Gate).
          </p>
        </div>
      </div>

      <!-- Requests Cards List -->
      <div v-else class="space-y-4">
        <div
          v-for="req in umkmStore.investorRequests"
          :key="req.id"
          class="card-tactile-gopay rounded-2xl p-5 sm:p-6 space-y-4"
        >
          <div class="flex flex-col sm:flex-row sm:items-start justify-between gap-5">
            <div class="space-y-3 max-w-2xl">
              <div class="flex items-center gap-3">
                <div class="w-11 h-11 rounded-xl bg-[#E6F4F7] text-[#2091AA] dark:bg-[#2091AA]/20 dark:text-[#50AABF] font-poppins font-bold text-sm flex items-center justify-center border border-[#2091AA]/20 shrink-0">
                  {{ req.investorName.slice(0, 2).toUpperCase() }}
                </div>
                <div>
                  <h3 class="font-poppins font-bold text-base sm:text-lg text-neutral-900 dark:text-white">
                    {{ req.investorName }}
                  </h3>
                  <p class="text-xs text-neutral-500 font-medium">
                    {{ req.firmName }} • Diajukan pada {{ req.requestedAt }}
                  </p>
                </div>
              </div>

              <!-- Intro Message Bubble -->
              <div class="p-4 rounded-xl bg-neutral-50 dark:bg-[#18191E] border border-neutral-200/70 dark:border-neutral-800 text-xs sm:text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed italic font-sans">
                "{{ req.introMessage }}"
              </div>

              <!-- Ticket Value & Status -->
              <div class="flex flex-wrap items-center gap-3 text-xs sm:text-sm pt-0.5 font-poppins">
                <span class="text-neutral-500">Rencana Nilai Tiket Modal:</span>
                <span class="font-bold text-[#00AA13] dark:text-emerald-400 tabular-nums">
                  Rp {{ req.proposedTicket.toLocaleString('id-ID') }}
                </span>
                <span class="text-neutral-300 dark:text-neutral-700">•</span>
                <span class="text-neutral-500">Status Izin:</span>
                <span
                  :class="[
                    'text-xs font-semibold px-2.5 py-0.5 rounded-full border',
                    req.status === 'APPROVED'
                      ? 'bg-emerald-50 text-[#00AA13] border-emerald-200 dark:bg-emerald-950/60 dark:text-emerald-400 dark:border-emerald-800'
                      : req.status === 'REJECTED'
                      ? 'bg-red-50 text-red-700 border-red-200 dark:bg-red-950/60 dark:text-red-400 dark:border-red-800'
                      : 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/60 dark:text-amber-300 dark:border-amber-800'
                  ]"
                >
                  {{ req.status === 'APPROVED' ? 'Akses Terbuka' : req.status === 'REJECTED' ? 'Ditolak' : 'Menunggu Konfirmasi' }}
                </span>
              </div>
            </div>

            <!-- Action Buttons -->
            <div class="flex items-center gap-2 shrink-0 pt-2 sm:pt-0">
              <template v-if="req.status === 'PENDING'">
                <button
                  type="button"
                  class="btn-3d-green px-4 py-2 text-xs font-poppins font-semibold cursor-pointer"
                  @click="umkmStore.updateInvestorRequestStatus(req.id, 'APPROVED')"
                >
                  <HugeiconsIcon :icon="CheckmarkCircle01Icon" :size="14" :stroke-width="2.2" />
                  <span>Buka Akses</span>
                </button>
                <button
                  type="button"
                  class="px-3.5 py-2 rounded-xl border border-neutral-300 dark:border-neutral-700 text-xs font-poppins font-medium text-neutral-600 hover:text-neutral-900 dark:text-neutral-300 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors cursor-pointer"
                  @click="umkmStore.updateInvestorRequestStatus(req.id, 'REJECTED')"
                >
                  Tolak
                </button>
              </template>
              <template v-else-if="req.status === 'APPROVED'">
                <div class="flex flex-col items-end gap-1.5">
                  <span class="text-xs text-emerald-600 dark:text-emerald-400 font-semibold font-poppins">
                    Disetujui {{ req.reviewedAt }}
                  </span>
                  <button
                    type="button"
                    class="text-xs text-neutral-500 hover:text-red-600 underline cursor-pointer"
                    @click="umkmStore.updateInvestorRequestStatus(req.id, 'REJECTED')"
                  >
                    Tarik Izin Akses
                  </button>
                </div>
              </template>
              <template v-else>
                <div class="flex flex-col items-end gap-1.5">
                  <span class="text-xs text-neutral-400 font-semibold font-poppins">
                    Permintaan Ditolak
                  </span>
                  <button
                    type="button"
                    class="text-xs text-[#2091AA] hover:underline cursor-pointer font-medium"
                    @click="umkmStore.updateInvestorRequestStatus(req.id, 'APPROVED')"
                  >
                    Buka Kembali Izin
                  </button>
                </div>
              </template>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 6. TAB 3: Simulasi Akses Modal Kemitraan (Fitur Baru Penutup Plot-Hole) -->
    <div v-else-if="activeTab === 'simulation'" class="space-y-6">
      <div class="card-tactile-gopay rounded-2xl p-6 sm:p-7 space-y-6">
        <div class="pb-4 border-b border-neutral-100 dark:border-neutral-800/80">
          <h3 class="font-poppins font-bold text-lg sm:text-xl text-neutral-900 dark:text-white">
            Kalkulator Simulasi Skema Bagi Hasil Kemitraan
          </h3>
          <p class="text-xs sm:text-[13px] font-poppins text-neutral-500 dark:text-neutral-400 mt-0.5">
            Uji coba perhitungan skema pendanaan syariah bagi hasil (revenue sharing) atau dividen investor berbasis untung bersih tokomu.
          </p>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start font-poppins">
          <!-- Left Controls (6 cols) -->
          <div class="lg:col-span-6 space-y-5">
            <!-- Nilai Pengajuan Modal -->
            <div>
              <div class="flex items-center justify-between mb-1.5">
                <label class="text-xs sm:text-sm font-semibold text-neutral-800 dark:text-neutral-200">
                  Target Kebutuhan Modal Toko
                </label>
                <span class="font-bold text-[#2091AA] dark:text-[#50AABF] tabular-nums">
                  Rp {{ simAmount.toLocaleString('id-ID') }}
                </span>
              </div>
              <input
                v-model.number="simAmount"
                type="range"
                min="50000000"
                max="500000000"
                step="25000000"
                class="w-full accent-[#2091AA] cursor-pointer"
              />
              <div class="flex justify-between text-[11px] text-neutral-400 mt-1">
                <span>Rp 50 Juta</span>
                <span>Rp 250 Juta (Rekomendasi)</span>
                <span>Rp 500 Juta</span>
              </div>
            </div>

            <!-- Persentase Bagi Hasil dari Untung Bersih -->
            <div>
              <div class="flex items-center justify-between mb-1.5">
                <label class="text-xs sm:text-sm font-semibold text-neutral-800 dark:text-neutral-200">
                  Porsi Bagi Hasil untuk Investor
                </label>
                <span class="font-bold text-[#00AA13] dark:text-emerald-400 tabular-nums">
                  {{ simSharePercent }}% dari Untung Bersih
                </span>
              </div>
              <input
                v-model.number="simSharePercent"
                type="range"
                min="5"
                max="30"
                step="1"
                class="w-full accent-[#00AA13] cursor-pointer"
              />
              <div class="flex justify-between text-[11px] text-neutral-400 mt-1">
                <span>5%</span>
                <span>15% (Sehat)</span>
                <span>30%</span>
              </div>
            </div>

            <!-- Periode Kemitraan -->
            <div>
              <label class="block text-xs sm:text-sm font-semibold text-neutral-800 dark:text-neutral-200 mb-1.5">
                Estimasi Durasi Kemitraan Modal
              </label>
              <div class="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  :class="[
                    'py-2 px-3 rounded-xl text-xs font-semibold border transition-all cursor-pointer',
                    simDurationYears === 1
                      ? 'bg-[#2091AA] text-white border-[#2091AA]'
                      : 'bg-neutral-100 dark:bg-neutral-800 border-neutral-200 dark:border-neutral-700 text-neutral-600 dark:text-neutral-300'
                  ]"
                  @click="simDurationYears = 1"
                >
                  1 Tahun (12 Bln)
                </button>
                <button
                  type="button"
                  :class="[
                    'py-2 px-3 rounded-xl text-xs font-semibold border transition-all cursor-pointer',
                    simDurationYears === 2
                      ? 'bg-[#2091AA] text-white border-[#2091AA]'
                      : 'bg-neutral-100 dark:bg-neutral-800 border-neutral-200 dark:border-neutral-700 text-neutral-600 dark:text-neutral-300'
                  ]"
                  @click="simDurationYears = 2"
                >
                  2 Tahun (24 Bln)
                </button>
                <button
                  type="button"
                  :class="[
                    'py-2 px-3 rounded-xl text-xs font-semibold border transition-all cursor-pointer',
                    simDurationYears === 3
                      ? 'bg-[#2091AA] text-white border-[#2091AA]'
                      : 'bg-neutral-100 dark:bg-neutral-800 border-neutral-200 dark:border-neutral-700 text-neutral-600 dark:text-neutral-300'
                  ]"
                  @click="simDurationYears = 3"
                >
                  3 Tahun (36 Bln)
                </button>
              </div>
            </div>
          </div>

          <!-- Right Calculation Results Card (6 cols) -->
          <div class="lg:col-span-6 space-y-4">
            <div class="p-6 rounded-2xl bg-neutral-50 dark:bg-[#18191E] border border-neutral-200/80 dark:border-neutral-800 space-y-4">
              <span class="text-xs font-semibold uppercase tracking-wider text-neutral-500">
                PROYEKSI KELAYAKAN PEMBAGIAN HASIL
              </span>

              <div class="space-y-3">
                <div class="flex items-center justify-between pb-2 border-b border-neutral-200 dark:border-neutral-800">
                  <span class="text-xs text-neutral-500">Estimasi Bagi Hasil Bulanan (Investor)</span>
                  <span class="font-bold text-sm sm:text-base text-[#00AA13] dark:text-emerald-400 tabular-nums">
                    Rp {{ estimatedMonthlyShare.toLocaleString('id-ID') }} / bln
                  </span>
                </div>

                <div class="flex items-center justify-between pb-2 border-b border-neutral-200 dark:border-neutral-800">
                  <span class="text-xs text-neutral-500">Sisa Untung Bersih Tokomu</span>
                  <span class="font-bold text-sm sm:text-base text-neutral-900 dark:text-white tabular-nums">
                    Rp {{ remainingStoreProfit.toLocaleString('id-ID') }} / bln
                  </span>
                </div>

                <div class="flex items-center justify-between pb-2 border-b border-neutral-200 dark:border-neutral-800">
                  <span class="text-xs text-neutral-500">Estimasi Balik Modal (Payback Period)</span>
                  <span class="font-bold text-sm sm:text-base text-[#2091AA] dark:text-[#50AABF]">
                    {{ estimatedPaybackMonths }} Bulan
                  </span>
                </div>
              </div>

              <div class="pt-2">
                <button
                  type="button"
                  class="btn-3d-blue w-full py-2.5 text-xs sm:text-sm font-semibold cursor-pointer"
                  @click="saveSimulationToPitch"
                >
                  Simpan Skema Ini ke Profil Toko
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 7. TAB 4: Pratinjau Kartu Marketplace (Tampilan di Hadapan Investor) -->
    <div v-else-if="activeTab === 'preview'" class="space-y-6">
      <div class="p-4 sm:p-5 rounded-2xl bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed font-sans">
        Sesuai standar privasi Beruang, nominal saldo kas riil (dalam Rupiah) tidak pernah dibuka secara bebas. Investor hanya melihat rasio efisiensi, margin kotor, dan skor kesehatan terverifikasi.
      </div>

      <div class="max-w-xl mx-auto">
        <div class="card-tactile-gopay rounded-3xl p-6 sm:p-7 border border-neutral-200 dark:border-neutral-800 space-y-5">
          <!-- Top Profile Header -->
          <div class="flex items-start justify-between gap-4">
            <div class="flex items-center gap-3">
              <div class="w-12 h-12 rounded-2xl bg-white p-1.5 shadow-sm border border-neutral-200 shrink-0">
                <img src="/logo.svg" alt="Logo Usaha" class="w-full h-full object-contain" />
              </div>
              <div>
                <span class="text-[11px] font-mono font-bold text-neutral-400">ID: BERU-KOP-01</span>
                <h3 class="font-poppins font-bold text-lg sm:text-xl text-neutral-900 dark:text-white leading-tight">
                  {{ umkmStore.profile.name }}
                </h3>
                <p class="text-xs text-neutral-500 font-medium mt-0.5">
                  {{ umkmStore.profile.sector }} • {{ umkmStore.profile.city }}
                </p>
              </div>
            </div>

            <span class="inline-flex items-center gap-1.5 text-xs font-poppins font-bold px-2.5 py-1 rounded-full bg-emerald-50 text-[#00AA13] border border-emerald-200 shrink-0">
              <HugeiconsIcon :icon="CheckmarkCircle01Icon" :size="14" :stroke-width="2" />
              <span>Terverifikasi</span>
            </span>
          </div>

          <!-- Pitch Summary Bubble -->
          <div class="p-4 rounded-xl bg-neutral-50 dark:bg-[#18191E] border border-neutral-200/70 dark:border-neutral-800 text-xs sm:text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed italic font-sans">
            "{{ umkmStore.profile.pitchSummary }}"
          </div>

          <!-- Key Metrics Grid -->
          <div class="grid grid-cols-3 gap-3 text-center font-poppins">
            <div class="p-3.5 rounded-xl bg-neutral-50/80 dark:bg-[#18191E] border border-neutral-200/80 dark:border-neutral-800">
              <span class="text-xs text-neutral-500 block font-medium">Margin Untung</span>
              <span class="font-bold text-base sm:text-lg text-[#00AA13] dark:text-emerald-400 tabular-nums mt-0.5 block">48.5%</span>
            </div>
            <div class="p-3.5 rounded-xl bg-neutral-50/80 dark:bg-[#18191E] border border-neutral-200/80 dark:border-neutral-800">
              <span class="text-xs text-neutral-500 block font-medium">Pertumbuhan</span>
              <span class="font-bold text-base sm:text-lg text-[#2091AA] dark:text-[#50AABF] tabular-nums mt-0.5 block">+34.2%</span>
            </div>
            <div class="p-3.5 rounded-xl bg-neutral-50/80 dark:bg-[#18191E] border border-neutral-200/80 dark:border-neutral-800">
              <span class="text-xs text-neutral-500 block font-medium">Skor Bisnis</span>
              <span class="font-bold text-base sm:text-lg text-neutral-900 dark:text-white tabular-nums mt-0.5 block">79/100</span>
            </div>
          </div>

          <!-- Consultant Footer & CTA -->
          <div class="pt-3 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-between text-xs font-poppins">
            <div class="flex items-center gap-1.5 text-neutral-500">
              <span>Konsultan:</span>
              <strong class="text-neutral-800 dark:text-neutral-200">{{ umkmStore.profile.consultantName }}</strong>
            </div>

            <NuxtLink
              to="/investor"
              class="font-semibold text-[#2091AA] dark:text-[#50AABF] hover:underline"
            >
              Lihat di Katalog Marketplace →
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, nextTick, onBeforeUnmount } from 'vue'
import { useRoute } from 'vue-router'
import confetti from 'canvas-confetti'
import { useUmkmStore } from '~/stores/umkm'
import gsap from 'gsap'
import SiBeru from '~/components/mascot/SiBeru.vue'
import { HugeiconsIcon } from '@hugeicons/vue'
import {
  Home03Icon,
  Award01Icon,
  UserGroupIcon,
  Store01Icon,
  AnalyticsUpIcon,
  Download01Icon,
  CheckmarkCircle01Icon,
  Shield02Icon
} from '@hugeicons/core-free-icons'
import { useReportDownloader } from '~/composables/useReportDownloader'

definePageMeta({
  layout: 'dashboard'
})

const route = useRoute()
const umkmStore = useUmkmStore()
const reportDownloader = useReportDownloader()

const activeTab = ref<'gate' | 'requests' | 'simulation' | 'preview'>('gate')
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

function setActiveTab(tab: 'gate' | 'requests' | 'simulation' | 'preview') {
  activeTab.value = tab
  updateTabIndicator(false)
}

const pendingRequestsCount = computed(() => {
  return umkmStore.investorRequests.filter(r => r.status === 'PENDING').length
})

const defaultGateData: FundingGateData = {
  passedCount: 0,
  totalCount: 4,
  isReadyForFunding: false,
  status: 'IN_PROGRESS',
  certifiedAt: null,
  consultantName: 'Belum Ditugaskan',
  fundingTarget: 0,
  pendingRequestsCount: 0,
  criteria: [
    {
      id: 'fundamental_score',
      title: 'Skor Fundamental ≥ 75 Poin',
      description: 'Skor agregat 5 aspek (Finansial, Operasional, Pasar, Legalitas, dan Tata Kelola) telah mencapai ambang batas kelulusan.',
      passed: false,
      currentValue: 0,
      targetValue: 75,
      statusLabel: 'Capaian: 0/100 (Belum Memenuhi)'
    },
    {
      id: 'cash_consistency',
      title: 'Konsistensi Pelaporan Kas ≥ 3 Bulan',
      description: 'Telah mencatat dan memverifikasi laporan pergerakan uang toko secara rutin tanpa anomali kritis.',
      passed: false,
      currentValue: 0,
      targetValue: 3,
      statusLabel: '0 Bulan Tervalidasi (Minimal 3 Bulan)'
    },
    {
      id: 'legal_compliance',
      title: 'Kelengkapan Legalitas Dasar',
      description: 'Nomor Induk Berusaha (NIB) berbasis risiko terdaftar dan sertifikat izin edar aktif.',
      passed: false,
      currentValue: '-',
      targetValue: 'NIB Aktif',
      statusLabel: 'NIB Belum Diisi / Belum Terbit'
    },
    {
      id: 'consultant_recommendation',
      title: 'Rekomendasi Konsultan Pendamping',
      description: 'Persetujuan resmi dari konsultan bahwa tokomu telah siap dihubungkan dengan sindikasi modal investor.',
      passed: false,
      currentValue: 'Belum Ada',
      targetValue: 'Disetujui Konsultan',
      statusLabel: 'Belum Memiliki Konsultan Pendamping'
    }
  ]
}

const fundingGate = computed<FundingGateData>(() => {
  return umkmStore.fundingGate || defaultGateData
})

function formatTargetModal(amount: number | null | undefined): string {
  if (!amount || amount <= 0) return 'Rp 0'
  if (amount >= 1000000000) {
    return `Rp ${(amount / 1000000000).toLocaleString('id-ID', { maximumFractionDigits: 1 })} M`
  }
  if (amount >= 1000000) {
    return `Rp ${(amount / 1000000).toLocaleString('id-ID')} Jt`
  }
  return `Rp ${amount.toLocaleString('id-ID')}`
}

// Simulation Calculator State
const simAmount = ref(250000000)
const simSharePercent = ref(15)
const simDurationYears = ref(2)
const manualProfit = ref(25000000)

const currentMonthlyProfit = computed(() => {
  return umkmStore.financeSummary.netProfitMonth || manualProfit.value
})

const estimatedMonthlyShare = computed(() => {
  return Math.round(currentMonthlyProfit * (simSharePercent.value / 100))
})

const remainingStoreProfit = computed(() => {
  return currentMonthlyProfit - estimatedMonthlyShare.value
})

const estimatedPaybackMonths = computed(() => {
  if (estimatedMonthlyShare.value <= 0) return 0
  return Math.ceil(simAmount.value / estimatedMonthlyShare.value)
})

function saveSimulationToPitch() {
  umkmStore.profile.fundingTarget = simAmount.value
  alert(`Skema target modal Rp ${simAmount.value.toLocaleString('id-ID')} dengan bagi hasil ${simSharePercent.value}% berhasil disimpan ke profil toko!`)
}

function triggerCelebration() {
  confetti({
    particleCount: 120,
    spread: 80,
    origin: { y: 0.6 }
  })
}

function handleExportProposal() {
  reportDownloader.exportProposalPdf({
    storeName: umkmStore.profile.businessName || 'Kopi Senja Nusantara',
    fundingTarget: simAmount.value || umkmStore.profile.fundingTarget || 250000000,
    tenorMonths: simDurationYears.value * 12,
    profitShare: simSharePercent.value,
    description: umkmStore.profile.pitchSummary
  })
}

let handleResize: (() => void) | null = null

onMounted(() => {
  // Fetch live funding gate status, investor requests, and fundamental scores
  umkmStore.fetchFundingGate()
  umkmStore.fetchInvestorRequests()
  umkmStore.fetchAssessment()
  umkmStore.fetchProfile()
  umkmStore.fetchFinances()

  if (route.query.tab === 'requests') {
    activeTab.value = 'requests'
  } else if (route.query.tab === 'simulation') {
    activeTab.value = 'simulation'
  } else if (route.query.tab === 'preview') {
    activeTab.value = 'preview'
  }

  nextTick(() => {
    updateTabIndicator(true)
  })
  setTimeout(() => updateTabIndicator(true), 150)

  handleResize = () => updateTabIndicator(true)
  window.addEventListener('resize', handleResize)

  // GSAP Entrance
  gsap.from('.gsap-header-card', {
    opacity: 0,
    y: -10,
    duration: 0.5,
    ease: 'power2.out'
  })
})

onBeforeUnmount(() => {
  if (handleResize) {
    window.removeEventListener('resize', handleResize)
    handleResize = null
  }
})
</script>
