<template>
  <div class="space-y-6 pb-20 font-sans">
    <!-- 1. HEADER RINGKAS -->
    <div class="bg-white dark:bg-[#141519] rounded-3xl border border-neutral-200 dark:border-neutral-800 p-6 sm:p-8 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <h1 class="text-2xl sm:text-3xl font-heading font-extrabold text-neutral-900 dark:text-white tracking-tight">
          Pilihan Usaha Siap Kerja Sama
        </h1>
        <p class="text-xs sm:text-sm text-neutral-500 mt-1">
          Daftar usaha nyata yang sudah diperiksa keuangannya oleh konsultan resmi.
        </p>
      </div>

      <NuxtLink
        to="/investor/watchlist"
        class="px-4 py-2.5 rounded-2xl font-heading font-bold text-xs sm:text-sm border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-700 text-neutral-800 dark:text-neutral-200 shadow-xs transition-all inline-flex items-center gap-2 self-start sm:self-auto"
      >
        <span>Usaha Disimpan</span>
        <span class="w-6 h-6 rounded-full bg-amber-100 dark:bg-amber-900/60 text-amber-700 dark:text-amber-300 flex items-center justify-center font-bold text-xs">
          {{ investorStore.watchlist.length }}
        </span>
      </NuxtLink>
    </div>

    <!-- 2. PENCARIAN & SARINGAN CEPAT -->
    <div class="bg-white dark:bg-[#141519] rounded-3xl border border-neutral-200 dark:border-neutral-800 p-5 sm:p-6 shadow-xs space-y-4">
      <div class="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
        <!-- Pencarian -->
        <div class="relative flex-1">
          <div class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-400">
            <HugeiconsIcon :icon="Search01Icon" :size="16" :stroke-width="1.75" />
          </div>
          <input
            v-model="investorStore.searchQuery"
            type="text"
            placeholder="Cari nama usaha, jenis makanan, kopi, atau kota..."
            class="w-full pl-10 pr-9 py-2.5 rounded-xl text-xs sm:text-sm border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-900 text-neutral-900 dark:text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
          <button
            v-if="investorStore.searchQuery"
            type="button"
            class="absolute inset-y-0 right-0 pr-3 flex items-center text-neutral-400 hover:text-neutral-600 cursor-pointer text-xs"
            @click="investorStore.searchQuery = ''"
          >
            ✕
          </button>
        </div>

        <!-- Tombol Reset jika filter aktif -->
        <button
          v-if="hasActiveFilters"
          type="button"
          class="text-xs text-danger hover:underline font-bold px-2 py-1 cursor-pointer shrink-0"
          @click="investorStore.resetFilters()"
        >
          Hapus Saringan
        </button>
      </div>

      <!-- Saringan Dropdown Sederhana (Sesuai US-INV-01: Sektor, Modal, Untung) -->
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
        <select
          v-model="investorStore.selectedSector"
          class="w-full px-3 py-2 rounded-xl text-xs bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 text-neutral-800 dark:text-neutral-200 focus:outline-none focus:ring-1 focus:ring-primary-500 cursor-pointer"
        >
          <option value="ALL">Semua Bidang Usaha</option>
          <option v-for="sec in investorStore.sectorsList" :key="sec" :value="sec">
            {{ sec }}
          </option>
        </select>

        <select
          v-model="investorStore.fundingRange"
          class="w-full px-3 py-2 rounded-xl text-xs bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 text-neutral-800 dark:text-neutral-200 focus:outline-none focus:ring-1 focus:ring-primary-500 cursor-pointer"
        >
          <option value="ALL">Semua Kebutuhan Modal</option>
          <option value="UNDER_200M">Di bawah 200 Juta</option>
          <option value="200M_400M">200 - 400 Juta</option>
          <option value="OVER_400M">Di atas 400 Juta</option>
        </select>

        <select
          v-model.number="investorStore.minMargin"
          class="w-full px-3 py-2 rounded-xl text-xs bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 text-neutral-800 dark:text-neutral-200 focus:outline-none focus:ring-1 focus:ring-primary-500 cursor-pointer"
        >
          <option :value="0">Semua Persen Untung</option>
          <option :value="40">Untung ≥ 40%</option>
          <option :value="45">Untung ≥ 45%</option>
          <option :value="50">Untung ≥ 50%</option>
        </select>
      </div>
    </div>

    <!-- 3. GRID KARTU USAHA -->
    <div
      v-if="investorStore.filteredMarketplace.length > 0"
      class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
    >
      <div
        v-for="item in investorStore.filteredMarketplace"
        :key="item.id"
        class="bg-white dark:bg-[#18191e] rounded-3xl border border-neutral-200 dark:border-neutral-800 p-5 flex flex-col justify-between shadow-xs hover:border-primary-400 transition-all space-y-4"
      >
        <div class="space-y-3">
          <!-- Status & Bookmark -->
          <div class="flex items-center justify-between">
            <span class="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-md bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
              <HugeiconsIcon :icon="CheckmarkCircle01Icon" :size="12" :stroke-width="2" />
              <span>TERVERIFIKASI</span>
            </span>

            <button
              type="button"
              :class="[
                'p-1.5 rounded-lg border transition-colors cursor-pointer',
                item.bookmarked
                  ? 'bg-amber-50 text-amber-600 border-amber-300'
                  : 'text-neutral-400 border-neutral-200 dark:border-neutral-700 hover:text-neutral-600'
              ]"
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

    <!-- Kosong -->
    <div
      v-else
      class="p-8 rounded-2xl bg-neutral-50 dark:bg-neutral-900 text-center space-y-2 border border-neutral-200 dark:border-neutral-800"
    >
      <p class="text-xs sm:text-sm text-neutral-500">
        Tidak ada usaha yang sesuai kriteria.
      </p>
      <button
        type="button"
        class="text-xs font-bold text-primary-600 hover:underline cursor-pointer"
        @click="investorStore.resetFilters()"
      >
        Tampilkan Semua Usaha
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useInvestorStore } from '~/stores/investor'
import { HugeiconsIcon } from '@hugeicons/vue'
import {
  Bookmark01Icon,
  Search01Icon,
  CheckmarkCircle01Icon,
  ArrowRight01Icon,
  FileUnlockedIcon,
  Clock01Icon
} from '@hugeicons/core-free-icons'

definePageMeta({
  layout: 'dashboard'
})

const investorStore = useInvestorStore()

const hasActiveFilters = computed(() => {
  return (
    investorStore.searchQuery !== '' ||
    investorStore.selectedSector !== 'ALL' ||
    investorStore.fundingRange !== 'ALL' ||
    investorStore.minMargin > 0
  )
})
</script>
