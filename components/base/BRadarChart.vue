<template>
  <div class="relative flex flex-col items-center justify-center p-2 select-none w-full">
    <svg
      :viewBox="`-70 -25 ${size + 140} ${size + 50}`"
      class="w-full h-auto drop-shadow-sm overflow-visible transition-all duration-300"
      :style="{ maxWidth: maxWidth ? `${maxWidth}px` : `${Math.max(size + 60, 420)}px` }"
    >
      <defs>
        <!-- Primary subtle fill for polygon -->
        <radialGradient id="radarFillGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#2091AA" stop-opacity="0.28" />
          <stop offset="100%" stop-color="#2091AA" stop-opacity="0.08" />
        </radialGradient>
        <!-- Benchmark gradient -->
        <radialGradient id="radarTargetGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#FED440" stop-opacity="0.2" />
          <stop offset="100%" stop-color="#FED440" stop-opacity="0.04" />
        </radialGradient>
      </defs>

      <!-- Concentric Grid Polygons (levels 20%, 40%, 60%, 80%, 100%) -->
      <g class="grid-webs">
        <polygon
          v-for="level in [0.2, 0.4, 0.6, 0.8, 1.0]"
          :key="level"
          :points="getWebPoints(level)"
          fill="none"
          stroke="currentColor"
          class="text-neutral-200 dark:text-neutral-800"
          :stroke-dasharray="level === 1.0 ? 'none' : '3 3'"
          stroke-width="1.2"
        />
      </g>

      <!-- Axis Spokes -->
      <g class="grid-spokes">
        <line
          v-for="(axis, index) in axes"
          :key="index"
          :x1="center"
          :y1="center"
          :x2="axis.x"
          :y2="axis.y"
          stroke="currentColor"
          class="text-neutral-200 dark:text-neutral-800"
          stroke-width="1"
        />
      </g>

      <!-- Target/Benchmark Polygon (Optional) -->
      <polygon
        v-if="targetPoints"
        :points="targetPoints"
        fill="url(#radarTargetGrad)"
        stroke="#D4AA0B"
        stroke-width="1.5"
        stroke-dasharray="4 3"
        class="transition-all duration-300"
      />

      <!-- Current Score Polygon -->
      <polygon
        :points="scorePoints"
        fill="url(#radarFillGrad)"
        stroke="#2091AA"
        stroke-width="2"
        stroke-linejoin="round"
        class="transition-all duration-300 ease-out"
      />

      <!-- Data Point Circles with click & hover trigger -->
      <g
        v-for="(point, index) in points"
        :key="index"
        class="cursor-pointer"
        @mouseenter="handleMouseEnter(index)"
        @mouseleave="handleMouseLeave"
        @click="handlePointClick(index)"
      >
        <!-- Invisible generous hitbox for smooth hover and easy tap without flicker -->
        <circle
          :cx="point.x"
          :cy="point.y"
          :r="Math.max(16, size * 0.042)"
          fill="transparent"
        />

        <!-- Outer halo (radius grows on hover/select without coordinate shift) -->
        <circle
          :cx="point.x"
          :cy="point.y"
          :r="activeIdx === index ? Math.max(11, size * 0.026) : Math.max(6.5, size * 0.016)"
          :class="activeIdx === index ? 'fill-[#2091AA]/50' : 'fill-[#2091AA]/20'"
          class="transition-all duration-200"
        />

        <!-- Inner dot (fixed center cx/cy, radius grows from center) -->
        <circle
          :cx="point.x"
          :cy="point.y"
          :r="activeIdx === index ? Math.max(6.5, size * 0.015) : Math.max(4.5, size * 0.011)"
          fill="#2091AA"
          stroke="#FFFFFF"
          :stroke-width="activeIdx === index ? 2.5 : 2"
          class="transition-all duration-200"
        />
      </g>

      <!-- Axis Labels (clickable and hoverable) -->
      <g :class="['labels font-poppins font-semibold', compact ? 'text-[10px]' : 'text-xs sm:text-sm']">
        <text
          v-for="(label, index) in labels"
          :key="index"
          :x="label.x"
          :y="label.y"
          :text-anchor="label.anchor"
          :dominant-baseline="label.baseline"
          class="cursor-pointer select-none transition-all duration-200"
          :class="activeIdx === index ? 'fill-[#0081A0] dark:fill-[#2091AA] font-black' : 'fill-neutral-800 dark:fill-neutral-200 font-bold'"
          :style="{ fontSize: `${Math.max(12, Math.round(size * 0.036))}px` }"
          @mouseenter="handleMouseEnter(index)"
          @mouseleave="handleMouseLeave"
          @click="handlePointClick(index)"
        >
          <tspan>{{ label.name }}</tspan>
          <tspan
            v-if="!compact"
            :x="label.x"
            dy="1.25em"
            class="fill-[#0081A0] dark:fill-[#2091AA] font-extrabold tabular-nums"
            :style="{ fontSize: `${Math.max(10.5, Math.round(size * 0.03))}px` }"
          >
            ({{ items[index]?.score ?? 0 }}/{{ items[index]?.maxScore ?? 100 }})
          </tspan>
        </text>
      </g>
    </svg>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

export interface RadarAspect {
  name: string
  score: number
  maxScore?: number
  targetScore?: number
  notes?: string
}

const props = withDefaults(
  defineProps<{
    items: RadarAspect[]
    size?: number
    maxWidth?: number
    showTarget?: boolean
    selectedIndex?: number | null
    compact?: boolean
  }>(),
  {
    size: 320,
    maxWidth: undefined,
    showTarget: false,
    selectedIndex: null,
    compact: false
  }
)

const emit = defineEmits<{
  (e: 'hover', index: number | null): void
  (e: 'select', index: number | null): void
  (e: 'update:selectedIndex', index: number | null): void
}>()

const hoveredIndex = ref<number | null>(null)

const activeIdx = computed(() => {
  if (hoveredIndex.value !== null) return hoveredIndex.value
  return props.selectedIndex !== undefined ? props.selectedIndex : null
})

function handleMouseEnter(index: number) {
  hoveredIndex.value = index
  emit('hover', index)
}

function handleMouseLeave() {
  hoveredIndex.value = null
  emit('hover', null)
}

function handlePointClick(index: number) {
  const next = props.selectedIndex === index ? null : index
  emit('select', next)
  emit('update:selectedIndex', next)
}

const center = computed(() => props.size / 2)
const radius = computed(() => (props.size / 2) - (props.compact ? 32 : 52)) // margin for outer text labels
const total = computed(() => props.items.length || 5)

// Helper for angle calculation
function getCoordinates(index: number, level: number) {
  const angle = (Math.PI * 2 / total.value) * index - Math.PI / 2
  const r = radius.value * level
  return {
    x: center.value + r * Math.cos(angle),
    y: center.value + r * Math.sin(angle)
  }
}

// Spoke axes
const axes = computed(() => {
  return props.items.map((_, i) => getCoordinates(i, 1.0))
})

// Web lines
function getWebPoints(level: number) {
  return props.items
    .map((_, i) => {
      const { x, y } = getCoordinates(i, level)
      return `${x},${y}`
    })
    .join(' ')
}

// Current Score Points
const points = computed(() => {
  return props.items.map((item, i) => {
    const max = item.maxScore || 100
    const ratio = Math.max(0.05, Math.min(1.0, item.score / max))
    return getCoordinates(i, ratio)
  })
})

const scorePoints = computed(() => {
  return points.value.map(p => `${p.x},${p.y}`).join(' ')
})

// Target score points
const targetPoints = computed(() => {
  if (!props.showTarget) return null
  return props.items
    .map((item, i) => {
      const max = item.maxScore || 100
      const target = item.targetScore || max * 0.8
      const ratio = Math.max(0.05, Math.min(1.0, target / max))
      const { x, y } = getCoordinates(i, ratio)
      return `${x},${y}`
    })
    .join(' ')
})

// Outer labels positioning
const labels = computed(() => {
  return props.items.map((item, i) => {
    const angle = (Math.PI * 2 / total.value) * i - Math.PI / 2
    const labelDistance = radius.value + (props.compact ? 16 : 28)
    const x = center.value + labelDistance * Math.cos(angle)
    const y = center.value + labelDistance * Math.sin(angle)

    let anchor: 'start' | 'middle' | 'end' = 'middle'
    if (Math.cos(angle) > 0.3) anchor = 'start'
    else if (Math.cos(angle) < -0.3) anchor = 'end'

    let baseline: 'middle' | 'auto' | 'hanging' = 'middle'
    if (Math.sin(angle) > 0.3) baseline = 'hanging'
    else if (Math.sin(angle) < -0.3) baseline = 'auto'

    return {
      name: item.name,
      x,
      y,
      anchor,
      baseline
    }
  })
})
</script>
