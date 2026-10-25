<template>
  <div ref="pageRootRef" class="space-y-6 sm:space-y-8 pb-16 font-poppins text-neutral-900 dark:text-neutral-100">
    <!-- 1. Top Page Header: Title on Left -->
    <div class="flex items-center justify-between gap-4 min-h-[44px]">
      <div class="flex items-center gap-2.5 sm:gap-3">
        <HugeiconsIcon
          :icon="UserCircleIcon"
          :size="26"
          :stroke-width="2.2"
          class="text-neutral-900 dark:text-white shrink-0"
        />
        <h1 class="font-poppins font-semibold text-2xl sm:text-3xl text-neutral-900 dark:text-white tracking-tight leading-tight">
          Profil Investor
        </h1>
      </div>
    </div>

    <!-- ========================================================================= -->
    <!-- 1. HERO PROFILE SECTION (CLEAN DIRECT DISPLAY MATCHING UMKM PROFILE)       -->
    <!-- ========================================================================= -->
    <div class="space-y-4">
      <!-- Reusable Banner & Avatar Hero Component with full crop/zoom/upload -->
      <BStoreBanner
        :store-name="formProfile.companyName"
        :owner-name="investorFirstName"
        :owner-avatar-url="investorStore.profile.avatarUrl || authStore.currentUser?.avatar || '/images/user-profile.png'"
        :banner-url="investorStore.profile.bannerUrl"
        @update:banner-url="onBannerUpdated"
        @reset:banner-url="onBannerReset"
        @update:owner-avatar-url="onAvatarUpdated"
        @reset:owner-avatar-url="onAvatarReset"
      />

      <!-- Identity & Metadata Details below Avatar (Identical Layout to UMKM Profil Usaha) -->
      <div class="space-y-6 sm:space-y-8 w-full">
        <!-- Top Row: Investor Name + Verified Badge on Left, Simpan Perubahan & Bagikan Profil on Right -->
        <div class="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pt-3 sm:pt-4">
          <div class="flex flex-col space-y-2.5 sm:space-y-3.5">
            <!-- 1. Lokasi & Tahun Mulai Investasi -->
            <p class="text-xs sm:text-sm font-poppins text-neutral-500 dark:text-neutral-400 flex items-center gap-1.5">
              <HugeiconsIcon :icon="Location01Icon" :size="15" class="text-neutral-400 dark:text-neutral-500 shrink-0" />
              <span>{{ formProfile.city }}, sejak {{ formProfile.establishedYear }}</span>
            </p>

            <!-- 2. Nama Investor + Badge Terverifikasi -->
            <div class="flex items-center gap-2.5 sm:gap-3 flex-wrap py-0.5">
              <h2 class="text-2xl sm:text-3xl font-poppins font-bold text-neutral-900 dark:text-white tracking-tight leading-tight">
                {{ formProfile.name || 'Fikri Setiawan' }}
              </h2>
              <BVerifiedBadge />
            </div>

            <!-- 3. Metadata Baris Pokok: Nama Perusahaan/PT, Kategori Investor, Rentang Tiket -->
            <div class="flex items-center flex-wrap gap-y-2 gap-x-2.5 sm:gap-x-3.5 pt-1.5 text-xs sm:text-[13px] font-poppins text-neutral-600 dark:text-neutral-400">
              <div class="inline-flex items-center gap-1.5">
                <HugeiconsIcon :icon="Building03Icon" :size="15" class="text-neutral-500 dark:text-neutral-400 shrink-0" />
                <span>{{ formProfile.companyName }}</span>
              </div>

              <span class="w-1.5 h-1.5 rounded-full bg-neutral-400 dark:bg-neutral-500 self-end mb-[1px] shrink-0" aria-hidden="true" />

              <div class="inline-flex items-center gap-1.5">
                <HugeiconsIcon :icon="Award01Icon" :size="15" class="text-neutral-500 dark:text-neutral-400 shrink-0" />
                <span>{{ formProfile.investorType }}</span>
              </div>

              <span class="w-1.5 h-1.5 rounded-full bg-neutral-400 dark:bg-neutral-500 self-end mb-[1px] shrink-0" aria-hidden="true" />

              <div class="inline-flex items-center gap-1.5">
                <HugeiconsIcon :icon="Coins01Icon" :size="15" class="text-neutral-500 dark:text-neutral-400 shrink-0" />
                <span>Tiket Rp {{ (formProfile.minTicket / 1000000).toLocaleString('id-ID') }} Jt – Rp {{ (formProfile.maxTicket / 1000000).toLocaleString('id-ID') }} Jt</span>
              </div>
            </div>
          </div>

          <!-- Action Buttons: Simpan Perubahan & Bagikan Profil -->
          <div class="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 w-full sm:w-auto [&>*]:w-full sm:[&>*]:w-auto pt-1 sm:pt-0">
            <button
              type="button"
              :disabled="!hasUnsavedChanges || isSaving"
              :class="[
                'group select-none justify-center text-center w-full sm:w-auto shadow-none',
                hasUnsavedChanges
                  ? 'btn-pill-action-green'
                  : 'btn-pill-action-muted'
              ]"
              :title="hasUnsavedChanges ? 'Simpan Perubahan Profil Investor' : 'Tidak ada perubahan untuk disimpan'"
              @click="hasUnsavedChanges && !isSaving ? saveProfile() : null"
            >
              <span>{{ isSaving ? 'Menyimpan...' : 'Simpan Perubahan' }}</span>
              <HugeiconsIcon
                :icon="CheckmarkCircle01Icon"
                :size="15"
                :stroke-width="2.0"
                class="shrink-0 transition-transform duration-200"
                :class="hasUnsavedChanges ? 'group-hover:translate-x-0.5' : ''"
              />
            </button>

            <BActionButton
              variant="default"
              :huge-icon="Share08Icon"
              :icon-size="14"
              custom-class="w-full sm:w-auto justify-center text-center"
              title="Buka Modal Bagikan Profil Investor"
              @click="isShareModalOpen = true"
            >
              Bagikan Profil
            </BActionButton>
          </div>
        </div>

        <!-- Box Tentang Tesis & Fokus Investasi Saya -->
        <div class="card-tactile-gopay rounded-[20px] p-5 sm:p-6 border border-[#CBD5E1] dark:border-neutral-800 bg-[#F8FAFC] dark:bg-[#13161F] !shadow-none space-y-3">
          <div class="flex items-center justify-between">
            <h3 class="text-base sm:text-lg font-poppins font-semibold text-neutral-900 dark:text-white">
              Tentang Tesis & Fokus Investasi Saya
            </h3>
            <button
              type="button"
              class="p-2 rounded-xl text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white hover:bg-neutral-200/60 dark:hover:bg-neutral-800 transition-all cursor-pointer"
              title="Edit Ringkasan Tesis Investasi"
              @click="scrollToEditDescription"
            >
              <HugeiconsIcon :icon="PencilEdit02Icon" :size="18" />
            </button>
          </div>

          <p class="text-sm sm:text-base font-poppins text-neutral-600 dark:text-neutral-300 leading-relaxed text-justify">
            <span>{{ displayedDescription }}</span>
            <span v-if="hasLongDescription && !isDescriptionExpanded">...</span>
            <button
              v-if="hasLongDescription"
              type="button"
              class="text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white font-medium text-xs sm:text-sm ml-1 inline-flex items-center hover:underline cursor-pointer"
              @click="isDescriptionExpanded = !isDescriptionExpanded"
            >
              {{ isDescriptionExpanded ? 'sembunyikan' : 'lainnya' }}
            </button>
          </p>
        </div>
      </div>
    </div>

    <!-- ========================================================================= -->
    <!-- 2. MAIN 2-COLUMN LAYOUT (8 Cols Content + 4 Cols Sticky Sidebar)           -->
    <!-- ========================================================================= -->
    <div class="grid grid-cols-12 gap-6 sm:gap-8 items-start">

      <!-- ========================================================================= -->
      <!-- LEFT CONTENT COLUMN (8 Cols on Desktop)                                  -->
      <!-- ========================================================================= -->
      <div class="col-span-12 lg:col-span-8 space-y-6 sm:space-y-8">

        <!-- SECTION 1: IDENTITAS INVESTOR & PERUSAHAAN / PT -->
        <div class="card-tactile-gopay rounded-[22px] p-6 sm:p-7 border border-[#CBD5E1] dark:border-neutral-800 bg-[#FFFFFF] dark:bg-[#13161F] !shadow-none space-y-6">
          <div class="border-b border-neutral-100 dark:border-neutral-800 pb-4">
            <h3 class="text-base sm:text-lg font-poppins font-semibold text-neutral-900 dark:text-white">
              Identitas Investor & Entitas Perusahaan
            </h3>
            <p class="text-xs sm:text-sm font-poppins text-neutral-500 dark:text-neutral-400 mt-1">
              Data identitas resmi investor dan nama perusahaan (PT / Sindikasi) yang ditampilkan kepada pemilik UMKM saat pengajuan ruang data.
            </p>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
            <div>
              <label class="block text-xs font-poppins font-semibold text-neutral-700 dark:text-neutral-300 mb-1.5">
                Nama Lengkap Investor
              </label>
              <input
                v-model="formProfile.name"
                type="text"
                class="input-tactile-gopay w-full"
                placeholder="Contoh: Fikri Setiawan"
              />
            </div>

            <div>
              <label class="block text-xs font-poppins font-semibold text-neutral-700 dark:text-neutral-300 mb-1.5">
                Nama Perusahaan / PT / Sindikasi
              </label>
              <input
                v-model="formProfile.companyName"
                type="text"
                class="input-tactile-gopay w-full"
                placeholder="Contoh: PT Nusantara Kapital Investama"
              />
            </div>

            <div>
              <label class="block text-xs font-poppins font-semibold text-neutral-700 dark:text-neutral-300 mb-1.5">
                Jabatan / Peran Investasi
              </label>
              <input
                v-model="formProfile.roleTitle"
                type="text"
                class="input-tactile-gopay w-full"
                placeholder="Contoh: Managing Partner / Principal"
              />
            </div>

            <div>
              <label class="block text-xs font-poppins font-semibold text-neutral-700 dark:text-neutral-300 mb-1.5">
                Kategori Investor
              </label>
              <div class="relative">
                <select
                  v-model="formProfile.investorType"
                  class="input-tactile-gopay w-full cursor-pointer appearance-none pr-10"
                >
                  <option value="Angel Investor & Sindikasi Institusi">Angel Investor & Sindikasi Institusi</option>
                  <option value="Venture Capital (Micro VC)">Venture Capital (Micro VC)</option>
                  <option value="Family Office & Private Equity">Family Office & Private Equity</option>
                  <option value="Corporate Venture Capital">Corporate Venture Capital</option>
                  <option value="Lembaga Keuangan & Koperasi Sekunder">Lembaga Keuangan & Koperasi Sekunder</option>
                </select>
                <div class="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-neutral-500 dark:text-neutral-400 flex items-center justify-center">
                  <HugeiconsIcon :icon="ArrowDown01Icon" :size="16" :stroke-width="2.2" />
                </div>
              </div>
            </div>

            <div>
              <label class="block text-xs font-poppins font-semibold text-neutral-700 dark:text-neutral-300 mb-1.5">
                Kota Domisili Utama
              </label>
              <input
                v-model="formProfile.city"
                type="text"
                class="input-tactile-gopay w-full"
                placeholder="Contoh: Jakarta Selatan"
              />
            </div>

            <div>
              <label class="block text-xs font-poppins font-semibold text-neutral-700 dark:text-neutral-300 mb-1.5">
                Tahun Berdiri / Aktif Investasi
              </label>
              <input
                v-model.number="formProfile.establishedYear"
                type="number"
                min="1990"
                max="2026"
                class="input-tactile-gopay w-full tabular-nums"
              />
            </div>
          </div>

          <!-- Kontak Resmi Investor -->
          <div class="pt-5 border-t border-neutral-100 dark:border-neutral-800 space-y-4">
            <div>
              <h4 class="text-xs font-poppins font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
                Saluran Kontak Korporat Resmi
              </h4>
              <p class="text-[11px] font-poppins text-neutral-400 mt-0.5">
                Digunakan untuk notifikasi pembukaan Data Room dan penandatanganan dokumen komitmen pendanaan.
              </p>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5">
              <div>
                <label class="block text-xs font-poppins font-medium text-neutral-600 dark:text-neutral-300 mb-1.5">
                  Email Korporat Resmi
                </label>
                <input
                  v-model="formProfile.email"
                  type="email"
                  class="input-tactile-gopay w-full text-xs"
                  placeholder="fikri@nusantarakapital.co.id"
                />
              </div>

              <div>
                <label class="block text-xs font-poppins font-medium text-neutral-600 dark:text-neutral-300 mb-1.5">
                  WhatsApp Transaksi & Alert
                </label>
                <input
                  v-model="formProfile.whatsapp"
                  type="text"
                  class="input-tactile-gopay w-full text-xs tabular-nums"
                  placeholder="+62 811-xxxx-xxxx"
                />
              </div>

              <div>
                <label class="block text-xs font-poppins font-medium text-neutral-600 dark:text-neutral-300 mb-1.5">
                  Situs Web Perusahaan
                </label>
                <input
                  v-model="formProfile.website"
                  type="text"
                  class="input-tactile-gopay w-full text-xs"
                  placeholder="nusantarakapital.co.id"
                />
              </div>
            </div>
          </div>

          <!-- Narasi Tesis Investasi -->
          <div class="pt-5 border-t border-neutral-100 dark:border-neutral-800 space-y-2">
            <div class="flex items-center justify-between mb-1.5">
              <label class="block text-xs font-poppins font-semibold text-neutral-700 dark:text-neutral-300">
                Ringkasan Tesis & Fokus Pendanaan (Investment Mandate)
              </label>
              <span class="text-[11px] font-poppins text-neutral-400 tabular-nums">
                {{ formProfile.description.length }} / 350 Karakter
              </span>
            </div>
            <textarea
              id="input-investor-narrative"
              v-model="formProfile.description"
              rows="4"
              maxlength="350"
              class="input-tactile-gopay w-full resize-none transition-all duration-300 focus:ring-2 focus:ring-[#00AA13]/30"
              placeholder="Jelaskan kriteria UMKM yang Anda cari, nilai tambah jaringan distribusi yang Anda miliki, serta komitmen pendampingan modal..."
            />
          </div>
        </div>

        <!-- SECTION 2: MANDAT & KRITERIA PENDANAAN -->
        <div class="card-tactile-gopay rounded-[22px] p-6 sm:p-7 border border-[#CBD5E1] dark:border-neutral-800 bg-[#FFFFFF] dark:bg-[#13161F] !shadow-none space-y-6">
          <div class="border-b border-neutral-100 dark:border-neutral-800 pb-4">
            <h3 class="text-base sm:text-lg font-poppins font-semibold text-neutral-900 dark:text-white">
              Mandat & Kapasitas Tiket Pendanaan
            </h3>
            <p class="text-xs sm:text-sm font-poppins text-neutral-500 dark:text-neutral-400 mt-1">
              Parameter utama yang menjadi acuan pencocokan peluang usaha UMKM terakreditasi di katalog Anda.
            </p>
          </div>

          <!-- Rentang Tiket Pendanaan -->
          <div class="rounded-2xl border border-emerald-200/90 dark:border-emerald-800/60 bg-emerald-50/30 dark:bg-emerald-950/20 p-5 sm:p-6 space-y-4">
            <h4 class="text-sm sm:text-base font-poppins font-semibold text-neutral-900 dark:text-white">
              Alokasi Tiket Pendanaan per UMKM
            </h4>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div class="space-y-1.5">
                <label class="block text-xs font-poppins font-semibold text-neutral-700 dark:text-neutral-300">
                  Tiket Minimum (Rp)
                </label>
                <div class="relative">
                  <span class="absolute left-4 top-1/2 -translate-y-1/2 text-sm font-poppins font-bold text-neutral-400 select-none pointer-events-none">
                    Rp
                  </span>
                  <input
                    v-model.number="formProfile.minTicket"
                    type="number"
                    step="10000000"
                    min="25000000"
                    class="input-tactile-gopay w-full !h-11 !pl-11 !pr-4 !font-bold !font-poppins tabular-nums !rounded-xl"
                  />
                </div>
                <span class="text-[11px] text-neutral-500 block">
                  Terbilang: <strong class="text-neutral-800 dark:text-neutral-200">{{ formatTargetWords(formProfile.minTicket) }}</strong>
                </span>
              </div>

              <div class="space-y-1.5">
                <label class="block text-xs font-poppins font-semibold text-neutral-700 dark:text-neutral-300">
                  Tiket Maksimum (Rp)
                </label>
                <div class="relative">
                  <span class="absolute left-4 top-1/2 -translate-y-1/2 text-sm font-poppins font-bold text-neutral-400 select-none pointer-events-none">
                    Rp
                  </span>
                  <input
                    v-model.number="formProfile.maxTicket"
                    type="number"
                    step="25000000"
                    min="50000000"
                    class="input-tactile-gopay w-full !h-11 !pl-11 !pr-4 !font-bold !font-poppins tabular-nums !rounded-xl"
                  />
                </div>
                <span class="text-[11px] text-neutral-500 block">
                  Terbilang: <strong class="text-neutral-800 dark:text-neutral-200">{{ formatTargetWords(formProfile.maxTicket) }}</strong>
                </span>
              </div>
            </div>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
            <div class="sm:col-span-2">
              <label class="block text-xs font-poppins font-semibold text-neutral-700 dark:text-neutral-300 mb-1.5">
                Sektor Industri UMKM Prioritas
              </label>
              <input
                v-model="formProfile.preferredSectors"
                type="text"
                class="input-tactile-gopay w-full"
                placeholder="Contoh: Kuliner & Minuman (F&B), Oleh-oleh & FMCG, Agroindustri"
              />
            </div>

            <div>
              <label class="block text-xs font-poppins font-semibold text-neutral-700 dark:text-neutral-300 mb-1.5">
                Skema Pendanaan Utama
              </label>
              <div class="relative">
                <select
                  v-model="formProfile.investmentScheme"
                  class="input-tactile-gopay w-full cursor-pointer appearance-none pr-10"
                >
                  <option value="Bagi Hasil Usaha">Bagi Hasil Usaha</option>
                  <option value="Sindikasi Ekspansi Cabang">Sindikasi Ekspansi Cabang</option>
                  <option value="Pembiayaan Rantai Pasok (Invoice/PO)">Pembiayaan Rantai Pasok (Invoice/PO)</option>
                </select>
                <div class="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-neutral-500 dark:text-neutral-400 flex items-center justify-center">
                  <HugeiconsIcon :icon="ArrowDown01Icon" :size="16" :stroke-width="2.2" />
                </div>
              </div>
            </div>

            <div>
              <label class="block text-xs font-poppins font-semibold text-neutral-700 dark:text-neutral-300 mb-1.5">
                Target Ekspektasi Bagi Hasil Tahunan
              </label>
              <input
                v-model="formProfile.targetRoiRange"
                type="text"
                class="input-tactile-gopay w-full tabular-nums"
                placeholder="Contoh: 14% – 20% per Tahun"
              />
            </div>
          </div>
        </div>

        <!-- SECTION 3: LEGALITAS ENTITAS PERUSAHAAN INVESTOR -->
        <div class="card-tactile-gopay rounded-[22px] p-6 sm:p-7 border border-[#CBD5E1] dark:border-neutral-800 bg-[#FFFFFF] dark:bg-[#13161F] !shadow-none space-y-6">
          <div class="border-b border-neutral-100 dark:border-neutral-800 pb-4">
            <h3 class="text-base sm:text-lg font-poppins font-semibold text-neutral-900 dark:text-white">
              Legalitas & Identitas Hukum Perusahaan
            </h3>
            <p class="text-xs sm:text-sm font-poppins text-neutral-500 dark:text-neutral-400 mt-1">
              Identitas resmi badan hukum (PT) atau investor yang tercantum pada perjanjian kerahasiaan (NDA) dan kontrak investasi.
            </p>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
            <div class="p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/40 space-y-2">
              <span class="text-xs font-poppins font-semibold text-neutral-800 dark:text-neutral-200 block">
                NPWP Badan / Investor Resmi
              </span>
              <input
                v-model="formProfile.npwpEntity"
                type="text"
                class="input-tactile-gopay w-full tabular-nums"
                placeholder="16 Digit NPWP"
              />
              <p class="text-[11px] font-poppins text-neutral-400">
                Digunakan untuk administrasi pemotongan pajak bagi hasil sesuai regulasi.
              </p>
            </div>

            <div class="p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/40 space-y-2">
              <span class="text-xs font-poppins font-semibold text-neutral-800 dark:text-neutral-200 block">
                Nomor NIB / SK Kemenkumham PT
              </span>
              <input
                v-model="formProfile.nibEntity"
                type="text"
                class="input-tactile-gopay w-full tabular-nums"
                placeholder="Nomor NIB / AHU PT"
              />
              <p class="text-[11px] font-poppins text-neutral-400">
                Terverifikasi sebagai entitas investasi resmi di ekosistem Beruang.
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- ========================================================================= -->
      <!-- RIGHT SIDEBAR COLUMN (4 Cols on Desktop)                                  -->
      <!-- ========================================================================= -->
      <div class="col-span-12 lg:col-span-4 space-y-6 sm:space-y-8">

        <!-- WIDGET 1: STATUS AKREDITASI & VERIFIKASI KYC -->
        <div class="card-tactile-gopay rounded-[18px] p-6 space-y-4 border border-[#CBD5E1] dark:border-neutral-800 bg-[#FFFFFF] dark:bg-[#13161F] !shadow-none">
          <div class="border-b border-neutral-100 dark:border-neutral-800 pb-4">
            <h3 class="text-base sm:text-lg font-poppins font-semibold text-neutral-900 dark:text-white">
              Status Akreditasi Investor
            </h3>
            <p class="text-xs sm:text-sm font-poppins text-neutral-500 dark:text-neutral-400 mt-1">
              Kredensial kepatuhan KYC dan verifikasi kemampuan modal oleh tim komite Beruang.
            </p>
          </div>

          <div class="p-3.5 rounded-xl bg-[#F6FCF7] dark:bg-[#00800e]/10 border border-[#00800e]/25 dark:border-[#00C058]/30 flex items-center gap-3">
            <div class="w-10 h-10 rounded-xl bg-[#00800e] text-white flex items-center justify-center shrink-0">
              <HugeiconsIcon :icon="ShieldCheckIcon" :size="20" :stroke-width="2" />
            </div>
            <div class="min-w-0">
              <span class="text-xs sm:text-sm font-poppins font-bold text-neutral-900 dark:text-white block truncate">
                Investor Terakreditasi Penuh
              </span>
              <span class="text-[11px] font-poppins text-[#00800e] dark:text-[#00C058] font-medium block truncate">
                Akses pengajuan Data Room aktif
              </span>
            </div>
          </div>
        </div>

        <!-- WIDGET 2: BERKAS AKREDITASI & KEPATUHAN -->
        <div class="card-tactile-gopay rounded-[18px] p-5 sm:p-6 border border-[#CBD5E1] dark:border-neutral-800 bg-[#FFFFFF] dark:bg-[#13161F] !shadow-none space-y-5">
          <div class="border-b border-neutral-100 dark:border-neutral-800 pb-4 space-y-2">
            <h3 class="text-base sm:text-lg font-poppins font-semibold text-neutral-900 dark:text-white">
              Berkas Kepatuhan Investor
            </h3>
            <p class="text-xs sm:text-sm font-poppins text-neutral-500 dark:text-neutral-400">
              Dokumen legalitas perusahaan dan NDA standar untuk mempercepat persetujuan Data Room UMKM.
            </p>
          </div>

          <div class="grid grid-cols-1 gap-3.5">
            <div
              v-for="doc in investorDocs"
              :key="doc.id"
              class="p-4 rounded-2xl border border-neutral-200/90 dark:border-neutral-800 bg-white dark:bg-[#15161A] space-y-3"
            >
              <div class="flex items-start gap-2.5">
                <HugeiconsIcon
                  :icon="Certificate01Icon"
                  :size="19"
                  :stroke-width="1.9"
                  class="text-[#156374] dark:text-[#50AABF] shrink-0 mt-0.5"
                />
                <div class="min-w-0">
                  <h5 class="text-xs sm:text-sm font-poppins font-semibold text-neutral-900 dark:text-white leading-tight">
                    {{ doc.title }}
                  </h5>
                  <p class="text-[11px] font-poppins text-neutral-500 dark:text-neutral-400 mt-0.5">
                    {{ doc.fileName }} · {{ doc.size }}
                  </p>
                </div>
              </div>
              <div class="flex items-center justify-between pt-2 border-t border-neutral-100 dark:border-neutral-800 text-[11px]">
                <span class="font-semibold text-[#00800e] dark:text-[#00C058] flex items-center gap-1">
                  <HugeiconsIcon :icon="CheckmarkCircle01Icon" :size="13" />
                  <span>Terverifikasi</span>
                </span>
                <span class="text-neutral-400 tabular-nums">{{ doc.uploadedAt }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Reusable Share Profile Modal Component -->
    <BShareModal
      v-model="isShareModalOpen"
      :store-name="`${formProfile.name} — ${formProfile.companyName}`"
      :description="formProfile.description"
      :banner-url="investorStore.profile.bannerUrl"
      :avatar-url="investorStore.profile.avatarUrl || authStore.currentUser?.avatar || '/images/user-profile.png'"
      :is-verified="true"
      @copied="triggerToast('Tautan profil investor berhasil disalin ke clipboard!')"
    />

    <!-- Floating Toast Notification -->
    <Teleport to="body">
      <Transition
        enter-active-class="transition duration-300 ease-out"
        enter-from-class="opacity-0 translate-y-3 sm:translate-y-0 sm:scale-95"
        enter-to-class="opacity-100 translate-y-0 sm:scale-100"
        leave-active-class="transition duration-200 ease-in"
        leave-from-class="opacity-100 translate-y-0 sm:scale-100"
        leave-to-class="opacity-0 translate-y-3 sm:translate-y-0 sm:scale-95"
      >
        <div
          v-if="showToast"
          class="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-4 py-3 rounded-2xl bg-neutral-900/95 dark:bg-white text-white dark:text-neutral-900 border border-neutral-800 dark:border-neutral-200 backdrop-blur-md font-poppins shadow-none"
        >
          <div class="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 dark:text-emerald-600 flex items-center justify-center shrink-0">
            <HugeiconsIcon :icon="CheckmarkCircle01Icon" :size="15" />
          </div>
          <span class="text-xs sm:text-sm font-medium">
            {{ toastMessage }}
          </span>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted, onBeforeUnmount } from 'vue'
import gsap from 'gsap'
import { useAuthStore } from '~/stores/auth'
import { useInvestorStore } from '~/stores/investor'
import BStoreBanner from '~/components/base/BStoreBanner.vue'
import BActionButton from '~/components/base/BActionButton.vue'
import BShareModal from '~/components/base/BShareModal.vue'
import BVerifiedBadge from '~/components/base/BVerifiedBadge.vue'
import { HugeiconsIcon } from '@hugeicons/vue'
import {
  UserCircleIcon,
  CheckmarkCircle01Icon,
  ShieldCheckIcon,
  Share08Icon,
  Building03Icon,
  Location01Icon,
  Award01Icon,
  Certificate01Icon,
  ArrowDown01Icon,
  Coins01Icon,
  PencilEdit02Icon
} from '@hugeicons/core-free-icons'

definePageMeta({
  layout: 'dashboard',
  hideHeader: true
})

const authStore = useAuthStore()
const investorStore = useInvestorStore()

const isShareModalOpen = ref(false)
const showToast = ref(false)
const toastMessage = ref('Profil investor berhasil diperbarui!')
let toastTimer: any = null

function triggerToast(msg?: string) {
  if (msg) toastMessage.value = msg
  showToast.value = true
  if (toastTimer) clearTimeout(toastTimer)
  toastTimer = setTimeout(() => {
    showToast.value = false
  }, 3000)
}

function formatTargetWords(val: number): string {
  if (!val || val <= 0) return '0 Rupiah'
  if (val >= 1000000000) {
    const m = (val / 1000000000).toLocaleString('id-ID', { maximumFractionDigits: 2 })
    return `${m} Miliar Rupiah`
  }
  if (val >= 1000000) {
    const jt = (val / 1000000).toLocaleString('id-ID', { maximumFractionDigits: 1 })
    return `${jt} Juta Rupiah`
  }
  return `Rp ${new Intl.NumberFormat('id-ID').format(val)}`
}

const investorFirstName = computed(() => {
  const name = formProfile.name || authStore.currentUser?.name || 'Fikri'
  return name.split(' ')[0]
})

const formProfile = reactive({
  name: investorStore.profile.name || 'Fikri Setiawan',
  roleTitle: investorStore.profile.roleTitle || 'Managing Partner',
  companyName: investorStore.profile.companyName || 'PT Nusantara Kapital Investama',
  investorType: investorStore.profile.investorType || 'Angel Investor & Sindikasi Institusi',
  city: investorStore.profile.city || 'Jakarta Selatan',
  establishedYear: investorStore.profile.establishedYear || 2020,
  minTicket: investorStore.profile.minTicket || 100000000,
  maxTicket: investorStore.profile.maxTicket || 500000000,
  preferredSectors: investorStore.profile.preferredSectors || 'Kuliner & Minuman (F&B), Oleh-oleh & FMCG, Agroindustri',
  investmentScheme: investorStore.profile.investmentScheme || 'Bagi Hasil Usaha',
  targetRoiRange: investorStore.profile.targetRoiRange || '14% – 20% per Tahun',
  email: investorStore.profile.email || 'fikri@nusantarakapital.co.id',
  whatsapp: investorStore.profile.whatsapp || '+62 811-9283-7465',
  website: investorStore.profile.website || 'nusantarakapital.co.id',
  npwpEntity: investorStore.profile.npwpEntity || '02.918.374.1-012.000',
  nibEntity: investorStore.profile.nibEntity || '9120301928374',
  description: investorStore.profile.description || 'Fokus mendanai ekspansi gerai dan peningkatan kapasitas produksi UMKM sektor F&B, FMCG, dan Agroindustri di Indonesia yang memiliki pencatatan kas rapi dan telah divalidasi oleh konsultan pendamping resmi.'
})

const isDescriptionExpanded = ref(false)
const descriptionThreshold = 180

const displayedDescription = computed(() => {
  const desc = formProfile.description
  if (desc.length <= descriptionThreshold || isDescriptionExpanded.value) {
    return desc
  }
  return desc.slice(0, descriptionThreshold).trim()
})

const hasLongDescription = computed(() => {
  return formProfile.description.length > descriptionThreshold
})

function scrollToEditDescription() {
  const el = document.getElementById('input-investor-narrative')
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'center' })
    el.focus()
  }
}

const investorDocs = [
  {
    id: 'doc-akta',
    title: 'SK Kemenkumham & Akta PT Nusantara Kapital Investama',
    fileName: 'SK-AHU-Nusantara-Kapital.pdf',
    size: '1.8 MB',
    uploadedAt: '12 Jan 2026'
  },
  {
    id: 'doc-nda',
    title: 'Master Non-Disclosure Agreement (NDA) Beruang',
    fileName: 'Master-NDA-Beruang-Signed.pdf',
    size: '640 KB',
    uploadedAt: '15 Jan 2026'
  }
]

const initialSnapshot = ref('')
const isSaving = ref(false)
const pageRootRef = ref<HTMLElement | null>(null)
let gsapCtx: gsap.Context | null = null

function getFormSnapshot(): string {
  return JSON.stringify(formProfile)
}

const hasUnsavedChanges = computed(() => {
  if (!initialSnapshot.value) return false
  return getFormSnapshot() !== initialSnapshot.value
})

onMounted(async () => {
  try {
    await investorStore.fetchProfile()
    Object.assign(formProfile, {
      name: investorStore.profile.name || formProfile.name,
      roleTitle: investorStore.profile.roleTitle || formProfile.roleTitle,
      companyName: investorStore.profile.companyName || formProfile.companyName,
      investorType: investorStore.profile.investorType || formProfile.investorType,
      city: investorStore.profile.city || formProfile.city,
      minTicket: investorStore.profile.minTicket || formProfile.minTicket,
      maxTicket: investorStore.profile.maxTicket || formProfile.maxTicket,
      preferredSectors: investorStore.profile.preferredSectors || formProfile.preferredSectors,
      investmentScheme: investorStore.profile.investmentScheme || formProfile.investmentScheme,
      targetRoiRange: investorStore.profile.targetRoiRange || formProfile.targetRoiRange,
      whatsapp: investorStore.profile.whatsapp || formProfile.whatsapp,
      website: investorStore.profile.website || formProfile.website,
      npwpEntity: investorStore.profile.npwpEntity || formProfile.npwpEntity,
      nibEntity: investorStore.profile.nibEntity || formProfile.nibEntity,
      description: investorStore.profile.description || formProfile.description
    })
  } catch (err: any) {
    console.warn('Gagal sinkron profil investor:', err?.message)
  }

  initialSnapshot.value = getFormSnapshot()

  if (typeof window !== 'undefined' && pageRootRef.value) {
    const prefersReducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches
    if (!prefersReducedMotion) {
      gsapCtx = gsap.context(() => {
        const blocks = pageRootRef.value?.querySelectorAll('.card-tactile-gopay')
        if (blocks && blocks.length > 0) {
          gsap.fromTo(
            blocks,
            { opacity: 0, y: 14 },
            {
              opacity: 1,
              y: 0,
              duration: 0.45,
              stagger: 0.05,
              ease: 'power2.out',
              clearProps: 'all'
            }
          )
        }
      }, pageRootRef.value)
    }
  }
})

onBeforeUnmount(() => {
  if (gsapCtx) {
    gsapCtx.revert()
    gsapCtx = null
  }
})

function onBannerUpdated(newUrl: string) {
  investorStore.updateInvestorBanner(newUrl)
  triggerToast('Sampul profil investor berhasil diperbarui!')
}

function onBannerReset() {
  investorStore.resetInvestorBanner()
  triggerToast('Sampul profil dikembalikan ke setelan awal.')
}

function onAvatarUpdated(newUrl: string) {
  investorStore.updateInvestorAvatar(newUrl)
  if (authStore.currentUser) {
    authStore.updateAvatar(newUrl)
  }
  triggerToast('Foto profil investor berhasil diperbarui!')
}

function onAvatarReset() {
  investorStore.resetInvestorAvatar()
  if (authStore.currentUser) {
    authStore.updateAvatar('/images/user-profile.png')
  }
  triggerToast('Foto profil dikembalikan ke setelan awal.')
}

async function saveProfile() {
  isSaving.value = true
  try {
    await investorStore.updateInvestorProfile({ ...formProfile })
    if (authStore.currentUser) {
      authStore.currentUser.name = formProfile.name
    }
    initialSnapshot.value = getFormSnapshot()
    triggerToast('Perubahan profil investor berhasil disimpan!')
  } catch (err: any) {
    triggerToast('Gagal menyimpan profil investor ke server.')
  } finally {
    isSaving.value = false
  }
}
</script>

<style scoped>
.input-tactile-gopay {
  width: 100%;
  display: block;
  padding: 0.625rem 0.875rem;
  border-radius: 0.75rem;
  border: 1.5px solid #CBD5E1;
  background-color: #FFFFFF;
  color: #0F172A;
  font-family: 'Poppins', sans-serif;
  font-size: 0.875rem;
  line-height: 1.25rem;
  transition: all 0.15s ease-in-out;
  outline: none;
  box-shadow: none !important;
}

select.input-tactile-gopay {
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  padding-right: 2.5rem !important;
}

:deep(.dark) .input-tactile-gopay,
html.dark .input-tactile-gopay,
.dark .input-tactile-gopay {
  border-color: #334155 !important;
  background-color: #161922 !important;
  color: #F8FAFC !important;
}

.input-tactile-gopay:focus {
  border-color: #156374;
  box-shadow: none !important;
}

:deep(.dark) .input-tactile-gopay:focus,
html.dark .input-tactile-gopay:focus,
.dark .input-tactile-gopay:focus {
  border-color: #50AABF !important;
}

.input-tactile-gopay::placeholder {
  color: #94A3B8;
}

:deep(.dark) .input-tactile-gopay::placeholder,
html.dark .input-tactile-gopay::placeholder,
.dark .input-tactile-gopay::placeholder {
  color: #64748B !important;
}
</style>

