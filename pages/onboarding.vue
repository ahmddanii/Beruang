<template>
  <div class="min-h-screen bg-neutral-50 dark:bg-neutral-950 p-4 sm:p-8 font-sans">
    <div class="max-w-2xl mx-auto space-y-8">
      <!-- Top Brand Header -->
      <div class="flex items-center justify-between">
        <NuxtLink to="/" class="flex items-center gap-2.5">
          <img src="/logo/logoSmall.svg" alt="Beruang Logo" class="h-8 w-auto object-contain" />
          <span class="font-heading font-extrabold text-xl tracking-tight leading-none select-none">
            <span class="text-[#2091AA] dark:text-[#50AABF]">Ber</span><span class="text-[#00AA13] dark:text-[#00C058]">uang</span>
          </span>
        </NuxtLink>
        <span class="text-xs text-neutral-500 font-medium tabular-nums">
          Langkah {{ currentStep }} dari 4
        </span>
      </div>

      <!-- Stepper Component -->
      <BStepper :steps="steps" :current-step="currentStep" />

      <!-- Main Form Container -->
      <BCard padding="lg" class="border border-[#E4E7EC] dark:border-[#2B2B31] shadow-none">
        <!-- Step 1: Identitas Usaha -->
        <div v-if="currentStep === 1" class="space-y-4">
          <div class="flex items-center gap-3 mb-2">
            <div class="w-10 h-10 rounded-xl bg-primary-50 dark:bg-primary-950 text-primary-600 flex items-center justify-center shrink-0">
              <HugeiconsIcon :icon="Building01Icon" :size="20" :stroke-width="1.75" />
            </div>
            <div>
              <h3 class="font-heading font-bold text-lg text-neutral-900 dark:text-neutral-50">
                1. Kenalkan Usahamu
              </h3>
              <p class="text-xs text-neutral-500">
                Ceritakan identitas dasar bisnis agar konsultan dapat memetakan potensi usahamu.
              </p>
            </div>
          </div>

          <div>
            <label class="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1 font-heading">
              Nama Brand / Usaha
            </label>
            <input
              v-model="form.name"
              type="text"
              required
              placeholder="contoh: Kopi Senja Nusantara"
              class="w-full px-4 py-2.5 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-sm focus:ring-2 focus:ring-primary-500 focus:outline-none"
            />
          </div>

          <div>
            <label class="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1 font-heading">
              Nama Pemilik / Founder
            </label>
            <input
              v-model="form.owner"
              type="text"
              required
              placeholder="contoh: Budi Setiawan"
              class="w-full px-4 py-2.5 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-sm focus:ring-2 focus:ring-primary-500 focus:outline-none"
            />
          </div>

          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1 font-heading">
                Tahun Berdiri
              </label>
              <input
                v-model.number="form.year"
                type="number"
                min="2000"
                max="2026"
                class="w-full px-4 py-2.5 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-sm focus:ring-2 focus:ring-primary-500 focus:outline-none tabular-nums"
              />
            </div>
            <div>
              <label class="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1 font-heading">
                Status Izin Usaha
              </label>
              <select
                v-model="form.legalStatus"
                class="w-full px-4 py-2.5 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-sm focus:ring-2 focus:ring-primary-500 focus:outline-none"
              >
                <option value="NIB_READY">Sudah Memiliki NIB (OSS)</option>
                <option value="HALAL_READY">NIB + Sertifikasi Halal</option>
                <option value="IN_PROGRESS">Sedang Pengurusan</option>
                <option value="NONE">Belum Ada (Perlu Bantuan)</option>
              </select>
            </div>
          </div>
        </div>

        <!-- Step 2: Sektor & Lokasi/Outlet -->
        <div v-else-if="currentStep === 2" class="space-y-4">
          <div class="flex items-center gap-3 mb-2">
            <div class="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-950 text-amber-600 flex items-center justify-center shrink-0">
              <HugeiconsIcon :icon="Store01Icon" :size="20" :stroke-width="1.75" />
            </div>
            <div>
              <h3 class="font-heading font-bold text-lg text-neutral-900 dark:text-neutral-50">
                2. Sektor & Skala Usaha
              </h3>
              <p class="text-xs text-neutral-500">
                Data sebaran gerai dan bidang usaha untuk menyelaraskan kurasi pasar.
              </p>
            </div>
          </div>

          <div>
            <label class="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1.5 font-heading">
              Sektor Bisnis
            </label>
            <div class="grid grid-cols-2 sm:grid-cols-3 gap-2">
              <button
                v-for="s in sectors"
                :key="s"
                type="button"
                :class="[
                  'p-2.5 rounded-xl text-xs font-heading font-semibold border transition-all text-center',
                  form.sector === s
                    ? 'border-primary-500 bg-primary-50 text-primary-700 dark:bg-primary-950 dark:text-primary-300'
                    : 'border-neutral-200 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 hover:border-neutral-300'
                ]"
                @click="form.sector = s"
              >
                {{ s }}
              </button>
            </div>
          </div>

          <div>
            <label class="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1 font-heading">
              Kota / Kabupaten Operasional
            </label>
            <input
              v-model="form.city"
              type="text"
              placeholder="contoh: Bandung, Jawa Barat"
              class="w-full px-4 py-2.5 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-sm focus:ring-2 focus:ring-primary-500 focus:outline-none"
            />
          </div>

          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1 font-heading">
                Jumlah Outlet / Cabang
              </label>
              <input
                v-model.number="form.outlets"
                type="number"
                min="1"
                class="w-full px-4 py-2.5 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-sm focus:ring-2 focus:ring-primary-500 focus:outline-none tabular-nums"
              />
            </div>
            <div>
              <label class="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1 font-heading">
                Jumlah Karyawan
              </label>
              <input
                v-model.number="form.employees"
                type="number"
                min="1"
                class="w-full px-4 py-2.5 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-sm focus:ring-2 focus:ring-primary-500 focus:outline-none tabular-nums"
              />
            </div>
          </div>
        </div>

        <!-- Step 3: Baseline Finansial -->
        <div v-else-if="currentStep === 3" class="space-y-4">
          <div class="flex items-center gap-3 mb-2">
            <div class="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950 text-emerald-600 flex items-center justify-center shrink-0">
              <HugeiconsIcon :icon="Coins01Icon" :size="20" :stroke-width="1.75" />
            </div>
            <div>
              <h3 class="font-heading font-bold text-lg text-neutral-900 dark:text-neutral-50">
                3. Baseline Finansial Awal
              </h3>
              <p class="text-xs text-neutral-500">
                Estimasi kasar kinerja saat ini. Data ini dirahasiakan dan hanya untuk evaluasi konsultan pendamping.
              </p>
            </div>
          </div>

          <div>
            <label class="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1 font-heading">
              Rata-rata Pendapatan Penjualan Bulanan (Rp)
            </label>
            <input
              v-model.number="form.monthlyRevenue"
              type="number"
              step="1000000"
              placeholder="contoh: 50000000"
              class="w-full px-4 py-2.5 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-sm focus:ring-2 focus:ring-primary-500 focus:outline-none tabular-nums"
            />
            <span class="text-[11px] text-neutral-500 mt-1 block tabular-nums">
              Format: Rp {{ (form.monthlyRevenue || 0).toLocaleString('id-ID') }}
            </span>
          </div>

          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1 font-heading">
                Estimasi Modal Jualan (% dari Pendapatan)
              </label>
              <input
                v-model.number="form.hppPercentage"
                type="number"
                min="10"
                max="90"
                placeholder="40"
                class="w-full px-4 py-2.5 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-sm focus:ring-2 focus:ring-primary-500 focus:outline-none tabular-nums"
              />
            </div>
            <div>
              <label class="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1 font-heading">
                Target Pendanaan (Rp)
              </label>
              <input
                v-model.number="form.targetFunding"
                type="number"
                step="5000000"
                placeholder="150000000"
                class="w-full px-4 py-2.5 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-sm focus:ring-2 focus:ring-primary-500 focus:outline-none tabular-nums"
              />
            </div>
          </div>
        </div>

        <!-- Step 4: Ringkasan & Konfirmasi -->
        <div v-else class="space-y-5">
          <div class="text-center mb-4">
            <div class="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-950 text-emerald-600 flex items-center justify-center mx-auto mb-3">
              <HugeiconsIcon :icon="CheckmarkBadge01Icon" :size="28" :stroke-width="1.75" />
            </div>
            <h3 class="font-heading font-extrabold text-xl text-neutral-900 dark:text-neutral-50">
              Profil Usahamu Siap Dikaji
            </h3>
            <p class="text-xs text-neutral-600 dark:text-neutral-400 max-w-md mx-auto mt-1">
              Konsultan pendampingmu akan menyusun Action Plan prioritas dan menyiapkan penilaian 5 aspek fundamental bisnismu.
            </p>
          </div>

          <div class="p-4 rounded-xl bg-neutral-50 dark:bg-neutral-800/80 border border-neutral-200 dark:border-neutral-700 text-xs space-y-2.5">
            <div class="flex justify-between border-b border-neutral-200/60 dark:border-neutral-700/60 pb-2">
              <span class="text-neutral-500 font-medium">Nama Usaha:</span>
              <span class="font-heading font-bold text-neutral-900 dark:text-white">{{ form.name }}</span>
            </div>
            <div class="flex justify-between border-b border-neutral-200/60 dark:border-neutral-700/60 pb-2">
              <span class="text-neutral-500 font-medium">Sektor & Kota:</span>
              <span class="font-semibold">{{ form.sector }} • {{ form.city }}</span>
            </div>
            <div class="flex justify-between border-b border-neutral-200/60 dark:border-neutral-700/60 pb-2">
              <span class="text-neutral-500 font-medium">Skala Gerai:</span>
              <span class="font-semibold">{{ form.outlets }} Outlet • {{ form.employees }} Karyawan</span>
            </div>
            <div class="flex justify-between border-b border-neutral-200/60 dark:border-neutral-700/60 pb-2">
              <span class="text-neutral-500 font-medium">Pendapatan Bulanan:</span>
              <span class="font-semibold tabular-nums">Rp {{ form.monthlyRevenue.toLocaleString('id-ID') }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-neutral-500 font-medium">Target Pendanaan:</span>
              <span class="font-bold text-primary-600 tabular-nums font-heading">
                Rp {{ form.targetFunding.toLocaleString('id-ID') }}
              </span>
            </div>
          </div>
        </div>

        <!-- Step Navigation Buttons -->
        <div class="mt-8 pt-5 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-between">
          <BButton
            v-if="currentStep > 1"
            type="button"
            variant="secondary"
            size="md"
            class="flex items-center gap-1.5"
            @click="currentStep--"
          >
            <HugeiconsIcon :icon="ArrowLeft02Icon" :size="15" :stroke-width="2" />
            <span>Kembali</span>
          </BButton>
          <div v-else />

          <BButton
            v-if="currentStep < 4"
            type="button"
            variant="primary"
            size="md"
            class="flex items-center gap-1.5"
            @click="currentStep++"
          >
            <span>Langkah Selanjutnya</span>
            <HugeiconsIcon :icon="ArrowRight02Icon" :size="15" :stroke-width="2" />
          </BButton>

          <BButton
            v-else
            type="button"
            variant="primary"
            size="lg"
            :loading="submitting"
            class="flex items-center gap-2"
            @click="finishOnboarding"
          >
            <span>Masuk ke Dashboard Saya</span>
            <HugeiconsIcon :icon="ArrowRight02Icon" :size="16" :stroke-width="2" />
          </BButton>
        </div>
      </BCard>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUmkmStore } from '~/stores/umkm'
import BCard from '~/components/base/BCard.vue'
import BButton from '~/components/base/BButton.vue'
import BStepper from '~/components/base/BStepper.vue'
import { HugeiconsIcon } from '@hugeicons/vue'
import {
  Building01Icon,
  Store01Icon,
  Coins01Icon,
  CheckmarkBadge01Icon,
  ArrowLeft02Icon,
  ArrowRight02Icon
} from '@hugeicons/core-free-icons'

const router = useRouter()
const umkmStore = useUmkmStore()

const currentStep = ref(1)
const submitting = ref(false)

const steps = [
  { title: 'Identitas Usaha' },
  { title: 'Sektor & Outlet' },
  { title: 'Baseline Finansial' },
  { title: 'Konfirmasi' }
]

const sectors = [
  'Kuliner (F&B)',
  'Fashion & Kriya',
  'Jasa & Katering',
  'Agroindustri',
  'Ritel & Toko',
  'Teknologi / Jasa'
]

const form = ref({
  name: 'Kopi Senja Nusantara',
  owner: 'Budi Setiawan',
  year: 2021,
  legalStatus: 'NIB_READY',
  sector: 'Kuliner (F&B)',
  city: 'Bandung, Jawa Barat',
  outlets: 3,
  employees: 14,
  monthlyRevenue: 60000000,
  hppPercentage: 42,
  targetFunding: 250000000
})

function finishOnboarding() {
  submitting.value = true
  setTimeout(() => {
    umkmStore.profile.name = form.value.name
    umkmStore.profile.ownerName = form.value.owner
    umkmStore.profile.sector = form.value.sector
    umkmStore.profile.city = form.value.city
    umkmStore.profile.outletsCount = form.value.outlets
    umkmStore.profile.employeesCount = form.value.employees
    umkmStore.profile.fundingTarget = form.value.targetFunding
    submitting.value = false
    router.push('/dashboard')
  }, 500)
}
</script>
