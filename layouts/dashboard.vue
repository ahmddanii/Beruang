<template>
  <div class="h-screen flex bg-[#F3F8FC] dark:bg-[#0C121D] text-neutral-900 dark:text-neutral-100 font-sans transition-colors overflow-hidden">
    <!-- Desktop & Mobile Drawer Sidebar (Stands Full Height, flush & level with top navbar) -->
    <DashboardSidebar class="h-full shrink-0" />

    <!-- Right Workspace Column (Navbar on Top + Main Content Scrollable Below) -->
    <div class="flex-1 flex flex-col min-w-0 h-full overflow-hidden relative">
      <!-- Top Workspace Navbar (Placed next to sidebar) -->
      <header class="w-full h-14 sm:h-16 shrink-0 bg-[#F6F8FA]/95 dark:bg-[#13161F]/95 backdrop-blur-md border-b border-neutral-200/80 dark:border-neutral-800/80 px-4 sm:px-6 lg:px-8 flex items-center justify-between select-none shadow-xs z-30">
        <!-- Left Side: Mobile Menu Button + Page Title (Desktop) or Brand Logo (Mobile) -->
        <div class="flex items-center gap-2.5 sm:gap-3 min-w-0">
          <!-- Mobile Menu Toggle Button (Only on < lg) -->
          <button
            type="button"
            class="lg:hidden p-2 rounded-xl text-neutral-700 dark:text-neutral-200 hover:bg-neutral-200/60 dark:hover:bg-neutral-800/60 transition-colors active:scale-95 shrink-0"
            aria-label="Buka Menu Navigasi"
            @click="toggleMobile"
          >
            <HugeiconsIcon :icon="Menu01Icon" :size="20" :stroke-width="1.75" />
          </button>

          <!-- On mobile: show Beruang brand logo; on desktop: show Page Title! -->
          <NuxtLink
            :to="homePath"
            class="lg:hidden flex items-center gap-2 cursor-pointer select-none group shrink-0"
            title="Beranda Beruang"
            @click="handleBrandClick"
          >
            <img
              src="/logo/logoSmall.svg"
              alt="Beruang Logo"
              class="h-6 w-auto object-contain transition-transform duration-150 group-hover:scale-105"
            />
            <span class="font-heading font-extrabold text-base sm:text-lg tracking-tight leading-none select-none">
              <span class="text-[#156374] dark:text-[#50AABF]">Ber</span><span class="text-[#00800e] dark:text-[#00C058]">uang</span>
            </span>
          </NuxtLink>

          <!-- Page Title (Desktop: Apple body-strong) -->
          <h1 class="hidden lg:block font-poppins font-semibold text-[16px] sm:text-[17px] text-neutral-900 dark:text-white leading-none truncate select-none pl-0.5">
            {{ currentPageInfo.title }}
          </h1>
        </div>

        <!-- Center: Advanced Search Bar in Top Navbar with Embedded Sector Filter -->
        <AdvancedNavbarSearch class="flex-1 max-w-sm sm:max-w-md lg:max-w-xl mx-2 sm:mx-6 min-w-0" />

        <!-- Right Side: Notification + User Profile Trigger & Dropdown Menu -->
        <div class="flex items-center gap-2.5 sm:gap-3 shrink-0">
          <!-- 1. Interactive Notification Popover Component (UMKM FinTech & GoPay Tactile) -->
          <NotificationDropdown />

          <!-- 2. User Profile Trigger & Popover Dropdown Card -->
          <div class="relative">
            <button
              type="button"
              class="relative w-9 h-9 sm:w-10 sm:h-10 rounded-full border-2 border-neutral-200/90 dark:border-neutral-700/80 p-0.5 hover:ring-2 hover:ring-[#2091AA]/30 dark:hover:ring-[#50AABF]/30 transition-all duration-150 active:scale-95 cursor-pointer shadow-2xs overflow-hidden group bg-white dark:bg-[#18191E] flex items-center justify-center"
              aria-label="Buka Menu Profil & Pengaturan"
              title="Menu Akun & Pengaturan"
              @click="isProfileDropdownOpen = !isProfileDropdownOpen"
            >
              <img
                :src="userAvatarUrl"
                :alt="authStore.currentUser?.name || 'Foto Profil'"
                class="w-full h-full rounded-full object-cover"
                @error="(e: any) => { e.target.src = '/images/user-profile.png' }"
              />
            </button>

            <!-- Backdrop overlay to dismiss dropdown when clicked outside -->
            <div
              v-if="isProfileDropdownOpen"
              class="fixed inset-0 z-40 bg-transparent"
              @click="isProfileDropdownOpen = false"
            />

            <!-- Profile Dropdown Popover Card -->
            <div
              v-if="isProfileDropdownOpen"
              class="absolute top-full right-0 mt-2.5 w-72 sm:w-80 bg-white dark:bg-[#18191E] border border-neutral-200/90 dark:border-neutral-800 rounded-2xl shadow-2xl z-50 overflow-hidden font-poppins animate-in fade-in zoom-in-95 duration-150"
            >
              <!-- Centered Avatar, Name & Email Header -->
              <div class="pt-6 pb-4 px-4 flex flex-col items-center text-center">
                <div class="w-16 h-16 sm:w-20 sm:h-20 rounded-full p-1 bg-white dark:bg-[#151922] border border-neutral-200/80 dark:border-neutral-700 shadow-sm overflow-hidden mb-3">
                  <img
                    :src="userAvatarUrl"
                    :alt="authStore.currentUser?.name || 'Foto Profil'"
                    class="w-full h-full rounded-full object-cover"
                    @error="(e: any) => { e.target.src = '/images/user-profile.png' }"
                  />
                </div>
                <h3 class="font-poppins font-bold text-base sm:text-lg text-neutral-900 dark:text-white leading-tight">
                  {{ authStore.currentUser?.name || 'Fikri Setiawan' }}
                </h3>
                <p class="font-poppins text-xs text-neutral-500 dark:text-neutral-400 mt-1 truncate max-w-[240px]">
                  {{ authStore.currentUser?.email || 'fikrisnpmb2024@gmail.com' }}
                </p>
              </div>

              <!-- Menu Navigation Items (Profil & Pengaturan with Arrow ↗) -->
              <div class="border-t border-neutral-100 dark:border-neutral-800/80 py-1 px-1.5">
                <NuxtLink
                  :to="profileRoute"
                  class="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-neutral-700 dark:text-neutral-200 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100/80 dark:hover:bg-neutral-800/70 transition-colors group cursor-pointer"
                  @click="isProfileDropdownOpen = false"
                >
                  <div class="flex items-center gap-3">
                    <HugeiconsIcon :icon="UserCircleIcon" :size="19" :stroke-width="1.8" class="text-neutral-500 dark:text-neutral-400 group-hover:text-neutral-900 dark:group-hover:text-white transition-colors" />
                    <span class="text-xs sm:text-sm font-medium">Profil</span>
                  </div>
                  <HugeiconsIcon :icon="ArrowUpRight01Icon" :size="16" :stroke-width="2" class="text-neutral-400 group-hover:text-neutral-700 dark:group-hover:text-neutral-200 transition-colors" />
                </NuxtLink>

                <NuxtLink
                  :to="settingsRoute"
                  class="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-neutral-700 dark:text-neutral-200 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100/80 dark:hover:bg-neutral-800/70 transition-colors group cursor-pointer"
                  @click="isProfileDropdownOpen = false"
                >
                  <div class="flex items-center gap-3">
                    <HugeiconsIcon :icon="PreferenceHorizontalIcon" :size="19" :stroke-width="1.8" class="text-neutral-500 dark:text-neutral-400 group-hover:text-neutral-900 dark:group-hover:text-white transition-colors" />
                    <span class="text-xs sm:text-sm font-medium">Pengaturan</span>
                  </div>
                  <HugeiconsIcon :icon="ArrowUpRight01Icon" :size="16" :stroke-width="2" class="text-neutral-400 group-hover:text-neutral-700 dark:group-hover:text-neutral-200 transition-colors" />
                </NuxtLink>
              </div>

              <!-- Debugging Role Switcher -->
              <div class="border-t border-neutral-100 dark:border-neutral-800/80 py-2 px-2 bg-neutral-50/70 dark:bg-neutral-900/40">
                <div class="px-2.5 pb-1.5 flex items-center justify-between">
                  <span class="text-[10px] font-semibold text-neutral-400 dark:text-neutral-500 uppercase tracking-wider">
                    Ganti Peran (Debug & Test)
                  </span>
                  <span class="text-[9px] px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-600 dark:text-amber-400 font-mono font-medium">
                    DEBUG
                  </span>
                </div>
                <div class="space-y-0.5">
                  <button
                    v-for="role in rolesList"
                    :key="role.id"
                    type="button"
                    :class="[
                      'w-full flex items-center justify-between px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer text-left',
                      authStore.currentUser?.role === role.id
                        ? 'bg-white dark:bg-neutral-800 text-[#2091AA] dark:text-[#50AABF] font-semibold shadow-2xs'
                        : 'text-neutral-600 dark:text-neutral-400 hover:bg-white/80 dark:hover:bg-neutral-800/60'
                    ]"
                    @click="switchRole(role.id, role.path)"
                  >
                    <span>{{ role.name }}</span>
                    <span
                      v-if="authStore.currentUser?.role === role.id"
                      class="w-1.5 h-1.5 rounded-full bg-[#2091AA] dark:bg-[#50AABF]"
                    />
                  </button>
                </div>
              </div>

              <!-- Logout / Keluar -->
              <div class="border-t border-neutral-100 dark:border-neutral-800/80 p-1.5">
                <NuxtLink
                  to="/masuk"
                  class="w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-medium text-red-500 hover:text-red-600 hover:bg-red-50/80 dark:hover:bg-red-950/20 transition-colors cursor-pointer"
                  @click="isProfileDropdownOpen = false"
                >
                  <HugeiconsIcon :icon="Logout01Icon" :size="16" :stroke-width="2" class="text-red-500" />
                  <span>Keluar</span>
                </NuxtLink>
              </div>
            </div>
          </div>
        </div>
      </header>

      <!-- Main Dashboard Workspace Content (Fluid full-width layout matching Trueform references) -->
      <main
        :class="[
          'flex-1 w-full min-w-0 transition-all',
          isFixedLayout
            ? 'overflow-hidden flex flex-col h-full py-4 sm:py-5 px-4 sm:px-8 lg:px-10 xl:px-12'
            : 'overflow-y-auto overflow-x-hidden px-6 sm:px-10 lg:pl-16 lg:pr-12 xl:pl-20 xl:pr-16 py-7 sm:py-9'
        ]"
      >
        <!-- Page Header: Current Page Name & Icon at the Very Top of Main Container -->
        <div
          v-if="!route.meta.hideHeader"
          :class="[
            'select-none',
            isFixedLayout ? 'mb-3 sm:mb-4 shrink-0' : 'mb-6 sm:mb-8'
          ]"
        >
          <div class="flex items-center gap-2.5 sm:gap-3">
            <SidebarNavIcon
              :to="route.path"
              :outline-icon="currentPageInfo.icon"
              :active="true"
              :size="26"
              class="shrink-0 text-[#2091AA] dark:text-[#50AABF]"
            />
            <h1 class="font-heading font-bold text-xl sm:text-2xl lg:text-[28px] text-neutral-900 dark:text-white tracking-tight leading-none">
              {{ currentPageInfo.title }}
            </h1>
          </div>
          <p v-if="currentPageInfo.description" class="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 mt-2 sm:mt-2.5 font-poppins leading-relaxed max-w-3xl">
            {{ currentPageInfo.description }}
          </p>
        </div>

        <div :class="isFixedLayout ? 'flex-1 min-h-0 flex flex-col overflow-hidden' : ''">
          <slot />
        </div>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore, type UserRole } from '~/stores/auth'
import { useUmkmStore } from '~/stores/umkm'
import DashboardSidebar from '~/components/layout/DashboardSidebar.vue'
import NotificationDropdown from '~/components/layout/NotificationDropdown.vue'
import SidebarNavIcon from '~/components/layout/SidebarNavIcon.vue'
import AdvancedNavbarSearch from '~/components/search/AdvancedNavbarSearch.vue'
import { HugeiconsIcon } from '@hugeicons/vue'
import {
  Menu01Icon,
  Notification01Icon,
  Home03Icon,
  Coins01Icon,
  Task01Icon,
  AnalyticsUpIcon,
  Store01Icon,
  Award01Icon,
  UserGroupIcon,
  UserIcon,
  Settings01Icon,
  CheckmarkCircle01Icon,
  Alert01Icon,
  StarIcon,
  UserAdd01Icon,
  UserCircleIcon,
  PreferenceHorizontalIcon,
  ArrowUpRight01Icon,
  Logout01Icon,
  FileUnlockedIcon,
  Message01Icon,
  Search01Icon
} from '@hugeicons/core-free-icons'
import { useInvestorStore } from '~/stores/investor'

const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()
const umkmStore = useUmkmStore()
const investorStore = useInvestorStore()
const { isCollapsed, toggleCollapse, toggleMobile } = useSidebar()

const searchPlaceholder = computed(() => {
  if (route.path.startsWith('/investor')) {
    return 'Cari toko UMKM, sektor, kota, atau kata kunci...'
  }
  return 'Cari toko, catatan kas, atau laporan...'
})

function handleNavbarSearchEnter() {
  if (!route.path.startsWith('/investor')) {
    router.push('/investor')
  }
}

const isProfileDropdownOpen = ref(false)

watch(() => route.path, () => {
  isProfileDropdownOpen.value = false
})

const isFixedLayout = computed(() => {
  const p = route.path
  return (
    p === '/investor' ||
    p === '/investor/' ||
    p.startsWith('/investor/pesan') ||
    p.startsWith('/dashboard/pesan')
  )
})

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
  if (route.path === homePath.value) {
    e.preventDefault()
    window.location.reload()
  }
}

const userAvatarUrl = computed(() => {
  if (currentRole.value === 'CONSULTANT') {
    return '/images/user-profile.png'
  }
  if (authStore.currentUser?.role === 'UMKM') {
    return (
      umkmStore.profile.ownerAvatarUrl ||
      authStore.currentUser?.avatar ||
      '/images/user-profile.png'
    )
  }
  return authStore.currentUser?.avatar || '/images/user-profile.png'
})

const userRoleDisplay = computed(() => {
  const role = currentRole.value
  if (role === 'CONSULTANT') return 'Konsultan'
  if (role === 'INVESTOR') return 'Investor'
  if (role === 'ADMIN') return 'Administrator'
  return 'Pelaku UMKM'
})

const profileRoute = computed(() => {
  const role = authStore.currentUser?.role
  if (role === 'UMKM') return '/dashboard/profile'
  if (role === 'CONSULTANT') return '/konsultan/profil'
  if (role === 'INVESTOR') return '/investor/pengaturan'
  return '/dashboard/profile'
})

const settingsRoute = computed(() => {
  const role = authStore.currentUser?.role
  if (role === 'CONSULTANT') return '/konsultan/pengaturan'
  if (role === 'INVESTOR') return '/investor/pengaturan'
  return '/dashboard/pengaturan'
})

const rolesList: { id: UserRole; name: string; path: string }[] = [
  { id: 'UMKM', name: 'Pelaku Usaha (UMKM)', path: '/dashboard' },
  { id: 'CONSULTANT', name: 'Konsultan Ahli', path: '/konsultan' },
  { id: 'INVESTOR', name: 'Investor / Funder', path: '/investor' },
  { id: 'ADMIN', name: 'Admin Platform', path: '/admin' }
]

function switchRole(newRole: UserRole, targetPath: string) {
  authStore.setRole(newRole)
  isProfileDropdownOpen.value = false
  router.push(targetPath)
}

const currentPageInfo = computed(() => {
  const p = route.path
  if (p === '/dashboard' || p === '/dashboard/') {
    return { title: 'Beranda', icon: Home03Icon }
  }
  if (p.startsWith('/dashboard/profile')) {
    return { title: 'Profil Usaha', icon: UserCircleIcon }
  }
  if (p.startsWith('/dashboard/progres')) {
    return {
      title: 'Catatan Kas',
      icon: Coins01Icon,
      description: 'Pencatatan mutasi kas harian, uang masuk penjualan, modal belanja bahan baku, dan biaya operasional tokomu untuk memantau kesehatan keuangan usaha.'
    }
  }
  if (p.startsWith('/dashboard/rencana-aksi')) {
    return { title: 'Rencana Aksi', icon: Task01Icon }
  }
  if (p.startsWith('/dashboard/penilaian')) {
    return { title: 'Cek Kesehatan', icon: AnalyticsUpIcon }
  }
  if (p.startsWith('/dashboard/profil-publik')) {
    return { title: 'Toko Publik', icon: Store01Icon }
  }
  if (p.startsWith('/dashboard/pendanaan')) {
    return { title: 'Cari Modal', icon: Award01Icon }
  }
  if (p.startsWith('/dashboard/pesan')) {
    return {
      title: 'Pesan',
      icon: Message01Icon,
      description: 'Ruang komunikasi dan diskusi pendanaan langsung dengan calon investor tokomu.'
    }
  }
  if (p.startsWith('/dashboard/permintaan-investor') || p.startsWith('/dashboard/notifikasi')) {
    return { title: 'Notifikasi', icon: Notification01Icon }
  }
  if (p.startsWith('/dashboard/pengaturan')) {
    return { title: 'Pengaturan Usaha', icon: Settings01Icon }
  }

  // Konsultan pages
  if (p === '/konsultan' || p === '/konsultan/') {
    return { title: 'Dashboard', icon: Home03Icon }
  }
  if (p === '/konsultan/klien' || p === '/konsultan/klien/') {
    return { title: 'Klien', icon: UserIcon }
  }
  if (p.startsWith('/konsultan/request')) {
    return { title: 'Permintaan Masuk', icon: UserAdd01Icon }
  }
  if (p.startsWith('/konsultan/rencana-aksi')) {
    return { title: 'Rencana Aksi', icon: Task01Icon }
  }
  if (p.startsWith('/konsultan/profil')) {
    return { title: 'Profil & Dokumen', icon: UserCircleIcon }
  }
  if (p.startsWith('/konsultan/validasi')) {
    return { title: 'Validasi Kas', icon: CheckmarkCircle01Icon }
  }
  if (p.startsWith('/konsultan/klien/perjanjian')) {
    return { title: 'Perjanjian Pendampingan', icon: Award01Icon }
  }
  if (p.startsWith('/konsultan/klien/')) {
    return { title: 'Diagnosa Klien UMKM', icon: AnalyticsUpIcon }
  }
  if (p.startsWith('/konsultan/pengaturan')) {
    return { title: 'Pengaturan Konsultan', icon: Settings01Icon }
  }

  // Investor pages
  if (p === '/investor' || p === '/investor/') {
    return { title: 'Katalog Usaha', icon: Store01Icon }
  }
  if (p.startsWith('/investor/pesan')) {
    return {
      title: 'Pesan',
      icon: Message01Icon,
      description: 'Diskusi langsung dengan pendiri UMKM dan tindak lanjut pendanaan usaha.'
    }
  }
  if (p.startsWith('/investor/data-room')) {
    return {
      title: 'Virtual Data Room',
      icon: FileUnlockedIcon,
      description: 'Ruang audit finansial privat terenkripsi dengan laporan laba rugi riil, rekening koran bank, dan bukti legalitas usaha.'
    }
  }
  if (p.startsWith('/investor/watchlist')) {
    return { title: 'Disimpan', icon: StarIcon }
  }
  if (p.startsWith('/investor/umkm/')) {
    return { title: 'Detail Prospek UMKM', icon: Store01Icon }
  }
  if (p.startsWith('/investor/pengaturan')) {
    return { title: 'Pengaturan Investor', icon: Settings01Icon }
  }

  // Admin pages
  if (p === '/admin' || p === '/admin/') {
    return { title: 'Ringkasan', icon: Home03Icon }
  }
  if (p.startsWith('/admin/penugasan')) {
    return { title: 'Penugasan Konsultan', icon: UserAdd01Icon }
  }
  if (p.startsWith('/admin/pengguna')) {
    return { title: 'Kelola Pengguna', icon: UserGroupIcon }
  }

  return { title: 'Beranda', icon: Home03Icon }
})
</script>
