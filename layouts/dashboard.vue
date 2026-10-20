<template>
  <div class="h-screen flex bg-white dark:bg-[#0C121D] text-neutral-900 dark:text-neutral-100 font-poppins transition-colors overflow-hidden">
    <!-- Desktop & Mobile Drawer Sidebar (Stands Full Height, flush & level with top navbar) -->
    <DashboardSidebar class="h-full shrink-0" />

    <!-- Right Workspace Column (Navbar on Top + Main Content Scrollable Below) -->
    <div class="flex-1 flex flex-col min-w-0 h-full overflow-hidden relative">
      <!-- Top Workspace Navbar (Placed next to sidebar) -->
      <header class="w-full h-[52px] shrink-0 bg-[#FFFFFF] dark:bg-[#13161F] border-b border-[#E2E8F0] dark:border-neutral-800/80 px-4 sm:px-8 lg:px-12 xl:px-16 flex items-center justify-between select-none shadow-none z-30">
        <!-- Left Side: Mobile Menu Button + Page Title -->
        <div class="flex items-center gap-2.5 sm:gap-3 min-w-0">
          <!-- Mobile Menu Toggle Button (Only on < lg) -->
          <button
            type="button"
            class="lg:hidden w-9 h-9 rounded-[8px] flex items-center justify-center text-neutral-700 dark:text-neutral-200 hover:bg-neutral-200/60 dark:hover:bg-neutral-800/60 transition-colors active:scale-95 shrink-0"
            aria-label="Buka Menu Navigasi"
            @click="toggleMobile"
          >
            <HugeiconsIcon :icon="Menu01Icon" :size="20" :stroke-width="2.0" />
          </button>

          <!-- Page Title (Apple body-strong: 17px font-semibold) -->
          <h1 class="font-poppins font-semibold text-[16px] sm:text-[17px] text-neutral-900 dark:text-white leading-none truncate select-none pl-0.5">
            {{ currentPageInfo.title }}
          </h1>
        </div>

        <!-- Center: Advanced Search Bar in Top Navbar with Embedded Sector Filter (Khusus Role Investor) -->
        <AdvancedNavbarSearch
          v-if="isInvestorRole"
          class="flex-1 max-w-sm sm:max-w-md lg:max-w-xl mx-2 sm:mx-6 min-w-0"
        />

        <!-- Right Side: Notification & User Profile Account -->
        <div class="flex items-center gap-2 sm:gap-3 shrink-0">
          <!-- Interactive Notification Popover Component (UMKM FinTech & GoPay Tactile) -->
          <NotificationDropdown />

          <!-- User Account Profile Dropdown (Dicoding Style) -->
          <NavbarProfileDropdown />
        </div>
      </header>

      <!-- Main Dashboard Workspace Content (Centered Dicoding Layout with generous breathing room) -->
      <main
        :class="[
          'flex-1 w-full min-w-0 transition-colors bg-white dark:bg-[#0C121D]',
          isFixedLayout
            ? 'overflow-hidden flex flex-col h-full py-4 px-4 sm:px-8 lg:px-12 xl:px-16'
            : 'overflow-y-auto overflow-x-hidden px-4 sm:px-8 lg:px-12 xl:px-16 pt-6 pb-16'
        ]"
      >
        <div class="w-full max-w-7xl mx-auto flex flex-col flex-1">
          <div :class="isFixedLayout ? 'flex-1 min-h-0 flex flex-col overflow-hidden' : ''">
            <slot />
          </div>
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
import NavbarProfileDropdown from '~/components/layout/NavbarProfileDropdown.vue'
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
  Settings01Icon,
  CheckmarkCircle01Icon,
  Alert01Icon,
  StarIcon,
  UserAdd01Icon,
  UserCircleIcon,
  FileUnlockedIcon,
  Message01Icon
} from '@hugeicons/core-free-icons'

const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()
const umkmStore = useUmkmStore()
const { toggleMobile } = useSidebar()
const isFixedLayout = computed(() => {
  const p = route.path
  return (
    p === '/investor' ||
    p === '/investor/' ||
    p.startsWith('/investor/pesan') ||
    p.startsWith('/dashboard/pesan')
  )
})

const currentRole = computed(() => authStore.currentUser?.role || 'UMKM')
const isInvestorRole = computed(() => {
  return currentRole.value === 'INVESTOR' || route.path.startsWith('/investor')
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
      icon: Coins01Icon
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
    return { title: 'Daftar Klien', icon: UserGroupIcon }
  }
  if (p.startsWith('/konsultan/validasi')) {
    return { title: 'Validasi Kas', icon: CheckmarkCircle01Icon }
  }
  if (p.startsWith('/konsultan/alert')) {
    return { title: 'Peringatan', icon: Alert01Icon }
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
