<template>
  <div class="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto font-sans">
    <!-- Main Two-Column Layout (Sticky Left on desktop) -->
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
      <!-- Left Column: Sticky Title, Description & Quick Nav -->
      <div class="lg:col-span-5 lg:sticky lg:top-24 space-y-6">
        <div class="space-y-3">
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-100 dark:bg-primary-950/60 text-primary-700 dark:text-primary-300 border border-primary-200 dark:border-primary-800 text-xs font-heading font-semibold">
            <span>Pusat Bantuan & FAQ</span>
          </div>

          <h1 class="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold tracking-tight text-neutral-900 dark:text-white leading-[1.08]">
            Pertanyaan yang Sering Diajukan.
          </h1>

          <p class="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 leading-relaxed max-w-md">
            Temukan jawaban lengkap seputar validasi audit, pendampingan konsultan, keamanan data room, dan alur pendanaan UMKM.
          </p>
        </div>

        <!-- Category Selector Pills -->
        <div class="space-y-2">
          <p class="text-xs font-heading font-bold uppercase tracking-wider text-neutral-400 dark:text-neutral-500">
            Pilih Kategori Bantuan:
          </p>
          <div class="flex flex-wrap gap-2">
            <button
              v-for="cat in categories"
              :key="cat.id"
              type="button"
              :class="[
                'px-3.5 py-2 rounded-xl text-xs font-heading font-semibold transition-all duration-150',
                selectedCategory === cat.id
                  ? 'bg-primary-500 text-white shadow-xs'
                  : 'bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark text-neutral-600 dark:text-neutral-300 hover:border-neutral-400 dark:hover:border-neutral-600'
              ]"
              @click="selectedCategory = cat.id"
            >
              {{ cat.label }}
            </button>
          </div>
        </div>

        <!-- Help Card Contact Widget -->
        <div class="p-6 rounded-2xl bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark space-y-3">
          <div class="w-10 h-10 rounded-xl bg-primary-100 dark:bg-primary-950 text-primary-600 flex items-center justify-center">
            <HugeiconsIcon :icon="HelpCircleIcon" :size="20" :stroke-width="1.75" />
          </div>
          <h4 class="font-heading font-bold text-sm text-neutral-900 dark:text-white">
            Butuh Bantuan Lebih Lanjut?
          </h4>
          <p class="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
            Tim kurator dan spesialis Beruang siap mendiskusikan kelayakan usaha Anda secara langsung tanpa pungutan biaya awal.
          </p>
          <div class="pt-1">
            <NuxtLink to="/kontak">
              <BButton variant="outline" size="sm" class="w-full justify-center">
                Hubungi Tim Beruang
              </BButton>
            </NuxtLink>
          </div>
        </div>
      </div>

      <!-- Right Column: Accordion Questions List -->
      <div class="lg:col-span-7 space-y-8">
        <!-- Section: UMKM FAQs -->
        <div v-if="selectedCategory === 'all' || selectedCategory === 'umkm'" class="space-y-4">
          <div class="flex items-center gap-2 pb-2 border-b border-border-light dark:border-border-dark">
            <span class="w-2 h-2 rounded-full bg-primary-500" />
            <h2 class="font-heading font-bold text-base text-neutral-900 dark:text-white">
              Untuk Pemilik Usaha (UMKM)
            </h2>
          </div>
          <BAccordion :items="umkmFaqs" default-open-id="umkm-1" />
        </div>

        <!-- Section: Investor FAQs -->
        <div v-if="selectedCategory === 'all' || selectedCategory === 'investor'" class="space-y-4">
          <div class="flex items-center gap-2 pb-2 border-b border-border-light dark:border-border-dark">
            <span class="w-2 h-2 rounded-full bg-emerald-500" />
            <h2 class="font-heading font-bold text-base text-neutral-900 dark:text-white">
              Untuk Calon Investor & Pendana
            </h2>
          </div>
          <BAccordion :items="investorFaqs" :default-open-id="selectedCategory === 'investor' ? 'inv-1' : ''" />
        </div>

        <!-- Section: Konsultan FAQs -->
        <div v-if="selectedCategory === 'all' || selectedCategory === 'konsultan'" class="space-y-4">
          <div class="flex items-center gap-2 pb-2 border-b border-border-light dark:border-border-dark">
            <span class="w-2 h-2 rounded-full bg-amber-500" />
            <h2 class="font-heading font-bold text-base text-neutral-900 dark:text-white">
              Untuk Konsultan & Mitra Mentor
            </h2>
          </div>
          <BAccordion :items="konsultanFaqs" :default-open-id="selectedCategory === 'konsultan' ? 'kon-1' : ''" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import BAccordion, { type AccordionItem } from '~/components/base/BAccordion.vue'
import BButton from '~/components/base/BButton.vue'
import { HugeiconsIcon } from '@hugeicons/vue'
import { HelpCircleIcon } from '@hugeicons/core-free-icons'

const selectedCategory = ref('all')

const categories = [
  { id: 'all', label: 'Semua Topik' },
  { id: 'umkm', label: 'UMKM' },
  { id: 'investor', label: 'Investor' },
  { id: 'konsultan', label: 'Konsultan' }
]

const umkmFaqs: AccordionItem[] = [
  {
    id: 'umkm-1',
    title: 'Apakah pendaftaran dan pendampingan awal UMKM dipungut biaya?',
    content: 'Pendaftaran akun, diagnosa mandiri kelayakan usaha, dan modul rencana aksi dasar 100% gratis tanpa biaya tersembunyi. Program pendampingan intensif bersama konsultan tersertifikasi didanai melalui skema hibah mitra inkubator dan bagi hasil sukses.'
  },
  {
    id: 'umkm-2',
    title: 'Bagaimana cara mendapatkan predikat "Ready for Funding"?',
    content: 'Usaha Anda harus melewati 4 tahapan validasi: (1) Skor kesehatan fundamental minimal 75 poin pada radar 5 aspek, (2) Rekonsiliasi kas dan arus kas rapi selama minimal 3 bulan berturut-turut, (3) Kelengkapan izin legalitas usaha (NIB, sertifikat Halal/P-IRT jika relevan), dan (4) Rekomendasi verifikasi resmi dari konsultan pembimbing.'
  },
  {
    id: 'umkm-3',
    title: 'Apakah nominal rupiah pendapatan dan untung usaha saya akan terlihat oleh publik?',
    content: 'Tidak. Kami menerapkan perlindungan privasi mutlak. Di katalog publik, data keuangan Anda hanya disajikan dalam bentuk rasio persentase (margin kotor %, pertumbuhan YoY %, dan skor kesiapan usaha). Nominal riil Rupiah dan buku besar kas hanya dapat diakses di dalam Data Room ber-watermark oleh investor yang permohonan aksesnya telah Anda setujui secara sadar.'
  },
  {
    id: 'umkm-4',
    title: 'Berapa lama rata-rata proses pendampingan hingga siap didanai?',
    content: 'Rata-rata UMKM yang aktif menyelesaikan rencana aksi mingguan membutuhkan waktu antara 6 hingga 10 minggu untuk merapikan pembukuan dan memvalidasi unit economics hingga diterbitkan sertifikat Ready for Funding.'
  }
]

const investorFaqs: AccordionItem[] = [
  {
    id: 'inv-1',
    title: 'Bagaimana cara membaca data keuangan lengkap dan pembukuan UMKM?',
    content: 'Investor yang telah memvalidasi profil dapat mengajukan permintaan akses data pada kartu UMKM yang diminati. Begitu founder menyetujui, Anda dapat membuka Data Room terlindungi yang dilengkapi watermark digital identitas akun Anda untuk mencegah kebocoran dokumen.'
  },
  {
    id: 'inv-2',
    title: 'Apakah transaksi pendanaan dieksekusi langsung di dalam platform?',
    content: 'Beruang berperan sebagai platform penemuan deal (deal-flow), validasi fundamental, dan kurasi kelayakan bisnis. Eksekusi perjanjian kemitraan, akad bagi hasil, atau investasi ekuitas dilakukan secara langsung antara investor dan pemilik usaha dengan bantuan notaris rekanan tanpa potongan komisi sepihak dari Beruang.'
  },
  {
    id: 'inv-3',
    title: 'Apa jaminan bahwa data metrik UMKM yang disajikan adalah valid?',
    content: 'Setiap metrik finansial pada UMKM tersertifikasi telah melalui validasi bukti rekening koran, rekonsiliasi kas harian, dan verifikasi fisik operasional gerai oleh konsultan bisnis berlisensi.'
  }
]

const konsultanFaqs: AccordionItem[] = [
  {
    id: 'kon-1',
    title: 'Apa saja kualifikasi untuk bergabung sebagai konsultan mitra?',
    content: 'Praktisi bisnis, konsultan keuangan terdaftar, akademisi manajemen, atau mentor bisnis dengan portofolio pendampingan minimal 3 tahun dan komitmen membimbing UMKM secara objektif dan terukur.'
  },
  {
    id: 'kon-2',
    title: 'Bagaimana sistem AI Anomaly Alert membantu supervisi konsultan?',
    content: 'Sistem cerdas Beruang memindai tren pencatatan transaksi harian klien setiap minggu. Jika terjadi penurunan margin kotor lebih dari 10%, lonjakan modal jualan tidak wajar, atau deviasi arus kas keluar, sistem langsung mengirimkan notifikasi ke dashboard Anda agar dapat segera dilakukan intervensi pembinaan.'
  }
]
</script>
