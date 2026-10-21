import { defineStore } from 'pinia'
import { useApi } from '~/composables/useApi'

export interface MarketplaceUmkm {
  id: string
  name: string
  code: string
  sector: string
  city: string
  establishedYear: number
  fundingTarget: number // Target pendanaan dalam Rupiah
  marginPercentage: number // Margin kotor %
  growthYoY: number // Pertumbuhan omzet %
  healthScore: number
  certifiedAt: string
  consultantName: string
  pitchSummary: string
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

export const useInvestorStore = defineStore('investor', {
  state: () => ({
    searchQuery: '',
    selectedSector: 'ALL',
    selectedCity: 'ALL',
    minMargin: 0,
    selectedTicketSize: 'ALL',

    marketplaceList: [
      {
        id: 'umkm-01',
        name: 'Kopi Senja Nusantara',
        code: 'BERU-KOP-01',
        sector: 'F&B (Coffee & Drinks)',
        city: 'Bandung',
        establishedYear: 2021,
        fundingTarget: 250000000,
        marginPercentage: 48.5,
        growthYoY: 34.2,
        healthScore: 79,
        certifiedAt: '18 Sep 2026',
        consultantName: 'Dra. Maya Suryani, M.M.',
        pitchSummary: 'Spesialis kopi arabika-robusta dengan 3 gerai offline di Bandung. Margin kotor konsisten di atas 48% dengan SOP barista standar.',
        tags: ['F&B', 'Ready for Funding', 'Margin >45%', 'Halal'],
        accessStatus: 'APPROVED',
        bookmarked: true
      },
      {
        id: 'umkm-03',
        name: 'Sambal Bu Rudy Asli',
        code: 'BERU-SMB-03',
        sector: 'F&B (Oleh-oleh & FMCG)',
        city: 'Surabaya',
        establishedYear: 2019,
        fundingTarget: 500000000,
        marginPercentage: 52.0,
        growthYoY: 42.0,
        healthScore: 88,
        certifiedAt: '15 Sep 2026',
        consultantName: 'Bambang Sudarsono, S.E.',
        pitchSummary: 'Pabrikasi sambal kemasan botol higienis dengan distribusi 120+ toko oleh-oleh se-Jawa Timur. Standar BPOM dan audit kas harian sangat rapi.',
        tags: ['FMCG', 'Ready for Funding', 'Margin >50%', 'Ekspansi'],
        accessStatus: 'NONE',
        bookmarked: false
      },
      {
        id: 'umkm-05',
        name: 'Keripik Tempe Marem',
        code: 'BERU-KRP-05',
        sector: 'Agroindustri & Camilan',
        city: 'Malang',
        establishedYear: 2020,
        fundingTarget: 175000000,
        marginPercentage: 41.0,
        growthYoY: 28.5,
        healthScore: 76,
        certifiedAt: '10 Sep 2026',
        consultantName: 'Dra. Maya Suryani, M.M.',
        pitchSummary: 'Inovasi keripik tempe sagu aneka rasa dengan izin P-IRT dan Halal. Memasok rutin modern market lokal di Malang dan Surabaya.',
        tags: ['Agroindustri', 'Ready for Funding', 'P-IRT', 'Halal'],
        accessStatus: 'PENDING',
        bookmarked: true
      },
      {
        id: 'umkm-07',
        name: 'Batik Lawasan Prabu',
        code: 'BERU-BTK-07',
        sector: 'Fashion & Kriya',
        city: 'Solo',
        establishedYear: 2018,
        fundingTarget: 350000000,
        marginPercentage: 55.4,
        growthYoY: 31.8,
        healthScore: 84,
        certifiedAt: '05 Sep 2026',
        consultantName: 'Rahmat Hidayat, M.B.A.',
        pitchSummary: 'Produksi batik cap & tulis bahan pewarna alam ramah lingkungan dengan ekspor berkala ke Jepang dan Australia. Laporan keuangan terverifikasi.',
        tags: ['Kriya Ekspor', 'Ready for Funding', 'Eco-Friendly', 'Margin >50%'],
        accessStatus: 'NONE',
        bookmarked: false
      },
      {
        id: 'umkm-09',
        name: 'Dapur Rendang Mak Etek',
        code: 'BERU-RDG-09',
        sector: 'F&B (Oleh-oleh & FMCG)',
        city: 'Padang',
        establishedYear: 2020,
        fundingTarget: 220000000,
        marginPercentage: 46.2,
        growthYoY: 38.6,
        healthScore: 81,
        certifiedAt: '01 Sep 2026',
        consultantName: 'Dra. Maya Suryani, M.M.',
        pitchSummary: 'Rendang kemasan retort pouch dengan daya tahan simpan 12 bulan tanpa pengawet. Tersertifikasi HACCP dan sertifikat Halal BPJPH.',
        tags: ['FMCG', 'Ready for Funding', 'HACCP', 'Retort Pouch'],
        accessStatus: 'NONE',
        bookmarked: false
      },
      {
        id: 'umkm-12',
        name: 'Agro Herbal Merapi',
        code: 'BERU-HRB-12',
        sector: 'Agroindustri & Camilan',
        city: 'Yogyakarta',
        establishedYear: 2017,
        fundingTarget: 420000000,
        marginPercentage: 49.0,
        growthYoY: 26.4,
        healthScore: 82,
        certifiedAt: '28 Agu 2026',
        consultantName: 'Bambang Sudarsono, S.E.',
        pitchSummary: 'Pengolahan simplisia jamu dan teh celup herbal organik dari petani lereng Merapi. Memiliki izin edar BPOM TR dan fasilitas lab higienis.',
        tags: ['Agroindustri', 'Ready for Funding', 'Organik', 'BPOM TR'],
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
        const matchCity = state.selectedCity === 'ALL' || item.city.toLowerCase() === state.selectedCity.toLowerCase()
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
          if (Array.isArray(list) && list.length > 0) {
            this.marketplaceList = list
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
      const item = this.marketplaceList.find(m => m.id === umkmId)
      if (item) {
        item.bookmarked = !item.bookmarked
      }
      try {
        await useApi(`/investor/bookmark/${umkmId}`, { method: 'POST' })
      } catch (err: any) {
        console.warn('Gagal sinkron bookmark ke live API:', err?.message)
      }
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
    }
  }
})
