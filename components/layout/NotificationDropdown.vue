<template>
  <div ref="dropdownRef" class="relative">
    <!-- Trigger Button in Navbar (GoPay Tactile consistent with profile button) -->
    <button
      type="button"
      :class="[
        'relative w-11 h-11 min-w-[44px] min-h-[44px] rounded-[8px] flex items-center justify-center transition-all duration-150 cursor-pointer select-none border',
        isOpen
          ? 'bg-[#E6F4F7]! text-[#156374]! border-[#156374]/30! shadow-2xs'
          : 'bg-white dark:bg-[#13161F] hover:bg-neutral-100 dark:hover:bg-neutral-800/80 border-[#CBD5E1] dark:border-neutral-700 text-neutral-700 dark:text-neutral-200 shadow-2xs'
      ]"
      aria-label="Notifikasi & Pemberitahuan Usaha"
      :aria-expanded="isOpen"
      title="Notifikasi"
      @click="toggleDropdown"
    >
      <HugeiconsIcon
        :icon="Notification01Icon"
        :size="19"
        :stroke-width="2.0"
        class="transition-transform duration-150"
      />

      <!-- Perfect Circle Notification Badge (Container Bulat Sempurna) -->
      <span
        v-if="notificationStore.unreadCount > 0"
        :class="[
          'absolute -top-1 -right-1 rounded-full bg-[#00AA13] dark:bg-[#22C55E] text-white font-bold font-poppins flex items-center justify-center ring-2 ring-white dark:ring-[#13161F] tabular-nums leading-none shadow-xs pointer-events-none select-none shrink-0',
          notificationStore.unreadCount > 9
            ? 'min-w-[20px] h-5 px-1 text-[9.5px]'
            : 'w-5 h-5 min-w-[20px] min-h-[20px] aspect-square text-[11px]'
        ]"
      >
        {{ notificationStore.unreadCount > 99 ? '99+' : notificationStore.unreadCount }}
      </span>
    </button>

    <!-- Notification Popover Card (Stable Fixed Dimensions matching Linear & GitHub standards) -->
    <div
      v-if="isOpen"
      class="absolute top-full right-0 mt-2.5 w-[calc(100vw-24px)] sm:w-[410px] bg-white dark:bg-[#13161F] border border-[#CBD5E1] dark:border-neutral-700 rounded-2xl shadow-[0_12px_40px_rgba(0,0,0,0.12)] z-50 overflow-hidden font-poppins animate-in fade-in zoom-in-95 duration-150"
    >
      <!-- ========================================================================= -->
      <!-- 1. HEADER (Title, Unread Badge Pill, and 3-Dots Kebab Action Menu)         -->
      <!-- ========================================================================= -->
      <div class="px-5 py-3.5 bg-white dark:bg-[#13161F] flex items-center justify-between relative z-30">
        <div class="flex items-center gap-2.5">
          <h3 class="font-poppins font-bold text-base text-neutral-900 dark:text-white tracking-tight">
            {{ t('notif_title') }}
          </h3>
          <!-- Circle Badge Number (Replaces old '3 Baru' pill) -->
          <span
            v-if="notificationStore.unreadCount > 0"
            class="w-6 h-6 min-w-[24px] min-h-[24px] rounded-full bg-[#00AA13] dark:bg-[#22C55E] text-white text-[11px] font-bold font-poppins flex items-center justify-center tabular-nums shadow-2xs leading-none"
            title="Jumlah notifikasi belum dibaca"
          >
            {{ notificationStore.unreadCount > 99 ? '99+' : notificationStore.unreadCount }}
          </span>
        </div>

        <!-- 3-Dots Kebab Menu Button (Stacking Context z-40 so floating menu stays above all siblings) -->
        <div class="relative z-40" ref="kebabMenuRef">
          <button
            type="button"
            class="w-8 h-8 rounded-lg flex items-center justify-center border border-slate-200/80 dark:border-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white transition-colors cursor-pointer"
            title="Menu Opsi Notifikasi"
            @click.stop="isKebabOpen = !isKebabOpen"
          >
            <svg class="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
              <circle cx="12" cy="5" r="1.8" />
              <circle cx="12" cy="12" r="1.8" />
              <circle cx="12" cy="19" r="1.8" />
            </svg>
          </button>

          <!-- Floating Kebab Action Menu -->
          <div
            v-if="isKebabOpen"
            class="absolute right-0 top-full mt-1.5 w-52 bg-white dark:bg-[#13161F] border border-[#CBD5E1] dark:border-neutral-700 rounded-xl shadow-[0_12px_32px_rgba(0,0,0,0.15)] py-1.5 z-50 text-xs font-poppins animate-in fade-in zoom-in-95 duration-100"
          >
            <button
              v-if="notificationStore.unreadCount > 0"
              type="button"
              class="w-full px-3.5 py-2 text-left flex items-center gap-2 text-neutral-700 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors cursor-pointer"
              @click="handleMarkAllRead"
            >
              <HugeiconsIcon :icon="CheckmarkSquare02Icon" :size="14" :stroke-width="1.8" class="text-[#00AA13]" />
              <span>{{ t('notif_mark_all_read') }}</span>
            </button>
            <button
              type="button"
              class="w-full px-3.5 py-2 text-left flex items-center gap-2 text-neutral-700 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors cursor-pointer"
              @click="notificationStore.resetToDefault(); isKebabOpen = false"
            >
              <HugeiconsIcon :icon="Notification02Icon" :size="14" :stroke-width="1.8" class="text-[#2091AA]" />
              <span>{{ t('notif_refresh') }}</span>
            </button>
            <div class="h-px bg-slate-100 dark:bg-neutral-800 my-1" />
            <NuxtLink
              to="/dashboard/pengaturan"
              class="w-full px-3.5 py-2 text-left flex items-center gap-2 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors cursor-pointer"
              @click="isOpen = false; isKebabOpen = false"
            >
              <svg class="w-3.5 h-3.5 text-neutral-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="3" />
                <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83-2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
              </svg>
              <span>{{ t('notif_settings') }}</span>
            </NuxtLink>
          </div>
        </div>
      </div>

      <!-- ========================================================================= -->
      <!-- 2. COMPACT RESPONSIVE FILTER CHIPS (Semua, Pesanan, Kas, Investor, Sistem)-->
      <!-- ========================================================================= -->
      <div class="px-3.5 py-2 bg-white dark:bg-[#13161F] border-t border-[#E2E8F0] dark:border-neutral-800 relative z-10 overflow-x-auto scrollbar-none flex items-center gap-1.5 no-scrollbar">
        <button
          v-for="tab in filterTabs"
          :key="tab.id"
          type="button"
          :class="[
            'inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs transition-all duration-150 cursor-pointer shrink-0 select-none border font-poppins',
            activeFilter === tab.id
              ? 'bg-[#156374] dark:bg-[#50AABF] text-white dark:text-[#0C121D] border-[#156374] dark:border-[#50AABF] font-semibold shadow-2xs'
              : 'bg-neutral-100/90 dark:bg-neutral-800/70 hover:bg-neutral-200/80 dark:hover:bg-neutral-700/70 text-neutral-600 dark:text-neutral-300 border-transparent hover:border-slate-300 dark:hover:border-neutral-600 font-medium'
          ]"
          @click="activeFilter = tab.id"
        >
          <HugeiconsIcon :icon="tab.icon" :size="13" :stroke-width="activeFilter === tab.id ? 2.3 : 1.8" />
          <span>{{ tab.label }}</span>
        </button>
      </div>

      <!-- ========================================================================= -->
      <!-- 3. NOTIFICATION LIST CONTAINER (Stable Height across all tabs)            -->
      <!-- ========================================================================= -->
      <div class="min-h-[340px] max-h-[410px] sm:max-h-[430px] overflow-y-auto overscroll-contain divide-y divide-slate-100 dark:divide-neutral-800/80">
        <!-- Empty State (Clean & Warm with contextual message, perfectly centered) -->
        <div
          v-if="filteredNotifications.length === 0"
          class="h-[340px] px-6 text-center flex flex-col items-center justify-center space-y-3"
        >
          <div class="w-13 h-13 rounded-2xl bg-[#E6F4F7] dark:bg-[#2091AA]/15 text-[#2091AA] dark:text-[#50AABF] flex items-center justify-center shadow-xs">
            <svg class="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
              <path d="M13.73 21a2 2 0 0 1-3.46 0" />
              <line x1="2" y1="2" x2="22" y2="22" />
            </svg>
          </div>
          <div>
            <h4 class="font-heading font-semibold text-sm text-neutral-900 dark:text-white">
              {{ emptyStateInfo.title }}
            </h4>
            <p class="text-xs text-neutral-500 dark:text-neutral-400 mt-1 max-w-[270px] mx-auto leading-relaxed">
              {{ emptyStateInfo.desc }}
            </p>
          </div>
          <button
            v-if="activeFilter !== 'ALL'"
            type="button"
            class="text-xs font-semibold text-[#156374] dark:text-[#50AABF] hover:underline cursor-pointer pt-1"
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
            'p-4 sm:px-5 sm:py-4 transition-colors duration-150 group relative cursor-pointer',
            item.isRead
              ? 'bg-white dark:bg-[#13161F] hover:bg-neutral-50 dark:hover:bg-neutral-800/40'
              : 'bg-[#F3F8FC] dark:bg-[#0C121D] hover:bg-[#EBF6F9] dark:hover:bg-[#131B2A]'
          ]"
          @click="handleNotificationClick(item)"
        >
          <div class="flex items-start gap-3.5">
            <!-- ----------------------------------------------------------------- -->
            <!-- Item Visual: Avatar with Red Counter Pill OR Styled Squircle Icon  -->
            <!-- ----------------------------------------------------------------- -->
            <!-- CASE 1: Contact Avatar with Red Badge Count -->
            <div
              v-if="item.avatar"
              class="relative w-11 h-11 rounded-full shrink-0"
            >
              <img
                :src="item.avatar"
                :alt="item.title"
                class="w-full h-full rounded-full object-cover border border-slate-200 dark:border-neutral-700 bg-neutral-100 dark:bg-neutral-800 shadow-2xs"
                @error="(e: any) => { e.target.src = '/images/user-profile.png' }"
              />
              <!-- Red Badge Count Pill on Top-Right -->
              <span
                v-if="item.badgeCount"
                class="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 rounded-full bg-[#EF4444] text-white text-[10px] font-bold flex items-center justify-center ring-2 ring-white dark:ring-[#13161F] tabular-nums shadow-xs leading-none"
              >
                {{ item.badgeCount }}
              </span>
            </div>

            <!-- CASE 2: Squircle with Checkmark (Beruang Brand Cyan/Teal Palette) -->
            <div
              v-else-if="item.iconType === 'verified'"
              class="w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 bg-[#EBF6F9] dark:bg-[#156374]/20 border border-[#A9D8E5]/60 dark:border-[#2091AA]/30 text-[#156374] dark:text-[#50AABF] shadow-2xs"
            >
              <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round">
                <path d="M20 6 9 17l-5-5" />
              </svg>
            </div>

            <!-- CASE 3: Squircle with Shield (System & Security - Beruang Brand Cyan/Teal Palette) -->
            <div
              v-else-if="item.iconType === 'shield'"
              class="w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 bg-[#EBF6F9] dark:bg-[#156374]/20 border border-[#A9D8E5]/60 dark:border-[#2091AA]/30 text-[#156374] dark:text-[#50AABF] shadow-2xs"
            >
              <HugeiconsIcon :icon="Shield01Icon" :size="20" :stroke-width="2.1" />
            </div>

            <!-- CASE 4: Squircle with Growth / Activity Wave (Beruang Brand Cyan/Teal Palette) -->
            <div
              v-else-if="item.iconType === 'growth'"
              class="w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 bg-[#EBF6F9] dark:bg-[#156374]/20 border border-[#A9D8E5]/60 dark:border-[#2091AA]/30 text-[#156374] dark:text-[#50AABF] shadow-2xs"
            >
              <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
              </svg>
            </div>

            <!-- CASE 5: Fallback Squircle Icon (Beruang Brand Cyan/Teal Palette) -->
            <div
              v-else
              class="w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 bg-[#EBF6F9] dark:bg-[#156374]/20 border border-[#A9D8E5]/60 dark:border-[#2091AA]/30 text-[#156374] dark:text-[#50AABF] shadow-2xs"
            >
              <HugeiconsIcon
                :icon="categoryIconConfig[item.category]?.icon || Notification01Icon"
                :size="19"
                :stroke-width="2.1"
              />
            </div>

            <!-- ----------------------------------------------------------------- -->
            <!-- Middle Column: Title, Subtitle / Description, Timestamp           -->
            <!-- ----------------------------------------------------------------- -->
            <div class="flex-1 min-w-0 pr-4">
              <!-- Title (Semibold, matching reference) -->
              <h4
                :class="[
                  'text-[14px] tracking-tight leading-snug truncate',
                  item.isRead
                    ? 'font-medium text-neutral-800 dark:text-neutral-200'
                    : 'font-semibold text-neutral-900 dark:text-white'
                ]"
              >
                {{ item.title }}
              </h4>

              <!-- Message Description (Only shown when item has detailed body message) -->
              <p
                v-if="item.iconType === 'verified' || item.iconType === 'growth' || item.category === 'INVESTOR'"
                class="text-[12.5px] text-neutral-500 dark:text-neutral-400 leading-relaxed mt-0.5 line-clamp-2"
              >
                {{ item.message }}
              </p>

              <!-- Timestamp -->
              <div class="mt-1 flex items-center justify-between gap-2">
                <span class="text-[12px] text-neutral-400 dark:text-neutral-500 font-normal tabular-nums">
                  {{ item.timestamp }}
                </span>

                <span
                  v-if="!item.isRead"
                  class="w-1.5 h-1.5 rounded-full bg-[#00AA13] dark:bg-[#22C55E] shrink-0"
                  title="Belum Dibaca"
                />
              </div>
            </div>

            <!-- Single Item Dismiss / Delete Button (Appears on Row Hover) -->
            <button
              type="button"
              class="absolute top-3.5 right-3.5 w-6 h-6 rounded-md flex items-center justify-center text-neutral-400 dark:text-neutral-500 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-all opacity-0 group-hover:opacity-100 cursor-pointer"
              title="Hapus notifikasi"
              @click.stop="handleDelete(item.id)"
            >
              <HugeiconsIcon :icon="Cancel01Icon" :size="13" :stroke-width="2.2" />
            </button>
          </div>
        </div>
      </div>

      <!-- ========================================================================= -->
      <!-- 4. BOTTOM FOOTER (Full-Width Tactile Container with Gray Hover Effect)     -->
      <!-- ========================================================================= -->
      <div class="border-t border-[#E2E8F0] dark:border-neutral-800 bg-white dark:bg-[#13161F]">
        <NuxtLink
          to="/dashboard/notifikasi"
          class="w-full py-3.5 px-4 flex items-center justify-center gap-2 text-center font-poppins font-semibold text-xs sm:text-[13px] text-[#156374] dark:text-[#50AABF] hover:bg-neutral-100 dark:hover:bg-neutral-800/80 active:bg-neutral-200/70 dark:active:bg-neutral-700/60 transition-colors duration-150 cursor-pointer group/link select-none"
          title="Buka Halaman Notifikasi Lengkap"
          @click="isOpen = false"
        >
          <span>{{ t('notif_view_all') }}</span>
          <svg class="w-3.5 h-3.5 transition-transform duration-150 group-hover/link:translate-x-1 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
          </svg>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useLanguage } from '~/composables/useLanguage'
import { useNotificationStore, type AppNotification } from '~/stores/notification'
import { HugeiconsIcon } from '@hugeicons/vue'
import {
  Notification01Icon,
  Notification02Icon,
  CheckmarkSquare02Icon,
  CheckmarkCircle01Icon,
  Award01Icon,
  Coins01Icon,
  AnalyticsUpIcon,
  Shield01Icon,
  ShoppingBag01Icon,
  Task01Icon,
  Cancel01Icon
} from '@hugeicons/core-free-icons'

const router = useRouter()
const route = useRoute()
const notificationStore = useNotificationStore()

const dropdownRef = ref<HTMLElement | null>(null)
const kebabMenuRef = ref<HTMLElement | null>(null)
const isOpen = ref(false)
const isKebabOpen = ref(false)

type FilterTabId = 'ALL' | 'ORDER' | 'CASH' | 'INVESTOR' | 'SYSTEM'
const activeFilter = ref<FilterTabId>('ALL')

function handleClickOutside(e: MouseEvent) {
  if (dropdownRef.value && !dropdownRef.value.contains(e.target as Node)) {
    isOpen.value = false
    isKebabOpen.value = false
  }
}

function handleKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape') {
    isOpen.value = false
    isKebabOpen.value = false
  }
}

function handleScroll(e: Event) {
  if (!isOpen.value) return
  // Prevent closing when user is scrolling the notification list or tabs inside the dropdown
  if (dropdownRef.value && dropdownRef.value.contains(e.target as Node)) {
    return
  }
  isOpen.value = false
  isKebabOpen.value = false
}

watch(() => route.path, () => {
  isOpen.value = false
  isKebabOpen.value = false
})

onMounted(() => {
  notificationStore.initNotifications()
  if (import.meta.client) {
    document.addEventListener('click', handleClickOutside)
    document.addEventListener('keydown', handleKeydown)
    window.addEventListener('scroll', handleScroll, { capture: true, passive: true })
  }
})

onUnmounted(() => {
  if (import.meta.client) {
    document.removeEventListener('click', handleClickOutside)
    document.removeEventListener('keydown', handleKeydown)
    window.removeEventListener('scroll', handleScroll, { capture: true })
  }
})

function toggleDropdown() {
  isOpen.value = !isOpen.value
  if (!isOpen.value) {
    isKebabOpen.value = false
  }
}

const categoryIconConfig: Record<
  string,
  { icon: any; pillClass: string }
> = {
  KONSULTAN: {
    icon: CheckmarkCircle01Icon,
    pillClass: 'bg-[#EBF6F9] text-[#156374] border-[#A9D8E5]/60 dark:bg-[#156374]/20 dark:text-[#50AABF] dark:border-[#2091AA]/30'
  },
  INVESTOR: {
    icon: Award01Icon,
    pillClass: 'bg-[#EBF6F9] text-[#156374] border-[#A9D8E5]/60 dark:bg-[#156374]/20 dark:text-[#50AABF] dark:border-[#2091AA]/30'
  },
  KESEHATAN: {
    icon: AnalyticsUpIcon,
    pillClass: 'bg-[#EBF6F9] text-[#156374] border-[#A9D8E5]/60 dark:bg-[#156374]/20 dark:text-[#50AABF] dark:border-[#2091AA]/30'
  },
  KAS: {
    icon: Coins01Icon,
    pillClass: 'bg-[#EBF6F9] text-[#156374] border-[#A9D8E5]/60 dark:bg-[#156374]/20 dark:text-[#50AABF] dark:border-[#2091AA]/30'
  },
  AKSI: {
    icon: Task01Icon,
    pillClass: 'bg-[#EBF6F9] text-[#156374] border-[#A9D8E5]/60 dark:bg-[#156374]/20 dark:text-[#50AABF] dark:border-[#2091AA]/30'
  }
}

const { t } = useLanguage()

// 5 Filter Tabs: Semua, Pesanan, Kas, Investor, Sistem
const filterTabs = computed(() => [
  { id: 'ALL' as const, label: t('notif_tab_all'), icon: Notification01Icon },
  { id: 'ORDER' as const, label: t('notif_tab_order'), icon: ShoppingBag01Icon },
  { id: 'CASH' as const, label: t('notif_tab_cash'), icon: Coins01Icon },
  { id: 'INVESTOR' as const, label: t('notif_tab_investor'), icon: Award01Icon },
  { id: 'SYSTEM' as const, label: t('notif_tab_system'), icon: Shield01Icon }
])

const filteredNotifications = computed(() => {
  const list = notificationStore.roleNotifications
  if (activeFilter.value === 'ALL') {
    return list
  }
  if (activeFilter.value === 'ORDER') {
    return list.filter(n =>
      n.title.toLowerCase().includes('pesanan') ||
      n.badgeCount !== undefined ||
      (n.avatar && n.category === 'KAS')
    )
  }
  if (activeFilter.value === 'CASH') {
    return list.filter(n =>
      !n.title.toLowerCase().includes('pesanan') &&
      n.badgeCount === undefined &&
      (n.category === 'KAS' || n.category === 'KONSULTAN' || n.category === 'KESEHATAN' || n.iconType === 'wallet' || n.iconType === 'growth' || n.iconType === 'verified')
    )
  }
  if (activeFilter.value === 'INVESTOR') {
    return list.filter(n =>
      n.category === 'INVESTOR' ||
      n.iconType === 'deal' ||
      n.title.toLowerCase().includes('investor') ||
      n.title.toLowerCase().includes('modal')
    )
  }
  if (activeFilter.value === 'SYSTEM') {
    return list.filter(n =>
      n.category === 'AKSI' ||
      n.iconType === 'shield' ||
      n.senderName?.toLowerCase().includes('sistem') ||
      n.title.toLowerCase().includes('keamanan') ||
      n.title.toLowerCase().includes('sandi')
    )
  }
  return list
})

const emptyStateInfo = computed(() => {
  switch (activeFilter.value) {
    case 'ORDER':
      return {
        title: 'Tidak ada pesanan baru',
        desc: 'Belum ada transaksi pesanan masuk saat ini. Pesanan baru dari pelanggan akan muncul di sini.'
      }
    case 'CASH':
      return {
        title: 'Tidak ada pembaruan kas',
        desc: 'Catatan kas dan verifikasi pergerakan uang tokomu saat ini sudah rapi tervalidasi.'
      }
    case 'INVESTOR':
      return {
        title: 'Belum ada pesan investor',
        desc: 'Tawaran akses modal, permohonan ruang data, dan respon investor akan tampil di segmen ini.'
      }
    case 'SYSTEM':
      return {
        title: 'Tidak ada pesan sistem',
        desc: 'Semua sistem keamanan, akun toko, dan layanan Beruang berjalan normal tanpa kendala.'
      }
    default:
      return {
        title: 'Tidak ada notifikasi baru',
        desc: 'Semua laporan kas dan permodalan tokomu sudah terupdate. Semangat jualan hari ini!'
      }
  }
})

function handleMarkAllRead() {
  notificationStore.markAllAsRead()
  isKebabOpen.value = false
}

function handleDelete(id: string) {
  notificationStore.deleteNotification(id)
}

function handleNotificationClick(item: AppNotification) {
  notificationStore.markAsRead(item.id)
  isOpen.value = false
  isKebabOpen.value = false
  if (item.link) {
    router.push(item.link)
  }
}
</script>
