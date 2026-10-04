<template>
  <div>
    <BCard padding="lg" class="border border-border-light dark:border-border-dark">
      <div class="text-center mb-6">
        <SiBeru state="greeting" size="sm" class="w-16 h-16 mx-auto mb-2" />
        <h2 class=" font-bold text-2xl text-neutral-900 dark:text-white tracking-tight">
          Mulai Perjalanan Bisnismu
        </h2>
        <p class="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
          Daftarkan akun dan pilih peran Anda dalam ekosistem Beruang.
        </p>
      </div>

      <!-- Role Selection Cards -->
      <div class="mb-5">
        <label class="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-2 ">
          Pilih Peran Akun
        </label>
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
          <div
            v-for="r in roleCards"
            :key="r.key"
            :class="[
              'p-3.5 rounded-xl border cursor-pointer transition-all flex flex-col items-center text-center select-none',
              form.role === r.key
                ? 'border-primary-500 bg-primary-50/40 dark:bg-primary-950/30 text-primary-600'
                : 'border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark hover:border-neutral-400'
            ]"
            @click="form.role = r.key"
          >
            <div class="mb-2 text-neutral-500" :class="{ 'text-primary-600': form.role === r.key }">
              <HugeiconsIcon :icon="r.icon" :size="22" :stroke-width="1.75" />
            </div>
            <span class=" font-bold text-xs text-neutral-900 dark:text-neutral-100">{{ r.title }}</span>
            <span class="text-[10px] text-neutral-500 dark:text-neutral-400 mt-1 leading-tight">{{ r.desc }}</span>
          </div>
        </div>
      </div>

      <form @submit.prevent="handleRegister" class="space-y-3.5">
        <div>
          <label class="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1 ">
            Nama Lengkap
          </label>
          <input
            v-model="form.name"
            type="text"
            required
            placeholder="Contoh: Budi Santoso"
            class="w-full px-4 py-2.5 rounded-xl border border-border-light dark:border-border-dark bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 placeholder-neutral-400 text-sm focus:ring-1 focus:ring-primary-500 focus:outline-none transition-colors"
          />
        </div>

        <div>
          <label class="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1 ">
            {{ form.role === 'UMKM' ? 'Nama Usaha / Brand' : form.role === 'CONSULTANT' ? 'Bidang / Lembaga Konsultasi' : 'Nama Perusahaan / Sindikasi' }}
          </label>
          <input
            v-model="form.orgName"
            type="text"
            required
            :placeholder="form.role === 'UMKM' ? 'Contoh: Kopi Senja Nusantara' : form.role === 'CONSULTANT' ? 'Contoh: Akuntansi & Manajemen Bisnis' : 'Contoh: Nusantara Angel Syndicate'"
            class="w-full px-4 py-2.5 rounded-xl border border-border-light dark:border-border-dark bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 placeholder-neutral-400 text-sm focus:ring-1 focus:ring-primary-500 focus:outline-none transition-colors"
          />
        </div>

        <div>
          <label class="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1 ">
            Alamat Email
          </label>
          <input
            v-model="form.email"
            type="email"
            required
            placeholder="nama@email.com"
            class="w-full px-4 py-2.5 rounded-xl border border-border-light dark:border-border-dark bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 placeholder-neutral-400 text-sm focus:ring-1 focus:ring-primary-500 focus:outline-none transition-colors"
          />
        </div>

        <div>
          <label class="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1 ">
            Nomor WhatsApp
          </label>
          <input
            v-model="form.phone"
            type="tel"
            required
            placeholder="08123456789"
            class="w-full px-4 py-2.5 rounded-xl border border-border-light dark:border-border-dark bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 placeholder-neutral-400 text-sm focus:ring-1 focus:ring-primary-500 focus:outline-none transition-colors"
          />
        </div>

        <div>
          <label class="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1 ">
            Kata Sandi
          </label>
          <input
            v-model="form.password"
            type="password"
            required
            minlength="8"
            placeholder="Minimal 8 karakter"
            class="w-full px-4 py-2.5 rounded-xl border border-border-light dark:border-border-dark bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 placeholder-neutral-400 text-sm focus:ring-1 focus:ring-primary-500 focus:outline-none transition-colors"
          />
        </div>

        <div class="pt-2">
          <BButton
            type="submit"
            variant="primary"
            block
            size="md"
            :loading="loading"
          >
            Lanjutkan Pendaftaran
          </BButton>
        </div>
      </form>

      <div class="mt-6 pt-5 border-t border-border-light dark:border-border-dark text-center text-xs text-neutral-600 dark:text-neutral-400">
        Sudah memiliki akun Beruang?
        <NuxtLink to="/masuk" class="text-primary-600 dark:text-primary-400 font-semibold hover:underline  ml-1">
          Masuk di Sini
        </NuxtLink>
      </div>
    </BCard>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore, type UserRole } from '~/stores/auth'
import BCard from '~/components/base/BCard.vue'
import BButton from '~/components/base/BButton.vue'
import SiBeru from '~/components/mascot/SiBeru.vue'
import { HugeiconsIcon } from '@hugeicons/vue'
import {
  Store01Icon,
  UserGroupIcon,
  Coins01Icon
} from '@hugeicons/core-free-icons'

definePageMeta({
  layout: 'auth'
})

const router = useRouter()
const authStore = useAuthStore()

const roleCards = [
  { key: 'UMKM' as UserRole, title: 'Pemilik UMKM', desc: 'Dibina & siap didanai', icon: Store01Icon },
  { key: 'CONSULTANT' as UserRole, title: 'Konsultan', desc: 'Dampingi & kurasi bisnis', icon: UserGroupIcon },
  { key: 'INVESTOR' as UserRole, title: 'Investor', desc: 'Cari deal bisnis sehat', icon: Coins01Icon }
]

const form = ref({
  role: 'UMKM' as UserRole,
  name: '',
  orgName: '',
  email: '',
  phone: '',
  password: ''
})

const loading = ref(false)

function handleRegister() {
  loading.value = true
  setTimeout(() => {
    authStore.login(form.value.email || 'user@beruang.id', form.value.role)
    if (authStore.currentUser) {
      authStore.currentUser.name = form.value.name || 'Pengguna Baru'
      authStore.currentUser.businessName = form.value.orgName || 'Usaha Baru'
    }
    loading.value = false

    if (form.value.role === 'UMKM') {
      router.push('/onboarding')
    } else if (form.value.role === 'CONSULTANT') {
      router.push('/konsultan')
    } else {
      router.push('/investor')
    }
  }, 400)
}
</script>
