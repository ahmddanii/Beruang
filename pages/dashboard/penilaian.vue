<template>
  <div ref="pageRootRef" class="space-y-6 sm:space-y-8 pb-16 font-poppins text-neutral-900 dark:text-neutral-100 select-text">
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
            <span
              v-if="hasAssessment"
              class="px-2 py-0.5 rounded-md text-[11px] font-semibold bg-emerald-50 text-[#00800e] dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-200/80 dark:border-emerald-800/60 shrink-0"
            >
              {{ isDemoUser ? '+5 Poin' : 'Terverifikasi' }}
            </span>
            <span
              v-else
              class="px-2 py-0.5 rounded-md text-[11px] font-semibold bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 border border-neutral-200 dark:border-neutral-700 shrink-0"
            >
              Belum Dievaluasi
            </span>
          </div>

          <div class="mt-3.5 space-y-1">
            <span class="text-xs sm:text-[13px] font-semibold text-neutral-600 dark:text-neutral-400 block font-poppins">
              Indeks Kesehatan Toko
            </span>
            <div class="flex items-baseline gap-1.5 pt-0.5">
              <span class="text-2xl sm:text-3xl font-bold text-neutral-900 dark:text-white tabular-nums tracking-tight leading-none">
                {{ overallHealthScore }}
              </span>
              <span class="text-sm font-semibold text-neutral-400 dark:text-neutral-500">/ 100</span>
            </div>
            <p class="text-[11px] text-neutral-500 dark:text-neutral-400 font-sans pt-1 leading-relaxed">
              {{ hasAssessment ? (isDemoUser ? 'Naik dari 74 poin evaluasi bulan lalu' : 'Skor indeks kesehatan tokomu') : 'Menunggu evaluasi konsultan pendamping' }}
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
            <span
              v-if="hasAssessment"
              class="px-2 py-0.5 rounded-md text-[11px] font-semibold bg-amber-50 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300 border border-amber-200/80 dark:border-amber-800/60 shrink-0"
            >
              {{ passedPillarsPct }}% Lolos
            </span>
            <span
              v-else
              class="px-2 py-0.5 rounded-md text-[11px] font-semibold bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 border border-neutral-200 dark:border-neutral-700 shrink-0"
            >
              0% Lolos
            </span>
          </div>

          <div class="mt-3.5 space-y-1">
            <span class="text-xs sm:text-[13px] font-semibold text-neutral-600 dark:text-neutral-400 block font-poppins">
              Pilar Lulus Standar
            </span>
            <div class="flex items-baseline gap-1.5 pt-0.5">
              <span class="text-2xl sm:text-3xl font-bold text-neutral-900 dark:text-white tabular-nums tracking-tight leading-none">
                {{ passedPillarsCount }} / 5
              </span>
              <span class="text-sm font-semibold text-neutral-400 dark:text-neutral-500">Pilar</span>
            </div>
            <p class="text-[11px] text-neutral-500 dark:text-neutral-400 font-sans pt-1 leading-relaxed">
              {{ hasAssessment ? `${5 - passedPillarsCount} pilar butuh perbaikan terarah` : '5 pilar menunggu evaluasi konsultan' }}
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
                {{ estimatedFundingPlafon }}
              </span>
            </div>
            <p class="text-[11px] text-neutral-500 dark:text-neutral-400 font-sans pt-1 leading-relaxed">
              {{ hasAssessment ? 'Rekomendasi nilai pendanaan bertahap' : 'Dihitung setelah verifikasi laporan kas' }}
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
              {{ isDemoUser ? '+12% MoM' : (Number(currentMarginPercentage) > 0 ? `${currentMarginPercentage}% Margin` : 'Bulan Ini') }}
            </span>
          </div>

          <div class="mt-3.5 space-y-1">
            <span class="text-xs sm:text-[13px] font-semibold text-neutral-600 dark:text-neutral-400 block font-poppins">
              Pergerakan Untung Bersih
            </span>
            <div class="flex items-baseline gap-1.5 pt-0.5">
              <span class="text-2xl sm:text-3xl font-bold text-neutral-900 dark:text-white tabular-nums tracking-tight leading-none">
                {{ currentNetProfitDisplay }}
              </span>
            </div>
            <p class="text-[11px] text-neutral-500 dark:text-neutral-400 font-sans pt-1 leading-relaxed">
              {{ Number(currentMarginPercentage) > 0 ? `Margin untung ${currentMarginPercentage}% terjaga` : 'Catat kas harian untuk menghitung margin' }}
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- ========================================================================= -->
    <!-- 3. BARIS 2: EVALUASI KELAYAKAN 5 PILAR TOKO                               -->
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

        <!-- Banner Panduan untuk Akun Baru yang Belum Memiliki Penilaian Resmi -->
        <div
          v-if="!hasAssessment"
          class="mt-5 p-4 rounded-xl bg-[#F3F8FC] dark:bg-[#156374]/15 border border-[#156374]/25 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3.5"
        >
          <div class="flex items-start gap-3 min-w-0">
            <div class="w-8 h-8 rounded-lg bg-[#156374] text-white flex items-center justify-center shrink-0 mt-0.5">
              <HugeiconsIcon :icon="Alert01Icon" :size="18" />
            </div>
            <div class="space-y-0.5 min-w-0">
              <h4 class="text-xs sm:text-sm font-bold text-neutral-900 dark:text-white">
                Toko Belum Memiliki Evaluasi Kesehatan Resmi
              </h4>
              <p class="text-xs text-neutral-600 dark:text-neutral-300 leading-relaxed font-sans">
                Skor 5 pilar akan dinilai dan divalidasi langsung oleh konsultan pendamping tokomu setelah pembukuan kas tercatat rutin.
              </p>
            </div>
          </div>
          <div class="flex items-center gap-2 shrink-0 w-full sm:w-auto">
            <BActionButton
              variant="green"
              :huge-icon="Comment01Icon"
              to="/dashboard/pesan"
              custom-class="w-full sm:w-auto px-4 py-2 text-xs font-semibold justify-center"
            >
              Mulai Konsultasi
            </BActionButton>
          </div>
        </div>

        <!-- Bagian Donut Chart Kelayakan 5 Pilar -->
        <div class="pt-5 pb-5 border-b border-neutral-100 dark:border-neutral-800/80">
          <div class="flex flex-col sm:flex-row items-center gap-6 sm:gap-8">
            <!-- Donut Chart Canvas Container with Center Grade Indicator -->
            <div class="relative w-36 h-36 sm:w-44 sm:h-44 shrink-0 flex items-center justify-center">
              <canvas ref="donutCanvas" class="w-full h-full"></canvas>
              <div class="absolute inset-0 flex flex-col items-center justify-center pointer-events-none select-none">
                <span class="text-3xl font-bold font-poppins text-neutral-900 dark:text-white tabular-nums leading-none">
                  {{ overallHealthScore }}%
                </span>
                <span class="text-xs font-semibold text-[#00800e] dark:text-emerald-400 mt-1">
                  {{ overallGrade }}
                </span>
              </div>
            </div>

            <!-- Donut Chart Legend & Summary -->
            <div class="flex-1 space-y-3 text-center sm:text-left min-w-0">
              <div v-if="hasAssessment" class="space-y-1">
                <div class="flex items-center justify-center sm:justify-start gap-2 flex-wrap">
                  <h3 class="text-base sm:text-lg font-bold text-neutral-900 dark:text-white">
                    {{ overallHealthScore >= 80 ? 'Status: Layak Pemodal' : 'Status: Layak Bersyarat' }}
                  </h3>
                  <span class="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 text-[#00800e] dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-200/80 dark:border-emerald-800/60">
                    {{ overallHealthScore >= 80 ? 'Lolos Penuh' : 'Dikit Lagi Lolos Penuh' }}
                  </span>
                </div>
                <p class="text-xs sm:text-[13px] text-neutral-600 dark:text-neutral-300 leading-relaxed font-sans max-w-2xl">
                  Skor tokomu saat ini <strong>{{ overallHealthScore }}%</strong> dengan {{ passedPillarsCount }} pilar telah memenuhi target pemodal.
                </p>
              </div>
              <div v-else class="space-y-1">
                <div class="flex items-center justify-center sm:justify-start gap-2 flex-wrap">
                  <h3 class="text-base sm:text-lg font-bold text-neutral-900 dark:text-white">
                    Status: Belum Dievaluasi
                  </h3>
                  <span class="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-amber-50 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300 border border-amber-200/80 dark:border-amber-800/60">
                    Perlu Konsultasi
                  </span>
                </div>
                <p class="text-xs sm:text-[13px] text-neutral-600 dark:text-neutral-300 leading-relaxed font-sans max-w-2xl">
                  Toko Anda belum memiliki evaluasi resmi dari konsultan pendamping. Catat kas tokomu secara rutin dan diskusikan bersama konsultan untuk mengaktifkan penilaian kelayakan modal.
                </p>
              </div>

              <!-- Status Legend Badges -->
              <div class="flex items-center justify-center sm:justify-start gap-2.5 pt-1 flex-wrap">
                <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-semibold bg-emerald-50 dark:bg-emerald-950/60 text-[#00800e] dark:text-emerald-300 border border-emerald-200/80 dark:border-emerald-800/60">
                  <span class="w-2 h-2 rounded-full bg-[#00800e]" />
                  <span>{{ passedPillarsCount }} Pilar Lolos Standar</span>
                </span>
                <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-semibold bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border border-amber-200/80 dark:border-amber-800/60">
                  <span class="w-2 h-2 rounded-full bg-[#D97706]" />
                  <span>{{ 5 - passedPillarsCount }} Pilar Perlu Penguatan</span>
                </span>
              </div>
            </div>
          </div>
        </div>

        <!-- 5 Baris Pilar Kesiapan Bisnis -->
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
                  v-if="pillar.score >= pillar.targetScore && pillar.score > 0"
                  class="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 text-[#00800e] border border-emerald-200 dark:bg-emerald-950/80 dark:text-emerald-300 dark:border-emerald-800"
                >
                  Lolos Standar
                </span>
                <span
                  v-else-if="pillar.score > 0"
                  class="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-amber-50 text-amber-700 border border-amber-200 dark:bg-amber-950/80 dark:text-amber-300 dark:border-amber-800"
                >
                  Perlu Aksi
                </span>
                <span
                  v-else
                  class="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-neutral-100 text-neutral-600 border border-neutral-200 dark:bg-neutral-800 dark:text-neutral-400 dark:border-neutral-700"
                >
                  Belum Dinilai
                </span>
              </div>
            </div>

            <!-- Baris Bawah: Horizontal Progress Bar dengan Penanda Target Pemodal -->
            <div class="relative w-full h-2 rounded-full bg-neutral-100 dark:bg-neutral-800 overflow-visible mt-3">
              <div
                class="gsap-pillar-bar h-full rounded-full transition-all duration-300"
                :style="{
                  width: `${pillar.score}%`,
                  backgroundColor: pillar.score >= pillar.targetScore && pillar.score > 0 ? '#00800e' : (pillar.score > 0 ? '#D97706' : '#94A3B8')
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
        <span class="font-semibold text-neutral-800 dark:text-neutral-200">{{ passedPillarsCount }} dari 5 Lolos ({{ passedPillarsPct }}%)</span>
      </div>
    </div>

    <!-- ========================================================================= -->
    <!-- 4. BARIS 3: BENTO 2 KOLOM (Kesiapan Berkas Legalitas & Ringkasan Keuangan)   -->
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
              <span>Buka Profil Usaha</span>
              <HugeiconsIcon :icon="ArrowRight01Icon" :size="14" />
            </NuxtLink>
          </div>

          <!-- 4 Kartu Berkas Legalitas -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3">
            <!-- NIB Usaha -->
            <div class="p-3.5 rounded-xl border border-neutral-200/90 dark:border-neutral-800 bg-white dark:bg-[#15161A] flex items-center justify-between gap-3">
              <div class="flex items-start gap-2.5 min-w-0">
                <div :class="[umkmStore.profile.nib || isDemoUser ? 'bg-emerald-50 dark:bg-emerald-950/40 text-[#00800e]' : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-400']" class="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5">
                  <HugeiconsIcon :icon="ShieldCheckIcon" :size="17" />
                </div>
                <div class="min-w-0">
                  <h5 class="text-xs sm:text-[13px] font-semibold text-neutral-900 dark:text-white truncate">
                    NIB Usaha
                  </h5>
                  <p class="text-[11px] text-neutral-500 dark:text-neutral-400 truncate mt-0.5">
                    {{ legalNibDisplay }}
                  </p>
                </div>
              </div>
              <span :class="[umkmStore.profile.nib || isDemoUser ? 'bg-emerald-50 text-[#00800e] dark:bg-emerald-950/60 dark:text-emerald-300 border-emerald-200/80' : 'bg-neutral-100 text-neutral-600 dark:bg-neutral-800 dark:text-neutral-400 border-neutral-200']" class="px-2 py-0.5 rounded-full text-[10px] font-semibold border shrink-0">
                {{ umkmStore.profile.nib || isDemoUser ? 'Lengkap' : 'Belum Ada' }}
              </span>
            </div>

            <!-- NPWP Toko -->
            <div class="p-3.5 rounded-xl border border-neutral-200/90 dark:border-neutral-800 bg-white dark:bg-[#15161A] flex items-center justify-between gap-3">
              <div class="flex items-start gap-2.5 min-w-0">
                <div :class="[umkmStore.profile.npwp || isDemoUser ? 'bg-emerald-50 dark:bg-emerald-950/40 text-[#00800e]' : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-400']" class="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5">
                  <HugeiconsIcon :icon="ShieldCheckIcon" :size="17" />
                </div>
                <div class="min-w-0">
                  <h5 class="text-xs sm:text-[13px] font-semibold text-neutral-900 dark:text-white truncate">
                    NPWP Toko
                  </h5>
                  <p class="text-[11px] text-neutral-500 dark:text-neutral-400 truncate mt-0.5">
                    {{ legalNpwpDisplay }}
                  </p>
                </div>
              </div>
              <span :class="[umkmStore.profile.npwp || isDemoUser ? 'bg-emerald-50 text-[#00800e] dark:bg-emerald-950/60 dark:text-emerald-300 border-emerald-200/80' : 'bg-neutral-100 text-neutral-600 dark:bg-neutral-800 dark:text-neutral-400 border-neutral-200']" class="px-2 py-0.5 rounded-full text-[10px] font-semibold border shrink-0">
                {{ umkmStore.profile.npwp || isDemoUser ? 'Lengkap' : 'Belum Ada' }}
              </span>
            </div>

            <!-- Rekening Khusus -->
            <div class="p-3.5 rounded-xl border border-neutral-200/90 dark:border-neutral-800 bg-white dark:bg-[#15161A] flex items-center justify-between gap-3">
              <div class="flex items-start gap-2.5 min-w-0">
                <div :class="[umkmStore.profile.bankAccountNumber || isDemoUser ? 'bg-emerald-50 dark:bg-emerald-950/40 text-[#00800e]' : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-400']" class="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5">
                  <HugeiconsIcon :icon="ShieldCheckIcon" :size="17" />
                </div>
                <div class="min-w-0">
                  <h5 class="text-xs sm:text-[13px] font-semibold text-neutral-900 dark:text-white truncate">
                    Rekening Khusus
                  </h5>
                  <p class="text-[11px] text-neutral-500 dark:text-neutral-400 truncate mt-0.5">
                    {{ legalBankAccountDisplay }}
                  </p>
                </div>
              </div>
              <span :class="[umkmStore.profile.bankAccountNumber || isDemoUser ? 'bg-emerald-50 text-[#00800e] dark:bg-emerald-950/60 dark:text-emerald-300 border-emerald-200/80' : 'bg-neutral-100 text-neutral-600 dark:bg-neutral-800 dark:text-neutral-400 border-neutral-200']" class="px-2 py-0.5 rounded-full text-[10px] font-semibold border shrink-0">
                {{ umkmStore.profile.bankAccountNumber || isDemoUser ? 'Lengkap' : 'Belum Ada' }}
              </span>
            </div>

            <!-- Bukti Nota Transaksi -->
            <div class="p-3.5 rounded-xl border border-neutral-200/90 dark:border-neutral-800 bg-white dark:bg-[#15161A] flex items-center justify-between gap-3">
              <div class="flex items-start gap-2.5 min-w-0">
                <div :class="[umkmStore.dailyTransactions.length > 0 || isDemoUser ? 'bg-emerald-50 dark:bg-emerald-950/40 text-[#00800e]' : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-400']" class="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5">
                  <HugeiconsIcon :icon="FileValidationIcon" :size="17" />
                </div>
                <div class="min-w-0">
                  <h5 class="text-xs sm:text-[13px] font-semibold text-neutral-900 dark:text-white truncate">
                    Bukti Nota Transaksi
                  </h5>
                  <p class="text-[11px] text-neutral-500 dark:text-neutral-400 truncate mt-0.5">
                    {{ legalReceiptDisplay }}
                  </p>
                </div>
              </div>
              <span :class="[(umkmStore.dailyTransactions.length >= 10) || isDemoUser ? 'bg-emerald-50 text-[#00800e] border-emerald-200/80' : 'bg-amber-50 text-amber-700 border-amber-200']" class="px-2 py-0.5 rounded-full text-[10px] font-semibold border shrink-0">
                {{ (umkmStore.dailyTransactions.length >= 10) || isDemoUser ? 'Lengkap' : (umkmStore.dailyTransactions.length > 0 ? 'Perlu Aksi' : 'Belum Ada') }}
              </span>
            </div>
          </div>
        </div>

        <div class="pt-3 border-t border-neutral-100 dark:border-neutral-800 text-[11px] text-neutral-500 dark:text-neutral-400 flex items-center justify-between">
          <span>{{ validLegalCount }} dari 4 berkas tervalidasi sah.</span>
          <span class="font-semibold text-[#00800e] dark:text-emerald-400">Tingkat Kepatuhan: {{ validLegalPct }}%</span>
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
              <span>Margin Untung: {{ currentMarginPercentage }}%</span>
            </span>
          </div>

          <!-- Grid 3 Kartu Finansial Baku Beruang -->
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3">
            <!-- Total Pendapatan -->
            <div class="p-3.5 rounded-xl bg-white dark:bg-[#15161A] border border-neutral-200/90 dark:border-neutral-800 flex flex-col justify-between">
              <span class="text-[11px] text-neutral-500 dark:text-neutral-400 font-medium">Total Pendapatan</span>
              <div class="font-bold text-base text-neutral-900 dark:text-white tabular-nums pt-1">
                {{ displayTotalIncome }}
              </div>
              <span class="text-[10px] text-neutral-400 font-sans pt-0.5">Uang masuk kotor</span>
            </div>

            <!-- Modal Jualan -->
            <div class="p-3.5 rounded-xl bg-white dark:bg-[#15161A] border border-neutral-200/90 dark:border-neutral-800 flex flex-col justify-between">
              <span class="text-[11px] text-neutral-500 dark:text-neutral-400 font-medium">Modal Jualan</span>
              <div class="font-bold text-base text-neutral-800 dark:text-neutral-200 tabular-nums pt-1">
                {{ displayTotalCogs }}
              </div>
              <span class="text-[10px] text-emerald-600 font-sans pt-0.5">Biaya produksi</span>
            </div>

            <!-- Untung Bersih -->
            <div class="p-3.5 rounded-xl bg-emerald-50/70 dark:bg-emerald-950/40 border border-emerald-200/80 dark:border-emerald-800 flex flex-col justify-between">
              <span class="text-[11px] font-semibold text-emerald-800 dark:text-emerald-300">Untung Bersih</span>
              <div class="font-bold text-base text-[#00800e] dark:text-emerald-400 tabular-nums pt-1">
                {{ displayNetProfit }}
              </div>
              <span class="text-[10px] text-emerald-700 dark:text-emerald-400 font-sans pt-0.5">Sisa kas bersih</span>
            </div>
          </div>
        </div>

        <div class="pt-3 border-t border-neutral-100 dark:border-neutral-800 text-[11px] text-neutral-500 dark:text-neutral-400 flex items-center justify-between">
          <span>{{ hasAssessment ? (isDemoUser ? 'Laporan kas terverifikasi oleh Konsultan Pendamping Dra. Maya Suryani, M.M.' : 'Laporan kas dievaluasi berkala oleh konsultan tokomu.') : 'Mulai catat kas harianmu agar dapat divalidasi oleh konsultan pendamping.' }}</span>
          <span class="font-semibold text-neutral-800 dark:text-neutral-200">Arus Kas: {{ hasAssessment ? 'Sehat' : 'Awal' }}</span>
        </div>
      </div>
    </div>

    <!-- ========================================================================= -->
    <!-- 5. BARIS 4: TREN UNTUNG BERSIH                                            -->
    <!-- ========================================================================= -->
    <div class="card-tactile-gopay rounded-[18px] p-6 sm:p-8 bg-white dark:bg-[#13161F] border border-[#E2E8F0] dark:border-neutral-800 font-poppins space-y-9 sm:space-y-11 w-full">
      <!-- Header: Title, Subtitle, and Right Actions -->
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
          <!-- 1. Dropdown Jenis Grafik -->
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

          <!-- 2. Dropdown Filter Periode -->
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
      <div v-if="filteredProfitTrendRecords.length > 0" class="relative w-full h-64 sm:h-72 pt-6 sm:pt-8">
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
      <div v-else class="py-12 text-center flex flex-col items-center justify-center space-y-2">
        <HugeiconsIcon :icon="AnalyticsUpIcon" :size="32" class="text-neutral-400 dark:text-neutral-500" />
        <p class="text-sm font-semibold text-neutral-800 dark:text-neutral-200">Belum Ada Riwayat Finansial</p>
        <p class="text-xs text-neutral-500 dark:text-neutral-400 max-w-sm">Grafik tren untung bersih akan terbentuk otomatis setelah kamu mencatat transaksi kas harian.</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, onBeforeUnmount, nextTick } from 'vue'
import { gsap } from 'gsap'
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
  FileValidationIcon,
  Alert01Icon
} from '@hugeicons/core-free-icons'
import { useAuthStore } from '~/stores/auth'
import { useUmkmStore } from '~/stores/umkm'

definePageMeta({
  layout: 'dashboard',
  hideHeader: true
})

const authStore = useAuthStore()
const umkmStore = useUmkmStore()

const isDemoUser = computed(() => {
  const email = authStore.currentUser?.email?.toLowerCase() || ''
  return email === 'fikri@kopisenja.id' || authStore.isDemoUser
})

const hasAssessment = computed(() => {
  if (isDemoUser.value) return true
  return umkmStore.hasAssessment || (umkmStore.overallHealthScore > 0)
})

// Metric 1: Indeks Kesehatan Toko
const overallHealthScore = computed(() => {
  if (isDemoUser.value) return 79
  return umkmStore.overallHealthScore || 0
})

const overallGrade = computed(() => {
  const s = overallHealthScore.value
  if (s === 0) return 'Grade -'
  if (s >= 85) return 'Grade A'
  if (s >= 75) return 'Grade B+'
  if (s >= 65) return 'Grade B'
  if (s >= 50) return 'Grade C'
  return 'Grade D'
})

// 5 Aspek Fundamental Kesiapan Bisnis Toko
const basePillars = [
  {
    id: 'fin',
    name: 'Keuangan & Pergerakan Uang',
    description: 'Pemisahan rekening pribadi dengan kas toko dan disiplin pencatatan transaksi',
    targetScore: 85,
    color: '#156374'
  },
  {
    id: 'ops',
    name: 'Operasional & Standar Kerja',
    description: 'Kerapian stok bahan baku, resep standar penyajian, dan efisiensi sisa bahan',
    targetScore: 80,
    color: '#00800e'
  },
  {
    id: 'mkt',
    name: 'Pasar & Pemasaran',
    description: 'Jumlah pelanggan setia, frekuensi pesanan berulang, dan penjualan langsung',
    targetScore: 75,
    color: '#2563EB'
  },
  {
    id: 'leg',
    name: 'Legalitas & Izin Usaha',
    description: 'Kelengkapan dokumen resmi NIB OSS RBA, NPWP toko, dan sertifikat halal',
    targetScore: 90,
    color: '#6366F1'
  },
  {
    id: 'gov',
    name: 'Tim & Pembagian Tugas',
    description: 'Kejelasan peran Store Leader, jadwal shift kerja, dan evaluasi hasil tim',
    targetScore: 80,
    color: '#D97706'
  }
]

const demoScores: Record<string, number> = {
  fin: 78,
  ops: 85,
  mkt: 64,
  leg: 92,
  gov: 75
}

const fivePillars = computed(() => {
  return basePillars.map(p => {
    let score = 0
    if (isDemoUser.value) {
      score = demoScores[p.id] || 0
    } else {
      const match = umkmStore.assessmentAspects.find(a => a.id === p.id)
      score = match ? match.score : 0
    }
    return {
      ...p,
      score
    }
  })
})

const passedPillarsCount = computed(() => {
  return fivePillars.value.filter(p => p.score >= p.targetScore && p.score > 0).length
})

const passedPillarsPct = computed(() => {
  return Math.round((passedPillarsCount.value / 5) * 100)
})

// Metric 3: Estimasi Plafon Modal
const estimatedFundingPlafon = computed(() => {
  if (isDemoUser.value) return 'Rp 250 Jt'
  if (umkmStore.profile.fundingTarget && umkmStore.profile.fundingTarget > 0) {
    const val = umkmStore.profile.fundingTarget
    if (val >= 1000000000) return `Rp ${(val / 1000000000).toFixed(1).replace('.0', '')} M`
    if (val >= 1000000) return `Rp ${(val / 1000000).toFixed(0)} Jt`
    return `Rp ${val.toLocaleString('id-ID')}`
  }
  return 'Belum Ditentukan'
})

// Metric 4: Pergerakan Untung Bersih & Margin
const currentNetProfitDisplay = computed(() => {
  if (isDemoUser.value && umkmStore.financeSummary.netProfitMonth === 0) return 'Rp 32,6 Jt'
  const val = umkmStore.financeSummary.netProfitMonth || 0
  if (val === 0) return 'Rp 0'
  if (Math.abs(val) >= 1000000000) return `Rp ${(val / 1000000000).toFixed(1).replace('.0', '')} M`
  if (Math.abs(val) >= 1000000) return `Rp ${(val / 1000000).toFixed(1).replace('.', ',')} Jt`
  return `Rp ${val.toLocaleString('id-ID')}`
})

const currentMarginPercentage = computed(() => {
  if (isDemoUser.value && umkmStore.financeSummary.marginPercentage === 0) return '32.6'
  return umkmStore.financeSummary.marginPercentage ? umkmStore.financeSummary.marginPercentage.toFixed(1) : '0.0'
})

// Bento 1: Legalitas Items
const legalNibDisplay = computed(() => {
  if (isDemoUser.value) return 'No. 1209.2831.0091 • OSS'
  return umkmStore.profile.nib ? `No. ${umkmStore.profile.nib} • OSS` : 'Belum Ditambahkan'
})

const legalNpwpDisplay = computed(() => {
  if (isDemoUser.value) return 'No. 82.910.455.2 • Taat'
  return umkmStore.profile.npwp ? `No. ${umkmStore.profile.npwp} • Taat` : 'Belum Ditambahkan'
})

const legalBankAccountDisplay = computed(() => {
  if (isDemoUser.value) return 'Giro Mandiri 142-00-19283'
  if (umkmStore.profile.bankAccountNumber) {
    return `${umkmStore.profile.bankName || 'Rekening'} ${umkmStore.profile.bankAccountNumber}`
  }
  return 'Belum Terhubung'
})

const legalReceiptDisplay = computed(() => {
  if (isDemoUser.value) return 'Arsip 30 Hari • 80% Terarsip'
  const count = umkmStore.dailyTransactions.length
  return count > 0 ? `${count} Transaksi Tercatat` : 'Belum Ada Transaksi'
})

const validLegalCount = computed(() => {
  if (isDemoUser.value) return 3
  let count = 0
  if (umkmStore.profile.nib) count++
  if (umkmStore.profile.npwp) count++
  if (umkmStore.profile.bankAccountNumber) count++
  if (umkmStore.dailyTransactions.length >= 5) count++
  return count
})

const validLegalPct = computed(() => {
  return Math.round((validLegalCount.value / 4) * 100)
})

// Bento 2: Financial 30 Days Summary
function formatShortIdr(amount: number): string {
  if (!amount || amount === 0) return 'Rp 0'
  if (Math.abs(amount) >= 1000000000) return `Rp ${(amount / 1000000000).toFixed(1).replace('.0', '')} M`
  if (Math.abs(amount) >= 1000000) return `Rp ${(amount / 1000000).toFixed(1).replace('.', ',')} Jt`
  return `Rp ${amount.toLocaleString('id-ID')}`
}

const displayTotalIncome = computed(() => {
  if (isDemoUser.value && umkmStore.financeSummary.totalIncomeMonth === 0) return 'Rp 100 Jt'
  return formatShortIdr(umkmStore.financeSummary.totalIncomeMonth)
})

const displayTotalCogs = computed(() => {
  if (isDemoUser.value && umkmStore.financeSummary.totalCogsMonth === 0) return 'Rp 45,1 Jt'
  return formatShortIdr(umkmStore.financeSummary.totalCogsMonth)
})

const displayNetProfit = computed(() => {
  if (isDemoUser.value && umkmStore.financeSummary.netProfitMonth === 0) return 'Rp 32,6 Jt'
  return formatShortIdr(umkmStore.financeSummary.netProfitMonth)
})

// Donut Chart Instance for 5 Pillars
const pageRootRef = ref<HTMLElement | null>(null)
const donutCanvas = ref<HTMLCanvasElement | null>(null)
let donutChartInstance: any = null
let gsapCtx: gsap.Context | null = null

function initDonutChart() {
  if (!donutCanvas.value) return
  if (donutChartInstance) {
    donutChartInstance.destroy()
    donutChartInstance = null
  }

  const scores = fivePillars.value.map(p => p.score)
  const isZero = scores.every(s => s === 0)
  const isDark = typeof document !== 'undefined' && document.documentElement.classList.contains('dark')
  const neutralColor = isDark ? '#262626' : '#E2E8F0'

  donutChartInstance = new Chart(donutCanvas.value, {
    type: 'doughnut',
    data: {
      labels: isZero ? ['Belum Dinilai'] : fivePillars.value.map(p => p.name),
      datasets: [
        {
          data: isZero ? [1] : scores,
          backgroundColor: isZero ? [neutralColor] : fivePillars.value.map(p => p.color),
          borderWidth: 0,
          borderRadius: isZero ? 0 : 5,
          spacing: isZero ? 0 : 3
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      cutout: '72%',
      animation: {
        animateRotate: true,
        animateScale: true,
        duration: 600
      },
      plugins: {
        legend: { display: false },
        tooltip: {
          enabled: !isZero,
          callbacks: {
            label: (context: any) => ` ${context.label}: ${context.raw}%`
          }
        }
      }
    }
  })
}

watch(fivePillars, () => {
  nextTick(() => {
    initDonutChart()
  })
}, { deep: true })

onMounted(async () => {
  await umkmStore.fetchDashboardData()
  if (import.meta.client) {
    nextTick(() => {
      initDonutChart()
      if (pageRootRef.value && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        gsapCtx = gsap.context(() => {
          gsap.from('.card-tactile-gopay', {
            opacity: 0,
            y: 14,
            duration: 0.42,
            stagger: 0.05,
            ease: 'power2.out',
            clearProps: 'all'
          })
          gsap.from('.gsap-pillar-bar', {
            scaleX: 0,
            transformOrigin: 'left center',
            duration: 0.65,
            stagger: 0.06,
            ease: 'power3.out',
            delay: 0.12,
            clearProps: 'transform'
          })
        }, pageRootRef.value)
      }
    })
    document.addEventListener('click', handleClickOutsideChartDropdowns)
    document.addEventListener('keydown', handleEscapeChartDropdowns)
  }
})

onBeforeUnmount(() => {
  if (gsapCtx) {
    gsapCtx.revert()
    gsapCtx = null
  }
  if (donutChartInstance) {
    donutChartInstance.destroy()
    donutChartInstance = null
  }
  if (import.meta.client) {
    document.removeEventListener('click', handleClickOutsideChartDropdowns)
    document.removeEventListener('keydown', handleEscapeChartDropdowns)
  }
})

// Data & Kontrol Pill Dropdowns Tren Untung Bersih
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

const profitTrendRecords = computed(() => {
  if (isDemoUser.value) {
    return [
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
  }
  return (umkmStore.monthlyRecords || []).map(r => ({
    month: r.month.slice(0, 3),
    profit: r.netProfit || 0,
    omzet: r.omzet || 0,
    outflow: (r.hpp || 0) + (r.opex || 0)
  }))
})

const filteredProfitTrendRecords = computed(() => {
  const records = profitTrendRecords.value
  if (selectedPeriodFilter.value === '3m') {
    return records.slice(-3)
  } else if (selectedPeriodFilter.value === '6m') {
    return records.slice(-6)
  }
  return records
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
