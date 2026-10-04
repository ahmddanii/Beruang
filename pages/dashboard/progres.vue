<template>
  <div class="space-y-8 pb-20 font-sans">
    <!-- 1. EXECUTIVE HEADER (Double-Bezel Hardware Architecture) -->
    <div class="p-1.5 sm:p-2 rounded-[2.25rem] bg-neutral-200/50 dark:bg-neutral-800/40 border border-neutral-300/40 dark:border-neutral-700/30 shadow-xs">
      <div class="p-6 sm:p-8 lg:p-10 rounded-[calc(2.25rem-0.5rem)] bg-white dark:bg-[#141519] border border-neutral-200/80 dark:border-neutral-800/90 shadow-[inset_0_1px_1px_rgba(255,255,255,0.9)] dark:shadow-[inset_0_1px_1px_rgba(255,255,255,0.06)] flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative overflow-hidden">
        <div class="space-y-3 max-w-2xl relative z-10">
          <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary-50 dark:bg-primary-950/60 text-primary-700 dark:text-primary-300 border border-primary-200 dark:border-primary-800 text-xs font-mono font-bold uppercase tracking-[0.15em]">
            <span class="w-2 h-2 rounded-full bg-primary-500 animate-pulse" />
            <span>LEDGER FINANSIAL BULANAN</span>
          </div>

          <h1 class="text-3xl sm:text-4xl lg:text-5xl font-heading font-extrabold text-neutral-900 dark:text-white tracking-[-0.03em] leading-tight text-balance">
            Progres Keuangan Bulanan & Input Kas
          </h1>

          <p class="text-sm sm:text-base text-neutral-600 dark:text-neutral-300 leading-relaxed font-sans max-w-xl">
            Pantau tren omzet, efisiensi beban pokok HPP, dan catat laporan rutin bulanan untuk diverifikasi langsung oleh konsultan pendamping BNSP.
          </p>
        </div>

        <div class="flex items-center gap-3 shrink-0">
          <!-- Button-in-Button Action -->
          <button
            type="button"
            class="group pl-5 pr-2.5 py-2.5 rounded-full font-heading font-bold text-xs sm:text-sm bg-primary-500 hover:bg-primary-600 text-white shadow-xs transition-all duration-300 active:scale-[0.98] inline-flex items-center gap-3 cursor-pointer"
            @click="showForm = !showForm"
          >
            <span>{{ showForm ? 'Tutup Formulir' : '+ Catat Laporan Kas Baru' }}</span>
            <span class="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
              <HugeiconsIcon :icon="Coins01Icon" :size="16" :stroke-width="2" />
            </span>
          </button>
        </div>
      </div>
    </div>

    <!-- 2. MONTHLY TREND CHART CARD (Double-Bezel Hardware Architecture) -->
    <div class="p-1.5 sm:p-2 rounded-[2.25rem] bg-neutral-200/50 dark:bg-neutral-800/40 border border-neutral-300/40 dark:border-neutral-700/30 shadow-xs">
      <div class="p-6 sm:p-8 lg:p-10 rounded-[calc(2.25rem-0.5rem)] bg-white dark:bg-[#141519] border border-neutral-200/80 dark:border-neutral-800/90 shadow-[inset_0_1px_1px_rgba(255,255,255,0.9)] dark:shadow-[inset_0_1px_1px_rgba(255,255,255,0.06)] space-y-4">
        <BLineAreaChart
          title="Tren Omzet & HPP 5 Bulan Terakhir"
          subtitle="Membandingkan pertumbuhan penjualan kotor terhadap efisiensi beban pokok produksi"
          :categories="chartCategories"
          :series="chartSeries"
          :anomalies="[{ index: 4, value: 34.5, message: 'Lonjakan HPP di September' }]"
          :value-formatter="(v) => `Rp ${v} Juta`"
        />
      </div>
    </div>

    <!-- 3. SUBMISSION FORM (Double-Bezel Hardware Architecture) -->
    <div
      v-if="showForm"
      class="p-1.5 sm:p-2 rounded-[2.25rem] bg-primary-100/60 dark:bg-primary-950/40 border border-primary-300/60 dark:border-primary-800/60 shadow-xs animate-in fade-in duration-200"
    >
      <div class="p-6 sm:p-8 rounded-[calc(2.25rem-0.5rem)] bg-white dark:bg-[#141519] border border-primary-200 dark:border-primary-900 space-y-6">
        <div class="flex items-center justify-between border-b border-neutral-100 dark:border-neutral-800 pb-4">
          <div>
            <span class="text-xs font-mono uppercase tracking-wider text-primary-600 dark:text-primary-400 font-bold block">
              INPUT DATA KAS BULANAN
            </span>
            <h3 class="font-heading font-extrabold text-xl sm:text-2xl text-neutral-900 dark:text-white mt-1">
              Form Rekonsiliasi Kas Toko
            </h3>
            <p class="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 font-sans mt-0.5">
              Pastikan angka sesuai rekonsiliasi kas riil atau mutasi rekening koran bisnismu.
            </p>
          </div>
          <span class="px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-mono font-bold bg-primary-50 text-primary-700 dark:bg-primary-950 dark:text-primary-300 border border-primary-200 dark:border-primary-800">
            Laporan Oktober 2026
          </span>
        </div>

        <!-- Success feedback notification -->
        <div
          v-if="submittedSuccess"
          class="p-5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-sm text-emerald-800 dark:text-emerald-300 space-y-1.5"
        >
          <p class="font-heading font-bold text-base">Data kas bulan ini berhasil tercatat!</p>
          <p>Konsultan pendampingmu akan memvalidasi bukti transaksi dalam 1x24 jam kerja.</p>
        </div>

        <form v-else @submit.prevent="submitMonthlyRecord" class="space-y-5">
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label class="block text-sm font-semibold text-neutral-800 dark:text-neutral-200 mb-1.5 font-heading">
                Bulan Pelaporan
              </label>
              <input
                v-model="form.month"
                type="text"
                required
                class="w-full px-4 py-2.5 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 text-sm sm:text-base focus:ring-2 focus:ring-primary-500/20 focus:outline-none font-mono"
              />
            </div>

            <div>
              <label class="block text-sm font-semibold text-neutral-800 dark:text-neutral-200 mb-1.5 font-heading">
                Total Omzet Penjualan (Rp)
              </label>
              <input
                v-model.number="form.omzet"
                type="number"
                required
                step="100000"
                placeholder="Contoh: 80000000"
                class="w-full px-4 py-2.5 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 text-sm sm:text-base focus:ring-2 focus:ring-primary-500/20 focus:outline-none font-mono tabular-nums font-semibold"
              />
            </div>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-3 gap-5">
            <div>
              <label class="block text-sm font-semibold text-neutral-800 dark:text-neutral-200 mb-1.5 font-heading">
                HPP / Biaya Bahan Baku (Rp)
              </label>
              <input
                v-model.number="form.hpp"
                type="number"
                required
                step="100000"
                placeholder="Contoh: 38000000"
                class="w-full px-4 py-2.5 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 text-sm sm:text-base focus:ring-2 focus:ring-primary-500/20 focus:outline-none font-mono tabular-nums font-semibold"
              />
            </div>

            <div>
              <label class="block text-sm font-semibold text-neutral-800 dark:text-neutral-200 mb-1.5 font-heading">
                Beban Operasional / OPEX (Rp)
              </label>
              <input
                v-model.number="form.opex"
                type="number"
                required
                step="100000"
                placeholder="Contoh: 17000000"
                class="w-full px-4 py-2.5 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 text-sm sm:text-base focus:ring-2 focus:ring-primary-500/20 focus:outline-none font-mono tabular-nums font-semibold"
              />
            </div>

            <div>
              <label class="block text-sm font-semibold text-neutral-800 dark:text-neutral-200 mb-1.5 font-heading">
                Saldo Kas Cadangan Akhir (Rp)
              </label>
              <input
                v-model.number="form.cashBalance"
                type="number"
                required
                step="100000"
                placeholder="Contoh: 85000000"
                class="w-full px-4 py-2.5 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 text-sm sm:text-base focus:ring-2 focus:ring-primary-500/20 focus:outline-none font-mono tabular-nums font-semibold"
              />
            </div>
          </div>

          <div class="pt-4 border-t border-neutral-100 dark:border-neutral-800 flex justify-end gap-3">
            <button
              type="button"
              class="px-5 py-2.5 rounded-full text-xs sm:text-sm font-heading font-semibold text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors cursor-pointer"
              @click="showForm = false"
            >
              Batal
            </button>
            <button
              type="submit"
              class="group pl-5 pr-2.5 py-2.5 rounded-full font-heading font-bold text-xs sm:text-sm bg-primary-500 hover:bg-primary-600 text-white transition-all duration-300 active:scale-[0.98] shadow-xs inline-flex items-center gap-2.5 cursor-pointer"
            >
              <span>Simpan Laporan Kas</span>
              <span class="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center transition-transform duration-300 group-hover:translate-x-0.5">
                <HugeiconsIcon :icon="CheckmarkCircle01Icon" :size="14" :stroke-width="2" />
              </span>
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- 4. HISTORICAL MONTHLY RECORDS TABLE (Double-Bezel Hardware Architecture) -->
    <div class="p-1.5 sm:p-2 rounded-[2.25rem] bg-neutral-200/50 dark:bg-neutral-800/40 border border-neutral-300/40 dark:border-neutral-700/30 shadow-xs">
      <div class="p-6 sm:p-8 lg:p-10 rounded-[calc(2.25rem-0.5rem)] bg-white dark:bg-[#141519] border border-neutral-200/80 dark:border-neutral-800/90 shadow-[inset_0_1px_1px_rgba(255,255,255,0.9)] dark:shadow-[inset_0_1px_1px_rgba(255,255,255,0.06)] space-y-5">
        <div class="pb-3 border-b border-neutral-100 dark:border-neutral-800">
          <span class="text-xs font-mono font-bold uppercase tracking-[0.2em] text-primary-600 dark:text-primary-400 block">
            § 02 // LOG MUTASI ARUS KAS
          </span>
          <h3 class="text-2xl font-heading font-extrabold text-neutral-900 dark:text-white mt-1">
            Riwayat Laporan Finansial Terverifikasi
          </h3>
          <p class="text-sm text-neutral-600 dark:text-neutral-400 font-sans mt-0.5">
            Rekam jejak transparansi keuangan untuk penilaian audit kelayakan modal sindikasi.
          </p>
        </div>

        <div class="overflow-x-auto">
          <table class="w-full text-left text-sm font-mono">
            <thead>
              <tr class="border-b border-neutral-200 dark:border-neutral-800 font-heading text-neutral-700 dark:text-neutral-300 uppercase text-xs font-bold tracking-wider">
                <th class="py-3.5 px-4">Periode</th>
                <th class="py-3.5 px-4 text-right">Omzet</th>
                <th class="py-3.5 px-4 text-right">HPP</th>
                <th class="py-3.5 px-4 text-right">Margin Kotor</th>
                <th class="py-3.5 px-4 text-right font-bold text-neutral-900 dark:text-white">Laba Bersih</th>
                <th class="py-3.5 px-4 text-center">Status Validasi</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-neutral-100 dark:divide-neutral-800 text-neutral-800 dark:text-neutral-200">
              <tr
                v-for="rec in [...umkmStore.monthlyRecords].reverse()"
                :key="`${rec.year}-${rec.month}`"
                class="hover:bg-neutral-50/70 dark:hover:bg-neutral-900/60 transition-colors"
              >
                <td class="py-4 px-4 font-heading font-bold text-neutral-900 dark:text-white text-sm sm:text-base">
                  {{ rec.month }} {{ rec.year }}
                </td>
                <td class="py-4 px-4 text-right tabular-nums font-semibold text-neutral-900 dark:text-white">
                  Rp {{ rec.omzet.toLocaleString('id-ID') }}
                </td>
                <td class="py-4 px-4 text-right tabular-nums text-neutral-600 dark:text-neutral-400">
                  Rp {{ rec.hpp.toLocaleString('id-ID') }}
                </td>
                <td class="py-4 px-4 text-right tabular-nums font-bold text-emerald-600 dark:text-emerald-400">
                  {{ Math.round(((rec.omzet - rec.hpp) / rec.omzet) * 100) }}%
                </td>
                <td class="py-4 px-4 text-right tabular-nums font-extrabold text-emerald-600 dark:text-emerald-400 text-sm sm:text-base">
                  Rp {{ rec.netProfit.toLocaleString('id-ID') }}
                </td>
                <td class="py-4 px-4 text-center">
                  <span
                    :class="[
                      'inline-flex items-center gap-1.5 text-xs font-mono font-bold px-2.5 py-1 rounded-md border',
                      rec.status === 'VERIFIED'
                        ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800'
                        : 'bg-amber-50 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border-amber-200 dark:border-amber-800'
                    ]"
                  >
                    <HugeiconsIcon :icon="CheckmarkCircle01Icon" :size="13" :stroke-width="2" />
                    <span>{{ rec.status === 'VERIFIED' ? 'VALID' : 'MENUNGGU' }}</span>
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useUmkmStore } from '~/stores/umkm'
import BLineAreaChart from '~/components/base/BLineAreaChart.vue'
import { HugeiconsIcon } from '@hugeicons/vue'
import {
  Coins01Icon,
  CheckmarkCircle01Icon
} from '@hugeicons/core-free-icons'

definePageMeta({
  layout: 'dashboard'
})

const umkmStore = useUmkmStore()

const showForm = ref(false)
const submittedSuccess = ref(false)

const form = ref({
  month: 'Oktober',
  year: 2026,
  omzet: 80000000,
  hpp: 37000000,
  opex: 18000000,
  cashBalance: 88000000
})

const chartCategories = computed(() => {
  return umkmStore.monthlyRecords.map(r => r.month)
})

const chartSeries = computed(() => {
  return [
    {
      id: 'omzet',
      name: 'Omzet Penjualan (Juta Rp)',
      color: '#0055FF',
      data: umkmStore.monthlyRecords.map(r => Math.round(r.omzet / 1000000))
    },
    {
      id: 'hpp',
      name: 'HPP / Beban Pokok (Juta Rp)',
      color: '#F59E0B',
      data: umkmStore.monthlyRecords.map(r => Math.round(r.hpp / 1000000))
    }
  ]
})

function submitMonthlyRecord() {
  const net = form.value.omzet - form.value.hpp - form.value.opex
  umkmStore.addMonthlyProgress({
    month: form.value.month,
    year: form.value.year,
    omzet: form.value.omzet,
    hpp: form.value.hpp,
    opex: form.value.opex,
    netProfit: net,
    cashBalance: form.value.cashBalance
  })
  submittedSuccess.value = true
  setTimeout(() => {
    submittedSuccess.value = false
    showForm.value = false
  }, 2000)
}
</script>
