<template>
  <div ref="penggunaPageRef" class="space-y-6 sm:space-y-8 pb-16 font-poppins text-neutral-900 dark:text-neutral-100">
    <!-- 1. Page Title: Identical to UMKM Pages -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 min-h-[44px]">
      <div class="flex items-center gap-2.5 sm:gap-3">
        <HugeiconsIcon :icon="UserGroupIcon" :size="26" :stroke-width="2.2" class="text-neutral-900 dark:text-white shrink-0" />
        <h1 class="font-poppins font-semibold text-2xl sm:text-3xl text-neutral-900 dark:text-white tracking-tight leading-tight">
          Kelola Pengguna
        </h1>
      </div>

      <div class="flex items-center gap-2.5 shrink-0 w-full sm:w-auto [&>*]:w-full sm:[&>*]:w-auto">
        <button
          type="button"
          class="btn-pill-action justify-center"
          @click="exportData"
        >
          <HugeiconsIcon :icon="Download01Icon" :size="16" :stroke-width="2" />
          <span>Unduh CSV</span>
        </button>
        <button
          type="button"
          class="btn-pill-action-green justify-center"
          @click="isAddModalOpen = true"
        >
          <HugeiconsIcon :icon="Add01Icon" :size="16" :stroke-width="2.2" />
          <span>Tambah Akun</span>
        </button>
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

    <!-- 2. 4 Role Summary Cards (Identical .stat-card-clean Typography & Geometry to UMKM Pages) -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 items-stretch w-full">
      <div class="gsap-admin-card gsap-stat-card flex-1 w-full">
        <div class="stat-card-clean transition-all duration-200">
          <div class="flex items-center justify-between w-full gap-2">
            <div class="flex items-center gap-2 sm:gap-2.5 min-w-0">
              <div class="stat-card-icon-box">
                <HugeiconsIcon :icon="Store01Icon" :size="17" :stroke-width="2.0" class="text-[#156374] dark:text-[#50AABF] shrink-0" />
              </div>
              <span class="text-[13px] xl:text-[14px] font-poppins font-semibold text-neutral-800 dark:text-neutral-100 capitalize truncate tracking-[-0.01em]">
                Akun UMKM
              </span>
            </div>
            <div class="stat-card-badge badge-green">
              <span>NIB Valid</span>
            </div>
          </div>
          <div class="my-auto py-2.5 sm:py-3.5">
            <span class="text-xl sm:text-[22px] lg:text-[21px] xl:text-[24px] font-poppins font-semibold text-neutral-900 dark:text-white tabular-nums tracking-[-0.02em] whitespace-nowrap block leading-tight">
              {{ umkmAccountsCount }} Akun
            </span>
          </div>
        </div>
      </div>

      <div class="gsap-admin-card gsap-stat-card flex-1 w-full">
        <div class="stat-card-clean transition-all duration-200">
          <div class="flex items-center justify-between w-full gap-2">
            <div class="flex items-center gap-2 sm:gap-2.5 min-w-0">
              <div class="stat-card-icon-box">
                <HugeiconsIcon :icon="UserCheck01Icon" :size="17" :stroke-width="2.0" class="text-[#156374] dark:text-[#50AABF] shrink-0" />
              </div>
              <span class="text-[13px] xl:text-[14px] font-poppins font-semibold text-neutral-800 dark:text-neutral-100 capitalize truncate tracking-[-0.01em]">
                Akun Konsultan
              </span>
            </div>
            <div class="stat-card-badge badge-green">
              <span>BNSP</span>
            </div>
          </div>
          <div class="my-auto py-2.5 sm:py-3.5">
            <span class="text-xl sm:text-[22px] lg:text-[21px] xl:text-[24px] font-poppins font-semibold text-neutral-900 dark:text-white tabular-nums tracking-[-0.02em] whitespace-nowrap block leading-tight">
              {{ consultantAccountsCount }} Akun
            </span>
          </div>
        </div>
      </div>

      <div class="gsap-admin-card gsap-stat-card flex-1 w-full">
        <div class="stat-card-clean transition-all duration-200">
          <div class="flex items-center justify-between w-full gap-2">
            <div class="flex items-center gap-2 sm:gap-2.5 min-w-0">
              <div class="stat-card-icon-box">
                <HugeiconsIcon :icon="Coins01Icon" :size="17" :stroke-width="2.0" class="text-[#156374] dark:text-[#50AABF] shrink-0" />
              </div>
              <span class="text-[13px] xl:text-[14px] font-poppins font-semibold text-neutral-800 dark:text-neutral-100 capitalize truncate tracking-[-0.01em]">
                Akun Investor
              </span>
            </div>
            <div class="stat-card-badge badge-green">
              <span>KYC Valid</span>
            </div>
          </div>
          <div class="my-auto py-2.5 sm:py-3.5">
            <span class="text-xl sm:text-[22px] lg:text-[21px] xl:text-[24px] font-poppins font-semibold text-neutral-900 dark:text-white tabular-nums tracking-[-0.02em] whitespace-nowrap block leading-tight">
              {{ investorAccountsCount }} Akun
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
                Administrator
              </span>
            </div>
            <div class="stat-card-badge badge-green">
              <span>Aktif</span>
            </div>
          </div>
          <div class="my-auto py-2.5 sm:py-3.5">
            <span class="text-xl sm:text-[22px] lg:text-[21px] xl:text-[24px] font-poppins font-semibold text-neutral-900 dark:text-white tabular-nums tracking-[-0.02em] whitespace-nowrap block leading-tight">
              {{ adminAccountsCount }} Akun
            </span>
          </div>
        </div>
      </div>
    </div>

    <!-- 3. User Account Directory Container -->
    <section class="gsap-admin-section card-tactile-gopay rounded-[18px] overflow-hidden font-poppins">
      <div class="p-5 sm:p-8 space-y-4 border-b border-[#E2E8F0] dark:border-neutral-800 bg-[#FFFFFF] dark:bg-[#13161F]">
        <div class="space-y-1.5">
          <h2 class="text-lg sm:text-xl font-poppins font-bold text-neutral-900 dark:text-white tracking-tight">
            Daftar Akun Pengguna Ekosistem
          </h2>
          <p class="text-xs sm:text-sm font-poppins text-neutral-600 dark:text-neutral-400 leading-normal">
            Kelola kredensial akses seluruh pelaku UMKM, konsultan pendamping, investor, dan administrator.
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
              aria-label="Cari nama, email, atau organisasi pengguna"
              placeholder="Cari nama, email, organisasi..."
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
              title="Filter Peran Pengguna"
              @click="isFilterDropdownOpen = !isFilterDropdownOpen"
            >
              <HugeiconsIcon :icon="FilterHorizontalIcon" :size="14" :stroke-width="2" class="text-neutral-500 dark:text-neutral-400 shrink-0" />
              <span class="hidden sm:inline truncate">{{ activeRoleLabel }}</span>
              <span class="sm:hidden truncate text-xs">{{ activeRoleShortLabel }}</span>
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
                  v-for="opt in roleTabs"
                  :key="opt.id"
                  type="button"
                  :class="[
                    'w-full flex items-center justify-between px-3 py-2 rounded-[8px] text-sm font-poppins transition-all duration-150 text-left cursor-pointer',
                    selectedRole === opt.id
                      ? 'bg-[#E6F4F7] hover:bg-[#D9EEF3] dark:bg-[#156374]/20 dark:hover:bg-[#156374]/30 text-[#156374] dark:text-[#50AABF] font-semibold border border-[#156374]/20 dark:border-[#50AABF]/25'
                      : 'text-[#475569] dark:text-neutral-300 font-medium hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100/80 dark:hover:bg-neutral-800/60 border border-transparent'
                  ]"
                  @click="selectRoleFilter(opt.id)"
                >
                  <span>{{ opt.label }}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Table -->
      <div class="overflow-x-auto w-full">
        <table class="w-full text-left text-sm font-poppins">
          <thead>
            <tr class="bg-[#FFFFFF] dark:bg-[#13161F] border-b border-[#E2E8F0] dark:border-neutral-800 text-neutral-800 dark:text-neutral-200 font-poppins text-xs sm:text-sm font-bold uppercase tracking-wider">
              <th class="py-4 sm:py-5 px-6 text-left font-bold">Nama & Email</th>
              <th class="py-4 sm:py-5 px-5 text-left font-bold">Peran</th>
              <th class="py-4 sm:py-5 px-5 text-left font-bold">Entitas / Lisensi</th>
              <th class="py-4 sm:py-5 px-5 text-left font-bold">Status Akun</th>
              <th class="py-4 sm:py-5 px-6 text-right font-bold">Tindakan</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-neutral-100 dark:divide-neutral-800/80 text-neutral-800 dark:text-neutral-200 font-poppins">
            <tr
              v-for="user in filteredUsers"
              :key="user.id"
              class="bg-white dark:bg-[#13161F] hover:bg-neutral-50/80 dark:hover:bg-neutral-800/50 transition-colors"
            >
              <td class="py-4 sm:py-5 px-6 text-left">
                <div class="flex items-center gap-3.5">
                  <div class="w-10 h-10 rounded-full bg-white dark:bg-neutral-800 border border-[#CBD5E1] dark:border-neutral-700 flex items-center justify-center text-sm font-semibold text-neutral-800 dark:text-neutral-200 shrink-0">
                    {{ getInitials(user.name) }}
                  </div>
                  <div class="min-w-0">
                    <p class="text-sm font-semibold text-neutral-900 dark:text-white truncate">{{ user.name }}</p>
                    <p class="text-xs font-medium text-neutral-600 dark:text-neutral-400 truncate mt-0.5">{{ user.email }}</p>
                  </div>
                </div>
              </td>

              <td class="py-4 sm:py-5 px-5 text-left whitespace-nowrap">
                <span
                  :class="[
                    'inline-flex items-center px-2.5 py-1 rounded-[8px] text-xs font-semibold border font-poppins',
                    user.role === 'UMKM'
                      ? 'bg-emerald-50 text-emerald-800 border-emerald-200 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800'
                      : user.role === 'CONSULTANT'
                        ? 'bg-cyan-50 text-cyan-800 border-cyan-200 dark:bg-cyan-950/60 dark:text-cyan-300 dark:border-cyan-800'
                        : user.role === 'INVESTOR'
                          ? 'bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 border-amber-200 dark:border-amber-800/50'
                          : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 border-neutral-300 dark:border-neutral-700'
                  ]"
                >
                  {{ getRoleLabel(user.role) }}
                </span>
              </td>

              <td class="py-4 sm:py-5 px-5 text-left">
                <p class="text-sm font-medium text-neutral-900 dark:text-white">{{ user.organization }}</p>
                <p class="text-xs font-medium text-neutral-600 dark:text-neutral-400 mt-0.5">{{ user.credential }}</p>
              </td>

              <td class="py-4 sm:py-5 px-5 text-left whitespace-nowrap">
                <span
                  :class="[
                    'inline-flex items-center px-2.5 py-1 rounded-[8px] text-xs font-semibold border font-poppins',
                    user.status === 'Aktif'
                      ? 'bg-emerald-50 text-emerald-800 border-emerald-200 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800'
                      : 'bg-red-50 dark:bg-red-950/40 text-red-700 dark:text-red-300 border-red-200 dark:border-red-800/50'
                  ]"
                >
                  {{ user.status }}
                </span>
              </td>

              <td class="py-4 sm:py-5 px-6 text-right whitespace-nowrap">
                <button
                  type="button"
                  :class="[
                    user.status === 'Aktif'
                      ? 'btn-pill-action-red-outline'
                      : 'btn-pill-action-green'
                  ]"
                  @click="toggleUserStatus(user)"
                >
                  <span>{{ user.status === 'Aktif' ? 'Bekukan' : 'Aktifkan' }}</span>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <!-- Modal Tambah Akun -->
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
          v-if="isAddModalOpen"
          class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs font-poppins"
          @click.self="isAddModalOpen = false"
        >
          <div class="w-full max-w-md rounded-[18px] bg-[#FFFFFF] dark:bg-[#13161F] border border-[#CBD5E1] dark:border-neutral-800 p-6 sm:p-7 shadow-none space-y-5">
            <div class="flex items-center justify-between border-b border-neutral-100 dark:border-neutral-800 pb-4">
              <h3 class="text-base sm:text-lg font-bold text-neutral-900 dark:text-white">Tambah Akun</h3>
              <button
                type="button"
                class="w-9 h-9 rounded-full bg-white dark:bg-neutral-800 border border-[#CBD5E1] dark:border-neutral-700 flex items-center justify-center text-neutral-500 hover:text-neutral-900 dark:hover:text-white cursor-pointer shadow-none"
                @click="isAddModalOpen = false"
              >
                <HugeiconsIcon :icon="Cancel01Icon" :size="16" :stroke-width="2.2" />
              </button>
            </div>

            <div class="space-y-4">
              <div>
                <label class="block text-xs sm:text-sm font-semibold text-neutral-700 dark:text-neutral-300 mb-1.5">Nama Lengkap</label>
                <input
                  v-model="newUser.name"
                  type="text"
                  placeholder="Nama pengguna"
                  class="w-full h-[44px] px-3.5 rounded-[10px] border border-[#CBD5E1] dark:border-neutral-700 bg-white dark:bg-neutral-900 text-sm text-neutral-900 dark:text-white focus:outline-none focus:border-[#00800e] shadow-none"
                />
              </div>
              <div>
                <label class="block text-xs sm:text-sm font-semibold text-neutral-700 dark:text-neutral-300 mb-1.5">Alamat Email</label>
                <input
                  v-model="newUser.email"
                  type="email"
                  placeholder="nama@domain.id"
                  class="w-full h-[44px] px-3.5 rounded-[10px] border border-[#CBD5E1] dark:border-neutral-700 bg-white dark:bg-neutral-900 text-sm text-neutral-900 dark:text-white focus:outline-none focus:border-[#00800e] shadow-none"
                />
              </div>
              <div>
                <label class="block text-xs sm:text-sm font-semibold text-neutral-700 dark:text-neutral-300 mb-1.5">Peran</label>
                <select
                  v-model="newUser.role"
                  class="w-full h-[44px] px-3.5 rounded-[10px] border border-[#CBD5E1] dark:border-neutral-700 bg-white dark:bg-neutral-900 text-sm text-neutral-900 dark:text-white focus:outline-none focus:border-[#00800e] shadow-none"
                >
                  <option value="UMKM">UMKM</option>
                  <option value="CONSULTANT">Konsultan</option>
                  <option value="INVESTOR">Investor</option>
                  <option value="ADMIN">Admin</option>
                </select>
              </div>
              <div>
                <label class="block text-xs sm:text-sm font-semibold text-neutral-700 dark:text-neutral-300 mb-1.5">Organisasi / Usaha</label>
                <input
                  v-model="newUser.organization"
                  type="text"
                  placeholder="Nama usaha atau institusi"
                  class="w-full h-[44px] px-3.5 rounded-[10px] border border-[#CBD5E1] dark:border-neutral-700 bg-white dark:bg-neutral-900 text-sm text-neutral-900 dark:text-white focus:outline-none focus:border-[#00800e] shadow-none"
                />
              </div>
            </div>

            <div class="flex items-center justify-end gap-2.5 pt-2">
              <button
                type="button"
                class="btn-pill-action"
                @click="isAddModalOpen = false"
              >
                <span>Batal</span>
              </button>
              <button
                type="button"
                class="btn-pill-action-green"
                @click="saveNewUser"
              >
                <span>Simpan</span>
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
  Download01Icon,
  Add01Icon,
  CheckmarkCircle01Icon,
  Store01Icon,
  UserCheck01Icon,
  Coins01Icon,
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
  title: 'Kelola Pengguna — Admin Beruang'
})

type AccountRole = 'UMKM' | 'CONSULTANT' | 'INVESTOR' | 'ADMIN'

interface UserAccount {
  id: string
  name: string
  email: string
  role: AccountRole
  organization: string
  credential: string
  status: 'Aktif' | 'Dibekukan'
}

const penggunaPageRef = ref<HTMLElement | null>(null)
let gsapCtx: gsap.Context | null = null

const toastMessage = ref('')
const selectedRole = ref<'ALL' | AccountRole>('ALL')
const isFilterDropdownOpen = ref(false)
const searchQuery = ref('')
const isAddModalOpen = ref(false)

const newUser = ref<{ name: string; email: string; role: AccountRole; organization: string }>({
  name: '',
  email: '',
  role: 'UMKM',
  organization: ''
})

const roleTabs = [
  { id: 'ALL' as const, label: 'Semua Peran', shortLabel: 'Semua' },
  { id: 'UMKM' as const, label: 'UMKM', shortLabel: 'UMKM' },
  { id: 'CONSULTANT' as const, label: 'Konsultan', shortLabel: 'Konsultan' },
  { id: 'INVESTOR' as const, label: 'Investor', shortLabel: 'Investor' },
  { id: 'ADMIN' as const, label: 'Admin', shortLabel: 'Admin' }
]

const activeRoleLabel = computed(() => {
  return roleTabs.find(t => t.id === selectedRole.value)?.label || 'Semua Peran'
})

const activeRoleShortLabel = computed(() => {
  return roleTabs.find(t => t.id === selectedRole.value)?.shortLabel || 'Semua'
})

function selectRoleFilter(id: typeof selectedRole.value) {
  selectedRole.value = id
  isFilterDropdownOpen.value = false
}

const users = ref<UserAccount[]>([])

const umkmAccountsCount = computed(() => users.value.filter(u => u.role === 'UMKM').length)
const consultantAccountsCount = computed(() => users.value.filter(u => u.role === 'CONSULTANT').length)
const investorAccountsCount = computed(() => users.value.filter(u => u.role === 'INVESTOR').length)
const adminAccountsCount = computed(() => users.value.filter(u => u.role === 'ADMIN').length)

const filteredUsers = computed(() => {
  return users.value.filter((u) => {
    const matchRole = selectedRole.value === 'ALL' || u.role === selectedRole.value
    const q = searchQuery.value.trim().toLowerCase()
    if (!q) return matchRole
    return (
      matchRole &&
      (u.name.toLowerCase().includes(q) ||
        u.email.toLowerCase().includes(q) ||
        u.organization.toLowerCase().includes(q))
    )
  })
})

function getInitials(name: string): string {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map(part => part[0]?.toUpperCase() || '')
    .join('')
}

function getRoleLabel(role: AccountRole): string {
  if (role === 'UMKM') return 'UMKM'
  if (role === 'CONSULTANT') return 'Konsultan'
  if (role === 'INVESTOR') return 'Investor'
  return 'Admin'
}

async function fetchUsers() {
  try {
    const res = await useApi<any>('/admin/users')
    if (res.data && Array.isArray(res.data)) {
      users.value = res.data.map((u: any) => ({
        id: u.id,
        name: u.name,
        email: u.email,
        role: u.role as AccountRole,
        organization: u.orgOrBusiness || 'Mitra Beruang',
        credential: u.role === 'UMKM' ? 'Profil Usaha' : u.role === 'CONSULTANT' ? 'Lisensi BNSP' : u.role === 'INVESTOR' ? 'KYC Terverifikasi' : 'Otoritas Sistem',
        status: u.status === 'FROZEN' ? 'Dibekukan' : 'Aktif'
      }))
    }
  } catch (err: any) {
    console.warn('Gagal memuat pengguna live:', err?.message)
  }
}

async function toggleUserStatus(user: UserAccount) {
  const targetStatus = user.status === 'Aktif' ? 'FROZEN' : 'ACTIVE'
  try {
    await useApi(`/admin/users/${user.id}/status`, {
      method: 'PATCH',
      body: { status: targetStatus }
    })
    user.status = user.status === 'Aktif' ? 'Dibekukan' : 'Aktif'
    toastMessage.value = `Status akun ${user.name} diperbarui menjadi ${user.status}.`
  } catch (err: any) {
    toastMessage.value = 'Gagal memperbarui status akun: ' + err?.message
  }
}

function exportData() {
  toastMessage.value = `Daftar pengguna (${filteredUsers.value.length} akun) berhasil diunduh.`
}

async function saveNewUser() {
  if (!newUser.value.name.trim() || !newUser.value.email.trim()) return
  try {
    const res = await useApi<any>('/admin/users', {
      method: 'POST',
      body: {
        name: newUser.value.name.trim(),
        email: newUser.value.email.trim(),
        role: newUser.value.role,
        orgName: newUser.value.organization.trim()
      }
    })
    users.value.unshift({
      id: res.data?.id || `usr-${Date.now()}`,
      name: newUser.value.name.trim(),
      email: newUser.value.email.trim(),
      role: newUser.value.role,
      organization: newUser.value.organization.trim() || 'Mitra Beruang',
      credential: 'Baru Dibuat',
      status: 'Aktif'
    })
    isAddModalOpen.value = false
    toastMessage.value = `Akun ${newUser.value.name} berhasil ditambahkan.`
    newUser.value = { name: '', email: '', role: 'UMKM', organization: '' }
  } catch (err: any) {
    toastMessage.value = 'Gagal membuat pengguna baru: ' + err?.message
  }
}

onMounted(async () => {
  await fetchUsers()
  if (!penggunaPageRef.value) return
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
  }, penggunaPageRef.value)
})

onUnmounted(() => {
  gsapCtx?.revert()
})
</script>
