<template>
  <div class="space-y-6 sm:space-y-8 pb-16 font-sans max-w-4xl text-left">
    <!-- Header -->
    <div class="p-1.5 sm:p-2 rounded-3xl bg-neutral-200/50 dark:bg-neutral-800/40 border border-neutral-300/40 dark:border-neutral-700/30 shadow-xs">
      <div class="p-6 sm:p-8 rounded-[calc(1.5rem-0.25rem)] bg-white dark:bg-[#13161F] border border-neutral-200/80 dark:border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div class="space-y-1">
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0081A0]/10 text-[#0081A0] dark:text-[#2091AA] text-xs font-bold border border-[#0081A0]/20 mb-1">
            <span>Preferensi & Akun</span>
          </div>
          <h1 class="text-2xl sm:text-3xl font-heading font-extrabold text-neutral-900 dark:text-white tracking-tight">
            Pengaturan Konsultan
          </h1>
          <p class="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400">
            Kelola preferensi pendampingan, ketersediaan bimbingan, dan notifikasi permohonan UMKM.
          </p>
        </div>

        <NuxtLink to="/konsultan/profil">
          <button
            type="button"
            class="px-4 py-2.5 rounded-xl bg-[#0081A0] hover:bg-[#006D87] text-white font-heading font-bold text-xs shadow-md transition-all active:scale-95 flex items-center gap-2 cursor-pointer"
          >
            <HugeiconsIcon :icon="UserCircleIcon" :size="16" :stroke-width="2" />
            <span>Kelola Profil & Dokumen</span>
          </button>
        </NuxtLink>
      </div>
    </div>

    <!-- Banner Link ke Profil & Dokumen -->
    <div class="card-tactile-gopay p-6 rounded-3xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
      <div class="flex items-center gap-4">
        <div class="w-12 h-12 rounded-2xl bg-[#00AA13]/10 text-[#00AA13] dark:text-[#22C55E] flex items-center justify-center shrink-0">
          <HugeiconsIcon :icon="Award01Icon" :size="24" :stroke-width="2" />
        </div>
        <div>
          <h3 class="font-heading font-bold text-sm sm:text-base text-neutral-900 dark:text-white">
            Kelengkapan Profil & Sertifikat Lisensi: {{ konsultanStore.profileCompleteness }}%
          </h3>
          <p class="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
            Unggah lisensi BNSP dan portofolio bimbingan agar UMKM semakin percaya memilihmu.
          </p>
        </div>
      </div>

      <NuxtLink to="/konsultan/profil">
        <button
          type="button"
          class="px-4 py-2 rounded-xl border border-neutral-300 dark:border-white/10 hover:bg-neutral-100 dark:hover:bg-neutral-800 text-xs font-bold text-neutral-800 dark:text-neutral-200 transition-colors cursor-pointer"
        >
          Buka Kelola Dokumen →
        </button>
      </NuxtLink>
    </div>

    <!-- Ketersediaan Penerimaan Bimbingan -->
    <div class="card-tactile-gopay p-6 sm:p-8 rounded-3xl space-y-5">
      <h3 class="font-heading font-bold text-base sm:text-lg text-neutral-900 dark:text-white border-b border-neutral-200/80 dark:border-white/10 pb-3">
        Ketersediaan Bimbingan Klien Baru
      </h3>

      <div class="flex items-center justify-between py-2 border-b border-neutral-200/60 dark:border-white/5">
        <div>
          <p class="text-xs sm:text-sm font-bold text-neutral-800 dark:text-neutral-200">
            Terima Permintaan Masuk Baru
          </p>
          <p class="text-xs text-neutral-500">
            Izinkan pelaku UMKM di katalog untuk mengirim permintaan bimbingan kepadamu.
          </p>
        </div>
        <input
          v-model="acceptNewRequests"
          type="checkbox"
          class="w-5 h-5 accent-[#0081A0] rounded cursor-pointer"
        />
      </div>

      <div class="flex items-center justify-between py-2 border-b border-neutral-200/60 dark:border-white/5">
        <div>
          <p class="text-xs sm:text-sm font-bold text-neutral-800 dark:text-neutral-200">
            Notifikasi WhatsApp Permintaan Bimbingan
          </p>
          <p class="text-xs text-neutral-500">
            Kirimkan pesan instan saat ada UMKM baru yang mengajukan diri.
          </p>
        </div>
        <input
          v-model="whatsappNotification"
          type="checkbox"
          class="w-5 h-5 accent-[#0081A0] rounded cursor-pointer"
        />
      </div>

      <div class="flex items-center justify-between py-2">
        <div>
          <p class="text-xs sm:text-sm font-bold text-neutral-800 dark:text-neutral-200">
            Peringatan Anomali Kas Klien Binaan
          </p>
          <p class="text-xs text-neutral-500">
            Dapatkan peringatan dini otomatis jika HPP atau pengeluaran klien melonjak tidak wajar.
          </p>
        </div>
        <input
          v-model="anomalyAlerts"
          type="checkbox"
          class="w-5 h-5 accent-[#0081A0] rounded cursor-pointer"
        />
      </div>

      <div class="pt-4 border-t border-neutral-200/80 dark:border-white/10 flex justify-end">
        <button
          type="button"
          class="px-5 py-2.5 rounded-xl bg-[#0081A0] hover:bg-[#006D87] text-white font-heading font-bold text-xs shadow-md transition-all active:scale-95 cursor-pointer"
          @click="savePreferences"
        >
          Simpan Preferensi
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useKonsultanStore } from '~/stores/konsultan'
import { HugeiconsIcon } from '@hugeicons/vue'
import {
  UserCircleIcon,
  Award01Icon
} from '@hugeicons/core-free-icons'

definePageMeta({
  layout: 'dashboard'
})

const konsultanStore = useKonsultanStore()

const acceptNewRequests = ref(true)
const whatsappNotification = ref(true)
const anomalyAlerts = ref(true)

function savePreferences() {
  alert('Preferensi konsultan berhasil disimpan!')
}
</script>
