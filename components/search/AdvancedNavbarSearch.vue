<template>
  <div ref="searchContainerRef" class="relative w-full font-poppins">
    <!-- ========================================================================================= -->
    <!-- JOINED SEARCH & SECTOR FILTER BAR (Identical to Table Search & Filter Bar Concept)        -->
    <!-- ========================================================================================= -->
    <div
      :class="[
        'relative z-20 w-full h-10 sm:h-11 rounded-[10px] border transition-all flex items-center bg-neutral-50/70 dark:bg-[#1A1A1A] shadow-none',
        isFocused || isResultsOpen
          ? 'bg-white dark:bg-[#13161F] border-[#00800e] dark:border-[#00C058] ring-2 ring-[#00800e]/20'
          : 'border-[#CBD5E1] dark:border-neutral-700'
      ]"
    >
      <!-- Left: Search Icon + Text Input + Clear Button -->
      <div class="relative flex-1 flex items-center min-w-0 h-full">
        <HugeiconsIcon
          :icon="Search01Icon"
          :size="16"
          :stroke-width="1.8"
          :class="[
            'ml-3.5 shrink-0 pointer-events-none transition-colors',
            isFocused || isResultsOpen ? 'text-[#00800e] dark:text-[#00C058]' : 'text-neutral-400 dark:text-neutral-500'
          ]"
        />

        <input
          ref="searchInputRef"
          v-model="investorStore.searchQuery"
          type="text"
          :placeholder="computedPlaceholder"
          class="w-full h-full pl-2.5 pr-2 bg-transparent border-0 text-xs sm:text-sm text-neutral-900 dark:text-white placeholder:text-neutral-400 dark:placeholder:text-neutral-500 focus:outline-none focus:ring-0 font-poppins min-w-0"
          @focus="handleInputFocus"
          @blur="handleInputBlur"
          @keydown.enter="handleEnterKey"
          @keydown.down.prevent="navigateResults(1)"
          @keydown.up.prevent="navigateResults(-1)"
          @keydown.esc="closeAll"
        />

        <!-- Clear Search Button -->
        <button
          v-if="investorStore.searchQuery"
          type="button"
          aria-label="Hapus pencarian"
          class="p-1.5 mr-1 text-neutral-400 hover:text-neutral-700 dark:hover:text-white cursor-pointer shrink-0"
          title="Hapus pencarian"
          @click="investorStore.searchQuery = ''; searchInputRef?.focus()"
        >
          <HugeiconsIcon :icon="Cancel01Icon" :size="14" :stroke-width="2" />
        </button>
      </div>

      <!-- Vertical Divider Line (Identical to Table Filter Bar) -->
      <div class="h-5 w-px bg-neutral-300 dark:bg-neutral-700 shrink-0" aria-hidden="true" />

      <!-- Right: Joined Sector Filter Trigger with Filter Icon -->
      <div class="relative shrink-0 h-full">
        <button
          type="button"
          class="h-full px-3 sm:px-3.5 text-xs font-poppins font-medium text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200/50 dark:hover:bg-neutral-800 transition-colors flex items-center gap-1.5 cursor-pointer whitespace-nowrap rounded-r-[9px]"
          :aria-expanded="isSectorDropdownOpen"
          title="Filter Sektor Usaha"
          @click.stop="toggleSectorDropdown"
        >
          <HugeiconsIcon
            :icon="FilterHorizontalIcon"
            :size="14"
            :stroke-width="2"
            :class="[
              'shrink-0',
              investorStore.selectedSector !== 'ALL'
                ? 'text-[#156374] dark:text-[#50AABF]'
                : 'text-neutral-500 dark:text-neutral-400'
            ]"
          />
          <span class="hidden md:inline truncate max-w-[110px]">{{ activeSectorShortLabel }}</span>
          <HugeiconsIcon
            :icon="ArrowDown01Icon"
            :size="14"
            :stroke-width="2"
            :class="[
              'text-neutral-500 dark:text-neutral-400 transition-transform duration-200 shrink-0',
              isSectorDropdownOpen ? 'rotate-180' : ''
            ]"
          />
        </button>

        <!-- Sector Filter Popover Dropdown (Identical to Table Filter Dropdown) -->
        <div
          v-if="isSectorDropdownOpen"
          class="absolute right-0 top-full mt-1.5 w-52 rounded-[10px] bg-white dark:bg-[#18191E] border border-[#CBD5E1] dark:border-neutral-700 shadow-none p-1.5 z-[80] font-poppins text-sm animate-in fade-in zoom-in-95 duration-150"
          @click.stop
        >
          <div class="space-y-0.5">
            <button
              v-for="sec in sectorOptions"
              :key="sec.id"
              type="button"
              :class="[
                'w-full flex items-center justify-between px-3 py-2 rounded-[8px] text-xs sm:text-sm font-poppins transition-all duration-150 text-left cursor-pointer shadow-none',
                investorStore.selectedSector === sec.id
                  ? 'bg-[#E6F4F7] hover:bg-[#D9EEF3] dark:bg-[#156374]/20 dark:hover:bg-[#156374]/30 text-[#156374] dark:text-[#50AABF] font-semibold border border-[#156374]/20 dark:border-[#50AABF]/25'
                  : 'text-[#475569] dark:text-neutral-300 font-medium hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100/80 dark:hover:bg-neutral-800/60 border border-transparent'
              ]"
              @click="handleSelectSector(sec.id)"
            >
              <span class="truncate">{{ sec.label }}</span>
              <span
                v-if="investorStore.selectedSector === sec.id"
                class="w-1.5 h-1.5 rounded-full bg-[#156374] dark:bg-[#50AABF] shrink-0 ml-2"
              />
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Backdrop Overlay for Outside Click Dismissal -->
    <div
      v-if="isResultsOpen || isSectorDropdownOpen"
      class="fixed inset-0 z-[60] bg-transparent"
      @click="closeAll"
    />

    <!-- ========================================================================================= -->
    <!-- LIVE AUTOCOMPLETE / SEARCH SUGGESTIONS PANEL                                              -->
    <!-- Uncolored items, only UMKM name + sector & city, separated by top stroke only             -->
    <!-- ========================================================================================= -->
    <div
      v-if="isResultsOpen"
      class="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-[#18191E] border border-[#CBD5E1] dark:border-neutral-700 rounded-2xl shadow-none p-3 sm:p-4 z-[70] font-poppins animate-in fade-in zoom-in-95 duration-150"
      @click.stop
    >
      <!-- Results Header -->
      <div class="flex items-center justify-between px-2 pb-2.5">
        <div class="flex items-center gap-1.5 text-xs font-semibold text-neutral-800 dark:text-neutral-200">
          <HugeiconsIcon :icon="Store01Icon" :size="15" class="text-neutral-500 dark:text-neutral-400" />
          <span>{{ liveResultsHeader }}</span>
        </div>
        <span class="text-[11px] text-neutral-400 tabular-nums">
          {{ displayList.length }} Ditemukan
        </span>
      </div>

      <!-- Matching UMKM Items List (Uncolored container, separated by top border stroke only) -->
      <div v-if="displayList.length > 0" class="max-h-72 overflow-y-auto">
        <div
          v-for="(item, idx) in displayList"
          :key="item.id"
          :class="[
            'py-3 px-2 border-t border-[#E2E8F0] dark:border-neutral-800 transition-colors flex items-center gap-3 cursor-pointer bg-transparent',
            highlightedIndex === idx
              ? 'bg-neutral-100/70 dark:bg-neutral-800/60'
              : 'hover:bg-neutral-50 dark:hover:bg-neutral-800/40'
          ]"
          @mouseenter="highlightedIndex = idx"
          @click="selectUmkmResult(item)"
        >
          <!-- Circular Profile Logo -->
          <div class="w-9 h-9 rounded-full bg-amber-400/90 dark:bg-amber-500/90 p-1.5 shrink-0 flex items-center justify-center border border-amber-300/60 overflow-hidden shadow-none">
            <img src="/logo.svg" alt="Logo" class="w-full h-full object-contain rounded-full" />
          </div>

          <!-- Only UMKM Name, Sector (FnB), and City Location -->
          <div class="min-w-0 flex-1">
            <h5 class="font-poppins font-semibold text-xs sm:text-sm text-neutral-900 dark:text-white truncate">
              {{ item.name }}
            </h5>
            <p class="text-[11px] sm:text-xs text-neutral-500 dark:text-neutral-400 truncate mt-0.5">
              {{ item.sector }} • {{ item.city }}
            </p>
          </div>
        </div>
      </div>

      <!-- Empty State inside dropdown -->
      <div v-else class="py-6 border-t border-[#E2E8F0] dark:border-neutral-800 text-center space-y-1.5">
        <p class="text-xs font-semibold text-neutral-700 dark:text-neutral-300">
          Tidak ada usaha yang sesuai kriteria pencarian
        </p>
        <p class="text-[11px] text-neutral-400 max-w-sm mx-auto font-poppins">
          Coba gunakan kata kunci nama usaha, kota, atau ganti pilihan sektor.
        </p>
        <button
          type="button"
          class="mt-2 text-xs font-semibold text-[#156374] dark:text-[#50AABF] hover:underline cursor-pointer"
          @click="resetSearchAndSector"
        >
          Reset Pencarian & Sektor
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, nextTick } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useInvestorStore, type MarketplaceUmkm } from '~/stores/investor'
import { HugeiconsIcon } from '@hugeicons/vue'
import {
  Search01Icon,
  Store01Icon,
  Cancel01Icon,
  FilterHorizontalIcon,
  ArrowDown01Icon
} from '@hugeicons/core-free-icons'

const router = useRouter()
const route = useRoute()
const investorStore = useInvestorStore()

const searchContainerRef = ref<HTMLElement | null>(null)
const searchInputRef = ref<HTMLInputElement | null>(null)

const isFocused = ref(false)
const isResultsOpen = ref(false)
const isSectorDropdownOpen = ref(false)
const highlightedIndex = ref(0)

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
      investorStore.selectedCities.length === 0 ||
      investorStore.selectedCities.some(c => c.toLowerCase() === item.city.toLowerCase())

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

function toggleSectorDropdown() {
  isSectorDropdownOpen.value = !isSectorDropdownOpen.value
  if (isSectorDropdownOpen.value) {
    isResultsOpen.value = false
  }
}

function handleSelectSector(sectorId: string) {
  investorStore.selectedSector = sectorId
  isSectorDropdownOpen.value = false
  if (!route.path.startsWith('/investor')) {
    router.push('/investor')
  }
}

function handleInputFocus() {
  isFocused.value = true
  isResultsOpen.value = true
  isSectorDropdownOpen.value = false
}

function handleInputBlur() {
  isFocused.value = false
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
  isSectorDropdownOpen.value = false
}
</script>
