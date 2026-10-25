<template>
  <div class="space-y-8 pb-12 font-sans">
    <!-- Header -->
    <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
      <div>
        <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 text-xs font-heading font-semibold mb-2 border border-amber-200 dark:border-amber-800">
          <span class="w-1.5 h-1.5 rounded-full bg-amber-500" />
          <span>Deteksi Anomali AI Otomatis</span>
        </div>
        <h1 class="text-2xl sm:text-3xl font-heading font-bold text-neutral-900 dark:text-white tracking-tight">
          AI Anomaly Alert Feed
        </h1>
        <p class="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 mt-1">
          Peringatan otomatis saat terdeteksi lonjakan modal jualan >10%, penurunan margin drastis, atau deviasi kas operasional.
        </p>
      </div>

      <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-heading font-semibold bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800">
        <HugeiconsIcon :icon="AlertCircleIcon" :size="14" :stroke-width="2" />
        <span>{{ activeAlerts.length }} Anomali Aktif</span>
      </span>
    </div>

    <!-- Empty State if all alerts dismissed -->
    <div
      v-if="activeAlerts.length === 0"
      class="p-12 bg-surface-light dark:bg-surface-dark rounded-2xl border border-border-light dark:border-border-dark text-center"
    >
      <div class="w-12 h-12 mx-auto rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-600 flex items-center justify-center mb-3">
        <HugeiconsIcon :icon="CheckmarkCircle01Icon" :size="24" :stroke-width="2" />
      </div>
      <h3 class="font-heading font-bold text-base text-neutral-900 dark:text-white">
        Tidak Ada Anomali Finansial
      </h3>
      <p class="text-xs text-neutral-500 max-w-sm mx-auto mt-1">
        Semua klien binaan berada dalam rentang variansi biaya yang sehat dan normal.
      </p>
    </div>

    <!-- Alert List Feed -->
    <div v-else class="space-y-4 max-w-4xl">
      <div
        v-for="alert in activeAlerts"
        :key="alert.id"
        class="p-5 rounded-2xl bg-surface-light dark:bg-surface-dark border border-amber-200 dark:border-amber-800/80 space-y-3"
      >
        <div class="flex items-start justify-between gap-4">
          <div class="flex items-center gap-2.5">
            <div class="w-7 h-7 rounded-lg bg-amber-100 dark:bg-amber-950 text-amber-600 flex items-center justify-center shrink-0">
              <HugeiconsIcon :icon="AlertCircleIcon" :size="16" :stroke-width="2" />
            </div>
            <div>
              <h4 class="font-heading font-bold text-sm text-neutral-900 dark:text-white">
                {{ alert.title }} • {{ alert.clientName }}
              </h4>
              <span class="text-[11px] text-neutral-400 font-mono">
                Terdeteksi: {{ alert.timestamp }} • Tingkat Risiko: {{ alert.severity === 'high' ? 'Tinggi' : 'Sedang' }}
              </span>
            </div>
          </div>
        </div>

        <p class="text-xs text-neutral-600 dark:text-neutral-300 leading-relaxed pl-9">
          {{ alert.message }}
        </p>

        <div class="flex flex-wrap items-center gap-2.5 pt-2 pl-9">
          <BButton
            variant="primary"
            size="sm"
            @click="openContactDrawer(alert)"
          >
            Bahas Bersama Klien
          </BButton>

          <NuxtLink :to="`/konsultan/klien/${alert.clientId}`">
            <BButton variant="outline" size="sm">
              Buka Profil Klien
            </BButton>
          </NuxtLink>

          <BButton
            variant="ghost"
            size="sm"
            @click="konsultanStore.dismissAlert(alert.id)"
          >
            Abaikan
          </BButton>
        </div>
      </div>
    </div>

    <!-- Contact Drawer -->
    <BDrawer
      v-model="drawerOpen"
      :title="`Pendampingan Masalah: ${selectedAlert?.clientName}`"
      subtitle="Panduan Diskusi Solutif Bersama Klien"
    >
      <div v-if="selectedAlert" class="space-y-4">
        <div class="p-4 rounded-xl bg-amber-50 dark:bg-neutral-800 border border-amber-200 dark:border-amber-800 text-xs">
          <span class="font-bold text-amber-900 dark:text-amber-200 block mb-1">Poin Peringatan:</span>
          {{ selectedAlert.message }}
        </div>

        <div class="space-y-2 text-xs text-neutral-700 dark:text-neutral-300">
          <h4 class="font-heading font-bold text-sm text-neutral-900 dark:text-white">
            Rekomendasi Agenda Diskusi:
          </h4>
          <ul class="list-disc list-inside space-y-1.5 text-neutral-600 dark:text-neutral-400">
            <li>Tanyakan kenaikan harga pokok bahan baku dari supplier lokal.</li>
            <li>Evaluasi kemungkinan penyesuaian ukuran porsi atau menu bundling promo.</li>
            <li>Sarankan penguncian kontrak pasokan bahan baku 3-6 bulan ke depan.</li>
          </ul>
        </div>

        <div class="pt-4 border-t border-border-light dark:border-border-dark space-y-2">
          <BButton
            variant="success"
            block
            size="md"
            class="flex items-center justify-center gap-2"
            @click="windowOpenWa"
          >
            <HugeiconsIcon :icon="Call02Icon" :size="16" :stroke-width="1.75" />
            <span>Hubungi Founder via WhatsApp</span>
          </BButton>
        </div>
      </div>
    </BDrawer>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useKonsultanStore, type AnomalyAlert } from '~/stores/konsultan'
import BButton from '~/components/base/BButton.vue'
import BDrawer from '~/components/base/BDrawer.vue'
import { HugeiconsIcon } from '@hugeicons/vue'
import {
  AlertCircleIcon,
  CheckmarkCircle01Icon,
  Call02Icon
} from '@hugeicons/core-free-icons'

definePageMeta({
  layout: 'dashboard'
})

const konsultanStore = useKonsultanStore()
const drawerOpen = ref(false)
const selectedAlert = ref<AnomalyAlert | null>(null)

const activeAlerts = computed(() => {
  return konsultanStore.alerts.filter(a => !a.dismissed)
})

function openContactDrawer(alert: AnomalyAlert) {
  selectedAlert.value = alert
  drawerOpen.value = true
}

function windowOpenWa() {
  alert('Menghubungkan ke WhatsApp Founder Klien: 0812-3456-7890...')
}
</script>
