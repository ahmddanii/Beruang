<template>
  <div ref="penugasanPageRef" class="space-y-6 sm:space-y-8 pb-16 font-poppins text-neutral-900 dark:text-neutral-100">
    <!-- 1. Page Title: Identical to UMKM Pages -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 min-h-[44px]">
      <div class="flex items-center gap-2.5 sm:gap-3">
        <HugeiconsIcon :icon="UserAdd01Icon" :size="26" :stroke-width="2.2" class="text-neutral-900 dark:text-white shrink-0" />
        <h1 class="font-poppins font-semibold text-2xl sm:text-3xl text-neutral-900 dark:text-white tracking-tight leading-tight">
          Penugasan Konsultan
        </h1>
      </div>

      <div class="flex items-center gap-2.5 shrink-0 w-full sm:w-auto [&>*]:w-full sm:[&>*]:w-auto">
        <NuxtLink
          to="/admin/umkm"
          class="btn-pill-action justify-center"
        >
          <HugeiconsIcon :icon="Store01Icon" :size="16" :stroke-width="2" />
          <span>Kemitraan</span>
        </NuxtLink>
      </div>
    </div>

    <!-- Toast Success Notification -->
    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="transform -translate-y-2 opacity-0"
      enter-to-class="transform translate-y-0 opacity-100"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="transform translate-y-0 opacity-100"
      leave-to-class="transform -translate-y-2 opacity-0"
    >
      <div
        v-if="assigned"
        class="flex items-center justify-between gap-3 px-4 py-3.5 rounded-[14px] bg-[#E8F8EE] dark:bg-[#00800e]/20 border border-[#86EFAC] dark:border-[#00C058]/30 text-[#00800e] dark:text-[#4ADE80] shadow-none"
      >
        <div class="flex items-center gap-2.5 text-sm font-semibold">
          <HugeiconsIcon :icon="CheckmarkCircle01Icon" :size="18" :stroke-width="2.2" class="shrink-0" />
          <span>Konsultan berhasil ditugaskan dan tautan koordinasi telah dikirim.</span>
        </div>
        <button
          type="button"
          class="text-xs sm:text-sm font-bold hover:underline cursor-pointer"
          @click="assigned = false"
        >
          Tutup
        </button>
      </div>
    </Transition>

    <!-- 2. Active Queue Assignment Container -->
    <section class="gsap-admin-section card-tactile-gopay rounded-[18px] p-6 sm:p-8 space-y-6 font-poppins">
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-neutral-100 dark:border-neutral-800/80">
        <div class="space-y-1.5">
          <h2 class="text-lg sm:text-[21px] font-poppins font-bold text-neutral-900 dark:text-white tracking-tight">
            Antrean Penugasan (1 Usaha)
          </h2>
          <p class="text-xs sm:text-[14px] font-poppins text-neutral-500 dark:text-neutral-400 leading-normal">
            Pasangkan usaha binaan yang baru selesai penilaian awal dengan konsultan pendamping sesuai sektornya.
          </p>
        </div>
        <span class="text-xs sm:text-sm font-medium text-neutral-500 dark:text-neutral-400 shrink-0">
          Penilaian Selesai 8 Jam Lalu
        </span>
      </div>

      <!-- Target UMKM Summary Box -->
      <div class="p-5 rounded-[14px] bg-white dark:bg-[#13161F] border border-[#CBD5E1] dark:border-neutral-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div class="space-y-1">
          <span class="text-xs font-bold text-[#156374] dark:text-[#50AABF] uppercase tracking-wider">
            ID: BERU-STB-09
          </span>
          <h3 class="font-bold text-base sm:text-lg text-neutral-900 dark:text-white">
            Roastery Puncak Klasik
          </h3>
          <span class="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 block">
            Sektor: Kuliner & F&B • Bogor • Pemasukan ~Rp 38.000.000 / bln • 1 Outlet
          </span>
        </div>
        <span class="px-3 py-1 rounded-[8px] text-xs font-semibold bg-amber-50 text-amber-800 dark:bg-amber-950/40 dark:text-amber-300 border border-amber-200 dark:border-amber-800/50 self-start sm:self-auto shrink-0">
          Menunggu Konsultan
        </span>
      </div>

      <!-- Assignment Form -->
      <form class="space-y-5" @submit.prevent="handleAssign">
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label class="block text-xs sm:text-sm font-semibold text-neutral-700 dark:text-neutral-300 mb-2">
              Konsultan Pendamping Sesuai Sektor
            </label>
            <select
              v-model="selectedConsultant"
              class="w-full h-[44px] px-3.5 rounded-[10px] border border-[#CBD5E1] dark:border-neutral-700 bg-white dark:bg-neutral-900 text-sm font-medium text-neutral-900 dark:text-white focus:outline-none focus:border-[#00800e] transition-colors shadow-none"
            >
              <option value="1">Rendra Pratama, S.E., Ak. (Arus Kas & F&B • 2/5 Klien)</option>
              <option value="2">Nadia Kusuma, MBA, CFP (Kriya & Ekspor • 1/5 Klien)</option>
              <option value="3">Dr. Hendra Wijaya, M.M. (Restrukturisasi Kas • 1/5 Klien)</option>
            </select>
          </div>

          <div>
            <label class="block text-xs sm:text-sm font-semibold text-neutral-700 dark:text-neutral-300 mb-2">
              Target Penyusunan Rencana Aksi Awal
            </label>
            <input
              type="text"
              disabled
              value="7 Hari Kerja"
              class="w-full h-[44px] px-3.5 rounded-[10px] border border-[#CBD5E1] dark:border-neutral-700 bg-neutral-100 dark:bg-neutral-800 text-sm font-medium text-neutral-500 cursor-not-allowed shadow-none"
            />
          </div>
        </div>

        <div>
          <label class="block text-xs sm:text-sm font-semibold text-neutral-700 dark:text-neutral-300 mb-2">
            Catatan Pendampingan (Opsional)
          </label>
          <textarea
            v-model="notes"
            rows="2"
            placeholder="Fokuskan pendampingan pada pencatatan biaya bahan baku harian..."
            class="w-full p-3.5 rounded-[10px] border border-[#CBD5E1] dark:border-neutral-700 bg-white dark:bg-neutral-900 text-sm text-neutral-900 dark:text-white placeholder:text-neutral-400 focus:outline-none focus:border-[#00800e] transition-colors shadow-none"
          />
        </div>

        <div class="pt-4 border-t border-neutral-100 dark:border-neutral-800/80 flex justify-end">
          <button
            type="submit"
            :disabled="loading"
            class="btn-pill-action-green"
          >
            <HugeiconsIcon :icon="UserAdd01Icon" :size="16" :stroke-width="2.2" />
            <span>{{ loading ? 'Memproses...' : 'Tugaskan' }}</span>
          </button>
        </div>
      </form>
    </section>

    <!-- 3. Recent Assignments History Table -->
    <section class="gsap-admin-section card-tactile-gopay rounded-[18px] overflow-hidden font-poppins">
      <div class="p-5 sm:p-8 space-y-4 border-b border-[#E2E8F0] dark:border-neutral-800 bg-[#FFFFFF] dark:bg-[#13161F]">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div class="space-y-1.5">
            <h2 class="text-lg sm:text-xl font-poppins font-bold text-neutral-900 dark:text-white tracking-tight">
              Riwayat Penugasan
            </h2>
            <p class="text-xs sm:text-sm font-poppins text-neutral-600 dark:text-neutral-400 leading-normal">
              Daftar penugasan konsultan pendamping yang telah berjalan pada UMKM binaan.
            </p>
          </div>
          <span class="text-xs sm:text-sm font-medium text-neutral-500 tabular-nums shrink-0">{{ filteredHistory.length }} Penugasan Aktif</span>
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

      <div class="overflow-x-auto w-full">
        <table class="w-full text-left text-sm font-poppins">
          <thead>
            <tr class="bg-[#FFFFFF] dark:bg-[#13161F] border-b border-[#E2E8F0] dark:border-neutral-800 text-neutral-800 dark:text-neutral-200 font-poppins text-xs sm:text-sm font-bold uppercase tracking-wider">
              <th class="py-4 sm:py-5 px-6 text-left font-bold">Nama UMKM</th>
              <th class="py-4 sm:py-5 px-5 text-left font-bold">Konsultan Pendamping</th>
              <th class="py-4 sm:py-5 px-5 text-left font-bold">Tanggal</th>
              <th class="py-4 sm:py-5 px-6 text-right font-bold">Status</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-neutral-100 dark:divide-neutral-800/80 text-neutral-800 dark:text-neutral-200 font-poppins">
            <tr
              v-for="item in filteredHistory"
              :key="item.id"
              class="bg-white dark:bg-[#13161F] hover:bg-neutral-50/80 dark:hover:bg-neutral-800/50 transition-colors"
            >
              <td class="py-4 sm:py-5 px-6 font-semibold text-sm text-neutral-900 dark:text-white">
                {{ item.umkmName }}
              </td>
              <td class="py-4 sm:py-5 px-5 text-sm font-medium text-neutral-700 dark:text-neutral-300">
                {{ item.consultantName }}
              </td>
              <td class="py-4 sm:py-5 px-5 text-sm text-neutral-600 dark:text-neutral-400 tabular-nums">
                {{ item.assignedDate }}
              </td>
              <td class="py-4 sm:py-5 px-6 text-right">
                <span
                  :class="[
                    'inline-flex items-center px-2.5 py-1 rounded-[8px] text-xs font-semibold border font-poppins',
                    item.status === 'Siap Didanai'
                      ? 'bg-emerald-50 text-emerald-800 border-emerald-200 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800'
                      : 'bg-cyan-50 text-cyan-800 border-cyan-200 dark:bg-cyan-950/60 dark:text-cyan-300 dark:border-cyan-800'
                  ]"
                >
                  {{ item.status }}
                </span>
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
  UserAdd01Icon,
  Store01Icon,
  CheckmarkCircle01Icon,
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
  title: 'Penugasan Konsultan — Admin Beruang'
})

const penugasanPageRef = ref<HTMLElement | null>(null)
let gsapCtx: gsap.Context | null = null

const selectedConsultant = ref('1')
const notes = ref('')
const loading = ref(false)
const assigned = ref(false)

const searchQuery = ref('')
const selectedStatusFilter = ref<'ALL' | 'Siap Didanai' | 'Pendampingan'>('ALL')
const isFilterDropdownOpen = ref(false)

const statusFilterOptions = [
  { id: 'ALL' as const, label: 'Semua Status', shortLabel: 'Semua' },
  { id: 'Siap Didanai' as const, label: 'Siap Didanai', shortLabel: 'Siap' },
  { id: 'Pendampingan' as const, label: 'Pendampingan', shortLabel: 'Pendampingan' }
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

const assignmentHistory = ref([
  {
    id: 'hist-1',
    umkmName: 'Kopi Kenangan Senja',
    consultantName: 'Rendra Pratama, S.E., Ak.',
    assignedDate: '12 Jan 2026',
    status: 'Siap Didanai' as const
  },
  {
    id: 'hist-2',
    umkmName: 'Batik Sekar Jagad',
    consultantName: 'Nadia Kusuma, MBA, CFP',
    assignedDate: '04 Feb 2026',
    status: 'Siap Didanai' as const
  },
  {
    id: 'hist-3',
    umkmName: 'Sayur Hidroponik Segar',
    consultantName: 'Rendra Pratama, S.E., Ak.',
    assignedDate: '19 Feb 2026',
    status: 'Pendampingan' as const
  }
])

const filteredHistory = computed(() => {
  return assignmentHistory.value.filter((item) => {
    const matchStatus = selectedStatusFilter.value === 'ALL' || item.status === selectedStatusFilter.value
    const q = searchQuery.value.trim().toLowerCase()
    if (!q) return matchStatus
    return (
      matchStatus &&
      (item.umkmName.toLowerCase().includes(q) || item.consultantName.toLowerCase().includes(q))
    )
  })
})

function handleAssign() {
  loading.value = true
  setTimeout(() => {
    loading.value = false
    assigned.value = true
  }, 300)
}

onMounted(() => {
  if (!penugasanPageRef.value) return
  gsapCtx = gsap.context(() => {
    gsap.fromTo(
      '.gsap-admin-section',
      { opacity: 0, y: 16 },
      { opacity: 1, y: 0, duration: 0.45, stagger: 0.08, ease: 'power2.out', clearProps: 'transform' }
    )
  }, penugasanPageRef.value)
})

onUnmounted(() => {
  gsapCtx?.revert()
})
</script>
