<template>
  <div class="space-y-6 sm:space-y-8 pb-20 font-sans">
    
    <!-- 1. EXECUTIVE CONSULTANT GREETING -->
    <div class="p-1.5 sm:p-2 rounded-3xl bg-neutral-200/50 dark:bg-neutral-800/40 border border-neutral-300/40 dark:border-neutral-700/30 shadow-xs">
      <div class="p-6 sm:p-8 lg:p-9 rounded-[calc(1.5rem-0.25rem)] bg-white dark:bg-[#13161F] border border-neutral-200/80 dark:border-white/10 relative overflow-hidden">
        <div class="space-y-2 max-w-3xl relative z-10 text-left">
          <h1 class="text-2xl sm:text-3xl lg:text-4xl font-heading font-extrabold text-neutral-900 dark:text-white tracking-tight leading-tight">
            Halo, {{ authStore.currentUser?.name || konsultanStore.profile.name || 'Konsultan' }}
          </h1>

          <p class="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed font-sans max-w-2xl">
            Berikut rangkuman aktivitas bimbingan tokomu hari ini. Tangani <strong class="text-amber-600 dark:text-amber-400">anomali masalah</strong> yang butuh perhatian segera, atau buka menu pintasan untuk menuju tugasmu.
          </p>
        </div>
      </div>
    </div>

    <!-- 2. MACRO METRICS TELEMETRY (4 BANNER CARDS KONSISTEN DENGAN DASHBOARD UMKM) -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-stretch">
      <!-- Card 1: Total Klien Binaan -->
      <BMetricBannerCard
        title="KLIEN BINAAN"
        :icon="UserGroupIcon"
        :value="konsultanStore.clients.length"
        unit="Usaha"
        subtitle="Kesiapan"
        :subvalue="`${readyCount} Siap Modal`"
        subvalue-color="green"
        action-label="Lihat Klien"
        to="/konsultan/klien"
      />

      <!-- Card 2: Permintaan Masuk -->
      <BMetricBannerCard
        title="PERMINTAAN"
        :icon="UserAdd01Icon"
        :value="konsultanStore.pendingRequestsCount"
        unit="UMKM"
        subtitle="Tindakan"
        :subvalue="konsultanStore.pendingRequestsCount > 0 ? `${konsultanStore.pendingRequestsCount} Menunggu` : 'Tuntas'"
        :subvalue-color="konsultanStore.pendingRequestsCount > 0 ? 'amber' : 'green'"
        action-label="Tinjau Masuk"
        to="/konsultan/klien?tab=permintaan"
      />

      <!-- Card 3: Action Plan Diberikan -->
      <BMetricBannerCard
        title="ACTION PLAN"
        :icon="Task01Icon"
        :value="konsultanStore.actionPlans.length"
        unit="Arahan"
        subtitle="Realisasi"
        :subvalue="`${completedPlansCount} Selesai`"
        subvalue-color="green"
        action-label="Kelola Aksi"
        to="/konsultan/rencana-aksi"
      />

      <!-- Card 4: Validasi Kas -->
      <BMetricBannerCard
        title="VALIDASI KAS"
        :icon="CheckmarkCircle01Icon"
        :value="konsultanStore.validationsQueue.length"
        unit="Laporan"
        subtitle="Antrean"
        :subvalue="konsultanStore.validationsQueue.length > 0 ? `${konsultanStore.validationsQueue.length} Menunggu` : 'Sudah Valid'"
        :subvalue-color="konsultanStore.validationsQueue.length > 0 ? 'amber' : 'green'"
        action-label="Validasi Kas"
        to="/konsultan/validasi"
      />
    </div>

    <!-- 3. RADAR MASALAH & TINDAKAN CEPAT (ISSUE RADAR & DIRECT NAVIGATION) -->
    <div class="card-tactile-gopay p-6 sm:p-8 rounded-3xl space-y-6 text-left border-l-4 border-l-amber-500">
      <!-- Section Header -->
      <div class="space-y-1 pb-4 border-b border-neutral-200/70 dark:border-white/10">
        <h2 class="text-xl sm:text-2xl font-heading font-extrabold text-neutral-900 dark:text-white tracking-tight">
          Isu yang Memerlukan Respons Segera
        </h2>
        <p class="text-xs text-neutral-500 dark:text-neutral-400 font-sans">
          Klik tombol tindakan pada masing-masing isu untuk langsung menuju halaman penanganan yang tepat.
        </p>
      </div>

      <!-- Urgent Issue Action Cards -->
      <div v-if="urgentIssues.length > 0" class="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div
          v-for="issue in urgentIssues"
          :key="issue.id"
          class="p-4 sm:p-5 rounded-2xl bg-white dark:bg-[#18191E] border shadow-xs flex flex-col justify-between space-y-3"
          :class="issue.borderClass"
        >
          <div class="space-y-1.5">
            <div class="flex items-center justify-between gap-2">
              <span
                class="px-2 py-0.5 rounded text-[10px] font-bold uppercase"
                :class="issue.badgeClass"
              >
                {{ issue.badgeText }}
              </span>
              <span class="text-[11px] text-neutral-400 font-sans">{{ issue.timestamp }}</span>
            </div>
            <h3 class="font-bold text-sm sm:text-base text-neutral-900 dark:text-white leading-tight font-heading">
              {{ issue.title }}
            </h3>
            <p class="text-xs text-neutral-600 dark:text-neutral-300 leading-relaxed font-sans">
              {{ issue.description }}
            </p>
          </div>

          <div class="flex items-center justify-between pt-2 border-t border-neutral-100 dark:border-white/5 gap-2">
            <span class="text-[11px] text-neutral-400 font-sans">{{ issue.location }}</span>
            <div class="flex items-center gap-2">
              <NuxtLink
                v-if="issue.secondaryAction"
                :to="issue.secondaryAction.to"
                class="px-3 py-1.5 rounded-full border border-neutral-200 dark:border-neutral-700 font-bold text-xs transition-colors"
                :class="issue.secondaryAction.class"
              >
                {{ issue.secondaryAction.label }}
              </NuxtLink>
              <NuxtLink
                :to="issue.primaryAction.to"
                class="px-3.5 py-1.5 rounded-full text-white font-bold text-xs transition-all shadow-2xs flex items-center gap-1"
                :class="issue.primaryAction.class"
              >
                <span>{{ issue.primaryAction.label }}</span>
                <HugeiconsIcon :icon="ArrowRight01Icon" :size="12" :stroke-width="2" />
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>

      <!-- Empty State if All Healthy -->
      <div
        v-else
        class="py-8 px-6 rounded-2xl bg-white dark:bg-[#18191E] border border-emerald-200 dark:border-emerald-900/40 text-center space-y-2"
      >
        <div class="w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto">
          <HugeiconsIcon :icon="CheckmarkCircle01Icon" :size="24" :stroke-width="2" />
        </div>
        <h3 class="font-bold text-base text-neutral-900 dark:text-white">
          Semua Klien Terpantau Sehat & Tertib
        </h3>
        <p class="text-xs text-neutral-500 dark:text-neutral-400 max-w-md mx-auto">
          Tidak ada anomali lonjakan biaya atau permohonan yang menunggu konfirmasi saat ini. Semua laporan kas bulan berjalan terkendali.
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useAuthStore } from '~/stores/auth'
import { useKonsultanStore } from '~/stores/konsultan'
import BMetricBannerCard from '~/components/base/BMetricBannerCard.vue'
import { HugeiconsIcon } from '@hugeicons/vue'
import {
  UserGroupIcon,
  UserAdd01Icon,
  Task01Icon,
  CheckmarkCircle01Icon,
  ArrowRight01Icon
} from '@hugeicons/core-free-icons'

definePageMeta({
  layout: 'dashboard'
})

const authStore = useAuthStore()
const konsultanStore = useKonsultanStore()

onMounted(async () => {
  await Promise.all([
    konsultanStore.fetchProfile(),
    konsultanStore.fetchClients(),
    konsultanStore.fetchRequests(),
    konsultanStore.fetchActionPlans(),
    konsultanStore.fetchValidations(),
    konsultanStore.fetchAlerts(),
  ])
})

const readyCount = computed(() => {
  return konsultanStore.clients.filter(c => c.fundingStatus === 'READY_FOR_FUNDING').length
})

const completedPlansCount = computed(() => {
  return konsultanStore.actionPlans.filter(p => p.status === 'DONE').length
})

interface DashboardUrgentIssue {
  id: string
  badgeText: string
  badgeClass: string
  borderClass: string
  timestamp: string
  title: string
  description: string
  location: string
  primaryAction: { label: string; to: string; class: string }
  secondaryAction?: { label: string; to: string; class: string }
}

const urgentIssues = computed<DashboardUrgentIssue[]>(() => {
  const issues: DashboardUrgentIssue[] = []

  // 1. Alerts Anomali dari DB
  for (const alert of konsultanStore.alerts) {
    if (alert.dismissed) continue
    const isHigh = alert.severity === 'high'
    issues.push({
      id: alert.id,
      badgeText: isHigh ? 'Kritis • Margin Turun' : 'Peringatan • HPP Naik',
      badgeClass: isHigh
        ? 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300'
        : 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300',
      borderClass: isHigh
        ? 'border-rose-200 dark:border-rose-900/40'
        : 'border-amber-200 dark:border-amber-900/40',
      timestamp: alert.timestamp || 'Hari ini',
      title: `${alert.clientName}: ${alert.title}`,
      description: alert.message,
      location: 'UMKM Binaan',
      secondaryAction: {
        label: 'Diagnosa Usaha',
        to: `/konsultan/klien/${alert.clientId}`,
        class: isHigh ? 'text-rose-600 dark:text-rose-400 hover:border-rose-500' : 'text-amber-600 dark:text-amber-400 hover:border-amber-500',
      },
      primaryAction: {
        label: isHigh ? 'Beri Solusi' : 'Beri Action Plan',
        to: `/konsultan/rencana-aksi?client=${alert.clientId}`,
        class: isHigh ? 'bg-rose-600 hover:bg-rose-700' : 'bg-amber-600 hover:bg-amber-700',
      },
    })
  }

  // 2. Permintaan bimbingan masuk
  if (konsultanStore.pendingRequestsCount > 0) {
    const firstReq = konsultanStore.clientRequests.find(r => r.status === 'PENDING')
    const count = konsultanStore.pendingRequestsCount
    issues.push({
      id: 'pending-requests',
      badgeText: `${count} Permintaan Masuk`,
      badgeClass: 'bg-[#0081A0]/10 text-[#0081A0] dark:bg-[#0081A0]/20 dark:text-[#2091AA]',
      borderClass: 'border-[#0081A0]/30 dark:border-[#0081A0]/20',
      timestamp: firstReq?.requestedAt || 'Hari ini',
      title: count > 1
        ? `${firstReq?.businessName || 'UMKM Baru'} & ${count - 1} UMKM Lainnya`
        : `${firstReq?.businessName || 'UMKM Baru'}: Pengajuan Bimbingan Baru`,
      description: firstReq?.message
        ? `"${firstReq.message}"`
        : 'Pelaku usaha memerlukan bimbingan terstruktur untuk penataan kas dan persiapan pendanaan usaha.',
      location: firstReq?.city || 'Jawa Barat',
      primaryAction: {
        label: 'Tinjau & Terima Permintaan',
        to: '/konsultan/klien?tab=permintaan',
        class: 'bg-[#0081A0] hover:bg-[#00708C]',
      },
    })
  }

  // 3. Antrean validasi kas bulanan
  if (konsultanStore.validationsQueue.length > 0) {
    const firstVal = konsultanStore.validationsQueue[0]
    issues.push({
      id: 'pending-validations',
      badgeText: `${konsultanStore.validationsQueue.length} Laporan Menunggu Sah`,
      badgeClass: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300',
      borderClass: 'border-emerald-200 dark:border-emerald-900/40',
      timestamp: firstVal.submittedAt || 'Bulan ini',
      title: `${firstVal.clientName}: Validasi Kas ${firstVal.month}`,
      description: firstVal.notes || 'Pelaku UMKM telah melampirkan berkas pembukuan kas bulanan dan butuh verifikasi konsultan.',
      location: 'Laporan Kas Klien',
      primaryAction: {
        label: 'Validasi Laporan Kas',
        to: '/konsultan/validasi',
        class: 'bg-emerald-600 hover:bg-emerald-700',
      },
    })
  }

  return issues
})
</script>
