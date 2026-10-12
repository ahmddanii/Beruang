import { defineStore } from 'pinia'

export interface AssessmentAspect {
  id: string
  name: string
  score: number
  maxScore: number
  targetScore: number
  notes: string
  status: 'good' | 'warning' | 'needs_work'
}

export interface ActionPlanTask {
  id: string
  title: string
  description: string
  category: 'Finansial' | 'Operasional' | 'Pemasaran' | 'Legalitas' | 'Tata Kelola'
  completed: boolean
  dueDate: string
  milestoneId: string
  consultantNote?: string
}

export interface Milestone {
  id: string
  title: string
  description: string
  order: number
}

export interface MonthlyRecord {
  month: string
  year: number
  omzet: number
  hpp: number
  opex: number
  netProfit: number
  cashBalance: number
  proofDocumentUrl?: string
  status: 'VERIFIED' | 'PENDING' | 'REJECTED'
  hasAnomaly?: boolean
  anomalyNote?: string
}

export type MonthlyFinancialRecord = MonthlyRecord

export interface InvestorRequest {
  id: string
  investorId: string
  investorName: string
  firmName: string
  avatar?: string
  requestedAt: string
  status: 'PENDING' | 'APPROVED' | 'REJECTED'
  proposedTicket: number
  introMessage: string
  reviewedAt?: string
}

export const useUmkmStore = defineStore('umkm', {
  state: () => ({
    profile: {
      id: 'umkm-01',
      name: 'Kopi Senja Nusantara',
      ownerName: 'Fikri Setiawan',
      ownerAvatarUrl: '/images/user-profile.png',
      sector: 'Kuliner & Minuman (F&B)',
      city: 'Bandung, Jawa Barat',
      establishedYear: 2021,
      outletsCount: 3,
      employeesCount: 14,
      fundingTarget: 250000000,
      pitchSummary: 'Spesialis kopi arabika susu gula aren dengan 3 outlet aktif di Bandung & margin kotor stabil di atas 48%. Menargetkan ekspansi 2 gerai cloud kitchen dan standardisasi roastery terpusat.',
      description: 'Spesialis kopi arabika susu gula aren dengan 3 outlet aktif di Bandung & margin kotor stabil di atas 48%. Menargetkan ekspansi 2 gerai cloud kitchen dan standardisasi roastery terpusat.',
      logoUrl: '/logo.svg',
      bannerUrl: '/images/default-store-banner.jpg',
      nib: '1209000123456',
      npwp: '81.423.891.4-429.000',
      fundingStatus: 'READY_FOR_FUNDING' as 'DRAFT' | 'IN_REVIEW' | 'READY_FOR_FUNDING',
      certifiedAt: '18 September 2026',
      consultantName: 'Dra. Maya Suryani, M.M.'
    },

    assessmentAspects: [
      {
        id: 'fin',
        name: 'Finansial & Arus Kas',
        score: 78,
        maxScore: 100,
        targetScore: 85,
        status: 'good',
        notes: 'Margin kotor di atas 45%, rasio kas sehat untuk 4 bulan operasional. Disiplin pelaporan kas harian sudah membaik.'
      },
      {
        id: 'ops',
        name: 'Operasional & SOP',
        score: 85,
        maxScore: 100,
        targetScore: 80,
        status: 'good',
        notes: 'SOP resep dan penyajian menu F&B sudah terdokumentasi rapi. Kartu stok mingguan sudah berjalan rutin.'
      },
      {
        id: 'mkt',
        name: 'Pasar & Pemasaran',
        score: 64,
        maxScore: 100,
        targetScore: 75,
        status: 'warning',
        notes: 'Basis pelanggan loyal cukup kuat di area kampus, namun perlu diversifikasi strategi pemasaran digital di luar promo ojol.'
      },
      {
        id: 'leg',
        name: 'Legalitas & Izin',
        score: 92,
        maxScore: 100,
        targetScore: 90,
        status: 'good',
        notes: 'NIB RBA terbit, sertifikat Halal BPJPH aktif, izin P-IRT dan sewa lokasi aman untuk 3 tahun ke depan.'
      },
      {
        id: 'gov',
        name: 'Tim & Tata Kelola',
        score: 75,
        maxScore: 100,
        targetScore: 80,
        status: 'good',
        notes: 'Struktur tim gerai jelas dengan Store Leader di tiap cabang. Pembagian kompensasi insentif berbasis target.'
      }
    ] as AssessmentAspect[],

    milestones: [
      { id: 'm1', order: 1, title: 'Fondasi Pencatatan & Legalitas', description: 'Standardisasi rekening usaha, NIB, dan kartu stok' },
      { id: 'm2', order: 2, title: 'Efisiensi Biaya & HPP', description: 'Negosiasi supplier bahan baku dan pengendalian efisiensi produksi' },
      { id: 'm3', order: 3, title: 'Validasi & Sertifikasi Investor', description: '3 bulan pelaporan bersih dan audit kesiapan pendanaan' }
    ] as Milestone[],

    tasks: [
      {
        id: 't-1',
        title: 'Pisahkan Rekening Pribadi dan Usaha',
        description: 'Buka rekening giro khusus operasional warung dan integrasikan mutasi kas.',
        category: 'Finansial',
        completed: true,
        dueDate: '10 Juli 2026',
        milestoneId: 'm1',
        consultantNote: 'Terverifikasi per rekening koran Bank Mandiri.'
      },
      {
        id: 't-2',
        title: 'Lengkapi Izin Edar & NIB Berbasis Risiko',
        description: 'Pastikan KBLI sesuai dan sertifikasi halal gerai terpasang di dinding kasir.',
        category: 'Legalitas',
        completed: true,
        dueDate: '25 Juli 2026',
        milestoneId: 'm1'
      },
      {
        id: 't-3',
        title: 'Standardisasi Kartu Stok Mingguan',
        description: 'Terapkan formulir opname bahan baku setiap Minggu malam di seluruh 3 outlet.',
        category: 'Operasional',
        completed: true,
        dueDate: '15 Agustus 2026',
        milestoneId: 'm2',
        consultantNote: 'Selisih stok bahan baku kini di bawah batas wajar 2%.'
      },
      {
        id: 't-4',
        title: 'Perbarui Kontrak Supplier Bahan Baku & Kemasan Gerai',
        description: 'Kunci harga bahan baku 6 bulan ke depan untuk cegah lonjakan modal produksi mendadak.',
        category: 'Finansial',
        completed: true,
        dueDate: '30 Agustus 2026',
        milestoneId: 'm2'
      },
      {
        id: 't-5',
        title: 'Input Progres Finansial Rutin Bulan September',
        description: 'Unggah rekapitulasi penjualan POS dan bukti rekening koran bulan September.',
        category: 'Finansial',
        completed: true,
        dueDate: '05 Oktober 2026',
        milestoneId: 'm3'
      },
      {
        id: 't-6',
        title: 'Simulasi Pitching & Data Room Briefing',
        description: 'Diskusi bersama konsultan mengenai data privat yang dibuka untuk investor.',
        category: 'Tata Kelola',
        completed: false,
        dueDate: '12 Oktober 2026',
        milestoneId: 'm3',
        consultantNote: 'Fokus pada proyeksi payback period 18 bulan.'
      }
    ] as ActionPlanTask[],

    monthlyRecords: [
      {
        month: 'Januari',
        year: 2026,
        omzet: 42000000,
        hpp: 19000000,
        opex: 11000000,
        netProfit: 12000000,
        cashBalance: 28000000,
        status: 'VERIFIED'
      },
      {
        month: 'Februari',
        year: 2026,
        omzet: 45000000,
        hpp: 20500000,
        opex: 11500000,
        netProfit: 13000000,
        cashBalance: 33000000,
        status: 'VERIFIED'
      },
      {
        month: 'Maret',
        year: 2026,
        omzet: 49000000,
        hpp: 22000000,
        opex: 12000000,
        netProfit: 15000000,
        cashBalance: 39000000,
        status: 'VERIFIED'
      },
      {
        month: 'April',
        year: 2026,
        omzet: 53000000,
        hpp: 24000000,
        opex: 12500000,
        netProfit: 16500000,
        cashBalance: 45000000,
        status: 'VERIFIED'
      },
      {
        month: 'Mei',
        year: 2026,
        omzet: 58000000,
        hpp: 26000000,
        opex: 13500000,
        netProfit: 18500000,
        cashBalance: 52000000,
        status: 'VERIFIED'
      },
      {
        month: 'Juni',
        year: 2026,
        omzet: 64000000,
        hpp: 28500000,
        opex: 14500000,
        netProfit: 21000000,
        cashBalance: 59000000,
        status: 'VERIFIED'
      },
      {
        month: 'Juli',
        year: 2026,
        omzet: 72000000,
        hpp: 32000000,
        opex: 16000000,
        netProfit: 24000000,
        cashBalance: 66000000,
        status: 'VERIFIED'
      },
      {
        month: 'Agustus',
        year: 2026,
        omzet: 82000000,
        hpp: 36500000,
        opex: 17500000,
        netProfit: 28000000,
        cashBalance: 71000000,
        status: 'VERIFIED'
      },
      {
        month: 'September',
        year: 2026,
        omzet: 91000000,
        hpp: 40500000,
        opex: 19000000,
        netProfit: 31500000,
        cashBalance: 74000000,
        status: 'VERIFIED'
      },
      {
        month: 'Oktober',
        year: 2026,
        omzet: 100000000,
        hpp: 45100000,
        opex: 22300000,
        netProfit: 32600000,
        cashBalance: 75500000,
        status: 'VERIFIED',
        hasAnomaly: false,
        anomalyNote: 'Proporsi modal bahan dan operasional harian berada dalam batas aman evaluasi sistem.'
      }
    ] as MonthlyRecord[],

    investorRequests: [
      {
        id: 'req-01',
        investorId: 'inv-101',
        investorName: 'Hendro Wicaksono',
        firmName: 'Nusantara Angel Syndicate',
        avatar: '',
        requestedAt: '22 September 2026',
        status: 'APPROVED',
        proposedTicket: 150000000,
        introMessage: 'Halo Mas Budi, kami melihat pertumbuhan gerai Kopi Senja sangat konsisten di Bandung. Kami berminat mendanai ekspansi 2 cloud kitchen baru dengan skema bagi hasil/equity.',
        reviewedAt: '23 September 2026'
      },
      {
        id: 'req-02',
        investorId: 'inv-102',
        investorName: 'Pratama Kusuma',
        firmName: 'Jawa Maju Ventures',
        avatar: '',
        requestedAt: '25 September 2026',
        status: 'PENDING',
        proposedTicket: 100000000,
        introMessage: 'Tertarik dengan model roastery efisien dan margin sehat. Ingin meninjau rekening koran dan proyeksi cashflow.'
      }
    ] as InvestorRequest[]
  }),

  getters: {
    overallHealthScore: (state) => {
      const total = state.assessmentAspects.reduce((acc, a) => acc + a.score, 0)
      return Math.round(total / state.assessmentAspects.length)
    },
    tasksCompletedCount: (state) => {
      return state.tasks.filter(t => t.completed).length
    },
    tasksProgressPct: (state) => {
      if (state.tasks.length === 0) return 0
      const done = state.tasks.filter(t => t.completed).length
      return Math.round((done / state.tasks.length) * 100)
    },
    latestMonthlyRecord: (state) => {
      return state.monthlyRecords[state.monthlyRecords.length - 1]
    }
  },

  actions: {
    toggleTask(taskId: string) {
      const task = this.tasks.find(t => t.id === taskId)
      if (task) {
        task.completed = !task.completed
      }
    },

    addMonthlyProgress(record: Omit<MonthlyRecord, 'status'>) {
      this.monthlyRecords.push({
        ...record,
        status: 'PENDING'
      })
    },

    updateInvestorRequestStatus(requestId: string, status: 'APPROVED' | 'REJECTED') {
      const req = this.investorRequests.find(r => r.id === requestId)
      if (req) {
        req.status = status
        req.reviewedAt = new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })
      }
    },

    updateProfileBanner(bannerUrl: string) {
      this.profile.bannerUrl = bannerUrl
      if (typeof window !== 'undefined') {
        try {
          localStorage.setItem('umkm_banner_url', bannerUrl)
        } catch (e) {
          console.warn('Gagal menyimpan banner ke localStorage', e)
        }
      }
    },

    resetProfileBanner() {
      this.profile.bannerUrl = '/images/default-store-banner.jpg'
      if (typeof window !== 'undefined') {
        try {
          localStorage.removeItem('umkm_banner_url')
        } catch (e) {
          console.warn('Gagal mereset banner di localStorage', e)
        }
      }
    },

    initBannerFromStorage() {
      if (typeof window !== 'undefined') {
        try {
          const saved = localStorage.getItem('umkm_banner_url')
          if (saved) {
            this.profile.bannerUrl = saved
          }
        } catch (e) {
          // Ignore error
        }
      }
    },

    updateOwnerAvatar(avatarUrl: string) {
      this.profile.ownerAvatarUrl = avatarUrl
      if (typeof window !== 'undefined') {
        try {
          localStorage.setItem('umkm_avatar_url', avatarUrl)
        } catch (e) {
          console.warn('Gagal menyimpan avatar ke localStorage', e)
        }
      }
    },

    resetOwnerAvatar() {
      this.profile.ownerAvatarUrl = '/images/user-profile.png'
      if (typeof window !== 'undefined') {
        try {
          localStorage.removeItem('umkm_avatar_url')
        } catch (e) {
          console.warn('Gagal mereset avatar di localStorage', e)
        }
      }
    },

    initAvatarFromStorage() {
      if (typeof window !== 'undefined') {
        try {
          const saved = localStorage.getItem('umkm_avatar_url')
          if (saved) {
            this.profile.ownerAvatarUrl = saved
          }
        } catch (e) {
          // Ignore error
        }
      }
    },

    updateQuickProfile(name: string, description: string) {
      if (name.trim()) {
        this.profile.name = name.trim()
      }
      this.profile.pitchSummary = description.trim()
      this.profile.description = description.trim()

      if (typeof window !== 'undefined') {
        try {
          localStorage.setItem('umkm_profile_name', this.profile.name)
          localStorage.setItem('umkm_profile_desc', this.profile.description)
        } catch (e) {
          console.warn('Gagal menyimpan profil UMKM ke localStorage', e)
        }
      }
    },

    initQuickProfileFromStorage() {
      if (typeof window !== 'undefined') {
        try {
          const savedName = localStorage.getItem('umkm_profile_name')
          const savedDesc = localStorage.getItem('umkm_profile_desc')
          if (savedName) this.profile.name = savedName
          if (savedDesc) {
            this.profile.pitchSummary = savedDesc
            this.profile.description = savedDesc
          }
        } catch (e) {
          // ignore
        }
      }
    }
  }
})
