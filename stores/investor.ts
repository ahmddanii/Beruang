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

const INITIAL_CURATED_UMKM: MarketplaceUmkm[] = [
  {
    id: 'umkm-01',
    name: 'Kopi Senja Nusantara',
    code: 'BERU-KOP-01',
    sector: 'F&B (Coffee & Drinks)',
    city: 'Bandung',
    establishedYear: 2021,
    postedAt: '2 jam yang lalu',
    fundingTarget: 250000000,
    marginPercentage: 48.5,
    growthYoY: 34.2,
    healthScore: 79,
    certifiedAt: '18 Sep 2026',
    consultantName: 'Dra. Maya Suryani, M.M.',
    pitchSummary: 'Spesialis kopi arabika-robusta dengan 3 gerai offline di Bandung. Margin kotor konsisten di atas 48% dengan SOP barista standar.',
    postImageUrl: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=900&auto=format&fit=crop&q=80',
    postImages: [
      'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=900&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=900&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1511920170033-f8396924c348?w=900&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=900&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=900&auto=format&fit=crop&q=80'
    ],
    postAspectRatio: '3:4',
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
    postedAt: '5 jam yang lalu',
    fundingTarget: 500000000,
    marginPercentage: 52.0,
    growthYoY: 42.0,
    healthScore: 88,
    certifiedAt: '15 Sep 2026',
    consultantName: 'Bambang Sudarsono, S.E.',
    pitchSummary: 'Pabrikasi sambal kemasan botol higienis dengan distribusi 120+ toko oleh-oleh se-Jawa Timur. Standar BPOM dan pencatatan kas harian sangat rapi.',
    postImageUrl: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=900&auto=format&fit=crop&q=80',
    postImages: [
      'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=900&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=900&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=900&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=900&auto=format&fit=crop&q=80'
    ],
    postAspectRatio: '3:4',
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
    postedAt: 'Kemarin • 16:40 WIB',
    fundingTarget: 175000000,
    marginPercentage: 41.0,
    growthYoY: 28.5,
    healthScore: 76,
    certifiedAt: '10 Sep 2026',
    consultantName: 'Dra. Maya Suryani, M.M.',
    pitchSummary: 'Inovasi keripik tempe sagu aneka rasa dengan izin P-IRT dan Halal. Memasok rutin modern market lokal di Malang dan Surabaya.',
    postImageUrl: 'https://images.unsplash.com/photo-1599490659213-e2b9527bd087?w=900&auto=format&fit=crop&q=80',
    postImages: [
      'https://images.unsplash.com/photo-1599490659213-e2b9527bd087?w=900&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=900&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1621996346565-e3d5d6281298?w=900&auto=format&fit=crop&q=80'
    ],
    postAspectRatio: '3:4',
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
    postedAt: '2 hari yang lalu',
    fundingTarget: 350000000,
    marginPercentage: 55.4,
    growthYoY: 31.8,
    healthScore: 84,
    certifiedAt: '05 Sep 2026',
    consultantName: 'Rahmat Hidayat, M.B.A.',
    pitchSummary: 'Produksi batik cap & tulis bahan pewarna alam ramah lingkungan dengan ekspor berkala ke Jepang dan Australia. Laporan keuangan terverifikasi.',
    postImageUrl: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=900&auto=format&fit=crop&q=80',
    postImages: [
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=900&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=900&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=900&auto=format&fit=crop&q=80'
    ],
    postAspectRatio: '3:4',
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
    postedAt: '3 hari yang lalu',
    fundingTarget: 220000000,
    marginPercentage: 46.2,
    growthYoY: 38.6,
    healthScore: 81,
    certifiedAt: '01 Sep 2026',
    consultantName: 'Dra. Maya Suryani, M.M.',
    pitchSummary: 'Rendang kemasan retort pouch dengan daya tahan simpan 12 bulan tanpa pengawet. Tersertifikasi HACCP dan sertifikat Halal BPJPH.',
    postImageUrl: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=900&auto=format&fit=crop&q=80',
    postImages: [
      'https://images.unsplash.com/photo-1544025162-d76694265947?w=900&auto=format&fit=crop&q=80'
    ],
    postAspectRatio: '3:4',
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
    postedAt: '4 hari yang lalu',
    fundingTarget: 420000000,
    marginPercentage: 49.0,
    growthYoY: 26.4,
    healthScore: 82,
    certifiedAt: '28 Agu 2026',
    consultantName: 'Bambang Sudarsono, S.E.',
    pitchSummary: 'Pengolahan simplisia jamu dan teh celup herbal organik dari petani lereng Merapi. Memiliki izin edar BPOM TR dan fasilitas lab higienis.',
    postImageUrl: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=900&auto=format&fit=crop&q=80',
    postImages: [
      'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=900&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=900&auto=format&fit=crop&q=80'
    ],
    postAspectRatio: '3:4',
    tags: ['Agroindustri', 'Ready for Funding', 'Organik', 'BPOM TR'],
    accessStatus: 'NONE',
    bookmarked: false
  }
]

const SAMPLE_UMKM_PREFIXES = [
  'Roastery Kopi', 'Dapur Nusantara', 'Sentra Kriya', 'Batik Pusaka', 'Kebun Organik',
  'Cokelat Artisan', 'Tenun Ikat', 'Keripik Singkong', 'Bakpia Kukus', 'Gelato Tropis',
  'Roti Gandum', 'Madu Hutan', 'Teh Rempah', 'Olahan Laut', 'Konveksi Linen',
  'Susu Fermentasi', 'Abon Sapi', 'Kopi Arabika', 'Anyaman Rotan', 'Bumbu Instan',
  'Sari Buah', 'Kue Lapis', 'Dendeng Balado', 'Kriya Kayu'
]

const SAMPLE_UMKM_SUFFIXES = [
  'Lestari', 'Mandiri', 'Nusantara', 'Berkah', 'Sejahtera', 'Abadi',
  'Kencana', 'Pratama', 'Jaya', 'Sentosa', 'Utama', 'Murni'
]

const SAMPLE_CITIES = [
  'Bandung', 'Surabaya', 'Malang', 'Solo', 'Yogyakarta', 'Jakarta',
  'Semarang', 'Bogor', 'Tangerang', 'Bekasi', 'Depok', 'Cirebon',
  'Medan', 'Padang', 'Palembang', 'Pekanbaru', 'Bandar Lampung', 'Batam',
  'Denpasar', 'Badung', 'Gianyar', 'Mataram', 'Balikpapan', 'Samarinda',
  'Banjarmasin', 'Pontianak', 'Makassar', 'Manado', 'Ambon', 'Jayapura'
]

const SAMPLE_SECTORS = [
  'F&B (Coffee & Drinks)',
  'F&B (Oleh-oleh & FMCG)',
  'Agroindustri & Camilan',
  'Fashion & Kriya',
  'Pertanian & Agribisnis',
  'Jasa & Perdagangan Ritel'
]

const SAMPLE_CONSULTANTS = [
  'Dra. Maya Suryani, M.M.',
  'Bambang Sudarsono, S.E.',
  'Rahmat Hidayat, M.B.A.',
  'Hendra Wijaya, CFA',
  'Siti Aminah, Ak., CA.',
  'Dr. Arif Budiman, M.Ec.'
]

const SAMPLE_IMAGE_SETS: string[][] = [
  [
    'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=900&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=900&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1511920170033-f8396924c348?w=900&auto=format&fit=crop&q=80'
  ],
  [
    'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=900&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=900&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=900&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=900&auto=format&fit=crop&q=80'
  ],
  [
    'https://images.unsplash.com/photo-1599490659213-e2b9527bd087?w=900&auto=format&fit=crop&q=80'
  ],
  [
    'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=900&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=900&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=900&auto=format&fit=crop&q=80'
  ],
  [
    'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=900&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=900&auto=format&fit=crop&q=80'
  ],
  [
    'https://images.unsplash.com/photo-1544025162-d76694265947?w=900&auto=format&fit=crop&q=80'
  ]
]

export function build150MarketplaceUmkms(): MarketplaceUmkm[] {
  const generated: MarketplaceUmkm[] = [...INITIAL_CURATED_UMKM]

  for (let i = 7; i <= 150; i++) {
    const idx = i - 7
    const prefix = SAMPLE_UMKM_PREFIXES[idx % SAMPLE_UMKM_PREFIXES.length]!
    const suffix = SAMPLE_UMKM_SUFFIXES[Math.floor(idx / SAMPLE_UMKM_PREFIXES.length) % SAMPLE_UMKM_SUFFIXES.length]!
    const city = SAMPLE_CITIES[idx % SAMPLE_CITIES.length]!
    const sector = SAMPLE_SECTORS[idx % SAMPLE_SECTORS.length]!
    const consultant = SAMPLE_CONSULTANTS[idx % SAMPLE_CONSULTANTS.length]!
    const imgs = SAMPLE_IMAGE_SETS[idx % SAMPLE_IMAGE_SETS.length]!
    const hoursAgo = (idx % 23) + 1
    const daysAgo = Math.floor(idx / 12) + 1
    const postedAt = idx < 24 ? `${hoursAgo} jam yang lalu` : `${daysAgo} hari yang lalu`

    generated.push({
      id: `umkm-${String(i + 10).padStart(3, '0')}`,
      name: `${prefix} ${suffix} ${city}`,
      code: `BERU-UMK-${String(i + 10).padStart(3, '0')}`,
      sector,
      city,
      establishedYear: 2016 + (idx % 9),
      postedAt,
      fundingTarget: (150 + (idx % 12) * 35) * 1000000,
      marginPercentage: 38 + (idx % 18),
      growthYoY: 22 + (idx % 24),
      healthScore: 76 + (idx % 18),
      certifiedAt: `${(idx % 28) + 1} Sep 2026`,
      consultantName: consultant,
      pitchSummary: `Unit usaha ${prefix.toLowerCase()} unggulan di ${city} dengan pertumbuhan kas bulanan stabil, distribusi ritel aktif di ${2 + (idx % 6)} gerai mitra, serta dokumen perizinan resmi terverifikasi.`,
      postImageUrl: imgs[0]!,
      postImages: [...imgs],
      postAspectRatio: '3:4',
      tags: [sector.split(' ')[0] || 'UMKM', 'Ready for Funding', 'Terverifikasi'],
      accessStatus: idx % 5 === 0 ? 'APPROVED' : 'NONE',
      bookmarked: idx % 14 === 0
    })
  }

  return generated
}

export const useInvestorStore = defineStore('investor', {
  state: () => ({
    searchQuery: '',
    selectedSector: 'ALL',
    selectedCity: 'ALL',
    selectedCities: [] as string[],
    minMargin: 0,
    selectedTicketSize: 'ALL',

    profile: {
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
      email: 'fikri@nusantarakapital.co.id',
      whatsapp: '+62 811-9283-7465',
      website: 'nusantarakapital.co.id',
      npwpEntity: '02.918.374.1-012.000',
      nibEntity: '9120301928374',
      description: 'Fokus mendanai ekspansi gerai dan peningkatan kapasitas produksi UMKM sektor F&B, FMCG, dan Agroindustri di Indonesia yang memiliki pencatatan kas rapi dan telah divalidasi oleh konsultan pendamping resmi.'
    } as InvestorProfile,

    marketplaceList: build150MarketplaceUmkms(),

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

    updateInvestorProfile(payload: Partial<InvestorProfile>) {
      this.profile = { ...this.profile, ...payload }
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
      if (this.marketplaceList.length < 150) {
        const full150 = build150MarketplaceUmkms()
        for (const item of full150) {
          if (!this.marketplaceList.some(m => m.id === item.id)) {
            this.marketplaceList.push(item)
          }
        }
      }
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
