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

      <!-- Action Buttons on the Right (Sejajar) -->
      <div class="flex items-center gap-2.5 shrink-0 flex-wrap">
        <!-- Mark All as Read Button -->
        <BActionButton
          v-if="notificationStore.unreadCount > 0"
          variant="green"
          icon="check"
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
          title="Pengaturan Notifikasi"
        >
          Pengaturan
        </BActionButton>
      </div>
    </div>

    <!-- 2. Macro Segmented Pill Switcher with Native Counts (Tab Navigasi Makro - GoPay Green Edition) -->
    <BPillTabs
      v-model="selectedFilter"
      :tabs="filterTabs"
      size="md"
    />

    <!-- 4. Interactive Notifications Container (Matched with Catatan Kas & Beranda Card Concept) -->
    <div id="notifications-table-container" class="card-tactile-gopay rounded-[18px] overflow-hidden font-poppins">
      <!-- Container Header Bar -->
      <div class="p-6 sm:p-8 space-y-4 border-b border-[#E2E8F0] dark:border-neutral-800 bg-[#FFFFFF] dark:bg-[#13161F]">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div class="space-y-1.5 sm:space-y-2">
            <h2 class="text-xl font-poppins font-bold text-neutral-900 dark:text-white tracking-tight">
              Daftar Notifikasi & Aktivitas Toko
            </h2>
            <p class="text-xs sm:text-sm font-poppins text-neutral-500 dark:text-neutral-400 leading-normal max-w-sm sm:max-w-md">
              Histori seluruh pesan, verifikasi konsultan pendamping, dan pengajuan modal toko yang telah tervalidasi.
            </p>
          </div>

          <!-- Pill Status / Summary -->
          <div class="flex items-center gap-2 shrink-0">
            <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-[#00AA13] dark:bg-emerald-950/60 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/60 shadow-2xs">
              <span class="w-2 h-2 rounded-full bg-[#00AA13]" />
              <span>{{ displayedNotifications.length }} Catatan Terekam</span>
            </span>
          </div>
        </div>

        <!-- Search Input: Melebar rata kiri kanan di bawah teks, rounded-[8px] sesuai konsep design sistem -->
        <div class="w-full pt-3 sm:pt-4">
          <div class="relative w-full">
            <HugeiconsIcon
              :icon="Search01Icon"
              :size="16"
              :stroke-width="1.8"
              class="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400 dark:text-neutral-500 pointer-events-none"
            />
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Cari kata kunci notifikasi, nama pengirim, ID pesanan, atau catatan..."
              class="w-full pl-10 pr-10 py-2.5 rounded-[8px] border border-[#CBD5E1] dark:border-neutral-700 bg-white dark:bg-[#18191E] text-sm text-neutral-900 dark:text-white placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-[#156374]/30 dark:focus:ring-[#50AABF]/30 transition-all font-poppins"
            />
            <button
              v-if="searchQuery"
              type="button"
              aria-label="Hapus pencarian"
              class="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 text-neutral-400 hover:text-neutral-700 dark:hover:text-white cursor-pointer"
              title="Hapus pencarian"
              @click="searchQuery = ''"
            >
              <HugeiconsIcon :icon="Cancel01Icon" :size="16" :stroke-width="2" />
            </button>
          </div>
        </div>
      </div>

      <!-- Notifications List Body (Padded edge-to-edge container) -->
      <div class="p-6 sm:p-8 space-y-6">

      <!-- ========================================================================= -->
      <!-- 3. NOTIFICATION LIST SECTIONS (Today & Yesterday, matching Image 1 & 2)  -->
      <!-- ========================================================================= -->
      
      <!-- Empty State -->
      <div
        v-if="displayedNotifications.length === 0"
        class="py-16 text-center flex flex-col items-center justify-center space-y-3.5 bg-slate-50/50 dark:bg-[#141C2B]/30 rounded-2xl border border-dashed border-slate-200 dark:border-neutral-800"
      >
        <div class="w-14 h-14 rounded-2xl bg-[#E6F4F7] dark:bg-[#2091AA]/15 text-[#2091AA] dark:text-[#50AABF] flex items-center justify-center shadow-xs">
          <svg class="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
            <path d="M13.73 21a2 2 0 0 1-3.46 0" />
            <line x1="2" y1="2" x2="22" y2="22" />
          </svg>
        </div>
        <div class="space-y-1 max-w-sm">
          <h3 class="font-bold text-base text-neutral-900 dark:text-white">
            Tidak ada notifikasi ditemukan
          </h3>
          <p class="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed">
            <span v-if="searchQuery">
              Tidak ditemukan pesan yang cocok dengan "{{ searchQuery }}". Coba gunakan kata kunci lain.
            </span>
            <span v-else>
              Semua laporan kas dan permodalan tokomu sudah terupdate rapi. Lanjutkan aktivitas bisnis tokomu hari ini!
            </span>
          </p>
        </div>
        <button
          v-if="selectedFilter !== 'ALL' || searchQuery"
          type="button"
          class="text-xs font-semibold text-[#156374] dark:text-[#50AABF] hover:underline cursor-pointer pt-1"
          @click="resetFilters"
        >
          Tampilkan Semua Notifikasi
        </button>
      </div>

      <!-- Content Sections -->
      <div v-else class="space-y-6">
        
        <!-- ===================================================================== -->
        <!-- GROUP A: HARI INI (Today / Unread & High Priority)                   -->
        <!-- ===================================================================== -->
        <div v-if="todayNotifications.length > 0" class="space-y-2.5">
          <!-- Section Heading (Today) -->
          <div class="flex items-center justify-between text-xs font-semibold text-neutral-400 dark:text-neutral-500 uppercase tracking-wider pb-1">
            <span>Hari Ini</span>
            <span class="text-[11px] font-normal normal-case text-neutral-400">
              {{ todayNotifications.length }} pembaruan
            </span>
          </div>

          <!-- Notification Items List -->
          <div class="divide-y divide-dashed divide-slate-200 dark:divide-neutral-800/80 rounded-2xl border border-slate-100 dark:border-neutral-800/80 overflow-hidden bg-white dark:bg-[#13161F]">
            <div
              v-for="item in todayNotifications"
              :key="item.id"
              :class="[
                'p-4 sm:p-5 transition-colors duration-150 relative group',
                item.priority === 'HIGH' && !item.isRead
                  ? 'bg-[#FFF5F5] dark:bg-[#25181D]/60 hover:bg-[#FFEBEB] dark:hover:bg-[#2A1B21]'
                  : !item.isRead
                    ? 'bg-[#F4F9FC]/80 dark:bg-[#141C2B]/50 hover:bg-[#EBF4FA] dark:hover:bg-[#182337]/70'
                    : 'bg-white dark:bg-[#13161F] hover:bg-slate-50/80 dark:hover:bg-neutral-800/40'
              ]"
            >
              <div class="flex items-start gap-3 sm:gap-4">
                <!-- Status Indicator Dot on Far Left (Image 1 & 2 reference: Blue/Red/Grey) -->
                <div class="pt-3 shrink-0 flex items-center justify-center">
                  <span
                    v-if="item.priority === 'HIGH' && !item.isRead"
                    class="w-2.5 h-2.5 rounded-full bg-[#EF4444] shadow-xs"
                    title="Prioritas Tinggi"
                  />
                  <span
                    v-else-if="!item.isRead"
                    class="w-2.5 h-2.5 rounded-full bg-[#2563EB] shadow-xs"
                    title="Belum Dibaca"
                  />
                  <span
                    v-else
                    class="w-2 h-2 rounded-full bg-slate-300 dark:bg-neutral-700"
                    title="Sudah Dibaca"
                  />
                </div>

                <!-- Avatar with Badge Icon or Squircle Icon (Image 1 & 2 layout) -->
                <div class="relative shrink-0">
                  <!-- Case 1: Avatar with Badge Icon / Count -->
                  <div
                    v-if="item.avatar"
                    class="relative w-11 h-11 sm:w-12 sm:h-12 rounded-full shrink-0"
                  >
                    <img
                      :src="item.avatar"
                      :alt="item.senderName || item.title"
                      class="w-full h-full rounded-full object-cover border border-slate-200 dark:border-neutral-700 shadow-2xs bg-neutral-100 dark:bg-neutral-800"
                      @error="(e: any) => { e.target.src = '/images/user-profile.png' }"
                    />
                    <!-- Small Corner Badge Icon on Avatar (bottom right, like Image 1) -->
                    <span
                      v-if="item.badgeCount"
                      class="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 rounded-full bg-[#EF4444] text-white text-[10px] font-bold flex items-center justify-center ring-2 ring-white dark:ring-[#13161F] tabular-nums shadow-xs"
                    >
                      {{ item.badgeCount }}
                    </span>
                    <span
                      v-else-if="item.category === 'INVESTOR'"
                      class="absolute -bottom-0.5 -right-0.5 w-[18px] h-[18px] rounded-full bg-[#156374] text-white flex items-center justify-center ring-2 ring-white dark:ring-[#13161F]"
                      title="Mitra Modal"
                    >
                      <HugeiconsIcon :icon="Award01Icon" :size="10" :stroke-width="2.2" />
                    </span>
                  </div>

                  <!-- Case 2: Squircle with Checkmark (Payment verified) -->
                  <div
                    v-else-if="item.iconType === 'verified'"
                    class="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl flex items-center justify-center bg-[#EBF6F9] dark:bg-[#156374]/20 border border-[#A9D8E5]/60 dark:border-[#2091AA]/30 text-[#156374] dark:text-[#50AABF] shadow-2xs"
                  >
                    <svg class="w-5 h-5 sm:w-6 sm:h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M20 6 9 17l-5-5" />
                    </svg>
                  </div>

                  <!-- Case 3: Squircle with Shield (Security) -->
                  <div
                    v-else-if="item.iconType === 'shield'"
                    class="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl flex items-center justify-center bg-[#EBF6F9] dark:bg-[#156374]/20 border border-[#A9D8E5]/60 dark:border-[#2091AA]/30 text-[#156374] dark:text-[#50AABF] shadow-2xs"
                  >
                    <svg class="w-5 h-5 sm:w-6 sm:h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                      <path d="m9 12 2 2 4-4" />
                    </svg>
                  </div>

                  <!-- Case 4: Squircle with Growth / Activity Wave -->
                  <div
                    v-else-if="item.iconType === 'growth'"
                    class="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl flex items-center justify-center bg-[#EBF6F9] dark:bg-[#156374]/20 border border-[#A9D8E5]/60 dark:border-[#2091AA]/30 text-[#156374] dark:text-[#50AABF] shadow-2xs"
                  >
                    <svg class="w-5 h-5 sm:w-6 sm:h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                    </svg>
                  </div>

                  <!-- Case 5: Fallback Squircle Icon -->
                  <div
                    v-else
                    class="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl flex items-center justify-center bg-[#EBF6F9] dark:bg-[#156374]/20 border border-[#A9D8E5]/60 dark:border-[#2091AA]/30 text-[#156374] dark:text-[#50AABF] shadow-2xs"
                  >
                    <HugeiconsIcon
                      :icon="categoryConfig[item.category]?.icon || Notification01Icon"
                      :size="20"
                      :stroke-width="2.2"
                    />
                  </div>
                </div>

                <!-- Main Content (Sender Name + Action + Snippet, Image 1 & 2 layout) -->
                <div class="flex-1 min-w-0 pr-2">
                  <div class="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                    <!-- Sender Name + Action Text -->
                    <div class="text-[13.5px] sm:text-[14.5px] leading-snug">
                      <span class="font-bold text-neutral-900 dark:text-white">
                        {{ item.senderName || item.title }}
                      </span>
                      <span v-if="item.actionDetail" class="text-neutral-600 dark:text-neutral-300 font-normal ml-1">
                        {{ item.actionDetail }}
                      </span>
                    </div>

                    <!-- Timestamp on Top Right (Image 1 reference) -->
                    <span class="text-xs text-neutral-400 dark:text-neutral-500 shrink-0 tabular-nums font-normal">
                      {{ item.timestamp }}
                    </span>
                  </div>

                  <!-- Quote / Message Snippet in quotes (Matching Image 1 & 2) -->
                  <p class="text-xs sm:text-[13px] text-neutral-500 dark:text-neutral-400 mt-1 leading-relaxed">
                    {{ item.quoteSnippet || item.message }}
                  </p>
                </div>

                <!-- Action Button Group on Far Right (Matching Image 1 & 2: Reply & View) -->
                <div class="flex items-center gap-2 shrink-0 self-center">
                  <!-- Secondary Toggle Read Button (Ghost / Outline) -->
                  <button
                    type="button"
                    class="px-3 py-1.5 rounded-xl text-xs font-semibold border border-slate-200 dark:border-neutral-700 hover:bg-slate-100 dark:hover:bg-neutral-800 text-neutral-700 dark:text-neutral-300 transition-colors cursor-pointer"
                    :title="item.isRead ? 'Tandai belum dibaca' : 'Tandai sudah dibaca'"
                    @click="toggleReadState(item)"
                  >
                    {{ item.isRead ? 'Belum Dibaca' : 'Tandai Dibaca' }}
                  </button>

                  <!-- Primary Action Button (Solid Dark / Tactile as in Image 1 & 2) -->
                  <NuxtLink
                    v-if="item.link"
                    :to="item.link"
                    :class="[
                      'px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all shadow-xs cursor-pointer inline-flex items-center gap-1.5 select-none',
                      item.priority === 'HIGH' && !item.isRead
                        ? 'bg-[#18191E] dark:bg-white text-white dark:text-neutral-900 hover:bg-neutral-800 dark:hover:bg-neutral-100'
                        : 'bg-[#156374] dark:bg-[#2091AA] text-white hover:bg-[#0E434F] dark:hover:bg-[#187589]'
                    ]"
                    @click="notificationStore.markAsRead(item.id)"
                  >
                    <span>{{ item.actionLabel || 'Lihat' }}</span>
                    <HugeiconsIcon :icon="ArrowRight01Icon" :size="12" :stroke-width="2.2" />
                  </NuxtLink>

                  <!-- Delete Single Notification (Subtle icon on hover) -->
                  <button
                    type="button"
                    class="p-1.5 rounded-lg text-neutral-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors cursor-pointer opacity-0 group-hover:opacity-100"
                    title="Hapus notifikasi ini"
                    @click="notificationStore.deleteNotification(item.id)"
                  >
                    <HugeiconsIcon :icon="Cancel01Icon" :size="13" :stroke-width="2" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- ===================================================================== -->
        <!-- GROUP B: KEMARIN & SEBELUMNYA (Yesterday & Earlier, matching Image 1)  -->
        <!-- ===================================================================== -->
        <div v-if="yesterdayNotifications.length > 0" class="space-y-2.5 pt-2">
          <!-- Section Heading (Yesterday) -->
          <div class="flex items-center justify-between text-xs font-semibold text-neutral-400 dark:text-neutral-500 uppercase tracking-wider pb-1">
            <span>Kemarin & Sebelumnya</span>
            <span class="text-[11px] font-normal normal-case text-neutral-400">
              {{ yesterdayNotifications.length }} riwayat
            </span>
          </div>

          <!-- Notification Items List -->
          <div class="divide-y divide-dashed divide-slate-200 dark:divide-neutral-800/80 rounded-2xl border border-slate-100 dark:border-neutral-800/80 overflow-hidden bg-white dark:bg-[#13161F]">
            <div
              v-for="item in yesterdayNotifications"
              :key="item.id"
              class="p-4 sm:p-5 transition-colors duration-150 relative group bg-white dark:bg-[#13161F] hover:bg-slate-50/80 dark:hover:bg-neutral-800/40"
            >
              <div class="flex items-start gap-3 sm:gap-4">
                <!-- Status Indicator Dot (Grey for Read History, as in Image 1) -->
                <div class="pt-3 shrink-0 flex items-center justify-center">
                  <span class="w-2 h-2 rounded-full bg-slate-300 dark:bg-neutral-700" />
                </div>

                <!-- Avatar with Badge Icon or Squircle Icon -->
                <div class="relative shrink-0">
                  <!-- Case 1: Avatar with Corner Badge -->
                  <div
                    v-if="item.avatar"
                    class="relative w-11 h-11 sm:w-12 sm:h-12 rounded-full shrink-0"
                  >
                    <img
                      :src="item.avatar"
                      :alt="item.senderName || item.title"
                      class="w-full h-full rounded-full object-cover border border-slate-200 dark:border-neutral-700 shadow-2xs bg-neutral-100 dark:bg-neutral-800"
                      @error="(e: any) => { e.target.src = '/images/user-profile.png' }"
                    />
                    <span
                      v-if="item.badgeCount"
                      class="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 rounded-full bg-[#EF4444] text-white text-[10px] font-bold flex items-center justify-center ring-2 ring-white dark:ring-[#13161F] tabular-nums shadow-xs"
                    >
                      {{ item.badgeCount }}
                    </span>
                  </div>

                  <!-- Case 2: Squircle with Checkmark -->
                  <div
                    v-else-if="item.iconType === 'verified'"
                    class="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl flex items-center justify-center bg-[#F0F5FF] dark:bg-[#1E293B] border border-[#E0EAFF] dark:border-[#334155] text-[#2563EB] dark:text-[#60A5FA] shadow-2xs"
                  >
                    <svg class="w-5 h-5 sm:w-6 sm:h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M20 6 9 17l-5-5" />
                    </svg>
                  </div>

                  <!-- Case 3: Squircle with Growth Wave -->
                  <div
                    v-else-if="item.iconType === 'growth'"
                    class="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl flex items-center justify-center bg-[#F0F5FF] dark:bg-[#1E293B] border border-[#E0EAFF] dark:border-[#334155] text-[#2563EB] dark:text-[#60A5FA] shadow-2xs"
                  >
                    <svg class="w-5 h-5 sm:w-6 sm:h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                    </svg>
                  </div>

                  <!-- Case 4: Fallback Squircle Icon -->
                  <div
                    v-else
                    class="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl flex items-center justify-center bg-[#F0F5FF] dark:bg-[#1E293B] border border-[#E0EAFF] dark:border-[#334155] text-[#2563EB] dark:text-[#60A5FA] shadow-2xs"
                  >
                    <HugeiconsIcon
                      :icon="categoryConfig[item.category]?.icon || Notification01Icon"
                      :size="20"
                      :stroke-width="2.2"
                    />
                  </div>
                </div>

                <!-- Main Content -->
                <div class="flex-1 min-w-0 pr-2">
                  <div class="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                    <!-- Sender Name + Action Text -->
                    <div class="text-[13.5px] sm:text-[14.5px] leading-snug">
                      <span class="font-bold text-neutral-900 dark:text-white">
                        {{ item.senderName || item.title }}
                      </span>
                      <span v-if="item.actionDetail" class="text-neutral-600 dark:text-neutral-300 font-normal ml-1">
                        {{ item.actionDetail }}
                      </span>
                    </div>

                    <!-- Timestamp on Top Right -->
                    <span class="text-xs text-neutral-400 dark:text-neutral-500 shrink-0 tabular-nums font-normal">
                      {{ item.timestamp }}
                    </span>
                  </div>

                  <!-- Quote Snippet in quotes -->
                  <p class="text-xs sm:text-[13px] text-neutral-500 dark:text-neutral-400 mt-1 leading-relaxed">
                    {{ item.quoteSnippet || item.message }}
                  </p>
                </div>

                <!-- Action Button Group on Far Right -->
                <div class="flex items-center gap-2 shrink-0 self-center">
                  <!-- Secondary Toggle Read Button -->
                  <button
                    type="button"
                    class="px-3 py-1.5 rounded-xl text-xs font-semibold border border-slate-200 dark:border-neutral-700 hover:bg-slate-100 dark:hover:bg-neutral-800 text-neutral-700 dark:text-neutral-300 transition-colors cursor-pointer"
                    :title="item.isRead ? 'Tandai belum dibaca' : 'Tandai sudah dibaca'"
                    @click="toggleReadState(item)"
                  >
                    {{ item.isRead ? 'Belum Dibaca' : 'Tandai Dibaca' }}
                  </button>

                  <!-- Primary Action Button -->
                  <NuxtLink
                    v-if="item.link"
                    :to="item.link"
                    class="px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-[#156374] dark:bg-[#2091AA] hover:bg-[#0E434F] dark:hover:bg-[#187589] text-white transition-all shadow-xs cursor-pointer inline-flex items-center gap-1.5 select-none"
                    @click="notificationStore.markAsRead(item.id)"
                  >
                    <span>{{ item.actionLabel || 'Lihat' }}</span>
                    <HugeiconsIcon :icon="ArrowRight01Icon" :size="12" :stroke-width="2.2" />
                  </NuxtLink>

                  <!-- Delete Single Notification -->
                  <button
                    type="button"
                    class="p-1.5 rounded-lg text-neutral-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors cursor-pointer opacity-0 group-hover:opacity-100"
                    title="Hapus notifikasi ini"
                    @click="notificationStore.deleteNotification(item.id)"
                  >
                    <HugeiconsIcon :icon="Cancel01Icon" :size="13" :stroke-width="2" />
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
  RefreshIcon
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

onMounted(() => {
  notificationStore.initNotifications()

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
})

function handleRefresh() {
  notificationStore.initNotifications(true)
}

function resetFilters() {
  setFilter('ALL')
  searchQuery.value = ''
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
