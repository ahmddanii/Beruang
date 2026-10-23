<template>
  <div class="space-y-8 pb-16 max-w-4xl text-left select-none">
    <!-- Header -->
    <div>
      <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0081A0]/10 text-[#0081A0] dark:text-[#2091AA] text-xs font-bold border border-[#0081A0]/20 mb-2">
        <span>Tesis & Preferensi Sindikasi</span>
      </div>
      <h1 class="text-2xl sm:text-3xl font-heading font-extrabold text-neutral-900 dark:text-neutral-50 tracking-tight">
        Pengaturan Profil Investor
      </h1>
      <p class="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 mt-1">
        Kelola identitas sindikasi modal, parameter kriteria kurasi bisnis, serta preferensi notifikasi kurasi.
      </p>
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
                1. Identitas Akun & Lembaga Sindikasi
              </h3>
              <p class="text-xs text-neutral-500">Informasi profil yang tercantum pada permohonan akses data room dan lembar penawaran modal.</p>
            </div>
          </div>
        </template>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label class="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1.5 font-heading">
              Nama Lengkap Investor <span class="text-rose-500">*</span>
            </label>
            <input
              v-model="form.name"
              type="text"
              required
              class="w-full px-4 py-2.5 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-sm focus:ring-2 focus:ring-primary-500 focus:outline-none font-medium"
            />
          </div>

          <div>
            <label class="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1.5 font-heading">
              Nama Lembaga / Sindikasi Modal <span class="text-rose-500">*</span>
            </label>
            <input
              v-model="form.syndicate"
              type="text"
              required
              class="w-full px-4 py-2.5 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-sm focus:ring-2 focus:ring-primary-500 focus:outline-none font-medium"
            />
          </div>

          <div>
            <label class="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1.5 font-heading">
              Email Resmi <span class="text-rose-500">*</span>
            </label>
            <input
              v-model="form.email"
              type="email"
              required
              class="w-full px-4 py-2.5 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-sm focus:ring-2 focus:ring-primary-500 focus:outline-none font-medium"
            />
          </div>

          <div>
            <label class="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1.5 font-heading">
              Nomor WhatsApp (Alert Transaksi) <span class="text-rose-500">*</span>
            </label>
            <input
              v-model="form.phone"
              type="tel"
              required
              class="w-full px-4 py-2.5 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-sm focus:ring-2 focus:ring-primary-500 focus:outline-none font-medium tabular-nums"
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
              <p class="text-xs text-neutral-500">Membantu algoritma mencocokkan UMKM binaan yang sesuai dengan kriteria sindikasi Anda.</p>
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
                  'px-3.5 py-2 rounded-xl text-xs font-heading font-semibold transition-all border cursor-pointer',
                  form.sectors.includes(sec)
                    ? 'bg-[#0081A0] text-white border-[#0081A0] shadow-xs'
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
                <option value="50M-150M">Rp 50 Jt - Rp 150 Jt</option>
                <option value="150M-500M">Rp 150 Jt - Rp 500 Jt</option>
                <option value="500M-1B">Rp 500 Jt - Rp 1 Miliar</option>
                <option value="1B_PLUS">&gt; Rp 1 Miliar</option>
              </select>
            </div>
          </div>
        </div>
      </BCard>

      <!-- Section 3: Notifikasi Transaksi & Akses VDR -->
      <BCard padding="lg" class="border border-[#E4E7EC] dark:border-[#2B2B31] shadow-none space-y-4">
        <template #header>
          <div class="flex items-center gap-2.5">
            <div class="w-8 h-8 rounded-lg bg-emerald-50 dark:bg-emerald-950 text-emerald-600 flex items-center justify-center">
              <HugeiconsIcon :icon="ShieldCheckIcon" :size="18" :stroke-width="1.75" />
            </div>
            <div>
              <h3 class="font-heading font-bold text-base text-neutral-900 dark:text-white">
                3. Saluran Notifikasi Transaksi
              </h3>
              <p class="text-xs text-neutral-500">Pemberitahuan persetujuan akses ruang data dan pembaruan dokumen.</p>
            </div>
          </div>
        </template>

        <div class="space-y-3">
          <label class="flex items-center justify-between p-3.5 rounded-xl bg-neutral-50 dark:bg-neutral-800/50 border border-neutral-200 dark:border-neutral-700/60 cursor-pointer">
            <div>
              <p class="text-xs sm:text-sm font-semibold text-neutral-800 dark:text-neutral-200">
                Peringatan WhatsApp Tiket Modal & Chat
              </p>
              <p class="text-xs text-neutral-500">Terima pesan instan WhatsApp saat permohonan akses VDR disetujui pemilik toko.</p>
            </div>
            <input
              v-model="form.notifyWhatsapp"
              type="checkbox"
              class="w-5 h-5 accent-[#0081A0] rounded cursor-pointer"
            />
          </label>

          <label class="flex items-center justify-between p-3.5 rounded-xl bg-neutral-50 dark:bg-neutral-800/50 border border-neutral-200 dark:border-neutral-700/60 cursor-pointer">
            <div>
              <p class="text-xs sm:text-sm font-semibold text-neutral-800 dark:text-neutral-200">
                Ringkasan Mingguan Katalog Usaha Terverifikasi
              </p>
              <p class="text-xs text-neutral-500">Kirimkan daftar UMKM baru yang lolos sertifikasi konsultan ke email resmi.</p>
            </div>
            <input
              v-model="form.notifyEmailReport"
              type="checkbox"
              class="w-5 h-5 accent-[#0081A0] rounded cursor-pointer"
            />
          </label>
        </div>
      </BCard>

      <!-- Section 4: Keamanan Akun (Ganti Sandi) -->
      <BCard padding="lg" class="border border-[#E4E7EC] dark:border-[#2B2B31] shadow-none space-y-4">
        <template #header>
          <h3 class="font-heading font-bold text-base text-neutral-900 dark:text-white">
            4. Keamanan Akun (Ganti Kata Sandi)
          </h3>
        </template>

        <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label class="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1.5 font-heading">
              Kata Sandi Saat Ini
            </label>
            <input
              v-model="passwordForm.currentPassword"
              type="password"
              placeholder="••••••••"
              class="w-full px-4 py-2.5 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-sm focus:ring-2 focus:ring-primary-500 focus:outline-none"
            />
          </div>

          <div>
            <label class="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1.5 font-heading">
              Kata Sandi Baru
            </label>
            <input
              v-model="passwordForm.newPassword"
              type="password"
              placeholder="Minimal 6 karakter"
              class="w-full px-4 py-2.5 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-sm focus:ring-2 focus:ring-primary-500 focus:outline-none"
            />
          </div>

          <div>
            <label class="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1.5 font-heading">
              Konfirmasi Kata Sandi Baru
            </label>
            <input
              v-model="passwordForm.confirmPassword"
              type="password"
              placeholder="Ulangi kata sandi baru"
              class="w-full px-4 py-2.5 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-sm focus:ring-2 focus:ring-primary-500 focus:outline-none"
            />
          </div>
        </div>
      </BCard>

      <div class="flex justify-end pt-2">
        <button
          type="submit"
          :disabled="saving"
          class="btn-3d-blue px-7 py-3 text-sm font-poppins font-bold shadow-xs cursor-pointer flex items-center gap-2"
        >
          <HugeiconsIcon :icon="CheckmarkBadge01Icon" :size="18" :stroke-width="2.2" />
          <span>{{ saving ? 'Menyimpan...' : 'Simpan Seluruh Pengaturan' }}</span>
        </button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useAuthStore } from '~/stores/auth'
import { useApi } from '~/composables/useApi'
import BCard from '~/components/base/BCard.vue'
import { HugeiconsIcon } from '@hugeicons/vue'
import {
  UserSettings01Icon,
  Briefcase01Icon,
  ShieldCheckIcon,
  CheckmarkBadge01Icon
} from '@hugeicons/core-free-icons'

definePageMeta({
  layout: 'dashboard'
})

const authStore = useAuthStore()

const saving = ref(false)
const saveMessage = ref('')
const errorMessage = ref('')

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
  syndicate: 'Nusantara Impact Angel Syndicate',
  email: 'hendro@nusantaraventures.com',
  phone: '081198765432',
  sectors: ['Kuliner & Minuman (F&B)', 'Ritel & FMCG', 'Fashion & Kriya'],
  preferredScheme: 'REVENUE_SHARE',
  ticketRange: '150M-500M',
  notifyWhatsapp: true,
  notifyEmailReport: true
})

const passwordForm = ref({
  currentPassword: '',
  newPassword: '',
  confirmPassword: ''
})

async function fetchInvestorData() {
  try {
    const res = await useApi<any>('/investor/profile')
    if (res?.success && res.data) {
      const d = res.data
      form.value.name = d.name || 'Hendro Wicaksono'
      form.value.syndicate = d.syndicate || d.firmName || 'Nusantara Impact Angel Syndicate'
      form.value.email = d.email || 'hendro@nusantaraventures.com'
      form.value.phone = d.phone || '081198765432'
      if (Array.isArray(d.sectors) && d.sectors.length > 0) {
        form.value.sectors = d.sectors
      }
      form.value.preferredScheme = d.preferredScheme || 'REVENUE_SHARE'
      form.value.ticketRange = d.ticketRange || '150M-500M'
      form.value.notifyWhatsapp = d.notifyWhatsapp ?? true
      form.value.notifyEmailReport = d.notifyEmailReport ?? true
    }
  } catch (err: any) {
    console.warn('Fallback lokal investor profile:', err?.message)
  }
}

onMounted(() => {
  fetchInvestorData()
})

function toggleSector(sec: string) {
  const idx = form.value.sectors.indexOf(sec)
  if (idx > -1) {
    form.value.sectors.splice(idx, 1)
  } else {
    form.value.sectors.push(sec)
  }
}

async function handleSave() {
  saving.value = true
  saveMessage.value = ''
  errorMessage.value = ''

  try {
    const res = await useApi<any>('/investor/profile', {
      method: 'PUT',
      body: {
        name: form.value.name,
        syndicate: form.value.syndicate,
        firmName: form.value.syndicate,
        email: form.value.email,
        phone: form.value.phone,
        sectors: form.value.sectors,
        preferredScheme: form.value.preferredScheme,
        ticketRange: form.value.ticketRange,
        notifyWhatsapp: form.value.notifyWhatsapp,
        notifyEmailReport: form.value.notifyEmailReport
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
      authStore.currentUser.email = form.value.email
      authStore.currentUser.phone = form.value.phone
    }

    saveMessage.value = res?.message || 'Profil dan preferensi investor berhasil disimpan!'
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
