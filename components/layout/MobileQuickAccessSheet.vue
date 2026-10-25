<template>
  <Teleport to="body">
    <!-- Backdrop Scrim with subtle blur -->
    <Transition
      enter-active-class="transition duration-250 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="isOpen"
        class="fixed inset-0 z-50 bg-black/60 dark:bg-black/80 backdrop-blur-xs lg:hidden"
        aria-hidden="true"
        @click="emit('close')"
      />
    </Transition>

    <!-- Liquid Reveal Elevated Bento Grid Menu Modal (Solid Opaque Background) -->
    <Transition
      :css="false"
      @before-enter="onModalBeforeEnter"
      @enter="onModalEnter"
      @leave="onModalLeave"
    >
      <div
        v-if="isOpen"
        class="fixed bottom-[86px] mb-3.5 left-1/2 -translate-x-1/2 z-50 lg:hidden max-w-[360px] sm:max-w-[390px] w-[calc(100vw-1.75rem)] will-change-transform"
        role="dialog"
        aria-modal="true"
        aria-label="Menu Akses Cepat UMKM"
      >
        <div class="p-4 sm:p-5 rounded-[28px] bg-[#FFFFFF] dark:bg-[#13161F] border border-[#CBD5E1] dark:border-neutral-700 shadow-2xl space-y-3 font-poppins text-neutral-900 dark:text-white">
          <!-- Sheet Header: Pill "Beruang Siap Modal" dihilangkan, ditambahkan tombol tutup halus -->
          <div class="flex items-center justify-between pb-2.5 border-b border-[#E2E8F0] dark:border-neutral-800 px-1">
            <span class="text-xs font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 font-poppins">
              {{ t('nav_quick_access') || 'Akses Cepat UMKM' }}
            </span>
            <button
              type="button"
              class="w-7 h-7 rounded-full bg-neutral-100/90 dark:bg-neutral-800/80 hover:bg-[#E6F4F7] dark:hover:bg-[#156374]/30 text-neutral-500 dark:text-neutral-400 hover:text-[#156374] dark:hover:text-[#50AABF] flex items-center justify-center transition-colors duration-150 cursor-pointer"
              title="Tutup Menu"
              aria-label="Tutup Menu"
              @click="emit('close')"
            >
              <HugeiconsIcon :icon="Cancel01Icon" :size="15" :stroke-width="2.2" />
            </button>
          </div>

          <!-- 8-Tile Bento Grid (Warna & Nuansa Selaras dengan Sidebar) -->
          <div class="grid grid-cols-4 gap-2 pt-1">
            <button
              v-for="item in quickAccessItems"
              :key="item.id"
              type="button"
              :class="[
                'quick-access-tile flex flex-col items-center justify-center p-2 sm:p-2.5 min-h-[76px] sm:min-h-[80px] rounded-2xl border transition-all text-center group cursor-pointer relative active:scale-95 will-change-transform',
                item.isPrimary
                  ? 'bg-[#E6F4F7] dark:bg-[#156374]/30 border-[#156374]/40 dark:border-[#50AABF]/40 hover:bg-[#D9EEF3]'
                  : 'bg-[#F8FAFC] dark:bg-[#1A1F2C] border-[#E2E8F0] dark:border-neutral-700 hover:border-[#156374]/40 hover:bg-[#E6F4F7]/40 dark:hover:bg-[#156374]/20'
              ]"
              @click="handleNavigate(item)"
            >
              <!-- Unread Badge if applicable -->
              <span
                v-if="item.badge && item.badge > 0"
                class="absolute top-1 right-1 px-1.5 py-0.2 rounded-full text-[9px] font-bold bg-[#00AA13] dark:bg-[#22C55E] text-white tabular-nums ring-2 ring-white dark:ring-[#13161F]"
              >
                {{ item.badge }}
              </span>

              <!-- Tile Icon Container (Ukuran Nyaman 44px-48px) -->
              <div
                :class="[
                  'tile-icon-box w-11 h-11 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center transition-all shadow-2xs will-change-transform',
                  item.isPrimary
                    ? 'bg-[#156374] dark:bg-[#50AABF] text-white dark:text-[#0A0D14] shadow-xs'
                    : 'bg-white dark:bg-[#121620] border border-[#CBD5E1] dark:border-neutral-700 text-[#64748B] dark:text-neutral-300 group-hover:text-[#156374] dark:group-hover:text-[#50AABF]'
                ]"
              >
                <HugeiconsIcon
                  :icon="item.icon"
                  :size="22"
                  :stroke-width="item.isPrimary ? 2.3 : 1.9"
                />
              </div>

              <!-- Tile Label -->
              <span
                :class="[
                  'text-[10px] sm:text-[11px] font-semibold mt-1.5 text-center leading-tight truncate w-full',
                  item.isPrimary
                    ? 'text-[#156374] dark:text-[#50AABF] font-bold'
                    : 'text-neutral-700 dark:text-neutral-300 group-hover:text-[#156374] dark:group-hover:text-[#50AABF]'
                ]"
              >
                {{ item.label }}
              </span>
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAuthStore } from '~/stores/auth'
import { useChatStore } from '~/stores/chat'
import { useNotificationStore } from '~/stores/notification'
import { useLanguage } from '~/composables/useLanguage'
import { HugeiconsIcon } from '@hugeicons/vue'
import { gsap } from 'gsap'
import {
  Add01Icon,
  Coins01Icon,
  AnalyticsUpIcon,
  Task01Icon,
  Award01Icon,
  Message01Icon,
  Notification01Icon,
  Store01Icon,
  Settings01Icon,
  Bookmark02Icon,
  UserCircleIcon,
  UserGroupIcon,
  Home03Icon,
  Cancel01Icon,
  CheckmarkCircle01Icon,
  Alert01Icon
} from '@hugeicons/core-free-icons'

const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()
const chatStore = useChatStore()
const notifStore = useNotificationStore()

const props = defineProps<{
  isOpen: boolean
}>()

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'open-catat-kas'): void
}>()

// Smooth Reveal Transition Hooks: Mulai dari container, baru reveal icon dari pertama kiri pojok atas satu per satu perlahan (smooth tanpa efek bouncy)
function onModalBeforeEnter(el: Element) {
  gsap.set(el, {
    opacity: 0,
    scaleX: 0.88,
    scaleY: 0.65,
    y: 20,
    borderRadius: '36px 36px 24px 24px',
    transformOrigin: '50% 105%',
    filter: 'blur(5px)'
  })

  // Set all 8 bento tiles to hidden initial state
  const tiles = el.querySelectorAll('.quick-access-tile')
  const icons = el.querySelectorAll('.tile-icon-box')
  gsap.set(tiles, {
    opacity: 0,
    y: 12,
    scale: 0.9
  })
  gsap.set(icons, {
    scale: 0.88
  })
}

function onModalEnter(el: Element, done: () => void) {
  const tiles = el.querySelectorAll('.quick-access-tile')
  const icons = el.querySelectorAll('.tile-icon-box')
  const tl = gsap.timeline({ onComplete: done })

  // 1. Reveal smooth container terlebih dahulu (smooth tanpa bounce)
  tl.to(el, {
    duration: 0.38,
    opacity: 1,
    scaleX: 1,
    scaleY: 1,
    y: 0,
    borderRadius: '28px',
    filter: 'blur(0px)',
    ease: 'power3.out'
  })

  // 2. Baru reveal icon satu per satu secara berurutan mulai dari pertama kiri pojok atas (index 0) (smooth tanpa bounce)
  if (tiles.length > 0) {
    tl.to(
      tiles,
      {
        duration: 0.32,
        opacity: 1,
        y: 0,
        scale: 1,
        stagger: 0.045, // Mengalir satu per satu perlahan dari pojok kiri atas (index 0 ke 7)
        ease: 'power2.out'
      },
      '-=0.1' // Dimulai tepat saat kontainer hampir selesai mengembang
    )

    tl.to(
      icons,
      {
        duration: 0.28,
        scale: 1,
        stagger: 0.045,
        ease: 'power2.out'
      },
      '<' // Sinkron bersama masing-masing tile
    )
  }
}

function onModalLeave(el: Element, done: () => void) {
  const tiles = el.querySelectorAll('.quick-access-tile')
  const tl = gsap.timeline({ onComplete: done })

  // Fade out cepat ubin saat menutup
  tl.to(tiles, {
    duration: 0.12,
    opacity: 0,
    y: 6,
    ease: 'power2.in',
    stagger: { amount: 0.06, from: 'end' }
  })

  // Menciutkan kontainer kembali ke dock secara mulus
  tl.to(
    el,
    {
      duration: 0.2,
      opacity: 0,
      scaleX: 0.9,
      scaleY: 0.7,
      y: 18,
      filter: 'blur(3px)',
      ease: 'power2.in'
    },
    '-=0.06'
  )
}

const totalUnreadPesan = computed(() => {
  return chatStore.threads.reduce((acc, t) => acc + (t.unreadUmkm || 0), 0)
})

const totalUnreadNotif = computed(() => {
  return notifStore.unreadCount || 0
})

const { t, currentLang } = useLanguage()

const quickAccessItems = computed(() => {
  const role = authStore.currentUser?.role || (route.path.startsWith('/investor') ? 'INVESTOR' : route.path.startsWith('/admin') ? 'ADMIN' : 'UMKM')

  if (role === 'INVESTOR') {
    return [
      {
        id: 'jaringan',
        label: 'Jaringan',
        to: '/investor',
        icon: Store01Icon,
        isPrimary: true
      },
      {
        id: 'simpan',
        label: 'Simpan',
        to: '/investor/watchlist',
        icon: Bookmark02Icon
      },
      {
        id: 'profile',
        label: currentLang.value === 'en' ? 'Profile' : 'Profil Saya',
        to: '/investor/profile',
        icon: UserCircleIcon
      },
      {
        id: 'pesan',
        label: t('nav_pesan'),
        to: '/investor/pesan',
        icon: Message01Icon,
        badge: chatStore.unreadCountInvestor || 0
      },
      {
        id: 'notifikasi',
        label: t('nav_notifikasi'),
        to: '/dashboard/notifikasi',
        icon: Notification01Icon,
        badge: totalUnreadNotif.value
      },
      {
        id: 'pengaturan',
        label: currentLang.value === 'en' ? 'Settings' : 'Pengaturan',
        to: '/investor/pengaturan',
        icon: Settings01Icon
      }
    ]
  }

  if (role === 'ADMIN') {
    return [
      {
        id: 'beranda',
        label: 'Beranda',
        to: '/admin',
        icon: Home03Icon,
        isPrimary: true
      },
      {
        id: 'umkm',
        label: 'Kemitraan',
        to: '/admin/umkm',
        icon: Store01Icon
      },
      {
        id: 'investor',
        label: 'Investor',
        to: '/admin/investor',
        icon: Coins01Icon
      },
      {
        id: 'sertifikasi',
        label: 'Sertifikasi',
        to: '/admin/sertifikasi',
        icon: Award01Icon
      },
      {
        id: 'penugasan',
        label: 'Konsultan',
        to: '/admin/penugasan',
        icon: UserGroupIcon
      },
      {
        id: 'notifikasi',
        label: t('nav_notifikasi'),
        to: '/dashboard/notifikasi',
        icon: Notification01Icon,
        badge: totalUnreadNotif.value
      },
      {
        id: 'pengaturan',
        label: currentLang.value === 'en' ? 'Settings' : 'Pengaturan',
        to: '/admin/pengaturan',
        icon: Settings01Icon
      }
    ]
  }

  if (role === 'CONSULTANT') {
    return [
      {
        id: 'beranda',
        label: 'Beranda',
        to: '/konsultan',
        icon: Home03Icon,
        isPrimary: true
      },
      {
        id: 'klien',
        label: 'Daftar Klien',
        to: '/konsultan/klien',
        icon: UserGroupIcon
      },
      {
        id: 'aksi',
        label: 'Rencana Aksi',
        to: '/konsultan/rencana-aksi',
        icon: Task01Icon
      },
      {
        id: 'validasi',
        label: 'Validasi Kas',
        to: '/konsultan/validasi',
        icon: CheckmarkCircle01Icon
      },
      {
        id: 'alert',
        label: 'Peringatan',
        to: '/konsultan/alert',
        icon: Alert01Icon
      },
      {
        id: 'profil',
        label: 'Profil',
        to: '/konsultan/profil',
        icon: UserCircleIcon
      },
      {
        id: 'notifikasi',
        label: t('nav_notifikasi'),
        to: '/dashboard/notifikasi',
        icon: Notification01Icon,
        badge: totalUnreadNotif.value
      },
      {
        id: 'pengaturan',
        label: currentLang.value === 'en' ? 'Settings' : 'Pengaturan',
        to: '/konsultan/pengaturan',
        icon: Settings01Icon
      }
    ]
  }

  // UMKM (8 Items, including Settings)
  return [
    {
      id: 'catat-kas',
      label: t('btn_catat_kas_singkat'),
      to: '/dashboard/progres?action=catat-kas',
      icon: Add01Icon,
      isPrimary: true
    },
    {
      id: 'buku-kas',
      label: currentLang.value === 'en' ? 'Cash Book' : 'Buku Kas',
      to: '/dashboard/progres',
      icon: Coins01Icon
    },
    {
      id: 'modal',
      label: currentLang.value === 'en' ? 'Funding' : 'Cari Modal',
      to: '/dashboard/pendanaan',
      icon: Award01Icon
    },
    {
      id: 'tugas',
      label: currentLang.value === 'en' ? 'Tasks' : 'Tugas',
      to: '/dashboard/rencana-aksi',
      icon: Task01Icon
    },
    {
      id: 'pesan',
      label: t('nav_pesan'),
      to: '/dashboard/pesan',
      icon: Message01Icon,
      badge: totalUnreadPesan.value
    },
    {
      id: 'notifikasi',
      label: t('nav_notifikasi'),
      to: '/dashboard/notifikasi',
      icon: Notification01Icon,
      badge: totalUnreadNotif.value
    },
    {
      id: 'profile',
      label: currentLang.value === 'en' ? 'Profile' : 'Profil Toko',
      to: '/dashboard/profile',
      icon: Store01Icon
    },
    {
      id: 'pengaturan',
      label: currentLang.value === 'en' ? 'Settings' : 'Pengaturan',
      to: '/dashboard/pengaturan',
      icon: Settings01Icon
    }
  ]
})

function handleNavigate(item: any) {
  emit('close')
  if (item.id === 'catat-kas') {
    emit('open-catat-kas')
  } else {
    router.push(item.to)
  }
}

// Close on Escape key
function handleKeyDown(e: KeyboardEvent) {
  if (e.key === 'Escape' && props.isOpen) {
    emit('close')
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleKeyDown)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeyDown)
})
</script>
