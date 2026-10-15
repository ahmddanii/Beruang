<template>
  <div class="space-y-8 pb-16 font-sans text-neutral-900 dark:text-neutral-100">
    <!-- Breadcrumb Back Navigation -->
    <div class="flex items-center gap-2">
      <NuxtLink
        to="/dashboard"
        class="inline-flex items-center gap-1.5 text-xs sm:text-sm font-poppins font-medium text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white transition-colors group"
      >
        <HugeiconsIcon :icon="ArrowLeft02Icon" :size="15" :stroke-width="2" class="transition-transform group-hover:-translate-x-0.5" />
        <span>Kembali ke Beranda</span>
      </NuxtLink>
    </div>

    <!-- Header Page Navigation -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-neutral-200/80 dark:border-neutral-800/80">
      <div>
        <div class="flex items-center gap-2.5">
          <h1 class="text-2xl sm:text-3xl font-heading font-bold text-neutral-900 dark:text-white tracking-tight">
            Profil Usaha
          </h1>
          <span class="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-poppins font-medium bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
            <HugeiconsIcon :icon="CheckmarkCircle01Icon" :size="13" />
            <span>Aktif</span>
          </span>
        </div>
        <p class="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 mt-1 font-sans leading-relaxed">
          Kelola banner visual toko, foto profil pemilik usaha, dan kelengkapan identitas bisnis tokomu.
        </p>
      </div>

      <div class="flex items-center gap-2.5 shrink-0">
        <NuxtLink
          to="/dashboard"
          class="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white hover:bg-neutral-100/80 dark:bg-[#18191E] dark:hover:bg-neutral-800/80 border border-neutral-200/90 hover:border-neutral-400 dark:border-neutral-800 dark:hover:border-neutral-600 text-xs sm:text-sm font-poppins font-semibold text-neutral-700 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white transition-all shadow-2xs active:scale-95 cursor-pointer"
        >
          <HugeiconsIcon :icon="ArrowLeft02Icon" :size="16" :stroke-width="2" />
          <span>Kembali ke Beranda</span>
        </NuxtLink>
        <button
          type="button"
          class="btn-3d-blue px-5 py-2.5 text-xs sm:text-sm font-poppins font-semibold active:scale-95 cursor-pointer"
          @click="saveProfile"
        >
          <HugeiconsIcon :icon="CheckmarkCircle01Icon" :size="16" />
          <span>Simpan Perubahan</span>
        </button>
      </div>
    </div>

    <!-- 1. Store Banner & Circular Profile Avatar Hero Component -->
    <div class="relative z-20">
      <BStoreBanner
        :store-name="formProfile.name"
        :owner-name="ownerFirstName"
        :owner-avatar-url="umkmStore.profile.ownerAvatarUrl || authStore.currentUser?.avatar || '/images/user-profile.png'"
        :banner-url="umkmStore.profile.bannerUrl"
        @update:banner-url="onBannerUpdated"
        @reset:banner-url="onBannerReset"
        @update:owner-avatar-url="onAvatarUpdated"
        @reset:owner-avatar-url="onAvatarReset"
      />
    </div>

    <!-- Visual Assets Guidance Cards -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 -mt-8 sm:-mt-12 relative z-10">
      <div class="p-4 sm:p-5 rounded-2xl bg-white dark:bg-[#15161A] border border-neutral-200/90 dark:border-neutral-800 shadow-2xs flex items-start gap-3.5">
        <div class="w-9 h-9 rounded-xl bg-blue-500/10 text-primary-500 dark:text-blue-400 flex items-center justify-center shrink-0 border border-blue-500/20 mt-0.5">
          <HugeiconsIcon :icon="Camera01Icon" :size="18" />
        </div>
        <div class="space-y-1">
          <h4 class="text-sm font-poppins font-semibold text-neutral-900 dark:text-white">
            Banner Toko (Landscape)
          </h4>
          <p class="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed font-sans">
            Klik tombol kamera di sudut kanan atas banner untuk mengunggah gambar. Disarankan rasio 16:9 atau resolusi minimal 1200 × 400 px format JPG, PNG, atau WebP (maks. 5 MB).
          </p>
        </div>
      </div>

      <div class="p-4 sm:p-5 rounded-2xl bg-white dark:bg-[#15161A] border border-neutral-200/90 dark:border-neutral-800 shadow-2xs flex items-start gap-3.5">
        <div class="w-9 h-9 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-500/20 mt-0.5">
          <HugeiconsIcon :icon="UserCircleIcon" :size="18" />
        </div>
        <div class="space-y-1">
          <h4 class="text-sm font-poppins font-semibold text-neutral-900 dark:text-white">
            Foto Profil / Logo Brand (Lingkaran)
          </h4>
          <p class="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed font-sans">
            Klik ikon kamera pada lingkaran foto profil untuk mengganti foto pemilik atau logo resmi tokomu. Dilengkapi fitur zoom dan pemotong lingkaran (*cropper*).
          </p>
        </div>
      </div>
    </div>

    <!-- 2. Form Kelengkapan Data Usaha -->
    <div class="space-y-6">
      <!-- Section A: Data Utama Toko -->
      <div class="p-6 sm:p-7 rounded-2xl bg-white dark:bg-[#15161A] border border-neutral-200/90 dark:border-neutral-800 shadow-2xs space-y-6">
        <div class="pb-4 border-b border-neutral-100 dark:border-neutral-800/80">
          <h2 class="text-lg font-poppins font-semibold text-neutral-900 dark:text-white">
            Informasi Usaha & Brand
          </h2>
          <p class="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5 font-sans">
            Data identitas bisnis yang ditampilkan pada ekosistem Beruang dan laporan kesiapan pendanaan.
          </p>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label class="block text-xs font-poppins font-semibold text-neutral-700 dark:text-neutral-300 mb-2">
              Nama Usaha / Brand UMKM
            </label>
            <input
              v-model="formProfile.name"
              type="text"
              class="w-full px-4 py-2.5 rounded-xl border border-neutral-200/90 dark:border-neutral-700/80 bg-neutral-50/50 dark:bg-neutral-900/60 text-sm font-poppins text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-colors"
              placeholder="Contoh: Kopi Senja Nusantara"
            />
          </div>

          <div>
            <label class="block text-xs font-poppins font-semibold text-neutral-700 dark:text-neutral-300 mb-2">
              Nama Pemilik Usaha
            </label>
            <input
              v-model="formProfile.ownerName"
              type="text"
              class="w-full px-4 py-2.5 rounded-xl border border-neutral-200/90 dark:border-neutral-700/80 bg-neutral-50/50 dark:bg-neutral-900/60 text-sm font-poppins text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-colors"
              placeholder="Contoh: Fikri Setiawan"
            />
          </div>

          <div>
            <label class="block text-xs font-poppins font-semibold text-neutral-700 dark:text-neutral-300 mb-2">
              Sektor Industri
            </label>
            <select
              v-model="formProfile.sector"
              class="w-full px-4 py-2.5 rounded-xl border border-neutral-200/90 dark:border-neutral-700/80 bg-neutral-50/50 dark:bg-neutral-900/60 text-sm font-poppins text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-colors cursor-pointer"
            >
              <option value="Kuliner & Minuman (F&B)">Kuliner & Minuman (F&B)</option>
              <option value="Retail & Toko Kelontong">Retail & Toko Kelontong</option>
              <option value="Jasa & Layanan">Jasa & Layanan</option>
              <option value="Fashion & Konveksi">Fashion & Konveksi</option>
              <option value="Agribisnis & Pertanian">Agribisnis & Pertanian</option>
              <option value="Kerajinan & Kriya">Kerajinan & Kriya</option>
            </select>
          </div>

          <div>
            <label class="block text-xs font-poppins font-semibold text-neutral-700 dark:text-neutral-300 mb-2">
              Kota / Lokasi Operasional
            </label>
            <input
              v-model="formProfile.city"
              type="text"
              class="w-full px-4 py-2.5 rounded-xl border border-neutral-200/90 dark:border-neutral-700/80 bg-neutral-50/50 dark:bg-neutral-900/60 text-sm font-poppins text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-colors"
              placeholder="Contoh: Bandung, Jawa Barat"
            />
          </div>

          <div>
            <label class="block text-xs font-poppins font-semibold text-neutral-700 dark:text-neutral-300 mb-2">
              Tahun Berdiri
            </label>
            <input
              v-model.number="formProfile.establishedYear"
              type="number"
              class="w-full px-4 py-2.5 rounded-xl border border-neutral-200/90 dark:border-neutral-700/80 bg-neutral-50/50 dark:bg-neutral-900/60 text-sm font-poppins text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-colors tabular-nums"
            />
          </div>

          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="block text-xs font-poppins font-semibold text-neutral-700 dark:text-neutral-300 mb-2">
                Jumlah Gerai
              </label>
              <input
                v-model.number="formProfile.outletsCount"
                type="number"
                class="w-full px-4 py-2.5 rounded-xl border border-neutral-200/90 dark:border-neutral-700/80 bg-neutral-50/50 dark:bg-neutral-900/60 text-sm font-poppins text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-colors tabular-nums"
              />
            </div>
            <div>
              <label class="block text-xs font-poppins font-semibold text-neutral-700 dark:text-neutral-300 mb-2">
                Jumlah Tim
              </label>
              <input
                v-model.number="formProfile.employeesCount"
                type="number"
                class="w-full px-4 py-2.5 rounded-xl border border-neutral-200/90 dark:border-neutral-700/80 bg-neutral-50/50 dark:bg-neutral-900/60 text-sm font-poppins text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-colors tabular-nums"
              />
            </div>
          </div>
        </div>

        <div>
          <div class="flex items-center justify-between mb-2">
            <label class="block text-xs font-poppins font-semibold text-neutral-700 dark:text-neutral-300">
              Deskripsi Profil Usaha & Narasi Bisnis
            </label>
            <span
              class="text-xs font-poppins tabular-nums"
              :class="formProfile.description.length > 350 ? 'text-red-500 font-semibold' : 'text-neutral-400'"
            >
              {{ formProfile.description.length }} / 350 Karakter
            </span>
          </div>
          <textarea
            v-model="formProfile.description"
            rows="3"
            maxlength="350"
            class="w-full px-4 py-3 rounded-xl border border-neutral-200/90 dark:border-neutral-700/80 bg-neutral-50/50 dark:bg-neutral-900/60 text-sm font-poppins text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-colors resize-none leading-relaxed"
            placeholder="Jelaskan spesialisasi produk, keunggulan toko, dan fokus ekspansi tokomu..."
          />
        </div>
      </div>

      <!-- Section B: Data Legalitas & Verifikasi Konsultan -->
      <div class="p-6 sm:p-7 rounded-2xl bg-white dark:bg-[#15161A] border border-neutral-200/90 dark:border-neutral-800 shadow-2xs space-y-6">
        <div class="pb-4 border-b border-neutral-100 dark:border-neutral-800/80">
          <h2 class="text-lg font-poppins font-semibold text-neutral-900 dark:text-white">
            Legalitas & Kesiapan Akses Modal
          </h2>
          <p class="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5 font-sans">
            Dokumen resmi yang menjadi prasyarat audit telemetri Beruang dan investor terakreditasi.
          </p>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label class="block text-xs font-poppins font-semibold text-neutral-700 dark:text-neutral-300 mb-2">
              Nomor Induk Berusaha (NIB OSS RBA)
            </label>
            <input
              v-model="formProfile.nib"
              type="text"
              class="w-full px-4 py-2.5 rounded-xl border border-neutral-200/90 dark:border-neutral-700/80 bg-neutral-50/50 dark:bg-neutral-900/60 text-sm font-poppins text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-colors tabular-nums"
              placeholder="Contoh: 1209000123456"
            />
          </div>

          <div>
            <label class="block text-xs font-poppins font-semibold text-neutral-700 dark:text-neutral-300 mb-2">
              Nomor Pokok Wajib Pajak (NPWP)
            </label>
            <input
              v-model="formProfile.npwp"
              type="text"
              class="w-full px-4 py-2.5 rounded-xl border border-neutral-200/90 dark:border-neutral-700/80 bg-neutral-50/50 dark:bg-neutral-900/60 text-sm font-poppins text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-colors tabular-nums"
              placeholder="Contoh: 81.423.891.4-429.000"
            />
          </div>

          <div>
            <label class="block text-xs font-poppins font-semibold text-neutral-700 dark:text-neutral-300 mb-2">
              Konsultan Pendamping
            </label>
            <input
              :value="umkmStore.profile.consultantName || 'Dra. Maya Suryani, M.M.'"
              type="text"
              disabled
              class="w-full px-4 py-2.5 rounded-xl border border-neutral-200/70 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-800/50 text-sm font-poppins text-neutral-500 dark:text-neutral-400 cursor-not-allowed"
            />
          </div>

          <div>
            <label class="block text-xs font-poppins font-semibold text-neutral-700 dark:text-neutral-300 mb-2">
              Target Kebutuhan Pendanaan
            </label>
            <div class="relative">
              <span class="absolute left-4 top-1/2 -translate-y-1/2 text-sm font-poppins font-medium text-neutral-400">
                Rp
              </span>
              <input
                v-model.number="formProfile.fundingTarget"
                type="number"
                class="w-full pl-11 pr-4 py-2.5 rounded-xl border border-neutral-200/90 dark:border-neutral-700/80 bg-neutral-50/50 dark:bg-neutral-900/60 text-sm font-poppins text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-colors tabular-nums"
              />
            </div>
          </div>
        </div>

        <div class="pt-4 border-t border-neutral-100 dark:border-neutral-800/80 flex items-center justify-end gap-3">
          <NuxtLink
            to="/dashboard"
            class="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-neutral-200/90 dark:border-neutral-800 hover:border-neutral-400 dark:hover:border-neutral-600 bg-white dark:bg-[#18191E] text-xs sm:text-sm font-poppins font-semibold text-neutral-700 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white transition-all shadow-2xs active:scale-[0.97]"
          >
            <HugeiconsIcon :icon="ArrowLeft02Icon" :size="15" :stroke-width="2" />
            <span>Kembali ke Beranda</span>
          </NuxtLink>
          <button
            type="button"
            class="btn-3d-blue px-6 py-2.5 text-xs sm:text-sm font-poppins font-semibold active:scale-[0.97] flex items-center gap-2 cursor-pointer"
            @click="saveProfile"
          >
            <HugeiconsIcon :icon="CheckmarkCircle01Icon" :size="16" />
            <span>Simpan Perubahan</span>
          </button>
        </div>
      </div>
    </div>

    <!-- Floating Success Toast Notification -->
    <Teleport to="body">
      <transition
        enter-active-class="transition-all duration-300 ease-out"
        enter-from-class="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
        enter-to-class="opacity-100 translate-y-0 sm:scale-100"
        leave-active-class="transition-all duration-200 ease-in"
        leave-from-class="opacity-100 translate-y-0 sm:scale-100"
        leave-to-class="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
      >
        <div
          v-if="showToastSuccess"
          class="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-4 py-3 rounded-2xl bg-neutral-900/95 dark:bg-white text-white dark:text-neutral-900 shadow-xl border border-neutral-800 dark:border-neutral-200 backdrop-blur-md"
        >
          <div class="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 dark:text-emerald-600 flex items-center justify-center shrink-0">
            <HugeiconsIcon :icon="CheckmarkCircle01Icon" :size="15" />
          </div>
          <span class="text-xs sm:text-sm font-poppins font-medium">
            Profil dan identitas visual berhasil diperbarui!
          </span>
        </div>
      </transition>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted } from 'vue'
import { HugeiconsIcon } from '@hugeicons/vue'
import {
  CheckmarkCircle01Icon,
  Camera01Icon,
  UserCircleIcon,
  ArrowLeft02Icon
} from '@hugeicons/core-free-icons'
import { useAuthStore } from '~/stores/auth'
import { useUmkmStore } from '~/stores/umkm'
import BStoreBanner from '~/components/base/BStoreBanner.vue'

definePageMeta({
  layout: 'dashboard'
})

const authStore = useAuthStore()
const umkmStore = useUmkmStore()

const showToastSuccess = ref(false)

const ownerFirstName = computed(() => {
  const name = authStore.currentUser?.name || umkmStore.profile.ownerName || 'Fikri'
  return name.split(' ')[0]
})

const formProfile = reactive({
  name: umkmStore.profile.name || 'Kopi Senja Nusantara',
  ownerName: umkmStore.profile.ownerName || 'Fikri Setiawan',
  sector: umkmStore.profile.sector || 'Kuliner & Minuman (F&B)',
  city: umkmStore.profile.city || 'Bandung, Jawa Barat',
  establishedYear: umkmStore.profile.establishedYear || 2021,
  outletsCount: umkmStore.profile.outletsCount || 3,
  employeesCount: umkmStore.profile.employeesCount || 14,
  fundingTarget: umkmStore.profile.fundingTarget || 250000000,
  description: umkmStore.profile.description || umkmStore.profile.pitchSummary || '',
  nib: umkmStore.profile.nib || '1209000123456',
  npwp: umkmStore.profile.npwp || '81.423.891.4-429.000'
})

function onBannerUpdated(newUrl: string) {
  umkmStore.updateProfileBanner(newUrl)
  triggerToast()
}

function onBannerReset() {
  umkmStore.resetProfileBanner()
  triggerToast()
}

function onAvatarUpdated(newUrl: string) {
  umkmStore.updateOwnerAvatar(newUrl)
  authStore.updateAvatar(newUrl)
  triggerToast()
}

function onAvatarReset() {
  umkmStore.resetOwnerAvatar()
  authStore.updateAvatar('/images/user-profile.png')
  triggerToast()
}

function saveProfile() {
  umkmStore.profile.name = formProfile.name.trim() || 'Kopi Senja Nusantara'
  umkmStore.profile.ownerName = formProfile.ownerName.trim() || 'Fikri Setiawan'
  umkmStore.profile.sector = formProfile.sector
  umkmStore.profile.city = formProfile.city.trim()
  umkmStore.profile.establishedYear = formProfile.establishedYear
  umkmStore.profile.outletsCount = formProfile.outletsCount
  umkmStore.profile.employeesCount = formProfile.employeesCount
  umkmStore.profile.fundingTarget = formProfile.fundingTarget
  umkmStore.profile.description = formProfile.description.trim()
  umkmStore.profile.pitchSummary = formProfile.description.trim()
  umkmStore.profile.nib = formProfile.nib.trim()
  umkmStore.profile.npwp = formProfile.npwp.trim()

  if (authStore.currentUser) {
    authStore.currentUser.businessName = formProfile.name.trim()
    authStore.currentUser.name = formProfile.ownerName.trim()
  }

  // Persist to localStorage
  if (typeof localStorage !== 'undefined') {
    localStorage.setItem('umkm_profile_name', formProfile.name)
    localStorage.setItem('umkm_profile_desc', formProfile.description)
  }

  triggerToast()
}

function triggerToast() {
  showToastSuccess.value = true
  setTimeout(() => {
    showToastSuccess.value = false
  }, 3000)
}

onMounted(() => {
  umkmStore.initBannerFromStorage()
  umkmStore.initAvatarFromStorage()
  umkmStore.initQuickProfileFromStorage()

  formProfile.name = umkmStore.profile.name
  formProfile.ownerName = umkmStore.profile.ownerName
  formProfile.description = umkmStore.profile.description || umkmStore.profile.pitchSummary
})
</script>
