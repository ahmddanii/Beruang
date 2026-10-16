<template>
  <div class="h-full flex flex-col min-h-0 font-poppins text-neutral-900 dark:text-neutral-100 select-none overflow-hidden">
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
        class="fixed top-6 left-1/2 -translate-x-1/2 z-50 px-4 py-2.5 rounded-full bg-neutral-900/90 dark:bg-neutral-800/90 text-white border border-neutral-700/60 backdrop-blur-md text-xs font-poppins font-semibold shadow-xl flex items-center gap-2 pointer-events-none"
      >
        <HugeiconsIcon :icon="CheckmarkCircle01Icon" :size="16" class="text-emerald-400 shrink-0" />
        <span>{{ toastMessage }}</span>
      </div>
    </Transition>

    <!-- ========================================================================================= -->
    <!-- INSTAGRAM WEB INSPIRED LAYOUT: 2 Columns                                                  -->
    <!-- Kolom Kiri/Tengah (Feed UMKM + Stories Bar Sektor di Atas) Scroll Mandiri                 -->
    <!-- Kolom Kanan (Profil Investor + Suggested for You) Statis / Sticky                        -->
    <!-- ========================================================================================= -->
    <div class="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 overflow-hidden items-start">

      <!-- ========================================================================================= -->
      <!-- KOLOM TENGAH (8 Cols Desktop): Stories Bar Sektor + Feed Postingan UMKM                   -->
      <!-- HANYA KOLOM INI YANG MEMILIKI VERTICAL SCROLL MANDIRI                                      -->
      <!-- ========================================================================================= -->
      <main class="lg:col-span-8 xl:col-span-8 h-full min-h-0 overflow-y-auto pr-1 sm:pr-2 pb-16 space-y-5 scrollbar-thin">

        <!-- 1. STORIES BAR (Instagram Style: Filter Sektor Cepat & Story UMKM Unggulan) -->
        <section class="card-tactile-gopay rounded-2xl p-3.5 sm:p-4 border shrink-0 font-poppins">
          <div class="flex items-center gap-4 sm:gap-5 overflow-x-auto scrollbar-none py-1 px-1">
            <!-- Story 0: Semua Sektor -->
            <button
              type="button"
              class="flex flex-col items-center gap-1.5 shrink-0 group cursor-pointer"
              @click="handleStorySelect('ALL')"
            >
              <div
                :class="[
                  'p-[2.5px] rounded-full transition-all duration-200 group-hover:scale-105 active:scale-95',
                  investorStore.selectedSector === 'ALL'
                    ? 'bg-gradient-to-tr from-[#2091AA] via-[#00AA13] to-amber-400 shadow-sm ring-2 ring-[#2091AA]/20'
                    : 'bg-neutral-200 dark:bg-neutral-700 group-hover:bg-gradient-to-tr group-hover:from-[#2091AA]/60 group-hover:to-[#00AA13]/60'
                ]"
              >
                <div class="w-13 h-13 sm:w-14 sm:h-14 rounded-full p-1 bg-white dark:bg-[#13161F] flex items-center justify-center overflow-hidden">
                  <div class="w-full h-full rounded-full bg-gradient-to-br from-[#E6F4F7] to-[#C9EAF0] dark:from-[#183640] dark:to-[#102229] flex items-center justify-center text-[#2091AA]">
                    <HugeiconsIcon :icon="Store01Icon" :size="20" />
                  </div>
                </div>
              </div>
              <span
                :class="[
                  'text-[11px] max-w-[70px] truncate leading-tight transition-colors',
                  investorStore.selectedSector === 'ALL'
                    ? 'font-bold text-[#2091AA] dark:text-[#50AABF]'
                    : 'text-neutral-600 dark:text-neutral-400 font-medium group-hover:text-neutral-900 dark:group-hover:text-white'
                ]"
              >
                Semua
              </span>
            </button>

            <!-- Stories 1-4: Kategori Sektor Bisnis -->
            <button
              v-for="sec in sectorStories"
              :key="sec.id"
              type="button"
              class="flex flex-col items-center gap-1.5 shrink-0 group cursor-pointer"
              @click="handleStorySelect(sec.id)"
            >
              <div
                :class="[
                  'p-[2.5px] rounded-full transition-all duration-200 group-hover:scale-105 active:scale-95',
                  investorStore.selectedSector === sec.id
                    ? 'bg-gradient-to-tr from-[#2091AA] via-[#00AA13] to-amber-400 shadow-sm ring-2 ring-[#2091AA]/20'
                    : 'bg-neutral-200 dark:bg-neutral-700 group-hover:bg-gradient-to-tr group-hover:from-[#2091AA]/60 group-hover:to-[#00AA13]/60'
                ]"
              >
                <div class="w-13 h-13 sm:w-14 sm:h-14 rounded-full p-0.5 bg-white dark:bg-[#13161F] flex items-center justify-center overflow-hidden">
                  <div class="w-full h-full rounded-full bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center text-xs font-bold text-neutral-800 dark:text-neutral-200">
                    <span>{{ sec.emoji }}</span>
                  </div>
                </div>
              </div>
              <span
                :class="[
                  'text-[11px] max-w-[75px] truncate leading-tight transition-colors',
                  investorStore.selectedSector === sec.id
                    ? 'font-bold text-[#2091AA] dark:text-[#50AABF]'
                    : 'text-neutral-600 dark:text-neutral-400 font-medium group-hover:text-neutral-900 dark:group-hover:text-white'
                ]"
              >
                {{ sec.label }}
              </span>
            </button>

            <!-- Divider Story UMKM -->
            <div class="h-10 w-[1px] bg-neutral-200 dark:bg-neutral-800 shrink-0 mx-1" />

            <!-- Stories 5-8: Akun UMKM Unggulan -->
            <button
              v-for="umkm in topFeaturedUmkm"
              :key="'story-umkm-' + umkm.id"
              type="button"
              class="flex flex-col items-center gap-1.5 shrink-0 group cursor-pointer"
              :title="`Lihat postingan ${umkm.name}`"
              @click="handleUmkmStoryClick(umkm)"
            >
              <div class="p-[2.5px] rounded-full bg-gradient-to-tr from-[#00AA13] via-[#2091AA] to-amber-400 shadow-2xs group-hover:scale-105 active:scale-95 transition-transform">
                <div class="w-13 h-13 sm:w-14 sm:h-14 rounded-full p-1 bg-white dark:bg-[#13161F] flex items-center justify-center overflow-hidden">
                  <div class="w-full h-full rounded-full bg-amber-400 p-1 flex items-center justify-center">
                    <img src="/logo.svg" alt="Logo" class="w-full h-full object-contain" />
                  </div>
                </div>
              </div>
              <span class="text-[11px] max-w-[70px] truncate leading-tight text-neutral-600 dark:text-neutral-400 group-hover:text-neutral-900 dark:group-hover:text-white font-medium">
                {{ umkm.name.split(' ')[0] }}
              </span>
            </button>
          </div>
        </section>

        <!-- 2. SUB-HEADER: Active Filter Breadcrumbs & Secondary Sorting -->
        <div class="card-tactile-gopay rounded-2xl px-4 py-2.5 border flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <!-- Left: Filter status -->
          <div class="flex items-center gap-2 flex-wrap min-w-0">
            <template v-if="hasActiveFilters">
              <span class="text-xs font-semibold text-neutral-500 dark:text-neutral-400 shrink-0">
                Filter:
              </span>

              <!-- Sector Tag -->
              <button
                v-if="investorStore.selectedSector !== 'ALL'"
                type="button"
                class="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-lg text-xs font-bold bg-[#E6F4F7] text-[#0f5464] dark:bg-[#183640] dark:text-[#78c7d8] border border-[#2091AA]/25 hover:border-[#2091AA]/50 cursor-pointer transition-all"
                @click="investorStore.selectedSector = 'ALL'"
              >
                <span>{{ activeSectorLabel }}</span>
                <span class="text-[10px] opacity-70">✕</span>
              </button>

              <!-- Search Query Tag -->
              <button
                v-if="investorStore.searchQuery"
                type="button"
                class="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-lg text-xs font-bold bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 border border-neutral-200 dark:border-neutral-700 hover:border-neutral-400 cursor-pointer transition-all"
                @click="investorStore.searchQuery = ''"
              >
                <span>"{{ investorStore.searchQuery }}"</span>
                <span class="text-[10px] opacity-70">✕</span>
              </button>

              <!-- City Tag -->
              <button
                v-if="investorStore.selectedCity !== 'ALL'"
                type="button"
                class="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-lg text-xs font-bold bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 border border-neutral-200 dark:border-neutral-700 hover:border-neutral-400 cursor-pointer transition-all"
                @click="investorStore.selectedCity = 'ALL'"
              >
                <span>Kota: {{ investorStore.selectedCity }}</span>
                <span class="text-[10px] opacity-70">✕</span>
              </button>

              <!-- Reset Button -->
              <button
                type="button"
                class="text-xs font-bold text-red-600 dark:text-red-400 hover:underline cursor-pointer ml-1"
                @click="resetAllFilters"
              >
                Reset Semua
              </button>
            </template>

            <!-- Default Counter -->
            <template v-else>
              <div class="flex items-center gap-2">
                <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span class="text-xs sm:text-sm font-semibold text-neutral-800 dark:text-neutral-200">
                  Menampilkan <strong class="text-neutral-900 dark:text-white font-bold tabular-nums">{{ filteredFeed.length }}</strong> UMKM Terverifikasi
                </span>
              </div>
            </template>
          </div>

          <!-- Right: Sorting & Secondary Filter -->
          <div class="flex items-center gap-2 shrink-0">
            <!-- Kota Filter -->
            <div class="relative">
              <select
                v-model="investorStore.selectedCity"
                class="h-8 pl-2.5 pr-7 rounded-xl text-xs bg-neutral-50 dark:bg-[#18191E] border border-neutral-200 dark:border-neutral-700 text-neutral-800 dark:text-neutral-200 font-semibold focus:outline-none focus:ring-2 focus:ring-[#2091AA]/30 cursor-pointer appearance-none"
              >
                <option value="ALL">Semua Kota</option>
                <option value="Bandung">Bandung</option>
                <option value="Surabaya">Surabaya</option>
                <option value="Malang">Malang</option>
                <option value="Solo">Solo</option>
                <option value="Padang">Padang</option>
              </select>
              <HugeiconsIcon :icon="Location01Icon" :size="13" class="absolute right-2 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none" />
            </div>

            <!-- Sort By -->
            <div class="relative">
              <select
                v-model="selectedSortBy"
                class="h-8 pl-2.5 pr-7 rounded-xl text-xs bg-neutral-50 dark:bg-[#18191E] border border-neutral-200 dark:border-neutral-700 text-neutral-800 dark:text-neutral-200 font-semibold focus:outline-none focus:ring-2 focus:ring-[#2091AA]/30 cursor-pointer appearance-none"
              >
                <option value="HEALTH_SCORE">Skor Tertinggi</option>
                <option value="MARGIN">Margin Tertinggi</option>
                <option value="TARGET_ASC">Tiket Terendah</option>
              </select>
              <HugeiconsIcon :icon="ArrowDown01Icon" :size="12" class="absolute right-2 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none" />
            </div>
          </div>
        </div>

        <!-- 3. POST FEED (Instagram Style B2B Feed) -->
        <div v-if="filteredFeed.length > 0" class="space-y-6">
          <article
            v-for="item in filteredFeed"
            :key="item.id"
            :id="'umkm-card-' + item.id"
            class="card-tactile-gopay rounded-2xl border font-poppins transition-all duration-300 hover:border-neutral-300 dark:hover:border-neutral-700 overflow-hidden shadow-2xs"
          >
            <!-- A. Post Header: Author Identity & Accreditation (Instagram Header) -->
            <div class="px-5 py-4 flex items-center justify-between gap-3 border-b border-neutral-100 dark:border-neutral-800/80">
              <div class="flex items-center gap-3 min-w-0">
                <!-- Avatar with Story Gradient Ring -->
                <div class="p-[2px] rounded-full bg-gradient-to-tr from-[#2091AA] to-[#00AA13] shrink-0">
                  <div class="w-10 h-10 rounded-full p-1 bg-white dark:bg-[#13161F] flex items-center justify-center overflow-hidden">
                    <div class="w-full h-full rounded-full bg-amber-400 p-1 flex items-center justify-center">
                      <img src="/logo.svg" alt="Logo Usaha" class="w-full h-full object-contain" />
                    </div>
                  </div>
                </div>

                <div class="min-w-0">
                  <div class="flex items-center gap-2 flex-wrap">
                    <h3 class="font-poppins font-bold text-sm sm:text-base text-neutral-900 dark:text-white truncate">
                      {{ item.name }}
                    </h3>
                    <span class="inline-flex items-center gap-1 px-2 py-0.2 rounded-full text-[10px] font-semibold bg-emerald-100 text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-700">
                      <HugeiconsIcon :icon="CheckmarkCircle01Icon" :size="12" :stroke-width="2.5" />
                      <span>Ready for Funding</span>
                    </span>
                  </div>

                  <p class="text-xs text-neutral-500 dark:text-neutral-400 flex items-center gap-1.5 truncate mt-0.5">
                    <span>{{ item.sector }}</span>
                    <span>•</span>
                    <span>{{ item.city }}</span>
                    <span>•</span>
                    <span>Est. {{ item.establishedYear }}</span>
                  </p>
                </div>
              </div>

              <!-- Top Right Action: Bookmark Star Button (Instagram Save Post) -->
              <div class="flex items-center gap-1 shrink-0">
                <button
                  type="button"
                  :aria-label="item.bookmarked ? 'Hapus UMKM dari simpanan pantau' : 'Simpan UMKM ke daftar pantau'"
                  :class="[
                    'w-9 h-9 rounded-xl transition-all cursor-pointer flex items-center justify-center',
                    item.bookmarked
                      ? 'bg-amber-50 dark:bg-amber-950/60 text-amber-500 fill-amber-400 border border-amber-200 dark:border-amber-800'
                      : 'text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800'
                  ]"
                  :title="item.bookmarked ? 'Hapus dari Simpanan' : 'Simpan ke Portofolio Pantau'"
                  @click="toggleBookmarkWithFeedback(item)"
                >
                  <HugeiconsIcon
                    :icon="StarIcon"
                    :size="19"
                    :stroke-width="2"
                    :class="item.bookmarked ? 'fill-amber-400 text-amber-500' : ''"
                  />
                </button>

                <button
                  type="button"
                  class="w-9 h-9 rounded-xl text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors flex items-center justify-center cursor-pointer"
                  title="Bagikan Tautan Profil"
                  @click="copyShareLink(item)"
                >
                  <HugeiconsIcon :icon="Share01Icon" :size="17" />
                </button>
              </div>
            </div>

            <!-- B. Visual Media Showcase Carousel (Instagram Photo/Post Slider) -->
            <div class="relative w-full aspect-[16/9] sm:aspect-[2/1] overflow-hidden bg-neutral-900 group">
              <!-- Slide 0: Store & Product Showcase -->
              <div v-if="getPostSlide(item.id) === 0" class="relative w-full h-full">
                <img
                  :src="getStoreBannerImage(item.id)"
                  alt="Foto Gerai UMKM"
                  class="w-full h-full object-cover"
                />
                <div class="absolute inset-0 bg-gradient-to-t from-neutral-950/80 via-transparent to-black/20" />
                <div class="absolute top-3 left-3 flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/65 backdrop-blur-md text-white text-xs font-semibold border border-white/20">
                  <HugeiconsIcon :icon="Store01Icon" :size="15" class="text-emerald-400" />
                  <span>Audit Fisik Gerai Aktif</span>
                </div>
                <div class="absolute bottom-3 left-3 right-3 text-white">
                  <p class="font-poppins font-bold text-base tracking-tight drop-shadow-sm">
                    {{ item.name }} • {{ item.city }}
                  </p>
                  <p class="text-xs font-sans text-neutral-200 drop-shadow-xs">
                    Telah ditinjau langsung oleh konsultan: {{ item.consultantName }} ({{ item.certifiedAt }})
                  </p>
                </div>
              </div>

              <!-- Slide 1: Financial Traction Card -->
              <div v-else-if="getPostSlide(item.id) === 1" class="w-full h-full p-5 sm:p-6 bg-gradient-to-br from-neutral-900 to-[#101923] text-white flex flex-col justify-between">
                <div class="flex items-center justify-between">
                  <span class="text-[11px] font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                    <HugeiconsIcon :icon="AnalyticsUpIcon" :size="14" />
                    <span>Rapor Pertumbuhan Finansial Riil</span>
                  </span>
                  <span class="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    Skor: {{ item.healthScore }}/100
                  </span>
                </div>

                <div class="grid grid-cols-3 gap-3 my-auto py-2">
                  <div class="p-3 rounded-xl bg-white/5 border border-white/10 text-center">
                    <span class="text-xs text-neutral-300 block font-medium">Margin Kotor</span>
                    <strong class="text-lg sm:text-xl font-bold text-emerald-400 tabular-nums">
                      {{ item.marginPercentage }}%
                    </strong>
                    <span class="text-[10px] text-neutral-300 block mt-0.5">Stabil & Terkontrol</span>
                  </div>

                  <div class="p-3 rounded-xl bg-white/5 border border-white/10 text-center">
                    <span class="text-xs text-neutral-300 block font-medium">Pertumbuhan YoY</span>
                    <strong class="text-lg sm:text-xl font-bold text-blue-400 tabular-nums">
                      +{{ item.growthYoY }}%
                    </strong>
                    <span class="text-[10px] text-neutral-300 block mt-0.5">Penjualan Positif</span>
                  </div>

                  <div class="p-3 rounded-xl bg-white/5 border border-white/10 text-center">
                    <span class="text-xs text-neutral-300 block font-medium">Status Kas</span>
                    <strong class="text-lg sm:text-xl font-bold text-white tabular-nums">
                      100%
                    </strong>
                    <span class="text-[10px] text-emerald-400 block mt-0.5">Terverifikasi Bersih</span>
                  </div>
                </div>

                <p class="text-[11px] text-neutral-400 text-center">
                  Data terekonsiliasi mutasi giro bank & nota kasir harian
                </p>
              </div>

              <!-- Slide 2: Official Consultant Endorsement -->
              <div v-else class="w-full h-full p-5 sm:p-6 bg-gradient-to-br from-[#0C121D] to-[#12202F] text-white flex flex-col justify-between">
                <div class="flex items-center justify-between">
                  <div class="flex items-center gap-2">
                    <HugeiconsIcon :icon="Award01Icon" :size="16" class="text-amber-400" />
                    <span class="text-xs font-bold uppercase tracking-wider text-amber-300">
                      Sertifikasi Kelayakan Bisnis
                    </span>
                  </div>
                  <span class="text-[10px] font-mono text-neutral-400">{{ item.code }}</span>
                </div>

                <div class="my-auto py-2 space-y-2">
                  <p class="text-xs sm:text-sm font-sans italic text-neutral-200 leading-relaxed text-center max-w-md mx-auto">
                    "Toko ini memiliki pencatatan pembukuan harian yang sangat disiplin, pemisahan rekening pribadi-bisnis yang rapi, dan legalitas lengkap untuk sindikasi pendanaan modal."
                  </p>
                  <div class="text-center pt-1">
                    <strong class="text-xs font-bold text-white block">{{ item.consultantName }}</strong>
                    <span class="text-[10px] text-neutral-400">Konsultan Keuangan Berlisensi • Audit {{ item.certifiedAt }}</span>
                  </div>
                </div>

                <div class="flex items-center justify-center gap-1.5 text-[10px] text-emerald-400">
                  <HugeiconsIcon :icon="CheckmarkCircle01Icon" :size="12" />
                  <span>Lolos Uji Tuntas 5 Aspek Fundamental</span>
                </div>
              </div>

              <!-- Carousel Controls (Left & Right Arrows) -->
              <button
                type="button"
                aria-label="Slide foto gerai sebelumnya"
                class="absolute left-2.5 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/60 hover:bg-black/85 text-white flex items-center justify-center transition-all opacity-80 hover:opacity-100 cursor-pointer shadow-md"
                @click="prevPostSlide(item.id)"
              >
                <HugeiconsIcon :icon="ArrowLeft01Icon" :size="18" :stroke-width="2.5" />
              </button>
              <button
                type="button"
                aria-label="Slide foto gerai berikutnya"
                class="absolute right-2.5 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/60 hover:bg-black/85 text-white flex items-center justify-center transition-all opacity-80 hover:opacity-100 cursor-pointer shadow-md"
                @click="nextPostSlide(item.id)"
              >
                <HugeiconsIcon :icon="ArrowRight01Icon" :size="18" :stroke-width="2.5" />
              </button>

              <!-- Carousel Dots Indicator -->
              <div class="absolute bottom-2.5 left-1/2 -translate-x-1/2 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-xs">
                <button
                  v-for="dotIdx in [0, 1, 2]"
                  :key="dotIdx"
                  type="button"
                  :aria-label="`Slide ${dotIdx + 1}`"
                  class="cursor-pointer"
                  @click="setPostSlide(item.id, dotIdx)"
                >
                  <span
                    class="h-1.5 rounded-full transition-all duration-300 block"
                    :class="getPostSlide(item.id) === dotIdx ? 'w-4 bg-white' : 'w-1.5 bg-white/50 hover:bg-white/80'"
                  />
                </button>
              </div>
            </div>

            <!-- C. Action Bar underneath photo (Instagram Style: Like/Comment/Share -> Invest/Chat/ROI) -->
            <div class="px-5 pt-3.5 pb-2 flex items-center justify-between gap-3">
              <!-- Left Social Actions -->
              <div class="flex items-center gap-1.5 sm:gap-2">
                <!-- Chat / Kirim Pesan Direct Message -->
                <button
                  type="button"
                  class="h-9 px-3 rounded-xl text-xs font-semibold bg-[#E6F4F7] hover:bg-[#D9EEF3] dark:bg-[#183640] dark:hover:bg-[#204754] text-[#0f5464] dark:text-[#78c7d8] transition-colors flex items-center gap-1.5 cursor-pointer border border-[#2091AA]/20"
                  title="Kirim pesan langsung ke pemilik usaha"
                  @click="goToChatWithUmkm(item)"
                >
                  <HugeiconsIcon :icon="Message01Icon" :size="15" class="text-[#2091AA] dark:text-[#50AABF]" />
                  <span>Kirim Pesan</span>
                </button>

                <!-- Simulasi Bagi Hasil -->
                <button
                  type="button"
                  class="h-9 px-3 rounded-xl text-xs font-semibold text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors flex items-center gap-1.5 cursor-pointer"
                  title="Simulasi bagi hasil investasi"
                  @click="openRoiModal(item)"
                >
                  <HugeiconsIcon :icon="Coins01Icon" :size="15" class="text-[#156374] dark:text-[#50AABF]" />
                  <span>Simulasi ROI</span>
                </button>
              </div>

              <!-- Right: Health Score Pill -->
              <div class="flex items-center gap-1.5">
                <span class="px-2.5 py-1 rounded-full text-xs font-bold bg-[#E6F4F7] text-[#0f5464] dark:bg-[#183640] dark:text-[#78c7d8] tabular-nums border border-[#2091AA]/30">
                  Skor {{ item.healthScore }}/100
                </span>
              </div>
            </div>

            <!-- D. 4 Financial Telemetry Highlights -->
            <div class="px-5 py-2">
              <div class="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center font-poppins">
                <div class="p-2 rounded-xl bg-neutral-100/80 dark:bg-neutral-800/60 border border-neutral-200/60 dark:border-neutral-700/60">
                  <span class="text-[11px] text-neutral-500 dark:text-neutral-400 block font-medium">Tiket Modal</span>
                  <span class="text-xs sm:text-sm font-bold text-neutral-900 dark:text-white tabular-nums block mt-0.5">
                    Rp {{ (item.fundingTarget / 1000000).toLocaleString('id-ID') }} Jt
                  </span>
                </div>

                <div class="p-2 rounded-xl bg-neutral-100/80 dark:bg-neutral-800/60 border border-neutral-200/60 dark:border-neutral-700/60">
                  <span class="text-[11px] text-neutral-500 dark:text-neutral-400 block font-medium">Margin Kotor</span>
                  <span class="text-xs sm:text-sm font-bold text-emerald-600 dark:text-emerald-400 tabular-nums block mt-0.5">
                    {{ item.marginPercentage }}%
                  </span>
                </div>

                <div class="p-2 rounded-xl bg-neutral-100/80 dark:bg-neutral-800/60 border border-neutral-200/60 dark:border-neutral-700/60">
                  <span class="text-[11px] text-neutral-500 dark:text-neutral-400 block font-medium">Pertumbuhan</span>
                  <span class="text-xs sm:text-sm font-bold text-emerald-600 dark:text-emerald-400 tabular-nums block mt-0.5">
                    +{{ item.growthYoY }}%
                  </span>
                </div>

                <div class="p-2 rounded-xl bg-neutral-100/80 dark:bg-neutral-800/60 border border-neutral-200/60 dark:border-neutral-700/60">
                  <span class="text-[11px] text-neutral-500 dark:text-neutral-400 block font-medium">Kas Toko</span>
                  <span class="text-xs sm:text-sm font-bold text-[#2091AA] dark:text-[#50AABF] tabular-nums block mt-0.5">
                    100% Bersih
                  </span>
                </div>
              </div>
            </div>

            <!-- E. Founder Pitch Caption & Tags (Instagram Caption) -->
            <div class="px-5 py-3 space-y-2">
              <p class="text-xs sm:text-sm text-neutral-800 dark:text-neutral-200 leading-relaxed font-sans">
                <strong class="font-bold text-neutral-900 dark:text-white mr-1.5">{{ item.name }}</strong>
                "{{ item.pitchSummary }}"
              </p>

              <!-- Hashtags -->
              <div class="flex items-center gap-1.5 flex-wrap pt-0.5">
                <span
                  v-for="t in item.tags"
                  :key="t"
                  class="px-2 py-0.5 rounded-md text-[11px] font-medium bg-neutral-100 dark:bg-neutral-800 text-[#2091AA] dark:text-[#78c7d8]"
                >
                  #{{ t.replace(/\s+/g, '') }}
                </span>
              </div>
            </div>

            <!-- F. Primary Action Footer (Data Room CTA) -->
            <div class="px-5 py-3.5 bg-neutral-50/70 dark:bg-neutral-900/40 border-t border-neutral-100 dark:border-neutral-800/80 flex items-center justify-between">
              <span class="text-xs text-neutral-500 dark:text-neutral-400 font-medium">
                Sertifikasi Uji Tuntas: <strong class="text-neutral-800 dark:text-neutral-200">Lolos</strong>
              </span>

              <NuxtLink
                v-if="item.accessStatus === 'APPROVED'"
                :to="`/investor/data-room/${item.id}`"
                class="inline-flex items-center gap-2 px-4 h-9 rounded-xl text-xs font-bold font-poppins bg-[#00800e] hover:bg-[#006e0c] text-white shadow-xs transition-all active:scale-95 cursor-pointer"
              >
                <HugeiconsIcon :icon="FileUnlockedIcon" :size="16" :stroke-width="2" />
                <span>Buka Data Room</span>
                <HugeiconsIcon :icon="ArrowRight01Icon" :size="14" :stroke-width="2" />
              </NuxtLink>

              <div
                v-else-if="item.accessStatus === 'PENDING'"
                class="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-semibold bg-neutral-200/80 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300"
              >
                <HugeiconsIcon :icon="Clock01Icon" :size="14" class="text-amber-600 animate-spin" />
                <span>Menunggu Verifikasi</span>
              </div>

              <NuxtLink
                v-else
                :to="`/investor/umkm/${item.id}/ajukan-akses`"
                class="btn-pill-action group cursor-pointer inline-flex items-center gap-1.5 h-9 px-4 text-xs font-bold"
              >
                <span>Ajukan Akses Data Room</span>
                <HugeiconsIcon :icon="ArrowRight01Icon" :size="14" class="group-hover:translate-x-0.5 transition-transform" />
              </NuxtLink>
            </div>
          </article>
        </div>

        <!-- Empty State Filter Feed -->
        <div
          v-else
          class="card-tactile-gopay rounded-2xl p-10 sm:p-14 border text-center space-y-4 max-w-lg mx-auto"
        >
          <div class="w-14 h-14 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-400 flex items-center justify-center mx-auto">
            <HugeiconsIcon :icon="Search01Icon" :size="24" />
          </div>
          <div>
            <h3 class="font-poppins font-bold text-base text-neutral-900 dark:text-white">
              Tidak Ada UMKM yang Sesuai Kriteria
            </h3>
            <p class="text-xs text-neutral-500 dark:text-neutral-400 mt-1 max-w-sm mx-auto">
              Cobalah memilih opsi sektor lain, mereset batas margin kotor, atau mencari nama kota lainnya.
            </p>
          </div>
          <button
            type="button"
            class="px-4 py-2 rounded-xl text-xs font-semibold bg-[#2091AA] text-white hover:bg-[#1a768b] transition-colors cursor-pointer"
            @click="resetAllFilters"
          >
            Reset Semua Filter
          </button>
        </div>
      </main>

      <!-- ========================================================================================= -->
      <!-- KOLOM KANAN (4 Cols Desktop): Profil Investor & Suggested for You (Instagram Sidebar)    -->
      <!-- STATIS / STICKY DI KANAN (TIDAK IKUT SCROLL FEED TENGAH)                                  -->
      <!-- ========================================================================================= -->
      <aside class="hidden lg:block lg:col-span-4 xl:col-span-4 shrink-0 space-y-5 sticky top-0 pt-0.5 font-poppins">

        <!-- 1. INVESTOR PROFILE CARD (Instagram Top Right Identity Widget) -->
        <div class="flex items-center justify-between gap-3 p-3.5 rounded-2xl bg-white dark:bg-[#13161F] border border-neutral-200/90 dark:border-neutral-800 shadow-2xs">
          <div class="flex items-center gap-3 min-w-0">
            <div class="relative w-12 h-12 rounded-full p-[2px] bg-gradient-to-tr from-[#2091AA] to-[#00AA13] shrink-0">
              <img
                src="/images/user-profile.png"
                alt="Foto Profil Investor"
                class="w-full h-full rounded-full object-cover bg-white dark:bg-[#18191E]"
              />
              <span class="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-500 ring-2 ring-white dark:ring-[#13161F]" />
            </div>

            <div class="min-w-0">
              <div class="flex items-center gap-1.5">
                <h4 class="font-bold text-xs sm:text-sm text-neutral-900 dark:text-white truncate">
                  {{ authStore.currentUser?.name || 'Fikri Setiawan' }}
                </h4>
                <HugeiconsIcon :icon="CheckmarkCircle01Icon" :size="13" class="text-emerald-500 shrink-0" />
              </div>
              <p class="text-[11px] text-neutral-500 dark:text-neutral-400 truncate">
                Angel Investor
              </p>
              <p class="text-[10px] text-neutral-400 dark:text-neutral-500 truncate">
                Nusantara Angel Syndicate
              </p>
            </div>
          </div>

          <NuxtLink
            to="/investor/pengaturan"
            class="text-[11px] font-bold text-[#2091AA] hover:text-[#18758a] hover:underline shrink-0"
          >
            Kelola
          </NuxtLink>
        </div>

        <!-- 2. SUGGESTED FOR YOU (Rekomendasi UMKM Kurasi Khusus) -->
        <div class="card-tactile-gopay rounded-2xl p-4 border space-y-3">
          <div class="flex items-center justify-between">
            <span class="text-xs font-bold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
              Disarankan untuk Anda
            </span>
            <button
              type="button"
              class="text-xs font-semibold text-[#2091AA] hover:underline cursor-pointer"
              @click="resetAllFilters"
            >
              Lihat Semua
            </button>
          </div>

          <!-- Suggested Accounts List -->
          <div class="space-y-3 pt-1">
            <div
              v-for="suggested in suggestedList"
              :key="'sug-' + suggested.id"
              class="flex items-center justify-between gap-3 group"
            >
              <div
                class="flex items-center gap-2.5 min-w-0 cursor-pointer"
                @click="scrollToUmkm(suggested.id)"
              >
                <div class="w-9 h-9 rounded-full bg-amber-400 p-1.5 shrink-0 flex items-center justify-center shadow-2xs">
                  <img src="/logo.svg" alt="Logo" class="w-full h-full object-contain" />
                </div>
                <div class="min-w-0">
                  <h5 class="text-xs font-bold text-neutral-900 dark:text-white truncate group-hover:text-[#2091AA] transition-colors">
                    {{ suggested.name }}
                  </h5>
                  <p class="text-[10px] text-neutral-500 dark:text-neutral-400 truncate">
                    Margin {{ suggested.marginPercentage }}% • Skor {{ suggested.healthScore }}
                  </p>
                </div>
              </div>

              <button
                type="button"
                :class="[
                  'text-[11px] font-bold px-2.5 py-1 rounded-lg transition-colors cursor-pointer shrink-0',
                  suggested.bookmarked
                    ? 'bg-amber-100 text-amber-800 dark:bg-amber-950/80 dark:text-amber-300'
                    : 'text-[#2091AA] hover:bg-[#E6F4F7] dark:hover:bg-[#183640]'
                ]"
                @click.stop="toggleBookmarkWithFeedback(suggested)"
              >
                {{ suggested.bookmarked ? 'Dipantau' : '+ Pantau' }}
              </button>
            </div>
          </div>
        </div>

        <!-- 3. QUICK NAVIGATION (Pesan Masuk & Simpanan Pantau) -->
        <div class="card-tactile-gopay rounded-2xl p-4 border space-y-2.5">
          <NuxtLink
            to="/investor/pesan"
            class="w-full py-2.5 px-3.5 rounded-xl bg-[#E6F4F7] hover:bg-[#D9EEF3] dark:bg-[#183640] dark:hover:bg-[#204754] text-[#0f5464] dark:text-[#78c7d8] transition-colors flex items-center justify-between text-xs font-semibold cursor-pointer border border-[#2091AA]/20"
          >
            <div class="flex items-center gap-2">
              <HugeiconsIcon :icon="Message01Icon" :size="16" class="text-[#2091AA] dark:text-[#50AABF]" />
              <span>Pesan Masuk UMKM</span>
            </div>
            <span
              v-if="chatStore.unreadCountInvestor > 0"
              class="px-2 py-0.5 rounded-full text-[10px] font-bold bg-red-600 text-white tabular-nums leading-none"
            >
              {{ chatStore.unreadCountInvestor }}
            </span>
            <span v-else class="text-[11px] text-neutral-400">Aktif</span>
          </NuxtLink>

          <NuxtLink
            to="/investor/watchlist"
            class="w-full py-2.5 px-3.5 rounded-xl bg-neutral-100 hover:bg-neutral-200/70 dark:bg-neutral-800 dark:hover:bg-neutral-700/60 text-neutral-800 dark:text-neutral-200 transition-colors flex items-center justify-between text-xs font-semibold cursor-pointer"
          >
            <div class="flex items-center gap-2">
              <HugeiconsIcon :icon="StarIcon" :size="15" class="text-amber-500 fill-amber-400" />
              <span>Portofolio Pantau</span>
            </div>
            <span class="text-xs font-bold tabular-nums">
              {{ investorStore.watchlist.length }} Usaha
            </span>
          </NuxtLink>
        </div>

        <!-- 4. INSTAGRAM STYLE FOOTER LINKS -->
        <div class="px-2 pt-1 text-[11px] text-neutral-400 dark:text-neutral-500 space-y-2 leading-relaxed">
          <div class="flex items-center gap-2 flex-wrap text-[10px]">
            <span class="hover:underline cursor-pointer">Tentang Beruang</span>
            <span>•</span>
            <span class="hover:underline cursor-pointer">Bantuan</span>
            <span>•</span>
            <span class="hover:underline cursor-pointer">Privasi</span>
            <span>•</span>
            <span class="hover:underline cursor-pointer">Syarat</span>
            <span>•</span>
            <span class="hover:underline cursor-pointer">Lokasi</span>
          </div>
          <p class="text-[10px] uppercase tracking-wider">
            © 2026 BERUANG INVESTOR • SISTEM AKREDITASI UMKM
          </p>
        </div>
      </aside>
    </div>

    <!-- Quick ROI Calculator Modal for specific UMKM -->
    <div
      v-if="selectedRoiModal"
      class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150"
      @click.self="selectedRoiModal = null"
    >
      <div class="card-tactile-gopay rounded-3xl p-6 border max-w-md w-full space-y-5 bg-white dark:bg-[#13161F] shadow-2xl">
        <div class="flex items-start justify-between">
          <div>
            <span class="text-[10px] font-bold text-[#2091AA] uppercase tracking-wider block">
              Simulasi Bagi Hasil Usaha
            </span>
            <h3 class="font-poppins font-bold text-base text-neutral-900 dark:text-white mt-0.5">
              {{ selectedRoiModal.name }}
            </h3>
          </div>
          <button
            type="button"
            aria-label="Tutup jendela simulasi bagi hasil"
            class="p-1 rounded-lg text-neutral-400 hover:text-neutral-600 dark:hover:text-white cursor-pointer"
            @click="selectedRoiModal = null"
          >
            ✕
          </button>
        </div>

        <div class="p-3.5 rounded-2xl bg-neutral-100 dark:bg-neutral-800 space-y-2 text-xs">
          <div class="flex justify-between">
            <span class="text-neutral-500">Target Pendanaan:</span>
            <strong class="tabular-nums text-neutral-900 dark:text-white">Rp {{ selectedRoiModal.fundingTarget.toLocaleString('id-ID') }}</strong>
          </div>
          <div class="flex justify-between">
            <span class="text-neutral-500">Margin Kotor Riil:</span>
            <strong class="tabular-nums text-emerald-600 font-bold">{{ selectedRoiModal.marginPercentage }}%</strong>
          </div>
          <div class="flex justify-between">
            <span class="text-neutral-500">Skema Standar:</span>
            <span class="font-medium text-neutral-800 dark:text-neutral-200">Bagi Hasil (Syariah Revenue Sharing)</span>
          </div>
        </div>

        <div class="space-y-1.5">
          <div class="flex justify-between text-xs font-medium">
            <span class="text-neutral-600 dark:text-neutral-400">Komitmen Tiket Anda:</span>
            <strong class="font-bold text-[#2091AA] tabular-nums">
              Rp {{ modalTicketInput.toLocaleString('id-ID') }}
            </strong>
          </div>
          <input
            v-model.number="modalTicketInput"
            type="range"
            min="25000000"
            :max="selectedRoiModal.fundingTarget"
            step="5000000"
            class="w-full h-2 bg-neutral-200 dark:bg-neutral-700 rounded-lg appearance-none cursor-pointer accent-[#2091AA]"
          />
        </div>

        <div class="p-4 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 space-y-2 text-xs">
          <div class="flex justify-between items-center">
            <span class="text-neutral-600 dark:text-neutral-400">Estimasi Bagi Hasil Bulanan:</span>
            <strong class="text-base font-bold text-emerald-600 dark:text-emerald-400 tabular-nums">
              Rp {{ Math.round((modalTicketInput * 0.14) / 12).toLocaleString('id-ID') }}
            </strong>
          </div>
          <p class="text-[11px] text-neutral-500 dark:text-neutral-400 leading-normal">
            Berdasarkan historis performa kas toko yang telah terekonsiliasi 5 bulan berturut-turut.
          </p>
        </div>

        <div class="flex items-center justify-end gap-2 pt-2">
          <button
            type="button"
            class="px-4 py-2 rounded-xl text-xs font-semibold text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 cursor-pointer"
            @click="selectedRoiModal = null"
          >
            Tutup
          </button>
          <NuxtLink
            :to="`/investor/umkm/${selectedRoiModal.id}/ajukan-akses`"
            class="px-4 py-2 rounded-xl text-xs font-bold bg-[#00AA13] text-white shadow-xs cursor-pointer"
            @click="selectedRoiModal = null"
          >
            Lanjut Ajukan Tiket Ini →
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useInvestorStore, type MarketplaceUmkm } from '~/stores/investor'
import { useAuthStore } from '~/stores/auth'
import { useChatStore } from '~/stores/chat'
import { HugeiconsIcon } from '@hugeicons/vue'
import {
  Search01Icon,
  CheckmarkCircle01Icon,
  StarIcon,
  Store01Icon,
  Location01Icon,
  AnalyticsUpIcon,
  Award01Icon,
  ArrowRight01Icon,
  ArrowLeft01Icon,
  Coins01Icon,
  Share01Icon,
  FileUnlockedIcon,
  Clock01Icon,
  Message01Icon,
  ArrowDown01Icon
} from '@hugeicons/core-free-icons'

definePageMeta({
  layout: 'dashboard'
})

const router = useRouter()
const investorStore = useInvestorStore()
const authStore = useAuthStore()
const chatStore = useChatStore()

// Toast State
const toastMessage = ref('')
let toastTimer: any = null

function triggerToast(msg: string) {
  toastMessage.value = msg
  if (toastTimer) clearTimeout(toastTimer)
  toastTimer = setTimeout(() => {
    toastMessage.value = ''
  }, 2500)
}

// Stories Bar Sektor Setup
const sectorStories = [
  { id: 'F&B', label: 'F&B & Kopi', emoji: '☕' },
  { id: 'FMCG', label: 'Oleh-oleh', emoji: '🛍️' },
  { id: 'Agroindustri', label: 'Agro', emoji: '🌱' },
  { id: 'Fashion', label: 'Fashion', emoji: '👔' }
]

const topFeaturedUmkm = computed(() => {
  return investorStore.marketplaceList.slice(0, 4)
})

function handleStorySelect(sectorId: string) {
  investorStore.selectedSector = sectorId
  investorStore.searchQuery = ''
}

function handleUmkmStoryClick(umkm: MarketplaceUmkm) {
  investorStore.searchQuery = umkm.name
  scrollToUmkm(umkm.id)
}

function scrollToUmkm(id: string) {
  const el = document.getElementById('umkm-card-' + id)
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'center' })
    el.classList.add('ring-2', 'ring-[#2091AA]', 'transition-all')
    setTimeout(() => el.classList.remove('ring-2', 'ring-[#2091AA]'), 2000)
  }
}

// Minimum Margin Filter
const selectedMinMargin = computed({
  get: () => investorStore.minMargin || 0,
  set: (val: number) => {
    investorStore.minMargin = val
  }
})

// Sort By Selection
const selectedSortBy = ref<'HEALTH_SCORE' | 'MARGIN' | 'TARGET_ASC'>('HEALTH_SCORE')

// Sektor Filter List with Dynamic Counts
const sectorFilterList = computed(() => {
  const all = investorStore.marketplaceList
  return [
    { id: 'ALL', label: 'Semua Sektor', count: all.length },
    { id: 'F&B', label: 'F&B & Kopi', count: all.filter(m => m.sector.includes('F&B')).length },
    { id: 'FMCG', label: 'Oleh-oleh FMCG', count: all.filter(m => m.sector.includes('FMCG')).length },
    { id: 'Agroindustri', label: 'Agroindustri', count: all.filter(m => m.sector.includes('Agro')).length },
    { id: 'Fashion', label: 'Fashion & Kriya', count: all.filter(m => m.sector.includes('Fashion')).length }
  ]
})

const activeSectorLabel = computed(() => {
  const found = sectorFilterList.value.find(s => s.id === investorStore.selectedSector)
  return found ? found.label : 'Semua Sektor'
})

// Active Filters Detection
const hasActiveFilters = computed(() => {
  return (
    investorStore.searchQuery !== '' ||
    investorStore.selectedSector !== 'ALL' ||
    investorStore.selectedCity !== 'ALL' ||
    (investorStore.minMargin || 0) > 0
  )
})

function resetAllFilters() {
  investorStore.searchQuery = ''
  investorStore.selectedSector = 'ALL'
  investorStore.selectedCity = 'ALL'
  investorStore.minMargin = 0
}

// Feed Filtering & Sorting
const filteredFeed = computed(() => {
  const list = investorStore.marketplaceList.filter(item => {
    const q = investorStore.searchQuery.toLowerCase().trim()
    const matchSearch =
      q === '' ||
      item.name.toLowerCase().includes(q) ||
      item.sector.toLowerCase().includes(q) ||
      item.city.toLowerCase().includes(q) ||
      item.pitchSummary.toLowerCase().includes(q)

    const matchSector =
      investorStore.selectedSector === 'ALL' ||
      item.sector.toLowerCase().includes(investorStore.selectedSector.toLowerCase())

    const matchCity =
      investorStore.selectedCity === 'ALL' ||
      item.city.toLowerCase() === investorStore.selectedCity.toLowerCase()

    const matchMargin = item.marginPercentage >= selectedMinMargin.value

    return matchSearch && matchSector && matchCity && matchMargin
  })

  // Sort
  if (selectedSortBy.value === 'MARGIN') {
    return [...list].sort((a, b) => b.marginPercentage - a.marginPercentage)
  }
  if (selectedSortBy.value === 'TARGET_ASC') {
    return [...list].sort((a, b) => a.fundingTarget - b.fundingTarget)
  }
  return [...list].sort((a, b) => b.healthScore - a.healthScore)
})

// Suggested List (Top 3-4 UMKM for Right Sidebar)
const suggestedList = computed(() => {
  return [...investorStore.marketplaceList]
    .sort((a, b) => b.healthScore - a.healthScore)
    .slice(0, 4)
})

// Post Slide Index Tracking (Per Post Carousel)
const postSlides = ref<Record<string, number>>({})

function getPostSlide(id: string): number {
  return postSlides.value[id] || 0
}

function setPostSlide(id: string, slideIdx: number) {
  postSlides.value[id] = slideIdx
}

function nextPostSlide(id: string) {
  const current = getPostSlide(id)
  postSlides.value[id] = (current + 1) % 3
}

function prevPostSlide(id: string) {
  const current = getPostSlide(id)
  postSlides.value[id] = (current - 1 + 3) % 3
}

// Store Banner Map
function getStoreBannerImage(id: string): string {
  if (id === 'umkm-01') return '/images/default-store-banner.jpg'
  return '/images/default-store-banner.jpg'
}

// Bookmark Action with Instant Feedback
function toggleBookmarkWithFeedback(item: MarketplaceUmkm) {
  investorStore.toggleBookmark(item.id)
  if (item.bookmarked) {
    triggerToast(`${item.name} disimpan ke Portofolio Pantau!`)
  } else {
    triggerToast(`${item.name} dihapus dari Portofolio Pantau.`)
  }
}

// Share Link Action
function copyShareLink(item: MarketplaceUmkm) {
  if (import.meta.client) {
    const url = `${window.location.origin}/investor/umkm/${item.id}`
    navigator.clipboard.writeText(url)
    triggerToast(`Tautan profil ${item.name} berhasil disalin!`)
  }
}

// Navigate to Chat with Specific UMKM
function goToChatWithUmkm(item: MarketplaceUmkm) {
  const threadId = chatStore.startOrGetThread(item.id, item.name)
  router.push(`/investor/pesan?umkmId=${item.id}&threadId=${threadId}`)
}

// ROI Modal State
const selectedRoiModal = ref<MarketplaceUmkm | null>(null)
const modalTicketInput = ref(100000000)

function openRoiModal(item: MarketplaceUmkm) {
  selectedRoiModal.value = item
  modalTicketInput.value = Math.min(100000000, item.fundingTarget)
}
</script>
