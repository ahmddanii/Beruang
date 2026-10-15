<template>
  <div class="h-screen h-dvh w-full bg-[#FAFAFA] dark:bg-[#0F1014] text-neutral-900 dark:text-neutral-100 flex flex-col justify-center items-center px-4 py-4 sm:px-6 select-none relative overflow-hidden font-sans">
    
    <!-- Subtle Ambient Background Glow -->
    <div class="pointer-events-none absolute top-1/4 left-1/2 -translate-x-1/2 w-[520px] h-[520px] bg-primary-500/4 dark:bg-primary-500/8 rounded-full blur-3xl" />

    <!-- Atmospheric Layered Cloud Overlay -->
    <BCloudBackground />

    <!-- ===================================================================== -->
    <!-- TOP-LEFT: Pill Button "Kembali ke Beranda"                            -->
    <!-- ===================================================================== -->
    <div class="absolute top-6 left-6 sm:top-8 sm:left-8 z-20">
      <NuxtLink
        to="/"
        class="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white dark:bg-[#18191E] border border-[#EAEAEA] dark:border-[#26272F] text-neutral-800 dark:text-neutral-200 text-xs sm:text-sm font-semibold shadow-xs hover:bg-neutral-50 dark:hover:bg-[#22252E] hover:border-neutral-300 dark:hover:border-neutral-700 transition-colors duration-150"
      >
        <HugeiconsIcon :icon="ArrowLeft02Icon" :size="16" :stroke-width="2.2" />
        <span>Kembali ke Beranda</span>
      </NuxtLink>
    </div>

    <!-- ===================================================================== -->
    <!-- CENTER: Floating Lottie with Registration Action Stack                -->
    <!-- ===================================================================== -->
    <main class="relative z-10 w-full max-w-lg mx-auto flex flex-col items-center text-center my-auto py-2">
      
      <!-- 1. Lottie Animation Hero -->
      <div class="relative flex flex-col items-center">
        <div class="w-[190px] h-[190px] sm:w-[220px] sm:h-[220px] md:w-[240px] md:h-[240px] max-h-[26vh] relative flex items-center justify-center">
          <BLottiePlayer
            :src="lottieAnimationUrl"
            :autoplay="true"
            :loop="true"
            class="w-full h-full"
          />
        </div>
      </div>

      <!-- 2. Welcoming Sapaan & Subtitle -->
      <div class="space-y-1 mb-3 sm:mb-4">
        <h1 class="text-2xl sm:text-3xl md:text-3xl lg:text-[32px] font-extrabold text-neutral-900 dark:text-white tracking-tight leading-tight">
          Mulai Perjalanan Bisnismu
        </h1>
        <p class="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed max-w-sm mx-auto">
          Daftarkan akun dan pilih peranmu dalam ekosistem Beruang.
        </p>
      </div>

      <!-- 3. Action Stack (Role Tab + Google OAuth + WhatsApp) -->
      <div class="w-full max-w-sm space-y-2.5">
        
        <!-- Role Selector Pill Segment -->
        <div class="space-y-1">
          <div class="p-1 rounded-full bg-neutral-100/90 dark:bg-neutral-850/80 border border-neutral-200/80 dark:border-neutral-700/70 grid grid-cols-3 gap-1">
            <button
              v-for="r in roleCards"
              :key="r.key"
              type="button"
              :class="[
                'flex items-center justify-center gap-1.5 py-2 px-2 rounded-full text-xs transition-all duration-150 cursor-pointer select-none',
                selectedRole === r.key
                  ? 'bg-white dark:bg-[#18191E] text-primary-600 dark:text-primary-400 font-bold shadow-2xs'
                  : 'text-neutral-500 dark:text-neutral-400 font-medium hover:text-neutral-900 dark:hover:text-white'
              ]"
              @click="onRoleTabClick(r.key)"
            >
              <HugeiconsIcon :icon="r.icon" :size="14" :stroke-width="selectedRole === r.key ? 2.2 : 1.8" />
              <span class="truncate">{{ r.shortTitle }}</span>
            </button>
          </div>
          <!-- Role Context Micro Caption -->
          <p class="text-[11px] text-neutral-500 dark:text-neutral-400 font-medium">
            {{ activeRoleMeta?.desc }}
          </p>
        </div>

        <!-- Button 1: Register with Google OAuth -->
        <button
          type="button"
          :disabled="loading"
          class="w-full flex items-center justify-center gap-3 h-12 px-6 rounded-full bg-white dark:bg-[#18191E] border border-[#EAEAEA] dark:border-[#26272F] text-neutral-900 dark:text-white font-bold text-sm shadow-xs hover:bg-neutral-50 dark:hover:bg-[#22252E] hover:border-neutral-300 dark:hover:border-neutral-700 transition-colors duration-150 active:scale-[0.99] cursor-pointer"
          @click="handleGoogleRegister"
        >
          <svg class="w-5 h-5 shrink-0" viewBox="0 0 24 24">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05" />
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335" />
          </svg>
          <span>Daftar sebagai {{ activeRoleMeta.shortTitle }} (Google)</span>
        </button>

        <!-- Button 2: Register with WhatsApp -->
        <button
          type="button"
          :disabled="loading"
          class="w-full flex items-center justify-center gap-3 h-12 px-6 rounded-full bg-primary-500 hover:bg-primary-600 text-white font-bold text-sm shadow-sm shadow-primary-500/20 transition-colors duration-150 active:scale-[0.99] cursor-pointer"
          @click="openPhoneModal = true"
        >
          <HugeiconsIcon :icon="Call02Icon" :size="18" :stroke-width="2" />
          <span>Daftar dengan WhatsApp</span>
        </button>

        <!-- Centered Login Link directly below WhatsApp button -->
        <div class="text-center pt-2">
          <span class="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400">
            Sudah memiliki akun?
          </span>
          <NuxtLink
            to="/masuk"
            class="text-xs sm:text-sm font-bold text-primary-600 hover:text-primary-500 dark:text-primary-400 dark:hover:text-primary-300 transition-colors duration-150 ml-1.5"
          >
            Masuk di Sini
          </NuxtLink>
        </div>
      </div>

      <!-- Loading / Feedback Badge -->
      <div v-if="loadingMessage" class="mt-4 px-5 py-2.5 rounded-full bg-emerald-500 text-white font-bold text-sm shadow-sm animate-pulse">
        {{ loadingMessage }}
      </div>

    </main>

    <!-- ===================================================================== -->
    <!-- ROLE-SPECIFIC WHATSAPP REGISTRATION MODAL                             -->
    <!-- ===================================================================== -->
    <BModal
      v-model="openPhoneModal"
      size="md"
      :title="otpStep === 'input' ? modalTitle : 'Verifikasi Kode Masuk'"
      :hide-divider="true"
    >
      <!-- Custom Header Slot with Brand Icon Badge -->
      <template #header="{ close }">
        <div class="flex items-start gap-3.5 flex-1 pr-1">
          <div class="w-10 h-10 rounded-2xl bg-primary-50 dark:bg-primary-950/70 border border-primary-100 dark:border-primary-900/60 flex items-center justify-center text-primary-600 dark:text-primary-400 shrink-0 shadow-2xs mt-0.5">
            <HugeiconsIcon :icon="activeRoleMeta.icon" :size="20" :stroke-width="2.2" />
          </div>
          <div class="min-w-0 flex-1 text-left">
            <h3 class="font-extrabold text-lg sm:text-xl text-neutral-900 dark:text-white tracking-tight leading-snug">
              {{ otpStep === 'input' ? modalTitle : 'Verifikasi Kode Masuk' }}
            </h3>
            <p class="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
              {{ otpStep === 'input' ? modalSubtitle : `Kode 4 angka sudah dikirim ke +62 ${cleanPhone}` }}
            </p>
          </div>
        </div>
      </template>

      <!-- STEP 1: Registration Form Input (Role Tailored) -->
      <div v-if="otpStep === 'input'" class="space-y-3.5 pt-1 pb-1 text-left">
        
        <!-- Role Indicator & Toggle in Modal -->
        <div class="space-y-1">
          <label class="block text-[11px] font-bold text-neutral-500 dark:text-neutral-400">
            Peran Akun
          </label>
          <div class="grid grid-cols-3 gap-2">
            <button
              v-for="r in roleCards"
              :key="r.key"
              type="button"
              :class="[
                'py-2 px-2 rounded-xl border text-center transition-all duration-150 cursor-pointer flex flex-col items-center justify-center gap-1',
                selectedRole === r.key
                  ? 'bg-primary-50 dark:bg-primary-950/70 border-primary-500/60 text-primary-700 dark:text-primary-300 shadow-2xs ring-1 ring-primary-500/30'
                  : 'bg-white dark:bg-[#18191E] border-neutral-200/80 dark:border-neutral-700/60 text-neutral-700 dark:text-neutral-300 hover:border-neutral-300 dark:hover:border-neutral-600'
              ]"
              @click="onRoleTabClick(r.key)"
            >
              <HugeiconsIcon :icon="r.icon" :size="16" :stroke-width="1.8" />
              <span class="text-xs font-bold">{{ r.shortTitle }}</span>
            </button>
          </div>
        </div>

        <!-- Phone Input Group -->
        <div class="space-y-1.5 pt-0.5">
          <div class="flex items-center justify-between">
            <label for="regPhone" class="block text-xs font-bold uppercase tracking-wider text-neutral-600 dark:text-neutral-400">
              Nomor WhatsApp / Handphone
            </label>
            <span class="text-[11px] text-neutral-400">Format: 8xx-xxxx-xxxx</span>
          </div>

          <div
            :class="[
              'relative flex items-center p-1.5 rounded-2xl border transition-all duration-200 bg-neutral-50/70 dark:bg-[#15161A]',
              phoneValidationError
                ? 'border-danger/80 ring-2 ring-danger/15'
                : isPhoneValid
                  ? 'border-emerald-500/70 ring-2 ring-emerald-500/15'
                  : 'border-neutral-200/90 dark:border-neutral-800 focus-within:border-primary-500 focus-within:ring-2 focus-within:ring-primary-500/20'
            ]"
          >
            <div class="flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-white dark:bg-[#1A1C23] border border-neutral-200/80 dark:border-neutral-700/70 text-neutral-800 dark:text-neutral-200 font-bold text-sm shadow-2xs select-none shrink-0">
              <span class="text-base leading-none">🇮🇩</span>
              <span>+62</span>
            </div>

            <input
              id="regPhone"
              :value="phoneInput"
              type="tel"
              required
              autocomplete="tel-national"
              inputmode="numeric"
              placeholder="812-3456-7890"
              class="w-full px-3 py-2 bg-transparent text-neutral-900 dark:text-white placeholder:text-neutral-350 dark:placeholder:text-neutral-600 text-lg sm:text-xl font-bold tracking-wide focus:outline-none tabular-nums"
              @input="onPhoneInput"
              @keydown="onPhoneKeydown"
              @keydown.enter="requestOtp"
            />
          </div>

          <div class="px-1 min-h-[18px]">
            <p v-if="phoneValidationError" class="text-xs text-danger flex items-center gap-1.5 animate-in fade-in duration-150">
              <span class="w-1.5 h-1.5 rounded-full bg-danger shrink-0" />
              <span>{{ phoneValidationError }}</span>
            </p>
            <p v-else-if="isPhoneValid" class="text-xs text-emerald-600 dark:text-emerald-400 font-medium flex items-center gap-1.5 animate-in fade-in duration-150">
              <span class="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
              <span>Nomor seluler valid (+62 {{ phoneInput }}). Data profil diisi pada tahap onboarding.</span>
            </p>
            <p v-else class="text-[11px] text-neutral-500 dark:text-neutral-400">
              Ketik angka saja, tanda hubung (-) otomatis terisi.
            </p>
          </div>
        </div>

        <!-- Fast Demo Quick Fill Card -->
        <div class="p-3.5 rounded-2xl bg-neutral-50/80 dark:bg-neutral-850/50 border border-neutral-200/80 dark:border-neutral-800 space-y-2">
          <div class="flex items-center justify-between text-xs">
            <span class="font-bold text-neutral-700 dark:text-neutral-300">Pilih Cepat Akun Demo:</span>
            <span class="text-[11px] text-neutral-500 dark:text-neutral-400">1-Klik isi nomor</span>
          </div>
          <div class="grid grid-cols-3 gap-2">
            <button
              v-for="r in roleCards"
              :key="r.key"
              type="button"
              :class="[
                'py-2 px-2.5 rounded-xl border text-center transition-all duration-150 cursor-pointer flex flex-col items-center justify-center gap-0.5',
                selectedRole === r.key
                  ? 'bg-primary-50 dark:bg-primary-950/70 border-primary-500/60 text-primary-700 dark:text-primary-300 shadow-2xs ring-1 ring-primary-500/30'
                  : 'bg-white dark:bg-[#18191E] border-neutral-200/80 dark:border-neutral-700/60 text-neutral-700 dark:text-neutral-300 hover:border-neutral-300 dark:hover:border-neutral-600'
              ]"
              @click="applyDemoProfile(r.key)"
            >
              <span class="block text-xs font-bold">{{ r.shortTitle }}</span>
              <span class="block text-[10px] text-neutral-500 dark:text-neutral-400 truncate">{{ r.demoName }}</span>
            </button>
          </div>
        </div>

        <!-- Submit Button -->
        <button
          type="button"
          :disabled="loading || !isPhoneValid"
          :class="[
            'w-full py-3.5 px-6 rounded-2xl font-bold text-sm sm:text-base transition-all duration-150 flex items-center justify-center gap-2 shadow-xs',
            isPhoneValid && !loading
              ? 'bg-primary-500 hover:bg-primary-600 text-white shadow-primary-500/25 active:scale-[0.99] cursor-pointer'
              : 'bg-neutral-100 dark:bg-neutral-800 border border-neutral-200/70 dark:border-neutral-700/60 text-neutral-400 dark:text-neutral-500 cursor-not-allowed'
          ]"
          @click="requestOtp"
        >
          <HugeiconsIcon :icon="Call02Icon" :size="18" :stroke-width="2.2" />
          <span>{{ loading ? 'Mengirim Kode...' : 'Kirim Kode Masuk' }}</span>
        </button>
      </div>

      <!-- STEP 2: 4-Digit OTP Input -->
      <div v-else class="space-y-4 text-center pt-1 pb-1">
        <div class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 text-xs font-semibold mx-auto">
          <span>Kirim ke: +62 {{ phoneInput }}</span>
          <button
            type="button"
            class="text-primary-600 hover:text-primary-500 font-bold ml-1 cursor-pointer"
            @click="otpStep = 'input'"
          >
            Ubah
          </button>
        </div>

        <!-- 4-Digit Input Boxes -->
        <div class="flex items-center justify-center gap-3 py-2">
          <input
            v-for="(digit, idx) in otpDigits"
            :key="idx"
            :ref="el => setOtpRef(el, idx)"
            v-model="otpDigits[idx]"
            type="text"
            maxlength="1"
            inputmode="numeric"
            pattern="[0-9]*"
            class="w-13 h-15 sm:w-15 sm:h-17 rounded-2xl border-2 border-[#EAEAEA] dark:border-[#26272F] bg-white dark:bg-[#18191E] text-neutral-900 dark:text-white text-2xl sm:text-3xl font-extrabold text-center focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 focus:outline-none shadow-xs transition-all"
            @input="onOtpInput(idx, $event)"
            @keydown.backspace="onOtpBackspace(idx, $event)"
          />
        </div>

        <!-- Demo Hint -->
        <div class="p-3 rounded-2xl bg-amber-50/80 dark:bg-amber-950/40 border border-amber-200/80 dark:border-amber-800/60 text-xs text-amber-800 dark:text-amber-300 flex items-center justify-between text-left">
          <div class="flex items-center gap-2">
            <span class="w-2 h-2 rounded-full bg-amber-500 animate-pulse shrink-0" />
            <span>Kode uji coba: <strong class="font-bold text-amber-900 dark:text-amber-200">1234</strong></span>
          </div>
          <button
            type="button"
            class="px-2.5 py-1 rounded-lg bg-amber-100 dark:bg-amber-900/60 hover:bg-amber-200 dark:hover:bg-amber-800 text-amber-900 dark:text-amber-200 font-bold text-xs transition-colors cursor-pointer"
            @click="fillOtpDemo"
          >
            Isi Otomatis
          </button>
        </div>

        <button
          type="button"
          :disabled="loading || otpString.length < 4"
          :class="[
            'w-full py-3.5 px-6 rounded-2xl font-bold text-sm sm:text-base transition-all duration-150 flex items-center justify-center gap-2 shadow-xs',
            otpString.length === 4 && !loading
              ? 'bg-primary-500 hover:bg-primary-600 text-white shadow-primary-500/25 active:scale-[0.99] cursor-pointer'
              : 'bg-neutral-100 dark:bg-neutral-800 border border-neutral-200/70 dark:border-neutral-700/60 text-neutral-400 dark:text-neutral-500 cursor-not-allowed'
          ]"
          @click="verifyAndRegister"
        >
          <span>{{ loading ? 'Mendaftarkan...' : 'Verifikasi & Lanjut' }}</span>
        </button>

        <button
          type="button"
          class="text-xs sm:text-sm font-semibold text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white transition-colors duration-150 cursor-pointer"
          @click="otpStep = 'input'"
        >
          ← Kembali ke data awal
        </button>
      </div>
    </BModal>

  </div>
</template>

<script setup lang="ts">
import { ref, computed, nextTick } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore, type UserRole } from '~/stores/auth'
import BLottiePlayer from '~/components/base/BLottiePlayer.vue'
import BCloudBackground from '~/components/base/BCloudBackground.vue'
import BModal from '~/components/base/BModal.vue'
import { HugeiconsIcon } from '@hugeicons/vue'
import {
  ArrowLeft02Icon,
  Call02Icon,
  Store01Icon,
  UserGroupIcon,
  Coins01Icon
} from '@hugeicons/core-free-icons'

definePageMeta({
  layout: false
})

const router = useRouter()
const authStore = useAuthStore()

const lottieAnimationUrl = 'https://lottie.host/c484a436-22e4-4f84-b255-0d4edc5a280d/eJzWl0Bciv.lottie'

// Role Definitions (Layman-Friendly)
const roleCards = [
  {
    key: 'UMKM' as UserRole,
    title: 'Pemilik Usaha',
    shortTitle: 'UMKM',
    demoName: 'Fikri S.',
    desc: 'Kembangkan usaha dan siap dapat modal.',
    icon: Store01Icon
  },
  {
    key: 'CONSULTANT' as UserRole,
    title: 'Konsultan',
    shortTitle: 'Konsultan',
    demoName: 'Dra. Maya',
    desc: 'Bantu bimbing UMKM agar usahanya maju.',
    icon: UserGroupIcon
  },
  {
    key: 'INVESTOR' as UserRole,
    title: 'Investor',
    shortTitle: 'Investor',
    demoName: 'Hendro W.',
    desc: 'Cari usaha pilihan untuk diberi modal.',
    icon: Coins01Icon
  }
]

// State
const selectedRole = ref<UserRole>('UMKM')
const loading = ref(false)
const loadingMessage = ref('')
const openPhoneModal = ref(false)
const otpStep = ref<'input' | 'otp'>('input')
const phoneInput = ref('812-3456-7890')

const activeRoleMeta = computed(() => {
  return roleCards.find(r => r.key === selectedRole.value) || roleCards[0]
})

const modalTitle = computed(() => {
  return `Daftar Akun ${activeRoleMeta.value.shortTitle}`
})

const modalSubtitle = computed(() => {
  return 'Masukkan nomor WhatsApp aktif untuk verifikasi pendaftaran.'
})

function onRoleTabClick(role: UserRole) {
  selectedRole.value = role
  if (role === 'UMKM') {
    phoneInput.value = formatIndonesianPhone('812-3456-7890')
  } else if (role === 'CONSULTANT') {
    phoneInput.value = formatIndonesianPhone('819-8765-4321')
  } else if (role === 'INVESTOR') {
    phoneInput.value = formatIndonesianPhone('811-2233-4455')
  }
}

function applyDemoProfile(role: UserRole) {
  onRoleTabClick(role)
}

function formatIndonesianPhone(val: string): string {
  let digits = val.replace(/\D/g, '')
  if (digits.startsWith('0')) {
    digits = digits.slice(1)
  }
  digits = digits.slice(0, 13)

  if (digits.length <= 3) return digits
  if (digits.length <= 7) return `${digits.slice(0, 3)}-${digits.slice(3)}`
  return `${digits.slice(0, 3)}-${digits.slice(3, 7)}-${digits.slice(7)}`
}

function onPhoneInput(event: Event) {
  const target = event.target as HTMLInputElement
  const formatted = formatIndonesianPhone(target.value)
  phoneInput.value = formatted
  target.value = formatted
}

function onPhoneKeydown(event: KeyboardEvent) {
  if (
    ['Backspace', 'Delete', 'Tab', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Enter', 'Home', 'End'].includes(event.key) ||
    event.ctrlKey ||
    event.metaKey
  ) {
    return
  }
  if (!/^\d$/.test(event.key)) {
    event.preventDefault()
  }
}

const cleanPhone = computed(() => phoneInput.value.replace(/\D/g, ''))

const phoneValidationError = computed(() => {
  const digits = cleanPhone.value
  if (!digits) return ''
  if (!digits.startsWith('8')) return 'Nomor harus diawali angka 8 setelah +62.'
  if (digits.length < 9) return `Nomor belum lengkap (${digits.length}/9 digit).`
  if (digits.length > 13) return 'Nomor maksimal 13 digit.'
  return ''
})

const isPhoneValid = computed(() => {
  const digits = cleanPhone.value
  return digits.startsWith('8') && digits.length >= 9 && digits.length <= 13
})

// OTP
const otpDigits = ref(['', '', '', ''])
const otpRefs = ref<(HTMLInputElement | null)[]>([])

function setOtpRef(el: any, index: number) {
  if (el) otpRefs.value[index] = el as HTMLInputElement
}

const otpString = computed(() => otpDigits.value.join(''))

function requestOtp() {
  if (!isPhoneValid.value) return
  loading.value = true
  setTimeout(() => {
    loading.value = false
    otpStep.value = 'otp'
    otpDigits.value = ['', '', '', '']
    nextTick(() => {
      otpRefs.value[0]?.focus()
    })
  }, 300)
}

function onOtpInput(index: number, event: Event) {
  const target = event.target as HTMLInputElement
  const val = target.value.replace(/\D/g, '')
  otpDigits.value[index] = val ? val[val.length - 1] : ''

  if (val && index < 3) {
    otpRefs.value[index + 1]?.focus()
  }
  if (otpString.value.length === 4) {
    verifyAndRegister()
  }
}

function onOtpBackspace(index: number, event: KeyboardEvent) {
  if (!otpDigits.value[index] && index > 0) {
    otpRefs.value[index - 1]?.focus()
  }
}

function fillOtpDemo() {
  otpDigits.value = ['1', '2', '3', '4']
  verifyAndRegister()
}

function handleGoogleRegister() {
  loading.value = true
  loadingMessage.value = '✓ Menghubungkan akun Google...'

  setTimeout(() => {
    let email = 'fikri.google@gmail.com'
    let name = 'Fikri Setiawan'
    let businessName = 'Kopi Senja Nusantara'

    if (selectedRole.value === 'CONSULTANT') {
      email = 'maya.google@gmail.com'
      name = 'Dra. Maya Suryani, M.M.'
      businessName = 'Maya Advisory Partner'
    } else if (selectedRole.value === 'INVESTOR') {
      email = 'hendro.google@gmail.com'
      name = 'Hendro Wicaksono'
      businessName = 'Nusantara Angel Syndicate'
    }

    // Registrasi sesuai skema database (users & initial profiles)
    authStore.register({
      name,
      email,
      phone: selectedRole.value === 'UMKM' ? '+62 812-3456-7890' : selectedRole.value === 'CONSULTANT' ? '+62 819-8765-4321' : '+62 811-2233-4455',
      role: selectedRole.value,
      org_name: businessName,
      sector: 'Makanan & Minuman',
      specialization: 'Keuangan & Biaya',
      commitment_capital: '150 - 500 Juta',
      otp_code: '1234'
    })

    loading.value = false
    loadingMessage.value = `✓ Masuk sebagai ${activeRoleMeta.value.shortTitle}...`

    setTimeout(() => {
      router.push(`/onboarding?role=${selectedRole.value}`)
    }, 300)
  }, 400)
}

function verifyAndRegister() {
  loading.value = true
  const roleMeta = activeRoleMeta.value

  setTimeout(() => {
    loading.value = false
    openPhoneModal.value = false

    const defaultName = (
      selectedRole.value === 'UMKM'
        ? 'Fikri Setiawan'
        : selectedRole.value === 'CONSULTANT'
          ? 'Dra. Maya Suryani, M.M.'
          : 'Hendro Wicaksono'
    )

    const defaultOrg = (
      selectedRole.value === 'UMKM'
        ? 'Kopi Senja Nusantara'
        : selectedRole.value === 'CONSULTANT'
          ? 'Maya Advisory Partner'
          : 'Nusantara Angel Syndicate'
    )

    const email = `user_${cleanPhone.value}@beruang.id`

    // Simpan ke authStore dengan field tabel PostgreSQL (public.users & business_profiles/consultant_profiles/investor_profiles)
    authStore.register({
      name: defaultName,
      email,
      phone: `+62 ${cleanPhone.value}`,
      role: selectedRole.value,
      org_name: defaultOrg,
      sector: 'Makanan & Minuman',
      specialization: 'Keuangan & Biaya',
      bnsp_license: 'BNSP-KONS-2024-8891',
      commitment_capital: '150 - 500 Juta',
      investor_type: 'Kelompok Modal',
      otp_code: otpString.value || '1234'
    })

    loadingMessage.value = `✓ Berhasil! Membuka pendaftaran ${roleMeta.shortTitle}...`

    setTimeout(() => {
      router.push(`/onboarding?role=${selectedRole.value}`)
    }, 300)
  }, 350)
}
</script>
