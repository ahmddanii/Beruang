import { defineStore } from 'pinia'
import type {
  User,
  BusinessProfile,
  ConsultantProfile,
  InvestorProfile,
  RegisterPayload,
  UserRole,
  UserStatus
} from '~/types/database'

export type { UserRole, UserStatus }

export interface UserProfile {
  // Field persis tabel public.users
  id: number | string
  name: string
  email: string
  role: UserRole
  avatar?: string | null
  phone?: string | null
  org_name?: string | null
  status?: UserStatus | string
  email_verified_at?: string | null
  otp_code?: string | null
  otp_expires_at?: string | null

  // Helper & legacy alias untuk kompatibilitas UI
  businessName?: string // alias org_name / brand / firm_name
  verified?: boolean
  sector?: string
  city?: string
  bnspLicense?: string
  specialization?: string
  institution?: string
  investorType?: string
  ticketRange?: string
  onboardingCompleted?: boolean

  // Relasi model skema PostgreSQL
  businessProfile?: BusinessProfile | null
  consultantProfile?: ConsultantProfile | null
  investorProfile?: InvestorProfile | null
}

export const useAuthStore = defineStore('auth', {
  state: () => ({
    currentUser: {
      id: 1,
      name: 'Fikri Setiawan',
      email: 'fikri@kopisenja.id',
      role: 'UMKM' as UserRole,
      avatar: '/images/user-profile.png',
      phone: '+62 812-3456-7890',
      org_name: 'Kopi Senja Nusantara',
      status: 'active',
      businessName: 'Kopi Senja Nusantara',
      verified: true,
      sector: 'Kuliner (F&B)',
      city: 'Bandung',
      onboardingCompleted: true,
      businessProfile: {
        id: 'bp-01',
        user_id: 1,
        brand: 'Kopi Senja Nusantara',
        owner_name: 'Fikri Setiawan',
        owner_avatar_url: '/images/user-profile.png',
        sector: 'Kuliner & Minuman (F&B)',
        city: 'Bandung, Jawa Barat',
        established_year: 2021,
        outlets_count: 3,
        employees_count: 14,
        funding_target: 250000000,
        pitch_summary: 'Spesialis kopi arabika susu gula aren dengan 3 outlet aktif di Bandung & margin kotor stabil di atas 48%. Menargetkan ekspansi 2 gerai cloud kitchen dan standardisasi roastery terpusat.',
        description: 'Spesialis kopi arabika susu gula aren dengan 3 outlet aktif di Bandung & margin kotor stabil di atas 48%. Menargetkan ekspansi 2 gerai cloud kitchen dan standardisasi roastery terpusat.',
        logo_url: '/logo.svg',
        banner_url: '/images/default-store-banner.jpg',
        nib: '1209000123456',
        npwp: '81.423.891.4-429.000',
        status: 'READY_FOR_FUNDING',
        certified_at: '2026-09-18'
      }
    } as UserProfile | null,
    isAuthenticated: true,
    token: 'mock-jwt-token-beruang-2026'
  }),

  actions: {
    setRole(role: UserRole) {
      if (!this.currentUser) return
      this.currentUser.role = role

      if (role === 'UMKM') {
        this.currentUser.id = 1
        this.currentUser.name = 'Fikri Setiawan'
        this.currentUser.email = 'fikri@kopisenja.id'
        this.currentUser.phone = '+62 812-3456-7890'
        this.currentUser.org_name = 'Kopi Senja Nusantara'
        this.currentUser.businessName = 'Kopi Senja Nusantara'
        this.currentUser.sector = 'Kuliner (F&B)'
        this.currentUser.city = 'Bandung'
        this.currentUser.status = 'active'
        this.currentUser.businessProfile = {
          id: 'bp-01',
          user_id: 1,
          brand: 'Kopi Senja Nusantara',
          owner_name: 'Fikri Setiawan',
          sector: 'Kuliner & Minuman (F&B)',
          city: 'Bandung, Jawa Barat',
          established_year: 2021,
          outlets_count: 3,
          employees_count: 14,
          funding_target: 250000000,
          status: 'READY_FOR_FUNDING'
        }
      } else if (role === 'CONSULTANT') {
        this.currentUser.id = 2
        this.currentUser.name = 'Dra. Maya Suryani, M.M.'
        this.currentUser.email = 'maya.suryani@beruang.id'
        this.currentUser.phone = '+62 819-8765-4321'
        this.currentUser.org_name = 'Maya Advisory Partner'
        this.currentUser.businessName = 'Maya Advisory Partner'
        this.currentUser.institution = 'Maya Advisory Partner'
        this.currentUser.bnspLicense = 'BNSP-KONS-2024-8891'
        this.currentUser.specialization = 'Keuangan & Biaya'
        this.currentUser.city = 'Jakarta Selatan'
        this.currentUser.status = 'active'
        this.currentUser.consultantProfile = {
          id: 'cp-01',
          user_id: 2,
          firm_name: 'Maya Advisory Partner',
          specialization: 'Keuangan & Biaya',
          is_certified: true,
          active_clients_count: 12
        }
      } else if (role === 'INVESTOR') {
        this.currentUser.id = 3
        this.currentUser.name = 'Hendro Wicaksono'
        this.currentUser.email = 'hendro@nusantaraventures.com'
        this.currentUser.phone = '+62 811-2233-4455'
        this.currentUser.org_name = 'Nusantara Angel Syndicate'
        this.currentUser.businessName = 'Nusantara Angel Syndicate'
        this.currentUser.investorType = 'Kelompok Modal'
        this.currentUser.ticketRange = '150 - 500 Juta'
        this.currentUser.city = 'Jakarta Pusat'
        this.currentUser.status = 'active'
        this.currentUser.investorProfile = {
          id: 'ip-01',
          user_id: 3,
          firm_name: 'Nusantara Angel Syndicate',
          commitment_capital: '150 - 500 Juta',
          is_verified: true
        }
      } else if (role === 'ADMIN') {
        this.currentUser.id = 99
        this.currentUser.name = 'Super Admin Beruang'
        this.currentUser.email = 'admin@beruang.id'
        this.currentUser.org_name = 'Operasional Beruang'
        this.currentUser.businessName = 'Operasional Beruang'
        this.currentUser.status = 'active'
      }
    },

    /**
     * Pendaftaran Pengguna Baru sesuai skema database PostgreSQL
     * Menyiapkan record public.users dan profil entitas terkait.
     */
    register(payload: RegisterPayload) {
      this.isAuthenticated = true
      this.token = `jwt-token-${Date.now()}`

      const newUserId = Date.now()

      this.currentUser = {
        id: newUserId,
        name: payload.name.trim(),
        email: payload.email.trim().toLowerCase(),
        phone: payload.phone.trim(),
        role: payload.role,
        org_name: payload.org_name.trim(),
        status: 'active',
        onboardingCompleted: false,

        // Alias & atribut UI
        businessName: payload.org_name.trim(),
        sector: payload.sector,
        city: payload.city,
        specialization: payload.specialization,
        institution: payload.org_name.trim(),
        bnspLicense: payload.bnsp_license,
        ticketRange: payload.commitment_capital,
        investorType: payload.investor_type,
        avatar: '/images/user-profile.png',
        otp_code: payload.otp_code || '1234'
      }

      // Inisialisasi entitas profil awal
      if (payload.role === 'UMKM') {
        this.currentUser.businessProfile = {
          id: `bp-${newUserId}`,
          user_id: newUserId,
          brand: payload.org_name.trim(),
          owner_name: payload.name.trim(),
          sector: payload.sector || 'Makanan & Minuman',
          city: payload.city || 'Bandung',
          outlets_count: 1,
          employees_count: 1,
          funding_target: 0,
          status: 'PROFILE_INCOMPLETE'
        }
      } else if (payload.role === 'CONSULTANT') {
        this.currentUser.consultantProfile = {
          id: `cp-${newUserId}`,
          user_id: newUserId,
          firm_name: payload.org_name.trim(),
          specialization: payload.specialization || 'Keuangan & Biaya',
          is_certified: true,
          active_clients_count: 0
        }
      } else if (payload.role === 'INVESTOR') {
        this.currentUser.investorProfile = {
          id: `ip-${newUserId}`,
          user_id: newUserId,
          firm_name: payload.org_name.trim(),
          commitment_capital: payload.commitment_capital || '150 - 500 Juta',
          is_verified: true
        }
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

        // Sinkronkan ke businessProfile jika role UMKM
        if (this.currentUser.role === 'UMKM' && this.currentUser.businessProfile) {
          if (data.name) this.currentUser.businessProfile.owner_name = data.name
          if (data.businessName || data.org_name) {
            this.currentUser.businessProfile.brand = data.businessName || data.org_name || ''
          }
          if (data.sector) this.currentUser.businessProfile.sector = data.sector
          if (data.city) this.currentUser.businessProfile.city = data.city
        }

        // Sinkronkan ke consultantProfile jika role CONSULTANT
        if (this.currentUser.role === 'CONSULTANT' && this.currentUser.consultantProfile) {
          if (data.businessName || data.org_name || data.institution) {
            this.currentUser.consultantProfile.firm_name = data.businessName || data.org_name || data.institution || ''
          }
          if (data.specialization) this.currentUser.consultantProfile.specialization = data.specialization
        }

        // Sinkronkan ke investorProfile jika role INVESTOR
        if (this.currentUser.role === 'INVESTOR' && this.currentUser.investorProfile) {
          if (data.businessName || data.org_name) {
            this.currentUser.investorProfile.firm_name = data.businessName || data.org_name || ''
          }
          if (data.ticketRange) this.currentUser.investorProfile.commitment_capital = data.ticketRange
        }
      }
    },

    logout() {
      this.isAuthenticated = false
      this.token = ''
    },

    updateAvatar(avatarUrl: string) {
      if (this.currentUser) {
        this.currentUser.avatar = avatarUrl
        if (this.currentUser.businessProfile) {
          this.currentUser.businessProfile.owner_avatar_url = avatarUrl
        }
      }
    }
  }
})
