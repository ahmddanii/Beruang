<template>
  <div class="space-y-6 sm:space-y-8 pb-20 font-sans">
    
    <!-- 1. EXECUTIVE CONSULTANT GREETING -->
    <div class="p-1.5 sm:p-2 rounded-3xl bg-neutral-200/50 dark:bg-neutral-800/40 border border-neutral-300/40 dark:border-neutral-700/30 shadow-xs">
      <div class="p-6 sm:p-8 lg:p-9 rounded-[calc(1.5rem-0.25rem)] bg-white dark:bg-[#13161F] border border-neutral-200/80 dark:border-white/10 relative overflow-hidden">
        <div class="space-y-2 max-w-3xl relative z-10 text-left">
          <h1 class="text-2xl sm:text-3xl lg:text-4xl font-heading font-extrabold text-neutral-900 dark:text-white tracking-tight leading-tight">
            Halo, {{ konsultanStore.profile.name }}
          </h1>

          <p class="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed font-sans max-w-2xl">
            Berikut rangkuman aktivitas bimbingan tokomu hari ini. Tangani <strong class="text-amber-600 dark:text-amber-400">anomali masalah</strong> yang butuh perhatian segera, atau buka menu pintasan untuk menuju tugasmu.
          </p>
        </div>
      </div>
    </div>

    <!-- 2. MACRO METRICS TELEMETRY (4 BANNER CARDS KONSISTEN DENGAN DASHBOARD UMKM) -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-stretch">
      <!-- Card 1: Total Klien Binaan -->
      <BMetricBannerCard
        title="KLIEN BINAAN"
        :icon="UserGroupIcon"
        :value="konsultanStore.clients.length"
        unit="Usaha"
        subtitle="Kesiapan"
        :subvalue="`${readyCount} Siap Modal`"
        subvalue-color="green"
        action-label="Lihat Klien"
        to="/konsultan/klien"
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
        action-label="Tinjau Masuk"
        to="/konsultan/klien?tab=permintaan"
      />

      <!-- Card 3: Action Plan Diberikan -->
      <BMetricBannerCard
        title="ACTION PLAN"
        :icon="Task01Icon"
        :value="konsultanStore.actionPlans.length"
        unit="Arahan"
        subtitle="Realisasi"
        :subvalue="`${completedPlansCount} Selesai`"
        subvalue-color="green"
        action-label="Kelola Aksi"
        to="/konsultan/rencana-aksi"
      />

      <!-- Card 4: Validasi Kas -->
      <BMetricBannerCard
        title="VALIDASI KAS"
        :icon="CheckmarkCircle01Icon"
        :value="konsultanStore.validationsQueue.length"
        unit="Laporan"
        subtitle="Antrean"
        :subvalue="konsultanStore.validationsQueue.length > 0 ? `${konsultanStore.validationsQueue.length} Menunggu` : 'Sudah Valid'"
        :subvalue-color="konsultanStore.validationsQueue.length > 0 ? 'amber' : 'green'"
        action-label="Validasi Kas"
        to="/konsultan/validasi"
      />
    </div>

    <!-- 3. RADAR MASALAH & TINDAKAN CEPAT (ISSUE RADAR & DIRECT NAVIGATION) -->
    <div class="card-tactile-gopay p-6 sm:p-8 rounded-3xl space-y-6 text-left border-l-4 border-l-amber-500">
      <!-- Section Header -->
      <div class="space-y-1 pb-4 border-b border-neutral-200/70 dark:border-white/10">
        <h2 class="text-xl sm:text-2xl font-heading font-extrabold text-neutral-900 dark:text-white tracking-tight">
          Isu yang Memerlukan Respons Segera
        </h2>
        <p class="text-xs text-neutral-500 dark:text-neutral-400 font-sans">
          Klik tombol tindakan pada masing-masing isu untuk langsung menuju halaman penanganan yang tepat.
        </p>
      </div>

      <!-- Urgent Issue Action Cards -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <!-- Item 1: Anomali Dapur Mama Catering (Severity High) -->
        <div class="p-4 sm:p-5 rounded-2xl bg-white dark:bg-[#18191E] border border-rose-200 dark:border-rose-900/40 shadow-xs flex flex-col justify-between space-y-3">
          <div class="space-y-1.5">
            <div class="flex items-center justify-between gap-2">
              <span class="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300">
                Kritis • Margin Turun
              </span>
              <span class="text-[11px] text-neutral-400">23 Sep 2026</span>
            </div>
            <h3 class="font-bold text-sm sm:text-base text-neutral-900 dark:text-white leading-tight">
              Dapur Mama Catering: Margin Bersih Kritis (&lt;5%)
            </h3>
            <p class="text-xs text-neutral-600 dark:text-neutral-300 leading-relaxed font-sans">
              Biaya logistik katering naik 30% tanpa penyesuaian harga menu. Skor kesehatan usaha turun ke 54/100 (Bahaya).
            </p>
          </div>

          <div class="flex items-center justify-between pt-2 border-t border-neutral-100 dark:border-white/5 gap-2">
            <span class="text-[11px] text-neutral-400">Yogyakarta</span>
            <div class="flex items-center gap-2">
              <NuxtLink
                to="/konsultan/klien/umkm-04"
                class="px-3 py-1.5 rounded-full border border-neutral-200 dark:border-neutral-700 hover:border-rose-500 text-rose-600 dark:text-rose-400 font-bold text-xs transition-colors"
              >
                Diagnosa Usaha
              </NuxtLink>
              <NuxtLink
                to="/konsultan/rencana-aksi?client=umkm-04"
                class="px-3.5 py-1.5 rounded-full bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs transition-all shadow-2xs flex items-center gap-1"
              >
                <span>Beri Solusi</span>
                <HugeiconsIcon :icon="ArrowRight01Icon" :size="12" :stroke-width="2" />
              </NuxtLink>
            </div>
          </div>
        </div>

        <!-- Item 2: Anomali Kopi Senja Nusantara (Severity Medium) -->
        <div class="p-4 sm:p-5 rounded-2xl bg-white dark:bg-[#18191E] border border-amber-200 dark:border-amber-900/40 shadow-xs flex flex-col justify-between space-y-3">
          <div class="space-y-1.5">
            <div class="flex items-center justify-between gap-2">
              <span class="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300">
                Peringatan • HPP Naik
              </span>
              <span class="text-[11px] text-neutral-400">25 Sep 2026</span>
            </div>
            <h3 class="font-bold text-sm sm:text-base text-neutral-900 dark:text-white leading-tight">
              Kopi Senja Nusantara: Lonjakan HPP Biji Kopi (+12.4%)
            </h3>
            <p class="text-xs text-neutral-600 dark:text-neutral-300 leading-relaxed font-sans">
              HPP naik dari 38% ke 47.2% dari omzet di bulan September. Disarankan evaluasi kontrak supplier petani Ciwidey.
            </p>
          </div>

          <div class="flex items-center justify-between pt-2 border-t border-neutral-100 dark:border-white/5 gap-2">
            <span class="text-[11px] text-neutral-400">Bandung</span>
            <div class="flex items-center gap-2">
              <NuxtLink
                to="/konsultan/klien/umkm-01"
                class="px-3 py-1.5 rounded-full border border-neutral-200 dark:border-neutral-700 hover:border-amber-500 text-amber-600 dark:text-amber-400 font-bold text-xs transition-colors"
              >
                Diagnosa Usaha
              </NuxtLink>
              <NuxtLink
                to="/konsultan/rencana-aksi?client=umkm-01"
                class="px-3.5 py-1.5 rounded-full bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs transition-all shadow-2xs flex items-center gap-1"
              >
                <span>Beri Action Plan</span>
                <HugeiconsIcon :icon="ArrowRight01Icon" :size="12" :stroke-width="2" />
              </NuxtLink>
            </div>
          </div>
        </div>

        <!-- Item 3: Permintaan Binaan Baru Menunggu Konfirmasi -->
        <div class="p-4 sm:p-5 rounded-2xl bg-white dark:bg-[#18191E] border border-[#0081A0]/30 dark:border-[#0081A0]/20 shadow-xs flex flex-col justify-between space-y-3">
          <div class="space-y-1.5">
            <div class="flex items-center justify-between gap-2">
              <span class="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-[#0081A0]/10 text-[#0081A0] dark:bg-[#0081A0]/20 dark:text-[#2091AA]">
                3 Permintaan Masuk
              </span>
              <span class="text-[11px] text-neutral-400">Hari ini, 09:15</span>
            </div>
            <h3 class="font-bold text-sm sm:text-base text-neutral-900 dark:text-white leading-tight">
              Dapoer Renyah Nusantara & 2 UMKM Lainnya
            </h3>
            <p class="text-xs text-neutral-600 dark:text-neutral-300 leading-relaxed font-sans">
              "Halo Bu Maya, kami butuh bimbingan profesional untuk memisahkan keuangan usaha dan merapikan pencatatan kas..."
            </p>
          </div>

          <div class="flex items-center justify-between pt-2 border-t border-neutral-100 dark:border-white/5 gap-2">
            <span class="text-[11px] text-neutral-400">Bandung & Garut</span>
            <NuxtLink
              to="/konsultan/klien?tab=permintaan"
              class="px-3.5 py-1.5 rounded-full bg-[#0081A0] hover:bg-[#00708C] text-white font-bold text-xs transition-all shadow-2xs flex items-center gap-1"
            >
              <span>Tinjau & Terima Permintaan</span>
              <HugeiconsIcon :icon="ArrowRight01Icon" :size="12" :stroke-width="2" />
            </NuxtLink>
          </div>
        </div>

        <!-- Item 4: Antrean Validasi Kas Bulanan -->
        <div class="p-4 sm:p-5 rounded-2xl bg-white dark:bg-[#18191E] border border-emerald-200 dark:border-emerald-900/40 shadow-xs flex flex-col justify-between space-y-3">
          <div class="space-y-1.5">
            <div class="flex items-center justify-between gap-2">
              <span class="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                1 Laporan Menunggu Sah
              </span>
              <span class="text-[11px] text-neutral-400">25 Sep 2026</span>
            </div>
            <h3 class="font-bold text-sm sm:text-base text-neutral-900 dark:text-white leading-tight">
              Batik Lestari Heritage: Laporan Kas September (Rp 42 Jt)
            </h3>
            <p class="text-xs text-neutral-600 dark:text-neutral-300 leading-relaxed font-sans">
              Klien telah melampirkan rekening koran dan nota penjualan Tokopedia. Butuh verifikasi keabsahan dari konsultan.
            </p>
          </div>

          <div class="flex items-center justify-between pt-2 border-t border-neutral-100 dark:border-white/5 gap-2">
            <span class="text-[11px] text-neutral-400">Pekalongan</span>
            <NuxtLink
              to="/konsultan/validasi"
              class="px-3.5 py-1.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition-all shadow-2xs flex items-center gap-1"
            >
              <span>Validasi Laporan Kas</span>
              <HugeiconsIcon :icon="ArrowRight01Icon" :size="12" :stroke-width="2" />
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useKonsultanStore } from '~/stores/konsultan'
import BMetricBannerCard from '~/components/base/BMetricBannerCard.vue'
import { HugeiconsIcon } from '@hugeicons/vue'
import {
  UserGroupIcon,
  UserAdd01Icon,
  Task01Icon,
  CheckmarkCircle01Icon,
  ArrowRight01Icon
} from '@hugeicons/core-free-icons'

definePageMeta({
  layout: 'dashboard'
})

const konsultanStore = useKonsultanStore()

onMounted(() => {
  konsultanStore.fetchDashboard()
})

const readyCount = computed(() => {
  return konsultanStore.clients.filter(c => c.fundingStatus === 'READY_FOR_FUNDING').length
})

const completedPlansCount = computed(() => {
  return konsultanStore.actionPlans.filter(p => p.status === 'DONE').length
})
</script>
