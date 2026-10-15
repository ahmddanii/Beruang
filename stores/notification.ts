import { defineStore } from 'pinia'
import { useAuthStore, type UserRole } from './auth'

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
    title: 'Catatan Kas Mingguan Disetujui! ☕',
    message: 'Dra. Maya Suryani (Konsultan) telah memvalidasi laporan kas minggu ini. Arus kas bersih tokomu dinyatakan sehat tanpa selisih.',
    category: 'KONSULTAN',
    priority: 'HIGH',
    timestamp: '15 menit lalu',
    date: new Date(Date.now() - 15 * 60 * 1000).toISOString(),
    isRead: false,
    link: '/dashboard/progres',
    actionLabel: 'Cek Mutasi Kas',
    roleTarget: 'UMKM'
  },
  {
    id: 'notif-umkm-2',
    title: 'Minat Masuk: Akses Data Room 🤝',
    message: 'Nusantara Capital Ventures tertarik dengan profil Kopi Senja Nusantara dan mengajukan pembukaan Data Room untuk rencana modal Rp250 Juta.',
    category: 'INVESTOR',
    priority: 'HIGH',
    timestamp: '1 jam lalu',
    date: new Date(Date.now() - 60 * 60 * 1000).toISOString(),
    isRead: false,
    link: '/dashboard/permintaan-investor',
    actionLabel: 'Tinjau Investor',
    roleTarget: 'UMKM'
  },
  {
    id: 'notif-umkm-3',
    title: 'Skor Kesiapan Naik ke 82%! 🚀',
    message: 'Bagus banget! Skor diagnostik 5 dimensi tokomu kini menembus ambang batas siap modal (Ready for Funding). Yok bisa yok!',
    category: 'KESEHATAN',
    priority: 'NORMAL',
    timestamp: '3 jam lalu',
    date: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
    isRead: false,
    link: '/dashboard/penilaian',
    actionLabel: 'Lihat Radar Diagnostik',
    roleTarget: 'UMKM'
  },
  {
    id: 'notif-umkm-4',
    title: '1 Tugas Rencana Aksi Ditugaskan 📋',
    message: 'Konsultan menambahkan panduan: "Standardisasi pencatatan HPP biji kopi blend vs single origin di outlet 2".',
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
    title: 'Pengingat: Tutup Buku Kas Harian 🪙',
    message: 'Sudah selesai operasional hari ini? Yuk catat omzet dan pengeluaran agar arus kas tokomu terlindungi dan tercatat rapi.',
    category: 'KAS',
    priority: 'NORMAL',
    timestamp: '2 hari lalu',
    date: new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString(),
    isRead: true,
    link: '/dashboard/progres',
    actionLabel: 'Catat Kas Hari Ini',
    roleTarget: 'UMKM'
  },
  // Notifications for Consultant role
  {
    id: 'notif-kon-1',
    title: 'Klien Baru Mengajukan Validasi Kas',
    message: 'Kopi Senja Nusantara baru saja mengirim rekap kas minggu ke-2 Oktober untuk diverifikasi.',
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
    title: 'UMKM Terkurasi Baru: Kopi Senja',
    message: 'UMKM sektor F&B dengan skor kesiapan 82% dan 3 outlet aktif telah siap ditinjau di katalog.',
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
    initNotifications() {
      if (this.isInitialized) return
      this.isInitialized = true

      if (import.meta.client) {
        try {
          const saved = localStorage.getItem('beruang_notifications_v1')
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

      // Default mock if none stored
      this.notifications = [...DEFAULT_NOTIFICATIONS]
      this.saveToStorage()
    },

    saveToStorage() {
      if (import.meta.client) {
        try {
          localStorage.setItem('beruang_notifications_v1', JSON.stringify(this.notifications))
        } catch (e) {
          console.warn('Gagal menyimpan notifikasi ke localStorage', e)
        }
      }
    },

    markAsRead(id: string) {
      const item = this.notifications.find(n => n.id === id)
      if (item && !item.isRead) {
        item.isRead = true
        this.saveToStorage()
      }
    },

    markAllAsRead() {
      const authStore = useAuthStore()
      const currentRole = authStore.currentUser?.role || 'UMKM'
      this.notifications.forEach(n => {
        if (n.roleTarget === currentRole || n.roleTarget === 'ALL') {
          n.isRead = true
        }
      })
      this.saveToStorage()
    },

    deleteNotification(id: string) {
      this.notifications = this.notifications.filter(n => n.id !== id)
      this.saveToStorage()
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
