<template>
  <div class="space-y-6 sm:space-y-8 pb-16 font-poppins text-neutral-900 dark:text-neutral-100">
    <!-- 1. Top Header Bar: Judul Saja -->
    <div class="gsap-settings-header flex items-center gap-2.5 sm:gap-3 min-h-[44px]">
      <HugeiconsIcon
        :icon="Settings01Icon"
        :size="26"
        :stroke-width="2.2"
        class="text-neutral-900 dark:text-white shrink-0"
      />
      <h1 class="font-poppins font-semibold text-2xl sm:text-3xl text-neutral-900 dark:text-white tracking-tight leading-tight">
        Pengaturan
      </h1>
    </div>

    <!-- Alert Save Success -->
    <div
      v-if="saved"
      class="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-xs sm:text-sm font-semibold text-emerald-800 dark:text-emerald-300 flex items-center justify-between gap-3 shadow-none animate-in fade-in"
    >
      <div class="flex items-center gap-2.5">
        <HugeiconsIcon :icon="CheckmarkCircle01Icon" :size="18" class="text-[#00800e] dark:text-[#00C058] shrink-0" />
        <span>Konfigurasi parameter platform berhasil diperbarui dan diterapkan secara global.</span>
      </div>
      <button
        type="button"
        class="text-xs text-emerald-700 dark:text-emerald-400 hover:underline cursor-pointer"
        @click="saved = false"
      >
        Tutup
      </button>
    </div>

    <!-- ========================================================================= -->
    <!-- 3. TAMPILAN & MODE SISTEM (DENGAN VISUAL MOCKUP MINIATUR)                -->
    <!-- ========================================================================= -->
    <div class="gsap-settings-theme">
      <ThemeMockupSelector />
    </div>

    <!-- ========================================================================= -->
    <!-- 4. CONTAINER 1: ATURAN STANDAR SERTIFIKASI                                -->
    <!-- ========================================================================= -->
    <div class="gsap-setting-card card-tactile-gopay rounded-[22px] p-6 sm:p-7 border border-[#CBD5E1] dark:border-neutral-800 bg-[#FFFFFF] dark:bg-[#13161F] !shadow-none space-y-6">
      <div class="flex items-center gap-3 pb-4 border-b border-neutral-100 dark:border-neutral-800">
        <div class="w-9 h-9 rounded-xl bg-[#E6F4F7] dark:bg-[#156374]/30 text-[#156374] dark:text-[#50AABF] flex items-center justify-center shrink-0">
          <HugeiconsIcon :icon="Award01Icon" :size="20" :stroke-width="2" />
        </div>
        <div>
          <h2 class="text-base sm:text-lg font-bold text-neutral-900 dark:text-white">
            Gerbang Kelayakan Pendanaan (Funding Readiness Gate)
          </h2>
          <p class="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
            Standar minimum yang wajib dipenuhi UMKM sebelum dinyatakan siap tampil di marketplace investor.
          </p>
        </div>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label class="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1.5">
            Skor Radar Fundamental Minimum
          </label>
          <div class="flex items-center gap-3">
            <input
              v-model.number="certForm.minCompositeScore"
              type="number"
              min="50"
              max="100"
              class="input-tactile-gopay w-32 font-bold tabular-nums"
            />
            <span class="text-xs text-neutral-500">Skor Komposit (0 - 100)</span>
          </div>
        </div>

        <div>
          <label class="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1.5">
            Durasi Bimbingan Konsultan Minimum
          </label>
          <div class="flex items-center gap-3">
            <input
              v-model.number="certForm.minGuidanceMonths"
              type="number"
              min="1"
              max="12"
              class="input-tactile-gopay w-32 font-bold tabular-nums"
            />
            <span class="text-xs text-neutral-500">Bulan berturut-turut</span>
          </div>
        </div>
      </div>

      <div class="pt-4 border-t border-neutral-100 dark:border-neutral-800">
        <div
          class="p-3.5 sm:p-4 rounded-xl border transition-all flex items-center justify-between gap-4 cursor-pointer select-none shadow-none"
          :class="[
            certForm.requireBankStatements
              ? 'border-[#00800e]/30 dark:border-[#00C058]/40 bg-[#F6FCF7] dark:bg-[#00800e]/10'
              : 'border-[#CBD5E1] dark:border-neutral-800 bg-white dark:bg-[#18191E] hover:bg-[#F8FAFC] dark:hover:bg-[#262626]'
          ]"
          @click="certForm.requireBankStatements = !certForm.requireBankStatements"
        >
          <span class="text-xs sm:text-sm font-semibold text-neutral-800 dark:text-neutral-200 min-w-0 pr-2">
            Wajibkan lampiran rekening koran / mutasi kas 3 bulan terakhir sebelum sertifikasi diterbitkan.
          </span>
          <div
            :class="[
              'w-5 h-5 rounded-md border flex items-center justify-center shrink-0 transition-colors',
              certForm.requireBankStatements
                ? 'border-[#00800e] dark:border-[#00C058] bg-[#00800e] dark:bg-[#00C058] text-white'
                : 'border-slate-300 dark:border-neutral-600 bg-white dark:bg-neutral-800 text-transparent'
            ]"
          >
            <HugeiconsIcon v-if="certForm.requireBankStatements" :icon="Tick02Icon" :size="13" :stroke-width="3" />
          </div>
        </div>
      </div>
    </div>

    <!-- ========================================================================= -->
    <!-- 4. CONTAINER 2: SIKLUS PELAPORAN KAS                                      -->
    <!-- ========================================================================= -->
    <div class="gsap-setting-card card-tactile-gopay rounded-[22px] p-6 sm:p-7 border border-[#CBD5E1] dark:border-neutral-800 bg-[#FFFFFF] dark:bg-[#13161F] !shadow-none space-y-6">
      <div class="flex items-center gap-3 pb-4 border-b border-neutral-100 dark:border-neutral-800">
        <div class="w-9 h-9 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-[#00800e] dark:text-[#00C058] flex items-center justify-center shrink-0">
          <HugeiconsIcon :icon="Calendar03Icon" :size="20" :stroke-width="2" />
        </div>
        <div>
          <h2 class="text-base sm:text-lg font-bold text-neutral-900 dark:text-white">
            Kalender Rekonsiliasi Kas Bulanan Platform
          </h2>
          <p class="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
            Jadwal pengiriman notifikasi pengingat dan batas akhir input pencatatan kas bulanan UMKM.
          </p>
        </div>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label class="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1.5">
            Tanggal Pembukaan Entri
          </label>
          <input
            v-model.number="cycleForm.openDay"
            type="number"
            min="1"
            max="28"
            class="input-tactile-gopay tabular-nums"
          />
          <span class="text-[11px] text-neutral-500 mt-1 block">Setiap tanggal 25 tiap bulan</span>
        </div>

        <div>
          <label class="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1.5">
            Batas Tutup Buku Bulanan
          </label>
          <input
            v-model.number="cycleForm.closeDay"
            type="number"
            min="28"
            max="31"
            class="input-tactile-gopay tabular-nums"
          />
          <span class="text-[11px] text-neutral-500 mt-1 block">Hari terakhir tiap bulan</span>
        </div>

        <div>
          <label class="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1.5">
            Batas Waktu Validasi Konsultan
          </label>
          <input
            v-model.number="cycleForm.validationWindowDays"
            type="number"
            min="1"
            max="14"
            class="input-tactile-gopay tabular-nums"
          />
          <span class="text-[11px] text-neutral-500 mt-1 block">Hari kerja setelah entri</span>
        </div>
      </div>
    </div>

    <!-- ========================================================================= -->
    <!-- 5. BOTTOM ACTION BAR                                                      -->
    <!-- ========================================================================= -->
    <div class="gsap-settings-footer flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-neutral-200 dark:border-neutral-800">
      <p class="text-xs text-neutral-500 dark:text-neutral-400">
        Perubahan parameter tata kelola langsung diterapkan di seluruh ekosistem platform.
      </p>

      <div class="flex items-center gap-3 w-full sm:w-auto [&>*]:w-full sm:[&>*]:w-auto">
        <BActionButton
          variant="green"
          :huge-icon="CheckmarkCircle01Icon"
          custom-class="justify-center"
          @click="handleSave"
        >
          {{ isSaving ? 'Menyimpan...' : 'Simpan' }}
        </BActionButton>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, onUnmounted, nextTick } from 'vue'
import gsap from 'gsap'
import ThemeMockupSelector from '~/components/settings/ThemeMockupSelector.vue'
import BActionButton from '~/components/base/BActionButton.vue'
import { HugeiconsIcon } from '@hugeicons/vue'
import {
  Settings01Icon,
  CheckmarkCircle01Icon,
  Award01Icon,
  Calendar03Icon,
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
    gsap.from('.gsap-settings-header', {
      opacity: 0,
      y: -14,
      duration: 0.45,
      ease: 'power2.out'
    })
    gsap.from('.gsap-settings-theme', {
      opacity: 0,
      y: 18,
      duration: 0.52,
      ease: 'power3.out',
      delay: 0.12
    })
    gsap.from('.gsap-setting-card', {
      opacity: 0,
      y: 22,
      duration: 0.5,
      stagger: 0.08,
      ease: 'power3.out',
      delay: 0.18
    })
    gsap.from('.gsap-settings-footer', {
      opacity: 0,
      y: 16,
      duration: 0.45,
      ease: 'power2.out',
      delay: 0.45
    })
  })
})

onUnmounted(() => {
  if (gsapCtx) {
    gsapCtx.revert()
    gsapCtx = null
  }
})

const saved = ref(false)
const isSaving = ref(false)

const certForm = reactive({
  minCompositeScore: 75,
  minGuidanceMonths: 3,
  requireBankStatements: true
})

const cycleForm = reactive({
  openDay: 25,
  closeDay: 30,
  validationWindowDays: 5
})

function handleSave() {
  isSaving.value = true
  setTimeout(() => {
    isSaving.value = false
    saved.value = true
    setTimeout(() => {
      saved.value = false
    }, 3500)
  }, 600)
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
</style>
