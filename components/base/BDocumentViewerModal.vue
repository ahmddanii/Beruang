<template>
  <Teleport to="body">
    <div
      v-if="modelValue && doc"
      class="fixed inset-0 z-[120] flex items-center justify-center p-2 sm:p-4 md:p-6 overflow-y-auto bg-neutral-950/75 backdrop-blur-md animate-in fade-in duration-200 font-poppins"
      @click.self="close"
    >
      <!-- Modal Box: Tactile Card Beruang Style -->
      <div
        class="relative w-full max-w-5xl bg-white dark:bg-[#10141D] rounded-[28px] shadow-2xl border border-neutral-200/90 dark:border-neutral-800 overflow-hidden flex flex-col my-auto max-h-[92vh] card-tactile-gopay"
      >
        <!-- ===================================================================== -->
        <!-- 1. BERUANG TOP TOOLBAR (Clean, Ice-Blue / Soft Gray Tactile Header)   -->
        <!-- ===================================================================== -->
        <header
          class="px-4 sm:px-6 py-3 sm:py-3.5 flex items-center justify-between border-b border-neutral-100 dark:border-neutral-800/80 bg-neutral-50/90 dark:bg-[#13161F] shrink-0 gap-3"
        >
          <!-- Sisi Kiri: Ikon Dokumen + Judul + Nama Berkas + Badge -->
          <div class="flex items-center gap-2.5 sm:gap-3 min-w-0">
            <!-- Ikon Badge Beruang -->
            <div
              class="w-9 h-9 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-[#00AA13] flex items-center justify-center shrink-0 border border-emerald-200/60 dark:border-emerald-800/60 shadow-xs"
            >
              <HugeiconsIcon :icon="Certificate01Icon" :size="20" />
            </div>

            <div class="min-w-0">
              <div class="flex items-center gap-2 flex-wrap">
                <h3 class="font-poppins font-bold text-sm sm:text-base text-neutral-900 dark:text-white truncate max-w-[180px] sm:max-w-xs md:max-w-md">
                  {{ doc.title }}
                </h3>
                <span
                  class="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/70 text-[#00AA13] dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800 text-[10px] font-semibold shrink-0"
                >
                  <span class="w-1.5 h-1.5 rounded-full bg-[#00AA13] animate-pulse" />
                  <span>Sah & Tervalidasi</span>
                </span>
              </div>
              <p class="text-[11px] font-poppins text-neutral-400 dark:text-neutral-500 truncate max-w-[180px] sm:max-w-xs">
                {{ doc.file?.name || doc.subtitle }} · <span class="tabular-nums">{{ doc.file?.size || '0.8 MB' }}</span>
              </p>
            </div>
          </div>

          <!-- Sisi Tengah: Zoom Controls (Tactile Pill Beruang) -->
          <div class="hidden md:flex items-center gap-1 px-2.5 py-1 rounded-xl bg-white dark:bg-[#1A1F2C] border border-neutral-200/80 dark:border-neutral-700/80 shadow-xs shrink-0 text-xs text-neutral-600 dark:text-neutral-300">
            <button
              type="button"
              class="w-6 h-6 rounded-lg flex items-center justify-center hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-500 hover:text-neutral-900 dark:hover:text-white transition-colors disabled:opacity-30 cursor-pointer"
              :disabled="zoomLevel <= 60"
              title="Perkecil (-)"
              @click="zoomOut"
            >
              <HugeiconsIcon :icon="ZoomOutIcon" :size="14" />
            </button>

            <button
              type="button"
              class="px-2 py-0.5 rounded text-xs font-mono font-bold text-neutral-800 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors cursor-pointer tabular-nums"
              title="Klik untuk reset zoom ke 100%"
              @click="resetZoom"
            >
              {{ zoomLevel }}%
            </button>

            <button
              type="button"
              class="w-6 h-6 rounded-lg flex items-center justify-center hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-500 hover:text-neutral-900 dark:hover:text-white transition-colors disabled:opacity-30 cursor-pointer"
              :disabled="zoomLevel >= 160"
              title="Perbesar (+)"
              @click="zoomIn"
            >
              <HugeiconsIcon :icon="ZoomInIcon" :size="14" />
            </button>

            <span class="w-px h-3.5 bg-neutral-200 dark:bg-neutral-700 mx-0.5" />

            <button
              type="button"
              class="px-2 py-0.5 rounded text-[11px] font-medium text-neutral-500 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors cursor-pointer"
              title="Sesuaikan Skala"
              @click="fitToWidth"
            >
              Pas
            </button>
          </div>

          <!-- Sisi Kanan: Action Buttons (Cetak, Unduh, Tutup) -->
          <div class="flex items-center gap-1.5 sm:gap-2 shrink-0">
            <!-- Buka di Tab Baru (jika ada file binary asli) -->
            <button
              v-if="effectiveFileUrl"
              type="button"
              class="btn-pill-action !h-8 !w-8 !p-0 !justify-center"
              title="Buka Dokumen di Tab Baru"
              @click="openInNewTab"
            >
              <HugeiconsIcon :icon="ArrowUpRight01Icon" :size="14" />
            </button>

            <!-- Cetak Dokumen -->
            <button
              type="button"
              class="btn-pill-action !h-8 !px-2.5 sm:!px-3 !text-xs !gap-1.5 cursor-pointer"
              title="Cetak Salinan Dokumen Resmi"
              @click="handlePrint"
            >
              <HugeiconsIcon :icon="PrinterIcon" :size="14" />
              <span class="hidden sm:inline">Cetak</span>
            </button>

            <!-- Unduh Berkas (Hijau GoPay / Beruang 10% Aksen) -->
            <button
              type="button"
              class="btn-pill-action-green !h-8 !px-3 sm:!px-3.5 !text-xs !gap-1.5 cursor-pointer"
              title="Unduh Berkas Resmi"
              @click="handleDownload"
            >
              <HugeiconsIcon :icon="Download01Icon" :size="14" />
              <span>Unduh</span>
            </button>

            <!-- Tutup Tombol X -->
            <button
              type="button"
              class="w-8 h-8 rounded-xl flex items-center justify-center text-neutral-400 hover:text-neutral-800 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors cursor-pointer"
              title="Tutup Pratinjau (Esc)"
              @click="close"
            >
              <HugeiconsIcon :icon="Cancel01Icon" :size="16" />
            </button>
          </div>
        </header>

        <!-- ===================================================================== -->
        <!-- 2. DOCUMENT CANVAS STAGE (Ice-Blue Background with Premium Card)      -->
        <!-- ===================================================================== -->
        <main
          class="flex-1 overflow-auto p-4 sm:p-6 md:p-8 bg-[#F3F8FC] dark:bg-[#0B0F15] flex items-center justify-center relative min-h-[460px]"
          @click.self="close"
        >
          <div
            class="transition-transform duration-150 ease-out origin-top mx-auto my-auto w-full max-w-3xl flex justify-center"
            :style="{ transform: `scale(${zoomLevel / 100})` }"
          >
            <!-- CASE A: EMBEDDED REAL PDF -->
            <div
              v-if="isPdf && effectiveFileUrl"
              class="w-full h-[680px] bg-white rounded-2xl shadow-xl overflow-hidden border border-neutral-200 dark:border-neutral-800 ring-1 ring-black/5"
            >
              <iframe
                :src="effectiveFileUrl"
                class="w-full h-full border-0"
                title="Pratinjau Berkas PDF"
              />
            </div>

            <!-- CASE B: EMBEDDED REAL IMAGE -->
            <div
              v-else-if="isImage && effectiveFileUrl"
              class="w-full flex items-center justify-center p-3 bg-white dark:bg-[#13161F] rounded-2xl shadow-xl border border-neutral-200 dark:border-neutral-800"
            >
              <img
                :src="effectiveFileUrl"
                :alt="doc.title"
                class="max-w-full max-h-[70vh] object-contain rounded-xl shadow-xs"
              />
            </div>

            <!-- CASE C: AUTHENTIC BERUANG LUXURY ACCREDITATION DOCUMENT (POPPINS STYLE) -->
            <div
              v-else
              id="gdrive-document-print-sheet"
              class="w-full bg-white dark:bg-[#13161F] text-neutral-900 dark:text-neutral-100 p-6 sm:p-10 rounded-[24px] shadow-xl border-[2.5px] border-[#156374]/30 dark:border-[#50AABF]/30 relative overflow-hidden font-poppins select-text"
            >
              <!-- Luxury Corner Accents -->
              <div class="absolute -top-1 -left-1 w-4 h-4 border-t-2 border-l-2 border-[#156374] dark:border-[#50AABF]" />
              <div class="absolute -top-1 -right-1 w-4 h-4 border-t-2 border-r-2 border-[#156374] dark:border-[#50AABF]" />
              <div class="absolute -bottom-1 -left-1 w-4 h-4 border-b-2 border-l-2 border-[#156374] dark:border-[#50AABF]" />
              <div class="absolute -bottom-1 -right-1 w-4 h-4 border-b-2 border-r-2 border-[#156374] dark:border-[#50AABF]" />

              <!-- Subtle Watermark Security Badge -->
              <div
                class="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.035] dark:opacity-[0.05] select-none transform -rotate-12"
                aria-hidden="true"
              >
                <div class="text-center font-poppins font-black text-3xl sm:text-5xl leading-tight tracking-wider text-neutral-900 dark:text-white uppercase">
                  BERUANG DATA ROOM VAULT<br />
                  TERVERIFIKASI SAH & RESMI
                </div>
              </div>

              <!-- Header Branding Resmi Beruang -->
              <div class="text-center space-y-1.5 pb-5 border-b border-neutral-200/80 dark:border-neutral-800 relative">
                <div class="flex items-center justify-center gap-2.5">
                  <img src="/logo.svg" alt="Beruang" class="w-7 h-7 object-contain" />
                  <span class="font-poppins font-bold text-lg sm:text-xl tracking-tight text-neutral-900 dark:text-white">
                    BERUANG <span class="text-neutral-400 text-xs sm:text-sm font-normal">| DATA ROOM RESMI</span>
                  </span>
                </div>
                <p class="text-[10px] sm:text-[11px] uppercase tracking-[0.2em] text-[#156374] dark:text-[#50AABF] font-semibold">
                  Komite Standardisasi & Kurasi Perizinan Usaha UMKM
                </p>
              </div>

              <!-- Judul Dokumen & Nomor Registrasi -->
              <div class="text-center my-6 space-y-1">
                <h2 class="text-xl sm:text-2xl font-bold tracking-tight text-neutral-950 dark:text-white uppercase">
                  {{ doc.title }}
                </h2>
                <p class="text-xs text-neutral-500 font-mono">
                  Nomor Arsip: SEC-VDR-{{ doc.id.toUpperCase() }}-2026
                </p>
              </div>

              <!-- Body Statement -->
              <div class="space-y-4 text-xs sm:text-sm text-neutral-700 dark:text-neutral-300">
                <p class="text-center text-xs text-neutral-500">
                  Dengan ini menerangkan bahwa unit usaha yang terdaftar di Virtual Data Room Beruang:
                </p>

                <!-- Bento Grid Spesifikasi Entitas Usaha -->
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-w-xl mx-auto my-3 text-xs">
                  <div class="p-3 rounded-xl bg-neutral-50 dark:bg-neutral-900/60 border border-neutral-200/70 dark:border-neutral-800 space-y-0.5">
                    <span class="text-[10px] text-neutral-400 block font-medium">Nama Pemilik Usaha</span>
                    <strong class="font-bold text-neutral-900 dark:text-white block truncate">{{ effectiveOwnerName }}</strong>
                  </div>
                  <div class="p-3 rounded-xl bg-neutral-50 dark:bg-neutral-900/60 border border-neutral-200/70 dark:border-neutral-800 space-y-0.5">
                    <span class="text-[10px] text-neutral-400 block font-medium">Nama Brand / Entitas</span>
                    <strong class="font-bold text-neutral-900 dark:text-white block truncate">{{ effectiveBusinessName }}</strong>
                  </div>
                  <div class="p-3 rounded-xl bg-neutral-50 dark:bg-neutral-900/60 border border-neutral-200/70 dark:border-neutral-800 space-y-0.5">
                    <span class="text-[10px] text-neutral-400 block font-medium">Sektor Usaha</span>
                    <span class="font-medium text-neutral-800 dark:text-neutral-200 block truncate">{{ effectiveSector }}</span>
                  </div>
                  <div class="p-3 rounded-xl bg-neutral-50 dark:bg-neutral-900/60 border border-neutral-200/70 dark:border-neutral-800 space-y-0.5">
                    <span class="text-[10px] text-neutral-400 block font-medium">Kategori Kepatuhan</span>
                    <span class="font-bold text-[#00AA13] block truncate">{{ doc.categoryBadge || 'Wajib UMKM' }}</span>
                  </div>
                </div>

                <p class="leading-relaxed text-xs sm:text-[13px] text-neutral-600 dark:text-neutral-400 text-center max-w-xl mx-auto">
                  Telah melewati verifikasi kelayakan dokumen, transparansi data kamar berkas, dan pencocokan keabsahan kegiatan operasional bersama konsultan pendamping resmi Beruang, serta dinyatakan sah memenuhi standar uji tuntas kemitraan pembiayaan.
                </p>

                <!-- Status Pill Box -->
                <div class="flex items-center justify-center my-2">
                  <div class="inline-flex items-center gap-2.5 px-4 py-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-xs font-semibold">
                    <HugeiconsIcon :icon="CheckmarkCircle01Icon" :size="16" class="text-[#00AA13]" />
                    <span>Terakreditasi Sah & Aktif Beroperasi</span>
                  </div>
                </div>
              </div>

              <!-- Signature & Validation Footer -->
              <div class="grid grid-cols-2 gap-4 pt-6 mt-6 border-t border-neutral-200/80 dark:border-neutral-800 text-center text-xs">
                <!-- Kolom Konsultan Pendamping -->
                <div class="space-y-1">
                  <p class="text-[10px] text-neutral-400">Konsultan Pendamping Resmi</p>
                  <div class="h-10 flex items-center justify-center">
                    <span class="font-bold text-sm text-neutral-900 dark:text-white">
                      {{ effectiveConsultantName }}
                    </span>
                  </div>
                  <p class="text-[10px] text-neutral-500 font-mono">Reg. KONS-BERUANG-2026</p>
                </div>

                <!-- Kolom Komite Verifikasi Beruang dengan Stempel -->
                <div class="space-y-1 relative">
                  <p class="text-[10px] text-neutral-400">Otoritas Kurasi Data Room</p>
                  <div class="h-10 flex items-center justify-center relative">
                    <!-- Stempel Bulat Beruang Hijau -->
                    <div
                      class="absolute -top-3 w-16 h-16 rounded-full border-2 border-[#00AA13]/50 text-[#00AA13] flex flex-col items-center justify-center text-[7px] font-black uppercase pointer-events-none select-none rotate-[-10deg]"
                      aria-hidden="true"
                    >
                      <span class="text-[6px]">VERIFIED</span>
                      <span class="text-[8px] leading-tight">BERUANG</span>
                      <span class="text-[5px]">DATA ROOM</span>
                    </div>
                    <span class="font-bold text-sm text-neutral-900 dark:text-white">
                      Komite Legalitas Beruang
                    </span>
                  </div>
                  <p class="text-[10px] text-neutral-500 font-mono">ID: SEC-REG-01-VDR</p>
                </div>
              </div>

              <!-- Barcode & Verifikasi URL -->
              <div class="pt-4 text-[10px] text-neutral-400 flex items-center justify-between border-t border-dashed border-neutral-200 dark:border-neutral-800 mt-5">
                <span>Diterbitkan di Jakarta, 25 Oktober 2026</span>
                <span class="font-mono text-neutral-500">Hash: SHA256-{{ doc.id.toUpperCase() }}-VALID</span>
              </div>
            </div>
          </div>
        </main>

        <!-- ===================================================================== -->
        <!-- 3. FOOTER STATUS BAR (GoPay / Beruang Soft Bottom Strip)               -->
        <!-- ===================================================================== -->
        <footer
          class="px-4 sm:px-6 py-2.5 flex items-center justify-between text-xs text-neutral-500 dark:text-neutral-400 bg-white dark:bg-[#13161F] border-t border-neutral-100 dark:border-neutral-800 shrink-0"
        >
          <div class="flex items-center gap-2 truncate text-[11px]">
            <span class="font-medium text-neutral-800 dark:text-neutral-200 truncate">{{ doc.title }}</span>
            <span>•</span>
            <span class="text-[#00AA13] flex items-center gap-1 font-semibold">
              <HugeiconsIcon :icon="CheckmarkCircle01Icon" :size="13" />
              <span>Tervalidasi Sistem</span>
            </span>
          </div>

          <div class="hidden sm:flex items-center gap-2 text-[10px] text-neutral-400 font-mono">
            <span>Enkripsi SHA-256</span>
            <span>•</span>
            <span>Virtual Data Room Beruang</span>
          </div>
        </footer>
      </div>
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
  if (zoomLevel.value < 160) {
    zoomLevel.value = Math.min(160, zoomLevel.value + 15)
  }
}

function zoomOut() {
  if (zoomLevel.value > 60) {
    zoomLevel.value = Math.max(60, zoomLevel.value - 15)
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
