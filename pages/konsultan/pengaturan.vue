<template>
  <div class="space-y-6 sm:space-y-8 pb-16 font-sans max-w-4xl text-left select-none">
    <!-- Header -->
    <div class="p-1.5 sm:p-2 rounded-3xl bg-neutral-200/50 dark:bg-neutral-800/40 border border-neutral-300/40 dark:border-neutral-700/30 shadow-xs">
      <div class="p-6 sm:p-8 rounded-[calc(1.5rem-0.25rem)] bg-white dark:bg-[#13161F] border border-neutral-200/80 dark:border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div class="space-y-1">
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0081A0]/10 text-[#0081A0] dark:text-[#2091AA] text-xs font-bold border border-[#0081A0]/20 mb-1">
            <span>Preferensi & Akun Konsultan</span>
          </div>
          <h1 class="text-2xl sm:text-3xl font-heading font-extrabold text-neutral-900 dark:text-white tracking-tight">
            Pengaturan Konsultan Mitra
          </h1>
          <p class="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400">
            Kelola identitas kelembagaan, ketersediaan menerima UMKM binaan baru, serta preferensi peringatan kas anomali.
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

    <!-- Alert Notifications -->
    <div
      v-if="saveMessage"
      class="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-xs sm:text-sm font-semibold text-emerald-800 dark:text-emerald-300 flex items-center gap-2 animate-in fade-in"
    >
      <HugeiconsIcon :icon="CheckmarkBadge01Icon" :size="18" class="text-[#00AA13] shrink-0" />
      <span>{{ saveMessage }}</span>
    </div>

    <div
      v-if="errorMessage"
      class="p-4 rounded-2xl bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-800 text-xs sm:text-sm font-semibold text-rose-800 dark:text-rose-300 flex items-center gap-2 animate-in fade-in"
    >
      <span class="font-bold text-rose-600">!</span>
      <span>{{ errorMessage }}</span>
    </div>

    <!-- Banner Link ke Profil & Dokumen -->
    <div class="card-tactile-gopay p-6 rounded-3xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border border-neutral-200/80 dark:border-neutral-800/80">
      <div class="flex items-center gap-4">
        <div class="w-12 h-12 rounded-2xl bg-[#00AA13]/10 text-[#00AA13] dark:text-[#22C55E] flex items-center justify-center shrink-0">
          <HugeiconsIcon :icon="Award01Icon" :size="24" :stroke-width="2" />
        </div>
        <div>
          <h3 class="font-heading font-bold text-sm sm:text-base text-neutral-900 dark:text-white">
            Kelengkapan Profil & Sertifikat Lisensi: {{ konsultanStore.profileCompleteness }}%
          </h3>
          <p class="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
            Lisensi BNSP terverifikasi membantu UMKM binaan semakin mantap mengikuti arahan perbaikan kas.
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

    <form @submit.prevent="handleSave" class="space-y-6">
      <!-- Section 1: Identitas Konsultan & Firma -->
      <div class="card-tactile-gopay p-6 sm:p-8 rounded-3xl space-y-5 border border-neutral-200/80 dark:border-neutral-800/80">
        <div class="pb-3 border-b border-neutral-200/80 dark:border-white/10">
          <h3 class="font-heading font-bold text-base sm:text-lg text-neutral-900 dark:text-white">
            1. Identitas Konsultan & Lembaga Pendamping
          </h3>
          <p class="text-xs text-neutral-500 mt-0.5">
            Informasi kelembagaan yang tertera pada lembar sertifikasi kelayakan modal UMKM.
          </p>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label class="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1.5">
              Nama Lengkap & Gelar <span class="text-rose-500">*</span>
            </label>
            <input
              v-model="form.name"
              type="text"
              required
              placeholder="Dra. Maya Suryani, M.M."
              class="w-full px-4 py-2.5 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-sm focus:ring-2 focus:ring-[#0081A0] focus:outline-none font-medium"
            />
          </div>

          <div>
            <label class="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1.5">
              Nama Firma / Lembaga Konsultasi <span class="text-rose-500">*</span>
            </label>
            <input
              v-model="form.firmName"
              type="text"
              required
              placeholder="Suryani Strategic Advisory"
              class="w-full px-4 py-2.5 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-sm focus:ring-2 focus:ring-[#0081A0] focus:outline-none font-medium"
            />
          </div>

          <div>
            <label class="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1.5">
              Nomor Akreditasi / Lisensi BNSP
            </label>
            <input
              v-model="form.bnspLicense"
              type="text"
              placeholder="BNSP-KM-2026-9812"
              class="w-full px-4 py-2.5 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-sm focus:ring-2 focus:ring-[#0081A0] focus:outline-none font-medium tabular-nums"
            />
          </div>

          <div>
            <label class="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1.5">
              Kota Domisili Praktik <span class="text-rose-500">*</span>
            </label>
            <input
              v-model="form.city"
              type="text"
              required
              placeholder="Bandung, Jawa Barat"
              class="w-full px-4 py-2.5 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-sm focus:ring-2 focus:ring-[#0081A0] focus:outline-none font-medium"
            />
          </div>

          <div>
            <label class="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1.5">
              Spesialisasi Pendampingan
            </label>
            <input
              v-model="form.specialization"
              type="text"
              placeholder="Keuangan, Biaya & Standardisasi Operasional"
              class="w-full px-4 py-2.5 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-sm focus:ring-2 focus:ring-[#0081A0] focus:outline-none font-medium"
            />
          </div>

          <div>
            <label class="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1.5">
              Maksimal Kapasitas Klien Aktif
            </label>
            <input
              v-model.number="form.maxClients"
              type="number"
              min="1"
              max="50"
              class="w-full px-4 py-2.5 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-sm focus:ring-2 focus:ring-[#0081A0] focus:outline-none font-medium tabular-nums"
            />
          </div>
        </div>
      </div>

      <!-- Section 2: Ketersediaan Penerimaan Bimbingan & Notifikasi -->
      <div class="card-tactile-gopay p-6 sm:p-8 rounded-3xl space-y-5 border border-neutral-200/80 dark:border-neutral-800/80">
        <h3 class="font-heading font-bold text-base sm:text-lg text-neutral-900 dark:text-white border-b border-neutral-200/80 dark:border-white/10 pb-3">
          2. Ketersediaan Bimbingan Klien Baru
        </h3>

        <div class="flex items-center justify-between py-2 border-b border-neutral-200/60 dark:border-white/5">
          <div>
            <p class="text-xs sm:text-sm font-bold text-neutral-800 dark:text-neutral-200">
              Terima Permintaan Masuk Baru
            </p>
            <p class="text-xs text-neutral-500">
              Izinkan pelaku UMKM di katalog untuk mengirim permohonan bimbingan langsung kepadamu.
            </p>
          </div>
          <input
            v-model="preferences.acceptNewRequests"
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
              Kirimkan pemberitahuan instan saat ada UMKM baru yang mengajukan bimbingan atau mengunggah laporan kas.
            </p>
          </div>
          <input
            v-model="preferences.whatsappNotification"
            type="checkbox"
            class="w-5 h-5 accent-[#0081A0] rounded cursor-pointer"
          />
        </div>

        <div class="flex items-center justify-between py-2">
          <div>
            <p class="text-xs sm:text-sm font-bold text-neutral-800 dark:text-neutral-200">
              Peringatan Anomali Kas Klien Binaan (AI Alert)
            </p>
            <p class="text-xs text-neutral-500">
              Dapatkan peringatan dini otomatis jika HPP atau pengeluaran klien melonjak $> 8\%$ tidak wajar.
            </p>
          </div>
          <input
            v-model="preferences.anomalyAlerts"
            type="checkbox"
            class="w-5 h-5 accent-[#0081A0] rounded cursor-pointer"
          />
        </div>
      </div>

      <!-- Section 3: Keamanan & Ganti Sandi Akun -->
      <div class="card-tactile-gopay p-6 sm:p-8 rounded-3xl space-y-5 border border-neutral-200/80 dark:border-neutral-800/80">
        <h3 class="font-heading font-bold text-base sm:text-lg text-neutral-900 dark:text-white border-b border-neutral-200/80 dark:border-white/10 pb-3">
          3. Keamanan Akun (Ganti Kata Sandi)
        </h3>

        <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label class="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1.5">
              Kata Sandi Saat Ini
            </label>
            <input
              v-model="passwordForm.currentPassword"
              type="password"
              placeholder="••••••••"
              class="w-full px-4 py-2.5 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-sm focus:ring-2 focus:ring-[#0081A0] focus:outline-none"
            />
          </div>

          <div>
            <label class="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1.5">
              Kata Sandi Baru
            </label>
            <input
              v-model="passwordForm.newPassword"
              type="password"
              placeholder="Minimal 6 karakter"
              class="w-full px-4 py-2.5 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-sm focus:ring-2 focus:ring-[#0081A0] focus:outline-none"
            />
          </div>

          <div>
            <label class="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1.5">
              Konfirmasi Kata Sandi Baru
            </label>
            <input
              v-model="passwordForm.confirmPassword"
              type="password"
              placeholder="Ulangi kata sandi baru"
              class="w-full px-4 py-2.5 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-sm focus:ring-2 focus:ring-[#0081A0] focus:outline-none"
            />
          </div>
        </div>
      </div>

      <div class="pt-4 flex justify-end">
        <button
          type="submit"
          :disabled="saving"
          class="px-6 py-2.5 rounded-xl bg-[#0081A0] hover:bg-[#006D87] text-white font-heading font-bold text-xs shadow-md transition-all active:scale-95 cursor-pointer flex items-center gap-2"
        >
          <HugeiconsIcon :icon="CheckmarkBadge01Icon" :size="16" :stroke-width="2" />
          <span>{{ saving ? 'Menyimpan...' : 'Simpan Seluruh Pengaturan' }}</span>
        </button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useAuthStore } from '~/stores/auth'
import { useKonsultanStore } from '~/stores/konsultan'
import { useApi } from '~/composables/useApi'
import { HugeiconsIcon } from '@hugeicons/vue'
import {
  UserCircleIcon,
  Award01Icon,
  CheckmarkBadge01Icon
} from '@hugeicons/core-free-icons'

definePageMeta({
  layout: 'dashboard'
})

const authStore = useAuthStore()
const konsultanStore = useKonsultanStore()

const saving = ref(false)
const saveMessage = ref('')
const errorMessage = ref('')

const form = ref({
  name: 'Dra. Maya Suryani, M.M.',
  firmName: 'Suryani Consulting & Advisory',
  bnspLicense: 'BNSP-KM-2026-9812',
  city: 'Bandung',
  specialization: 'F&B, Keuangan & Standardisasi Mutu',
  maxClients: 10
})

const preferences = ref({
  acceptNewRequests: true,
  whatsappNotification: true,
  anomalyAlerts: true
})

const passwordForm = ref({
  currentPassword: '',
  newPassword: '',
  confirmPassword: ''
})

async function fetchConsultantData() {
  try {
    const res = await useApi<any>('/consultant/profile')
    if (res?.success && res.data) {
      const d = res.data
      form.value.name = d.name || 'Dra. Maya Suryani, M.M.'
      form.value.firmName = d.firmName || d.institution || 'Suryani Strategic Advisory'
      form.value.bnspLicense = d.bnspLicense || 'BNSP-KM-2026-9812'
      form.value.city = d.city || 'Bandung'
      form.value.specialization = d.specialization || 'F&B, Keuangan & Standardisasi Mutu'
      form.value.maxClients = d.maxClients || 10

      if (d.preferences) {
        preferences.value.acceptNewRequests = d.preferences.acceptNewRequests ?? true
        preferences.value.whatsappNotification = d.preferences.whatsappNotification ?? true
        preferences.value.anomalyAlerts = d.preferences.anomalyAlerts ?? true
      }
    }
  } catch (err: any) {
    console.warn('Fallback lokal konsultan profile:', err?.message)
  }
}

onMounted(() => {
  fetchConsultantData()
})

async function handleSave() {
  saving.value = true
  saveMessage.value = ''
  errorMessage.value = ''

  try {
    const res = await useApi<any>('/consultant/profile', {
      method: 'PUT',
      body: {
        name: form.value.name,
        firmName: form.value.firmName,
        institution: form.value.firmName,
        bnspLicense: form.value.bnspLicense,
        city: form.value.city,
        specialization: form.value.specialization,
        maxClients: form.value.maxClients,
        preferences: preferences.value
      }
    })

    if (passwordForm.value.newPassword) {
      if (passwordForm.value.newPassword !== passwordForm.value.confirmPassword) {
        throw new Error('Konfirmasi kata sandi baru tidak cocok.')
      }

      await useApi('/user/password', {
        method: 'PUT',
        body: {
          currentPassword: passwordForm.value.currentPassword,
          newPassword: passwordForm.value.newPassword,
          confirmPassword: passwordForm.value.confirmPassword
        }
      })

      passwordForm.value.currentPassword = ''
      passwordForm.value.newPassword = ''
      passwordForm.value.confirmPassword = ''
    }

    if (authStore.currentUser) {
      authStore.currentUser.name = form.value.name
    }

    saveMessage.value = res?.message || 'Profil dan preferensi konsultan berhasil disimpan!'
    setTimeout(() => {
      saveMessage.value = ''
    }, 4000)
  } catch (err: any) {
    errorMessage.value = err?.data?.message || err?.message || 'Gagal menyimpan pengaturan.'
  } finally {
    saving.value = false
  }
}
</script>
