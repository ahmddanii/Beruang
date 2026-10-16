<template>
  <div class="space-y-6 sm:space-y-8 pb-20 font-sans">
    

    <!-- 2. EXECUTIVE CONSULTANT BANNER -->
    <div class="p-1.5 sm:p-2 rounded-3xl bg-neutral-200/50 dark:bg-neutral-800/40 border border-neutral-300/40 dark:border-neutral-700/30 shadow-xs">
      <div class="p-6 sm:p-8 lg:p-10 rounded-[calc(1.5rem-0.25rem)] bg-white dark:bg-[#13161F] border border-neutral-200/80 dark:border-white/10 relative overflow-hidden">
        <div class="space-y-3 max-w-2xl relative z-10 text-left">

          <h1 class="text-2xl sm:text-3xl lg:text-4xl font-heading font-extrabold text-neutral-900 dark:text-white tracking-tight leading-tight">
            Pusat Diagnosa & Binaan UMKM
          </h1>

          <p class="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed font-sans max-w-xl">
            Bimbing dan pantau perkembangan usaha klien binaanmu, berikan <strong>action plan taktis</strong>, dan sertifikasi kelayakan usaha untuk membuka akses pendanaan investor.
          </p>
        </div>
      </div>
    </div>

    <!-- 3. MACRO METRICS TELEMETRY -->
    <div class="grid grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4">
      <!-- Tile 1: Total Klien Binaan -->
      <div class="card-tactile-gopay p-4 sm:p-5 rounded-2xl text-left space-y-1">
        <div class="flex items-center justify-between text-neutral-400">
          <span class="text-[10px] uppercase tracking-wider font-bold text-neutral-500">Total Binaan</span>
          <HugeiconsIcon :icon="UserGroupIcon" :size="18" :stroke-width="1.8" class="text-[#0081A0]" />
        </div>
        <div class="text-2xl sm:text-3xl font-heading font-extrabold text-neutral-900 dark:text-white tabular-nums pt-1">
          {{ konsultanStore.clients.length }} <span class="text-xs font-normal text-neutral-400 font-sans">Usaha</span>
        </div>
        <span class="text-[11px] text-[#00AA13] dark:text-[#22C55E] font-bold block">Aktif Bimbingan</span>
      </div>

      <!-- Tile 2: Action Plan Berjalan -->
      <div class="card-tactile-gopay p-4 sm:p-5 rounded-2xl text-left space-y-1">
        <div class="flex items-center justify-between text-neutral-400">
          <span class="text-[10px] uppercase tracking-wider font-bold text-neutral-500">Action Plan Diberikan</span>
          <HugeiconsIcon :icon="Task01Icon" :size="18" :stroke-width="1.8" class="text-[#0081A0]" />
        </div>
        <div class="text-2xl sm:text-3xl font-heading font-extrabold text-[#0081A0] dark:text-[#2091AA] tabular-nums pt-1">
          {{ konsultanStore.actionPlans.length }} <span class="text-xs font-normal text-neutral-400 font-sans">Arahan</span>
        </div>
        <span class="text-[11px] text-neutral-500 font-medium block">
          {{ konsultanStore.actionPlans.filter(p => p.status === 'DONE').length }} Selesai Dikerjakan
        </span>
      </div>

      <!-- Tile 3: Ready for Funding -->
      <div class="card-tactile-gopay p-4 sm:p-5 rounded-2xl text-left space-y-1">
        <div class="flex items-center justify-between text-neutral-400">
          <span class="text-[10px] uppercase tracking-wider font-bold text-amber-600 dark:text-amber-400">Siap Modal</span>
          <HugeiconsIcon :icon="Award01Icon" :size="18" :stroke-width="1.8" class="text-amber-500" />
        </div>
        <div class="text-2xl sm:text-3xl font-heading font-extrabold text-emerald-600 dark:text-emerald-400 tabular-nums pt-1">
          {{ readyCount }} <span class="text-xs font-normal text-neutral-400 font-sans">Usaha</span>
        </div>
        <span class="text-[11px] text-neutral-500 font-medium block">Tersertifikasi Grade A</span>
      </div>

      <!-- Tile 4: Kelengkapan Profil Konsultan -->
      <NuxtLink
        to="/konsultan/profil"
        class="card-tactile-gopay p-4 sm:p-5 rounded-2xl text-left space-y-1 group hover:border-[#0081A0] transition-colors"
      >
        <div class="flex items-center justify-between text-neutral-400">
          <span class="text-[10px] uppercase tracking-wider font-bold text-neutral-500">Profil & Berkas</span>
          <HugeiconsIcon :icon="UserCircleIcon" :size="18" :stroke-width="1.8" class="text-[#0081A0] group-hover:scale-105 transition-transform" />
        </div>
        <div class="text-2xl sm:text-3xl font-heading font-extrabold text-[#0081A0] dark:text-[#2091AA] tabular-nums pt-1">
          {{ konsultanStore.profileCompleteness }}%
        </div>
        <span class="text-[11px] text-neutral-500 group-hover:text-[#0081A0] font-medium block flex items-center gap-1">
          <span>{{ konsultanStore.profile.documents.length }} Dokumen Terunggah</span>
          <HugeiconsIcon :icon="ArrowRight01Icon" :size="11" :stroke-width="2" />
        </span>
      </NuxtLink>
    </div>

    <!-- 4. ACTIVE ANOMALY ALERT -->
    <div
      v-if="!isAnomalyResolved"
      class="card-tactile-gopay p-4 sm:p-5 rounded-3xl border border-amber-300/80 bg-amber-50/50 dark:bg-amber-950/20 text-left"
    >
      <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div class="flex items-start gap-3.5">
          <div class="w-10 h-10 rounded-2xl bg-amber-500 text-white flex items-center justify-center shrink-0 shadow-2xs mt-0.5">
            <HugeiconsIcon :icon="Alert01Icon" :size="20" :stroke-width="2" />
          </div>
          <div class="space-y-0.5">
            <div class="flex items-center gap-2">
              <span class="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-amber-200 text-amber-900 dark:bg-amber-900/80 dark:text-amber-200">
                Deteksi Anomali
              </span>
              <span class="text-xs text-neutral-500">Kopi Senja Nusantara</span>
            </div>
            <h4 class="font-heading font-extrabold text-sm sm:text-base text-neutral-900 dark:text-white leading-tight">
              Kenaikan Harga Susu Segar (+3.2%) pada Menu Kopi
            </h4>
            <p class="text-xs text-neutral-600 dark:text-neutral-300 leading-relaxed font-sans max-w-xl">
              Terjadi lonjakan harga susu segar pada pekan ke-3 September. Disarankan memberikan Action Plan efisiensi takaran atau evaluasi kontrak supplier.
            </p>
          </div>
        </div>

        <button
          type="button"
          class="px-4 py-2 rounded-full font-bold text-xs bg-amber-600 hover:bg-amber-700 text-white shrink-0 transition-all active:scale-[0.98] shadow-xs inline-flex items-center gap-2 cursor-pointer"
          @click="resolveAnomaly"
        >
          <span>Kirim Rekomendasi SOP</span>
          <HugeiconsIcon :icon="ArrowRight01Icon" :size="13" :stroke-width="2" />
        </button>
      </div>
    </div>

    <!-- 5. DAFTAR PORTOFOLIO KLIEN BINAAN -->
    <div class="card-tactile-gopay p-6 sm:p-8 rounded-3xl space-y-6 text-left">
      <!-- Section Header & Filter Toolbar -->
      <div class="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4 border-b border-neutral-200/70 dark:border-white/10">
        <div>
          <span class="text-xs font-bold text-[#0081A0] dark:text-[#2091AA] uppercase tracking-wider block">
            Daftar Usaha Binaan
          </span>
          <h2 class="text-xl sm:text-2xl font-heading font-extrabold text-neutral-900 dark:text-white tracking-tight mt-0.5">
            Daftar Klien yang Kamu Bina
          </h2>
          <p class="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5 font-sans">
            Kelola arahan perbaikan, pantau kepatuhan laporan kas harian, dan validasi kelayakan bisnis binaan.
          </p>
        </div>

        <!-- Search & Filter Controls -->
        <div class="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
          <!-- Filter Pills -->
          <div class="inline-flex p-1 rounded-full bg-neutral-100 dark:bg-[#1A1D26] text-xs font-semibold shrink-0 border border-neutral-200/60 dark:border-white/10">
            <button
              v-for="f in filterOptions"
              :key="f.key"
              type="button"
              :class="[
                'px-3 py-1.5 rounded-full transition-all cursor-pointer text-xs',
                selectedFilter === f.key
                  ? 'bg-white dark:bg-[#13161F] text-[#0081A0] dark:text-[#2091AA] font-bold shadow-xs'
                  : 'text-neutral-500 hover:text-neutral-900 dark:hover:text-white'
              ]"
              @click="selectedFilter = f.key"
            >
              {{ f.label }}
            </button>
          </div>

          <!-- Search Field -->
          <div class="relative w-full sm:w-56">
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-neutral-400">
              <HugeiconsIcon :icon="Search01Icon" :size="15" :stroke-width="1.75" />
            </div>
            <input
              v-model="search"
              type="text"
              placeholder="Cari UMKM / kota..."
              class="w-full pl-9 pr-3.5 py-1.5 rounded-full text-xs border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-[#1A1D26] text-neutral-900 dark:text-white placeholder-neutral-400 focus:outline-none focus:border-[#0081A0] focus:ring-2 focus:ring-[#0081A0]/20"
            />
          </div>
        </div>
      </div>

      <!-- Client Cards Grid -->
      <div v-if="filteredClients.length > 0" class="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div
          v-for="client in filteredClients"
          :key="client.id"
          class="p-5 sm:p-6 rounded-2xl bg-white dark:bg-[#18191E] border border-neutral-200/80 dark:border-white/10 hover:border-[#0081A0]/60 dark:hover:border-[#0081A0]/60 transition-all shadow-xs flex flex-col justify-between space-y-4"
        >
          <!-- Top Row: Identitas Klien & Skor -->
          <div class="flex items-start justify-between gap-3">
            <div class="space-y-1">
              <span class="text-[10px] text-neutral-400 font-bold uppercase tracking-wider block">
                {{ client.sector }}
              </span>
              <h3 class="font-heading font-extrabold text-lg text-neutral-900 dark:text-white leading-tight">
                {{ client.name }}
              </h3>
              <p class="text-xs text-neutral-500 dark:text-neutral-400 font-sans">
                Pemilik: <strong class="text-neutral-800 dark:text-neutral-200">{{ client.owner }}</strong> • {{ client.city }}
              </p>
            </div>

            <!-- Health Badge -->
            <span
              :class="[
                'inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border shrink-0',
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
          <div class="grid grid-cols-3 gap-2.5 p-3 rounded-xl bg-neutral-50 dark:bg-[#13161F] border border-neutral-200/70 dark:border-white/5 text-center">
            <div>
              <span class="text-[10px] text-neutral-400 block font-semibold uppercase">Target Modal</span>
              <span class="text-xs font-extrabold text-neutral-900 dark:text-white tabular-nums">
                Rp {{ (client.fundingTarget / 1000000).toFixed(0) }} Jt
              </span>
            </div>
            <div>
              <span class="text-[10px] text-neutral-400 block font-semibold uppercase">Action Plan</span>
              <span class="text-xs font-extrabold text-[#0081A0] dark:text-[#2091AA] tabular-nums">
                {{ client.tasksCompleted }}/{{ client.totalTasks }} Tuntas
              </span>
            </div>
            <div>
              <span class="text-[10px] text-neutral-400 block font-semibold uppercase">Pertumbuhan</span>
              <span :class="['text-xs font-extrabold tabular-nums', client.growthPct >= 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-500']">
                {{ client.growthPct >= 0 ? `+${client.growthPct}%` : `${client.growthPct}%` }}
              </span>
            </div>
          </div>

          <!-- Footer Actions: Beri Action Plan & Detail Diagnosa -->
          <div class="flex items-center justify-between pt-3 border-t border-neutral-100 dark:border-neutral-800 text-xs gap-2">
            <span class="text-neutral-400 text-[11px] truncate">
              Audit: {{ client.lastAuditDate }}
            </span>

            <div class="flex items-center gap-2 shrink-0">
              <NuxtLink
                :to="`/konsultan/rencana-aksi?client=${client.id}`"
                class="px-3 py-1.5 rounded-full border border-neutral-200 dark:border-neutral-700 hover:border-[#0081A0] text-[#0081A0] dark:text-[#2091AA] font-bold text-xs transition-colors flex items-center gap-1.5 bg-white dark:bg-[#13161F]"
              >
                <HugeiconsIcon :icon="Task01Icon" :size="13" :stroke-width="2" />
                <span>Action Plan</span>
              </NuxtLink>

              <NuxtLink
                :to="`/konsultan/klien/${client.id}`"
                class="px-3.5 py-1.5 rounded-full bg-[#0081A0] hover:bg-[#00708C] text-white font-bold text-xs transition-all flex items-center gap-1 shadow-2xs"
              >
                <span>Diagnosa 5 Pilar</span>
                <HugeiconsIcon :icon="ArrowRight01Icon" :size="12" :stroke-width="2" />
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>

      <div
        v-else
        class="py-10 text-center text-xs text-neutral-500"
      >
        Tidak ada data klien binaan pada filter pencarian ini.
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
  ArrowRight01Icon,
  UserCircleIcon
} from '@hugeicons/core-free-icons'

definePageMeta({
  layout: 'dashboard'
})

const konsultanStore = useKonsultanStore()
const selectedFilter = ref('ALL')
const search = ref('')

const isAnomalyResolved = ref(false)

function resolveAnomaly() {
  isAnomalyResolved.value = true
}

const filterOptions = [
  { key: 'ALL', label: 'Semua Binaan' },
  { key: 'HEALTHY', label: 'Prima' },
  { key: 'ATTENTION', label: 'Perlu Pendampingan' },
  { key: 'READY', label: 'Siap Modal' }
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
