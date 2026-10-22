<template>
  <div class="h-screen flex flex-col bg-white dark:bg-[#0C121D] text-neutral-900 dark:text-neutral-100 font-poppins transition-colors overflow-hidden">
    <!-- Top Workspace Navbar (Full Width Across Top) -->
    <header class="w-full h-16 shrink-0 bg-[#FFFFFF] dark:bg-[#13161F] border-b border-[#E2E8F0] dark:border-neutral-800/80 px-4 sm:px-6 lg:px-8 flex items-center justify-between select-none shadow-none z-30">
      <!-- Left Side: Mobile Menu Button + Brand Logo & Name: Beruang -->
      <div class="flex items-center gap-2.5 sm:gap-3 min-w-0">
        <!-- Mobile Menu Toggle Button (Only on < lg) -->
        <button
          type="button"
          class="lg:hidden w-11 h-11 min-w-[44px] min-h-[44px] rounded-[8px] flex items-center justify-center text-neutral-700 dark:text-neutral-200 hover:bg-neutral-200/60 dark:hover:bg-neutral-800/60 transition-colors shrink-0 cursor-pointer"
          aria-label="Buka Menu Navigasi"
          @click="toggleMobile"
        >
          <HugeiconsIcon :icon="Menu01Icon" :size="20" :stroke-width="2.0" />
        </button>

        <!-- Brand Logo & Name: Beruang -->
        <NuxtLink
          :to="homePath"
          class="flex items-center gap-2.5 min-h-[44px] cursor-pointer select-none group shrink-0"
          title="Beranda Beruang"
          @click="handleBrandClick"
        >
          <img
            src="/logo/logoSmall.svg"
            alt="Beruang Logo"
            class="h-7 w-auto object-contain"
          />
          <span class="font-heading font-bold text-xl tracking-[-0.02em] leading-none select-none">
            <span class="text-[#156374] dark:text-[#50AABF]">Ber</span><span class="text-[#00800e] dark:text-[#00C058]">uang</span>
          </span>
        </NuxtLink>
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

    <!-- Body Layout: Sidebar placed below navbar on left + Main Content on right -->
    <div class="flex-1 flex min-h-0 overflow-hidden relative">
      <!-- Desktop & Mobile Drawer Sidebar (placed below navbar) -->
      <DashboardSidebar class="h-full shrink-0 relative z-20" />

      <!-- Main Dashboard Workspace Content (Centered Dicoding Layout with generous breathing room) -->
      <main
        ref="mainContentRef"
        :class="[
          'flex-1 w-full min-w-0 transition-colors bg-white dark:bg-[#0C121D]',
          isFixedLayout
            ? 'overflow-hidden flex flex-col h-full py-4 px-4 sm:px-8 lg:px-12 xl:px-16'
            : 'overflow-y-auto overflow-x-hidden px-4 sm:px-8 lg:px-12 xl:px-16 pt-6 sm:pt-8 pb-16'
        ]"
      >
        <div class="w-full max-w-7xl mx-auto flex flex-col flex-1">
          <!-- Page Header: Title + Icon at the very top of main container -->
          <div
            v-if="!route.meta.hideHeader"
            class="flex items-center gap-2 sm:gap-2.5 mb-6 sm:mb-8 select-none"
          >
            <HugeiconsIcon
              :icon="currentPageInfo.icon"
              :size="20"
              :stroke-width="2.2"
              class="text-neutral-900 dark:text-white shrink-0"
            />
            <h1 class="font-poppins font-semibold text-lg sm:text-xl text-neutral-900 dark:text-white tracking-tight leading-tight">
              {{ currentPageInfo.title }}
            </h1>
          </div>

          <div :class="isFixedLayout ? 'flex-1 min-h-0 flex flex-col overflow-hidden' : ''">
            <slot />
          </div>
        </div>
      </main>

      <!-- Persistent Floating LinkedIn Chat Dock at Bottom-Right (Hidden on Messages Page) -->
      <LinkedInChatDock v-if="!isMessagesPage" />
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
import LinkedInChatDock from '~/components/layout/LinkedInChatDock.vue'
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
const mainContentRef = ref<HTMLElement | null>(null)

watch(() => route.path, () => {
  nextTick(() => {
    if (mainContentRef.value) {
      mainContentRef.value.scrollTop = 0
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  })
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

const isMessagesPage = computed(() => {
  return route.path.includes('/pesan')
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
    return {
      title: 'Beranda',
      icon: Home03Icon,
      description: 'Pantau kesehatan kas, kemajuan rencana aksi, dan kesiapan tokomu untuk menarik pendanaan investor.'
    }
  }
  if (p.startsWith('/dashboard/profile')) {
    return {
      title: 'Profil Usaha',
      icon: UserCircleIcon,
      description: 'Kelola data legalitas, profil brand, dan identitas tokomu agar terverifikasi kredibel.'
    }
  }
  if (p.startsWith('/dashboard/progres')) {
    return {
      title: 'Catatan Kas',
      icon: Coins01Icon,
      description: 'Pencatatan mutasi kas harian, uang masuk penjualan, modal belanja bahan baku, dan biaya operasional tokomu.'
    }
  }
  if (p.startsWith('/dashboard/rencana-aksi')) {
    return {
      title: 'Rencana Aksi',
      icon: Task01Icon,
      description: 'Langkah strategis terarah untuk meningkatkan skor kesiapan dan daya tarik tokomu bagi calon investor.'
    }
  }
  if (p.startsWith('/dashboard/penilaian')) {
    return {
      title: 'Cek Kesehatan',
      icon: AnalyticsUpIcon,
      description: 'Diagnosa komprehensif kesehatan finansial tokomu berdasarkan data kas dan kepatuhan administrasi.'
    }
  }
  if (p.startsWith('/dashboard/profil-publik')) {
    return {
      title: 'Toko Publik',
      icon: Store01Icon,
      description: 'Pratinjau profil tokomu sebagaimana dilihat oleh calon mitra dan investor.'
    }
  }
  if (p.startsWith('/dashboard/pendanaan')) {
    return {
      title: 'Cari Modal',
      icon: Award01Icon,
      description: 'Eksplorasi opsi pendanaan dan kalkulator bagi hasil yang aman sesuai kemampuan usahamu.'
    }
  }
  if (p.startsWith('/dashboard/pesan')) {
    return {
      title: 'Pesan',
      icon: Message01Icon,
      description: 'Ruang komunikasi dan diskusi pendanaan langsung dengan calon investor tokomu.'
    }
  }
  if (p.startsWith('/dashboard/permintaan-investor') || p.startsWith('/dashboard/notifikasi')) {
    return {
      title: 'Notifikasi',
      icon: Notification01Icon,
      description: 'Pemberitahuan penting seputar aktivitas usaha, jadwal pendampingan, dan permintaan investor.'
    }
  }
  if (p.startsWith('/dashboard/pengaturan')) {
    return {
      title: 'Pengaturan Usaha',
      icon: Settings01Icon,
      description: 'Kelola preferensi akun, integrasi data, dan keamanan tokomu.'
    }
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
      description: 'Ruang data finansial privat terenkripsi dengan laporan untung rugi riil, rekening koran bank, dan bukti legalitas usaha.'
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
