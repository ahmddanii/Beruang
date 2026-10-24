<template>
  <div ref="investorPageRef" class="space-y-6 sm:space-y-8 pb-16 font-poppins text-neutral-900 dark:text-neutral-100">
    <!-- 1. Page Title & Action Bar -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 min-h-[44px]">
      <div class="flex items-center gap-2.5 sm:gap-3">
        <HugeiconsIcon :icon="Coins01Icon" :size="26" :stroke-width="2.2" class="text-neutral-900 dark:text-white shrink-0" />
        <h1 class="font-poppins font-semibold text-2xl sm:text-3xl text-neutral-900 dark:text-white tracking-tight leading-tight">
          Data Investor
        </h1>
      </div>

      <div class="flex items-center gap-2.5 shrink-0 w-full sm:w-auto [&>*]:w-full sm:[&>*]:w-auto">
        <NuxtLink
          to="/admin/investasi"
          class="btn-pill-action justify-center"
        >
          <HugeiconsIcon :icon="ArrowLeft01Icon" :size="16" :stroke-width="2" />
          <span>Alur Investasi</span>
        </NuxtLink>
      </div>
    </div>

    <!-- 2. 3 Summary Cards -->
    <div class="grid grid-cols-1 sm:grid-cols-3 gap-6 lg:gap-8 items-stretch w-full">
      <div class="gsap-admin-card gsap-stat-card flex-1 w-full">
        <div class="stat-card-clean transition-all duration-200">
          <div class="flex items-center justify-between w-full gap-2">
            <div class="flex items-center gap-2 sm:gap-2.5 min-w-0">
              <div class="stat-card-icon-box">
                <HugeiconsIcon :icon="Coins01Icon" :size="17" :stroke-width="2.0" class="text-[#156374] dark:text-[#50AABF] shrink-0" />
              </div>
              <span class="text-[13px] xl:text-[14px] font-poppins font-semibold text-neutral-800 dark:text-neutral-100 capitalize truncate tracking-[-0.01em]">
                Total Investor
              </span>
            </div>
            <div class="stat-card-badge badge-green">
              <span>Terverifikasi</span>
            </div>
          </div>
          <div class="my-auto py-2.5 sm:py-3.5">
            <span class="text-xl sm:text-[22px] lg:text-[21px] xl:text-[24px] font-poppins font-semibold text-neutral-900 dark:text-white tabular-nums tracking-[-0.02em] whitespace-nowrap block leading-tight">
              {{ investorsList.length }} Institusi
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
                Akun KYC Lolos
              </span>
            </div>
            <div class="stat-card-badge badge-green">
              <span>KYC Valid</span>
            </div>
          </div>
          <div class="my-auto py-2.5 sm:py-3.5">
            <span class="text-xl sm:text-[22px] lg:text-[21px] xl:text-[24px] font-poppins font-semibold text-neutral-900 dark:text-white tabular-nums tracking-[-0.02em] whitespace-nowrap block leading-tight">
              {{ kycPassedCount }} Pemodal
            </span>
          </div>
        </div>
      </div>

      <div class="gsap-admin-card gsap-stat-card flex-1 w-full">
        <div class="stat-card-clean transition-all duration-200">
          <div class="flex items-center justify-between w-full gap-2">
            <div class="flex items-center gap-2 sm:gap-2.5 min-w-0">
              <div class="stat-card-icon-box">
                <HugeiconsIcon :icon="CheckmarkCircle01Icon" :size="17" :stroke-width="2.0" class="text-[#156374] dark:text-[#50AABF] shrink-0" />
              </div>
              <span class="text-[13px] xl:text-[14px] font-poppins font-semibold text-neutral-800 dark:text-neutral-100 capitalize truncate tracking-[-0.01em]">
                Portofolio Terhubung
              </span>
            </div>
            <div class="stat-card-badge badge-green">
              <span>Aktif</span>
            </div>
          </div>
          <div class="my-auto py-2.5 sm:py-3.5">
            <span class="text-xl sm:text-[22px] lg:text-[21px] xl:text-[24px] font-poppins font-semibold text-neutral-900 dark:text-white tabular-nums tracking-[-0.02em] whitespace-nowrap block leading-tight">
              6 UMKM Binaan
            </span>
          </div>
        </div>
      </div>
    </div>

    <!-- 3. Table Container -->
    <section class="gsap-admin-section card-tactile-gopay rounded-[18px] overflow-hidden font-poppins">
      <div class="p-5 sm:p-8 space-y-4 border-b border-[#E2E8F0] dark:border-neutral-800 bg-[#FFFFFF] dark:bg-[#13161F]">
        <div class="space-y-1.5">
          <h2 class="text-lg sm:text-xl font-poppins font-bold text-neutral-900 dark:text-white tracking-tight">
            Direktori Pemodal &amp; Investor
          </h2>
          <p class="text-xs sm:text-sm font-poppins text-neutral-600 dark:text-neutral-400 leading-normal">
            Daftar institusi ventura, angel investor, dan lembaga keuangan mitra pendanaan Beruang.
          </p>
        </div>

        <!-- Joined Search & Filter Control Bar -->
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
              aria-label="Cari investor, perwakilan, kota"
              placeholder="Cari institusi, nama perwakilan, kota..."
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

          <!-- Right: Filter Button Trigger -->
          <div class="relative shrink-0">
            <button
              type="button"
              class="h-full px-3 sm:px-4 py-2.5 text-xs sm:text-sm font-poppins font-medium text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200/50 dark:hover:bg-neutral-800 transition-colors flex items-center gap-1.5 cursor-pointer whitespace-nowrap min-h-[46px]"
              :aria-expanded="isFilterDropdownOpen"
              title="Filter Tipe Investor"
              @click="isFilterDropdownOpen = !isFilterDropdownOpen"
            >
              <HugeiconsIcon :icon="FilterHorizontalIcon" :size="14" :stroke-width="2" class="text-neutral-500 dark:text-neutral-400 shrink-0" />
              <span class="hidden sm:inline truncate">{{ activeTypeLabel }}</span>
              <span class="sm:hidden truncate text-xs">{{ activeTypeShortLabel }}</span>
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
                  v-for="opt in typeTabs"
                  :key="opt.id"
                  type="button"
                  :class="[
                    'w-full flex items-center justify-between px-3 py-2 rounded-[8px] text-sm font-poppins transition-all duration-150 text-left cursor-pointer',
                    selectedType === opt.id
                      ? 'bg-[#E6F4F7] hover:bg-[#D9EEF3] dark:bg-[#156374]/20 dark:hover:bg-[#156374]/30 text-[#156374] dark:text-[#50AABF] font-semibold border border-[#156374]/20 dark:border-[#50AABF]/25'
                      : 'text-[#475569] dark:text-neutral-300 font-medium hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100/80 dark:hover:bg-neutral-800/60 border border-transparent'
                  ]"
                  @click="selectTypeFilter(opt.id)"
                >
                  <span>{{ opt.label }}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Table View -->
      <div class="overflow-x-auto w-full">
        <table class="w-full text-left text-sm font-poppins">
          <thead>
            <tr class="bg-[#FFFFFF] dark:bg-[#13161F] border-b border-[#E2E8F0] dark:border-neutral-800 text-neutral-800 dark:text-neutral-200 font-poppins text-xs sm:text-sm font-bold uppercase tracking-wider">
              <th class="py-4 sm:py-5 px-6 text-left font-bold">Institusi &amp; Perwakilan</th>
              <th class="py-4 sm:py-5 px-5 text-left font-bold">Tipe &amp; Asal</th>
              <th class="py-4 sm:py-5 px-5 text-left font-bold">Fokus Sektor</th>
              <th class="py-4 sm:py-5 px-5 text-left font-bold">Status KYC</th>
              <th class="py-4 sm:py-5 px-6 text-right font-bold">Aksi</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-neutral-100 dark:divide-neutral-800/80 text-neutral-800 dark:text-neutral-200 font-poppins">
            <tr
              v-for="item in paginatedList"
              :key="item.id"
              class="bg-white dark:bg-[#13161F] hover:bg-neutral-50/80 dark:hover:bg-neutral-800/50 transition-colors"
            >
              <!-- Institusi & Perwakilan -->
              <td class="py-4 sm:py-5 px-6 text-left">
                <div class="flex items-center gap-3.5">
                  <div class="w-10 h-10 rounded-full bg-[#E6F4F7] dark:bg-[#156374]/25 border border-[#156374]/20 flex items-center justify-center text-sm font-semibold text-[#156374] dark:text-[#50AABF] shrink-0">
                    {{ item.name.slice(0, 2).toUpperCase() }}
                  </div>
                  <div class="min-w-0">
                    <p class="text-sm font-semibold text-neutral-900 dark:text-white truncate">{{ item.name }}</p>
                    <p class="text-xs font-medium text-neutral-600 dark:text-neutral-400 truncate mt-0.5">PIC: {{ item.pic }}</p>
                  </div>
                </div>
              </td>

              <!-- Tipe & Asal -->
              <td class="py-4 sm:py-5 px-5 text-left whitespace-nowrap">
                <p class="text-sm font-medium text-neutral-900 dark:text-white">{{ item.type }}</p>
                <p class="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">{{ item.city }}</p>
              </td>

              <!-- Fokus Sektor -->
              <td class="py-4 sm:py-5 px-5 text-left whitespace-nowrap">
                <span class="inline-flex items-center px-2.5 py-1 rounded-[8px] text-xs font-semibold bg-[#E6F4F7] text-[#156374] border border-[#156374]/20 dark:bg-[#156374]/25 dark:text-[#50AABF] dark:border-[#50AABF]/25">
                  {{ item.sectors }}
                </span>
              </td>

              <!-- Status KYC -->
              <td class="py-4 sm:py-5 px-5 text-left whitespace-nowrap">
                <span
                  :class="[
                    'inline-flex items-center px-2.5 py-1 rounded-[8px] text-xs font-semibold border font-poppins',
                    item.kycStatus === 'Terverifikasi'
                      ? 'bg-emerald-50 text-emerald-800 border-emerald-200 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800'
                      : 'bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 border-amber-200 dark:border-amber-800/50'
                  ]"
                >
                  {{ item.kycStatus }}
                </span>
              </td>

              <!-- Aksi -->
              <td class="py-4 sm:py-5 px-6 text-right whitespace-nowrap">
                <button
                  type="button"
                  class="btn-pill-action"
                  @click="selectedItem = item"
                >
                  <span>Detail</span>
                  <HugeiconsIcon :icon="ArrowRight01Icon" :size="16" :stroke-width="2" />
                </button>
              </td>
            </tr>

            <tr v-if="filteredList.length === 0">
              <td colspan="5" class="py-12 text-center text-sm text-neutral-500 dark:text-neutral-400">
                Tidak ada data investor yang sesuai dengan pencarian atau filter tipe.
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Pagination -->
      <BPagination
        v-model:currentPage="currentPage"
        :totalItems="filteredList.length"
        :pageSize="pageSize"
        itemLabel="investor"
      />
    </section>

    <!-- Modal Detail Investor -->
    <Teleport to="body">
      <Transition
        enter-active-class="transition duration-200 ease-out"
        enter-from-class="opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="transition duration-150 ease-in"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <div
          v-if="selectedItem"
          class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs font-poppins"
          @click.self="selectedItem = null"
        >
          <div class="w-full max-w-lg rounded-[18px] bg-[#FFFFFF] dark:bg-[#13161F] border border-[#CBD5E1] dark:border-neutral-800 p-6 sm:p-7 shadow-none space-y-5">
            <div class="flex items-start justify-between gap-3 border-b border-neutral-100 dark:border-neutral-800 pb-4">
              <div class="flex items-center gap-3">
                <div class="w-12 h-12 rounded-full bg-[#E6F4F7] dark:bg-[#156374]/25 text-[#156374] dark:text-[#50AABF] flex items-center justify-center text-base font-bold shrink-0">
                  {{ selectedItem.name.slice(0, 2).toUpperCase() }}
                </div>
                <div>
                  <h3 class="text-base sm:text-lg font-bold text-neutral-900 dark:text-white">{{ selectedItem.name }}</h3>
                  <p class="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400">{{ selectedItem.type }} • {{ selectedItem.city }}</p>
                </div>
              </div>
              <button
                type="button"
                class="w-9 h-9 rounded-full bg-white dark:bg-neutral-800 border border-[#CBD5E1] dark:border-neutral-700 flex items-center justify-center text-neutral-500 hover:text-neutral-900 dark:hover:text-white cursor-pointer shadow-none"
                @click="selectedItem = null"
              >
                <HugeiconsIcon :icon="Cancel01Icon" :size="16" :stroke-width="2.2" />
              </button>
            </div>

            <div class="p-4 sm:p-5 rounded-[14px] bg-neutral-50/70 dark:bg-neutral-900 border border-[#CBD5E1] dark:border-neutral-800 space-y-3 text-xs sm:text-sm">
              <div class="flex justify-between items-center">
                <span class="text-neutral-500 dark:text-neutral-400">Penanggung Jawab (PIC):</span>
                <span class="font-semibold text-neutral-900 dark:text-white">{{ selectedItem.pic }}</span>
              </div>
              <div class="flex justify-between items-center">
                <span class="text-neutral-500 dark:text-neutral-400">Preferensi Sektor:</span>
                <span class="font-semibold text-neutral-900 dark:text-white">{{ selectedItem.sectors }}</span>
              </div>
              <div class="flex justify-between items-center">
                <span class="text-neutral-500 dark:text-neutral-400">Status Verifikasi KYC:</span>
                <span class="font-semibold text-neutral-900 dark:text-white">{{ selectedItem.kycStatus }}</span>
              </div>
              <div class="flex justify-between items-center">
                <span class="text-neutral-500 dark:text-neutral-400">Portofolio UMKM Aktif:</span>
                <span class="font-semibold text-neutral-900 dark:text-white tabular-nums">{{ selectedItem.activeDeals }} Usaha Binaan</span>
              </div>
            </div>

            <div class="flex items-center justify-end gap-2.5 pt-2 border-t border-neutral-100 dark:border-neutral-800">
              <button
                type="button"
                class="btn-pill-action"
                @click="selectedItem = null"
              >
                <span>Tutup</span>
              </button>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'
import { gsap } from 'gsap'
import { HugeiconsIcon } from '@hugeicons/vue'
import BPagination from '~/components/base/BPagination.vue'
import {
  Coins01Icon,
  Shield01Icon,
  CheckmarkCircle01Icon,
  Search01Icon,
  FilterHorizontalIcon,
  ArrowDown01Icon,
  ArrowLeft01Icon,
  ArrowRight01Icon,
  Cancel01Icon
} from '@hugeicons/core-free-icons'

definePageMeta({
  layout: 'dashboard',
  hideHeader: true
})

useHead({
  title: 'Data Investor — Admin Beruang'
})

interface InvestorRecord {
  id: string
  name: string
  pic: string
  type: 'Venture Capital' | 'Angel Investor' | 'Family Office' | 'Syariah Fund'
  city: string
  ticketSize: string
  sectors: string
  kycStatus: 'Terverifikasi' | 'Menunggu Verifikasi'
  activeDeals: number
}

const investorPageRef = ref<HTMLElement | null>(null)
let gsapCtx: gsap.Context | null = null

const searchQuery = ref('')
const selectedType = ref<'ALL' | 'Venture Capital' | 'Angel Investor' | 'Family Office' | 'Syariah Fund'>('ALL')
const isFilterDropdownOpen = ref(false)
const selectedItem = ref<InvestorRecord | null>(null)

const currentPage = ref(1)
const pageSize = ref(10)

const typeTabs = [
  { id: 'ALL' as const, label: 'Semua Tipe', shortLabel: 'Semua' },
  { id: 'Venture Capital' as const, label: 'Venture Capital', shortLabel: 'VC' },
  { id: 'Angel Investor' as const, label: 'Angel Investor', shortLabel: 'Angel' },
  { id: 'Family Office' as const, label: 'Family Office', shortLabel: 'Family' },
  { id: 'Syariah Fund' as const, label: 'Syariah Fund', shortLabel: 'Syariah' }
]

const activeTypeLabel = computed(() => {
  return typeTabs.find(t => t.id === selectedType.value)?.label || 'Semua Tipe'
})

const activeTypeShortLabel = computed(() => {
  return typeTabs.find(t => t.id === selectedType.value)?.shortLabel || 'Semua'
})

function selectTypeFilter(id: typeof selectedType.value) {
  selectedType.value = id
  isFilterDropdownOpen.value = false
}

watch([searchQuery, selectedType], () => {
  currentPage.value = 1
})

const investorsList = ref<InvestorRecord[]>([
  {
    id: 'inv-1',
    name: 'Nusantara Impact Capital',
    pic: 'Raditya Wicaksono',
    type: 'Venture Capital',
    city: 'Jakarta Selatan',
    ticketSize: 'Rp 250 Jt – 1 Miliar',
    sectors: 'Kuliner & F&B, Agribisnis',
    kycStatus: 'Terverifikasi',
    activeDeals: 3
  },
  {
    id: 'inv-2',
    name: 'Artha Ventura Syariah',
    pic: 'Farhan Maulana',
    type: 'Syariah Fund',
    city: 'Jakarta Pusat',
    ticketSize: 'Rp 100 Jt – 500 Jt',
    sectors: 'Kuliner & F&B, Retail',
    kycStatus: 'Terverifikasi',
    activeDeals: 2
  },
  {
    id: 'inv-3',
    name: 'Koperasi Pemodal Lokal',
    pic: 'Sri Wahyuni',
    type: 'Family Office',
    city: 'Surabaya',
    ticketSize: 'Rp 50 Jt – 250 Jt',
    sectors: 'Agribisnis, Kriya',
    kycStatus: 'Terverifikasi',
    activeDeals: 2
  },
  {
    id: 'inv-4',
    name: 'Timur Berkarya Fund',
    pic: 'Albertinus Lado',
    type: 'Angel Investor',
    city: 'Denpasar',
    ticketSize: 'Rp 100 Jt – 300 Jt',
    sectors: 'Kriya & Tekstil, Pariwisata',
    kycStatus: 'Terverifikasi',
    activeDeals: 1
  },
  {
    id: 'inv-5',
    name: 'AgriInvest Ventura',
    pic: 'Bambang Soediro',
    type: 'Venture Capital',
    city: 'Semarang',
    ticketSize: 'Rp 200 Jt – 1 Miliar',
    sectors: 'Agribisnis, Pangan',
    kycStatus: 'Terverifikasi',
    activeDeals: 2
  },
  {
    id: 'inv-6',
    name: 'Bina Mandiri Angel Club',
    pic: 'Dewi Lestari',
    type: 'Angel Investor',
    city: 'Bandung',
    ticketSize: 'Rp 50 Jt – 200 Jt',
    sectors: 'Kuliner & F&B, Jasa',
    kycStatus: 'Terverifikasi',
    activeDeals: 1
  }
])

const kycPassedCount = computed(() => investorsList.value.filter(i => i.kycStatus === 'Terverifikasi').length)

const filteredList = computed(() => {
  return investorsList.value.filter((i) => {
    const matchType = selectedType.value === 'ALL' || i.type === selectedType.value
    const q = searchQuery.value.trim().toLowerCase()
    if (!q) return matchType
    return (
      matchType &&
      (i.name.toLowerCase().includes(q) ||
        i.pic.toLowerCase().includes(q) ||
        i.city.toLowerCase().includes(q) ||
        i.sectors.toLowerCase().includes(q))
    )
  })
})

const paginatedList = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value
  return filteredList.value.slice(start, start + pageSize.value)
})

onMounted(() => {
  if (!investorPageRef.value) return
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
  }, investorPageRef.value)
})

onUnmounted(() => {
  gsapCtx?.revert()
})
</script>
