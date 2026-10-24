<template>
  <div class="space-y-6 sm:space-y-8 pb-16 font-poppins text-neutral-900 dark:text-neutral-100 select-text">
    <!-- ========================================================================= -->
    <!-- 1. TOP HEADER: Clean Page Title & Chat Konsultan Action                     -->
    <!-- ========================================================================= -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 min-h-[44px]">
      <div class="flex items-center gap-2.5 sm:gap-3">
        <HugeiconsIcon
          :icon="AnalyticsUpIcon"
          :size="26"
          :stroke-width="2.2"
          class="text-neutral-900 dark:text-white shrink-0"
        />
        <h1 class="font-poppins font-semibold text-2xl sm:text-3xl text-neutral-900 dark:text-white tracking-tight leading-tight">
          Kesehatan Bisnis
        </h1>
      </div>

      <div class="flex items-center gap-2.5 shrink-0 w-full sm:w-auto [&>*]:w-full sm:[&>*]:w-auto">
        <BActionButton
          variant="green"
          :huge-icon="Comment01Icon"
          to="/dashboard/pesan"
          custom-class="px-5 py-2.5 text-xs sm:text-sm font-semibold shadow-xs justify-center"
          title="Buka pesan untuk konsultasi langsung dengan konsultan pendamping"
        >
          Chat Konsultan
        </BActionButton>
      </div>
    </div>

    <!-- ========================================================================= -->
    <!-- 2. BARIS 1: 4 KARTU STAT METRIK (Standar Beruang Design System)           -->
    <!-- ========================================================================= -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 items-stretch w-full">
      <!-- Card 1: Indeks Kesehatan Toko -->
      <div class="card-tactile-gopay rounded-2xl p-5 sm:p-6 bg-white dark:bg-[#13161F] border border-[#E2E8F0] dark:border-neutral-800 flex flex-col justify-between transition-all duration-200">
        <div>
          <div class="flex items-center justify-between w-full">
            <div class="w-8 h-8 rounded-lg bg-[#E6F4F7] dark:bg-[#156374]/30 flex items-center justify-center shrink-0">
              <HugeiconsIcon :icon="AnalyticsUpIcon" :size="17" class="text-[#156374] dark:text-[#50AABF]" />
            </div>
            <span class="px-2 py-0.5 rounded-md text-[11px] font-semibold bg-emerald-50 text-[#00800e] dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-200/80 dark:border-emerald-800/60 shrink-0">
              +5 Poin
            </span>
          </div>

          <div class="mt-3.5 space-y-1">
            <span class="text-xs sm:text-[13px] font-semibold text-neutral-600 dark:text-neutral-400 block font-poppins">
              Indeks Kesehatan Toko
            </span>
            <div class="flex items-baseline gap-1.5 pt-0.5">
              <span class="text-2xl sm:text-3xl font-bold text-neutral-900 dark:text-white tabular-nums tracking-tight leading-none">
                79
              </span>
              <span class="text-sm font-semibold text-neutral-400 dark:text-neutral-500">/ 100</span>
            </div>
            <p class="text-[11px] text-neutral-500 dark:text-neutral-400 font-sans pt-1 leading-relaxed">
              Naik dari 74 poin evaluasi bulan lalu
            </p>
          </div>
        </div>
      </div>

      <!-- Card 2: Pilar Lulus Standar -->
      <div class="card-tactile-gopay rounded-2xl p-5 sm:p-6 bg-white dark:bg-[#13161F] border border-[#E2E8F0] dark:border-neutral-800 flex flex-col justify-between transition-all duration-200">
        <div>
          <div class="flex items-center justify-between w-full">
            <div class="w-8 h-8 rounded-lg bg-[#E6F4F7] dark:bg-[#156374]/30 flex items-center justify-center shrink-0">
              <HugeiconsIcon :icon="Task01Icon" :size="17" class="text-[#156374] dark:text-[#50AABF]" />
            </div>
            <span class="px-2 py-0.5 rounded-md text-[11px] font-semibold bg-amber-50 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300 border border-amber-200/80 dark:border-amber-800/60 shrink-0">
              40% Lolos
            </span>
          </div>

          <div class="mt-3.5 space-y-1">
            <span class="text-xs sm:text-[13px] font-semibold text-neutral-600 dark:text-neutral-400 block font-poppins">
              Pilar Lulus Standar
            </span>
            <div class="flex items-baseline gap-1.5 pt-0.5">
              <span class="text-2xl sm:text-3xl font-bold text-neutral-900 dark:text-white tabular-nums tracking-tight leading-none">
                2 / 5
              </span>
              <span class="text-sm font-semibold text-neutral-400 dark:text-neutral-500">Pilar</span>
            </div>
            <p class="text-[11px] text-neutral-500 dark:text-neutral-400 font-sans pt-1 leading-relaxed">
              3 pilar butuh perbaikan terarah
            </p>
          </div>
        </div>
      </div>

      <!-- Card 3: Estimasi Plafon Modal -->
      <div class="card-tactile-gopay rounded-2xl p-5 sm:p-6 bg-white dark:bg-[#13161F] border border-[#E2E8F0] dark:border-neutral-800 flex flex-col justify-between transition-all duration-200">
        <div>
          <div class="flex items-center justify-between w-full">
            <div class="w-8 h-8 rounded-lg bg-[#E6F4F7] dark:bg-[#156374]/30 flex items-center justify-center shrink-0">
              <HugeiconsIcon :icon="Coins01Icon" :size="17" class="text-[#156374] dark:text-[#50AABF]" />
            </div>
            <span class="px-2 py-0.5 rounded-md text-[11px] font-semibold bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 border border-neutral-200 dark:border-neutral-700 shrink-0">
              Bagi Hasil
            </span>
          </div>

          <div class="mt-3.5 space-y-1">
            <span class="text-xs sm:text-[13px] font-semibold text-neutral-600 dark:text-neutral-400 block font-poppins">
              Estimasi Plafon Modal
            </span>
            <div class="flex items-baseline gap-1.5 pt-0.5">
              <span class="text-2xl sm:text-3xl font-bold text-neutral-900 dark:text-white tabular-nums tracking-tight leading-none">
                Rp 250 Jt
              </span>
            </div>
            <p class="text-[11px] text-neutral-500 dark:text-neutral-400 font-sans pt-1 leading-relaxed">
              Rekomendasi nilai pendanaan bertahap
            </p>
          </div>
        </div>
      </div>

      <!-- Card 4: Pergerakan Untung Bersih -->
      <div class="card-tactile-gopay rounded-2xl p-5 sm:p-6 bg-white dark:bg-[#13161F] border border-[#E2E8F0] dark:border-neutral-800 flex flex-col justify-between transition-all duration-200">
        <div>
          <div class="flex items-center justify-between w-full">
            <div class="w-8 h-8 rounded-lg bg-[#E6F4F7] dark:bg-[#156374]/30 flex items-center justify-center shrink-0">
              <HugeiconsIcon :icon="MoneyBag01Icon" :size="17" class="text-[#156374] dark:text-[#50AABF]" />
            </div>
            <span class="px-2 py-0.5 rounded-md text-[11px] font-semibold bg-emerald-50 text-[#00800e] dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-200/80 dark:border-emerald-800/60 shrink-0">
              +12% MoM
            </span>
          </div>

          <div class="mt-3.5 space-y-1">
            <span class="text-xs sm:text-[13px] font-semibold text-neutral-600 dark:text-neutral-400 block font-poppins">
              Pergerakan Untung Bersih
            </span>
            <div class="flex items-baseline gap-1.5 pt-0.5">
              <span class="text-2xl sm:text-3xl font-bold text-neutral-900 dark:text-white tabular-nums tracking-tight leading-none">
                Rp 32,6 Jt
              </span>
            </div>
            <p class="text-[11px] text-neutral-500 dark:text-neutral-400 font-sans pt-1 leading-relaxed">
              Margin untung 32,6% terjaga stabil
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- ========================================================================= -->
    <!-- 3. BARIS 2: EVALUASI KELAYAKAN 5 PILAR TOKO (Redesain Kebutuhan UMKM)     -->
    <!-- Donut Chart & 5 Pilar Kesiapan Bisnis Tanpa Catatan/Langkah Perbaikan      -->
    <!-- ========================================================================= -->
    <div class="card-tactile-gopay rounded-2xl p-5 sm:p-7 bg-white dark:bg-[#13161F] border border-[#E2E8F0] dark:border-neutral-800 flex flex-col justify-between font-poppins space-y-6 w-full">
      <div>
        <!-- Header Card -->
        <div class="pb-4 border-b border-neutral-100 dark:border-neutral-800 flex items-center justify-between flex-wrap gap-2">
          <div>
            <h2 class="font-poppins font-bold text-lg sm:text-xl text-neutral-900 dark:text-white">
              Evaluasi Kelayakan 5 Pilar Toko
            </h2>
            <p class="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
              Standar kesiapan tata kelola bisnis tokomu berbasis bobot kriteria pemodal terakreditasi
            </p>
          </div>
          <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 border border-neutral-200 dark:border-neutral-700">
            <span>Ambang Batas Lolos Pemodal: 80%</span>
          </span>
        </div>

        <!-- Bagian Donut Chart Kelayakan 5 Pilar -->
        <div class="pt-5 pb-5 border-b border-neutral-100 dark:border-neutral-800/80">
          <div class="flex flex-col sm:flex-row items-center gap-6 sm:gap-8">
            <!-- Donut Chart Canvas Container with Center Grade Indicator -->
            <div class="relative w-36 h-36 sm:w-44 sm:h-44 shrink-0 flex items-center justify-center">
              <canvas ref="donutCanvas" class="w-full h-full"></canvas>
              <div class="absolute inset-0 flex flex-col items-center justify-center pointer-events-none select-none">
                <span class="text-3xl font-bold font-poppins text-neutral-900 dark:text-white tabular-nums leading-none">
                  79%
                </span>
                <span class="text-xs font-semibold text-[#00800e] dark:text-emerald-400 mt-1">
                  Grade B+
                </span>
              </div>
            </div>

            <!-- Donut Chart Legend & Summary Kebutuhan UMKM -->
            <div class="flex-1 space-y-3 text-center sm:text-left min-w-0">
              <div class="space-y-1">
                <div class="flex items-center justify-center sm:justify-start gap-2 flex-wrap">
                  <h3 class="text-base sm:text-lg font-bold text-neutral-900 dark:text-white">
                    Status: Layak Bersyarat
                  </h3>
                  <span class="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 text-[#00800e] dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-200/80 dark:border-emerald-800/60">
                    Dikit Lagi Lolos Penuh
                  </span>
                </div>
                <p class="text-xs sm:text-[13px] text-neutral-600 dark:text-neutral-300 leading-relaxed font-sans max-w-2xl">
                  Skor tokomu saat ini <strong>79%</strong> dengan 2 pilar telah memenuhi target pemodal. Selisih 3 pilar lainnya hanya berjarak 5%–11% dari ambang batas ideal pendanaan institusional (80%).
                </p>
              </div>

              <!-- Status Legend Badges -->
              <div class="flex items-center justify-center sm:justify-start gap-2.5 pt-1 flex-wrap">
                <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-semibold bg-emerald-50 dark:bg-emerald-950/60 text-[#00800e] dark:text-emerald-300 border border-emerald-200/80 dark:border-emerald-800/60">
                  <span class="w-2 h-2 rounded-full bg-[#00800e]" />
                  <span>2 Pilar Lolos Standar</span>
                </span>
                <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-semibold bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border border-amber-200/80 dark:border-amber-800/60">
                  <span class="w-2 h-2 rounded-full bg-[#D97706]" />
                  <span>3 Pilar Perlu Penguatan</span>
                </span>
              </div>
            </div>
          </div>
        </div>

        <!-- 5 Baris Pilar Kesiapan Bisnis (Lebar Penuh, Rapi, Bersih Tanpa Clutter Catatan/Langkah) -->
        <div class="space-y-3 pt-4">
          <div
            v-for="pillar in fivePillars"
            :key="pillar.id"
            class="p-4 sm:p-5 rounded-xl border border-neutral-200/90 dark:border-neutral-800 hover:border-neutral-400 dark:hover:border-neutral-600 bg-white dark:bg-[#13161F] transition-all duration-200"
          >
            <!-- Baris Atas: Nama Pilar, Deskripsi Edukatif UMKM, Skor vs Target, & Status Badge -->
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
              <div class="min-w-0 space-y-0.5">
                <div class="flex items-center gap-2.5">
                  <span
                    class="w-2.5 h-2.5 rounded-full shrink-0"
                    :style="{ backgroundColor: pillar.color }"
                  />
                  <h3 class="font-poppins font-semibold text-sm sm:text-base text-neutral-900 dark:text-white truncate">
                    {{ pillar.name }}
                  </h3>
                </div>
                <p class="text-xs text-neutral-500 dark:text-neutral-400 font-sans pl-5 leading-normal">
                  {{ pillar.description }}
                </p>
              </div>

              <!-- Skor & Status Badge -->
              <div class="flex items-center gap-3 shrink-0 text-xs pl-5 sm:pl-0">
                <div class="text-neutral-600 dark:text-neutral-300 font-medium">
                  Skor: <strong class="text-neutral-900 dark:text-white tabular-nums font-bold text-sm">{{ pillar.score }}%</strong>
                  <span class="text-neutral-300 dark:text-neutral-700 mx-1.5">|</span>
                  <span class="text-neutral-500 dark:text-neutral-400">Target Min: <span class="tabular-nums font-semibold">{{ pillar.targetScore }}%</span></span>
                </div>

                <span
                  v-if="pillar.score >= pillar.targetScore"
                  class="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 text-[#00800e] border border-emerald-200 dark:bg-emerald-950/80 dark:text-emerald-300 dark:border-emerald-800"
                >
                  Lolos Standar
                </span>
                <span
                  v-else
                  class="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-amber-50 text-amber-700 border border-amber-200 dark:bg-amber-950/80 dark:text-amber-300 dark:border-amber-800"
                >
                  Perlu Aksi
                </span>
              </div>
            </div>

            <!-- Baris Bawah: Horizontal Progress Bar dengan Penanda Target Pemodal -->
            <div class="relative w-full h-2 rounded-full bg-neutral-100 dark:bg-neutral-800 overflow-visible mt-3">
              <div
                class="h-full rounded-full transition-all duration-300"
                :style="{
                  width: `${pillar.score}%`,
                  backgroundColor: pillar.score >= pillar.targetScore ? '#00800e' : '#D97706'
                }"
              />

              <!-- Threshold Marker: Garis Penanda Vertikal Gelap pada Titik Target -->
              <div
                class="absolute -top-1 w-0.5 h-4 bg-neutral-900 dark:bg-white z-10 rounded-full shadow-2xs pointer-events-none"
                :style="{ left: `${pillar.targetScore}%` }"
                :title="`Batas Target Minimum: ${pillar.targetScore}%`"
              />
            </div>
          </div>
        </div>
      </div>

      <!-- Footnote Status -->
      <div class="pt-3 border-t border-neutral-100 dark:border-neutral-800 text-[11px] text-neutral-500 dark:text-neutral-400 flex items-center justify-between">
        <span>Garis vertikal menandai ambang batas kelayakan modal pemodal.</span>
        <span class="font-semibold text-neutral-800 dark:text-neutral-200">2 dari 5 Lolos (40%)</span>
      </div>
    </div>

    <!-- ========================================================================= -->
    <!-- 4. BARIS 3: BENTO 2 KOLOM (Kesiapan Berkas Legalitas & Ringkasan Keuangan)   -->
    <!-- Masing-masing domain memiliki kartu terpisah yang lega dan rapi          -->
    <!-- ========================================================================= -->
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-7 items-stretch w-full">
      <!-- Container 1 (6 Kolom): Kesiapan Berkas Legalitas Toko -->
      <div class="lg:col-span-6 card-tactile-gopay rounded-2xl p-5 sm:p-7 bg-white dark:bg-[#13161F] border border-[#E2E8F0] dark:border-neutral-800 font-poppins flex flex-col justify-between space-y-5">
        <div>
          <div class="pb-3 border-b border-neutral-100 dark:border-neutral-800 flex items-center justify-between flex-wrap gap-2">
            <div>
              <h2 class="font-poppins font-bold text-base sm:text-lg text-neutral-900 dark:text-white">
                Kesiapan Berkas Legalitas Toko
              </h2>
              <p class="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
                Dokumen kepatuhan resmi yang wajib diverifikasi sebelum pendanaan
              </p>
            </div>
            <NuxtLink
              to="/dashboard/profile"
              class="text-xs font-semibold text-[#156374] dark:text-[#50AABF] hover:underline flex items-center gap-1 shrink-0"
            >
              <span>Buka Data Room</span>
              <HugeiconsIcon :icon="ArrowRight01Icon" :size="14" />
            </NuxtLink>
          </div>

          <!-- 4 Kartu Berkas Legalitas -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3">
            <!-- NIB Usaha -->
            <div class="p-3.5 rounded-xl border border-neutral-200/90 dark:border-neutral-800 bg-white dark:bg-[#15161A] flex items-center justify-between gap-3">
              <div class="flex items-start gap-2.5 min-w-0">
                <div class="w-8 h-8 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 text-[#00800e] flex items-center justify-center shrink-0 mt-0.5">
                  <HugeiconsIcon :icon="ShieldCheckIcon" :size="17" />
                </div>
                <div class="min-w-0">
                  <h5 class="text-xs sm:text-[13px] font-semibold text-neutral-900 dark:text-white truncate">
                    NIB Usaha
                  </h5>
                  <p class="text-[11px] text-neutral-500 dark:text-neutral-400 truncate mt-0.5">
                    No. 1209.2831.0091 • OSS
                  </p>
                </div>
              </div>
              <span class="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 text-[#00800e] dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-200/80 dark:border-emerald-800/60 shrink-0">
                Lengkap
              </span>
            </div>

            <!-- NPWP Toko -->
            <div class="p-3.5 rounded-xl border border-neutral-200/90 dark:border-neutral-800 bg-white dark:bg-[#15161A] flex items-center justify-between gap-3">
              <div class="flex items-start gap-2.5 min-w-0">
                <div class="w-8 h-8 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 text-[#00800e] flex items-center justify-center shrink-0 mt-0.5">
                  <HugeiconsIcon :icon="ShieldCheckIcon" :size="17" />
                </div>
                <div class="min-w-0">
                  <h5 class="text-xs sm:text-[13px] font-semibold text-neutral-900 dark:text-white truncate">
                    NPWP Toko
                  </h5>
                  <p class="text-[11px] text-neutral-500 dark:text-neutral-400 truncate mt-0.5">
                    No. 82.910.455.2 • Taat
                  </p>
                </div>
              </div>
              <span class="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 text-[#00800e] dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-200/80 dark:border-emerald-800/60 shrink-0">
                Lengkap
              </span>
            </div>

            <!-- Rekening Khusus -->
            <div class="p-3.5 rounded-xl border border-neutral-200/90 dark:border-neutral-800 bg-white dark:bg-[#15161A] flex items-center justify-between gap-3">
              <div class="flex items-start gap-2.5 min-w-0">
                <div class="w-8 h-8 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 text-[#00800e] flex items-center justify-center shrink-0 mt-0.5">
                  <HugeiconsIcon :icon="ShieldCheckIcon" :size="17" />
                </div>
                <div class="min-w-0">
                  <h5 class="text-xs sm:text-[13px] font-semibold text-neutral-900 dark:text-white truncate">
                    Rekening Khusus
                  </h5>
                  <p class="text-[11px] text-neutral-500 dark:text-neutral-400 truncate mt-0.5">
                    Giro Mandiri 142-00-19283
                  </p>
                </div>
              </div>
              <span class="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 text-[#00800e] dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-200/80 dark:border-emerald-800/60 shrink-0">
                Lengkap
              </span>
            </div>

            <!-- Bukti Nota Transaksi -->
            <div class="p-3.5 rounded-xl border border-neutral-200/90 dark:border-neutral-800 bg-white dark:bg-[#15161A] flex items-center justify-between gap-3">
              <div class="flex items-start gap-2.5 min-w-0">
                <div class="w-8 h-8 rounded-lg bg-amber-50 dark:bg-amber-950/40 text-amber-600 flex items-center justify-center shrink-0 mt-0.5">
                  <HugeiconsIcon :icon="FileValidationIcon" :size="17" />
                </div>
                <div class="min-w-0">
                  <h5 class="text-xs sm:text-[13px] font-semibold text-neutral-900 dark:text-white truncate">
                    Bukti Nota Transaksi
                  </h5>
                  <p class="text-[11px] text-neutral-500 dark:text-neutral-400 truncate mt-0.5">
                    Arsip 30 Hari • 80% Terarsip
                  </p>
                </div>
              </div>
              <span class="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-amber-50 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300 border border-amber-200/80 dark:border-amber-800/60 shrink-0">
                Perlu Aksi
              </span>
            </div>
          </div>
        </div>

        <div class="pt-3 border-t border-neutral-100 dark:border-neutral-800 text-[11px] text-neutral-500 dark:text-neutral-400 flex items-center justify-between">
          <span>3 dari 4 berkas tervalidasi sah.</span>
          <span class="font-semibold text-[#00800e] dark:text-emerald-400">Tingkat Kepatuhan: 75%</span>
        </div>
      </div>

      <!-- Container 2 (6 Kolom): Ringkasan Keuangan Toko (30 Hari) -->
      <div class="lg:col-span-6 card-tactile-gopay rounded-2xl p-5 sm:p-7 bg-white dark:bg-[#13161F] border border-[#E2E8F0] dark:border-neutral-800 font-poppins flex flex-col justify-between space-y-5">
        <div>
          <div class="pb-3 border-b border-neutral-100 dark:border-neutral-800 flex items-center justify-between flex-wrap gap-2">
            <div>
              <h2 class="font-poppins font-bold text-base sm:text-lg text-neutral-900 dark:text-white">
                Ringkasan Keuangan (30 Hari)
              </h2>
              <p class="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
                Akumulasi pergerakan uang masuk dan modal jualan 30 hari terakhir
              </p>
            </div>
            <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold bg-emerald-50 dark:bg-emerald-950/60 text-[#00800e] dark:text-emerald-300 border border-emerald-200/80 dark:border-emerald-800/60">
              <span>Margin Untung: 32,6%</span>
            </span>
          </div>

          <!-- Grid 3 Kartu Finansial Baku Beruang -->
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3">
            <!-- Total Pendapatan -->
            <div class="p-3.5 rounded-xl bg-white dark:bg-[#15161A] border border-neutral-200/90 dark:border-neutral-800 flex flex-col justify-between">
              <span class="text-[11px] text-neutral-500 dark:text-neutral-400 font-medium">Total Pendapatan</span>
              <div class="font-bold text-base text-neutral-900 dark:text-white tabular-nums pt-1">
                Rp 100 Jt
              </div>
              <span class="text-[10px] text-neutral-400 font-sans pt-0.5">Uang masuk kotor</span>
            </div>

            <!-- Modal Jualan -->
            <div class="p-3.5 rounded-xl bg-white dark:bg-[#15161A] border border-neutral-200/90 dark:border-neutral-800 flex flex-col justify-between">
              <span class="text-[11px] text-neutral-500 dark:text-neutral-400 font-medium">Modal Jualan</span>
              <div class="font-bold text-base text-neutral-800 dark:text-neutral-200 tabular-nums pt-1">
                Rp 45,1 Jt
              </div>
              <span class="text-[10px] text-emerald-600 font-sans pt-0.5">Hemat (45,1%)</span>
            </div>

            <!-- Untung Bersih -->
            <div class="p-3.5 rounded-xl bg-emerald-50/70 dark:bg-emerald-950/40 border border-emerald-200/80 dark:border-emerald-800 flex flex-col justify-between">
              <span class="text-[11px] font-semibold text-emerald-800 dark:text-emerald-300">Untung Bersih</span>
              <div class="font-bold text-base text-[#00800e] dark:text-emerald-400 tabular-nums pt-1">
                Rp 32,6 Jt
              </div>
              <span class="text-[10px] text-emerald-700 dark:text-emerald-400 font-sans pt-0.5">Sisa kas bersih</span>
            </div>
          </div>
        </div>

        <div class="pt-3 border-t border-neutral-100 dark:border-neutral-800 text-[11px] text-neutral-500 dark:text-neutral-400 flex items-center justify-between">
          <span>Rasio untung bersih toko melampaui rata-rata industri F&B (25%).</span>
          <span class="font-semibold text-neutral-800 dark:text-neutral-200">Arus Kas: Sehat</span>
        </div>
      </div>
    </div>

    <!-- ========================================================================= -->
    <!-- 5. BARIS 4: TREN UNTUNG BERSIH (Seragam dengan Pergerakan Uang Toko)        -->
    <!-- ========================================================================= -->
    <div class="card-tactile-gopay rounded-[18px] p-6 sm:p-8 bg-white dark:bg-[#13161F] border border-[#E2E8F0] dark:border-neutral-800 font-poppins space-y-9 sm:space-y-11 w-full">
      <!-- Header: Title, Subtitle, and Right Actions (Dropdown Chart Type, Dropdown Period, Button Lihat Detail) -->
      <div class="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-2 sm:pb-3">
        <!-- Left: Title & Subtitle -->
        <div class="min-w-0 max-w-xl">
          <h2 class="text-lg sm:text-[21px] font-poppins font-bold text-neutral-900 dark:text-white tracking-tight">
            Tren Untung Bersih
          </h2>
          <p class="text-xs sm:text-[14px] font-poppins text-neutral-500 dark:text-neutral-400 mt-2 sm:mt-2.5 leading-normal">
            Grafik pemantauan akumulasi untung bersih toko dari waktu ke waktu sebagai indikator stabilitas finansial.
          </p>
        </div>

        <!-- Right: Actions Control (Dropdown Jenis Grafik + Dropdown Periode + Button Lihat Detail) -->
        <div class="flex items-center gap-2.5 sm:gap-3 flex-wrap lg:flex-nowrap shrink-0">
          <!-- 1. Dropdown Jenis Grafik (Bergaya btn-pill-action seperti Pergerakan Uang Toko) -->
          <div ref="chartTypeDropdownRef" class="relative">
            <button
              type="button"
              :class="[
                'btn-pill-action group cursor-pointer',
                isChartTypeDropdownOpen ? 'bg-[#E6F4F7]! text-[#156374]! border-[#156374]/30!' : ''
              ]"
              aria-haspopup="true"
              :aria-expanded="isChartTypeDropdownOpen"
              title="Pilih Jenis Tampilan Grafik"
              @click="toggleChartTypeDropdown"
            >
              <span>{{ activeChartTypeLabel }}</span>
              <HugeiconsIcon
                :icon="ArrowDown01Icon"
                :size="14"
                :stroke-width="2.2"
                :class="['text-neutral-400 dark:text-neutral-500 transition-transform duration-200 shrink-0', isChartTypeDropdownOpen ? 'rotate-180' : '']"
              />
            </button>

            <!-- Popover Dropdown Panel -->
            <div
              v-if="isChartTypeDropdownOpen"
              class="absolute right-0 top-full mt-1.5 w-44 rounded-[8px] bg-[#FFFFFF] dark:bg-[#18191E] border border-[#CBD5E1] dark:border-neutral-700 p-1.5 z-50 font-poppins text-sm animate-in fade-in zoom-in-95 duration-100"
            >
              <button
                v-for="opt in chartTypeOptions"
                :key="opt.id"
                type="button"
                :class="[
                  'w-full flex items-center justify-between px-3 py-2 rounded-[8px] text-sm font-poppins transition-all duration-150 text-left cursor-pointer',
                  chartPreviewMode === opt.id
                    ? 'bg-[#E6F4F7] hover:bg-[#D9EEF3] dark:bg-[#156374]/20 dark:hover:bg-[#156374]/30 text-[#156374] dark:text-[#50AABF] font-semibold border border-[#156374]/20 dark:border-[#50AABF]/25'
                    : 'text-[#64748B] dark:text-neutral-400 font-medium hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100/80 dark:hover:bg-neutral-800/60 border border-transparent'
                ]"
                @click="selectChartType(opt.id)"
              >
                <span class="truncate">{{ opt.label }}</span>
                <span v-if="chartPreviewMode === opt.id" class="w-1.5 h-1.5 rounded-full bg-[#156374] dark:bg-[#50AABF] shrink-0 ml-2" />
              </button>
            </div>
          </div>

          <!-- 2. Dropdown Filter Periode / Rentang Waktu (Bergaya btn-pill-action seperti Pergerakan Uang Toko) -->
          <div ref="periodDropdownRef" class="relative">
            <button
              type="button"
              :class="[
                'btn-pill-action group cursor-pointer',
                isPeriodDropdownOpen ? 'bg-[#E6F4F7]! text-[#156374]! border-[#156374]/30!' : ''
              ]"
              aria-haspopup="true"
              :aria-expanded="isPeriodDropdownOpen"
              title="Pilih Rentang Waktu"
              @click="togglePeriodDropdown"
            >
              <HugeiconsIcon
                :icon="Calendar03Icon"
                :size="14"
                :stroke-width="2.0"
                class="text-neutral-400 dark:text-neutral-500 shrink-0"
              />
              <span>{{ activePeriodLabel }}</span>
              <HugeiconsIcon
                :icon="ArrowDown01Icon"
                :size="14"
                :stroke-width="2.2"
                :class="['text-neutral-400 dark:text-neutral-500 transition-transform duration-200 shrink-0', isPeriodDropdownOpen ? 'rotate-180' : '']"
              />
            </button>

            <!-- Popover Dropdown Panel -->
            <div
              v-if="isPeriodDropdownOpen"
              class="absolute right-0 top-full mt-1.5 w-44 rounded-[8px] bg-[#FFFFFF] dark:bg-[#18191E] border border-[#CBD5E1] dark:border-neutral-700 p-1.5 z-50 font-poppins text-sm animate-in fade-in zoom-in-95 duration-100"
            >
              <button
                v-for="opt in periodFilterOptions"
                :key="opt.id"
                type="button"
                :class="[
                  'w-full flex items-center justify-between px-3 py-2 rounded-[8px] text-sm font-poppins transition-all duration-150 text-left cursor-pointer',
                  selectedPeriodFilter === opt.id
                    ? 'bg-[#E6F4F7] hover:bg-[#D9EEF3] dark:bg-[#156374]/20 dark:hover:bg-[#156374]/30 text-[#156374] dark:text-[#50AABF] font-semibold border border-[#156374]/20 dark:border-[#50AABF]/25'
                    : 'text-[#64748B] dark:text-neutral-400 font-medium hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100/80 dark:hover:bg-neutral-800/60 border border-transparent'
                ]"
                @click="selectPeriodFilter(opt.id)"
              >
                <span>{{ opt.label }}</span>
                <span v-if="selectedPeriodFilter === opt.id" class="w-1.5 h-1.5 rounded-full bg-[#156374] dark:bg-[#50AABF]" />
              </button>
            </div>
          </div>

          <!-- 3. Button Lihat Detail -->
          <NuxtLink
            to="/dashboard/progres"
            class="btn-pill-action group shrink-0"
            title="Lihat Detail"
          >
            <span>Lihat Detail</span>
            <HugeiconsIcon
              :icon="ArrowRight01Icon"
              :size="16"
              :stroke-width="2.0"
              class="shrink-0 transition-transform duration-200 group-hover:translate-x-0.5"
            />
          </NuxtLink>
        </div>
      </div>

      <!-- BShadcnLineChart Component: Seragam dengan Pergerakan Uang Toko di Beranda -->
      <div class="relative w-full h-64 sm:h-72 pt-6 sm:pt-8">
        <BShadcnLineChart
          :data="filteredProfitTrendRecords"
          index="month"
          :categories="currentProfitChartCategories"
          :config="currentProfitChartConfig"
          curve-type="linear"
          :mode="chartPreviewMode"
          :show-area="chartPreviewMode === 'area'"
          :show-grid-line="true"
          :show-tooltip="true"
          :show-x-axis="true"
          :show-y-axis="true"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount, nextTick } from 'vue'
import Chart from 'chart.js/auto'
import BActionButton from '~/components/base/BActionButton.vue'
import BShadcnLineChart from '~/components/base/BShadcnLineChart.vue'
import { HugeiconsIcon } from '@hugeicons/vue'
import {
  AnalyticsUpIcon,
  ArrowRight01Icon,
  ArrowDown01Icon,
  Calendar03Icon,
  Comment01Icon,
  Task01Icon,
  Coins01Icon,
  MoneyBag01Icon,
  ShieldCheckIcon,
  FileValidationIcon
} from '@hugeicons/core-free-icons'

definePageMeta({
  layout: 'dashboard',
  hideHeader: true
})

// 5 Aspek Fundamental Kesiapan Bisnis Toko (Disesuaikan untuk Kebutuhan UMKM)
const fivePillars = [
  {
    id: 'fin',
    name: 'Keuangan & Pergerakan Uang',
    description: 'Pemisahan rekening pribadi dengan kas toko dan disiplin pencatatan transaksi',
    score: 78,
    targetScore: 85,
    color: '#156374'
  },
  {
    id: 'ops',
    name: 'Operasional & Standar Kerja',
    description: 'Kerapian stok bahan baku, resep standar penyajian, dan efisiensi sisa bahan',
    score: 85,
    targetScore: 80,
    color: '#00800e'
  },
  {
    id: 'mkt',
    name: 'Pasar & Pemasaran',
    description: 'Jumlah pelanggan setia, frekuensi pesanan berulang, dan penjualan langsung',
    score: 64,
    targetScore: 75,
    color: '#2563EB'
  },
  {
    id: 'leg',
    name: 'Legalitas & Izin Usaha',
    description: 'Kelengkapan dokumen resmi NIB OSS RBA, NPWP toko, dan sertifikat halal',
    score: 92,
    targetScore: 90,
    color: '#6366F1'
  },
  {
    id: 'gov',
    name: 'Tim & Pembagian Tugas',
    description: 'Kejelasan peran Store Leader, jadwal shift kerja, dan evaluasi hasil tim',
    score: 75,
    targetScore: 80,
    color: '#D97706'
  }
]

// Donut Chart Instance for 5 Pillars
const donutCanvas = ref<HTMLCanvasElement | null>(null)
let donutChartInstance: any = null

function initDonutChart() {
  if (!donutCanvas.value) return
  if (donutChartInstance) {
    donutChartInstance.destroy()
    donutChartInstance = null
  }

  donutChartInstance = new Chart(donutCanvas.value, {
    type: 'doughnut',
    data: {
      labels: fivePillars.map(p => p.name),
      datasets: [
        {
          data: fivePillars.map(p => p.score),
          backgroundColor: fivePillars.map(p => p.color),
          borderWidth: 0,
          borderRadius: 5,
          spacing: 3
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      cutout: '72%',
      plugins: {
        legend: { display: false },
        tooltip: {
          enabled: true,
          callbacks: {
            label: (context: any) => ` ${context.label}: ${context.raw}%`
          }
        }
      }
    }
  })
}

onMounted(() => {
  if (import.meta.client) {
    nextTick(() => {
      initDonutChart()
    })
    document.addEventListener('click', handleClickOutsideChartDropdowns)
    document.addEventListener('keydown', handleEscapeChartDropdowns)
  }
})

onBeforeUnmount(() => {
  if (donutChartInstance) {
    donutChartInstance.destroy()
    donutChartInstance = null
  }
  if (import.meta.client) {
    document.removeEventListener('click', handleClickOutsideChartDropdowns)
    document.removeEventListener('keydown', handleEscapeChartDropdowns)
  }
})

// Data & Kontrol Pill Dropdowns Tren Untung Bersih (Seragam dengan Pergerakan Uang Toko di Beranda)
const chartTypeDropdownRef = ref<HTMLElement | null>(null)
const periodDropdownRef = ref<HTMLElement | null>(null)
const chartPreviewMode = ref<'area' | 'bar' | 'cashflow'>('area')
const selectedPeriodFilter = ref<'3m' | '6m' | '1y'>('6m')
const isChartTypeDropdownOpen = ref(false)
const isPeriodDropdownOpen = ref(false)

const chartTypeOptions: { id: 'area' | 'bar' | 'cashflow'; label: string }[] = [
  { id: 'area', label: 'Grafik Area' },
  { id: 'bar', label: 'Grafik Batang' },
  { id: 'cashflow', label: 'Arus Kas' }
]

const periodFilterOptions: { id: '3m' | '6m' | '1y'; label: string }[] = [
  { id: '3m', label: '3 Bulan' },
  { id: '6m', label: '6 Bulan' },
  { id: '1y', label: '1 Tahun' }
]

const activeChartTypeLabel = computed(() => {
  return chartTypeOptions.find(o => o.id === chartPreviewMode.value)?.label || 'Grafik Area'
})

const activePeriodLabel = computed(() => {
  return periodFilterOptions.find(o => o.id === selectedPeriodFilter.value)?.label || '6 Bulan'
})

function toggleChartTypeDropdown() {
  isChartTypeDropdownOpen.value = !isChartTypeDropdownOpen.value
  if (isChartTypeDropdownOpen.value) {
    isPeriodDropdownOpen.value = false
  }
}

function togglePeriodDropdown() {
  isPeriodDropdownOpen.value = !isPeriodDropdownOpen.value
  if (isPeriodDropdownOpen.value) {
    isChartTypeDropdownOpen.value = false
  }
}

function selectChartType(mode: 'area' | 'bar' | 'cashflow') {
  chartPreviewMode.value = mode
  isChartTypeDropdownOpen.value = false
}

function selectPeriodFilter(period: '3m' | '6m' | '1y') {
  selectedPeriodFilter.value = period
  isPeriodDropdownOpen.value = false
}

function handleClickOutsideChartDropdowns(event: MouseEvent) {
  const target = event.target as Node
  if (chartTypeDropdownRef.value && !chartTypeDropdownRef.value.contains(target)) {
    isChartTypeDropdownOpen.value = false
  }
  if (periodDropdownRef.value && !periodDropdownRef.value.contains(target)) {
    isPeriodDropdownOpen.value = false
  }
}

function handleEscapeChartDropdowns(event: KeyboardEvent) {
  if (event.key === 'Escape') {
    isChartTypeDropdownOpen.value = false
    isPeriodDropdownOpen.value = false
  }
}

const profitTrendRecords = [
  { month: 'Nov', profit: 19200000, omzet: 68000000, outflow: 48800000 },
  { month: 'Des', profit: 21500000, omzet: 74000000, outflow: 52500000 },
  { month: 'Jan', profit: 22400000, omzet: 76500000, outflow: 54100000 },
  { month: 'Feb', profit: 23800000, omzet: 79000000, outflow: 55200000 },
  { month: 'Mar', profit: 24100000, omzet: 81000000, outflow: 56900000 },
  { month: 'Apr', profit: 25600000, omzet: 83500000, outflow: 57900000 },
  { month: 'Mei', profit: 26400000, omzet: 85000000, outflow: 58600000 },
  { month: 'Jun', profit: 27900000, omzet: 88000000, outflow: 60100000 },
  { month: 'Jul', profit: 29100000, omzet: 90500000, outflow: 61400000 },
  { month: 'Agu', profit: 28000000, omzet: 82000000, outflow: 54000000 },
  { month: 'Sep', profit: 31500000, omzet: 91000000, outflow: 59500000 },
  { month: 'Okt', profit: 32600000, omzet: 100000000, outflow: 67400000 }
]

const filteredProfitTrendRecords = computed(() => {
  if (selectedPeriodFilter.value === '3m') {
    return profitTrendRecords.slice(-3)
  } else if (selectedPeriodFilter.value === '6m') {
    return profitTrendRecords.slice(-6)
  }
  return profitTrendRecords
})

const currentProfitChartCategories = computed(() => {
  if (chartPreviewMode.value === 'cashflow') {
    return ['omzet', 'outflow']
  }
  return ['profit']
})

const currentProfitChartConfig = computed(() => {
  if (chartPreviewMode.value === 'cashflow') {
    return {
      omzet: {
        label: 'Uang Masuk',
        color: '#54DE63'
      },
      outflow: {
        label: 'Uang Keluar',
        color: '#156374'
      }
    }
  }
  return {
    profit: {
      label: 'Untung Bersih',
      color: '#00AA13'
    }
  }
})
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
  border-color: rgba(255, 255, 255, 0.12) !important;
}

.card-tactile-gopay::before,
:deep(.card-tactile-gopay::before) {
  display: none !important;
  box-shadow: none !important;
}
</style>
