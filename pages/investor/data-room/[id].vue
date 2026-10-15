<template>
  <div class="space-y-6 pb-20 font-sans">
    <!-- Navigasi & Status -->
    <div class="flex items-center justify-between">
      <div class="flex items-center gap-2 text-xs sm:text-sm text-neutral-500">
        <NuxtLink to="/investor" class="hover:text-primary-600 transition-colors flex items-center gap-1.5">
          <HugeiconsIcon :icon="ArrowLeft02Icon" :size="16" :stroke-width="2" />
          <span>Katalog</span>
        </NuxtLink>
        <span>/</span>
        <NuxtLink :to="`/investor/umkm/${umkmId}`" class="hover:text-primary-600 transition-colors">
          {{ item.name }}
        </NuxtLink>
        <span>/</span>
        <span class="text-neutral-900 dark:text-neutral-100 font-bold">Laporan Asli</span>
      </div>

      <!-- Pengalih Mode Uji Coba -->
      <div class="flex items-center gap-1 p-1 rounded-xl bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-xs">
        <button
          type="button"
          :class="[
            'px-2.5 py-1 rounded-lg font-bold transition-all cursor-pointer',
            item.accessStatus === 'APPROVED' ? 'bg-emerald-600 text-white shadow-xs' : 'text-neutral-500'
          ]"
          @click="investorStore.setAccessStatus(item.id, 'APPROVED')"
        >
          Izin Diberikan
        </button>
        <button
          type="button"
          :class="[
            'px-2.5 py-1 rounded-lg font-bold transition-all cursor-pointer',
            item.accessStatus === 'PENDING' ? 'bg-amber-600 text-white shadow-xs' : 'text-neutral-500'
          ]"
          @click="investorStore.setAccessStatus(item.id, 'PENDING')"
        >
          Menunggu Izin
        </button>
        <button
          type="button"
          :class="[
            'px-2.5 py-1 rounded-lg font-bold transition-all cursor-pointer',
            item.accessStatus === 'NONE' ? 'bg-neutral-700 text-white shadow-xs' : 'text-neutral-500'
          ]"
          @click="investorStore.setAccessStatus(item.id, 'NONE')"
        >
          Terkunci
        </button>
      </div>
    </div>

    <!-- TAMPILAN TERKUNCI -->
    <div
      v-if="item.accessStatus !== 'APPROVED'"
      class="max-w-md mx-auto bg-white dark:bg-[#141519] rounded-3xl border border-neutral-200 dark:border-neutral-800 p-8 text-center space-y-4 shadow-xs"
    >
      <div class="w-14 h-14 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 text-amber-600 flex items-center justify-center mx-auto">
        <HugeiconsIcon :icon="SquareLock02Icon" :size="28" :stroke-width="1.75" />
      </div>

      <div class="space-y-1">
        <h2 class="font-heading font-extrabold text-xl text-neutral-900 dark:text-white">
          {{ item.accessStatus === 'PENDING' ? 'Permohonan Sedang Menunggu Persetujuan' : 'Laporan Masih Terkunci' }}
        </h2>
        <p class="text-xs text-neutral-500">
          {{ item.accessStatus === 'PENDING'
            ? 'Menunggu pemilik toko membuka izin akses.'
            : 'Ajukan permohonan ke pemilik untuk melihat buku kas dan rekening koran.'
          }}
        </p>
      </div>

      <div class="pt-2 flex justify-center gap-2">
        <NuxtLink
          v-if="item.accessStatus === 'NONE'"
          :to="`/investor/umkm/${umkmId}/ajukan-akses`"
        >
          <BButton variant="primary" size="md">
            Minta Izin Buka Laporan
          </BButton>
        </NuxtLink>
        <NuxtLink :to="`/investor/umkm/${umkmId}`">
          <BButton variant="secondary" size="md">
            Kembali
          </BButton>
        </NuxtLink>
      </div>
    </div>

    <!-- TAMPILAN TERBUKA: BERKAS ASLI (US-INV-05) -->
    <div v-else class="space-y-6 relative">
      <!-- Watermark -->
      <div
        class="fixed inset-0 pointer-events-none z-50 overflow-hidden flex items-center justify-center select-none opacity-[0.03]"
        aria-hidden="true"
      >
        <div class="transform -rotate-25 text-center text-neutral-900 dark:text-white font-mono font-bold text-sm tracking-widest leading-loose">
          DOKUMEN RAHASIA • DILIHAT OLEH {{ investorName }} • {{ accessTimestamp }}
        </div>
      </div>

      <!-- Header Ringkas -->
      <div class="bg-white dark:bg-[#141519] rounded-3xl border border-neutral-200 dark:border-neutral-800 p-6 shadow-xs flex items-center justify-between">
        <div class="space-y-1">
          <div class="flex items-center gap-2">
            <span class="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
              <span class="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>IZIN SUDAH DIBERIKAN</span>
            </span>
            <span class="text-xs text-neutral-400 font-mono">
              {{ accessTimestamp }}
            </span>
          </div>
          <h1 class="text-xl sm:text-2xl font-heading font-extrabold text-neutral-900 dark:text-white">
            Laporan Keuangan Asli: {{ item.name }}
          </h1>
        </div>

        <button
          type="button"
          class="px-4 py-2 rounded-xl text-xs font-heading font-bold bg-neutral-900 hover:bg-neutral-800 dark:bg-neutral-100 dark:hover:bg-neutral-200 text-white dark:text-neutral-900 shadow-xs cursor-pointer inline-flex items-center gap-2"
          @click="exportCsv"
        >
          <HugeiconsIcon :icon="Download01Icon" :size="15" :stroke-width="2" />
          <span>Unduh Data (CSV)</span>
        </button>
      </div>

      <!-- 1. TABEL LABA RUGI RIIL -->
      <div class="bg-white dark:bg-[#141519] rounded-3xl border border-neutral-200 dark:border-neutral-800 p-6 shadow-xs space-y-4">
        <div class="flex items-center justify-between">
          <h3 class="font-heading font-bold text-base text-neutral-900 dark:text-white">
            1. Catatan Penjualan & Untung Bersih (5 Bulan)
          </h3>
          <span class="text-xs text-neutral-500 font-medium">Diperiksa oleh: {{ item.consultantName }}</span>
        </div>

        <div class="overflow-x-auto rounded-2xl border border-neutral-200 dark:border-neutral-800">
          <table class="w-full text-left text-xs font-sans">
            <thead class="bg-neutral-50 dark:bg-neutral-900 text-neutral-600 dark:text-neutral-400 font-heading font-bold border-b border-neutral-200 dark:border-neutral-800">
              <tr>
                <th class="px-4 py-3">Bulan</th>
                <th class="px-4 py-3 text-right">Penjualan</th>
                <th class="px-4 py-3 text-right">Modal Bahan</th>
                <th class="px-4 py-3 text-right">Untung Kotor</th>
                <th class="px-4 py-3 text-right">% Untung</th>
                <th class="px-4 py-3 text-right">Biaya Toko</th>
                <th class="px-4 py-3 text-right">Untung Bersih</th>
                <th class="px-4 py-3 text-right">Kas di Bank</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-neutral-100 dark:divide-neutral-800">
              <tr
                v-for="rec in displayRecords"
                :key="rec.month"
                class="hover:bg-neutral-50 dark:hover:bg-neutral-800/40"
              >
                <td class="px-4 py-3 font-bold text-neutral-900 dark:text-white">
                  {{ rec.month }} {{ rec.year }}
                </td>
                <td class="px-4 py-3 text-right font-semibold tabular-nums">
                  Rp {{ rec.omzet.toLocaleString('id-ID') }}
                </td>
                <td class="px-4 py-3 text-right text-rose-600 dark:text-rose-400 tabular-nums">
                  Rp {{ rec.hpp.toLocaleString('id-ID') }}
                </td>
                <td class="px-4 py-3 text-right font-bold text-emerald-600 tabular-nums">
                  Rp {{ (rec.omzet - rec.hpp).toLocaleString('id-ID') }}
                </td>
                <td class="px-4 py-3 text-right font-bold text-emerald-600 tabular-nums">
                  {{ Math.round(((rec.omzet - rec.hpp) / rec.omzet) * 100) }}%
                </td>
                <td class="px-4 py-3 text-right text-neutral-500 tabular-nums">
                  Rp {{ rec.opex.toLocaleString('id-ID') }}
                </td>
                <td class="px-4 py-3 text-right font-extrabold text-neutral-900 dark:text-white tabular-nums">
                  Rp {{ rec.netProfit.toLocaleString('id-ID') }}
                </td>
                <td class="px-4 py-3 text-right font-bold text-primary-600 tabular-nums">
                  Rp {{ rec.cashBalance.toLocaleString('id-ID') }}
                </td>
              </tr>
            </tbody>
            <tfoot class="bg-neutral-50 dark:bg-neutral-900 font-bold border-t-2 border-neutral-200">
              <tr>
                <td class="px-4 py-3">Rata-Rata Bulanan:</td>
                <td class="px-4 py-3 text-right tabular-nums">Rp {{ averageOmzet.toLocaleString('id-ID') }}</td>
                <td class="px-4 py-3 text-right text-rose-600 tabular-nums">Rp {{ averageHpp.toLocaleString('id-ID') }}</td>
                <td class="px-4 py-3 text-right text-emerald-600 tabular-nums">Rp {{ (averageOmzet - averageHpp).toLocaleString('id-ID') }}</td>
                <td class="px-4 py-3 text-right text-emerald-600 tabular-nums">{{ item.marginPercentage }}%</td>
                <td class="px-4 py-3 text-right text-neutral-500 tabular-nums">Rp {{ averageOpex.toLocaleString('id-ID') }}</td>
                <td class="px-4 py-3 text-right tabular-nums">Rp {{ averageNetProfit.toLocaleString('id-ID') }}</td>
                <td class="px-4 py-3 text-right text-primary-600 tabular-nums">Rp {{ latestCashBalance.toLocaleString('id-ID') }}</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>

      <!-- 2 & 3. DOKUMEN BANK & LEGALITAS -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
        <!-- 2. Rekening Koran -->
        <div class="bg-white dark:bg-[#141519] rounded-3xl border border-neutral-200 dark:border-neutral-800 p-5 shadow-xs space-y-3">
          <h3 class="font-heading font-bold text-sm text-neutral-900 dark:text-white">
            2. Rekening Koran Bank Asli
          </h3>

          <div class="space-y-2">
            <div
              v-for="doc in bankDocs"
              :key="doc.name"
              class="p-3 rounded-2xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 flex items-center justify-between text-xs"
            >
              <div class="space-y-0.5">
                <h4 class="font-heading font-semibold text-neutral-900 dark:text-white">{{ doc.name }}</h4>
                <span class="text-[11px] text-neutral-400">{{ doc.verifiedDate }}</span>
              </div>

              <button
                type="button"
                class="px-3 py-1 rounded-lg font-bold text-xs bg-primary-50 text-primary-700 dark:bg-primary-950 dark:text-primary-300 hover:bg-primary-100 border border-primary-200 cursor-pointer"
                @click="previewBankStatement(doc)"
              >
                Lihat Rekening
              </button>
            </div>
          </div>
        </div>

        <!-- 3. Legalitas -->
        <div class="bg-white dark:bg-[#141519] rounded-3xl border border-neutral-200 dark:border-neutral-800 p-5 shadow-xs space-y-3">
          <h3 class="font-heading font-bold text-sm text-neutral-900 dark:text-white">
            3. Surat Izin Usaha Resmi
          </h3>

          <div class="space-y-2">
            <div
              v-for="leg in legalDocs"
              :key="leg.name"
              class="p-3 rounded-2xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 flex items-center justify-between text-xs"
            >
              <div class="space-y-0.5">
                <h4 class="font-heading font-semibold text-neutral-900 dark:text-white">{{ leg.name }}</h4>
                <span class="text-[11px] text-emerald-600 font-semibold">{{ leg.status }}</span>
              </div>

              <button
                type="button"
                class="px-3 py-1 rounded-lg font-bold text-xs bg-neutral-100 text-neutral-800 dark:bg-neutral-800 dark:text-neutral-200 hover:bg-neutral-200 border border-neutral-200 cursor-pointer"
                @click="previewLegalDoc(leg)"
              >
                Lihat Surat
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- MODAL 1: PRATINJAU MUTASI BANK -->
    <BModal
      v-model="showBankModal"
      :title="`Mutasi: ${activeBankDoc?.name || ''}`"
      size="md"
    >
      <div class="space-y-3 text-xs">
        <div class="flex justify-between p-3 rounded-xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-200">
          <div>
            <strong>BANK MANDIRI (GIRO)</strong>
            <span class="block text-[11px] text-neutral-500">Rekening: 131-00-984421-2</span>
          </div>
          <span class="text-xs font-mono font-bold text-emerald-600">✓ 100% Cocok Kasir</span>
        </div>

        <table class="w-full text-left text-[11px]">
          <thead class="bg-neutral-100 dark:bg-neutral-800 font-bold">
            <tr>
              <th class="p-2">Tgl</th>
              <th class="p-2">Keterangan</th>
              <th class="p-2 text-right">Keluar</th>
              <th class="p-2 text-right">Masuk</th>
              <th class="p-2 text-right">Saldo</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-neutral-100 font-mono">
            <tr>
              <td class="p-2">01/09</td>
              <td class="p-2">Saldo Awal</td>
              <td class="p-2 text-right">-</td>
              <td class="p-2 text-right">-</td>
              <td class="p-2 text-right font-bold">42.500.000</td>
            </tr>
            <tr>
              <td class="p-2">05/09</td>
              <td class="p-2">Setoran POS Mg I</td>
              <td class="p-2 text-right">-</td>
              <td class="p-2 text-right text-emerald-600">+14.850.000</td>
              <td class="p-2 text-right">57.350.000</td>
            </tr>
            <tr>
              <td class="p-2">08/09</td>
              <td class="p-2">Bahan Kopi Ciwidey</td>
              <td class="p-2 text-right text-rose-600">-6.200.000</td>
              <td class="p-2 text-right">-</td>
              <td class="p-2 text-right">51.150.000</td>
            </tr>
            <tr>
              <td class="p-2">20/09</td>
              <td class="p-2">Gaji Barista 3 Toko</td>
              <td class="p-2 text-right text-rose-600">-12.500.000</td>
              <td class="p-2 text-right">-</td>
              <td class="p-2 text-right">54.850.000</td>
            </tr>
            <tr>
              <td class="p-2">30/09</td>
              <td class="p-2">Setoran POS Akhir</td>
              <td class="p-2 text-right">-</td>
              <td class="p-2 text-right text-emerald-600">+21.450.000</td>
              <td class="p-2 text-right font-bold text-primary-600">62.000.000</td>
            </tr>
          </tbody>
        </table>
      </div>

      <template #footer>
        <div class="flex justify-end">
          <BButton variant="secondary" size="sm" @click="showBankModal = false">
            Tutup
          </BButton>
        </div>
      </template>
    </BModal>

    <!-- MODAL 2: PRATINJAU LEGALITAS -->
    <BModal
      v-model="showLegalModal"
      :title="`Legalitas: ${activeLegalDoc?.name || ''}`"
      size="sm"
    >
      <div class="space-y-2.5 text-xs">
        <div class="p-4 rounded-xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 space-y-2">
          <div class="flex justify-between border-b pb-1">
            <span class="text-neutral-500">Nama Usaha:</span>
            <strong>{{ item.name }}</strong>
          </div>
          <div class="flex justify-between border-b pb-1">
            <span class="text-neutral-500">NIB:</span>
            <strong class="font-mono">1209210048291</strong>
          </div>
          <div class="flex justify-between border-b pb-1">
            <span class="text-neutral-500">KBLI:</span>
            <strong>56303 (Kedai Kopi)</strong>
          </div>
          <div class="flex justify-between border-b pb-1">
            <span class="text-neutral-500">Halal:</span>
            <strong class="text-emerald-600">ID3211000194829 (Aktif 2028)</strong>
          </div>
          <div class="flex justify-between">
            <span class="text-neutral-500">Status:</span>
            <strong class="text-emerald-600">Sah & Terdaftar OSS</strong>
          </div>
        </div>
      </div>

      <template #footer>
        <div class="flex justify-end">
          <BButton variant="secondary" size="sm" @click="showLegalModal = false">
            Tutup
          </BButton>
        </div>
      </template>
    </BModal>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useAuthStore } from '~/stores/auth'
import { useInvestorStore } from '~/stores/investor'
import { useUmkmStore } from '~/stores/umkm'
import BButton from '~/components/base/BButton.vue'
import BModal from '~/components/base/BModal.vue'
import { HugeiconsIcon } from '@hugeicons/vue'
import {
  ArrowLeft02Icon,
  SquareLock02Icon,
  Download01Icon
} from '@hugeicons/core-free-icons'

definePageMeta({
  layout: 'dashboard'
})

const route = useRoute()
const umkmId = computed(() => (route.params.id as string) || 'umkm-01')

const authStore = useAuthStore()
const investorStore = useInvestorStore()
const umkmStore = useUmkmStore()

const item = computed(() => {
  return investorStore.marketplaceList.find(m => m.id === umkmId.value) || investorStore.marketplaceList[0]
})

const investorName = computed(() => authStore.currentUser?.name || 'Hendro Wicaksono')

const accessTimestamp = new Date().toLocaleString('id-ID', {
  day: '2-digit',
  month: 'short',
  year: 'numeric',
  hour: '2-digit',
  minute: '2-digit'
})

// Catatan Laba Rugi 5 Bulan
const displayRecords = computed(() => {
  if (umkmStore.monthlyRecords && umkmStore.monthlyRecords.length > 0) {
    return [...umkmStore.monthlyRecords].reverse()
  }
  return [
    { month: 'Mei', year: 2026, omzet: 58000000, hpp: 28000000, opex: 13000000, netProfit: 17000000, cashBalance: 62000000 },
    { month: 'April', year: 2026, omzet: 54000000, hpp: 26500000, opex: 12500000, netProfit: 15000000, cashBalance: 52000000 },
    { month: 'Maret', year: 2026, omzet: 49000000, hpp: 24500000, opex: 12000000, netProfit: 12500000, cashBalance: 42000000 },
    { month: 'Februari', year: 2026, omzet: 45000000, hpp: 23000000, opex: 11500000, netProfit: 10500000, cashBalance: 33000000 },
    { month: 'Januari', year: 2026, omzet: 42000000, hpp: 22000000, opex: 11000000, netProfit: 9000000, cashBalance: 28000000 }
  ]
})

const averageOmzet = computed(() => {
  const sum = displayRecords.value.reduce((acc, r) => acc + r.omzet, 0)
  return Math.round(sum / displayRecords.value.length)
})

const averageHpp = computed(() => {
  const sum = displayRecords.value.reduce((acc, r) => acc + r.hpp, 0)
  return Math.round(sum / displayRecords.value.length)
})

const averageOpex = computed(() => {
  const sum = displayRecords.value.reduce((acc, r) => acc + r.opex, 0)
  return Math.round(sum / displayRecords.value.length)
})

const averageNetProfit = computed(() => {
  const sum = displayRecords.value.reduce((acc, r) => acc + r.netProfit, 0)
  return Math.round(sum / displayRecords.value.length)
})

const latestCashBalance = computed(() => {
  return displayRecords.value[0]?.cashBalance || 62000000
})

// Dokumen Bank
const bankDocs = [
  { name: 'Mandiri Giro (Sep 2026)', verifiedDate: 'Audit 20 Sep 2026' },
  { name: 'Mandiri Giro (Agu 2026)', verifiedDate: 'Audit 18 Agu 2026' },
  { name: 'Rekap POS Kasir (Mei-Sep)', verifiedDate: 'Audit 22 Sep 2026' }
]

// Dokumen Legalitas
const legalDocs = [
  { name: 'NIB RBA (KBLI 56303)', status: 'Aktif di OSS' },
  { name: 'Sertifikat Halal Kemenag', status: 'Aktif s.d 2028' },
  { name: 'Perjanjian Sewa Ruko', status: 'Aman s.d 2028' }
]

// Pratinjau Modal
const showBankModal = ref(false)
const activeBankDoc = ref<{ name: string; verifiedDate: string } | null>(null)

function previewBankStatement(doc: { name: string; verifiedDate: string }) {
  activeBankDoc.value = doc
  showBankModal.value = true
}

const showLegalModal = ref(false)
const activeLegalDoc = ref<{ name: string; status: string } | null>(null)

function previewLegalDoc(doc: { name: string; status: string }) {
  activeLegalDoc.value = doc
  showLegalModal.value = true
}

// Download CSV
function exportCsv() {
  const headers = ['Bulan', 'Tahun', 'Penjualan (Rp)', 'Bahan Baku (Rp)', 'Untung Kotor (Rp)', 'Margin (%)', 'Biaya Toko (Rp)', 'Laba Bersih (Rp)', 'Saldo Kas (Rp)']
  const rows = displayRecords.value.map(r => [
    r.month,
    r.year,
    r.omzet,
    r.hpp,
    r.omzet - r.hpp,
    Math.round(((r.omzet - r.hpp) / r.omzet) * 100),
    r.opex,
    r.netProfit,
    r.cashBalance
  ])

  const csvContent = [headers.join(','), ...rows.map(row => row.join(','))].join('\n')
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.setAttribute('href', url)
  link.setAttribute('download', `Laporan_${item.value.code}.csv`)
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}
</script>
