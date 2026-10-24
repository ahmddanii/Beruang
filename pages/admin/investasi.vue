<template>
  <div ref="investasiPageRef" class="space-y-6 sm:space-y-8 pb-16 font-poppins text-neutral-900 dark:text-neutral-100">
    <!-- 1. Page Title: Identical to UMKM Pages -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 min-h-[44px]">
      <div class="flex items-center gap-2.5 sm:gap-3">
        <HugeiconsIcon :icon="Coins01Icon" :size="26" :stroke-width="2.2" class="text-neutral-900 dark:text-white shrink-0" />
        <h1 class="font-poppins font-semibold text-2xl sm:text-3xl text-neutral-900 dark:text-white tracking-tight leading-tight">
          Alur Investasi
        </h1>
      </div>

      <div class="flex items-center gap-2.5 shrink-0 w-full sm:w-auto [&>*]:w-full sm:[&>*]:w-auto">
        <button
          type="button"
          class="btn-pill-action justify-center"
          @click="handleExportCsv"
        >
          <HugeiconsIcon :icon="Download01Icon" :size="16" :stroke-width="2" />
          <span>Unduh CSV</span>
        </button>
      </div>
    </div>

    <!-- Toast Feedback -->
    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="transform -translate-y-2 opacity-0"
      enter-to-class="transform translate-y-0 opacity-100"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="transform translate-y-0 opacity-100"
      leave-to-class="transform -translate-y-2 opacity-0"
    >
      <div
        v-if="toastMessage"
        class="flex items-center justify-between gap-3 px-4 py-3.5 rounded-[14px] bg-[#E8F8EE] dark:bg-[#00800e]/20 border border-[#86EFAC] dark:border-[#00C058]/30 text-[#00800e] dark:text-[#4ADE80] shadow-none"
      >
        <div class="flex items-center gap-2.5 text-sm font-semibold">
          <HugeiconsIcon :icon="CheckmarkCircle01Icon" :size="18" :stroke-width="2.2" class="shrink-0" />
          <span>{{ toastMessage }}</span>
        </div>
        <button type="button" class="text-xs sm:text-sm font-bold hover:underline cursor-pointer" @click="toastMessage = ''">
          Tutup
        </button>
      </div>
    </Transition>

    <!-- 2. 3 Summary Cards (Identical .stat-card-clean Typography & Geometry to UMKM Pages) -->
    <div class="grid grid-cols-1 sm:grid-cols-3 gap-6 lg:gap-8 items-stretch w-full">
      <div class="gsap-admin-card gsap-stat-card flex-1 w-full">
        <div class="stat-card-clean transition-all duration-200">
          <div class="flex items-center justify-between w-full gap-2">
            <div class="flex items-center gap-2 sm:gap-2.5 min-w-0">
              <div class="stat-card-icon-box">
                <HugeiconsIcon :icon="Coins01Icon" :size="17" :stroke-width="2.0" class="text-[#156374] dark:text-[#50AABF] shrink-0" />
              </div>
              <span class="text-[13px] xl:text-[14px] font-poppins font-semibold text-neutral-800 dark:text-neutral-100 capitalize truncate tracking-[-0.01em]">
                Minat Pendanaan
              </span>
            </div>
            <div class="stat-card-badge badge-green">
              <span>{{ dealItems.length }} Tiket</span>
            </div>
          </div>
          <div class="my-auto py-2.5 sm:py-3.5">
            <span class="text-xl sm:text-[22px] lg:text-[21px] xl:text-[24px] font-poppins font-semibold text-neutral-900 dark:text-white tabular-nums tracking-[-0.02em] whitespace-nowrap block leading-tight">
              Rp 1.020.000.000
            </span>
          </div>
        </div>
      </div>

      <div class="gsap-admin-card gsap-stat-card flex-1 w-full">
        <div class="stat-card-clean transition-all duration-200">
          <div class="flex items-center justify-between w-full gap-2">
            <div class="flex items-center gap-2 sm:gap-2.5 min-w-0">
              <div class="stat-card-icon-box">
                <HugeiconsIcon :icon="FileUnlockedIcon" :size="17" :stroke-width="2.0" class="text-[#156374] dark:text-[#50AABF] shrink-0" />
              </div>
              <span class="text-[13px] xl:text-[14px] font-poppins font-semibold text-neutral-800 dark:text-neutral-100 capitalize truncate tracking-[-0.01em]">
                Ruang Data Terbuka
              </span>
            </div>
            <div class="stat-card-badge badge-green">
              <span>Watermark</span>
            </div>
          </div>
          <div class="my-auto py-2.5 sm:py-3.5">
            <span class="text-xl sm:text-[22px] lg:text-[21px] xl:text-[24px] font-poppins font-semibold text-neutral-900 dark:text-white tabular-nums tracking-[-0.02em] whitespace-nowrap block leading-tight">
              {{ activeDataRoomCount }} Akses
            </span>
          </div>
        </div>
      </div>

      <div class="gsap-admin-card gsap-stat-card flex-1 w-full">
        <div class="stat-card-clean transition-all duration-200">
          <div class="flex items-center justify-between w-full gap-2">
            <div class="flex items-center gap-2 sm:gap-2.5 min-w-0">
              <div class="stat-card-icon-box">
                <HugeiconsIcon :icon="Shield01Icon" :size="17" :stroke-width="2.0" class="text-[#156374] dark:text-[#50AABF] shrink-0" />
              </div>
              <span class="text-[13px] xl:text-[14px] font-poppins font-semibold text-neutral-800 dark:text-neutral-100 capitalize truncate tracking-[-0.01em]">
                Institusi Investor
              </span>
            </div>
            <div class="stat-card-badge badge-green">
              <span>KYC Valid</span>
            </div>
          </div>
          <div class="my-auto py-2.5 sm:py-3.5">
            <span class="text-xl sm:text-[22px] lg:text-[21px] xl:text-[24px] font-poppins font-semibold text-neutral-900 dark:text-white tabular-nums tracking-[-0.02em] whitespace-nowrap block leading-tight">
              4 Pemodal
            </span>
          </div>
        </div>
      </div>
    </div>

    <!-- 3. Deal Flow & Data Room Table -->
    <section class="gsap-admin-section card-tactile-gopay rounded-[18px] overflow-hidden font-poppins">
      <div class="p-5 sm:p-8 space-y-4 border-b border-[#E2E8F0] dark:border-neutral-800 bg-[#FFFFFF] dark:bg-[#13161F]">
        <div class="space-y-1.5">
          <h2 class="text-lg sm:text-xl font-poppins font-bold text-neutral-900 dark:text-white tracking-tight">
            Daftar Interaksi Pemodal & Akses Ruang Data
          </h2>
          <p class="text-xs sm:text-sm font-poppins text-neutral-600 dark:text-neutral-400 leading-normal">
            Pantau pembukaan dokumen keuangan privat antara investor dan UMKM binaan.
          </p>
        </div>

        <!-- Joined Search & Filter Control Bar (Identik dengan Catatan Kas — Daftar Mutasi Transaksi Kas Harian) -->
        <div class="relative w-full rounded-[10px] border border-[#CBD5E1] dark:border-neutral-700 bg-neutral-50/70 dark:bg-[#1A1A1A] focus-within:border-[#00800e] dark:focus-within:border-[#00C058] focus-within:ring-2 focus-within:ring-[#00800e]/20 transition-all flex items-center min-h-[46px]">
          <!-- Left: Search Icon + Input -->
          <div class="relative flex-1 flex items-center min-w-0">
            <HugeiconsIcon
              :icon="Search01Icon"
              :size="16"
              :stroke-width="1.8"
              class="ml-3.5 text-neutral-400 dark:text-neutral-500 shrink-0 pointer-events-none"
            />
            <input
              v-model="searchQuery"
              type="text"
              aria-label="Cari investor, UMKM, atau konsultan"
              placeholder="Cari investor, UMKM, konsultan..."
              class="w-full pl-2.5 pr-2 py-2.5 bg-transparent border-0 text-xs sm:text-sm text-[#18181b] dark:text-[#FDFDFD] placeholder:text-neutral-400 dark:placeholder:text-neutral-500 focus:outline-none focus:ring-0 font-poppins min-w-0"
            />
            <button
              v-if="searchQuery"
              type="button"
              aria-label="Hapus pencarian"
              class="p-1.5 mr-1 text-neutral-400 hover:text-neutral-700 dark:hover:text-white cursor-pointer shrink-0"
              title="Hapus pencarian"
              @click="searchQuery = ''"
            >
              <HugeiconsIcon :icon="Cancel01Icon" :size="15" :stroke-width="2" />
            </button>
          </div>

          <!-- Divider Line -->
          <div class="h-6 w-px bg-neutral-300 dark:bg-neutral-700 shrink-0" aria-hidden="true" />

          <!-- Right: Filter Button Trigger (Joined seamlessly) -->
          <div class="relative shrink-0">
            <button
              type="button"
              class="h-full px-3 sm:px-4 py-2.5 text-xs sm:text-sm font-poppins font-medium text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200/50 dark:hover:bg-neutral-800 transition-colors flex items-center gap-1.5 cursor-pointer whitespace-nowrap min-h-[46px]"
              :aria-expanded="isFilterDropdownOpen"
              title="Filter Tahap Alur Investasi"
              @click="isFilterDropdownOpen = !isFilterDropdownOpen"
            >
              <HugeiconsIcon :icon="FilterHorizontalIcon" :size="14" :stroke-width="2" class="text-neutral-500 dark:text-neutral-400 shrink-0" />
              <span class="hidden sm:inline truncate">{{ activeStageLabel }}</span>
              <span class="sm:hidden truncate text-xs">{{ activeStageShortLabel }}</span>
              <HugeiconsIcon
                :icon="ArrowDown01Icon"
                :size="14"
                :stroke-width="2"
                class="text-neutral-500 dark:text-neutral-400 transition-transform duration-200 shrink-0"
                :class="{ 'rotate-180': isFilterDropdownOpen }"
              />
            </button>

            <!-- Dropdown Menu Popover -->
            <div
              v-if="isFilterDropdownOpen"
              class="absolute right-0 top-full mt-1.5 w-52 sm:w-56 rounded-[10px] bg-white dark:bg-[#18191E] border border-[#CBD5E1] dark:border-neutral-700 shadow-none p-1.5 z-50 font-poppins text-sm animate-in fade-in zoom-in-95 duration-150"
            >
              <div class="space-y-0.5">
                <button
                  v-for="opt in stageTabs"
                  :key="opt.id"
                  type="button"
                  :class="[
                    'w-full flex items-center justify-between px-3 py-2 rounded-[8px] text-sm font-poppins transition-all duration-150 text-left cursor-pointer',
                    selectedStage === opt.id
                      ? 'bg-[#E6F4F7] hover:bg-[#D9EEF3] dark:bg-[#156374]/20 dark:hover:bg-[#156374]/30 text-[#156374] dark:text-[#50AABF] font-semibold border border-[#156374]/20 dark:border-[#50AABF]/25'
                      : 'text-[#475569] dark:text-neutral-300 font-medium hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100/80 dark:hover:bg-neutral-800/60 border border-transparent'
                  ]"
                  @click="selectStageFilter(opt.id)"
                >
                  <span>{{ opt.label }}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="overflow-x-auto w-full">
        <table class="w-full text-left text-sm font-poppins">
          <thead>
            <tr class="bg-[#FFFFFF] dark:bg-[#13161F] border-b border-[#E2E8F0] dark:border-neutral-800 text-neutral-800 dark:text-neutral-200 font-poppins text-xs sm:text-sm font-bold uppercase tracking-wider">
              <th class="py-4 sm:py-5 px-6 text-left font-bold">Investor Pemodal</th>
              <th class="py-4 sm:py-5 px-5 text-left font-bold">Target UMKM & Konsultan</th>
              <th class="py-4 sm:py-5 px-5 text-left font-bold">Minat Pendanaan</th>
              <th class="py-4 sm:py-5 px-5 text-left font-bold">Tahap & Ruang Data</th>
              <th class="py-4 sm:py-5 px-6 text-right font-bold">Tindakan</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-neutral-100 dark:divide-neutral-800/80 text-neutral-800 dark:text-neutral-200 font-poppins">
            <tr
              v-for="deal in filteredDeals"
              :key="deal.id"
              class="bg-white dark:bg-[#13161F] hover:bg-neutral-50/80 dark:hover:bg-neutral-800/50 transition-colors"
            >
              <td class="py-4 sm:py-5 px-6 text-left">
                <p class="text-sm font-semibold text-neutral-900 dark:text-white">{{ deal.investorName }}</p>
                <p class="text-xs font-medium text-neutral-600 dark:text-neutral-400 mt-0.5">{{ deal.investorType }}</p>
              </td>
              <td class="py-4 sm:py-5 px-5 text-left">
                <p class="text-sm font-semibold text-neutral-900 dark:text-white">{{ deal.umkmName }}</p>
                <p class="text-xs font-medium text-neutral-600 dark:text-neutral-400 mt-0.5">Konsultan: {{ deal.consultantName }}</p>
              </td>
              <td class="py-4 sm:py-5 px-5 text-left whitespace-nowrap">
                <span class="text-sm font-semibold text-neutral-900 dark:text-white tabular-nums block">{{ deal.ticketSize }}</span>
                <p class="text-xs font-medium text-neutral-600 dark:text-neutral-400 mt-0.5">Update {{ deal.updatedAt }}</p>
              </td>
              <td class="py-4 sm:py-5 px-5 text-left whitespace-nowrap">
                <span
                  :class="[
                    'inline-flex items-center px-2.5 py-1 rounded-[8px] text-xs font-semibold border font-poppins',
                    deal.stage === 'Ruang Data Terbuka'
                      ? 'bg-emerald-50 text-emerald-800 border-emerald-200 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800'
                      : deal.stage === 'Penjajakan Awal'
                        ? 'bg-cyan-50 text-cyan-800 border-cyan-200 dark:bg-cyan-950/60 dark:text-cyan-300 dark:border-cyan-800'
                        : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 border-neutral-200 dark:border-neutral-700'
                  ]"
                >
                  {{ deal.stage }}
                </span>
              </td>
              <td class="py-4 sm:py-5 px-6 text-right whitespace-nowrap">
                <div class="inline-flex items-center gap-2.5">
                  <button
                    v-if="deal.stage === 'Penjajakan Awal'"
                    type="button"
                    class="btn-pill-action-green"
                    @click="grantDataRoom(deal)"
                  >
                    <span>Buka Akses</span>
                  </button>
                  <button
                    v-if="deal.stage === 'Ruang Data Terbuka'"
                    type="button"
                    class="btn-pill-action-red-outline"
                    @click="revokeDataRoom(deal)"
                  >
                    <span>Cabut Izin</span>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { gsap } from 'gsap'
import { HugeiconsIcon } from '@hugeicons/vue'
import {
  Coins01Icon,
  Download01Icon,
  CheckmarkCircle01Icon,
  FileUnlockedIcon,
  Shield01Icon,
  Search01Icon,
  FilterHorizontalIcon,
  ArrowDown01Icon,
  Cancel01Icon
} from '@hugeicons/core-free-icons'

definePageMeta({
  layout: 'dashboard',
  hideHeader: true
})

useHead({
  title: 'Alur Investasi — Admin Beruang'
})

interface DealFlowItem {
  id: string
  investorName: string
  investorType: string
  umkmName: string
  consultantName: string
  ticketSize: string
  stage: 'Ruang Data Terbuka' | 'Penjajakan Awal' | 'Akses Dicabut'
  updatedAt: string
}

const investasiPageRef = ref<HTMLElement | null>(null)
let gsapCtx: gsap.Context | null = null

const toastMessage = ref('')
const selectedStage = ref<'ALL' | 'Ruang Data Terbuka' | 'Penjajakan Awal'>('ALL')
const isFilterDropdownOpen = ref(false)
const searchQuery = ref('')

const stageTabs = [
  { id: 'ALL' as const, label: 'Semua Alur', shortLabel: 'Semua' },
  { id: 'Ruang Data Terbuka' as const, label: 'Ruang Data Terbuka', shortLabel: 'Ruang Data' },
  { id: 'Penjajakan Awal' as const, label: 'Penjajakan Awal', shortLabel: 'Penjajakan' }
]

const activeStageLabel = computed(() => {
  return stageTabs.find(t => t.id === selectedStage.value)?.label || 'Semua Alur'
})

const activeStageShortLabel = computed(() => {
  return stageTabs.find(t => t.id === selectedStage.value)?.shortLabel || 'Semua'
})

function selectStageFilter(id: typeof selectedStage.value) {
  selectedStage.value = id
  isFilterDropdownOpen.value = false
}

const dealItems = ref<DealFlowItem[]>([
  {
    id: 'deal-1',
    investorName: 'Nusantara Impact Capital',
    investorType: 'Venture Capital • Jakarta',
    umkmName: 'Kopi Kenangan Senja',
    consultantName: 'Rendra Pratama, S.E., Ak.',
    ticketSize: 'Rp 250.000.000',
    stage: 'Ruang Data Terbuka',
    updatedAt: '2 jam lalu'
  },
  {
    id: 'deal-2',
    investorName: 'Nusantara Impact Capital',
    investorType: 'Venture Capital • Jakarta',
    umkmName: 'Batik Sekar Jagad',
    consultantName: 'Nadia Kusuma, MBA, CFP',
    ticketSize: 'Rp 320.000.000',
    stage: 'Ruang Data Terbuka',
    updatedAt: '4 jam lalu'
  },
  {
    id: 'deal-3',
    investorName: 'Artha Ventura Syariah',
    investorType: 'Dana Syariah • Bandung',
    umkmName: 'Kopi Kenangan Senja',
    consultantName: 'Rendra Pratama, S.E., Ak.',
    ticketSize: 'Rp 150.000.000',
    stage: 'Penjajakan Awal',
    updatedAt: '1 hari lalu'
  },
  {
    id: 'deal-4',
    investorName: 'Timur Berkarya Fund',
    investorType: 'Impact Fund • Bali',
    umkmName: 'Tenun Ikat Nusantara',
    consultantName: 'Dr. Hendra Wijaya, M.M.',
    ticketSize: 'Rp 180.000.000',
    stage: 'Penjajakan Awal',
    updatedAt: '5 jam lalu'
  },
  {
    id: 'deal-5',
    investorName: 'Koperasi Pemodal Lokal',
    investorType: 'Angel Syndicate • Bogor',
    umkmName: 'Sayur Hidroponik Segar',
    consultantName: 'Rendra Pratama, S.E., Ak.',
    ticketSize: 'Rp 120.000.000',
    stage: 'Ruang Data Terbuka',
    updatedAt: '3 hari lalu'
  }
])

const activeDataRoomCount = computed(() => dealItems.value.filter(d => d.stage === 'Ruang Data Terbuka').length)

const filteredDeals = computed(() => {
  return dealItems.value.filter((d) => {
    const matchStage = selectedStage.value === 'ALL' || d.stage === selectedStage.value
    const q = searchQuery.value.trim().toLowerCase()
    if (!q) return matchStage
    return (
      matchStage &&
      (d.investorName.toLowerCase().includes(q) ||
        d.umkmName.toLowerCase().includes(q) ||
        d.consultantName.toLowerCase().includes(q))
    )
  })
})

function grantDataRoom(deal: DealFlowItem) {
  deal.stage = 'Ruang Data Terbuka'
  toastMessage.value = `Akses Ruang Data ${deal.umkmName} dibuka untuk ${deal.investorName}.`
}

function revokeDataRoom(deal: DealFlowItem) {
  deal.stage = 'Akses Dicabut'
  toastMessage.value = `Akses Ruang Data ${deal.umkmName} untuk ${deal.investorName} telah dicabut.`
}

function handleExportCsv() {
  toastMessage.value = `Data alur investasi (${filteredDeals.value.length} transaksi) berhasil diunduh.`
}

onMounted(() => {
  if (!investasiPageRef.value) return
  gsapCtx = gsap.context(() => {
    gsap.fromTo(
      '.gsap-admin-card',
      { opacity: 0, y: 14 },
      { opacity: 1, y: 0, duration: 0.4, stagger: 0.06, ease: 'power2.out', clearProps: 'transform' }
    )
    gsap.fromTo(
      '.gsap-admin-section',
      { opacity: 0, y: 16 },
      { opacity: 1, y: 0, duration: 0.45, delay: 0.12, ease: 'power2.out', clearProps: 'transform' }
    )
  }, investasiPageRef.value)
})

onUnmounted(() => {
  gsapCtx?.revert()
})
</script>
