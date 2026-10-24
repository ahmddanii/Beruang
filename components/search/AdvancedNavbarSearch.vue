<template>
  <div ref="searchContainerRef" class="relative w-full">
    <!-- ========================================================================================= -->
    <!-- UNIFIED TACTILE SEARCH BAR (B2B Marketplace & GoPay Tactile Standard)                     -->
    <!-- Search Icon | Clean Text Input | Active Sector Chip | Clear Button | Shortcut Badge        -->
    <!-- ========================================================================================= -->
    <div
      :class="[
        'relative z-20 w-full h-10 sm:h-11 flex items-center rounded-xl transition-all duration-200 border font-poppins px-3 gap-2',
        isFocused || isResultsOpen
          ? 'bg-white dark:bg-[#13161F] border-[#00800e] ring-2 ring-[#00800e]/20 shadow-xs'
          : 'bg-[#F4F7FA] hover:bg-[#EBF1F6] dark:bg-[#18191E] dark:hover:bg-[#1f222b] border-neutral-200/90 dark:border-neutral-700/80 shadow-2xs'
      ]"
    >
      <!-- Search Icon -->
      <HugeiconsIcon
        :icon="Search01Icon"
        :size="16"
        :class="[
          'shrink-0 pointer-events-none transition-colors',
          isFocused || isResultsOpen ? 'text-[#00800e]' : 'text-neutral-400'
        ]"
      />

      <!-- Text Input -->
      <input
        ref="searchInputRef"
        v-model="investorStore.searchQuery"
        type="text"
        :placeholder="computedPlaceholder"
        class="w-full h-full bg-transparent text-xs sm:text-sm text-neutral-900 dark:text-white placeholder:text-neutral-400 focus:outline-none font-poppins min-w-0"
        @focus="handleInputFocus"
        @blur="handleInputBlur"
        @keydown.enter="handleEnterKey"
        @keydown.down.prevent="navigateResults(1)"
        @keydown.up.prevent="navigateResults(-1)"
        @keydown.esc="closeAll"
      />

      <!-- Active Sector Pill if filtered -->
      <span
        v-if="investorStore.selectedSector !== 'ALL'"
        class="inline-flex items-center gap-1 px-2 py-0.5 rounded-lg text-[10px] font-semibold bg-[#E6F4F7] text-[#0f5464] dark:bg-[#183640] dark:text-[#78c7d8] border border-[#2091AA]/20 shrink-0 select-none"
      >
        <span>{{ activeSectorShortLabel }}</span>
        <button
          type="button"
          class="hover:text-red-500 cursor-pointer ml-0.5 text-xs leading-none"
          title="Hapus filter sektor"
          @click.stop="handleSelectSector('ALL')"
        >
          ✕
        </button>
      </span>

      <!-- Right Action Items: Clear & Keyboard Shortcut -->
      <div class="flex items-center gap-1.5 shrink-0">
        <!-- Clear Text & Filter Button -->
        <button
          v-if="investorStore.searchQuery || investorStore.selectedSector !== 'ALL'"
          type="button"
          aria-label="Hapus pencarian dan filter"
          class="w-5 h-5 rounded-md text-neutral-400 hover:text-neutral-700 dark:hover:text-white hover:bg-neutral-200/60 dark:hover:bg-neutral-800 text-xs flex items-center justify-center transition-colors cursor-pointer"
          title="Reset Pencarian & Sektor"
          @click="resetSearchAndSector"
        >
          <HugeiconsIcon :icon="Cancel01Icon" :size="13" />
        </button>

        <!-- Keyboard Shortcut Hint Badge -->
        <kbd
          class="hidden md:inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-mono font-semibold bg-neutral-200/70 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400 border border-neutral-300/80 dark:border-neutral-700 shadow-2xs select-none"
          title="Tekan Ctrl+K atau / untuk mencari"
        >
          Ctrl K
        </kbd>
      </div>
    </div>

    <!-- Backdrop Overlay for Outside Click Dismissal -->
    <div
      v-if="isResultsOpen"
      class="fixed inset-0 z-[60] bg-black/5 dark:bg-black/25 backdrop-blur-2xs transition-opacity"
      @click="closeAll"
    />

    <!-- ========================================================================================= -->
    <!-- LIVE AUTOCOMPLETE / SEARCH SUGGESTIONS PANEL                                              -->
    <!-- Muncul saat input aktif/mengetik, menampilkan saran instan UMKM & filter sektor cepat    -->
    <!-- ========================================================================================= -->
    <div
      v-if="isResultsOpen"
      class="absolute top-full left-0 right-0 mt-2 bg-white/95 dark:bg-[#18191E]/95 backdrop-blur-xl border border-neutral-200/90 dark:border-neutral-700/80 rounded-2xl shadow-2xl p-3 sm:p-4 z-[70] font-poppins animate-in fade-in zoom-in-95 duration-150 space-y-3.5"
      @click.stop
    >
      <!-- Results Header -->
      <div class="flex items-center justify-between px-1 pb-2 border-b border-neutral-100 dark:border-neutral-800">
        <div class="flex items-center gap-1.5 text-xs font-semibold text-neutral-800 dark:text-neutral-200">
          <HugeiconsIcon :icon="Store01Icon" :size="15" class="text-[#00800e] dark:text-[#00C058]" />
          <span>{{ liveResultsHeader }}</span>
        </div>
        <span class="text-[11px] text-neutral-400 tabular-nums">
          {{ displayList.length }} Ditemukan
        </span>
      </div>

      <!-- Quick Category Pills (Instant 1-Click Sector Switching) -->
      <div class="flex items-center gap-1.5 overflow-x-auto scrollbar-none pb-0.5">
        <span class="text-[10px] font-semibold text-neutral-400 uppercase tracking-wider shrink-0 mr-1">
          Sektor:
        </span>
        <button
          v-for="sec in sectorOptions"
          :key="'pills-' + sec.id"
          type="button"
          :class="[
            'px-2.5 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer whitespace-nowrap shrink-0 border',
            investorStore.selectedSector === sec.id
              ? 'bg-[#00800e] text-white border-[#00800e] shadow-2xs'
              : 'bg-neutral-100 hover:bg-neutral-200/70 dark:bg-neutral-800 dark:hover:bg-neutral-700 text-neutral-600 dark:text-neutral-300 border-transparent'
          ]"
          @click="handleSelectSector(sec.id)"
        >
          {{ sec.label }}
        </button>
      </div>

      <!-- Matching UMKM Items List -->
      <div v-if="displayList.length > 0" class="space-y-1.5 max-h-64 overflow-y-auto pr-1">
        <div
          v-for="(item, idx) in displayList"
          :key="item.id"
          :class="[
            'p-2.5 rounded-xl transition-all flex items-center justify-between gap-3 group cursor-pointer border',
            highlightedIndex === idx
              ? 'bg-[#E6F4F7] dark:bg-[#183640] border-[#00800e]/40 shadow-xs'
              : 'bg-neutral-50/70 hover:bg-[#E6F4F7]/60 dark:bg-neutral-800/40 dark:hover:bg-[#183640]/60 border-neutral-200/50 dark:border-neutral-700/50'
          ]"
          @mouseenter="highlightedIndex = idx"
          @click="selectUmkmResult(item)"
        >
          <!-- Left: Logo & UMKM Info -->
          <div class="flex items-center gap-3 min-w-0">
            <div class="w-9 h-9 rounded-xl bg-amber-400 p-1.5 shrink-0 flex items-center justify-center shadow-2xs">
              <img src="/logo.svg" alt="Logo" class="w-full h-full object-contain" />
            </div>

            <div class="min-w-0">
              <div class="flex items-center gap-1.5">
                <h5 class="font-poppins font-semibold text-xs sm:text-sm text-neutral-900 dark:text-white truncate group-hover:text-[#00800e] transition-colors">
                  {{ item.name }}
                </h5>
                <span class="inline-flex items-center gap-1 px-1.5 py-0.2 rounded-full text-[9px] font-semibold bg-emerald-100 text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-300">
                  <HugeiconsIcon :icon="CheckmarkCircle01Icon" :size="10" />
                  <span>Siap Modal</span>
                </span>
              </div>
              <p class="text-[11px] text-neutral-500 dark:text-neutral-400 truncate mt-0.5">
                {{ item.sector }} • {{ item.city }}
              </p>
            </div>
          </div>

          <!-- Right: Key Telemetry Pills & Action Arrow -->
          <div class="flex items-center gap-2 shrink-0">
            <span class="text-xs font-semibold text-emerald-600 dark:text-emerald-400 tabular-nums">
              Untung {{ item.marginPercentage }}%
            </span>
            <span class="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-white dark:bg-neutral-900 text-[#0f5464] dark:text-[#78c7d8] tabular-nums border border-neutral-200 dark:border-neutral-700">
              Skor {{ item.healthScore }}
            </span>
            <HugeiconsIcon
              :icon="ArrowRight01Icon"
              :size="14"
              class="text-neutral-400 group-hover:text-[#00800e] group-hover:translate-x-0.5 transition-all"
            />
          </div>
        </div>
      </div>

      <!-- Empty State inside dropdown -->
      <div v-else class="py-6 text-center space-y-1.5">
        <p class="text-xs font-semibold text-neutral-700 dark:text-neutral-300">
          Tidak ada usaha yang sesuai kriteria pencarian
        </p>
        <p class="text-[11px] text-neutral-400 max-w-sm mx-auto font-sans">
          Coba gunakan kata kunci nama usaha, kota, atau ganti pilihan sektor.
        </p>
        <button
          type="button"
          class="mt-2 text-xs font-semibold text-[#00800e] dark:text-[#00C058] hover:underline cursor-pointer"
          @click="resetSearchAndSector"
        >
          Reset Pencarian & Sektor
        </button>
      </div>

      <!-- Quick Search Keywords (When no query typed yet) -->
      <div v-if="!investorStore.searchQuery" class="pt-2 border-t border-neutral-100 dark:border-neutral-800">
        <div class="flex items-center gap-1.5 flex-wrap">
          <span class="text-[10px] font-semibold text-neutral-400 uppercase tracking-wider">
            Tren Pencarian:
          </span>
          <button
            v-for="keyword in trendingKeywords"
            :key="keyword"
            type="button"
            class="text-[11px] px-2 py-0.5 rounded-lg bg-neutral-100 hover:bg-neutral-200/70 dark:bg-neutral-800 dark:hover:bg-neutral-700 text-neutral-700 dark:text-neutral-300 font-medium transition-colors cursor-pointer"
            @click="quickFillSearch(keyword)"
          >
            {{ keyword }}
          </button>
        </div>
      </div>

      <!-- Footer Bar with Keyboard Hints & Catalog Link -->
      <div class="pt-2 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-between text-[11px] text-neutral-400">
        <div class="hidden sm:flex items-center gap-3">
          <span class="flex items-center gap-1">
            <kbd class="px-1 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 font-mono text-[9px] border border-neutral-200 dark:border-neutral-700">↑↓</kbd>
            <span>Navigasi</span>
          </span>
          <span class="flex items-center gap-1">
            <kbd class="px-1 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 font-mono text-[9px] border border-neutral-200 dark:border-neutral-700">↵</kbd>
            <span>Pilih</span>
          </span>
          <span class="flex items-center gap-1">
            <kbd class="px-1 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 font-mono text-[9px] border border-neutral-200 dark:border-neutral-700">esc</kbd>
            <span>Tutup</span>
          </span>
        </div>

        <button
          type="button"
          class="text-xs font-semibold text-[#00800e] dark:text-[#00C058] hover:underline cursor-pointer ml-auto flex items-center gap-1"
          @click="submitSearchToCatalog"
        >
          <span>Lihat di Katalog Usaha</span>
          <HugeiconsIcon :icon="ArrowRight01Icon" :size="12" />
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, nextTick, onMounted, onUnmounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useInvestorStore, type MarketplaceUmkm } from '~/stores/investor'
import { HugeiconsIcon } from '@hugeicons/vue'
import {
  Search01Icon,
  Store01Icon,
  CheckmarkCircle01Icon,
  Cancel01Icon,
  ArrowRight01Icon
} from '@hugeicons/core-free-icons'

const router = useRouter()
const route = useRoute()
const investorStore = useInvestorStore()

const searchContainerRef = ref<HTMLElement | null>(null)
const searchInputRef = ref<HTMLInputElement | null>(null)

const isFocused = ref(false)
const isResultsOpen = ref(false)
const highlightedIndex = ref(0)

const trendingKeywords = [
  'Kopi Senja',
  'Sambal Bu Rudy',
  'Surabaya',
  'Bandung',
  'Batik Warisan'
]

const sectorOptions = computed(() => {
  const all = investorStore.marketplaceList
  return [
    { id: 'ALL', label: 'Semua Sektor', count: all.length },
    { id: 'F&B', label: 'F&B & Kopi', count: all.filter(m => m.sector.includes('F&B')).length },
    { id: 'FMCG', label: 'Oleh-oleh FMCG', count: all.filter(m => m.sector.includes('FMCG')).length },
    { id: 'Agroindustri', label: 'Agroindustri', count: all.filter(m => m.sector.includes('Agro')).length },
    { id: 'Fashion', label: 'Fashion & Kriya', count: all.filter(m => m.sector.includes('Fashion')).length }
  ]
})

const activeSectorLabel = computed(() => {
  const sec = sectorOptions.value.find(s => s.id === investorStore.selectedSector)
  return sec ? sec.label : 'Semua Sektor'
})

const activeSectorShortLabel = computed(() => {
  if (investorStore.selectedSector === 'ALL') return 'Semua Sektor'
  const sec = sectorOptions.value.find(s => s.id === investorStore.selectedSector)
  return sec ? sec.label : 'Sektor'
})

const computedPlaceholder = computed(() => {
  if (investorStore.selectedSector !== 'ALL') {
    return `Cari di sektor ${activeSectorLabel.value}...`
  }
  return 'Cari nama usaha, produk, sektor, atau kota...'
})

const displayList = computed(() => {
  return investorStore.marketplaceList.filter(item => {
    const q = investorStore.searchQuery.toLowerCase().trim()
    const matchSearch =
      q === '' ||
      item.name.toLowerCase().includes(q) ||
      item.sector.toLowerCase().includes(q) ||
      item.city.toLowerCase().includes(q) ||
      item.pitchSummary.toLowerCase().includes(q)

    const matchSector =
      investorStore.selectedSector === 'ALL' ||
      item.sector.toLowerCase().includes(investorStore.selectedSector.toLowerCase())

    const matchCity =
      investorStore.selectedCity === 'ALL' ||
      item.city.toLowerCase() === investorStore.selectedCity.toLowerCase()

    const matchMargin = item.marginPercentage >= (investorStore.minMargin || 0)

    return matchSearch && matchSector && matchCity && matchMargin
  }).slice(0, 5)
})

const liveResultsHeader = computed(() => {
  if (investorStore.searchQuery) {
    return `Hasil untuk "${investorStore.searchQuery}"`
  }
  if (investorStore.selectedSector !== 'ALL') {
    return `Usaha di Sektor ${activeSectorLabel.value}`
  }
  return 'Rekomendasi Usaha Terverifikasi'
})

function handleSelectSector(sectorId: string) {
  investorStore.selectedSector = sectorId
  // Arahkan ke katalog jika belum di halaman investor
  if (!route.path.startsWith('/investor')) {
    router.push('/investor')
  }
}

function handleInputFocus() {
  isFocused.value = true
  isResultsOpen.value = true
}

function handleInputBlur() {
  isFocused.value = false
}

function quickFillSearch(keyword: string) {
  investorStore.searchQuery = keyword
  searchInputRef.value?.focus()
  if (!route.path.startsWith('/investor')) {
    router.push('/investor')
  }
}

function handleEnterKey() {
  if (displayList.value.length > 0 && highlightedIndex.value >= 0 && highlightedIndex.value < displayList.value.length) {
    selectUmkmResult(displayList.value[highlightedIndex.value])
  } else {
    submitSearchToCatalog()
  }
}

function submitSearchToCatalog() {
  closeAll()
  if (!route.path.startsWith('/investor')) {
    router.push('/investor')
  }
}

function selectUmkmResult(item: MarketplaceUmkm) {
  closeAll()
  if (route.path === '/investor') {
    investorStore.searchQuery = item.name
    nextTick(() => {
      const el = document.getElementById('umkm-card-' + item.id)
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' })
        el.classList.add('ring-2', 'ring-[#00800e]', 'transition-all')
        setTimeout(() => {
          el.classList.remove('ring-2', 'ring-[#00800e]')
        }, 2000)
      }
    })
  } else {
    router.push(`/investor/umkm/${item.id}`)
  }
}

function navigateResults(delta: number) {
  if (!isResultsOpen.value) {
    isResultsOpen.value = true
    return
  }
  const len = displayList.value.length
  if (len === 0) return
  highlightedIndex.value = (highlightedIndex.value + delta + len) % len
}

function resetSearchAndSector() {
  investorStore.searchQuery = ''
  investorStore.selectedSector = 'ALL'
  searchInputRef.value?.focus()
}

function closeAll() {
  isResultsOpen.value = false
}

function handleGlobalKeydown(e: KeyboardEvent) {
  // Shortcut Ctrl+K / Cmd+K / Slash to focus search
  if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
    e.preventDefault()
    searchInputRef.value?.focus()
    isResultsOpen.value = true
  }
  if (e.key === '/' && document.activeElement !== searchInputRef.value && !(document.activeElement instanceof HTMLInputElement || document.activeElement instanceof HTMLTextAreaElement)) {
    e.preventDefault()
    searchInputRef.value?.focus()
    isResultsOpen.value = true
  }
}

onMounted(() => {
  if (import.meta.client) {
    window.addEventListener('keydown', handleGlobalKeydown)
  }
})

onUnmounted(() => {
  if (import.meta.client) {
    window.removeEventListener('keydown', handleGlobalKeydown)
  }
})
</script>
