<template>
  <section class="max-w-7xl mx-auto px-4 sm:px-8 lg:px-8 pb-24 flex flex-col gap-16">
    
    <!-- Section Header -->
    <div class="flex flex-col md:flex-row md:items-end justify-between gap-8 pb-8 border-b border-[#EAEAEA] dark:border-[#26272F]">
      <div class="max-w-2xl flex flex-col gap-4">
        <span class="text-[12px]  font-bold uppercase tracking-wider text-primary-600 dark:text-primary-400 block leading-[16px]">
          § 02 // TELEMETRI 5 PILAR
        </span>
        <h2 class="text-[26px] sm:text-[42px]  font-extrabold text-neutral-900 dark:text-white tracking-tight leading-[32px] sm:leading-[52px]">
          Teknologi Finansial yang Berbicara Bahasa Usaha Nyata
        </h2>
        <p class="text-[16px] text-neutral-600 dark:text-neutral-400 leading-[24px] ">
          Mengubah nota harian dan mutasi rekening menjadi metrik kelayakan investasi yang terverifikasi konsultan resmi BNSP.
        </p>
      </div>

      <!-- Real-Case Business Switcher -->
      <div class="flex items-center gap-2 p-2 rounded-[16px] bg-white dark:bg-[#15161A] border border-[#EAEAEA] dark:border-[#26272F] text-[16px]  font-semibold self-start md:self-auto shrink-0 shadow-sm">
        <button
          v-for="b in sampleBusinesses"
          :key="b.id"
          type="button"
          :class="[
            'px-4 py-2 rounded-[8px] transition-all cursor-pointer leading-[24px]',
            activeBusinessId === b.id
              ? 'bg-[#FAFAFA] dark:bg-[#0F1014] text-neutral-900 dark:text-white shadow-xs border border-[#EAEAEA] dark:border-[#26272F]'
              : 'text-neutral-500 hover:text-neutral-900 dark:hover:text-white border border-transparent'
          ]"
          @click="activeBusinessId = b.id"
        >
          <span>{{ b.name }}</span>
        </button>
      </div>
    </div>

    <!-- Dynamic 2-Zone Bento Grid -->
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
      
      <!-- Zone 1: Verified Cash Flow Telemetry (Col 7) -->
      <div class="lg:col-span-7 bg-white dark:bg-[#15161A] border border-[#EAEAEA] dark:border-[#26272F] rounded-[24px] p-8 shadow-xs flex flex-col justify-between gap-8">
        <div class="flex flex-col gap-4">
          <div class="flex items-center justify-between">
            <span class="text-[12px]  font-bold uppercase tracking-wider text-neutral-400 leading-[16px]">
              AUDIT KAS BERKALA // 3 BULAN TERAKHIR
            </span>
            <span class="inline-flex items-center gap-2 text-[12px]  font-bold px-3 py-1 rounded-[8px] bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 leading-[16px]">
              <span class="w-2 h-2 rounded-[4px] bg-emerald-500" />
              <span>TERVALIDASI BNSP</span>
            </span>
          </div>
          <h3 class=" font-extrabold text-[26px] text-neutral-900 dark:text-white leading-[32px]">
            Telemetri Arus Kas & Deteksi Efisiensi Bahan Baku
          </h3>
          <p class="text-[16px] text-neutral-600 dark:text-neutral-400 leading-[24px]  max-w-xl">
            Sistem otomatis memantau rasio belanja bahan baku, titik impas (BEP), dan memberi rekomendasi perbaikan sebelum terjadi kebocoran laba.
          </p>
        </div>

        <!-- Verified Cash Ledger Table with Live Dynamic Data -->
        <div class="p-6 rounded-[16px] bg-[#FAFAFA] dark:bg-[#0F1014] border border-[#EAEAEA] dark:border-[#26272F] flex flex-col gap-4  text-[16px]">
          <div class="flex items-center justify-between  font-bold text-neutral-400 pb-4 border-b border-[#EAEAEA] dark:border-[#26272F] text-[12px] leading-[16px]">
            <span>Periode</span>
            <span class="text-right">Omzet Usaha</span>
            <span class="text-right">Bahan & Beban</span>
            <span class="text-right">Margin</span>
          </div>

          <div
            v-for="row in currentBusiness.records"
            :key="row.month"
            class="flex items-center justify-between text-neutral-800 dark:text-neutral-200 py-2 leading-[24px]"
          >
            <span class="font-medium">{{ row.month }} '26</span>
            <span class="text-right tabular-nums">Rp {{ (row.omzet).toLocaleString('id-ID') }}</span>
            <span class="text-right tabular-nums text-neutral-400">Rp {{ (row.costs).toLocaleString('id-ID') }}</span>
            <span class="text-right text-emerald-600 dark:text-emerald-400 font-extrabold tabular-nums">
              {{ row.margin }}%
            </span>
          </div>
        </div>

        <div class="pt-4 border-t border-[#EAEAEA] dark:border-[#26272F] flex items-center justify-between text-[16px]  leading-[24px]">
          <span class="text-neutral-500 ">Cadangan Kas Operasional:</span>
          <span class="font-bold text-neutral-900 dark:text-white">{{ currentBusiness.runway }}</span>
        </div>
      </div>

      <!-- Zone 2: 5-Pillar Radar Diagnostic (Col 5) -->
      <div class="lg:col-span-5 bg-white dark:bg-[#15161A] border border-[#EAEAEA] dark:border-[#26272F] rounded-[24px] p-8 shadow-xs flex flex-col justify-between gap-8">
        <div class="flex flex-col gap-4">
          <span class="text-[12px]  font-bold uppercase tracking-wider text-neutral-400 leading-[16px]">
            RADAR 5 ASPEK FUNDAMENTAL
          </span>
          <h3 class=" font-extrabold text-[26px] text-neutral-900 dark:text-white leading-[32px]">
            Indeks Skor: {{ currentBusiness.score }}/100
          </h3>
          <p class="text-[16px] text-neutral-600 dark:text-neutral-400 leading-[24px] ">
            Audit komprehensif mencakup pilar Finansial, Operasional, Pemasaran, Legalitas Izin, dan Manajemen SDM.
          </p>
        </div>

        <div class="py-4 flex justify-center items-center">
          <BRadarChart :items="currentBusiness.radar" :size="240" />
        </div>

        <div class="pt-4 border-t border-[#EAEAEA] dark:border-[#26272F] flex items-center justify-between text-[16px]  font-semibold text-neutral-600 dark:text-neutral-400 leading-[24px]">
          <span>Sektor: <strong class="text-neutral-900 dark:text-white ">{{ currentBusiness.sector }}</strong></span>
          <span class="text-emerald-600 dark:text-emerald-400  font-bold">{{ currentBusiness.grade }}</span>
        </div>
      </div>

      <!-- Zone 3: Zero-Leak Data Room (Col 5) -->
      <div class="lg:col-span-5 bg-white dark:bg-[#15161A] border border-[#EAEAEA] dark:border-[#26272F] rounded-[24px] p-8 shadow-xs flex flex-col justify-between gap-8">
        <div class="flex flex-col gap-4">
          <span class="text-[12px]  font-bold uppercase tracking-wider text-neutral-400 leading-[16px]">
            KEAMANAN TINGKAT INSTITUSI
          </span>
          <h3 class=" font-extrabold text-[26px] text-neutral-900 dark:text-white leading-[32px]">
            Zero-Leak Investor Data Room
          </h3>
          <p class="text-[16px] text-neutral-600 dark:text-neutral-400 leading-[24px] ">
            Kerahasiaan mutlak. Investor hanya melihat rasio efisiensi publik. Rekening giro dan buku kas detail hanya dibuka atas persetujuan pemilik usaha.
          </p>
        </div>

        <!-- Watermarked Security Preview -->
        <div class="p-6 rounded-[16px] bg-[#FAFAFA] dark:bg-[#0F1014] border border-[#EAEAEA] dark:border-[#26272F] flex flex-col gap-4 text-[16px]  leading-[24px]">
          <div class="flex items-center justify-between">
            <span class="text-neutral-500 ">Margin Bersih Usaha:</span>
            <span class="font-bold text-emerald-600 dark:text-emerald-400">{{ currentBusiness.marginRate }} (Tervalidasi)</span>
          </div>
          <div class="flex items-center justify-between">
            <span class="text-neutral-500 ">Laba Riil Bulanan:</span>
            <span class="text-neutral-700 dark:text-neutral-300 font-bold">[TERKUNCI DOKUMEN NDA]</span>
          </div>
          <div class="flex items-center justify-between">
            <span class="text-neutral-500 ">Izin Legal NIB & Halal:</span>
            <span class="text-primary-600 dark:text-primary-400 font-bold">100% TERLAMPIR VALID</span>
          </div>
        </div>

        <div class="flex items-center gap-3 text-[12px] text-neutral-500  leading-[16px]">
          <HugeiconsIcon :icon="LockKeyIcon" :size="16" :stroke-width="2" class="text-primary-500" />
          <span>Setiap unduhan dilindungi enkripsi AES-256 dan watermark investor.</span>
        </div>
      </div>

      <!-- Zone 4: Actionable Checklist Protocol (Col 7) -->
      <div class="lg:col-span-7 bg-white dark:bg-[#15161A] border border-[#EAEAEA] dark:border-[#26272F] rounded-[24px] p-8 shadow-xs flex flex-col justify-between gap-8">
        <div class="flex flex-col gap-4">
          <div class="flex items-center justify-between">
            <span class="text-[12px]  font-bold uppercase tracking-wider text-neutral-400 leading-[16px]">
              PENDAMPINGAN LAPANGAN
            </span>
            <span class="text-[12px]  font-bold text-primary-600 dark:text-primary-400 leading-[16px]">
              PROTOKOL 5/6 TUNTAS
            </span>
          </div>
          <h3 class=" font-extrabold text-[26px] text-neutral-900 dark:text-white leading-[32px]">
            Checklist Rencana Aksi Menuju Funding Gate
          </h3>
          <p class="text-[16px] text-neutral-600 dark:text-neutral-400 leading-[24px]  max-w-xl">
            Bukan sekadar saran teoritis. Konsultan merancang instruksi teknis langkah demi langkah agar usaha lulus uji tuntas kurasi sindikasi pemodal.
          </p>
        </div>

        <div class="flex flex-col gap-4">
          <div class="p-6 rounded-[16px] bg-[#FAFAFA] dark:bg-[#0F1014] border border-[#EAEAEA] dark:border-[#26272F] flex items-center justify-between text-[16px] leading-[24px]">
            <span class=" font-semibold text-neutral-800 dark:text-neutral-200">
              Pemisahan Rekening Usaha dari Rekening Dapur Pribadi
            </span>
            <span class="text-emerald-600 dark:text-emerald-400  font-bold">✓ SELESAI</span>
          </div>
          <div class="p-6 rounded-[16px] bg-[#FAFAFA] dark:bg-[#0F1014] border border-[#EAEAEA] dark:border-[#26272F] flex items-center justify-between text-[16px] leading-[24px]">
            <span class=" font-semibold text-neutral-800 dark:text-neutral-200">
              Penyusunan SOP Kartu Stok & Rasio HPP di Bawah 50%
            </span>
            <span class="text-emerald-600 dark:text-emerald-400  font-bold">✓ SELESAI</span>
          </div>
          <div class="p-6 rounded-[16px] bg-[#FAFAFA] dark:bg-[#0F1014] border border-[#EAEAEA] dark:border-[#26272F] flex items-center justify-between text-[16px] leading-[24px]">
            <span class=" font-semibold text-neutral-800 dark:text-neutral-200">
              Penerbitan Sertifikasi Halal BPJPH & NIB Berbasis Risiko
            </span>
            <span class="text-primary-600 dark:text-primary-400  font-bold">VERIFIKASI AKTIF</span>
          </div>
        </div>
      </div>

    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import BRadarChart from '~/components/base/BRadarChart.vue'
import { HugeiconsIcon } from '@hugeicons/vue'
import { LockKeyIcon } from '@hugeicons/core-free-icons'

const sampleBusinesses = [
  {
    id: 'kopi',
    name: 'Kopi Senja',
    sector: 'F&B (Coffee & Drinks)',
    score: 79,
    grade: 'GRADE A • SIAP MODAL',
    runway: 'Rp 75.5 Juta (3.2 Bulan)',
    marginRate: '32.6%',
    records: [
      { month: 'Juli', omzet: 82500000, costs: 57100000, margin: 30.8 },
      { month: 'Agustus', omzet: 91000000, costs: 62100000, margin: 31.8 },
      { month: 'September', omzet: 100000000, costs: 67400000, margin: 32.6 }
    ],
    radar: [
      { name: 'Finansial', score: 82, maxScore: 100, targetScore: 85 },
      { name: 'Operasional', score: 78, maxScore: 100, targetScore: 80 },
      { name: 'Pemasaran', score: 85, maxScore: 100, targetScore: 75 },
      { name: 'Legalitas', score: 70, maxScore: 100, targetScore: 90 },
      { name: 'SDM & Tim', score: 80, maxScore: 100, targetScore: 80 }
    ]
  },
  {
    id: 'batik',
    name: 'Batik Lestari',
    sector: 'Kriya Tradisional',
    score: 71,
    grade: 'GRADE B • PEMBINAAN',
    runway: 'Rp 38.0 Juta (2.5 Bulan)',
    marginRate: '41.2%',
    records: [
      { month: 'Juli', omzet: 38000000, costs: 22800000, margin: 40.0 },
      { month: 'Agustus', omzet: 42000000, costs: 24780000, margin: 41.0 },
      { month: 'September', omzet: 45000000, costs: 26460000, margin: 41.2 }
    ],
    radar: [
      { name: 'Finansial', score: 68, maxScore: 100, targetScore: 80 },
      { name: 'Operasional', score: 75, maxScore: 100, targetScore: 80 },
      { name: 'Pemasaran', score: 70, maxScore: 100, targetScore: 75 },
      { name: 'Legalitas', score: 88, maxScore: 100, targetScore: 85 },
      { name: 'SDM & Tim', score: 65, maxScore: 100, targetScore: 75 }
    ]
  }
]

const activeBusinessId = ref('kopi')
const currentBusiness = computed(() => sampleBusinesses.find(b => b.id === activeBusinessId.value) || sampleBusinesses[0])
</script>
