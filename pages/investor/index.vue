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

    <!-- ========================================================================================= -->
    <!-- 1. TOP HEADER: Page Title "Jaringan" on Left & Wilayah Controls on Right (Sejajar)         -->
    <!-- ========================================================================================= -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 min-h-[44px]">
      <div class="flex items-center gap-2.5 sm:gap-3">
        <HugeiconsIcon
          :icon="Store01Icon"
          :size="26"
          :stroke-width="2.2"
          class="text-neutral-900 dark:text-white shrink-0"
        />
        <h1 class="font-poppins font-semibold text-2xl sm:text-3xl text-neutral-900 dark:text-white tracking-tight leading-tight">
          Jaringan
        </h1>
      </div>

      <!-- Action Controls on Right: Reset Semua (Hijau) & Pilih Lokasi (Sejajar dengan Title Jaringan) -->
      <div class="flex items-center gap-2.5 self-start sm:self-auto shrink-0">
        <button
          type="button"
          class="btn-pill-action btn-pill-action-green cursor-pointer shadow-none"
          title="Reset Semua Filter Wilayah & Pencarian"
          @click="resetAllFilters"
        >
          <span>Reset Semua</span>
        </button>

        <button
          type="button"
          :class="[
            'btn-pill-action group cursor-pointer shadow-none',
            isLocationModalOpen || investorStore.selectedCities.length > 0
              ? 'bg-[#E6F4F7]! text-[#156374]! border-[#156374]/30! dark:bg-[#156374]/25! dark:text-[#50AABF]! dark:border-[#50AABF]/35!'
              : ''
          ]"
          aria-haspopup="dialog"
          :aria-expanded="isLocationModalOpen"
          title="Pilih Wilayah UMKM di Seluruh Indonesia"
          @click="isLocationModalOpen = true"
        >
          <HugeiconsIcon
            :icon="Location01Icon"
            :size="15"
            :stroke-width="2"
            class="text-[#156374] dark:text-[#50AABF] shrink-0"
          />
          <span>{{ activeCityLabel }}</span>
          <HugeiconsIcon
            :icon="ArrowDown01Icon"
            :size="15"
            :stroke-width="2.2"
            :class="[
              'text-neutral-400 dark:text-neutral-500 transition-transform duration-200 shrink-0',
              isLocationModalOpen ? 'rotate-180' : ''
            ]"
          />
        </button>
      </div>
    </div>

    <!-- ========================================================================================= -->
    <!-- 2. DIRECTORY FEED LAYOUT (2 Columns: Feed on Left sized to 550px Media, Profile on Right)  -->
    <!-- ========================================================================================= -->
    <div class="flex flex-col lg:flex-row items-start gap-6 lg:gap-7 font-poppins">

      <!-- ======================================================================================= -->
      <!-- KOLOM TENGAH / KIRI: Feed Postingan UMKM & Tips Platform (Disesuaikan dengan 550x578)    -->
      <!-- ======================================================================================= -->
      <main class="w-full max-w-[600px] lg:w-[600px] shrink-0 space-y-6 mx-auto lg:mx-0 pb-32 sm:pb-8">

        <!-- POST FEED (Card Container disesuaikan dengan ukuran Media Container 550 x 578 + Lazy Rendering) -->
        <div v-if="filteredFeed.length > 0" class="space-y-6 sm:space-y-7">
          <article
            v-for="item in visibleFeedItems"
            :key="item.id"
            :id="'umkm-card-' + item.id"
            class="gsap-feed-card lazy-render-card card-tactile-gopay w-full max-w-[600px] mx-auto rounded-[20px] sm:rounded-[22px] border border-[#CBD5E1] dark:border-neutral-800 bg-[#FFFFFF] dark:bg-[#13161F] font-poppins transition-all duration-300 hover:border-neutral-300 dark:hover:border-neutral-700 overflow-hidden !shadow-none"
          >
            <!-- Card Body Content (Comfortable padding on mobile & desktop) -->
            <div class="p-4 sm:p-6 space-y-4 sm:space-y-5">

              <!-- 1. Post Author Header: Circular Profile Image + Name + Metadata + Upload Timestamp + Save & Share -->
              <div class="flex items-start justify-between gap-4">
                <div class="flex items-center gap-3 sm:gap-3.5 min-w-0">
                  <!-- Profile Image (Lingkaran proporsional, disesuaikan dengan tinggi 3 baris informasi rapat di kanannya): Beruang Official vs UMKM -->
                  <div
                    v-if="item.isPlatformPost"
                    class="w-12 h-12 sm:w-13 sm:h-13 rounded-full bg-[#E6F4F7] dark:bg-[#156374]/25 p-2.5 shrink-0 flex items-center justify-center border border-[#156374]/30 dark:border-[#50AABF]/35 overflow-hidden shadow-none"
                  >
                    <img src="/logo/logoSmall.svg" alt="Beruang Official" loading="lazy" decoding="async" class="w-full h-full object-contain rounded-full" />
                  </div>
                  <div
                    v-else
                    class="w-12 h-12 sm:w-13 sm:h-13 rounded-full bg-amber-400/90 dark:bg-amber-500/90 p-2.5 shrink-0 flex items-center justify-center border border-amber-300/60 overflow-hidden shadow-none"
                  >
                    <img src="/logo.svg" alt="Foto Profil Usaha" loading="lazy" decoding="async" class="w-full h-full object-contain rounded-full" />
                  </div>

                  <!-- Contract: gap-0.5 sm:gap-1 -->
                  <div class="min-w-0 flex flex-col justify-center gap-1.5 sm:gap-2">
                    <!-- Di Bagian Atas dari Nama UMKM: Lokasi (contoh: Bandung) atau Kategori Platform -->
                    <div
                      v-if="!item.isPlatformPost"
                      class="inline-flex items-center gap-1 text-xs font-poppins font-medium text-neutral-500 dark:text-neutral-400 leading-tight"
                    >
                      <HugeiconsIcon :icon="Location01Icon" :size="13" class="text-[#156374] dark:text-[#50AABF] shrink-0" />
                      <span>{{ item.city }}</span>
                    </div>
                    <div
                      v-else
                      class="inline-flex items-center gap-1 text-xs font-poppins font-semibold text-[#156374] dark:text-[#50AABF] leading-tight"
                    >
                      <HugeiconsIcon :icon="SparklesIcon" :size="13" :stroke-width="2.2" class="shrink-0" />
                      <span>{{ item.platformCategory || 'Tips & Trick' }}</span>
                    </div>

                    <!-- Nama UMKM / Author -->
                    <h3 class="font-poppins font-bold text-base sm:text-lg text-neutral-900 dark:text-white truncate leading-tight">
                      {{ item.name }}
                    </h3>

                    <!-- Di Bagian Bawah dari Nama UMKM: Kapan Postingan Diupload -->
                    <div class="inline-flex items-center gap-1.5 text-xs font-poppins text-neutral-500 dark:text-neutral-400 leading-tight">
                      <HugeiconsIcon :icon="Time02Icon" :size="13" class="text-neutral-400 dark:text-neutral-500 shrink-0" />
                      <span>{{ item.postedAt || fallbackPostedAtById[item.id] || 'Baru saja' }}</span>
                    </div>
                  </div>
                </div>

                <!-- Right Corner: Save (Bookmark) & Share Buttons -->
                <div class="flex items-center gap-2 shrink-0">
                  <!-- Save / Bookmark Button (Untuk UMKM) -->
                  <button
                    v-if="!item.isPlatformPost"
                    type="button"
                    :aria-label="item.bookmarked ? 'Hapus UMKM dari daftar simpan' : 'Simpan UMKM ke daftar simpan'"
                    :class="[
                      'w-9 h-9 rounded-xl transition-colors cursor-pointer flex items-center justify-center border shadow-none',
                      item.bookmarked
                        ? 'bg-[#E6F4F7] dark:bg-[#156374]/25 text-[#156374] dark:text-[#50AABF] border-[#156374]/35 dark:border-[#50AABF]/40'
                        : 'bg-white dark:bg-[#18191E] text-neutral-600 dark:text-neutral-300 border-[#CBD5E1] dark:border-neutral-700 hover:bg-[#F8FAFC] dark:hover:bg-[#262626] hover:text-neutral-900 dark:hover:text-white'
                    ]"
                    :title="item.bookmarked ? 'Hapus dari Simpanan' : 'Simpan ke Daftar Simpan'"
                    @click="toggleBookmarkWithFeedback(item)"
                  >
                    <HugeiconsIcon
                      :icon="Bookmark02Icon"
                      :size="17"
                      :stroke-width="2"
                      :class="item.bookmarked ? 'fill-current' : ''"
                    />
                  </button>

                  <!-- Share Button (Improved Icon: Share08Icon) -->
                  <button
                    type="button"
                    aria-label="Bagikan Tautan Postingan"
                    class="w-9 h-9 rounded-xl bg-white dark:bg-[#18191E] text-neutral-600 dark:text-neutral-300 border border-[#CBD5E1] dark:border-neutral-700 hover:bg-[#F8FAFC] dark:hover:bg-[#262626] hover:text-neutral-900 dark:hover:text-white transition-colors flex items-center justify-center cursor-pointer shadow-none"
                    title="Bagikan Tautan Postingan"
                    @click="copyShareLink(item)"
                  >
                    <HugeiconsIcon :icon="Share08Icon" :size="17" :stroke-width="2" />
                  </button>
                </div>
              </div>

              <!-- 2. Post Text (Font size matched to Sidebar 14px/15px font-poppins) -->
              <p class="text-[14px] sm:text-[15px] font-poppins text-neutral-700 dark:text-neutral-300 leading-relaxed">
                "{{ item.pitchSummary }}"
              </p>

              <!-- =================================================================================== -->
              <!-- 3. POST MEDIA CONTAINER (Ukuran 550 x 578, Single Post & Multi-Post LinkedIn Carousel) -->
              <!-- Desktop contract specification: max-w-[550px] h-[578px] aspect-[550/578] -->
              <!-- =================================================================================== -->
              <div
                class="feed-media-viewport relative w-full max-w-[550px] h-[260px] xs:h-[300px] sm:h-[578px] aspect-[4/3] xs:aspect-square sm:aspect-[550/578] mx-auto rounded-xl sm:rounded-2xl overflow-hidden border border-[#E2E8F0] dark:border-neutral-800 bg-neutral-900 select-none group/carousel shadow-none"
              >
                <!-- Horizontal Carousel Track -->
                <div
                  class="flex w-full h-full transition-transform duration-300 ease-out"
                  :style="{ transform: `translateX(-${getSlideIndex(item.id) * 100}%)` }"
                >
                  <div
                    v-for="(imgUrl, sIdx) in getPostImages(item)"
                    :key="`${item.id}-slide-${sIdx}`"
                    class="w-full h-full shrink-0 relative overflow-hidden bg-neutral-900"
                  >
                    <img
                      :src="imgUrl"
                      :alt="`${item.name} - Slide ${sIdx + 1}`"
                      loading="lazy"
                      decoding="async"
                      class="w-full h-full object-cover object-center cursor-pointer"
                      @click="openFullscreenPreview(item, getSlideIndex(item.id))"
                    />
                  </div>
                </div>

                <!-- Top-Left Multi-Post Slide Counter Pill (LinkedIn Style) -->
                <div
                  v-if="getPostImages(item).length > 1"
                  class="absolute top-3.5 left-3.5 z-20 px-2.5 py-1 rounded-full bg-neutral-950/75 text-white text-xs font-poppins font-semibold tabular-nums border border-white/15 backdrop-blur-xs pointer-events-none"
                >
                  {{ getSlideIndex(item.id) + 1 }} / {{ getPostImages(item).length }}
                </div>

                <!-- Top-Right Full Screen Preview Icon Button -->
                <button
                  type="button"
                  aria-label="Pratinjau Layar Penuh"
                  title="Pratinjau Layar Penuh"
                  class="absolute top-3.5 right-3.5 z-20 w-9 h-9 rounded-full bg-neutral-950/75 hover:bg-neutral-950 text-white border border-white/20 backdrop-blur-xs flex items-center justify-center transition-all duration-200 cursor-pointer shadow-none"
                  @click.stop="openFullscreenPreview(item, getSlideIndex(item.id))"
                >
                  <HugeiconsIcon :icon="FullScreenIcon" :size="17" :stroke-width="2.2" />
                </button>

                <!-- LinkedIn Carousel BEFORE (Previous) Button inside Carousel Container (Muncul ketika Next sudah ditekan / slide > 0, tanpa efek turun saat ditekan) -->
                <button
                  v-if="getPostImages(item).length > 1 && getSlideIndex(item.id) > 0"
                  type="button"
                  aria-label="Slide Sebelumnya (Before)"
                  title="Slide Sebelumnya"
                  class="carousel-before-btn absolute left-3 inset-y-0 my-auto z-20 w-9 h-9 rounded-full bg-neutral-950/75 hover:bg-neutral-950 text-white border border-white/25 backdrop-blur-xs flex items-center justify-center transition-colors duration-200 cursor-pointer shadow-none"
                  @click.stop="prevSlide(item)"
                >
                  <HugeiconsIcon :icon="ArrowLeft01Icon" :size="18" :stroke-width="2.4" />
                </button>

                <!-- LinkedIn Carousel NEXT Button inside Carousel Container (Tanpa efek turun saat ditekan) -->
                <button
                  v-if="getPostImages(item).length > 1 && getSlideIndex(item.id) < getPostImages(item).length - 1"
                  type="button"
                  aria-label="Slide Berikutnya (Next)"
                  title="Slide Berikutnya"
                  class="carousel-next-btn absolute right-3 inset-y-0 my-auto z-20 w-9 h-9 rounded-full bg-neutral-950/75 hover:bg-neutral-950 text-white border border-white/25 backdrop-blur-xs flex items-center justify-center transition-colors duration-200 cursor-pointer shadow-none"
                  @click.stop="nextSlide(item)"
                >
                  <HugeiconsIcon :icon="ArrowRight01Icon" :size="18" :stroke-width="2.4" />
                </button>

                <!-- Bottom Dot Indicators for Multi-Post Carousel -->
                <div
                  v-if="getPostImages(item).length > 1"
                  class="absolute bottom-3.5 left-1/2 -translate-x-1/2 z-20 px-2.5 py-1.5 rounded-full bg-neutral-950/65 backdrop-blur-xs border border-white/15 flex items-center gap-1.5"
                >
                  <button
                    v-for="(_, dIdx) in getPostImages(item)"
                    :key="`${item.id}-dot-${dIdx}`"
                    type="button"
                    :aria-label="`Pilih Slide ${dIdx + 1}`"
                    :class="[
                      'h-1.5 rounded-full transition-all duration-200 cursor-pointer',
                      getSlideIndex(item.id) === dIdx
                        ? 'w-4 bg-white'
                        : 'w-1.5 bg-white/50 hover:bg-white/80'
                    ]"
                    @click.stop="setSlideIndex(item.id, dIdx)"
                  />
                </div>
              </div>
            </div>

            <!-- 4. Post Footer Row: Informasi Konsultan Pendamping di Kiri & Button "Lihat Profil" di Kanan -->
            <div
              class="px-4 py-3.5 sm:px-6 sm:py-4 bg-[#F8FAFC] dark:bg-neutral-900/50 border-t border-neutral-100 dark:border-neutral-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
            >
              <div class="flex items-center gap-2 text-xs sm:text-[13px] min-w-0">
                <HugeiconsIcon
                  :icon="item.isPlatformPost ? SparklesIcon : Award01Icon"
                  :size="16"
                  class="text-[#156374] dark:text-[#50AABF] shrink-0"
                />
                <span v-if="item.isPlatformPost" class="text-neutral-600 dark:text-neutral-400">
                  Disusun oleh: <strong class="text-neutral-900 dark:text-white font-semibold">{{ item.consultantName }}</strong>
                </span>
                <span v-else class="text-neutral-600 dark:text-neutral-400">
                  Didampingi oleh: <strong class="text-neutral-900 dark:text-white font-semibold">{{ item.consultantName }}</strong>
                </span>
              </div>

              <div v-if="!item.isPlatformPost" class="flex items-center gap-2 w-full sm:w-auto">
                <BActionButton
                  :to="`/investor/umkm/${item.umkmRefId || item.id}`"
                  variant="default"
                  icon="chevron"
                  custom-class="flex-1 sm:flex-initial justify-center text-center py-2 sm:py-2.5 text-xs sm:text-sm"
                >
                  Lihat Profil
                </BActionButton>
              </div>
            </div>
          </article>

          <!-- Lazy Load Sentinel & Load More Fallback for 150+ Feed Items -->
          <div
            v-if="visibleFeedLimit < filteredFeed.length"
            ref="feedSentinelRef"
            class="py-4 flex flex-col items-center justify-center gap-3"
          >
            <button
              type="button"
              class="btn-pill-action cursor-pointer shadow-none"
              @click="loadMoreFeedItems"
            >
              <span>Muat Lebih Banyak ({{ filteredFeed.length - visibleFeedLimit }} tersisa)</span>
            </button>
          </div>
        </div>

        <!-- Empty State Filter Feed -->
        <div
          v-else
          class="card-tactile-gopay rounded-2xl p-10 sm:p-12 border text-center space-y-4 w-full max-w-[600px] mx-auto !shadow-none"
        >
          <div class="w-14 h-14 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-400 flex items-center justify-center mx-auto">
            <HugeiconsIcon :icon="Search01Icon" :size="24" />
          </div>
          <div>
            <h3 class="font-poppins font-semibold text-base text-neutral-900 dark:text-white">
              Tidak Ada UMKM yang Sesuai
            </h3>
            <p class="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 mt-1 max-w-sm mx-auto font-poppins">
              Cobalah memilih wilayah lain atau mengatur ulang pencarian Anda.
            </p>
          </div>
          <button
            type="button"
            class="btn-pill-action btn-pill-action-green mx-auto cursor-pointer shadow-none"
            @click="resetAllFilters"
          >
            <span>Reset Semua Filter</span>
          </button>
        </div>
      </main>

      <!-- ======================================================================================= -->
      <!-- KOLOM KANAN: Section "Profil" + Section "Pesan" (3 Chat History Terbaru)                -->
      <!-- ======================================================================================= -->
      <aside class="w-full lg:flex-1 min-w-0 lg:sticky lg:top-6 space-y-6">
        <!-- 1. Section Profil Investor (Title "Profil" di Luar Atas Container) -->
        <div class="space-y-2.5">
          <h2 class="text-base sm:text-lg font-poppins font-semibold text-neutral-900 dark:text-white px-0.5">
            Profil
          </h2>

          <NuxtLink
            to="/investor/profile"
            class="card-tactile-gopay rounded-2xl p-4 sm:p-5 border border-[#CBD5E1] dark:border-neutral-800 bg-[#FFFFFF] dark:bg-[#13161F] !shadow-none flex items-center gap-3.5 hover:border-neutral-300 dark:hover:border-neutral-700 transition-colors cursor-pointer group"
            title="Kelola Profil Investor"
          >
            <!-- Profile Image on Left -->
            <div class="w-13 h-13 sm:w-14 sm:h-14 rounded-full overflow-hidden border border-slate-200 dark:border-neutral-700 bg-neutral-100 dark:bg-neutral-800 shrink-0">
              <img
                :src="investorStore.profile.avatarUrl || authStore.currentUser?.avatar || '/images/user-profile.png'"
                :alt="investorStore.profile.name || 'Foto Profil Investor'"
                loading="lazy"
                decoding="async"
                class="w-full h-full object-cover"
              />
            </div>

            <!-- Investor Name on Right & Company / PT Name Below -->
            <div class="min-w-0 flex-1">
              <h3 class="font-poppins font-semibold text-sm sm:text-base text-neutral-900 dark:text-white truncate group-hover:text-[#156374] dark:group-hover:text-[#50AABF] transition-colors">
                {{ investorStore.profile.name || authStore.currentUser?.name || 'Investor Rekanan' }}
              </h3>
              <p class="text-xs sm:text-[13px] font-poppins text-neutral-500 dark:text-neutral-400 truncate mt-0.5">
                {{ investorStore.profile.companyName || authStore.currentUser?.businessName || 'PT Nusantara Kapital Investama' }}
              </p>
            </div>
          </NuxtLink>
        </div>

        <!-- 2. Section Pesan (Title "Pesan" di Luar Atas Container 3 Chat History Terbaru) -->
        <div class="space-y-2.5">
          <h2 class="text-base sm:text-lg font-poppins font-semibold text-neutral-900 dark:text-white px-0.5">
            Pesan
          </h2>

          <div
            class="card-tactile-gopay rounded-2xl border border-[#CBD5E1] dark:border-neutral-800 bg-[#FFFFFF] dark:bg-[#13161F] !shadow-none overflow-hidden font-poppins"
          >
            <div class="divide-y divide-[#E2E8F0] dark:divide-neutral-800">
              <NuxtLink
                v-for="chat in recentUmkmChats"
                :key="chat.id"
                to="/investor/pesan"
                class="px-4 sm:px-5 py-3.5 flex items-center justify-between gap-3.5 hover:bg-[#F8FAFC] dark:hover:bg-[#18191E] transition-colors cursor-pointer group"
              >
                <!-- Kiri: Profile Image UMKM + Nama UMKM & Chat Terakhir -->
                <div class="flex items-center gap-3 min-w-0 flex-1">
                  <div class="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-amber-400/90 dark:bg-amber-500/90 p-2 shrink-0 flex items-center justify-center border border-amber-300/60 overflow-hidden shadow-none">
                    <img
                      :src="chat.avatarUrl || '/logo.svg'"
                      :alt="chat.umkmName"
                      loading="lazy"
                      decoding="async"
                      class="w-full h-full object-contain rounded-full"
                    />
                  </div>

                  <div class="min-w-0 flex-1 space-y-1">
                    <h3 class="font-poppins font-semibold text-sm text-neutral-900 dark:text-white truncate group-hover:text-[#156374] dark:group-hover:text-[#50AABF] transition-colors leading-snug">
                      {{ chat.umkmName }}
                    </h3>
                    <p class="text-xs font-poppins text-neutral-500 dark:text-neutral-400 truncate leading-snug">
                      {{ chat.lastMessage }}
                    </p>
                  </div>
                </div>

                <!-- Kanan: Status Online (jika online) atau Jam Terakhir Komunikasi -->
                <div class="shrink-0 text-right">
                  <span
                    v-if="chat.online"
                    class="inline-flex items-center gap-1.5 text-xs font-poppins font-semibold text-[#00800e] dark:text-[#00C058]"
                  >
                    <span class="w-2 h-2 rounded-full bg-[#00800e] dark:bg-[#00C058] shrink-0" />
                    <span>Online</span>
                  </span>
                  <span
                    v-else
                    class="text-xs font-poppins font-medium text-neutral-400 dark:text-neutral-500 tabular-nums"
                  >
                    {{ chat.lastTime }}
                  </span>
                </div>
              </NuxtLink>
            </div>
          </div>
        </div>
      </aside>
    </div>

    <!-- ========================================================================================= -->
    <!-- 3. FULL SCREEN PREVIEW MODAL (Selayar Penuh dengan Minimize Button Animasi Berputar & Next/Before) -->
    <!-- ========================================================================================= -->
    <Teleport to="body">
      <div
        v-if="fullscreenPost"
        class="fixed inset-0 z-[100] bg-black/90 backdrop-blur-md flex flex-col items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200 font-poppins select-none"
        role="dialog"
        aria-modal="true"
        aria-label="Pratinjau Gambar Layar Penuh"
        @click.self="closeFullscreenPreview"
      >
        <!-- Top Bar inside Fullscreen Preview: Post Info -->
        <div class="w-full max-w-4xl flex items-center justify-between gap-4 mb-3.5 z-30">
          <div class="flex items-center gap-3 min-w-0 text-white">
            <div class="w-9 h-9 rounded-full bg-neutral-900 border border-white/20 p-1.5 flex items-center justify-center shrink-0 overflow-hidden">
              <img
                :src="fullscreenPost.isPlatformPost ? '/logo/logoSmall.svg' : '/logo.svg'"
                :alt="fullscreenPost.name"
                class="w-full h-full object-contain rounded-full"
              />
            </div>
            <div class="min-w-0">
              <h3 class="text-sm sm:text-base font-poppins font-semibold text-white truncate leading-tight">
                {{ fullscreenPost.name }}
              </h3>
              <p class="text-xs text-neutral-300 truncate">
                {{ fullscreenPost.postedAt }}
                <template v-if="getPostImages(fullscreenPost).length > 1">
                  • Slide {{ fullscreenSlideIndex + 1 }} dari {{ getPostImages(fullscreenPost).length }}
                </template>
              </p>
            </div>
          </div>
        </div>

        <!-- Main Fullscreen Carousel Stage -->
        <div
          class="relative w-full max-w-4xl flex-1 max-h-[82vh] flex items-center justify-center overflow-hidden rounded-2xl border border-white/20 bg-neutral-950"
        >
          <img
            :src="getPostImages(fullscreenPost)[fullscreenSlideIndex]"
            :alt="`${fullscreenPost.name} - Pratinjau Penuh ${fullscreenSlideIndex + 1}`"
            class="max-w-full max-h-[80vh] w-auto h-auto object-contain select-none transition-all duration-300"
          />

          <!-- Top-Left Slide Counter Pill inside Fullscreen Container -->
          <div
            v-if="getPostImages(fullscreenPost).length > 1"
            class="absolute top-4 left-4 z-30 px-3 py-1 rounded-full bg-neutral-900/90 text-white text-xs font-poppins font-semibold tabular-nums border border-white/25 backdrop-blur-xs pointer-events-none"
          >
            {{ fullscreenSlideIndex + 1 }} / {{ getPostImages(fullscreenPost).length }}
          </div>

          <!-- Single Exit Button (Silang / Cancel01Icon) dengan Animasi Berputar -->
          <button
            type="button"
            aria-label="Tutup Pratinjau Layar Penuh"
            title="Tutup Pratinjau Layar Penuh"
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

          <!-- Fullscreen BEFORE (Previous) Button -->
          <button
            v-if="getPostImages(fullscreenPost).length > 1 && fullscreenSlideIndex > 0"
            type="button"
            aria-label="Slide Sebelumnya di Layar Penuh"
            title="Slide Sebelumnya (Before)"
            class="absolute left-4 inset-y-0 my-auto z-30 w-11 h-11 rounded-full bg-neutral-900/90 hover:bg-neutral-800 text-white border border-white/30 backdrop-blur-xs flex items-center justify-center transition-colors duration-200 cursor-pointer shadow-none"
            @click.stop="prevFullscreenSlide"
          >
            <HugeiconsIcon :icon="ArrowLeft01Icon" :size="20" :stroke-width="2.4" />
          </button>

          <!-- Fullscreen NEXT Button -->
          <button
            v-if="getPostImages(fullscreenPost).length > 1 && fullscreenSlideIndex < getPostImages(fullscreenPost).length - 1"
            type="button"
            aria-label="Slide Berikutnya di Layar Penuh"
            title="Slide Berikutnya (Next)"
            class="absolute right-4 inset-y-0 my-auto z-30 w-11 h-11 rounded-full bg-neutral-900/90 hover:bg-neutral-800 text-white border border-white/30 backdrop-blur-xs flex items-center justify-center transition-colors duration-200 cursor-pointer shadow-none"
            @click.stop="nextFullscreenSlide"
          >
            <HugeiconsIcon :icon="ArrowRight01Icon" :size="20" :stroke-width="2.4" />
          </button>

          <!-- Fullscreen Bottom Dot Indicators -->
          <div
            v-if="getPostImages(fullscreenPost).length > 1"
            class="absolute bottom-4 left-1/2 -translate-x-1/2 z-30 px-3 py-1.5 rounded-full bg-neutral-900/90 border border-white/20 flex items-center gap-2"
          >
            <button
              v-for="(_, fIdx) in getPostImages(fullscreenPost)"
              :key="`fs-dot-${fIdx}`"
              type="button"
              :aria-label="`Pilih Slide Layar Penuh ${fIdx + 1}`"
              :class="[
                'h-2 rounded-full transition-all duration-200 cursor-pointer',
                fullscreenSlideIndex === fIdx
                  ? 'w-5 bg-white'
                  : 'w-2 bg-white/45 hover:bg-white/80'
              ]"
              @click.stop="setFullscreenSlide(fIdx)"
            />
          </div>
        </div>
      </div>
    </Teleport>

    <!-- ========================================================================================= -->
    <!-- 4. MODAL FILTER WILAYAH SELURUH INDONESIA (DENGAN KONSEP CHECKLIST)                        -->
    <!-- ========================================================================================= -->
    <Teleport to="body">
      <div
        v-if="isLocationModalOpen"
        class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-150 font-poppins"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-wilayah-title"
        @click.self="isLocationModalOpen = false"
      >
        <div class="w-full max-w-2xl rounded-[22px] bg-[#FFFFFF] dark:bg-[#13161F] border border-[#CBD5E1] dark:border-neutral-800 shadow-none overflow-hidden flex flex-col max-h-[86vh]">
          <!-- Modal Header -->
          <div class="px-6 py-4 sm:py-5 border-b border-neutral-100 dark:border-neutral-800 flex items-start justify-between gap-4 shrink-0">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-xl bg-[#E6F4F7] dark:bg-[#156374]/25 text-[#156374] dark:text-[#50AABF] flex items-center justify-center shrink-0">
                <HugeiconsIcon :icon="Location01Icon" :size="20" :stroke-width="2" />
              </div>
              <div>
                <h2 id="modal-wilayah-title" class="text-base sm:text-lg font-poppins font-bold text-neutral-900 dark:text-white leading-tight">
                  Pilih Wilayah Indonesia
                </h2>
                <p class="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
                  Centang satu atau beberapa kota di seluruh Indonesia untuk menyaring peluang UMKM.
                </p>
              </div>
            </div>

            <button
              type="button"
              class="w-8 h-8 rounded-lg text-neutral-400 hover:text-neutral-700 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 flex items-center justify-center transition-colors cursor-pointer shrink-0"
              aria-label="Tutup Modal Wilayah"
              @click="isLocationModalOpen = false"
            >
              <HugeiconsIcon :icon="Cancel01Icon" :size="18" :stroke-width="2.2" />
            </button>
          </div>

          <!-- Search & "Semua Wilayah" Master Checklist Row -->
          <div class="px-6 pt-4 pb-3 border-b border-neutral-100 dark:border-neutral-800 space-y-3 shrink-0 bg-[#F8FAFC]/60 dark:bg-[#18191E]/50">
            <!-- Search Input inside Modal -->
            <div class="relative">
              <span class="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none flex items-center">
                <HugeiconsIcon :icon="Search01Icon" :size="16" :stroke-width="2" />
              </span>
              <input
                v-model="locationSearchQuery"
                type="text"
                placeholder="Cari kota atau wilayah di seluruh Indonesia (misal: Surabaya, Medan, Makassar)..."
                class="input-tactile-gopay has-prefix-icon !h-10 text-xs sm:text-sm bg-white dark:bg-[#13161F]"
              />
              <button
                v-if="locationSearchQuery"
                type="button"
                class="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-700 dark:hover:text-white cursor-pointer"
                @click="locationSearchQuery = ''"
              >
                <HugeiconsIcon :icon="Cancel01Icon" :size="14" />
              </button>
            </div>

            <!-- Master Option: Semua Wilayah (Seluruh Indonesia) -->
            <div
              class="p-3 sm:p-3.5 rounded-xl border transition-all flex items-center justify-between gap-3 cursor-pointer select-none shadow-none"
              :class="[
                investorStore.selectedCities.length === 0
                  ? 'border-[#00800e]/30 dark:border-[#00C058]/40 bg-[#F6FCF7] dark:bg-[#00800e]/10'
                  : 'border-[#CBD5E1] dark:border-neutral-800 bg-white dark:bg-[#18191E] hover:bg-[#F8FAFC] dark:hover:bg-[#262626]'
              ]"
              @click="investorStore.clearCitySelection()"
            >
              <div class="min-w-0 pr-2">
                <span class="text-xs sm:text-sm font-semibold text-neutral-900 dark:text-white block">
                  Semua Wilayah (Seluruh Indonesia)
                </span>
                <span class="text-[11px] text-neutral-500 dark:text-neutral-400 block">
                  Tampilkan seluruh peluang usaha UMKM dari Sabang sampai Merauke tanpa batasan kota
                </span>
              </div>
              <div
                :class="[
                  'w-5 h-5 rounded-md border flex items-center justify-center shrink-0 transition-colors',
                  investorStore.selectedCities.length === 0
                    ? 'border-[#00800e] dark:border-[#00C058] bg-[#00800e] dark:bg-[#00C058] text-white'
                    : 'border-slate-300 dark:border-neutral-600 bg-white dark:bg-neutral-800 text-transparent'
                ]"
              >
                <HugeiconsIcon v-if="investorStore.selectedCities.length === 0" :icon="Tick02Icon" :size="13" :stroke-width="3" />
              </div>
            </div>
          </div>

          <!-- Scrollable Checklist Body: Grouped by Islands / Regions Across Indonesia -->
          <div class="px-6 py-4 overflow-y-auto space-y-5 flex-1">
            <template v-if="filteredIndonesiaRegions.length > 0">
              <div
                v-for="region in filteredIndonesiaRegions"
                :key="region.island"
                class="space-y-2.5"
              >
                <div class="flex items-center justify-between">
                  <span class="text-xs font-poppins font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
                    {{ region.island }}
                  </span>
                  <button
                    type="button"
                    class="text-[11px] font-semibold text-[#156374] dark:text-[#50AABF] hover:underline cursor-pointer"
                    @click="toggleEntireRegion(region.cities)"
                  >
                    {{ isRegionFullySelected(region.cities) ? 'Batal Pilih Pulau Ini' : 'Pilih Semua di Pulau Ini' }}
                  </button>
                </div>

                <!-- Checklist Grid for Cities in Region -->
                <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
                  <div
                    v-for="city in region.cities"
                    :key="city"
                    class="p-3 rounded-xl border transition-all flex items-center justify-between gap-2.5 cursor-pointer select-none shadow-none"
                    :class="[
                      isCityChecked(city)
                        ? 'border-[#00800e]/30 dark:border-[#00C058]/40 bg-[#F6FCF7] dark:bg-[#00800e]/10'
                        : 'border-[#CBD5E1] dark:border-neutral-800 bg-white dark:bg-[#18191E] hover:bg-[#F8FAFC] dark:hover:bg-[#262626]'
                    ]"
                    @click="investorStore.toggleCitySelection(city)"
                  >
                    <span class="text-xs sm:text-[13px] font-semibold text-neutral-800 dark:text-neutral-200 truncate">
                      {{ city }}
                    </span>
                    <div
                      :class="[
                        'w-5 h-5 rounded-md border flex items-center justify-center shrink-0 transition-colors',
                        isCityChecked(city)
                          ? 'border-[#00800e] dark:border-[#00C058] bg-[#00800e] dark:bg-[#00C058] text-white'
                          : 'border-slate-300 dark:border-neutral-600 bg-white dark:bg-neutral-800 text-transparent'
                      ]"
                    >
                      <HugeiconsIcon v-if="isCityChecked(city)" :icon="Tick02Icon" :size="13" :stroke-width="3" />
                    </div>
                  </div>
                </div>
              </div>
            </template>

            <!-- Empty Search Result inside Modal -->
            <div v-else class="py-8 text-center space-y-2">
              <p class="text-xs sm:text-sm font-semibold text-neutral-700 dark:text-neutral-300">
                Kota "{{ locationSearchQuery }}" tidak ditemukan
              </p>
              <p class="text-xs text-neutral-500">
                Coba gunakan nama kota atau pulau lain di Indonesia.
              </p>
            </div>
          </div>

          <!-- Modal Footer -->
          <div class="px-6 py-4 border-t border-neutral-100 dark:border-neutral-800 bg-[#F8FAFC] dark:bg-[#18191E] flex flex-col sm:flex-row sm:items-center justify-between gap-3 shrink-0">
            <div class="flex items-center gap-3 text-xs">
              <span class="font-medium text-neutral-600 dark:text-neutral-400">
                Status:
                <strong class="text-neutral-900 dark:text-white font-semibold">
                  {{ investorStore.selectedCities.length === 0 ? 'Semua Wilayah Indonesia' : `${investorStore.selectedCities.length} Kota Dipilih` }}
                </strong>
              </span>
              <button
                v-if="investorStore.selectedCities.length > 0"
                type="button"
                class="text-xs font-semibold text-red-600 dark:text-red-400 hover:underline cursor-pointer"
                @click="investorStore.clearCitySelection()"
              >
                Reset Pilihan
              </button>
            </div>

            <div class="flex items-center justify-end gap-2.5">
              <BActionButton
                variant="green"
                :huge-icon="CheckmarkCircle01Icon"
                custom-class="w-full sm:w-auto justify-center"
                @click="isLocationModalOpen = false"
              >
                Terapkan Wilayah
              </BActionButton>
            </div>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, onBeforeUnmount } from 'vue'
import gsap from 'gsap'
import { useInvestorStore, type MarketplaceUmkm } from '~/stores/investor'
import { useAuthStore } from '~/stores/auth'
import { useChatStore } from '~/stores/chat'
import BActionButton from '~/components/base/BActionButton.vue'
import { HugeiconsIcon } from '@hugeicons/vue'
import {
  Search01Icon,
  CheckmarkCircle01Icon,
  Bookmark02Icon,
  Store01Icon,
  Location01Icon,
  Building03Icon,
  Award01Icon,
  Coins01Icon,
  MoneyBag01Icon,
  AnalyticsUpIcon,
  Share08Icon,
  ArrowDown01Icon,
  ArrowLeft01Icon,
  ArrowRight01Icon,
  Cancel01Icon,
  Tick02Icon,
  Time02Icon,
  FullScreenIcon,
  SparklesIcon
} from '@hugeicons/core-free-icons'

definePageMeta({
  layout: 'dashboard',
  hideHeader: true
})

const investorStore = useInvestorStore()
const authStore = useAuthStore()

const pageRootRef = ref<HTMLElement | null>(null)
const feedSentinelRef = ref<HTMLElement | null>(null)
const visibleFeedLimit = ref(10)
let gsapCtx: gsap.Context | null = null
let feedObserver: IntersectionObserver | null = null

function loadMoreFeedItems() {
  if (visibleFeedLimit.value < filteredFeed.value.length) {
    visibleFeedLimit.value = Math.min(filteredFeed.value.length, visibleFeedLimit.value + 8)
  }
}

function setupFeedLazyObserver() {
  if (typeof window === 'undefined' || !('IntersectionObserver' in window)) return
  if (feedObserver) {
    feedObserver.disconnect()
  }
  feedObserver = new IntersectionObserver(
    entries => {
      if (entries.some(e => e.isIntersecting)) {
        loadMoreFeedItems()
      }
    },
    { rootMargin: '320px 0px' }
  )
  if (feedSentinelRef.value) {
    feedObserver.observe(feedSentinelRef.value)
  }
}

watch(feedSentinelRef, el => {
  if (el && feedObserver) {
    feedObserver.observe(el)
  }
})

watch(
  () => [investorStore.searchQuery, investorStore.selectedSector, investorStore.selectedCities.length],
  () => {
    visibleFeedLimit.value = 10
  }
)

onMounted(async () => {
  investorStore.initPostsFromStorage()
  await investorStore.fetchMarketplace()
  await investorStore.fetchWatchlist()
  await chatStore.fetchThreads()
  setupFeedLazyObserver()

  if (typeof window !== 'undefined' && pageRootRef.value) {
    const prefersReducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches
    if (!prefersReducedMotion) {
      gsapCtx = gsap.context(() => {
        const cards = pageRootRef.value?.querySelectorAll('.gsap-feed-card, aside .card-tactile-gopay')
        if (cards && cards.length > 0) {
          gsap.fromTo(
            Array.from(cards).slice(0, 8),
            { opacity: 0, y: 16 },
            {
              opacity: 1,
              y: 0,
              duration: 0.45,
              stagger: 0.055,
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
  if (feedObserver) {
    feedObserver.disconnect()
    feedObserver = null
  }
  if (gsapCtx) {
    gsapCtx.revert()
    gsapCtx = null
  }
})

// 3 Chat History Terbaru di bawah Profil Investor
interface RecentUmkmChat {
  id: string
  umkmName: string
  avatarUrl: string
  lastMessage: string
  lastTime: string
  online: boolean
}

const chatStore = useChatStore()
const recentUmkmChats = computed<RecentUmkmChat[]>(() => {
  return (chatStore.threads || []).slice(0, 3).map(t => ({
    id: t.id,
    umkmName: t.participantName || (t.participant as any)?.name || 'Mitra Usaha',
    avatarUrl: t.participantAvatar || '/logo.svg',
    lastMessage: t.lastMessage || 'Mulai percakapan bisnis...',
    lastTime: t.lastMessageAt ? new Date(t.lastMessageAt).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }) : 'Baru',
    online: !!t.isOnline
  }))
})

// Carousel Slide State per Post ID + HMR-Safe Fallback Multi-Image Dummy Slides
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
  ],
  'umkm-05': [
    'https://images.unsplash.com/photo-1599490659213-e2b9527bd087?w=900&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=900&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1621996346565-e3d5d6281298?w=900&auto=format&fit=crop&q=80'
  ],
  'umkm-07': [
    'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=900&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=900&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=900&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=900&auto=format&fit=crop&q=80'
  ],
  'umkm-09': [
    'https://images.unsplash.com/photo-1544025162-d76694265947?w=900&auto=format&fit=crop&q=80'
  ],
  'umkm-12': [
    'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=900&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=900&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1505576399279-565b52d4ac71?w=900&auto=format&fit=crop&q=80'
  ],
  'platform-tips-01': [
    'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=900&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=900&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=900&auto=format&fit=crop&q=80'
  ],
  'platform-tips-02': [
    'https://images.unsplash.com/photo-1579532537598-459ecdaf39cc?w=900&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=900&auto=format&fit=crop&q=80'
  ]
}

const fallbackPostedAtById: Record<string, string> = {
  'umkm-01': '2 jam yang lalu',
  'umkm-03': '5 jam yang lalu',
  'umkm-05': 'Kemarin • 16:40 WIB',
  'umkm-07': '2 hari yang lalu',
  'umkm-09': '3 hari yang lalu',
  'umkm-12': '4 hari yang lalu',
  'platform-tips-01': '3 jam yang lalu',
  'platform-tips-02': '1 hari yang lalu'
}

function getPostImages(item: MarketplaceUmkm): string[] {
  if (item.postImages && item.postImages.length > 1) {
    return item.postImages
  }
  if (fallbackPostImagesById[item.id] && fallbackPostImagesById[item.id]!.length > 0) {
    return fallbackPostImagesById[item.id]!
  }
  if (item.postImages && item.postImages.length > 0) {
    return item.postImages
  }
  return [item.postImageUrl || '/images/default-store-banner.jpg']
}

function getSlideIndex(postId: string): number {
  return activeSlides.value[postId] ?? 0
}

function setSlideIndex(postId: string, index: number) {
  activeSlides.value[postId] = index
}

function nextSlide(item: MarketplaceUmkm) {
  const images = getPostImages(item)
  const current = getSlideIndex(item.id)
  if (current < images.length - 1) {
    activeSlides.value[item.id] = current + 1
  }
}

function prevSlide(item: MarketplaceUmkm) {
  const current = getSlideIndex(item.id)
  if (current > 0) {
    activeSlides.value[item.id] = current - 1
  }
}

// Fullscreen Preview State
const fullscreenPost = ref<MarketplaceUmkm | null>(null)
const fullscreenSlideIndex = ref(0)

function openFullscreenPreview(item: MarketplaceUmkm, slideIndex = 0) {
  fullscreenPost.value = item
  fullscreenSlideIndex.value = slideIndex
}

function closeFullscreenPreview() {
  fullscreenPost.value = null
}

function nextFullscreenSlide() {
  if (!fullscreenPost.value) return
  const images = getPostImages(fullscreenPost.value)
  if (fullscreenSlideIndex.value < images.length - 1) {
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

function setFullscreenSlide(index: number) {
  if (!fullscreenPost.value) return
  fullscreenSlideIndex.value = index
  activeSlides.value[fullscreenPost.value.id] = index
}

// Modal Pilih Wilayah (Seluruh Indonesia Checklist)
const isLocationModalOpen = ref(false)
const locationSearchQuery = ref('')

interface IndonesiaRegionGroup {
  island: string
  cities: string[]
}

const indonesiaRegions: IndonesiaRegionGroup[] = [
  {
    island: 'Pulau Jawa',
    cities: [
      'Jakarta',
      'Bandung',
      'Surabaya',
      'Malang',
      'Solo',
      'Yogyakarta',
      'Semarang',
      'Bogor',
      'Tangerang',
      'Bekasi',
      'Depok',
      'Cirebon'
    ]
  },
  {
    island: 'Pulau Sumatera',
    cities: [
      'Medan',
      'Padang',
      'Palembang',
      'Pekanbaru',
      'Bandar Lampung',
      'Banda Aceh',
      'Batam',
      'Jambi',
      'Bengkulu',
      'Pangkalpinang'
    ]
  },
  {
    island: 'Bali & Nusa Tenggara',
    cities: [
      'Denpasar',
      'Badung',
      'Gianyar',
      'Mataram',
      'Labuan Bajo',
      'Kupang'
    ]
  },
  {
    island: 'Pulau Kalimantan',
    cities: [
      'Balikpapan',
      'Samarinda',
      'Banjarmasin',
      'Pontianak',
      'Palangkaraya',
      'Tarakan'
    ]
  },
  {
    island: 'Pulau Sulawesi',
    cities: [
      'Makassar',
      'Manado',
      'Kendari',
      'Palu',
      'Gorontalo',
      'Parepare'
    ]
  },
  {
    island: 'Maluku & Papua',
    cities: [
      'Ambon',
      'Ternate',
      'Jayapura',
      'Sorong',
      'Manokwari',
      'Merauke'
    ]
  }
]

const filteredIndonesiaRegions = computed<IndonesiaRegionGroup[]>(() => {
  const q = locationSearchQuery.value.toLowerCase().trim()
  if (!q) return indonesiaRegions

  return indonesiaRegions
    .map(region => {
      const islandMatch = region.island.toLowerCase().includes(q)
      const matchedCities = islandMatch
        ? region.cities
        : region.cities.filter(city => city.toLowerCase().includes(q))
      return {
        island: region.island,
        cities: matchedCities
      }
    })
    .filter(region => region.cities.length > 0)
})

function isCityChecked(city: string): boolean {
  return investorStore.selectedCities.includes(city)
}

function isRegionFullySelected(cities: string[]): boolean {
  return cities.length > 0 && cities.every(c => investorStore.selectedCities.includes(c))
}

function toggleEntireRegion(cities: string[]) {
  if (isRegionFullySelected(cities)) {
    for (const c of cities) {
      if (investorStore.selectedCities.includes(c)) {
        investorStore.toggleCitySelection(c)
      }
    }
  } else {
    for (const c of cities) {
      if (!investorStore.selectedCities.includes(c)) {
        investorStore.toggleCitySelection(c)
      }
    }
  }
}

const activeCityLabel = computed(() => {
  const count = investorStore.selectedCities.length
  if (count === 0) return 'Semua Wilayah'
  if (count === 1) return investorStore.selectedCities[0]
  return 'Kostum'
})

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

function resetAllFilters() {
  investorStore.searchQuery = ''
  investorStore.selectedSector = 'ALL'
  investorStore.clearCitySelection()
  investorStore.minMargin = 0
}

// Fallback Platform Posts (HMR-Safe jika store sudah ter-mount sebelumnya)
const fallbackPlatformPosts: MarketplaceUmkm[] = [
  {
    id: 'platform-tips-01',
    name: 'Beruang Official',
    code: 'BERU-TIPS-01',
    sector: 'Tips & Trick Investasi UMKM',
    city: 'Edukasi Platform',
    establishedYear: 2026,
    postedAt: '3 jam yang lalu',
    fundingTarget: 0,
    marginPercentage: 0,
    growthYoY: 0,
    healthScore: 100,
    certifiedAt: '',
    consultantName: 'Tim Riset & Kepatuhan Beruang',
    pitchSummary: 'Tips & Trick Membaca Kualitas Kas UMKM: Sebelum menyalurkan modal, perhatikan 3 indikator utama pada Ruang Data — rasio untung bersih yang stabil di atas 35%, disiplin pemisahan rekening operasional toko dari rekening pribadi, serta konsistensi pencatatan mutasi kas harian.',
    postImageUrl: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=900&auto=format&fit=crop&q=80',
    postImages: fallbackPostImagesById['platform-tips-01']!,
    isPlatformPost: true,
    platformCategory: 'Tips & Trick',
    tags: ['Tips & Trick', 'Edukasi Investor'],
    accessStatus: 'NONE',
    bookmarked: false
  },
  {
    id: 'platform-tips-02',
    name: 'Beruang Official',
    code: 'BERU-TIPS-02',
    sector: 'Tips & Trick Strategi Portofolio',
    city: 'Edukasi Platform',
    establishedYear: 2026,
    postedAt: '1 hari yang lalu',
    fundingTarget: 0,
    marginPercentage: 0,
    growthYoY: 0,
    healthScore: 100,
    certifiedAt: '',
    consultantName: 'Tim Riset & Kepatuhan Beruang',
    pitchSummary: 'Tips & Trick Diversifikasi Sektor UMKM: Mengombinasikan pendanaan pada sektor F&B perputaran kas harian dengan sektor kriya berorientasi ekspor membantu menjaga stabilitas imbal bagi hasil bulanan terhadap siklus musiman.',
    postImageUrl: 'https://images.unsplash.com/photo-1579532537598-459ecdaf39cc?w=900&auto=format&fit=crop&q=80',
    postImages: fallbackPostImagesById['platform-tips-02']!,
    isPlatformPost: true,
    platformCategory: 'Tips & Trick',
    tags: ['Tips & Trick', 'Strategi Portofolio'],
    accessStatus: 'NONE',
    bookmarked: false
  }
]

// Feed Filtering + Interleaving Platform "Tips & Trick" Posts
const filteredFeed = computed<MarketplaceUmkm[]>(() => {
  const q = investorStore.searchQuery.toLowerCase().trim()
  const sourceList = investorStore.marketplaceList || []

  const umkmFiltered = sourceList.filter(item => {
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
      investorStore.selectedCities.length === 0 ||
      investorStore.selectedCities.some(c => c.toLowerCase() === item.city.toLowerCase())

    return matchSearch && matchSector && matchCity
  })

  const platformSource =
    investorStore.platformPosts && investorStore.platformPosts.length > 0
      ? investorStore.platformPosts
      : fallbackPlatformPosts

  const platformFiltered = platformSource.filter(post => {
    if (!q) return true
    return (
      post.name.toLowerCase().includes(q) ||
      post.sector.toLowerCase().includes(q) ||
      post.pitchSummary.toLowerCase().includes(q) ||
      (post.platformCategory || '').toLowerCase().includes(q)
    )
  })

  if (umkmFiltered.length === 0) {
    return []
  }

  // Sisipkan postingan Tips & Trick dari platform di sela-sela postingan UMKM
  const combined: MarketplaceUmkm[] = []
  let platformIdx = 0

  umkmFiltered.forEach((umkmItem, idx) => {
    combined.push(umkmItem)
    // Tempatkan postingan platform setelah item ke-1 dan ke-3
    if ((idx === 0 || idx === 2) && platformIdx < platformFiltered.length) {
      combined.push(platformFiltered[platformIdx]!)
      platformIdx += 1
    }
  })

  return combined
})

const visibleFeedItems = computed<MarketplaceUmkm[]>(() => {
  return filteredFeed.value.slice(0, visibleFeedLimit.value)
})

// Save / Bookmark Action with Instant Feedback
function toggleBookmarkWithFeedback(item: MarketplaceUmkm) {
  investorStore.toggleBookmark(item.id)
  if (item.bookmarked) {
    triggerToast(`${item.name} disimpan ke daftar Simpan!`)
  } else {
    triggerToast(`${item.name} dihapus dari daftar Simpan.`)
  }
}

// Share Link Action
function copyShareLink(item: MarketplaceUmkm) {
  if (import.meta.client) {
    const url = item.isPlatformPost
      ? `${window.location.origin}/investor#${item.id}`
      : `${window.location.origin}/investor/umkm/${item.id}`
    navigator.clipboard.writeText(url)
    triggerToast(`Tautan postingan ${item.name} berhasil disalin!`)
  }
}
</script>

<style scoped>
@media (max-width: 639px) {
  .feed-media-viewport {
    height: 270px !important;
    max-height: 72vw !important;
    aspect-ratio: 4 / 3 !important;
    border-radius: 14px !important;
  }
}
@media (min-width: 480px) and (max-width: 639px) {
  .feed-media-viewport {
    height: 310px !important;
    max-height: 80vw !important;
    aspect-ratio: 1 / 1 !important;
  }
}
</style>
