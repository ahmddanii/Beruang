<template>
  <div class="space-y-6 pb-20 font-sans text-neutral-900 dark:text-neutral-100">


    <!-- Editorial Greeting (Clean Apple Typography & Warm Encouragement) -->
    <header class="space-y-3 sm:space-y-4 pt-2 sm:pt-4 pb-2 sm:pb-4 lg:pb-6">
      <h1 class="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-neutral-900 dark:text-white tracking-tight leading-tight">
        {{ greetingTime }}, {{ ownerFirstName }} 👋
      </h1>
      <p class="text-sm sm:text-base text-neutral-600 dark:text-neutral-300 font-sans leading-relaxed">
        {{ currentMotivationalPhrase }}
      </p>
    </header>

    <!-- 1. Top KPI Stat Cards (Clean 3-Column Layout: Wallet, Receipt, Kesiapan Modal) -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2 sm:pt-4 items-stretch">
      <!-- Card 1: Saldo Kas Dana (The Wallet) -->
      <BWalletCard
        label="Saldo Kas Toko"
        value="Rp 75.500.000"
        to="/dashboard/progres"
      />

      <!-- Card 2: Laba Bersih Bulan Ini (Sesuai Sketsa: Upward Wave Curve & Margin Up 32%) -->
      <BReceiptCard
        label="Laba Bersih Bulan Ini"
        value="Rp 32.600.000"
        badge-text="Margin Up 32%"
      />

      <!-- Card 3: Kesiapan Modal -->
      <BShieldCard
        label="Kesiapan Modal"
        to="/dashboard/penilaian"
      />
    </div>

    <!-- 2. Interactive Cash Breakdown Telemetry & Growth Simulation -->
    <div class="bg-white dark:bg-[#15161A] border border-neutral-200/90 dark:border-neutral-800 rounded-2xl p-5 sm:p-7 space-y-6">
      <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-neutral-100 dark:border-neutral-800/80">
        <div>
          <h2 class="text-xl sm:text-2xl font-heading font-bold text-neutral-900 dark:text-white tracking-tight">
            Kemana Saja Aliran Uang Penjualan Toko?
          </h2>
          <p class="text-sm text-neutral-600 dark:text-neutral-300 mt-1 font-sans leading-relaxed">
            Melihat pembagian biaya bahan baku, sewa & gaji, serta laba bersih tanpa rumus akuntansi yang rumit.
          </p>
        </div>

        <!-- Pill Tabs Selector (Clean Apple Pill Controls) -->
        <BPillTabs
          v-model="activeBreakdownTab"
          :tabs="breakdownTabs"
        />
      </div>

      <!-- Segmented Bar Visualization -->
      <div class="space-y-5">
        <div class="w-full h-11 sm:h-12 rounded-xl overflow-hidden flex bg-neutral-100 dark:bg-neutral-800/80 p-1 gap-1">
          <!-- Segment 1: Bahan Baku (45.1%) -->
          <div
            class="h-full rounded-lg bg-amber-500 text-white flex items-center justify-between px-3.5 text-xs sm:text-sm font-sans font-semibold transition-all duration-300"
            :style="{ width: calculatedHppPercent + '%' }"
            :title="`Bahan Baku: ${calculatedHppPercent}%`"
          >
            <span class="truncate">Bahan Baku</span>
            <span class="font-mono text-xs font-bold">{{ calculatedHppPercent }}%</span>
          </div>

          <!-- Segment 2: Gaji & Sewa (22.3%) -->
          <div
            class="h-full rounded-lg bg-blue-600 text-white flex items-center justify-between px-3.5 text-xs sm:text-sm font-sans font-semibold transition-all duration-300"
            :style="{ width: calculatedOpexPercent + '%' }"
            :title="`Gaji & Sewa: ${calculatedOpexPercent}%`"
          >
            <span class="truncate">Gaji & Sewa</span>
            <span class="font-mono text-xs font-bold">{{ calculatedOpexPercent }}%</span>
          </div>

          <!-- Segment 3: Uang Bersih (32.6%) -->
          <div
            class="h-full rounded-lg bg-emerald-600 text-white flex items-center justify-between px-3.5 text-xs sm:text-sm font-sans font-semibold transition-all duration-300"
            :style="{ width: calculatedProfitPercent + '%' }"
            :title="`Uang Bersih: ${calculatedProfitPercent}%`"
          >
            <span class="truncate">Uang Bersih</span>
            <span class="font-mono text-xs font-bold">{{ calculatedProfitPercent }}%</span>
          </div>
        </div>

        <!-- Simulator Interactive Controller -->
        <div
          v-if="activeBreakdownTab === 'simulator'"
          class="p-5 sm:p-6 rounded-2xl bg-neutral-50 dark:bg-neutral-800/50 border border-neutral-200/80 dark:border-neutral-700/80 space-y-4 animate-in fade-in duration-150"
        >
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <span class="text-sm sm:text-base font-heading font-bold text-neutral-900 dark:text-neutral-100 block">
                Geser untuk Simulasi Target Omzet Usahamu:
              </span>
              <span class="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 font-sans mt-0.5 block">
                Lihat langsung perkiraan uang bersih yang bisa kamu tabung untuk buka cabang baru.
              </span>
            </div>
            <div class="text-left sm:text-right">
              <span class="text-xs font-semibold text-neutral-600 dark:text-neutral-400 font-sans uppercase tracking-wider">Target Omzet</span>
              <span class="text-xl sm:text-2xl font-heading font-bold text-primary-600 dark:text-primary-400 font-mono tabular-nums block mt-0.5">
                Rp {{ simulatedOmzet.toLocaleString('id-ID') }}
              </span>
            </div>
          </div>

          <div class="space-y-1.5">
            <input
              v-model.number="simulatedOmzet"
              type="range"
              min="50000000"
              max="200000000"
              step="5000000"
              class="w-full h-2.5 bg-neutral-200 dark:bg-neutral-700 rounded-lg appearance-none cursor-pointer accent-primary-500"
            />
            <div class="flex justify-between text-xs font-mono font-semibold text-neutral-600 dark:text-neutral-400 pt-1">
              <span>Rp 50 Jt</span>
              <span class="text-primary-600 dark:text-primary-400 font-bold">Rp 100 Jt (Saat ini)</span>
              <span>Rp 150 Jt</span>
              <span>Rp 200 Jt</span>
            </div>
          </div>

          <div class="p-4 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-700 text-sm text-neutral-800 dark:text-neutral-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
            <span>
              Perkiraan uang bersih yang kamu terima: <strong class="text-emerald-600 dark:text-emerald-400 font-mono font-bold text-base">Rp {{ simulatedProfit.toLocaleString('id-ID') }}</strong> / bulan.
            </span>
            <span class="text-xs font-semibold text-emerald-800 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 px-3 py-1 rounded-full border border-emerald-200/80 shrink-0">
              Bisa Biayai Cabang 4
            </span>
          </div>
        </div>

        <!-- 3 Simple Explanation Stroke Cards -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-3.5 pt-1">
          <!-- 1: Bahan Baku -->
          <div class="p-4 sm:p-5 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200/90 dark:border-neutral-800 space-y-2">
            <div class="flex items-center justify-between text-sm sm:text-base">
              <span class="font-heading font-bold text-amber-800 dark:text-amber-400">
                1. Belanja Bahan Baku
              </span>
              <span class="font-mono font-bold text-neutral-900 dark:text-white tabular-nums">
                {{ formatDisplayedAmount(calculatedHppAmount) }}
              </span>
            </div>
            <p class="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed font-sans">
              Biji kopi Temanggung, susu murni, gula aren, cup & sedotan.
            </p>
            <div class="pt-2.5 border-t border-neutral-100 dark:border-neutral-800/80 flex items-center justify-between text-xs sm:text-sm">
              <span class="text-neutral-600 dark:text-neutral-400 font-sans font-medium">Kondisi:</span>
              <span class="font-semibold text-emerald-600 dark:text-emerald-400">Sangat Hemat (&lt; 50%)</span>
            </div>
          </div>

          <!-- 2: Gaji & Sewa -->
          <div class="p-4 sm:p-5 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200/90 dark:border-neutral-800 space-y-2">
            <div class="flex items-center justify-between text-sm sm:text-base">
              <span class="font-heading font-bold text-primary-700 dark:text-primary-400">
                2. Gaji Karyawan & Sewa
              </span>
              <span class="font-mono font-bold text-neutral-900 dark:text-white tabular-nums">
                {{ formatDisplayedAmount(calculatedOpexAmount) }}
              </span>
            </div>
            <p class="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed font-sans">
              Gaji 6 barista di 3 kedai, sewa ruko, listrik, air, dan koneksi internet POS.
            </p>
            <div class="pt-2.5 border-t border-neutral-100 dark:border-neutral-800/80 flex items-center justify-between text-xs sm:text-sm">
              <span class="text-neutral-600 dark:text-neutral-400 font-sans font-medium">Efisiensi:</span>
              <span class="font-semibold text-blue-600 dark:text-blue-400">Wajar & Sehat (22.3%)</span>
            </div>
          </div>

          <!-- 3: Uang Bersih -->
          <div class="p-4 sm:p-5 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200/90 dark:border-neutral-800 space-y-2">
            <div class="flex items-center justify-between text-sm sm:text-base">
              <span class="font-heading font-bold text-emerald-800 dark:text-emerald-400">
                3. Uang Masuk Tabungan
              </span>
              <span class="font-mono font-bold text-emerald-600 dark:text-emerald-400 text-sm sm:text-base tabular-nums">
                {{ formatDisplayedAmount(calculatedProfitAmount) }}
              </span>
            </div>
            <p class="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed font-sans">
              Uang riil yang masuk ke rekening tabungan tokomu dan bebas dipakai ekspansi.
            </p>
            <div class="pt-2.5 border-t border-neutral-100 dark:border-neutral-800/80 flex items-center justify-between text-xs sm:text-sm">
              <span class="text-neutral-600 dark:text-neutral-400 font-sans font-medium">Dibanding kedai lain:</span>
              <span class="font-semibold text-emerald-600 dark:text-emerald-400">1.6x Lebih Tinggi</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 3. Monthly Revenue Trend Chart & Milestones (Matches Image 1 Trueform Chart) -->
    <div class="bg-white dark:bg-[#15161A] border border-neutral-200/90 dark:border-neutral-800 rounded-2xl p-5 sm:p-7 space-y-6">
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-neutral-100 dark:border-neutral-800/80">
        <div>
          <h2 class="text-xl sm:text-2xl font-heading font-bold text-neutral-900 dark:text-white tracking-tight">
            Riwayat Pertumbuhan Omzet & Laba (5 Bulan Terakhir)
          </h2>
          <p class="text-sm text-neutral-600 dark:text-neutral-300 mt-1 font-sans">
            Klik kolom bulan di bawah untuk melihat catatan penting kemajuan tokomu.
          </p>
        </div>

        <div class="flex items-center gap-4 text-xs sm:text-sm font-sans font-semibold">
          <div class="flex items-center gap-2">
            <span class="w-3 h-3 rounded-full bg-primary-500" />
            <span class="text-neutral-700 dark:text-neutral-200">Total Omzet</span>
          </div>
          <div class="flex items-center gap-2">
            <span class="w-3 h-3 rounded-full bg-emerald-500" />
            <span class="text-neutral-700 dark:text-neutral-200">Uang Bersih</span>
          </div>
        </div>
      </div>

      <!-- Clean Bar Visualizer -->
      <div class="pt-2">
        <div class="grid grid-cols-5 gap-2 sm:gap-6 items-end h-56 sm:h-64 border-b border-neutral-200/80 dark:border-neutral-800 px-2 sm:px-6">
          <div
            v-for="(rec, idx) in monthlyTrends"
            :key="rec.month"
            class="flex flex-col items-center gap-2 h-full justify-end group cursor-pointer"
            @click="selectedMonthIndex = idx"
          >
            <!-- Bar Pair -->
            <div class="w-full max-w-[70px] flex items-end justify-center gap-1.5 sm:gap-2 h-full pb-2">
              <!-- Omzet Bar -->
              <div
                class="w-1/2 rounded-t-md bg-primary-400/85 hover:bg-primary-500 transition-colors duration-150 relative"
                :class="selectedMonthIndex === idx ? 'ring-2 ring-primary-500 ring-offset-1 dark:ring-offset-neutral-900' : 'opacity-80'"
                :style="{ height: `${(rec.omzet / 110000000) * 100}%` }"
              >
                <div class="opacity-0 group-hover:opacity-100 transition-opacity absolute -top-8 left-1/2 -translate-x-1/2 bg-neutral-900 text-white text-xs font-mono font-bold py-1 px-2.5 rounded-md pointer-events-none whitespace-nowrap z-20">
                  Rp {{ (rec.omzet / 1000000).toFixed(1) }} Jt
                </div>
              </div>

              <!-- Net Profit Bar -->
              <div
                class="w-1/2 rounded-t-md bg-emerald-500 hover:bg-emerald-600 transition-colors duration-150 relative"
                :class="selectedMonthIndex === idx ? 'ring-2 ring-emerald-500 ring-offset-1 dark:ring-offset-neutral-900' : 'opacity-90'"
                :style="{ height: `${(rec.netProfit / 110000000) * 100}%` }"
              >
                <div class="opacity-0 group-hover:opacity-100 transition-opacity absolute -top-8 left-1/2 -translate-x-1/2 bg-emerald-950 text-emerald-200 border border-emerald-800 text-xs font-mono font-bold py-1 px-2.5 rounded-md pointer-events-none whitespace-nowrap z-20">
                  Rp {{ (rec.netProfit / 1000000).toFixed(1) }} Jt
                </div>
              </div>
            </div>

            <!-- Month Label Pill -->
            <div
              :class="[
                'text-center py-1.5 px-3 rounded-lg text-xs sm:text-sm font-heading font-bold transition-colors',
                selectedMonthIndex === idx
                  ? 'bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 shadow-xs'
                  : 'text-neutral-600 hover:text-neutral-900 dark:hover:text-white'
              ]"
            >
              {{ rec.month }}
            </div>
          </div>
        </div>

        <!-- Selected Month Inspector Card -->
        <div class="mt-4 p-4 sm:p-5 rounded-xl bg-neutral-50 dark:bg-neutral-800/50 border border-neutral-200/80 dark:border-neutral-700/80 flex flex-col md:flex-row md:items-center justify-between gap-4 text-sm">
          <div class="space-y-1.5">
            <div class="flex items-center gap-2.5">
              <span class="font-heading font-bold text-neutral-900 dark:text-white text-sm sm:text-base">
                Catatan Bulan {{ currentSelectedRecord.month }} 2026:
              </span>
              <span class="text-xs font-mono font-bold px-2.5 py-0.5 rounded-md bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300">
                Untung Bersih {{ ((currentSelectedRecord.netProfit / currentSelectedRecord.omzet) * 100).toFixed(1) }}%
              </span>
            </div>
            <p class="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 font-sans leading-relaxed">
              {{ currentSelectedRecord.milestone }}
            </p>
          </div>

          <div class="flex items-center gap-6 shrink-0">
            <div>
              <span class="text-neutral-600 dark:text-neutral-400 block text-xs font-semibold uppercase tracking-wider font-sans">Omzet Penjualan</span>
              <span class="font-bold text-neutral-900 dark:text-white text-sm sm:text-base font-mono tabular-nums mt-0.5 block">
                Rp {{ currentSelectedRecord.omzet.toLocaleString('id-ID') }}
              </span>
            </div>
            <div>
              <span class="text-neutral-600 dark:text-neutral-400 block text-xs font-semibold uppercase tracking-wider font-sans">Uang Bersih</span>
              <span class="font-bold text-emerald-600 dark:text-emerald-400 text-sm sm:text-base font-mono tabular-nums mt-0.5 block">
                Rp {{ currentSelectedRecord.netProfit.toLocaleString('id-ID') }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 4. Panduan Sinyal Harian Tokomu (Traffic Light Clean Cards) -->
    <div class="space-y-4">
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <h2 class="text-xl sm:text-2xl font-heading font-bold text-neutral-900 dark:text-white tracking-tight">
            Panduan Sinyal Harian Tokomu
          </h2>
          <p class="text-sm text-neutral-600 dark:text-neutral-300 font-sans mt-0.5">
            Kondisi penting yang perlu kamu pantau hari ini agar bisnis tetap untung dan aman.
          </p>
        </div>
        <span class="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 font-sans">
          Pembimbing: <strong class="text-neutral-900 dark:text-white font-semibold">{{ umkmStore.profile.consultantName }}</strong> (BNSP #7281)
        </span>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <!-- 1: Hijau -->
        <div class="p-5 sm:p-6 rounded-2xl bg-white dark:bg-[#15161A] border border-neutral-200/90 dark:border-neutral-800 flex flex-col justify-between space-y-4">
          <div class="space-y-2.5">
            <div class="flex items-center justify-between">
              <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-sans font-semibold bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-200/70 dark:border-emerald-800/60">
                <span class="w-2 h-2 rounded-full bg-emerald-500" />
                <span>Kondisi Aman</span>
              </span>
              <span class="text-xs sm:text-sm font-medium text-neutral-600 dark:text-neutral-400">Kas Toko</span>
            </div>
            <h3 class="font-heading font-bold text-base sm:text-lg text-neutral-900 dark:text-white leading-snug">
              Uang Toko & Uang Pribadi Sudah 100% Terpisah
            </h3>
            <p class="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed font-sans">
              Tidak ada uang jajan pribadi yang tercampur kas usaha. Pembelian biji kopi langsung dari petani juga menghemat biaya bahan hingga 4.2%.
            </p>
          </div>
          <div class="pt-3.5 border-t border-neutral-100 dark:border-neutral-800 text-xs sm:text-sm text-emerald-700 dark:text-emerald-400 font-semibold">
            Pertahankan setoran kas setiap malam jam 21:00.
          </div>
        </div>

        <!-- 2: Kuning -->
        <div class="p-5 sm:p-6 rounded-2xl bg-white dark:bg-[#15161A] border border-neutral-200/90 dark:border-neutral-800 flex flex-col justify-between space-y-4">
          <div class="space-y-2.5">
            <div class="flex items-center justify-between">
              <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-sans font-semibold bg-amber-50 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border border-amber-200/70 dark:border-amber-800/60">
                <span class="w-2 h-2 rounded-full bg-amber-500" />
                <span>Perlu Perhatian</span>
              </span>
              <span class="text-xs sm:text-sm font-medium text-neutral-600 dark:text-neutral-400">Potongan Ojol</span>
            </div>
            <h3 class="font-heading font-bold text-base sm:text-lg text-neutral-900 dark:text-white leading-snug">
              Potongan Aplikasi Ojol Cukup Besar (35%)
            </h3>
            <p class="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed font-sans">
              Potongan komisi aplikasi ojek online memakan margin sekitar Rp 6.800.000 bulan lalu. Sebaiknya ajak pembeli datang langsung ke kedai.
            </p>
          </div>
          <div class="pt-3.5 border-t border-neutral-100 dark:border-neutral-800 text-xs sm:text-sm text-amber-700 dark:text-amber-400 font-semibold">
            Saran: Buat kupon stempel (beli 5 gratis 1 cup) untuk pembeli di tempat.
          </div>
        </div>

        <!-- 3: Biru / Peluang Emas -->
        <div class="p-5 sm:p-6 rounded-2xl bg-white dark:bg-[#15161A] border border-primary-200/90 dark:border-primary-900/60 flex flex-col justify-between space-y-4">
          <div class="space-y-2.5">
            <div class="flex items-center justify-between">
              <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-sans font-semibold bg-primary-50 dark:bg-primary-950/60 text-primary-700 dark:text-primary-300 border border-primary-200/70 dark:border-primary-800/60">
                <span>Peluang Modal</span>
              </span>
              <span class="text-xs sm:text-sm text-primary-700 dark:text-primary-300 font-mono font-bold">Tiket Rp 250 Jt</span>
            </div>
            <h3 class="font-heading font-bold text-base sm:text-lg text-neutral-900 dark:text-white leading-snug">
              1 Investor Angel Ingin Biayai Gerai Ke-4
            </h3>
            <p class="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed font-sans">
              Hendro Wicaksono telah meninjau pembukuan tokomu dan berminat menyuntikkan modal ekspansi cabang baru.
            </p>
          </div>
          <button
            type="button"
            class="w-full px-4 py-2.5 rounded-xl bg-primary-500 hover:bg-primary-600 text-white text-xs sm:text-sm font-heading font-semibold flex items-center justify-between transition-colors active:scale-[0.96]"
            @click="openInvestorDrawer"
          >
            <span>Buka Surat Tawaran</span>
            <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- 5. Riwayat Arus Kas Terverifikasi (Table matching Trueform Reference) -->
    <div class="bg-white dark:bg-[#15161A] border border-neutral-200/90 dark:border-neutral-800 rounded-2xl p-5 sm:p-7 space-y-5">
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-neutral-100 dark:border-neutral-800/80">
        <div>
          <h2 class="text-xl sm:text-2xl font-heading font-bold text-neutral-900 dark:text-white tracking-tight">
            Laporan Buku Kas Bulanan Terverifikasi
          </h2>
          <p class="text-sm text-neutral-600 dark:text-neutral-300 font-sans mt-0.5">
            Arus kas 5 bulan terakhir yang sudah dicek langsung oleh konsultan pendamping tokomu.
          </p>
        </div>

        <button
          type="button"
          class="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl border border-neutral-300 dark:border-neutral-700 text-xs sm:text-sm font-heading font-semibold text-neutral-800 dark:text-neutral-100 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors active:scale-[0.96]"
          @click="isTransactionDrawerOpen = true"
        >
          <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
          </svg>
          <span>Input Kas Baru</span>
        </button>
      </div>

      <div class="overflow-x-auto">
        <table class="w-full text-left text-sm font-sans">
          <thead>
            <tr class="border-b border-neutral-200 dark:border-neutral-800 text-neutral-700 dark:text-neutral-300 font-heading text-xs font-bold uppercase tracking-wider">
              <th class="py-3.5 px-3">Bulan Periode</th>
              <th class="py-3.5 px-3 text-right">Omzet Penjualan</th>
              <th class="py-3.5 px-3 text-right">Bahan Baku (HPP)</th>
              <th class="py-3.5 px-3 text-right">Gaji & Sewa</th>
              <th class="py-3.5 px-3 text-right font-bold text-neutral-900 dark:text-white">Uang Bersih (Laba)</th>
              <th class="py-3.5 px-3 text-center">Status Audit</th>
              <th class="py-3.5 px-3 text-right">Aksi</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-neutral-100 dark:divide-neutral-800 text-neutral-800 dark:text-neutral-200">
            <tr
              v-for="rec in umkmStore.monthlyRecords"
              :key="rec.month"
              class="hover:bg-neutral-50/70 dark:hover:bg-neutral-900/60 transition-colors"
            >
              <td class="py-4 px-3 font-heading font-bold text-neutral-900 dark:text-white text-sm sm:text-base">
                {{ rec.month }} {{ rec.year }}
              </td>
              <td class="py-4 px-3 text-right font-mono tabular-nums font-semibold text-neutral-900 dark:text-white">
                Rp {{ rec.omzet.toLocaleString('id-ID') }}
              </td>
              <td class="py-4 px-3 text-right font-mono tabular-nums text-neutral-600 dark:text-neutral-300">
                Rp {{ rec.hpp.toLocaleString('id-ID') }}
              </td>
              <td class="py-4 px-3 text-right font-mono tabular-nums text-neutral-600 dark:text-neutral-300">
                Rp {{ rec.opex.toLocaleString('id-ID') }}
              </td>
              <td class="py-4 px-3 text-right font-mono tabular-nums font-bold text-emerald-600 dark:text-emerald-400 text-sm sm:text-base">
                Rp {{ rec.netProfit.toLocaleString('id-ID') }}
              </td>
              <td class="py-4 px-3 text-center">
                <span class="inline-flex items-center gap-1.5 text-xs font-sans font-semibold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200/80 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800">
                  <span class="w-2 h-2 rounded-full bg-emerald-500" />
                  <span>Valid BNSP</span>
                </span>
              </td>
              <td class="py-4 px-3 text-right">
                <button
                  type="button"
                  class="p-1.5 rounded-lg text-neutral-500 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                  title="Lihat Rincian Laporan"
                  @click="openDetailMonth(rec)"
                >
                  <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="12" cy="12" r="1" />
                    <circle cx="19" cy="12" r="1" />
                    <circle cx="5" cy="12" r="1" />
                  </svg>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>


    <!-- SLIDE-OVER SHEET 2: Record Cash Entry Sheet -->
    <BDrawer
      v-model="isTransactionDrawerOpen"
      title="Catat Kas Toko Baru"
      subtitle="Buku Catatan Penjualan & Biaya Harian"
    >
      <div class="space-y-4">
        <div>
          <label class="block text-xs sm:text-sm font-heading font-semibold text-neutral-800 dark:text-neutral-200 mb-1.5">
            Tanggal Pembukuan
          </label>
          <input
            type="date"
            class="w-full px-3.5 py-2.5 text-sm rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500/20"
            :value="new Date().toISOString().substring(0, 10)"
          />
        </div>

        <div>
          <label class="block text-xs sm:text-sm font-heading font-semibold text-neutral-800 dark:text-neutral-200 mb-1.5">
            Total Penjualan Hari Ini (Omzet)
          </label>
          <div class="relative">
            <span class="absolute inset-y-0 left-0 pl-3.5 flex items-center text-sm text-neutral-500 font-mono font-semibold">Rp</span>
            <input
              type="text"
              placeholder="3.500.000"
              class="w-full pl-10 pr-3.5 py-2.5 text-sm sm:text-base rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white font-mono focus:outline-none focus:ring-2 focus:ring-primary-500/20 font-semibold"
            />
          </div>
        </div>

        <div>
          <label class="block text-xs sm:text-sm font-heading font-semibold text-neutral-800 dark:text-neutral-200 mb-1.5">
            Biaya Belanja Bahan Baku (Kopi/Susu)
          </label>
          <div class="relative">
            <span class="absolute inset-y-0 left-0 pl-3.5 flex items-center text-sm text-neutral-500 font-mono font-semibold">Rp</span>
            <input
              type="text"
              placeholder="1.200.000"
              class="w-full pl-10 pr-3.5 py-2.5 text-sm sm:text-base rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white font-mono focus:outline-none focus:ring-2 focus:ring-primary-500/20 font-semibold"
            />
          </div>
        </div>

        <div>
          <label class="block text-xs sm:text-sm font-heading font-semibold text-neutral-800 dark:text-neutral-200 mb-1.5">
            Catatan Tambahan
          </label>
          <textarea
            rows="3"
            placeholder="Contoh: Beli 2 karung biji kopi Temanggung di pasar induk..."
            class="w-full px-3.5 py-2.5 text-sm rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white font-sans focus:outline-none focus:ring-2 focus:ring-primary-500/20 leading-relaxed"
          ></textarea>
        </div>
      </div>

      <template #footer="{ close }">
        <div class="flex items-center justify-end gap-3 w-full">
          <button
            type="button"
            class="px-4 py-2.5 rounded-xl border border-neutral-300 dark:border-neutral-700 text-xs sm:text-sm font-heading font-semibold text-neutral-800 dark:text-neutral-200 hover:bg-neutral-100 transition-colors active:scale-[0.96]"
            @click="close"
          >
            Batal
          </button>
          <button
            type="button"
            class="px-5 py-2.5 rounded-xl bg-primary-500 hover:bg-primary-600 text-white text-xs sm:text-sm font-heading font-semibold shadow-xs transition-colors active:scale-[0.96]"
            @click="close"
          >
            Simpan Catatan Kas
          </button>
        </div>
      </template>
    </BDrawer>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useAuthStore } from '~/stores/auth'
import { useUmkmStore, type MonthlyFinancialRecord } from '~/stores/umkm'
import BStatCard from '~/components/base/BStatCard.vue'
import BWalletCard from '~/components/base/BWalletCard.vue'
import BReceiptCard from '~/components/base/BReceiptCard.vue'
import BShieldCard from '~/components/base/BShieldCard.vue'
import BPillTabs from '~/components/base/BPillTabs.vue'
import BDropdown from '~/components/base/BDropdown.vue'
import BDrawer from '~/components/base/BDrawer.vue'

definePageMeta({
  layout: 'dashboard'
})

const authStore = useAuthStore()
const umkmStore = useUmkmStore()

// Period selection
const selectedPeriod = ref('month')
const periodOptions = [
  { label: 'Bulan Ini', value: 'month' },
  { label: 'Pekan Ini', value: 'week' },
  { label: 'Tahun 2026', value: 'year' }
]

const selectedPeriodLabel = computed(() => {
  return periodOptions.find(p => p.value === selectedPeriod.value)?.label || 'Bulan Ini'
})

// Time greeting & Motivational Phrases for UMKM Owners
const timeSlot = computed<'pagi' | 'siang' | 'sore' | 'malam'>(() => {
  const hour = new Date().getHours()
  if (hour >= 4 && hour < 11) return 'pagi'
  if (hour >= 11 && hour < 15) return 'siang'
  if (hour >= 15 && hour < 18) return 'sore'
  return 'malam'
})

const greetingTime = computed(() => {
  const hour = new Date().getHours()
  if (hour >= 4 && hour < 11) return 'Selamat Pagi'
  if (hour >= 11 && hour < 15) return 'Selamat Siang'
  if (hour >= 15 && hour < 18) return 'Selamat Sore'
  return 'Selamat Malam'
})

const ownerFirstName = computed(() => {
  const name = authStore.currentUser?.name || umkmStore.profile.ownerName || 'Fikri'
  return name.split(' ')[0]
})

const motivationalPhrases: Record<'pagi' | 'siang' | 'sore' | 'malam', string[]> = {
  pagi: [
    'Awali hari dengan bismillah dan senyuman. Rezeki berkah dan pelanggan setia menanti tokomu hari ini.',
    'Setiap cangkir dan sajian yang disiapkan dengan tulus adalah magnet pembuka rezeki yang melimpah.',
    'Langkah kecil yang konsisten setiap pagi akan mengantarkan usahamu bertumbuh semakin kokoh.',
    'Semangat menjemput rezeki halal hari ini! Fokus pada kualitas rasa dan ketulusan melayani.',
    'Pagi cerah untuk impian besar. Percayalah, usahamu hari ini selangkah lebih dekat menuju cabang impian.'
  ],
  siang: [
    'Tetap jaga senyum ramah dan energi positif melayani setiap pelanggan siang ini.',
    'Kerja keras dan ketulusanmu melayani orang lain tidak akan pernah mengkhianati hasil.',
    'Istirahat sejenak, syukuri penjualan pagi ini, dan sambut sore dengan semangat baru.',
    'Di setiap tetes keringat usahamu hari ini, ada doa dan berkah luar biasa untuk keluarga.'
  ],
  sore: [
    'Terima kasih atas dedikasi dan kerja kerasmu hari ini. Usahamu bertumbuh semakin kokoh.',
    'Satu hari penuh perjuangan berhasil kamu lewati. Semoga lelahmu menjadi berkah berlimpah.',
    'Waktu yang pas untuk rehat sejenak sambil menikmati secangkir kopi hangat hasil tokomu sendiri.'
  ],
  malam: [
    'Tutup hari dengan rasa syukur dan bangga. Tokomu telah memberikan yang terbaik hari ini.',
    'Istirahatlah yang cukup dan nyaman. Esok hari ada banyak peluang dan rezeki baru yang menantimu.',
    'Perjuanganmu hari ini adalah pondasi kokoh untuk masa depan bisnis yang gemilang.'
  ]
}

const currentMotivationalPhrase = computed(() => {
  const list = motivationalPhrases[timeSlot.value]
  const day = new Date().getDate()
  return list[day % list.length]
})

// Breakdown Tabs
const activeBreakdownTab = ref<'per100k' | 'totalReal' | 'simulator'>('per100k')

const breakdownTabs = [
  { id: 'per100k', label: 'Porsi Rp 100.000' },
  { id: 'totalReal', label: 'Total Riil Bulan Ini' },
  { id: 'simulator', label: 'Simulasi Omzet' }
]

// Simulator State
const simulatedOmzet = ref(100000000)

const simulatedProfit = computed(() => {
  return Math.round(simulatedOmzet.value * 0.326)
})

const calculatedHppPercent = computed(() => 45.1)
const calculatedOpexPercent = computed(() => 22.3)
const calculatedProfitPercent = computed(() => 32.6)

const calculatedHppAmount = computed(() => {
  if (activeBreakdownTab.value === 'per100k') return 45100
  if (activeBreakdownTab.value === 'totalReal') return 45100000
  return Math.round(simulatedOmzet.value * 0.451)
})

const calculatedOpexAmount = computed(() => {
  if (activeBreakdownTab.value === 'per100k') return 22300
  if (activeBreakdownTab.value === 'totalReal') return 22300000
  return Math.round(simulatedOmzet.value * 0.223)
})

const calculatedProfitAmount = computed(() => {
  if (activeBreakdownTab.value === 'per100k') return 32600
  if (activeBreakdownTab.value === 'totalReal') return 32600000
  return simulatedProfit.value
})

function formatDisplayedAmount(val: number) {
  return 'Rp ' + val.toLocaleString('id-ID')
}

// 5-Month Trend Data with Milestones
const monthlyTrends = [
  { month: 'Mei', omzet: 68000000, netProfit: 19500000, milestone: 'Pembukaan cabang ke-2 di Tebet, Jakarta Selatan.' },
  { month: 'Jun', omzet: 75000000, netProfit: 23100000, milestone: 'Efisiensi belanja susu segar langsung dari peternak lokal.' },
  { month: 'Jul', omzet: 82000000, netProfit: 25400000, milestone: 'Musim liburan sekolah, penjualan cup harian tembus rekor 380 cup/hari.' },
  { month: 'Agu', omzet: 91000000, netProfit: 28900000, milestone: 'Pencatatan kas harian digital terintegrasi aplikasi Beruang.' },
  { month: 'Sep', omzet: 100000000, netProfit: 32600000, milestone: 'Rekor laba bersih tertinggi (32.6%), 100% siap diajukan ke investor.' }
]

const selectedMonthIndex = ref(4)
const currentSelectedRecord = computed(() => monthlyTrends[selectedMonthIndex.value])

// Slide-Over Drawers State
const isTransactionDrawerOpen = ref(false)

function openDetailMonth(record: MonthlyFinancialRecord) {
  const idx = monthlyTrends.findIndex(m => m.month === record.month)
  if (idx !== -1) {
    selectedMonthIndex.value = idx
  }
}
</script>
