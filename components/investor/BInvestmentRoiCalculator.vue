<template>
  <div class="card-tactile-gopay rounded-[22px] sm:rounded-[26px] p-6 sm:p-8 space-y-6 font-poppins border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#13161F]">
    <!-- Header -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-neutral-100 dark:border-neutral-800/80 pb-4">
      <div class="space-y-1">
        <div class="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 dark:bg-emerald-950/60 text-[#00800e] dark:text-emerald-400 border border-emerald-200/80 dark:border-emerald-800/60">
          <HugeiconsIcon :icon="AnalyticsUpIcon" :size="14" />
          <span>Simulasi Sindikasi & Bagi Hasil</span>
        </div>
        <h3 class="text-lg sm:text-xl font-bold tracking-tight text-neutral-900 dark:text-white">
          Kalkulator Proyeksi Imbal Hasil Investor
        </h3>
        <p class="text-xs text-neutral-500 dark:text-neutral-400">
          Hitung estimasi bagi hasil bulanan dan periode balik modal sesuai proyeksi arus kas toko <strong>{{ businessName }}</strong>.
        </p>
      </div>

      <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-neutral-100 dark:bg-neutral-800/80 text-xs font-semibold text-neutral-700 dark:text-neutral-300 self-start sm:self-auto">
        <span>Tenor:</span>
        <button
          v-for="t in [12, 24, 36]"
          :key="t"
          type="button"
          class="px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer"
          :class="tenorMonths === t ? 'bg-[#156374] text-white dark:bg-[#50AABF] dark:text-neutral-950 shadow-xs' : 'text-neutral-500 hover:text-neutral-900'"
          @click="tenorMonths = t"
        >
          {{ t }} Bln
        </button>
      </div>
    </div>

    <!-- Sliders & Inputs -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
      <!-- Input 1: Nominal Investasi -->
      <div class="space-y-2.5 p-4 rounded-2xl bg-neutral-50/70 dark:bg-neutral-900/50 border border-neutral-100 dark:border-neutral-800/80">
        <div class="flex items-center justify-between text-xs">
          <span class="font-semibold text-neutral-700 dark:text-neutral-300">Komitmen Modal Investasi</span>
          <span class="font-bold text-base text-[#156374] dark:text-[#50AABF] tabular-nums font-mono">
            Rp {{ formatNumber(investmentAmount) }}
          </span>
        </div>
        <input
          v-model.number="investmentAmount"
          type="range"
          min="10000000"
          max="300000000"
          step="5000000"
          class="w-full accent-[#00AA13] cursor-pointer"
        />
        <div class="flex justify-between text-[10px] text-neutral-400 tabular-nums font-mono">
          <span>Min: Rp 10 Juta</span>
          <span>Max: Rp 300 Juta</span>
        </div>
      </div>

      <!-- Input 2: Estimasi Omzet Toko Bulanan -->
      <div class="space-y-2.5 p-4 rounded-2xl bg-neutral-50/70 dark:bg-neutral-900/50 border border-neutral-100 dark:border-neutral-800/80">
        <div class="flex items-center justify-between text-xs">
          <span class="font-semibold text-neutral-700 dark:text-neutral-300">Estimasi Omzet Toko / Bulan</span>
          <span class="font-bold text-base text-neutral-900 dark:text-white tabular-nums font-mono">
            Rp {{ formatNumber(projectedMonthlyRevenue) }}
          </span>
        </div>
        <input
          v-model.number="projectedMonthlyRevenue"
          type="range"
          min="20000000"
          max="200000000"
          step="5000000"
          class="w-full accent-[#156374] dark:accent-[#50AABF] cursor-pointer"
        />
        <div class="flex justify-between text-[10px] text-neutral-400 tabular-nums font-mono">
          <span>Rp 20 Juta</span>
          <span>Rp 200 Juta</span>
        </div>
      </div>

      <!-- Input 3: Margin Laba Bersih Toko -->
      <div class="space-y-2.5 p-4 rounded-2xl bg-neutral-50/70 dark:bg-neutral-900/50 border border-neutral-100 dark:border-neutral-800/80">
        <div class="flex items-center justify-between text-xs">
          <span class="font-semibold text-neutral-700 dark:text-neutral-300">Estimasi Margin Laba Bersih Toko</span>
          <span class="font-bold text-base text-emerald-600 dark:text-emerald-400 tabular-nums font-mono">
            {{ netProfitMargin }}%
          </span>
        </div>
        <input
          v-model.number="netProfitMargin"
          type="range"
          min="10"
          max="40"
          step="1"
          class="w-full accent-[#00AA13] cursor-pointer"
        />
        <div class="flex justify-between text-[10px] text-neutral-400 tabular-nums font-mono">
          <span>10% (Konservatif)</span>
          <span>40% (Optimal)</span>
        </div>
      </div>

      <!-- Input 4: Porsi Bagi Hasil Investor -->
      <div class="space-y-2.5 p-4 rounded-2xl bg-neutral-50/70 dark:bg-neutral-900/50 border border-neutral-100 dark:border-neutral-800/80">
        <div class="flex items-center justify-between text-xs">
          <span class="font-semibold text-neutral-700 dark:text-neutral-300">Porsi Bagi Hasil Investor (% Laba)</span>
          <span class="font-bold text-base text-[#156374] dark:text-[#50AABF] tabular-nums font-mono">
            {{ investorSharePercent }}%
          </span>
        </div>
        <input
          v-model.number="investorSharePercent"
          type="range"
          min="5"
          max="35"
          step="1"
          class="w-full accent-[#156374] dark:accent-[#50AABF] cursor-pointer"
        />
        <div class="flex justify-between text-[10px] text-neutral-400 tabular-nums font-mono">
          <span>5%</span>
          <span>35%</span>
        </div>
      </div>
    </div>

    <!-- Output Telemetry Cards (4 Metrics) -->
    <div class="grid grid-cols-2 lg:grid-cols-4 gap-3.5 pt-2">
      <div class="p-4 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-200/80 dark:border-emerald-800/60 space-y-1">
        <span class="text-[10px] uppercase font-bold text-[#00800e] dark:text-emerald-400 block tracking-wider">
          Bagi Hasil Bulanan
        </span>
        <span class="text-base sm:text-xl font-extrabold text-[#00800e] dark:text-emerald-300 tabular-nums block font-mono">
          +Rp {{ formatNumber(monthlyProfitShare) }}
        </span>
        <span class="text-[10px] text-neutral-500 block">per bulan ke rekening</span>
      </div>

      <div class="p-4 rounded-2xl bg-neutral-50 dark:bg-neutral-900/60 border border-neutral-200 dark:border-neutral-800 space-y-1">
        <span class="text-[10px] uppercase font-bold text-neutral-500 block tracking-wider">
          Total Pengembalian
        </span>
        <span class="text-base sm:text-xl font-extrabold text-neutral-900 dark:text-white tabular-nums block font-mono">
          Rp {{ formatNumber(totalReturnAmount) }}
        </span>
        <span class="text-[10px] text-neutral-500 block">Modal Pokok + Bagi Hasil</span>
      </div>

      <div class="p-4 rounded-2xl bg-neutral-50 dark:bg-neutral-900/60 border border-neutral-200 dark:border-neutral-800 space-y-1">
        <span class="text-[10px] uppercase font-bold text-neutral-500 block tracking-wider">
          Estimasi ROI Bersih
        </span>
        <span class="text-base sm:text-xl font-extrabold text-emerald-600 dark:text-emerald-400 tabular-nums block font-mono">
          +{{ calculatedRoi.toFixed(1) }}%
        </span>
        <span class="text-[10px] text-neutral-500 block">selama {{ tenorMonths }} bulan</span>
      </div>

      <div class="p-4 rounded-2xl bg-neutral-50 dark:bg-neutral-900/60 border border-neutral-200 dark:border-neutral-800 space-y-1">
        <span class="text-[10px] uppercase font-bold text-neutral-500 block tracking-wider">
          Payback Period
        </span>
        <span class="text-base sm:text-xl font-extrabold text-[#156374] dark:text-[#50AABF] tabular-nums block font-mono">
          ~{{ estimatedPaybackMonths }} Bulan
        </span>
        <span class="text-[10px] text-neutral-500 block">estimasi modal impas</span>
      </div>
    </div>

    <!-- Collapsible Cashflow Schedule -->
    <div class="space-y-3 pt-2">
      <button
        type="button"
        class="text-xs font-semibold text-[#156374] dark:text-[#50AABF] hover:underline flex items-center gap-1.5 cursor-pointer"
        @click="showSchedule = !showSchedule"
      >
        <span>{{ showSchedule ? 'Sembunyikan' : 'Tampilkan' }} Proyeksi Jadwal Distribusi Kas Bulanan</span>
        <HugeiconsIcon :icon="ArrowDown01Icon" :size="14" :class="{ 'rotate-180': showSchedule }" class="transition-transform" />
      </button>

      <div v-if="showSchedule" class="p-4 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/40 space-y-2 text-xs">
        <div class="grid grid-cols-4 font-bold text-neutral-500 border-b pb-2 dark:border-neutral-800 text-[11px]">
          <span>Periode</span>
          <span>Amortisasi Pokok</span>
          <span>Bagi Hasil Toko</span>
          <span class="text-right">Total Kas Masuk</span>
        </div>
        <div
          v-for="idx in [1, 3, 6, 12, tenorMonths]"
          :key="idx"
          class="grid grid-cols-4 py-1 text-neutral-700 dark:text-neutral-300 font-mono text-xs border-b border-neutral-100 dark:border-neutral-800/40 last:border-none"
        >
          <span>Bulan ke-{{ idx }}</span>
          <span>Rp {{ formatNumber(Math.round(investmentAmount / tenorMonths)) }}</span>
          <span class="text-emerald-600 font-semibold">+Rp {{ formatNumber(monthlyProfitShare) }}</span>
          <span class="text-right font-bold text-neutral-900 dark:text-white">
            Rp {{ formatNumber(Math.round(investmentAmount / tenorMonths) + monthlyProfitShare) }}
          </span>
        </div>
      </div>
    </div>

    <!-- Action CTA -->
    <div class="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-neutral-100 dark:border-neutral-800">
      <p class="text-xs text-neutral-500 max-w-md">
        *Simulasi berbasis proyeksi estimasi wajar. Persentase bagi hasil final disepakati melalui Term Sheet resmi pada Ruang Negosiasi Deal.
      </p>

      <button
        type="button"
        class="btn-pill-action btn-pill-action-green w-full sm:w-auto px-6 py-2.5 text-xs sm:text-sm font-semibold cursor-pointer shadow-xs justify-center"
        @click="emitOffer"
      >
        <span>Ajukan Komitmen Modal (Rp {{ formatNumber(investmentAmount) }})</span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { HugeiconsIcon } from '@hugeicons/vue'
import {
  AnalyticsUpIcon,
  ArrowDown01Icon
} from '@hugeicons/core-free-icons'

const props = withDefaults(
  defineProps<{
    businessName?: string
    defaultInvestment?: number
    defaultRevenue?: number
  }>(),
  {
    businessName: 'Kopi Senja Nusantara',
    defaultInvestment: 50000000,
    defaultRevenue: 65000000
  }
)

const emit = defineEmits<{
  (e: 'submit-offer', data: { amount: number; tenor: number; share: number }): void
}>()

const investmentAmount = ref(props.defaultInvestment)
const projectedMonthlyRevenue = ref(props.defaultRevenue)
const netProfitMargin = ref(24) // 24% net profit
const investorSharePercent = ref(15) // 15% share of net profit
const tenorMonths = ref(24)
const showSchedule = ref(false)

// Calculations
const monthlyNetProfit = computed(() => {
  return projectedMonthlyRevenue.value * (netProfitMargin.value / 100)
})

const monthlyProfitShare = computed(() => {
  return Math.round(monthlyNetProfit.value * (investorSharePercent.value / 100))
})

const totalProfitShare = computed(() => {
  return monthlyProfitShare.value * tenorMonths.value
})

const totalReturnAmount = computed(() => {
  return investmentAmount.value + totalProfitShare.value
})

const calculatedRoi = computed(() => {
  if (investmentAmount.value <= 0) return 0
  return (totalProfitShare.value / investmentAmount.value) * 100
})

const estimatedPaybackMonths = computed(() => {
  const monthlyTotal = monthlyProfitShare.value + (investmentAmount.value / tenorMonths.value)
  if (monthlyTotal <= 0) return tenorMonths.value
  return Math.min(tenorMonths.value, Math.ceil(investmentAmount.value / monthlyTotal))
})

function formatNumber(val: number): string {
  return new Intl.NumberFormat('id-ID').format(Math.round(val || 0))
}

function emitOffer() {
  emit('submit-offer', {
    amount: investmentAmount.value,
    tenor: tenorMonths.value,
    share: investorSharePercent.value
  })
}
</script>
