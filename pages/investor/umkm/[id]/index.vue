<template>
  <div class="space-y-6 pb-20 font-sans">
    <!-- Tombol Navigasi Atas -->
    <div class="flex items-center justify-between">
      <NuxtLink
        to="/investor"
        class="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-neutral-500 hover:text-primary-600 transition-colors"
      >
        <HugeiconsIcon :icon="ArrowLeft02Icon" :size="16" :stroke-width="2" />
        <span>Katalog Usaha</span>
      </NuxtLink>

      <button
        type="button"
        class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-xs font-semibold text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 cursor-pointer"
        @click="investorStore.toggleBookmark(item.id)"
      >
        <HugeiconsIcon
          :icon="Bookmark01Icon"
          :size="15"
          :stroke-width="1.75"
          :class="item.bookmarked ? 'text-amber-500 fill-amber-400' : 'text-neutral-400'"
        />
        <span>{{ item.bookmarked ? 'Tersimpan' : 'Simpan Usaha' }}</span>
      </button>
    </div>

    <!-- 1. HEADER PROFIL RINGKAS -->
    <div class="bg-white dark:bg-[#141519] rounded-3xl border border-neutral-200 dark:border-neutral-800 p-6 sm:p-8 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
      <div class="flex items-center gap-4">
        <div class="w-14 h-14 rounded-2xl bg-amber-400 p-2 shadow-xs shrink-0 flex items-center justify-center">
          <img src="/logo.svg" alt="Logo" class="w-full h-full object-contain" />
        </div>

        <div class="space-y-1">
          <div class="flex items-center gap-2 flex-wrap">
            <span class="text-xs font-mono font-bold text-neutral-400">{{ item.code }}</span>
            <span class="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-md bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
              <HugeiconsIcon :icon="CheckmarkCircle01Icon" :size="12" :stroke-width="2" />
              <span>TERVERIFIKASI</span>
            </span>
          </div>

          <h1 class="text-2xl sm:text-3xl font-heading font-extrabold text-neutral-900 dark:text-white tracking-tight">
            {{ item.name }}
          </h1>

          <p class="text-xs sm:text-sm text-neutral-500">
            {{ item.sector }} • {{ item.city }} • Berdiri {{ item.establishedYear }}
          </p>
        </div>
      </div>

      <!-- Tombol Aksi -->
      <div class="shrink-0 w-full md:w-auto">
        <NuxtLink
          v-if="item.accessStatus === 'APPROVED'"
          :to="`/investor/data-room/${item.id}`"
          class="px-5 py-2.5 rounded-xl font-heading font-bold text-xs sm:text-sm bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs transition-all inline-flex items-center gap-2"
        >
          <HugeiconsIcon :icon="FileUnlockedIcon" :size="16" :stroke-width="2" />
          <span>Buka Laporan Asli</span>
        </NuxtLink>

        <div
          v-else-if="item.accessStatus === 'PENDING'"
          class="px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold bg-amber-50 text-amber-800 border border-amber-200 inline-flex items-center gap-2"
        >
          <HugeiconsIcon :icon="Clock01Icon" :size="15" :stroke-width="2" class="text-amber-600" />
          <span>Menunggu Persetujuan Pemilik</span>
        </div>

        <NuxtLink
          v-else
          :to="`/investor/umkm/${item.id}/ajukan-akses`"
          class="px-5 py-2.5 rounded-xl font-heading font-bold text-xs sm:text-sm bg-primary-600 hover:bg-primary-700 text-white shadow-xs transition-all inline-flex items-center gap-2"
        >
          <span>Minta Izin Buka Laporan</span>
          <HugeiconsIcon :icon="ArrowRight01Icon" :size="14" :stroke-width="2" />
        </NuxtLink>
      </div>
    </div>

    <!-- 2. KOTAK 4 ANGKA KUNCI (BAHASA MUDAH DIPAHAMI) -->
    <div class="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 text-center">
      <div class="p-4 rounded-2xl bg-white dark:bg-[#141519] border border-neutral-200 dark:border-neutral-800 shadow-xs space-y-0.5">
        <span class="text-xs text-neutral-500 font-medium block">Untung Kotor</span>
        <span class="text-2xl sm:text-3xl font-heading font-extrabold text-emerald-600 dark:text-emerald-400 block tabular-nums">
          {{ item.marginPercentage }}%
        </span>
      </div>

      <div class="p-4 rounded-2xl bg-white dark:bg-[#141519] border border-neutral-200 dark:border-neutral-800 shadow-xs space-y-0.5">
        <span class="text-xs text-neutral-500 font-medium block">Kenaikan per Tahun</span>
        <span class="text-2xl sm:text-3xl font-heading font-extrabold text-primary-600 dark:text-primary-400 block tabular-nums">
          +{{ item.growthYoY }}%
        </span>
      </div>

      <div class="p-4 rounded-2xl bg-white dark:bg-[#141519] border border-neutral-200 dark:border-neutral-800 shadow-xs space-y-0.5">
        <span class="text-xs text-neutral-500 font-medium block">Nilai Kesehatan Toko</span>
        <span class="text-2xl sm:text-3xl font-heading font-extrabold text-neutral-900 dark:text-white block tabular-nums">
          {{ item.healthScore }}/100
        </span>
      </div>

      <div class="p-4 rounded-2xl bg-white dark:bg-[#141519] border border-neutral-200 dark:border-neutral-800 shadow-xs space-y-0.5">
        <span class="text-xs text-neutral-500 font-medium block">Modal yang Dibutuhkan</span>
        <span class="text-2xl sm:text-3xl font-heading font-extrabold text-neutral-900 dark:text-white block tabular-nums">
          Rp {{ (item.fundingTarget / 1000000).toLocaleString('id-ID') }} Jt
        </span>
      </div>
    </div>

    <!-- 3. GRAFIK KEMAJUAN USAHA (BUSINESS JOURNEY - US-INV-02) -->
    <div class="bg-white dark:bg-[#141519] rounded-3xl border border-neutral-200 dark:border-neutral-800 p-5 sm:p-6 shadow-xs space-y-4">
      <div class="flex items-center justify-between">
        <h2 class="text-base sm:text-lg font-heading font-extrabold text-neutral-900 dark:text-white">
          Perjalanan Usaha: Untung vs Biaya Bahan (5 Bulan)
        </h2>
        <span class="text-xs font-bold text-emerald-600 dark:text-emerald-400">
          Penghematan Biaya: +{{ (item.journey[0]?.hppPercentage - item.journey[item.journey.length - 1]?.hppPercentage).toFixed(1) }}%
        </span>
      </div>

      <!-- Grafik -->
      <div class="p-3 rounded-2xl bg-neutral-50 dark:bg-neutral-900/60 border border-neutral-200 dark:border-neutral-800">
        <BLineAreaChart
          :categories="chartCategories"
          :series="chartSeries"
          :value-formatter="(v) => `${v}%`"
        />
      </div>

      <!-- 5 Langkah Ringkas -->
      <div class="grid grid-cols-1 sm:grid-cols-5 gap-2.5 pt-1">
        <div
          v-for="step in item.journey"
          :key="step.month"
          class="p-3 rounded-xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 space-y-1 text-xs"
        >
          <div class="flex justify-between font-bold text-[11px]">
            <span class="text-neutral-500">{{ step.month === 'Baseline' ? 'Bulan Awal' : step.month }}</span>
            <span class="text-emerald-600">Untung {{ step.marginPercentage }}%</span>
          </div>
          <h4 class="font-heading font-semibold text-neutral-900 dark:text-white leading-snug line-clamp-2">
            {{ step.milestone }}
          </h4>
        </div>
      </div>
    </div>

    <!-- 4. RENCANA PENGGUNAAN DANA -->
    <div class="bg-white dark:bg-[#141519] rounded-3xl border border-neutral-200 dark:border-neutral-800 p-5 sm:p-6 shadow-xs space-y-3">
      <div class="flex items-center justify-between">
        <h3 class="font-heading font-bold text-sm sm:text-base text-neutral-900 dark:text-white">
          Rencana Penggunaan Modal
        </h3>
        <span class="text-xs font-mono font-bold text-primary-600">
          Total Target: Rp {{ (item.fundingTarget / 1000000).toLocaleString('id-ID') }} Jt
        </span>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
        <div
          v-for="(plan, pIdx) in item.expansionPlan"
          :key="pIdx"
          class="p-3 rounded-xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-xs text-neutral-700 dark:text-neutral-300 flex items-start gap-2"
        >
          <span class="text-primary-600 font-bold shrink-0">✓</span>
          <span>{{ plan }}</span>
        </div>
      </div>
    </div>

    <!-- 5. PENILAIAN KONSULTAN (US-INV-03) -->
    <div class="bg-white dark:bg-[#141519] rounded-3xl border border-neutral-200 dark:border-neutral-800 p-5 sm:p-6 shadow-xs space-y-4">
      <div class="flex items-center justify-between">
        <h2 class="text-base sm:text-lg font-heading font-extrabold text-neutral-900 dark:text-white">
          Pemeriksaan Konsultan Pendamping
        </h2>
        <span class="text-xs text-neutral-500 font-medium">
          Diperiksa oleh: <strong class="text-neutral-800 dark:text-neutral-200">{{ item.consultantName }}</strong>
        </span>
      </div>

      <!-- 5 Aspek Ringkas -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2.5">
        <div
          v-for="aspect in item.consultantEvaluations"
          :key="aspect.aspect"
          class="p-3 rounded-xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 space-y-1 text-xs"
        >
          <div class="flex items-center justify-between font-bold">
            <span class="text-neutral-800 dark:text-neutral-200 text-xs">{{ formatAspectTitle(aspect.aspect) }}</span>
            <span class="text-primary-600 font-mono">{{ aspect.score }}</span>
          </div>
          <p class="text-[11px] text-neutral-500 line-clamp-2">
            {{ aspect.finding }}
          </p>
        </div>
      </div>
    </div>

    <!-- 6. KOTAK AJAKAN BUKA LAPORAN -->
    <div class="p-6 rounded-3xl bg-neutral-900 text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
      <div>
        <h3 class="text-base sm:text-lg font-heading font-bold">
          Ingin Memeriksa Laporan Asli Toko Ini?
        </h3>
        <p class="text-xs text-neutral-400">
          Bapak dapat meminta izin untuk membaca buku kas, rekening koran bank, dan bukti izin resmi.
        </p>
      </div>

      <NuxtLink
        v-if="item.accessStatus === 'APPROVED'"
        :to="`/investor/data-room/${item.id}`"
      >
        <BButton variant="success" size="md" class="flex items-center gap-2 shrink-0">
          <HugeiconsIcon :icon="FileUnlockedIcon" :size="16" :stroke-width="2" />
          <span>Buka Laporan Asli</span>
        </BButton>
      </NuxtLink>

      <NuxtLink
        v-else-if="item.accessStatus === 'PENDING'"
        :to="`/investor/data-room/${item.id}`"
      >
        <BButton variant="secondary" size="md" class="shrink-0">
          <span>Menunggu Persetujuan</span>
        </BButton>
      </NuxtLink>

      <NuxtLink
        v-else
        :to="`/investor/umkm/${item.id}/ajukan-akses`"
      >
        <BButton variant="primary" size="md" class="flex items-center gap-2 shrink-0">
          <span>Minta Izin Buka Laporan</span>
          <HugeiconsIcon :icon="ArrowRight01Icon" :size="14" :stroke-width="2" />
        </BButton>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useInvestorStore } from '~/stores/investor'
import BButton from '~/components/base/BButton.vue'
import BLineAreaChart from '~/components/base/BLineAreaChart.vue'
import { HugeiconsIcon } from '@hugeicons/vue'
import {
  Bookmark01Icon,
  CheckmarkCircle01Icon,
  FileUnlockedIcon,
  Clock01Icon,
  ArrowRight01Icon,
  ArrowLeft02Icon
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

function formatAspectTitle(name: string) {
  if (name.includes('Finansial')) return 'Keuangan'
  if (name.includes('Operasional')) return 'Operasional'
  if (name.includes('Pasar')) return 'Penjualan'
  if (name.includes('Legalitas')) return 'Surat Izin'
  if (name.includes('Tata Kelola') || name.includes('SDM')) return 'Karyawan'
  return name.split(' ')[0]
}

// Data grafik dengan istilah mudah dipahami orang awam
const chartCategories = computed(() => {
  return item.value.journey.map(j => (j.month === 'Baseline' ? 'Bulan Awal' : j.month))
})

const chartSeries = computed(() => {
  return [
    {
      id: 'margin',
      name: 'Untung Kotor (%)',
      color: '#10B981',
      data: item.value.journey.map(j => j.marginPercentage)
    },
    {
      id: 'hpp',
      name: 'Biaya Bahan (%)',
      color: '#F43F5E',
      data: item.value.journey.map(j => j.hppPercentage)
    }
  ]
})
</script>
