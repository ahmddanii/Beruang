<template>
  <div
    class="inline-flex items-center group/badge cursor-help relative"
    :title="title"
  >
    <svg
      :class="[sizeClass, 'shrink-0']"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <linearGradient :id="gradientId" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#24C85E" />
          <stop offset="100%" stop-color="#16A34A" />
        </linearGradient>
      </defs>
      <path
        d="M18.9905 19C18.3678 19.6175 17.2393 19.4637 16.4479 19.4637C15.4765 19.4637 15.0087 19.6537 14.3154 20.347C13.7251 20.9374 12.9337 22 12 22C11.0663 22 10.2749 20.9374 9.68457 20.347C8.99128 19.6537 8.52349 19.4637 7.55206 19.4637C6.76068 19.4637 5.63218 19.6175 5.00949 19C4.38181 18.3776 4.53628 17.2444 4.53628 16.4479C4.53628 15.4414 4.31616 14.9786 3.59938 14.2618C2.53314 13.1956 2.00002 12.6624 2 12C2.00001 11.3375 2.53312 10.8044 3.59935 9.73817C4.2392 9.09832 4.53628 8.46428 4.53628 7.55206C4.53628 6.76065 4.38249 5.63214 5 5.00944C5.62243 4.38178 6.7556 4.53626 7.55208 4.53626C8.46427 4.53626 9.09832 4.2392 9.73815 3.59937C10.8044 2.53312 11.3375 2 12 2C12.6625 2 13.1956 2.53312 14.2618 3.59937C14.9015 4.23907 15.5355 4.53626 16.4479 4.53626C17.2393 4.53626 18.3679 4.38247 18.9906 5C19.6182 5.62243 19.4637 6.75559 19.4637 7.55206C19.4637 8.55858 19.6839 9.02137 20.4006 9.73817C21.4669 10.8044 22 11.3375 22 12C22 12.6624 21.4669 13.1956 20.4006 14.2618C19.6838 14.9786 19.4637 15.4414 19.4637 16.4479C19.4637 17.2444 19.6182 18.3776 18.9905 19Z"
        :fill="`url(#${gradientId})`"
      />
      <path
        d="M8.75 12.5L10.8 14.5L15.25 9.75"
        stroke="#ffffff"
        stroke-width="2.4"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>

    <!-- Custom Floating Tooltip -->
    <div
      v-if="showTooltip"
      class="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2.5 py-1 rounded-lg bg-neutral-900 dark:bg-neutral-800 text-white text-[11px] font-poppins font-medium whitespace-nowrap opacity-0 group-hover/badge:opacity-100 transition-all duration-150 pointer-events-none shadow-lg z-30 translate-y-1 group-hover/badge:translate-y-0 border border-neutral-700/60"
    >
      <span class="text-emerald-300 font-medium">{{ tooltipText }}</span>
      <div class="absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-4 border-transparent border-t-neutral-900 dark:border-t-neutral-800" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useId } from 'vue'

const props = withDefaults(
  defineProps<{
    title?: string
    tooltipText?: string
    showTooltip?: boolean
    sizeClass?: string
  }>(),
  {
    title: 'Terverifikasi OSS RBA',
    tooltipText: 'Terverifikasi OSS RBA',
    showTooltip: true,
    sizeClass: 'w-6.5 h-6.5 sm:w-7 sm:h-7'
  }
)

const uniqueId = useId()
const gradientId = `verified-gradient-${String(uniqueId).replace(/[^a-zA-Z0-9_-]/g, '') || 'default'}`
</script>
