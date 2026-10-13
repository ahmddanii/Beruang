<template>
  <footer class="bg-white dark:bg-[#0F1014] border-t border-[#EAEAEA] dark:border-[#26272F] pt-24 pb-8 transition-colors">
    <div class="max-w-7xl mx-auto px-4 sm:px-8 lg:px-8">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-16 pb-16 border-b border-[#EAEAEA] dark:border-[#26272F]">
        
        <!-- Brand column -->
        <div class="lg:col-span-2 flex flex-col gap-6">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-[12px] bg-amber-400 p-2 shadow-xs">
              <img src="/logo.svg" alt="Beruang Logo" class="w-full h-full object-contain" />
            </div>
            <span class="font-bold text-[26px] tracking-tight text-neutral-900 dark:text-white leading-[32px]">
              Beruang
            </span>
          </div>
          <p class="text-[16px] text-neutral-600 dark:text-neutral-400 max-w-sm leading-[24px]">
            Platform pendampingan bisnis dan pendanaan terverifikasi. Kami menghubungkan UMKM Indonesia yang berpotensi dengan konsultan profesional dan investor terpercaya.
          </p>

        </div>

        <!-- Links: Ekosistem -->
        <div class="flex flex-col gap-6">
          <h4 class="font-bold text-[16px] text-neutral-900 dark:text-white leading-[24px]">
            Ekosistem
          </h4>
          <ul class="flex flex-col gap-4">
            <li>
              <NuxtLink to="/untuk-umkm" class="text-[16px] text-neutral-600 dark:text-neutral-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors leading-[24px]">
                Bina Usaha (UMKM)
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/untuk-investor" class="text-[16px] text-neutral-600 dark:text-neutral-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors leading-[24px]">
                Peluang Investor
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/untuk-konsultan" class="text-[16px] text-neutral-600 dark:text-neutral-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors leading-[24px]">
                Jadi Konsultan
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/investor" class="text-[16px] text-neutral-600 dark:text-neutral-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors leading-[24px]">
                Katalog Marketplace
              </NuxtLink>
            </li>
          </ul>
        </div>

        <!-- Links: Perusahaan -->
        <div class="flex flex-col gap-6">
          <h4 class="font-bold text-[16px] text-neutral-900 dark:text-white leading-[24px]">
            Perusahaan
          </h4>
          <ul class="flex flex-col gap-4">
            <li>
              <NuxtLink to="/tentang" class="text-[16px] text-neutral-600 dark:text-neutral-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors leading-[24px]">
                Tentang Kami
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/faq" class="text-[16px] text-neutral-600 dark:text-neutral-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors leading-[24px]">
                Pusat Bantuan & FAQ
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/kontak" class="text-[16px] text-neutral-600 dark:text-neutral-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors leading-[24px]">
                Hubungi Kami
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/dev/components" class="text-[16px] text-neutral-600 dark:text-neutral-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors leading-[24px]">
                Design Preview
              </NuxtLink>
            </li>
          </ul>
        </div>

        <!-- Consultation Section -->
        <div class="flex flex-col gap-6">
          <h4 class="font-bold text-[16px] text-neutral-900 dark:text-white leading-[24px]">
            Mulai Sekarang
          </h4>
          <div class="flex flex-col gap-4">
            <p class="text-[16px] text-neutral-600 dark:text-neutral-400 leading-[24px]">
              Konsultan pendamping kami siap membantu usahamu menata fundamental bisnis hari ini.
            </p>
            <NuxtLink to="/daftar" class="inline-flex items-center gap-2 font-bold text-[16px] text-primary-600 dark:text-primary-400 hover:underline leading-[24px]">
              Daftar Usahamu →
            </NuxtLink>
          </div>
        </div>
      </div>

      <!-- Bottom Bar -->
      <div class="pt-8 flex flex-col sm:flex-row items-center justify-between gap-6">
        <p class="text-[12px] text-neutral-500 dark:text-neutral-400 leading-[16px]">© 2026 Beruang (Ber-Uang) Indonesia. Hak Cipta Dilindungi.</p>
        <div class="flex items-center gap-6 text-[12px] text-neutral-500 dark:text-neutral-400 leading-[16px]">
          <NuxtLink to="/faq" class="hover:underline">Kebijakan Privasi</NuxtLink>
          <NuxtLink to="/faq" class="hover:underline">Syarat & Ketentuan</NuxtLink>
          <NuxtLink to="/faq" class="hover:underline">Pedoman Audit</NuxtLink>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { HugeiconsIcon } from '@hugeicons/vue'
import {
  CheckmarkCircle01Icon,
  LockKeyIcon
} from '@hugeicons/core-free-icons'
</script>
