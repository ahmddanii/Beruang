<template>
  <div class="space-y-6 pb-20 max-w-4xl font-sans text-neutral-900 dark:text-neutral-100 select-none">
    <!-- 1. Top Page Controls -->
    <div class="flex items-center justify-end gap-2.5 pb-2 shrink-0 flex-wrap">
      <NuxtLink
        to="/dashboard"
        class="inline-flex items-center gap-2 px-4 py-2 sm:py-2.5 rounded-xl bg-white hover:bg-neutral-100/80 dark:bg-[#18191E] dark:hover:bg-neutral-800/80 border border-neutral-200/90 hover:border-neutral-400 dark:border-neutral-800 dark:hover:border-neutral-600 text-xs sm:text-sm font-poppins font-semibold text-neutral-700 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white transition-all shadow-2xs cursor-pointer"
      >
        <HugeiconsIcon :icon="ArrowLeft02Icon" :size="16" :stroke-width="2" />
        <span>Kembali ke Beranda</span>
      </NuxtLink>

      <button
        type="button"
        :disabled="saving"
        class="btn-3d-blue px-5 py-2 sm:py-2.5 text-xs sm:text-sm font-poppins font-semibold shadow-xs cursor-pointer flex items-center gap-2"
        @click="handleSave"
      >
        <HugeiconsIcon :icon="CheckmarkCircle01Icon" :size="16" :stroke-width="2.2" />
        <span>{{ saving ? 'Menyimpan...' : 'Simpan Pengaturan' }}</span>
      </button>
    </div>

    <!-- 2. Editorial Header Banner (GoPay Tactile Card) -->
    <div class="rounded-3xl card-tactile-gopay p-6 sm:p-7 relative overflow-hidden border border-neutral-200/80 dark:border-neutral-800/80 bg-white dark:bg-[#13161F]">
      <!-- Background Ambient Glow -->
      <div class="absolute -right-16 -top-16 w-56 h-56 rounded-full bg-[#2091AA]/10 dark:bg-[#2091AA]/15 blur-3xl pointer-events-none" />
      <div class="absolute right-36 -bottom-16 w-48 h-48 rounded-full bg-[#00AA13]/10 dark:bg-[#00AA13]/10 blur-3xl pointer-events-none" />

      <div class="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div class="space-y-2 max-w-2xl text-left">
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E6F4F7] dark:bg-[#2091AA]/20 text-[#2091AA] dark:text-[#50AABF] text-xs font-poppins font-semibold border border-[#2091AA]/20 dark:border-[#50AABF]/30">
            <HugeiconsIcon :icon="Settings01Icon" :size="14" :stroke-width="2" />
            <span>Pusat Kendali Profil & Keamanan Akun</span>
          </div>

          <h1 class="text-2xl sm:text-3xl font-heading font-bold text-neutral-900 dark:text-white tracking-tight">
            Pengaturan Akun & Preferensi Toko
          </h1>

          <p class="text-sm sm:text-[15px] text-neutral-600 dark:text-neutral-300 font-sans leading-relaxed">
            Kelola rincian identitas tokomu, nomor kontak WhatsApp resmi, nomor rekening bank, serta preferensi keamanan akun.
          </p>
        </div>
      </div>
    </div>

    <!-- Alert Save Success -->
    <div
      v-if="saveMessage"
      class="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-xs sm:text-sm font-poppins font-semibold text-emerald-800 dark:text-emerald-300 flex items-center gap-2 animate-in fade-in"
    >
      <HugeiconsIcon :icon="CheckmarkCircle01Icon" :size="18" class="text-[#00AA13] shrink-0" />
      <span>{{ saveMessage }}</span>
    </div>

    <!-- Alert Error Message -->
    <div
      v-if="errorMessage"
      class="p-4 rounded-2xl bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-800 text-xs sm:text-sm font-poppins font-semibold text-rose-800 dark:text-rose-300 flex items-center gap-2 animate-in fade-in"
    >
      <span class="font-bold text-rose-600">!</span>
      <span>{{ errorMessage }}</span>
    </div>

    <form @submit.prevent="handleSave" class="space-y-6 text-left">
      <!-- Section 1: Informasi Usaha Pokok -->
      <div class="card-tactile-gopay rounded-2xl p-6 sm:p-7 space-y-5 border border-neutral-200/80 dark:border-neutral-800/80">
        <div class="pb-3 border-b border-neutral-100 dark:border-neutral-800/80">
          <h2 class="font-poppins font-bold text-base sm:text-lg text-neutral-900 dark:text-white">
            1. Informasi Usaha & Identitas Toko
          </h2>
          <p class="text-xs text-neutral-500 font-sans mt-0.5">
            Data pokok toko yang tercantum di katalog pencarian investor dan ruang kerja konsultan.
          </p>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-5 font-poppins">
          <div>
            <label class="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1.5">
              Nama Usaha / Brand <span class="text-rose-500">*</span>
            </label>
            <input
              v-model="form.brand"
              type="text"
              required
              placeholder="Contoh: Kopi Senja Nusantara"
              class="w-full px-4 py-2.5 rounded-xl border border-neutral-200/90 dark:border-neutral-700/80 bg-neutral-50 dark:bg-[#18191E] text-sm text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#2091AA]/30 transition-all font-medium"
            />
          </div>

          <div>
            <label class="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1.5">
              Nama Pemilik Usaha <span class="text-rose-500">*</span>
            </label>
            <input
              v-model="form.ownerName"
              type="text"
              required
              placeholder="Contoh: Fikri Setiawan"
              class="w-full px-4 py-2.5 rounded-xl border border-neutral-200/90 dark:border-neutral-700/80 bg-neutral-50 dark:bg-[#18191E] text-sm text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#2091AA]/30 transition-all font-medium"
            />
          </div>

          <div>
            <label class="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1.5">
              Sektor Usaha <span class="text-rose-500">*</span>
            </label>
            <input
              v-model="form.sector"
              type="text"
              required
              placeholder="Contoh: F&B (Kopi & Kuliner)"
              class="w-full px-4 py-2.5 rounded-xl border border-neutral-200/90 dark:border-neutral-700/80 bg-neutral-50 dark:bg-[#18191E] text-sm text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#2091AA]/30 transition-all font-medium"
            />
          </div>

          <div>
            <label class="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1.5">
              Kota / Wilayah Operasional <span class="text-rose-500">*</span>
            </label>
            <input
              v-model="form.city"
              type="text"
              required
              placeholder="Contoh: Bandung, Jawa Barat"
              class="w-full px-4 py-2.5 rounded-xl border border-neutral-200/90 dark:border-neutral-700/80 bg-neutral-50 dark:bg-[#18191E] text-sm text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#2091AA]/30 transition-all font-medium"
            />
          </div>

          <div>
            <label class="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1.5">
              Jumlah Gerai / Outlet
            </label>
            <input
              v-model.number="form.outletsCount"
              type="number"
              min="1"
              class="w-full px-4 py-2.5 rounded-xl border border-neutral-200/90 dark:border-neutral-700/80 bg-neutral-50 dark:bg-[#18191E] text-sm text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#2091AA]/30 transition-all tabular-nums font-medium"
            />
          </div>

          <div>
            <label class="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1.5">
              Jumlah Karyawan
            </label>
            <input
              v-model.number="form.employeesCount"
              type="number"
              min="1"
              class="w-full px-4 py-2.5 rounded-xl border border-neutral-200/90 dark:border-neutral-700/80 bg-neutral-50 dark:bg-[#18191E] text-sm text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#2091AA]/30 transition-all tabular-nums font-medium"
            />
          </div>

          <div class="sm:col-span-2">
            <label class="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1.5">
              Ringkasan Narasi Bisnis (Pitch Singkat)
            </label>
            <textarea
              v-model="form.pitchSummary"
              rows="3"
              placeholder="Ceritakan keunggulan produk, target pasar, atau komitmen mutu tokomu..."
              class="w-full px-4 py-2.5 rounded-xl border border-neutral-200/90 dark:border-neutral-700/80 bg-neutral-50 dark:bg-[#18191E] text-sm text-neutral-900 dark:text-white leading-relaxed focus:outline-none focus:ring-2 focus:ring-[#2091AA]/30 transition-all resize-none font-sans"
            />
          </div>
        </div>
      </div>

      <!-- Section 2: Rekening Bank & Kontak Resmi Usaha -->
      <div class="card-tactile-gopay rounded-2xl p-6 sm:p-7 space-y-5 border border-neutral-200/80 dark:border-neutral-800/80">
        <div class="pb-3 border-b border-neutral-100 dark:border-neutral-800/80">
          <h2 class="font-poppins font-bold text-base sm:text-lg text-neutral-900 dark:text-white">
            2. Rekening Bank & Kontak Resmi Toko
          </h2>
          <p class="text-xs text-neutral-500 font-sans mt-0.5">
            Digunakan untuk transfer pencairan bagi hasil modal usaha dan komunikasi resmi.
          </p>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-5 font-poppins">
          <div>
            <label class="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1.5">
              Nomor WhatsApp Toko
            </label>
            <input
              v-model="form.phone"
              type="text"
              placeholder="0812-3456-7890"
              class="w-full px-4 py-2.5 rounded-xl border border-neutral-200/90 dark:border-neutral-700/80 bg-neutral-50 dark:bg-[#18191E] text-sm text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#2091AA]/30 transition-all tabular-nums font-medium"
            />
          </div>

          <div>
            <label class="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1.5">
              Nama Bank
            </label>
            <input
              v-model="form.bankName"
              type="text"
              placeholder="Contoh: Bank Mandiri / BCA / BRI"
              class="w-full px-4 py-2.5 rounded-xl border border-neutral-200/90 dark:border-neutral-700/80 bg-neutral-50 dark:bg-[#18191E] text-sm text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#2091AA]/30 transition-all font-medium"
            />
          </div>

          <div>
            <label class="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1.5">
              Nomor Rekening Bank
            </label>
            <input
              v-model="form.bankAccountNumber"
              type="text"
              placeholder="Contoh: 1300098765432"
              class="w-full px-4 py-2.5 rounded-xl border border-neutral-200/90 dark:border-neutral-700/80 bg-neutral-50 dark:bg-[#18191E] text-sm text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#2091AA]/30 transition-all tabular-nums font-medium"
            />
          </div>

          <div>
            <label class="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1.5">
              Nama Pemilik Rekening (Sesuai Buku Tabungan)
            </label>
            <input
              v-model="form.bankAccountHolder"
              type="text"
              placeholder="Contoh: Kopi Senja Nusantara"
              class="w-full px-4 py-2.5 rounded-xl border border-neutral-200/90 dark:border-neutral-700/80 bg-neutral-50 dark:bg-[#18191E] text-sm text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#2091AA]/30 transition-all font-medium"
            />
          </div>
        </div>
      </div>

      <!-- Section 3: Preferensi Notifikasi & Peringatan -->
      <div class="card-tactile-gopay rounded-2xl p-6 sm:p-7 space-y-5 border border-neutral-200/80 dark:border-neutral-800/80">
        <div class="pb-3 border-b border-neutral-100 dark:border-neutral-800/80">
          <h2 class="font-poppins font-bold text-base sm:text-lg text-neutral-900 dark:text-white">
            3. Preferensi Notifikasi & Pengingat
          </h2>
          <p class="text-xs text-neutral-500 font-sans mt-0.5">
            Atur notifikasi penting terkait bimbingan kas dan tawaran minat investor.
          </p>
        </div>

        <div class="space-y-3 font-poppins">
          <label class="p-3.5 rounded-xl bg-neutral-50 dark:bg-[#18191E] border border-neutral-200/70 dark:border-neutral-800 flex items-center justify-between cursor-pointer select-none group">
            <div class="flex items-center gap-3">
              <HugeiconsIcon :icon="Notification01Icon" :size="20" class="text-[#2091AA] dark:text-[#50AABF] shrink-0" />
              <div>
                <span class="text-xs sm:text-sm font-semibold text-neutral-900 dark:text-white block">
                  Pengingat Tanggal Pelaporan Kas Bulanan
                </span>
                <span class="text-[11px] text-neutral-500 font-normal">
                  Kirimkan notifikasi setiap tanggal 5 untuk rekonsiliasi kas bersama konsultan pendamping
                </span>
              </div>
            </div>
            <input
              v-model="preferences.notifyMonthlyReport"
              type="checkbox"
              class="w-5 h-5 rounded-md accent-[#2091AA] cursor-pointer"
            />
          </label>

          <label class="p-3.5 rounded-xl bg-neutral-50 dark:bg-[#18191E] border border-neutral-200/70 dark:border-neutral-800 flex items-center justify-between cursor-pointer select-none group">
            <div class="flex items-center gap-3">
              <HugeiconsIcon :icon="UserGroupIcon" :size="20" class="text-[#00AA13] shrink-0" />
              <div>
                <span class="text-xs sm:text-sm font-semibold text-neutral-900 dark:text-white block">
                  Pemberitahuan Surat Minat Investor Baru
                </span>
                <span class="text-[11px] text-neutral-500 font-normal">
                  Beritahu segera saat ada investor terakreditasi mengajukan minat tiket modal usaha
                </span>
              </div>
            </div>
            <input
              v-model="preferences.notifyInvestorRequests"
              type="checkbox"
              class="w-5 h-5 rounded-md accent-[#00AA13] cursor-pointer"
            />
          </label>
        </div>
      </div>

      <!-- Section 4: Keamanan & Ganti Kata Sandi Akun -->
      <div class="card-tactile-gopay rounded-2xl p-6 sm:p-7 space-y-5 border border-neutral-200/80 dark:border-neutral-800/80">
        <div class="pb-3 border-b border-neutral-100 dark:border-neutral-800/80">
          <h2 class="font-poppins font-bold text-base sm:text-lg text-neutral-900 dark:text-white">
            4. Keamanan Akun (Ganti Kata Sandi)
          </h2>
          <p class="text-xs text-neutral-500 font-sans mt-0.5">
            Biarkan kosong jika tidak ingin mengubah kata sandi akunmu saat ini.
          </p>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 font-poppins">
          <div>
            <label class="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1.5">
              Kata Sandi Saat Ini
            </label>
            <input
              v-model="passwordForm.currentPassword"
              type="password"
              placeholder="••••••••"
              class="w-full px-4 py-2.5 rounded-xl border border-neutral-200/90 dark:border-neutral-700/80 bg-neutral-50 dark:bg-[#18191E] text-sm text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#2091AA]/30 transition-all font-medium"
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
              class="w-full px-4 py-2.5 rounded-xl border border-neutral-200/90 dark:border-neutral-700/80 bg-neutral-50 dark:bg-[#18191E] text-sm text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#2091AA]/30 transition-all font-medium"
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
              class="w-full px-4 py-2.5 rounded-xl border border-neutral-200/90 dark:border-neutral-700/80 bg-neutral-50 dark:bg-[#18191E] text-sm text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#2091AA]/30 transition-all font-medium"
            />
          </div>
        </div>
      </div>

      <!-- Action Footer -->
      <div class="flex justify-end gap-3 pt-2">
        <button
          type="submit"
          :disabled="saving"
          class="btn-3d-blue px-7 py-3 text-sm font-poppins font-bold shadow-xs cursor-pointer flex items-center gap-2"
        >
          <HugeiconsIcon :icon="CheckmarkCircle01Icon" :size="18" :stroke-width="2.2" />
          <span>{{ saving ? 'Menyimpan Perubahan...' : 'Simpan Seluruh Pengaturan' }}</span>
        </button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useAuthStore } from '~/stores/auth'
import { useUmkmStore } from '~/stores/umkm'
import { useApi } from '~/composables/useApi'
import { HugeiconsIcon } from '@hugeicons/vue'
import {
  Settings01Icon,
  Notification01Icon,
  UserGroupIcon,
  CheckmarkCircle01Icon,
  ArrowLeft02Icon
} from '@hugeicons/core-free-icons'

definePageMeta({
  layout: 'dashboard'
})

const authStore = useAuthStore()
const umkmStore = useUmkmStore()

const saving = ref(false)
const saveMessage = ref('')
const errorMessage = ref('')

const form = ref({
  brand: '',
  ownerName: '',
  sector: '',
  city: '',
  outletsCount: 1,
  employeesCount: 5,
  pitchSummary: '',
  phone: '',
  bankName: 'Bank Mandiri',
  bankAccountNumber: '',
  bankAccountHolder: '',
  nib: '',
  npwp: ''
})

const preferences = ref({
  notifyMonthlyReport: true,
  notifyInvestorRequests: true
})

const passwordForm = ref({
  currentPassword: '',
  newPassword: '',
  confirmPassword: ''
})

async function fetchProfileData() {
  try {
    const res = await useApi<any>('/user/profile')
    if (res?.success && res.data) {
      const u = res.data
      const bp = u.businessProfile || {}

      form.value.brand = bp.brand || bp.name || umkmStore.profile.name || 'Kopi Senja Nusantara'
      form.value.ownerName = bp.ownerName || u.name || 'Fikri Setiawan'
      form.value.sector = bp.sector || umkmStore.profile.sector || 'F&B (Coffee & Drinks)'
      form.value.city = bp.city || umkmStore.profile.city || 'Bandung'
      form.value.outletsCount = bp.outletsCount || 3
      form.value.employeesCount = bp.employeesCount || 10
      form.value.pitchSummary = bp.description || umkmStore.profile.pitchSummary || ''
      form.value.phone = u.phone || '0812-9876-5432'
      form.value.bankName = bp.bankName || 'Bank Central Asia'
      form.value.bankAccountNumber = bp.bankAccountNumber || '8001234567'
      form.value.bankAccountHolder = bp.bankAccountHolder || form.value.ownerName
      form.value.nib = bp.nib || '1209000123456'
      form.value.npwp = bp.npwp || '81.423.891.4-429.000'

      if (u.preferences) {
        preferences.value.notifyMonthlyReport = u.preferences.notifyMonthlyReport ?? true
        preferences.value.notifyInvestorRequests = u.preferences.notifyInvestorRequests ?? true
      }
    }
  } catch (err: any) {
    console.warn('Gagal memuat profil live, memuat fallback lokal:', err?.message)
    form.value.brand = umkmStore.profile.name || 'Kopi Senja Nusantara'
    form.value.ownerName = umkmStore.profile.ownerName || 'Fikri Setiawan'
    form.value.sector = umkmStore.profile.sector || 'F&B (Coffee & Drinks)'
    form.value.city = umkmStore.profile.city || 'Bandung'
    form.value.pitchSummary = umkmStore.profile.pitchSummary || ''
  }
}

onMounted(() => {
  fetchProfileData()
})

async function handleSave() {
  saving.value = true
  saveMessage.value = ''
  errorMessage.value = ''

  try {
    // 1. Simpan profil & preferensi ke live backend API
    const res = await useApi<any>('/user/profile', {
      method: 'PUT',
      body: {
        name: form.value.ownerName,
        phone: form.value.phone,
        businessName: form.value.brand,
        ownerName: form.value.ownerName,
        sector: form.value.sector,
        city: form.value.city,
        outletsCount: form.value.outletsCount,
        employeesCount: form.value.employeesCount,
        pitchSummary: form.value.pitchSummary,
        bankName: form.value.bankName,
        bankAccountNumber: form.value.bankAccountNumber,
        bankAccountHolder: form.value.bankAccountHolder,
        preferences: preferences.value
      }
    })

    // 2. Ganti kata sandi bila diisi
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

    // 3. Sinkronkan ke umkmStore & authStore
    umkmStore.profile.name = form.value.brand
    umkmStore.profile.brand = form.value.brand
    umkmStore.profile.ownerName = form.value.ownerName
    umkmStore.profile.sector = form.value.sector
    umkmStore.profile.city = form.value.city
    umkmStore.profile.pitchSummary = form.value.pitchSummary

    if (authStore.currentUser) {
      authStore.currentUser.name = form.value.ownerName
      authStore.currentUser.phone = form.value.phone
    }

    saveMessage.value = res?.message || 'Pengaturan akun dan preferensi toko berhasil disimpan!'
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
