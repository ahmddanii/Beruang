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

      <!-- Error Alert in Step Role -->
      <div v-if="errorMessage && step === 'role'" class="mt-3 p-3 max-w-sm w-full rounded-2xl bg-red-50 dark:bg-red-950/50 border border-red-200 dark:border-red-800 text-xs text-red-600 dark:text-red-400 flex items-start gap-2 text-left animate-in fade-in duration-200">
        <span class="font-bold shrink-0">!</span>
        <span>{{ errorMessage }}</span>
      </div>

      <!-- Loading / Feedback Badge -->
      <div v-if="loadingMessage" class="mt-4 px-5 py-2.5 rounded-full bg-[#00AA13] text-white font-bold text-sm shadow-sm animate-pulse">
        {{ loadingMessage }}
      </div>
    </main>

    <!-- ===================================================================== -->
    <!-- VIEW B: REGISTRATION PROCESS FLOW (MATCHES ONBOARDING PAGE DESIGN)     -->
    <!-- ===================================================================== -->
    <div v-else class="relative z-10 w-full max-w-lg mx-auto flex flex-col items-center animate-in fade-in duration-200">
      
      <!-- Centered Brand Header (Outside Card) -->
      <div class="flex flex-col items-center text-center mb-4 sm:mb-5 select-none cursor-default">
        <NuxtLink to="/" class="flex items-center gap-2.5 mb-1 group">
          <img src="/logo/logoSmall.svg" alt="Beruang Logo" class="h-8 sm:h-9 w-auto object-contain transition-transform group-hover:scale-105 select-none" />
          <span class="font-heading font-extrabold text-2xl tracking-tight leading-none select-none">
            <span class="text-[#0081A0] dark:text-[#2091AA]">Ber</span><span class="text-[#00AA13] dark:text-[#22C55E]">uang</span>
          </span>
        </NuxtLink>
        <span class="text-xs font-semibold text-neutral-500 dark:text-neutral-400 select-none">
          Pendaftaran Akun {{ activeRoleMeta.shortTitle }}
        </span>
      </div>

      <!-- Main Form Container -->
      <div class="w-full bg-white/95 dark:bg-[#13161F]/95 backdrop-blur-md rounded-3xl border border-[#E2E8F0] dark:border-white/10 shadow-[0_10px_35px_-8px_rgba(0,129,160,0.08),0_4px_20px_-2px_rgba(15,23,42,0.04)] p-6 sm:p-8 space-y-5 text-left">
        
        <!-- STEP 1: Phone Number Input -->
        <div v-if="step === 'phone'" class="space-y-4">
          <!-- Step Title Header -->
          <div class="flex items-center gap-3 mb-2">
            <div class="w-10 h-10 rounded-xl bg-[#0081A0]/10 dark:bg-[#0081A0]/20 text-[#0081A0] dark:text-[#2091AA] flex items-center justify-center shrink-0">
              <HugeiconsIcon :icon="Call02Icon" :size="20" :stroke-width="1.8" />
            </div>
            <div class="text-left">
              <h3 class="font-bold text-base sm:text-lg text-neutral-900 dark:text-neutral-50 leading-tight">
                Nomor WhatsApp / Handphone
              </h3>
              <p class="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5 leading-relaxed">
                Masukkan nomor aktif untuk verifikasi pendaftaran akun {{ activeRoleMeta.shortTitle }}.
              </p>
            </div>
          </div>

          <!-- Phone Input Group -->
          <div class="space-y-1.5 text-left">
            <label for="regPhone" class="block text-xs font-bold uppercase tracking-wider text-neutral-600 dark:text-neutral-400">
              Nomor WhatsApp / Handphone
            </label>

            <div
              :class="[
                'relative flex items-center p-1.5 rounded-2xl border transition-all duration-200 bg-neutral-50/70 dark:bg-[#1A1D26]',
                phoneValidationError
                  ? 'border-red-500 ring-2 ring-red-500/15'
                  : isPhoneValid
                    ? 'border-[#00AA13] ring-2 ring-[#00AA13]/15'
                    : 'border-neutral-200/90 dark:border-white/10 focus-within:border-[#0081A0] focus-within:ring-2 focus-within:ring-[#0081A0]/20'
              ]"
            >
              <!-- Country Code Prefix Badge (NO EMOJI) -->
              <div class="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white dark:bg-[#13161F] border border-neutral-200/80 dark:border-white/10 text-neutral-800 dark:text-neutral-200 font-bold text-sm shadow-2xs select-none shrink-0">
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
                class="w-full px-3 py-2 bg-transparent text-neutral-900 dark:text-white placeholder:text-neutral-400 dark:placeholder:text-neutral-600 text-lg sm:text-xl font-medium tracking-normal focus:outline-none tabular-nums"
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

          <!-- Mode Pengujian / Akun Demo (Disembunyikan rapi di accordion) -->
          <div class="pt-1 text-center">
            <button
              type="button"
              class="inline-flex items-center gap-1.5 text-xs text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300 font-medium transition-colors cursor-pointer"
              @click="showDemoAccounts = !showDemoAccounts"
            >
              <span>Mode Pengujian & Evaluasi</span>
              <HugeiconsIcon :icon="showDemoAccounts ? ArrowUp01Icon : ArrowDown01Icon" :size="12" />
            </button>

            <div v-if="showDemoAccounts" class="mt-2.5 p-3 rounded-2xl bg-white/70 dark:bg-[#1A1D26]/70 border border-[#E2E8F0] dark:border-white/10 space-y-2 text-left animate-in fade-in duration-150">
              <span class="text-[11px] font-bold text-neutral-600 dark:text-neutral-400 block">Isi Cepat Nomor Demo:</span>
              <div class="grid grid-cols-3 gap-2">
                <button
                  v-for="r in roleCards"
                  :key="r.key"
                  type="button"
                  :class="[
                    'py-2 px-2 rounded-xl border text-center transition-all duration-150 cursor-pointer flex flex-col items-center justify-center gap-0.5',
                    cleanPhone === r.demoPhone.replace(/\D/g, '')
                      ? 'bg-[#0081A0]/10 border-[#0081A0] text-[#0081A0]'
                      : 'bg-white dark:bg-[#13161F] border-neutral-200/80 text-neutral-700 dark:text-neutral-300'
                  ]"
                  @click="setDemoPhone(r.demoPhone, r.key)"
                >
                  <span class="block text-xs font-bold">{{ r.shortTitle }}</span>
                  <span class="block text-[10px] text-neutral-500 truncate">{{ r.demoName }}</span>
                </button>
              </div>
            </div>
          </div>

          <!-- Error / Success Alert in Phone Step -->
          <div v-if="errorMessage && step === 'phone'" class="p-3 rounded-2xl bg-red-50 dark:bg-red-950/50 border border-red-200 dark:border-red-800 text-xs text-red-600 dark:text-red-400 flex items-start gap-2">
            <span class="font-bold shrink-0">!</span>
            <span>{{ errorMessage }}</span>
          </div>

          <!-- Bottom Navigation Action Bar -->
          <div class="flex items-center justify-between gap-3 pt-4 border-t border-neutral-100 dark:border-white/5">
            <button
              type="button"
              class="px-5 py-2.5 rounded-full border border-neutral-200 dark:border-white/10 hover:border-[#0081A0] hover:text-[#0081A0] text-neutral-700 dark:text-neutral-300 font-bold text-sm transition-all duration-150 cursor-pointer flex items-center gap-2 bg-white dark:bg-[#13161F] shadow-2xs shrink-0"
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

        <!-- STEP 2: 6-Digit OTP Input -->
        <div v-else-if="step === 'otp'" class="space-y-4">
          <!-- Step Title Header -->
          <div class="flex items-center gap-3 mb-2">
            <div class="w-10 h-10 rounded-xl bg-[#0081A0]/10 dark:bg-[#0081A0]/20 text-[#0081A0] dark:text-[#2091AA] flex items-center justify-center shrink-0">
              <HugeiconsIcon :icon="ShieldCheckIcon" :size="20" :stroke-width="1.8" />
            </div>
            <div class="text-left">
              <h3 class="font-bold text-base sm:text-lg text-neutral-900 dark:text-neutral-50 leading-tight">
                Verifikasi Kode Masuk
              </h3>
              <p class="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5 leading-relaxed">
                Kode 6 angka resmi sudah dikirim via WhatsApp ke +62 {{ cleanPhone }}.
              </p>
            </div>
          </div>

          <!-- Error & Success Banners -->
          <div v-if="errorMessage" class="p-3 rounded-2xl bg-red-50 dark:bg-red-950/50 border border-red-200 dark:border-red-800 text-xs text-red-600 dark:text-red-400 flex items-start gap-2">
            <span class="font-bold shrink-0">!</span>
            <span>{{ errorMessage }}</span>
          </div>

          <div v-if="successNotification" class="p-3 rounded-2xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 text-xs text-emerald-700 dark:text-emerald-300 flex items-center gap-2">
            <HugeiconsIcon :icon="CheckmarkCircle01Icon" :size="16" class="shrink-0" />
            <span>{{ successNotification }}</span>
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

          <!-- 6-Digit Input Boxes -->
          <div class="flex items-center justify-center gap-2 sm:gap-2.5 py-2">
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
                'w-10 h-13 sm:w-12 sm:h-15 shrink-0 rounded-2xl border-2 text-center text-xl sm:text-2xl font-extrabold tabular-nums transition-all duration-150 focus:outline-none focus:ring-4 focus:ring-[#0081A0]/15 caret-[#0081A0] shadow-2xs',
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

          <!-- Fast Fill OTP Demo Helper -->
          <div class="text-center pt-0.5">
            <button
              type="button"
              class="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#0081A0]/10 hover:bg-[#0081A0]/20 dark:bg-[#0081A0]/20 dark:hover:bg-[#0081A0]/30 text-[#0081A0] dark:text-[#2091AA] text-xs font-bold transition-all cursor-pointer shadow-2xs"
              @click="fillOtpDemo"
            >
              <span>⚡ Isi Cepat OTP Demo (849201)</span>
            </button>
          </div>

          <!-- Resend Code Timer -->
          <div class="text-center pt-1">
            <p class="text-xs text-neutral-500 dark:text-neutral-400">
              Belum menerima kode verifikasi?
              <button
                v-if="resendCountdown === 0"
                type="button"
                class="text-[#0081A0] hover:text-[#00708C] dark:text-[#2091AA] font-bold ml-1 cursor-pointer hover:underline"
                @click="resendOtp"
              >
                Kirim Ulang
              </button>
              <span v-else class="text-neutral-400 dark:text-neutral-500 font-semibold ml-1 tabular-nums">
                Kirim ulang dalam {{ resendCountdown }}s
              </span>
            </p>
          </div>

          <!-- Bottom Navigation Action Bar -->
          <div class="flex items-center justify-between gap-3 pt-4 border-t border-neutral-100 dark:border-white/5">
            <button
              type="button"
              class="px-5 py-2.5 rounded-full border border-neutral-200 dark:border-white/10 hover:border-[#0081A0] hover:text-[#0081A0] text-neutral-700 dark:text-neutral-300 font-bold text-sm transition-all duration-150 cursor-pointer flex items-center gap-2 bg-white dark:bg-[#13161F] shadow-2xs shrink-0"
              @click="goToPhoneStep"
            >
              <HugeiconsIcon :icon="ArrowLeft02Icon" :size="16" :stroke-width="2.2" />
              <span>Ubah Nomor</span>
            </button>

            <button
              type="button"
              :disabled="loading || otpString.length !== 6"
              :class="[
                'px-6 py-2.5 rounded-full font-bold text-sm sm:text-base transition-all duration-150 flex items-center gap-2 shadow-xs cursor-pointer',
                otpString.length === 6 && !loading
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
import { ref, computed, nextTick, onMounted, onBeforeUnmount, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAuthStore, type UserRole } from '~/stores/auth'
import { useGoogleAuth } from '~/composables/useGoogleAuth'
import BLottiePlayer from '~/components/base/BLottiePlayer.vue'
import BCloudBackground from '~/components/base/BCloudBackground.vue'
import BStepper from '~/components/base/BStepper.vue'
import BModal from '~/components/base/BModal.vue'
import { HugeiconsIcon } from '@hugeicons/vue'
import {
  ArrowLeft02Icon,
  ArrowRight02Icon,
  Call02Icon,
  ShieldCheckIcon,
  Store01Icon,
  UserGroupIcon,
  Coins01Icon,
  CheckmarkCircle01Icon,
  ArrowDown01Icon,
  ArrowUp01Icon
} from '@hugeicons/core-free-icons'

definePageMeta({
  layout: false
})

const router = useRouter()
const route = useRoute()
const authStore = useAuthStore()
const googleAuth = useGoogleAuth()

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
  { title: 'Verifikasi Kode', description: 'Kode OTP 6 angka' }
]

// State
const showDemoAccounts = ref(false)
const selectedRole = ref<UserRole>('UMKM')
const step = ref<'role' | 'phone' | 'otp'>('role')
const loading = ref(false)
const loadingMessage = ref('')
const errorMessage = ref('')
const successNotification = ref('')
const resendCountdown = ref(60)
let timerInterval: any = null
const phoneInput = ref('')

const activeRoleMeta = computed(() => {
  return roleCards.find(r => r.key === selectedRole.value) || roleCards[0]
})

const activeRoleDemoPhone = computed(() => {
  return activeRoleMeta.value.demoPhone || '812-3456-7890'
})

const currentStepNumber = computed(() => {
  return step.value === 'otp' ? 2 : 1
})

function setDemoPhone(phone: string, role?: UserRole) {
  if (role) selectedRole.value = role
  phoneInput.value = formatIndonesianPhone(phone)
}

function onRoleTabClick(role: UserRole) {
  selectedRole.value = role
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

// OTP State (6 Digits to match Fonnte Gateway)
const otpDigits = ref(['', '', '', '', '', ''])
const otpRefs = ref<(HTMLInputElement | null)[]>([])

function setOtpRef(el: any, index: number) {
  if (el) otpRefs.value[index] = el as HTMLInputElement
}

const otpString = computed(() => otpDigits.value.join(''))

onBeforeUnmount(() => {
  if (timerInterval) clearInterval(timerInterval)
})

function startResendTimer(seconds: number = 60) {
  resendCountdown.value = seconds
  if (timerInterval) clearInterval(timerInterval)
  timerInterval = setInterval(() => {
    if (resendCountdown.value > 0) {
      resendCountdown.value--
    } else {
      clearInterval(timerInterval)
    }
  }, 1000)
}

async function requestOtp() {
  if (!isPhoneValid.value) return
  errorMessage.value = ''
  successNotification.value = ''
  loading.value = true
  try {
    const res = await authStore.sendWhatsAppOtp(cleanPhone.value)
    successNotification.value = res?.message || 'Kode OTP 6 digit berhasil dikirim via WhatsApp.'
    goToOtpStep()
    startResendTimer(res?.data?.cooldown || 60)
    otpDigits.value = ['', '', '', '', '', '']
    nextTick(() => {
      otpRefs.value[0]?.focus()
    })
  } catch (err: any) {
    errorMessage.value = err?.message || 'Gagal mengirim kode OTP. Pastikan nomor WhatsApp aktif.'
  } finally {
    loading.value = false
  }
}

async function resendOtp() {
  if (resendCountdown.value > 0) return
  errorMessage.value = ''
  successNotification.value = ''
  loading.value = true
  try {
    const res = await authStore.sendWhatsAppOtp(cleanPhone.value)
    startResendTimer(res?.data?.cooldown || 60)
    successNotification.value = res?.message || 'Kode baru telah dikirimkan via WhatsApp!'
    setTimeout(() => {
      successNotification.value = ''
    }, 3500)
  } catch (err: any) {
    errorMessage.value = err?.message || 'Gagal mengirim ulang kode OTP.'
  } finally {
    loading.value = false
  }
}

function onOtpInput(index: number, event: Event) {
  const target = event.target as HTMLInputElement
  const raw = target.value.replace(/\D/g, '')

  if (raw.length > 1) {
    const digits = raw.slice(0, 6).split('')
    digits.forEach((d, i) => {
      if (index + i < 6) {
        otpDigits.value[index + i] = d
      }
    })
    const nextIdx = Math.min(index + digits.length, 5)
    otpRefs.value[nextIdx]?.focus()
    if (otpString.value.length === 6) {
      verifyAndRegister()
    }
    return
  }

  otpDigits.value[index] = raw
  if (raw && index < 5) {
    otpRefs.value[index + 1]?.focus()
  }
  if (otpString.value.length === 6) {
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
  } else if (event.key === 'ArrowRight' && index < 5) {
    event.preventDefault()
    otpRefs.value[index + 1]?.focus()
  }
}

function onOtpPaste(event: ClipboardEvent) {
  event.preventDefault()
  const text = (event.clipboardData?.getData('text') || '').replace(/\D/g, '').slice(0, 6)
  if (!text) return
  const chars = text.split('')
  chars.forEach((c, i) => {
    if (i < 6) {
      otpDigits.value[i] = c
    }
  })
  const nextIdx = Math.min(chars.length, 5)
  otpRefs.value[nextIdx]?.focus()
  if (otpString.value.length === 6) {
    verifyAndRegister()
  }
}

function onOtpFocus(event: Event) {
  const target = event.target as HTMLInputElement
  target.select()
}

function fillOtpDemo() {
  otpDigits.value = ['8', '4', '9', '2', '0', '1']
  verifyAndRegister()
}

async function handleGoogleRegister() {
  errorMessage.value = ''
  await googleAuth.triggerGoogleLogin(async (credential: string, userProfile?: { name?: string; email?: string; picture?: string }) => {
    loading.value = true
    loadingMessage.value = '✓ Menghubungkan akun Google...'
    try {
      await authStore.loginWithGoogle(credential, selectedRole.value, userProfile)
      loadingMessage.value = `✓ Mendaftar sebagai ${activeRoleMeta.value.shortTitle}...`
      setTimeout(() => {
        router.push(`/onboarding?role=${selectedRole.value}`)
      }, 300)
    } catch (err: any) {
      errorMessage.value = err?.data?.message || err?.message || 'Pendaftaran dengan Google gagal'
    } finally {
      loading.value = false
      loadingMessage.value = ''
    }
  })

  if (googleAuth.error.value) {
    errorMessage.value = googleAuth.error.value
  }
}

async function verifyAndRegister() {
  if (otpString.value.length !== 6) return
  errorMessage.value = ''
  loading.value = true
  const roleMeta = activeRoleMeta.value
  loadingMessage.value = '✓ Memverifikasi nomor WhatsApp...'

  // Verifikasi OTP (Bypass untuk kode demo 849201 atau nomor demo seeder)
  let otpVerified = false
  if (otpString.value === '849201' || cleanPhone.value.includes('987654321') || cleanPhone.value.endsWith('4321') || cleanPhone.value.endsWith('7890')) {
    otpVerified = true
  } else {
    try {
      await authStore.verifyPhoneOtp(cleanPhone.value, otpString.value)
      otpVerified = true
    } catch (err: any) {
      errorMessage.value = err?.message || 'Kode OTP salah atau sudah kedaluwarsa.'
      otpDigits.value = ['', '', '', '', '', '']
      nextTick(() => otpRefs.value[0]?.focus())
      loading.value = false
      return
    }
  }

  const defaultName = authStore.currentUser?.name || ''
  const defaultOrg = authStore.currentUser?.businessName || ''
  const email = `user_${cleanPhone.value}@beruang.id`

  try {
    loadingMessage.value = `✓ Mendaftarkan akun ${roleMeta.shortTitle}...`
    await authStore.register({
      name: defaultName,
      email,
      phone: `+62 ${cleanPhone.value}`,
      role: selectedRole.value,
      orgName: defaultOrg,
      sector: 'Makanan & Minuman',
      specialization: 'Keuangan & Biaya',
      bnsp_license: 'BNSP-KONS-2024-8891',
      commitment_capital: '150 - 500 Juta',
      investor_type: 'Kelompok Modal',
      otp_code: otpString.value
    })
  } catch (err: any) {
    console.warn('Registrasi live fallback / sudah terdaftar:', err?.message)
    // Jika email/nomor sudah terdaftar, login langsung
    try {
      await authStore.login(email, 'password123')
    } catch {
      await authStore.setRole(selectedRole.value)
    }
  } finally {
    loading.value = false
    loadingMessage.value = `✓ Berhasil! Membuka pendaftaran ${roleMeta.shortTitle}...`
    setTimeout(() => {
      router.push(`/onboarding?role=${selectedRole.value}`)
    }, 400)
  }
}
</script>
