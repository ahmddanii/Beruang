<template>
  <div class="min-h-screen min-h-dvh w-full bg-[#FAFAFA] dark:bg-[#0F1014] text-neutral-900 dark:text-neutral-100 flex flex-col justify-start sm:justify-center items-center px-4 py-8 sm:py-12 select-none relative font-sans overflow-x-hidden">
    
    <!-- Subtle Ambient Background Glow -->
    <div class="pointer-events-none absolute top-1/4 left-1/2 -translate-x-1/2 w-[520px] h-[520px] bg-primary-500/4 dark:bg-primary-500/8 rounded-full blur-3xl" />

    <!-- Atmospheric Layered Cloud Horizon -->
    <BCloudBackground :fixed="true" />

    <!-- TOP-LEFT: Pill Button "Kembali ke Beranda" -->
    <div class="fixed top-6 left-6 sm:top-8 sm:left-8 z-30">
      <NuxtLink
        to="/"
        class="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white dark:bg-[#18191E] border border-[#EAEAEA] dark:border-[#26272F] text-neutral-800 dark:text-neutral-200 text-xs sm:text-sm font-semibold shadow-xs hover:bg-neutral-50 dark:hover:bg-[#22252E] hover:border-neutral-300 dark:hover:border-neutral-700 transition-colors duration-150"
      >
        <HugeiconsIcon :icon="ArrowLeft02Icon" :size="16" :stroke-width="2.2" />
        <span>Kembali ke Beranda</span>
      </NuxtLink>
    </div>

    <!-- Center Flow Container -->
    <div class="relative z-10 w-full max-w-2xl mx-auto my-auto space-y-4 pt-14 sm:pt-6 pb-12">
      
      <!-- Top Brand Header & Role Switcher -->
      <div class="flex items-center justify-between flex-wrap gap-2">
        <NuxtLink to="/" class="flex items-center gap-2.5 group">
          <img src="/logo/logoSmall.svg" alt="Beruang Logo" class="h-8 w-auto object-contain transition-transform group-hover:scale-105" />
          <div class="text-left">
            <span class="font-heading font-extrabold text-xl tracking-tight leading-none select-none block">
              <span class="text-[#0081A0] dark:text-[#00A5CC]">Ber</span><span class="text-[#00AA13] dark:text-[#22C55E]">uang</span>
            </span>
            <span class="text-[11px] font-semibold text-primary-600 dark:text-primary-400">
              {{ roleHeaderTitle }}
            </span>
          </div>
        </NuxtLink>

        <!-- Role Quick Switcher -->
        <div class="flex items-center gap-2">
          <div class="p-1 rounded-full bg-neutral-100/90 dark:bg-neutral-850/80 border border-neutral-200/80 dark:border-neutral-700/70 flex gap-1">
            <button
              v-for="r in availableRoles"
              :key="r.key"
              type="button"
              :class="[
                'px-2.5 py-1 rounded-full text-[11px] font-bold transition-all cursor-pointer',
                activeRole === r.key
                  ? 'bg-white dark:bg-[#18191E] text-primary-600 dark:text-primary-400 shadow-2xs'
                  : 'text-neutral-500 hover:text-neutral-900 dark:hover:text-white'
              ]"
              @click="switchRole(r.key)"
            >
              {{ r.label }}
            </button>
          </div>
          <span class="inline-flex items-center px-3 py-1 rounded-full bg-white dark:bg-[#18191E] border border-[#EAEAEA] dark:border-[#26272F] text-xs text-neutral-600 dark:text-neutral-300 font-semibold shadow-2xs tabular-nums">
            {{ currentStep }} / {{ currentStepsList.length }}
          </span>
        </div>
      </div>

      <!-- Stepper Component -->
      <div class="p-3 sm:p-4 rounded-2xl bg-white/80 dark:bg-[#18191E]/80 backdrop-blur-md border border-[#EAEAEA] dark:border-[#26272F] shadow-xs">
        <BStepper :steps="currentStepsList" :current-step="currentStep" />
      </div>

      <!-- Main Form Container -->
      <div class="bg-white/95 dark:bg-[#18191E]/95 backdrop-blur-md rounded-3xl border border-[#EAEAEA] dark:border-[#26272F] shadow-sm p-6 sm:p-8">
        
        <!-- ================================================================= -->
        <!-- ROLE 1: UMKM ONBOARDING                                           -->
        <!-- ================================================================= -->
        <template v-if="activeRole === 'UMKM'">
          <!-- Step 1: Identitas Usaha -->
          <div v-if="currentStep === 1" class="space-y-3.5">
            <div class="flex items-center gap-3 mb-2">
              <div class="w-10 h-10 rounded-xl bg-primary-50 dark:bg-primary-950 text-primary-600 flex items-center justify-center shrink-0">
                <HugeiconsIcon :icon="Building01Icon" :size="20" :stroke-width="1.75" />
              </div>
              <div class="text-left">
                <h3 class="font-bold text-base sm:text-lg text-neutral-900 dark:text-neutral-50">
                  1. Tentang Usahamu
                </h3>
                <p class="text-xs text-neutral-500">
                  Isi nama usaha dan status izin saat ini.
                </p>
              </div>
            </div>

            <div class="text-left space-y-1">
              <label class="block text-xs font-semibold text-neutral-700 dark:text-neutral-300">
                Nama Usaha
              </label>
              <input
                v-model="formUmkm.name"
                type="text"
                required
                placeholder="contoh: Kopi Senja Nusantara"
                class="w-full px-3.5 py-2.5 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-sm focus:ring-2 focus:ring-primary-500 focus:outline-none"
              />
            </div>

            <div class="text-left space-y-1">
              <label class="block text-xs font-semibold text-neutral-700 dark:text-neutral-300">
                Nama Pemilik
              </label>
              <input
                v-model="formUmkm.owner"
                type="text"
                required
                placeholder="contoh: Fikri Setiawan"
                class="w-full px-3.5 py-2.5 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-sm focus:ring-2 focus:ring-primary-500 focus:outline-none"
              />
            </div>

            <div class="grid grid-cols-2 gap-3 text-left">
              <div class="space-y-1">
                <label class="block text-xs font-semibold text-neutral-700 dark:text-neutral-300">
                  Tahun Mulai
                </label>
                <input
                  v-model.number="formUmkm.year"
                  type="number"
                  min="2000"
                  max="2026"
                  class="w-full px-3.5 py-2.5 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-sm focus:ring-2 focus:ring-primary-500 focus:outline-none tabular-nums"
                />
              </div>
              <div class="space-y-1">
                <label class="block text-xs font-semibold text-neutral-700 dark:text-neutral-300">
                  Status Izin Usaha
                </label>
                <select
                  v-model="formUmkm.legalStatus"
                  class="w-full px-3.5 py-2.5 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-sm focus:ring-2 focus:ring-primary-500 focus:outline-none"
                >
                  <option value="NIB_READY">Sudah ada NIB (Izin Resmi)</option>
                  <option value="HALAL_READY">NIB + Sertifikat Halal</option>
                  <option value="IN_PROGRESS">Sedang mengurus izin</option>
                  <option value="NONE">Belum ada izin</option>
                </select>
              </div>
            </div>

            <div class="grid grid-cols-2 gap-3 text-left">
              <div class="space-y-1">
                <label class="block text-xs font-semibold text-neutral-700 dark:text-neutral-300">
                  Nomor NIB (Bila ada)
                </label>
                <input
                  v-model="formUmkm.nib"
                  type="text"
                  placeholder="contoh: 1209000123456"
                  class="w-full px-3.5 py-2.5 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-sm focus:ring-2 focus:ring-primary-500 focus:outline-none tabular-nums"
                />
              </div>
              <div class="space-y-1">
                <label class="block text-xs font-semibold text-neutral-700 dark:text-neutral-300">
                  NPWP Usaha (Bila ada)
                </label>
                <input
                  v-model="formUmkm.npwp"
                  type="text"
                  placeholder="81.423.891.4-429.000"
                  class="w-full px-3.5 py-2.5 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-sm focus:ring-2 focus:ring-primary-500 focus:outline-none tabular-nums"
                />
              </div>
            </div>
          </div>

          <!-- Step 2: Sektor & Lokasi/Outlet -->
          <div v-else-if="currentStep === 2" class="space-y-3.5">
            <div class="flex items-center gap-3 mb-2">
              <div class="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-950 text-amber-600 flex items-center justify-center shrink-0">
                <HugeiconsIcon :icon="Store01Icon" :size="20" :stroke-width="1.75" />
              </div>
              <div class="text-left">
                <h3 class="font-bold text-base sm:text-lg text-neutral-900 dark:text-neutral-50">
                  2. Bidang & Lokasi Usaha
                </h3>
                <p class="text-xs text-neutral-500">
                  Pilih bidang usaha dan sebaran tokomu.
                </p>
              </div>
            </div>

            <div class="text-left space-y-1.5">
              <label class="block text-xs font-semibold text-neutral-700 dark:text-neutral-300">
                Bidang Usaha
              </label>
              <div class="grid grid-cols-2 sm:grid-cols-3 gap-2">
                <button
                  v-for="s in umkmSectors"
                  :key="s"
                  type="button"
                  :class="[
                    'p-2 rounded-xl text-xs font-semibold border transition-all text-center cursor-pointer',
                    formUmkm.sector === s
                      ? 'border-primary-500 bg-primary-50 text-primary-700 dark:bg-primary-950 dark:text-primary-300 font-bold'
                      : 'border-neutral-200 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 hover:border-neutral-300'
                  ]"
                  @click="formUmkm.sector = s"
                >
                  {{ s }}
                </button>
              </div>
            </div>

            <div class="text-left space-y-1">
              <label class="block text-xs font-semibold text-neutral-700 dark:text-neutral-300">
                Kota Usaha
              </label>
              <input
                v-model="formUmkm.city"
                type="text"
                placeholder="contoh: Bandung, Jawa Barat"
                class="w-full px-3.5 py-2.5 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-sm focus:ring-2 focus:ring-primary-500 focus:outline-none"
              />
            </div>

            <div class="grid grid-cols-2 gap-3 text-left">
              <div class="space-y-1">
                <label class="block text-xs font-semibold text-neutral-700 dark:text-neutral-300">
                  Jumlah Cabang / Gerai
                </label>
                <input
                  v-model.number="formUmkm.outlets"
                  type="number"
                  min="1"
                  class="w-full px-3.5 py-2.5 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-sm focus:ring-2 focus:ring-primary-500 focus:outline-none tabular-nums"
                />
              </div>
              <div class="space-y-1">
                <label class="block text-xs font-semibold text-neutral-700 dark:text-neutral-300">
                  Jumlah Karyawan
                </label>
                <input
                  v-model.number="formUmkm.employees"
                  type="number"
                  min="1"
                  class="w-full px-3.5 py-2.5 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-sm focus:ring-2 focus:ring-primary-500 focus:outline-none tabular-nums"
                />
              </div>
            </div>
          </div>

          <!-- Step 3: Baseline Finansial -->
          <div v-else-if="currentStep === 3" class="space-y-3.5">
            <div class="flex items-center gap-3 mb-2">
              <div class="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950 text-emerald-600 flex items-center justify-center shrink-0">
                <HugeiconsIcon :icon="Coins01Icon" :size="20" :stroke-width="1.75" />
              </div>
              <div class="text-left">
                <h3 class="font-bold text-base sm:text-lg text-neutral-900 dark:text-neutral-50">
                  3. Keuangan Usaha
                </h3>
                <p class="text-xs text-neutral-500">
                  Perkiraan angka kas bulananmu (tidak perlu persis).
                </p>
              </div>
            </div>

            <div class="text-left space-y-1">
              <label class="block text-xs font-semibold text-neutral-700 dark:text-neutral-300">
                Rata-rata Penjualan / Bulan (Rp)
              </label>
              <input
                v-model.number="formUmkm.monthlyRevenue"
                type="number"
                step="1000000"
                placeholder="contoh: 50000000"
                class="w-full px-3.5 py-2.5 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-sm focus:ring-2 focus:ring-primary-500 focus:outline-none tabular-nums"
              />
              <span class="text-[11px] text-neutral-500 block tabular-nums">
                Rp {{ (formUmkm.monthlyRevenue || 0).toLocaleString('id-ID') }}
              </span>
            </div>

            <div class="grid grid-cols-2 gap-3 text-left">
              <div class="space-y-1">
                <label class="block text-xs font-semibold text-neutral-700 dark:text-neutral-300">
                  Modal Bahan (%)
                </label>
                <input
                  v-model.number="formUmkm.hppPercentage"
                  type="number"
                  min="10"
                  max="90"
                  placeholder="40"
                  class="w-full px-3.5 py-2.5 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-sm focus:ring-2 focus:ring-primary-500 focus:outline-none tabular-nums"
                />
                <span class="text-[10px] text-neutral-400">Persen biaya beli stok/bahan</span>
              </div>
              <div class="space-y-1">
                <label class="block text-xs font-semibold text-neutral-700 dark:text-neutral-300">
                  Kebutuhan Modal (Rp)
                </label>
                <input
                  v-model.number="formUmkm.targetFunding"
                  type="number"
                  step="5000000"
                  placeholder="150000000"
                  class="w-full px-3.5 py-2.5 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-sm focus:ring-2 focus:ring-primary-500 focus:outline-none tabular-nums"
                />
                <span class="text-[10px] text-neutral-400">Modal yang ingin dicari</span>
              </div>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 text-left">
              <div class="space-y-1">
                <label class="block text-xs font-semibold text-neutral-700 dark:text-neutral-300">
                  Tawaran Bagi Hasil / Modal
                </label>
                <select
                  v-model="formUmkm.equityOffered"
                  class="w-full px-3.5 py-2.5 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-sm focus:ring-2 focus:ring-primary-500 focus:outline-none"
                >
                  <option value="5% Bagi Hasil">5% Bagi Hasil</option>
                  <option value="10% Bagi Hasil">10% Bagi Hasil</option>
                  <option value="15% Bagi Hasil">15% Bagi Hasil</option>
                  <option value="20% Bagi Hasil">20% Bagi Hasil</option>
                  <option value="Sesuai Diskusi">Sesuai Diskusi Nanti</option>
                </select>
              </div>
              <div class="space-y-1">
                <label class="block text-xs font-semibold text-neutral-700 dark:text-neutral-300">
                  Cerita Singkat Usaha
                </label>
                <input
                  v-model="formUmkm.description"
                  type="text"
                  placeholder="contoh: Kedai kopi susu gula aren dengan 3 outlet..."
                  class="w-full px-3.5 py-2.5 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-sm focus:ring-2 focus:ring-primary-500 focus:outline-none"
                />
              </div>
            </div>
          </div>

          <!-- Step 4: Ringkasan & Konfirmasi -->
          <div v-else class="space-y-4">
            <div class="text-center mb-3">
              <div class="w-11 h-11 rounded-2xl bg-emerald-50 dark:bg-emerald-950 text-emerald-600 flex items-center justify-center mx-auto mb-2">
                <HugeiconsIcon :icon="CheckmarkBadge01Icon" :size="24" :stroke-width="2" />
              </div>
              <h3 class="font-extrabold text-lg sm:text-xl text-neutral-900 dark:text-neutral-50">
                Data Usaha Siap Disimpan!
              </h3>
              <p class="text-xs text-neutral-500 max-w-sm mx-auto">
                Konsultan Beruang akan meninjau dan membantu rencana usahamu.
              </p>
            </div>

            <div class="p-3.5 rounded-xl bg-neutral-50 dark:bg-neutral-800/80 border border-neutral-200 dark:border-neutral-700 text-xs space-y-2">
              <div class="flex justify-between border-b border-neutral-200/60 dark:border-neutral-700/60 pb-2">
                <span class="text-neutral-500">Nama Usaha:</span>
                <span class="font-bold text-neutral-900 dark:text-white">{{ formUmkm.name }}</span>
              </div>
              <div class="flex justify-between border-b border-neutral-200/60 dark:border-neutral-700/60 pb-2">
                <span class="text-neutral-500">Bidang & Kota:</span>
                <span class="font-semibold">{{ formUmkm.sector }} • {{ formUmkm.city }}</span>
              </div>
              <div class="flex justify-between border-b border-neutral-200/60 dark:border-neutral-700/60 pb-2">
                <span class="text-neutral-500">Cabang & Tim:</span>
                <span class="font-semibold">{{ formUmkm.outlets }} Gerai • {{ formUmkm.employees }} Orang</span>
              </div>
              <div class="flex justify-between border-b border-neutral-200/60 dark:border-neutral-700/60 pb-2">
                <span class="text-neutral-500">Penjualan / Bulan:</span>
                <span class="font-semibold tabular-nums">Rp {{ (formUmkm.monthlyRevenue || 0).toLocaleString('id-ID') }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-neutral-500">Kebutuhan Modal:</span>
                <span class="font-bold text-primary-600 tabular-nums">
                  Rp {{ (formUmkm.targetFunding || 0).toLocaleString('id-ID') }}
                </span>
              </div>
            </div>
          </div>
        </template>

        <!-- ================================================================= -->
        <!-- ROLE 2: CONSULTANT ONBOARDING                                     -->
        <!-- ================================================================= -->
        <template v-else-if="activeRole === 'CONSULTANT'">
          <!-- Step 1: Kredensial & Sertifikasi BNSP -->
          <div v-if="currentStep === 1" class="space-y-3.5">
            <div class="flex items-center gap-3 mb-2">
              <div class="w-10 h-10 rounded-xl bg-primary-50 dark:bg-primary-950 text-primary-600 flex items-center justify-center shrink-0">
                <HugeiconsIcon :icon="Award01Icon" :size="20" :stroke-width="1.75" />
              </div>
              <div class="text-left">
                <h3 class="font-bold text-base sm:text-lg text-neutral-900 dark:text-neutral-50">
                  1. Data Diri & Izin
                </h3>
                <p class="text-xs text-neutral-500">
                  Data diri dan sertifikat pendamping UMKM.
                </p>
              </div>
            </div>

            <div class="text-left space-y-1">
              <label class="block text-xs font-semibold text-neutral-700 dark:text-neutral-300">
                Nama Lengkap & Gelar
              </label>
              <input
                v-model="formConsultant.name"
                type="text"
                required
                placeholder="contoh: Dra. Maya Suryani, M.M."
                class="w-full px-3.5 py-2.5 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-sm focus:ring-2 focus:ring-primary-500 focus:outline-none"
              />
            </div>

            <div class="text-left space-y-1">
              <label class="block text-xs font-semibold text-neutral-700 dark:text-neutral-300">
                Nama Kantor / Lembaga
              </label>
              <input
                v-model="formConsultant.institution"
                type="text"
                placeholder="contoh: Maya Advisory atau Mandiri"
                class="w-full px-3.5 py-2.5 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-sm focus:ring-2 focus:ring-primary-500 focus:outline-none"
              />
            </div>

            <div class="grid grid-cols-2 gap-3 text-left">
              <div class="space-y-1">
                <label class="block text-xs font-semibold text-neutral-700 dark:text-neutral-300">
                  Nomor Sertifikat BNSP
                </label>
                <input
                  v-model="formConsultant.bnspLicense"
                  type="text"
                  placeholder="BNSP-KONS-2024-8891"
                  class="w-full px-3.5 py-2.5 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-sm focus:ring-2 focus:ring-primary-500 focus:outline-none tabular-nums"
                />
              </div>
              <div class="space-y-1">
                <label class="block text-xs font-semibold text-neutral-700 dark:text-neutral-300">
                  Kota Tinggal
                </label>
                <input
                  v-model="formConsultant.city"
                  type="text"
                  placeholder="contoh: Jakarta Selatan"
                  class="w-full px-3.5 py-2.5 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-sm focus:ring-2 focus:ring-primary-500 focus:outline-none"
                />
              </div>
            </div>
          </div>

          <!-- Step 2: Spesialisasi & Kapasitas Pendampingan -->
          <div v-else-if="currentStep === 2" class="space-y-3.5">
            <div class="flex items-center gap-3 mb-2">
              <div class="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-950 text-amber-600 flex items-center justify-center shrink-0">
                <HugeiconsIcon :icon="UserGroupIcon" :size="20" :stroke-width="1.75" />
              </div>
              <div class="text-left">
                <h3 class="font-bold text-base sm:text-lg text-neutral-900 dark:text-neutral-50">
                  2. Keahlian & Jumlah UMKM
                </h3>
                <p class="text-xs text-neutral-500">
                  Pilih bidang yang kamu kuasai dan kapasitas bantuanmu.
                </p>
              </div>
            </div>

            <div class="text-left space-y-1.5">
              <label class="block text-xs font-semibold text-neutral-700 dark:text-neutral-300">
                Bidang Keahlian
              </label>
              <div class="grid grid-cols-2 gap-2">
                <button
                  v-for="sp in consultantSpecializations"
                  :key="sp"
                  type="button"
                  :class="[
                    'p-2 rounded-xl text-xs font-semibold border transition-all text-center cursor-pointer',
                    formConsultant.specialization === sp
                      ? 'border-primary-500 bg-primary-50 text-primary-700 dark:bg-primary-950 dark:text-primary-300 font-bold'
                      : 'border-neutral-200 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 hover:border-neutral-300'
                  ]"
                  @click="formConsultant.specialization = sp"
                >
                  {{ sp }}
                </button>
              </div>
            </div>

            <div class="grid grid-cols-2 gap-3 text-left">
              <div class="space-y-1">
                <label class="block text-xs font-semibold text-neutral-700 dark:text-neutral-300">
                  Lama Pengalaman
                </label>
                <select
                  v-model="formConsultant.experience"
                  class="w-full px-3.5 py-2.5 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-sm focus:ring-2 focus:ring-primary-500 focus:outline-none"
                >
                  <option value="5+ Tahun">> 5 Tahun</option>
                  <option value="3-5 Tahun">3 - 5 Tahun</option>
                  <option value="1-3 Tahun">1 - 3 Tahun</option>
                </select>
              </div>
              <div class="space-y-1">
                <label class="block text-xs font-semibold text-neutral-700 dark:text-neutral-300">
                  Maksimal UMKM yang Dibantu
                </label>
                <select
                  v-model.number="formConsultant.maxClients"
                  class="w-full px-3.5 py-2.5 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-sm focus:ring-2 focus:ring-primary-500 focus:outline-none"
                >
                  <option :value="5">5 Usaha</option>
                  <option :value="10">10 Usaha</option>
                  <option :value="15">15 Usaha</option>
                </select>
              </div>
            </div>
          </div>

          <!-- Step 3: Janji Pendamping -->
          <div v-else class="space-y-4">
            <div class="text-center mb-3">
              <div class="w-11 h-11 rounded-2xl bg-emerald-50 dark:bg-emerald-950 text-emerald-600 flex items-center justify-center mx-auto mb-2">
                <HugeiconsIcon :icon="CheckmarkBadge01Icon" :size="24" :stroke-width="2" />
              </div>
              <h3 class="font-extrabold text-lg sm:text-xl text-neutral-900 dark:text-neutral-50">
                Janji Pendamping
              </h3>
              <p class="text-xs text-neutral-500 max-w-sm mx-auto">
                Tiga janji utama untuk menjaga kepercayaan pelaku usaha.
              </p>
            </div>

            <!-- Profile Overview -->
            <div class="p-3.5 rounded-xl bg-neutral-50 dark:bg-neutral-800/80 border border-neutral-200 dark:border-neutral-700 text-xs space-y-1.5">
              <div class="flex justify-between border-b border-neutral-200/60 dark:border-neutral-700/60 pb-1.5">
                <span class="text-neutral-500">Konsultan:</span>
                <span class="font-bold text-neutral-900 dark:text-white">{{ formConsultant.name }}</span>
              </div>
              <div class="flex justify-between border-b border-neutral-200/60 dark:border-neutral-700/60 pb-1.5">
                <span class="text-neutral-500">Sertifikat:</span>
                <span class="font-semibold text-emerald-600 dark:text-emerald-400 tabular-nums">{{ formConsultant.bnspLicense }}</span>
              </div>
              <div class="flex justify-between border-b border-neutral-200/60 dark:border-neutral-700/60 pb-1.5">
                <span class="text-neutral-500">Keahlian:</span>
                <span class="font-semibold">{{ formConsultant.specialization }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-neutral-500">Kapasitas:</span>
                <span class="font-semibold">{{ formConsultant.maxClients }} Usaha (Pengalaman {{ formConsultant.experience }})</span>
              </div>
            </div>

            <!-- Ethics Checklist -->
            <div class="space-y-2 pt-1 text-left">
              <label class="flex items-center gap-2.5 p-2.5 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-850/60 cursor-pointer">
                <input
                  v-model="formConsultant.agreeConfidentiality"
                  type="checkbox"
                  class="rounded text-primary-600 focus:ring-primary-500"
                />
                <span class="text-xs text-neutral-700 dark:text-neutral-300">
                  Jaga rahasia data keuangan dan bukti rekening UMKM.
                </span>
              </label>

              <label class="flex items-center gap-2.5 p-2.5 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-850/60 cursor-pointer">
                <input
                  v-model="formConsultant.agreeSla"
                  type="checkbox"
                  class="rounded text-primary-600 focus:ring-primary-500"
                />
                <span class="text-xs text-neutral-700 dark:text-neutral-300">
                  Beri tanggapan dan masukan maksimal 3 hari kerja.
                </span>
              </label>

              <label class="flex items-center gap-2.5 p-2.5 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-850/60 cursor-pointer">
                <input
                  v-model="formConsultant.agreeObjective"
                  type="checkbox"
                  class="rounded text-primary-600 focus:ring-primary-500"
                />
                <span class="text-xs text-neutral-700 dark:text-neutral-300">
                  Beri penilaian jujur dan adil tanpa memihak.
                </span>
              </label>
            </div>
          </div>
        </template>

        <!-- ================================================================= -->
        <!-- ROLE 3: INVESTOR ONBOARDING                                       -->
        <!-- ================================================================= -->
        <template v-else-if="activeRole === 'INVESTOR'">
          <!-- Step 1: Profil Entitas Investor -->
          <div v-if="currentStep === 1" class="space-y-3.5">
            <div class="flex items-center gap-3 mb-2">
              <div class="w-10 h-10 rounded-xl bg-primary-50 dark:bg-primary-950 text-primary-600 flex items-center justify-center shrink-0">
                <HugeiconsIcon :icon="Coins01Icon" :size="20" :stroke-width="1.75" />
              </div>
              <div class="text-left">
                <h3 class="font-bold text-base sm:text-lg text-neutral-900 dark:text-neutral-50">
                  1. Data Investor
                </h3>
                <p class="text-xs text-neutral-500">
                  Identitas pihak yang akan menanamkan modal.
                </p>
              </div>
            </div>

            <div class="text-left space-y-1">
              <label class="block text-xs font-semibold text-neutral-700 dark:text-neutral-300">
                Nama Lengkap
              </label>
              <input
                v-model="formInvestor.name"
                type="text"
                required
                placeholder="contoh: Hendro Wicaksono"
                class="w-full px-3.5 py-2.5 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-sm focus:ring-2 focus:ring-primary-500 focus:outline-none"
              />
            </div>

            <div class="text-left space-y-1">
              <label class="block text-xs font-semibold text-neutral-700 dark:text-neutral-300">
                Nama Perusahaan / Kelompok
              </label>
              <input
                v-model="formInvestor.entityName"
                type="text"
                placeholder="contoh: Nusantara Angel Syndicate atau Pribadi"
                class="w-full px-3.5 py-2.5 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-sm focus:ring-2 focus:ring-primary-500 focus:outline-none"
              />
            </div>

            <div class="grid grid-cols-2 gap-3 text-left">
              <div class="space-y-1">
                <label class="block text-xs font-semibold text-neutral-700 dark:text-neutral-300">
                  Jenis Investor
                </label>
                <select
                  v-model="formInvestor.investorType"
                  class="w-full px-3.5 py-2.5 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-sm focus:ring-2 focus:ring-primary-500 focus:outline-none"
                >
                  <option value="Pribadi">Pribadi / Perorangan</option>
                  <option value="Kelompok Modal">Kelompok Pemodal</option>
                  <option value="Perusahaan Modal">Perusahaan Modal Usaha</option>
                  <option value="Kantor Keluarga">Pengelola Dana Keluarga</option>
                </select>
              </div>
              <div class="space-y-1">
                <label class="block text-xs font-semibold text-neutral-700 dark:text-neutral-300">
                  Kota Asal
                </label>
                <input
                  v-model="formInvestor.city"
                  type="text"
                  placeholder="contoh: Jakarta Pusat"
                  class="w-full px-3.5 py-2.5 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-sm focus:ring-2 focus:ring-primary-500 focus:outline-none"
                />
              </div>
            </div>
          </div>

          <!-- Step 2: Kriteria Portofolio & Tiket Modal -->
          <div v-else-if="currentStep === 2" class="space-y-3.5">
            <div class="flex items-center gap-3 mb-2">
              <div class="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-950 text-amber-600 flex items-center justify-center shrink-0">
                <HugeiconsIcon :icon="Coins01Icon" :size="20" :stroke-width="1.75" />
              </div>
              <div class="text-left">
                <h3 class="font-bold text-base sm:text-lg text-neutral-900 dark:text-neutral-50">
                  2. Pilihan Modal & Bidang
                </h3>
                <p class="text-xs text-neutral-500">
                  Berapa modal yang disiapkan dan bidang apa yang disukai?
                </p>
              </div>
            </div>

            <div class="text-left space-y-1.5">
              <label class="block text-xs font-semibold text-neutral-700 dark:text-neutral-300">
                Kisaran Modal per Usaha
              </label>
              <div class="grid grid-cols-2 gap-2">
                <button
                  v-for="tr in ticketRanges"
                  :key="tr"
                  type="button"
                  :class="[
                    'p-2 rounded-xl text-xs font-semibold border transition-all text-center cursor-pointer',
                    formInvestor.ticketRange === tr
                      ? 'border-primary-500 bg-primary-50 text-primary-700 dark:bg-primary-950 dark:text-primary-300 font-bold'
                      : 'border-neutral-200 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 hover:border-neutral-300'
                  ]"
                  @click="formInvestor.ticketRange = tr"
                >
                  {{ tr }}
                </button>
              </div>
            </div>

            <div class="text-left space-y-1.5">
              <label class="block text-xs font-semibold text-neutral-700 dark:text-neutral-300">
                Bidang Usaha yang Dicari
              </label>
              <div class="grid grid-cols-2 sm:grid-cols-3 gap-2">
                <button
                  v-for="sec in investorTargetSectors"
                  :key="sec"
                  type="button"
                  :class="[
                    'p-2 rounded-xl text-xs font-semibold border transition-all text-center cursor-pointer',
                    formInvestor.sectors.includes(sec)
                      ? 'border-primary-500 bg-primary-50 text-primary-700 dark:bg-primary-950 dark:text-primary-300 font-bold'
                      : 'border-neutral-200 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 hover:border-neutral-300'
                  ]"
                  @click="toggleInvestorSector(sec)"
                >
                  {{ sec }}
                </button>
              </div>
            </div>

            <div class="text-left space-y-1">
              <label class="block text-xs font-semibold text-neutral-700 dark:text-neutral-300">
                Harapan Untung Bersih Usaha
              </label>
              <select
                v-model="formInvestor.minMargin"
                class="w-full px-3.5 py-2.5 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-sm focus:ring-2 focus:ring-primary-500 focus:outline-none"
              >
                <option value="25%">&gt; 25% (Untung Normal)</option>
                <option value="35%">&gt; 35% (Untung Tinggi)</option>
                <option value="50%">&gt; 50% (Untung Sangat Tinggi)</option>
              </select>
            </div>
          </div>

          <!-- Step 3: Janji Kerahasiaan -->
          <div v-else class="space-y-4">
            <div class="text-center mb-3">
              <div class="w-11 h-11 rounded-2xl bg-emerald-50 dark:bg-emerald-950 text-emerald-600 flex items-center justify-center mx-auto mb-2">
                <HugeiconsIcon :icon="CheckmarkBadge01Icon" :size="24" :stroke-width="2" />
              </div>
              <h3 class="font-extrabold text-lg sm:text-xl text-neutral-900 dark:text-neutral-50">
                Janji Kerahasiaan
              </h3>
              <p class="text-xs text-neutral-500 max-w-sm mx-auto">
                Jaga kerahasiaan data sebelum melihat buku kas usaha.
              </p>
            </div>

            <!-- Profile Summary -->
            <div class="p-3.5 rounded-xl bg-neutral-50 dark:bg-neutral-800/80 border border-neutral-200 dark:border-neutral-700 text-xs space-y-1.5">
              <div class="flex justify-between border-b border-neutral-200/60 dark:border-neutral-700/60 pb-1.5">
                <span class="text-neutral-500">Pemodal:</span>
                <span class="font-bold text-neutral-900 dark:text-white">{{ formInvestor.name }}</span>
              </div>
              <div class="flex justify-between border-b border-neutral-200/60 dark:border-neutral-700/60 pb-1.5">
                <span class="text-neutral-500">Lembaga / Tipe:</span>
                <span class="font-semibold">{{ formInvestor.entityName }} ({{ formInvestor.investorType }})</span>
              </div>
              <div class="flex justify-between border-b border-neutral-200/60 dark:border-neutral-700/60 pb-1.5">
                <span class="text-neutral-500">Kisaran Modal:</span>
                <span class="font-bold text-primary-600 tabular-nums">{{ formInvestor.ticketRange }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-neutral-500">Bidang Usaha:</span>
                <span class="font-semibold">{{ formInvestor.sectors.join(', ') || 'Semua Bidang' }}</span>
              </div>
            </div>

            <!-- Checklist -->
            <div class="space-y-2 pt-1 text-left">
              <label class="flex items-center gap-2.5 p-2.5 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-850/60 cursor-pointer">
                <input
                  v-model="formInvestor.agreeNda"
                  type="checkbox"
                  class="rounded text-primary-600 focus:ring-primary-500"
                />
                <span class="text-xs text-neutral-700 dark:text-neutral-300">
                  Tidak membocorkan data keuangan dan rahasia dagang UMKM.
                </span>
              </label>

              <label class="flex items-center gap-2.5 p-2.5 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-850/60 cursor-pointer">
                <input
                  v-model="formInvestor.agreeProtocol"
                  type="checkbox"
                  class="rounded text-primary-600 focus:ring-primary-500"
                />
                <span class="text-xs text-neutral-700 dark:text-neutral-300">
                  Hanya melihat laporan rinci jika sudah diizinkan pemilik usaha.
                </span>
              </label>
            </div>
          </div>
        </template>

        <!-- Step Navigation Buttons -->
        <div class="mt-6 pt-4 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-between">
          <button
            v-if="currentStep > 1"
            type="button"
            class="inline-flex items-center gap-2 h-10 px-5 rounded-full bg-white dark:bg-[#18191E] border border-[#EAEAEA] dark:border-[#26272F] text-neutral-800 dark:text-neutral-200 hover:bg-neutral-50 dark:hover:bg-[#22252E] font-semibold text-xs sm:text-sm transition-all cursor-pointer shadow-xs active:scale-[0.99]"
            @click="currentStep--"
          >
            <HugeiconsIcon :icon="ArrowLeft02Icon" :size="16" :stroke-width="2" />
            <span>Kembali</span>
          </button>
          <div v-else />

          <button
            v-if="currentStep < currentStepsList.length"
            type="button"
            class="inline-flex items-center gap-2 h-10 px-6 rounded-full bg-primary-600 hover:bg-primary-700 text-white font-bold text-xs sm:text-sm shadow-sm shadow-primary-600/20 active:scale-[0.99] transition-all cursor-pointer"
            @click="currentStep++"
          >
            <span>Lanjut</span>
            <HugeiconsIcon :icon="ArrowRight02Icon" :size="16" :stroke-width="2" />
          </button>

          <button
            v-else
            type="button"
            :disabled="submitting || (activeRole === 'CONSULTANT' && !isConsultantAgreed) || (activeRole === 'INVESTOR' && !isInvestorAgreed)"
            :class="[
              'inline-flex items-center gap-2 h-10 px-6 rounded-full font-bold text-xs sm:text-sm shadow-sm transition-all',
              (activeRole === 'CONSULTANT' && !isConsultantAgreed) || (activeRole === 'INVESTOR' && !isInvestorAgreed)
                ? 'bg-neutral-200 dark:bg-neutral-800 text-neutral-400 dark:text-neutral-500 cursor-not-allowed'
                : 'bg-primary-600 hover:bg-primary-700 text-white shadow-primary-600/20 active:scale-[0.99] cursor-pointer'
            ]"
            @click="finishOnboarding"
          >
            <span v-if="submitting">Menyimpan...</span>
            <template v-else>
              <span>{{ finishButtonLabel }}</span>
              <HugeiconsIcon :icon="ArrowRight02Icon" :size="16" :stroke-width="2" />
            </template>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAuthStore, type UserRole } from '~/stores/auth'
import { useUmkmStore } from '~/stores/umkm'
import BCloudBackground from '~/components/base/BCloudBackground.vue'
import BStepper from '~/components/base/BStepper.vue'
import { HugeiconsIcon } from '@hugeicons/vue'
import {
  Building01Icon,
  Store01Icon,
  Coins01Icon,
  CheckmarkBadge01Icon,
  ArrowLeft02Icon,
  ArrowRight02Icon,
  UserGroupIcon,
  Award01Icon
} from '@hugeicons/core-free-icons'

definePageMeta({
  layout: false
})

const router = useRouter()
const route = useRoute()
const authStore = useAuthStore()
const umkmStore = useUmkmStore()

const availableRoles = [
  { key: 'UMKM' as UserRole, label: 'UMKM' },
  { key: 'CONSULTANT' as UserRole, label: 'Konsultan' },
  { key: 'INVESTOR' as UserRole, label: 'Investor' }
]

const activeRole = ref<UserRole>('UMKM')

// Read role from query or authStore
const initialRole = (route.query.role as string)?.toUpperCase() as UserRole
if (initialRole && ['UMKM', 'CONSULTANT', 'INVESTOR'].includes(initialRole)) {
  activeRole.value = initialRole
} else if (authStore.currentUser?.role) {
  activeRole.value = authStore.currentUser.role
}

function switchRole(role: UserRole) {
  activeRole.value = role
  currentStep.value = 1
  router.replace({ query: { ...route.query, role } })
}

const currentStep = ref(1)
const submitting = ref(false)

// Simple step titles
const stepsUmkm = [
  { title: 'Data Usaha' },
  { title: 'Lokasi Usaha' },
  { title: 'Keuangan' },
  { title: 'Selesai' }
]

const stepsConsultant = [
  { title: 'Data Diri' },
  { title: 'Keahlian' },
  { title: 'Janji Pendamping' }
]

const stepsInvestor = [
  { title: 'Data Diri' },
  { title: 'Pilihan Modal' },
  { title: 'Kerahasiaan' }
]

const currentStepsList = computed(() => {
  if (activeRole.value === 'CONSULTANT') return stepsConsultant
  if (activeRole.value === 'INVESTOR') return stepsInvestor
  return stepsUmkm
})

const roleHeaderTitle = computed(() => {
  if (activeRole.value === 'CONSULTANT') return 'Data Konsultan'
  if (activeRole.value === 'INVESTOR') return 'Data Investor'
  return 'Data Usaha'
})

const finishButtonLabel = computed(() => {
  if (activeRole.value === 'CONSULTANT') return 'Buka Halaman Konsultan'
  if (activeRole.value === 'INVESTOR') return 'Mulai Cari Peluang Usaha'
  return 'Masuk ke Beranda Usaha'
})

// UMKM Form Data
const umkmSectors = [
  'Makanan & Minuman',
  'Pakaian & Kerajinan',
  'Pertanian',
  'Toko & Jasa',
  'Teknologi'
]

const formUmkm = ref({
  name: authStore.currentUser?.businessName || authStore.currentUser?.org_name || 'Kopi Senja Nusantara',
  owner: authStore.currentUser?.name || 'Fikri Setiawan',
  year: 2021,
  legalStatus: 'NIB_READY',
  nib: '1209000123456',
  npwp: '81.423.891.4-429.000',
  sector: authStore.currentUser?.sector || 'Makanan & Minuman',
  city: authStore.currentUser?.city || 'Bandung, Jawa Barat',
  outlets: 3,
  employees: 14,
  monthlyRevenue: 60000000,
  hppPercentage: 40,
  targetFunding: 150000000,
  equityOffered: '10% Bagi Hasil',
  description: 'Spesialis kopi susu gula aren dengan 3 outlet aktif di Bandung & margin kotor stabil di atas 48%.'
})

// Consultant Form Data
const consultantSpecializations = [
  'Keuangan & Biaya',
  'Operasional & Stok',
  'Pemasaran & Jual',
  'Izin Usaha'
]

const formConsultant = ref({
  name: authStore.currentUser?.name || 'Dra. Maya Suryani, M.M.',
  institution: authStore.currentUser?.institution || authStore.currentUser?.org_name || 'Maya Advisory Partner',
  bnspLicense: authStore.currentUser?.bnspLicense || 'BNSP-KONS-2024-8891',
  city: authStore.currentUser?.city || 'Jakarta Selatan',
  specialization: authStore.currentUser?.specialization || 'Keuangan & Biaya',
  experience: '5+ Tahun',
  maxClients: 10,
  agreeConfidentiality: true,
  agreeSla: true,
  agreeObjective: true
})

const isConsultantAgreed = computed(() => {
  return formConsultant.value.agreeConfidentiality &&
    formConsultant.value.agreeSla &&
    formConsultant.value.agreeObjective
})

// Investor Form Data
const ticketRanges = [
  '50 - 150 Juta',
  '150 - 500 Juta',
  '500 Jt - 1 Miliar',
  '> 1 Miliar'
]

const investorTargetSectors = [
  'Makanan & Minuman',
  'Pakaian & Kerajinan',
  'Pertanian',
  'Toko & Jasa',
  'Teknologi'
]

const formInvestor = ref({
  name: authStore.currentUser?.name || 'Hendro Wicaksono',
  entityName: authStore.currentUser?.businessName || authStore.currentUser?.org_name || 'Nusantara Angel Syndicate',
  investorType: authStore.currentUser?.investorType || 'Kelompok Modal',
  city: authStore.currentUser?.city || 'Jakarta Pusat',
  ticketRange: authStore.currentUser?.ticketRange || '150 - 500 Juta',
  sectors: ['Makanan & Minuman', 'Pakaian & Kerajinan'],
  minMargin: '35%',
  agreeNda: true,
  agreeProtocol: true
})

function toggleInvestorSector(sec: string) {
  const idx = formInvestor.value.sectors.indexOf(sec)
  if (idx > -1) {
    formInvestor.value.sectors.splice(idx, 1)
  } else {
    formInvestor.value.sectors.push(sec)
  }
}

const isInvestorAgreed = computed(() => {
  return formInvestor.value.agreeNda && formInvestor.value.agreeProtocol
})

function finishOnboarding() {
  submitting.value = true

  setTimeout(() => {
    authStore.setRole(activeRole.value)

    if (activeRole.value === 'UMKM') {
      // Sinkronkan ke umkmStore (kompatibel skema business_profiles)
      umkmStore.profile.brand = formUmkm.value.name
      umkmStore.profile.name = formUmkm.value.name
      umkmStore.profile.owner_name = formUmkm.value.owner
      umkmStore.profile.ownerName = formUmkm.value.owner
      umkmStore.profile.sector = formUmkm.value.sector
      umkmStore.profile.city = formUmkm.value.city
      umkmStore.profile.established_year = formUmkm.value.year
      umkmStore.profile.establishedYear = formUmkm.value.year
      umkmStore.profile.outlets_count = formUmkm.value.outlets
      umkmStore.profile.outletsCount = formUmkm.value.outlets
      umkmStore.profile.employees_count = formUmkm.value.employees
      umkmStore.profile.employeesCount = formUmkm.value.employees
      umkmStore.profile.funding_target = formUmkm.value.targetFunding
      umkmStore.profile.fundingTarget = formUmkm.value.targetFunding
      umkmStore.profile.nib = formUmkm.value.nib
      umkmStore.profile.npwp = formUmkm.value.npwp
      umkmStore.profile.equity_offered = formUmkm.value.equityOffered
      umkmStore.profile.description = formUmkm.value.description
      umkmStore.profile.status = 'READY_FOR_FUNDING'

      // Simpan ke authStore dengan entitas tabel business_profiles
      authStore.updateProfile({
        name: formUmkm.value.owner,
        businessName: formUmkm.value.name,
        org_name: formUmkm.value.name,
        sector: formUmkm.value.sector,
        city: formUmkm.value.city,
        onboardingCompleted: true,
        businessProfile: {
          id: `bp-${authStore.currentUser?.id || 1}`,
          user_id: Number(authStore.currentUser?.id || 1),
          brand: formUmkm.value.name,
          owner_name: formUmkm.value.owner,
          sector: formUmkm.value.sector,
          city: formUmkm.value.city,
          established_year: formUmkm.value.year,
          outlets_count: formUmkm.value.outlets,
          employees_count: formUmkm.value.employees,
          funding_target: formUmkm.value.targetFunding,
          nib: formUmkm.value.nib,
          npwp: formUmkm.value.npwp,
          equity_offered: formUmkm.value.equityOffered,
          description: formUmkm.value.description,
          status: 'READY_FOR_FUNDING'
        }
      })

      submitting.value = false
      router.push('/dashboard')
    } else if (activeRole.value === 'CONSULTANT') {
      // Simpan ke authStore dengan entitas tabel consultant_profiles
      authStore.updateProfile({
        name: formConsultant.value.name,
        businessName: formConsultant.value.institution,
        org_name: formConsultant.value.institution,
        institution: formConsultant.value.institution,
        bnspLicense: formConsultant.value.bnspLicense,
        specialization: formConsultant.value.specialization,
        city: formConsultant.value.city,
        onboardingCompleted: true,
        consultantProfile: {
          id: `cp-${authStore.currentUser?.id || 2}`,
          user_id: Number(authStore.currentUser?.id || 2),
          firm_name: formConsultant.value.institution,
          specialization: formConsultant.value.specialization,
          is_certified: true,
          active_clients_count: 0
        }
      })

      submitting.value = false
      router.push('/konsultan')
    } else if (activeRole.value === 'INVESTOR') {
      // Simpan ke authStore dengan entitas tabel investor_profiles
      authStore.updateProfile({
        name: formInvestor.value.name,
        businessName: formInvestor.value.entityName,
        org_name: formInvestor.value.entityName,
        investorType: formInvestor.value.investorType,
        ticketRange: formInvestor.value.ticketRange,
        city: formInvestor.value.city,
        onboardingCompleted: true,
        investorProfile: {
          id: `ip-${authStore.currentUser?.id || 3}`,
          user_id: Number(authStore.currentUser?.id || 3),
          firm_name: formInvestor.value.entityName,
          commitment_capital: formInvestor.value.ticketRange,
          is_verified: true
        }
      })

      submitting.value = false
      router.push('/investor')
    }
  }, 350)
}
</script>
