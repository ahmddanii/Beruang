<template>
  <section class="w-full max-w-[1720px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 2xl:px-20 pb-20 sm:pb-28 font-sans">
    <div class="relative overflow-hidden rounded-2xl sm:rounded-3xl bg-gradient-to-br from-[#0B2533] via-[#0F3548] to-[#124B66] text-white p-8 sm:p-12 lg:p-16 text-center flex flex-col items-center gap-6 sm:gap-8 border border-cyan-500/20 shadow-[0_12px_40px_rgba(0,129,160,0.18)]">
      
      <!-- Subtle Ambient Glow -->
      <div class="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-96 bg-cyan-400/10 rounded-full blur-3xl pointer-events-none"></div>

      <!-- Heading & Subtitle -->
      <div class="relative z-10 max-w-3xl mx-auto space-y-3">
        <h2 class="text-2xl sm:text-3xl lg:text-4xl xl:text-[42px] font-poppins font-bold tracking-tight text-white leading-tight">
          Siapkan Bisnismu Masuk Pasar Modal UMKM.
        </h2>
        <p class="text-xs sm:text-sm lg:text-base text-cyan-100/80 font-poppins leading-relaxed max-w-xl mx-auto">
          Bergabung bersama 520+ pemilik usaha yang telah membuktikan bahwa pembukuan kas yang rapi adalah tiket paling bernilai di mata investor.
        </p>
      </div>

      <!-- Action Buttons Row -->
      <div class="relative z-10 flex flex-wrap items-center justify-center gap-3.5 pt-1">
        <NuxtLink
          to="/daftar"
          class="px-6 py-3 rounded-full bg-white hover:bg-neutral-100 text-[#0081A0] text-xs sm:text-sm font-poppins font-bold shadow-md inline-flex items-center gap-2 transition-all active:scale-[0.98]"
        >
          <span>Daftarkan Usaha untuk Audit Gratis</span>
          <svg class="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
          </svg>
        </NuxtLink>

        <NuxtLink
          to="/untuk-konsultan"
          class="px-6 py-3 rounded-full border border-white/30 hover:bg-white/10 text-white text-xs sm:text-sm font-poppins font-medium inline-flex items-center gap-2 transition-all active:scale-[0.98]"
        >
          <span>Gabung Sebagai Konsultan BNSP</span>
        </NuxtLink>
      </div>

    </div>
  </section>
</template>

<script setup lang="ts">
// Final Call-to-action Section aligned with Beranda UMKM color scheme
</script>
