<template>
  <!-- Floating Messaging Dock Container (Bottom-Right, hidden on messages page) -->
  <div
    v-if="!isMessagesPage"
    class="hidden md:block fixed bottom-0 right-4 sm:right-6 z-50 font-poppins transition-[height] duration-300 ease-out w-[320px] sm:w-[340px]"
    :class="[
      !isExpanded
        ? 'h-12'
        : isMaximized
          ? 'h-[calc(100vh-80px)] max-h-[850px]'
          : 'h-[520px] max-h-[85vh]'
    ]"
  >
    <div
      class="w-full h-full bg-white dark:bg-[#18191E] border border-slate-200/90 dark:border-neutral-800 rounded-t-2xl shadow-[0_-4px_24px_rgba(0,0,0,0.08)] flex flex-col overflow-hidden"
    >
      <!-- ========================================================================= -->
      <!-- 1. DOCK HEADER (Always Visible: Collapsed & Expanded)                     -->
      <!-- ========================================================================= -->
      <div
        class="h-12 px-4 flex items-center justify-between border-b border-slate-200/80 dark:border-neutral-800 bg-white dark:bg-[#18191E] shrink-0 cursor-pointer select-none transition-colors hover:bg-slate-50/80 dark:hover:bg-neutral-800/40"
        @click="handleHeaderClick"
      >
        <!-- Left: Title / Back Button & Contact Info (when in Chat View) -->
        <div class="flex items-center gap-2.5 min-w-0 flex-1">
          <!-- Back button if in active conversation view -->
          <button
            v-if="isExpanded && currentView === 'chat'"
            type="button"
            class="w-7 h-7 -ml-1 rounded-lg flex items-center justify-center text-neutral-600 dark:text-neutral-300 hover:bg-slate-100 dark:hover:bg-neutral-800 transition-colors cursor-pointer shrink-0"
            title="Kembali ke daftar pesan"
            @click.stop="currentView = 'list'"
          >
            <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
              <path d="m15 18-6-6 6-6" />
            </svg>
          </button>

          <!-- Contact Avatar (Only in active conversation view; NEVER next to "Pesan") -->
          <div
            v-if="isExpanded && currentView === 'chat' && activeThread"
            class="relative w-7 h-7 rounded-full shrink-0"
          >
            <img
              :src="getThreadAvatar(activeThread)"
              :alt="getThreadName(activeThread)"
              class="w-full h-full rounded-full object-cover border border-slate-200 dark:border-neutral-700"
              @error="(e: any) => { e.target.src = '/images/user-profile.png' }"
            />
            <span
              v-if="activeThread.online !== false"
              class="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-[#22C55E] ring-2 ring-white dark:ring-[#18191E]"
            />
          </div>

          <!-- Header Title / Contact Name -->
          <div class="min-w-0 flex-1 flex items-center gap-2">
            <span class="text-[14px] font-semibold text-neutral-900 dark:text-neutral-100 truncate">
              {{ currentHeaderTitle }}
            </span>

            <!-- New Message Notification Indicator: Perfect Circle Dot with unread count inside (no impulse/ping) -->
            <div
              v-if="totalUnreadCount > 0 && (!isExpanded || currentView === 'list')"
              class="flex items-center shrink-0"
              title="Ada pesan baru belum dibaca"
            >
              <span
                class="w-5 h-5 min-w-[20px] min-h-[20px] rounded-full bg-[#00AA13] dark:bg-[#22C55E] text-white text-[11px] font-bold flex items-center justify-center shrink-0 tabular-nums leading-none shadow-xs"
              >
                {{ totalUnreadCount }}
              </span>
            </div>
          </div>
        </div>

        <!-- Right: Actions (Fullscreen Chat Button + Buka/Tutup Chevron Button) -->
        <div class="flex items-center gap-1 text-neutral-600 dark:text-neutral-400 shrink-0">
          <!-- Fullscreen Chat Page Button (Membawa ke halaman chat penuh /dashboard/pesan atau /investor/pesan) -->
          <button
            v-if="isExpanded"
            type="button"
            class="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-slate-100 dark:hover:bg-neutral-800 hover:text-neutral-900 dark:hover:text-white transition-colors cursor-pointer"
            title="Buka Halaman Chat Penuh"
            @click.stop="openFullScreenChat"
          >
            <!-- Outward arrows icon for fullscreen redirect -->
            <svg
              class="w-3.5 h-3.5 transition-transform duration-200"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2.2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <polyline points="15 3 21 3 21 9" />
              <polyline points="9 21 3 21 3 15" />
              <line x1="21" y1="3" x2="14" y2="10" />
              <line x1="3" y1="21" x2="10" y2="14" />
            </svg>
          </button>

          <!-- Expand / Collapse Chevron button (Buka / Tutup Pesan) -->
          <button
            v-if="isExpanded"
            type="button"
            class="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-slate-100 dark:hover:bg-neutral-800 hover:text-neutral-900 dark:hover:text-white transition-colors cursor-pointer"
            title="Tutup Pesan"
            @click.stop="isExpanded = false"
          >
            <svg
              class="w-4 h-4 transition-transform duration-200"
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

          <!-- Simple Chevron Indicator when collapsed (Header is clicked to open) -->
          <div
            v-else
            class="w-7 h-7 rounded-lg flex items-center justify-center text-neutral-500 pointer-events-none"
            aria-hidden="true"
          >
            <svg
              class="w-4 h-4 transition-transform duration-200"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2.2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="m18 15-6-6-6 6" />
            </svg>
          </div>
        </div>
      </div>

      <!-- ========================================================================= -->
      <!-- 2. EXPANDED PANEL CONTENT                                                 -->
      <!-- ========================================================================= -->
      <div v-if="isExpanded" class="flex-1 flex flex-col min-h-0 bg-white dark:bg-[#18191E] overflow-hidden">
        
        <!-- ===================================================================== -->
        <!-- VIEW A: DAFTAR PESAN (Thread List View)                               -->
        <!-- ===================================================================== -->
        <template v-if="currentView === 'list'">
          <!-- Search Bar (No Filter Icon) -->
          <div class="px-3.5 py-2.5 border-b border-slate-100 dark:border-neutral-800/80 bg-white dark:bg-[#18191E]">
            <div class="flex items-center gap-2 bg-[#F8FAFC] dark:bg-[#13161F] border border-slate-200 dark:border-neutral-700/80 rounded-xl px-3 py-1.5 transition-colors focus-within:border-[#156374] focus-within:ring-1 focus-within:ring-[#156374]">
              <svg class="w-3.5 h-3.5 text-neutral-400 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.3-4.3" />
              </svg>
              <input
                v-model="searchQuery"
                type="text"
                placeholder="Cari pesan"
                class="w-full bg-transparent border-none outline-none text-xs text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-400 font-poppins"
              />
            </div>
          </div>

          <!-- Tabs: Prioritas & Lainnya (Exact LinkedIn Image 2) -->
          <div class="flex items-center border-b border-slate-200 dark:border-neutral-800 bg-white dark:bg-[#18191E] text-xs font-semibold">
            <button
              type="button"
              :class="[
                'flex-1 py-2.5 text-center transition-colors relative cursor-pointer font-poppins',
                activeTab === 'prioritas'
                  ? 'text-[#156374] dark:text-[#50AABF]'
                  : 'text-neutral-500 hover:text-neutral-800 dark:text-neutral-400 dark:hover:text-neutral-200'
              ]"
              @click="activeTab = 'prioritas'"
            >
              <span>Prioritas</span>
              <!-- Active Indicator Bar -->
              <div
                v-if="activeTab === 'prioritas'"
                class="absolute bottom-0 left-0 right-0 h-[2px] bg-[#156374] dark:bg-[#50AABF]"
              />
            </button>

            <button
              type="button"
              :class="[
                'flex-1 py-2.5 text-center transition-colors relative cursor-pointer font-poppins',
                activeTab === 'lainnya'
                  ? 'text-[#156374] dark:text-[#50AABF]'
                  : 'text-neutral-500 hover:text-neutral-800 dark:text-neutral-400 dark:hover:text-neutral-200'
              ]"
              @click="activeTab = 'lainnya'"
            >
              <span>Lainnya</span>
              <!-- Active Indicator Bar -->
              <div
                v-if="activeTab === 'lainnya'"
                class="absolute bottom-0 left-0 right-0 h-[2px] bg-[#156374] dark:bg-[#50AABF]"
              />
            </button>
          </div>

          <!-- Contact Conversations List -->
          <div class="flex-1 overflow-y-auto divide-y divide-slate-100 dark:divide-neutral-800/80">
            <div
              v-for="thread in displayedThreads"
              :key="thread.id"
              class="px-3.5 py-3 flex items-start gap-3 hover:bg-[#F8FAFC] dark:hover:bg-[#1F232E] cursor-pointer transition-colors relative group"
              @click="openThread(thread.id)"
            >
              <!-- Contact Avatar with Green Online Status Dot -->
              <div class="relative w-10 h-10 rounded-full shrink-0">
                <img
                  :src="getThreadAvatar(thread)"
                  :alt="getThreadName(thread)"
                  class="w-full h-full rounded-full object-cover border border-slate-200 dark:border-neutral-700 bg-neutral-100 dark:bg-neutral-800"
                  @error="(e: any) => { e.target.src = '/images/user-profile.png' }"
                />
                <!-- Online Green Dot Indicator -->
                <span
                  v-if="thread.online !== false"
                  class="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-[#22C55E] ring-2 ring-white dark:ring-[#18191E]"
                />
              </div>

              <!-- Message Details -->
              <div class="flex-1 min-w-0 pr-1">
                <div class="flex items-baseline justify-between gap-2">
                  <h4 class="text-[13px] font-semibold text-neutral-900 dark:text-neutral-100 truncate leading-snug">
                    {{ getThreadName(thread) }}
                  </h4>
                  <span class="text-[11px] text-neutral-400 dark:text-neutral-500 shrink-0 tabular-nums">
                    {{ thread.lastMessageAt }}
                  </span>
                </div>

                <p class="text-[12px] font-normal text-neutral-500 dark:text-neutral-400 line-clamp-1 mt-0.5 leading-snug">
                  {{ thread.lastMessage }}
                </p>
              </div>

              <!-- Unread Dot if unread (Green Dot Notification) -->
              <span
                v-if="getThreadUnread(thread) > 0"
                class="w-2.5 h-2.5 rounded-full bg-[#00AA13] dark:bg-[#22C55E] ring-2 ring-emerald-100 dark:ring-emerald-950/70 shrink-0 self-center"
                title="Pesan baru"
              />
            </div>

            <!-- Empty Search State -->
            <div
              v-if="displayedThreads.length === 0"
              class="p-8 text-center text-xs text-neutral-400 dark:text-neutral-500"
            >
              Tidak ada percakapan ditemukan.
            </div>
          </div>
        </template>

        <!-- ===================================================================== -->
        <!-- VIEW B: RUANG OBROLAN AKTIF (Conversation Chat View)                  -->
        <!-- ===================================================================== -->
        <template v-else-if="currentView === 'chat' && activeThread">
          <!-- Scrollable Message Bubbles -->
          <div
            ref="messagesBoxRef"
            class="flex-1 overflow-y-auto p-3.5 space-y-3 bg-[#F8FAFC] dark:bg-[#13161F]/60"
          >
            <!-- Date Divider -->
            <div class="text-center my-2">
              <span class="px-2.5 py-0.5 rounded-full text-[10px] font-normal bg-slate-200/60 dark:bg-neutral-800 text-neutral-500">
                Percakapan Terenkripsi Beruang
              </span>
            </div>

            <!-- Messages Stream -->
            <div
              v-for="msg in activeThread.messages"
              :key="msg.id"
              :class="[
                'flex flex-col max-w-[82%]',
                isSenderMe(msg) ? 'ml-auto items-end' : 'mr-auto items-start'
              ]"
            >
              <div
                :class="[
                  'px-3.5 py-2.5 rounded-2xl text-[12.5px] font-normal leading-relaxed break-words font-poppins',
                  isSenderMe(msg)
                    ? 'bg-[#156374] text-white rounded-tr-xs shadow-2xs'
                    : 'bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 border border-slate-200 dark:border-neutral-700/80 rounded-tl-xs shadow-2xs'
                ]"
              >
                {{ msg.text }}
              </div>
              <span class="text-[10px] text-neutral-400 mt-1 px-1 tabular-nums font-normal">
                {{ msg.timestamp }}
              </span>
            </div>
          </div>

          <!-- Bottom Reply Input Form -->
          <form
            class="p-2.5 border-t border-slate-200 dark:border-neutral-800 bg-white dark:bg-[#18191E] flex items-center gap-2 shrink-0"
            @submit.prevent="handleSendMessage"
          >
            <input
              v-model="replyText"
              type="text"
              placeholder="Tulis pesan..."
              class="flex-1 px-3 py-2 rounded-xl text-xs bg-[#F8FAFC] dark:bg-[#13161F] border border-slate-200 dark:border-neutral-700/80 text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-400 outline-none focus:border-[#156374] focus:ring-1 focus:ring-[#156374] font-poppins transition-colors"
            />
            <button
              type="submit"
              :disabled="!replyText.trim()"
              class="w-8 h-8 rounded-xl bg-[#156374] hover:bg-[#114E5B] text-white flex items-center justify-center transition-all disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer shrink-0 active:scale-95"
              title="Kirim Pesan"
            >
              <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                <path d="m22 2-7 20-4-9-9-4Z" />
                <path d="M22 2 11 13" />
              </svg>
            </button>
          </form>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, nextTick, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '~/stores/auth'
import { useChatStore, type ChatThread, type ChatMessage } from '~/stores/chat'

const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()
const chatStore = useChatStore()

const isMessagesPage = computed(() => {
  return route.path.includes('/pesan')
})

// State
const isExpanded = ref(false)
const isMaximized = ref(false)
const currentView = ref<'list' | 'chat'>('list')

function openFullScreenChat() {
  isExpanded.value = false
  const targetRoute = currentRole.value === 'INVESTOR' ? '/investor/pesan' : '/dashboard/pesan'
  router.push(targetRoute)
}

function toggleExpand() {
  if (!isExpanded.value) {
    isExpanded.value = true
    isMaximized.value = true
  } else {
    isMaximized.value = !isMaximized.value
  }
}
const activeTab = ref<'prioritas' | 'lainnya'>('prioritas')
const searchQuery = ref('')
const replyText = ref('')
const messagesBoxRef = ref<HTMLElement | null>(null)

const currentRole = computed(() => authStore.currentUser?.role || 'UMKM')

// Total Unread Count
const totalUnreadCount = computed(() => {
  return currentRole.value === 'INVESTOR'
    ? chatStore.unreadCountInvestor
    : chatStore.unreadCountUmkm
})

// Active Thread
const activeThread = computed<ChatThread | undefined>(() => {
  return chatStore.activeThread
})

// Header Title
const currentHeaderTitle = computed(() => {
  if (isExpanded.value && currentView.value === 'chat' && activeThread.value) {
    return getThreadName(activeThread.value)
  }
  return 'Pesan'
})

// Thread Helpers
function getThreadName(thread: ChatThread): string {
  if (thread.contactName) return thread.contactName
  if (currentRole.value === 'INVESTOR') {
    return thread.umkmName
  }
  return thread.investorName
}

function getThreadAvatar(thread: ChatThread): string {
  if (thread.contactAvatar) return thread.contactAvatar
  if (currentRole.value === 'INVESTOR') {
    return thread.umkmAvatar || '/images/default-store-banner.jpg'
  }
  return thread.investorAvatar || '/images/user-profile.png'
}

function getThreadUnread(thread: ChatThread): number {
  return currentRole.value === 'INVESTOR' ? thread.unreadInvestor : thread.unreadUmkm
}

function isSenderMe(msg: ChatMessage): boolean {
  if (currentRole.value === 'INVESTOR') {
    return msg.senderRole === 'INVESTOR'
  }
  return msg.senderRole === 'UMKM'
}

// Filtered Threads by Tab & Search
const displayedThreads = computed(() => {
  const q = searchQuery.value.toLowerCase().trim()
  return chatStore.threads.filter((t) => {
    // Filter by Tab
    if (activeTab.value === 'prioritas') {
      if (t.category === 'lainnya') return false
    } else {
      if (t.category !== 'lainnya') return false
    }

    // Filter by Search Query
    if (!q) return true
    const name = getThreadName(t).toLowerCase()
    const lastMsg = (t.lastMessage || '').toLowerCase()
    return name.includes(q) || lastMsg.includes(q)
  })
})

function handleHeaderClick() {
  isExpanded.value = !isExpanded.value
}

function openThread(threadId: string) {
  chatStore.setActiveThread(threadId)
  chatStore.markAsRead(threadId, currentRole.value === 'INVESTOR' ? 'INVESTOR' : 'UMKM')
  currentView.value = 'chat'
  scrollToBottom()
}

function handleSendMessage() {
  if (!replyText.value.trim() || !activeThread.value) return
  chatStore.sendMessage(
    activeThread.value.id,
    replyText.value,
    currentRole.value === 'INVESTOR' ? 'INVESTOR' : 'UMKM'
  )
  replyText.value = ''
  scrollToBottom()
}

function scrollToBottom() {
  nextTick(() => {
    if (messagesBoxRef.value) {
      messagesBoxRef.value.scrollTop = messagesBoxRef.value.scrollHeight
    }
  })
}

watch(currentView, (newV) => {
  if (newV === 'chat') {
    scrollToBottom()
  }
})

onMounted(async () => {
  if (import.meta.client) {
    await chatStore.fetchThreads()
  }
})
</script>
