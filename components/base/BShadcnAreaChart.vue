<template>
  <div
    ref="chartWrapperRef"
    class="relative w-full h-full flex flex-col justify-between select-none cursor-crosshair font-poppins"
    @mousemove="onMouseMove"
    @pointermove="onMouseMove"
    @mouseleave="onMouseLeave"
    @pointerleave="onMouseLeave"
  >
    <!-- Main Chart Area (SVG Canvas + Y-Axis HTML Labels) -->
    <div class="relative w-full flex-1 min-h-[210px]">
      <!-- Y-Axis Labels Track (HTML: 100% Crisp Poppins, Tabular Nums, Never Distorted) -->
      <div
        v-if="showYAxis"
        class="absolute left-0 top-0 bottom-0 pointer-events-none select-none z-10"
        :style="{ width: `${(padding.left / svgWidth) * 100}%` }"
      >
        <div
          v-for="(tick, idx) in yTicks"
          :key="`ytick-${idx}`"
          class="absolute right-3.5 -translate-y-1/2 font-poppins text-xs font-semibold text-neutral-500 dark:text-neutral-400 tabular-nums whitespace-nowrap"
          :style="{ top: `${(tick.y / svgHeight) * 100}%` }"
        >
          {{ tick.label }}
        </div>
      </div>

      <!-- SVG Chart Canvas -->
      <svg
        ref="svgRef"
        class="w-full h-full overflow-visible pointer-events-none"
        :viewBox="`0 0 ${svgWidth} ${svgHeight}`"
        preserveAspectRatio="none"
      >
        <defs>
          <!-- Gradients for series areas matching Shadcn UI Chart Area - Gradient -->
          <linearGradient
            v-for="cat in categories"
            :id="`shadcn-area-grad-${cat}`"
            :key="cat"
            x1="0"
            y1="0"
            x2="0"
            y2="1"
          >
            <stop offset="0%" :stop-color="getCategoryColor(cat)" stop-opacity="0.32" />
            <stop offset="60%" :stop-color="getCategoryColor(cat)" stop-opacity="0.08" />
            <stop offset="100%" :stop-color="getCategoryColor(cat)" stop-opacity="0.00" />
          </linearGradient>
        </defs>

        <!-- Horizontal Guide Lines (Shadcn CartesianGrid vertical={false}) -->
        <g v-if="showGridLine" class="cartesian-grid">
          <line
            v-for="(tick, idx) in yTicks"
            :key="`grid-${idx}`"
            :x1="padding.left"
            :y1="tick.y"
            :x2="svgWidth - padding.right"
            :y2="tick.y"
            stroke="currentColor"
            class="text-neutral-200/90 dark:text-neutral-800/90"
            stroke-dasharray="4 4"
            stroke-width="1"
          />
        </g>

        <!-- Area Fills & Stroke Lines -->
        <g v-for="cat in categories" :key="`series-${cat}`" class="series-group">
          <!-- Area Fill with Gradient -->
          <path
            :d="seriesPaths[cat]?.area || ''"
            :fill="`url(#shadcn-area-grad-${cat})`"
            class="transition-all duration-300 ease-out"
          />

          <!-- Smooth Spline Stroke Line -->
          <path
            :d="seriesPaths[cat]?.line || ''"
            fill="none"
            :stroke="getCategoryColor(cat)"
            stroke-width="2.75"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="transition-all duration-300 ease-out"
          />
        </g>

        <!-- Interactive Crosshair & Active Point Highlight -->
        <g v-if="activeIndex !== null && activePoint" class="chart-active-highlight">
          <!-- Vertical dashed crosshair line -->
          <line
            :x1="activePoint.x"
            :y1="padding.top"
            :x2="activePoint.x"
            :y2="svgHeight - padding.bottom"
            stroke="currentColor"
            class="text-neutral-300 dark:text-neutral-700"
            stroke-dasharray="4 4"
            stroke-width="1.5"
          />

          <!-- Active point glowing halo -->
          <circle
            :cx="activePoint.x"
            :cy="activePoint.y"
            r="8"
            :fill="getCategoryColor(categories[0])"
            fill-opacity="0.22"
          />

          <!-- Active point crisp center circle -->
          <circle
            :cx="activePoint.x"
            :cy="activePoint.y"
            r="5"
            :fill="getCategoryColor(categories[0])"
            stroke="#FFFFFF"
            class="dark:stroke-[#151922]"
            stroke-width="2.5"
          />
        </g>
      </svg>

      <!-- Floating Shadcn UI Chart Tooltip (<ChartTooltipContent indicator="dot" />) -->
      <div
        v-if="showTooltip && activeIndex !== null && activeData"
        class="absolute pointer-events-none z-30 transition-all duration-75 ease-out"
        :style="tooltipContainerStyle"
      >
        <div
          class="border border-neutral-200/90 dark:border-neutral-800 bg-white/95 dark:bg-[#131620]/95 backdrop-blur-md rounded-xl px-3.5 py-2.5 shadow-xl ring-1 ring-black/5 dark:ring-white/5 flex flex-col gap-1.5 min-w-[11.5rem]"
        >
          <!-- Tooltip Header (Month / Date in clean Title Case) -->
          <div class="text-[11px] font-poppins font-semibold text-neutral-600 dark:text-neutral-300 capitalize tracking-wide">
            {{ activeData[index] }} {{ activeData.year || '' }}
          </div>

          <!-- Tooltip Series Entries -->
          <div class="flex flex-col gap-1">
            <div
              v-for="cat in categories"
              :key="`tooltip-${cat}`"
              class="flex items-center justify-between gap-4 py-0.5"
            >
              <div class="flex items-center gap-1.5">
                <span
                  class="w-2.5 h-2.5 rounded-[3px] shadow-xs shrink-0"
                  :style="{ backgroundColor: getCategoryColor(cat) }"
                />
                <span class="text-xs font-poppins text-neutral-700 dark:text-neutral-300 font-medium">
                  {{ getCategoryLabel(cat) }}
                </span>
              </div>
              <span class="text-xs sm:text-sm font-poppins font-bold text-neutral-900 dark:text-white tabular-nums">
                {{ formatValue(activeData[cat]) }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- X-Axis Month Labels (HTML Track: Crisp Poppins, No Distortion, Proper Spacing) -->
    <div v-if="showXAxis" class="relative w-full h-6 mt-1.5 select-none pointer-events-none">
      <div
        v-for="(pt, idx) in primaryPoints"
        :key="`xlabel-${idx}`"
        class="absolute -translate-x-1/2 text-center text-xs font-poppins whitespace-nowrap transition-colors duration-150"
        :class="activeIndex === idx ? 'text-[#2091AA] font-bold dark:text-[#38A8C2]' : 'text-neutral-500 dark:text-neutral-400 font-semibold'"
        :style="{ left: `${(pt.x / svgWidth) * 100}%` }"
      >
        <!-- Responsif: Mode ringkas pada mobile atau jika > 6 bulan (1 Tahun) -->
        <span class="sm:hidden">{{ formatMonthShort(pt.label) }}</span>
        <span class="hidden sm:inline">{{ isShortPeriod ? pt.label : formatMonthShort(pt.label) }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

export interface ChartConfigItem {
  label: string
  color: string
}

export type ChartConfig = Record<string, ChartConfigItem>

const props = withDefaults(
  defineProps<{
    data: any[]
    index: string // Key for X-axis (e.g. 'month')
    categories: string[] // Keys for Y-axis (e.g. ['cashBalance'])
    config?: ChartConfig
    showGridLine?: boolean
    showXAxis?: boolean
    showYAxis?: boolean
    showTooltip?: boolean
    valueFormatter?: (val: number) => string
    yFormatter?: (val: number) => string
  }>(),
  {
    config: () => ({}),
    showGridLine: true,
    showXAxis: true,
    showYAxis: true,
    showTooltip: true,
    valueFormatter: (val: number) => 'Rp ' + Number(val).toLocaleString('id-ID'),
    yFormatter: (val: number) => `Rp ${(Number(val) / 1000000).toFixed(0)} Jt`
  }
)

const svgRef = ref<SVGSVGElement | null>(null)
const chartWrapperRef = ref<HTMLDivElement | null>(null)

// Virtual Coordinate space
const svgWidth = 840
const svgHeight = 280
// Left padding reserves space for clean Y-axis ticks, bottom padding for baseline
const padding = { top: 18, right: 26, bottom: 14, left: 78 }

const activeIndex = ref<number | null>(null)

const isShortPeriod = computed(() => (props.data ? props.data.length <= 6 : false))

// Standard Indonesian 3-letter month abbreviations
function formatMonthShort(month: string): string {
  const map: Record<string, string> = {
    'Januari': 'Jan',
    'Februari': 'Feb',
    'Maret': 'Mar',
    'April': 'Apr',
    'Mei': 'Mei',
    'Juni': 'Jun',
    'Juli': 'Jul',
    'Agustus': 'Agu',
    'September': 'Sep',
    'Oktober': 'Okt',
    'November': 'Nov',
    'Desember': 'Des'
  }
  return map[month] || (month.length > 3 ? month.slice(0, 3) : month)
}

function getCategoryColor(cat: string): string {
  if (props.config[cat]?.color) return props.config[cat].color
  const defaults = ['#2091AA', '#10B981', '#F59E0B', '#8B5CF6']
  const idx = props.categories.indexOf(cat)
  return defaults[idx % defaults.length]
}

function getCategoryLabel(cat: string): string {
  return props.config[cat]?.label || cat
}

function formatValue(v: any): string {
  if (v === undefined || v === null) return '-'
  return props.valueFormatter(Number(v))
}

// Calculate Clean Round Ticks (Nice Numbers Algorithm)
const dataRange = computed(() => {
  if (!props.data || props.data.length === 0) {
    return { min: 0, max: 100000000, step: 20000000 }
  }

  let min = Infinity
  let max = -Infinity

  props.data.forEach(item => {
    props.categories.forEach(cat => {
      const val = Number(item[cat] || 0)
      if (val < min) min = val
      if (val > max) max = val
    })
  })

  if (min === Infinity) min = 0
  if (max === -Infinity) max = 100000000

  const span = max - min

  // Determine clean step size in clean round multiples (10 Jt, 20 Jt, 50 Jt, 100 Jt)
  let step = 20000000
  if (span <= 30000000) {
    step = 10000000 // 10 Jt per step
  } else if (span <= 70000000) {
    step = 20000000 // 20 Jt per step
  } else if (span <= 150000000) {
    step = 50000000 // 50 Jt per step
  } else {
    step = 100000000 // 100 Jt per step
  }

  // Round min down and max up to clean multiple of step
  let minTick = Math.max(0, Math.floor((min * 0.96) / step) * step)
  let maxTick = Math.ceil((max * 1.04) / step) * step

  // Ensure nice number of tick intervals (at least 3-4 intervals)
  while ((maxTick - minTick) / step < 3) {
    if (minTick - step >= 0) {
      minTick -= step
    } else {
      maxTick += step
    }
  }

  return {
    min: minTick,
    max: maxTick,
    step
  }
})

// Generate clean round Y-ticks (Always multiples like 20 Jt, 40 Jt, 60 Jt, 80 Jt or 50 Jt, 60 Jt, 70 Jt, 80 Jt)
const yTicks = computed(() => {
  const { min, max, step } = dataRange.value
  const chartH = svgHeight - padding.top - padding.bottom
  const ticks = []

  const totalRange = max - min || 1
  for (let val = min; val <= max + 0.001; val += step) {
    const ratio = (val - min) / totalRange
    const y = svgHeight - padding.bottom - ratio * chartH
    ticks.push({
      val,
      y,
      label: props.yFormatter(val)
    })
  }

  return ticks
})

// Scale helpers
function getXCoord(idx: number, total: number) {
  if (total <= 1) return padding.left + (svgWidth - padding.left - padding.right) / 2
  const usableWidth = svgWidth - padding.left - padding.right
  return padding.left + (idx / (total - 1)) * usableWidth
}

function getYCoord(val: number) {
  const { min, max } = dataRange.value
  const usableHeight = svgHeight - padding.top - padding.bottom
  const clampedVal = Math.max(min, Math.min(max, val))
  const ratio = (clampedVal - min) / (max - min || 1)
  return svgHeight - padding.bottom - ratio * usableHeight
}

// Primary Points for main series (used for crosshair and X labels)
const primaryPoints = computed(() => {
  if (!props.data || props.data.length === 0) return []
  const primaryCat = props.categories[0]
  const total = props.data.length

  return props.data.map((item, idx) => ({
    x: getXCoord(idx, total),
    y: getYCoord(Number(item[primaryCat] || 0)),
    label: String(item[props.index] || ''),
    item
  }))
})

// Monotone Cubic Spline (Fritsch-Carlson algorithm as in D3 / Recharts)
function buildMonotoneCubicPath(points: { x: number; y: number }[]): string {
  const n = points.length
  if (n === 0) return ''
  if (n === 1) return `M ${points[0].x} ${points[0].y}`
  if (n === 2) {
    return `M ${points[0].x} ${points[0].y} L ${points[1].x} ${points[1].y}`
  }

  // 1. Calculate secant slopes
  const dx: number[] = []
  const dy: number[] = []
  const slopes: number[] = []
  for (let i = 0; i < n - 1; i++) {
    dx.push(points[i + 1].x - points[i].x)
    dy.push(points[i + 1].y - points[i].y)
    slopes.push(dy[i] / (dx[i] || 1))
  }

  // 2. Calculate tangents
  const m: number[] = [slopes[0]]
  for (let i = 1; i < n - 1; i++) {
    if (slopes[i - 1] * slopes[i] <= 0) {
      m.push(0)
    } else {
      m.push((slopes[i - 1] + slopes[i]) / 2)
    }
  }
  m.push(slopes[n - 2])

  // 3. Fritsch-Carlson monotonicity
  for (let i = 0; i < n - 1; i++) {
    if (dy[i] === 0) {
      m[i] = 0
      m[i + 1] = 0
    } else {
      const alpha = m[i] / slopes[i]
      const beta = m[i + 1] / slopes[i]
      const s = alpha * alpha + beta * beta
      if (s > 9) {
        const tau = 3 / Math.sqrt(s)
        m[i] = tau * alpha * slopes[i]
        m[i + 1] = tau * beta * slopes[i]
      }
    }
  }

  // 4. Generate cubic bezier commands
  let path = `M ${points[0].x} ${points[0].y}`
  for (let i = 0; i < n - 1; i++) {
    const cp1x = points[i].x + dx[i] / 3
    const cp1y = points[i].y + (m[i] * dx[i]) / 3
    const cp2x = points[i + 1].x - dx[i] / 3
    const cp2y = points[i + 1].y - (m[i + 1] * dx[i]) / 3
    path += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${points[i + 1].x} ${points[i + 1].y}`
  }

  return path
}

// Generate Area & Line SVG paths for each category
const seriesPaths = computed(() => {
  const result: Record<string, { line: string; area: string; points: { x: number; y: number }[] }> = {}
  if (!props.data || props.data.length === 0) return result

  const total = props.data.length
  const baselineY = svgHeight - padding.bottom

  props.categories.forEach(cat => {
    const points = props.data.map((item, idx) => ({
      x: getXCoord(idx, total),
      y: getYCoord(Number(item[cat] || 0))
    }))

    const line = buildMonotoneCubicPath(points)
    const firstPt = points[0]
    const lastPt = points[points.length - 1]
    const area = `${line} L ${lastPt.x} ${baselineY} L ${firstPt.x} ${baselineY} Z`

    result[cat] = { line, area, points }
  })

  return result
})

// Mouse Interaction
function onMouseMove(event: MouseEvent) {
  const container = chartWrapperRef.value
  if (!container || !props.data || props.data.length === 0) return
  const rect = container.getBoundingClientRect()
  const mouseX = event.clientX - rect.left
  const total = props.data.length

  // Calculate mouse ratio inside chart usable area
  const scaleX = svgWidth / rect.width
  const virtualX = mouseX * scaleX
  const usableWidth = svgWidth - padding.left - padding.right

  const ratio = (virtualX - padding.left) / usableWidth
  const rawIdx = Math.round(ratio * (total - 1))
  activeIndex.value = Math.max(0, Math.min(total - 1, rawIdx))
}

function onMouseLeave() {
  activeIndex.value = null
}

const activePoint = computed(() => {
  if (activeIndex.value === null || !primaryPoints.value[activeIndex.value]) return null
  return primaryPoints.value[activeIndex.value]
})

const activeData = computed(() => {
  if (activeIndex.value === null || !props.data[activeIndex.value]) return null
  return props.data[activeIndex.value]
})

// Tooltip positioning & boundary clamping
const tooltipContainerStyle = computed(() => {
  if (!activePoint.value || !chartWrapperRef.value) return {}
  const total = props.data.length
  const idx = activeIndex.value ?? 0

  // Relative percentage horizontally
  const leftPct = (activePoint.value.x / svgWidth) * 100
  const topPx = (activePoint.value.y / svgHeight) * (chartWrapperRef.value.clientHeight || 280)

  // Smart horizontal offset to prevent tooltip clipping on sides
  let translateX = '-50%'
  if (idx === 0) {
    translateX = '8%'
  } else if (idx === total - 1) {
    translateX = '-108%'
  } else if (idx === 1 && total <= 3) {
    translateX = '-50%'
  }

  return {
    left: `${leftPct}%`,
    top: `${Math.max(10, topPx - 68)}px`,
    transform: `translateX(${translateX})`
  }
})
</script>
