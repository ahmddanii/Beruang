<template>
  <div class="card-tactile-gopay rounded-[22px] p-6 sm:p-7 border border-[#CBD5E1] dark:border-neutral-800 bg-[#FFFFFF] dark:bg-[#13161F] !shadow-none space-y-4 font-poppins">
    <!-- Header of Theme Selector -->
    <div class="pb-3 border-b border-neutral-100 dark:border-neutral-800/80">
      <div class="space-y-0.5">
        <div class="flex items-center gap-2">
          <HugeiconsIcon :icon="PaintBoardIcon" :size="18" :stroke-width="2" class="text-[#2091AA] dark:text-[#50AABF]" />
          <h2 class="text-base sm:text-lg font-bold text-neutral-900 dark:text-white tracking-tight">
            {{ t('theme_title') }}
          </h2>
        </div>
        <p class="text-xs text-neutral-500 dark:text-neutral-400">
          {{ t('theme_desc') }}
        </p>
      </div>
    </div>

    <!-- 3 Theme Options Grid (Fixed stable borders & dimensions, ZERO JUMP / ZERO BUG) -->
    <div class="grid grid-cols-1 sm:grid-cols-3 gap-3.5 sm:gap-4 items-stretch">
      <!-- 1. MODE TERANG -->
      <button
        type="button"
        :class="[
          'relative text-left rounded-2xl p-3.5 sm:p-4 transition-colors duration-150 cursor-pointer flex flex-col justify-between group shadow-none border-2 select-none h-full min-h-[210px] box-border',
          themeMode === 'light'
            ? 'border-[#2091AA] dark:border-[#50AABF] bg-[#F0F9FB] dark:bg-[#2091AA]/15'
            : 'border-[#CBD5E1] dark:border-neutral-800 bg-[#FFFFFF] dark:bg-[#18191E] hover:border-neutral-400 dark:hover:border-neutral-700'
        ]"
        @click="selectTheme('light', $event)"
      >
        <!-- Mockup Visual: Mode Terang (Fixed height & flex-shrink-0 to prevent any resizing) -->
        <div class="w-full h-28 sm:h-32 rounded-lg border border-slate-200 dark:border-neutral-700/80 overflow-hidden bg-[#F3F8FC] flex flex-col mb-3 select-none pointer-events-none shrink-0">
          <!-- Mini Topbar -->
          <div class="h-6 bg-white border-b border-slate-200 px-2 flex items-center justify-between shrink-0">
            <div class="flex items-center gap-1">
              <span class="w-1.5 h-1.5 rounded-full bg-slate-300" />
              <span class="w-1.5 h-1.5 rounded-full bg-slate-300" />
              <span class="w-1.5 h-1.5 rounded-full bg-slate-300" />
              <span class="text-[8px] font-bold text-[#156374] ml-1">Ber<span class="text-[#00800e]">uang</span></span>
            </div>
            <div class="w-3.5 h-3.5 rounded-full bg-slate-200" />
          </div>

          <!-- Mini Workspace Body -->
          <div class="flex-1 flex overflow-hidden">
            <!-- Mini Sidebar -->
            <div class="w-1/4 bg-[#FAFCFE] border-r border-slate-200 p-1.5 space-y-1 shrink-0">
              <div class="h-2 rounded bg-[#E6F4F7] w-full" />
              <div class="h-1.5 rounded bg-slate-200 w-4/5" />
              <div class="h-1.5 rounded bg-slate-200 w-3/5" />
            </div>

            <!-- Mini Content Canvas -->
            <div class="flex-1 p-2 space-y-1.5 bg-[#F3F8FC]">
              <!-- Mini Card -->
              <div class="bg-white rounded border border-slate-200 p-1.5 space-y-1">
                <div class="flex items-center justify-between">
                  <div class="h-1.5 rounded bg-[#2091AA] w-10" />
                  <div class="h-1.5 px-1 rounded-full bg-emerald-100 flex items-center">
                    <span class="w-4 h-1 bg-emerald-600 rounded-full" />
                  </div>
                </div>
                <div class="h-2.5 rounded bg-slate-800 w-14" />
                <div class="h-1 rounded bg-slate-100 w-full" />
              </div>

              <!-- Mini Line Item -->
              <div class="bg-white rounded border border-slate-200 px-1.5 py-1 flex items-center justify-between">
                <div class="h-1.5 rounded bg-slate-400 w-12" />
                <div class="h-1.5 rounded bg-[#00800e] w-5" />
              </div>
            </div>
          </div>
        </div>

        <!-- Meta Info & Indicator -->
        <div class="flex items-start justify-between gap-2 mt-auto min-h-[44px]">
          <div class="min-w-0">
            <div class="flex items-center gap-1.5">
              <HugeiconsIcon :icon="Sun01Icon" :size="15" :stroke-width="2" class="text-amber-500 shrink-0" />
              <span class="text-xs sm:text-sm font-bold text-neutral-900 dark:text-white truncate">
                {{ t('theme_light') }}
              </span>
            </div>
            <p class="text-[11px] text-neutral-500 dark:text-neutral-400 mt-0.5 leading-snug">
              {{ t('theme_light_desc') }}
            </p>
          </div>

          <!-- Radio Circle Indicator -->
          <div
            :class="[
              'w-4 h-4 rounded-full border flex items-center justify-center shrink-0 mt-0.5 transition-colors',
              themeMode === 'light'
                ? 'border-[#2091AA] dark:border-[#50AABF] bg-[#2091AA] dark:bg-[#50AABF]'
                : 'border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-800'
            ]"
          >
            <span v-if="themeMode === 'light'" class="w-1.5 h-1.5 rounded-full bg-white" />
          </div>
        </div>
      </button>

      <!-- 2. MODE GELAP -->
      <button
        type="button"
        :class="[
          'relative text-left rounded-2xl p-3.5 sm:p-4 transition-colors duration-150 cursor-pointer flex flex-col justify-between group shadow-none border-2 select-none h-full min-h-[210px] box-border',
          themeMode === 'dark'
            ? 'border-[#2091AA] dark:border-[#50AABF] bg-[#F0F9FB] dark:bg-[#2091AA]/15'
            : 'border-[#CBD5E1] dark:border-neutral-800 bg-[#FFFFFF] dark:bg-[#18191E] hover:border-neutral-400 dark:hover:border-neutral-700'
        ]"
        @click="selectTheme('dark', $event)"
      >
        <!-- Mockup Visual: Mode Gelap (Fixed height & flex-shrink-0) -->
        <div class="w-full h-28 sm:h-32 rounded-lg border border-neutral-700/80 overflow-hidden bg-[#0C121D] flex flex-col mb-3 select-none pointer-events-none shrink-0">
          <!-- Mini Topbar -->
          <div class="h-6 bg-[#13161F] border-b border-neutral-800 px-2 flex items-center justify-between shrink-0">
            <div class="flex items-center gap-1">
              <span class="w-1.5 h-1.5 rounded-full bg-neutral-700" />
              <span class="w-1.5 h-1.5 rounded-full bg-neutral-700" />
              <span class="w-1.5 h-1.5 rounded-full bg-neutral-700" />
              <span class="text-[8px] font-bold text-[#50AABF] ml-1">Ber<span class="text-[#00C058]">uang</span></span>
            </div>
            <div class="w-3.5 h-3.5 rounded-full bg-neutral-700" />
          </div>

          <!-- Mini Workspace Body -->
          <div class="flex-1 flex overflow-hidden">
            <!-- Mini Sidebar -->
            <div class="w-1/4 bg-[#101726] border-r border-neutral-800 p-1.5 space-y-1 shrink-0">
              <div class="h-2 rounded bg-[#2091AA]/40 w-full" />
              <div class="h-1.5 rounded bg-neutral-700 w-4/5" />
              <div class="h-1.5 rounded bg-neutral-700 w-3/5" />
            </div>

            <!-- Mini Content Canvas -->
            <div class="flex-1 p-2 space-y-1.5 bg-[#0C121D]">
              <!-- Mini Card -->
              <div class="bg-[#141D2E] rounded border border-[#1E2E48] p-1.5 space-y-1">
                <div class="flex items-center justify-between">
                  <div class="h-1.5 rounded bg-[#50AABF] w-10" />
                  <div class="h-1.5 px-1 rounded-full bg-emerald-950/80 flex items-center">
                    <span class="w-4 h-1 bg-[#00C058] rounded-full" />
                  </div>
                </div>
                <div class="h-2.5 rounded bg-neutral-100 w-14" />
                <div class="h-1 rounded bg-neutral-800 w-full" />
              </div>

              <!-- Mini Line Item -->
              <div class="bg-[#141D2E] rounded border border-[#1E2E48] px-1.5 py-1 flex items-center justify-between">
                <div class="h-1.5 rounded bg-neutral-500 w-12" />
                <div class="h-1.5 rounded bg-[#00C058] w-5" />
              </div>
            </div>
          </div>
        </div>

        <!-- Meta Info & Indicator -->
        <div class="flex items-start justify-between gap-2 mt-auto min-h-[44px]">
          <div class="min-w-0">
            <div class="flex items-center gap-1.5">
              <HugeiconsIcon :icon="Moon02Icon" :size="15" :stroke-width="2" class="text-indigo-400 shrink-0" />
              <span class="text-xs sm:text-sm font-bold text-neutral-900 dark:text-white truncate">
                {{ t('theme_dark') }}
              </span>
            </div>
            <p class="text-[11px] text-neutral-500 dark:text-neutral-400 mt-0.5 leading-snug">
              {{ t('theme_dark_desc') }}
            </p>
          </div>

          <!-- Radio Circle Indicator -->
          <div
            :class="[
              'w-4 h-4 rounded-full border flex items-center justify-center shrink-0 mt-0.5 transition-colors',
              themeMode === 'dark'
                ? 'border-[#2091AA] dark:border-[#50AABF] bg-[#2091AA] dark:bg-[#50AABF]'
                : 'border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-800'
            ]"
          >
            <span v-if="themeMode === 'dark'" class="w-1.5 h-1.5 rounded-full bg-white" />
          </div>
        </div>
      </button>

      <!-- 3. MODE SISTEM (AUTO) -->
      <button
        type="button"
        :class="[
          'relative text-left rounded-2xl p-3.5 sm:p-4 transition-colors duration-150 cursor-pointer flex flex-col justify-between group shadow-none border-2 select-none h-full min-h-[210px] box-border',
          themeMode === 'system'
            ? 'border-[#2091AA] dark:border-[#50AABF] bg-[#F0F9FB] dark:bg-[#2091AA]/15'
            : 'border-[#CBD5E1] dark:border-neutral-800 bg-[#FFFFFF] dark:bg-[#18191E] hover:border-neutral-400 dark:hover:border-neutral-700'
        ]"
        @click="selectTheme('system', $event)"
      >
        <!-- Mockup Visual: Mode Split Sistem (Fixed height & flex-shrink-0) -->
        <div class="w-full h-28 sm:h-32 rounded-lg border border-slate-200 dark:border-neutral-700/80 overflow-hidden flex mb-3 relative select-none pointer-events-none shrink-0">
          <!-- Left Half: Light Preview -->
          <div class="w-1/2 h-full bg-[#F3F8FC] border-r border-dashed border-neutral-400 dark:border-neutral-600 flex flex-col overflow-hidden">
            <div class="h-6 bg-white border-b border-slate-200 px-2 flex items-center shrink-0">
              <span class="text-[8px] font-bold text-[#156374]">Ber<span class="text-[#00800e]">uang</span></span>
            </div>
            <div class="flex-1 p-2 space-y-1.5">
              <div class="bg-white rounded border border-slate-200 p-1.5 space-y-1">
                <div class="h-1.5 rounded bg-[#2091AA] w-8" />
                <div class="h-2 rounded bg-slate-800 w-10" />
              </div>
            </div>
          </div>

          <!-- Right Half: Dark Preview -->
          <div class="w-1/2 h-full bg-[#0C121D] flex flex-col overflow-hidden">
            <div class="h-6 bg-[#13161F] border-b border-neutral-800 px-2 flex items-center justify-end shrink-0">
              <div class="w-3.5 h-3.5 rounded-full bg-neutral-700" />
            </div>
            <div class="flex-1 p-2 space-y-1.5">
              <div class="bg-[#141D2E] rounded border border-[#1E2E48] p-1.5 space-y-1">
                <div class="h-1.5 rounded bg-[#50AABF] w-8 ml-auto" />
                <div class="h-2 rounded bg-neutral-100 w-10 ml-auto" />
              </div>
            </div>
          </div>

          <!-- Center Badge -->
          <div class="absolute inset-x-0 bottom-1 flex justify-center">
            <span class="px-2 py-0.5 rounded-full text-[9px] font-bold bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 border border-neutral-700 dark:border-neutral-200">
              Auto Sync
            </span>
          </div>
        </div>

        <!-- Meta Info & Indicator -->
        <div class="flex items-start justify-between gap-2 mt-auto min-h-[44px]">
          <div class="min-w-0">
            <div class="flex items-center gap-1.5">
              <HugeiconsIcon :icon="ComputerIcon" :size="15" :stroke-width="2" class="text-[#2091AA] dark:text-[#50AABF] shrink-0" />
              <span class="text-xs sm:text-sm font-bold text-neutral-900 dark:text-white truncate">
                {{ t('theme_system') }}
              </span>
            </div>
            <p class="text-[11px] text-neutral-500 dark:text-neutral-400 mt-0.5 leading-snug">
              {{ t('theme_system_desc') }}
            </p>
          </div>

          <!-- Radio Circle Indicator -->
          <div
            :class="[
              'w-4 h-4 rounded-full border flex items-center justify-center shrink-0 mt-0.5 transition-colors',
              themeMode === 'system'
                ? 'border-[#2091AA] dark:border-[#50AABF] bg-[#2091AA] dark:bg-[#50AABF]'
                : 'border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-800'
            ]"
          >
            <span v-if="themeMode === 'system'" class="w-1.5 h-1.5 rounded-full bg-white" />
          </div>
        </div>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useThemeMode, type ThemeMode } from '~/composables/useThemeMode'
import { useLanguage } from '~/composables/useLanguage'
import { HugeiconsIcon } from '@hugeicons/vue'
import {
  PaintBoardIcon,
  Sun01Icon,
  Moon02Icon,
  ComputerIcon
} from '@hugeicons/core-free-icons'
import gsap from 'gsap'

const { themeMode, setThemeMode } = useThemeMode()
const { t } = useLanguage()

function selectTheme(mode: ThemeMode, event?: MouseEvent) {
  setThemeMode(mode)
  if (event?.currentTarget) {
    gsap.fromTo(
      event.currentTarget as HTMLElement,
      { scale: 0.98 },
      { scale: 1, duration: 0.25, ease: 'back.out(2)' }
    )
  }
}
</script>
