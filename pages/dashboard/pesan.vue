<template>
  <div class="h-full flex flex-col font-poppins text-neutral-900 dark:text-neutral-100 select-none overflow-hidden">
    <!-- Chat Main Split View Container -->
    <div class="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-12 gap-4 rounded-2xl overflow-hidden pb-1">

      <!-- ========================================================================================= -->
      <!-- KOLOM KIRI (4 Cols): Daftar Pesan dari Investor (Thread List)                             -->
      <!-- ========================================================================================= -->
      <aside
        :class="[
          'lg:col-span-4 xl:col-span-4 flex flex-col h-full card-tactile-gopay rounded-2xl border overflow-hidden',
          isMobileChatOpen ? 'hidden lg:flex' : 'flex'
        ]"
      >
        <!-- Thread Header & Search -->
        <div class="p-3.5 border-b border-neutral-200/80 dark:border-neutral-800 space-y-3 shrink-0 bg-white/50 dark:bg-[#13161F]/50 backdrop-blur-xs">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2">
              <HugeiconsIcon :icon="Message01Icon" :size="18" class="text-emerald-600 dark:text-emerald-400" />
              <h2 class="font-poppins font-bold text-sm text-neutral-900 dark:text-white">
                Pesan Masuk Investor
              </h2>
            </div>
            <span class="px-2 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-700 tabular-nums">
              {{ chatStore.threads.length }} Investor
            </span>
          </div>

          <!-- Search Thread -->
          <div class="relative">
            <HugeiconsIcon :icon="Search01Icon" :size="14" class="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
            <input
              v-model="chatStore.searchQuery"
              type="text"
              placeholder="Cari nama investor atau lembaga..."
              class="w-full pl-8 pr-3 py-1.5 rounded-xl text-xs bg-neutral-100 dark:bg-[#18191E] border border-neutral-200 dark:border-neutral-700 text-neutral-900 dark:text-white placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
            />
          </div>
        </div>

        <!-- Thread Scrollable List -->
        <div class="flex-1 overflow-y-auto p-2 space-y-1.5">
          <button
            v-for="thread in chatStore.filteredThreads"
            :key="thread.id"
            type="button"
            :class="[
              'w-full text-left p-3 rounded-xl transition-all cursor-pointer flex items-start gap-3 border',
              chatStore.activeThreadId === thread.id
                ? 'bg-emerald-50/90 dark:bg-emerald-950/40 border-emerald-400/40 dark:border-emerald-600/40 shadow-xs'
                : 'bg-white/40 dark:bg-[#18191E]/30 border-transparent hover:bg-neutral-100/70 dark:hover:bg-neutral-800/50'
            ]"
            @click="selectThread(thread.id)"
          >
            <!-- Investor Avatar -->
            <div class="relative w-10 h-10 rounded-full p-0.5 bg-gradient-to-tr from-[#2091AA] to-[#00AA13] shrink-0">
              <img
                :src="thread.investorAvatar || '/images/user-profile.png'"
                alt="Foto Profil"
                class="w-full h-full rounded-full object-cover bg-white dark:bg-[#18191E]"
              />
              <span class="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-500 ring-2 ring-white dark:ring-[#13161F]" />
            </div>

            <!-- Thread Details -->
            <div class="flex-1 min-w-0">
              <div class="flex items-center justify-between gap-1">
                <h3 class="font-poppins font-bold text-xs text-neutral-900 dark:text-white truncate">
                  {{ thread.investorName }}
                </h3>
                <span class="text-[10px] text-neutral-400 shrink-0 tabular-nums">
                  {{ thread.lastMessageAt }}
                </span>
              </div>

              <p class="text-[11px] text-neutral-500 dark:text-neutral-400 truncate mt-0.5 font-medium">
                {{ thread.investorLembaga }}
              </p>

              <div class="flex items-center justify-between gap-2 mt-1">
                <p class="text-xs text-neutral-600 dark:text-neutral-300 truncate max-w-[170px]">
                  {{ thread.lastMessage }}
                </p>
                <span
                  v-if="thread.unreadUmkm > 0"
                  class="px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-600 text-white tabular-nums shrink-0 leading-none"
                >
                  {{ thread.unreadUmkm }}
                </span>
              </div>
            </div>
          </button>
        </div>
      </aside>

      <!-- ========================================================================================= -->
      <!-- KOLOM KANAN (8 Cols): Ruang Chat Aktif Bersama Investor                                    -->
      <!-- ========================================================================================= -->
      <section
        v-if="activeThread"
        :class="[
          'lg:col-span-8 xl:col-span-8 flex flex-col h-full card-tactile-gopay rounded-2xl border overflow-hidden bg-white/70 dark:bg-[#13161F]/70',
          !isMobileChatOpen ? 'hidden lg:flex' : 'flex'
        ]"
      >
        <!-- Top Chat Header -->
        <div class="p-3.5 sm:px-5 border-b border-neutral-200/80 dark:border-neutral-800 flex items-center justify-between gap-3 shrink-0 bg-white/80 dark:bg-[#13161F]/80 backdrop-blur-md">
          <div class="flex items-center gap-3 min-w-0">
            <!-- Mobile Back Button -->
            <button
              type="button"
              class="lg:hidden p-1.5 -ml-1 rounded-xl text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800"
              aria-label="Kembali ke daftar pesan"
              @click="isMobileChatOpen = false"
            >
              <HugeiconsIcon :icon="ArrowLeft01Icon" :size="18" />
            </button>

            <!-- Investor Profile Picture -->
            <div class="w-10 h-10 rounded-full p-0.5 bg-gradient-to-tr from-[#2091AA] to-[#00AA13] shrink-0">
              <img
                :src="activeThread.investorAvatar || '/images/user-profile.png'"
                alt="Foto Profil"
                class="w-full h-full rounded-full object-cover bg-white dark:bg-[#18191E]"
              />
            </div>

            <div class="min-w-0">
              <div class="flex items-center gap-1.5">
                <h3 class="font-poppins font-bold text-sm text-neutral-900 dark:text-white truncate">
                  {{ activeThread.investorName }}
                </h3>
                <span class="inline-flex items-center gap-1 px-2 py-0.2 rounded-full text-[10px] font-semibold bg-emerald-100 text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-700">
                  <HugeiconsIcon :icon="CheckmarkCircle01Icon" :size="10" />
                  <span>Investor Terverifikasi</span>
                </span>
              </div>
              <p class="text-[11px] text-neutral-500 dark:text-neutral-400 truncate">
                {{ activeThread.investorLembaga }} • Penjajakan: <strong class="text-neutral-900 dark:text-white font-medium">Rp {{ (activeThread.ticketDiscussed / 1000000).toLocaleString('id-ID') }} Jt</strong>
              </p>
            </div>
          </div>

          <!-- Header Action CTAs -->
          <div class="flex items-center gap-2 shrink-0">
            <NuxtLink
              to="/dashboard/pendanaan"
              class="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 border border-neutral-200 dark:border-neutral-700 hover:border-neutral-400 transition-colors cursor-pointer"
            >
              <span>Ruang Modal</span>
            </NuxtLink>
            <NuxtLink
              to="/dashboard/progres"
              class="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs cursor-pointer"
            >
              <span>Cek Kas Toko</span>
            </NuxtLink>
          </div>
        </div>

        <!-- Chat Messages Area -->
        <div ref="messagesContainer" class="flex-1 min-h-0 overflow-y-auto p-4 sm:p-5 space-y-3.5 overscroll-contain">
          <!-- Deal Status Banner -->
          <div class="p-3 rounded-xl bg-emerald-50/70 dark:bg-emerald-950/40 border border-emerald-200/60 dark:border-emerald-800/60 flex items-center justify-between text-xs font-poppins">
            <div class="flex items-center gap-2">
              <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span class="text-neutral-600 dark:text-neutral-300">Status Penjajakan Mitra:</span>
              <strong class="text-emerald-800 dark:text-emerald-300 font-semibold">{{ activeThread.dealStatus }}</strong>
            </div>
            <span class="text-xs font-bold text-emerald-700 dark:text-emerald-400 tabular-nums">
              Proyeksi Tiket: Rp {{ (activeThread.ticketDiscussed / 1000000).toLocaleString('id-ID') }} Jt
            </span>
          </div>

          <!-- Messages List -->
          <div
            v-for="msg in activeThread.messages"
            :key="msg.id"
            :class="[
              'flex flex-col max-w-[85%] sm:max-w-[75%]',
              msg.senderRole === 'UMKM' ? 'ml-auto items-end' : 'mr-auto items-start'
            ]"
          >
            <!-- Sender Label -->
            <span class="text-[10px] text-neutral-400 mb-1 px-1 font-medium">
              {{ msg.senderRole === 'UMKM' ? 'Anda (Pelaku Usaha)' : activeThread.investorName }} • {{ msg.timestamp }}
            </span>

            <!-- Message Bubble -->
            <div
              :class="[
                'p-3.5 rounded-2xl text-xs sm:text-sm font-sans leading-relaxed shadow-2xs',
                msg.senderRole === 'UMKM'
                  ? 'bg-gradient-to-tr from-[#00800e] to-[#00AA13] text-white rounded-br-xs'
                  : 'bg-white dark:bg-[#18191E] text-neutral-900 dark:text-neutral-100 border border-neutral-200/80 dark:border-neutral-800 rounded-bl-xs'
              ]"
            >
              <p class="whitespace-pre-wrap">{{ msg.text }}</p>

              <!-- Optional Card Attachment -->
              <div
                v-if="msg.attachment"
                :class="[
                  'mt-2.5 p-2.5 rounded-xl border flex items-center justify-between gap-3 text-xs',
                  msg.senderRole === 'UMKM'
                    ? 'bg-black/20 border-white/20 text-white'
                    : 'bg-neutral-50 dark:bg-neutral-900/60 border-neutral-200 dark:border-neutral-700'
                ]"
              >
                <div>
                  <strong class="block font-semibold">{{ msg.attachment.title }}</strong>
                  <span class="text-[11px] opacity-80 block">{{ msg.attachment.subtitle }}</span>
                </div>
                <strong v-if="msg.attachment.value" class="text-xs sm:text-sm font-bold tabular-nums shrink-0">
                  {{ msg.attachment.value }}
                </strong>
              </div>
            </div>
          </div>
        </div>

        <!-- Quick Response Suggestion Chips for UMKM -->
        <div class="px-3 sm:px-4 py-2 border-t border-neutral-200/60 dark:border-neutral-800/60 flex items-center gap-2 overflow-x-auto scrollbar-none shrink-0 bg-neutral-50/50 dark:bg-[#18191E]/50">
          <button
            v-for="chip in quickChips"
            :key="chip"
            type="button"
            class="px-3 py-1 rounded-full text-xs font-medium bg-white dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 border border-neutral-200 dark:border-neutral-700 hover:border-emerald-500 hover:text-emerald-600 transition-colors whitespace-nowrap cursor-pointer shrink-0"
            @click="sendQuickMessage(chip)"
          >
            {{ chip }}
          </button>
        </div>

        <!-- Bottom Text Input & Send Button -->
        <form
          class="p-3 sm:p-4 border-t border-neutral-200/80 dark:border-neutral-800 flex items-center gap-2 shrink-0 bg-white dark:bg-[#13161F]"
          @submit.prevent="handleSendMessage"
        >
          <input
            v-model="inputMessage"
            type="text"
            placeholder="Balas pesan investor ini..."
            class="flex-1 px-4 py-2.5 rounded-xl text-xs sm:text-sm bg-neutral-100 dark:bg-[#18191E] border border-neutral-200 dark:border-neutral-700 text-neutral-900 dark:text-white placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/40"
          />

          <button
            type="submit"
            :disabled="!inputMessage.trim()"
            class="h-10 px-4 rounded-xl text-xs font-bold inline-flex items-center gap-1.5 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed shrink-0 bg-[#00800e] hover:bg-[#006e0c] text-white shadow-xs transition-all"
          >
            <span>Kirim</span>
            <HugeiconsIcon :icon="SendIcon" :size="16" />
          </button>
        </form>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, nextTick, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useChatStore } from '~/stores/chat'
import { HugeiconsIcon } from '@hugeicons/vue'
import {
  Message01Icon,
  Search01Icon,
  CheckmarkCircle01Icon,
  ArrowLeft01Icon,
  SendIcon
} from '@hugeicons/core-free-icons'

definePageMeta({
  layout: 'dashboard'
})

const route = useRoute()
const chatStore = useChatStore()

const inputMessage = ref('')
const messagesContainer = ref<HTMLElement | null>(null)
const isMobileChatOpen = ref(false)

const quickChips = [
  'Laporan kas bulan ini sudah tervalidasi konsultan',
  'Izin akses ruang data privat sudah kami buka',
  'Kami siap jadwalkan pertemuan daring via Zoom',
  'Terima kasih banyak atas perhatian Bapak/Ibu'
]

const activeThread = computed(() => chatStore.activeThread)

function scrollToBottom() {
  nextTick(() => {
    if (messagesContainer.value) {
      messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight
    }
  })
}

function selectThread(threadId: string) {
  chatStore.setActiveThread(threadId)
  chatStore.markAsRead(threadId, 'UMKM')
  isMobileChatOpen.value = true
  scrollToBottom()
}

function handleSendMessage() {
  if (!inputMessage.value.trim() || !activeThread.value) return
  chatStore.sendMessage(activeThread.value.id, inputMessage.value, 'UMKM')
  inputMessage.value = ''
  scrollToBottom()
}

function sendQuickMessage(text: string) {
  if (!activeThread.value) return
  chatStore.sendMessage(activeThread.value.id, text, 'UMKM')
  scrollToBottom()
}

onMounted(() => {
  if (chatStore.activeThreadId) {
    chatStore.markAsRead(chatStore.activeThreadId, 'UMKM')
    scrollToBottom()
  }
})

watch(
  () => activeThread.value?.messages.length,
  () => {
    scrollToBottom()
  }
)
</script>
