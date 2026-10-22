<template>
  <div class="relative">
    <!-- Trigger Button in Navbar -->
    <button
      type="button"
      :class="[
        'relative w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-150 active:scale-95 cursor-pointer select-none',
        isOpen
          ? 'bg-[#E6F4F7] dark:bg-[#2091AA]/20 text-[#2091AA] dark:text-[#50AABF] border-[1.5px] border-[#2091AA]/50 dark:border-[#50AABF]/50 shadow-xs'
          : 'bg-white dark:bg-[#18191E] hover:bg-neutral-100 dark:hover:bg-[#202128] border-[1.5px] border-slate-300 dark:border-neutral-800 text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white shadow-2xs'
      ]"
      aria-label="Notifikasi & Pemberitahuan Usaha"
      :aria-expanded="isOpen"
      title="Notifikasi"
      @click="toggleDropdown"
    >
      <HugeiconsIcon
        :icon="Notification01Icon"
        :size="16"
        :stroke-width="2.2"
        class="transition-transform duration-150"
      />

      <!-- Unread Indicator Dot (Standard Clean Dot) -->
      <span
        v-if="notificationStore.unreadCount > 0"
        class="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-red-500 ring-2 ring-white dark:ring-[#18191E]"
      />
    </button>

    <!-- Backdrop Overlay to close on outside click -->
    <div
      v-if="isOpen"
      class="fixed inset-0 z-40 bg-transparent"
      @click="isOpen = false"
    />

    <!-- Notification Popover Card (GoPay Tactile / Trueform FinTech Style) -->
    <div
      v-if="isOpen"
      class="absolute top-full right-0 mt-2.5 w-[360px] sm:w-[430px] max-w-[92vw] bg-white dark:bg-[#18191E] border border-neutral-200/90 dark:border-neutral-800 rounded-2xl shadow-2xl z-50 overflow-hidden font-poppins animate-in fade-in zoom-in-95 duration-150 select-none"
    >
      <!-- Header: Title, Unread Count Pill, and Mark All Read Action -->
      <div class="px-4 sm:px-5 py-3.5 border-b border-neutral-100 dark:border-neutral-800/80 bg-neutral-50/70 dark:bg-neutral-900/40 flex items-center justify-between">
        <div class="flex items-center gap-2">
          <h3 class="font-heading font-bold text-sm sm:text-[15px] text-neutral-900 dark:text-white tracking-tight">
            Notifikasi
          </h3>
          <span
            v-if="notificationStore.unreadCount > 0"
            class="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-emerald-50 text-[#00AA13] dark:text-emerald-400 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 tabular-nums"
          >
            {{ notificationStore.unreadCount }} Baru
          </span>
        </div>

        <button
          v-if="notificationStore.unreadCount > 0"
          type="button"
          class="text-xs font-medium text-[#2091AA] dark:text-[#50AABF] hover:text-[#187286] dark:hover:text-[#62BDD2] transition-colors flex items-center gap-1 active:scale-95 cursor-pointer"
          title="Tandai semua notifikasi sudah dibaca"
          @click="handleMarkAllRead"
        >
          <HugeiconsIcon :icon="CheckmarkSquare02Icon" :size="15" :stroke-width="1.8" />
          <span>Tandai Dibaca</span>
        </button>
      </div>

      <!-- Filter Category Tabs -->
      <div class="px-3.5 py-2 border-b border-neutral-100 dark:border-neutral-800 flex items-center gap-1 overflow-x-auto scrollbar-none bg-white dark:bg-[#18191E]">
        <button
          v-for="tab in filterTabs"
          :key="tab.id"
          type="button"
          :class="[
            'px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all duration-150 cursor-pointer',
            activeFilter === tab.id
              ? 'bg-[#E6F4F7] dark:bg-[#2091AA]/25 text-[#2091AA] dark:text-[#50AABF] font-semibold shadow-2xs'
              : 'text-neutral-500 dark:text-neutral-400 hover:text-neutral-800 dark:hover:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800/60'
          ]"
          @click="activeFilter = tab.id"
        >
          {{ tab.label }}
          <span
            v-if="tab.count !== undefined"
            class="text-[10px] ml-1 opacity-80 tabular-nums"
          >
            ({{ tab.count }})
          </span>
        </button>
      </div>

      <!-- Notification List Container -->
      <div class="max-h-[380px] sm:max-h-[440px] overflow-y-auto overscroll-contain divide-y divide-neutral-100 dark:divide-neutral-800/80">
        <!-- Empty State -->
        <div
          v-if="filteredNotifications.length === 0"
          class="py-12 px-6 text-center flex flex-col items-center justify-center space-y-3"
        >
          <div class="w-12 h-12 rounded-2xl bg-[#E6F4F7] dark:bg-[#2091AA]/15 text-[#2091AA] dark:text-[#50AABF] flex items-center justify-center">
            <HugeiconsIcon :icon="Notification02Icon" :size="24" :stroke-width="1.8" />
          </div>
          <div>
            <h4 class="font-heading font-semibold text-sm text-neutral-900 dark:text-white">
              Tidak Ada Notifikasi Baru
            </h4>
            <p class="text-xs text-neutral-500 dark:text-neutral-400 mt-1 max-w-[260px] mx-auto leading-relaxed">
              Semua laporan kas dan permodalan tokomu sudah terupdate. Semangat jualan hari ini!
            </p>
          </div>
          <button
            v-if="activeFilter !== 'ALL'"
            type="button"
            class="text-xs font-semibold text-[#2091AA] dark:text-[#50AABF] hover:underline cursor-pointer pt-1"
            @click="activeFilter = 'ALL'"
          >
            Tampilkan Semua Notifikasi
          </button>
        </div>

        <!-- Notification Items -->
        <div
          v-for="item in filteredNotifications"
          :key="item.id"
          :class="[
            'p-3.5 sm:p-4 transition-all duration-150 group relative cursor-pointer',
            item.isRead
              ? 'bg-white dark:bg-[#18191E] hover:bg-neutral-50 dark:hover:bg-[#1c1d24]'
              : 'bg-[#E6F4F7]/40 dark:bg-[#2091AA]/10 hover:bg-[#E6F4F7]/70 dark:hover:bg-[#2091AA]/15'
          ]"
          @click="handleNotificationClick(item)"
        >
          <div class="flex items-start gap-3">
            <!-- Category Icon Rosette Pill -->
            <div
              :class="[
                'w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center shrink-0 border shadow-2xs',
                categoryIconConfig[item.category].pillClass
              ]"
            >
              <HugeiconsIcon
                :icon="categoryIconConfig[item.category].icon"
                :size="18"
                :stroke-width="2"
              />
            </div>

            <!-- Content -->
            <div class="flex-1 min-w-0 pr-5">
              <div class="flex items-center gap-1.5">
                <!-- Unread Blue Dot -->
                <span
                  v-if="!item.isRead"
                  class="w-2 h-2 rounded-full bg-[#2091AA] dark:bg-[#50AABF] shrink-0"
                  title="Belum Dibaca"
                />
                <h4
                  :class="[
                    'text-[13px] sm:text-sm tracking-tight leading-snug truncate',
                    item.isRead
                      ? 'font-medium text-neutral-800 dark:text-neutral-200'
                      : 'font-bold text-neutral-900 dark:text-white'
                  ]"
                >
                  {{ item.title }}
                </h4>
              </div>

              <!-- Message Description -->
              <p class="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed mt-1 line-clamp-2">
                {{ item.message }}
              </p>

              <!-- Footer of item: Timestamp + Action Link Button -->
              <div class="flex items-center justify-between gap-2 mt-2.5 pt-0.5">
                <span class="text-[11px] text-neutral-400 dark:text-neutral-500 flex items-center gap-1 font-medium">
                  <HugeiconsIcon :icon="Clock01Icon" :size="12" :stroke-width="1.8" />
                  <span>{{ item.timestamp }}</span>
                </span>

                <span
                  v-if="item.actionLabel"
                  class="inline-flex items-center gap-1 text-[11px] font-semibold text-[#2091AA] dark:text-[#50AABF] group-hover:text-[#187589] dark:group-hover:text-[#6ec2d5] transition-colors"
                >
                  <span>{{ item.actionLabel }}</span>
                  <HugeiconsIcon :icon="ArrowRight01Icon" :size="11" :stroke-width="2.2" />
                </span>
              </div>
            </div>

            <!-- Dismiss / Delete Single Notification Button -->
            <button
              type="button"
              class="absolute top-3 right-3 p-1 rounded-lg text-neutral-300 dark:text-neutral-600 hover:text-neutral-600 dark:hover:text-neutral-300 hover:bg-neutral-200/50 dark:hover:bg-neutral-800 transition-all opacity-0 group-hover:opacity-100 cursor-pointer"
              title="Hapus pemberitahuan ini"
              @click.stop="handleDelete(item.id)"
            >
              <HugeiconsIcon :icon="Cancel01Icon" :size="14" :stroke-width="2" />
            </button>
          </div>
        </div>
      </div>

      <!-- Dropdown Bottom Footer: Button Lihat Semuanya (Mengarahkan ke Halaman Khusus Notifikasi) -->
      <div class="px-4 py-3 bg-neutral-50 dark:bg-neutral-900/60 border-t border-neutral-100 dark:border-neutral-800/80 flex items-center justify-between text-xs">
        <span class="text-neutral-500 dark:text-neutral-400 font-medium">
          {{ notificationStore.roleNotifications.length }} notifikasi tersimpan
        </span>
        <NuxtLink
          to="/dashboard/notifikasi"
          class="font-heading font-semibold text-[#2091AA] dark:text-[#50AABF] hover:text-[#187589] dark:hover:text-[#6ec2d5] flex items-center gap-1.5 transition-colors cursor-pointer group/footer"
          title="Buka Halaman Notifikasi"
          @click="isOpen = false"
        >
          <span>Lihat Semuanya</span>
          <HugeiconsIcon :icon="ArrowRight01Icon" :size="14" :stroke-width="2.2" class="transition-transform group-hover/footer:translate-x-0.5" />
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useNotificationStore, type AppNotification, type NotificationCategory } from '~/stores/notification'
import { HugeiconsIcon } from '@hugeicons/vue'
import {
  Notification01Icon,
  Notification02Icon,
  CheckmarkSquare02Icon,
  CheckmarkCircle01Icon,
  Award01Icon,
  Coins01Icon,
  AnalyticsUpIcon,
  Task01Icon,
  Clock01Icon,
  ArrowRight01Icon,
  Cancel01Icon
} from '@hugeicons/core-free-icons'

const router = useRouter()
const notificationStore = useNotificationStore()

const isOpen = ref(false)
const activeFilter = ref<'ALL' | 'UNREAD' | NotificationCategory>('ALL')

onMounted(() => {
  notificationStore.initNotifications()
})

function toggleDropdown() {
  isOpen.value = !isOpen.value
}

const categoryIconConfig: Record<
  NotificationCategory,
  { icon: any; pillClass: string }
> = {
  KONSULTAN: {
    icon: CheckmarkCircle01Icon,
    pillClass: 'bg-[#E6F4F7] text-[#2091AA] border-[#2091AA]/20 dark:bg-[#2091AA]/20 dark:text-[#50AABF] dark:border-[#50AABF]/30'
  },
  INVESTOR: {
    icon: Award01Icon,
    pillClass: 'bg-[#EFF6FF] text-[#0066D6] border-[#0066D6]/20 dark:bg-[#0066D6]/20 dark:text-[#60A5FA] dark:border-[#60A5FA]/30'
  },
  KESEHATAN: {
    icon: AnalyticsUpIcon,
    pillClass: 'bg-[#F0FDF4] text-[#00AA13] border-[#00AA13]/20 dark:bg-[#00AA13]/20 dark:text-[#22C55E] dark:border-[#22C55E]/30'
  },
  KAS: {
    icon: Coins01Icon,
    pillClass: 'bg-[#F0F9FF] text-[#0284C7] border-[#0284C7]/20 dark:bg-[#0284C7]/20 dark:text-[#38BDF8] dark:border-[#38BDF8]/30'
  },
  AKSI: {
    icon: Task01Icon,
    pillClass: 'bg-[#FEF3C7] text-[#D97706] border-[#D97706]/20 dark:bg-[#D97706]/20 dark:text-[#FBBF24] dark:border-[#FBBF24]/30'
  }
}

const filterTabs = computed(() => {
  const allCount = notificationStore.roleNotifications.length
  const unreadCount = notificationStore.unreadCount
  return [
    { id: 'ALL' as const, label: 'Semua', count: allCount },
    { id: 'UNREAD' as const, label: 'Belum Dibaca', count: unreadCount },
    { id: 'KONSULTAN' as const, label: 'Konsultan' },
    { id: 'INVESTOR' as const, label: 'Akses Modal' },
    { id: 'KAS' as const, label: 'Kas Toko' }
  ]
})

const filteredNotifications = computed(() => {
  const list = notificationStore.roleNotifications
  if (activeFilter.value === 'ALL') {
    return list
  }
  if (activeFilter.value === 'UNREAD') {
    return list.filter(n => !n.isRead)
  }
  return list.filter(n => n.category === activeFilter.value)
})

function handleMarkAllRead() {
  notificationStore.markAllAsRead()
}

function handleDelete(id: string) {
  notificationStore.deleteNotification(id)
}

function handleNotificationClick(item: AppNotification) {
  notificationStore.markAsRead(item.id)
  isOpen.value = false
  if (item.link) {
    router.push(item.link)
  }
}
</script>
