import { defineStore } from 'pinia'
import { useApi } from '~/composables/useApi'
import { useAuthStore } from './auth'

export interface ChatAttachment {
  type: 'METRIC' | 'DOCUMENT' | 'DEAL_OFFER'
  title: string
  subtitle?: string
  value?: string
}

export interface ChatMessage {
  id: string
  senderRole: 'INVESTOR' | 'UMKM'
  senderName: string
  text: string
  timestamp: string
  attachment?: ChatAttachment
}

export interface ChatThread {
  id: string
  businessId?: string
  umkmId: string
  umkmName: string
  umkmOwner: string
  umkmSector: string
  umkmCity: string
  umkmAvatar: string
  umkmHealthScore?: number
  umkmMargin?: number
  investorId: string
  investorName: string
  investorLembaga: string
  investorAvatar: string
  dealStatus: string
  ticketDiscussed: number
  unreadInvestor?: number
  unreadUmkm?: number
  unreadCount?: number
  lastMessage: string
  category?: 'prioritas' | 'lainnya'
  contactName?: string
  contactAvatar?: string
  online?: boolean
}

export const DEMO_CHAT_THREADS: ChatThread[] = [
      {
        id: 'thread-01',
        umkmId: 'umkm-01',
        umkmName: 'Kopi Senja Nusantara',
        umkmOwner: 'Dian Sasmita (Founder)',
        umkmSector: 'F&B (Coffee & Drinks)',
        umkmCity: 'Bandung',
        umkmAvatar: '/images/default-store-banner.jpg',
        umkmHealthScore: 79,
        umkmMargin: 48.5,
        investorId: 'inv-01',
        investorName: 'Franklyn Galvin Lodo',
        investorLembaga: 'East Ventures Associate',
        investorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=faces',
        contactName: 'Franklyn Galvin Lodo',
        contactAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=faces',
        category: 'prioritas',
        online: true,
        dealStatus: 'Tahap Due Diligence Kas',
        ticketDiscussed: 250000000,
        unreadInvestor: 0,
        unreadUmkm: 1,
        lastMessage: 'Franklyn: Kami sedang mengkaji proyeksi arus kas tokomu.',
        lastMessageAt: '8 Agu',
        messages: [
          {
            id: 'm-01',
            senderRole: 'INVESTOR',
            senderName: 'Franklyn Galvin Lodo',
            text: 'Halo, salam kenal. Kami dari komite investasi telah meninjau profil tokomu di Beruang.',
            timestamp: '09:45'
          },
          {
            id: 'm-02',
            senderRole: 'UMKM',
            senderName: 'Dian Sasmita',
            text: 'Halo Mas Franklyn, salam kenal kembali! Terima kasih banyak atas apresiasinya.',
            timestamp: '09:58'
          },
          {
            id: 'm-03',
            senderRole: 'INVESTOR',
            senderName: 'Franklyn Galvin Lodo',
            text: 'Franklyn: Kami sedang mengkaji proyeksi arus kas tokomu.',
            timestamp: '8 Agu'
          }
        ]
      },
      {
        id: 'thread-02',
        umkmId: 'umkm-02',
        umkmName: 'Raihan Fariz N.',
        umkmOwner: 'Raihan Fariz N.',
        umkmSector: 'Financial Advisor',
        umkmCity: 'Jakarta',
        umkmAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=faces',
        umkmHealthScore: 85,
        umkmMargin: 40.0,
        investorId: 'inv-02',
        investorName: 'Raihan Fariz N.',
        investorLembaga: 'Inkubator Bisnis UMKM',
        investorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=faces',
        contactName: 'Raihan Fariz N.',
        contactAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=faces',
        category: 'prioritas',
        online: true,
        dealStatus: 'Pendampingan Validasi',
        ticketDiscussed: 150000000,
        unreadInvestor: 0,
        unreadUmkm: 0,
        lastMessage: 'Raihan Fariz: Kami mengenal satu sama lain dari program inkubasi.',
        lastMessageAt: '4 Mei',
        messages: [
          {
            id: 'm-11',
            senderRole: 'INVESTOR',
            senderName: 'Raihan Fariz N.',
            text: 'Raihan Fariz: Kami mengenal satu sama lain dari program inkubasi.',
            timestamp: '4 Mei 11:20'
          }
        ]
      },
      {
        id: 'thread-04',
        umkmId: 'umkm-04',
        umkmName: 'Dra. Maya Suryani',
        umkmOwner: 'Dra. Maya Suryani',
        umkmSector: 'Konsultan Keuangan Beruang',
        umkmCity: 'Bandung',
        umkmAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&h=100&fit=crop&crop=faces',
        umkmHealthScore: 95,
        umkmMargin: 50.0,
        investorId: 'inv-04',
        investorName: 'Dra. Maya Suryani',
        investorLembaga: 'Konsultan Pendamping UMKM',
        investorAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&h=100&fit=crop&crop=faces',
        contactName: 'Dra. Maya Suryani',
        contactAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&h=100&fit=crop&crop=faces',
        category: 'lainnya',
        online: false,
        dealStatus: 'Konsultasi Rutin',
        ticketDiscussed: 0,
        unreadInvestor: 0,
        unreadUmkm: 0,
        lastMessage: 'Maya: Rapor keuangan bulan ini sudah selesai kami validasi.',
        lastMessageAt: 'Kemarin',
        messages: [
          {
            id: 'm-31',
            senderRole: 'INVESTOR',
            senderName: 'Dra. Maya Suryani',
            text: 'Maya: Rapor keuangan bulan ini sudah selesai kami validasi.',
            timestamp: 'Kemarin'
          }
        ]
      }
    ]

export const useChatStore = defineStore('chat', {
  state: () => ({
    activeThreadId: null as string | null,
    searchQuery: '',
    threads: [] as ChatThread[]
  }),

  getters: {
    unreadCountInvestor(state): number {
      return state.threads.reduce((acc, t) => acc + (t.unreadInvestor || 0), 0)
    },
    unreadCountUmkm(state): number {
      return state.threads.reduce((acc, t) => acc + (t.unreadUmkm || 0), 0)
    },
    activeThread(state): ChatThread | undefined {
      if (!state.activeThreadId) return state.threads[0]
      return state.threads.find(t => t.id === state.activeThreadId) || state.threads[0]
    },
    filteredThreads(state): ChatThread[] {
      const q = state.searchQuery.toLowerCase().trim()
      if (!q) return state.threads
      return state.threads.filter(t =>
        (t.contactName && t.contactName.toLowerCase().includes(q)) ||
        (t.investorName && t.investorName.toLowerCase().includes(q)) ||
        (t.umkmName && t.umkmName.toLowerCase().includes(q)) ||
        (t.lastMessage && t.lastMessage.toLowerCase().includes(q))
      )
    }
  },

  actions: {
    async fetchThreads() {
      try {
        const res = await useApi<ChatThread[]>('/chat/threads')
        if (res.data && Array.isArray(res.data) && res.data.length > 0) {
          this.threads = res.data.map(t => ({
            ...t,
            messages: t.messages || []
          }))
        } else {
          this.threads = []
        }

        if (!this.activeThreadId && this.threads.length > 0) {
          this.activeThreadId = this.threads[0].id
        } else if (this.threads.length === 0) {
          this.activeThreadId = null
        }

        if (this.activeThreadId) {
          await this.fetchMessages(this.activeThreadId)
        }
      } catch (err: any) {
        console.warn('Gagal memuat daftar obrolan live:', err?.message)
        this.threads = []
        this.activeThreadId = null
      }
    },

    async fetchMessages(threadId: string) {
      try {
        const res = await useApi<ChatMessage[]>(`/chat/threads/${threadId}/messages`)
        if (res.data && Array.isArray(res.data)) {
          const thread = this.threads.find(t => t.id === threadId)
          if (thread) {
            thread.messages = res.data
          }
        }
      } catch (err: any) {
        console.warn(`Gagal memuat pesan thread ${threadId}:`, err?.message)
      }
    },

    async setActiveThread(threadId: string) {
      this.activeThreadId = threadId
      await this.fetchMessages(threadId)
    },

    async markAsRead(threadId: string, role: 'INVESTOR' | 'UMKM') {
      const thread = this.threads.find(t => t.id === threadId)
      if (thread) {
        if (role === 'INVESTOR') {
          thread.unreadInvestor = 0
        } else {
          thread.unreadUmkm = 0
        }
        thread.unreadCount = 0
      }
      try {
        await useApi(`/chat/threads/${threadId}/read`, { method: 'PATCH' })
      } catch (err: any) {
        console.warn('Gagal menandai pesan telah dibaca di API:', err?.message)
      }
    },

    markAllAsRead(role: 'INVESTOR' | 'UMKM' = 'UMKM') {
      this.threads.forEach(t => {
        if (role === 'INVESTOR') {
          t.unreadInvestor = 0
        } else {
          t.unreadUmkm = 0
        }
      })
    },

    async sendMessage(threadId: string, text: string, senderRole: 'INVESTOR' | 'UMKM', attachment?: ChatAttachment) {
      const thread = this.threads.find(t => t.id === threadId)
      if (!thread || (!text.trim() && !attachment)) return

      const now = new Date()
      const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`

      const tempId = `msg-${Date.now()}`
      const newMsg: ChatMessage = {
        id: tempId,
        senderRole,
        senderName: senderRole === 'INVESTOR' ? thread.investorName : thread.umkmOwner.split(' ')[0],
        text: text.trim(),
        timestamp: timeStr,
        attachment
      }

      thread.messages.push(newMsg)
      thread.lastMessage = text.trim() || (attachment ? `Mengirim berkas: ${attachment.title}` : '')
      thread.lastMessageAt = timeStr

      // Tambahkan unread counter ke lawan bicara
      if (senderRole === 'INVESTOR') {
        thread.unreadUmkm = (thread.unreadUmkm || 0) + 1
      } else {
        thread.unreadInvestor = (thread.unreadInvestor || 0) + 1
      }

      try {
        const res = await useApi<ChatMessage>(`/chat/threads/${threadId}/messages`, {
          method: 'POST',
          body: {
            text: text.trim(),
            attachment,
            attachment_type: attachment?.type
          }
        })
        if (res.data) {
          const idx = thread.messages.findIndex(m => m.id === tempId)
          if (idx !== -1) {
            thread.messages[idx] = res.data
          }
        }
      } catch (err: any) {
        console.warn('Gagal mengirim pesan chat ke live API:', err?.message)
      }
    },

    async startOrGetThread(businessId: string, customTitle?: string): Promise<string> {
      const existing = this.threads.find(t => t.umkmId === businessId || t.businessId === businessId)
      if (existing) {
        this.activeThreadId = existing.id
        await this.fetchMessages(existing.id)
        return existing.id
      }

      try {
        const res = await useApi<ChatThread>('/chat/threads', {
          method: 'POST',
          body: {
            businessId,
            initialMessage: 'Halo! Kami melihat profil usaha Anda di katalog Beruang dan tertarik untuk menjalin diskusi terkait kesiapan pendanaan.'
          }
        })
        if (res.data) {
          const newThread: ChatThread = {
            ...res.data,
            messages: res.data.messages || []
          }
          this.threads.unshift(newThread)
          this.activeThreadId = newThread.id
          await this.fetchMessages(newThread.id)
          return newThread.id
        }
      } catch (err: any) {
        console.warn('Gagal membuat thread baru via API:', err?.message)
      }

      // Buat thread baru secara lokal jika offline/gagal
      const newId = `thread-${Date.now()}`
      const newThread: ChatThread = {
        id: newId,
        umkmId: businessId,
        umkmName: customTitle || 'UMKM Binaan Beruang',
        umkmOwner: 'Pengelola Toko',
        umkmSector: 'Sektor Potensial',
        umkmCity: 'Indonesia',
        umkmAvatar: '/images/default-store-banner.jpg',
        umkmHealthScore: 80,
        umkmMargin: 45.0,
        investorId: 'inv-01',
        investorName: 'Fikri Setiawan',
        investorLembaga: 'Nusantara Angel Syndicate',
        investorAvatar: '/images/user-profile.png',
        dealStatus: 'Diskusi Penjajakan Baru',
        ticketDiscussed: 150000000,
        unreadInvestor: 0,
        unreadUmkm: 0,
        lastMessage: 'Percakapan baru dimulai.',
        lastMessageAt: 'Baru saja',
        messages: [
          {
            id: `msg-welcome-${Date.now()}`,
            senderRole: 'INVESTOR',
            senderName: 'Fikri Setiawan',
            text: 'Halo! Kami melihat profil usaha Anda di katalog Beruang dan tertarik untuk menjalin diskusi terkait kesiapan pendanaan.',
            timestamp: 'Baru saja'
          }
        ]
      }

      this.threads.unshift(newThread)
      this.activeThreadId = newId
      return newId
    }
  }
})
