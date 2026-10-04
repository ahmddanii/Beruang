<template>
  <div>
    <BCard padding="lg" class="border border-border-light dark:border-border-dark text-center">
      <div class="mb-6">
        <div class="w-12 h-12 rounded-2xl bg-primary-50 dark:bg-primary-950 text-primary-600 flex items-center justify-center mx-auto mb-3">
          <HugeiconsIcon :icon="ShieldCheckIcon" :size="24" :stroke-width="1.75" />
        </div>
        <h2 class="font-heading font-bold text-2xl text-neutral-900 dark:text-white tracking-tight">
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
          class="w-12 h-14 text-center font-heading font-extrabold text-2xl rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 focus:outline-none tabular-nums"
          :value="otp[i - 1]"
          @input="onOtpInput($event, i - 1)"
        />
      </div>

      <NuxtLink to="/onboarding">
        <BButton variant="primary" block size="md" class="flex items-center justify-center gap-1.5">
          <span>Verifikasi & Lanjutkan</span>
          <HugeiconsIcon :icon="ArrowRight02Icon" :size="15" :stroke-width="2" />
        </BButton>
      </NuxtLink>

      <p class="text-xs text-neutral-500 mt-4">
        Belum menerima kode verifikasi?
        <button type="button" class="text-primary-600 font-semibold hover:underline ml-1">
          Kirim Ulang (30s)
        </button>
      </p>
    </BCard>
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
