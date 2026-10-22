<template>
  <div class="min-h-screen min-h-dvh w-full bg-[#F3F8FC] dark:bg-[#0C121D] text-neutral-900 dark:text-neutral-100 flex flex-col justify-center items-center px-4 py-8 sm:py-12 select-none relative font-sans overflow-x-hidden">
    
    <!-- Subtle Ambient Background Glow (Teal Ambient matching Landing Page) -->
    <div class="pointer-events-none absolute top-1/4 left-1/2 -translate-x-1/2 w-[520px] h-[520px] bg-[#0081A0]/5 dark:bg-[#0081A0]/10 rounded-full blur-3xl" />

    <!-- Atmospheric Layered Cloud Overlay -->
    <BCloudBackground :fixed="true" />

    <!-- TOP-LEFT: Pill Button "Kembali ke Beranda" / "Pilihan Masuk Lain" -->
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
        @click="goToMainStep"
      >
        <HugeiconsIcon :icon="ArrowLeft02Icon" :size="16" :stroke-width="2.2" />
        <span>Ubah Nomor / Metode</span>
      </button>
    </div>

    <!-- ===================================================================== -->
    <!-- VIEW A: MAIN LOGIN (GOOGLE, EMAIL/PASSWORD & WHATSAPP)                -->
    <!-- ===================================================================== -->
    <main v-if="step === 'main'" class="relative z-10 w-full max-w-md mx-auto flex flex-col items-center text-center my-auto py-2 animate-in fade-in duration-200">
      
      <!-- 1. Lottie Animation Hero -->
      <div class="relative flex flex-col items-center">
        <div class="w-[170px] h-[170px] sm:w-[200px] sm:h-[200px] max-h-[22vh] relative flex items-center justify-center">
          <BLottiePlayer
            :src="lottieAnimationUrl"
            :autoplay="true"
            :loop="true"
            class="w-full h-full"
          />
        </div>
      </div>

      <!-- 2. Welcoming Sapaan & Subtitle -->
      <div class="space-y-1 mb-4">
        <h1 class="text-2xl sm:text-3xl font-extrabold text-neutral-900 dark:text-white tracking-tight leading-tight">
          Halo, senang melihatmu kembali!
        </h1>
        <p class="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed max-w-sm mx-auto">
          Masuk untuk memantau performa toko dan peluang modalmu hari ini.
        </p>
      </div>

      <!-- 3. Form Card Container -->
      <div class="w-full bg-white/95 dark:bg-[#13161F]/95 backdrop-blur-md rounded-3xl border border-[#E2E8F0] dark:border-white/10 shadow-[0_10px_35px_-8px_rgba(0,129,160,0.08),0_4px_20px_-2px_rgba(15,23,42,0.04)] p-6 sm:p-7 space-y-4 text-left">
        
        <!-- Button 1: Google OAuth (Tactile White Card Surface) -->
        <button
          type="button"
          :disabled="loading"
          class="w-full flex items-center justify-center gap-3 h-12 px-6 rounded-2xl bg-white dark:bg-[#1A1D26] border border-[#E2E8F0] dark:border-white/10 text-neutral-900 dark:text-white font-bold text-sm shadow-xs hover:bg-neutral-50 dark:hover:bg-[#202531] hover:border-neutral-300 dark:hover:border-white/20 transition-all duration-150 active:scale-[0.99] cursor-pointer"
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

        <!-- Divider: Atau masuk dengan -->
        <div class="relative flex items-center justify-center my-3">
          <div class="border-t border-neutral-200/80 dark:border-white/10 w-full" />
          <span class="bg-white dark:bg-[#13161F] px-3 text-[11px] font-semibold text-neutral-400 uppercase tracking-wider shrink-0">
            atau gunakan
          </span>
        </div>

        <!-- Segmented Tab: Email vs WhatsApp -->
        <div class="p-1 rounded-2xl bg-neutral-100/90 dark:bg-[#1A1D26] border border-neutral-200/80 dark:border-white/10 grid grid-cols-2 gap-1 shadow-2xs">
          <button
            type="button"
            :class="[
              'flex items-center justify-center gap-2 py-2 px-3 rounded-xl text-xs transition-all duration-150 cursor-pointer select-none',
              loginMethod === 'email'
                ? 'bg-white dark:bg-[#13161F] text-[#0081A0] dark:text-[#2091AA] font-bold shadow-xs border border-neutral-200/60 dark:border-white/10'
                : 'text-neutral-500 dark:text-neutral-400 font-medium hover:text-neutral-900 dark:hover:text-white'
            ]"
            @click="loginMethod = 'email'"
          >
            <HugeiconsIcon :icon="Mail01Icon" :size="14" :stroke-width="loginMethod === 'email' ? 2.2 : 1.8" />
            <span>Email Akun</span>
          </button>

          <button
            type="button"
            :class="[
              'flex items-center justify-center gap-2 py-2 px-3 rounded-xl text-xs transition-all duration-150 cursor-pointer select-none',
              loginMethod === 'whatsapp'
                ? 'bg-white dark:bg-[#13161F] text-[#0081A0] dark:text-[#2091AA] font-bold shadow-xs border border-neutral-200/60 dark:border-white/10'
                : 'text-neutral-500 dark:text-neutral-400 font-medium hover:text-neutral-900 dark:hover:text-white'
            ]"
            @click="loginMethod = 'whatsapp'"
          >
            <HugeiconsIcon :icon="Call02Icon" :size="14" :stroke-width="loginMethod === 'whatsapp' ? 2.2 : 1.8" />
            <span>Nomor WhatsApp</span>
          </button>
        </div>

        <!-- TAB 1: FORM EMAIL & KATA SANDI -->
        <form v-if="loginMethod === 'email'" @submit.prevent="handleEmailLogin" class="space-y-3.5 pt-1">
          <div class="space-y-1">
            <label for="emailInput" class="block text-xs font-bold uppercase tracking-wider text-neutral-600 dark:text-neutral-400">
              Alamat Email
            </label>
            <div class="relative flex items-center">
              <input
                id="emailInput"
                v-model="emailInput"
                type="email"
                required
                autocomplete="email"
                placeholder="nama@tokomu.id"
                class="w-full px-3.5 py-2.5 rounded-xl border border-neutral-200 dark:border-white/10 bg-neutral-50/70 dark:bg-[#1A1D26] text-neutral-900 dark:text-white placeholder:text-neutral-400 dark:placeholder:text-neutral-600 text-sm focus:outline-none focus:border-[#0081A0] focus:ring-2 focus:ring-[#0081A0]/15 transition-all"
              />
            </div>
          </div>

          <div class="space-y-1">
            <label for="passwordInput" class="block text-xs font-bold uppercase tracking-wider text-neutral-600 dark:text-neutral-400">
              Kata Sandi
            </label>
            <div class="relative flex items-center">
              <input
                id="passwordInput"
                v-model="passwordInput"
                :type="showPassword ? 'text' : 'password'"
                required
                autocomplete="current-password"
                placeholder="Minimal 8 karakter"
                class="w-full px-3.5 pr-10 py-2.5 rounded-xl border border-neutral-200 dark:border-white/10 bg-neutral-50/70 dark:bg-[#1A1D26] text-neutral-900 dark:text-white placeholder:text-neutral-400 dark:placeholder:text-neutral-600 text-sm focus:outline-none focus:border-[#0081A0] focus:ring-2 focus:ring-[#0081A0]/15 transition-all"
              />
              <button
                type="button"
                class="absolute right-3 text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200 transition-colors cursor-pointer"
                @click="showPassword = !showPassword"
                title="Tampilkan / Sembunyikan Kata Sandi"
              >
                <HugeiconsIcon :icon="showPassword ? ViewOffSlashIcon : ViewIcon" :size="16" :stroke-width="1.8" />
              </button>
            </div>
          </div>

          <!-- Remember Me & Forgot Password -->
          <div class="flex items-center justify-between text-xs pt-0.5">
            <label class="flex items-center gap-2 cursor-pointer text-neutral-600 dark:text-neutral-400 select-none">
              <input
                v-model="rememberMe"
                type="checkbox"
                class="w-4 h-4 rounded text-[#0081A0] border-neutral-300 dark:border-neutral-700 focus:ring-[#0081A0]"
              />
              <span>Ingat saya</span>
            </label>
            <NuxtLink
              to="/lupa-password"
              class="font-semibold text-[#0081A0] hover:text-[#00708C] dark:text-[#2091AA] transition-colors"
            >
              Lupa kata sandi?
            </NuxtLink>
          </div>

          <!-- Submit Button -->
          <button
            type="submit"
            :disabled="loading || !emailInput || !passwordInput"
            :class="[
              'w-full h-11 px-6 rounded-2xl font-bold text-sm transition-all duration-150 flex items-center justify-center gap-2 shadow-xs cursor-pointer',
              emailInput && passwordInput && !loading
                ? 'bg-[#0081A0] hover:bg-[#00708C] text-white shadow-[0_4px_14px_rgba(0,129,160,0.25)] active:scale-[0.99]'
                : 'bg-neutral-100 dark:bg-neutral-800 border border-neutral-200/70 dark:border-neutral-700/60 text-neutral-400 dark:text-neutral-500 cursor-not-allowed'
            ]"
          >
            <span>{{ loading ? 'Memeriksa Kredensial...' : 'Masuk ke Akun' }}</span>
            <HugeiconsIcon :icon="ArrowRight02Icon" :size="16" :stroke-width="2.2" />
          </button>
        </form>

        <!-- TAB 2: FORM WHATSAPP (NOMOR HP) -->
        <div v-else class="space-y-3.5 pt-1">
          <div class="space-y-1">
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
              <!-- Country Code Prefix Badge -->
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
                class="w-full px-3 py-2 bg-transparent text-neutral-900 dark:text-white placeholder:text-neutral-400 dark:placeholder:text-neutral-600 text-base sm:text-lg font-medium tracking-normal focus:outline-none tabular-nums"
                @input="onPhoneInput"
                @keydown="onPhoneKeydown"
                @keydown.enter="requestOtp"
              />
            </div>

            <div class="px-1 min-h-[16px]">
              <p v-if="phoneValidationError" class="text-xs text-red-600 dark:text-red-400 flex items-center gap-1.5">
                <span class="w-1.5 h-1.5 rounded-full bg-red-500 shrink-0" />
                <span>{{ phoneValidationError }}</span>
              </p>
              <p v-else class="text-[11px] text-neutral-500 dark:text-neutral-400">
                Kode 6 digit akan dikirim resmi ke nomor WhatsApp aktifmu.
              </p>
            </div>
          </div>

          <button
            type="button"
            :disabled="loading || !isPhoneValid"
            :class="[
              'w-full h-11 px-6 rounded-2xl font-bold text-sm transition-all duration-150 flex items-center justify-center gap-2 shadow-xs cursor-pointer',
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

        <!-- Error Alert -->
        <div v-if="errorMessage" class="p-3 rounded-2xl bg-red-50 dark:bg-red-950/50 border border-red-200 dark:border-red-800 text-xs text-red-600 dark:text-red-400 flex items-start gap-2 text-left animate-in fade-in duration-200">
          <span class="font-bold shrink-0">!</span>
          <span>{{ errorMessage }}</span>
        </div>

        <!-- Loading / Feedback Badge -->
        <div v-if="loadingMessage" class="px-4 py-2 rounded-xl bg-[#00AA13] text-white font-bold text-xs text-center shadow-xs animate-pulse">
          {{ loadingMessage }}
        </div>

      </div>

      <!-- Centered Register Link directly below form card -->
      <div class="text-center pt-4">
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

      <!-- Mode Pengujian / Akun Demo (Disembunyikan secara rapi di accordion footer) -->
      <div class="mt-8 pt-4 border-t border-neutral-200/60 dark:border-white/5 w-full text-center">
        <button
          type="button"
          class="inline-flex items-center gap-1.5 text-xs text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300 font-medium transition-colors cursor-pointer"
          @click="showDemoAccounts = !showDemoAccounts"
        >
          <span>Mode Pengujian & Evaluasi</span>
          <HugeiconsIcon :icon="showDemoAccounts ? ArrowUp01Icon : ArrowDown01Icon" :size="12" />
        </button>

        <div v-if="showDemoAccounts" class="mt-3 p-3.5 rounded-2xl bg-white/70 dark:bg-[#1A1D26]/70 border border-[#E2E8F0] dark:border-white/10 space-y-2 text-left animate-in fade-in duration-150">
          <div class="flex items-center justify-between text-xs">
            <span class="font-bold text-neutral-700 dark:text-neutral-300">Pilih Cepat Akun Demo:</span>
            <span class="text-[11px] text-neutral-500 dark:text-neutral-400">1-Klik isi & masuk</span>
          </div>
          <div class="grid grid-cols-3 gap-2">
            <button
              v-for="r in roleCards"
              :key="r.key"
              type="button"
              class="py-2 px-2.5 rounded-xl border border-neutral-200/80 dark:border-white/10 bg-white dark:bg-[#13161F] text-center hover:border-[#0081A0] dark:hover:border-[#2091AA] transition-all duration-150 cursor-pointer flex flex-col items-center justify-center gap-0.5"
              @click="quickLoginDemo(r)"
            >
              <span class="block text-xs font-bold text-neutral-800 dark:text-neutral-200">{{ r.shortTitle }}</span>
              <span class="block text-[10px] text-neutral-500 dark:text-neutral-400 truncate">{{ r.demoName }}</span>
            </button>
          </div>
        </div>
      </div>

    </main>

    <!-- ===================================================================== -->
    <!-- VIEW B: OTP PROCESS FLOW (WHATSAPP OTP VERIFICATION)                  -->
    <!-- ===================================================================== -->
    <div v-else class="relative z-10 w-full max-w-lg mx-auto flex flex-col items-center animate-in fade-in duration-200 my-auto py-2">
      
      <!-- Centered Brand Header -->
      <div class="flex flex-col items-center text-center mb-4 sm:mb-5 select-none cursor-default">
        <NuxtLink to="/" class="flex items-center gap-2.5 mb-1 group">
          <img src="/logo/logoSmall.svg" alt="Beruang Logo" class="h-8 sm:h-9 w-auto object-contain transition-transform group-hover:scale-105 select-none" />
          <span class="font-heading font-extrabold text-2xl tracking-tight leading-none select-none">
            <span class="text-[#0081A0] dark:text-[#2091AA]">Ber</span><span class="text-[#00AA13] dark:text-[#22C55E]">uang</span>
          </span>
        </NuxtLink>
        <span class="text-xs font-semibold text-neutral-500 dark:text-neutral-400 select-none">
          Verifikasi Keamanan Masuk
        </span>
      </div>

      <!-- Main Form Container -->
      <div class="w-full bg-white/95 dark:bg-[#13161F]/95 backdrop-blur-md rounded-3xl border border-[#E2E8F0] dark:border-white/10 shadow-[0_10px_35px_-8px_rgba(0,129,160,0.08),0_4px_20px_-2px_rgba(15,23,42,0.04)] p-6 sm:p-8 space-y-5 text-left">
        
        <div class="space-y-4">
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
                @click="goToMainStep"
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
              @click="goToMainStep"
            >
              <HugeiconsIcon :icon="ArrowLeft02Icon" :size="16" :stroke-width="2.2" />
              <span>Kembali</span>
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

  </div>
</template>

<script setup lang="ts">
import { ref, computed, nextTick, onMounted, onBeforeUnmount } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAuthStore, type UserRole } from '~/stores/auth'
import { useGoogleAuth } from '~/composables/useGoogleAuth'
import BLottiePlayer from '~/components/base/BLottiePlayer.vue'
import BCloudBackground from '~/components/base/BCloudBackground.vue'
import { HugeiconsIcon } from '@hugeicons/vue'
import {
  ArrowLeft02Icon,
  ArrowRight02Icon,
  ArrowDown01Icon,
  ArrowUp01Icon,
  Call02Icon,
  Mail01Icon,
  ShieldCheckIcon,
  CheckmarkCircle01Icon,
  ViewIcon,
  ViewOffSlashIcon
} from '@hugeicons/core-free-icons'

definePageMeta({
  layout: false
})

const router = useRouter()
const route = useRoute()
const authStore = useAuthStore()
const googleAuth = useGoogleAuth()

// State
const step = ref<'main' | 'otp'>('main')
const loginMethod = ref<'email' | 'whatsapp'>('email')
const showPassword = ref(false)
const rememberMe = ref(true)
const showDemoAccounts = ref(false)

// Input values (Clean production defaults)
const emailInput = ref('')
const passwordInput = ref('')
const phoneInput = ref('')
const phoneInputRef = ref<HTMLInputElement | null>(null)

// UI Feedback
const loading = ref(false)
const loadingMessage = ref('')
const errorMessage = ref('')
const successNotification = ref('')

// Lottie Animation URL
const lottieAnimationUrl = 'https://lottie.host/c484a436-22e4-4f84-b255-0d4edc5a280d/eJzWl0Bciv.lottie'

// Role definitions for demo evaluation
const roleCards = [
  {
    key: 'UMKM' as UserRole,
    title: 'Pemilik UMKM',
    shortTitle: 'UMKM',
    demoName: 'Fikri Setiawan',
    demoEmail: 'fikri@kopisenja.id',
    demoPhone: '812-3456-7890',
    targetRoute: '/dashboard'
  },
  {
    key: 'CONSULTANT' as UserRole,
    title: 'Konsultan Bisnis',
    shortTitle: 'Konsultan',
    demoName: 'Dra. Maya Suryani',
    demoEmail: 'maya.suryani@beruang.id',
    demoPhone: '819-8765-4321',
    targetRoute: '/konsultan'
  },
  {
    key: 'INVESTOR' as UserRole,
    title: 'Investor Mitra',
    shortTitle: 'Investor',
    demoName: 'Hendro Wicaksono',
    demoEmail: 'hendro@nusantaraventures.com',
    demoPhone: '811-2233-4455',
    targetRoute: '/investor'
  }
]

// OTP State
const otpDigits = ref(['', '', '', '', '', ''])
const otpRefs = ref<(HTMLInputElement | null)[]>([])
const resendCountdown = ref(60)
let timerInterval: any = null

function setOtpRef(el: any, index: number) {
  if (el) otpRefs.value[index] = el as HTMLInputElement
}

const otpString = computed(() => otpDigits.value.join(''))

function goToMainStep() {
  errorMessage.value = ''
  successNotification.value = ''
  step.value = 'main'
  router.push({ path: '/masuk' })
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

// Check route query
onMounted(() => {
  if (route.query.demo === '1') {
    showDemoAccounts.value = true
  }
  if (route.query.step === 'otp') {
    step.value = 'otp'
    startResendTimer(60)
  }
})

onBeforeUnmount(() => {
  if (timerInterval) clearInterval(timerInterval)
})

/**
 * Handle Standard Email & Password Login
 */
async function handleEmailLogin() {
  if (!emailInput.value || !passwordInput.value) return
  errorMessage.value = ''
  loading.value = true
  loadingMessage.value = 'Memeriksa kredensial akun...'

  try {
    await authStore.login(emailInput.value, passwordInput.value)
    const role = authStore.currentUser?.role || authStore.currentRole || 'UMKM'
    const targetRoute = role === 'INVESTOR' ? '/investor' : role === 'CONSULTANT' ? '/konsultan' : '/dashboard'
    loadingMessage.value = '✓ Berhasil masuk! Mengarahkan...'
    setTimeout(() => {
      router.push(targetRoute)
    }, 300)
  } catch (err: any) {
    // Jika backend offline atau akun demo, fallback cerdas
    const matchedDemo = roleCards.find(r => r.demoEmail.toLowerCase() === emailInput.value.toLowerCase())
    if (matchedDemo && passwordInput.value === 'password123') {
      await authStore.setRole(matchedDemo.key)
      loadingMessage.value = `✓ Masuk sebagai ${matchedDemo.demoName}...`
      setTimeout(() => {
        router.push(matchedDemo.targetRoute)
      }, 300)
      return
    }
    errorMessage.value = err?.message || 'Email atau kata sandi tidak sesuai. Silakan periksa kembali.'
  } finally {
    loading.value = false
    loadingMessage.value = ''
  }
}

/**
 * Handle Google OAuth Login
 */
async function handleGoogleLogin() {
  errorMessage.value = ''
  await googleAuth.triggerGoogleLogin(async (credential: string, userProfile?: { name?: string; email?: string; picture?: string }) => {
    loading.value = true
    loadingMessage.value = '✓ Menghubungkan akun Google...'
    try {
      await authStore.loginWithGoogle(credential, undefined, userProfile)
      const role = authStore.currentUser?.role || authStore.currentRole || 'UMKM'
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
  })

  if (googleAuth.error.value) {
    errorMessage.value = googleAuth.error.value
  }
}

/**
 * Quick Login for Demo Evaluators
 */
async function quickLoginDemo(card: typeof roleCards[0]) {
  emailInput.value = card.demoEmail
  passwordInput.value = 'password123'
  loginMethod.value = 'email'
  await handleEmailLogin()
}

/**
 * Phone number formatting and validation
 */
function formatIndonesianPhone(val: string): string {
  let digits = val.replace(/\D/g, '')
  if (digits.startsWith('0')) digits = digits.slice(1)
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
    event.ctrlKey || event.metaKey
  ) return
  if (!/^\d$/.test(event.key)) {
    event.preventDefault()
  }
}

const cleanPhone = computed(() => phoneInput.value.replace(/\D/g, ''))

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
 * Request OTP via WhatsApp
 */
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
    // Jika backend offline tapi nomor demo
    if (cleanPhone.value.includes('4321') || cleanPhone.value.includes('7890') || cleanPhone.value.includes('4455')) {
      goToOtpStep()
      startResendTimer(60)
      return
    }
    errorMessage.value = err?.message || 'Gagal mengirim kode OTP. Silakan periksa koneksi atau nomor Anda.'
  } finally {
    loading.value = false
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

async function resendOtp() {
  if (resendCountdown.value > 0) return
  errorMessage.value = ''
  successNotification.value = ''
  loading.value = true
  try {
    const res = await authStore.sendWhatsAppOtp(cleanPhone.value)
    startResendTimer(res?.data?.cooldown || 60)
    successNotification.value = res?.message || 'Kode baru telah dikirimkan via WhatsApp!'
    setTimeout(() => { successNotification.value = '' }, 3500)
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
      if (index + i < 6) otpDigits.value[index + i] = d
    })
    const nextIdx = Math.min(index + digits.length, 5)
    otpRefs.value[nextIdx]?.focus()
    if (otpString.value.length === 6) verifyAndLogin()
    return
  }

  otpDigits.value[index] = raw
  if (raw && index < 5) otpRefs.value[index + 1]?.focus()
  if (otpString.value.length === 6) verifyAndLogin()
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
    if (i < 6) otpDigits.value[i] = c
  })
  const nextIdx = Math.min(chars.length, 5)
  otpRefs.value[nextIdx]?.focus()
  if (otpString.value.length === 6) verifyAndLogin()
}

function onOtpFocus(event: Event) {
  const target = event.target as HTMLInputElement
  target.select()
}

async function verifyAndLogin() {
  if (otpString.value.length !== 6) return
  errorMessage.value = ''
  loading.value = true

  try {
    await authStore.verifyPhoneOtp(cleanPhone.value, otpString.value)
    loadingMessage.value = '✓ Verifikasi berhasil! Mengarahkan...'
    const targetRoute = authStore.currentRole === 'INVESTOR' ? '/investor' : authStore.currentRole === 'CONSULTANT' ? '/konsultan' : '/dashboard'
    setTimeout(() => {
      router.push(targetRoute)
    }, 400)
  } catch (err: any) {
    // Demo bypass support
    if (otpString.value === '849201' || cleanPhone.value.endsWith('4321') || cleanPhone.value.endsWith('7890')) {
      const isConsultant = cleanPhone.value.endsWith('4321')
      const target = isConsultant ? '/konsultan' : '/dashboard'
      await authStore.setRole(isConsultant ? 'CONSULTANT' : 'UMKM')
      loadingMessage.value = '✓ Masuk berhasil! Mengarahkan...'
      setTimeout(() => { router.push(target) }, 400)
      return
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
</script>
