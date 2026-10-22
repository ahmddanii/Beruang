<template>
  <div class="space-y-8 pb-10 max-w-4xl">
    <!-- Header -->
    <div>
      <h1 class="text-2xl sm:text-3xl font-heading font-extrabold text-neutral-900 dark:text-neutral-50 tracking-tight">
        Pengaturan Profil Investor
      </h1>
      <p class="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 mt-1.5">
        Kelola identitas investor, parameter tesis investasi, dan preferensi notifikasi kurasi bisnis.
      </p>
    </div>

    <!-- Alert Notification -->
    <BAlert
      v-if="saved"
      variant="success"
      title="Perubahan Berhasil Disimpan"
      message="Pengaturan profil dan preferensi tesis investasi Anda telah diperbarui."
    />

    <form @submit.prevent="handleSave" class="space-y-6">
      <!-- Section 1: Identitas Investor -->
      <BCard padding="lg" class="border border-[#E4E7EC] dark:border-[#2B2B31] shadow-none space-y-5">
        <template #header>
          <div class="flex items-center gap-2.5">
            <div class="w-8 h-8 rounded-lg bg-primary-50 dark:bg-primary-950 text-primary-600 flex items-center justify-center">
              <HugeiconsIcon :icon="UserSettings01Icon" :size="18" :stroke-width="1.75" />
            </div>
            <div>
              <h3 class="font-heading font-bold text-base text-neutral-900 dark:text-white">
                1. Identitas Akun & Lembaga
              </h3>
              <p class="text-xs text-neutral-500">Informasi profil yang tercantum pada permohonan akses data room.</p>
            </div>
          </div>
        </template>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label class="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1.5 font-heading">
              Nama Lengkap Investor
            </label>
            <input
              v-model="form.name"
              type="text"
              required
              class="w-full px-4 py-2.5 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-sm focus:ring-2 focus:ring-primary-500 focus:outline-none"
            />
          </div>

          <div>
            <label class="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1.5 font-heading">
              Nama Lembaga / Sindikasi
            </label>
            <input
              v-model="form.syndicate"
              type="text"
              required
              class="w-full px-4 py-2.5 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-sm focus:ring-2 focus:ring-primary-500 focus:outline-none"
            />
          </div>

          <div>
            <label class="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1.5 font-heading">
              Email Resmi
            </label>
            <input
              v-model="form.email"
              type="email"
              required
              class="w-full px-4 py-2.5 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-sm focus:ring-2 focus:ring-primary-500 focus:outline-none"
            />
          </div>

          <div>
            <label class="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1.5 font-heading">
              Nomor WhatsApp (Alert Transaksi)
            </label>
            <input
              v-model="form.phone"
              type="tel"
              required
              class="w-full px-4 py-2.5 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-sm focus:ring-2 focus:ring-primary-500 focus:outline-none"
            />
          </div>
        </div>
      </BCard>

      <!-- Section 2: Tesis & Preferensi Investasi -->
      <BCard padding="lg" class="border border-[#E4E7EC] dark:border-[#2B2B31] shadow-none space-y-5">
        <template #header>
          <div class="flex items-center gap-2.5">
            <div class="w-8 h-8 rounded-lg bg-amber-50 dark:bg-amber-950 text-amber-600 flex items-center justify-center">
              <HugeiconsIcon :icon="Briefcase01Icon" :size="18" :stroke-width="1.75" />
            </div>
            <div>
              <h3 class="font-heading font-bold text-base text-neutral-900 dark:text-white">
                2. Tesis & Preferensi Portofolio
              </h3>
              <p class="text-xs text-neutral-500">Membantu algoritma mencocokkan UMKM terverifikasi yang sesuai dengan kriteria Anda.</p>
            </div>
          </div>
        </template>

        <div class="space-y-4">
          <div>
            <label class="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-2 font-heading">
              Sektor Industri Pilihan
            </label>
            <div class="flex flex-wrap gap-2">
              <button
                v-for="sec in availableSectors"
                :key="sec"
                type="button"
                :class="[
                  'px-3 py-1.5 rounded-xl text-xs font-heading font-semibold transition-all border',
                  form.sectors.includes(sec)
                    ? 'bg-primary-500 text-white border-primary-500 shadow-xs'
                    : 'bg-neutral-50 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 border-neutral-200 dark:border-neutral-700 hover:border-neutral-300'
                ]"
                @click="toggleSector(sec)"
              >
                {{ sec }}
              </button>
            </div>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div>
              <label class="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1.5 font-heading">
                Preferensi Skema Pendanaan
              </label>
              <select
                v-model="form.preferredScheme"
                class="w-full px-4 py-2.5 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-sm focus:ring-2 focus:ring-primary-500 focus:outline-none"
              >
                <option value="REVENUE_SHARE">Bagi Hasil / Revenue Share</option>
                <option value="PERFORMANCE_LOAN">Pinjaman Modal Kerja Berbasis Kinerja</option>
                <option value="EQUITY">Penyertaan Saham Ekuitas Minoritas</option>
                <option value="ALL">Semua Skema Terbuka</option>
              </select>
            </div>

            <div>
              <label class="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1.5 font-heading">
                Rentang Rencana Tiket Investasi
              </label>
              <select
                v-model="form.ticketRange"
                class="w-full px-4 py-2.5 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-sm focus:ring-2 focus:ring-primary-500 focus:outline-none"
              >
                <option value="50M-150M">Rp 50 Juta – Rp 150 Juta (Micro)</option>
                <option value="150M-500M">Rp 150 Juta – Rp 500 Juta (Growth)</option>
                <option value="500M-1B">Rp 500 Juta – Rp 1 Miliar (Scale-up)</option>
                <option value="1B+">&gt; Rp 1 Miliar (Sindikasi Besar)</option>
              </select>
            </div>
          </div>
        </div>
      </BCard>

      <!-- Section 3: Kepatuhan NDA & Notifikasi -->
      <BCard padding="lg" class="border border-[#E4E7EC] dark:border-[#2B2B31] shadow-none space-y-4">
        <template #header>
          <div class="flex items-center gap-2.5">
            <div class="w-8 h-8 rounded-lg bg-emerald-50 dark:bg-emerald-950 text-emerald-600 flex items-center justify-center">
              <HugeiconsIcon :icon="ShieldCheckIcon" :size="18" :stroke-width="1.75" />
            </div>
            <div>
              <h3 class="font-heading font-bold text-base text-neutral-900 dark:text-white">
                3. Kepatuhan Hukum & Notifikasi Cepat
              </h3>
              <p class="text-xs text-neutral-500">Status verifikasi akreditasi dan notifikasi bisnis.</p>
            </div>
          </div>
        </template>

        <div class="p-4 rounded-xl bg-neutral-50 dark:bg-neutral-800/60 border border-neutral-200 dark:border-neutral-700/80 flex items-center justify-between">
          <div>
            <div class="flex items-center gap-2">
              <span class="font-heading font-bold text-xs text-neutral-900 dark:text-white">
                Status Perjanjian Kerahasiaan (Master NDA)
              </span>
              <span class="text-[10px] font-heading font-semibold uppercase px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                Aktif s.d 2028
              </span>
            </div>
            <p class="text-xs text-neutral-500 mt-1">
              Dokumen identifikasi KTP dan NPWP telah tervalidasi oleh tim kepatuhan Beruang.
            </p>
          </div>
        </div>

        <div class="space-y-3 pt-2">
          <label class="flex items-center gap-3 cursor-pointer select-none">
            <input
              type="checkbox"
              v-model="form.notifyWhatsapp"
              class="w-4 h-4 rounded text-primary-600 focus:ring-primary-500"
            />
            <span class="text-xs text-neutral-700 dark:text-neutral-300">
              Kirimkan ringkasan instan via WhatsApp setiap kali ada UMKM baru berstatus <strong>Ready for Funding</strong> sesuai sektor pilihan saya.
            </span>
          </label>

          <label class="flex items-center gap-3 cursor-pointer select-none">
            <input
              type="checkbox"
              v-model="form.notifyEmailReport"
              class="w-4 h-4 rounded text-primary-600 focus:ring-primary-500"
            />
            <span class="text-xs text-neutral-700 dark:text-neutral-300">
              Kirimkan buletin mingguan ringkasan tren pendapatan dan analisis makro industri UMKM binaan.
            </span>
          </label>
        </div>
      </BCard>

      <!-- Submit Action -->
      <div class="flex justify-end pt-2">
        <BButton
          type="submit"
          variant="primary"
          size="md"
          :loading="saving"
          class="flex items-center gap-2"
        >
          <span>Simpan Profil Investor</span>
        </BButton>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import BCard from '~/components/base/BCard.vue'
import BButton from '~/components/base/BButton.vue'
import BAlert from '~/components/base/BAlert.vue'
import { HugeiconsIcon } from '@hugeicons/vue'
import {
  UserSettings01Icon,
  Briefcase01Icon,
  ShieldCheckIcon
} from '@hugeicons/core-free-icons'

definePageMeta({
  layout: 'dashboard'
})

const saving = ref(false)
const saved = ref(false)

const availableSectors = [
  'Kuliner & Minuman (F&B)',
  'Fashion & Kriya',
  'Ritel & FMCG',
  'Agroindustri',
  'Jasa & Katering',
  'Teknologi Terapan'
]

const form = ref({
  name: 'Hendro Wicaksono',
  syndicate: 'Nusantara Angel Syndicate',
  email: 'hendro@nusantaraventures.com',
  phone: '081198765432',
  sectors: ['Kuliner & Minuman (F&B)', 'Ritel & FMCG', 'Fashion & Kriya'],
  preferredScheme: 'REVENUE_SHARE',
  ticketRange: '150M-500M',
  notifyWhatsapp: true,
  notifyEmailReport: true
})

function toggleSector(sec: string) {
  const idx = form.value.sectors.indexOf(sec)
  if (idx > -1) {
    form.value.sectors.splice(idx, 1)
  } else {
    form.value.sectors.push(sec)
  }
}

function handleSave() {
  saving.value = true
  setTimeout(() => {
    saving.value = false
    saved.value = true
    setTimeout(() => {
      saved.value = false
    }, 3000)
  }, 400)
}
</script>
