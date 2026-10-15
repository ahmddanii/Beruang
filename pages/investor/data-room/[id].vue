<template>
  <div class="space-y-8 pb-10">
    <!-- Top Action -->
    <div>
      <NuxtLink :to="`/investor/umkm/${umkmId}`" class="hover:text-primary-600 transition-colors inline-flex items-center gap-1.5 text-xs text-neutral-500 font-medium">
        <HugeiconsIcon :icon="ArrowLeft02Icon" :size="14" :stroke-width="2" />
        <span>Kembali ke Profil {{ item?.name || 'Usaha' }}</span>
      </NuxtLink>
    </div>

    <!-- Locked State if NOT approved -->
    <div
      v-if="item?.accessStatus !== 'APPROVED'"
      class="max-w-xl mx-auto p-8 sm:p-12 bg-white dark:bg-[#151519] rounded-2xl border border-[#E4E7EC] dark:border-[#2B2B31] text-center space-y-5"
    >
      <div class="w-14 h-14 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-amber-600 dark:text-amber-400 flex items-center justify-center mx-auto">
        <HugeiconsIcon :icon="SquareLock02Icon" :size="28" :stroke-width="1.75" />
      </div>
      <div>
        <h2 class="font-heading font-extrabold text-2xl text-neutral-900 dark:text-white">
          Data Room Privat Terkunci
        </h2>
        <p class="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 max-w-sm mx-auto leading-relaxed mt-2">
          Anda belum memiliki izin akses data privat untuk <strong>{{ item?.name }}</strong>. Silakan ajukan permohonan akses terlebih dahulu untuk membuka dokumen riil.
        </p>
      </div>
      <div class="pt-2">
        <NuxtLink :to="`/investor/umkm/${umkmId}/ajukan-akses`">
          <BButton variant="primary" size="lg" class="flex items-center gap-2 mx-auto">
            <span>Ajukan Akses Data Sekarang</span>
            <HugeiconsIcon :icon="ArrowRight02Icon" :size="16" :stroke-width="2" />
          </BButton>
        </NuxtLink>
      </div>
    </div>

    <!-- Approved State: Watermarked Data Room Container -->
    <div v-else class="space-y-8 relative">
      <!-- Dynamic Security Watermark Overlay Layer -->
      <div
        class="fixed inset-0 pointer-events-none z-50 overflow-hidden flex items-center justify-center select-none opacity-5 dark:opacity-10"
        aria-hidden="true"
      >
        <div class="transform -rotate-25 text-center text-neutral-900 dark:text-white font-mono font-bold text-xs tracking-widest leading-loose">
          RAHASIA • DILINDUNGI HUKUM BERUANG • {{ authStore.currentUser?.name }} ({{ authStore.currentUser?.email }}) • {{ accessTimestamp }}<br />
          TIDAK UNTUK DIDISTRIBUSIKAN • AUDIT LOG ID: SEC-{{ umkmId }}-9842
        </div>
      </div>

      <!-- Top Header -->
      <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white dark:bg-[#151519] p-6 sm:p-8 rounded-2xl border border-[#E4E7EC] dark:border-[#2B2B31]">
        <div>
          <div class="flex items-center gap-2 mb-1.5">
            <BBadge variant="success" dot size="sm">Akses Disetujui</BBadge>
            <span class="text-xs text-neutral-500 font-mono flex items-center gap-1">
              <HugeiconsIcon :icon="ShieldCheckIcon" :size="13" :stroke-width="2" class="text-emerald-500" />
              <span>Enkripsi AES-256</span>
            </span>
          </div>
          <h1 class="text-2xl sm:text-3xl font-heading font-extrabold text-neutral-900 dark:text-white">
            Data Room Privat: {{ item?.name }}
          </h1>
          <p class="text-xs sm:text-sm text-neutral-500 mt-1">
            Laporan Keuangan Riil, Rekening Koran Bank, dan Dokumen Legalitas Sah.
          </p>
        </div>

        <div class="text-xs text-neutral-600 dark:text-neutral-400 p-3.5 rounded-xl bg-neutral-50 dark:bg-neutral-800/60 border border-neutral-200 dark:border-neutral-700/80">
          <div class="flex items-center gap-1.5 text-neutral-900 dark:text-neutral-100 font-semibold mb-0.5">
            <HugeiconsIcon :icon="Clock01Icon" :size="13" :stroke-width="2" class="text-primary-500" />
            <span>Sesi Audit Investor Aktif:</span>
          </div>
          <span class="font-mono text-[11px] text-neutral-500">{{ authStore.currentUser?.name }} • {{ accessTimestamp }}</span>
        </div>
      </div>

      <!-- Section 1: Detailed P&L Table (Rupiah Riil) -->
      <div class="bg-white dark:bg-[#151519] rounded-2xl border border-[#E4E7EC] dark:border-[#2B2B31] overflow-hidden">
        <div class="p-6 border-b border-neutral-100 dark:border-neutral-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div class="flex items-center gap-2">
              <h3 class="font-heading font-bold text-base text-neutral-900 dark:text-white">
                1. Laporan Laba Rugi Riil (P&L Audited)
              </h3>
              <span class="text-[10px] font-heading font-semibold uppercase px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                Verified
              </span>
            </div>
            <p class="text-xs text-neutral-500 mt-1">
              Data historis 5 bulan terakhir yang telah diverifikasi oleh konsultan pendamping.
            </p>
          </div>
          <BButton variant="secondary" size="sm" @click="downloadCsv" class="flex items-center gap-1.5 self-start sm:self-auto">
            <HugeiconsIcon :icon="Download01Icon" :size="14" :stroke-width="2" />
            <span>Ekspor Data (CSV)</span>
          </BButton>
        </div>

        <div class="overflow-x-auto">
          <table class="w-full text-left text-xs">
            <thead class="bg-neutral-50 dark:bg-neutral-800/60 text-neutral-500 uppercase tracking-wider font-heading font-semibold border-b border-neutral-100 dark:border-neutral-800">
              <tr>
                <th class="px-6 py-3.5">Bulan</th>
                <th class="px-6 py-3.5">Omzet Riil (Rp)</th>
                <th class="px-6 py-3.5">HPP Bahan (Rp)</th>
                <th class="px-6 py-3.5">Laba Kotor (Rp)</th>
                <th class="px-6 py-3.5">Margin %</th>
                <th class="px-6 py-3.5">Beban OPEX (Rp)</th>
                <th class="px-6 py-3.5">Laba Bersih (Rp)</th>
                <th class="px-6 py-3.5">Saldo Kas (Rp)</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-neutral-100 dark:divide-neutral-800 font-medium">
              <tr
                v-for="rec in [...umkmStore.monthlyRecords].reverse()"
                :key="rec.month"
                class="hover:bg-neutral-50 dark:hover:bg-neutral-800/40 transition-colors"
              >
                <td class="px-6 py-3.5 font-heading font-bold text-neutral-900 dark:text-white">
                  {{ rec.month }} {{ rec.year }}
                </td>
                <td class="px-6 py-3.5 tabular-nums font-semibold">
                  Rp {{ rec.omzet.toLocaleString('id-ID') }}
                </td>
                <td class="px-6 py-3.5 tabular-nums text-danger font-semibold">
                  Rp {{ rec.hpp.toLocaleString('id-ID') }}
                </td>
                <td class="px-6 py-3.5 tabular-nums text-emerald-600 font-semibold">
                  Rp {{ (rec.omzet - rec.hpp).toLocaleString('id-ID') }}
                </td>
                <td class="px-6 py-3.5 tabular-nums font-bold text-emerald-600">
                  {{ Math.round(((rec.omzet - rec.hpp) / rec.omzet) * 100) }}%
                </td>
                <td class="px-6 py-3.5 tabular-nums text-neutral-600 dark:text-neutral-400">
                  Rp {{ rec.opex.toLocaleString('id-ID') }}
                </td>
                <td class="px-6 py-3.5 tabular-nums font-bold text-neutral-900 dark:text-white">
                  Rp {{ rec.netProfit.toLocaleString('id-ID') }}
                </td>
                <td class="px-6 py-3.5 tabular-nums font-semibold text-primary-600">
                  Rp {{ rec.cashBalance.toLocaleString('id-ID') }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Section 2 & 3: Bank Statement Documents & Verification -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <BCard padding="lg" class="border border-[#E4E7EC] dark:border-[#2B2B31] shadow-none">
          <template #header>
            <div class="flex items-center gap-2">
              <div class="w-7 h-7 rounded-lg bg-primary-50 dark:bg-primary-950 text-primary-600 flex items-center justify-center">
                <HugeiconsIcon :icon="File01Icon" :size="16" :stroke-width="2" />
              </div>
              <h3 class="font-heading font-bold text-base text-neutral-900 dark:text-white">
                2. Rekening Koran & Mutasi Bank
              </h3>
            </div>
          </template>

          <div class="space-y-3">
            <div
              v-for="doc in bankDocs"
              :key="doc.name"
              class="p-3.5 rounded-xl bg-neutral-50 dark:bg-neutral-800/80 border border-neutral-200 dark:border-neutral-700/80 flex items-center justify-between text-xs transition-colors hover:border-neutral-300"
            >
              <div class="flex items-center gap-3">
                <div class="w-8 h-8 rounded-lg bg-white dark:bg-neutral-700 border border-neutral-200 dark:border-neutral-600 flex items-center justify-center text-primary-600 shrink-0">
                  <HugeiconsIcon :icon="File02Icon" :size="16" :stroke-width="1.75" />
                </div>
                <div>
                  <h4 class="font-heading font-bold text-neutral-900 dark:text-white">{{ doc.name }}</h4>
                  <span class="text-[11px] text-neutral-400">{{ doc.size }} • {{ doc.verifiedDate }}</span>
                </div>
              </div>
              <button
                type="button"
                class="text-xs text-primary-600 font-heading font-bold hover:underline flex items-center gap-1"
                @click="viewDoc(doc.name)"
              >
                <span>Unduh</span>
                <HugeiconsIcon :icon="Download01Icon" :size="12" :stroke-width="2" />
              </button>
            </div>
          </div>
        </BCard>

        <!-- Section 3: Legalitas & Kepatuhan -->
        <BCard padding="lg" class="border border-[#E4E7EC] dark:border-[#2B2B31] shadow-none">
          <template #header>
            <div class="flex items-center gap-2">
              <div class="w-7 h-7 rounded-lg bg-emerald-50 dark:bg-emerald-950 text-emerald-600 flex items-center justify-center">
                <HugeiconsIcon :icon="ShieldCheckIcon" :size="16" :stroke-width="2" />
              </div>
              <h3 class="font-heading font-bold text-base text-neutral-900 dark:text-white">
                3. Berkas Legalitas & Izin Usaha
              </h3>
            </div>
          </template>

          <div class="space-y-3">
            <div
              v-for="leg in legalDocs"
              :key="leg.name"
              class="p-3.5 rounded-xl bg-neutral-50 dark:bg-neutral-800/80 border border-neutral-200 dark:border-neutral-700/80 flex items-center justify-between text-xs transition-colors hover:border-neutral-300"
            >
              <div class="flex items-center gap-3">
                <div class="w-8 h-8 rounded-lg bg-white dark:bg-neutral-700 border border-neutral-200 dark:border-neutral-600 flex items-center justify-center text-emerald-600 shrink-0">
                  <HugeiconsIcon :icon="CheckmarkCircle02Icon" :size="16" :stroke-width="2" />
                </div>
                <div>
                  <h4 class="font-heading font-bold text-neutral-900 dark:text-white">{{ leg.name }}</h4>
                  <span class="text-[11px] text-emerald-600 font-semibold">{{ leg.status }}</span>
                </div>
              </div>
              <button
                type="button"
                class="text-xs text-primary-600 font-heading font-bold hover:underline flex items-center gap-1"
                @click="viewDoc(leg.name)"
              >
                <span>Lihat</span>
                <HugeiconsIcon :icon="EyeIcon" :size="12" :stroke-width="2" />
              </button>
            </div>
          </div>
        </BCard>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useAuthStore } from '~/stores/auth'
import { useInvestorStore } from '~/stores/investor'
import { useUmkmStore } from '~/stores/umkm'
import BCard from '~/components/base/BCard.vue'
import BButton from '~/components/base/BButton.vue'
import BBadge from '~/components/base/BBadge.vue'
import { HugeiconsIcon } from '@hugeicons/vue'
import {
  ArrowLeft02Icon,
  ArrowRight02Icon,
  SquareLock02Icon,
  ShieldCheckIcon,
  Clock01Icon,
  Download01Icon,
  File01Icon,
  File02Icon,
  CheckmarkCircle02Icon,
  EyeIcon
} from '@hugeicons/core-free-icons'

definePageMeta({
  layout: 'dashboard'
})

const route = useRoute()
const umkmId = computed(() => route.params.id as string || 'umkm-01')

const authStore = useAuthStore()
const investorStore = useInvestorStore()
const umkmStore = useUmkmStore()

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

const bankDocs = [
  { name: 'Rekening Koran Mandiri Giro (Sep 2026)', size: '2.4 MB PDF', verifiedDate: 'Diverifikasi 20 Sep 2026' },
  { name: 'Rekening Koran Mandiri Giro (Agu 2026)', size: '2.1 MB PDF', verifiedDate: 'Diverifikasi 18 Agu 2026' },
  { name: 'Rekapitulasi Arus Kas POS Kasir (Mei-Sep)', size: '1.2 MB PDF', verifiedDate: 'Diverifikasi 22 Sep 2026' }
]

const legalDocs = [
  { name: 'Nomor Induk Berusaha (NIB RBA - KBLI 56303)', status: 'Aktif Terdaftar di OSS' },
  { name: 'Sertifikat Halal BPJPH Kemenag', status: 'Terbit Resmi s.d 2028' },
  { name: 'Perjanjian Sewa Gerai 3 Cabang', status: 'Aman s.d Desember 2028' }
]

function viewDoc(name: string) {
  alert(`Membuka dokumen ${name} dengan watermark digital identitas ${authStore.currentUser?.name}.`)
}

function downloadCsv() {
  alert('Mengunduh rekaman P&L tervalidasi dalam format CSV...')
}
</script>
