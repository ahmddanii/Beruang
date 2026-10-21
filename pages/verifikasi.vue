<template>
  <div>
    <BCard padding="lg" class="border border-border-light dark:border-border-dark text-center max-w-md mx-auto">
      <div class="mb-6">
        <div class="w-12 h-12 rounded-2xl bg-primary-50 dark:bg-primary-950 text-primary-600 flex items-center justify-center mx-auto mb-3">
          <HugeiconsIcon :icon="ShieldCheckIcon" :size="24" :stroke-width="1.75" />
        </div>
        <h2 class="font-heading font-bold text-2xl text-neutral-900 dark:text-white tracking-tight">
          Verifikasi WhatsApp
        </h2>
        <p class="text-xs text-neutral-500 dark:text-neutral-400 mt-1 max-w-xs mx-auto">
          {{ step === 'input-phone' 
            ? 'Masukkan nomor WhatsApp Anda untuk menerima kode verifikasi OTP 6 digit.' 
            : `Kode OTP 6 digit telah dikirim ke nomor WhatsApp ${formattedPhone}.` }}
        </p>
      </div>

      <!-- Alert Error / Success -->
      <div v-if="errorMessage" class="mb-4 text-left">
        <BAlert variant="danger" :message="errorMessage" dismissible @close="errorMessage = ''" />
      </div>
      <div v-if="successMessage" class="mb-4 text-left">
        <BAlert variant="success" :message="successMessage" dismissible @close="successMessage = ''" />
      </div>

      <!-- STEP 1: Input Nomor WhatsApp (jika belum ada) -->
      <div v-if="step === 'input-phone'" class="text-left space-y-4 my-4">
        <div>
          <label class="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1.5">
            Nomor WhatsApp
          </label>
          <div class="relative">
            <span class="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs font-bold text-neutral-500">
              +62
            </span>
            <input
              v-model="phoneInput"
              type="tel"
              placeholder="81234567890"
              class="w-full pl-12 pr-4 py-2.5 text-sm rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 focus:outline-none"
              @keyup.enter="handleSendOtp"
            />
          </div>
          <p class="text-[11px] text-neutral-400 mt-1">
            Contoh: 08123456789 atau 8123456789 (10–14 digit)
          </p>
        </div>

        <BButton
          variant="primary"
          block
          size="md"
          :loading="loading"
          class="flex items-center justify-center gap-1.5"
          @click="handleSendOtp"
        >
          <span>Kirim Kode OTP</span>
          <HugeiconsIcon :icon="ArrowRight02Icon" :size="15" :stroke-width="2" />
        </BButton>
      </div>

      <!-- STEP 2: Input 6 Digit OTP -->
      <div v-else class="my-6">
        <div class="flex justify-center gap-2 sm:gap-2.5 my-4">
          <input
            v-for="i in 6"
            :id="`otp-input-${i - 1}`"
            :key="i"
            type="text"
            inputmode="numeric"
            maxlength="1"
            class="w-10 sm:w-12 h-12 sm:h-14 text-center font-heading font-extrabold text-xl sm:text-2xl rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 focus:outline-none tabular-nums transition-colors"
            :value="otpDigits[i - 1]"
            @input="onOtpInput($event, i - 1)"
            @keydown="onOtpKeyDown($event, i - 1)"
            @paste="onOtpPaste($event)"
          />
        </div>

        <div class="text-xs text-neutral-400 mb-5">
          OTP berlaku selama 5 menit
        </div>

        <BButton
          variant="primary"
          block
          size="md"
          :loading="loading"
          :disabled="otpString.length !== 6"
          class="flex items-center justify-center gap-1.5"
          @click="handleVerifyOtp"
        >
          <span>Verifikasi & Lanjutkan</span>
          <HugeiconsIcon :icon="ArrowRight02Icon" :size="15" :stroke-width="2" />
        </BButton>

        <div class="mt-5 text-xs text-neutral-500 flex items-center justify-center gap-2">
          <span>Belum menerima kode?</span>
          <button
            type="button"
            class="font-semibold text-primary-600 hover:underline disabled:text-neutral-400 disabled:no-underline transition-colors"
            :disabled="cooldownSeconds > 0 || loading"
            @click="handleSendOtp"
          >
            {{ cooldownSeconds > 0 ? `Kirim Ulang (${cooldownSeconds}s)` : 'Kirim Ulang OTP' }}
          </button>
        </div>

        <button
          type="button"
          class="text-[11px] text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300 underline mt-3 inline-block"
          @click="changePhone"
        >
          Ubah Nomor WhatsApp
        </button>
      </div>
    </BCard>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import BCard from '~/components/base/BCard.vue'
import BButton from '~/components/base/BButton.vue'
import BAlert from '~/components/base/BAlert.vue'
import { HugeiconsIcon } from '@hugeicons/vue'
import { ShieldCheckIcon, ArrowRight02Icon } from '@hugeicons/core-free-icons'
import { useAuthStore } from '~/stores/auth'
import { useApi } from '~/composables/useApi'

definePageMeta({
  layout: 'auth'
})

const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()

const step = ref<'input-phone' | 'input-otp'>('input-phone')
const phoneInput = ref('')
const otpDigits = ref<string[]>(['', '', '', '', '', ''])
const loading = ref(false)
const errorMessage = ref('')
const successMessage = ref('')
const cooldownSeconds = ref(0)
let timer: any = null

const otpString = computed(() => otpDigits.value.join(''))

const formattedPhone = computed(() => {
  const p = phoneInput.value.replace(/[^0-9]/g, '')
  if (p.startsWith('0')) return '62' + p.slice(1)
  if (p.startsWith('62')) return p
  return '62' + p
})

onMounted(() => {
  // Pre-fill dari query param atau auth store jika ada
  const queryPhone = route.query.phone as string
  if (queryPhone) {
    phoneInput.value = queryPhone
    step.value = 'input-otp'
    startCountdown(60)
  } else if (authStore.currentUser?.phone) {
    phoneInput.value = authStore.currentUser.phone
  }
})

onBeforeUnmount(() => {
  if (timer) clearInterval(timer)
})

function startCountdown(seconds: number) {
  if (timer) clearInterval(timer)
  cooldownSeconds.value = seconds
  timer = setInterval(() => {
    if (cooldownSeconds.value > 0) {
      cooldownSeconds.value--
    } else {
      clearInterval(timer)
    }
  }, 1000)
}

function changePhone() {
  step.value = 'input-phone'
  errorMessage.value = ''
  successMessage.value = ''
  otpDigits.value = ['', '', '', '', '', '']
}

function onOtpInput(e: Event, idx: number) {
  const target = e.target as HTMLInputElement
  const val = target.value.replace(/[^0-9]/g, '').slice(-1)
  otpDigits.value[idx] = val

  // Auto focus ke box berikutnya
  if (val && idx < 5) {
    const nextInput = document.getElementById(`otp-input-${idx + 1}`)
    nextInput?.focus()
  }

  // Jika semua terisi, otomatis verifikasi
  if (otpString.value.length === 6) {
    handleVerifyOtp()
  }
}

function onOtpKeyDown(e: KeyboardEvent, idx: number) {
  if (e.key === 'Backspace' && !otpDigits.value[idx] && idx > 0) {
    const prevInput = document.getElementById(`otp-input-${idx - 1}`)
    prevInput?.focus()
  }
}

function onOtpPaste(e: ClipboardEvent) {
  e.preventDefault()
  const pasted = e.clipboardData?.getData('text') || ''
  const digits = pasted.replace(/[^0-9]/g, '').slice(0, 6)
  if (!digits) return

  for (let i = 0; i < 6; i++) {
    otpDigits.value[i] = digits[i] || ''
  }

  const lastFilledIdx = Math.min(digits.length, 5)
  const inputToFocus = document.getElementById(`otp-input-${lastFilledIdx}`)
  inputToFocus?.focus()

  if (digits.length === 6) {
    handleVerifyOtp()
  }
}

async function handleSendOtp() {
  errorMessage.value = ''
  successMessage.value = ''

  const phone = formattedPhone.value
  if (!phone || phone.length < 10) {
    errorMessage.value = 'Nomor WhatsApp tidak valid. Masukkan nomor yang benar.'
    return
  }

  loading.value = true
  try {
    const res = await authStore.sendWhatsAppOtp(phone)

    if (res.success) {
      successMessage.value = res.message || 'Kode OTP 6 digit berhasil dikirim ke WhatsApp Anda.'
      step.value = 'input-otp'
      startCountdown(res.data?.cooldown || 60)
      setTimeout(() => {
        const firstInput = document.getElementById('otp-input-0')
        firstInput?.focus()
      }, 100)
    }
  } catch (err: any) {
    errorMessage.value = err?.message || 'Gagal mengirim kode OTP. Silakan coba lagi.'
  } finally {
    loading.value = false
  }
}

async function handleVerifyOtp() {
  errorMessage.value = ''
  successMessage.value = ''

  if (otpString.value.length !== 6) {
    errorMessage.value = 'Masukkan 6 digit kode OTP secara lengkap.'
    return
  }

  loading.value = true
  try {
    const res = await authStore.verifyPhoneOtp(formattedPhone.value, otpString.value)

    if (res.success) {
      successMessage.value = 'Verifikasi berhasil! Mengalihkan...'
      setTimeout(() => {
        router.push('/onboarding')
      }, 800)
    }
  } catch (err: any) {
    errorMessage.value = err?.message || 'Kode OTP tidak valid atau sudah kedaluwarsa.'
    // Kosongkan digit jika salah agar user bisa menginput ulang
    otpDigits.value = ['', '', '', '', '', '']
    const firstInput = document.getElementById('otp-input-0')
    firstInput?.focus()
  } finally {
    loading.value = false
  }
}
</script>
