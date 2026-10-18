<template>
  <div class="py-8 sm:py-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-10 sm:space-y-12 font-sans">
    
    <!-- Top Header -->
    <div class="max-w-2xl space-y-2 text-center mx-auto">
      <h1 class="text-2xl sm:text-3xl lg:text-4xl font-poppins font-bold text-neutral-900 dark:text-white tracking-tight leading-snug">
        Pertanyaan yang Sering Diajukan.
      </h1>

      <p class="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 font-poppins leading-relaxed max-w-xl mx-auto">
        Temukan jawaban lengkap seputar validasi audit, pendampingan konsultan, keamanan data room, dan alur pendanaan UMKM.
      </p>
    </div>

    <!-- Main Content: Category selector & Accordions -->
    <div class="flex flex-col gap-8 max-w-3xl mx-auto w-full">
      
      <!-- Category Selector Pills & Expand All Actions -->
      <div class="space-y-3">
        <div class="flex items-center justify-between gap-3 flex-wrap">
          <p class="text-[11px] font-poppins font-bold uppercase tracking-wider text-neutral-400 dark:text-neutral-500">
            Pilih Kategori Bantuan:
          </p>
          <div class="flex items-center gap-2.5">
            <button
              type="button"
              class="text-xs font-poppins font-bold text-[#0081A0] dark:text-[#2091AA] hover:underline cursor-pointer"
              @click="toggleAll(true)"
            >
              Buka Semua
            </button>
            <span class="text-neutral-300 dark:text-neutral-700">•</span>
            <button
              type="button"
              class="text-xs font-poppins font-medium text-neutral-500 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-200 hover:underline cursor-pointer"
              @click="toggleAll(false)"
            >
              Tutup Semua
            </button>
          </div>
        </div>

        <div class="flex flex-wrap gap-2">
          <button
            v-for="cat in categories"
            :key="cat.id"
            type="button"
            :class="[
              'px-4 py-1.5 rounded-full text-xs font-poppins font-semibold transition-all duration-150 cursor-pointer',
              selectedCategory === cat.id
                ? 'bg-[#0081A0] text-white shadow-xs'
                : 'bg-white dark:bg-[#13161F] border border-neutral-200/80 dark:border-neutral-800 text-neutral-600 dark:text-neutral-300 hover:border-neutral-400 dark:hover:border-neutral-600'
            ]"
            @click="selectedCategory = cat.id"
          >
            {{ cat.label }}
          </button>
        </div>
      </div>

      <!-- FAQ Accordions -->
      <div class="space-y-8">
        <!-- Section: UMKM FAQs -->
        <div v-if="selectedCategory === 'all' || selectedCategory === 'umkm'" class="space-y-3">
          <div class="flex items-center gap-2 pb-2 border-b border-neutral-200/80 dark:border-neutral-800">
            <span class="w-2 h-2 rounded-full bg-[#0081A0]" />
            <h2 class="font-poppins font-bold text-base text-neutral-900 dark:text-white">
              Untuk Pemilik Usaha (UMKM)
            </h2>
          </div>
          <BAccordion ref="umkmAccordionRef" :items="umkmFaqs" default-open-id="umkm-1" :multiple="true" />
        </div>

        <!-- Section: Investor FAQs -->
        <div v-if="selectedCategory === 'all' || selectedCategory === 'investor'" class="space-y-3">
          <div class="flex items-center gap-2 pb-2 border-b border-neutral-200/80 dark:border-neutral-800">
            <span class="w-2 h-2 rounded-full bg-emerald-500" />
            <h2 class="font-poppins font-bold text-base text-neutral-900 dark:text-white">
              Untuk Calon Investor & Pendana
            </h2>
          </div>
          <BAccordion ref="investorAccordionRef" :items="investorFaqs" :multiple="true" />
        </div>

        <!-- Section: Konsultan FAQs -->
        <div v-if="selectedCategory === 'all' || selectedCategory === 'konsultan'" class="space-y-3">
          <div class="flex items-center gap-2 pb-2 border-b border-neutral-200/80 dark:border-neutral-800">
            <span class="w-2 h-2 rounded-full bg-amber-500" />
            <h2 class="font-poppins font-bold text-base text-neutral-900 dark:text-white">
              Untuk Konsultan Pendamping Mitra
            </h2>
          </div>
          <BAccordion ref="konsultanAccordionRef" :items="konsultanFaqs" :multiple="true" />
        </div>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import BAccordion, { type AccordionItem } from '~/components/base/BAccordion.vue'

useSeoMeta({
  title: 'Pusat Bantuan & FAQ - Beruang',
  description: 'Pertanyaan seputar validasi audit, pendampingan konsultan, dan alur permodalan UMKM di platform Beruang.'
})

const categories = [
  { id: 'all', label: 'Semua Topik' },
  { id: 'umkm', label: 'Pemilik UMKM' },
  { id: 'investor', label: 'Investor' },
  { id: 'konsultan', label: 'Konsultan BNSP' }
]

const selectedCategory = ref('all')

const umkmAccordionRef = ref<InstanceType<typeof BAccordion> | null>(null)
const investorAccordionRef = ref<InstanceType<typeof BAccordion> | null>(null)
const konsultanAccordionRef = ref<InstanceType<typeof BAccordion> | null>(null)

function toggleAll(open: boolean) {
  if (open) {
    umkmAccordionRef.value?.openAll()
    investorAccordionRef.value?.openAll()
    konsultanAccordionRef.value?.openAll()
  } else {
    umkmAccordionRef.value?.closeAll()
    investorAccordionRef.value?.closeAll()
    konsultanAccordionRef.value?.closeAll()
  }
}

const umkmFaqs: AccordionItem[] = [
  {
    id: 'umkm-1',
    title: 'Berapa biaya awal untuk mengikuti proses kurasi dan diagnosa awal?',
    content: 'Diagnosa awal 5 pilar fundamental (arus kas, margin, legalitas, operasional, pasar) serta penerbitan ringkasan skor kelayakan tidak dipungut biaya (100% gratis). Biaya pendampingan intensif hanya berlaku jika Anda memilih bimbingan mingguan bersama konsultan berlisensi BNSP.'
  },
  {
    id: 'umkm-2',
    title: 'Apakah Beruang menjamin usahaku pasti mendapatkan dana dari investor?',
    content: 'Beruang tidak menjamin pemberian modal langsung, melainkan menjamin bahwa profil usaha Anda memenuhi standar akuntabilitas permodalan (Ready for Funding). Dengan catatan keuangan yang diaudit dan tervariasi, peluang kesepakatan bagi hasil dengan investor di katalog kami meningkat signifikan dibanding pengajuan mandiri.'
  },
  {
    id: 'umkm-3',
    title: 'Bagaimana keamanan data pembukuan dan resep rahasia bisnis saya?',
    content: 'Data detail P&L dan rekening koran hanya disimpan di Data Room terlindungi dengan enkripsi AES-256. Calon investor yang ingin melihat data lengkap wajib meminta izin secara eksplisit kepada founder, dan setiap lembar dokumen akan dibubuhi watermark digital identitas peminta.'
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
    content: 'Beruang berperan sebagai platform penemuan deal (deal-flow), audit fundamental, dan kurasi kelayakan bisnis. Eksekusi perjanjian kemitraan, akad bagi hasil, atau investasi ekuitas dilakukan secara langsung antara investor dan pemilik usaha dengan bantuan notaris rekanan tanpa potongan komisi sepihak dari Beruang.'
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
    content: 'Sistem cerdas Beruang memindai tren pencatatan transaksi harian klien setiap minggu. Jika terjadi penurunan margin kotor lebih dari 10%, lonjakan HPP tidak wajar, atau deviasi arus kas keluar, sistem langsung mengirimkan notifikasi ke dashboard Anda agar dapat segera dilakukan intervensi pembinaan.'
  }
]
</script>
