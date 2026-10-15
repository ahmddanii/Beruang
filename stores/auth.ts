import { defineStore } from 'pinia'

export type UserRole = 'UMKM' | 'CONSULTANT' | 'INVESTOR' | 'ADMIN'

export interface UserProfile {
  id: string
  name: string
  email: string
  role: UserRole
  avatar?: string
  businessName?: string
  phone?: string
  verified?: boolean
  sector?: string
  city?: string
  bnspLicense?: string
  specialization?: string
  institution?: string
  investorType?: string
  ticketRange?: string
  onboardingCompleted?: boolean
}

export const useAuthStore = defineStore('auth', {
  state: () => ({
    currentUser: {
      id: 'usr-1',
      name: 'Fikri Setiawan',
      email: 'fikri@kopisenja.id',
      role: 'UMKM' as UserRole,
      avatar: '/images/user-profile.png',
      businessName: 'Kopi Senja Nusantara',
      phone: '081234567890',
      verified: true,
      sector: 'Kuliner (F&B)',
      city: 'Bandung',
      onboardingCompleted: true
    } as UserProfile | null,
    isAuthenticated: true,
    token: 'mock-jwt-token-beruang-2026'
  }),

  actions: {
    setRole(role: UserRole) {
      if (!this.currentUser) return
      this.currentUser.role = role
      if (role === 'UMKM') {
        this.currentUser.name = 'Fikri Setiawan'
        this.currentUser.email = 'fikri@kopisenja.id'
        this.currentUser.businessName = 'Kopi Senja Nusantara'
        this.currentUser.sector = 'Kuliner (F&B)'
        this.currentUser.city = 'Bandung'
      } else if (role === 'CONSULTANT') {
        this.currentUser.name = 'Dra. Maya Suryani, M.M.'
        this.currentUser.email = 'maya.suryani@beruang.id'
        this.currentUser.businessName = 'Senior Business Consultant'
        this.currentUser.institution = 'Maya Advisory Partner'
        this.currentUser.bnspLicense = 'BNSP-KONS-2024-8891'
        this.currentUser.specialization = 'Keuangan & HPP'
        this.currentUser.city = 'Jakarta Selatan'
      } else if (role === 'INVESTOR') {
        this.currentUser.name = 'Hendro Wicaksono'
        this.currentUser.email = 'hendro@nusantaraventures.com'
        this.currentUser.businessName = 'Nusantara Angel Syndicate'
        this.currentUser.investorType = 'Sindikasi Investasi'
        this.currentUser.ticketRange = 'Rp 150 Jt - Rp 500 Jt'
        this.currentUser.city = 'Jakarta Pusat'
      } else if (role === 'ADMIN') {
        this.currentUser.name = 'Super Admin Beruang'
        this.currentUser.email = 'admin@beruang.id'
        this.currentUser.businessName = 'Operations Team'
      }
    },

    login(email: string, role: UserRole = 'UMKM') {
      this.isAuthenticated = true
      this.setRole(role)
      if (this.currentUser) {
        this.currentUser.email = email
      }
    },

    updateProfile(data: Partial<UserProfile>) {
      if (this.currentUser) {
        this.currentUser = { ...this.currentUser, ...data }
      }
    },

    logout() {
      this.isAuthenticated = false
      this.token = ''
    },

    updateAvatar(avatarUrl: string) {
      if (this.currentUser) {
        this.currentUser.avatar = avatarUrl
      }
    }
  }
})
