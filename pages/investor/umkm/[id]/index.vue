<template>
  <div class="space-y-6 pb-20 font-poppins text-neutral-900 dark:text-neutral-100 select-none">
    <!-- Top Breadcrumb & Action Bar -->
    <div class="flex items-center justify-between pb-2 border-b border-neutral-100 dark:border-neutral-800/80">
      <NuxtLink
        to="/investor"
        class="inline-flex items-center gap-1.5 text-xs font-semibold text-[#2091AA] dark:text-[#50AABF] hover:underline transition-colors"
      >
        <HugeiconsIcon :icon="ArrowLeft01Icon" :size="14" :stroke-width="2.2" />
        <span>Kembali ke Venture Social Feed</span>
      </NuxtLink>

      <button
        type="button"
        class="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-700 dark:text-neutral-200 hover:bg-neutral-50 transition-colors cursor-pointer"
        @click="item ? investorStore.toggleBookmark(item.id) : undefined"
      >
        <HugeiconsIcon
          :icon="StarIcon"
          :size="15"
          :class="item?.bookmarked ? 'fill-amber-400 text-amber-500' : 'text-neutral-400'"
        />
        <span>{{ item?.bookmarked ? 'Tersimpan di Pantau' : 'Simpan Usaha' }}</span>
      </button>
    </div>

    <!-- 1. Pitch Hero Header Card (GoPay Tactile Card with Store Banner) -->
    <div class="card-tactile-gopay rounded-3xl border overflow-hidden">
      <!-- Store Banner Image -->
      <div class="relative w-full h-44 sm:h-56 bg-neutral-900 overflow-hidden">
        <img
          src="/images/default-store-banner.jpg"
          alt="Banner Toko"
          class="w-full h-full object-cover"
        />
        <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        <div class="absolute top-4 left-4 flex items-center gap-2">
          <span class="px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-xs font-mono font-bold border border-white/20">
            {{ item?.code }}
          </span>
          <span class="px-2.5 py-1 rounded-full bg-emerald-500/90 text-white text-xs font-bold flex items-center gap-1">
            <HugeiconsIcon :icon="CheckmarkCircle01Icon" :size="13" />
            <span>Ready for Funding</span>
          </span>
        </div>
      </div>

      <!-- Store Info Body -->
      <div class="p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 bg-white dark:bg-[#13161F]">
        <div class="space-y-1.5">
          <h1 class="text-2xl sm:text-3xl font-heading font-bold text-neutral-900 dark:text-white tracking-tight">
            {{ item?.name }}
          </h1>
          <p class="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 flex items-center gap-2">
            <span>{{ item?.sector }}</span>
            <span>•</span>
            <span class="flex items-center gap-1">
              <HugeiconsIcon :icon="Location01Icon" :size="13" />
              {{ item?.city }}
            </span>
            <span>•</span>
            <span>Berdiri Sejak {{ item?.establishedYear }}</span>
          </p>
        </div>

        <div class="shrink-0 flex items-center gap-3">
          <NuxtLink
            v-if="item?.accessStatus === 'APPROVED'"
            :to="`/investor/data-room/${item?.id}`"
            class="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold bg-[#00AA13] hover:bg-[#009210] text-white shadow-xs transition-all cursor-pointer"
          >
            <HugeiconsIcon :icon="FileUnlockedIcon" :size="16" :stroke-width="2" />
            <span>Buka Data Room Terproteksi</span>
          </NuxtLink>

          <div
            v-else-if="item?.accessStatus === 'PENDING'"
            class="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold bg-neutral-100 dark:bg-neutral-800 text-neutral-500 border border-neutral-200 dark:border-neutral-700 select-none"
          >
            <HugeiconsIcon :icon="Clock01Icon" :size="14" class="text-amber-500" />
            <span>Permintaan Sedang Ditinjau</span>
          </div>

          <NuxtLink
            v-else
            :to="`/investor/umkm/${item?.id}/ajukan-akses`"
            class="btn-pill-action group cursor-pointer inline-flex items-center gap-2 text-xs py-2 px-4"
          >
            <span>Ajukan Akses Data Room Privat</span>
            <HugeiconsIcon :icon="ArrowRight01Icon" :size="14" :stroke-width="2.2" />
          </NuxtLink>
        </div>
      </div>
    </div>

    <!-- 2. Key Ratio Metrics (4 Telemetry Cards - Unified Black Figures) -->
    <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
      <div class="card-tactile-gopay rounded-2xl p-4.5 border space-y-1.5 text-center">
        <span class="text-xs text-neutral-500 font-medium block">Margin Kotor Terverifikasi</span>
        <span class="text-2xl sm:text-3xl font-bold text-neutral-900 dark:text-white block tabular-nums">
          {{ item?.marginPercentage }}%
        </span>
        <span class="text-[11px] text-emerald-600 font-semibold block">Stabil 5 bulan terakhir</span>
      </div>

      <div class="card-tactile-gopay rounded-2xl p-4.5 border space-y-1.5 text-center">
        <span class="text-xs text-neutral-500 font-medium block">Pertumbuhan Pendapatan YoY</span>
        <span class="text-2xl sm:text-3xl font-bold text-neutral-900 dark:text-white block tabular-nums">
          +{{ item?.growthYoY }}%
        </span>
        <span class="text-[11px] text-emerald-600 font-semibold block">Retensi Penjualan Tinggi</span>
      </div>

      <div class="card-tactile-gopay rounded-2xl p-4.5 border space-y-1.5 text-center">
        <span class="text-xs text-neutral-500 font-medium block">Indeks Kesehatan Usaha</span>
        <span class="text-2xl sm:text-3xl font-bold text-neutral-900 dark:text-white block tabular-nums">
          {{ item?.healthScore }}/100
        </span>
        <span class="text-[11px] text-[#2091AA] font-semibold block">Grade A (Kelayakan Tinggi)</span>
      </div>

      <div class="card-tactile-gopay rounded-2xl p-4.5 border space-y-1.5 text-center">
        <span class="text-xs text-neutral-500 font-medium block">Kebutuhan Modal Sindikasi</span>
        <span class="text-2xl sm:text-3xl font-bold text-neutral-900 dark:text-white block tabular-nums">
          Rp {{ ((item?.fundingTarget || 0) / 1000000) }} Juta
        </span>
        <span class="text-[11px] text-neutral-500 block">Ekspansi gerai & roastery</span>
      </div>
    </div>

    <!-- 3. Business Story & Radar Assessment -->
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start font-poppins">
      <!-- Story Narrative (7 cols) -->
      <div class="lg:col-span-7 space-y-6">
        <div class="card-tactile-gopay rounded-2xl p-6 border space-y-4">
          <h3 class="font-poppins font-bold text-base text-neutral-900 dark:text-white pb-3 border-b border-neutral-100 dark:border-neutral-800/80">
            Cerita & Model Bisnis Toko
          </h3>
          <div class="text-xs sm:text-[13px] text-neutral-700 dark:text-neutral-300 space-y-3 leading-relaxed font-sans">
            <p>
              "{{ item?.pitchSummary }}"
            </p>
            <p>
              Bisnis ini mengadopsi model gerai kompak (compact coffee bar) dengan efisiensi sewa lahan yang terbukti menekan biaya operasional di bawah 25%. Standardisasi roasting biji lokal terpusat menjamin margin kotor tetap konsisten meskipun terjadi fluktuasi komoditas.
            </p>

            <div class="p-4 rounded-xl bg-neutral-100/70 dark:bg-neutral-800/60 border border-neutral-200/60 dark:border-neutral-700/60 space-y-2">
              <h4 class="font-poppins font-bold text-xs text-neutral-900 dark:text-white">
                Rencana Alokasi Penggunaan Dana Investasi:
              </h4>
              <ul class="list-disc list-inside space-y-1 text-neutral-600 dark:text-neutral-400 text-xs">
                <li>60% — Pembukaan 2 cabang cloud kitchen di area padat Bandung Utara.</li>
                <li>25% — Pengadaan mesin roastery kapasitas 5kg/batch terpusat.</li>
                <li>15% — Cadangan kas modal kerja (working capital buffer).</li>
              </ul>
            </div>
          </div>
        </div>

        <!-- Consultant Testimonial -->
        <div class="card-tactile-gopay rounded-2xl p-6 border space-y-3">
          <h3 class="font-poppins font-bold text-base text-neutral-900 dark:text-white pb-2 border-b border-neutral-100 dark:border-neutral-800/80">
            Opini Objektif Konsultan Pendamping BNSP
          </h3>
          <div class="flex items-start gap-3.5 text-xs">
            <div class="w-10 h-10 rounded-xl bg-blue-50 text-[#0066D6] dark:bg-blue-950 dark:text-blue-300 font-bold flex items-center justify-center shrink-0 border border-blue-200 dark:border-blue-800">
              MS
            </div>
            <div class="space-y-1">
              <p class="italic text-neutral-700 dark:text-neutral-300 leading-relaxed font-sans">
                "Kami telah mendampingi pendiri selama 6 bulan terakhir. Disiplin pelaporan kas harian sangat mengesankan, kartu stok opname mingguan ditaati, dan izin NIB serta Halal lengkap. Sangat layak dipertimbangkan untuk sindikasi tahap awal."
              </p>
              <div class="pt-1">
                <strong class="font-bold text-neutral-900 dark:text-white block">{{ item?.consultantName }}</strong>
                <span class="text-[11px] text-neutral-500">Konsultan Keuangan Berlisensi BNSP • Validasi {{ item?.certifiedAt }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Radar Overview (5 cols) -->
      <div class="lg:col-span-5 card-tactile-gopay rounded-2xl p-6 border flex flex-col items-center">
        <h3 class="font-poppins font-bold text-sm text-neutral-900 dark:text-white mb-4 w-full text-center">
          Radar Hasil Audit 5 Aspek Fundamental
        </h3>
        <BRadarChart :items="radarData" :size="280" show-target />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useInvestorStore } from '~/stores/investor'
import BRadarChart from '~/components/base/BRadarChart.vue'
import { HugeiconsIcon } from '@hugeicons/vue'
import {
  ArrowLeft01Icon,
  ArrowRight01Icon,
  StarIcon,
  CheckmarkCircle01Icon,
  FileUnlockedIcon,
  Clock01Icon,
  Location01Icon
} from '@hugeicons/core-free-icons'

definePageMeta({
  layout: 'dashboard'
})

const route = useRoute()
const umkmId = computed(() => (route.params.id as string) || 'umkm-01')

const investorStore = useInvestorStore()

const item = computed(() => {
  return investorStore.marketplaceList.find(m => m.id === umkmId.value) || investorStore.marketplaceList[0]
})

const radarData = [
  { name: 'Finansial', score: 78, maxScore: 100, targetScore: 85 },
  { name: 'Operasional', score: 85, maxScore: 100, targetScore: 80 },
  { name: 'Pemasaran', score: 64, maxScore: 100, targetScore: 75 },
  { name: 'Legalitas', score: 92, maxScore: 100, targetScore: 90 },
  { name: 'Tata Kelola', score: 75, maxScore: 100, targetScore: 80 }
]
</script>
