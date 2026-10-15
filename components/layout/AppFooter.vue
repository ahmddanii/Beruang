<template>
  <footer class="bg-surface-light dark:bg-surface-dark border-t border-border-light dark:border-border-dark pt-16 pb-12 transition-colors font-sans">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-border-light dark:border-border-dark">
        <!-- Brand column -->
        <div class="lg:col-span-2 space-y-4">
          <div class="flex items-center gap-2.5">
            <img src="/logo/logoSmall.svg" alt="Beruang Logo" class="h-9 w-auto object-contain" />
            <span class="font-heading font-extrabold text-2xl tracking-tight leading-none select-none">
              <span class="text-[#0081A0] dark:text-[#00A5CC]">Ber</span><span class="text-[#00AA13] dark:text-[#22C55E]">uang</span>
            </span>
          </div>
          <p class="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 max-w-sm leading-relaxed">
            Platform pendampingan bisnis dan pendanaan terverifikasi. Kami menghubungkan UMKM Indonesia yang berpotensi dengan konsultan profesional dan investor terpercaya.
          </p>
          <div class="flex flex-wrap items-center gap-2 pt-1">
            <span class="inline-flex items-center gap-1.5 text-xs font-heading font-medium px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-800">
              <HugeiconsIcon :icon="CheckmarkCircle01Icon" :size="14" :stroke-width="2" />
              <span>Terverifikasi Konsultan</span>
            </span>
            <span class="inline-flex items-center gap-1.5 text-xs font-heading font-medium px-2.5 py-1 rounded-full bg-primary-50 text-primary-700 border border-primary-200 dark:bg-primary-950/40 dark:text-primary-300 dark:border-primary-800">
              <HugeiconsIcon :icon="LockKeyIcon" :size="14" :stroke-width="2" />
              <span>Enkripsi Data Room</span>
            </span>
          </div>
        </div>

        <!-- Links: Ekosistem -->
        <div>
          <h4 class="font-heading font-bold text-xs text-neutral-900 dark:text-neutral-100 uppercase tracking-wider mb-4">
            Ekosistem
          </h4>
          <ul class="space-y-2.5 text-xs sm:text-sm">
            <li>
              <NuxtLink to="/untuk-umkm" class="text-neutral-600 dark:text-neutral-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                Bina Usaha (UMKM)
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/untuk-investor" class="text-neutral-600 dark:text-neutral-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                Peluang Investor
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/untuk-konsultan" class="text-neutral-600 dark:text-neutral-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                Jadi Konsultan
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/investor" class="text-neutral-600 dark:text-neutral-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                Katalog Marketplace
              </NuxtLink>
            </li>
          </ul>
        </div>

        <!-- Links: Perusahaan -->
        <div>
          <h4 class="font-heading font-bold text-xs text-neutral-900 dark:text-neutral-100 uppercase tracking-wider mb-4">
            Perusahaan
          </h4>
          <ul class="space-y-2.5 text-xs sm:text-sm">
            <li>
              <NuxtLink to="/tentang" class="text-neutral-600 dark:text-neutral-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                Tentang Kami
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/faq" class="text-neutral-600 dark:text-neutral-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                Pusat Bantuan & FAQ
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/kontak" class="text-neutral-600 dark:text-neutral-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                Hubungi Kami
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/dev/components" class="text-neutral-600 dark:text-neutral-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                Design System Preview
              </NuxtLink>
            </li>
          </ul>
        </div>

        <!-- Consultation Box -->
        <div>
          <h4 class="font-heading font-bold text-xs text-neutral-900 dark:text-neutral-100 uppercase tracking-wider mb-4">
            Mulai Sekarang
          </h4>
          <div class="p-4 rounded-2xl bg-white dark:bg-neutral-900 border border-border-light dark:border-border-dark text-xs space-y-2">
            <p class="font-heading font-semibold text-neutral-900 dark:text-neutral-100">
              Konsultasi Awal Gratis
            </p>
            <p class="text-neutral-500 leading-relaxed">
              Konsultan pendamping kami siap membantu usahamu menata fundamental bisnis hari ini.
            </p>
            <NuxtLink to="/daftar" class="inline-block font-heading font-semibold text-primary-600 dark:text-primary-400 hover:underline pt-1">
              Daftar Usahamu →
            </NuxtLink>
          </div>
        </div>
      </div>

      <!-- Bottom Bar -->
      <div class="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500 dark:text-neutral-400">
        <p>© 2026 Beruang (Ber-Uang) Indonesia. Hak Cipta Dilindungi.</p>
        <div class="flex items-center gap-6">
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
