<template>
  <div class="space-y-6 pb-20 font-poppins text-neutral-900 dark:text-neutral-100">
    <!-- Toast Feedback Notification -->
    <Transition
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="opacity-0 -translate-y-2 scale-95"
      enter-to-class="opacity-100 translate-y-0 scale-100"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="opacity-100 translate-y-0 scale-100"
      leave-to-class="opacity-0 -translate-y-2 scale-95"
    >
      <div
        v-if="toastMessage"
        class="fixed top-6 left-1/2 -translate-x-1/2 z-50 px-4 py-2.5 rounded-full bg-neutral-900/90 dark:bg-neutral-800/90 text-white border border-neutral-700/60 backdrop-blur-md text-xs font-poppins font-semibold shadow-xl flex items-center gap-2 pointer-events-none"
      >
        <HugeiconsIcon :icon="CheckmarkCircle01Icon" :size="16" class="text-emerald-400 shrink-0" />
        <span>{{ toastMessage }}</span>
      </div>
    </Transition>

    <!-- 1. Top Header: Title on Left & Action Control on Right -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 min-h-[44px]">
      <div class="flex items-center gap-3">
        <div class="w-11 h-11 rounded-2xl bg-amber-50 dark:bg-amber-950/40 flex items-center justify-center text-amber-500 shrink-0 border border-amber-200 dark:border-amber-800">
          <HugeiconsIcon
            :icon="StarIcon"
            :size="24"
            :stroke-width="2.2"
            class="fill-amber-400"
          />
        </div>
        <div>
          <h1 class="font-poppins font-semibold text-2xl sm:text-3xl text-neutral-900 dark:text-white tracking-tight leading-tight">
            Portofolio Pantau
          </h1>
          <p class="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 mt-0.5">
            Daftar UMKM terakreditasi yang Anda simpan untuk uji tuntas dan permohonan akses data room
          </p>
        </div>
      </div>

      <div class="flex items-center gap-2.5 shrink-0">
        <BActionButton
          to="/investor"
          variant="default"
          :huge-icon="ArrowLeft01Icon"
        >
          Kembali ke Katalog
        </BActionButton>
      </div>
    </div>

    <!-- Empty State if empty -->
    <div
      v-if="investorStore.watchlist.length === 0"
      class="card-tactile-gopay rounded-2xl p-12 sm:p-16 border text-center max-w-lg mx-auto space-y-4"
    >
      <div class="w-14 h-14 rounded-full bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-amber-500 flex items-center justify-center mx-auto">
        <HugeiconsIcon :icon="StarIcon" :size="24" :stroke-width="1.8" />
      </div>
      <div>
        <h3 class="font-poppins font-bold text-base text-neutral-900 dark:text-white">
          Belum Ada Bisnis Tersimpan
        </h3>
        <p class="text-xs text-neutral-500 dark:text-neutral-400 max-w-sm mx-auto mt-1 leading-relaxed font-sans">
          Jelajahi Venture Social Feed dan klik ikon bintang pada kartu UMKM untuk menyimpan bisnis potensial ke daftar pantau Anda.
        </p>
      </div>
      <div class="pt-2">
        <NuxtLink
          to="/investor"
          class="btn-pill-action group cursor-pointer inline-flex items-center gap-2"
        >
          <span>Eksplorasi Feed UMKM</span>
          <HugeiconsIcon :icon="ArrowRight01Icon" :size="15" :stroke-width="2.2" />
        </NuxtLink>
      </div>
    </div>

    <!-- Watchlist Grid -->
    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div
        v-for="item in investorStore.watchlist"
        :key="item.id"
        class="card-tactile-gopay rounded-2xl p-5 sm:p-6 border flex flex-col justify-between hover:border-neutral-300 dark:hover:border-neutral-700 transition-all font-poppins space-y-4.5 group"
      >
        <div class="space-y-4">
          <!-- Top Row: Code Pill, Badge & Star Toggle -->
          <div class="flex items-start justify-between gap-2">
            <div class="flex flex-wrap items-center gap-1.5">
              <span class="text-[10px] font-mono font-bold px-2 py-0.5 rounded-md bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 border border-neutral-200 dark:border-neutral-700">
                {{ item.code }}
              </span>
              <span class="inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-md bg-emerald-50 dark:bg-emerald-950/60 text-[#00AA13] dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800">
                <HugeiconsIcon :icon="CheckmarkCircle01Icon" :size="11" :stroke-width="2.5" />
                <span>Ready for Funding</span>
              </span>
            </div>

            <!-- Remove from Watchlist -->
            <button
              type="button"
              class="p-1.5 rounded-lg text-amber-500 bg-amber-50 dark:bg-amber-950/60 hover:bg-amber-100 dark:hover:bg-amber-900/60 transition-colors cursor-pointer"
              title="Hapus dari Simpanan"
              @click="removeFromWatchlist(item)"
            >
              <HugeiconsIcon :icon="StarIcon" :size="17" :stroke-width="2" class="fill-amber-400 text-amber-500" />
            </button>
          </div>

          <!-- Store Identity & Location -->
          <div>
            <h3 class="font-poppins font-bold text-lg text-neutral-900 dark:text-white group-hover:text-[#2091AA] transition-colors leading-tight">
              {{ item.name }}
            </h3>
            <p class="text-xs text-neutral-500 dark:text-neutral-400 mt-1 flex items-center gap-2">
              <span>{{ item.sector }}</span>
              <span>•</span>
              <span class="flex items-center gap-1">
                <HugeiconsIcon :icon="Location01Icon" :size="12" />
                {{ item.city }}
              </span>
            </p>
          </div>

          <!-- Pitch Summary -->
          <p class="text-xs text-neutral-600 dark:text-neutral-300 line-clamp-2 leading-relaxed font-sans">
            "{{ item.pitchSummary }}"
          </p>

          <!-- Key Metrics Bento Grid -->
          <div class="grid grid-cols-2 gap-2 p-3 rounded-xl bg-neutral-100/80 dark:bg-neutral-800/60 border border-neutral-200/60 dark:border-neutral-700/60 text-center font-poppins">
            <div>
              <span class="text-[10px] text-neutral-500 dark:text-neutral-400 block font-medium">Margin Kotor</span>
              <span class="font-poppins font-bold text-sm text-emerald-600 dark:text-emerald-400 tabular-nums">
                {{ item.marginPercentage }}%
              </span>
            </div>
            <div>
              <span class="text-[10px] text-neutral-500 dark:text-neutral-400 block font-medium">Skor Audit BNSP</span>
              <span class="font-poppins font-bold text-sm text-[#2091AA] dark:text-[#50AABF] tabular-nums">
                {{ item.healthScore }}/100
              </span>
            </div>
          </div>

          <!-- Status Akses Data Room Indicator -->
          <div class="p-2.5 rounded-xl bg-neutral-50 dark:bg-[#18191E] border border-neutral-200/60 dark:border-neutral-700/60 flex items-center justify-between text-xs">
            <span class="text-neutral-500 text-[11px]">Status Akses Data:</span>
            <span
              v-if="item.accessStatus === 'APPROVED'"
              class="font-bold text-[#00AA13] flex items-center gap-1 text-[11px]"
            >
              <HugeiconsIcon :icon="CheckmarkCircle01Icon" :size="12" />
              <span>Izin Aktif</span>
            </span>
            <span
              v-else-if="item.accessStatus === 'PENDING'"
              class="font-medium text-amber-600 dark:text-amber-400 flex items-center gap-1 text-[11px]"
            >
              <HugeiconsIcon :icon="Clock01Icon" :size="12" />
              <span>Menunggu UMKM</span>
            </span>
            <span
              v-else
              class="font-medium text-neutral-500 text-[11px]"
            >
              Belum Diajukan
            </span>
          </div>
        </div>

        <!-- Footer Actions -->
        <div class="pt-4 border-t border-neutral-100 dark:border-neutral-800/80 flex items-center justify-between gap-3">
          <NuxtLink
            :to="`/investor/umkm/${item.id}`"
            class="text-xs text-neutral-600 dark:text-neutral-300 font-semibold hover:text-[#2091AA] transition-colors"
          >
            Lihat Profil
          </NuxtLink>

          <NuxtLink
            v-if="item.accessStatus === 'APPROVED'"
            :to="`/investor/data-room/${item.id}`"
            class="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold bg-[#00AA13] hover:bg-[#009210] text-white shadow-xs transition-all cursor-pointer"
          >
            <HugeiconsIcon :icon="FileUnlockedIcon" :size="14" :stroke-width="2" />
            <span>Data Room</span>
          </NuxtLink>

          <div
            v-else-if="item.accessStatus === 'PENDING'"
            class="text-[11px] font-medium text-neutral-500 bg-neutral-100 dark:bg-neutral-800 px-2.5 py-1 rounded-lg"
          >
            Proses Review
          </div>

          <NuxtLink
            v-else
            :to="`/investor/umkm/${item.id}/ajukan-akses`"
            class="btn-pill-action group cursor-pointer inline-flex items-center gap-1.5 text-xs py-1 px-3"
          >
            <span>Ajukan Akses</span>
            <HugeiconsIcon :icon="ArrowRight01Icon" :size="13" :stroke-width="2" />
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useInvestorStore, type MarketplaceUmkm } from '~/stores/investor'
import BActionButton from '~/components/base/BActionButton.vue'
import { HugeiconsIcon } from '@hugeicons/vue'
import {
  ArrowLeft01Icon,
  ArrowRight01Icon,
  StarIcon,
  FileUnlockedIcon,
  CheckmarkCircle01Icon,
  Location01Icon,
  Clock01Icon
} from '@hugeicons/core-free-icons'

definePageMeta({
  layout: 'dashboard',
  hideHeader: true
})

const investorStore = useInvestorStore()

// Toast State
const toastMessage = ref('')
let toastTimer: any = null

function triggerToast(msg: string) {
  toastMessage.value = msg
  if (toastTimer) clearTimeout(toastTimer)
  toastTimer = setTimeout(() => {
    toastMessage.value = ''
  }, 2500)
}

function removeFromWatchlist(item: MarketplaceUmkm) {
  investorStore.toggleBookmark(item.id)
  triggerToast(`${item.name} dihapus dari Portofolio Pantau.`)
}
</script>
