<template>
  <!-- Outer Wrapper (Allows Circular Profile Avatar to Overlap Bottom Edge) -->
  <div class="relative w-full mb-16 sm:mb-20 md:mb-24 select-none">
    <!-- Hidden File Input for Banner Image Selection -->
    <input
      ref="fileInputRef"
      type="file"
      accept="image/png,image/jpeg,image/webp,image/gif"
      class="hidden"
      @change="onFileSelected"
    />

    <!-- Hidden File Input for Profile Avatar Image Selection -->
    <input
      ref="avatarFileInputRef"
      type="file"
      accept="image/png,image/jpeg,image/webp,image/gif"
      class="hidden"
      @change="onAvatarFileSelected"
    />

    <!-- 1. Background Banner Image Box (with Overflow-Hidden & Rounded Corners) -->
    <div
      class="relative group/banner w-full h-52 sm:h-64 md:h-72 lg:h-80 xl:h-[340px] bg-neutral-900 rounded-2xl sm:rounded-3xl overflow-hidden border border-neutral-200/90 dark:border-neutral-800 shadow-xs transition-all duration-300"
      :class="[
        isDragging ? 'ring-2 ring-primary-500 ring-offset-2' : ''
      ]"
      @dragover.prevent="onDragOver"
      @dragleave.prevent="onDragLeave"
      @drop.prevent="onDrop"
    >
      <!-- Banner Image (If present) -->
      <img
        v-if="currentBannerUrl"
        :src="currentBannerUrl"
        :alt="`Banner Toko ${storeName}`"
        class="w-full h-full object-cover object-center transition-transform duration-500 ease-out group-hover/banner:scale-105"
        @error="handleImageError"
      />
      <!-- Default Empty Banner State (Clean aesthetic pattern with camera icon & prompt) -->
      <div
        v-else
        class="w-full h-full bg-gradient-to-br from-[#1E293B] via-[#0F172A] to-[#090D16] flex flex-col items-center justify-center text-slate-300 select-none relative"
      >
        <div class="absolute inset-0 opacity-[0.06] bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />
        <div class="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-2.5 shadow-inner">
          <HugeiconsIcon :icon="Camera01Icon" :size="28" class="text-slate-300" />
        </div>
        <p class="font-poppins font-semibold text-xs sm:text-sm text-slate-200">Belum Ada Sampul Toko</p>
        <p class="text-[11px] text-slate-400 font-sans mt-0.5">Unggah foto gerai atau produk untuk melengkapi profil tokomu</p>
      </div>

      <!-- Dual Gradient Vignette (Preserves Contrast for Header Elements) -->
      <div v-if="currentBannerUrl" class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/20 pointer-events-none" />
      <div v-if="currentBannerUrl" class="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-black/30 pointer-events-none" />

      <!-- Drag & Drop Active Overlay for Banner -->
      <div
        v-if="isDragging"
        class="absolute inset-0 z-30 bg-primary-950/85 backdrop-blur-xs border-2 border-dashed border-primary-400 flex flex-col items-center justify-center text-white transition-opacity duration-200 pointer-events-none"
      >
        <div class="w-12 h-12 rounded-2xl bg-primary-500/30 border border-primary-400/50 flex items-center justify-center mb-2">
          <HugeiconsIcon :icon="Camera01Icon" :size="24" class="text-white" />
        </div>
        <p class="font-heading font-semibold text-base sm:text-lg">Lepaskan Gambar di Sini</p>
        <p class="text-xs sm:text-sm text-neutral-300 font-sans mt-0.5">Format PNG, JPG, atau WebP (Maks. 5 MB)</p>
      </div>

      <!-- Toast Feedback (Updated Success Pill) -->
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
          class="absolute top-4 left-1/2 -translate-x-1/2 z-40 px-3.5 py-1.5 rounded-full bg-emerald-900/90 text-emerald-200 border border-emerald-500/50 backdrop-blur-md text-xs font-heading font-semibold shadow-lg flex items-center gap-1.5 pointer-events-none"
        >
          <HugeiconsIcon :icon="CheckmarkBadge01Icon" :size="15" class="text-emerald-400" />
          <span>{{ toastMessage }}</span>
        </div>
      </Transition>

      <!-- 2. Top-Right Action: Dedicated Action Button & Dropdown Menu -->
      <div class="absolute top-3 sm:top-4 right-3 sm:right-5 z-20 pointer-events-auto">
        <div ref="menuRef" class="relative">
          <!-- Dedicated Action Trigger Button with Camera Icon & Label -->
          <button
            type="button"
            class="inline-flex items-center gap-2 px-3.5 py-2 sm:px-4 sm:py-2 rounded-xl bg-black/60 hover:bg-black/80 text-white backdrop-blur-md border border-white/30 text-xs sm:text-sm font-poppins font-medium transition-all duration-150 cursor-pointer shadow-md hover:shadow-lg select-none"
            aria-label="Kelola Sampul Toko"
            title="Kelola & Ganti Sampul Toko"
            @click.stop="toggleMenu"
          >
            <HugeiconsIcon
              :icon="Camera01Icon"
              :size="16"
              :stroke-width="2"
            />
            <span class="font-poppins font-semibold">{{ currentBannerUrl ? 'Ubah Sampul' : 'Tambah Sampul' }}</span>
            <svg
              class="w-3.5 h-3.5 text-white/80 transition-transform duration-200 shrink-0"
              :class="{ 'rotate-180': isMenuOpen }"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2.2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="m6 9 6 6 6-6" />
            </svg>
          </button>

          <!-- Dropdown Menu for Banner -->
          <Transition
            enter-active-class="transition duration-150 ease-out"
            enter-from-class="opacity-0 scale-95 -translate-y-1"
            enter-to-class="opacity-100 scale-100 translate-y-0"
            leave-active-class="transition duration-100 ease-in"
            leave-from-class="opacity-100 scale-100 translate-y-0"
            leave-to-class="opacity-0 scale-95 -translate-y-1"
          >
            <div
              v-if="isMenuOpen"
              class="absolute right-0 top-full mt-2 w-48 sm:w-52 rounded-2xl bg-white/95 dark:bg-[#18191E]/95 backdrop-blur-xl border border-neutral-200/90 dark:border-neutral-800 shadow-xl p-1.5 z-50 text-neutral-800 dark:text-neutral-200 text-xs sm:text-sm font-sans"
              @click.stop
            >
              <!-- Option 1: Unggah / Ganti Banner -->
              <button
                type="button"
                class="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-left hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-800 dark:text-neutral-100 transition-colors cursor-pointer group"
                @click="onSelectChangeBanner"
              >
                <div class="w-6 h-6 rounded-lg bg-primary-50 dark:bg-primary-950/60 text-primary-600 dark:text-primary-400 flex items-center justify-center shrink-0">
                  <HugeiconsIcon :icon="Camera01Icon" :size="14" :stroke-width="2" />
                </div>
                <div class="flex-1">
                  <span class="font-heading font-medium block">{{ currentBannerUrl ? 'Ganti Banner' : 'Unggah Banner' }}</span>
                </div>
              </button>

              <template v-if="currentBannerUrl">
                <!-- Option 2: Atur Ulang Banner -->
                <button
                  type="button"
                  class="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-left hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-800 dark:text-neutral-100 transition-colors cursor-pointer group"
                  @click="onSelectCropBanner"
                >
                  <div class="w-6 h-6 rounded-lg bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
                    <HugeiconsIcon :icon="CropIcon" :size="14" :stroke-width="2" />
                  </div>
                  <div class="flex-1">
                    <span class="font-heading font-medium block">Atur Ulang Banner</span>
                  </div>
                </button>

                <!-- Option 3: Lihat Foto Penuh -->
                <button
                  type="button"
                  class="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-left hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-800 dark:text-neutral-100 transition-colors cursor-pointer group"
                  @click="onSelectViewFullBanner"
                >
                  <div class="w-6 h-6 rounded-lg bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 flex items-center justify-center shrink-0">
                    <HugeiconsIcon :icon="EyeIcon" :size="14" :stroke-width="2" />
                  </div>
                  <div class="flex-1">
                    <span class="font-heading font-medium block">Lihat Foto Penuh</span>
                  </div>
                </button>

                <!-- Divider -->
                <div class="my-1 border-t border-neutral-100 dark:border-neutral-800/80" />

                <!-- Option 4: Hapus Banner -->
                <button
                  type="button"
                  class="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-left hover:bg-rose-50 dark:hover:bg-rose-950/50 text-rose-600 dark:text-rose-400 transition-colors cursor-pointer group"
                  @click="onSelectResetBanner"
                >
                  <div class="w-6 h-6 rounded-lg bg-rose-100/70 dark:bg-rose-900/50 text-rose-600 dark:text-rose-400 flex items-center justify-center shrink-0">
                    <HugeiconsIcon :icon="Delete02Icon" :size="14" :stroke-width="2" />
                  </div>
                  <div class="flex-1">
                    <span class="font-heading font-medium block">Hapus Sampul</span>
                  </div>
                </button>
              </template>
            </div>
          </Transition>
        </div>
      </div>
    </div>

    <!-- 3. User Profile Avatar Circle (Interactive: Ganti Foto, Atur Ulang Crop, & Lihat Penuh) -->
    <div
      ref="avatarContainerRef"
      class="absolute -bottom-14 sm:-bottom-18 md:-bottom-20 lg:-bottom-22 left-6 sm:left-10 md:left-12 lg:left-14 z-20 pointer-events-auto"
    >
      <div class="relative group/avatar">
        <!-- Main Circular Avatar with Drag & Drop, Hover State, and Click Action -->
        <div
          class="relative w-28 h-28 sm:w-36 sm:h-36 md:w-40 md:h-40 lg:w-44 lg:h-44 rounded-full border-4 sm:border-[5px] border-white dark:border-[#0F1014] bg-neutral-100 dark:bg-[#18191E] overflow-hidden flex items-center justify-center cursor-pointer select-none transition-all duration-200 shadow-md"
          :class="[
            isAvatarDragging ? 'ring-4 ring-primary-500 ring-offset-2' : ''
          ]"
          title="Klik untuk opsi foto profil"
          @dragover.prevent="onAvatarDragOver"
          @dragleave.prevent="onAvatarDragLeave"
          @drop.prevent="onAvatarDrop"
          @click="toggleAvatarMenu"
        >
          <!-- If avatar exists -->
          <img
            v-if="currentOwnerAvatarUrl"
            :src="currentOwnerAvatarUrl"
            :alt="`Foto Profil ${ownerName}`"
            class="w-full h-full object-cover object-center transition-transform duration-300 group-hover/avatar:scale-105"
            @error="handleAvatarError"
          />

          <!-- Default Empty Avatar: Initials with high aesthetic dark slate & cyan accent -->
          <div
            v-else
            class="w-full h-full bg-gradient-to-br from-[#1E293B] via-[#0F172A] to-[#0A0E1A] flex flex-col items-center justify-center text-white select-none relative"
          >
            <div class="absolute inset-0 opacity-[0.08] bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:12px_12px] pointer-events-none" />
            <span class="font-poppins font-bold text-2xl sm:text-3xl md:text-4xl text-[#50AABF] dark:text-[#50AABF] tracking-tight">
              {{ ownerInitials }}
            </span>
          </div>

          <!-- Hover Overlay with Camera Icon -->
          <div class="absolute inset-0 bg-black/50 backdrop-blur-[1px] opacity-0 group-hover/avatar:opacity-100 transition-opacity duration-200 flex flex-col items-center justify-center text-white gap-1 pointer-events-none">
            <HugeiconsIcon :icon="Camera01Icon" :size="24" :stroke-width="2" />
            <span class="text-[10px] sm:text-xs font-heading font-medium tracking-wide">
              {{ currentOwnerAvatarUrl ? 'Ubah Foto' : 'Tambah Foto' }}
            </span>
          </div>

          <!-- Drag & Drop Active Overlay on Avatar -->
          <div
            v-if="isAvatarDragging"
            class="absolute inset-0 bg-primary-950/85 backdrop-blur-xs flex flex-col items-center justify-center text-white pointer-events-none text-center p-2"
          >
            <HugeiconsIcon :icon="Camera01Icon" :size="24" class="text-white mb-1" />
            <span class="text-[10px] font-heading font-semibold">Lepas Foto</span>
          </div>
        </div>

        <!-- Floating Circular Camera Badge Button (bottom-right of avatar) -->
        <button
          type="button"
          class="absolute bottom-1 right-1 sm:bottom-2 sm:right-2 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white dark:bg-[#1E2026] text-neutral-700 dark:text-neutral-200 shadow-md hover:shadow-lg border border-neutral-200/90 dark:border-neutral-700 flex items-center justify-center hover:bg-neutral-100 dark:hover:bg-neutral-800 hover:text-primary-600 dark:hover:text-primary-400 transition-all cursor-pointer z-10"
          aria-label="Opsi Foto Profil"
          title="Opsi Foto Profil"
          @click.stop="toggleAvatarMenu"
        >
          <HugeiconsIcon :icon="Camera01Icon" :size="16" :stroke-width="2" />
        </button>

        <!-- Dropdown Menu for Avatar -->
        <Transition
          enter-active-class="transition duration-150 ease-out"
          enter-from-class="opacity-0 scale-95 -translate-y-1"
          enter-to-class="opacity-100 scale-100 translate-y-0"
          leave-active-class="transition duration-100 ease-in"
          leave-from-class="opacity-100 scale-100 translate-y-0"
          leave-to-class="opacity-0 scale-95 -translate-y-1"
        >
          <div
            v-if="isAvatarMenuOpen"
            class="absolute left-0 sm:left-4 top-full mt-2.5 w-52 sm:w-56 rounded-2xl bg-white dark:bg-[#16171C] border border-neutral-200 dark:border-neutral-800 shadow-2xl p-1.5 z-50 text-neutral-800 dark:text-neutral-200 text-xs sm:text-sm font-sans ring-1 ring-black/5"
            @click.stop
          >
            <!-- Option 1: Unggah / Ganti Foto Profil -->
            <button
              type="button"
              class="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-left hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-800 dark:text-neutral-100 transition-colors cursor-pointer group"
              @click="onSelectChangeAvatar"
            >
              <div class="w-6 h-6 rounded-lg bg-primary-50 dark:bg-primary-950/60 text-primary-600 dark:text-primary-400 flex items-center justify-center shrink-0">
                <HugeiconsIcon :icon="Camera01Icon" :size="14" :stroke-width="2" />
              </div>
              <div class="flex-1">
                <span class="font-heading font-medium block">
                  {{ currentOwnerAvatarUrl ? 'Ganti Foto Profil' : 'Unggah Foto Profil' }}
                </span>
              </div>
            </button>

            <template v-if="currentOwnerAvatarUrl">
              <!-- Option 2: Atur Ulang Foto Profil -->
              <button
                type="button"
                class="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-left hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-800 dark:text-neutral-100 transition-colors cursor-pointer group"
                @click="onSelectCropAvatar"
              >
                <div class="w-6 h-6 rounded-lg bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
                  <HugeiconsIcon :icon="CropIcon" :size="14" :stroke-width="2" />
                </div>
                <div class="flex-1">
                  <span class="font-heading font-medium block">Atur Ulang Foto</span>
                </div>
              </button>

              <!-- Option 3: Lihat Foto Penuh -->
              <button
                type="button"
                class="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-left hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-800 dark:text-neutral-100 transition-colors cursor-pointer group"
                @click="onSelectViewFullAvatar"
              >
                <div class="w-6 h-6 rounded-lg bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 flex items-center justify-center shrink-0">
                  <HugeiconsIcon :icon="EyeIcon" :size="14" :stroke-width="2" />
                </div>
                <div class="flex-1">
                  <span class="font-heading font-medium block">Lihat Foto Penuh</span>
                </div>
              </button>

              <!-- Divider -->
              <div class="my-1 border-t border-neutral-100 dark:border-neutral-800/80" />

              <!-- Option 4: Hapus Foto Profil -->
              <button
                type="button"
                class="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-left hover:bg-rose-50 dark:hover:bg-rose-950/50 text-rose-600 dark:text-rose-400 transition-colors cursor-pointer group"
                @click="onSelectResetAvatar"
              >
                <div class="w-6 h-6 rounded-lg bg-rose-100/70 dark:bg-rose-900/50 text-rose-600 dark:text-rose-400 flex items-center justify-center shrink-0">
                  <HugeiconsIcon :icon="Delete02Icon" :size="14" :stroke-width="2" />
                </div>
                <div class="flex-1">
                  <span class="font-heading font-medium block">Hapus Foto Profil</span>
                </div>
              </button>
            </template>
          </div>
        </Transition>
      </div>
    </div>

    <!-- 4. Interactive Cropper Modal (Mendukung Banner 16:5 dan Profil 1:1) -->
    <Teleport to="body">
      <Transition
        enter-active-class="transition duration-200 ease-out"
        enter-from-class="opacity-0 scale-95"
        enter-to-class="opacity-100 scale-100"
        leave-active-class="transition duration-150 ease-in"
        leave-from-class="opacity-100 scale-100"
        leave-to-class="opacity-0 scale-95"
      >
        <div
          v-if="isCropping"
          class="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
          @click.self="cancelCrop"
        >
          <div
            class="relative max-w-3xl w-full bg-white dark:bg-[#16171C] border border-neutral-200 dark:border-neutral-800 rounded-3xl shadow-2xl p-5 sm:p-6 flex flex-col gap-4 text-neutral-900 dark:text-white"
            @click.stop
          >
            <!-- Modal Header -->
            <div class="flex items-center justify-between pb-3 border-b border-neutral-100 dark:border-neutral-800">
              <div class="flex items-center gap-2.5">
                <div class="w-8 h-8 rounded-xl bg-primary-50 dark:bg-primary-950/60 text-primary-600 dark:text-primary-400 flex items-center justify-center">
                  <HugeiconsIcon :icon="CropIcon" :size="18" />
                </div>
                <div>
                  <h3 class="font-heading font-semibold text-base sm:text-lg text-neutral-900 dark:text-white leading-tight">
                    {{ cropTarget === 'banner' ? 'Sesuaikan & Potong Banner' : 'Sesuaikan & Potong Foto Profil' }}
                  </h3>
                  <p class="text-xs text-neutral-500 dark:text-neutral-400 font-sans mt-0.5">
                    {{ cropTarget === 'banner' ? 'Geser dan atur posisi gambar sesuai ukuran tampilan banner tokomu.' : 'Geser dan atur posisi gambar sesuai bingkai lingkaran profil tokomu.' }}
                  </p>
                </div>
              </div>

              <button
                type="button"
                class="p-2 rounded-xl text-neutral-400 hover:text-neutral-600 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors cursor-pointer"
                aria-label="Batal"
                @click="cancelCrop"
              >
                <HugeiconsIcon :icon="Cancel01Icon" :size="18" />
              </button>
            </div>

            <!-- Crop Viewport Container -->
            <div class="space-y-3">
              <!-- Viewport Banner (16:5) -->
              <div
                v-if="cropTarget === 'banner'"
                ref="cropViewportRef"
                class="relative w-full aspect-[16/5] bg-neutral-950 rounded-2xl overflow-hidden border-2 border-primary-500/80 shadow-inner select-none cursor-grab active:cursor-grabbing flex items-center justify-center"
                @pointerdown="startPan"
                @pointermove="onPan"
                @pointerup="endPan"
                @pointercancel="endPan"
                @wheel.prevent="onWheelZoom"
              >
                <img
                  v-if="cropImageSrc"
                  ref="cropImgRef"
                  :src="cropImageSrc"
                  alt="Crop Preview"
                  :style="cropImageStyle"
                  class="max-w-none select-none pointer-events-none transform-gpu"
                  @load="onCropImageLoaded"
                />

                <!-- Rule of Thirds Grid Overlay -->
                <div class="absolute inset-0 pointer-events-none grid grid-cols-3 grid-rows-3 opacity-30">
                  <div class="border-r border-b border-white" />
                  <div class="border-r border-b border-white" />
                  <div class="border-b border-white" />
                  <div class="border-r border-b border-white" />
                  <div class="border-r border-b border-white" />
                  <div class="border-b border-white" />
                  <div class="border-r border-b border-white" />
                  <div class="border-r border-b border-white" />
                  <div />
                </div>

                <!-- Floating Helper Badge -->
                <div class="absolute bottom-2.5 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white/90 text-[11px] font-sans font-medium pointer-events-none shadow-xs">
                  Tahan & geser untuk memposisikan · Scroll untuk zoom
                </div>
              </div>

              <!-- Viewport Avatar (1:1 Circular Mask) -->
              <div
                v-else
                ref="cropViewportRef"
                class="relative w-60 h-60 sm:w-72 sm:h-72 mx-auto aspect-square bg-neutral-950 rounded-full overflow-hidden border-4 border-primary-500 shadow-inner select-none cursor-grab active:cursor-grabbing flex items-center justify-center ring-8 ring-primary-500/15"
                @pointerdown="startPan"
                @pointermove="onPan"
                @pointerup="endPan"
                @pointercancel="endPan"
                @wheel.prevent="onWheelZoom"
              >
                <img
                  v-if="cropImageSrc"
                  ref="cropImgRef"
                  :src="cropImageSrc"
                  alt="Crop Preview"
                  :style="cropImageStyle"
                  class="max-w-none select-none pointer-events-none transform-gpu"
                  @load="onCropImageLoaded"
                />

                <!-- Rule of Thirds Grid Overlay inside Avatar Circle -->
                <div class="absolute inset-0 pointer-events-none grid grid-cols-3 grid-rows-3 opacity-25">
                  <div class="border-r border-b border-white" />
                  <div class="border-r border-b border-white" />
                  <div class="border-b border-white" />
                  <div class="border-r border-b border-white" />
                  <div class="border-r border-b border-white" />
                  <div class="border-b border-white" />
                  <div class="border-r border-b border-white" />
                  <div class="border-r border-b border-white" />
                  <div />
                </div>

                <!-- Floating Helper Badge -->
                <div class="absolute bottom-3 left-1/2 -translate-x-1/2 px-2.5 py-0.5 rounded-full bg-black/70 backdrop-blur-md border border-white/20 text-white/90 text-[10px] font-sans font-medium pointer-events-none shadow-xs whitespace-nowrap">
                  Tahan & geser · Scroll zoom
                </div>
              </div>

              <!-- Zoom Controls Bar -->
              <div class="flex items-center justify-between gap-3 px-2 pt-1 text-xs text-neutral-600 dark:text-neutral-400">
                <div class="flex items-center gap-2 flex-1 max-w-xs">
                  <HugeiconsIcon :icon="ZoomOutIcon" :size="16" class="text-neutral-400 shrink-0" />
                  <input
                    type="range"
                    min="1"
                    max="3"
                    step="0.01"
                    v-model.number="zoomLevel"
                    class="w-full accent-primary-600 dark:accent-primary-500 cursor-pointer h-1.5 bg-neutral-200 dark:bg-neutral-800 rounded-lg"
                    @input="onZoomInput"
                  />
                  <HugeiconsIcon :icon="ZoomInIcon" :size="16" class="text-neutral-400 shrink-0" />
                  <span class="text-[11px] font-mono tabular-nums w-10 text-right font-medium">
                    {{ Math.round(zoomLevel * 100) }}%
                  </span>
                </div>

                <!-- Reset Framing Button -->
                <button
                  type="button"
                  class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-sans font-medium text-neutral-600 hover:text-neutral-900 dark:text-neutral-300 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors cursor-pointer"
                  @click="resetFraming"
                >
                  <HugeiconsIcon :icon="ArrowReloadHorizontalIcon" :size="13" />
                  <span>Tengah</span>
                </button>
              </div>
            </div>

            <!-- Modal Actions Footer -->
            <div class="flex items-center justify-end gap-2.5 pt-3 border-t border-neutral-100 dark:border-neutral-800">
              <button
                type="button"
                class="px-4 py-2 rounded-xl border border-neutral-200 dark:border-neutral-700 text-xs sm:text-sm font-heading font-semibold text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors cursor-pointer"
                @click="cancelCrop"
              >
                Batal
              </button>
              <button
                type="button"
                class="px-5 py-2 rounded-xl bg-primary-500 hover:bg-primary-600 text-white text-xs sm:text-sm font-heading font-semibold shadow-xs transition-colors cursor-pointer flex items-center gap-1.5"
                @click="applyCroppedImage"
              >
                <HugeiconsIcon :icon="CheckmarkBadge01Icon" :size="15" />
                <span>{{ cropTarget === 'banner' ? 'Terapkan Banner' : 'Terapkan Foto Profil' }}</span>
              </button>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>

    <!-- 5. Full Photo Lightbox Preview Modal (Banner / Profile Photo) -->
    <Teleport to="body">
      <Transition
        enter-active-class="transition duration-200 ease-out"
        enter-from-class="opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="transition duration-150 ease-in"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <div
          v-if="isViewingFullPhoto"
          class="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
          @click="isViewingFullPhoto = false"
        >
          <div class="relative max-w-4xl w-full max-h-[85vh] flex flex-col items-center" @click.stop>
            <!-- Close Button -->
            <button
              type="button"
              class="absolute -top-12 right-0 p-2 text-white/80 hover:text-white rounded-full bg-white/10 hover:bg-white/20 transition-colors cursor-pointer"
              aria-label="Tutup Pratinjau"
              @click="isViewingFullPhoto = false"
            >
              <HugeiconsIcon :icon="Cancel01Icon" :size="20" />
            </button>

            <!-- Full Image Preview (Circular if Avatar, Rectangular if Banner) -->
            <img
              :src="fullPhotoSrc"
              :alt="fullPhotoTitle"
              :class="[
                fullPhotoIsAvatar
                  ? 'w-64 h-64 sm:w-80 sm:h-80 rounded-full object-cover shadow-2xl border-4 border-white/30'
                  : 'max-w-full max-h-[80vh] object-contain rounded-2xl shadow-2xl border border-white/20'
              ]"
            />
            <p class="text-white/80 text-sm font-sans mt-3 font-medium">{{ fullPhotoTitle }}</p>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount, nextTick } from 'vue'
import { HugeiconsIcon } from '@hugeicons/vue'
import {
  MoreVerticalCircle02Icon,
  Camera01Icon,
  CropIcon,
  EyeIcon,
  ZoomInIcon,
  ZoomOutIcon,
  ArrowReloadHorizontalIcon,
  CheckmarkBadge01Icon,
  Cancel01Icon,
  Delete02Icon,
  UserCircleIcon
} from '@hugeicons/core-free-icons'

const props = withDefaults(
  defineProps<{
    storeName?: string
    ownerName?: string
    ownerAvatarUrl?: string
    defaultOwnerAvatarUrl?: string
    bannerUrl?: string
    defaultBannerUrl?: string
  }>(),
  {
    storeName: 'Kopi Senja Nusantara',
    ownerName: 'Fikri Setiawan',
    ownerAvatarUrl: '',
    defaultOwnerAvatarUrl: '',
    bannerUrl: '',
    defaultBannerUrl: ''
  }
)

const emit = defineEmits<{
  (e: 'update:bannerUrl', url: string): void
  (e: 'reset:bannerUrl'): void
  (e: 'update:ownerAvatarUrl', url: string): void
  (e: 'reset:ownerAvatarUrl'): void
}>()

// File Input References
const fileInputRef = ref<HTMLInputElement | null>(null)
const avatarFileInputRef = ref<HTMLInputElement | null>(null)

// Dropdown Menus References and States
const menuRef = ref<HTMLElement | null>(null)
const avatarContainerRef = ref<HTMLElement | null>(null)
const isMenuOpen = ref(false)
const isAvatarMenuOpen = ref(false)

// Drag and Drop States
const isDragging = ref(false)
const isAvatarDragging = ref(false)

// Toast Notifications
const showSuccessToast = ref(false)
const toastMessage = ref('Banner toko berhasil diperbarui!')
let toastTimeout: any = null

// Stored Original Raw Images (for re-cropping before export)
const rawBannerSource = ref<string>('')
const rawAvatarSource = ref<string>('')

// Computed Display Sources & Initials
const ownerInitials = computed(() => {
  const name = props.ownerName?.trim() || props.storeName?.trim() || 'BU'
  const parts = name.split(/\s+/).filter(Boolean)
  if (parts.length >= 2) {
    return (parts[0][0] + parts[1][0]).toUpperCase()
  }
  return name.slice(0, 2).toUpperCase()
})

const currentBannerUrl = computed(() => {
  return props.bannerUrl || props.defaultBannerUrl || ''
})

const currentOwnerAvatarUrl = computed(() => {
  return props.ownerAvatarUrl || props.defaultOwnerAvatarUrl || ''
})

// Full Preview Modal State
const isViewingFullPhoto = ref(false)
const fullPhotoSrc = ref('')
const fullPhotoTitle = ref('')
const fullPhotoIsAvatar = ref(false)

// Menu toggles
function toggleMenu() {
  isMenuOpen.value = !isMenuOpen.value
  if (isMenuOpen.value) {
    isAvatarMenuOpen.value = false
  }
}

function closeMenu() {
  isMenuOpen.value = false
}

function toggleAvatarMenu() {
  isAvatarMenuOpen.value = !isAvatarMenuOpen.value
  if (isAvatarMenuOpen.value) {
    isMenuOpen.value = false
  }
}

function closeAvatarMenu() {
  isAvatarMenuOpen.value = false
}

function handleOutsideClick(event: MouseEvent) {
  const target = event.target as Node
  if (menuRef.value && !menuRef.value.contains(target)) {
    closeMenu()
  }
  if (avatarContainerRef.value && !avatarContainerRef.value.contains(target)) {
    closeAvatarMenu()
  }
}

onMounted(() => {
  if (typeof document !== 'undefined') {
    document.addEventListener('click', handleOutsideClick)
  }
})

onBeforeUnmount(() => {
  if (typeof document !== 'undefined') {
    document.removeEventListener('click', handleOutsideClick)
  }
})

// Banner Options Handlers
function onSelectChangeBanner() {
  closeMenu()
  fileInputRef.value?.click()
}

function onSelectCropBanner() {
  closeMenu()
  const imageToCrop = rawBannerSource.value || currentBannerUrl.value
  openCropModal(imageToCrop, 'banner')
}

function onSelectViewFullBanner() {
  closeMenu()
  fullPhotoSrc.value = currentBannerUrl.value
  fullPhotoTitle.value = `Banner Toko ${props.storeName}`
  fullPhotoIsAvatar.value = false
  isViewingFullPhoto.value = true
}

function onSelectResetBanner() {
  closeMenu()
  emit('reset:bannerUrl')
  triggerToast('Sampul toko dihapus.')
}

// Avatar Options Handlers
function onSelectChangeAvatar() {
  closeAvatarMenu()
  avatarFileInputRef.value?.click()
}

function onSelectCropAvatar() {
  closeAvatarMenu()
  const imageToCrop = rawAvatarSource.value || currentOwnerAvatarUrl.value
  openCropModal(imageToCrop, 'avatar')
}

function onSelectViewFullAvatar() {
  closeAvatarMenu()
  fullPhotoSrc.value = currentOwnerAvatarUrl.value
  fullPhotoTitle.value = `Foto Profil ${props.ownerName}`
  fullPhotoIsAvatar.value = true
  isViewingFullPhoto.value = true
}

function onSelectResetAvatar() {
  closeAvatarMenu()
  emit('reset:ownerAvatarUrl')
  triggerToast('Foto profil dihapus.')
}

function triggerToast(msg: string) {
  toastMessage.value = msg
  showSuccessToast.value = true
  if (toastTimeout) clearTimeout(toastTimeout)
  toastTimeout = setTimeout(() => {
    showSuccessToast.value = false
  }, 3200)
}

// File Processing: Banner
function processBannerFile(file: File) {
  if (!file.type.startsWith('image/')) {
    alert('Harap pilih file gambar yang valid (PNG, JPG, WebP).')
    return
  }

  const maxBytes = 5 * 1024 * 1024
  if (file.size > maxBytes) {
    alert('Ukuran file terlalu besar. Maksimum ukuran banner adalah 5 MB.')
    return
  }

  const reader = new FileReader()
  reader.onload = (e) => {
    const resultUrl = e.target?.result as string
    if (resultUrl) {
      rawBannerSource.value = resultUrl
      openCropModal(resultUrl, 'banner')
    }
  }
  reader.readAsDataURL(file)
}

function onFileSelected(event: Event) {
  const target = event.target as HTMLInputElement
  const file = target.files?.[0]
  if (file) {
    processBannerFile(file)
  }
  if (target) target.value = ''
}

function onDragOver() {
  isDragging.value = true
}

function onDragLeave() {
  isDragging.value = false
}

function onDrop(event: DragEvent) {
  isDragging.value = false
  const file = event.dataTransfer?.files?.[0]
  if (file) {
    processBannerFile(file)
  }
}

function handleImageError(event: Event) {
  emit('reset:bannerUrl')
}

// File Processing: Profile Avatar
function processAvatarFile(file: File) {
  if (!file.type.startsWith('image/')) {
    alert('Harap pilih file gambar yang valid (PNG, JPG, WebP).')
    return
  }

  const maxBytes = 5 * 1024 * 1024
  if (file.size > maxBytes) {
    alert('Ukuran file terlalu besar. Maksimum ukuran foto profil adalah 5 MB.')
    return
  }

  const reader = new FileReader()
  reader.onload = (e) => {
    const resultUrl = e.target?.result as string
    if (resultUrl) {
      rawAvatarSource.value = resultUrl
      openCropModal(resultUrl, 'avatar')
    }
  }
  reader.readAsDataURL(file)
}

function onAvatarFileSelected(event: Event) {
  const target = event.target as HTMLInputElement
  const file = target.files?.[0]
  if (file) {
    processAvatarFile(file)
  }
  if (target) target.value = ''
}

function onAvatarDragOver() {
  isAvatarDragging.value = true
}

function onAvatarDragLeave() {
  isAvatarDragging.value = false
}

function onAvatarDrop(event: DragEvent) {
  isAvatarDragging.value = false
  const file = event.dataTransfer?.files?.[0]
  if (file) {
    processAvatarFile(file)
  }
}

function handleAvatarError(event: Event) {
  emit('reset:ownerAvatarUrl')
}

// -------------------------------------------------------------
// Interactive Pan & Zoom Cropper State & Logic (Dual-Mode)
// -------------------------------------------------------------
const isCropping = ref(false)
const cropTarget = ref<'banner' | 'avatar'>('banner')
const cropImageSrc = ref('')
const cropViewportRef = ref<HTMLDivElement | null>(null)
const cropImgRef = ref<HTMLImageElement | null>(null)

const naturalWidth = ref(1)
const naturalHeight = ref(1)
const viewportWidth = ref(640)
const viewportHeight = ref(200)
const baseScale = ref(1)

const zoomLevel = ref(1)
const panX = ref(0)
const panY = ref(0)

const isPanning = ref(false)
let panStartX = 0
let panStartY = 0
let initialPanX = 0
let initialPanY = 0

function openCropModal(imageSrc: string, target: 'banner' | 'avatar') {
  cropTarget.value = target
  cropImageSrc.value = imageSrc
  zoomLevel.value = 1
  panX.value = 0
  panY.value = 0
  isCropping.value = true

  nextTick(() => {
    updateViewportDimensions()
  })
}

function updateViewportDimensions() {
  if (cropViewportRef.value) {
    viewportWidth.value = cropViewportRef.value.clientWidth || (cropTarget.value === 'banner' ? 640 : 288)
    viewportHeight.value = cropViewportRef.value.clientHeight || (cropTarget.value === 'banner' ? 200 : 288)
    calculateBaseScale()
  }
}

function calculateBaseScale() {
  if (naturalWidth.value > 0 && naturalHeight.value > 0 && viewportWidth.value > 0 && viewportHeight.value > 0) {
    baseScale.value = Math.max(
      viewportWidth.value / naturalWidth.value,
      viewportHeight.value / naturalHeight.value
    )
  }
}

function onCropImageLoaded(e: Event) {
  const img = e.target as HTMLImageElement
  naturalWidth.value = img.naturalWidth || 800
  naturalHeight.value = img.naturalHeight || 600
  updateViewportDimensions()
  resetFraming()
}

const displayedImageWidth = computed(() => {
  return naturalWidth.value * baseScale.value * zoomLevel.value
})

const displayedImageHeight = computed(() => {
  return naturalHeight.value * baseScale.value * zoomLevel.value
})

const cropImageStyle = computed(() => {
  return {
    width: `${displayedImageWidth.value}px`,
    height: `${displayedImageHeight.value}px`,
    transform: `translate3d(${panX.value}px, ${panY.value}px, 0)`
  }
})

function getPanLimits() {
  const maxPanX = Math.max(0, (displayedImageWidth.value - viewportWidth.value) / 2)
  const maxPanY = Math.max(0, (displayedImageHeight.value - viewportHeight.value) / 2)
  return { maxPanX, maxPanY }
}

function clampPan() {
  const { maxPanX, maxPanY } = getPanLimits()
  panX.value = Math.max(-maxPanX, Math.min(maxPanX, panX.value))
  panY.value = Math.max(-maxPanY, Math.min(maxPanY, panY.value))
}

function resetFraming() {
  zoomLevel.value = 1
  panX.value = 0
  panY.value = 0
}

function onZoomInput() {
  clampPan()
}

function onWheelZoom(e: WheelEvent) {
  const delta = e.deltaY * -0.0015
  zoomLevel.value = Math.max(1, Math.min(3, zoomLevel.value + delta))
  clampPan()
}

function startPan(e: PointerEvent) {
  isPanning.value = true
  panStartX = e.clientX
  panStartY = e.clientY
  initialPanX = panX.value
  initialPanY = panY.value
  cropViewportRef.value?.setPointerCapture(e.pointerId)
}

function onPan(e: PointerEvent) {
  if (!isPanning.value) return
  const dx = e.clientX - panStartX
  const dy = e.clientY - panStartY
  panX.value = initialPanX + dx
  panY.value = initialPanY + dy
  clampPan()
}

function endPan(e: PointerEvent) {
  if (isPanning.value) {
    isPanning.value = false
    try {
      cropViewportRef.value?.releasePointerCapture(e.pointerId)
    } catch (_) {
      // Ignore
    }
  }
}

function cancelCrop() {
  isCropping.value = false
}

function applyCroppedImage() {
  if (!cropImgRef.value) {
    isCropping.value = false
    return
  }

  // Determine export canvas resolution based on target
  const isBanner = cropTarget.value === 'banner'
  const exportW = isBanner ? 1600 : 800
  const exportH = isBanner ? 500 : 800

  const canvas = document.createElement('canvas')
  canvas.width = exportW
  canvas.height = exportH

  const ctx = canvas.getContext('2d')
  if (!ctx) {
    isCropping.value = false
    return
  }

  // Scale ratio between export canvas and on-screen crop viewport
  const scaleRatio = exportW / viewportWidth.value

  const drawW = displayedImageWidth.value * scaleRatio
  const drawH = displayedImageHeight.value * scaleRatio

  // Center position of image on export canvas with pan offset
  const centerX = exportW / 2 + panX.value * scaleRatio
  const centerY = exportH / 2 + panY.value * scaleRatio

  const drawX = centerX - drawW / 2
  const drawY = centerY - drawH / 2

  ctx.imageSmoothingEnabled = true
  ctx.imageSmoothingQuality = 'high'
  ctx.drawImage(cropImgRef.value, drawX, drawY, drawW, drawH)

  const croppedDataUrl = canvas.toDataURL('image/jpeg', 0.92)

  if (isBanner) {
    emit('update:bannerUrl', croppedDataUrl)
    triggerToast('Banner toko berhasil disesuaikan!')
  } else {
    emit('update:ownerAvatarUrl', croppedDataUrl)
    triggerToast('Foto profil berhasil diperbarui!')
  }

  isCropping.value = false
}
</script>
