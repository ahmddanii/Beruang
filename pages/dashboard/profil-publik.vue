<template>
  <div class="space-y-6 pb-20 font-sans text-neutral-900 dark:text-neutral-100 select-none">
    <!-- 1. Top Controls -->
    <div class="flex items-center justify-end gap-2.5 pb-2 shrink-0 flex-wrap">
      <NuxtLink
        to="/dashboard"
        class="inline-flex items-center gap-2 px-4 py-2 sm:py-2.5 rounded-xl bg-white hover:bg-neutral-100/80 dark:bg-[#18191E] dark:hover:bg-neutral-800/80 border border-neutral-200/90 hover:border-neutral-400 dark:border-neutral-800 dark:hover:border-neutral-600 text-xs sm:text-sm font-poppins font-semibold text-neutral-700 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white transition-all shadow-2xs cursor-pointer"
      >
        <HugeiconsIcon :icon="ArrowLeft02Icon" :size="16" :stroke-width="2" />
        <span>Kembali</span>
      </NuxtLink>

      <NuxtLink
        to="/investor"
        class="btn-3d-blue px-4 sm:px-5 py-2 sm:py-2.5 text-xs sm:text-sm font-poppins font-semibold shadow-xs cursor-pointer flex items-center gap-2"
      >
        <span>Buka Katalog Investor</span>
        <HugeiconsIcon :icon="ArrowUpRight01Icon" :size="15" :stroke-width="2.2" />
      </NuxtLink>
    </div>

    <!-- 2. Editorial Header Banner (GoPay Tactile Card) -->
    <div class="rounded-3xl card-tactile-gopay p-6 sm:p-7 relative overflow-hidden border border-neutral-200/80 dark:border-neutral-800/80 bg-white dark:bg-[#13161F]">
      <!-- Background Ambient Glow -->
      <div class="absolute -right-16 -top-16 w-56 h-56 rounded-full bg-[#2091AA]/10 dark:bg-[#2091AA]/15 blur-3xl pointer-events-none" />
      <div class="absolute right-36 -bottom-16 w-48 h-48 rounded-full bg-[#00AA13]/10 dark:bg-[#00AA13]/10 blur-3xl pointer-events-none" />

      <div class="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div class="space-y-2 max-w-2xl">
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E6F4F7] dark:bg-[#2091AA]/20 text-[#2091AA] dark:text-[#50AABF] text-xs font-poppins font-semibold border border-[#2091AA]/20 dark:border-[#50AABF]/30">
            <HugeiconsIcon :icon="Store01Icon" :size="14" :stroke-width="2" />
            <span>Katalog Publik Terakreditasi Beruang</span>
          </div>

          <h1 class="text-2xl sm:text-3xl font-heading font-bold text-neutral-900 dark:text-white tracking-tight">
            Pratinjau Toko Publik di Hadapan Investor
          </h1>

          <p class="text-sm sm:text-[15px] text-neutral-600 dark:text-neutral-300 font-sans leading-relaxed">
            Inilah tampilan kartu profil usahamu yang dilihat oleh sindikasi investor terakreditasi di marketplace. Seluruh nominal angka kas riil tokomu terlindungi secara privat; hanya rasio efisiensi, margin untung, dan skor kesiapan yang ditampilkan ke publik.
          </p>
        </div>

        <!-- Right Quick Stat Pills -->
        <div class="grid grid-cols-2 gap-3 shrink-0">
          <div class="p-3.5 sm:p-4 rounded-2xl bg-neutral-50/80 dark:bg-[#18191E] border border-neutral-200/70 dark:border-neutral-800 flex flex-col justify-center min-w-[140px]">
            <span class="text-xs text-neutral-500 dark:text-neutral-400 font-medium">Status Publikasi</span>
            <div class="flex items-center gap-1.5 mt-1">
              <span class="w-2 h-2 rounded-full bg-[#00AA13] animate-pulse" />
              <span class="font-poppins font-bold text-sm sm:text-base text-neutral-900 dark:text-white">
                Aktif Tayang
              </span>
            </div>
            <span class="text-[11px] text-neutral-400 mt-0.5">
              Siap Pendanaan
            </span>
          </div>

          <div class="p-3.5 sm:p-4 rounded-2xl bg-neutral-50/80 dark:bg-[#18191E] border border-neutral-200/70 dark:border-neutral-800 flex flex-col justify-center min-w-[140px]">
            <span class="text-xs text-neutral-500 dark:text-neutral-400 font-medium">Proteksi Kas</span>
            <span class="font-poppins font-bold text-sm sm:text-base text-[#2091AA] dark:text-[#50AABF] mt-1">
              Privasi Aktif
            </span>
            <span class="text-[11px] text-[#00AA13] font-medium mt-0.5">
              ✓ Watermark Digital
            </span>
          </div>
        </div>
      </div>
    </div>

    <!-- 3. Security & Privacy Notice Banner -->
    <div class="p-4 sm:p-5 rounded-2xl bg-blue-50/70 dark:bg-blue-950/30 border border-blue-200/70 dark:border-blue-900/40 flex items-start gap-3.5">
      <HugeiconsIcon :icon="Shield02Icon" :size="22" class="text-[#2091AA] dark:text-[#50AABF] shrink-0 mt-0.5" />
      <div class="space-y-0.5 text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed font-sans">
        <p class="font-poppins font-bold text-neutral-900 dark:text-white">Perlindungan Privasi Keuangan Toko</p>
        <p>Sesuai standar privasi Beruang, nominal saldo kas riil (dalam Rupiah) tidak pernah dibuka secara bebas. Investor yang ingin memeriksa mutasi rekening koran wajib mengajukan izin akses privat terlebih dahulu dan Anda berhak menyetujui atau menolaknya.</p>
      </div>
    </div>

    <!-- 4. Marketplace Card Mockup Display (Centered Tactile Frame) -->
    <div class="max-w-2xl mx-auto space-y-4">
      <div class="flex items-center justify-between text-xs font-poppins px-1">
        <span class="text-neutral-500 font-medium">Pratinjau Kartu Marketplace (Mode Terverifikasi):</span>
        <button
          type="button"
          class="text-[#2091AA] dark:text-[#50AABF] hover:underline font-semibold cursor-pointer"
          @click="handleCopyLink"
        >
          Salin Tautan Profil Publik
        </button>
      </div>

      <div class="card-tactile-gopay rounded-3xl p-6 sm:p-8 border border-neutral-200 dark:border-neutral-800 space-y-6 shadow-sm">
        <!-- Top Profile Row -->
        <div class="flex items-start justify-between gap-4">
          <div class="flex items-center gap-3.5">
            <div class="w-14 h-14 rounded-2xl bg-white p-2 shadow-xs border border-neutral-200/80 shrink-0 flex items-center justify-center">
              <img src="/logo.svg" alt="Logo Usaha" class="w-full h-full object-contain" />
            </div>
            <div>
              <span class="text-[11px] font-mono font-bold text-neutral-400">ID TOKO: BERU-KOP-01</span>
              <h3 class="font-poppins font-bold text-xl sm:text-2xl text-neutral-900 dark:text-white leading-tight">
                {{ umkmStore.profile.name }}
              </h3>
              <p class="text-xs sm:text-sm text-neutral-500 font-medium mt-0.5">
                {{ umkmStore.profile.sector }} • {{ umkmStore.profile.city }}
              </p>
            </div>
          </div>

          <span class="inline-flex items-center gap-1.5 text-xs font-poppins font-bold px-3 py-1 rounded-full bg-emerald-50 text-[#00AA13] border border-emerald-200 shrink-0">
            <HugeiconsIcon :icon="CheckmarkCircle01Icon" :size="14" :stroke-width="2" />
            <span>Terverifikasi OSS</span>
          </span>
        </div>

        <!-- Pitch Summary Bubble -->
        <div class="p-4 rounded-xl bg-neutral-50 dark:bg-[#18191E] border border-neutral-200/70 dark:border-neutral-800 text-xs sm:text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed italic font-sans">
          "{{ umkmStore.profile.pitchSummary }}"
        </div>

        <!-- Key Financial Metrics Grid -->
        <div class="grid grid-cols-3 gap-3.5 text-center font-poppins">
          <div class="p-4 rounded-2xl bg-neutral-50/80 dark:bg-[#18191E] border border-neutral-200/80 dark:border-neutral-800">
            <span class="text-xs text-neutral-500 block font-medium">Margin Untung</span>
            <span class="font-bold text-lg sm:text-xl text-[#00AA13] dark:text-emerald-400 tabular-nums mt-1 block">48.5%</span>
          </div>
          <div class="p-4 rounded-2xl bg-neutral-50/80 dark:bg-[#18191E] border border-neutral-200/80 dark:border-neutral-800">
            <span class="text-xs text-neutral-500 block font-medium">Pertumbuhan</span>
            <span class="font-bold text-lg sm:text-xl text-[#2091AA] dark:text-[#50AABF] tabular-nums mt-1 block">+34.2%</span>
          </div>
          <div class="p-4 rounded-2xl bg-neutral-50/80 dark:bg-[#18191E] border border-neutral-200/80 dark:border-neutral-800">
            <span class="text-xs text-neutral-500 block font-medium">Skor Bisnis</span>
            <span class="font-bold text-lg sm:text-xl text-neutral-900 dark:text-white tabular-nums mt-1 block">79/100</span>
          </div>
        </div>

        <!-- Consultant Verification & Action Footer -->
        <div class="pt-4 border-t border-neutral-100 dark:border-neutral-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-poppins">
          <div class="flex items-center gap-1.5 text-neutral-500">
            <span>Konsultan Pendamping:</span>
            <strong class="text-neutral-900 dark:text-white font-semibold">{{ umkmStore.profile.consultantName }}</strong>
          </div>

          <NuxtLink
            to="/investor"
            class="font-semibold text-[#2091AA] dark:text-[#50AABF] hover:underline flex items-center gap-1 group/katalog"
          >
            <span>Buka di Katalog Marketplace</span>
            <span class="transition-transform group-hover/katalog:translate-x-0.5">→</span>
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useUmkmStore } from '~/stores/umkm'
import { HugeiconsIcon } from '@hugeicons/vue'
import {
  Home03Icon,
  Store01Icon,
  Shield02Icon,
  CheckmarkCircle01Icon,
  ArrowLeft02Icon,
  ArrowUpRight01Icon
} from '@hugeicons/core-free-icons'

definePageMeta({
  layout: 'dashboard'
})

const umkmStore = useUmkmStore()

function handleCopyLink() {
  if (typeof navigator !== 'undefined' && navigator.clipboard) {
    navigator.clipboard.writeText(window.location.origin + '/investor')
    alert('Tautan profil publik berhasil disalin ke papan klip!')
  }
}
</script>
