<template>
  <div class="space-y-6 sm:space-y-8 pb-16 font-poppins text-neutral-900 dark:text-neutral-100">
    <!-- 1. Top Header Bar: Judul Saja (Sejalan dengan standard dashboard) -->
    <div class="gsap-settings-header flex items-center gap-2.5 sm:gap-3 min-h-[44px]">
      <HugeiconsIcon
        :icon="Settings01Icon"
        :size="26"
        :stroke-width="2.2"
        class="text-neutral-900 dark:text-white shrink-0"
      />
      <h1 class="font-poppins font-semibold text-2xl sm:text-3xl text-neutral-900 dark:text-white tracking-tight leading-tight">
        Pengaturan Konsultan Bisnis
      </h1>
    </div>

    <!-- Alert Save Success -->
    <div
      v-if="saved"
      class="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-xs sm:text-sm font-semibold text-emerald-800 dark:text-emerald-300 flex items-center justify-between gap-3 shadow-none animate-in fade-in"
    >
      <div class="flex items-center gap-2.5">
        <HugeiconsIcon :icon="CheckmarkCircle01Icon" :size="18" class="text-[#00800e] dark:text-[#00C058] shrink-0" />
        <span>Konfigurasi bimbingan dan preferensi akun konsultan berhasil diperbarui.</span>
      </div>
      <button
        type="button"
        class="text-xs text-emerald-700 dark:text-emerald-400 hover:underline cursor-pointer"
        @click="saved = false"
      >
        Tutup
      </button>
    </div>

    <!-- ========================================================================= -->
    <!-- 2. BANNER ARAHAN PROFIL KONSULTAN (PALING ATAS, HIGHLIGHT BIRU TERANG)   -->
    <!-- ========================================================================= -->
    <div class="gsap-settings-banner rounded-[22px] p-5 sm:p-6 bg-gradient-to-r from-[#54B0C5] via-[#2091AA] to-[#1E869E] dark:from-[#208CA4] dark:via-[#1A768B] dark:to-[#166476] border border-[#54B0C5]/40 dark:border-[#208CA4]/40 text-white !shadow-none flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div class="flex items-start sm:items-center gap-3.5">
        <div class="w-11 h-11 rounded-xl bg-white/20 text-white flex items-center justify-center shrink-0 border border-white/30 backdrop-blur-xs">
          <HugeiconsIcon :icon="InformationCircleIcon" :size="24" :stroke-width="2" />
        </div>
        <div>
          <p class="text-sm sm:text-base font-bold text-white tracking-tight">
            Ingin mengubah gelar profesi, nomor lisensi BNSP, atau rekam jejak bimbingan?
          </p>
          <p class="text-xs sm:text-[13px] text-cyan-50/95 mt-0.5 leading-relaxed">
            Kredensial sertifikasi dan profil publik konsultan dikelola di lembar profil kerja.
          </p>
        </div>
      </div>

      <div class="shrink-0 w-full sm:w-auto">
        <NuxtLink
          to="/konsultan"
          class="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-white hover:bg-slate-50 text-[#156374] text-xs sm:text-sm font-bold transition-all shadow-none cursor-pointer w-full sm:w-auto"
        >
          <span>Lihat Daftar Klien</span>
          <HugeiconsIcon :icon="ArrowRight01Icon" :size="16" :stroke-width="2.2" class="shrink-0" />
        </NuxtLink>
      </div>
    </div>

    <!-- ========================================================================= -->
    <!-- 3. TAMPILAN & MODE SISTEM (DENGAN VISUAL MOCKUP MINIATUR)                -->
    <!-- ========================================================================= -->
    <div class="gsap-settings-theme">
      <ThemeMockupSelector />
    </div>

    <!-- ========================================================================= -->
    <!-- 4. CONTAINER 1: KAPASITAS BIMBINGAN & ALOKASI KLIEN                       -->
    <!-- ========================================================================= -->
    <div class="gsap-setting-card card-tactile-gopay rounded-[22px] p-6 sm:p-7 border border-[#CBD5E1] dark:border-neutral-800 bg-[#FFFFFF] dark:bg-[#13161F] !shadow-none space-y-6">
      <div class="flex items-center gap-3 pb-4 border-b border-neutral-100 dark:border-neutral-800">
        <div class="w-9 h-9 rounded-xl bg-[#E6F4F7] dark:bg-[#156374]/30 text-[#156374] dark:text-[#50AABF] flex items-center justify-center shrink-0">
          <HugeiconsIcon :icon="UserGroupIcon" :size="20" :stroke-width="2" />
        </div>
        <div>
          <h2 class="text-base sm:text-lg font-bold text-neutral-900 dark:text-white">
            Kapasitas Bimbingan & Beban Kerja
          </h2>
          <p class="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
            Sistem penugasan otomatis admin akan merujuk status ketersediaan dan kuota aktif ini.
          </p>
        </div>
      </div>

      <!-- Status Ketersediaan -->
      <div class="space-y-3">
        <label class="block text-xs font-semibold text-neutral-700 dark:text-neutral-300">
          Status Penerimaan Klien Baru
        </label>
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <label
            :class="[
              'p-3.5 rounded-xl border flex items-center gap-3 cursor-pointer transition-colors shadow-none select-none',
              capacityForm.status === 'AVAILABLE'
                ? 'border-[#00800e] bg-emerald-50/60 dark:bg-emerald-950/20 text-emerald-900 dark:text-emerald-200'
                : 'border-[#CBD5E1] dark:border-neutral-800 bg-[#F8FAFC] dark:bg-[#18191E] text-neutral-600 dark:text-neutral-400'
            ]"
          >
            <input v-model="capacityForm.status" type="radio" value="AVAILABLE" class="w-4 h-4 accent-[#00800e]" />
            <div class="text-xs">
              <span class="font-bold block">Siap Terima Klien</span>
              <span class="text-[11px] opacity-80">Terbuka untuk UMKM baru</span>
            </div>
          </label>

          <label
            :class="[
              'p-3.5 rounded-xl border flex items-center gap-3 cursor-pointer transition-colors shadow-none select-none',
              capacityForm.status === 'FULL'
                ? 'border-amber-500 bg-amber-50/60 dark:bg-amber-950/20 text-amber-900 dark:text-amber-200'
                : 'border-[#CBD5E1] dark:border-neutral-800 bg-[#F8FAFC] dark:bg-[#18191E] text-neutral-600 dark:text-neutral-400'
            ]"
          >
            <input v-model="capacityForm.status" type="radio" value="FULL" class="w-4 h-4 accent-amber-500" />
            <div class="text-xs">
              <span class="font-bold block">Kapasitas Penuh</span>
              <span class="text-[11px] opacity-80">Fokus klien berjalan</span>
            </div>
          </label>

          <label
            :class="[
              'p-3.5 rounded-xl border flex items-center gap-3 cursor-pointer transition-colors shadow-none select-none',
              capacityForm.status === 'LEAVE'
                ? 'border-neutral-400 bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200'
                : 'border-[#CBD5E1] dark:border-neutral-800 bg-[#F8FAFC] dark:bg-[#18191E] text-neutral-600 dark:text-neutral-400'
            ]"
          >
            <input v-model="capacityForm.status" type="radio" value="LEAVE" class="w-4 h-4 accent-neutral-600" />
            <div class="text-xs">
              <span class="font-bold block">Sedang Cuti / Jeda</span>
              <span class="text-[11px] opacity-80">Nonaktif sementara</span>
            </div>
          </label>
        </div>
      </div>

      <!-- Kuota Klien & Sektor -->
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-3 border-t border-neutral-100 dark:border-neutral-800">
        <div>
          <label class="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1.5">
            Batas Maksimal Klien Dampingan Simultan
          </label>
          <div class="flex items-center gap-3">
            <input
              v-model.number="capacityForm.maxClients"
              type="number"
              min="1"
              max="25"
              class="input-tactile-gopay w-32 font-bold tabular-nums"
            />
            <span class="text-xs text-neutral-500 dark:text-neutral-400">
              UMKM aktif (Standar ideal: 6 – 10 klien per konsultan)
            </span>
          </div>
        </div>

        <div>
          <label class="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1.5">
            Sektor Spesialisasi Penugasan
          </label>
          <div class="flex flex-wrap gap-2 pt-0.5">
            <button
              v-for="sector in availableSectors"
              :key="sector"
              type="button"
              :class="[
                'px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-colors border shadow-none cursor-pointer',
                capacityForm.sectors.includes(sector)
                  ? 'bg-[#E6F4F7] dark:bg-[#156374]/30 text-[#156374] dark:text-[#50AABF] border-[#156374]/30'
                  : 'bg-[#F8FAFC] dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 border-[#CBD5E1] dark:border-neutral-700'
              ]"
              @click="toggleSector(sector)"
            >
              {{ sector }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- ========================================================================= -->
    <!-- 5. CONTAINER 2: OTOMASI AI COPILOT & ATURAN ANOMALI                       -->
    <!-- ========================================================================= -->
    <div class="gsap-setting-card card-tactile-gopay rounded-[22px] p-6 sm:p-7 border border-[#CBD5E1] dark:border-neutral-800 bg-[#FFFFFF] dark:bg-[#13161F] !shadow-none space-y-6">
      <div class="flex items-center gap-3 pb-4 border-b border-neutral-100 dark:border-neutral-800">
        <div class="w-9 h-9 rounded-xl bg-purple-50 dark:bg-purple-950/40 text-purple-600 dark:text-purple-400 flex items-center justify-center shrink-0">
          <HugeiconsIcon :icon="SparklesIcon" :size="20" :stroke-width="2" />
        </div>
        <div>
          <h2 class="text-base sm:text-lg font-bold text-neutral-900 dark:text-white">
            Sensitivitas Deteksi Dini & Template Rencana Aksi
          </h2>
          <p class="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
            Konfigurasi asisten cerdas Claude untuk membantu audit kas bulanan dan perbaikan fundamental UMKM.
          </p>
        </div>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label class="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1.5">
            Sensitivitas Peringatan Anomali Biaya
          </label>
          <div class="relative">
            <select
              v-model="aiForm.sensitivity"
              class="input-tactile-gopay cursor-pointer appearance-none pr-10"
            >
              <option value="STRICT">Ketat: Alert memicu jika HPP/Biaya naik &gt; 5%</option>
              <option value="NORMAL">Standar: Alert memicu jika HPP/Biaya naik &gt; 10% (Default)</option>
              <option value="TOLERANT">Toleran: Alert memicu jika HPP/Biaya naik &gt; 15%</option>
            </select>
            <div class="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-neutral-500 flex items-center justify-center">
              <HugeiconsIcon :icon="ArrowDown01Icon" :size="16" :stroke-width="2.2" />
            </div>
          </div>
          <p class="text-[11px] text-neutral-500 dark:text-neutral-400 mt-1.5">
            AI mengirimkan sinyal peringatan bila terdeteksi pembengkakan biaya operasional.
          </p>
        </div>

        <div>
          <label class="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1.5">
            Template Rencana Aksi Bawaan
          </label>
          <div class="relative">
            <select
              v-model="aiForm.defaultPlanTemplate"
              class="input-tactile-gopay cursor-pointer appearance-none pr-10"
            >
              <option value="90_DAY_STANDARD">Standar Beruang: Transformasi 90 Hari (5 Aspek)</option>
              <option value="FNB_EFFICIENCY">Khusus Kuliner: Efisiensi HPP & Standardisasi Porsi</option>
              <option value="AUDIT_READINESS">Akselerasi Pendanaan: Rapikan Pembukuan & Legalitas</option>
            </select>
            <div class="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-neutral-500 flex items-center justify-center">
              <HugeiconsIcon :icon="ArrowDown01Icon" :size="16" :stroke-width="2.2" />
            </div>
          </div>
          <p class="text-[11px] text-neutral-500 dark:text-neutral-400 mt-1.5">
            Diterapkan otomatis pada daftar tugas setiap kali klien baru mulai didampingi.
          </p>
        </div>
      </div>

      <div class="pt-4 border-t border-neutral-100 dark:border-neutral-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div class="space-y-0.5">
          <span class="text-xs sm:text-sm font-bold text-neutral-900 dark:text-white block">
            Auto-Draft Rekomendasi Evaluasi Konsultan
          </span>
          <p class="text-xs text-neutral-500 dark:text-neutral-400">
            Hasilkan draf awal rekomendasi perbaikan saat entri kas bulanan selesai diunggah klien.
          </p>
        </div>
        <label class="relative inline-flex items-center cursor-pointer shrink-0">
          <input v-model="aiForm.autoDraftRecommendations" type="checkbox" class="sr-only peer" />
          <div class="w-11 h-6 bg-neutral-200 peer-focus:outline-none rounded-full peer dark:bg-neutral-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-neutral-600 peer-checked:bg-[#00800e]" />
        </label>
      </div>
    </div>

    <!-- ========================================================================= -->
    <!-- 6. CONTAINER 3: PREFERENSI NOTIFIKASI REVIEW                              -->
    <!-- ========================================================================= -->
    <div class="gsap-setting-card card-tactile-gopay rounded-[22px] p-6 sm:p-7 border border-[#CBD5E1] dark:border-neutral-800 bg-[#FFFFFF] dark:bg-[#13161F] !shadow-none space-y-6">
      <div class="flex items-center gap-3 pb-4 border-b border-neutral-100 dark:border-neutral-800">
        <div class="w-9 h-9 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-[#00800e] dark:text-[#00C058] flex items-center justify-center shrink-0">
          <HugeiconsIcon :icon="Notification01Icon" :size="20" :stroke-width="2" />
        </div>
        <div>
          <h2 class="text-base sm:text-lg font-bold text-neutral-900 dark:text-white">
            Pengingat Validasi & Digest Berkala
          </h2>
          <p class="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
            Atur ritme pengingat agar pemeriksaan kas bulanan klien berjalan tepat waktu.
          </p>
        </div>
      </div>

      <div class="space-y-3">
        <div
          class="p-3.5 sm:p-4 rounded-xl border transition-all flex items-center justify-between gap-4 cursor-pointer select-none shadow-none"
          :class="[
            notifyForm.weeklyDigest
              ? 'border-[#00800e]/30 dark:border-[#00C058]/40 bg-[#F6FCF7] dark:bg-[#00800e]/10'
              : 'border-[#CBD5E1] dark:border-neutral-800 bg-white dark:bg-[#18191E] hover:bg-[#F8FAFC] dark:hover:bg-[#262626]'
          ]"
          @click="notifyForm.weeklyDigest = !notifyForm.weeklyDigest"
        >
          <div class="min-w-0 pr-2">
            <span class="text-xs sm:text-sm font-semibold text-neutral-900 dark:text-white block">
              Ringkasan Mingguan Klien (Weekly Digest Setiap Senin 08:00 WIB)
            </span>
            <span class="text-xs text-neutral-500 dark:text-neutral-400 font-normal leading-snug block mt-0.5">
              Rangkuman otomatis kondisi kas, progres tugas, dan peringatan anomali aktif seluruh UMKM dampingan.
            </span>
          </div>
          <div
            :class="[
              'w-5 h-5 rounded-md border flex items-center justify-center shrink-0 transition-colors',
              notifyForm.weeklyDigest
                ? 'border-[#00800e] dark:border-[#00C058] bg-[#00800e] dark:bg-[#00C058] text-white'
                : 'border-slate-300 dark:border-neutral-600 bg-white dark:bg-neutral-800 text-transparent'
            ]"
          >
            <HugeiconsIcon v-if="notifyForm.weeklyDigest" :icon="Tick02Icon" :size="13" :stroke-width="3" />
          </div>
        </div>

        <div
          class="p-3.5 sm:p-4 rounded-xl border transition-all flex items-center justify-between gap-4 cursor-pointer select-none shadow-none"
          :class="[
            notifyForm.pendingValidationAlert
              ? 'border-[#00800e]/30 dark:border-[#00C058]/40 bg-[#F6FCF7] dark:bg-[#00800e]/10'
              : 'border-[#CBD5E1] dark:border-neutral-800 bg-white dark:bg-[#18191E] hover:bg-[#F8FAFC] dark:hover:bg-[#262626]'
          ]"
          @click="notifyForm.pendingValidationAlert = !notifyForm.pendingValidationAlert"
        >
          <div class="min-w-0 pr-2">
            <span class="text-xs sm:text-sm font-semibold text-neutral-900 dark:text-white block">
              Pengingat Laporan Kas Klien Menunggu Validasi (&gt; 3 Hari Kerja)
            </span>
            <span class="text-xs text-neutral-500 dark:text-neutral-400 font-normal leading-snug block mt-0.5">
              Beri alert jika ada berkas pembukuan bulanan klien yang belum Anda tinjau.
            </span>
          </div>
          <div
            :class="[
              'w-5 h-5 rounded-md border flex items-center justify-center shrink-0 transition-colors',
              notifyForm.pendingValidationAlert
                ? 'border-[#00800e] dark:border-[#00C058] bg-[#00800e] dark:bg-[#00C058] text-white'
                : 'border-slate-300 dark:border-neutral-600 bg-white dark:bg-neutral-800 text-transparent'
            ]"
          >
            <HugeiconsIcon v-if="notifyForm.pendingValidationAlert" :icon="Tick02Icon" :size="13" :stroke-width="3" />
          </div>
        </div>
      </div>
    </div>

    <!-- ========================================================================= -->
    <!-- 7. CONTAINER 4: KREDENSIAL & KEAMANAN AKUN KONSULTAN                      -->
    <!-- ========================================================================= -->
    <div class="gsap-setting-card card-tactile-gopay rounded-[22px] p-6 sm:p-7 border border-[#CBD5E1] dark:border-neutral-800 bg-[#FFFFFF] dark:bg-[#13161F] !shadow-none space-y-6">
      <div class="flex items-center gap-3 pb-4 border-b border-neutral-100 dark:border-neutral-800">
        <div class="w-9 h-9 rounded-xl bg-[#E6F4F7] dark:bg-[#156374]/30 text-[#156374] dark:text-[#50AABF] flex items-center justify-center shrink-0">
          <HugeiconsIcon :icon="SecurityCheckIcon" :size="20" :stroke-width="2" />
        </div>
        <div>
          <h2 class="text-base sm:text-lg font-bold text-neutral-900 dark:text-white">
            Kredensial Dinas & Keamanan Akses
          </h2>
          <p class="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
            Email dinas resmi dan perlindungan data rahasia pembukuan klien UMKM.
          </p>
        </div>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label class="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1.5">
            Email Dinas Konsultan
          </label>
          <input
            type="email"
            disabled
            value="maya.suryani@konsultan.beruang.id"
            class="input-tactile-gopay !bg-neutral-100 dark:!bg-neutral-900 !text-neutral-500 cursor-not-allowed"
          />
        </div>

        <div>
          <label class="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1.5">
            Nomor WhatsApp Dinas
          </label>
          <input
            v-model="accountForm.phone"
            type="tel"
            class="input-tactile-gopay"
          />
        </div>
      </div>

      <div class="pt-4 border-t border-neutral-100 dark:border-neutral-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div class="space-y-0.5">
          <span class="text-xs sm:text-sm font-bold text-neutral-900 dark:text-white block">
            Autentikasi 2 Langkah Wajib (2FA Berkas Finansial)
          </span>
          <p class="text-xs text-neutral-500 dark:text-neutral-400">
            Konsultan diwajibkan mengaktifkan 2FA saat membuka dokumen rekening koran dan data privat klien.
          </p>
        </div>
        <span class="px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800 shrink-0">
          Aktif (Wajib)
        </span>
      </div>
    </div>

    <!-- ========================================================================= -->
    <!-- 8. BOTTOM ACTION BAR                                                      -->
    <!-- ========================================================================= -->
    <div class="gsap-settings-footer flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-neutral-200 dark:border-neutral-800">
      <p class="text-xs text-neutral-500 dark:text-neutral-400">
        Perubahan kuota dan sensitivitas anomali berlaku langsung pada dashboard bimbinganmu.
      </p>

      <div class="flex items-center gap-3 w-full sm:w-auto [&>*]:w-full sm:[&>*]:w-auto">
        <BActionButton
          variant="green"
          :huge-icon="CheckmarkCircle01Icon"
          custom-class="justify-center"
          @click="handleSave"
        >
          {{ isSaving ? 'Menyimpan...' : 'Simpan Pengaturan' }}
        </BActionButton>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, onUnmounted, nextTick } from 'vue'
import gsap from 'gsap'
import ThemeMockupSelector from '~/components/settings/ThemeMockupSelector.vue'
import BActionButton from '~/components/base/BActionButton.vue'
import { HugeiconsIcon } from '@hugeicons/vue'
import {
  Settings01Icon,
  CheckmarkCircle01Icon,
  InformationCircleIcon,
  UserGroupIcon,
  SparklesIcon,
  Notification01Icon,
  SecurityCheckIcon,
  Calendar03Icon,
  Alert01Icon,
  ArrowDown01Icon,
  ArrowRight01Icon,
  Tick02Icon
} from '@hugeicons/core-free-icons'

definePageMeta({
  layout: 'dashboard',
  hideHeader: true
})

let gsapCtx: gsap.Context | null = null

onMounted(async () => {
  await nextTick()
  gsapCtx = gsap.context(() => {
    gsap.from('.gsap-settings-header', {
      opacity: 0,
      y: -14,
      duration: 0.45,
      ease: 'power2.out'
    })
    gsap.from('.gsap-settings-banner', {
      opacity: 0,
      y: 18,
      scale: 0.99,
      duration: 0.5,
      ease: 'power3.out',
      delay: 0.06
    })
    gsap.from('.gsap-settings-theme', {
      opacity: 0,
      y: 18,
      duration: 0.52,
      ease: 'power3.out',
      delay: 0.12
    })
    gsap.from('.gsap-setting-card', {
      opacity: 0,
      y: 22,
      duration: 0.5,
      stagger: 0.08,
      ease: 'power3.out',
      delay: 0.18
    })
    gsap.from('.gsap-settings-footer', {
      opacity: 0,
      y: 16,
      duration: 0.45,
      ease: 'power2.out',
      delay: 0.45
    })
  })
})

onUnmounted(() => {
  if (gsapCtx) {
    gsapCtx.revert()
    gsapCtx = null
  }
})

const saved = ref(false)
const isSaving = ref(false)

const availableSectors = [
  'Kuliner & F&B',
  'Retail & Grosir',
  'Jasa & Kreatif',
  'Agribisnis',
  'Kriya & Fashion'
]

const capacityForm = reactive({
  status: 'AVAILABLE',
  maxClients: 8,
  sectors: ['Kuliner & F&B', 'Retail & Grosir', 'Jasa & Kreatif']
})

const aiForm = reactive({
  sensitivity: 'NORMAL',
  defaultPlanTemplate: '90_DAY_STANDARD',
  autoDraftRecommendations: true
})

const notifyForm = reactive({
  weeklyDigest: true,
  pendingValidationAlert: true
})

const accountForm = reactive({
  phone: '0811-9988-7766'
})

function toggleSector(sector: string) {
  const index = capacityForm.sectors.indexOf(sector)
  if (index > -1) {
    if (capacityForm.sectors.length > 1) {
      capacityForm.sectors.splice(index, 1)
    }
  } else {
    capacityForm.sectors.push(sector)
  }
}

function handleSave() {
  isSaving.value = true
  setTimeout(() => {
    isSaving.value = false
    saved.value = true
    setTimeout(() => {
      saved.value = false
    }, 3500)
  }, 600)
}
</script>

<style scoped>
.input-tactile-gopay {
  width: 100%;
  padding: 0.625rem 0.875rem;
  border-radius: 0.75rem;
  border: 1.5px solid #CBD5E1;
  background-color: #FFFFFF;
  color: #0F172A;
  font-family: 'Poppins', sans-serif;
  font-size: 0.875rem;
  line-height: 1.25rem;
  transition: all 0.15s ease-in-out;
  outline: none;
  box-shadow: none !important;
}

select.input-tactile-gopay {
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  padding-right: 2.5rem !important;
}

:deep(.dark) .input-tactile-gopay,
html.dark .input-tactile-gopay {
  border-color: #334155 !important;
  background-color: #161922 !important;
  color: #F8FAFC !important;
}

.input-tactile-gopay:focus {
  border-color: #156374;
  box-shadow: none !important;
}
</style>
