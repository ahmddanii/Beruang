<template>
  <div ref="pageRootRef" class="space-y-6 pb-20 font-poppins text-neutral-900 dark:text-neutral-100">
    <!-- Toast Feedback Notification -->
    <Transition
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="opacity-0 -translate-y-2 scale-95"
      enter-to-class="opacity-100 translate-y-0 scale-100"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="opacity-100 translate-y-0 scale-100"
      leave-to-class="opacity-0 -translate-y-2 scale-95"
    >
      <div
        v-if="toastMessage"
        class="fixed top-6 left-1/2 -translate-x-1/2 z-50 px-4 py-2.5 rounded-full bg-neutral-900/90 dark:bg-neutral-800/90 text-white border border-neutral-700/60 backdrop-blur-md text-xs font-poppins font-semibold shadow-xl flex items-center gap-2 pointer-events-none"
      >
        <HugeiconsIcon :icon="CheckmarkCircle01Icon" :size="16" class="text-emerald-400 shrink-0" />
        <span>{{ toastMessage }}</span>
      </div>
    </Transition>

    <!-- Top Breadcrumb Navigation -->
    <div class="flex items-center justify-between pb-2 border-b border-neutral-100 dark:border-neutral-800/80">
      <NuxtLink
        to="/investor"
        class="inline-flex items-center gap-1.5 text-xs font-semibold text-[#2091AA] dark:text-[#50AABF] hover:underline transition-colors"
      >
        <HugeiconsIcon :icon="ArrowLeft01Icon" :size="14" :stroke-width="2.2" />
        <span>Kembali ke Katalog Peluang Usaha</span>
      </NuxtLink>

      <div class="flex items-center gap-2">
        <span class="text-xs text-neutral-400 font-mono">{{ item?.code }}</span>
        <span class="text-neutral-300 dark:text-neutral-700">•</span>
        <NuxtLink
          :to="`/investor/umkm/${umkmId}`"
          class="text-xs font-medium text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors"
        >
          Lihat Profil Publik Toko →
        </NuxtLink>
      </div>
    </div>

    <!-- ========================================================================================= -->
    <!-- CASE A: LOCKED STATE (Jika investor belum memiliki izin APPROVED)                         -->
    <!-- ========================================================================================= -->
    <div
      v-if="item?.accessStatus !== 'APPROVED'"
      class="card-tactile-gopay max-w-xl mx-auto p-8 sm:p-12 rounded-3xl border text-center space-y-5"
    >
      <div class="w-16 h-16 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-amber-500 flex items-center justify-center mx-auto shadow-xs">
        <HugeiconsIcon :icon="SquareLock02Icon" :size="32" :stroke-width="1.8" />
      </div>
      <div class="space-y-2">
        <div class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-100/70 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300">
          <span>Izin Akses Belum Terbuka</span>
        </div>
        <h2 class="font-poppins font-bold text-2xl text-neutral-900 dark:text-white tracking-tight">
          Data Room Privat Terkunci
        </h2>
        <p class="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 max-w-md mx-auto leading-relaxed font-sans">
          Seluruh laporan keuangan riil, mutasi bank giro, dan berkas legalitas <strong>{{ item?.name }}</strong> dilindungi oleh sistem kerahasiaan Beruang. Ajukan izin permohonan akses data untuk membuka ruangan privat ini.
        </p>
      </div>

      <div class="pt-3 flex flex-col sm:flex-row items-center justify-center gap-3">
        <NuxtLink
          :to="`/investor/umkm/${umkmId}/ajukan-akses`"
          class="btn-pill-action group cursor-pointer inline-flex items-center gap-2"
        >
          <span>Ajukan Izin Akses Data Room</span>
          <HugeiconsIcon :icon="ArrowRight01Icon" :size="15" :stroke-width="2.2" />
        </NuxtLink>
      </div>
    </div>

    <!-- ========================================================================================= -->
    <!-- CASE B: APPROVED STATE (Virtual Data Room Aktif Ber-Watermark)                             -->
    <!-- ========================================================================================= -->
    <div v-else class="space-y-6 relative">
      <!-- Dynamic Security Watermark Overlay Layer (Non-Intrusive, Highly Legitimate) -->
      <div
        class="fixed inset-0 pointer-events-none z-40 overflow-hidden flex items-center justify-center select-none opacity-[0.035] dark:opacity-[0.05]"
        aria-hidden="true"
      >
        <div class="transform -rotate-25 text-center text-neutral-900 dark:text-white font-mono font-bold text-sm tracking-widest leading-loose">
          RAHASIA • DILINDUNGI HUKUM BERUANG • {{ authStore.currentUser?.name }} ({{ authStore.currentUser?.email || 'investor@beruang.id' }}) • {{ accessTimestamp }}<br />
          TIDAK UNTUK DIDISTRIBUSIKAN • AUDIT LOG ID: SEC-{{ umkmId }}-8921
        </div>
      </div>

      <!-- 1. Executive Data Room Banner Header (GoPay Tactile Card with Blue Accent) -->
      <div class="card-tactile-gopay has-blue-banner rounded-3xl overflow-hidden border">
        <!-- Top: Blue Banner Bar -->
        <div class="card-header-blue-banner px-6 sm:px-8 py-3.5 flex items-center justify-between text-white">
          <div class="flex items-center gap-2.5">
            <HugeiconsIcon :icon="ShieldCheckIcon" :size="20" :stroke-width="2.2" class="text-white" />
            <span class="text-xs sm:text-sm font-semibold uppercase tracking-wider">
              VIRTUAL DATA ROOM PRIVAT • ENKRIPSI AES-256
            </span>
          </div>
          <span class="text-xs font-mono opacity-90">ID LOG: SEC-{{ umkmId }}-8921</span>
        </div>

        <!-- Bottom: Body Container -->
        <div class="bg-white dark:bg-[#13161F] p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div class="space-y-2 max-w-2xl">
            <div class="flex items-center gap-2 flex-wrap">
              <span class="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-50 text-[#00AA13] dark:bg-emerald-950/60 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800 flex items-center gap-1">
                <HugeiconsIcon :icon="CheckmarkCircle01Icon" :size="13" />
                <span>Izin Akses Disetujui Pemilik</span>
              </span>
              <span class="text-xs text-neutral-400 font-mono">{{ item?.code }}</span>
            </div>

            <h1 class="text-2xl sm:text-3xl font-heading font-bold text-neutral-900 dark:text-white tracking-tight">
              Data Room Finansial: {{ item?.name }}
            </h1>

            <p class="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed font-sans">
              Akses menyeluruh terhadap pembukuan arus kas riil, bukti rekening koran giro bank terverifikasi, dan izin legalitas resmi usaha di bawah pengawasan konsultan pendamping.
            </p>
          </div>

          <!-- Sesi Validasi Status & Action -->
          <div class="flex flex-col sm:items-end gap-3 shrink-0">
            <div class="p-3 rounded-2xl bg-neutral-50 dark:bg-neutral-800/60 border border-neutral-200/70 dark:border-neutral-700/70 text-xs space-y-1">
              <div class="flex items-center gap-1.5 font-semibold text-neutral-900 dark:text-white">
                <HugeiconsIcon :icon="Clock01Icon" :size="14" class="text-[#2091AA] dark:text-[#50AABF]" />
                <span>Sesi Validasi Aktif:</span>
              </div>
              <p class="text-[11px] text-neutral-500 font-mono">
                {{ authStore.currentUser?.name || 'Investor Rekanan' }} • {{ accessTimestamp }}
              </p>
            </div>

            <!-- Primary Action: Ajukan Minat Pendanaan / Term Sheet -->
            <button
              type="button"
              class="btn-pill-action group cursor-pointer inline-flex items-center gap-2 text-xs"
              @click="showTermSheetModal = true"
            >
              <HugeiconsIcon :icon="Coins01Icon" :size="15" :stroke-width="2.2" />
              <span>Ajukan Minat Pendanaan</span>
            </button>
          </div>
        </div>
      </div>

      <!-- 2. Macro Navigation Tabs for Data Room (Kas Riil, Vault Berkas, Rencana Aksi) -->
      <BPillTabs
        v-model="activeDataRoomTab"
        :tabs="dataRoomTabs"
        size="md"
        :full-width="true"
      />

      <!-- ======================================================================================= -->
      <!-- TAB 1: LAPORAN KEUANGAN & PEMBUKUAN KAS RIIL (P&L Audited)                              -->
      <!-- ======================================================================================= -->
      <div v-if="activeDataRoomTab === 'pnl'" class="space-y-6">
        <!-- 4 Key Metric Cards (Unified Black Figures as Requested) -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div class="card-tactile-gopay rounded-2xl p-4.5 border space-y-2">
            <span class="text-xs text-neutral-500 font-medium">Total Pendapatan (30 Hari)</span>
            <div class="text-xl sm:text-2xl font-bold text-neutral-900 dark:text-white tabular-nums tracking-tight">
              Rp 100.000.000
            </div>
            <span class="text-[11px] text-emerald-600 font-semibold block">+9.8% (MoM) Positif</span>
          </div>

          <div class="card-tactile-gopay rounded-2xl p-4.5 border space-y-2">
            <span class="text-xs text-neutral-500 font-medium">Modal Jualan Bahan Baku</span>
            <div class="text-xl sm:text-2xl font-bold text-neutral-900 dark:text-white tabular-nums tracking-tight">
              Rp 45.100.000
            </div>
            <span class="text-[11px] text-emerald-600 font-semibold block">45.1% (Sangat Hemat)</span>
          </div>

          <div class="card-tactile-gopay rounded-2xl p-4.5 border space-y-2">
            <span class="text-xs text-neutral-500 font-medium">Biaya Operasional Toko</span>
            <div class="text-xl sm:text-2xl font-bold text-neutral-900 dark:text-white tabular-nums tracking-tight">
              Rp 22.300.000
            </div>
            <span class="text-[11px] text-[#2091AA] font-semibold block">Sewa, Listrik, Gaji</span>
          </div>

          <div class="card-tactile-gopay rounded-2xl p-4.5 border space-y-2">
            <span class="text-xs text-neutral-500 font-medium">Untung Bersih</span>
            <div class="text-xl sm:text-2xl font-bold text-neutral-900 dark:text-white tabular-nums tracking-tight">
              Rp 32.600.000
            </div>
            <span class="text-[11px] text-emerald-600 font-semibold block">Margin Bersih 32.6%</span>
          </div>
        </div>

        <!-- Audited Full P&L Table (Venture-Grade, Clean, Reduced Density) -->
        <div class="card-tactile-gopay rounded-2xl p-5 sm:p-7 border space-y-4">
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-neutral-100 dark:border-neutral-800/80">
            <div>
              <h3 class="font-poppins font-bold text-lg text-neutral-900 dark:text-white">
                1. Laporan Untung Rugi Riil (Tervalidasi 5 Bulan)
              </h3>
              <p class="text-xs text-neutral-500 mt-0.5 font-sans">
                Terekonsiliasi mutasi kasir harian & rekening giro oleh konsultan: {{ item?.consultantName }}
              </p>
            </div>

            <button
              type="button"
              class="px-3.5 py-1.5 rounded-xl border border-neutral-200 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800 text-xs font-semibold text-neutral-700 dark:text-neutral-300 transition-colors flex items-center gap-1.5 self-start sm:self-auto cursor-pointer"
              @click="downloadCsvFeedback"
            >
              <HugeiconsIcon :icon="Download01Icon" :size="14" />
              <span>Ekspor Data (CSV)</span>
            </button>
          </div>

          <div class="overflow-x-auto rounded-xl border border-neutral-200/80 dark:border-neutral-800 bg-white dark:bg-[#13161F]">
            <table class="w-full text-left text-xs font-poppins">
              <thead class="bg-neutral-50 dark:bg-neutral-900/80 text-neutral-600 dark:text-neutral-400 font-semibold uppercase tracking-wider border-b border-neutral-200 dark:border-neutral-800">
                <tr>
                  <th class="py-3 px-4">Periode</th>
                  <th class="py-3 px-4">Total Pendapatan (Rp)</th>
                  <th class="py-3 px-4">Modal Jualan (Rp)</th>
                  <th class="py-3 px-4">Untung Kotor</th>
                  <th class="py-3 px-4">Margin %</th>
                  <th class="py-3 px-4">Biaya Operasional</th>
                  <th class="py-3 px-4">Untung Bersih</th>
                  <th class="py-3 px-4 text-right">Saldo Kas</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-neutral-100 dark:divide-neutral-800/80 text-neutral-800 dark:text-neutral-200">
                <tr
                  v-for="(rec, idx) in [...umkmStore.monthlyRecords].reverse()"
                  :key="rec.month"
                  :class="idx % 2 === 0 ? 'bg-white dark:bg-[#13161F]' : 'bg-neutral-50/50 dark:bg-neutral-800/30'"
                >
                  <td class="py-3.5 px-4 font-bold text-neutral-900 dark:text-white">
                    {{ rec.month }} {{ rec.year }}
                  </td>
                  <td class="py-3.5 px-4 tabular-nums font-semibold">
                    Rp {{ rec.omzet.toLocaleString('id-ID') }}
                  </td>
                  <td class="py-3.5 px-4 tabular-nums text-neutral-700 dark:text-neutral-300">
                    Rp {{ rec.hpp.toLocaleString('id-ID') }}
                  </td>
                  <td class="py-3.5 px-4 tabular-nums font-semibold text-emerald-600 dark:text-emerald-400">
                    Rp {{ (rec.omzet - rec.hpp).toLocaleString('id-ID') }}
                  </td>
                  <td class="py-3.5 px-4 tabular-nums font-bold text-emerald-600 dark:text-emerald-400">
                    {{ Math.round(((rec.omzet - rec.hpp) / rec.omzet) * 100) }}%
                  </td>
                  <td class="py-3.5 px-4 tabular-nums text-neutral-600 dark:text-neutral-400">
                    Rp {{ rec.opex.toLocaleString('id-ID') }}
                  </td>
                  <td class="py-3.5 px-4 tabular-nums font-bold text-neutral-900 dark:text-white">
                    Rp {{ rec.netProfit.toLocaleString('id-ID') }}
                  </td>
                  <td class="py-3.5 px-4 tabular-nums font-semibold text-[#2091AA] dark:text-[#50AABF] text-right">
                    Rp {{ rec.cashBalance.toLocaleString('id-ID') }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <!-- ======================================================================================= -->
      <!-- TAB 2: RUANG BERKAS & DOKUMEN LEGALITAS (Interactive Vault with In-App Preview)         -->
      <!-- ======================================================================================= -->
      <div v-else-if="activeDataRoomTab === 'docs'" class="space-y-6">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- Vault 1: Rekening Koran & Mutasi Giro Bank -->
          <div class="card-tactile-gopay rounded-2xl p-5 sm:p-6 border space-y-4">
            <div class="flex items-center gap-2.5 pb-3 border-b border-neutral-100 dark:border-neutral-800/80">
              <div class="w-8 h-8 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-[#0066D6] dark:text-blue-400 flex items-center justify-center">
                <HugeiconsIcon :icon="File01Icon" :size="16" :stroke-width="2" />
              </div>
              <div>
                <h4 class="font-poppins font-bold text-sm text-neutral-900 dark:text-white">
                  1. Rekening Koran Bank & Kasir POS
                </h4>
                <p class="text-[11px] text-neutral-500">Mutasi resmi giro usaha terpisah</p>
              </div>
            </div>

            <div class="space-y-2.5">
              <div
                v-for="doc in bankDocsList"
                :key="doc.name"
                class="p-3.5 rounded-xl bg-neutral-100/70 dark:bg-neutral-800/60 border border-neutral-200/60 dark:border-neutral-700/60 flex items-center justify-between text-xs transition-colors hover:border-neutral-300 group"
              >
                <div class="min-w-0 space-y-0.5">
                  <h5 class="font-semibold text-neutral-900 dark:text-white truncate">{{ doc.name }}</h5>
                  <span class="text-[11px] text-neutral-500 dark:text-neutral-400 block">{{ doc.size }} • {{ doc.verifiedDate }}</span>
                </div>

                <button
                  type="button"
                  class="px-3 py-1.5 rounded-lg bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-xs font-semibold text-[#2091AA] dark:text-[#50AABF] hover:bg-neutral-50 transition-colors flex items-center gap-1.5 cursor-pointer shrink-0"
                  @click="openDocPreviewModal(doc)"
                >
                  <HugeiconsIcon :icon="ViewIcon" :size="13" />
                  <span>Pratinjau</span>
                </button>
              </div>
            </div>
          </div>

          <!-- Vault 2: Izin Usaha & Kepatuhan Legalitas -->
          <div class="card-tactile-gopay rounded-2xl p-5 sm:p-6 border space-y-4">
            <div class="flex items-center gap-2.5 pb-3 border-b border-neutral-100 dark:border-neutral-800/80">
              <div class="w-8 h-8 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-[#00AA13] dark:text-emerald-400 flex items-center justify-center">
                <HugeiconsIcon :icon="ShieldCheckIcon" :size="16" :stroke-width="2" />
              </div>
              <div>
                <h4 class="font-poppins font-bold text-sm text-neutral-900 dark:text-white">
                  2. Izin Usaha & Legalitas Resmi
                </h4>
                <p class="text-[11px] text-neutral-500">Kepatuhan OSS RBA, Halal, & Sewa</p>
              </div>
            </div>

            <div class="space-y-2.5">
              <div
                v-for="leg in legalDocsList"
                :key="leg.name"
                class="p-3.5 rounded-xl bg-neutral-100/70 dark:bg-neutral-800/60 border border-neutral-200/60 dark:border-neutral-700/60 flex items-center justify-between text-xs transition-colors hover:border-neutral-300 group"
              >
                <div class="min-w-0 space-y-0.5">
                  <h5 class="font-semibold text-neutral-900 dark:text-white truncate">{{ leg.name }}</h5>
                  <span class="text-[11px] text-[#00AA13] dark:text-emerald-400 font-medium block">● {{ leg.status }}</span>
                </div>

                <button
                  type="button"
                  class="px-3 py-1.5 rounded-lg bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-xs font-semibold text-[#2091AA] dark:text-[#50AABF] hover:bg-neutral-50 transition-colors flex items-center gap-1.5 cursor-pointer shrink-0"
                  @click="openDocPreviewModal(leg)"
                >
                  <HugeiconsIcon :icon="ViewIcon" :size="13" />
                  <span>Pratinjau</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- ======================================================================================= -->
      <!-- TAB 3: REKAM JEJAK EKSEKUSI RENCANA AKSI (Execution Capability Track Record)            -->
      <!-- ======================================================================================= -->
      <div v-else-if="activeDataRoomTab === 'actions'" class="space-y-6">
        <div class="card-tactile-gopay rounded-2xl p-5 sm:p-7 border space-y-4 font-poppins">
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-neutral-100 dark:border-neutral-800/80">
            <div>
              <h3 class="font-poppins font-bold text-lg text-neutral-900 dark:text-white">
                Rekam Jejak Eksekusi Roadmap Rencana Aksi
              </h3>
              <p class="text-xs text-neutral-500 mt-0.5 font-sans">
                Bukti disiplin operasional toko dalam menuntaskan langkah perbaikan bersama konsultan pendamping.
              </p>
            </div>
            <span class="px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-[#00AA13] border border-emerald-200 shrink-0">
              4 Tugas Selesai • 100% Terverifikasi
            </span>
          </div>

          <div class="space-y-3">
            <div
              v-for="act in executedActionsList"
              :key="act.id"
              class="p-4 rounded-xl bg-neutral-100/70 dark:bg-neutral-800/50 border border-neutral-200/60 dark:border-neutral-700/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
            >
              <div class="space-y-1">
                <div class="flex items-center gap-2">
                  <span class="px-2 py-0.5 rounded text-[10px] font-bold bg-white dark:bg-neutral-900 text-neutral-600 dark:text-neutral-300 border border-neutral-200">
                    {{ act.category }}
                  </span>
                  <span class="text-xs font-bold text-emerald-600 flex items-center gap-1">
                    <HugeiconsIcon :icon="CheckmarkCircle01Icon" :size="13" />
                    <span>Tuntas Diverifikasi</span>
                  </span>
                </div>
                <h4 class="font-bold text-sm text-neutral-900 dark:text-white">{{ act.title }}</h4>
                <p class="text-xs text-neutral-500 font-sans">{{ act.impact }}</p>
              </div>

              <div class="text-left sm:text-right shrink-0">
                <span class="text-[11px] text-neutral-400 block font-mono">{{ act.date }}</span>
                <span class="text-xs font-medium text-neutral-600 dark:text-neutral-400">Verifikator: {{ item?.consultantName }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- ========================================================================================= -->
    <!-- ========================================================================================= -->
    <!-- MODAL 1: INTERACTIVE DOCUMENT PREVIEW GOOGLE DRIVE STYLE (BDocumentViewerModal)             -->
    <!-- ========================================================================================= -->
    <BDocumentViewerModal
      :model-value="!!activePreviewDoc"
      :doc="activePreviewDoc ? { id: activePreviewDoc.id || 'doc', title: activePreviewDoc.name || activePreviewDoc.title, subtitle: activePreviewDoc.category, categoryBadge: activePreviewDoc.category, file: activePreviewDoc.file || { name: activePreviewDoc.name, size: activePreviewDoc.size || '1.2 MB', uploadedAt: 'Terverifikasi', isVerified: true, fileUrl: activePreviewDoc.fileUrl } } : null"
      :business-name="businessProfile.name"
      :owner-name="businessProfile.ownerName || 'Pemilik Usaha'"
      :business-address="businessProfile.city ? `${businessProfile.city}, Indonesia` : ''"
      :sector="businessProfile.sector"
      :consultant-name="businessProfile.consultantName"
      @update:model-value="(val) => { if (!val) activePreviewDoc = null }"
      @close="activePreviewDoc = null"
    />

    <!-- ========================================================================================= -->
    <!-- MODAL 2: AJUKAN MINAT PENDANAAN / TERM SHEET (Deal-Making Proposal Action)                 -->
    <!-- ========================================================================================= -->
    <div
      v-if="showTermSheetModal"
      class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-in fade-in duration-150"
      @click.self="showTermSheetModal = false"
    >
      <div class="card-tactile-gopay rounded-3xl p-6 sm:p-7 border max-w-lg w-full space-y-5 bg-white dark:bg-[#13161F] shadow-2xl">
        <div class="flex items-start justify-between">
          <div>
            <span class="text-[10px] font-bold text-[#00AA13] uppercase tracking-wider block">
              SINDIKASI MODAL BERUANG
            </span>
            <h3 class="font-poppins font-bold text-lg text-neutral-900 dark:text-white mt-0.5">
              Ajukan Surat Minat Investasi (Term Sheet)
            </h3>
            <p class="text-xs text-neutral-500 mt-0.5">Kepada: {{ item?.name }}</p>
          </div>
          <button
            type="button"
            class="p-1 rounded-lg text-neutral-400 hover:text-neutral-600 dark:hover:text-white cursor-pointer"
            @click="showTermSheetModal = false"
          >
            ✕
          </button>
        </div>

        <form @submit.prevent="submitTermSheet" class="space-y-4 text-xs font-poppins">
          <div>
            <label class="block font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
              Nominal Tiket Investasi (Rp)
            </label>
            <input
              v-model.number="termSheetForm.amount"
              type="number"
              step="5000000"
              required
              class="w-full px-3.5 py-2.5 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-sm font-bold tabular-nums text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#2091AA]/30"
            />
          </div>

          <div>
            <label class="block font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
              Pilihan Skema Kemitraan Modal
            </label>
            <select
              v-model="termSheetForm.scheme"
              class="w-full px-3.5 py-2 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-xs text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#2091AA]/30"
            >
              <option value="REVENUE_SHARE">Bagi Hasil Pendapatan / Revenue Sharing (Syariah)</option>
              <option value="PROFIT_SHARE">Bagi Hasil Untung Bersih (Net Profit Sharing)</option>
              <option value="CONVERTIBLE_NOTE">Pinjaman Kemitraan Konvertibel</option>
            </select>
          </div>

          <div>
            <label class="block font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
              Catatan & Syarat Pendampingan untuk Pelaku Usaha
            </label>
            <textarea
              v-model="termSheetForm.notes"
              rows="3"
              placeholder="Sampaikan rencana waktu pencairan modal, ekspektasi pelaporan kas bulanan, atau dukungan jaringan gerai yang dapat Anda berikan..."
              class="w-full px-3.5 py-2 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-xs text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#2091AA]/30 font-sans"
            />
          </div>

          <div class="pt-3 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-end gap-2.5">
            <button
              type="button"
              class="px-4 py-2 rounded-xl text-xs font-semibold text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800 cursor-pointer"
              @click="showTermSheetModal = false"
            >
              Batal
            </button>

            <button
              type="submit"
              class="px-5 py-2 rounded-xl text-xs font-bold bg-[#00AA13] hover:bg-[#009210] text-white shadow-xs cursor-pointer transition-all"
            >
              Kirim Surat Minat Resmi →
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import gsap from 'gsap'
import { useRoute } from 'vue-router'
import BPillTabs, { type PillTabItem } from '~/components/base/BPillTabs.vue'
import { useAuthStore } from '~/stores/auth'
import { useInvestorStore } from '~/stores/investor'
import { useUmkmStore } from '~/stores/umkm'
import BDocumentViewerModal from '~/components/base/BDocumentViewerModal.vue'
import { HugeiconsIcon } from '@hugeicons/vue'
import {
  ArrowLeft01Icon,
  ArrowRight01Icon,
  SquareLock02Icon,
  ShieldCheckIcon,
  Clock01Icon,
  Coins01Icon,
  Download01Icon,
  File01Icon,
  CheckmarkCircle01Icon,
  ViewIcon,
  AnalyticsUpIcon,
  Task01Icon
} from '@hugeicons/core-free-icons'

definePageMeta({
  layout: 'dashboard',
  hideHeader: true
})

const route = useRoute()
const umkmId = computed(() => (route.params.id as string) || 'umkm-01')

const authStore = useAuthStore()
const investorStore = useInvestorStore()
const umkmStore = useUmkmStore()
const pageRootRef = ref<HTMLElement | null>(null)
let gsapCtx: gsap.Context | null = null

onMounted(() => {
  if (typeof window !== 'undefined' && pageRootRef.value) {
    const prefersReducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches
    if (!prefersReducedMotion) {
      gsapCtx = gsap.context(() => {
        const cards = pageRootRef.value?.querySelectorAll('.card-tactile-gopay')
        if (cards && cards.length > 0) {
          gsap.fromTo(
            cards,
            { opacity: 0, y: 14 },
            {
              opacity: 1,
              y: 0,
              duration: 0.45,
              stagger: 0.05,
              ease: 'power2.out',
              clearProps: 'all'
            }
          )
        }
      }, pageRootRef.value)
    }
  }
})

onBeforeUnmount(() => {
  if (gsapCtx) {
    gsapCtx.revert()
    gsapCtx = null
  }
})

const item = computed(() => {
  return investorStore.marketplaceList.find(m => m.id === umkmId.value) || investorStore.marketplaceList[0]
})

const accessTimestamp = new Date().toLocaleString('id-ID', {
  day: '2-digit',
  month: 'short',
  year: 'numeric',
  hour: '2-digit',
  minute: '2-digit'
})

// Tab Navigation
const dataRoomTabs: PillTabItem[] = [
  { id: 'pnl', label: 'Laporan Untung Rugi Riil', shortLabel: 'Untung Rugi', icon: AnalyticsUpIcon },
  { id: 'docs', label: 'Vault Berkas & Legalitas', shortLabel: 'Berkas Legal', icon: File01Icon },
  { id: 'actions', label: 'Rekam Jejak Rencana Aksi', shortLabel: 'Rencana Aksi', icon: Task01Icon }
]
const activeDataRoomTab = ref('pnl')

// Toast State
const toastMessage = ref('')
let toastTimer: any = null

function triggerToast(msg: string) {
  toastMessage.value = msg
  if (toastTimer) clearTimeout(toastTimer)
  toastTimer = setTimeout(() => {
    toastMessage.value = ''
  }, 2500)
}

function downloadCsvFeedback() {
  triggerToast('Berkas CSV Laporan Untung Rugi Tervalidasi berhasil diekspor!')
}

// Vault Documents
const bankDocsList = [
  { name: 'Rekening Koran Mandiri Giro Usaha (Sep 2026)', size: '2.4 MB PDF', verifiedDate: 'Validasi 20 Sep 2026' },
  { name: 'Rekening Koran Mandiri Giro Usaha (Agu 2026)', size: '2.1 MB PDF', verifiedDate: 'Validasi 18 Agu 2026' },
  { name: 'Rekapitulasi Arus Kas POS Kasir (Mei-Sep)', size: '1.2 MB PDF', verifiedDate: 'Validasi 22 Sep 2026' }
]

const legalDocsList = [
  { name: 'Nomor Induk Berusaha (NIB RBA - KBLI 56303)', status: 'Aktif Terdaftar di OSS RI' },
  { name: 'Sertifikat Halal Resmi BPJPH Kemenag', status: 'Terbit Berlaku s.d 2028' },
  { name: 'Perjanjian Sewa Gerai 3 Cabang Aktif', status: 'Aman s.d Desember 2028' }
]

// Executed Actions List (Reflecting the UMKM Rencana Aksi achievements)
const executedActionsList = [
  {
    id: 'act-1',
    category: 'Finansial & Kas',
    title: 'Pemisahan Rekening Pribadi & Usaha (Bank Mandiri Giro)',
    impact: 'Arus kas toko kini 100% bersih tanpa tercampur beban keluarga.',
    date: '15 Sep 2026'
  },
  {
    id: 'act-2',
    category: 'Legalitas',
    title: 'Penerbitan NIB Berbasis Risiko OSS KBLI 56303',
    impact: 'Memenuhi syarat legalitas institusional untuk sindikasi modal.',
    date: '10 Sep 2026'
  },
  {
    id: 'act-3',
    category: 'Operasional',
    title: 'Standardisasi Resep Bahan Baku & SOP Barista',
    impact: 'Menurunkan porsi modal jualan menjadi stabil 45.1%.',
    date: '02 Sep 2026'
  },
  {
    id: 'act-4',
    category: 'Tata Kelola Kas',
    title: 'Digitalisasi Kasir POS & Rekonsiliasi Nota QRIS',
    impact: 'Seluruh penjualan harian tercatat akurat dan siap diverifikasi pemodal.',
    date: '25 Agu 2026'
  }
]

// Document Preview Modal State
const activePreviewDoc = ref<any>(null)

function openDocPreviewModal(doc: any) {
  activePreviewDoc.value = doc
}

// Term Sheet Deal-Making Modal State
const showTermSheetModal = ref(false)
const termSheetForm = ref({
  amount: 150000000,
  scheme: 'REVENUE_SHARE',
  notes: ''
})

function submitTermSheet() {
  showTermSheetModal.value = false
  triggerToast(`Surat Minat Investasi Rp ${termSheetForm.value.amount.toLocaleString('id-ID')} berhasil dikirimkan ke pemilik usaha!`)
}
</script>
