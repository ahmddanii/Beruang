<template>
  <div class="min-h-screen bg-canvas-light dark:bg-canvas-dark text-neutral-900 dark:text-text-primary-dark p-6 sm:p-10 font-sans transition-colors">
    <div class="max-w-6xl mx-auto space-y-12">
      <!-- Header -->
      <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-border-light dark:border-border-dark pb-6">
        <div>
          <span class="text-xs font-heading font-bold uppercase tracking-wider text-primary-500 bg-primary-100 dark:bg-primary-tint px-3 py-1 rounded-full border border-primary-200 dark:border-primary-500/20">
            Design System v2 • Saaspo-Inspired
          </span>
          <h1 class="text-3xl font-heading font-extrabold tracking-tight mt-2">
            Beruang Component Library
          </h1>
          <p class="text-sm text-neutral-500 dark:text-text-secondary-dark mt-1">
            Grid-driven, modern, bold typography, thin 1px borders, flat action buttons with smooth transitions.
          </p>
        </div>

        <div class="flex items-center gap-3">
          <button
            type="button"
            class="px-3.5 py-1.5 rounded-xl border border-border-light dark:border-border-dark text-xs font-heading font-medium hover:bg-neutral-100 dark:hover:bg-surface-2-dark transition-colors"
            @click="toggleDarkMode"
          >
            Toggle {{ isDark ? 'Light Mode' : 'Dark Mode' }}
          </button>
          <NuxtLink to="/">
            <BButton variant="secondary" size="sm">
              Kembali ke Beranda
            </BButton>
          </NuxtLink>
        </div>
      </div>

      <!-- 1. BButton (Modern Flat Action Buttons) -->
      <section class="space-y-4">
        <h2 class="text-xl font-heading font-bold">
          1. BButton (Flat Modern + Radius 12px + Hover Transition)
        </h2>
        <div class="p-6 bg-white dark:bg-surface-dark rounded-2xl border border-border-light dark:border-border-dark shadow-xs flex flex-wrap gap-3 items-center">
          <BButton variant="primary">Primary Action</BButton>
          <BButton variant="secondary">Secondary Surface</BButton>
          <BButton variant="outline">Outline Border</BButton>
          <BButton variant="success">Success Status</BButton>
          <BButton variant="gold">Gold Ready</BButton>
          <BButton variant="danger">Danger Delete</BButton>
          <BButton variant="ghost">Ghost Button</BButton>
          <BButton variant="primary" loading>Loading State</BButton>
          <BButton variant="primary" disabled>Disabled State</BButton>
        </div>
      </section>

      <!-- 2. BNavBadge (Saaspo-Style Superscript Counts) -->
      <section class="space-y-4">
        <h2 class="text-xl font-heading font-bold">
          2. BNavBadge (Label + Small Counter)
        </h2>
        <div class="p-6 bg-white dark:bg-surface-dark rounded-2xl border border-border-light dark:border-border-dark shadow-xs flex flex-wrap gap-4 items-center">
          <BNavBadge label="Untuk UMKM" count="500+" active />
          <BNavBadge label="Investor Terakreditasi" count="120+" />
          <BNavBadge label="Konsultan Mitra" count="25+" />
          <BNavBadge label="Laporan Terverifikasi" count="1.4k" />
          <BNavBadge label="Bantuan & FAQ" />
        </div>
      </section>

      <!-- 3. BFilterBar (Horizontal Pill Dropdown Bar) -->
      <section class="space-y-4">
        <h2 class="text-xl font-heading font-bold">
          3. BFilterBar (Horizontal Dropdown Bar for Catalogs)
        </h2>
        <div class="p-6 bg-white dark:bg-surface-dark rounded-2xl border border-border-light dark:border-border-dark shadow-xs">
          <BFilterBar
            :filters="sampleFilters"
            :has-active-filter="activeFilterChanged"
            @update:filter="handleFilterUpdate"
            @reset="handleFilterReset"
          />
        </div>
      </section>

      <!-- 4. BBrowserCard (Saaspo Browser Chrome Mockup Previews) -->
      <section class="space-y-4">
        <h2 class="text-xl font-heading font-bold">
          4. BBrowserCard (Browser Chrome Header for Showcase)
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <BBrowserCard url="beruang.id/dashboard/radar" badge-text="Live Demo" interactive>
            <div class="space-y-3">
              <h4 class="font-heading font-bold text-base">Diagnosis 5 Pilar Fundamental</h4>
              <p class="text-xs text-neutral-500 dark:text-text-secondary-dark">
                Preview visual dashboard UMKM dengan radar native SVG responsif.
              </p>
              <div class="pt-2 flex justify-center">
                <BRadarChart :items="sampleRadar" :size="240" />
              </div>
            </div>
          </BBrowserCard>

          <BBrowserCard url="beruang.id/investor/kopisenja" badge-text="Terverifikasi" interactive>
            <div class="space-y-3">
              <h4 class="font-heading font-bold text-base">Kopi Senja Nusantara</h4>
              <p class="text-xs text-neutral-500 dark:text-text-secondary-dark">
                Preview kartu bisnis terkurasi untuk investor (hanya persentase efisiensi publik).
              </p>
              <div class="grid grid-cols-3 gap-2 text-center pt-2">
                <div class="p-2.5 rounded-xl bg-surface-light dark:bg-surface-2-dark border border-border-light dark:border-border-dark">
                  <span class="text-[10px] text-neutral-400 block">Margin Kotor</span>
                  <span class="font-heading font-bold text-emerald-600 text-sm">48.5%</span>
                </div>
                <div class="p-2.5 rounded-xl bg-surface-light dark:bg-surface-2-dark border border-border-light dark:border-border-dark">
                  <span class="text-[10px] text-neutral-400 block">Pertumbuhan</span>
                  <span class="font-heading font-bold text-primary-500 text-sm">+34.2%</span>
                </div>
                <div class="p-2.5 rounded-xl bg-surface-light dark:bg-surface-2-dark border border-border-light dark:border-border-dark">
                  <span class="text-[10px] text-neutral-400 block">Skor Sehat</span>
                  <span class="font-heading font-bold text-neutral-900 dark:text-white text-sm">79/100</span>
                </div>
              </div>
            </div>
          </BBrowserCard>
        </div>
      </section>

      <!-- 5. BAccordion (Two-column FAQ Layout Component) -->
      <section class="space-y-4">
        <h2 class="text-xl font-heading font-bold">
          5. BAccordion (FAQ & Expandable Content)
        </h2>
        <div class="p-6 bg-white dark:bg-surface-dark rounded-2xl border border-border-light dark:border-border-dark shadow-xs max-w-3xl">
          <BAccordion :items="sampleFaqItems" default-open-id="faq-1" />
        </div>
      </section>

      <!-- 6. BCard & BBadge -->
      <section class="space-y-4">
        <h2 class="text-xl font-heading font-bold">
          6. BCard (1px Thin Border + Clean Surface) & BBadge
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <BCard>
            <template #header>
              <h3 class="font-heading font-semibold text-base">Standard Card</h3>
            </template>
            <p class="text-sm text-neutral-600 dark:text-text-secondary-dark">
              1px border tipis, flat surface, shadow ultra-halus.
            </p>
            <template #footer>
              <div class="flex items-center gap-2">
                <BBadge variant="primary" dot>Aktif</BBadge>
                <BBadge variant="neutral">Draft</BBadge>
              </div>
            </template>
          </BCard>

          <BCard highlighted highlight-label="Ready for Funding">
            <template #header>
              <h3 class="font-heading font-semibold text-base">Highlighted Card</h3>
            </template>
            <p class="text-sm text-neutral-600 dark:text-text-secondary-dark">
              Border aksen biru dengan tint 10% lembut.
            </p>
            <template #footer>
              <BBadge variant="gold">Terverifikasi Konsultan</BBadge>
            </template>
          </BCard>

          <BCard interactive @click="cardClicked = true">
            <template #header>
              <h3 class="font-heading font-semibold text-base">Interactive Card</h3>
            </template>
            <p class="text-sm text-neutral-600 dark:text-text-secondary-dark">
              Hover state border highlight tanpa jumping 3D.
            </p>
            <template #footer>
              <span class="text-xs text-primary-500 font-semibold font-heading">
                {{ cardClicked ? 'Telah diklik!' : 'Klik kartu ini →' }}
              </span>
            </template>
          </BCard>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import BButton from '~/components/base/BButton.vue'
import BCard from '~/components/base/BCard.vue'
import BBadge from '~/components/base/BBadge.vue'
import BNavBadge from '~/components/base/BNavBadge.vue'
import BFilterBar, { type FilterItem } from '~/components/base/BFilterBar.vue'
import BBrowserCard from '~/components/base/BBrowserCard.vue'
import BAccordion from '~/components/base/BAccordion.vue'
import BRadarChart from '~/components/base/BRadarChart.vue'

const cardClicked = ref(false)
const isDark = ref(false)
const activeFilterChanged = ref(false)

onMounted(() => {
  isDark.value = document.documentElement.classList.contains('dark')
})

function toggleDarkMode() {
  isDark.value = !isDark.value
  if (isDark.value) {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }
}

const sampleRadar = [
  { name: 'Finansial', score: 82, maxScore: 100, targetScore: 85 },
  { name: 'Operasional', score: 78, maxScore: 100, targetScore: 80 },
  { name: 'Pemasaran', score: 85, maxScore: 100, targetScore: 75 },
  { name: 'Legalitas', score: 70, maxScore: 100, targetScore: 90 },
  { name: 'SDM & Tim', score: 80, maxScore: 100, targetScore: 80 }
]

const sampleFilters = ref<FilterItem[]>([
  {
    id: 'sector',
    label: 'Sektor',
    value: 'all',
    options: [
      { label: 'Semua Sektor', value: 'all' },
      { label: 'Kuliner (F&B)', value: 'fnb' },
      { label: 'Kriya & Mode', value: 'craft' },
      { label: 'Agrikultur', value: 'agri' }
    ]
  },
  {
    id: 'city',
    label: 'Kota',
    value: 'all',
    options: [
      { label: 'Semua Wilayah', value: 'all' },
      { label: 'Bandung', value: 'bandung' },
      { label: 'Surabaya', value: 'surabaya' },
      { label: 'Yogyakarta', value: 'jogja' }
    ]
  },
  {
    id: 'ticket',
    label: 'Target Tiket',
    value: 'all',
    options: [
      { label: 'Semua Tiket', value: 'all' },
      { label: '< Rp 100 Juta', value: 'under100' },
      { label: 'Rp 100 - 300 Jt', value: '100to300' },
      { label: '> Rp 300 Juta', value: 'above300' }
    ]
  },
  {
    id: 'margin',
    label: 'Margin Kotor',
    value: 'all',
    options: [
      { label: 'Semua Margin', value: 'all' },
      { label: '> 40%', value: 'above40' },
      { label: '> 50%', value: 'above50' }
    ]
  }
])

function handleFilterUpdate({ id, value }: { id: string; value: string }) {
  const f = sampleFilters.value.find(item => item.id === id)
  if (f) {
    f.value = value
    activeFilterChanged.value = true
  }
}

function handleFilterReset() {
  sampleFilters.value.forEach(f => f.value = 'all')
  activeFilterChanged.value = false
}

const sampleFaqItems = [
  {
    id: 'faq-1',
    title: 'Apakah Beruang adalah platform pinjaman online (Pinjol)?',
    content: 'Bukan. Beruang adalah platform pendampingan dan kesiapan bisnis terpadu yang menghubungkan UMKM terverifikasi dengan investor modal ekuitas atau bagi hasil. Kami tidak menyediakan pinjaman berbunga.'
  },
  {
    id: 'faq-2',
    title: 'Bagaimana keamanan data keuangan UMKM dijaga?',
    content: 'Angka nominal omzet dan kas riil (dalam Rupiah) tidak pernah dibuka ke publik. Investor hanya dapat membaca laporan keuangan lengkap di Data Room terproteksi setelah mengajukan permintaan dan disetujui oleh pemilik UMKM, dengan watermark digital beridentitas investor.'
  },
  {
    id: 'faq-3',
    title: 'Berapa lama proses pembinaan hingga dinyatakan Ready for Funding?',
    content: 'Rata-rata 2 hingga 4 bulan, tergantung kelengkapan legalitas awal (NIB/Halal) serta konsistensi pencatatan laporan keuangan bulanan bersama konsultan pendamping.'
  }
]
</script>
