<template>
  <div class="space-y-8 pb-10">
    <!-- Header -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <div class="flex items-center gap-2 text-xs text-neutral-500 mb-2">
          <NuxtLink to="/investor" class="hover:text-primary-600 transition-colors flex items-center gap-1.5">
            <HugeiconsIcon :icon="ArrowLeft02Icon" :size="14" :stroke-width="2" />
            <span>Katalog Marketplace</span>
          </NuxtLink>
        </div>
        <h1 class="text-2xl sm:text-3xl font-heading font-extrabold text-neutral-900 dark:text-neutral-50 tracking-tight">
          Simpanan Bisnis Pilihan Saya
        </h1>
        <p class="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 mt-1">
          Daftar pantau (watchlist) UMKM potensial yang Anda tandai untuk evaluasi dan due diligence portofolio.
        </p>
      </div>

      <div class="flex items-center gap-2">
        <span class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800 text-xs font-heading font-semibold">
          <HugeiconsIcon :icon="StarIcon" :size="14" :stroke-width="2" class="fill-amber-400 text-amber-500" />
          <span>{{ investorStore.watchlist.length }} Usaha Tersimpan</span>
        </span>
      </div>
    </div>

    <!-- Empty State if empty -->
    <div
      v-if="investorStore.watchlist.length === 0"
      class="p-12 sm:p-16 bg-white dark:bg-[#151519] rounded-2xl border border-[#E4E7EC] dark:border-[#2B2B31] text-center max-w-lg mx-auto space-y-4"
    >
      <div class="w-14 h-14 rounded-2xl bg-neutral-100 dark:bg-neutral-800 text-neutral-400 flex items-center justify-center mx-auto">
        <HugeiconsIcon :icon="StarIcon" :size="24" :stroke-width="1.75" />
      </div>
      <div>
        <h3 class="font-heading font-bold text-lg text-neutral-900 dark:text-white">
          Belum Ada Bisnis Tersimpan
        </h3>
        <p class="text-xs sm:text-sm text-neutral-500 max-w-sm mx-auto mt-1 leading-relaxed">
          Jelajahi katalog marketplace UMKM dan klik tombol bintang untuk menyimpan bisnis potensial ke daftar pantau Anda.
        </p>
      </div>
      <div class="pt-2">
        <NuxtLink to="/investor">
          <BButton variant="primary" size="md" class="flex items-center gap-2 mx-auto">
            <span>Buka Katalog Marketplace</span>
            <HugeiconsIcon :icon="ArrowRight02Icon" :size="15" :stroke-width="2" />
          </BButton>
        </NuxtLink>
      </div>
    </div>

    <!-- Watchlist Grid -->
    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div
        v-for="item in investorStore.watchlist"
        :key="item.id"
        class="bg-white dark:bg-[#151519] rounded-2xl border border-[#E4E7EC] dark:border-[#2B2B31] p-6 flex flex-col justify-between hover:border-neutral-300 dark:hover:border-neutral-700 transition-all hover:shadow-xs group"
      >
        <div class="space-y-4">
          <!-- Top Tag & Star Toggle -->
          <div class="flex items-start justify-between">
            <div class="flex items-center gap-2">
              <span class="text-[10px] font-mono font-bold uppercase tracking-wider text-neutral-400 bg-neutral-100 dark:bg-neutral-800 px-2 py-0.5 rounded-md">
                {{ item.code }}
              </span>
              <span class="text-xs text-neutral-500 font-medium">
                {{ item.sector }}
              </span>
            </div>

            <button
              type="button"
              class="p-1.5 rounded-lg text-amber-500 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
              title="Hapus dari Simpanan"
              @click="investorStore.toggleBookmark(item.id)"
            >
              <HugeiconsIcon :icon="StarIcon" :size="18" :stroke-width="2" class="fill-amber-400 text-amber-500" />
            </button>
          </div>

          <!-- Title & Location -->
          <div>
            <h3 class="font-heading font-bold text-base text-neutral-900 dark:text-white group-hover:text-primary-600 transition-colors">
              {{ item.name }}
            </h3>
            <p class="text-xs text-neutral-500 mt-0.5">
              {{ item.city }} • Operasional Sehat
            </p>
          </div>

          <!-- Summary pitch -->
          <p class="text-xs text-neutral-600 dark:text-neutral-400 line-clamp-2 leading-relaxed">
            "{{ item.pitchSummary }}"
          </p>

          <!-- Key Metrics Bento Grid -->
          <div class="grid grid-cols-2 gap-2.5 p-3 rounded-xl bg-neutral-50 dark:bg-neutral-800/60 border border-neutral-100 dark:border-neutral-800">
            <div>
              <span class="text-[10px] text-neutral-400 block font-medium">Margin Kotor</span>
              <span class="font-heading font-bold text-sm text-emerald-600 tabular-nums">
                {{ item.marginPercentage }}%
              </span>
            </div>
            <div>
              <span class="text-[10px] text-neutral-400 block font-medium">Skor Audit BNSP</span>
              <span class="font-heading font-bold text-sm text-neutral-900 dark:text-white tabular-nums">
                {{ item.healthScore }}/100
              </span>
            </div>
          </div>

          <!-- Health Score Bar -->
          <div>
            <div class="flex items-center justify-between text-[11px] mb-1">
              <span class="text-neutral-500">Kelayakan Investasi</span>
              <span class="font-heading font-semibold text-neutral-700 dark:text-neutral-300">{{ item.healthScore }}%</span>
            </div>
            <div class="h-1.5 w-full bg-neutral-100 dark:bg-neutral-800 rounded-full overflow-hidden">
              <div
                class="h-full bg-emerald-500 rounded-full transition-all"
                :style="{ width: `${item.healthScore}%` }"
              />
            </div>
          </div>
        </div>

        <!-- Footer Actions -->
        <div class="pt-5 mt-5 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-between gap-3">
          <NuxtLink
            :to="`/investor/umkm/${item.id}`"
            class="text-xs text-neutral-600 dark:text-neutral-300 font-heading font-semibold hover:text-primary-600 transition-colors"
          >
            Lihat Profil
          </NuxtLink>

          <NuxtLink
            v-if="item.accessStatus === 'APPROVED'"
            :to="`/investor/data-room/${item.id}`"
          >
            <BButton variant="success" size="sm" class="flex items-center gap-1.5">
              <HugeiconsIcon :icon="FileUnlockedIcon" :size="14" :stroke-width="2" />
              <span>Data Room</span>
            </BButton>
          </NuxtLink>
          <NuxtLink
            v-else
            :to="`/investor/umkm/${item.id}/ajukan-akses`"
          >
            <BButton variant="primary" size="sm" class="flex items-center gap-1.5">
              <span>Ajukan Akses</span>
              <HugeiconsIcon :icon="ArrowRight02Icon" :size="13" :stroke-width="2" />
            </BButton>
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useInvestorStore } from '~/stores/investor'
import BButton from '~/components/base/BButton.vue'
import { HugeiconsIcon } from '@hugeicons/vue'
import {
  ArrowLeft02Icon,
  ArrowRight02Icon,
  StarIcon,
  FileUnlockedIcon
} from '@hugeicons/core-free-icons'

definePageMeta({
  layout: 'dashboard'
})

const investorStore = useInvestorStore()
</script>
