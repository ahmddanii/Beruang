<template>
  <div class="h-full flex flex-col shrink-0">
    <!-- Desktop Sidebar (Placed directly below Top Navbar) -->
    <aside
      ref="asideRef"
      :class="[
        'hidden lg:flex flex-col shrink-0 h-full z-40 select-none border-r transition-[width] duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] will-change-[width]',
        isCollapsed ? 'w-[72px]' : 'w-64',
        'bg-[#FFFFFF] dark:bg-[#13161F] border-[#E2E8F0] dark:border-neutral-800/80 shadow-[1px_0_10px_rgba(0,0,0,0.02)]'
      ]"
    >
      <div class="flex flex-col h-full overflow-hidden">
        <!-- 1. Compact Mode: Expand Toggle Container (Solid container directly at top of collapsed sidebar with stroke below) -->
        <div
          ref="compactHeaderRef"
          :class="[
            'sidebar-compact-toggle-container w-full shrink-0 flex items-center justify-center border-[#E2E8F0] dark:border-neutral-800/80 bg-[#FFFFFF] dark:bg-[#13161F] select-none overflow-hidden transition-all duration-400 ease-[cubic-bezier(0.25,1,0.5,1)]',
            isCollapsed
              ? 'max-h-[52px] h-[52px] opacity-100 pointer-events-auto border-b'
              : 'max-h-0 h-0 opacity-0 pointer-events-none border-b-0'
          ]"
        >
          <button
            type="button"
            class="sidebar-toggle-btn w-8 h-8 rounded-full bg-[#F1F5F9] dark:bg-neutral-800 hover:bg-[#156374] text-[#156374] hover:text-white dark:text-neutral-300 dark:hover:text-white flex items-center justify-center transition-all duration-200 cursor-pointer border border-[#E2E8F0] dark:border-neutral-700 shadow-2xs group"
            title="Perluas Sidebar (Ctrl+B)"
            aria-label="Perluas Sidebar"
            @click="handleToggleCollapse"
          >
            <HugeiconsIcon
              :icon="ArrowRight01Icon"
              :size="15"
              :stroke-width="2.4"
              class="transition-transform duration-150 group-hover:translate-x-0.5"
            />
          </button>
        </div>

        <!-- 2. Expanded Mode: Lottie Mascot Banner with Compact Icon inside (Stroke below) -->
        <div
          ref="bannerRef"
          :class="[
            'sidebar-banner relative w-full shrink-0 overflow-hidden select-none border-[#E2E8F0] dark:border-neutral-800/80 transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)]',
            isCollapsed
              ? 'max-h-0 h-0 opacity-0 pointer-events-none border-b-0'
              : 'max-h-36 h-32 opacity-100 pointer-events-auto border-b',
            timeBackgroundClasses
          ]"
        >
          <!-- 1:1 Aspect-Square Container Centered Vertically so Lottie animation stays a perfect round circle and never stretches/gepeng -->
          <div class="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
            <div class="w-full aspect-square shrink-0 flex items-center justify-center">
              <ClientOnly>
                <DotLottieVue
                  :src="currentLottieSrc"
                  :autoplay="true"
                  :loop="true"
                  :use-frame-interpolation="true"
                  :render-config="lottieRenderConfig"
                  :layout="{ fit: 'cover', align: [0.5, 0.5] }"
                  class="w-full h-full"
                />
              </ClientOnly>
            </div>
          </div>

          <!-- Compact Sidebar Button inside Lottie Animation Banner (Dicoding Style with Brand Color) -->
          <button
            type="button"
            :class="[
              'sidebar-toggle-btn absolute top-3 right-3 w-9 h-9 min-w-[36px] min-h-[36px] rounded-full bg-white/90 hover:bg-[#156374] text-[#156374] hover:text-white flex items-center justify-center transition-all duration-200 cursor-pointer shadow-md border border-white/60 backdrop-blur-md z-10 group',
              isCollapsed ? 'opacity-0 scale-75 pointer-events-none' : 'opacity-100 scale-100'
            ]"
            title="Ciutkan Sidebar (Ctrl+B)"
            aria-label="Ciutkan Sidebar"
            @click="handleToggleCollapse"
          >
            <HugeiconsIcon
              :icon="ArrowLeft01Icon"
              :size="16"
              :stroke-width="2.4"
              class="transition-transform duration-150 group-hover:-translate-x-0.5"
            />
          </button>
        </div>

        <!-- Navigation Items List (Segmented Modular Containers with bottom stroke only) -->
        <div class="flex-1 overflow-y-auto overflow-x-hidden scrollbar-none overscroll-contain">
          <nav aria-label="Menu Utama">
            <div
              v-for="(section, sIdx) in navigationSections"
              :key="`sec-${sIdx}`"
              :class="[
                'sidebar-container-module border-b border-[#E2E8F0] dark:border-neutral-800/80 transition-all duration-200',
                isCollapsed ? 'px-3.5 py-2.5' : 'px-3.5 py-3'
              ]"
            >
              <!-- Section Category Title: Apple fine-print 12px uppercase tracking-wider -->
              <div
                v-if="section.title"
                class="sidebar-section-title sidebar-anim-target flex items-center overflow-hidden whitespace-nowrap font-poppins"
              >
                <span class="text-xs font-semibold text-neutral-600 dark:text-neutral-400 font-poppins px-2 uppercase tracking-wider">
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
                    'sidebar-nav-item h-11 flex items-center font-poppins group relative overflow-hidden rounded-[10px] transition-colors duration-200 cursor-pointer',
                    isCollapsed
                      ? 'w-11 justify-start px-0'
                      : 'w-full px-0 justify-start',
                    isActive(item.to)
                      ? 'bg-[#E6F4F7] hover:bg-[#D9EEF3] dark:bg-[#156374]/20 dark:hover:bg-[#156374]/30 text-[#156374] dark:text-[#50AABF] font-semibold border border-[#156374]/20 dark:border-[#50AABF]/25 shadow-2xs'
                      : 'text-[#64748B] dark:text-neutral-400 font-medium hover:text-[#156374] dark:hover:text-[#50AABF] hover:bg-neutral-100/80 dark:hover:bg-neutral-800/60 border border-transparent'
                  ]"
                  @click="handleNavigate(item.to)"
                >
                  <!-- Icon Container: Anchored at 44px Box with -ml-px to compensate 1px border so center is exactly 36.0px -->
                  <div class="sidebar-icon-box w-11 h-11 shrink-0 -ml-px flex items-center justify-center relative pointer-events-none">
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

                  <!-- Label Container: Apple 14px typography with GSAP stagger animation -->
                  <div
                    class="sidebar-label sidebar-anim-target overflow-hidden whitespace-nowrap flex items-center justify-between text-[14px] flex-1 min-w-0 pl-1 pr-3 pointer-events-none will-change-[transform,opacity]"
                  >
                    <span class="truncate leading-none">{{ item.label }}</span>
                    <span
                      v-if="item.badge"
                      class="ml-1.5 px-2 py-0.5 rounded-full text-xs font-semibold bg-red-600 text-white tabular-nums leading-none shrink-0"
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
        <div class="relative w-80 max-w-[88vw] bg-[#FFFFFF] dark:bg-[#13161F] h-full flex flex-col shadow-2xl z-10 pb-6 overflow-hidden border-r border-slate-200/80 dark:border-neutral-800">
          <!-- Mobile Drawer Branding Header (Placed ABOVE Lottie animation banner) -->
          <div class="w-full h-14 shrink-0 px-4 flex items-center justify-between border-b border-slate-200/80 dark:border-neutral-800/80 bg-[#FFFFFF] dark:bg-[#13161F] select-none">
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
              class="w-8 h-8 rounded-lg bg-neutral-900 hover:bg-black text-white flex items-center justify-center transition-colors duration-150 cursor-pointer shadow-none"
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
                    :use-frame-interpolation="true"
                    :render-config="lottieRenderConfig"
                    :layout="{ fit: 'cover', align: [0.5, 0.5] }"
                    class="w-full h-full"
                  />
                </ClientOnly>
              </div>
            </div>
          </div>

          <!-- Mobile Nav Items (Segmented Modular Containers with bottom stroke only) -->
          <div class="flex-1 overflow-y-auto scrollbar-none">
            <nav aria-label="Menu Mobile">
              <div
                v-for="(section, sIdx) in navigationSections"
                :key="`mob-sec-${sIdx}`"
                class="sidebar-container-module px-4 py-3 border-b border-slate-200/80 dark:border-neutral-800/80"
              >
                <!-- Section Category Title -->
                <div
                  v-if="section.title"
                  class="px-2 pt-0.5 pb-2 text-xs font-semibold text-neutral-600 dark:text-neutral-400 uppercase tracking-wider font-poppins"
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
                      'flex items-center gap-3.5 px-3.5 py-2.5 rounded-[10px] font-poppins text-[15px] transition-all duration-150 group border cursor-pointer',
                      isActive(item.to)
                        ? 'bg-[#E6F4F7] dark:bg-[#156374]/20 text-[#156374] dark:text-[#50AABF] font-semibold border-[#156374]/20 shadow-2xs'
                        : 'text-neutral-600 dark:text-neutral-400 font-normal hover:text-[#156374] dark:hover:text-[#50AABF] hover:bg-neutral-100 dark:hover:bg-neutral-800 border-transparent'
                    ]"
                    @click="handleNavigate(item.to)"
                  >
                    <SidebarNavIcon
                      :to="item.to"
                      :outline-icon="item.icon"
                      :active="isActive(item.to)"
                      class="pointer-events-none"
                    />
                    <span class="truncate flex-1 pointer-events-none">{{ item.label }}</span>
                    <span
                      v-if="item.badge"
                      class="ml-1.5 px-2 py-0.5 rounded-full text-xs font-bold bg-red-600 text-white tabular-nums leading-none shrink-0 pointer-events-none"
                    >
                      {{ item.badge }}
                    </span>
                  </NuxtLink>
                </div>
              </div>
            </nav>
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
  Store01Icon,
  CheckmarkCircle01Icon,
  Alert01Icon,
  StarIcon,
  UserAdd01Icon,
  Cancel01Icon,
  RubiksCubeIcon,
  UserCircleIcon,
  SidebarLeft01Icon,
  ArrowLeft01Icon,
  ArrowRight01Icon,
  Notification01Icon,
  Message01Icon
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

const asideRef = ref<HTMLElement | null>(null)
const brandHeaderRef = ref<HTMLElement | null>(null)
const bannerRef = ref<HTMLElement | null>(null)
const compactHeaderRef = ref<HTMLElement | null>(null)

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

// Ultra HD Rendering Configuration for DotLottie WASM Canvas
const lottieRenderConfig = computed(() => {
  const dpr = typeof window !== 'undefined' ? (window.devicePixelRatio || 1) : 1
  return {
    devicePixelRatio: Math.max(dpr * 2, 3), // Ensure >= 3x super-sampling for razor-sharp vector graphics
    autoResize: true,
    quality: 100
  }
})

function animateSidebarContent(collapsed: boolean) {
  if (!asideRef.value) return
  const targets = asideRef.value.querySelectorAll('.sidebar-anim-target')
  const sectionTitles = asideRef.value.querySelectorAll('.sidebar-section-title')
  const iconBoxes = asideRef.value.querySelectorAll('.sidebar-icon-box')

  gsap.killTweensOf([
    ...targets,
    ...sectionTitles,
    ...iconBoxes,
    compactHeaderRef.value,
    bannerRef.value
  ].filter(Boolean))

  if (collapsed) {
    // Mode Compact: Reveal perlahan bertahap dari atas ke bawah
    // 1. Header tombol expand di bagian atas muncul duluan
    if (compactHeaderRef.value) {
      gsap.fromTo(
        compactHeaderRef.value,
        { autoAlpha: 0, y: -8, scale: 0.88 },
        { autoAlpha: 1, y: 0, scale: 1, duration: 0.45, ease: 'back.out(1.3)' }
      )
    }

    // 2. Seluruh elemen (label dan judul kategori) ditutup berurutan dari atas ke bawah
    gsap.to(targets, {
      autoAlpha: 0,
      x: -12,
      height: (i, target: any) => target.classList.contains('sidebar-section-title') ? 0 : '',
      marginBottom: (i, target: any) => target.classList.contains('sidebar-section-title') ? 0 : '',
      duration: 0.28,
      stagger: 0.035, // Reveal/tutup bertahap dari atas ke bawah
      ease: 'power2.in'
    })

    // 3. Icon box di setiap menu navigasi reveal perlahan dari atas ke bawah
    if (iconBoxes.length) {
      gsap.fromTo(
        iconBoxes,
        { scale: 0.8, opacity: 0.3, y: 6 },
        {
          scale: 1,
          opacity: 1,
          y: 0,
          duration: 0.48,
          stagger: 0.05, // Reveal bertahap perlahan dari atas ke bawah
          ease: 'power2.out',
          delay: 0.08,
          clearProps: 'transform'
        }
      )
    }
  } else {
    // Mode Expand: Reveal perlahan bertahap dari atas ke bawah
    // 1. Banner maskot Lottie di bagian paling atas muncul perlahan duluan
    if (bannerRef.value) {
      gsap.fromTo(
        bannerRef.value,
        { autoAlpha: 0, y: -10 },
        { autoAlpha: 1, y: 0, duration: 0.45, ease: 'power2.out', delay: 0.05 }
      )
    }

    // 2. Seluruh elemen navigasi reveal berurutan secara terpadu dari atas ke bawah:
    //    1. Beranda -> 2. Catatan Kas -> 3. KELOLA USAHA -> 4. Profil Usaha -> 5. Rencana Aksi -> 6. Cek Kesehatan -> 7. PEMODALAN -> 8. Cari Modal -> 9. Notifikasi
    gsap.fromTo(
      targets,
      {
        autoAlpha: 0,
        x: -16,
        height: (i, target: any) => target.classList.contains('sidebar-section-title') ? 0 : '',
        marginBottom: (i, target: any) => target.classList.contains('sidebar-section-title') ? 0 : ''
      },
      {
        autoAlpha: 1,
        x: 0,
        height: (i, target: any) => target.classList.contains('sidebar-section-title') ? 16 : '',
        marginBottom: (i, target: any) => target.classList.contains('sidebar-section-title') ? 8 : '',
        duration: 0.48,
        stagger: 0.075, // Mengalir halus satu per satu dari urutan 1 sampai 10
        ease: 'power2.out',
        delay: 0.08,
        clearProps: 'transform'
      }
    )
  }
}

watch(isCollapsed, async (newVal) => {
  await nextTick()
  animateSidebarContent(newVal)
})

function handleToggleCollapse() {
  toggleCollapse()
}

function handleNavigate(to: string) {
  closeMobile()
  emit('closeMobile')
  if (route.path !== to) {
    router.push(to)
  }
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

let timeInterval: any = null

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

    // Set initial GSAP state for desktop sidebar content
    if (asideRef.value) {
      const targets = asideRef.value.querySelectorAll('.sidebar-anim-target')
      const sectionTitles = asideRef.value.querySelectorAll('.sidebar-section-title')
      if (isCollapsed.value) {
        gsap.set(targets, { autoAlpha: 0, x: -12 })
        gsap.set(sectionTitles, { height: 0, marginBottom: 0 })
      } else {
        // Jalankan animasi reveal bertahap dari atas ke bawah saat pertama kali dimuat
        animateSidebarContent(false)
      }
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
    if (asideRef.value) {
      const targets = asideRef.value.querySelectorAll('.sidebar-anim-target')
      const sectionTitles = asideRef.value.querySelectorAll('.sidebar-section-title')
      gsap.killTweensOf([...targets, ...sectionTitles, asideRef.value, bannerRef.value, compactHeaderRef.value])
    }
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

const currentRole = computed(() => authStore.currentUser?.role || 'UMKM')

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
          { to: '/dashboard/penilaian', label: 'Cek Kesehatan', icon: AnalyticsUpIcon }
        ]
      },
      {
        title: 'Permodalan',
        items: [
          { to: '/dashboard/pendanaan', label: 'Cari Modal', icon: Award01Icon },
          {
            to: '/dashboard/pesan',
            label: 'Pesan Diskusi',
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
          { to: '/konsultan', label: 'Daftar Klien', icon: UserGroupIcon },
          { to: '/konsultan/validasi', label: 'Validasi Kas', icon: CheckmarkCircle01Icon }
        ]
      },
      {
        title: 'Pengawasan',
        items: [
          { to: '/konsultan/alert', label: 'Peringatan', icon: Alert01Icon }
        ]
      }
    ]
  } else if (currentRole.value === 'INVESTOR') {
    return [
      {
        items: [
          { to: '/investor', label: 'Katalog Usaha', icon: Store01Icon },
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
