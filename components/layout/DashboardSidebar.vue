<template>
  <div>
    <!-- Desktop Sidebar (macOS Minimalist Aesthetic matching design reference) -->
    <aside
      class="hidden lg:flex w-80 bg-[#FAFAFA] dark:bg-[#141519] border-r border-neutral-200/80 dark:border-neutral-800/90 flex-col shrink-0 sticky top-0 h-screen transition-colors duration-150 z-20 select-none"
    >
      <div class="py-6 flex flex-col h-full overflow-hidden">
        <!-- Enlarged Workspace / User Profile Card (Reference-Matched Design) -->
        <div class="relative mb-3 px-4">
          <!-- Backdrop to close dropdown when clicking outside -->
          <div
            v-if="isProfileMenuOpen"
            class="fixed inset-0 z-20"
            @click="isProfileMenuOpen = false"
          />

          <button
            type="button"
            class="w-full bg-white dark:bg-[#18191E] hover:bg-neutral-50 dark:hover:bg-[#1E1F25] border border-neutral-200/90 dark:border-neutral-800 rounded-2xl p-3 flex items-center justify-between text-left transition-all duration-150 group cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500/20 relative z-30 shadow-xs"
            aria-label="Pilih Profil dan Peran"
            @click="isProfileMenuOpen = !isProfileMenuOpen"
          >
            <div class="flex items-center gap-3 min-w-0">
              <!-- Logo Usaha UMKM -->
              <div class="w-10 h-10 rounded-xl bg-amber-500/10 dark:bg-amber-400/10 border border-amber-500/20 dark:border-amber-400/20 p-1.5 flex items-center justify-center shrink-0 shadow-xs overflow-hidden transition-transform duration-150 group-hover:scale-105">
                <img
                  :src="umkmLogoUrl"
                  :alt="umkmStore.profile.name || 'Logo Usaha'"
                  class="w-full h-full object-contain"
                />
              </div>

              <!-- Role Label & User Name -->
              <div class="min-w-0 flex-1">
                <span class="text-[11px] font-sans font-semibold text-primary-600 dark:text-primary-400 leading-tight block uppercase tracking-wider">
                  {{ userRoleDisplay }}
                </span>
                <p class="font-heading font-semibold text-sm sm:text-base text-neutral-900 dark:text-white truncate leading-snug tracking-tight mt-0.5">
                  {{ authStore.currentUser?.name || 'Fikri Setiawan' }}
                </p>
              </div>
            </div>

            <!-- Double Caret Selector Icon -->
            <div class="text-neutral-400 dark:text-neutral-500 group-hover:text-neutral-600 dark:group-hover:text-neutral-300 transition-colors shrink-0 ml-1">
              <HugeiconsIcon :icon="UnfoldMoreIcon" :size="16" :stroke-width="2" />
            </div>
          </button>

          <!-- Interactive Profile / Role Switcher Popover -->
          <div
            v-if="isProfileMenuOpen"
            class="absolute top-full left-4 right-4 mt-2 bg-white dark:bg-neutral-900 border border-neutral-200/90 dark:border-neutral-800 rounded-2xl p-2 shadow-dropdown z-30 space-y-1 animate-in fade-in duration-100"
          >
            <div class="px-2.5 py-1 text-[10px] font-heading font-semibold uppercase tracking-wider text-neutral-400 dark:text-neutral-500">
              Ganti Peran Pengguna
            </div>

            <button
              v-for="role in rolesList"
              :key="role.id"
              type="button"
              :class="[
                'w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-heading font-medium transition-colors duration-150',
                authStore.currentUser?.role === role.id
                  ? 'bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-white font-semibold'
                  : 'text-neutral-600 dark:text-neutral-400 hover:bg-neutral-50 dark:hover:bg-neutral-800/60'
              ]"
              @click="switchRole(role.id, role.path)"
            >
              <span>{{ role.name }}</span>
              <span
                v-if="authStore.currentUser?.role === role.id"
                class="w-1.5 h-1.5 rounded-full bg-primary-500"
              />
            </button>

            <div class="h-px bg-neutral-100 dark:bg-neutral-800 my-1" />

            <NuxtLink
              to="/masuk"
              class="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-heading font-medium text-danger hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors duration-150"
              @click="isProfileMenuOpen = false"
            >
              <HugeiconsIcon :icon="Logout01Icon" :size="14" :stroke-width="2" />
              <span>Keluar Akun</span>
            </NuxtLink>
          </div>
        </div>

        <!-- Navigation Items List (Categorized, Large Clear Text matching reference) -->
        <div class="flex-1 overflow-y-auto scrollbar-none">
          <nav class="space-y-4" aria-label="Menu Utama">
            <div
              v-for="(section, sIdx) in navigationSections"
              :key="`sec-${sIdx}`"
              class="space-y-1"
            >
              <!-- Full-Bleed Hairline section divider (Rata Kiri-Kanan) -->
              <div
                v-if="sIdx > 0"
                class="w-full h-px bg-neutral-200/80 dark:bg-neutral-800 mb-3 shrink-0"
              />

              <!-- Section Category Title -->
              <div
                v-if="section.title"
                class="px-6 pb-1 text-xs sm:text-sm font-semibold text-neutral-600 dark:text-neutral-300 font-heading tracking-tight"
              >
                {{ section.title }}
              </div>

              <!-- Section Items with generous side padding -->
              <div class="space-y-0.5 px-4">
                <NuxtLink
                  v-for="item in section.items"
                  :key="item.to"
                  :to="item.to"
                  :class="[
                    'flex items-center gap-3.5 px-3.5 py-2.5 rounded-xl font-poppins text-[15px] transition-all duration-150 group border',
                    isActive(item.to)
                      ? 'bg-primary-50 hover:bg-primary-100/60 dark:bg-primary-950/40 dark:hover:bg-primary-900/40 text-primary-600 dark:text-primary-300 font-semibold border-primary-200/60 dark:border-primary-800/40 shadow-2xs'
                      : 'text-neutral-600 dark:text-neutral-400 font-normal hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100/80 dark:hover:bg-neutral-800/50 border-transparent'
                  ]"
                >
                  <HugeiconsIcon
                    :icon="item.icon"
                    :size="20"
                    :stroke-width="isActive(item.to) ? 2.2 : 1.75"
                    :class="[
                      'transition-colors duration-150 shrink-0',
                      isActive(item.to)
                        ? 'text-primary-600 dark:text-primary-400'
                        : 'text-neutral-500 dark:text-neutral-400 group-hover:text-neutral-800 dark:group-hover:text-neutral-200'
                    ]"
                  />
                  <span class="truncate">{{ item.label }}</span>
                </NuxtLink>
              </div>
            </div>
          </nav>
        </div>

      </div>
    </aside>

    <!-- Mobile Drawer Overlay & Panel (Responsive Parity) -->
    <Teleport to="body">
      <div
        v-if="isMobileOpen"
        class="fixed inset-0 z-50 lg:hidden flex"
        role="dialog"
        aria-modal="true"
      >
        <!-- Backdrop -->
        <div
          class="fixed inset-0 bg-neutral-950/40 backdrop-blur-xs transition-opacity"
          @click="$emit('closeMobile')"
        />

        <!-- Slide-out Drawer Panel in #fafafa -->
        <div class="relative w-80 max-w-[88vw] bg-[#FAFAFA] dark:bg-[#141519] h-full flex flex-col shadow-2xl z-10 py-6 overflow-hidden border-r border-neutral-200/90 dark:border-neutral-800">
          <!-- Mobile Header (Close Button aligned with Enlarged Card) -->
          <div class="flex items-center justify-between mb-3 px-4">
            <span class="text-xs font-heading font-bold uppercase tracking-wider text-neutral-400 dark:text-neutral-500">
              Menu Navigasi
            </span>
            <button
              type="button"
              class="p-2 rounded-xl text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 hover:bg-neutral-200/60 dark:hover:bg-neutral-800 transition-colors active:scale-[0.96]"
              aria-label="Tutup Menu"
              @click="$emit('closeMobile')"
            >
              <HugeiconsIcon :icon="Cancel01Icon" :size="18" :stroke-width="2" />
            </button>
          </div>

          <!-- Mobile Enlarged User Profile Card -->
          <div class="mb-3 px-4">
            <div class="w-full bg-white dark:bg-[#18191E] border border-neutral-200/90 dark:border-neutral-800 rounded-2xl p-3 flex items-center justify-between shadow-xs">
              <div class="flex items-center gap-3 min-w-0">
                <div class="w-10 h-10 rounded-xl bg-amber-500/10 dark:bg-amber-400/10 border border-amber-500/20 dark:border-amber-400/20 p-1.5 flex items-center justify-center shrink-0 shadow-xs overflow-hidden">
                  <img
                    :src="umkmLogoUrl"
                    :alt="umkmStore.profile.name || 'Logo Usaha'"
                    class="w-full h-full object-contain"
                  />
                </div>
                <div class="min-w-0 flex-1">
                  <span class="text-[11px] font-sans font-semibold text-primary-600 dark:text-primary-400 leading-tight block uppercase tracking-wider">
                    {{ userRoleDisplay }}
                  </span>
                  <p class="font-heading font-semibold text-sm sm:text-[15px] text-neutral-900 dark:text-white truncate leading-snug tracking-tight mt-0.5">
                    {{ authStore.currentUser?.name || 'Fikri Setiawan' }}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <!-- Mobile Nav Items (Categorized with large legible text) -->
          <div class="flex-1 overflow-y-auto scrollbar-none">
            <nav class="space-y-4">
              <div
                v-for="(section, sIdx) in navigationSections"
                :key="`mob-sec-${sIdx}`"
                class="space-y-1"
              >
                <!-- Full-Bleed Hairline section divider (Rata Kiri-Kanan) -->
                <div
                  v-if="sIdx > 0"
                  class="w-full h-px bg-neutral-200/80 dark:bg-neutral-800 mb-3 shrink-0"
                />

                <!-- Section Category Title -->
                <div
                  v-if="section.title"
                  class="px-6 pb-1 text-xs sm:text-sm font-semibold text-neutral-600 dark:text-neutral-300 font-heading tracking-tight"
                >
                  {{ section.title }}
                </div>

                <!-- Section Items with generous side padding -->
                <div class="space-y-0.5 px-4">
                  <NuxtLink
                    v-for="item in section.items"
                    :key="`mob-${item.to}`"
                    :to="item.to"
                    :class="[
                      'flex items-center gap-3.5 px-3.5 py-2.5 rounded-xl font-poppins text-[15px] transition-all duration-150 group border',
                      isActive(item.to)
                        ? 'bg-primary-50 hover:bg-primary-100/60 dark:bg-primary-950/40 dark:hover:bg-primary-900/40 text-primary-600 dark:text-primary-300 font-semibold border-primary-200/60 dark:border-primary-800/40 shadow-2xs'
                        : 'text-neutral-600 dark:text-neutral-400 font-normal hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100/80 dark:hover:bg-neutral-800/50 border-transparent'
                    ]"
                    @click="$emit('closeMobile')"
                  >
                    <HugeiconsIcon
                      :icon="item.icon"
                      :size="20"
                      :stroke-width="isActive(item.to) ? 2.2 : 1.75"
                      :class="[
                        'transition-colors duration-150 shrink-0',
                        isActive(item.to)
                          ? 'text-primary-600 dark:text-primary-400'
                          : 'text-neutral-500 dark:text-neutral-400 group-hover:text-neutral-800 dark:group-hover:text-neutral-200'
                      ]"
                    />
                    <span class="truncate">{{ item.label }}</span>
                  </NuxtLink>
                </div>
              </div>
            </nav>
          </div>

        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore, type UserRole } from '~/stores/auth'
import { useUmkmStore } from '~/stores/umkm'
import { HugeiconsIcon } from '@hugeicons/vue'
import {
  Home03Icon,
  Task01Icon,
  AnalyticsUpIcon,
  Coins01Icon,
  Award01Icon,
  UserGroupIcon,
  Store01Icon,
  CheckmarkCircle01Icon,
  Alert01Icon,
  StarIcon,
  UserAdd01Icon,
  Logout01Icon,
  Cancel01Icon,
  UnfoldMoreIcon,
  RubiksCubeIcon,
  UserCircleIcon
} from '@hugeicons/core-free-icons'

defineProps<{
  isMobileOpen?: boolean
}>()

const emit = defineEmits<{
  (e: 'closeMobile'): void
}>()

const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()
const umkmStore = useUmkmStore()

const isProfileMenuOpen = ref(false)

const currentRole = computed(() => authStore.currentUser?.role || 'UMKM')

const userRoleDisplay = computed(() => {
  if (currentRole.value === 'UMKM') return 'UMKM'
  if (currentRole.value === 'CONSULTANT') return 'Konsultan'
  if (currentRole.value === 'INVESTOR') return 'Investor'
  if (currentRole.value === 'ADMIN') return 'Admin'
  return 'UMKM'
})

const umkmLogoUrl = computed(() => {
  return umkmStore.profile.logoUrl || '/logo.svg'
})

const currentRoleLabel = computed(() => {
  if (currentRole.value === 'UMKM') return 'Pemilik UMKM'
  if (currentRole.value === 'CONSULTANT') return 'Konsultan'
  if (currentRole.value === 'INVESTOR') return 'Investor'
  if (currentRole.value === 'ADMIN') return 'Admin'
  return 'Pengguna'
})

const rolesList: { id: UserRole; name: string; path: string }[] = [
  { id: 'UMKM', name: 'Pemilik Usaha (UMKM)', path: '/dashboard' },
  { id: 'CONSULTANT', name: 'Konsultan Bisnis', path: '/konsultan' },
  { id: 'INVESTOR', name: 'Investor & Mitra', path: '/investor' },
  { id: 'ADMIN', name: 'Administrator', path: '/admin' }
]

function switchRole(role: UserRole, targetRoute: string) {
  authStore.setRole(role)
  isProfileMenuOpen.value = false
  router.push(targetRoute)
}

function isActive(path: string) {
  if (path === '/dashboard') return route.path === '/dashboard'
  if (path === '/konsultan') return route.path === '/konsultan'
  if (path === '/investor') return route.path === '/investor'
  if (path === '/admin') return route.path === '/admin'
  return route.path === path || route.path.startsWith(path + '/')
}

interface NavItem {
  to: string
  label: string
  icon: any
}

interface NavSection {
  title?: string
  items: NavItem[]
}

// Categorized navigation items with clear, concise, beginner-friendly labels
const navigationSections = computed<NavSection[]>(() => {
  if (currentRole.value === 'UMKM') {
    return [
      {
        items: [
          { to: '/dashboard', label: 'Beranda', icon: Home03Icon },
          { to: '/dashboard/progres', label: 'Catatan Kas', icon: Coins01Icon }
        ]
      },
      {
        title: 'Kelola Usaha',
        items: [
          { to: '/dashboard/profile', label: 'Profil Usaha', icon: UserCircleIcon },
          { to: '/dashboard/rencana-aksi', label: 'Rencana Aksi', icon: Task01Icon },
          { to: '/dashboard/penilaian', label: 'Cek Kesehatan', icon: AnalyticsUpIcon },
          { to: '/dashboard/profil-publik', label: 'Toko Publik', icon: Store01Icon }
        ]
      },
      {
        title: 'Permodalan',
        items: [
          { to: '/dashboard/pendanaan', label: 'Cari Modal', icon: Award01Icon },
          { to: '/dashboard/permintaan-investor', label: 'Tawaran Masuk', icon: UserGroupIcon }
        ]
      }
    ]
  } else if (currentRole.value === 'CONSULTANT') {
    return [
      {
        items: [
          { to: '/konsultan', label: 'Daftar Klien', icon: UserGroupIcon },
          { to: '/konsultan/validasi', label: 'Validasi Kas', icon: CheckmarkCircle01Icon }
        ]
      },
      {
        title: 'Pengawasan',
        items: [
          { to: '/konsultan/alert', label: 'Peringatan', icon: Alert01Icon }
        ]
      }
    ]
  } else if (currentRole.value === 'INVESTOR') {
    return [
      {
        items: [
          { to: '/investor', label: 'Katalog Usaha', icon: Store01Icon },
          { to: '/investor/watchlist', label: 'Disimpan', icon: StarIcon }
        ]
      }
    ]
  } else {
    // ADMIN
    return [
      {
        items: [
          { to: '/admin', label: 'Ringkasan', icon: Home03Icon },
          { to: '/admin/penugasan', label: 'Penugasan Konsultan', icon: UserAdd01Icon },
          { to: '/admin/pengguna', label: 'Kelola Pengguna', icon: UserGroupIcon }
        ]
      }
    ]
  }
})

</script>

<style scoped>
.scrollbar-none::-webkit-scrollbar {
  display: none;
}
.scrollbar-none {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
