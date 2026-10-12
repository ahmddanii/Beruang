<template>
  <div class="min-h-screen flex flex-col bg-white dark:bg-[#0F1014] text-neutral-900 dark:text-neutral-100 font-sans transition-colors">
    <div class="flex-1 flex min-h-0">
      <!-- Desktop & Mobile Drawer Sidebar (styled in #fafafa) -->
      <DashboardSidebar
        :is-mobile-open="isMobileMenuOpen"
        @close-mobile="isMobileMenuOpen = false"
      />

      <!-- Content Area with Top Navbar -->
      <div class="flex-1 flex flex-col min-w-0 bg-white dark:bg-[#0F1014]">
        <!-- Top Workspace Navbar (Showing current page information matching sidebar) -->
        <header class="sticky top-0 z-40 bg-white/90 dark:bg-[#0F1014]/90 backdrop-blur-md border-b border-neutral-200/80 dark:border-neutral-800/80 px-6 sm:px-10 lg:pl-16 lg:pr-12 xl:pl-20 xl:pr-16 h-14 sm:h-16 flex items-center justify-between select-none">
          <div class="flex items-center gap-3 min-w-0">
            <!-- Mobile Menu Toggle Button (Only on < lg) -->
            <button
              type="button"
              class="lg:hidden p-2 -ml-2 rounded-xl text-neutral-700 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors active:scale-95 shrink-0"
              aria-label="Buka Menu Navigasi"
              @click="isMobileMenuOpen = true"
            >
              <HugeiconsIcon :icon="Menu01Icon" :size="20" :stroke-width="1.75" />
            </button>

            <!-- Page Title Indicator (No icon, slightly larger text) -->
            <div class="flex items-center min-w-0">
              <h2 class="font-heading font-semibold text-lg sm:text-xl lg:text-[22px] text-neutral-900 dark:text-white truncate tracking-normal">
                {{ currentPageInfo.title }}
              </h2>
            </div>
          </div>

          <!-- Right Side: Extended Search Bar + Square Containers (Notification & Settings) -->
          <div class="flex items-center gap-2.5 sm:gap-3 shrink-0">
            <!-- Search Bar (Berada di samping kiri icon notification, lebar diperpanjang) -->
            <div class="relative w-44 sm:w-64 md:w-80 lg:w-[360px] xl:w-[420px]">
              <div
                class="h-9 sm:h-10 flex items-center justify-between gap-2 px-3 sm:px-3.5 rounded-xl bg-neutral-100/90 dark:bg-[#18191E] border border-neutral-200/80 dark:border-neutral-800 transition-all duration-150 focus-within:border-primary-500/70 dark:focus-within:border-primary-500/70 focus-within:ring-2 focus-within:ring-primary-500/15 focus-within:bg-white dark:focus-within:bg-[#18191E] shadow-2xs"
              >
                <div class="flex items-center gap-2 sm:gap-2.5 min-w-0 flex-1">
                  <HugeiconsIcon
                    :icon="Search01Icon"
                    :size="16"
                    :stroke-width="1.75"
                    class="text-neutral-400 dark:text-neutral-500 shrink-0"
                  />
                  <input
                    ref="navbarSearchInputRef"
                    v-model="navSearchQuery"
                    type="text"
                    placeholder="Cari fitur, menu, transaksi..."
                    class="w-full bg-transparent text-xs sm:text-sm font-sans text-neutral-900 dark:text-white placeholder:text-neutral-400 dark:placeholder:text-neutral-500 focus:outline-none"
                    @focus="isSearchDropdownOpen = true"
                    @blur="onSearchBlur"
                    @keydown.esc="navSearchQuery = ''; isSearchDropdownOpen = false"
                  />
                </div>
                <button
                  v-if="navSearchQuery"
                  type="button"
                  class="text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200 p-0.5 rounded transition-colors"
                  title="Hapus pencarian"
                  @click="navSearchQuery = ''; isSearchDropdownOpen = false"
                >
                  <HugeiconsIcon :icon="Cancel01Icon" :size="14" :stroke-width="2" />
                </button>
                <kbd
                  v-else
                  class="hidden sm:inline-flex items-center px-1.5 py-0.5 text-[10px] font-sans font-medium text-neutral-400 dark:text-neutral-500 bg-neutral-200/60 dark:bg-neutral-800/80 border border-neutral-300/60 dark:border-neutral-700/60 rounded select-none"
                >
                  ⌘K
                </kbd>
              </div>

              <!-- Quick Command / Search Dropdown when typing -->
              <div
                v-if="isSearchDropdownOpen && navSearchQuery.trim()"
                class="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-[#18191E] border border-neutral-200/90 dark:border-neutral-800 rounded-2xl shadow-xl overflow-hidden z-50 py-1.5 backdrop-blur-md"
              >
                <div v-if="filteredSearchOptions.length > 0" class="max-h-60 overflow-y-auto">
                  <button
                    v-for="item in filteredSearchOptions"
                    :key="item.to"
                    type="button"
                    class="w-full flex items-center justify-between px-3.5 py-2.5 hover:bg-neutral-100 dark:hover:bg-neutral-800/70 text-left transition-colors cursor-pointer group"
                    @mousedown.prevent="goToSearchTarget(item.to)"
                  >
                    <div class="flex items-center gap-2.5 min-w-0">
                      <HugeiconsIcon
                        :icon="item.icon"
                        :size="16"
                        class="text-neutral-400 group-hover:text-primary-500 transition-colors shrink-0"
                      />
                      <span class="text-xs sm:text-sm font-sans font-medium text-neutral-800 dark:text-neutral-200 group-hover:text-neutral-900 dark:group-hover:text-white truncate">
                        {{ item.label }}
                      </span>
                    </div>
                    <span class="text-[10px] font-sans text-neutral-400 group-hover:text-primary-500 font-medium transition-colors">
                      Buka →
                    </span>
                  </button>
                </div>
                <div v-else class="px-4 py-3 text-center text-xs text-neutral-400 dark:text-neutral-500 font-sans">
                  Tidak ada menu yang cocok untuk "{{ navSearchQuery }}"
                </div>
              </div>
            </div>

            <!-- 1. Notification Container (Notification01Icon) -->
            <button
              type="button"
              class="relative w-9 h-9 sm:w-10 sm:h-10 rounded-md bg-white dark:bg-[#18191E] hover:bg-neutral-100 dark:hover:bg-[#202128] border border-neutral-200/90 dark:border-neutral-800 flex items-center justify-center text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white transition-all duration-150 active:scale-95 cursor-pointer shadow-2xs"
              aria-label="Pemberitahuan"
              title="Pemberitahuan"
            >
              <HugeiconsIcon :icon="Notification01Icon" :size="18" :stroke-width="1.75" />
              <!-- Unread notification indicator dot -->
              <span class="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-primary-500 ring-2 ring-white dark:ring-[#18191E]" />
            </button>

            <!-- 2. Settings Container (BoltIcon) -->
            <NuxtLink
              :to="settingsRoute"
              class="w-9 h-9 sm:w-10 sm:h-10 rounded-md bg-white dark:bg-[#18191E] hover:bg-neutral-100 dark:hover:bg-[#202128] border border-neutral-200/90 dark:border-neutral-800 flex items-center justify-center text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white transition-all duration-150 active:scale-95 cursor-pointer shadow-2xs"
              aria-label="Pengaturan"
              title="Pengaturan"
            >
              <HugeiconsIcon :icon="BoltIcon" :size="18" :stroke-width="1.75" />
            </NuxtLink>
          </div>
        </header>

        <!-- Main Dashboard Workspace Content (Fluid full-width layout matching Trueform references) -->
        <main class="flex-1 w-full px-6 sm:px-10 lg:pl-16 lg:pr-12 xl:pl-20 xl:pr-16 py-7 sm:py-9">
          <slot />
        </main>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '~/stores/auth'
import DashboardSidebar from '~/components/layout/DashboardSidebar.vue'
import { HugeiconsIcon } from '@hugeicons/vue'
import {
  Menu01Icon,
  Notification01Icon,
  BoltIcon,
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
  Search01Icon,
  Cancel01Icon,
  UserCircleIcon
} from '@hugeicons/core-free-icons'

const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()
const isMobileMenuOpen = ref(false)

// Navbar Search State
const navSearchQuery = ref('')
const navbarSearchInputRef = ref<HTMLInputElement | null>(null)
const isSearchDropdownOpen = ref(false)

function onSearchBlur() {
  setTimeout(() => {
    isSearchDropdownOpen.value = false
  }, 180)
}

function goToSearchTarget(targetUrl: string) {
  navSearchQuery.value = ''
  isSearchDropdownOpen.value = false
  router.push(targetUrl)
}

const allSearchOptions = computed(() => {
  const role = authStore.currentUser?.role || 'UMKM'
  if (role === 'UMKM') {
    return [
      { to: '/dashboard', label: 'Beranda Toko', icon: Home03Icon },
      { to: '/dashboard/profile', label: 'Profil Usaha & Banner Toko', icon: UserCircleIcon },
      { to: '/dashboard/progres', label: 'Catatan Kas & Mutasi Harian', icon: Coins01Icon },
      { to: '/dashboard/rencana-aksi', label: 'Rencana Aksi & Target Usaha', icon: Task01Icon },
      { to: '/dashboard/penilaian', label: 'Cek Kesehatan Finansial', icon: AnalyticsUpIcon },
      { to: '/dashboard/profil-publik', label: 'Toko Publik & Etalase Usaha', icon: Store01Icon },
      { to: '/dashboard/pendanaan', label: 'Cari Modal & Akses Investor', icon: Award01Icon },
      { to: '/dashboard/permintaan-investor', label: 'Tawaran Masuk Investor', icon: UserGroupIcon },
      { to: '/dashboard/pengaturan', label: 'Pengaturan Profil Usaha', icon: Settings01Icon }
    ]
  } else if (role === 'CONSULTANT') {
    return [
      { to: '/konsultan', label: 'Daftar Klien UMKM Binaan', icon: UserGroupIcon },
      { to: '/konsultan/validasi', label: 'Validasi Kas & Transaksi Harian', icon: CheckmarkCircle01Icon },
      { to: '/konsultan/alert', label: 'Peringatan & Anomali Keuangan', icon: Alert01Icon },
      { to: '/konsultan/pengaturan', label: 'Pengaturan Konsultan', icon: Settings01Icon }
    ]
  } else if (role === 'INVESTOR') {
    return [
      { to: '/investor', label: 'Katalog Usaha UMKM Kurasi', icon: Store01Icon },
      { to: '/investor/watchlist', label: 'Usaha Disimpan (Watchlist)', icon: StarIcon },
      { to: '/investor/pengaturan', label: 'Pengaturan Akun Investor', icon: Settings01Icon }
    ]
  } else {
    return [
      { to: '/admin', label: 'Ringkasan Platform', icon: Home03Icon },
      { to: '/admin/penugasan', label: 'Penugasan Konsultan Ahli', icon: UserAdd01Icon },
      { to: '/admin/pengguna', label: 'Kelola Pengguna Sistem', icon: UserGroupIcon }
    ]
  }
})

const filteredSearchOptions = computed(() => {
  if (!navSearchQuery.value.trim()) return []
  const q = navSearchQuery.value.toLowerCase().trim()
  return allSearchOptions.value.filter(item =>
    item.label.toLowerCase().includes(q)
  )
})

function handleGlobalKeydown(e: KeyboardEvent) {
  if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
    e.preventDefault()
    navbarSearchInputRef.value?.focus()
    isSearchDropdownOpen.value = true
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleGlobalKeydown)
})

onBeforeUnmount(() => {
  window.removeEventListener('keydown', handleGlobalKeydown)
})

const settingsRoute = computed(() => {
  const role = authStore.currentUser?.role
  if (role === 'CONSULTANT') return '/konsultan/pengaturan'
  if (role === 'INVESTOR') return '/investor/pengaturan'
  return '/dashboard/pengaturan'
})

const currentPageInfo = computed(() => {
  const p = route.path
  if (p === '/dashboard' || p === '/dashboard/') {
    return { title: 'Beranda', icon: Home03Icon }
  }
  if (p.startsWith('/dashboard/profile')) {
    return { title: 'Profil Usaha', icon: UserCircleIcon }
  }
  if (p.startsWith('/dashboard/progres')) {
    return { title: 'Catatan Kas', icon: Coins01Icon }
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
  if (p.startsWith('/dashboard/permintaan-investor')) {
    return { title: 'Tawaran Masuk', icon: UserGroupIcon }
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
