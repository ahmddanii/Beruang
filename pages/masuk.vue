<template>
  <div class="h-screen h-dvh w-full bg-[#FAFAFA] dark:bg-[#0F1014] text-neutral-900 dark:text-neutral-100 font-sans flex flex-col justify-center items-center px-4 py-4 sm:px-6 relative overflow-hidden">
    
    <!-- Subtle Ambient Background Glow (UMKM Dashboard Aesthetic) -->
    <div class="pointer-events-none absolute top-1/4 left-1/2 -translate-x-1/2 w-[520px] h-[520px] bg-primary-500/4 dark:bg-primary-500/8 rounded-full blur-3xl" />

    <!-- Atmospheric Layered Cloud Overlay (Grayscale / Neutral Theme matching UMKM Dashboard) -->
    <!-- Positioned at the bottom, billowing upwards so the Lottie character floats gracefully above the clouds -->
    <BCloudBackground />

    <!-- ===================================================================== -->
    <!-- TOP-LEFT: Pill Button "Kembali ke Beranda" (Pill shape, No Hover)     -->
    <!-- ===================================================================== -->
    <div class="absolute top-6 left-6 sm:top-8 sm:left-8 z-20">
      <NuxtLink
        to="/"
        class="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white dark:bg-[#18191E] border border-[#EAEAEA] dark:border-[#26272F] text-neutral-800 dark:text-neutral-200 text-xs sm:text-sm font-heading font-semibold shadow-xs hover:bg-neutral-50 dark:hover:bg-[#22252E] hover:border-neutral-300 dark:hover:border-neutral-700 transition-colors duration-150"
      >
        <HugeiconsIcon :icon="ArrowLeft02Icon" :size="16" :stroke-width="2.2" />
        <span>Kembali ke Beranda</span>
      </NuxtLink>
    </div>

    <!-- ===================================================================== -->
    <!-- CENTER: Floating Lottie with Ground Shadow & Zen Action Stack         -->
    <!-- ===================================================================== -->
    <main class="relative z-10 w-full max-w-lg mx-auto flex flex-col items-center text-center my-auto">
      
      <!-- 1. Lottie Animation Hero (Clean, No Artificial Ground Shadow) -->
      <div class="relative flex flex-col items-center">
        <div class="w-[320px] h-[320px] sm:w-[400px] sm:h-[400px] md:w-[450px] md:h-[450px] lg:w-[480px] lg:h-[480px] max-h-[46vh] relative flex items-center justify-center">
          <BLottiePlayer
            :src="lottieAnimationUrl"
            :autoplay="true"
            :loop="true"
            class="w-full h-full"
          />
        </div>
      </div>

      <!-- 2. Welcoming Sapaan & Subtitle -->
      <div class="space-y-1.5 mb-5 sm:mb-6">
        <h1 class="text-3xl sm:text-4xl lg:text-5xl font-heading font-extrabold text-neutral-900 dark:text-white tracking-tight leading-tight">
          Halo, senang melihatmu kembali!
        </h1>
        <p class="text-sm sm:text-base text-neutral-600 dark:text-neutral-300 font-sans leading-relaxed max-w-md mx-auto">
          Masuk untuk memantau performa dan peluang modal usahamu hari ini.
        </p>
      </div>

      <!-- 3. Minimalist Action Stack (Color-Only Smooth Hover Transitions) -->
      <div class="w-full max-w-sm space-y-3.5">
        <!-- Button 1: Login with Google (Pure White Card Surface with Hairline Border) -->
        <button
          type="button"
          :disabled="loading"
          class="w-full flex items-center justify-center gap-3 py-4 px-8 rounded-full bg-white dark:bg-[#18191E] border border-[#EAEAEA] dark:border-[#26272F] text-neutral-900 dark:text-white font-heading font-bold text-sm sm:text-base shadow-xs hover:bg-neutral-50 dark:hover:bg-[#22252E] hover:border-neutral-300 dark:hover:border-neutral-700 transition-colors duration-150 cursor-pointer"
          @click="handleGoogleLogin"
        >
          <svg class="w-5 h-5 shrink-0" viewBox="0 0 24 24">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05" />
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335" />
          </svg>
          <span>Masuk dengan Google</span>
        </button>

        <!-- Button 2: Login with WhatsApp (Primary Blue Accent bg-primary-600 / hover:bg-primary-700) -->
        <button
          type="button"
          :disabled="loading"
          class="w-full flex items-center justify-center gap-3 py-4 px-8 rounded-full bg-primary-600 hover:bg-primary-700 text-white font-heading font-bold text-sm sm:text-base shadow-sm shadow-primary-600/20 transition-colors duration-150 cursor-pointer"
          @click="openPhoneModal = true"
        >
          <HugeiconsIcon :icon="Call02Icon" :size="18" :stroke-width="2" />
          <span>Masuk dengan WhatsApp</span>
        </button>

        <!-- 4. Centered Register Link directly below WhatsApp button -->
        <div class="text-center pt-2 sm:pt-2.5">
          <span class="text-sm sm:text-base text-neutral-500 dark:text-neutral-400">
            Belum memiliki akun?
          </span>
          <NuxtLink
            to="/daftar"
            class="text-sm sm:text-base font-heading font-bold text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 transition-colors duration-150 ml-1.5"
          >
            Daftar Akun Baru
          </NuxtLink>
        </div>
      </div>

      <!-- Loading / Feedback Badge -->
      <div v-if="loadingMessage" class="mt-4 px-5 py-2.5 rounded-full bg-emerald-500 text-white font-heading font-bold text-sm shadow-sm animate-pulse">
        {{ loadingMessage }}
      </div>

    </main>

    <!-- ===================================================================== -->
    <!-- PHONE NUMBER / WHATSAPP OTP MODAL (Refined Apple/Fintech Aesthetics) -->
    <!-- ===================================================================== -->
    <BModal
      v-model="openPhoneModal"
      size="md"
      :title="otpStep === 'input' ? 'Masuk via WhatsApp' : 'Verifikasi Kode OTP'"
      :hide-divider="true"
    >
      <!-- Custom Header Slot with Brand Icon Badge -->
      <template #header="{ close }">
        <div class="flex items-start gap-3.5 flex-1 pr-1">
          <div class="w-11 h-11 rounded-2xl bg-primary-50 dark:bg-primary-950/70 border border-primary-100 dark:border-primary-900/60 flex items-center justify-center text-primary-600 dark:text-primary-400 shrink-0 shadow-2xs mt-0.5">
            <HugeiconsIcon :icon="Call02Icon" :size="20" :stroke-width="2.2" />
          </div>
          <div class="min-w-0 flex-1">
            <h3 class="font-heading font-extrabold text-xl sm:text-2xl text-neutral-900 dark:text-white tracking-tight leading-snug">
              {{ otpStep === 'input' ? 'Masuk via WhatsApp' : 'Verifikasi Kode OTP' }}
            </h3>
            <p class="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 font-sans mt-0.5 leading-relaxed">
              {{ otpStep === 'input' ? 'Kami akan mengirimkan 4-digit kode verifikasi ke nomor WhatsApp aktifmu.' : `Masukkan kode verifikasi yang telah dikirim ke +62 ${cleanPhone}` }}
            </p>
          </div>
        </div>
      </template>

      <!-- STEP 1: Phone Input -->
      <div v-if="otpStep === 'input'" class="space-y-4 pt-1 pb-1">
        <!-- Input Group -->
        <div class="space-y-1.5">
          <div class="flex items-center justify-between">
            <label for="modalPhone" class="block text-xs font-heading font-bold uppercase tracking-wider text-neutral-600 dark:text-neutral-400">
              Nomor WhatsApp / Handphone
            </label>
            <span class="text-[11px] font-sans text-neutral-400">Format: 8xx-xxxx-xxxx</span>
          </div>

          <!-- Input Container with Dynamic Error State -->
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
            <!-- Country Code Prefix Badge -->
            <div class="flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-white dark:bg-[#1A1C23] border border-neutral-200/80 dark:border-neutral-700/70 text-neutral-800 dark:text-neutral-200 font-heading font-bold text-sm shadow-2xs select-none shrink-0">
              <span class="text-base leading-none">🇮🇩</span>
              <span>+62</span>
            </div>

            <!-- Phone Input Field (Project Font: DM Sans / font-heading, Auto-formatted) -->
            <input
              id="modalPhone"
              :value="phoneInput"
              type="tel"
              required
              autocomplete="tel-national"
              inputmode="numeric"
              placeholder="812-3456-7890"
              class="w-full px-3 py-2 bg-transparent text-neutral-900 dark:text-white placeholder:text-neutral-350 dark:placeholder:text-neutral-600 text-lg sm:text-xl font-heading font-bold tracking-wide focus:outline-none tabular-nums"
              @input="onPhoneInput"
              @keydown="onPhoneKeydown"
            />
          </div>

          <!-- Real-Time Validation Feedback & Instructions -->
          <div class="px-1 min-h-[18px]">
            <p v-if="phoneValidationError" class="text-xs text-danger font-sans flex items-center gap-1.5 animate-in fade-in duration-150">
              <span class="w-1.5 h-1.5 rounded-full bg-danger shrink-0" />
              <span>{{ phoneValidationError }}</span>
            </p>
            <p v-else-if="isPhoneValid" class="text-xs text-emerald-600 dark:text-emerald-400 font-sans font-medium flex items-center gap-1.5 animate-in fade-in duration-150">
              <span class="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
              <span>Format nomor seluler Indonesia valid (+62 {{ phoneInput }})</span>
            </p>
            <p v-else class="text-[11px] text-neutral-500 dark:text-neutral-400 font-sans">
              Ketik angka saja, tanda hubung (-) otomatis terisi.
            </p>
          </div>
        </div>

        <!-- RBAC Fast Demo Selector Card -->
        <div class="p-3.5 rounded-2xl bg-neutral-50/80 dark:bg-neutral-850/50 border border-neutral-200/80 dark:border-neutral-800 space-y-2">
          <div class="flex items-center justify-between text-xs">
            <span class="font-heading font-bold text-neutral-700 dark:text-neutral-300">Pilih Akun Demo:</span>
            <span class="text-[11px] font-sans text-neutral-500 dark:text-neutral-400">Otomatis deteksi peran (RBAC)</span>
          </div>
          <div class="grid grid-cols-3 gap-2">
            <button
              type="button"
              :class="[
                'py-2 px-2.5 rounded-xl border text-center transition-all duration-150 cursor-pointer',
                cleanPhone === '81234567890'
                  ? 'bg-primary-50 dark:bg-primary-950/70 border-primary-500/60 text-primary-700 dark:text-primary-300 shadow-2xs ring-1 ring-primary-500/30'
                  : 'bg-white dark:bg-[#18191E] border-neutral-200/80 dark:border-neutral-700/60 text-neutral-700 dark:text-neutral-300 hover:border-neutral-300 dark:hover:border-neutral-600'
              ]"
              @click="setDemoPhone('812-3456-7890')"
            >
              <span class="block text-xs font-heading font-bold">UMKM</span>
              <span class="block text-[10px] font-sans text-neutral-500 dark:text-neutral-400 truncate mt-0.5">Fikri Setiawan</span>
            </button>

            <button
              type="button"
              :class="[
                'py-2 px-2.5 rounded-xl border text-center transition-all duration-150 cursor-pointer',
                cleanPhone === '81987654321'
                  ? 'bg-primary-50 dark:bg-primary-950/70 border-primary-500/60 text-primary-700 dark:text-primary-300 shadow-2xs ring-1 ring-primary-500/30'
                  : 'bg-white dark:bg-[#18191E] border-neutral-200/80 dark:border-neutral-700/60 text-neutral-700 dark:text-neutral-300 hover:border-neutral-300 dark:hover:border-neutral-600'
              ]"
              @click="setDemoPhone('819-8765-4321')"
            >
              <span class="block text-xs font-heading font-bold">Konsultan</span>
              <span class="block text-[10px] font-sans text-neutral-500 dark:text-neutral-400 truncate mt-0.5">Dra. Maya</span>
            </button>

            <button
              type="button"
              :class="[
                'py-2 px-2.5 rounded-xl border text-center transition-all duration-150 cursor-pointer',
                cleanPhone === '81122334455'
                  ? 'bg-primary-50 dark:bg-primary-950/70 border-primary-500/60 text-primary-700 dark:text-primary-300 shadow-2xs ring-1 ring-primary-500/30'
                  : 'bg-white dark:bg-[#18191E] border-neutral-200/80 dark:border-neutral-700/60 text-neutral-700 dark:text-neutral-300 hover:border-neutral-300 dark:hover:border-neutral-600'
              ]"
              @click="setDemoPhone('811-2233-4455')"
            >
              <span class="block text-xs font-heading font-bold">Investor</span>
              <span class="block text-[10px] font-sans text-neutral-500 dark:text-neutral-400 truncate mt-0.5">Hendro W.</span>
            </button>
          </div>
        </div>

        <!-- Submit Button (Clean Modern States: Solid Blue when ready, Crisp Neutral when disabled) -->
        <button
          type="button"
          :disabled="loading || !isPhoneValid"
          :class="[
            'w-full py-4 px-6 rounded-2xl font-heading font-bold text-base transition-all duration-150 flex items-center justify-center gap-2 shadow-xs',
            isPhoneValid && !loading
              ? 'bg-primary-600 hover:bg-primary-700 text-white shadow-primary-600/25 cursor-pointer'
              : 'bg-neutral-100 dark:bg-neutral-800 border border-neutral-200/70 dark:border-neutral-700/60 text-neutral-400 dark:text-neutral-500 cursor-not-allowed'
          ]"
          @click="requestOtp"
        >
          <HugeiconsIcon :icon="Call02Icon" :size="18" :stroke-width="2.2" />
          <span>{{ loading ? 'Mengirim Kode...' : 'Kirim Kode OTP WhatsApp' }}</span>
        </button>
      </div>

      <!-- STEP 2: 4-Digit OTP Input -->
      <div v-else class="space-y-5 text-center pt-1 pb-1">
        <!-- Phone indicator chip -->
        <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 text-xs font-heading font-semibold mx-auto">
          <span>Kirim ke: 🇮🇩 +62 {{ phoneInput }}</span>
          <button
            type="button"
            class="text-primary-600 hover:text-primary-700 font-bold ml-1 cursor-pointer"
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
            class="w-14 h-16 sm:w-16 sm:h-18 rounded-2xl border-2 border-[#EAEAEA] dark:border-[#26272F] bg-white dark:bg-[#18191E] text-neutral-900 dark:text-white text-3xl font-heading font-extrabold text-center focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 focus:outline-none shadow-xs transition-all"
            @input="onOtpInput(idx, $event)"
            @keydown.backspace="onOtpBackspace(idx, $event)"
          />
        </div>

        <!-- Demo Hint -->
        <div class="p-3.5 rounded-2xl bg-amber-50/80 dark:bg-amber-950/40 border border-amber-200/80 dark:border-amber-800/60 text-xs sm:text-sm text-amber-800 dark:text-amber-300 flex items-center justify-between">
          <div class="flex items-center gap-2">
            <span class="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
            <span>Kode Demo: <strong class="font-heading font-bold text-amber-900 dark:text-amber-200">1234</strong></span>
          </div>
          <button
            type="button"
            class="px-2.5 py-1 rounded-lg bg-amber-100 dark:bg-amber-900/60 hover:bg-amber-200 dark:hover:bg-amber-800 text-amber-900 dark:text-amber-200 font-heading font-bold text-xs transition-colors cursor-pointer"
            @click="fillOtpDemo"
          >
            Isi Otomatis
          </button>
        </div>

        <button
          type="button"
          :disabled="loading || otpString.length < 4"
          :class="[
            'w-full py-4 px-6 rounded-2xl font-heading font-bold text-base transition-all duration-150 flex items-center justify-center gap-2 shadow-xs',
            otpString.length === 4 && !loading
              ? 'bg-primary-600 hover:bg-primary-700 text-white shadow-primary-600/25 cursor-pointer'
              : 'bg-neutral-100 dark:bg-neutral-800 border border-neutral-200/70 dark:border-neutral-700/60 text-neutral-400 dark:text-neutral-500 cursor-not-allowed'
          ]"
          @click="verifyAndLogin"
        >
          <span>{{ loading ? 'Memverifikasi...' : 'Verifikasi & Masuk Sekarang' }}</span>
        </button>

        <button
          type="button"
          class="text-sm font-heading font-semibold text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white transition-colors duration-150 cursor-pointer"
          @click="otpStep = 'input'"
        >
          ← Ganti nomor telepon
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
import { ArrowLeft02Icon, Call02Icon } from '@hugeicons/core-free-icons'

definePageMeta({
  layout: false // Standalone Zen / Ultra-Minimalist Canvas
})

const router = useRouter()
const authStore = useAuthStore()

// Official Lottie Animation URL
const lottieAnimationUrl = 'https://lottie.host/c484a436-22e4-4f84-b255-0d4edc5a280d/eJzWl0Bciv.lottie'

// State
const loading = ref(false)
const loadingMessage = ref('')
const openPhoneModal = ref(false)
const otpStep = ref<'input' | 'otp'>('input')
const phoneInput = ref('812-3456-7890')

/**
 * Format raw digits into standard Indonesian mobile phone pattern:
 * e.g. 812-3456-7890 (no need for user to type "-")
 */
function formatIndonesianPhone(val: string): string {
  // Strip all non-digits (user cannot input letters or special chars)
  let digits = val.replace(/\D/g, '')

  // If user inputs leading 0 (e.g. 0812...), automatically strip leading 0 since +62 is already provided
  if (digits.startsWith('0')) {
    digits = digits.slice(1)
  }

  // Indonesian mobile numbers are max 13 digits (excluding country code)
  digits = digits.slice(0, 13)

  if (digits.length <= 3) {
    return digits
  }
  if (digits.length <= 7) {
    return `${digits.slice(0, 3)}-${digits.slice(3)}`
  }
  return `${digits.slice(0, 3)}-${digits.slice(3, 7)}-${digits.slice(7)}`
}

function onPhoneInput(event: Event) {
  const target = event.target as HTMLInputElement
  const formatted = formatIndonesianPhone(target.value)
  phoneInput.value = formatted
  target.value = formatted
}

function onPhoneKeydown(event: KeyboardEvent) {
  // Allow system/navigation keys: Backspace, Delete, Tab, Arrows, Enter, Select All, Copy, Paste
  if (
    ['Backspace', 'Delete', 'Tab', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Enter', 'Home', 'End'].includes(event.key) ||
    event.ctrlKey ||
    event.metaKey
  ) {
    return
  }
  // Prevent any non-digit character (blocking letters, symbols, punctuation)
  if (!/^\d$/.test(event.key)) {
    event.preventDefault()
  }
}

function setDemoPhone(phone: string) {
  phoneInput.value = formatIndonesianPhone(phone)
}

const cleanPhone = computed(() => {
  return phoneInput.value.replace(/\D/g, '')
})

/**
 * Validation rules:
 * 1. Only digits allowed (enforced by input filter & formatter)
 * 2. Must be Indonesian mobile number: starts with 8 (after +62)
 * 3. Length must be between 9 and 13 digits
 */
const phoneValidationError = computed(() => {
  const digits = cleanPhone.value
  if (!digits) return ''

  if (!digits.startsWith('8')) {
    return 'Nomor seluler Indonesia harus diawali angka 8 (setelah kode +62).'
  }

  if (digits.length < 9) {
    return `Nomor telepon belum lengkap (${digits.length}/9 digit minimum).`
  }

  if (digits.length > 13) {
    return 'Nomor telepon maksimal 13 digit.'
  }

  return ''
})

const isPhoneValid = computed(() => {
  const digits = cleanPhone.value
  return digits.startsWith('8') && digits.length >= 9 && digits.length <= 13
})

// OTP Inputs
const otpDigits = ref(['', '', '', ''])
const otpRefs = ref<(HTMLInputElement | null)[]>([])

function setOtpRef(el: any, index: number) {
  if (el) otpRefs.value[index] = el as HTMLInputElement
}

const otpString = computed(() => {
  return otpDigits.value.join('')
})

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
  }, 350)
}

function onOtpInput(index: number, event: Event) {
  const target = event.target as HTMLInputElement
  const val = target.value.replace(/\D/g, '')
  otpDigits.value[index] = val ? val[val.length - 1] : ''

  if (val && index < 3) {
    otpRefs.value[index + 1]?.focus()
  }

  if (otpString.value.length === 4) {
    verifyAndLogin()
  }
}

function onOtpBackspace(index: number, event: KeyboardEvent) {
  if (!otpDigits.value[index] && index > 0) {
    otpRefs.value[index - 1]?.focus()
  }
}

function fillOtpDemo() {
  otpDigits.value = ['1', '2', '3', '4']
  verifyAndLogin()
}

/**
 * Intelligent RBAC Detection:
 * Role is read automatically from the account record.
 */
function resolveAccountRole(phone: string): { role: UserRole; name: string; email: string; route: string } {
  const digits = phone.replace(/\D/g, '')

  if (digits.includes('987654321')) {
    return {
      role: 'CONSULTANT',
      name: 'Dra. Maya Suryani, M.M.',
      email: 'maya.suryani@beruang.id',
      route: '/konsultan'
    }
  }

  if (digits.includes('1122334455')) {
    return {
      role: 'INVESTOR',
      name: 'Hendro Wicaksono',
      email: 'hendro@nusantaraventures.com',
      route: '/investor'
    }
  }

  // Default to UMKM
  return {
    role: 'UMKM',
    name: 'Fikri Setiawan',
    email: 'fikri@kopisenja.id',
    route: '/dashboard'
  }
}

function verifyAndLogin() {
  loading.value = true
  const account = resolveAccountRole(cleanPhone.value)

  setTimeout(() => {
    loading.value = false
    openPhoneModal.value = false
    authStore.login(account.email, account.role)
    loadingMessage.value = `✓ Selamat datang kembali! Mengarahkan ke ${account.role}...`

    setTimeout(() => {
      router.push(account.route)
    }, 350)
  }, 400)
}

function handleGoogleLogin() {
  loading.value = true
  loadingMessage.value = '✓ Menghubungkan akun Google...'
  setTimeout(() => {
    const account = resolveAccountRole('812-3456-7890') // default UMKM
    authStore.login(account.email, account.role)
    loading.value = false
    router.push(account.route)
  }, 450)
}
</script>
