<template>
  <header class="sticky top-0 z-40 bg-white/95 dark:bg-[#141519]/95 backdrop-blur-md border-b border-[#EAEAEA] dark:border-[#26272F] transition-colors">
    <!-- h-16 = 64px (×8), px-8 = 32px (×8) -->
    <div class="max-w-7xl mx-auto px-4 sm:px-8 lg:px-8 h-16 flex items-center justify-between gap-4">
      <!-- Brand Logo -->
      <NuxtLink to="/" class="flex items-center gap-3 group shrink-0" title="Beranda Beruang">
        <!-- Logo: 40×40 (×8), radius-lg=16px, nested image gets radius 8px (16-8=8) -->
        <div class="w-10 h-10 rounded-[16px] bg-neutral-950 dark:bg-white flex items-center justify-center p-2 shadow-xs group-hover:scale-105 transition-transform duration-150">
          <img src="/logo.svg" alt="Beruang Logo" class="w-full h-full object-contain filter brightness-110 rounded-[8px]" />
        </div>
        <div class="flex flex-col">
          <!-- Brand name: 20px ≈ subhead scale, lh 28px (×4) -->
          <span class=" font-extrabold text-xl tracking-tight text-neutral-900 dark:text-white leading-7">
            Beruang
          </span>
          <!-- Tagline: 12px caption, lh 16px (×8) -->
          <span class="text-[12px] leading-4 text-neutral-500 dark:text-neutral-400 font-medium tracking-tight mt-1 hidden sm:block">
            Finansial & Modal UMKM
          </span>
        </div>
      </NuxtLink>

      <!-- Desktop Navigation Links -->
      <nav class="hidden lg:flex items-center gap-1">
        <NuxtLink
          to="/"
          :class="[
            'px-4 py-2 rounded-[12px] text-[14px] font-semibold transition-all duration-150 select-none leading-6',
            $route.path === '/'
              ? 'bg-primary-50 dark:bg-primary-950/40 text-primary-600 dark:text-primary-400 shadow-xs'
              : 'text-neutral-600 dark:text-neutral-400 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-neutral-50 dark:hover:bg-neutral-800/60'
          ]"
        >
          Beranda
        </NuxtLink>

        <NuxtLink
          to="/untuk-umkm"
          :class="[
            'px-4 py-2 rounded-[12px] text-[14px] font-semibold transition-all duration-150 select-none leading-6',
            $route.path.startsWith('/untuk-umkm')
              ? 'bg-primary-50 dark:bg-primary-950/40 text-primary-600 dark:text-primary-400 shadow-xs'
              : 'text-neutral-600 dark:text-neutral-400 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-neutral-50 dark:hover:bg-neutral-800/60'
          ]"
        >
          UMKM
        </NuxtLink>

        <NuxtLink
          to="/untuk-investor"
          :class="[
            'px-4 py-2 rounded-[12px] text-[14px] font-semibold transition-all duration-150 select-none leading-6',
            $route.path.startsWith('/untuk-investor')
              ? 'bg-primary-50 dark:bg-primary-950/40 text-primary-600 dark:text-primary-400 shadow-xs'
              : 'text-neutral-600 dark:text-neutral-400 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-neutral-50 dark:hover:bg-neutral-800/60'
          ]"
        >
          Investor
        </NuxtLink>

        <NuxtLink
          to="/untuk-konsultan"
          :class="[
            'px-4 py-2 rounded-[12px] text-[14px] font-semibold transition-all duration-150 select-none leading-6',
            $route.path.startsWith('/untuk-konsultan')
              ? 'bg-primary-50 dark:bg-primary-950/40 text-primary-600 dark:text-primary-400 shadow-xs'
              : 'text-neutral-600 dark:text-neutral-400 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-neutral-50 dark:hover:bg-neutral-800/60'
          ]"
        >
          Konsultan Mitra
        </NuxtLink>

        <NuxtLink
          to="/tentang"
          :class="[
            'px-4 py-2 rounded-[12px] text-[14px] font-semibold transition-all duration-150 select-none leading-6',
            $route.path.startsWith('/tentang')
              ? 'bg-primary-50 dark:bg-primary-950/40 text-primary-600 dark:text-primary-400 shadow-xs'
              : 'text-neutral-600 dark:text-neutral-400 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-neutral-50 dark:hover:bg-neutral-800/60'
          ]"
        >
          Tentang Kami
        </NuxtLink>

        <NuxtLink
          to="/faq"
          :class="[
            'px-4 py-2 rounded-[12px] text-[14px] font-semibold transition-all duration-150 select-none leading-6',
            $route.path.startsWith('/faq')
              ? 'bg-primary-50 dark:bg-primary-950/40 text-primary-600 dark:text-primary-400 shadow-xs'
              : 'text-neutral-600 dark:text-neutral-400 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-neutral-50 dark:hover:bg-neutral-800/60'
          ]"
        >
          Pusat Bantuan
        </NuxtLink>
      </nav>

      <!-- CTA Buttons & Theme Toggle (gap-3 = 12px for small elements is ×4 OK) -->
      <div class="flex items-center gap-3 shrink-0">
        <!-- Theme Toggle: 40×40 touch target (×8), radius 12px -->
        <button
          type="button"
          class="p-2 rounded-[12px] text-neutral-500 hover:text-primary-600 dark:text-neutral-400 dark:hover:text-primary-400 hover:bg-neutral-50 dark:hover:bg-neutral-800/60 transition-colors duration-150 cursor-pointer"
          title="Ganti Tema (Light/Dark)"
          @click="toggleTheme"
        >
          <HugeiconsIcon v-if="isDark" :icon="Sun01Icon" :size="18" :stroke-width="1.75" />
          <HugeiconsIcon v-else :icon="Moon01Icon" :size="18" :stroke-width="1.75" />
        </button>

        <!-- Masuk link: px-4 py-2 (×8) -->
        <NuxtLink
          to="/masuk"
          class="hidden lg:block px-4 py-2 rounded-[12px] text-[14px] font-semibold text-neutral-700 dark:text-neutral-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-neutral-50 dark:hover:bg-neutral-800/60 transition-colors duration-150 leading-6"
        >
          Masuk
        </NuxtLink>

        <!-- Primary CTA: px-4 py-2 (×8), gap-2 (×8), radius 12px -->
        <NuxtLink
          to="/daftar"
          class="hidden lg:inline-flex items-center justify-center px-4 py-2 rounded-[12px] text-[14px] font-semibold bg-primary-500 hover:bg-primary-600 text-white shadow-xs transition-all duration-150 active:scale-[0.98] leading-6"
        >
          <span>Daftar</span>
        </NuxtLink>

        <!-- Mobile Menu Toggle: 40×40 (×8) -->
        <button
          type="button"
          class="lg:hidden p-2 rounded-[12px] text-neutral-600 dark:text-neutral-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-neutral-50 dark:hover:bg-neutral-800/60 transition-colors"
          aria-label="Menu Navigasi"
          @click="mobileMenuOpen = !mobileMenuOpen"
        >
          <HugeiconsIcon v-if="!mobileMenuOpen" :icon="Menu01Icon" :size="20" :stroke-width="2" />
          <HugeiconsIcon v-else :icon="Cancel01Icon" :size="20" :stroke-width="2" />
        </button>
      </div>
    </div>

    <!-- Mobile Drawer -->
    <div
      v-if="mobileMenuOpen"
      class="lg:hidden border-t border-[#EAEAEA] dark:border-[#26272F] px-4 py-4 space-y-2 bg-white dark:bg-[#141519]"
    >
      <NuxtLink
        to="/"
        :class="[
          'block px-4 py-3 rounded-[12px] text-[14px] font-semibold leading-6 transition-colors',
          $route.path === '/'
            ? 'bg-primary-50 dark:bg-primary-950/40 text-primary-600 dark:text-primary-400'
            : 'text-neutral-700 dark:text-neutral-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-neutral-50 dark:hover:bg-neutral-800/60'
        ]"
        @click="mobileMenuOpen = false"
      >
        Beranda
      </NuxtLink>
      <NuxtLink
        to="/untuk-umkm"
        :class="[
          'block px-4 py-3 rounded-[12px] text-[14px] font-semibold leading-6 transition-colors',
          $route.path.startsWith('/untuk-umkm')
            ? 'bg-primary-50 dark:bg-primary-950/40 text-primary-600 dark:text-primary-400'
            : 'text-neutral-700 dark:text-neutral-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-neutral-50 dark:hover:bg-neutral-800/60'
        ]"
        @click="mobileMenuOpen = false"
      >
        UMKM
      </NuxtLink>
      <NuxtLink
        to="/untuk-investor"
        :class="[
          'block px-4 py-3 rounded-[12px] text-[14px] font-semibold leading-6 transition-colors',
          $route.path.startsWith('/untuk-investor')
            ? 'bg-primary-50 dark:bg-primary-950/40 text-primary-600 dark:text-primary-400'
            : 'text-neutral-700 dark:text-neutral-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-neutral-50 dark:hover:bg-neutral-800/60'
        ]"
        @click="mobileMenuOpen = false"
      >
        Investor
      </NuxtLink>
      <NuxtLink
        to="/untuk-konsultan"
        :class="[
          'block px-4 py-3 rounded-[12px] text-[14px] font-semibold leading-6 transition-colors',
          $route.path.startsWith('/untuk-konsultan')
            ? 'bg-primary-50 dark:bg-primary-950/40 text-primary-600 dark:text-primary-400'
            : 'text-neutral-700 dark:text-neutral-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-neutral-50 dark:hover:bg-neutral-800/60'
        ]"
        @click="mobileMenuOpen = false"
      >
        Konsultan Mitra
      </NuxtLink>
      <NuxtLink
        to="/tentang"
        :class="[
          'block px-4 py-3 rounded-[12px] text-[14px] font-semibold leading-6 transition-colors',
          $route.path.startsWith('/tentang')
            ? 'bg-primary-50 dark:bg-primary-950/40 text-primary-600 dark:text-primary-400'
            : 'text-neutral-700 dark:text-neutral-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-neutral-50 dark:hover:bg-neutral-800/60'
        ]"
        @click="mobileMenuOpen = false"
      >
        Tentang Kami
      </NuxtLink>
      <NuxtLink
        to="/faq"
        :class="[
          'block px-4 py-3 rounded-[12px] text-[14px] font-semibold leading-6 transition-colors',
          $route.path.startsWith('/faq')
            ? 'bg-primary-50 dark:bg-primary-950/40 text-primary-600 dark:text-primary-400'
            : 'text-neutral-700 dark:text-neutral-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-neutral-50 dark:hover:bg-neutral-800/60'
        ]"
        @click="mobileMenuOpen = false"
      >
        Pusat Bantuan
      </NuxtLink>
      <!-- Mobile CTA row: pt-4 (×8), gap-2 (×8) -->
      <div class="pt-4 border-t border-[#EAEAEA] dark:border-[#26272F] flex items-center gap-2">
        <NuxtLink
          to="/masuk"
          class="flex-1 text-center py-3 rounded-[12px] text-[14px] font-semibold border border-[#EAEAEA] dark:border-[#26272F] text-neutral-800 dark:text-neutral-200 hover:text-primary-600 hover:bg-neutral-50 dark:hover:bg-neutral-800/60 leading-6 transition-colors"
          @click="mobileMenuOpen = false"
        >
          Masuk
        </NuxtLink>
        <NuxtLink
          to="/daftar"
          class="flex-1 text-center py-3 rounded-[12px] text-[14px] font-semibold bg-primary-500 hover:bg-primary-600 text-white leading-6 transition-colors"
          @click="mobileMenuOpen = false"
        >
          Daftar
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
  Moon01Icon
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
