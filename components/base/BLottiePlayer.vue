<template>
  <div class="relative flex items-center justify-center w-full h-full">
    <ClientOnly>
      <DotLottieVue
        :src="src"
        :autoplay="autoplay"
        :loop="loop"
        :speed="speed"
        class="w-full h-full object-contain"
        @load="onLoaded"
      />
      <template #fallback>
        <div class="flex flex-col items-center justify-center p-8 text-neutral-400">
          <div class="w-10 h-10 rounded-full border-2 border-primary-500 border-t-transparent animate-spin mb-3" />
          <span class="text-xs font-heading font-semibold text-neutral-500 dark:text-neutral-400">
            Memuat animasi...
          </span>
        </div>
      </template>
    </ClientOnly>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { DotLottieVue } from '@lottiefiles/dotlottie-vue'

withDefaults(
  defineProps<{
    src: string
    autoplay?: boolean
    loop?: boolean
    speed?: number
  }>(),
  {
    autoplay: true,
    loop: true,
    speed: 1
  }
)

const isLoaded = ref(false)
function onLoaded() {
  isLoaded.value = true
}
</script>
