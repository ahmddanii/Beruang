<template>
  <footer class="bg-white dark:bg-[#0C121D] border-t border-neutral-200/80 dark:border-neutral-800/80 pt-12 pb-8 transition-colors font-sans">
    <div class="w-full max-w-[1720px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 2xl:px-20">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 sm:gap-10 pb-10 border-b border-neutral-200/80 dark:border-neutral-800">
        
        <!-- Brand column -->
        <div class="lg:col-span-2 space-y-3">
          <div class="flex items-center gap-2">
            <img src="/logo/logoSmall.svg" alt="Beruang Logo" class="h-7 w-auto object-contain" />
            <span class="font-heading font-extrabold text-xl tracking-tight leading-none select-none">
              <span class="text-[#0081A0] dark:text-[#2091AA]">Ber</span><span class="text-[#00AA13] dark:text-[#22C55E]">uang</span>
            </span>
          </div>
          <p class="text-xs sm:text-[13px] font-poppins text-neutral-500 dark:text-neutral-400 max-w-sm leading-relaxed">
            Platform pendampingan bisnis dan pendanaan terverifikasi. Kami menghubungkan UMKM Indonesia yang berpotensi dengan konsultan profesional dan investor terpercaya.
          </p>
        </div>

        <!-- Links: Ekosistem -->
        <div class="flex flex-col gap-3.5">
          <h4 class="font-poppins font-bold text-xs uppercase tracking-wider text-neutral-900 dark:text-white">
            Ekosistem
          </h4>
          <ul class="flex flex-col gap-2.5">
            <li>
              <NuxtLink to="/untuk-umkm" class="text-xs font-poppins text-neutral-600 dark:text-neutral-400 hover:text-[#0081A0] dark:hover:text-[#2091AA] transition-colors">
                Bina Usaha (UMKM)
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/untuk-investor" class="text-xs font-poppins text-neutral-600 dark:text-neutral-400 hover:text-[#0081A0] dark:hover:text-[#2091AA] transition-colors">
                Peluang Investor
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/untuk-konsultan" class="text-xs font-poppins text-neutral-600 dark:text-neutral-400 hover:text-[#0081A0] dark:hover:text-[#2091AA] transition-colors">
                Jadi Konsultan BNSP
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/investor" class="text-xs font-poppins text-neutral-600 dark:text-neutral-400 hover:text-[#0081A0] dark:hover:text-[#2091AA] transition-colors">
                Katalog Marketplace
              </NuxtLink>
            </li>
          </ul>
        </div>

        <!-- Links: Perusahaan -->
        <div class="flex flex-col gap-3.5">
          <h4 class="font-poppins font-bold text-xs uppercase tracking-wider text-neutral-900 dark:text-white">
            Perusahaan
          </h4>
          <ul class="flex flex-col gap-2.5">
            <li>
              <NuxtLink to="/tentang" class="text-xs font-poppins text-neutral-600 dark:text-neutral-400 hover:text-[#0081A0] dark:hover:text-[#2091AA] transition-colors">
                Tentang Kami
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/faq" class="text-xs font-poppins text-neutral-600 dark:text-neutral-400 hover:text-[#0081A0] dark:hover:text-[#2091AA] transition-colors">
                Pusat Bantuan & FAQ
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/kontak" class="text-xs font-poppins text-neutral-600 dark:text-neutral-400 hover:text-[#0081A0] dark:hover:text-[#2091AA] transition-colors">
                Hubungi Kami
              </NuxtLink>
            </li>
          </ul>
        </div>

        <!-- Consultation Section -->
        <div class="flex flex-col gap-3.5">
          <h4 class="font-poppins font-bold text-xs uppercase tracking-wider text-neutral-900 dark:text-white">
            Mulai Sekarang
          </h4>
          <div class="flex flex-col gap-2.5">
            <p class="text-xs font-poppins text-neutral-500 dark:text-neutral-400 leading-relaxed">
              Konsultan pendamping kami siap membantu usahamu menata fundamental bisnis hari ini.
            </p>
            <NuxtLink to="/daftar" class="inline-flex items-center gap-1.5 font-poppins font-bold text-xs text-[#0081A0] dark:text-[#2091AA] hover:underline">
              <span>Daftar Usahamu</span>
              <span>→</span>
            </NuxtLink>
          </div>
        </div>
      </div>

      <!-- Bottom Bar -->
      <div class="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p class="text-[11px] font-poppins text-neutral-400 leading-normal">
          © 2026 Beruang (Ber-Uang) Indonesia. Hak Cipta Dilindungi.
        </p>
        <div class="flex items-center gap-4 text-[11px] font-poppins text-neutral-400">
          <NuxtLink to="/faq" class="hover:underline">Kebijakan Privasi</NuxtLink>
          <NuxtLink to="/faq" class="hover:underline">Syarat & Ketentuan</NuxtLink>
          <NuxtLink to="/faq" class="hover:underline">Pedoman Audit</NuxtLink>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
// Clean scaled footer
</script>
