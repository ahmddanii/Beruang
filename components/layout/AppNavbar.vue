<template>
  <header class="sticky top-0 z-40 bg-white/90 dark:bg-[#0A0A0C]/90 backdrop-blur-md border-b border-neutral-200/80 dark:border-neutral-800/80 transition-colors">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-4">
      <!-- Brand Logo -->
      <NuxtLink to="/" class="flex items-center gap-2 shrink-0" title="Beranda Beruang">
        <img
          src="/logo/logoSmall.svg"
          alt="Beruang Logo"
          class="h-7 w-auto object-contain"
        />
        <span class="font-heading font-extrabold text-xl tracking-tight leading-none select-none">
          <span class="text-[#2091AA] dark:text-[#50AABF]">Ber</span><span class="text-[#00AA13] dark:text-[#00C058]">uang</span>
        </span>
      </NuxtLink>

      <!-- Desktop Navigation Links (Clean, No-Noise Links) -->
      <nav class="hidden lg:flex items-center gap-1">
        <NuxtLink
          to="/untuk-umkm"
          :class="[
            'px-3.5 py-2 rounded-xl text-xs font-heading font-semibold transition-colors duration-150 select-none',
            $route.path.startsWith('/untuk-umkm')
              ? 'bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-white'
              : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100/60 dark:hover:bg-neutral-800/50'
          ]"
        >
          Untuk UMKM
        </NuxtLink>

        <NuxtLink
          to="/untuk-investor"
          :class="[
            'px-3.5 py-2 rounded-xl text-xs font-heading font-semibold transition-colors duration-150 select-none',
            $route.path.startsWith('/untuk-investor')
              ? 'bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-white'
              : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100/60 dark:hover:bg-neutral-800/50'
          ]"
        >
          Untuk Investor
        </NuxtLink>

        <NuxtLink
          to="/untuk-konsultan"
          :class="[
            'px-3.5 py-2 rounded-xl text-xs font-heading font-semibold transition-colors duration-150 select-none',
            $route.path.startsWith('/untuk-konsultan')
              ? 'bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-white'
              : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100/60 dark:hover:bg-neutral-800/50'
          ]"
        >
          Konsultan Mitra
        </NuxtLink>

        <NuxtLink
          to="/tentang"
          :class="[
            'px-3.5 py-2 rounded-xl text-xs font-heading font-semibold transition-colors duration-150 select-none',
            $route.path.startsWith('/tentang')
              ? 'bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-white'
              : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100/60 dark:hover:bg-neutral-800/50'
          ]"
        >
          Tentang Kami
        </NuxtLink>

        <NuxtLink
          to="/faq"
          :class="[
            'px-3.5 py-2 rounded-xl text-xs font-heading font-semibold transition-colors duration-150 select-none',
            $route.path.startsWith('/faq')
              ? 'bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-white'
              : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100/60 dark:hover:bg-neutral-800/50'
          ]"
        >
          Pusat Bantuan
        </NuxtLink>
      </nav>

      <!-- CTA Buttons & Theme Toggle -->
      <div class="flex items-center gap-2.5 shrink-0">
        <!-- Theme Toggle -->
        <button
          type="button"
          class="p-2 rounded-xl text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors duration-150 cursor-pointer"
          title="Ganti Tema (Light/Dark)"
          @click="toggleTheme"
        >
          <HugeiconsIcon v-if="isDark" :icon="Sun01Icon" :size="18" :stroke-width="1.75" />
          <HugeiconsIcon v-else :icon="Moon01Icon" :size="18" :stroke-width="1.75" />
        </button>

        <NuxtLink
          to="/masuk"
          class="px-3.5 py-2 rounded-xl text-xs font-heading font-semibold text-neutral-700 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100/70 dark:hover:bg-neutral-800/60 transition-colors duration-150"
        >
          Masuk
        </NuxtLink>

        <NuxtLink
          to="/daftar"
          class="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-heading font-semibold bg-primary-500 hover:bg-primary-600 text-white shadow-xs transition-all duration-150 active:scale-[0.98]"
        >
          <span>Mulai Audit Usaha</span>
          <HugeiconsIcon :icon="ArrowRight01Icon" :size="14" :stroke-width="2" />
        </NuxtLink>

        <!-- Mobile Menu Toggle Button -->
        <button
          type="button"
          class="lg:hidden p-2 rounded-xl text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
          aria-label="Menu Navigasi"
          @click="mobileMenuOpen = !mobileMenuOpen"
        >
          <HugeiconsIcon v-if="!mobileMenuOpen" :icon="Menu01Icon" :size="20" :stroke-width="2" />
          <HugeiconsIcon v-else :icon="Cancel01Icon" :size="20" :stroke-width="2" />
        </button>
      </div>
    </div>

    <!-- Mobile Drawer Overlay -->
    <div
      v-if="mobileMenuOpen"
      class="lg:hidden border-t border-neutral-200/80 dark:border-neutral-800 px-4 py-4 space-y-2 bg-white dark:bg-[#0A0A0C]"
    >
      <NuxtLink
        to="/untuk-umkm"
        class="block px-3.5 py-2.5 rounded-xl text-sm font-heading font-semibold text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800"
        @click="mobileMenuOpen = false"
      >
        Untuk UMKM
      </NuxtLink>
      <NuxtLink
        to="/untuk-investor"
        class="block px-3.5 py-2.5 rounded-xl text-sm font-heading font-semibold text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800"
        @click="mobileMenuOpen = false"
      >
        Untuk Investor
      </NuxtLink>
      <NuxtLink
        to="/untuk-konsultan"
        class="block px-3.5 py-2.5 rounded-xl text-sm font-heading font-semibold text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800"
        @click="mobileMenuOpen = false"
      >
        Konsultan Mitra
      </NuxtLink>
      <NuxtLink
        to="/tentang"
        class="block px-3.5 py-2.5 rounded-xl text-sm font-heading font-semibold text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800"
        @click="mobileMenuOpen = false"
      >
        Tentang Kami
      </NuxtLink>
      <NuxtLink
        to="/faq"
        class="block px-3.5 py-2.5 rounded-xl text-sm font-heading font-semibold text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800"
        @click="mobileMenuOpen = false"
      >
        Pusat Bantuan
      </NuxtLink>
      <div class="pt-2 border-t border-neutral-100 dark:border-neutral-800 flex items-center gap-2">
        <NuxtLink
          to="/masuk"
          class="flex-1 text-center py-2.5 rounded-xl text-xs font-heading font-semibold border border-neutral-200 dark:border-neutral-700 text-neutral-800 dark:text-neutral-200"
          @click="mobileMenuOpen = false"
        >
          Masuk
        </NuxtLink>
        <NuxtLink
          to="/daftar"
          class="flex-1 text-center py-2.5 rounded-xl text-xs font-heading font-semibold bg-primary-500 text-white"
          @click="mobileMenuOpen = false"
        >
          Mulai Sekarang
        </NuxtLink>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { HugeiconsIcon } from '@hugeicons/vue'
import {
  Menu01Icon,
  Cancel01Icon,
  Sun01Icon,
  Moon01Icon,
  ArrowRight01Icon
} from '@hugeicons/core-free-icons'

const mobileMenuOpen = ref(false)
const isDark = ref(false)

function toggleTheme() {
  isDark.value = !isDark.value
  if (isDark.value) {
    document.documentElement.classList.add('dark')
    localStorage.setItem('beruang-theme', 'dark')
  } else {
    document.documentElement.classList.remove('dark')
    localStorage.setItem('beruang-theme', 'light')
  }
}

onMounted(() => {
  const saved = localStorage.getItem('beruang-theme')
  if (saved === 'dark' || (!saved && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    isDark.value = true
    document.documentElement.classList.add('dark')
  } else {
    isDark.value = false
    document.documentElement.classList.remove('dark')
  }
})
</script>
