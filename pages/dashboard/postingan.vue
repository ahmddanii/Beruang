<template>
  <div ref="pageRootRef" class="space-y-6 sm:space-y-8 pb-16 font-poppins text-neutral-900 dark:text-neutral-100">
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
    <!-- 1. TOP PAGE HEADER: Title on Left & Buat Postingan Baru Button on Right   -->
    <!-- ========================================================================= -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 min-h-[44px]">
      <div class="flex items-center gap-2.5 sm:gap-3">
        <HugeiconsIcon
          :icon="Image01Icon"
          :size="26"
          :stroke-width="2.2"
          class="text-neutral-900 dark:text-white shrink-0"
        />
        <h1 class="font-poppins font-semibold text-2xl sm:text-3xl text-neutral-900 dark:text-white tracking-tight leading-tight">
          Postingan
        </h1>
      </div>

      <div class="flex items-center gap-2.5 shrink-0 w-full sm:w-auto [&>*]:w-full sm:[&>*]:w-auto">
        <BActionButton
          variant="green"
          icon="plus"
          :icon-size="16"
          custom-class="justify-center text-center"
          @click="openCreatePostModal"
        >
          Buat Postingan Baru
        </BActionButton>
      </div>
    </div>

    <!-- ========================================================================= -->
    <!-- 2. DAFTAR POSTINGAN YANG SUDAH DIBUAT (Horizontal Flow, Max 3 Columns)    -->
    <!-- ========================================================================= -->
    <main class="w-full space-y-4">
      <div class="flex items-center justify-between px-0.5">
        <h2 class="text-base sm:text-lg font-poppins font-semibold text-neutral-900 dark:text-white">
          Daftar Postingan yang Sudah Dibuat
        </h2>
        <span class="text-xs font-poppins font-medium text-neutral-500 dark:text-neutral-400 tabular-nums">
          {{ myUmkmPosts.length }} Postingan
        </span>
      </div>

      <!-- Empty State jika belum ada postingan -->
      <div
        v-if="myUmkmPosts.length === 0"
        class="card-tactile-gopay w-full rounded-[22px] border border-[#CBD5E1] dark:border-neutral-800 bg-[#FFFFFF] dark:bg-[#13161F] p-8 sm:p-12 text-center flex flex-col items-center justify-center space-y-4 !shadow-none"
      >
        <div class="w-16 h-16 rounded-2xl bg-[#F0FDF4] dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 flex items-center justify-center text-[#00AA13] dark:text-emerald-400 shadow-none">
          <HugeiconsIcon :icon="Image01Icon" :size="32" :stroke-width="1.8" />
        </div>
        <div class="max-w-md space-y-1.5">
          <h3 class="text-base sm:text-lg font-poppins font-bold text-neutral-900 dark:text-white">
            Belum Ada Postingan
          </h3>
          <p class="text-xs sm:text-sm font-poppins text-neutral-500 dark:text-neutral-400 leading-relaxed">
            Akun Anda belum memiliki postingan cerita usaha. Terbitkan postingan pertamamu agar profil usahamu dapat ditemukan dan dilihat oleh jejaring investor terverifikasi.
          </p>
        </div>
        <div class="pt-2">
          <BActionButton
            variant="green"
            icon="plus"
            :icon-size="16"
            @click="openCreatePostModal"
          >
            Buat Postingan Pertama
          </BActionButton>
        </div>
      </div>

      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
        <article
          v-for="post in myUmkmPosts"
          :key="post.id"
          class="card-tactile-gopay lazy-render-card w-full rounded-[22px] border border-[#CBD5E1] dark:border-neutral-800 bg-[#FFFFFF] dark:bg-[#13161F] font-poppins transition-all duration-300 hover:border-neutral-300 dark:hover:border-neutral-700 overflow-hidden flex flex-col justify-between !shadow-none"
        >
          <div class="p-5 sm:p-6 space-y-4 flex-1 flex flex-col">
            <!-- 1. Post Author Header -->
            <div class="flex items-start justify-between gap-4">
              <div class="flex items-center gap-3 sm:gap-3.5 min-w-0">
                <div class="w-12 h-12 sm:w-13 sm:h-13 rounded-full bg-amber-400/90 dark:bg-amber-500/90 p-2.5 shrink-0 flex items-center justify-center border border-amber-300/60 overflow-hidden shadow-none">
                  <img
                    :src="umkmStore.profile.ownerAvatarUrl || authStore.currentUser?.avatar || '/logo.svg'"
                    :alt="post.name"
                    class="w-full h-full object-contain rounded-full"
                  />
                </div>

                <div class="min-w-0 flex flex-col justify-center gap-0.5 sm:gap-1">
                  <div class="inline-flex items-center gap-1 text-xs font-poppins font-medium text-neutral-500 dark:text-neutral-400 leading-tight">
                    <HugeiconsIcon :icon="Location01Icon" :size="13" class="text-[#156374] dark:text-[#50AABF] shrink-0" />
                    <span>{{ post.city }}</span>
                  </div>

                  <h3 class="font-poppins font-bold text-base sm:text-lg text-neutral-900 dark:text-white truncate leading-tight">
                    {{ post.name }}
                  </h3>

                  <div class="inline-flex items-center gap-1.5 text-xs font-poppins text-neutral-500 dark:text-neutral-400 leading-tight">
                    <HugeiconsIcon :icon="Time02Icon" :size="13" class="text-neutral-400 dark:text-neutral-500 shrink-0" />
                    <span>{{ post.postedAt || 'Baru saja' }}</span>
                  </div>
                </div>
              </div>

              <!-- Right Actions: Share & Delete -->
              <div class="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  aria-label="Bagikan Tautan Postingan"
                  class="w-9 h-9 rounded-xl bg-white dark:bg-[#18191E] text-neutral-600 dark:text-neutral-300 border border-[#CBD5E1] dark:border-neutral-700 hover:bg-[#F8FAFC] dark:hover:bg-[#262626] hover:text-neutral-900 dark:hover:text-white transition-colors flex items-center justify-center cursor-pointer shadow-none"
                  title="Salin Tautan Postingan"
                  @click="copyPostShareLink(post)"
                >
                  <HugeiconsIcon :icon="Share08Icon" :size="16" :stroke-width="2" />
                </button>

                <button
                  type="button"
                  aria-label="Hapus Postingan"
                  class="w-9 h-9 rounded-xl bg-white dark:bg-[#18191E] text-neutral-500 hover:text-red-600 dark:text-neutral-400 dark:hover:text-red-400 border border-[#CBD5E1] dark:border-neutral-700 hover:border-red-300 dark:hover:border-red-800 transition-colors flex items-center justify-center cursor-pointer shadow-none"
                  title="Hapus Postingan Ini"
                  @click="handleDeletePost(post.id)"
                >
                  <HugeiconsIcon :icon="Delete02Icon" :size="16" :stroke-width="2" />
                </button>
              </div>
            </div>

            <!-- 2. Post Text -->
            <p class="text-[14px] sm:text-[15px] font-poppins text-neutral-700 dark:text-neutral-300 leading-relaxed line-clamp-3">
              "{{ post.pitchSummary }}"
            </p>

            <!-- 3. POST MEDIA CONTAINER (Proporsional 550:578 di dalam Grid 3 Kolom) -->
            <div
              class="relative w-full aspect-[550/578] mx-auto rounded-2xl overflow-hidden border border-[#E2E8F0] dark:border-neutral-800 bg-neutral-900 select-none shadow-none mt-auto"
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
                    class="w-full h-full object-cover object-center cursor-pointer"
                    @click="openFullscreenPreview(post, getSlideIndex(post.id))"
                  />
                </div>
              </div>

              <!-- Top-Left Slide Counter Pill -->
              <div
                v-if="getPostImages(post).length > 1"
                class="absolute top-3.5 left-3.5 z-20 px-2.5 py-1 rounded-full bg-neutral-950/75 text-white text-xs font-poppins font-semibold tabular-nums border border-white/15 backdrop-blur-xs pointer-events-none"
              >
                {{ getSlideIndex(post.id) + 1 }} / {{ getPostImages(post).length }}
              </div>

              <!-- Top-Right FullScreenIcon Button -->
              <button
                type="button"
                aria-label="Pratinjau Layar Penuh"
                title="Pratinjau Layar Penuh"
                class="absolute top-3.5 right-3.5 z-20 w-9 h-9 rounded-full bg-neutral-950/75 hover:bg-neutral-950 text-white border border-white/20 backdrop-blur-xs flex items-center justify-center transition-all duration-200 cursor-pointer shadow-none"
                @click.stop="openFullscreenPreview(post, getSlideIndex(post.id))"
              >
                <HugeiconsIcon :icon="FullScreenIcon" :size="17" :stroke-width="2.2" />
              </button>

              <!-- Before Button (inset-y-0 my-auto tanpa efek turun saat ditekan) -->
              <button
                v-if="getPostImages(post).length > 1 && getSlideIndex(post.id) > 0"
                type="button"
                aria-label="Slide Sebelumnya (Before)"
                title="Slide Sebelumnya"
                class="absolute left-3 inset-y-0 my-auto z-20 w-9 h-9 rounded-full bg-neutral-950/75 hover:bg-neutral-950 text-white border border-white/25 backdrop-blur-xs flex items-center justify-center transition-colors duration-200 cursor-pointer shadow-none"
                @click.stop="prevSlide(post)"
              >
                <HugeiconsIcon :icon="ArrowLeft01Icon" :size="18" :stroke-width="2.4" />
              </button>

              <!-- Next Button (inset-y-0 my-auto tanpa efek turun saat ditekan) -->
              <button
                v-if="getPostImages(post).length > 1 && getSlideIndex(post.id) < getPostImages(post).length - 1"
                type="button"
                aria-label="Slide Berikutnya (Next)"
                title="Slide Berikutnya"
                class="absolute right-3 inset-y-0 my-auto z-20 w-9 h-9 rounded-full bg-neutral-950/75 hover:bg-neutral-950 text-white border border-white/25 backdrop-blur-xs flex items-center justify-center transition-colors duration-200 cursor-pointer shadow-none"
                @click.stop="nextSlide(post)"
              >
                <HugeiconsIcon :icon="ArrowRight01Icon" :size="18" :stroke-width="2.4" />
              </button>

              <!-- Bottom Dot Indicators -->
              <div
                v-if="getPostImages(post).length > 1"
                class="absolute bottom-3.5 left-1/2 -translate-x-1/2 z-20 px-2.5 py-1.5 rounded-full bg-neutral-950/65 backdrop-blur-xs border border-white/15 flex items-center gap-1.5"
              >
                <button
                  v-for="(_, dIdx) in getPostImages(post)"
                  :key="`${post.id}-dot-${dIdx}`"
                  type="button"
                  :aria-label="`Pilih Slide ${dIdx + 1}`"
                  :class="[
                    'h-1.5 rounded-full transition-all duration-200 cursor-pointer',
                    getSlideIndex(post.id) === dIdx
                      ? 'w-4 bg-white'
                      : 'w-1.5 bg-white/50 hover:bg-white/80'
                  ]"
                  @click.stop="setSlideIndex(post.id, dIdx)"
                />
              </div>
            </div>
          </div>

          <!-- 4. Post Footer Row -->
          <div
            class="px-5 sm:px-6 py-4 bg-[#F8FAFC] dark:bg-neutral-900/50 border-t border-neutral-100 dark:border-neutral-800/80 flex items-center gap-3"
          >
            <div class="flex items-center gap-2 text-xs sm:text-[13px] min-w-0">
              <HugeiconsIcon
                :icon="Award01Icon"
                :size="16"
                class="text-[#156374] dark:text-[#50AABF] shrink-0"
              />
              <span class="text-neutral-600 dark:text-neutral-400 truncate">
                Didampingi oleh: <strong class="text-neutral-900 dark:text-white font-semibold">{{ post.consultantName }}</strong>
              </span>
            </div>
          </div>
        </article>
      </div>
    </main>

    <!-- ========================================================================= -->
    <!-- 3. MODAL BUAT POSTINGAN BARU (2-Step Centered Modal: Media -> Deskripsi)  -->
    <!-- ========================================================================= -->
    <Teleport to="body">
      <div
        v-if="isCreateModalOpen"
        class="fixed inset-0 z-50 bg-neutral-950/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200 font-poppins"
        role="dialog"
        aria-modal="true"
        aria-label="Buat Postingan Baru"
        @click.self="requestCloseCreateModal"
      >
        <div
          class="card-tactile-gopay relative w-full max-w-xl rounded-[22px] bg-[#FFFFFF] dark:bg-[#13161F] border border-[#CBD5E1] dark:border-neutral-800 overflow-hidden flex flex-col max-h-[90vh] !shadow-none"
        >
          <!-- Hidden File Input for Single or Multiple Images/Videos -->
          <input
            ref="postImageFileInputRef"
            type="file"
            accept="image/*,video/*"
            multiple
            class="hidden"
            @change="onPostImageFilesSelected"
          />

          <!-- Modal Header: Title + Animated Rotating Cancel01Icon Close Button -->
          <div class="px-5 sm:px-6 py-4 border-b border-[#E2E8F0] dark:border-neutral-800 flex items-center justify-between gap-3 shrink-0">
            <h2 class="text-base sm:text-lg font-poppins font-bold text-neutral-900 dark:text-white">
              {{ createStep === 1 ? 'Buat Postingan Baru' : 'Detail Postingan' }}
            </h2>

            <button
              type="button"
              aria-label="Tutup Modal Buat Postingan"
              title="Tutup"
              class="group w-9 h-9 rounded-full bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white flex items-center justify-center transition-colors duration-200 cursor-pointer shrink-0 shadow-none"
              @click="requestCloseCreateModal"
            >
              <HugeiconsIcon
                :icon="Cancel01Icon"
                :size="18"
                :stroke-width="2.2"
                class="transition-transform duration-300 ease-out group-hover:rotate-90 group-active:rotate-180"
              />
            </button>
          </div>

          <!-- =================================================================== -->
          <!-- STEP 1: PILIH GAMBAR / MEDIA & PRATINJAU LANGSUNG                   -->
          <!-- =================================================================== -->
          <div v-if="createStep === 1" class="p-5 sm:p-6 overflow-y-auto flex-1 space-y-5">
            <!-- State 1A: Belum ada gambar yang dipilih -->
            <div
              v-if="newPostForm.postImages.length === 0"
              class="py-12 px-6 rounded-2xl border-2 border-dashed border-[#CBD5E1] dark:border-neutral-700 bg-[#F8FAFC]/70 dark:bg-neutral-900/40 flex flex-col items-center justify-center text-center space-y-4"
            >
              <div class="w-16 h-16 rounded-2xl bg-[#E6F4F7] dark:bg-[#156374]/25 text-[#156374] dark:text-[#50AABF] flex items-center justify-center">
                <HugeiconsIcon :icon="Image01Icon" :size="32" :stroke-width="1.8" />
              </div>

              <div class="space-y-1.5 max-w-xs">
                <h3 class="text-base sm:text-lg font-poppins font-bold text-neutral-900 dark:text-white">
                  Pilih gambar anda
                </h3>
                <p class="text-xs sm:text-sm font-poppins text-neutral-500 dark:text-neutral-400 leading-relaxed">
                  Bagikan gambar atau video di postingan anda
                </p>
              </div>

              <div class="pt-1 flex flex-wrap items-center justify-center gap-2.5">
                <BActionButton
                  variant="green"
                  :huge-icon="Upload04Icon"
                  :icon-size="16"
                  @click="triggerPostImageUpload"
                >
                  Pilih Gambar
                </BActionButton>

                <button
                  type="button"
                  class="btn-pill-action text-xs cursor-pointer"
                  @click="addSampleImages"
                >
                  <span>Gunakan Contoh Foto</span>
                </button>
              </div>
            </div>

            <!-- State 1B: Sudah ada 1 atau banyak gambar (Preview Langsung + Tombol Tambah) -->
            <div v-else class="space-y-4">
              <!-- Main Selected Image Preview -->
              <div class="relative w-full h-72 sm:h-80 rounded-2xl overflow-hidden border border-[#CBD5E1] dark:border-neutral-800 bg-neutral-900 select-none">
                <img
                  :src="newPostForm.postImages[draftSlideIndex] || newPostForm.postImages[0]"
                  alt="Pratinjau Gambar Terpilih"
                  class="w-full h-full object-cover object-center"
                />

                <div class="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-neutral-950/75 text-white text-xs font-poppins font-semibold tabular-nums border border-white/15">
                  {{ draftSlideIndex + 1 }} / {{ newPostForm.postImages.length }}
                </div>
              </div>

              <!-- Strip Thumbnail Gambar + Tombol Tambah Gambar -->
              <div class="space-y-2">
                <div class="flex items-center justify-between text-xs font-poppins">
                  <span class="font-semibold text-neutral-700 dark:text-neutral-300">
                    Gambar Terpilih ({{ newPostForm.postImages.length }})
                  </span>
                  <span class="text-neutral-500 dark:text-neutral-400">
                    Klik + Tambah untuk memilih lebih banyak gambar
                  </span>
                </div>

                <div class="grid grid-cols-4 sm:grid-cols-5 gap-2.5">
                  <div
                    v-for="(img, idx) in newPostForm.postImages"
                    :key="`step1-thumb-${idx}`"
                    :class="[
                      'relative aspect-square rounded-xl overflow-hidden border-2 cursor-pointer transition-all bg-neutral-900',
                      draftSlideIndex === idx
                        ? 'border-[#00800e] dark:border-[#00C058]'
                        : 'border-[#CBD5E1] dark:border-neutral-700 opacity-80 hover:opacity-100'
                    ]"
                    @click="draftSlideIndex = idx"
                  >
                    <img :src="img" :alt="`Foto ${idx + 1}`" class="w-full h-full object-cover" />
                    <button
                      type="button"
                      aria-label="Hapus Gambar"
                      class="absolute top-1 right-1 w-5 h-5 rounded-full bg-neutral-950/85 hover:bg-red-600 text-white flex items-center justify-center transition-colors cursor-pointer"
                      @click.stop="removeDraftPostImage(idx)"
                    >
                      <HugeiconsIcon :icon="Cancel01Icon" :size="11" />
                    </button>
                  </div>

                  <!-- Tombol + Tambah Gambar -->
                  <button
                    type="button"
                    aria-label="Tambah Gambar Lagi"
                    class="aspect-square rounded-xl border-2 border-dashed border-[#CBD5E1] dark:border-neutral-700 hover:border-[#00800e] dark:hover:border-[#00C058] bg-[#F8FAFC] dark:bg-neutral-900/50 hover:bg-[#F6FCF7] dark:hover:bg-[#00800e]/10 flex flex-col items-center justify-center gap-1 text-neutral-600 hover:text-[#00800e] dark:text-neutral-300 dark:hover:text-[#00C058] transition-colors cursor-pointer"
                    @click="triggerPostImageUpload"
                  >
                    <HugeiconsIcon :icon="Add01Icon" :size="20" :stroke-width="2.2" />
                    <span class="text-[11px] font-poppins font-semibold">Tambah</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- Footer Step 1: Tombol Berikutnya -->
          <div
            v-if="createStep === 1"
            class="px-5 sm:px-6 py-4 border-t border-[#E2E8F0] dark:border-neutral-800 bg-[#F8FAFC] dark:bg-neutral-900/50 flex items-center justify-end gap-2.5 shrink-0"
          >
            <BActionButton
              variant="green"
              icon="chevron"
              :disabled="newPostForm.postImages.length === 0"
              @click="goToStep2"
            >
              Berikutnya
            </BActionButton>
          </div>

          <!-- =================================================================== -->
          <!-- STEP 2: PROFILE + NAMA UMKM, DESKRIPSI, & CAROUSEL GAMBAR           -->
          <!-- =================================================================== -->
          <div v-if="createStep === 2" class="p-5 sm:p-6 overflow-y-auto flex-1 space-y-4">
            <!-- 1. Paling Atas: Profile Image di Kiri & Nama UMKM di Kanan -->
            <div class="flex items-center gap-3">
              <div class="w-11 h-11 rounded-full bg-amber-400/90 dark:bg-amber-500/90 p-2 shrink-0 flex items-center justify-center border border-amber-300/60 overflow-hidden shadow-none">
                <img
                  :src="umkmStore.profile.ownerAvatarUrl || authStore.currentUser?.avatar || '/logo.svg'"
                  :alt="umkmName"
                  class="w-full h-full object-contain rounded-full"
                />
              </div>
              <div class="min-w-0">
                <h3 class="text-sm sm:text-base font-poppins font-bold text-neutral-900 dark:text-white truncate">
                  {{ umkmName }}
                </h3>
                <p class="text-xs font-poppins text-neutral-500 dark:text-neutral-400 truncate">
                  {{ umkmCity }}
                </p>
              </div>
            </div>

            <!-- 2. Container Mengisi Deskripsi Postingan (Placeholder: "Deskripsikan postingan anda") -->
            <div class="space-y-1.5">
              <textarea
                v-model="newPostForm.pitchSummary"
                rows="3"
                maxlength="350"
                class="input-tactile-gopay resize-none"
                placeholder="Deskripsikan postingan anda"
              />
              <div class="flex justify-end">
                <span class="text-[11px] font-poppins text-neutral-400 tabular-nums">
                  {{ newPostForm.pitchSummary.length }}/350
                </span>
              </div>
            </div>

            <!-- 3. Gambar-Gambar yang Dipilih Sebelumnya (Horizontal Carousel dengan Next & Before) -->
            <div
              v-if="newPostForm.postImages.length > 0"
              class="relative w-full h-72 sm:h-80 rounded-2xl overflow-hidden border border-[#CBD5E1] dark:border-neutral-800 bg-neutral-900 select-none shadow-none"
            >
              <div
                class="flex w-full h-full transition-transform duration-300 ease-out"
                :style="{ transform: `translateX(-${draftSlideIndex * 100}%)` }"
              >
                <div
                  v-for="(imgUrl, sIdx) in newPostForm.postImages"
                  :key="`step2-slide-${sIdx}`"
                  class="w-full h-full shrink-0 relative overflow-hidden bg-neutral-900"
                >
                  <img
                    :src="imgUrl"
                    :alt="`Pratinjau Postingan Slide ${sIdx + 1}`"
                    class="w-full h-full object-cover object-center"
                  />
                </div>
              </div>

              <!-- Slide Counter Pill -->
              <div
                v-if="newPostForm.postImages.length > 1"
                class="absolute top-3 left-3 z-20 px-2.5 py-1 rounded-full bg-neutral-950/75 text-white text-xs font-poppins font-semibold tabular-nums border border-white/15 backdrop-blur-xs pointer-events-none"
              >
                {{ draftSlideIndex + 1 }} / {{ newPostForm.postImages.length }}
              </div>

              <!-- Before Button (Horizontal Carousel) -->
              <button
                v-if="newPostForm.postImages.length > 1 && draftSlideIndex > 0"
                type="button"
                aria-label="Gambar Sebelumnya (Before)"
                title="Sebelumnya"
                class="absolute left-3 inset-y-0 my-auto z-20 w-9 h-9 rounded-full bg-neutral-950/75 hover:bg-neutral-950 text-white border border-white/25 backdrop-blur-xs flex items-center justify-center transition-colors duration-200 cursor-pointer shadow-none"
                @click.stop="prevDraftSlide"
              >
                <HugeiconsIcon :icon="ArrowLeft01Icon" :size="18" :stroke-width="2.4" />
              </button>

              <!-- Next Button (Horizontal Carousel) -->
              <button
                v-if="newPostForm.postImages.length > 1 && draftSlideIndex < newPostForm.postImages.length - 1"
                type="button"
                aria-label="Gambar Berikutnya (Next)"
                title="Berikutnya"
                class="absolute right-3 inset-y-0 my-auto z-20 w-9 h-9 rounded-full bg-neutral-950/75 hover:bg-neutral-950 text-white border border-white/25 backdrop-blur-xs flex items-center justify-center transition-colors duration-200 cursor-pointer shadow-none"
                @click.stop="nextDraftSlide"
              >
                <HugeiconsIcon :icon="ArrowRight01Icon" :size="18" :stroke-width="2.4" />
              </button>

              <!-- Bottom Dot Indicators -->
              <div
                v-if="newPostForm.postImages.length > 1"
                class="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 px-2.5 py-1.5 rounded-full bg-neutral-950/65 backdrop-blur-xs border border-white/15 flex items-center gap-1.5"
              >
                <button
                  v-for="(_, dIdx) in newPostForm.postImages"
                  :key="`draft-dot-${dIdx}`"
                  type="button"
                  :class="[
                    'h-1.5 rounded-full transition-all duration-200 cursor-pointer',
                    draftSlideIndex === dIdx ? 'w-4 bg-white' : 'w-1.5 bg-white/50 hover:bg-white/80'
                  ]"
                  @click.stop="draftSlideIndex = dIdx"
                />
              </div>
            </div>
          </div>

          <!-- Footer Step 2: Kembali & Terbitkan Postingan -->
          <div
            v-if="createStep === 2"
            class="px-5 sm:px-6 py-4 border-t border-[#E2E8F0] dark:border-neutral-800 bg-[#F8FAFC] dark:bg-neutral-900/50 flex items-center justify-between gap-2.5 shrink-0"
          >
            <button
              type="button"
              class="btn-pill-action cursor-pointer"
              @click="createStep = 1"
            >
              <HugeiconsIcon :icon="ArrowLeft01Icon" :size="15" :stroke-width="2.2" />
              <span>Kembali</span>
            </button>

            <BActionButton
              variant="green"
              icon="plus"
              :disabled="!newPostForm.pitchSummary.trim() || newPostForm.postImages.length === 0"
              @click="handleCreateUmkmPost"
            >
              Terbitkan Postingan
            </BActionButton>
          </div>
        </div>
      </div>
    </Teleport>

    <!-- ========================================================================= -->
    <!-- 4. MODAL KONFIRMASI KELUAR SAAT DRAFT SUDAH TERISI (Lanjutkan / Keluar)   -->
    <!-- ========================================================================= -->
    <Teleport to="body">
      <div
        v-if="isDiscardConfirmOpen"
        class="fixed inset-0 z-[70] bg-neutral-950/65 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-150 font-poppins"
        role="dialog"
        aria-modal="true"
        aria-label="Konfirmasi Keluar dari Pembuatan Postingan"
        @click.self="cancelDiscardDraft"
      >
        <div
          class="card-tactile-gopay w-full max-w-md rounded-[22px] bg-[#FFFFFF] dark:bg-[#13161F] border border-[#CBD5E1] dark:border-neutral-800 p-6 space-y-5 !shadow-none"
        >
          <div class="flex items-start justify-between gap-3">
            <div class="space-y-1.5">
              <h3 class="text-base sm:text-lg font-poppins font-bold text-neutral-900 dark:text-white">
                Keluar dari pembuatan postingan?
              </h3>
              <p class="text-xs sm:text-sm font-poppins text-neutral-500 dark:text-neutral-400 leading-relaxed">
                Gambar atau deskripsi yang sudah Anda isi akan hilang jika Anda keluar sekarang.
              </p>
            </div>

            <button
              type="button"
              aria-label="Tutup Konfirmasi"
              class="group w-8 h-8 rounded-full bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-600 dark:text-neutral-300 flex items-center justify-center transition-colors cursor-pointer shrink-0 shadow-none"
              @click="cancelDiscardDraft"
            >
              <HugeiconsIcon
                :icon="Cancel01Icon"
                :size="16"
                :stroke-width="2.2"
                class="transition-transform duration-300 ease-out group-hover:rotate-90"
              />
            </button>
          </div>

          <div class="flex items-center justify-end gap-2.5 pt-2 border-t border-[#E2E8F0] dark:border-neutral-800">
            <button
              type="button"
              class="btn-pill-action cursor-pointer"
              @click="cancelDiscardDraft"
            >
              <span>Lanjutkan</span>
            </button>

            <BActionButton
              variant="red"
              icon="none"
              @click="confirmDiscardDraft"
            >
              Keluar
            </BActionButton>
          </div>
        </div>
      </div>
    </Teleport>

    <!-- ========================================================================= -->
    <!-- 5. FULL SCREEN PREVIEW MODAL (FullScreenIcon & Cancel01Icon Berputar)     -->
    <!-- ========================================================================= -->
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
            :alt="`${fullscreenPost.name} - Pratinjau Penuh ${fullscreenSlideIndex + 1}`"
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
import { ref, reactive, computed, onMounted, onBeforeUnmount, nextTick } from 'vue'
import { gsap } from 'gsap'
import { useAuthStore } from '~/stores/auth'
import { useUmkmStore } from '~/stores/umkm'
import { useInvestorStore, type MarketplaceUmkm } from '~/stores/investor'
import BActionButton from '~/components/base/BActionButton.vue'
import { HugeiconsIcon } from '@hugeicons/vue'
import {
  Image01Icon,
  Add01Icon,
  CheckmarkCircle01Icon,
  Upload04Icon,
  Delete02Icon,
  Share08Icon,
  Location01Icon,
  Time02Icon,
  Award01Icon,
  ArrowLeft01Icon,
  ArrowRight01Icon,
  Cancel01Icon,
  FullScreenIcon
} from '@hugeicons/core-free-icons'

definePageMeta({
  layout: 'dashboard',
  hideHeader: true
})

const authStore = useAuthStore()
const umkmStore = useUmkmStore()
const investorStore = useInvestorStore()

const isDemoUser = computed(() => {
  const email = authStore.currentUser?.email?.toLowerCase() || ''
  return email === 'fikri@kopisenja.id' || authStore.isDemoUser
})

const umkmName = computed(() => {
  return umkmStore.profile.name || authStore.currentUser?.businessName || (isDemoUser.value ? 'Kopi Senja Nusantara' : 'Usaha Saya')
})

const umkmCity = computed(() => {
  const c = umkmStore.profile.city || (isDemoUser.value ? 'Bandung' : '')
  return c ? c.split(',')[0]!.trim() : 'Kota'
})

// Toast Feedback
const toastMessage = ref('')
let toastTimer: any = null

function triggerToast(msg: string) {
  toastMessage.value = msg
  if (toastTimer) clearTimeout(toastTimer)
  toastTimer = setTimeout(() => {
    toastMessage.value = ''
  }, 2800)
}

// 2-Step Create Post Modal State
const isCreateModalOpen = ref(false)
const isDiscardConfirmOpen = ref(false)
const createStep = ref<1 | 2>(1)
const draftSlideIndex = ref(0)
const postImageFileInputRef = ref<HTMLInputElement | null>(null)

const newPostForm = reactive({
  pitchSummary: '',
  postImages: [] as string[]
})

const hasDraftContent = computed(() => {
  return newPostForm.postImages.length > 0 || newPostForm.pitchSummary.trim().length > 0
})

function openCreatePostModal() {
  createStep.value = 1
  draftSlideIndex.value = 0
  isDiscardConfirmOpen.value = false
  isCreateModalOpen.value = true
}

function requestCloseCreateModal() {
  if (hasDraftContent.value) {
    isDiscardConfirmOpen.value = true
  } else {
    isCreateModalOpen.value = false
  }
}

function cancelDiscardDraft() {
  isDiscardConfirmOpen.value = false
}

function confirmDiscardDraft() {
  isDiscardConfirmOpen.value = false
  isCreateModalOpen.value = false
  newPostForm.pitchSummary = ''
  newPostForm.postImages = []
  createStep.value = 1
  draftSlideIndex.value = 0
}

function goToStep2() {
  if (newPostForm.postImages.length === 0) return
  draftSlideIndex.value = 0
  createStep.value = 2
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
        draftSlideIndex.value = newPostForm.postImages.length - 1
      }
    }
    reader.readAsDataURL(file)
  })
}

function addSampleImages() {
  newPostForm.postImages.push(
    'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=900&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=900&auto=format&fit=crop&q=80'
  )
  draftSlideIndex.value = 0
}

function removeDraftPostImage(idx: number) {
  newPostForm.postImages.splice(idx, 1)
  if (draftSlideIndex.value >= newPostForm.postImages.length) {
    draftSlideIndex.value = Math.max(0, newPostForm.postImages.length - 1)
  }
}

function nextDraftSlide() {
  if (draftSlideIndex.value < newPostForm.postImages.length - 1) {
    draftSlideIndex.value += 1
  }
}

function prevDraftSlide() {
  if (draftSlideIndex.value > 0) {
    draftSlideIndex.value -= 1
  }
}

function handleCreateUmkmPost() {
  if (!newPostForm.pitchSummary.trim() || newPostForm.postImages.length === 0) return

  const currentUserId = authStore.currentUser?.id
  const currentEmail = authStore.currentUser?.email

  investorStore.createUmkmPost({
    umkmRefId: currentUserId || (isDemoUser.value ? 'umkm-01' : 'umkm-user'),
    authorUserId: currentUserId,
    authorEmail: currentEmail,
    name: umkmName.value,
    city: umkmCity.value,
    sector: umkmStore.profile.sector || (isDemoUser.value ? 'Kuliner & Minuman (F&B)' : 'Sektor Usaha'),
    establishedYear: umkmStore.profile.establishedYear || new Date().getFullYear(),
    fundingTarget: umkmStore.profile.fundingTarget || 0,
    consultantName: umkmStore.profile.consultantName || (isDemoUser.value ? 'Dra. Maya Suryani, M.M.' : 'Belum Ditugaskan'),
    pitchSummary: newPostForm.pitchSummary.trim(),
    postImages: [...newPostForm.postImages]
  })

  newPostForm.pitchSummary = ''
  newPostForm.postImages = []
  createStep.value = 1
  draftSlideIndex.value = 0
  isCreateModalOpen.value = false
  isDiscardConfirmOpen.value = false
  triggerToast('Postingan berhasil diterbitkan!')
}

function handleDeletePost(postId: string) {
  investorStore.deleteUmkmPost(postId)
  triggerToast('Postingan berhasil dihapus.')
}

const myUmkmPosts = computed<MarketplaceUmkm[]>(() => {
  const currentUserId = authStore.currentUser?.id
  const currentEmail = authStore.currentUser?.email?.toLowerCase()
  const currentBizName = (umkmStore.profile.name || authStore.currentUser?.businessName || '').toLowerCase().trim()

  return investorStore.marketplaceList
    .filter(m => {
      // 1. Akun demo Fikri Setiawan (Kopi Senja)
      if (currentEmail === 'fikri@kopisenja.id') {
        return (
          m.id === 'umkm-01' ||
          m.umkmRefId === 'umkm-01' ||
          (currentBizName && m.name.toLowerCase().trim() === currentBizName)
        )
      }

      // 2. Akun non-demo (pengguna baru/riil):
      // JANGAN PERNAH menyertakan postingan demo bawaan Kopi Senja (umkm-01)
      if (m.id === 'umkm-01' || (m.umkmRefId === 'umkm-01' && !m.authorUserId)) {
        return false
      }

      // Tampilkan jika dibuat oleh pengguna ini (cocokkan userId / email)
      if (m.authorUserId && currentUserId && m.authorUserId === currentUserId) {
        return true
      }
      if (m.authorEmail && currentEmail && m.authorEmail === currentEmail) {
        return true
      }

      // Postingan custom yang baru dibuat untuk usaha ini
      if (m.isCustomPost && currentBizName && m.name.toLowerCase().trim() === currentBizName) {
        return true
      }

      return false
    })
    .slice()
    .reverse()
})

// Carousel Navigation per Post
const activeSlides = ref<Record<string, number>>({})

function getPostImages(post: MarketplaceUmkm): string[] {
  if (post.postImages && post.postImages.length > 0) {
    return post.postImages
  }
  return [post.postImageUrl || 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=900&auto=format&fit=crop&q=80']
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
  if (cur < imgs.length - 1) {
    activeSlides.value[post.id] = cur + 1
  }
}

function prevSlide(post: MarketplaceUmkm) {
  const cur = getSlideIndex(post.id)
  if (cur > 0) {
    activeSlides.value[post.id] = cur - 1
  }
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

function copyPostShareLink(post: MarketplaceUmkm) {
  if (import.meta.client && navigator.clipboard) {
    const url = `${window.location.origin}/investor/umkm/${post.umkmRefId || post.id}`
    navigator.clipboard.writeText(url)
    triggerToast('Tautan postingan berhasil disalin!')
  }
}

const pageRootRef = ref<HTMLElement | null>(null)
let gsapCtx: gsap.Context | null = null

onMounted(() => {
  umkmStore.initBannerFromStorage()
  umkmStore.initAvatarFromStorage()
  umkmStore.initQuickProfileFromStorage()
  investorStore.initPostsFromStorage()

  if (import.meta.client && pageRootRef.value && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    nextTick(() => {
      gsapCtx = gsap.context(() => {
        gsap.from('.card-tactile-gopay', {
          opacity: 0,
          y: 14,
          duration: 0.4,
          stagger: 0.05,
          ease: 'power2.out',
          clearProps: 'all'
        })
      }, pageRootRef.value!)
    })
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

.dark .input-tactile-gopay,
:deep(.dark .input-tactile-gopay),
:deep(.dark) .input-tactile-gopay,
html.dark .input-tactile-gopay {
  border-color: #334155 !important;
  background-color: #161922 !important;
  color: #F8FAFC !important;
}
</style>
