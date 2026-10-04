<template>
  <div class="space-y-8 pb-20 font-sans">
    <!-- 1. EXECUTIVE INVESTOR MARKETPLACE HEADER (Double-Bezel Hardware Architecture) -->
    <div class="p-1.5 sm:p-2 rounded-[2.25rem] bg-neutral-200/50 dark:bg-neutral-800/40 border border-neutral-300/40 dark:border-neutral-700/30 shadow-xs">
      <div class="p-6 sm:p-8 lg:p-10 rounded-[calc(2.25rem-0.5rem)] bg-white dark:bg-[#141519] border border-neutral-200/80 dark:border-neutral-800/90 shadow-[inset_0_1px_1px_rgba(255,255,255,0.9)] dark:shadow-[inset_0_1px_1px_rgba(255,255,255,0.06)] flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative overflow-hidden">
        <div class="space-y-3 max-w-2xl relative z-10">
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-50 dark:bg-primary-950/60 text-primary-700 dark:text-primary-300 border border-primary-200 dark:border-primary-800 text-[10px] font-mono font-extrabold uppercase tracking-[0.15em]">
            <span class="w-1.5 h-1.5 rounded-full bg-primary-500 animate-pulse" />
            <span>KATALOG SINDIKASI TERAKREDITASI • 100% AUDIT BNSP</span>
          </div>

          <h1 class="text-3xl sm:text-4xl font-heading font-extrabold text-neutral-900 dark:text-white tracking-[-0.03em] leading-tight text-balance">
            Marketplace UMKM Siap Pendanaan
          </h1>

          <p class="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed font-sans max-w-xl">
            Eksplorasi portofolio bisnis riil dengan margin sehat di atas 30%, rekam jejak arus kas bersih terverifikasi konsultan resmi, dan akreditasi <strong class="text-neutral-900 dark:text-white">Ready for Funding</strong>.
          </p>
        </div>

        <div class="flex flex-wrap items-center gap-3 shrink-0">
          <NuxtLink
            to="/investor/watchlist"
            class="group pl-5 pr-2 py-2 rounded-full font-heading font-bold text-xs border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-900 hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-800 dark:text-neutral-200 shadow-xs transition-all duration-300 active:scale-[0.98] inline-flex items-center gap-3"
          >
            <span>Portofolio Simpanan</span>
            <span class="w-8 h-8 rounded-full bg-neutral-200/70 dark:bg-neutral-800 flex items-center justify-center font-mono text-[11px] font-extrabold text-primary-600 dark:text-primary-400 transition-transform duration-300 group-hover:scale-105">
              {{ investorStore.watchlist.length }}
            </span>
          </NuxtLink>
        </div>
      </div>
    </div>

    <!-- 2. INTERACTIVE ROI & DIVIDEND CALCULATOR (Double-Bezel Hardware Architecture) -->
    <div class="p-1.5 sm:p-2 rounded-[2.25rem] bg-neutral-200/50 dark:bg-neutral-800/40 border border-neutral-300/40 dark:border-neutral-700/30 shadow-xs">
      <div class="p-6 sm:p-8 lg:p-10 rounded-[calc(2.25rem-0.5rem)] bg-white dark:bg-[#141519] border border-neutral-200/80 dark:border-neutral-800/90 shadow-[inset_0_1px_1px_rgba(255,255,255,0.9)] dark:shadow-[inset_0_1px_1px_rgba(255,255,255,0.06)] space-y-6">
        <div class="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-neutral-100 dark:border-neutral-800">
          <div>
            <span class="text-[10px] font-mono font-extrabold uppercase tracking-[0.2em] text-primary-600 dark:text-primary-400 block">
              § 01 // SIMULATOR SINDIKASI MODAL
            </span>
            <h2 class="text-2xl sm:text-3xl font-heading font-extrabold text-neutral-900 dark:text-white tracking-tight mt-1">
              Simulasi Imbal Hasil Investasi & Payback Period
            </h2>
            <p class="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5 font-sans">
              Perkirakan bagi hasil bulanan riil dari portofolio UMKM Grade A terverifikasi.
            </p>
          </div>

          <div class="text-left sm:text-right shrink-0">
            <span class="text-[10px] uppercase font-mono tracking-wider text-neutral-400 block">Tiket Investasi Terpilih</span>
            <span class="text-2xl sm:text-3xl font-heading font-extrabold text-primary-600 dark:text-primary-400 font-mono tabular-nums block mt-0.5">
              Rp {{ (investmentTicket).toLocaleString('id-ID') }}
            </span>
          </div>
        </div>

        <!-- Concentric Range Slider Track -->
        <div class="space-y-2 pt-1">
          <input
            v-model.number="investmentTicket"
            type="range"
            min="25000000"
            max="250000000"
            step="5000000"
            class="w-full h-2.5 bg-neutral-200 dark:bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-primary-500"
          />
          <div class="flex justify-between text-[10px] font-mono text-neutral-400 font-bold">
            <span>Rp 25 Jt (Mikro)</span>
            <span>Rp 100 Jt (Standar Angel)</span>
            <span>Rp 250 Jt (Sindikasi Penuh)</span>
          </div>
        </div>

        <!-- 4 Live Output Telemetry Tiles -->
        <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 font-mono">
          <div class="p-4 sm:p-5 rounded-2xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200/70 dark:border-neutral-800 space-y-1">
            <span class="text-[10px] text-neutral-400 block font-heading uppercase font-semibold">Bagi Hasil / Bulan</span>
            <span class="text-xl sm:text-2xl font-heading font-extrabold text-emerald-600 dark:text-emerald-400 tabular-nums block">
              Rp {{ (Math.round((investmentTicket * 0.14) / 12)).toLocaleString('id-ID') }}
            </span>
            <span class="text-[10px] text-neutral-500 block font-mono">Rata-rata 14% p.a.</span>
          </div>

          <div class="p-4 sm:p-5 rounded-2xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200/70 dark:border-neutral-800 space-y-1">
            <span class="text-[10px] text-neutral-400 block font-heading uppercase font-semibold">Balik Modal (BEP)</span>
            <span class="text-xl sm:text-2xl font-heading font-extrabold text-neutral-900 dark:text-white tabular-nums block">
              17.5 Bulan
            </span>
            <span class="text-[10px] text-emerald-600 dark:text-emerald-400 block font-semibold font-mono">● Arus Kas Positif</span>
          </div>

          <div class="p-4 sm:p-5 rounded-2xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200/70 dark:border-neutral-800 space-y-1">
            <span class="text-[10px] text-neutral-400 block font-heading uppercase font-semibold">Proyeksi IRR</span>
            <span class="text-xl sm:text-2xl font-heading font-extrabold text-primary-500 tabular-nums block">
              28.4%
            </span>
            <span class="text-[10px] text-neutral-500 block font-mono">Tingkat Pengembalian</span>
          </div>

          <div class="p-4 sm:p-5 rounded-2xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200/70 dark:border-neutral-800 space-y-1">
            <span class="text-[10px] text-neutral-400 block font-heading uppercase font-semibold">Jaminan Audit</span>
            <span class="text-xl sm:text-2xl font-heading font-extrabold text-neutral-900 dark:text-white tabular-nums block">
              100%
            </span>
            <span class="text-[10px] text-emerald-600 dark:text-emerald-400 block font-semibold font-mono">● Lisensi BNSP Resmi</span>
          </div>
        </div>
      </div>
    </div>

    <!-- 3. MARKETPLACE EXPLORER (Double-Bezel Hardware Architecture) -->
    <div class="p-1.5 sm:p-2 rounded-[2.25rem] bg-neutral-200/50 dark:bg-neutral-800/40 border border-neutral-300/40 dark:border-neutral-700/30 shadow-xs">
      <div class="p-6 sm:p-8 lg:p-10 rounded-[calc(2.25rem-0.5rem)] bg-white dark:bg-[#141519] border border-neutral-200/80 dark:border-neutral-800/90 shadow-[inset_0_1px_1px_rgba(255,255,255,0.9)] dark:shadow-[inset_0_1px_1px_rgba(255,255,255,0.06)] space-y-6">
        <div class="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4 border-b border-neutral-100 dark:border-neutral-800">
          <div>
            <span class="text-[10px] font-mono font-extrabold uppercase tracking-[0.2em] text-primary-600 dark:text-primary-400 block">
              § 02 // DEAL FLOW UMKM TERKURASI
            </span>
            <h2 class="text-2xl sm:text-3xl font-heading font-extrabold text-neutral-900 dark:text-white tracking-tight mt-1">
              Portofolio Bisnis Terverifikasi
            </h2>
            <p class="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5 font-sans">
              Menampilkan <strong class="text-neutral-900 dark:text-white font-mono">{{ displayMarketplace.length }}</strong> UMKM Grade A yang lulus uji tuntas 5 pilar.
            </p>
          </div>

          <!-- Search & Filter Controls -->
          <div class="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <!-- Category Pills -->
            <div class="inline-flex p-1 rounded-full bg-neutral-100 dark:bg-neutral-800 text-xs font-heading font-semibold shrink-0 overflow-x-auto">
              <button
                v-for="cat in categoryFilters"
                :key="cat"
                type="button"
                :class="[
                  'px-3.5 py-1.5 rounded-full transition-all cursor-pointer text-xs whitespace-nowrap',
                  selectedCategory === cat
                    ? 'bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white shadow-xs'
                    : 'text-neutral-500 hover:text-neutral-900 dark:hover:text-white'
                ]"
                @click="selectedCategory = cat"
              >
                {{ cat }}
              </button>
            </div>

            <!-- Search Field -->
            <div class="relative w-full sm:w-64">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-neutral-400">
                <HugeiconsIcon :icon="Search01Icon" :size="15" :stroke-width="1.75" />
              </div>
              <input
                v-model="investorStore.searchQuery"
                type="text"
                placeholder="Cari bisnis / kota..."
                class="w-full pl-9 pr-3.5 py-1.5 rounded-full text-xs border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-900 text-neutral-900 dark:text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
              />
            </div>
          </div>
        </div>

        <!-- Marketplace Cards Grid (Double-Bezel Enclosed) -->
        <div
          v-if="displayMarketplace.length > 0"
          class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <div
            v-for="item in displayMarketplace"
            :key="item.id"
            class="p-1 rounded-3xl bg-neutral-100 dark:bg-neutral-800/60 border border-neutral-200/80 dark:border-neutral-700/50 hover:border-neutral-300 dark:hover:border-neutral-600 transition-colors flex flex-col justify-between"
          >
            <div class="p-6 rounded-[calc(1.5rem-0.25rem)] bg-white dark:bg-[#18191e] h-full flex flex-col justify-between space-y-5">
              <div class="space-y-4">
                <!-- Card Top Row: Code Pill, Badge & Bookmark -->
                <div class="flex items-start justify-between gap-2">
                  <div class="flex flex-wrap items-center gap-1.5">
                    <span class="text-[10px] font-mono font-bold px-2 py-0.5 rounded-md bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 border border-neutral-200 dark:border-neutral-700">
                      {{ item.code }}
                    </span>
                    <span class="inline-flex items-center gap-1 text-[10px] font-mono font-extrabold px-2 py-0.5 rounded-md bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                      <HugeiconsIcon :icon="CheckmarkCircle01Icon" :size="11" :stroke-width="2" />
                      <span>AUDIT BNSP</span>
                    </span>
                  </div>

                  <!-- Bookmark Button -->
                  <button
                    type="button"
                    :class="[
                      'p-1.5 rounded-xl transition-colors cursor-pointer',
                      item.bookmarked
                        ? 'bg-amber-100 text-amber-600 dark:bg-amber-950 dark:text-amber-300'
                        : 'text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200 bg-neutral-50 dark:bg-neutral-800'
                    ]"
                    :title="item.bookmarked ? 'Hapus Simpanan' : 'Simpan Usaha'"
                    @click="investorStore.toggleBookmark(item.id)"
                  >
                    <HugeiconsIcon :icon="Bookmark01Icon" :size="15" :stroke-width="1.75" />
                  </button>
                </div>

                <!-- Business Info -->
                <div>
                  <h3 class="font-heading font-extrabold text-xl text-neutral-900 dark:text-white leading-tight">
                    {{ item.name }}
                  </h3>
                  <p class="text-xs text-neutral-500 dark:text-neutral-400 mt-1 flex items-center gap-2 font-sans">
                    <span>{{ item.sector }}</span>
                    <span>•</span>
                    <span>{{ item.city }}</span>
                    <span>•</span>
                    <span class="font-mono">Est. {{ item.establishedYear }}</span>
                  </p>
                </div>

                <!-- Pitch Summary -->
                <p class="text-xs text-neutral-600 dark:text-neutral-300 line-clamp-2 leading-relaxed font-sans">
                  "{{ item.pitchSummary }}"
                </p>

                <!-- Key Metrics Grid -->
                <div class="grid grid-cols-3 gap-2 text-center p-3 rounded-2xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200/60 dark:border-neutral-800 font-mono">
                  <div>
                    <span class="text-[10px] text-neutral-400 block font-heading uppercase font-semibold">Tiket Modal</span>
                    <span class="text-xs font-extrabold text-neutral-900 dark:text-white tabular-nums">
                      Rp {{ (item.fundingTarget / 1000000) }} Jt
                    </span>
                  </div>
                  <div>
                    <span class="text-[10px] text-neutral-400 block font-heading uppercase font-semibold">Margin Kotor</span>
                    <span class="text-xs font-extrabold text-emerald-600 dark:text-emerald-400 tabular-nums">
                      {{ item.marginPercentage }}%
                    </span>
                  </div>
                  <div>
                    <span class="text-[10px] text-neutral-400 block font-heading uppercase font-semibold">Skor Audit</span>
                    <span class="text-xs font-extrabold text-primary-500 tabular-nums">
                      {{ item.healthScore }}/100
                    </span>
                  </div>
                </div>
              </div>

              <!-- Footer Actions (Button-in-Button) -->
              <div class="pt-3 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-between">
                <span class="text-[11px] text-neutral-400 font-mono">
                  Audit: {{ item.consultantName }}
                </span>

                <button
                  type="button"
                  class="group pl-3.5 pr-1.5 py-1.5 rounded-full text-xs font-heading font-bold bg-primary-500 hover:bg-primary-600 text-white transition-all duration-300 active:scale-[0.98] shadow-xs cursor-pointer inline-flex items-center gap-2"
                  @click="openDataRoomModal(item)"
                >
                  <span>Buka Data Room</span>
                  <span class="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center transition-transform duration-300 group-hover:translate-x-0.5">
                    <HugeiconsIcon :icon="ArrowRight01Icon" :size="12" :stroke-width="2" />
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- DATA ROOM ACCESS MODAL (Double-Bezel Architecture) -->
    <div
      v-if="selectedBusinessForModal"
      class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-950/60 backdrop-blur-xs animate-in fade-in duration-150"
    >
      <div class="p-1.5 sm:p-2 rounded-[2.25rem] bg-neutral-200/50 dark:bg-neutral-800/60 border border-neutral-300/40 dark:border-neutral-700/40 shadow-2xl max-w-lg w-full">
        <div class="p-6 sm:p-8 rounded-[calc(2.25rem-0.5rem)] bg-white dark:bg-[#141519] border border-neutral-200/80 dark:border-neutral-800 space-y-5">
          <div class="flex items-center justify-between">
            <div>
              <span class="text-[10px] font-mono px-2 py-0.5 rounded-md bg-neutral-100 dark:bg-neutral-800 text-neutral-500 font-bold">
                {{ selectedBusinessForModal.code }}
              </span>
              <h3 class="font-heading font-extrabold text-xl text-neutral-900 dark:text-white mt-1">
                Data Room: {{ selectedBusinessForModal.name }}
              </h3>
            </div>
            <button
              type="button"
              class="text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200 text-xs font-mono px-2 py-1 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 cursor-pointer"
              @click="selectedBusinessForModal = null"
            >
              ✕ Tutup
            </button>
          </div>

          <div class="p-4 rounded-2xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200/70 dark:border-neutral-800 space-y-2 text-xs font-mono">
            <div class="flex justify-between">
              <span class="text-neutral-500 font-sans">Target Pendanaan:</span>
              <strong class="text-neutral-900 dark:text-white">Rp {{ selectedBusinessForModal.fundingTarget.toLocaleString('id-ID') }}</strong>
            </div>
            <div class="flex justify-between">
              <span class="text-neutral-500 font-sans">Margin Usaha:</span>
              <span class="text-emerald-600 font-bold">{{ selectedBusinessForModal.marginPercentage }}%</span>
            </div>
            <div class="flex justify-between">
              <span class="text-neutral-500 font-sans">Konsultan BNSP:</span>
              <span class="text-neutral-800 dark:text-neutral-200 font-sans">{{ selectedBusinessForModal.consultantName }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-neutral-500 font-sans">Pemisahan Rekening Usaha:</span>
              <span class="text-emerald-600 font-bold font-sans">100% Terverifikasi</span>
            </div>
          </div>

          <p class="text-xs text-neutral-600 dark:text-neutral-300 leading-relaxed font-sans">
            Permintaan akses ke data room keuangan lengkap (rekonsiliasi bank 5 bulan, SOP operasional, dan NIB RBA) akan langsung dikirimkan ke pemilik usaha.
          </p>

          <div class="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              class="px-4 py-2 rounded-full text-xs font-heading font-semibold text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800 cursor-pointer transition-colors"
              @click="selectedBusinessForModal = null"
            >
              Batal
            </button>
            <button
              type="button"
              class="group pl-5 pr-2 py-2 rounded-full text-xs font-heading font-bold bg-primary-500 hover:bg-primary-600 text-white cursor-pointer transition-all duration-300 active:scale-[0.98] shadow-xs inline-flex items-center gap-2.5"
              @click="confirmDataRoomRequest"
            >
              <span>Ajukan Minat Investasi Sindikasi</span>
              <span class="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center transition-transform duration-300 group-hover:translate-x-0.5">
                <HugeiconsIcon :icon="ArrowRight01Icon" :size="12" :stroke-width="2" />
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useInvestorStore } from '~/stores/investor'
import type { MarketplaceUmkm } from '~/stores/investor'
import { HugeiconsIcon } from '@hugeicons/vue'
import {
  Bookmark01Icon,
  Search01Icon,
  CheckmarkCircle01Icon,
  ArrowRight01Icon
} from '@hugeicons/core-free-icons'

definePageMeta({
  layout: 'dashboard'
})

const investorStore = useInvestorStore()

// Interactive ROI Simulator
const investmentTicket = ref(100000000)

const categoryFilters = ['Semua Sektor', 'F&B & Kopi', 'Oleh-oleh / FMCG', 'Agroindustri', 'Fashion & Kriya']
const selectedCategory = ref('Semua Sektor')

const selectedBusinessForModal = ref<MarketplaceUmkm | null>(null)

function openDataRoomModal(item: MarketplaceUmkm) {
  selectedBusinessForModal.value = item
}

function confirmDataRoomRequest() {
  alert('Permintaan akses data room telah dikirim ke pemilik usaha ' + selectedBusinessForModal.value?.name)
  selectedBusinessForModal.value = null
}

const displayMarketplace = computed(() => {
  return investorStore.marketplaceList.filter(item => {
    const matchSearch = investorStore.searchQuery === '' ||
      item.name.toLowerCase().includes(investorStore.searchQuery.toLowerCase()) ||
      item.sector.toLowerCase().includes(investorStore.searchQuery.toLowerCase()) ||
      item.city.toLowerCase().includes(investorStore.searchQuery.toLowerCase())

    const matchCategory = selectedCategory.value === 'Semua Sektor' ||
      (selectedCategory.value === 'F&B & Kopi' && item.sector.includes('F&B')) ||
      (selectedCategory.value === 'Oleh-oleh / FMCG' && item.sector.includes('FMCG')) ||
      (selectedCategory.value === 'Agroindustri' && item.sector.includes('Agro')) ||
      (selectedCategory.value === 'Fashion & Kriya' && item.sector.includes('Fashion'))

    return matchSearch && matchCategory
  })
})
</script>
