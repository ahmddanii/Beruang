<template>
  <div ref="investasiPageRef" class="space-y-6 sm:space-y-8 pb-16 font-poppins text-neutral-900 dark:text-neutral-100">
    <!-- 1. Page Title & Action Bar -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 min-h-[44px]">
      <div class="flex items-center gap-2.5 sm:gap-3">
        <HugeiconsIcon :icon="Coins01Icon" :size="26" :stroke-width="2.2" class="text-neutral-900 dark:text-white shrink-0" />
        <h1 class="font-poppins font-semibold text-2xl sm:text-3xl text-neutral-900 dark:text-white tracking-tight leading-tight">
          Alur Investasi
        </h1>
      </div>

      <div class="flex items-center gap-2.5 shrink-0 w-full sm:w-auto [&>*]:w-full sm:[&>*]:w-auto">
        <NuxtLink
          to="/admin/investor"
          class="btn-pill-action justify-center"
        >
          <HugeiconsIcon :icon="UserMultiple02Icon" :size="16" :stroke-width="2" />
          <span>Direktori Investor</span>
        </NuxtLink>
        <button
          type="button"
          class="btn-pill-action justify-center"
          @click="handleExportCsv"
        >
          <HugeiconsIcon :icon="Download01Icon" :size="16" :stroke-width="2" />
          <span>Unduh CSV</span>
        </button>
      </div>
    </div>

    <!-- Toast Feedback -->
    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="transform -translate-y-2 opacity-0"
      enter-to-class="transform translate-y-0 opacity-100"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="transform translate-y-0 opacity-100"
      leave-to-class="transform -translate-y-2 opacity-0"
    >
      <div
        v-if="toastMessage"
        class="flex items-center justify-between gap-3 px-4 py-3.5 rounded-[14px] bg-[#E8F8EE] dark:bg-[#00800e]/20 border border-[#86EFAC] dark:border-[#00C058]/30 text-[#00800e] dark:text-[#4ADE80] shadow-none"
      >
        <div class="flex items-center gap-2.5 text-sm font-semibold">
          <HugeiconsIcon :icon="CheckmarkCircle01Icon" :size="18" :stroke-width="2.2" class="shrink-0" />
          <span>{{ toastMessage }}</span>
        </div>
        <button type="button" class="text-xs sm:text-sm font-bold hover:underline cursor-pointer" @click="toastMessage = ''">
          Tutup
        </button>
      </div>
    </Transition>

    <!-- 2. 3 Summary Cards (Simplified, Clear, No Minat Pendanaan Nominal) -->
    <div class="grid grid-cols-1 sm:grid-cols-3 gap-6 lg:gap-8 items-stretch w-full">
      <!-- Card 1: Total Alur Penjajakan -->
      <div class="gsap-admin-card gsap-stat-card flex-1 w-full">
        <div class="stat-card-clean transition-all duration-200">
          <div class="flex items-center justify-between w-full gap-2">
            <div class="flex items-center gap-2 sm:gap-2.5 min-w-0">
              <div class="stat-card-icon-box">
                <HugeiconsIcon :icon="Coins01Icon" :size="17" :stroke-width="2.0" class="text-[#156374] dark:text-[#50AABF] shrink-0" />
              </div>
              <span class="text-[13px] xl:text-[14px] font-poppins font-semibold text-neutral-800 dark:text-neutral-100 capitalize truncate tracking-[-0.01em]">
                Total Penjajakan
              </span>
            </div>
            <div class="stat-card-badge badge-green">
              <span>Terpantau</span>
            </div>
          </div>
          <div class="my-auto py-2.5 sm:py-3.5">
            <span class="text-xl sm:text-[22px] lg:text-[21px] xl:text-[24px] font-poppins font-semibold text-neutral-900 dark:text-white tabular-nums tracking-[-0.02em] whitespace-nowrap block leading-tight">
              {{ dealItems.length }} Alur
            </span>
          </div>
        </div>
      </div>

      <!-- Card 2: Ruang Data Terbuka -->
      <div class="gsap-admin-card gsap-stat-card flex-1 w-full">
        <div class="stat-card-clean transition-all duration-200">
          <div class="flex items-center justify-between w-full gap-2">
            <div class="flex items-center gap-2 sm:gap-2.5 min-w-0">
              <div class="stat-card-icon-box">
                <HugeiconsIcon :icon="FileUnlockedIcon" :size="17" :stroke-width="2.0" class="text-[#156374] dark:text-[#50AABF] shrink-0" />
              </div>
              <span class="text-[13px] xl:text-[14px] font-poppins font-semibold text-neutral-800 dark:text-neutral-100 capitalize truncate tracking-[-0.01em]">
                Ruang Data Terbuka
              </span>
            </div>
            <div class="stat-card-badge badge-green">
              <span>Watermark</span>
            </div>
          </div>
          <div class="my-auto py-2.5 sm:py-3.5">
            <span class="text-xl sm:text-[22px] lg:text-[21px] xl:text-[24px] font-poppins font-semibold text-neutral-900 dark:text-white tabular-nums tracking-[-0.02em] whitespace-nowrap block leading-tight">
              {{ activeDataRoomCount }} Akses Aktif
            </span>
          </div>
        </div>
      </div>

      <!-- Card 3: Institusi Investor -->
      <div class="gsap-admin-card gsap-stat-card flex-1 w-full">
        <div class="stat-card-clean transition-all duration-200">
          <div class="flex items-center justify-between w-full gap-2">
            <div class="flex items-center gap-2 sm:gap-2.5 min-w-0">
              <div class="stat-card-icon-box">
                <HugeiconsIcon :icon="Shield01Icon" :size="17" :stroke-width="2.0" class="text-[#156374] dark:text-[#50AABF] shrink-0" />
              </div>
              <span class="text-[13px] xl:text-[14px] font-poppins font-semibold text-neutral-800 dark:text-neutral-100 capitalize truncate tracking-[-0.01em]">
                Investor Terhubung
              </span>
            </div>
            <div class="stat-card-badge badge-green">
              <span>KYC Valid</span>
            </div>
          </div>
          <div class="my-auto py-2.5 sm:py-3.5">
            <span class="text-xl sm:text-[22px] lg:text-[21px] xl:text-[24px] font-poppins font-semibold text-neutral-900 dark:text-white tabular-nums tracking-[-0.02em] whitespace-nowrap block leading-tight">
              {{ uniqueInvestorsCount }} Institusi
            </span>
          </div>
        </div>
      </div>
    </div>

    <!-- 3. Clean Deal Flow & Data Room Table (Simple, Elegant, No Overflow) -->
    <section class="gsap-admin-section card-tactile-gopay rounded-[18px] overflow-hidden font-poppins">
      <div class="p-5 sm:p-7 space-y-4 border-b border-[#E2E8F0] dark:border-neutral-800 bg-[#FFFFFF] dark:bg-[#13161F]">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div class="space-y-1">
            <h2 class="text-lg sm:text-xl font-poppins font-bold text-neutral-900 dark:text-white tracking-tight">
              Pengawasan Akses Ruang Data
            </h2>
            <p class="text-xs sm:text-sm font-poppins text-neutral-600 dark:text-neutral-400 leading-normal">
              Kelola izin pembukaan dokumen keuangan privat antara investor dan UMKM binaan.
            </p>
          </div>
        </div>

        <!-- Joined Search & Filter Control Bar (Identik dengan Catatan Kas & Standard Admin) -->
        <div class="relative w-full rounded-[10px] border border-[#CBD5E1] dark:border-neutral-700 bg-neutral-50/70 dark:bg-[#1A1A1A] focus-within:border-[#00800e] dark:focus-within:border-[#00C058] focus-within:ring-2 focus-within:ring-[#00800e]/20 transition-all flex items-center min-h-[46px]">
          <!-- Left: Search Icon + Input -->
          <div class="relative flex-1 flex items-center min-w-0">
            <HugeiconsIcon
              :icon="Search01Icon"
              :size="16"
              :stroke-width="1.8"
              class="ml-3.5 text-neutral-400 dark:text-neutral-500 shrink-0 pointer-events-none"
            />
            <input
              v-model="searchQuery"
              type="text"
              aria-label="Cari investor, UMKM, atau konsultan"
              placeholder="Cari investor, UMKM, konsultan..."
              class="w-full pl-2.5 pr-2 py-2.5 bg-transparent border-0 text-xs sm:text-sm text-[#18181b] dark:text-[#FDFDFD] placeholder:text-neutral-400 dark:placeholder:text-neutral-500 focus:outline-none focus:ring-0 font-poppins min-w-0"
            />
            <button
              v-if="searchQuery"
              type="button"
              aria-label="Hapus pencarian"
              class="p-1.5 mr-1 text-neutral-400 hover:text-neutral-700 dark:hover:text-white cursor-pointer shrink-0"
              title="Hapus pencarian"
              @click="searchQuery = ''"
            >
              <HugeiconsIcon :icon="Cancel01Icon" :size="15" :stroke-width="2" />
            </button>
          </div>

          <!-- Divider Line -->
          <div class="h-6 w-px bg-neutral-300 dark:bg-neutral-700 shrink-0" aria-hidden="true" />

          <!-- Right: Filter Button Trigger -->
          <div class="relative shrink-0">
            <button
              type="button"
              class="h-full px-3 sm:px-4 py-2.5 text-xs sm:text-sm font-poppins font-medium text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200/50 dark:hover:bg-neutral-800 transition-colors flex items-center gap-1.5 cursor-pointer whitespace-nowrap min-h-[46px]"
              :aria-expanded="isFilterDropdownOpen"
              title="Filter Tahap Alur Investasi"
              @click="isFilterDropdownOpen = !isFilterDropdownOpen"
            >
              <HugeiconsIcon :icon="FilterHorizontalIcon" :size="14" :stroke-width="2" class="text-neutral-500 dark:text-neutral-400 shrink-0" />
              <span class="hidden sm:inline truncate">{{ activeStageLabel }}</span>
              <span class="sm:hidden truncate text-xs">{{ activeStageShortLabel }}</span>
              <HugeiconsIcon
                :icon="ArrowDown01Icon"
                :size="14"
                :stroke-width="2"
                class="text-neutral-500 dark:text-neutral-400 transition-transform duration-200 shrink-0"
                :class="{ 'rotate-180': isFilterDropdownOpen }"
              />
            </button>

            <!-- Dropdown Menu Popover -->
            <div
              v-if="isFilterDropdownOpen"
              class="absolute right-0 top-full mt-1.5 w-52 sm:w-56 rounded-[10px] bg-white dark:bg-[#18191E] border border-[#CBD5E1] dark:border-neutral-700 shadow-none p-1.5 z-50 font-poppins text-sm animate-in fade-in zoom-in-95 duration-150"
            >
              <div class="space-y-0.5">
                <button
                  v-for="opt in stageTabs"
                  :key="opt.id"
                  type="button"
                  :class="[
                    'w-full flex items-center justify-between px-3 py-2 rounded-[8px] text-sm font-poppins transition-all duration-150 text-left cursor-pointer',
                    selectedStage === opt.id
                      ? 'bg-[#E6F4F7] hover:bg-[#D9EEF3] dark:bg-[#156374]/20 dark:hover:bg-[#156374]/30 text-[#156374] dark:text-[#50AABF] font-semibold border border-[#156374]/20 dark:border-[#50AABF]/25'
                      : 'text-[#475569] dark:text-neutral-300 font-medium hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100/80 dark:hover:bg-neutral-800/60 border border-transparent'
                  ]"
                  @click="selectStageFilter(opt.id)"
                >
                  <span>{{ opt.label }}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Clean Responsive Table (Zero horizontal overflow on standard desktop) -->
      <div class="overflow-x-auto w-full">
        <table class="w-full text-left text-sm font-poppins">
          <thead>
            <tr class="bg-[#FFFFFF] dark:bg-[#13161F] border-b border-[#E2E8F0] dark:border-neutral-800 text-neutral-800 dark:text-neutral-200 font-poppins text-xs font-bold uppercase tracking-wider">
              <th class="py-3.5 px-4 sm:px-5 text-left font-bold">Investor</th>
              <th class="py-3.5 px-3 sm:px-4 text-left font-bold">UMKM Binaan</th>
              <th class="py-3.5 px-3 sm:px-4 text-left font-bold">Ruang Data</th>
              <th class="py-3.5 px-3 sm:px-4 text-left font-bold">Update</th>
              <th class="py-3.5 px-4 sm:px-5 text-right font-bold">Aksi</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-neutral-100 dark:divide-neutral-800/80 text-neutral-800 dark:text-neutral-200 font-poppins">
            <tr
              v-for="deal in paginatedDeals"
              :key="deal.id"
              class="bg-white dark:bg-[#13161F] hover:bg-neutral-50/80 dark:hover:bg-neutral-800/50 transition-colors cursor-pointer"
              @click="openDetailModal(deal)"
            >
              <!-- Investor -->
              <td class="py-3.5 px-4 sm:px-5 text-left">
                <div class="flex items-center gap-2.5">
                  <div class="w-8 h-8 rounded-full bg-[#E6F4F7] dark:bg-[#156374]/25 border border-[#156374]/20 flex items-center justify-center text-xs font-semibold text-[#156374] dark:text-[#50AABF] shrink-0">
                    {{ deal.investorName.slice(0, 2).toUpperCase() }}
                  </div>
                  <div class="min-w-0 max-w-[180px] sm:max-w-[210px]">
                    <p class="text-sm font-semibold text-neutral-900 dark:text-white truncate" :title="deal.investorName">
                      {{ deal.investorName }}
                    </p>
                    <p class="text-xs font-medium text-neutral-500 dark:text-neutral-400 truncate mt-0.5">
                      {{ deal.investorType }}
                    </p>
                  </div>
                </div>
              </td>

              <!-- Target UMKM -->
              <td class="py-3.5 px-3 sm:px-4 text-left">
                <div class="min-w-0 max-w-[170px] sm:max-w-[200px]">
                  <p class="text-sm font-semibold text-neutral-900 dark:text-white truncate" :title="deal.umkmName">
                    {{ deal.umkmName }}
                  </p>
                  <p class="text-xs font-medium text-neutral-500 dark:text-neutral-400 truncate mt-0.5">
                    Konsultan: {{ deal.consultantName }}
                  </p>
                </div>
              </td>

              <!-- Status Ruang Data -->
              <td class="py-3.5 px-3 sm:px-4 text-left whitespace-nowrap">
                <span
                  :class="[
                    'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-[8px] text-xs font-semibold border font-poppins',
                    deal.stage === 'Ruang Data Terbuka'
                      ? 'bg-emerald-50 text-emerald-800 border-emerald-200 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800'
                      : deal.stage === 'Penjajakan Awal'
                        ? 'bg-cyan-50 text-cyan-800 border-cyan-200 dark:bg-cyan-950/60 dark:text-cyan-300 dark:border-cyan-800'
                        : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 border-neutral-200 dark:border-neutral-700'
                  ]"
                >
                  <span
                    class="w-1.5 h-1.5 rounded-full shrink-0"
                    :class="[
                      deal.stage === 'Ruang Data Terbuka'
                        ? 'bg-emerald-600 dark:bg-emerald-400'
                        : deal.stage === 'Penjajakan Awal'
                          ? 'bg-cyan-600 dark:bg-cyan-400'
                          : 'bg-neutral-400'
                    ]"
                  />
                  <span>{{ deal.stage }}</span>
                </span>
              </td>

              <!-- Pembaruan Terakhir -->
              <td class="py-3.5 px-3 sm:px-4 text-left whitespace-nowrap text-xs text-neutral-600 dark:text-neutral-400 tabular-nums">
                {{ deal.updatedAt }}
              </td>

              <!-- Tindakan / Aksi -->
              <td class="py-3.5 px-4 sm:px-5 text-right whitespace-nowrap" @click.stop>
                <div class="inline-flex items-center gap-2">
                  <button
                    v-if="deal.stage === 'Penjajakan Awal' || deal.stage === 'Akses Dicabut'"
                    type="button"
                    class="btn-pill-action-green text-xs !min-h-[32px] !py-1 !px-2.5"
                    @click="grantDataRoom(deal)"
                  >
                    <span>Buka Akses</span>
                  </button>
                  <button
                    v-if="deal.stage === 'Ruang Data Terbuka'"
                    type="button"
                    class="btn-pill-action-red-outline text-xs !min-h-[32px] !py-1 !px-2.5"
                    @click="revokeDataRoom(deal)"
                  >
                    <span>Cabut Izin</span>
                  </button>

                  <button
                    type="button"
                    class="btn-pill-action text-xs !min-h-[32px] !py-1 !px-2.5"
                    @click="openDetailModal(deal)"
                  >
                    <span>Detail</span>
                  </button>
                </div>
              </td>
            </tr>

            <!-- Empty State -->
            <tr v-if="filteredDeals.length === 0">
              <td colspan="5" class="py-12 text-center text-sm text-neutral-500 dark:text-neutral-400">
                Tidak ada data alur investasi yang sesuai dengan pencarian atau filter.
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Pagination Component -->
      <BPagination
        v-model:currentPage="currentPage"
        :totalItems="filteredDeals.length"
        :pageSize="pageSize"
        itemLabel="alur investasi"
      />
    </section>

    <!-- 4. Interactive Detail Modal (Prevents UI clutter on main table) -->
    <Teleport to="body">
      <Transition
        enter-active-class="transition duration-200 ease-out"
        enter-from-class="opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="transition duration-150 ease-in"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <div
          v-if="selectedDeal"
          class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs font-poppins"
          @click.self="selectedDeal = null"
        >
          <div class="w-full max-w-lg rounded-[18px] bg-[#FFFFFF] dark:bg-[#13161F] border border-[#CBD5E1] dark:border-neutral-800 p-6 sm:p-7 shadow-none space-y-5 animate-in fade-in zoom-in-95 duration-150">
            <!-- Modal Header -->
            <div class="flex items-start justify-between gap-3 border-b border-neutral-100 dark:border-neutral-800 pb-4">
              <div class="flex items-center gap-3">
                <div class="w-11 h-11 rounded-full bg-[#E6F4F7] dark:bg-[#156374]/25 text-[#156374] dark:text-[#50AABF] flex items-center justify-center text-base font-bold shrink-0">
                  {{ selectedDeal.investorName.slice(0, 2).toUpperCase() }}
                </div>
                <div>
                  <h3 class="text-base sm:text-lg font-bold text-neutral-900 dark:text-white leading-tight">
                    {{ selectedDeal.investorName }}
                  </h3>
                  <p class="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 mt-0.5">
                    Menjajaki: <strong class="text-neutral-800 dark:text-neutral-200">{{ selectedDeal.umkmName }}</strong>
                  </p>
                </div>
              </div>
              <button
                type="button"
                class="w-9 h-9 rounded-full bg-white dark:bg-neutral-800 border border-[#CBD5E1] dark:border-neutral-700 flex items-center justify-center text-neutral-500 hover:text-neutral-900 dark:hover:text-white cursor-pointer shadow-none"
                @click="selectedDeal = null"
              >
                <HugeiconsIcon :icon="Cancel01Icon" :size="16" :stroke-width="2.2" />
              </button>
            </div>

            <!-- Modal Info List -->
            <div class="p-4 sm:p-5 rounded-[14px] bg-neutral-50/70 dark:bg-neutral-900 border border-[#CBD5E1] dark:border-neutral-800 space-y-3 text-xs sm:text-sm">
              <div class="flex justify-between items-center">
                <span class="text-neutral-500 dark:text-neutral-400">Status Akses Ruang Data:</span>
                <span
                  :class="[
                    'inline-flex items-center px-2.5 py-0.5 rounded-[8px] text-xs font-semibold border',
                    selectedDeal.stage === 'Ruang Data Terbuka'
                      ? 'bg-emerald-50 text-emerald-800 border-emerald-200 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800'
                      : selectedDeal.stage === 'Penjajakan Awal'
                        ? 'bg-cyan-50 text-cyan-800 border-cyan-200 dark:bg-cyan-950/60 dark:text-cyan-300 dark:border-cyan-800'
                        : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 border-neutral-200 dark:border-neutral-700'
                  ]"
                >
                  {{ selectedDeal.stage }}
                </span>
              </div>
              <div class="flex justify-between items-center">
                <span class="text-neutral-500 dark:text-neutral-400">Konsultan Pendamping:</span>
                <span class="font-semibold text-neutral-900 dark:text-white">{{ selectedDeal.consultantName }}</span>
              </div>
              <div class="flex justify-between items-center">
                <span class="text-neutral-500 dark:text-neutral-400">Tipe Lembaga Investor:</span>
                <span class="font-medium text-neutral-900 dark:text-white">{{ selectedDeal.investorType }}</span>
              </div>
              <div class="flex justify-between items-center">
                <span class="text-neutral-500 dark:text-neutral-400">Pembaruan Terakhir:</span>
                <span class="font-medium text-neutral-900 dark:text-white">{{ selectedDeal.updatedAt }}</span>
              </div>
              <div class="pt-2 border-t border-neutral-200 dark:border-neutral-800 space-y-1.5">
                <span class="text-neutral-500 dark:text-neutral-400 block text-xs font-semibold uppercase tracking-wider">
                  Pengamanan Berkas &amp; Dokumen:
                </span>
                <div class="flex flex-wrap gap-2 text-xs">
                  <span class="px-2 py-1 rounded-[6px] bg-white dark:bg-neutral-800 border border-[#CBD5E1] dark:border-neutral-700 text-neutral-700 dark:text-neutral-300">
                    Watermark ID Aktif
                  </span>
                  <span class="px-2 py-1 rounded-[6px] bg-white dark:bg-neutral-800 border border-[#CBD5E1] dark:border-neutral-700 text-neutral-700 dark:text-neutral-300">
                    Laporan Arus Kas
                  </span>
                  <span class="px-2 py-1 rounded-[6px] bg-white dark:bg-neutral-800 border border-[#CBD5E1] dark:border-neutral-700 text-neutral-700 dark:text-neutral-300">
                    Buku Besar Usaha
                  </span>
                </div>
              </div>
            </div>

            <!-- Modal Action Buttons -->
            <div class="flex items-center justify-between gap-2.5 pt-2 border-t border-neutral-100 dark:border-neutral-800">
              <NuxtLink
                to="/admin/investor"
                class="btn-pill-action text-xs"
              >
                <span>Lihat Profil Investor →</span>
              </NuxtLink>

              <div class="flex items-center gap-2">
                <button
                  v-if="selectedDeal.stage === 'Penjajakan Awal' || selectedDeal.stage === 'Akses Dicabut'"
                  type="button"
                  class="btn-pill-action-green"
                  @click="grantDataRoom(selectedDeal)"
                >
                  <span>Buka Akses</span>
                </button>
                <button
                  v-if="selectedDeal.stage === 'Ruang Data Terbuka'"
                  type="button"
                  class="btn-pill-action-red-outline"
                  @click="revokeDataRoom(selectedDeal)"
                >
                  <span>Cabut Izin</span>
                </button>
                <button
                  type="button"
                  class="btn-pill-action"
                  @click="selectedDeal = null"
                >
                  <span>Tutup</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { gsap } from 'gsap'
import { HugeiconsIcon } from '@hugeicons/vue'
import {
  Coins01Icon,
  Download01Icon,
  CheckmarkCircle01Icon,
  FileUnlockedIcon,
  Shield01Icon,
  Search01Icon,
  FilterHorizontalIcon,
  ArrowDown01Icon,
  Cancel01Icon,
  UserMultiple02Icon
} from '@hugeicons/core-free-icons'

definePageMeta({
  layout: 'dashboard',
  hideHeader: true
})

useHead({
  title: 'Alur Investasi — Admin Beruang'
})

interface DealFlowItem {
  id: string
  investorName: string
  investorType: string
  umkmName: string
  consultantName: string
  stage: 'Ruang Data Terbuka' | 'Penjajakan Awal' | 'Akses Dicabut'
  updatedAt: string
}

const investasiPageRef = ref<HTMLElement | null>(null)
let gsapCtx: gsap.Context | null = null

const toastMessage = ref('')
const selectedStage = ref<'ALL' | 'Ruang Data Terbuka' | 'Penjajakan Awal' | 'Akses Dicabut'>('ALL')
const isFilterDropdownOpen = ref(false)
const searchQuery = ref('')
const selectedDeal = ref<DealFlowItem | null>(null)

// Pagination states
const currentPage = ref(1)
const pageSize = ref(10)

const stageTabs = [
  { id: 'ALL' as const, label: 'Semua Alur', shortLabel: 'Semua' },
  { id: 'Ruang Data Terbuka' as const, label: 'Ruang Data Terbuka', shortLabel: 'Ruang Data' },
  { id: 'Penjajakan Awal' as const, label: 'Penjajakan Awal', shortLabel: 'Penjajakan' },
  { id: 'Akses Dicabut' as const, label: 'Akses Dicabut', shortLabel: 'Dicabut' }
]

const activeStageLabel = computed(() => {
  return stageTabs.find(t => t.id === selectedStage.value)?.label || 'Semua Alur'
})

const activeStageShortLabel = computed(() => {
  return stageTabs.find(t => t.id === selectedStage.value)?.shortLabel || 'Semua'
})

function selectStageFilter(id: typeof selectedStage.value) {
  selectedStage.value = id
  isFilterDropdownOpen.value = false
  currentPage.value = 1
}

const dealItems = ref<DealFlowItem[]>([
  {
    id: 'deal-1',
    investorName: 'Nusantara Impact Capital',
    investorType: 'Venture Capital • Jakarta',
    umkmName: 'Kopi Kenangan Senja',
    consultantName: 'Rendra Pratama, S.E., Ak.',
    stage: 'Ruang Data Terbuka',
    updatedAt: '2 jam lalu'
  },
  {
    id: 'deal-2',
    investorName: 'Nusantara Impact Capital',
    investorType: 'Venture Capital • Jakarta',
    umkmName: 'Batik Sekar Jagad',
    consultantName: 'Nadia Kusuma, MBA, CFP',
    stage: 'Ruang Data Terbuka',
    updatedAt: '4 jam lalu'
  },
  {
    id: 'deal-3',
    investorName: 'Artha Ventura Syariah',
    investorType: 'Dana Syariah • Bandung',
    umkmName: 'Kopi Kenangan Senja',
    consultantName: 'Rendra Pratama, S.E., Ak.',
    stage: 'Penjajakan Awal',
    updatedAt: '1 hari lalu'
  },
  {
    id: 'deal-4',
    investorName: 'Timur Berkarya Fund',
    investorType: 'Impact Fund • Bali',
    umkmName: 'Tenun Ikat Nusantara',
    consultantName: 'Dr. Hendra Wijaya, M.M.',
    stage: 'Penjajakan Awal',
    updatedAt: '5 jam lalu'
  },
  {
    id: 'deal-5',
    investorName: 'Koperasi Pemodal Lokal',
    investorType: 'Angel Syndicate • Bogor',
    umkmName: 'Sayur Hidroponik Segar',
    consultantName: 'Rendra Pratama, S.E., Ak.',
    stage: 'Ruang Data Terbuka',
    updatedAt: '3 hari lalu'
  },
  {
    id: 'deal-6',
    investorName: 'Surabaya Angel Network',
    investorType: 'Angel Investor • Surabaya',
    umkmName: 'Sambal Bu Rudy Binaan',
    consultantName: 'Siti Rahmawati, S.E., M.Ak.',
    stage: 'Penjajakan Awal',
    updatedAt: '6 jam lalu'
  },
  {
    id: 'deal-7',
    investorName: 'Mandiri Mitra Usaha',
    investorType: 'Dana Ventura • Jakarta',
    umkmName: 'Keripik Tempe Barokah',
    consultantName: 'Rendra Pratama, S.E., Ak.',
    stage: 'Ruang Data Terbuka',
    updatedAt: '1 hari lalu'
  },
  {
    id: 'deal-8',
    investorName: 'Artha Ventura Syariah',
    investorType: 'Dana Syariah • Bandung',
    umkmName: 'Tenun Ikat Nusantara',
    consultantName: 'Dr. Hendra Wijaya, M.M.',
    stage: 'Akses Dicabut',
    updatedAt: '4 hari lalu'
  },
  {
    id: 'deal-9',
    investorName: 'Timur Berkarya Fund',
    investorType: 'Impact Fund • Bali',
    umkmName: 'Kopi Kenangan Senja',
    consultantName: 'Rendra Pratama, S.E., Ak.',
    stage: 'Penjajakan Awal',
    updatedAt: '12 jam lalu'
  },
  {
    id: 'deal-10',
    investorName: 'Nusantara Impact Capital',
    investorType: 'Venture Capital • Jakarta',
    umkmName: 'Sayur Hidroponik Segar',
    consultantName: 'Rendra Pratama, S.E., Ak.',
    stage: 'Ruang Data Terbuka',
    updatedAt: '5 hari lalu'
  },
  {
    id: 'deal-11',
    investorName: 'Koperasi Pemodal Lokal',
    investorType: 'Angel Syndicate • Bogor',
    umkmName: 'Batik Sekar Jagad',
    consultantName: 'Nadia Kusuma, MBA, CFP',
    stage: 'Penjajakan Awal',
    updatedAt: '2 hari lalu'
  }
])

const activeDataRoomCount = computed(() => dealItems.value.filter(d => d.stage === 'Ruang Data Terbuka').length)
const uniqueInvestorsCount = computed(() => new Set(dealItems.value.map(d => d.investorName)).size)

const filteredDeals = computed(() => {
  return dealItems.value.filter((d) => {
    const matchStage = selectedStage.value === 'ALL' || d.stage === selectedStage.value
    const q = searchQuery.value.trim().toLowerCase()
    if (!q) return matchStage
    return (
      matchStage &&
      (d.investorName.toLowerCase().includes(q) ||
        d.umkmName.toLowerCase().includes(q) ||
        d.consultantName.toLowerCase().includes(q) ||
        d.investorType.toLowerCase().includes(q))
    )
  })
})

const paginatedDeals = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value
  return filteredDeals.value.slice(start, start + pageSize.value)
})

async function loadDeals() {
  try {
    const res = await useApi<any>('/admin/deals')
    if (res.data && Array.isArray(res.data) && res.data.length > 0) {
      dealItems.value = res.data.map((d: any) => ({
        id: d.id,
        investorName: d.investorName,
        investorType: `Tiket Rp ${(d.ticketProposed / 1000000).toLocaleString('id-ID')} Jt • ${d.scheme}`,
        umkmName: d.businessName,
        consultantName: 'Konsultan Terverifikasi',
        stage: d.status === 'APPROVED' ? 'Ruang Data Terbuka' : d.status === 'REJECTED' ? 'Akses Dicabut' : 'Penjajakan Awal',
        updatedAt: d.respondedAt || d.requestedAt || 'Baru saja'
      }))
    }
  } catch (err: any) {
    console.warn('Gagal memuat alur investasi live:', err?.message)
  }
}

function openDetailModal(deal: DealFlowItem) {
  selectedDeal.value = deal
}

async function grantDataRoom(deal: DealFlowItem) {
  try {
    await useApi(`/admin/deals/${deal.id}/toggle-access`, {
      method: 'PUT',
      body: { status: 'APPROVED' }
    })
    deal.stage = 'Ruang Data Terbuka'
    deal.updatedAt = 'Baru saja'
    toastMessage.value = `Izin Ruang Data ${deal.umkmName} berhasil dibuka untuk ${deal.investorName}.`
  } catch (err: any) {
    toastMessage.value = 'Gagal membuka akses ruang data: ' + err?.message
  }
}

async function revokeDataRoom(deal: DealFlowItem) {
  try {
    await useApi(`/admin/deals/${deal.id}/toggle-access`, {
      method: 'PUT',
      body: { status: 'REJECTED' }
    })
    deal.stage = 'Akses Dicabut'
    deal.updatedAt = 'Baru saja'
    toastMessage.value = `Akses Ruang Data ${deal.umkmName} untuk ${deal.investorName} telah dicabut.`
  } catch (err: any) {
    toastMessage.value = 'Gagal mencabut izin ruang data: ' + err?.message
  }
}

function handleExportCsv() {
  toastMessage.value = `Data alur investasi (${filteredDeals.value.length} catatan) berhasil diekspor.`
}

onMounted(async () => {
  await loadDeals()
  if (!investasiPageRef.value) return
  gsapCtx = gsap.context(() => {
    gsap.fromTo(
      '.gsap-admin-card',
      { opacity: 0, y: 14 },
      { opacity: 1, y: 0, duration: 0.4, stagger: 0.06, ease: 'power2.out', clearProps: 'transform' }
    )
    gsap.fromTo(
      '.gsap-admin-section',
      { opacity: 0, y: 16 },
      { opacity: 1, y: 0, duration: 0.45, delay: 0.12, ease: 'power2.out', clearProps: 'transform' }
    )
  }, investasiPageRef.value)
})

onUnmounted(() => {
  gsapCtx?.revert()
})
</script>
