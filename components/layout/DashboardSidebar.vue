<template>
  <div>
    <!-- Desktop Sidebar (macOS Minimalist Aesthetic matching design reference) -->
    <aside
      class="hidden lg:flex w-80 bg-[#FAFAFA] dark:bg-[#141519] border-r border-neutral-200/80 dark:border-neutral-800/90 flex-col shrink-0 sticky top-0 h-screen transition-colors duration-150 z-20 select-none"
    >
      <div class="py-6 flex flex-col h-full overflow-hidden">
        <!-- Brand / Workspace Header (Beruang) -->
        <div class="flex items-center gap-2.5 mb-4 px-6">
          <NuxtLink to="/" class="flex items-center gap-2.5 group" title="Beranda Beruang">
            <div class="w-8 h-8 rounded-lg bg-neutral-950 dark:bg-white flex items-center justify-center p-1.5 shadow-xs transition-transform duration-150 group-hover:scale-105 shrink-0">
              <img
                src="/logo.svg"
                alt="Beruang Logo"
                class="w-full h-full object-contain filter brightness-110"
              />
            </div>
            <span class=" font-semibold text-lg tracking-tight text-neutral-900 dark:text-white">
              Beruang
            </span>
          </NuxtLink>
        </div>

        <!-- User Profile Switcher Card -->
        <div class="relative mb-3 px-6">
          <!-- Backdrop to close dropdown when clicking outside -->
          <div
            v-if="isProfileMenuOpen"
            class="fixed inset-0 z-20"
            @click="isProfileMenuOpen = false"
          />

          <button
            type="button"
            class="w-full bg-white dark:bg-neutral-800/80 hover:bg-neutral-50 dark:hover:bg-neutral-800 border border-neutral-200/80 dark:border-neutral-700/60 rounded-xl p-2.5 flex items-center justify-between text-left transition-colors duration-150 group cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500/20 relative z-30"
            aria-label="Pilih Profil dan Peran"
            @click="isProfileMenuOpen = !isProfileMenuOpen"
          >
            <div class="flex items-center gap-2.5 min-w-0">
              <!-- Geometric Avatar Squircle with Rubik's Cube Icon -->
              <div class="w-8 h-8 rounded-lg bg-neutral-950 text-white dark:bg-neutral-700 flex items-center justify-center shrink-0">
                <HugeiconsIcon :icon="RubiksCubeIcon" :size="16" :stroke-width="1.75" />
              </div>

              <!-- Name & Role -->
              <div class="min-w-0 flex-1">
                <p class=" font-semibold text-sm text-neutral-900 dark:text-white truncate leading-tight">
                  {{ authStore.currentUser?.name || 'Pengguna' }}
                </p>
                <div class="flex items-center gap-1.5 mt-0.5">
                  <span class="inline-flex items-center px-2 py-0.5 rounded text-xs  font-semibold bg-primary-50 text-primary-700 dark:bg-primary-950 dark:text-primary-300">
                    {{ currentRoleLabel }}
                  </span>
                  <span class="text-xs text-neutral-500 dark:text-neutral-400  font-medium">Ganti ▾</span>
                </div>
              </div>
            </div>

            <!-- Double Caret Selector Icon -->
            <div class="text-neutral-400 group-hover:text-neutral-600 dark:group-hover:text-neutral-300 transition-colors shrink-0 ml-1">
              <HugeiconsIcon :icon="UnfoldMoreIcon" :size="14" :stroke-width="2" />
            </div>
          </button>

          <!-- Interactive Profile / Role Switcher Popover -->
          <div
            v-if="isProfileMenuOpen"
            class="absolute top-full left-0 right-0 mt-1.5 bg-white dark:bg-neutral-900 border border-neutral-200/90 dark:border-neutral-800 rounded-xl p-1.5 shadow-dropdown z-30 space-y-1 animate-in fade-in duration-100"
          >
            <div class="px-2.5 py-1 text-[10px]  font-medium uppercase tracking-wider text-neutral-400 dark:text-neutral-500">
              Ganti Peran Pengguna
            </div>

            <button
              v-for="role in rolesList"
              :key="role.id"
              type="button"
              :class="[
                'w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs  font-medium transition-colors duration-150',
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
              class="w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs  font-medium text-danger hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors duration-150"
              @click="isProfileMenuOpen = false"
            >
              <HugeiconsIcon :icon="Logout01Icon" :size="13" :stroke-width="2" />
              <span>Keluar Akun</span>
            </NuxtLink>
          </div>
        </div>

        <!-- Subtle Full-Bleed Divider Line (Rata Kiri-Kanan) -->
        <div class="w-full h-px bg-neutral-200/80 dark:bg-neutral-800 my-3 shrink-0" />

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
                class="px-6 pb-1 text-xs sm:text-sm font-bold text-neutral-600 dark:text-neutral-300  tracking-tight"
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
                    'flex items-center gap-3.5 px-3.5 py-2.5 rounded-xl  text-[15px] transition-colors duration-150 group',
                    isActive(item.to)
                      ? 'bg-[#1F52EB] text-white font-medium shadow-xs'
                      : 'text-neutral-600 dark:text-neutral-400 font-normal hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800/60'
                  ]"
                >
                  <HugeiconsIcon
                    :icon="item.icon"
                    :size="20"
                    :stroke-width="isActive(item.to) ? 2 : 1.75"
                    :class="[
                      'transition-colors duration-150 shrink-0',
                      isActive(item.to)
                        ? 'text-white'
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
          <!-- Mobile Brand Header & Close Button -->
          <div class="flex items-center justify-between mb-4 px-6">
            <NuxtLink to="/" class="flex items-center gap-2.5 group" @click="$emit('closeMobile')">
              <div class="w-8 h-8 rounded-lg bg-neutral-950 dark:bg-white flex items-center justify-center p-1.5 shadow-xs shrink-0">
                <img
                  src="/logo.svg"
                  alt="Beruang Logo"
                  class="w-full h-full object-contain filter brightness-110"
                />
              </div>
              <span class=" font-semibold text-lg tracking-tight text-neutral-900 dark:text-white">
                Beruang
              </span>
            </NuxtLink>

            <button
              type="button"
              class="p-1.5 rounded-lg text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 hover:bg-neutral-200/60 dark:hover:bg-neutral-800 transition-colors active:scale-[0.96]"
              aria-label="Tutup Menu"
              @click="$emit('closeMobile')"
            >
              <HugeiconsIcon :icon="Cancel01Icon" :size="18" :stroke-width="2" />
            </button>
          </div>

          <!-- Mobile User Profile Card -->
          <div class="mb-3 px-6">
            <div class="bg-white dark:bg-neutral-800/80 border border-neutral-200/80 dark:border-neutral-700/60 rounded-xl p-2.5 flex items-center justify-between">
              <div class="flex items-center gap-2.5 min-w-0">
                <div class="w-8 h-8 rounded-lg bg-neutral-950 text-white dark:bg-neutral-700 flex items-center justify-center shrink-0">
                  <HugeiconsIcon :icon="RubiksCubeIcon" :size="16" :stroke-width="1.75" />
                </div>
                <div class="min-w-0 flex-1">
                  <p class=" font-semibold text-sm text-neutral-900 dark:text-white truncate leading-tight">
                    {{ authStore.currentUser?.name || 'Pengguna' }}
                  </p>
                  <p class="text-xs text-neutral-600 dark:text-neutral-300 truncate leading-tight mt-0.5 ">
                    {{ authStore.currentUser?.email || 'user@beruang.id' }}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <!-- Subtle Full-Bleed Divider Line (Rata Kiri-Kanan) -->
          <div class="w-full h-px bg-neutral-200/80 dark:bg-neutral-800 my-3 shrink-0" />

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
                  class="px-6 pb-1 text-xs sm:text-sm font-bold text-neutral-600 dark:text-neutral-300  tracking-tight"
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
                      'flex items-center gap-3.5 px-3.5 py-2.5 rounded-xl  text-[15px] transition-colors duration-150 group',
                      isActive(item.to)
                        ? 'bg-[#1F52EB] text-white font-medium shadow-xs'
                        : 'text-neutral-600 dark:text-neutral-400 font-normal hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800/60'
                    ]"
                    @click="$emit('closeMobile')"
                  >
                    <HugeiconsIcon
                      :icon="item.icon"
                      :size="20"
                      :stroke-width="isActive(item.to) ? 2 : 1.75"
                      :class="[
                        'transition-colors duration-150 shrink-0',
                        isActive(item.to)
                          ? 'text-white'
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
import { HugeiconsIcon } from '@hugeicons/vue'
import {
  Home01Icon,
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
  RubiksCubeIcon
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

const isProfileMenuOpen = ref(false)

const currentRole = computed(() => authStore.currentUser?.role || 'UMKM')

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
          { to: '/dashboard', label: 'Beranda', icon: Home01Icon },
          { to: '/dashboard/progres', label: 'Catatan Kas', icon: Coins01Icon }
        ]
      },
      {
        title: 'Kelola Usaha',
        items: [
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
          { to: '/admin', label: 'Ringkasan', icon: Home01Icon },
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
