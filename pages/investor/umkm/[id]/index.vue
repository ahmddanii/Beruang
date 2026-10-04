<template>
  <div class="space-y-8 pb-12 font-sans">
    <!-- Breadcrumb & Top Bar -->
    <div class="flex items-center justify-between">
      <div class="flex items-center gap-2 text-xs text-neutral-500">
        <NuxtLink to="/investor" class="hover:underline">← Katalog Marketplace</NuxtLink>
        <span>/</span>
        <span class="text-neutral-800 dark:text-neutral-200 font-semibold">{{ item?.name }}</span>
      </div>

      <button
        type="button"
        class="inline-flex items-center gap-1.5 text-xs font-heading font-semibold text-neutral-600 dark:text-neutral-300 hover:text-primary-600 transition-colors"
        @click="item ? investorStore.toggleBookmark(item.id) : undefined"
      >
        <HugeiconsIcon :icon="Bookmark01Icon" :size="16" :stroke-width="1.75" :class="item?.bookmarked ? 'text-amber-500' : ''" />
        <span>{{ item?.bookmarked ? 'Tersimpan' : 'Simpan Usaha' }}</span>
      </button>
    </div>

    <!-- Pitch Hero Header Card -->
    <div class="bg-surface-light dark:bg-surface-dark rounded-3xl border border-border-light dark:border-border-dark p-6 sm:p-8 relative overflow-hidden">
      <div class="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div class="flex items-start gap-4">
          <div class="w-14 h-14 rounded-xl bg-amber-400 p-2 shadow-xs shrink-0">
            <img src="/logo.svg" alt="Logo" class="w-full h-full object-contain" />
          </div>
          <div class="space-y-1.5">
            <div class="flex items-center gap-2 flex-wrap">
              <span class="text-xs font-mono font-bold text-neutral-400">{{ item?.code }}</span>
              <span class="inline-flex items-center gap-1 text-[10px] font-heading font-semibold px-2 py-0.5 rounded-md bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                <HugeiconsIcon :icon="CheckmarkCircle01Icon" :size="12" :stroke-width="2" />
                <span>Ready for Funding</span>
              </span>
              <span class="text-[10px] font-heading font-medium px-2 py-0.5 rounded-md bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400">
                Audit: {{ item?.certifiedAt }}
              </span>
            </div>
            <h1 class="text-2xl sm:text-3xl font-heading font-bold text-neutral-900 dark:text-white">
              {{ item?.name }}
            </h1>
            <p class="text-xs sm:text-sm text-neutral-500">
              {{ item?.sector }} • Berdiri sejak {{ item?.establishedYear }} • Beroperasi di {{ item?.city }}
            </p>
          </div>
        </div>

        <div class="shrink-0 flex flex-col sm:items-end gap-2 w-full md:w-auto">
          <NuxtLink
            v-if="item?.accessStatus === 'APPROVED'"
            :to="`/investor/data-room/${item?.id}`"
          >
            <BButton variant="success" size="md" class="flex items-center gap-2">
              <HugeiconsIcon :icon="FileUnlockedIcon" :size="16" :stroke-width="2" />
              <span>Buka Data Room Terproteksi</span>
            </BButton>
          </NuxtLink>
          <BButton
            v-else-if="item?.accessStatus === 'PENDING'"
            variant="secondary"
            size="md"
            disabled
            class="flex items-center gap-2"
          >
            <HugeiconsIcon :icon="Clock01Icon" :size="16" :stroke-width="2" />
            <span>Permintaan Sedang Ditinjau</span>
          </BButton>
          <NuxtLink
            v-else
            :to="`/investor/umkm/${item?.id}/ajukan-akses`"
          >
            <BButton variant="primary" size="md">
              Ajukan Akses Data Room Privat →
            </BButton>
          </NuxtLink>
          <span class="text-[11px] text-neutral-400">
            {{ item?.accessStatus === 'APPROVED' ? 'Akses aktif dengan watermark' : 'Memerlukan persetujuan pemilik usaha' }}
          </span>
        </div>
      </div>
    </div>

    <!-- Key Ratio Metrics (Percentages Only) -->
    <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
      <div class="p-5 rounded-2xl bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark text-center space-y-1">
        <span class="text-xs text-neutral-500 font-heading block font-medium">Margin Kotor Terverifikasi</span>
        <span class="text-3xl font-heading font-bold text-emerald-600 dark:text-emerald-400 block tabular-nums">
          {{ item?.marginPercentage }}%
        </span>
        <span class="text-[11px] text-neutral-400 block">Stabil 5 bulan terakhir</span>
      </div>

      <div class="p-5 rounded-2xl bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark text-center space-y-1">
        <span class="text-xs text-neutral-500 font-heading block font-medium">Pertumbuhan Omzet YoY</span>
        <span class="text-3xl font-heading font-bold text-primary-600 dark:text-primary-400 block tabular-nums">
          +{{ item?.growthYoY }}%
        </span>
        <span class="text-[11px] text-neutral-400 block">Tingkat retensi tinggi</span>
      </div>

      <div class="p-5 rounded-2xl bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark text-center space-y-1">
        <span class="text-xs text-neutral-500 font-heading block font-medium">Indeks Kesehatan Usaha</span>
        <span class="text-3xl font-heading font-bold text-neutral-900 dark:text-white block tabular-nums">
          {{ item?.healthScore }}/100
        </span>
        <span class="text-[11px] text-neutral-400 block">Predikat: Sehat</span>
      </div>

      <div class="p-5 rounded-2xl bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark text-center space-y-1">
        <span class="text-xs text-neutral-500 font-heading block font-medium">Rekomendasi Tiket Dana</span>
        <span class="text-2xl font-heading font-bold text-neutral-900 dark:text-white block tabular-nums">
          Rp {{ ((item?.fundingTarget || 0) / 1000000) }} Juta
        </span>
        <span class="text-[11px] text-neutral-400 block">Ekspansi gerai baru</span>
      </div>
    </div>

    <!-- Business Story & 5-Aspect Assessment -->
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      <!-- Story Narrative (7 cols) -->
      <div class="lg:col-span-7 space-y-6">
        <BCard padding="lg">
          <template #header>
            <h3 class="font-heading font-bold text-base text-neutral-900 dark:text-white">
              Cerita & Model Bisnis
            </h3>
          </template>
          <div class="text-xs text-neutral-600 dark:text-neutral-300 space-y-3 leading-relaxed">
            <p>
              "{{ item?.pitchSummary }}"
            </p>
            <p>
              Bisnis ini mengadopsi model gerai kompak (compact coffee bar) dengan efisiensi sewa lahan yang terbukti menekan rasio OPEX di bawah 25%. Standardisasi roasting biji lokal terpusat menjamin margin kotor tetap konsisten meskipun terjadi fluktuasi komoditas.
            </p>
            <div class="p-4 rounded-xl bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark">
              <h4 class="font-heading font-bold text-xs text-neutral-900 dark:text-white mb-2">
                Alokasi Penggunaan Dana Investasi:
              </h4>
              <ul class="list-disc list-inside space-y-1.5 text-neutral-500 dark:text-neutral-400 text-xs">
                <li>60% — Pembukaan 2 cabang cloud kitchen di area padat Bandung Utara.</li>
                <li>25% — Pembelian mesin roastery kapasitas 5kg/batch terpusat.</li>
                <li>15% — Cadangan kas modal kerja (working capital buffer).</li>
              </ul>
            </div>
          </div>
        </BCard>

        <!-- Consultant Testimonial -->
        <BCard padding="lg">
          <template #header>
            <h3 class="font-heading font-bold text-base text-neutral-900 dark:text-white">
              Opini Objektif Konsultan Pendamping
            </h3>
          </template>
          <div class="flex items-start gap-3.5 text-xs">
            <div class="w-10 h-10 rounded-xl bg-primary-100 text-primary-700 dark:bg-primary-950 dark:text-primary-300 font-heading font-bold flex items-center justify-center shrink-0 border border-primary-200 dark:border-primary-800">
              MS
            </div>
            <div>
              <p class="italic text-neutral-600 dark:text-neutral-300 leading-relaxed">
                "Kami telah mendampingi pendiri selama 6 bulan terakhir. Disiplin pelaporan kas harian sangat mengesankan, kartu stok opname mingguan ditaati, dan izin NIB serta Halal lengkap. Sangat layak dipertimbangkan untuk sindikasi tahap awal."
              </p>
              <span class="block mt-2 font-heading font-bold text-neutral-900 dark:text-white">
                {{ item?.consultantName }}
              </span>
              <span class="text-[11px] text-neutral-500">Konsultan Bisnis & Akuntan Berlisensi</span>
            </div>
          </div>
        </BCard>
      </div>

      <!-- Radar Overview (5 cols) -->
      <div class="lg:col-span-5 bg-surface-light dark:bg-surface-dark rounded-2xl border border-border-light dark:border-border-dark p-6 flex flex-col items-center">
        <h3 class="font-heading font-bold text-sm text-neutral-900 dark:text-white mb-4 w-full text-center">
          Radar Hasil Audit 5 Aspek Fundamental
        </h3>
        <BRadarChart :items="radarData" :size="300" show-target />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useInvestorStore } from '~/stores/investor'
import BCard from '~/components/base/BCard.vue'
import BButton from '~/components/base/BButton.vue'
import BRadarChart from '~/components/base/BRadarChart.vue'
import { HugeiconsIcon } from '@hugeicons/vue'
import {
  Bookmark01Icon,
  CheckmarkCircle01Icon,
  FileUnlockedIcon,
  Clock01Icon
} from '@hugeicons/core-free-icons'

definePageMeta({
  layout: 'dashboard'
})

const route = useRoute()
const umkmId = computed(() => route.params.id as string || 'umkm-01')

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
