<template>
  <div class="space-y-6 pb-20 max-w-4xl font-sans text-neutral-900 dark:text-neutral-100 select-none">
    <!-- 1. Top Page Controls -->
    <div class="flex items-center justify-end gap-2.5 pb-2 shrink-0 flex-wrap">
      <NuxtLink
        to="/dashboard"
        class="inline-flex items-center gap-2 px-4 py-2 sm:py-2.5 rounded-xl bg-white hover:bg-neutral-100/80 dark:bg-[#18191E] dark:hover:bg-neutral-800/80 border border-neutral-200/90 hover:border-neutral-400 dark:border-neutral-800 dark:hover:border-neutral-600 text-xs sm:text-sm font-poppins font-semibold text-neutral-700 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white transition-all shadow-2xs active:scale-95 cursor-pointer"
      >
        <HugeiconsIcon :icon="ArrowLeft02Icon" :size="16" :stroke-width="2" />
        <span>Kembali</span>
      </NuxtLink>

      <button
        type="button"
        class="btn-3d-blue px-5 py-2 sm:py-2.5 text-xs sm:text-sm font-poppins font-semibold shadow-xs active:scale-95 cursor-pointer"
        @click="handleSave"
      >
        <HugeiconsIcon :icon="CheckmarkCircle01Icon" :size="16" :stroke-width="2.2" />
        <span>Simpan Pengaturan</span>
      </button>
    </div>

    <!-- 2. Editorial Header Banner (GoPay Tactile Card) -->
    <div class="rounded-3xl card-tactile-gopay p-6 sm:p-7 relative overflow-hidden border border-neutral-200/80 dark:border-neutral-800/80 bg-white dark:bg-[#13161F]">
      <!-- Background Ambient Glow -->
      <div class="absolute -right-16 -top-16 w-56 h-56 rounded-full bg-[#2091AA]/10 dark:bg-[#2091AA]/15 blur-3xl pointer-events-none" />
      <div class="absolute right-36 -bottom-16 w-48 h-48 rounded-full bg-[#00AA13]/10 dark:bg-[#00AA13]/10 blur-3xl pointer-events-none" />

      <div class="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div class="space-y-2 max-w-2xl">
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E6F4F7] dark:bg-[#2091AA]/20 text-[#2091AA] dark:text-[#50AABF] text-xs font-poppins font-semibold border border-[#2091AA]/20 dark:border-[#50AABF]/30">
            <HugeiconsIcon :icon="Settings01Icon" :size="14" :stroke-width="2" />
            <span>Pusat Kendali Profil & Keamanan Akun</span>
          </div>

          <h1 class="text-2xl sm:text-3xl font-heading font-bold text-neutral-900 dark:text-white tracking-tight">
            Pengaturan Akun & Preferensi Toko
          </h1>

          <p class="text-sm sm:text-[15px] text-neutral-600 dark:text-neutral-300 font-sans leading-relaxed">
            Kelola rincian identitas toko, kontak resmi pemilik, serta preferensi notifikasi pengingat pembukuan kas dan tawaran investor baru.
          </p>
        </div>
      </div>
    </div>

    <!-- Alert Save Success -->
    <div
      v-if="saved"
      class="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-xs sm:text-sm font-poppins font-semibold text-emerald-800 dark:text-emerald-300 flex items-center gap-2 animate-in fade-in"
    >
      <HugeiconsIcon :icon="CheckmarkCircle01Icon" :size="18" class="text-[#00AA13]" />
      <span>Perubahan berhasil disimpan! Data profil dan preferensi telah diperbarui.</span>
    </div>

    <form @submit.prevent="handleSave" class="space-y-6">
      <!-- Section 1: Informasi Usaha (Card Tactile GoPay) -->
      <div class="card-tactile-gopay rounded-2xl p-6 sm:p-7 space-y-5 border">
        <div class="pb-3 border-b border-neutral-100 dark:border-neutral-800/80">
          <h2 class="font-poppins font-bold text-base sm:text-lg text-neutral-900 dark:text-white">
            Informasi Usaha & Kontak
          </h2>
          <p class="text-xs text-neutral-500 font-sans mt-0.5">
            Data pokok toko yang digunakan dalam komunikasi resmi platform dan mitra konsultan.
          </p>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-5 font-poppins">
          <div>
            <label class="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1.5">
              Nama Usaha / Brand
            </label>
            <input
              v-model="umkmStore.profile.name"
              type="text"
              class="w-full px-4 py-2.5 rounded-xl border border-neutral-200/90 dark:border-neutral-700/80 bg-neutral-50 dark:bg-[#18191E] text-sm text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#2091AA]/30 transition-all"
            />
          </div>

          <div>
            <label class="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1.5">
              Nama Pemilik
            </label>
            <input
              v-model="umkmStore.profile.ownerName"
              type="text"
              class="w-full px-4 py-2.5 rounded-xl border border-neutral-200/90 dark:border-neutral-700/80 bg-neutral-50 dark:bg-[#18191E] text-sm text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#2091AA]/30 transition-all"
            />
          </div>

          <div>
            <label class="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1.5">
              Sektor Usaha
            </label>
            <input
              v-model="umkmStore.profile.sector"
              type="text"
              class="w-full px-4 py-2.5 rounded-xl border border-neutral-200/90 dark:border-neutral-700/80 bg-neutral-50 dark:bg-[#18191E] text-sm text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#2091AA]/30 transition-all"
            />
          </div>

          <div>
            <label class="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1.5">
              Kota / Wilayah Operasional
            </label>
            <input
              v-model="umkmStore.profile.city"
              type="text"
              class="w-full px-4 py-2.5 rounded-xl border border-neutral-200/90 dark:border-neutral-700/80 bg-neutral-50 dark:bg-[#18191E] text-sm text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#2091AA]/30 transition-all"
            />
          </div>

          <div class="sm:col-span-2">
            <label class="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1.5">
              Ringkasan Narasi Bisnis (Pitch Singkat)
            </label>
            <textarea
              v-model="umkmStore.profile.pitchSummary"
              rows="3"
              class="w-full px-4 py-2.5 rounded-xl border border-neutral-200/90 dark:border-neutral-700/80 bg-neutral-50 dark:bg-[#18191E] text-sm text-neutral-900 dark:text-white leading-relaxed focus:outline-none focus:ring-2 focus:ring-[#2091AA]/30 transition-all resize-none"
            />
          </div>
        </div>
      </div>

      <!-- Section 2: Preferensi Notifikasi & Peringatan (Card Tactile GoPay) -->
      <div class="card-tactile-gopay rounded-2xl p-6 sm:p-7 space-y-5 border">
        <div class="pb-3 border-b border-neutral-100 dark:border-neutral-800/80">
          <h2 class="font-poppins font-bold text-base sm:text-lg text-neutral-900 dark:text-white">
            Preferensi Notifikasi & Pemberitahuan
          </h2>
          <p class="text-xs text-neutral-500 font-sans mt-0.5">
            Atur jalur notifikasi penting untuk transaksi dan pembaruan kesiapan tokomu.
          </p>
        </div>

        <div class="space-y-4 font-poppins">
          <label class="p-3.5 rounded-xl bg-neutral-50 dark:bg-[#18191E] border border-neutral-200/70 dark:border-neutral-800 flex items-center justify-between cursor-pointer select-none group">
            <div class="flex items-center gap-3">
              <HugeiconsIcon :icon="Notification01Icon" :size="20" class="text-[#2091AA] dark:text-[#50AABF] shrink-0" />
              <div>
                <span class="text-xs sm:text-sm font-semibold text-neutral-900 dark:text-white block">
                  Pengingat Tanggal Pelaporan Kas Bulanan
                </span>
                <span class="text-[11px] text-neutral-500 font-normal">
                  Kirimkan notifikasi setiap tanggal 5 untuk rekonsiliasi kas bersama konsultan
                </span>
              </div>
            </div>
            <input
              v-model="notifyWhatsApp"
              type="checkbox"
              class="w-5 h-5 rounded-md accent-[#2091AA] cursor-pointer"
            />
          </label>

          <label class="p-3.5 rounded-xl bg-neutral-50 dark:bg-[#18191E] border border-neutral-200/70 dark:border-neutral-800 flex items-center justify-between cursor-pointer select-none group">
            <div class="flex items-center gap-3">
              <HugeiconsIcon :icon="UserGroupIcon" :size="20" class="text-[#00AA13] shrink-0" />
              <div>
                <span class="text-xs sm:text-sm font-semibold text-neutral-900 dark:text-white block">
                  Pemberitahuan Permintaan Investor Baru
                </span>
                <span class="text-[11px] text-neutral-500 font-normal">
                  Beritahu segera saat ada investor terakreditasi mengajukan izin data room
                </span>
              </div>
            </div>
            <input
              v-model="notifyInvestorRequests"
              type="checkbox"
              class="w-5 h-5 rounded-md accent-[#00AA13] cursor-pointer"
            />
          </label>
        </div>
      </div>

      <div class="flex justify-end gap-3 pt-2">
        <button
          type="submit"
          class="btn-3d-blue px-6 py-2.5 text-xs sm:text-sm font-poppins font-semibold shadow-xs active:scale-95 cursor-pointer"
        >
          Simpan Seluruh Pengaturan
        </button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useUmkmStore } from '~/stores/umkm'
import { HugeiconsIcon } from '@hugeicons/vue'
import {
  Home03Icon,
  Settings01Icon,
  Notification01Icon,
  UserGroupIcon,
  CheckmarkCircle01Icon,
  ArrowLeft02Icon
} from '@hugeicons/core-free-icons'

definePageMeta({
  layout: 'dashboard'
})

const umkmStore = useUmkmStore()

const saved = ref(false)
const notifyWhatsApp = ref(true)
const notifyInvestorRequests = ref(true)

function handleSave() {
  umkmStore.updateQuickProfile(umkmStore.profile.name, umkmStore.profile.pitchSummary)
  saved.value = true
  setTimeout(() => {
    saved.value = false
  }, 2500)
}
</script>
