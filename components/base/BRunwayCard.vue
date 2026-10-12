<template>
  <component
    :is="to ? NuxtLink : 'div'"
    :to="to"
    class="group relative rounded-2xl border border-neutral-200/90 dark:border-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-700 bg-white dark:bg-[#15161A] p-4 sm:p-5 flex flex-col justify-between select-none h-full transition-all duration-150 ease-out active:scale-[0.99] transform-gpu cursor-pointer"
    style="-webkit-tap-highlight-color: transparent; outline: none;"
    :aria-label="`${label}: ${days} Hari Aman`"
  >
    <!-- TOP SECTION: STATUS BADGE + EXPENSES CONTEXT & TELEMETRY GAUGE -->
    <div class="space-y-3 pt-0.5">
      <!-- Header Row: Status Badge & Daily Burn Pill -->
      <div class="flex items-center justify-between gap-2">
        <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-sans font-semibold bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-200/70 dark:border-emerald-800/60">
          <span class="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span>{{ status }}</span>
        </span>

        <span class="text-xs font-sans font-medium text-neutral-500 dark:text-neutral-400 tabular-nums">
          Beban: {{ dailyExpense }}
        </span>
      </div>

      <!-- Runway Telemetry Gauge Track (Visualisasi Durasi Ketahanan Kas) -->
      <div class="space-y-1.5 pt-0.5">
        <div class="relative w-full h-3 bg-neutral-100 dark:bg-neutral-800/80 rounded-full overflow-hidden p-0.5 border border-neutral-200/60 dark:border-neutral-700/60">
          <!-- Active Runway Fill Bar -->
          <div
            class="h-full rounded-full transition-all duration-500 ease-out"
            :style="{
              width: `${Math.min(100, Math.round((days / maxDays) * 100))}%`,
              background: 'linear-gradient(90deg, #10B981 0%, #059669 100%)'
            }"
          />
        </div>

        <!-- Scale Labels under gauge -->
        <div class="flex items-center justify-between text-[11px] font-sans text-neutral-400 dark:text-neutral-500 font-medium px-0.5">
          <span>0 Hari</span>
          <span class="text-emerald-700 dark:text-emerald-400 font-semibold">Batas Aman 30h</span>
          <span class="tabular-nums font-semibold text-neutral-600 dark:text-neutral-300">{{ maxDays }}+ Hari</span>
        </div>
      </div>
    </div>

    <!-- BOTTOM SECTION: LABEL & VALUE HEADLINE KONSISTEN DENGAN KARTU 1 & 2 -->
    <div class="space-y-1 mt-auto pt-3">
      <!-- Eyebrow: Label "Runway Kas Toko" -->
      <p class="text-xs sm:text-sm font-sans font-semibold text-neutral-600 dark:text-neutral-300 leading-snug">
        {{ label }}
      </p>

      <!-- Headline Metric Besar "45 Hari Aman" -->
      <div class="flex items-baseline gap-2 min-w-0 flex-wrap">
        <span
          class="text-2xl sm:text-3xl lg:text-[34px] xl:text-[36px] font-heading font-semibold text-neutral-900 dark:text-white tabular-nums tracking-tight leading-none whitespace-nowrap"
        >
          {{ days }} Hari
        </span>
        <span class="inline-flex items-center gap-1 text-xs font-sans font-bold text-emerald-600 dark:text-emerald-400 whitespace-nowrap shrink-0">
          <span>Cadangan Kas Aman</span>
        </span>
      </div>
    </div>
  </component>
</template>

<script setup lang="ts">
import { resolveComponent } from 'vue'

const NuxtLink = resolveComponent('NuxtLink')

withDefaults(
  defineProps<{
    label?: string
    days?: number
    status?: string
    dailyExpense?: string
    safeDaysThreshold?: number
    maxDays?: number
    to?: string
  }>(),
  {
    label: 'Runway Kas Toko',
    days: 45,
    status: 'Sangat Aman',
    dailyExpense: 'Rp 1.6 Jt/hr',
    safeDaysThreshold: 30,
    maxDays: 60,
    to: '/dashboard/progres'
  }
)
</script>
