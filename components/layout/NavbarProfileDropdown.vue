<template>
  <div ref="dropdownRef" class="relative font-poppins">
    <!-- Trigger Button in Navbar: Avatar & Name Only (Dicoding Style) -->
    <button
      type="button"
      :class="[
        'flex items-center gap-2 sm:gap-2.5 min-h-[44px] py-1 px-1.5 sm:px-2 rounded-[8px] transition-colors duration-150 cursor-pointer group border',
        isOpen
          ? 'bg-[#E6F4F7]! text-[#156374]! border-[#156374]/30! shadow-2xs'
          : 'border-transparent hover:bg-neutral-100 dark:hover:bg-neutral-800/80 hover:border-[#E2E8F0] dark:hover:border-neutral-800'
      ]"
      :aria-expanded="isOpen"
      aria-haspopup="true"
      aria-label="Menu Akun Pengguna"
      @click="isOpen = !isOpen"
    >
      <!-- User Name (Sebelah kiri dari profile image) -->
      <span class="hidden sm:inline-block text-[13px] sm:text-[14px] font-semibold text-neutral-800 dark:text-neutral-200 truncate max-w-[130px] lg:max-w-[160px] tracking-tight">
        {{ userName }}
      </span>

      <!-- User Avatar -->
      <div class="w-8 h-8 rounded-full overflow-hidden shrink-0 border border-slate-200 dark:border-neutral-700 bg-neutral-100 dark:bg-neutral-800 transition-transform duration-150 group-hover:scale-105">
        <img
          :src="userAvatarUrl"
          :alt="userName"
          class="w-full h-full object-cover"
          @error="(e: any) => { e.target.src = '/images/user-profile.png' }"
        />
      </div>

      <!-- Subtle Chevron Indicator -->
      <svg
        :class="[
          'w-4 h-4 text-neutral-400 group-hover:text-neutral-600 dark:group-hover:text-neutral-300 transition-transform duration-200 shrink-0',
          isOpen ? 'rotate-180 text-[#156374]' : ''
        ]"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2.2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path d="m6 9 6 6 6-6" />
      </svg>
    </button>

    <!-- Dicoding-Style Floating Popover Dropdown (NO DROP SHADOW) -->
    <div
      v-if="isOpen"
      class="absolute right-0 top-full mt-2 w-72 bg-[#FFFFFF] dark:bg-[#18191E] border border-[#CBD5E1] dark:border-neutral-700 rounded-[8px] shadow-none z-50 overflow-hidden font-poppins animate-in fade-in zoom-in-95 duration-150"
    >
      <!-- User Identity Header -->
      <div class="p-3.5 border-b border-[#E2E8F0] dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/30">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-full overflow-hidden shrink-0 border border-slate-200 dark:border-neutral-700 bg-neutral-100">
            <img
              :src="userAvatarUrl"
              :alt="userName"
              class="w-full h-full object-cover"
              @error="(e: any) => { e.target.src = '/images/user-profile.png' }"
            />
          </div>
          <div class="flex flex-col min-w-0 flex-1">
            <span class="text-[14px] font-bold text-neutral-900 dark:text-white truncate leading-tight">
              {{ userName }}
            </span>
            <span class="text-[12px] text-neutral-500 dark:text-neutral-400 truncate mt-0.5 font-normal">
              {{ authStore.currentUser?.email || 'fikri@kopisenja.id' }}
            </span>
            <div class="mt-1.5 flex items-center gap-1.5">
              <span class="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-[#E6F4F7] text-[#156374] dark:bg-[#156374]/30 dark:text-[#50AABF]">
                {{ currentRoleLabel }}
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- Quick Actions: Profil & Pengaturan (Akses langsung ke Settings) -->
      <div class="p-1.5 border-b border-[#E2E8F0] dark:border-neutral-800 space-y-0.5">
        <NuxtLink
          :to="profilePath"
          class="w-full flex items-center gap-2.5 px-3 py-2 rounded-[8px] text-xs sm:text-sm font-medium text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800/80 transition-colors"
          @click="isOpen = false"
        >
          <HugeiconsIcon :icon="UserCircleIcon" :size="17" :stroke-width="1.9" class="text-[#156374] dark:text-[#50AABF]" />
          <span>{{ authStore.currentUser?.role === 'UMKM' ? (currentLang === 'en' ? 'View Business Profile' : 'Lihat Profil Usaha') : (currentLang === 'en' ? 'My Profile' : 'Profil Saya') }}</span>
        </NuxtLink>

        <NuxtLink
          :to="settingsPath"
          class="w-full flex items-center gap-2.5 px-3 py-2 rounded-[8px] text-xs sm:text-sm font-medium text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800/80 transition-colors"
          @click="isOpen = false"
        >
          <HugeiconsIcon :icon="Settings01Icon" :size="17" :stroke-width="1.9" class="text-neutral-500 dark:text-neutral-400" />
          <span>{{ currentLang === 'en' ? 'Account Settings' : 'Pengaturan Akun' }}</span>
        </NuxtLink>
      </div>

      <!-- RBAC Switcher Menu -->
      <div class="p-2.5">
        <div class="px-2 py-1 flex items-center justify-between mb-1">
          <span class="text-[11px] font-semibold text-neutral-400 dark:text-neutral-500 uppercase tracking-wider">
            {{ currentLang === 'en' ? 'Switch Role (RBAC Test)' : 'Pindah Peran (Uji RBAC)' }}
          </span>
          <span class="text-[9px] px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-600 dark:text-amber-400 font-mono font-medium">
            RBAC
          </span>
        </div>
        <div class="space-y-1">
          <button
            v-for="role in rolesList"
            :key="role.id"
            type="button"
            :class="[
              'w-full flex items-center justify-between px-3 py-2 rounded-[8px] text-sm font-poppins transition-all duration-150 cursor-pointer text-left',
              authStore.currentUser?.role === role.id
                ? 'bg-[#E6F4F7] hover:bg-[#D9EEF3] dark:bg-[#156374]/20 dark:hover:bg-[#156374]/30 text-[#156374] dark:text-[#50AABF] font-semibold border border-[#156374]/20 dark:border-[#50AABF]/25 shadow-none'
                : 'text-[#64748B] dark:text-neutral-400 font-medium hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100/80 dark:hover:bg-neutral-800/60 border border-transparent'
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

      <!-- Logout Action -->
      <div class="border-t border-[#E2E8F0] dark:border-neutral-800/80 p-2 bg-neutral-50/30 dark:bg-neutral-900/20">
        <button
          type="button"
          class="w-full flex items-center gap-2.5 px-3 py-2 rounded-[8px] text-sm font-medium text-red-600 hover:text-red-700 hover:bg-red-50/80 dark:hover:bg-red-950/25 transition-colors cursor-pointer text-left"
          @click="handleLogout"
        >
          <HugeiconsIcon :icon="Logout01Icon" :size="17" :stroke-width="2.2" class="text-red-500" />
          <span>{{ t('nav_logout') }}</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore, type UserRole } from '~/stores/auth'
import { useUmkmStore } from '~/stores/umkm'
import { useInvestorStore } from '~/stores/investor'
import { useLanguage } from '~/composables/useLanguage'
import { HugeiconsIcon } from '@hugeicons/vue'
import { UserCircleIcon, Settings01Icon, Logout01Icon } from '@hugeicons/core-free-icons'

const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()
const umkmStore = useUmkmStore()
const investorStore = useInvestorStore()
const { t, currentLang } = useLanguage()

const dropdownRef = ref<HTMLElement | null>(null)
const isOpen = ref(false)

function handleClickOutside(e: MouseEvent) {
  if (dropdownRef.value && !dropdownRef.value.contains(e.target as Node)) {
    isOpen.value = false
  }
}

function handleKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape') {
    isOpen.value = false
  }
}

onMounted(() => {
  if (import.meta.client) {
    document.addEventListener('click', handleClickOutside)
    document.addEventListener('keydown', handleKeydown)
  }
})

onUnmounted(() => {
  if (import.meta.client) {
    document.removeEventListener('click', handleClickOutside)
    document.removeEventListener('keydown', handleKeydown)
  }
})

watch(() => route.path, () => {
  isOpen.value = false
})

const userName = computed(() => authStore.currentUser?.name || 'Fikri Setiawan')

const userAvatarUrl = computed(() => {
  if (authStore.currentUser?.role === 'UMKM') {
    return (
      umkmStore.profile.ownerAvatarUrl ||
      authStore.currentUser?.avatar ||
      '/images/user-profile.png'
    )
  }
  if (authStore.currentUser?.role === 'INVESTOR') {
    return (
      investorStore.profile.avatarUrl ||
      authStore.currentUser?.avatar ||
      '/images/user-profile.png'
    )
  }
  return authStore.currentUser?.avatar || '/images/user-profile.png'
})

const currentRoleLabel = computed(() => {
  switch (authStore.currentUser?.role) {
    case 'CONSULTANT': return 'Konsultan Ahli'
    case 'INVESTOR': return 'Investor / Funder'
    case 'ADMIN': return 'Admin Platform'
    default: return 'Pelaku Usaha (UMKM)'
  }
})

const settingsPath = computed(() => {
  switch (authStore.currentUser?.role) {
    case 'CONSULTANT': return '/konsultan/pengaturan'
    case 'INVESTOR': return '/investor/pengaturan'
    case 'ADMIN': return '/admin/pengaturan'
    default: return '/dashboard/pengaturan'
  }
})

const profilePath = computed(() => {
  switch (authStore.currentUser?.role) {
    case 'CONSULTANT': return '/konsultan'
    case 'INVESTOR': return '/investor/profile'
    case 'ADMIN': return '/admin'
    default: return '/dashboard/profile'
  }
})

const rolesList: { id: UserRole; name: string; path: string }[] = [
  { id: 'UMKM', name: 'Pelaku Usaha (UMKM)', path: '/dashboard' },
  { id: 'CONSULTANT', name: 'Konsultan Ahli', path: '/konsultan' },
  { id: 'INVESTOR', name: 'Investor / Funder', path: '/investor' },
  { id: 'ADMIN', name: 'Admin Platform', path: '/admin' }
]

function handleSwitchRole(newRole: UserRole, targetPath: string) {
  authStore.setRole(newRole)
  isOpen.value = false
  router.push(targetPath)
}

function handleLogout() {
  isOpen.value = false
  authStore.logout()
  router.push('/masuk')
}
</script>
