<template>
  <div class="w-full">
    <div class="flex items-center justify-between relative">
      <!-- Background Connecting Line -->
      <div class="absolute left-6 right-6 top-5 -translate-y-1/2 h-1 bg-neutral-200 dark:bg-neutral-800 -z-0">
        <!-- Completed line progress -->
        <div
          class="h-full bg-primary-500 transition-all duration-300 ease-out"
          :style="{ width: `${(Math.max(0, currentStep - 1) / Math.max(1, steps.length - 1)) * 100}%` }"
        />
      </div>

      <!-- Step Nodes -->
      <div
        v-for="(step, index) in steps"
        :key="index"
        class="flex flex-col items-center relative z-10 group cursor-default"
      >
        <!-- Step Bubble -->
        <div
          :class="[
            'w-10 h-10 rounded-full flex items-center justify-center  font-bold text-sm transition-all duration-200 border-2 select-none',
            index + 1 < currentStep
              ? 'bg-success text-white border-success-dark shadow-xs'
              : index + 1 === currentStep
                ? 'bg-primary-500 text-white border-primary-700 shadow-chunky-sm scale-110'
                : 'bg-white dark:bg-neutral-900 text-neutral-400 border-neutral-300 dark:border-neutral-700'
          ]"
        >
          <!-- Completed Checkmark -->
          <svg
            v-if="index + 1 < currentStep"
            class="w-5 h-5 text-white stroke-[3]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
          <!-- Step Number -->
          <span v-else>{{ index + 1 }}</span>
        </div>

        <!-- Step Label -->
        <span
          :class="[
            'mt-2 text-xs font-semibold tracking-tight text-center max-w-[90px] truncate transition-colors ',
            index + 1 === currentStep
              ? 'text-primary-600 dark:text-primary-400 font-bold'
              : index + 1 < currentStep
                ? 'text-neutral-800 dark:text-neutral-200'
                : 'text-neutral-400 dark:text-neutral-600'
          ]"
        >
          {{ step.title }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
export interface StepItem {
  title: string
  description?: string
}

withDefaults(
  defineProps<{
    steps: StepItem[]
    currentStep: number
  }>(),
  {
    currentStep: 1
  }
)
</script>
