<template>
  <div class="space-y-8 pb-20 font-sans">
    <!-- 1. EXECUTIVE ADMIN HEADER (Double-Bezel Hardware Architecture) -->
    <div class="p-1.5 sm:p-2 rounded-[2.25rem] bg-neutral-200/50 dark:bg-neutral-800/40 border border-neutral-300/40 dark:border-neutral-700/30 shadow-xs">
      <div class="p-6 sm:p-8 lg:p-10 rounded-[calc(2.25rem-0.5rem)] bg-white dark:bg-[#141519] border border-neutral-200/80 dark:border-neutral-800/90 shadow-[inset_0_1px_1px_rgba(255,255,255,0.9)] dark:shadow-[inset_0_1px_1px_rgba(255,255,255,0.06)] flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative overflow-hidden">
        <div class="space-y-3 max-w-2xl relative z-10">
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-50 dark:bg-primary-950/60 text-primary-700 dark:text-primary-300 border border-primary-200 dark:border-primary-800 text-[10px] font-mono font-extrabold uppercase tracking-[0.15em]">
            <span class="w-1.5 h-1.5 rounded-full bg-primary-500 animate-pulse" />
            <span>PUSAT KENDALI OPERASIONAL & TATA KELOLA PLATFORM</span>
          </div>

          <h1 class="text-3xl sm:text-4xl font-heading font-extrabold text-neutral-900 dark:text-white tracking-[-0.03em] leading-tight text-balance">
            Dashboard Administrator Ekosistem
          </h1>

          <p class="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed font-sans max-w-xl">
            Monitor perputaran modal UMKM nasional, kepatuhan audit konsultan berlisensi BNSP, dan alokasi tiket modal investasi terverifikasi tanpa gagal bayar.
          </p>
        </div>

        <div class="flex items-center gap-3 shrink-0">
          <!-- Button-in-Button Trailing Icon -->
          <button
            type="button"
            class="group pl-5 pr-2 py-2 rounded-full font-heading font-bold text-xs bg-primary-500 hover:bg-primary-600 text-white shadow-xs transition-all duration-300 active:scale-[0.98] inline-flex items-center gap-3 cursor-pointer"
            @click="showAssignModal = true"
          >
            <span>Tugaskan Konsultan</span>
            <span class="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center font-mono text-[11px] font-bold text-white transition-transform duration-300 group-hover:scale-105">
              {{ isAssigned ? 0 : 1 }}
            </span>
          </button>
        </div>
      </div>
    </div>

    <!-- 2. MACRO METRICS TELEMETRY (Double-Bezel 4-Quadrant Shell) -->
    <div class="p-1.5 sm:p-2 rounded-[2.25rem] bg-neutral-200/50 dark:bg-neutral-800/40 border border-neutral-300/40 dark:border-neutral-700/30 shadow-xs">
      <div class="p-6 sm:p-8 rounded-[calc(2.25rem-0.5rem)] bg-white dark:bg-[#141519] border border-neutral-200/80 dark:border-neutral-800/90 shadow-[inset_0_1px_1px_rgba(255,255,255,0.9)] dark:shadow-[inset_0_1px_1px_rgba(255,255,255,0.06)]">
        <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <div class="p-4 sm:p-5 rounded-2xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200/70 dark:border-neutral-800 space-y-1">
            <div class="flex items-center justify-between text-neutral-400">
              <span class="text-[10px] font-mono uppercase tracking-wider font-extrabold text-neutral-500">Total UMKM Terdaftar</span>
              <HugeiconsIcon :icon="Store01Icon" :size="17" :stroke-width="1.75" class="text-primary-500" />
            </div>
            <div class="text-3xl font-heading font-extrabold text-neutral-900 dark:text-white tabular-nums font-mono pt-1">
              142 <span class="text-xs font-normal text-neutral-400 font-sans">Usaha</span>
            </div>
            <span class="text-[11px] text-emerald-600 dark:text-emerald-400 font-bold block font-mono">● +12 Usaha Baru Bulan Ini</span>
          </div>

          <div class="p-4 sm:p-5 rounded-2xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200/70 dark:border-neutral-800 space-y-1">
            <div class="flex items-center justify-between text-neutral-400">
              <span class="text-[10px] font-mono uppercase tracking-wider font-extrabold text-emerald-600 dark:text-emerald-400">Konsultan Aktif</span>
              <HugeiconsIcon :icon="Briefcase01Icon" :size="17" :stroke-width="1.75" class="text-emerald-500" />
            </div>
            <div class="text-3xl font-heading font-extrabold text-neutral-900 dark:text-white tabular-nums font-mono pt-1">
              28 <span class="text-xs font-normal text-neutral-400 font-sans">Mitra</span>
            </div>
            <span class="text-[11px] text-neutral-500 font-medium block font-mono">100% Akreditasi BNSP</span>
          </div>

          <div class="p-4 sm:p-5 rounded-2xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200/70 dark:border-neutral-800 space-y-1">
            <div class="flex items-center justify-between text-neutral-400">
              <span class="text-[10px] font-mono uppercase tracking-wider font-extrabold text-amber-600 dark:text-amber-400">Ready for Funding</span>
              <HugeiconsIcon :icon="Award01Icon" :size="17" :stroke-width="1.75" class="text-amber-500" />
            </div>
            <div class="text-3xl font-heading font-extrabold text-emerald-600 dark:text-emerald-400 tabular-nums font-mono pt-1">
              38 <span class="text-xs font-normal text-neutral-400 font-sans">Usaha</span>
            </div>
            <span class="text-[11px] text-neutral-500 font-medium block font-mono">26.7% Rasio Kelulusan</span>
          </div>

          <div class="p-4 sm:p-5 rounded-2xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200/70 dark:border-neutral-800 space-y-1">
            <div class="flex items-center justify-between text-neutral-400">
              <span class="text-[10px] font-mono uppercase tracking-wider font-extrabold text-primary-600 dark:text-primary-400">Dana Modal Tersalur</span>
              <HugeiconsIcon :icon="Coins01Icon" :size="17" :stroke-width="1.75" class="text-primary-500" />
            </div>
            <div class="text-3xl font-heading font-extrabold text-neutral-900 dark:text-white tabular-nums font-mono pt-1">
              Rp 4.2 M
            </div>
            <span class="text-[11px] text-emerald-600 dark:text-emerald-400 font-bold block font-mono">● 0% Gagal Bayar (NPL Nol)</span>
          </div>
        </div>
      </div>
    </div>

    <!-- 3. ACTION REQUIRED: KONSULTAN ASSIGNMENT BANNER (Double-Bezel Hardware Architecture) -->
    <div
      v-if="!isAssigned"
      class="p-1.5 sm:p-2 rounded-[2rem] bg-primary-100/60 dark:bg-primary-950/40 border border-primary-300/60 dark:border-primary-800/60 shadow-xs"
    >
      <div class="p-5 sm:p-6 rounded-[calc(2rem-0.5rem)] bg-primary-50/80 dark:bg-[#151821] border border-primary-200 dark:border-primary-900 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
        <div class="flex items-start gap-4">
          <div class="w-10 h-10 rounded-2xl bg-primary-500 text-white flex items-center justify-center shrink-0 shadow-xs">
            <HugeiconsIcon :icon="UserAdd01Icon" :size="20" :stroke-width="2" />
          </div>
          <div class="space-y-1">
            <div class="flex items-center gap-2">
              <span class="text-[10px] font-mono font-extrabold uppercase px-2 py-0.5 rounded bg-primary-200 text-primary-900 dark:bg-primary-900 dark:text-primary-200">
                Tindakan Diperlukan
              </span>
              <span class="text-xs font-mono text-neutral-500">Antrean Onboarding</span>
            </div>
            <h4 class="font-heading font-extrabold text-base text-neutral-900 dark:text-white leading-tight">
              1 UMKM Baru Selesai Onboarding Menunggu Penugasan Konsultan
            </h4>
            <p class="text-xs text-neutral-600 dark:text-neutral-300 leading-relaxed font-sans max-w-xl">
              <strong>Warung Soto Banjar H. Kadir</strong> (Surabaya, Sektor F&B) siap memulai audit 5 pilar fundamental pertama bersama mitra konsultan.
            </p>
          </div>
        </div>

        <!-- Button-in-Button Action -->
        <button
          type="button"
          class="group pl-5 pr-2 py-2 rounded-full font-heading font-bold text-xs bg-primary-500 hover:bg-primary-600 text-white shrink-0 transition-all duration-300 active:scale-[0.98] shadow-xs inline-flex items-center gap-3 cursor-pointer"
          @click="showAssignModal = true"
        >
          <span>Tugaskan Sekarang</span>
          <span class="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center transition-transform duration-300 group-hover:translate-x-0.5">
            <HugeiconsIcon :icon="ArrowRight01Icon" :size="13" :stroke-width="2" />
          </span>
        </button>
      </div>
    </div>

    <div
      v-else
      class="p-1 rounded-2xl bg-emerald-200/50 dark:bg-emerald-900/40 border border-emerald-300/40"
    >
      <div class="p-4 rounded-[calc(1rem-0.25rem)] bg-emerald-50 dark:bg-emerald-950/40 flex items-center justify-between text-xs text-emerald-800 dark:text-emerald-300 font-heading font-semibold">
        <div class="flex items-center gap-2.5">
          <span class="text-base">✅</span>
          <span>Dra. Maya Suryani, M.M. berhasil ditugaskan mendampingi Warung Soto Banjar H. Kadir.</span>
        </div>
        <span class="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-200 text-emerald-900 dark:bg-emerald-900 dark:text-emerald-200 font-bold shrink-0">
          PENUGASAN SELESAI
        </span>
      </div>
    </div>

    <!-- 4. LIVE AUDIT & ACTIVITY FEED (Double-Bezel Hardware Architecture) -->
    <div class="p-1.5 sm:p-2 rounded-[2.25rem] bg-neutral-200/50 dark:bg-neutral-800/40 border border-neutral-300/40 dark:border-neutral-700/30 shadow-xs">
      <div class="p-6 sm:p-8 lg:p-10 rounded-[calc(2.25rem-0.5rem)] bg-white dark:bg-[#141519] border border-neutral-200/80 dark:border-neutral-800/90 shadow-[inset_0_1px_1px_rgba(255,255,255,0.9)] dark:shadow-[inset_0_1px_1px_rgba(255,255,255,0.06)] space-y-6">
        <div class="flex flex-col sm:flex-row sm:items-end justify-between gap-2 pb-4 border-b border-neutral-100 dark:border-neutral-800">
          <div>
            <span class="text-[10px] font-mono font-extrabold uppercase tracking-[0.2em] text-primary-600 dark:text-primary-400 block">
              § 02 // TELEMETRI EKOSISTEM REAL-TIME
            </span>
            <h2 class="text-2xl sm:text-3xl font-heading font-extrabold text-neutral-900 dark:text-white tracking-tight mt-1">
              Aktivitas Audit & Distribusi Kelayakan
            </h2>
          </div>
          <span class="text-xs font-mono text-emerald-600 dark:text-emerald-400 font-bold">
            ● Live Stream Active
          </span>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <!-- Feed List (Col 8) -->
          <div class="lg:col-span-8 p-6 rounded-3xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 space-y-4">
            <h3 class="font-heading font-bold text-sm text-neutral-900 dark:text-white">
              Log Transaksi & Validasi Terakhir
            </h3>

            <div class="divide-y divide-neutral-200/70 dark:divide-neutral-800">
              <div
                v-for="act in activityList"
                :key="act.id"
                class="py-3.5 flex items-start justify-between gap-4 text-xs first:pt-0 last:pb-0"
              >
                <div class="space-y-0.5">
                  <p class="font-heading font-bold text-neutral-900 dark:text-white">
                    {{ act.title }}
                  </p>
                  <p class="text-neutral-500 dark:text-neutral-400 font-sans">
                    {{ act.desc }}
                  </p>
                </div>
                <span class="text-[11px] font-mono text-neutral-400 shrink-0 font-medium">
                  {{ act.time }}
                </span>
              </div>
            </div>
          </div>

          <!-- Quick Platform Health Distribution (Col 4) -->
          <div class="lg:col-span-4 p-6 rounded-3xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 space-y-5 flex flex-col justify-between">
            <div class="space-y-4">
              <h3 class="font-heading font-bold text-sm text-neutral-900 dark:text-white">
                Distribusi Akreditasi Kelayakan
              </h3>

              <div class="space-y-3.5 text-xs">
                <div class="space-y-1.5">
                  <div class="flex justify-between font-mono">
                    <span class="text-neutral-600 dark:text-neutral-400">Grade A (Ready Funding)</span>
                    <strong class="text-emerald-600">38 Usaha (26.7%)</strong>
                  </div>
                  <div class="w-full h-2.5 rounded-full bg-neutral-200 dark:bg-neutral-800 overflow-hidden">
                    <div class="h-full bg-emerald-500 rounded-full" style="width: 26.7%" />
                  </div>
                </div>

                <div class="space-y-1.5">
                  <div class="flex justify-between font-mono">
                    <span class="text-neutral-600 dark:text-neutral-400">Grade B (Dalam Bimbingan)</span>
                    <strong class="text-blue-600">74 Usaha (52.1%)</strong>
                  </div>
                  <div class="w-full h-2.5 rounded-full bg-neutral-200 dark:bg-neutral-800 overflow-hidden">
                    <div class="h-full bg-blue-500 rounded-full" style="width: 52.1%" />
                  </div>
                </div>

                <div class="space-y-1.5">
                  <div class="flex justify-between font-mono">
                    <span class="text-neutral-600 dark:text-neutral-400">Grade C (Tahap Awal/Campur)</span>
                    <strong class="text-amber-600">30 Usaha (21.2%)</strong>
                  </div>
                  <div class="w-full h-2.5 rounded-full bg-neutral-200 dark:bg-neutral-800 overflow-hidden">
                    <div class="h-full bg-amber-500 rounded-full" style="width: 21.2%" />
                  </div>
                </div>
              </div>
            </div>

            <div class="pt-4 border-t border-neutral-200/80 dark:border-neutral-800 text-[11px] font-mono text-neutral-500 leading-relaxed">
              Semua UMKM Grade A diproteksi audit rekonsiliasi kas harian untuk mencegah risiko gagal bayar pada sindikasi investor.
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- ASSIGN MODAL (Double-Bezel Architecture) -->
    <div
      v-if="showAssignModal"
      class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-950/60 backdrop-blur-xs animate-in fade-in duration-150"
    >
      <div class="p-1.5 sm:p-2 rounded-[2.25rem] bg-neutral-200/50 dark:bg-neutral-800/60 border border-neutral-300/40 dark:border-neutral-700/40 shadow-2xl max-w-lg w-full">
        <div class="p-6 sm:p-8 rounded-[calc(2.25rem-0.5rem)] bg-white dark:bg-[#141519] border border-neutral-200/80 dark:border-neutral-800 space-y-5">
          <div class="flex items-center justify-between">
            <div>
              <span class="text-[10px] font-mono uppercase tracking-wider text-primary-600 font-bold block">
                ADMIN DISPATCHER
              </span>
              <h3 class="font-heading font-extrabold text-xl text-neutral-900 dark:text-white mt-0.5">
                Tugaskan Konsultan Pembimbing
              </h3>
            </div>
            <button
              type="button"
              class="text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200 text-xs font-mono px-2 py-1 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 cursor-pointer"
              @click="showAssignModal = false"
            >
              ✕ Tutup
            </button>
          </div>

          <div class="p-4 rounded-2xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200/70 dark:border-neutral-800 space-y-2 text-xs font-mono">
            <div class="flex justify-between">
              <span class="text-neutral-500 font-sans">UMKM Baru:</span>
              <strong class="text-neutral-900 dark:text-white font-heading">Warung Soto Banjar H. Kadir (Surabaya)</strong>
            </div>
            <div class="flex justify-between">
              <span class="text-neutral-500 font-sans">Sektor:</span>
              <span>F&B Tradisional</span>
            </div>
            <div class="flex justify-between">
              <span class="text-neutral-500 font-sans">Konsultan Terpilih:</span>
              <span class="text-primary-600 dark:text-primary-400 font-bold">Dra. Maya Suryani, M.M. (BNSP #7281)</span>
            </div>
          </div>

          <div class="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              class="px-4 py-2 rounded-full text-xs font-heading font-semibold text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800 cursor-pointer transition-colors"
              @click="showAssignModal = false"
            >
              Batal
            </button>
            <button
              type="button"
              class="group pl-5 pr-2 py-2 rounded-full text-xs font-heading font-bold bg-primary-500 hover:bg-primary-600 text-white cursor-pointer transition-all duration-300 active:scale-[0.98] shadow-xs inline-flex items-center gap-2.5"
              @click="confirmAssignment"
            >
              <span>Konfirmasi & Tugaskan Konsultan</span>
              <span class="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center transition-transform duration-300 group-hover:translate-x-0.5">
                <HugeiconsIcon :icon="ArrowRight01Icon" :size="12" :stroke-width="2" />
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { HugeiconsIcon } from '@hugeicons/vue'
import {
  Store01Icon,
  Briefcase01Icon,
  Award01Icon,
  Coins01Icon,
  UserAdd01Icon,
  ArrowRight01Icon
} from '@hugeicons/core-free-icons'

definePageMeta({
  layout: 'dashboard'
})

const showAssignModal = ref(false)
const isAssigned = ref(false)

function confirmAssignment() {
  isAssigned.value = true
  showAssignModal.value = false
}

const activityList = [
  {
    id: 1,
    title: 'Kopi Senja Nusantara Mengunggah Kas Bulanan',
    desc: 'Laporan kas September 2026 sebesar Rp 100.000.000 dengan margin 32.6% berhasil tercatat.',
    time: '12 menit lalu'
  },
  {
    id: 2,
    title: 'Dra. Maya Suryani Memvalidasi Audit Legalitas',
    desc: 'Sertifikat Halal dan NIB RBA milik Kopi Senja diverifikasi valid 100%.',
    time: '45 menit lalu'
  },
  {
    id: 3,
    title: 'Hendro Wicaksono Mengajukan Minat Investasi',
    desc: 'Tiket modal ekspansi Rp 250.000.000 diajukan ke data room Kopi Senja Nusantara.',
    time: '2 jam lalu'
  },
  {
    id: 4,
    title: 'Sambal Bu Rudy Asli Meraih Grade A',
    desc: 'Lolos uji audit 5 pilar dengan skor 88/100, siap kurasi sindikasi modal.',
    time: '5 jam lalu'
  }
]
</script>
