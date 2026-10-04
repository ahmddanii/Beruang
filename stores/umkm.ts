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
      sector: 'Kuliner & Minuman (F&B)',
      city: 'Bandung, Jawa Barat',
      establishedYear: 2021,
      outletsCount: 3,
      employeesCount: 14,
      fundingTarget: 250000000,
      pitchSummary: 'Spesialis kopi arabika susu gula aren dengan 3 outlet aktif di Bandung & margin kotor stabil di atas 48%. Menargetkan ekspansi 2 gerai cloud kitchen dan standardisasi roastery terpusat.',
      logoUrl: '/logo.svg',
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
        notes: 'SOP resep dan penyajian barista sudah terdokumentasi rapi. Kartu stok mingguan sudah berjalan rutin.'
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
      { id: 'm2', order: 2, title: 'Efisiensi Biaya & HPP', description: 'Negosiasi supplier biji kopi dan pengendalian pemborosan resep' },
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
        consultantNote: 'Variance susu dan gula kini di bawah 2%.'
      },
      {
        id: 't-4',
        title: 'Perbarui Kontrak Supplier Biji Kopi Robusta & Arabika',
        description: 'Kunci harga bahan baku 6 bulan ke depan untuk cegah lonjakan HPP mendadak.',
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
        month: 'Mei',
        year: 2026,
        omzet: 46000000,
        hpp: 21000000,
        opex: 12000000,
        netProfit: 13000000,
        cashBalance: 32000000,
        status: 'VERIFIED'
      },
      {
        month: 'Juni',
        year: 2026,
        omzet: 52000000,
        hpp: 23500000,
        opex: 13000000,
        netProfit: 15500000,
        cashBalance: 41000000,
        status: 'VERIFIED'
      },
      {
        month: 'Juli',
        year: 2026,
        omzet: 58000000,
        hpp: 26000000,
        opex: 14000000,
        netProfit: 18000000,
        cashBalance: 52000000,
        status: 'VERIFIED'
      },
      {
        month: 'Agustus',
        year: 2026,
        omzet: 65000000,
        hpp: 29000000,
        opex: 15000000,
        netProfit: 21000000,
        cashBalance: 66000000,
        status: 'VERIFIED'
      },
      {
        month: 'September',
        year: 2026,
        omzet: 73000000,
        hpp: 34500000,
        opex: 16500000,
        netProfit: 22000000,
        cashBalance: 78000000,
        status: 'VERIFIED',
        hasAnomaly: true,
        anomalyNote: 'HPP naik 12% dari kenaikan harga biji kopi Jawa Barat. Telah diantisipasi dengan penyesuaian menu combo.'
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
    }
  }
})
