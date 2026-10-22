<template>
  <div class="space-y-8 pb-10 max-w-4xl">
    <!-- Header -->
    <div>
      <h1 class="text-2xl sm:text-3xl font-heading font-extrabold text-neutral-900 dark:text-neutral-50 tracking-tight">
        Penugasan Konsultan ke UMKM Baru
      </h1>
      <p class="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 mt-1.5">
        Petakan UMKM yang baru menyelesaikan onboarding diagnostik ke konsultan pendamping yang relevan dengan industrinya.
      </p>
    </div>

    <!-- Alert Success -->
    <BAlert
      v-if="assigned"
      variant="success"
      title="Konsultan Berhasil Ditugaskan"
      message="Notifikasi penugasan dan link grup pendampingan telah dikirimkan via WhatsApp ke konsultan dan pemilik UMKM."
    />

    <!-- Active Queue Assignment Card -->
    <BCard padding="lg" class="border border-[#E4E7EC] dark:border-[#2B2B31] shadow-none space-y-6">
      <template #header>
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-2">
            <span class="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse" />
            <h3 class="font-heading font-bold text-base text-neutral-900 dark:text-white">
              Antrean Penugasan Menunggu (1 Usaha)
            </h3>
          </div>
          <span class="text-xs text-neutral-400">Onboarding Selesai 8 Jam Lalu</span>
        </div>
      </template>

      <!-- Target UMKM Summary Box -->
      <div class="p-4 rounded-2xl bg-neutral-50 dark:bg-neutral-800/60 border border-neutral-200 dark:border-neutral-700/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span class="text-[10px] font-mono font-bold text-neutral-400 uppercase tracking-wider">ID: BERU-STB-09</span>
          <h4 class="font-heading font-bold text-base text-neutral-900 dark:text-white mt-0.5">
            Warung Soto Banjar H. Kadir
          </h4>
          <span class="text-xs text-neutral-500">
            Sektor: Kuliner (F&B) • Banjarmasin • Pendapatan ~Rp 45.000.000 / bln • 1 Outlet
          </span>
        </div>
        <BBadge variant="warning" size="sm">Menunggu Konsultan</BBadge>
      </div>

      <form @submit.prevent="handleAssign" class="space-y-4">
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label class="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1.5 font-heading">
              Pilih Konsultan Pendamping Sesuai Sektor
            </label>
            <select
              v-model="selectedConsultant"
              class="w-full px-4 py-2.5 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-sm focus:ring-2 focus:ring-primary-500 focus:outline-none"
            >
              <option value="1">Dra. Maya Suryani, M.M. (Spesialis F&B & Ritel - 8 Klien Aktif)</option>
              <option value="2">Bambang Sudarsono, S.E. (Spesialis Agro & Rantai Pasok - 5 Klien)</option>
              <option value="3">Dr. Hendra Gunawan (Spesialis Kepatuhan Pajak & Hukum - 6 Klien)</option>
            </select>
          </div>

          <div>
            <label class="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1.5 font-heading">
              Target Penyusunan Action Plan Awal (SLA)
            </label>
            <input
              type="text"
              value="7 Hari Kerja (Maks. 5 Oktober 2026)"
              class="w-full px-4 py-2.5 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-sm focus:ring-2 focus:ring-primary-500 focus:outline-none"
            />
          </div>
        </div>

        <div>
          <label class="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1.5 font-heading">
            Catatan Tambahan untuk Konsultan (Opsional)
          </label>
          <textarea
            rows="2"
            placeholder="Contoh: Fokuskan pendampingan pada kalkulasi modal jualan porsi soto dan pembukuan kas harian POS..."
            class="w-full px-4 py-2.5 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-sm focus:ring-2 focus:ring-primary-500 focus:outline-none"
          />
        </div>

        <div class="pt-4 border-t border-neutral-100 dark:border-neutral-800 flex justify-end">
          <BButton
            type="submit"
            variant="primary"
            size="md"
            :loading="loading"
            class="flex items-center gap-2"
          >
            <span>Tugaskan Konsultan Sekarang</span>
            <HugeiconsIcon :icon="ArrowRight02Icon" :size="16" :stroke-width="2" />
          </BButton>
        </div>
      </form>
    </BCard>

    <!-- Recent Assignments History Table -->
    <BCard padding="lg" class="border border-[#E4E7EC] dark:border-[#2B2B31] shadow-none">
      <template #header>
        <h3 class="font-heading font-bold text-base text-neutral-900 dark:text-white">
          Riwayat Penugasan Terbaru
        </h3>
      </template>

      <div class="overflow-x-auto">
        <table class="w-full text-left text-xs">
          <thead class="bg-neutral-50 dark:bg-neutral-800/60 text-neutral-500 uppercase tracking-wider font-heading font-semibold border-b border-neutral-100 dark:border-neutral-800">
            <tr>
              <th class="px-4 py-3">Nama UMKM</th>
              <th class="px-4 py-3">Konsultan Pendamping</th>
              <th class="px-4 py-3">Tanggal Penugasan</th>
              <th class="px-4 py-3">Status Action Plan</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-neutral-100 dark:divide-neutral-800 font-medium">
            <tr class="hover:bg-neutral-50/50 dark:hover:bg-neutral-800/40">
              <td class="px-4 py-3 font-heading font-bold text-neutral-900 dark:text-white">
                Kopi Senja Nusantara
              </td>
              <td class="px-4 py-3 text-neutral-600 dark:text-neutral-300">
                Dra. Maya Suryani, M.M.
              </td>
              <td class="px-4 py-3 text-neutral-400">
                12 Agu 2026
              </td>
              <td class="px-4 py-3">
                <BBadge variant="success" size="sm">Tersertifikasi</BBadge>
              </td>
            </tr>
            <tr class="hover:bg-neutral-50/50 dark:hover:bg-neutral-800/40">
              <td class="px-4 py-3 font-heading font-bold text-neutral-900 dark:text-white">
                Batik Danar Lestari
              </td>
              <td class="px-4 py-3 text-neutral-600 dark:text-neutral-300">
                Bambang Sudarsono, S.E.
              </td>
              <td class="px-4 py-3 text-neutral-400">
                18 Agu 2026
              </td>
              <td class="px-4 py-3">
                <BBadge variant="primary" size="sm">Audit 5 Aspek</BBadge>
              </td>
            </tr>
            <tr class="hover:bg-neutral-50/50 dark:hover:bg-neutral-800/40">
              <td class="px-4 py-3 font-heading font-bold text-neutral-900 dark:text-white">
                Sambal Bu Rudy Malang
              </td>
              <td class="px-4 py-3 text-neutral-600 dark:text-neutral-300">
                Dra. Maya Suryani, M.M.
              </td>
              <td class="px-4 py-3 text-neutral-400">
                02 Sep 2026
              </td>
              <td class="px-4 py-3">
                <BBadge variant="warning" size="sm">On Progress</BBadge>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </BCard>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import BCard from '~/components/base/BCard.vue'
import BButton from '~/components/base/BButton.vue'
import BBadge from '~/components/base/BBadge.vue'
import BAlert from '~/components/base/BAlert.vue'
import { HugeiconsIcon } from '@hugeicons/vue'
import {
  ArrowLeft02Icon,
  ArrowRight02Icon
} from '@hugeicons/core-free-icons'

definePageMeta({
  layout: 'dashboard'
})

const selectedConsultant = ref('1')
const loading = ref(false)
const assigned = ref(false)

function handleAssign() {
  loading.value = true
  setTimeout(() => {
    loading.value = false
    assigned.value = true
    setTimeout(() => {
      assigned.value = false
    }, 4000)
  }, 400)
}
</script>
