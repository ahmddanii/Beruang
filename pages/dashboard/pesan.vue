<template>
  <div class="h-full flex flex-col font-poppins text-neutral-900 dark:text-neutral-100 overflow-hidden select-text">
    <!-- ========================================================================= -->
    <!-- 1. TOP HEADER: Page Title on Left & Action Buttons on Right               -->
    <!-- Matched exactly with Notifikasi, Progress Tugas, & Catatan Kas            -->
    <!-- ========================================================================= -->
    <div
      :class="[
        'chat-header-row flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 shrink-0 mb-6 sm:mb-8 min-h-[44px]',
        isMobileChatOpen ? 'hidden lg:flex' : 'flex'
      ]"
    >
      <!-- Left: Icon & Title: Pesan -->
      <div class="flex items-center gap-2.5 sm:gap-3">
        <HugeiconsIcon
          :icon="Message01Icon"
          :size="26"
          :stroke-width="2.2"
          class="text-neutral-900 dark:text-white shrink-0"
        />
        <h1 class="font-poppins font-semibold text-2xl sm:text-3xl text-neutral-900 dark:text-white tracking-tight leading-tight">
          {{ t('chat_title') }}
        </h1>
      </div>

      <!-- Right: Action Buttons (BActionButton) matching other dashboard pages -->
      <div class="flex items-center gap-2.5 shrink-0">
        <BActionButton
          v-if="chatStore.unreadCountUmkm > 0"
          variant="green"
          icon="check"
          custom-class="text-xs sm:text-sm"
          :title="t('chat_mark_all_read')"
          @click="handleMarkAllAsRead"
        >
          {{ t('chat_mark_all_read') }}
        </BActionButton>

        <BActionButton
          variant="default"
          icon="chevron"
          to="/dashboard/rencana-aksi"
          custom-class="text-xs sm:text-sm hidden sm:inline-flex"
          :title="t('chat_progress_tugas')"
        >
          {{ t('chat_progress_tugas') }}
        </BActionButton>
      </div>
    </div>

    <!-- ========================================================================= -->
    <!-- 2. FILTER TABS: Compact Horizontal Chips on Mobile, BPillTabs on Desktop    -->
    <!-- ========================================================================= -->
    <div
      :class="[
        'chat-pill-tabs shrink-0 mb-6 sm:mb-8',
        isMobileChatOpen ? 'hidden lg:block' : 'block'
      ]"
    >
      <!-- Mobile Horizontal Filter Chips (< sm) -->
      <div class="sm:hidden flex items-center gap-2 overflow-x-auto scrollbar-none pb-1 no-scrollbar">
        <button
          v-for="tab in filterTabs"
          :key="`mob-pill-${tab.id}`"
          type="button"
          :class="[
            'inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-medium whitespace-nowrap transition-colors cursor-pointer border font-poppins shrink-0',
            activeFilter === tab.id
              ? 'bg-[#156374] dark:bg-[#50AABF] text-white dark:text-[#0C121D] border-[#156374] dark:border-[#50AABF] font-semibold shadow-2xs'
              : 'bg-neutral-100 dark:bg-neutral-800/80 text-neutral-600 dark:text-neutral-300 border-transparent hover:border-slate-300'
          ]"
          @click="handleFilterChange(tab.id)"
        >
          <HugeiconsIcon :icon="tab.icon" :size="14" :stroke-width="activeFilter === tab.id ? 2.3 : 1.8" />
          <span>{{ tab.shortLabel || tab.label }}</span>
          <span
            v-if="tab.count !== undefined"
            :class="[
              'text-[10px] px-1.5 py-0.2 rounded-full tabular-nums font-bold leading-none',
              activeFilter === tab.id
                ? 'bg-white/20 text-white dark:bg-[#0C121D]/20 dark:text-[#0C121D]'
                : 'bg-neutral-200 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-200'
            ]"
          >
            {{ tab.count }}
          </span>
        </button>
      </div>

      <!-- Desktop BPillTabs (sm+) -->
      <div class="hidden sm:block">
        <BPillTabs
          v-model="activeFilter"
          :tabs="filterTabs"
          size="md"
          @change="handleFilterChange"
        />
      </div>
    </div>

    <!-- ========================================================================= -->
    <!-- 3. MAIN UNIFIED CHAT CONTAINER: Multi-Pane Split View                     -->
    <!-- Card Tactile GoPay with 1.5px border and uniform surface colors           -->
    <!-- ========================================================================= -->
    <div id="chat-main-container" class="flex-1 min-h-0 card-tactile-gopay rounded-[18px] border border-[#E2E8F0] dark:border-neutral-800 bg-white dark:bg-[#13161F] flex relative overflow-hidden shadow-none">
      
      <!-- ======================================================================= -->
      <!-- PANEL KIRI (Kolom 1: Daftar Percakapan)                                 -->
      <!-- Lebar 360px-380px proporsional dengan kartu taktil solid                -->
      <!-- ======================================================================= -->
      <aside
        :class="[
          'w-full lg:w-80 xl:w-[350px] shrink-0 border-r border-[#E2E8F0] dark:border-neutral-800 flex flex-col h-full bg-white dark:bg-[#13161F]',
          isMobileChatOpen ? 'hidden lg:flex' : 'flex'
        ]"
      >
        <!-- Header Panel: Search Bar matching notifikasi.vue with aligned 72px header height -->
        <div class="h-[72px] min-h-[72px] px-3.5 sm:px-4 border-b border-[#E2E8F0] dark:border-neutral-800 shrink-0 bg-white dark:bg-[#13161F] flex items-center">
          <div class="relative w-full rounded-xl border border-neutral-200 dark:border-neutral-700 bg-neutral-100/70 dark:bg-neutral-800/60 focus-within:border-[#00800e] dark:focus-within:border-[#00C058] focus-within:ring-2 focus-within:ring-[#00800e]/20 transition-all flex items-center min-h-[44px] px-3">
            <HugeiconsIcon :icon="Search01Icon" :size="18" class="text-neutral-400 shrink-0 pointer-events-none mr-2.5" />
            <input
              v-model="chatStore.searchQuery"
              type="text"
              :placeholder="t('chat_search_placeholder')"
              class="w-full text-xs sm:text-sm bg-transparent border-0 text-neutral-900 dark:text-white placeholder:text-neutral-400 focus:outline-none focus:ring-0 font-poppins min-w-0"
            />
            <button
              v-if="chatStore.searchQuery"
              type="button"
              class="text-neutral-400 hover:text-neutral-700 dark:hover:text-white text-xs px-1.5 py-1 cursor-pointer"
              title="Hapus pencarian"
              @click="chatStore.searchQuery = ''"
            >
              ✕
            </button>
          </div>
        </div>

        <!-- Scrollable Thread Cards List: Solid Cards, Zero Ghost Fade Bug -->
        <div class="flex-1 overflow-y-auto p-3 space-y-2.5 scrollbar-thin">
          <button
            v-for="thread in filteredThreads"
            :key="thread.id"
            type="button"
            :class="[
              'thread-card-item group relative w-full text-left p-3.5 sm:p-4 rounded-xl transition-all duration-150 cursor-pointer flex items-start gap-3.5 border',
              chatStore.activeThreadId === thread.id
                ? 'bg-[#00800e] text-white border-[#00800e] shadow-[0_4px_14px_rgba(0,128,14,0.28)] ring-1 ring-[#00800e]'
                : 'bg-white dark:bg-[#151922] border-[#E2E8F0] dark:border-neutral-800 text-neutral-900 dark:text-white hover:border-[#CBD5E1] dark:hover:border-neutral-700 hover:bg-neutral-50/70 dark:hover:bg-neutral-800/50 shadow-2xs active:scale-[0.99]'
            ]"
            @click="selectThread(thread.id)"
          >
            <!-- Avatar with Online Status Indicator -->
            <div class="relative w-11 h-11 sm:w-12 sm:h-12 rounded-full shrink-0">
              <img
                :src="thread.investorAvatar"
                alt="Foto Profil"
                class="w-full h-full rounded-full object-cover border"
                :class="chatStore.activeThreadId === thread.id ? 'border-white/50' : 'border-neutral-200 dark:border-neutral-700'"
              />
              <span
                class="absolute -top-0.5 -right-0.5 w-3 h-3 rounded-full ring-2"
                :class="[
                  thread.online ? 'bg-emerald-400' : 'bg-neutral-400',
                  chatStore.activeThreadId === thread.id ? 'ring-[#00800e]' : 'ring-white dark:ring-[#151922]'
                ]"
              />
            </div>

            <!-- Thread Text Info with High Contrast Typography -->
            <div class="flex-1 min-w-0">
              <div class="flex items-center justify-between gap-1.5">
                <h4
                  :class="[
                    'font-poppins font-semibold text-sm sm:text-[15px] truncate leading-tight',
                    chatStore.activeThreadId === thread.id
                      ? 'text-white'
                      : 'text-neutral-900 dark:text-white group-hover:text-neutral-900 dark:group-hover:text-white'
                  ]"
                >
                  {{ thread.investorName }}
                </h4>
                <span
                  :class="[
                    'text-xs tabular-nums shrink-0 font-sans',
                    chatStore.activeThreadId === thread.id ? 'text-emerald-100 font-medium' : 'text-neutral-400 dark:text-neutral-500'
                  ]"
                >
                  {{ thread.lastMessageAt || 'Hari ini' }}
                </span>
              </div>
              
              <div class="flex items-center justify-between gap-2 mt-1.5">
                <p
                  :class="[
                    'text-xs sm:text-[13px] truncate font-sans leading-normal min-w-0 flex-1',
                    chatStore.activeThreadId === thread.id
                      ? 'text-emerald-50'
                      : 'text-neutral-500 dark:text-neutral-400'
                  ]"
                >
                  {{ thread.lastMessage }}
                </p>
                <span
                  v-if="thread.unreadUmkm > 0"
                  :class="[
                    'px-2 py-0.5 rounded-full text-[11px] font-bold tabular-nums shrink-0 leading-none shadow-2xs',
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
          <div v-if="filteredThreads.length === 0" class="py-12 px-4 text-center text-xs sm:text-sm text-neutral-400 font-sans space-y-1.5">
            <p class="font-semibold text-neutral-700 dark:text-neutral-300">Tidak ada percakapan</p>
            <p>Ubah kata kunci pencarian atau ganti filter kategori.</p>
          </div>
        </div>
      </aside>

      <!-- ======================================================================= -->
      <!-- PANEL TENGAH (Kolom 2: Ruang Obrolan Utama - Full Screen on Mobile)      -->
      <!-- ======================================================================= -->
      <section
        v-if="activeThread"
        :class="[
          'bg-[#F8FAFC] dark:bg-[#0B0F19]',
          isMobileChatOpen
            ? 'fixed inset-0 z-50 flex flex-col lg:relative lg:inset-auto lg:z-auto lg:flex-1 lg:min-w-0 lg:h-full'
            : 'hidden lg:flex lg:flex-1 lg:min-w-0 lg:flex-col lg:h-full relative'
        ]"
      >
        <!-- 1. HEADER CHAT: Ramping, Elegan, dengan Hierarki Proporsional & Tinggi Sejajar 72px -->
        <div class="h-[72px] min-h-[72px] px-5 sm:px-6 border-b border-[#E2E8F0] dark:border-neutral-800 flex items-center justify-between gap-3 shrink-0 bg-white dark:bg-[#13161F] z-10 relative">
          <div class="flex items-center gap-3.5 min-w-0">
            <!-- Mobile Back Button -->
            <button
              type="button"
              class="lg:hidden p-2 -ml-1 rounded-xl text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 cursor-pointer"
              aria-label="Kembali ke Daftar Pesan"
              @click="isMobileChatOpen = false"
            >
              <HugeiconsIcon :icon="ArrowLeft01Icon" :size="20" />
            </button>

            <!-- Counterpart Avatar with Online Badge -->
            <div class="relative w-11 h-11 sm:w-12 sm:h-12 rounded-full shrink-0">
              <img
                :src="activeThread.investorAvatar || '/images/user-profile.png'"
                :alt="activeThread.investorName"
                class="w-full h-full rounded-full object-cover border border-neutral-200 dark:border-neutral-700"
              />
              <span
                class="absolute bottom-0 right-0 w-3 h-3 rounded-full ring-2 ring-white dark:ring-[#13161F]"
                :class="activeThread.online ? 'bg-[#00800e]' : 'bg-neutral-400'"
              />
            </div>

            <!-- Partner Identity Details -->
            <div class="min-w-0">
              <h2 class="font-poppins font-bold text-base sm:text-lg text-neutral-900 dark:text-white truncate leading-tight">
                {{ activeThread.investorName }}
              </h2>
              
              <div class="flex items-center gap-2 text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 mt-0.5 font-sans truncate">
                <span class="truncate font-medium">{{ activeThread.investorLembaga }}</span>
                <span class="text-neutral-300 dark:text-neutral-700 shrink-0">•</span>
                <span class="inline-flex items-center gap-1 text-[#00800e] dark:text-[#00C058] font-semibold shrink-0">
                  <HugeiconsIcon :icon="ShieldCheckIcon" :size="14" class="shrink-0" />
                  <span>{{ t('chat_verified') }}</span>
                </span>
              </div>
            </div>
          </div>

          <!-- Header Right Actions: Clean Tactile Toggle Rincian (Tanpa icon berputar!) -->
          <div class="flex items-center gap-2 shrink-0">
            <button
              ref="toggleDetailBtnRef"
              type="button"
              :class="[
                'inline-flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all duration-150 cursor-pointer shadow-2xs shrink-0 border',
                isDetailPanelOpen
                  ? 'bg-[#00800e] text-white border-[#00800e] shadow-[0_2px_8px_rgba(0,128,14,0.22)] font-semibold'
                  : 'bg-white dark:bg-[#18191E] border-neutral-200 dark:border-neutral-700 text-neutral-700 dark:text-neutral-200 hover:bg-neutral-50 dark:hover:bg-neutral-800 hover:border-neutral-300'
              ]"
              title="Tampilkan rincian kemitraan dan dokumen"
              @click="toggleDetailPanel"
            >
              <HugeiconsIcon
                :icon="Folder01Icon"
                :size="17"
                :stroke-width="2.0"
                :class="isDetailPanelOpen ? 'text-white' : 'text-[#00800e] dark:text-[#00C058]'"
              />
              <span class="hidden sm:inline">{{ t('chat_partner_details') }}</span>
            </button>
          </div>
        </div>

        <!-- 2. Chat Stream Body: Clean Solid Background Without Fog/White Mist -->
        <div
          ref="messagesContainer"
          class="flex-1 min-h-0 overflow-y-auto p-4 sm:p-6 space-y-5 overscroll-contain bg-[#F8FAFC] dark:bg-[#0B0F19]"
        >
          <!-- Date Divider Pill -->
          <div class="flex items-center justify-center my-1.5">
            <span class="px-4 py-1 rounded-full text-xs font-semibold bg-white dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400 border border-neutral-200 dark:border-neutral-700 shadow-2xs font-sans">
              Hari ini, 23 Juli 2026
            </span>
          </div>

          <!-- Messages Stream with Left/Right Bubbles -->
          <div
            v-for="msg in activeThread.messages"
            :key="msg.id"
            :class="[
              'chat-bubble-item flex items-start gap-3 max-w-[85%] sm:max-w-[72%]',
              msg.senderRole === 'UMKM' ? 'ml-auto flex-row-reverse' : 'mr-auto'
            ]"
          >
            <!-- Sender Avatar -->
            <div class="w-9 h-9 sm:w-10 sm:h-10 rounded-full overflow-hidden shrink-0 mt-0.5 border border-neutral-200 dark:border-neutral-700 shadow-2xs">
              <img
                :src="msg.senderRole === 'UMKM' ? '/images/user-profile.png' : activeThread.investorAvatar"
                alt="Avatar"
                class="w-full h-full object-cover"
              />
            </div>

            <!-- Message Bubble Content -->
            <div class="space-y-1.5 min-w-0" :class="msg.senderRole === 'UMKM' ? 'items-end text-right' : 'items-start'">
              <div class="flex items-center gap-2 text-xs" :class="msg.senderRole === 'UMKM' ? 'justify-end' : ''">
                <span class="font-semibold text-neutral-900 dark:text-white font-poppins">
                  {{ msg.senderRole === 'UMKM' ? 'Anda (Kopi Senja)' : activeThread.investorName }}
                </span>
                <span class="text-neutral-400 dark:text-neutral-500 tabular-nums font-sans">{{ msg.timestamp }}</span>
              </div>

              <div
                :class="[
                  'p-4 sm:p-4.5 rounded-xl text-sm sm:text-[14.5px] leading-relaxed shadow-xs text-left font-sans',
                  msg.senderRole === 'UMKM'
                    ? 'bg-[#00800e] text-white rounded-tr-xs'
                    : 'bg-white dark:bg-[#18191E] border border-neutral-200 dark:border-neutral-800 text-neutral-900 dark:text-white rounded-tl-xs'
                ]"
              >
                <p class="whitespace-pre-wrap">{{ msg.text }}</p>

                <!-- Attachment Card (If Message Has Document) -->
                <div
                  v-if="msg.attachment"
                  :class="[
                    'mt-3 p-3 rounded-xl border flex items-center justify-between gap-3',
                    msg.senderRole === 'UMKM'
                      ? 'bg-white/15 border-white/25 text-white'
                      : 'bg-neutral-50 dark:bg-neutral-800/80 border-neutral-200 dark:border-neutral-700 text-neutral-900 dark:text-white'
                  ]"
                >
                  <div class="flex items-center gap-3 min-w-0">
                    <div
                      :class="[
                        'w-9 h-9 rounded-lg flex items-center justify-center shrink-0',
                        msg.senderRole === 'UMKM' ? 'bg-white/20 text-white' : 'bg-emerald-50 dark:bg-emerald-950/40 text-[#00800e] dark:text-emerald-400'
                      ]"
                    >
                      <HugeiconsIcon :icon="File01Icon" :size="18" />
                    </div>
                    <div class="min-w-0 text-left">
                      <p class="text-xs sm:text-sm font-semibold truncate">{{ msg.attachment.title }}</p>
                      <p
                        :class="[
                          'text-xs tabular-nums',
                          msg.senderRole === 'UMKM' ? 'text-white/80' : 'text-neutral-500 dark:text-neutral-400'
                        ]"
                      >
                        {{ msg.attachment.subtitle || 'Berkas Lampiran' }}
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    :class="[
                      'p-2 rounded-lg shrink-0 cursor-pointer transition-colors',
                      msg.senderRole === 'UMKM'
                        ? 'bg-white text-[#00800e] hover:bg-white/90'
                        : 'bg-neutral-200/80 dark:bg-neutral-700 hover:bg-neutral-300 dark:hover:bg-neutral-600 text-neutral-700 dark:text-white'
                    ]"
                    :title="`Unduh ${msg.attachment.title}`"
                    @click="downloadDocument(msg.attachment.title)"
                  >
                    <HugeiconsIcon :icon="Download01Icon" :size="15" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 3. Quick Business Templates & Emoji Bar -->
        <div v-if="showEmojiPicker" class="px-5 py-2.5 border-t border-[#E2E8F0] dark:border-neutral-800 bg-neutral-50 dark:bg-[#151924] flex items-center gap-2 flex-wrap">
          <span class="text-xs font-semibold text-neutral-500 dark:text-neutral-400 mr-1 font-sans">Balasan Cepat:</span>
          <button
            v-for="item in quickPhrases"
            :key="item"
            type="button"
            class="text-xs px-3 py-1.5 rounded-lg bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 hover:border-[#00800e] dark:hover:border-[#00C058] text-neutral-700 dark:text-neutral-200 transition-colors cursor-pointer"
            @click="insertPhrase(item)"
          >
            {{ item }}
          </button>
          <div class="h-4 w-px bg-neutral-300 dark:bg-neutral-700 mx-1.5" />
          <button
            v-for="emoji in ['👍', '🙏', '💼', '📊', '✅', '🤝']"
            :key="emoji"
            type="button"
            class="w-8 h-8 rounded-lg hover:bg-white dark:hover:bg-neutral-800 text-base flex items-center justify-center transition-colors cursor-pointer"
            @click="insertEmoji(emoji)"
          >
            {{ emoji }}
          </button>
        </div>

        <!-- 4. Minimalist Input Bar with Working File Attachment -->
        <div class="p-4 sm:p-5 border-t border-[#E2E8F0] dark:border-neutral-800 shrink-0 bg-white dark:bg-[#13161F]">
          <!-- Hidden Native File Input for Real Chat Attachments -->
          <input
            ref="chatFileInputRef"
            type="file"
            class="hidden"
            accept=".pdf,.png,.jpg,.jpeg,.doc,.docx,.xlsx"
            @change="handleFileSelected"
          />

          <form
            class="relative flex items-center gap-2.5 px-4 py-2 rounded-xl bg-neutral-100/90 dark:bg-[#18191E] border border-neutral-200 dark:border-neutral-700 focus-within:ring-2 focus-within:ring-[#00800e]/20 focus-within:border-[#00800e] transition-all min-h-[52px]"
            @submit.prevent="handleSendMessage"
          >
            <!-- Add / Attach Button (+) -->
            <button
              type="button"
              class="w-9 h-9 rounded-xl bg-white dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white flex items-center justify-center shadow-2xs transition-transform hover:scale-105 shrink-0 cursor-pointer"
              title="Lampirkan Dokumen atau Foto"
              @click="chatFileInputRef?.click()"
            >
              <HugeiconsIcon :icon="Add01Icon" :size="18" />
            </button>

            <!-- Text Input -->
            <input
              v-model="inputMessage"
              type="text"
              :placeholder="t('chat_input_placeholder')"
              class="flex-1 px-2.5 py-2 text-sm sm:text-base bg-transparent text-neutral-900 dark:text-white placeholder:text-neutral-400 focus:outline-none font-sans"
              @keydown.enter.exact.prevent="handleSendMessage"
            />

            <!-- Smile / Emoji Toggle Button -->
            <button
              type="button"
              :class="[
                'w-9 h-9 rounded-xl flex items-center justify-center shrink-0 cursor-pointer transition-colors',
                showEmojiPicker
                  ? 'text-[#00800e] dark:text-[#00C058] bg-emerald-50 dark:bg-emerald-950/40'
                  : 'text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200'
              ]"
              title="Pilihan Balasan Cepat & Emoji"
              @click="showEmojiPicker = !showEmojiPicker"
            >
              <HugeiconsIcon :icon="SmileIcon" :size="19" />
            </button>

            <!-- Send Button -->
            <button
              type="submit"
              :disabled="!inputMessage.trim()"
              class="w-10 h-10 rounded-xl bg-[#00800e] hover:bg-[#006e0c] disabled:opacity-40 disabled:cursor-not-allowed text-white flex items-center justify-center shadow-xs transition-transform active:scale-95 shrink-0 cursor-pointer"
              title="Kirim Pesan"
            >
              <HugeiconsIcon :icon="SendIcon" :size="18" />
            </button>
          </form>
        </div>
      </section>

    </div>

    <!-- ========================================================================= -->
    <!-- MODAL: Rincian Mitra & Berkas Legalitas (Menggantikan slide-over drawer)  -->
    <!-- Fokus Diskusi & Status Kerjasama telah dihapus sesuai arahan             -->
    <!-- ========================================================================= -->
    <Teleport to="body">
      <Transition
        enter-active-class="transition-opacity duration-200 ease-in-out"
        enter-from-class="opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="transition-opacity duration-150 ease-in-out"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <div
          v-if="isDetailPanelOpen"
          class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 select-none"
          @click.self="isDetailPanelOpen = false"
        >
          <Transition
            enter-active-class="transition-all duration-200 ease-in-out transform"
            enter-from-class="scale-95 opacity-0 translate-y-3"
            enter-to-class="scale-100 opacity-100 translate-y-0"
            leave-active-class="transition-all duration-150 ease-in-out transform"
            leave-from-class="scale-100 opacity-100 translate-y-0"
            leave-to-class="scale-95 opacity-0 translate-y-3"
          >
            <div
              v-if="isDetailPanelOpen"
              class="w-full max-w-lg bg-white dark:bg-[#13161F] rounded-2xl border border-neutral-200 dark:border-neutral-800 shadow-2xl overflow-hidden flex flex-col font-poppins text-neutral-900 dark:text-white"
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-rincian-title"
            >
              <!-- Modal Header -->
              <div class="px-6 py-4 border-b border-neutral-100 dark:border-neutral-800 flex items-center justify-between shrink-0">
                <div class="flex items-center gap-2.5">
                  <div class="w-8 h-8 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 text-[#00800e] dark:text-[#00C058] flex items-center justify-center shrink-0">
                    <HugeiconsIcon :icon="Folder01Icon" :size="18" />
                  </div>
                  <div>
                    <h3 id="modal-rincian-title" class="font-poppins font-bold text-base sm:text-lg text-neutral-900 dark:text-white leading-tight">
                      Rincian Kemitraan
                    </h3>
                    <p class="text-xs text-neutral-500 dark:text-neutral-400 font-sans mt-0.5">
                      Ruang data & berkas terverifikasi
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  class="w-8 h-8 rounded-full bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 flex items-center justify-center text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors cursor-pointer"
                  title="Tutup (Esc)"
                  aria-label="Tutup Rincian"
                  @click="isDetailPanelOpen = false"
                >
                  ✕
                </button>
              </div>

              <!-- Modal Body -->
              <div class="p-6 space-y-5 overflow-y-auto max-h-[75vh]">
                <!-- Profil Mitra (Fokus Diskusi & Status Kerjasama telah dihapus) -->
                <div v-if="activeThread" class="p-4 rounded-xl bg-neutral-50/80 dark:bg-[#151922] border border-neutral-200/80 dark:border-neutral-800 flex items-center gap-3.5">
                  <div class="relative w-12 h-12 rounded-full shrink-0">
                    <img
                      :src="activeThread.investorAvatar"
                      alt="Avatar"
                      class="w-full h-full rounded-full object-cover border border-neutral-200 dark:border-neutral-700"
                    />
                    <span
                      class="absolute -top-0.5 -right-0.5 w-3 h-3 rounded-full ring-2 ring-white dark:ring-[#151922]"
                      :class="activeThread.online ? 'bg-emerald-400' : 'bg-neutral-400'"
                    />
                  </div>
                  <div class="min-w-0 flex-1">
                    <div class="flex items-center gap-1.5">
                      <h4 class="font-poppins font-bold text-sm sm:text-base text-neutral-900 dark:text-white truncate">
                        {{ activeThread.investorName }}
                      </h4>
                      <HugeiconsIcon :icon="ShieldCheckIcon" :size="16" class="text-[#00800e] dark:text-[#00C058] shrink-0" />
                    </div>
                    <p class="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 truncate font-sans mt-0.5">
                      {{ activeThread.investorLembaga }}
                    </p>
                  </div>
                </div>

                <!-- Berkas & Dokumen Legalitas (Real Working Download & Upload) -->
                <div class="space-y-3">
                  <div class="flex items-center justify-between">
                    <span class="text-xs sm:text-sm font-bold text-neutral-900 dark:text-white flex items-center gap-2 font-poppins">
                      <HugeiconsIcon :icon="FileValidationIcon" :size="16" class="text-[#00800e] dark:text-[#00C058]" />
                      Berkas & Dokumen Legalitas
                    </span>
                    <span class="text-xs text-neutral-400 tabular-nums font-sans">
                      {{ officialDocuments.length }} Berkas
                    </span>
                  </div>

                  <!-- Documents list -->
                  <div class="space-y-2">
                    <div
                      v-for="doc in officialDocuments"
                      :key="doc.name"
                      class="p-3 rounded-xl bg-white dark:bg-[#151922] border border-neutral-200 dark:border-neutral-800 flex items-center justify-between gap-3 hover:border-neutral-300 dark:hover:border-neutral-700 transition-colors shadow-2xs"
                    >
                      <div class="flex items-center gap-2.5 min-w-0">
                        <div class="w-8 h-8 rounded-lg bg-emerald-50 dark:bg-emerald-950/30 text-[#00800e] dark:text-[#00C058] flex items-center justify-center shrink-0">
                          <HugeiconsIcon :icon="File01Icon" :size="16" />
                        </div>
                        <div class="min-w-0">
                          <p class="text-xs sm:text-sm font-medium text-neutral-900 dark:text-white truncate font-sans">
                            {{ doc.name }}
                          </p>
                          <div class="flex items-center gap-2 text-xs text-neutral-400 font-sans mt-0.5">
                            <span>{{ doc.size }}</span>
                            <span>•</span>
                            <span class="text-[#00800e] dark:text-emerald-400 font-medium">{{ doc.status }}</span>
                          </div>
                        </div>
                      </div>

                      <button
                        type="button"
                        class="w-8 h-8 rounded-lg text-neutral-500 hover:text-[#00800e] dark:hover:text-[#00C058] hover:bg-neutral-100 dark:hover:bg-neutral-800 flex items-center justify-center shrink-0 transition-colors cursor-pointer"
                        :title="`Unduh ${doc.name}`"
                        @click="downloadDocument(doc.name)"
                      >
                        <HugeiconsIcon :icon="Download01Icon" :size="16" />
                      </button>
                    </div>
                  </div>

                  <!-- Upload Trigger Input & Button -->
                  <input
                    ref="officialDocInputRef"
                    type="file"
                    class="hidden"
                    accept=".pdf,.xlsx,.doc,.docx"
                    @change="handleOfficialDocUpload"
                  />
                  <BActionButton
                    variant="default"
                    icon="plus"
                    custom-class="!h-10 !min-h-10 !text-xs sm:!text-sm !w-full justify-center border-dashed"
                    @click="officialDocInputRef?.click()"
                  >
                    Unggah Berkas Baru
                  </BActionButton>
                </div>
              </div>

              <!-- Modal Footer -->
              <div class="px-6 py-3.5 bg-neutral-50 dark:bg-neutral-900/40 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-end">
                <BActionButton
                  variant="default"
                  custom-class="text-xs sm:text-sm"
                  @click="isDetailPanelOpen = false"
                >
                  Tutup
                </BActionButton>
              </div>
            </div>
          </Transition>
        </div>
      </Transition>
    </Teleport>

    <!-- Notification Toast Feedback -->
    <Transition
      enter-active-class="transition ease-out duration-200"
      enter-from-class="transform opacity-0 translate-y-2"
      enter-to-class="transform opacity-100 translate-y-0"
      leave-active-class="transition ease-in duration-150"
      leave-from-class="transform opacity-100 translate-y-0"
      leave-to-class="transform opacity-0 translate-y-2"
    >
      <div
        v-if="toastMessage"
        class="fixed bottom-6 right-6 z-50 px-4 py-2.5 rounded-xl bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 text-xs sm:text-sm font-medium shadow-xl flex items-center gap-2 pointer-events-none"
      >
        <HugeiconsIcon :icon="CheckmarkCircle01Icon" :size="16" class="text-[#00C058] shrink-0" />
        <span>{{ toastMessage }}</span>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, nextTick, onMounted } from 'vue'
import gsap from 'gsap'
import { useChatStore } from '~/stores/chat'
import { useLanguage } from '~/composables/useLanguage'
import BActionButton from '~/components/base/BActionButton.vue'
import BPillTabs, { type PillTabItem } from '~/components/base/BPillTabs.vue'
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
  Download01Icon,
  UserCheck01Icon,
  Coins01Icon,
  CheckmarkCircle01Icon,
  File01Icon
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
const showEmojiPicker = ref(false)
const toastMessage = ref('')

const chatFileInputRef = ref<HTMLInputElement | null>(null)
const officialDocInputRef = ref<HTMLInputElement | null>(null)
const toggleDetailBtnRef = ref<HTMLElement | null>(null)
const detailPanelRef = ref<HTMLElement | null>(null)

const quickPhrases = [
  'Baik, siap kami tindaklanjuti.',
  'Terima kasih atas informasinya.',
  'Dokumen kas sudah kami perbarui.',
  'Mohon konfirmasi kelanjutannya.'
]

// Official Documents List
const officialDocuments = ref([
  { name: 'NIB OSS RBA - Legalitas Usaha.pdf', size: '1.8 MB', status: 'Dokumen Sah' },
  { name: 'Laporan Rekonsiliasi Kas 30 Hari.pdf', size: '3.2 MB', status: 'Tervalidasi' },
  { name: 'NPWP Toko & Rekening Koran.pdf', size: '980 KB', status: 'Terverifikasi' },
  { name: 'Proposal Kemitraan Bagi Hasil.pdf', size: '2.4 MB', status: 'Siap Akses' }
])

// Filter tabs with dynamic counts for BPillTabs (size="md")
const totalThreadsCount = computed(() => chatStore.threads.length)

const konsultanCount = computed(() => {
  return chatStore.threads.filter(t => 
    t.investorLembaga.toLowerCase().includes('konsultan') || 
    t.investorLembaga.toLowerCase().includes('legalitas') ||
    t.investorName.toLowerCase().includes('maya')
  ).length
})

const pemodalCount = computed(() => {
  return chatStore.threads.filter(t => 
    !t.investorLembaga.toLowerCase().includes('konsultan') && 
    !t.investorLembaga.toLowerCase().includes('legalitas') &&
    !t.investorName.toLowerCase().includes('maya')
  ).length
})

const { t } = useLanguage()

const filterTabs = computed<PillTabItem[]>(() => [
  {
    id: 'all',
    label: t('chat_tab_all'),
    shortLabel: t('chat_tab_all_short'),
    icon: Message01Icon,
    count: totalThreadsCount.value
  },
  {
    id: 'konsultan',
    label: t('chat_tab_konsultan'),
    shortLabel: t('chat_tab_konsultan_short'),
    icon: UserCheck01Icon,
    count: konsultanCount.value
  },
  {
    id: 'pemodal',
    label: t('chat_tab_pemodal'),
    shortLabel: t('chat_tab_pemodal_short'),
    icon: Coins01Icon,
    count: pemodalCount.value
  }
])

// Filter threads by active filter tab & search query
const filteredThreads = computed(() => {
  let list = chatStore.filteredThreads
  if (activeFilter.value === 'konsultan') {
    list = list.filter(t => 
      t.investorLembaga.toLowerCase().includes('konsultan') || 
      t.investorLembaga.toLowerCase().includes('legalitas') ||
      t.investorName.toLowerCase().includes('maya')
    )
  } else if (activeFilter.value === 'pemodal') {
    list = list.filter(t => 
      !t.investorLembaga.toLowerCase().includes('konsultan') && 
      !t.investorLembaga.toLowerCase().includes('legalitas') &&
      !t.investorName.toLowerCase().includes('maya')
    )
  }
  return list
})

const activeThread = computed(() => chatStore.activeThread)

const isKonsultan = computed(() => {
  if (!activeThread.value) return false
  const lembaga = activeThread.value.investorLembaga.toLowerCase()
  const name = activeThread.value.investorName.toLowerCase()
  return lembaga.includes('konsultan') || lembaga.includes('legalitas') || name.includes('maya')
})

function showToast(msg: string) {
  toastMessage.value = msg
  setTimeout(() => {
    toastMessage.value = ''
  }, 3000)
}

function scrollToBottom() {
  nextTick(() => {
    if (messagesContainer.value) {
      messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight
    }
  })
}

function handleFilterChange(tabId: string) {
  activeFilter.value = tabId as any
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

function handleMarkAllAsRead() {
  chatStore.markAllAsRead('UMKM')
  showToast('Semua pesan berhasil ditandai telah dibaca')
}

function handleSendMessage() {
  if (!inputMessage.value.trim() || !activeThread.value) return
  chatStore.sendMessage(activeThread.value.id, inputMessage.value, 'UMKM')
  inputMessage.value = ''
  showEmojiPicker.value = false
  scrollToBottom()
  nextTick(() => {
    animateLatestMessageEntrance()
  })
}

function insertEmoji(emoji: string) {
  inputMessage.value += (inputMessage.value ? ' ' : '') + emoji
}

function insertPhrase(phrase: string) {
  inputMessage.value = phrase
}

// Working File Upload for Chat Attachment
function handleFileSelected(event: Event) {
  const target = event.target as HTMLInputElement
  const file = target.files?.[0]
  if (!file || !activeThread.value) return

  const sizeFormatted = file.size > 1024 * 1024
    ? `${(file.size / (1024 * 1024)).toFixed(1)} MB`
    : `${Math.round(file.size / 1024)} KB`

  chatStore.sendMessage(
    activeThread.value.id,
    inputMessage.value.trim(),
    'UMKM',
    {
      type: 'DOCUMENT',
      title: file.name,
      subtitle: sizeFormatted,
      value: 'Dokumen Terkirim'
    }
  )

  inputMessage.value = ''
  target.value = ''
  scrollToBottom()
  showToast(`Berkas "${file.name}" berhasil dikirim ke percakapan`)
}

// Working Document Upload for Official Documents
function handleOfficialDocUpload(event: Event) {
  const target = event.target as HTMLInputElement
  const file = target.files?.[0]
  if (!file) return

  const sizeFormatted = file.size > 1024 * 1024
    ? `${(file.size / (1024 * 1024)).toFixed(1)} MB`
    : `${Math.round(file.size / 1024)} KB`

  officialDocuments.value.unshift({
    name: file.name,
    size: sizeFormatted,
    status: 'Siap Akses'
  })

  target.value = ''
  showToast(`Dokumen "${file.name}" berhasil diunggah ke ruang data`)
}

// Working Real Document Download (Blob Creation)
function downloadDocument(docName: string) {
  const dummyContent = `BERUANG PLATFORM - DOKUMEN RESMI\nNama Dokumen: ${docName}\nStatus: Terverifikasi Digital\nDicetak pada: ${new Date().toLocaleString('id-ID')}\nIntegritas Dokumen: Terjamin enkripsi Beruang.\n`
  const blob = new Blob([dummyContent], { type: 'application/pdf;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = docName
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
  showToast(`Berhasil mengunduh ${docName}`)
}

// =============================================================================
// GSAP SAAS-GRADE MOTION & TRANSITIONS
// =============================================================================

function toggleDetailPanel() {
  isDetailPanelOpen.value = !isDetailPanelOpen.value

  // GSAP: Button tactile spring bounce
  if (toggleDetailBtnRef.value) {
    gsap.fromTo(
      toggleDetailBtnRef.value,
      { scale: 0.93 },
      { scale: 1, duration: 0.22, ease: 'power2.inOut' }
    )
  }
}

function animatePageEntrance() {
  if (typeof window === 'undefined') return
  nextTick(() => {
    gsap.fromTo(
      '.chat-header-row',
      { opacity: 0, y: -6 },
      { opacity: 1, y: 0, duration: 0.32, ease: 'power2.inOut', clearProps: 'all' }
    )
    gsap.fromTo(
      '.chat-pill-tabs',
      { opacity: 0, y: 6 },
      { opacity: 1, y: 0, duration: 0.32, delay: 0.04, ease: 'power2.inOut', clearProps: 'all' }
    )
    gsap.fromTo(
      '#chat-main-container',
      { opacity: 0, y: 8 },
      { opacity: 1, y: 0, duration: 0.36, delay: 0.08, ease: 'power2.inOut', clearProps: 'all' }
    )
  })
}

// Intentional progressive sequential reveal: one-by-one (Anti-AI-Slop)
function animateThreadsEntrance() {
  nextTick(() => {
    const items = document.querySelectorAll('.thread-card-item')
    if (items.length > 0) {
      gsap.killTweensOf(items)
      gsap.fromTo(
        items,
        {
          opacity: 0,
          y: 12
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.42,
          stagger: 0.14, // Deliberate sequential progression: each card settles one-by-one
          ease: 'power2.inOut',
          clearProps: 'all'
        }
      )
    }
  })
}

function animateMessagesEntrance() {
  nextTick(() => {
    const bubbles = document.querySelectorAll('.chat-bubble-item')
    if (bubbles.length > 0) {
      gsap.killTweensOf(bubbles)
      gsap.fromTo(
        bubbles,
        {
          opacity: 0,
          y: 10
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.35,
          stagger: 0.08, // Sequential stagger for chat bubbles
          ease: 'power2.inOut',
          clearProps: 'all'
        }
      )
    }
  })
}

function animateLatestMessageEntrance() {
  nextTick(() => {
    const bubbles = document.querySelectorAll('.chat-bubble-item')
    if (bubbles.length > 0) {
      const lastBubble = bubbles[bubbles.length - 1]
      gsap.killTweensOf(lastBubble)
      gsap.fromTo(
        lastBubble,
        {
          opacity: 0,
          y: 10
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.35,
          ease: 'power2.inOut',
          clearProps: 'all'
        }
      )
    }
  })
}

onMounted(async () => {
  await chatStore.fetchThreads()
  if (chatStore.activeThreadId) {
    chatStore.markAsRead(chatStore.activeThreadId, 'UMKM')
    scrollToBottom()
  }

  // Pure reveal animations: clean ease in out, zero blur
  animatePageEntrance()
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

/* Ensure thread items are always 100% solid opacity without any ghost gradient */
.thread-card-item {
  opacity: 1 !important;
}
</style>
