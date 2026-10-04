<template>
  <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20 space-y-10">
    <!-- Architectural Section Header (Anti-Slop: No generic decorative pill) -->
    <div class="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-neutral-200/80 dark:border-neutral-800">
      <div class="max-w-2xl space-y-2">
        <span class="text-[11px] font-mono font-bold uppercase tracking-wider text-primary-600 dark:text-primary-400 block">
          § 02 // TELEMETRI 5 PILAR
        </span>
        <h2 class="text-2xl sm:text-3xl lg:text-4xl font-heading font-extrabold text-neutral-900 dark:text-white tracking-tight">
          Teknologi Finansial yang Berbicara Bahasa Usaha Nyata
        </h2>
        <p class="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed font-sans">
          Mengubah nota harian dan mutasi rekening menjadi metrik kelayakan investasi yang terverifikasi konsultan resmi BNSP.
        </p>
      </div>

      <!-- Real-Case Business Switcher (Demonstrating Authentic Data instead of Static Mockups) -->
      <div class="flex items-center gap-1.5 p-1 rounded-2xl bg-neutral-100 dark:bg-neutral-800 text-xs font-heading font-semibold self-start md:self-auto shrink-0">
        <button
          v-for="b in sampleBusinesses"
          :key="b.id"
          type="button"
          :class="[
            'px-3.5 py-2 rounded-xl transition-all cursor-pointer',
            activeBusinessId === b.id
              ? 'bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white shadow-xs'
              : 'text-neutral-500 hover:text-neutral-900 dark:hover:text-white'
          ]"
          @click="activeBusinessId = b.id"
        >
          <span>{{ b.name }}</span>
        </button>
      </div>
    </div>

    <!-- Dynamic 2-Zone Bento Grid -->
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
      <!-- Zone 1: Verified Cash Flow Telemetry (Col 7) -->
      <div class="lg:col-span-7 bg-white dark:bg-[#151519] border border-neutral-200/90 dark:border-neutral-800 rounded-3xl p-6 sm:p-8 shadow-xs flex flex-col justify-between space-y-6">
        <div class="space-y-2">
          <div class="flex items-center justify-between">
            <span class="text-[11px] font-mono font-bold uppercase tracking-wider text-neutral-400">
              AUDIT KAS BERKALA // 3 BULAN TERAKHIR
            </span>
            <span class="inline-flex items-center gap-1.5 text-[10px] font-mono font-bold px-2 py-0.5 rounded-md bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
              <span class="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              <span>TERVALIDASI BNSP</span>
            </span>
          </div>
          <h3 class="font-heading font-extrabold text-xl text-neutral-900 dark:text-white">
            Telemetri Arus Kas & Deteksi Efisiensi Bahan Baku
          </h3>
          <p class="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed font-sans max-w-xl">
            Sistem otomatis memantau rasio belanja bahan baku, titik impas (BEP), dan memberi rekomendasi perbaikan sebelum terjadi kebocoran laba.
          </p>
        </div>

        <!-- Verified Cash Ledger Table with Live Dynamic Data -->
        <div class="p-4 sm:p-5 rounded-2xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 space-y-2.5 font-mono text-xs">
          <div class="flex items-center justify-between font-heading font-bold text-neutral-400 pb-2 border-b border-neutral-200 dark:border-neutral-800 text-[11px]">
            <span>Periode</span>
            <span class="text-right">Omzet Usaha</span>
            <span class="text-right">Bahan & Beban</span>
            <span class="text-right">Uang Bersih</span>
          </div>

          <div
            v-for="row in currentBusiness.records"
            :key="row.month"
            class="flex items-center justify-between text-neutral-800 dark:text-neutral-200 py-1"
          >
            <span class="font-medium">{{ row.month }} 2026</span>
            <span class="text-right tabular-nums">Rp {{ (row.omzet).toLocaleString('id-ID') }}</span>
            <span class="text-right tabular-nums text-neutral-400">Rp {{ (row.costs).toLocaleString('id-ID') }}</span>
            <span class="text-right text-emerald-600 dark:text-emerald-400 font-extrabold tabular-nums">
              {{ row.margin }}%
            </span>
          </div>
        </div>

        <div class="pt-2 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-between text-xs font-mono">
          <span class="text-neutral-500 font-sans">Cadangan Kas Operasional:</span>
          <span class="font-bold text-neutral-900 dark:text-white">{{ currentBusiness.runway }}</span>
        </div>
      </div>

      <!-- Zone 2: 5-Pillar Radar Diagnostic (Col 5) -->
      <div class="lg:col-span-5 bg-white dark:bg-[#151519] border border-neutral-200/90 dark:border-neutral-800 rounded-3xl p-6 sm:p-8 shadow-xs flex flex-col justify-between space-y-4">
        <div class="space-y-1">
          <span class="text-[11px] font-mono font-bold uppercase tracking-wider text-neutral-400">
            RADAR 5 ASPEK FUNDAMENTAL
          </span>
          <h3 class="font-heading font-extrabold text-xl text-neutral-900 dark:text-white">
            Indeks Skor: {{ currentBusiness.score }}/100
          </h3>
          <p class="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed font-sans">
            Audit komprehensif mencakup pilar Finansial, Operasional, Pemasaran, Legalitas Izin, dan Manajemen SDM.
          </p>
        </div>

        <div class="py-2 flex justify-center items-center">
          <BRadarChart :items="currentBusiness.radar" :size="210" />
        </div>

        <div class="pt-2 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-between text-xs font-heading font-semibold text-neutral-600 dark:text-neutral-400">
          <span>Sektor: <strong class="text-neutral-900 dark:text-white font-mono">{{ currentBusiness.sector }}</strong></span>
          <span class="text-emerald-600 dark:text-emerald-400 font-mono font-bold">{{ currentBusiness.grade }}</span>
        </div>
      </div>

      <!-- Zone 3: Zero-Leak Data Room (Col 5) -->
      <div class="lg:col-span-5 bg-white dark:bg-[#151519] border border-neutral-200/90 dark:border-neutral-800 rounded-3xl p-6 sm:p-8 shadow-xs flex flex-col justify-between space-y-4">
        <div class="space-y-1">
          <span class="text-[11px] font-mono font-bold uppercase tracking-wider text-neutral-400">
            KEAMANAN TINGKAT INSTITUSI
          </span>
          <h3 class="font-heading font-extrabold text-xl text-neutral-900 dark:text-white">
            Zero-Leak Investor Data Room
          </h3>
          <p class="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed font-sans">
            Kerahasiaan mutlak. Investor hanya melihat rasio efisiensi publik. Rekening giro dan buku kas detail hanya dibuka atas persetujuan pemilik usaha.
          </p>
        </div>

        <!-- Watermarked Security Preview -->
        <div class="p-4 rounded-2xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 space-y-2.5 text-xs font-mono">
          <div class="flex items-center justify-between">
            <span class="text-neutral-500 font-sans">Margin Bersih Usaha:</span>
            <span class="font-bold text-emerald-600 dark:text-emerald-400">{{ currentBusiness.marginRate }} (Tervalidasi)</span>
          </div>
          <div class="flex items-center justify-between">
            <span class="text-neutral-500 font-sans">Laba Riil Bulanan:</span>
            <span class="text-neutral-700 dark:text-neutral-300 font-bold">[TERKUNCI DOKUMEN NDA]</span>
          </div>
          <div class="flex items-center justify-between">
            <span class="text-neutral-500 font-sans">Izin Legal NIB & Halal:</span>
            <span class="text-primary-600 dark:text-primary-400 font-bold">100% TERLAMPIR VALID</span>
          </div>
        </div>

        <div class="flex items-center gap-2 text-xs text-neutral-500 font-sans">
          <HugeiconsIcon :icon="LockKeyIcon" :size="14" :stroke-width="2" class="text-primary-500" />
          <span>Setiap unduhan dilindungi enkripsi AES-256 dan watermark investor.</span>
        </div>
      </div>

      <!-- Zone 4: Actionable Checklist Protocol (Col 7) -->
      <div class="lg:col-span-7 bg-white dark:bg-[#151519] border border-neutral-200/90 dark:border-neutral-800 rounded-3xl p-6 sm:p-8 shadow-xs flex flex-col justify-between space-y-6">
        <div class="space-y-2">
          <div class="flex items-center justify-between">
            <span class="text-[11px] font-mono font-bold uppercase tracking-wider text-neutral-400">
              PENDAMPINGAN LAPANGAN
            </span>
            <span class="text-xs font-mono font-bold text-primary-600 dark:text-primary-400">
              PROTOKOL 5/6 TUNTAS
            </span>
          </div>
          <h3 class="font-heading font-extrabold text-xl text-neutral-900 dark:text-white">
            Checklist Rencana Aksi Menuju Funding Gate
          </h3>
          <p class="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed font-sans max-w-xl">
            Bukan sekadar saran teoritis. Konsultan merancang instruksi teknis langkah demi langkah agar usaha lulus uji tuntas kurasi sindikasi pemodal.
          </p>
        </div>

        <div class="space-y-2.5">
          <div class="p-3.5 rounded-xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200/70 dark:border-neutral-800 flex items-center justify-between text-xs">
            <span class="font-heading font-semibold text-neutral-800 dark:text-neutral-200">
              Pemisahan Rekening Usaha dari Rekening Dapur Pribadi
            </span>
            <span class="text-emerald-600 dark:text-emerald-400 font-mono font-bold">✓ SELESAI</span>
          </div>
          <div class="p-3.5 rounded-xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200/70 dark:border-neutral-800 flex items-center justify-between text-xs">
            <span class="font-heading font-semibold text-neutral-800 dark:text-neutral-200">
              Penyusunan SOP Kartu Stok & Rasio HPP di Bawah 50%
            </span>
            <span class="text-emerald-600 dark:text-emerald-400 font-mono font-bold">✓ SELESAI</span>
          </div>
          <div class="p-3.5 rounded-xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200/70 dark:border-neutral-800 flex items-center justify-between text-xs">
            <span class="font-heading font-semibold text-neutral-800 dark:text-neutral-200">
              Penerbitan Sertifikasi Halal BPJPH & NIB Berbasis Risiko
            </span>
            <span class="text-primary-600 dark:text-primary-400 font-mono font-bold">VERIFIKASI AKTIF</span>
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
    name: 'Kopi Senja Nusantara',
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
    name: 'Batik Lestari Heritage',
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
  },
  {
    id: 'sambal',
    name: 'Sambal Bu Rudy Asli',
    sector: 'FMCG & Oleh-Oleh',
    score: 88,
    grade: 'GRADE A • SIAP MODAL',
    runway: 'Rp 140.0 Juta (4.8 Bulan)',
    marginRate: '38.4%',
    records: [
      { month: 'Juli', omzet: 155000000, costs: 96100000, margin: 38.0 },
      { month: 'Agustus', omzet: 168000000, costs: 103820000, margin: 38.2 },
      { month: 'September', omzet: 180000000, costs: 110880000, margin: 38.4 }
    ],
    radar: [
      { name: 'Finansial', score: 92, maxScore: 100, targetScore: 85 },
      { name: 'Operasional', score: 86, maxScore: 100, targetScore: 80 },
      { name: 'Pemasaran', score: 90, maxScore: 100, targetScore: 80 },
      { name: 'Legalitas', score: 95, maxScore: 100, targetScore: 90 },
      { name: 'SDM & Tim', score: 82, maxScore: 100, targetScore: 80 }
    ]
  }
]

const activeBusinessId = ref('kopi')
const currentBusiness = computed(() => sampleBusinesses.find(b => b.id === activeBusinessId.value) || sampleBusinesses[0])
</script>
