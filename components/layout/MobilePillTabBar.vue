<template>
  <div class="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 flex items-center justify-center w-[calc(100vw-2rem)] max-w-[390px] sm:max-w-[420px] lg:hidden font-poppins select-none">
    <!-- The Unified Floating Pill Dock Bar: 5 Icon Slots (Tinggi Lebih Luas & Ergonomis, Aksen Selaras Sidebar) -->
    <nav
      ref="navRef"
      class="relative w-full h-[74px] sm:h-[78px] p-2 rounded-full bg-white/95 dark:bg-[#13161F]/95 backdrop-blur-xl border border-[#E2E8F0] dark:border-neutral-800/80 shadow-[0_16px_40px_rgba(15,23,42,0.14),0_4px_16px_rgba(15,23,42,0.06)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.7),0_4px_16px_rgba(0,0,0,0.5)] flex items-center justify-between"
      role="navigation"
      aria-label="Navigasi Utama Mobile"
    >
      <!-- GSAP Animated Active Tab Sliding Squircle Indicator -->
      <div
        ref="indicatorRef"
        class="absolute top-2 bottom-2 left-0 pointer-events-none z-0 flex items-center justify-center will-change-transform opacity-0"
      >
        <div class="w-full max-w-[58px] sm:max-w-[64px] h-full rounded-[20px] bg-[#E6F4F7] dark:bg-[#156374]/25 border border-[#156374]/25 dark:border-[#50AABF]/30 flex flex-col items-center justify-center relative shadow-[0_2px_6px_rgba(21,99,116,0.10)] transition-colors">
          <!-- Invisible spacer to balance icon space -->
          <div class="h-6 w-6 opacity-0 pointer-events-none" aria-hidden="true" />
          <!-- Active Pill Accent Indicator Bar (GSAP animated line) -->
          <span
            ref="indicatorLineRef"
            class="w-6 h-[4px] rounded-full bg-[#156374] dark:bg-[#50AABF] mt-1.5 shrink-0 transition-colors will-change-transform"
          />
        </div>
      </div>

      <!-- 4 Primary Navigation Tabs -->
      <NuxtLink
        v-for="(tab, idx) in tabs"
        :key="tab.id"
        :ref="(el) => setSlotRef(el, idx)"
        :to="tab.to"
        :class="[
          'flex-1 h-full min-w-0 flex items-center justify-center relative z-10 rounded-[20px] cursor-pointer select-none group transition-all duration-200',
          activeIndex === idx
            ? 'active-tab'
            : 'hover:bg-neutral-100/60 dark:hover:bg-neutral-800/40 active:scale-95'
        ]"
        :aria-label="tab.label"
        :title="tab.label"
        @click="handleTabClick(tab)"
      >
        <div class="w-full h-full max-w-[58px] sm:max-w-[64px] flex flex-col items-center justify-center relative">
          <HugeiconsIcon
            :icon="tab.icon"
            :size="24"
            :stroke-width="activeIndex === idx ? 2.3 : 1.9"
            :class="[
              'shrink-0 transition-colors duration-200 will-change-transform',
              activeIndex === idx
                ? 'text-[#156374] dark:text-[#50AABF]'
                : 'text-[#64748B] dark:text-neutral-400 group-hover:text-[#156374] dark:group-hover:text-[#50AABF]'
            ]"
          />
          <!-- Spacer matching the active indicator line height so icon vertical alignment stays pixel-perfect -->
          <div class="w-6 h-[4px] mt-1.5 opacity-0 pointer-events-none" aria-hidden="true" />
        </div>

        <!-- Notification Dot Indicator -->
        <span
          v-if="tab.hasBadge"
          class="absolute top-2.5 right-2 sm:right-3 w-2.5 h-2.5 rounded-full bg-[#00AA13] dark:bg-[#22C55E] ring-2 ring-white dark:ring-[#13161F] z-20"
        />
      </NuxtLink>

      <!-- 5th Slot: More / Akses Cepat Button (Triggers MobileQuickAccessSheet Modal) -->
      <button
        :ref="(el) => setSlotRef(el, 4)"
        type="button"
        :class="[
          'flex-1 h-full min-w-0 flex items-center justify-center relative z-10 rounded-[20px] cursor-pointer select-none group transition-all duration-200',
          activeIndex === 4
            ? 'active-tab'
            : 'hover:bg-neutral-100/60 dark:hover:bg-neutral-800/40 active:scale-95'
        ]"
        :aria-expanded="isQuickAccessOpen"
        :title="isQuickAccessOpen ? 'Tutup Akses Cepat' : 'Menu Lainnya'"
        aria-label="Menu Lainnya"
        @click="toggleQuickAccess"
      >
        <div class="w-full h-full max-w-[58px] sm:max-w-[64px] flex flex-col items-center justify-center relative">
          <HugeiconsIcon
            :icon="MoreHorizontalIcon"
            :size="24"
            :stroke-width="activeIndex === 4 ? 2.3 : 1.9"
            :class="[
              'shrink-0 transition-colors duration-200 will-change-transform',
              activeIndex === 4
                ? 'text-[#156374] dark:text-[#50AABF]'
                : 'text-[#64748B] dark:text-neutral-400 group-hover:text-[#156374] dark:group-hover:text-[#50AABF]'
            ]"
          />
          <!-- Spacer matching the active indicator line height -->
          <div class="w-6 h-[4px] mt-1.5 opacity-0 pointer-events-none" aria-hidden="true" />
        </div>

        <!-- Notification Dot on More if unread messages/notifs on other pages -->
        <span
          v-if="hasMoreBadge"
          class="absolute top-2.5 right-2 sm:right-3 w-2.5 h-2.5 rounded-full bg-[#00AA13] dark:bg-[#22C55E] ring-2 ring-white dark:ring-[#13161F] z-20"
        />
      </button>
    </nav>

    <!-- Quick Access Bento Sheet (Modal Bento 8 Menu Aksi Cepat dengan Liquid Reveal) -->
    <MobileQuickAccessSheet
      :is-open="isQuickAccessOpen"
      @close="isQuickAccessOpen = false"
      @open-catat-kas="handleOpenCatatKas"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, nextTick, onMounted, onUnmounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useChatStore } from '~/stores/chat'
import { useNotificationStore } from '~/stores/notification'
import MobileQuickAccessSheet from './MobileQuickAccessSheet.vue'
import { HugeiconsIcon } from '@hugeicons/vue'
import { gsap } from 'gsap'
import {
  Home03Icon,
  Coins01Icon,
  Task01Icon,
  Award01Icon,
  MoreHorizontalIcon
} from '@hugeicons/core-free-icons'

const route = useRoute()
const router = useRouter()
const chatStore = useChatStore()
const notifStore = useNotificationStore()

const isQuickAccessOpen = ref(false)

const navRef = ref<HTMLElement | null>(null)
const indicatorRef = ref<HTMLElement | null>(null)
const indicatorLineRef = ref<HTMLElement | null>(null)
const slotRefs = ref<(HTMLElement | null)[]>([])

function setSlotRef(el: any, idx: number) {
  if (el) {
    slotRefs.value[idx] = (el.$el || el) as HTMLElement
  }
}

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

const activeIndex = computed(() => {
  if (isQuickAccessOpen.value) return 4
  const currentPath = route.path
  if (currentPath === '/dashboard' || currentPath === '/dashboard/') return 0
  if (currentPath.startsWith('/dashboard/progres')) return 1
  if (
    currentPath.startsWith('/dashboard/rencana-aksi') ||
    currentPath.startsWith('/dashboard/profile') ||
    currentPath.startsWith('/dashboard/penilaian')
  ) {
    return 2
  }
  if (
    currentPath.startsWith('/dashboard/pendanaan') ||
    currentPath.startsWith('/dashboard/pesan') ||
    currentPath.startsWith('/dashboard/notifikasi')
  ) {
    return 3
  }
  if (
    currentPath.startsWith('/dashboard/postingan') ||
    currentPath.startsWith('/dashboard/pengaturan')
  ) {
    return 4
  }
  return 0
})

const hasMoreBadge = computed(() => false)

// GSAP Sliding Active Tab Indicator Animation
function updateIndicator(index: number, immediate = false) {
  if (import.meta.server) return
  nextTick(() => {
    const nav = navRef.value
    const target = slotRefs.value[index]
    const indicator = indicatorRef.value
    const line = indicatorLineRef.value
    if (!nav || !target || !indicator) return

    const navRect = nav.getBoundingClientRect()
    const targetRect = target.getBoundingClientRect()
    const x = targetRect.left - navRect.left
    const width = targetRect.width

    if (immediate) {
      gsap.set(indicator, { x, width, opacity: 1 })
      if (line) gsap.set(line, { scaleX: 1, opacity: 1 })
    } else {
      // Smooth linear-exponential glide without any bounce
      gsap.to(indicator, {
        x,
        width,
        opacity: 1,
        duration: 0.32,
        ease: 'power3.out',
        overwrite: 'auto'
      })

      // Active indicator bar smooth expansion without bounce
      if (line) {
        gsap.fromTo(
          line,
          { scaleX: 0.65, opacity: 0.7 },
          { scaleX: 1, opacity: 1, duration: 0.28, ease: 'power2.out' }
        )
      }

      // Smooth active icon focus without bounce
      const targetIcon = target.querySelector('svg')
      if (targetIcon) {
        gsap.fromTo(
          targetIcon,
          { scale: 0.92 },
          { scale: 1, duration: 0.26, ease: 'power2.out' }
        )
      }
    }
  })
}

watch(activeIndex, (newVal) => {
  updateIndicator(newVal, false)
})

function handleResize() {
  updateIndicator(activeIndex.value, true)
}

onMounted(() => {
  updateIndicator(activeIndex.value, true)
  if (typeof window !== 'undefined') {
    window.addEventListener('resize', handleResize)
  }
})

onUnmounted(() => {
  if (typeof window !== 'undefined') {
    window.removeEventListener('resize', handleResize)
  }
})
</script>
