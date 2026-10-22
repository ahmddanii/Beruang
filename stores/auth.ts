import { defineStore } from 'pinia'
import { useApi } from '~/composables/useApi'

export type UserRole = 'UMKM' | 'CONSULTANT' | 'INVESTOR' | 'ADMIN'

export interface BusinessProfileEntity {
  id?: string
  user_id?: number
  brand?: string
  owner_name?: string
  sector?: string
  city?: string
  established_year?: number
  outlets_count?: number
  employees_count?: number
  funding_target?: number | null
  nib?: string
  npwp?: string
  equity_offered?: string
  description?: string
  status?: string
  [key: string]: any
}

export interface ConsultantProfileEntity {
  id?: string
  user_id?: number
  firm_name?: string
  institution?: string
  specialization?: string
  is_certified?: boolean
  active_clients_count?: number
  [key: string]: any
}

export interface InvestorProfileEntity {
  id?: string
  user_id?: number
  firm_name?: string
  entity_name?: string
  investor_type?: string
  commitment_capital?: string
  is_verified?: boolean
  [key: string]: any
}

export interface UserProfile {
  id: string
  name: string
  email: string
  role: UserRole
  avatar?: string
  businessName?: string
  orgName?: string
  org_name?: string
  phone?: string
  verified?: boolean
  emailVerified?: boolean
  phoneVerified?: boolean
  status?: string
  onboardingCompleted?: boolean

  // UMKM specific properties
  sector?: string
  city?: string
  establishedYear?: number | null
  nib?: string
  npwp?: string
  outletsCount?: number
  employeesCount?: number
  monthlyRevenue?: number | null
  fundingTarget?: number | null
  equityOffered?: string
  description?: string

  // Consultant specific properties
  institution?: string
  bnspLicense?: string
  specialization?: string
  experience?: string
  maxClients?: number

  // Investor specific properties
  entityName?: string
  investorType?: string
  ticketRange?: string
  sectors?: string[]
  minMargin?: string

  // Embedded profile entities
  businessProfile?: BusinessProfileEntity
  consultantProfile?: ConsultantProfileEntity
  investorProfile?: InvestorProfileEntity

  [key: string]: any
}

const DEMO_CREDENTIALS: Record<UserRole, { email: string; pass: string; name: string; businessName: string }> = {
  UMKM: {
    email: 'fikri@kopisenja.id',
    pass: 'password123',
    name: 'Fikri Setiawan',
    businessName: 'Kopi Senja Nusantara'
  },
  CONSULTANT: {
    email: 'maya.suryani@beruang.id',
    pass: 'password123',
    name: 'Dra. Maya Suryani, M.M.',
    businessName: 'Suryani Consulting & Advisory'
  },
  INVESTOR: {
    email: 'hendro@nusantaraventures.com',
    pass: 'password123',
    name: 'Hendro Wicaksono',
    businessName: 'Nusantara Angel Syndicate'
  },
  ADMIN: {
    email: 'admin@beruang.id',
    pass: 'password123',
    name: 'Super Admin Beruang',
    businessName: 'Operations Team'
  }
}

export const useAuthStore = defineStore('auth', {
  state: () => ({
    currentUser: {
      id: '5',
      name: '',
      email: '',
      role: 'UMKM' as UserRole,
      avatar: '/images/user-profile.png',
      businessName: '',
      phone: '',
      verified: true
    } as UserProfile | null,
    isAuthenticated: true,
    token: '' as string,
    loading: false,
    error: null as string | null
  }),

  getters: {
    currentRole: (state): UserRole => state.currentUser?.role || 'UMKM',
    role: (state): UserRole => state.currentUser?.role || 'UMKM',
    userName: (state): string => state.currentUser?.name || 'Pengguna',
    userEmail: (state): string => state.currentUser?.email || '',
    userAvatar: (state): string => state.currentUser?.avatar || '/images/user-profile.png'
  },

  actions: {
    /**
     * Inisialisasi sesi dari cookie 'beruang_token' saat aplikasi dimuat
     */
    async initSession() {
      const tokenCookie = useCookie<string | null>('beruang_token', {
        maxAge: 60 * 60 * 24 * 7,
        sameSite: 'lax',
        path: '/'
      })
      if (tokenCookie.value) {
        this.token = tokenCookie.value
        this.isAuthenticated = true
        await this.fetchMe()
      } else {
        // Otomatis mint token live ke deployed backend
        try {
          await this.login('fikri@kopisenja.id', 'password123')
        } catch (err: any) {
          console.warn('Backend live login fallback:', err?.message)
        }
      }
    },

    /**
     * Pasang data pengguna dari Google OAuth segera ke state
     */
    setGoogleUser(profile: { name?: string; email?: string; picture?: string }, role: UserRole = 'UMKM') {
      this.currentUser = {
        id: this.currentUser?.id || 'google-' + Date.now(),
        name: profile.name || this.currentUser?.name || 'Pengguna Google',
        email: profile.email || this.currentUser?.email || '',
        avatar: profile.picture || this.currentUser?.avatar || '/images/user-profile.png',
        role: role || this.currentUser?.role || 'UMKM',
        verified: true
      } as UserProfile
      this.isAuthenticated = true
    },

    /**
     * Ambil data profil user terbaru dari token aktif
     */
    async fetchMe() {
      try {
        const res = await useApi<UserProfile>('/auth/me')
        if (res.data) {
          this.currentUser = {
            ...this.currentUser,
            ...res.data,
            businessName: res.data.businessName || res.data.orgName || this.currentUser?.businessName
          }
          this.isAuthenticated = true
        }
      } catch (err: any) {
        console.warn('Gagal memuat profil pengguna dari backend:', err?.message)
      }
    },

    /**
     * Login via Email & Password ke backend live Laravel Sanctum atau role fallback
     */
    async login(email: string, roleOrPassword: UserRole | string = 'UMKM') {
      this.loading = true
      this.error = null

      const isRole = ['UMKM', 'CONSULTANT', 'INVESTOR', 'ADMIN'].includes(roleOrPassword as string)
      const role: UserRole = isRole ? (roleOrPassword as UserRole) : 'UMKM'
      const password = (!isRole && typeof roleOrPassword === 'string') ? roleOrPassword : 'password123'

      try {
        const res = await useApi<{ token: string; user: UserProfile }>('/auth/login', {
          method: 'POST',
          body: { email, password }
        })

        const tokenCookie = useCookie<string | null>('beruang_token', {
          maxAge: 60 * 60 * 24 * 7,
          sameSite: 'lax',
          path: '/'
        })

        tokenCookie.value = res.data.token
        this.token = res.data.token
        this.currentUser = {
          ...res.data.user,
          businessName: res.data.user.businessName || res.data.user.orgName
        }
        this.isAuthenticated = true
        return res.data
      } catch (err: any) {
        // Fallback demo/mock login jika live API gagal atau mode demo tanpa rekursi
        const demo = DEMO_CREDENTIALS[role]
        this.currentUser = {
          id: 'demo-' + role.toLowerCase(),
          role,
          name: demo?.name || 'Fikri Setiawan',
          email: email || demo?.email || 'fikri@kopisenja.id',
          businessName: demo?.businessName || 'Kopi Senja Nusantara',
          avatar: '/images/user-profile.png',
          verified: true
        }
        this.isAuthenticated = true
        return { user: this.currentUser, token: 'demo-token' }
      } finally {
        this.loading = false
      }
    },

    /**
     * Login / Register via Google OAuth Token (POST /api/auth/google)
     */
    async loginWithGoogle(
      googleToken: string,
      role?: UserRole,
      preloadedProfile?: { name?: string; email?: string; picture?: string }
    ) {
      this.loading = true
      this.error = null

      if (preloadedProfile?.email || preloadedProfile?.name) {
        this.setGoogleUser(preloadedProfile, role || 'UMKM')
      }

      try {
        const res = await useApi<{ token: string; user: UserProfile }>('/auth/google', {
          method: 'POST',
          body: {
            token: googleToken,
            ...(role ? { role } : {})
          }
        })

        if (res.data?.token) {
          const tokenCookie = useCookie<string | null>('beruang_token', {
            maxAge: 60 * 60 * 24 * 7,
            sameSite: 'lax',
            path: '/'
          })

          tokenCookie.value = res.data.token
          this.token = res.data.token
          this.currentUser = {
            ...this.currentUser,
            ...res.data.user,
            name: res.data.user?.name || preloadedProfile?.name || this.currentUser?.name,
            email: res.data.user?.email || preloadedProfile?.email || this.currentUser?.email,
            avatar: res.data.user?.avatar || preloadedProfile?.picture || this.currentUser?.avatar,
            businessName: res.data.user.businessName || res.data.user.orgName || this.currentUser?.businessName
          }
          this.isAuthenticated = true
          await this.fetchMe()
        }

        return res.data
      } catch (err: any) {
        if (preloadedProfile?.email) {
          console.warn('Backend Google Auth belum sinkron, menggunakan data profil Google autentik:', err?.message)
          this.isAuthenticated = true
          return { token: 'google-session-active', user: this.currentUser! }
        }
        this.error = err?.message || 'Login dengan akun Google gagal'
        throw err
      } finally {
        this.loading = false
      }
    },

    /**
     * Kirim OTP WhatsApp via gateway Fonnte (/api/otp/send)
     */
    async sendWhatsAppOtp(phone: string) {
      this.loading = true
      this.error = null
      let normalized = phone.replace(/\D/g, '')
      if (normalized.startsWith('0')) {
        normalized = '62' + normalized.slice(1)
      } else if (!normalized.startsWith('62')) {
        normalized = '62' + normalized
      }

      try {
        const res = await useApi<any>('/otp/send', {
          method: 'POST',
          body: { phone: normalized }
        })
        return res
      } catch (err: any) {
        this.error = err?.message || 'Gagal mengirim kode OTP WhatsApp'
        throw err
      } finally {
        this.loading = false
      }
    },

    /**
     * Verifikasi OTP WhatsApp 6 Digit & Login (/api/otp/verify)
     */
    async verifyPhoneOtp(phone: string, otp: string) {
      this.loading = true
      this.error = null
      let normalized = phone.replace(/\D/g, '')
      if (normalized.startsWith('0')) {
        normalized = '62' + normalized.slice(1)
      } else if (!normalized.startsWith('62')) {
        normalized = '62' + normalized
      }

      try {
        const res = await useApi<any>('/otp/verify', {
          method: 'POST',
          body: { phone: normalized, otp }
        })

        if (res.data?.token) {
          const tokenCookie = useCookie<string | null>('beruang_token', {
            maxAge: 60 * 60 * 24 * 7,
            sameSite: 'lax',
            path: '/'
          })

          tokenCookie.value = res.data.token
          this.token = res.data.token
          this.isAuthenticated = true
          await this.fetchMe()
        }

        if (this.currentUser) {
          this.currentUser.verified = true
        }

        return res
      } catch (err: any) {
        this.error = err?.message || 'Verifikasi OTP gagal'
        throw err
      } finally {
        this.loading = false
      }
    },

    async register(payload: {
      name: string
      email: string
      password?: string
      role: UserRole
      phone?: string
      orgName?: string
      [key: string]: any
    }) {
      this.loading = true
      this.error = null
      try {
        const password = payload.password || 'password123'
        const org = payload.orgName || payload.org_name || payload.businessName
        const res = await useApi<{ token: string; user: UserProfile }>('/auth/register', {
          method: 'POST',
          body: {
            name: payload.name,
            email: payload.email,
            password,
            password_confirmation: password,
            role: payload.role,
            phone: payload.phone,
            brand: org,
            business_name: org,
            firm_name: org
          }
        })

        if (res.data?.token) {
          const tokenCookie = useCookie<string | null>('beruang_token', {
            maxAge: 60 * 60 * 24 * 7,
            sameSite: 'lax',
            path: '/'
          })
          tokenCookie.value = res.data.token
          this.token = res.data.token
          this.currentUser = res.data.user
          this.isAuthenticated = true
        }

        return res.data
      } catch (err: any) {
        this.error = err?.message || 'Pendaftaran gagal'
        throw err
      } finally {
        this.loading = false
      }
    },

    /**
     * Perbarui data profil lokal pengguna
     */
    updateProfile(data: Partial<UserProfile>) {
      if (this.currentUser) {
        this.currentUser = {
          ...this.currentUser,
          ...data
        }
      } else {
        this.currentUser = {
          id: 'usr-' + Date.now(),
          name: data.name || '',
          email: data.email || '',
          role: data.role || 'UMKM',
          verified: true,
          ...data
        } as UserProfile
      }
      this.isAuthenticated = true
    },

    /**
     * Quick Role Switcher untuk keperluan simulasi dev / demo
     * Otomatis login dengan akun seeder live yang relevan jika password default tersedia
     */
    async setRole(role: UserRole) {
      const demo = DEMO_CREDENTIALS[role]
      if (demo) {
        this.currentUser = {
          id: 'demo-' + role.toLowerCase(),
          role,
          name: demo.name,
          email: demo.email,
          businessName: demo.businessName,
          avatar: '/images/user-profile.png',
          verified: true
        }
        this.isAuthenticated = true

        try {
          const res = await useApi<{ token: string; user: UserProfile }>('/auth/login', {
            method: 'POST',
            body: { email: demo.email, password: demo.pass }
          })
          if (res.data?.token) {
            const tokenCookie = useCookie<string | null>('beruang_token', {
              maxAge: 60 * 60 * 24 * 7,
              sameSite: 'lax',
              path: '/'
            })
            tokenCookie.value = res.data.token
            this.token = res.data.token
            this.currentUser = {
              ...this.currentUser,
              ...res.data.user,
              businessName: res.data.user.businessName || res.data.user.orgName || demo.businessName
            }
          }
        } catch {
          // Tetap gunakan sesi demo lokal jika live backend offline
        }
      }
    },

    /**
     * Logout dan cabut token
     */
    async logout() {
      try {
        await useApi('/auth/logout', { method: 'POST' })
      } catch {
        // Abaikan error saat logout
      } finally {
        const tokenCookie = useCookie<string | null>('beruang_token')
        tokenCookie.value = null
        this.token = ''
        this.currentUser = null
        this.isAuthenticated = false
      }
    },

    /**
     * Perbarui Avatar Pengguna
     */
    async updateAvatar(avatarUrl: string) {
      if (this.currentUser) {
        this.currentUser.avatar = avatarUrl
      }
      try {
        await useApi('/auth/me/avatar', {
          method: 'PUT',
          body: { avatarUrl }
        })
      } catch (err: any) {
        console.warn('Gagal sinkronisasi avatar ke backend:', err?.message)
      }
    }
  }
})
