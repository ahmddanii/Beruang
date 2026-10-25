<template>
  <div ref="adminOverviewRef" class="space-y-6 sm:space-y-8 pb-16 font-poppins text-neutral-900 dark:text-neutral-100">
    <!-- 1. Top Header: Identical to UMKM Beranda -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 min-h-[44px]">
      <div class="flex items-center gap-2.5 sm:gap-3">
        <HugeiconsIcon
          :icon="Home03Icon"
          :size="26"
          :stroke-width="2.2"
          class="text-neutral-900 dark:text-white shrink-0"
        />
        <h1 class="font-poppins font-semibold text-2xl sm:text-3xl text-neutral-900 dark:text-white tracking-tight leading-tight">
          Beranda
        </h1>
      </div>

      <div class="flex items-center gap-2.5 shrink-0 w-full sm:w-auto [&>*]:w-full sm:[&>*]:w-auto">
        <NuxtLink
          to="/admin/umkm"
          class="btn-pill-action justify-center"
        >
          <HugeiconsIcon :icon="Store01Icon" :size="16" :stroke-width="2" />
          <span>Kemitraan</span>
        </NuxtLink>
        <NuxtLink
          to="/admin/penugasan"
          class="btn-pill-action justify-center"
        >
          <HugeiconsIcon :icon="UserGroupIcon" :size="16" :stroke-width="2" />
          <span>Konsultan</span>
        </NuxtLink>
      </div>
    </div>

    <!-- 2. Metric Container: 4 Equal Width Cards (Identical .stat-card-clean Typography & Geometry to UMKM Beranda) -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 items-stretch w-full">
      <!-- Card 1: Total UMKM -->
      <div class="gsap-admin-card gsap-stat-card flex-1 w-full">
        <div class="stat-card-clean transition-all duration-200">
          <div class="flex items-center justify-between w-full gap-2">
            <div class="flex items-center gap-2 sm:gap-2.5 min-w-0">
              <div class="stat-card-icon-box">
                <HugeiconsIcon :icon="Store01Icon" :size="17" :stroke-width="2.0" class="text-[#156374] dark:text-[#50AABF] shrink-0" />
              </div>
              <span class="text-[13px] xl:text-[14px] font-poppins font-semibold text-neutral-800 dark:text-neutral-100 capitalize truncate tracking-[-0.01em]">
                Total UMKM
              </span>
            </div>
            <div class="stat-card-badge badge-green">
              <span>+{{ stats.newUmkmThisMonth || 0 }} Baru</span>
            </div>
          </div>

          <div class="my-auto py-2.5 sm:py-3.5">
            <span class="text-xl sm:text-[22px] lg:text-[21px] xl:text-[24px] font-poppins font-semibold text-neutral-900 dark:text-white tabular-nums tracking-[-0.02em] whitespace-nowrap block leading-tight">
              {{ stats.totalUmkm }} Usaha
            </span>
          </div>

          <div class="stat-card-actions">
            <NuxtLink to="/admin/umkm" class="btn-pill-action">
              <span>Lihat UMKM</span>
              <HugeiconsIcon :icon="ArrowRight01Icon" :size="16" :stroke-width="2" />
            </NuxtLink>
          </div>
        </div>
      </div>

      <!-- Card 2: Konsultan Aktif -->
      <div class="gsap-admin-card gsap-stat-card flex-1 w-full">
        <div class="stat-card-clean transition-all duration-200">
          <div class="flex items-center justify-between w-full gap-2">
            <div class="flex items-center gap-2 sm:gap-2.5 min-w-0">
              <div class="stat-card-icon-box">
                <HugeiconsIcon :icon="Briefcase01Icon" :size="17" :stroke-width="2.0" class="text-[#156374] dark:text-[#50AABF] shrink-0" />
              </div>
              <span class="text-[13px] xl:text-[14px] font-poppins font-semibold text-neutral-800 dark:text-neutral-100 capitalize truncate tracking-[-0.01em]">
                Konsultan Aktif
              </span>
            </div>
            <div class="stat-card-badge badge-green">
              <span>BNSP</span>
            </div>
          </div>

          <div class="my-auto py-2.5 sm:py-3.5">
            <span class="text-xl sm:text-[22px] lg:text-[21px] xl:text-[24px] font-poppins font-semibold text-neutral-900 dark:text-white tabular-nums tracking-[-0.02em] whitespace-nowrap block leading-tight">
              {{ stats.activeConsultants }} Mitra
            </span>
          </div>

          <div class="stat-card-actions">
            <NuxtLink to="/admin/penugasan" class="btn-pill-action">
              <span>Konsultan</span>
              <HugeiconsIcon :icon="ArrowRight01Icon" :size="16" :stroke-width="2" />
            </NuxtLink>
          </div>
        </div>
      </div>

      <!-- Card 3: Siap Didanai -->
      <div class="gsap-admin-card gsap-stat-card flex-1 w-full">
        <div class="stat-card-clean transition-all duration-200">
          <div class="flex items-center justify-between w-full gap-2">
            <div class="flex items-center gap-2 sm:gap-2.5 min-w-0">
              <div class="stat-card-icon-box">
                <HugeiconsIcon :icon="Award01Icon" :size="17" :stroke-width="2.0" class="text-[#156374] dark:text-[#50AABF] shrink-0" />
              </div>
              <span class="text-[13px] xl:text-[14px] font-poppins font-semibold text-neutral-800 dark:text-neutral-100 capitalize truncate tracking-[-0.01em]">
                Siap Didanai
              </span>
            </div>
            <div class="stat-card-badge badge-green">
              <span>Terverifikasi</span>
            </div>
          </div>

          <div class="my-auto py-2.5 sm:py-3.5">
            <span class="text-xl sm:text-[22px] lg:text-[21px] xl:text-[24px] font-poppins font-semibold text-neutral-900 dark:text-white tabular-nums tracking-[-0.02em] whitespace-nowrap block leading-tight">
              {{ stats.readyForFunding }} Usaha
            </span>
          </div>

          <div class="stat-card-actions">
            <NuxtLink to="/admin/sertifikasi" class="btn-pill-action">
              <span>Sertifikasi</span>
              <HugeiconsIcon :icon="ArrowRight01Icon" :size="16" :stroke-width="2" />
            </NuxtLink>
          </div>
        </div>
      </div>

      <!-- Card 4: Modal Tersalur -->
      <div class="gsap-admin-card gsap-stat-card flex-1 w-full">
        <div class="stat-card-clean transition-all duration-200">
          <div class="flex items-center justify-between w-full gap-2">
            <div class="flex items-center gap-2 sm:gap-2.5 min-w-0">
              <div class="stat-card-icon-box">
                <HugeiconsIcon :icon="Coins01Icon" :size="17" :stroke-width="2.0" class="text-[#156374] dark:text-[#50AABF] shrink-0" />
              </div>
              <span class="text-[13px] xl:text-[14px] font-poppins font-semibold text-neutral-800 dark:text-neutral-100 capitalize truncate tracking-[-0.01em]">
                Modal Tersalur
              </span>
            </div>
            <div class="stat-card-badge badge-green">
              <span>Lancar</span>
            </div>
          </div>

          <div class="my-auto py-2.5 sm:py-3.5">
            <span class="text-xl sm:text-[22px] lg:text-[21px] xl:text-[24px] font-poppins font-semibold text-neutral-900 dark:text-white tabular-nums tracking-[-0.02em] whitespace-nowrap block leading-tight">
              {{ stats.totalCapitalDeployed }}
            </span>
          </div>

          <div class="stat-card-actions">
            <NuxtLink to="/admin/investasi" class="btn-pill-action">
              <span>Alur Modal</span>
              <HugeiconsIcon :icon="ArrowRight01Icon" :size="16" :stroke-width="2" />
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>

    <!-- 3. Kemitraan UMKM Terkini (Tanpa Skor Pills, Menggunakan Tombol Putih Standar & Skala Teks UMKM) -->
    <section class="gsap-admin-section card-tactile-gopay rounded-[18px] p-6 sm:p-8 space-y-6 font-poppins">
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-neutral-100 dark:border-neutral-800/80">
        <div class="min-w-0 pr-2 space-y-1.5">
          <h2 class="text-lg sm:text-[21px] font-poppins font-bold text-neutral-900 dark:text-white tracking-tight">
            Kemitraan UMKM Terkini
          </h2>
          <p class="text-xs sm:text-[14px] font-poppins text-neutral-500 dark:text-neutral-400 leading-normal">
            Pemetaan UMKM binaan, konsultan pendamping yang ditugaskan, dan investor yang sedang terhubung.
          </p>
        </div>

        <NuxtLink
          to="/admin/umkm"
          class="btn-pill-action shrink-0 self-start sm:self-center"
        >
          <span>Lihat Semua</span>
          <HugeiconsIcon :icon="ArrowRight01Icon" :size="16" :stroke-width="2" />
        </NuxtLink>
      </div>

      <div class="space-y-3">
        <div
          v-for="item in topPartnerships"
          :key="item.id"
          class="p-4 sm:p-5 rounded-[14px] border border-[#CBD5E1] dark:border-neutral-800 bg-white dark:bg-[#13161F] flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4"
        >
          <!-- UMKM -->
          <div class="flex items-center gap-3.5 min-w-[230px]">
            <div class="w-10 h-10 rounded-full bg-[#E6F4F7] dark:bg-[#156374]/25 text-[#156374] dark:text-[#50AABF] flex items-center justify-center font-semibold text-sm shrink-0">
              {{ item.name.slice(0, 2).toUpperCase() }}
            </div>
            <div>
              <span class="font-semibold text-sm sm:text-base text-neutral-900 dark:text-white block leading-snug">
                {{ item.name }}
              </span>
              <span class="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 block mt-0.5">
                {{ item.owner }} • {{ item.sector }}
              </span>
            </div>
          </div>

          <!-- Consultant -->
          <div class="flex items-center gap-2.5 min-w-[210px]">
            <HugeiconsIcon :icon="Briefcase01Icon" :size="18" class="text-[#156374] dark:text-[#50AABF] shrink-0" />
            <div>
              <span class="text-xs font-medium text-neutral-500 dark:text-neutral-400 block">Konsultan Pendamping</span>
              <span class="text-sm font-semibold text-neutral-900 dark:text-white block mt-0.5">
                {{ item.consultantName }}
              </span>
            </div>
          </div>

          <!-- Investor -->
          <div class="flex items-center gap-2.5 min-w-[230px]">
            <HugeiconsIcon :icon="Coins01Icon" :size="18" class="text-[#00800e] dark:text-[#00C058] shrink-0" />
            <div>
              <span class="text-xs font-medium text-neutral-500 dark:text-neutral-400 block">Investor Terhubung</span>
              <span class="text-sm font-semibold text-neutral-900 dark:text-white block mt-0.5">
                {{ item.investorName }}
              </span>
              <span class="text-xs text-neutral-500 dark:text-neutral-400">
                {{ item.investorStage }}
              </span>
            </div>
          </div>

          <!-- Action Button Only (Score Pill Removed as Requested) -->
          <div class="flex items-center gap-2.5 shrink-0 self-end lg:self-center">
            <NuxtLink
              to="/admin/umkm"
              class="btn-pill-action"
            >
              <span>Detail</span>
              <HugeiconsIcon :icon="ArrowRight01Icon" :size="16" :stroke-width="2" />
            </NuxtLink>
          </div>
        </div>
      </div>
    </section>

    <!-- 4. Distribusi Kesiapan & Aktivitas Ekosistem -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-stretch">
      <!-- 1. Distribusi Kesiapan (Doughnut Chart Beruang, Tanpa Label Grade) -->
      <section class="gsap-admin-section card-tactile-gopay rounded-[18px] p-6 sm:p-8 flex flex-col justify-between space-y-5 font-poppins">
        <div class="flex items-center justify-between gap-4">
          <div class="min-w-0 pr-2 space-y-1">
            <h2 class="text-lg sm:text-[21px] font-poppins font-bold text-neutral-900 dark:text-white tracking-tight">
              Distribusi Kesiapan UMKM
            </h2>
            <p class="text-xs sm:text-sm font-poppins text-neutral-500 dark:text-neutral-400 leading-normal">
              Proporsi kesiapan usaha binaan berdasarkan status pendampingan bisnis.
            </p>
          </div>
          <NuxtLink
            to="/admin/sertifikasi"
            class="btn-pill-action shrink-0"
          >
            <span>Sertifikasi</span>
            <HugeiconsIcon :icon="ArrowRight01Icon" :size="16" :stroke-width="2" />
          </NuxtLink>
        </div>

        <!-- Donut Chart Canvas Container with Center Label -->
        <div class="relative w-full h-44 sm:h-48 flex items-center justify-center my-auto">
          <canvas ref="donutCanvas" class="max-w-[190px] max-h-[190px]" />
          <div class="absolute inset-0 flex flex-col items-center justify-center pointer-events-none select-none">
            <span class="text-2xl sm:text-3xl font-bold font-poppins text-neutral-900 dark:text-white tabular-nums leading-none">
              {{ stats.totalUmkm }}
            </span>
            <span class="text-[11px] sm:text-xs text-neutral-500 dark:text-neutral-400 font-medium mt-1">
              Total UMKM
            </span>
          </div>
        </div>

        <!-- 3 Status Distribution Legends (Clean, No Grades, No Raw Scores) -->
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-3 border-t border-neutral-100 dark:border-neutral-800">
          <div class="p-2.5 sm:p-3 rounded-[12px] bg-neutral-50/70 dark:bg-neutral-900/60 border border-[#CBD5E1]/60 dark:border-neutral-800">
            <div class="flex items-center gap-2">
              <span class="w-2.5 h-2.5 rounded-full bg-[#00800e] dark:bg-[#00C058] shrink-0" />
              <span class="text-xs text-neutral-700 dark:text-neutral-300 font-medium truncate">Siap Didanai</span>
            </div>
            <p class="text-sm font-bold text-neutral-900 dark:text-white tabular-nums mt-1">
              {{ stats.readyForFunding }} <span class="text-xs font-normal text-neutral-500 dark:text-neutral-400">({{ stats.totalUmkm ? Math.round((stats.readyForFunding / stats.totalUmkm) * 100) : 0 }}%)</span>
            </p>
          </div>

          <div class="p-2.5 sm:p-3 rounded-[12px] bg-neutral-50/70 dark:bg-neutral-900/60 border border-[#CBD5E1]/60 dark:border-neutral-800">
            <div class="flex items-center gap-2">
              <span class="w-2.5 h-2.5 rounded-full bg-[#156374] dark:bg-[#50AABF] shrink-0" />
              <span class="text-xs text-neutral-700 dark:text-neutral-300 font-medium truncate">Pendampingan</span>
            </div>
            <p class="text-sm font-bold text-neutral-900 dark:text-white tabular-nums mt-1">
              {{ inMentoringCount }} <span class="text-xs font-normal text-neutral-500 dark:text-neutral-400">({{ stats.totalUmkm ? Math.round((inMentoringCount / stats.totalUmkm) * 100) : 0 }}%)</span>
            </p>
          </div>

          <div class="p-2.5 sm:p-3 rounded-[12px] bg-neutral-50/70 dark:bg-neutral-900/60 border border-[#CBD5E1]/60 dark:border-neutral-800">
            <div class="flex items-center gap-2">
              <span class="w-2.5 h-2.5 rounded-full bg-[#F59E0B] shrink-0" />
              <span class="text-xs text-neutral-700 dark:text-neutral-300 font-medium truncate">Inkubasi Awal</span>
            </div>
            <p class="text-sm font-bold text-neutral-900 dark:text-white tabular-nums mt-1">
              {{ stats.pendingAssignments }} <span class="text-xs font-normal text-neutral-500 dark:text-neutral-400">({{ stats.totalUmkm ? Math.round((stats.pendingAssignments / stats.totalUmkm) * 100) : 0 }}%)</span>
            </p>
          </div>
        </div>
      </section>

      <!-- 2. Aktivitas Ekosistem Terkini -->
      <section class="gsap-admin-section card-tactile-gopay rounded-[18px] p-6 sm:p-8 flex flex-col justify-between space-y-6 font-poppins">
        <div class="flex items-center justify-between gap-4">
          <div class="min-w-0 pr-2 space-y-1.5">
            <h2 class="text-lg sm:text-[21px] font-poppins font-bold text-neutral-900 dark:text-white tracking-tight">
              Aktivitas Ekosistem Terkini
            </h2>
            <p class="text-xs sm:text-[14px] font-poppins text-neutral-500 dark:text-neutral-400 leading-normal">
              Catatan interaksi terbaru antara pelaku UMKM, konsultan, dan investor.
            </p>
          </div>
          <NuxtLink
            to="/admin/investasi"
            class="btn-pill-action shrink-0"
          >
            <span>Alur Modal</span>
            <HugeiconsIcon :icon="ArrowRight01Icon" :size="16" :stroke-width="2" />
          </NuxtLink>
        </div>

        <div class="divide-y divide-neutral-100 dark:divide-neutral-800/80">
          <div
            v-for="act in activityList"
            :key="act.id"
            class="py-3.5 first:pt-0 last:pb-0 space-y-1"
          >
            <div class="flex items-center justify-between gap-2 text-sm">
              <span class="font-semibold text-neutral-900 dark:text-white line-clamp-1" :title="act.title">
                {{ act.title }}
              </span>
              <span class="text-xs text-neutral-500 dark:text-neutral-400 tabular-nums shrink-0">
                {{ act.time }}
              </span>
            </div>
            <p
              class="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed line-clamp-2 overflow-hidden"
              :title="act.detail"
            >
              {{ act.detail }}
            </p>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted, onUnmounted, nextTick } from 'vue'
import Chart from 'chart.js/auto'
import { gsap } from 'gsap'
import { HugeiconsIcon } from '@hugeicons/vue'
import {
  Home03Icon,
  Store01Icon,
  Briefcase01Icon,
  Award01Icon,
  Coins01Icon,
  UserGroupIcon,
  ArrowRight01Icon
} from '@hugeicons/core-free-icons'

definePageMeta({
  layout: 'dashboard',
  hideHeader: true
})

useHead({
  title: 'Beranda — Admin Beruang'
})

const adminOverviewRef = ref<HTMLElement | null>(null)
let gsapCtx: gsap.Context | null = null

// Live Stats State
const stats = reactive({
  totalUmkm: 0,
  activeConsultants: 0,
  readyForFunding: 0,
  totalCapitalDeployed: 'Rp 0',
  pendingAssignments: 0,
  newUmkmThisMonth: 0
})

const inMentoringCount = computed(() => {
  return Math.max(0, stats.totalUmkm - stats.readyForFunding - stats.pendingAssignments)
})

// Donut Chart State
const donutCanvas = ref<HTMLCanvasElement | null>(null)
let donutChartInstance: any = null

function updateDonutChart() {
  if (!donutCanvas.value) return
  if (donutChartInstance) {
    donutChartInstance.destroy()
    donutChartInstance = null
  }

  const dataValues = [
    stats.readyForFunding || 1,
    inMentoringCount.value || 1,
    stats.pendingAssignments || 1
  ]

  donutChartInstance = new Chart(donutCanvas.value, {
    type: 'doughnut',
    data: {
      labels: ['Siap Didanai', 'Dalam Pendampingan', 'Tahap Inkubasi Awal'],
      datasets: [
        {
          data: dataValues,
          backgroundColor: ['#00800e', '#156374', '#F59E0B'],
          borderWidth: 0,
          borderRadius: 4,
          spacing: 3
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      cutout: '72%',
      plugins: {
        legend: { display: false },
        tooltip: {
          enabled: true,
          callbacks: {
            label: (context: any) => ` ${context.label}: ${context.raw} Usaha`
          }
        }
      }
    }
  })
}

const topPartnerships = ref<any[]>([])
const activityList = ref<any[]>([])

async function loadDashboardData() {
  try {
    const statsRes = await useApi<any>('/admin/stats')
    if (statsRes.data) {
      Object.assign(stats, {
        totalUmkm: statsRes.data.totalUmkm ?? statsRes.data.total_umkm ?? 0,
        activeConsultants: statsRes.data.activeConsultants ?? statsRes.data.active_consultants ?? 0,
        readyForFunding: statsRes.data.readyForFunding ?? statsRes.data.ready_for_funding ?? 0,
        totalCapitalDeployed: statsRes.data.totalCapitalDeployed ?? statsRes.data.total_capital_deployed ?? 'Rp 1.5 M',
        pendingAssignments: statsRes.data.pendingAssignments ?? statsRes.data.pending_assignments ?? 0,
        newUmkmThisMonth: statsRes.data.newUmkmThisMonth ?? statsRes.data.new_umkm_this_month ?? 0
      })
    }
  } catch (err: any) {
    console.warn('Gagal memuat stats admin:', err?.message)
  }

  try {
    const partRes = await useApi<any>('/admin/partnerships')
    if (partRes.data && Array.isArray(partRes.data)) {
      topPartnerships.value = partRes.data.slice(0, 3).map((item: any, idx: number) => ({
        id: item.id || idx + 1,
        name: item.name,
        owner: item.owner,
        sector: item.sector,
        consultantName: item.consultant?.name || 'Menunggu Penugasan',
        investorName: item.investors?.[0]?.name || 'Terbuka bagi Investor',
        investorStage: item.investors?.[0]?.status === 'APPROVED' ? 'Ruang Data Terbuka' : 'Katalog Usaha'
      }))
    }
  } catch (err: any) {
    console.warn('Gagal memuat kemitraan:', err?.message)
  }

  try {
    const actRes = await useApi<any>('/admin/activity-logs')
    if (actRes.data && Array.isArray(actRes.data)) {
      activityList.value = actRes.data.slice(0, 4).map((l: any, idx: number) => ({
        id: l.id || idx + 1,
        title: l.title,
        detail: l.detail || 'Pencatatan kas dan status operasional tervalidasi.',
        time: l.time || 'Baru saja'
      }))
    }
  } catch (err: any) {
    console.warn('Gagal memuat log aktivitas:', err?.message)
  }

  updateDonutChart()
}

onMounted(async () => {
  await loadDashboardData()

  if (!adminOverviewRef.value) return
  gsapCtx = gsap.context(() => {
    gsap.fromTo(
      '.gsap-admin-card',
      { opacity: 0, y: 14 },
      { opacity: 1, y: 0, duration: 0.4, stagger: 0.06, ease: 'power2.out', clearProps: 'transform' }
    )
    gsap.fromTo(
      '.gsap-admin-section',
      { opacity: 0, y: 16 },
      { opacity: 1, y: 0, duration: 0.45, stagger: 0.08, delay: 0.1, ease: 'power2.out', clearProps: 'transform' }
    )
  }, adminOverviewRef.value)
})

onUnmounted(() => {
  if (donutChartInstance) {
    donutChartInstance.destroy()
    donutChartInstance = null
  }
  gsapCtx?.revert()
})
</script>
