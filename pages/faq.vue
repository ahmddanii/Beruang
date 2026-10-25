<template>
  <div class="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-16 sm:space-y-20">
    <!-- Top Header -->
    <div class="max-w-3xl space-y-5 text-center mx-auto">
      <h1 class="text-3xl sm:text-5xl lg:text-6xl font-bold text-neutral-900 dark:text-white tracking-tight leading-[1.08]">
        Pertanyaan yang Sering Diajukan.
      </h1>

      <p class="text-base sm:text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed max-w-2xl mx-auto">
        Temukan jawaban lengkap seputar validasi audit, pendampingan konsultan, keamanan data room, dan alur pendanaan UMKM.
      </p>
    </div>

    <!-- Main Content: Top-Bottom Stack -->
    <div class="flex flex-col gap-12 max-w-3xl mx-auto w-full">
      
      <!-- Category Selector Pills -->
      <div class="space-y-4">
        <p class="text-xs font-bold uppercase tracking-wider text-neutral-400 dark:text-neutral-500 text-center">
          Pilih Kategori Bantuan:
        </p>
        <div class="flex flex-wrap justify-center gap-2">
          <button
            v-for="cat in categories"
            :key="cat.id"
            type="button"
            :class="[
              'px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-150',
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

      <!-- FAQ Accordions -->
      <div class="space-y-12">
        <!-- Section: UMKM FAQs -->
        <div v-if="selectedCategory === 'all' || selectedCategory === 'umkm'" class="space-y-4">
          <div class="flex items-center gap-2 pb-2 border-b border-border-light dark:border-border-dark">
            <span class="w-2 h-2 rounded-full bg-primary-500" />
            <h2 class="font-bold text-lg text-neutral-900 dark:text-white">
              Untuk Pemilik Usaha (UMKM)
            </h2>
          </div>
          <BAccordion :items="umkmFaqs" default-open-id="umkm-1" />
        </div>

        <!-- Section: Investor FAQs -->
        <div v-if="selectedCategory === 'all' || selectedCategory === 'investor'" class="space-y-4">
          <div class="flex items-center gap-2 pb-2 border-b border-border-light dark:border-border-dark">
            <span class="w-2 h-2 rounded-full bg-emerald-500" />
            <h2 class="font-bold text-lg text-neutral-900 dark:text-white">
              Untuk Calon Investor & Pendana
            </h2>
          </div>
          <BAccordion :items="investorFaqs" :default-open-id="selectedCategory === 'investor' ? 'inv-1' : ''" />
        </div>

        <!-- Section: Konsultan FAQs -->
        <div v-if="selectedCategory === 'all' || selectedCategory === 'konsultan'" class="space-y-4">
          <div class="flex items-center gap-2 pb-2 border-b border-border-light dark:border-border-dark">
            <span class="w-2 h-2 rounded-full bg-amber-500" />
            <h2 class="font-bold text-lg text-neutral-900 dark:text-white">
              Untuk Konsultan & Mitra Mentor
            </h2>
          </div>
          <BAccordion :items="konsultanFaqs" :default-open-id="selectedCategory === 'konsultan' ? 'kon-1' : ''" />
        </div>
      </div>

      <!-- Help Card Contact Widget -->
      <div class="p-8 mt-8 rounded-2xl bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark flex flex-col items-center text-center space-y-4">
        <div class="w-12 h-12 rounded-xl bg-primary-100 dark:bg-primary-950 text-primary-600 flex items-center justify-center">
          <HugeiconsIcon :icon="HelpCircleIcon" :size="24" :stroke-width="1.75" />
        </div>
        <h4 class="font-bold text-base sm:text-lg text-neutral-900 dark:text-white">
          Butuh Bantuan Lebih Lanjut?
        </h4>
        <p class="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed max-w-md">
          Tim kurator dan spesialis Beruang siap mendiskusikan kelayakan usaha Anda secara langsung tanpa pungutan biaya awal.
        </p>
        <div class="pt-4">
          <NuxtLink to="/kontak">
            <BButton variant="outline" size="md">
              Hubungi Tim Beruang
            </BButton>
          </NuxtLink>
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
