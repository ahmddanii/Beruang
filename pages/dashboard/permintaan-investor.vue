<template>
  <div class="space-y-8 pb-12 font-sans">
    <!-- Header -->
    <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
      <div>
        <h1 class="text-2xl sm:text-3xl font-heading font-bold text-neutral-900 dark:text-white tracking-tight">
          Permintaan Akses Data Room Privat
        </h1>
        <p class="text-sm sm:text-base text-neutral-600 dark:text-neutral-300 mt-1.5 leading-relaxed">
          Tinjau profil investor yang tertarik dan tentukan pemberian izin akses pembukuan usahamu.
        </p>
      </div>

      <div class="flex items-center gap-2">
        <span class="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-heading font-bold bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800">
          <span class="w-2 h-2 rounded-full bg-amber-500" />
          <span>{{ pendingCount }} Permintaan Menunggu Tanggapan</span>
        </span>
      </div>
    </div>

    <!-- Security Information Banner -->
    <div class="p-4 sm:p-5 rounded-2xl bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark flex items-start gap-4">
      <div class="w-9 h-9 rounded-xl bg-primary-100 dark:bg-primary-950 text-primary-600 dark:text-primary-400 flex items-center justify-center shrink-0 mt-0.5">
        <HugeiconsIcon :icon="Shield02Icon" :size="20" :stroke-width="1.75" />
      </div>
      <div class="space-y-1">
        <h4 class="font-heading font-bold text-sm sm:text-base text-neutral-900 dark:text-white">
          Keamanan & Proteksi Kerahasiaan Dokumen
        </h4>
        <p class="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed">
          Saat Anda menyetujui permintaan, investor hanya dapat membaca berkas rekening koran dan laporan P&L dengan watermark digital otomatis identitas akun pemohon. Riwayat akses tercatat permanen.
        </p>
      </div>
    </div>

    <!-- Requests List -->
    <div class="space-y-4">
      <BCard
        v-for="req in umkmStore.investorRequests"
        :key="req.id"
        padding="lg"
      >
        <div class="flex flex-col sm:flex-row sm:items-start justify-between gap-5">
          <div class="space-y-3.5 max-w-2xl">
            <div class="flex items-center gap-3.5">
              <div class="w-11 h-11 rounded-xl bg-primary-100 text-primary-700 dark:bg-primary-950 dark:text-primary-300 font-heading font-bold text-sm flex items-center justify-center border border-primary-200 dark:border-primary-800 shrink-0">
                {{ req.investorName.slice(0, 2).toUpperCase() }}
              </div>
              <div>
                <h3 class="font-heading font-bold text-base sm:text-lg text-neutral-900 dark:text-white">
                  {{ req.investorName }}
                </h3>
                <p class="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 font-medium mt-0.5">
                  {{ req.firmName }} • Diajukan pada {{ req.requestedAt }}
                </p>
              </div>
            </div>

            <!-- Intro message bubble -->
            <div class="p-4 rounded-xl bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark text-xs sm:text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed italic">
              "{{ req.introMessage }}"
            </div>

            <div class="flex flex-wrap items-center gap-3 text-xs sm:text-sm pt-1">
              <span class="text-neutral-600 dark:text-neutral-400 font-medium">Rencana Nilai Tiket:</span>
              <span class="font-heading font-bold text-emerald-600 dark:text-emerald-400 tabular-nums text-sm sm:text-base">
                Rp {{ req.proposedTicket.toLocaleString('id-ID') }}
              </span>
              <span class="text-neutral-300 dark:text-neutral-700">•</span>
              <span class="text-neutral-600 dark:text-neutral-400 font-medium">Status:</span>
              <span
                :class="[
                  'text-xs font-heading font-bold px-2.5 py-1 rounded-md border',
                  req.status === 'APPROVED'
                    ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800'
                    : req.status === 'REJECTED'
                    ? 'bg-red-50 dark:bg-red-950/60 text-red-700 dark:text-red-300 border-red-200 dark:border-red-800'
                    : 'bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800'
                ]"
              >
                {{ req.status === 'APPROVED' ? 'Akses Aktif' : req.status === 'REJECTED' ? 'Ditolak' : 'Menunggu Konfirmasi' }}
              </span>
            </div>
          </div>

          <!-- Actions -->
          <div class="flex items-center gap-2 shrink-0 pt-2 sm:pt-0">
            <template v-if="req.status === 'PENDING'">
              <BButton
                variant="success"
                size="sm"
                class="flex items-center gap-1.5"
                @click="umkmStore.updateInvestorRequestStatus(req.id, 'APPROVED')"
              >
                <HugeiconsIcon :icon="CheckmarkCircle01Icon" :size="16" :stroke-width="2" />
                <span>Buka Akses</span>
              </BButton>
              <BButton
                variant="outline"
                size="sm"
                @click="umkmStore.updateInvestorRequestStatus(req.id, 'REJECTED')"
              >
                Tolak Akses
              </BButton>
            </template>
            <template v-else-if="req.status === 'APPROVED'">
              <span class="text-xs sm:text-sm text-emerald-600 dark:text-emerald-400 font-bold font-heading">
                Disetujui {{ req.reviewedAt }}
              </span>
              <BButton
                variant="outline"
                size="sm"
                @click="umkmStore.updateInvestorRequestStatus(req.id, 'REJECTED')"
              >
                Tarik Izin Akses
              </BButton>
            </template>
            <template v-else>
              <span class="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 font-bold font-heading">
                Permintaan Ditolak
              </span>
              <BButton
                variant="outline"
                size="sm"
                @click="umkmStore.updateInvestorRequestStatus(req.id, 'APPROVED')"
              >
                Buka Kembali Izin
              </BButton>
            </template>
          </div>
        </div>
      </BCard>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useUmkmStore } from '~/stores/umkm'
import BCard from '~/components/base/BCard.vue'
import BButton from '~/components/base/BButton.vue'
import { HugeiconsIcon } from '@hugeicons/vue'
import {
  Shield02Icon,
  CheckmarkCircle01Icon
} from '@hugeicons/core-free-icons'

definePageMeta({
  layout: 'dashboard'
})

const umkmStore = useUmkmStore()

const pendingCount = computed(() => {
  return umkmStore.investorRequests.filter(r => r.status === 'PENDING').length
})
</script>
