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
    currentUser: null as UserProfile | null,
    isAuthenticated: false,
    token: '' as string,
    loading: false,
    error: null as string | null
  }),

  getters: {
    currentRole: (state): UserRole => state.currentUser?.role || 'UMKM',
    role: (state): UserRole => state.currentUser?.role || 'UMKM',
    userName: (state): string => state.currentUser?.name || 'Pengguna',
    userEmail: (state): string => state.currentUser?.email || '',
    userAvatar: (state): string => state.currentUser?.avatar || '',
    isOnboarded: (state): boolean => {
      if (!state.isAuthenticated || !state.currentUser) return false
      // Akun demo bawaan selalu dianggap sudah onboarded
      const email = state.currentUser.email?.toLowerCase() || ''
      if (
        email === 'fikri@kopisenja.id' ||
        email === 'maya.suryani@beruang.id' ||
        email === 'hendro@nusantaraventures.com' ||
        email === 'admin@beruang.id'
      ) {
        return true
      }
      if (state.currentUser.onboardingCompleted) return true
      // Auto-check jika user sudah memiliki profil usaha/kelembagaan aktif
      const biz = state.currentUser.businessProfile
      if (biz && (biz.brand || biz.name) && biz.status !== 'PROFILE_INCOMPLETE') return true
      const cons = state.currentUser.consultantProfile
      if (cons && (cons.firm_name || cons.firmName)) return true
      const inv = state.currentUser.investorProfile
      if (inv && (inv.firm_name || inv.firmName)) return true
      return false
    },
    isDemoUser: (state): boolean => {
      const email = state.currentUser?.email?.toLowerCase() || ''
      return (
        email === 'fikri@kopisenja.id' ||
        email === 'maya.suryani@beruang.id' ||
        email === 'hendro@nusantaraventures.com' ||
        email === 'admin@beruang.id'
      )
    },
    canSwitchRole: (state): boolean => {
      if (!state.currentUser) return false
      const email = state.currentUser.email?.toLowerCase() || ''
      const role = state.currentUser.role
      // Switch role hanya diizinkan untuk akun fikri@kopisenja.id atau akun ADMIN
      // Pengguna umum/biasa (UMKM, Konsultan, Investor/Funder biasa) tidak bisa switch role
      return (
        email === 'fikri@kopisenja.id' ||
        role === 'ADMIN' ||
        email === 'admin@beruang.id' ||
        email === 'maya.suryani@beruang.id' ||
        email === 'hendro@nusantaraventures.com'
      )
    }
  },

  actions: {
    /**
     * Inisialisasi sesi dari cookie 'beruang_token' & fallback localStorage saat aplikasi dimuat/refresh
     */
    async initSession() {
      const tokenCookie = useCookie<string | null>('beruang_token', {
        maxAge: 60 * 60 * 24 * 7,
        sameSite: 'lax',
        path: '/'
      })

      let activeToken = tokenCookie.value
      if (!activeToken && import.meta.client) {
        try {
          const storedToken = localStorage.getItem('beruang_token')
          if (storedToken) {
            activeToken = storedToken
            tokenCookie.value = storedToken
          }
        } catch {
          // ignore
        }
      }

      if (activeToken) {
        this.token = activeToken
        this.isAuthenticated = true

        // Segera pulihkan profil user dari localStorage untuk mencegah flicker atau redirect keliru
        if (import.meta.client) {
          try {
            const cachedUser = localStorage.getItem('beruang_user')
            if (cachedUser) {
              const parsed = JSON.parse(cachedUser)
              if (parsed && typeof parsed === 'object') {
                this.currentUser = parsed
                this.syncRoleStores()
              }
            }
          } catch {
            // ignore
          }
        }

        // Ambil profil user terbaru dari backend jika token aktif
        if (activeToken !== 'google-session-active') {
          await this.fetchMe()
        }
      } else {
        this.token = ''
        this.currentUser = null
        this.isAuthenticated = false
      }
    },

    syncRoleStores() {
      if (!this.currentUser) return
      try {
        if (this.currentUser.role === 'CONSULTANT') {
          useKonsultanStore().initProfileForUser(this.currentUser)
        } else if (this.currentUser.role === 'INVESTOR') {
          useInvestorStore().initProfileForUser(this.currentUser)
        }
      } catch {
        // ignore in SSR
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
        avatar: profile.picture || this.currentUser?.avatar || '',
        role: role || this.currentUser?.role || 'UMKM',
        verified: true
      } as UserProfile
      this.isAuthenticated = true
      this.syncRoleStores()
      if (import.meta.client && this.currentUser) {
        try {
          localStorage.setItem('beruang_user', JSON.stringify(this.currentUser))
        } catch {}
      }
    },

    /**
     * Ambil data profil user terbaru dari token aktif
     */
    async fetchMe() {
      try {
        const res = await useApi<any>('/auth/me')
        const userData = res.data?.user || res.data
        if (userData) {
          this.currentUser = {
            ...this.currentUser,
            ...userData,
            businessName: userData.businessName || userData.businessProfile?.brand || userData.businessProfile?.name || userData.orgName || this.currentUser?.businessName
          }
          this.isAuthenticated = true
          this.syncRoleStores()
          if (import.meta.client && this.currentUser) {
            try {
              localStorage.setItem('beruang_user', JSON.stringify(this.currentUser))
            } catch {}
          }
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
        this.syncRoleStores()

        if (import.meta.client) {
          try {
            localStorage.setItem('beruang_token', res.data.token)
            localStorage.setItem('beruang_user', JSON.stringify(this.currentUser))
          } catch {}
        }

        return res.data
      } catch (err: any) {
        this.error = err?.data?.message || err?.message || 'Email atau kata sandi tidak sesuai'
        this.isAuthenticated = false
        this.token = null
        this.currentUser = null
        throw err
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
          if (import.meta.client && this.currentUser) {
            try {
              localStorage.setItem('beruang_token', res.data.token)
              localStorage.setItem('beruang_user', JSON.stringify(this.currentUser))
            } catch {}
          }
          await this.fetchMe()
        }

        return res.data
      } catch (err: any) {
        this.isAuthenticated = false
        this.error = err?.data?.message || err?.message || 'Login dengan akun Google gagal'
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

          if (res.data?.user) {
            this.currentUser = {
              ...this.currentUser,
              ...res.data.user,
              businessName: res.data.user.businessProfile?.brand || res.data.user.businessProfile?.name || res.data.user.businessName
            }
          }
          if (import.meta.client && this.currentUser) {
            try {
              localStorage.setItem('beruang_token', res.data.token)
              localStorage.setItem('beruang_user', JSON.stringify(this.currentUser))
            } catch {}
          }
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

          if (import.meta.client && this.currentUser) {
            try {
              localStorage.setItem('beruang_token', res.data.token)
              localStorage.setItem('beruang_user', JSON.stringify(this.currentUser))
            } catch {}
          }
        }

        return res.data
      } catch (err: any) {
        this.error = err?.data?.message || err?.message || 'Registrasi akun gagal. Silakan coba lagi.'
        this.isAuthenticated = false
        this.token = null
        this.currentUser = null
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
      if (import.meta.client && this.currentUser) {
        try {
          localStorage.setItem('beruang_user', JSON.stringify(this.currentUser))
        } catch {}
      }
    },

    /**
     * Quick Role Switcher untuk keperluan simulasi dev / demo
     * Otomatis login dengan akun seeder live yang relevan jika password default tersedia
     */
    async setRole(role: UserRole) {
      if (this.currentUser && !this.canSwitchRole) {
        console.warn(`[RBAC] Switch role diblokir untuk akun ${this.currentUser.email} (${this.currentUser.role}). Hanya fikri@kopisenja.id atau akun ADMIN yang diizinkan berpindah peran.`)
        return
      }

      const demo = DEMO_CREDENTIALS[role]
      if (demo) {
        this.currentUser = {
          id: 'demo-' + role.toLowerCase(),
          role,
          name: demo.name,
          email: demo.email,
          businessName: demo.businessName,
          avatar: '',
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
            if (import.meta.client && this.currentUser) {
              try {
                localStorage.setItem('beruang_token', res.data.token)
                localStorage.setItem('beruang_user', JSON.stringify(this.currentUser))
              } catch {}
            }
          }
        } catch {
          // Tetap gunakan sesi demo lokal jika live backend offline
          const tokenCookie = useCookie<string | null>('beruang_token', {
            maxAge: 60 * 60 * 24 * 7,
            sameSite: 'lax',
            path: '/'
          })
          const demoToken = 'demo-' + role.toLowerCase()
          tokenCookie.value = demoToken
          this.token = demoToken
          if (import.meta.client && this.currentUser) {
            try {
              localStorage.setItem('beruang_token', demoToken)
              localStorage.setItem('beruang_user', JSON.stringify(this.currentUser))
            } catch {}
          }
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
        const tokenCookie = useCookie<string | null>('beruang_token', {
          path: '/'
        })
        tokenCookie.value = null
        const onboardedCookie = useCookie<string | null>('beruang_onboarded', {
          path: '/'
        })
        onboardedCookie.value = null
        this.token = ''
        this.currentUser = null
        this.isAuthenticated = false
        if (import.meta.client) {
          try {
            localStorage.removeItem('beruang_token')
            localStorage.removeItem('beruang_user')
            localStorage.removeItem('beruang_onboarded')
            localStorage.removeItem('umkm_monthly_records')
            localStorage.removeItem('beruang_notifications_v4')
            if (this.currentUser?.id) {
              localStorage.removeItem(`beruang_notifications_${this.currentUser.id}`)
            }
            sessionStorage.clear()
          } catch {
            // ignore
          }
        }
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
