<template>
  <div class="space-y-6 pb-20 font-sans text-neutral-900 dark:text-neutral-100 select-none">
    <!-- 1. Top Action Controls -->
    <div class="flex items-center justify-end gap-2.5 pb-2 shrink-0 flex-wrap">
      <!-- Unduh Rapor PDF Button -->
      <button
        type="button"
        class="btn-pill-gradient group"
        title="Unduh Rapor Kesiapan Usaha (PDF)"
        @click="handleExportReport"
      >
        <HugeiconsIcon :icon="Download01Icon" :size="15" :stroke-width="2" class="text-neutral-700 dark:text-neutral-200" />
        <span>Unduh Rapor Kesiapan (PDF)</span>
      </button>

      <!-- Primary 3D Action: Lihat Sertifikat Validasi -->
      <button
        type="button"
        class="btn-3d-green px-4 sm:px-5 py-2 sm:py-2.5 text-xs sm:text-sm font-poppins font-semibold shadow-xs active:scale-95 cursor-pointer"
        @click="isCertificateModalOpen = true"
      >
        <HugeiconsIcon :icon="Award01Icon" :size="17" :stroke-width="2.2" />
        <span>Lihat Sertifikat Validasi</span>
      </button>
    </div>

    <!-- 2. Editorial Header Banner (GoPay Tactile Card) -->
    <div class="gsap-header-card rounded-3xl card-tactile-gopay p-6 sm:p-7 relative overflow-hidden border border-neutral-200/80 dark:border-neutral-800/80 bg-white dark:bg-[#13161F]">
      <!-- Background Ambient Glow -->
      <div class="absolute -right-16 -top-16 w-56 h-56 rounded-full bg-[#2091AA]/10 dark:bg-[#2091AA]/15 blur-3xl pointer-events-none" />
      <div class="absolute right-36 -bottom-16 w-48 h-48 rounded-full bg-[#00AA13]/10 dark:bg-[#00AA13]/10 blur-3xl pointer-events-none" />

      <div class="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div class="space-y-2 max-w-2xl">
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E6F4F7] dark:bg-[#2091AA]/20 text-[#2091AA] dark:text-[#50AABF] text-xs font-poppins font-semibold border border-[#2091AA]/20 dark:border-[#50AABF]/30">
            <HugeiconsIcon :icon="AnalyticsUpIcon" :size="14" :stroke-width="2" />
            <span>Diagnosis Objektif 5 Aspek Fundamental Toko</span>
          </div>

          <h1 class="text-2xl sm:text-3xl font-heading font-bold text-neutral-900 dark:text-white tracking-tight">
            Cek Kesehatan Usaha & Kelayakan Kemitraan
          </h1>

          <p class="text-sm sm:text-[15px] text-neutral-600 dark:text-neutral-300 font-sans leading-relaxed">
            Evaluasi berkala terhadap kekuatan finansial kas, efisiensi bahan jualan, kepatuhan legalitas, dan tata kelola tokomu bersama konsultan pendamping. Hasil validasi ini menjadi standar acuan resmi investor sebelum menyalurkan modal.
          </p>
        </div>

        <!-- Right Quick Stat Pills -->
        <div class="grid grid-cols-2 gap-3 shrink-0">
          <div class="p-3.5 sm:p-4 rounded-2xl bg-neutral-50/80 dark:bg-[#18191E] border border-neutral-200/70 dark:border-neutral-800 flex flex-col justify-center min-w-[140px]">
            <span class="text-xs text-neutral-500 dark:text-neutral-400 font-medium">Indeks Kesehatan</span>
            <div class="flex items-baseline gap-1 mt-0.5">
              <span class="font-poppins font-extrabold text-2xl text-[#00AA13] dark:text-emerald-400 tabular-nums">
                {{ umkmStore.overallHealthScore }}
              </span>
              <span class="text-xs text-neutral-400">/ 100</span>
            </div>
            <span class="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold mt-0.5">
              Grade A (Siap Kemitraan)
            </span>
          </div>

          <div class="p-3.5 sm:p-4 rounded-2xl bg-neutral-50/80 dark:bg-[#18191E] border border-neutral-200/70 dark:border-neutral-800 flex flex-col justify-center min-w-[140px]">
            <span class="text-xs text-neutral-500 dark:text-neutral-400 font-medium">Validasi Terakhir</span>
            <span class="font-poppins font-bold text-sm sm:text-base text-neutral-900 dark:text-white mt-1">
              {{ umkmStore.profile.certifiedAt }}
            </span>
            <span class="text-[11px] text-[#2091AA] dark:text-[#50AABF] font-medium mt-0.5 truncate max-w-[130px]">
              {{ umkmStore.profile.consultantName }}
            </span>
          </div>
        </div>
      </div>
    </div>

    <!-- 3. Radar Chart & Overall Health Bento Section (GoPay Tactile Cards) -->
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
      <!-- Left Column: Interactive Radar Chart Card (7 cols) -->
      <div class="lg:col-span-7 card-tactile-gopay rounded-2xl p-6 sm:p-7 flex flex-col justify-between">
        <div>
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-neutral-100 dark:border-neutral-800/80 mb-6">
            <div>
              <h2 class="font-poppins font-bold text-lg sm:text-xl text-neutral-900 dark:text-white">
                Radar 5 Aspek Fundamental Toko
              </h2>
              <p class="text-xs font-poppins text-neutral-500 mt-0.5">
                Pemetaan kekuatan bisnis tokomu dibandingkan target kelulusan akses modal investor.
              </p>
            </div>
            <div class="flex items-center gap-4 text-xs font-poppins font-semibold shrink-0">
              <span class="flex items-center gap-1.5 text-[#2091AA] dark:text-[#50AABF]">
                <span class="w-2.5 h-2.5 rounded-full bg-[#2091AA]" />
                Capaian Toko
              </span>
              <span class="flex items-center gap-1.5 text-amber-600 dark:text-amber-400">
                <span class="w-2.5 h-2.5 rounded-full border border-amber-500 bg-amber-400/30" />
                Target Kelulusan
              </span>
            </div>
          </div>

          <!-- Radar Canvas Component -->
          <div class="flex items-center justify-center py-2">
            <BRadarChart
              :items="radarData"
              :size="330"
              show-target
            />
          </div>
        </div>

        <div class="mt-4 p-3.5 rounded-xl bg-blue-50/70 dark:bg-blue-950/30 border border-blue-200/70 dark:border-blue-900/40 w-full text-xs text-neutral-600 dark:text-neutral-300 text-center flex items-center justify-center gap-2 font-poppins">
          <HugeiconsIcon :icon="HelpCircleIcon" :size="16" class="text-[#2091AA] dark:text-[#50AABF]" />
          <span>Arahkan kursor pada sudut radar untuk melihat perbandingan skor terhadap target minimum kelulusan.</span>
        </div>
      </div>

      <!-- Right Column: Overall Health Score Card & Aspect Quick Meters (5 cols) -->
      <div class="lg:col-span-5 space-y-4 flex flex-col justify-between">
        <!-- Grade A Badge Card -->
        <div class="p-5 sm:p-6 rounded-2xl card-tactile-gopay space-y-3">
          <div class="flex items-center justify-between">
            <span class="text-xs font-poppins font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
              PREDIKAT KESEHATAN BISNIS
            </span>
            <span class="inline-flex items-center gap-1.5 text-xs font-poppins font-bold px-2.5 py-1 rounded-full bg-emerald-50 text-[#00AA13] dark:bg-emerald-950/60 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800">
              <HugeiconsIcon :icon="CheckmarkCircle01Icon" :size="13" :stroke-width="2" />
              <span>GRADE A TERVERIFIKASI</span>
            </span>
          </div>

          <div class="flex items-center justify-between my-2">
            <div>
              <div class="flex items-baseline gap-2">
                <span class="text-4xl sm:text-5xl font-poppins font-extrabold text-neutral-900 dark:text-white tabular-nums">
                  {{ umkmStore.overallHealthScore }}
                </span>
                <span class="text-sm text-neutral-400 font-bold font-poppins">/ 100</span>
              </div>
              <p class="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 mt-1 font-sans">
                Kondisi usaha: <strong class="text-[#00AA13] dark:text-emerald-400">Sehat & Siap Kemitraan Modal</strong>.
              </p>
            </div>

            <!-- Grade Visual Crest -->
            <div class="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-500 text-neutral-950 flex flex-col items-center justify-center font-poppins font-extrabold shadow-sm border border-amber-300 shrink-0">
              <span class="text-3xl leading-none">A</span>
              <span class="text-[9px] font-semibold uppercase tracking-wider">LULUS</span>
            </div>
          </div>
        </div>

        <!-- Pillar Mini Progress Bars List -->
        <div class="space-y-2.5 flex-1 flex flex-col justify-start">
          <div
            v-for="aspect in umkmStore.assessmentAspects"
            :key="aspect.id"
            class="p-3.5 rounded-xl card-tactile-gopay flex items-center justify-between gap-3 border transition-colors hover:border-neutral-400 dark:hover:border-neutral-600"
          >
            <div class="min-w-0 flex-1">
              <div class="flex items-center justify-between mb-1">
                <h4 class="font-poppins font-bold text-xs sm:text-sm text-neutral-900 dark:text-white truncate">
                  {{ aspect.name }}
                </h4>
                <span class="text-xs font-poppins font-bold tabular-nums text-neutral-700 dark:text-neutral-300">
                  {{ aspect.score }}%
                </span>
              </div>

              <!-- Mini Progress Bar -->
              <div class="w-full h-2 rounded-full bg-neutral-200 dark:bg-neutral-800 overflow-hidden">
                <div
                  :class="[
                    'h-full rounded-full transition-all duration-500',
                    aspect.score >= aspect.targetScore
                      ? 'bg-gradient-to-r from-[#2091AA] to-[#00AA13]'
                      : 'bg-gradient-to-r from-amber-400 to-amber-500'
                  ]"
                  :style="{ width: `${aspect.score}%` }"
                />
              </div>

              <div class="flex items-center justify-between text-[10px] text-neutral-400 font-poppins mt-1">
                <span>Target: {{ aspect.targetScore }}%</span>
                <span :class="aspect.score >= aspect.targetScore ? 'text-[#00AA13] font-semibold' : 'text-amber-600 font-semibold'">
                  {{ aspect.score >= aspect.targetScore ? '✓ Terlampaui' : 'Perlu Penguatan' }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 4. Detailed 5-Pillar Cards: Evaluasi Objektif & Rekomendasi Konsultan -->
    <div class="card-tactile-gopay rounded-2xl p-5 sm:p-7 space-y-5">
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-neutral-100 dark:border-neutral-800/80">
        <div>
          <h2 class="text-xl sm:text-2xl font-poppins font-bold text-neutral-900 dark:text-white tracking-tight">
            Rincian Evaluasi 5 Pilar Bisnis
          </h2>
          <p class="text-xs sm:text-[13px] font-poppins text-neutral-500 dark:text-neutral-400 mt-1 leading-normal">
            Catatan lapangan resmi dari konsultan pendamping tokomu serta langkah aksi rekomendasi perbaikan.
          </p>
        </div>

        <NuxtLink
          to="/dashboard/rencana-aksi"
          class="btn-pill-action group shrink-0"
        >
          <span>Kerjakan Rencana Aksi</span>
          <svg class="w-4 h-4 shrink-0 transition-transform duration-200 group-hover:translate-x-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
          </svg>
        </NuxtLink>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 items-stretch">
        <div
          v-for="aspect in umkmStore.assessmentAspects"
          :key="`card-${aspect.id}`"
          class="p-5 rounded-2xl card-tactile-gopay border flex flex-col justify-between space-y-4 hover:border-neutral-400 dark:hover:border-neutral-600 transition-colors"
        >
          <div>
            <!-- Header Pillar -->
            <div class="flex items-center justify-between pb-3 border-b border-neutral-100 dark:border-neutral-800/80 gap-2">
              <span class="font-poppins font-bold text-sm sm:text-base text-neutral-900 dark:text-white truncate">
                {{ aspect.name }}
              </span>
              <span
                :class="[
                  'text-xs font-poppins font-bold px-2.5 py-0.5 rounded-full border shrink-0 tabular-nums',
                  aspect.score >= aspect.targetScore
                    ? 'bg-emerald-50 text-[#00AA13] border-emerald-200 dark:bg-emerald-950/60 dark:text-emerald-400 dark:border-emerald-800'
                    : 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/60 dark:text-amber-300 dark:border-amber-800'
                ]"
              >
                {{ aspect.score }}/100
              </span>
            </div>

            <!-- Consultant Quote -->
            <p class="text-xs sm:text-[13px] text-neutral-600 dark:text-neutral-300 leading-relaxed italic my-3.5 font-sans bg-neutral-50/80 dark:bg-[#18191E] p-3.5 rounded-xl border border-neutral-200/60 dark:border-neutral-800">
              "{{ aspect.notes }}"
            </p>
          </div>

          <!-- Bottom Footer Link -->
          <div class="pt-3 border-t border-neutral-100 dark:border-neutral-800/80 flex items-center justify-between text-xs font-poppins">
            <span class="text-neutral-500">
              Target: <strong class="text-neutral-800 dark:text-neutral-200">{{ aspect.targetScore }}%</strong>
            </span>
            <NuxtLink
              to="/dashboard/rencana-aksi"
              class="font-semibold text-[#2091AA] dark:text-[#50AABF] hover:underline inline-flex items-center gap-1 group/link"
            >
              <span>Perkuat di Aksi</span>
              <span class="transition-transform group-hover/link:translate-x-0.5">→</span>
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>

    <!-- 5. Modal Sertifikat Validasi Kesiapan Usaha -->
    <BModal
      v-model="isCertificateModalOpen"
      title="Sertifikat Kesiapan Kemitraan Usaha"
      subtitle="Dokumen verifikasi resmi kelayakan akses modal platform Beruang"
      size="lg"
    >
      <div class="space-y-5 pt-1 font-poppins">
        <!-- Certificate Card Styled like Official Diploma / Credential -->
        <div class="p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-[#F3F8FC] to-white dark:from-[#13161F] dark:to-[#18191E] border-2 border-[#2091AA]/30 shadow-lg relative overflow-hidden">
          <!-- Watermark / Seal Icon -->
          <div class="absolute -right-8 -bottom-8 w-44 h-44 rounded-full bg-[#00AA13]/10 dark:bg-[#00AA13]/15 flex items-center justify-center pointer-events-none">
            <HugeiconsIcon :icon="Award01Icon" :size="100" class="text-[#00AA13]/25" />
          </div>

          <div class="relative z-10 space-y-5">
            <!-- Header Certificate -->
            <div class="flex items-center justify-between border-b border-neutral-200 dark:border-neutral-800 pb-4">
              <div class="flex items-center gap-2">
                <img src="/logo/logoSmall.svg" alt="Beruang" class="h-6 w-auto" />
                <span class="font-poppins font-extrabold text-base">
                  <span class="text-[#2091AA]">Ber</span><span class="text-[#00AA13]">uang</span>
                </span>
              </div>
              <span class="text-xs font-mono font-bold text-neutral-400">
                SERTIFIKAT ID: BERU/2026/VAL/0891
              </span>
            </div>

            <!-- Body Certificate -->
            <div class="text-center py-4 space-y-2">
              <span class="text-xs font-poppins font-semibold uppercase tracking-widest text-[#2091AA] dark:text-[#50AABF]">
                SERTIFIKAT KELAYAKAN INVESTASI UMKM
              </span>
              <h2 class="text-2xl sm:text-3xl font-poppins font-bold text-neutral-900 dark:text-white">
                {{ umkmStore.profile.name }}
              </h2>
              <p class="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 font-sans max-w-lg mx-auto leading-relaxed">
                NIB: {{ umkmStore.profile.nib }} • Sektor: {{ umkmStore.profile.sector }} • Lokasi: {{ umkmStore.profile.city }}
              </p>
            </div>

            <!-- Statement -->
            <p class="text-xs sm:text-sm text-neutral-700 dark:text-neutral-300 font-sans leading-relaxed text-center max-w-xl mx-auto">
              Dinyatakan telah memenuhi standar kelayakan bisnis <strong>Grade A (Indeks 79/100)</strong> berdasarkan evaluasi 5 pilar fundamental (Finansial, Operasional, Pemasaran, Legalitas, dan Tata Kelola) dan siap dihubungkan dengan sindikasi investor terakreditasi.
            </p>

            <!-- Signatures Footer -->
            <div class="pt-6 border-t border-neutral-200 dark:border-neutral-800 grid grid-cols-2 gap-4 text-xs">
              <div class="text-left space-y-1">
                <span class="text-neutral-400 block">Diterbitkan Pada</span>
                <span class="font-bold text-neutral-900 dark:text-white block">{{ umkmStore.profile.certifiedAt }}</span>
                <span class="text-[11px] text-emerald-600 font-semibold block">✓ Status Aktif & Terverifikasi</span>
              </div>
              <div class="text-right space-y-1">
                <span class="text-neutral-400 block">Konsultan Pendamping Resmi</span>
                <span class="font-bold text-neutral-900 dark:text-white block">{{ umkmStore.profile.consultantName }}</span>
                <span class="text-[11px] text-neutral-500 block">Lisensi Keuangan #7281</span>
              </div>
            </div>
          </div>
        </div>

        <div class="flex items-center justify-end gap-3 pt-2">
          <button
            type="button"
            class="px-4 py-2.5 rounded-xl border border-neutral-300 dark:border-neutral-700 text-xs sm:text-sm font-poppins font-semibold text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors cursor-pointer"
            @click="isCertificateModalOpen = false"
          >
            Tutup
          </button>
          <button
            type="button"
            class="btn-3d-blue px-5 py-2.5 text-xs sm:text-sm font-poppins font-semibold cursor-pointer"
            @click="handleExportReport"
          >
            Unduh Berkas Resmi (PDF)
          </button>
        </div>
      </div>
    </BModal>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useUmkmStore } from '~/stores/umkm'
import gsap from 'gsap'
import BRadarChart from '~/components/base/BRadarChart.vue'
import { HugeiconsIcon } from '@hugeicons/vue'
import {
  Home03Icon,
  AnalyticsUpIcon,
  Award01Icon,
  Download01Icon,
  CheckmarkCircle01Icon,
  HelpCircleIcon
} from '@hugeicons/core-free-icons'

definePageMeta({
  layout: 'dashboard'
})

const umkmStore = useUmkmStore()

const radarData = computed(() => {
  return umkmStore.assessmentAspects.map(a => ({
    name: a.name.split(' ')[0],
    score: a.score,
    maxScore: a.maxScore,
    targetScore: a.targetScore
  }))
})

// Certificate Modal State
const isCertificateModalOpen = ref(false)

function handleExportReport() {
  alert('Menyiapkan dokumen Rapor Kesiapan Usaha (PDF) resmi Kopi Senja Nusantara untuk ekspor investor...')
}

onMounted(() => {
  umkmStore.fetchAssessment()
  // GSAP Entrance
  gsap.from('.gsap-header-card', {
    opacity: 0,
    y: -10,
    duration: 0.5,
    ease: 'power2.out'
  })
})
</script>
