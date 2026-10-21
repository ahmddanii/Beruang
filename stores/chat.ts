import { defineStore } from 'pinia'
import { useApi } from '~/composables/useApi'

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
  lastMessageAt: string
  messages: ChatMessage[]
}

export const useChatStore = defineStore('chat', {
  state: () => ({
    activeThreadId: 'thread-01' as string | null,
    searchQuery: '',
    threads: [
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
        investorName: 'Fikri Setiawan',
        investorLembaga: 'Nusantara Angel Syndicate',
        investorAvatar: '/images/user-profile.png',
        dealStatus: 'Tahap Due Diligence Kas',
        ticketDiscussed: 250000000,
        unreadInvestor: 0,
        unreadUmkm: 1,
        lastMessage: 'Tentu Pak Fikri, izin akses ruang data sudah kami setujui.',
        lastMessageAt: '10:24',
        messages: [
          {
            id: 'm-01',
            senderRole: 'INVESTOR',
            senderName: 'Fikri Setiawan',
            text: 'Halo Mbak Dian, salam kenal. Kami dari Nusantara Angel Syndicate telah meninjau profil Kopi Senja di katalog Beruang. Pertumbuhan margin kotor 48.5% dengan 3 gerai di Bandung sangat menarik perhatian komite kami.',
            timestamp: '09:45'
          },
          {
            id: 'm-02',
            senderRole: 'UMKM',
            senderName: 'Dian Sasmita',
            text: 'Halo Pak Fikri, salam kenal kembali! Terima kasih banyak atas apresiasi dan ketertarikannya pada Kopi Senja. Kami memang sedang membuka penjajakan modal Rp 250 Juta untuk ekspansi 2 gerai baru di kawasan Buah Batu dan Dago.',
            timestamp: '09:58',
            attachment: {
              type: 'METRIC',
              title: 'Proposal Tiket Modal Kerja',
              subtitle: 'Kopi Senja Nusantara • Skema Bagi Hasil 14% p.a.',
              value: 'Rp 250.000.000'
            }
          },
          {
            id: 'm-03',
            senderRole: 'INVESTOR',
            senderName: 'Fikri Setiawan',
            text: 'Bagus sekali. Kami ingin memastikan data rekonsiliasi kasir harian dan mutasi bank selama 5 bulan terakhir. Apakah sudah terlampir lengkap di Virtual Data Room?',
            timestamp: '10:15'
          },
          {
            id: 'm-04',
            senderRole: 'UMKM',
            senderName: 'Dian Sasmita',
            text: 'Tentu Pak Fikri, izin akses ruang data sudah kami setujui. Seluruh mutasi kasir dan nota supplier sudah tervalidasi langsung oleh konsultan pendamping kami (Dra. Maya Suryani). Silakan ditinjau langsung.',
            timestamp: '10:24'
          }
        ]
      },
      {
        id: 'thread-02',
        umkmId: 'umkm-03',
        umkmName: 'Sambal Bu Rudy Asli',
        umkmOwner: 'Tim Manajemen Bu Rudy',
        umkmSector: 'F&B (Oleh-oleh & FMCG)',
        umkmCity: 'Surabaya',
        umkmAvatar: '/images/default-store-banner.jpg',
        umkmHealthScore: 88,
        umkmMargin: 52.0,
        investorId: 'inv-01',
        investorName: 'Fikri Setiawan',
        investorLembaga: 'Nusantara Angel Syndicate',
        investorAvatar: '/images/user-profile.png',
        dealStatus: 'Penjajakan Awal',
        ticketDiscussed: 500000000,
        unreadInvestor: 1,
        unreadUmkm: 0,
        lastMessage: 'Kapasitas produksi saat ini sudah 1.500 botol/hari, siap diskalakan.',
        lastMessageAt: 'Kemarin',
        messages: [
          {
            id: 'm-21',
            senderRole: 'INVESTOR',
            senderName: 'Fikri Setiawan',
            text: 'Selamat siang Bu Rudy dan tim, kami memantau distribusi produk sambal sudah menembus 120 toko ritel di Jatim. Berapa kapasitas produksi harian saat ini?',
            timestamp: 'Kemarin 14:10'
          },
          {
            id: 'm-22',
            senderRole: 'UMKM',
            senderName: 'Tim Manajemen Bu Rudy',
            text: 'Selamat siang Pak Fikri! Kapasitas produksi saat ini sudah 1.500 botol/hari, siap diskalakan dengan pengadaan mesin filling otomatis dari pendanaan tahap ini.',
            timestamp: 'Kemarin 14:35',
            attachment: {
              type: 'METRIC',
              title: 'Target Alokasi Modal Mesin',
              subtitle: 'Peningkatan kapasitas 3x lipat ke 4.500 botol/hari',
              value: 'Rp 500.000.000'
            }
          }
        ]
      },
      {
        id: 'thread-03',
        umkmId: 'umkm-05',
        umkmName: 'Keripik Tempe Marem',
        umkmOwner: 'Sigit Purnomo (Owner)',
        umkmSector: 'Agroindustri Camilan',
        umkmCity: 'Malang',
        umkmAvatar: '/images/default-store-banner.jpg',
        umkmHealthScore: 76,
        umkmMargin: 41.0,
        investorId: 'inv-01',
        investorName: 'Fikri Setiawan',
        investorLembaga: 'Nusantara Angel Syndicate',
        investorAvatar: '/images/user-profile.png',
        dealStatus: 'Permintaan Akses Masuk',
        ticketDiscussed: 175000000,
        unreadInvestor: 0,
        unreadUmkm: 0,
        lastMessage: 'Permintaan akses ruang data Anda telah kami terima.',
        lastMessageAt: '12 Okt',
        messages: [
          {
            id: 'm-31',
            senderRole: 'INVESTOR',
            senderName: 'Fikri Setiawan',
            text: 'Halo Mas Sigit, kami tertarik meninjau laporan pembukuan Keripik Tempe Marem untuk kemitraan ritel modern.',
            timestamp: '12 Okt 11:20'
          },
          {
            id: 'm-32',
            senderRole: 'UMKM',
            senderName: 'Sigit Purnomo',
            text: 'Halo Pak Fikri, terima kasih! Permintaan akses ruang data Anda telah kami terima dan sedang ditinjau konsultan kami.',
            timestamp: '12 Okt 11:45'
          }
        ]
      }
    ] as ChatThread[]
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
        t.umkmName.toLowerCase().includes(q) ||
        t.umkmCity.toLowerCase().includes(q) ||
        t.umkmSector.toLowerCase().includes(q) ||
        t.lastMessage.toLowerCase().includes(q)
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
          if (!this.activeThreadId && this.threads.length > 0) {
            this.activeThreadId = this.threads[0].id
          }
          if (this.activeThreadId) {
            await this.fetchMessages(this.activeThreadId)
          }
        }
      } catch (err: any) {
        console.warn('Gagal memuat daftar obrolan live:', err?.message)
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

    async sendMessage(threadId: string, text: string, senderRole: 'INVESTOR' | 'UMKM', attachment?: ChatAttachment) {
      const thread = this.threads.find(t => t.id === threadId)
      if (!thread || !text.trim()) return

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
      thread.lastMessage = text.trim()
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
