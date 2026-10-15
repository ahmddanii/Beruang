<template>
  <div class="min-h-screen min-h-dvh w-full bg-[#F3F8FC] dark:bg-[#0C121D] text-neutral-900 dark:text-neutral-100 flex flex-col justify-center items-center px-4 py-8 sm:py-12 select-none relative font-sans overflow-x-hidden">
    
    <!-- Subtle Ambient Background Glow (Teal Ambient matching Landing Page) -->
    <div class="pointer-events-none absolute top-1/4 left-1/2 -translate-x-1/2 w-[520px] h-[520px] bg-[#0081A0]/5 dark:bg-[#0081A0]/10 rounded-full blur-3xl" />

    <!-- Atmospheric Layered Cloud Overlay -->
    <BCloudBackground :fixed="true" />

    <!-- TOP-LEFT: Pill Button "Kembali ke Beranda" / "Pilih Peran Lain" -->
    <div class="fixed top-6 left-6 sm:top-8 sm:left-8 z-30">
      <NuxtLink
        v-if="step === 'role'"
        to="/"
        class="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/90 dark:bg-[#13161F]/90 backdrop-blur-md border border-[#E2E8F0] dark:border-white/10 text-neutral-800 dark:text-neutral-200 text-xs sm:text-sm font-semibold shadow-xs hover:border-[#0081A0] hover:text-[#0081A0] dark:hover:border-[#2091AA] dark:hover:text-[#2091AA] transition-all duration-150"
      >
        <HugeiconsIcon :icon="ArrowLeft02Icon" :size="16" :stroke-width="2.2" />
        <span>Kembali ke Beranda</span>
      </NuxtLink>
      <button
        v-else
        type="button"
        class="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/90 dark:bg-[#13161F]/90 backdrop-blur-md border border-[#E2E8F0] dark:border-white/10 text-neutral-800 dark:text-neutral-200 text-xs sm:text-sm font-semibold shadow-xs hover:border-[#0081A0] hover:text-[#0081A0] dark:hover:border-[#2091AA] dark:hover:text-[#2091AA] transition-all duration-150 cursor-pointer"
        @click="goToRoleStep"
      >
        <HugeiconsIcon :icon="ArrowLeft02Icon" :size="16" :stroke-width="2.2" />
        <span>Pilih Peran Lain</span>
      </button>
    </div>

    <!-- ===================================================================== -->
    <!-- VIEW A: ROLE SELECTION & REGISTRATION METHOD (HERO VIEW)              -->
    <!-- ===================================================================== -->
    <main v-if="step === 'role'" class="relative z-10 w-full max-w-lg mx-auto flex flex-col items-center text-center my-auto py-2 animate-in fade-in duration-200">
      
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
          <div class="p-1 rounded-full bg-neutral-100/90 dark:bg-[#13161F]/90 border border-neutral-200/80 dark:border-white/10 grid grid-cols-3 gap-1 shadow-2xs">
            <button
              v-for="r in roleCards"
              :key="r.key"
              type="button"
              :class="[
                'flex items-center justify-center gap-1.5 py-2 px-2 rounded-full text-xs transition-all duration-150 cursor-pointer select-none',
                selectedRole === r.key
                  ? 'bg-white dark:bg-[#1A1D26] text-[#0081A0] dark:text-[#2091AA] font-bold shadow-xs border border-neutral-200/60 dark:border-white/10'
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

        <!-- Button 1: Register with Google OAuth (Tactile White Card Surface) -->
        <button
          type="button"
          :disabled="loading"
          class="w-full flex items-center justify-center gap-3 h-12 px-6 rounded-full bg-white dark:bg-[#13161F] border border-[#E2E8F0] dark:border-white/10 text-neutral-900 dark:text-white font-bold text-sm shadow-xs hover:bg-neutral-50 dark:hover:bg-[#1A1E29] hover:border-neutral-300 dark:hover:border-white/20 transition-all duration-150 active:scale-[0.99] cursor-pointer"
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

        <!-- Button 2: Register with WhatsApp (Brand Teal #0081A0) -->
        <button
          type="button"
          :disabled="loading"
          class="w-full flex items-center justify-center gap-3 h-12 px-6 rounded-full bg-[#0081A0] hover:bg-[#00708C] text-white font-bold text-sm shadow-[0_4px_14px_rgba(0,129,160,0.25)] transition-all duration-150 active:scale-[0.99] cursor-pointer"
          @click="goToPhoneStep"
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
            class="text-xs sm:text-sm font-bold text-[#0081A0] hover:text-[#00708C] dark:text-[#2091AA] dark:hover:text-[#50AABF] transition-colors duration-150 ml-1.5"
          >
            Masuk di Sini
          </NuxtLink>
        </div>
      </div>

      <!-- Loading / Feedback Badge -->
      <div v-if="loadingMessage" class="mt-4 px-5 py-2.5 rounded-full bg-[#00AA13] text-white font-bold text-sm shadow-sm animate-pulse">
        {{ loadingMessage }}
      </div>
    </main>

    <!-- ===================================================================== -->
    <!-- VIEW B: REGISTRATION PROCESS FLOW (MATCHES ONBOARDING PAGE DESIGN)     -->
    <!-- ===================================================================== -->
    <div v-else class="relative z-10 w-full max-w-xl mx-auto my-auto space-y-4 pt-14 sm:pt-6 pb-12 animate-in fade-in duration-200">
      
      <!-- Top Brand Header & Step Badge -->
      <div class="flex items-center justify-between flex-wrap gap-2">
        <div class="flex items-center gap-2.5 select-none cursor-default">
          <img src="/logo/logoSmall.svg" alt="Beruang Logo" class="h-8 w-auto object-contain select-none" />
          <div class="text-left">
            <span class="font-heading font-extrabold text-xl tracking-tight leading-none select-none block">
              <span class="text-[#0081A0] dark:text-[#2091AA]">Ber</span><span class="text-[#00AA13] dark:text-[#22C55E]">uang</span>
            </span>
            <span class="text-[11px] font-semibold text-[#0081A0] dark:text-[#2091AA] select-none">
              Pendaftaran Akun {{ activeRoleMeta.shortTitle }}
            </span>
          </div>
        </div>

        <span class="inline-flex items-center px-3 py-1 rounded-full bg-white/90 dark:bg-[#13161F]/90 border border-[#E2E8F0] dark:border-white/10 text-xs text-neutral-600 dark:text-neutral-300 font-semibold shadow-2xs tabular-nums">
          {{ currentStepNumber }} / 2
        </span>
      </div>

      <!-- Stepper Component Container -->
      <div class="p-3 sm:p-4 rounded-2xl bg-white/90 dark:bg-[#13161F]/90 backdrop-blur-md border border-[#E2E8F0] dark:border-white/10 shadow-xs">
        <BStepper :steps="registrationSteps" :current-step="currentStepNumber" />
      </div>

      <!-- Main Form Container -->
      <div class="bg-white/95 dark:bg-[#13161F]/95 backdrop-blur-md rounded-3xl border border-[#E2E8F0] dark:border-white/10 shadow-sm p-6 sm:p-8 space-y-5">
        
        <!-- STEP 1: Phone Number Input -->
        <div v-if="step === 'phone'" class="space-y-4">
          <div class="flex items-center gap-3 mb-2">
            <div class="w-10 h-10 rounded-xl bg-[#0081A0]/10 dark:bg-[#0081A0]/20 text-[#0081A0] dark:text-[#2091AA] flex items-center justify-center shrink-0">
              <HugeiconsIcon :icon="Call02Icon" :size="20" :stroke-width="1.75" />
            </div>
            <div class="text-left">
              <h3 class="font-bold text-base sm:text-lg text-neutral-900 dark:text-neutral-50">
                1. Nomor WhatsApp / Handphone
              </h3>
              <p class="text-xs text-neutral-500">
                Masukkan nomor aktif untuk verifikasi pendaftaran akun {{ activeRoleMeta.shortTitle }}.
              </p>
            </div>
          </div>

          <!-- Phone Input Group -->
          <div class="space-y-1.5 text-left">
            <div class="flex items-center justify-between">
              <label for="regPhone" class="block text-xs font-bold uppercase tracking-wider text-neutral-600 dark:text-neutral-400">
                Nomor WhatsApp / Handphone
              </label>
              <span class="text-[11px] text-neutral-400">Format: 8xx-xxxx-xxxx</span>
            </div>

            <div
              :class="[
                'relative flex items-center p-1.5 rounded-2xl border transition-all duration-200 bg-neutral-50/70 dark:bg-[#13161F]',
                phoneValidationError
                  ? 'border-red-500 ring-2 ring-red-500/15'
                  : 'border-neutral-200/90 dark:border-white/10 focus-within:border-[#0081A0] focus-within:ring-2 focus-within:ring-[#0081A0]/20'
              ]"
            >
              <!-- Country Code Prefix Badge (NO EMOJI) -->
              <div class="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white dark:bg-[#1A1D26] border border-neutral-200/80 dark:border-white/10 text-neutral-800 dark:text-neutral-200 font-bold text-sm shadow-2xs select-none shrink-0">
                <span class="text-xs font-extrabold text-[#0081A0] dark:text-[#2091AA]">ID</span>
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
                class="w-full px-3 py-2 bg-transparent text-neutral-900 dark:text-white placeholder:text-neutral-400 dark:placeholder:text-neutral-600 text-lg sm:text-xl font-bold tracking-wide focus:outline-none tabular-nums"
                @input="onPhoneInput"
                @keydown="onPhoneKeydown"
                @keydown.enter="requestOtp"
              />
            </div>

            <div class="px-1 min-h-[18px]">
              <p v-if="phoneValidationError" class="text-xs text-red-600 dark:text-red-400 flex items-center gap-1.5 animate-in fade-in duration-150">
                <span class="w-1.5 h-1.5 rounded-full bg-red-500 shrink-0" />
                <span>{{ phoneValidationError }}</span>
              </p>
              <p v-else-if="!isPhoneValid" class="text-[11px] text-neutral-500 dark:text-neutral-400">
                Ketik angka saja, tanda hubung (-) otomatis terisi.
              </p>
            </div>
          </div>

          <!-- Fast Demo Quick Fill Helper -->
          <div class="p-3.5 rounded-2xl bg-white/70 dark:bg-[#13161F]/70 border border-[#E2E8F0] dark:border-white/10 flex items-center justify-between text-xs">
            <div class="flex items-center gap-2 text-neutral-600 dark:text-neutral-400">
              <span class="w-1.5 h-1.5 rounded-full bg-[#0081A0] shrink-0" />
              <span>Nomor demo {{ activeRoleMeta.shortTitle }}: <strong class="font-bold text-neutral-900 dark:text-white">+62 {{ activeRoleDemoPhone }}</strong></span>
            </div>
            <button
              type="button"
              class="px-3.5 py-1.5 rounded-full bg-white dark:bg-[#1A1D26] border border-[#0081A0]/30 hover:border-[#0081A0] text-[#0081A0] dark:text-[#2091AA] font-bold text-xs transition-colors cursor-pointer shadow-2xs"
              @click="fillCurrentRoleDemoPhone"
            >
              Isi Otomatis
            </button>
          </div>

          <!-- Bottom Navigation Action Bar -->
          <div class="flex items-center justify-between pt-4 border-t border-neutral-100 dark:border-neutral-800">
            <button
              type="button"
              class="px-5 py-2.5 rounded-full border border-neutral-200 dark:border-white/10 hover:border-[#0081A0] text-neutral-700 dark:text-neutral-300 font-bold text-sm transition-all duration-150 cursor-pointer flex items-center gap-2 bg-white dark:bg-[#13161F]"
              @click="goToRoleStep"
            >
              <HugeiconsIcon :icon="ArrowLeft02Icon" :size="16" :stroke-width="2.2" />
              <span>Kembali</span>
            </button>

            <button
              type="button"
              :disabled="loading || !isPhoneValid"
              :class="[
                'px-6 py-2.5 rounded-full font-bold text-sm sm:text-base transition-all duration-150 flex items-center gap-2 shadow-xs cursor-pointer',
                isPhoneValid && !loading
                  ? 'bg-[#0081A0] hover:bg-[#00708C] text-white shadow-[0_4px_14px_rgba(0,129,160,0.25)] active:scale-[0.99]'
                  : 'bg-neutral-100 dark:bg-neutral-800 border border-neutral-200/70 dark:border-neutral-700/60 text-neutral-400 dark:text-neutral-500 cursor-not-allowed'
              ]"
              @click="requestOtp"
            >
              <span>{{ loading ? 'Mengirim Kode...' : 'Kirim Kode Verifikasi' }}</span>
              <HugeiconsIcon :icon="ArrowRight02Icon" :size="16" :stroke-width="2.2" />
            </button>
          </div>
        </div>

        <!-- STEP 2: 4-Digit OTP Input -->
        <div v-else-if="step === 'otp'" class="space-y-4">
          <div class="flex items-center gap-3 mb-2">
            <div class="w-10 h-10 rounded-xl bg-[#0081A0]/10 dark:bg-[#0081A0]/20 text-[#0081A0] dark:text-[#2091AA] flex items-center justify-center shrink-0">
              <HugeiconsIcon :icon="ShieldCheckIcon" :size="20" :stroke-width="1.75" />
            </div>
            <div class="text-left">
              <h3 class="font-bold text-base sm:text-lg text-neutral-900 dark:text-neutral-50">
                2. Verifikasi Kode Masuk
              </h3>
              <p class="text-xs text-neutral-500">
                Kode 4 angka sudah dikirim via WhatsApp ke +62 {{ cleanPhone }}.
              </p>
            </div>
          </div>

          <div class="text-center py-1">
            <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-neutral-100 dark:bg-[#1A1D26] text-neutral-700 dark:text-neutral-300 text-xs font-semibold mx-auto border border-neutral-200/60 dark:border-white/10">
              <span>Kirim ke: +62 {{ phoneInput }}</span>
              <button
                type="button"
                class="text-[#0081A0] hover:text-[#00708C] dark:text-[#2091AA] font-bold ml-1 cursor-pointer"
                @click="goToPhoneStep"
              >
                Ubah
              </button>
            </div>
          </div>

          <!-- 4-Digit Input Boxes -->
          <div class="flex items-center justify-center gap-2.5 sm:gap-3 py-2">
            <input
              v-for="(digit, idx) in otpDigits"
              :key="idx"
              :ref="el => setOtpRef(el, idx)"
              v-model="otpDigits[idx]"
              type="text"
              maxlength="1"
              inputmode="numeric"
              autocomplete="one-time-code"
              pattern="[0-9]*"
              :class="[
                'w-14 h-16 sm:w-16 sm:h-16 shrink-0 rounded-2xl border-2 text-center text-2xl sm:text-3xl font-extrabold tabular-nums transition-all duration-150 focus:outline-none focus:ring-4 focus:ring-[#0081A0]/15 caret-[#0081A0] shadow-2xs',
                otpDigits[idx]
                  ? 'border-[#0081A0] bg-[#0081A0]/5 dark:bg-[#0081A0]/15 text-[#0081A0] dark:text-[#2091AA]'
                  : 'border-neutral-200/90 dark:border-white/10 bg-white dark:bg-[#13161F] text-neutral-900 dark:text-white hover:border-[#0081A0]/60 focus:border-[#0081A0]'
              ]"
              @input="onOtpInput(idx, $event)"
              @keydown="onOtpKeydown(idx, $event)"
              @paste="onOtpPaste"
              @focus="onOtpFocus"
            />
          </div>

          <!-- Demo Hint -->
          <div class="p-3.5 rounded-2xl bg-amber-500/10 dark:bg-amber-950/40 border border-amber-500/20 text-xs text-amber-800 dark:text-amber-300 flex items-center justify-between text-left">
            <div class="flex items-center gap-2">
              <span class="w-2 h-2 rounded-full bg-amber-500 animate-pulse shrink-0" />
              <span>Kode uji coba: <strong class="font-bold text-amber-900 dark:text-amber-200">1234</strong></span>
            </div>
            <button
              type="button"
              class="px-3.5 py-1.5 rounded-full bg-amber-500/20 hover:bg-amber-500/30 text-amber-900 dark:text-amber-200 font-bold text-xs transition-colors cursor-pointer"
              @click="fillOtpDemo"
            >
              Isi Otomatis
            </button>
          </div>

          <!-- Bottom Navigation Action Bar -->
          <div class="flex items-center justify-between pt-4 border-t border-neutral-100 dark:border-neutral-800">
            <button
              type="button"
              class="px-5 py-2.5 rounded-full border border-neutral-200 dark:border-white/10 hover:border-[#0081A0] text-neutral-700 dark:text-neutral-300 font-bold text-sm transition-all duration-150 cursor-pointer flex items-center gap-2 bg-white dark:bg-[#13161F]"
              @click="goToPhoneStep"
            >
              <HugeiconsIcon :icon="ArrowLeft02Icon" :size="16" :stroke-width="2.2" />
              <span>Ubah Nomor</span>
            </button>

            <button
              type="button"
              :disabled="loading || otpString.length < 4"
              :class="[
                'px-6 py-2.5 rounded-full font-bold text-sm sm:text-base transition-all duration-150 flex items-center gap-2 shadow-xs cursor-pointer',
                otpString.length === 4 && !loading
                  ? 'bg-[#0081A0] hover:bg-[#00708C] text-white shadow-[0_4px_14px_rgba(0,129,160,0.25)] active:scale-[0.99]'
                  : 'bg-neutral-100 dark:bg-neutral-800 border border-neutral-200/70 dark:border-neutral-700/60 text-neutral-400 dark:text-neutral-500 cursor-not-allowed'
              ]"
              @click="verifyAndRegister"
            >
              <span>{{ loading ? 'Mendaftarkan...' : 'Verifikasi & Lanjut' }}</span>
              <HugeiconsIcon :icon="ArrowRight02Icon" :size="16" :stroke-width="2.2" />
            </button>
          </div>
        </div>

      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import { ref, computed, nextTick, onMounted, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAuthStore, type UserRole } from '~/stores/auth'
import BLottiePlayer from '~/components/base/BLottiePlayer.vue'
import BCloudBackground from '~/components/base/BCloudBackground.vue'
import BStepper from '~/components/base/BStepper.vue'
import { HugeiconsIcon } from '@hugeicons/vue'
import {
  ArrowLeft02Icon,
  ArrowRight02Icon,
  Call02Icon,
  ShieldCheckIcon,
  Store01Icon,
  UserGroupIcon,
  Coins01Icon
} from '@hugeicons/core-free-icons'

definePageMeta({
  layout: false
})

const router = useRouter()
const route = useRoute()
const authStore = useAuthStore()

const lottieAnimationUrl = 'https://lottie.host/c484a436-22e4-4f84-b255-0d4edc5a280d/eJzWl0Bciv.lottie'

// Role Definitions (Layman-Friendly)
const roleCards = [
  {
    key: 'UMKM' as UserRole,
    title: 'Pemilik Usaha',
    shortTitle: 'UMKM',
    demoName: 'Fikri S.',
    demoPhone: '812-3456-7890',
    desc: 'Kembangkan usaha dan siap dapat modal.',
    icon: Store01Icon
  },
  {
    key: 'CONSULTANT' as UserRole,
    title: 'Konsultan',
    shortTitle: 'Konsultan',
    demoName: 'Dra. Maya',
    demoPhone: '819-8765-4321',
    desc: 'Bantu bimbing UMKM agar usahanya maju.',
    icon: UserGroupIcon
  },
  {
    key: 'INVESTOR' as UserRole,
    title: 'Investor',
    shortTitle: 'Investor',
    demoName: 'Hendro W.',
    demoPhone: '811-2233-4455',
    desc: 'Cari usaha pilihan untuk diberi modal.',
    icon: Coins01Icon
  }
]

// Steps for Phone & OTP Flow
const registrationSteps = [
  { title: 'Nomor WhatsApp', description: 'Nomor telepon aktif' },
  { title: 'Verifikasi Kode', description: 'Kode OTP 4 angka' }
]

// State
const selectedRole = ref<UserRole>('UMKM')
const step = ref<'role' | 'phone' | 'otp'>('role')
const loading = ref(false)
const loadingMessage = ref('')
const phoneInput = ref('812-3456-7890')

const activeRoleMeta = computed(() => {
  return roleCards.find(r => r.key === selectedRole.value) || roleCards[0]
})

const activeRoleDemoPhone = computed(() => {
  return activeRoleMeta.value.demoPhone || '812-3456-7890'
})

const currentStepNumber = computed(() => {
  return step.value === 'otp' ? 2 : 1
})

function onRoleTabClick(role: UserRole) {
  selectedRole.value = role
  const card = roleCards.find(r => r.key === role)
  if (card?.demoPhone) {
    phoneInput.value = formatIndonesianPhone(card.demoPhone)
  }
}

function fillCurrentRoleDemoPhone() {
  phoneInput.value = formatIndonesianPhone(activeRoleDemoPhone.value)
}

function goToPhoneStep() {
  step.value = 'phone'
  router.push({ path: '/daftar', query: { step: 'phone', role: selectedRole.value } })
}

function goToRoleStep() {
  step.value = 'role'
  router.push({ path: '/daftar' })
}

function goToOtpStep() {
  step.value = 'otp'
  router.push({ path: '/daftar', query: { step: 'otp', role: selectedRole.value } })
}

// Sync route queries on load and on route change
onMounted(() => {
  if (route.query.role && ['UMKM', 'CONSULTANT', 'INVESTOR'].includes(route.query.role as string)) {
    selectedRole.value = route.query.role as UserRole
    const card = roleCards.find(r => r.key === selectedRole.value)
    if (card?.demoPhone) {
      phoneInput.value = formatIndonesianPhone(card.demoPhone)
    }
  }
  if (route.query.step === 'phone' || route.query.step === 'otp') {
    step.value = route.query.step as 'phone' | 'otp'
  }
})

watch(() => route.query, (q) => {
  if (q.role && ['UMKM', 'CONSULTANT', 'INVESTOR'].includes(q.role as string)) {
    selectedRole.value = q.role as UserRole
  }
  if (q.step === 'phone' || q.step === 'otp') {
    step.value = q.step as 'phone' | 'otp'
  } else {
    step.value = 'role'
  }
})

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
    goToOtpStep()
    otpDigits.value = ['', '', '', '']
    nextTick(() => {
      otpRefs.value[0]?.focus()
    })
  }, 300)
}

function onOtpInput(index: number, event: Event) {
  const target = event.target as HTMLInputElement
  const raw = target.value.replace(/\D/g, '')

  if (raw.length > 1) {
    const digits = raw.slice(0, 4).split('')
    digits.forEach((d, i) => {
      if (index + i < 4) {
        otpDigits.value[index + i] = d
      }
    })
    const nextIdx = Math.min(index + digits.length, 3)
    otpRefs.value[nextIdx]?.focus()
    if (otpString.value.length === 4) {
      verifyAndRegister()
    }
    return
  }

  otpDigits.value[index] = raw
  if (raw && index < 3) {
    otpRefs.value[index + 1]?.focus()
  }
  if (otpString.value.length === 4) {
    verifyAndRegister()
  }
}

function onOtpKeydown(index: number, event: KeyboardEvent) {
  if (event.key === 'Backspace') {
    if (!otpDigits.value[index] && index > 0) {
      event.preventDefault()
      otpDigits.value[index - 1] = ''
      otpRefs.value[index - 1]?.focus()
    }
  } else if (event.key === 'ArrowLeft' && index > 0) {
    event.preventDefault()
    otpRefs.value[index - 1]?.focus()
  } else if (event.key === 'ArrowRight' && index < 3) {
    event.preventDefault()
    otpRefs.value[index + 1]?.focus()
  }
}

function onOtpPaste(event: ClipboardEvent) {
  event.preventDefault()
  const text = (event.clipboardData?.getData('text') || '').replace(/\D/g, '').slice(0, 4)
  if (!text) return
  const chars = text.split('')
  chars.forEach((c, i) => {
    if (i < 4) {
      otpDigits.value[i] = c
    }
  })
  const nextIdx = Math.min(chars.length, 3)
  otpRefs.value[nextIdx]?.focus()
  if (otpString.value.length === 4) {
    verifyAndRegister()
  }
}

function onOtpFocus(event: Event) {
  const target = event.target as HTMLInputElement
  target.select()
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

    // Simpan ke authStore dengan field tabel PostgreSQL
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
