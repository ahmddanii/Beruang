<template>
  <div class="space-y-6 sm:space-y-8 pb-16 font-poppins text-neutral-900 dark:text-neutral-100">
    <!-- ========================================================================= -->
    <!-- 1. TOP HEADER: Title on Left & Stage Switcher on Right                     -->
    <!-- ========================================================================= -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 min-h-[44px]">
      <div class="flex items-center gap-2.5 sm:gap-3">
        <HugeiconsIcon
          :icon="Award01Icon"
          :size="26"
          :stroke-width="2.2"
          class="text-neutral-900 dark:text-white shrink-0"
        />
        <h1 class="font-poppins font-semibold text-2xl sm:text-3xl text-neutral-900 dark:text-white tracking-tight leading-tight">
          Cari Modal
        </h1>
      </div>

      <!-- Stage Switcher: Tahap Pengajuan vs Sudah Siap (Lolos) - Full Width Segmented Control on Mobile -->
      <div class="w-full sm:w-auto grid grid-cols-2 sm:flex items-center gap-1 p-1 rounded-xl bg-neutral-100 dark:bg-neutral-800/80 border border-neutral-200 dark:border-neutral-700 text-xs font-poppins shrink-0">
        <button
          type="button"
          class="w-full sm:w-auto px-3 py-2 sm:py-1.5 rounded-lg font-medium transition-all duration-150 cursor-pointer text-center"
          :class="currentFundingStage === 'PENGAJUAN' ? 'bg-white dark:bg-[#13161F] text-neutral-900 dark:text-white shadow-2xs font-semibold' : 'text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white'"
          @click="currentFundingStage = 'PENGAJUAN'"
        >
          Tahap Pengajuan
        </button>
        <button
          type="button"
          class="w-full sm:w-auto px-3 py-2 sm:py-1.5 rounded-lg font-medium transition-all duration-150 cursor-pointer text-center"
          :class="currentFundingStage === 'READY' ? 'bg-white dark:bg-[#13161F] text-[#00800e] dark:text-[#00C058] shadow-2xs font-semibold' : 'text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white'"
          @click="currentFundingStage = 'READY'"
        >
          Sudah Siap (Lolos)
        </button>
      </div>
    </div>

    <!-- ========================================================================= -->
    <!-- 2. TOP HERO BANNER & CENTERED ACTION BUTTONS                               -->
    <!-- State 1: Tahap Pengajuan (Cek Apakah Bisnis Layak)                         -->
    <!-- State 2: Sudah Siap (Selamat Bisnis Kamu Sudah Siap untuk Funding)         -->
    <!-- ========================================================================= -->
    <div class="space-y-4 sm:space-y-5">
      <!-- Container Hero Taktil -->
      <div class="card-tactile-gopay rounded-[22px] sm:rounded-[26px] p-6 sm:p-12 md:p-16 text-center flex flex-col items-center justify-center relative overflow-hidden bg-gradient-to-b from-[#F8FAFC] to-[#F1F5F9] dark:from-[#13161F] dark:to-[#0F121A]">
        <!-- Subtle Certificate Watermark Graphic in Background -->
        <div class="absolute -right-8 -bottom-8 w-64 h-64 rounded-full bg-emerald-500/5 dark:bg-emerald-400/5 blur-2xl pointer-events-none" />
        <div class="absolute -left-8 -top-8 w-64 h-64 rounded-full bg-[#156374]/5 dark:bg-[#50AABF]/5 blur-2xl pointer-events-none" />

        <!-- A. Mode: Tahap Pengajuan -->
        <template v-if="currentFundingStage === 'PENGAJUAN'">
          <h2 class="text-xl sm:text-3xl md:text-4xl lg:text-[40px] font-poppins font-bold text-neutral-900 dark:text-white tracking-tight leading-tight max-w-2xl mx-auto">
            Cek Apakah Bisnismu<br class="hidden sm:inline" /> Sudah Layak untuk Funding
          </h2>
          <p class="text-xs sm:text-sm md:text-base text-neutral-600 dark:text-neutral-300 max-w-xl mx-auto mt-2.5 sm:mt-3.5 font-sans leading-relaxed">
            Tinjau kesehatan kas tokomu dan penuhi syarat kelayakan bersama konsultan kurator <strong>{{ umkmStore.profile.consultantName || 'Dra. Maya Suryani, M.M.' }}</strong> untuk membuka akses permodalan terverifikasi.
          </p>
        </template>

        <!-- B. Mode: Sudah Siap (Lolos) -->
        <template v-else>
          <h2 class="text-xl sm:text-3xl md:text-4xl lg:text-[40px] font-poppins font-bold text-neutral-900 dark:text-white tracking-tight leading-tight max-w-2xl mx-auto">
            Selamat Bisnis Kamu<br class="hidden sm:inline" /> Sudah Siap untuk Funding!
          </h2>
          <p class="text-xs sm:text-sm md:text-base text-neutral-600 dark:text-neutral-300 max-w-xl mx-auto mt-2.5 sm:mt-3.5 font-sans leading-relaxed">
            Konsultan kurator <strong>{{ umkmStore.profile.consultantName || 'Dra. Maya Suryani, M.M.' }}</strong> telah mengesahkan seluruh kelayakan tata kelola dan arus kas tokomu dengan predikat <strong>Grade A</strong>.
          </p>
        </template>
      </div>

      <!-- Action Buttons under Hero Banner: Stacked Atas-Bawah & Full Width on Mobile, Side-by-side on Desktop -->
      <div class="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-2.5 sm:gap-4 pt-1 sm:pt-2 w-full max-w-sm sm:max-w-none mx-auto [&>*]:w-full sm:[&>*]:w-auto">
        <!-- A. Buttons for Tahap Pengajuan -->
        <template v-if="currentFundingStage === 'PENGAJUAN'">
          <!-- Button Hijau: Tinjau Bisnis Kamu -->
          <BActionButton
            variant="green"
            to="/dashboard/penilaian"
            custom-class="w-full sm:w-auto px-6 py-2.5 text-xs sm:text-sm font-semibold shadow-xs justify-center text-center"
            title="Buka Halaman Cek Kesehatan Bisnis untuk Meninjau Skor Kelayakan"
          >
            Tinjau Bisnis Kamu
          </BActionButton>

          <!-- Button Default: Cek Tugas Kamu -->
          <BActionButton
            variant="default"
            icon="chevron"
            to="/dashboard/rencana-aksi"
            custom-class="w-full sm:w-auto px-6 py-2.5 text-xs sm:text-sm font-semibold shadow-xs justify-center text-center"
            title="Buka Halaman Progress Tugas untuk Menyelesaikan Rencana Aksi"
          >
            Cek Tugas Kamu
          </BActionButton>
        </template>

        <!-- B. Buttons for Sudah Siap (Lolos) -->
        <template v-else>
          <!-- Button Hijau: Download Sertifikat -->
          <BActionButton
            variant="green"
            icon="download"
            custom-class="w-full sm:w-auto px-6 py-2.5 text-xs sm:text-sm font-semibold shadow-xs justify-center text-center"
            title="Unduh Salinan Sertifikat Kelayakan Investasi Resmi (PDF)"
            @click="handleDownloadCertificate"
          >
            Download Sertifikat
          </BActionButton>

          <!-- Button Default: Siapkan Profil -->
          <BActionButton
            variant="default"
            icon="chevron"
            to="/dashboard/profile"
            custom-class="w-full sm:w-auto px-6 py-2.5 text-xs sm:text-sm font-semibold shadow-xs justify-center text-center"
            title="Buka Halaman Pengaturan & Pratinjau Profil Usaha"
          >
            Siapkan Profil
          </BActionButton>
        </template>
      </div>
    </div>

    <!-- ========================================================================= -->
    <!-- 3. MAIN SECTION: CONDITIONAL CONTENT                                       -->
    <!-- State 1: Tahap Pengajuan -> INFORMASI SYARAT & TASK CATEGORY CARDS         -->
    <!-- State 2: Sudah Siap -> DETAIL AKREDITASI & SERTIFIKAT                      -->
    <!-- ========================================================================= -->

    <!-- ========================================================================= -->
    <!-- STATE 1: INFORMASI SYARAT UNTUK BISA MELAKUKAN PENGAJUAN                   -->
    <!-- ========================================================================= -->
    <div
      v-if="currentFundingStage === 'PENGAJUAN'"
      class="grid grid-cols-12 gap-6 sm:gap-8 items-start pt-2 sm:pt-4"
    >
      <!-- LEFT COLUMN (8 cols): Checklist Syarat & Task Category Cards (Reusable) -->
      <div class="col-span-12 lg:col-span-8 space-y-6">
        <!-- 1. Header Box & Progress Indicator -->
        <div class="card-tactile-gopay rounded-[20px] p-6 sm:p-7 space-y-4 bg-white dark:bg-[#13161F]">
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-neutral-100 dark:border-neutral-800">
            <div>
              <h3 class="font-poppins font-semibold text-lg sm:text-xl text-neutral-900 dark:text-white tracking-tight">
                Syarat & Kriteria Pengajuan Kelayakan
              </h3>
              <p class="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 mt-0.5">
                Standar kualifikasi tata kelola kas dan target perbaikan yang harus dipenuhi sebelum kurator menerbitkan rekomendasi pendanaan.
              </p>
            </div>
            <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 dark:bg-emerald-950/60 text-[#00800e] dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/60 shrink-0 self-start sm:self-auto">
              <HugeiconsIcon :icon="CheckmarkCircle01Icon" :size="14" />
              <span>{{ completedTasksCount }} dari {{ totalTasksCount }} Tugas Selesai</span>
            </span>
          </div>

          <!-- Progress Bar & Motivational Copy ala GoPay -->
          <div class="space-y-2 pt-1">
            <div class="flex items-center justify-between text-xs font-poppins">
              <span class="font-medium text-neutral-600 dark:text-neutral-300">
                Tingkat Kesiapan Pengajuan: <strong class="text-neutral-900 dark:text-white">{{ readinessPercentage }}%</strong>
              </span>
              <span class="text-[11px] font-semibold text-[#00800e] dark:text-[#00C058]">
                Dikit lagi lolos pendanaan! Yok bisa yok.
              </span>
            </div>
            <!-- Tactile Progress Bar -->
            <div class="h-2.5 w-full rounded-full bg-neutral-100 dark:bg-neutral-800 overflow-hidden p-0.5 border border-neutral-200/60 dark:border-neutral-700/60">
              <div
                class="h-full rounded-full bg-gradient-to-r from-[#00C058] to-[#00800e] transition-all duration-500 shadow-2xs"
                :style="{ width: `${readinessPercentage}%` }"
              />
            </div>
          </div>
        </div>

        <!-- 2. Reusable Task Category Cards (Disamakan dengan Progress Tugas ala Gambar 2) -->
        <div class="space-y-6">
          <BTaskCategoryCard
            v-for="group in fundingTaskGroups"
            :key="group.category"
            :title="group.title"
            :icon="group.icon"
            :completed-count="group.tasks.filter((t: any) => t.completed).length"
            :total-count="group.tasks.length"
            :tasks="group.tasks"
            @action="openTaskEvidence"
          />
        </div>

        <!-- 3. Final Submission Action Box -->
        <div class="card-tactile-gopay rounded-[20px] p-6 sm:p-7 bg-gradient-to-r from-emerald-500/5 via-[#156374]/5 to-transparent border border-emerald-500/20 dark:border-emerald-500/30 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
          <div class="space-y-1">
            <h4 class="font-poppins font-bold text-base text-neutral-900 dark:text-white">
              Siap Mengajukan Peninjauan Kelayakan?
            </h4>
            <p class="text-xs text-neutral-600 dark:text-neutral-400 max-w-lg font-sans leading-relaxed">
              Kirim berkas tokomu untuk diverifikasi oleh konsultan kurator. Hasil kurasi dan sertifikat resmi akan diterbitkan dalam 1-2 hari kerja.
            </p>
          </div>
          <div class="w-full sm:w-auto [&>*]:w-full sm:[&>*]:w-auto shrink-0">
            <BActionButton
              variant="green"
              custom-class="w-full sm:w-auto px-6 py-2.5 text-xs sm:text-sm font-semibold shadow-xs justify-center text-center shrink-0"
              title="Kirim Berkas Pengajuan Kelayakan ke Konsultan Kurator"
              @click="isSubmitModalOpen = true"
            >
              Ajukan Peninjauan Sekarang
            </BActionButton>
          </div>
        </div>
      </div>

      <!-- RIGHT COLUMN (4 cols): Profil Kurator & Alur Proses -->
      <div class="col-span-12 lg:col-span-4 space-y-5">
        <!-- 1. Advisor Card (Dra. Maya Suryani) -->
        <div class="card-tactile-gopay rounded-[20px] p-6 space-y-4 bg-white dark:bg-[#13161F]">
          <h4 class="font-poppins font-semibold text-sm text-neutral-900 dark:text-white">
            Konsultan Pendampingmu
          </h4>

          <div class="flex items-center gap-3.5">
            <div class="w-12 h-12 rounded-full overflow-hidden bg-neutral-100 dark:bg-neutral-800 border-2 border-white dark:border-neutral-700 shadow-2xs shrink-0">
              <img
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80"
                alt="Dra. Maya Suryani, M.M."
                class="w-full h-full object-cover"
              />
            </div>
            <div>
              <span class="font-poppins font-semibold text-sm text-neutral-900 dark:text-white leading-tight block">
                {{ umkmStore.profile.consultantName || 'Dra. Maya Suryani, M.M.' }}
              </span>
              <p class="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
                Advisor Kurasi Finansial & Legalitas
              </p>
            </div>
          </div>

          <NuxtLink
            to="/dashboard/pesan"
            class="w-full py-2 px-3 rounded-xl bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-800 dark:text-neutral-200 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
          >
            <HugeiconsIcon :icon="Comment01Icon" :size="14" />
            <span>Diskusi via Pesan</span>
          </NuxtLink>
        </div>

        <!-- 2. Alur 3 Langkah Menuju Pendanaan -->
        <div class="card-tactile-gopay rounded-[20px] p-6 space-y-4 bg-white dark:bg-[#13161F]">
          <h4 class="font-poppins font-semibold text-sm text-neutral-900 dark:text-white">
            Alur Menuju Pendanaan
          </h4>

          <div class="space-y-4 text-xs font-sans">
            <!-- Step 1 -->
            <div class="flex items-start gap-3">
              <div class="w-6 h-6 rounded-full bg-emerald-100 text-[#00800e] dark:bg-emerald-950/80 dark:text-emerald-300 font-bold flex items-center justify-center shrink-0 text-xs">
                1
              </div>
              <div class="min-w-0">
                <span class="font-semibold text-neutral-900 dark:text-white block">Penuhi Syarat & Tugas Kesiapan</span>
                <span class="text-neutral-500 dark:text-neutral-400 text-[11px] block mt-0.5">Saat ini: {{ completedTasksCount }} dari {{ totalTasksCount }} tugas selesai ({{ readinessPercentage }}%)</span>
              </div>
            </div>

            <!-- Step 2 -->
            <div class="flex items-start gap-3">
              <div class="w-6 h-6 rounded-full bg-amber-100 text-amber-800 dark:bg-amber-950/80 dark:text-amber-300 font-bold flex items-center justify-center shrink-0 text-xs">
                2
              </div>
              <div class="min-w-0">
                <span class="font-semibold text-neutral-900 dark:text-white block">Evaluasi Sesi Kurasi</span>
                <span class="text-neutral-500 dark:text-neutral-400 text-[11px] block mt-0.5">Pemeriksaan integritas kas & data room oleh kurator</span>
              </div>
            </div>

            <!-- Step 3 -->
            <div class="flex items-start gap-3">
              <div class="w-6 h-6 rounded-full bg-neutral-100 text-neutral-500 dark:bg-neutral-800 dark:text-neutral-400 font-bold flex items-center justify-center shrink-0 text-xs">
                3
              </div>
              <div class="min-w-0">
                <span class="font-semibold text-neutral-900 dark:text-white block">Terbit Sertifikat & Tampil ke Investor</span>
                <span class="text-neutral-500 dark:text-neutral-400 text-[11px] block mt-0.5">Membuka pintu penawaran modal bagi hasil</span>
              </div>
            </div>
          </div>
        </div>

        <!-- 3. Jaminan Keamanan Data Room -->
        <div class="p-5 rounded-[20px] bg-neutral-50/70 dark:bg-neutral-900/40 border border-neutral-200/60 dark:border-neutral-800 text-xs text-neutral-600 dark:text-neutral-400 font-sans space-y-2">
          <div class="flex items-center gap-1.5 font-semibold text-neutral-900 dark:text-white">
            <HugeiconsIcon :icon="CheckmarkCircle01Icon" :size="14" class="text-[#00800e]" />
            <span>Kerahasiaan Data Terjamin</span>
          </div>
          <p class="leading-relaxed text-[11px]">
            Seluruh berkas data room tokomu dilindungi enkripsi dan watermark digital. Hanya investor terverifikasi yang telah disetujui yang dapat mengakses data privat tokomu.
          </p>
        </div>
      </div>
    </div>

    <!-- ========================================================================= -->
    <!-- STATE 2: DETAIL AKREDITASI & SERTIFIKAT (MUNCUL KETIKA SUDAH BERHASIL)     -->
    <!-- ========================================================================= -->
    <div
      v-else
      class="grid grid-cols-12 gap-6 sm:gap-8 items-start pt-2 sm:pt-4"
    >
      <!-- LEFT COLUMN (8 cols): Detail Akreditasi, Silabus Kesiapan & Evaluasi -->
      <div class="col-span-12 lg:col-span-8 space-y-6 sm:space-y-7">
        <!-- 1. Header Row: Store Thumbnail + Title & Auditor Meta -->
        <div class="flex items-start gap-4 sm:gap-5 pb-5 border-b border-neutral-100 dark:border-neutral-800">
          <div class="w-24 h-20 sm:w-32 sm:h-24 rounded-xl overflow-hidden bg-neutral-100 dark:bg-neutral-800 border border-slate-200 dark:border-neutral-700 shrink-0 shadow-2xs">
            <img
              :src="umkmStore.profile.bannerUrl || '/images/default-store-banner.jpg'"
              :alt="umkmStore.profile.name || 'Kopi Senja Nusantara'"
              class="w-full h-full object-cover"
              @error="(e: any) => { e.target.src = '/images/default-store-banner.jpg' }"
            />
          </div>

          <div class="space-y-1 sm:space-y-1.5 min-w-0">
            <h3 class="font-poppins font-semibold text-xl sm:text-2xl text-neutral-900 dark:text-white tracking-tight leading-snug">
              {{ umkmStore.profile.name || 'Kopi Senja Nusantara' }}
            </h3>
            <p class="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400">
              Pemilik bisnis: <strong class="text-neutral-700 dark:text-neutral-200">{{ umkmStore.profile.ownerName || 'Fikri Setiawan' }}</strong>
            </p>
            <p class="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400">
              Konsultan: <strong class="text-neutral-700 dark:text-neutral-200">{{ umkmStore.profile.consultantName || 'Dra. Maya Suryani, M.M.' }}</strong>
            </p>
          </div>
        </div>

        <!-- 2. Institutional Brand Lockup -->
        <div class="flex items-center justify-center py-4 my-1">
          <div class="flex items-center gap-2.5">
            <img src="/logo/logoSmall.svg" alt="Beruang Logo" class="w-8 h-8" />
            <span class="font-poppins font-bold text-2xl tracking-tight">
              <span class="text-[#156374] dark:text-[#50AABF]">Ber</span><span class="text-[#00800e] dark:text-[#00C058]">uang</span>
            </span>
          </div>
        </div>

        <!-- 3. Official Narrative Paragraph -->
        <p class="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed font-sans text-justify">
          Sertifikasi kelayakan ini diterbitkan resmi oleh platform Beruang sebagai bukti bahwa <strong class="text-neutral-800 dark:text-neutral-100">{{ umkmStore.profile.name || 'Kopi Senja Nusantara' }}</strong> telah memenuhi seluruh kualifikasi fundamental tata kelola keuangan UMKM modern. Evaluasi menyeluruh mencakup kedisiplinan pencatatan kas riil, pemisahan rekening operasional, kepatuhan legalitas dasar, serta kepemilikan margin untung bersih yang sehat dan telah siap menerima penawaran permodalan bagi hasil.
        </p>

        <!-- 4. Detailed Verified Criteria Section -->
        <div class="space-y-3.5 pt-2">
          <h4 class="font-poppins font-bold text-sm sm:text-base text-neutral-900 dark:text-white">
            Materi & Kriteria Kelayakan yang Terverifikasi:
          </h4>

          <ul class="space-y-3 text-xs sm:text-sm text-neutral-700 dark:text-neutral-300 font-sans leading-relaxed">
            <li class="flex items-start gap-2.5">
              <span class="w-1.5 h-1.5 rounded-full bg-neutral-900 dark:bg-white shrink-0 mt-2" />
              <div>
                <strong>Pemisahan Kas Operasional</strong> : Seluruh pencatatan kas keluar dan kas masuk telah dipisahkan secara disiplin menggunakan rekening giro usaha terdaftar, bebas dari percampuran keuangan pribadi pemilik toko. <span class="text-neutral-500 font-medium">(Tervalidasi 100%)</span>
              </div>
            </li>

            <li class="flex items-start gap-2.5">
              <span class="w-1.5 h-1.5 rounded-full bg-neutral-900 dark:bg-white shrink-0 mt-2" />
              <div>
                <strong>Pengendalian Beban Pokok & Bahan</strong> : Rasio belanja bahan baku dan biaya operasional terkontrol stabil di bawah target batas aman rekomendasi 45%, menjaga margin laba tetap tebal. <span class="text-neutral-500 font-medium">(Rasio Riil: 42%)</span>
              </div>
            </li>

            <li class="flex items-start gap-2.5">
              <span class="w-1.5 h-1.5 rounded-full bg-neutral-900 dark:bg-white shrink-0 mt-2" />
              <div>
                <strong>Kepatuhan Legalitas Dasar</strong> : Nomor Induk Berusaha (NIB) berbasis risiko dan perizinan edar/keamanan produk telah aktif serta tervalidasi sinkron pada sistem OSS nasional. <span class="text-neutral-500 font-medium">(Dokumen Sah)</span>
              </div>
            </li>

            <li class="flex items-start gap-2.5">
              <span class="w-1.5 h-1.5 rounded-full bg-neutral-900 dark:bg-white shrink-0 mt-2" />
              <div>
                <strong>Rekam Jejak Kas Positif</strong> : Membukukan arus kas operasional dan pertumbuhan untung bersih positif secara konsisten selama minimal 3 bulan terakhir berturut-turut. <span class="text-neutral-500 font-medium">(Tren Positif)</span>
              </div>
            </li>

            <li class="flex items-start gap-2.5">
              <span class="w-1.5 h-1.5 rounded-full bg-neutral-900 dark:bg-white shrink-0 mt-2" />
              <div>
                <strong>Kesiapan Dokumen Data Room</strong> : Berkas laporan keuangan resmi, rekening koran 6 bulan, dan proyeksi arus kas toko telah lengkap serta terproteksi watermark digital untuk calon investor. <span class="text-neutral-500 font-medium">(Siap Akses)</span>
              </div>
            </li>
          </ul>
        </div>

        <!-- 5. Evaluation / Summary Footer Block -->
        <div class="space-y-2 pt-4 border-t border-neutral-100 dark:border-neutral-800">
          <h4 class="font-poppins font-bold text-sm sm:text-base text-neutral-900 dark:text-white">
            Evaluasi kurasi:
          </h4>
          <ul class="space-y-1.5 text-xs sm:text-sm text-neutral-700 dark:text-neutral-300 font-sans">
            <li class="flex items-start gap-2.5">
              <span class="w-1.5 h-1.5 rounded-full bg-neutral-900 dark:bg-white shrink-0 mt-2" />
              <span>Validasi rekonsiliasi kas dan pemeriksaan berkas data room oleh konsultan independen</span>
            </li>
          </ul>
          <p class="text-xs sm:text-sm text-neutral-700 dark:text-neutral-300 font-sans pt-2">
            Total durasi pendampingan kurasi hingga dinyatakan siap adalah <strong>18 sesi tatap muka (Predikat: Grade A)</strong>.
          </p>
        </div>
      </div>

      <!-- RIGHT COLUMN (4 cols): Profil Pemilik & Bagikan Sertifikat -->
      <div class="col-span-12 lg:col-span-5 xl:col-span-4 space-y-5">
        <div class="card-tactile-gopay rounded-[20px] p-6 sm:p-7 space-y-6 bg-white dark:bg-[#13161F] text-center">
          <!-- Profile Avatar & Details -->
          <div class="flex flex-col items-center">
            <div class="w-20 h-20 sm:w-24 sm:h-24 rounded-full border-3 border-white dark:border-neutral-800 overflow-hidden bg-neutral-100 dark:bg-neutral-800 shadow-sm shrink-0">
              <img
                :src="umkmStore.profile.ownerAvatarUrl || '/images/user-profile.png'"
                :alt="umkmStore.profile.ownerName || 'Fikri Setiawan'"
                class="w-full h-full object-cover"
                @error="(e: any) => { e.target.src = '/images/user-profile.png' }"
              />
            </div>

            <h3 class="text-lg sm:text-xl font-poppins font-semibold text-neutral-900 dark:text-white tracking-tight mt-3">
              {{ umkmStore.profile.ownerName || 'Fikri Setiawan' }}
            </h3>

            <p class="text-xs sm:text-[13px] font-poppins text-neutral-500 dark:text-neutral-400 mt-1">
              Pemilik Usaha • {{ umkmStore.profile.city || 'Bandung, Jawa Barat' }}
            </p>
          </div>

          <!-- Terbit pada -->
          <div class="py-2.5 px-3.5 rounded-xl bg-neutral-50/80 dark:bg-neutral-800/40 border border-neutral-200/70 dark:border-neutral-800 text-center">
            <span class="text-[11px] font-poppins text-neutral-400 dark:text-neutral-500 block leading-none">Diterbitkan pada</span>
            <span class="text-xs sm:text-[13px] font-poppins font-semibold text-neutral-800 dark:text-neutral-200 tabular-nums mt-1 block">
              {{ umkmStore.profile.certifiedAt || '18 September 2026' }}
            </span>
          </div>

          <!-- Divider Line -->
          <div class="border-t border-[#E2E8F0] dark:border-neutral-800" />

          <!-- Share Channels Section -->
          <div class="space-y-3">
            <span class="text-xs font-poppins font-semibold text-neutral-600 dark:text-neutral-400 block text-center">
              Bagikan Sertifikat
            </span>

            <div class="flex items-center justify-center gap-2 sm:gap-2.5 flex-wrap">
              <!-- 1. Salin tautan -->
              <button
                type="button"
                class="w-10 h-10 rounded-full bg-white dark:bg-neutral-800/80 border border-neutral-300 dark:border-neutral-700 flex items-center justify-center text-neutral-900 dark:text-neutral-100 hover:bg-neutral-100 dark:hover:bg-neutral-700/60 hover:border-neutral-400 dark:hover:border-neutral-600 transition-all duration-150 shadow-2xs hover:scale-105 active:scale-95 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400"
                title="Salin Tautan Sertifikat"
                aria-label="Salin tautan"
                @click="handleCopyLink"
              >
                <HugeiconsIcon :icon="CopyLinkIcon" :size="18" :stroke-width="2.2" />
              </button>

              <!-- 2. Whatsapp -->
              <button
                type="button"
                class="w-10 h-10 rounded-full bg-white dark:bg-neutral-800/80 border border-neutral-300 dark:border-neutral-700 flex items-center justify-center text-neutral-900 dark:text-neutral-100 hover:bg-neutral-100 dark:hover:bg-neutral-700/60 hover:border-neutral-400 dark:hover:border-neutral-600 transition-all duration-150 shadow-2xs hover:scale-105 active:scale-95 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400"
                title="Bagikan ke WhatsApp"
                aria-label="WhatsApp"
                @click="handleWhatsApp"
              >
                <HugeiconsIcon :icon="WhatsappIcon" :size="18" :stroke-width="2.2" />
              </button>

              <!-- 3. Facebook -->
              <button
                type="button"
                class="w-10 h-10 rounded-full bg-white dark:bg-neutral-800/80 border border-neutral-300 dark:border-neutral-700 flex items-center justify-center text-neutral-900 dark:text-neutral-100 hover:bg-neutral-100 dark:hover:bg-neutral-700/60 hover:border-neutral-400 dark:hover:border-neutral-600 transition-all duration-150 shadow-2xs hover:scale-105 active:scale-95 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400"
                title="Bagikan ke Facebook"
                aria-label="Facebook"
                @click="handleFacebook"
              >
                <HugeiconsIcon :icon="Facebook02Icon" :size="18" :stroke-width="2.2" />
              </button>

              <!-- 4. Messenger -->
              <button
                type="button"
                class="w-10 h-10 rounded-full bg-white dark:bg-neutral-800/80 border border-neutral-300 dark:border-neutral-700 flex items-center justify-center text-neutral-900 dark:text-neutral-100 hover:bg-neutral-100 dark:hover:bg-neutral-700/60 hover:border-neutral-400 dark:hover:border-neutral-600 transition-all duration-150 shadow-2xs hover:scale-105 active:scale-95 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400"
                title="Bagikan ke Messenger"
                aria-label="Messenger"
                @click="handleMessenger"
              >
                <HugeiconsIcon :icon="MessengerIcon" :size="18" :stroke-width="2.2" />
              </button>

              <!-- 5. LinkedIn -->
              <button
                type="button"
                class="w-10 h-10 rounded-full bg-white dark:bg-neutral-800/80 border border-neutral-300 dark:border-neutral-700 flex items-center justify-center text-neutral-900 dark:text-neutral-100 hover:bg-neutral-100 dark:hover:bg-neutral-700/60 hover:border-neutral-400 dark:hover:border-neutral-600 transition-all duration-150 shadow-2xs hover:scale-105 active:scale-95 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400"
                title="Bagikan ke LinkedIn"
                aria-label="LinkedIn"
                @click="handleLinkedIn"
              >
                <HugeiconsIcon :icon="Linkedin02Icon" :size="18" :stroke-width="2.2" />
              </button>

              <!-- 6. Gmail -->
              <button
                type="button"
                class="w-10 h-10 rounded-full bg-white dark:bg-neutral-800/80 border border-neutral-300 dark:border-neutral-700 flex items-center justify-center text-neutral-900 dark:text-neutral-100 hover:bg-neutral-100 dark:hover:bg-neutral-700/60 hover:border-neutral-400 dark:hover:border-neutral-600 transition-all duration-150 shadow-2xs hover:scale-105 active:scale-95 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400"
                title="Bagikan via Gmail"
                aria-label="Gmail"
                @click="handleGmail"
              >
                <HugeiconsIcon :icon="Mail02Icon" :size="18" :stroke-width="2.2" />
              </button>
            </div>

            <!-- Inline Toast Feedback for Salin Tautan -->
            <Transition
              enter-active-class="transition duration-200 ease-out"
              enter-from-class="opacity-0 -translate-y-1"
              enter-to-class="opacity-100 translate-y-0"
              leave-active-class="transition duration-150 ease-in"
              leave-from-class="opacity-100 translate-y-0"
              leave-to-class="opacity-0 -translate-y-1"
            >
              <div
                v-if="isCopied"
                class="mt-2.5 px-3 py-1.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-[#00800e] dark:text-emerald-400 text-xs font-medium flex items-center justify-center gap-1.5"
              >
                <HugeiconsIcon :icon="CheckmarkCircle01Icon" :size="14" />
                <span>Tautan sertifikat berhasil disalin!</span>
              </div>
            </Transition>
          </div>
        </div>
      </div>
    </div>

    <!-- ========================================================================= -->
    <!-- 4. MODAL PENGAJUAN KELAYAKAN KURASI                                        -->
    <!-- ========================================================================= -->
    <BModal
      v-model="isSubmitModalOpen"
      title="Pengajuan Peninjauan Kelayakan Pendanaan"
      subtitle="Kirim berkas tokomu untuk diverifikasi oleh konsultan kurator pembina"
      size="md"
    >
      <div class="space-y-4 font-poppins pt-1">
        <div class="p-4 rounded-xl bg-neutral-50 dark:bg-neutral-800/50 border border-neutral-200/70 dark:border-neutral-700 space-y-2 text-xs">
          <div class="flex items-center justify-between font-semibold text-neutral-800 dark:text-neutral-200">
            <span>Usaha Terdaftar:</span>
            <span>{{ umkmStore.profile.name }}</span>
          </div>
          <div class="flex items-center justify-between text-neutral-600 dark:text-neutral-400">
            <span>Konsultan Pendamping:</span>
            <span>{{ umkmStore.profile.consultantName || 'Dra. Maya Suryani, M.M.' }}</span>
          </div>
          <div class="flex items-center justify-between text-neutral-600 dark:text-neutral-400">
            <span>Tugas Selesai:</span>
            <span class="font-bold text-[#00800e]">{{ completedTasksCount }} dari {{ totalTasksCount }} Tugas ({{ readinessPercentage }}%)</span>
          </div>
        </div>

        <p class="text-xs text-neutral-600 dark:text-neutral-300 font-sans leading-relaxed">
          Dengan mengajukan peninjauan ini, konsultan kuratormu akan memeriksa rekonsiliasi kas riil dan berkas data room tokomu untuk penerbitan sertifikat kelayakan investasi resmi.
        </p>

        <div class="flex items-center justify-end gap-2.5 pt-2 border-t border-neutral-100 dark:border-neutral-800">
          <button
            type="button"
            class="px-4 py-2 text-xs font-semibold rounded-xl text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
            @click="isSubmitModalOpen = false"
          >
            Batal
          </button>
          <BActionButton
            variant="green"
            custom-class="px-5 py-2 text-xs font-semibold"
            @click="handleSubmitApplication"
          >
            Konfirmasi & Kirim Pengajuan
          </BActionButton>
        </div>
      </div>
    </BModal>

    <!-- ========================================================================= -->
    <!-- 5. MODAL PRATINJAU BUKTI DOKUMEN (EVIDENCE MODAL)                          -->
    <!-- ========================================================================= -->
    <BModal
      v-model="isEvidenceModalOpen"
      :title="selectedTaskEvidence ? selectedTaskEvidence.title : 'Bukti Dokumen Pelaksanaan Tugas'"
      subtitle="Dokumentasi verifikasi pemenuhan langkah tugas"
      size="md"
    >
      <div v-if="selectedTaskEvidence" class="space-y-4 pt-1 font-poppins text-xs">
        <div class="p-4 rounded-xl bg-neutral-50 dark:bg-[#18191E] border border-neutral-200/80 dark:border-neutral-800 space-y-2">
          <div class="flex items-center justify-between">
            <span class="text-neutral-500">Nomor Registrasi:</span>
            <span class="font-mono font-semibold text-neutral-800 dark:text-neutral-200">{{ selectedTaskEvidence.regNo }}</span>
          </div>
          <div class="flex items-center justify-between">
            <span class="text-neutral-500">Penerbit Dokumen:</span>
            <span class="font-semibold text-neutral-800 dark:text-neutral-200">{{ selectedTaskEvidence.issuer }}</span>
          </div>
          <div class="flex items-center justify-between">
            <span class="text-neutral-500">Klasifikasi:</span>
            <span class="font-semibold text-[#156374] dark:text-[#50AABF]">{{ selectedTaskEvidence.classification }}</span>
          </div>
        </div>

        <div v-if="selectedTaskEvidence.file" class="p-3.5 rounded-xl border border-emerald-200 dark:border-emerald-800/60 bg-emerald-50/50 dark:bg-emerald-950/30 flex items-center justify-between gap-3">
          <div class="flex items-center gap-2.5 min-w-0">
            <HugeiconsIcon :icon="CheckmarkCircle01Icon" :size="20" class="text-[#00800e] shrink-0" />
            <div class="min-w-0">
              <span class="font-semibold text-neutral-900 dark:text-white truncate block text-xs">
                {{ selectedTaskEvidence.file.name }}
              </span>
              <span class="text-[11px] text-neutral-500">
                {{ selectedTaskEvidence.file.size }} • Terverifikasi
              </span>
            </div>
          </div>
          <span class="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-100 text-[#00800e] dark:bg-emerald-950/80 dark:text-emerald-300 shrink-0">
            Sah
          </span>
        </div>

        <div class="flex items-center justify-end gap-2.5 pt-3 border-t border-neutral-100 dark:border-neutral-800">
          <button
            type="button"
            class="px-4 py-2 text-xs font-semibold rounded-xl bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-800 dark:text-neutral-200 transition-colors"
            @click="isEvidenceModalOpen = false"
          >
            Tutup
          </button>
        </div>
      </div>
    </BModal>

    <!-- Success Notification Toast -->
    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0 translate-y-2"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 translate-y-2"
    >
      <div
        v-if="showSuccessToast"
        class="fixed bottom-6 right-6 z-50 px-4 py-3 rounded-2xl bg-white dark:bg-neutral-800 border-2 border-emerald-500 shadow-xl flex items-center gap-3 text-xs font-poppins"
      >
        <span class="w-7 h-7 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-[#00800e] dark:text-emerald-400 flex items-center justify-center shrink-0">
          ✓
        </span>
        <div>
          <strong class="text-neutral-900 dark:text-white block font-semibold">Pengajuan Berhasil Dikirim!</strong>
          <span class="text-neutral-500 dark:text-neutral-400 block text-[11px]">Kuratormu akan memverifikasi berkas dalam 1-2 hari kerja.</span>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useUmkmStore } from '~/stores/umkm'
import BActionButton from '~/components/base/BActionButton.vue'
import BModal from '~/components/base/BModal.vue'
import BTaskCategoryCard from '~/components/base/BTaskCategoryCard.vue'
import { HugeiconsIcon } from '@hugeicons/vue'
import {
  Award01Icon,
  CheckmarkCircle01Icon,
  CopyLinkIcon,
  WhatsappIcon,
  Facebook02Icon,
  MessengerIcon,
  Linkedin02Icon,
  Mail02Icon,
  Coins01Icon,
  CourtLawIcon,
  Package01Icon,
  UserGroupIcon,
  Comment01Icon
} from '@hugeicons/core-free-icons'

definePageMeta({
  layout: 'dashboard',
  hideHeader: true
})

const umkmStore = useUmkmStore()

// State: Tahap Pengajuan (ketika user mau mengajukan / meninjau kelayakan) vs Sudah Siap (Lolos Sertifikasi)
// Default ke 'PENGAJUAN' sesuai alur user yang meninjau kelayakan usaha
const currentFundingStage = ref<'PENGAJUAN' | 'READY'>('PENGAJUAN')

// Category task groups matching Progress Tugas design reference (Operasional, Finansial, Legalitas, Tata Kelola)
const categoryConfigs = [
  { category: 'Operasional', title: 'Operasional', icon: Package01Icon },
  { category: 'Finansial', title: 'Finansial', icon: Coins01Icon },
  { category: 'Legalitas', title: 'Legalitas', icon: CourtLawIcon },
  { category: 'Tata Kelola', title: 'Tata Kelola', icon: UserGroupIcon }
]

const fundingTaskGroups = computed(() => {
  return categoryConfigs.map(cfg => {
    const tasks = umkmStore.tasks.filter((t: any) => t.category === cfg.category)
    return {
      category: cfg.category,
      title: cfg.title,
      icon: cfg.icon,
      tasks
    }
  }).filter(g => g.tasks.length > 0)
})

const totalTasksCount = computed(() => {
  return fundingTaskGroups.value.reduce((acc, g) => acc + g.tasks.length, 0)
})

const completedTasksCount = computed(() => {
  return fundingTaskGroups.value.reduce(
    (acc, g) => acc + g.tasks.filter((t: any) => t.completed).length,
    0
  )
})

const readinessPercentage = computed(() => {
  if (totalTasksCount.value === 0) return 80
  return Math.round((completedTasksCount.value / totalTasksCount.value) * 100)
})

// Evidence Modal & Storage
const isEvidenceModalOpen = ref(false)
const selectedTaskForPreview = ref<any>(null)

const defaultTaskEvidence: Record<string, any> = {
  't-1': {
    title: 'Rekening Giro Operasional Usaha',
    issuer: 'PT Bank Mandiri (Persero) Tbk · KCP Fatmawati',
    regNo: 'MDR/KORAN/2026/0912',
    classification: 'Pemisahan Kas Pribadi & Bisnis',
    date: '10 Juli 2026',
    file: { name: 'Rekening_Giro_Mandiri_KopiSenja.pdf', size: '1.2 MB' }
  },
  't-2': {
    title: 'Dokumentasi Sertifikat Halal & NIB',
    issuer: 'BPJPH Kemenag RI & OSS RBA',
    regNo: 'OSS-RBA-91283019283 / ID321100019283',
    classification: 'Perizinan Usaha Terverifikasi',
    date: '25 Juli 2026',
    file: { name: 'Sertifikat_Halal_NIB_Kasir.pdf', size: '2.1 MB' }
  },
  't-3': {
    title: 'Lembar Opname Kartu Stok Bahan Baku',
    issuer: 'SOP Manajemen Persediaan Gerai',
    regNo: 'SOP-STOK-WK42/2026',
    classification: 'Pengendalian Biaya Bahan',
    date: '15 Agustus 2026',
    file: { name: 'Kartu_Stok_Mingguan_Outlet.pdf', size: '980 KB' }
  },
  't-4': {
    title: 'Kontrak Supplier Biji Kopi & Kemasan',
    issuer: 'Koperasi Petani Kopi Priangan & Supplier Eco Pack',
    regNo: 'KTR/SUPL/2026/0831',
    classification: 'Stabilitas Harga Bahan Baku',
    date: '30 Agustus 2026',
    file: { name: 'Kontrak_Pengadaan_Kopi_6Bulan.pdf', size: '1.5 MB' }
  },
  't-5': {
    title: 'Rekapitulasi Arus Kas POS September',
    issuer: 'Sistem POS Moka & Rekening Giro Mandiri',
    regNo: 'REKAP/POS-MDR/2026/09',
    classification: 'Rekonsiliasi Kas Harian',
    date: '05 Oktober 2026',
    file: { name: 'Rekapitulasi_Kas_September_KopiSenja.pdf', size: '890 KB' }
  },
  't-6': {
    title: 'Dokumen Ringkasan Eksekutif & Pitch Deck',
    issuer: 'Konsultan Kurator Beruang & Founder',
    regNo: 'DECK/PITCH/2026/1012',
    classification: 'Kesiapan Due Diligence Investor',
    date: '12 Oktober 2026',
    file: { name: 'Executive_Summary_KopiSenja.pdf', size: '2.4 MB' }
  }
}

const selectedTaskEvidence = computed(() => {
  if (!selectedTaskForPreview.value) return null
  const taskId = selectedTaskForPreview.value.id
  return defaultTaskEvidence[taskId] || {
    title: `Bukti Pelaksanaan Tugas - ${selectedTaskForPreview.value.title}`,
    issuer: 'Konsultan & Tim Operasional Gerai',
    regNo: `EVD/${String(taskId).toUpperCase()}/2026`,
    classification: 'Dokumentasi Kepatuhan Langkah Tugas',
    date: selectedTaskForPreview.value.dueDate || 'Oktober 2026',
    file: { name: `Bukti_Dokumen_${taskId}.pdf`, size: '1.1 MB' }
  }
})

function openTaskEvidence(task: any) {
  selectedTaskForPreview.value = task
  isEvidenceModalOpen.value = true
}

// Modal & Submission Logic
const isSubmitModalOpen = ref(false)
const showSuccessToast = ref(false)

function handleSubmitApplication() {
  isSubmitModalOpen.value = false
  showSuccessToast.value = true
  setTimeout(() => {
    currentFundingStage.value = 'READY'
  }, 1200)
  setTimeout(() => {
    showSuccessToast.value = false
  }, 4000)
}

// Copy link logic with feedback toast
const isCopied = ref(false)
let copyTimeout: any = null

const effectiveShareUrl = computed(() => {
  if (typeof window !== 'undefined') {
    return `${window.location.origin}/dashboard/profil-publik`
  }
  return 'https://beruang.id/dashboard/profil-publik'
})

function fallbackCopyText(text: string) {
  try {
    const textArea = document.createElement('textarea')
    textArea.value = text
    textArea.style.position = 'fixed'
    textArea.style.left = '-999999px'
    textArea.style.top = '-999999px'
    document.body.appendChild(textArea)
    textArea.focus()
    textArea.select()
    document.execCommand('copy')
    textArea.remove()
  } catch {}
}

function handleCopyLink() {
  const url = effectiveShareUrl.value
  fallbackCopyText(url)
  if (typeof navigator !== 'undefined' && navigator.clipboard) {
    try {
      navigator.clipboard.writeText(url).catch(() => {})
    } catch {}
  }
  isCopied.value = true
  clearTimeout(copyTimeout)
  copyTimeout = setTimeout(() => {
    isCopied.value = false
  }, 2500)
}

function handleWhatsApp() {
  const text = `Lihat profil usaha ${umkmStore.profile.name || 'Kopi Senja Nusantara'} di platform Beruang:\n${effectiveShareUrl.value}`
  const targetUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`
  window.open(targetUrl, '_blank')
}

function handleFacebook() {
  const targetUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(effectiveShareUrl.value)}`
  window.open(targetUrl, '_blank')
}

function handleMessenger() {
  const url = effectiveShareUrl.value
  const targetUrl = `https://www.facebook.com/dialog/send?link=${encodeURIComponent(url)}&app_id=291494419107518&redirect_uri=${encodeURIComponent(url)}`
  window.open(targetUrl, '_blank')
}

function handleLinkedIn() {
  const targetUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(effectiveShareUrl.value)}`
  window.open(targetUrl, '_blank')
}

function handleGmail() {
  const subject = `Profil Usaha: ${umkmStore.profile.name || 'Kopi Senja Nusantara'} - Beruang`
  const body = `Halo,\n\nSilakan cek profil usaha ${umkmStore.profile.name || 'Kopi Senja Nusantara'} di platform Beruang melalui tautan berikut:\n${effectiveShareUrl.value}`
  const targetUrl = `https://mail.google.com/mail/?view=cm&fs=1&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
  window.open(targetUrl, '_blank')
}

// Certificate download/print
function handleDownloadCertificate() {
  if (typeof window !== 'undefined') {
    window.print()
  }
}
</script>

<style scoped>
.card-tactile-gopay,
:deep(.card-tactile-gopay) {
  background-color: #FFFFFF !important;
  box-shadow: none !important;
  border-width: 1.5px !important;
  border-color: #E2E8F0 !important;
}

.dark .card-tactile-gopay,
:deep(.dark .card-tactile-gopay),
:deep(.dark) .card-tactile-gopay {
  background-color: #13161F !important;
  border-color: rgba(255, 255, 255, 0.15) !important;
}

.card-tactile-gopay::before,
:deep(.card-tactile-gopay::before) {
  display: none !important;
  box-shadow: none !important;
}

@media print {
  body {
    background: white !important;
    color: black !important;
  }
}
</style>
