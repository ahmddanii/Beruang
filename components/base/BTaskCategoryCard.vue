<template>
  <div class="card-tactile-gopay rounded-[22px] p-6 sm:p-7 space-y-6 font-poppins">
    <!-- Category Header: Icon on Top, Category Title below it, and Completion Badge on Right (matching design reference) -->
    <div class="space-y-2 border-b border-neutral-100 dark:border-neutral-800/80 pb-5">
      <div
        v-if="icon"
        class="w-9 h-9 rounded-xl flex items-center justify-center text-neutral-800 dark:text-neutral-100 bg-neutral-100/70 dark:bg-neutral-800/60"
      >
        <HugeiconsIcon
          :icon="icon"
          :size="20"
          :stroke-width="2"
        />
      </div>

      <div class="flex items-center justify-between gap-3 flex-wrap pt-1">
        <h2 class="text-xl sm:text-2xl font-poppins font-bold text-neutral-900 dark:text-white tracking-tight">
          {{ title }}
        </h2>
        <span
          v-if="badgeText || (totalCount !== undefined && completedCount !== undefined)"
          class="inline-flex items-center gap-1.5 text-xs font-poppins font-medium px-3 py-1 rounded-full bg-neutral-100 dark:bg-neutral-800/80 text-neutral-600 dark:text-neutral-300"
        >
          <span>{{ badgeText || `${completedCount}/${totalCount} Selesai` }}</span>
        </span>
      </div>
    </div>

    <!-- Tasks List in this Category -->
    <div class="space-y-6">
      <div
        v-for="task in tasks"
        :key="task.id"
        class="space-y-3 pt-5 first:pt-0 border-t first:border-t-0 border-neutral-100 dark:border-neutral-800/80"
      >
        <!-- Parent Task Header Row: Chevron Arrow on Left, Title, Deadline, Actions -->
        <div class="flex items-start gap-2.5 sm:gap-3 group">
          <!-- Left Chevron Toggle Button or Indicator -->
          <button
            v-if="collapsible"
            type="button"
            class="p-1 rounded-md text-neutral-400 hover:text-neutral-700 dark:text-neutral-500 dark:hover:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800/70 transition-colors shrink-0 mt-0.5 cursor-pointer"
            :title="isTaskCollapsed(task.id) ? 'Buka rincian tugas' : 'Ciutkan rincian tugas'"
            :aria-label="isTaskCollapsed(task.id) ? 'Buka rincian tugas' : 'Ciutkan rincian tugas'"
            @click="toggleTaskCollapse(task.id)"
          >
            <HugeiconsIcon
              :icon="isTaskCollapsed(task.id) ? ArrowUp01Icon : ArrowDown01Icon"
              :size="18"
              :stroke-width="2.2"
            />
          </button>
          <span
            v-else
            class="p-1 text-neutral-400 dark:text-neutral-500 shrink-0 mt-0.5"
          >
            <HugeiconsIcon
              :icon="ArrowDown01Icon"
              :size="18"
              :stroke-width="2.2"
            />
          </span>

          <!-- Task Content (Title & Meta) -->
          <div class="min-w-0 flex-1">
            <div class="flex flex-col sm:flex-row sm:items-start justify-between gap-2.5 sm:gap-3">
              <div
                class="min-w-0 flex-1"
                :class="collapsible ? 'cursor-pointer' : ''"
                @click="collapsible ? toggleTaskCollapse(task.id) : undefined"
              >
                <!-- Task Title -->
                <h3
                  :class="[
                    'font-poppins font-semibold text-base sm:text-[17px] leading-snug transition-colors',
                    task.completed ? 'text-neutral-900 dark:text-white' : 'text-neutral-900 dark:text-white'
                  ]"
                >
                  {{ task.title }}
                </h3>

                <!-- Deadline Subline: Calendar Icon + Date + Catatan Konsultan -->
                <div class="flex items-center gap-1.5 text-xs sm:text-[13px] text-neutral-500 dark:text-neutral-400 mt-1 flex-wrap">
                  <HugeiconsIcon :icon="Calendar03Icon" :size="14" class="shrink-0" />
                  <span>Tenggat: <strong class="text-neutral-700 dark:text-neutral-300 font-semibold">{{ task.dueDate }}</strong></span>
                  <span v-if="task.consultantNote || task.note" class="hidden sm:inline text-neutral-300 dark:text-neutral-600">•</span>
                  <span v-if="task.consultantNote || task.note" class="text-[#156374] dark:text-[#50AABF] text-xs">
                    Catatan: {{ task.consultantNote || task.note }}
                  </span>
                </div>
              </div>

              <!-- Right Action Button: e.g. Lihat Berkas (Full-width on mobile) -->
              <div class="flex items-center gap-2 shrink-0 w-full sm:w-auto [&>*]:w-full sm:[&>*]:w-auto pt-1 sm:pt-0">
                <slot name="action" :task="task">
                  <button
                    type="button"
                    class="btn-pill-action text-xs shrink-0 cursor-pointer justify-center"
                    :title="task.actionTitle || 'Lihat Berkas Dokumen'"
                    @click="$emit('action', task)"
                  >
                    <HugeiconsIcon
                      :icon="FileValidationIcon"
                      :size="14"
                      class="text-neutral-500 dark:text-neutral-400 mr-1.5"
                    />
                    <span>{{ task.actionLabel || 'Lihat Berkas' }}</span>
                  </button>
                </slot>
              </div>
            </div>

            <!-- Optional Sub-steps or Details slot -->
            <div v-if="!isTaskCollapsed(task.id)">
              <slot name="details" :task="task" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { HugeiconsIcon } from '@hugeicons/vue'
import {
  ArrowDown01Icon,
  ArrowUp01Icon,
  Calendar03Icon,
  FileValidationIcon
} from '@hugeicons/core-free-icons'

export interface TaskItem {
  id: string | number
  title: string
  dueDate: string
  completed?: boolean
  consultantNote?: string
  note?: string
  actionLabel?: string
  actionTitle?: string
  [key: string]: any
}

const props = withDefaults(
  defineProps<{
    title: string
    icon?: any
    badgeText?: string
    completedCount?: number
    totalCount?: number
    tasks: TaskItem[]
    collapsible?: boolean
    defaultCollapsed?: boolean
  }>(),
  {
    icon: undefined,
    badgeText: '',
    completedCount: undefined,
    totalCount: undefined,
    collapsible: false,
    defaultCollapsed: false
  }
)

defineEmits<{
  (e: 'action', task: TaskItem): void
}>()

const collapsedMap = ref<Record<string, boolean>>({})

function isTaskCollapsed(taskId: string | number): boolean {
  if (collapsedMap.value[String(taskId)] !== undefined) {
    return collapsedMap.value[String(taskId)]
  }
  return props.defaultCollapsed
}

function toggleTaskCollapse(taskId: string | number) {
  collapsedMap.value[String(taskId)] = !isTaskCollapsed(taskId)
}
</script>

<style scoped>
.btn-pill-action {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  font-family: 'Poppins', sans-serif;
  font-weight: 600;
  border: 1px solid #CBD5E1;
  background-color: #FFFFFF;
  color: #171717;
  box-shadow: 0 1.5px 0px 0 rgba(0, 0, 0, 0.06);
  transition: all 0.15s ease-in-out;
}

.dark .btn-pill-action {
  border-color: rgba(253, 253, 253, 0.16);
  background-color: #1A1A1A;
  color: #FDFDFD;
  box-shadow: 0 2px 0px 0 rgba(0, 0, 0, 0.3);
}

.btn-pill-action:hover {
  background-color: #F8FAFC;
  border-color: #CBD5E1;
  box-shadow: 0 2px 0px 0 rgba(0, 0, 0, 0.10);
}

.dark .btn-pill-action:hover {
  background-color: #262626;
  border-color: rgba(253, 253, 253, 0.28);
  box-shadow: 0 2px 0px 0 rgba(0, 0, 0, 0.3);
}

.btn-pill-action:active {
  box-shadow: 0 1px 0px 0 rgba(0, 0, 0, 0.08);
}
</style>
