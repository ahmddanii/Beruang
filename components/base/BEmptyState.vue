<template>
  <div class="flex flex-col items-center justify-center text-center p-8">
    <!-- Si Beru Mascot -->
    <div class="relative mb-3">
      <SiBeru :state="mascotState" :size="mascotSize" />
      
      <!-- Optional floating mini speech bubble -->
      <div
        v-if="speech"
        class="absolute -top-3 -right-6 bg-white dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 text-[11px]  font-semibold px-3 py-1 rounded-full shadow-md border border-neutral-200 dark:border-neutral-700 animate-bounce"
      >
        {{ speech }}
      </div>
    </div>

    <!-- Title & inviting copy -->
    <h3 class=" font-bold text-lg text-neutral-900 dark:text-neutral-100 max-w-md">
      {{ title }}
    </h3>

    <p class="text-sm text-neutral-600 dark:text-neutral-400 mt-1.5 max-w-sm leading-relaxed">
      <slot>
        {{ description }}
      </slot>
    </p>

    <!-- Action Slot -->
    <div v-if="$slots.action" class="mt-5 flex items-center gap-3">
      <slot name="action" />
    </div>
  </div>
</template>

<script setup lang="ts">
import SiBeru from '~/components/mascot/SiBeru.vue'

withDefaults(
  defineProps<{
    title: string
    description?: string
    speech?: string
    mascotState?: 'empty' | 'thinking' | 'greeting' | 'celebrate'
    mascotSize?: 'sm' | 'md' | 'lg'
  }>(),
  {
    description: '',
    speech: '',
    mascotState: 'empty',
    mascotSize: 'md'
  }
)
</script>
