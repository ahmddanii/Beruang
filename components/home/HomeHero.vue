<template>
  <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-10 pb-12 sm:pb-16">
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
      <!-- Left Column: Editorial Headline & Value Prop -->
      <div class="lg:col-span-7 space-y-6">
        <!-- Architectural Monospace Metadata Marker (Anti-Slop: No generic pulsing pill) -->
        <div class="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 border border-neutral-200 dark:border-neutral-700 text-[11px] font-mono font-semibold tracking-wide">
          <span class="text-primary-600 dark:text-primary-400 font-bold">§ 2026 PROTOKOL</span>
          <span class="text-neutral-300 dark:text-neutral-600">/</span>
          <span>PENILAIAN 5 PILAR & KESIAPAN PENDANAAN UMKM</span>
        </div>

        <h1 class="text-4xl sm:text-5xl lg:text-[56px] font-heading font-extrabold text-neutral-900 dark:text-white tracking-tight leading-[1.05] text-balance">
          Bisnismu, Terverifikasi & Siap Didanai.
        </h1>

        <p class="text-base sm:text-lg text-neutral-600 dark:text-neutral-300 max-w-[50ch] leading-relaxed font-sans">
          Penilaian 5 pilar bersama konsultan bisnis profesional. Rapikan catatan kas riil, raih validasi kelayakan resmi, dan terhubung langsung dengan sindikasi investor terakreditasi melalui skema kemitraan modal sehat.
        </p>

        <!-- Dual Tactile CTAs (Button-in-Button Island Architecture) -->
        <div class="pt-2 flex flex-wrap items-center gap-3.5">
          <NuxtLink
            to="/daftar"
            class="group pl-6 pr-2 py-2 rounded-full font-heading font-bold text-xs sm:text-sm bg-primary-500 hover:bg-primary-600 text-white shadow-xs transition-all duration-300 inline-flex items-center gap-3 cursor-pointer"
          >
            <span>Cek Kesiapan Usaha Gratis</span>
            <span class="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center transition-transform duration-300 group-hover:translate-x-0.5">
              <HugeiconsIcon :icon="ArrowRight01Icon" :size="15" :stroke-width="2" />
            </span>
          </NuxtLink>

          <NuxtLink
            to="/investor"
            class="px-6 py-3 rounded-full font-heading font-semibold text-xs sm:text-sm border border-neutral-300 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-700 dark:text-neutral-200 transition-all duration-150"
          >
            <span>Katalog Direktori Usaha</span>
          </NuxtLink>
        </div>

        <!-- Institutional Trust Strip (Hairline Separated) -->
        <div class="pt-6 flex flex-wrap items-center gap-6 sm:gap-8 text-xs text-neutral-500 dark:text-neutral-400 border-t border-neutral-200/80 dark:border-neutral-800 font-sans">
          <div class="flex items-center gap-2">
            <HugeiconsIcon :icon="CheckmarkCircle01Icon" :size="16" :stroke-width="2" class="text-emerald-500" />
            <span class="font-medium text-neutral-700 dark:text-neutral-300">Standar Validasi Konsultan Ahli</span>
          </div>
          <div class="flex items-center gap-2">
            <HugeiconsIcon :icon="LockKeyIcon" :size="16" :stroke-width="2" class="text-primary-500" />
            <span class="font-medium text-neutral-700 dark:text-neutral-300">Data Room Terproteksi NDA</span>
          </div>
          <div class="flex items-center gap-2">
            <HugeiconsIcon :icon="Coins01Icon" :size="16" :stroke-width="2" class="text-amber-500" />
            <span class="font-medium text-neutral-700 dark:text-neutral-300">Kemitraan Modal • Bagi Hasil Sehat</span>
          </div>
        </div>
      </div>

      <!-- Right Column: Sleek Live Business Telemetry Card (Double-Bezel Hardware Architecture) -->
      <div class="lg:col-span-5">
        <div class="p-1.5 sm:p-2 rounded-[2.25rem] bg-neutral-200/50 dark:bg-neutral-800/40 border border-neutral-300/40 dark:border-neutral-700/30 shadow-xs">
          <div class="bg-white dark:bg-[#151519] border border-neutral-200/90 dark:border-neutral-800 rounded-[calc(2.25rem-0.5rem)] p-6 sm:p-7 shadow-[inset_0_1px_1px_rgba(255,255,255,0.9)] dark:shadow-[inset_0_1px_1px_rgba(255,255,255,0.06)] space-y-5">
          <!-- Card Header: Profile & Status -->
          <div class="flex items-start justify-between gap-3 pb-4 border-b border-neutral-100 dark:border-neutral-800">
            <div class="flex items-center gap-3">
              <div class="w-11 h-11 rounded-2xl bg-neutral-950 text-white dark:bg-white dark:text-neutral-900 flex items-center justify-center font-heading font-extrabold text-sm shadow-xs">
                KS
              </div>
              <div>
                <h3 class="font-heading font-extrabold text-sm text-neutral-900 dark:text-white leading-tight">
                  Kopi Senja Nusantara
                </h3>
                <p class="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5 font-mono">
                  Bandung • 3 Gerai • F&B
                </p>
              </div>
            </div>

            <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 text-[10px] font-mono font-bold">
              <span class="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              <span>GRADE A // PRIMA</span>
            </span>
          </div>

          <!-- Key Telemetry Gauges -->
          <div class="grid grid-cols-2 gap-3 font-mono">
            <div class="p-3.5 rounded-2xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200/70 dark:border-neutral-800 space-y-1">
              <span class="text-[10px] text-neutral-400 block font-heading uppercase font-semibold">Untung Bersih</span>
              <span class="text-lg font-heading font-extrabold text-emerald-600 dark:text-emerald-400 tabular-nums block">
                Rp 32.600.000
              </span>
              <span class="text-[10px] text-neutral-500 font-sans block">32.6% dari total pendapatan</span>
            </div>

            <div class="p-3.5 rounded-2xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200/70 dark:border-neutral-800 space-y-1">
              <span class="text-[10px] text-neutral-400 block font-heading uppercase font-semibold">Nafas Kas Usaha</span>
              <span class="text-lg font-heading font-extrabold text-neutral-900 dark:text-white tabular-nums block">
                3.2 Bulan
              </span>
              <span class="text-[10px] text-neutral-500 font-sans block">Rp 75.5 Jt kas cadangan</span>
            </div>
          </div>

          <!-- Unit Economics Mini Bar -->
          <div class="space-y-2">
            <div class="flex items-center justify-between text-xs">
              <span class="font-heading font-semibold text-neutral-700 dark:text-neutral-300">
                Aliran Uang per Rp 100.000 Pendapatan
              </span>
              <span class="text-[11px] font-mono text-emerald-600 dark:text-emerald-400 font-bold">
                Untung Bersih 32.6%
              </span>
            </div>

            <div class="w-full h-3 rounded-full overflow-hidden flex bg-neutral-100 dark:bg-neutral-800 gap-0.5">
              <div class="h-full bg-amber-500 rounded-l-full" style="width: 45.1%" title="Modal Jualan 45.1%" />
              <div class="h-full bg-blue-500" style="width: 22.3%" title="Biaya Operasional 22.3%" />
              <div class="h-full bg-emerald-500 rounded-r-full" style="width: 32.6%" title="Untung Bersih 32.6%" />
            </div>

            <div class="flex items-center justify-between text-[10px] text-neutral-500 dark:text-neutral-400 font-mono pt-0.5">
              <span class="flex items-center gap-1"><span class="w-1.5 h-1.5 rounded-full bg-amber-500" />Modal Jualan: 45.1%</span>
              <span class="flex items-center gap-1"><span class="w-1.5 h-1.5 rounded-full bg-blue-500" />Operasional: 22.3%</span>
              <span class="flex items-center gap-1 font-semibold text-emerald-600"><span class="w-1.5 h-1.5 rounded-full bg-emerald-500" />Untung Bersih: 32.6%</span>
            </div>
          </div>

          <!-- Active Match Indicator -->
          <div class="p-3.5 rounded-2xl bg-primary-50/70 dark:bg-primary-950/40 border border-primary-200 dark:border-primary-900 flex items-center justify-between gap-3 text-xs">
            <div class="flex items-center gap-2.5">
              <span class="w-2 h-2 rounded-full bg-primary-500 shrink-0" />
              <div class="space-y-0.5">
                <span class="font-heading font-bold text-primary-900 dark:text-primary-200 block">
                  1 Sindikasi Investor Tertarik
                </span>
                <span class="text-[11px] text-primary-700 dark:text-primary-400 block font-mono">
                  Tiket Modal: Rp 250 Juta (Ekspansi Gerai Ke-4)
                </span>
              </div>
            </div>
            <NuxtLink
              to="/masuk"
              class="px-3 py-1.5 rounded-xl font-heading font-bold text-[11px] bg-primary-500 hover:bg-primary-600 text-white shrink-0 transition-colors"
            >
              Lihat →
            </NuxtLink>
          </div>
        </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { HugeiconsIcon } from '@hugeicons/vue'
import {
  ArrowRight01Icon,
  CheckmarkCircle01Icon,
  LockKeyIcon,
  Coins01Icon
} from '@hugeicons/core-free-icons'
</script>
