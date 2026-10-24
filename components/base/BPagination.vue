<template>
  <div
    v-if="totalItems > pageSize"
    class="flex flex-col sm:flex-row items-center justify-between gap-3.5 px-6 py-4 border-t border-[#E2E8F0] dark:border-neutral-800 bg-[#FFFFFF] dark:bg-[#13161F] text-xs sm:text-sm font-poppins"
  >
    <!-- Counter summary text -->
    <div class="text-neutral-500 dark:text-neutral-400">
      Menampilkan
      <strong class="font-semibold text-neutral-900 dark:text-white tabular-nums">
        {{ startIndex }}–{{ endIndex }}
      </strong>
      dari
      <strong class="font-semibold text-neutral-900 dark:text-white tabular-nums">
        {{ totalItems }}
      </strong>
      {{ itemLabel }}
    </div>

    <!-- Navigation Controls -->
    <div class="inline-flex items-center gap-1.5 sm:gap-2">
      <!-- Prev Button -->
      <button
        type="button"
        :disabled="currentPage <= 1"
        :class="[
          'btn-pill-action px-3 py-1.5 text-xs inline-flex items-center gap-1',
          currentPage <= 1 ? 'opacity-40 cursor-not-allowed pointer-events-none' : 'cursor-pointer'
        ]"
        title="Halaman Sebelumnya"
        aria-label="Halaman Sebelumnya"
        @click="goToPage(currentPage - 1)"
      >
        <HugeiconsIcon :icon="ArrowLeft01Icon" :size="14" :stroke-width="2" />
        <span class="hidden sm:inline">Sebelumnya</span>
      </button>

      <!-- Page Numbers -->
      <div class="inline-flex items-center gap-1">
        <template v-for="(p, idx) in visiblePages" :key="`page-${idx}`">
          <span
            v-if="p === '...'"
            class="px-2 py-1 text-neutral-400 select-none text-xs"
          >
            …
          </span>
          <button
            v-else
            type="button"
            :class="[
              'min-w-[32px] h-8 px-2.5 rounded-[10px] text-xs font-semibold tabular-nums transition-all duration-150 flex items-center justify-center cursor-pointer',
              currentPage === p
                ? 'bg-[#00800e] text-white shadow-none border border-[#00800e]'
                : 'bg-white dark:bg-[#18191E] text-neutral-700 dark:text-neutral-300 border border-[#CBD5E1] dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800'
            ]"
            :aria-current="currentPage === p ? 'page' : undefined"
            @click="goToPage(Number(p))"
          >
            {{ p }}
          </button>
        </template>
      </div>

      <!-- Next Button -->
      <button
        type="button"
        :disabled="currentPage >= totalPages"
        :class="[
          'btn-pill-action px-3 py-1.5 text-xs inline-flex items-center gap-1',
          currentPage >= totalPages ? 'opacity-40 cursor-not-allowed pointer-events-none' : 'cursor-pointer'
        ]"
        title="Halaman Berikutnya"
        aria-label="Halaman Berikutnya"
        @click="goToPage(currentPage + 1)"
      >
        <span class="hidden sm:inline">Berikutnya</span>
        <HugeiconsIcon :icon="ArrowRight01Icon" :size="14" :stroke-width="2" />
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { HugeiconsIcon } from '@hugeicons/vue'
import { ArrowLeft01Icon, ArrowRight01Icon } from '@hugeicons/core-free-icons'

const props = withDefaults(
  defineProps<{
    currentPage: number
    totalItems: number
    pageSize?: number
    itemLabel?: string
  }>(),
  {
    pageSize: 10,
    itemLabel: 'data'
  }
)

const emit = defineEmits<{
  (e: 'update:currentPage', page: number): void
}>()

const totalPages = computed(() => {
  return Math.max(1, Math.ceil(props.totalItems / props.pageSize))
})

const startIndex = computed(() => {
  if (props.totalItems === 0) return 0
  return (props.currentPage - 1) * props.pageSize + 1
})

const endIndex = computed(() => {
  return Math.min(props.currentPage * props.pageSize, props.totalItems)
})

const visiblePages = computed(() => {
  const total = totalPages.value
  const current = props.currentPage

  if (total <= 5) {
    return Array.from({ length: total }, (_, i) => i + 1)
  }

  const pages: (number | string)[] = []
  if (current <= 3) {
    pages.push(1, 2, 3, 4, '...', total)
  } else if (current >= total - 2) {
    pages.push(1, '...', total - 3, total - 2, total - 1, total)
  } else {
    pages.push(1, '...', current - 1, current, current + 1, '...', total)
  }

  return pages
})

function goToPage(page: number) {
  if (page < 1 || page > totalPages.value || page === props.currentPage) return
  emit('update:currentPage', page)
}
</script>
