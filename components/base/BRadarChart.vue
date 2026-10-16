<template>
  <div class="relative flex flex-col items-center justify-center p-2 select-none">
    <svg
      :viewBox="`0 0 ${size} ${size}`"
      :width="size"
      :height="size"
      class="overflow-visible max-w-full h-auto drop-shadow-sm"
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

      <!-- Data Point Circles with hover tooltip trigger -->
      <g
        v-for="(point, index) in points"
        :key="index"
        class="cursor-pointer group"
        @mouseenter="hoveredIndex = index"
        @mouseleave="hoveredIndex = null"
      >
        <!-- Outer halo -->
        <circle
          :cx="point.x"
          :cy="point.y"
          r="6"
          class="fill-[#2091AA]/20 group-hover:fill-[#2091AA]/35 transition-all"
        />
        <!-- Inner dot -->
        <circle
          :cx="point.x"
          :cy="point.y"
          r="4"
          fill="#2091AA"
          stroke="#FFFFFF"
          stroke-width="2"
          class="transition-transform duration-200 group-hover:scale-125"
        />
      </g>

      <!-- Axis Labels -->
      <g class="labels  font-semibold text-xs sm:text-sm">
        <text
          v-for="(label, index) in labels"
          :key="index"
          :x="label.x"
          :y="label.y"
          :text-anchor="label.anchor"
          :dominant-baseline="label.baseline"
          class="fill-neutral-800 dark:fill-neutral-200 font-bold cursor-default"
        >
          {{ label.name }}
          <tspan class="fill-[#2091AA] dark:fill-[#50AABF] font-extrabold ml-1">
            ({{ items[index]?.score ?? 0 }}/{{ items[index]?.maxScore ?? 100 }})
          </tspan>
        </text>
      </g>
    </svg>

    <!-- Interactive hover tooltip card -->
    <div
      v-if="hoveredIndex !== null && items[hoveredIndex]"
      class="mt-3 px-3.5 py-2 rounded-xl bg-neutral-900 text-white text-xs sm:text-sm shadow-lg animate-fade-in flex items-center gap-2.5"
    >
      <span class="w-2.5 h-2.5 rounded-full bg-[#2091AA]" />
      <span class="font-semibold">{{ items[hoveredIndex].name }}:</span>
      <span class="font-bold text-gold tabular-nums">{{ items[hoveredIndex].score }} / {{ items[hoveredIndex].maxScore ?? 100 }}</span>
      <span class="text-neutral-300 text-xs font-semibold">({{ Math.round((items[hoveredIndex].score / (items[hoveredIndex].maxScore ?? 100)) * 100) }}%)</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

export interface RadarAspect {
  name: string
  score: number
  maxScore?: number
  targetScore?: number
}

const props = withDefaults(
  defineProps<{
    items: RadarAspect[]
    size?: number
    showTarget?: boolean
  }>(),
  {
    size: 320,
    showTarget: false
  }
)

const hoveredIndex = ref<number | null>(null)

const center = computed(() => props.size / 2)
const radius = computed(() => (props.size / 2) - 52) // margin for outer text labels
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
    const labelDistance = radius.value + 28
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
