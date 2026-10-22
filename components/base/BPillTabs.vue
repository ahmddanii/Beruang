<template>
  <div
    ref="containerRef"
    :class="[
      'segmented-pill-container is-gopay-green relative select-none font-poppins',
      size === 'sm' ? 'is-size-sm' : 'is-size-md',
      fullWidth ? 'w-full flex' : 'inline-flex',
      customClass
    ]"
  >
    <!-- GSAP Animated Sliding Pill Indicator (Crisp Pure White Floating Active Card) -->
    <div
      ref="indicatorRef"
      class="segmented-pill-indicator"
      aria-hidden="true"
    />

    <!-- Tab Button Items -->
    <button
      v-for="tab in tabs"
      :key="tab.id"
      :ref="el => setButtonRef(tab.id, el)"
      type="button"
      :class="[
        'segmented-pill-btn group',
        modelValue === tab.id ? 'is-active' : 'is-inactive'
      ]"
      @click="handleSelect(tab.id)"
    >
      <HugeiconsIcon
        v-if="tab.icon"
        :icon="tab.icon"
        :size="size === 'sm' ? 13 : 17"
        :stroke-width="modelValue === tab.id ? 2.2 : 1.8"
        :class="size === 'sm' ? 'mr-1 shrink-0 transition-colors' : 'mr-2 shrink-0 transition-colors'"
      />
      <span class="truncate leading-normal pb-0.5">{{ tab.label }}</span>
      <span
        v-if="tab.count !== undefined"
        :class="[
          'ml-2 text-xs px-2 py-0.5 rounded-full tabular-nums font-semibold transition-colors',
          modelValue === tab.id
            ? 'bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-white'
            : 'bg-neutral-200/70 dark:bg-neutral-800/80 text-neutral-600 dark:text-neutral-400'
        ]"
      >
        {{ tab.count }}
      </span>
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, onUnmounted, nextTick } from 'vue'
import gsap from 'gsap'
import { HugeiconsIcon } from '@hugeicons/vue'

export interface PillTabItem {
  id: string
  label: string
  icon?: any
  count?: number | string
}

const props = withDefaults(
  defineProps<{
    tabs: PillTabItem[]
    modelValue: string
    size?: 'md' | 'sm' | 'default'
    fullWidth?: boolean
    customClass?: string
  }>(),
  {
    size: 'md',
    fullWidth: true,
    customClass: ''
  }
)

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
  (e: 'change', value: string): void
}>()

const containerRef = ref<HTMLElement | null>(null)
const indicatorRef = ref<HTMLElement | null>(null)
const buttonRefs = new Map<string, HTMLElement>()

function setButtonRef(id: string, el: any) {
  if (el) {
    buttonRefs.set(id, el as HTMLElement)
  }
}

function handleSelect(id: string) {
  if (props.modelValue === id) return
  emit('update:modelValue', id)
  emit('change', id)
}

function updateIndicator(immediate = false) {
  const indicator = indicatorRef.value
  if (!indicator) return

  const target = buttonRefs.get(props.modelValue)
  if (!target) return

  const targetLeft = target.offsetLeft
  const targetWidth = target.offsetWidth

  if (targetWidth === 0) {
    // Retry if element has not been rendered / laid out yet
    setTimeout(() => updateIndicator(immediate), 60)
    return
  }

  if (immediate) {
    gsap.set(indicator, { x: targetLeft, width: targetWidth, opacity: 1 })
  } else {
    gsap.to(indicator, {
      x: targetLeft,
      width: targetWidth,
      opacity: 1,
      duration: 0.28,
      ease: 'power2.out',
      overwrite: 'auto'
    })
  }
}

watch(
  () => props.modelValue,
  () => {
    nextTick(() => {
      updateIndicator(false)
    })
  }
)

watch(
  () => props.tabs,
  () => {
    nextTick(() => {
      updateIndicator(true)
    })
  },
  { deep: true }
)

let resizeObserver: ResizeObserver | null = null
let handleResize: (() => void) | null = null

onMounted(() => {
  nextTick(() => {
    updateIndicator(true)
  })
  setTimeout(() => {
    updateIndicator(true)
  }, 120)

  handleResize = () => {
    updateIndicator(true)
  }
  if (typeof window !== 'undefined') {
    window.addEventListener('resize', handleResize)
  }

  if (containerRef.value && typeof ResizeObserver !== 'undefined') {
    resizeObserver = new ResizeObserver(() => {
      updateIndicator(true)
    })
    resizeObserver.observe(containerRef.value)
  }
})

onUnmounted(() => {
  if (handleResize && typeof window !== 'undefined') {
    window.removeEventListener('resize', handleResize)
    handleResize = null
  }
  if (resizeObserver) {
    resizeObserver.disconnect()
    resizeObserver = null
  }
  buttonRefs.clear()
})

defineExpose({
  updateIndicator
})
</script>
