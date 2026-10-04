<template>
  <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
    <div class="rounded-3xl bg-neutral-50/70 dark:bg-[#151519] border border-neutral-200/80 dark:border-neutral-800 p-8 sm:p-12 lg:p-14 shadow-xs relative overflow-hidden">
      <!-- Section Header -->
      <div class="max-w-2xl mx-auto text-center space-y-2 mb-10">
        <span class="text-[11px] font-mono font-bold uppercase tracking-wider text-primary-600 dark:text-primary-400 block">
          § 01 // SIMULASI & DIAGNOSA MANDIRI
        </span>
        <h2 class="text-2xl sm:text-3xl lg:text-4xl font-heading font-extrabold text-neutral-900 dark:text-white tracking-tight">
          Cek Kelayakan Pendanaan Usahamu dalam 1 Menit
        </h2>
        <p class="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 max-w-xl mx-auto leading-relaxed">
          Pilih profil usahamu di bawah ini untuk melihat estimasi skor kesiapan audit 5 pilar dan rekomendasi tiket modal yang realistis.
        </p>
      </div>

      <!-- Main Interactive Box (Split 2 Columns: Controls on Left, Live Score on Right) -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center max-w-5xl mx-auto">
        <!-- Controls (Pill Chips) -->
        <div class="lg:col-span-7 space-y-6">
          <!-- Step 1: Sector -->
          <div class="space-y-2.5">
            <span class="text-xs font-heading font-bold text-neutral-900 dark:text-white uppercase tracking-wider block">
              1. Pilih Sektor Usaha
            </span>
            <div class="grid grid-cols-2 gap-2 sm:gap-2.5">
              <button
                v-for="sec in sectors"
                :key="sec.id"
                type="button"
                :class="[
                  'px-3.5 py-2.5 rounded-xl text-xs font-heading font-semibold text-left transition-all border cursor-pointer flex items-center gap-2 select-none',
                  selectedSector === sec.id
                    ? 'bg-primary-500 text-white border-primary-600 shadow-xs'
                    : 'bg-white dark:bg-neutral-900 text-neutral-700 dark:text-neutral-300 border-neutral-200 dark:border-neutral-800 hover:border-neutral-400'
                ]"
                @click="selectedSector = sec.id"
              >
                <span>{{ sec.icon }}</span>
                <span class="truncate">{{ sec.label }}</span>
              </button>
            </div>
          </div>

          <!-- Step 2: Revenue Range -->
          <div class="space-y-2.5">
            <span class="text-xs font-heading font-bold text-neutral-900 dark:text-white uppercase tracking-wider block">
              2. Omzet Rata-rata per Bulan
            </span>
            <div class="grid grid-cols-3 gap-2 sm:gap-2.5">
              <button
                v-for="rev in revenues"
                :key="rev.id"
                type="button"
                :class="[
                  'px-3 py-2.5 rounded-xl text-xs font-heading font-semibold text-center transition-all border cursor-pointer select-none',
                  selectedRevenue === rev.id
                    ? 'bg-primary-500 text-white border-primary-600 shadow-xs'
                    : 'bg-white dark:bg-neutral-900 text-neutral-700 dark:text-neutral-300 border-neutral-200 dark:border-neutral-800 hover:border-neutral-400'
                ]"
                @click="selectedRevenue = rev.id"
              >
                {{ rev.label }}
              </button>
            </div>
          </div>

          <!-- Step 3: Bookkeeping Method -->
          <div class="space-y-2.5">
            <span class="text-xs font-heading font-bold text-neutral-900 dark:text-white uppercase tracking-wider block">
              3. Cara Pencatatan Kas Saat Ini
            </span>
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-2.5">
              <button
                v-for="rec in records"
                :key="rec.id"
                type="button"
                :class="[
                  'px-3 py-2.5 rounded-xl text-xs font-heading font-semibold text-left sm:text-center transition-all border cursor-pointer select-none truncate',
                  selectedRecord === rec.id
                    ? 'bg-primary-500 text-white border-primary-600 shadow-xs'
                    : 'bg-white dark:bg-neutral-900 text-neutral-700 dark:text-neutral-300 border-neutral-200 dark:border-neutral-800 hover:border-neutral-400'
                ]"
                @click="selectedRecord = rec.id"
              >
                {{ rec.label }}
              </button>
            </div>
          </div>
        </div>

        <!-- Live Score Output Card (Col 5) -->
        <div class="lg:col-span-5 bg-white dark:bg-[#151519] border border-neutral-200/80 dark:border-neutral-800 rounded-3xl p-6 sm:p-7 shadow-xs space-y-5">
          <div class="flex items-center justify-between pb-3 border-b border-neutral-100 dark:border-neutral-800">
            <span class="text-[11px] font-heading font-bold uppercase tracking-wider text-primary-500">
              Hasil Diagnosa Awal
            </span>
            <span class="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 font-bold">
              Instan
            </span>
          </div>

          <!-- Score Display -->
          <div class="space-y-1">
            <span class="text-xs text-neutral-400 block font-medium">Estimasi Skor Kesiapan:</span>
            <div class="flex items-baseline gap-2">
              <span class="text-4xl sm:text-5xl font-heading font-extrabold text-primary-500 tabular-nums font-mono">
                {{ calculatedScore }}
              </span>
              <span class="text-sm font-bold text-neutral-400 font-mono">/ 100</span>
            </div>
            <div class="pt-1">
              <span
                :class="[
                  'inline-block text-[11px] font-heading font-bold px-2.5 py-0.5 rounded-md border',
                  calculatedScore >= 80
                    ? 'bg-emerald-50 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800'
                    : calculatedScore >= 65
                    ? 'bg-amber-50 text-amber-800 dark:bg-amber-950 dark:text-amber-300 border-amber-200 dark:border-amber-800'
                    : 'bg-red-50 text-red-800 dark:bg-red-950 dark:text-red-300 border-red-200 dark:border-red-800'
                ]"
              >
                {{ verdict.badge }}
              </span>
            </div>
          </div>

          <p class="text-xs text-neutral-600 dark:text-neutral-300 leading-relaxed">
            {{ verdict.desc }}
          </p>

          <div class="pt-3 border-t border-neutral-100 dark:border-neutral-800 space-y-3">
            <div class="flex items-center justify-between text-xs">
              <span class="text-neutral-500">Rekomendasi Tiket Modal:</span>
              <strong class="font-mono text-neutral-900 dark:text-white">{{ verdict.ticket }}</strong>
            </div>

            <NuxtLink
              to="/daftar"
              class="block w-full text-center py-3 rounded-xl font-heading font-bold text-xs bg-primary-500 hover:bg-primary-600 text-white shadow-xs transition-all active:scale-[0.98]"
            >
              Daftarkan Usaha untuk Audit Lengkap →
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const sectors = [
  { id: 'fnb', label: 'Kuliner & Minuman (F&B)', icon: '☕' },
  { id: 'craft', label: 'Kriya & Fashion Retail', icon: '🧵' },
  { id: 'agri', label: 'Agribisnis & Pangan Segar', icon: '🌾' },
  { id: 'services', label: 'Jasa & Manufaktur Ringan', icon: '⚙️' }
]

const revenues = [
  { id: '15-50', label: 'Rp 15 – 50 Jt' },
  { id: '50-150', label: 'Rp 50 – 150 Jt' },
  { id: '150+', label: '> Rp 150 Jt' }
]

const records = [
  { id: 'app', label: '📱 Kasir POS / Digital' },
  { id: 'book', label: '📝 Nota / Buku Fisik' },
  { id: 'mixed', label: '💳 Rekening Campur' }
]

const selectedSector = ref('fnb')
const selectedRevenue = ref('50-150')
const selectedRecord = ref('app')

const calculatedScore = computed(() => {
  let score = 50
  if (selectedSector.value === 'fnb') score += 10
  if (selectedRevenue.value === '50-150') score += 15
  if (selectedRevenue.value === '150+') score += 25
  if (selectedRecord.value === 'app') score += 15
  if (selectedRecord.value === 'book') score += 5
  return Math.min(95, score)
})

const verdict = computed(() => {
  if (calculatedScore.value >= 85) {
    return {
      badge: 'Grade A • Siap Investor',
      desc: 'Rasio finansial dan pencatatan kas usahamu sangat matang untuk diajukan ke kurasi sindikasi modal.',
      ticket: 'Rp 100 Jt – Rp 250 Jt'
    }
  } else if (calculatedScore.value >= 70) {
    return {
      badge: 'Grade B • Butuh 1 Bulan Pendampingan',
      desc: 'Usaha stabil, tinggal merapikan SOP stok bahan baku dan verifikasi pemisahan rekening bersama konsultan BNSP.',
      ticket: 'Rp 50 Jt – Rp 150 Jt'
    }
  } else {
    return {
      badge: 'Grade C • Fondasi Awal',
      desc: 'Fokus awal adalah memisahkan uang kas usaha dari uang pribadi agar pembukuan tidak bocor.',
      ticket: 'Rp 25 Jt – Rp 50 Jt'
    }
  }
})
</script>
