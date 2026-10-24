<template>
  <Teleport to="body">
    <!-- Backdrop Scrim with subtle blur -->
    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="isOpen"
        class="fixed inset-0 z-50 bg-black/40 dark:bg-black/70 backdrop-blur-xs lg:hidden"
        aria-hidden="true"
        @click="emit('close')"
      />
    </Transition>

    <!-- Elevated Bento Grid Menu Modal (Bento 8 Ubin Taktil Beruang - Ukuran Nyaman Jari) -->
    <Transition
      enter-active-class="transition duration-250 ease-out transform"
      enter-from-class="opacity-0 translate-y-6 scale-95"
      enter-to-class="opacity-100 translate-y-0 scale-100"
      leave-active-class="transition duration-150 ease-in transform"
      leave-from-class="opacity-100 translate-y-0 scale-100"
      leave-to-class="opacity-0 translate-y-6 scale-95"
    >
      <div
        v-if="isOpen"
        class="fixed bottom-[86px] left-1/2 -translate-x-1/2 z-50 lg:hidden max-w-[360px] sm:max-w-[380px] w-[calc(100vw-1.75rem)]"
        role="dialog"
        aria-modal="true"
        aria-label="Menu Akses Cepat UMKM"
      >
        <div class="p-4 sm:p-5 rounded-[28px] bg-white/95 dark:bg-[#13161F]/95 backdrop-blur-xl border border-[#CBD5E1] dark:border-neutral-800 shadow-[0_20px_50px_rgba(15,23,42,0.18)] dark:shadow-2xl space-y-3 font-poppins text-neutral-900 dark:text-white">
          <!-- Sheet Header -->
          <div class="flex items-center justify-between pb-2.5 border-b border-[#E2E8F0] dark:border-neutral-800 px-1">
            <span class="text-xs font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 font-poppins">
              Akses Cepat UMKM
            </span>
            <span class="text-[10px] font-semibold text-[#00800e] dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/80 px-2.5 py-0.5 rounded-full border border-emerald-200/80 dark:border-emerald-800/60">
              Beruang Siap Modal
            </span>
          </div>

          <!-- 8-Tile Bento Grid (Ukuran Besar & Nyaman Disentuh) -->
          <div class="grid grid-cols-4 gap-2 pt-1">
            <button
              v-for="item in quickAccessItems"
              :key="item.id"
              type="button"
              :class="[
                'flex flex-col items-center justify-center p-2 sm:p-2.5 min-h-[76px] sm:min-h-[80px] rounded-2xl border transition-all text-center group cursor-pointer relative active:scale-95',
                item.isPrimary
                  ? 'bg-emerald-50/80 dark:bg-emerald-950/40 border-emerald-300/80 dark:border-emerald-700/60 hover:bg-emerald-100/70'
                  : 'bg-[#F8FAFC] dark:bg-[#181C26] border-[#E2E8F0] dark:border-neutral-800/80 hover:border-[#00800e] hover:bg-emerald-50/40 dark:hover:bg-emerald-950/30'
              ]"
              @click="handleNavigate(item)"
            >
              <!-- Unread Badge if applicable -->
              <span
                v-if="item.badge && item.badge > 0"
                class="absolute top-1 right-1 px-1.5 py-0.2 rounded-full text-[9px] font-bold bg-[#00800e] text-white tabular-nums ring-2 ring-white dark:ring-[#13161F]"
              >
                {{ item.badge }}
              </span>

              <!-- Tile Icon Container (Ukuran Nyaman 44px-48px) -->
              <div
                :class="[
                  'w-11 h-11 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center transition-all shadow-2xs',
                  item.isPrimary
                    ? 'bg-[#00800e] text-white shadow-xs'
                    : 'bg-white dark:bg-[#121620] border border-[#E2E8F0] dark:border-neutral-700/80 text-neutral-700 dark:text-neutral-200 group-hover:text-[#00800e] dark:group-hover:text-emerald-400 group-hover:border-[#00800e]'
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
                    ? 'text-[#00800e] dark:text-emerald-300 font-bold'
                    : 'text-neutral-700 dark:text-neutral-300 group-hover:text-neutral-900 dark:group-hover:text-white'
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
import { useRouter } from 'vue-router'
import { useChatStore } from '~/stores/chat'
import { useNotificationStore } from '~/stores/notification'
import { HugeiconsIcon } from '@hugeicons/vue'
import {
  Add01Icon,
  Coins01Icon,
  AnalyticsUpIcon,
  Task01Icon,
  Award01Icon,
  Message01Icon,
  Notification01Icon,
  Store01Icon
} from '@hugeicons/core-free-icons'

const props = defineProps<{
  isOpen: boolean
}>()

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'open-catat-kas'): void
}>()

const router = useRouter()
const chatStore = useChatStore()
const notifStore = useNotificationStore()

const totalUnreadPesan = computed(() => {
  return chatStore.threads.reduce((acc, t) => acc + (t.unreadUmkm || 0), 0)
})

const totalUnreadNotif = computed(() => {
  return notifStore.unreadCount || 0
})

const quickAccessItems = computed(() => [
  {
    id: 'catat-kas',
    label: 'Catat Kas',
    to: '/dashboard/progres?action=catat-kas',
    icon: Add01Icon,
    isPrimary: true
  },
  {
    id: 'buku-kas',
    label: 'Buku Kas',
    to: '/dashboard/progres',
    icon: Coins01Icon
  },
  {
    id: 'kesehatan',
    label: 'Kesiapan',
    to: '/dashboard/penilaian',
    icon: AnalyticsUpIcon
  },
  {
    id: 'tugas',
    label: 'Tugas',
    to: '/dashboard/rencana-aksi',
    icon: Task01Icon
  },
  {
    id: 'modal',
    label: 'Cari Modal',
    to: '/dashboard/pendanaan',
    icon: Award01Icon
  },
  {
    id: 'pesan',
    label: 'Pesan',
    to: '/dashboard/pesan',
    icon: Message01Icon,
    badge: totalUnreadPesan.value
  },
  {
    id: 'notifikasi',
    label: 'Notifikasi',
    to: '/dashboard/notifikasi',
    icon: Notification01Icon,
    badge: totalUnreadNotif.value
  },
  {
    id: 'profile',
    label: 'Profil Toko',
    to: '/dashboard/profile',
    icon: Store01Icon
  }
])

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
