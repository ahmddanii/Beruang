<template>
  <Teleport to="body">
    <div
      v-if="modelValue"
      class="fixed inset-0 z-[120] flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-neutral-950/80 backdrop-blur-md animate-in fade-in duration-200"
      @click.self="close"
    >
      <div
        class="relative w-full max-w-4xl bg-white dark:bg-[#0F141C] rounded-[24px] shadow-2xl border border-neutral-200 dark:border-neutral-800 overflow-hidden my-auto"
      >
        <!-- Modal Toolbar (Hidden during Print) -->
        <div class="print:hidden flex items-center justify-between px-6 py-4 border-b border-neutral-100 dark:border-neutral-800/80 bg-neutral-50 dark:bg-[#13161F]">
          <div class="flex items-center gap-2">
            <span class="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span class="text-xs font-poppins font-semibold text-neutral-800 dark:text-neutral-200">
              Sertifikat Resmi Terverifikasi
            </span>
          </div>

          <div class="flex items-center gap-2">
            <button
              type="button"
              class="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-poppins font-semibold bg-[#00AA13] hover:bg-[#009210] text-white shadow-xs transition-colors cursor-pointer"
              @click="printCertificate"
            >
              <HugeiconsIcon :icon="PrinterIcon" :size="15" />
              <span>Cetak / Unduh PDF</span>
            </button>
            <button
              type="button"
              class="w-9 h-9 rounded-xl flex items-center justify-center text-neutral-400 hover:text-neutral-700 dark:hover:text-white hover:bg-neutral-200 dark:hover:bg-neutral-800 transition-colors cursor-pointer"
              @click="close"
            >
              <HugeiconsIcon :icon="Cancel01Icon" :size="18" />
            </button>
          </div>
        </div>

        <!-- Printable Certificate Canvas (Standard A4 Proportions) -->
        <div id="certificate-print-area" class="p-6 sm:p-12 text-neutral-900 dark:text-neutral-100 font-poppins relative overflow-hidden bg-gradient-to-br from-[#FCFDFE] via-[#F8FBFC] to-[#F1F6F8] dark:from-[#0B0F15] dark:via-[#0F141E] dark:to-[#131926]">
          <!-- Luxury Certificate Frame Border -->
          <div class="relative border-[3px] border-[#156374]/30 dark:border-[#50AABF]/30 p-6 sm:p-10 rounded-[18px] bg-white/70 dark:bg-black/20 backdrop-blur-xs">
            <!-- Corner Accents -->
            <div class="absolute -top-1.5 -left-1.5 w-4 h-4 border-t-2 border-l-2 border-[#156374] dark:border-[#50AABF]" />
            <div class="absolute -top-1.5 -right-1.5 w-4 h-4 border-t-2 border-r-2 border-[#156374] dark:border-[#50AABF]" />
            <div class="absolute -bottom-1.5 -left-1.5 w-4 h-4 border-b-2 border-l-2 border-[#156374] dark:border-[#50AABF]" />
            <div class="absolute -bottom-1.5 -right-1.5 w-4 h-4 border-b-2 border-r-2 border-[#156374] dark:border-[#50AABF]" />

            <!-- Header Branding -->
            <div class="text-center space-y-2">
              <div class="flex items-center justify-center gap-3">
                <img src="/logo.svg" alt="Beruang" class="w-8 h-8 object-contain" />
                <span class="font-poppins font-bold text-xl tracking-tight text-neutral-900 dark:text-white">
                  BERUANG <span class="text-neutral-400 text-sm font-normal">| INDONESIA</span>
                </span>
              </div>
              <p class="text-[10px] sm:text-xs uppercase tracking-[0.25em] text-[#156374] dark:text-[#50AABF] font-semibold">
                Komite Kurasi Kesiapan Investasi UMKM Nasional
              </p>
            </div>

            <!-- Title -->
            <div class="text-center my-6 sm:my-8 space-y-1.5">
              <h2 class="text-xl sm:text-3xl font-bold tracking-tight text-neutral-950 dark:text-white uppercase">
                Sertifikat Kesiapan Pendanaan
              </h2>
              <p class="text-[11px] sm:text-xs text-neutral-500 font-mono">
                Nomor Akreditasi: {{ certificateNumber }}
              </p>
            </div>

            <!-- Body Statement -->
            <div class="text-center max-w-2xl mx-auto space-y-4 text-xs sm:text-sm text-neutral-700 dark:text-neutral-300">
              <p>Dengan ini menerangkan bahwa entitas usaha:</p>
              
              <div class="py-2">
                <h3 class="text-2xl sm:text-3xl font-extrabold text-[#156374] dark:text-[#50AABF] tracking-tight">
                  {{ businessName }}
                </h3>
                <p class="text-xs sm:text-sm text-neutral-500 mt-0.5">
                  Pemilik: <strong class="text-neutral-900 dark:text-white">{{ ownerName }}</strong> • Sektor: {{ sector }} • Kota: {{ city }}
                </p>
              </div>

              <p class="leading-relaxed font-sans text-xs sm:text-sm text-neutral-600 dark:text-neutral-400">
                Telah melewati audit kelayakan keuangan, transparansi arus kas operasional, dan kepatuhan perizinan bersama konsultan pendamping resmi, serta dinyatakan sah meraih predikat:
              </p>

              <!-- Grade & Score Badge -->
              <div class="inline-flex items-center gap-4 px-6 py-2.5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-300 dark:border-emerald-700 text-emerald-800 dark:text-emerald-300 my-2">
                <div class="text-left">
                  <span class="text-[10px] uppercase font-semibold text-emerald-600 block">Status Akreditasi</span>
                  <span class="text-base sm:text-lg font-bold">READY FOR FUNDING</span>
                </div>
                <div class="h-8 w-px bg-emerald-200 dark:bg-emerald-800" />
                <div class="text-left">
                  <span class="text-[10px] uppercase font-semibold text-emerald-600 block">Skor Kelayakan</span>
                  <span class="text-base sm:text-lg font-bold tabular-nums">{{ healthScore }}/100 (Grade A)</span>
                </div>
              </div>

              <div class="grid grid-cols-2 gap-3 max-w-md mx-auto text-[11px] sm:text-xs text-neutral-500 bg-neutral-100/70 dark:bg-neutral-900/60 p-3 rounded-xl">
                <div>
                  <span>Target Tiket Permodalan:</span>
                  <strong class="block text-neutral-900 dark:text-white tabular-nums">Rp {{ formatNumber(ticketSize) }}</strong>
                </div>
                <div>
                  <span>Tenor & Skema:</span>
                  <strong class="block text-neutral-900 dark:text-white">Bagi Hasil • 24 Bulan</strong>
                </div>
              </div>
            </div>

            <!-- Signature & Validation Footer -->
            <div class="grid grid-cols-2 gap-6 pt-10 sm:pt-14 mt-6 border-t border-neutral-200/80 dark:border-neutral-800 text-center">
              <div class="space-y-1">
                <p class="text-[11px] text-neutral-500">Konsultan Kurator Terakreditasi BNSP</p>
                <div class="h-14 flex items-center justify-center">
                  <span class="font-serif italic text-lg sm:text-xl text-neutral-800 dark:text-neutral-200 font-semibold">
                    {{ consultantName }}
                  </span>
                </div>
                <p class="text-xs font-bold text-neutral-900 dark:text-white">{{ consultantName }}</p>
                <p class="text-[10px] text-neutral-400 font-mono">Reg. BNSP-KONS-2024-8891</p>
              </div>

              <div class="space-y-1">
                <p class="text-[11px] text-neutral-500">Direktur Ekosistem Beruang</p>
                <div class="h-14 flex items-center justify-center relative">
                  <!-- Stamp Graphic -->
                  <div class="absolute w-20 h-20 rounded-full border-2 border-emerald-600/40 text-emerald-700/50 flex items-center justify-center text-[9px] uppercase font-bold rotate-[-12deg] pointer-events-none select-none">
                    VERIFIED<br>BERUANG
                  </div>
                  <span class="font-serif italic text-lg sm:text-xl text-neutral-800 dark:text-neutral-200 font-semibold">
                    Fathur Rahman, CFA
                  </span>
                </div>
                <p class="text-xs font-bold text-neutral-900 dark:text-white">Fathur Rahman, CFA</p>
                <p class="text-[10px] text-neutral-400">Komite Pendanaan Indonesia</p>
              </div>
            </div>

            <!-- Certified Date & Barcode -->
            <div class="text-center pt-6 text-[10px] text-neutral-400 flex items-center justify-between border-t border-dashed border-neutral-200 dark:border-neutral-800 mt-6">
              <span>Diterbitkan di Jakarta, {{ issuedDate }}</span>
              <span class="font-mono">VERIFIKASI: beruang.id/v/{{ certificateId }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { HugeiconsIcon } from '@hugeicons/vue'
import { PrinterIcon, Cancel01Icon } from '@hugeicons/core-free-icons'

const props = withDefaults(
  defineProps<{
    modelValue: boolean
    businessName?: string
    ownerName?: string
    sector?: string
    city?: string
    healthScore?: number
    ticketSize?: number
    consultantName?: string
  }>(),
  {
    businessName: 'Kopi Senja Nusantara',
    ownerName: 'Fikri Setiawan',
    sector: 'Kuliner & Minuman (F&B)',
    city: 'Bandung',
    healthScore: 85,
    ticketSize: 250000000,
    consultantName: 'Dra. Maya Suryani, M.M.'
  }
)

const emit = defineEmits<{
  (e: 'update:modelValue', val: boolean): void
}>()

const certificateId = computed(() => 'BRU-2026-X8891')
const certificateNumber = computed(() => 'BERUANG/CERT/2026/X/0892')
const issuedDate = computed(() => '24 Oktober 2026')

function close() {
  emit('update:modelValue', false)
}

function formatNumber(num: number): string {
  return new Intl.NumberFormat('id-ID').format(num)
}

function printCertificate() {
  if (typeof window !== 'undefined') {
    window.print()
  }
}
</script>

<style scoped>
@media print {
  body * {
    visibility: hidden;
  }
  #certificate-print-area, #certificate-print-area * {
    visibility: visible;
  }
  #certificate-print-area {
    position: fixed;
    left: 0;
    top: 0;
    width: 100vw;
    height: 100vh;
    padding: 30px !important;
    background: white !important;
    color: black !important;
  }
}
</style>
