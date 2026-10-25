<template>
  <div class="space-y-6 sm:space-y-8 pb-32 sm:pb-16 font-poppins text-neutral-900 dark:text-neutral-100">
    <!-- 1. Top Page Header: Title on Left & Simpan Perubahan on Right (1 Baris Sejajar) -->
    <div class="flex items-center justify-between gap-4 min-h-[44px]">
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
    </div>

    <!-- ========================================================================= -->
    <!-- 1. HERO PROFILE SECTION (CLEAN DIRECT DISPLAY WITHOUT WRAPPING CONTAINER)  -->
    <!-- ========================================================================= -->
    <div class="space-y-4">
      <!-- Reusable Store Banner & Avatar Hero Component with full crop/zoom/upload -->
      <BStoreBanner
        :store-name="formProfile.name"
        :owner-name="ownerFirstName"
        :owner-avatar-url="umkmStore.profile.ownerAvatarUrl || authStore.currentUser?.avatar || '/images/user-profile.png'"
        :banner-url="umkmStore.profile.bannerUrl"
        @update:banner-url="onBannerUpdated"
        @reset:banner-url="onBannerReset"
        @update:owner-avatar-url="onAvatarUpdated"
        @reset:owner-avatar-url="onAvatarReset"
      />

      <!-- Identity & Metadata Details below Avatar (Lebar sejajar rata kiri kanan dengan banner & grid) -->
      <div class="space-y-6 sm:space-y-8 w-full">
        <!-- Top Row: Brand Name + Verified Badge on Left, Bagikan Profil on Right -->
        <div class="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pt-3 sm:pt-4">
          <div class="flex flex-col space-y-2.5 sm:space-y-3.5">
            <!-- 1. Lokasi & Tahun Berdiri -->
            <p class="text-xs sm:text-sm font-poppins text-neutral-500 dark:text-neutral-400 flex items-center gap-1.5">
              <HugeiconsIcon :icon="Location01Icon" :size="15" class="text-neutral-400 dark:text-neutral-500 shrink-0" />
              <span>{{ formProfile.city }}, sejak {{ formProfile.establishedYear }}</span>
            </p>

            <!-- 2. Nama Brand UMKM + Badge Terverifikasi -->
            <div class="flex items-center gap-2.5 sm:gap-3 flex-wrap py-0.5">
              <h2 class="text-2xl sm:text-3xl font-poppins font-bold text-neutral-900 dark:text-white tracking-tight leading-tight">
                {{ formProfile.name || 'Kopi Senja Nusantara' }}
              </h2>
              <BVerifiedBadge />
            </div>

            <!-- 3. Metadata Baris Pokok: Sektor, Gerai Aktif, Tenaga Kerja -->
            <div class="flex items-center flex-wrap gap-y-2 gap-x-2.5 sm:gap-x-3.5 pt-1.5 text-xs sm:text-[13px] font-poppins text-neutral-600 dark:text-neutral-400">
              <div class="inline-flex items-center gap-1.5">
                <HugeiconsIcon :icon="Building03Icon" :size="15" class="text-neutral-500 dark:text-neutral-400 shrink-0" />
                <span>{{ formProfile.sector }}</span>
              </div>

              <span class="w-1.5 h-1.5 rounded-full bg-neutral-400 dark:bg-neutral-500 self-end mb-[1px] shrink-0" aria-hidden="true" />

              <div class="inline-flex items-center gap-1.5">
                <HugeiconsIcon :icon="Store01Icon" :size="15" class="text-neutral-500 dark:text-neutral-400 shrink-0" />
                <span>{{ formProfile.outletsCount }} Gerai Aktif</span>
              </div>

              <span class="w-1.5 h-1.5 rounded-full bg-neutral-400 dark:bg-neutral-500 self-end mb-[1px] shrink-0" aria-hidden="true" />

              <div class="inline-flex items-center gap-1.5">
                <HugeiconsIcon :icon="UserGroupIcon" :size="15" class="text-neutral-500 dark:text-neutral-400 shrink-0" />
                <span>{{ formProfile.employeesCount }} Tenaga Kerja</span>
              </div>
            </div>
          </div>

          <div class="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 w-full sm:w-auto [&>*]:w-full sm:[&>*]:w-auto pt-1 sm:pt-0">
            <!-- Simpan Perubahan Button: di samping kiri Bagikan Profil -->
            <button
              type="button"
              :disabled="!hasUnsavedChanges || isSaving"
              :class="[
                'group select-none justify-center text-center w-full sm:w-auto',
                hasUnsavedChanges
                  ? 'btn-pill-action-green'
                  : 'btn-pill-action-muted'
              ]"
              :title="hasUnsavedChanges ? 'Simpan Perubahan Profil Usaha' : 'Tidak ada perubahan untuk disimpan'"
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

            <!-- Bagikan Profil Button -->
            <BActionButton
              variant="default"
              :huge-icon="Share08Icon"
              :icon-size="14"
              custom-class="w-full sm:w-auto justify-center text-center"
              title="Buka Modal Bagikan Profil Usaha"
              @click="isShareModalOpen = true"
            >
              Bagikan Profil
            </BActionButton>
          </div>
        </div>

        <!-- Box Tentang Bisnis Saya (Ref: LinkedIn Tentang Card) -->
        <div class="card-tactile-gopay rounded-[20px] p-5 sm:p-6 border border-[#CBD5E1] dark:border-neutral-800 bg-[#F8FAFC] dark:bg-[#13161F] space-y-3">
          <div class="flex items-center justify-between">
            <h3 class="text-base sm:text-lg font-poppins font-semibold text-neutral-900 dark:text-white">
              Tentang Bisnis Saya
            </h3>
            <button
              type="button"
              class="p-2 rounded-xl text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white hover:bg-neutral-200/60 dark:hover:bg-neutral-800 transition-all cursor-pointer"
              title="Edit Deskripsi Singkat Usaha"
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

        <!-- SECTION 1: TENTANG USAHA & MODEL BISNIS -->
        <div class="card-tactile-gopay rounded-[22px] p-6 sm:p-7 border border-[#CBD5E1] dark:border-neutral-800 bg-[#FFFFFF] dark:bg-[#13161F] space-y-6">
          <div class="border-b border-neutral-100 dark:border-neutral-800 pb-4">
            <h3 class="text-base sm:text-lg font-poppins font-semibold text-neutral-900 dark:text-white">
              Tentang Usaha & Model Bisnis
            </h3>
            <p class="text-xs sm:text-sm font-poppins text-neutral-500 dark:text-neutral-400 mt-1">
              Data identitas pokok, saluran kontak resmi, dan narasi ringkas yang dibaca investor saat menyaring profil usahamu.
            </p>
          </div>

          <!-- Bagian 1: Identitas Pokok Usaha -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
            <div>
              <label class="block text-xs font-poppins font-semibold text-neutral-700 dark:text-neutral-300 mb-1.5">
                Nama Usaha / Brand UMKM
              </label>
              <input
                v-model="formProfile.name"
                type="text"
                class="input-tactile-gopay"
                placeholder="Contoh: Kopi Senja Nusantara"
              />
            </div>

            <div>
              <label class="block text-xs font-poppins font-semibold text-neutral-700 dark:text-neutral-300 mb-1.5">
                Nama Pemilik / Founder
              </label>
              <input
                v-model="formProfile.ownerName"
                type="text"
                class="input-tactile-gopay"
                placeholder="Contoh: Fikri Setiawan"
              />
            </div>

            <div>
              <label class="block text-xs font-poppins font-semibold text-neutral-700 dark:text-neutral-300 mb-1.5">
                Sektor Industri Usaha
              </label>
              <div class="relative">
                <select
                  v-model="selectedSectorChoice"
                  class="input-tactile-gopay cursor-pointer appearance-none pr-10"
                >
                  <option value="Kuliner & Minuman (F&B)">Kuliner & Minuman (F&B)</option>
                  <option value="Fashion & Konveksi">Fashion & Konveksi</option>
                  <option value="Pertanian & Agribisnis">Pertanian & Agribisnis</option>
                  <option value="Kriya & Kerajinan Tangan">Kriya & Kerajinan Tangan</option>
                  <option value="Jasa & Perdagangan Ritel">Jasa & Perdagangan Ritel</option>
                  <option value="Teknologi & Produk Digital">Teknologi & Produk Digital</option>
                  <option value="Lainnya">Lainnya (Ketik Manual)</option>
                </select>
                <div class="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-neutral-500 dark:text-neutral-400 flex items-center justify-center">
                  <HugeiconsIcon :icon="ArrowDown01Icon" :size="16" :stroke-width="2.2" />
                </div>
              </div>
              <input
                v-if="selectedSectorChoice === 'Lainnya'"
                v-model="customSectorInput"
                type="text"
                placeholder="Sebutkan sektor usahamu..."
                class="input-tactile-gopay mt-2"
              />
            </div>

            <div>
              <label class="block text-xs font-poppins font-semibold text-neutral-700 dark:text-neutral-300 mb-1.5">
                Tahun Berdiri Operasional
              </label>
              <input
                v-model.number="formProfile.establishedYear"
                type="number"
                min="1990"
                max="2026"
                class="input-tactile-gopay tabular-nums"
              />
            </div>

            <div>
              <label class="block text-xs font-poppins font-semibold text-neutral-700 dark:text-neutral-300 mb-1.5">
                Jumlah Gerai
              </label>
              <input
                v-model.number="formProfile.outletsCount"
                type="number"
                min="1"
                class="input-tactile-gopay tabular-nums"
              />
            </div>

            <div>
              <label class="block text-xs font-poppins font-semibold text-neutral-700 dark:text-neutral-300 mb-1.5">
                Jumlah Karyawan
              </label>
              <input
                v-model.number="formProfile.employeesCount"
                type="number"
                min="1"
                class="input-tactile-gopay tabular-nums"
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

            <!-- Large Currency Input -->
            <div class="space-y-1.5">
              <label class="block text-xs font-poppins font-semibold text-neutral-700 dark:text-neutral-300">
                Nominal Target Permodalan (Rp)
              </label>
              <div class="relative">
                <span class="absolute left-4 top-1/2 -translate-y-1/2 text-sm sm:text-base font-poppins font-bold text-neutral-400 select-none pointer-events-none">
                  Rp
                </span>
                <input
                  v-model.number="formProfile.fundingTarget"
                  type="number"
                  step="5000000"
                  min="10000000"
                  class="input-tactile-gopay !h-12 sm:!h-13 !pl-12 !pr-4 !text-base sm:!text-lg !font-bold !font-poppins tabular-nums !rounded-xl text-neutral-900 dark:text-white bg-white dark:bg-[#13161F]"
                  placeholder="Contoh: 250000000"
                />
              </div>

              <!-- Live Spelled-out Helper -->
              <div class="text-xs font-poppins pt-0.5 px-0.5">
                <span class="text-neutral-500 dark:text-neutral-400">
                  Terbilang: <span class="font-semibold text-neutral-800 dark:text-neutral-200">{{ formatTargetWords(formProfile.fundingTarget) }}</span>
                </span>
              </div>
            </div>
          </div>

          <!-- Bagian 3: Kontak & Saluran Toko (Digabung) -->
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
                    v-model="storeContacts.whatsapp"
                    type="text"
                    class="input-tactile-gopay has-prefix-icon text-xs tabular-nums"
                    placeholder="+62 812-xxxx-xxxx"
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
                    v-model="storeContacts.instagram"
                    type="text"
                    class="input-tactile-gopay has-prefix-at text-xs"
                    placeholder="kopisenja.nusantara"
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
                    v-model="formProfile.city"
                    type="text"
                    class="input-tactile-gopay has-prefix-icon text-xs"
                    placeholder="Contoh: Bandung, Jawa Barat"
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
                    v-model="storeContacts.address"
                    type="text"
                    class="input-tactile-gopay has-prefix-icon text-xs"
                    placeholder="Jl. LLRE Martadinata No. 45, Bandung"
                  />
                </div>
              </div>
            </div>
          </div>

          <!-- Bagian 3: Narrative Bio Pitch -->
          <div class="pt-5 border-t border-neutral-100 dark:border-neutral-800 space-y-2">
            <div class="flex items-center justify-between mb-1.5">
              <label class="block text-xs font-poppins font-semibold text-neutral-700 dark:text-neutral-300">
                Deskripsi Singkat & Proposisi Nilai (Executive Narrative)
              </label>
              <span class="text-[11px] font-poppins text-neutral-400 tabular-nums">
                {{ formProfile.description.length }} / 350 Karakter
              </span>
            </div>
            <textarea
              id="input-executive-narrative"
              v-model="formProfile.description"
              rows="4"
              maxlength="350"
              class="input-tactile-gopay resize-none transition-all duration-300 focus:ring-2 focus:ring-[#00AA13]/30"
              placeholder="Jelaskan keunggulan produk andalan, omzet rata-rata, segmen pelanggan setia, dan arah ekspansi bisnismu..."
            />
          </div>
        </div>

        <!-- SECTION 1B: DAFTAR GERAI & CABANG USAHA -->
        <div class="card-tactile-gopay rounded-[22px] p-6 sm:p-7 border border-[#CBD5E1] dark:border-neutral-800 bg-[#FFFFFF] dark:bg-[#13161F] space-y-6">
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-100 dark:border-neutral-800 pb-4">
            <div>
              <h3 class="text-base sm:text-lg font-poppins font-semibold text-neutral-900 dark:text-white">
                Daftar Gerai & Cabang Usaha
              </h3>
              <p class="text-xs sm:text-sm font-poppins text-neutral-500 dark:text-neutral-400 mt-1">
                Kelola gerai cabang aktif yang menjadi unit operasional dan pendorong omzet usaha Anda (Total {{ umkmStore.branches.length }} Gerai).
              </p>
            </div>

            <button
              type="button"
              class="btn-pill-action btn-pill-action-green cursor-pointer shrink-0 self-start sm:self-auto shadow-none"
              title="Tambah Cabang Usaha Baru"
              @click="openAddBranchModal"
            >
              <HugeiconsIcon :icon="PlusSignIcon" :size="15" :stroke-width="2.2" />
              <span>Tambah Cabang</span>
            </button>
          </div>

          <!-- Grid Daftar Cabang (Maksimal 3 Kolom) -->
          <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3.5">
            <div
              v-for="(branch, bIdx) in umkmStore.branches"
              :key="branch.id"
              class="p-4 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-[#F8FAFC]/70 dark:bg-[#18191E]/60 flex flex-col justify-between space-y-3 transition-colors hover:border-neutral-300 dark:hover:border-neutral-700"
            >
              <div class="flex items-start justify-between gap-2">
                <div class="flex items-center gap-2 min-w-0">
                  <div class="w-8 h-8 rounded-lg bg-[#E6F4F7] dark:bg-[#156374]/25 text-[#156374] dark:text-[#50AABF] flex items-center justify-center shrink-0">
                    <HugeiconsIcon :icon="Store01Icon" :size="16" :stroke-width="2" />
                  </div>
                  <div class="min-w-0">
                    <span v-if="branch.isPrimary" class="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-[#00AA13] dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800">
                      Gerai Utama
                    </span>
                    <span v-else class="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 border border-neutral-200 dark:border-neutral-700">
                      Cabang #{{ bIdx + 1 }}
                    </span>
                  </div>
                </div>

                <!-- Delete Action (kecuali cabang utama) -->
                <button
                  v-if="!branch.isPrimary && umkmStore.branches.length > 1"
                  type="button"
                  class="p-1 rounded-lg text-neutral-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/50 transition-colors cursor-pointer"
                  title="Hapus Cabang Ini"
                  @click="confirmDeleteBranch(branch)"
                >
                  <HugeiconsIcon :icon="Delete02Icon" :size="15" />
                </button>
              </div>

              <div class="space-y-1">
                <h4 class="font-poppins font-semibold text-sm text-neutral-900 dark:text-white truncate">
                  {{ branch.name }}
                </h4>
                <p class="text-xs font-poppins text-neutral-500 dark:text-neutral-400 line-clamp-2">
                  {{ branch.address || branch.location }}
                </p>
              </div>

              <div class="pt-2 border-t border-neutral-200/60 dark:border-neutral-800 text-[11px] text-neutral-500 flex items-center justify-between">
                <span>{{ branch.city }}</span>
                <span class="font-mono tabular-nums text-neutral-400">Est. {{ branch.establishedYear || 2026 }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- SECTION 2: LEGALITAS & KEPATUHAN RESMI -->
        <div class="card-tactile-gopay rounded-[22px] p-6 sm:p-7 border border-[#CBD5E1] dark:border-neutral-800 bg-[#FFFFFF] dark:bg-[#13161F] space-y-6">
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
                v-model="formProfile.nib"
                type="text"
                class="input-tactile-gopay tabular-nums"
                placeholder="13 Digit NIB OSS"
              />
              <p class="text-[11px] font-poppins text-neutral-400">
                Wajib bagi seluruh badan usaha mikro dan kecil untuk mengakses permodalan resmi.
              </p>
            </div>

            <!-- NPWP Card -->
            <div class="p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/40 space-y-2">
              <div>
                <span class="text-xs font-poppins font-semibold text-neutral-800 dark:text-neutral-200">
                  Nomor Pokok Wajib Pajak (NPWP Usaha)
                </span>
              </div>
              <input
                v-model="formProfile.npwp"
                type="text"
                class="input-tactile-gopay tabular-nums"
                placeholder="16 Digit Format NPWP Baru"
              />
              <p class="text-[11px] font-poppins text-neutral-400">
                Memastikan ketaatan pajak tahunan usaha sesuai regulasi Dirjen Pajak.
              </p>
            </div>

            <!-- Halal Card (only appears if business is F&B) -->
            <div
              v-if="isFnB"
              class="p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/40 space-y-2"
            >
              <div>
                <span class="text-xs font-poppins font-semibold text-neutral-800 dark:text-neutral-200">
                  Sertifikasi Halal (BPJPH / MUI)
                </span>
              </div>
              <input
                v-model="formProfile.halalNumber"
                type="text"
                class="input-tactile-gopay tabular-nums"
                placeholder="Nomor Sertifikat Halal (Contoh: ID321100019283)"
              />
              <p class="text-[11px] font-poppins text-neutral-400">
                Wajib bagi seluruh gerai F&B di Indonesia untuk memastikan bahan baku tersertifikasi halal resmi.
              </p>
            </div>

            <!-- HKI Card -->
            <div class="p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/40 space-y-2">
              <div>
                <span class="text-xs font-poppins font-semibold text-neutral-800 dark:text-neutral-200">
                  Sertifikat Hak Merek (DJKI)
                </span>
              </div>
              <input
                v-model="formProfile.hkiNumber"
                type="text"
                class="input-tactile-gopay tabular-nums"
                placeholder="Nomor Pendaftaran Merek (Contoh: IPT20250918290)"
              />
              <p class="text-[11px] font-poppins text-neutral-400">
                Melindungi merek dagang di Kelas 30 & 43 agar nilai valuasi brand aman saat menerima investasi sindikasi.
              </p>
            </div>
          </div>
        </div>

        <!-- SECTION 3: PRODUK UNGGULAN & UNIT PENDORONG OMZET -->
        <div class="card-tactile-gopay rounded-[22px] p-6 sm:p-7 border border-[#CBD5E1] dark:border-neutral-800 bg-[#FFFFFF] dark:bg-[#13161F] space-y-6">
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-neutral-100 dark:border-neutral-800 pb-4">
            <div>
              <h3 class="text-base sm:text-lg font-poppins font-semibold text-neutral-900 dark:text-white">
                Produk Unggulan & Unit Pendorong Omzet
              </h3>
              <p class="text-xs sm:text-sm font-poppins text-neutral-500 dark:text-neutral-400 mt-1">
                Lini produk andalan yang menyumbang transaksi uang masuk terbesar dan margin keuntungan tinggi.
              </p>
            </div>

            <div class="w-full sm:w-auto [&>*]:w-full sm:[&>*]:w-auto shrink-0">
              <BActionButton
                variant="default"
                icon="plus"
                :icon-size="15"
                custom-class="w-full sm:w-auto justify-center text-center"
                @click="openAddProductModal"
              >
                Tambah Produk
              </BActionButton>
            </div>
          </div>

          <!-- Product Cards Grid -->
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div
              v-for="prod in featuredProducts"
              :key="prod.id"
              class="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/40 dark:bg-neutral-900/40 overflow-hidden flex flex-col justify-between hover:border-neutral-300 dark:hover:border-neutral-700 transition-all duration-200"
            >
              <!-- Product Image -->
              <div class="relative h-32 w-full bg-neutral-200 dark:bg-neutral-800 overflow-hidden">
                <img
                  :src="prod.imageUrl || '/images/default-store-banner.jpg'"
                  :alt="prod.name"
                  class="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
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

        <!-- SECTION 4: POSTINGAN & AKTIVITAS USAHA (Terhubung ke Halaman Postingan /dashboard/postingan) -->
        <div class="card-tactile-gopay rounded-[22px] p-6 sm:p-7 border border-[#CBD5E1] dark:border-neutral-800 bg-[#FFFFFF] dark:bg-[#13161F]">
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 class="text-base sm:text-lg font-poppins font-semibold text-neutral-900 dark:text-white">
                Postingan & Aktivitas Usaha
              </h3>
              <p class="text-xs sm:text-sm font-poppins text-neutral-500 dark:text-neutral-400 mt-1">
                Buat dan kelola postingan anda!
              </p>
            </div>

            <div class="w-full sm:w-auto [&>*]:w-full sm:[&>*]:w-auto shrink-0">
              <BActionButton
                to="/dashboard/postingan"
                variant="green"
                icon="chevron"
                :icon-size="15"
                custom-class="w-full sm:w-auto justify-center text-center"
              >
                Buat Postingan
              </BActionButton>
            </div>
          </div>
        </div>
      </div>

      <!-- ========================================================================= -->
      <!-- RIGHT SIDEBAR COLUMN (4 Cols on Desktop)                                  -->
      <!-- ========================================================================= -->
      <div class="col-span-12 lg:col-span-4 space-y-6 sm:space-y-8">

        <!-- WIDGET: KONSULTAN PENDAMPING RESMI -->
        <div class="card-tactile-gopay rounded-[18px] p-6 space-y-5 border border-[#CBD5E1] dark:border-neutral-800 bg-[#FFFFFF] dark:bg-[#13161F]">
          <div class="border-b border-neutral-100 dark:border-neutral-800 pb-4">
            <h3 class="text-base sm:text-lg font-poppins font-semibold text-neutral-900 dark:text-white">
              Konsultan Pendamping
            </h3>
            <p class="text-xs sm:text-sm font-poppins text-neutral-500 dark:text-neutral-400 mt-1">
              Konsultan kurator resmi yang mengawal validasi dan kepatuhan tokomu.
            </p>
          </div>

          <div class="flex items-center gap-3 p-3 rounded-xl bg-neutral-50 dark:bg-neutral-900/50 border border-neutral-200/80 dark:border-neutral-800">
            <img
              src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=120&auto=format&fit=crop&q=80"
              alt="Dra. Maya Suryani"
              class="w-12 h-12 rounded-xl object-cover shrink-0"
            />
            <div class="min-w-0">
              <span class="text-xs font-poppins font-bold text-neutral-900 dark:text-white block truncate">
                Dra. Maya Suryani, M.M.
              </span>
              <span class="text-[11px] font-poppins text-neutral-500 dark:text-neutral-400 block truncate">
                Advisor Kurasi Finansial & Legalitas
              </span>
            </div>
          </div>
        </div>

        <!-- WIDGET: DOKUMEN DATA ROOM & ARSIP PERIZINAN (1 Column Layout under Konsultan Pendamping) -->
        <div class="card-tactile-gopay rounded-[18px] p-5 sm:p-6 border border-[#CBD5E1] dark:border-neutral-800 bg-[#FFFFFF] dark:bg-[#13161F] space-y-5">
          <div class="border-b border-neutral-100 dark:border-neutral-800 pb-4 space-y-3">
            <div>
              <h3 class="text-base sm:text-lg font-poppins font-semibold text-neutral-900 dark:text-white">
                Dokumen Data Room & Arsip Perizinan
              </h3>
              <p class="text-xs sm:text-sm font-poppins text-neutral-500 dark:text-neutral-400 mt-1">
                Unggah dan kelola berkas resmi autentik untuk membuka akses data room privat investor terakreditasi.
              </p>
            </div>

            <!-- Progress Bar below container description -->
            <div class="pt-1 space-y-1.5">
              <div class="flex items-center justify-between text-xs font-poppins">
                <span class="text-neutral-600 dark:text-neutral-400 flex items-center gap-1.5">
                  <span class="font-medium">Kelengkapan:</span>
                  <span class="font-bold text-neutral-900 dark:text-white tabular-nums">
                    {{ uploadedDocsCount }}/{{ visibleLegalDocuments.length }} Terpenuhi
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
          </div>

          <!-- Hidden Native File Input for Document Upload -->
          <input
            ref="docFileInputRef"
            type="file"
            accept=".pdf,.jpg,.jpeg,.png"
            class="hidden"
            @change="onDocFileSelected"
          />

          <!-- Documents List Grid (1 COLUMN) -->
          <div class="grid grid-cols-1 gap-4">
            <div
              v-for="doc in visibleLegalDocuments"
              :key="doc.id"
              :class="[
                'p-4 sm:p-4.5 rounded-2xl border transition-all duration-200 flex flex-col justify-between space-y-3.5',
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

              <!-- Upload / Status State -->
              <div class="pt-2 border-t border-neutral-100 dark:border-neutral-800/80">
                <!-- Case A: File Already Uploaded -->
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
                          {{ doc.file.size }} · Diunggah {{ doc.file.uploadedAt }}
                        </span>
                      </div>
                    </div>
                  </div>

                  <!-- Actions for Uploaded File: Lihat, Ganti, and Hapus (Fill Width Grid 3 Kolom) -->
                  <div class="grid grid-cols-3 gap-2 pt-0.5 w-full">
                    <!-- Lihat Button -->
                    <button
                      type="button"
                      class="btn-pill-action !w-full !justify-center !h-8 !px-2 !text-xs !rounded-lg !gap-1.5"
                      @click="openDocPreview(doc)"
                    >
                      <HugeiconsIcon :icon="EyeIcon" :size="14" class="text-neutral-900 dark:text-white" />
                      <span>Lihat</span>
                    </button>

                    <!-- Ganti Button -->
                    <button
                      type="button"
                      class="btn-pill-action !w-full !justify-center !h-8 !px-2 !text-xs !rounded-lg !gap-1.5"
                      @click="triggerDocUpload(doc.id)"
                    >
                      <HugeiconsIcon :icon="Upload04Icon" :size="14" class="text-neutral-900 dark:text-white" />
                      <span>Ganti</span>
                    </button>

                    <!-- Hapus Button (Merah) -->
                    <button
                      type="button"
                      class="btn-pill-action !w-full !justify-center !h-8 !px-2 !text-xs !rounded-lg !gap-1.5 !text-red-600 !border-red-200 hover:!bg-red-50 hover:!border-red-300 dark:!border-red-900/50 dark:!text-red-400 dark:hover:!bg-red-950/30"
                      @click="removeDocument(doc.id)"
                    >
                      <HugeiconsIcon :icon="Delete02Icon" :size="14" class="text-red-600 dark:text-red-400" />
                      <span>Hapus</span>
                    </button>
                  </div>
                </div>

                <!-- Case B: File Not Uploaded Yet -->
                <div v-else class="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pt-0.5">
                  <!-- Green Action Button Positioned on the Left -->
                  <button
                    type="button"
                    class="btn-pill-action-green !h-8 !px-3 !text-xs !rounded-lg !gap-1.5 w-full sm:w-auto justify-center text-center"
                    @click="triggerDocUpload(doc.id)"
                  >
                    <HugeiconsIcon :icon="Upload04Icon" :size="14" />
                    <span>Unggah Berkas</span>
                  </button>

                  <span class="text-[11px] font-poppins text-neutral-400 dark:text-neutral-500 flex items-center gap-1 justify-center sm:justify-start">
                    <HugeiconsIcon :icon="AlertCircleIcon" :size="13" class="text-amber-500 shrink-0" />
                    <span>Belum ada dokumen</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- ========================================================================= -->
    <!-- 3. MODAL: DOKUMEN VIEWER (Reusable BModal & BButton)                       -->
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

    <!-- ========================================================================= -->
    <!-- 4. MODAL: TAMBAH PRODUK (Reusable BModal & BButton)                        -->
    <!-- ========================================================================= -->
    <BModal
      v-model="isAddProductModalOpen"
      title="Tambah Produk Unggulan"
      size="lg"
    >
      <form class="space-y-4 font-poppins" @submit.prevent="handleAddProduct">
        <div>
          <label class="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1.5">
            Nama Produk
          </label>
          <input
            v-model="newProductForm.name"
            type="text"
            required
            class="input-tactile-gopay"
            placeholder="Contoh: Kopi Susu Senja Aren 1L"
          />
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label class="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1.5">
              Harga Jual (Rp)
            </label>
            <div class="relative">
              <span class="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs font-poppins font-bold text-neutral-400">
                Rp
              </span>
              <input
                v-model.number="newProductForm.price"
                type="number"
                min="0"
                class="input-tactile-gopay has-prefix-rp tabular-nums"
                placeholder="Contoh: 35000"
              />
            </div>
          </div>

          <div>
            <label class="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1.5">
              Estimasi Untung Bersih (%)
            </label>
            <div class="relative">
              <input
                v-model.number="newProductForm.grossMargin"
                type="number"
                min="0"
                max="100"
                class="input-tactile-gopay tabular-nums pr-8"
                placeholder="Contoh: 45"
              />
              <span class="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-poppins font-bold text-neutral-400 pointer-events-none">
                %
              </span>
            </div>
          </div>
        </div>

        <div>
          <div class="flex items-center justify-between mb-1.5">
            <label class="block text-xs font-semibold text-neutral-700 dark:text-neutral-300">
              Estimasi Terjual per Bulan
            </label>
            <span class="text-[11px] text-neutral-400 font-normal">
              Porsi, bungkus, atau pcs
            </span>
          </div>
          <div class="relative">
            <input
              v-model.number="newProductForm.monthlyVolume"
              type="number"
              min="0"
              class="input-tactile-gopay tabular-nums pr-24"
              placeholder="Contoh: 250"
            />
            <span class="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-poppins font-medium text-neutral-400 pointer-events-none">
              unit / bulan
            </span>
          </div>
          <p class="text-[11px] font-poppins text-neutral-500 dark:text-neutral-400 mt-1.5">
            Perkiraan rata-rata banyaknya pesanan produk ini yang laku terjual setiap bulannya.
          </p>
        </div>

        <div>
          <div class="flex items-center justify-between mb-1.5">
            <label class="block text-xs font-semibold text-neutral-700 dark:text-neutral-300">
              Deskripsi Produk
            </label>
            <span class="text-[11px] text-neutral-400 font-normal">
              Opsional · Ceritakan keunggulan produkmu
            </span>
          </div>
          <textarea
            v-model="newProductForm.description"
            rows="5"
            class="input-tactile-gopay min-h-[140px] resize-y leading-relaxed text-sm p-3.5"
            placeholder="Ceritakan keistimewaan rasa, bahan baku pilihan, ukuran porsi/kemasan, atau alasan mengapa produk ini paling diminati pelanggan..."
          />
        </div>
      </form>

      <template #footer>
        <div class="flex items-center justify-end gap-2.5 w-full">
          <BButton
            variant="secondary"
            size="sm"
            @click="isAddProductModalOpen = false"
          >
            Batal
          </BButton>

          <BButton
            variant="primary"
            size="sm"
            @click="handleAddProduct"
          >
            Simpan Produk
          </BButton>
        </div>
      </template>
    </BModal>



    <!-- Reusable Share Profile Modal Component (WhatsApp, Gmail, LinkedIn, Facebook, Messenger, Salin Tautan) -->
    <BShareModal
      v-model="isShareModalOpen"
      :store-name="formProfile.name"
      :description="formProfile.description"
      :banner-url="umkmStore.profile.bannerUrl"
      :avatar-url="umkmStore.profile.ownerAvatarUrl || authStore.currentUser?.avatar || '/images/user-profile.png'"
      :is-verified="true"
      @copied="triggerToast('Tautan profil usaha berhasil disalin ke clipboard!')"
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
          class="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-4 py-3 rounded-2xl bg-neutral-900/95 dark:bg-white text-white dark:text-neutral-900 border border-neutral-800 dark:border-neutral-200 backdrop-blur-md font-poppins"
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
    <!-- Modal Tambah Cabang Usaha Baru -->
    <Teleport to="body">
      <div
        v-if="isAddBranchModalOpen"
        class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-150 font-poppins"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-add-branch-title"
        @click.self="isAddBranchModalOpen = false"
      >
        <div class="w-full max-w-lg rounded-[22px] bg-[#FFFFFF] dark:bg-[#13161F] border border-[#CBD5E1] dark:border-neutral-800 shadow-none overflow-hidden flex flex-col">
          <!-- Modal Header -->
          <div class="px-6 py-4 sm:py-5 border-b border-neutral-100 dark:border-neutral-800 flex items-start justify-between gap-4">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-xl bg-[#E6F4F7] dark:bg-[#156374]/25 text-[#156374] dark:text-[#50AABF] flex items-center justify-center shrink-0">
                <HugeiconsIcon :icon="Store01Icon" :size="20" :stroke-width="2" />
              </div>
              <div>
                <h2 id="modal-add-branch-title" class="text-base sm:text-lg font-poppins font-bold text-neutral-900 dark:text-white leading-tight">
                  Tambah Cabang Usaha Baru
                </h2>
                <p class="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
                  Daftarkan unit gerai baru Anda ke ekosistem toko Beruang.
                </p>
              </div>
            </div>

            <button
              type="button"
              class="w-8 h-8 rounded-lg text-neutral-400 hover:text-neutral-700 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Tutup Modal Tambah Cabang"
              @click="isAddBranchModalOpen = false"
            >
              <HugeiconsIcon :icon="Cancel01Icon" :size="18" :stroke-width="2.2" />
            </button>
          </div>

          <!-- Modal Body Form -->
          <div class="px-6 py-5 space-y-4">
            <div>
              <label class="block text-xs font-poppins font-semibold text-neutral-700 dark:text-neutral-300 mb-1.5">
                Nama Cabang Usaha <span class="text-red-500">*</span>
              </label>
              <input
                v-model="newBranchForm.name"
                type="text"
                class="input-tactile-gopay"
                placeholder="Contoh: Cabang Buah Batu"
                autofocus
              />
            </div>

            <div>
              <label class="block text-xs font-poppins font-semibold text-neutral-700 dark:text-neutral-300 mb-1.5">
                Kota Domisili Cabang <span class="text-red-500">*</span>
              </label>
              <input
                v-model="newBranchForm.city"
                type="text"
                class="input-tactile-gopay"
                placeholder="Contoh: Bandung"
              />
            </div>

            <div>
              <label class="block text-xs font-poppins font-semibold text-neutral-700 dark:text-neutral-300 mb-1.5">
                Alamat Lengkap Cabang <span class="text-red-500">*</span>
              </label>
              <input
                v-model="newBranchForm.address"
                type="text"
                class="input-tactile-gopay"
                placeholder="Contoh: Jl. Buah Batu No. 182, Turangga, Bandung"
              />
            </div>
          </div>

          <!-- Modal Footer -->
          <div class="px-6 py-4 border-t border-neutral-100 dark:border-neutral-800 bg-[#F8FAFC] dark:bg-[#18191E] flex items-center justify-end gap-2.5">
            <button
              type="button"
              class="btn-pill-action cursor-pointer shadow-none"
              @click="isAddBranchModalOpen = false"
            >
              <span>Batal</span>
            </button>

            <button
              type="button"
              class="btn-pill-action btn-pill-action-green cursor-pointer shadow-none"
              :disabled="!newBranchForm.name.trim() || !newBranchForm.city.trim() || !newBranchForm.address.trim()"
              @click="submitNewBranch"
            >
              <HugeiconsIcon :icon="CheckmarkCircle01Icon" :size="15" :stroke-width="2.0" />
              <span>Simpan Cabang</span>
            </button>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted, onBeforeUnmount, nextTick } from 'vue'
import { gsap } from 'gsap'
import { useAuthStore } from '~/stores/auth'
import { useUmkmStore } from '~/stores/umkm'
import { useInvestorStore, type MarketplaceUmkm } from '~/stores/investor'
import BStoreBanner from '~/components/base/BStoreBanner.vue'
import BBadge from '~/components/base/BBadge.vue'
import BProgressBar from '~/components/base/BProgressBar.vue'
import BAlert from '~/components/base/BAlert.vue'
import BActionButton from '~/components/base/BActionButton.vue'
import BButton from '~/components/base/BButton.vue'
import BModal from '~/components/base/BModal.vue'
import BShareModal from '~/components/base/BShareModal.vue'
import BVerifiedBadge from '~/components/base/BVerifiedBadge.vue'
import { HugeiconsIcon } from '@hugeicons/vue'
import {
  UserCircleIcon,
  CheckmarkCircle01Icon,
  ShieldCheckIcon,
  FileValidationIcon,
  File02Icon,
  Upload04Icon,
  Delete02Icon,
  EyeIcon,
  AlertCircleIcon,
  Copy01Icon,
  Share08Icon,
  Building03Icon,
  Location01Icon,
  Time02Icon,
  Store01Icon,
  UserGroupIcon,
  Certificate01Icon,
  Comment01Icon,
  CheckmarkBadge01Icon,
  ArrowDown01Icon,
  ArrowLeft01Icon,
  ArrowRight01Icon,
  Cancel01Icon,
  CourtLawIcon,
  HalalIcon,
  Package01Icon,
  CopyrightIcon,
  MedicineBottle01Icon,
  Coins01Icon,
  PencilEdit02Icon,
  PlusSignIcon
} from '@hugeicons/core-free-icons'

definePageMeta({
  layout: 'dashboard',
  hideHeader: true
})

const authStore = useAuthStore()
const umkmStore = useUmkmStore()
const investorStore = useInvestorStore()

// Share Profile Modal State
const isShareModalOpen = ref(false)

// Toast Feedback
const showToast = ref(false)
const toastMessage = ref('Profil usaha berhasil diperbarui!')
let toastTimer: any = null

function triggerToast(msg?: string) {
  if (msg) toastMessage.value = msg
  showToast.value = true
  if (toastTimer) clearTimeout(toastTimer)
  toastTimer = setTimeout(() => {
    showToast.value = false
  }, 3000)
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

// Owner First Name
const ownerFirstName = computed(() => {
  const name = authStore.currentUser?.name || umkmStore.profile.ownerName || 'Fikri'
  return name.split(' ')[0]
})

// Profile Form State
const formProfile = reactive({
  name: umkmStore.profile.name || 'Kopi Senja Nusantara',
  ownerName: umkmStore.profile.ownerName || 'Fikri Setiawan',
  sector: umkmStore.profile.sector || 'Kuliner & Minuman (F&B)',
  city: umkmStore.profile.city || 'Bandung, Jawa Barat',
  establishedYear: umkmStore.profile.establishedYear || 2021,
  outletsCount: umkmStore.branches.length || umkmStore.profile.outletsCount || 3,
  employeesCount: umkmStore.profile.employeesCount || 14,
  fundingTarget: umkmStore.profile.fundingTarget || 250000000,
  plannedFundUse: 'Ekspansi 2 gerai cloud kitchen di area Bandung Timur dan pengadaan mesin roastery kapasitas 5kg terpusat.',
  description: umkmStore.profile.description || umkmStore.profile.pitchSummary || 'Spesialis kopi arabika susu gula aren dengan 3 outlet aktif di Bandung & margin kotor stabil di atas 48%. Menargetkan ekspansi 2 gerai cloud kitchen dan standardisasi roastery terpusat.',
  nib: umkmStore.profile.nib || '1209000123456',
  npwp: umkmStore.profile.npwp || '81.423.891.4-429.000',
  halalNumber: umkmStore.profile.halalNumber || 'ID321100019283',
  hkiNumber: umkmStore.profile.hkiNumber || 'IPT20250918290'
})

// Branch Management Logic (Daftar Gerai & Cabang Usaha)
const isAddBranchModalOpen = ref(false)
const newBranchForm = reactive({
  name: '',
  city: '',
  address: ''
})

function openAddBranchModal() {
  newBranchForm.name = ''
  newBranchForm.city = formProfile.city || 'Bandung'
  newBranchForm.address = ''
  isAddBranchModalOpen.value = true
}

function submitNewBranch() {
  if (!newBranchForm.name.trim() || !newBranchForm.city.trim() || !newBranchForm.address.trim()) return
  const created = umkmStore.addBranch({
    name: newBranchForm.name.trim(),
    city: newBranchForm.city.trim(),
    location: newBranchForm.city.trim(),
    address: newBranchForm.address.trim(),
    establishedYear: new Date().getFullYear(),
    shareRatio: 0.15
  })
  formProfile.outletsCount = umkmStore.branches.length
  isAddBranchModalOpen.value = false
  triggerToast(`Cabang ${created.name} berhasil ditambahkan!`)
}

function confirmDeleteBranch(branch: any) {
  if (confirm(`Apakah Anda yakin ingin menghapus ${branch.name}?`)) {
    umkmStore.deleteBranch(branch.id)
    formProfile.outletsCount = umkmStore.branches.length
    triggerToast(`Cabang ${branch.name} berhasil dihapus.`)
  }
}

watch(
  () => umkmStore.branches.length,
  (newCount) => {
    formProfile.outletsCount = newCount
  },
  { immediate: true }
)

// Expandable narrative preview in "Tentang Bisnis Saya"
const isDescriptionExpanded = ref(false)
const descriptionThreshold = 180

const displayedDescription = computed(() => {
  const desc = formProfile.description || 'Spesialis kopi arabika susu gula aren dengan 3 outlet aktif di Bandung & margin kotor stabil di atas 48%. Menargetkan ekspansi 2 gerai cloud kitchen dan standardisasi roastery terpusat.'
  if (desc.length <= descriptionThreshold || isDescriptionExpanded.value) {
    return desc
  }
  return desc.slice(0, descriptionThreshold).trim()
})

const hasLongDescription = computed(() => {
  const desc = formProfile.description || 'Spesialis kopi arabika susu gula aren dengan 3 outlet aktif di Bandung & margin kotor stabil di atas 48%. Menargetkan ekspansi 2 gerai cloud kitchen dan standardisasi roastery terpusat.'
  return desc.length > descriptionThreshold
})

function scrollToEditDescription() {
  const el = document.getElementById('input-executive-narrative')
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'center' })
    el.focus()
  }
}

// Store Contacts State
const storeContacts = reactive({
  whatsapp: '+62 812-3456-7890',
  instagram: 'kopisenja.nusantara',
  address: 'Jl. LLRE Martadinata (Riau) No. 45, Bandung'
})

// Sector Custom Choice
const selectedSectorChoice = ref('Kuliner & Minuman (F&B)')
const customSectorInput = ref('')

// Unsaved Changes Tracking (Dynamic button state: Green when dirty, Grey when clean)
const initialSnapshot = ref('')
const isSaving = ref(false)

function getFormSnapshot(): string {
  return JSON.stringify({
    name: formProfile.name,
    ownerName: formProfile.ownerName,
    sector: formProfile.sector,
    city: formProfile.city,
    establishedYear: formProfile.establishedYear,
    outletsCount: formProfile.outletsCount,
    employeesCount: formProfile.employeesCount,
    fundingTarget: formProfile.fundingTarget,
    plannedFundUse: formProfile.plannedFundUse,
    description: formProfile.description,
    nib: formProfile.nib,
    npwp: formProfile.npwp,
    halalNumber: formProfile.halalNumber,
    hkiNumber: formProfile.hkiNumber,
    selectedSectorChoice: selectedSectorChoice.value,
    customSectorInput: customSectorInput.value,
    whatsapp: storeContacts.whatsapp,
    instagram: storeContacts.instagram,
    address: storeContacts.address
  })
}

const hasUnsavedChanges = computed(() => {
  if (!initialSnapshot.value) return false
  return getFormSnapshot() !== initialSnapshot.value
})

// Check whether business is in F&B / Food & Beverage sector
const isFnB = computed(() => {
  const currentSector = (selectedSectorChoice.value === 'Lainnya' ? customSectorInput.value : selectedSectorChoice.value) || formProfile.sector || ''
  const lower = currentSector.toLowerCase()
  return lower.includes('f&b') || lower.includes('kuliner') || lower.includes('minuman') || lower.includes('makanan')
})

const establishedYearsAgo = computed(() => {
  const currentYear = 2026
  return Math.max(1, currentYear - (formProfile.establishedYear || 2021))
})

// BStoreBanner Event Handlers
function onBannerUpdated(newUrl: string) {
  umkmStore.updateProfileBanner(newUrl)
  triggerToast('Sampul toko berhasil diperbarui!')
}

function onBannerReset() {
  umkmStore.resetProfileBanner()
  triggerToast('Sampul toko dikembalikan ke setelan awal.')
}

function onAvatarUpdated(newUrl: string) {
  umkmStore.updateOwnerAvatar(newUrl)
  if (authStore.currentUser) {
    authStore.updateAvatar(newUrl)
  }
  triggerToast('Foto profil pemilik berhasil diperbarui!')
}

function onAvatarReset() {
  umkmStore.resetOwnerAvatar()
  if (authStore.currentUser) {
    authStore.updateAvatar('/images/user-profile.png')
  }
  triggerToast('Foto profil dikembalikan ke setelan awal.')
}

// Featured Products Traction
export interface FeaturedProduct {
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

const isAddProductModalOpen = ref(false)
const newProductForm = reactive({
  name: '',
  categoryBadge: '',
  price: 50000,
  grossMargin: 50,
  monthlyVolume: 200,
  description: ''
})

function openAddProductModal() {
  newProductForm.name = ''
  newProductForm.categoryBadge = ''
  newProductForm.price = 50000
  newProductForm.grossMargin = 50
  newProductForm.monthlyVolume = 200
  newProductForm.description = ''
  isAddProductModalOpen.value = true
}

function handleAddProduct() {
  if (!newProductForm.name.trim()) return
  featuredProducts.value.push({
    id: `prod-${Date.now()}`,
    name: newProductForm.name.trim(),
    categoryBadge: '',
    price: newProductForm.price || 0,
    grossMargin: newProductForm.grossMargin || 0,
    monthlyVolume: newProductForm.monthlyVolume || 0,
    description: newProductForm.description.trim() || 'Produk andalan toko.',
    imageUrl: 'https://images.unsplash.com/photo-1509785307050-d4066910ec1e?w=350&auto=format&fit=crop&q=80'
  })
  isAddProductModalOpen.value = false
  saveProductsToStorage()
  triggerToast('Produk unggulan baru berhasil ditambahkan!')
}

// =========================================================================
// UMKM POST CREATION & CAROUSEL MANAGEMENT (TERHUBUNG KE JARINGAN INVESTOR)
// =========================================================================
const isCreatePostModalOpen = ref(false)
const postImageFileInputRef = ref<HTMLInputElement | null>(null)
const newPostImageUrlInput = ref('')
const umkmActiveSlides = ref<Record<string, number>>({})

const presetPostGallery = [
  'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=900&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=900&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1511920170033-f8396924c348?w=900&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=900&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=900&auto=format&fit=crop&q=80'
]

const newPostForm = reactive({
  pitchSummary: '',
  postImages: [
    'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=900&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=900&auto=format&fit=crop&q=80'
  ] as string[]
})

const myUmkmPosts = computed<MarketplaceUmkm[]>(() => {
  const currentName = (formProfile.name || 'Kopi Senja Nusantara').toLowerCase().trim()
  return investorStore.marketplaceList.filter(
    m =>
      m.id === 'umkm-01' ||
      m.umkmRefId === 'umkm-01' ||
      m.name.toLowerCase().trim() === currentName
  )
})

function getUmkmPostImages(post: MarketplaceUmkm): string[] {
  if (post.postImages && post.postImages.length > 0) {
    return post.postImages
  }
  return [post.postImageUrl || presetPostGallery[0]!]
}

function getUmkmSlideIndex(postId: string): number {
  return umkmActiveSlides.value[postId] ?? 0
}

function setUmkmSlideIndex(postId: string, index: number) {
  umkmActiveSlides.value[postId] = index
}

function nextUmkmSlide(post: MarketplaceUmkm) {
  const imgs = getUmkmPostImages(post)
  const cur = getUmkmSlideIndex(post.id)
  if (cur < imgs.length - 1) {
    umkmActiveSlides.value[post.id] = cur + 1
  }
}

function prevUmkmSlide(post: MarketplaceUmkm) {
  const cur = getUmkmSlideIndex(post.id)
  if (cur > 0) {
    umkmActiveSlides.value[post.id] = cur - 1
  }
}

function openCreatePostModal() {
  newPostForm.pitchSummary = ''
  newPostForm.postImages = [
    'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=900&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=900&auto=format&fit=crop&q=80'
  ]
  newPostImageUrlInput.value = ''
  isCreatePostModalOpen.value = true
}

function triggerPostImageUpload() {
  if (postImageFileInputRef.value) {
    postImageFileInputRef.value.value = ''
    postImageFileInputRef.value.click()
  }
}

function onPostImageFilesSelected(event: Event) {
  const target = event.target as HTMLInputElement
  const files = target.files
  if (!files || files.length === 0) return

  Array.from(files).forEach(file => {
    const reader = new FileReader()
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        newPostForm.postImages.push(reader.result)
      }
    }
    reader.readAsDataURL(file)
  })
}

function addPostImageUrl() {
  const url = newPostImageUrlInput.value.trim()
  if (!url) return
  newPostForm.postImages.push(url)
  newPostImageUrlInput.value = ''
}

function addPresetPostImage(url: string) {
  newPostForm.postImages.push(url)
}

function removeDraftPostImage(idx: number) {
  if (newPostForm.postImages.length > 1) {
    newPostForm.postImages.splice(idx, 1)
  }
}

function handleCreateUmkmPost() {
  if (!newPostForm.pitchSummary.trim()) return

  investorStore.createUmkmPost({
    umkmRefId: 'umkm-01',
    name: formProfile.name || 'Kopi Senja Nusantara',
    city: formProfile.city || 'Bandung',
    sector: formProfile.sector || 'Kuliner & Minuman (F&B)',
    establishedYear: formProfile.establishedYear || 2021,
    fundingTarget: formProfile.fundingTarget || 250000000,
    consultantName: 'Dra. Maya Suryani, M.M.',
    pitchSummary: newPostForm.pitchSummary.trim(),
    postImages: [...newPostForm.postImages]
  })

  isCreatePostModalOpen.value = false
  triggerToast('Postingan usaha berhasil diterbitkan ke halaman Jaringan Investor!')
}

function handleDeleteUmkmPost(postId: string) {
  investorStore.deleteUmkmPost(postId)
  triggerToast('Postingan berhasil dihapus.')
}

function saveProductsToStorage() {
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem('umkm_featured_products', JSON.stringify(featuredProducts.value))
    } catch (e) {
      // ignore
    }
  }
}

function initProductsFromStorage() {
  if (typeof window !== 'undefined') {
    try {
      const saved = localStorage.getItem('umkm_featured_products')
      if (saved) {
        const parsed = JSON.parse(saved)
        if (Array.isArray(parsed) && parsed.length > 0) {
          featuredProducts.value = parsed
        }
      }
    } catch (e) {
      // ignore
    }
  }
}

function saveContactsToStorage() {
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem('umkm_contacts', JSON.stringify(storeContacts))
    } catch (e) {
      // ignore
    }
  }
}

function initContactsFromStorage() {
  if (typeof window !== 'undefined') {
    try {
      const saved = localStorage.getItem('umkm_contacts')
      if (saved) {
        const parsed = JSON.parse(saved)
        Object.assign(storeContacts, parsed)
      }
    } catch (e) {
      // ignore
    }
  }
}

// Legal Documents (Data Room)
export interface LegalDocItem {
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
    subtitle: 'Sertifikasi jaminan produk halal resmi dari BPJPH Kementerian Agama (diperlukan jika produk makanan atau minuman/FnB).',
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
    id: 'pirt',
    title: 'P-IRT (Pangan Industri Rumah Tangga)',
    subtitle: 'Diperlukan untuk produk pangan olahan skala rumah tangga dari instansi Dinas Kesehatan setempat.',
    categoryBadge: 'Pangan Olahan Rumahan',
    requirementNote: 'Izin edar kemasan produk konsumsi skala rumahan',
    file: null
  },
  {
    id: 'haki',
    title: 'Sertifikat Merek (HAKI)',
    subtitle: 'Surat pendaftaran merek dagang atau logo usaha melalui DJKI (Direktorat Jenderal Kekayaan Intelektual) untuk melindungi identitas brand.',
    categoryBadge: 'Perlindungan Brand',
    requirementNote: 'Mencegah plagiarisme dan mengunci valuasi brand',
    file: {
      name: 'HAKI_DJKI_Merek_KopiSenja_IPT2025.pdf',
      size: '1.8 MB',
      uploadedAt: '05 Juli 2026',
      isVerified: true
    }
  },
  {
    id: 'bpom',
    title: 'Izin Edar BPOM',
    subtitle: 'Diperlukan untuk produk obat, kosmetik, suplemen, atau pangan olahan non-skala rumah tangga.',
    categoryBadge: 'Pangan Non-Rumah Tangga',
    requirementNote: 'Standar regulasi peredaran skala manufaktur/pabrikasi',
    file: null
  }
])

// Document Specific Icon Helper (Pure black icon, context-driven)
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

// Filter legal documents according to UMKM business type (e.g. Halal & P-IRT only for FnB)
const visibleLegalDocuments = computed(() => {
  return legalDocuments.value.filter(doc => {
    if (doc.id === 'halal' || doc.id === 'pirt') {
      return isFnB.value
    }
    return true
  })
})

const uploadedDocsCount = computed(() => {
  return visibleLegalDocuments.value.filter(doc => doc.file !== null).length
})

const docsCompletionPercent = computed(() => {
  const total = visibleLegalDocuments.value.length
  if (!total) return 0
  return Math.round((uploadedDocsCount.value / total) * 100)
})

// File Upload Handler Logic
const docFileInputRef = ref<HTMLInputElement | null>(null)
const currentUploadDocId = ref<string | null>(null)

function triggerDocUpload(docId: string) {
  currentUploadDocId.value = docId
  if (docFileInputRef.value) {
    docFileInputRef.value.value = ''
    docFileInputRef.value.click()
  }
}

function onDocFileSelected(event: Event) {
  const target = event.target as HTMLInputElement
  const file = target.files?.[0]
  if (!file || !currentUploadDocId.value) return

  if (file.size > 10 * 1024 * 1024) {
    alert('Ukuran berkas melebihi batas 10 MB. Silakan kompresi berkas terlebih dahulu.')
    return
  }

  const targetDoc = legalDocuments.value.find(d => d.id === currentUploadDocId.value)
  if (targetDoc) {
    targetDoc.file = {
      name: file.name,
      size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
      uploadedAt: 'Hari ini',
      isVerified: true
    }
    saveDocsToStorage()
    triggerToast(`Berkas ${targetDoc.title} berhasil diunggah!`)
  }
  currentUploadDocId.value = null
}

function removeDocument(docId: string) {
  const targetDoc = legalDocuments.value.find(d => d.id === docId)
  if (targetDoc) {
    targetDoc.file = null
    saveDocsToStorage()
    triggerToast(`Berkas ${targetDoc.title} berhasil dihapus.`)
  }
}

function saveDocsToStorage() {
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem('umkm_data_room_docs', JSON.stringify(legalDocuments.value))
    } catch (e) {
      // ignore
    }
  }
}

function initDocsFromStorage() {
  if (typeof window !== 'undefined') {
    try {
      const saved = localStorage.getItem('umkm_data_room_docs')
      if (saved) {
        const parsed = JSON.parse(saved)
        if (Array.isArray(parsed) && parsed.length > 0) {
          legalDocuments.value = parsed
        }
      }
    } catch (e) {
      // ignore
    }
  }
}

// Document Preview Modal
const isDocPreviewModalOpen = ref(false)
const activePreviewDoc = ref<LegalDocItem | null>(null)

function openDocPreview(doc: LegalDocItem) {
  activePreviewDoc.value = doc
  isDocPreviewModalOpen.value = true
}

// Action Handlers
function handlePreviewInvestor() {
  triggerToast('Membuka simulasi tampilan profil etalase investor...')
}

function handleCopyProfileLink() {
  if (typeof navigator !== 'undefined' && navigator.clipboard) {
    navigator.clipboard.writeText('https://beruang.id/etalase/kopi-senja-nusantara')
    triggerToast('Tautan profil publik berhasil disalin ke clipboard!')
  } else {
    triggerToast('Tautan publik: https://beruang.id/etalase/kopi-senja-nusantara')
  }
}

function saveProfile() {
  if (selectedSectorChoice.value === 'Lainnya' && customSectorInput.value.trim()) {
    formProfile.sector = customSectorInput.value.trim()
  } else {
    formProfile.sector = selectedSectorChoice.value
  }

  umkmStore.profile.name = formProfile.name.trim() || 'Kopi Senja Nusantara'
  umkmStore.profile.ownerName = formProfile.ownerName.trim() || 'Fikri Setiawan'
  umkmStore.profile.sector = formProfile.sector
  umkmStore.profile.city = formProfile.city.trim()
  umkmStore.profile.establishedYear = formProfile.establishedYear
  umkmStore.profile.outletsCount = formProfile.outletsCount
  umkmStore.profile.employeesCount = formProfile.employeesCount
  umkmStore.profile.fundingTarget = formProfile.fundingTarget
  umkmStore.profile.description = formProfile.description.trim()
  umkmStore.profile.pitchSummary = formProfile.description.trim()
  umkmStore.profile.nib = formProfile.nib.trim()
  umkmStore.profile.npwp = formProfile.npwp.trim()
  umkmStore.profile.halalNumber = formProfile.halalNumber?.trim() || ''
  umkmStore.profile.hkiNumber = formProfile.hkiNumber?.trim() || ''

  if (authStore.currentUser) {
    authStore.currentUser.businessName = formProfile.name.trim()
    authStore.currentUser.name = formProfile.ownerName.trim()
  }

  saveProductsToStorage()
  saveContactsToStorage()
  saveDocsToStorage()

  if (typeof localStorage !== 'undefined') {
    localStorage.setItem('umkm_profile_name', formProfile.name)
    localStorage.setItem('umkm_profile_desc', formProfile.description)
    localStorage.setItem('umkm_profile_sector', formProfile.sector)
    localStorage.setItem('umkm_profile_city', formProfile.city)
    localStorage.setItem('umkm_profile_nib', formProfile.nib)
    localStorage.setItem('umkm_profile_npwp', formProfile.npwp)
    localStorage.setItem('umkm_profile_halal', formProfile.halalNumber || '')
    localStorage.setItem('umkm_profile_hki', formProfile.hkiNumber || '')
    localStorage.setItem('umkm_profile_funding_target', String(formProfile.fundingTarget))
    localStorage.setItem('umkm_profile_planned_fund_use', formProfile.plannedFundUse || '')
  }

  // Update snapshot so hasUnsavedChanges resets to false (button returns to grey)
  initialSnapshot.value = getFormSnapshot()
  isSaving.value = false

  triggerToast('Profil usaha berhasil disimpan & disinkronkan!')
}

let gsapCtx: gsap.Context | null = null

onMounted(() => {
  umkmStore.initBranchesFromStorage()
  umkmStore.initBannerFromStorage()
  umkmStore.initAvatarFromStorage()
  umkmStore.initQuickProfileFromStorage()
  investorStore.initPostsFromStorage()

  initProductsFromStorage()
  initContactsFromStorage()
  initDocsFromStorage()

  if (umkmStore.profile.name) formProfile.name = umkmStore.profile.name
  if (umkmStore.profile.ownerName) formProfile.ownerName = umkmStore.profile.ownerName
  if (umkmStore.profile.description || umkmStore.profile.pitchSummary) {
    formProfile.description = umkmStore.profile.description || umkmStore.profile.pitchSummary
  }
  if (umkmStore.profile.sector) {
    formProfile.sector = umkmStore.profile.sector
    selectedSectorChoice.value = umkmStore.profile.sector
  }
  if (umkmStore.profile.city) formProfile.city = umkmStore.profile.city
  if (umkmStore.profile.nib) formProfile.nib = umkmStore.profile.nib
  if (umkmStore.profile.npwp) formProfile.npwp = umkmStore.profile.npwp
  if (umkmStore.profile.halalNumber) formProfile.halalNumber = umkmStore.profile.halalNumber
  if (umkmStore.profile.hkiNumber) formProfile.hkiNumber = umkmStore.profile.hkiNumber

  if (typeof localStorage !== 'undefined') {
    const savedFundingTarget = localStorage.getItem('umkm_profile_funding_target')
    if (savedFundingTarget && Number(savedFundingTarget)) {
      formProfile.fundingTarget = Number(savedFundingTarget)
    }
    const savedFundUse = localStorage.getItem('umkm_profile_planned_fund_use')
    if (savedFundUse) {
      formProfile.plannedFundUse = savedFundUse
    }
  }

  nextTick(() => {
    initialSnapshot.value = getFormSnapshot()
    if (import.meta.client && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      gsapCtx = gsap.context(() => {
        gsap.from('.card-tactile-gopay', {
          opacity: 0,
          y: 14,
          duration: 0.42,
          stagger: 0.05,
          ease: 'power2.out',
          clearProps: 'all'
        })
      })
    }
  })
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
:deep([class*="shadow-"]),
:deep(.shadow-xs),
:deep(.shadow-sm),
:deep(.shadow),
:deep(.shadow-md),
:deep(.shadow-lg),
:deep(.shadow-xl),
:deep(.shadow-2xl),
:deep(.shadow-inner) {
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

select.input-tactile-gopay {
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  padding-right: 2.5rem !important;
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
</style>
