<template>
  <div class="space-y-6 sm:space-y-8 pb-16 font-sans">
    
    <!-- 1. PROFILE HEADER BANNER -->
    <div class="p-1.5 sm:p-2 rounded-3xl bg-neutral-200/50 dark:bg-neutral-800/40 border border-neutral-300/40 dark:border-neutral-700/30 shadow-xs">
      <div class="p-6 sm:p-8 rounded-[calc(1.5rem-0.25rem)] bg-white dark:bg-[#13161F] border border-neutral-200/80 dark:border-white/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative overflow-hidden">
        <div class="flex items-start sm:items-center gap-4 sm:gap-5 flex-1 min-w-0">
          <!-- Profile Avatar with Online / Verified Badge -->
          <div class="relative shrink-0">
            <div class="w-18 h-18 sm:w-20 sm:h-20 rounded-2xl bg-neutral-100 dark:bg-[#1A1D26] border-2 border-[#0081A0]/30 shadow-sm overflow-hidden">
              <img
                :src="profileData.avatar || '/images/user-profile.png'"
                alt="Foto Profil Konsultan"
                class="w-full h-full object-cover"
                @error="(e: any) => { e.target.src = '/images/user-profile.png' }"
              />
            </div>
            <div class="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-[#00AA13] border-2 border-white dark:border-[#13161F] flex items-center justify-center text-white" title="Akun Terverifikasi">
              <HugeiconsIcon :icon="CheckmarkCircle01Icon" :size="14" :stroke-width="2.5" />
            </div>
          </div>

          <!-- Identity Details -->
          <div class="space-y-1 min-w-0 text-left">
            <div class="flex items-center gap-2 flex-wrap">
              <h1 class="text-xl sm:text-2xl lg:text-[26px] font-heading font-extrabold text-neutral-900 dark:text-white tracking-tight leading-tight">
                {{ profileData.name }}
              </h1>
              <span class="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#00AA13]/10 dark:bg-[#00AA13]/20 text-[#00AA13] dark:text-[#22C55E] border border-[#00AA13]/20">
                <HugeiconsIcon :icon="Award01Icon" :size="12" :stroke-width="2" />
                <span>Lisensi Terverifikasi</span>
              </span>
            </div>

            <p class="text-xs sm:text-sm font-semibold text-[#0081A0] dark:text-[#2091AA]">
              {{ profileData.title }} • {{ profileData.firmName }}
            </p>

            <div class="flex items-center gap-3 text-xs text-neutral-500 dark:text-neutral-400 flex-wrap pt-0.5">
              <span class="flex items-center gap-1">
                <HugeiconsIcon :icon="Location01Icon" :size="13" :stroke-width="1.8" />
                <span>{{ profileData.city }}</span>
              </span>
              <span>•</span>
              <span class="tabular-nums">No. BNSP: <strong>{{ profileData.bnspLicense }}</strong></span>
            </div>
          </div>
        </div>

        <!-- Quick Completeness Metric Badge -->
        <div class="card-tactile-gopay p-4 rounded-2xl min-w-[160px] text-center shrink-0 self-stretch sm:self-auto flex sm:flex-col justify-between sm:justify-center items-center">
          <span class="text-[11px] font-semibold text-neutral-500 uppercase tracking-wider block">Kelengkapan Data</span>
          <div class="text-2xl sm:text-3xl font-extrabold text-[#0081A0] dark:text-[#2091AA] tabular-nums my-0.5">
            {{ completenessScore }}%
          </div>
          <span class="text-[10px] text-[#00AA13] font-bold">
            {{ completenessScore === 100 ? 'Profil Sempurna' : 'Dikit Lagi Lengkap!' }}
          </span>
        </div>
      </div>
    </div>

    <!-- 2. DATA COMPLETENESS METER CARD -->
    <div class="card-tactile-gopay p-5 sm:p-6 rounded-3xl space-y-4 text-left">
      <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div>
          <h2 class="text-base sm:text-lg font-heading font-bold text-neutral-900 dark:text-white">
            Status Kelengkapan Dokumen & Profil
          </h2>
          <p class="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
            Lengkapi data diri dan unggah sertifikat keahlianmu agar profilmu diprioritaskan kepada UMKM yang membutuhkan pendampingan.
          </p>
        </div>
        <span class="text-xs font-bold px-3 py-1 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 tabular-nums">
          {{ completedChecklistCount }} dari {{ checklistItems.length }} Syarat Terpenuhi
        </span>
      </div>

      <!-- Progress Bar -->
      <div class="w-full bg-neutral-200/80 dark:bg-neutral-800 rounded-full h-3 overflow-hidden p-0.5">
        <div
          class="h-full rounded-full bg-gradient-to-r from-[#0081A0] to-[#00AA13] transition-all duration-500 ease-out"
          :style="{ width: `${completenessScore}%` }"
        />
      </div>

      <!-- Checklist Grid -->
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 pt-2">
        <div
          v-for="(item, idx) in checklistItems"
          :key="idx"
          :class="[
            'p-3 rounded-2xl border flex items-center gap-2.5 text-xs transition-colors',
            item.done
              ? 'bg-[#00AA13]/5 border-[#00AA13]/25 text-neutral-800 dark:text-neutral-200'
              : 'bg-neutral-50 dark:bg-[#1A1D26] border-neutral-200 dark:border-white/10 text-neutral-400'
          ]"
        >
          <div
            :class="[
              'w-5 h-5 rounded-full flex items-center justify-center shrink-0',
              item.done ? 'bg-[#00AA13] text-white' : 'bg-neutral-300 dark:bg-neutral-700 text-neutral-500'
            ]"
          >
            <HugeiconsIcon :icon="CheckmarkCircle01Icon" :size="12" :stroke-width="2.5" />
          </div>
          <span :class="['font-medium', item.done ? 'font-semibold' : '']">{{ item.label }}</span>
        </div>
      </div>
    </div>

    <!-- 3. NAVIGATION TABS: DATA PRIBADI & UPLOAD DOKUMEN -->
    <div class="flex items-center gap-2 p-1 rounded-2xl bg-neutral-100 dark:bg-[#13161F] border border-neutral-200/80 dark:border-white/10 w-fit">
      <button
        type="button"
        :class="[
          'px-5 py-2.5 rounded-xl text-xs sm:text-sm font-heading font-bold transition-all duration-150 cursor-pointer flex items-center gap-2',
          activeTab === 'personal'
            ? 'bg-white dark:bg-[#1A1D26] text-[#0081A0] dark:text-[#2091AA] shadow-xs'
            : 'text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
        ]"
        @click="activeTab = 'personal'"
      >
        <HugeiconsIcon :icon="UserCircleIcon" :size="16" :stroke-width="2" />
        <span>Data Pribadi & Keahlian</span>
      </button>

      <button
        type="button"
        :class="[
          'px-5 py-2.5 rounded-xl text-xs sm:text-sm font-heading font-bold transition-all duration-150 cursor-pointer flex items-center gap-2',
          activeTab === 'documents'
            ? 'bg-white dark:bg-[#1A1D26] text-[#0081A0] dark:text-[#2091AA] shadow-xs'
            : 'text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
        ]"
        @click="activeTab = 'documents'"
      >
        <HugeiconsIcon :icon="File01Icon" :size="16" :stroke-width="2" />
        <span>Kelola & Upload Dokumen</span>
        <span
          class="px-2 py-0.2 rounded-full text-[10px] font-bold bg-[#0081A0]/10 text-[#0081A0] dark:bg-[#0081A0]/20 dark:text-[#2091AA] tabular-nums"
        >
          {{ konsultanStore.profile.documents.length }}
        </span>
      </button>
    </div>

    <!-- 4. TAB 1: FORM DATA PRIBADI & KEAHLIAN -->
    <div v-if="activeTab === 'personal'" class="card-tactile-gopay p-6 sm:p-8 rounded-3xl text-left">
      <form @submit.prevent="handleSaveProfile" class="space-y-6">
        <div class="border-b border-neutral-200/80 dark:border-white/10 pb-4">
          <h3 class="font-heading font-bold text-lg text-neutral-900 dark:text-white">
            Informasi Praktik Konsultan
          </h3>
          <p class="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
            Data ini akan ditampilkan pada profil publik yang dapat dilihat oleh calon UMKM binaan.
          </p>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <!-- Nama Lengkap & Gelar -->
          <div>
            <label class="block text-xs font-bold text-neutral-700 dark:text-neutral-300 mb-1.5 font-heading">
              Nama Lengkap & Gelar Akademik <span class="text-red-500">*</span>
            </label>
            <input
              v-model="profileData.name"
              type="text"
              required
              class="w-full px-4 py-2.5 rounded-xl border border-neutral-300 dark:border-white/10 bg-white dark:bg-[#1A1D26] text-xs sm:text-sm text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#0081A0]/20"
            />
          </div>

          <!-- Jabatan / Title -->
          <div>
            <label class="block text-xs font-bold text-neutral-700 dark:text-neutral-300 mb-1.5 font-heading">
              Gelar Profesi / Jabatan <span class="text-red-500">*</span>
            </label>
            <input
              v-model="profileData.title"
              type="text"
              required
              class="w-full px-4 py-2.5 rounded-xl border border-neutral-300 dark:border-white/10 bg-white dark:bg-[#1A1D26] text-xs sm:text-sm text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#0081A0]/20"
            />
          </div>

          <!-- Nama Firma / Kantor -->
          <div>
            <label class="block text-xs font-bold text-neutral-700 dark:text-neutral-300 mb-1.5 font-heading">
              Nama Firma / Badan Usaha Konsultan <span class="text-red-500">*</span>
            </label>
            <input
              v-model="profileData.firmName"
              type="text"
              required
              class="w-full px-4 py-2.5 rounded-xl border border-neutral-300 dark:border-white/10 bg-white dark:bg-[#1A1D26] text-xs sm:text-sm text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#0081A0]/20"
            />
          </div>

          <!-- Nomor Lisensi BNSP -->
          <div>
            <label class="block text-xs font-bold text-neutral-700 dark:text-neutral-300 mb-1.5 font-heading">
              Nomor Lisensi BNSP / Akreditasi <span class="text-red-500">*</span>
            </label>
            <input
              v-model="profileData.bnspLicense"
              type="text"
              required
              placeholder="Contoh: BNSP-KONS-2024-8891"
              class="w-full px-4 py-2.5 rounded-xl border border-neutral-300 dark:border-white/10 bg-white dark:bg-[#1A1D26] text-xs sm:text-sm text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#0081A0]/20"
            />
          </div>

          <!-- Email Bisnis -->
          <div>
            <label class="block text-xs font-bold text-neutral-700 dark:text-neutral-300 mb-1.5 font-heading">
              Email Bisnis / Korespondensi <span class="text-red-500">*</span>
            </label>
            <input
              v-model="profileData.email"
              type="email"
              required
              class="w-full px-4 py-2.5 rounded-xl border border-neutral-300 dark:border-white/10 bg-white dark:bg-[#1A1D26] text-xs sm:text-sm text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#0081A0]/20"
            />
          </div>

          <!-- Kontak WhatsApp -->
          <div>
            <label class="block text-xs font-bold text-neutral-700 dark:text-neutral-300 mb-1.5 font-heading">
              Nomor Kontak WhatsApp <span class="text-red-500">*</span>
            </label>
            <input
              v-model="profileData.phone"
              type="text"
              required
              class="w-full px-4 py-2.5 rounded-xl border border-neutral-300 dark:border-white/10 bg-white dark:bg-[#1A1D26] text-xs sm:text-sm text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#0081A0]/20"
            />
          </div>

          <!-- Spesialisasi Utama -->
          <div>
            <label class="block text-xs font-bold text-neutral-700 dark:text-neutral-300 mb-1.5 font-heading">
              Bidang Spesialisasi Utama <span class="text-red-500">*</span>
            </label>
            <select
              v-model="profileData.specialization"
              required
              class="w-full px-4 py-2.5 rounded-xl border border-neutral-300 dark:border-white/10 bg-white dark:bg-[#1A1D26] text-xs sm:text-sm text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#0081A0]/20 cursor-pointer"
            >
              <option value="Keuangan & Biaya">Keuangan, Biaya & Rasio Margin</option>
              <option value="Operasional & Rantai Pasok">Operasional & Standar Mutu</option>
              <option value="Legalitas & Sertifikasi">Legalitas Usaha, Halal & NIB</option>
              <option value="Pemasaran & Digital">Pemasaran & Saluran Penjualan</option>
              <option value="SDM & Tata Kelola">Tata Kelola Organisasi & SDM</option>
            </select>
          </div>

          <!-- Pengalaman & Kuota Klien -->
          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="block text-xs font-bold text-neutral-700 dark:text-neutral-300 mb-1.5 font-heading">
                Lama Pengalaman
              </label>
              <input
                v-model="profileData.experience"
                type="text"
                class="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 dark:border-white/10 bg-white dark:bg-[#1A1D26] text-xs text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#0081A0]/20"
              />
            </div>
            <div>
              <label class="block text-xs font-bold text-neutral-700 dark:text-neutral-300 mb-1.5 font-heading">
                Batas Klien Aktif
              </label>
              <input
                v-model.number="profileData.maxClients"
                type="number"
                min="1"
                max="50"
                class="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 dark:border-white/10 bg-white dark:bg-[#1A1D26] text-xs text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#0081A0]/20"
              />
            </div>
          </div>
        </div>

        <!-- Kota Domisili -->
        <div>
          <label class="block text-xs font-bold text-neutral-700 dark:text-neutral-300 mb-1.5 font-heading">
            Kota Domisili Praktik <span class="text-red-500">*</span>
          </label>
          <input
            v-model="profileData.city"
            type="text"
            required
            class="w-full px-4 py-2.5 rounded-xl border border-neutral-300 dark:border-white/10 bg-white dark:bg-[#1A1D26] text-xs sm:text-sm text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#0081A0]/20"
          />
        </div>

        <!-- Biodata Singkat -->
        <div>
          <label class="block text-xs font-bold text-neutral-700 dark:text-neutral-300 mb-1.5 font-heading">
            Profil & Pengalaman Singkat Konsultan <span class="text-red-500">*</span>
          </label>
          <textarea
            v-model="profileData.bio"
            rows="3"
            required
            placeholder="Tuliskan latar belakang keahlian, pendekatan bimbingan, dan rekam jejakmu mendampingi UMKM..."
            class="w-full px-4 py-2.5 rounded-xl border border-neutral-300 dark:border-white/10 bg-white dark:bg-[#1A1D26] text-xs sm:text-sm text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#0081A0]/20 resize-none"
          />
        </div>

        <!-- Submit Button -->
        <div class="pt-4 border-t border-neutral-200/80 dark:border-white/10 flex items-center justify-end">
          <button
            type="submit"
            class="px-6 py-3 rounded-2xl bg-[#0081A0] hover:bg-[#006D87] text-white font-heading font-bold text-sm shadow-md hover:shadow-lg transition-all active:scale-95 cursor-pointer"
          >
            Simpan Perubahan Profil
          </button>
        </div>
      </form>
    </div>

    <!-- 5. TAB 2: UPLOAD & KELOLA DOKUMEN -->
    <div v-else-if="activeTab === 'documents'" class="space-y-6 text-left">
      <!-- Upload Dropzone Card -->
      <div class="card-tactile-gopay p-6 sm:p-8 rounded-3xl space-y-5">
        <div>
          <h3 class="font-heading font-bold text-lg text-neutral-900 dark:text-white">
            Unggah Dokumen Sertifikasi & Portofolio
          </h3>
          <p class="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
            Unggah sertifikat lisensi BNSP, surat bukti portofolio bimbingan klien, atau dokumen NPWP konsultan dalam format PDF, PNG, atau JPG (maksimal 10 MB per berkas).
          </p>
        </div>

        <form @submit.prevent="handleUploadDocument" class="space-y-4">
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label class="block text-xs font-bold text-neutral-700 dark:text-neutral-300 mb-1.5 font-heading">
                Nama / Judul Dokumen <span class="text-red-500">*</span>
              </label>
              <input
                v-model="newDocForm.name"
                type="text"
                required
                placeholder="Contoh: Sertifikat Lisensi BNSP 2026"
                class="w-full px-3.5 py-2 rounded-xl border border-neutral-300 dark:border-white/10 bg-white dark:bg-[#1A1D26] text-xs text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#0081A0]/20"
              />
            </div>

            <div>
              <label class="block text-xs font-bold text-neutral-700 dark:text-neutral-300 mb-1.5 font-heading">
                Kategori Berkas <span class="text-red-500">*</span>
              </label>
              <select
                v-model="newDocForm.type"
                required
                class="w-full px-3.5 py-2 rounded-xl border border-neutral-300 dark:border-white/10 bg-white dark:bg-[#1A1D26] text-xs text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#0081A0]/20 cursor-pointer"
              >
                <option value="BNSP_CERT">Sertifikat Lisensi BNSP</option>
                <option value="PORTOFOLIO">Portofolio & Rekam Jejak Klien</option>
                <option value="KTP_NPWP">Identitas KTP & NPWP Konsultan</option>
                <option value="OTHER">Dokumen Pendukung Lainnya</option>
              </select>
            </div>
          </div>

          <!-- Drag and Drop Box -->
          <div
            class="border-2 border-dashed border-neutral-300 dark:border-neutral-700 hover:border-[#0081A0] rounded-2xl p-6 text-center cursor-pointer transition-colors bg-neutral-50/50 dark:bg-[#1A1D26]/50"
            @click="triggerFileInput"
          >
            <input
              ref="fileInputRef"
              type="file"
              class="hidden"
              accept=".pdf,.png,.jpg,.jpeg"
              @change="onFileSelected"
            />
            <div class="w-12 h-12 rounded-2xl bg-[#0081A0]/10 text-[#0081A0] dark:text-[#2091AA] flex items-center justify-center mx-auto mb-3">
              <HugeiconsIcon :icon="Upload01Icon" :size="24" :stroke-width="2" />
            </div>
            <div v-if="selectedFileName" class="space-y-1">
              <p class="text-xs sm:text-sm font-bold text-neutral-900 dark:text-white">
                Berkas Terpilih: {{ selectedFileName }}
              </p>
              <p class="text-[11px] text-neutral-500">{{ selectedFileSize }}</p>
            </div>
            <div v-else class="space-y-1">
              <p class="text-xs sm:text-sm font-semibold text-neutral-800 dark:text-neutral-200">
                Klik untuk memilih berkas atau seret berkas ke sini
              </p>
              <p class="text-[11px] text-neutral-400">PDF, JPG, atau PNG (Maks 10 MB)</p>
            </div>
          </div>

          <!-- Upload Submit Button -->
          <div class="flex justify-end pt-2">
            <button
              type="submit"
              :disabled="!selectedFileName"
              :class="[
                'px-5 py-2.5 rounded-xl font-heading font-bold text-xs transition-all flex items-center gap-2 cursor-pointer',
                selectedFileName
                  ? 'bg-[#0081A0] hover:bg-[#006D87] text-white shadow-md active:scale-95'
                  : 'bg-neutral-200 dark:bg-neutral-800 text-neutral-400 cursor-not-allowed'
              ]"
            >
              <HugeiconsIcon :icon="Upload01Icon" :size="16" :stroke-width="2" />
              <span>Unggah Dokumen Sekarang</span>
            </button>
          </div>
        </form>
      </div>

      <!-- Uploaded Documents List -->
      <div class="card-tactile-gopay p-6 sm:p-8 rounded-3xl space-y-4">
        <div class="flex items-center justify-between">
          <h3 class="font-heading font-bold text-base sm:text-lg text-neutral-900 dark:text-white">
            Dokumen yang Telah Diunggah
          </h3>
          <span class="text-xs text-neutral-500 tabular-nums">
            Total: <strong>{{ konsultanStore.profile.documents.length }}</strong> Berkas
          </span>
        </div>

        <div v-if="konsultanStore.profile.documents.length > 0" class="space-y-3">
          <div
            v-for="doc in konsultanStore.profile.documents"
            :key="doc.id"
            class="p-4 rounded-2xl bg-white dark:bg-[#1A1D26] border border-neutral-200 dark:border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-2xs hover:border-[#0081A0]/30 transition-all"
          >
            <!-- Left: File Type Icon & Name -->
            <div class="flex items-center gap-3.5 min-w-0">
              <div class="w-11 h-11 rounded-xl bg-sky-50 dark:bg-sky-950/40 text-[#0081A0] dark:text-[#2091AA] flex items-center justify-center shrink-0">
                <HugeiconsIcon :icon="File01Icon" :size="20" :stroke-width="1.8" />
              </div>
              <div class="space-y-0.5 min-w-0">
                <div class="flex items-center gap-2 flex-wrap">
                  <h4 class="font-heading font-bold text-xs sm:text-sm text-neutral-900 dark:text-white truncate">
                    {{ doc.name }}
                  </h4>
                  <span
                    :class="[
                      'px-2 py-0.2 rounded-full text-[10px] font-bold border',
                      doc.status === 'VERIFIED'
                        ? 'bg-[#00AA13]/10 text-[#00AA13] dark:text-[#22C55E] border-[#00AA13]/20'
                        : 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20'
                    ]"
                  >
                    {{ doc.status === 'VERIFIED' ? 'Terverifikasi' : 'Dalam Peninjauan' }}
                  </span>
                </div>
                <p class="text-[11px] text-neutral-500 dark:text-neutral-400">
                  {{ doc.filename }} • {{ doc.fileSize }} • Diunggah {{ doc.uploadedAt }}
                </p>
              </div>
            </div>

            <!-- Right: Actions -->
            <div class="flex items-center gap-2 self-end sm:self-auto shrink-0">
              <button
                type="button"
                class="px-3 py-1.5 rounded-xl border border-neutral-200 dark:border-white/10 hover:bg-neutral-100 dark:hover:bg-neutral-800 text-xs font-semibold text-neutral-700 dark:text-neutral-200 transition-colors flex items-center gap-1.5 cursor-pointer"
                @click="previewDocument(doc)"
              >
                <HugeiconsIcon :icon="ViewIcon" :size="14" :stroke-width="1.8" />
                <span>Lihat Berkas</span>
              </button>
              <button
                type="button"
                class="w-8 h-8 rounded-xl flex items-center justify-center text-neutral-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 transition-all cursor-pointer"
                title="Hapus Dokumen"
                @click="removeDoc(doc)"
              >
                <HugeiconsIcon :icon="Delete02Icon" :size="15" :stroke-width="1.8" />
              </button>
            </div>
          </div>
        </div>

        <!-- Empty state for documents -->
        <div v-else class="p-8 text-center text-neutral-500 text-xs">
          Belum ada dokumen yang diunggah. Silakan unggah sertifikat atau portofoliomu.
        </div>
      </div>
    </div>

    <!-- 6. TOAST NOTIFICATION -->
    <Teleport to="body">
      <div
        v-if="toastMessage"
        class="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-4 py-3 rounded-2xl bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 shadow-2xl border border-neutral-700 dark:border-neutral-200 animate-in slide-in-from-bottom-5 duration-200"
      >
        <HugeiconsIcon :icon="CheckmarkCircle01Icon" :size="20" :stroke-width="2.5" class="text-[#00AA13]" />
        <span class="text-xs sm:text-sm font-semibold">{{ toastMessage }}</span>
      </div>
    </Teleport>

  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useKonsultanStore, type ConsultantDocument } from '~/stores/konsultan'
import { HugeiconsIcon } from '@hugeicons/vue'
import {
  UserCircleIcon,
  CheckmarkCircle01Icon,
  Award01Icon,
  Location01Icon,
  File01Icon,
  Upload01Icon,
  Delete02Icon,
  ViewIcon
} from '@hugeicons/core-free-icons'

definePageMeta({
  layout: 'dashboard'
})

const konsultanStore = useKonsultanStore()

const activeTab = ref<'personal' | 'documents'>('personal')
const toastMessage = ref('')

// Form State for Profile
const profileData = ref({
  name: konsultanStore.profile.name,
  title: konsultanStore.profile.title,
  email: konsultanStore.profile.email,
  phone: konsultanStore.profile.phone,
  firmName: konsultanStore.profile.firmName,
  specialization: konsultanStore.profile.specialization,
  experience: konsultanStore.profile.experience,
  bnspLicense: konsultanStore.profile.bnspLicense,
  city: konsultanStore.profile.city,
  bio: konsultanStore.profile.bio,
  maxClients: konsultanStore.profile.maxClients,
  avatar: konsultanStore.profile.avatar
})

// Form State for Upload Document
const newDocForm = ref({
  name: '',
  type: 'BNSP_CERT' as 'BNSP_CERT' | 'PORTOFOLIO' | 'KTP_NPWP' | 'OTHER'
})

const fileInputRef = ref<HTMLInputElement | null>(null)
const selectedFileName = ref('')
const selectedFileSize = ref('')

function triggerFileInput() {
  fileInputRef.value?.click()
}

function onFileSelected(e: Event) {
  const target = e.target as HTMLInputElement
  if (target.files && target.files[0]) {
    const file = target.files[0]
    selectedFileName.value = file.name
    selectedFileSize.value = `${(file.size / (1024 * 1024)).toFixed(1)} MB`
    if (!newDocForm.value.name) {
      newDocForm.value.name = file.name.replace(/\.[^/.]+$/, '')
    }
  }
}

function handleUploadDocument() {
  if (!selectedFileName.value) return

  konsultanStore.uploadDocument({
    name: newDocForm.value.name || selectedFileName.value,
    type: newDocForm.value.type,
    filename: selectedFileName.value,
    fileSize: selectedFileSize.value || '1.8 MB'
  })

  // Reset form
  newDocForm.value.name = ''
  selectedFileName.value = ''
  selectedFileSize.value = ''
  if (fileInputRef.value) fileInputRef.value.value = ''

  showToast('Dokumen berhasil diunggah dan disimpan!')
}

function removeDoc(doc: ConsultantDocument) {
  if (confirm(`Hapus dokumen "${doc.name}"?`)) {
    konsultanStore.removeDocument(doc.id)
    showToast('Dokumen berhasil dihapus')
  }
}

function previewDocument(doc: ConsultantDocument) {
  alert(`Membuka pratinjau berkas: ${doc.filename}\nStatus: ${doc.status === 'VERIFIED' ? 'Terverifikasi Resmi' : 'Sedang Ditinjau'}`)
}

function handleSaveProfile() {
  konsultanStore.updateProfile(profileData.value)
  showToast('Profil konsultan berhasil diperbarui!')
}

// Completeness Computation
const completenessScore = computed(() => {
  return konsultanStore.profileCompleteness
})

const checklistItems = computed(() => {
  const p = konsultanStore.profile
  return [
    { label: 'Data Diri & Gelar Lengkap', done: Boolean(p.name && p.title) },
    { label: 'Kontak WhatsApp & Email', done: Boolean(p.phone && p.email) },
    { label: 'Nomor Lisensi BNSP Resmi', done: Boolean(p.bnspLicense) },
    { label: 'Minimal 1 Dokumen Terunggah', done: p.documents.length >= 1 }
  ]
})

const completedChecklistCount = computed(() => {
  return checklistItems.value.filter(i => i.done).length
})

function showToast(msg: string) {
  toastMessage.value = msg
  setTimeout(() => {
    toastMessage.value = ''
  }, 3500)
}
</script>
