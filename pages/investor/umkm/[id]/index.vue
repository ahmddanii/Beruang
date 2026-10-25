<template>
  <div ref="pageRootRef" class="space-y-6 sm:space-y-8 pb-32 sm:pb-16 font-poppins text-neutral-900 dark:text-neutral-100">
    <!-- Toast Feedback Notification -->
    <Transition
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="opacity-0 -translate-y-2 scale-95"
      enter-to-class="opacity-100 translate-y-0 scale-100"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="opacity-100 translate-y-0 scale-100"
      leave-to-class="opacity-0 -translate-y-2 scale-95"
    >
      <div
        v-if="toastMessage"
        class="fixed top-6 left-1/2 -translate-x-1/2 z-50 px-4 py-2.5 rounded-full bg-neutral-900/95 dark:bg-neutral-800/95 text-white border border-neutral-700/60 backdrop-blur-md text-xs font-poppins font-semibold shadow-none flex items-center gap-2 pointer-events-none"
      >
        <HugeiconsIcon :icon="CheckmarkCircle01Icon" :size="16" class="text-emerald-400 shrink-0" />
        <span>{{ toastMessage }}</span>
      </div>
    </Transition>

    <!-- ========================================================================= -->
    <!-- 1. TOP PAGE HEADER: Title on Left & Kembali ke Jaringan on Right           -->
    <!-- ========================================================================= -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 min-h-[44px]">
      <div class="flex items-center gap-2.5 sm:gap-3">
        <HugeiconsIcon
          :icon="UserCircleIcon"
          :size="26"
          :stroke-width="2.2"
          class="text-neutral-900 dark:text-white shrink-0"
        />
        <h1 class="font-poppins font-semibold text-2xl sm:text-3xl text-neutral-900 dark:text-white tracking-tight leading-tight">
          Profil Usaha
        </h1>
      </div>

      <div class="flex items-center gap-2.5 self-start sm:self-auto">
        <BActionButton
          to="/investor"
          variant="default"
          :huge-icon="ArrowLeft01Icon"
          :icon-size="14"
        >
          Kembali ke Jaringan
        </BActionButton>
      </div>
    </div>

    <!-- ========================================================================= -->
    <!-- 2. HERO PROFILE SECTION (MENGGUNAKAN COMPONENT BStoreBanner & DESIGN SYSTEM) -->
    <!-- ========================================================================= -->
    <div class="space-y-4">
      <!-- Reusable Store Banner & Avatar Hero Component (Mode Read-Only untuk Investor) -->
      <BStoreBanner
        readonly
        :store-name="item.name"
        :owner-name="profileData.ownerName"
        :owner-avatar-url="profileData.avatarUrl"
        :banner-url="profileData.bannerUrl"
      />

      <!-- Identity & Metadata Details below Avatar -->
      <div class="space-y-6 sm:space-y-8 w-full">
        <!-- Top Row: Brand Name + Verified Badge on Left, Investor Actions on Right -->
        <div class="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pt-3 sm:pt-4">
          <div class="flex flex-col space-y-2.5 sm:space-y-3.5">
            <!-- 1. Lokasi & Tahun Berdiri -->
            <p class="text-xs sm:text-sm font-poppins text-neutral-500 dark:text-neutral-400 flex items-center gap-1.5">
              <HugeiconsIcon :icon="Location01Icon" :size="15" class="text-neutral-400 dark:text-neutral-500 shrink-0" />
              <span>{{ profileData.city }}, sejak {{ item.establishedYear }}</span>
            </p>

            <!-- 2. Nama Brand UMKM + Badge Terverifikasi -->
            <div class="flex items-center gap-2.5 sm:gap-3 flex-wrap py-0.5">
              <h2 class="text-2xl sm:text-3xl font-poppins font-bold text-neutral-900 dark:text-white tracking-tight leading-tight">
                {{ item.name }}
              </h2>
              <BVerifiedBadge />
            </div>

            <!-- 3. Metadata Baris Pokok: Sektor, Gerai Aktif, Tenaga Kerja -->
            <div class="flex items-center flex-wrap gap-y-2 gap-x-2.5 sm:gap-x-3.5 pt-1.5 text-xs sm:text-[13px] font-poppins text-neutral-600 dark:text-neutral-400">
              <div class="inline-flex items-center gap-1.5">
                <HugeiconsIcon :icon="Building03Icon" :size="15" class="text-neutral-500 dark:text-neutral-400 shrink-0" />
                <span>{{ item.sector }}</span>
              </div>

              <span class="w-1.5 h-1.5 rounded-full bg-neutral-400 dark:bg-neutral-500 self-end mb-[1px] shrink-0" aria-hidden="true" />

              <div class="inline-flex items-center gap-1.5">
                <HugeiconsIcon :icon="Store01Icon" :size="15" class="text-neutral-500 dark:text-neutral-400 shrink-0" />
                <span>{{ profileData.outletsCount }} Gerai Aktif</span>
              </div>

              <span class="w-1.5 h-1.5 rounded-full bg-neutral-400 dark:bg-neutral-500 self-end mb-[1px] shrink-0" aria-hidden="true" />

              <div class="inline-flex items-center gap-1.5">
                <HugeiconsIcon :icon="UserGroupIcon" :size="15" class="text-neutral-500 dark:text-neutral-400 shrink-0" />
                <span>{{ profileData.employeesCount }} Tenaga Kerja</span>
              </div>
            </div>
          </div>

          <!-- Investor Action Buttons on Right (Menggunakan BActionButton) -->
          <div class="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 w-full sm:w-auto [&>*]:w-full sm:[&>*]:w-auto pt-1 sm:pt-0">
            <!-- Simpan Usaha / Hapus dari Simpan Button -->
            <BActionButton
              :variant="isItemBookmarked ? 'red' : 'default'"
              custom-class="w-full sm:w-auto justify-center text-center"
              @click="toggleBookmark()"
            >
              <template #icon>
                <HugeiconsIcon
                  :icon="Bookmark02Icon"
                  :size="15"
                  :stroke-width="2"
                  :class="[
                    'shrink-0 transition-colors',
                    isItemBookmarked
                      ? '[&_path]:fill-current fill-current text-white'
                      : 'text-neutral-500 dark:text-neutral-400'
                  ]"
                />
              </template>
              <span>{{ isItemBookmarked ? (t('profile_remove_from_saved') || 'Hapus dari Simpan') : (t('profile_save_business') || 'Simpan Usaha') }}</span>
            </BActionButton>

            <!-- Hubungi UMKM Button -->
            <BActionButton
              to="/investor/pesan"
              variant="green"
              :huge-icon="Comment01Icon"
              :icon-size="15"
              custom-class="w-full sm:w-auto justify-center text-center"
            >
              Hubungi UMKM
            </BActionButton>

            <!-- Simulasi ROI Button -->
            <BActionButton
              variant="default"
              :huge-icon="AnalyticsUpIcon"
              :icon-size="14"
              custom-class="w-full sm:w-auto justify-center text-center"
              title="Buka Kalkulator Simulasi Bagi Hasil"
              @click="scrollToCalculator()"
            >
              Simulasi ROI
            </BActionButton>

            <!-- Bagikan Profil Button -->
            <BActionButton
              variant="default"
              :huge-icon="Share08Icon"
              :icon-size="14"
              custom-class="w-full sm:w-auto justify-center text-center"
              title="Bagikan Profil Usaha"
              @click="isShareModalOpen = true"
            >
              Bagikan Profil
            </BActionButton>
          </div>
        </div>

        <!-- Box Tentang Bisnis Saya (Ref: LinkedIn Tentang Card) -->
        <div class="card-tactile-gopay rounded-[20px] p-5 sm:p-6 border border-[#CBD5E1] dark:border-neutral-800 bg-[#F8FAFC] dark:bg-[#13161F] space-y-3 !shadow-none">
          <div class="flex items-center justify-between">
            <h3 class="text-base sm:text-lg font-poppins font-semibold text-neutral-900 dark:text-white">
              Tentang Bisnis Saya
            </h3>
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
    <!-- 3. MAIN 2-COLUMN LAYOUT (8 Cols Content + 4 Cols Sidebar)                  -->
    <!-- ========================================================================= -->
    <div class="grid grid-cols-12 gap-6 sm:gap-8 items-start">

      <!-- ========================================================================= -->
      <!-- LEFT CONTENT COLUMN (8 Cols on Desktop)                                  -->
      <!-- ========================================================================= -->
      <div class="col-span-12 lg:col-span-8 space-y-6 sm:space-y-8">

        <!-- SECTION 1: TENTANG USAHA & MODEL BISNIS -->
        <div class="card-tactile-gopay rounded-[22px] p-6 sm:p-7 border border-[#CBD5E1] dark:border-neutral-800 bg-[#FFFFFF] dark:bg-[#13161F] space-y-6 !shadow-none">
          <div class="border-b border-neutral-100 dark:border-neutral-800 pb-4">
            <h3 class="text-base sm:text-lg font-poppins font-semibold text-neutral-900 dark:text-white">
              Tentang Usaha & Model Bisnis
            </h3>
            <p class="text-xs sm:text-sm font-poppins text-neutral-500 dark:text-neutral-400 mt-1">
              Data identitas pokok, saluran kontak resmi, dan narasi ringkas usaha yang telah divalidasi konsultan pendamping.
            </p>
          </div>

          <!-- Bagian 1: Identitas Pokok Usaha -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
            <div>
              <label class="block text-xs font-poppins font-semibold text-neutral-700 dark:text-neutral-300 mb-1.5">
                Nama Usaha / Brand UMKM
              </label>
              <input
                :value="item.name"
                type="text"
                readonly
                class="input-tactile-gopay cursor-default"
              />
            </div>

            <div>
              <label class="block text-xs font-poppins font-semibold text-neutral-700 dark:text-neutral-300 mb-1.5">
                Nama Pemilik / Founder
              </label>
              <input
                :value="profileData.ownerName"
                type="text"
                readonly
                class="input-tactile-gopay cursor-default"
              />
            </div>

            <div>
              <label class="block text-xs font-poppins font-semibold text-neutral-700 dark:text-neutral-300 mb-1.5">
                Sektor Industri Usaha
              </label>
              <input
                :value="item.sector"
                type="text"
                readonly
                class="input-tactile-gopay cursor-default"
              />
            </div>

            <div>
              <label class="block text-xs font-poppins font-semibold text-neutral-700 dark:text-neutral-300 mb-1.5">
                Tahun Berdiri Operasional
              </label>
              <input
                :value="item.establishedYear"
                type="text"
                readonly
                class="input-tactile-gopay tabular-nums cursor-default"
              />
            </div>

            <div>
              <label class="block text-xs font-poppins font-semibold text-neutral-700 dark:text-neutral-300 mb-1.5">
                Jumlah Gerai
              </label>
              <input
                :value="`${profileData.outletsCount} Gerai Aktif`"
                type="text"
                readonly
                class="input-tactile-gopay tabular-nums cursor-default"
              />
            </div>

            <div>
              <label class="block text-xs font-poppins font-semibold text-neutral-700 dark:text-neutral-300 mb-1.5">
                Jumlah Karyawan
              </label>
              <input
                :value="`${profileData.employeesCount} Tenaga Kerja`"
                type="text"
                readonly
                class="input-tactile-gopay tabular-nums cursor-default"
              />
            </div>
          </div>

          <!-- Bagian 2: TARGET KEBUTUHAN MODAL TOKO -->
          <div class="rounded-2xl border border-emerald-200/90 dark:border-emerald-800/60 bg-emerald-50/30 dark:bg-emerald-950/20 p-5 sm:p-6 space-y-4">
            <div>
              <h3 class="text-base sm:text-lg font-poppins font-semibold text-neutral-900 dark:text-white">
                Target Kebutuhan Modal Toko
              </h3>
            </div>

            <div class="space-y-1.5">
              <label class="block text-xs font-poppins font-semibold text-neutral-700 dark:text-neutral-300">
                Nominal Target Permodalan (Rp)
              </label>
              <div class="relative">
                <span class="absolute left-4 top-1/2 -translate-y-1/2 text-sm sm:text-base font-poppins font-bold text-neutral-400 select-none pointer-events-none">
                  Rp
                </span>
                <input
                  :value="formatNumber(item.fundingTarget)"
                  type="text"
                  readonly
                  class="input-tactile-gopay !h-12 sm:!h-13 !pl-12 !pr-4 !text-base sm:!text-lg !font-bold !font-poppins tabular-nums !rounded-xl text-neutral-900 dark:text-white bg-white dark:bg-[#13161F] cursor-default"
                />
              </div>

              <!-- Spelled-out Helper -->
              <div class="text-xs font-poppins pt-0.5 px-0.5">
                <span class="text-neutral-500 dark:text-neutral-400">
                  Terbilang: <span class="font-semibold text-neutral-800 dark:text-neutral-200">{{ formatTargetWords(item.fundingTarget) }}</span>
                </span>
              </div>
            </div>
          </div>

          <!-- Bagian 3: Kontak & Saluran Toko -->
          <div class="pt-5 border-t border-neutral-100 dark:border-neutral-800 space-y-4">
            <div>
              <h4 class="text-xs font-poppins font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
                Kontak & Saluran Toko
              </h4>
              <p class="text-[11px] font-poppins text-neutral-400 mt-0.5">
                Saluran komunikasi resmi dan alamat fisik yang dapat dihubungi investor terakreditasi.
              </p>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
              <div>
                <label class="block text-xs font-poppins font-medium text-neutral-600 dark:text-neutral-300 mb-1.5">
                  WhatsApp Bisnis Resmi
                </label>
                <div class="relative">
                  <span class="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400">
                    <HugeiconsIcon :icon="Comment01Icon" :size="14" />
                  </span>
                  <input
                    :value="profileData.whatsapp"
                    type="text"
                    readonly
                    class="input-tactile-gopay has-prefix-icon text-xs tabular-nums cursor-default"
                  />
                </div>
              </div>

              <div>
                <label class="block text-xs font-poppins font-medium text-neutral-600 dark:text-neutral-300 mb-1.5">
                  Akun Instagram Usaha
                </label>
                <div class="relative">
                  <span class="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400 text-xs font-bold">
                    @
                  </span>
                  <input
                    :value="profileData.instagram"
                    type="text"
                    readonly
                    class="input-tactile-gopay has-prefix-at text-xs cursor-default"
                  />
                </div>
              </div>

              <div>
                <label class="block text-xs font-poppins font-medium text-neutral-600 dark:text-neutral-300 mb-1.5">
                  Kota Domisili Gerai Utama
                </label>
                <div class="relative">
                  <span class="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400">
                    <HugeiconsIcon :icon="Location01Icon" :size="14" />
                  </span>
                  <input
                    :value="profileData.city"
                    type="text"
                    readonly
                    class="input-tactile-gopay has-prefix-icon text-xs cursor-default"
                  />
                </div>
              </div>

              <div>
                <label class="block text-xs font-poppins font-medium text-neutral-600 dark:text-neutral-300 mb-1.5">
                  Alamat Lengkap Gerai
                </label>
                <div class="relative">
                  <span class="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400">
                    <HugeiconsIcon :icon="Store01Icon" :size="14" />
                  </span>
                  <input
                    :value="profileData.address"
                    type="text"
                    readonly
                    class="input-tactile-gopay has-prefix-icon text-xs cursor-default"
                  />
                </div>
              </div>
            </div>
          </div>

          <!-- Bagian 4: Narrative Bio Pitch -->
          <div class="pt-5 border-t border-neutral-100 dark:border-neutral-800 space-y-2">
            <div class="flex items-center justify-between mb-1.5">
              <label class="block text-xs font-poppins font-semibold text-neutral-700 dark:text-neutral-300">
                Deskripsi Singkat & Proposisi Nilai (Executive Narrative)
              </label>
            </div>
            <textarea
              :value="profileData.description"
              rows="4"
              readonly
              class="input-tactile-gopay resize-none cursor-default"
            />
          </div>
        </div>

        <!-- SECTION: KALKULATOR SIMULASI ROI & BAGI HASIL INVESTOR -->
        <div id="kalkulator-roi" class="scroll-mt-6">
          <BInvestmentRoiCalculator
            :business-name="item.name"
            :default-investment="item.fundingTarget || 50000000"
            @submit-offer="handleCalculatorOffer"
          />
        </div>

        <!-- SECTION 2: LEGALITAS & KEPATUHAN RESMI -->
        <div class="card-tactile-gopay rounded-[22px] p-6 sm:p-7 border border-[#CBD5E1] dark:border-neutral-800 bg-[#FFFFFF] dark:bg-[#13161F] space-y-6 !shadow-none">
          <div class="border-b border-neutral-100 dark:border-neutral-800 pb-4">
            <h3 class="text-base sm:text-lg font-poppins font-semibold text-neutral-900 dark:text-white">
              Legalitas & Kepatuhan Resmi
            </h3>
            <p class="text-xs sm:text-sm font-poppins text-neutral-500 dark:text-neutral-400 mt-1">
              Nomor identitas hukum yang divalidasi oleh sistem perizinan pemerintah Republik Indonesia.
            </p>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
            <!-- NIB Card -->
            <div class="p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/40 space-y-2">
              <div>
                <span class="text-xs font-poppins font-semibold text-neutral-800 dark:text-neutral-200">
                  Nomor Induk Berusaha (NIB OSS RBA)
                </span>
              </div>
              <input
                :value="profileData.nib"
                type="text"
                readonly
                class="input-tactile-gopay text-xs font-mono tabular-nums cursor-default"
              />
              <p class="text-[11px] font-poppins text-neutral-500 dark:text-neutral-400">
                Terdaftar resmi pada sistem Kementerian Investasi / BKPM
              </p>
            </div>

            <!-- NPWP Card -->
            <div class="p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/40 space-y-2">
              <div>
                <span class="text-xs font-poppins font-semibold text-neutral-800 dark:text-neutral-200">
                  NPWP Usaha / Badan
                </span>
              </div>
              <input
                :value="profileData.npwp"
                type="text"
                readonly
                class="input-tactile-gopay text-xs font-mono tabular-nums cursor-default"
              />
              <p class="text-[11px] font-poppins text-neutral-500 dark:text-neutral-400">
                Kepatuhan SPT Tahunan & Pajak UMKM Final 0,5%
              </p>
            </div>

            <!-- Halal BPJPH Card -->
            <div class="p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/40 space-y-2">
              <div>
                <span class="text-xs font-poppins font-semibold text-neutral-800 dark:text-neutral-200">
                  Sertifikasi Halal BPJPH
                </span>
              </div>
              <input
                :value="profileData.halalNumber"
                type="text"
                readonly
                class="input-tactile-gopay text-xs font-mono tabular-nums cursor-default"
              />
              <p class="text-[11px] font-poppins text-neutral-500 dark:text-neutral-400">
                Badan Penyelenggara Jaminan Produk Halal Kemenag RI
              </p>
            </div>

            <!-- HKI DJKI Card -->
            <div class="p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/40 space-y-2">
              <div>
                <span class="text-xs font-poppins font-semibold text-neutral-800 dark:text-neutral-200">
                  Sertifikat Hak Merek (DJKI)
                </span>
              </div>
              <input
                :value="profileData.hkiNumber"
                type="text"
                readonly
                class="input-tactile-gopay text-xs font-mono tabular-nums cursor-default"
              />
              <p class="text-[11px] font-poppins text-neutral-500 dark:text-neutral-400">
                Perlindungan Kekayaan Intelektual Kelas 30 & 43
              </p>
            </div>
          </div>
        </div>

        <!-- SECTION 3: PRODUK UNGGULAN & UNIT PENDORONG OMZET -->
        <div class="card-tactile-gopay rounded-[22px] p-6 sm:p-7 border border-[#CBD5E1] dark:border-neutral-800 bg-[#FFFFFF] dark:bg-[#13161F] space-y-6 !shadow-none">
          <div class="border-b border-neutral-100 dark:border-neutral-800 pb-4">
            <h3 class="text-base sm:text-lg font-poppins font-semibold text-neutral-900 dark:text-white">
              Produk Unggulan & Unit Pendorong Omzet
            </h3>
            <p class="text-xs sm:text-sm font-poppins text-neutral-500 dark:text-neutral-400 mt-1">
              Lini produk andalan yang menyumbang transaksi uang masuk terbesar dan margin keuntungan tinggi.
            </p>
          </div>

          <!-- Product Cards Grid -->
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div
              v-for="prod in featuredProducts"
              :key="prod.id"
              class="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/40 dark:bg-neutral-900/40 overflow-hidden flex flex-col justify-between hover:border-neutral-300 dark:hover:border-neutral-700 transition-all duration-200 shadow-none"
            >
              <!-- Product Image -->
              <div class="relative h-32 w-full bg-neutral-200 dark:bg-neutral-800 overflow-hidden">
                <img
                  :src="prod.imageUrl || '/images/default-store-banner.jpg'"
                  :alt="prod.name"
                  loading="lazy"
                  decoding="async"
                  class="w-full h-full object-cover object-center transition-transform duration-300"
                />
                <div v-if="prod.categoryBadge" class="absolute top-2.5 left-2.5">
                  <BBadge variant="neutral" size="sm" pill>
                    {{ prod.categoryBadge }}
                  </BBadge>
                </div>
              </div>

              <!-- Product Details -->
              <div class="p-4 flex-1 flex flex-col justify-between space-y-3">
                <div>
                  <h4 class="text-sm font-poppins font-semibold text-neutral-900 dark:text-white line-clamp-1">
                    {{ prod.name }}
                  </h4>
                  <p class="text-xs font-poppins text-neutral-500 dark:text-neutral-400 mt-1 line-clamp-2 leading-relaxed">
                    {{ prod.description }}
                  </p>
                </div>

                <!-- Metrics: Price, Margin, Volume -->
                <div class="pt-3 border-t border-neutral-200/70 dark:border-neutral-800/80 space-y-1.5 text-xs font-poppins">
                  <div class="flex items-center justify-between">
                    <span class="text-neutral-500">Harga Jual:</span>
                    <span class="font-semibold text-neutral-900 dark:text-white tabular-nums">
                      Rp {{ formatNumber(prod.price) }}
                    </span>
                  </div>
                  <div class="flex items-center justify-between">
                    <span class="text-neutral-500">Margin Kotor:</span>
                    <span class="font-bold text-[#00AA13] dark:text-emerald-400 tabular-nums">
                      {{ prod.grossMargin }}%
                    </span>
                  </div>
                  <div class="flex items-center justify-between text-[11px] text-neutral-400">
                    <span>Terjual Bulanan:</span>
                    <span class="tabular-nums font-medium text-neutral-700 dark:text-neutral-300">
                      ~{{ prod.monthlyVolume }} unit/bln
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- SECTION 4: POSTINGAN & AKTIVITAS USAHA -->
        <div class="space-y-4 sm:space-y-5">
          <!-- Section Heading (Clean without redundant wrapping card) -->
          <div class="flex items-center justify-between pb-1">
            <div>
              <h3 class="text-base sm:text-lg font-poppins font-semibold text-neutral-900 dark:text-white">
                Postingan & Aktivitas Usaha
              </h3>
              <p class="text-xs sm:text-sm font-poppins text-neutral-500 dark:text-neutral-400 mt-0.5">
                Pembaruan kegiatan operasional, perkembangan gerai, dan capaian yang dipublikasikan oleh {{ item.name }}.
              </p>
            </div>
          </div>

          <!-- Feed Posts matching Jaringan Concept: Rata kiri di desktop, maks 2 kolom saat ada postingan berikutnya -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 items-start">
            <article
              v-for="post in umkmPosts"
              :key="post.id"
              :id="'umkm-card-' + post.id"
              class="gsap-feed-card lazy-render-card card-tactile-gopay w-full rounded-[20px] sm:rounded-[22px] border border-[#CBD5E1] dark:border-neutral-800 bg-[#FFFFFF] dark:bg-[#13161F] font-poppins overflow-hidden !shadow-none transition-all duration-300 hover:border-neutral-300 dark:hover:border-neutral-700 flex flex-col justify-between"
            >
              <div class="p-4 sm:p-5 space-y-3.5 sm:space-y-4 flex-1 flex flex-col justify-between">
                <!-- 1. Post Author Header: Avatar + Info Stack + Top-Right Save & Share Action Buttons (Identical to Jaringan) -->
                <div class="flex items-start justify-between gap-2.5 sm:gap-3">
                  <div class="flex items-center gap-2.5 sm:gap-3 min-w-0 flex-1">
                    <!-- Circular Avatar (w-11 h-11 sm:w-12 sm:h-12 rounded-full) -->
                    <div class="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-amber-400/90 dark:bg-amber-500/90 p-2 shrink-0 flex items-center justify-center border border-amber-300/60 overflow-hidden shadow-none">
                      <img
                        :src="profileData.avatarUrl"
                        :alt="post.name"
                        loading="lazy"
                        decoding="async"
                        class="w-full h-full object-contain rounded-full"
                      />
                    </div>

                    <!-- 3-line info stack matching Jaringan: Location, Name, Upload Timestamp -->
                    <div class="min-w-0 flex-1 flex flex-col justify-center gap-1">
                      <div class="inline-flex items-center gap-1 text-[11px] sm:text-xs font-poppins font-medium text-neutral-500 dark:text-neutral-400 leading-tight">
                        <HugeiconsIcon :icon="Location01Icon" :size="12" class="text-[#156374] dark:text-[#50AABF] shrink-0" />
                        <span class="truncate">{{ post.city }}</span>
                      </div>

                      <h4 class="font-poppins font-bold text-sm sm:text-base text-neutral-900 dark:text-white leading-tight truncate">
                        {{ post.name }}
                      </h4>

                      <div class="inline-flex items-center gap-1 text-[11px] sm:text-xs font-poppins text-neutral-500 dark:text-neutral-400 leading-tight">
                        <HugeiconsIcon :icon="Time02Icon" :size="12" class="text-neutral-400 dark:text-neutral-500 shrink-0" />
                        <span>{{ post.postedAt || '2 jam yang lalu' }}</span>
                      </div>
                    </div>
                  </div>

                  <!-- Right Corner: Save (Bookmark) & Share Buttons (Identical to Jaringan) -->
                  <div class="flex items-center gap-1.5 shrink-0">
                    <button
                      type="button"
                      :aria-label="post.bookmarked || item.bookmarked ? 'Hapus UMKM dari daftar simpan' : 'Simpan UMKM ke daftar simpan'"
                      :class="[
                        'w-8 h-8 sm:w-8.5 sm:h-8.5 rounded-lg sm:rounded-xl transition-colors cursor-pointer flex items-center justify-center border shadow-none',
                        post.bookmarked || item.bookmarked
                          ? 'bg-[#E6F4F7] dark:bg-[#156374]/25 text-[#156374] dark:text-[#50AABF] border-[#156374]/35 dark:border-[#50AABF]/40'
                          : 'bg-white dark:bg-[#18191E] text-neutral-600 dark:text-neutral-300 border-[#CBD5E1] dark:border-neutral-700 hover:bg-[#F8FAFC] dark:hover:bg-[#262626] hover:text-neutral-900 dark:hover:text-white'
                      ]"
                      :title="post.bookmarked || item.bookmarked ? 'Hapus dari Simpanan' : 'Simpan ke Daftar Simpan'"
                      @click="toggleBookmark(post)"
                    >
                      <HugeiconsIcon
                        :icon="Bookmark02Icon"
                        :size="16"
                        :stroke-width="2"
                        :class="post.bookmarked || item.bookmarked ? '[&_path]:fill-current fill-current' : ''"
                      />
                    </button>

                    <button
                      type="button"
                      aria-label="Bagikan Tautan Postingan"
                      class="w-8 h-8 sm:w-8.5 sm:h-8.5 rounded-lg sm:rounded-xl bg-white dark:bg-[#18191E] text-neutral-600 dark:text-neutral-300 border border-[#CBD5E1] dark:border-neutral-700 hover:bg-[#F8FAFC] dark:hover:bg-[#262626] hover:text-neutral-900 dark:hover:text-white transition-colors flex items-center justify-center cursor-pointer shadow-none"
                      title="Bagikan Tautan Postingan"
                      @click="isShareModalOpen = true"
                    >
                      <HugeiconsIcon :icon="Share08Icon" :size="16" :stroke-width="2" />
                    </button>
                  </div>
                </div>

                <!-- 2. Post Caption / Pitch Text (Matching Jaringan) -->
                <p class="text-xs sm:text-sm font-poppins text-neutral-700 dark:text-neutral-300 leading-relaxed line-clamp-3">
                  "{{ post.pitchSummary }}"
                </p>

                <!-- 3. Media Carousel (Matching responsive dimensions for multi-column grid) -->
                <div
                  class="feed-media-viewport relative w-full aspect-[4/3] sm:aspect-square rounded-xl sm:rounded-2xl overflow-hidden border border-[#E2E8F0] dark:border-neutral-800 bg-neutral-900 select-none group/carousel shadow-none"
                >
                  <div
                    class="flex w-full h-full transition-transform duration-300 ease-out"
                    :style="{ transform: `translateX(-${getSlideIndex(post.id) * 100}%)` }"
                  >
                    <div
                      v-for="(imgUrl, sIdx) in getPostImages(post)"
                      :key="`${post.id}-slide-${sIdx}`"
                      class="w-full h-full shrink-0 relative overflow-hidden bg-neutral-900"
                    >
                      <img
                        :src="imgUrl"
                        :alt="`${post.name} - Slide ${sIdx + 1}`"
                        loading="lazy"
                        decoding="async"
                        class="w-full h-full object-cover object-center cursor-pointer"
                        @click="openFullscreenPreview(post, getSlideIndex(post.id))"
                      />
                    </div>
                  </div>

                  <!-- Top-Left Slide Counter Pill -->
                  <div
                    v-if="getPostImages(post).length > 1"
                    class="absolute top-3 left-3 z-20 px-2 py-0.5 rounded-full bg-neutral-950/75 text-white text-[11px] font-poppins font-semibold tabular-nums border border-white/15 backdrop-blur-xs pointer-events-none"
                  >
                    {{ getSlideIndex(post.id) + 1 }} / {{ getPostImages(post).length }}
                  </div>

                  <!-- Top-Right FullScreenIcon Button -->
                  <button
                    type="button"
                    aria-label="Pratinjau Layar Penuh"
                    title="Pratinjau Layar Penuh"
                    class="absolute top-3 right-3 z-20 w-8 h-8 rounded-full bg-neutral-950/75 hover:bg-neutral-950 text-white border border-white/20 backdrop-blur-xs flex items-center justify-center transition-all duration-200 cursor-pointer shadow-none"
                    @click.stop="openFullscreenPreview(post, getSlideIndex(post.id))"
                  >
                    <HugeiconsIcon :icon="FullScreenIcon" :size="15" :stroke-width="2.2" />
                  </button>

                  <!-- Before Button -->
                  <button
                    v-if="getPostImages(post).length > 1 && getSlideIndex(post.id) > 0"
                    type="button"
                    aria-label="Slide Sebelumnya"
                    class="carousel-before-btn absolute left-2.5 inset-y-0 my-auto z-20 w-8 h-8 rounded-full bg-neutral-950/75 hover:bg-neutral-950 text-white border border-white/25 backdrop-blur-xs flex items-center justify-center transition-colors duration-200 cursor-pointer shadow-none"
                    @click.stop="prevSlide(post)"
                  >
                    <HugeiconsIcon :icon="ArrowLeft01Icon" :size="16" :stroke-width="2.4" />
                  </button>

                  <!-- Next Button -->
                  <button
                    v-if="getPostImages(post).length > 1 && getSlideIndex(post.id) < getPostImages(post).length - 1"
                    type="button"
                    aria-label="Slide Berikutnya"
                    class="carousel-next-btn absolute right-2.5 inset-y-0 my-auto z-20 w-8 h-8 rounded-full bg-neutral-950/75 hover:bg-neutral-950 text-white border border-white/25 backdrop-blur-xs flex items-center justify-center transition-colors duration-200 cursor-pointer shadow-none"
                    @click.stop="nextSlide(post)"
                  >
                    <HugeiconsIcon :icon="ArrowRight01Icon" :size="16" :stroke-width="2.4" />
                  </button>

                  <!-- Bottom Dots -->
                  <div
                    v-if="getPostImages(post).length > 1"
                    class="absolute bottom-2.5 left-1/2 -translate-x-1/2 z-20 px-2 py-1 rounded-full bg-neutral-950/65 backdrop-blur-xs border border-white/15 flex items-center gap-1.5"
                  >
                    <button
                      v-for="(_, dIdx) in getPostImages(post)"
                      :key="`${post.id}-dot-${dIdx}`"
                      type="button"
                      :class="[
                        'h-1.5 rounded-full transition-all duration-200 cursor-pointer',
                        getSlideIndex(post.id) === dIdx ? 'w-3.5 bg-white' : 'w-1.5 bg-white/50 hover:bg-white/80'
                      ]"
                      @click.stop="setSlideIndex(post.id, dIdx)"
                    />
                  </div>
                </div>
              </div>
            </article>
          </div>
        </div>
      </div>

      <!-- ========================================================================= -->
      <!-- RIGHT SIDEBAR COLUMN (4 Cols on Desktop)                                  -->
      <!-- ========================================================================= -->
      <div class="col-span-12 lg:col-span-4 space-y-6 sm:space-y-8">

        <!-- WIDGET 1: KONSULTAN PENDAMPING RESMI -->
        <div class="card-tactile-gopay rounded-[18px] p-6 space-y-5 border border-[#CBD5E1] dark:border-neutral-800 bg-[#FFFFFF] dark:bg-[#13161F] !shadow-none">
          <div class="border-b border-neutral-100 dark:border-neutral-800 pb-4">
            <h3 class="text-base sm:text-lg font-poppins font-semibold text-neutral-900 dark:text-white">
              Konsultan Pendamping
            </h3>
            <p class="text-xs sm:text-sm font-poppins text-neutral-500 dark:text-neutral-400 mt-1">
              Konsultan kurator resmi yang mengawal validasi dan kepatuhan usaha ini.
            </p>
          </div>

          <div class="flex items-center gap-3 p-3 rounded-xl bg-neutral-50 dark:bg-neutral-900/50 border border-neutral-200/80 dark:border-neutral-800">
            <img
              src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=120&auto=format&fit=crop&q=80"
              :alt="item.consultantName"
              loading="lazy"
              decoding="async"
              class="w-12 h-12 rounded-xl object-cover shrink-0"
            />
            <div class="min-w-0">
              <span class="text-xs font-poppins font-bold text-neutral-900 dark:text-white block truncate">
                {{ item.consultantName }}
              </span>
              <span class="text-[11px] font-poppins text-neutral-500 dark:text-neutral-400 block truncate">
                Advisor Kurasi Finansial & Legalitas
              </span>
            </div>
          </div>
        </div>

        <!-- WIDGET 2: DOKUMEN DATA ROOM & ARSIP PERIZINAN -->
        <div class="card-tactile-gopay rounded-[18px] p-5 sm:p-6 border border-[#CBD5E1] dark:border-neutral-800 bg-[#FFFFFF] dark:bg-[#13161F] space-y-5 !shadow-none">
          <div class="border-b border-neutral-100 dark:border-neutral-800 pb-4 space-y-3">
            <div>
              <h3 class="text-base sm:text-lg font-poppins font-semibold text-neutral-900 dark:text-white">
                Dokumen Data Room & Arsip Perizinan
              </h3>
              <p class="text-xs sm:text-sm font-poppins text-neutral-500 dark:text-neutral-400 mt-1">
                Berkas perizinan autentik dan dokumen ruang data untuk peninjauan kelayakan investasi.
              </p>
            </div>

            <!-- Progress Bar below container description -->
            <div class="pt-1 space-y-1.5">
              <div class="flex items-center justify-between text-xs font-poppins">
                <span class="text-neutral-600 dark:text-neutral-400 flex items-center gap-1.5">
                  <span class="font-medium">Kelengkapan:</span>
                  <span class="font-bold text-neutral-900 dark:text-white tabular-nums">
                    {{ uploadedDocsCount }}/{{ legalDocuments.length }} Terpenuhi
                  </span>
                </span>
                <span class="font-bold tabular-nums text-[#00AA13]">
                  {{ docsCompletionPercent }}%
                </span>
              </div>
              <div class="w-full h-2 rounded-full bg-neutral-100 dark:bg-neutral-800 overflow-hidden">
                <div
                  class="h-full rounded-full transition-all duration-500 ease-out bg-[#00AA13]"
                  :style="{ width: `${docsCompletionPercent}%` }"
                />
              </div>
            </div>

            <!-- Tombol Akses Data Room Finansial -->
            <div class="pt-2">
              <NuxtLink
                v-if="item.accessStatus === 'APPROVED'"
                :to="`/investor/pesan?umkm=${item.id}`"
                class="btn-pill-action btn-pill-action-green w-full justify-center text-center shadow-none"
              >
                <HugeiconsIcon :icon="Comment01Icon" :size="15" />
                <span>Buka Diskusi UMKM</span>
              </NuxtLink>
              <NuxtLink
                v-else-if="item.accessStatus === 'NONE'"
                :to="`/investor/umkm/${item.id}/ajukan-akses`"
                class="btn-pill-action btn-pill-action-green w-full justify-center text-center shadow-none"
              >
                <span>Ajukan Akses Ruang Data</span>
              </NuxtLink>
              <div
                v-else
                class="btn-pill-action w-full justify-center text-center opacity-80 cursor-default shadow-none"
              >
                <span>Menunggu Persetujuan Akses</span>
              </div>
            </div>
          </div>

          <!-- Documents List Grid (1 COLUMN) -->
          <div class="grid grid-cols-1 gap-4">
            <div
              v-for="doc in legalDocuments"
              :key="doc.id"
              :class="[
                'p-4 sm:p-4.5 rounded-2xl border transition-all duration-200 flex flex-col justify-between space-y-3.5 shadow-none',
                doc.file
                  ? 'border-neutral-200/90 dark:border-neutral-800 bg-white dark:bg-[#15161A]'
                  : 'border-dashed border-neutral-300 dark:border-neutral-700 bg-neutral-50/40 dark:bg-neutral-900/30'
              ]"
            >
              <!-- Document Header Details -->
              <div class="space-y-1.5">
                <div class="flex items-start gap-2.5">
                  <HugeiconsIcon
                    :icon="getDocIcon(doc.id)"
                    :size="20"
                    :stroke-width="1.8"
                    class="text-neutral-900 dark:text-white shrink-0 mt-0.5"
                  />
                  <div class="min-w-0">
                    <h5 class="text-xs sm:text-sm font-poppins font-semibold text-neutral-900 dark:text-white leading-tight">
                      {{ doc.title }}
                    </h5>
                    <p class="text-[11px] font-poppins text-neutral-400 mt-0.5 leading-snug">
                      {{ doc.requirementNote }}
                    </p>
                  </div>
                </div>

                <p class="text-xs font-poppins text-neutral-500 dark:text-neutral-400 leading-relaxed pt-0.5">
                  {{ doc.subtitle }}
                </p>
              </div>

              <!-- Document File Status -->
              <div class="pt-2 border-t border-neutral-100 dark:border-neutral-800/80">
                <div v-if="doc.file" class="space-y-2.5">
                  <div class="flex items-center justify-between gap-2 p-2 rounded-xl bg-neutral-50 dark:bg-neutral-900/60 border border-neutral-200/60 dark:border-neutral-800">
                    <div class="flex items-center gap-2 min-w-0">
                      <div class="w-6 h-6 rounded bg-red-100 text-red-600 flex items-center justify-center shrink-0 text-[10px] font-bold">
                        PDF
                      </div>
                      <div class="min-w-0">
                        <span class="text-xs font-poppins font-medium text-neutral-800 dark:text-neutral-200 truncate block">
                          {{ doc.file.name }}
                        </span>
                        <span class="text-[10px] font-poppins text-neutral-400 block tabular-nums">
                          {{ doc.file.size }} · Diverifikasi {{ doc.file.uploadedAt }}
                        </span>
                      </div>
                    </div>
                  </div>

                  <button
                    type="button"
                    class="btn-pill-action !w-full !justify-center !h-8 !px-2 !text-xs !rounded-lg !gap-1.5 cursor-pointer shadow-none"
                    @click="openDocPreview(doc)"
                  >
                    <HugeiconsIcon :icon="EyeIcon" :size="14" class="text-neutral-900 dark:text-white" />
                    <span>Lihat Dokumen</span>
                  </button>
                </div>

                <div v-else class="flex items-center justify-between gap-2 pt-0.5">
                  <span class="text-[11px] font-poppins text-neutral-400 dark:text-neutral-500 flex items-center gap-1">
                    <HugeiconsIcon :icon="AlertCircleIcon" :size="13" class="text-amber-500 shrink-0" />
                    <span>Belum diunggah oleh UMKM</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- ========================================================================= -->
    <!-- MODAL: PRATINJAU DOKUMEN PERIZINAN (Sama persis dengan Profil Usaha UMKM)  -->
    <!-- ========================================================================= -->
    <BModal
      v-model="isDocPreviewModalOpen"
      :title="activePreviewDoc?.title || 'Pratinjau Dokumen'"
      size="lg"
    >
      <div v-if="activePreviewDoc" class="space-y-4 font-poppins">
        <!-- Document Certificate Preview Frame -->
        <div class="rounded-2xl border border-neutral-200 dark:border-neutral-800 p-6 bg-neutral-50 dark:bg-neutral-900 text-center space-y-4">
          <div class="w-16 h-16 mx-auto rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 text-[#00AA13] flex items-center justify-center">
            <HugeiconsIcon :icon="Certificate01Icon" :size="32" />
          </div>

          <div class="space-y-1">
            <BBadge variant="success" size="sm" pill dot class="mb-1">
              Dokumen Terverifikasi Sah
            </BBadge>
            <h3 class="text-base sm:text-lg font-bold text-neutral-900 dark:text-white">
              {{ activePreviewDoc.title }}
            </h3>
            <p class="text-xs text-neutral-500 dark:text-neutral-400 max-w-md mx-auto">
              {{ activePreviewDoc.subtitle }}
            </p>
          </div>

          <!-- Metadata Spec -->
          <div class="inline-grid grid-cols-2 gap-4 p-3 rounded-xl bg-white dark:bg-[#18191E] border border-neutral-200/80 dark:border-neutral-800 text-xs text-left max-w-sm mx-auto w-full">
            <div>
              <span class="text-neutral-400 block text-[10px]">Nama Berkas:</span>
              <span class="font-medium text-neutral-800 dark:text-neutral-200 truncate block">
                {{ activePreviewDoc.file?.name }}
              </span>
            </div>
            <div>
              <span class="text-neutral-400 block text-[10px]">Ukuran:</span>
              <span class="font-medium text-neutral-800 dark:text-neutral-200 tabular-nums block">
                {{ activePreviewDoc.file?.size }}
              </span>
            </div>
            <div>
              <span class="text-neutral-400 block text-[10px]">Kategori:</span>
              <span class="font-medium text-neutral-800 dark:text-neutral-200 block">
                {{ activePreviewDoc.categoryBadge }}
              </span>
            </div>
            <div>
              <span class="text-neutral-400 block text-[10px]">Status:</span>
              <span class="font-bold text-[#00AA13] block">
                Tervalidasi Sistem
              </span>
            </div>
          </div>
        </div>

        <p class="text-[11px] text-neutral-400 text-center leading-relaxed">
          Dokumen ini diunggah oleh pemilik usaha dan telah diautentikasi oleh konsultan pendamping resmi Beruang.
        </p>
      </div>

      <template #footer>
        <div class="flex items-center justify-end gap-2 w-full">
          <BButton
            variant="secondary"
            size="sm"
            @click="isDocPreviewModalOpen = false"
          >
            Tutup
          </BButton>
        </div>
      </template>
    </BModal>

    <!-- Reusable Share Profile Modal Component -->
    <BShareModal
      v-model="isShareModalOpen"
      :store-name="item.name"
      :description="profileData.description"
      :banner-url="profileData.bannerUrl"
      :avatar-url="profileData.avatarUrl"
      :is-verified="true"
      @copied="triggerToast('Tautan profil usaha berhasil disalin ke clipboard!')"
    />

    <!-- Fullscreen Post Media Preview -->
    <Teleport to="body">
      <div
        v-if="fullscreenPost"
        class="fixed inset-0 z-[100] bg-black/90 backdrop-blur-md flex flex-col items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200 font-poppins select-none"
        role="dialog"
        aria-modal="true"
        aria-label="Pratinjau Gambar Layar Penuh"
        @click.self="closeFullscreenPreview"
      >
        <div class="relative w-full max-w-4xl flex-1 max-h-[82vh] flex items-center justify-center overflow-hidden rounded-2xl border border-white/20 bg-neutral-950">
          <img
            :src="getPostImages(fullscreenPost)[fullscreenSlideIndex]"
            :alt="`${fullscreenPost.name} - Slide ${fullscreenSlideIndex + 1}`"
            class="max-w-full max-h-[80vh] w-auto h-auto object-contain select-none transition-all duration-300"
          />

          <div
            v-if="getPostImages(fullscreenPost).length > 1"
            class="absolute top-4 left-4 z-30 px-3 py-1 rounded-full bg-neutral-900/90 text-white text-xs font-poppins font-semibold tabular-nums border border-white/25 backdrop-blur-xs pointer-events-none"
          >
            {{ fullscreenSlideIndex + 1 }} / {{ getPostImages(fullscreenPost).length }}
          </div>

          <button
            type="button"
            aria-label="Tutup Pratinjau Layar Penuh"
            class="group absolute top-4 right-4 z-30 w-10 h-10 rounded-full bg-neutral-900/90 hover:bg-neutral-800 text-white border border-white/30 backdrop-blur-xs flex items-center justify-center transition-all duration-200 cursor-pointer shadow-none"
            @click.stop="closeFullscreenPreview"
          >
            <HugeiconsIcon
              :icon="Cancel01Icon"
              :size="20"
              :stroke-width="2.4"
              class="transition-transform duration-300 ease-out group-hover:rotate-90 group-active:rotate-180 animate-in spin-in-90"
            />
          </button>

          <button
            v-if="getPostImages(fullscreenPost).length > 1 && fullscreenSlideIndex > 0"
            type="button"
            aria-label="Slide Sebelumnya di Layar Penuh"
            class="absolute left-4 inset-y-0 my-auto z-30 w-11 h-11 rounded-full bg-neutral-900/90 hover:bg-neutral-800 text-white border border-white/30 backdrop-blur-xs flex items-center justify-center transition-colors duration-200 cursor-pointer shadow-none"
            @click.stop="prevFullscreenSlide"
          >
            <HugeiconsIcon :icon="ArrowLeft01Icon" :size="20" :stroke-width="2.4" />
          </button>

          <button
            v-if="getPostImages(fullscreenPost).length > 1 && fullscreenSlideIndex < getPostImages(fullscreenPost).length - 1"
            type="button"
            aria-label="Slide Berikutnya di Layar Penuh"
            class="absolute right-4 inset-y-0 my-auto z-30 w-11 h-11 rounded-full bg-neutral-900/90 hover:bg-neutral-800 text-white border border-white/30 backdrop-blur-xs flex items-center justify-center transition-colors duration-200 cursor-pointer shadow-none"
            @click.stop="nextFullscreenSlide"
          >
            <HugeiconsIcon :icon="ArrowRight01Icon" :size="20" :stroke-width="2.4" />
          </button>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import gsap from 'gsap'
import { useRoute } from 'vue-router'
import { useInvestorStore, type MarketplaceUmkm } from '~/stores/investor'
import { useUmkmStore } from '~/stores/umkm'
import BStoreBanner from '~/components/base/BStoreBanner.vue'
import BBadge from '~/components/base/BBadge.vue'
import BActionButton from '~/components/base/BActionButton.vue'
import BButton from '~/components/base/BButton.vue'
import BModal from '~/components/base/BModal.vue'
import BShareModal from '~/components/base/BShareModal.vue'
import BVerifiedBadge from '~/components/base/BVerifiedBadge.vue'
import BInvestmentRoiCalculator from '~/components/investor/BInvestmentRoiCalculator.vue'
import { HugeiconsIcon } from '@hugeicons/vue'
import {
  UserCircleIcon,
  CheckmarkCircle01Icon,
  FileValidationIcon,
  EyeIcon,
  AlertCircleIcon,
  Share08Icon,
  Building03Icon,
  Location01Icon,
  Time02Icon,
  Store01Icon,
  UserGroupIcon,
  Certificate01Icon,
  Comment01Icon,
  CheckmarkBadge01Icon,
  ArrowLeft01Icon,
  ArrowRight01Icon,
  Cancel01Icon,
  FullScreenIcon,
  Bookmark02Icon,
  CourtLawIcon,
  HalalIcon,
  Package01Icon,
  CopyrightIcon,
  MedicineBottle01Icon,
  AnalyticsUpIcon
} from '@hugeicons/core-free-icons'

definePageMeta({
  layout: 'dashboard',
  hideHeader: true
})

const route = useRoute()
const investorStore = useInvestorStore()
const umkmStore = useUmkmStore()
const { t } = useLanguage()
const pageRootRef = ref<HTMLElement | null>(null)
let gsapCtx: gsap.Context | null = null

const umkmId = computed(() => (route.params.id as string) || 'umkm-01')

const item = computed<MarketplaceUmkm>(() => {
  const sourceList = investorStore.marketplaceList || []
  return (
    sourceList.find(
      m => m.id === umkmId.value || m.umkmRefId === umkmId.value
    ) || sourceList[0] || {
      id: umkmId.value || 'umkm-01',
      umkmRefId: umkmId.value || 'umkm-01',
      name: umkmStore.profile.name || 'Usaha UMKM',
      code: 'BERU-UMK-01',
      sector: umkmStore.profile.sector || 'Kuliner & Minuman (F&B)',
      city: umkmStore.profile.city || 'Indonesia',
      establishedYear: umkmStore.profile.establishedYear || 2021,
      postedAt: 'Terverifikasi',
      fundingTarget: 250000000,
      marginPercentage: 48,
      growthYoY: 25,
      healthScore: 80,
      certifiedAt: 'Terakreditasi BNSP',
      consultantName: 'Konsultan Mitra Beruang',
      pitchSummary: umkmStore.profile.description || umkmStore.profile.pitchSummary || 'Usaha bertumbuh dengan tata kelola keuangan terverifikasi konsultan mitra.',
      tags: ['Ready for Funding'],
      accessStatus: 'NONE',
      bookmarked: false
    }
  )
})

const isItemBookmarked = computed(() => {
  const targetId = item.value?.id
  if (!targetId) return false
  const found = (investorStore.marketplaceList || []).find(m => m.id === targetId || m.umkmRefId === targetId)
  return found ? Boolean(found.bookmarked) : Boolean(item.value?.bookmarked)
})

// Rich Profile Metadata per UMKM ID (Synced with umkmStore for primary/active UMKM)
const profileData = computed(() => {
  const current = item.value
  const isPrimaryUmkm = current.id === 'umkm-01' || current.umkmRefId === 'umkm-01' || current.id === umkmStore.profile.id

  return {
    ownerName: isPrimaryUmkm ? (umkmStore.profile.ownerName || 'Pemilik Usaha') : `Founder ${current.name}`,
    city: isPrimaryUmkm ? (umkmStore.profile.city || 'Indonesia') : `${current.city}, Indonesia`,
    outletsCount: isPrimaryUmkm ? (umkmStore.profile.outletsCount || 1) : 1,
    employeesCount: isPrimaryUmkm ? (umkmStore.profile.employeesCount || 5) : 5,
    bannerUrl: isPrimaryUmkm
      ? (umkmStore.profile.bannerUrl || '/images/default-store-banner.jpg')
      : (current.postImageUrl || '/images/default-store-banner.jpg'),
    avatarUrl: isPrimaryUmkm
      ? (umkmStore.profile.ownerAvatarUrl || '/logo.svg')
      : '/logo.svg',
    description: isPrimaryUmkm
      ? (umkmStore.profile.description || current.pitchSummary)
      : current.pitchSummary,
    whatsapp: '+62 812-3456-7890',
    instagram: current.name.toLowerCase().replace(/[^a-z0-9]/g, '.'),
    address: `Jl. Utama Niaga No. 45, ${current.city}`,
    nib: isPrimaryUmkm ? (umkmStore.profile.nib || '1209000123456') : '1209000884921',
    npwp: isPrimaryUmkm ? (umkmStore.profile.npwp || '81.423.891.4-429.000') : '81.902.311.2-401.000',
    halalNumber: isPrimaryUmkm ? (umkmStore.profile.halalNumber || 'ID321100019283') : 'ID321100088210',
    hkiNumber: isPrimaryUmkm ? (umkmStore.profile.hkiNumber || 'IPT20250918290') : 'IPT20250994120'
  }
})

// Expandable narrative preview in "Tentang Bisnis Saya"
const isDescriptionExpanded = ref(false)
const descriptionThreshold = 180

const displayedDescription = computed(() => {
  const desc = profileData.value.description || ''
  if (desc.length <= descriptionThreshold || isDescriptionExpanded.value) {
    return desc
  }
  return desc.slice(0, descriptionThreshold).trim()
})

const hasLongDescription = computed(() => {
  return (profileData.value.description || '').length > descriptionThreshold
})

// Featured Products
interface FeaturedProduct {
  id: string
  name: string
  categoryBadge: string
  price: number
  grossMargin: number
  monthlyVolume: number
  description: string
  imageUrl?: string
}

const featuredProducts = ref<FeaturedProduct[]>([
  {
    id: 'prod-1',
    name: 'Kopi Susu Senja Aren 1L',
    categoryBadge: 'Best Seller',
    price: 85000,
    grossMargin: 52,
    monthlyVolume: 620,
    description: 'Kemasan botol 1000ml kopi susu gula aren murni. Pendorong repeat order takeaway mingguan.',
    imageUrl: 'https://images.unsplash.com/photo-1517256064527-09c73fc73e38?w=350&auto=format&fit=crop&q=80'
  },
  {
    id: 'prod-2',
    name: 'Signature Espresso Roast 250g',
    categoryBadge: 'B2B & Retail',
    price: 75000,
    grossMargin: 48,
    monthlyVolume: 350,
    description: 'Biji kopi arabika Malabar & Gayo medium-dark roast untuk pasokan gerai mitra B2B.',
    imageUrl: 'https://images.unsplash.com/photo-1587734195503-904fca47e0e9?w=350&auto=format&fit=crop&q=80'
  },
  {
    id: 'prod-3',
    name: 'Cold Brew Vanilla Cream 250ml',
    categoryBadge: 'Signature RTD',
    price: 28000,
    grossMargin: 58,
    monthlyVolume: 840,
    description: 'Ekstrak seduh dingin 18 jam dengan sirup vanila organik & susu krim segar.',
    imageUrl: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?w=350&auto=format&fit=crop&q=80'
  }
])

// Posts belonging to this UMKM
const umkmPosts = computed<MarketplaceUmkm[]>(() => {
  const targetId = item.value.umkmRefId || item.value.id
  const targetName = item.value.name.toLowerCase().trim()
  const matched = investorStore.marketplaceList.filter(
    m =>
      m.id === targetId ||
      m.umkmRefId === targetId ||
      m.name.toLowerCase().trim() === targetName
  )
  return matched.length > 0 ? matched : [item.value]
})

// Carousel State & Multi-Image Fallback
const activeSlides = ref<Record<string, number>>({})
const fallbackPostImagesById: Record<string, string[]> = {
  'umkm-01': [
    'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=900&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=900&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1511920170033-f8396924c348?w=900&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=900&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=900&auto=format&fit=crop&q=80'
  ],
  'umkm-03': [
    'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=900&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=900&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=900&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=900&auto=format&fit=crop&q=80'
  ]
}

function getPostImages(post: MarketplaceUmkm): string[] {
  if (post.postImages && post.postImages.length > 1) return post.postImages
  if (fallbackPostImagesById[post.id]) return fallbackPostImagesById[post.id]!
  if (post.postImages && post.postImages.length > 0) return post.postImages
  return [post.postImageUrl || '/images/default-store-banner.jpg']
}

function getSlideIndex(postId: string): number {
  return activeSlides.value[postId] ?? 0
}

function setSlideIndex(postId: string, idx: number) {
  activeSlides.value[postId] = idx
}

function nextSlide(post: MarketplaceUmkm) {
  const imgs = getPostImages(post)
  const cur = getSlideIndex(post.id)
  if (cur < imgs.length - 1) activeSlides.value[post.id] = cur + 1
}

function prevSlide(post: MarketplaceUmkm) {
  const cur = getSlideIndex(post.id)
  if (cur > 0) activeSlides.value[post.id] = cur - 1
}

// Fullscreen Preview
const fullscreenPost = ref<MarketplaceUmkm | null>(null)
const fullscreenSlideIndex = ref(0)

function openFullscreenPreview(post: MarketplaceUmkm, slideIdx = 0) {
  fullscreenPost.value = post
  fullscreenSlideIndex.value = slideIdx
}

function closeFullscreenPreview() {
  fullscreenPost.value = null
}

function nextFullscreenSlide() {
  if (!fullscreenPost.value) return
  const imgs = getPostImages(fullscreenPost.value)
  if (fullscreenSlideIndex.value < imgs.length - 1) {
    fullscreenSlideIndex.value += 1
    activeSlides.value[fullscreenPost.value.id] = fullscreenSlideIndex.value
  }
}

function prevFullscreenSlide() {
  if (!fullscreenPost.value) return
  if (fullscreenSlideIndex.value > 0) {
    fullscreenSlideIndex.value -= 1
    activeSlides.value[fullscreenPost.value.id] = fullscreenSlideIndex.value
  }
}

// Legal Documents (Data Room)
interface LegalDocItem {
  id: string
  title: string
  subtitle: string
  categoryBadge: string
  requirementNote: string
  file: {
    name: string
    size: string
    uploadedAt: string
    isVerified: boolean
  } | null
}

const legalDocuments = ref<LegalDocItem[]>([
  {
    id: 'sku',
    title: 'Surat Keterangan Usaha (SKU)',
    subtitle: 'Surat Keterangan Usaha resmi dari kelurahan/kecamatan setempat yang menerangkan kepemilikan unit usaha aktif.',
    categoryBadge: 'Wajib UMKM',
    requirementNote: 'Syarat dasar kelayakan operasional usaha',
    file: {
      name: 'SKU_Kopi_Senja_Nusantara_2026.pdf',
      size: '1.4 MB',
      uploadedAt: '12 Oktober 2026',
      isVerified: true
    }
  },
  {
    id: 'akta',
    title: 'Akta Pendirian Badan Usaha',
    subtitle: 'Dokumen autentik pendirian badan usaha (PT Perorangan, PT, CV, atau Firma) yang disahkan oleh Notaris.',
    categoryBadge: 'Badan Usaha / PT / CV',
    requirementNote: 'Bukti legalitas pendirian entitas bisnis resmi',
    file: {
      name: 'Akta_Notaris_PT_Senja_Berkah_Abadi.pdf',
      size: '3.2 MB',
      uploadedAt: '15 September 2026',
      isVerified: true
    }
  },
  {
    id: 'kemenkumham',
    title: 'SK Kemenkumham',
    subtitle: 'Surat Keputusan Pengesahan Badan Hukum resmi dari Kementerian Hukum dan HAM Republik Indonesia.',
    categoryBadge: 'Pengesahan Hukum',
    requirementNote: 'Terdaftar resmi di database Administrasi Hukum Umum (AHU)',
    file: {
      name: 'SK_Kemenkumham_AHU_0029182_2024.pdf',
      size: '1.1 MB',
      uploadedAt: '18 September 2026',
      isVerified: true
    }
  },
  {
    id: 'halal',
    title: 'Sertifikat Halal',
    subtitle: 'Sertifikasi jaminan produk halal resmi dari BPJPH Kementerian Agama.',
    categoryBadge: 'Khusus FnB / Kuliner',
    requirementNote: 'Wajib kepatuhan sektor FnB konsumen muslim',
    file: {
      name: 'Sertifikat_Halal_BPJPH_ID321100019283.pdf',
      size: '2.5 MB',
      uploadedAt: '20 Agustus 2026',
      isVerified: true
    }
  },
  {
    id: 'haki',
    title: 'Sertifikat Merek (HAKI)',
    subtitle: 'Surat pendaftaran merek dagang melalui DJKI untuk melindungi identitas brand.',
    categoryBadge: 'Perlindungan Brand',
    requirementNote: 'Mencegah plagiarisme dan mengunci valuasi brand',
    file: {
      name: 'HAKI_DJKI_Merek_KopiSenja_IPT2025.pdf',
      size: '1.8 MB',
      uploadedAt: '05 Juli 2026',
      isVerified: true
    }
  }
])

function getDocIcon(id: string) {
  switch (id) {
    case 'sku':
      return Certificate01Icon
    case 'akta':
      return Building03Icon
    case 'kemenkumham':
      return CourtLawIcon
    case 'halal':
      return HalalIcon
    case 'pirt':
      return Package01Icon
    case 'haki':
      return CopyrightIcon
    case 'bpom':
      return MedicineBottle01Icon
    default:
      return Certificate01Icon
  }
}

const uploadedDocsCount = computed(() => legalDocuments.value.filter(d => d.file !== null).length)
const docsCompletionPercent = computed(() => {
  const total = legalDocuments.value.length
  return total ? Math.round((uploadedDocsCount.value / total) * 100) : 0
})

const isDocPreviewModalOpen = ref(false)
const activePreviewDoc = ref<LegalDocItem | null>(null)

function openDocPreview(doc: LegalDocItem) {
  activePreviewDoc.value = doc
  isDocPreviewModalOpen.value = true
}

// Share & Toast
const isShareModalOpen = ref(false)
const toastMessage = ref('')
let toastTimer: any = null

function triggerToast(msg: string) {
  toastMessage.value = msg
  if (toastTimer) clearTimeout(toastTimer)
  toastTimer = setTimeout(() => {
    toastMessage.value = ''
  }, 2500)
}

function toggleBookmark(post?: any) {
  // If post is a DOM Event or missing valid id, default to item.value
  const isPostObject = post && typeof post === 'object' && 'id' in post && typeof post.id === 'string' && !('target' in post)
  const targetId = isPostObject ? post.id : item.value.id
  const targetName = isPostObject ? post.name : item.value.name

  investorStore.toggleBookmark(targetId)

  // Sync item.value if in fallback list or local ref
  if (item.value && item.value.id === targetId) {
    const storeItem = (investorStore.marketplaceList || []).find(m => m.id === targetId)
    if (storeItem) {
      item.value.bookmarked = storeItem.bookmarked
    } else {
      item.value.bookmarked = !item.value.bookmarked
    }
  }

  const isNowBookmarked = item.value.id === targetId ? isItemBookmarked.value : Boolean(post?.bookmarked)
  if (isNowBookmarked) {
    triggerToast(`${targetName} disimpan ke daftar Simpan!`)
  } else {
    triggerToast(`${targetName} dihapus dari daftar Simpan.`)
  }
}

function formatNumber(val: number): string {
  return new Intl.NumberFormat('id-ID').format(val || 0)
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

function scrollToCalculator() {
  const el = document.getElementById('kalkulator-roi')
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }
}

function handleCalculatorOffer(offer: { amount: number; tenor: number; share: number }) {
  triggerToast(`Simulasi komitmen Rp ${new Intl.NumberFormat('id-ID').format(offer.amount)} tersimpan! Meneruskan...`)
  setTimeout(() => {
    navigateTo({
      path: `/investor/umkm/${item.value.id}/ajukan-akses`,
      query: {
        amount: offer.amount,
        tenor: offer.tenor,
        share: offer.share
      }
    })
  }, 1000)
}

onMounted(async () => {
  umkmStore.initBannerFromStorage()
  umkmStore.initAvatarFromStorage()
  umkmStore.initQuickProfileFromStorage()
  investorStore.initPostsFromStorage()
  await investorStore.fetchMarketplace()

  if (typeof window !== 'undefined') {
    try {
      const savedProds = localStorage.getItem('umkm_featured_products')
      if (savedProds) {
        const parsed = JSON.parse(savedProds)
        if (Array.isArray(parsed) && parsed.length > 0) {
          featuredProducts.value = parsed
        }
      }
    } catch {
      // ignore
    }

    if (pageRootRef.value) {
      const prefersReducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches
      if (!prefersReducedMotion) {
        gsapCtx = gsap.context(() => {
          const cards = pageRootRef.value?.querySelectorAll('.card-tactile-gopay')
          if (cards && cards.length > 0) {
            gsap.fromTo(
              cards,
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
  }
})

onBeforeUnmount(() => {
  if (gsapCtx) {
    gsapCtx.revert()
    gsapCtx = null
  }
})
</script>

<style scoped>
/* Hilangkan efek drop-shadow & box-shadow pada container dan seluruh elemen di halaman profil usaha */
.card-tactile-gopay,
:deep(.card-tactile-gopay) {
  background-color: #FFFFFF !important;
  box-shadow: none !important;
  filter: none !important;
  border-width: 1.5px !important;
  border-color: #CBD5E1 !important;
}

.dark .card-tactile-gopay,
:deep(.dark .card-tactile-gopay),
:deep(.dark) .card-tactile-gopay {
  background-color: #13161F !important;
  border-color: rgba(255, 255, 255, 0.15) !important;
  box-shadow: none !important;
  filter: none !important;
}

.card-tactile-gopay::before,
:deep(.card-tactile-gopay::before) {
  display: none !important;
  box-shadow: none !important;
}

/* Hilangkan segala bentuk shadow dan drop-shadow pada child elements / containers */
:deep(.card-tactile-gopay *),
:deep([class*="shadow-"]) {
  box-shadow: none !important;
  filter: none !important;
}

.input-tactile-gopay {
  width: 100%;
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

.input-tactile-gopay.has-prefix-rp {
  padding-left: 2.75rem !important;
}

.input-tactile-gopay.has-prefix-icon {
  padding-left: 2.5rem !important;
}

.input-tactile-gopay.has-prefix-at {
  padding-left: 2.25rem !important;
}

.dark .input-tactile-gopay,
:deep(.dark .input-tactile-gopay),
:deep(.dark) .input-tactile-gopay,
html.dark .input-tactile-gopay {
  border-color: #334155 !important;
  background-color: #161922 !important;
  color: #F8FAFC !important;
}

.input-tactile-gopay:focus {
  border-color: #156374;
  box-shadow: none !important;
}

@media (max-width: 639px) {
  .feed-media-viewport {
    height: 270px !important;
    max-height: 72vw !important;
    aspect-ratio: 4 / 3 !important;
  }
}
</style>
