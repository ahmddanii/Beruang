<template>
  <div class="space-y-8 pb-12 font-sans">
    <!-- Header -->
    <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
      <div>
        <h1 class="text-2xl sm:text-3xl font-heading font-bold text-neutral-900 dark:text-white tracking-tight">
          Antrian Validasi Progres Bulanan
        </h1>
        <p class="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 mt-1">
          Verifikasi kesesuaian laporan keuangan bulanan yang diinput UMKM terhadap bukti transaksi riil.
        </p>
      </div>

      <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-heading font-semibold bg-primary-50 dark:bg-primary-950 text-primary-700 dark:text-primary-300 border border-primary-200 dark:border-primary-800">
        <HugeiconsIcon :icon="Task01Icon" :size="14" :stroke-width="2" />
        <span>{{ konsultanStore.validationsQueue.length }} Antrian Menunggu</span>
      </span>
    </div>

    <!-- Empty State if no pending validations -->
    <div
      v-if="konsultanStore.validationsQueue.length === 0"
      class="p-12 bg-surface-light dark:bg-surface-dark rounded-2xl border border-border-light dark:border-border-dark text-center"
    >
      <div class="w-12 h-12 mx-auto rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-600 flex items-center justify-center mb-3">
        <HugeiconsIcon :icon="CheckmarkCircle01Icon" :size="24" :stroke-width="2" />
      </div>
      <h3 class="font-heading font-bold text-base text-neutral-900 dark:text-white">
        Semua Laporan Telah Tervalidasi
      </h3>
      <p class="text-xs text-neutral-500 max-w-sm mx-auto mt-1">
        Tidak ada antrian berkas pelaporan yang tertunda saat ini.
      </p>
    </div>

    <!-- Validation Queue Cards -->
    <div v-else class="space-y-4">
      <BCard
        v-for="item in konsultanStore.validationsQueue"
        :key="item.id"
        padding="lg"
      >
        <div class="space-y-4">
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-border-light dark:border-border-dark pb-3">
            <div>
              <span class="text-xs text-neutral-400 font-mono">ID: {{ item.clientId }}</span>
              <h3 class="font-heading font-bold text-lg text-neutral-900 dark:text-white">
                {{ item.clientName }} • {{ item.month }}
              </h3>
              <p class="text-xs text-neutral-500">
                Diajukan pada {{ item.submittedAt }}
              </p>
            </div>

            <div class="sm:text-right">
              <span class="text-xs text-neutral-500 block">Margin Kotor Terhitung:</span>
              <span class="text-base font-heading font-bold text-emerald-600 dark:text-emerald-400 tabular-nums">
                {{ Math.round(((item.omzet - item.hpp) / item.omzet) * 100) }}%
              </span>
            </div>
          </div>

          <!-- Financial Breakdown Bento -->
          <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
            <div class="p-3 rounded-xl bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark">
              <span class="text-[11px] text-neutral-500 block font-medium">Omzet Dilaporkan</span>
              <span class="font-heading font-bold text-sm text-neutral-900 dark:text-white tabular-nums">
                Rp {{ item.omzet.toLocaleString('id-ID') }}
              </span>
            </div>

            <div class="p-3 rounded-xl bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark">
              <span class="text-[11px] text-neutral-500 block font-medium">HPP Bahan Baku</span>
              <span class="font-heading font-bold text-sm text-danger tabular-nums">
                Rp {{ item.hpp.toLocaleString('id-ID') }}
              </span>
            </div>

            <div class="p-3 rounded-xl bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark">
              <span class="text-[11px] text-neutral-500 block font-medium">Beban Operasional</span>
              <span class="font-heading font-bold text-sm text-neutral-700 dark:text-neutral-300 tabular-nums">
                Rp {{ item.opex.toLocaleString('id-ID') }}
              </span>
            </div>

            <div class="p-3 rounded-xl bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark">
              <span class="text-[11px] text-neutral-500 block font-medium">Laba Bersih</span>
              <span class="font-heading font-bold text-sm text-emerald-600 dark:text-emerald-400 tabular-nums">
                Rp {{ (item.omzet - item.hpp - item.opex).toLocaleString('id-ID') }}
              </span>
            </div>
          </div>

          <!-- Document proof & client note -->
          <div class="p-3.5 rounded-xl bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
            <div class="flex items-center gap-2.5">
              <div class="w-8 h-8 rounded-lg bg-primary-100 dark:bg-primary-950 text-primary-600 flex items-center justify-center shrink-0">
                <HugeiconsIcon :icon="File01Icon" :size="16" :stroke-width="1.75" />
              </div>
              <div>
                <span class="font-heading font-semibold text-neutral-800 dark:text-neutral-200 block">
                  {{ item.proofDocument }}
                </span>
                <span class="text-[11px] text-neutral-500">
                  {{ item.notes || 'Lampiran rekap mutasi bank dan POS outlet.' }}
                </span>
              </div>
            </div>

            <button
              type="button"
              class="text-primary-600 dark:text-primary-400 font-heading font-semibold hover:underline shrink-0 text-left"
              @click="alert('Membuka pratinjau dokumen terenkripsi...')"
            >
              Unduh / Lihat Dokumen ↗
            </button>
          </div>

          <!-- Action buttons -->
          <div class="pt-2 flex justify-end gap-3 border-t border-border-light dark:border-border-dark">
            <BButton
              variant="outline"
              size="sm"
              @click="konsultanStore.rejectValidation(item.id)"
            >
              Minta Revisi
            </BButton>
            <BButton
              variant="success"
              size="sm"
              class="flex items-center gap-1.5"
              @click="konsultanStore.approveValidation(item.id)"
            >
              <HugeiconsIcon :icon="CheckmarkCircle01Icon" :size="14" :stroke-width="2" />
              <span>Setujui & Verifikasi</span>
            </BButton>
          </div>
        </div>
      </BCard>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useKonsultanStore } from '~/stores/konsultan'
import BCard from '~/components/base/BCard.vue'
import BButton from '~/components/base/BButton.vue'
import { HugeiconsIcon } from '@hugeicons/vue'
import {
  Task01Icon,
  CheckmarkCircle01Icon,
  File01Icon
} from '@hugeicons/core-free-icons'

definePageMeta({
  layout: 'dashboard'
})

const konsultanStore = useKonsultanStore()
</script>
