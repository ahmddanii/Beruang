<template>
  <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
    <div class="rounded-3xl bg-white dark:bg-[#151519] border border-neutral-200/90 dark:border-neutral-800 p-8 sm:p-12 lg:p-14 shadow-xs relative overflow-hidden space-y-8">
      <!-- Section Header Marker -->
      <div class="flex items-center justify-between pb-4 border-b border-neutral-100 dark:border-neutral-800">
        <span class="text-[11px] font-mono font-bold uppercase tracking-wider text-primary-600 dark:text-primary-400">
          § 04 // BUKTI LAPANGAN & TRANSFORMASI KAS
        </span>
        <span class="text-xs font-mono text-neutral-400">
          STUDI KASUS VALIDASI #0192
        </span>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        <!-- Story Narrative & Before-After Ledger (Col 7) -->
        <div class="lg:col-span-7 space-y-5">
          <h3 class="text-2xl sm:text-3xl font-heading font-extrabold text-neutral-900 dark:text-white tracking-tight leading-snug">
            "Dari pembukuan tercampur uang dapur, kini Kopi Senja tersertifikasi Grade A dan berhasil membuka gerai ke-4."
          </h3>

          <p class="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed font-sans">
            Selama 4 bulan didampingi konsultan Dra. Maya Suryani, kami merapikan kartu stok barista, memisahkan giro rekening, dan mempertahankan margin bersih di 32.6%. Kepercayaan itu yang membuat sindikasi investor menyuntikkan tiket modal Rp 250 Juta.
          </p>

          <!-- Before vs After Financial Comparison Ledger (Anti-Slop: Real concrete business metrics) -->
          <div class="grid grid-cols-2 gap-3 font-mono text-xs pt-2">
            <div class="p-4 rounded-2xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200/70 dark:border-neutral-800 space-y-1">
              <span class="text-[10px] text-neutral-400 uppercase font-bold block">Sebelum Pendampingan (April)</span>
              <span class="font-extrabold text-neutral-800 dark:text-neutral-200 block text-sm">Modal Jualan 56.4% (Bocor)</span>
              <span class="text-[11px] text-neutral-500 font-sans block">Rekening campur dompet pribadi</span>
            </div>

            <div class="p-4 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 space-y-1">
              <span class="text-[10px] text-emerald-700 dark:text-emerald-400 uppercase font-bold block">Sesudah Pendampingan (September)</span>
              <span class="font-extrabold text-emerald-700 dark:text-emerald-300 block text-sm">Untung Bersih 32.6%</span>
              <span class="text-[11px] text-emerald-800 dark:text-emerald-400 font-sans block">3.2 Bulan kas cadangan terpisah</span>
            </div>
          </div>

          <div class="pt-2 flex items-center gap-3 text-xs">
            <span class="text-neutral-900 dark:text-white font-heading font-bold text-sm">Budi Setiawan</span>
            <span class="text-neutral-400">•</span>
            <span class="text-neutral-500 dark:text-neutral-400 font-mono">Founder Kopi Senja Nusantara (Bandung)</span>
          </div>
        </div>

        <!-- Syndicate Investment Proof Box (Col 5) -->
        <div class="lg:col-span-5 p-6 sm:p-8 rounded-3xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 space-y-5 text-center">
          <div class="space-y-1">
            <span class="text-[10px] font-mono uppercase tracking-wider text-neutral-400 font-bold block">
              Alokasi Tiket Modal Tersalur
            </span>
            <span class="text-3xl sm:text-4xl font-heading font-extrabold text-primary-500 tabular-nums font-mono block">
              Rp 250.000.000
            </span>
            <span class="text-xs text-emerald-600 dark:text-emerald-400 font-mono font-bold block">
              Bagi Hasil Usaha 12% p.a. • BEP 18 Bulan
            </span>
          </div>

          <div class="p-3.5 rounded-xl bg-white dark:bg-neutral-950 border border-neutral-200/70 dark:border-neutral-800 text-xs text-left space-y-1.5 font-mono">
            <div class="flex justify-between">
              <span class="text-neutral-500 font-sans">Sindikasi:</span>
              <span class="font-bold text-neutral-900 dark:text-white">Nusantara Angel Syndicate</span>
            </div>
            <div class="flex justify-between">
              <span class="text-neutral-500 font-sans">Konsultan Ahli:</span>
              <span>Dra. Maya Suryani (BNSP #7281)</span>
            </div>
            <div class="flex justify-between">
              <span class="text-neutral-500 font-sans">Peruntukan:</span>
              <span class="text-emerald-600 font-bold font-sans">Pembukaan Gerai Ke-4</span>
            </div>
          </div>

          <NuxtLink
            to="/daftar"
            class="block w-full py-3.5 rounded-xl font-heading font-bold text-xs bg-primary-500 hover:bg-primary-600 text-white shadow-xs transition-all"
          >
            Cek Kesiapan Bisnismu Sendiri →
          </NuxtLink>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
// Anti-slop case study ledger
</script>
