<template>
  <div ref="sertifikasiPageRef" class="space-y-6 sm:space-y-8 pb-16 font-poppins text-neutral-900 dark:text-neutral-100">
    <!-- 1. Page Title & Action Bar -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 min-h-[44px]">
      <div class="flex items-center gap-2.5 sm:gap-3">
        <HugeiconsIcon :icon="Award01Icon" :size="26" :stroke-width="2.2" class="text-neutral-900 dark:text-white shrink-0" />
        <h1 class="font-poppins font-semibold text-2xl sm:text-3xl text-neutral-900 dark:text-white tracking-tight leading-tight">
          Sertifikasi Usaha
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

    <!-- Toast Notification -->
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

    <!-- 2. 3 Summary Cards -->
    <div class="grid grid-cols-1 sm:grid-cols-3 gap-6 lg:gap-8 items-stretch w-full">
      <!-- Card 1: Antrean Sertifikasi -->
      <div class="gsap-admin-card gsap-stat-card flex-1 w-full">
        <div class="stat-card-clean transition-all duration-200">
          <div class="flex items-center justify-between w-full gap-2">
            <div class="flex items-center gap-2 sm:gap-2.5 min-w-0">
              <div class="stat-card-icon-box">
                <HugeiconsIcon :icon="AnalyticsUpIcon" :size="17" :stroke-width="2.0" class="text-[#156374] dark:text-[#50AABF] shrink-0" />
              </div>
              <span class="text-[13px] xl:text-[14px] font-poppins font-semibold text-neutral-800 dark:text-neutral-100 capitalize truncate tracking-[-0.01em]">
                Antrean Sertifikasi
              </span>
            </div>
            <div class="stat-card-badge badge-green">
              <span>Rekomendasi</span>
            </div>
          </div>
          <div class="my-auto py-2.5 sm:py-3.5">
            <span class="text-xl sm:text-[22px] lg:text-[21px] xl:text-[24px] font-poppins font-semibold text-neutral-900 dark:text-white tabular-nums tracking-[-0.02em] whitespace-nowrap block leading-tight">
              {{ pendingCount }} Usaha
            </span>
          </div>
        </div>
      </div>

      <!-- Card 2: Lulus Sertifikasi -->
      <div class="gsap-admin-card gsap-stat-card flex-1 w-full">
        <div class="stat-card-clean transition-all duration-200">
          <div class="flex items-center justify-between w-full gap-2">
            <div class="flex items-center gap-2 sm:gap-2.5 min-w-0">
              <div class="stat-card-icon-box">
                <HugeiconsIcon :icon="Award01Icon" :size="17" :stroke-width="2.0" class="text-[#156374] dark:text-[#50AABF] shrink-0" />
              </div>
              <span class="text-[13px] xl:text-[14px] font-poppins font-semibold text-neutral-800 dark:text-neutral-100 capitalize truncate tracking-[-0.01em]">
                Lulus Sertifikasi
              </span>
            </div>
            <div class="stat-card-badge badge-green">
              <span>Siap Didanai</span>
            </div>
          </div>
          <div class="my-auto py-2.5 sm:py-3.5">
            <span class="text-xl sm:text-[22px] lg:text-[21px] xl:text-[24px] font-poppins font-semibold text-neutral-900 dark:text-white tabular-nums tracking-[-0.02em] whitespace-nowrap block leading-tight">
              {{ approvedCount }} Usaha
            </span>
          </div>
        </div>
      </div>

      <!-- Card 3: Ambang Skor Lulus -->
      <div class="gsap-admin-card gsap-stat-card flex-1 w-full">
        <div class="stat-card-clean transition-all duration-200">
          <div class="flex items-center justify-between w-full gap-2">
            <div class="flex items-center gap-2 sm:gap-2.5 min-w-0">
              <div class="stat-card-icon-box">
                <HugeiconsIcon :icon="Shield01Icon" :size="17" :stroke-width="2.0" class="text-[#156374] dark:text-[#50AABF] shrink-0" />
              </div>
              <span class="text-[13px] xl:text-[14px] font-poppins font-semibold text-neutral-800 dark:text-neutral-100 capitalize truncate tracking-[-0.01em]">
                Ambang Kelulusan
              </span>
            </div>
            <div class="stat-card-badge badge-green">
              <span>5 Pilar</span>
            </div>
          </div>
          <div class="my-auto py-2.5 sm:py-3.5">
            <span class="text-xl sm:text-[22px] lg:text-[21px] xl:text-[24px] font-poppins font-semibold text-neutral-900 dark:text-white tabular-nums tracking-[-0.02em] whitespace-nowrap block leading-tight">
              ≥ 75 Poin
            </span>
          </div>
        </div>
      </div>
    </div>

    <!-- 3. Certification Table Container -->
    <section class="gsap-admin-section card-tactile-gopay rounded-[18px] overflow-hidden font-poppins">
      <div class="p-5 sm:p-8 space-y-4 border-b border-[#E2E8F0] dark:border-neutral-800 bg-[#FFFFFF] dark:bg-[#13161F]">
        <div class="space-y-1.5">
          <h2 class="text-lg sm:text-xl font-poppins font-bold text-neutral-900 dark:text-white tracking-tight">
            Daftar Pengajuan Sertifikasi Kesiapan Pendanaan
          </h2>
          <p class="text-xs sm:text-sm font-poppins text-neutral-600 dark:text-neutral-400 leading-normal">
            Pantau sertifikasi kesiapan pendanaan UMKM yang ditinjau konsultan dan kelengkapan mutasi rekening.
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
              aria-label="Cari UMKM atau konsultan peninjau"
              placeholder="Cari UMKM, pemilik, konsultan peninjau..."
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
              title="Filter Status Sertifikasi"
              @click="isFilterDropdownOpen = !isFilterDropdownOpen"
            >
              <HugeiconsIcon :icon="FilterHorizontalIcon" :size="14" :stroke-width="2" class="text-neutral-500 dark:text-neutral-400 shrink-0" />
              <span class="hidden sm:inline truncate">{{ activeFilterLabel }}</span>
              <span class="sm:hidden truncate text-xs">{{ activeFilterShortLabel }}</span>
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
                  v-for="opt in filterTabs"
                  :key="opt.id"
                  type="button"
                  :class="[
                    'w-full flex items-center justify-between px-3 py-2 rounded-[8px] text-sm font-poppins transition-all duration-150 text-left cursor-pointer',
                    activeFilter === opt.id
                      ? 'bg-[#E6F4F7] hover:bg-[#D9EEF3] dark:bg-[#156374]/20 dark:hover:bg-[#156374]/30 text-[#156374] dark:text-[#50AABF] font-semibold border border-[#156374]/20 dark:border-[#50AABF]/25'
                      : 'text-[#475569] dark:text-neutral-300 font-medium hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100/80 dark:hover:bg-neutral-800/60 border border-transparent'
                  ]"
                  @click="selectFilter(opt.id)"
                >
                  <span>{{ opt.label }}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Table: Simple, Clean, No Scores / No Grades -->
      <div class="overflow-x-auto w-full">
        <table class="w-full text-left text-sm font-poppins">
          <thead>
            <tr class="bg-[#FFFFFF] dark:bg-[#13161F] border-b border-[#E2E8F0] dark:border-neutral-800 text-neutral-800 dark:text-neutral-200 font-poppins text-xs sm:text-sm font-bold uppercase tracking-wider">
              <th class="py-4 sm:py-5 px-6 text-left font-bold">Usaha &amp; Pemilik</th>
              <th class="py-4 sm:py-5 px-5 text-left font-bold">Konsultan Peninjau</th>
              <th class="py-4 sm:py-5 px-5 text-left font-bold">Bukti Mutasi</th>
              <th class="py-4 sm:py-5 px-5 text-left font-bold">Status</th>
              <th class="py-4 sm:py-5 px-6 text-right font-bold">Aksi</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-neutral-100 dark:divide-neutral-800/80 text-neutral-800 dark:text-neutral-200 font-poppins">
            <tr
              v-for="item in paginatedSubmissions"
              :key="item.id"
              class="bg-white dark:bg-[#13161F] hover:bg-neutral-50/80 dark:hover:bg-neutral-800/50 transition-colors"
            >
              <td class="py-4 sm:py-5 px-6 text-left">
                <p class="text-sm font-semibold text-neutral-900 dark:text-white">{{ item.umkmName }}</p>
                <p class="text-xs font-medium text-neutral-600 dark:text-neutral-400 mt-0.5">{{ item.owner }} • {{ item.sector }}</p>
              </td>
              <td class="py-4 sm:py-5 px-5 text-left">
                <p class="text-sm font-medium text-neutral-900 dark:text-white">{{ item.consultantName }}</p>
                <p class="text-xs font-medium text-neutral-600 dark:text-neutral-400 mt-0.5">Ditinjau {{ item.submittedAt }}</p>
              </td>
              <td class="py-4 sm:py-5 px-5 text-left whitespace-nowrap">
                <span class="text-sm font-medium text-neutral-700 dark:text-neutral-300">{{ item.bankMutation }}</span>
              </td>
              <td class="py-4 sm:py-5 px-5 text-left whitespace-nowrap">
                <span
                  :class="[
                    'inline-flex items-center px-2.5 py-1 rounded-[8px] text-xs font-semibold border font-poppins',
                    item.status === 'Disahkan'
                      ? 'bg-emerald-50 text-emerald-800 border-emerald-200 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800'
                      : item.status === 'Menunggu'
                        ? 'bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 border-amber-200 dark:border-amber-800/50'
                        : 'bg-red-50 dark:bg-red-950/40 text-red-700 dark:text-red-300 border-red-200 dark:border-red-800/50'
                  ]"
                >
                  {{ item.status }}
                </span>
              </td>
              <td class="py-4 sm:py-5 px-6 text-right whitespace-nowrap">
                <button
                  type="button"
                  class="btn-pill-action"
                  @click="selectedSubmission = item"
                >
                  <span>Detail</span>
                  <HugeiconsIcon :icon="ArrowRight01Icon" :size="16" :stroke-width="2" />
                </button>
              </td>
            </tr>

            <tr v-if="filteredSubmissions.length === 0">
              <td colspan="5" class="py-12 text-center text-sm text-neutral-500 dark:text-neutral-400">
                Tidak ditemukan pengajuan sertifikasi yang sesuai dengan pencarian.
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Pagination -->
      <BPagination
        v-model:currentPage="currentPage"
        :totalItems="filteredSubmissions.length"
        :pageSize="pageSize"
        itemLabel="pengajuan"
      />
    </section>

    <!-- Modal Detail Sertifikasi -->
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
          v-if="selectedSubmission"
          class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs font-poppins"
          @click.self="selectedSubmission = null"
        >
          <div class="w-full max-w-lg rounded-[18px] bg-[#FFFFFF] dark:bg-[#13161F] border border-[#CBD5E1] dark:border-neutral-800 p-6 sm:p-7 shadow-none space-y-5">
            <div class="flex items-start justify-between gap-3 border-b border-neutral-100 dark:border-neutral-800 pb-4">
              <div>
                <h3 class="text-base sm:text-lg font-bold text-neutral-900 dark:text-white">{{ selectedSubmission.umkmName }}</h3>
                <p class="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400">
                  Ditinjau oleh {{ selectedSubmission.consultantName }}
                </p>
              </div>
              <button
                type="button"
                class="w-9 h-9 rounded-full bg-white dark:bg-neutral-800 border border-[#CBD5E1] dark:border-neutral-700 flex items-center justify-center text-neutral-500 hover:text-neutral-900 dark:hover:text-white cursor-pointer shadow-none"
                @click="selectedSubmission = null"
              >
                <HugeiconsIcon :icon="Cancel01Icon" :size="16" :stroke-width="2.2" />
              </button>
            </div>

            <div class="p-4 sm:p-5 rounded-[14px] bg-neutral-50/70 dark:bg-neutral-900 border border-[#CBD5E1] dark:border-neutral-800 space-y-3 text-sm">
              <div class="flex items-center justify-between">
                <span class="text-neutral-500 dark:text-neutral-400">Status Peninjauan Konsultan</span>
                <span class="font-semibold text-neutral-900 dark:text-white">{{ selectedSubmission.status }}</span>
              </div>
              <div class="flex items-center justify-between">
                <span class="text-neutral-500 dark:text-neutral-400">Verifikasi Mutasi Rekening</span>
                <span class="font-semibold text-neutral-900 dark:text-white">{{ selectedSubmission.bankMutation }}</span>
              </div>
              <div class="flex items-center justify-between gap-4">
                <span class="text-neutral-500 dark:text-neutral-400 shrink-0">Catatan Peninjauan</span>
                <span class="font-medium text-neutral-800 dark:text-neutral-200 text-right">{{ selectedSubmission.notes }}</span>
              </div>
            </div>

            <div class="flex items-center justify-end gap-2.5 pt-1">
              <button
                type="button"
                class="btn-pill-action"
                @click="selectedSubmission = null"
              >
                <span>Tutup</span>
              </button>
              <button
                v-if="selectedSubmission.status !== 'Disahkan'"
                type="button"
                :disabled="isApproving"
                class="btn-pill-action-green justify-center"
                @click="approveCertification(selectedSubmission)"
              >
                <HugeiconsIcon :icon="CheckmarkCircle01Icon" :size="16" :stroke-width="2" />
                <span>{{ isApproving ? 'Mengesahkan...' : 'Sahkan Sertifikasi' }}</span>
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
  Award01Icon,
  Store01Icon,
  CheckmarkCircle01Icon,
  AnalyticsUpIcon,
  Shield01Icon,
  Search01Icon,
  FilterHorizontalIcon,
  ArrowDown01Icon,
  ArrowRight01Icon,
  Cancel01Icon
} from '@hugeicons/core-free-icons'

definePageMeta({
  layout: 'dashboard',
  hideHeader: true
})

useHead({
  title: 'Sertifikasi Usaha — Admin Beruang'
})

interface CertificationItem {
  id: string
  umkmName: string
  owner: string
  sector: string
  consultantName: string
  submittedAt: string
  bankMutation: string
  status: 'Menunggu' | 'Disahkan' | 'Revisi'
  notes: string
}

const sertifikasiPageRef = ref<HTMLElement | null>(null)
let gsapCtx: gsap.Context | null = null

const toastMessage = ref('')
const activeFilter = ref<'ALL' | 'Menunggu' | 'Disahkan'>('ALL')
const isFilterDropdownOpen = ref(false)
const searchQuery = ref('')
const selectedSubmission = ref<CertificationItem | null>(null)

// Pagination state
const currentPage = ref(1)
const pageSize = ref(10)

watch([searchQuery, activeFilter], () => {
  currentPage.value = 1
})

const filterTabs = [
  { id: 'ALL' as const, label: 'Semua Status', shortLabel: 'Semua' },
  { id: 'Menunggu' as const, label: 'Menunggu Verifikasi', shortLabel: 'Menunggu' },
  { id: 'Disahkan' as const, label: 'Telah Disahkan', shortLabel: 'Disahkan' }
]

const activeFilterLabel = computed(() => {
  return filterTabs.find(t => t.id === activeFilter.value)?.label || 'Semua Status'
})

const activeFilterShortLabel = computed(() => {
  return filterTabs.find(t => t.id === activeFilter.value)?.shortLabel || 'Semua'
})

function selectFilter(id: typeof activeFilter.value) {
  activeFilter.value = id
  isFilterDropdownOpen.value = false
}

const submissions = ref<CertificationItem[]>([])

const pendingCount = computed(() => submissions.value.filter(s => s.status === 'Menunggu').length)
const approvedCount = computed(() => submissions.value.filter(s => s.status === 'Disahkan').length)

const filteredSubmissions = computed(() => {
  return submissions.value.filter((s) => {
    const matchStatus = activeFilter.value === 'ALL' || s.status === activeFilter.value
    const q = searchQuery.value.trim().toLowerCase()
    if (!q) return matchStatus
    return (
      matchStatus &&
      (s.umkmName.toLowerCase().includes(q) ||
        s.owner.toLowerCase().includes(q) ||
        s.consultantName.toLowerCase().includes(q))
    )
  })
})

const paginatedSubmissions = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value
  return filteredSubmissions.value.slice(start, start + pageSize.value)
})

const isApproving = ref(false)

async function fetchCertifications() {
  try {
    const res = await useApi<any>('/admin/certifications')
    if (res.data && Array.isArray(res.data)) {
      submissions.value = res.data.map((c: any) => ({
        id: c.id,
        umkmName: c.businessName,
        owner: c.ownerName,
        sector: c.sector,
        consultantName: c.consultantName,
        submittedAt: c.approvedAt || 'Baru Saja',
        bankMutation: `${c.validMonthsCount} Bulan Terverifikasi`,
        status: c.status === 'APPROVED' ? 'Disahkan' : 'Menunggu',
        notes: c.status === 'APPROVED' ? `Tersertifikasi resmi (${c.certificateNo || 'Aktif'}).` : `Skor kesiapan ${c.compositeScore}/100 siap disahkan.`
      }))
    }
  } catch (err: any) {
    console.warn('Gagal memuat sertifikasi live:', err?.message)
  }
}

async function approveCertification(item: CertificationItem) {
  isApproving.value = true
  try {
    const res = await useApi<any>(`/admin/certifications/${item.id}/approve`, {
      method: 'PUT'
    })
    item.status = 'Disahkan'
    item.notes = `Resmi disahkan dengan nomor ${res.data?.certificateNo || 'CERT-BERUANG'}.`
    toastMessage.value = `Sertifikasi untuk ${item.umkmName} berhasil disahkan!`
    setTimeout(() => {
      selectedSubmission.value = null
    }, 1200)
  } catch (err: any) {
    toastMessage.value = 'Gagal mengesahkan sertifikasi: ' + (err?.message || 'Error server')
  } finally {
    isApproving.value = false
  }
}

onMounted(async () => {
  await fetchCertifications()
  if (!sertifikasiPageRef.value) return
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
  }, sertifikasiPageRef.value)
})

onUnmounted(() => {
  gsapCtx?.revert()
})
</script>
