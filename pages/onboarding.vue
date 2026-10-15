<template>
  <div class="min-h-screen min-h-dvh w-full bg-[#F3F8FC] dark:bg-[#0C121D] text-neutral-900 dark:text-neutral-100 flex flex-col justify-start sm:justify-center items-center px-4 py-8 sm:py-12 select-none relative font-sans overflow-x-hidden">
    
    <!-- Subtle Ambient Background Glow -->
    <div class="pointer-events-none absolute top-1/4 left-1/2 -translate-x-1/2 w-[520px] h-[520px] bg-[#0081A0]/5 dark:bg-[#0081A0]/10 rounded-full blur-3xl" />

    <!-- Atmospheric Layered Cloud Horizon -->
    <BCloudBackground :fixed="true" />

    <!-- TOP-LEFT: Pill Button "Kembali ke Beranda" -->
    <div class="fixed top-6 left-6 sm:top-8 sm:left-8 z-30">
      <NuxtLink
        to="/"
        class="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/90 dark:bg-[#13161F]/90 backdrop-blur-md border border-[#E2E8F0] dark:border-white/10 text-neutral-800 dark:text-neutral-200 text-xs sm:text-sm font-semibold shadow-xs hover:border-[#0081A0] hover:text-[#0081A0] dark:hover:border-[#2091AA] dark:hover:text-[#2091AA] transition-all duration-150"
      >
        <HugeiconsIcon :icon="ArrowLeft02Icon" :size="16" :stroke-width="2.2" />
        <span>Kembali ke Beranda</span>
      </NuxtLink>
    </div>

    <!-- Center Flow Container -->
    <div class="relative z-10 w-full max-w-2xl mx-auto my-auto space-y-4 pt-14 sm:pt-6 pb-12">
      
      <!-- Top Brand Header & Role Switcher -->
      <div class="flex items-center justify-between flex-wrap gap-2">
        <div class="flex items-center gap-2.5 select-none cursor-default">
          <img src="/logo/logoSmall.svg" alt="Beruang Logo" class="h-8 w-auto object-contain select-none" />
          <div class="text-left">
            <span class="font-heading font-extrabold text-xl tracking-tight leading-none select-none block">
              <span class="text-[#0081A0] dark:text-[#2091AA]">Ber</span><span class="text-[#00AA13] dark:text-[#22C55E]">uang</span>
            </span>
            <span class="text-[11px] font-semibold text-[#0081A0] dark:text-[#2091AA] select-none">
              {{ roleHeaderTitle }}
            </span>
          </div>
        </div>

        <!-- Role Quick Switcher -->
        <div class="flex items-center gap-2">
          <div class="p-1 rounded-full bg-neutral-100/90 dark:bg-[#13161F]/90 border border-neutral-200/80 dark:border-white/10 flex gap-1 shadow-2xs">
            <button
              v-for="r in availableRoles"
              :key="r.key"
              type="button"
              :class="[
                'px-2.5 py-1 rounded-full text-[11px] font-bold transition-all cursor-pointer',
                activeRole === r.key
                  ? 'bg-white dark:bg-[#1A1D26] text-[#0081A0] dark:text-[#2091AA] shadow-xs'
                  : 'text-neutral-500 hover:text-neutral-900 dark:hover:text-white'
              ]"
              @click="switchRole(r.key)"
            >
              {{ r.label }}
            </button>
          </div>
          <span class="inline-flex items-center px-3 py-1 rounded-full bg-white/90 dark:bg-[#13161F]/90 border border-[#E2E8F0] dark:border-white/10 text-xs text-neutral-600 dark:text-neutral-300 font-semibold shadow-2xs tabular-nums">
            {{ currentStep }} / {{ currentStepsList.length }}
          </span>
        </div>
      </div>

      <!-- Stepper Component -->
      <div class="p-3 sm:p-4 rounded-2xl bg-white/90 dark:bg-[#13161F]/90 backdrop-blur-md border border-[#E2E8F0] dark:border-white/10 shadow-xs">
        <BStepper :steps="currentStepsList" :current-step="currentStep" />
      </div>

      <!-- Main Form Container -->
      <div class="bg-white/95 dark:bg-[#13161F]/95 backdrop-blur-md rounded-3xl border border-[#E2E8F0] dark:border-white/10 shadow-sm p-6 sm:p-8">
        
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
              <div ref="yearPickerRef" class="space-y-1 relative">
                <label class="block text-xs font-semibold text-neutral-700 dark:text-neutral-300">
                  Tahun Mulai Usaha
                </label>
                <div
                  class="relative flex items-center cursor-pointer"
                  @click="isYearPickerOpen = !isYearPickerOpen"
                >
                  <input
                    v-model.number="formUmkm.year"
                    type="number"
                    min="1990"
                    max="2026"
                    placeholder="2021"
                    class="w-full px-3.5 pr-10 py-2.5 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-sm focus:ring-2 focus:ring-primary-500 focus:outline-none tabular-nums font-semibold cursor-pointer"
                    @keydown.enter.prevent="isYearPickerOpen = false"
                  />
                  <div class="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-neutral-400 dark:text-neutral-500">
                    <HugeiconsIcon :icon="Calendar03Icon" :size="18" :stroke-width="1.8" />
                  </div>
                </div>

                <!-- Tanggalan Popover Pemilih Tahun -->
                <div
                  v-if="isYearPickerOpen"
                  class="absolute top-full left-0 mt-1.5 w-64 p-3 rounded-2xl bg-white dark:bg-[#1A1D24] border border-neutral-200 dark:border-neutral-700 shadow-xl z-50 animate-in fade-in zoom-in-95 duration-150"
                >
                  <div class="flex items-center justify-between pb-2 mb-2 border-b border-neutral-100 dark:border-neutral-800">
                    <button
                      type="button"
                      class="w-7 h-7 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-600 dark:text-neutral-300 flex items-center justify-center transition-colors cursor-pointer"
                      @click.stop="pickerDecadeStart -= 12"
                    >
                      <HugeiconsIcon :icon="ArrowLeft02Icon" :size="14" :stroke-width="2" />
                    </button>
                    <span class="text-xs font-bold text-neutral-800 dark:text-neutral-200 tabular-nums">
                      {{ pickerDecadeStart }} - {{ pickerDecadeStart + 11 }}
                    </span>
                    <button
                      type="button"
                      class="w-7 h-7 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-600 dark:text-neutral-300 flex items-center justify-center transition-colors cursor-pointer"
                      @click.stop="pickerDecadeStart += 12"
                    >
                      <HugeiconsIcon :icon="ArrowRight02Icon" :size="14" :stroke-width="2" />
                    </button>
                  </div>

                  <div class="grid grid-cols-3 gap-1.5">
                    <button
                      v-for="y in decadeYears"
                      :key="y"
                      type="button"
                      :disabled="y > 2026"
                      :class="[
                        'py-2 px-1 rounded-xl text-xs font-bold transition-all tabular-nums text-center cursor-pointer',
                        formUmkm.year === y
                          ? 'bg-primary-600 text-white shadow-xs'
                          : y > 2026
                            ? 'text-neutral-300 dark:text-neutral-600 cursor-not-allowed opacity-40'
                            : 'text-neutral-700 dark:text-neutral-200 hover:bg-primary-50 dark:hover:bg-primary-950/60 hover:text-primary-600 dark:hover:text-primary-400'
                      ]"
                      @click.stop="selectYear(y)"
                    >
                      {{ y }}
                    </button>
                  </div>
                </div>
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
              <div class="w-10 h-10 rounded-xl bg-primary-50 dark:bg-primary-950 text-primary-600 flex items-center justify-center shrink-0">
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
              <div class="w-10 h-10 rounded-xl bg-primary-50 dark:bg-primary-950 text-primary-600 flex items-center justify-center shrink-0">
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
                Rata-rata Penjualan / Bulan
              </label>
              <div class="relative">
                <div class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                  <span class="text-xs font-bold text-neutral-500 dark:text-neutral-400">Rp.</span>
                </div>
                <input
                  v-model="displayMonthlyRevenue"
                  type="text"
                  inputmode="numeric"
                  placeholder="0"
                  class="w-full pl-11 pr-3.5 py-2.5 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-sm focus:ring-2 focus:ring-primary-500 focus:outline-none tabular-nums font-semibold"
                  @input="handleMonthlyRevenueInput"
                />
              </div>
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
                  Kebutuhan Modal
                </label>
                <div class="relative">
                  <div class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                    <span class="text-xs font-bold text-neutral-500 dark:text-neutral-400">Rp.</span>
                  </div>
                  <input
                    v-model="displayTargetFunding"
                    type="text"
                    inputmode="numeric"
                    placeholder="0"
                    class="w-full pl-11 pr-3.5 py-2.5 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-sm focus:ring-2 focus:ring-primary-500 focus:outline-none tabular-nums font-semibold"
                    @input="handleTargetFundingInput"
                  />
                </div>
                <span class="text-[10px] text-neutral-400">Modal yang ingin dicari</span>
              </div>
            </div>

            <div class="text-left space-y-1">
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
          </div>

          <!-- Step 4: Ringkasan & Konfirmasi -->
          <div v-else class="space-y-4">
            <div class="text-center mb-3">
              <div class="w-11 h-11 rounded-2xl bg-emerald-50 dark:bg-emerald-950 text-emerald-600 flex items-center justify-center mx-auto mb-2">
                <HugeiconsIcon :icon="CheckmarkBadge01Icon" :size="24" :stroke-width="2" />
              </div>
              <h3 class="font-extrabold text-lg sm:text-xl text-neutral-900 dark:text-neutral-50">
                Profil Anda Sudah Siap!
              </h3>
              <p class="text-xs text-neutral-500 max-w-sm mx-auto">
                Periksa kembali ringkasan usahamu sebelum masuk ke beranda toko.
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
              <div class="w-10 h-10 rounded-xl bg-primary-50 dark:bg-primary-950 text-primary-600 flex items-center justify-center shrink-0">
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

          <!-- Step 3: Kesimpulan / Ringkasan Data Konsultan -->
          <div v-else class="space-y-4">
            <div class="text-center mb-3">
              <div class="w-11 h-11 rounded-2xl bg-emerald-50 dark:bg-emerald-950 text-emerald-600 flex items-center justify-center mx-auto mb-2">
                <HugeiconsIcon :icon="CheckmarkBadge01Icon" :size="24" :stroke-width="2" />
              </div>
              <h3 class="font-extrabold text-lg sm:text-xl text-neutral-900 dark:text-neutral-50">
                Profil Anda Sudah Siap!
              </h3>
              <p class="text-xs text-neutral-500 max-w-sm mx-auto">
                Periksa kembali data keahlianmu sebelum mulai mendampingi UMKM.
              </p>
            </div>

            <!-- Profile Summary Card -->
            <div class="p-4 rounded-xl bg-neutral-50 dark:bg-neutral-800/80 border border-neutral-200 dark:border-neutral-700 text-xs space-y-2">
              <div class="flex justify-between border-b border-neutral-200/60 dark:border-neutral-700/60 pb-2">
                <span class="text-neutral-500">Nama Konsultan:</span>
                <span class="font-bold text-neutral-900 dark:text-white">{{ formConsultant.name }}</span>
              </div>
              <div class="flex justify-between border-b border-neutral-200/60 dark:border-neutral-700/60 pb-2">
                <span class="text-neutral-500">Kantor / Lembaga:</span>
                <span class="font-semibold text-neutral-900 dark:text-neutral-200">{{ formConsultant.institution || 'Praktisi Independen' }}</span>
              </div>
              <div class="flex justify-between border-b border-neutral-200/60 dark:border-neutral-700/60 pb-2">
                <span class="text-neutral-500">Sertifikat BNSP:</span>
                <span class="font-semibold text-emerald-600 dark:text-emerald-400 tabular-nums">{{ formConsultant.bnspLicense || '-' }}</span>
              </div>
              <div class="flex justify-between border-b border-neutral-200/60 dark:border-neutral-700/60 pb-2">
                <span class="text-neutral-500">Kota Domisili:</span>
                <span class="font-semibold text-neutral-900 dark:text-neutral-200">{{ formConsultant.city }}</span>
              </div>
              <div class="flex justify-between border-b border-neutral-200/60 dark:border-neutral-700/60 pb-2">
                <span class="text-neutral-500">Bidang Keahlian:</span>
                <span class="font-bold text-primary-600 dark:text-primary-400">{{ formConsultant.specialization }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-neutral-500">Kapasitas Pendampingan:</span>
                <span class="font-semibold text-neutral-900 dark:text-neutral-200">{{ formConsultant.maxClients }} Usaha (Pengalaman {{ formConsultant.experience }})</span>
              </div>
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

          <!-- Step 2: Kriteria Portofolio & Tiket Modal (Opsional untuk Bantuan Rekomendasi) -->
          <div v-else-if="currentStep === 2" class="space-y-3.5">
            <div class="flex items-center gap-3 mb-2">
              <div class="w-10 h-10 rounded-xl bg-primary-50 dark:bg-primary-950 text-primary-600 flex items-center justify-center shrink-0">
                <HugeiconsIcon :icon="Coins01Icon" :size="20" :stroke-width="1.75" />
              </div>
              <div class="text-left">
                <div class="flex items-center gap-2">
                  <h3 class="font-bold text-base sm:text-lg text-neutral-900 dark:text-neutral-50">
                    2. Pilihan Modal & Bidang
                  </h3>
                  <span class="text-[10px] px-2 py-0.5 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-500 font-bold border border-neutral-200 dark:border-neutral-700">
                    Opsional
                  </span>
                </div>
                <p class="text-xs text-neutral-500 mt-0.5">
                  Hanya bantuan rekomendasi awal di katalog. Boleh diisi atau langsung dilewati (bebas diatur kapan saja di filter pencarian).
                </p>
              </div>
            </div>

            <div class="text-left space-y-1.5">
              <div class="flex items-center justify-between">
                <label class="block text-xs font-semibold text-neutral-700 dark:text-neutral-300">
                  Kisaran Modal per Usaha
                </label>
                <span class="text-[10px] text-neutral-400">Bisa diubah nanti</span>
              </div>
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
              <div class="flex items-center justify-between">
                <label class="block text-xs font-semibold text-neutral-700 dark:text-neutral-300">
                  Bidang Usaha yang Dicari
                </label>
                <button
                  type="button"
                  class="text-[11px] text-primary-600 dark:text-primary-400 font-semibold hover:underline cursor-pointer"
                  @click="formInvestor.sectors = formInvestor.sectors.length === investorTargetSectors.length ? [] : [...investorTargetSectors]"
                >
                  {{ formInvestor.sectors.length === investorTargetSectors.length ? 'Kosongkan (Bebas)' : 'Pilih Semua' }}
                </button>
              </div>
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
              <p class="text-[11px] text-neutral-400">
                {{ formInvestor.sectors.length === 0 ? '✓ Menampilkan semua jenis usaha tanpa filter.' : `${formInvestor.sectors.length} bidang usaha dipilih.` }}
              </p>
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

          <!-- Step 3: Rekap Data & Konfirmasi Investor -->
          <div v-else class="space-y-4">
            <div class="text-center mb-3">
              <div class="w-11 h-11 rounded-2xl bg-emerald-50 dark:bg-emerald-950 text-emerald-600 flex items-center justify-center mx-auto mb-2">
                <HugeiconsIcon :icon="CheckmarkBadge01Icon" :size="24" :stroke-width="2" />
              </div>
              <h3 class="font-extrabold text-lg sm:text-xl text-neutral-900 dark:text-neutral-50">
                Profil Anda Sudah Siap!
              </h3>
              <p class="text-xs text-neutral-500 max-w-sm mx-auto">
                Periksa kembali pilihan modalmu sebelum mulai mencari peluang usaha.
              </p>
            </div>

            <!-- Profile Summary Card -->
            <div class="p-4 rounded-xl bg-neutral-50 dark:bg-neutral-800/80 border border-neutral-200 dark:border-neutral-700 text-xs space-y-2">
              <div class="flex justify-between border-b border-neutral-200/60 dark:border-neutral-700/60 pb-2">
                <span class="text-neutral-500">Nama Investor:</span>
                <span class="font-bold text-neutral-900 dark:text-white">{{ formInvestor.name }}</span>
              </div>
              <div class="flex justify-between border-b border-neutral-200/60 dark:border-neutral-700/60 pb-2">
                <span class="text-neutral-500">Perusahaan / Kelompok:</span>
                <span class="font-semibold text-neutral-900 dark:text-neutral-200">{{ formInvestor.entityName || 'Pribadi / Perorangan' }}</span>
              </div>
              <div class="flex justify-between border-b border-neutral-200/60 dark:border-neutral-700/60 pb-2">
                <span class="text-neutral-500">Jenis Investor:</span>
                <span class="font-semibold text-neutral-900 dark:text-neutral-200">{{ formInvestor.investorType }}</span>
              </div>
              <div class="flex justify-between border-b border-neutral-200/60 dark:border-neutral-700/60 pb-2">
                <span class="text-neutral-500">Kota Asal:</span>
                <span class="font-semibold text-neutral-900 dark:text-neutral-200">{{ formInvestor.city }}</span>
              </div>
              <div class="flex justify-between border-b border-neutral-200/60 dark:border-neutral-700/60 pb-2">
                <span class="text-neutral-500">Kisaran Modal:</span>
                <span class="font-bold text-primary-600 dark:text-primary-400 tabular-nums">{{ formInvestor.ticketRange }}</span>
              </div>
              <div class="flex justify-between border-b border-neutral-200/60 dark:border-neutral-700/60 pb-2">
                <span class="text-neutral-500">Bidang Usaha Pilihan:</span>
                <span class="font-semibold text-neutral-900 dark:text-neutral-200 text-right max-w-[60%]">
                  {{ formInvestor.sectors.length > 0 ? formInvestor.sectors.join(', ') : 'Semua Bidang Usaha (Bebas)' }}
                </span>
              </div>
              <div class="flex justify-between">
                <span class="text-neutral-500">Harapan Untung Bersih:</span>
                <span class="font-semibold text-emerald-600 dark:text-emerald-400">&gt; {{ formInvestor.minMargin }}</span>
              </div>
            </div>
          </div>
        </template>

        <!-- Step Navigation Buttons -->
        <div class="mt-6 pt-4 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-between">
          <button
            v-if="currentStep > 1"
            type="button"
            class="inline-flex items-center gap-2 h-10 px-5 rounded-full bg-white/90 dark:bg-[#13161F]/90 border border-[#E2E8F0] dark:border-white/10 text-neutral-800 dark:text-neutral-200 hover:border-[#0081A0] hover:text-[#0081A0] dark:hover:border-[#2091AA] dark:hover:text-[#2091AA] font-semibold text-xs sm:text-sm transition-all cursor-pointer shadow-xs active:scale-[0.99]"
            @click="currentStep--"
          >
            <HugeiconsIcon :icon="ArrowLeft02Icon" :size="16" :stroke-width="2" />
            <span>Kembali</span>
          </button>
          <div v-else />

          <div class="flex items-center gap-3">
            <button
              v-if="activeRole === 'INVESTOR' && currentStep === 2"
              type="button"
              class="text-xs font-semibold text-neutral-500 hover:text-neutral-900 dark:hover:text-white px-2 py-2 cursor-pointer transition-colors"
              @click="currentStep++"
            >
              Lewati Langkah Ini
            </button>

            <button
              v-if="currentStep < currentStepsList.length"
              type="button"
              class="inline-flex items-center gap-2 h-10 px-6 rounded-full bg-[#0081A0] hover:bg-[#00708C] text-white font-bold text-xs sm:text-sm shadow-[0_4px_14px_rgba(0,129,160,0.25)] active:scale-[0.99] transition-all cursor-pointer"
              @click="currentStep++"
            >
              <span>Lanjut</span>
              <HugeiconsIcon :icon="ArrowRight02Icon" :size="16" :stroke-width="2" />
            </button>

            <button
              v-else
              type="button"
              :disabled="submitting"
              class="inline-flex items-center gap-2 h-10 px-6 rounded-full bg-[#0081A0] hover:bg-[#00708C] text-white font-bold text-xs sm:text-sm shadow-[0_4px_14px_rgba(0,129,160,0.25)] active:scale-[0.99] transition-all cursor-pointer"
              @click="finishOnboarding"
            >
              <span v-if="submitting">Memproses...</span>
              <template v-else>
                <span>{{ finishButtonLabel }}</span>
                <HugeiconsIcon :icon="ArrowRight02Icon" :size="16" :stroke-width="2" />
              </template>
            </button>
          </div>
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
  Award01Icon,
  Calendar03Icon
} from '@hugeicons/core-free-icons'
import { onClickOutside } from '@vueuse/core'

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
  { title: 'Selesai' }
]

const stepsInvestor = [
  { title: 'Data Diri' },
  { title: 'Pilihan Modal' },
  { title: 'Selesai' }
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
  startDate: '2021-08-17',
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
  description: authStore.currentUser?.businessProfile?.description || ''
})

const displayMonthlyRevenue = ref(
  formUmkm.value.monthlyRevenue ? Number(formUmkm.value.monthlyRevenue).toLocaleString('id-ID') : '60.000.000'
)
const displayTargetFunding = ref(
  formUmkm.value.targetFunding ? Number(formUmkm.value.targetFunding).toLocaleString('id-ID') : '150.000.000'
)

function handleMonthlyRevenueInput(e: Event) {
  const input = e.target as HTMLInputElement
  const rawDigits = input.value.replace(/\D/g, '')
  const num = rawDigits ? parseInt(rawDigits, 10) : 0
  formUmkm.value.monthlyRevenue = num
  displayMonthlyRevenue.value = rawDigits ? Number(rawDigits).toLocaleString('id-ID') : ''
}

function handleTargetFundingInput(e: Event) {
  const input = e.target as HTMLInputElement
  const rawDigits = input.value.replace(/\D/g, '')
  const num = rawDigits ? parseInt(rawDigits, 10) : 0
  formUmkm.value.targetFunding = num
  displayTargetFunding.value = rawDigits ? Number(rawDigits).toLocaleString('id-ID') : ''
}

// Year Picker (Tanggalan Khusus Tahun)
const isYearPickerOpen = ref(false)
const yearPickerRef = ref<HTMLElement | null>(null)
const pickerDecadeStart = ref(2015)

const decadeYears = computed(() => {
  const years = []
  for (let i = 0; i < 12; i++) {
    years.push(pickerDecadeStart.value + i)
  }
  return years
})

function selectYear(y: number) {
  if (y > 2026) return
  formUmkm.value.year = y
  formUmkm.value.startDate = `${y}-01-01`
  isYearPickerOpen.value = false
}

onClickOutside(yearPickerRef, () => {
  isYearPickerOpen.value = false
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
  maxClients: 10
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
  minMargin: '35%'
})

function toggleInvestorSector(sec: string) {
  const idx = formInvestor.value.sectors.indexOf(sec)
  if (idx > -1) {
    formInvestor.value.sectors.splice(idx, 1)
  } else {
    formInvestor.value.sectors.push(sec)
  }
}

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
      const establishedYear = formUmkm.value.startDate
        ? new Date(formUmkm.value.startDate).getFullYear()
        : (formUmkm.value.year || 2021)
      umkmStore.profile.established_year = establishedYear
      umkmStore.profile.establishedYear = establishedYear
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
          established_year: formUmkm.value.startDate
            ? new Date(formUmkm.value.startDate).getFullYear()
            : (formUmkm.value.year || 2021),
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
