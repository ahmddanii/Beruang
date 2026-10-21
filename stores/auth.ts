import { defineStore } from 'pinia'
import { useApi } from '~/composables/useApi'

export type UserRole = 'UMKM' | 'CONSULTANT' | 'INVESTOR' | 'ADMIN'

export interface UserProfile {
  id: string
  name: string
  email: string
  role: UserRole
  avatar?: string
  businessName?: string
  orgName?: string
  phone?: string
  verified?: boolean
  emailVerified?: boolean
  phoneVerified?: boolean
  status?: string
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
      name: 'Fikri Setiawan',
      email: 'fikri@kopisenja.id',
      role: 'UMKM' as UserRole,
      avatar: '/images/user-profile.png',
      businessName: 'Kopi Senja Nusantara',
      phone: '081234567890',
      verified: true
    } as UserProfile | null,
    isAuthenticated: true,
    token: '' as string,
    loading: false,
    error: null as string | null
  }),

  actions: {
    /**
     * Inisialisasi sesi dari cookie 'beruang_token' saat aplikasi dimuat
     */
    async initSession() {
      const tokenCookie = useCookie<string | null>('beruang_token')
      if (tokenCookie.value) {
        this.token = tokenCookie.value
        this.isAuthenticated = true
        await this.fetchMe()
      }
    },

    /**
     * Ambil data profil user terbaru dari token aktif
     */
    async fetchMe() {
      try {
        const res = await useApi<UserProfile>('/auth/me')
        if (res.data) {
          this.currentUser = {
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
     * Login via Email & Password ke backend live Laravel Sanctum
     */
    async login(email: string, password: string = 'password123') {
      this.loading = true
      this.error = null
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
        this.error = err?.message || 'Login gagal'
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
     * Quick Role Switcher untuk keperluan simulasi dev / demo
     * Otomatis login dengan akun seeder live yang relevan jika password default tersedia
     */
    async setRole(role: UserRole) {
      const demo = DEMO_CREDENTIALS[role]
      if (demo) {
        try {
          await this.login(demo.email, demo.pass)
        } catch {
          // Fallback lokal jika backend tidak terjangkau
          if (this.currentUser) {
            this.currentUser.role = role
            this.currentUser.name = demo.name
            this.currentUser.email = demo.email
            this.currentUser.businessName = demo.businessName
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
