<template>
  <section class="max-w-7xl mx-auto px-4 sm:px-8 lg:px-8 pb-24">
    <div class="rounded-[24px] bg-white dark:bg-[#15161A] border border-[#EAEAEA] dark:border-[#26272F] p-8 lg:p-16 shadow-xs relative overflow-hidden flex flex-col gap-12">
      
      <!-- Section Header Marker -->
      <div class="flex items-center justify-between pb-6 border-b border-[#EAEAEA] dark:border-[#26272F]">
        <span class="text-[12px]  font-bold uppercase tracking-wider text-primary-600 dark:text-primary-400 leading-[16px]">
          § 04 // BUKTI LAPANGAN & TRANSFORMASI KAS
        </span>
        <span class="text-[12px]  text-neutral-400 leading-[16px]">
          STUDI KASUS AUDIT #0192
        </span>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
        <!-- Story Narrative & Before-After Ledger (Col 7) -->
        <div class="lg:col-span-7 flex flex-col gap-8">
          <h3 class="text-[26px] sm:text-[42px]  font-extrabold text-neutral-900 dark:text-white tracking-tight leading-[32px] sm:leading-[52px]">
            "Dari pembukuan tercampur uang dapur, kini Kopi Senja tersertifikasi Grade A dan berhasil membuka gerai ke-4."
          </h3>

          <p class="text-[16px] text-neutral-600 dark:text-neutral-300 leading-[24px] ">
            Selama 4 bulan didampingi konsultan Dra. Maya Suryani, kami merapikan kartu stok barista, memisahkan giro rekening, dan mempertahankan margin bersih di 32.6%. Kepercayaan itu yang membuat sindikasi investor menyuntikkan tiket modal Rp 250 Juta.
          </p>

          <!-- Before vs After Financial Comparison Ledger -->
          <div class="grid grid-cols-2 gap-4  text-[16px] pt-4">
            <div class="p-6 rounded-[16px] bg-[#FAFAFA] dark:bg-[#0F1014] border border-[#EAEAEA] dark:border-[#26272F] flex flex-col gap-2">
              <span class="text-[12px] text-neutral-400 uppercase font-bold block leading-[16px]">Sebelum Audit (April)</span>
              <span class="font-extrabold text-neutral-800 dark:text-neutral-200 block leading-[24px]">HPP 56.4% (Bocor)</span>
              <span class="text-[12px] text-neutral-500  block leading-[16px]">Rekening campur pribadi</span>
            </div>

            <div class="p-6 rounded-[16px] bg-emerald-50/70 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 flex flex-col gap-2">
              <span class="text-[12px] text-emerald-700 dark:text-emerald-400 uppercase font-bold block leading-[16px]">Sesudah Audit (September)</span>
              <span class="font-extrabold text-emerald-700 dark:text-emerald-300 block leading-[24px]">Laba Bersih 32.6%</span>
              <span class="text-[12px] text-emerald-800 dark:text-emerald-400  block leading-[16px]">3.2 Bulan kas terpisah</span>
            </div>
          </div>

          <div class="pt-4 flex items-center gap-3 text-[16px]">
            <span class="text-neutral-900 dark:text-white  font-bold leading-[24px]">Budi Setiawan</span>
            <span class="text-neutral-400 leading-[24px]">•</span>
            <span class="text-neutral-500 dark:text-neutral-400  leading-[24px]">Founder Kopi Senja (Bandung)</span>
          </div>
        </div>

        <!-- Syndicate Investment Proof Box (Col 5) -->
        <div class="lg:col-span-5 p-8 rounded-[24px] bg-[#FAFAFA] dark:bg-[#0F1014] border border-[#EAEAEA] dark:border-[#26272F] flex flex-col gap-8 text-center">
          <div class="flex flex-col gap-4">
            <span class="text-[12px]  uppercase tracking-wider text-neutral-400 font-bold block leading-[16px]">
              Alokasi Tiket Modal Tersalur
            </span>
            <span class="text-[42px]  font-extrabold text-primary-500 tabular-nums  block leading-[52px]">
              Rp 250 Jt
            </span>
            <span class="text-[16px] text-emerald-600 dark:text-emerald-400  font-bold block leading-[24px]">
              Bagi Hasil 12% p.a. • BEP 18 Bulan
            </span>
          </div>

          <div class="p-6 rounded-[16px] bg-white dark:bg-[#15161A] border border-[#EAEAEA] dark:border-[#26272F] text-[16px] text-left flex flex-col gap-3  leading-[24px]">
            <div class="flex justify-between">
              <span class="text-neutral-500 ">Sindikasi:</span>
              <span class="font-bold text-neutral-900 dark:text-white">Nusantara Angel</span>
            </div>
            <div class="flex justify-between">
              <span class="text-neutral-500 ">Konsultan:</span>
              <span>Dra. Maya Suryani (BNSP)</span>
            </div>
            <div class="flex justify-between">
              <span class="text-neutral-500 ">Peruntukan:</span>
              <span class="text-emerald-600 font-bold ">Ekspansi Gerai Ke-4</span>
            </div>
          </div>

          <NuxtLink
            to="/daftar"
            class="block w-full py-4 rounded-[12px]  font-bold text-[16px] bg-primary-500 hover:bg-primary-600 text-white shadow-xs transition-all active:scale-[0.98] leading-[24px]"
          >
            Mulai Audit Bisnismu Sendiri →
          </NuxtLink>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
// Anti-slop case study ledger
</script>
