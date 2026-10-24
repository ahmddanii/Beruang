<template>
  <div class="space-y-6 sm:space-y-8 pb-16 font-poppins text-neutral-900 dark:text-neutral-100">
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
    <!-- 1. TOP HEADER: Page Title & Watchlist Action Button (100% Identical to UMKM Standard)       -->
    <!-- No artificial gradient box around icon, raw HugeiconsIcon 26px with font-semibold 2xl/3xl  -->
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
          Katalog
        </h1>
      </div>

      <!-- Action Button to Watchlist / Saved Opportunities (UMKM Header Standard) -->
      <div class="flex items-center gap-2.5 shrink-0 w-full sm:w-auto [&>*]:w-full sm:[&>*]:w-auto">
        <BActionButton
          to="/investor/watchlist"
          variant="default"
          icon="chevron"
          custom-class="w-full sm:w-auto justify-center text-center"
          title="Portofolio Pantau"
        >
          Portofolio Pantau ({{ investorStore.watchlist.length }})
        </BActionButton>
      </div>
    </div>

    <!-- ========================================================================================= -->
    <!-- 2. DIRECTORY FEED LAYOUT (2 Columns: Feed on Left, Investor Profile on Right)             -->
    <!-- ========================================================================================= -->
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-6 items-start font-poppins">

      <!-- ======================================================================================= -->
      <!-- KOLOM KIRI (8-9 Cols Desktop): Feed Peluang Usaha UMKM                                    -->
      <!-- ======================================================================================= -->
      <main class="lg:col-span-8 xl:col-span-9 space-y-5">

        <!-- A. FEED TELEMETRY TOOLBAR (No duplicate search bar; search is handled in centered navbar) -->
        <div class="card-tactile-gopay rounded-2xl p-4 border flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div class="flex items-center gap-2 text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 font-medium">
            <HugeiconsIcon :icon="Store01Icon" :size="16" class="text-[#00800e] dark:text-[#00C058] shrink-0" />
            <span>Menampilkan <strong class="font-semibold text-neutral-900 dark:text-white tabular-nums">{{ filteredFeed.length }}</strong> Usaha Terverifikasi</span>
          </div>

          <!-- Secondary Filter Controls: City & Sort -->
          <div class="flex items-center gap-3 text-xs flex-wrap self-end sm:self-auto">
            <!-- City Selector -->
            <div class="flex items-center gap-1.5 text-neutral-500 dark:text-neutral-400">
              <HugeiconsIcon :icon="Location01Icon" :size="13" class="shrink-0" />
              <select
                v-model="investorStore.selectedCity"
                class="bg-transparent font-medium text-neutral-800 dark:text-neutral-200 focus:outline-none cursor-pointer text-xs"
              >
                <option value="ALL">Semua Wilayah</option>
                <option value="Bandung">Bandung</option>
                <option value="Surabaya">Surabaya</option>
                <option value="Malang">Malang</option>
                <option value="Solo">Solo</option>
                <option value="Padang">Padang</option>
                <option value="Yogyakarta">Yogyakarta</option>
              </select>
            </div>

            <!-- Sort Selector -->
            <div class="flex items-center gap-1.5 text-neutral-500 dark:text-neutral-400">
              <span class="text-[11px]">Urutkan:</span>
              <select
                v-model="selectedSortBy"
                class="bg-transparent font-semibold text-neutral-900 dark:text-white focus:outline-none cursor-pointer text-xs"
              >
                <option value="HEALTH_SCORE">Skor Tertinggi</option>
                <option value="MARGIN">Untung Tertinggi</option>
                <option value="TARGET_ASC">Tiket Terendah</option>
                <option value="GROWTH">Pertumbuhan Tertinggi</option>
              </select>
            </div>
          </div>
        </div>

        <!-- Active Filter Chips (if any filter is applied) -->
        <div v-if="hasActiveFilters" class="flex items-center gap-2 flex-wrap text-xs px-1">
          <span class="text-neutral-500 dark:text-neutral-400 font-medium">Filter Aktif:</span>
          <span
            v-if="investorStore.selectedSector !== 'ALL'"
            class="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#E6F4F7] text-[#0f5464] dark:bg-[#183640] dark:text-[#78c7d8] font-semibold text-[11px]"
          >
            Sektor: {{ activeSectorLabel }}
            <button type="button" class="ml-1 cursor-pointer hover:text-red-500" @click="investorStore.selectedSector = 'ALL'">✕</button>
          </span>
          <span
            v-if="investorStore.selectedCity !== 'ALL'"
            class="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#E6F4F7] text-[#0f5464] dark:bg-[#183640] dark:text-[#78c7d8] font-semibold text-[11px]"
          >
            Wilayah: {{ investorStore.selectedCity }}
            <button type="button" class="ml-1 cursor-pointer hover:text-red-500" @click="investorStore.selectedCity = 'ALL'">✕</button>
          </span>
          <span
            v-if="investorStore.searchQuery"
            class="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-neutral-200 dark:bg-neutral-800 font-semibold text-[11px]"
          >
            "{{ investorStore.searchQuery }}"
            <button type="button" class="ml-1 cursor-pointer hover:text-red-500" @click="investorStore.searchQuery = ''">✕</button>
          </span>
          <button
            type="button"
            class="text-xs font-semibold text-red-600 dark:text-red-400 hover:underline cursor-pointer ml-1"
            @click="resetAllFilters"
          >
            Reset Semua
          </button>
        </div>

        <!-- B. POST FEED (UMKM Opportunity Cards) -->
        <div v-if="filteredFeed.length > 0" class="space-y-5">
          <article
            v-for="item in filteredFeed"
            :key="item.id"
            :id="'umkm-card-' + item.id"
            class="card-tactile-gopay rounded-2xl border font-poppins transition-all duration-300 hover:border-neutral-300 dark:hover:border-neutral-700 overflow-hidden shadow-2xs"
          >
            <!-- Card Body Content -->
            <div class="p-4 sm:p-5 space-y-3.5">

              <!-- 1. Post Author Header: Logo + Name + Verified Badge + Subtitle -->
              <div class="flex items-start justify-between gap-3">
                <div class="flex items-center gap-3 min-w-0">
                  <!-- Logo Gerai UMKM -->
                  <div class="w-11 h-11 rounded-xl bg-amber-400/90 dark:bg-amber-500/90 p-1.5 shrink-0 flex items-center justify-center shadow-2xs border border-amber-300/60">
                    <img src="/logo.svg" alt="Logo Usaha" class="w-full h-full object-contain" />
                  </div>

                  <div class="min-w-0">
                    <div class="flex items-center gap-1.5 flex-wrap">
                      <h3 class="font-poppins font-semibold text-base sm:text-lg text-neutral-900 dark:text-white truncate">
                        {{ item.name }}
                      </h3>
                      <span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-100 text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-700">
                        <HugeiconsIcon :icon="CheckmarkCircle01Icon" :size="11" :stroke-width="2.2" />
                        <span>Siap Pendanaan</span>
                      </span>
                    </div>

                    <p class="text-xs text-neutral-500 dark:text-neutral-400 flex items-center gap-1.5 truncate mt-0.5 font-normal">
                      <span>{{ item.city }}</span>
                      <span>•</span>
                      <span>{{ item.sector }}</span>
                      <span>•</span>
                      <span>Est. {{ item.establishedYear }}</span>
                    </p>
                  </div>
                </div>

                <!-- Right Corner: Skor Kesehatan & Bookmark -->
                <div class="flex items-center gap-1.5 shrink-0">
                  <span class="px-2.5 py-0.5 rounded-lg bg-[#E6F4F7] text-[#0f5464] dark:bg-[#183640] dark:text-[#78c7d8] border border-[#2091AA]/25 text-xs font-semibold tabular-nums">
                    Skor {{ item.healthScore }}
                  </span>

                  <!-- Bookmark Star Button -->
                  <button
                    type="button"
                    :aria-label="item.bookmarked ? 'Hapus UMKM dari daftar pantau' : 'Simpan UMKM ke daftar pantau'"
                    :class="[
                      'w-8 h-8 rounded-lg transition-all cursor-pointer flex items-center justify-center border',
                      item.bookmarked
                        ? 'bg-amber-50 dark:bg-amber-950/60 text-amber-500 border-amber-200 dark:border-amber-800'
                        : 'bg-neutral-100/70 dark:bg-neutral-800/70 text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 border-transparent hover:border-neutral-200 dark:hover:border-neutral-700'
                    ]"
                    :title="item.bookmarked ? 'Hapus dari Simpanan' : 'Simpan ke Portofolio Pantau'"
                    @click="toggleBookmarkWithFeedback(item)"
                  >
                    <HugeiconsIcon
                      :icon="StarIcon"
                      :size="16"
                      :stroke-width="2"
                      :class="item.bookmarked ? 'fill-amber-400 text-amber-500' : ''"
                    />
                  </button>

                  <!-- Share Link Button -->
                  <button
                    type="button"
                    class="w-8 h-8 rounded-lg bg-neutral-100/70 dark:bg-neutral-800/70 text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 border border-transparent hover:border-neutral-200 dark:hover:border-neutral-700 transition-colors flex items-center justify-center cursor-pointer"
                    title="Bagikan Tautan Profil"
                    @click="copyShareLink(item)"
                  >
                    <HugeiconsIcon :icon="Share01Icon" :size="15" />
                  </button>
                </div>
              </div>

              <!-- 2. Post Text (Founder Pitch & Thesis) -->
              <p class="text-xs sm:text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed font-sans">
                "{{ item.pitchSummary }}"
              </p>

              <!-- 3. Store Documentation Image -->
              <div class="relative rounded-xl overflow-hidden border border-neutral-200/80 dark:border-neutral-800/80 bg-neutral-100 dark:bg-neutral-900">
                <img
                  :src="getStoreBannerImage(item.id)"
                  :alt="`Dokumentasi Gerai ${item.name}`"
                  class="w-full h-48 sm:h-56 object-cover"
                />
                <div class="absolute bottom-2.5 left-2.5 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-[10px] font-medium">
                  <HugeiconsIcon :icon="Store01Icon" :size="12" class="text-emerald-400 shrink-0" />
                  <span>Gerai Fisik Aktif • {{ item.city }}</span>
                </div>
              </div>

              <!-- 4. Consultant Endorsement Strip -->
              <div class="p-2.5 rounded-xl bg-[#F6F8FA] dark:bg-[#18191E] border border-neutral-200/80 dark:border-neutral-800 flex items-center justify-between flex-wrap gap-2 text-xs">
                <div class="flex items-center gap-1.5 min-w-0">
                  <HugeiconsIcon :icon="Award01Icon" :size="15" class="text-amber-500 shrink-0" />
                  <span class="text-neutral-600 dark:text-neutral-400 text-xs">
                    Didampingi oleh: <strong class="text-neutral-900 dark:text-white font-semibold">{{ item.consultantName }}</strong>
                  </span>
                </div>
                <div class="flex items-center gap-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                  <HugeiconsIcon :icon="CheckmarkCircle01Icon" :size="12" />
                  <span>Validasi Kas Selesai ({{ item.certifiedAt }})</span>
                </div>
              </div>

              <!-- 5. 4 Telemetry Metrics Bento -->
              <div class="grid grid-cols-2 sm:grid-cols-4 gap-2 font-poppins text-center">
                <div class="p-2.5 rounded-xl bg-neutral-100/80 dark:bg-neutral-800/60 border border-neutral-200/60 dark:border-neutral-700/60">
                  <span class="text-[11px] text-neutral-500 dark:text-neutral-400 block font-medium">Target Modal</span>
                  <strong class="text-xs sm:text-sm font-semibold text-neutral-900 dark:text-white tabular-nums block mt-0.5">
                    Rp {{ (item.fundingTarget / 1000000).toLocaleString('id-ID') }} Jt
                  </strong>
                </div>

                <div class="p-2.5 rounded-xl bg-neutral-100/80 dark:bg-neutral-800/60 border border-neutral-200/60 dark:border-neutral-700/60">
                  <span class="text-[11px] text-neutral-500 dark:text-neutral-400 block font-medium">Untung Bersih</span>
                  <strong class="text-xs sm:text-sm font-semibold text-emerald-600 dark:text-emerald-400 tabular-nums block mt-0.5">
                    {{ item.marginPercentage }}%
                  </strong>
                </div>

                <div class="p-2.5 rounded-xl bg-neutral-100/80 dark:bg-neutral-800/60 border border-neutral-200/60 dark:border-neutral-700/60">
                  <span class="text-[11px] text-neutral-500 dark:text-neutral-400 block font-medium">Pertumbuhan</span>
                  <strong class="text-xs sm:text-sm font-semibold text-[#2091AA] dark:text-[#50AABF] tabular-nums block mt-0.5">
                    +{{ item.growthYoY }}%
                  </strong>
                </div>

                <div class="p-2.5 rounded-xl bg-neutral-100/80 dark:bg-neutral-800/60 border border-neutral-200/60 dark:border-neutral-700/60">
                  <span class="text-[11px] text-neutral-500 dark:text-neutral-400 block font-medium">Status Kas</span>
                  <strong class="text-xs sm:text-sm font-semibold text-emerald-600 dark:text-emerald-400 tabular-nums block mt-0.5">
                    100% Bersih
                  </strong>
                </div>
              </div>

            </div>

            <!-- 6. Post Action Row (Pesan, Simulasi ROI, Profil, Data Room) -->
            <div class="px-4 sm:px-5 py-2.5 bg-neutral-50/80 dark:bg-neutral-900/50 border-t border-neutral-100 dark:border-neutral-800/80 flex items-center justify-between gap-2 flex-wrap">
              <!-- Left Group: Chat & ROI Calculator -->
              <div class="flex items-center gap-1.5 flex-wrap">
                <button
                  type="button"
                  class="h-8 px-2.5 sm:px-3 rounded-lg text-xs font-semibold bg-[#E6F4F7] hover:bg-[#D9EEF3] dark:bg-[#183640] dark:hover:bg-[#204754] text-[#0f5464] dark:text-[#78c7d8] transition-colors flex items-center gap-1.5 cursor-pointer border border-[#2091AA]/20 shrink-0"
                  title="Kirim pesan langsung ke pemilik usaha"
                  @click="goToChatWithUmkm(item)"
                >
                  <HugeiconsIcon :icon="Message01Icon" :size="14" class="text-[#00800e] dark:text-[#00C058]" />
                  <span>Kirim Pesan</span>
                </button>

                <button
                  type="button"
                  class="h-8 px-2.5 sm:px-3 rounded-lg text-xs font-semibold text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200/60 dark:hover:bg-neutral-800 transition-colors flex items-center gap-1.5 cursor-pointer border border-neutral-200 dark:border-neutral-700 shrink-0"
                  title="Simulasi bagi hasil investasi"
                  @click="openRoiModal(item)"
                >
                  <HugeiconsIcon :icon="Coins01Icon" :size="14" class="text-[#156374] dark:text-[#50AABF]" />
                  <span>Simulasi ROI</span>
                </button>
              </div>

              <!-- Right Group: Tinjau Profil & Data Room -->
              <div class="flex items-center gap-1.5 flex-wrap justify-end">
                <NuxtLink
                  :to="`/investor/umkm/${item.id}`"
                  class="h-8 px-2.5 sm:px-3 rounded-lg text-xs font-semibold text-neutral-700 dark:text-neutral-200 hover:bg-neutral-200/60 dark:hover:bg-neutral-800 transition-colors inline-flex items-center gap-1 cursor-pointer border border-neutral-200 dark:border-neutral-700 shrink-0"
                >
                  <span>Profil</span>
                  <HugeiconsIcon :icon="ArrowRight01Icon" :size="12" />
                </NuxtLink>

                <!-- Data Room Action Button -->
                <NuxtLink
                  v-if="item.accessStatus === 'APPROVED'"
                  :to="`/investor/data-room/${item.id}`"
                  class="inline-flex items-center gap-1.5 px-3 sm:px-3.5 h-8 rounded-lg text-xs font-semibold font-poppins bg-[#00800e] hover:bg-[#00700c] text-white shadow-xs transition-all cursor-pointer shrink-0"
                >
                  <HugeiconsIcon :icon="FileUnlockedIcon" :size="14" :stroke-width="2" />
                  <span>Data Room</span>
                </NuxtLink>

                <div
                  v-else-if="item.accessStatus === 'PENDING'"
                  class="inline-flex items-center gap-1 px-2.5 sm:px-3 h-8 rounded-lg text-xs font-semibold bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800 shrink-0"
                >
                  <HugeiconsIcon :icon="Clock01Icon" :size="13" class="text-amber-600 animate-spin" />
                  <span>Menunggu</span>
                </div>

                <NuxtLink
                  v-else
                  :to="`/investor/umkm/${item.id}/ajukan-akses`"
                  class="btn-pill-action group cursor-pointer inline-flex items-center gap-1 h-8 px-2.5 sm:px-3 text-xs font-semibold shrink-0"
                >
                  <span>Data Room</span>
                  <HugeiconsIcon :icon="ArrowRight01Icon" :size="12" class="group-hover:translate-x-0.5 transition-transform" />
                </NuxtLink>
              </div>
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
            <h3 class="font-poppins font-semibold text-base text-neutral-900 dark:text-white">
              Tidak Ada UMKM yang Sesuai
            </h3>
            <p class="text-xs text-neutral-500 dark:text-neutral-400 mt-1 max-w-sm mx-auto font-sans">
              Cobalah memilih opsi sektor lain atau mencari nama kota lainnya.
            </p>
          </div>
          <button
            type="button"
            class="px-4 py-2 rounded-xl text-xs font-semibold bg-[#00800e] text-white hover:bg-[#00700c] transition-colors cursor-pointer"
            @click="resetAllFilters"
          >
            Reset Semua Filter
          </button>
        </div>
      </main>

      <!-- ======================================================================================= -->
      <!-- KOLOM KANAN (3-4 Cols Desktop): Profile Card & Standar Akreditasi (Dipindahkan ke Kanan)  -->
      <!-- ======================================================================================= -->
      <aside class="lg:col-span-4 xl:col-span-3 space-y-4 lg:sticky lg:top-6">

        <!-- A. PROFILE CARD (Cover Banner + Centered Protruding Avatar) -->
        <div class="card-tactile-gopay rounded-2xl border overflow-hidden shadow-2xs">
          <!-- Banner Cover Atas -->
          <div class="h-20 bg-gradient-to-r from-[#2091AA]/25 via-[#00AA13]/20 to-[#2091AA]/15 border-b border-neutral-100 dark:border-neutral-800 relative">
            <span class="absolute top-2 right-2 px-2 py-0.5 rounded-full bg-white/80 dark:bg-neutral-900/80 backdrop-blur-xs text-[10px] font-semibold text-emerald-700 dark:text-emerald-400 border border-emerald-500/20">
              Terakreditasi
            </span>
          </div>

          <!-- Centered Avatar & Profile Info -->
          <div class="flex flex-col items-center text-center -mt-10 px-4 pb-4">
            <div class="relative w-20 h-20 rounded-full p-1 bg-white dark:bg-[#13161F] shadow-md border-2 border-white dark:border-[#13161F] shrink-0">
              <img
                :src="authStore.currentUser?.avatar || '/images/user-profile.png'"
                alt="Foto Profil Investor"
                class="w-full h-full rounded-full object-cover bg-neutral-100 dark:bg-neutral-800"
              />
              <span class="absolute bottom-0.5 right-0.5 w-3.5 h-3.5 rounded-full bg-emerald-500 ring-2 ring-white dark:ring-[#13161F]" />
            </div>

            <div class="mt-2.5">
              <h2 class="font-poppins font-semibold text-sm sm:text-base text-neutral-900 dark:text-white flex items-center justify-center gap-1.5">
                <span>{{ authStore.currentUser?.name || 'Fikri Setiawan' }}</span>
                <HugeiconsIcon :icon="CheckmarkCircle01Icon" :size="15" class="text-emerald-500 shrink-0" />
              </h2>
              <p class="text-xs font-medium text-neutral-500 dark:text-neutral-400 mt-0.5">
                Angel Investor
              </p>
              <p class="text-[11px] text-neutral-400 dark:text-neutral-500">
                Nusantara Angel Syndicate
              </p>
            </div>

            <!-- Metric Rows -->
            <div class="w-full mt-3.5 pt-3 border-t border-neutral-100 dark:border-neutral-800/80 space-y-2 text-xs text-left">
              <div class="flex items-center justify-between text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors">
                <span class="text-xs">Bisnis Dipantau</span>
                <strong class="font-semibold text-[#00800e] dark:text-[#00C058] tabular-nums">
                  {{ investorStore.watchlist.length }}
                </strong>
              </div>
              <div class="flex items-center justify-between text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors">
                <span class="text-xs">Diskusi Terjalin</span>
                <strong class="font-semibold text-neutral-900 dark:text-white tabular-nums">
                  {{ chatStore.threads.length }}
                </strong>
              </div>
              <div class="flex items-center justify-between text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors">
                <span class="text-xs">Akses Data Room</span>
                <strong class="font-semibold text-emerald-600 dark:text-emerald-400 tabular-nums">
                  {{ approvedDataRoomsCount }}
                </strong>
              </div>
            </div>

            <!-- Attached Navigation Links -->
            <div class="w-full mt-3.5 pt-3 border-t border-neutral-100 dark:border-neutral-800/80 space-y-1 text-left">
              <NuxtLink
                to="/investor/watchlist"
                class="flex items-center gap-2 px-2.5 py-1.5 rounded-xl text-xs font-medium text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
              >
                <HugeiconsIcon :icon="StarIcon" :size="14" class="text-amber-500 fill-amber-400 shrink-0" />
                <span class="truncate">Portofolio Pantau</span>
              </NuxtLink>

              <NuxtLink
                to="/investor/pesan"
                class="flex items-center justify-between px-2.5 py-1.5 rounded-xl text-xs font-medium text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
              >
                <div class="flex items-center gap-2 min-w-0">
                  <HugeiconsIcon :icon="Message01Icon" :size="14" class="text-[#00800e] dark:text-[#00C058] shrink-0" />
                  <span class="truncate">Pesan</span>
                </div>
                <span
                  v-if="chatStore.unreadCountInvestor > 0"
                  class="px-1.5 py-0.2 rounded-full text-[10px] font-bold bg-red-600 text-white tabular-nums"
                >
                  {{ chatStore.unreadCountInvestor }}
                </span>
              </NuxtLink>

              <NuxtLink
                to="/investor/pengaturan"
                class="flex items-center gap-2 px-2.5 py-1.5 rounded-xl text-xs font-medium text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
              >
                <HugeiconsIcon :icon="Settings01Icon" :size="14" class="text-neutral-400 shrink-0" />
                <span class="truncate">Pengaturan Mandat</span>
              </NuxtLink>
            </div>
          </div>
        </div>

        <!-- B. TRUST ASSURANCE CARD -->
        <div class="card-tactile-gopay rounded-2xl p-4 border space-y-2.5">
          <div class="flex items-center gap-2 text-xs font-semibold text-neutral-900 dark:text-white">
            <HugeiconsIcon :icon="ShieldCheckIcon" :size="16" class="text-emerald-500 shrink-0" />
            <span>Standar Akreditasi Beruang</span>
          </div>
          <p class="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed font-sans">
            Seluruh data pergerakan kas toko dan mutasi giro bank telah diverifikasi berkala oleh konsultan pendamping berlisensi.
          </p>
        </div>

      </aside>

    </div>

    <!-- ========================================================================================= -->
    <!-- QUICK ROI CALCULATOR MODAL (Simulasi Bagi Hasil Usaha)                                     -->
    <!-- ========================================================================================= -->
    <Teleport to="body">
      <div
        v-if="selectedRoiModal"
        class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150"
        @click.self="selectedRoiModal = null"
      >
        <div class="card-tactile-gopay rounded-3xl p-6 border max-w-md w-full space-y-5 bg-white dark:bg-[#13161F] shadow-2xl font-poppins">
          <div class="flex items-start justify-between">
            <div>
              <span class="text-[10px] font-semibold text-[#00800e] dark:text-[#00C058] uppercase tracking-wider block">
                Simulasi Bagi Hasil Usaha
              </span>
              <h3 class="font-poppins font-semibold text-base text-neutral-900 dark:text-white mt-0.5">
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
              <strong class="tabular-nums text-neutral-900 dark:text-white font-semibold">Rp {{ selectedRoiModal.fundingTarget.toLocaleString('id-ID') }}</strong>
            </div>
            <div class="flex justify-between">
              <span class="text-neutral-500">Rasio Untung Riil:</span>
              <strong class="tabular-nums text-emerald-600 font-semibold">{{ selectedRoiModal.marginPercentage }}%</strong>
            </div>
            <div class="flex justify-between">
              <span class="text-neutral-500">Skema Standar:</span>
              <span class="font-medium text-neutral-800 dark:text-neutral-200">Bagi Hasil Usaha</span>
            </div>
          </div>

          <div class="space-y-1.5">
            <div class="flex justify-between text-xs font-medium">
              <span class="text-neutral-600 dark:text-neutral-400">Komitmen Tiket Anda:</span>
              <strong class="font-semibold text-[#00800e] dark:text-[#00C058] tabular-nums">
                Rp {{ modalTicketInput.toLocaleString('id-ID') }}
              </strong>
            </div>
            <input
              v-model.number="modalTicketInput"
              type="range"
              min="25000000"
              :max="selectedRoiModal.fundingTarget"
              step="5000000"
              class="w-full h-2 bg-neutral-200 dark:bg-neutral-700 rounded-lg appearance-none cursor-pointer accent-[#00800e]"
            />
          </div>

          <div class="p-4 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 space-y-2 text-xs">
            <div class="flex justify-between items-center">
              <span class="text-neutral-600 dark:text-neutral-400">Estimasi Bagi Hasil Bulanan:</span>
              <strong class="text-base font-semibold text-emerald-600 dark:text-emerald-400 tabular-nums">
                Rp {{ Math.round((modalTicketInput * 0.14) / 12).toLocaleString('id-ID') }}
              </strong>
            </div>
            <p class="text-[11px] text-neutral-500 dark:text-neutral-400 leading-normal">
              Berdasarkan performa historis kas toko yang telah tervalidasi oleh konsultan pendamping.
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
              class="px-4 py-2 rounded-xl text-xs font-semibold bg-[#00800e] text-white shadow-xs cursor-pointer hover:bg-[#00700c] transition-colors"
              @click="selectedRoiModal = null"
            >
              Lanjut Ajukan Tiket Ini →
            </NuxtLink>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useInvestorStore, type MarketplaceUmkm } from '~/stores/investor'
import { useAuthStore } from '~/stores/auth'
import { useChatStore } from '~/stores/chat'
import BActionButton from '~/components/base/BActionButton.vue'
import { HugeiconsIcon } from '@hugeicons/vue'
import {
  Search01Icon,
  CheckmarkCircle01Icon,
  StarIcon,
  Store01Icon,
  Location01Icon,
  Award01Icon,
  ArrowRight01Icon,
  Coins01Icon,
  Share01Icon,
  FileUnlockedIcon,
  Clock01Icon,
  Message01Icon,
  ShieldCheckIcon,
  Settings01Icon
} from '@hugeicons/core-free-icons'

definePageMeta({
  layout: 'dashboard',
  hideHeader: true
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

// Approved Data Rooms Count
const approvedDataRoomsCount = computed(() => {
  return investorStore.marketplaceList.filter(item => item.accessStatus === 'APPROVED').length
})

const activeSectorLabel = computed(() => {
  const map: Record<string, string> = {
    'ALL': 'Semua Sektor',
    'F&B': 'Kuliner & F&B',
    'FMCG': 'Oleh-oleh FMCG',
    'Agroindustri': 'Agroindustri',
    'Fashion': 'Fashion & Kriya'
  }
  return map[investorStore.selectedSector] || investorStore.selectedSector
})

// Sort By Selection
const selectedSortBy = ref<'HEALTH_SCORE' | 'MARGIN' | 'TARGET_ASC' | 'GROWTH'>('HEALTH_SCORE')

// Active Filters Detection
const hasActiveFilters = computed(() => {
  return (
    investorStore.searchQuery !== '' ||
    investorStore.selectedSector !== 'ALL' ||
    investorStore.selectedCity !== 'ALL'
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

    return matchSearch && matchSector && matchCity
  })

  // Sort
  if (selectedSortBy.value === 'MARGIN') {
    return [...list].sort((a, b) => b.marginPercentage - a.marginPercentage)
  }
  if (selectedSortBy.value === 'TARGET_ASC') {
    return [...list].sort((a, b) => a.fundingTarget - b.fundingTarget)
  }
  if (selectedSortBy.value === 'GROWTH') {
    return [...list].sort((a, b) => b.growthYoY - a.growthYoY)
  }
  return [...list].sort((a, b) => b.healthScore - a.healthScore)
})

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
