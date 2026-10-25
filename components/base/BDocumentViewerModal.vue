<template>
  <Teleport to="body">
    <div
      v-if="modelValue && doc"
      class="fixed inset-0 z-[140] flex flex-col bg-[#0C0F17]/95 backdrop-blur-md text-white select-none overflow-hidden animate-in fade-in duration-200"
      @click.self="close"
    >
      <!-- ===================================================================== -->
      <!-- 1. GOOGLE DRIVE TOP NAVIGATION & TOOLBAR                              -->
      <!-- ===================================================================== -->
      <header
        class="h-14 sm:h-16 px-3 sm:px-6 flex items-center justify-between border-b border-white/10 bg-[#121620]/90 shrink-0 z-20 gap-2 sm:gap-4"
      >
        <!-- Left: Document Type Icon + Name & Verified Pill -->
        <div class="flex items-center gap-2 sm:gap-3 min-w-0">
          <button
            type="button"
            class="w-9 h-9 rounded-full flex items-center justify-center text-neutral-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer shrink-0"
            title="Tutup Pratinjau (Esc)"
            @click="close"
          >
            <HugeiconsIcon :icon="Cancel01Icon" :size="18" />
          </button>

          <!-- File Type Chip -->
          <div
            v-if="isPdf"
            class="px-2 py-0.5 rounded bg-red-600/90 text-white font-mono text-[10px] font-bold shrink-0 tracking-wider"
          >
            PDF
          </div>
          <div
            v-else-if="isImage"
            class="px-2 py-0.5 rounded bg-blue-600/90 text-white font-mono text-[10px] font-bold shrink-0 tracking-wider"
          >
            IMG
          </div>
          <div
            v-else
            class="px-2 py-0.5 rounded bg-emerald-600/90 text-white font-mono text-[10px] font-bold shrink-0 tracking-wider"
          >
            DOC
          </div>

          <!-- Document Title & Filename -->
          <div class="min-w-0 flex flex-col">
            <div class="flex items-center gap-2">
              <span
                class="font-poppins font-semibold text-xs sm:text-sm text-white truncate max-w-[140px] sm:max-w-xs md:max-w-md block"
                :title="doc.title"
              >
                {{ doc.title }}
              </span>
              <span
                class="hidden md:inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-[10px] font-medium shrink-0"
              >
                <span class="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>Terverifikasi Sah</span>
              </span>
            </div>
            <span
              class="text-[11px] font-poppins text-neutral-400 truncate max-w-[140px] sm:max-w-xs block"
              :title="doc.file?.name || doc.subtitle"
            >
              {{ doc.file?.name || doc.subtitle }}
            </span>
          </div>
        </div>

        <!-- Center: Google Drive Floating Zoom & Page Controls -->
        <div class="hidden sm:flex items-center gap-1 px-3 py-1.5 rounded-full bg-[#1E2330]/90 border border-white/10 shadow-lg shrink-0">
          <!-- Zoom Out -->
          <button
            type="button"
            class="w-7 h-7 rounded-full flex items-center justify-center text-neutral-300 hover:text-white hover:bg-white/10 transition-colors disabled:opacity-40 cursor-pointer"
            :disabled="zoomLevel <= 50"
            title="Perkecil (-)"
            @click="zoomOut"
          >
            <HugeiconsIcon :icon="ZoomOutIcon" :size="15" />
          </button>

          <!-- Zoom Percentage Indicator -->
          <button
            type="button"
            class="px-2 py-0.5 rounded text-xs font-mono font-medium text-neutral-200 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            title="Klik untuk reset zoom ke 100%"
            @click="resetZoom"
          >
            {{ zoomLevel }}%
          </button>

          <!-- Zoom In -->
          <button
            type="button"
            class="w-7 h-7 rounded-full flex items-center justify-center text-neutral-300 hover:text-white hover:bg-white/10 transition-colors disabled:opacity-40 cursor-pointer"
            :disabled="zoomLevel >= 200"
            title="Perbesar (+)"
            @click="zoomIn"
          >
            <HugeiconsIcon :icon="ZoomInIcon" :size="15" />
          </button>

          <span class="w-px h-4 bg-white/20 mx-1" />

          <!-- Fit to Width / Reset -->
          <button
            type="button"
            class="px-2 py-0.5 rounded text-[11px] font-poppins text-neutral-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            title="Sesuaikan Lebar"
            @click="fitToWidth"
          >
            Pas
          </button>

          <span class="w-px h-4 bg-white/20 mx-1" />

          <!-- Page Indicator -->
          <span class="text-[11px] font-mono text-neutral-400 px-1">
            1 / 1
          </span>
        </div>

        <!-- Right: Actions (Open New Tab, Print, Download, Close) -->
        <div class="flex items-center gap-1 sm:gap-2 shrink-0">
          <!-- Buka di Tab Baru -->
          <button
            v-if="effectiveFileUrl"
            type="button"
            class="w-9 h-9 rounded-xl flex items-center justify-center text-neutral-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            title="Buka Dokumen di Tab Baru"
            @click="openInNewTab"
          >
            <HugeiconsIcon :icon="ArrowUpRight01Icon" :size="16" />
          </button>

          <!-- Cetak Dokumen -->
          <button
            type="button"
            class="w-9 h-9 rounded-xl flex items-center justify-center text-neutral-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            title="Cetak Dokumen"
            @click="handlePrint"
          >
            <HugeiconsIcon :icon="PrinterIcon" :size="16" />
          </button>

          <!-- Unduh Berkas -->
          <button
            type="button"
            class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-poppins font-semibold bg-[#00AA13] hover:bg-[#009210] text-white shadow-xs transition-colors cursor-pointer"
            title="Unduh Berkas ke Komputer"
            @click="handleDownload"
          >
            <HugeiconsIcon :icon="Download01Icon" :size="14" />
            <span class="hidden md:inline">Unduh</span>
          </button>

          <!-- Close Button -->
          <button
            type="button"
            class="w-9 h-9 rounded-xl flex items-center justify-center text-neutral-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            title="Tutup (Esc)"
            @click="close"
          >
            <HugeiconsIcon :icon="Cancel01Icon" :size="18" />
          </button>
        </div>
      </header>

      <!-- ===================================================================== -->
      <!-- 2. DOCUMENT VIEWPORT CANVAS (CENTER STAGE)                             -->
      <!-- ===================================================================== -->
      <main
        class="flex-1 overflow-auto flex items-start sm:items-center justify-center p-3 sm:p-8 bg-[#151922] relative"
        @click.self="close"
      >
        <div
          class="transition-transform duration-150 ease-out origin-top mx-auto my-auto"
          :style="{ transform: `scale(${zoomLevel / 100})` }"
        >
          <!-- CASE A: EMBEDDED REAL PDF VIEWER -->
          <div
            v-if="isPdf && effectiveFileUrl"
            class="w-[850px] max-w-[95vw] h-[1050px] max-h-[82vh] bg-white rounded-lg shadow-2xl overflow-hidden ring-1 ring-black/20"
          >
            <iframe
              :src="effectiveFileUrl"
              class="w-full h-full border-0"
              title="Pratinjau Dokumen PDF"
            />
          </div>

          <!-- CASE B: EMBEDDED REAL IMAGE VIEWER -->
          <div
            v-else-if="isImage && effectiveFileUrl"
            class="max-w-[90vw] max-h-[80vh] flex items-center justify-center bg-white/5 rounded-xl p-2 shadow-2xl ring-1 ring-white/10"
          >
            <img
              :src="effectiveFileUrl"
              :alt="doc.title"
              class="max-w-full max-h-[78vh] object-contain rounded-lg shadow-2xl bg-white"
            />
          </div>

          <!-- CASE C: AUTHENTIC OFFICIAL INDONESIAN LEGAL DOCUMENT CANVAS (A4 SHEET) -->
          <div
            v-else
            id="gdrive-document-print-sheet"
            class="w-[794px] max-w-[95vw] min-h-[1050px] bg-white text-neutral-900 p-8 sm:p-14 shadow-2xl rounded-sm ring-1 ring-black/15 relative overflow-hidden font-serif select-text"
          >
            <!-- Watermark Diagonal Keamanan -->
            <div
              class="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.06] select-none transform -rotate-30"
              aria-hidden="true"
            >
              <div class="text-center font-mono font-black text-2xl sm:text-4xl leading-loose tracking-widest text-neutral-900">
                BERUANG DATA ROOM VAULT<br />
                TERVERIFIKASI SAH & DILINDUNGI HUKUM<br />
                {{ authStore.currentUser?.name || 'UMKM BINAAN' }} • 2026
              </div>
            </div>

            <!-- Authentic Kop Surat Pemerintah / Notaris Indonesia -->
            <div class="text-center border-b-4 border-double border-neutral-900 pb-4 mb-6 relative">
              <div class="flex items-center justify-center gap-4 mb-2">
                <!-- Lambang Burung Garuda / Lambang Resmi Koperasi -->
                <div class="w-14 h-14 rounded-full border border-neutral-300 flex items-center justify-center text-amber-700 bg-amber-50/50 shrink-0">
                  <HugeiconsIcon :icon="Certificate01Icon" :size="32" />
                </div>
                <div>
                  <h3 class="font-serif font-bold text-sm sm:text-base tracking-wider uppercase text-neutral-900 leading-tight">
                    PEMERINTAH DAERAH KABUPATEN / KOTA
                  </h3>
                  <h4 class="font-serif font-bold text-xs sm:text-sm tracking-wide uppercase text-neutral-800 leading-tight">
                    DINAS PENANAMAN MODAL & PELAYANAN TERPADU SATU PINTU (DPMPTSP)
                  </h4>
                  <p class="font-sans text-[10px] text-neutral-600 mt-0.5">
                    Jl. Jenderal Sudirman Kav. 12, Kompleks Perkantoran Terpadu • Telepon: (021) 7890-1234
                  </p>
                </div>
              </div>
            </div>

            <!-- Judul Dokumen & Nomor Registrasi -->
            <div class="text-center my-6 space-y-1">
              <h2 class="font-serif font-bold text-lg sm:text-2xl text-neutral-950 uppercase tracking-wide underline underline-offset-4 decoration-2">
                {{ doc.title }}
              </h2>
              <p class="font-mono text-xs text-neutral-700">
                Nomor: 503/SKU-BERUANG/X/2026/{{ doc.id.toUpperCase() }}
              </p>
            </div>

            <!-- Pernyataan Pembuka -->
            <div class="space-y-4 text-xs sm:text-[13px] text-neutral-800 leading-relaxed font-serif">
              <p>
                Yang bertanda tangan di bawah ini, Kepala Dinas Penanaman Modal dan Pelayanan Terpadu Satu Pintu serta Pejabat Otoritas Kurasi Data Room Kemitraan UMKM Beruang, menerangkan dengan sebenarnya bahwa:
              </p>

              <!-- Identitas Pemilik & Unit Usaha -->
              <table class="w-full text-xs sm:text-[13px] font-sans my-4 border-collapse">
                <tbody>
                  <tr class="border-b border-neutral-150">
                    <td class="py-1.5 w-48 font-medium text-neutral-600">Nama Pemilik Usaha</td>
                    <td class="py-1.5 w-4 font-bold">:</td>
                    <td class="py-1.5 font-bold text-neutral-900">{{ effectiveOwnerName }}</td>
                  </tr>
                  <tr class="border-b border-neutral-150">
                    <td class="py-1.5 font-medium text-neutral-600">Nomor Induk Kependudukan (NIK)</td>
                    <td class="py-1.5 font-bold">:</td>
                    <td class="py-1.5 font-mono text-neutral-800">3273-0982-1988-0004</td>
                  </tr>
                  <tr class="border-b border-neutral-150">
                    <td class="py-1.5 font-medium text-neutral-600">Nama Usaha / Merk Dagang</td>
                    <td class="py-1.5 font-bold">:</td>
                    <td class="py-1.5 font-bold text-neutral-900">{{ effectiveBusinessName }}</td>
                  </tr>
                  <tr class="border-b border-neutral-150">
                    <td class="py-1.5 font-medium text-neutral-600">Sektor / Bidang Usaha</td>
                    <td class="py-1.5 font-bold">:</td>
                    <td class="py-1.5 text-neutral-800">{{ effectiveSector }}</td>
                  </tr>
                  <tr class="border-b border-neutral-150">
                    <td class="py-1.5 font-medium text-neutral-600">Alamat Tempat Usaha</td>
                    <td class="py-1.5 font-bold">:</td>
                    <td class="py-1.5 text-neutral-800">{{ effectiveAddress }}</td>
                  </tr>
                  <tr class="border-b border-neutral-150">
                    <td class="py-1.5 font-medium text-neutral-600">Klasifikasi Dokumen</td>
                    <td class="py-1.5 font-bold">:</td>
                    <td class="py-1.5 font-semibold text-emerald-700">{{ doc.categoryBadge || 'Wajib UMKM' }}</td>
                  </tr>
                  <tr>
                    <td class="py-1.5 font-medium text-neutral-600">ID Registri Virtual Data Room</td>
                    <td class="py-1.5 font-bold">:</td>
                    <td class="py-1.5 font-mono text-neutral-800">SEC-VDR-{{ doc.id.toUpperCase() }}-2026</td>
                  </tr>
                </tbody>
              </table>

              <!-- Isi Pengesahan -->
              <p>
                Berdasarkan verifikasi lapangan serta pencocokan berkas digital pada Virtual Data Room platform Beruang, nama dan unit usaha yang bersangkutan di atas adalah <strong>benar beroperasi aktif, sah secara yuridis, dan telah melengkapi standar kepatuhan legalitas dasar</strong> yang disyaratkan untuk penelaahan kemitraan dan investasi modal.
              </p>
              <p>
                Surat Keterangan ini diterbitkan untuk dipergunakan sebagaimana mestinya dalam rangka pemenuhan persyaratan pendanaan, keterbukaan informasi investor, dan legalitas usaha perbankan/institusi pembiayaan.
              </p>
            </div>

            <!-- Tanda Tangan & Stempel Resmi -->
            <div class="mt-10 pt-4 flex items-end justify-between font-sans">
              <!-- QR Code Keaslian Dokumen -->
              <div class="flex items-center gap-3">
                <div class="w-20 h-20 border-2 border-neutral-900 p-1 bg-white shrink-0 flex flex-col items-center justify-center">
                  <!-- Simulated QR Grid -->
                  <div class="grid grid-cols-4 gap-0.5 w-full h-full p-1 bg-neutral-950 text-white text-[8px] font-mono flex items-center justify-center">
                    QR
                  </div>
                </div>
                <div class="text-[10px] text-neutral-500 max-w-[170px] leading-tight">
                  <span class="font-bold text-neutral-800 block">Autentikasi Digital SHA-256</span>
                  Pindai QR untuk memeriksa keaslian arsip pada basis data resmi Beruang.
                </div>
              </div>

              <!-- Bagian Pengesahan & Stempel Basah Digital -->
              <div class="text-center relative w-56">
                <p class="text-xs text-neutral-600 mb-1">
                  Ditetapkan di: Jakarta<br />
                  Pada tanggal: 25 Oktober 2026
                </p>
                <p class="text-xs font-semibold text-neutral-900 mb-12">
                  Konsultan Pendamping Terakreditasi,
                </p>

                <!-- Stempel Bulat Beruang (Lingkaran Hijau Stempel Resmi) -->
                <div
                  class="absolute top-10 left-3 w-28 h-28 rounded-full border-2 border-[#00AA13] text-[#00AA13] flex flex-col items-center justify-center pointer-events-none opacity-85 transform -rotate-12 select-none"
                  aria-hidden="true"
                >
                  <span class="text-[7px] font-bold uppercase tracking-wider">KOMITE VERIFIKASI RESMI</span>
                  <span class="text-[10px] font-black uppercase my-0.5 border-y border-[#00AA13] px-2">TERVALIDASI</span>
                  <span class="text-[6px] font-bold uppercase tracking-widest">BERUANG DATA ROOM</span>
                </div>

                <div class="relative z-10">
                  <p class="font-bold text-sm text-neutral-950 underline underline-offset-2">
                    {{ effectiveConsultantName }}
                  </p>
                  <p class="text-[11px] text-neutral-500 font-mono">
                    NIP / REG: 19780512-200501-2-004
                  </p>
                </div>
              </div>
            </div>

            <!-- Footer Keamanan Cetak -->
            <div class="mt-8 pt-3 border-t border-neutral-200 text-[10px] text-neutral-400 font-mono flex items-center justify-between">
              <span>Dicetak via Platform Beruang Data Room</span>
              <span>Dokumen Elektronik Sah Berdasarkan UU ITE No. 11/2008</span>
            </div>
          </div>
        </div>
      </main>

      <!-- ===================================================================== -->
      <!-- 3. GOOGLE DRIVE BOTTOM STATUS BAR                                      -->
      <!-- ===================================================================== -->
      <footer
        class="h-9 px-4 sm:px-6 flex items-center justify-between text-[11px] text-neutral-400 bg-[#0F121A] border-t border-white/5 shrink-0 z-20"
      >
        <div class="flex items-center gap-2 truncate">
          <span class="text-neutral-300 font-medium truncate">{{ doc.file?.name || doc.title }}</span>
          <span>•</span>
          <span class="font-mono text-neutral-400 tabular-nums">{{ doc.file?.size || '0.8 MB' }}</span>
          <span>•</span>
          <span class="text-emerald-400 flex items-center gap-1">
            <HugeiconsIcon :icon="CheckmarkCircle01Icon" :size="12" />
            <span>Terverifikasi Sistem</span>
          </span>
        </div>

        <div class="hidden sm:flex items-center gap-3 font-mono text-[10px] text-neutral-500">
          <span>Enkripsi SHA-256</span>
          <span>•</span>
          <span>Virtual Data Room Beruang</span>
        </div>
      </footer>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, onBeforeUnmount } from 'vue'
import { useAuthStore } from '~/stores/auth'
import { useReportDownloader } from '~/composables/useReportDownloader'
import { HugeiconsIcon } from '@hugeicons/vue'
import {
  Cancel01Icon,
  PrinterIcon,
  Download01Icon,
  ArrowUpRight01Icon,
  ZoomInIcon,
  ZoomOutIcon,
  Certificate01Icon,
  CheckmarkCircle01Icon
} from '@hugeicons/core-free-icons'

export interface DocumentItem {
  id: string
  title: string
  subtitle?: string
  categoryBadge?: string
  requirementNote?: string
  file?: {
    name: string
    size: string
    uploadedAt: string
    isVerified?: boolean
    fileUrl?: string
    blobUrl?: string
    fileType?: string
    dataUrl?: string
  } | null
}

const props = defineProps<{
  modelValue: boolean
  doc: DocumentItem | null
  businessName?: string
  ownerName?: string
  businessAddress?: string
  sector?: string
  consultantName?: string
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', val: boolean): void
  (e: 'close'): void
}>()

const authStore = useAuthStore()
const { downloadLegalDoc, downloadFile } = useReportDownloader()

// Zoom State
const zoomLevel = ref(100)

function zoomIn() {
  if (zoomLevel.value < 200) {
    zoomLevel.value = Math.min(200, zoomLevel.value + 15)
  }
}

function zoomOut() {
  if (zoomLevel.value > 50) {
    zoomLevel.value = Math.max(50, zoomLevel.value - 15)
  }
}

function resetZoom() {
  zoomLevel.value = 100
}

function fitToWidth() {
  zoomLevel.value = zoomLevel.value === 90 ? 100 : 90
}

// Effective URL & File Type Detection
const effectiveFileUrl = computed(() => {
  return props.doc?.file?.fileUrl || props.doc?.file?.blobUrl || props.doc?.file?.dataUrl || ''
})

const isPdf = computed(() => {
  const fType = props.doc?.file?.fileType?.toLowerCase() || ''
  const name = props.doc?.file?.name?.toLowerCase() || ''
  const url = effectiveFileUrl.value.toLowerCase()
  return fType.includes('pdf') || name.endsWith('.pdf') || url.endsWith('.pdf')
})

const isImage = computed(() => {
  const fType = props.doc?.file?.fileType?.toLowerCase() || ''
  const name = props.doc?.file?.name?.toLowerCase() || ''
  const url = effectiveFileUrl.value.toLowerCase()
  return (
    fType.startsWith('image/') ||
    /\.(png|jpe?g|webp|gif|svg)$/i.test(name) ||
    /\.(png|jpe?g|webp|gif|svg)$/i.test(url)
  )
})

// Business Details Fallbacks
const effectiveBusinessName = computed(() => {
  return props.businessName || authStore.currentUser?.businessName || 'Usaha Saya'
})

const effectiveOwnerName = computed(() => {
  return props.ownerName || authStore.currentUser?.name || 'Ahmad Dani'
})

const effectiveAddress = computed(() => {
  return props.businessAddress || 'Jl. Melati No. 12, Kebayoran Baru, Jakarta Selatan'
})

const effectiveSector = computed(() => {
  return props.sector || authStore.currentUser?.sector || 'Kuliner / Makanan & Minuman'
})

const effectiveConsultantName = computed(() => {
  return props.consultantName || 'Dra. Maya Suryani, M.M.'
})

function close() {
  emit('update:modelValue', false)
  emit('close')
}

function openInNewTab() {
  if (effectiveFileUrl.value) {
    window.open(effectiveFileUrl.value, '_blank')
  } else {
    handlePrint()
  }
}

function handleDownload() {
  if (!props.doc) return
  if (effectiveFileUrl.value) {
    downloadFile(effectiveFileUrl.value, props.doc.file?.name || `${props.doc.title}.pdf`)
  } else {
    downloadLegalDoc({
      title: props.doc.title,
      subtitle: props.doc.subtitle,
      storeName: effectiveBusinessName.value,
      file: props.doc.file
    })
  }
}

function handlePrint() {
  if (typeof window !== 'undefined') {
    window.print()
  }
}

// Keyboard shortcuts (Escape closes, + zooms in, - zooms out, 0 resets)
function handleKeydown(e: KeyboardEvent) {
  if (!props.modelValue) return
  if (e.key === 'Escape') {
    close()
  } else if (e.key === '+' || e.key === '=') {
    zoomIn()
  } else if (e.key === '-') {
    zoomOut()
  } else if (e.key === '0') {
    resetZoom()
  }
}

watch(
  () => props.modelValue,
  (val) => {
    if (val) {
      zoomLevel.value = 100
      if (typeof document !== 'undefined') {
        document.body.style.overflow = 'hidden'
      }
    } else {
      if (typeof document !== 'undefined') {
        document.body.style.overflow = ''
      }
    }
  }
)

onMounted(() => {
  if (typeof window !== 'undefined') {
    window.addEventListener('keydown', handleKeydown)
  }
})

onBeforeUnmount(() => {
  if (typeof window !== 'undefined') {
    window.removeEventListener('keydown', handleKeydown)
    document.body.style.overflow = ''
  }
})
</script>

<style scoped>
@media print {
  body * {
    visibility: hidden !important;
  }
  #gdrive-document-print-sheet,
  #gdrive-document-print-sheet * {
    visibility: visible !important;
  }
  #gdrive-document-print-sheet {
    position: fixed !important;
    left: 0 !important;
    top: 0 !important;
    width: 100% !important;
    min-height: 100% !important;
    box-shadow: none !important;
    border: none !important;
  }
}
</style>
