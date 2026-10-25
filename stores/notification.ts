import { defineStore } from 'pinia'
import { useAuthStore, type UserRole } from './auth'
import { useApi } from '~/composables/useApi'

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

function getNotificationStorageKey(): string {
  if (typeof window === 'undefined') return 'beruang_notifications_guest'
  try {
    const authStore = useAuthStore()
    if (authStore.currentUser?.id) {
      return `beruang_notifications_${authStore.currentUser.id}`
    }
  } catch {
    // ignore
  }
  return 'beruang_notifications_guest'
}

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
          const saved = localStorage.getItem(getNotificationStorageKey())
          const parsed = saved ? JSON.parse(saved) : null
          this.notifications = Array.isArray(parsed) ? parsed : []
        } catch (e) {
          console.warn('Gagal membaca notifikasi dari localStorage', e)
        }
      } else {
        this.notifications = []
      }
      this.fetchNotifications()
    },

    saveToStorage() {
      if (import.meta.client) {
        try {
          const storageKey = getNotificationStorageKey()
          localStorage.setItem(storageKey, JSON.stringify(this.notifications))
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
        if (res?.data !== undefined) {
          const list = Array.isArray(res.data) ? res.data : (res.data as any).data || (res.data as any).notifications
          if (Array.isArray(list)) {
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
      this.notifications = []
      this.saveToStorage()
      this.fetchNotifications()
    }
  }
})
