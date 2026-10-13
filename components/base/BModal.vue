<template>
  <Teleport to="body">
    <transition
      enter-active-class="transition-opacity duration-200 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition-opacity duration-150 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="modelValue"
        class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-900/60 backdrop-blur-sm"
        @click.self="closeOnBackdrop ? close() : undefined"
      >
        <transition
          enter-active-class="transition-all duration-200 ease-out transform"
          enter-from-class="scale-95 opacity-0 translate-y-3"
          enter-to-class="scale-100 opacity-100 translate-y-0"
          leave-active-class="transition-all duration-150 ease-in transform"
          leave-from-class="scale-100 opacity-100 translate-y-0"
          leave-to-class="scale-95 opacity-0 translate-y-3"
        >
          <div
            v-if="modelValue"
            :class="[
              'w-full bg-white dark:bg-neutral-900 rounded-3xl border border-neutral-200 dark:border-neutral-800 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]',
              sizeClasses[size],
              customClass
            ]"
            role="dialog"
            aria-modal="true"
          >
            <!-- Header -->
            <div
              v-if="$slots.header || title"
              :class="[
                'px-6 sm:px-7 pt-6 pb-4 flex items-start justify-between shrink-0',
                hideDivider ? '' : 'border-b border-neutral-100 dark:border-neutral-800'
              ]"
            >
              <slot name="header" :close="close">
                <div class="pr-2 min-w-0 flex-1">
                  <h3 class=" font-extrabold text-xl sm:text-2xl text-neutral-900 dark:text-neutral-100 tracking-tight">
                    {{ title }}
                  </h3>
                  <p v-if="subtitle" class="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 mt-1 leading-relaxed">
                    {{ subtitle }}
                  </p>
                </div>
              </slot>

              <!-- Close button -->
              <button
                type="button"
                class="w-9 h-9 rounded-full flex items-center justify-center text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors cursor-pointer shrink-0 ml-3"
                aria-label="Tutup"
                @click="close"
              >
                <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <!-- Body slot -->
            <div class="px-6 sm:px-7 py-4 overflow-y-auto flex-1">
              <slot />
            </div>

            <!-- Footer slot -->
            <div v-if="$slots.footer" class="px-6 py-4 bg-neutral-50 dark:bg-neutral-900/50 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-end gap-3 shrink-0">
              <slot name="footer" :close="close" />
            </div>
          </div>
        </transition>
      </div>
    </transition>
  </Teleport>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'

type ModalSize = 'sm' | 'md' | 'lg' | 'xl'

const props = withDefaults(
  defineProps<{
    modelValue: boolean
    title: string
    subtitle?: string
    size?: ModalSize
    closeOnBackdrop?: boolean
    customClass?: string
    hideDivider?: boolean
  }>(),
  {
    subtitle: '',
    size: 'md',
    closeOnBackdrop: true,
    customClass: '',
    hideDivider: false
  }
)

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
  (e: 'close'): void
}>()

const sizeClasses: Record<ModalSize, string> = {
  sm: 'max-w-md',
  md: 'max-w-lg',
  lg: 'max-w-2xl',
  xl: 'max-w-4xl'
}

function close() {
  emit('update:modelValue', false)
  emit('close')
}

function onKeyDown(e: KeyboardEvent) {
  if (e.key === 'Escape' && props.modelValue) {
    close()
  }
}

onMounted(() => {
  window.addEventListener('keydown', onKeyDown)
})

onUnmounted(() => {
  window.removeEventListener('keydown', onKeyDown)
})
</script>
