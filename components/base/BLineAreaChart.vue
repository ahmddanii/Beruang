<template>
  <div class="w-full select-none">
    <!-- Header / Legend -->
    <div class="flex flex-wrap items-center justify-between gap-3 mb-4">
      <div v-if="title" class="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2.5">
        <h4 class="font-heading font-bold text-base sm:text-lg text-neutral-900 dark:text-neutral-100">
          {{ title }}
        </h4>
        <span v-if="subtitle" class="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400">
          {{ subtitle }}
        </span>
      </div>

      <!-- Series legend pills -->
      <div class="flex items-center gap-3.5 text-xs sm:text-sm">
        <div v-for="s in series" :key="s.name" class="flex items-center gap-1.5">
          <span class="w-3 h-3 rounded-full" :style="{ backgroundColor: s.color }" />
          <span class="text-neutral-700 dark:text-neutral-300 font-semibold">{{ s.name }}</span>
        </div>
      </div>
    </div>

    <!-- Chart Canvas SVG -->
    <div class="relative w-full h-56">
      <svg
        ref="svgRef"
        class="w-full h-full overflow-visible"
        :viewBox="`0 0 ${width} ${height}`"
        preserveAspectRatio="none"
        @mousemove="onMouseMove"
        @mouseleave="activeIdx = null"
      >
        <defs>
          <!-- Gradients for series areas -->
          <linearGradient
            v-for="s in series"
            :id="`grad-${s.id}`"
            :key="s.id"
            x1="0"
            y1="0"
            x2="0"
            y2="1"
          >
            <stop offset="0%" :stop-color="s.color" stop-opacity="0.28" />
            <stop offset="100%" :stop-color="s.color" stop-opacity="0.01" />
          </linearGradient>
        </defs>

        <!-- Horizontal Guide Lines -->
        <g class="guide-lines text-neutral-200 dark:text-neutral-800" stroke="currentColor" stroke-dasharray="3 3">
          <line
            v-for="(val, idx) in yTicks"
            :key="idx"
            :x1="padding.left"
            :y1="val.y"
            :x2="width - padding.right"
            :y2="val.y"
            stroke-width="1"
          />
        </g>

        <!-- Series Areas & Lines -->
        <g v-for="s in preparedSeries" :key="s.id">
          <!-- Area -->
          <path
            :d="s.areaPath"
            :fill="`url(#grad-${s.id})`"
            class="transition-all duration-300"
          />
          <!-- Stroke Line -->
          <path
            :d="s.linePath"
            fill="none"
            :stroke="s.color"
            stroke-width="2.5"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="transition-all duration-300"
          />
        </g>

        <!-- Anomaly Highlight Markers -->
        <g v-for="(anomaly, aIdx) in anomalies" :key="`anom-${aIdx}`">
          <circle
            :cx="getX(anomaly.index)"
            :cy="getY(anomaly.value)"
            r="6"
            fill="#FF4B4B"
            stroke="#FFFFFF"
            stroke-width="2"
            class="animate-pulse"
          />
        </g>

        <!-- Hover Indicator vertical line -->
        <line
          v-if="activeIdx !== null"
          :x1="getX(activeIdx)"
          :y1="padding.top"
          :x2="getX(activeIdx)"
          :y2="height - padding.bottom"
          stroke="#1F52EB"
          stroke-width="1.5"
          stroke-dasharray="2 2"
        />

        <!-- Active Data Point Dots -->
        <g v-if="activeIdx !== null">
          <circle
            v-for="s in preparedSeries"
            :key="`dot-${s.id}`"
            :cx="getX(activeIdx)"
            :cy="s.points[activeIdx]?.y ?? 0"
            r="5"
            :fill="s.color"
            stroke="#FFFFFF"
            stroke-width="2"
          />
        </g>

        <!-- X-axis Labels -->
        <g class="x-labels font-semibold text-xs fill-neutral-600 dark:fill-neutral-300">
          <text
            v-for="(cat, idx) in categories"
            :key="idx"
            :x="getX(idx)"
            :y="height - 4"
            text-anchor="middle"
          >
            {{ cat }}
          </text>
        </g>
      </svg>

      <!-- Floating Hover Tooltip -->
      <div
        v-if="activeIdx !== null"
        :style="{
          left: `${(getX(activeIdx) / width) * 100}%`,
          top: '8px'
        }"
        class="absolute -translate-x-1/2 pointer-events-none bg-neutral-900/95 backdrop-blur-sm text-white px-3.5 py-2.5 rounded-xl text-xs sm:text-sm shadow-xl z-20 whitespace-nowrap border border-neutral-700"
      >
        <p class="font-heading font-bold text-neutral-200 mb-1 border-b border-neutral-700 pb-1">
          {{ categories[activeIdx] }}
        </p>
        <div v-for="s in series" :key="s.id" class="flex items-center justify-between gap-4 py-0.5">
          <span class="flex items-center gap-1.5 text-neutral-300">
            <span class="w-2.5 h-2.5 rounded-full" :style="{ backgroundColor: s.color }" />
            {{ s.name }}
          </span>
          <span class="font-bold tabular-nums font-heading" :style="{ color: s.color }">
            {{ formatValue(s.data[activeIdx]) }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

export interface ChartSeries {
  id: string
  name: string
  color: string
  data: number[]
}

export interface ChartAnomaly {
  index: number
  value: number
  message?: string
}

const props = withDefaults(
  defineProps<{
    title?: string
    subtitle?: string
    categories: string[] // e.g. ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun']
    series: ChartSeries[]
    anomalies?: ChartAnomaly[]
    valueFormatter?: (val: number) => string
  }>(),
  {
    title: '',
    subtitle: '',
    anomalies: () => [],
    valueFormatter: (val: number) => val.toLocaleString('id-ID')
  }
)

const width = 600
const height = 220
const padding = { top: 20, right: 24, bottom: 32, left: 24 }

const activeIdx = ref<number | null>(null)
const svgRef = ref<SVGSVGElement | null>(null)

// Calculate max & min across all series
const maxVal = computed(() => {
  let m = 0
  props.series.forEach(s => {
    s.data.forEach(v => {
      if (v > m) m = v
    })
  })
  return m === 0 ? 100 : m * 1.15
})

const minVal = computed(() => 0)

function getX(index: number) {
  const count = Math.max(1, props.categories.length - 1)
  const chartWidth = width - padding.left - padding.right
  return padding.left + (index / count) * chartWidth
}

function getY(value: number) {
  const chartHeight = height - padding.top - padding.bottom
  const range = maxVal.value - minVal.value || 1
  return height - padding.bottom - ((value - minVal.value) / range) * chartHeight
}

// Y-ticks
const yTicks = computed(() => {
  return [0, 0.33, 0.66, 1].map(r => ({
    y: height - padding.bottom - r * (height - padding.top - padding.bottom)
  }))
})

// Build SVG paths
const preparedSeries = computed(() => {
  return props.series.map(s => {
    const points = s.data.map((val, idx) => ({
      x: getX(idx),
      y: getY(val)
    }))

    if (points.length === 0) return { ...s, points: [], linePath: '', areaPath: '' }

    // Smooth bezier curve path
    let dLine = `M ${points[0].x} ${points[0].y}`
    for (let i = 0; i < points.length - 1; i++) {
      const p0 = points[i]
      const p1 = points[i + 1]
      const cpX = (p0.x + p1.x) / 2
      dLine += ` C ${cpX} ${p0.y}, ${cpX} ${p1.y}, ${p1.x} ${p1.y}`
    }

    const firstPt = points[0]
    const lastPt = points[points.length - 1]
    const bottomY = height - padding.bottom
    const dArea = `${dLine} L ${lastPt.x} ${bottomY} L ${firstPt.x} ${bottomY} Z`

    return {
      ...s,
      points,
      linePath: dLine,
      areaPath: dArea
    }
  })
})

function onMouseMove(event: MouseEvent) {
  if (!svgRef.value) return
  const rect = svgRef.value.getBoundingClientRect()
  const mouseX = event.clientX - rect.left
  const ratio = mouseX / rect.width
  const approxIdx = Math.round(ratio * (props.categories.length - 1))
  activeIdx.value = Math.max(0, Math.min(props.categories.length - 1, approxIdx))
}

function formatValue(v?: number) {
  if (v === undefined) return '-'
  return props.valueFormatter(v)
}
</script>
