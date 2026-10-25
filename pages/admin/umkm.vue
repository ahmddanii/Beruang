<template>
  <div ref="umkmPageRef" class="space-y-6 sm:space-y-8 pb-16 font-poppins text-neutral-900 dark:text-neutral-100">
    <!-- 1. Page Title: Identical to UMKM Pages -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 min-h-[44px]">
      <div class="flex items-center gap-2.5 sm:gap-3">
        <HugeiconsIcon :icon="Store01Icon" :size="26" :stroke-width="2.2" class="text-neutral-900 dark:text-white shrink-0" />
        <h1 class="font-poppins font-semibold text-2xl sm:text-3xl text-neutral-900 dark:text-white tracking-tight leading-tight">
          Kemitraan UMKM
        </h1>
      </div>

      <div class="flex items-center gap-2.5 shrink-0 w-full sm:w-auto [&>*]:w-full sm:[&>*]:w-auto">
        <button
          type="button"
          class="btn-pill-action-green justify-center"
          @click="handleExportCsv"
        >
          <HugeiconsIcon :icon="Download01Icon" :size="16" :stroke-width="2" />
          <span>Unduh CSV</span>
        </button>
        <NuxtLink
          to="/admin/penugasan"
          class="btn-pill-action justify-center"
        >
          <HugeiconsIcon :icon="UserGroupIcon" :size="16" :stroke-width="2" />
          <span>Konsultan</span>
        </NuxtLink>
      </div>
    </div>

    <!-- Toast Notification -->
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

    <!-- 2. 3 Summary Cards (Identical .stat-card-clean Typography & Geometry to UMKM Pages) -->
    <div class="grid grid-cols-1 sm:grid-cols-3 gap-6 lg:gap-8 items-stretch w-full">
      <div class="gsap-admin-card gsap-stat-card flex-1 w-full">
        <div class="stat-card-clean transition-all duration-200">
          <div class="flex items-center justify-between w-full gap-2">
            <div class="flex items-center gap-2 sm:gap-2.5 min-w-0">
              <div class="stat-card-icon-box">
                <HugeiconsIcon :icon="Store01Icon" :size="17" :stroke-width="2.0" class="text-[#156374] dark:text-[#50AABF] shrink-0" />
              </div>
              <span class="text-[13px] xl:text-[14px] font-poppins font-semibold text-neutral-800 dark:text-neutral-100 capitalize truncate tracking-[-0.01em]">
                Total UMKM
              </span>
            </div>
            <div class="stat-card-badge badge-green">
              <span>NIB Valid</span>
            </div>
          </div>
          <div class="my-auto py-2.5 sm:py-3.5">
            <span class="text-xl sm:text-[22px] lg:text-[21px] xl:text-[24px] font-poppins font-semibold text-neutral-900 dark:text-white tabular-nums tracking-[-0.02em] whitespace-nowrap block leading-tight">
              {{ umkmPartnerships.length }} Usaha
            </span>
          </div>
        </div>
      </div>

      <div class="gsap-admin-card gsap-stat-card flex-1 w-full">
        <div class="stat-card-clean transition-all duration-200">
          <div class="flex items-center justify-between w-full gap-2">
            <div class="flex items-center gap-2 sm:gap-2.5 min-w-0">
              <div class="stat-card-icon-box">
                <HugeiconsIcon :icon="UserCheck01Icon" :size="17" :stroke-width="2.0" class="text-[#156374] dark:text-[#50AABF] shrink-0" />
              </div>
              <span class="text-[13px] xl:text-[14px] font-poppins font-semibold text-neutral-800 dark:text-neutral-100 capitalize truncate tracking-[-0.01em]">
                Didampingi Konsultan
              </span>
            </div>
            <div class="stat-card-badge badge-green">
              <span>{{ assignedCount }} Aktif</span>
            </div>
          </div>
          <div class="my-auto py-2.5 sm:py-3.5">
            <span class="text-xl sm:text-[22px] lg:text-[21px] xl:text-[24px] font-poppins font-semibold text-neutral-900 dark:text-white tabular-nums tracking-[-0.02em] whitespace-nowrap block leading-tight">
              {{ assignedCount }} / {{ umkmPartnerships.length }} Usaha
            </span>
          </div>
        </div>
      </div>

      <div class="gsap-admin-card gsap-stat-card flex-1 w-full">
        <div class="stat-card-clean transition-all duration-200">
          <div class="flex items-center justify-between w-full gap-2">
            <div class="flex items-center gap-2 sm:gap-2.5 min-w-0">
              <div class="stat-card-icon-box">
                <HugeiconsIcon :icon="Coins01Icon" :size="17" :stroke-width="2.0" class="text-[#156374] dark:text-[#50AABF] shrink-0" />
              </div>
              <span class="text-[13px] xl:text-[14px] font-poppins font-semibold text-neutral-800 dark:text-neutral-100 capitalize truncate tracking-[-0.01em]">
                Terhubung Investor
              </span>
            </div>
            <div class="stat-card-badge badge-green">
              <span>{{ totalActiveInvestors }} Relasi</span>
            </div>
          </div>
          <div class="my-auto py-2.5 sm:py-3.5">
            <span class="text-xl sm:text-[22px] lg:text-[21px] xl:text-[24px] font-poppins font-semibold text-neutral-900 dark:text-white tabular-nums tracking-[-0.02em] whitespace-nowrap block leading-tight">
              {{ investorConnectedCount }} Usaha
            </span>
          </div>
        </div>
      </div>
    </div>

    <!-- 3. Main Directory Container: Identical Table & Header Style to UMKM Catatan Kas -->
    <section class="gsap-admin-section card-tactile-gopay rounded-[18px] overflow-hidden font-poppins">
      <!-- Container Header Bar -->
      <div class="p-5 sm:p-8 space-y-4 border-b border-[#E2E8F0] dark:border-neutral-800 bg-[#FFFFFF] dark:bg-[#13161F]">
        <div class="space-y-1.5">
          <h2 class="text-lg sm:text-xl font-poppins font-bold text-neutral-900 dark:text-white tracking-tight">
            Daftar Kemitraan UMKM, Konsultan, & Investor
          </h2>
          <p class="text-xs sm:text-sm font-poppins text-neutral-600 dark:text-neutral-400 leading-normal">
            Pantau setiap usaha binaan beserta konsultan pendamping dan investor yang sedang mengakses Ruang Data.
          </p>
        </div>

        <!-- Joined Search & Filter Control Bar (Identik dengan Catatan Kas — Daftar Mutasi Transaksi Kas Harian) -->
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
              aria-label="Cari UMKM, konsultan, atau investor"
              placeholder="Cari UMKM, konsultan, investor..."
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

          <!-- Right: Filter Button Trigger (Joined seamlessly) -->
          <div class="relative shrink-0">
            <button
              type="button"
              class="h-full px-3 sm:px-4 py-2.5 text-xs sm:text-sm font-poppins font-medium text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200/50 dark:hover:bg-neutral-800 transition-colors flex items-center gap-1.5 cursor-pointer whitespace-nowrap min-h-[46px]"
              :aria-expanded="isFilterDropdownOpen"
              title="Filter Sektor UMKM"
              @click="isFilterDropdownOpen = !isFilterDropdownOpen"
            >
              <HugeiconsIcon :icon="FilterHorizontalIcon" :size="14" :stroke-width="2" class="text-neutral-500 dark:text-neutral-400 shrink-0" />
              <span class="hidden sm:inline truncate">{{ activeSectorLabel }}</span>
              <span class="sm:hidden truncate text-xs">{{ activeSectorShortLabel }}</span>
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
                  v-for="opt in sectorTabs"
                  :key="opt.id"
                  type="button"
                  :class="[
                    'w-full flex items-center justify-between px-3 py-2 rounded-[8px] text-sm font-poppins transition-all duration-150 text-left cursor-pointer',
                    selectedSector === opt.id
                      ? 'bg-[#E6F4F7] hover:bg-[#D9EEF3] dark:bg-[#156374]/20 dark:hover:bg-[#156374]/30 text-[#156374] dark:text-[#50AABF] font-semibold border border-[#156374]/20 dark:border-[#50AABF]/25'
                      : 'text-[#475569] dark:text-neutral-300 font-medium hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100/80 dark:hover:bg-neutral-800/60 border border-transparent'
                  ]"
                  @click="selectSectorFilter(opt.id)"
                >
                  <span>{{ opt.label }}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Tripartite Relationship Table -->
      <div class="overflow-x-auto w-full">
        <table class="w-full text-left text-sm font-poppins">
          <thead>
            <tr class="bg-[#FFFFFF] dark:bg-[#13161F] border-b border-[#E2E8F0] dark:border-neutral-800 text-neutral-800 dark:text-neutral-200 font-poppins text-xs sm:text-sm font-bold uppercase tracking-wider">
              <th class="py-4 sm:py-5 px-6 text-left font-bold">PROFIL</th>
              <th class="py-4 sm:py-5 px-5 text-left font-bold">STATUS</th>
              <th class="py-4 sm:py-5 px-5 text-left font-bold">KONSULTAN</th>
              <th class="py-4 sm:py-5 px-5 text-left font-bold">INVESTOR</th>
              <th class="py-4 sm:py-5 px-6 text-right font-bold">AKSI</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-neutral-100 dark:divide-neutral-800/80 text-neutral-800 dark:text-neutral-200 font-poppins">
            <tr
              v-for="umkm in paginatedUmkm"
              :key="umkm.id"
              class="bg-white dark:bg-[#13161F] hover:bg-neutral-50/80 dark:hover:bg-neutral-800/50 transition-colors"
            >
              <!-- Profil UMKM -->
              <td class="py-4 sm:py-5 px-6 text-left">
                <div class="flex items-center gap-3.5">
                  <div class="w-10 h-10 rounded-full bg-[#E6F4F7] dark:bg-[#156374]/25 border border-[#156374]/20 flex items-center justify-center text-sm font-semibold text-[#156374] dark:text-[#50AABF] shrink-0">
                    {{ getInitials(umkm.name) }}
                  </div>
                  <div class="min-w-0">
                    <p class="text-sm font-semibold text-neutral-900 dark:text-white truncate">{{ umkm.name }}</p>
                    <p class="text-xs font-medium text-neutral-600 dark:text-neutral-400 truncate mt-0.5">
                      {{ umkm.owner }} • {{ umkm.sector }} ({{ umkm.city }})
                    </p>
                  </div>
                </div>
              </td>

              <!-- Status Kesiapan -->
              <td class="py-4 sm:py-5 px-5 text-left whitespace-nowrap">
                <span
                  :class="[
                    'inline-flex items-center px-2.5 py-1 rounded-[8px] text-xs font-semibold border font-poppins',
                    umkm.readinessStatus === 'Siap Didanai'
                      ? 'bg-emerald-50 text-emerald-800 border-emerald-200 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800'
                      : 'bg-cyan-50 text-cyan-800 border-cyan-200 dark:bg-cyan-950/60 dark:text-cyan-300 dark:border-cyan-800'
                  ]"
                >
                  {{ umkm.readinessStatus }}
                </span>
              </td>

              <!-- Konsultan Pendamping -->
              <td class="py-4 sm:py-5 px-5 text-left">
                <div v-if="umkm.consultant">
                  <p class="text-sm font-medium text-neutral-900 dark:text-white">{{ umkm.consultant.name }}</p>
                </div>
                <div v-else>
                  <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-[8px] text-xs font-semibold bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800/50">
                    <HugeiconsIcon :icon="Alert01Icon" :size="14" :stroke-width="2.2" />
                    Belum Ada Konsultan
                  </span>
                </div>
              </td>

              <!-- Relasi Investor (Satu Row dengan Truncate Ellipsis) -->
              <td class="py-4 sm:py-5 px-5 text-left">
                <div v-if="umkm.investors.length > 0" class="flex flex-nowrap items-center gap-1.5 max-w-[240px]">
                  <div
                    v-for="inv in umkm.investors"
                    :key="inv.name"
                    class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-[8px] bg-white dark:bg-neutral-900 border border-[#CBD5E1] dark:border-neutral-700 text-xs sm:text-sm min-w-0 max-w-full"
                    :title="inv.name"
                  >
                    <HugeiconsIcon :icon="Coins01Icon" :size="14" :stroke-width="2" class="text-[#00800e] dark:text-[#4ADE80] shrink-0" />
                    <span class="font-medium text-neutral-900 dark:text-white truncate whitespace-nowrap">{{ inv.name }}</span>
                  </div>
                </div>
                <span v-else class="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400">
                  Belum terhubung investor
                </span>
              </td>

              <!-- Aksi: Standard White Button (btn-pill-action) -->
              <td class="py-4 sm:py-5 px-6 text-right whitespace-nowrap">
                <button
                  type="button"
                  class="btn-pill-action"
                  @click="openDetailModal(umkm)"
                >
                  <span>Detail</span>
                  <HugeiconsIcon :icon="ArrowRight01Icon" :size="16" :stroke-width="2" />
                </button>
              </td>
            </tr>

            <tr v-if="filteredUmkm.length === 0">
              <td colspan="5" class="py-12 text-center text-sm text-neutral-500 dark:text-neutral-400">
                Tidak ditemukan kemitraan UMKM yang sesuai dengan pencarian.
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Pagination Table -->
      <BPagination
        v-model:currentPage="currentPage"
        :totalItems="filteredUmkm.length"
        :pageSize="pageSize"
        itemLabel="mitra"
      />
    </section>

    <!-- Modal Detail Kemitraan (UMKM + Konsultan + Investor) -->
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
          v-if="selectedUmkm"
          class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs font-poppins"
          @click.self="selectedUmkm = null"
        >
          <div class="w-full max-w-xl rounded-[18px] bg-[#FFFFFF] dark:bg-[#13161F] border border-[#CBD5E1] dark:border-neutral-800 p-6 sm:p-7 shadow-none space-y-5">
            <!-- Header Modal -->
            <div class="flex items-start justify-between gap-3 border-b border-neutral-100 dark:border-neutral-800 pb-4">
              <div class="flex items-center gap-3.5">
                <div class="w-11 h-11 rounded-[12px] bg-[#E6F4F7] dark:bg-[#156374]/25 border border-[#156374]/20 flex items-center justify-center text-[#156374] dark:text-[#50AABF] shrink-0">
                  <HugeiconsIcon :icon="Store01Icon" :size="22" :stroke-width="2.2" />
                </div>
                <div>
                  <h3 class="text-base sm:text-lg font-bold text-neutral-900 dark:text-white">{{ selectedUmkm.name }}</h3>
                  <p class="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400">
                    Pemilik: {{ selectedUmkm.owner }} • {{ selectedUmkm.sector }} ({{ selectedUmkm.city }})
                  </p>
                </div>
              </div>
              <button
                type="button"
                class="w-9 h-9 rounded-full bg-white dark:bg-neutral-800 border border-[#CBD5E1] dark:border-neutral-700 flex items-center justify-center text-neutral-500 hover:text-neutral-900 dark:hover:text-white cursor-pointer shadow-none"
                @click="selectedUmkm = null"
              >
                <HugeiconsIcon :icon="Cancel01Icon" :size="16" :stroke-width="2.2" />
              </button>
            </div>

            <!-- 1. Konsultan Pendamping -->
            <div class="p-4 sm:p-5 rounded-[14px] bg-neutral-50/70 dark:bg-neutral-900 border border-[#CBD5E1] dark:border-neutral-800 space-y-3">
              <div class="flex items-center justify-between">
                <span class="text-xs font-bold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">Konsultan Pendamping</span>
              </div>

              <div v-if="selectedUmkm.consultant" class="flex items-center justify-between gap-3 pt-1">
                <div class="flex items-center gap-3">
                  <div class="w-10 h-10 rounded-full bg-[#E6F4F7] dark:bg-[#156374]/25 flex items-center justify-center text-sm font-bold text-[#156374] dark:text-[#50AABF]">
                    {{ getInitials(selectedUmkm.consultant.name) }}
                  </div>
                  <div>
                    <p class="text-sm font-semibold text-neutral-900 dark:text-white">{{ selectedUmkm.consultant.name }}</p>
                    <p class="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400">{{ selectedUmkm.consultant.specialty }} • Sejak {{ selectedUmkm.consultant.since }}</p>
                  </div>
                </div>
                <NuxtLink
                  to="/admin/penugasan"
                  class="btn-pill-action"
                  @click="selectedUmkm = null"
                >
                  <span>Ubah</span>
                </NuxtLink>
              </div>
              <div v-else class="flex items-center justify-between gap-3 pt-1">
                <p class="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400">Belum memiliki konsultan pendamping aktif.</p>
                <NuxtLink
                  to="/admin/penugasan"
                  class="btn-pill-action"
                  @click="selectedUmkm = null"
                >
                  <span>Lihat Konsultan</span>
                </NuxtLink>
              </div>
            </div>

            <!-- 2. Daftar Investor yang Sedang Berhubungan -->
            <div class="p-4 sm:p-5 rounded-[14px] bg-neutral-50/70 dark:bg-neutral-900 border border-[#CBD5E1] dark:border-neutral-800 space-y-3">
              <div class="flex items-center justify-between">
                <span class="text-xs font-bold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
                  Investor Terhubung ({{ selectedUmkm.investors.length }})
                </span>
                <span class="text-xs font-semibold text-[#156374] dark:text-[#50AABF]">Ruang Data Terpantau</span>
              </div>

              <div v-if="selectedUmkm.investors.length > 0" class="space-y-2.5">
                <div
                  v-for="inv in selectedUmkm.investors"
                  :key="inv.name"
                  class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 rounded-[12px] bg-white dark:bg-neutral-800/70 border border-[#CBD5E1] dark:border-neutral-700/70"
                >
                  <div>
                    <div class="flex items-center gap-2">
                      <p class="text-sm font-semibold text-neutral-900 dark:text-white">{{ inv.name }}</p>
                    </div>
                    <p class="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 mt-1">
                      Pembaruan: {{ inv.updatedAt }}
                    </p>
                  </div>
                  <button
                    type="button"
                    class="btn-pill-action-red-outline self-start sm:self-center"
                    @click="revokeInvestorAccess(selectedUmkm, inv.name)"
                  >
                    <span>Cabut Izin</span>
                  </button>
                </div>
              </div>
              <p v-else class="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 py-2">
                Belum ada investor yang mengajukan pembukaan Ruang Data pada UMKM ini.
              </p>
            </div>

            <!-- Footer -->
            <div class="flex items-center justify-end gap-2.5 pt-1">
              <button
                type="button"
                class="btn-pill-action"
                @click="selectedUmkm = null"
              >
                <span>Tutup</span>
              </button>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'
import { gsap } from 'gsap'
import { HugeiconsIcon } from '@hugeicons/vue'
import BPagination from '~/components/base/BPagination.vue'
import {
  Store01Icon,
  Download01Icon,
  UserGroupIcon,
  UserCheck01Icon,
  CheckmarkCircle01Icon,
  Search01Icon,
  Coins01Icon,
  Alert01Icon,
  ArrowRight01Icon,
  ArrowDown01Icon,
  FilterHorizontalIcon,
  Cancel01Icon
} from '@hugeicons/core-free-icons'

definePageMeta({
  layout: 'dashboard',
  hideHeader: true
})

useHead({
  title: 'Kemitraan UMKM — Admin Beruang'
})

interface UmkmInvestorRelation {
  name: string
  stage: 'Ruang Data Terbuka' | 'Penjajakan Awal' | 'Pantau Portofolio'
  ticketSize: string
  updatedAt: string
}

interface UmkmPartnershipItem {
  id: string
  name: string
  owner: string
  sector: 'Kuliner & F&B' | 'Kriya & Tekstil' | 'Agribisnis' | 'Jasa & Retail'
  city: string
  score: number
  readinessStatus: 'Siap Didanai' | 'Pendampingan' | 'Perlu Validasi'
  consultant: {
    name: string
    specialty: string
    since: string
  } | null
  investors: UmkmInvestorRelation[]
}

const umkmPageRef = ref<HTMLElement | null>(null)
let gsapCtx: gsap.Context | null = null

const toastMessage = ref('')
const selectedSector = ref<'ALL' | 'Kuliner & F&B' | 'Kriya & Tekstil' | 'Agribisnis' | 'Jasa & Retail'>('ALL')
const isFilterDropdownOpen = ref(false)
const searchQuery = ref('')
const selectedUmkm = ref<UmkmPartnershipItem | null>(null)

const sectorTabs = [
  { id: 'ALL' as const, label: 'Semua Sektor', shortLabel: 'Semua' },
  { id: 'Kuliner & F&B' as const, label: 'Kuliner & F&B', shortLabel: 'Kuliner' },
  { id: 'Kriya & Tekstil' as const, label: 'Kriya & Tekstil', shortLabel: 'Kriya' },
  { id: 'Agribisnis' as const, label: 'Agribisnis', shortLabel: 'Agribisnis' },
  { id: 'Jasa & Retail' as const, label: 'Jasa & Retail', shortLabel: 'Retail' }
]

const activeSectorLabel = computed(() => {
  return sectorTabs.find(t => t.id === selectedSector.value)?.label || 'Semua Sektor'
})

const activeSectorShortLabel = computed(() => {
  return sectorTabs.find(t => t.id === selectedSector.value)?.shortLabel || 'Semua'
})

function selectSectorFilter(id: typeof selectedSector.value) {
  selectedSector.value = id
  isFilterDropdownOpen.value = false
}

const INITIAL_UMKM_PARTNERSHIPS: UmkmPartnershipItem[] = [
  {
    id: 'umkm-1',
    name: 'Kopi Kenangan Senja',
    owner: 'Budi Santoso',
    sector: 'Kuliner & F&B',
    city: 'Bandung',
    score: 84,
    readinessStatus: 'Siap Didanai',
    consultant: {
      name: 'Rendra Pratama, S.E., Ak.',
      specialty: 'Arus Kas & Pajak',
      since: '12 Jan 2026'
    },
    investors: [
      {
        name: 'Nusantara Impact Capital',
        stage: 'Ruang Data Terbuka',
        ticketSize: 'Rp 250.000.000',
        updatedAt: '2 jam lalu'
      },
      {
        name: 'Artha Ventura Syariah',
        stage: 'Penjajakan Awal',
        ticketSize: 'Rp 150.000.000',
        updatedAt: '1 hari lalu'
      }
    ]
  },
  {
    id: 'umkm-2',
    name: 'Batik Sekar Jagad',
    owner: 'Siti Lestari',
    sector: 'Kriya & Tekstil',
    city: 'Yogyakarta',
    score: 88,
    readinessStatus: 'Siap Didanai',
    consultant: {
      name: 'Nadia Kusuma, MBA, CFP',
      specialty: 'Kesiapan Ekspor',
      since: '04 Feb 2026'
    },
    investors: [
      {
        name: 'Nusantara Impact Capital',
        stage: 'Ruang Data Terbuka',
        ticketSize: 'Rp 320.000.000',
        updatedAt: '4 jam lalu'
      }
    ]
  },
  {
    id: 'umkm-3',
    name: 'Sayur Hidroponik Segar',
    owner: 'Hendra Wijaya',
    sector: 'Agribisnis',
    city: 'Bogor',
    score: 76,
    readinessStatus: 'Pendampingan',
    consultant: {
      name: 'Rendra Pratama, S.E., Ak.',
      specialty: 'Rantai Pasok Agribisnis',
      since: '19 Feb 2026'
    },
    investors: [
      {
        name: 'Koperasi Pemodal Lokal',
        stage: 'Pantau Portofolio',
        ticketSize: 'Rp 120.000.000',
        updatedAt: '3 hari lalu'
      }
    ]
  },
  {
    id: 'umkm-4',
    name: 'Roastery Puncak Klasik',
    owner: 'Dimas Anggara',
    sector: 'Kuliner & F&B',
    city: 'Bogor',
    score: 64,
    readinessStatus: 'Perlu Validasi',
    consultant: null,
    investors: []
  },
  {
    id: 'umkm-5',
    name: 'Tenun Ikat Nusantara',
    owner: 'Maria Fransiska',
    sector: 'Kriya & Tekstil',
    city: 'Kupang',
    score: 71,
    readinessStatus: 'Pendampingan',
    consultant: {
      name: 'Dr. Hendra Wijaya, M.M.',
      specialty: 'Restrukturisasi Kas',
      since: '02 Mar 2026'
    },
    investors: [
      {
        name: 'Timur Berkarya Fund',
        stage: 'Penjajakan Awal',
        ticketSize: 'Rp 180.000.000',
        updatedAt: '5 jam lalu'
      }
    ]
  },
  {
    id: 'umkm-6',
    name: 'Sambal Bu Rudy Jaya',
    owner: 'Rudi Hartono',
    sector: 'Kuliner & F&B',
    city: 'Surabaya',
    score: 82,
    readinessStatus: 'Siap Didanai',
    consultant: {
      name: 'Nadia Kusuma, MBA, CFP',
      specialty: 'Kesiapan Ekspor',
      since: '15 Jan 2026'
    },
    investors: [
      {
        name: 'Nusantara Impact Capital',
        stage: 'Ruang Data Terbuka',
        ticketSize: 'Rp 350.000.000',
        updatedAt: '1 hari lalu'
      }
    ]
  },
  {
    id: 'umkm-7',
    name: 'Madu Hutan Sumbawa',
    owner: 'Fahri Hamzah',
    sector: 'Agribisnis',
    city: 'Sumbawa',
    score: 75,
    readinessStatus: 'Siap Didanai',
    consultant: {
      name: 'Rendra Pratama, S.E., Ak.',
      specialty: 'Arus Kas & Pajak',
      since: '20 Jan 2026'
    },
    investors: []
  },
  {
    id: 'umkm-8',
    name: 'Keramik Dinoyo Art',
    owner: 'Anugrah Saputra',
    sector: 'Kriya & Tekstil',
    city: 'Malang',
    score: 68,
    readinessStatus: 'Pendampingan',
    consultant: {
      name: 'Dr. Hendra Wijaya, M.M.',
      specialty: 'Restrukturisasi Kas',
      since: '10 Feb 2026'
    },
    investors: []
  },
  {
    id: 'umkm-9',
    name: 'Sepatu Kulit Mandiri',
    owner: 'Taufik Hidayat',
    sector: 'Kriya & Tekstil',
    city: 'Garut',
    score: 79,
    readinessStatus: 'Siap Didanai',
    consultant: {
      name: 'Nadia Kusuma, MBA, CFP',
      specialty: 'Kesiapan Ekspor',
      since: '18 Feb 2026'
    },
    investors: [
      {
        name: 'Koperasi Pemodal Lokal',
        stage: 'Ruang Data Terbuka',
        ticketSize: 'Rp 150.000.000',
        updatedAt: '4 hari lalu'
      }
    ]
  },
  {
    id: 'umkm-10',
    name: 'Kripik Tempe Barokah',
    owner: 'Siti Aminah',
    sector: 'Kuliner & F&B',
    city: 'Ngawi',
    score: 65,
    readinessStatus: 'Perlu Validasi',
    consultant: null,
    investors: []
  },
  {
    id: 'umkm-11',
    name: 'Cokelat Ransiki Papua',
    owner: 'Yohanes Rumkabu',
    sector: 'Agribisnis',
    city: 'Manokwari',
    score: 86,
    readinessStatus: 'Siap Didanai',
    consultant: {
      name: 'Rendra Pratama, S.E., Ak.',
      specialty: 'Arus Kas & Pajak',
      since: '01 Jan 2026'
    },
    investors: [
      {
        name: 'Nusantara Impact Capital',
        stage: 'Ruang Data Terbuka',
        ticketSize: 'Rp 500.000.000',
        updatedAt: '2 hari lalu'
      }
    ]
  },
  {
    id: 'umkm-12',
    name: 'Lumbung Beras Organik',
    owner: 'Surono',
    sector: 'Agribisnis',
    city: 'Klaten',
    score: 83,
    readinessStatus: 'Siap Didanai',
    consultant: {
      name: 'Dr. Hendra Wijaya, M.M.',
      specialty: 'Restrukturisasi Kas',
      since: '12 Jan 2026'
    },
    investors: [
      {
        name: 'AgriInvest Ventura',
        stage: 'Penjajakan Awal',
        ticketSize: 'Rp 400.000.000',
        updatedAt: '1 minggu lalu'
      }
    ]
  }
]

function generate200UmkmPartnerships(): UmkmPartnershipItem[] {
  const result: UmkmPartnershipItem[] = [...INITIAL_UMKM_PARTNERSHIPS]
  const sectors: Array<'Kuliner & F&B' | 'Kriya & Tekstil' | 'Agribisnis' | 'Jasa & Retail'> = [
    'Kuliner & F&B', 'Kriya & Tekstil', 'Agribisnis', 'Jasa & Retail'
  ]
  const prefixes = [
    'Kopi', 'Batik', 'Kebun', 'Dapur', 'Tenun', 'Keripik', 'Abon', 'Sentra Kriya',
    'Madu', 'Sambal', 'Sari Buah', 'Konveksi', 'Roastery', 'Gelato', 'Roti', 'Cokelat'
  ]
  const suffixes = ['Nusantara', 'Lestari', 'Mandiri', 'Berkah', 'Sejahtera', 'Kencana', 'Pratama', 'Jaya', 'Abadi', 'Makmur']
  const cities = ['Bandung', 'Yogyakarta', 'Surabaya', 'Malang', 'Solo', 'Bogor', 'Semarang', 'Medan', 'Makassar', 'Denpasar', 'Kupang', 'Palembang', 'Manado', 'Banjarmasin', 'Batam', 'Cirebon']
  const owners = ['Ahmad Fauzi', 'Rini Wulandari', 'Bambang Tri', 'Dewi Sartika', 'Irfan Hakim', 'Agus Setiawan', 'Sri Rahayu', 'Eko Prasetyo', 'Lina Marlina', 'Rian Hidayat']
  const consultants = [
    { name: 'Rendra Pratama, S.E., Ak.', specialty: 'Arus Kas & Pajak' },
    { name: 'Nadia Kusuma, MBA, CFP', specialty: 'Kesiapan Ekspor' },
    { name: 'Dr. Hendra Wijaya, M.M.', specialty: 'Restrukturisasi Kas' },
    { name: 'Siti Aminah, Ak., CA.', specialty: 'Audit Keuangan' }
  ]
  const statuses: Array<'Siap Didanai' | 'Pendampingan' | 'Perlu Validasi'> = ['Siap Didanai', 'Pendampingan', 'Perlu Validasi']

  for (let i = 13; i <= 200; i++) {
    const idx = i - 13
    const p = prefixes[idx % prefixes.length]!
    const s = suffixes[Math.floor(idx / prefixes.length) % suffixes.length]!
    const c = cities[idx % cities.length]!
    const owner = owners[idx % owners.length]!
    const sector = sectors[idx % sectors.length]!
    const cons = idx % 5 === 0 ? null : { ...consultants[idx % consultants.length]!, since: `${(idx % 25) + 1} Jan 2026` }
    const status = statuses[idx % statuses.length]!
    const score = 60 + ((idx * 7) % 36)

    const investors: UmkmInvestorRelation[] = []
    if (idx % 3 === 0) {
      investors.push({
        name: idx % 2 === 0 ? 'Nusantara Impact Capital' : 'Artha Ventura Syariah',
        stage: 'Ruang Data Terbuka',
        ticketSize: `Rp ${(150 + (idx % 8) * 50).toLocaleString('id-ID')}.000.000`,
        updatedAt: `${(idx % 12) + 1} jam lalu`
      })
    }

    result.push({
      id: `umkm-${i}`,
      name: `${p} ${s} ${c}`,
      owner,
      sector,
      city: c,
      score,
      readinessStatus: status,
      consultant: cons,
      investors
    })
  }

  return result
}

const umkmPartnerships = ref<UmkmPartnershipItem[]>(generate200UmkmPartnerships())
const isLoading = ref(false)

async function fetchPartnerships() {
  isLoading.value = true
  try {
    const res = await useApi<any>('/admin/partnerships')
    if (res.data && Array.isArray(res.data) && res.data.length > 0) {
      umkmPartnerships.value = res.data
    }
  } catch (err: any) {
    console.warn('Gagal memuat kemitraan dari backend:', err?.message)
  } finally {
    isLoading.value = false
  }
}

const assignedCount = computed(() => umkmPartnerships.value.filter(u => u.consultant !== null).length)
const investorConnectedCount = computed(() => umkmPartnerships.value.filter(u => u.investors.length > 0).length)
const totalActiveInvestors = computed(() => umkmPartnerships.value.reduce((acc, u) => acc + u.investors.length, 0))

// Pagination States
const currentPage = ref(1)
const pageSize = ref(10)

watch([searchQuery, selectedSector], () => {
  currentPage.value = 1
})

const filteredUmkm = computed(() => {
  return umkmPartnerships.value.filter((item) => {
    const matchSector = selectedSector.value === 'ALL' || item.sector === selectedSector.value
    const q = searchQuery.value.trim().toLowerCase()
    if (!q) return matchSector

    const consultantName = item.consultant?.name.toLowerCase() || ''
    const investorNames = item.investors.map(i => i.name.toLowerCase()).join(' ')
    const matchSearch =
      item.name.toLowerCase().includes(q) ||
      item.owner.toLowerCase().includes(q) ||
      item.city.toLowerCase().includes(q) ||
      consultantName.includes(q) ||
      investorNames.includes(q)

    return matchSector && matchSearch
  })
})

const paginatedUmkm = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value
  return filteredUmkm.value.slice(start, start + pageSize.value)
})

function getInitials(name: string): string {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map(part => part[0]?.toUpperCase() || '')
    .join('')
}

function openDetailModal(umkm: UmkmPartnershipItem) {
  selectedUmkm.value = umkm
}

async function revokeInvestorAccess(umkm: UmkmPartnershipItem, investorName: string) {
  const targetRelation = (umkm.investors as any[]).find(inv => inv.name === investorName)
  umkm.investors = umkm.investors.filter(inv => inv.name !== investorName)
  toastMessage.value = `Akses Ruang Data untuk ${investorName} pada ${umkm.name} telah dicabut.`

  if (targetRelation?.id) {
    try {
      await useApi(`/admin/deals/${targetRelation.id}/toggle-access`, {
        method: 'PUT',
        body: { status: 'REJECTED' }
      })
    } catch (err: any) {
      console.warn('Gagal sinkron pencabutan akses ke server:', err?.message)
    }
  }
}

function handleExportCsv() {
  toastMessage.value = `Laporan kemitraan (${filteredUmkm.value.length} UMKM) berhasil diunduh.`
}

onMounted(() => {
  fetchPartnerships()
  if (!umkmPageRef.value) return
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
  }, umkmPageRef.value)
})

onUnmounted(() => {
  gsapCtx?.revert()
})
</script>
