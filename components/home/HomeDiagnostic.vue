<template>
  <section class="max-w-7xl mx-auto px-4 sm:px-8 lg:px-8 pb-24">
    <!-- Main Box: bg-white, radius-24px -->
    <div class="rounded-[24px] bg-white dark:bg-[#15161A] border border-[#EAEAEA] dark:border-[#26272F] p-8 sm:p-16 shadow-xs relative overflow-hidden">
      
      <!-- Section Header -->
      <div class="max-w-2xl mx-auto text-center flex flex-col gap-4 mb-16">
        <span class="text-[12px]  font-bold uppercase tracking-wider text-primary-600 dark:text-primary-400 block leading-[16px]">
          § 01 // SIMULASI & DIAGNOSA MANDIRI
        </span>
        <h2 class="text-[26px] sm:text-[42px]  font-extrabold text-neutral-900 dark:text-white tracking-tight leading-[32px] sm:leading-[52px]">
          Cek Kelayakan Pendanaan Usahamu dalam 1 Menit
        </h2>
        <p class="text-[16px] text-neutral-600 dark:text-neutral-400 max-w-xl mx-auto leading-[24px] ">
          Pilih profil usahamu di bawah ini untuk melihat estimasi skor kesiapan audit 5 pilar dan rekomendasi tiket modal yang realistis.
        </p>
      </div>

      <!-- Main Interactive Box (Split 2 Columns) -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center max-w-5xl mx-auto">
        
        <!-- Controls (Left Col 7) -->
        <div class="lg:col-span-7 flex flex-col gap-8">
          
          <!-- Step 1: Sector -->
          <div class="flex flex-col gap-4">
            <span class="text-[12px]  font-bold text-neutral-900 dark:text-white uppercase tracking-wider block leading-[16px]">
              1. Pilih Sektor Usaha
            </span>
            <div class="grid grid-cols-2 gap-4">
              <button
                v-for="sec in sectors"
                :key="sec.id"
                type="button"
                :class="[
                  'px-4 py-3 rounded-[12px] text-[16px]  font-semibold text-left transition-all border cursor-pointer flex items-center gap-2 select-none leading-[24px]',
                  selectedSector === sec.id
                    ? 'bg-primary-500 text-white border-primary-600 shadow-xs'
                    : 'bg-[#FAFAFA] dark:bg-[#0F1014] text-neutral-700 dark:text-neutral-300 border-[#EAEAEA] dark:border-[#26272F] hover:border-neutral-400 dark:hover:border-neutral-600'
                ]"
                @click="selectedSector = sec.id"
              >
                <span>{{ sec.icon }}</span>
                <span class="truncate">{{ sec.label }}</span>
              </button>
            </div>
          </div>

          <!-- Step 2: Revenue Range -->
          <div class="flex flex-col gap-4">
            <span class="text-[12px]  font-bold text-neutral-900 dark:text-white uppercase tracking-wider block leading-[16px]">
              2. Omzet Rata-rata per Bulan
            </span>
            <div class="grid grid-cols-3 gap-4">
              <button
                v-for="rev in revenues"
                :key="rev.id"
                type="button"
                :class="[
                  'px-4 py-3 rounded-[12px] text-[16px]  font-semibold text-center transition-all border cursor-pointer select-none leading-[24px]',
                  selectedRevenue === rev.id
                    ? 'bg-primary-500 text-white border-primary-600 shadow-xs'
                    : 'bg-[#FAFAFA] dark:bg-[#0F1014] text-neutral-700 dark:text-neutral-300 border-[#EAEAEA] dark:border-[#26272F] hover:border-neutral-400 dark:hover:border-neutral-600'
                ]"
                @click="selectedRevenue = rev.id"
              >
                {{ rev.label }}
              </button>
            </div>
          </div>

          <!-- Step 3: Bookkeeping Method -->
          <div class="flex flex-col gap-4">
            <span class="text-[12px]  font-bold text-neutral-900 dark:text-white uppercase tracking-wider block leading-[16px]">
              3. Cara Pencatatan Kas Saat Ini
            </span>
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <button
                v-for="rec in records"
                :key="rec.id"
                type="button"
                :class="[
                  'px-4 py-3 rounded-[12px] text-[16px]  font-semibold text-left sm:text-center transition-all border cursor-pointer select-none truncate leading-[24px]',
                  selectedRecord === rec.id
                    ? 'bg-primary-500 text-white border-primary-600 shadow-xs'
                    : 'bg-[#FAFAFA] dark:bg-[#0F1014] text-neutral-700 dark:text-neutral-300 border-[#EAEAEA] dark:border-[#26272F] hover:border-neutral-400 dark:hover:border-neutral-600'
                ]"
                @click="selectedRecord = rec.id"
              >
                {{ rec.label }}
              </button>
            </div>
          </div>
        </div>

        <!-- Live Score Output Card (Col 5) -->
        <div class="lg:col-span-5 bg-[#FAFAFA] dark:bg-[#0F1014] border border-[#EAEAEA] dark:border-[#26272F] rounded-[16px] p-8 flex flex-col gap-6">
          <div class="flex items-center justify-between pb-4 border-b border-[#EAEAEA] dark:border-[#26272F]">
            <span class="text-[12px]  font-bold uppercase tracking-wider text-primary-500 leading-[16px]">
              Hasil Diagnosa Awal
            </span>
            <span class="text-[12px]  px-2 py-1 rounded-[4px] bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 font-bold leading-[16px]">
              Instan
            </span>
          </div>

          <!-- Score Display -->
          <div class="flex flex-col gap-2">
            <span class="text-[16px] text-neutral-500 block font-medium leading-[24px]">Estimasi Skor Kesiapan:</span>
            <div class="flex items-baseline gap-2">
              <span class="text-[42px] sm:text-[68px]  font-extrabold text-primary-500 tabular-nums  leading-[52px] sm:leading-[84px]">
                {{ calculatedScore }}
              </span>
              <span class="text-[16px] font-bold text-neutral-400  leading-[24px]">/ 100</span>
            </div>
            <div class="pt-2">
              <span
                :class="[
                  'inline-block text-[12px]  font-bold px-3 py-1 rounded-[8px] border leading-[16px]',
                  calculatedScore >= 80
                    ? 'bg-emerald-50 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800'
                    : calculatedScore >= 65
                    ? 'bg-amber-50 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300 border-amber-200 dark:border-amber-800'
                    : 'bg-red-50 text-red-800 dark:bg-red-950/60 dark:text-red-300 border-red-200 dark:border-red-800'
                ]"
              >
                {{ verdict.badge }}
              </span>
            </div>
          </div>

          <p class="text-[16px] text-neutral-600 dark:text-neutral-300 leading-[24px] ">
            {{ verdict.desc }}
          </p>

          <div class="pt-4 border-t border-[#EAEAEA] dark:border-[#26272F] flex flex-col gap-6">
            <div class="flex items-center justify-between text-[16px]">
              <span class="text-neutral-500 leading-[24px]">Rekomendasi Tiket Modal:</span>
              <strong class=" text-neutral-900 dark:text-white leading-[24px]">{{ verdict.ticket }}</strong>
            </div>

            <NuxtLink
              to="/daftar"
              class="block w-full text-center py-4 rounded-[12px]  font-bold text-[16px] bg-primary-500 hover:bg-primary-600 text-white shadow-xs transition-all active:scale-[0.98] leading-[24px]"
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
      badge: 'Grade B • Butuh Pendampingan',
      desc: 'Usaha stabil, tinggal merapikan SOP stok bahan baku dan verifikasi pemisahan rekening bersama konsultan.',
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
