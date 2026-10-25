<template>
  <div ref="penugasanPageRef" class="space-y-6 sm:space-y-8 pb-16 font-poppins text-neutral-900 dark:text-neutral-100">
    <!-- 1. Page Title & Action Bar -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 min-h-[44px]">
      <div class="flex items-center gap-2.5 sm:gap-3">
        <HugeiconsIcon :icon="UserGroupIcon" :size="26" :stroke-width="2.2" class="text-neutral-900 dark:text-white shrink-0" />
        <h1 class="font-poppins font-semibold text-2xl sm:text-3xl text-neutral-900 dark:text-white tracking-tight leading-tight">
          Konsultan
        </h1>
      </div>

      <div class="flex items-center gap-2.5 shrink-0 w-full sm:w-auto [&>*]:w-full sm:[&>*]:w-auto">
        <NuxtLink
          to="/admin/umkm"
          class="btn-pill-action justify-center"
        >
          <HugeiconsIcon :icon="Store01Icon" :size="16" :stroke-width="2" />
          <span>Kemitraan UMKM</span>
        </NuxtLink>
      </div>
    </div>

    <!-- 2. 3 Summary Cards (Identical .stat-card-clean Typography & Geometry to UMKM & Other Admin Pages) -->
    <div class="grid grid-cols-1 sm:grid-cols-3 gap-6 lg:gap-8 items-stretch w-full">
      <!-- Card 1: Total Konsultan -->
      <div class="gsap-admin-card gsap-stat-card flex-1 w-full">
        <div class="stat-card-clean transition-all duration-200">
          <div class="flex items-center justify-between w-full gap-2">
            <div class="flex items-center gap-2 sm:gap-2.5 min-w-0">
              <div class="stat-card-icon-box">
                <HugeiconsIcon :icon="Briefcase01Icon" :size="17" :stroke-width="2.0" class="text-[#156374] dark:text-[#50AABF] shrink-0" />
              </div>
              <span class="text-[13px] xl:text-[14px] font-poppins font-semibold text-neutral-800 dark:text-neutral-100 capitalize truncate tracking-[-0.01em]">
                Total Konsultan
              </span>
            </div>
            <div class="stat-card-badge badge-green">
              <span>BNSP</span>
            </div>
          </div>
          <div class="my-auto py-2.5 sm:py-3.5">
            <span class="text-xl sm:text-[22px] lg:text-[21px] xl:text-[24px] font-poppins font-semibold text-neutral-900 dark:text-white tabular-nums tracking-[-0.02em] whitespace-nowrap block leading-tight">
              {{ totalConsultantsCount }} Profesional
            </span>
          </div>
        </div>
      </div>

      <!-- Card 2: UMKM Didampingi -->
      <div class="gsap-admin-card gsap-stat-card flex-1 w-full">
        <div class="stat-card-clean transition-all duration-200">
          <div class="flex items-center justify-between w-full gap-2">
            <div class="flex items-center gap-2 sm:gap-2.5 min-w-0">
              <div class="stat-card-icon-box">
                <HugeiconsIcon :icon="UserCheck01Icon" :size="17" :stroke-width="2.0" class="text-[#156374] dark:text-[#50AABF] shrink-0" />
              </div>
              <span class="text-[13px] xl:text-[14px] font-poppins font-semibold text-neutral-800 dark:text-neutral-100 capitalize truncate tracking-[-0.01em]">
                UMKM Didampingi
              </span>
            </div>
            <div class="stat-card-badge badge-green">
              <span>{{ assignmentHistory.length ? Math.round((assistedCount / assignmentHistory.length) * 100) : 0 }}% Aktif</span>
            </div>
          </div>
          <div class="my-auto py-2.5 sm:py-3.5">
            <span class="text-xl sm:text-[22px] lg:text-[21px] xl:text-[24px] font-poppins font-semibold text-neutral-900 dark:text-white tabular-nums tracking-[-0.02em] whitespace-nowrap block leading-tight">
              {{ assistedCount }} / {{ assignmentHistory.length }} Usaha
            </span>
          </div>
        </div>
      </div>

      <!-- Card 3: Meninjau Konsultan -->
      <div class="gsap-admin-card gsap-stat-card flex-1 w-full">
        <div class="stat-card-clean transition-all duration-200">
          <div class="flex items-center justify-between w-full gap-2">
            <div class="flex items-center gap-2 sm:gap-2.5 min-w-0">
              <div class="stat-card-icon-box">
                <HugeiconsIcon :icon="Store01Icon" :size="17" :stroke-width="2.0" class="text-[#156374] dark:text-[#50AABF] shrink-0" />
              </div>
              <span class="text-[13px] xl:text-[14px] font-poppins font-semibold text-neutral-800 dark:text-neutral-100 capitalize truncate tracking-[-0.01em]">
                Meninjau Konsultan
              </span>
            </div>
            <div class="stat-card-badge badge-neutral">
              <span>Mandiri</span>
            </div>
          </div>
          <div class="my-auto py-2.5 sm:py-3.5">
            <span class="text-xl sm:text-[22px] lg:text-[21px] xl:text-[24px] font-poppins font-semibold text-neutral-900 dark:text-white tabular-nums tracking-[-0.02em] whitespace-nowrap block leading-tight">
              {{ reviewingCount }} Usaha
            </span>
          </div>
        </div>
      </div>
    </div>

    <!-- 3. Main Directory Container: Table of Consultant & UMKM Mentorship -->
    <section class="gsap-admin-section card-tactile-gopay rounded-[18px] overflow-hidden font-poppins">
      <div class="p-5 sm:p-8 space-y-4 border-b border-[#E2E8F0] dark:border-neutral-800 bg-[#FFFFFF] dark:bg-[#13161F]">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div class="space-y-1.5">
            <h2 class="text-lg sm:text-xl font-poppins font-bold text-neutral-900 dark:text-white tracking-tight">
              Daftar Konsultan & Pendampingan UMKM
            </h2>
            <p class="text-xs sm:text-sm font-poppins text-neutral-600 dark:text-neutral-400 leading-normal">
              Pantau seluruh usaha binaan beserta konsultan pendamping yang dipilih secara mandiri.
            </p>
          </div>
          <span class="text-xs sm:text-sm font-medium text-neutral-500 tabular-nums shrink-0">
            {{ filteredHistory.length }} Relasi Terpantau
          </span>
        </div>

        <!-- Joined Search & Filter Control Bar (Identik dengan Catatan Kas & Kemitraan UMKM) -->
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
              aria-label="Cari UMKM atau konsultan pendamping"
              placeholder="Cari UMKM atau konsultan pendamping..."
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
              title="Filter Status Pendampingan"
              @click="isFilterDropdownOpen = !isFilterDropdownOpen"
            >
              <HugeiconsIcon :icon="FilterHorizontalIcon" :size="14" :stroke-width="2" class="text-neutral-500 dark:text-neutral-400 shrink-0" />
              <span class="hidden sm:inline truncate">{{ activeStatusLabel }}</span>
              <span class="sm:hidden truncate text-xs">{{ activeStatusShortLabel }}</span>
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
                  v-for="opt in statusFilterOptions"
                  :key="opt.id"
                  type="button"
                  :class="[
                    'w-full flex items-center justify-between px-3 py-2 rounded-[8px] text-sm font-poppins transition-all duration-150 text-left cursor-pointer',
                    selectedStatusFilter === opt.id
                      ? 'bg-[#E6F4F7] hover:bg-[#D9EEF3] dark:bg-[#156374]/20 dark:hover:bg-[#156374]/30 text-[#156374] dark:text-[#50AABF] font-semibold border border-[#156374]/20 dark:border-[#50AABF]/25'
                      : 'text-[#475569] dark:text-neutral-300 font-medium hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100/80 dark:hover:bg-neutral-800/60 border border-transparent'
                  ]"
                  @click="selectStatusFilter(opt.id)"
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
              <th class="py-4 sm:py-5 px-6 text-left font-bold">PROFIL UMKM</th>
              <th class="py-4 sm:py-5 px-5 text-left font-bold">KONSULTAN PILIHAN</th>
              <th class="py-4 sm:py-5 px-5 text-left font-bold">TANGGAL PEMILIHAN</th>
              <th class="py-4 sm:py-5 px-5 text-left font-bold">STATUS PENDAMPINGAN</th>
              <th class="py-4 sm:py-5 px-6 text-right font-bold">AKSI</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-neutral-100 dark:divide-neutral-800/80 text-neutral-800 dark:text-neutral-200 font-poppins">
            <tr
              v-for="item in filteredHistory"
              :key="item.id"
              class="bg-white dark:bg-[#13161F] hover:bg-neutral-50/80 dark:hover:bg-neutral-800/50 transition-colors"
            >
              <!-- UMKM -->
              <td class="py-4 sm:py-5 px-6 text-left">
                <div class="flex items-center gap-3.5">
                  <div class="w-10 h-10 rounded-full bg-[#E6F4F7] dark:bg-[#156374]/25 border border-[#156374]/20 flex items-center justify-center text-sm font-semibold text-[#156374] dark:text-[#50AABF] shrink-0">
                    {{ getInitials(item.umkmName) }}
                  </div>
                  <div class="min-w-0">
                    <p class="font-semibold text-sm text-neutral-900 dark:text-white truncate">
                      {{ item.umkmName }}
                    </p>
                    <p class="text-xs font-medium text-neutral-600 dark:text-neutral-400 truncate mt-0.5">
                      {{ item.owner }} • {{ item.sector }} ({{ item.city }})
                    </p>
                  </div>
                </div>
              </td>

              <!-- Konsultan Pilihan UMKM -->
              <td class="py-4 sm:py-5 px-5 text-left">
                <div v-if="item.consultantName">
                  <p class="text-sm font-medium text-neutral-900 dark:text-white">
                    {{ item.consultantName }}
                  </p>
                  <p class="text-xs font-medium text-neutral-600 dark:text-neutral-400 mt-0.5">
                    {{ item.consultantSpecialty }}
                  </p>
                </div>
                <div v-else>
                  <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-[8px] text-xs font-semibold bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800/50">
                    <HugeiconsIcon :icon="Alert01Icon" :size="14" :stroke-width="2.2" />
                    Belum Memilih Konsultan
                  </span>
                </div>
              </td>

              <!-- Tanggal Pemilihan Mandiri -->
              <td class="py-4 sm:py-5 px-5 text-sm text-neutral-600 dark:text-neutral-400 tabular-nums">
                {{ item.assignedDate || '—' }}
              </td>

              <!-- Status Pendampingan -->
              <td class="py-4 sm:py-5 px-5 text-left whitespace-nowrap">
                <span
                  :class="[
                    'inline-flex items-center px-2.5 py-1 rounded-[8px] text-xs font-semibold border font-poppins',
                    item.status === 'Siap Didanai'
                      ? 'bg-emerald-50 text-emerald-800 border-emerald-200 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800'
                      : item.status === 'Sedang Didampingi'
                      ? 'bg-cyan-50 text-cyan-800 border-cyan-200 dark:bg-cyan-950/60 dark:text-cyan-300 dark:border-cyan-800'
                      : 'bg-amber-50 text-amber-800 border-amber-200 dark:bg-amber-950/60 dark:text-amber-300 dark:border-amber-800'
                  ]"
                >
                  {{ item.status }}
                </span>
              </td>

              <!-- Aksi: Detail Button -->
              <td class="py-4 sm:py-5 px-6 text-right whitespace-nowrap">
                <button
                  type="button"
                  class="btn-pill-action"
                  @click="openDetailModal(item)"
                >
                  <span>Detail</span>
                  <HugeiconsIcon :icon="ArrowRight01Icon" :size="16" :stroke-width="2" />
                </button>
              </td>
            </tr>

            <tr v-if="filteredHistory.length === 0">
              <td colspan="5" class="py-12 text-center text-sm text-neutral-500 dark:text-neutral-400">
                Tidak ditemukan relasi pendampingan yang sesuai dengan pencarian.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <!-- Modal Detail Relasi Pendampingan -->
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
          v-if="selectedRelation"
          class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs font-poppins"
          @click.self="selectedRelation = null"
        >
          <div class="w-full max-w-xl rounded-[18px] bg-[#FFFFFF] dark:bg-[#13161F] border border-[#CBD5E1] dark:border-neutral-800 p-6 sm:p-7 shadow-none space-y-5">
            <!-- Modal Header -->
            <div class="flex items-start justify-between gap-3 border-b border-neutral-100 dark:border-neutral-800 pb-4">
              <div class="flex items-center gap-3.5">
                <div class="w-11 h-11 rounded-[12px] bg-[#E6F4F7] dark:bg-[#156374]/25 border border-[#156374]/20 flex items-center justify-center text-[#156374] dark:text-[#50AABF] shrink-0">
                  <HugeiconsIcon :icon="UserGroupIcon" :size="22" :stroke-width="2.2" />
                </div>
                <div>
                  <h3 class="text-base sm:text-lg font-bold text-neutral-900 dark:text-white">
                    Pemantauan Relasi Bimbingan
                  </h3>
                  <p class="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400">
                    {{ selectedRelation.umkmName }} • {{ selectedRelation.sector }}
                  </p>
                </div>
              </div>
              <button
                type="button"
                class="w-9 h-9 rounded-full bg-white dark:bg-neutral-800 border border-[#CBD5E1] dark:border-neutral-700 flex items-center justify-center text-neutral-500 hover:text-neutral-900 dark:hover:text-white cursor-pointer shadow-none"
                @click="selectedRelation = null"
              >
                <HugeiconsIcon :icon="Cancel01Icon" :size="16" :stroke-width="2.2" />
              </button>
            </div>

            <!-- Detail Info 1: Profil UMKM -->
            <div class="p-4 rounded-[12px] bg-neutral-50/70 dark:bg-neutral-900 border border-[#CBD5E1] dark:border-neutral-800 space-y-1.5">
              <span class="text-xs font-bold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider block">
                Usaha Binaan
              </span>
              <p class="text-sm font-bold text-neutral-900 dark:text-white">
                {{ selectedRelation.umkmName }} (Pemilik: {{ selectedRelation.owner }})
              </p>
              <p class="text-xs text-neutral-500 dark:text-neutral-400">
                Lokasi: {{ selectedRelation.city }} • Pemasukan Rata-rata: ~{{ selectedRelation.monthlyRevenue }}
              </p>
            </div>

            <!-- Detail Info 2: Konsultan Pilihan -->
            <div class="p-4 rounded-[12px] bg-neutral-50/70 dark:bg-neutral-900 border border-[#CBD5E1] dark:border-neutral-800 space-y-2">
              <div class="flex items-center justify-between">
                <span class="text-xs font-bold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
                  Konsultan Pilihan UMKM
                </span>
                <span
                  v-if="selectedRelation.consultantName"
                  class="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#E8F8EE] dark:bg-[#00800e]/20 text-[#00800e] dark:text-[#4ADE80]"
                >
                  Dipilih Mandiri oleh UMKM
                </span>
                <span
                  v-else
                  class="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300"
                >
                  Menunggu Pilihan UMKM
                </span>
              </div>
              <div v-if="selectedRelation.consultantName">
                <p class="text-sm font-bold text-neutral-900 dark:text-white">
                  {{ selectedRelation.consultantName }}
                </p>
                <p class="text-xs text-[#156374] dark:text-[#50AABF] font-medium mt-0.5">
                  Spesialisasi: {{ selectedRelation.consultantSpecialty }}
                </p>
                <p class="text-xs text-neutral-500 dark:text-neutral-400 mt-2">
                  Fokus Bimbingan: {{ selectedRelation.focusArea || 'Pencatatan kas berkala dan pemisahan akun operasional usaha.' }}
                </p>
              </div>
              <p v-else class="text-xs text-neutral-500 dark:text-neutral-400">
                Pelaku UMKM sedang mengevaluasi daftar konsultan terkurasi pada aplikasi mereka.
              </p>
            </div>

            <!-- Detail Info 3: Catatan Pemantauan -->
            <div class="p-4 rounded-[12px] border border-dashed border-[#CBD5E1] dark:border-neutral-700 bg-white dark:bg-[#13161F] text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
              💡 <strong>Catatan Admin:</strong> Hubungan pendampingan ini dibentuk atas persetujuan kedua belah pihak. Admin berperan sebagai fasilitator integritas data dan pemantau kepatuhan tata kelola kas UMKM.
            </div>

            <!-- Modal Footer -->
            <div class="flex justify-end pt-2">
              <button
                type="button"
                class="btn-pill-action"
                @click="selectedRelation = null"
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
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { gsap } from 'gsap'
import { HugeiconsIcon } from '@hugeicons/vue'
import {
  UserGroupIcon,
  Store01Icon,
  Briefcase01Icon,
  Search01Icon,
  FilterHorizontalIcon,
  ArrowDown01Icon,
  ArrowRight01Icon,
  Cancel01Icon,
  UserCheck01Icon,
  Alert01Icon
} from '@hugeicons/core-free-icons'

definePageMeta({
  layout: 'dashboard',
  hideHeader: true
})

useHead({
  title: 'Konsultan — Admin Beruang'
})

const penugasanPageRef = ref<HTMLElement | null>(null)
let gsapCtx: gsap.Context | null = null

const searchQuery = ref('')
const selectedStatusFilter = ref<'ALL' | 'Siap Didanai' | 'Sedang Didampingi' | 'Meninjau Konsultan'>('ALL')
const isFilterDropdownOpen = ref(false)
const selectedRelation = ref<any | null>(null)

const statusFilterOptions = [
  { id: 'ALL' as const, label: 'Semua Status', shortLabel: 'Semua' },
  { id: 'Siap Didanai' as const, label: 'Siap Didanai', shortLabel: 'Siap' },
  { id: 'Sedang Didampingi' as const, label: 'Sedang Didampingi', shortLabel: 'Didampingi' },
  { id: 'Meninjau Konsultan' as const, label: 'Meninjau Konsultan', shortLabel: 'Meninjau' }
]

const activeStatusLabel = computed(() => {
  return statusFilterOptions.find(t => t.id === selectedStatusFilter.value)?.label || 'Semua Status'
})

const activeStatusShortLabel = computed(() => {
  return statusFilterOptions.find(t => t.id === selectedStatusFilter.value)?.shortLabel || 'Semua'
})

function selectStatusFilter(id: typeof selectedStatusFilter.value) {
  selectedStatusFilter.value = id
  isFilterDropdownOpen.value = false
}

// Data pemantauan pendampingan aktif
const assignmentHistory = ref([
  {
    id: 'rel-1',
    umkmName: 'Kopi Kenangan Senja',
    owner: 'Budi Santoso',
    sector: 'Kuliner & F&B',
    city: 'Bandung',
    monthlyRevenue: 'Rp 65.000.000',
    consultantName: 'Rendra Pratama, S.E., Ak.',
    consultantSpecialty: 'Arus Kas & Pajak',
    assignedDate: '12 Jan 2026',
    status: 'Siap Didanai' as const,
    focusArea: 'Penyusunan laporan arus kas bulanan terverifikasi dan pembukuan bahan baku.'
  },
  {
    id: 'rel-2',
    umkmName: 'Batik Sekar Jagad',
    owner: 'Siti Lestari',
    sector: 'Kriya & Tekstil',
    city: 'Yogyakarta',
    monthlyRevenue: 'Rp 82.000.000',
    consultantName: 'Nadia Kusuma, MBA, CFP',
    consultantSpecialty: 'Kesiapan Ekspor',
    assignedDate: '04 Feb 2026',
    status: 'Siap Didanai' as const,
    focusArea: 'Tata kelola persediaan kain malam dan kesiapan dokumen sertifikasi usaha.'
  },
  {
    id: 'rel-3',
    umkmName: 'Sayur Hidroponik Segar',
    owner: 'Hendra Wijaya',
    sector: 'Agribisnis',
    city: 'Bogor',
    monthlyRevenue: 'Rp 45.000.000',
    consultantName: 'Rendra Pratama, S.E., Ak.',
    consultantSpecialty: 'Rantai Pasok Agribisnis',
    assignedDate: '19 Feb 2026',
    status: 'Sedang Didampingi' as const,
    focusArea: 'Pencatatan kas siklus panen dan efisiensi biaya logistik distribusi sayur.'
  },
  {
    id: 'rel-4',
    umkmName: 'Tenun Ikat Nusantara',
    owner: 'Maria Fransiska',
    sector: 'Kriya & Tekstil',
    city: 'Kupang',
    monthlyRevenue: 'Rp 52.000.000',
    consultantName: 'Dr. Hendra Wijaya, M.M.',
    consultantSpecialty: 'Restrukturisasi Kas',
    assignedDate: '28 Feb 2026',
    status: 'Sedang Didampingi' as const,
    focusArea: 'Pemisahan kas keluarga dari modal kerja perajin tenun rumahan.'
  },
  {
    id: 'rel-5',
    umkmName: 'Roastery Puncak Klasik',
    owner: 'Dimas Anggara',
    sector: 'Kuliner & F&B',
    city: 'Bogor',
    monthlyRevenue: 'Rp 38.000.000',
    consultantName: '',
    consultantSpecialty: '',
    assignedDate: '',
    status: 'Meninjau Konsultan' as const,
    focusArea: 'Pelaku UMKM sedang meninjau profil 3 konsultan spesialis F&B.'
  }
])

const totalConsultantsCount = computed(() => {
  const set = new Set(assignmentHistory.value.map(a => a.consultantName).filter(Boolean))
  return Math.max(set.size, 1)
})

const assistedCount = computed(() => assignmentHistory.value.filter(a => a.consultantName).length)
const reviewingCount = computed(() => assignmentHistory.value.filter(a => !a.consultantName).length)

const filteredHistory = computed(() => {
  return assignmentHistory.value.filter((item) => {
    const matchStatus = selectedStatusFilter.value === 'ALL' || item.status === selectedStatusFilter.value
    const q = searchQuery.value.trim().toLowerCase()
    if (!q) return matchStatus
    return (
      matchStatus &&
      (item.umkmName.toLowerCase().includes(q) ||
        item.owner.toLowerCase().includes(q) ||
        item.consultantName.toLowerCase().includes(q))
    )
  })
})

function getInitials(name: string): string {
  if (!name) return 'U'
  const parts = name.trim().split(/\s+/)
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase()
  return (parts[0][0] + parts[1][0]).toUpperCase()
}

function openDetailModal(item: any) {
  selectedRelation.value = item
}

async function fetchAssignmentData() {
  try {
    const res = await useApi<any>('/admin/partnerships')
    if (res.data && Array.isArray(res.data) && res.data.length > 0) {
      assignmentHistory.value = res.data.map((item: any) => ({
        id: item.id,
        umkmName: item.name,
        owner: item.owner,
        sector: item.sector,
        city: item.city || 'Bandung',
        monthlyRevenue: 'Rp 45.000.000',
        consultantName: item.consultant?.name || '',
        consultantSpecialty: item.consultant?.specialty || 'Standardisasi Finansial',
        assignedDate: item.consultant?.since || '',
        status: item.readinessStatus === 'READY_FOR_FUNDING' ? 'Siap Didanai' : item.consultant ? 'Sedang Didampingi' : 'Meninjau Konsultan',
        focusArea: item.consultant ? `Didampingi dalam audit kas dan standar operasional oleh ${item.consultant.name}.` : 'Menunggu penetapan konsultan pendamping resmi.'
      }))
    }
  } catch (err: any) {
    console.warn('Gagal memuat penugasan live:', err?.message)
  }
}

onMounted(async () => {
  await fetchAssignmentData()
  if (!penugasanPageRef.value) return
  gsapCtx = gsap.context(() => {
    gsap.fromTo(
      '.gsap-admin-card',
      { opacity: 0, y: 14 },
      { opacity: 1, y: 0, duration: 0.45, stagger: 0.06, ease: 'power2.out', clearProps: 'transform' }
    )
    gsap.fromTo(
      '.gsap-admin-section',
      { opacity: 0, y: 16 },
      { opacity: 1, y: 0, duration: 0.45, stagger: 0.08, ease: 'power2.out', delay: 0.1, clearProps: 'transform' }
    )
  }, penugasanPageRef.value)
})

onUnmounted(() => {
  gsapCtx?.revert()
})
</script>
