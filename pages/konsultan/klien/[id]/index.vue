<template>
  <div class="space-y-8 pb-12 font-sans">
    <!-- Top breadcrumb & Client Header -->
    <div>
      <div class="flex items-center gap-2 text-xs text-neutral-500 mb-3">
        <NuxtLink to="/konsultan" class="hover:underline">← Matriks Klien</NuxtLink>
        <span>/</span>
        <span class="text-neutral-800 dark:text-neutral-200 font-semibold">{{ client?.name }}</span>
      </div>

      <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-surface-light dark:bg-surface-dark rounded-2xl p-6 sm:p-8 border border-border-light dark:border-border-dark">
        <div class="flex items-center gap-4">
          <div class="w-14 h-14 rounded-xl bg-amber-400 p-2 shadow-xs shrink-0">
            <img src="/logo.svg" alt="Client Logo" class="w-full h-full object-contain" />
          </div>
          <div>
            <div class="flex items-center gap-2 flex-wrap">
              <h1 class="text-xl sm:text-2xl font-heading font-bold text-neutral-900 dark:text-white">
                {{ client?.name }}
              </h1>
              <span
                :class="[
                  'inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-[11px] font-heading font-semibold border',
                  client?.fundingStatus === 'READY_FOR_FUNDING'
                    ? 'bg-amber-50 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border-amber-200 dark:border-amber-800'
                    : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 border-neutral-200 dark:border-neutral-700'
                ]"
              >
                <HugeiconsIcon :icon="Award01Icon" :size="12" :stroke-width="2" />
                <span>{{ client?.fundingStatus === 'READY_FOR_FUNDING' ? 'Ready for Funding' : 'Dalam Pembinaan' }}</span>
              </span>
            </div>
            <p class="text-xs text-neutral-500 mt-1">
              Founder: {{ client?.owner }} • Sektor: {{ client?.sector }} • Kota: {{ client?.city }}
            </p>
          </div>
        </div>

        <div class="flex items-center gap-2.5">
          <NuxtLink :to="`/konsultan/klien/${clientId}/penilaian`">
            <BButton variant="outline" size="sm">
              Skor Radar
            </BButton>
          </NuxtLink>
          <NuxtLink :to="`/konsultan/klien/${clientId}/sertifikasi`">
            <BButton variant="primary" size="sm">
              Sertifikasi Pendanaan
            </BButton>
          </NuxtLink>
        </div>
      </div>
    </div>

    <!-- Navigation Tabs -->
    <div class="flex border-b border-border-light dark:border-border-dark gap-6 text-sm font-heading font-semibold overflow-x-auto pb-px">
      <button
        v-for="t in tabs"
        :key="t.key"
        type="button"
        :class="[
          'pb-3 border-b-2 transition-all whitespace-nowrap',
          activeTab === t.key
            ? 'border-primary-500 text-primary-600 dark:text-primary-400'
            : 'border-transparent text-neutral-500 hover:text-neutral-900 dark:hover:text-white'
        ]"
        @click="activeTab = t.key"
      >
        {{ t.label }}
      </button>
    </div>

    <!-- Tab 1: Ringkasan & 5 Aspek -->
    <div v-if="activeTab === 'overview'" class="space-y-6">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div class="lg:col-span-7 bg-surface-light dark:bg-surface-dark rounded-2xl border border-border-light dark:border-border-dark p-6 flex flex-col items-center">
          <h3 class="font-heading font-bold text-sm text-neutral-900 dark:text-white mb-4 w-full">
            Pratinjau Radar Aspek Klien
          </h3>
          <BRadarChart :items="radarData" :size="320" show-target />
        </div>

        <div class="lg:col-span-5 space-y-4">
          <BCard>
            <template #header>
              <h4 class="font-heading font-bold text-sm text-neutral-900 dark:text-white">Status Kepatuhan Finansial</h4>
            </template>
            <div class="space-y-2 text-xs">
              <div class="flex justify-between py-1 border-b border-border-light dark:border-border-dark">
                <span class="text-neutral-500">Skor Fundamental:</span>
                <span class="font-bold text-emerald-600 dark:text-emerald-400">{{ client?.healthScore }}/100</span>
              </div>
              <div class="flex justify-between py-1 border-b border-border-light dark:border-border-dark">
                <span class="text-neutral-500">Target Tiket Investasi:</span>
                <span class="font-bold tabular-nums">Rp {{ ((client?.fundingTarget || 0) / 1000000) }} Juta</span>
              </div>
              <div class="flex justify-between py-1 border-b border-border-light dark:border-border-dark">
                <span class="text-neutral-500">Validasi Bulanan:</span>
                <span class="font-bold text-emerald-600 dark:text-emerald-400">{{ client?.monthlyStatus }}</span>
              </div>
            </div>
          </BCard>

          <BCard>
            <template #header>
              <h4 class="font-heading font-bold text-sm text-neutral-900 dark:text-white">Catatan Pendamping</h4>
            </template>
            <p class="text-xs text-neutral-600 dark:text-neutral-400 italic leading-relaxed">
              "Klien menunjukkan komitmen tinggi dalam menata kartu stok mingguan. Margin kotor bertahan di atas 48%. Rekomendasi siap dipromosikan ke sindikasi investor."
            </p>
          </BCard>
        </div>
      </div>
    </div>

    <!-- Tab 2: Rencana Aksi -->
    <div v-else-if="activeTab === 'action_plan'" class="space-y-5 text-left">
      <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div>
          <h3 class="font-heading font-bold text-base sm:text-lg text-neutral-900 dark:text-white">
            Rencana Aksi Khusus {{ client?.name }}
          </h3>
          <p class="text-xs text-neutral-500 dark:text-neutral-400">
            Daftar tugas bimbingan dan target perbaikan yang ditugaskan konsultan untuk usaha ini.
          </p>
        </div>
        <div class="flex items-center gap-2">
          <NuxtLink to="/konsultan/rencana-aksi">
            <BButton variant="outline" size="sm">
              Semua Action Plan
            </BButton>
          </NuxtLink>
          <BButton variant="primary" size="sm" @click="showAddTaskModal = true">
            + Beri Action Plan
          </BButton>
        </div>
      </div>

      <!-- Action Plans Cards List -->
      <div v-if="clientActionPlans.length > 0" class="space-y-3">
        <div
          v-for="plan in clientActionPlans"
          :key="plan.id"
          class="card-tactile-gopay p-4 sm:p-5 rounded-2xl space-y-3 transition-all"
        >
          <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 pb-2.5 border-b border-neutral-200/70 dark:border-white/5">
            <div class="flex items-center gap-2 flex-wrap">
              <span class="px-2.5 py-0.5 rounded-md text-[11px] font-bold bg-[#0081A0]/10 text-[#0081A0] dark:bg-[#0081A0]/20 dark:text-[#2091AA] border border-[#0081A0]/20">
                {{ plan.pillar }}
              </span>
              <span class="px-2 py-0.5 rounded-md text-[11px] font-semibold bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 border border-neutral-200 dark:border-neutral-700">
                Prioritas {{ plan.priority }}
              </span>
            </div>

            <div class="flex items-center gap-3 self-end sm:self-auto text-xs text-neutral-500">
              <span class="flex items-center gap-1">
                <HugeiconsIcon :icon="Calendar01Icon" :size="13" :stroke-width="1.8" />
                <span>Target: <strong>{{ plan.targetDate }}</strong></span>
              </span>
              <button
                type="button"
                class="text-neutral-400 hover:text-red-500 transition-colors cursor-pointer"
                title="Hapus"
                @click="konsultanStore.deleteActionPlan(plan.id)"
              >
                <HugeiconsIcon :icon="Delete02Icon" :size="15" :stroke-width="1.8" />
              </button>
            </div>
          </div>

          <div class="flex items-start justify-between gap-4">
            <div class="space-y-1 flex-1">
              <h4 class="font-heading font-bold text-sm sm:text-base text-neutral-900 dark:text-white">
                {{ plan.title }}
              </h4>
              <p class="text-xs text-neutral-600 dark:text-neutral-300 leading-relaxed">
                {{ plan.description }}
              </p>
              <div v-if="plan.consultantNotes" class="mt-2 text-[11px] text-[#0081A0] dark:text-[#2091AA] bg-sky-50 dark:bg-sky-950/30 p-2 rounded-lg border border-sky-100 dark:border-sky-900/30">
                <strong>Catatan Konsultan:</strong> {{ plan.consultantNotes }}
              </div>
            </div>

            <!-- Status Toggle -->
            <div class="shrink-0 flex items-center p-0.5 rounded-xl bg-neutral-100 dark:bg-[#1A1D26] border border-neutral-200/80 dark:border-white/10 text-xs">
              <button
                type="button"
                :class="[
                  'px-2 py-1 rounded-lg transition-all cursor-pointer font-semibold',
                  plan.status === 'TODO' ? 'bg-neutral-300 dark:bg-neutral-700 text-neutral-900 dark:text-white' : 'text-neutral-400'
                ]"
                @click="konsultanStore.updateActionPlanStatus(plan.id, 'TODO')"
              >
                Belum
              </button>
              <button
                type="button"
                :class="[
                  'px-2 py-1 rounded-lg transition-all cursor-pointer font-semibold',
                  plan.status === 'IN_PROGRESS' ? 'bg-amber-500 text-white' : 'text-neutral-400'
                ]"
                @click="konsultanStore.updateActionPlanStatus(plan.id, 'IN_PROGRESS')"
              >
                Proses
              </button>
              <button
                type="button"
                :class="[
                  'px-2 py-1 rounded-lg transition-all cursor-pointer font-semibold flex items-center gap-1',
                  plan.status === 'DONE' ? 'bg-[#00AA13] text-white' : 'text-neutral-400'
                ]"
                @click="konsultanStore.updateActionPlanStatus(plan.id, 'DONE')"
              >
                <HugeiconsIcon :icon="CheckmarkCircle01Icon" :size="11" :stroke-width="2.5" />
                <span>Selesai</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div v-else class="p-8 text-center bg-neutral-50 dark:bg-[#1A1D26] rounded-2xl border border-neutral-200 dark:border-white/10 text-xs text-neutral-500">
        Belum ada action plan khusus untuk klien ini. Klik tombol "+ Beri Action Plan" di atas untuk menugaskan.
      </div>

      <!-- Add Task Modal -->
      <BModal
        v-model="showAddTaskModal"
        title="Beri Action Plan Baru ke Klien Ini"
      >
        <div class="space-y-3.5 text-left">
          <div>
            <label class="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1 font-heading">
              Judul Tugas / Rencana Aksi <span class="text-red-500">*</span>
            </label>
            <input
              v-model="newTask.title"
              type="text"
              placeholder="Contoh: Pisahkan rekening usaha dan selesaikan sertifikasi halal"
              class="w-full px-3.5 py-2 rounded-xl text-xs border border-border-light dark:border-border-dark bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 focus:outline-none focus:ring-1 focus:ring-[#0081A0]"
            />
          </div>

          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1 font-heading">
                Pilar Bisnis
              </label>
              <select
                v-model="newTask.pillar"
                class="w-full px-3 py-2 rounded-xl text-xs border border-border-light dark:border-border-dark bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100"
              >
                <option value="Keuangan">Keuangan</option>
                <option value="Operasional">Operasional</option>
                <option value="Legalitas">Legalitas</option>
                <option value="Pemasaran">Pemasaran</option>
                <option value="SDM">SDM</option>
              </select>
            </div>

            <div>
              <label class="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1 font-heading">
                Prioritas
              </label>
              <select
                v-model="newTask.priority"
                class="w-full px-3 py-2 rounded-xl text-xs border border-border-light dark:border-border-dark bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100"
              >
                <option value="Tinggi">Tinggi</option>
                <option value="Sedang">Sedang</option>
                <option value="Rendah">Rendah</option>
              </select>
            </div>
          </div>

          <div>
            <label class="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1 font-heading">
              Target Selesai
            </label>
            <input
              v-model="newTask.targetDate"
              type="text"
              placeholder="Contoh: 15 Nov 2026"
              class="w-full px-3.5 py-2 rounded-xl text-xs border border-border-light dark:border-border-dark bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 focus:outline-none focus:ring-1 focus:ring-[#0081A0]"
            />
          </div>

          <div>
            <label class="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1 font-heading">
              Panduan Langkah Aksi <span class="text-red-500">*</span>
            </label>
            <textarea
              v-model="newTask.description"
              rows="2"
              placeholder="Jelaskan langkah yang harus dilakukan UMKM..."
              class="w-full px-3.5 py-2 rounded-xl text-xs border border-border-light dark:border-border-dark bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 focus:outline-none focus:ring-1 focus:ring-[#0081A0]"
            />
          </div>

          <div>
            <label class="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1 font-heading">
              Catatan Konsultan (Opsional)
            </label>
            <input
              v-model="newTask.consultantNotes"
              type="text"
              placeholder="Catatan tambahan..."
              class="w-full px-3.5 py-2 rounded-xl text-xs border border-border-light dark:border-border-dark bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100"
            />
          </div>
        </div>
        <template #footer="{ close }">
          <BButton variant="outline" size="sm" @click="close">Batal</BButton>
          <BButton variant="primary" size="sm" @click="saveNewTask">Tugaskan Action Plan</BButton>
        </template>
      </BModal>
    </div>

    <!-- Tab 3: Progres Bulanan -->
    <div v-else class="space-y-4">
      <div class="p-6 bg-surface-light dark:bg-surface-dark rounded-2xl border border-border-light dark:border-border-dark">
        <BLineAreaChart
          title="Verifikasi Kinerja Historis"
          :categories="['Mei', 'Jun', 'Jul', 'Agu', 'Sep']"
          :series="[
            { id: 'omzet', name: 'Omzet (Juta Rp)', color: '#1F52EB', data: [46, 52, 58, 65, 73] },
            { id: 'hpp', name: 'HPP (Juta Rp)', color: '#FF4B4B', data: [21, 23.5, 26, 29, 34.5] }
          ]"
          :value-formatter="(v) => `Rp ${v} Juta`"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useKonsultanStore } from '~/stores/konsultan'
import { useUmkmStore } from '~/stores/umkm'
import BCard from '~/components/base/BCard.vue'
import BButton from '~/components/base/BButton.vue'
import BModal from '~/components/base/BModal.vue'
import BRadarChart from '~/components/base/BRadarChart.vue'
import BLineAreaChart from '~/components/base/BLineAreaChart.vue'
import { HugeiconsIcon } from '@hugeicons/vue'
import {
  Award01Icon,
  CheckmarkCircle01Icon,
  Calendar01Icon,
  Delete02Icon
} from '@hugeicons/core-free-icons'

definePageMeta({
  layout: 'dashboard'
})

const route = useRoute()
const clientId = computed(() => route.params.id as string || 'umkm-01')

const konsultanStore = useKonsultanStore()
const umkmStore = useUmkmStore()

const client = computed(() => {
  return konsultanStore.clients.find(c => c.id === clientId.value) || konsultanStore.clients[0]
})

const clientActionPlans = computed(() => {
  return konsultanStore.actionPlans.filter(p => p.clientId === (client.value?.id || clientId.value))
})

const activeTab = ref('overview')
const showAddTaskModal = ref(false)

const tabs = [
  { key: 'overview', label: 'Ringkasan & Radar Aspek' },
  { key: 'action_plan', label: 'Kelola Rencana Aksi' },
  { key: 'progress', label: 'Riwayat Finansial' }
]

const radarData = computed(() => {
  return umkmStore.assessmentAspects.map(a => ({
    name: a.name.split(' ')[0],
    score: a.score,
    maxScore: a.maxScore,
    targetScore: a.targetScore
  }))
})

const newTask = ref({
  title: '',
  pillar: 'Keuangan' as 'Keuangan' | 'Operasional' | 'Legalitas' | 'Pemasaran' | 'SDM',
  priority: 'Tinggi' as 'Tinggi' | 'Sedang' | 'Rendah',
  targetDate: '2 Minggu ke Depan',
  description: '',
  consultantNotes: ''
})

function saveNewTask() {
  if (!newTask.value.title || !newTask.value.description) return

  konsultanStore.addActionPlan({
    clientId: client.value?.id || clientId.value,
    title: newTask.value.title,
    description: newTask.value.description,
    pillar: newTask.value.pillar,
    priority: newTask.value.priority,
    targetDate: newTask.value.targetDate || '2 Minggu ke Depan',
    consultantNotes: newTask.value.consultantNotes
  })

  newTask.value = {
    title: '',
    pillar: 'Keuangan',
    priority: 'Tinggi',
    targetDate: '2 Minggu ke Depan',
    description: '',
    consultantNotes: ''
  }
  showAddTaskModal.value = false
}
</script>
