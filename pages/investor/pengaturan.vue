<template>
  <div class="space-y-6 sm:space-y-8 pb-16 font-poppins text-neutral-900 dark:text-neutral-100">
    <!-- 1. Top Header Bar: Judul Saja -->
    <div class="gsap-settings-header flex items-center gap-2.5 sm:gap-3 min-h-[44px]">
      <HugeiconsIcon
        :icon="Settings01Icon"
        :size="26"
        :stroke-width="2.2"
        class="text-neutral-900 dark:text-white shrink-0"
      />
      <h1 class="font-poppins font-semibold text-2xl sm:text-3xl text-neutral-900 dark:text-white tracking-tight leading-tight">
        Pengaturan Portofolio Investor
      </h1>
    </div>

    <!-- Alert Save Success -->
    <div
      v-if="saved"
      class="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-xs sm:text-sm font-semibold text-emerald-800 dark:text-emerald-300 flex items-center justify-between gap-3 shadow-none animate-in fade-in"
    >
      <div class="flex items-center gap-2.5">
        <HugeiconsIcon :icon="CheckmarkCircle01Icon" :size="18" class="text-[#00800e] dark:text-[#00C058] shrink-0" />
        <span>Tesis investasi dan preferensi profil investor Anda berhasil diperbarui.</span>
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
    <!-- 2. BANNER ARAHAN KATALOG INVESTOR (PALING ATAS, HIGHLIGHT BIRU TERANG)    -->
    <!-- ========================================================================= -->
    <div class="gsap-settings-banner rounded-[22px] p-5 sm:p-6 bg-gradient-to-r from-[#54B0C5] via-[#2091AA] to-[#1E869E] dark:from-[#208CA4] dark:via-[#1A768B] dark:to-[#166476] border border-[#54B0C5]/40 dark:border-[#208CA4]/40 text-white !shadow-none flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div class="flex items-start sm:items-center gap-3.5">
        <div class="w-11 h-11 rounded-xl bg-white/20 text-white flex items-center justify-center shrink-0 border border-white/30 backdrop-blur-xs">
          <HugeiconsIcon :icon="InformationCircleIcon" :size="24" :stroke-width="2" />
        </div>
        <div>
          <p class="text-sm sm:text-base font-bold text-white tracking-tight">
            Ingin mengeksplorasi UMKM terverifikasi dan mengajukan izin pembukaan data room?
          </p>
          <p class="text-xs sm:text-[13px] text-cyan-50/95 mt-0.5 leading-relaxed">
            Daftar bisnis siap danai dengan metrik pertumbuhan teruji tersedia di Katalog Usaha.
          </p>
        </div>
      </div>

      <div class="shrink-0 w-full sm:w-auto">
        <NuxtLink
          to="/investor"
          class="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-white hover:bg-slate-50 text-[#156374] text-xs sm:text-sm font-bold transition-all shadow-none cursor-pointer w-full sm:w-auto"
        >
          <span>Buka Katalog Usaha</span>
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
    <!-- 4. CONTAINER 1: TESIS & KRITERIA PORTOFOLIO                              -->
    <!-- ========================================================================= -->
    <div class="gsap-setting-card card-tactile-gopay rounded-[22px] p-6 sm:p-7 border border-[#CBD5E1] dark:border-neutral-800 bg-[#FFFFFF] dark:bg-[#13161F] !shadow-none space-y-6">
      <div class="flex items-center gap-3 pb-4 border-b border-neutral-100 dark:border-neutral-800">
        <div class="w-9 h-9 rounded-xl bg-[#E6F4F7] dark:bg-[#156374]/30 text-[#156374] dark:text-[#50AABF] flex items-center justify-center shrink-0">
          <HugeiconsIcon :icon="Briefcase01Icon" :size="20" :stroke-width="2" />
        </div>
        <div>
          <h2 class="text-base sm:text-lg font-bold text-neutral-900 dark:text-white">
            Tesis Investasi & Ambang Batas Kelayakan
          </h2>
          <p class="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
            Membantu kurasi bot Beruang mencocokkan UMKM terverifikasi yang relevan dengan mandat modal Anda.
          </p>
        </div>
      </div>

      <!-- Sektor Industri -->
      <div>
        <label class="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-2">
          Sektor Industri Minat Investasi
        </label>
        <div class="flex flex-wrap gap-2">
          <button
            v-for="sec in availableSectors"
            :key="sec"
            type="button"
            :class="[
              'px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all border shadow-none cursor-pointer',
              thesisForm.sectors.includes(sec)
                ? 'bg-[#156374] text-white border-[#156374]'
                : 'bg-[#F8FAFC] dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 border-[#CBD5E1] dark:border-neutral-700'
            ]"
            @click="toggleSector(sec)"
          >
            {{ sec }}
          </button>
        </div>
      </div>

      <!-- Skema & Tiket -->
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
        <div>
          <label class="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1.5">
            Preferensi Skema Kerjasama
          </label>
          <div class="relative">
            <select
              v-model="thesisForm.preferredScheme"
              class="input-tactile-gopay cursor-pointer appearance-none pr-10"
            >
              <option value="REVENUE_SHARE">Bagi Hasil / Revenue Share</option>
              <option value="PERFORMANCE_LOAN">Pinjaman Modal Kerja Berbasis Kinerja</option>
              <option value="EQUITY">Penyertaan Saham Ekuitas Minoritas</option>
              <option value="ALL">Semua Skema Terbuka</option>
            </select>
            <div class="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-neutral-500 flex items-center justify-center">
              <HugeiconsIcon :icon="ArrowDown01Icon" :size="16" :stroke-width="2.2" />
            </div>
          </div>
        </div>

        <div>
          <label class="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1.5">
            Rentang Tiket Modal per Usaha
          </label>
          <div class="relative">
            <select
              v-model="thesisForm.ticketRange"
              class="input-tactile-gopay cursor-pointer appearance-none pr-10"
            >
              <option value="50M-150M">Rp 50 Juta – Rp 150 Juta (Micro)</option>
              <option value="150M-500M">Rp 150 Juta – Rp 500 Juta (Growth)</option>
              <option value="500M-1B">Rp 500 Juta – Rp 1 Miliar (Scale-up)</option>
              <option value="1B+">&gt; Rp 1 Miliar (Sindikasi Besar)</option>
            </select>
            <div class="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-neutral-500 flex items-center justify-center">
              <HugeiconsIcon :icon="ArrowDown01Icon" :size="16" :stroke-width="2.2" />
            </div>
          </div>
        </div>
      </div>

      <!-- Ambang Batas Skor -->
      <div class="pt-4 border-t border-neutral-100 dark:border-neutral-800">
        <label class="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1.5">
          Ambang Batas Skor Radar Fundamental Minimum
        </label>
        <div class="flex flex-col sm:flex-row sm:items-center gap-3">
          <div class="relative w-full sm:w-56">
            <select
              v-model.number="thesisForm.minScore"
              class="input-tactile-gopay cursor-pointer appearance-none pr-10 font-bold tabular-nums"
            >
              <option :value="70">Skor &ge; 70 (Siap Damping)</option>
              <option :value="75">Skor &ge; 75 (Standar Kelayakan)</option>
              <option :value="80">Skor &ge; 80 (Kondisi Sangat Sehat)</option>
              <option :value="85">Skor &ge; 85 (Kelas Unggulan)</option>
            </select>
            <div class="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-neutral-500 flex items-center justify-center">
              <HugeiconsIcon :icon="ArrowDown01Icon" :size="16" :stroke-width="2.2" />
            </div>
          </div>
          <span class="text-xs text-neutral-500 dark:text-neutral-400">
            Hanya kirimkan alert dealflow untuk UMKM yang telah memenuhi ambang skor ini.
          </span>
        </div>
      </div>
    </div>

    <!-- ========================================================================= -->
    <!-- 5. CONTAINER 2: TEMPLATE BAKU PERMOHONAN RUANG DATA                       -->
    <!-- ========================================================================= -->
    <div class="gsap-setting-card card-tactile-gopay rounded-[22px] p-6 sm:p-7 border border-[#CBD5E1] dark:border-neutral-800 bg-[#FFFFFF] dark:bg-[#13161F] !shadow-none space-y-6">
      <div class="flex items-center gap-3 pb-4 border-b border-neutral-100 dark:border-neutral-800">
        <div class="w-9 h-9 rounded-xl bg-blue-50 dark:bg-blue-950/40 text-[#156374] dark:text-[#50AABF] flex items-center justify-center shrink-0">
          <HugeiconsIcon :icon="Message01Icon" :size="20" :stroke-width="2" />
        </div>
        <div>
          <h2 class="text-base sm:text-lg font-bold text-neutral-900 dark:text-white">
            Template Baku Permohonan Izin Ruang Data
          </h2>
          <p class="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
            Pesan ini otomatis terisi pada formulir pembukaan berkas privat agar proses due diligence lebih cepat.
          </p>
        </div>
      </div>

      <div>
        <label class="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1.5">
          Draf Salam Pembuka & Rencana Tiket Modal
        </label>
        <textarea
          v-model="templateForm.introMessage"
          rows="5"
          class="input-tactile-gopay !h-auto leading-relaxed resize-none"
        />
      </div>

      <div class="p-3.5 rounded-xl bg-[#F8FAFC] dark:bg-[#18191E] border border-[#CBD5E1] dark:border-neutral-800 text-xs text-neutral-600 dark:text-neutral-400 flex items-center gap-2.5">
        <HugeiconsIcon :icon="InformationCircleIcon" :size="18" class="text-[#156374] dark:text-[#50AABF] shrink-0" />
        <span>Pesan ini tetap dapat disesuaikan kembali sebelum dikirimkan ke pihak pemilik toko.</span>
      </div>
    </div>

    <!-- ========================================================================= -->
    <!-- 6. CONTAINER 3: PREFERENSI NOTIFIKASI DEALFLOW                            -->
    <!-- ========================================================================= -->
    <div class="gsap-setting-card card-tactile-gopay rounded-[22px] p-6 sm:p-7 border border-[#CBD5E1] dark:border-neutral-800 bg-[#FFFFFF] dark:bg-[#13161F] !shadow-none space-y-6">
      <div class="flex items-center gap-3 pb-4 border-b border-neutral-100 dark:border-neutral-800">
        <div class="w-9 h-9 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-[#00800e] dark:text-[#00C058] flex items-center justify-center shrink-0">
          <HugeiconsIcon :icon="Notification01Icon" :size="20" :stroke-width="2" />
        </div>
        <div>
          <h2 class="text-base sm:text-lg font-bold text-neutral-900 dark:text-white">
            Peringatan Peluang & Persetujuan Akses
          </h2>
          <p class="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
            Pilih jalur notifikasi instan untuk mengamankan kesempatan investasi terbaik sebelum kuota terpenuhi.
          </p>
        </div>
      </div>

      <div class="space-y-3">
        <div
          class="p-3.5 sm:p-4 rounded-xl border transition-all flex items-center justify-between gap-4 cursor-pointer select-none shadow-none"
          :class="[
            notifyForm.instantDealAlert
              ? 'border-[#00800e]/30 dark:border-[#00C058]/40 bg-[#F6FCF7] dark:bg-[#00800e]/10'
              : 'border-[#CBD5E1] dark:border-neutral-800 bg-white dark:bg-[#18191E] hover:bg-[#F8FAFC] dark:hover:bg-[#262626]'
          ]"
          @click="notifyForm.instantDealAlert = !notifyForm.instantDealAlert"
        >
          <div class="min-w-0 pr-2">
            <span class="text-xs sm:text-sm font-semibold text-neutral-900 dark:text-white block">
              Alert Instan UMKM "Ready for Funding" yang Cocok
            </span>
            <span class="text-xs text-neutral-500 dark:text-neutral-400 font-normal leading-snug block mt-0.5">
              Kirimkan notifikasi seketika konsultan meluluskan status pendanaan pada UMKM yang sesuai dengan kriteria tesis Anda.
            </span>
          </div>
          <div
            :class="[
              'w-5 h-5 rounded-md border flex items-center justify-center shrink-0 transition-colors',
              notifyForm.instantDealAlert
                ? 'border-[#00800e] dark:border-[#00C058] bg-[#00800e] dark:bg-[#00C058] text-white'
                : 'border-slate-300 dark:border-neutral-600 bg-white dark:bg-neutral-800 text-transparent'
            ]"
          >
            <HugeiconsIcon v-if="notifyForm.instantDealAlert" :icon="Tick02Icon" :size="13" :stroke-width="3" />
          </div>
        </div>

        <div
          class="p-3.5 sm:p-4 rounded-xl border transition-all flex items-center justify-between gap-4 cursor-pointer select-none shadow-none"
          :class="[
            notifyForm.accessApprovedAlert
              ? 'border-[#00800e]/30 dark:border-[#00C058]/40 bg-[#F6FCF7] dark:bg-[#00800e]/10'
              : 'border-[#CBD5E1] dark:border-neutral-800 bg-white dark:bg-[#18191E] hover:bg-[#F8FAFC] dark:hover:bg-[#262626]'
          ]"
          @click="notifyForm.accessApprovedAlert = !notifyForm.accessApprovedAlert"
        >
          <div class="min-w-0 pr-2">
            <span class="text-xs sm:text-sm font-semibold text-neutral-900 dark:text-white block">
              Pemberitahuan Persetujuan Akses Ruang Data
            </span>
            <span class="text-xs text-neutral-500 dark:text-neutral-400 font-normal leading-snug block mt-0.5">
              Alert langsung saat pemilik UMKM mengizinkan permohonan buka berkas finansial dan rekening koran.
            </span>
          </div>
          <div
            :class="[
              'w-5 h-5 rounded-md border flex items-center justify-center shrink-0 transition-colors',
              notifyForm.accessApprovedAlert
                ? 'border-[#00800e] dark:border-[#00C058] bg-[#00800e] dark:bg-[#00C058] text-white'
                : 'border-slate-300 dark:border-neutral-600 bg-white dark:bg-neutral-800 text-transparent'
            ]"
          >
            <HugeiconsIcon v-if="notifyForm.accessApprovedAlert" :icon="Tick02Icon" :size="13" :stroke-width="3" />
          </div>
        </div>
      </div>
    </div>

    <!-- ========================================================================= -->
    <!-- 7. CONTAINER 4: IDENTITAS & AKREDITASI LEMBAGA                            -->
    <!-- ========================================================================= -->
    <div class="gsap-setting-card card-tactile-gopay rounded-[22px] p-6 sm:p-7 border border-[#CBD5E1] dark:border-neutral-800 bg-[#FFFFFF] dark:bg-[#13161F] !shadow-none space-y-6">
      <div class="flex items-center gap-3 pb-4 border-b border-neutral-100 dark:border-neutral-800">
        <div class="w-9 h-9 rounded-xl bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
          <HugeiconsIcon :icon="SecurityCheckIcon" :size="20" :stroke-width="2" />
        </div>
        <div>
          <h2 class="text-base sm:text-lg font-bold text-neutral-900 dark:text-white">
            Identitas Akun & Akreditasi Lembaga
          </h2>
          <p class="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
            Informasi resmi yang tercantum pada surat permohonan akses dan perjanjian kerahasiaan data (NDA).
          </p>
        </div>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label class="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1.5">
            Nama Lengkap Investor
          </label>
          <input
            v-model="identityForm.name"
            type="text"
            class="input-tactile-gopay"
          />
        </div>

        <div>
          <label class="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1.5">
            Nama Lembaga / Sindikasi Modal
          </label>
          <input
            v-model="identityForm.syndicate"
            type="text"
            class="input-tactile-gopay"
          />
        </div>

        <div>
          <label class="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1.5">
            Email Resmi Investor
          </label>
          <input
            v-model="identityForm.email"
            type="email"
            class="input-tactile-gopay"
          />
        </div>

        <div>
          <label class="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1.5">
            Nomor WhatsApp Transaksi (Alert Cepat)
          </label>
          <input
            v-model="identityForm.phone"
            type="tel"
            class="input-tactile-gopay"
          />
        </div>
      </div>

      <div class="pt-4 border-t border-neutral-100 dark:border-neutral-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <span class="text-xs sm:text-sm font-bold text-neutral-900 dark:text-white block">
            Status Akreditasi & KYC Platform
          </span>
          <span class="text-xs text-neutral-500 dark:text-neutral-400">
            Dokumen identitas dan bukti kelayakan modal telah diverifikasi tim kepatuhan Beruang.
          </span>
        </div>
        <span class="px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800 shrink-0 self-start sm:self-auto">
          Terakreditasi Resmi
        </span>
      </div>
    </div>

    <!-- ========================================================================= -->
    <!-- 8. BOTTOM ACTION BAR                                                      -->
    <!-- ========================================================================= -->
    <div class="gsap-settings-footer flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-neutral-200 dark:border-neutral-800">
      <p class="text-xs text-neutral-500 dark:text-neutral-400">
        Perubahan kriteria tesis akan otomatis menyaring notifikasi rekomendasi bisnis di katalog Anda.
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
  Briefcase01Icon,
  Message01Icon,
  Notification01Icon,
  SecurityCheckIcon,
  Award01Icon,
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
  'Logistik & Distribusi'
]

const thesisForm = reactive({
  sectors: ['Kuliner & F&B', 'Retail & Grosir'],
  preferredScheme: 'REVENUE_SHARE',
  ticketRange: '150M-500M',
  minScore: 75
})

const templateForm = reactive({
  introMessage: 'Halo Bapak/Ibu Pemilik Usaha,\n\nKami dari Nusantara Angel Syndicate sangat tertarik dengan perkembangan bisnis dan konsistensi perbaikan margin usaha Anda yang tercatat di platform Beruang. Kami berencana mengalokasikan tiket pendanaan modal kerja dan ingin mempelajari laporan performa kas di Ruang Data Anda lebih lanjut.\n\nSalam hangat,\nTim Investasi Nusantara'
})

const notifyForm = reactive({
  instantDealAlert: true,
  accessApprovedAlert: true
})

const identityForm = reactive({
  name: 'Hendrawan Pratama, CFA',
  syndicate: 'Nusantara Angel Syndicate',
  email: 'hendrawan@nusantaracapital.id',
  phone: '0811-2233-4455'
})

function toggleSector(sec: string) {
  const index = thesisForm.sectors.indexOf(sec)
  if (index > -1) {
    if (thesisForm.sectors.length > 1) {
      thesisForm.sectors.splice(index, 1)
    }
  } else {
    thesisForm.sectors.push(sec)
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
