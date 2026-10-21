import { defineStore } from 'pinia'
import { useAuthStore, type UserRole } from './auth'
import { useApi } from '~/composables/useApi'

export type NotificationCategory = 'KONSULTAN' | 'INVESTOR' | 'KESEHATAN' | 'KAS' | 'AKSI'
export type NotificationPriority = 'HIGH' | 'NORMAL'

export interface AppNotification {
  id: string
  title: string
  message: string
  category: NotificationCategory
  priority?: NotificationPriority
  timestamp: string
  date: string
  isRead: boolean
  link: string
  actionLabel?: string
  roleTarget: UserRole | 'ALL'
}

const DEFAULT_NOTIFICATIONS: AppNotification[] = [
  {
    id: 'notif-umkm-1',
    title: 'Catatan Kas Mingguan Tervalidasi',
    message: 'Dra. Maya Suryani (Konsultan Pendamping) telah mengecek laporan pergerakan uang tokomu minggu ini. Saldo kas dinyatakan tervalidasi dan tertib.',
    category: 'KONSULTAN',
    priority: 'HIGH',
    timestamp: '15 menit lalu',
    date: new Date(Date.now() - 15 * 60 * 1000).toISOString(),
    isRead: false,
    link: '/dashboard/progres',
    actionLabel: 'Lihat Catatan Kas',
    roleTarget: 'UMKM'
  },
  {
    id: 'notif-umkm-2',
    title: 'Tawaran Baru: Pengajuan Akses Modal',
    message: 'Nusantara Capital Ventures tertarik dengan profil Kopi Senja Nusantara dan mengajukan pembukaan ruang data untuk penjajakan modal kerja Rp250 Juta.',
    category: 'INVESTOR',
    priority: 'HIGH',
    timestamp: '1 jam lalu',
    date: new Date(Date.now() - 60 * 60 * 1000).toISOString(),
    isRead: false,
    link: '/dashboard/permintaan-investor',
    actionLabel: 'Tinjau Mitra Modal',
    roleTarget: 'UMKM'
  },
  {
    id: 'notif-umkm-3',
    title: 'Kesiapan Modal Tokomu Naik ke 82%',
    message: 'Perkembangan positif! Evaluasi 5 dimensi tokomu kini telah melampaui batas standar kesiapan modal mitra investor.',
    category: 'KESEHATAN',
    priority: 'NORMAL',
    timestamp: '3 jam lalu',
    date: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
    isRead: false,
    link: '/dashboard/penilaian',
    actionLabel: 'Cek Kesiapan Usaha',
    roleTarget: 'UMKM'
  },
  {
    id: 'notif-umkm-4',
    title: 'Tugas Baru pada Rencana Aksi',
    message: 'Konsultan menambahkan panduan: "Standardisasi pencatatan modal jualan biji kopi blend dan single origin di outlet 2".',
    category: 'AKSI',
    priority: 'NORMAL',
    timestamp: 'Kemarin, 16:30',
    date: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    isRead: true,
    link: '/dashboard/rencana-aksi',
    actionLabel: 'Buka Rencana Aksi',
    roleTarget: 'UMKM'
  },
  {
    id: 'notif-umkm-5',
    title: 'Pengingat: Rekap Catatan Kas Harian',
    message: 'Pastikan total uang masuk dan biaya operasional hari ini telah dicatat agar pergerakan uang tokomu tetap transparan dan akurat.',
    category: 'KAS',
    priority: 'NORMAL',
    timestamp: '2 hari lalu',
    date: new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString(),
    isRead: true,
    link: '/dashboard/progres',
    actionLabel: 'Catat Kas Hari Ini',
    roleTarget: 'UMKM'
  },
  {
    id: 'notif-umkm-6',
    title: 'Dokumen Usaha Dicek Konsultan',
    message: 'Konsultan telah memvalidasi kelengkapan NIB dan profil tokomu. Status kelengkapan data dinyatakan tervalidasi.',
    category: 'KONSULTAN',
    priority: 'NORMAL',
    timestamp: '3 hari lalu',
    date: new Date(Date.now() - 72 * 60 * 60 * 1000).toISOString(),
    isRead: true,
    link: '/dashboard/profile',
    actionLabel: 'Lihat Profil Usaha',
    roleTarget: 'UMKM'
  },
  {
    id: 'notif-umkm-7',
    title: 'Biaya Operasional Toko Terjaga Hemat',
    message: 'Rasio pengeluaran operasional bulan ini tercatat hemat 6%, menjaga untung bersih tokomu tetap tumbuh stabil.',
    category: 'KAS',
    priority: 'NORMAL',
    timestamp: '5 hari lalu',
    date: new Date(Date.now() - 120 * 60 * 60 * 1000).toISOString(),
    isRead: true,
    link: '/dashboard/progres',
    actionLabel: 'Lihat Catatan Kas',
    roleTarget: 'UMKM'
  },
  // Notifications for Consultant role
  {
    id: 'notif-kon-1',
    title: 'Klien Mengajukan Pengecekan Kas',
    message: 'Kopi Senja Nusantara baru saja mengirim rekap catatan kas untuk diperiksa kelengkapannya.',
    category: 'KONSULTAN',
    priority: 'HIGH',
    timestamp: '25 menit lalu',
    date: new Date(Date.now() - 25 * 60 * 1000).toISOString(),
    isRead: false,
    link: '/konsultan/validasi',
    actionLabel: 'Validasi Sekarang',
    roleTarget: 'CONSULTANT'
  },
  // Notifications for Investor role
  {
    id: 'notif-inv-1',
    title: 'UMKM Tervalidasi Baru: Kopi Senja',
    message: 'UMKM sektor F&B dengan skor kesiapan modal 82% dan 3 outlet aktif telah siap ditinjau di katalog usaha.',
    category: 'INVESTOR',
    priority: 'NORMAL',
    timestamp: '2 jam lalu',
    date: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    isRead: false,
    link: '/investor',
    actionLabel: 'Tinjau Profil Toko',
    roleTarget: 'INVESTOR'
  }
]

export const useNotificationStore = defineStore('notification', {
  state: () => ({
    notifications: [] as AppNotification[],
    isInitialized: false
  }),

  getters: {
    // Filter notifications relevant to current user role
    roleNotifications(state): AppNotification[] {
      const authStore = useAuthStore()
      const currentRole = authStore.currentUser?.role || 'UMKM'
      return state.notifications.filter(
        n => n.roleTarget === currentRole || n.roleTarget === 'ALL'
      )
    },

    unreadCount(): number {
      return this.roleNotifications.filter(n => !n.isRead).length
    },

    hasUnread(): boolean {
      return this.unreadCount > 0
    }
  },

  actions: {
    initNotifications(forceReset = false) {
      if (this.isInitialized && !forceReset) return
      this.isInitialized = true

      if (import.meta.client && !forceReset) {
        try {
          const saved = localStorage.getItem('beruang_notifications_v2')
          if (saved) {
            const parsed = JSON.parse(saved)
            if (Array.isArray(parsed) && parsed.length > 0) {
              this.notifications = parsed
              return
            }
          }
        } catch (e) {
          console.warn('Gagal membaca notifikasi dari localStorage', e)
        }
      }

      // Default mock if none stored or forced reset
      this.notifications = [...DEFAULT_NOTIFICATIONS]
      this.saveToStorage()
    },

    saveToStorage() {
      if (import.meta.client) {
        try {
          localStorage.setItem('beruang_notifications_v2', JSON.stringify(this.notifications))
        } catch (e) {
          console.warn('Gagal menyimpan notifikasi ke localStorage', e)
        }
      }
    },

    /**
     * GET /api/notifications
     */
    async fetchNotifications() {
      try {
        const res = await useApi<any>('/notifications')
        if (res.data) {
          const list = Array.isArray(res.data) ? res.data : (res.data as any).data || (res.data as any).notifications
          if (Array.isArray(list) && list.length > 0) {
            this.notifications = list
            this.saveToStorage()
          }
        }
      } catch (err: any) {
        console.warn('Gagal memuat notifikasi dari live API:', err?.message)
      }
    },

    async markAsRead(id: string) {
      const item = this.notifications.find(n => n.id === id)
      if (item && !item.isRead) {
        item.isRead = true
        this.saveToStorage()
      }
      try {
        await useApi(`/notifications/${id}/read`, { method: 'PATCH' })
      } catch (err: any) {
        console.warn('Gagal tandai notifikasi dibaca di live API:', err?.message)
      }
    },

    async markAllAsRead() {
      const authStore = useAuthStore()
      const currentRole = authStore.currentUser?.role || 'UMKM'
      this.notifications.forEach(n => {
        if (n.roleTarget === currentRole || n.roleTarget === 'ALL') {
          n.isRead = true
        }
      })
      this.saveToStorage()

      try {
        await useApi('/notifications/mark-all-read', { method: 'PATCH' })
      } catch (err: any) {
        console.warn('Gagal tandai semua dibaca di live API:', err?.message)
      }
    },

    async deleteNotification(id: string) {
      this.notifications = this.notifications.filter(n => n.id !== id)
      this.saveToStorage()

      try {
        await useApi(`/notifications/${id}`, { method: 'DELETE' })
      } catch (err: any) {
        console.warn('Gagal hapus notifikasi di live API:', err?.message)
      }
    },

    clearAllRoleNotifications() {
      const authStore = useAuthStore()
      const currentRole = authStore.currentUser?.role || 'UMKM'
      this.notifications = this.notifications.filter(
        n => n.roleTarget !== currentRole && n.roleTarget !== 'ALL'
      )
      this.saveToStorage()
    },

    resetToDefault() {
      this.notifications = [...DEFAULT_NOTIFICATIONS]
      this.saveToStorage()
    }
  }
})
