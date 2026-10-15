<template>
  <div class="py-8 sm:py-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-8 font-sans">
    
    <!-- Header -->
    <div class="text-center space-y-2 max-w-xl mx-auto">
      <h1 class="text-2xl sm:text-3xl lg:text-4xl font-poppins font-bold text-neutral-900 dark:text-white tracking-tight leading-snug">
        Hubungi Tim Beruang.
      </h1>
      <p class="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 font-poppins leading-relaxed">
        Punya pertanyaan seputar program pembinaan UMKM, kemitraan investor, atau butuh bantuan teknis? Tim kami siap melayani Anda.
      </p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
      <!-- Left Column: Contact Channels Info -->
      <div class="md:col-span-5 space-y-3.5">
        <div class="card-tactile-gopay p-5 rounded-2xl space-y-4">
          <h3 class="font-poppins font-bold text-sm text-neutral-900 dark:text-white">
            Kanal Komunikasi Langsung
          </h3>

          <div class="space-y-3.5 text-xs">
            <div class="flex items-start gap-3">
              <div class="w-7 h-7 rounded-lg bg-[#0081A0]/10 text-[#0081A0] dark:text-[#2091AA] flex items-center justify-center shrink-0">
                <HugeiconsIcon :icon="Call02Icon" :size="15" :stroke-width="1.8" />
              </div>
              <div>
                <span class="text-neutral-400 block text-[11px] font-poppins">WhatsApp Resmi:</span>
                <strong class="font-poppins font-bold text-neutral-900 dark:text-white text-xs">+62 812-3456-7890</strong>
              </div>
            </div>

            <div class="flex items-start gap-3">
              <div class="w-7 h-7 rounded-lg bg-emerald-100 dark:bg-emerald-950 text-emerald-600 flex items-center justify-center shrink-0">
                <HugeiconsIcon :icon="Mail01Icon" :size="15" :stroke-width="1.8" />
              </div>
              <div>
                <span class="text-neutral-400 block text-[11px] font-poppins">Email Korespondensi:</span>
                <strong class="font-poppins font-bold text-neutral-900 dark:text-white text-xs">halo@beruang.id</strong>
              </div>
            </div>

            <div class="flex items-start gap-3">
              <div class="w-7 h-7 rounded-lg bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 flex items-center justify-center shrink-0">
                <HugeiconsIcon :icon="Location01Icon" :size="15" :stroke-width="1.8" />
              </div>
              <div>
                <span class="text-neutral-400 block text-[11px] font-poppins">Pusat Inkubasi & Komunitas:</span>
                <p class="text-neutral-600 dark:text-neutral-400 text-xs font-poppins leading-relaxed">
                  Gedung Inkubasi Bisnis UMKM, Jl. Ir. H. Juanda No. 88, Dago, Bandung 40132.
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- Mascot message box -->
        <div class="p-4 rounded-xl card-tactile-gopay flex items-center gap-3">
          <SiBeru state="greeting" size="sm" class="shrink-0" />
          <p class="text-[11px] font-poppins text-neutral-600 dark:text-neutral-300 leading-relaxed">
            "Setiap bisnis besar berawal dari pembukuan rapi hari ini. Kami siap membantumu!"
          </p>
        </div>
      </div>

      <!-- Right Column: Interactive Form -->
      <div class="md:col-span-7">
        <div class="card-tactile-gopay p-5 sm:p-6 rounded-2xl">
          <form @submit.prevent="handleSubmit" class="space-y-3.5">
            <div>
              <label class="block text-xs font-poppins font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                Nama Lengkap
              </label>
              <input
                v-model="name"
                type="text"
                required
                placeholder="Contoh: Budi Santoso"
                class="w-full px-3.5 py-2 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-xs sm:text-sm text-neutral-900 dark:text-neutral-100 placeholder-neutral-400 focus:ring-2 focus:ring-[#0081A0]/20 focus:border-[#0081A0] focus:outline-none"
              />
            </div>

            <div>
              <label class="block text-xs font-poppins font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                Alamat Email Aktif
              </label>
              <input
                v-model="email"
                type="email"
                required
                placeholder="nama@email.com"
                class="w-full px-3.5 py-2 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-xs sm:text-sm text-neutral-900 dark:text-neutral-100 placeholder-neutral-400 focus:ring-2 focus:ring-[#0081A0]/20 focus:border-[#0081A0] focus:outline-none"
              />
            </div>

            <div>
              <label class="block text-xs font-poppins font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                Peran / Kebutuhan Anda
              </label>
              <select
                v-model="role"
                class="w-full px-3.5 py-2 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-xs sm:text-sm text-neutral-900 dark:text-neutral-100 focus:ring-2 focus:ring-[#0081A0]/20 focus:border-[#0081A0] focus:outline-none"
              >
                <option value="umkm">Pemilik Usaha (UMKM)</option>
                <option value="investor">Calon Investor / Pendana</option>
                <option value="konsultan">Praktisi / Konsultan Bisnis</option>
                <option value="lainnya">Pertanyaan Umum / Media</option>
              </select>
            </div>

            <div>
              <label class="block text-xs font-poppins font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                Pesan / Pertanyaan Anda
              </label>
              <textarea
                v-model="message"
                rows="3"
                required
                placeholder="Ceritakan pertanyaan atau kebutuhan bisnis Anda..."
                class="w-full px-3.5 py-2 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-xs sm:text-sm text-neutral-900 dark:text-neutral-100 placeholder-neutral-400 focus:ring-2 focus:ring-[#0081A0]/20 focus:border-[#0081A0] focus:outline-none resize-none"
              />
            </div>

            <div v-if="submitted" class="p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-xs font-poppins text-emerald-700 dark:text-emerald-300">
              Pesan Anda berhasil dikirim! Tim Beruang akan menghubungi Anda dalam waktu 1x24 jam kerja.
            </div>

            <button
              type="submit"
              class="w-full py-2.5 rounded-full bg-[#0081A0] hover:bg-[#00708C] text-white font-poppins font-semibold text-xs sm:text-sm shadow-sm transition-all active:scale-[0.98] cursor-pointer"
            >
              Kirim Pesan
            </button>
          </form>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import SiBeru from '~/components/mascot/SiBeru.vue'
import { HugeiconsIcon } from '@hugeicons/vue'
import {
  Call02Icon,
  Mail01Icon,
  Location01Icon
} from '@hugeicons/core-free-icons'

useSeoMeta({
  title: 'Kontak & Dukungan - Beruang',
  description: 'Hubungi tim Beruang untuk bantuan program pembinaan UMKM, konsultasi kurasi, atau informasi kemitraan pendanaan.'
})

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
