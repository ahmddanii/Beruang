<template>
  <div class="space-y-8 pb-12 font-sans">
    <!-- Header -->
    <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
      <div>
        <h1 class="text-2xl sm:text-3xl font-heading font-bold text-neutral-900 dark:text-white tracking-tight">
          Pratinjau Kartu di Marketplace Investor
        </h1>
        <p class="text-sm sm:text-base text-neutral-600 dark:text-neutral-300 mt-1.5 leading-relaxed">
          Inilah tampilan profil usahamu yang dilihat oleh investor terakreditasi di katalog publik.
        </p>
      </div>

      <NuxtLink to="/investor">
        <BButton variant="outline" size="md">
          Lihat di Katalog Marketplace →
        </BButton>
      </NuxtLink>
    </div>

    <!-- Privacy Notice -->
    <div class="p-4 sm:p-5 rounded-2xl bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark flex items-start gap-4">
      <div class="w-9 h-9 rounded-xl bg-primary-100 dark:bg-primary-950 text-primary-600 dark:text-primary-400 flex items-center justify-center shrink-0 mt-0.5">
        <HugeiconsIcon :icon="Shield02Icon" :size="20" :stroke-width="1.75" />
      </div>
      <div class="space-y-1">
        <h4 class="font-heading font-bold text-sm sm:text-base text-neutral-900 dark:text-white">
          Perlindungan Privasi Keuangan Aktif
        </h4>
        <p class="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed">
          Sesuai standar privasi Beruang, nominal omzet dan kas riil (dalam Rupiah) tidak pernah ditampilkan ke publik. Hanya rasio efisiensi persentase dan skor kesehatan terverifikasi yang dapat dilihat.
        </p>
      </div>
    </div>

    <!-- Marketplace Card Mockup -->
    <div class="max-w-xl mx-auto">
      <BCard padding="lg">
        <div class="space-y-5">
          <!-- Top info -->
          <div class="flex items-start justify-between gap-4">
            <div class="flex items-center gap-3.5">
              <div class="w-12 h-12 rounded-xl bg-amber-400 p-2 shadow-xs shrink-0 flex items-center justify-center">
                <img src="/logo.svg" alt="Logo Usaha" class="w-full h-full object-contain" />
              </div>
              <div>
                <span class="text-xs font-mono font-bold text-neutral-500 dark:text-neutral-400">BERU-KOP-01</span>
                <h3 class="font-heading font-bold text-lg sm:text-xl text-neutral-900 dark:text-white">
                  {{ umkmStore.profile.name }}
                </h3>
                <p class="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 font-medium mt-0.5">
                  {{ umkmStore.profile.sector }} • {{ umkmStore.profile.city }}
                </p>
              </div>
            </div>

            <span class="inline-flex items-center gap-1.5 text-xs font-heading font-bold px-2.5 py-1 rounded-md bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 shrink-0">
              <HugeiconsIcon :icon="CheckmarkCircle01Icon" :size="14" :stroke-width="2" />
              <span>Verified</span>
            </span>
          </div>

          <!-- Pitch Summary -->
          <p class="text-xs sm:text-sm text-neutral-700 dark:text-neutral-200 leading-relaxed bg-surface-light dark:bg-surface-dark p-4 rounded-xl border border-border-light dark:border-border-dark italic">
            "{{ umkmStore.profile.pitchSummary }}"
          </p>

          <!-- Key Metrics Grid -->
          <div class="grid grid-cols-3 gap-3 text-center">
            <div class="p-3 rounded-xl bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark">
              <span class="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 block font-semibold mb-1">Margin Kotor</span>
              <span class="font-heading font-extrabold text-lg sm:text-xl text-emerald-600 dark:text-emerald-400 tabular-nums">48.5%</span>
            </div>
            <div class="p-3 rounded-xl bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark">
              <span class="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 block font-semibold mb-1">Pertumbuhan</span>
              <span class="font-heading font-extrabold text-lg sm:text-xl text-primary-600 dark:text-primary-400 tabular-nums">+34.2%</span>
            </div>
            <div class="p-3 rounded-xl bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark">
              <span class="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 block font-semibold mb-1">Skor Audit</span>
              <span class="font-heading font-extrabold text-lg sm:text-xl text-neutral-900 dark:text-white tabular-nums">79/100</span>
            </div>
          </div>

          <!-- Consultant verification footer -->
          <div class="pt-3 border-t border-border-light dark:border-border-dark flex items-center justify-between text-xs sm:text-sm">
            <div class="flex items-center gap-1.5 text-neutral-600 dark:text-neutral-400">
              <span>Konsultan:</span>
              <strong class="text-neutral-800 dark:text-neutral-200 font-semibold">{{ umkmStore.profile.consultantName }}</strong>
            </div>

            <BButton variant="outline" size="sm" disabled>
              Ajukan Akses Data (Investor Only)
            </BButton>
          </div>
        </div>
      </BCard>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useUmkmStore } from '~/stores/umkm'
import BCard from '~/components/base/BCard.vue'
import BButton from '~/components/base/BButton.vue'
import { HugeiconsIcon } from '@hugeicons/vue'
import {
  Shield02Icon,
  CheckmarkCircle01Icon
} from '@hugeicons/core-free-icons'

definePageMeta({
  layout: 'dashboard'
})

const umkmStore = useUmkmStore()
</script>
