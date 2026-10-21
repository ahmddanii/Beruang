<template>
  <div class="space-y-6 pb-20 max-w-2xl mx-auto font-sans">
    <!-- Tombol Kembali -->
    <div>
      <NuxtLink
        :to="`/investor/umkm/${umkmId}`"
        class="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-neutral-500 hover:text-primary-600 transition-colors mb-3"
      >
        <HugeiconsIcon :icon="ArrowLeft02Icon" :size="16" :stroke-width="2" />
        <span>Kembali ke Profil Usaha</span>
      </NuxtLink>

      <div class="space-y-1">
        <h1 class="text-2xl sm:text-3xl font-heading font-extrabold text-neutral-900 dark:text-white tracking-tight">
          Minta Izin Buka Laporan Keuangan
        </h1>
        <p class="text-xs sm:text-sm text-neutral-500">
          Kirim permohonan ke pemilik <strong>{{ item.name }}</strong> agar Bapak dapat membaca rekening bank dan buku kas asli.
        </p>
      </div>
    </div>

    <!-- Pemberitahuan Berhasil -->
    <div
      v-if="submitted"
      class="p-6 rounded-3xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200 space-y-4"
    >
      <div class="flex items-center gap-3">
        <div class="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold">
          <HugeiconsIcon :icon="CheckmarkCircle01Icon" :size="20" :stroke-width="2" />
        </div>
        <div>
          <h3 class="font-heading font-bold text-base text-emerald-900 dark:text-white">
            Permohonan Berhasil Dikirimkan
          </h3>
          <p class="text-xs sm:text-sm text-emerald-700 dark:text-emerald-300 mt-0.5">
            Pemilik usaha {{ item.name }} sudah menerima permohonan Bapak. Kami akan mengabari Bapak segera setelah izin disetujui.
          </p>
        </div>
      </div>

      <div class="flex items-center gap-2 pt-1">
        <NuxtLink :to="`/investor/umkm/${umkmId}`">
          <BButton variant="primary" size="md">Kembali ke Profil</BButton>
        </NuxtLink>
        <NuxtLink to="/investor">
          <BButton variant="secondary" size="md">Katalog Usaha</BButton>
        </NuxtLink>
      </div>
    </div>

    <!-- Formulir Permintaan Ringkas & Mudah Dipahami -->
    <div
      v-else
      class="bg-white dark:bg-[#141519] rounded-3xl border border-neutral-200 dark:border-neutral-800 p-6 sm:p-8 shadow-xs space-y-6"
    >
      <!-- Target Usaha -->
      <div class="p-4 rounded-2xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 flex items-center justify-between gap-4">
        <div>
          <h3 class="font-heading font-bold text-base text-neutral-900 dark:text-white">
            {{ item.name }}
          </h3>
          <span class="text-xs text-neutral-500">{{ item.sector }} • Kota {{ item.city }}</span>
        </div>
        <div class="text-right text-xs">
          <span class="text-neutral-400 block font-medium">Modal yang Dibutuhkan:</span>
          <strong class="text-primary-600 dark:text-primary-400 font-extrabold text-sm sm:text-base tabular-nums">
            Rp {{ (item.fundingTarget / 1000000).toLocaleString('id-ID') }} Jt
          </strong>
        </div>
      </div>

      <form @submit.prevent="submitRequest" class="space-y-6">
        <!-- Pertanyaan 1: Besaran Modal -->
        <div class="space-y-2">
          <div class="flex items-center justify-between">
            <label class="block text-xs sm:text-sm font-heading font-bold text-neutral-900 dark:text-white">
              1. Berapa modal yang ingin Bapak tanamkan?
            </label>
            <span class="text-xs text-neutral-500 tabular-nums">
              Porsi: <strong class="text-primary-600">{{ ticketSharePercentage }}%</strong> dari total
            </span>
          </div>

          <!-- Pilihan Cepat -->
          <div class="grid grid-cols-2 sm:grid-cols-4 gap-2">
            <button
              v-for="preset in ticketPresets"
              :key="preset.value"
              type="button"
              :class="[
                'py-2 px-3 rounded-xl text-xs font-bold transition-all border cursor-pointer text-center',
                ticketSize === preset.value
                  ? 'bg-primary-600 text-white border-primary-700 shadow-xs'
                  : 'bg-neutral-50 dark:bg-neutral-900 border-neutral-200 dark:border-neutral-700 text-neutral-800 dark:text-neutral-200 hover:border-neutral-300'
              ]"
              @click="ticketSize = preset.value"
            >
              {{ preset.label }}
            </button>
          </div>

          <!-- Input Manual -->
          <div class="relative">
            <span class="absolute inset-y-0 left-0 pl-3.5 flex items-center text-xs font-bold text-neutral-400">
              Rp
            </span>
            <input
              v-model.number="ticketSize"
              type="number"
              required
              min="10000000"
              step="5000000"
              class="w-full pl-10 pr-4 py-2.5 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-900 text-neutral-900 dark:text-white text-sm font-bold focus:ring-2 focus:ring-primary-500 focus:outline-none tabular-nums"
            />
          </div>
        </div>

        <!-- Pertanyaan 2: Skema Kerja Sama -->
        <div class="space-y-2">
          <label class="block text-xs sm:text-sm font-heading font-bold text-neutral-900 dark:text-white">
            2. Pilihan Cara Kerja Sama
          </label>

          <div class="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            <div
              v-for="s in schemeOptions"
              :key="s.value"
              :class="[
                'p-3.5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between space-y-1.5',
                scheme === s.value
                  ? 'bg-primary-50/80 dark:bg-primary-950/60 border-primary-600 shadow-xs ring-1 ring-primary-600'
                  : 'bg-neutral-50 dark:bg-neutral-900 border-neutral-200 dark:border-neutral-700 hover:border-neutral-300'
              ]"
              @click="scheme = s.value"
            >
              <div>
                <span class="text-[10px] font-bold px-1.5 py-0.5 rounded bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-neutral-600 dark:text-neutral-300 inline-block mb-1">
                  {{ s.tag }}
                </span>
                <h4 class="font-heading font-bold text-xs sm:text-sm text-neutral-900 dark:text-white">
                  {{ s.title }}
                </h4>
              </div>
              <p class="text-[11px] text-neutral-500 leading-snug">
                {{ s.description }}
              </p>
            </div>
          </div>
        </div>

        <!-- Pertanyaan 3: Pesan Singkat -->
        <div class="space-y-2">
          <label class="block text-xs sm:text-sm font-heading font-bold text-neutral-900 dark:text-white">
            3. Pesan Singkat untuk Pemilik Usaha
          </label>

          <textarea
            v-model="message"
            rows="3"
            required
            placeholder="Tuliskan sapaan singkat atau rencana kerja sama Bapak..."
            class="w-full px-3.5 py-2.5 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-900 text-neutral-900 dark:text-white text-xs sm:text-sm leading-relaxed focus:ring-2 focus:ring-primary-500 focus:outline-none"
          />
        </div>

        <!-- Janji Kerahasiaan (Bahasa Sederhana) -->
        <div class="p-3.5 rounded-2xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 space-y-1.5">
          <label class="flex items-center gap-2.5 cursor-pointer select-none">
            <input
              v-model="ndaAgreed"
              type="checkbox"
              required
              class="w-4 h-4 rounded text-primary-600 focus:ring-primary-500 accent-primary-600 cursor-pointer shrink-0"
            />
            <span class="text-xs text-neutral-700 dark:text-neutral-300 font-medium">
              Saya berjanji menjaga kerahasiaan pembukuan dan mutasi bank usaha ini.
            </span>
          </label>

          <button
            type="button"
            class="text-xs text-primary-600 hover:underline font-bold inline-flex items-center gap-1 cursor-pointer pl-6.5"
            @click="showNdaModal = true"
          >
            <span>Baca 3 Janji Kerahasiaan Sederhana</span>
            <HugeiconsIcon :icon="ArrowRight02Icon" :size="12" :stroke-width="2" />
          </button>
        </div>

        <!-- Tombol Aksi Bawah -->
        <div class="pt-3 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-between">
          <NuxtLink :to="`/investor/umkm/${umkmId}`">
            <BButton variant="ghost" size="md">Batal</BButton>
          </NuxtLink>

          <BButton
            type="submit"
            variant="primary"
            size="md"
            :disabled="!ndaAgreed"
            :loading="loading"
            class="flex items-center gap-2"
          >
            <span>Kirim Permohonan ke Pemilik Usaha</span>
            <HugeiconsIcon :icon="ArrowRight02Icon" :size="15" :stroke-width="2" />
          </BButton>
        </div>
      </form>
    </div>

    <!-- MODAL PENJELASAN JANJI KERAHASIAAN (BAHASA AWAM) -->
    <BModal
      v-model="showNdaModal"
      title="Janji Menjaga Kerahasiaan Data Toko"
      size="sm"
    >
      <div class="space-y-2.5 text-xs text-neutral-700 dark:text-neutral-300 leading-relaxed">
        <div class="p-2.5 rounded-xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700">
          <strong>1. Hanya untuk Menilai Usaha:</strong> Data rekening bank dan pembukuan hanya digunakan oleh Bapak untuk menilai apakah usaha ini cocok diberi modal.
        </div>
        <div class="p-2.5 rounded-xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700">
          <strong>2. Dilarang Menyebarluaskan:</strong> Tidak boleh memotret, memfotokopi, atau mengirim berkas keuangan ini kepada orang luar demi kenyamanan bersama.
        </div>
        <div class="p-2.5 rounded-xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700">
          <strong>3. Dilindungi Cap Tanda Air:</strong> Setiap berkas yang Bapak buka akan otomatis dicap nama dan email Bapak agar aman dari penyalahgunaan.
        </div>
      </div>

      <template #footer>
        <div class="flex justify-end">
          <BButton variant="primary" size="sm" @click="showNdaModal = false">
            Saya Mengerti & Setuju
          </BButton>
        </div>
      </template>
    </BModal>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useInvestorStore } from '~/stores/investor'
import BButton from '~/components/base/BButton.vue'
import BModal from '~/components/base/BModal.vue'
import { HugeiconsIcon } from '@hugeicons/vue'
import {
  ArrowLeft02Icon,
  ArrowRight02Icon,
  CheckmarkCircle01Icon
} from '@hugeicons/core-free-icons'

definePageMeta({
  layout: 'dashboard'
})

const route = useRoute()
const router = useRouter()
const umkmId = computed(() => (route.params.id as string) || 'umkm-01')

const investorStore = useInvestorStore()

const item = computed(() => {
  return investorStore.marketplaceList.find(m => m.id === umkmId.value) || investorStore.marketplaceList[0]
})

const ticketPresets = computed(() => [
  { label: 'Rp 50 Jt', value: 50000000 },
  { label: 'Rp 100 Jt', value: 100000000 },
  { label: 'Rp 150 Jt', value: 150000000 },
  { label: 'Seluruhnya', value: item.value.fundingTarget }
])

const ticketSize = ref(150000000)
const scheme = ref('REVENUE_SHARE')
const message = ref('Tertarik menanamkan modal dan mempelajari laporan keuangan asli toko ini.')
const ndaAgreed = ref(true)
const showNdaModal = ref(false)
const loading = ref(false)
const submitted = ref(false)

const ticketSharePercentage = computed(() => {
  if (!item.value.fundingTarget) return 0
  return Math.min(100, Math.round((ticketSize.value / item.value.fundingTarget) * 100))
})

const schemeOptions = [
  {
    value: 'REVENUE_SHARE',
    tag: 'Syariah (Bagi Untung)',
    title: 'Bagi Hasil Bulanan',
    description: 'Keuntungan dibagi tiap bulan sesuai hasil nyata penjualan toko.'
  },
  {
    value: 'PERFORMANCE_LOAN',
    tag: 'Cicilan Bertahap',
    title: 'Pinjaman Modal Kerja',
    description: 'Pengembalian dana modal bertahap sesuai kesepakatan.'
  },
  {
    value: 'EQUITY',
    tag: 'Miliki Porsi Toko',
    title: 'Beli Saham Usaha',
    description: 'Ikut memiliki saham toko dan dapat bagi untung tahunan.'
  }
]

async function submitRequest() {
  loading.value = true
  try {
    await investorStore.requestAccess(umkmId.value, ticketSize.value, message.value, scheme.value)
    submitted.value = true
    setTimeout(() => {
      router.push(`/investor/umkm/${umkmId.value}`)
    }, 1800)
  } catch (err: any) {
    console.error('Gagal mengajukan akses:', err)
  } finally {
    loading.value = false
  }
}
</script>
