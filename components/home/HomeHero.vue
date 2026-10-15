<template>
  <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12 pb-12 sm:pb-16 font-sans">
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-12 items-center">
      
      <!-- Left Column: Editorial Headline & Value Prop -->
      <div class="lg:col-span-6 flex flex-col gap-5 sm:gap-6">
        <!-- Top Pill Badge (Sesuai Gaya Beranda di Gambar) -->
        <div class="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white dark:bg-[#13161F] shadow-[0_2px_10px_rgba(0,0,0,0.05)] border border-neutral-200/90 dark:border-neutral-800 text-xs sm:text-sm font-poppins font-medium text-neutral-800 dark:text-neutral-200 w-fit">
          <div class="w-6 h-6 rounded-full bg-[#0081A0]/10 dark:bg-[#0081A0]/25 flex items-center justify-center text-[#0081A0] dark:text-[#2091AA] shrink-0">
            <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
              <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
              <polyline points="9 22 9 12 15 12 15 22"/>
            </svg>
          </div>
          <span>Platform Tata Kelola & Modal UMKM</span>
        </div>

        <!-- Headline & Description: Ukuran Disesuaikan Lebih Proporsional & Rapi -->
        <div class="space-y-3">
          <h1 class="text-2xl sm:text-4xl lg:text-[40px] font-poppins font-bold text-neutral-900 dark:text-white tracking-tight leading-tight lg:leading-[1.18] text-balance">
            Bisnismu, Terverifikasi & Siap Didanai.
          </h1>

          <p class="text-sm sm:text-base text-neutral-600 dark:text-neutral-300 font-poppins leading-relaxed max-w-xl">
            Audit 5 pilar bersama konsultan bisnis profesional. Rapikan arus kas, raih sertifikasi kelayakan, dan terhubung langsung dengan investor terpercaya.
          </p>
        </div>

        <!-- Action Buttons: Mengadopsi Button Style Beranda UMKM (btn-3d-blue & btn-pill-action) -->
        <div class="flex flex-wrap items-center gap-3 pt-1">
          <NuxtLink
            to="/daftar"
            class="btn-3d-blue group px-5 py-2.5 rounded-full text-xs sm:text-sm font-poppins font-semibold inline-flex items-center gap-2.5 shadow-sm"
          >
            <span>Mulai Audit Usaha Gratis</span>
            <svg class="w-4 h-4 shrink-0 transition-transform duration-200 group-hover:translate-x-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </NuxtLink>

          <NuxtLink
            to="/investor"
            class="btn-pill-action group"
          >
            <span>Katalog Usaha Terverifikasi</span>
            <svg class="w-4 h-4 shrink-0 transition-transform duration-200 group-hover:translate-x-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </NuxtLink>
        </div>

        <!-- Trust Badges Row -->
        <div class="pt-3 border-t border-neutral-200/80 dark:border-neutral-800/80 flex flex-wrap items-center gap-y-2 gap-x-4 text-xs font-poppins text-neutral-500 dark:text-neutral-400">
          <span class="inline-flex items-center gap-1.5">
            <span class="text-emerald-500 font-bold">✓</span> Konsultan BNSP
          </span>
          <span class="inline-flex items-center gap-1.5">
            <span class="text-emerald-500 font-bold">✓</span> Audit Kas Riil
          </span>
          <span class="inline-flex items-center gap-1.5">
            <span class="text-emerald-500 font-bold">✓</span> Akses Investor Resmi
          </span>
        </div>
      </div>

      <!-- Right Column: Interactive Tactile Preview Card (Sesuai Persis Gambar Beranda UMKM) -->
      <div class="lg:col-span-6 flex justify-center items-center">
        <div class="w-full max-w-[500px] card-tactile-gopay p-4 sm:p-5 rounded-2xl sm:rounded-3xl shadow-[0_8px_30px_rgba(0,129,160,0.08)] space-y-4">
          
          <!-- Mockup Header: Beranda Pill + Live Tag -->
          <div class="flex items-center justify-between gap-2 pb-1 border-b border-neutral-100 dark:border-neutral-800">
            <div class="inline-flex items-center gap-2">
              <div class="w-6 h-6 rounded-full bg-[#0081A0]/10 flex items-center justify-center text-[#0081A0] text-xs">
                🏠
              </div>
              <span class="text-xs sm:text-sm font-poppins font-bold text-neutral-900 dark:text-white">
                Beranda
              </span>
            </div>
            <div class="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-[11px] font-poppins font-medium text-emerald-600 dark:text-emerald-400 border border-emerald-200/60 dark:border-emerald-800/60">
              <span class="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>Terverifikasi</span>
            </div>
          </div>

          <!-- Profile Preview Row (Avatar + Nama Usaha + Action Pill) -->
          <div class="flex items-start gap-3 sm:gap-4 pt-1">
            <!-- Avatar with Verified Rosette Badge -->
            <div class="relative shrink-0">
              <div class="p-1 rounded-full bg-white dark:bg-[#151922] shadow-[0_3px_12px_rgba(0,0,0,0.12)]">
                <img
                  src="/images/user-profile.png"
                  alt="Kopi Senja Nusantara"
                  class="w-13 h-13 sm:w-15 sm:h-15 rounded-full object-cover block"
                  onerror="this.src='https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80'"
                />
              </div>
              <!-- Green Verified Rosette -->
              <div class="absolute -top-1 -right-1 z-10">
                <svg
                  class="w-5 h-5 drop-shadow-[0_2px_4px_rgba(0,166,42,0.4)]"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <defs>
                    <linearGradient id="hero-badge-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stop-color="#00C058" />
                      <stop offset="55%" stop-color="#00A62A" />
                      <stop offset="100%" stop-color="#007D13" />
                    </linearGradient>
                  </defs>
                  <path
                    d="M18.9905 19C18.3678 19.6175 17.2393 19.4637 16.4479 19.4637C15.4765 19.4637 15.0087 19.6537 14.3154 20.347C13.7251 20.9374 12.9337 22 12 22C11.0663 22 10.2749 20.9374 9.68457 20.347C8.99128 19.6537 8.52349 19.4637 7.55206 19.4637C6.76068 19.4637 5.63218 19.6175 5.00949 19C4.38181 18.3776 4.53628 17.2444 4.53628 16.4479C4.53628 15.4414 4.31616 14.9786 3.59938 14.2618C2.53314 13.1956 2.00002 12.6624 2 12C2.00001 11.3375 2.53312 10.8044 3.59935 9.73817C4.2392 9.09832 4.53628 8.46428 4.53628 7.55206C4.53628 6.76065 4.38249 5.63214 5 5.00944C5.62243 4.38178 6.7556 4.53626 7.55208 4.53626C8.46427 4.53626 9.09832 4.2392 9.73815 3.59937C10.8044 2.53312 11.3375 2 12 2C12.6625 2 13.1956 2.53312 14.2618 3.59937C14.9015 4.23907 15.5355 4.53626 16.4479 4.53626C17.2393 4.53626 18.3679 4.38247 18.9906 5C19.6182 5.62243 19.4637 6.75559 19.4637 7.55206C19.4637 8.55858 19.6839 9.02137 20.4006 9.73817C21.4669 10.8044 22 11.3375 22 12C22 12.6624 21.4669 13.1956 20.4006 14.2618C19.6838 14.9786 19.4637 15.4414 19.4637 16.4479C19.4637 17.2444 19.6182 18.3776 18.9905 19Z"
                    fill="url(#hero-badge-gradient)"
                  />
                  <path
                    d="M8.75 12.5L10.8 14.5L15.25 9.75"
                    stroke="#ffffff"
                    stroke-width="2.4"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </div>
            </div>

            <!-- Profile Info & Button -->
            <div class="flex-1 min-w-0 space-y-1">
              <div class="flex items-center justify-between gap-2">
                <h3 class="text-base sm:text-lg font-poppins font-bold text-neutral-900 dark:text-white truncate">
                  Kopi Senja Nusantara
                </h3>
                <span class="btn-pill-action scale-90 sm:scale-100 origin-right">
                  <span>Edit Profil Usaha</span>
                  <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M5 12h14" />
                    <path d="m12 5 7 7-7 7" />
                  </svg>
                </span>
              </div>
              <p class="text-[12px] sm:text-[13px] font-poppins text-neutral-500 dark:text-neutral-400 line-clamp-2 leading-relaxed">
                Spesialis kopi arabika susu gula aren dengan 3 outlet aktif di Bandung & margin kotor stabil di atas 48%.
              </p>
            </div>
          </div>

          <!-- 2 Stat Cards (Gaya Biru Sesuai Gambar) -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            <!-- Card 1: Untung Bersih -->
            <div class="group relative rounded-xl card-tactile-gopay has-blue-banner overflow-hidden flex flex-col justify-between">
              <!-- Top Banner -->
              <div class="w-full px-3.5 py-2 card-header-blue-banner flex items-center gap-2">
                <svg class="w-4 h-4 text-white shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                  <rect x="2" y="6" width="20" height="12" rx="2" />
                  <circle cx="12" cy="12" r="2" />
                  <path d="M6 12h.01M18 12h.01" />
                </svg>
                <span class="text-[11px] font-poppins font-semibold uppercase tracking-wider text-white">
                  UNTUNG BERSIH
                </span>
              </div>
              <!-- Inner Info Box -->
              <div class="w-full rounded-t-xl bg-[#F6F8FA] dark:bg-[#13161F] p-3.5 flex flex-col gap-2">
                <div>
                  <span class="text-lg sm:text-xl font-poppins font-bold text-neutral-900 dark:text-white tabular-nums tracking-tight block">
                    Rp 32.600.000
                  </span>
                  <div class="mt-1 text-[11px] font-poppins text-neutral-500 dark:text-neutral-400 flex items-center gap-1">
                    <span>Bulan Ini</span>
                    <span class="text-emerald-600 dark:text-emerald-400 font-semibold tabular-nums">+12% (MoM)</span>
                  </div>
                </div>
                <div class="pt-0.5">
                  <span class="btn-pill-action scale-90 origin-left">
                    <span>Lihat Rincian</span>
                    <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M5 12h14" />
                      <path d="m12 5 7 7-7 7" />
                    </svg>
                  </span>
                </div>
              </div>
            </div>

            <!-- Card 2: Modal Jualan -->
            <div class="group relative rounded-xl card-tactile-gopay has-blue-banner overflow-hidden flex flex-col justify-between">
              <!-- Top Banner -->
              <div class="w-full px-3.5 py-2 card-header-blue-banner flex items-center gap-2">
                <svg class="w-4 h-4 text-white shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
                  <path d="M3 6h18" />
                  <path d="M16 10a4 4 0 0 1-8 0" />
                </svg>
                <span class="text-[11px] font-poppins font-semibold uppercase tracking-wider text-white">
                  MODAL JUALAN
                </span>
              </div>
              <!-- Inner Info Box -->
              <div class="w-full rounded-t-xl bg-[#F6F8FA] dark:bg-[#13161F] p-3.5 flex flex-col gap-2">
                <div>
                  <span class="text-lg sm:text-xl font-poppins font-bold text-neutral-900 dark:text-white tabular-nums tracking-tight block">
                    45.1%
                  </span>
                  <div class="mt-1 text-[11px] font-poppins text-neutral-500 dark:text-neutral-400 flex items-center gap-1">
                    <span>Target &lt; 50%</span>
                    <span class="text-emerald-600 dark:text-emerald-400 font-semibold">(Sangat Hemat)</span>
                  </div>
                </div>
                <div class="pt-0.5">
                  <span class="btn-pill-action scale-90 origin-left">
                    <span>Kelola HPP</span>
                    <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M5 12h14" />
                      <path d="m12 5 7 7-7 7" />
                    </svg>
                  </span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

    </div>
  </section>
</template>

<script setup lang="ts">
// Interactive tactile Beranda UMKM Hero
</script>
