<template>
  <div class="space-y-8 pb-12 font-sans">
    <!-- Header -->
    <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
      <div>
        <h1 class="text-2xl sm:text-3xl font-heading font-bold text-neutral-900 dark:text-white tracking-tight">
          Peluang Modal & Kesiapan Investasi
        </h1>
        <p class="text-sm sm:text-base text-neutral-600 dark:text-neutral-300 mt-1.5 leading-relaxed">
          Kelola sertifikasi kelayakan pendanaan, tanggapi permintaan investor, dan pantau profil publik usahamu.
        </p>
      </div>

      <div class="flex items-center gap-3">
        <BButton variant="primary" size="md" @click="triggerCelebration">
          Rayakan Kelulusan
        </BButton>
      </div>
    </div>

    <!-- Sub-Tab Navigation -->
    <div class="flex border-b border-border-light dark:border-border-dark gap-2 sm:gap-6 text-sm font-heading font-semibold overflow-x-auto pb-px">
      <button
        type="button"
        :class="[
          'pb-3 border-b-2 transition-all flex items-center gap-2 whitespace-nowrap shrink-0',
          activeTab === 'gate'
            ? 'border-primary-500 text-primary-600 dark:text-primary-400'
            : 'border-transparent text-neutral-500 hover:text-neutral-800 dark:hover:text-white'
        ]"
        @click="activeTab = 'gate'"
      >
        <HugeiconsIcon :icon="Award01Icon" :size="18" :stroke-width="1.75" />
        <span>Status Kesiapan (Funding Gate)</span>
        <span class="inline-flex items-center gap-1 text-xs font-heading font-bold px-2.5 py-0.5 rounded-md bg-emerald-50 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
          Lolos 4/4
        </span>
      </button>

      <button
        type="button"
        :class="[
          'pb-3 border-b-2 transition-all flex items-center gap-2 whitespace-nowrap shrink-0',
          activeTab === 'requests'
            ? 'border-primary-500 text-primary-600 dark:text-primary-400'
            : 'border-transparent text-neutral-500 hover:text-neutral-800 dark:hover:text-white'
        ]"
        @click="activeTab = 'requests'"
      >
        <HugeiconsIcon :icon="UserGroupIcon" :size="18" :stroke-width="1.75" />
        <span>Permintaan Akses Investor</span>
        <span
          v-if="pendingRequestsCount > 0"
          class="text-xs px-2 py-0.5 rounded-md bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 font-bold tabular-nums"
        >
          {{ pendingRequestsCount }} Baru
        </span>
      </button>

      <button
        type="button"
        :class="[
          'pb-3 border-b-2 transition-all flex items-center gap-2 whitespace-nowrap shrink-0',
          activeTab === 'preview'
            ? 'border-primary-500 text-primary-600 dark:text-primary-400'
            : 'border-transparent text-neutral-500 hover:text-neutral-800 dark:hover:text-white'
        ]"
        @click="activeTab = 'preview'"
      >
        <HugeiconsIcon :icon="Store01Icon" :size="18" :stroke-width="1.75" />
        <span>Pratinjau Kartu Marketplace</span>
      </button>
    </div>

    <!-- TAB 1: Funding Gate Status -->
    <div v-if="activeTab === 'gate'" class="space-y-6">
      <!-- Main Hero Card for Ready for Funding -->
      <div class="bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark rounded-3xl p-6 sm:p-8 relative overflow-hidden">
        <div class="flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
          <div class="max-w-xl space-y-3">
            <div class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 text-xs sm:text-sm font-heading font-semibold border border-amber-200 dark:border-amber-800">
              <HugeiconsIcon :icon="Award01Icon" :size="15" :stroke-width="2" />
              <span>Sertifikasi Resmi Beruang</span>
            </div>

            <h2 class="text-2xl sm:text-3xl font-heading font-bold text-neutral-900 dark:text-white tracking-tight">
              Selamat! Bisnis Anda Resmi "Ready for Funding".
            </h2>

            <p class="text-sm sm:text-base text-neutral-700 dark:text-neutral-200 leading-relaxed">
              Konsultan pendamping <strong>{{ umkmStore.profile.consultantName }}</strong> telah memvalidasi seluruh syarat tata kelola dan kesehatan finansial. Profil terkurasi Anda sekarang dapat ditemukan oleh para investor di marketplace.
            </p>

            <div class="pt-2 flex flex-wrap items-center gap-4 text-xs sm:text-sm font-medium">
              <span class="text-neutral-600 dark:text-neutral-400">Tanggal Sertifikasi:</span>
              <span class="text-neutral-900 dark:text-white font-heading font-bold">{{ umkmStore.profile.certifiedAt }}</span>
              <span class="text-neutral-300 dark:text-neutral-700">•</span>
              <span class="text-neutral-600 dark:text-neutral-400">Target Tiket:</span>
              <span class="text-primary-600 dark:text-primary-400 font-heading font-bold tabular-nums">
                Rp {{ umkmStore.profile.fundingTarget.toLocaleString('id-ID') }}
              </span>
            </div>
          </div>

          <div class="shrink-0">
            <SiBeru state="celebrate" size="lg" />
          </div>
        </div>
      </div>

      <!-- 4 Syarat Kelulusan Gate Checklist -->
      <div class="bg-surface-light dark:bg-surface-dark rounded-2xl border border-border-light dark:border-border-dark p-6 sm:p-8 space-y-6">
        <div class="flex items-center justify-between border-b border-border-light dark:border-border-dark pb-4">
          <div>
            <h3 class="font-heading font-bold text-lg sm:text-xl text-neutral-900 dark:text-white">
              Daftar Verifikasi 4 Syarat Gate Kesiapan
            </h3>
            <p class="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 mt-0.5">
              Semua syarat wajib berstatus hijau agar sertifikat tidak mengalami penangguhan.
            </p>
          </div>
          <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-heading font-semibold bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
            <HugeiconsIcon :icon="CheckmarkCircle01Icon" :size="14" :stroke-width="2" />
            <span>4 dari 4 Terpenuhi</span>
          </span>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div
            v-for="req in criteria"
            :key="req.title"
            class="p-4 sm:p-5 rounded-xl border border-emerald-200 dark:border-emerald-800/60 bg-emerald-50/40 dark:bg-emerald-950/20 flex items-start gap-3.5"
          >
            <div class="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center shrink-0 mt-0.5">
              <HugeiconsIcon :icon="CheckmarkCircle01Icon" :size="18" :stroke-width="2" />
            </div>
            <div>
              <h4 class="font-heading font-bold text-base text-neutral-900 dark:text-white">
                {{ req.title }}
              </h4>
              <p class="text-xs sm:text-sm text-neutral-700 dark:text-neutral-300 mt-1 leading-relaxed">
                {{ req.description }}
              </p>
              <span class="inline-block mt-2.5 text-xs font-bold text-emerald-800 dark:text-emerald-300 bg-white dark:bg-neutral-800 px-2.5 py-0.5 rounded-md border border-emerald-200 dark:border-emerald-700">
                {{ req.statusLabel }}
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- Quick Action Cards to other tabs -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <BCard>
          <template #header>
            <h3 class="font-heading font-bold text-base text-neutral-900 dark:text-white flex items-center gap-2">
              <HugeiconsIcon :icon="UserGroupIcon" :size="18" class="text-primary-600" />
              <span>Permintaan Akses Investor Masuk</span>
            </h3>
          </template>
          <p class="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed mb-4">
            Ada <strong>{{ pendingRequestsCount }} investor terverifikasi</strong> yang saat ini menunggu izin darimu untuk membuka data room laporan keuangan privat.
          </p>
          <BButton variant="primary" size="sm" @click="activeTab = 'requests'">
            Tinjau Permintaan Investor ({{ pendingRequestsCount }}) →
          </BButton>
        </BCard>

        <BCard>
          <template #header>
            <h3 class="font-heading font-bold text-base text-neutral-900 dark:text-white flex items-center gap-2">
              <HugeiconsIcon :icon="Store01Icon" :size="18" class="text-primary-600" />
              <span>Keterlihatan di Katalog Publik</span>
            </h3>
          </template>
          <p class="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed mb-4">
            Pastikan profil usahamu terlihat menarik bagi investor dengan rasio margin kotor dan pertumbuhan yang memikat, tanpa membuka angka rupiah riil.
          </p>
          <BButton variant="outline" size="sm" @click="activeTab = 'preview'">
            Lihat Tampilan Kartu Publik →
          </BButton>
        </BCard>
      </div>
    </div>

    <!-- TAB 2: Permintaan Akses Investor -->
    <div v-else-if="activeTab === 'requests'" class="space-y-6">
      <div class="p-4 rounded-xl bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
        Saat Anda menyetujui permintaan, investor hanya dapat membaca berkas laporan dengan watermark digital otomatis berisi identitas akun pemohon.
      </div>

      <div class="space-y-4">
        <BCard
          v-for="req in umkmStore.investorRequests"
          :key="req.id"
          padding="lg"
        >
          <div class="flex flex-col sm:flex-row sm:items-start justify-between gap-5">
            <div class="space-y-3 max-w-2xl">
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-xl bg-primary-100 text-primary-700 dark:bg-primary-950 dark:text-primary-300 font-heading font-bold text-xs flex items-center justify-center border border-primary-200 dark:border-primary-800">
                  {{ req.investorName.slice(0, 2).toUpperCase() }}
                </div>
                <div>
                  <h3 class="font-heading font-bold text-base text-neutral-900 dark:text-white">
                    {{ req.investorName }}
                  </h3>
                  <p class="text-xs text-neutral-500 font-medium">
                    {{ req.firmName }} • Diajukan pada {{ req.requestedAt }}
                  </p>
                </div>
              </div>

              <div class="p-4 rounded-xl bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark text-sm text-neutral-700 dark:text-neutral-200 leading-relaxed italic">
                "{{ req.introMessage }}"
              </div>

              <div class="flex flex-wrap items-center gap-3.5 text-xs sm:text-sm pt-1">
                <span class="text-neutral-600 dark:text-neutral-400 font-medium">Rencana Nilai Tiket:</span>
                <span class="font-heading font-bold text-emerald-600 dark:text-emerald-400 tabular-nums">
                  Rp {{ req.proposedTicket.toLocaleString('id-ID') }}
                </span>
                <span class="text-neutral-300 dark:text-neutral-700">•</span>
                <span class="text-neutral-600 dark:text-neutral-400 font-medium">Status:</span>
                <span
                  :class="[
                    'text-xs font-heading font-semibold px-2.5 py-0.5 rounded-md border',
                    req.status === 'APPROVED'
                      ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800'
                      : req.status === 'REJECTED'
                      ? 'bg-red-50 dark:bg-red-950/60 text-red-800 dark:text-red-300 border-red-200 dark:border-red-800'
                      : 'bg-amber-50 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border-amber-200 dark:border-amber-800'
                  ]"
                >
                  {{ req.status === 'APPROVED' ? 'Akses Aktif' : req.status === 'REJECTED' ? 'Ditolak' : 'Menunggu Konfirmasi' }}
                </span>
              </div>
            </div>

            <!-- Actions -->
            <div class="flex items-center gap-2 shrink-0 pt-2 sm:pt-0">
              <template v-if="req.status === 'PENDING'">
                <BButton
                  variant="success"
                  size="sm"
                  class="flex items-center gap-1.5"
                  @click="umkmStore.updateInvestorRequestStatus(req.id, 'APPROVED')"
                >
                  <HugeiconsIcon :icon="CheckmarkCircle01Icon" :size="14" :stroke-width="2" />
                  <span>Buka Akses</span>
                </BButton>
                <BButton
                  variant="outline"
                  size="sm"
                  @click="umkmStore.updateInvestorRequestStatus(req.id, 'REJECTED')"
                >
                  Tolak Akses
                </BButton>
              </template>
              <template v-else-if="req.status === 'APPROVED'">
                <span class="text-xs text-emerald-600 dark:text-emerald-400 font-semibold font-heading">
                  Disetujui {{ req.reviewedAt }}
                </span>
                <BButton
                  variant="outline"
                  size="sm"
                  @click="umkmStore.updateInvestorRequestStatus(req.id, 'REJECTED')"
                >
                  Tarik Izin Akses
                </BButton>
              </template>
              <template v-else>
                <span class="text-xs text-neutral-400 font-semibold font-heading">
                  Permintaan Ditolak
                </span>
                <BButton
                  variant="outline"
                  size="sm"
                  @click="umkmStore.updateInvestorRequestStatus(req.id, 'APPROVED')"
                >
                  Buka Kembali Izin
                </BButton>
              </template>
            </div>
          </div>
        </BCard>
      </div>
    </div>

    <!-- TAB 3: Pratinjau Kartu Marketplace -->
    <div v-else-if="activeTab === 'preview'" class="space-y-6">
      <div class="p-4 rounded-xl bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
        Sesuai standar privasi Beruang, nominal omzet dan kas riil (dalam Rupiah) tidak pernah ditampilkan ke publik. Hanya rasio efisiensi persentase dan skor kesehatan terverifikasi yang dapat dilihat investor.
      </div>

      <div class="max-w-xl mx-auto">
        <BCard padding="lg">
          <div class="space-y-5">
            <!-- Top info -->
            <div class="flex items-start justify-between gap-4">
              <div class="flex items-center gap-3">
                <div class="w-12 h-12 rounded-xl bg-amber-400 p-2 shadow-xs shrink-0">
                  <img src="/logo.svg" alt="Logo Usaha" class="w-full h-full object-contain" />
                </div>
                <div>
                  <span class="text-xs font-mono font-bold text-neutral-500 dark:text-neutral-400">BERU-KOP-01</span>
                  <h3 class="font-heading font-bold text-lg sm:text-xl text-neutral-900 dark:text-white">
                    {{ umkmStore.profile.name }}
                  </h3>
                  <p class="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 font-medium mt-0.5">
                    {{ umkmStore.profile.sector }} • {{ umkmStore.profile.city }}
                  </p>
                </div>
              </div>

              <span class="inline-flex items-center gap-1.5 text-xs font-heading font-bold px-2.5 py-1 rounded-md bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 shrink-0">
                <HugeiconsIcon :icon="CheckmarkCircle01Icon" :size="14" :stroke-width="2" />
                <span>Verified</span>
              </span>
            </div>

            <!-- Pitch Summary -->
            <p class="text-xs sm:text-sm text-neutral-700 dark:text-neutral-200 leading-relaxed bg-surface-light dark:bg-surface-dark p-4 rounded-xl border border-border-light dark:border-border-dark italic">
              "{{ umkmStore.profile.pitchSummary }}"
            </p>

            <!-- Key Metrics Grid -->
            <div class="grid grid-cols-3 gap-3 text-center">
              <div class="p-3.5 rounded-xl bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark">
                <span class="text-xs text-neutral-600 dark:text-neutral-400 block font-semibold">Margin Kotor</span>
                <span class="font-heading font-bold text-base sm:text-lg text-emerald-600 dark:text-emerald-400 tabular-nums mt-0.5 block">48.5%</span>
              </div>
              <div class="p-3.5 rounded-xl bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark">
                <span class="text-xs text-neutral-600 dark:text-neutral-400 block font-semibold">Pertumbuhan</span>
                <span class="font-heading font-bold text-base sm:text-lg text-primary-600 dark:text-primary-400 tabular-nums mt-0.5 block">+34.2%</span>
              </div>
              <div class="p-3.5 rounded-xl bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark">
                <span class="text-xs text-neutral-600 dark:text-neutral-400 block font-semibold">Skor Audit</span>
                <span class="font-heading font-bold text-base sm:text-lg text-neutral-900 dark:text-white tabular-nums mt-0.5 block">79/100</span>
              </div>
            </div>

            <!-- Consultant verification footer -->
            <div class="pt-3 border-t border-border-light dark:border-border-dark flex items-center justify-between text-xs">
              <div class="flex items-center gap-1.5 text-neutral-500">
                <span>Konsultan:</span>
                <strong class="text-neutral-800 dark:text-neutral-200">{{ umkmStore.profile.consultantName }}</strong>
              </div>

              <NuxtLink to="/investor">
                <BButton variant="outline" size="sm">
                  Katalog Marketplace →
                </BButton>
              </NuxtLink>
            </div>
          </div>
        </BCard>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import confetti from 'canvas-confetti'
import { useUmkmStore } from '~/stores/umkm'
import BCard from '~/components/base/BCard.vue'
import BButton from '~/components/base/BButton.vue'
import SiBeru from '~/components/mascot/SiBeru.vue'
import { HugeiconsIcon } from '@hugeicons/vue'
import {
  Award01Icon,
  UserGroupIcon,
  Store01Icon,
  CheckmarkCircle01Icon
} from '@hugeicons/core-free-icons'

definePageMeta({
  layout: 'dashboard'
})

const route = useRoute()
const umkmStore = useUmkmStore()

const activeTab = ref<'gate' | 'requests' | 'preview'>('gate')

onMounted(() => {
  if (route.query.tab === 'requests') {
    activeTab.value = 'requests'
  } else if (route.query.tab === 'preview') {
    activeTab.value = 'preview'
  }
})

const pendingRequestsCount = computed(() => {
  return umkmStore.investorRequests.filter(r => r.status === 'PENDING').length
})

const criteria = [
  {
    title: 'Skor Fundamental ≥ 75',
    description: 'Skor agregat 5 aspek (Finansial, Ops, Pasar, Legal, Tim) mencapai minimal ambang kelayakan.',
    statusLabel: `Capaian: ${umkmStore.overallHealthScore}/100 (Lolos)`
  },
  {
    title: 'Konsistensi Pelaporan ≥ 3 Bulan',
    description: 'Telah menginput dan memverifikasi laporan bulanan berturut-turut tanpa anomali kritis.',
    statusLabel: '5 Bulan Berturut Terverifikasi (Lolos)'
  },
  {
    title: 'Kelengkapan Legalitas Dasar',
    description: 'NIB RBA terdaftar, izin edar aktif, dan struktur kepemilikan usaha jelas.',
    statusLabel: 'NIB & Sertifikat Halal Terbit (Lolos)'
  },
  {
    title: 'Rekomendasi Konsultan Pendamping',
    description: 'Persetujuan resmi dari konsultan bahwa UMKM siap dihubungkan dengan modal investor.',
    statusLabel: 'Disetujui oleh Dra. Maya Suryani (Lolos)'
  }
]

function triggerCelebration() {
  confetti({
    particleCount: 100,
    spread: 70,
    origin: { y: 0.6 }
  })
}
</script>
