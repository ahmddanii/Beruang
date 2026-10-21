<template>
  <div class="space-y-6 pb-20 select-none">
    
    <!-- ===================================================================== -->
    <!-- 1. TOP NAVIGATION (KEMBALI KE PERMINTAAN & CETAK)                 -->
    <!-- ===================================================================== -->
    <div class="flex items-center justify-between gap-4 pt-1">
      <NuxtLink
        to="/konsultan/klien?tab=permintaan"
        class="inline-flex items-center gap-2 px-3.5 py-2 rounded-full bg-white dark:bg-[#13161F] border border-[#E2E8F0] dark:border-white/10 text-neutral-700 dark:text-neutral-300 text-xs font-bold shadow-2xs hover:border-[#0081A0] hover:text-[#0081A0] dark:hover:border-[#2091AA] dark:hover:text-[#2091AA] transition-all"
      >
        <HugeiconsIcon :icon="ArrowLeft02Icon" :size="15" :stroke-width="2.2" />
        <span>Kembali ke Permintaan Masuk</span>
      </NuxtLink>

      <!-- Quick Action: Print Option -->
      <button
        type="button"
        class="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-white dark:bg-[#13161F] border border-[#E2E8F0] dark:border-white/10 text-neutral-700 dark:text-neutral-300 text-xs font-bold shadow-2xs hover:bg-neutral-50 dark:hover:bg-[#1A1D26] transition-colors cursor-pointer"
        @click="printDocument"
      >
        <HugeiconsIcon :icon="PrinterIcon" :size="14" :stroke-width="2" />
        <span>Cetak Dokumen</span>
      </button>
    </div>

    <!-- ===================================================================== -->
    <!-- FALLBACK: PERMINTAAN TIDAK DITEMUKAN                                  -->
    <!-- ===================================================================== -->
    <div
      v-if="!requestData && !isAlreadyAccepted"
      class="p-12 rounded-3xl bg-white dark:bg-[#13161F] border border-neutral-200/80 dark:border-white/10 text-center space-y-4 max-w-lg mx-auto"
    >
      <div class="w-14 h-14 rounded-2xl bg-amber-500/10 text-amber-600 flex items-center justify-center mx-auto">
        <HugeiconsIcon :icon="File02Icon" :size="28" :stroke-width="2" />
      </div>
      <h3 class="font-heading font-extrabold text-lg text-neutral-900 dark:text-white">
        Data Perjanjian Tidak Ditemukan
      </h3>
      <p class="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed">
        Permintaan bimbingan ini mungkin telah diproses, diterima menjadi binaan aktif, atau tautan tidak valid.
      </p>
      <div class="pt-2">
        <NuxtLink
          to="/konsultan/klien?tab=permintaan"
          class="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#0081A0] hover:bg-[#00708C] text-white text-xs font-bold transition-all shadow-xs"
        >
          <HugeiconsIcon :icon="ArrowLeft02Icon" :size="14" :stroke-width="2.2" />
          <span>Buka Daftar Permintaan Masuk</span>
        </NuxtLink>
      </div>
    </div>

    <!-- ===================================================================== -->
    <!-- MAIN CONTRACT CONTAINER: OFFICIAL LEGAL DOCUMENT VIEW                 -->
    <!-- ===================================================================== -->
    <div v-else class="space-y-6">

      <!-- Legal Agreement Card (Clean Document Canvas) -->
      <div
        id="printable-contract"
        class="bg-white dark:bg-[#13161F] border border-[#E2E8F0] dark:border-white/10 rounded-3xl shadow-[0_12px_40px_-10px_rgba(0,129,160,0.06),0_4px_20px_-2px_rgba(15,23,42,0.03)] p-6 sm:p-10 md:p-12 space-y-8 text-left"
      >
        
        <!-- ================================================================= -->
        <!-- A. KOP SURAT RESMI PLATFORM BERUANG & BNSP PARTNERSHIP           -->
        <!-- ================================================================= -->
        <div class="border-b-2 border-neutral-900 dark:border-white/20 pb-6 space-y-4">
          <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <!-- Brand & Agency Seal -->
            <div class="flex items-center gap-3.5">
              <img src="/logo/logoSmall.svg" alt="Beruang Logo" class="h-10 sm:h-12 w-auto object-contain" />
              <div>
                <span class="font-heading font-extrabold text-2xl tracking-tight leading-none">
                  <span class="text-[#0081A0] dark:text-[#2091AA]">Ber</span><span class="text-[#00AA13] dark:text-[#22C55E]">uang</span>
                </span>
                <p class="text-[10px] font-bold uppercase tracking-wider text-neutral-400 dark:text-neutral-500 mt-1">
                  Platform Kelayakan Usaha & Akselerasi Pendanaan UMKM
                </p>
                <p class="text-[11px] text-neutral-500 dark:text-neutral-400">
                  Standar Akreditasi BNSP Konsultan Pendamping Bisnis Mikro & Kecil
                </p>
              </div>
            </div>

            <!-- Contract Metadata Number & Stamp -->
            <div class="sm:text-right space-y-1">
              <div class="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-[#0081A0]/10 dark:bg-[#0081A0]/20 text-[#0081A0] dark:text-[#2091AA] text-xs font-mono font-bold">
                <HugeiconsIcon :icon="ShieldCheckIcon" :size="14" :stroke-width="2" />
                <span>NO: KTR-BRU/{{ contractCode }}/2026</span>
              </div>
              <p class="text-[11px] text-neutral-400 dark:text-neutral-500 font-mono">
                Registrasi Digital: {{ registrationHash }}
              </p>
              <p class="text-[11px] text-neutral-500 dark:text-neutral-400">
                Tanggal Efektif: <strong class="text-neutral-800 dark:text-neutral-200">{{ currentDateFormatted }}</strong>
              </p>
            </div>
          </div>

          <!-- Decorative Dual Legal Line -->
          <div class="border-b border-neutral-300 dark:border-white/10 pt-1" />
        </div>

        <!-- ================================================================= -->
        <!-- B. JUDUL & PEMBUKAAN PERJANJIAN                                   -->
        <!-- ================================================================= -->
        <div class="text-center space-y-2 py-2">
          <span class="px-3 py-1 rounded-full bg-[#0081A0]/10 dark:bg-[#0081A0]/20 text-[#0081A0] dark:text-[#2091AA] text-[11px] font-bold uppercase tracking-wider">
            Dokumen Resmi Bimbingan Kemitraan
          </span>
          <h1 class="font-heading font-extrabold text-xl sm:text-2xl md:text-3xl text-neutral-900 dark:text-white tracking-tight leading-tight max-w-2xl mx-auto">
            SURAT PERJANJIAN & KOMITMEN PENDAMPINGAN USAHA MIKRO & KECIL (UMKM)
          </h1>
          <p class="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 max-w-xl mx-auto leading-relaxed">
            Perjanjian ini mengikat secara hukum bagi kedua belah pihak sebagai standar pendampingan usaha berbasis 5 pilar fundamental untuk kelayakan pendanaan investor.
          </p>
        </div>

        <!-- Preamble Sentence -->
        <div class="p-4 rounded-2xl bg-neutral-50 dark:bg-[#1A1D26] border border-neutral-200/70 dark:border-white/5 text-xs sm:text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed">
          Pada hari ini, <strong class="text-neutral-900 dark:text-white">{{ currentDateFormatted }}</strong>, bertempat di ekosistem platform digital Beruang Indonesia, telah dibuat dan disepakati perjanjian kemitraan pendampingan bimbingan usaha oleh dan antara pihak-pihak sebagai berikut:
        </div>

        <!-- ================================================================= -->
        <!-- C. KEDUA BELAH PIHAK (PIHAK PERTAMA & PIHAK KEDUA)               -->
        <!-- ================================================================= -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
          
          <!-- PIHAK PERTAMA: KONSULTAN PENDAMPING -->
          <div class="p-5 rounded-2xl bg-neutral-50/80 dark:bg-[#1A1D26]/80 border border-neutral-200/90 dark:border-white/10 space-y-3.5 relative overflow-hidden">
            <div class="flex items-center justify-between border-b border-neutral-200/70 dark:border-white/10 pb-2.5">
              <span class="text-[11px] font-bold uppercase tracking-wider text-[#0081A0] dark:text-[#2091AA]">
                PIHAK PERTAMA
              </span>
              <span class="text-[10px] px-2 py-0.5 rounded-md bg-[#0081A0]/10 text-[#0081A0] dark:text-[#2091AA] font-bold">
                Konsultan Bersertifikasi
              </span>
            </div>

            <div class="flex items-start gap-3">
              <div class="w-12 h-12 rounded-2xl bg-[#0081A0]/10 text-[#0081A0] flex items-center justify-center shrink-0">
                <HugeiconsIcon :icon="Award01Icon" :size="24" :stroke-width="1.8" />
              </div>
              <div class="min-w-0">
                <h3 class="font-heading font-extrabold text-base text-neutral-900 dark:text-white leading-tight">
                  {{ konsultanStore.profile.name }}
                </h3>
                <p class="text-xs text-neutral-600 dark:text-neutral-400 mt-0.5 font-medium">
                  {{ konsultanStore.profile.title }}
                </p>
                <p class="text-[11px] text-neutral-500 dark:text-neutral-400 mt-1">
                  Lisensi BNSP: <span class="font-mono font-bold text-neutral-800 dark:text-neutral-200">{{ konsultanStore.profile.bnspLicense }}</span>
                </p>
              </div>
            </div>

            <div class="pt-2 text-xs text-neutral-600 dark:text-neutral-400 space-y-1 border-t border-neutral-200/50 dark:border-white/5">
              <div class="flex justify-between">
                <span>Lembaga / Firma:</span>
                <strong class="text-neutral-800 dark:text-neutral-200">{{ konsultanStore.profile.firmName }}</strong>
              </div>
              <div class="flex justify-between">
                <span>Spesialisasi:</span>
                <strong class="text-neutral-800 dark:text-neutral-200">{{ konsultanStore.profile.specialization }}</strong>
              </div>
              <div class="flex justify-between">
                <span>Domisili:</span>
                <span class="text-neutral-700 dark:text-neutral-300">{{ konsultanStore.profile.city }}</span>
              </div>
            </div>

            <p class="text-[11px] text-neutral-500 dark:text-neutral-400 italic pt-1">
              Selanjutnya dalam perjanjian ini disebut sebagai <strong>KONSULTAN PENDAMPING</strong>.
            </p>
          </div>

          <!-- PIHAK KEDUA: PELAKU USAHA BINAAN -->
          <div class="p-5 rounded-2xl bg-neutral-50/80 dark:bg-[#1A1D26]/80 border border-neutral-200/90 dark:border-white/10 space-y-3.5 relative overflow-hidden">
            <div class="flex items-center justify-between border-b border-neutral-200/70 dark:border-white/10 pb-2.5">
              <span class="text-[11px] font-bold uppercase tracking-wider text-[#00AA13] dark:text-[#22C55E]">
                PIHAK KEDUA
              </span>
              <span class="text-[10px] px-2 py-0.5 rounded-md bg-[#00AA13]/10 text-[#00AA13] dark:text-[#22C55E] font-bold">
                UMKM Pemohon Bimbingan
              </span>
            </div>

            <div class="flex items-start gap-3">
              <div class="w-12 h-12 rounded-2xl bg-[#00AA13]/10 text-[#00AA13] flex items-center justify-center shrink-0">
                <HugeiconsIcon :icon="Store01Icon" :size="24" :stroke-width="1.8" />
              </div>
              <div class="min-w-0">
                <h3 class="font-heading font-extrabold text-base text-neutral-900 dark:text-white leading-tight">
                  {{ businessName }}
                </h3>
                <p class="text-xs text-neutral-600 dark:text-neutral-400 mt-0.5 font-medium">
                  Pemilik: <strong class="text-neutral-800 dark:text-neutral-200">{{ ownerName }}</strong>
                </p>
                <p class="text-[11px] text-neutral-500 dark:text-neutral-400 mt-1">
                  Sektor Usaha: <span class="font-semibold text-neutral-700 dark:text-neutral-300">{{ sectorName }}</span> • {{ cityName }}
                </p>
              </div>
            </div>

            <div class="pt-2 text-xs text-neutral-600 dark:text-neutral-400 space-y-1 border-t border-neutral-200/50 dark:border-white/5">
              <div class="flex justify-between">
                <span>Skor Fundamental Awal:</span>
                <span class="font-bold text-[#0081A0] dark:text-[#2091AA]">{{ healthScore }}/100</span>
              </div>
              <div class="flex justify-between">
                <span>Status Kesiapan:</span>
                <strong class="text-amber-600 dark:text-amber-400">Perlu Bimbingan & Validasi</strong>
              </div>
              <div class="flex justify-between">
                <span>Estimasi Kebutuhan Modal:</span>
                <span class="font-bold text-neutral-800 dark:text-neutral-200 tabular-nums">Rp {{ (fundingTarget / 1000000).toFixed(0) }} Juta</span>
              </div>
            </div>

            <p class="text-[11px] text-neutral-500 dark:text-neutral-400 italic pt-1">
              Selanjutnya dalam perjanjian ini disebut sebagai <strong>UMKM BINAAN</strong>.
            </p>
          </div>

        </div>

        <!-- ================================================================= -->
        <!-- D. PARAMETER UTAMA KESEPAKATAN (BENTO 4 METRIC CARDS)            -->
        <!-- ================================================================= -->
        <div class="space-y-3">
          <div class="flex items-center justify-between">
            <h3 class="font-heading font-bold text-sm sm:text-base text-neutral-900 dark:text-white flex items-center gap-2">
              <HugeiconsIcon :icon="Coins01Icon" :size="18" :stroke-width="2" class="text-[#0081A0]" />
              <span>Ketentuan Pokok Kerja Sama Pendampingan</span>
            </h3>
            <span class="text-xs text-neutral-400">Parameter Resmi Kontrak</span>
          </div>

          <div class="grid grid-cols-2 lg:grid-cols-4 gap-3.5">
            <!-- Parameter 1: Honor Bimbingan -->
            <div class="p-4 rounded-2xl bg-[#F6F8FA] dark:bg-[#1A1D26] border border-[#E2E8F0] dark:border-white/10 space-y-1">
              <span class="text-[10px] font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 block">
                Honor Bimbingan
              </span>
              <p class="text-base sm:text-lg font-extrabold text-[#0081A0] dark:text-[#2091AA] tabular-nums">
                Rp {{ (monthlyFee / 1000000).toFixed(1) }} Juta<span class="text-xs font-normal text-neutral-400">/bln</span>
              </p>
              <p class="text-[11px] text-neutral-500 dark:text-neutral-400">
                Penyaluran aman via rekening penampung Beruang
              </p>
            </div>

            <!-- Parameter 2: Durasi Kontrak -->
            <div class="p-4 rounded-2xl bg-[#F6F8FA] dark:bg-[#1A1D26] border border-[#E2E8F0] dark:border-white/10 space-y-1">
              <span class="text-[10px] font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 block">
                Durasi Pendampingan
              </span>
              <p class="text-base sm:text-lg font-extrabold text-neutral-900 dark:text-white tabular-nums">
                {{ durationMonths }} Bulan Kalender
              </p>
              <p class="text-[11px] text-neutral-500 dark:text-neutral-400">
                Evaluasi berkala setiap akhir bulan bimbingan
              </p>
            </div>

            <!-- Parameter 3: Omzet Saat Ini -->
            <div class="p-4 rounded-2xl bg-[#F6F8FA] dark:bg-[#1A1D26] border border-[#E2E8F0] dark:border-white/10 space-y-1">
              <span class="text-[10px] font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 block">
                Omzet Basis Usaha
              </span>
              <p class="text-base sm:text-lg font-extrabold text-neutral-900 dark:text-white tabular-nums">
                Rp {{ (revenue / 1000000).toFixed(0) }} Juta<span class="text-xs font-normal text-neutral-400">/bln</span>
              </p>
              <p class="text-[11px] text-neutral-500 dark:text-neutral-400">
                Baseline data sebelum pendampingan berjalan
              </p>
            </div>

            <!-- Parameter 4: Target Utama -->
            <div class="p-4 rounded-2xl bg-[#F6F8FA] dark:bg-[#1A1D26] border border-[#E2E8F0] dark:border-white/10 space-y-1">
              <span class="text-[10px] font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 block">
                Target Capaian
              </span>
              <p class="text-base sm:text-lg font-extrabold text-[#00AA13] dark:text-[#22C55E]">
                Siap Modal & Audit
              </p>
              <p class="text-[11px] text-neutral-500 dark:text-neutral-400">
                Verifikasi 5 pilar siap dipaparkan ke investor
              </p>
            </div>
          </div>
        </div>

        <!-- ================================================================= -->
        <!-- E. PESAN & FOKUS PENDAMPINGAN DARI UMKM BINAAN                   -->
        <!-- ================================================================= -->
        <div v-if="clientMessage" class="p-4 sm:p-5 rounded-2xl bg-[#0081A0]/5 dark:bg-[#0081A0]/10 border border-[#0081A0]/20 space-y-2">
          <div class="flex items-center gap-2 text-xs font-bold text-[#0081A0] dark:text-[#2091AA]">
            <HugeiconsIcon :icon="Task01Icon" :size="16" :stroke-width="2" />
            <span>Pernyataan Kebutuhan Pendampingan dari {{ ownerName }} (Pemilik {{ businessName }}):</span>
          </div>
          <p class="text-xs sm:text-sm text-neutral-700 dark:text-neutral-200 italic leading-relaxed pl-1">
            "{{ clientMessage }}"
          </p>
        </div>

        <!-- ================================================================= -->
        <!-- F. KLAUSUL PASAL-PASAL PERJANJIAN (DETAIL & LENGKAP)              -->
        <!-- ================================================================= -->
        <div class="space-y-4 pt-2">
          <div class="flex items-center justify-between border-b border-neutral-200 dark:border-white/10 pb-3">
            <h3 class="font-heading font-extrabold text-sm sm:text-base text-neutral-900 dark:text-white flex items-center gap-2">
              <HugeiconsIcon :icon="CheckmarkBadge01Icon" :size="18" :stroke-width="2" class="text-[#0081A0]" />
              <span>Klausul Integritas & Standar Etika Bimbingan Konsultan</span>
            </h3>
            <span class="text-xs text-neutral-400 font-medium">Baku Sesuai SNI & Pedoman BNSP</span>
          </div>

          <div class="space-y-3.5 text-xs sm:text-sm text-neutral-700 dark:text-neutral-300">
            
            <!-- PASAL 1 -->
            <div class="p-4 rounded-2xl bg-neutral-50 dark:bg-[#1A1D26] border border-neutral-200/80 dark:border-white/5 space-y-1.5">
              <div class="font-bold text-neutral-900 dark:text-white flex items-center gap-2.5">
                <span class="w-6 h-6 rounded-full bg-[#0081A0]/10 text-[#0081A0] text-xs font-extrabold flex items-center justify-center shrink-0">1</span>
                <span>Pasal 1 — Ruang Lingkup Bimbingan & Roadmap Rencana Aksi</span>
              </div>
              <p class="text-neutral-600 dark:text-neutral-400 leading-relaxed pl-8 text-xs sm:text-sm">
                KONSULTAN PENDAMPING berkewajiban melakukan diagnosa awal terhadap 5 pilar bisnis (Keuangan, Operasional, Legalitas, Pasar, dan SDM) serta merumuskan minimal <strong>3 Rencana Aksi (Action Plan) terstruktur setiap bulan</strong>. Seluruh target disusun secara realistis dan dapat dieksekusi langsung oleh tim UMKM Binaan.
              </p>
            </div>

            <!-- PASAL 2 -->
            <div class="p-4 rounded-2xl bg-neutral-50 dark:bg-[#1A1D26] border border-neutral-200/80 dark:border-white/5 space-y-1.5">
              <div class="font-bold text-neutral-900 dark:text-white flex items-center gap-2.5">
                <span class="w-6 h-6 rounded-full bg-[#0081A0]/10 text-[#0081A0] text-xs font-extrabold flex items-center justify-center shrink-0">2</span>
                <span>Pasal 2 — Pemantauan Mutasi Kas & SLA Respons Konsultan (Maksimal 48 Jam)</span>
              </div>
              <p class="text-neutral-600 dark:text-neutral-400 leading-relaxed pl-8 text-xs sm:text-sm">
                KONSULTAN PENDAMPING wajib meninjau kelengkapan catatan kas usaha minimal <strong>1 kali setiap 2 minggu</strong> melalui fitur Validasi Kas Beruang. Terhadap setiap anomali pengeluaran atau kendala keuangan yang diajukan oleh UMKM Binaan, konsultan berkewajiban memberikan panduan dan rekomendasi tindak lanjut maksimal dalam kurun waktu <strong>2x24 jam kerja (SLA 48 Jam)</strong>.
              </p>
            </div>

            <!-- PASAL 3 -->
            <div class="p-4 rounded-2xl bg-neutral-50 dark:bg-[#1A1D26] border border-neutral-200/80 dark:border-white/5 space-y-1.5">
              <div class="font-bold text-neutral-900 dark:text-white flex items-center gap-2.5">
                <span class="w-6 h-6 rounded-full bg-[#0081A0]/10 text-[#0081A0] text-xs font-extrabold flex items-center justify-center shrink-0">3</span>
                <span>Pasal 3 — Kerahasiaan Data Usaha & Keuangan (Non-Disclosure Agreement / NDA)</span>
              </div>
              <p class="text-neutral-600 dark:text-neutral-400 leading-relaxed pl-8 text-xs sm:text-sm">
                KONSULTAN PENDAMPING menjamin kerahasiaan penuh atas seluruh dokumen finansial, mutasi rekening usaha, resep/formula produk, struktur biaya HPP, daftar pemasok bahan baku, dan daftar pelanggan UMKM Binaan. Informasi tersebut dilarang keras dibocorkan, disalin, atau dipublikasikan kepada pihak ketiga tanpa persetujuan tertulis eksplisit dari pemilik usaha.
              </p>
            </div>

            <!-- PASAL 4 -->
            <div class="p-4 rounded-2xl bg-neutral-50 dark:bg-[#1A1D26] border border-neutral-200/80 dark:border-white/5 space-y-1.5">
              <div class="font-bold text-neutral-900 dark:text-white flex items-center gap-2.5">
                <span class="w-6 h-6 rounded-full bg-[#00AA13]/10 text-[#00AA13] text-xs font-extrabold flex items-center justify-center shrink-0">4</span>
                <span>Pasal 4 — Komitmen Kejujuran & Disiplin Pencatatan oleh UMKM Binaan</span>
              </div>
              <p class="text-neutral-600 dark:text-neutral-400 leading-relaxed pl-8 text-xs sm:text-sm">
                UMKM BINAAN berkomitmen mencatat seluruh transaksi penjualan dan pengeluaran secara jujur, melampirkan bukti transaksi (bon, nota, struk POS, atau rekening koran), serta tidak merekayasa data keuangan demi menaikkan skor kelayakan secara fiktif. Pelanggaran kejujuran pencatatan membatalkan kelayakan pendanaan di platform Beruang.
              </p>
            </div>

            <!-- PASAL 5 -->
            <div class="p-4 rounded-2xl bg-neutral-50 dark:bg-[#1A1D26] border border-neutral-200/80 dark:border-white/5 space-y-1.5">
              <div class="font-bold text-neutral-900 dark:text-white flex items-center gap-2.5">
                <span class="w-6 h-6 rounded-full bg-red-500/10 text-red-600 dark:text-red-400 text-xs font-extrabold flex items-center justify-center shrink-0">5</span>
                <span>Pasal 5 — Akuntabilitas & Larangan Penelantaran Binaan (SLA 14 Hari)</span>
              </div>
              <p class="text-neutral-600 dark:text-neutral-400 leading-relaxed pl-8 text-xs sm:text-sm">
                Apabila KONSULTAN PENDAMPING terbukti tidak aktif memberikan bimbingan atau mengabaikan pesan UMKM binaan selama <strong>14 hari kerja berturut-turut</strong> tanpa alasan force majeure yang sah, komite kurasi Beruang berhak membekukan kontrak kemitraan, memotong honor bimbingan, dan mengalihkan pendampingan usaha ke konsultan berlisensi lain.
              </p>
            </div>

            <!-- PASAL 6 -->
            <div class="p-4 rounded-2xl bg-neutral-50 dark:bg-[#1A1D26] border border-neutral-200/80 dark:border-white/5 space-y-1.5">
              <div class="font-bold text-neutral-900 dark:text-white flex items-center gap-2.5">
                <span class="w-6 h-6 rounded-full bg-neutral-200 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300 text-xs font-extrabold flex items-center justify-center shrink-0">6</span>
                <span>Pasal 6 — Penyelesaian Perselisihan & Yurisdiksi Hukum</span>
              </div>
              <p class="text-neutral-600 dark:text-neutral-400 leading-relaxed pl-8 text-xs sm:text-sm">
                Segala perselisihan yang timbul sehubungan dengan pelaksanaan perjanjian ini akan diselesaikan terlebih dahulu secara musyawarah dan kekeluargaan dengan mediasi tim penasihat hukum Beruang Indonesia sebelum menempuh jalur hukum formal.
              </p>
            </div>

          </div>
        </div>

        <!-- ================================================================= -->
        <!-- G. LEMBAR PENGESAHAN TANDA TANGAN KONSULTAN                       -->
        <!-- ================================================================= -->
        <div class="p-5 sm:p-7 rounded-3xl bg-neutral-50 dark:bg-[#1A1D26] border border-neutral-200/90 dark:border-white/10 space-y-5">
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-neutral-200/70 dark:border-white/10 pb-4">
            <div>
              <h3 class="font-heading font-extrabold text-sm sm:text-base text-neutral-900 dark:text-white flex items-center gap-2">
                <HugeiconsIcon :icon="PencilEdit01Icon" :size="18" :stroke-width="2" class="text-[#0081A0]" />
                <span>Pengesahan Tanda Tangan Digital Konsultan</span>
              </h3>
              <p class="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
                Bubuhkan tanda tanganmu sebagai bukti komitmen bimbingan resmi UMKM binaan ini.
              </p>
            </div>

            <!-- Switcher Mode Tanda Tangan -->
            <div class="inline-flex p-1 rounded-full bg-neutral-200/80 dark:bg-[#13161F] border border-neutral-300/50 dark:border-white/10 text-xs shrink-0 self-start sm:self-auto">
              <button
                type="button"
                :class="[
                  'px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5',
                  signatureMode === 'draw'
                    ? 'bg-white dark:bg-[#0C121D] text-[#0081A0] dark:text-[#2091AA] shadow-xs'
                    : 'text-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-200'
                ]"
                @click="switchSignatureMode('draw')"
              >
                <HugeiconsIcon :icon="PencilEdit01Icon" :size="13" :stroke-width="2" />
                <span>Gores Tangan (Canvas)</span>
              </button>
              <button
                type="button"
                :class="[
                  'px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5',
                  signatureMode === 'type'
                    ? 'bg-white dark:bg-[#0C121D] text-[#0081A0] dark:text-[#2091AA] shadow-xs'
                    : 'text-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-200'
                ]"
                @click="switchSignatureMode('type')"
              >
                <HugeiconsIcon :icon="CheckmarkBadge01Icon" :size="13" :stroke-width="2" />
                <span>Tanda Tangan Otomatis</span>
              </button>
            </div>
          </div>

          <!-- Mode 1: Gores Tangan (Interactive Canvas Pad) -->
          <div v-show="signatureMode === 'draw'" class="space-y-2">
            <div class="relative w-full h-44 rounded-2xl bg-white dark:bg-[#0C121D] border-2 border-dashed border-neutral-300 dark:border-neutral-700 hover:border-[#0081A0]/60 transition-colors overflow-hidden select-none touch-none shadow-inner">
              <canvas
                ref="signatureCanvasRef"
                class="w-full h-full cursor-crosshair block"
                @mousedown="startDrawing"
                @mousemove="drawSignature"
                @mouseup="stopDrawing"
                @mouseleave="stopDrawing"
                @touchstart="startDrawing"
                @touchmove="drawSignature"
                @touchend="stopDrawing"
              />

              <!-- Helper Watermark Background -->
              <div
                v-if="!hasDrawnSignature"
                class="absolute inset-0 flex flex-col items-center justify-center pointer-events-none text-neutral-300 dark:text-neutral-600 gap-1.5 p-4 text-center"
              >
                <div class="w-10 h-10 rounded-full bg-neutral-100 dark:bg-white/5 flex items-center justify-center text-neutral-400">
                  <HugeiconsIcon :icon="PencilEdit01Icon" :size="20" :stroke-width="1.8" />
                </div>
                <span class="text-xs font-medium text-neutral-500 dark:text-neutral-400">
                  Goreskan tanda tanganmu di sini menggunakan mouse, touchpad, stylus, atau jari
                </span>
                <span class="text-[11px] text-neutral-400 dark:text-neutral-500 font-mono">
                  [Area Pengesahan Tanda Tangan Konsultan BNSP]
                </span>
              </div>

              <!-- Baselines -->
              <div class="absolute bottom-6 left-8 right-8 border-b border-dashed border-neutral-200 dark:border-neutral-800 pointer-events-none flex justify-between text-[10px] text-neutral-400 pt-1 font-mono">
                <span>{{ konsultanStore.profile.name }}</span>
                <span>{{ currentDateFormatted }}</span>
              </div>
            </div>

            <div class="flex items-center justify-between text-xs px-1">
              <div class="flex items-center gap-1.5">
                <span
                  v-if="hasDrawnSignature"
                  class="inline-flex items-center gap-1 text-xs font-bold text-emerald-600 dark:text-emerald-400"
                >
                  <HugeiconsIcon :icon="CheckmarkCircle01Icon" :size="14" :stroke-width="2.5" />
                  <span>Tanda tangan telah terekam di dokumen</span>
                </span>
                <span v-else class="text-xs text-neutral-400">
                  Wajib membubuhkan goresan tanda tangan sebelum konfirmasi.
                </span>
              </div>

              <button
                type="button"
                class="inline-flex items-center gap-1 text-xs font-bold text-neutral-500 hover:text-red-500 transition-colors cursor-pointer px-2.5 py-1 rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-800"
                @click="clearCanvas"
              >
                <HugeiconsIcon :icon="Delete02Icon" :size="13" :stroke-width="2" />
                <span>Hapus & Ulangi</span>
              </button>
            </div>
          </div>

          <!-- Mode 2: Tanda Tangan Otomatis / Digital Stamp -->
          <div v-show="signatureMode === 'type'" class="p-5 rounded-2xl bg-white dark:bg-[#0C121D] border border-neutral-200 dark:border-neutral-800 space-y-3">
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div class="space-y-1">
                <span class="text-[10px] font-mono text-[#0081A0] dark:text-[#2091AA] uppercase tracking-wider block font-bold">
                  [BERUANG CERTIFIED E-SIGNATURE]
                </span>
                <p class="font-serif italic text-2xl sm:text-3xl text-[#0081A0] dark:text-[#2091AA] tracking-wide select-none">
                  {{ konsultanStore.profile.name }}
                </p>
                <p class="text-xs text-neutral-500 dark:text-neutral-400 font-sans">
                  Lisensi BNSP Konsultan: <strong class="text-neutral-700 dark:text-neutral-300 font-mono">{{ konsultanStore.profile.bnspLicense }}</strong>
                </p>
              </div>

              <div class="p-3 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 text-right space-y-1 shrink-0">
                <div class="flex items-center sm:justify-end gap-1.5 text-xs font-bold text-emerald-700 dark:text-emerald-300">
                  <HugeiconsIcon :icon="CheckmarkBadge01Icon" :size="16" :stroke-width="2.2" />
                  <span>Sah & Tervalidasi Sistem</span>
                </div>
                <p class="text-[11px] font-mono text-neutral-500 dark:text-neutral-400">
                  {{ currentDateFormatted }} • {{ currentTimeFormatted }}
                </p>
              </div>
            </div>
          </div>

          <!-- Checkbox Pernyataan Komitmen (Wajib Centang) -->
          <div class="pt-2">
            <button
              type="button"
              class="w-full text-left flex items-start gap-3.5 p-4 rounded-2xl border transition-all select-none cursor-pointer"
              :class="agreementChecked ? 'border-[#0081A0] ring-2 ring-[#0081A0]/20 bg-[#0081A0]/5' : 'border-neutral-200 dark:border-white/10 hover:border-[#0081A0]/50 bg-white dark:bg-[#13161F]'"
              @click="agreementChecked = !agreementChecked"
            >
              <div
                class="mt-0.5 w-5 h-5 rounded-md border flex items-center justify-center transition-all shrink-0"
                :class="agreementChecked ? 'bg-[#0081A0] border-[#0081A0] text-white shadow-2xs' : 'border-neutral-300 dark:border-neutral-600 bg-white dark:bg-[#1A1D26]'"
              >
                <HugeiconsIcon v-if="agreementChecked" :icon="CheckmarkCircle01Icon" :size="14" :stroke-width="2.5" />
              </div>
              <span class="text-xs sm:text-sm text-neutral-700 dark:text-neutral-200 leading-relaxed font-sans flex-1">
                Saya, <strong class="text-neutral-900 dark:text-white">{{ konsultanStore.profile.name }}</strong>, menyatakan telah membaca dan menyetujui seluruh klausul perjanjian kemitraan di atas, serta berkomitmen menjalankan pendampingan bimbingan untuk <strong>{{ businessName }}</strong> secara jujur, aktif, dan berintegritas tinggi.
              </span>
            </button>
          </div>

        </div>

      </div>

      <!-- ===================================================================== -->
      <!-- H. STICKY BOTTOM ACTION BAR                                           -->
      <!-- ===================================================================== -->
      <div class="sticky bottom-4 z-30 p-3.5 sm:p-4 rounded-2xl bg-white/95 dark:bg-[#13161F]/95 backdrop-blur-md border border-[#E2E8F0] dark:border-white/10 shadow-[0_10px_35px_-8px_rgba(15,23,42,0.12)] flex flex-col sm:flex-row items-center justify-between gap-3">
        <div class="flex items-center gap-2 w-full sm:w-auto">
          <NuxtLink
            to="/konsultan/klien?tab=permintaan"
            class="w-full sm:w-auto px-5 py-2.5 rounded-full border border-neutral-200 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800 text-xs font-bold text-neutral-700 dark:text-neutral-300 transition-colors text-center cursor-pointer"
          >
            Batal & Kembali
          </NuxtLink>

          <button
            v-if="!isAlreadyAccepted"
            type="button"
            class="w-full sm:w-auto px-4 py-2.5 rounded-full border border-red-200 dark:border-red-900/60 hover:bg-red-50 dark:hover:bg-red-950/30 text-red-600 dark:text-red-400 text-xs font-bold transition-colors cursor-pointer text-center"
            @click="openRejectModal"
          >
            Tolak Permintaan Ini
          </button>
        </div>

        <div class="w-full sm:w-auto flex items-center justify-end gap-3">
          <button
            v-if="!isAlreadyAccepted"
            type="button"
            :disabled="!canSubmitContract || isSubmitting"
            :class="[
              'w-full sm:w-auto px-7 py-3 rounded-full text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 shadow-md',
              canSubmitContract && !isSubmitting
                ? 'bg-[#0081A0] hover:bg-[#00708C] text-white shadow-[0_4px_14px_rgba(0,129,160,0.25)] active:scale-[0.98] cursor-pointer'
                : 'bg-neutral-200 dark:bg-neutral-800 text-neutral-400 dark:text-neutral-500 cursor-not-allowed'
            ]"
            @click="confirmContractAndAccept"
          >
            <HugeiconsIcon :icon="CheckmarkBadge01Icon" :size="18" :stroke-width="2.2" />
            <span>{{ isSubmitting ? 'Memproses Pengesahan...' : 'Tandatangani & Terima Menjadi Binaan' }}</span>
          </button>

          <NuxtLink
            v-else
            :to="`/konsultan/rencana-aksi?client=${clientTargetId}`"
            class="w-full sm:w-auto px-7 py-3 rounded-full bg-[#0081A0] hover:bg-[#00708C] text-white text-xs sm:text-sm font-bold shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <HugeiconsIcon :icon="Task01Icon" :size="18" :stroke-width="2.2" />
            <span>Buka Rencana Aksi Klien Ini</span>
          </NuxtLink>
        </div>
      </div>

    </div>

    <!-- ===================================================================== -->
    <!-- MODAL: TOLAK PERMINTAAN                                               -->
    <!-- ===================================================================== -->
    <BModal
      v-model="showRejectModal"
      size="md"
      title="Tolak Permintaan Bimbingan"
    >
      <div class="space-y-4 text-left py-2">
        <p class="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed">
          Apakah kamu yakin ingin menolak permohonan bimbingan dari <strong class="text-neutral-900 dark:text-white">{{ businessName }}</strong>?
        </p>

        <div class="space-y-1.5">
          <label class="block text-xs font-bold uppercase tracking-wider text-neutral-600 dark:text-neutral-400">
            Alasan Penolakan (Opsional)
          </label>
          <select
            v-model="rejectReason"
            class="w-full px-3.5 py-2.5 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-[#1A1D26] text-xs sm:text-sm text-neutral-900 dark:text-white focus:outline-none focus:border-[#0081A0]"
          >
            <option value="Kapasitas kuota bimbingan konsultan saat ini sedang penuh.">Kapasitas kuota bimbingan penuh</option>
            <option value="Bidang usaha di luar spesialisasi keahlian konsultan.">Bidang usaha di luar spesialisasi</option>
            <option value="Lokasi operasional di luar jangkauan pendampingan.">Lokasi di luar jangkauan pendampingan</option>
            <option value="Data pencatatan kas awal belum memenuhi kriteria minimum.">Data kas awal belum memenuhi kriteria</option>
          </select>
        </div>
      </div>

      <template #footer>
        <button
          type="button"
          class="px-4 py-2 rounded-full border border-neutral-200 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800 text-xs font-bold text-neutral-700 dark:text-neutral-300 transition-colors cursor-pointer"
          @click="showRejectModal = false"
        >
          Batal
        </button>
        <button
          type="button"
          class="px-5 py-2 rounded-full bg-red-600 hover:bg-red-700 text-white text-xs font-bold shadow-xs transition-colors cursor-pointer"
          @click="confirmReject"
        >
          Ya, Tolak Permintaan
        </button>
      </template>
    </BModal>

  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, nextTick } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useKonsultanStore, type ClientMentorshipRequest, type ClientUmkm } from '~/stores/konsultan'
import BModal from '~/components/base/BModal.vue'
import { HugeiconsIcon } from '@hugeicons/vue'
import {
  ArrowLeft02Icon,
  CheckmarkBadge01Icon,
  CheckmarkCircle01Icon,
  PencilEdit01Icon,
  Delete02Icon,
  Award01Icon,
  Store01Icon,
  Coins01Icon,
  Task01Icon,
  ShieldCheckIcon,
  PrinterIcon,
  File02Icon
} from '@hugeicons/core-free-icons'

definePageMeta({
  layout: 'dashboard'
})

const route = useRoute()
const router = useRouter()
const konsultanStore = useKonsultanStore()

const requestId = computed(() => (route.params.id as string) || '')

// Find in pending requests
const requestData = computed<ClientMentorshipRequest | undefined>(() => {
  return konsultanStore.clientRequests.find(r => r.id === requestId.value)
})

// Check if already accepted client
const alreadyAcceptedClient = computed<ClientUmkm | undefined>(() => {
  if (requestData.value) {
    return konsultanStore.clients.find(c => c.id === requestData.value?.umkmId)
  }
  return konsultanStore.clients.find(c => c.id === requestId.value || c.id === `umkm-new-${requestId.value.replace(/\D/g, '')}`)
})

const isAlreadyAccepted = computed(() => !!alreadyAcceptedClient.value)

// Derived Fields
const businessName = computed(() => {
  return requestData.value?.businessName || alreadyAcceptedClient.value?.name || 'UMKM Binaan'
})

const ownerName = computed(() => {
  return requestData.value?.ownerName || alreadyAcceptedClient.value?.owner || 'Pelaku Usaha'
})

const sectorName = computed(() => {
  return requestData.value?.sector || alreadyAcceptedClient.value?.sector || 'Usaha Mikro'
})

const cityName = computed(() => {
  return requestData.value?.city || alreadyAcceptedClient.value?.city || 'Bandung'
})

const healthScore = computed(() => {
  return requestData.value?.healthScore || alreadyAcceptedClient.value?.healthScore || 70
})

const revenue = computed(() => {
  return requestData.value?.revenue || 35000000
})

const monthlyFee = computed(() => {
  if (requestData.value?.offeredFee) return requestData.value.offeredFee
  if (alreadyAcceptedClient.value?.monthlyFee) return alreadyAcceptedClient.value.monthlyFee
  return revenue.value >= 35000000 ? 2000000 : revenue.value >= 25000000 ? 1500000 : 1200000
})

const durationMonths = computed(() => {
  return requestData.value?.durationMonths || alreadyAcceptedClient.value?.durationMonths || 3
})

const fundingTarget = computed(() => {
  if (alreadyAcceptedClient.value?.fundingTarget) return alreadyAcceptedClient.value.fundingTarget
  return revenue.value ? Math.max(100000000, Math.round((revenue.value * 5) / 10000000) * 10000000) : 150000000
})

const clientMessage = computed(() => {
  return requestData.value?.message || 'Kami memerlukan bimbingan terstruktur untuk merapikan pembukuan arus kas harian dan menaikkan skor kesiapan pendanaan usaha.'
})

const clientTargetId = computed(() => {
  return requestData.value?.umkmId || alreadyAcceptedClient.value?.id || 'umkm-01'
})

const contractCode = computed(() => {
  return requestId.value.toUpperCase() || 'KTR-01'
})

const registrationHash = computed(() => {
  return `0x${contractCode.value.split('').map(c => c.charCodeAt(0).toString(16)).join('')}F99A`
})

const currentDateFormatted = computed(() => {
  const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'long', year: 'numeric' }
  return new Date().toLocaleDateString('id-ID', options)
})

const currentTimeFormatted = computed(() => {
  const now = new Date()
  return `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')} WIB`
})

// Signature Pad & Validation State
const agreementChecked = ref(false)
const signatureMode = ref<'type' | 'draw'>('draw')
const signatureCanvasRef = ref<HTMLCanvasElement | null>(null)
const isDrawing = ref(false)
const hasDrawnSignature = ref(false)
const isSubmitting = ref(false)
const signedSuccess = ref(false)
const showRejectModal = ref(false)
const rejectReason = ref('Kapasitas kuota bimbingan konsultan saat ini sedang penuh.')

const canSubmitContract = computed(() => {
  if (!agreementChecked.value) return false
  if (signatureMode.value === 'draw') {
    return hasDrawnSignature.value
  }
  return true
})

function initSignatureCanvas() {
  const canvas = signatureCanvasRef.value
  if (!canvas) return
  const rect = canvas.getBoundingClientRect()
  if (rect.width === 0) return
  const dpr = window.devicePixelRatio || 1
  canvas.width = rect.width * dpr
  canvas.height = 176 * dpr
  const ctx = canvas.getContext('2d')
  if (!ctx) return
  ctx.scale(dpr, dpr)
  ctx.lineWidth = 2.8
  ctx.lineCap = 'round'
  ctx.lineJoin = 'round'
  ctx.strokeStyle = '#0081A0'
  hasDrawnSignature.value = false
}

function getCanvasCoords(e: MouseEvent | TouchEvent) {
  const canvas = signatureCanvasRef.value
  if (!canvas) return { x: 0, y: 0 }
  const rect = canvas.getBoundingClientRect()
  const clientX = 'touches' in e ? e.touches[0].clientX : (e as MouseEvent).clientX
  const clientY = 'touches' in e ? e.touches[0].clientY : (e as MouseEvent).clientY
  return {
    x: clientX - rect.left,
    y: clientY - rect.top
  }
}

function startDrawing(e: MouseEvent | TouchEvent) {
  if (e.cancelable && 'touches' in e) e.preventDefault()
  isDrawing.value = true
  const canvas = signatureCanvasRef.value
  if (!canvas) return
  const ctx = canvas.getContext('2d')
  if (!ctx) return
  const { x, y } = getCanvasCoords(e)
  ctx.beginPath()
  ctx.moveTo(x, y)
}

function drawSignature(e: MouseEvent | TouchEvent) {
  if (!isDrawing.value) return
  if (e.cancelable && 'touches' in e) e.preventDefault()
  const canvas = signatureCanvasRef.value
  if (!canvas) return
  const ctx = canvas.getContext('2d')
  if (!ctx) return
  const { x, y } = getCanvasCoords(e)
  ctx.lineTo(x, y)
  ctx.stroke()
  hasDrawnSignature.value = true
}

function stopDrawing() {
  isDrawing.value = false
}

function clearCanvas() {
  const canvas = signatureCanvasRef.value
  if (!canvas) return
  const ctx = canvas.getContext('2d')
  if (!ctx) return
  const dpr = window.devicePixelRatio || 1
  ctx.clearRect(0, 0, canvas.width / dpr, canvas.height / dpr)
  hasDrawnSignature.value = false
}

function switchSignatureMode(mode: 'draw' | 'type') {
  signatureMode.value = mode
  if (mode === 'draw') {
    nextTick(() => {
      setTimeout(() => {
        initSignatureCanvas()
      }, 80)
    })
  }
}

function confirmContractAndAccept() {
  if (!canSubmitContract.value || !requestData.value) return
  isSubmitting.value = true
  const req = requestData.value
  setTimeout(() => {
    konsultanStore.acceptRequest(req.id)
    isSubmitting.value = false
    router.push({
      path: '/konsultan/klien',
      query: {
        tab: 'aktif',
        acceptedClient: req.umkmId || req.id,
        acceptedName: req.businessName
      }
    })
  }, 300)
}

function openRejectModal() {
  showRejectModal.value = true
}

function confirmReject() {
  if (requestData.value) {
    konsultanStore.rejectRequest(requestData.value.id, rejectReason.value)
    showRejectModal.value = false
    router.push('/konsultan/klien?tab=permintaan')
  }
}

function printDocument() {
  window.print()
}

onMounted(() => {
  nextTick(() => {
    setTimeout(() => {
      initSignatureCanvas()
    }, 150)
  })
})
</script>

<style scoped>
@media print {
  /* Print Optimization for Formal A4 Document */
  nav, header, aside, .sticky {
    display: none !important;
  }
  #printable-contract {
    border: none !important;
    box-shadow: none !important;
    padding: 0 !important;
  }
}
</style>
