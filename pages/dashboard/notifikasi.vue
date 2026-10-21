<template>
  <div class="space-y-6 pb-20 font-sans text-neutral-900 dark:text-neutral-100 select-none">
    <!-- Top Controls -->
    <div class="flex items-center justify-end gap-2 pb-2 shrink-0 flex-wrap">
      <button
        v-if="notificationStore.unreadCount > 0"
        type="button"
        class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-[#E6F4F7] hover:bg-[#D6EEF3] dark:bg-[#2091AA]/20 dark:hover:bg-[#2091AA]/30 text-[#2091AA] dark:text-[#50AABF] border border-[#2091AA]/20 dark:border-[#50AABF]/30 transition-all duration-150 active:scale-95 cursor-pointer shadow-2xs"
        @click="notificationStore.markAllAsRead"
      >
        <HugeiconsIcon :icon="CheckmarkSquare02Icon" :size="15" :stroke-width="2" />
        <span>Tandai Semua Dibaca</span>
      </button>

      <button
        type="button"
        class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium text-neutral-500 hover:text-neutral-800 dark:text-neutral-400 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 border border-neutral-200/80 dark:border-neutral-800 transition-all duration-150 active:scale-95 cursor-pointer shadow-2xs"
        title="Segarkan data notifikasi"
        @click="handleRefresh"
      >
        <HugeiconsIcon :icon="RefreshIcon" :size="14" :stroke-width="1.8" />
        <span>Segarkan</span>
      </button>
    </div>

    <!-- Editorial Header Banner Card (GoPay Tactile Style) -->
    <div class="rounded-3xl card-tactile-gopay p-6 sm:p-7 relative overflow-hidden border border-neutral-200/80 dark:border-neutral-800/80 bg-white dark:bg-[#13161F]">
      <!-- Background Soft Ambient Glow -->
      <div class="absolute -right-16 -top-16 w-56 h-56 rounded-full bg-[#2091AA]/10 dark:bg-[#2091AA]/15 blur-3xl pointer-events-none" />
      <div class="absolute right-32 -bottom-16 w-48 h-48 rounded-full bg-[#00AA13]/10 dark:bg-[#00AA13]/10 blur-3xl pointer-events-none" />

      <div class="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div class="space-y-2 max-w-2xl">
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E6F4F7] dark:bg-[#2091AA]/20 text-[#2091AA] dark:text-[#50AABF] text-xs font-heading font-semibold border border-[#2091AA]/20 dark:border-[#50AABF]/30">
            <HugeiconsIcon :icon="CheckmarkBadge01Icon" :size="14" :stroke-width="2" />
            <span>Pusat Informasi & Validasi Toko</span>
          </div>

          <h2 class="text-2xl sm:text-3xl font-heading font-bold text-neutral-900 dark:text-white tracking-tight">
            Notifikasi
          </h2>

          <p class="text-sm sm:text-[15px] text-neutral-600 dark:text-neutral-300 font-sans leading-relaxed">
            Rekam jejak resmi validasi konsultan, pengajuan akses modal kemitraan, dan evaluasi pergerakan kas tokomu. Semua aktivitas tercatat secara transparan dan teratur.
          </p>
        </div>

        <!-- Right Quick Stat Pills -->
        <div class="grid grid-cols-2 gap-3 shrink-0">
          <div class="p-3.5 sm:p-4 rounded-2xl bg-neutral-50/80 dark:bg-[#18191E] border border-neutral-200/70 dark:border-neutral-800 flex flex-col justify-center min-w-[130px]">
            <span class="text-xs text-neutral-500 dark:text-neutral-400 font-medium">Belum Dibaca</span>
            <div class="flex items-baseline gap-1.5 mt-0.5">
              <span class="font-heading font-extrabold text-2xl text-[#2091AA] dark:text-[#50AABF] tabular-nums">
                {{ notificationStore.unreadCount }}
              </span>
              <span class="text-[11px] text-neutral-400">Pesan</span>
            </div>
          </div>

          <div class="p-3.5 sm:p-4 rounded-2xl bg-neutral-50/80 dark:bg-[#18191E] border border-neutral-200/70 dark:border-neutral-800 flex flex-col justify-center min-w-[130px]">
            <span class="text-xs text-neutral-500 dark:text-neutral-400 font-medium">Total Tersimpan</span>
            <div class="flex items-baseline gap-1.5 mt-0.5">
              <span class="font-heading font-extrabold text-2xl text-neutral-900 dark:text-white tabular-nums">
                {{ notificationStore.roleNotifications.length }}
              </span>
              <span class="text-[11px] text-neutral-400">Pemberitahuan</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Filter & Search Controls Bar -->
    <div class="flex flex-col md:flex-row md:items-center justify-between gap-3.5 bg-white dark:bg-[#13161F] p-3 sm:p-3.5 rounded-2xl border border-neutral-200/80 dark:border-neutral-800 shadow-2xs">
      <!-- Search Input -->
      <div class="relative flex-1 min-w-[240px]">
        <HugeiconsIcon
          :icon="Search01Icon"
          :size="16"
          :stroke-width="1.8"
          class="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none"
        />
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Cari pesan notifikasi, pengajuan modal, atau konsultan..."
          class="w-full pl-9 pr-8 py-2 rounded-xl text-xs sm:text-sm bg-neutral-50 dark:bg-[#18191E] border border-neutral-200 dark:border-neutral-700/80 text-neutral-900 dark:text-white placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-[#2091AA]/30 dark:focus:ring-[#50AABF]/30 transition-all"
        />
        <button
          v-if="searchQuery"
          type="button"
          class="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 text-neutral-400 hover:text-neutral-700 dark:hover:text-white"
          title="Hapus pencarian"
          @click="searchQuery = ''"
        >
          <HugeiconsIcon :icon="Cancel01Icon" :size="14" :stroke-width="2" />
        </button>
      </div>

      <!-- Filter Category Chips (Horizontal Scroll on Mobile) -->
      <div class="flex items-center gap-1.5 overflow-x-auto scrollbar-none pb-1 md:pb-0">
        <button
          v-for="chip in filterChips"
          :key="chip.id"
          type="button"
          :class="[
            'px-3.5 py-2 rounded-xl text-xs font-heading font-semibold whitespace-nowrap transition-all duration-150 cursor-pointer flex items-center gap-1.5 shrink-0',
            selectedFilter === chip.id
              ? 'bg-[#2091AA] text-white shadow-xs'
              : 'bg-neutral-100/80 dark:bg-[#18191E] text-neutral-600 dark:text-neutral-400 hover:bg-neutral-200/60 dark:hover:bg-neutral-800 hover:text-neutral-900 dark:hover:text-white border border-transparent'
          ]"
          @click="selectedFilter = chip.id"
        >
          <span>{{ chip.label }}</span>
          <span
            v-if="chip.count !== undefined"
            :class="[
              'text-[10px] px-1.5 py-0.2 rounded-full tabular-nums',
              selectedFilter === chip.id
                ? 'bg-white/20 text-white'
                : 'bg-neutral-200 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300'
            ]"
          >
            {{ chip.count }}
          </span>
        </button>
      </div>
    </div>

    <!-- Notification List Section -->
    <div class="space-y-3.5">
      <!-- Empty State -->
      <div
        v-if="displayedNotifications.length === 0"
        class="rounded-3xl card-tactile-gopay p-12 text-center flex flex-col items-center justify-center space-y-4 bg-white dark:bg-[#13161F] border border-neutral-200/80 dark:border-neutral-800"
      >
        <div class="w-16 h-16 rounded-3xl bg-[#E6F4F7] dark:bg-[#2091AA]/15 text-[#2091AA] dark:text-[#50AABF] flex items-center justify-center shadow-xs">
          <HugeiconsIcon :icon="Notification02Icon" :size="32" :stroke-width="1.8" />
        </div>
        <div class="max-w-md space-y-1">
          <h3 class="font-heading font-bold text-base sm:text-lg text-neutral-900 dark:text-white">
            Tidak Ada Notifikasi
          </h3>
          <p class="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed">
            <span v-if="searchQuery">
              Tidak ditemukan pemberitahuan yang cocok dengan kata kunci "{{ searchQuery }}". Coba gunakan kata kunci lain.
            </span>
            <span v-else>
              Semua laporan kas dan permodalan tokomu sudah terupdate rapi. Lanjutkan aktivitas bisnis tokomu hari ini!
            </span>
          </p>
        </div>
        <button
          v-if="selectedFilter !== 'ALL' || searchQuery"
          type="button"
          class="px-4 py-2 rounded-xl text-xs font-semibold bg-[#E6F4F7] text-[#2091AA] dark:bg-[#2091AA]/20 dark:text-[#50AABF] hover:bg-[#D6EEF3] dark:hover:bg-[#2091AA]/30 transition-all cursor-pointer"
          @click="resetFilters"
        >
          Tampilkan Semua Notifikasi
        </button>
      </div>

      <!-- Chronological Cards Grid -->
      <div
        v-for="item in displayedNotifications"
        :key="item.id"
        :class="[
          'rounded-2xl transition-all duration-200 group relative border overflow-hidden p-4 sm:p-5 select-none',
          item.isRead
            ? 'bg-white dark:bg-[#13161F] border-neutral-200/80 dark:border-neutral-800/80 hover:border-neutral-300 dark:hover:border-neutral-700 shadow-2xs'
            : 'bg-[#F4FAFE] dark:bg-[#121E2C] border-[#2091AA]/30 dark:border-[#50AABF]/30 shadow-xs'
        ]"
      >
        <!-- Unread Blue Accent Bar on Left Edge -->
        <div
          v-if="!item.isRead"
          class="absolute left-0 top-0 bottom-0 w-1 bg-[#2091AA] dark:bg-[#50AABF]"
        />

        <div class="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
          <!-- Left: Category Rosette Icon + Details -->
          <div class="flex items-start gap-3.5 sm:gap-4 min-w-0 flex-1">
            <!-- Rosette Category Icon -->
            <div
              :class="[
                'w-11 h-11 sm:w-12 sm:h-12 rounded-2xl flex items-center justify-center shrink-0 border shadow-2xs',
                categoryConfig[item.category].pillClass
              ]"
            >
              <HugeiconsIcon
                :icon="categoryConfig[item.category].icon"
                :size="22"
                :stroke-width="2"
              />
            </div>

            <!-- Text Content -->
            <div class="space-y-1.5 flex-1 min-w-0">
              <div class="flex items-center gap-2 flex-wrap">
                <!-- Category Badge Pill -->
                <span
                  :class="[
                    'text-[10px] font-heading font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border',
                    categoryConfig[item.category].badgeClass
                  ]"
                >
                  {{ categoryConfig[item.category].label }}
                </span>

                <!-- Unread Pill -->
                <span
                  v-if="!item.isRead"
                  class="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-[#00AA13]/10 text-[#00AA13] dark:text-[#22C55E] dark:bg-[#22C55E]/15"
                >
                  Belum Dibaca
                </span>

                <!-- Timestamp -->
                <span class="text-xs text-neutral-400 dark:text-neutral-500 font-medium flex items-center gap-1">
                  <HugeiconsIcon :icon="Clock01Icon" :size="12" :stroke-width="1.8" />
                  <span>{{ item.timestamp }}</span>
                </span>
              </div>

              <!-- Title -->
              <h3
                :class="[
                  'text-sm sm:text-base tracking-tight leading-snug',
                  item.isRead
                    ? 'font-semibold text-neutral-800 dark:text-neutral-200'
                    : 'font-bold text-neutral-900 dark:text-white'
                ]"
              >
                {{ item.title }}
              </h3>

              <!-- Message Body -->
              <p class="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed max-w-3xl">
                {{ item.message }}
              </p>
            </div>
          </div>

          <!-- Right: Action CTA & Context Actions -->
          <div class="flex items-center gap-2 sm:self-center shrink-0 pt-2 sm:pt-0 pl-14 sm:pl-0">
            <!-- Direct Action Button -->
            <NuxtLink
              v-if="item.actionLabel && item.link"
              :to="item.link"
              class="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-heading font-semibold bg-[#2091AA] hover:bg-[#187589] text-white shadow-xs transition-all duration-150 active:scale-95 cursor-pointer"
              @click="notificationStore.markAsRead(item.id)"
            >
              <span>{{ item.actionLabel }}</span>
              <HugeiconsIcon :icon="ArrowRight01Icon" :size="13" :stroke-width="2.2" />
            </NuxtLink>

            <!-- Mark as Read / Unread Toggle Button -->
            <button
              type="button"
              class="p-2 rounded-xl text-neutral-400 hover:text-neutral-700 dark:text-neutral-500 dark:hover:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors cursor-pointer"
              :title="item.isRead ? 'Tandai belum dibaca' : 'Tandai sudah dibaca'"
              @click="toggleReadState(item)"
            >
              <HugeiconsIcon
                :icon="item.isRead ? Notification01Icon : CheckmarkCircle01Icon"
                :size="18"
                :stroke-width="1.8"
              />
            </button>

            <!-- Delete Single Notification Button -->
            <button
              type="button"
              class="p-2 rounded-xl text-neutral-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 transition-colors cursor-pointer"
              title="Hapus pemberitahuan"
              @click="notificationStore.deleteNotification(item.id)"
            >
              <HugeiconsIcon :icon="Delete02Icon" :size="18" :stroke-width="1.8" />
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useNotificationStore, type AppNotification, type NotificationCategory } from '~/stores/notification'
import { HugeiconsIcon } from '@hugeicons/vue'
import {
  Home03Icon,
  Notification01Icon,
  Notification02Icon,
  CheckmarkSquare02Icon,
  CheckmarkBadge01Icon,
  CheckmarkCircle01Icon,
  Award01Icon,
  Coins01Icon,
  AnalyticsUpIcon,
  Task01Icon,
  Clock01Icon,
  ArrowRight01Icon,
  Cancel01Icon,
  Search01Icon,
  RefreshIcon,
  Delete02Icon
} from '@hugeicons/core-free-icons'

// SEO Metadata
useHead({
  title: 'Notifikasi — Beruang',
  meta: [
    {
      name: 'description',
      content: 'Pusat pemberitahuan resmi validasi konsultan, pengajuan akses modal kemitraan, dan pergerakan kas toko UMKM Beruang.'
    }
  ]
})

definePageMeta({
  layout: 'dashboard'
})

const notificationStore = useNotificationStore()

const searchQuery = ref('')
const selectedFilter = ref<'ALL' | 'UNREAD' | NotificationCategory>('ALL')

onMounted(() => {
  notificationStore.initNotifications()
  notificationStore.fetchNotifications()
})

function handleRefresh() {
  notificationStore.initNotifications(true)
  notificationStore.fetchNotifications()
}

function resetFilters() {
  selectedFilter.value = 'ALL'
  searchQuery.value = ''
}

function toggleReadState(item: AppNotification) {
  if (item.isRead) {
    item.isRead = false
    notificationStore.saveToStorage()
  } else {
    notificationStore.markAsRead(item.id)
  }
}

const categoryConfig: Record<
  NotificationCategory,
  { label: string; icon: any; pillClass: string; badgeClass: string }
> = {
  KONSULTAN: {
    label: 'Validasi Konsultan',
    icon: CheckmarkBadge01Icon,
    pillClass: 'bg-[#E6F4F7] text-[#2091AA] border-[#2091AA]/25 dark:bg-[#2091AA]/20 dark:text-[#50AABF] dark:border-[#50AABF]/30',
    badgeClass: 'bg-[#E6F4F7] text-[#2091AA] border-[#2091AA]/30 dark:bg-[#2091AA]/20 dark:text-[#50AABF]'
  },
  INVESTOR: {
    label: 'Akses Modal',
    icon: Award01Icon,
    pillClass: 'bg-[#EFF6FF] text-[#0066D6] border-[#0066D6]/25 dark:bg-[#0066D6]/20 dark:text-[#60A5FA] dark:border-[#60A5FA]/30',
    badgeClass: 'bg-[#EFF6FF] text-[#0066D6] border-[#0066D6]/30 dark:bg-[#0066D6]/20 dark:text-[#60A5FA]'
  },
  KESEHATAN: {
    label: 'Kesiapan Modal',
    icon: AnalyticsUpIcon,
    pillClass: 'bg-[#F0FDF4] text-[#00AA13] border-[#00AA13]/25 dark:bg-[#00AA13]/20 dark:text-[#22C55E] dark:border-[#22C55E]/30',
    badgeClass: 'bg-[#F0FDF4] text-[#00AA13] border-[#00AA13]/30 dark:bg-[#00AA13]/20 dark:text-[#22C55E]'
  },
  KAS: {
    label: 'Catatan Kas Toko',
    icon: Coins01Icon,
    pillClass: 'bg-[#F0F9FF] text-[#0284C7] border-[#0284C7]/25 dark:bg-[#0284C7]/20 dark:text-[#38BDF8] dark:border-[#38BDF8]/30',
    badgeClass: 'bg-[#F0F9FF] text-[#0284C7] border-[#0284C7]/30 dark:bg-[#0284C7]/20 dark:text-[#38BDF8]'
  },
  AKSI: {
    label: 'Rencana Aksi',
    icon: Task01Icon,
    pillClass: 'bg-[#FEF3C7] text-[#D97706] border-[#D97706]/25 dark:bg-[#D97706]/20 dark:text-[#FBBF24] dark:border-[#FBBF24]/30',
    badgeClass: 'bg-[#FEF3C7] text-[#D97706] border-[#D97706]/30 dark:bg-[#D97706]/20 dark:text-[#FBBF24]'
  }
}

const filterChips = computed(() => {
  const allCount = notificationStore.roleNotifications.length
  const unreadCount = notificationStore.unreadCount
  return [
    { id: 'ALL' as const, label: 'Semua', count: allCount },
    { id: 'UNREAD' as const, label: 'Belum Dibaca', count: unreadCount },
    { id: 'KONSULTAN' as const, label: 'Validasi Konsultan' },
    { id: 'INVESTOR' as const, label: 'Akses Modal' },
    { id: 'KESEHATAN' as const, label: 'Kesiapan Modal' },
    { id: 'KAS' as const, label: 'Kas Toko' }
  ]
})

const displayedNotifications = computed(() => {
  let list = [...notificationStore.roleNotifications]

  // Category filter
  if (selectedFilter.value === 'UNREAD') {
    list = list.filter(n => !n.isRead)
  } else if (selectedFilter.value !== 'ALL') {
    list = list.filter(n => n.category === selectedFilter.value)
  }

  // Keyword search filter
  if (searchQuery.value.trim()) {
    const q = searchQuery.value.toLowerCase().trim()
    list = list.filter(
      n =>
        n.title.toLowerCase().includes(q) ||
        n.message.toLowerCase().includes(q) ||
        n.category.toLowerCase().includes(q) ||
        (n.actionLabel && n.actionLabel.toLowerCase().includes(q))
    )
  }

  return list
})
</script>
