<template>
  <div class="space-y-8 pb-12 max-w-4xl font-sans">
    <!-- Header -->
    <div>
      <div class="flex items-center gap-2 text-xs text-neutral-500 mb-2">
        <NuxtLink :to="`/konsultan/klien/${clientId}`" class="hover:underline">← Kembali ke Detail Klien</NuxtLink>
      </div>
      <h1 class="text-2xl sm:text-3xl font-heading font-bold text-neutral-900 dark:text-white tracking-tight">
        Sertifikasi "Ready for Funding"
      </h1>
      <p class="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 mt-1">
        Pemberian status terverifikasi resmi oleh konsultan agar UMKM tampil di marketplace investor.
      </p>
    </div>

    <!-- Alert Certified -->
    <div
      v-if="certifiedSuccess"
      class="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-xs text-emerald-800 dark:text-emerald-300 space-y-2.5"
    >
      <div>
        <p class="font-heading font-bold text-sm">Sertifikasi Berhasil Diterbitkan!</p>
        <p>Klien telah dinyatakan Ready for Funding. Profil bisnis kini aktif di Katalog Marketplace Investor.</p>
      </div>
      <div class="pt-1">
        <BButton
          variant="success"
          size="sm"
          class="inline-flex items-center gap-1.5"
          @click="isCertificateModalOpen = true"
        >
          <HugeiconsIcon :icon="Award01Icon" :size="15" />
          <span>Lihat & Cetak Sertifikat Resmi (PDF)</span>
        </BButton>
      </div>
    </div>

    <!-- Main Certification Card -->
    <BCard padding="lg" class="space-y-6">
      <div class="flex items-center gap-4 border-b border-border-light dark:border-border-dark pb-5">
        <div class="w-12 h-12 rounded-xl bg-amber-400 p-2 shadow-xs shrink-0">
          <img src="/logo.svg" alt="Client Logo" class="w-full h-full object-contain" />
        </div>
        <div>
          <h2 class="font-heading font-bold text-lg text-neutral-900 dark:text-white">
            {{ client?.name }}
          </h2>
          <p class="text-xs text-neutral-500">
            Founder: {{ client?.owner }} • Sektor: {{ client?.sector }} • Skor Fundamental: {{ client?.healthScore }}/100
          </p>
        </div>
      </div>

      <!-- Verification Checklist -->
      <div class="space-y-3">
        <h3 class="font-heading font-bold text-sm text-neutral-900 dark:text-white">
          Pernyataan Kepatuhan Konsultan (Checklist Kelayakan)
        </h3>

        <div class="space-y-2.5">
          <label class="flex items-start gap-3 p-3.5 rounded-xl border border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark cursor-pointer select-none">
            <input type="checkbox" v-model="check1" class="w-4 h-4 rounded text-primary-600 focus:ring-primary-500 mt-0.5" />
            <div class="text-xs">
              <strong class="font-heading block text-neutral-900 dark:text-white">Transparansi Laporan Finansial:</strong>
              <span class="text-neutral-500">Klien telah membuktikan minimal 3 bulan pelaporan kas & modal jualan tanpa ada rekayasa atau anomali fatal.</span>
            </div>
          </label>

          <label class="flex items-start gap-3 p-3.5 rounded-xl border border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark cursor-pointer select-none">
            <input type="checkbox" v-model="check2" class="w-4 h-4 rounded text-primary-600 focus:ring-primary-500 mt-0.5" />
            <div class="text-xs">
              <strong class="font-heading block text-neutral-900 dark:text-white">Legalitas & Kepatuhan Izin:</strong>
              <span class="text-neutral-500">NIB RBA, status sewa outlet, dan sertifikasi izin produk sudah tervalidasi keabsahannya.</span>
            </div>
          </label>

          <label class="flex items-start gap-3 p-3.5 rounded-xl border border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark cursor-pointer select-none">
            <input type="checkbox" v-model="check3" class="w-4 h-4 rounded text-primary-600 focus:ring-primary-500 mt-0.5" />
            <div class="text-xs">
              <strong class="font-heading block text-neutral-900 dark:text-white">Rencana Penggunaan Modal Rasional:</strong>
              <span class="text-neutral-500">Proyeksi pertumbuhan dan alokasi modal kerja telah ditinjau dan terbukti realistis.</span>
            </div>
          </label>
        </div>
      </div>

      <!-- Ticket Recommendation -->
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label class="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1 font-heading">
            Rekomendasi Tiket Pendanaan (Rp)
          </label>
          <input
            v-model.number="fundingTicket"
            type="number"
            step="10000000"
            class="w-full px-4 py-2.5 rounded-xl border border-border-light dark:border-border-dark bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 text-sm focus:ring-1 focus:ring-primary-500 focus:outline-none tabular-nums"
          />
        </div>

        <div>
          <label class="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1 font-heading">
            Estimasi Payback / Imbal Hasil
          </label>
          <input
            v-model="roiNote"
            type="text"
            placeholder="Contoh: Payback 18-24 bulan, Bagi hasil 15%"
            class="w-full px-4 py-2.5 rounded-xl border border-border-light dark:border-border-dark bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 text-sm focus:ring-1 focus:ring-primary-500 focus:outline-none"
          />
        </div>
      </div>

      <!-- Official Recommendation Note -->
      <div>
        <label class="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1 font-heading">
          Pernyataan Rekomendasi Resmi Konsultan untuk Calon Investor
        </label>
        <textarea
          v-model="recommendationText"
          rows="3"
          class="w-full px-4 py-2.5 rounded-xl border border-border-light dark:border-border-dark bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 text-sm focus:ring-1 focus:ring-primary-500 focus:outline-none"
        />
      </div>

      <div class="pt-4 border-t border-border-light dark:border-border-dark flex items-center justify-between">
        <NuxtLink :to="`/konsultan/klien/${clientId}`">
          <BButton variant="outline" size="md">Batal</BButton>
        </NuxtLink>

        <BButton
          variant="primary"
          size="md"
          class="flex items-center gap-1.5"
          :disabled="!check1 || !check2 || !check3"
          @click="certifyNow"
        >
          <HugeiconsIcon :icon="Award01Icon" :size="16" :stroke-width="2" />
          <span>Terbitkan Sertifikasi</span>
        </BButton>
      </div>
    </BCard>

    <!-- Modal Cetak Sertifikat Resmi -->
    <BCertificateModal
      v-model="isCertificateModalOpen"
      :business-name="client?.name || 'Usaha Binaan'"
      :owner-name="client?.owner || 'Pemilik Usaha'"
      :sector="client?.sector || 'Sektor Usaha'"
      :city="client?.city || ''"
      :health-score="client?.healthScore || 80"
      :ticket-size="fundingTicket"
      :consultant-name="konsultanStore.profile.name || authStore.currentUser?.name || 'Konsultan Pendamping'"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import confetti from 'canvas-confetti'
import { useKonsultanStore } from '~/stores/konsultan'
import { useUmkmStore } from '~/stores/umkm'
import { useAuthStore } from '~/stores/auth'
import BCard from '~/components/base/BCard.vue'
import BButton from '~/components/base/BButton.vue'
import BCertificateModal from '~/components/base/BCertificateModal.vue'
import { HugeiconsIcon } from '@hugeicons/vue'
import { Award01Icon } from '@hugeicons/core-free-icons'

definePageMeta({
  layout: 'dashboard'
})

const isCertificateModalOpen = ref(false)

const route = useRoute()
const clientId = computed(() => route.params.id as string || 'umkm-01')

const authStore = useAuthStore()
const konsultanStore = useKonsultanStore()
const umkmStore = useUmkmStore()

onMounted(async () => {
  await Promise.all([
    konsultanStore.fetchClients(),
    konsultanStore.fetchProfile()
  ])
})

const client = computed(() => {
  return konsultanStore.clients.find(c => c.id === clientId.value) || konsultanStore.clients[0]
})

const check1 = ref(true)
const check2 = ref(true)
const check3 = ref(true)
const fundingTicket = ref(250000000)
const roiNote = ref('Payback 18-24 bulan (Bagi Hasil)')
const recommendationText = ref('Klien menunjukkan pertumbuhan stabil di 3 outlet dengan manajemen stok bahan baku yang efisien. Sangat direkomendasikan untuk pendanaan ekspansi cloud kitchen.')
const certifiedSuccess = ref(false)

function certifyNow() {
  konsultanStore.certifyClientReady(clientId.value)
  umkmStore.profile.fundingStatus = 'READY_FOR_FUNDING'
  certifiedSuccess.value = true

  confetti({
    particleCount: 120,
    spread: 80,
    origin: { y: 0.6 }
  })
}
</script>
