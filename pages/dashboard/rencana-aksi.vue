<template>
  <div class="space-y-8 pb-12 font-sans">
    <!-- Header -->
    <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
      <div>
        <h1 class="text-2xl sm:text-3xl font-heading font-bold text-neutral-900 dark:text-white tracking-tight">
          Rencana Aksi & Hasil Audit Usaha
        </h1>
        <p class="text-sm sm:text-base text-neutral-600 dark:text-neutral-300 mt-1.5 leading-relaxed">
          Diagnosis kesehatan 5 aspek dan langkah perbaikan taktis bersama konsultan pendampingmu.
        </p>
      </div>

      <div class="flex items-center gap-2">
        <span class="text-xs sm:text-sm font-semibold text-neutral-600 dark:text-neutral-400 font-heading">
          Capaian Tugas:
        </span>
        <span class="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-heading font-bold bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
          <span class="w-2 h-2 rounded-full bg-emerald-500" />
          <span>{{ umkmStore.tasksCompletedCount }} dari {{ umkmStore.tasks.length }} Selesai</span>
        </span>
      </div>
    </div>

    <!-- Sub-tab Navigation (Tugas vs Radar Aspek) -->
    <div class="flex border-b border-border-light dark:border-border-dark gap-6 text-sm sm:text-base font-heading font-semibold">
      <button
        type="button"
        :class="[
          'pb-3 border-b-2 transition-all flex items-center gap-2 font-bold',
          activeView === 'tasks'
            ? 'border-primary-500 text-primary-600 dark:text-primary-400'
            : 'border-transparent text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white'
        ]"
        @click="activeView = 'tasks'"
      >
        <HugeiconsIcon :icon="Task01Icon" :size="20" :stroke-width="1.75" />
        <span>Rencana Aksi</span>
        <span class="text-xs sm:text-sm px-2.5 py-0.5 rounded-md bg-primary-100 text-primary-700 dark:bg-primary-950 dark:text-primary-300 font-bold tabular-nums">
          {{ umkmStore.tasksCompletedCount }}/{{ umkmStore.tasks.length }}
        </span>
      </button>

      <button
        type="button"
        :class="[
          'pb-3 border-b-2 transition-all flex items-center gap-2 font-bold',
          activeView === 'radar'
            ? 'border-primary-500 text-primary-600 dark:text-primary-400'
            : 'border-transparent text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white'
        ]"
        @click="activeView = 'radar'"
      >
        <HugeiconsIcon :icon="AnalyticsUpIcon" :size="20" :stroke-width="1.75" />
        <span>Skor Bisnis</span>
        <span class="text-xs sm:text-sm px-2.5 py-0.5 rounded-md bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 font-bold tabular-nums">
          {{ umkmStore.overallHealthScore }}/100
        </span>
      </button>
    </div>

    <!-- VIEW 1: Checklist Tugas & Milestones -->
    <div v-if="activeView === 'tasks'" class="space-y-6">
      <!-- Overall Progress Banner -->
      <div class="p-6 rounded-2xl bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-3">
          <div>
            <h3 class="font-heading font-bold text-base sm:text-lg text-neutral-900 dark:text-white">
              Progres Action Plan Keseluruhan
            </h3>
            <p class="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 mt-0.5">
              {{ umkmStore.tasksProgressPct }}% target perbaikan operasional telah dipenuhi.
            </p>
          </div>
          <span class="text-2xl sm:text-3xl font-heading font-extrabold text-primary-600 dark:text-primary-400 tabular-nums">
            {{ umkmStore.tasksProgressPct }}%
          </span>
        </div>

        <BProgressBar
          :value="umkmStore.tasksProgressPct"
          variant="primary"
          size="lg"
        />
      </div>

      <!-- Milestones & Task Groups -->
      <div class="space-y-6">
        <div
          v-for="milestone in umkmStore.milestones"
          :key="milestone.id"
          class="bg-surface-light dark:bg-surface-dark rounded-2xl border border-border-light dark:border-border-dark p-6"
        >
          <!-- Milestone Header -->
          <div class="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-border-light dark:border-border-dark gap-3 mb-5">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-xl bg-primary-100 dark:bg-primary-950 text-primary-600 dark:text-primary-300 font-heading font-bold text-sm flex items-center justify-center border border-primary-200 dark:border-primary-800">
                #{{ milestone.order }}
              </div>
              <div>
                <h3 class="font-heading font-bold text-base sm:text-lg text-neutral-900 dark:text-white">
                  {{ milestone.title }}
                </h3>
                <p class="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 mt-1 leading-relaxed">
                  {{ milestone.description }}
                </p>
              </div>
            </div>

            <div class="flex items-center gap-2">
              <span
                :class="[
                  'text-xs sm:text-sm font-heading font-bold px-3 py-1.5 rounded-lg border',
                  getMilestoneTasks(milestone.id).every(t => t.completed)
                    ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800'
                    : 'bg-white dark:bg-neutral-900 text-neutral-700 dark:text-neutral-300 border-border-light dark:border-border-dark'
                ]"
              >
                {{ getMilestoneTasks(milestone.id).filter(t => t.completed).length }}/{{ getMilestoneTasks(milestone.id).length }} Selesai
              </span>
            </div>
          </div>

          <!-- Task Checklist Items -->
          <div class="space-y-2.5">
            <BChecklistItem
              v-for="task in getMilestoneTasks(milestone.id)"
              :key="task.id"
              :model-value="task.completed"
              :title="task.title"
              :description="task.description"
              :category="task.category"
              :due-date="task.dueDate"
              :consultant-note="task.consultantNote"
              @update:model-value="umkmStore.toggleTask(task.id)"
            />
          </div>
        </div>
      </div>
    </div>

    <!-- VIEW 2: Radar 5 Aspek Fundamental Terintegrasi -->
    <div v-else class="space-y-8">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <!-- Interactive Radar Chart -->
        <div class="lg:col-span-7 bg-surface-light dark:bg-surface-dark rounded-3xl border border-border-light dark:border-border-dark p-6 sm:p-8 flex flex-col items-center">
          <div class="w-full flex items-center justify-between pb-4 border-b border-border-light dark:border-border-dark mb-6">
            <h3 class="font-heading font-bold text-base sm:text-lg text-neutral-900 dark:text-white">
              Radar 5 Aspek Usahamu
            </h3>
            <div class="flex items-center gap-4 text-xs sm:text-sm font-semibold">
              <span class="flex items-center gap-1.5 font-semibold text-primary-600 dark:text-primary-400">
                <span class="w-2.5 h-2.5 rounded-full bg-primary-500" />
                Capaianmu
              </span>
              <span class="flex items-center gap-1.5 font-semibold text-amber-600 dark:text-amber-400">
                <span class="w-2.5 h-2.5 rounded-full border border-amber-500 bg-amber-400/30" />
                Target Konsultan
              </span>
            </div>
          </div>

          <BRadarChart
            :items="radarData"
            :size="340"
            show-target
          />
        </div>

        <!-- Overall Score Card & Breakdown -->
        <div class="lg:col-span-5 space-y-4">
          <BCard>
            <div class="flex items-center justify-between">
              <div>
                <span class="text-xs sm:text-sm font-heading font-bold text-neutral-600 dark:text-neutral-400 uppercase tracking-wider">
                  Indeks Kesehatan
                </span>
                <div class="flex items-baseline gap-2 mt-1">
                  <span class="text-4xl sm:text-5xl font-heading font-extrabold text-neutral-900 dark:text-white tabular-nums">
                    {{ umkmStore.overallHealthScore }}
                  </span>
                  <span class="text-sm font-bold text-neutral-500 dark:text-neutral-400">/ 100</span>
                </div>
              </div>
              <div class="w-14 h-14 rounded-2xl bg-amber-400 text-neutral-950 flex items-center justify-center font-heading font-extrabold text-2xl shadow-xs">
                A
              </div>
            </div>
            <p class="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 mt-2.5 leading-relaxed">
              Diaudit resmi oleh <strong>{{ umkmStore.profile.consultantName }}</strong> pada {{ umkmStore.profile.certifiedAt }}.
            </p>
          </BCard>

          <div class="space-y-2.5">
            <div
              v-for="aspect in umkmStore.assessmentAspects"
              :key="aspect.id"
              class="p-3.5 rounded-xl bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark flex items-center justify-between"
            >
              <div>
                <h4 class="font-heading font-bold text-sm sm:text-base text-neutral-900 dark:text-white">
                  {{ aspect.name }}
                </h4>
                <p class="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 mt-0.5">
                  Target: {{ aspect.targetScore }} • Capaian: {{ aspect.score }}
                </p>
              </div>
              <span
                :class="[
                  'text-xs sm:text-sm font-heading font-bold px-2.5 py-1 rounded-md tabular-nums border',
                  aspect.score >= aspect.targetScore
                    ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800'
                    : 'bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800'
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
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useUmkmStore } from '~/stores/umkm'
import BCard from '~/components/base/BCard.vue'
import BProgressBar from '~/components/base/BProgressBar.vue'
import BChecklistItem from '~/components/base/BChecklistItem.vue'
import BRadarChart from '~/components/base/BRadarChart.vue'
import { HugeiconsIcon } from '@hugeicons/vue'
import { Task01Icon, AnalyticsUpIcon } from '@hugeicons/core-free-icons'

definePageMeta({
  layout: 'dashboard'
})

const umkmStore = useUmkmStore()
const activeView = ref<'tasks' | 'radar'>('tasks')

function getMilestoneTasks(milestoneId: string) {
  return umkmStore.tasks.filter(t => t.milestoneId === milestoneId)
}

const radarData = computed(() => {
  return umkmStore.assessmentAspects.map(a => ({
    name: a.name.split(' ')[0],
    score: a.score,
    maxScore: a.maxScore,
    targetScore: a.targetScore
  }))
})
</script>
