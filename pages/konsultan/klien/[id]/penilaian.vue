<template>
  <div class="space-y-8 pb-12 font-sans">
    <!-- Header -->
    <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
      <div>
        <div class="flex items-center gap-2 text-xs text-neutral-500 mb-2">
          <NuxtLink :to="`/konsultan/klien/${clientId}`" class="hover:underline">← Kembali ke Detail Klien</NuxtLink>
        </div>
        <h1 class="text-2xl sm:text-3xl font-heading font-bold text-neutral-900 dark:text-white tracking-tight">
          Form Penilaian Skor 5 Aspek Fundamental
        </h1>
        <p class="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 mt-1">
          Klien: <strong>{{ client?.name }}</strong> • Skor terupdate secara langsung pada radar interaktif.
        </p>
      </div>

      <BButton variant="primary" size="md" @click="saveAssessment">
        Simpan Penilaian
      </BButton>
    </div>

    <!-- Alert Success -->
    <div
      v-if="saved"
      class="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-xs text-emerald-800 dark:text-emerald-300"
    >
      Hasil penilaian berhasil disimpan! Radar skor dan catatan objektif telah diperbarui.
    </div>

    <!-- Main Grid: Form Inputs (Left) and Real-time Radar Preview (Right) -->
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      <!-- Left: Form inputs for 5 aspects (7 cols) -->
      <div class="lg:col-span-7 space-y-5">
        <BCard
          v-for="aspect in aspects"
          :key="aspect.id"
          padding="md"
        >
          <div class="space-y-3">
            <div class="flex items-center justify-between">
              <label class="font-heading font-bold text-sm text-neutral-900 dark:text-white">
                {{ aspect.name }}
              </label>
              <div class="flex items-center gap-2">
                <span class="text-xs text-neutral-500">Nilai:</span>
                <input
                  v-model.number="aspect.score"
                  type="number"
                  min="0"
                  max="100"
                  class="w-16 px-2.5 py-1 text-center font-heading font-bold text-sm rounded-lg border border-border-light dark:border-border-dark bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 tabular-nums focus:outline-none focus:ring-1 focus:ring-primary-500"
                />
                <span class="text-xs text-neutral-400 font-semibold font-heading">/ 100</span>
              </div>
            </div>

            <!-- Range Slider -->
            <input
              v-model.number="aspect.score"
              type="range"
              min="0"
              max="100"
              class="w-full accent-primary-500 cursor-pointer"
            />

            <!-- Qualitative Consultant Note -->
            <div>
              <label class="block text-[11px] font-semibold text-neutral-500 mb-1">
                Catatan Objektif & Rekomendasi Konsultan:
              </label>
              <textarea
                v-model="aspect.notes"
                rows="2"
                placeholder="Tuliskan catatan pendampingan atau hal yang perlu ditingkatkan..."
                class="w-full px-3 py-2 text-xs rounded-xl border border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark text-neutral-900 dark:text-neutral-100 focus:bg-white dark:focus:bg-neutral-900 focus:outline-none focus:ring-1 focus:ring-primary-500"
              />
            </div>
          </div>
        </BCard>
      </div>

      <!-- Right: Real-time Radar Chart Preview (5 cols sticky) -->
      <div class="lg:col-span-5 sticky top-24 space-y-4">
        <div class="bg-surface-light dark:bg-surface-dark rounded-2xl border border-border-light dark:border-border-dark p-6 flex flex-col items-center">
          <div class="w-full pb-3 border-b border-border-light dark:border-border-dark mb-4">
            <h3 class="font-heading font-bold text-sm text-neutral-900 dark:text-white">
              Pratinjau Radar Real-time
            </h3>
          </div>

          <BRadarChart
            :items="radarData"
            :size="300"
            show-target
          />

          <div class="w-full mt-4 pt-3 border-t border-border-light dark:border-border-dark flex items-center justify-between text-xs">
            <span class="text-neutral-500">Rata-rata Skor Baru:</span>
            <span class="font-heading font-bold text-base text-primary-600 dark:text-primary-400 tabular-nums">
              {{ averageScore }} / 100
            </span>
          </div>
        </div>

        <BButton variant="primary" block size="md" @click="saveAssessment">
          Simpan Seluruh Skor Audit
        </BButton>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useKonsultanStore } from '~/stores/konsultan'
import { useUmkmStore } from '~/stores/umkm'
import BCard from '~/components/base/BCard.vue'
import BButton from '~/components/base/BButton.vue'
import BRadarChart from '~/components/base/BRadarChart.vue'

definePageMeta({
  layout: 'dashboard'
})

const route = useRoute()
const router = useRouter()
const clientId = computed(() => route.params.id as string || 'umkm-01')

const konsultanStore = useKonsultanStore()
const umkmStore = useUmkmStore()

const client = computed(() => {
  return konsultanStore.clients.find(c => c.id === clientId.value) || konsultanStore.clients[0]
})

const aspects = ref(JSON.parse(JSON.stringify(konsultanStore.getClientAssessment(clientId.value))))
const saved = ref(false)

const averageScore = computed(() => {
  const sum = aspects.value.reduce((acc: number, a: { score: number }) => acc + (Number(a.score) || 0), 0)
  return Math.round(sum / (aspects.value.length || 1))
})

const radarData = computed(() => {
  return aspects.value.map((a: { name: string; score: number; maxScore: number; targetScore: number }) => ({
    name: a.name.split(' ')[0],
    score: Number(a.score) || 0,
    maxScore: a.maxScore || 100,
    targetScore: a.targetScore || 85
  }))
})

function saveAssessment() {
  konsultanStore.updateClientAssessment(clientId.value, aspects.value)
  if (clientId.value === 'umkm-01') {
    umkmStore.assessmentAspects = JSON.parse(JSON.stringify(aspects.value))
  }
  saved.value = true
  setTimeout(() => {
    saved.value = false
    router.push(`/konsultan/klien/${clientId.value}`)
  }, 900)
}
</script>
