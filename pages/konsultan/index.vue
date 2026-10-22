<template>
  <div class="space-y-8 pb-20 font-sans">
    <!-- 1. EXECUTIVE CONSULTANT BANNER (Double-Bezel Hardware Architecture) -->
    <div class="p-1.5 sm:p-2 rounded-[2.25rem] bg-neutral-200/50 dark:bg-neutral-800/40 border border-neutral-300/40 dark:border-neutral-700/30 shadow-xs">
      <div class="p-6 sm:p-8 lg:p-10 rounded-[calc(2.25rem-0.5rem)] bg-white dark:bg-[#141519] border border-neutral-200/80 dark:border-neutral-800/90 shadow-[inset_0_1px_1px_rgba(255,255,255,0.9)] dark:shadow-[inset_0_1px_1px_rgba(255,255,255,0.06)] flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative overflow-hidden">
        <div class="space-y-3 max-w-2xl relative z-10">
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 text-[10px] font-mono font-extrabold uppercase tracking-[0.15em]">
            <span class="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>KONSULTAN BISNIS LISENSI RESMI BNSP #7281</span>
          </div>

          <h1 class="text-3xl sm:text-4xl font-heading font-extrabold text-neutral-900 dark:text-white tracking-[-0.03em] leading-tight text-balance">
            Pusat Diagnosa & Matriks Penilaian Klien UMKM
          </h1>

          <p class="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed font-sans max-w-xl">
            Pantau stabilitas 5 pilar fundamental klien binaan, deteksi kebocoran modal jualan, dan terbitkan akreditasi resmi <strong class="text-neutral-900 dark:text-white">Ready for Funding</strong> untuk kurasi investor.
          </p>
        </div>

        <div class="flex flex-wrap items-center gap-3 shrink-0">
          <!-- Button-in-Button Trailing Icon -->
          <button
            type="button"
            class="group pl-5 pr-2 py-2 rounded-full font-heading font-bold text-xs bg-primary-500 hover:bg-primary-600 text-white shadow-xs transition-all duration-300 inline-flex items-center gap-3 cursor-pointer"
            @click="showValidationModal = true"
          >
            <span>Tinjau Antrean Validasi ({{ isValidationApproved ? 0 : 1 }})</span>
            <span class="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center transition-transform duration-300 group-hover:translate-x-0.5">
              <HugeiconsIcon :icon="CheckmarkCircle01Icon" :size="15" :stroke-width="2" />
            </span>
          </button>
        </div>
      </div>
    </div>

    <!-- 2. MACRO METRICS TELEMETRY (Double-Bezel 4-Quadrant Shell) -->
    <div class="p-1.5 sm:p-2 rounded-[2.25rem] bg-neutral-200/50 dark:bg-neutral-800/40 border border-neutral-300/40 dark:border-neutral-700/30 shadow-xs">
      <div class="p-6 sm:p-8 rounded-[calc(2.25rem-0.5rem)] bg-white dark:bg-[#141519] border border-neutral-200/80 dark:border-neutral-800/90 shadow-[inset_0_1px_1px_rgba(255,255,255,0.9)] dark:shadow-[inset_0_1px_1px_rgba(255,255,255,0.06)]">
        <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <!-- Tile 1: Total Klien -->
          <div class="p-4 sm:p-5 rounded-2xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200/70 dark:border-neutral-800 space-y-1">
            <div class="flex items-center justify-between text-neutral-400">
              <span class="text-[10px] font-mono uppercase tracking-wider font-extrabold text-neutral-500">Total Klien Binaan</span>
              <HugeiconsIcon :icon="UserGroupIcon" :size="17" :stroke-width="1.75" class="text-neutral-500" />
            </div>
            <div class="text-3xl font-heading font-extrabold text-neutral-900 dark:text-white tabular-nums font-mono pt-1">
              {{ konsultanStore.clients.length }} <span class="text-xs font-normal text-neutral-400 font-sans">Usaha</span>
            </div>
            <span class="text-[11px] text-emerald-600 dark:text-emerald-400 font-bold block font-mono">● 100% Aktif Bimbingan</span>
          </div>

          <!-- Tile 2: Ready for Funding -->
          <div class="p-4 sm:p-5 rounded-2xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200/70 dark:border-neutral-800 space-y-1">
            <div class="flex items-center justify-between text-neutral-400">
              <span class="text-[10px] font-mono uppercase tracking-wider font-extrabold text-amber-600 dark:text-amber-400">Ready for Funding</span>
              <HugeiconsIcon :icon="Award01Icon" :size="17" :stroke-width="1.75" class="text-amber-500" />
            </div>
            <div class="text-3xl font-heading font-extrabold text-emerald-600 dark:text-emerald-400 tabular-nums font-mono pt-1">
              {{ readyCount }} <span class="text-xs font-normal text-neutral-400 font-sans">Usaha</span>
            </div>
            <span class="text-[11px] text-neutral-500 font-medium block font-mono">Tersertifikasi Grade A</span>
          </div>

          <!-- Tile 3: Antrean Validasi -->
          <div class="p-4 sm:p-5 rounded-2xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200/70 dark:border-neutral-800 space-y-1">
            <div class="flex items-center justify-between text-neutral-400">
              <span class="text-[10px] font-mono uppercase tracking-wider font-extrabold text-primary-600 dark:text-primary-400">Antrean Validasi</span>
              <HugeiconsIcon :icon="Task01Icon" :size="17" :stroke-width="1.75" class="text-primary-500" />
            </div>
            <div class="text-3xl font-heading font-extrabold text-primary-500 tabular-nums font-mono pt-1">
              {{ isValidationApproved ? 0 : 1 }} <span class="text-xs font-normal text-neutral-400 font-sans">Laporan</span>
            </div>
            <span class="text-[11px] text-primary-600 dark:text-primary-400 font-bold block font-mono">
              {{ isValidationApproved ? '✓ Semua Valid' : '● Menunggu Verifikasi' }}
            </span>
          </div>

          <!-- Tile 4: Anomali AI -->
          <div class="p-4 sm:p-5 rounded-2xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200/70 dark:border-neutral-800 space-y-1">
            <div class="flex items-center justify-between text-neutral-400">
              <span class="text-[10px] font-mono uppercase tracking-wider font-extrabold text-amber-600 dark:text-amber-400">Deteksi Anomali AI</span>
              <HugeiconsIcon :icon="Alert01Icon" :size="17" :stroke-width="1.75" class="text-amber-500" />
            </div>
            <div class="text-3xl font-heading font-extrabold text-amber-600 dark:text-amber-400 tabular-nums font-mono pt-1">
              {{ isAnomalyResolved ? 0 : 1 }} <span class="text-xs font-normal text-neutral-400 font-sans">Kasus</span>
            </div>
            <span class="text-[11px] text-amber-600 dark:text-amber-400 font-bold block font-mono">
              {{ isAnomalyResolved ? '✓ Telah Diberi Arahan' : '⚠️ Fluktuasi Modal Bahan' }}
            </span>
          </div>
        </div>
      </div>
    </div>

    <!-- 3. ACTIVE ANOMALY ALERT (Double-Bezel Hardware Architecture) -->
    <div
      v-if="!isAnomalyResolved"
      class="p-1.5 sm:p-2 rounded-[2rem] bg-amber-200/60 dark:bg-amber-900/40 border border-amber-300/60 dark:border-amber-700/40 shadow-xs"
    >
      <div class="p-5 sm:p-6 rounded-[calc(2rem-0.5rem)] bg-amber-50/90 dark:bg-[#1c1813] border border-amber-200 dark:border-amber-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
        <div class="flex items-start gap-4">
          <div class="w-10 h-10 rounded-2xl bg-amber-500 text-white flex items-center justify-center shrink-0 shadow-xs">
            <HugeiconsIcon :icon="Alert01Icon" :size="20" :stroke-width="2" />
          </div>
          <div class="space-y-1">
            <div class="flex items-center gap-2">
              <span class="text-[10px] font-mono font-extrabold uppercase px-2 py-0.5 rounded bg-amber-200 text-amber-900 dark:bg-amber-900/80 dark:text-amber-200">
                Peringatan Anomali
              </span>
              <span class="text-xs font-mono text-neutral-500">Klien #UMKM-01</span>
            </div>
            <h4 class="font-heading font-extrabold text-base text-neutral-900 dark:text-white leading-tight">
              Kenaikan Harga Susu Segar (+3.2%) pada Kopi Senja Nusantara
            </h4>
            <p class="text-xs text-neutral-600 dark:text-neutral-300 leading-relaxed max-w-xl font-sans">
              Terjadi lonjakan harga susu segar pada pekan ke-3 September. Porsi modal jualan naik tipis namun masih dalam batas aman terkendali (45.1%).
            </p>
          </div>
        </div>

        <!-- Button-in-Button Action -->
        <button
          type="button"
          class="group pl-5 pr-2 py-2 rounded-full font-heading font-bold text-xs bg-amber-600 hover:bg-amber-700 text-white shrink-0 transition-all duration-300 shadow-xs inline-flex items-center gap-3 cursor-pointer"
          @click="resolveAnomaly"
        >
          <span>Kirim Rekomendasi SOP</span>
          <span class="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center transition-transform duration-300 group-hover:translate-x-0.5">
            <HugeiconsIcon :icon="ArrowRight01Icon" :size="13" :stroke-width="2" />
          </span>
        </button>
      </div>
    </div>

    <div
      v-else
      class="p-1 rounded-2xl bg-emerald-200/50 dark:bg-emerald-900/40 border border-emerald-300/40"
    >
      <div class="p-4 rounded-[calc(1rem-0.25rem)] bg-emerald-50 dark:bg-emerald-950/40 flex items-center justify-between text-xs text-emerald-800 dark:text-emerald-300 font-heading font-semibold">
        <div class="flex items-center gap-2.5">
          <HugeiconsIcon :icon="CheckmarkCircle01Icon" :size="17" :stroke-width="2" class="text-emerald-500 shrink-0" />
          <span>Rekomendasi SOP negosiasi supplier telah terkirim via WhatsApp ke Pak Budi (Kopi Senja).</span>
        </div>
        <span class="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-200 text-emerald-900 dark:bg-emerald-900 dark:text-emerald-200 font-bold shrink-0">
          TERTANGANI
        </span>
      </div>
    </div>

    <!-- 4. CLIENT MATRIX TRIAGE (Double-Bezel Hardware Architecture) -->
    <div class="p-1.5 sm:p-2 rounded-[2.25rem] bg-neutral-200/50 dark:bg-neutral-800/40 border border-neutral-300/40 dark:border-neutral-700/30 shadow-xs">
      <div class="p-6 sm:p-8 lg:p-10 rounded-[calc(2.25rem-0.5rem)] bg-white dark:bg-[#141519] border border-neutral-200/80 dark:border-neutral-800/90 shadow-[inset_0_1px_1px_rgba(255,255,255,0.9)] dark:shadow-[inset_0_1px_1px_rgba(255,255,255,0.06)] space-y-6">
        <div class="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4 border-b border-neutral-100 dark:border-neutral-800">
          <div>
            <span class="text-[10px] font-mono font-extrabold uppercase tracking-[0.2em] text-primary-600 dark:text-primary-400 block">
              § 02 // MATRIKS AUDIT KLIEN AKTIF
            </span>
            <h2 class="text-2xl sm:text-3xl font-heading font-extrabold text-neutral-900 dark:text-white tracking-tight mt-1">
              Daftar Portofolio Klien Binaan
            </h2>
            <p class="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5 font-sans">
              Evaluasi berkala 5 pilar dan progres perbaikan tata kelola menuju sertifikasi pendanaan.
            </p>
          </div>

          <!-- Search & Filter Controls -->
          <div class="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <!-- Filter Pills -->
            <div class="inline-flex p-1 rounded-full bg-neutral-100 dark:bg-neutral-800 text-xs font-heading font-semibold shrink-0">
              <button
                v-for="f in filterOptions"
                :key="f.key"
                type="button"
                :class="[
                  'px-3.5 py-1.5 rounded-full transition-all cursor-pointer text-xs',
                  selectedFilter === f.key
                    ? 'bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white shadow-xs'
                    : 'text-neutral-500 hover:text-neutral-900 dark:hover:text-white'
                ]"
                @click="selectedFilter = f.key"
              >
                {{ f.label }}
              </button>
            </div>

            <!-- Search Field -->
            <div class="relative w-full sm:w-60">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-neutral-400">
                <HugeiconsIcon :icon="Search01Icon" :size="15" :stroke-width="1.75" />
              </div>
              <input
                v-model="search"
                type="text"
                placeholder="Cari UMKM / kota..."
                class="w-full pl-9 pr-3.5 py-1.5 rounded-full text-xs border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-900 text-neutral-900 dark:text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
              />
            </div>
          </div>
        </div>

        <!-- Client Cards Grid (Double-Bezel Enclosed) -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div
            v-for="client in filteredClients"
            :key="client.id"
            class="p-1 rounded-3xl bg-neutral-100 dark:bg-neutral-800/60 border border-neutral-200/80 dark:border-neutral-700/50 hover:border-neutral-300 dark:hover:border-neutral-600 transition-colors"
          >
            <div class="p-6 rounded-[calc(1.5rem-0.25rem)] bg-white dark:bg-[#18191e] h-full flex flex-col justify-between space-y-5">
              <!-- Top Row: Identitas Klien & Skor -->
              <div class="flex items-start justify-between gap-3">
                <div class="space-y-1">
                  <span class="text-[10px] font-mono text-neutral-400 font-extrabold uppercase tracking-wider block">
                    ID: {{ client.id }} • {{ client.sector }}
                  </span>
                  <h3 class="font-heading font-extrabold text-xl text-neutral-900 dark:text-white leading-tight">
                    {{ client.name }}
                  </h3>
                  <p class="text-xs text-neutral-500 dark:text-neutral-400 font-sans">
                    Pemilik: <strong class="text-neutral-800 dark:text-neutral-200">{{ client.owner }}</strong> • {{ client.city }}
                  </p>
                </div>

                <!-- Health Badge -->
                <span
                  :class="[
                    'inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold border',
                    client.status === 'healthy'
                      ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800'
                      : client.status === 'warning'
                      ? 'bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800'
                      : 'bg-red-50 dark:bg-red-950/60 text-red-700 dark:text-red-300 border-red-200 dark:border-red-800'
                  ]"
                >
                  <span
                    :class="[
                      'w-1.5 h-1.5 rounded-full',
                      client.status === 'healthy' ? 'bg-emerald-500' : client.status === 'warning' ? 'bg-amber-500' : 'bg-red-500'
                    ]"
                  />
                  <span>Skor: {{ client.healthScore }}/100</span>
                </span>
              </div>

              <!-- Key Metrics Triage Row -->
              <div class="grid grid-cols-3 gap-3 p-3.5 rounded-2xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200/70 dark:border-neutral-800 text-center font-mono">
                <div>
                  <span class="text-[10px] text-neutral-400 block font-heading uppercase font-semibold">Tiket Modal</span>
                  <span class="text-xs font-extrabold text-neutral-900 dark:text-white tabular-nums">
                    Rp {{ (client.fundingTarget / 1000000) }} Jt
                  </span>
                </div>
                <div>
                  <span class="text-[10px] text-neutral-400 block font-heading uppercase font-semibold">Tugas Tuntas</span>
                  <span class="text-xs font-extrabold text-primary-500 tabular-nums">
                    {{ client.tasksCompleted }}/{{ client.totalTasks }}
                  </span>
                </div>
                <div>
                  <span class="text-[10px] text-neutral-400 block font-heading uppercase font-semibold">Margin Kotor</span>
                  <span :class="['text-xs font-extrabold tabular-nums', client.growthPct >= 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-500']">
                    {{ client.growthPct >= 0 ? `+${client.growthPct}%` : `${client.growthPct}%` }}
                  </span>
                </div>
              </div>

              <!-- Footer Actions (Button-in-Button) -->
              <div class="flex items-center justify-between pt-3 border-t border-neutral-100 dark:border-neutral-800 text-xs">
                <span class="text-neutral-400 font-mono text-[11px]">
                  Validasi: {{ client.lastAuditDate }}
                </span>

                <NuxtLink
                  :to="`/konsultan/klien/${client.id}`"
                  class="group pl-3.5 pr-1.5 py-1 rounded-full text-xs font-heading font-semibold text-primary-600 dark:text-primary-400 hover:bg-primary-50 dark:hover:bg-primary-950/60 inline-flex items-center gap-2 transition-all"
                >
                  <span>Periksa Detail Penilaian 5 Pilar</span>
                  <span class="w-6 h-6 rounded-full bg-primary-100 dark:bg-primary-900/60 flex items-center justify-center transition-transform duration-300 group-hover:translate-x-0.5">
                    <HugeiconsIcon :icon="ArrowRight01Icon" :size="12" :stroke-width="2" />
                  </span>
                </NuxtLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- QUICK VALIDATION MODAL (Double-Bezel Architecture) -->
    <div
      v-if="showValidationModal"
      class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-950/60 backdrop-blur-xs animate-in fade-in duration-150"
    >
      <div class="p-1.5 sm:p-2 rounded-[2.25rem] bg-neutral-200/50 dark:bg-neutral-800/60 border border-neutral-300/40 dark:border-neutral-700/40 shadow-2xl max-w-lg w-full">
        <div class="p-6 sm:p-8 rounded-[calc(2.25rem-0.5rem)] bg-white dark:bg-[#141519] border border-neutral-200/80 dark:border-neutral-800 space-y-5">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2.5">
              <div class="w-9 h-9 rounded-xl bg-primary-50 dark:bg-primary-950 text-primary-600 flex items-center justify-center">
                <HugeiconsIcon :icon="CheckmarkCircle01Icon" :size="18" :stroke-width="2" />
              </div>
              <div>
                <span class="text-[10px] font-mono uppercase tracking-wider text-primary-600 font-bold block">VALIDASI LAPORAN KAS</span>
                <h3 class="font-heading font-extrabold text-lg text-neutral-900 dark:text-white leading-tight">
                  Validasi Laporan Kas Klien
                </h3>
              </div>
            </div>
            <button
              type="button"
              class="text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200 text-xs font-mono px-2 py-1 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 cursor-pointer"
              @click="showValidationModal = false"
            >
              ✕ Tutup
            </button>
          </div>

          <div class="p-4 rounded-2xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200/70 dark:border-neutral-800 space-y-2 text-xs">
            <div class="flex justify-between font-mono">
              <span class="text-neutral-500 font-sans">Klien:</span>
              <strong class="text-neutral-900 dark:text-white font-heading">Batik Lestari Heritage (Siti Rahmawati)</strong>
            </div>
            <div class="flex justify-between font-mono">
              <span class="text-neutral-500 font-sans">Periode Kas:</span>
              <span class="font-bold text-neutral-800 dark:text-neutral-200">Agustus 2026 (Rp 45.000.000)</span>
            </div>
            <div class="flex justify-between font-mono">
              <span class="text-neutral-500 font-sans">Bukti Rekening:</span>
              <span class="text-emerald-600 dark:text-emerald-400 font-bold">Rekening Giro BCA Terpisah (Match 100%)</span>
            </div>
          </div>

          <p class="text-xs text-neutral-600 dark:text-neutral-300 leading-relaxed font-sans">
            Dengan menekan tombol di bawah, Anda mengesahkan bahwa laporan kas ini telah memenuhi standar verifikasi konsultan dan valid untuk dimasukkan ke data room investor.
          </p>

          <div class="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              class="px-4 py-2 rounded-full text-xs font-heading font-semibold text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors cursor-pointer"
              @click="showValidationModal = false"
            >
              Batal
            </button>
            <button
              type="button"
              class="group pl-5 pr-2 py-2 rounded-full text-xs font-heading font-bold bg-primary-500 hover:bg-primary-600 text-white transition-all duration-300 shadow-xs cursor-pointer inline-flex items-center gap-2.5"
              @click="approveValidation"
            >
              <span>Sahkan & Validasi Laporan</span>
              <span class="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center transition-transform duration-300 group-hover:translate-x-0.5">
                <HugeiconsIcon :icon="CheckmarkCircle01Icon" :size="13" :stroke-width="2" />
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useKonsultanStore } from '~/stores/konsultan'
import { HugeiconsIcon } from '@hugeicons/vue'
import {
  UserGroupIcon,
  Award01Icon,
  Task01Icon,
  Alert01Icon,
  Search01Icon,
  CheckmarkCircle01Icon,
  ArrowRight01Icon
} from '@hugeicons/core-free-icons'

definePageMeta({
  layout: 'dashboard'
})

const konsultanStore = useKonsultanStore()
const selectedFilter = ref('ALL')
const search = ref('')

const isAnomalyResolved = ref(false)
const showValidationModal = ref(false)
const isValidationApproved = ref(false)

function resolveAnomaly() {
  isAnomalyResolved.value = true
}

function approveValidation() {
  isValidationApproved.value = true
  showValidationModal.value = false
}

const filterOptions = [
  { key: 'ALL', label: 'Semua Klien (4)' },
  { key: 'HEALTHY', label: '🟢 Prima (2)' },
  { key: 'ATTENTION', label: '🟡 Pendampingan (2)' },
  { key: 'READY', label: 'Ready for Funding (2)' }
]

const readyCount = computed(() => {
  return konsultanStore.clients.filter(c => c.fundingStatus === 'READY_FOR_FUNDING').length
})

const filteredClients = computed(() => {
  return konsultanStore.clients.filter(c => {
    const matchFilter = selectedFilter.value === 'ALL' ||
      (selectedFilter.value === 'HEALTHY' && c.status === 'healthy') ||
      (selectedFilter.value === 'ATTENTION' && (c.status === 'warning' || c.status === 'danger')) ||
      (selectedFilter.value === 'READY' && c.fundingStatus === 'READY_FOR_FUNDING')

    const matchSearch = search.value === '' ||
      c.name.toLowerCase().includes(search.value.toLowerCase()) ||
      c.city.toLowerCase().includes(search.value.toLowerCase()) ||
      c.owner.toLowerCase().includes(search.value.toLowerCase())

    return matchFilter && matchSearch
  })
})
</script>
