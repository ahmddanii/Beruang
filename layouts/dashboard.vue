<template>
  <div class="min-h-screen flex flex-col bg-white dark:bg-[#0F1014] text-neutral-900 dark:text-neutral-100 font-sans transition-colors">
    <div class="flex-1 flex min-h-0">
      <!-- Desktop & Mobile Drawer Sidebar (styled in #fafafa) -->
      <DashboardSidebar
        :is-mobile-open="isMobileMenuOpen"
        @close-mobile="isMobileMenuOpen = false"
      />

      <!-- Content Area with Mobile Top Header -->
      <div class="flex-1 flex flex-col min-w-0 bg-white dark:bg-[#0F1014]">
        <!-- Mobile Top Header Bar (Only on mobile < lg) -->
        <header class="lg:hidden sticky top-0 z-30 bg-white/95 dark:bg-[#141519]/95 backdrop-blur-md border-b border-neutral-200/90 dark:border-neutral-800 px-4 py-3 flex items-center justify-between">
          <div class="flex items-center gap-3">
            <button
              type="button"
              class="p-2 rounded-lg text-neutral-700 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors active:scale-[0.96]"
              aria-label="Buka Menu Navigasi"
              @click="isMobileMenuOpen = true"
            >
              <HugeiconsIcon :icon="Menu01Icon" :size="20" :stroke-width="1.75" />
            </button>

            <NuxtLink to="/" class="flex items-center gap-2">
              <div class="w-7 h-7 rounded-lg bg-neutral-950 dark:bg-white p-1 flex items-center justify-center">
                <img src="/logo.svg" alt="Beruang" class="w-full h-full object-contain filter brightness-110" />
              </div>
              <span class="font-heading font-semibold text-base text-neutral-900 dark:text-white tracking-tight">
                Beruang
              </span>
            </NuxtLink>
          </div>

          <div class="flex items-center gap-2">
            <span class="text-xs sm:text-sm font-heading font-semibold px-3 py-1 rounded-full bg-primary-50 text-primary-700 dark:bg-primary-950 dark:text-primary-300 border border-primary-200/70 dark:border-primary-800">
              {{ currentRoleName }}
            </span>
          </div>
        </header>

        <!-- Main Dashboard Workspace Content (Fluid full-width layout matching Trueform references) -->
        <main class="flex-1 w-full px-6 sm:px-10 lg:pl-16 lg:pr-12 xl:pl-20 xl:pr-16 py-7 sm:py-9">
          <slot />
        </main>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useAuthStore } from '~/stores/auth'
import DashboardSidebar from '~/components/layout/DashboardSidebar.vue'
import { HugeiconsIcon } from '@hugeicons/vue'
import { Menu01Icon } from '@hugeicons/core-free-icons'

const authStore = useAuthStore()
const isMobileMenuOpen = ref(false)

const currentRole = computed(() => authStore.currentUser?.role || 'UMKM')

const currentRoleName = computed(() => {
  switch (currentRole.value) {
    case 'UMKM': return 'Pemilik Usaha'
    case 'CONSULTANT': return 'Konsultan'
    case 'INVESTOR': return 'Investor'
    case 'ADMIN': return 'Administrator'
    default: return 'Pengguna'
  }
})
</script>
