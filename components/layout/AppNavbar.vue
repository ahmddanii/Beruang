<template>
  <header class="sticky top-0 z-40 bg-white/95 dark:bg-[#0C121D]/95 backdrop-blur-md border-b border-neutral-200/80 dark:border-neutral-800/80 transition-colors shadow-xs">
    <div class="max-w-7xl mx-auto px-4 sm:px-8 lg:px-8 h-[72px] sm:h-20 flex items-center justify-between gap-6">
      <!-- Brand Logo -->
      <NuxtLink to="/" class="flex items-center gap-2.5 group shrink-0" title="Beranda Beruang">
        <img
          src="/logo/logoSmall.svg"
          alt="Beruang Logo"
          class="h-8 sm:h-9 w-auto object-contain transition-transform duration-150 group-hover:scale-105"
        />
        <span class="font-heading font-extrabold text-xl sm:text-2xl tracking-tight leading-none select-none">
          <span class="text-[#0081A0] dark:text-[#2091AA]">Ber</span><span class="text-[#00AA13] dark:text-[#22C55E]">uang</span>
        </span>
      </NuxtLink>

      <!-- Desktop Navigation Links -->
      <nav class="hidden lg:flex items-center gap-1.5 sm:gap-2">
        <NuxtLink
          to="/"
          :class="[
            'px-4 py-2 rounded-full text-sm font-semibold transition-all duration-150 select-none',
            $route.path === '/'
              ? 'bg-[#0081A0]/10 dark:bg-[#0081A0]/25 text-[#0081A0] dark:text-[#50AABF] shadow-xs'
              : 'text-neutral-600 dark:text-neutral-300 hover:text-[#0081A0] dark:hover:text-[#50AABF] hover:bg-neutral-100 dark:hover:bg-neutral-800/60'
          ]"
        >
          Beranda
        </NuxtLink>

        <NuxtLink
          to="/untuk-umkm"
          :class="[
            'px-4 py-2 rounded-full text-sm font-semibold transition-all duration-150 select-none',
            $route.path.startsWith('/untuk-umkm')
              ? 'bg-[#0081A0]/10 dark:bg-[#0081A0]/25 text-[#0081A0] dark:text-[#50AABF] shadow-xs'
              : 'text-neutral-600 dark:text-neutral-300 hover:text-[#0081A0] dark:hover:text-[#50AABF] hover:bg-neutral-100 dark:hover:bg-neutral-800/60'
          ]"
        >
          UMKM
        </NuxtLink>

        <NuxtLink
          to="/untuk-investor"
          :class="[
            'px-4 py-2 rounded-full text-sm font-semibold transition-all duration-150 select-none',
            $route.path.startsWith('/untuk-investor')
              ? 'bg-[#0081A0]/10 dark:bg-[#0081A0]/25 text-[#0081A0] dark:text-[#50AABF] shadow-xs'
              : 'text-neutral-600 dark:text-neutral-300 hover:text-[#0081A0] dark:hover:text-[#50AABF] hover:bg-neutral-100 dark:hover:bg-neutral-800/60'
          ]"
        >
          Investor
        </NuxtLink>

        <NuxtLink
          to="/untuk-konsultan"
          :class="[
            'px-4 py-2 rounded-full text-sm font-semibold transition-all duration-150 select-none',
            $route.path.startsWith('/untuk-konsultan')
              ? 'bg-[#0081A0]/10 dark:bg-[#0081A0]/25 text-[#0081A0] dark:text-[#50AABF] shadow-xs'
              : 'text-neutral-600 dark:text-neutral-300 hover:text-[#0081A0] dark:hover:text-[#50AABF] hover:bg-neutral-100 dark:hover:bg-neutral-800/60'
          ]"
        >
          Konsultan Mitra
        </NuxtLink>

        <NuxtLink
          to="/tentang"
          :class="[
            'px-4 py-2 rounded-full text-sm font-semibold transition-all duration-150 select-none',
            $route.path.startsWith('/tentang')
              ? 'bg-[#0081A0]/10 dark:bg-[#0081A0]/25 text-[#0081A0] dark:text-[#50AABF] shadow-xs'
              : 'text-neutral-600 dark:text-neutral-300 hover:text-[#0081A0] dark:hover:text-[#50AABF] hover:bg-neutral-100 dark:hover:bg-neutral-800/60'
          ]"
        >
          Tentang Kami
        </NuxtLink>

        <NuxtLink
          to="/faq"
          :class="[
            'px-4 py-2 rounded-full text-sm font-semibold transition-all duration-150 select-none',
            $route.path.startsWith('/faq')
              ? 'bg-[#0081A0]/10 dark:bg-[#0081A0]/25 text-[#0081A0] dark:text-[#50AABF] shadow-xs'
              : 'text-neutral-600 dark:text-neutral-300 hover:text-[#0081A0] dark:hover:text-[#50AABF] hover:bg-neutral-100 dark:hover:bg-neutral-800/60'
          ]"
        >
          Pusat Bantuan
        </NuxtLink>
      </nav>

      <!-- CTA Buttons & Theme Toggle -->
      <div class="flex items-center gap-3 shrink-0">
        <!-- Theme Toggle -->
        <button
          type="button"
          class="p-2.5 rounded-full text-neutral-500 hover:text-[#0081A0] dark:text-neutral-400 dark:hover:text-[#50AABF] hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors duration-150 cursor-pointer"
          title="Ganti Tema (Light/Dark)"
          @click="toggleTheme"
        >
          <HugeiconsIcon v-if="isDark" :icon="Sun01Icon" :size="18" :stroke-width="1.8" />
          <HugeiconsIcon v-else :icon="Moon01Icon" :size="18" :stroke-width="1.8" />
        </button>

        <!-- Masuk link -->
        <NuxtLink
          to="/masuk"
          class="hidden lg:block px-4.5 py-2 rounded-full text-sm font-semibold text-neutral-700 dark:text-neutral-300 hover:text-[#0081A0] dark:hover:text-[#50AABF] hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors duration-150"
        >
          Masuk
        </NuxtLink>

        <!-- Primary CTA: Standard Width Pill -->
        <NuxtLink
          to="/daftar"
          class="hidden lg:inline-flex items-center justify-center px-5.5 py-2.5 rounded-full text-sm font-semibold bg-[#0081A0] hover:bg-[#00708C] text-white shadow-[0_2px_10px_rgba(0,129,160,0.25)] transition-all duration-150 active:scale-[0.98]"
        >
          <span>Daftar</span>
        </NuxtLink>

        <!-- Mobile Menu Toggle: 44×44 touch target -->
        <button
          type="button"
          class="lg:hidden p-2.5 rounded-xl text-neutral-600 dark:text-neutral-300 hover:text-[#0081A0] dark:hover:text-[#50AABF] hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
          aria-label="Menu Navigasi"
          @click="mobileMenuOpen = !mobileMenuOpen"
        >
          <HugeiconsIcon v-if="!mobileMenuOpen" :icon="Menu01Icon" :size="22" :stroke-width="2" />
          <HugeiconsIcon v-else :icon="Cancel01Icon" :size="22" :stroke-width="2" />
        </button>
      </div>
    </div>

    <!-- Mobile Drawer -->
    <div
      v-if="mobileMenuOpen"
      class="lg:hidden border-t border-neutral-200/80 dark:border-neutral-800/80 px-4 py-4 space-y-2 bg-white/95 dark:bg-[#0C121D]/95 backdrop-blur-md"
    >
      <NuxtLink
        to="/"
        :class="[
          'block px-4 py-3 rounded-xl text-sm font-semibold transition-colors',
          $route.path === '/'
            ? 'bg-[#0081A0]/10 dark:bg-[#0081A0]/25 text-[#0081A0] dark:text-[#50AABF]'
            : 'text-neutral-700 dark:text-neutral-300 hover:text-[#0081A0] dark:hover:text-[#50AABF] hover:bg-neutral-100 dark:hover:bg-neutral-800/60'
        ]"
        @click="mobileMenuOpen = false"
      >
        Beranda
      </NuxtLink>
      <NuxtLink
        to="/untuk-umkm"
        :class="[
          'block px-4 py-3 rounded-xl text-sm font-semibold transition-colors',
          $route.path.startsWith('/untuk-umkm')
            ? 'bg-[#0081A0]/10 dark:bg-[#0081A0]/25 text-[#0081A0] dark:text-[#50AABF]'
            : 'text-neutral-700 dark:text-neutral-300 hover:text-[#0081A0] dark:hover:text-[#50AABF] hover:bg-neutral-100 dark:hover:bg-neutral-800/60'
        ]"
        @click="mobileMenuOpen = false"
      >
        UMKM
      </NuxtLink>
      <NuxtLink
        to="/untuk-investor"
        :class="[
          'block px-4 py-3 rounded-xl text-sm font-semibold transition-colors',
          $route.path.startsWith('/untuk-investor')
            ? 'bg-[#0081A0]/10 dark:bg-[#0081A0]/25 text-[#0081A0] dark:text-[#50AABF]'
            : 'text-neutral-700 dark:text-neutral-300 hover:text-[#0081A0] dark:hover:text-[#50AABF] hover:bg-neutral-100 dark:hover:bg-neutral-800/60'
        ]"
        @click="mobileMenuOpen = false"
      >
        Investor
      </NuxtLink>
      <NuxtLink
        to="/untuk-konsultan"
        :class="[
          'block px-4 py-3 rounded-xl text-sm font-semibold transition-colors',
          $route.path.startsWith('/untuk-konsultan')
            ? 'bg-[#0081A0]/10 dark:bg-[#0081A0]/25 text-[#0081A0] dark:text-[#50AABF]'
            : 'text-neutral-700 dark:text-neutral-300 hover:text-[#0081A0] dark:hover:text-[#50AABF] hover:bg-neutral-100 dark:hover:bg-neutral-800/60'
        ]"
        @click="mobileMenuOpen = false"
      >
        Konsultan Mitra
      </NuxtLink>
      <NuxtLink
        to="/tentang"
        :class="[
          'block px-4 py-3 rounded-xl text-sm font-semibold transition-colors',
          $route.path.startsWith('/tentang')
            ? 'bg-[#0081A0]/10 dark:bg-[#0081A0]/25 text-[#0081A0] dark:text-[#50AABF]'
            : 'text-neutral-700 dark:text-neutral-300 hover:text-[#0081A0] dark:hover:text-[#50AABF] hover:bg-neutral-100 dark:hover:bg-neutral-800/60'
        ]"
        @click="mobileMenuOpen = false"
      >
        Tentang Kami
      </NuxtLink>
      <NuxtLink
        to="/faq"
        :class="[
          'block px-4 py-3 rounded-xl text-sm font-semibold transition-colors',
          $route.path.startsWith('/faq')
            ? 'bg-[#0081A0]/10 dark:bg-[#0081A0]/25 text-[#0081A0] dark:text-[#50AABF]'
            : 'text-neutral-700 dark:text-neutral-300 hover:text-[#0081A0] dark:hover:text-[#50AABF] hover:bg-neutral-100 dark:hover:bg-neutral-800/60'
        ]"
        @click="mobileMenuOpen = false"
      >
        Pusat Bantuan
      </NuxtLink>
      <!-- Mobile CTA row -->
      <div class="pt-4 border-t border-neutral-200/80 dark:border-neutral-800/80 flex items-center gap-3">
        <NuxtLink
          to="/masuk"
          class="flex-1 text-center py-2.5 rounded-full text-sm font-semibold border border-neutral-300 dark:border-neutral-700 text-neutral-800 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
          @click="mobileMenuOpen = false"
        >
          Masuk
        </NuxtLink>
        <NuxtLink
          to="/daftar"
          class="flex-1 text-center py-2.5 rounded-full text-sm font-semibold bg-[#0081A0] hover:bg-[#00708C] text-white transition-colors shadow-sm"
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
