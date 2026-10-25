<template>
  <nav class="bg-white/95 dark:bg-[#151519]/95 backdrop-blur-md border-b border-[#E4E7EC] dark:border-[#2B2B31] sticky top-0 z-40 transition-colors">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16 gap-4">
        <!-- Left: Brand Logo & Role Pill -->
        <div class="flex items-center gap-3 shrink-0">
          <NuxtLink to="/" class="flex items-center gap-2 group">
            <img src="/logo/logoSmall.svg" alt="Beruang Logo" class="h-7 w-auto object-contain transition-transform group-hover:scale-105" />
            <div>
              <div class="flex items-center gap-1.5">
                <span class="font-heading font-extrabold text-lg tracking-tight leading-none select-none">
                  <span class="text-[#2091AA] dark:text-[#50AABF]">Ber</span><span class="text-[#00AA13] dark:text-[#00C058]">uang</span>
                </span>
                <span
                  :class="[
                    'text-[10px]  font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border',
                    roleBadgeClasses[currentRole]
                  ]"
                >
                  {{ currentRoleName }}
                </span>
              </div>
              <span class="text-[11px] text-neutral-500 font-medium block mt-0.5">
                {{ authStore.currentUser?.businessName || 'Platform Terpadu' }}
              </span>
            </div>
          </NuxtLink>
        </div>

        <!-- Center: Core Desktop Navigation Links -->
        <div class="hidden md:flex items-center gap-1.5">
          <NuxtLink
            v-for="item in navItems"
            :key="item.to"
            :to="item.to"
            :class="[
              'px-3.5 py-2 rounded-xl  font-semibold text-xs transition-all duration-150 flex items-center gap-2 select-none relative',
              isActive(item.to)
                ? 'bg-primary-500 text-white'
                : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800'
            ]"
          >
            <HugeiconsIcon :icon="item.icon" :size="16" :stroke-width="1.75" />
            <span>{{ item.label }}</span>

            <!-- Badge / Counter -->
            <span
              v-if="item.badge"
              :class="[
                'text-[10px] font-bold px-1.5 py-0.2 rounded-full tabular-nums ml-0.5',
                isActive(item.to)
                  ? 'bg-white/20 text-white'
                  : 'bg-primary-50 text-primary-700 dark:bg-primary-950 dark:text-primary-300 border border-primary-200 dark:border-primary-800'
              ]"
            >
              {{ item.badge }}
            </span>
          </NuxtLink>
        </div>

        <!-- Right: Profile, Settings & Logout -->
        <div class="flex items-center gap-3 shrink-0">
          <!-- Settings link -->
          <NuxtLink
            :to="settingsRoute"
            :class="[
              'p-2 rounded-xl text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors',
              $route.path === settingsRoute ? 'bg-neutral-100 dark:bg-neutral-800 text-primary-600' : ''
            ]"
            title="Pengaturan Akun & Usaha"
          >
            <HugeiconsIcon :icon="Settings01Icon" :size="18" :stroke-width="1.75" />
          </NuxtLink>

          <!-- User Avatar Pill -->
          <div class="flex items-center gap-2 pl-2 border-l border-neutral-200 dark:border-neutral-800">
            <div class="w-8 h-8 rounded-xl bg-primary-100 text-primary-700 dark:bg-primary-900 dark:text-primary-300  font-bold text-xs flex items-center justify-center border border-primary-200 dark:border-primary-800">
              {{ (authStore.currentUser?.name || 'U').slice(0, 2).toUpperCase() }}
            </div>
            <div class="hidden xl:block text-left">
              <span class="text-xs  font-bold text-neutral-900 dark:text-neutral-100 block leading-tight truncate max-w-[130px]">
                {{ authStore.currentUser?.name }}
              </span>
              <span class="text-[10px] text-neutral-400 block truncate max-w-[130px]">
                {{ authStore.currentUser?.email }}
              </span>
            </div>
          </div>

          <!-- Logout Button -->
          <button
            type="button"
            class="p-2 rounded-xl text-neutral-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors cursor-pointer"
            title="Keluar Akun"
            @click="handleLogout"
          >
            <HugeiconsIcon :icon="Logout01Icon" :size="18" :stroke-width="1.75" />
          </button>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '~/stores/auth'
import { useUmkmStore } from '~/stores/umkm'
import { useKonsultanStore } from '~/stores/konsultan'
import { useInvestorStore } from '~/stores/investor'
import { HugeiconsIcon } from '@hugeicons/vue'
import {
  Home03Icon,
  Task01Icon,
  Coins01Icon,
  Award01Icon,
  UserGroupIcon,
  CheckmarkCircle01Icon,
  Alert01Icon,
  Store01Icon,
  StarIcon,
  Settings01Icon,
  Logout01Icon
} from '@hugeicons/core-free-icons'

const route = useRoute()
const authStore = useAuthStore()
const umkmStore = useUmkmStore()
const konsultanStore = useKonsultanStore()
const investorStore = useInvestorStore()

const currentRole = computed(() => authStore.currentUser?.role || 'UMKM')

const currentRoleName = computed(() => {
  switch (currentRole.value) {
    case 'UMKM': return 'Pemilik Usaha'
    case 'CONSULTANT': return 'Konsultan'
    case 'INVESTOR': return 'Investor'
    case 'ADMIN': return 'Admin'
    default: return 'Pengguna'
  }
})

const roleBadgeClasses: Record<string, string> = {
  UMKM: 'bg-primary-50 text-primary-700 border-primary-200 dark:bg-primary-950 dark:text-primary-300 dark:border-primary-800',
  CONSULTANT: 'bg-emerald-50 text-emerald-800 border-emerald-200 dark:bg-emerald-950 dark:text-emerald-300 dark:border-emerald-800',
  INVESTOR: 'bg-amber-50 text-amber-900 border-amber-200 dark:bg-amber-950 dark:text-amber-300 dark:border-amber-800',
  ADMIN: 'bg-purple-50 text-purple-900 border-purple-200 dark:bg-purple-950 dark:text-purple-300 dark:border-purple-800'
}

const settingsRoute = computed(() => {
  if (currentRole.value === 'UMKM') return '/dashboard/pengaturan'
  if (currentRole.value === 'CONSULTANT') return '/konsultan/pengaturan'
  return '/investor/pengaturan'
})

function isActive(path: string) {
  if (path === '/dashboard') return route.path === '/dashboard'
  if (path === '/konsultan') return route.path === '/konsultan'
  if (path === '/investor') return route.path === '/investor'
  return route.path.startsWith(path)
}

const navItems = computed(() => {
  if (currentRole.value === 'UMKM') {
    return [
      {
        to: '/dashboard',
        label: 'Beranda',
        icon: Home03Icon
      },
      {
        to: '/dashboard/rencana-aksi',
        label: 'Progress Tugas',
        icon: Task01Icon,
        badge: `${umkmStore.tasksCompletedCount}/${umkmStore.tasks.length}`
      },
      {
        to: '/dashboard/progres',
        label: 'Laporan Bulanan',
        icon: Coins01Icon
      },
      {
        to: '/dashboard/pendanaan',
        label: 'Peluang Modal',
        icon: Award01Icon,
        badge: 'Ready'
      }
    ]
  } else if (currentRole.value === 'CONSULTANT') {
    return [
      {
        to: '/konsultan',
        label: 'Matriks Klien',
        icon: UserGroupIcon,
        badge: `${konsultanStore.clients.length}`
      },
      {
        to: '/konsultan/validasi',
        label: 'Validasi Laporan',
        icon: CheckmarkCircle01Icon,
        badge: `${konsultanStore.validationsQueue.length}`
      },
      {
        to: '/konsultan/rencana-aksi',
        label: 'Rencana Aksi',
        icon: Task01Icon,
        badge: `${konsultanStore.actionPlans.filter(p => p.status === 'TODO').length}`
      }
    ]
  } else {
    // Investor
    return [
      {
        to: '/investor',
        label: 'Katalog',
        icon: Store01Icon
      },
      {
        to: '/investor/watchlist',
        label: 'Simpanan',
        icon: StarIcon,
        badge: `${investorStore.watchlist.length}`
      }
    ]
  }
})

const router = useRouter()

async function handleLogout() {
  await authStore.logout()
  router.push('/masuk')
}
</script>
