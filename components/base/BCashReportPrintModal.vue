<template>
  <Teleport to="body">
    <div
      v-if="modelValue"
      class="fixed inset-0 z-[120] flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-neutral-950/80 backdrop-blur-md animate-in fade-in duration-200"
      @click.self="close"
    >
      <div
        class="relative w-full max-w-3xl bg-white dark:bg-[#0F141C] rounded-[24px] shadow-2xl border border-neutral-200 dark:border-neutral-800 overflow-hidden my-auto"
      >
        <!-- Modal Toolbar -->
        <div class="print:hidden flex items-center justify-between px-6 py-4 border-b border-neutral-100 dark:border-neutral-800/80 bg-neutral-50 dark:bg-[#13161F]">
          <div class="flex items-center gap-2">
            <span class="w-2.5 h-2.5 rounded-full bg-emerald-500" />
            <span class="text-xs font-poppins font-semibold text-neutral-800 dark:text-neutral-200">
              Laporan Rekapitulasi Kas & Mutasi
            </span>
          </div>

          <div class="flex items-center gap-2">
            <button
              type="button"
              class="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-poppins font-semibold bg-[#00AA13] hover:bg-[#009210] text-white shadow-xs transition-colors cursor-pointer"
              @click="printReport"
            >
              <HugeiconsIcon :icon="PrinterIcon" :size="15" />
              <span>Cetak / Simpan PDF</span>
            </button>
            <button
              type="button"
              class="w-9 h-9 rounded-xl flex items-center justify-center text-neutral-400 hover:text-neutral-700 dark:hover:text-white hover:bg-neutral-200 dark:hover:bg-neutral-800 transition-colors cursor-pointer"
              @click="close"
            >
              <HugeiconsIcon :icon="Cancel01Icon" :size="18" />
            </button>
          </div>
        </div>

        <!-- Printable Document Area -->
        <div id="cash-report-print-area" class="p-6 sm:p-10 text-neutral-900 dark:text-neutral-100 font-poppins bg-white dark:bg-[#0F141C]">
          <!-- Report Header -->
          <div class="flex items-start justify-between border-b-2 border-neutral-900 dark:border-neutral-700 pb-5">
            <div>
              <div class="flex items-center gap-2 mb-1">
                <img src="/logo.svg" alt="Beruang" class="w-6 h-6 object-contain" />
                <span class="font-bold text-base tracking-tight text-neutral-900 dark:text-white">BERUANG REPORT</span>
              </div>
              <h2 class="text-xl sm:text-2xl font-bold uppercase tracking-tight text-neutral-950 dark:text-white">
                Laporan Arus Kas Bulanan
              </h2>
              <p class="text-xs text-neutral-500 font-mono mt-0.5">
                Periode: {{ currentPeriod }} • Diterbitkan: {{ currentDate }}
              </p>
            </div>

            <div class="text-right text-xs space-y-0.5">
              <p class="font-bold text-sm text-neutral-900 dark:text-white">{{ businessName }}</p>
              <p class="text-neutral-500">{{ sector }} • {{ city }}</p>
              <span class="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                TERVERIFIKASI
              </span>
            </div>
          </div>

          <!-- Financial Performance Summary Cards -->
          <div class="grid grid-cols-3 gap-3 my-6">
            <div class="p-3.5 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/40">
              <span class="text-[10px] uppercase font-semibold text-neutral-500 block">Total Pemasukan</span>
              <span class="text-base sm:text-lg font-bold text-emerald-600 tabular-nums">
                +Rp {{ formatNumber(totalIn) }}
              </span>
            </div>
            <div class="p-3.5 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/40">
              <span class="text-[10px] uppercase font-semibold text-neutral-500 block">Total Pengeluaran</span>
              <span class="text-base sm:text-lg font-bold text-red-500 tabular-nums">
                -Rp {{ formatNumber(totalOut) }}
              </span>
            </div>
            <div class="p-3.5 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-emerald-50/50 dark:bg-emerald-950/20">
              <span class="text-[10px] uppercase font-semibold text-emerald-700 dark:text-emerald-400 block">Saldo Kas Bersih</span>
              <span class="text-base sm:text-lg font-bold text-[#156374] dark:text-[#50AABF] tabular-nums">
                Rp {{ formatNumber(balance) }}
              </span>
            </div>
          </div>

          <!-- Transaction Table Breakdown -->
          <div class="space-y-2 mt-4">
            <h3 class="text-xs font-bold uppercase tracking-wider text-neutral-700 dark:text-neutral-300">
              Ringkasan Mutasi Kas Terverifikasi
            </h3>
            <div class="border border-neutral-200 dark:border-neutral-800 rounded-xl overflow-hidden">
              <table class="w-full text-xs text-left">
                <thead class="bg-neutral-100 dark:bg-neutral-800/80 text-neutral-600 dark:text-neutral-400 border-b border-neutral-200 dark:border-neutral-800">
                  <tr>
                    <th class="py-2.5 px-3 font-semibold">Tanggal</th>
                    <th class="py-2.5 px-3 font-semibold">Kategori / Keterangan</th>
                    <th class="py-2.5 px-3 font-semibold text-right">Tipe</th>
                    <th class="py-2.5 px-3 font-semibold text-right">Nominal</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-neutral-100 dark:divide-neutral-800/60 font-sans">
                  <tr v-for="(tx, idx) in transactions" :key="idx" class="hover:bg-neutral-50 dark:hover:bg-neutral-900/30">
                    <td class="py-2 px-3 font-mono text-[11px] text-neutral-500">{{ tx.date }}</td>
                    <td class="py-2 px-3">
                      <span class="font-medium text-neutral-900 dark:text-white">{{ tx.title }}</span>
                      <span class="text-[10px] text-neutral-400 block">{{ tx.category }}</span>
                    </td>
                    <td class="py-2 px-3 text-right">
                      <span :class="tx.type === 'IN' ? 'text-emerald-600 font-semibold' : 'text-red-500 font-semibold'">
                        {{ tx.type === 'IN' ? 'Masuk' : 'Keluar' }}
                      </span>
                    </td>
                    <td class="py-2 px-3 text-right font-mono tabular-nums font-semibold" :class="tx.type === 'IN' ? 'text-emerald-600' : 'text-red-500'">
                      {{ tx.type === 'IN' ? '+' : '-' }}Rp {{ formatNumber(tx.amount) }}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <!-- Auditor Signature & Notes -->
          <div class="mt-8 pt-6 border-t border-neutral-200 dark:border-neutral-800 flex items-end justify-between">
            <div class="text-[11px] text-neutral-500 max-w-sm space-y-1">
              <p class="font-bold text-neutral-800 dark:text-neutral-200">Catatan Auditor & Verifikator:</p>
              <p>Laporan kas ini telah diverifikasi sesuai mutasi rekening koran dan nota pembelanjaan operasional. Tidak ditemukan anomali manipulasi arus kas.</p>
            </div>

            <div class="text-right text-xs space-y-1">
              <p class="text-[10px] text-neutral-400">Diverifikasi oleh Konsultan:</p>
              <p class="font-serif italic font-bold text-sm text-neutral-800 dark:text-neutral-200">{{ consultantName }}</p>
              <p class="text-[10px] font-mono text-neutral-400">ID Kurator: BNSP-8891</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { HugeiconsIcon } from '@hugeicons/vue'
import { PrinterIcon, Cancel01Icon } from '@hugeicons/core-free-icons'

const props = withDefaults(
  defineProps<{
    modelValue: boolean
    businessName?: string
    sector?: string
    city?: string
    consultantName?: string
    totalIn?: number
    totalOut?: number
    balance?: number
    transactions?: Array<{
      date: string
      title: string
      category: string
      type: 'IN' | 'OUT'
      amount: number
    }>
  }>(),
  {
    businessName: 'Kopi Senja Nusantara',
    sector: 'Kuliner & Minuman (F&B)',
    city: 'Bandung',
    consultantName: 'Dra. Maya Suryani, M.M.',
    totalIn: 72500000,
    totalOut: 39400000,
    balance: 33100000,
    transactions: () => [
      { date: '24/10/2026', title: 'Pendapatan POS Kasir Gerai 1', category: 'Penjualan Minuman', type: 'IN', amount: 4850000 },
      { date: '23/10/2026', title: 'Belanja Biji Kopi Arabika 25kg', category: 'Bahan Baku (HPP)', type: 'OUT', amount: 3750000 },
      { date: '23/10/2026', title: 'Pendapatan Kasir & GoFood', category: 'Penjualan Minuman', type: 'IN', amount: 5120000 },
      { date: '22/10/2026', title: 'Restok Cup, Sedotan & Kemasan', category: 'Packaging', type: 'OUT', amount: 1200000 },
      { date: '22/10/2026', title: 'Penjualan Kemitraan Event', category: 'Catering B2B', type: 'IN', amount: 8500000 }
    ]
  }
)

const emit = defineEmits<{
  (e: 'update:modelValue', val: boolean): void
}>()

const currentDate = computed(() => '25 Oktober 2026')
const currentPeriod = computed(() => 'Oktober 2026')

function close() {
  emit('update:modelValue', false)
}

function formatNumber(num: number): string {
  return new Intl.NumberFormat('id-ID').format(num)
}

function printReport() {
  if (typeof window !== 'undefined') {
    window.print()
  }
}
</script>

<style scoped>
@media print {
  body * {
    visibility: hidden;
  }
  #cash-report-print-area, #cash-report-print-area * {
    visibility: visible;
  }
  #cash-report-print-area {
    position: fixed;
    left: 0;
    top: 0;
    width: 100vw;
    height: 100vh;
    padding: 30px !important;
    background: white !important;
    color: black !important;
  }
}
</style>
