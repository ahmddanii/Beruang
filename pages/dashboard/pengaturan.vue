<template>
  <div class="space-y-8 pb-12 max-w-4xl font-sans">
    <!-- Header -->
    <div>
      <h1 class="text-2xl sm:text-3xl font-heading font-bold text-neutral-900 dark:text-white tracking-tight">
        Pengaturan Akun & Usaha
      </h1>
      <p class="text-sm sm:text-base text-neutral-600 dark:text-neutral-300 mt-1.5 leading-relaxed">
        Kelola profil bisnis, kontak WhatsApp resmi, dan preferensi notifikasi usahamu.
      </p>
    </div>

    <!-- Alert Save Success -->
    <div
      v-if="saved"
      class="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-sm font-semibold text-emerald-800 dark:text-emerald-300"
    >
      Perubahan berhasil disimpan! Data profil dan preferensi telah diperbarui.
    </div>

    <form @submit.prevent="handleSave" class="space-y-6">
      <!-- Section 1: Profil Usaha -->
      <BCard padding="lg">
        <template #header>
          <h3 class="font-heading font-bold text-base sm:text-lg text-neutral-900 dark:text-white">
            Informasi Usaha
          </h3>
        </template>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label class="block text-sm font-semibold text-neutral-800 dark:text-neutral-200 mb-1.5 font-heading">
              Nama Usaha / Brand
            </label>
            <input
              v-model="umkmStore.profile.name"
              type="text"
              class="w-full px-4 py-3 rounded-xl border border-border-light dark:border-border-dark bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 text-sm sm:text-base focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 focus:outline-none"
            />
          </div>

          <div>
            <label class="block text-sm font-semibold text-neutral-800 dark:text-neutral-200 mb-1.5 font-heading">
              Nama Pemilik
            </label>
            <input
              v-model="umkmStore.profile.ownerName"
              type="text"
              class="w-full px-4 py-3 rounded-xl border border-border-light dark:border-border-dark bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 text-sm sm:text-base focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 focus:outline-none"
            />
          </div>

          <div>
            <label class="block text-sm font-semibold text-neutral-800 dark:text-neutral-200 mb-1.5 font-heading">
              Sektor Usaha
            </label>
            <input
              v-model="umkmStore.profile.sector"
              type="text"
              class="w-full px-4 py-3 rounded-xl border border-border-light dark:border-border-dark bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 text-sm sm:text-base focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 focus:outline-none"
            />
          </div>

          <div>
            <label class="block text-sm font-semibold text-neutral-800 dark:text-neutral-200 mb-1.5 font-heading">
              Kota / Lokasi
            </label>
            <input
              v-model="umkmStore.profile.city"
              type="text"
              class="w-full px-4 py-3 rounded-xl border border-border-light dark:border-border-dark bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 text-sm sm:text-base focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 focus:outline-none"
            />
          </div>

          <div class="sm:col-span-2">
            <label class="block text-sm font-semibold text-neutral-800 dark:text-neutral-200 mb-1.5 font-heading">
              Ringkasan Bisnis (Pitch Singkat di Marketplace)
            </label>
            <textarea
              v-model="umkmStore.profile.pitchSummary"
              rows="3"
              class="w-full px-4 py-3 rounded-xl border border-border-light dark:border-border-dark bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 text-sm sm:text-base leading-relaxed focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 focus:outline-none"
            />
          </div>
        </div>
      </BCard>

      <!-- Section 2: Notifikasi & Keamanan -->
      <BCard padding="lg">
        <template #header>
          <h3 class="font-heading font-bold text-base sm:text-lg text-neutral-900 dark:text-white">
            Preferensi Notifikasi
          </h3>
        </template>

        <div class="space-y-4">
          <label class="flex items-center gap-3.5 cursor-pointer select-none">
            <input type="checkbox" v-model="notifyWhatsApp" class="w-5 h-5 rounded-md text-primary-600 focus:ring-primary-500" />
            <span class="text-sm sm:text-base text-neutral-800 dark:text-neutral-200 font-medium">
              Kirimkan pengingat deadline laporan bulanan via WhatsApp
            </span>
          </label>

          <label class="flex items-center gap-3.5 cursor-pointer select-none">
            <input type="checkbox" v-model="notifyInvestorRequests" class="w-5 h-5 rounded-md text-primary-600 focus:ring-primary-500" />
            <span class="text-sm sm:text-base text-neutral-800 dark:text-neutral-200 font-medium">
              Beritahu saya saat ada investor mengajukan akses Data Room
            </span>
          </label>
        </div>
      </BCard>

      <div class="flex justify-end">
        <BButton type="submit" variant="primary" size="lg">
          Simpan Perubahan
        </BButton>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useUmkmStore } from '~/stores/umkm'
import BCard from '~/components/base/BCard.vue'
import BButton from '~/components/base/BButton.vue'

definePageMeta({
  layout: 'dashboard'
})

const umkmStore = useUmkmStore()

const saved = ref(false)
const notifyWhatsApp = ref(true)
const notifyInvestorRequests = ref(true)

function handleSave() {
  saved.value = true
  setTimeout(() => {
    saved.value = false
  }, 2000)
}
</script>
