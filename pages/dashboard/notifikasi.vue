<template>
  <div class="space-y-6 sm:space-y-8 pb-16 font-poppins text-neutral-900 dark:text-neutral-100">
    <!-- 1. Top Page Header: Title on Left & Action Buttons on Right (1 Baris Sejajar - Matched with Catatan Kas & Beranda) -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 min-h-[44px]">
      <!-- Title & Icon: Notifikasi -->
      <div class="flex items-center gap-2.5 sm:gap-3">
        <HugeiconsIcon
          :icon="Notification01Icon"
          :size="26"
          :stroke-width="2.2"
          class="text-neutral-900 dark:text-white shrink-0"
        />
        <h1 class="font-poppins font-semibold text-2xl sm:text-3xl text-neutral-900 dark:text-white tracking-tight leading-tight">
          Notifikasi
        </h1>
      </div>

      <!-- Action Buttons on the Right (Stacked full-width on mobile, side-by-side on desktop) -->
      <div class="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 shrink-0 w-full sm:w-auto [&>*]:w-full sm:[&>*]:w-auto">
        <!-- Mark All as Read Button -->
        <BActionButton
          v-if="notificationStore.unreadCount > 0"
          variant="green"
          icon="check"
          custom-class="w-full sm:w-auto justify-center text-center"
          title="Tandai semua notifikasi sudah dibaca"
          @click="notificationStore.markAllAsRead"
        >
          Tandai Semua Dibaca
        </BActionButton>

        <!-- Settings Link -->
        <BActionButton
          variant="default"
          icon="none"
          to="/dashboard/pengaturan"
          custom-class="w-full sm:w-auto justify-center text-center"
          title="Pengaturan Notifikasi"
        >
          Pengaturan
        </BActionButton>
      </div>
    </div>

    <!-- 2. Metric Container: 4 Equal Width Financial Cards (Matched with Catatan Kas & Beranda) -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 items-stretch w-full">
      <!-- Card 1: Total Pemberitahuan -->
      <div class="gsap-stat-card flex-1 w-full">
        <div class="stat-card-clean select-none transition-all duration-200">
          <div class="flex items-center justify-between w-full gap-1.5">
            <div class="flex items-center gap-1.5 sm:gap-2 min-w-0">
              <div class="stat-card-icon-box shrink-0">
                <HugeiconsIcon
                  :icon="Notification01Icon"
                  :size="16"
                  :stroke-width="2.0"
                  class="text-[#156374] dark:text-[#50AABF] shrink-0"
                />
              </div>
              <span class="text-xs sm:text-sm font-poppins font-semibold text-neutral-800 dark:text-neutral-100 whitespace-nowrap tracking-[-0.01em]">
                Total Pemberitahuan
              </span>
            </div>
            <div :class="['inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold shrink-0', notificationStore.roleNotifications.length > 0 ? 'bg-emerald-100/90 text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-300 border border-emerald-200/80 dark:border-emerald-800/60' : 'bg-neutral-100 text-neutral-600 dark:bg-neutral-800 dark:text-neutral-300 border border-neutral-200 dark:border-neutral-700']">
              <span>{{ notificationStore.roleNotifications.length > 0 ? 'Semua' : 'Bersih' }}</span>
            </div>
          </div>
          <div class="my-auto py-2.5 sm:py-3.5">
            <span class="text-xl sm:text-[22px] lg:text-[21px] xl:text-[24px] font-poppins font-semibold text-neutral-900 dark:text-white tabular-nums tracking-[-0.02em] whitespace-nowrap block leading-tight">
              {{ notificationStore.roleNotifications.length }} Pesan
            </span>
          </div>
          <div class="stat-card-actions">
            <BActionButton
              variant="default"
              icon="chevron"
              @click="selectedFilter = 'ALL'"
              custom-class="shrink-0"
            >
              Cek Semua
            </BActionButton>
          </div>
        </div>
      </div>

      <!-- Card 2: Belum Dibaca -->
      <div class="gsap-stat-card flex-1 w-full">
        <div class="stat-card-clean select-none transition-all duration-200">
          <div class="flex items-center justify-between w-full gap-1.5">
            <div class="flex items-center gap-1.5 sm:gap-2 min-w-0">
              <div class="stat-card-icon-box shrink-0">
                <HugeiconsIcon
                  :icon="CheckmarkCircle01Icon"
                  :size="16"
                  :stroke-width="2.0"
                  class="text-[#156374] dark:text-[#50AABF] shrink-0"
                />
              </div>
              <span class="text-xs sm:text-sm font-poppins font-semibold text-neutral-800 dark:text-neutral-100 whitespace-nowrap tracking-[-0.01em]">
                Belum Dibaca
              </span>
            </div>
            <div :class="['inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold shrink-0', notificationStore.unreadCount > 0 ? 'bg-emerald-100/90 text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-300 border border-emerald-200/80 dark:border-emerald-800/60' : 'bg-neutral-100 text-neutral-600 dark:bg-neutral-800 dark:text-neutral-300 border border-neutral-200 dark:border-neutral-700']">
              <span>{{ notificationStore.unreadCount > 0 ? 'Perlu Cek' : 'Bersih' }}</span>
            </div>
          </div>
          <div class="my-auto py-2.5 sm:py-3.5">
            <span :class="['text-xl sm:text-[22px] lg:text-[21px] xl:text-[24px] font-poppins font-semibold tabular-nums tracking-[-0.02em] whitespace-nowrap block leading-tight', notificationStore.unreadCount > 0 ? 'text-emerald-800 dark:text-emerald-400' : 'text-neutral-900 dark:text-white']">
              {{ notificationStore.unreadCount }} Baru
            </span>
          </div>
          <div class="stat-card-actions">
            <BActionButton
              variant="green"
              icon="check"
              @click="selectedFilter = 'UNREAD'"
              custom-class="shrink-0"
            >
              Lihat Yang Baru
            </BActionButton>
          </div>
        </div>
      </div>

      <!-- Card 3: Prioritas Penting -->
      <div class="gsap-stat-card flex-1 w-full">
        <div class="stat-card-clean select-none transition-all duration-200">
          <div class="flex items-center justify-between w-full gap-1.5">
            <div class="flex items-center gap-1.5 sm:gap-2 min-w-0">
              <div class="stat-card-icon-box shrink-0">
                <HugeiconsIcon
                  :icon="Award01Icon"
                  :size="16"
                  :stroke-width="2.0"
                  class="text-[#156374] dark:text-[#50AABF] shrink-0"
                />
              </div>
              <span class="text-xs sm:text-sm font-poppins font-semibold text-neutral-800 dark:text-neutral-100 whitespace-nowrap tracking-[-0.01em]">
                Prioritas Penting
              </span>
            </div>
            <div :class="['inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold shrink-0', priorityCount > 0 ? 'bg-rose-100/90 text-rose-800 dark:bg-rose-950/80 dark:text-rose-300 border border-rose-200/80 dark:border-rose-800/60' : 'bg-neutral-100 text-neutral-600 dark:bg-neutral-800 dark:text-neutral-300 border border-neutral-200 dark:border-neutral-700']">
              <span>{{ priorityCount > 0 ? 'Mendesak' : 'Normal' }}</span>
            </div>
          </div>
          <div class="my-auto py-2.5 sm:py-3.5">
            <span class="text-xl sm:text-[22px] lg:text-[21px] xl:text-[24px] font-poppins font-semibold text-neutral-900 dark:text-white tabular-nums tracking-[-0.02em] whitespace-nowrap block leading-tight">
              {{ priorityCount }} Pesan
            </span>
          </div>
          <div class="stat-card-actions">
            <BActionButton
              variant="default"
              icon="chevron"
              @click="selectedFilter = 'PRIORITY'"
              custom-class="shrink-0"
            >
              Cek Prioritas
            </BActionButton>
          </div>
        </div>
      </div>

      <!-- Card 4: Validasi & Kas -->
      <div class="gsap-stat-card flex-1 w-full">
        <div class="stat-card-clean select-none transition-all duration-200">
          <div class="flex items-center justify-between w-full gap-1.5">
            <div class="flex items-center gap-1.5 sm:gap-2 min-w-0">
              <div class="stat-card-icon-box shrink-0">
                <HugeiconsIcon
                  :icon="Coins01Icon"
                  :size="16"
                  :stroke-width="2.0"
                  class="text-[#156374] dark:text-[#50AABF] shrink-0"
                />
              </div>
              <span class="text-xs sm:text-sm font-poppins font-semibold text-neutral-800 dark:text-neutral-100 whitespace-nowrap tracking-[-0.01em]">
                Validasi & Kas
              </span>
            </div>
            <div :class="['inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold shrink-0', validasiCount > 0 ? 'bg-emerald-100/90 text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-300 border border-emerald-200/80 dark:border-emerald-800/60' : 'bg-neutral-100 text-neutral-600 dark:bg-neutral-800 dark:text-neutral-300 border border-neutral-200 dark:border-neutral-700']">
              <span>{{ validasiCount > 0 ? 'Tervalidasi' : '0 Laporan' }}</span>
            </div>
          </div>
          <div class="my-auto py-2.5 sm:py-3.5">
            <span class="text-xl sm:text-[22px] lg:text-[21px] xl:text-[24px] font-poppins font-semibold text-neutral-900 dark:text-white tabular-nums tracking-[-0.02em] whitespace-nowrap block leading-tight">
              {{ validasiCount }} Laporan
            </span>
          </div>
          <div class="stat-card-actions">
            <BActionButton
              variant="default"
              icon="chevron"
              @click="selectedFilter = 'VALIDASI'"
              custom-class="shrink-0"
            >
              Cek Laporan
            </BActionButton>
          </div>
        </div>
      </div>
    </div>

    <!-- Macro Segmented Pill Switcher with Native Counts (Desktop View: hidden on < sm where joined control bar handles it) -->
    <div class="hidden sm:block">
      <BPillTabs
        v-model="selectedFilter"
        :tabs="filterTabs"
        size="md"
      />
    </div>

    <!-- 3. Interactive Notifications Container (Matched with Catatan Kas & Beranda Card Concept) -->
    <div id="notifications-table-container" class="card-tactile-gopay rounded-[18px] overflow-hidden font-poppins">
      <!-- Container Header Bar -->
      <div class="p-4 sm:p-6 space-y-4 border-b border-[#E2E8F0] dark:border-neutral-800 bg-[#FFFFFF] dark:bg-[#13161F]">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div class="space-y-1 sm:space-y-1.5">
            <h2 class="text-lg sm:text-xl font-poppins font-bold text-neutral-900 dark:text-white tracking-tight">
              Daftar Notifikasi & Aktivitas Toko
            </h2>
            <p class="text-xs sm:text-sm font-poppins text-neutral-500 dark:text-neutral-400 leading-normal max-w-sm sm:max-w-md">
              Histori seluruh pesan, verifikasi konsultan pendamping, dan pengajuan modal toko yang telah tervalidasi.
            </p>
          </div>
        </div>

        <!-- Joined Search & Filter Control Bar (Disatukan / Gabung menjadi satu kontrol ringkas & presisi) -->
        <div class="relative w-full rounded-[10px] border border-[#CBD5E1] dark:border-neutral-700 bg-neutral-50/70 dark:bg-[#1A1A1A] focus-within:border-[#00800e] dark:focus-within:border-[#00C058] focus-within:ring-2 focus-within:ring-[#00800e]/20 transition-all flex items-center min-h-[46px] mt-3 sm:mt-4">
          <!-- Left: Search Icon + Input -->
          <div class="relative flex-1 flex items-center min-w-0">
            <HugeiconsIcon
              :icon="Search01Icon"
              :size="16"
              :stroke-width="1.8"
              class="ml-3.5 text-neutral-400 dark:text-neutral-500 shrink-0 pointer-events-none"
            />
            <input
              v-model="searchQuery"
              type="text"
              aria-label="Cari notifikasi, aktivitas, atau pengirim"
              placeholder="Cari notifikasi, nama pengirim, atau catatan..."
              class="w-full pl-2.5 pr-2 py-2.5 bg-transparent border-0 text-xs sm:text-sm text-[#18181b] dark:text-[#FDFDFD] placeholder:text-neutral-400 dark:placeholder:text-neutral-500 focus:outline-none focus:ring-0 font-poppins min-w-0"
            />
            <button
              v-if="searchQuery"
              type="button"
              aria-label="Hapus pencarian"
              class="p-1.5 mr-1 text-neutral-400 hover:text-neutral-700 dark:hover:text-white cursor-pointer shrink-0"
              title="Hapus pencarian"
              @click="searchQuery = ''"
            >
              <HugeiconsIcon :icon="Cancel01Icon" :size="15" :stroke-width="2" />
            </button>
          </div>

          <!-- Divider Line -->
          <div class="h-6 w-px bg-neutral-300 dark:bg-neutral-700 shrink-0" aria-hidden="true" />

          <!-- Right: Filter Dropdown Trigger (Joined seamlessly) -->
          <div ref="filterDropdownRef" class="relative shrink-0">
            <button
              type="button"
              class="h-full px-3 sm:px-4 py-2.5 text-xs sm:text-sm font-poppins font-medium text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200/50 dark:hover:bg-neutral-800 transition-colors flex items-center gap-1.5 cursor-pointer whitespace-nowrap min-h-[46px]"
              :aria-expanded="isFilterDropdownOpen"
              title="Filter Kategori Notifikasi"
              @click="isFilterDropdownOpen = !isFilterDropdownOpen"
            >
              <HugeiconsIcon :icon="FilterHorizontalIcon" :size="14" :stroke-width="2" class="text-neutral-500 dark:text-neutral-400 shrink-0" />
              <span class="truncate">{{ activeFilterLabel }}</span>
              <svg
                class="w-3.5 h-3.5 text-neutral-500 dark:text-neutral-400 transition-transform duration-200 shrink-0"
                :class="{ 'rotate-180': isFilterDropdownOpen }"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2.0"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="m6 9 6 6 6-6" />
              </svg>
            </button>

            <!-- Dropdown Menu Popover -->
            <div
              v-if="isFilterDropdownOpen"
              class="absolute right-0 top-full mt-1.5 w-52 sm:w-56 rounded-[10px] bg-white dark:bg-[#18191E] border border-[#CBD5E1] dark:border-neutral-700 shadow-xl p-1.5 z-50 font-poppins text-sm animate-in fade-in zoom-in-95 duration-150"
            >
              <div class="space-y-0.5">
                <button
                  v-for="opt in filterTabs"
                  :key="opt.id"
                  type="button"
                  :class="[
                    'w-full flex items-center justify-between px-3 py-2 rounded-[8px] text-xs sm:text-sm font-poppins transition-all duration-150 text-left cursor-pointer',
                    selectedFilter === opt.id
                      ? 'bg-emerald-50 hover:bg-emerald-100/80 dark:bg-emerald-950/40 dark:hover:bg-emerald-950/60 text-[#00800e] dark:text-emerald-400 font-semibold border border-emerald-200/80 dark:border-emerald-800/60 shadow-2xs'
                      : 'text-neutral-600 dark:text-neutral-300 font-medium hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100/80 dark:hover:bg-neutral-800/60 border border-transparent'
                  ]"
                  @click="selectedFilter = opt.id as any; isFilterDropdownOpen = false"
                >
                  <span>{{ opt.label }}</span>
                  <span
                    v-if="opt.count !== undefined"
                    class="text-[11px] px-2 py-0.5 rounded-full bg-neutral-200/70 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 tabular-nums font-semibold"
                  >
                    {{ opt.count }}
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Notifications List (Full-Width Edge-to-Edge Container - No Nested Box) -->
      <div class="w-full">
        <!-- Empty State -->
        <div
          v-if="displayedNotifications.length === 0"
          class="py-16 px-4 text-center flex flex-col items-center justify-center space-y-3.5 bg-neutral-50/50 dark:bg-[#141C2B]/30"
        >
          <div class="w-13 h-13 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 text-[#00800e] dark:text-emerald-400 flex items-center justify-center border border-emerald-200/70 dark:border-emerald-800/50 shadow-2xs">
            <svg class="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
              <path d="M13.73 21a2 2 0 0 1-3.46 0" />
              <line x1="2" y1="2" x2="22" y2="22" />
            </svg>
          </div>
          <div class="space-y-1 max-w-sm px-4">
            <h3 class="font-bold text-base text-neutral-900 dark:text-white">
              Tidak ada notifikasi ditemukan
            </h3>
            <p class="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed">
              <span v-if="searchQuery">
                Tidak ditemukan pesan yang cocok dengan "{{ searchQuery }}". Coba gunakan kata kunci lain.
              </span>
              <span v-else>
                Semua laporan kas dan permodalan tokomu sudah terupdate rapi. Lanjutkan aktivitas bisnis tokomu hari ini!
              </span>
            </p>
          </div>
          <BActionButton
            v-if="selectedFilter !== 'ALL' || searchQuery"
            variant="default"
            icon="none"
            custom-class="text-xs mt-1"
            title="Tampilkan Semua Notifikasi"
            @click="resetFilters"
          >
            Tampilkan Semua Notifikasi
          </BActionButton>
        </div>

        <!-- Content Sections -->
        <div v-else class="w-full">
          <!-- GROUP A: HARI INI -->
          <div v-if="todayNotifications.length > 0" class="w-full">
            <div class="px-4 sm:px-6 py-2.5 bg-neutral-50/80 dark:bg-[#111622] border-b border-neutral-100 dark:border-neutral-800 text-xs font-semibold text-neutral-400 dark:text-neutral-500 uppercase tracking-wider flex items-center justify-between">
              <span>Hari Ini</span>
              <span class="text-xs font-normal normal-case text-neutral-400 dark:text-neutral-500 tabular-nums">
                {{ todayNotifications.length }} pembaruan
              </span>
            </div>

            <!-- Full-Width Notification Items List (No inner container box & No dots) -->
            <div class="divide-y divide-neutral-100 dark:divide-neutral-800">
              <div
                v-for="item in todayNotifications"
                :key="item.id"
                :class="[
                  'px-4 sm:px-6 py-4 transition-colors duration-150 relative group w-full cursor-pointer',
                  item.priority === 'HIGH' && !item.isRead
                    ? 'bg-rose-50/40 dark:bg-rose-950/20 hover:bg-rose-50/70 dark:hover:bg-rose-950/30'
                    : !item.isRead
                      ? 'bg-[#F4F8FC] dark:bg-[#141C2B]/60 hover:bg-[#EBF4FA] dark:hover:bg-[#182337]/70'
                      : 'bg-white dark:bg-[#13161F] hover:bg-neutral-50/80 dark:hover:bg-neutral-800/40'
                ]"
                @click="handleNotificationRowClick(item)"
              >
                <div class="flex items-center justify-between gap-4 w-full">
                  <!-- Left: Icon/Avatar (Pristine, Tanpa Dot) + Content -->
                  <div class="flex items-start sm:items-center gap-3 sm:gap-4 min-w-0 flex-1">
                    <!-- Avatar or Squircle Icon: Bersih tanpa dot di sebelah kanan/atas/bawahnya -->
                    <div class="shrink-0">
                      <img
                        v-if="item.avatar"
                        :src="item.avatar"
                        :alt="item.senderName || item.title"
                        class="w-11 h-11 sm:w-12 sm:h-12 rounded-full object-cover border border-neutral-200 dark:border-neutral-700 shadow-2xs bg-neutral-100 dark:bg-neutral-800"
                        @error="(e: any) => { e.target.src = '/images/user-profile.png' }"
                      />

                      <!-- Squircle with Checkmark (Validasi Konsultan) -->
                      <div
                        v-else-if="item.iconType === 'verified' || item.category === 'KONSULTAN'"
                        class="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl flex items-center justify-center bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200/80 dark:border-emerald-800/60 text-[#00800e] dark:text-emerald-400 shadow-2xs"
                      >
                        <svg class="w-5 h-5 sm:w-6 sm:h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round">
                          <path d="M20 6 9 17l-5-5" />
                        </svg>
                      </div>

                      <!-- Squircle with Shield (Security) -->
                      <div
                        v-else-if="item.iconType === 'shield'"
                        class="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl flex items-center justify-center bg-neutral-100 dark:bg-neutral-800/80 border border-neutral-200 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 shadow-2xs"
                      >
                        <svg class="w-5 h-5 sm:w-6 sm:h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round">
                          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                          <path d="m9 12 2 2 4-4" />
                        </svg>
                      </div>

                      <!-- Squircle with Growth / Activity Wave -->
                      <div
                        v-else-if="item.iconType === 'growth' || item.category === 'KESEHATAN'"
                        class="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl flex items-center justify-center bg-sky-50 dark:bg-sky-950/40 border border-sky-200/80 dark:border-sky-800/60 text-sky-600 dark:text-sky-400 shadow-2xs"
                      >
                        <svg class="w-5 h-5 sm:w-6 sm:h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                          <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                        </svg>
                      </div>

                      <!-- Squircle with Wallet / Coins (Kas) -->
                      <div
                        v-else-if="item.iconType === 'wallet' || item.category === 'KAS'"
                        class="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl flex items-center justify-center bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200/80 dark:border-emerald-800/60 text-[#00800e] dark:text-emerald-400 shadow-2xs"
                      >
                        <HugeiconsIcon :icon="Coins01Icon" :size="20" :stroke-width="2.2" />
                      </div>

                      <!-- Fallback Squircle Icon -->
                      <div
                        v-else
                        class="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl flex items-center justify-center bg-neutral-100 dark:bg-neutral-800/80 border border-neutral-200 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 shadow-2xs"
                      >
                        <HugeiconsIcon
                          :icon="categoryConfig[item.category]?.icon || Notification01Icon"
                          :size="20"
                          :stroke-width="2.2"
                        />
                      </div>
                    </div>

                    <!-- Main Content (Sender Name + Action + Snippet) -->
                    <div class="flex-1 min-w-0">
                      <div class="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                        <!-- Sender Name + Action Text -->
                        <div class="text-sm sm:text-base leading-snug">
                          <span class="font-semibold text-neutral-900 dark:text-white">
                            {{ item.senderName || item.title }}
                          </span>
                          <span v-if="item.actionDetail" class="text-neutral-600 dark:text-neutral-400 font-normal ml-1.5 text-xs sm:text-sm">
                            {{ item.actionDetail }}
                          </span>
                        </div>
                      </div>

                      <!-- Quote / Message Snippet -->
                      <p class="text-xs sm:text-[13px] text-neutral-600 dark:text-neutral-400 mt-1 leading-relaxed">
                        {{ item.quoteSnippet || item.message }}
                      </p>

                      <!-- Mobile Action Button (Visible on mobile < sm) -->
                      <div class="sm:hidden flex items-center justify-between gap-2 pt-2.5 mt-2.5 border-t border-neutral-100 dark:border-neutral-800/60 w-full">
                        <span class="text-xs text-neutral-400 dark:text-neutral-500 tabular-nums">
                          {{ item.timestamp }}
                        </span>
                        <div class="flex items-center gap-2">
                          <BActionButton
                            v-if="item.link"
                            :to="item.link"
                            :variant="!item.isRead ? 'green' : 'default'"
                            icon="chevron"
                            :custom-class="[
                              'text-xs btn-notif-action transition-all duration-200',
                              item.isRead ? 'btn-notif-read' : ''
                            ].join(' ')"
                            @click.stop="handleActionClick(item)"
                          >
                            {{ getSingleWordActionLabel(item) }}
                          </BActionButton>

                          <!-- Delete Button -->
                          <button
                            type="button"
                            class="shrink-0 p-2 rounded-xl text-neutral-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
                            title="Hapus notifikasi"
                            @click.stop="notificationStore.deleteNotification(item.id)"
                          >
                            <HugeiconsIcon :icon="Cancel01Icon" :size="14" :stroke-width="2" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <!-- Right: Action Buttons Group (Desktop sm+) -->
                  <!-- Penempatan Konsisten: Posisi sama di sebelah kanan dengan fixed width 96px, Hijau saat unread, Abu-abu saat read -->
                  <div class="hidden sm:flex items-center gap-3 shrink-0 ml-4">
                    <!-- Timestamp di sebelah kiri tombol dengan perataan yang rapi -->
                    <span class="text-xs text-neutral-400 dark:text-neutral-500 tabular-nums font-normal whitespace-nowrap min-w-[120px] text-right">
                      {{ item.timestamp }}
                    </span>

                    <!-- Single Action Button (1 kata kosakata, lebar seragam 96px, hijau unread, abu-abu read) -->
                    <BActionButton
                      v-if="item.link"
                      :to="item.link"
                      :variant="!item.isRead ? 'green' : 'default'"
                      icon="chevron"
                      :custom-class="[
                        'text-xs btn-notif-action transition-all duration-200',
                        item.isRead ? 'btn-notif-read' : ''
                      ].join(' ')"
                      @click.stop="handleActionClick(item)"
                    >
                      {{ getSingleWordActionLabel(item) }}
                    </BActionButton>

                    <!-- Delete Single Notification -->
                    <button
                      type="button"
                      class="p-2 rounded-full text-neutral-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors cursor-pointer opacity-0 group-hover:opacity-100"
                      title="Hapus notifikasi ini"
                      @click.stop="notificationStore.deleteNotification(item.id)"
                    >
                      <HugeiconsIcon :icon="Cancel01Icon" :size="14" :stroke-width="2" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- GROUP B: KEMARIN & SEBELUMNYA -->
          <div v-if="yesterdayNotifications.length > 0" class="w-full">
            <div class="px-4 sm:px-6 py-2.5 bg-neutral-50/80 dark:bg-[#111622] border-y border-neutral-100 dark:border-neutral-800 text-xs font-semibold text-neutral-400 dark:text-neutral-500 uppercase tracking-wider flex items-center justify-between">
              <span>Kemarin & Sebelumnya</span>
              <span class="text-xs font-normal normal-case text-neutral-400 dark:text-neutral-500 tabular-nums">
                {{ yesterdayNotifications.length }} riwayat
              </span>
            </div>

            <!-- Full-Width Notification Items List (No inner container box & No dots) -->
            <div class="divide-y divide-neutral-100 dark:divide-neutral-800">
              <div
                v-for="item in yesterdayNotifications"
                :key="item.id"
                :class="[
                  'px-4 sm:px-6 py-4 transition-colors duration-150 relative group w-full cursor-pointer',
                  item.priority === 'HIGH' && !item.isRead
                    ? 'bg-rose-50/40 dark:bg-rose-950/20 hover:bg-rose-50/70 dark:hover:bg-rose-950/30'
                    : !item.isRead
                      ? 'bg-[#F4F8FC] dark:bg-[#141C2B]/60 hover:bg-[#EBF4FA] dark:hover:bg-[#182337]/70'
                      : 'bg-white dark:bg-[#13161F] hover:bg-neutral-50/80 dark:hover:bg-neutral-800/40'
                ]"
                @click="handleNotificationRowClick(item)"
              >
                <div class="flex items-center justify-between gap-4 w-full">
                  <!-- Left: Icon/Avatar (Pristine, Tanpa Dot) + Content -->
                  <div class="flex items-start sm:items-center gap-3 sm:gap-4 min-w-0 flex-1">
                    <!-- Avatar or Squircle Icon: Bersih tanpa dot di sebelah kanan/atas/bawahnya -->
                    <div class="shrink-0">
                      <img
                        v-if="item.avatar"
                        :src="item.avatar"
                        :alt="item.senderName || item.title"
                        class="w-11 h-11 sm:w-12 sm:h-12 rounded-full object-cover border border-neutral-200 dark:border-neutral-700 shadow-2xs bg-neutral-100 dark:bg-neutral-800"
                        @error="(e: any) => { e.target.src = '/images/user-profile.png' }"
                      />

                      <div
                        v-else-if="item.iconType === 'verified' || item.category === 'KONSULTAN'"
                        class="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl flex items-center justify-center bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200/80 dark:border-emerald-800/60 text-[#00800e] dark:text-emerald-400 shadow-2xs"
                      >
                        <svg class="w-5 h-5 sm:w-6 sm:h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round">
                          <path d="M20 6 9 17l-5-5" />
                        </svg>
                      </div>

                      <div
                        v-else-if="item.iconType === 'growth' || item.category === 'KESEHATAN'"
                        class="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl flex items-center justify-center bg-sky-50 dark:bg-sky-950/40 border border-sky-200/80 dark:border-sky-800/60 text-sky-600 dark:text-sky-400 shadow-2xs"
                      >
                        <svg class="w-5 h-5 sm:w-6 sm:h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                          <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                        </svg>
                      </div>

                      <div
                        v-else-if="item.iconType === 'wallet' || item.category === 'KAS'"
                        class="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl flex items-center justify-center bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200/80 dark:border-emerald-800/60 text-[#00800e] dark:text-emerald-400 shadow-2xs"
                      >
                        <HugeiconsIcon :icon="Coins01Icon" :size="20" :stroke-width="2.2" />
                      </div>

                      <div
                        v-else
                        class="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl flex items-center justify-center bg-neutral-100 dark:bg-neutral-800/80 border border-neutral-200 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 shadow-2xs"
                      >
                        <HugeiconsIcon
                          :icon="categoryConfig[item.category]?.icon || Notification01Icon"
                          :size="20"
                          :stroke-width="2.2"
                        />
                      </div>
                    </div>

                    <!-- Main Content -->
                    <div class="flex-1 min-w-0">
                      <div class="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                        <!-- Sender Name + Action Text -->
                        <div class="text-sm sm:text-base leading-snug">
                          <span class="font-semibold text-neutral-900 dark:text-white">
                            {{ item.senderName || item.title }}
                          </span>
                          <span v-if="item.actionDetail" class="text-neutral-600 dark:text-neutral-400 font-normal ml-1.5 text-xs sm:text-sm">
                            {{ item.actionDetail }}
                          </span>
                        </div>
                      </div>

                      <!-- Quote Snippet -->
                      <p class="text-xs sm:text-[13px] text-neutral-600 dark:text-neutral-400 mt-1 leading-relaxed">
                        {{ item.quoteSnippet || item.message }}
                      </p>

                      <!-- Mobile Action Button (Visible on mobile < sm) -->
                      <div class="sm:hidden flex items-center justify-between gap-2 pt-2.5 mt-2.5 border-t border-neutral-100 dark:border-neutral-800/60 w-full">
                        <span class="text-xs text-neutral-400 dark:text-neutral-500 tabular-nums">
                          {{ item.timestamp }}
                        </span>
                        <div class="flex items-center gap-2">
                          <BActionButton
                            v-if="item.link"
                            :to="item.link"
                            :variant="!item.isRead ? 'green' : 'default'"
                            icon="chevron"
                            :custom-class="[
                              'text-xs btn-notif-action transition-all duration-200',
                              item.isRead ? 'btn-notif-read' : ''
                            ].join(' ')"
                            @click.stop="handleActionClick(item)"
                          >
                            {{ getSingleWordActionLabel(item) }}
                          </BActionButton>

                          <!-- Delete Button -->
                          <button
                            type="button"
                            class="shrink-0 p-2 rounded-xl text-neutral-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
                            title="Hapus notifikasi"
                            @click.stop="notificationStore.deleteNotification(item.id)"
                          >
                            <HugeiconsIcon :icon="Cancel01Icon" :size="14" :stroke-width="2" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <!-- Right: Action Buttons Group (Desktop sm+) -->
                  <!-- Penempatan Konsisten: Posisi sama di sebelah kanan dengan fixed width 96px, Hijau saat unread, Abu-abu saat read -->
                  <div class="hidden sm:flex items-center gap-3 shrink-0 ml-4">
                    <!-- Timestamp di sebelah kiri tombol dengan perataan yang rapi -->
                    <span class="text-xs text-neutral-400 dark:text-neutral-500 tabular-nums font-normal whitespace-nowrap min-w-[120px] text-right">
                      {{ item.timestamp }}
                    </span>

                    <!-- Single Action Button (1 kata kosakata, lebar seragam 96px, hijau unread, abu-abu read) -->
                    <BActionButton
                      v-if="item.link"
                      :to="item.link"
                      :variant="!item.isRead ? 'green' : 'default'"
                      icon="chevron"
                      :custom-class="[
                        'text-xs btn-notif-action transition-all duration-200',
                        item.isRead ? 'btn-notif-read' : ''
                      ].join(' ')"
                      @click.stop="handleActionClick(item)"
                    >
                      {{ getSingleWordActionLabel(item) }}
                    </BActionButton>

                    <!-- Delete Single Notification -->
                    <button
                      type="button"
                      class="p-2 rounded-full text-neutral-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors cursor-pointer opacity-0 group-hover:opacity-100"
                      title="Hapus notifikasi ini"
                      @click.stop="notificationStore.deleteNotification(item.id)"
                    >
                      <HugeiconsIcon :icon="Cancel01Icon" :size="14" :stroke-width="2" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import gsap from 'gsap'
import BPillTabs, { type PillTabItem } from '~/components/base/BPillTabs.vue'
import BActionButton from '~/components/base/BActionButton.vue'
import { useNotificationStore, type AppNotification, type NotificationCategory } from '~/stores/notification'
import { HugeiconsIcon } from '@hugeicons/vue'
import {
  Notification01Icon,
  CheckmarkBadge01Icon,
  CheckmarkCircle01Icon,
  Award01Icon,
  Coins01Icon,
  AnalyticsUpIcon,
  Task01Icon,
  ArrowRight01Icon,
  Cancel01Icon,
  Search01Icon,
  RefreshIcon,
  FilterHorizontalIcon
} from '@hugeicons/core-free-icons'

// SEO Metadata
useHead({
  title: 'Notifikasi — Beruang',
  meta: [
    {
      name: 'description',
      content: 'Pusat pemberitahuan resmi validasi konsultan, pengajuan akses modal kemitraan, dan pergerakan kas toko UMKM Beruang.'
    }
  ]
})

definePageMeta({
  layout: 'dashboard',
  hideHeader: true
})

const notificationStore = useNotificationStore()

const searchQuery = ref('')
const selectedFilter = ref<'ALL' | 'UNREAD' | 'PRIORITY' | 'VALIDASI'>('ALL')
const isFilterDropdownOpen = ref(false)
const filterDropdownRef = ref<HTMLElement | null>(null)

function setFilter(filter: 'ALL' | 'UNREAD' | 'PRIORITY' | 'VALIDASI') {
  selectedFilter.value = filter
}

const priorityCount = computed(() => {
  return notificationStore.roleNotifications.filter(n => n.priority === 'HIGH').length
})

const validasiCount = computed(() => {
  return notificationStore.roleNotifications.filter(
    n => n.category === 'KONSULTAN' || n.category === 'KAS' || n.iconType === 'verified'
  ).length
})

// 4 Segmented Tabs with real-time reactive counts
const filterTabs = computed<PillTabItem[]>(() => {
  return [
    { id: 'ALL', label: 'Semua', icon: Notification01Icon, count: notificationStore.roleNotifications.length },
    { id: 'UNREAD', label: 'Belum Dibaca', icon: CheckmarkCircle01Icon, count: notificationStore.unreadCount },
    { id: 'PRIORITY', label: 'Prioritas', icon: Award01Icon, count: priorityCount.value },
    { id: 'VALIDASI', label: 'Validasi & Kas', icon: Coins01Icon, count: validasiCount.value }
  ]
})

const activeFilterLabel = computed(() => {
  const match = filterTabs.value.find(t => t.id === selectedFilter.value)
  return match ? match.label : 'Semua'
})

onMounted(() => {
  notificationStore.initNotifications()
  notificationStore.fetchNotifications()

  // GSAP Entrance Animations
  if (typeof window !== 'undefined') {
    gsap.from('.segmented-pill-container', {
      opacity: 0,
      y: 8,
      duration: 0.4,
      ease: 'power2.out',
      clearProps: 'all'
    })
    gsap.from('#notifications-table-container', {
      opacity: 0,
      y: 10,
      duration: 0.4,
      delay: 0.22,
      ease: 'power2.out',
      clearProps: 'all'
    })
  }

  if (typeof document !== 'undefined') {
    document.addEventListener('click', handleClickOutside)
  }
})

function handleClickOutside(event: MouseEvent) {
  if (filterDropdownRef.value && !filterDropdownRef.value.contains(event.target as Node)) {
    isFilterDropdownOpen.value = false
  }
}

onUnmounted(() => {
  if (typeof document !== 'undefined') {
    document.removeEventListener('click', handleClickOutside)
  }
})

function handleRefresh() {
  notificationStore.initNotifications(true)
}

function resetFilters() {
  setFilter('ALL')
  searchQuery.value = ''
}

function getSingleWordActionLabel(item: AppNotification): string {
  if (!item.actionLabel) return 'Lihat'
  const raw = item.actionLabel.trim()
  const lower = raw.toLowerCase()
  if (lower.includes('tinjau') || lower.includes('validasi')) return 'Tinjau'
  if (lower.includes('cek') || lower.includes('keamanan')) return 'Cek'
  if (lower.includes('buka')) return 'Buka'
  if (lower.includes('lihat')) return 'Lihat'
  return raw.split(/\s+/)[0] || 'Lihat'
}

function handleNotificationRowClick(item: AppNotification) {
  if (!item.isRead) {
    notificationStore.markAsRead(item.id)
  }
}

function handleActionClick(item: AppNotification) {
  notificationStore.markAsRead(item.id)
}

function toggleReadState(item: AppNotification) {
  if (item.isRead) {
    item.isRead = false
    notificationStore.saveToStorage()
  } else {
    notificationStore.markAsRead(item.id)
  }
}

const categoryConfig: Record<
  NotificationCategory,
  { label: string; icon: any }
> = {
  KONSULTAN: {
    label: 'Validasi Konsultan',
    icon: CheckmarkCircle01Icon
  },
  INVESTOR: {
    label: 'Akses Modal',
    icon: Award01Icon
  },
  KESEHATAN: {
    label: 'Kesiapan Modal',
    icon: AnalyticsUpIcon
  },
  KAS: {
    label: 'Catatan Kas Toko',
    icon: Coins01Icon
  },
  AKSI: {
    label: 'Rencana Aksi',
    icon: Task01Icon
  }
}

const displayedNotifications = computed(() => {
  let list = [...notificationStore.roleNotifications]

  // Category tab filter
  if (selectedFilter.value === 'UNREAD') {
    list = list.filter(n => !n.isRead)
  } else if (selectedFilter.value === 'PRIORITY') {
    list = list.filter(n => n.priority === 'HIGH')
  } else if (selectedFilter.value === 'VALIDASI') {
    list = list.filter(n => n.category === 'KONSULTAN' || n.category === 'KAS' || n.iconType === 'verified')
  }

  // Keyword search filter
  if (searchQuery.value.trim()) {
    const q = searchQuery.value.toLowerCase().trim()
    list = list.filter(
      n =>
        n.title.toLowerCase().includes(q) ||
        n.message.toLowerCase().includes(q) ||
        (n.senderName && n.senderName.toLowerCase().includes(q)) ||
        (n.actionDetail && n.actionDetail.toLowerCase().includes(q)) ||
        n.category.toLowerCase().includes(q)
    )
  }

  return list
})

// Group by section: Today vs Yesterday
const todayNotifications = computed(() => {
  return displayedNotifications.value.filter(n => n.sectionGroup === 'today' || (!n.sectionGroup && !n.isRead))
})

const yesterdayNotifications = computed(() => {
  return displayedNotifications.value.filter(n => n.sectionGroup === 'yesterday' || (!n.sectionGroup && n.isRead))
})
</script>

<style scoped>
/* Hilangkan efek shadow, set background putih #FFFFFF & garis tepi konsisten matching Catatan Kas (progres.vue) */
.card-tactile-gopay,
:deep(.card-tactile-gopay) {
  background-color: #FFFFFF !important;
  box-shadow: none !important;
  border-width: 1.5px !important;
  border-color: #E2E8F0 !important;
}

.dark .card-tactile-gopay,
:deep(.dark .card-tactile-gopay),
:deep(.dark) .card-tactile-gopay {
  background-color: #13161F !important;
  border-color: rgba(255, 255, 255, 0.15) !important;
}

.card-tactile-gopay::before,
:deep(.card-tactile-gopay::before) {
  display: none !important;
  box-shadow: none !important;
}
</style>
