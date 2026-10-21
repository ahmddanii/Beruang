<template>
  <div class="h-full flex flex-col shrink-0">
    <!-- Desktop Sidebar (Full-height flush on left) -->
    <aside
      ref="asideRef"
      :class="[
        'hidden lg:flex flex-col shrink-0 h-full z-20 select-none border-r transition-[width] duration-300 ease-[cubic-bezier(0.2,0,0,1)] will-change-[width]',
        isCollapsed ? 'w-[72px]' : 'w-64',
        'bg-[#FFFFFF] dark:bg-[#13161F] border-[#E2E8F0] dark:border-neutral-800/80 shadow-[1px_0_10px_rgba(0,0,0,0.02)]'
      ]"
    >
      <div class="flex flex-col h-full overflow-hidden">
        <!-- 1. Top of Sidebar: Branding Header (Expanded: Logo + Text; Compact: Logo Only) -->
        <div
          ref="brandHeaderRef"
          class="sidebar-brand-header w-full h-[52px] shrink-0 flex items-center border-b border-[#E2E8F0] dark:border-neutral-800/80 select-none overflow-hidden relative px-3"
          :class="isCollapsed ? 'justify-center' : 'justify-between'"
        >
          <!-- Brand Logo & Name Link (Expanded Mode) -->
          <NuxtLink
            v-if="!isCollapsed"
            :to="homePath"
            class="flex items-center gap-2.5 cursor-pointer select-none group min-w-0 h-full px-1 flex-1"
            title="Beranda Beruang"
            @click="handleBrandClick"
          >
            <!-- Logo Box: Always centered on icon axis -->
            <div class="w-10 h-10 shrink-0 flex items-center justify-center">
              <img
                src="/logo/logoSmall.svg"
                alt="Beruang Logo"
                class="h-6.5 w-auto object-contain shrink-0 transition-transform duration-150 group-hover:scale-105"
              />
            </div>
            <!-- Bolder font weight, letter spacing -2% (-0.02em), no clipping/overflow-visible -->
            <span class="sidebar-brand-text font-heading font-bold text-[18px] tracking-[-0.02em] leading-none select-none overflow-visible whitespace-nowrap">
              <span class="text-[#156374] dark:text-[#50AABF]">Ber</span><span class="text-[#00800e] dark:text-[#00C058]">uang</span>
            </span>
          </NuxtLink>

          <!-- Compact Mode: LogoSmall as interactive toggle button to expand sidebar -->
          <button
            v-else
            type="button"
            class="w-10 h-10 rounded-lg flex items-center justify-center text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-all duration-200 active:scale-95 cursor-pointer mx-auto group"
            title="Perluas Sidebar (Ctrl+B)"
            aria-label="Perluas Sidebar"
            @click="handleToggleCollapse"
          >
            <img
              src="/logo/logoSmall.svg"
              alt="Beruang Logo"
              class="h-6.5 w-auto object-contain shrink-0 transition-transform duration-150 group-hover:scale-110"
            />
          </button>
        </div>

        <!-- 2. Lottie Animation Banner with Mascot Bear (Visible in expanded, smoothly collapses in compact) -->
        <div
          ref="bannerRef"
          :class="[
            'sidebar-banner relative w-full shrink-0 overflow-hidden select-none transition-all duration-300 ease-[cubic-bezier(0.2,0,0,1)]',
            isCollapsed
              ? 'h-0 max-h-0 opacity-0 pointer-events-none border-b-0 m-0 p-0'
              : 'h-32 opacity-100 border-b border-[#E2E8F0] dark:border-neutral-800/80',
            timeBackgroundClasses
          ]"
        >
          <!-- 1:1 Aspect-Square Container Centered Vertically so Lottie animation stays a perfect round circle and never stretches -->
          <div class="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
            <div class="w-full aspect-square shrink-0 flex items-center justify-center">
              <ClientOnly>
                <DotLottieVue
                  :src="currentLottieSrc"
                  :autoplay="true"
                  :loop="true"
                  :layout="{ fit: 'cover', align: [0.5, 0.5] }"
                  class="w-full h-full"
                />
              </ClientOnly>
            </div>
          </div>

          <!-- Subtle overlay to ensure crisp contrast on any background -->
          <div class="absolute inset-0 bg-black/15 pointer-events-none" />

          <!-- Compact Sidebar Button inside Lottie Animation Banner (Dicoding Style) -->
          <button
            v-if="!isCollapsed"
            type="button"
            class="sidebar-toggle-btn absolute top-2.5 right-2.5 w-7.5 h-7.5 rounded-lg bg-black/45 hover:bg-black/70 text-white flex items-center justify-center transition-all duration-150 active:scale-95 cursor-pointer shadow-sm border border-white/20 backdrop-blur-md z-10"
            title="Ciutkan Sidebar (Ctrl+B)"
            aria-label="Ciutkan Sidebar"
            @click="handleToggleCollapse"
          >
            <HugeiconsIcon
              :icon="SidebarLeft01Icon"
              :size="16"
              :stroke-width="2.0"
              class="text-white"
            />
          </button>
        </div>

        <!-- Navigation Items List (Categorized, Constant Y Coordinates, Fluid Horizontal Shrink) -->
        <div class="flex-1 overflow-y-auto overflow-x-hidden scrollbar-none py-3 px-3 overscroll-contain">
          <nav class="space-y-1" aria-label="Menu Utama">
            <div
              v-for="(section, sIdx) in navigationSections"
              :key="`sec-${sIdx}`"
              class="space-y-1"
            >
              <!-- Hairline section divider between groups -->
              <div
                v-if="sIdx > 0"
                class="h-px bg-slate-200/70 dark:bg-neutral-800/80 my-2 mx-1 shrink-0"
              />

              <!-- Section Category Title: Apple fine-print 11px uppercase tracking-wider -->
              <div
                v-if="section.title"
                :class="[
                  'sidebar-section-title flex items-center overflow-hidden whitespace-nowrap font-poppins transition-all duration-200 ease-in-out',
                  isCollapsed ? 'max-h-0 mb-0 opacity-0 pointer-events-none' : 'max-h-5 h-4 mb-1.5 opacity-100'
                ]"
              >
                <span class="text-[11px] font-semibold text-neutral-400 dark:text-neutral-500 font-poppins px-2 uppercase tracking-wider">
                  {{ section.title }}
                </span>
              </div>

              <!-- Unified Navigation Items: Apple 44px touch target, rounded 10px, 14px label -->
              <div class="space-y-1">
                <NuxtLink
                  v-for="item in section.items"
                  :key="item.to"
                  :to="item.to"
                  :title="isCollapsed ? item.label : undefined"
                  :class="[
                    'sidebar-nav-item h-11 flex items-center font-poppins group relative overflow-hidden rounded-[10px] transition-all duration-200',
                    isCollapsed
                      ? 'w-11 mx-auto justify-center px-0'
                      : 'w-full px-0 justify-start',
                    isActive(item.to)
                      ? 'bg-[#E6F4F7] hover:bg-[#D9EEF3] dark:bg-[#156374]/20 dark:hover:bg-[#156374]/30 text-[#156374] dark:text-[#50AABF] font-semibold border border-[#156374]/20 dark:border-[#50AABF]/25 shadow-2xs'
                      : 'text-[#64748B] dark:text-neutral-400 font-medium hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100/80 dark:hover:bg-neutral-800/60 border border-transparent'
                  ]"
                >
                  <!-- Icon Container: Anchored at 44px Box -->
                  <div class="sidebar-icon-box w-11 h-11 shrink-0 flex items-center justify-center relative">
                    <SidebarNavIcon
                      :to="item.to"
                      :outline-icon="item.icon"
                      :active="isActive(item.to)"
                    />
                    <!-- Collapsed unread dot -->
                    <span
                      v-if="item.badge"
                      :class="[
                        'absolute top-2.5 right-2.5 w-2 h-2 rounded-full bg-red-500 ring-2 ring-white dark:ring-[#13161F] transition-all duration-200 pointer-events-none',
                        isCollapsed ? 'opacity-100 scale-100' : 'opacity-0 scale-0'
                      ]"
                    />
                  </div>

                  <!-- Label Container: Apple 14px typography with fluid horizontal collapse -->
                  <div
                    :class="[
                      'sidebar-label overflow-hidden whitespace-nowrap flex items-center justify-between text-[14px] flex-1 min-w-0 transition-all duration-250 ease-in-out',
                      isCollapsed
                        ? 'max-w-0 opacity-0 pointer-events-none -translate-x-2'
                        : 'max-w-[190px] opacity-100 pl-0.5 pr-3 pointer-events-auto translate-x-0'
                    ]"
                  >
                    <span class="truncate leading-none">{{ item.label }}</span>
                    <span
                      v-if="item.badge"
                      class="ml-1.5 px-2 py-0.5 rounded-full text-[11px] font-semibold bg-red-600 text-white tabular-nums leading-none shrink-0"
                    >
                      {{ item.badge }}
                    </span>
                  </div>
                </NuxtLink>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </aside>

    <!-- Mobile Drawer Overlay & Panel (Responsive Parity with GoPay Tactile & Poppins typography) -->
    <Teleport to="body">
      <div
        v-if="isMobileOpen"
        class="fixed inset-0 z-50 lg:hidden flex"
        role="dialog"
        aria-modal="true"
      >
        <!-- Backdrop -->
        <div
          class="fixed inset-0 bg-neutral-950/40 backdrop-blur-xs transition-opacity"
          @click="$emit('closeMobile')"
        />

        <!-- Slide-out Drawer Panel in Tactile Background -->
        <div class="relative w-80 max-w-[88vw] bg-[#FDFDFD] dark:bg-[#13161F] h-full flex flex-col shadow-2xl z-10 pb-6 overflow-hidden border-r border-slate-200/80 dark:border-neutral-800">
          <!-- Mobile Drawer Branding Header (Placed ABOVE Lottie animation banner) -->
          <div class="w-full h-14 shrink-0 px-4 flex items-center justify-between border-b border-slate-200/80 dark:border-neutral-800/80 bg-[#FDFDFD] dark:bg-[#13161F] select-none">
            <NuxtLink
              :to="homePath"
              class="flex items-center gap-2.5 cursor-pointer select-none group"
              title="Kembali ke Beranda"
              @click="handleBrandClick"
            >
              <img
                src="/logo/logoSmall.svg"
                alt="Beruang Logo"
                class="h-6 w-auto object-contain"
              />
              <span class="font-heading font-semibold text-lg tracking-tight leading-none select-none">
                <span class="text-[#156374] dark:text-[#50AABF]">Ber</span><span class="text-[#00800e] dark:text-[#00C058]">uang</span>
              </span>
            </NuxtLink>

            <!-- Close Button: Square Rounded Corner (Solid Black, No Drop Shadow, rounded-[8px]) -->
            <button
              type="button"
              class="w-8 h-8 rounded-lg bg-neutral-900 hover:bg-black text-white flex items-center justify-center transition-colors duration-150 active:scale-95 cursor-pointer shadow-none"
              aria-label="Tutup Menu"
              @click="$emit('closeMobile')"
            >
              <HugeiconsIcon :icon="Cancel01Icon" :size="16" :stroke-width="2.2" />
            </button>
          </div>

          <!-- Lottie Animation Banner (Mobile Drawer) -->
          <div
            :class="[
              'relative w-full h-32 shrink-0 overflow-hidden select-none border-b border-slate-200/80 dark:border-neutral-800/80',
              timeBackgroundClasses
            ]"
          >
            <!-- 1:1 Aspect-Square Container Centered Vertically -->
            <div class="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
              <div class="w-full aspect-square shrink-0 flex items-center justify-center">
                <ClientOnly>
                  <DotLottieVue
                    :src="currentLottieSrc"
                    :autoplay="true"
                    :loop="true"
                    :layout="{ fit: 'cover', align: [0.5, 0.5] }"
                    class="w-full h-full"
                  />
                </ClientOnly>
              </div>
            </div>
            <div class="absolute inset-0 bg-black/15 pointer-events-none" />
          </div>

          <!-- Mobile Nav Items -->
          <div class="flex-1 overflow-y-auto scrollbar-none py-3 px-3">
            <nav class="space-y-1">
              <div
                v-for="(section, sIdx) in navigationSections"
                :key="`mob-sec-${sIdx}`"
                class="space-y-1"
              >
                <!-- Hairline section divider between groups -->
                <div
                  v-if="sIdx > 0"
                  class="h-px bg-slate-200/70 dark:bg-neutral-800/80 my-2 mx-1 shrink-0"
                />

                <!-- Section Category Title -->
                <div
                  v-if="section.title"
                  class="px-2 pt-1.5 pb-1 text-[11px] font-semibold text-neutral-400 dark:text-neutral-500 uppercase tracking-wider font-poppins"
                >
                  {{ section.title }}
                </div>

                <!-- Section Items -->
                <div class="space-y-1">
                  <NuxtLink
                    v-for="item in section.items"
                    :key="`mob-${item.to}`"
                    :to="item.to"
                    :class="[
                      'flex items-center gap-3.5 px-3.5 py-2.5 rounded-[10px] font-poppins text-[15px] transition-all duration-150 group border',
                      isActive(item.to)
                        ? 'bg-[#E6F4F7] dark:bg-[#156374]/20 text-[#156374] dark:text-[#50AABF] font-semibold border-[#156374]/20 shadow-2xs'
                        : 'text-neutral-600 dark:text-neutral-400 font-normal hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 border-transparent'
                    ]"
                    @click="$emit('closeMobile')"
                  >
                    <SidebarNavIcon
                      :to="item.to"
                      :outline-icon="item.icon"
                      :active="isActive(item.to)"
                    />
                    <span class="truncate flex-1">{{ item.label }}</span>
                    <span
                      v-if="item.badge"
                      class="ml-1.5 px-2 py-0.5 rounded-full text-xs font-bold bg-red-600 text-white tabular-nums leading-none shrink-0"
                    >
                      {{ item.badge }}
                    </span>
                  </NuxtLink>
                </div>
              </div>
            </nav>
          </div>

          <!-- Bottom Profile Container (Mobile Drawer) -->
          <div class="shrink-0 border-t border-slate-200/80 dark:border-neutral-800/80 px-4 py-2.5 relative bg-transparent mt-auto">
            <button
              type="button"
              class="w-full flex items-center justify-between px-2 py-2 rounded-[8px] hover:bg-[#F1F3F5] dark:hover:bg-neutral-800/80 transition-colors duration-150 text-left group cursor-pointer"
              aria-label="Menu Pengguna & Peran"
              @click="isMobileProfileMenuOpen = !isMobileProfileMenuOpen"
            >
              <div class="flex items-center gap-3 min-w-0 flex-1">
                <div class="w-9.5 h-9.5 rounded-full overflow-hidden shrink-0 border border-slate-200 dark:border-neutral-700/80 bg-neutral-100 dark:bg-neutral-800">
                  <img
                    :src="userAvatarUrl"
                    :alt="authStore.currentUser?.name || 'Foto Profil'"
                    class="w-full h-full object-cover"
                    @error="(e: any) => { e.target.src = '/images/user-profile.png' }"
                  />
                </div>
                <div class="flex flex-col min-w-0 flex-1">
                  <span class="text-[15px] font-semibold text-neutral-900 dark:text-white truncate font-poppins leading-tight">
                    {{ authStore.currentUser?.name || 'Fikri Setiawan' }}
                  </span>
                  <span class="text-xs text-neutral-500 dark:text-neutral-400 truncate font-poppins mt-0.5 font-normal">
                    {{ authStore.currentUser?.email || 'fikri@kopisenja.id' }}
                  </span>
                </div>
              </div>
              <div class="shrink-0 text-neutral-400 dark:text-neutral-500 ml-2">
                <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="m7 15 5 5 5-5"/>
                  <path d="m7 9 5-5 5 5"/>
                </svg>
              </div>
            </button>

            <!-- Backdrop overlay -->
            <div
              v-if="isMobileProfileMenuOpen"
              class="fixed inset-0 z-40 bg-transparent"
              @click="isMobileProfileMenuOpen = false"
            />

            <!-- Mobile Popover Menu -->
            <div
              v-if="isMobileProfileMenuOpen"
              class="absolute bottom-full mb-2 left-3 right-3 bg-white dark:bg-[#18191E] border border-[#CBD5E1] dark:border-neutral-800 rounded-2xl shadow-xl z-50 overflow-hidden font-poppins"
            >
              <div class="p-2.5">
                <div class="px-2 py-1 flex items-center justify-between mb-1">
                  <span class="text-[11px] font-semibold text-neutral-400 dark:text-neutral-500 uppercase tracking-wider">
                    Pindah Peran (Uji RBAC)
                  </span>
                  <span class="text-[9px] px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-600 dark:text-amber-400 font-mono font-medium">
                    RBAC
                  </span>
                </div>
                <div class="space-y-1">
                  <button
                    v-for="role in rolesList"
                    :key="`mob-role-${role.id}`"
                    type="button"
                    :class="[
                      'w-full flex items-center justify-between px-3 py-2 rounded-[8px] text-xs font-medium transition-all duration-150 cursor-pointer text-left',
                      authStore.currentUser?.role === role.id
                        ? 'bg-[#F1F3F5] dark:bg-neutral-800 text-[#156374] dark:text-[#50AABF] font-semibold'
                        : 'text-neutral-600 dark:text-neutral-400 hover:bg-[#F8FAFC] dark:hover:bg-neutral-800/60'
                    ]"
                    @click="handleSwitchRole(role.id, role.path)"
                  >
                    <span class="truncate">{{ role.name }}</span>
                    <span
                      v-if="authStore.currentUser?.role === role.id"
                      class="w-2 h-2 rounded-full bg-[#156374] dark:bg-[#50AABF] shrink-0 ml-2"
                    />
                  </button>
                </div>
              </div>

              <div class="border-t border-[#CBD5E1] dark:border-neutral-800/80 p-1.5">
                <button
                  type="button"
                  class="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-[8px] text-xs sm:text-sm font-medium text-red-500 hover:text-red-600 hover:bg-red-50/80 dark:hover:bg-red-950/20 transition-colors cursor-pointer text-left"
                  @click="handleLogout"
                >
                  <HugeiconsIcon :icon="Logout01Icon" :size="17" :stroke-width="2.2" class="text-red-500" />
                  <span>Keluar</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore, type UserRole } from '~/stores/auth'
import { useUmkmStore } from '~/stores/umkm'
import { useNotificationStore } from '~/stores/notification'
import { useChatStore } from '~/stores/chat'
import { HugeiconsIcon } from '@hugeicons/vue'
import { DotLottieVue } from '@lottiefiles/dotlottie-vue'
import { gsap } from 'gsap'
import SidebarNavIcon from './SidebarNavIcon.vue'
import {
  Home03Icon,
  Task01Icon,
  AnalyticsUpIcon,
  Coins01Icon,
  Award01Icon,
  UserGroupIcon,
  UserIcon,
  Store01Icon,
  CheckmarkCircle01Icon,
  Alert01Icon,
  StarIcon,
  UserAdd01Icon,
  Cancel01Icon,
  UserCircleIcon,
  SidebarLeft01Icon,
  Notification01Icon,
  Message01Icon,
  Logout01Icon
} from '@hugeicons/core-free-icons'

defineProps<{
  isMobileOpen?: boolean
}>()

const emit = defineEmits<{
  (e: 'closeMobile'): void
}>()

const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()
const umkmStore = useUmkmStore()
const notificationStore = useNotificationStore()
const chatStore = useChatStore()

// State Collapse & Mobile Drawer from useSidebar composable
const { isCollapsed, isMobileOpen, closeMobile, setCollapsed, toggleCollapse } = useSidebar()

const isProfileMenuOpen = ref(false)
const isMobileProfileMenuOpen = ref(false)

watch(() => route.path, () => {
  isProfileMenuOpen.value = false
  isMobileProfileMenuOpen.value = false
})

const userAvatarUrl = computed(() => {
  if (authStore.currentUser?.role === 'UMKM') {
    return (
      umkmStore.profile.ownerAvatarUrl ||
      authStore.currentUser?.avatar ||
      '/images/user-profile.png'
    )
  }
  return authStore.currentUser?.avatar || '/images/user-profile.png'
})

const rolesList: { id: UserRole; name: string; path: string }[] = [
  { id: 'UMKM', name: 'Pelaku Usaha (UMKM)', path: '/dashboard' },
  { id: 'CONSULTANT', name: 'Konsultan Ahli', path: '/konsultan' },
  { id: 'INVESTOR', name: 'Investor / Funder', path: '/investor' },
  { id: 'ADMIN', name: 'Admin Platform', path: '/admin' }
]

function handleSwitchRole(newRole: UserRole, targetPath: string) {
  authStore.setRole(newRole)
  isProfileMenuOpen.value = false
  isMobileProfileMenuOpen.value = false
  emit('closeMobile')
  router.push(targetPath)
}

function handleLogout() {
  isProfileMenuOpen.value = false
  isMobileProfileMenuOpen.value = false
  emit('closeMobile')
  authStore.logout()
  router.push('/masuk')
}

function handleProfileClick() {
  isProfileMenuOpen.value = !isProfileMenuOpen.value
}

const asideRef = ref<HTMLElement | null>(null)
const brandHeaderRef = ref<HTMLElement | null>(null)
const bannerRef = ref<HTMLElement | null>(null)

// Official Bear Mascot Lottie Animation URLs
const lottieSources = {
  siang: 'https://lottie.host/63a5f273-13ac-4b64-9e87-ae6a36839188/MLmYnGmMP7.lottie',
  sore: 'https://lottie.host/4936cbe8-30e9-4930-963b-0d3bc1fd07b9/PVSi9YqIYP.lottie',
  malam: 'https://lottie.host/bc55ce89-7c97-4e49-8988-848bc02b409e/g08gcLoaQt.lottie'
}

type TimeOfDay = 'siang' | 'sore' | 'malam'

function calculateTimeOfDay(): TimeOfDay {
  const hour = new Date().getHours()
  if (hour >= 5 && hour < 15) return 'siang'
  if (hour >= 15 && hour < 18) return 'sore'
  return 'malam'
}

const currentTimeOfDay = ref<TimeOfDay>(calculateTimeOfDay())
const timeOverride = ref<TimeOfDay | null>(null)
const activeTimeOfDay = computed<TimeOfDay>(() => timeOverride.value || currentTimeOfDay.value)

const currentLottieSrc = computed(() => lottieSources[activeTimeOfDay.value])

const timeBackgroundClasses = computed(() => {
  switch (activeTimeOfDay.value) {
    case 'siang':
      return 'bg-gradient-to-b from-[#56CCF2] to-[#2F80ED]'
    case 'sore':
      return 'bg-gradient-to-b from-[#4A3B69] via-[#8E44AD] to-[#E07A5F]'
    case 'malam':
      return 'bg-gradient-to-b from-[#0F172A] to-[#1E293B]'
  }
})

let timeInterval: any = null

function handleToggleCollapse() {
  isProfileMenuOpen.value = false
  toggleCollapse()
}

function handleKeydown(e: KeyboardEvent) {
  if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'b') {
    e.preventDefault()
    handleToggleCollapse()
  }
}

function handleCloseMobile() {
  closeMobile()
  emit('closeMobile')
}

onMounted(() => {
  if (import.meta.client) {
    window.addEventListener('keydown', handleKeydown)
    // Sinkronisasi avatar user dari localStorage/umkmStore
    if (typeof umkmStore.initAvatarFromStorage === 'function') {
      umkmStore.initAvatarFromStorage()
    }
    if (umkmStore.profile.ownerAvatarUrl && authStore.currentUser) {
      authStore.updateAvatar(umkmStore.profile.ownerAvatarUrl)
    }

    // Refresh time of day every 60 seconds
    timeInterval = setInterval(() => {
      currentTimeOfDay.value = calculateTimeOfDay()
    }, 60000)
  }
})

onUnmounted(() => {
  if (import.meta.client) {
    window.removeEventListener('keydown', handleKeydown)
    if (timeInterval) {
      clearInterval(timeInterval)
    }
    gsap.killTweensOf([
      '.sidebar-label',
      '.sidebar-brand-text',
      '.sidebar-banner',
      '.sidebar-section-title',
      '.sidebar-toggle-btn',
      '.sidebar-icon-box',
      '.sidebar-nav-item',
      '.sidebar-divider',
      asideRef.value,
      brandHeaderRef.value,
      bannerRef.value
    ])
  }
})

// Sinkronkan update avatar dari umkmStore ke authStore secara real-time
watch(
  () => umkmStore.profile.ownerAvatarUrl,
  (newAvatar) => {
    if (newAvatar && authStore.currentUser) {
      authStore.updateAvatar(newAvatar)
    }
  }
)

const currentRole = computed(() => {
  if (route.path.startsWith('/konsultan')) return 'CONSULTANT'
  if (route.path.startsWith('/investor')) return 'INVESTOR'
  if (route.path.startsWith('/admin')) return 'ADMIN'
  return authStore.currentUser?.role || 'UMKM'
})

const homePath = computed(() => {
  if (currentRole.value === 'CONSULTANT') return '/konsultan'
  if (currentRole.value === 'INVESTOR') return '/investor'
  if (currentRole.value === 'ADMIN') return '/admin'
  return '/dashboard'
})

const handleBrandClick = (e: MouseEvent) => {
  emit('closeMobile')
  if (route.path === homePath.value) {
    e.preventDefault()
    window.location.reload()
  }
}

function isActive(path: string) {
  if (path === '/dashboard') return route.path === '/dashboard'
  if (path === '/konsultan') return route.path === '/konsultan'
  if (path === '/investor') return route.path === '/investor'
  if (path === '/admin') return route.path === '/admin'
  return route.path === path || route.path.startsWith(path + '/')
}

interface NavItem {
  to: string
  label: string
  icon: any
  badge?: number | string
}

interface NavSection {
  title?: string
  items: NavItem[]
}

// Categorized navigation items with clear, concise, beginner-friendly labels
const navigationSections = computed<NavSection[]>(() => {
  if (currentRole.value === 'UMKM') {
    return [
      {
        items: [
          { to: '/dashboard', label: 'Beranda', icon: Home03Icon },
          { to: '/dashboard/progres', label: 'Catatan Kas', icon: Coins01Icon }
        ]
      },
      {
        title: 'Kelola Usaha',
        items: [
          { to: '/dashboard/profile', label: 'Profil Usaha', icon: UserCircleIcon },
          { to: '/dashboard/rencana-aksi', label: 'Rencana Aksi', icon: Task01Icon },
          { to: '/dashboard/penilaian', label: 'Cek Kesehatan', icon: AnalyticsUpIcon },
          { to: '/dashboard/profil-publik', label: 'Toko Publik', icon: Store01Icon }
        ]
      },
      {
        title: 'Permodalan',
        items: [
          { to: '/dashboard/pendanaan', label: 'Cari Modal', icon: Award01Icon },
          {
            to: '/dashboard/pesan',
            label: 'Pesan',
            icon: Message01Icon,
            badge: chatStore.unreadCountUmkm > 0 ? chatStore.unreadCountUmkm : undefined
          },
          {
            to: '/dashboard/notifikasi',
            label: 'Notifikasi',
            icon: Notification01Icon,
            badge: notificationStore.unreadCount > 0 ? notificationStore.unreadCount : undefined
          }
        ]
      }
    ]
  } else if (currentRole.value === 'CONSULTANT') {
    return [
      {
        items: [
          { to: '/konsultan', label: 'Dashboard', icon: Home03Icon },
          { to: '/konsultan/klien', label: 'Klien', icon: UserIcon },
          { to: '/konsultan/rencana-aksi', label: 'Rencana Aksi', icon: Task01Icon },
          { to: '/konsultan/validasi', label: 'Validasi Kas', icon: CheckmarkCircle01Icon }
        ]
      },
      {
        title: 'Manajemen',
        items: [
          { to: '/konsultan/profil', label: 'Profil & Dokumen', icon: UserCircleIcon }
        ]
      }
    ]
  } else if (currentRole.value === 'INVESTOR') {
    return [
      {
        items: [
          { to: '/investor', label: 'Katalog Usaha', icon: Store01Icon },
          {
            to: '/investor/pesan',
            label: 'Pesan',
            icon: Message01Icon,
            badge: chatStore.unreadCountInvestor > 0 ? chatStore.unreadCountInvestor : undefined
          },
          { to: '/investor/watchlist', label: 'Disimpan', icon: StarIcon }
        ]
      }
    ]
  } else {
    // ADMIN
    return [
      {
        items: [
          { to: '/admin', label: 'Ringkasan', icon: Home03Icon },
          { to: '/admin/penugasan', label: 'Penugasan Konsultan', icon: UserAdd01Icon },
          { to: '/admin/pengguna', label: 'Kelola Pengguna', icon: UserGroupIcon }
        ]
      }
    ]
  }
})
</script>

<style scoped>
.scrollbar-none::-webkit-scrollbar {
  display: none;
}
.scrollbar-none {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
