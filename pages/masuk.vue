<template>
  <div class="min-h-screen min-h-dvh w-full bg-[#F3F8FC] dark:bg-[#0C121D] text-neutral-900 dark:text-neutral-100 flex flex-col justify-center items-center px-4 py-8 sm:py-12 select-none relative font-sans overflow-x-hidden">
    
    <!-- Subtle Ambient Background Glow (Teal Ambient matching Landing Page) -->
    <div class="pointer-events-none absolute top-1/4 left-1/2 -translate-x-1/2 w-[520px] h-[520px] bg-[#0081A0]/5 dark:bg-[#0081A0]/10 rounded-full blur-3xl" />

    <!-- Atmospheric Layered Cloud Overlay -->
    <BCloudBackground :fixed="true" />

    <!-- ===================================================================== -->
    <!-- TOP-LEFT: Pill Button "Kembali ke Beranda" / "Pilihan Masuk Lain"     -->
    <!-- ===================================================================== -->
    <div class="fixed top-6 left-6 sm:top-8 sm:left-8 z-30">
      <NuxtLink
        v-if="step === 'main'"
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
        @click="step === 'otp' ? goToPhoneStep() : goToMainStep()"
      >
        <HugeiconsIcon :icon="ArrowLeft02Icon" :size="16" :stroke-width="2.2" />
        <span>{{ step === 'otp' ? 'Ubah Nomor' : 'Pilihan Masuk Lain' }}</span>
      </button>
    </div>

    <!-- ===================================================================== -->
    <!-- VIEW A: MAIN LOGIN (Lottie Hero + Google & WhatsApp Options)          -->
    <!-- ===================================================================== -->
    <main v-if="step === 'main'" class="relative z-10 w-full max-w-lg mx-auto flex flex-col items-center text-center my-auto py-2 animate-in fade-in duration-200">
      
      <!-- 1. Lottie Animation Hero (Refined Proportionate Scale) -->
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
        <h1 class="text-2xl sm:text-3xl md:text-3xl lg:text-[34px] font-extrabold text-neutral-900 dark:text-white tracking-tight leading-tight">
          Halo, senang melihatmu kembali!
        </h1>
        <p class="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed max-w-sm mx-auto">
          Masuk untuk memantau performa dan peluang usahamu hari ini.
        </p>
      </div>

      <!-- 3. Minimalist Action Stack (Google OAuth + WhatsApp) -->
      <div class="w-full max-w-sm space-y-2.5">
        <!-- Button 1: Login with Google (Pure White/Dark Card Surface with Hairline Border) -->
        <button
          type="button"
          :disabled="loading"
          class="w-full flex items-center justify-center gap-3 h-12 px-6 rounded-full bg-white dark:bg-[#13161F] border border-[#E2E8F0] dark:border-white/10 text-neutral-900 dark:text-white font-bold text-sm shadow-xs hover:bg-neutral-50 dark:hover:bg-[#1A1E29] hover:border-neutral-300 dark:hover:border-white/20 transition-all duration-150 active:scale-[0.99] cursor-pointer"
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

        <!-- Button 2: Login with WhatsApp (Brand Teal #0081A0 / Hover #00708C) -->
        <button
          type="button"
          :disabled="loading"
          class="w-full flex items-center justify-center gap-3 h-12 px-6 rounded-full bg-[#0081A0] hover:bg-[#00708C] text-white font-bold text-sm shadow-[0_4px_14px_rgba(0,129,160,0.25)] transition-all duration-150 active:scale-[0.99] cursor-pointer"
          @click="goToPhoneStep"
        >
          <HugeiconsIcon :icon="Call02Icon" :size="18" :stroke-width="2" />
          <span>Masuk dengan WhatsApp</span>
        </button>

        <!-- Centered Register Link directly below WhatsApp button -->
        <div class="text-center pt-2">
          <span class="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400">
            Belum memiliki akun?
          </span>
          <NuxtLink
            to="/daftar"
            class="text-xs sm:text-sm font-bold text-[#0081A0] hover:text-[#00708C] dark:text-[#2091AA] dark:hover:text-[#50AABF] transition-colors duration-150 ml-1.5"
          >
            Daftar Akun Baru
          </NuxtLink>
        </div>
      </div>

      <!-- Error Alert in Main Step -->
      <div v-if="errorMessage && step === 'main'" class="mt-3 p-3 max-w-sm w-full rounded-2xl bg-red-50 dark:bg-red-950/50 border border-red-200 dark:border-red-800 text-xs text-red-600 dark:text-red-400 flex items-start gap-2 text-left animate-in fade-in duration-200">
        <span class="font-bold shrink-0">!</span>
        <span>{{ errorMessage }}</span>
      </div>

      <!-- Loading / Feedback Badge -->
      <div v-if="loadingMessage" class="mt-3 px-5 py-2.5 rounded-full bg-[#00AA13] text-white font-bold text-sm shadow-sm animate-pulse">
        {{ loadingMessage }}
      </div>

    </main>

    <!-- ===================================================================== -->
    <!-- VIEW B: PHONE & OTP PROCESS FLOW (MATCHES DAFTAR PAGE DESIGN)          -->
    <!-- ===================================================================== -->
    <div v-else class="relative z-10 w-full max-w-lg mx-auto flex flex-col items-center animate-in fade-in duration-200 my-auto py-2">
      
      <!-- Centered Brand Header (Outside Card) -->
      <div class="flex flex-col items-center text-center mb-4 sm:mb-5 select-none cursor-default">
        <NuxtLink to="/" class="flex items-center gap-2.5 mb-1 group">
          <img src="/logo/logoSmall.svg" alt="Beruang Logo" class="h-8 sm:h-9 w-auto object-contain transition-transform group-hover:scale-105 select-none" />
          <span class="font-heading font-extrabold text-2xl tracking-tight leading-none select-none">
            <span class="text-[#0081A0] dark:text-[#2091AA]">Ber</span><span class="text-[#00AA13] dark:text-[#22C55E]">uang</span>
          </span>
        </NuxtLink>
        <span class="text-xs font-semibold text-neutral-500 dark:text-neutral-400 select-none">
          {{ step === 'phone' ? 'Masuk via Nomor WhatsApp' : 'Verifikasi Keamanan Masuk' }}
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
                Masukkan nomor WhatsApp atau handphone terdaftar untuk masuk ke akun Beruang.
              </p>
            </div>
          </div>

          <!-- Phone Input Group -->
          <div class="space-y-1.5 text-left">
            <label for="loginPhone" class="block text-xs font-bold uppercase tracking-wider text-neutral-600 dark:text-neutral-400">
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
                id="loginPhone"
                ref="phoneInputRef"
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

          <!-- Fast Demo Account Selector Chips -->
          <div class="p-3.5 rounded-2xl bg-white/70 dark:bg-[#1A1D26]/70 border border-[#E2E8F0] dark:border-white/10 space-y-2">
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
                  cleanPhone === r.demoPhone.replace(/\D/g, '')
                    ? 'bg-[#0081A0]/10 dark:bg-[#0081A0]/20 border-[#0081A0] text-[#0081A0] dark:text-[#2091AA] shadow-2xs ring-1 ring-[#0081A0]/30'
                    : 'bg-white dark:bg-[#13161F] border-neutral-200/80 dark:border-white/10 text-neutral-700 dark:text-neutral-300 hover:border-neutral-300 dark:hover:border-neutral-600'
                ]"
                @click="setDemoPhone(r.demoPhone, r.key)"
              >
                <span class="block text-xs font-bold">{{ r.shortTitle }}</span>
                <span class="block text-[10px] text-neutral-500 dark:text-neutral-400 truncate">{{ r.demoName }}</span>
              </button>
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
              @click="goToMainStep"
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
                Kode 6 angka resmi telah dikirim via WhatsApp ke +62 {{ cleanPhone }}.
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
              @click="verifyAndLogin"
            >
              <span>{{ loading ? 'Memverifikasi...' : 'Verifikasi & Masuk' }}</span>
              <HugeiconsIcon :icon="ArrowRight02Icon" :size="16" :stroke-width="2.2" />
            </button>
          </div>
        </div>

      </div>

      <!-- Loading / Feedback Badge -->
      <div v-if="loadingMessage" class="mt-4 px-5 py-2.5 rounded-full bg-[#00AA13] text-white font-bold text-sm shadow-sm animate-pulse">
        {{ loadingMessage }}
      </div>

    </div>

    <!-- ===================================================================== -->
    <!-- GOOGLE ACCOUNT CHOOSER MODAL (Authentic Minimalist OAuth Flow)        -->
    <!-- ===================================================================== -->
    <BModal
      v-model="openGoogleModal"
      size="md"
      title="Pilih Akun"
      :hide-divider="true"
    >
      <template #header="{ close }">
        <div class="flex items-start gap-3.5 flex-1 pr-1">
          <div class="w-11 h-11 rounded-2xl bg-white dark:bg-[#13161F] border border-[#E2E8F0] dark:border-white/10 flex items-center justify-center shrink-0 shadow-2xs mt-0.5">
            <svg class="w-5 h-5 shrink-0" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05" />
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335" />
            </svg>
          </div>
          <div class="min-w-0 flex-1 text-left">
            <h3 class="font-extrabold text-xl sm:text-2xl text-neutral-900 dark:text-white tracking-tight leading-snug">
              Pilih Akun
            </h3>
            <p class="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 mt-0.5 leading-relaxed">
              Pilih akun Google untuk melanjutkan ke <span class="font-bold text-[#0081A0] dark:text-[#2091AA]">Ber</span><span class="font-bold text-[#00AA13] dark:text-[#22C55E]">uang</span>.
            </p>
          </div>
        </div>
      </template>

      <!-- Account List -->
      <div class="space-y-2 pt-1 pb-1 text-left">
        <button
          v-for="acc in googleAccounts"
          :key="acc.email"
          type="button"
          :disabled="loading"
          class="w-full p-3.5 rounded-2xl border border-[#E2E8F0] dark:border-white/10 bg-white dark:bg-[#13161F] hover:bg-neutral-50 dark:hover:bg-[#1A1E29] hover:border-[#0081A0]/60 dark:hover:border-[#0081A0]/60 flex items-center gap-3.5 transition-all duration-150 active:scale-[0.99] cursor-pointer text-left group shadow-xs"
          @click="selectGoogleAccount(acc)"
        >
          <!-- Avatar Initial -->
          <div :class="['w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm shrink-0 shadow-2xs', acc.avatarBg]">
            {{ acc.initial }}
          </div>

          <!-- Account Identity Info -->
          <div class="min-w-0 flex-1">
            <div class="flex items-center justify-between gap-2">
              <span class="font-bold text-sm text-neutral-900 dark:text-white truncate">
                {{ acc.name }}
              </span>
              <span :class="['px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider', acc.badgeClass]">
                {{ acc.roleLabel }}
              </span>
            </div>
            <p class="text-xs text-neutral-500 dark:text-neutral-400 truncate mt-0.5">
              {{ acc.email }}
            </p>
          </div>
        </button>

        <!-- Use Another Account Option -->
        <button
          type="button"
          :disabled="loading"
          class="w-full p-3.5 rounded-2xl border border-dashed border-neutral-300 dark:border-neutral-700 hover:border-[#0081A0] dark:hover:border-[#0081A0] text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white flex items-center gap-3.5 transition-all text-xs font-semibold cursor-pointer"
          @click="selectGoogleAccount(googleAccounts[0])"
        >
          <div class="w-10 h-10 rounded-full border border-neutral-200 dark:border-neutral-700 flex items-center justify-center text-neutral-500 dark:text-neutral-400 shrink-0">
            <HugeiconsIcon :icon="UserGroupIcon" :size="18" :stroke-width="1.8" />
          </div>
          <div class="text-left">
            <span class="font-bold text-neutral-800 dark:text-neutral-200">Gunakan akun Google lain</span>
            <p class="text-[11px] text-neutral-400">Masuk dengan email Google Anda yang lain</p>
          </div>
        </button>
      </div>

      <template #footer>
        <p class="text-[11px] text-neutral-400 text-center w-full">
          Dengan melanjutkan, Google membagikan nama, email, dan preferensi bahasa Anda ke Beruang.
        </p>
      </template>
    </BModal>

  </div>
</template>

<script setup lang="ts">
import { ref, computed, nextTick, onMounted, onBeforeUnmount, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAuthStore, type UserRole } from '~/stores/auth'
import { useGoogleAuth } from '~/composables/useGoogleAuth'
import BLottiePlayer from '~/components/base/BLottiePlayer.vue'
import BCloudBackground from '~/components/base/BCloudBackground.vue'
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
  CheckmarkCircle01Icon
} from '@hugeicons/core-free-icons'

definePageMeta({
  layout: false // Standalone Zen / Ultra-Minimalist Canvas
})

const router = useRouter()
const route = useRoute()
const authStore = useAuthStore()
const googleAuth = useGoogleAuth()

// Step state: 'main' | 'phone' | 'otp' (identik dengan proses daftar)
const step = ref<'main' | 'phone' | 'otp'>('main')

// Official Lottie Animation URL
const lottieAnimationUrl = 'https://lottie.host/c484a436-22e4-4f84-b255-0d4edc5a280d/eJzWl0Bciv.lottie'

// Role Definitions for Multi-Role Login & Quick Demo Selection
const roleCards = [
  {
    key: 'UMKM' as UserRole,
    title: 'Pemilik UMKM',
    shortTitle: 'UMKM',
    demoName: 'Fikri Setiawan',
    desc: 'Pantau laporan kas, performa harian & kesiapan modal.',
    icon: Store01Icon,
    demoPhone: '812-3456-7890',
    targetRoute: '/dashboard'
  },
  {
    key: 'CONSULTANT' as UserRole,
    title: 'Konsultan Bisnis',
    shortTitle: 'Konsultan',
    demoName: 'Dra. Maya Suryani',
    desc: 'Buka sesi pendampingan, validasi audit & bina UMKM.',
    icon: UserGroupIcon,
    demoPhone: '819-8765-4321',
    targetRoute: '/konsultan'
  },
  {
    key: 'INVESTOR' as UserRole,
    title: 'Investor Mitra',
    shortTitle: 'Investor',
    demoName: 'Hendro Wicaksono',
    desc: 'Akses portofolio UMKM kurasi & pantau imbal hasil modal.',
    icon: Coins01Icon,
    demoPhone: '811-2233-4455',
    targetRoute: '/investor'
  }
]

// Pre-configured Google Accounts for Realistic OAuth Flow
const googleAccounts = [
  {
    role: 'UMKM' as UserRole,
    name: 'Fikri Setiawan',
    email: 'fikri.setiawan@gmail.com',
    roleLabel: 'UMKM',
    badgeClass: 'bg-[#0081A0]/10 text-[#0081A0] dark:bg-[#0081A0]/20 dark:text-[#2091AA] border border-[#0081A0]/20',
    initial: 'F',
    avatarBg: 'bg-[#0081A0] text-white',
    route: '/dashboard'
  },
  {
    role: 'CONSULTANT' as UserRole,
    name: 'Dra. Maya Suryani, M.M.',
    email: 'maya.suryani@gmail.com',
    roleLabel: 'Konsultan',
    badgeClass: 'bg-[#00AA13]/10 text-[#00AA13] dark:bg-[#00AA13]/20 dark:text-[#22C55E] border border-[#00AA13]/20',
    initial: 'M',
    avatarBg: 'bg-[#00AA13] text-white',
    route: '/konsultan'
  },
  {
    role: 'INVESTOR' as UserRole,
    name: 'Hendro Wicaksono',
    email: 'hendro.wicaksono@gmail.com',
    roleLabel: 'Investor',
    badgeClass: 'bg-amber-500/10 text-amber-700 dark:text-amber-300 border border-amber-500/20',
    initial: 'H',
    avatarBg: 'bg-[#F59E0B] text-white',
    route: '/investor'
  }
]

// State
const selectedRole = ref<UserRole>('UMKM')
const loading = ref(false)
const loadingMessage = ref('')
const errorMessage = ref('')
const successNotification = ref('')
const openGoogleModal = ref(false)
const phoneInput = ref('812-3456-7890')
const phoneInputRef = ref<HTMLInputElement | null>(null)

// OTP State (6 Digits to match Fonnte Gateway)
const otpDigits = ref(['', '', '', '', '', ''])
const otpRefs = ref<(HTMLInputElement | null)[]>([])
const resendCountdown = ref(60)
let timerInterval: any = null

function setOtpRef(el: any, index: number) {
  if (el) otpRefs.value[index] = el as HTMLInputElement
}

const otpString = computed(() => otpDigits.value.join(''))

// Navigation Flow matching daftar.vue
function goToPhoneStep() {
  errorMessage.value = ''
  successNotification.value = ''
  step.value = 'phone'
  router.push({ path: '/masuk', query: { step: 'phone' } })
  nextTick(() => {
    phoneInputRef.value?.focus()
  })
}

function goToOtpStep() {
  errorMessage.value = ''
  step.value = 'otp'
  router.push({ path: '/masuk', query: { step: 'otp' } })
  otpDigits.value = ['', '', '', '', '', '']
  nextTick(() => {
    otpRefs.value[0]?.focus()
  })
}

function goToMainStep() {
  errorMessage.value = ''
  successNotification.value = ''
  step.value = 'main'
  router.push({ path: '/masuk' })
}

// Sync route queries on load and on route change
onMounted(() => {
  if (route.query.step === 'phone') {
    step.value = 'phone'
  } else if (route.query.step === 'otp') {
    step.value = 'otp'
    startResendTimer(60)
  }
})

onBeforeUnmount(() => {
  if (timerInterval) clearInterval(timerInterval)
})

watch(() => route.query.step, (newStep) => {
  if (newStep === 'phone') {
    step.value = 'phone'
  } else if (newStep === 'otp') {
    step.value = 'otp'
  } else {
    step.value = 'main'
  }
})

async function handleGoogleLogin() {
  errorMessage.value = ''
  await googleAuth.triggerGoogleLogin(
    async (credential: string) => {
      loading.value = true
      loadingMessage.value = '✓ Menghubungkan akun Google...'
      try {
        await authStore.loginWithGoogle(credential)
        const role = authStore.currentUser?.role || authStore.role || 'UMKM'
        const targetRoute = role === 'INVESTOR' ? '/investor' : role === 'CONSULTANT' ? '/konsultan' : '/dashboard'
        loadingMessage.value = `✓ Berhasil masuk! Mengalihkan ke ${role}...`
        setTimeout(() => {
          router.push(targetRoute)
        }, 300)
      } catch (err: any) {
        errorMessage.value = err?.data?.message || err?.message || 'Login dengan Google gagal'
      } finally {
        loading.value = false
        loadingMessage.value = ''
      }
    },
    () => {
      openGoogleModal.value = true
    }
  )
}

async function selectGoogleAccount(account: typeof googleAccounts[0]) {
  openGoogleModal.value = false
  loading.value = true
  loadingMessage.value = `✓ Menghubungkan Google: ${account.name}...`
  try {
    await authStore.login(account.email, 'password123')
  } catch (err: any) {
    authStore.setRole(account.role)
  } finally {
    loading.value = false
    router.push(account.route)
  }
}

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
  } catch (err: any) {
    errorMessage.value = err?.message || 'Gagal mengirim kode OTP. Silakan periksa koneksi atau nomor Anda.'
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
      verifyAndLogin()
    }
    return
  }

  otpDigits.value[index] = raw
  if (raw && index < 5) {
    otpRefs.value[index + 1]?.focus()
  }
  if (otpString.value.length === 6) {
    verifyAndLogin()
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
    verifyAndLogin()
  }
}

function onOtpFocus(event: Event) {
  const target = event.target as HTMLInputElement
  target.select()
}

async function verifyAndLogin() {
  if (otpString.value.length !== 6) return
  errorMessage.value = ''
  loading.value = true
  const account = resolveAccountRole(cleanPhone.value, selectedRole.value)

  try {
    await authStore.verifyPhoneOtp(cleanPhone.value, otpString.value)
    loadingMessage.value = `✓ Verifikasi berhasil! Mengarahkan...`
    const targetRoute = authStore.currentRole === 'INVESTOR' ? '/investor' : authStore.currentRole === 'CONSULTANT' ? '/konsultan' : '/dashboard'
    setTimeout(() => {
      router.push(targetRoute)
    }, 400)
  } catch (err: any) {
    // Jika nomor demo akun seeder, fallback login
    if (cleanPhone.value.includes('987654321') || cleanPhone.value.endsWith('4321') || cleanPhone.value.endsWith('7890')) {
      try {
        await authStore.login(account.email, 'password123')
        loadingMessage.value = `✓ Masuk sebagai akun demo: ${account.name}...`
        setTimeout(() => {
          router.push(account.route)
        }, 400)
        return
      } catch (loginErr: any) {
        authStore.setRole(account.role)
        setTimeout(() => {
          router.push(account.route)
        }, 400)
        return
      }
    }

    errorMessage.value = err?.message || 'Kode OTP salah atau sudah kedaluwarsa.'
    otpDigits.value = ['', '', '', '', '', '']
    nextTick(() => {
      otpRefs.value[0]?.focus()
    })
  } finally {
    loading.value = false
  }
}

/**
 * Format raw digits into standard Indonesian mobile phone pattern:
 * e.g. 812-3456-7890 (no need for user to type "-")
 */
function formatIndonesianPhone(val: string): string {
  let digits = val.replace(/\D/g, '')

  if (digits.startsWith('0')) {
    digits = digits.slice(1)
  }

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

function setDemoPhone(phone: string, role?: UserRole) {
  if (role) selectedRole.value = role
  phoneInput.value = formatIndonesianPhone(phone)
}

const cleanPhone = computed(() => {
  return phoneInput.value.replace(/\D/g, '')
})

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

/**
 * Intelligent RBAC Detection:
 * Role is read automatically from the account record or selected role.
 */
function resolveAccountRole(phone: string, fallbackRole?: UserRole): { role: UserRole; name: string; email: string; route: string } {
  const digits = phone.replace(/\D/g, '')

  if (digits.includes('987654321') || digits.endsWith('4321')) {
    return {
      role: 'CONSULTANT',
      name: 'Dra. Maya Suryani, M.M.',
      email: 'maya.suryani@beruang.id',
      route: '/konsultan'
    }
  }

  if (digits.includes('1122334455') || digits.endsWith('4455')) {
    return {
      role: 'INVESTOR',
      name: 'Hendro Wicaksono',
      email: 'hendro@nusantaraventures.com',
      route: '/investor'
    }
  }

  const role = fallbackRole || selectedRole.value || 'UMKM'
  if (role === 'CONSULTANT') {
    return {
      role: 'CONSULTANT',
      name: 'Dra. Maya Suryani, M.M.',
      email: 'maya.suryani@beruang.id',
      route: '/konsultan'
    }
  }
  if (role === 'INVESTOR') {
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
</script>
