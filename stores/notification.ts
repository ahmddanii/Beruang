import { defineStore } from 'pinia'
import { useAuthStore, type UserRole } from './auth'

export type NotificationCategory = 'KONSULTAN' | 'INVESTOR' | 'KESEHATAN' | 'KAS' | 'AKSI'
export type NotificationPriority = 'HIGH' | 'NORMAL'
export type NotificationVisualType = 'avatar' | 'verified' | 'shield' | 'growth' | 'deal' | 'wallet'

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
  avatar?: string
  badgeCount?: number
  iconType?: NotificationVisualType
  senderName?: string
  actionDetail?: string
  quoteSnippet?: string
  sectionGroup?: 'today' | 'yesterday'
}

const DEFAULT_NOTIFICATIONS: AppNotification[] = [
  {
    id: 'notif-umkm-1',
    title: 'Pesanan Baru ID: MSLES880',
    senderName: 'Mitra Outlet 2 Bandung',
    actionDetail: 'membuat pesanan pasokan kopi baru di Catatan Kas',
    quoteSnippet: '"Pesanan pasokan kopi dari outlet 2 senilai Rp3.450.000 telah masuk dan siap diproses."',
    message: 'Pesanan pasokan kopi dari mitra outlet 2 senilai Rp3.450.000 telah masuk dan siap diproses.',
    category: 'KAS',
    priority: 'HIGH',
    timestamp: '15 menit lalu',
    date: new Date(Date.now() - 15 * 60 * 1000).toISOString(),
    isRead: false,
    link: '/dashboard/progres',
    actionLabel: 'Lihat Kas',
    roleTarget: 'UMKM',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&h=120&fit=crop&crop=faces',
    badgeCount: 2,
    iconType: 'avatar',
    sectionGroup: 'today'
  },
  {
    id: 'notif-umkm-2',
    title: 'Tawaran Baru: Pengajuan Akses Modal',
    senderName: 'Nusantara Capital Ventures',
    actionDetail: 'mengajukan pembukaan ruang data untuk Akses Modal Rp250 Juta',
    quoteSnippet: '"Tertarik dengan rasio untung bersih dan kesiapan modal 82% Kopi Senja Nusantara."',
    message: 'Nusantara Capital Ventures tertarik dengan profil Kopi Senja dan mengajukan pembukaan ruang data modal Rp250 Juta.',
    category: 'INVESTOR',
    priority: 'HIGH',
    timestamp: '1 jam lalu',
    date: new Date(Date.now() - 60 * 60 * 1000).toISOString(),
    isRead: false,
    link: '/dashboard/permintaan-investor',
    actionLabel: 'Tinjau Modal',
    roleTarget: 'UMKM',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=120&h=120&fit=crop&crop=faces',
    iconType: 'deal',
    sectionGroup: 'today'
  },
  {
    id: 'notif-umkm-3',
    title: 'Catatan Kas Berhasil Tervalidasi',
    senderName: 'Dra. Maya Suryani (Konsultan Pendamping)',
    actionDetail: 'telah menyelesaikan pengecekan mingguan di Pergerakan Uang Toko',
    quoteSnippet: '"Laporan pergerakan uang toko telah diverifikasi tanpa selisih. Status tervalidasi sah."',
    message: 'Laporan pergerakan uang toko telah selesai diverifikasi konsultan tanpa selisih. Status validasi tervalidasi.',
    category: 'KONSULTAN',
    priority: 'HIGH',
    timestamp: '2 jam lalu',
    date: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    isRead: false,
    link: '/dashboard/progres',
    actionLabel: 'Lihat Kas',
    roleTarget: 'UMKM',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=120&h=120&fit=crop&crop=faces',
    iconType: 'verified',
    sectionGroup: 'today'
  },
  {
    id: 'notif-umkm-4',
    title: 'Kata Sandi & Keamanan Berhasil Diperbarui',
    senderName: 'Sistem Keamanan Toko',
    actionDetail: 'telah memperbarui otentikasi login dan PIN kasir',
    quoteSnippet: '"Kredensial keamanan akun tokomu telah diperbarui dan aktif terlindungi."',
    message: 'Kredensial keamanan akun dan PIN otentikasi tokomu telah berhasil diperbarui dan aktif.',
    category: 'AKSI',
    priority: 'NORMAL',
    timestamp: '3 jam lalu',
    date: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
    isRead: true,
    link: '/dashboard/pengaturan',
    actionLabel: 'Keamanan',
    roleTarget: 'UMKM',
    iconType: 'shield',
    sectionGroup: 'today'
  },
  {
    id: 'notif-umkm-5',
    title: 'Pesanan Baru ID: MSLES882',
    senderName: 'CV Berkah Kemasan Ramah Lingkungan',
    actionDetail: 'menyelesaikan konfirmasi pesanan pasokan kemasan di outlet 1',
    quoteSnippet: '"Pesanan pasokan kemasan senilai Rp5.200.000 telah masuk ke pengiriman kurir mitra."',
    message: 'Pesanan pasokan kemasan ramah lingkungan dari mitra F&B senilai Rp5.200.000 siap dikirim.',
    category: 'KAS',
    priority: 'NORMAL',
    timestamp: 'Kemarin, 20:30 WIB',
    date: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    isRead: true,
    link: '/dashboard/progres',
    actionLabel: 'Lihat Pesanan',
    roleTarget: 'UMKM',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&h=120&fit=crop&crop=faces',
    badgeCount: 4,
    iconType: 'avatar',
    sectionGroup: 'yesterday'
  },
  {
    id: 'notif-umkm-6',
    title: 'Kesiapan Modal Tokomu Naik ke 82%',
    senderName: 'Tim Asesmen Finansial Beruang',
    actionDetail: 'telah memperbarui skor evaluasi 5 dimensi Kesiapan Modal Toko',
    quoteSnippet: '"Akumulasi total uang masuk naik 3.8% dan rasio modal jualan terkendali prima."',
    message: 'Akumulasi total uang masuk tokomu naik 3.8% dibandingkan periode sebelumnya, untung bersih terjaga sehat.',
    category: 'KESEHATAN',
    priority: 'NORMAL',
    timestamp: 'Kemarin, 18:34 WIB',
    date: new Date(Date.now() - 26 * 60 * 60 * 1000).toISOString(),
    isRead: true,
    link: '/dashboard/penilaian',
    actionLabel: 'Cek Kesiapan',
    roleTarget: 'UMKM',
    iconType: 'growth',
    sectionGroup: 'yesterday'
  },
  {
    id: 'notif-umkm-7',
    title: 'Biaya Operasional Toko Terjaga Hemat',
    senderName: 'Laporan Rekonsiliasi Kas Bulanan',
    actionDetail: 'mencatat efisiensi biaya operasional hemat 6% di Laporan Bulanan',
    quoteSnippet: '"Rasio pengeluaran operasional bulan ini tercatat hemat 6%, menjaga untung bersih stabil."',
    message: 'Rasio pengeluaran operasional bulan ini tercatat hemat 6%, menjaga untung bersih tokomu tetap tumbuh stabil.',
    category: 'KAS',
    priority: 'NORMAL',
    timestamp: '3 hari lalu',
    date: new Date(Date.now() - 72 * 60 * 60 * 1000).toISOString(),
    isRead: true,
    link: '/dashboard/progres',
    actionLabel: 'Lihat Kas',
    roleTarget: 'UMKM',
    iconType: 'wallet',
    sectionGroup: 'yesterday'
  },
  // Notifications for Consultant role
  {
    id: 'notif-kon-1',
    title: 'Klien Mengajukan Pengecekan Kas',
    senderName: 'Kopi Senja Nusantara (Klien)',
    actionDetail: 'mengirimkan rekap catatan kas harian untuk divalidasi',
    quoteSnippet: '"Rekap kas mingguan outlet 1 dan outlet 2 siap diverifikasi konsultan."',
    message: 'Kopi Senja Nusantara baru saja mengirim rekap catatan kas untuk diperiksa kelengkapannya.',
    category: 'KONSULTAN',
    priority: 'HIGH',
    timestamp: '25 menit lalu',
    date: new Date(Date.now() - 25 * 60 * 1000).toISOString(),
    isRead: false,
    link: '/konsultan/validasi',
    actionLabel: 'Validasi Sekarang',
    roleTarget: 'CONSULTANT',
    iconType: 'verified',
    sectionGroup: 'today'
  },
  // Notifications for Investor role
  {
    id: 'notif-inv-1',
    title: 'UMKM Tervalidasi Baru: Kopi Senja',
    senderName: 'Kurasi UMKM Siap Didanai',
    actionDetail: 'mempublikasikan profil UMKM tervalidasi baru di Katalog Usaha',
    quoteSnippet: '"UMKM sektor F&B dengan skor kesiapan modal 82% dan 3 outlet aktif telah siap ditinjau."',
    message: 'UMKM sektor F&B dengan skor kesiapan modal 82% dan 3 outlet aktif telah siap ditinjau di katalog usaha.',
    category: 'INVESTOR',
    priority: 'NORMAL',
    timestamp: '2 jam lalu',
    date: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    isRead: false,
    link: '/investor',
    actionLabel: 'Tinjau Profil Toko',
    roleTarget: 'INVESTOR',
    iconType: 'deal',
    sectionGroup: 'today'
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
          const saved = localStorage.getItem('beruang_notifications_v4')
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
          localStorage.setItem('beruang_notifications_v4', JSON.stringify(this.notifications))
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
