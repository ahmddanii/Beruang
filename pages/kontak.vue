<template>
  <div class="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto font-sans space-y-12">
    <!-- Header -->
    <div class="text-center space-y-3 max-w-2xl mx-auto">
      <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-100 dark:bg-primary-950/60 text-primary-700 dark:text-primary-300 border border-primary-200 dark:border-primary-800 text-xs font-heading font-semibold">
        <span>Kontak & Dukungan</span>
      </div>
      <h1 class="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-neutral-900 dark:text-white tracking-tight">
        Hubungi Tim Beruang.
      </h1>
      <p class="text-sm sm:text-base text-neutral-600 dark:text-neutral-400">
        Punya pertanyaan seputar program pembinaan UMKM, kemitraan investor, atau butuh bantuan teknis? Tim kami siap melayani Anda.
      </p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
      <!-- Left Column: Contact Channels Info -->
      <div class="md:col-span-5 space-y-4">
        <BCard padding="lg" class="space-y-5">
          <h3 class="font-heading font-bold text-base text-neutral-900 dark:text-white">
            Kanal Komunikasi Langsung
          </h3>

          <div class="space-y-4 text-xs sm:text-sm">
            <div class="flex items-start gap-3">
              <div class="w-8 h-8 rounded-lg bg-primary-100 dark:bg-primary-950 text-primary-600 flex items-center justify-center shrink-0">
                <HugeiconsIcon :icon="Call02Icon" :size="16" :stroke-width="1.75" />
              </div>
              <div>
                <span class="text-neutral-400 block text-xs">WhatsApp Resmi:</span>
                <strong class="font-heading font-bold text-neutral-900 dark:text-white">+62 812-3456-7890</strong>
              </div>
            </div>

            <div class="flex items-start gap-3">
              <div class="w-8 h-8 rounded-lg bg-emerald-100 dark:bg-emerald-950 text-emerald-600 flex items-center justify-center shrink-0">
                <HugeiconsIcon :icon="Mail01Icon" :size="16" :stroke-width="1.75" />
              </div>
              <div>
                <span class="text-neutral-400 block text-xs">Email Korespondensi:</span>
                <strong class="font-heading font-bold text-neutral-900 dark:text-white">halo@beruang.id</strong>
              </div>
            </div>

            <div class="flex items-start gap-3">
              <div class="w-8 h-8 rounded-lg bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 flex items-center justify-center shrink-0">
                <HugeiconsIcon :icon="Location01Icon" :size="16" :stroke-width="1.75" />
              </div>
              <div>
                <span class="text-neutral-400 block text-xs">Pusat Inkubasi & Komunitas:</span>
                <p class="text-neutral-600 dark:text-neutral-400 text-xs leading-relaxed">
                  Gedung Inkubasi Bisnis UMKM, Jl. Ir. H. Juanda No. 88, Dago, Bandung, Jawa Barat 40132.
                </p>
              </div>
            </div>
          </div>
        </BCard>

        <!-- Subtle mascot encouragement box -->
        <div class="p-5 rounded-2xl bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark flex items-center gap-3">
          <SiBeru state="greeting" size="sm" class="shrink-0" />
          <p class="text-xs text-neutral-600 dark:text-neutral-300 leading-relaxed">
            "Setiap bisnis besar berawal dari pembukuan rapi hari ini. Kami siap membantumu!"
          </p>
        </div>
      </div>

      <!-- Right Column: Interactive Form -->
      <div class="md:col-span-7">
        <BCard padding="lg">
          <form @submit.prevent="handleSubmit" class="space-y-4">
            <div>
              <label class="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1 font-heading">
                Nama Lengkap
              </label>
              <input
                v-model="name"
                type="text"
                required
                placeholder="Contoh: Budi Santoso"
                class="w-full px-4 py-2.5 rounded-xl border border-border-light dark:border-border-dark bg-white dark:bg-neutral-900 text-sm text-neutral-900 dark:text-neutral-100 placeholder-neutral-400 focus:ring-1 focus:ring-primary-500 focus:outline-none"
              />
            </div>

            <div>
              <label class="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1 font-heading">
                Alamat Email Aktif
              </label>
              <input
                v-model="email"
                type="email"
                required
                placeholder="nama@email.com"
                class="w-full px-4 py-2.5 rounded-xl border border-border-light dark:border-border-dark bg-white dark:bg-neutral-900 text-sm text-neutral-900 dark:text-neutral-100 placeholder-neutral-400 focus:ring-1 focus:ring-primary-500 focus:outline-none"
              />
            </div>

            <div>
              <label class="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1 font-heading">
                Peran / Kebutuhan Anda
              </label>
              <select
                v-model="role"
                class="w-full px-4 py-2.5 rounded-xl border border-border-light dark:border-border-dark bg-white dark:bg-neutral-900 text-sm text-neutral-900 dark:text-neutral-100 focus:ring-1 focus:ring-primary-500 focus:outline-none"
              >
                <option value="umkm">Pemilik Usaha (UMKM)</option>
                <option value="investor">Calon Investor / Pendana</option>
                <option value="konsultan">Praktisi / Konsultan Bisnis</option>
                <option value="lainnya">Pertanyaan Umum / Media</option>
              </select>
            </div>

            <div>
              <label class="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1 font-heading">
                Pesan / Pertanyaan Anda
              </label>
              <textarea
                v-model="message"
                rows="4"
                required
                placeholder="Ceritakan pertanyaan atau kebutuhan bisnis Anda..."
                class="w-full px-4 py-2.5 rounded-xl border border-border-light dark:border-border-dark bg-white dark:bg-neutral-900 text-sm text-neutral-900 dark:text-neutral-100 placeholder-neutral-400 focus:ring-1 focus:ring-primary-500 focus:outline-none"
              />
            </div>

            <div v-if="submitted" class="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-xs text-emerald-700 dark:text-emerald-300">
              Pesan Anda berhasil dikirim! Tim Beruang akan menghubungi Anda dalam waktu 1x24 jam kerja.
            </div>

            <BButton type="submit" variant="primary" block size="md">
              Kirim Pesan
            </BButton>
          </form>
        </BCard>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import BCard from '~/components/base/BCard.vue'
import BButton from '~/components/base/BButton.vue'
import SiBeru from '~/components/mascot/SiBeru.vue'
import { HugeiconsIcon } from '@hugeicons/vue'
import {
  Call02Icon,
  Mail01Icon,
  Location01Icon
} from '@hugeicons/core-free-icons'

const name = ref('')
const email = ref('')
const role = ref('umkm')
const message = ref('')
const submitted = ref(false)

function handleSubmit() {
  submitted.value = true
  setTimeout(() => {
    name.value = ''
    email.value = ''
    message.value = ''
  }, 2000)
}
</script>
