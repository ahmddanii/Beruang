<template>
  <div class="h-full flex flex-col font-poppins text-neutral-900 dark:text-neutral-100 overflow-hidden select-text">
    <!-- ========================================================================= -->
    <!-- 1. TOP HEADER: Clean Page Title                                           -->
    <!-- Catatan: Tombol 'Ruang Modal' telah dihapus sesuai instruksi               -->
    <!-- ========================================================================= -->
    <div class="flex items-center justify-between gap-3 mb-3.5 shrink-0 min-h-[44px]">
      <div class="flex items-center gap-2.5 sm:gap-3">
        <HugeiconsIcon
          :icon="Message01Icon"
          :size="26"
          :stroke-width="2.2"
          class="text-neutral-900 dark:text-white shrink-0"
        />
        <h1 class="font-poppins font-semibold text-2xl sm:text-3xl text-neutral-900 dark:text-white tracking-tight leading-tight">
          Pesan
        </h1>
      </div>
    </div>

    <!-- ========================================================================= -->
    <!-- 2. MAIN UNIFIED CHAT CONTAINER (Clean Minimalist Multi-Pane Split View)    -->
    <!-- Menyatukan 3 panel dalam 1 container frame berestetika tinggi             -->
    <!-- Kolom 1 (Kiri): Daftar Percakapan & Filter Cepat                          -->
    <!-- Kolom 2 (Tengah): Ruang Obrolan dengan Header Bersih & Chat Stream        -->
    <!-- Kolom 3 (Kanan): Rincian Mitra & Dokumen Legalitas (Smooth Expand/Compact)-->
    <!-- ========================================================================= -->
    <div class="flex-1 min-h-0 card-tactile-gopay rounded-2xl border border-[#E2E8F0] dark:border-neutral-800 bg-white dark:bg-[#13161F] flex overflow-hidden shadow-none">
      
      <!-- ======================================================================= -->
      <!-- PANEL KIRI (Kolom 1: Daftar Percakapan)                                 -->
      <!-- Catatan: Judul 'Pesan Masuk Investor' & pill '4 Percakapan' telah dihapus-->
      <!-- ======================================================================= -->
      <aside
        :class="[
          'w-full lg:w-80 xl:w-[330px] shrink-0 border-r border-[#E2E8F0] dark:border-neutral-800 flex flex-col h-full bg-[#FAFBFD] dark:bg-[#11141D]',
          isMobileChatOpen ? 'hidden lg:flex' : 'flex'
        ]"
      >
        <!-- Header Panel: Bilah Pencarian & Filter Terpadu (Satu Bar Kompak) -->
        <div class="p-2.5 sm:p-3 border-b border-[#E2E8F0] dark:border-neutral-800 shrink-0 bg-white dark:bg-[#13161F]">
          <!-- Unified Search & Category Filter Control Bar -->
          <div class="relative w-full rounded-xl border border-neutral-200/90 dark:border-neutral-700/80 bg-neutral-100/70 dark:bg-neutral-800/60 focus-within:border-[#00800e] dark:focus-within:border-[#00C058] focus-within:ring-2 focus-within:ring-[#00800e]/20 transition-all flex items-center min-h-[40px] overflow-hidden">
            <!-- Left: Search icon + input -->
            <div class="relative flex-1 flex items-center min-w-[100px]">
              <HugeiconsIcon :icon="Search01Icon" :size="15" class="ml-2.5 text-neutral-400 shrink-0 pointer-events-none" />
              <input
                v-model="chatStore.searchQuery"
                type="text"
                placeholder="Cari pesan..."
                class="w-full pl-2 pr-1 py-1.5 text-xs bg-transparent border-0 text-neutral-900 dark:text-white placeholder:text-neutral-400 focus:outline-none focus:ring-0 font-sans min-w-0"
              />
            </div>

            <!-- Divider Line -->
            <div class="h-4 w-px bg-neutral-300 dark:bg-neutral-700 shrink-0" aria-hidden="true" />

            <!-- Right: Filter Pill Trigger Buttons (Joined seamlessly) -->
            <div class="flex items-center gap-0.5 px-1 shrink-0">
              <button
                v-for="filter in [
                  { id: 'all', label: 'Semua' },
                  { id: 'konsultan', label: 'Konsultan' },
                  { id: 'pemodal', label: 'Pemodal' }
                ]"
                :key="filter.id"
                type="button"
                :class="[
                  'px-2 py-0.5 rounded-md text-[11px] font-medium transition-all duration-150 cursor-pointer whitespace-nowrap',
                  activeFilter === filter.id
                    ? 'bg-[#00800e] text-white font-semibold shadow-2xs'
                    : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-200/60 dark:hover:bg-neutral-700/60'
                ]"
                @click="setFilterCategory(filter.id as any)"
              >
                {{ filter.label }}
              </button>
            </div>
          </div>
        </div>

        <!-- Scrollable Thread Cards List -->
        <!-- Efek Hover: Sama seperti 'btn putih' (bg putih, border slate, shadow-2xs) -->
        <!-- Efek Active: Sama seperti 'warna btn active' (bg #00800e, text putih) -->
        <div class="flex-1 overflow-y-auto p-2 sm:p-2.5 space-y-1.5 scrollbar-thin">
          <button
            v-for="thread in filteredThreads"
            :key="thread.id"
            type="button"
            :class="[
              'thread-card-item group relative w-full text-left p-3 rounded-xl transition-all duration-180 cursor-pointer flex items-start gap-3 border',
              chatStore.activeThreadId === thread.id
                ? 'bg-[#00800e] text-white border-[#00800e] shadow-[0_2px_8px_rgba(0,128,14,0.22)] ring-1 ring-[#00800e]'
                : 'bg-transparent border-transparent text-neutral-900 dark:text-white hover:bg-white dark:hover:bg-[#1A1A1A] hover:border-[#CBD5E1] dark:hover:border-neutral-700 hover:shadow-[0_1.5px_0_rgba(0,0,0,0.06)] active:scale-[0.99]'
            ]"
            @click="selectThread(thread.id)"
          >
            <!-- Avatar with Online Badge -->
            <div class="relative w-10 h-10 rounded-full shrink-0">
              <img
                :src="thread.investorAvatar"
                alt="Foto Profil"
                class="w-full h-full rounded-full object-cover border"
                :class="chatStore.activeThreadId === thread.id ? 'border-white/40' : 'border-neutral-200/80 dark:border-neutral-700'"
              />
              <span
                class="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full ring-2"
                :class="[
                  thread.online ? 'bg-emerald-400' : 'bg-neutral-400',
                  chatStore.activeThreadId === thread.id ? 'ring-[#00800e]' : 'ring-white dark:ring-[#13161F]'
                ]"
              />
            </div>

            <!-- Thread Text Info -->
            <div class="flex-1 min-w-0">
              <div class="flex items-center justify-between gap-1">
                <h4
                  :class="[
                    'font-poppins font-semibold text-xs sm:text-[13px] truncate',
                    chatStore.activeThreadId === thread.id
                      ? 'text-white'
                      : 'text-neutral-900 dark:text-white group-hover:text-neutral-900 dark:group-hover:text-white'
                  ]"
                >
                  {{ thread.investorName }}
                </h4>
                <span
                  :class="[
                    'text-[10px] tabular-nums shrink-0 font-sans',
                    chatStore.activeThreadId === thread.id ? 'text-emerald-100' : 'text-neutral-400'
                  ]"
                >
                  {{ thread.lastMessageAt || 'Hari ini' }}
                </span>
              </div>
              
              <p
                :class="[
                  'text-[11px] truncate mt-0.5 font-sans leading-normal',
                  chatStore.activeThreadId === thread.id
                    ? 'text-emerald-50'
                    : 'text-neutral-500 dark:text-neutral-400 group-hover:text-neutral-600 dark:group-hover:text-neutral-300'
                ]"
              >
                {{ thread.lastMessage }}
              </p>

              <div class="flex items-center gap-1.5 mt-1.5">
                <span
                  :class="[
                    'text-[10px] font-medium px-2 py-0.5 rounded-full truncate font-sans',
                    chatStore.activeThreadId === thread.id
                      ? 'bg-white/20 text-white'
                      : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 group-hover:bg-neutral-100 dark:group-hover:bg-neutral-800'
                  ]"
                >
                  {{ thread.investorLembaga }}
                </span>
                <span
                  v-if="thread.unreadUmkm > 0"
                  :class="[
                    'px-1.5 py-0.2 rounded-full text-[10px] font-bold tabular-nums shrink-0 ml-auto leading-none',
                    chatStore.activeThreadId === thread.id
                      ? 'bg-white text-[#00800e]'
                      : 'bg-[#00800e] text-white'
                  ]"
                >
                  {{ thread.unreadUmkm }}
                </span>
              </div>
            </div>
          </button>

          <!-- Empty State -->
          <div v-if="filteredThreads.length === 0" class="p-6 text-center text-xs text-neutral-400 font-sans space-y-1">
            <p class="font-semibold text-neutral-700 dark:text-neutral-300">Tidak ada percakapan</p>
            <p>Ubah kata kunci pencarian atau ganti filter kategori.</p>
          </div>
        </div>
      </aside>

      <!-- ======================================================================= -->
      <!-- PANEL TENGAH (Kolom 2: Ruang Obrolan Utama)                             -->
      <!-- ======================================================================= -->
      <section
        v-if="activeThread"
        :class="[
          'flex-1 min-w-0 flex flex-col h-full bg-white dark:bg-[#13161F]',
          !isMobileChatOpen ? 'hidden lg:flex' : 'flex'
        ]"
      >
        <!-- 1. HEADER CHAT: Ramping, Bersih, dengan Tombol Rincian Putih Bulat -->
        <div class="h-16 px-4 sm:px-6 border-b border-[#E2E8F0] dark:border-neutral-800 flex items-center justify-between gap-3 shrink-0 bg-white dark:bg-[#13161F]">
          <div class="flex items-center gap-3 min-w-0">
            <!-- Mobile Back Button -->
            <button
              type="button"
              class="lg:hidden p-1.5 -ml-1 rounded-xl text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 cursor-pointer"
              aria-label="Kembali ke Daftar Pesan"
              @click="isMobileChatOpen = false"
            >
              <HugeiconsIcon :icon="ArrowLeft01Icon" :size="18" />
            </button>

            <!-- Counterpart Avatar with Online Badge -->
            <div class="relative w-10 h-10 rounded-full shrink-0">
              <img
                :src="activeThread.investorAvatar || '/images/user-profile.png'"
                :alt="activeThread.investorName"
                class="w-full h-full rounded-full object-cover border border-neutral-200/80 dark:border-neutral-700"
              />
              <span
                class="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full ring-2 ring-white dark:ring-[#13161F]"
                :class="activeThread.online ? 'bg-[#00800e]' : 'bg-neutral-400'"
              />
            </div>

            <!-- Partner Identity Details -->
            <div class="min-w-0">
              <h2 class="font-poppins font-semibold text-sm sm:text-base text-neutral-900 dark:text-white truncate leading-tight">
                {{ activeThread.investorName }}
              </h2>
              
              <div class="flex items-center gap-1.5 text-xs text-neutral-500 dark:text-neutral-400 mt-0.5 font-sans truncate">
                <span class="truncate">{{ activeThread.investorLembaga }}</span>
                <span class="text-neutral-300 dark:text-neutral-700 shrink-0">•</span>
                <span class="inline-flex items-center gap-0.5 text-[#00800e] dark:text-emerald-400 font-medium shrink-0">
                  <HugeiconsIcon :icon="ShieldCheckIcon" :size="12" class="shrink-0" />
                  <span>Terverifikasi</span>
                </span>
              </div>
            </div>
          </div>

          <!-- Header Right Actions: Tombol Putih Bulat untuk Toggle Rincian (Compact / Expand) -->
          <div class="flex items-center gap-2 shrink-0">
            <button
              ref="toggleDetailBtnRef"
              type="button"
              :class="[
                'w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 cursor-pointer shadow-xs shrink-0',
                'bg-white dark:bg-[#18191E] border border-[#CBD5E1] dark:border-neutral-700 hover:border-slate-300 dark:hover:border-neutral-600',
                isDetailPanelOpen
                  ? 'ring-2 ring-[#00800e]/30 border-[#00800e] text-[#00800e] dark:text-[#00C058]'
                  : 'text-neutral-600 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-800 hover:text-neutral-900 dark:hover:text-white'
              ]"
              :title="isDetailPanelOpen ? 'Kecilkan Rincian Mitra (Compact)' : 'Tampilkan Rincian Mitra (Expand)'"
              @click="toggleDetailPanel"
            >
              <div ref="toggleIconWrapperRef" class="flex items-center justify-center">
                <HugeiconsIcon
                  :icon="Folder01Icon"
                  :size="18"
                  :stroke-width="2.0"
                />
              </div>
            </button>
          </div>
        </div>

        <!-- 2. Chat Stream Body -->
        <div ref="messagesContainer" class="flex-1 min-h-0 overflow-y-auto p-4 sm:p-6 space-y-4 overscroll-contain bg-[#FAFBFD] dark:bg-[#13161F]">
          <!-- Date Divider Pill -->
          <div class="flex items-center justify-center my-1">
            <span class="px-3.5 py-0.5 rounded-full text-[11px] font-semibold bg-white dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400 border border-neutral-200/80 dark:border-neutral-700/80 shadow-2xs font-sans">
              Hari ini, 23 Juli 2026
            </span>
          </div>

          <!-- Messages Stream with Left/Right Bubbles -->
          <div
            v-for="msg in activeThread.messages"
            :key="msg.id"
            :class="[
              'chat-bubble-item flex items-start gap-2.5 max-w-[85%] sm:max-w-[75%]',
              msg.senderRole === 'UMKM' ? 'ml-auto flex-row-reverse' : 'mr-auto'
            ]"
          >
            <!-- Sender Avatar -->
            <div class="w-8 h-8 rounded-full overflow-hidden shrink-0 mt-0.5 border border-neutral-200 dark:border-neutral-700 shadow-2xs">
              <img
                :src="msg.senderRole === 'UMKM' ? '/images/user-profile.png' : activeThread.investorAvatar"
                alt="Avatar"
                class="w-full h-full object-cover"
              />
            </div>

            <!-- Message Bubble Content -->
            <div class="space-y-1 min-w-0" :class="msg.senderRole === 'UMKM' ? 'items-end text-right' : 'items-start'">
              <div class="flex items-center gap-2 text-[11px]" :class="msg.senderRole === 'UMKM' ? 'justify-end' : ''">
                <span class="font-semibold text-neutral-900 dark:text-white font-poppins">
                  {{ msg.senderRole === 'UMKM' ? 'Anda (Kopi Senja)' : activeThread.investorName }}
                </span>
                <span class="text-neutral-400 tabular-nums font-sans">{{ msg.timestamp }}</span>
              </div>

              <div
                :class="[
                  'p-3.5 sm:p-4 rounded-2xl text-xs sm:text-[13px] leading-relaxed shadow-2xs text-left font-sans',
                  msg.senderRole === 'UMKM'
                    ? 'bg-[#00800e] text-white rounded-tr-xs'
                    : 'bg-white dark:bg-[#18191E] border border-neutral-200/90 dark:border-neutral-700 text-neutral-900 dark:text-white rounded-tl-xs'
                ]"
              >
                <p class="whitespace-pre-wrap">{{ msg.text }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Catatan: Rekomendasi chat (quick response chips) telah dihapus sesuai instruksi -->

        <!-- 3. Minimalist Input Bar -->
        <div class="p-3 sm:p-4 border-t border-[#E2E8F0] dark:border-neutral-800 shrink-0 bg-white dark:bg-[#13161F]">
          <form
            class="relative flex items-center gap-2 px-3.5 py-1.5 rounded-2xl bg-neutral-100/80 dark:bg-[#18191E] border border-neutral-200/90 dark:border-neutral-700/90 focus-within:ring-2 focus-within:ring-[#00800e]/20 focus-within:border-[#00800e] transition-all"
            @submit.prevent="handleSendMessage"
          >
            <!-- Add / Attach Button (+) -->
            <button
              type="button"
              class="w-8 h-8 rounded-xl bg-white dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white flex items-center justify-center shadow-2xs transition-transform hover:scale-105 shrink-0 cursor-pointer"
              title="Lampirkan Dokumen atau Foto"
              @click="triggerAttachmentAlert"
            >
              <HugeiconsIcon :icon="Add01Icon" :size="16" />
            </button>

            <!-- Text Input -->
            <input
              v-model="inputMessage"
              type="text"
              placeholder="Tulis pesan untuk kelanjutan pendanaan atau konsultasi..."
              class="flex-1 px-2 py-2 text-xs sm:text-sm bg-transparent text-neutral-900 dark:text-white placeholder:text-neutral-400 focus:outline-none font-sans"
            />

            <!-- Smile / Emoji Button -->
            <button
              type="button"
              class="w-8 h-8 rounded-xl text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 flex items-center justify-center shrink-0 cursor-pointer transition-colors"
              title="Pilih Emoji"
            >
              <HugeiconsIcon :icon="SmileIcon" :size="17" />
            </button>

            <!-- Send Button -->
            <button
              type="submit"
              :disabled="!inputMessage.trim()"
              class="w-9 h-9 rounded-xl bg-[#00800e] hover:bg-[#006e0c] disabled:opacity-40 disabled:cursor-not-allowed text-white flex items-center justify-center shadow-xs transition-transform active:scale-95 shrink-0 cursor-pointer"
              title="Kirim Pesan"
            >
              <HugeiconsIcon :icon="SendIcon" :size="16" />
            </button>
          </form>
        </div>
      </section>

      <!-- ======================================================================= -->
      <!-- PANEL KANAN (Kolom 3: Rincian Mitra & Dokumen - Animasi Expand/Compact) -->
      <!-- Animasi GSAP & transisi lebar halus (SaaS-grade smooth collapsible)    -->
      <!-- ======================================================================= -->
      <aside
        ref="detailPanelRef"
        :class="[
          'transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] shrink-0 border-l border-[#E2E8F0] dark:border-neutral-800 flex flex-col h-full bg-[#FAFBFD] dark:bg-[#11141D] overflow-hidden',
          isDetailPanelOpen
            ? 'w-72 xl:w-[295px] opacity-100 pointer-events-auto'
            : 'w-0 opacity-0 pointer-events-none border-l-0 -mr-px',
          'fixed inset-y-0 right-0 z-50 shadow-2xl xl:relative xl:z-auto xl:shadow-none'
        ]"
      >
        <!-- Panel Header -->
        <div class="h-16 px-4 border-b border-[#E2E8F0] dark:border-neutral-800 flex items-center justify-between shrink-0 bg-white dark:bg-[#13161F]">
          <div class="flex items-center gap-2">
            <HugeiconsIcon :icon="Folder01Icon" :size="17" class="text-[#00800e] dark:text-[#00C058]" />
            <h3 class="font-poppins font-semibold text-sm text-neutral-900 dark:text-white">
              Rincian Kemitraan
            </h3>
          </div>

          <!-- Close / Compact button -->
          <button
            type="button"
            class="p-1.5 rounded-lg text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800 cursor-pointer transition-colors"
            title="Kecilkan Rincian (Compact)"
            @click="toggleDetailPanel"
          >
            ✕
          </button>
        </div>

        <!-- Scrollable Shared Media Sections -->
        <div class="flex-1 overflow-y-auto p-4 space-y-4">
          
          <!-- SECTION 1: PROFIL & STATUS MITRA -->
          <div class="detail-stagger-item space-y-3">
            <div class="p-3.5 rounded-xl bg-white dark:bg-[#13161F] border border-[#E2E8F0] dark:border-neutral-800 space-y-3">
              <div class="flex items-center gap-2.5">
                <img
                  :src="activeThread?.investorAvatar || '/images/user-profile.png'"
                  :alt="activeThread?.investorName"
                  class="w-11 h-11 rounded-full object-cover border border-neutral-200 dark:border-neutral-700 shrink-0"
                />
                <div class="min-w-0">
                  <h4 class="font-poppins font-semibold text-xs sm:text-[13px] text-neutral-900 dark:text-white truncate">
                    {{ activeThread?.investorName }}
                  </h4>
                  <p class="text-[11px] text-neutral-500 dark:text-neutral-400 truncate font-sans">
                    {{ activeThread?.investorLembaga }}
                  </p>
                </div>
              </div>

              <p class="text-xs font-sans text-neutral-600 dark:text-neutral-300 leading-relaxed border-t border-neutral-100 dark:border-neutral-800 pt-2.5">
                {{ isKonsultan
                  ? 'Konsultan pendamping resmi Beruang yang memverifikasi tata kelola kas dan kesiapan toko.'
                  : 'Mitra pemodal institusi terakreditasi untuk alokasi modal bagi hasil usaha.'
                }}
              </p>
            </div>

            <!-- Matriks Status Penjajakan -->
            <div class="p-3.5 rounded-xl bg-white dark:bg-[#13161F] border border-[#E2E8F0] dark:border-neutral-800 space-y-2.5 text-xs font-sans">
              <div class="flex items-center justify-between pb-1.5 border-b border-neutral-100 dark:border-neutral-800">
                <span class="text-neutral-500">Status Diskusi:</span>
                <span class="font-semibold text-neutral-800 dark:text-neutral-200">{{ activeThread?.dealStatus || 'Due Diligence Kas' }}</span>
              </div>
              <div class="flex items-center justify-between pb-1.5 border-b border-neutral-100 dark:border-neutral-800">
                <span class="text-neutral-500">Alokasi Tiket:</span>
                <span class="font-semibold text-[#00800e] dark:text-emerald-400 tabular-nums">
                  {{ activeThread?.ticketDiscussed ? `Rp ${(activeThread.ticketDiscussed / 1000000).toLocaleString('id-ID')} Jt` : 'Pendampingan Rutin' }}
                </span>
              </div>
              <div class="flex items-center justify-between">
                <span class="text-neutral-500">Kesiapan Toko:</span>
                <span class="font-semibold text-neutral-800 dark:text-neutral-200">79% (Grade B+)</span>
              </div>
            </div>

            <!-- Tombol Aksi Cepat Terkait -->
            <div class="grid grid-cols-2 gap-2">
              <BActionButton
                to="/dashboard/rencana-aksi"
                variant="default"
                icon="none"
                custom-class="!h-9 !min-h-9 !text-xs !px-2.5 !w-full justify-center"
              >
                Progress Tugas
              </BActionButton>
              <BActionButton
                to="/dashboard/pendanaan"
                variant="green"
                icon="none"
                custom-class="!h-9 !min-h-9 !text-xs !px-2.5 !w-full justify-center"
              >
                Cari Modal
              </BActionButton>
            </div>
          </div>

          <!-- SEPARATOR -->
          <div class="border-t border-[#E2E8F0] dark:border-neutral-800" />

          <!-- SECTION 2: DOKUMEN RESMI TOKO -->
          <div class="detail-stagger-item space-y-3">
            <div class="flex items-center justify-between">
              <h3 class="font-poppins font-semibold text-xs sm:text-sm text-neutral-900 dark:text-white">
                Dokumen Usaha
              </h3>
              <span class="text-[11px] font-medium text-neutral-400 tabular-nums font-sans">
                {{ officialDocuments.length }} Berkas
              </span>
            </div>

            <!-- Documents List -->
            <div class="space-y-2">
              <div
                v-for="(doc, idx) in officialDocuments"
                :key="`doc-${idx}`"
                class="p-2.5 rounded-xl border border-neutral-200/80 dark:border-neutral-800 bg-white dark:bg-[#13161F] hover:border-neutral-300 dark:hover:border-neutral-700 transition-colors flex items-center justify-between gap-2.5"
              >
                <div class="w-8 h-8 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 text-[#00800e] flex items-center justify-center shrink-0">
                  <HugeiconsIcon :icon="FileValidationIcon" :size="16" />
                </div>
                <div class="flex-1 min-w-0">
                  <h5 class="text-xs font-semibold text-neutral-900 dark:text-white truncate font-poppins">
                    {{ doc.name }}
                  </h5>
                  <div class="flex items-center gap-1.5 text-[10px] text-neutral-400 font-sans mt-0.5">
                    <span class="tabular-nums">{{ doc.size }}</span>
                    <span>•</span>
                    <span class="text-[#00800e] font-medium">{{ doc.status }}</span>
                  </div>
                </div>
                <button
                  type="button"
                  class="w-7 h-7 rounded-lg text-neutral-400 hover:text-neutral-800 dark:hover:text-neutral-200 flex items-center justify-center shrink-0 cursor-pointer hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                  :title="`Unduh ${doc.name}`"
                  @click="downloadDocument(doc.name)"
                >
                  <HugeiconsIcon :icon="Download01Icon" :size="14" />
                </button>
              </div>
            </div>

            <!-- Upload Button Trigger -->
            <BActionButton
              variant="default"
              icon="plus"
              custom-class="!h-9 !min-h-9 !text-xs !w-full justify-center border-dashed"
              @click="triggerUploadDocument"
            >
              Unggah Berkas Baru
            </BActionButton>
          </div>

        </div>
      </aside>

    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, nextTick, onMounted } from 'vue'
import gsap from 'gsap'
import { useChatStore } from '~/stores/chat'
import BActionButton from '~/components/base/BActionButton.vue'
import { HugeiconsIcon } from '@hugeicons/vue'
import {
  Message01Icon,
  Search01Icon,
  ArrowLeft01Icon,
  SendIcon,
  Folder01Icon,
  SmileIcon,
  Add01Icon,
  ShieldCheckIcon,
  FileValidationIcon,
  Download01Icon
} from '@hugeicons/core-free-icons'

definePageMeta({
  layout: 'dashboard',
  hideHeader: true
})

const chatStore = useChatStore()

const inputMessage = ref('')
const messagesContainer = ref<HTMLElement | null>(null)
const isMobileChatOpen = ref(false)
const isDetailPanelOpen = ref(false)
const activeFilter = ref<'all' | 'konsultan' | 'pemodal'>('all')

const toggleDetailBtnRef = ref<HTMLElement | null>(null)
const toggleIconWrapperRef = ref<HTMLElement | null>(null)
const detailPanelRef = ref<HTMLElement | null>(null)

// Filter threads by active filter tab & search query
const filteredThreads = computed(() => {
  let list = chatStore.filteredThreads
  if (activeFilter.value === 'konsultan') {
    list = list.filter(t => 
      t.investorLembaga.toLowerCase().includes('konsultan') || 
      t.investorLembaga.toLowerCase().includes('legalitas') ||
      t.investorName.toLowerCase().includes('maya') ||
      t.investorName.toLowerCase().includes('shafa')
    )
  } else if (activeFilter.value === 'pemodal') {
    list = list.filter(t => 
      !t.investorLembaga.toLowerCase().includes('konsultan') && 
      !t.investorLembaga.toLowerCase().includes('legalitas') &&
      !t.investorName.toLowerCase().includes('maya') &&
      !t.investorName.toLowerCase().includes('shafa')
    )
  }
  return list
})

const activeThread = computed(() => chatStore.activeThread)

const isKonsultan = computed(() => {
  if (!activeThread.value) return false
  const lembaga = activeThread.value.investorLembaga.toLowerCase()
  const name = activeThread.value.investorName.toLowerCase()
  return lembaga.includes('konsultan') || lembaga.includes('legalitas') || name.includes('maya') || name.includes('shafa')
})

// Official Documents List (Sesuai Konteks Bisnis UMKM Beruang)
const officialDocuments = [
  { name: 'NIB OSS RBA - Legalitas Usaha.pdf', size: '1.8 MB', status: 'Dokumen Sah' },
  { name: 'Laporan Rekonsiliasi Kas 30 Hari.pdf', size: '3.2 MB', status: 'Tervalidasi' },
  { name: 'NPWP Toko & Rekening Koran.pdf', size: '980 KB', status: 'Terverifikasi' },
  { name: 'Proposal Kemitraan Bagi Hasil.pdf', size: '2.4 MB', status: 'Siap Akses' }
]

function scrollToBottom() {
  nextTick(() => {
    if (messagesContainer.value) {
      messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight
    }
  })
}

function setFilterCategory(category: 'all' | 'konsultan' | 'pemodal') {
  activeFilter.value = category
  nextTick(() => {
    animateThreadsEntrance()
  })
}

function selectThread(threadId: string) {
  chatStore.setActiveThread(threadId)
  chatStore.markAsRead(threadId, 'UMKM')
  isMobileChatOpen.value = true
  scrollToBottom()
  nextTick(() => {
    animateMessagesEntrance()
  })
}

function handleSendMessage() {
  if (!inputMessage.value.trim() || !activeThread.value) return
  chatStore.sendMessage(activeThread.value.id, inputMessage.value, 'UMKM')
  inputMessage.value = ''
  scrollToBottom()
  nextTick(() => {
    animateLatestMessageEntrance()
  })
}

function triggerAttachmentAlert() {
  alert('Silakan pilih berkas atau foto yang ingin dilampirkan ke ruang obrolan.')
}

function triggerUploadDocument() {
  alert('Silakan pilih berkas dokumen legalitas atau laporan kas (PDF) untuk diunggah ke ruang data.')
}

function downloadDocument(docName: string) {
  alert(`Memulai unduhan dokumen resmi: ${docName}`)
}

// =============================================================================
// GSAP SAAS-GRADE MOTION & TRANSITIONS
// =============================================================================

function toggleDetailPanel() {
  isDetailPanelOpen.value = !isDetailPanelOpen.value

  // GSAP: Animate the circular white button icon smoothly
  if (toggleIconWrapperRef.value) {
    gsap.fromTo(
      toggleIconWrapperRef.value,
      { rotate: isDetailPanelOpen.value ? 0 : 180, scale: 0.85 },
      {
        rotate: isDetailPanelOpen.value ? 180 : 0,
        scale: 1,
        duration: 0.35,
        ease: 'power2.out'
      }
    )
  }

  // GSAP: Button tactile spring bounce
  if (toggleDetailBtnRef.value) {
    gsap.fromTo(
      toggleDetailBtnRef.value,
      { scale: 0.92 },
      { scale: 1, duration: 0.3, ease: 'back.out(2)' }
    )
  }

  // Stagger detail items when expanding
  if (isDetailPanelOpen.value) {
    nextTick(() => {
      gsap.from('.detail-stagger-item', {
        opacity: 0,
        y: 10,
        duration: 0.32,
        stagger: 0.06,
        ease: 'power2.out'
      })
    })
  }
}

function animateThreadsEntrance() {
  gsap.from('.thread-card-item', {
    opacity: 0,
    x: -8,
    duration: 0.28,
    stagger: 0.04,
    ease: 'power2.out'
  })
}

function animateMessagesEntrance() {
  gsap.from('.chat-bubble-item', {
    opacity: 0,
    y: 8,
    duration: 0.25,
    stagger: 0.03,
    ease: 'power2.out'
  })
}

function animateLatestMessageEntrance() {
  const bubbles = document.querySelectorAll('.chat-bubble-item')
  if (bubbles.length > 0) {
    const lastBubble = bubbles[bubbles.length - 1]
    gsap.from(lastBubble, {
      opacity: 0,
      scale: 0.95,
      y: 10,
      duration: 0.25,
      ease: 'power2.out'
    })
  }
}

onMounted(() => {
  if (chatStore.activeThreadId) {
    chatStore.markAsRead(chatStore.activeThreadId, 'UMKM')
    scrollToBottom()
  }

  // Entrance animations for threads and active messages
  animateThreadsEntrance()
  animateMessagesEntrance()
})

watch(
  () => activeThread.value?.messages.length,
  () => {
    scrollToBottom()
  }
)
</script>

<style scoped>
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
