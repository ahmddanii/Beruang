<template>
  <div class="space-y-8 pb-20 font-sans">
    <!-- 1. EXECUTIVE HEADER (Double-Bezel Hardware Architecture) -->
    <div class="p-1.5 sm:p-2 rounded-[2.25rem] bg-neutral-200/50 dark:bg-neutral-800/40 border border-neutral-300/40 dark:border-neutral-700/30 shadow-xs">
      <div class="p-6 sm:p-8 lg:p-10 rounded-[calc(2.25rem-0.5rem)] bg-white dark:bg-[#141519] border border-neutral-200/80 dark:border-neutral-800/90 shadow-[inset_0_1px_1px_rgba(255,255,255,0.9)] dark:shadow-[inset_0_1px_1px_rgba(255,255,255,0.06)] flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative overflow-hidden">
        <div class="space-y-3 max-w-2xl relative z-10">
          <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 text-xs font-mono font-bold uppercase tracking-[0.15em]">
            <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>AUDIT RESMI LISENSI BNSP</span>
          </div>

          <h1 class="text-3xl sm:text-4xl lg:text-5xl font-heading font-extrabold text-neutral-900 dark:text-white tracking-[-0.03em] leading-tight text-balance">
            Hasil Penilaian Kesehatan Bisnis (5 Pilar)
          </h1>

          <p class="text-sm sm:text-base text-neutral-600 dark:text-neutral-300 leading-relaxed font-sans max-w-xl">
            Audit berkala 5 aspek fundamental oleh konsultan pendamping resmi: <strong class="text-neutral-900 dark:text-white">{{ umkmStore.profile.consultantName }}</strong> (Lisensi BNSP #7281).
          </p>
        </div>

        <div class="flex items-center gap-3 shrink-0">
          <div class="p-4 rounded-2xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200/70 dark:border-neutral-800 font-mono text-xs sm:text-sm space-y-1">
            <span class="text-neutral-600 dark:text-neutral-400 block text-xs uppercase font-sans font-bold">Audit Terakhir</span>
            <span class="font-extrabold text-neutral-900 dark:text-white block text-sm sm:text-base">
              {{ umkmStore.profile.certifiedAt }}
            </span>
          </div>
        </div>
      </div>
    </div>

    <!-- 2. RADAR CHART & OVERALL HEALTH BENTO (Double-Bezel Hardware Architecture) -->
    <div class="p-1.5 sm:p-2 rounded-[2.25rem] bg-neutral-200/50 dark:bg-neutral-800/40 border border-neutral-300/40 dark:border-neutral-700/30 shadow-xs">
      <div class="p-6 sm:p-8 lg:p-10 rounded-[calc(2.25rem-0.5rem)] bg-white dark:bg-[#141519] border border-neutral-200/80 dark:border-neutral-800/90 shadow-[inset_0_1px_1px_rgba(255,255,255,0.9)] dark:shadow-[inset_0_1px_1px_rgba(255,255,255,0.06)] space-y-6">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <!-- Left Column: Interactive Radar Chart Card (7 cols) -->
          <div class="lg:col-span-7 p-6 rounded-3xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 flex flex-col items-center">
            <div class="w-full flex items-center justify-between pb-4 border-b border-neutral-200/80 dark:border-neutral-800 mb-6">
              <h2 class="font-heading font-bold text-lg sm:text-xl text-neutral-900 dark:text-white">
                Radar 5 Pilar Fundamental
              </h2>
              <div class="flex items-center gap-4 text-xs sm:text-sm font-mono font-semibold">
                <span class="flex items-center gap-1.5 font-bold text-primary-600 dark:text-primary-400">
                  <span class="w-2.5 h-2.5 rounded-full bg-primary-500" />
                  Skor Usaha
                </span>
                <span class="flex items-center gap-1.5 font-bold text-amber-600 dark:text-amber-400">
                  <span class="w-2.5 h-2.5 rounded-full border border-amber-500 bg-amber-400/30" />
                  Target Kelulusan
                </span>
              </div>
            </div>

            <BRadarChart
              :items="radarData"
              :size="340"
              show-target
            />

            <div class="mt-4 p-3.5 rounded-xl bg-white dark:bg-[#18191e] border border-neutral-200/70 dark:border-neutral-800 w-full text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 text-center flex items-center justify-center gap-2 font-sans font-medium">
              <HugeiconsIcon :icon="HelpCircleIcon" :size="16" :stroke-width="1.75" />
              <span>Arahkan kursor atau sentuh sudut radar untuk melihat detail nilai per aspek.</span>
            </div>
          </div>

          <!-- Right Column: Overall Score & Quick Aspect Breakdown (5 cols) -->
          <div class="lg:col-span-5 space-y-4">
            <!-- Overall Score Card -->
            <div class="p-6 sm:p-7 rounded-3xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 space-y-3">
              <div class="flex items-center justify-between">
                <span class="text-xs font-mono font-bold uppercase tracking-wider text-neutral-600 dark:text-neutral-400">
                  INDEKS KELAYAKAN USAHA
                </span>
                <span class="inline-flex items-center gap-1.5 text-xs font-mono font-bold px-2.5 py-1 rounded-md bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                  <HugeiconsIcon :icon="CheckmarkCircle01Icon" :size="13" :stroke-width="2" />
                  <span>GRADE A VALID</span>
                </span>
              </div>

              <div class="flex items-center justify-between my-2">
                <div>
                  <div class="flex items-baseline gap-2">
                    <span class="text-4xl sm:text-5xl font-heading font-extrabold text-neutral-900 dark:text-white tabular-nums font-mono">
                      {{ umkmStore.overallHealthScore }}
                    </span>
                    <span class="text-sm text-neutral-500 font-mono font-bold">/ 100</span>
                  </div>
                  <p class="text-sm text-neutral-600 dark:text-neutral-300 mt-1 font-sans">
                    Kondisi usaha: <strong class="text-neutral-900 dark:text-white">Sehat & Siap Sindikasi Modal</strong>.
                  </p>
                </div>
                <div class="w-14 h-14 rounded-2xl bg-amber-400 text-neutral-950 flex items-center justify-center font-heading font-extrabold text-2xl shadow-xs">
                  A
                </div>
              </div>
            </div>

            <!-- Aspect Mini List -->
            <div class="space-y-2.5">
              <div
                v-for="aspect in umkmStore.assessmentAspects"
                :key="aspect.id"
                class="p-3.5 sm:p-4 rounded-2xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200/70 dark:border-neutral-800 flex items-center justify-between"
              >
                <div class="min-w-0 pr-2">
                  <h4 class="font-heading font-bold text-sm text-neutral-900 dark:text-white truncate">
                    {{ aspect.name }}
                  </h4>
                  <p class="text-xs text-neutral-600 dark:text-neutral-400 truncate mt-0.5 font-mono font-medium">
                    Target: {{ aspect.targetScore }} • Capaian: {{ aspect.score }}
                  </p>
                </div>
                <div class="flex items-center gap-2">
                  <span
                    :class="[
                      'text-xs sm:text-sm font-mono font-bold px-2.5 py-0.5 rounded-md tabular-nums border',
                      aspect.score >= aspect.targetScore
                        ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800'
                        : 'bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 border-amber-200 dark:border-amber-800'
                    ]"
                  >
                    {{ aspect.score }}%
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 3. DETAILED ASPECT NOTES (Double-Bezel Hardware Architecture) -->
    <div class="p-1.5 sm:p-2 rounded-[2.25rem] bg-neutral-200/50 dark:bg-neutral-800/40 border border-neutral-300/40 dark:border-neutral-700/30 shadow-xs">
      <div class="p-6 sm:p-8 lg:p-10 rounded-[calc(2.25rem-0.5rem)] bg-white dark:bg-[#141519] border border-neutral-200/80 dark:border-neutral-800/90 shadow-[inset_0_1px_1px_rgba(255,255,255,0.9)] dark:shadow-[inset_0_1px_1px_rgba(255,255,255,0.06)] space-y-6">
        <div class="pb-3 border-b border-neutral-100 dark:border-neutral-800">
          <span class="text-xs font-mono font-bold uppercase tracking-[0.2em] text-primary-600 dark:text-primary-400 block">
            § 03 // CATATAN LAPANGAN RESMI
          </span>
          <h3 class="text-2xl font-heading font-extrabold text-neutral-900 dark:text-white mt-1">
            Evaluasi Objektif Konsultan Pendamping
          </h3>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div
            v-for="aspect in umkmStore.assessmentAspects"
            :key="`card-${aspect.id}`"
            class="p-1 rounded-2xl bg-neutral-100 dark:bg-neutral-800/60 border border-neutral-200/80 dark:border-neutral-700/50 flex flex-col justify-between"
          >
            <div class="p-5 sm:p-6 rounded-[calc(1rem-0.25rem)] bg-white dark:bg-[#18191e] h-full flex flex-col justify-between space-y-4">
              <div>
                <div class="flex items-center justify-between pb-3 border-b border-neutral-100 dark:border-neutral-800">
                  <span class="font-heading font-bold text-base text-neutral-900 dark:text-white">
                    {{ aspect.name }}
                  </span>
                  <span
                    :class="[
                      'text-xs font-mono font-bold px-2.5 py-0.5 rounded-md border',
                      aspect.score >= aspect.targetScore
                        ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800'
                        : 'bg-amber-50 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border-amber-200 dark:border-amber-800'
                    ]"
                  >
                    Skor: {{ aspect.score }}/100
                  </span>
                </div>

                <p class="text-sm text-neutral-700 dark:text-neutral-200 leading-relaxed italic my-3.5 font-sans">
                  "{{ aspect.notes }}"
                </p>
              </div>

              <div class="flex items-center justify-between text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 pt-2.5 border-t border-neutral-100 dark:border-neutral-800 font-mono font-medium">
                <span>Target: ≥ {{ aspect.targetScore }} poin</span>
                <span
                  :class="aspect.score >= aspect.targetScore ? 'text-emerald-600 dark:text-emerald-400 font-bold' : 'text-amber-600 font-bold'"
                >
                  {{ aspect.score >= aspect.targetScore ? '✓ Target Tercapai' : '⚠️ Perlu Dibenahi' }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useUmkmStore } from '~/stores/umkm'
import BRadarChart from '~/components/base/BRadarChart.vue'
import { HugeiconsIcon } from '@hugeicons/vue'
import {
  HelpCircleIcon,
  CheckmarkCircle01Icon
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
</script>
