<template>
  <div class="space-y-6 pb-20 font-sans">
    <!-- Header -->
    <div class="bg-white dark:bg-[#141519] rounded-3xl border border-neutral-200 dark:border-neutral-800 p-6 sm:p-8 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <NuxtLink
          to="/investor"
          class="inline-flex items-center gap-1.5 text-xs text-neutral-500 hover:text-primary-600 transition-colors mb-2"
        >
          <HugeiconsIcon :icon="ArrowLeft02Icon" :size="14" :stroke-width="2" />
          <span>Katalog Usaha</span>
        </NuxtLink>
        <h1 class="text-2xl sm:text-3xl font-heading font-extrabold text-neutral-900 dark:text-neutral-50 tracking-tight">
          Usaha Disimpan
        </h1>
        <p class="text-xs sm:text-sm text-neutral-500 mt-1">
          Daftar usaha yang ditandai untuk dipelajari lebih lanjut.
        </p>
      </div>

      <div class="flex items-center gap-2">
        <span class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800 text-xs font-semibold">
          <HugeiconsIcon :icon="Bookmark01Icon" :size="14" :stroke-width="2" class="text-amber-500" />
          <span>{{ investorStore.watchlist.length }} Usaha</span>
        </span>
      </div>
    </div>

    <!-- Tampilan Kosong -->
    <div
      v-if="investorStore.watchlist.length === 0"
      class="p-10 bg-white dark:bg-[#141519] rounded-3xl border border-neutral-200 dark:border-neutral-800 text-center max-w-md mx-auto space-y-3"
    >
      <div class="w-12 h-12 rounded-2xl bg-neutral-100 dark:bg-neutral-800 text-neutral-400 flex items-center justify-center mx-auto">
        <HugeiconsIcon :icon="Bookmark01Icon" :size="20" :stroke-width="1.75" />
      </div>
      <div>
        <h3 class="font-heading font-bold text-base text-neutral-900 dark:text-white">
          Belum Ada Usaha Disimpan
        </h3>
        <p class="text-xs text-neutral-500 max-w-xs mx-auto mt-0.5">
          Tandai usaha menarik di katalog untuk melihatnya kembali di sini.
        </p>
      </div>
      <div class="pt-1">
        <NuxtLink to="/investor">
          <BButton variant="primary" size="sm">Buka Katalog Usaha</BButton>
        </NuxtLink>
      </div>
    </div>

    <!-- Grid Kartu Usaha Disimpan -->
    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      <div
        v-for="item in investorStore.watchlist"
        :key="item.id"
        class="bg-white dark:bg-[#18191e] rounded-3xl border border-neutral-200 dark:border-neutral-800 p-5 flex flex-col justify-between shadow-xs hover:border-primary-400 transition-all space-y-4"
      >
        <div class="space-y-3">
          <!-- Status & Hapus Bookmark -->
          <div class="flex items-center justify-between">
            <span class="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-md bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
              <HugeiconsIcon :icon="CheckmarkCircle01Icon" :size="12" :stroke-width="2" />
              <span>TERVERIFIKASI</span>
            </span>

            <button
              type="button"
              class="p-1.5 rounded-lg border bg-amber-50 text-amber-600 border-amber-300 transition-colors cursor-pointer"
              title="Hapus simpanan"
              @click="investorStore.toggleBookmark(item.id)"
            >
              <HugeiconsIcon :icon="Bookmark01Icon" :size="15" :stroke-width="1.75" />
            </button>
          </div>

          <!-- Nama & Lokasi -->
          <div>
            <NuxtLink
              :to="`/investor/umkm/${item.id}`"
              class="font-heading font-extrabold text-lg text-neutral-900 dark:text-white hover:text-primary-600 transition-colors block"
            >
              {{ item.name }}
            </NuxtLink>
            <p class="text-xs text-neutral-500 mt-0.5">
              {{ item.sector }} • {{ item.city }}
            </p>
          </div>

          <!-- 3 Angka Kunci -->
          <div class="grid grid-cols-3 gap-2 p-3 rounded-2xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 text-center">
            <div>
              <span class="text-[11px] text-neutral-500 font-medium block whitespace-nowrap">Modal</span>
              <span class="text-xs font-extrabold text-neutral-900 dark:text-white tabular-nums block mt-1 whitespace-nowrap">
                Rp {{ (item.fundingTarget / 1000000) }} Jt
              </span>
            </div>
            <div>
              <span class="text-[11px] text-neutral-500 font-medium block whitespace-nowrap">Untung</span>
              <span class="text-xs font-extrabold text-emerald-600 dark:text-emerald-400 tabular-nums block mt-1 whitespace-nowrap">
                {{ item.marginPercentage }}%
              </span>
            </div>
            <div>
              <span class="text-[11px] text-neutral-500 font-medium block whitespace-nowrap">Skor</span>
              <span class="text-xs font-extrabold text-primary-600 dark:text-primary-400 tabular-nums block mt-1 whitespace-nowrap">
                {{ item.healthScore }}/100
              </span>
            </div>
          </div>
        </div>

        <!-- Tombol Aksi Bawah -->
        <div class="pt-3 border-t border-neutral-100 dark:border-neutral-800">
          <NuxtLink
            v-if="item.accessStatus === 'APPROVED'"
            :to="`/investor/data-room/${item.id}`"
            class="w-full py-2 px-3 rounded-xl text-xs font-heading font-bold bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs inline-flex items-center justify-center gap-1.5 transition-colors"
          >
            <HugeiconsIcon :icon="FileUnlockedIcon" :size="14" :stroke-width="2" />
            <span>Buka Laporan Asli</span>
          </NuxtLink>

          <NuxtLink
            v-else-if="item.accessStatus === 'PENDING'"
            :to="`/investor/umkm/${item.id}`"
            class="w-full py-2 px-3 rounded-xl text-xs font-semibold bg-amber-50 text-amber-800 dark:bg-amber-950/50 dark:text-amber-300 border border-amber-200 dark:border-amber-800 inline-flex items-center justify-center gap-1.5 transition-colors"
          >
            <HugeiconsIcon :icon="Clock01Icon" :size="13" :stroke-width="2" class="text-amber-600" />
            <span>Menunggu Persetujuan</span>
          </NuxtLink>

          <NuxtLink
            v-else
            :to="`/investor/umkm/${item.id}`"
            class="w-full py-2 px-3 rounded-xl text-xs font-heading font-bold bg-primary-600 hover:bg-primary-700 text-white shadow-xs inline-flex items-center justify-center gap-1.5 transition-colors"
          >
            <span>Lihat Profil Usaha</span>
            <HugeiconsIcon :icon="ArrowRight01Icon" :size="13" :stroke-width="2" />
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
  ArrowRight01Icon,
  Bookmark01Icon,
  CheckmarkCircle01Icon,
  FileUnlockedIcon,
  Clock01Icon
} from '@hugeicons/core-free-icons'

definePageMeta({
  layout: 'dashboard'
})

const investorStore = useInvestorStore()
</script>
