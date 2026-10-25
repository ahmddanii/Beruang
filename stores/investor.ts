import { defineStore } from 'pinia'
import { useApi } from '~/composables/useApi'

export interface MarketplaceUmkm {
  id: string
  umkmRefId?: string
  isCustomPost?: boolean
  name: string
  code: string
  sector: string
  city: string
  establishedYear: number
  postedAt: string
  fundingTarget: number // Target pendanaan dalam Rupiah
  marginPercentage: number // Margin kotor %
  growthYoY: number // Pertumbuhan omzet %
  healthScore: number
  certifiedAt: string
  consultantName: string
  pitchSummary: string
  postImageUrl: string
  postImages: string[]
  postAspectRatio?: '3:4' | '1:1'
  isPlatformPost?: boolean
  platformCategory?: string
  authorUserId?: string
  authorEmail?: string
  tags: string[]
  accessStatus: 'NONE' | 'PENDING' | 'APPROVED' | 'REJECTED'
  bookmarked: boolean
}

export interface AccessApplication {
  umkmId: string
  ticketSize: number
  notes: string
  submittedAt: string
}

export interface InvestorProfile {
  name: string
  roleTitle: string
  companyName: string
  investorType: string
  city: string
  establishedYear: number
  avatarUrl: string
  bannerUrl: string
  minTicket: number
  maxTicket: number
  preferredSectors: string
  investmentScheme: string
  targetRoiRange: string
  email: string
  whatsapp: string
  website: string
  npwpEntity: string
  nibEntity: string
  description: string
}

export function getDemoInvestorProfile(): InvestorProfile {
  return {
    name: 'Fikri Setiawan',
    roleTitle: 'Managing Partner',
    companyName: 'PT Nusantara Kapital Investama',
    investorType: 'Angel Investor & Sindikasi Institusi',
    city: 'Jakarta Selatan',
    establishedYear: 2020,
    avatarUrl: '/images/user-profile.png',
    bannerUrl: '/images/default-store-banner.jpg',
    minTicket: 100000000,
    maxTicket: 500000000,
    preferredSectors: 'Kuliner & Minuman (F&B), Oleh-oleh & FMCG, Agroindustri',
    investmentScheme: 'Bagi Hasil Usaha',
    targetRoiRange: '14% – 20% per Tahun',
    email: 'fikri@kopisenja.id',
    whatsapp: '+62 811-9283-7465',
    website: 'nusantarakapital.co.id',
    npwpEntity: '02.918.374.1-012.000',
    nibEntity: '9120301928374',
    description: 'Fokus mendanai ekspansi gerai dan peningkatan kapasitas produksi UMKM sektor F&B, FMCG, dan Agroindustri di Indonesia yang memiliki pencatatan kas rapi dan telah divalidasi oleh konsultan pendamping resmi.'
  }
}

export function getEmptyInvestorProfile(): InvestorProfile {
  return {
    name: '',
    roleTitle: '',
    companyName: '',
    investorType: 'Angel Investor & Sindikasi Institusi',
    city: '',
    establishedYear: new Date().getFullYear(),
    avatarUrl: '/images/user-profile.png',
    bannerUrl: '/images/default-store-banner.jpg',
    minTicket: 50000000,
    maxTicket: 500000000,
    preferredSectors: '',
    investmentScheme: 'Bagi Hasil Usaha',
    targetRoiRange: '',
    email: '',
    whatsapp: '',
    website: '',
    npwpEntity: '',
    nibEntity: '',
    description: ''
  }
}

export const useInvestorStore = defineStore('investor', {
  state: () => ({
    searchQuery: '',
    selectedSector: 'ALL',
    selectedCity: 'ALL',
    selectedCities: [] as string[],
    minMargin: 0,
    selectedTicketSize: 'ALL',

    profile: getDemoInvestorProfile(),

    marketplaceList: [] as MarketplaceUmkm[],

    platformPosts: [
      {
        id: 'platform-tips-01',
        name: 'Beruang Official',
        code: 'BERU-TIPS-01',
        sector: 'Tips & Trick Investasi UMKM',
        city: 'Edukasi Platform',
        establishedYear: 2026,
        postedAt: '3 jam yang lalu',
        fundingTarget: 0,
        marginPercentage: 0,
        growthYoY: 0,
        healthScore: 100,
        certifiedAt: '',
        consultantName: 'Tim Riset & Kepatuhan Beruang',
        pitchSummary: 'Tips & Trick Membaca Kualitas Kas UMKM: Sebelum menyalurkan modal, perhatikan 3 indikator utama pada Ruang Data — rasio untung bersih yang stabil di atas 35%, disiplin pemisahan rekening operasional toko dari rekening pribadi, serta konsistensi pencatatan mutasi kas harian.',
        postImageUrl: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=900&auto=format&fit=crop&q=80',
        postImages: [
          'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=900&auto=format&fit=crop&q=80',
          'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=900&auto=format&fit=crop&q=80',
          'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=900&auto=format&fit=crop&q=80'
        ],
        isPlatformPost: true,
        platformCategory: 'Tips & Trick',
        tags: ['Tips & Trick', 'Edukasi Investor'],
        accessStatus: 'NONE',
        bookmarked: false
      },
      {
        id: 'platform-tips-02',
        name: 'Beruang Official',
        code: 'BERU-TIPS-02',
        sector: 'Tips & Trick Strategi Portofolio',
        city: 'Edukasi Platform',
        establishedYear: 2026,
        postedAt: '1 hari yang lalu',
        fundingTarget: 0,
        marginPercentage: 0,
        growthYoY: 0,
        healthScore: 100,
        certifiedAt: '',
        consultantName: 'Tim Riset & Kepatuhan Beruang',
        pitchSummary: 'Tips & Trick Diversifikasi Sektor UMKM: Mengombinasikan pendanaan pada sektor F&B perputaran kas harian dengan sektor kriya berorientasi ekspor membantu menjaga stabilitas imbal bagi hasil bulanan terhadap siklus musiman.',
        postImageUrl: 'https://images.unsplash.com/photo-1579532537598-459ecdaf39cc?w=900&auto=format&fit=crop&q=80',
        postImages: [
          'https://images.unsplash.com/photo-1579532537598-459ecdaf39cc?w=900&auto=format&fit=crop&q=80',
          'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=900&auto=format&fit=crop&q=80'
        ],
        isPlatformPost: true,
        platformCategory: 'Tips & Trick',
        tags: ['Tips & Trick', 'Strategi Portofolio'],
        accessStatus: 'NONE',
        bookmarked: false
      }
    ] as MarketplaceUmkm[],

    applications: [] as AccessApplication[]
  }),

  getters: {
    filteredMarketplace: (state) => {
      return state.marketplaceList.filter(item => {
        const matchSearch = state.searchQuery === '' ||
          item.name.toLowerCase().includes(state.searchQuery.toLowerCase()) ||
          item.sector.toLowerCase().includes(state.searchQuery.toLowerCase()) ||
          item.city.toLowerCase().includes(state.searchQuery.toLowerCase())
        
        const matchSector = state.selectedSector === 'ALL' || item.sector.toLowerCase().includes(state.selectedSector.toLowerCase())
        const matchCity =
          (state.selectedCities.length === 0 && state.selectedCity === 'ALL') ||
          state.selectedCities.some(c => c.toLowerCase() === item.city.toLowerCase()) ||
          (state.selectedCity !== 'ALL' && item.city.toLowerCase() === state.selectedCity.toLowerCase())
        const matchMargin = item.marginPercentage >= state.minMargin

        let matchTicket = true
        if (state.selectedTicketSize === 'UNDER_250M') {
          matchTicket = item.fundingTarget <= 250000000
        } else if (state.selectedTicketSize === '250M_500M') {
          matchTicket = item.fundingTarget > 250000000 && item.fundingTarget <= 500000000
        } else if (state.selectedTicketSize === 'OVER_500M') {
          matchTicket = item.fundingTarget > 500000000
        }

        return matchSearch && matchSector && matchCity && matchMargin && matchTicket
      })
    },

    watchlist: (state) => {
      return state.marketplaceList.filter(item => item.bookmarked)
    }
  },

  actions: {
    /**
     * GET /api/investor/marketplace
     */
    async fetchMarketplace() {
      try {
        const params: Record<string, any> = {}
        if (this.selectedSector && this.selectedSector !== 'ALL') params.sector = this.selectedSector
        if (this.selectedCity && this.selectedCity !== 'ALL') params.city = this.selectedCity
        if (this.minMargin > 0) params.min_margin = this.minMargin
        if (this.selectedTicketSize && this.selectedTicketSize !== 'ALL') params.ticket_size = this.selectedTicketSize
        if (this.searchQuery) params.search = this.searchQuery

        const res = await useApi<any>('/investor/marketplace', { params })
        if (res.data) {
          const list = Array.isArray(res.data) ? res.data : (res.data as any).data
          if (Array.isArray(list)) {
            const customPosts = this.marketplaceList.filter(m => m.isCustomPost)
            const apiPosts: MarketplaceUmkm[] = list.map((item: any) => ({
              id: item.id,
              umkmRefId: item.umkmRefId || item.id,
              name: item.name,
              code: item.code || `BERU-${(item.city || 'UMK').substring(0, 3).toUpperCase()}-01`,
              sector: item.sector,
              city: item.city,
              establishedYear: item.establishedYear || 2021,
              postedAt: item.postedAt || 'Terverifikasi',
              fundingTarget: item.fundingTarget || 250000000,
              marginPercentage: item.marginPercentage || 45,
              growthYoY: item.growthYoY || 30,
              healthScore: item.healthScore || 80,
              certifiedAt: item.certifiedAt || 'BNSP Terakreditasi',
              consultantName: item.consultantName || 'Dra. Maya Suryani, M.M.',
              pitchSummary: item.pitchSummary || '',
              postImageUrl: item.postImageUrl || 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=900&auto=format&fit=crop&q=80',
              postImages: item.postImages && item.postImages.length > 0 ? item.postImages : ['https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=900&auto=format&fit=crop&q=80'],
              postAspectRatio: item.postAspectRatio || '3:4',
              tags: item.tags || ['UMKM Binaan'],
              accessStatus: item.accessStatus || 'NONE',
              bookmarked: Boolean(item.bookmarked)
            }))
            this.marketplaceList = [...customPosts, ...apiPosts]
          }
        }
      } catch (err: any) {
        console.warn('Gagal memuat marketplace live:', err?.message)
      }
    },

    /**
     * POST /api/investor/bookmark/{businessId}
     */
    async toggleBookmark(umkmId: string) {
      const item = this.marketplaceList.find(m => m.id === umkmId) || (this as any).platformPosts?.find((p: any) => p.id === umkmId)
      if (item) {
        item.bookmarked = !item.bookmarked
      }
      try {
        await useApi(`/investor/bookmark/${umkmId}`, { method: 'POST' })
      } catch (err: any) {
        console.warn('Gagal sinkron bookmark ke live API:', err?.message)
      }
    },

    toggleCitySelection(city: string) {
      const idx = this.selectedCities.indexOf(city)
      if (idx > -1) {
        this.selectedCities.splice(idx, 1)
      } else {
        this.selectedCities.push(city)
      }
      this.selectedCity = this.selectedCities.length === 1 ? this.selectedCities[0] : 'ALL'
    },

    clearCitySelection() {
      this.selectedCities = []
      this.selectedCity = 'ALL'
    },

    /**
     * GET /api/investor/watchlist
     */
    async fetchWatchlist() {
      try {
        const res = await useApi<any>('/investor/watchlist')
        if (res.data && Array.isArray(res.data)) {
          const bookmarkedIds = new Set(res.data.map((item: any) => item.id))
          this.marketplaceList.forEach(item => {
            if (bookmarkedIds.has(item.id)) {
              item.bookmarked = true
            }
          })
        }
      } catch (err: any) {
        console.warn('Gagal memuat watchlist live:', err?.message)
      }
    },



    /**
     * POST /api/investor/requests
     */
    async requestAccess(umkmId: string, ticketSize: number, notes: string, scheme: string = 'REVENUE_SHARE') {
      const item = this.marketplaceList.find(m => m.id === umkmId)
      if (item) {
        item.accessStatus = 'PENDING'
      }

      this.applications.push({
        umkmId,
        ticketSize,
        notes,
        submittedAt: new Date().toISOString()
      })

      try {
        await useApi('/investor/requests', {
          method: 'POST',
          body: {
            businessId: umkmId,
            proposedTicket: ticketSize,
            scheme,
            introMessage: notes,
            ndaAgreed: true
          }
        })
      } catch (err: any) {
        console.warn('Gagal kirim permohonan akses ke live API:', err?.message)
      }
    },

    initProfileForUser(user?: { email?: string; name?: string }) {
      if (user?.email && !user.email.includes('kopisenja') && !user.email.includes('hendro')) {
        this.profile = {
          ...getEmptyInvestorProfile(),
          name: user.name || '',
          email: user.email || ''
        }
      } else {
        this.profile = getDemoInvestorProfile()
      }
    },

    async fetchProfile() {
      try {
        const res = await useApi<any>('/investor/profile')
        if (res.data) {
          this.profile = {
            ...this.profile,
            name: res.data.name || this.profile.name,
            companyName: res.data.companyName || this.profile.companyName,
            investorType: res.data.investorType || this.profile.investorType,
            city: res.data.city || this.profile.city,
            preferredSectors: res.data.sectors ? (Array.isArray(res.data.sectors) ? res.data.sectors.join(', ') : res.data.sectors) : this.profile.preferredSectors,
            minTicket: res.data.minTicket || this.profile.minTicket,
            maxTicket: res.data.maxTicket || this.profile.maxTicket,
            investmentScheme: res.data.investmentScheme || this.profile.investmentScheme,
            whatsapp: res.data.whatsapp || this.profile.whatsapp,
            website: res.data.website || this.profile.website,
            nibEntity: res.data.nibEntity || this.profile.nibEntity,
            npwpEntity: res.data.npwpEntity || this.profile.npwpEntity,
            description: res.data.description || this.profile.description
          }
        }
      } catch (err: any) {
        console.warn('Gagal memuat profil investor live:', err?.message)
      }
    },

    async fetchMyAccessRequests() {
      try {
        const res = await useApi<any>('/investor/my-requests')
        if (res.data && Array.isArray(res.data)) {
          this.applications = res.data.map((r: any) => ({
            umkmId: r.businessId,
            ticketSize: r.proposedTicket,
            notes: r.introMessage || '',
            submittedAt: r.requestedAt
          }))
          // Sinkronkan accessStatus pada marketplaceList
          for (const req of res.data) {
            const item = this.marketplaceList.find(m => m.id === req.businessId || m.umkmRefId === req.businessId)
            if (item) {
              item.accessStatus = req.status
            }
          }
        }
      } catch (err: any) {
        console.warn('Gagal memuat permohonan akses live:', err?.message)
      }
    },

    async updateInvestorProfile(payload: Partial<InvestorProfile>) {
      this.profile = { ...this.profile, ...payload }
      try {
        await useApi('/investor/profile', {
          method: 'PUT',
          body: {
            name: this.profile.name,
            companyName: this.profile.companyName,
            investorType: this.profile.investorType,
            city: this.profile.city,
            preferredSectors: this.profile.preferredSectors,
            minTicket: this.profile.minTicket,
            maxTicket: this.profile.maxTicket,
            investmentScheme: this.profile.investmentScheme,
            whatsapp: this.profile.whatsapp,
            website: this.profile.website,
            nibEntity: this.profile.nibEntity,
            npwpEntity: this.profile.npwpEntity,
            description: this.profile.description
          }
        })
      } catch (err: any) {
        console.warn('Gagal simpan profil investor ke server:', err?.message)
      }
    },

    updateInvestorBanner(newUrl: string) {
      this.profile.bannerUrl = newUrl
    },

    resetInvestorBanner() {
      this.profile.bannerUrl = '/images/default-store-banner.jpg'
    },

    updateInvestorAvatar(newUrl: string) {
      this.profile.avatarUrl = newUrl
    },

    resetInvestorAvatar() {
      this.profile.avatarUrl = '/images/user-profile.png'
    },

    initPostsFromStorage() {
      if (typeof window === 'undefined') return
      try {
        const raw = window.localStorage.getItem('beruang_umkm_posts')
        if (!raw) return
        const savedPosts = JSON.parse(raw) as MarketplaceUmkm[]
        if (Array.isArray(savedPosts) && savedPosts.length > 0) {
          for (let i = savedPosts.length - 1; i >= 0; i--) {
            const post = savedPosts[i]
            if (post && !this.marketplaceList.some(m => m.id === post.id)) {
              this.marketplaceList.unshift(post)
            }
          }
        }
      } catch {
        // Ignore storage errors
      }
    },

    createUmkmPost(payload: {
      umkmRefId?: string
      authorUserId?: string
      authorEmail?: string
      name: string
      city: string
      sector: string
      establishedYear: number
      fundingTarget: number
      consultantName: string
      pitchSummary: string
      postImages: string[]
      tags?: string[]
      marginPercentage?: number
      growthYoY?: number
      healthScore?: number
      certifiedAt?: string
    }): MarketplaceUmkm {
      const cleanImages =
        payload.postImages && payload.postImages.length > 0
          ? payload.postImages
          : ['https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=900&auto=format&fit=crop&q=80']

      const newPost: MarketplaceUmkm = {
        id: `umkm-post-${Date.now()}`,
        umkmRefId: payload.umkmRefId || '',
        authorUserId: payload.authorUserId,
        authorEmail: payload.authorEmail,
        isCustomPost: true,
        name: payload.name || 'Usaha Saya',
        code: `BERU-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`,
        sector: payload.sector || 'Sektor Usaha',
        city: payload.city ? payload.city.split(',')[0]!.trim() : 'Kota',
        establishedYear: payload.establishedYear || new Date().getFullYear(),
        postedAt: 'Baru saja',
        fundingTarget: payload.fundingTarget || 0,
        marginPercentage: payload.marginPercentage ?? 0,
        growthYoY: payload.growthYoY ?? 0,
        healthScore: payload.healthScore ?? 0,
        certifiedAt: payload.certifiedAt || 'Belum Terverifikasi',
        consultantName: payload.consultantName || 'Konsultan Pendamping',
        pitchSummary: payload.pitchSummary.trim(),
        postImageUrl: cleanImages[0]!,
        postImages: cleanImages,
        postAspectRatio: '3:4',
        tags: payload.tags || ['UMKM Terdaftar'],
        accessStatus: 'APPROVED',
        bookmarked: false
      }

      this.marketplaceList.unshift(newPost)

      if (typeof window !== 'undefined') {
        try {
          const customPosts = this.marketplaceList.filter(m => m.isCustomPost)
          window.localStorage.setItem('beruang_umkm_posts', JSON.stringify(customPosts))
        } catch {
          // Ignore storage quota errors
        }
      }

      return newPost
    },

    deleteUmkmPost(postId: string) {
      const idx = this.marketplaceList.findIndex(m => m.id === postId)
      if (idx > -1) {
        this.marketplaceList.splice(idx, 1)
      }
      if (typeof window !== 'undefined') {
        try {
          const customPosts = this.marketplaceList.filter(m => m.isCustomPost)
          window.localStorage.setItem('beruang_umkm_posts', JSON.stringify(customPosts))
        } catch {
          // Ignore storage errors
        }
      }
    }
  }
})
