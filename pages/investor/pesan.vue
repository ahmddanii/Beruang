<template>
  <div class="h-full flex flex-col font-poppins text-neutral-900 dark:text-neutral-100 overflow-hidden select-text">
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

    <!-- ========================================================================= -->
    <!-- 1. TOP HEADER: Page Title on Left & Action Buttons on Right               -->
    <!-- 100% Identical to pages/dashboard/pesan.vue & UMKM Standard                -->
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

      <!-- Right: Action Buttons (BActionButton) matching standard pages -->
      <div class="flex items-center gap-2.5 shrink-0">
        <BActionButton
          v-if="chatStore.unreadCountInvestor > 0"
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
          to="/investor"
          custom-class="text-xs sm:text-sm hidden sm:inline-flex"
          title="Buka Jaringan Usaha"
        >
          Jaringan Usaha
        </BActionButton>
      </div>
    </div>

    <!-- ========================================================================= -->
    <!-- 2. FILTER TABS: Compact Horizontal Chips on Mobile, BPillTabs on Desktop    -->
    <!-- Unified with pages/dashboard/pesan.vue & brand architecture               -->
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
          <HugeiconsIcon v-if="tab.icon" :icon="tab.icon" :size="14" :stroke-width="activeFilter === tab.id ? 2.3 : 1.8" />
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
      <!-- PANEL KIRI (Kolom 1: Daftar Percakapan UMKM)                            -->
      <!-- Lebar 360px-380px proporsional dengan kartu taktil solid                -->
      <!-- ======================================================================= -->
      <aside
        :class="[
          'w-full lg:w-80 xl:w-[350px] shrink-0 border-r border-[#E2E8F0] dark:border-neutral-800 flex flex-col h-full bg-white dark:bg-[#13161F]',
          isMobileChatOpen ? 'hidden lg:flex' : 'flex'
        ]"
      >
        <!-- Header Panel: Search Bar with aligned 72px header height -->
        <div class="h-[72px] min-h-[72px] px-3.5 sm:px-4 border-b border-[#E2E8F0] dark:border-neutral-800 shrink-0 bg-white dark:bg-[#13161F] flex items-center">
          <div class="relative w-full rounded-xl border border-neutral-200 dark:border-neutral-700 bg-neutral-100/70 dark:bg-neutral-800/60 focus-within:border-[#00800e] dark:focus-within:border-[#00C058] focus-within:ring-2 focus-within:ring-[#00800e]/20 transition-all flex items-center min-h-[44px] px-3">
            <HugeiconsIcon :icon="Search01Icon" :size="18" class="text-neutral-400 shrink-0 pointer-events-none mr-2.5" />
            <input
              v-model="chatStore.searchQuery"
              type="text"
              placeholder="Cari pesan atau nama usaha..."
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

        <!-- Scrollable Thread Cards List -->
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
            <!-- UMKM Logo / Avatar with Online Status Indicator -->
            <div class="relative w-11 h-11 sm:w-12 sm:h-12 rounded-full shrink-0">
              <div
                class="w-full h-full rounded-full flex items-center justify-center p-1.5 overflow-hidden border"
                :class="[
                  chatStore.activeThreadId === thread.id
                    ? 'bg-white/20 border-white/50 text-white'
                    : 'bg-amber-400 border-amber-300/80 text-amber-950'
                ]"
              >
                <img src="/logo.svg" alt="Logo Usaha" class="w-full h-full object-contain" />
              </div>
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
                  {{ thread.umkmName }}
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

              <!-- Owner & Location subtext -->
              <p
                :class="[
                  'text-xs font-normal truncate mt-0.5',
                  chatStore.activeThreadId === thread.id ? 'text-emerald-100' : 'text-neutral-500 dark:text-neutral-400'
                ]"
              >
                {{ thread.umkmOwner }} • {{ thread.umkmCity }}
              </p>
              
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
                  v-if="thread.unreadInvestor > 0"
                  :class="[
                    'px-2 py-0.5 rounded-full text-[11px] font-bold tabular-nums shrink-0 leading-none shadow-2xs',
                    chatStore.activeThreadId === thread.id
                      ? 'bg-white text-[#00800e]'
                      : 'bg-[#00800e] text-white'
                  ]"
                >
                  {{ thread.unreadInvestor }}
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
        <div class="h-[72px] min-h-[72px] px-4 sm:px-6 border-b border-[#E2E8F0] dark:border-neutral-800 flex items-center justify-between gap-3 shrink-0 bg-white dark:bg-[#13161F] z-10 relative">
          <div class="flex items-center gap-2.5 sm:gap-3.5 min-w-0 flex-1">
            <!-- Mobile Back Button -->
            <button
              type="button"
              class="lg:hidden p-2 -ml-1 rounded-xl text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 cursor-pointer shrink-0"
              aria-label="Kembali ke Daftar Pesan"
              @click="isMobileChatOpen = false"
            >
              <HugeiconsIcon :icon="ArrowLeft01Icon" :size="20" />
            </button>

            <!-- Clickable Partner Profile & Info Header (Avatar + Title) -->
            <button
              type="button"
              class="flex items-center gap-2.5 sm:gap-3.5 min-w-0 flex-1 text-left cursor-pointer group p-1 -m-1 rounded-xl hover:bg-neutral-100/60 dark:hover:bg-neutral-800/50 transition-colors"
              title="Ketuk untuk melihat profil, Tentang Bisnis Saya, dan berkas dokumen"
              @click="toggleDetailPanel"
            >
              <!-- UMKM Avatar with Online Badge -->
              <div class="relative w-10 h-10 sm:w-12 sm:h-12 rounded-full shrink-0">
                <img
                  :src="activeThread.umkmAvatar || '/images/user-profile.png'"
                  :alt="activeThread.umkmName"
                  class="w-full h-full rounded-full object-cover border border-neutral-200 dark:border-neutral-700 group-hover:scale-105 transition-transform"
                />
                <span
                  class="absolute bottom-0 right-0 w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full ring-2 ring-white dark:ring-[#13161F]"
                  :class="activeThread.online ? 'bg-[#00800e]' : 'bg-neutral-400'"
                />
              </div>

              <!-- Partner Identity Details -->
              <div class="min-w-0 flex-1">
                <h2 class="font-poppins font-bold text-sm sm:text-lg text-neutral-900 dark:text-white truncate leading-tight group-hover:text-[#00800e] dark:group-hover:text-[#00C058] transition-colors">
                  {{ activeThread.umkmName }}
                </h2>
                
                <div class="flex items-center gap-1.5 sm:gap-2 text-[11px] sm:text-sm text-neutral-500 dark:text-neutral-400 mt-0.5 font-sans truncate">
                  <span class="truncate font-medium">{{ activeThread.umkmOwner }}</span>
                  <span class="text-neutral-300 dark:text-neutral-700 shrink-0">•</span>
                  <span class="inline-flex items-center gap-1 text-[#00800e] dark:text-[#00C058] font-semibold shrink-0">
                    <HugeiconsIcon :icon="ShieldCheckIcon" :size="13" class="shrink-0" />
                    <span>Terverifikasi</span>
                  </span>
                </div>
              </div>
            </button>
          </div>
        </div>

        <!-- 2. Chat Stream Body -->
        <div
          ref="messagesContainer"
          class="flex-1 min-h-0 overflow-y-auto p-4 sm:p-6 space-y-5 overscroll-contain bg-[#F8FAFC] dark:bg-[#0B0F19]"
        >
          <!-- Date Divider Pill -->
          <div class="flex items-center justify-center my-1.5">
            <span class="px-4 py-1 rounded-full text-xs font-semibold bg-white dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400 border border-neutral-200 dark:border-neutral-700 shadow-2xs font-sans">
              Hari ini, 24 Oktober 2026
            </span>
          </div>

          <!-- Messages Stream with Left/Right Bubbles -->
          <div
            v-for="msg in activeThread.messages"
            :key="msg.id"
            :class="[
              'chat-bubble-item flex items-start gap-3 max-w-[85%] sm:max-w-[72%]',
              msg.senderRole === 'INVESTOR' ? 'ml-auto flex-row-reverse' : 'mr-auto'
            ]"
          >
            <!-- Sender Avatar -->
            <div class="w-9 h-9 sm:w-10 sm:h-10 rounded-full overflow-hidden shrink-0 mt-0.5 border border-neutral-200 dark:border-neutral-700 shadow-2xs">
              <img
                :src="msg.senderRole === 'INVESTOR' ? '/images/user-profile.png' : '/logo.svg'"
                alt="Avatar"
                class="w-full h-full object-cover"
                :class="msg.senderRole === 'UMKM' ? 'p-1.5 bg-amber-400 object-contain' : ''"
              />
            </div>

            <!-- Message Bubble Content -->
            <div class="space-y-1.5 min-w-0" :class="msg.senderRole === 'INVESTOR' ? 'items-end text-right' : 'items-start'">
              <div class="flex items-center gap-2 text-xs" :class="msg.senderRole === 'INVESTOR' ? 'justify-end' : ''">
                <span class="font-semibold text-neutral-900 dark:text-white font-poppins">
                  {{ msg.senderRole === 'INVESTOR' ? 'Anda (Investor)' : activeThread.umkmName }}
                </span>
                <span class="text-neutral-400 dark:text-neutral-500 tabular-nums font-sans">{{ msg.timestamp }}</span>
              </div>

              <div
                :class="[
                  'p-4 sm:p-4.5 rounded-xl text-sm sm:text-[14.5px] leading-relaxed shadow-xs text-left font-sans',
                  msg.senderRole === 'INVESTOR'
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
                    msg.senderRole === 'INVESTOR'
                      ? 'bg-white/15 border-white/25 text-white'
                      : 'bg-neutral-50 dark:bg-neutral-800/80 border-neutral-200 dark:border-neutral-700 text-neutral-900 dark:text-white'
                  ]"
                >
                  <div class="flex items-center gap-3 min-w-0">
                    <div
                      :class="[
                        'w-9 h-9 rounded-lg flex items-center justify-center shrink-0',
                        msg.senderRole === 'INVESTOR' ? 'bg-white/20 text-white' : 'bg-emerald-50 dark:bg-emerald-950/40 text-[#00800e] dark:text-emerald-400'
                      ]"
                    >
                      <HugeiconsIcon :icon="File01Icon" :size="18" />
                    </div>
                    <div class="min-w-0 text-left">
                      <p class="text-xs sm:text-sm font-semibold truncate">{{ msg.attachment.title }}</p>
                      <p
                        :class="[
                          'text-xs tabular-nums',
                          msg.senderRole === 'INVESTOR' ? 'text-white/80' : 'text-neutral-500 dark:text-neutral-400'
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
                      msg.senderRole === 'INVESTOR'
                        ? 'bg-white text-[#00800e] hover:bg-white/90'
                        : 'bg-neutral-200/80 dark:bg-neutral-700 hover:bg-neutral-300 dark:hover:bg-neutral-600 text-neutral-700 dark:white'
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

        <!-- Quick Phrases Bar (Horizontal Scroll) -->
        <div class="px-4 py-2 border-t border-neutral-100 dark:border-neutral-800/80 bg-white dark:bg-[#13161F] flex items-center gap-2 overflow-x-auto no-scrollbar shrink-0">
          <button
            v-for="(phrase, pIdx) in investorQuickPhrases"
            :key="pIdx"
            type="button"
            class="px-3 py-1 rounded-full text-xs bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 text-neutral-600 dark:text-neutral-300 whitespace-nowrap transition-colors cursor-pointer shrink-0 font-sans"
            @click="insertPhrase(phrase)"
          >
            {{ phrase }}
          </button>
        </div>

        <!-- 3. Emoji & Extended Quick Replies Bar (Toggleable) -->
        <div v-if="showEmojiPicker" class="px-5 py-2.5 border-t border-[#E2E8F0] dark:border-neutral-800 bg-neutral-50 dark:bg-[#151924] flex items-center gap-2 flex-wrap">
          <span class="text-xs font-semibold text-neutral-500 dark:text-neutral-400 mr-1 font-sans">Emoji Cepat:</span>
          <button
            v-for="emoji in ['👍', '🤝', '💼', '📊', '✅', '📈']"
            :key="emoji"
            type="button"
            class="w-8 h-8 rounded-lg hover:bg-white dark:hover:bg-neutral-800 text-base flex items-center justify-center transition-colors cursor-pointer"
            @click="insertEmoji(emoji)"
          >
            {{ emoji }}
          </button>
        </div>

        <!-- 4. Minimalist Input Bar with Working File Attachment -->
        <div class="p-2.5 sm:p-5 border-t border-[#E2E8F0] dark:border-neutral-800 shrink-0 bg-white dark:bg-[#13161F]">
          <!-- Hidden Native File Input for Real Chat Attachments -->
          <input
            ref="chatFileInputRef"
            type="file"
            class="hidden"
            accept=".pdf,.png,.jpg,.jpeg,.doc,.docx,.xlsx"
            @change="handleFileSelected"
          />

          <form
            class="relative flex items-center gap-1.5 sm:gap-2.5 px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-xl bg-neutral-100/90 dark:bg-[#18191E] border border-neutral-200 dark:border-neutral-700 focus-within:ring-2 focus-within:ring-[#00800e]/20 focus-within:border-[#00800e] transition-all min-h-[48px] sm:min-h-[52px] w-full min-w-0"
            @submit.prevent="handleSendMessage"
          >
            <!-- Add / Attach Button (+) -->
            <button
              type="button"
              class="w-8.5 h-8.5 sm:w-9 sm:h-9 rounded-lg sm:rounded-xl bg-white dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white flex items-center justify-center shadow-2xs transition-transform hover:scale-105 shrink-0 cursor-pointer"
              title="Lampirkan Dokumen Term Sheet atau LOI"
              @click="chatFileInputRef?.click()"
            >
              <HugeiconsIcon :icon="Add01Icon" :size="17" />
            </button>

            <!-- Text Input (min-w-0 to prevent flex blowout on small screens) -->
            <input
              v-model="inputMessage"
              type="text"
              placeholder="Tulis pesan untuk pendiri usaha..."
              class="flex-1 min-w-0 px-2 py-1 text-xs sm:text-base bg-transparent text-neutral-900 dark:text-white placeholder:text-neutral-400 focus:outline-none font-sans"
              @keydown.enter.exact.prevent="handleSendMessage"
            />

            <!-- Smile / Emoji Toggle Button -->
            <button
              type="button"
              :class="[
                'w-8.5 h-8.5 sm:w-9 sm:h-9 rounded-lg sm:rounded-xl flex items-center justify-center shrink-0 cursor-pointer transition-colors',
                showEmojiPicker
                  ? 'text-[#00800e] dark:text-[#00C058] bg-emerald-50 dark:bg-emerald-950/40'
                  : 'text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200'
              ]"
              title="Pilihan Pertanyaan Cepat & Emoji"
              @click="showEmojiPicker = !showEmojiPicker"
            >
              <HugeiconsIcon :icon="SmileIcon" :size="18" />
            </button>

            <!-- Send Button -->
            <button
              type="submit"
              :disabled="!inputMessage.trim()"
              class="w-8.5 h-8.5 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-[#00800e] hover:bg-[#006e0c] disabled:opacity-40 disabled:cursor-not-allowed text-white flex items-center justify-center shadow-xs transition-transform active:scale-95 shrink-0 cursor-pointer"
              title="Kirim Pesan"
            >
              <HugeiconsIcon :icon="SendIcon" :size="16" />
            </button>
          </form>
        </div>
      </section>

    </div>

    <!-- ========================================================================= -->
    <!-- MODAL: Rincian Usaha & Berkas Data Room (1:1 with UMKM Modal Component)   -->
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
          class="fixed inset-0 z-50 flex items-center justify-center p-0 sm:py-8 sm:px-4 md:py-12 md:px-6 bg-black/60 select-none"
          @click.self="isDetailPanelOpen = false"
        >
          <Transition
            enter-active-class="transition-all duration-200 ease-in-out transform"
            enter-from-class="opacity-0 translate-y-4 sm:scale-95 sm:translate-y-2"
            enter-to-class="opacity-100 translate-y-0 sm:scale-100"
            leave-active-class="transition-all duration-150 ease-in-out transform"
            leave-from-class="opacity-100 translate-y-0 sm:scale-100"
            leave-to-class="opacity-0 translate-y-4 sm:scale-95 sm:translate-y-2"
          >
            <div
              v-if="isDetailPanelOpen"
              class="w-full h-full sm:h-auto sm:max-h-[90vh] sm:w-[94vw] max-w-none sm:max-w-3xl md:max-w-4xl lg:max-w-5xl xl:max-w-6xl bg-white dark:bg-[#13161F] rounded-none sm:rounded-2xl border-0 sm:border border-neutral-200 dark:border-neutral-800 shadow-2xl overflow-hidden flex flex-col font-poppins text-neutral-900 dark:text-white"
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-rincian-title"
            >
              <!-- Modal Header -->
              <div class="px-6 sm:px-8 lg:px-10 py-5 sm:py-6 border-b border-neutral-100 dark:border-neutral-800 flex items-center justify-between shrink-0 bg-white dark:bg-[#13161F]">
                <div class="flex items-center gap-3 min-w-0">
                  <div class="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-[#00800e] dark:text-[#00C058] flex items-center justify-center shrink-0">
                    <HugeiconsIcon :icon="UserCircleIcon" :size="22" />
                  </div>
                  <div class="min-w-0">
                    <h3 id="modal-rincian-title" class="font-poppins font-bold text-base sm:text-lg lg:text-xl text-neutral-900 dark:text-white leading-tight truncate">
                      Rincian Profil Usaha
                    </h3>
                    <p class="hidden sm:block text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 font-sans mt-0.5 truncate">
                      Ruang data & dokumen terverifikasi mitra
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  class="w-10 h-10 min-w-10 min-h-10 aspect-square rounded-full bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 flex items-center justify-center text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors cursor-pointer shrink-0 ml-3"
                  title="Tutup (Esc)"
                  aria-label="Tutup Rincian"
                  @click="isDetailPanelOpen = false"
                >
                  <HugeiconsIcon :icon="Cancel01Icon" :size="18" :stroke-width="2.2" />
                </button>
              </div>

              <!-- Modal Body with generous gaps for profile, about, action button, and documents -->
              <div class="flex-1 px-6 sm:px-8 lg:px-10 pt-7 pb-10 sm:pt-9 sm:pb-14 space-y-6 sm:space-y-7 overflow-y-auto max-h-none sm:max-h-[75vh] overscroll-contain">
                <!-- 1. Profil Mitra Identity Card -->
                <div v-if="activeThread" class="py-5 sm:py-6 px-6 sm:px-7 rounded-2xl bg-neutral-50/80 dark:bg-[#151922] border border-neutral-200/80 dark:border-neutral-800 flex items-center gap-4">
                  <div class="relative w-13 h-13 rounded-full shrink-0">
                    <img
                      :src="activeThread.umkmAvatar || '/images/user-profile.png'"
                      alt="Avatar"
                      class="w-full h-full rounded-full object-cover border border-neutral-200 dark:border-neutral-700"
                    />
                    <span
                      class="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 rounded-full ring-2 ring-white dark:ring-[#151922]"
                      :class="activeThread.online ? 'bg-emerald-400' : 'bg-neutral-400'"
                    />
                  </div>
                  <div class="min-w-0 flex-1">
                    <div class="flex items-center gap-2">
                      <h4 class="font-poppins font-bold text-base sm:text-lg text-neutral-900 dark:text-white truncate">
                        {{ activeThread.umkmName }}
                      </h4>
                      <HugeiconsIcon :icon="ShieldCheckIcon" :size="18" class="text-[#00800e] dark:text-[#00C058] shrink-0" />
                    </div>
                    <p class="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 truncate font-sans mt-0.5">
                      {{ activeThread.umkmOwner }} • {{ activeThread.umkmCity }}
                    </p>
                  </div>
                </div>

                <!-- 2. Tentang Bisnis Saya Card -->
                <div class="py-6 sm:py-7 px-6 sm:px-8 space-y-3 rounded-2xl bg-[#F6F8FA] dark:bg-[#151922] border border-neutral-200/80 dark:border-neutral-800">
                  <h4 class="text-xs sm:text-sm font-bold text-neutral-900 dark:text-white flex items-center gap-2 font-poppins">
                    <HugeiconsIcon :icon="Store01Icon" :size="17" class="text-[#00800e] dark:text-[#00C058]" />
                    Tentang Bisnis Saya
                  </h4>
                  <p class="text-xs sm:text-sm lg:text-base text-neutral-600 dark:text-neutral-300 font-sans leading-relaxed">
                    {{ partnerBusinessAbout }}
                  </p>
                </div>

                <!-- 3. Button Mengarah ke Halaman Profile Dia -->
                <div>
                  <BActionButton
                    variant="green"
                    custom-class="w-full justify-center text-center py-3.5 sm:py-4 text-xs sm:text-sm font-semibold min-h-[50px] sm:min-h-[54px] shadow-sm"
                    :huge-icon="UserCircleIcon"
                    :icon-size="18"
                    title="Buka Halaman Profil Lengkap"
                    @click="navigateToPartnerProfile"
                  >
                    Buka Halaman Profil Lengkap
                  </BActionButton>
                </div>

                <!-- 4. Dokumen -->
                <div class="pt-4 pb-2 space-y-4">
                  <div class="flex items-center justify-between">
                    <span class="text-xs sm:text-sm font-bold text-neutral-900 dark:text-white flex items-center gap-2 font-poppins">
                      <HugeiconsIcon :icon="FileValidationIcon" :size="17" class="text-[#00800e] dark:text-[#00C058]" />
                      Dokumen
                    </span>
                    <span class="text-xs text-neutral-400 tabular-nums font-sans">
                      {{ officialDocuments.length }} Dokumen
                    </span>
                  </div>

                  <!-- Documents list -->
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                    <div
                      v-for="doc in officialDocuments"
                      :key="doc.name"
                      class="py-4 sm:py-4.5 px-4 sm:px-5 rounded-xl bg-white dark:bg-[#151922] border border-neutral-200 dark:border-neutral-800 flex items-center justify-between gap-3 hover:border-neutral-300 dark:hover:border-neutral-700 transition-colors shadow-2xs"
                    >
                      <div class="flex items-center gap-3 min-w-0">
                        <div class="w-9 h-9 rounded-lg bg-emerald-50 dark:bg-emerald-950/30 text-[#00800e] dark:text-[#00C058] flex items-center justify-center shrink-0">
                          <HugeiconsIcon :icon="File01Icon" :size="18" />
                        </div>
                        <div class="min-w-0">
                          <p class="text-xs sm:text-sm font-medium text-neutral-900 dark:text-white truncate font-sans">
                            {{ doc.name }}
                          </p>
                          <p class="text-xs text-neutral-400 font-sans mt-0.5">
                            {{ doc.size }}
                          </p>
                        </div>
                      </div>

                      <button
                        type="button"
                        class="w-9 h-9 rounded-lg text-neutral-500 hover:text-[#00800e] dark:hover:text-[#00C058] hover:bg-neutral-100 dark:hover:bg-neutral-800 flex items-center justify-center shrink-0 transition-colors cursor-pointer"
                        :title="`Unduh ${doc.name}`"
                        @click="downloadDocument(doc.name)"
                      >
                        <HugeiconsIcon :icon="Download01Icon" :size="17" />
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
                    custom-class="!h-11 sm:!h-12 !min-h-11 sm:!min-h-12 !text-xs sm:!text-sm !w-full justify-center border-dashed"
                    @click="officialDocInputRef?.click()"
                  >
                    Unggah Dokumen
                  </BActionButton>
                </div>
              </div>
            </div>
          </Transition>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, nextTick, watch, onMounted, onUnmounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useChatStore } from '~/stores/chat'
import { useLanguage } from '~/composables/useLanguage'
import BPillTabs, { type PillTabItem } from '~/components/base/BPillTabs.vue'
import BActionButton from '~/components/base/BActionButton.vue'
import { HugeiconsIcon } from '@hugeicons/vue'
import { gsap } from 'gsap'
import {
  Message01Icon,
  Search01Icon,
  CheckmarkCircle01Icon,
  ArrowLeft01Icon,
  ArrowRight01Icon,
  ShieldCheckIcon,
  Folder01Icon,
  File01Icon,
  FileValidationIcon,
  Download01Icon,
  Add01Icon,
  SmileIcon,
  SendIcon,
  UserCheck01Icon,
  Notification01Icon,
  Coins01Icon,
  Store01Icon,
  UserCircleIcon,
  Cancel01Icon
} from '@hugeicons/core-free-icons'

definePageMeta({
  layout: 'dashboard',
  hideHeader: true
})

const route = useRoute()
const router = useRouter()
const chatStore = useChatStore()
const { t } = useLanguage()

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

// Active Filter State: 'all' | 'unread' | 'prioritas'
const activeFilter = ref('all')
const isMobileChatOpen = ref(false)
const isDetailPanelOpen = ref(false)
const showEmojiPicker = ref(false)
const inputMessage = ref('')

const messagesContainer = ref<HTMLElement | null>(null)
const chatFileInputRef = ref<HTMLInputElement | null>(null)
const officialDocInputRef = ref<HTMLInputElement | null>(null)

// Pill Tabs Options with icons, shortLabels, and dynamic counts matching UMKM chat standard
const filterTabs = computed<PillTabItem[]>(() => [
  {
    id: 'all',
    label: t('chat_tab_all'),
    shortLabel: t('chat_tab_all_short'),
    icon: UserCheck01Icon,
    count: chatStore.threads.length,
    badge: chatStore.threads.length
  },
  {
    id: 'unread',
    label: 'Belum Dibaca',
    shortLabel: 'Belum Dibaca',
    icon: Notification01Icon,
    count: chatStore.unreadCountInvestor > 0 ? chatStore.unreadCountInvestor : undefined,
    badge: chatStore.unreadCountInvestor > 0 ? chatStore.unreadCountInvestor : undefined
  },
  {
    id: 'prioritas',
    label: 'Siap Modal',
    shortLabel: 'Siap Modal',
    icon: Coins01Icon,
    count: chatStore.threads.filter(t => t.category === 'prioritas' || (t.umkmHealthScore || 0) >= 75).length
  }
])

function handleFilterChange(tabId: string) {
  activeFilter.value = tabId
}

// Filtered Threads based on Pill Tabs + Search
const filteredThreads = computed(() => {
  let list = chatStore.filteredThreads

  if (activeFilter.value === 'unread') {
    list = list.filter(t => (t.unreadInvestor || 0) > 0)
  } else if (activeFilter.value === 'prioritas') {
    list = list.filter(t => t.category === 'prioritas' || (t.umkmHealthScore || 0) >= 75)
  }

  return list
})

const activeThread = computed(() => {
  return chatStore.activeThread
})

// Official Documents for Detail Modal
const officialDocuments = ref([
  { name: 'Rapor_Keuangan_Q2_2026.pdf', size: '2.4 MB', status: 'Tervalidasi' },
  { name: 'Legalitas_NIB_OSS_RBA.pdf', size: '1.1 MB', status: 'Terverifikasi' },
  { name: 'Mutasi_Rekening_Giro_BCA_3Bln.pdf', size: '4.8 MB', status: 'Rekonsiliasi Selesai' }
])

const investorQuickPhrases = [
  'Bagaimana proyeksi dividen tahun ini?',
  'Bisa kirim rekening koran 3 bulan terakhir?',
  'Tertarik untuk jadwal kunjungan usaha',
  'Data room toko Anda sudah kami kaji 👍'
]

function selectThread(threadId: string) {
  chatStore.setActiveThread(threadId)
  chatStore.markAsRead(threadId, 'INVESTOR')
  isMobileChatOpen.value = true
  scrollToBottom()
  animateMessagesReveal()
}

function handleMarkAllAsRead() {
  chatStore.markAllAsRead('INVESTOR')
  triggerToast('Semua pesan ditandai sudah dibaca.')
}

function toggleDetailPanel() {
  isDetailPanelOpen.value = !isDetailPanelOpen.value
}

function toggleDetailModal() {
  toggleDetailPanel()
}

const partnerBusinessAbout = computed(() => {
  if (!activeThread.value) return 'Profil unit usaha binaan terverifikasi platform Beruang.'
  return 'Spesialis produk minuman kopi artisan dan olahan bakery lokal dengan standard operating procedure (SOP) higienis, pencatatan kas harian tervalidasi digital, serta rasio margin untung sehat untuk siap pendanaan ekspansi.'
})

function navigateToPartnerProfile() {
  isDetailPanelOpen.value = false
  if (activeThread.value?.umkmId) {
    router.push(`/investor/umkm/${activeThread.value.umkmId}`)
  } else {
    router.push('/investor/market')
  }
}

function insertPhrase(phrase: string) {
  inputMessage.value = phrase
  showEmojiPicker.value = false
}

function insertEmoji(emoji: string) {
  inputMessage.value += ` ${emoji}`
}

function handleSendMessage() {
  if (!inputMessage.value.trim() || !activeThread.value) return

  const text = inputMessage.value
  inputMessage.value = ''
  showEmojiPicker.value = false

  chatStore.sendMessage(activeThread.value.id, text, 'INVESTOR')
  scrollToBottom()

  // Automated friendly simulation reply from UMKM after 1.5 seconds
  setTimeout(() => {
    if (activeThread.value) {
      chatStore.sendMessage(
        activeThread.value.id,
        'Terima kasih atas pertanyaannya! Berkas pendukung dan rincian transaksi toko segera kami perbarui di data room.',
        'UMKM'
      )
      scrollToBottom()
    }
  }, 1500)
}

function handleFileSelected(e: Event) {
  const target = e.target as HTMLInputElement
  if (target.files && target.files[0] && activeThread.value) {
    const file = target.files[0]
    chatStore.sendMessage(activeThread.value.id, `Mengirim lampiran: ${file.name}`, 'INVESTOR', {
      type: 'DOCUMENT',
      title: file.name,
      subtitle: `${(file.size / (1024 * 1024)).toFixed(1)} MB • Lampiran Investor`
    })
    triggerToast(`Dokumen ${file.name} berhasil dilampirkan!`)
    target.value = ''
    scrollToBottom()
  }
}

function handleOfficialDocUpload(e: Event) {
  const target = e.target as HTMLInputElement
  if (target.files && target.files[0]) {
    const file = target.files[0]
    officialDocuments.value.push({
      name: file.name,
      size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
      status: 'Menunggu Review'
    })
    triggerToast(`Dokumen ${file.name} berhasil diunggah ke Data Room!`)
    target.value = ''
  }
}

function downloadDocument(docName: string) {
  triggerToast(`Mengunduh ${docName}...`)
}

function scrollToBottom() {
  nextTick(() => {
    if (messagesContainer.value) {
      messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight
    }
  })
}

function animateMessagesReveal() {
  nextTick(() => {
    if (messagesContainer.value) {
      const items = messagesContainer.value.querySelectorAll('.chat-bubble-item')
      if (items.length) {
        gsap.fromTo(
          items,
          { opacity: 0, y: 10 },
          { opacity: 1, y: 0, duration: 0.35, stagger: 0.05, ease: 'power2.out' }
        )
      }
    }
  })
}

// Global ESC listener for modal
function handleGlobalKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape' && isDetailPanelOpen.value) {
    isDetailPanelOpen.value = false
  }
}

watch(
  () => route.query.threadId,
  (newId) => {
    if (newId && typeof newId === 'string') {
      chatStore.setActiveThread(newId)
      chatStore.markAsRead(newId, 'INVESTOR')
    }
  },
  { immediate: true }
)

onMounted(() => {
  if (import.meta.client) {
    window.addEventListener('keydown', handleGlobalKeydown)
    if (activeThread.value) {
      chatStore.markAsRead(activeThread.value.id, 'INVESTOR')
    }
    scrollToBottom()
    animateMessagesReveal()
  }
})

onUnmounted(() => {
  if (import.meta.client) {
    window.removeEventListener('keydown', handleGlobalKeydown)
  }
})
</script>
