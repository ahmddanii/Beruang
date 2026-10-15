<template>
  <div class="space-y-6 sm:space-y-8 pb-16 font-sans">
    
    <!-- 1. HEADER BANNER: Permintaan Bimbingan Masuk -->
    <div class="p-1.5 sm:p-2 rounded-3xl bg-neutral-200/50 dark:bg-neutral-800/40 border border-neutral-300/40 dark:border-neutral-700/30 shadow-xs">
      <div class="p-6 sm:p-8 rounded-[calc(1.5rem-0.25rem)] bg-white dark:bg-[#13161F] border border-neutral-200/80 dark:border-white/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative overflow-hidden">
        <div class="space-y-2 max-w-2xl relative z-10 text-left">
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0081A0]/10 dark:bg-[#0081A0]/20 text-[#0081A0] dark:text-[#2091AA] text-xs font-bold border border-[#0081A0]/20">
            <span class="w-2 h-2 rounded-full bg-[#0081A0] animate-pulse" />
            <span>Permintaan Pendampingan UMKM</span>
          </div>

          <h1 class="text-2xl sm:text-3xl lg:text-[32px] font-heading font-extrabold text-neutral-900 dark:text-white tracking-tight leading-tight">
            Daftar Permintaan Bimbingan
          </h1>

          <p class="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed font-sans max-w-xl">
            Tinjau profil usaha yang mengajukan kamu sebagai konsultan pendamping. Kamu memiliki kebebasan penuh untuk <strong>menerima</strong> atau <strong>menolak</strong> setiap permintaan bimbingan.
          </p>
        </div>

        <!-- Quick Summary Pill Stats -->
        <div class="flex items-center gap-3 shrink-0">
          <div class="p-3 sm:p-4 rounded-2xl bg-[#F6F8FA] dark:bg-[#1A1D26] border border-[#E2E8F0] dark:border-white/10 text-center min-w-[110px]">
            <span class="text-[11px] font-semibold text-neutral-500 uppercase tracking-wider block">Menunggu</span>
            <span class="text-2xl font-extrabold text-[#0081A0] dark:text-[#2091AA] tabular-nums">
              {{ konsultanStore.pendingRequestsCount }}
            </span>
          </div>
          <div class="p-3 sm:p-4 rounded-2xl bg-[#F6F8FA] dark:bg-[#1A1D26] border border-[#E2E8F0] dark:border-white/10 text-center min-w-[110px]">
            <span class="text-[11px] font-semibold text-neutral-500 uppercase tracking-wider block">Total Binaan</span>
            <span class="text-2xl font-extrabold text-[#00AA13] dark:text-[#22C55E] tabular-nums">
              {{ konsultanStore.activeClientsCount }}
            </span>
          </div>
        </div>
      </div>
    </div>

    <!-- 2. FILTER & SEARCH CONTROL BAR -->
    <div class="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
      <!-- Filter Tabs -->
      <div class="flex items-center p-1 rounded-full bg-neutral-100/90 dark:bg-[#13161F] border border-neutral-200/80 dark:border-white/10 overflow-x-auto scrollbar-none shadow-2xs">
        <button
          v-for="f in filterTabs"
          :key="f.key"
          type="button"
          :class="[
            'px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-150 cursor-pointer flex items-center gap-1.5',
            selectedFilter === f.key
              ? 'bg-white dark:bg-[#1A1D26] text-[#0081A0] dark:text-[#2091AA] font-bold shadow-xs border border-neutral-200/60 dark:border-white/10'
              : 'text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
          ]"
          @click="selectedFilter = f.key"
        >
          <span>{{ f.label }}</span>
          <span
            v-if="f.count > 0"
            :class="[
              'px-1.5 py-0.2 rounded-full text-[10px] tabular-nums',
              selectedFilter === f.key
                ? 'bg-[#0081A0]/10 text-[#0081A0] dark:bg-[#0081A0]/20 dark:text-[#2091AA]'
                : 'bg-neutral-200 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400'
            ]"
          >
            {{ f.count }}
          </span>
        </button>
      </div>

      <!-- Search Input -->
      <div class="relative w-full sm:w-72">
        <div class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-400">
          <HugeiconsIcon :icon="Search01Icon" :size="16" :stroke-width="2" />
        </div>
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Cari nama usaha atau pemilik..."
          class="w-full pl-10 pr-4 py-2 rounded-full border border-neutral-200 dark:border-white/10 bg-white dark:bg-[#13161F] text-xs sm:text-sm text-neutral-900 dark:text-white placeholder:text-neutral-400 focus:outline-none focus:border-[#0081A0] focus:ring-2 focus:ring-[#0081A0]/20"
        />
      </div>
    </div>

    <!-- 3. REQUEST CARDS LIST -->
    <div v-if="filteredRequests.length > 0" class="space-y-4">
      <div
        v-for="req in filteredRequests"
        :key="req.id"
        class="card-tactile-gopay p-5 sm:p-6 rounded-3xl transition-all duration-200 text-left relative overflow-hidden"
      >
        <div class="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-5">
          <!-- Left: Business Info & Founder -->
          <div class="flex items-start gap-4 flex-1 min-w-0">
            <!-- Business Avatar Icon -->
            <div class="w-13 h-13 rounded-2xl bg-white dark:bg-[#1A1D26] border border-[#E2E8F0] dark:border-white/10 flex items-center justify-center text-[#0081A0] dark:text-[#2091AA] shadow-2xs shrink-0 mt-0.5">
              <HugeiconsIcon :icon="Store01Icon" :size="26" :stroke-width="1.8" />
            </div>

            <!-- Business Meta -->
            <div class="space-y-1 min-w-0 flex-1">
              <div class="flex items-center gap-2 flex-wrap">
                <h3 class="font-heading font-extrabold text-base sm:text-lg text-neutral-900 dark:text-white truncate">
                  {{ req.businessName }}
                </h3>
                
                <!-- Status Badge -->
                <span
                  v-if="req.status === 'PENDING'"
                  class="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/10 text-amber-700 dark:text-amber-300 border border-amber-500/20"
                >
                  <span class="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                  <span>Menunggu Konfirmasi</span>
                </span>
                <span
                  v-else-if="req.status === 'ACCEPTED'"
                  class="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#00AA13]/10 text-[#00AA13] dark:text-[#22C55E] border border-[#00AA13]/20"
                >
                  <HugeiconsIcon :icon="CheckmarkCircle01Icon" :size="12" :stroke-width="2.2" />
                  <span>Diterima Menjadi Binaan</span>
                </span>
                <span
                  v-else
                  class="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-red-500/10 text-red-600 dark:text-red-400 border border-red-500/20"
                >
                  <HugeiconsIcon :icon="Cancel01Icon" :size="12" :stroke-width="2.2" />
                  <span>Permintaan Ditolak</span>
                </span>
              </div>

              <!-- Owner & Location Metadata -->
              <div class="flex items-center gap-2 text-xs text-neutral-500 dark:text-neutral-400 flex-wrap">
                <span>Pemilik: <strong class="text-neutral-700 dark:text-neutral-200">{{ req.ownerName }}</strong></span>
                <span>•</span>
                <span>Bidang: {{ req.sector }}</span>
                <span>•</span>
                <span>Kota: {{ req.city }}</span>
                <span>•</span>
                <span class="text-neutral-400">Diajukan: {{ req.requestedAt }}</span>
              </div>

              <!-- Note / Message from Founder -->
              <div class="mt-2.5 p-3 rounded-2xl bg-white/70 dark:bg-[#1A1D26]/70 border border-neutral-200/70 dark:border-white/10 text-xs text-neutral-700 dark:text-neutral-300 leading-relaxed font-sans">
                <span class="font-bold text-neutral-900 dark:text-white">Pesan Pengajuan: </span>
                <span>"{{ req.message }}"</span>
              </div>

              <!-- Rejection Reason if any -->
              <div v-if="req.status === 'REJECTED' && req.rejectionReason" class="mt-2 text-xs text-red-600 dark:text-red-400 font-medium">
                Alasan penolakan: {{ req.rejectionReason }}
              </div>
            </div>
          </div>

          <!-- Right: Key Financial Health Chips & Action Buttons -->
          <div class="flex flex-col sm:flex-row lg:flex-col items-start sm:items-center lg:items-end justify-between gap-3 shrink-0 w-full lg:w-auto pt-3 lg:pt-0 border-t lg:border-t-0 border-neutral-200/60 dark:border-neutral-800">
            <!-- Metric Chips -->
            <div class="flex items-center gap-2">
              <div class="px-3 py-1.5 rounded-xl bg-white dark:bg-[#1A1D26] border border-neutral-200/80 dark:border-white/10 text-left">
                <span class="block text-[10px] text-neutral-400 uppercase font-bold">Omzet/Bulan</span>
                <span class="text-xs font-extrabold text-neutral-900 dark:text-white tabular-nums">
                  Rp {{ (req.revenue / 1000000).toFixed(0) }} Juta
                </span>
              </div>
              <div class="px-3 py-1.5 rounded-xl bg-white dark:bg-[#1A1D26] border border-neutral-200/80 dark:border-white/10 text-left">
                <span class="block text-[10px] text-neutral-400 uppercase font-bold">Skor Bisnis</span>
                <span class="text-xs font-extrabold text-emerald-600 dark:text-emerald-400 tabular-nums">
                  {{ req.healthScore }}/100
                </span>
              </div>
            </div>

            <!-- Actions Buttons -->
            <div class="flex items-center gap-2 w-full sm:w-auto justify-end">
              <!-- If PENDING: Terima or Tolak -->
              <template v-if="req.status === 'PENDING'">
                <button
                  type="button"
                  class="px-4 py-2 rounded-full border border-neutral-200 dark:border-neutral-700 hover:border-red-400 hover:text-red-600 text-neutral-600 dark:text-neutral-400 text-xs font-bold transition-all cursor-pointer bg-white dark:bg-[#1A1D26]"
                  @click="openRejectModal(req)"
                >
                  Tolak
                </button>
                <button
                  type="button"
                  class="px-5 py-2 rounded-full bg-[#0081A0] hover:bg-[#00708C] text-white text-xs font-bold shadow-[0_4px_12px_rgba(0,129,160,0.25)] transition-all active:scale-[0.98] cursor-pointer flex items-center gap-1.5"
                  @click="handleAccept(req)"
                >
                  <HugeiconsIcon :icon="CheckmarkCircle01Icon" :size="14" :stroke-width="2.2" />
                  <span>Terima Permintaan</span>
                </button>
              </template>

              <!-- If ACCEPTED: Shortcut to Klien Binaan or Action Plan -->
              <template v-else-if="req.status === 'ACCEPTED'">
                <NuxtLink
                  to="/konsultan"
                  class="px-4 py-2 rounded-full border border-neutral-200 dark:border-neutral-700 hover:border-[#0081A0] text-neutral-700 dark:text-neutral-200 text-xs font-bold transition-all bg-white dark:bg-[#1A1D26] flex items-center gap-1"
                >
                  <span>Buka di Daftar Binaan</span>
                  <HugeiconsIcon :icon="ArrowRight01Icon" :size="13" :stroke-width="2" />
                </NuxtLink>
                <NuxtLink
                  :to="`/konsultan/rencana-aksi?client=${req.umkmId}`"
                  class="px-4 py-2 rounded-full bg-[#0081A0] hover:bg-[#00708C] text-white text-xs font-bold shadow-xs transition-all active:scale-[0.98] flex items-center gap-1.5"
                >
                  <HugeiconsIcon :icon="Task01Icon" :size="14" :stroke-width="2" />
                  <span>Beri Action Plan</span>
                </NuxtLink>
              </template>

              <!-- If REJECTED -->
              <template v-else>
                <button
                  type="button"
                  class="px-4 py-2 rounded-full border border-neutral-200 dark:border-neutral-700 hover:border-[#0081A0] hover:text-[#0081A0] text-neutral-500 text-xs font-bold transition-all bg-white dark:bg-[#1A1D26] cursor-pointer"
                  @click="handleReconsider(req)"
                >
                  Tinjau Ulang
                </button>
              </template>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Empty State -->
    <div
      v-else
      class="p-12 rounded-3xl bg-white dark:bg-[#13161F] border border-neutral-200/80 dark:border-white/10 text-center space-y-3"
    >
      <div class="w-14 h-14 rounded-2xl bg-[#0081A0]/10 text-[#0081A0] flex items-center justify-center mx-auto">
        <HugeiconsIcon :icon="UserAdd01Icon" :size="26" :stroke-width="1.8" />
      </div>
      <h3 class="font-heading font-bold text-base text-neutral-900 dark:text-white">
        Tidak Ada Permintaan Bimbingan
      </h3>
      <p class="text-xs text-neutral-500 max-w-sm mx-auto">
        {{ selectedFilter !== 'ALL' ? 'Tidak ada data permintaan pada kategori filter ini.' : 'Belum ada pengajuan bimbingan baru dari pelaku UMKM.' }}
      </p>
    </div>

    <!-- ===================================================================== -->
    <!-- MODAL: KONFIRMASI TOLAK PERMINTAAN                                    -->
    <!-- ===================================================================== -->
    <BModal
      v-model="showRejectModal"
      size="md"
      title="Tolak Permintaan Bimbingan"
    >
      <div class="space-y-4 text-left py-2">
        <p class="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed">
          Apakah kamu yakin ingin menolak permohonan bimbingan dari <strong class="text-neutral-900 dark:text-white">{{ activeRequestModal?.businessName }}</strong>?
        </p>

        <div class="space-y-1.5">
          <label class="block text-xs font-bold uppercase tracking-wider text-neutral-600 dark:text-neutral-400">
            Alasan Penolakan (Opsional)
          </label>
          <select
            v-model="rejectReason"
            class="w-full px-3.5 py-2.5 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-[#1A1D26] text-xs sm:text-sm text-neutral-900 dark:text-white focus:outline-none focus:border-[#0081A0]"
          >
            <option value="Kapasitas kuota bimbingan konsultan saat ini sedang penuh.">Kapasitas kuota bimbingan penuh</option>
            <option value="Bidang usaha di luar spesialisasi keahlian konsultan.">Bidang usaha di luar spesialisasi</option>
            <option value="Lokasi operasional di luar jangkauan pendampingan.">Lokasi di luar jangkauan pendampingan</option>
            <option value="Data pencatatan kas awal belum memenuhi kriteria minimum.">Data kas awal belum memenuhi kriteria</option>
          </select>
        </div>
      </div>

      <template #footer>
        <button
          type="button"
          class="px-4 py-2 rounded-full border border-neutral-200 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800 text-xs font-bold text-neutral-700 dark:text-neutral-300 transition-colors cursor-pointer"
          @click="showRejectModal = false"
        >
          Batal
        </button>
        <button
          type="button"
          class="px-5 py-2 rounded-full bg-red-600 hover:bg-red-700 text-white text-xs font-bold shadow-xs transition-colors cursor-pointer"
          @click="confirmReject"
        >
          Ya, Tolak Permintaan
        </button>
      </template>
    </BModal>

    <!-- ===================================================================== -->
    <!-- MODAL: SUKSES MENERIMA PERMINTAAN                                     -->
    <!-- ===================================================================== -->
    <BModal
      v-model="showSuccessModal"
      size="md"
      title="Permintaan Berhasil Diterima"
    >
      <div class="space-y-4 text-center py-3">
        <div class="w-14 h-14 rounded-full bg-[#00AA13]/10 text-[#00AA13] flex items-center justify-center mx-auto shadow-2xs">
          <HugeiconsIcon :icon="CheckmarkCircle01Icon" :size="30" :stroke-width="2.2" />
        </div>

        <div>
          <h3 class="font-heading font-extrabold text-lg text-neutral-900 dark:text-white">
            {{ activeRequestModal?.businessName }} Resmi Menjadi Binaanmu!
          </h3>
          <p class="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 mt-1 max-w-sm mx-auto leading-relaxed">
            Usaha ini otomatis ditambahkan ke <strong>Daftar Klien Binaan</strong>. Kamu sekarang bisa membuat rencana aksi perbaikan untuk membimbing usahanya.
          </p>
        </div>
      </div>

      <template #footer>
        <button
          type="button"
          class="px-4 py-2 rounded-full border border-neutral-200 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800 text-xs font-bold text-neutral-700 dark:text-neutral-300 transition-colors cursor-pointer"
          @click="showSuccessModal = false"
        >
          Tutup
        </button>
        <NuxtLink
          :to="`/konsultan/rencana-aksi?client=${activeRequestModal?.umkmId}`"
          class="px-5 py-2 rounded-full bg-[#0081A0] hover:bg-[#00708C] text-white text-xs font-bold shadow-xs transition-all active:scale-[0.98] flex items-center gap-1.5"
          @click="showSuccessModal = false"
        >
          <HugeiconsIcon :icon="Task01Icon" :size="14" :stroke-width="2" />
          <span>Beri Action Plan Sekarang</span>
        </NuxtLink>
      </template>
    </BModal>

  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useKonsultanStore, type ClientMentorshipRequest } from '~/stores/konsultan'
import BModal from '~/components/base/BModal.vue'
import { HugeiconsIcon } from '@hugeicons/vue'
import {
  UserAdd01Icon,
  Store01Icon,
  Search01Icon,
  CheckmarkCircle01Icon,
  Cancel01Icon,
  Task01Icon,
  ArrowRight01Icon
} from '@hugeicons/core-free-icons'

definePageMeta({
  layout: 'dashboard'
})

const konsultanStore = useKonsultanStore()

const selectedFilter = ref<'ALL' | 'PENDING' | 'ACCEPTED' | 'REJECTED'>('ALL')
const searchQuery = ref('')

const showRejectModal = ref(false)
const showSuccessModal = ref(false)
const activeRequestModal = ref<ClientMentorshipRequest | null>(null)
const rejectReason = ref('Kapasitas kuota bimbingan konsultan saat ini sedang penuh.')

const filterTabs = computed(() => [
  { key: 'ALL' as const, label: 'Semua', count: konsultanStore.clientRequests.length },
  { key: 'PENDING' as const, label: 'Menunggu Konfirmasi', count: konsultanStore.clientRequests.filter(r => r.status === 'PENDING').length },
  { key: 'ACCEPTED' as const, label: 'Diterima', count: konsultanStore.clientRequests.filter(r => r.status === 'ACCEPTED').length },
  { key: 'REJECTED' as const, label: 'Ditolak', count: konsultanStore.clientRequests.filter(r => r.status === 'REJECTED').length }
])

const filteredRequests = computed(() => {
  return konsultanStore.clientRequests.filter(req => {
    const matchFilter = selectedFilter.value === 'ALL' || req.status === selectedFilter.value
    const q = searchQuery.value.toLowerCase().trim()
    const matchQuery = !q ||
      req.businessName.toLowerCase().includes(q) ||
      req.ownerName.toLowerCase().includes(q) ||
      req.city.toLowerCase().includes(q) ||
      req.sector.toLowerCase().includes(q)

    return matchFilter && matchQuery
  })
})

function handleAccept(req: ClientMentorshipRequest) {
  activeRequestModal.value = req
  konsultanStore.acceptRequest(req.id)
  showSuccessModal.value = true
}

function openRejectModal(req: ClientMentorshipRequest) {
  activeRequestModal.value = req
  rejectReason.value = 'Kapasitas kuota bimbingan konsultan saat ini sedang penuh.'
  showRejectModal.value = true
}

function confirmReject() {
  if (activeRequestModal.value) {
    konsultanStore.rejectRequest(activeRequestModal.value.id, rejectReason.value)
    showRejectModal.value = false
  }
}

function handleReconsider(req: ClientMentorshipRequest) {
  req.status = 'PENDING'
}
</script>
