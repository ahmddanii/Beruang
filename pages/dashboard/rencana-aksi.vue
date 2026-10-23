<template>
  <div class="space-y-6 sm:space-y-8 pb-16 font-poppins text-neutral-900 dark:text-neutral-100">
    <!-- 1. Top Header: Title on Left -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 min-h-[44px]">
      <div class="flex items-center gap-2.5 sm:gap-3">
        <HugeiconsIcon
          :icon="Task01Icon"
          :size="26"
          :stroke-width="2.2"
          class="text-neutral-900 dark:text-white shrink-0"
        />
        <h1 class="font-poppins font-semibold text-2xl sm:text-3xl text-neutral-900 dark:text-white tracking-tight leading-tight">
          Progress Tugas
        </h1>
      </div>
    </div>


    <!-- Task Status Filter Tabs (BPillTabs: Tugas yang dikerjakan, Tugas yang diselesaikan) -->
    <div class="w-full">
      <BPillTabs
        v-model="statusFilter"
        :tabs="statusTabItems"
        size="md"
      />
    </div>

    <!-- 5. Category Task Containers (AWS AI Academy Reference Layout) -->
    <div id="milestones-container" class="space-y-6 min-h-[420px]">
      <!-- Category Card Container via Reusable BTaskCategoryCard -->
      <BTaskCategoryCard
        v-for="group in filteredCategoryGroups"
        :key="group.category"
        class="gsap-stagger-card"
        :title="group.title"
        :icon="group.icon"
        :completed-count="group.tasks.filter(t => t.completed).length"
        :total-count="group.tasks.length"
        :tasks="group.tasks"
        :collapsible="true"
        @action="openEvidenceModal"
      >
        <template #action="{ task }">
          <button
            type="button"
            class="btn-pill-action text-xs shrink-0 cursor-pointer"
            title="Lihat atau Unggah Bukti Dokumen Pelaksanaan Tugas"
            @click.stop="openEvidenceModal(task)"
          >
            <HugeiconsIcon
              :icon="FileValidationIcon"
              :size="14"
              class="text-neutral-500 dark:text-neutral-400 mr-1.5"
            />
            <span>{{ taskEvidenceMap[task.id] ? 'Lihat Berkas' : 'Unggah Bukti' }}</span>
          </button>
        </template>

        <template #details="{ task }">
          <!-- Child Sub-Tasks / Step-by-Step (Compactable) -->
          <div
            class="mt-3.5 border-t border-neutral-100 dark:border-neutral-800/80 divide-y divide-neutral-100 dark:divide-neutral-800/80"
          >
            <div
              v-for="step in task.steps"
              :key="step.id"
              class="py-3 sm:py-3.5 flex items-center gap-3 cursor-pointer group/step hover:bg-neutral-50/70 dark:hover:bg-neutral-800/30 px-2 rounded-lg transition-colors"
              @click="umkmStore.toggleTaskStep(task.id, step.id)"
            >
              <!-- Circle Icon (Hollow without fill if incomplete, solid filled green if complete) -->
              <div
                :class="[
                  'w-4 h-4 rounded-full flex items-center justify-center shrink-0 transition-all',
                  step.completed
                    ? 'bg-[#00800e] text-white shadow-2xs'
                    : 'border-2 border-neutral-400 dark:border-neutral-500 bg-transparent group-hover/step:border-[#00800e]'
                ]"
              >
                <HugeiconsIcon
                  v-if="step.completed"
                  :icon="Tick02Icon"
                  :size="10"
                  :stroke-width="3"
                />
              </div>

              <!-- Step Title (Faded with line-through if completed) -->
              <span
                :class="[
                  'text-xs sm:text-[13px] font-poppins transition-colors leading-relaxed',
                  step.completed
                    ? 'text-neutral-400 dark:text-neutral-500 line-through'
                    : 'text-neutral-800 dark:text-neutral-200 group-hover/step:text-neutral-900 dark:group-hover/step:text-white font-medium'
                ]"
              >
                {{ step.title }}
              </span>
            </div>
          </div>
        </template>
      </BTaskCategoryCard>

      <!-- Empty state when no tasks match filter -->
      <div v-if="totalDisplayedTasks === 0" class="card-tactile-gopay rounded-[18px] p-12 text-center space-y-2">
        <h4 class="font-semibold text-neutral-900 dark:text-white text-base">
          {{ statusFilter === 'PENDING' ? 'Semua tugas saat ini telah selesai!' : 'Belum ada tugas yang diselesaikan' }}
        </h4>
        <p class="text-xs text-neutral-500 max-w-sm mx-auto">
          {{ statusFilter === 'PENDING' ? 'Hebat! Anda dapat melihat riwayat tugas pada tab tugas yang diselesaikan.' : 'Kerjakan tugas aktif untuk memperkuat kesiapan pendanaan tokomu.' }}
        </p>
        <button
          type="button"
          class="btn-pill-action mt-2 cursor-pointer"
          @click="statusFilter = statusFilter === 'PENDING' ? 'COMPLETED' : 'PENDING'"
        >
          Lihat {{ statusFilter === 'PENDING' ? 'Tugas yang diselesaikan' : 'Tugas yang dikerjakan' }}
        </button>
      </div>
    </div>


    <!-- 7. Modal: Pratinjau / Unggah Bukti Dokumen (BModal Reusable) -->
    <BModal
      v-model="isEvidenceModalOpen"
      :title="selectedTaskEvidence ? selectedTaskEvidence.title : 'Bukti Dokumen Pelaksanaan Tugas'"
      subtitle="Dokumentasi verifikasi pemenuhan langkah tugas"
      size="md"
    >
      <div v-if="selectedTaskEvidence" class="space-y-4 pt-1 font-poppins text-xs">
        <div class="p-4 rounded-xl bg-neutral-50 dark:bg-[#18191E] border border-neutral-200/80 dark:border-neutral-800 space-y-2">
          <div class="flex items-center justify-between">
            <span class="text-neutral-500">Nomor Registrasi:</span>
            <span class="font-mono font-semibold text-neutral-800 dark:text-neutral-200">{{ selectedTaskEvidence.regNo }}</span>
          </div>
          <div class="flex items-center justify-between">
            <span class="text-neutral-500">Penerbit Dokumen:</span>
            <span class="font-semibold text-neutral-800 dark:text-neutral-200">{{ selectedTaskEvidence.issuer }}</span>
          </div>
          <div class="flex items-center justify-between">
            <span class="text-neutral-500">Klasifikasi:</span>
            <span class="font-semibold text-[#156374] dark:text-[#50AABF]">{{ selectedTaskEvidence.classification }}</span>
          </div>
        </div>

        <div v-if="selectedTaskEvidence.file" class="p-3.5 rounded-xl border border-emerald-200 dark:border-emerald-800/60 bg-emerald-50/50 dark:bg-emerald-950/30 flex items-center justify-between gap-3">
          <div class="flex items-center gap-2.5 min-w-0">
            <HugeiconsIcon :icon="ShieldCheckIcon" :size="20" class="text-[#00800e] shrink-0" />
            <div class="min-w-0">
              <span class="font-semibold text-neutral-900 dark:text-white truncate block text-xs">
                {{ selectedTaskEvidence.file.name }}
              </span>
              <span class="text-[11px] text-neutral-500">
                {{ selectedTaskEvidence.file.size }} • Terverifikasi
              </span>
            </div>
          </div>
          <button
            type="button"
            class="text-[11px] font-semibold text-[#156374] dark:text-[#50AABF] hover:underline shrink-0"
            @click="triggerEvidenceUpload()"
          >
            Ganti Berkas
          </button>
        </div>

        <input
          ref="evidenceFileInputRef"
          type="file"
          class="hidden"
          accept=".pdf,.png,.jpg,.jpeg"
          @change="onEvidenceFileSelected"
        />

        <div class="flex items-center justify-end gap-2.5 pt-3 border-t border-neutral-100 dark:border-neutral-800">
          <button
            type="button"
            class="btn-pill-action"
            @click="isEvidenceModalOpen = false"
          >
            Tutup
          </button>
          <BActionButton
            variant="default"
            icon="download"
            @click="triggerToast('Mengunduh salinan berkas bukti...')"
          >
            Unduh Berkas
          </BActionButton>
        </div>
      </div>
    </BModal>

    <!-- Success Toast -->
    <div
      v-if="showSuccessToast"
      class="fixed bottom-6 right-6 z-50 px-4 py-3 rounded-xl bg-emerald-600 text-white font-poppins text-xs font-semibold shadow-lg flex items-center gap-2 transition-all animate-in fade-in slide-in-from-bottom-2"
    >
      <HugeiconsIcon :icon="CheckmarkCircle01Icon" :size="16" />
      <span>{{ toastMessage }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import gsap from 'gsap'
import BActionButton from '~/components/base/BActionButton.vue'
import BPillTabs, { type PillTabItem } from '~/components/base/BPillTabs.vue'
import BModal from '~/components/base/BModal.vue'
import BTaskCategoryCard from '~/components/base/BTaskCategoryCard.vue'
import { HugeiconsIcon } from '@hugeicons/vue'
import {
  Task01Icon,
  Coins01Icon,
  CourtLawIcon,
  Package01Icon,
  UserGroupIcon,
  ArrowDown01Icon,
  ArrowUp01Icon,
  Calendar03Icon,
  Tick02Icon,
  CheckmarkCircle01Icon,
  CheckmarkBadge01Icon,
  Clock01Icon,
  FileValidationIcon,
  ShieldCheckIcon
} from '@hugeicons/core-free-icons'

definePageMeta({
  layout: 'dashboard',
  hideHeader: true
})

const umkmStore = useUmkmStore()

// Task Counts
const completedTasksCount = computed(() => {
  return umkmStore.tasks.filter(t => t.completed).length
})

const remainingTasksCount = computed(() => {
  return umkmStore.tasks.filter(t => !t.completed).length
})

// Status Filter ('PENDING' | 'COMPLETED')
const statusFilter = ref<'PENDING' | 'COMPLETED'>('PENDING')

const statusTabItems = computed<PillTabItem[]>(() => [
  { id: 'PENDING', label: 'Tugas yang dikerjakan', count: remainingTasksCount.value },
  { id: 'COMPLETED', label: 'Tugas yang diselesaikan', count: completedTasksCount.value }
])

// Collapsed state per parent task (default expanded)
const collapsedTasks = ref<Record<string, boolean>>({})

function isTaskCollapsed(taskId: string): boolean {
  return !!collapsedTasks.value[taskId]
}

function toggleTaskCollapse(taskId: string) {
  collapsedTasks.value[taskId] = !collapsedTasks.value[taskId]
}

// Category Configuration
const categoryConfigs = [
  { category: 'Finansial', title: 'Finansial', icon: Coins01Icon },
  { category: 'Legalitas', title: 'Legalitas', icon: CourtLawIcon },
  { category: 'Operasional', title: 'Operasional', icon: Package01Icon },
  { category: 'Tata Kelola', title: 'Tata Kelola', icon: UserGroupIcon }
]

const filteredCategoryGroups = computed(() => {
  return categoryConfigs
    .map(cfg => {
      let tasks = umkmStore.tasks.filter(t => t.category === cfg.category)
      if (statusFilter.value === 'PENDING') {
        tasks = tasks.filter(t => !t.completed)
      } else if (statusFilter.value === 'COMPLETED') {
        tasks = tasks.filter(t => t.completed)
      }
      return {
        category: cfg.category,
        title: cfg.title,
        icon: cfg.icon,
        tasks
      }
    })
    .filter(g => g.tasks.length > 0)
})

const totalDisplayedTasks = computed(() => {
  return filteredCategoryGroups.value.reduce((acc, g) => acc + g.tasks.length, 0)
})

// Evidence Modal & Storage
const isEvidenceModalOpen = ref(false)
const selectedTaskForPreview = ref<any>(null)
const evidenceFileInputRef = ref<HTMLInputElement | null>(null)
const currentUploadTaskId = ref<string | null>(null)

const defaultTaskEvidence: Record<string, any> = {
  't-1': {
    title: 'Rekening Giro Operasional Usaha',
    issuer: 'PT Bank Mandiri (Persero) Tbk · KCP Fatmawati',
    regNo: 'MDR/KORAN/2026/0912',
    classification: 'Pemisahan Kas Pribadi & Bisnis',
    date: '10 Juli 2026',
    file: { name: 'Rekening_Giro_Mandiri_KopiSenja.pdf', size: '1.2 MB' }
  },
  't-2': {
    title: 'Dokumentasi Sertifikat Halal & NIB',
    issuer: 'BPJPH Kemenag RI & OSS RBA',
    regNo: 'OSS-RBA-91283019283 / ID321100019283',
    classification: 'Perizinan Usaha Terverifikasi',
    date: '25 Juli 2026',
    file: { name: 'Sertifikat_Halal_NIB_Kasir.pdf', size: '2.1 MB' }
  },
  't-3': {
    title: 'Lembar Opname Kartu Stok Bahan Baku',
    issuer: 'SOP Manajemen Persediaan Gerai',
    regNo: 'SOP-STOK-WK42/2026',
    classification: 'Pengendalian Biaya Bahan',
    date: '15 Agustus 2026',
    file: { name: 'Kartu_Stok_Mingguan_Outlet.pdf', size: '980 KB' }
  }
}

const taskEvidenceMap = ref<Record<string, any>>({ ...defaultTaskEvidence })

const selectedTaskEvidence = computed(() => {
  if (!selectedTaskForPreview.value) return null
  const taskId = selectedTaskForPreview.value.id
  if (!taskEvidenceMap.value[taskId]) {
    taskEvidenceMap.value[taskId] = {
      title: `Bukti Pelaksanaan Tugas - ${selectedTaskForPreview.value.title}`,
      issuer: 'Konsultan & Tim Operasional Gerai',
      regNo: `EVD/${taskId.toUpperCase()}/2026`,
      classification: 'Dokumentasi Kepatuhan Langkah Tugas',
      date: selectedTaskForPreview.value.dueDate || 'Oktober 2026',
      file: { name: `Bukti_Dokumen_${taskId}.pdf`, size: '1.1 MB' }
    }
  }
  return taskEvidenceMap.value[taskId]
})

function openEvidenceModal(task: any) {
  selectedTaskForPreview.value = task
  isEvidenceModalOpen.value = true
}

function triggerEvidenceUpload() {
  currentUploadTaskId.value = selectedTaskForPreview.value?.id || null
  if (evidenceFileInputRef.value) {
    evidenceFileInputRef.value.value = ''
    evidenceFileInputRef.value.click()
  }
}

function onEvidenceFileSelected(event: Event) {
  const input = event.target as HTMLInputElement
  if (!input.files || !input.files[0] || !currentUploadTaskId.value) return
  const file = input.files[0]
  const sizeFormatted = file.size > 1024 * 1024
    ? `${(file.size / (1024 * 1024)).toFixed(1)} MB`
    : `${Math.round(file.size / 1024)} KB`

  taskEvidenceMap.value[currentUploadTaskId.value] = {
    ...taskEvidenceMap.value[currentUploadTaskId.value],
    file: {
      name: file.name,
      size: sizeFormatted
    }
  }
  triggerToast('Berkas bukti tugas berhasil diperbarui!')
}

// Toast
const showSuccessToast = ref(false)
const toastMessage = ref('')
let toastTimer: any = null

function triggerToast(msg: string) {
  if (toastTimer) clearTimeout(toastTimer)
  toastMessage.value = msg
  showSuccessToast.value = true
  toastTimer = setTimeout(() => {
    showSuccessToast.value = false
  }, 2500)
}

onMounted(() => {
  // GSAP subtle entrance staggers
  gsap.from('.gsap-stagger-card', {
    opacity: 0,
    y: 12,
    duration: 0.4,
    stagger: 0.07,
    ease: 'power2.out'
  })
})
</script>

<style scoped>
.card-tactile-gopay,
:deep(.card-tactile-gopay) {
  background-color: #FFFFFF !important;
  box-shadow: none !important;
  border-width: 1.5px !important;
  border-color: #E2E8F0 !important;
}

.dark .card-tactile-gopay,
:deep(.dark .card-tactile-gopay),
:deep(.dark) .card-tactile-gopay {
  background-color: #13161F !important;
  border-color: rgba(255, 255, 255, 0.15) !important;
}

.card-tactile-gopay::before,
:deep(.card-tactile-gopay::before) {
  display: none !important;
  box-shadow: none !important;
}
</style>
