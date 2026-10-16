<template>
  <div class="h-full flex flex-col shrink-0">
    <!-- Desktop Sidebar (Placed directly below Top Navbar) -->
    <aside
      :class="[
        'hidden lg:flex flex-col shrink-0 h-full z-20 select-none border-r',
        'transition-[width] duration-300 ease-[cubic-bezier(0.2,0,0,1)] will-change-[width]',
        isCollapsed ? 'w-[72px]' : 'w-72',
        'bg-[#F6F8FA] dark:bg-[#13161F] border-neutral-200/80 dark:border-neutral-800/80 shadow-[1px_0_10px_rgba(0,0,0,0.02)]'
      ]"
    >
      <div class="flex flex-col h-full overflow-hidden">
        <!-- Top of Sidebar: Collapse / Expand Button Container -->
        <div
          :class="[
            'h-12 border-b border-neutral-200/80 dark:border-neutral-800/80 shrink-0 px-3.5 flex items-center transition-all duration-300 ease-[cubic-bezier(0.2,0,0,1)]',
            isCollapsed ? 'justify-center' : 'justify-between'
          ]"
        >
          <!-- Category label when expanded -->
          <span
            :class="[
              'text-[11px] font-semibold text-neutral-400 dark:text-neutral-500 font-poppins uppercase tracking-wider pl-1 overflow-hidden whitespace-nowrap transition-all duration-300 ease-[cubic-bezier(0.2,0,0,1)]',
              isCollapsed ? 'max-w-0 opacity-0 pointer-events-none' : 'max-w-[140px] opacity-100'
            ]"
          >
            Menu Navigasi
          </span>

          <!-- Collapse / Expand Toggle Button -->
          <button
            type="button"
            :class="[
              'w-8 h-8 rounded-lg flex items-center justify-center text-neutral-400 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-white hover:bg-neutral-200/60 dark:hover:bg-neutral-800/60 transition-all duration-200 active:scale-95 shrink-0 cursor-pointer',
              isCollapsed ? 'mx-auto' : 'ml-auto'
            ]"
            :title="isCollapsed ? 'Perluas Sidebar (Ctrl+B)' : 'Ciutkan Sidebar (Ctrl+B)'"
            :aria-label="isCollapsed ? 'Perluas Sidebar' : 'Ciutkan Sidebar'"
            @click="toggleCollapse"
          >
            <HugeiconsIcon
              :icon="SidebarLeft01Icon"
              :size="18"
              :stroke-width="1.8"
              :class="['transition-transform duration-300 ease-[cubic-bezier(0.2,0,0,1)]', isCollapsed ? 'rotate-180' : '']"
            />
          </button>
        </div>

        <!-- Navigation Items List (Categorized, Constant Y Coordinates, Fluid Horizontal Shrink) -->
        <div class="flex-1 overflow-y-auto overflow-x-hidden scrollbar-none pt-3 pb-2 px-3.5 overscroll-contain">
          <nav class="space-y-3" aria-label="Menu Utama">
            <div
              v-for="(section, sIdx) in navigationSections"
              :key="`sec-${sIdx}`"
              class="space-y-1"
            >
              <!-- Hairline section divider (Constant height & vertical margin) -->
              <div
                v-if="sIdx > 0"
                class="h-px bg-neutral-200/80 dark:bg-neutral-800 my-2 shrink-0 w-full"
              />

              <!-- Section Category Title (Constant height, fades out without vertical jumping) -->
              <div
                v-if="section.title"
                class="h-5 mb-1 flex items-center overflow-hidden whitespace-nowrap font-poppins"
              >
                <span
                  :class="[
                    'text-[11px] font-semibold text-neutral-400 dark:text-neutral-500 uppercase tracking-wider transition-opacity duration-300 px-1',
                    isCollapsed ? 'opacity-0' : 'opacity-100'
                  ]"
                >
                  {{ section.title }}
                </span>
              </div>

              <!-- Unified Navigation Items: Icon position is completely stable, active container wraps icon -->
              <div class="space-y-1">
                <NuxtLink
                  v-for="item in section.items"
                  :key="item.to"
                  :to="item.to"
                  :title="isCollapsed ? item.label : undefined"
                  :class="[
                    'w-full h-11 flex items-center font-poppins transition-all duration-300 ease-[cubic-bezier(0.2,0,0,1)] group relative border overflow-hidden rounded-xl p-0',
                    isActive(item.to)
                      ? 'bg-[#E1F4FD] hover:bg-[#D5EEFA] dark:bg-[#0081A0]/20 dark:hover:bg-[#0081A0]/30 text-[#0081A0] dark:text-[#38BDF8] font-semibold border-[#0081A0]/25 dark:border-[#38BDF8]/30 shadow-2xs'
                      : 'text-neutral-600 dark:text-neutral-400 font-normal hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-200/50 dark:hover:bg-neutral-800/50 border-transparent'
                  ]"
                >
                  <!-- Icon Container: Always exactly 44x44px anchored on left, icon never moves or resizes -->
                  <div class="w-11 h-11 shrink-0 flex items-center justify-center">
                    <SidebarNavIcon
                      :to="item.to"
                      :outline-icon="item.icon"
                      :active="isActive(item.to)"
                    />
                  </div>

                  <!-- Label Container: Fluid horizontal collapse, NO vertical movement, NO text wrapping -->
                  <div
                    :class="[
                      'overflow-hidden whitespace-nowrap transition-all duration-300 ease-[cubic-bezier(0.2,0,0,1)] flex items-center text-[15px]',
                      isCollapsed
                        ? 'max-w-0 opacity-0 pointer-events-none'
                        : 'max-w-[190px] opacity-100 pl-1 pr-3 pointer-events-auto'
                    ]"
                  >
                    <span class="truncate leading-none">{{ item.label }}</span>
                  </div>
                </NuxtLink>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </aside>

    <!-- Mobile Drawer Overlay & Panel (Responsive Parity with GoPay Tactile & Poppins typography) -->
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

        <!-- Slide-out Drawer Panel in Tactile Background -->
        <div class="relative w-80 max-w-[88vw] bg-[#F6F8FA] dark:bg-[#13161F] h-full flex flex-col shadow-2xl z-10 py-6 overflow-hidden border-r border-neutral-200/90 dark:border-neutral-800">
          <!-- Mobile Header (Brand Text & Close Button) -->
          <div class="h-[52px] flex items-center justify-between mb-3 px-4 border-b border-neutral-200/80 dark:border-neutral-800 shrink-0">
            <NuxtLink
              :to="homePath"
              class="flex items-center gap-2 min-w-0 cursor-pointer select-none group"
              title="Kembali ke Beranda"
              @click="handleBrandClick"
            >
              <img
                src="/logo/logoSmall.svg"
                alt="Beruang Logo"
                class="h-6 w-auto object-contain"
              />
              <span class="font-heading font-extrabold text-base tracking-tight leading-none select-none">
                <span class="text-[#0081A0] dark:text-[#00A5CC]">Ber</span><span class="text-[#00AA13] dark:text-[#22C55E]">uang</span>
              </span>
            </NuxtLink>
            <button
              type="button"
              class="p-2 rounded-xl text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 hover:bg-neutral-200/60 dark:hover:bg-neutral-800 transition-colors active:scale-[0.96]"
              aria-label="Tutup Menu"
              @click="$emit('closeMobile')"
            >
              <HugeiconsIcon :icon="Cancel01Icon" :size="18" :stroke-width="2" />
            </button>
          </div>

          <!-- Mobile Nav Items (Categorized with Poppins typography) -->
          <div class="flex-1 overflow-y-auto scrollbar-none py-1">
            <nav class="space-y-3">
              <div
                v-for="(section, sIdx) in navigationSections"
                :key="`mob-sec-${sIdx}`"
                class="space-y-1"
              >
                <!-- Hairline section divider -->
                <div
                  v-if="sIdx > 0"
                  class="w-full h-px bg-neutral-200/80 dark:bg-neutral-800 my-2 shrink-0"
                />

                <!-- Section Category Title -->
                <div
                  v-if="section.title"
                  class="px-5 pb-1 text-[11px] font-semibold text-neutral-400 dark:text-neutral-500 font-poppins uppercase tracking-wider"
                >
                  {{ section.title }}
                </div>

                <!-- Section Items (Full row directly in blue, icon size 20, text 15px, NO dots) -->
                <div class="space-y-0.5 px-3">
                  <NuxtLink
                    v-for="item in section.items"
                    :key="`mob-${item.to}`"
                    :to="item.to"
                    :class="[
                      'flex items-center gap-3.5 px-3.5 py-2.5 rounded-xl font-poppins text-[15px] transition-all duration-150 group border',
                      isActive(item.to)
                        ? 'bg-[#E1F4FD] hover:bg-[#D5EEFA] dark:bg-[#0081A0]/20 dark:hover:bg-[#0081A0]/30 text-[#0081A0] dark:text-[#38BDF8] font-semibold border-[#0081A0]/25 dark:border-[#38BDF8]/30 shadow-2xs'
                        : 'text-neutral-600 dark:text-neutral-400 font-normal hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-200/50 dark:hover:bg-neutral-800/50 border-transparent'
                    ]"
                    @click="$emit('closeMobile')"
                  >
                    <SidebarNavIcon
                      :to="item.to"
                      :outline-icon="item.icon"
                      :active="isActive(item.to)"
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
import { computed, watch, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useAuthStore } from '~/stores/auth'
import { useUmkmStore } from '~/stores/umkm'
import { HugeiconsIcon } from '@hugeicons/vue'
import SidebarNavIcon from './SidebarNavIcon.vue'
import {
  Home03Icon,
  Task01Icon,
  AnalyticsUpIcon,
  Coins01Icon,
  Award01Icon,
  UserGroupIcon,
  UserIcon,
  Store01Icon,
  CheckmarkCircle01Icon,
  Alert01Icon,
  StarIcon,
  UserAdd01Icon,
  Cancel01Icon,
  RubiksCubeIcon,
  UserCircleIcon,
  SidebarLeft01Icon
} from '@hugeicons/core-free-icons'

defineProps<{
  isMobileOpen?: boolean
}>()

const emit = defineEmits<{
  (e: 'closeMobile'): void
}>()

const route = useRoute()
const authStore = useAuthStore()
const umkmStore = useUmkmStore()

// State Collapse & Mobile Drawer from useSidebar composable
const { isCollapsed, isMobileOpen, closeMobile, toggleCollapse } = useSidebar()

function handleCloseMobile() {
  closeMobile()
  emit('closeMobile')
}

onMounted(() => {
  if (import.meta.client) {
    // Sinkronisasi avatar user dari localStorage/umkmStore
    if (typeof umkmStore.initAvatarFromStorage === 'function') {
      umkmStore.initAvatarFromStorage()
    }
    if (umkmStore.profile.ownerAvatarUrl && authStore.currentUser) {
      authStore.updateAvatar(umkmStore.profile.ownerAvatarUrl)
    }
  }
})

// Sinkronkan update avatar dari umkmStore ke authStore secara real-time
watch(
  () => umkmStore.profile.ownerAvatarUrl,
  (newAvatar) => {
    if (newAvatar && authStore.currentUser) {
      authStore.updateAvatar(newAvatar)
    }
  }
)

const currentRole = computed(() => {
  if (route.path.startsWith('/konsultan')) return 'CONSULTANT'
  if (route.path.startsWith('/investor')) return 'INVESTOR'
  if (route.path.startsWith('/admin')) return 'ADMIN'
  return authStore.currentUser?.role || 'UMKM'
})

const homePath = computed(() => {
  if (currentRole.value === 'CONSULTANT') return '/konsultan'
  if (currentRole.value === 'INVESTOR') return '/investor'
  if (currentRole.value === 'ADMIN') return '/admin'
  return '/dashboard'
})

const handleBrandClick = (e: MouseEvent) => {
  emit('closeMobile')
  if (route.path === homePath.value) {
    e.preventDefault()
    window.location.reload()
  }
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
          { to: '/konsultan', label: 'Dashboard', icon: Home03Icon },
          { to: '/konsultan/klien', label: 'Klien', icon: UserIcon },
          { to: '/konsultan/rencana-aksi', label: 'Rencana Aksi', icon: Task01Icon },
          { to: '/konsultan/validasi', label: 'Validasi Kas', icon: CheckmarkCircle01Icon }
        ]
      },
      {
        title: 'Manajemen',
        items: [
          { to: '/konsultan/alert', label: 'Peringatan Masalah', icon: Alert01Icon },
          { to: '/konsultan/profil', label: 'Profil & Dokumen', icon: UserCircleIcon }
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
