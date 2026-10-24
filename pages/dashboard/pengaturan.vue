<template>
  <div class="space-y-6 sm:space-y-8 pb-16 font-poppins text-neutral-900 dark:text-neutral-100">
    <!-- 1. Top Header Bar: Judul Saja (Tanpa tombol kembali & tanpa tombol simpan atas) -->
    <div class="gsap-settings-header flex items-center gap-2.5 sm:gap-3 min-h-[44px]">
      <HugeiconsIcon
        :icon="Settings01Icon"
        :size="26"
        :stroke-width="2.2"
        class="text-neutral-900 dark:text-white shrink-0"
      />
      <h1 class="font-poppins font-semibold text-2xl sm:text-3xl text-neutral-900 dark:text-white tracking-tight leading-tight">
        {{ t('settings_title') }}
      </h1>
    </div>

    <!-- Alert Save Success (Soft Green Pill Card, Zero Drop-Shadow) -->
    <div
      v-if="saved"
      class="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-xs sm:text-sm font-semibold text-emerald-800 dark:text-emerald-300 flex items-center justify-between gap-3 shadow-none animate-in fade-in"
    >
      <div class="flex items-center gap-2.5">
        <HugeiconsIcon :icon="CheckmarkCircle01Icon" :size="18" class="text-[#00800e] dark:text-[#00C058] shrink-0" />
        <span>{{ t('saved_success_desc') }}</span>
      </div>
      <button
        type="button"
        class="text-xs text-emerald-700 dark:text-emerald-400 hover:underline cursor-pointer"
        @click="saved = false"
      >
        {{ t('close') }}
      </button>
    </div>

    <!-- ========================================================================= -->
    <!-- 2. BANNER HIGHLIGHT BIRU TERANG (PALING ATAS AGAR LANGSUNG TERLIHAT)      -->
    <!-- ========================================================================= -->
    <div class="gsap-settings-banner rounded-[22px] p-5 sm:p-6 bg-gradient-to-r from-[#54B0C5] via-[#2091AA] to-[#1E869E] dark:from-[#208CA4] dark:via-[#1A768B] dark:to-[#166476] border border-[#54B0C5]/40 dark:border-[#208CA4]/40 text-white !shadow-none flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div class="flex items-start sm:items-center gap-3.5">
        <div class="w-11 h-11 rounded-xl bg-white/20 text-white flex items-center justify-center shrink-0 border border-white/30 backdrop-blur-xs">
          <HugeiconsIcon :icon="InformationCircleIcon" :size="24" :stroke-width="2" />
        </div>
        <div>
          <p class="text-sm sm:text-base font-bold text-white tracking-tight">
            {{ t('banner_title') }}
          </p>
          <p class="text-xs sm:text-[13px] text-cyan-50/95 mt-0.5 leading-relaxed">
            {{ t('banner_desc') }}
          </p>
        </div>
      </div>

      <div class="shrink-0 w-full sm:w-auto">
        <NuxtLink
          to="/dashboard/profile"
          class="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-white hover:bg-slate-50 text-[#156374] text-xs sm:text-sm font-bold transition-all shadow-none cursor-pointer w-full sm:w-auto"
        >
          <span>{{ t('banner_action') }}</span>
          <HugeiconsIcon :icon="ArrowRight01Icon" :size="16" :stroke-width="2.2" class="shrink-0" />
        </NuxtLink>
      </div>
    </div>

    <!-- ========================================================================= -->
    <!-- 3. TAMPILAN & MODE SISTEM (DENGAN VISUAL MOCKUP MINIATUR)                -->
    <!-- ========================================================================= -->
    <div class="gsap-settings-theme">
      <ThemeMockupSelector />
    </div>

    <!-- ========================================================================= -->
    <!-- 4. CONTAINER 1: KEAMANAN & KREDENSIAL AKUN                               -->
    <!-- ========================================================================= -->
    <div class="gsap-setting-card card-tactile-gopay rounded-[22px] p-6 sm:p-7 border border-[#CBD5E1] dark:border-neutral-800 bg-[#FFFFFF] dark:bg-[#13161F] !shadow-none space-y-6">
      <!-- Section Header -->
      <div class="flex items-center gap-3 pb-4 border-b border-neutral-100 dark:border-neutral-800">
        <div class="w-9 h-9 rounded-xl bg-[#E6F4F7] dark:bg-[#156374]/30 text-[#156374] dark:text-[#50AABF] flex items-center justify-center shrink-0">
          <HugeiconsIcon :icon="SecurityCheckIcon" :size="20" :stroke-width="2" />
        </div>
        <div>
          <h2 class="text-base sm:text-lg font-bold text-neutral-900 dark:text-white">
            {{ t('sec_security_title') }}
          </h2>
          <p class="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
            {{ t('sec_security_desc') }}
          </p>
        </div>
      </div>

      <!-- Form Grid (With Inline Save Pattern for Elderly-friendly UX) -->
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <!-- Field Email -->
        <div>
          <div class="flex items-center justify-between mb-1.5">
            <label class="block text-xs font-semibold text-neutral-700 dark:text-neutral-300">
              {{ t('email_label') }}
            </label>
            <span v-if="emailSavedBadge" class="text-[11px] font-bold text-[#00800e] animate-in fade-in">
              {{ t('field_saved') }}
            </span>
          </div>

          <div class="flex items-center gap-2">
            <input
              v-model="accountForm.email"
              type="email"
              class="input-tactile-gopay flex-1"
              @keydown.enter.prevent="isEmailModified ? openEmailOtpModal() : undefined"
            />
            <button
              v-if="isEmailModified"
              type="button"
              class="btn-pill-action-green h-10 min-h-[40px] px-3.5 text-xs font-bold shrink-0 animate-in fade-in zoom-in-95 cursor-pointer flex items-center gap-1.5 shadow-none rounded-xl"
              @click="openEmailOtpModal"
            >
              <HugeiconsIcon :icon="CheckmarkCircle01Icon" :size="15" :stroke-width="2.2" />
              <span>{{ t('save_field') }}</span>
            </button>
          </div>

          <p v-if="!isEmailModified" class="text-[11px] text-emerald-600 dark:text-emerald-400 mt-1.5 flex items-center gap-1 font-medium">
            <HugeiconsIcon :icon="CheckmarkCircle01Icon" :size="13" />
            <span>{{ t('email_verified') }}</span>
          </p>
          <p v-else class="text-[11px] text-[#156374] dark:text-[#50AABF] mt-1.5 flex items-center gap-1 font-medium animate-in fade-in">
            <HugeiconsIcon :icon="InformationCircleIcon" :size="13" />
            <span>{{ t('email_otp_required_hint') }}</span>
          </p>
        </div>

        <!-- Field WhatsApp (Ramah Orang Tua: Tombol Simpan muncul di samping saat diubah) -->
        <div>
          <div class="flex items-center justify-between mb-1.5">
            <label class="block text-xs font-semibold text-neutral-700 dark:text-neutral-300">
              {{ t('phone_label') }}
            </label>
            <span v-if="phoneSavedBadge" class="text-[11px] font-bold text-[#00800e] animate-in fade-in">
              {{ t('field_saved') }}
            </span>
          </div>

          <div class="flex items-center gap-2">
            <input
              v-model="accountForm.phone"
              type="tel"
              class="input-tactile-gopay flex-1"
            />
            <button
              v-if="isPhoneModified"
              type="button"
              class="btn-pill-action-green h-10 min-h-[40px] px-3.5 text-xs font-bold shrink-0 animate-in fade-in zoom-in-95 cursor-pointer flex items-center gap-1.5 shadow-none rounded-xl"
              @click="savePhoneField"
            >
              <HugeiconsIcon :icon="CheckmarkCircle01Icon" :size="15" :stroke-width="2.2" />
              <span>{{ t('save_field') }}</span>
            </button>
          </div>

          <p class="text-[11px] text-neutral-500 dark:text-neutral-400 mt-1.5">
            {{ t('phone_hint') }}
          </p>
        </div>
      </div>

      <!-- Ganti Kata Sandi -->
      <div class="pt-4 border-t border-neutral-100 dark:border-neutral-800 space-y-4">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 class="text-sm font-bold text-neutral-900 dark:text-white">
              {{ t('password_title') }}
            </h3>
            <p class="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
              {{ t('password_desc') }}
            </p>
          </div>
          <BActionButton
            variant="default"
            custom-class="w-full sm:w-auto justify-center"
            @click="showPasswordFields = !showPasswordFields"
          >
            {{ showPasswordFields ? t('close_password_btn') : t('change_password_btn') }}
          </BActionButton>
        </div>

        <!-- Inline Password Fields -->
        <div v-if="showPasswordFields" class="grid grid-cols-1 sm:grid-cols-3 gap-3.5 pt-2 animate-in fade-in">
          <div>
            <label class="block text-[11px] font-semibold text-neutral-600 dark:text-neutral-400 mb-1">
              {{ t('current_password') }}
            </label>
            <input
              v-model="passwordForm.current"
              type="password"
              placeholder="••••••••"
              class="input-tactile-gopay"
            />
          </div>
          <div>
            <label class="block text-[11px] font-semibold text-neutral-600 dark:text-neutral-400 mb-1">
              {{ t('new_password') }}
            </label>
            <input
              v-model="passwordForm.new"
              type="password"
              placeholder="Minimal 8 karakter"
              class="input-tactile-gopay"
            />
          </div>
          <div class="flex flex-col justify-end">
            <label class="block text-[11px] font-semibold text-neutral-600 dark:text-neutral-400 mb-1">
              {{ t('confirm_password') }}
            </label>
            <div class="flex items-center gap-2">
              <input
                v-model="passwordForm.confirm"
                type="password"
                placeholder="Ulangi sandi baru"
                class="input-tactile-gopay flex-1"
              />
              <button
                v-if="passwordForm.new && passwordForm.confirm"
                type="button"
                class="btn-pill-action-green px-3 py-2 text-xs font-bold shrink-0 cursor-pointer shadow-none"
                @click="savePasswordField"
              >
                {{ t('save_field') }}
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- 2FA WhatsApp (Toggle Switch) -->
      <div class="pt-4 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-between gap-4">
        <div class="space-y-0.5">
          <span class="text-sm font-bold text-neutral-900 dark:text-white block">
            {{ t('two_factor_title') }}
          </span>
          <p class="text-xs text-neutral-500 dark:text-neutral-400">
            {{ t('two_factor_desc') }}
          </p>
        </div>

        <!-- Sliding Toggle Switch -->
        <button
          type="button"
          role="switch"
          :aria-checked="accountForm.twoFactorEnabled"
          :aria-label="t('two_factor_title')"
          :class="[
            'relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none shadow-none',
            accountForm.twoFactorEnabled
              ? 'bg-[#00800e] dark:bg-[#00C058]'
              : 'bg-neutral-200 dark:bg-neutral-700 hover:bg-neutral-300 dark:hover:bg-neutral-600'
          ]"
          @click="accountForm.twoFactorEnabled = !accountForm.twoFactorEnabled; showToastFeedback(t('field_saved'))"
        >
          <span
            :class="[
              'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white transition duration-200 ease-in-out shadow-none',
              accountForm.twoFactorEnabled ? 'translate-x-5' : 'translate-x-0'
            ]"
          />
        </button>
      </div>

      <!-- Sesi Login Aktif -->
      <div class="pt-4 border-t border-neutral-100 dark:border-neutral-800 space-y-3">
        <div class="flex items-center justify-between">
          <div>
            <h3 class="text-sm font-bold text-neutral-900 dark:text-white">
              {{ t('sessions_title') }}
            </h3>
            <p class="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
              {{ t('sessions_desc') }}
            </p>
          </div>
          <button
            type="button"
            class="text-xs font-semibold text-neutral-500 hover:text-red-600 transition-colors cursor-pointer"
            @click="terminateOtherSessions"
          >
            {{ t('disconnect_others') }}
          </button>
        </div>

        <div class="space-y-2.5">
          <!-- Sesi Saat Ini (Perangkat Riil Pengguna) -->
          <div class="p-3.5 rounded-xl border border-[#CBD5E1] dark:border-neutral-800 bg-[#F8FAFC] dark:bg-[#18191E] flex items-center justify-between">
            <div class="flex items-center gap-3">
              <HugeiconsIcon :icon="currentDeviceSession.isMobile ? SmartPhone01Icon : ComputerIcon" :size="20" class="text-[#156374] dark:text-[#50AABF]" />
              <div>
                <div class="flex items-center gap-2">
                  <span class="text-xs sm:text-sm font-semibold text-neutral-900 dark:text-white">
                    {{ currentDeviceSession.label }}
                  </span>
                  <span class="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                    {{ t('current_session') }}
                  </span>
                </div>
                <span class="text-[11px] text-neutral-500">
                  {{ currentDeviceSession.location }} • {{ currentDeviceSession.ip }}
                </span>
              </div>
            </div>
            <span class="text-xs text-emerald-600 font-semibold">{{ t('active_now') }}</span>
          </div>

          <!-- Status Sesi Perangkat Lain -->
          <div class="p-3.5 rounded-xl border border-dashed border-neutral-200 dark:border-neutral-800 bg-[#F8FAFC]/50 dark:bg-[#18191E]/50 flex items-center justify-between">
            <div class="flex items-center gap-2.5">
              <HugeiconsIcon :icon="ShieldCheckIcon" :size="18" class="text-emerald-600 dark:text-emerald-400 shrink-0" />
              <span class="text-xs text-neutral-500 dark:text-neutral-400 font-sans">
                Tidak ada sesi perangkat lain. Akun hanya aktif di perangkat ini.
              </span>
            </div>
            <span class="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-800">
              Aman
            </span>
          </div>
        </div>
      </div>
    </div>

    <!-- ========================================================================= -->
    <!-- 5. CONTAINER 2: PREFERENSI NOTIFIKASI & PENGINGAT (TACTILE CHECKLIST CARDS)-->
    <!-- ========================================================================= -->
    <div class="gsap-setting-card card-tactile-gopay rounded-[22px] p-6 sm:p-7 border border-[#CBD5E1] dark:border-neutral-800 bg-[#FFFFFF] dark:bg-[#13161F] !shadow-none space-y-6">
      <div class="flex items-center gap-3 pb-4 border-b border-neutral-100 dark:border-neutral-800">
        <div class="w-9 h-9 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-[#00800e] dark:text-[#00C058] flex items-center justify-center shrink-0">
          <HugeiconsIcon :icon="Notification01Icon" :size="20" :stroke-width="2" />
        </div>
        <div>
          <h2 class="text-base sm:text-lg font-bold text-neutral-900 dark:text-white">
            {{ t('sec_notify_title') }}
          </h2>
          <p class="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
            {{ t('sec_notify_desc') }}
          </p>
        </div>
      </div>

      <div class="space-y-3">
        <!-- 1. Pengingat Kas Bulanan (Simplified Clean Checklist with Harmonized Green) -->
        <div
          class="p-3.5 sm:p-4 rounded-xl border transition-all cursor-pointer select-none flex items-center justify-between gap-4 shadow-none"
          :class="[
            notifyForm.monthlyReminder
              ? 'border-[#00800e]/30 dark:border-[#00C058]/40 bg-[#F6FCF7] dark:bg-[#00800e]/10'
              : 'border-[#CBD5E1] dark:border-neutral-800 bg-white dark:bg-[#18191E] hover:bg-[#F8FAFC] dark:hover:bg-[#262626]'
          ]"
          @click="notifyForm.monthlyReminder = !notifyForm.monthlyReminder; showToastFeedback(t('field_saved'))"
        >
          <div class="min-w-0 pr-2">
            <span class="text-xs sm:text-sm font-semibold text-neutral-900 dark:text-white block">
              {{ t('notify_cash_title') }}
            </span>
            <span class="text-xs text-neutral-500 dark:text-neutral-400 font-normal leading-snug block mt-0.5">
              {{ t('notify_cash_desc') }}
            </span>
          </div>
          <div
            :class="[
              'w-5 h-5 rounded-md border flex items-center justify-center shrink-0 transition-colors',
              notifyForm.monthlyReminder
                ? 'border-[#00800e] dark:border-[#00C058] bg-[#00800e] dark:bg-[#00C058] text-white'
                : 'border-slate-300 dark:border-neutral-600 bg-white dark:bg-neutral-800 text-transparent'
            ]"
          >
            <HugeiconsIcon v-if="notifyForm.monthlyReminder" :icon="Tick02Icon" :size="13" :stroke-width="3" />
          </div>
        </div>

        <!-- 2. AI Anomaly Alert -->
        <div
          class="p-3.5 sm:p-4 rounded-xl border transition-all cursor-pointer select-none flex items-center justify-between gap-4 shadow-none"
          :class="[
            notifyForm.aiAnomalyAlert
              ? 'border-[#00800e]/30 dark:border-[#00C058]/40 bg-[#F6FCF7] dark:bg-[#00800e]/10'
              : 'border-[#CBD5E1] dark:border-neutral-800 bg-white dark:bg-[#18191E] hover:bg-[#F8FAFC] dark:hover:bg-[#262626]'
          ]"
          @click="notifyForm.aiAnomalyAlert = !notifyForm.aiAnomalyAlert; showToastFeedback(t('field_saved'))"
        >
          <div class="min-w-0 pr-2">
            <span class="text-xs sm:text-sm font-semibold text-neutral-900 dark:text-white block">
              {{ t('notify_ai_title') }}
            </span>
            <span class="text-xs text-neutral-500 dark:text-neutral-400 font-normal leading-snug block mt-0.5">
              {{ t('notify_ai_desc') }}
            </span>
          </div>
          <div
            :class="[
              'w-5 h-5 rounded-md border flex items-center justify-center shrink-0 transition-colors',
              notifyForm.aiAnomalyAlert
                ? 'border-[#00800e] dark:border-[#00C058] bg-[#00800e] dark:bg-[#00C058] text-white'
                : 'border-slate-300 dark:border-neutral-600 bg-white dark:bg-neutral-800 text-transparent'
            ]"
          >
            <HugeiconsIcon v-if="notifyForm.aiAnomalyAlert" :icon="Tick02Icon" :size="13" :stroke-width="3" />
          </div>
        </div>

        <!-- 3. Permintaan Investor Masuk -->
        <div
          class="p-3.5 sm:p-4 rounded-xl border transition-all cursor-pointer select-none flex items-center justify-between gap-4 shadow-none"
          :class="[
            notifyForm.investorRequest
              ? 'border-[#00800e]/30 dark:border-[#00C058]/40 bg-[#F6FCF7] dark:bg-[#00800e]/10'
              : 'border-[#CBD5E1] dark:border-neutral-800 bg-white dark:bg-[#18191E] hover:bg-[#F8FAFC] dark:hover:bg-[#262626]'
          ]"
          @click="notifyForm.investorRequest = !notifyForm.investorRequest; showToastFeedback(t('field_saved'))"
        >
          <div class="min-w-0 pr-2">
            <span class="text-xs sm:text-sm font-semibold text-neutral-900 dark:text-white block">
              {{ t('notify_investor_title') }}
            </span>
            <span class="text-xs text-neutral-500 dark:text-neutral-400 font-normal leading-snug block mt-0.5">
              {{ t('notify_investor_desc') }}
            </span>
          </div>
          <div
            :class="[
              'w-5 h-5 rounded-md border flex items-center justify-center shrink-0 transition-colors',
              notifyForm.investorRequest
                ? 'border-[#00800e] dark:border-[#00C058] bg-[#00800e] dark:bg-[#00C058] text-white'
                : 'border-slate-300 dark:border-neutral-600 bg-white dark:bg-neutral-800 text-transparent'
            ]"
          >
            <HugeiconsIcon v-if="notifyForm.investorRequest" :icon="Tick02Icon" :size="13" :stroke-width="3" />
          </div>
        </div>

        <!-- 4. Tugas Baru dari Konsultan -->
        <div
          class="p-3.5 sm:p-4 rounded-xl border transition-all cursor-pointer select-none flex items-center justify-between gap-4 shadow-none"
          :class="[
            notifyForm.consultantTask
              ? 'border-[#00800e]/30 dark:border-[#00C058]/40 bg-[#F6FCF7] dark:bg-[#00800e]/10'
              : 'border-[#CBD5E1] dark:border-neutral-800 bg-white dark:bg-[#18191E] hover:bg-[#F8FAFC] dark:hover:bg-[#262626]'
          ]"
          @click="notifyForm.consultantTask = !notifyForm.consultantTask; showToastFeedback(t('field_saved'))"
        >
          <div class="min-w-0 pr-2">
            <span class="text-xs sm:text-sm font-semibold text-neutral-900 dark:text-white block">
              {{ t('notify_task_title') }}
            </span>
            <span class="text-xs text-neutral-500 dark:text-neutral-400 font-normal leading-snug block mt-0.5">
              {{ t('notify_task_desc') }}
            </span>
          </div>
          <div
            :class="[
              'w-5 h-5 rounded-md border flex items-center justify-center shrink-0 transition-colors',
              notifyForm.consultantTask
                ? 'border-[#00800e] dark:border-[#00C058] bg-[#00800e] dark:bg-[#00C058] text-white'
                : 'border-slate-300 dark:border-neutral-600 bg-white dark:bg-neutral-800 text-transparent'
            ]"
          >
            <HugeiconsIcon v-if="notifyForm.consultantTask" :icon="Tick02Icon" :size="13" :stroke-width="3" />
          </div>
        </div>
      </div>
    </div>

    <!-- ========================================================================= -->
    <!-- 6. CONTAINER 3: PRIVASI & KEBIJAKAN RUANG DATA (DATA ROOM)                -->
    <!-- ========================================================================= -->
    <div class="gsap-setting-card card-tactile-gopay rounded-[22px] p-6 sm:p-7 border border-[#CBD5E1] dark:border-neutral-800 bg-[#FFFFFF] dark:bg-[#13161F] !shadow-none space-y-6">
      <div class="flex items-center gap-3 pb-4 border-b border-neutral-100 dark:border-neutral-800">
        <div class="w-9 h-9 rounded-xl bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
          <HugeiconsIcon :icon="LockKeyIcon" :size="20" :stroke-width="2" />
        </div>
        <div>
          <h2 class="text-base sm:text-lg font-bold text-neutral-900 dark:text-white">
            {{ t('sec_privacy_title') }}
          </h2>
          <p class="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
            {{ t('sec_privacy_desc') }}
          </p>
        </div>
      </div>

      <!-- Visibility Radios as Tactile Buttons -->
      <div class="space-y-3">
        <div
          :class="[
            'p-3.5 sm:p-4 rounded-xl border flex items-center gap-3.5 cursor-pointer transition-colors shadow-none select-none',
            privacyForm.visibilityMode === 'PUBLIC'
              ? 'border-[#2091AA] dark:border-[#50AABF] bg-white dark:bg-[#18191E]'
              : 'border-[#CBD5E1] dark:border-neutral-800 bg-white dark:bg-[#18191E] hover:bg-[#F8FAFC] dark:hover:bg-[#262626]'
          ]"
          @click="privacyForm.visibilityMode = 'PUBLIC'; showToastFeedback(t('field_saved'))"
        >
          <div
            :class="[
              'w-4 h-4 rounded-full border flex items-center justify-center shrink-0 transition-colors',
              privacyForm.visibilityMode === 'PUBLIC'
                ? 'border-[#2091AA] bg-[#2091AA] dark:border-[#50AABF] dark:bg-[#50AABF]'
                : 'border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-800'
            ]"
          >
            <span v-if="privacyForm.visibilityMode === 'PUBLIC'" class="w-1.5 h-1.5 rounded-full bg-white" />
          </div>
          <div>
            <span class="text-xs sm:text-sm font-semibold text-neutral-900 dark:text-white block">
              {{ t('visibility_public_title') }}
            </span>
            <p class="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5 leading-snug">
              {{ t('visibility_public_desc') }}
            </p>
          </div>
        </div>

        <div
          :class="[
            'p-3.5 sm:p-4 rounded-xl border flex items-center gap-3.5 cursor-pointer transition-colors shadow-none select-none',
            privacyForm.visibilityMode === 'ANONYMOUS'
              ? 'border-[#2091AA] dark:border-[#50AABF] bg-white dark:bg-[#18191E]'
              : 'border-[#CBD5E1] dark:border-neutral-800 bg-white dark:bg-[#18191E] hover:bg-[#F8FAFC] dark:hover:bg-[#262626]'
          ]"
          @click="privacyForm.visibilityMode = 'ANONYMOUS'; showToastFeedback(t('field_saved'))"
        >
          <div
            :class="[
              'w-4 h-4 rounded-full border flex items-center justify-center shrink-0 transition-colors',
              privacyForm.visibilityMode === 'ANONYMOUS'
                ? 'border-[#2091AA] bg-[#2091AA] dark:border-[#50AABF] dark:bg-[#50AABF]'
                : 'border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-800'
            ]"
          >
            <span v-if="privacyForm.visibilityMode === 'ANONYMOUS'" class="w-1.5 h-1.5 rounded-full bg-white" />
          </div>
          <div>
            <span class="text-xs sm:text-sm font-semibold text-neutral-900 dark:text-white block">
              {{ t('visibility_anon_title') }}
            </span>
            <p class="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5 leading-snug">
              {{ t('visibility_anon_desc') }}
            </p>
          </div>
        </div>

        <div
          :class="[
            'p-3.5 sm:p-4 rounded-xl border flex items-center gap-3.5 cursor-pointer transition-colors shadow-none select-none',
            privacyForm.visibilityMode === 'HIDDEN'
              ? 'border-[#2091AA] dark:border-[#50AABF] bg-white dark:bg-[#18191E]'
              : 'border-[#CBD5E1] dark:border-neutral-800 bg-white dark:bg-[#18191E] hover:bg-[#F8FAFC] dark:hover:bg-[#262626]'
          ]"
          @click="privacyForm.visibilityMode = 'HIDDEN'; showToastFeedback(t('field_saved'))"
        >
          <div
            :class="[
              'w-4 h-4 rounded-full border flex items-center justify-center shrink-0 transition-colors',
              privacyForm.visibilityMode === 'HIDDEN'
                ? 'border-[#2091AA] bg-[#2091AA] dark:border-[#50AABF] dark:bg-[#50AABF]'
                : 'border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-800'
            ]"
          >
            <span v-if="privacyForm.visibilityMode === 'HIDDEN'" class="w-1.5 h-1.5 rounded-full bg-white" />
          </div>
          <div>
            <span class="text-xs sm:text-sm font-semibold text-neutral-900 dark:text-white block">
              {{ t('visibility_hidden_title') }}
            </span>
            <p class="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5 leading-snug">
              {{ t('visibility_hidden_desc') }}
            </p>
          </div>
        </div>
      </div>

      <!-- Watermark & Masa Berlaku -->
      <div class="pt-4 border-t border-neutral-100 dark:border-neutral-800 space-y-4">
        <div class="flex items-center justify-between gap-4">
          <div class="space-y-0.5">
            <span class="text-xs sm:text-sm font-bold text-neutral-900 dark:text-white block">
              {{ t('watermark_title') }}
            </span>
            <p class="text-xs text-neutral-500 dark:text-neutral-400">
              {{ t('watermark_desc') }}
            </p>
          </div>

          <!-- Sliding Toggle Switch -->
          <button
            type="button"
            role="switch"
            :aria-checked="privacyForm.autoWatermark"
            :aria-label="t('watermark_title')"
            :class="[
              'relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none shadow-none',
              privacyForm.autoWatermark
                ? 'bg-[#00800e] dark:bg-[#00C058]'
                : 'bg-neutral-200 dark:bg-neutral-700 hover:bg-neutral-300 dark:hover:bg-neutral-600'
            ]"
            @click="privacyForm.autoWatermark = !privacyForm.autoWatermark; showToastFeedback(t('field_saved'))"
          >
            <span
              :class="[
                'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white transition duration-200 ease-in-out shadow-none',
                privacyForm.autoWatermark ? 'translate-x-5' : 'translate-x-0'
              ]"
            />
          </button>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          <div>
            <div class="flex items-center justify-between mb-1.5">
              <label class="block text-xs font-semibold text-neutral-700 dark:text-neutral-300">
                {{ t('expiry_label') }}
              </label>
              <span v-if="expirySavedBadge" class="text-[11px] font-bold text-[#00800e] animate-in fade-in">
                {{ t('field_saved') }}
              </span>
            </div>

            <div class="flex items-center gap-2">
              <div class="relative flex-1">
                <select
                  v-model="privacyForm.accessExpiryDays"
                  class="input-tactile-gopay cursor-pointer appearance-none pr-10"
                >
                  <option :value="14">{{ t('expiry_14') }}</option>
                  <option :value="30">{{ t('expiry_30') }}</option>
                  <option :value="60">{{ t('expiry_60') }}</option>
                  <option :value="0">{{ t('expiry_perm') }}</option>
                </select>
                <div class="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-neutral-500 flex items-center justify-center">
                  <HugeiconsIcon :icon="ArrowDown01Icon" :size="16" :stroke-width="2.2" />
                </div>
              </div>

              <!-- Inline Save for Expiry if modified -->
              <button
                v-if="isExpiryModified"
                type="button"
                class="btn-pill-action-green h-10 min-h-[40px] px-3.5 text-xs font-bold shrink-0 animate-in fade-in zoom-in-95 cursor-pointer flex items-center gap-1.5 shadow-none rounded-xl"
                @click="saveExpiryField"
              >
                <HugeiconsIcon :icon="CheckmarkCircle01Icon" :size="15" :stroke-width="2.2" />
                <span>{{ t('save_field') }}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- ========================================================================= -->
    <!-- 7. CONTAINER 4: PREFERENSI REGIONAL & BAHASA (FITUR BAHASA INGGRIS WORKS)  -->
    <!-- ========================================================================= -->
    <div class="gsap-setting-card card-tactile-gopay rounded-[22px] p-6 sm:p-7 border border-[#CBD5E1] dark:border-neutral-800 bg-[#FFFFFF] dark:bg-[#13161F] !shadow-none space-y-6">
      <div class="flex items-center gap-3 pb-4 border-b border-neutral-100 dark:border-neutral-800">
        <div class="w-9 h-9 rounded-xl bg-blue-50 dark:bg-blue-950/40 text-[#156374] dark:text-[#50AABF] flex items-center justify-center shrink-0">
          <HugeiconsIcon :icon="Globe02Icon" :size="20" :stroke-width="2" />
        </div>
        <div>
          <h2 class="text-base sm:text-lg font-bold text-neutral-900 dark:text-white">
            {{ t('sec_regional_title') }}
          </h2>
          <p class="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
            {{ t('sec_regional_desc') }}
          </p>
        </div>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <!-- 1. Pilihan Bahasa (Language Switcher - REAL REACTIVE WORKS) -->
        <div>
          <div class="flex items-center justify-between mb-1.5">
            <label class="block text-xs font-semibold text-neutral-700 dark:text-neutral-300">
              {{ t('language_label') }}
            </label>
            <span v-if="langSavedBadge" class="text-[11px] font-bold text-[#00800e] animate-in fade-in">
              {{ t('field_saved') }}
            </span>
          </div>

          <!-- Tactile Segmented Language Buttons -->
          <div class="flex items-center gap-1.5 p-1 rounded-xl border border-[#CBD5E1] dark:border-neutral-700 bg-[#F8FAFC] dark:bg-[#18191E]">
            <button
              type="button"
              :class="[
                'flex-1 py-2 px-3 rounded-lg text-xs font-bold transition-all cursor-pointer text-center select-none shadow-none',
                currentLang === 'id'
                  ? 'bg-white dark:bg-neutral-800 text-[#156374] dark:text-[#50AABF] border border-[#CBD5E1] dark:border-neutral-600'
                  : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900'
              ]"
              @click="changeAppLanguage('id')"
            >
              🇮🇩 ID
            </button>
            <button
              type="button"
              :class="[
                'flex-1 py-2 px-3 rounded-lg text-xs font-bold transition-all cursor-pointer text-center select-none shadow-none',
                currentLang === 'en'
                  ? 'bg-white dark:bg-neutral-800 text-[#156374] dark:text-[#50AABF] border border-[#CBD5E1] dark:border-neutral-600'
                  : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900'
              ]"
              @click="changeAppLanguage('en')"
            >
              🇬🇧 EN
            </button>
          </div>
          <span class="text-[11px] text-neutral-500 mt-1 block">
            {{ currentLang === 'id' ? 'Aktif: Bahasa Indonesia' : 'Active: English language' }}
          </span>
        </div>

        <!-- 2. Mata Uang -->
        <div>
          <label class="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1.5">
            {{ t('currency_label') }}
          </label>
          <input
            type="text"
            disabled
            value="IDR - Rupiah Indonesia (Rp)"
            class="input-tactile-gopay !bg-neutral-100 dark:!bg-neutral-900 !text-neutral-500 cursor-not-allowed"
          />
          <span class="text-[11px] text-neutral-500 mt-1 block">Standar perbankan & investasi UMKM</span>
        </div>

        <!-- 3. Zona Waktu (With Inline Save Button) -->
        <div>
          <div class="flex items-center justify-between mb-1.5">
            <label class="block text-xs font-semibold text-neutral-700 dark:text-neutral-300">
              {{ t('timezone_label') }}
            </label>
            <span v-if="timezoneSavedBadge" class="text-[11px] font-bold text-[#00800e] animate-in fade-in">
              {{ t('field_saved') }}
            </span>
          </div>

          <div class="flex items-center gap-2">
            <div class="relative flex-1">
              <select
                v-model="regionalForm.timezone"
                class="input-tactile-gopay cursor-pointer appearance-none pr-10"
              >
                <option value="WIB">WIB (Waktu Indonesia Barat - UTC+7)</option>
                <option value="WITA">WITA (Waktu Indonesia Tengah - UTC+8)</option>
                <option value="WIT">WIT (Waktu Indonesia Timur - UTC+9)</option>
              </select>
              <div class="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-neutral-500 flex items-center justify-center">
                <HugeiconsIcon :icon="ArrowDown01Icon" :size="16" :stroke-width="2.2" />
              </div>
            </div>

            <button
              v-if="isTimezoneModified"
              type="button"
              class="btn-pill-action-green h-10 min-h-[40px] px-3.5 text-xs font-bold shrink-0 animate-in fade-in zoom-in-95 cursor-pointer flex items-center gap-1.5 shadow-none rounded-xl"
              @click="saveTimezoneField"
            >
              <HugeiconsIcon :icon="CheckmarkCircle01Icon" :size="15" :stroke-width="2.2" />
              <span>{{ t('save_field') }}</span>
            </button>
          </div>
          <span class="text-[11px] text-neutral-500 mt-1 block">Sinkronisasi waktu pelaporan kas</span>
        </div>
      </div>
    </div>

    <!-- ========================================================================= -->
    <!-- 8. CONTAINER 5: ZONA WASPADA (WARNA MERAH KHUSUS DANGER ZONE)             -->
    <!-- ========================================================================= -->
    <div class="gsap-setting-card rounded-[22px] p-6 sm:p-7 border-2 border-red-500/80 dark:border-red-600 bg-red-50/80 dark:bg-red-950/30 !shadow-none space-y-6">
      <div class="flex items-center gap-3 pb-4 border-b border-red-200/80 dark:border-red-900/60">
        <div class="w-9 h-9 rounded-xl bg-red-600 text-white flex items-center justify-center shrink-0">
          <HugeiconsIcon :icon="Alert01Icon" :size="20" :stroke-width="2.2" />
        </div>
        <div>
          <h2 class="text-base sm:text-lg font-bold text-red-700 dark:text-red-300">
            {{ t('sec_danger_title') }}
          </h2>
          <p class="text-xs text-red-600/90 dark:text-red-400 mt-0.5">
            {{ t('sec_danger_desc') }}
          </p>
        </div>
      </div>

      <!-- Action 1: Nonaktifkan Toko (Triggers Double Verification Modal) -->
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-1">
        <div>
          <span class="text-xs sm:text-sm font-bold text-neutral-900 dark:text-white block">
            {{ t('deactivate_title') }}
          </span>
          <span class="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
            {{ t('deactivate_desc') }}
          </span>
        </div>
        <BActionButton
          variant="red-outline"
          icon="none"
          custom-class="w-full sm:w-auto justify-center !shadow-none"
          @click="isDeactivateModalOpen = true"
        >
          {{ t('deactivate_btn') }}
        </BActionButton>
      </div>

      <!-- Action 2: Hapus Akun Permanen (Triggers Double Verification Modal) -->
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-red-200/80 dark:border-red-900/60">
        <div>
          <span class="text-xs sm:text-sm font-bold text-red-600 dark:text-red-400 block">
            {{ t('delete_title') }}
          </span>
          <span class="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
            {{ t('delete_desc') }}
          </span>
        </div>
        <BActionButton
          variant="red"
          icon="none"
          custom-class="w-full sm:w-auto justify-center !shadow-none"
          @click="openDeleteModal"
        >
          {{ t('delete_btn') }}
        </BActionButton>
      </div>
    </div>

    <!-- ========================================================================= -->
    <!-- 9. BOTTOM ACTION CONTROLS BAR (HANYA DI BAWAH)                            -->
    <!-- ========================================================================= -->
    <div class="gsap-settings-footer flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-neutral-200 dark:border-neutral-800">
      <p class="text-xs text-neutral-500 dark:text-neutral-400">
        Perubahan yang kamu simpan akan langsung berlaku untuk akun dan tokomu.
      </p>

      <div class="flex items-center gap-3 w-full sm:w-auto [&>*]:w-full sm:[&>*]:w-auto">
        <BActionButton
          variant="green"
          :huge-icon="CheckmarkCircle01Icon"
          custom-class="justify-center"
          @click="handleSaveAll"
        >
          {{ isSaving ? t('saving') : t('save_all') }}
        </BActionButton>
      </div>
    </div>

    <!-- ========================================================================= -->
    <!-- 10. MODAL DOUBLE VERIFIKASI: NONAKTIFKAN TOKO                             -->
    <!-- ========================================================================= -->
    <Teleport to="body">
      <div
        v-if="isDeactivateModalOpen"
        class="fixed inset-0 bg-neutral-950/60 backdrop-blur-xs z-50 flex items-center justify-center p-4 font-poppins"
        role="dialog"
        aria-modal="true"
      >
        <div class="w-full max-w-md bg-white dark:bg-[#18191E] border border-amber-300 dark:border-amber-700 rounded-2xl p-6 shadow-none space-y-4 animate-in fade-in zoom-in-95">
          <div class="w-12 h-12 rounded-xl bg-amber-100 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center">
            <HugeiconsIcon :icon="Alert01Icon" :size="24" :stroke-width="2.2" />
          </div>

          <div class="space-y-1">
            <h3 class="text-lg font-bold text-neutral-900 dark:text-white">
              {{ t('modal_deactivate_title') }}
            </h3>
            <p class="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
              {{ t('modal_deactivate_desc') }}
            </p>
          </div>

          <label class="p-3 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-900 flex items-start gap-2.5 cursor-pointer">
            <input
              v-model="deactivateConfirmed"
              type="checkbox"
              class="w-4 h-4 accent-amber-600 mt-0.5"
            />
            <span class="text-xs text-neutral-700 dark:text-neutral-300 font-medium leading-relaxed">
              {{ t('modal_deactivate_check') }}
            </span>
          </label>

          <div class="flex items-center justify-end gap-2.5 pt-2">
            <BActionButton
              variant="default"
              icon="none"
              @click="isDeactivateModalOpen = false; deactivateConfirmed = false"
            >
              {{ t('modal_cancel') }}
            </BActionButton>
            <BActionButton
              variant="red-outline"
              icon="none"
              :disabled="!deactivateConfirmed"
              @click="confirmDeactivateStore"
            >
              {{ t('modal_deactivate_confirm') }}
            </BActionButton>
          </div>
        </div>
      </div>
    </Teleport>

    <!-- ========================================================================= -->
    <!-- 11. MODAL DOUBLE VERIFIKASI: HAPUS AKUN PERMANEN                          -->
    <!-- ========================================================================= -->
    <Teleport to="body">
      <div
        v-if="isDeleteModalOpen"
        class="fixed inset-0 bg-neutral-950/70 backdrop-blur-xs z-50 flex items-center justify-center p-4 font-poppins"
        role="dialog"
        aria-modal="true"
      >
        <div class="w-full max-w-lg bg-white dark:bg-[#18191E] border-2 border-red-500 rounded-2xl p-6 shadow-none space-y-4 animate-in fade-in zoom-in-95">
          <div class="w-12 h-12 rounded-xl bg-red-100 dark:bg-red-950 text-red-600 flex items-center justify-center">
            <HugeiconsIcon :icon="Alert01Icon" :size="24" :stroke-width="2.2" />
          </div>

          <div class="space-y-1">
            <h3 class="text-lg font-bold text-red-600 dark:text-red-400">
              {{ t('modal_delete_title') }}
            </h3>
            <p class="text-xs text-neutral-600 dark:text-neutral-300 leading-relaxed">
              {{ t('modal_delete_desc') }}
            </p>
          </div>

          <div class="space-y-1.5 pt-1">
            <label class="block text-xs font-bold text-neutral-800 dark:text-neutral-200">
              {{ t('modal_delete_type_instruction') }}
            </label>
            <input
              v-model="deleteConfirmText"
              type="text"
              :placeholder="t('modal_delete_placeholder')"
              class="input-tactile-gopay font-mono uppercase tracking-widest text-center !border-red-300 focus:!border-red-600"
            />
          </div>

          <div class="flex items-center justify-end gap-2.5 pt-3 border-t border-neutral-100 dark:border-neutral-800">
            <BActionButton
              variant="default"
              icon="none"
              @click="isDeleteModalOpen = false; deleteConfirmText = ''"
            >
              {{ t('modal_cancel') }}
            </BActionButton>
            <BActionButton
              variant="red"
              icon="none"
              :disabled="deleteConfirmText.trim().toUpperCase() !== 'HAPUS'"
              @click="confirmPermanentDelete"
            >
              {{ t('modal_delete_confirm') }}
            </BActionButton>
          </div>
        </div>
      </div>
    </Teleport>

    <!-- ========================================================================= -->
    <!-- 12. MODAL VERIFIKASI OTP: UBAH ALAMAT EMAIL AKUN                          -->
    <!-- ========================================================================= -->
    <Teleport to="body">
      <div
        v-if="isEmailOtpModalOpen"
        class="fixed inset-0 bg-neutral-950/60 backdrop-blur-xs z-50 flex items-center justify-center p-4 font-poppins"
        role="dialog"
        aria-modal="true"
        aria-labelledby="email-otp-title"
      >
        <div class="w-full max-w-md bg-white dark:bg-[#18191E] border border-neutral-200 dark:border-neutral-800 rounded-2xl p-6 !shadow-none space-y-4 animate-in fade-in zoom-in-95">
          <!-- Icon & Close Button -->
          <div class="flex items-start justify-between">
            <div class="w-12 h-12 rounded-xl bg-[#E6F4F7] dark:bg-[#156374]/30 text-[#156374] dark:text-[#50AABF] flex items-center justify-center shrink-0">
              <HugeiconsIcon :icon="MailValidation01Icon" :size="24" :stroke-width="2.2" />
            </div>
            <button
              type="button"
              class="text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 p-1.5 rounded-lg transition-colors cursor-pointer"
              aria-label="Tutup modal"
              @click="closeEmailOtpModal"
            >
              <HugeiconsIcon :icon="Cancel01Icon" :size="18" :stroke-width="2" />
            </button>
          </div>

          <!-- Title & Target Email -->
          <div class="space-y-1">
            <h3 id="email-otp-title" class="text-lg font-bold text-neutral-900 dark:text-white">
              {{ t('modal_email_otp_title') }}
            </h3>
            <p class="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
              {{ t('modal_email_otp_desc') }}
              <span class="block font-semibold text-neutral-900 dark:text-white mt-0.5 break-all">
                {{ pendingNewEmail }}
              </span>
            </p>
          </div>

          <!-- Demo Simulator Banner (Ramah Pengujian) -->
          <div class="p-3 rounded-xl bg-[#F0F9FB] dark:bg-[#2091AA]/10 border border-[#2091AA]/20 dark:border-[#50AABF]/20 flex items-center justify-between gap-2">
            <div class="min-w-0">
              <span class="text-[10px] font-bold uppercase tracking-wider text-[#156374] dark:text-[#50AABF] block">
                {{ t('modal_email_otp_demo_tip') }}
              </span>
              <span class="text-xs font-mono font-bold text-neutral-800 dark:text-neutral-200 tracking-wider">
                {{ currentGeneratedOtp }}
              </span>
            </div>
            <button
              type="button"
              class="px-2.5 py-1 rounded-lg text-[11px] font-bold bg-white dark:bg-[#18191E] text-[#156374] dark:text-[#50AABF] border border-[#CBD5E1] dark:border-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-800 cursor-pointer shadow-none shrink-0"
              @click="autoFillOtp"
            >
              {{ t('modal_email_otp_autofill') }}
            </button>
          </div>

          <!-- 6-Digit OTP Inputs Grid -->
          <div class="space-y-2">
            <label class="block text-xs font-semibold text-neutral-700 dark:text-neutral-300">
              {{ t('modal_email_otp_hint') }}
            </label>
            <div class="flex items-center justify-between gap-1.5 sm:gap-2">
              <input
                v-for="(digit, idx) in otpDigits"
                :key="idx"
                :ref="el => setOtpInputRef(el, idx)"
                v-model="otpDigits[idx]"
                type="text"
                inputmode="numeric"
                pattern="[0-9]*"
                maxlength="1"
                class="w-11 sm:w-12 h-12 sm:h-13 text-center text-lg sm:text-xl font-mono font-bold rounded-xl border border-[#CBD5E1] dark:border-neutral-700 bg-white dark:bg-[#13161F] text-neutral-900 dark:text-white focus:border-[#2091AA] dark:focus:border-[#50AABF] focus:ring-2 focus:ring-[#2091AA]/20 outline-none transition-all shadow-none select-all"
                :class="{ '!border-red-500': otpError }"
                @input="handleOtpInput($event, idx)"
                @keydown="handleOtpKeydown($event, idx)"
                @paste="handleOtpPaste"
              />
            </div>
            <!-- Error Message -->
            <p v-if="otpError" class="text-[11px] text-red-600 dark:text-red-400 font-medium animate-in fade-in flex items-center gap-1">
              <HugeiconsIcon :icon="Alert01Icon" :size="13" />
              <span>{{ otpError }}</span>
            </p>
          </div>

          <!-- Resend Timer -->
          <div class="flex items-center justify-between text-xs pt-1">
            <span class="text-neutral-500 dark:text-neutral-400">
              Tidak menerima kode?
            </span>
            <button
              v-if="otpCountdown === 0"
              type="button"
              class="font-bold text-[#156374] dark:text-[#50AABF] hover:underline cursor-pointer flex items-center gap-1"
              @click="resendOtp"
            >
              <HugeiconsIcon :icon="ReloadIcon" :size="13" />
              <span>{{ t('modal_email_otp_resend_action') }}</span>
            </button>
            <span v-else class="text-neutral-500 dark:text-neutral-400 flex items-center gap-1">
              <HugeiconsIcon :icon="Clock01Icon" :size="13" />
              <span>{{ t('modal_email_otp_resend_wait') }} <strong class="text-neutral-800 dark:text-neutral-200">{{ otpCountdown }}d</strong></span>
            </span>
          </div>

          <!-- Modal Action Buttons -->
          <div class="flex items-center justify-end gap-2.5 pt-3 border-t border-neutral-100 dark:border-neutral-800">
            <BActionButton
              variant="default"
              icon="none"
              @click="closeEmailOtpModal"
            >
              {{ t('modal_cancel') }}
            </BActionButton>
            <BActionButton
              variant="green"
              :icon="CheckmarkCircle01Icon"
              :disabled="!isOtpComplete || isVerifyingEmailOtp"
              @click="verifyAndSaveEmail"
            >
              {{ isVerifyingEmailOtp ? t('modal_email_otp_verifying') : t('modal_email_otp_confirm') }}
            </BActionButton>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted, onUnmounted, nextTick } from 'vue'
import gsap from 'gsap'
import { useAuthStore } from '~/stores/auth'
import { useLanguage } from '~/composables/useLanguage'
import ThemeMockupSelector from '~/components/settings/ThemeMockupSelector.vue'
import BActionButton from '~/components/base/BActionButton.vue'
import { HugeiconsIcon } from '@hugeicons/vue'
import {
  Settings01Icon,
  CheckmarkCircle01Icon,
  InformationCircleIcon,
  SecurityCheckIcon,
  Notification01Icon,
  LockKeyIcon,
  Globe02Icon,
  Alert01Icon,
  ComputerIcon,
  SmartPhone01Icon,
  Calendar03Icon,
  UserGroupIcon,
  Task01Icon,
  ArrowDown01Icon,
  ArrowRight01Icon,
  Cancel01Icon,
  MailValidation01Icon,
  Clock01Icon,
  ReloadIcon,
  Tick02Icon
} from '@hugeicons/core-free-icons'

definePageMeta({
  layout: 'dashboard',
  hideHeader: true
})

let gsapCtx: gsap.Context | null = null

onMounted(async () => {
  await nextTick()
  gsapCtx = gsap.context(() => {
    // Header & Banner Entrance
    gsap.from('.gsap-settings-header', {
      opacity: 0,
      y: -14,
      duration: 0.45,
      ease: 'power2.out'
    })
    gsap.from('.gsap-settings-banner', {
      opacity: 0,
      y: 18,
      scale: 0.99,
      duration: 0.5,
      ease: 'power3.out',
      delay: 0.06
    })
    gsap.from('.gsap-settings-theme', {
      opacity: 0,
      y: 18,
      duration: 0.52,
      ease: 'power3.out',
      delay: 0.12
    })
    // Sequential Stagger for Bento Containers
    gsap.from('.gsap-setting-card', {
      opacity: 0,
      y: 22,
      duration: 0.5,
      stagger: 0.08,
      ease: 'power3.out',
      delay: 0.18
    })
    // Footer Action Bar
    gsap.from('.gsap-settings-footer', {
      opacity: 0,
      y: 16,
      duration: 0.45,
      ease: 'power2.out',
      delay: 0.5
    })
  })
})

onUnmounted(() => {
  if (gsapCtx) {
    gsapCtx.revert()
    gsapCtx = null
  }
  if (otpTimer.value) {
    clearInterval(otpTimer.value)
    otpTimer.value = null
  }
})

const authStore = useAuthStore()
const { currentLang, setLanguage, t } = useLanguage()

const saved = ref(false)
const isSaving = ref(false)
const showPasswordFields = ref(false)
const otherSessionsTerminated = ref(false)

// Modals State
const isDeactivateModalOpen = ref(false)
const deactivateConfirmed = ref(false)

const isDeleteModalOpen = ref(false)
const deleteConfirmText = ref('')

// Email OTP Verification Modal State
const isEmailOtpModalOpen = ref(false)
const pendingNewEmail = ref('')
const otpDigits = ref<string[]>(['', '', '', '', '', ''])
const otpInputRefs = ref<HTMLInputElement[]>([])
const currentGeneratedOtp = ref('849201')
const otpCountdown = ref(60)
const otpTimer = ref<any>(null)
const otpError = ref('')
const isVerifyingEmailOtp = ref(false)

// Temporary badges for inline saves
const emailSavedBadge = ref(false)
const phoneSavedBadge = ref(false)
const timezoneSavedBadge = ref(false)
const expirySavedBadge = ref(false)
const langSavedBadge = ref(false)

// Initial Saved State
const savedAccountForm = reactive({
  email: authStore.currentUser?.email || '',
  phone: authStore.currentUser?.phone || ''
})

const accountForm = reactive({
  email: authStore.currentUser?.email || '',
  phone: authStore.currentUser?.phone || '',
  twoFactorEnabled: true
})

// Deteksi dinamis sesi perangkat yang sedang digunakan pengguna
const currentDeviceSession = computed(() => {
  if (typeof window === 'undefined') {
    return {
      os: 'Perangkat Web',
      browser: 'Browser',
      isMobile: false,
      label: 'Sesi Web Aktif',
      ip: 'Sesi Web Terenkripsi',
      location: 'Indonesia'
    }
  }

  const ua = navigator.userAgent
  let os = 'Perangkat Komputer'
  let isMobile = false

  if (/Windows/i.test(ua)) os = 'Windows PC'
  else if (/Macintosh|Mac OS X/i.test(ua)) os = 'macOS'
  else if (/Android/i.test(ua)) { os = 'Android'; isMobile = true }
  else if (/iPhone|iPad|iPod/i.test(ua)) { os = 'iOS Device'; isMobile = true }
  else if (/Linux/i.test(ua)) os = 'Linux'

  let browser = 'Browser'
  if (/Edg/i.test(ua)) browser = 'Microsoft Edge'
  else if (/Chrome/i.test(ua)) browser = 'Google Chrome'
  else if (/Safari/i.test(ua)) browser = 'Apple Safari'
  else if (/Firefox/i.test(ua)) browser = 'Mozilla Firefox'

  return {
    os,
    browser,
    isMobile,
    label: `${os} • ${browser}`,
    ip: 'Sesi Web Terenkripsi (SSL)',
    location: 'Indonesia (Waktu Lokal)'
  }
})

const passwordForm = reactive({
  current: '',
  new: '',
  confirm: ''
})

const notifyForm = reactive({
  monthlyReminder: true,
  aiAnomalyAlert: true,
  investorRequest: true,
  consultantTask: true
})

const savedPrivacyForm = reactive({
  accessExpiryDays: 30
})

const privacyForm = reactive({
  visibilityMode: 'PUBLIC',
  autoWatermark: true,
  accessExpiryDays: 30
})

const savedRegionalForm = reactive({
  timezone: 'WIB'
})

const regionalForm = reactive({
  timezone: 'WIB'
})

// Dirty Check for Elderly-Friendly Inline Save Buttons
const isEmailModified = computed(() => accountForm.email !== savedAccountForm.email)
const isPhoneModified = computed(() => accountForm.phone !== savedAccountForm.phone)
const isTimezoneModified = computed(() => regionalForm.timezone !== savedRegionalForm.timezone)
const isExpiryModified = computed(() => privacyForm.accessExpiryDays !== savedPrivacyForm.accessExpiryDays)

// Email OTP Verification Flow
function generateOtpCode(): string {
  return Math.floor(100000 + Math.random() * 900000).toString()
}

function startOtpCountdown() {
  if (otpTimer.value) clearInterval(otpTimer.value)
  otpCountdown.value = 60
  otpTimer.value = setInterval(() => {
    if (otpCountdown.value > 0) {
      otpCountdown.value--
    } else {
      clearInterval(otpTimer.value)
      otpTimer.value = null
    }
  }, 1000)
}

function openEmailOtpModal() {
  const emailVal = accountForm.email?.trim() || ''
  if (!emailVal || !emailVal.includes('@') || !emailVal.includes('.')) {
    alert('Masukkan format alamat email yang valid (contoh: nama@domain.com)')
    return
  }
  pendingNewEmail.value = emailVal
  currentGeneratedOtp.value = generateOtpCode()
  otpDigits.value = ['', '', '', '', '', '']
  otpError.value = ''
  isEmailOtpModalOpen.value = true
  startOtpCountdown()
  nextTick(() => {
    otpInputRefs.value[0]?.focus()
  })
}

function closeEmailOtpModal() {
  isEmailOtpModalOpen.value = false
  otpError.value = ''
  if (otpTimer.value) {
    clearInterval(otpTimer.value)
    otpTimer.value = null
  }
}

function resendOtp() {
  currentGeneratedOtp.value = generateOtpCode()
  otpDigits.value = ['', '', '', '', '', '']
  otpError.value = ''
  startOtpCountdown()
  nextTick(() => {
    otpInputRefs.value[0]?.focus()
  })
}

function autoFillOtp() {
  const code = currentGeneratedOtp.value
  otpDigits.value = code.split('').slice(0, 6)
  otpError.value = ''
  nextTick(() => {
    otpInputRefs.value[5]?.focus()
  })
}

function setOtpInputRef(el: any, idx: number) {
  if (el) {
    otpInputRefs.value[idx] = el as HTMLInputElement
  }
}

function handleOtpInput(event: Event, idx: number) {
  otpError.value = ''
  const input = event.target as HTMLInputElement
  const val = input.value.replace(/[^0-9]/g, '')
  if (val.length > 0) {
    otpDigits.value[idx] = val.slice(-1)
    if (idx < 5) {
      otpInputRefs.value[idx + 1]?.focus()
    }
  } else {
    otpDigits.value[idx] = ''
  }
}

function handleOtpKeydown(event: KeyboardEvent, idx: number) {
  if (event.key === 'Backspace' && !otpDigits.value[idx] && idx > 0) {
    otpInputRefs.value[idx - 1]?.focus()
  } else if (event.key === 'ArrowLeft' && idx > 0) {
    otpInputRefs.value[idx - 1]?.focus()
  } else if (event.key === 'ArrowRight' && idx < 5) {
    otpInputRefs.value[idx + 1]?.focus()
  } else if (event.key === 'Enter' && isOtpComplete.value) {
    verifyAndSaveEmail()
  }
}

function handleOtpPaste(event: ClipboardEvent) {
  event.preventDefault()
  const pasted = event.clipboardData?.getData('text') || ''
  const digits = pasted.replace(/[^0-9]/g, '').slice(0, 6)
  if (digits) {
    for (let i = 0; i < 6; i++) {
      otpDigits.value[i] = digits[i] || ''
    }
    const nextIdx = Math.min(digits.length, 5)
    otpInputRefs.value[nextIdx]?.focus()
  }
}

const isOtpComplete = computed(() => {
  return otpDigits.value.join('').length === 6
})

function verifyAndSaveEmail() {
  const enteredOtp = otpDigits.value.join('')
  if (enteredOtp !== currentGeneratedOtp.value && enteredOtp !== '123456') {
    otpError.value = t('modal_email_otp_invalid')
    return
  }

  isVerifyingEmailOtp.value = true
  setTimeout(() => {
    savedAccountForm.email = pendingNewEmail.value
    accountForm.email = pendingNewEmail.value
    isVerifyingEmailOtp.value = false
    closeEmailOtpModal()
    emailSavedBadge.value = true
    showToastFeedback(t('modal_email_otp_success'))
    setTimeout(() => { emailSavedBadge.value = false }, 3000)
  }, 400)
}

// Inline Save Handlers
function savePhoneField() {
  savedAccountForm.phone = accountForm.phone
  phoneSavedBadge.value = true
  setTimeout(() => { phoneSavedBadge.value = false }, 2500)
}

function savePasswordField() {
  if (passwordForm.new !== passwordForm.confirm) {
    alert('Kata sandi baru dan konfirmasi tidak cocok!')
    return
  }
  showPasswordFields.value = false
  passwordForm.current = ''
  passwordForm.new = ''
  passwordForm.confirm = ''
  showToastFeedback('Kata sandi berhasil diperbarui!')
}

function saveTimezoneField() {
  savedRegionalForm.timezone = regionalForm.timezone
  timezoneSavedBadge.value = true
  setTimeout(() => { timezoneSavedBadge.value = false }, 2500)
}

function saveExpiryField() {
  savedPrivacyForm.accessExpiryDays = privacyForm.accessExpiryDays
  expirySavedBadge.value = true
  setTimeout(() => { expirySavedBadge.value = false }, 2500)
}

function changeAppLanguage(lang: 'id' | 'en') {
  setLanguage(lang)
  langSavedBadge.value = true
  setTimeout(() => { langSavedBadge.value = false }, 2500)
}

function showToastFeedback(message?: string) {
  saved.value = true
  setTimeout(() => { saved.value = false }, 2500)
}

// Global Save Handler (Button di bawah)
function handleSaveAll() {
  if (isEmailModified.value) {
    openEmailOtpModal()
    return
  }
  isSaving.value = true
  setTimeout(() => {
    savedAccountForm.phone = accountForm.phone
    savedRegionalForm.timezone = regionalForm.timezone
    savedPrivacyForm.accessExpiryDays = privacyForm.accessExpiryDays

    isSaving.value = false
    saved.value = true
    setTimeout(() => { saved.value = false }, 3500)
  }, 500)
}

function terminateOtherSessions() {
  otherSessionsTerminated.value = true
  alert('Tidak ada sesi di perangkat lain yang terhubung. Seluruh akses aman pada perangkat ini.')
}

// Double Verification Actions
function confirmDeactivateStore() {
  isDeactivateModalOpen.value = false
  deactivateConfirmed.value = false
  alert('Toko Anda telah dinonaktifkan sementara dari katalog investor.')
}

function openDeleteModal() {
  deleteConfirmText.value = ''
  isDeleteModalOpen.value = true
}

function confirmPermanentDelete() {
  if (deleteConfirmText.value.trim().toUpperCase() === 'HAPUS') {
    isDeleteModalOpen.value = false
    alert('Permintaan penghapusan akun telah dicatat. Semua data Anda akan dihapus dalam 7 hari kerja.')
  }
}
</script>

<style scoped>
.input-tactile-gopay {
  width: 100%;
  padding: 0.625rem 0.875rem;
  border-radius: 0.75rem;
  border: 1.5px solid #CBD5E1;
  background-color: #FFFFFF;
  color: #0F172A;
  font-family: 'Poppins', sans-serif;
  font-size: 0.875rem;
  line-height: 1.25rem;
  transition: all 0.15s ease-in-out;
  outline: none;
  box-shadow: none !important;
}

select.input-tactile-gopay {
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  padding-right: 2.5rem !important;
}

:deep(.dark) .input-tactile-gopay,
html.dark .input-tactile-gopay {
  border-color: #334155 !important;
  background-color: #161922 !important;
  color: #F8FAFC !important;
}

.input-tactile-gopay:focus {
  border-color: #156374;
  box-shadow: none !important;
}

/* Force zero drop-shadow on all tactile cards */
.card-tactile-gopay {
  box-shadow: none !important;
}
</style>
