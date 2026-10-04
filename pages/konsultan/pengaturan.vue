<template>
  <div class="space-y-8 pb-12 max-w-4xl font-sans">
    <div>
      <h1 class="text-2xl sm:text-3xl font-heading font-bold text-neutral-900 dark:text-white tracking-tight">
        Pengaturan Profil Konsultan
      </h1>
      <p class="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 mt-1">
        Kelola kredensial pendamping, sertifikasi profesi, dan kuota penerimaan klien UMKM baru.
      </p>
    </div>

    <BCard padding="lg">
      <form @submit.prevent="handleSave" class="space-y-4">
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label class="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1 font-heading">
              Nama Lengkap & Gelar
            </label>
            <input
              type="text"
              value="Dra. Maya Suryani, M.M."
              class="w-full px-4 py-2.5 rounded-xl border border-border-light dark:border-border-dark bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 text-sm focus:ring-1 focus:ring-primary-500 focus:outline-none"
            />
          </div>
          <div>
            <label class="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1 font-heading">
              Sertifikasi Profesi
            </label>
            <input
              type="text"
              value="Certified Business Mentor (BNSP) • Akuntan Terdaftar"
              class="w-full px-4 py-2.5 rounded-xl border border-border-light dark:border-border-dark bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 text-sm focus:ring-1 focus:ring-primary-500 focus:outline-none"
            />
          </div>
        </div>

        <div class="pt-4 flex justify-end border-t border-border-light dark:border-border-dark">
          <BButton type="submit" variant="primary" size="md">
            Simpan Profil Konsultan
          </BButton>
        </div>
      </form>
    </BCard>
  </div>
</template>

<script setup lang="ts">
import BCard from '~/components/base/BCard.vue'
import BButton from '~/components/base/BButton.vue'

definePageMeta({
  layout: 'dashboard'
})

function handleSave() {
  alert('Profil konsultan berhasil diperbarui.')
}
</script>
