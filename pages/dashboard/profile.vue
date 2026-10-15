<template>
  <div class="space-y-6 pb-20 font-sans text-neutral-900 dark:text-neutral-100 select-none">
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
        v-if="showSuccessToast"
        class="fixed top-6 left-1/2 -translate-x-1/2 z-50 px-4 py-2.5 rounded-full bg-emerald-900/90 text-emerald-200 border border-emerald-500/50 backdrop-blur-md text-xs font-poppins font-semibold shadow-xl flex items-center gap-2 pointer-events-none"
      >
        <HugeiconsIcon :icon="CheckmarkCircle01Icon" :size="16" class="text-emerald-400" />
        <span>{{ toastMessage }}</span>
      </div>
    </Transition>


    <!-- 2. Store Banner & Circular Profile Avatar Hero Component -->
    <div class="relative z-20">
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
    </div>

    <!-- Visual Assets Guidance Cards (Tactile Cards) -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 -mt-8 sm:-mt-12 relative z-10">
      <div class="p-4 sm:p-5 rounded-2xl card-tactile-gopay flex items-start gap-3.5 border hover:border-neutral-400 dark:hover:border-neutral-600 transition-colors">
        <div class="w-10 h-10 rounded-xl bg-[#E6F4F7] text-[#2091AA] dark:bg-[#2091AA]/20 dark:text-[#50AABF] flex items-center justify-center shrink-0 border border-[#2091AA]/20 mt-0.5 shadow-2xs">
          <HugeiconsIcon :icon="Camera01Icon" :size="18" :stroke-width="2" />
        </div>
        <div class="space-y-1">
          <h4 class="text-sm font-poppins font-bold text-neutral-900 dark:text-white">
            Banner Toko (Landscape)
          </h4>
          <p class="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed font-sans">
            Gunakan tombol <strong>Ubah Sampul</strong> di sudut kanan atas banner untuk mengunggah gambar. Format JPG, PNG, atau WebP (rasio 16:9 disarankan, maks. 5 MB).
          </p>
        </div>
      </div>

      <div class="p-4 sm:p-5 rounded-2xl card-tactile-gopay flex items-start gap-3.5 border hover:border-neutral-400 dark:hover:border-neutral-600 transition-colors">
        <div class="w-10 h-10 rounded-xl bg-emerald-50 text-[#00AA13] dark:bg-emerald-950/60 dark:text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-200 dark:border-emerald-800 mt-0.5 shadow-2xs">
          <HugeiconsIcon :icon="UserCircleIcon" :size="18" :stroke-width="2" />
        </div>
        <div class="space-y-1">
          <h4 class="text-sm font-poppins font-bold text-neutral-900 dark:text-white">
            Foto Pemilik & Logo Brand
          </h4>
          <p class="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed font-sans">
            Klik ikon kamera pada lingkaran foto profil untuk mengganti foto pemilik usaha atau logo resmi toko. Dilengkapi fitur pratinjau lingkaran otomatis.
          </p>
        </div>
      </div>
    </div>

    <!-- 3. Form Kelengkapan Data Usaha -->
    <div class="space-y-6">
      <!-- Section A: Informasi Usaha & Brand (Card Tactile GoPay) -->
      <div class="card-tactile-gopay rounded-2xl p-6 sm:p-7 space-y-6 border">
        <div class="pb-4 border-b border-neutral-100 dark:border-neutral-800/80">
          <h2 class="text-lg font-poppins font-bold text-neutral-900 dark:text-white">
            Informasi Usaha & Brand Toko
          </h2>
          <p class="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5 font-sans">
            Data identitas bisnis yang ditampilkan pada katalog kemitraan Beruang dan laporan kesiapan pendanaan.
          </p>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label class="block text-xs font-poppins font-semibold text-neutral-700 dark:text-neutral-300 mb-2">
              Nama Usaha / Brand UMKM
            </label>
            <input
              v-model="formProfile.name"
              type="text"
              class="w-full px-4 py-2.5 rounded-xl border border-neutral-200/90 dark:border-neutral-700/80 bg-neutral-50 dark:bg-[#18191E] text-sm font-poppins text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#2091AA]/30 transition-all"
              placeholder="Contoh: Kopi Senja Nusantara"
            />
          </div>

          <div>
            <label class="block text-xs font-poppins font-semibold text-neutral-700 dark:text-neutral-300 mb-2">
              Nama Pemilik Usaha
            </label>
            <input
              v-model="formProfile.ownerName"
              type="text"
              class="w-full px-4 py-2.5 rounded-xl border border-neutral-200/90 dark:border-neutral-700/80 bg-neutral-50 dark:bg-[#18191E] text-sm font-poppins text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#2091AA]/30 transition-all"
              placeholder="Contoh: Fikri Setiawan"
            />
          </div>

          <!-- Sektor Industri Dropdown with 'Lainnya' Option -->
          <div>
            <label class="block text-xs font-poppins font-semibold text-neutral-700 dark:text-neutral-300 mb-2">
              Sektor Industri
            </label>
            <select
              v-model="selectedSectorCategory"
              class="w-full px-4 py-2.5 rounded-xl border border-neutral-200/90 dark:border-neutral-700/80 bg-neutral-50 dark:bg-[#18191E] text-sm font-poppins text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#2091AA]/30 transition-all cursor-pointer"
              @change="onSectorCategoryChange"
            >
              <option value="Kuliner & Minuman (F&B)">Kuliner & Minuman (F&B)</option>
              <option value="Retail & Toko Kelontong">Retail & Toko Kelontong</option>
              <option value="Jasa & Layanan">Jasa & Layanan</option>
              <option value="Fashion & Konveksi">Fashion & Konveksi</option>
              <option value="Agribisnis & Pertanian">Agribisnis & Pertanian</option>
              <option value="Kerajinan & Kriya">Kerajinan & Kriya</option>
              <option value="Lainnya">Lainnya (Tulis Sendiri)...</option>
            </select>

            <!-- Custom Sector Input when 'Lainnya' is selected -->
            <div
              v-if="selectedSectorCategory === 'Lainnya'"
              class="mt-2.5 space-y-1.5 animate-in fade-in slide-in-from-top-1 duration-150"
            >
              <input
                v-model="customSectorText"
                type="text"
                placeholder="Tuliskan jenis industri usahamu (contoh: Manufaktur Ringan, Otomotif, IT, dll)"
                class="w-full px-4 py-2.5 rounded-xl border border-[#2091AA]/60 dark:border-[#50AABF]/60 bg-neutral-50 dark:bg-[#18191E] text-xs sm:text-sm font-poppins text-neutral-900 dark:text-white placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-[#2091AA]/30 transition-all"
                @input="updateSectorFromCustom"
              />
              <p class="text-[11px] font-poppins text-neutral-500 dark:text-neutral-400">
                Spesifikasikan bidang bisnis usahamu agar investor dan mitra dapat mengklasifikasikan tokomu dengan tepat.
              </p>
            </div>
          </div>

          <div>
            <label class="block text-xs font-poppins font-semibold text-neutral-700 dark:text-neutral-300 mb-2">
              Kota / Lokasi Operasional
            </label>
            <input
              v-model="formProfile.city"
              type="text"
              class="w-full px-4 py-2.5 rounded-xl border border-neutral-200/90 dark:border-neutral-700/80 bg-neutral-50 dark:bg-[#18191E] text-sm font-poppins text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#2091AA]/30 transition-all"
              placeholder="Contoh: Bandung, Jawa Barat"
            />
          </div>

          <div>
            <label class="block text-xs font-poppins font-semibold text-neutral-700 dark:text-neutral-300 mb-2">
              Tahun Berdiri
            </label>
            <input
              v-model.number="formProfile.establishedYear"
              type="number"
              class="w-full px-4 py-2.5 rounded-xl border border-neutral-200/90 dark:border-neutral-700/80 bg-neutral-50 dark:bg-[#18191E] text-sm font-poppins text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#2091AA]/30 transition-all tabular-nums"
            />
          </div>

          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="block text-xs font-poppins font-semibold text-neutral-700 dark:text-neutral-300 mb-2">
                Jumlah Gerai
              </label>
              <input
                v-model.number="formProfile.outletsCount"
                type="number"
                class="w-full px-4 py-2.5 rounded-xl border border-neutral-200/90 dark:border-neutral-700/80 bg-neutral-50 dark:bg-[#18191E] text-sm font-poppins text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#2091AA]/30 transition-all tabular-nums"
              />
            </div>
            <div>
              <label class="block text-xs font-poppins font-semibold text-neutral-700 dark:text-neutral-300 mb-2">
                Jumlah Tim
              </label>
              <input
                v-model.number="formProfile.employeesCount"
                type="number"
                class="w-full px-4 py-2.5 rounded-xl border border-neutral-200/90 dark:border-neutral-700/80 bg-neutral-50 dark:bg-[#18191E] text-sm font-poppins text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#2091AA]/30 transition-all tabular-nums"
              />
            </div>
          </div>
        </div>

        <div>
          <div class="flex items-center justify-between mb-2">
            <label class="block text-xs font-poppins font-semibold text-neutral-700 dark:text-neutral-300">
              Deskripsi Profil Usaha & Narasi Bisnis
            </label>
            <span
              class="text-xs font-poppins tabular-nums"
              :class="formProfile.description.length > 350 ? 'text-red-500 font-semibold' : 'text-neutral-400'"
            >
              {{ formProfile.description.length }} / 350 Karakter
            </span>
          </div>
          <textarea
            v-model="formProfile.description"
            rows="3"
            maxlength="350"
            class="w-full px-4 py-3 rounded-xl border border-neutral-200/90 dark:border-neutral-700/80 bg-neutral-50 dark:bg-[#18191E] text-sm font-poppins text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#2091AA]/30 transition-all resize-none leading-relaxed"
            placeholder="Jelaskan spesialisasi produk, keunggulan toko, dan fokus ekspansi tokomu..."
          />
        </div>
      </div>

      <!-- Section B: Data Legalitas & Verifikasi Konsultan (Card Tactile GoPay) -->
      <div class="card-tactile-gopay rounded-2xl p-6 sm:p-7 space-y-6 border">
        <div class="pb-4 border-b border-neutral-100 dark:border-neutral-800/80">
          <h2 class="text-lg font-poppins font-bold text-neutral-900 dark:text-white">
            Legalitas & Kesiapan Akses Modal
          </h2>
          <p class="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5 font-sans">
            Nomor registrasi resmi yang menjadi parameter telemetri kesiapan modal Beruang dan investor terakreditasi.
          </p>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label class="block text-xs font-poppins font-semibold text-neutral-700 dark:text-neutral-300 mb-2">
              Nomor Induk Berusaha (NIB OSS RBA)
            </label>
            <input
              v-model="formProfile.nib"
              type="text"
              class="w-full px-4 py-2.5 rounded-xl border border-neutral-200/90 dark:border-neutral-700/80 bg-neutral-50 dark:bg-[#18191E] text-sm font-poppins text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#2091AA]/30 transition-all tabular-nums"
              placeholder="Contoh: 1209000123456"
            />
          </div>

          <div>
            <label class="block text-xs font-poppins font-semibold text-neutral-700 dark:text-neutral-300 mb-2">
              Nomor Pokok Wajib Pajak (NPWP)
            </label>
            <input
              v-model="formProfile.npwp"
              type="text"
              class="w-full px-4 py-2.5 rounded-xl border border-neutral-200/90 dark:border-neutral-700/80 bg-neutral-50 dark:bg-[#18191E] text-sm font-poppins text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#2091AA]/30 transition-all tabular-nums"
              placeholder="Contoh: 81.423.891.4-429.000"
            />
          </div>

          <div>
            <label class="block text-xs font-poppins font-semibold text-neutral-700 dark:text-neutral-300 mb-2">
              Konsultan Pendamping Resmi
            </label>
            <div class="w-full px-4 py-2.5 rounded-xl border border-neutral-200/70 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-800/50 flex items-center justify-between text-sm font-poppins text-neutral-700 dark:text-neutral-300">
              <span>{{ umkmStore.profile.consultantName || 'Dra. Maya Suryani, M.M.' }}</span>
              <span class="inline-flex items-center gap-1 text-[11px] font-semibold text-[#00AA13] bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-md border border-emerald-200 dark:border-emerald-800">
                ✓ Berlisensi
              </span>
            </div>
          </div>

          <div>
            <label class="block text-xs font-poppins font-semibold text-neutral-700 dark:text-neutral-300 mb-2">
              Target Kebutuhan Modal Toko
            </label>
            <div class="relative">
              <span class="absolute left-4 top-1/2 -translate-y-1/2 text-sm font-poppins font-bold text-neutral-500">
                Rp
              </span>
              <input
                v-model.number="formProfile.fundingTarget"
                type="number"
                class="w-full pl-11 pr-4 py-2.5 rounded-xl border border-neutral-200/90 dark:border-neutral-700/80 bg-neutral-50 dark:bg-[#18191E] text-sm font-poppins text-neutral-900 dark:text-white font-bold focus:outline-none focus:ring-2 focus:ring-[#2091AA]/30 transition-all tabular-nums"
              />
            </div>
          </div>
        </div>
      </div>

      <!-- Section C: Dokumen Legalitas & Perizinan Usaha (Feature Upload Dokumen) -->
      <div class="card-tactile-gopay rounded-2xl p-6 sm:p-7 space-y-6 border">
        <!-- Section Header with Dynamic Counter Badge -->
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-neutral-100 dark:border-neutral-800/80">
          <div>
            <div class="flex items-center gap-2.5">
              <h2 class="text-lg font-poppins font-bold text-neutral-900 dark:text-white">
                Dokumen Legalitas & Perizinan Usaha
              </h2>
            </div>
            <p class="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5 font-sans">
              Unggah berkas resmi untuk memperkuat skor kesiapan modal usaha dan verifikasi data room investor Beruang.
            </p>
          </div>

          <div class="flex items-center gap-2 shrink-0">
            <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-poppins font-bold bg-[#E6F4F7] text-[#2091AA] dark:bg-[#2091AA]/20 dark:text-[#50AABF] border border-[#2091AA]/25">
              <HugeiconsIcon :icon="ShieldCheckIcon" :size="15" />
              <span>{{ uploadedDocsCount }} dari {{ legalDocuments.length }} Dokumen Terunggah</span>
            </span>
          </div>
        </div>

        <!-- Hidden Native File Input for Document Upload -->
        <input
          ref="docFileInputRef"
          type="file"
          accept=".pdf,image/png,image/jpeg,image/webp"
          class="hidden"
          @change="onDocFileSelected"
        />

        <!-- Documents Grid -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div
            v-for="doc in legalDocuments"
            :key="doc.id"
            class="p-4 sm:p-5 rounded-2xl border transition-all duration-200 flex flex-col justify-between"
            :class="[
              doc.file
                ? 'bg-white dark:bg-[#18191E] border-neutral-200/90 dark:border-neutral-800 shadow-2xs hover:border-[#2091AA]/40 dark:hover:border-[#50AABF]/40'
                : 'bg-neutral-50/60 dark:bg-neutral-900/40 border-dashed border-neutral-300 dark:border-neutral-700 hover:border-neutral-400 dark:hover:border-neutral-600'
            ]"
          >
            <!-- Top Row: Icon & Status / Badge -->
            <div>
              <div class="flex items-start justify-between gap-3 mb-2.5">
                <div class="flex items-center gap-2.5">
                  <div
                    class="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 border shadow-2xs"
                    :class="[
                      doc.file
                        ? 'bg-emerald-50 text-[#00AA13] border-emerald-200 dark:bg-emerald-950/60 dark:text-emerald-400 dark:border-emerald-800'
                        : 'bg-[#E6F4F7] text-[#2091AA] border-[#2091AA]/20 dark:bg-[#2091AA]/20 dark:text-[#50AABF] dark:border-[#2091AA]/30'
                    ]"
                  >
                    <HugeiconsIcon
                      :icon="doc.file ? FileValidationIcon : File02Icon"
                      :size="18"
                      :stroke-width="2"
                    />
                  </div>

                  <div>
                    <h3 class="text-sm font-poppins font-bold text-neutral-900 dark:text-white leading-tight">
                      {{ doc.title }}
                    </h3>
                    <p class="text-[11px] font-poppins text-neutral-400 dark:text-neutral-500">
                      {{ doc.requirementNote }}
                    </p>
                  </div>
                </div>

                <!-- Category Badge Pill -->
                <span
                  class="text-[11px] font-poppins font-semibold px-2.5 py-0.5 rounded-md border shrink-0 whitespace-nowrap"
                  :class="[
                    doc.categoryBadge.includes('Wajib')
                      ? 'bg-rose-50 text-rose-600 border-rose-200 dark:bg-rose-950/60 dark:text-rose-400 dark:border-rose-800'
                      : doc.categoryBadge.includes('FnB')
                        ? 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/60 dark:text-amber-400 dark:border-amber-800'
                        : 'bg-neutral-100 text-neutral-600 border-neutral-200 dark:bg-neutral-800 dark:text-neutral-300 dark:border-neutral-700'
                  ]"
                >
                  {{ doc.categoryBadge }}
                </span>
              </div>

              <!-- Subtitle / Explanation (Exact user specification) -->
              <p class="text-xs text-neutral-600 dark:text-neutral-400 font-sans leading-relaxed mb-4">
                {{ doc.subtitle }}
              </p>
            </div>

            <!-- Bottom Area: Uploaded File State or Upload Button -->
            <div class="pt-3 border-t border-neutral-100 dark:border-neutral-800/80">
              <!-- Case A: File Already Uploaded -->
              <div v-if="doc.file" class="space-y-3">
                <div class="flex items-center justify-between p-2.5 rounded-xl bg-neutral-50 dark:bg-neutral-800/50 border border-neutral-200/80 dark:border-neutral-700/70">
                  <div class="flex items-center gap-2 min-w-0 pr-2">
                    <span class="px-1.5 py-0.5 rounded text-[10px] font-bold bg-red-100 dark:bg-red-950/80 text-red-600 dark:text-red-400 border border-red-200 shrink-0">
                      PDF
                    </span>
                    <div class="min-w-0">
                      <p class="text-xs font-poppins font-semibold text-neutral-900 dark:text-white truncate">
                        {{ doc.file.name }}
                      </p>
                      <p class="text-[10px] text-neutral-500 tabular-nums">
                        {{ doc.file.size }} · Diunggah {{ doc.file.uploadedAt }}
                      </p>
                    </div>
                  </div>

                  <span class="inline-flex items-center gap-1 text-[11px] font-semibold text-[#00AA13] bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-md border border-emerald-200 shrink-0">
                    ✓ Valid
                  </span>
                </div>

                <!-- Actions for Uploaded File -->
                <div class="flex items-center justify-between gap-2 pt-1">
                  <button
                    type="button"
                    class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-poppins font-medium text-[#2091AA] dark:text-[#50AABF] hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors cursor-pointer"
                    @click="openDocPreview(doc)"
                  >
                    <HugeiconsIcon :icon="EyeIcon" :size="14" :stroke-width="2" />
                    <span>Lihat Dokumen</span>
                  </button>

                  <div class="flex items-center gap-1">
                    <button
                      type="button"
                      class="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-poppins font-medium text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors cursor-pointer"
                      title="Ganti Dokumen Ini"
                      @click="triggerDocUpload(doc.id)"
                    >
                      <HugeiconsIcon :icon="Upload04Icon" :size="13" :stroke-width="2" />
                      <span>Ganti</span>
                    </button>

                    <button
                      type="button"
                      class="p-1.5 rounded-lg text-neutral-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/40 transition-colors cursor-pointer"
                      title="Hapus Dokumen"
                      @click="removeDocument(doc.id)"
                    >
                      <HugeiconsIcon :icon="Delete02Icon" :size="15" />
                    </button>
                  </div>
                </div>
              </div>

              <!-- Case B: File Not Uploaded Yet -->
              <div v-else class="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <span class="text-[11px] font-poppins text-neutral-400 flex items-center gap-1">
                  <HugeiconsIcon :icon="AlertCircleIcon" :size="13" />
                  <span>Belum ada dokumen terunggah</span>
                </span>

                <button
                  type="button"
                  class="btn-pill-gradient group inline-flex items-center justify-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-poppins font-semibold text-neutral-800 dark:text-neutral-200 cursor-pointer transition-all active:scale-95 shadow-2xs"
                  @click="triggerDocUpload(doc.id)"
                >
                  <HugeiconsIcon :icon="Upload04Icon" :size="14" :stroke-width="2" />
                  <span>Unggah Berkas</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Bottom Save Action Bar -->
      <div class="flex items-center justify-end pt-2 pb-4">
        <button
          type="button"
          class="btn-3d-blue px-6 py-2.5 sm:py-3 text-xs sm:text-sm font-poppins font-semibold shadow-xs active:scale-95 cursor-pointer flex items-center gap-2"
          @click="saveProfile"
        >
          <HugeiconsIcon :icon="CheckmarkCircle01Icon" :size="18" :stroke-width="2.2" />
          <span>Simpan Perubahan</span>
        </button>
      </div>
    </div>

    <!-- 4. Document Preview Modal (BModal Component) -->
    <BModal
      v-model="isPreviewModalOpen"
      :title="selectedDocForPreview?.title || 'Pratinjau Dokumen Usaha'"
      subtitle="Pratinjau berkas resmi yang tersimpan dalam sistem data room Beruang"
      size="lg"
    >
      <div v-if="selectedDocForPreview && selectedDocForPreview.file" class="space-y-4 font-poppins">
        <!-- Interactive Preview Viewport -->
        <div class="relative rounded-2xl bg-neutral-100 dark:bg-neutral-900 border border-neutral-200/90 dark:border-neutral-700/80 p-3 sm:p-5 overflow-hidden flex flex-col items-center justify-center min-h-[380px]">
          <!-- Case A: Uploaded Image Document Preview -->
          <div
            v-if="selectedDocForPreview.file.previewUrl && (selectedDocForPreview.file.fileType === 'image' || selectedDocForPreview.file.previewUrl.startsWith('data:image/'))"
            class="w-full flex flex-col items-center"
          >
            <div class="relative group max-w-full overflow-hidden rounded-xl bg-white dark:bg-neutral-800 p-2 shadow-md border border-neutral-200 dark:border-neutral-700">
              <img
                :src="selectedDocForPreview.file.previewUrl"
                :alt="selectedDocForPreview.file.name"
                class="max-h-[460px] w-auto max-w-full object-contain rounded-lg transition-transform duration-300 group-hover:scale-[1.01]"
              />
              <div class="absolute top-4 right-4 bg-black/75 backdrop-blur-md text-white text-[10px] font-semibold px-2.5 py-1 rounded-full flex items-center gap-1 shadow-sm">
                <HugeiconsIcon :icon="CheckmarkCircle01Icon" :size="12" class="text-emerald-400" />
                <span>Dokumen Terunggah</span>
              </div>
            </div>
            <p class="text-[11px] text-neutral-500 mt-2">
              Pratinjau visual berkas gambar yang telah diunggah
            </p>
          </div>

          <!-- Case B: Uploaded PDF with Blob / Live URL Preview -->
          <div
            v-else-if="selectedDocForPreview.file.previewUrl && selectedDocForPreview.file.fileType === 'pdf'"
            class="w-full"
          >
            <iframe
              :src="selectedDocForPreview.file.previewUrl"
              class="w-full h-[460px] rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white shadow-xs"
              title="Pratinjau PDF"
            ></iframe>
          </div>

          <!-- Case C: Authentic Legal Certificate Paper Sheet (Venture-Grade Document Visualizer) -->
          <div
            v-else
            class="w-full max-w-xl bg-white text-neutral-900 rounded-2xl p-5 sm:p-7 shadow-lg border border-neutral-200 relative overflow-hidden font-poppins select-none"
          >
            <!-- Watermark Background -->
            <div class="absolute -right-10 -bottom-10 opacity-[0.04] pointer-events-none">
              <svg width="240" height="240" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 2.18l7 3.12v4.7c0 4.67-3.13 9.03-7 10.18-3.87-1.15-7-5.51-7-10.18V6.3l7-3.12z" />
              </svg>
            </div>

            <!-- Top Decorative Brand Bar -->
            <div class="h-1.5 w-full bg-gradient-to-r from-[#2091AA] via-sky-400 to-[#00AA13] rounded-full mb-5"></div>

            <!-- Certificate Header -->
            <div class="text-center pb-4 border-b border-neutral-200">
              <div class="inline-flex items-center justify-center w-10 h-10 rounded-full bg-emerald-50 text-[#00AA13] border border-emerald-200 mb-2">
                <HugeiconsIcon :icon="ShieldCheckIcon" :size="20" />
              </div>
              <p class="text-[10px] font-bold tracking-widest uppercase text-neutral-500">
                {{ getDocOfficialDetails(selectedDocForPreview.id).issuer }}
              </p>
              <h4 class="text-base sm:text-lg font-extrabold text-neutral-900 uppercase tracking-tight mt-0.5">
                {{ selectedDocForPreview.title }}
              </h4>
              <p class="text-[11px] font-mono text-neutral-500 mt-1">
                NOMOR REGISTRASI: <span class="font-bold text-neutral-800">{{ getDocOfficialDetails(selectedDocForPreview.id).regNo }}</span>
              </p>
            </div>

            <!-- Certificate Body Content -->
            <div class="py-4 space-y-3 text-xs leading-relaxed">
              <p class="text-neutral-600 text-[11px]">
                Dengan ini menerangkan bahwa dokumen autentik berikut telah tercatat, terverifikasi sah, dan memenuhi standar kepatuhan operasional serta data room investor:
              </p>

              <div class="p-3 rounded-xl bg-neutral-50 border border-neutral-200/90 space-y-2 text-[11px]">
                <div class="flex justify-between py-0.5">
                  <span class="text-neutral-500">Nama Usaha / Unit:</span>
                  <span class="font-bold text-neutral-900">{{ formProfile.name }}</span>
                </div>
                <div class="flex justify-between py-0.5">
                  <span class="text-neutral-500">Penanggung Jawab:</span>
                  <span class="font-semibold text-neutral-900">{{ formProfile.ownerName }}</span>
                </div>
                <div class="flex justify-between py-0.5">
                  <span class="text-neutral-500">Nomor Induk Berusaha (NIB):</span>
                  <span class="font-mono font-semibold text-neutral-900">{{ formProfile.nib || 'NIB 1289000281923' }}</span>
                </div>
                <div class="flex justify-between py-0.5">
                  <span class="text-neutral-500">Klasifikasi Dokumen:</span>
                  <span class="font-semibold text-neutral-800">{{ getDocOfficialDetails(selectedDocForPreview.id).classification }}</span>
                </div>
                <div class="flex justify-between py-0.5">
                  <span class="text-neutral-500">Tanggal Pengesahan Berkas:</span>
                  <span class="font-semibold text-neutral-800">{{ selectedDocForPreview.file?.uploadedAt || '12 Oktober 2026' }}</span>
                </div>
              </div>
            </div>

            <!-- Certificate Footer Signatures & Stamp -->
            <div class="pt-3 border-t border-neutral-200 flex items-center justify-between text-[10px]">
              <!-- Left: Digital Seal Stamp -->
              <div class="flex items-center gap-2">
                <div class="w-12 h-12 rounded-full border-2 border-dashed border-emerald-600/70 text-[#00AA13] flex flex-col items-center justify-center p-1 text-[8px] font-black leading-tight text-center rotate-[-8deg] bg-emerald-50/50">
                  <span>BERUANG</span>
                  <span class="text-[7px]">VERIFIED</span>
                </div>
                <div>
                  <p class="font-bold text-neutral-800">Status Data Room</p>
                  <p class="text-emerald-700 font-semibold">Tervalidasi Sistem</p>
                </div>
              </div>

              <!-- Right: Consultant Authority -->
              <div class="text-right">
                <p class="text-neutral-400">Pemeriksa Resmi:</p>
                <p class="font-bold text-neutral-800 mt-2 underline decoration-neutral-300">
                  {{ umkmStore.profile.consultantName || 'Dra. Maya Suryani, M.M.' }}
                </p>
                <p class="text-[9px] text-neutral-500">Advisor Kurasi & Legalitas UMKM</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Document Details Breakdown Bar -->
        <div class="p-3.5 rounded-xl bg-white dark:bg-[#18191E] border border-neutral-200/80 dark:border-neutral-700/80 space-y-2 text-xs">
          <div class="flex flex-wrap items-center justify-between gap-2">
            <div class="flex items-center gap-2 min-w-0">
              <span class="px-2 py-0.5 rounded text-[10px] font-bold bg-[#2091AA]/10 text-[#2091AA] dark:text-[#50AABF] border border-[#2091AA]/20 shrink-0">
                {{ selectedDocForPreview.file.fileType === 'image' ? 'GAMBAR / SCAN' : 'PDF' }}
              </span>
              <p class="font-semibold text-neutral-900 dark:text-white truncate">
                {{ selectedDocForPreview.file.name }}
              </p>
            </div>
            <div class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 text-[#00AA13] dark:bg-emerald-950/60 dark:text-emerald-400 border border-emerald-200 shrink-0">
              <HugeiconsIcon :icon="CheckmarkCircle01Icon" :size="13" />
              <span>Terverifikasi Legal & Sesuai Standar Investor</span>
            </div>
          </div>

          <div class="flex flex-wrap items-center justify-between gap-x-4 gap-y-1.5 pt-2 border-t border-neutral-100 dark:border-neutral-800 text-[11px]">
            <div>
              <span class="text-neutral-400">Ukuran:</span>
              <span class="ml-1 font-medium text-neutral-700 dark:text-neutral-300 tabular-nums">{{ selectedDocForPreview.file.size }}</span>
            </div>
            <div>
              <span class="text-neutral-400">Keperluan:</span>
              <span class="ml-1 font-medium text-neutral-700 dark:text-neutral-300">{{ selectedDocForPreview.requirementNote }}</span>
            </div>
            <div>
              <span class="text-neutral-400">Waktu Audit:</span>
              <span class="ml-1 font-medium text-neutral-700 dark:text-neutral-300">{{ selectedDocForPreview.file.uploadedAt }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Modal Pinned Footer Actions (Without Unduh Salinan Dokumen) -->
      <template #footer>
        <div class="flex items-center justify-between w-full">
          <button
            type="button"
            class="btn-pill-gradient inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-neutral-800 dark:text-neutral-200 cursor-pointer transition-all active:scale-95 shadow-2xs"
            @click="triggerDocUpload(selectedDocForPreview.id)"
          >
            <HugeiconsIcon :icon="Upload04Icon" :size="14" :stroke-width="2" />
            <span>Unggah Ulang / Ganti Berkas</span>
          </button>

          <button
            type="button"
            class="px-5 py-2 rounded-xl border border-neutral-200 dark:border-neutral-700 text-xs font-semibold hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors cursor-pointer text-neutral-700 dark:text-neutral-300"
            @click="isPreviewModalOpen = false"
          >
            Tutup
          </button>
        </div>
      </template>
    </BModal>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '~/stores/auth'
import { useUmkmStore } from '~/stores/umkm'
import BStoreBanner from '~/components/base/BStoreBanner.vue'
import BModal from '~/components/base/BModal.vue'
import { HugeiconsIcon } from '@hugeicons/vue'
import {
  Home03Icon,
  CheckmarkCircle01Icon,
  Camera01Icon,
  UserCircleIcon,
  ShieldCheckIcon,
  FileValidationIcon,
  File01Icon,
  File02Icon,
  Upload04Icon,
  Delete02Icon,
  EyeIcon,
  AlertCircleIcon
} from '@hugeicons/core-free-icons'

definePageMeta({
  layout: 'dashboard'
})

const router = useRouter()
const authStore = useAuthStore()
const umkmStore = useUmkmStore()

// Toast state
const showSuccessToast = ref(false)
const toastMessage = ref('Perubahan profil usaha berhasil disimpan!')
let toastTimeout: any = null

function triggerToast(message: string) {
  if (toastTimeout) clearTimeout(toastTimeout)
  toastMessage.value = message
  showSuccessToast.value = true
  toastTimeout = setTimeout(() => {
    showSuccessToast.value = false
  }, 3000)
}

// Sektor Industri Options & Custom Handling
const standardSectors = [
  'Kuliner & Minuman (F&B)',
  'Retail & Toko Kelontong',
  'Jasa & Layanan',
  'Fashion & Konveksi',
  'Agribisnis & Pertanian',
  'Kerajinan & Kriya'
]

const currentSector = umkmStore.profile.sector || 'Kuliner & Minuman (F&B)'
const isInitialCustom = !standardSectors.includes(currentSector)

const selectedSectorCategory = ref(isInitialCustom ? 'Lainnya' : currentSector)
const customSectorText = ref(isInitialCustom ? currentSector : '')

function onSectorCategoryChange() {
  if (selectedSectorCategory.value !== 'Lainnya') {
    formProfile.sector = selectedSectorCategory.value
  } else {
    formProfile.sector = customSectorText.value.trim() || 'Lainnya'
  }
}

function updateSectorFromCustom() {
  if (selectedSectorCategory.value === 'Lainnya') {
    formProfile.sector = customSectorText.value.trim() || 'Lainnya'
  }
}

// Main Profile Reactive Form
const formProfile = reactive({
  name: umkmStore.profile.name || '',
  ownerName: umkmStore.profile.ownerName || '',
  sector: currentSector,
  city: umkmStore.profile.city || 'Bandung, Jawa Barat',
  establishedYear: umkmStore.profile.establishedYear || 2021,
  outletsCount: umkmStore.profile.outletsCount || 3,
  employeesCount: umkmStore.profile.employeesCount || 14,
  fundingTarget: umkmStore.profile.fundingTarget || 250000000,
  pitchSummary: umkmStore.profile.pitchSummary || '',
  description: umkmStore.profile.description || '',
  nib: umkmStore.profile.nib || '1209000123456',
  npwp: umkmStore.profile.npwp || '81.423.891.4-429.000'
})

const ownerFirstName = computed(() => {
  return formProfile.ownerName.split(' ')[0] || 'Pemilik'
})

// Legal Documents Interface & State
export interface LegalDocument {
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
    previewUrl?: string
    fileType?: 'image' | 'pdf' | 'document'
  } | null
}

const legalDocuments = ref<LegalDocument[]>([
  {
    id: 'sku',
    title: 'SKU (Surat Keterangan Usaha)',
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

const uploadedDocsCount = computed(() => {
  return legalDocuments.value.filter(doc => doc.file !== null).length
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
  const input = event.target as HTMLInputElement
  if (!input.files || !input.files[0] || !currentUploadDocId.value) return

  const file = input.files[0]
  const sizeFormatted = file.size > 1024 * 1024
    ? `${(file.size / (1024 * 1024)).toFixed(1)} MB`
    : `${Math.round(file.size / 1024)} KB`

  const targetDoc = legalDocuments.value.find(d => d.id === currentUploadDocId.value)
  if (targetDoc) {
    const isImage = file.type.startsWith('image/')
    const isPdf = file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf')
    const objectUrl = URL.createObjectURL(file)

    targetDoc.file = {
      name: file.name,
      size: sizeFormatted,
      uploadedAt: 'Hari ini',
      isVerified: true,
      previewUrl: objectUrl,
      fileType: isImage ? 'image' : isPdf ? 'pdf' : 'document'
    }

    // Keep preview modal reactive if currently previewing this document
    if (selectedDocForPreview.value && selectedDocForPreview.value.id === targetDoc.id) {
      selectedDocForPreview.value = { ...targetDoc }
    }

    // Attempt base64 read for persistence if file is reasonably sized (< 2MB)
    if (file.size < 2 * 1024 * 1024) {
      const reader = new FileReader()
      reader.onload = (e) => {
        if (targetDoc.file && e.target?.result) {
          targetDoc.file.previewUrl = e.target.result as string
          if (selectedDocForPreview.value && selectedDocForPreview.value.id === targetDoc.id) {
            selectedDocForPreview.value.file!.previewUrl = e.target.result as string
          }
          saveDocumentsToStorage()
        }
      }
      reader.readAsDataURL(file)
    } else {
      saveDocumentsToStorage()
    }

    triggerToast(`Dokumen ${targetDoc.title} berhasil diunggah!`)
  }
  currentUploadDocId.value = null
}

function removeDocument(docId: string) {
  const targetDoc = legalDocuments.value.find(d => d.id === docId)
  if (targetDoc) {
    targetDoc.file = null
    if (selectedDocForPreview.value && selectedDocForPreview.value.id === docId) {
      isPreviewModalOpen.value = false
      selectedDocForPreview.value = null
    }
    saveDocumentsToStorage()
    triggerToast(`Dokumen ${targetDoc.title} telah dihapus.`)
  }
}

// Document Preview Modal State
const isPreviewModalOpen = ref(false)
const selectedDocForPreview = ref<LegalDocument | null>(null)

function openDocPreview(doc: LegalDocument) {
  selectedDocForPreview.value = doc
  isPreviewModalOpen.value = true
}

function getDocOfficialDetails(docId: string) {
  switch (docId) {
    case 'sku':
      return {
        issuer: 'Pemerintah Provinsi DKI Jakarta · Kelurahan Cilandak Barat',
        regNo: '503/082.SKU/X/2026',
        classification: 'Keterangan Domisili & Operasional Usaha Mikro',
        date: '12 Oktober 2026'
      }
    case 'akta':
      return {
        issuer: 'Kantor Notaris & PPAT Hendra Wijaya, S.H., M.Kn.',
        regNo: 'Akta No. 24 / Notaris-HW / 2024',
        classification: 'Akta Pendirian Entitas Bisnis Resmi',
        date: '15 September 2026'
      }
    case 'kemenkumham':
      return {
        issuer: 'Kementerian Hukum dan HAM RI · Ditjen AHU',
        regNo: 'AHU-0029182.AH.01.11.TAHUN 2024',
        classification: 'Pengesahan Badan Hukum Perseroan Terbatas',
        date: '18 September 2026'
      }
    case 'halal':
      return {
        issuer: 'Badan Penyelenggara Jaminan Produk Halal (BPJPH) Kemenag RI',
        regNo: 'ID321100019283.08.2026',
        classification: 'Sertifikasi Halal Resmi Produk Olahan Makanan & Minuman',
        date: '20 Agustus 2026'
      }
    case 'haki':
      return {
        issuer: 'Direktorat Jenderal Kekayaan Intelektual (DJKI) Kemenkumham RI',
        regNo: 'IDM000982103 / Permohonan IPT20250918290',
        classification: 'Pendaftaran Hak Merek Dagang & Logo Komersial (Kelas 30 & 43)',
        date: '05 Juli 2026'
      }
    default:
      return {
        issuer: 'Kementerian / Instansi Terkait RI',
        regNo: 'REG/BERUANG/2026/VALID',
        classification: 'Dokumen Kepatuhan Usaha Resmi',
        date: 'Tahun 2026'
      }
  }
}

// Storage persistence
function initDocumentsFromStorage() {
  if (typeof window !== 'undefined') {
    try {
      const saved = localStorage.getItem('umkm_legal_documents')
      if (saved) {
        const parsed = JSON.parse(saved)
        legalDocuments.value.forEach(doc => {
          if (parsed[doc.id] !== undefined) {
            doc.file = parsed[doc.id]
          }
        })
      }
    } catch (e) {
      console.warn('Gagal membaca dokumen legalitas dari storage', e)
    }
  }
}

function saveDocumentsToStorage() {
  if (typeof window !== 'undefined') {
    try {
      const toSave: Record<string, any> = {}
      legalDocuments.value.forEach(doc => {
        if (!doc.file) {
          toSave[doc.id] = null
          return
        }
        const canPersistPreview = doc.file.previewUrl && doc.file.previewUrl.startsWith('data:') && doc.file.previewUrl.length < 1500000
        toSave[doc.id] = {
          name: doc.file.name,
          size: doc.file.size,
          uploadedAt: doc.file.uploadedAt,
          isVerified: doc.file.isVerified,
          fileType: doc.file.fileType,
          previewUrl: canPersistPreview ? doc.file.previewUrl : undefined
        }
      })
      localStorage.setItem('umkm_legal_documents', JSON.stringify(toSave))
    } catch (e) {
      console.warn('Gagal menyimpan dokumen legalitas ke storage', e)
    }
  }
}

// Store Banner & Avatar Event Handlers
function onBannerUpdated(newUrl: string) {
  umkmStore.updateProfileBanner(newUrl)
}

function onBannerReset() {
  umkmStore.resetProfileBanner()
}

function onAvatarUpdated(newUrl: string) {
  umkmStore.updateOwnerAvatar(newUrl)
}

function onAvatarReset() {
  umkmStore.resetOwnerAvatar()
}

// Save Full Profile
function saveProfile() {
  // Sync Sector
  if (selectedSectorCategory.value === 'Lainnya') {
    formProfile.sector = customSectorText.value.trim() || 'Lainnya'
  } else {
    formProfile.sector = selectedSectorCategory.value
  }

  umkmStore.profile.name = formProfile.name
  umkmStore.profile.ownerName = formProfile.ownerName
  umkmStore.profile.sector = formProfile.sector
  umkmStore.profile.city = formProfile.city
  umkmStore.profile.establishedYear = formProfile.establishedYear
  umkmStore.profile.outletsCount = formProfile.outletsCount
  umkmStore.profile.employeesCount = formProfile.employeesCount
  umkmStore.profile.fundingTarget = formProfile.fundingTarget
  umkmStore.profile.pitchSummary = formProfile.pitchSummary
  umkmStore.profile.description = formProfile.description
  umkmStore.profile.nib = formProfile.nib
  umkmStore.profile.npwp = formProfile.npwp

  if (authStore.currentUser) {
    authStore.currentUser.businessName = formProfile.name
    authStore.currentUser.name = formProfile.ownerName
  }

  umkmStore.updateQuickProfile(formProfile.name, formProfile.description)
  saveDocumentsToStorage()
  triggerToast('Perubahan profil usaha & dokumen berhasil disimpan!')
}

onMounted(() => {
  umkmStore.initBannerFromStorage()
  umkmStore.initAvatarFromStorage()
  umkmStore.initQuickProfileFromStorage()
  initDocumentsFromStorage()
})
</script>
