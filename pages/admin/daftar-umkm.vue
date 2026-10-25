<template>
  <div ref="daftarUmkmPageRef" class="space-y-6 sm:space-y-8 pb-16 font-poppins text-neutral-900 dark:text-neutral-100">
    <!-- 1. Page Title & Action Bar -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 min-h-[44px]">
      <div class="flex items-center gap-2.5 sm:gap-3">
        <HugeiconsIcon :icon="Store01Icon" :size="26" :stroke-width="2.2" class="text-neutral-900 dark:text-white shrink-0" />
        <h1 class="font-poppins font-semibold text-2xl sm:text-3xl text-neutral-900 dark:text-white tracking-tight leading-tight">
          Data UMKM
        </h1>
      </div>

      <div class="flex items-center gap-2.5 shrink-0 w-full sm:w-auto [&>*]:w-full sm:[&>*]:w-auto">
        <NuxtLink
          to="/admin/umkm"
          class="btn-pill-action justify-center"
        >
          <HugeiconsIcon :icon="ArrowLeft01Icon" :size="16" :stroke-width="2" />
          <span>Kemitraan UMKM</span>
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
                <HugeiconsIcon :icon="Store01Icon" :size="17" :stroke-width="2.0" class="text-[#156374] dark:text-[#50AABF] shrink-0" />
              </div>
              <span class="text-[13px] xl:text-[14px] font-poppins font-semibold text-neutral-800 dark:text-neutral-100 capitalize truncate tracking-[-0.01em]">
                Total UMKM
              </span>
            </div>
            <div class="stat-card-badge badge-green">
              <span>Terdaftar</span>
            </div>
          </div>
          <div class="my-auto py-2.5 sm:py-3.5">
            <span class="text-xl sm:text-[22px] lg:text-[21px] xl:text-[24px] font-poppins font-semibold text-neutral-900 dark:text-white tabular-nums tracking-[-0.02em] whitespace-nowrap block leading-tight">
              {{ umkmList.length }} Usaha
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
                NIB Terverifikasi
              </span>
            </div>
            <div class="stat-card-badge badge-green">
              <span>Valid OSS</span>
            </div>
          </div>
          <div class="my-auto py-2.5 sm:py-3.5">
            <span class="text-xl sm:text-[22px] lg:text-[21px] xl:text-[24px] font-poppins font-semibold text-neutral-900 dark:text-white tabular-nums tracking-[-0.02em] whitespace-nowrap block leading-tight">
              {{ verifiedNibCount }} Usaha
            </span>
          </div>
        </div>
      </div>

      <div class="gsap-admin-card gsap-stat-card flex-1 w-full">
        <div class="stat-card-clean transition-all duration-200">
          <div class="flex items-center justify-between w-full gap-2">
            <div class="flex items-center gap-2 sm:gap-2.5 min-w-0">
              <div class="stat-card-icon-box">
                <HugeiconsIcon :icon="Award01Icon" :size="17" :stroke-width="2.0" class="text-[#156374] dark:text-[#50AABF] shrink-0" />
              </div>
              <span class="text-[13px] xl:text-[14px] font-poppins font-semibold text-neutral-800 dark:text-neutral-100 capitalize truncate tracking-[-0.01em]">
                Siap Didanai
              </span>
            </div>
            <div class="stat-card-badge badge-green">
              <span>Terverifikasi</span>
            </div>
          </div>
          <div class="my-auto py-2.5 sm:py-3.5">
            <span class="text-xl sm:text-[22px] lg:text-[21px] xl:text-[24px] font-poppins font-semibold text-neutral-900 dark:text-white tabular-nums tracking-[-0.02em] whitespace-nowrap block leading-tight">
              {{ readyCount }} Usaha
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
            Direktori Profil Usaha UMKM
          </h2>
          <p class="text-xs sm:text-sm font-poppins text-neutral-600 dark:text-neutral-400 leading-normal">
            Daftar profil lengkap seluruh UMKM yang terdaftar di platform Beruang.
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
              aria-label="Cari UMKM, pemilik, kota"
              placeholder="Cari UMKM, nama pemilik, kota..."
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
              title="Filter Sektor Usaha"
              @click="isFilterDropdownOpen = !isFilterDropdownOpen"
            >
              <HugeiconsIcon :icon="FilterHorizontalIcon" :size="14" :stroke-width="2" class="text-neutral-500 dark:text-neutral-400 shrink-0" />
              <span class="hidden sm:inline truncate">{{ activeSectorLabel }}</span>
              <span class="sm:hidden truncate text-xs">{{ activeSectorShortLabel }}</span>
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
                  v-for="opt in sectorTabs"
                  :key="opt.id"
                  type="button"
                  :class="[
                    'w-full flex items-center justify-between px-3 py-2 rounded-[8px] text-sm font-poppins transition-all duration-150 text-left cursor-pointer',
                    selectedSector === opt.id
                      ? 'bg-[#E6F4F7] hover:bg-[#D9EEF3] dark:bg-[#156374]/20 dark:hover:bg-[#156374]/30 text-[#156374] dark:text-[#50AABF] font-semibold border border-[#156374]/20 dark:border-[#50AABF]/25'
                      : 'text-[#475569] dark:text-neutral-300 font-medium hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100/80 dark:hover:bg-neutral-800/60 border border-transparent'
                  ]"
                  @click="selectSectorFilter(opt.id)"
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
              <th class="py-4 sm:py-5 px-6 text-left font-bold">Usaha &amp; Pemilik</th>
              <th class="py-4 sm:py-5 px-5 text-left font-bold">Lokasi &amp; Sektor</th>
              <th class="py-4 sm:py-5 px-5 text-left font-bold">Legalitas NIB</th>
              <th class="py-4 sm:py-5 px-5 text-left font-bold">Status Kesiapan</th>
              <th class="py-4 sm:py-5 px-6 text-right font-bold">Aksi</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-neutral-100 dark:divide-neutral-800/80 text-neutral-800 dark:text-neutral-200 font-poppins">
            <tr
              v-for="item in paginatedList"
              :key="item.id"
              class="bg-white dark:bg-[#13161F] hover:bg-neutral-50/80 dark:hover:bg-neutral-800/50 transition-colors"
            >
              <!-- Usaha & Pemilik -->
              <td class="py-4 sm:py-5 px-6 text-left">
                <div class="flex items-center gap-3.5">
                  <div class="w-10 h-10 rounded-full bg-[#E6F4F7] dark:bg-[#156374]/25 border border-[#156374]/20 flex items-center justify-center text-sm font-semibold text-[#156374] dark:text-[#50AABF] shrink-0">
                    {{ item.name.slice(0, 2).toUpperCase() }}
                  </div>
                  <div class="min-w-0">
                    <p class="text-sm font-semibold text-neutral-900 dark:text-white truncate">{{ item.name }}</p>
                    <p class="text-xs font-medium text-neutral-600 dark:text-neutral-400 truncate mt-0.5">{{ item.owner }}</p>
                  </div>
                </div>
              </td>

              <!-- Lokasi & Sektor -->
              <td class="py-4 sm:py-5 px-5 text-left whitespace-nowrap">
                <p class="text-sm font-medium text-neutral-900 dark:text-white">{{ item.city }}</p>
                <p class="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">{{ item.sector }}</p>
              </td>

              <!-- NIB -->
              <td class="py-4 sm:py-5 px-5 text-left whitespace-nowrap">
                <span class="inline-flex items-center px-2.5 py-1 rounded-[8px] text-xs font-poppins tabular-nums font-semibold bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 border border-neutral-200 dark:border-neutral-700">
                  {{ item.nib }}
                </span>
              </td>

              <!-- Status Kesiapan -->
              <td class="py-4 sm:py-5 px-5 text-left whitespace-nowrap">
                <span
                  :class="[
                    'inline-flex items-center px-2.5 py-1 rounded-[8px] text-xs font-semibold border font-poppins',
                    item.status === 'Siap Didanai'
                      ? 'bg-emerald-50 text-emerald-800 border-emerald-200 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800'
                      : item.status === 'Pendampingan'
                        ? 'bg-cyan-50 text-cyan-800 border-cyan-200 dark:bg-cyan-950/60 dark:text-cyan-300 dark:border-cyan-800'
                        : 'bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 border-amber-200 dark:border-amber-800/50'
                  ]"
                >
                  {{ item.status }}
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
                Tidak ada data UMKM yang sesuai dengan pencarian atau filter sektor.
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
        itemLabel="usaha"
      />
    </section>

    <!-- Modal Detail UMKM -->
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
                  <p class="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400">{{ selectedItem.owner }} • {{ selectedItem.sector }}</p>
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
                <span class="text-neutral-500 dark:text-neutral-400">Nomor Induk Berusaha (NIB):</span>
                <span class="font-poppins tabular-nums font-semibold text-neutral-900 dark:text-white">{{ selectedItem.nib }}</span>
              </div>
              <div class="flex justify-between items-center">
                <span class="text-neutral-500 dark:text-neutral-400">Kota Operasional:</span>
                <span class="font-semibold text-neutral-900 dark:text-white">{{ selectedItem.city }}</span>
              </div>
              <div class="flex justify-between items-center">
                <span class="text-neutral-500 dark:text-neutral-400">Status Kesiapan:</span>
                <span class="font-semibold text-neutral-900 dark:text-white">{{ selectedItem.status }}</span>
              </div>
              <div class="flex justify-between items-center">
                <span class="text-neutral-500 dark:text-neutral-400">Konsultan Pendamping:</span>
                <span class="font-semibold text-neutral-900 dark:text-white">{{ selectedItem.consultant || 'Belum Ada' }}</span>
              </div>
              <div class="flex justify-between items-center">
                <span class="text-neutral-500 dark:text-neutral-400">Pencatatan Kas Rutin:</span>
                <span class="font-semibold text-emerald-600 dark:text-emerald-400">{{ selectedItem.cashStatus }}</span>
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
  Store01Icon,
  CheckmarkCircle01Icon,
  Award01Icon,
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
  title: 'Data UMKM — Admin Beruang'
})

interface UmkmRecord {
  id: string
  name: string
  owner: string
  sector: 'Kuliner & F&B' | 'Kriya & Tekstil' | 'Agribisnis' | 'Jasa & Retail'
  city: string
  nib: string
  status: 'Siap Didanai' | 'Pendampingan' | 'Perlu Validasi'
  consultant: string | null
  cashStatus: string
}

const daftarUmkmPageRef = ref<HTMLElement | null>(null)
let gsapCtx: gsap.Context | null = null

const searchQuery = ref('')
const selectedSector = ref<'ALL' | 'Kuliner & F&B' | 'Kriya & Tekstil' | 'Agribisnis' | 'Jasa & Retail'>('ALL')
const isFilterDropdownOpen = ref(false)
const selectedItem = ref<UmkmRecord | null>(null)

const currentPage = ref(1)
const pageSize = ref(10)

const sectorTabs = [
  { id: 'ALL' as const, label: 'Semua Sektor', shortLabel: 'Semua' },
  { id: 'Kuliner & F&B' as const, label: 'Kuliner & F&B', shortLabel: 'Kuliner' },
  { id: 'Kriya & Tekstil' as const, label: 'Kriya & Tekstil', shortLabel: 'Kriya' },
  { id: 'Agribisnis' as const, label: 'Agribisnis', shortLabel: 'Agribisnis' },
  { id: 'Jasa & Retail' as const, label: 'Jasa & Retail', shortLabel: 'Retail' }
]

const activeSectorLabel = computed(() => {
  return sectorTabs.find(t => t.id === selectedSector.value)?.label || 'Semua Sektor'
})

const activeSectorShortLabel = computed(() => {
  return sectorTabs.find(t => t.id === selectedSector.value)?.shortLabel || 'Semua'
})

function selectSectorFilter(id: typeof selectedSector.value) {
  selectedSector.value = id
  isFilterDropdownOpen.value = false
}

watch([searchQuery, selectedSector], () => {
  currentPage.value = 1
})

const umkmList = ref<UmkmRecord[]>([
  {
    id: 'u-1',
    name: 'Kopi Kenangan Senja',
    owner: 'Budi Santoso',
    sector: 'Kuliner & F&B',
    city: 'Bandung',
    nib: '9120001234567',
    status: 'Siap Didanai',
    consultant: 'Rendra Pratama, S.E., Ak.',
    cashStatus: 'Aktif 6 Bulan Berturut-turut'
  },
  {
    id: 'u-2',
    name: 'Batik Sekar Jagad',
    owner: 'Siti Lestari',
    sector: 'Kriya & Tekstil',
    city: 'Yogyakarta',
    nib: '9120007890123',
    status: 'Siap Didanai',
    consultant: 'Nadia Kusuma, MBA, CFP',
    cashStatus: 'Aktif 8 Bulan Berturut-turut'
  },
  {
    id: 'u-3',
    name: 'Sayur Hidroponik Segar',
    owner: 'Hendra Wijaya',
    sector: 'Agribisnis',
    city: 'Bogor',
    nib: '9120004561238',
    status: 'Pendampingan',
    consultant: 'Rendra Pratama, S.E., Ak.',
    cashStatus: 'Aktif 4 Bulan'
  },
  {
    id: 'u-4',
    name: 'Roastery Puncak Klasik',
    owner: 'Dimas Anggara',
    sector: 'Kuliner & F&B',
    city: 'Bogor',
    nib: '9120009876543',
    status: 'Perlu Validasi',
    consultant: null,
    cashStatus: 'Perlu Verifikasi'
  },
  {
    id: 'u-5',
    name: 'Tenun Ikat Nusantara',
    owner: 'Maria Fransiska',
    sector: 'Kriya & Tekstil',
    city: 'Kupang',
    nib: '9120003456789',
    status: 'Pendampingan',
    consultant: 'Dr. Hendra Wijaya, M.M.',
    cashStatus: 'Aktif 5 Bulan'
  },
  {
    id: 'u-6',
    name: 'Sambal Bu Rudy Jaya',
    owner: 'Rudi Hartono',
    sector: 'Kuliner & F&B',
    city: 'Surabaya',
    nib: '9120008765432',
    status: 'Siap Didanai',
    consultant: 'Nadia Kusuma, MBA, CFP',
    cashStatus: 'Aktif 9 Bulan'
  },
  {
    id: 'u-7',
    name: 'Madu Hutan Sumbawa',
    owner: 'Fahri Hamzah',
    sector: 'Agribisnis',
    city: 'Sumbawa',
    nib: '9120002345678',
    status: 'Siap Didanai',
    consultant: 'Rendra Pratama, S.E., Ak.',
    cashStatus: 'Aktif 6 Bulan'
  },
  {
    id: 'u-8',
    name: 'Keramik Dinoyo Art',
    owner: 'Anugrah Saputra',
    sector: 'Kriya & Tekstil',
    city: 'Malang',
    nib: '9120006543210',
    status: 'Pendampingan',
    consultant: 'Dr. Hendra Wijaya, M.M.',
    cashStatus: 'Aktif 3 Bulan'
  },
  {
    id: 'u-9',
    name: 'Sepatu Kulit Mandiri',
    owner: 'Taufik Hidayat',
    sector: 'Kriya & Tekstil',
    city: 'Garut',
    nib: '9120005432109',
    status: 'Siap Didanai',
    consultant: 'Nadia Kusuma, MBA, CFP',
    cashStatus: 'Aktif 7 Bulan'
  },
  {
    id: 'u-10',
    name: 'Kripik Tempe Barokah',
    owner: 'Siti Aminah',
    sector: 'Kuliner & F&B',
    city: 'Ngawi',
    nib: '9120004321098',
    status: 'Perlu Validasi',
    consultant: null,
    cashStatus: 'Perlu Verifikasi'
  },
  {
    id: 'u-11',
    name: 'Cokelat Ransiki Papua',
    owner: 'Yohanes Rumkabu',
    sector: 'Agribisnis',
    city: 'Manokwari',
    nib: '9120003210987',
    status: 'Siap Didanai',
    consultant: 'Rendra Pratama, S.E., Ak.',
    cashStatus: 'Aktif 10 Bulan'
  },
  {
    id: 'u-12',
    name: 'Lumbung Beras Organik',
    owner: 'Surono',
    sector: 'Agribisnis',
    city: 'Klaten',
    nib: '9120002109876',
    status: 'Siap Didanai',
    consultant: 'Dr. Hendra Wijaya, M.M.',
    cashStatus: 'Aktif 8 Bulan'
  }
])

const verifiedNibCount = computed(() => umkmList.value.filter(u => Boolean(u.nib)).length)
const readyCount = computed(() => umkmList.value.filter(u => u.status === 'Siap Didanai').length)

const filteredList = computed(() => {
  return umkmList.value.filter((u) => {
    const matchSector = selectedSector.value === 'ALL' || u.sector === selectedSector.value
    const q = searchQuery.value.trim().toLowerCase()
    if (!q) return matchSector
    return (
      matchSector &&
      (u.name.toLowerCase().includes(q) ||
        u.owner.toLowerCase().includes(q) ||
        u.city.toLowerCase().includes(q) ||
        u.nib.includes(q))
    )
  })
})

const paginatedList = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value
  return filteredList.value.slice(start, start + pageSize.value)
})

async function fetchUmkms() {
  try {
    const res = await useApi<any>('/admin/partnerships')
    if (res.data && Array.isArray(res.data) && res.data.length > 0) {
      umkmList.value = res.data.map((item: any) => ({
        id: item.id,
        name: item.name,
        owner: item.owner,
        sector: item.sector,
        city: item.city || 'Bandung',
        nib: item.nib || '9120001234567',
        status: item.readinessStatus === 'READY_FOR_FUNDING' ? 'Siap Didanai' : item.consultant ? 'Pendampingan' : 'Perlu Validasi',
        consultant: item.consultant?.name || null,
        cashStatus: item.readinessStatus === 'READY_FOR_FUNDING' ? 'Aktif 6 Bulan Berturut-turut' : 'Dalam Pendampingan'
      }))
    }
  } catch (err: any) {
    console.warn('Gagal memuat kemitraan UMKM live:', err?.message)
  }
}

onMounted(async () => {
  await fetchUmkms()
  if (!daftarUmkmPageRef.value) return
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
  }, daftarUmkmPageRef.value)
})

onUnmounted(() => {
  gsapCtx?.revert()
})
</script>
