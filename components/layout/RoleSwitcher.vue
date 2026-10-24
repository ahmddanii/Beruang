<template>
  <div class="bg-neutral-900 text-white text-xs px-4 py-2 border-b border-neutral-800 flex items-center justify-between flex-wrap gap-2 z-50">
    <div class="flex items-center gap-2">
      <span class="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-primary-500/20 text-primary-300 font-medium">
        <span class="w-1.5 h-1.5 rounded-full bg-primary-400 animate-pulse" />
        Mode Simulasi Peran:
      </span>
      <span class="font-bold text-neutral-200">
        {{ authStore.currentUser?.name }}
      </span>
      <span class="text-neutral-400 hidden sm:inline">
        ({{ authStore.currentUser?.businessName }})
      </span>
    </div>

    <!-- Role Switcher Buttons -->
    <div class="flex items-center gap-1.5">
      <button
        type="button"
        :class="[
          'px-2.5 py-1 rounded-lg  font-semibold transition-all duration-150',
          authStore.currentUser?.role === 'UMKM'
            ? 'bg-primary-500 text-white shadow-xs'
            : 'text-neutral-400 hover:text-white hover:bg-neutral-800'
        ]"
        @click="switchToRole('UMKM', '/dashboard')"
      >
        UMKM
      </button>

      <button
        type="button"
        :class="[
          'px-2.5 py-1 rounded-lg  font-semibold transition-all duration-150',
          authStore.currentUser?.role === 'CONSULTANT'
            ? 'bg-primary-500 text-white shadow-xs'
            : 'text-neutral-400 hover:text-white hover:bg-neutral-800'
        ]"
        @click="switchToRole('CONSULTANT', '/konsultan')"
      >
        Konsultan
      </button>

      <button
        type="button"
        :class="[
          'px-2.5 py-1 rounded-lg  font-semibold transition-all duration-150',
          authStore.currentUser?.role === 'INVESTOR'
            ? 'bg-primary-500 text-white shadow-xs'
            : 'text-neutral-400 hover:text-white hover:bg-neutral-800'
        ]"
        @click="switchToRole('INVESTOR', '/investor')"
      >
        Investor
      </button>

      <button
        type="button"
        :class="[
          'px-2.5 py-1 rounded-lg  font-semibold transition-all duration-150',
          authStore.currentUser?.role === 'ADMIN'
            ? 'bg-primary-500 text-white shadow-xs'
            : 'text-neutral-400 hover:text-white hover:bg-neutral-800'
        ]"
        @click="switchToRole('ADMIN', '/admin')"
      >
        Admin
      </button>

      <NuxtLink
        to="/dev/components"
        class="text-neutral-400 hover:text-gold ml-2 pl-2 border-l border-neutral-700 text-[11px] "
      >
        UI Kit
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useAuthStore, type UserRole } from '~/stores/auth'

const router = useRouter()
const authStore = useAuthStore()

function switchToRole(role: UserRole, targetRoute: string) {
  authStore.setRole(role)
  router.push(targetRoute)
}
</script>
