<template>
  <div>
    <BCard padding="lg" class="border border-border-light dark:border-border-dark">
      <div class="text-center mb-6">
        <div class="w-12 h-12 rounded-2xl bg-primary-50 dark:bg-primary-950 text-primary-600 flex items-center justify-center mx-auto mb-3">
          <HugeiconsIcon :icon="LockKeyIcon" :size="24" :stroke-width="1.75" />
        </div>
        <h2 class=" font-bold text-2xl text-neutral-900 dark:text-white tracking-tight">
          Lupa Kata Sandi?
        </h2>
        <p class="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
          Masukkan alamat email terdaftar Anda. Kami akan mengirimkan tautan pemulihan sandi yang aman.
        </p>
      </div>

      <div v-if="sent" class="space-y-4">
        <BAlert
          variant="success"
          title="Tautan Pemulihan Terkirim"
          message="Silakan periksa kotak masuk atau folder spam email Anda untuk instruksi pengaturan ulang kata sandi."
        />
        <NuxtLink to="/masuk">
          <BButton variant="primary" block size="md" class="flex items-center justify-center gap-1.5">
            <HugeiconsIcon :icon="ArrowLeft02Icon" :size="15" :stroke-width="2" />
            <span>Kembali ke Halaman Masuk</span>
          </BButton>
        </NuxtLink>
      </div>

      <form v-else @submit.prevent="handleSubmit" class="space-y-4">
        <div>
          <label class="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1.5 ">
            Alamat Email Akun
          </label>
          <input
            v-model="email"
            type="email"
            required
            placeholder="budi@kopisenja.id"
            class="w-full px-4 py-2.5 rounded-xl border border-border-light dark:border-border-dark bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 placeholder-neutral-400 text-sm focus:ring-1 focus:ring-primary-500 focus:outline-none transition-colors"
          />
        </div>

        <BButton
          type="submit"
          variant="primary"
          block
          size="md"
          :loading="loading"
        >
          Kirim Tautan Pemulihan
        </BButton>

        <div class="text-center pt-2">
          <NuxtLink to="/masuk" class="text-xs text-neutral-500 hover:text-primary-600 transition-colors inline-flex items-center gap-1">
            <HugeiconsIcon :icon="ArrowLeft02Icon" :size="13" :stroke-width="2" />
            <span>Batal dan kembali</span>
          </NuxtLink>
        </div>
      </form>
    </BCard>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import BCard from '~/components/base/BCard.vue'
import BButton from '~/components/base/BButton.vue'
import BAlert from '~/components/base/BAlert.vue'
import { HugeiconsIcon } from '@hugeicons/vue'
import {
  LockKeyIcon,
  ArrowLeft02Icon
} from '@hugeicons/core-free-icons'

definePageMeta({
  layout: 'auth'
})

const email = ref('')
const loading = ref(false)
const sent = ref(false)

function handleSubmit() {
  loading.value = true
  setTimeout(() => {
    loading.value = false
    sent.value = true
  }, 400)
}
</script>
