<template>
  <div
    class="group relative flex flex-col justify-between cursor-pointer h-full transition-all duration-150 ease-out"
    @click="$emit('click')"
  >
    <!-- STRUCTURAL FRAME: THE ENVELOPE (Unified white bg, 1px border, subtle drop-shadow) -->
    <div
      class="relative w-full h-full flex flex-col justify-between overflow-hidden rounded-2xl bg-white dark:bg-[#15161A] border border-neutral-200/80 dark:border-neutral-800 shadow-[0_1px_3px_rgba(0,0,0,0.04),0_1px_2px_rgba(0,0,0,0.02)] dark:shadow-none hover:border-neutral-300 dark:hover:border-neutral-700 transition-colors envelope-frame"
    >
      <!-- ENVELOPE FLAP METAPHOR (Subtle V-shaped vector line & crease at inner top edge) -->
      <div class="relative w-full h-5 overflow-hidden pointer-events-none">
        <svg
          viewBox="0 0 200 20"
          preserveAspectRatio="none"
          class="w-full h-full block"
        >
          <!-- Subtle V-notch flap fill -->
          <polygon
            points="0,0 100,16 200,0"
            class="fill-neutral-100/50 dark:fill-neutral-800/40"
          />
          <!-- Hairline V-fold crease line -->
          <polyline
            points="0,0 100,16 200,0"
            fill="none"
            class="stroke-neutral-200/80 dark:stroke-neutral-800"
            stroke-width="1"
            vector-effect="non-scaling-stroke"
          />
        </svg>
      </div>

      <!-- MAIN CONTENT: HIGH-CONTRAST CALL-TO-ACTION MODULE -->
      <div class="px-5 pb-5 pt-1 flex-1 flex flex-col justify-between space-y-3">
        <!-- Top: Row of 3 to 4 Overlapping Circular User Avatars (Social Proof) -->
        <div class="flex items-center justify-between">
          <div class="flex items-center -space-x-2 overflow-hidden">
            <!-- Avatar 1 -->
            <div
              class="inline-block h-8 w-8 rounded-full ring-2 ring-white dark:ring-[#15161A] bg-neutral-900 text-white flex items-center justify-center font-heading font-bold text-xs shadow-xs"
              title="Investor 1"
            >
              HW
            </div>
            <!-- Avatar 2 -->
            <div
              class="inline-block h-8 w-8 rounded-full ring-2 ring-white dark:ring-[#15161A] bg-[#0066FF] text-white flex items-center justify-center font-heading font-bold text-xs shadow-xs"
              title="Investor 2"
            >
              SC
            </div>
            <!-- Avatar 3 -->
            <div
              class="inline-block h-8 w-8 rounded-full ring-2 ring-white dark:ring-[#15161A] bg-emerald-600 text-white flex items-center justify-center font-heading font-bold text-xs shadow-xs"
              title="Investor 3"
            >
              BN
            </div>
            <!-- Indicator +1 -->
            <div
              class="inline-block h-8 w-8 rounded-full ring-2 ring-white dark:ring-[#15161A] bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 flex items-center justify-center font-mono font-bold text-[10px] shadow-xs"
            >
              +1
            </div>
          </div>

          <!-- Pulsing Unread Activity Pill -->
          <span class="inline-flex items-center gap-1 text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-primary-50 text-primary-700 dark:bg-primary-950/80 dark:text-primary-300 border border-primary-200/80 dark:border-primary-800/60">
            <span class="w-1.5 h-1.5 rounded-full bg-primary-500 animate-pulse" />
            Baru
          </span>
        </div>

        <!-- Middle: Actionable Bold Text (Strictly "3 Permintaan Akses Data Room") -->
        <div>
          <h2 class="text-sm sm:text-[15px] font-heading font-bold text-neutral-900 dark:text-white leading-snug tracking-tight">
            3 Permintaan Akses Data Room
          </h2>
          <p class="text-[11px] font-sans text-neutral-500 dark:text-neutral-400 mt-0.5">
            Investor menunggu izin berkas
          </p>
        </div>

        <!-- Bottom: Full-Width Solid-Fill High-Contrast Button -->
        <button
          type="button"
          class="w-full py-2.5 px-3 rounded-xl bg-neutral-950 hover:bg-neutral-800 dark:bg-white dark:hover:bg-neutral-100 text-white dark:text-neutral-950 font-heading font-bold text-xs sm:text-[13px] shadow-xs transition-all duration-150 flex items-center justify-center gap-1.5 group-hover:shadow-sm cursor-pointer"
        >
          <span>Tinjau Permintaan Akses</span>
          <svg class="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineEmits<{
  (e: 'click'): void
}>()
</script>
