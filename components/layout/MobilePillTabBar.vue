<template>
  <div class="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 flex items-center gap-3 max-w-[96vw] sm:max-w-md w-auto lg:hidden font-poppins select-none">
    <!-- 1. The Main Pill Tab Bar: Ukuran Besar & Ergonomis bagi Jari Mobile (Touch Target 50px-52px) -->
    <nav
      class="h-[64px] sm:h-[66px] px-2.5 py-1.5 rounded-full bg-[#F1F3F6]/95 dark:bg-[#121620]/95 backdrop-blur-xl border border-[#CBD5E1] dark:border-white/10 shadow-[0_10px_35px_rgb(0,0,0,0.14)] dark:shadow-[0_10px_35px_rgb(0,0,0,0.55)] flex items-center gap-1.5 sm:gap-2"
      role="navigation"
      aria-label="Navigasi Utama Mobile"
    >
      <NuxtLink
        v-for="tab in tabs"
        :key="tab.id"
        :to="tab.to"
        :class="[
          'w-[50px] h-[50px] min-w-[50px] min-h-[50px] sm:w-[52px] sm:h-[52px] sm:min-w-[52px] sm:min-h-[52px] rounded-full flex items-center justify-center transition-all duration-200 cursor-pointer relative',
          isTabActive(tab)
            ? 'bg-white dark:bg-[#1E2533] text-[#00800e] dark:text-[#00C058] border border-[#CBD5E1] dark:border-white/10 shadow-[0_2px_8px_rgba(0,0,0,0.08)]'
            : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-white/60 dark:hover:bg-white/5 border border-transparent'
        ]"
        :aria-label="tab.label"
        :title="tab.label"
        @click="handleTabClick(tab)"
      >
        <!-- Icon: Ukuran 26px Nyaman & Jelas Terlihat -->
        <HugeiconsIcon
          :icon="tab.icon"
          :size="26"
          :stroke-width="isTabActive(tab) ? 2.3 : 1.9"
          class="shrink-0 transition-transform"
        />

        <!-- Notification Dot Indicator (e.g. for Permodalan / Pesan unread) -->
        <span
          v-if="tab.hasBadge"
          class="absolute top-2.5 right-2.5 w-2.5 h-2.5 rounded-full bg-[#00800e] dark:bg-[#00C058] ring-2 ring-white dark:ring-[#1E2533]"
        />
      </NuxtLink>
    </nav>

    <!-- 2. Circular Floating Quick Access Button (+) (Ukuran Besar 60px-64px, Tactile 3D GoPay Green FAB) -->
    <button
      type="button"
      :class="[
        'w-[60px] h-[60px] sm:w-[64px] sm:h-[64px] min-w-[60px] min-h-[60px] sm:min-w-[64px] sm:min-h-[64px] rounded-full flex items-center justify-center cursor-pointer shrink-0 transition-all duration-200 active:scale-95',
        'bg-[#00800e] hover:bg-[#006e0c] text-white border border-[#006e0c] shadow-[0_6px_20px_rgba(0,128,14,0.38)]',
        'dark:bg-[#00C058] dark:hover:bg-[#00a84d] dark:text-[#0A0D14] dark:border-[#00C058] dark:shadow-[0_6px_20px_rgba(0,192,88,0.38)]',
        isQuickAccessOpen ? 'ring-4 ring-[#00800e]/30 dark:ring-[#00C058]/30 bg-[#006e0c] dark:bg-[#00a84d]' : ''
      ]"
      :aria-expanded="isQuickAccessOpen"
      :title="isQuickAccessOpen ? 'Tutup Akses Cepat' : 'Buka Menu Akses Cepat'"
      @click="toggleQuickAccess"
    >
      <HugeiconsIcon
        :icon="Add01Icon"
        :size="28"
        :stroke-width="2.5"
        class="shrink-0 transition-transform duration-250 ease-out"
        :class="{ 'rotate-45': isQuickAccessOpen }"
      />
    </button>

    <!-- 3. Quick Access Bento Sheet (Modal Bento 8 Menu Aksi Cepat) -->
    <MobileQuickAccessSheet
      :is-open="isQuickAccessOpen"
      @close="isQuickAccessOpen = false"
      @open-catat-kas="handleOpenCatatKas"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useChatStore } from '~/stores/chat'
import { useNotificationStore } from '~/stores/notification'
import MobileQuickAccessSheet from './MobileQuickAccessSheet.vue'
import { HugeiconsIcon } from '@hugeicons/vue'
import {
  Home03Icon,
  Coins01Icon,
  Task01Icon,
  Award01Icon,
  Add01Icon
} from '@hugeicons/core-free-icons'

const route = useRoute()
const router = useRouter()
const chatStore = useChatStore()
const notifStore = useNotificationStore()

const isQuickAccessOpen = ref(false)

function toggleQuickAccess() {
  isQuickAccessOpen.value = !isQuickAccessOpen.value
}

function handleTabClick(_tab: any) {
  isQuickAccessOpen.value = false
}

function handleOpenCatatKas() {
  isQuickAccessOpen.value = false
  if (route.path === '/dashboard/progres') {
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('open-cash-drawer'))
    }
  } else {
    router.push('/dashboard/progres?action=catat-kas')
  }
}

// Tutup lembar akses cepat otomatis saat rute berubah
watch(
  () => route.fullPath,
  () => {
    isQuickAccessOpen.value = false
  }
)

const totalUnread = computed(() => {
  const pesan = chatStore.threads.reduce((acc, t) => acc + (t.unreadUmkm || 0), 0)
  const notif = notifStore.unreadCount || 0
  return pesan + notif
})

const tabs = computed(() => [
  {
    id: 'beranda',
    label: 'Beranda',
    to: '/dashboard',
    icon: Home03Icon,
    exact: true
  },
  {
    id: 'kas',
    label: 'Catatan Kas',
    to: '/dashboard/progres',
    icon: Coins01Icon
  },
  {
    id: 'usaha',
    label: 'Kelola Usaha',
    to: '/dashboard/rencana-aksi',
    icon: Task01Icon,
    activePaths: ['/dashboard/rencana-aksi', '/dashboard/profile', '/dashboard/penilaian']
  },
  {
    id: 'modal',
    label: 'Permodalan',
    to: '/dashboard/pendanaan',
    icon: Award01Icon,
    activePaths: ['/dashboard/pendanaan', '/dashboard/pesan', '/dashboard/notifikasi'],
    hasBadge: totalUnread.value > 0
  }
])

function isTabActive(tab: any): boolean {
  const currentPath = route.path
  if (tab.exact) {
    return currentPath === '/dashboard' || currentPath === '/dashboard/'
  }
  if (tab.activePaths) {
    return tab.activePaths.some((p: string) => currentPath.startsWith(p))
  }
  return currentPath.startsWith(tab.to)
}
</script>
