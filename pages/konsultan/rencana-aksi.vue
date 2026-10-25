<template>
  <div class="space-y-6 sm:space-y-8 pb-16 font-sans">
    
    <!-- 1. HEADER CARD -->
    <div class="card-tactile-gopay rounded-3xl p-6 sm:p-7 text-left">
      <div class="space-y-1">
        <h1 class="text-xl sm:text-2xl font-poppins font-bold text-neutral-900 dark:text-white">
          Rencana Aksi Bimbingan UMKM
        </h1>
        <p class="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 max-w-2xl">
          Kelola daftar tugas terstruktur, pantau progres eksekusi klien, dan beri arahan taktis untuk mempercepat kesiapan pembiayaan usahanya.
        </p>
      </div>
    </div>

    <!-- 2. QUICK TELEMETRY STATS CARDS (Menggunakan Style BMetricBannerCard Dashboard) -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-stretch">
      <!-- Total Aksi -->
      <BMetricBannerCard
        title="TOTAL AKSI"
        :icon="Task01Icon"
        :value="totalPlansCount"
        unit="Aksi"
        subtitle="Cakupan"
        subvalue="Semua Binaan"
        subvalue-color="blue"
        class="cursor-pointer transition-all duration-150 hover:-translate-y-0.5 active:translate-y-0"
        @click="selectedStatus = 'ALL'"
      />

      <!-- Menunggu Mulai -->
      <BMetricBannerCard
        title="MENUNGGU MULAI"
        :icon="Clock01Icon"
        :value="todoPlansCount"
        unit="Aksi"
        subtitle="Status"
        subvalue="Belum Mulai"
        subvalue-color="neutral"
        class="cursor-pointer transition-all duration-150 hover:-translate-y-0.5 active:translate-y-0"
        @click="selectedStatus = 'TODO'"
      />

      <!-- Sedang Berjalan -->
      <BMetricBannerCard
        title="SEDANG BERJALAN"
        :icon="AnalyticsUpIcon"
        :value="inProgressPlansCount"
        unit="Aksi"
        subtitle="Status"
        subvalue="Sedang Jalan"
        subvalue-color="amber"
        class="cursor-pointer transition-all duration-150 hover:-translate-y-0.5 active:translate-y-0"
        @click="selectedStatus = 'IN_PROGRESS'"
      />

      <!-- Selesai Terverifikasi -->
      <BMetricBannerCard
        title="SELESAI TERVERIFIKASI"
        :icon="CheckmarkCircle01Icon"
        :value="donePlansCount"
        unit="Aksi"
        subtitle="Status"
        subvalue="Tuntas"
        subvalue-color="green"
        class="cursor-pointer transition-all duration-150 hover:-translate-y-0.5 active:translate-y-0"
        @click="selectedStatus = 'DONE'"
      />
    </div>

    <!-- 3. CONTROLS TOOLBAR (Search, Filter Dropdowns, & Tombol Action Plan Di Bawah Cards) -->
    <div class="card-tactile-gopay rounded-2xl p-3 sm:p-3.5">
      <div class="flex flex-col xl:flex-row items-stretch xl:items-center gap-2.5">
        <!-- 1. Search Field (Lebar fleksibel) -->
        <div class="relative flex-1 min-w-[180px]">
          <div class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-400">
            <HugeiconsIcon :icon="Search01Icon" :size="16" :stroke-width="1.8" />
          </div>
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Cari langkah aksi, klien, atau topik..."
            class="w-full pl-10 pr-4 py-2.5 rounded-xl text-xs sm:text-sm bg-white dark:bg-[#18191E] border border-neutral-300 dark:border-neutral-700 text-neutral-900 dark:text-white placeholder-neutral-400 focus:outline-none focus:ring-1 focus:ring-[#0081A0] transition-colors"
          />
        </div>

        <!-- 2. Dropdown Filter Pilar -->
        <div class="relative shrink-0 w-full sm:w-auto xl:w-40">
          <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-neutral-400">
            <HugeiconsIcon :icon="FilterIcon" :size="15" :stroke-width="2" />
          </div>
          <select
            v-model="selectedPillar"
            class="w-full pr-7 py-2.5 rounded-xl text-xs sm:text-sm font-poppins font-medium border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-[#18191E] text-neutral-800 dark:text-neutral-100 focus:outline-none focus:ring-1 focus:ring-[#0081A0] transition-colors appearance-none cursor-pointer"
            style="padding-left: 2.15rem;"
          >
            <option value="ALL">Semua Pilar</option>
            <option value="Keuangan">Pilar Keuangan</option>
            <option value="Operasional">Pilar Operasional</option>
            <option value="Legalitas">Pilar Legalitas</option>
            <option value="Pemasaran">Pilar Pemasaran</option>
            <option value="SDM">Pilar SDM</option>
          </select>
          <div class="absolute inset-y-0 right-0 pr-2.5 flex items-center pointer-events-none text-neutral-400">
            <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>

        <!-- 3. Dropdown Filter Status -->
        <div class="relative shrink-0 w-full sm:w-auto xl:w-36">
          <select
            v-model="selectedStatus"
            class="w-full pl-3 pr-7 py-2.5 rounded-xl text-xs sm:text-sm font-poppins font-medium border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-[#18191E] text-neutral-800 dark:text-neutral-100 focus:outline-none focus:ring-1 focus:ring-[#0081A0] transition-colors appearance-none cursor-pointer"
          >
            <option value="ALL">Semua Status</option>
            <option value="TODO">Belum Mulai</option>
            <option value="IN_PROGRESS">Sedang Proses</option>
            <option value="DONE">Selesai</option>
          </select>
          <div class="absolute inset-y-0 right-0 pr-2.5 flex items-center pointer-events-none text-neutral-400">
            <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>

        <!-- 4. Tindakan Nambah (+ Beri Action Plan Baru) -->
        <div class="flex items-center shrink-0 w-full xl:w-auto">
          <button
            type="button"
            class="w-full xl:w-auto px-4 py-2.5 rounded-xl text-xs sm:text-sm font-poppins font-semibold bg-[#0081A0] hover:bg-[#00708C] text-white transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-2xs whitespace-nowrap active:scale-[0.98]"
            @click="openAddModal()"
          >
            <HugeiconsIcon :icon="Add01Icon" :size="15" :stroke-width="2.2" />
            <span>Beri Action Plan Baru</span>
          </button>
        </div>
      </div>
    </div>

    <!-- 4. ACTION PLAN CARDS LIST (Aestetik Roadmap Task Cards) -->
    <div v-if="filteredPlans.length > 0" class="space-y-4">
      <div
        v-for="plan in filteredPlans"
        :key="plan.id"
        class="card-tactile-gopay rounded-3xl p-5 sm:p-6 space-y-3.5 border border-neutral-200/80 dark:border-neutral-800/80 bg-white dark:bg-[#13161F] text-left transition-all hover:border-neutral-300 dark:hover:border-neutral-700"
      >
        <!-- Top Row: Client Link, Pilar, Priority, Target Date, Status Toggle, Delete -->
        <div class="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-neutral-100 dark:border-neutral-800 gap-3">
          <div class="flex items-center gap-2 flex-wrap">
            <!-- Client Pill Link -->
            <NuxtLink
              :to="`/konsultan/klien/${plan.clientId}`"
              class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white dark:bg-[#18191E] border border-neutral-200/90 dark:border-neutral-700 text-xs font-poppins font-bold text-neutral-800 dark:text-neutral-100 hover:text-[#0081A0] dark:hover:text-[#2091AA] hover:border-[#0081A0]/40 transition-colors shadow-2xs"
            >
              <HugeiconsIcon :icon="Store01Icon" :size="13" :stroke-width="2" class="text-[#0081A0]" />
              <span>{{ plan.clientName }}</span>
            </NuxtLink>

            <!-- Pilar Badge -->
            <span
              :class="[
                'px-2.5 py-0.5 rounded-md text-[10px] sm:text-[11px] font-poppins font-semibold border',
                getPillarClass(plan.pillar)
              ]"
            >
              {{ plan.pillar }}
            </span>

            <!-- Priority Badge -->
            <span
              :class="[
                'px-2.5 py-0.5 rounded-md text-[10px] sm:text-[11px] font-semibold',
                plan.priority === 'Tinggi'
                  ? 'bg-rose-50 text-rose-700 dark:bg-rose-950/40 dark:text-rose-300'
                  : plan.priority === 'Sedang'
                    ? 'bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-300'
                    : 'bg-neutral-100 text-neutral-600 dark:bg-neutral-800 dark:text-neutral-400'
              ]"
            >
              Prioritas {{ plan.priority }}
            </span>
          </div>

          <!-- Right Metadata & Actions -->
          <div class="flex items-center gap-3 text-xs text-neutral-500 self-end sm:self-auto shrink-0">
            <!-- Tenggat / Target Date -->
            <span class="flex items-center gap-1 text-[11px]">
              <HugeiconsIcon :icon="Calendar01Icon" :size="13" />
              <span>Tenggat: <strong class="text-neutral-700 dark:text-neutral-200 font-semibold">{{ plan.targetDate }}</strong></span>
            </span>

            <!-- Status Eksekusi oleh UMKM (Read-Only Monitoring Badge untuk Konsultan) -->
            <div class="flex items-center shrink-0">
              <span
                v-if="plan.status === 'DONE'"
                class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-poppins font-bold bg-emerald-50 text-[#00AA13] dark:bg-emerald-950/60 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800 shadow-2xs"
                title="Telah diselesaikan oleh pelaku usaha"
              >
                <HugeiconsIcon :icon="CheckmarkCircle01Icon" :size="13" :stroke-width="2.5" />
                <span>Selesai Dikerjakan</span>
              </span>
              <span
                v-else-if="plan.status === 'IN_PROGRESS'"
                class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-poppins font-bold bg-amber-50 text-amber-700 dark:bg-amber-950/60 dark:text-amber-400 border border-amber-200 dark:border-amber-800 shadow-2xs"
                title="Sedang dikerjakan oleh pelaku usaha"
              >
                <span class="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                <span>Sedang Dikerjakan</span>
              </span>
              <span
                v-else
                class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-poppins font-semibold bg-neutral-100 text-neutral-600 dark:bg-neutral-800 dark:text-neutral-400 border border-neutral-200 dark:border-neutral-700"
                title="Menunggu tindakan dari pelaku usaha"
              >
                <span class="w-1.5 h-1.5 rounded-full bg-neutral-400" />
                <span>Belum Dimulai</span>
              </span>
            </div>

            <!-- Delete Plan Trigger -->
            <button
              type="button"
              class="text-neutral-400 hover:text-rose-500 p-1 rounded-lg transition-colors cursor-pointer"
              title="Hapus Action Plan"
              @click="confirmDeletePlan(plan)"
            >
              <HugeiconsIcon :icon="Delete02Icon" :size="15" :stroke-width="1.8" />
            </button>
          </div>
        </div>

        <!-- Plan Body: Title & Description -->
        <div class="space-y-2">
          <h2
            :class="[
              'font-poppins font-bold text-base sm:text-lg',
              plan.status === 'DONE' ? 'text-neutral-400 line-through' : 'text-neutral-900 dark:text-white'
            ]"
          >
            {{ plan.title }}
          </h2>

          <p class="text-xs sm:text-[13px] text-neutral-600 dark:text-neutral-400 leading-relaxed font-sans">
            {{ plan.description }}
          </p>

          <!-- Catatan Bimbingan Box -->
          <div
            v-if="plan.consultantNotes"
            class="mt-2.5 p-3 rounded-xl bg-sky-50/70 dark:bg-sky-950/20 border border-sky-100 dark:border-sky-900/40 flex items-start gap-2.5 text-xs text-sky-900 dark:text-sky-200"
          >
            <HugeiconsIcon :icon="NoteIcon" :size="15" :stroke-width="2" class="text-[#0081A0] shrink-0 mt-0.5" />
            <div class="space-y-0.5">
              <span class="font-poppins font-bold text-[11px] uppercase tracking-wider text-[#0081A0] block">Catatan Konsultan:</span>
              <p class="leading-relaxed">{{ plan.consultantNotes }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Empty State -->
    <div
      v-else
      class="card-tactile-gopay p-12 rounded-3xl text-center space-y-4 max-w-lg mx-auto"
    >
      <div class="w-16 h-16 rounded-full bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center mx-auto text-neutral-400">
        <HugeiconsIcon :icon="Task01Icon" :size="32" :stroke-width="1.8" />
      </div>
      <div class="space-y-1">
        <h3 class="font-poppins font-bold text-base text-neutral-900 dark:text-white">
          Tidak Ada Action Plan Ditemukan
        </h3>
        <p class="text-xs text-neutral-500 dark:text-neutral-400">
          Belum ada langkah aksi yang cocok dengan pencarian atau filter yang dipilih. Silakan ubah filter atau buat action plan baru.
        </p>
      </div>
      <button
        type="button"
        class="px-4 py-2.5 rounded-xl bg-[#0081A0] hover:bg-[#00708C] text-white font-poppins font-semibold text-xs shadow-2xs transition-all cursor-pointer inline-flex items-center gap-1.5 active:scale-[0.98]"
        @click="openAddModal()"
      >
        <HugeiconsIcon :icon="Add01Icon" :size="14" :stroke-width="2.2" />
        <span>Beri Action Plan Baru</span>
      </button>
    </div>

    <!-- 4. MODAL: TAMBAH ACTION PLAN BARU (BModal Standard) -->
    <BModal
      v-model="isAddModalOpen"
      title="Beri Action Plan Baru"
      subtitle="Instruksikan langkah konkret bagi UMKM binaanmu untuk mempercepat kesiapan usahanya."
      size="lg"
    >
      <form @submit.prevent="handleSubmitPlan" class="space-y-4 text-left">
        <!-- Pilih Klien UMKM -->
        <div>
          <label class="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1 font-poppins">
            Pilih Klien UMKM Binaan <span class="text-rose-500">*</span>
          </label>
          <select
            v-model="newPlanForm.clientId"
            required
            class="w-full px-3.5 py-2.5 rounded-xl text-xs border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-[#0081A0] cursor-pointer"
          >
            <option value="" disabled>-- Pilih UMKM Binaan --</option>
            <option v-for="c in konsultanStore.clients" :key="c.id" :value="c.id">
              {{ c.name }} • Founder: {{ c.owner }} ({{ c.sector }})
            </option>
          </select>
        </div>

        <!-- Judul Action Plan -->
        <div>
          <label class="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1 font-poppins">
            Judul Tugas / Rencana Aksi <span class="text-rose-500">*</span>
          </label>
          <input
            v-model="newPlanForm.title"
            type="text"
            required
            placeholder="Contoh: Pisahkan Rekening Usaha & Daftarkan NIB"
            class="w-full px-3.5 py-2.5 rounded-xl text-xs border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white placeholder-neutral-400 focus:outline-none focus:ring-1 focus:ring-[#0081A0]"
          />
        </div>

        <!-- Pilar & Prioritas (2 columns) -->
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label class="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1 font-poppins">
              Pilar Bisnis <span class="text-rose-500">*</span>
            </label>
            <select
              v-model="newPlanForm.pillar"
              required
              class="w-full px-3 py-2.5 rounded-xl text-xs border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-[#0081A0] cursor-pointer"
            >
              <option value="Keuangan">Finansial / Keuangan</option>
              <option value="Operasional">Operasional & Standar Mutu</option>
              <option value="Legalitas">Legalitas & Sertifikasi</option>
              <option value="Pemasaran">Pemasaran & Saluran Penjualan</option>
              <option value="SDM">SDM & Struktur Tim</option>
            </select>
          </div>

          <div>
            <label class="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1 font-poppins">
              Tingkat Prioritas <span class="text-rose-500">*</span>
            </label>
            <select
              v-model="newPlanForm.priority"
              required
              class="w-full px-3 py-2.5 rounded-xl text-xs border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-[#0081A0] cursor-pointer"
            >
              <option value="Tinggi">Tinggi (Mendesak & Kritis)</option>
              <option value="Sedang">Sedang (Penting Bertahap)</option>
              <option value="Rendah">Rendah (Penyempurnaan)</option>
            </select>
          </div>
        </div>

        <!-- Target Tanggal Selesai -->
        <div>
          <label class="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1 font-poppins">
            Target Tanggal Selesai <span class="text-rose-500">*</span>
          </label>
          <input
            v-model="newPlanForm.targetDate"
            type="text"
            required
            placeholder="Contoh: 30 Okt 2026 atau 2 Minggu ke Depan"
            class="w-full px-3.5 py-2.5 rounded-xl text-xs border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white placeholder-neutral-400 focus:outline-none focus:ring-1 focus:ring-[#0081A0]"
          />
        </div>

        <!-- Deskripsi Langkah Aksi -->
        <div>
          <label class="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1 font-poppins">
            Panduan Langkah Aksi untuk UMKM <span class="text-rose-500">*</span>
          </label>
          <textarea
            v-model="newPlanForm.description"
            rows="3"
            required
            placeholder="Tuliskan petunjuk teknis yang jelas agar pemilik usaha mengerti apa yang harus dieksekusi..."
            class="w-full px-3.5 py-2.5 rounded-xl text-xs border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white placeholder-neutral-400 focus:outline-none focus:ring-1 focus:ring-[#0081A0] resize-none"
          />
        </div>

        <!-- Catatan Khusus Konsultan -->
        <div>
          <label class="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1 font-poppins">
            Catatan Khusus Konsultan (Opsional)
          </label>
          <input
            v-model="newPlanForm.consultantNotes"
            type="text"
            placeholder="Misal: Format form kas sudah dikirimkan via WhatsApp"
            class="w-full px-3.5 py-2 rounded-xl text-xs border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white placeholder-neutral-400 focus:outline-none focus:ring-1 focus:ring-[#0081A0]"
          />
        </div>
      </form>

      <template #footer="{ close }">
        <button
          type="button"
          class="px-4 py-2 rounded-xl text-xs font-poppins font-semibold border border-neutral-300 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors cursor-pointer"
          @click="close"
        >
          Batal
        </button>
        <button
          type="button"
          class="px-4 py-2 rounded-xl text-xs font-poppins font-semibold bg-[#0081A0] hover:bg-[#00708C] text-white transition-all cursor-pointer shadow-2xs active:scale-[0.98]"
          @click="handleSubmitPlan"
        >
          Tugaskan Action Plan
        </button>
      </template>
    </BModal>

    <!-- 5. TOAST NOTIFICATION -->
    <Teleport to="body">
      <div
        v-if="toastMessage"
        class="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-4 py-3 rounded-2xl bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 shadow-2xl border border-neutral-700 dark:border-neutral-200 animate-in slide-in-from-bottom-5 duration-200"
      >
        <HugeiconsIcon :icon="CheckmarkCircle01Icon" :size="20" :stroke-width="2.5" class="text-[#00AA13]" />
        <span class="text-xs sm:text-sm font-semibold">{{ toastMessage }}</span>
      </div>
    </Teleport>

  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useKonsultanStore, type ActionPlanItem } from '~/stores/konsultan'
import BMetricBannerCard from '~/components/base/BMetricBannerCard.vue'
import BModal from '~/components/base/BModal.vue'
import { HugeiconsIcon } from '@hugeicons/vue'
import {
  Task01Icon,
  Add01Icon,
  CheckmarkCircle01Icon,
  Clock01Icon,
  AnalyticsUpIcon,
  Store01Icon,
  Search01Icon,
  Calendar01Icon,
  Delete02Icon,
  NoteIcon,
  FilterIcon
} from '@hugeicons/core-free-icons'

definePageMeta({
  layout: 'dashboard'
})

const konsultanStore = useKonsultanStore()

onMounted(async () => {
  await Promise.all([
    konsultanStore.fetchClients(),
    konsultanStore.fetchActionPlans()
  ])
})

// Filter State
const selectedClientId = ref<string>('ALL')
const selectedStatus = ref<string>('ALL')
const selectedPillar = ref<string>('ALL')
const searchQuery = ref<string>('')

// Telemetry Counts
const totalPlansCount = computed(() => konsultanStore.actionPlans.length)
const todoPlansCount = computed(() => konsultanStore.actionPlans.filter(p => p.status === 'TODO').length)
const inProgressPlansCount = computed(() => konsultanStore.actionPlans.filter(p => p.status === 'IN_PROGRESS').length)
const donePlansCount = computed(() => konsultanStore.actionPlans.filter(p => p.status === 'DONE').length)

// Filtered Action Plans
const filteredPlans = computed(() => {
  return konsultanStore.actionPlans.filter(p => {
    // Filter Client
    if (selectedClientId.value !== 'ALL' && p.clientId !== selectedClientId.value) {
      return false
    }

    // Filter Status
    if (selectedStatus.value !== 'ALL' && p.status !== selectedStatus.value) {
      return false
    }

    // Filter Pillar
    if (selectedPillar.value !== 'ALL' && p.pillar !== selectedPillar.value) {
      return false
    }

    // Search Query
    if (searchQuery.value.trim()) {
      const q = searchQuery.value.toLowerCase()
      const matchTitle = p.title.toLowerCase().includes(q)
      const matchDesc = p.description.toLowerCase().includes(q)
      const matchClient = p.clientName.toLowerCase().includes(q)
      if (!matchTitle && !matchDesc && !matchClient) {
        return false
      }
    }

    return true
  })
})

// Modal & Form State
const isAddModalOpen = ref(false)
const toastMessage = ref('')

const newPlanForm = ref({
  clientId: '',
  title: '',
  description: '',
  pillar: 'Keuangan' as 'Keuangan' | 'Operasional' | 'Legalitas' | 'Pemasaran' | 'SDM',
  priority: 'Tinggi' as 'Tinggi' | 'Sedang' | 'Rendah',
  targetDate: '',
  consultantNotes: ''
})

function openAddModal(clientId?: string) {
  newPlanForm.value = {
    clientId: clientId || (konsultanStore.clients[0]?.id || ''),
    title: '',
    description: '',
    pillar: 'Keuangan',
    priority: 'Tinggi',
    targetDate: '2 Minggu ke Depan',
    consultantNotes: ''
  }
  isAddModalOpen.value = true
}

function handleSubmitPlan() {
  if (!newPlanForm.value.clientId || !newPlanForm.value.title || !newPlanForm.value.description) return

  konsultanStore.addActionPlan({
    clientId: newPlanForm.value.clientId,
    title: newPlanForm.value.title,
    description: newPlanForm.value.description,
    pillar: newPlanForm.value.pillar,
    priority: newPlanForm.value.priority,
    targetDate: newPlanForm.value.targetDate,
    consultantNotes: newPlanForm.value.consultantNotes
  })

  isAddModalOpen.value = false
  showToast('Action Plan berhasil dibuat dan ditugaskan ke klien!')
}

function updateStatus(planId: string, status: 'TODO' | 'IN_PROGRESS' | 'DONE') {
  konsultanStore.updateActionPlanStatus(planId, status)
  showToast(status === 'DONE' ? 'Milestone ditandai selesai!' : 'Status rencana aksi diperbarui')
}

function confirmDeletePlan(plan: ActionPlanItem) {
  if (confirm(`Apakah kamu yakin ingin menghapus action plan "${plan.title}"?`)) {
    konsultanStore.deleteActionPlan(plan.id)
    showToast('Action Plan berhasil dihapus')
  }
}

function showToast(msg: string) {
  toastMessage.value = msg
  setTimeout(() => {
    toastMessage.value = ''
  }, 3500)
}

function getPillarClass(pillar: string) {
  switch (pillar) {
    case 'Keuangan':
    case 'Finansial':
      return 'bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800'
    case 'Operasional':
      return 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800'
    case 'Legalitas':
      return 'bg-purple-50 dark:bg-purple-950/40 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-800'
    case 'Pemasaran':
      return 'bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800'
    case 'SDM':
      return 'bg-teal-50 dark:bg-teal-950/40 text-teal-700 dark:text-teal-300 border-teal-200 dark:border-teal-800'
    default:
      return 'bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 border-neutral-200'
  }
}
</script>

