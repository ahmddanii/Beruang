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
      <!-- Y-Axis Labels Track (HTML: 100% Crisp Poppins, Tabular Nums, Never Distorted - Full Left-Aligned) -->
      <div
        v-if="showYAxis"
        class="absolute left-0 top-0 bottom-0 pointer-events-none select-none z-10"
        :style="{ width: `${(padding.left / svgWidth) * 100}%` }"
      >
        <div
          v-for="(tick, idx) in yTicks"
          :key="`ytick-${idx}`"
          class="absolute left-0 -translate-y-1/2 font-poppins text-xs font-medium text-neutral-500 dark:text-neutral-400 tabular-nums whitespace-nowrap"
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
          <!-- Area Fill Gradient (Gradasi biru/toska primary yang halus dan memudar ke bawah) -->
          <linearGradient
            v-for="cat in categories"
            :id="`shadcn-line-linear-grad-${cat}`"
            :key="cat"
            x1="0"
            y1="0"
            x2="0"
            y2="1"
          >
            <stop offset="0%" :stop-color="getCategoryColor(cat)" stop-opacity="0.32" />
            <stop offset="35%" :stop-color="getCategoryColor(cat)" stop-opacity="0.18" />
            <stop offset="70%" :stop-color="getCategoryColor(cat)" stop-opacity="0.06" />
            <stop offset="100%" :stop-color="getCategoryColor(cat)" stop-opacity="0.00" />
          </linearGradient>

          <!-- Bar Gradient -->
          <linearGradient
            v-for="cat in categories"
            :id="`shadcn-bar-grad-${cat}`"
            :key="`bar-grad-${cat}`"
            x1="0"
            y1="0"
            x2="0"
            y2="1"
          >
            <stop offset="0%" :stop-color="getCategoryColor(cat)" stop-opacity="0.95" />
            <stop offset="100%" :stop-color="getCategoryColor(cat)" stop-opacity="0.65" />
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
            class="chart-grid-line text-neutral-200/90 dark:text-neutral-800/90"
            stroke-dasharray="4 4"
            stroke-width="1"
            vector-effect="non-scaling-stroke"
          />
        </g>

        <!-- Mode Bar & Cashflow: Vertical Rounded Bars -->
        <g v-if="mode === 'bar' || mode === 'cashflow'" class="chart-bars-group">
          <!-- Single category: centered single bar -->
          <g v-if="categories.length === 1">
            <rect
              v-for="(pt, pIdx) in seriesPaths[categories[0]]?.points || []"
              :key="`bar-${categories[0]}-${pIdx}`"
              :x="pt.x - (isShortPeriod ? 22 : 14)"
              :y="pt.y"
              :width="isShortPeriod ? 44 : 28"
              :height="Math.max(4, svgHeight - padding.bottom - pt.y)"
              rx="6"
              :fill="`url(#shadcn-bar-grad-${categories[0]})`"
              :fill-opacity="activeIndex === pIdx ? 1 : 0.85"
              class="transition-all duration-150 cursor-pointer pointer-events-auto"
              @mouseenter="activeIndex = pIdx"
            />
          </g>

          <!-- Multiple categories (e.g. cashflow: Uang Masuk vs Uang Keluar) -->
          <g v-else>
            <g v-for="(cat, cIdx) in categories" :key="`bars-${cat}`">
              <rect
                v-for="(pt, pIdx) in seriesPaths[cat]?.points || []"
                :key="`bar-${cat}-${pIdx}`"
                :x="pt.x + (cIdx === 0 ? -(isShortPeriod ? 22 : 15) : 2)"
                :y="pt.y"
                :width="isShortPeriod ? 20 : 13"
                :height="Math.max(4, svgHeight - padding.bottom - pt.y)"
                rx="5"
                :fill="`url(#shadcn-bar-grad-${cat})`"
                :fill-opacity="activeIndex === pIdx ? 1 : 0.85"
                class="transition-all duration-150 cursor-pointer pointer-events-auto"
                @mouseenter="activeIndex = pIdx"
              />
            </g>
          </g>
        </g>

        <!-- Mode Line & Area: Series Lines & Points -->
        <g v-else v-for="cat in categories" :key="`series-${cat}`" class="series-group">
          <!-- Optional Area fill (if showArea or mode is area) -->
          <path
            v-if="showArea || mode === 'area'"
            :d="seriesPaths[cat]?.area || ''"
            :fill="`url(#shadcn-line-linear-grad-${cat})`"
            class="chart-area-fill"
          />

          <!-- Stroke Line -->
          <path
            :d="seriesPaths[cat]?.line || ''"
            fill="none"
            :stroke="getCategoryColor(cat)"
            :stroke-width="strokeWidth"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="chart-line-stroke"
            vector-effect="non-scaling-stroke"
          />
        </g>

        <!-- Interactive Crosshair (Vertical dashed line) -->
        <g v-if="activeIndex !== null && activePoint" class="chart-active-highlight">
          <line
            :x1="activePoint.x"
            :y1="padding.top"
            :x2="activePoint.x"
            :y2="svgHeight - padding.bottom"
            stroke="currentColor"
            class="chart-crosshair-line text-neutral-300 dark:text-neutral-700"
            stroke-dasharray="4 4"
            stroke-width="1.5"
            vector-effect="non-scaling-stroke"
          />
        </g>
      </svg>

      <!-- Optional HTML Vertex Dots (if showDots is true: 100% Perfectly Round, Never Gepeng) -->
      <template v-if="showDots">
        <div
          v-for="cat in categories"
          :key="`dots-${cat}`"
          class="pointer-events-none"
        >
          <div
            v-for="(pt, pIdx) in seriesPaths[cat]?.points || []"
            :key="`dot-${cat}-${pIdx}`"
            class="chart-vertex-dot absolute w-2 h-2 rounded-full ring-2 ring-white dark:ring-[#131620] -translate-x-1/2 -translate-y-1/2 z-10 shrink-0"
            :style="{
              left: `${(pt.x / svgWidth) * 100}%`,
              top: `${(pt.y / svgHeight) * 100}%`,
              backgroundColor: getCategoryColor(cat)
            }"
          />
        </div>
      </template>

      <!-- Active Point Crisp Round Marker (HTML: 100% Perfectly Round, Immune to SVG Stretching) -->
      <div
        v-if="activeIndex !== null && activePoint"
        class="chart-active-marker absolute pointer-events-none z-20 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center transition-all duration-75 ease-out"
        :style="{
          left: `${(activePoint.x / svgWidth) * 100}%`,
          top: `${(activePoint.y / svgHeight) * 100}%`
        }"
      >
        <!-- Outer Glowing Halo: Bulat Sempurna (22px x 22px) -->
        <div
          class="chart-active-halo w-[22px] h-[22px] rounded-full flex items-center justify-center pointer-events-none shrink-0"
          :style="{
            backgroundColor: getCategoryColor(categories[0]),
            opacity: 0.22
          }"
        />

        <!-- Inner Crisp Center Dot with 2.5px White Border: Bulat Sempurna (11px x 11px) -->
        <div
          class="chart-active-dot absolute w-[11px] h-[11px] rounded-full ring-[2.5px] ring-white dark:ring-[#131620] shadow-xs pointer-events-none shrink-0"
          :style="{
            backgroundColor: getCategoryColor(categories[0])
          }"
        />
      </div>

      <!-- Floating Shadcn UI Chart Tooltip (<ChartTooltipContent indicator="dot" />) -->
      <div
        v-if="showTooltip && activeIndex !== null && activeData"
        class="absolute pointer-events-none z-30 transition-all duration-75 ease-out"
        :style="tooltipContainerStyle"
      >
        <div
          class="chart-tooltip-bubble border border-neutral-200/90 dark:border-neutral-800 bg-white/95 dark:bg-[#131620]/95 backdrop-blur-md rounded-xl px-3.5 py-2.5 shadow-xl ring-1 ring-black/5 dark:ring-white/5 flex flex-col gap-1.5 min-w-[11.5rem]"
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
        class="chart-xlabel absolute -translate-x-1/2 text-center text-xs font-poppins whitespace-nowrap transition-colors duration-150"
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
import { ref, computed, watch, onMounted, nextTick } from 'vue'
import { gsap } from 'gsap'

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
    mode?: 'area' | 'bar' | 'cashflow' | 'linear' // Chart preview mode
    curveType?: 'linear' | 'natural' | 'monotone' // Linear for straight lines (Shadcn Line Chart - Linear)
    showArea?: boolean // Default false for pure Line Chart
    showDots?: boolean // Default false (dots on vertices)
    strokeWidth?: number // Line thickness
    showGridLine?: boolean
    showXAxis?: boolean
    showYAxis?: boolean
    showTooltip?: boolean
    valueFormatter?: (val: number) => string
    yFormatter?: (val: number) => string
    animated?: boolean // GSAP line draw & stagger animation
  }>(),
  {
    config: () => ({}),
    mode: 'linear',
    curveType: 'linear',
    showArea: false,
    showDots: false,
    strokeWidth: 2.75,
    showGridLine: true,
    showXAxis: true,
    showYAxis: true,
    showTooltip: true,
    valueFormatter: (val: number) => 'Rp ' + Number(val).toLocaleString('id-ID'),
    yFormatter: (val: number) => `Rp ${(Number(val) / 1000000).toFixed(0)} Jt`,
    animated: true
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
    Januari: 'Jan',
    Februari: 'Feb',
    Maret: 'Mar',
    April: 'Apr',
    Mei: 'Mei',
    Juni: 'Jun',
    Juli: 'Jul',
    Agustus: 'Agu',
    September: 'Sep',
    Oktober: 'Okt',
    November: 'Nov',
    Desember: 'Des'
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

// Linear Path Builder (Line Chart - Linear: Points connected by straight lines)
function buildLinearPath(points: { x: number; y: number }[]): string {
  const n = points.length
  if (n === 0) return ''
  let path = `M ${points[0].x} ${points[0].y}`
  for (let i = 1; i < n; i++) {
    path += ` L ${points[i].x} ${points[i].y}`
  }
  return path
}

// Monotone Cubic Spline (Optional if curveType === 'natural' / 'monotone')
function buildMonotoneCubicPath(points: { x: number; y: number }[]): string {
  const n = points.length
  if (n === 0) return ''
  if (n === 1) return `M ${points[0].x} ${points[0].y}`
  if (n === 2) {
    return `M ${points[0].x} ${points[0].y} L ${points[1].x} ${points[1].y}`
  }

  const dx: number[] = []
  const dy: number[] = []
  const slopes: number[] = []
  for (let i = 0; i < n - 1; i++) {
    dx.push(points[i + 1].x - points[i].x)
    dy.push(points[i + 1].y - points[i].y)
    slopes.push(dy[i] / (dx[i] || 1))
  }

  const m: number[] = [slopes[0]]
  for (let i = 1; i < n - 1; i++) {
    if (slopes[i - 1] * slopes[i] <= 0) {
      m.push(0)
    } else {
      m.push((slopes[i - 1] + slopes[i]) / 2)
    }
  }
  m.push(slopes[n - 2])

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

// Generate Line & Area SVG paths for each category
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

    // Use linear straight lines for Line Chart - Linear
    const line = props.curveType === 'linear' ? buildLinearPath(points) : buildMonotoneCubicPath(points)
    const firstPt = points[0]
    const lastPt = points[points.length - 1]
    const area = `${line} L ${lastPt.x} ${baselineY} L ${firstPt.x} ${baselineY} Z`

    result[cat] = { line, area, points }
  })

  return result
})

// Mouse Interaction & Hover Crosshair
const activePoint = computed(() => {
  if (activeIndex.value === null) return null
  return primaryPoints.value[activeIndex.value] || null
})

const activeData = computed(() => {
  if (activeIndex.value === null || !props.data) return null
  return props.data[activeIndex.value] || null
})

function onMouseMove(e: MouseEvent | PointerEvent) {
  if (!chartWrapperRef.value || !props.data || props.data.length === 0) return

  const rect = chartWrapperRef.value.getBoundingClientRect()
  const mouseX = e.clientX - rect.left
  const svgX = (mouseX / rect.width) * svgWidth

  // Find closest point by X coordinate
  let closestIdx = 0
  let minDist = Infinity

  primaryPoints.value.forEach((pt, idx) => {
    const dist = Math.abs(pt.x - svgX)
    if (dist < minDist) {
      minDist = dist
      closestIdx = idx
    }
  })

  activeIndex.value = closestIdx
}

function onMouseLeave() {
  activeIndex.value = null
}

// Dynamic Tooltip Positioning (Keeps tooltip inside bounds)
const tooltipContainerStyle = computed(() => {
  if (!activePoint.value) return { display: 'none' }

  const xPercent = (activePoint.value.x / svgWidth) * 100
  const yPercent = (activePoint.value.y / svgHeight) * 100

  // Flip horizontally if near right edge
  const isNearRight = xPercent > 68
  const transformX = isNearRight ? 'calc(-100% - 14px)' : '14px'
  const transformY = '-50%'

  return {
    left: `${xPercent}%`,
    top: `${yPercent}%`,
    transform: `translate(${transformX}, ${transformY})`
  }
})

// GSAP Chart Animations: Silky Line Stroke Draw, Grid Stagger, and Point Pops
function animateChart(isFilterChange = false) {
  if (typeof window === 'undefined' || !props.animated) return
  nextTick(() => {
    if (!svgRef.value) return

    // 1. Line path drawing animation via strokeDashoffset
    const linePaths = svgRef.value.querySelectorAll<SVGPathElement>('.chart-line-stroke')
    linePaths.forEach(path => {
      try {
        const length = path.getTotalLength()
        if (length > 0) {
          gsap.killTweensOf(path)
          gsap.fromTo(
            path,
            {
              strokeDasharray: length,
              strokeDashoffset: length,
              opacity: 0.6
            },
            {
              strokeDashoffset: 0,
              opacity: 1,
              duration: isFilterChange ? 0.75 : 0.95,
              ease: 'power3.out',
              onComplete: () => {
                path.style.strokeDasharray = 'none'
                path.style.strokeDashoffset = '0'
              }
            }
          )
        }
      } catch (e) {
        // Fallback gracefully
      }
    })

    // 1b. Area path smooth fade-in animation matching line stroke
    const areaPaths = svgRef.value.querySelectorAll<SVGPathElement>('.chart-area-fill')
    areaPaths.forEach(path => {
      gsap.killTweensOf(path)
      gsap.fromTo(
        path,
        { opacity: 0 },
        {
          opacity: 1,
          duration: isFilterChange ? 0.65 : 0.85,
          ease: 'power2.out',
          delay: isFilterChange ? 0.05 : 0.08
        }
      )
    })

    // 2. Vertex dots animation (if showDots enabled)
    const dots = chartWrapperRef.value ? chartWrapperRef.value.querySelectorAll('.chart-vertex-dot') : []
    if (dots.length > 0) {
      gsap.killTweensOf(dots)
      gsap.fromTo(
        dots,
        { scale: 0, opacity: 0, transformOrigin: 'center center' },
        { scale: 1, opacity: 1, duration: 0.4, stagger: 0.04, ease: 'back.out(2)', delay: 0.25 }
      )
    }

    // 3. Stagger Grid lines on initial render
    if (!isFilterChange) {
      const gridLines = svgRef.value.querySelectorAll('.chart-grid-line')
      if (gridLines.length > 0) {
        gsap.killTweensOf(gridLines)
        gsap.fromTo(
          gridLines,
          { opacity: 0, scaleX: 0.92, transformOrigin: 'left center' },
          { opacity: 1, scaleX: 1, duration: 0.5, stagger: 0.04, ease: 'power2.out' }
        )
      }
    }

    // 4. Stagger X-axis month labels
    if (chartWrapperRef.value) {
      const xLabels = chartWrapperRef.value.querySelectorAll('.chart-xlabel')
      if (xLabels.length > 0) {
        gsap.killTweensOf(xLabels)
        gsap.fromTo(
          xLabels,
          { opacity: 0, y: 5 },
          { opacity: 1, y: 0, duration: 0.35, stagger: 0.025, ease: 'power2.out', delay: isFilterChange ? 0.08 : 0.18 }
        )
      }
    }
  })
}

onMounted(() => {
  animateChart(false)
})

watch(
  () => props.data,
  () => {
    animateChart(true)
  },
  { deep: true }
)

// GSAP interactive point hover micro-animation
watch(activeIndex, (newIdx, oldIdx) => {
  if (newIdx !== null && typeof window !== 'undefined') {
    nextTick(() => {
      const halo = chartWrapperRef.value?.querySelector('.chart-active-halo')
      if (halo) {
        gsap.fromTo(
          halo,
          { scale: 0.4, transformOrigin: 'center center' },
          { scale: 1, duration: 0.28, ease: 'back.out(2.2)', overwrite: 'auto' }
        )
      }
      const dot = chartWrapperRef.value?.querySelector('.chart-active-dot')
      if (dot) {
        gsap.fromTo(
          dot,
          { scale: 0.6, transformOrigin: 'center center' },
          { scale: 1, duration: 0.2, ease: 'power2.out', overwrite: 'auto' }
        )
      }
      const tooltip = chartWrapperRef.value?.querySelector('.chart-tooltip-bubble')
      if (tooltip && oldIdx === null) {
        gsap.fromTo(
          tooltip,
          { opacity: 0, scale: 0.94, y: 3 },
          { opacity: 1, scale: 1, y: 0, duration: 0.2, ease: 'power2.out', overwrite: 'auto' }
        )
      }
    })
  }
})
</script>
