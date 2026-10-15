<template>
  <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 sm:pb-16 font-sans">
    <div class="flex flex-col gap-8 sm:gap-10">
      
      <!-- Section Header -->
      <div class="flex flex-col items-center gap-2 text-center max-w-2xl mx-auto">
        <h2 class="text-2xl sm:text-3xl font-poppins font-bold text-neutral-900 dark:text-white tracking-tight">
          Perjalanan Menuju Akses Permodalan
        </h2>
        <p class="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 font-poppins leading-relaxed max-w-lg">
          Tahapan terstruktur yang dirancang agar usahamu memiliki tata kelola akuntabel dan siap dipercaya oleh investor.
        </p>
      </div>

      <!-- 3-Step Process Bento Cards (Mengikuti Card Tactile Banner Biru Beranda) -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6 items-stretch">
        
        <!-- Step 1 -->
        <div class="group relative rounded-2xl card-tactile-gopay has-blue-banner overflow-hidden flex flex-col justify-between select-none h-full shadow-[0_4px_20px_-2px_rgba(15,23,42,0.04)] transition-all duration-200">
          <!-- Top Blue Banner -->
          <div class="w-full px-5 py-3 card-header-blue-banner flex items-center justify-between">
            <div class="flex items-center gap-2.5">
              <svg class="w-4 h-4 text-white shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.3-4.3" />
              </svg>
              <span class="text-xs font-poppins font-semibold uppercase tracking-wider text-white">
                TAHAP 01
              </span>
            </div>
            <span class="text-[11px] font-poppins text-white/80 font-medium">Minggu 1-2</span>
          </div>

          <!-- Bottom Content Box -->
          <div class="w-full rounded-t-2xl bg-[#F6F8FA] dark:bg-[#13161F] p-5 sm:p-6 flex flex-col justify-between flex-1 gap-4">
            <div class="space-y-2">
              <h3 class="text-base sm:text-lg font-poppins font-bold text-neutral-900 dark:text-white leading-snug">
                Diagnosa Awal & Skor Kesiapan
              </h3>
              <p class="text-xs sm:text-[13px] font-poppins text-neutral-600 dark:text-neutral-400 leading-relaxed">
                Konsultan pendamping memeriksa struktur bisnismu secara objektif, mulai dari izin usaha, arus kas riil, hingga model unit economics.
              </p>
              <div class="pt-2 flex flex-wrap gap-1.5">
                <span class="px-2.5 py-1 rounded-md bg-white dark:bg-neutral-800 text-[11px] font-poppins text-neutral-600 dark:text-neutral-300 border border-neutral-200/60 dark:border-neutral-700/60">
                  Audit 5 Aspek
                </span>
                <span class="px-2.5 py-1 rounded-md bg-white dark:bg-neutral-800 text-[11px] font-poppins text-neutral-600 dark:text-neutral-300 border border-neutral-200/60 dark:border-neutral-700/60">
                  Deteksi Kebocoran
                </span>
              </div>
            </div>

            <div class="pt-1">
              <NuxtLink to="/daftar" class="btn-pill-action group">
                <span>Mulai Diagnosa</span>
                <svg class="w-3.5 h-3.5 shrink-0 transition-transform duration-200 group-hover:translate-x-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </NuxtLink>
            </div>
          </div>
        </div>

        <!-- Step 2 -->
        <div class="group relative rounded-2xl card-tactile-gopay has-blue-banner overflow-hidden flex flex-col justify-between select-none h-full shadow-[0_4px_20px_-2px_rgba(15,23,42,0.04)] transition-all duration-200">
          <!-- Top Blue Banner -->
          <div class="w-full px-5 py-3 card-header-blue-banner flex items-center justify-between">
            <div class="flex items-center gap-2.5">
              <svg class="w-4 h-4 text-white shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="16" y1="13" x2="8" y2="13" />
                <line x1="16" y1="17" x2="8" y2="17" />
              </svg>
              <span class="text-xs font-poppins font-semibold uppercase tracking-wider text-white">
                TAHAP 02
              </span>
            </div>
            <span class="text-[11px] font-poppins text-white/80 font-medium">Minggu 3-8</span>
          </div>

          <!-- Bottom Content Box -->
          <div class="w-full rounded-t-2xl bg-[#F6F8FA] dark:bg-[#13161F] p-5 sm:p-6 flex flex-col justify-between flex-1 gap-4">
            <div class="space-y-2">
              <h3 class="text-base sm:text-lg font-poppins font-bold text-neutral-900 dark:text-white leading-snug">
                Bina Usaha & Disiplin Kas
              </h3>
              <p class="text-xs sm:text-[13px] font-poppins text-neutral-600 dark:text-neutral-400 leading-relaxed">
                Rancang dan jalankan SOP operasional, pisahkan kas pribadi dan kas warung, serta kontrol margin bahan baku secara harian.
              </p>
              <div class="pt-2 flex flex-wrap gap-1.5">
                <span class="px-2.5 py-1 rounded-md bg-white dark:bg-neutral-800 text-[11px] font-poppins text-neutral-600 dark:text-neutral-300 border border-neutral-200/60 dark:border-neutral-700/60">
                  SOP Gerai
                </span>
                <span class="px-2.5 py-1 rounded-md bg-white dark:bg-neutral-800 text-[11px] font-poppins text-neutral-600 dark:text-neutral-300 border border-neutral-200/60 dark:border-neutral-700/60">
                  Pendampingan BNSP
                </span>
              </div>
            </div>

            <div class="pt-1">
              <NuxtLink to="/untuk-umkm" class="btn-pill-action group">
                <span>Pelajari Pendampingan</span>
                <svg class="w-3.5 h-3.5 shrink-0 transition-transform duration-200 group-hover:translate-x-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </NuxtLink>
            </div>
          </div>
        </div>

        <!-- Step 3 -->
        <div class="group relative rounded-2xl card-tactile-gopay has-blue-banner overflow-hidden flex flex-col justify-between select-none h-full shadow-[0_4px_20px_-2px_rgba(15,23,42,0.04)] transition-all duration-200">
          <!-- Top Blue Banner -->
          <div class="w-full px-5 py-3 card-header-blue-banner flex items-center justify-between">
            <div class="flex items-center gap-2.5">
              <svg class="w-4 h-4 text-white shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
              <span class="text-xs font-poppins font-semibold uppercase tracking-wider text-white">
                TAHAP 03
              </span>
            </div>
            <span class="text-[11px] font-poppins text-white/80 font-medium">Lolos Kurasi</span>
          </div>

          <!-- Bottom Content Box -->
          <div class="w-full rounded-t-2xl bg-[#F6F8FA] dark:bg-[#13161F] p-5 sm:p-6 flex flex-col justify-between flex-1 gap-4">
            <div class="space-y-2">
              <h3 class="text-base sm:text-lg font-poppins font-bold text-neutral-900 dark:text-white leading-snug">
                Sertifikasi & Temui Investor
              </h3>
              <p class="text-xs sm:text-[13px] font-poppins text-neutral-600 dark:text-neutral-400 leading-relaxed">
                Raih sertifikasi Grade A, buka Data Room ber-watermark digital, dan terbitkan prospektus di katalog investasi tanpa skema utang riba.
              </p>
              <div class="pt-2 flex flex-wrap gap-1.5">
                <span class="px-2.5 py-1 rounded-md bg-white dark:bg-neutral-800 text-[11px] font-poppins text-neutral-600 dark:text-neutral-300 border border-neutral-200/60 dark:border-neutral-700/60">
                  Data Room Aman
                </span>
                <span class="px-2.5 py-1 rounded-md bg-white dark:bg-neutral-800 text-[11px] font-poppins text-neutral-600 dark:text-neutral-300 border border-neutral-200/60 dark:border-neutral-700/60">
                  Bagi Hasil Sehat
                </span>
              </div>
            </div>

            <div class="pt-1">
              <NuxtLink to="/investor" class="btn-pill-action group">
                <span>Katalog Investor</span>
                <svg class="w-3.5 h-3.5 shrink-0 transition-transform duration-200 group-hover:translate-x-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </NuxtLink>
            </div>
          </div>
        </div>

      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
// Tactile Process Steps aligned with Beranda UMKM design system
</script>
