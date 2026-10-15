<template>
  <div>
    <div class="bg-white/95 dark:bg-[#13161F]/95 backdrop-blur-md rounded-3xl border border-[#E2E8F0] dark:border-white/10 p-6 sm:p-8 text-center shadow-sm">
      <div class="mb-6">
        <div class="w-12 h-12 rounded-2xl bg-[#0081A0]/10 dark:bg-[#0081A0]/20 text-[#0081A0] dark:text-[#2091AA] flex items-center justify-center mx-auto mb-3">
          <HugeiconsIcon :icon="ShieldCheckIcon" :size="24" :stroke-width="1.75" />
        </div>
        <h2 class="font-bold text-2xl text-neutral-900 dark:text-white tracking-tight">
          Verifikasi Akun Anda
        </h2>
        <p class="text-xs text-neutral-500 dark:text-neutral-400 mt-1 max-w-xs mx-auto">
          Masukkan 4 digit kode OTP yang kami kirimkan ke nomor WhatsApp atau email terdaftar.
        </p>
      </div>

      <div class="flex justify-center gap-3 my-6">
        <input
          v-for="i in 4"
          :key="i"
          type="text"
          maxlength="1"
          class="w-12 h-14 text-center font-extrabold text-2xl rounded-2xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-[#1A1D26] focus:border-[#0081A0] focus:ring-4 focus:ring-[#0081A0]/15 focus:outline-none tabular-nums text-neutral-900 dark:text-white"
          :value="otp[i - 1]"
          @input="onOtpInput($event, i - 1)"
        />
      </div>

      <NuxtLink to="/onboarding" class="block">
        <button
          type="button"
          class="w-full py-3 px-6 rounded-full font-bold text-sm bg-[#0081A0] hover:bg-[#00708C] text-white shadow-[0_4px_14px_rgba(0,129,160,0.25)] flex items-center justify-center gap-1.5 transition-all active:scale-[0.99] cursor-pointer"
        >
          <span>Verifikasi & Lanjutkan</span>
          <HugeiconsIcon :icon="ArrowRight02Icon" :size="16" :stroke-width="2" />
        </button>
      </NuxtLink>

      <p class="text-xs text-neutral-500 mt-4">
        Belum menerima kode verifikasi?
        <button type="button" class="text-[#0081A0] hover:text-[#00708C] font-semibold hover:underline ml-1 cursor-pointer">
          Kirim Ulang (30s)
        </button>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import BCard from '~/components/base/BCard.vue'
import BButton from '~/components/base/BButton.vue'
import { HugeiconsIcon } from '@hugeicons/vue'
import {
  ShieldCheckIcon,
  ArrowRight02Icon
} from '@hugeicons/core-free-icons'

definePageMeta({
  layout: 'auth'
})

const otp = ref(['8', '4', '2', '9'])

function onOtpInput(e: Event, idx: number) {
  const target = e.target as HTMLInputElement
  otp.value[idx] = target.value
}
</script>
