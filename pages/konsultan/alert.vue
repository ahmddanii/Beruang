<template>
  <div class="space-y-6 sm:space-y-8 pb-16 font-poppins text-neutral-900 dark:text-neutral-100 max-w-5xl">
    <!-- 1. Top Header -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 min-h-[44px]">
      <div class="space-y-1">
        <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 text-xs font-semibold border border-amber-200 dark:border-amber-800/60">
          <span class="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
          <span>Beruang Finance Guard • AI Copilot</span>
        </div>
        <h1 class="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-900 dark:text-white">
          AI Anomaly Alert Feed
        </h1>
        <p class="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400">
          Sistem deteksi anomali real-time untuk mendeteksi pembengkakan biaya modal (HPP) dan deviasi kas operasional klien binaan.
        </p>
      </div>

      <!-- Action Button: Jalankan Pemindaian AI -->
      <div class="flex items-center gap-2.5 shrink-0">
        <button
          type="button"
          :disabled="isScanning"
          class="btn-pill-action btn-pill-action-green cursor-pointer shadow-none flex items-center gap-2"
          @click="runAiScan"
        >
          <HugeiconsIcon
            :icon="SparklesIcon"
            :size="16"
            :class="{ 'animate-spin': isScanning }"
          />
          <span>{{ isScanning ? 'Memindai Mutasi Kas...' : 'Pindai Ulang Kas dengan AI' }}</span>
        </button>
      </div>
    </div>

    <!-- AI Scan Progress Banner (Appears when scanning) -->
    <Transition
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="opacity-0 -translate-y-2"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-2"
    >
      <div
        v-if="isScanning"
        class="card-tactile-gopay p-4 sm:p-5 rounded-2xl border border-amber-300 dark:border-amber-700 bg-amber-50/60 dark:bg-amber-950/20 flex items-center gap-3.5"
      >
        <div class="w-8 h-8 rounded-full bg-amber-500 text-white flex items-center justify-center shrink-0 animate-spin">
          <HugeiconsIcon :icon="SparklesIcon" :size="16" />
        </div>
        <div class="flex-1 min-w-0">
          <p class="text-xs sm:text-sm font-semibold text-neutral-900 dark:text-white">
            {{ scanStepText }}
          </p>
          <div class="w-full h-1.5 rounded-full bg-amber-200 dark:bg-amber-900 mt-2 overflow-hidden">
            <div
              class="h-full bg-amber-500 rounded-full transition-all duration-300"
              :style="{ width: `${scanProgress}%` }"
            />
          </div>
        </div>
      </div>
    </Transition>

    <!-- Filter Bar (Tabs: Semua, Risiko Tinggi, Risiko Sedang) -->
    <div class="flex items-center justify-between border-b border-neutral-200 dark:border-neutral-800 pb-3">
      <div class="flex items-center gap-2">
        <button
          v-for="filter in ['ALL', 'high', 'medium']"
          :key="filter"
          type="button"
          class="px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer"
          :class="[
            selectedSeverity === filter
              ? 'bg-[#156374] text-white dark:bg-[#50AABF] dark:text-neutral-950 shadow-xs'
              : 'bg-neutral-100 dark:bg-neutral-800/80 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-200'
          ]"
          @click="selectedSeverity = filter"
        >
          <span>
            {{ filter === 'ALL' ? 'Semua Anomali' : filter === 'high' ? 'Risiko Tinggi' : 'Risiko Sedang' }}
            ({{ getFilterCount(filter) }})
          </span>
        </button>
      </div>

      <span class="text-xs text-neutral-400 font-mono hidden sm:inline">
        Algoritma: Variance Ratio Threshold 10%
      </span>
    </div>

    <!-- Empty State -->
    <div
      v-if="filteredAlerts.length === 0"
      class="card-tactile-gopay p-12 rounded-[22px] text-center space-y-3 bg-white dark:bg-[#13161F]"
    >
      <div class="w-12 h-12 mx-auto rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-600 flex items-center justify-center">
        <HugeiconsIcon :icon="CheckmarkCircle01Icon" :size="24" />
      </div>
      <h3 class="font-bold text-base text-neutral-900 dark:text-white">
        Tidak Ada Anomali Finansial Aktif
      </h3>
      <p class="text-xs text-neutral-500 max-w-sm mx-auto">
        Seluruh transaksi kas dan belanja bahan baku klien binaan berada dalam rentang variansi biaya yang sehat.
      </p>
    </div>

    <!-- Alert Cards List -->
    <div v-else class="space-y-4">
      <div
        v-for="alert in filteredAlerts"
        :key="alert.id"
        class="card-tactile-gopay rounded-[20px] p-5 sm:p-6 space-y-4 border transition-all bg-white dark:bg-[#13161F]"
        :class="alert.severity === 'high' ? 'border-amber-300 dark:border-amber-700/60' : 'border-neutral-200 dark:border-neutral-800'"
      >
        <!-- Header Item: Client Name + Severity + Time -->
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
          <div class="flex items-center gap-3">
            <div
              class="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
              :class="alert.severity === 'high' ? 'bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-400' : 'bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-400'"
            >
              <HugeiconsIcon :icon="AlertCircleIcon" :size="18" />
            </div>
            <div>
              <div class="flex items-center gap-2">
                <h3 class="font-bold text-sm sm:text-base text-neutral-900 dark:text-white">
                  {{ alert.clientName }}
                </h3>
                <span
                  class="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider"
                  :class="alert.severity === 'high' ? 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300' : 'bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300'"
                >
                  {{ alert.severity === 'high' ? 'Risiko Tinggi' : 'Risiko Sedang' }}
                </span>
              </div>
              <p class="text-xs text-neutral-500 mt-0.5 font-mono">
                {{ alert.title }} • Terdeteksi: {{ alert.timestamp }}
              </p>
            </div>
          </div>

          <!-- Metric Deviation Badge -->
          <div class="px-3 py-1.5 rounded-xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-right self-start sm:self-auto">
            <span class="text-[10px] uppercase font-semibold text-neutral-400 block">Deviasi Biaya</span>
            <span class="text-xs font-bold text-red-500 font-mono tabular-nums">{{ alert.deviation }}</span>
          </div>
        </div>

        <!-- Description & Cause -->
        <div class="p-3.5 rounded-xl bg-neutral-50 dark:bg-neutral-900/50 border border-neutral-100 dark:border-neutral-800 text-xs sm:text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed space-y-1.5">
          <p>{{ alert.message }}</p>
          <p class="text-xs text-neutral-500 font-sans">
            <strong>Rekomendasi AI:</strong> {{ alert.recommendation }}
          </p>
        </div>

        <!-- Action Row -->
        <div class="flex flex-wrap items-center justify-between gap-3 pt-1 border-t border-neutral-100 dark:border-neutral-800/80">
          <div class="flex items-center gap-2">
            <button
              type="button"
              class="btn-pill-action btn-pill-action-green text-xs font-semibold cursor-pointer shadow-none"
              @click="openContactDrawer(alert)"
            >
              <span>Bahas Solusi Bersama Klien</span>
            </button>

            <button
              type="button"
              class="btn-pill-action text-xs font-semibold cursor-pointer shadow-none"
              @click="sendToClientChat(alert)"
            >
              <span>Kirim Catatan ke Chat</span>
            </button>
          </div>

          <button
            type="button"
            class="text-xs text-neutral-400 hover:text-neutral-700 dark:hover:text-white transition-colors cursor-pointer"
            @click="dismissAlert(alert.id)"
          >
            Abaikan Anomali
          </button>
        </div>
      </div>
    </div>

    <!-- Contact Drawer -->
    <BDrawer
      v-model="drawerOpen"
      :title="`Agenda Solutif: ${selectedAlert?.clientName}`"
      subtitle="Panduan Diskusi Berbasis Rekomendasi AI"
    >
      <div v-if="selectedAlert" class="space-y-4 font-poppins">
        <div class="p-4 rounded-xl bg-amber-50 dark:bg-neutral-800 border border-amber-200 dark:border-amber-800 text-xs space-y-1">
          <span class="font-bold text-amber-900 dark:text-amber-200 block">Poin Temuan AI:</span>
          <p class="text-neutral-700 dark:text-neutral-300">{{ selectedAlert.message }}</p>
        </div>

        <div class="space-y-2 text-xs text-neutral-700 dark:text-neutral-300">
          <h4 class="font-bold text-sm text-neutral-900 dark:text-white">
            Agenda Diskusi Solutif:
          </h4>
          <ul class="list-disc list-inside space-y-1.5 text-neutral-600 dark:text-neutral-400">
            <li>Evaluasi lonjakan harga beli bahan baku dari supplier lokal.</li>
            <li>Pertimbangkan rasionalisasi gramasi bahan tanpa menurunkan mutu rasa.</li>
            <li>Sarankan penguncian kontrak harga pasokan untuk 3 bulan ke depan.</li>
          </ul>
        </div>

        <div class="pt-4 border-t border-neutral-200 dark:border-neutral-800 space-y-2.5">
          <BButton
            variant="success"
            block
            size="md"
            class="flex items-center justify-center gap-2"
            @click="sendToClientChat(selectedAlert)"
          >
            <HugeiconsIcon :icon="Comment01Icon" :size="16" />
            <span>Kirim Notulensi ke Chat Klien</span>
          </BButton>

          <NuxtLink :to="`/konsultan/klien/${selectedAlert.clientId}`" class="block w-full">
            <BButton variant="outline" block size="md">
              Buka Profil & Mutasi Klien
            </BButton>
          </NuxtLink>
        </div>
      </div>
    </BDrawer>

    <!-- Toast Feedback Notification -->
    <Transition
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="opacity-0 -translate-y-2 scale-95"
      enter-to-class="opacity-100 translate-y-0 scale-100"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="opacity-100 translate-y-0 scale-100"
      leave-to-class="opacity-0 -translate-y-2 scale-95"
    >
      <div
        v-if="toastMessage"
        class="fixed top-6 left-1/2 -translate-x-1/2 z-50 px-4 py-2.5 rounded-full bg-neutral-900/95 dark:bg-neutral-800/95 text-white border border-neutral-700/60 backdrop-blur-md text-xs font-semibold shadow-xl flex items-center gap-2 pointer-events-none"
      >
        <HugeiconsIcon :icon="CheckmarkCircle01Icon" :size="16" class="text-emerald-400 shrink-0" />
        <span>{{ toastMessage }}</span>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useChatStore } from '~/stores/chat'
import { useKonsultanStore } from '~/stores/konsultan'
import { useAuthStore } from '~/stores/auth'
import BButton from '~/components/base/BButton.vue'
import BDrawer from '~/components/base/BDrawer.vue'
import { HugeiconsIcon } from '@hugeicons/vue'
import {
  AlertCircleIcon,
  CheckmarkCircle01Icon,
  SparklesIcon,
  Comment01Icon
} from '@hugeicons/core-free-icons'

definePageMeta({
  layout: 'dashboard'
})

const chatStore = useChatStore()
const konsultanStore = useKonsultanStore()
const authStore = useAuthStore()
const selectedSeverity = ref<string>('ALL')
const drawerOpen = ref(false)
const selectedAlert = ref<any | null>(null)
const toastMessage = ref('')
let toastTimer: any = null

function triggerToast(msg: string) {
  toastMessage.value = msg
  if (toastTimer) clearTimeout(toastTimer)
  toastTimer = setTimeout(() => {
    toastMessage.value = ''
  }, 2500)
}

// AI Anomaly List with rich telemetry data
const alertsList = ref([
  {
    id: 'alt-01',
    clientId: 'umkm-01',
    clientName: 'Kopi Senja Nusantara',
    title: 'Lonjakan Rasio Modal Jualan (HPP)',
    message: 'Biaya pembelian biji kopi dan susu UHT minggu ini mencapai 54.8% dari total omzet harian (standar ideal: < 42%). Hal ini berpotensi menggerus laba operasional sebesar Rp 6.200.000 bulan ini.',
    recommendation: 'Sarankan negosiasi harga borongan dengan roastery lokal atau penyesuaian porsi resep espresso.',
    deviation: '+12.8% di atas toleransi',
    severity: 'high',
    timestamp: '24 Okt 2026, 14:20 WIB',
    dismissed: false
  },
  {
    id: 'alt-02',
    clientId: 'umkm-02',
    clientName: 'Warung Makan Bu Siti',
    title: 'Penurunan Margin Laba Bersih',
    message: 'Margin bersih toko tertekan hingga sisa 11.2% akibat tingginya biaya kemasan takeaway dan diskon promo platform online tanpa subsidi merchant.',
    recommendation: 'Batasi kuota promo aplikasi delivery dan perkenalkan kemasan eco-pack alternatif yang 20% lebih hemat.',
    deviation: '-8.5% dari target',
    severity: 'high',
    timestamp: '23 Okt 2026, 09:45 WIB',
    dismissed: false
  },
  {
    id: 'alt-03',
    clientId: 'umkm-03',
    clientName: 'Batik Solo Heritage',
    title: 'Variansi Biaya Operasional',
    message: 'Pengeluaran logistik kurir ekspedisi melonjak 18% dalam 10 hari terakhir akibat pengiriman terpisah per potong kain.',
    recommendation: 'Jadwalkan pengiriman pesanan B2B secara teragregasi 2 kali seminggu untuk menekan ongkos kirim volume.',
    deviation: '+18.0% fluktuasi',
    severity: 'medium',
    timestamp: '22 Okt 2026, 17:10 WIB',
    dismissed: false
  }
])

const isDemoMaya = computed(() => {
  return authStore.currentUser?.email?.includes('maya.suryani')
})

const activeAlerts = computed(() => {
  if (konsultanStore.alerts && konsultanStore.alerts.length > 0) {
    return konsultanStore.alerts.map(a => ({
      id: a.id,
      clientId: a.clientId,
      clientName: a.clientName || 'UMKM Binaan',
      title: a.title || 'Peringatan Rasio Kas & Belanja Modal',
      message: a.message,
      recommendation: (a as any).recommendation || 'Evaluasi harga bahan baku atau negosiasi ulang dengan vendor utama.',
      deviation: (a as any).deviation || (a.severity === 'high' ? '+15.2% variansi' : '+8.5% variansi'),
      severity: a.severity || 'high',
      timestamp: (a as any).date || a.timestamp || 'Hari ini',
      dismissed: a.dismissed || false
    })).filter(a => !a.dismissed)
  }
  if (isDemoMaya.value) {
    return alertsList.value.filter(a => !a.dismissed)
  }
  return []
})

onMounted(async () => {
  await Promise.all([
    konsultanStore.fetchAlerts(),
    konsultanStore.fetchClients()
  ])
})

const filteredAlerts = computed(() => {
  if (selectedSeverity.value === 'ALL') return activeAlerts.value
  return activeAlerts.value.filter(a => a.severity === selectedSeverity.value)
})

function getFilterCount(severity: string) {
  if (severity === 'ALL') return activeAlerts.value.length
  return activeAlerts.value.filter(a => a.severity === severity).length
}

// AI Scanning Simulation
const isScanning = ref(false)
const scanProgress = ref(0)
const scanStepText = ref('')

function runAiScan() {
  isScanning.value = true
  scanProgress.value = 15
  scanStepText.value = 'Membaca rekaman mutasi kas klien dari database...'

  setTimeout(() => {
    scanProgress.value = 50
    scanStepText.value = 'Membandingkan rasio belanja modal vs tren historis...'
  }, 700)

  setTimeout(() => {
    scanProgress.value = 85
    scanStepText.value = 'Menerapkan model AI Beruang Finance Guard...'
  }, 1400)

  setTimeout(async () => {
    scanProgress.value = 100
    isScanning.value = false
    await konsultanStore.fetchAlerts()
    alertsList.value.forEach(a => { a.dismissed = false })
    triggerToast('Pemindaian selesai! Beruang AI Finance Guard telah diperbarui.')
  }, 2100)
}

function openContactDrawer(alertItem: any) {
  selectedAlert.value = alertItem
  drawerOpen.value = true
}

function dismissAlert(alertId: string) {
  const target = alertsList.value.find(a => a.id === alertId)
  if (target) {
    target.dismissed = true
    triggerToast('Anomali telah diarsipkan.')
  }
}

function sendToClientChat(alertItem: any) {
  drawerOpen.value = false
  // Add formal message to chatStore
  chatStore.sendMessage(
    `[Peringatan Pendampingan AI] Halo Tim ${alertItem.clientName},\n\nTerdapat catatan penting dari evaluasi mingguan kas tokomu:\n• Masalah: ${alertItem.title} (${alertItem.deviation})\n• Dampak: ${alertItem.message}\n• Rekomendasi Solusi: ${alertItem.recommendation}\n\nMari kita jadwalkan waktu untuk mendiskusikan langkah efisiensinya ya!`
  )
  triggerToast(`Rekomendasi berhasil dikirim ke ruang obrolan ${alertItem.clientName}!`)
}
</script>
