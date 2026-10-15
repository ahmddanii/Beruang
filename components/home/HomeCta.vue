<template>
  <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 sm:pb-20 font-sans">
    <div class="relative overflow-hidden rounded-2xl sm:rounded-3xl bg-gradient-to-br from-[#0B2533] via-[#0F3548] to-[#124B66] text-white p-7 sm:p-10 lg:p-12 text-center flex flex-col items-center gap-6 sm:gap-8 border border-cyan-500/20 shadow-[0_12px_40px_rgba(0,129,160,0.18)]">
      
      <!-- Subtle Ambient Glow -->
      <div class="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-96 bg-cyan-400/10 rounded-full blur-3xl pointer-events-none"></div>

      <!-- Top Pill Tag -->
      <div class="relative z-10 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-poppins font-medium text-cyan-200">
        <span>🚀 Mulai Transformasi Finansial Hari Ini</span>
      </div>

      <!-- Heading & Subtitle -->
      <div class="relative z-10 max-w-2xl mx-auto space-y-2.5">
        <h2 class="text-2xl sm:text-3xl lg:text-[34px] font-poppins font-bold tracking-tight text-white leading-snug">
          Siapkan Bisnismu Masuk Pasar Modal UMKM.
        </h2>
        <p class="text-xs sm:text-sm text-cyan-100/80 font-poppins leading-relaxed max-w-lg mx-auto">
          Bergabung bersama 520+ pemilik usaha yang telah membuktikan bahwa pembukuan kas yang rapi adalah tiket paling bernilai di mata investor.
        </p>
      </div>

      <!-- Action Buttons Row -->
      <div class="relative z-10 flex flex-wrap items-center justify-center gap-3 pt-1">
        <NuxtLink
          to="/daftar"
          class="px-5 py-2.5 rounded-full bg-white hover:bg-neutral-100 text-[#0081A0] text-xs sm:text-sm font-poppins font-bold shadow-md inline-flex items-center gap-2 transition-all active:scale-[0.98]"
        >
          <span>Daftarkan Usaha untuk Audit Gratis</span>
          <svg class="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
          </svg>
        </NuxtLink>

        <NuxtLink
          to="/untuk-konsultan"
          class="px-5 py-2.5 rounded-full border border-white/30 hover:bg-white/10 text-white text-xs sm:text-sm font-poppins font-medium inline-flex items-center gap-2 transition-all active:scale-[0.98]"
        >
          <span>Gabung Sebagai Konsultan BNSP</span>
        </NuxtLink>
      </div>

      <!-- Trust Checkmarks -->
      <div class="relative z-10 pt-4 border-t border-white/10 w-full flex flex-wrap items-center justify-center gap-y-2 gap-x-6 text-[11px] sm:text-xs font-poppins text-cyan-200/80">
        <span class="inline-flex items-center gap-1.5">
          <span class="text-emerald-400 font-bold">✓</span> 100% Proteksi Kerahasiaan Data Room
        </span>
        <span class="inline-flex items-center gap-1.5">
          <span class="text-emerald-400 font-bold">✓</span> Lisensi Audit Konsultan BNSP
        </span>
        <span class="inline-flex items-center gap-1.5">
          <span class="text-emerald-400 font-bold">✓</span> Tanpa Skema Utang Bunga Berlipat
        </span>
      </div>

    </div>
  </section>
</template>

<script setup lang="ts">
// Final Call-to-action Section aligned with Beranda UMKM color scheme
</script>
