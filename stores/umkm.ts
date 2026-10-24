import { defineStore } from 'pinia'
import { useApi } from '~/composables/useApi'

export interface AssessmentAspect {
  id: string
  name: string
  score: number
  maxScore: number
  targetScore: number
  notes: string
  status: 'good' | 'warning' | 'needs_work'
}

export interface TaskStep {
  id: string
  title: string
  completed: boolean
}

export interface ActionPlanTask {
  id: string
  title: string
  description: string
  category: 'Finansial' | 'Operasional' | 'Pemasaran' | 'Legalitas' | 'Tata Kelola'
  completed: boolean
  status?: 'TODO' | 'IN_PROGRESS' | 'DONE'
  dueDate: string
  milestoneId: string
  consultantNote?: string
  steps?: TaskStep[]
}

export interface Milestone {
  id: string
  title: string
  description: string
  order: number
}

export interface UmkmBranch {
  id: string
  name: string
  location: string
  address: string
  city: string
  isPrimary?: boolean
  shareRatio?: number
  establishedYear?: number
}

export interface MonthlyRecord {
  month: string
  year: number
  omzet: number
  hpp: number
  opex: number
  loss?: number
  netProfit: number
  cashBalance: number
  proofDocumentUrl?: string
  proofDocumentName?: string
  proofDocumentSize?: string
  uploadedAt?: string
  notes?: string
  status: 'VERIFIED' | 'PENDING' | 'REJECTED'
  hasAnomaly?: boolean
  anomalyNote?: string
}

export type MonthlyFinancialRecord = MonthlyRecord

export interface DailyTransaction {
  id: string
  date: string
  title: string
  category: 'PEMASUKAN' | 'MODAL_JUALAN' | 'OPERASIONAL'
  amount: number
  paymentMethod: 'QRIS' | 'TRANSFER' | 'TUNAI'
  status: 'VERIFIED' | 'PENDING'
  notes?: string
  receiptNumber?: string
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

export interface FundingGateCriterion {
  id: string
  title: string
  description: string
  passed: boolean
  currentValue: any
  targetValue: any
  statusLabel: string
}

export interface FundingGateData {
  passedCount: number
  totalCount: number
  isReadyForFunding: boolean
  status: string
  certifiedAt: string | null
  consultantName: string
  fundingTarget: number
  pendingRequestsCount: number
  criteria: FundingGateCriterion[]
}

export interface UmkmBusinessProfile {
  id: string
  name: string
  brand?: string
  ownerName: string
  owner_name?: string
  ownerAvatarUrl?: string
  sector: string
  city: string
  establishedYear: number
  established_year?: number
  outletsCount: number
  outlets_count?: number
  employeesCount: number
  employees_count?: number
  fundingTarget: number
  funding_target?: number
  equityOffered?: string
  equity_offered?: string
  pitchSummary?: string
  description?: string
  logoUrl?: string
  bannerUrl?: string
  nib?: string
  npwp?: string
  fundingStatus?: 'DRAFT' | 'IN_REVIEW' | 'READY_FOR_FUNDING' | string
  status?: string
  certifiedAt?: string
  consultantName?: string
  [key: string]: any
}

export interface FinanceSummary {
  cashBalance: number
  totalIncomeMonth: number
  totalCogsMonth: number
  totalOpexMonth: number
  netProfitMonth: number
  marginPercentage: number
  marginStatus: 'SEHAT' | 'WASPADA' | 'KRITIS' | string
}

export const DEMO_UMKM_PROFILE: UmkmBusinessProfile = {
  id: 'umkm-01',
  name: 'Kopi Senja Nusantara',
  brand: 'Kopi Senja Nusantara',
  ownerName: 'Fikri Setiawan',
  owner_name: 'Fikri Setiawan',
  ownerAvatarUrl: '',
  sector: 'Kuliner & Minuman (F&B)',
  city: 'Bandung, Jawa Barat',
  establishedYear: 2021,
  outletsCount: 3,
  employeesCount: 14,
  fundingTarget: 250000000,
  pitchSummary: 'Spesialis kopi arabika susu gula aren dengan 3 outlet aktif di Bandung & margin kotor stabil di atas 48%. Menargetkan ekspansi 2 gerai cloud kitchen dan standardisasi roastery terpusat.',
  description: 'Spesialis kopi arabika susu gula aren dengan 3 outlet aktif di Bandung & margin kotor stabil di atas 48%. Menargetkan ekspansi 2 gerai cloud kitchen dan standardisasi roastery terpusat.',
  logoUrl: '/logo.svg',
  bannerUrl: '',
  nib: '1209000123456',
  npwp: '81.423.891.4-429.000',
  fundingStatus: 'READY_FOR_FUNDING',
  certifiedAt: '18 September 2026',
  consultantName: 'Dra. Maya Suryani, M.M.'
}

export const CLEAN_UMKM_PROFILE: UmkmBusinessProfile = {
  id: '',
  name: '',
  brand: '',
  ownerName: '',
  owner_name: '',
  ownerAvatarUrl: '',
  sector: '',
  city: '',
  establishedYear: null,
  outletsCount: 1,
  employeesCount: 1,
  fundingTarget: 0,
  pitchSummary: '',
  description: '',
  logoUrl: '/logo.svg',
  bannerUrl: '',
  nib: '',
  npwp: '',
  fundingStatus: 'DRAFT',
  certifiedAt: '',
  consultantName: ''
}

export const DEMO_FINANCE_SUMMARY: FinanceSummary = {
  cashBalance: 75500000,
  totalIncomeMonth: 100000000,
  totalCogsMonth: 45100000,
  totalOpexMonth: 22300000,
  netProfitMonth: 32600000,
  marginPercentage: 32.6,
  marginStatus: 'SEHAT'
}

export const CLEAN_FINANCE_SUMMARY: FinanceSummary = {
  cashBalance: 0,
  totalIncomeMonth: 0,
  totalCogsMonth: 0,
  totalOpexMonth: 0,
  netProfitMonth: 0,
  marginPercentage: 0,
  marginStatus: 'BELUM_ADA_DATA'
}

export const DEMO_MONTHLY_RECORDS: MonthlyRecord[] = [
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
    proofDocumentName: 'Mutasi_Kasir_POS_Agustus_2026.pdf',
    proofDocumentSize: '2.1 MB',
    uploadedAt: '02 Sep 2026',
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
    proofDocumentName: 'Rekening_Koran_Mandiri_Sept2026.pdf',
    proofDocumentSize: '2.4 MB',
    uploadedAt: '03 Okt 2026',
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
    proofDocumentName: 'Rekap_POS_BukuKas_Okt2026.pdf',
    proofDocumentSize: '3.1 MB',
    uploadedAt: '18 Okt 2026',
    status: 'VERIFIED',
    hasAnomaly: false,
    anomalyNote: 'Proporsi modal bahan dan operasional harian berada dalam batas aman evaluasi sistem.'
  }
]

export const DEMO_INVESTOR_REQUESTS: InvestorRequest[] = [
  {
    id: 'req-01',
    investorId: 'inv-101',
    investorName: 'Hendro Wicaksono',
    firmName: 'Nusantara Angel Syndicate',
    avatar: '',
    requestedAt: '22 September 2026',
    status: 'APPROVED',
    proposedTicket: 150000000,
    introMessage: 'Halo Mas Fikri, kami melihat pertumbuhan gerai Kopi Senja sangat konsisten di Bandung. Kami berminat mendanai ekspansi 2 cloud kitchen baru dengan skema bagi hasil/equity.',
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
]

export const DEMO_DAILY_TRANSACTIONS: DailyTransaction[] = [
  {
    id: 'tx-01',
    date: '15 Oktober 2026',
    title: 'Penjualan Kopi Susu Aren POS Kasir',
    category: 'PEMASUKAN',
    amount: 3850000,
    paymentMethod: 'QRIS',
    status: 'VERIFIED',
    receiptNumber: 'INV/20261015/POS/089',
    notes: 'Rekap harian kasir 3 gerai aktif'
  },
  {
    id: 'tx-02',
    date: '14 Oktober 2026',
    title: 'Biji Kopi Arabika Malabar 25kg (Bahan Baku)',
    category: 'MODAL_JUALAN',
    amount: 3250000,
    paymentMethod: 'TRANSFER',
    status: 'VERIFIED',
    receiptNumber: 'PO/20261014/MALABAR/012',
    notes: 'Restock mingguan roastery supplier Malabar'
  },
  {
    id: 'tx-03',
    date: '13 Oktober 2026',
    title: 'Susu Fresh Milk Pasteurisasi 60 Liter',
    category: 'MODAL_JUALAN',
    amount: 1140000,
    paymentMethod: 'TRANSFER',
    status: 'VERIFIED',
    receiptNumber: 'INV/20261013/MILK/45',
    notes: 'Pasokan harian susu murni peternak Lembang'
  },
  {
    id: 'tx-04',
    date: '12 Oktober 2026',
    title: 'Tagihan Listrik PLN & Wi-Fi Gerai Cabang Dago',
    category: 'OPERASIONAL',
    amount: 2450000,
    paymentMethod: 'TRANSFER',
    status: 'VERIFIED',
    receiptNumber: 'PLN/20261012/DAGO/981',
    notes: 'Beban operasional rutin bulanan'
  },
  {
    id: 'tx-05',
    date: '11 Oktober 2026',
    title: 'Penjualan Weekend Dine-in & Takeaway Cabang 1 & 2',
    category: 'PEMASUKAN',
    amount: 5200000,
    paymentMethod: 'QRIS',
    status: 'VERIFIED',
    receiptNumber: 'INV/20261011/POS/102',
    notes: 'Lonjakan pesanan promo akhir pekan'
  },
  {
    id: 'tx-06',
    date: '10 Oktober 2026',
    title: 'Pengadaan Cup Biodegradable & Paper Straw',
    category: 'MODAL_JUALAN',
    amount: 880000,
    paymentMethod: 'TUNAI',
    status: 'VERIFIED',
    receiptNumber: 'NOTA/20261010/CUP/21',
    notes: 'Kemasan takeaway 1.000 pcs'
  },
  {
    id: 'tx-07',
    date: '09 Oktober 2026',
    title: 'Maintenance Rutin Mesin Espresso Simonelli',
    category: 'OPERASIONAL',
    amount: 750000,
    paymentMethod: 'TUNAI',
    status: 'VERIFIED',
    receiptNumber: 'SRV/20261009/TECH/07',
    notes: 'Descaling dan pergantian gasket seal'
  },
  {
    id: 'tx-08',
    date: '08 Oktober 2026',
    title: 'Penjualan Hari Kerja (Senin - Rabu)',
    category: 'PEMASUKAN',
    amount: 4120000,
    paymentMethod: 'QRIS',
    status: 'VERIFIED',
    receiptNumber: 'INV/20261008/POS/067',
    notes: 'Kasir online terhubung mPOS'
  }
]

export const useUmkmStore = defineStore('umkm', {
  state: () => ({
    financeSummary: { ...CLEAN_FINANCE_SUMMARY } as FinanceSummary,

    profile: { ...CLEAN_UMKM_PROFILE } as UmkmBusinessProfile,

    branches: [
      {
        id: 'branch-1',
        name: 'Cabang Utama Riau',
        location: 'Bandung',
        address: 'Jl. R.E. Martadinata No. 45, Citarum, Bandung',
        city: 'Bandung',
        isPrimary: true,
        shareRatio: 0.45,
        establishedYear: 2021
      },
      {
        id: 'branch-2',
        name: 'Cabang Dago Heritage',
        location: 'Bandung',
        address: 'Jl. Ir. H. Juanda No. 102, Dago, Bandung',
        city: 'Bandung',
        isPrimary: false,
        shareRatio: 0.35,
        establishedYear: 2023
      },
      {
        id: 'branch-3',
        name: 'Cabang Sudirman Walk',
        location: 'Jakarta Selatan',
        address: 'Jl. Jend. Sudirman Kav. 52, SCBD, Jakarta Selatan',
        city: 'Jakarta Selatan',
        isPrimary: false,
        shareRatio: 0.20,
        establishedYear: 2024
      }
    ] as UmkmBranch[],

    selectedBranchIds: [] as string[],

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
        consultantNote: 'Terverifikasi per rekening koran Bank Mandiri.',
        steps: [
          { id: 's1-1', title: 'Buka rekening giro operasional khusus atas nama usaha di bank mitra', completed: true },
          { id: 's1-2', title: 'Integrasikan pencatatan kas harian dan mutasi rekening toko', completed: true },
          { id: 's1-3', title: 'Terapkan pemisahan kas fisik di laci kasir dari dompet pribadi', completed: true }
        ]
      },
      {
        id: 't-2',
        title: 'Lengkapi Izin Edar & NIB Berbasis Risiko',
        description: 'Pastikan KBLI sesuai dan sertifikasi halal gerai terpasang di dinding kasir.',
        category: 'Legalitas',
        completed: true,
        dueDate: '25 Juli 2026',
        milestoneId: 'm1',
        steps: [
          { id: 's2-1', title: 'Perbarui nomor KBLI 56303 (Kedai Minuman/Kopi) di sistem OSS RBA', completed: true },
          { id: 's2-2', title: 'Unggah berkas permohonan sertifikasi halal BPJPH & audit bahan', completed: true },
          { id: 's2-3', title: 'Cetak dan pasang sertifikat legalitas resmi di dinding gerai utama', completed: true }
        ]
      },
      {
        id: 't-3',
        title: 'Standardisasi Kartu Stok Mingguan',
        description: 'Terapkan formulir opname bahan baku setiap Minggu malam di seluruh 3 outlet.',
        category: 'Operasional',
        completed: true,
        dueDate: '15 Agustus 2026',
        milestoneId: 'm2',
        consultantNote: 'Selisih stok bahan baku kini di bawah batas wajar 2%.',
        steps: [
          { id: 's3-1', title: 'Buat formulir checklist opname stok harian/mingguan untuk barista', completed: true },
          { id: 's3-2', title: 'Latih tim gerai cara menghitung sisa biji kopi, susu, dan sirup', completed: true },
          { id: 's3-3', title: 'Evaluasi selisih stok bahan baku (waste) mingguan agar di bawah 2%', completed: true }
        ]
      },
      {
        id: 't-4',
        title: 'Perbarui Kontrak Supplier Bahan Baku & Kemasan Gerai',
        description: 'Kunci harga bahan baku 6 bulan ke depan untuk cegah lonjakan modal produksi mendadak.',
        category: 'Finansial',
        completed: true,
        dueDate: '30 Agustus 2026',
        milestoneId: 'm2',
        steps: [
          { id: 's4-1', title: 'Negosiasi harga pembelian kuantiti biji kopi arabika ke supplier', completed: true },
          { id: 's4-2', title: 'Kunci kontrak pasokan kemasan ramah lingkungan untuk 6 bulan ke depan', completed: true },
          { id: 's4-3', title: 'Tetapkan jadwal dan alur pembayaran tempo supplier (termin H+14)', completed: true }
        ]
      },
      {
        id: 't-5',
        title: 'Input Progres Finansial Rutin Bulan September',
        description: 'Unggah rekapitulasi penjualan POS dan bukti rekening koran bulan September.',
        category: 'Finansial',
        completed: true,
        dueDate: '05 Oktober 2026',
        milestoneId: 'm3',
        steps: [
          { id: 's5-1', title: 'Rekapitulasi total mutasi uang masuk mesin POS kasir bulan September', completed: true },
          { id: 's5-2', title: 'Unduh dan validasi mutasi rekening koran operasional bulan September', completed: true },
          { id: 's5-3', title: 'Cocokkan saldo akhir kas toko dengan laporan keuangan di Beruang', completed: true }
        ]
      },
      {
        id: 't-6',
        title: 'Simulasi Pitching & Data Room Briefing',
        description: 'Diskusi bersama konsultan mengenai data privat yang dibuka untuk investor.',
        category: 'Tata Kelola',
        completed: false,
        dueDate: '12 Oktober 2026',
        milestoneId: 'm3',
        consultantNote: 'Fokus pada proyeksi payback period 18 bulan.',
        steps: [
          { id: 's6-1', title: 'Susun dokumen ringkasan eksekutif (executive summary) 1 halaman', completed: true },
          { id: 's6-2', title: 'Siapkan dokumen legalitas resmi & bukti arus kas dalam folder Data Room', completed: false },
          { id: 's6-3', title: 'Simulasi presentasi proyeksi payback period 18 bulan bersama konsultan', completed: false }
        ]
      }
    ] as ActionPlanTask[],

    monthlyRecords: [] as MonthlyRecord[],
    investorRequests: [] as InvestorRequest[],
    dailyTransactions: [] as DailyTransaction[],
    fundingGate: null as FundingGateData | null
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
    },
    activeBranchRatio: (state): number => {
      if (!state.selectedBranchIds || state.selectedBranchIds.length === 0) {
        return 1
      }
      if (!state.branches || state.branches.length === 0) {
        return 1
      }
      const totalRatio = state.branches.reduce((acc, b) => acc + (b.shareRatio || (1 / state.branches.length)), 0) || 1
      const selectedRatio = state.branches
        .filter(b => state.selectedBranchIds.includes(b.id))
        .reduce((acc, b) => acc + (b.shareRatio || (1 / state.branches.length)), 0)
      return selectedRatio / totalRatio
    },
    activeBranchLabel: (state): string => {
      const count = state.selectedBranchIds.length
      if (count === 0) return 'Semua'
      if (count === 1) {
        const found = state.branches.find(b => b.id === state.selectedBranchIds[0])
        return found ? found.name : 'Cabang Terpilih'
      }
      return 'Kostum'
    }
  },

  actions: {
    /**
     * Memuat seluruh dataset dashboard UMKM dari live backend
     */
    async fetchDashboardData() {
      await Promise.allSettled([
        this.fetchProfile(),
        this.fetchAssessment(),
        this.fetchTasks(),
        this.fetchFinances(),
        this.fetchInvestorRequests()
      ])
    },

    /**
     * GET /api/umkm/profile
     */
    async fetchProfile() {
      try {
        const res = await useApi<any>('/umkm/profile')
        if (res.data) {
          const d = res.data
          this.profile = {
            ...this.profile,
            ...d,
            name: d.name || d.brand || this.profile.name || '',
            brand: d.brand || d.name || this.profile.brand || '',
            ownerName: d.ownerName || d.owner_name || this.profile.ownerName || '',
            owner_name: d.owner_name || d.ownerName || this.profile.owner_name || '',
            sector: d.sector || this.profile.sector || '',
            city: d.city || this.profile.city || '',
            establishedYear: d.establishedYear ?? d.established_year ?? this.profile.establishedYear,
            established_year: d.established_year ?? d.establishedYear ?? this.profile.established_year,
            outletsCount: d.outletsCount ?? d.outlets_count ?? this.profile.outletsCount ?? 1,
            outlets_count: d.outlets_count ?? d.outletsCount ?? this.profile.outlets_count ?? 1,
            employeesCount: d.employeesCount ?? d.employees_count ?? this.profile.employeesCount ?? 1,
            employees_count: d.employees_count ?? d.employeesCount ?? this.profile.employees_count ?? 1,
            fundingTarget: d.fundingTarget ?? d.funding_target ?? this.profile.fundingTarget ?? 0,
            funding_target: d.funding_target ?? d.fundingTarget ?? this.profile.funding_target ?? 0,
            description: d.description || '',
            pitchSummary: d.description || d.pitchSummary || '',
            nib: d.nib || '',
            npwp: d.npwp || '',
            consultantId: d.consultantId || this.profile.consultantId || '',
            consultantName: d.consultant?.user?.name || d.consultantName || this.profile.consultantName || ''
          }
        }
      } catch (err: any) {
        console.warn('Gagal memuat profil UMKM:', err?.message)
      }
    },

    /**
     * GET /api/umkm/assessment
     */
    async fetchAssessment() {
      try {
        const res = await useApi<any>('/umkm/assessment')
        if (res.data?.aspects && Array.isArray(res.data.aspects)) {
          this.assessmentAspects = res.data.aspects
        }
      } catch (err: any) {
        console.warn('Gagal memuat assessment UMKM:', err?.message)
      }
    },

    /**
     * GET /api/umkm/tasks & /api/umkm/milestones
     */
    async fetchTasks() {
      try {
        const [tasksRes, milestonesRes] = await Promise.allSettled([
          useApi<any>('/umkm/tasks'),
          useApi<any>('/umkm/milestones')
        ])

        if (tasksRes.status === 'fulfilled' && tasksRes.value?.data) {
          const d = tasksRes.value.data
          if (Array.isArray(d)) {
            this.tasks = d
          } else if (d.tasks && Array.isArray(d.tasks)) {
            this.tasks = d.tasks
            if (d.milestones && Array.isArray(d.milestones) && d.milestones.length > 0) {
              this.milestones = d.milestones
            }
          }
        }
        if (milestonesRes.status === 'fulfilled' && milestonesRes.value?.data && Array.isArray(milestonesRes.value.data)) {
          this.milestones = milestonesRes.value.data
        }
      } catch (err: any) {
        console.warn('Gagal memuat tasks UMKM:', err?.message)
      }
    },

    async setTaskStatus(taskId: string, status: 'TODO' | 'IN_PROGRESS' | 'DONE') {
      const task = this.tasks.find(t => t.id === taskId)
      if (task) {
        task.status = status
        task.completed = status === 'DONE'
        try {
          await useApi(`/umkm/tasks/${taskId}/toggle`, {
            method: 'PATCH',
            body: { status, completed: task.completed }
          })
        } catch (err: any) {
          console.warn('Gagal sinkron status tugas ke live API:', err?.message)
        }
      }
    },

    /**
     * PATCH /api/umkm/tasks/{id}/toggle
     */
    async toggleTask(taskId: string) {
      const task = this.tasks.find(t => t.id === taskId)
      if (task) {
        task.completed = !task.completed
        task.status = task.completed ? 'DONE' : 'TODO'
        if (task.steps && task.steps.length > 0) {
          task.steps.forEach(s => s.completed = task.completed)
        }
        try {
          await useApi(`/umkm/tasks/${taskId}/toggle`, { method: 'PATCH' })
        } catch (err: any) {
          console.warn('Gagal sinkron toggle task ke live API:', err?.message)
        }
      }
    },

    toggleTaskStep(taskId: string, stepId: string) {
      const task = this.tasks.find(t => t.id === taskId)
      if (task && task.steps) {
        const step = task.steps.find(s => s.id === stepId)
        if (step) {
          step.completed = !step.completed
          // Tugas pokok otomatis selesai jika semua anak tugas selesai
          task.completed = task.steps.every(s => s.completed)
          task.status = task.completed ? 'DONE' : 'TODO'
        }
      }
    },

    /**
     * PUT /api/umkm/profile
     */
    async updateProfile(payload: any) {
      this.profile = {
        ...this.profile,
        ...payload
      }
      try {
        const body = {
          ...payload,
          name: payload.name || payload.brand || this.profile.name,
          brand: payload.brand || payload.name || this.profile.brand,
          owner_name: payload.ownerName || payload.owner_name || this.profile.ownerName,
          ownerName: payload.ownerName || payload.owner_name || this.profile.ownerName,
          sector: payload.sector || this.profile.sector,
          city: payload.city || this.profile.city,
          established_year: payload.establishedYear || payload.established_year || this.profile.establishedYear,
          establishedYear: payload.establishedYear || payload.established_year || this.profile.establishedYear,
          outlets_count: payload.outletsCount || payload.outlets_count || this.profile.outletsCount,
          outletsCount: payload.outletsCount || payload.outlets_count || this.profile.outletsCount,
          employees_count: payload.employeesCount || payload.employees_count || this.profile.employeesCount,
          employeesCount: payload.employeesCount || payload.employees_count || this.profile.employeesCount,
          funding_target: payload.fundingTarget || payload.funding_target || this.profile.fundingTarget,
          fundingTarget: payload.fundingTarget || payload.funding_target || this.profile.fundingTarget,
          description: payload.description || payload.pitchSummary || this.profile.description,
          pitch_summary: payload.description || payload.pitchSummary || this.profile.pitchSummary,
          nib: payload.nib || this.profile.nib,
          npwp: payload.npwp || this.profile.npwp
        }
        const res = await useApi<any>('/umkm/profile', {
          method: 'PUT',
          body
        })
        if (res.data) {
          const d = res.data
          this.profile = {
            ...this.profile,
            ...d,
            name: d.name || d.brand || this.profile.name,
            ownerName: d.ownerName || d.owner_name || this.profile.ownerName
          }
        }
      } catch (err: any) {
        console.warn('Gagal perbarui profil UMKM ke live API:', err?.message)
      }
    },

    /**
     * Tambah rencana aksi baru
     */
    async addTask(task: Omit<ActionPlanTask, 'id' | 'completed'>) {
      const newId = `t-${Date.now()}`
      const newTask: ActionPlanTask = {
        ...task,
        id: newId,
        completed: false,
        status: 'TODO'
      }
      this.tasks.push(newTask)

      try {
        const res = await useApi<ActionPlanTask>('/umkm/tasks', {
          method: 'POST',
          body: {
            title: task.title,
            description: task.description,
            category: task.category,
            milestone_id: task.milestoneId || (this.milestones[0] ? this.milestones[0].id : null),
            milestoneId: task.milestoneId,
            due_date: task.dueDate,
            dueDate: task.dueDate
          }
        })
        if (res.data?.id) {
          const idx = this.tasks.findIndex(t => t.id === newId)
          if (idx !== -1) {
            this.tasks[idx] = { ...this.tasks[idx], ...res.data }
          }
        }
      } catch (err: any) {
        console.warn('Gagal simpan tugas baru ke live API, tersimpan lokal:', err?.message)
      }
    },

    /**
     * GET /api/finances/summary, /api/finances/daily, /api/finances/monthly
     */
    async fetchFinances() {
      const authStore = useAuthStore()
      const isDemo = authStore.currentUser?.email === 'fikri@kopisenja.id'

      try {
        const [dailyRes, monthlyRes, monthlyAltRes, summaryRes] = await Promise.allSettled([
          useApi<any>('/finances/daily'),
          useApi<any>('/finances/monthly'),
          useApi<any>('/umkm/monthly-reports'),
          useApi<any>('/finances/summary')
        ])

        if (summaryRes.status === 'fulfilled' && summaryRes.value?.data) {
          const s = summaryRes.value.data
          this.financeSummary = {
            cashBalance: Number(s.cashBalance ?? s.cash_balance ?? 0),
            totalIncomeMonth: Number(s.totalIncomeMonth ?? s.total_income_month ?? 0),
            totalCogsMonth: Number(s.totalCogsMonth ?? s.total_cogs_month ?? 0),
            totalOpexMonth: Number(s.totalOpexMonth ?? s.total_opex_month ?? 0),
            netProfitMonth: Number(s.netProfitMonth ?? s.net_profit_month ?? 0),
            marginPercentage: Number(s.marginPercentage ?? s.margin_percentage ?? 0),
            marginStatus: s.marginStatus ?? s.margin_status ?? 'BELUM_ADA_DATA'
          }
        } else if (isDemo && this.financeSummary.totalIncomeMonth === 0) {
          this.financeSummary = { ...DEMO_FINANCE_SUMMARY }
        }

        if (dailyRes.status === 'fulfilled' && dailyRes.value?.data) {
          const list = Array.isArray(dailyRes.value.data) ? dailyRes.value.data : (dailyRes.value.data as any).data
          if (Array.isArray(list)) {
            this.dailyTransactions = list
          }
        } else if (isDemo && this.dailyTransactions.length === 0) {
          this.dailyTransactions = [...DEMO_DAILY_TRANSACTIONS]
        }

        const validMonthly = (monthlyRes.status === 'fulfilled' && monthlyRes.value?.data)
          ? monthlyRes.value.data
          : (monthlyAltRes.status === 'fulfilled' && monthlyAltRes.value?.data)
            ? monthlyAltRes.value.data
            : null

        if (validMonthly) {
          const mList = Array.isArray(validMonthly) ? validMonthly : (validMonthly as any).data
          if (Array.isArray(mList)) {
            this.monthlyRecords = mList
          }
        } else if (isDemo && this.monthlyRecords.length === 0) {
          this.monthlyRecords = [...DEMO_MONTHLY_RECORDS]
        }
      } catch (err: any) {
        console.warn('Gagal memuat data keuangan live:', err?.message)
      }
    },

    /**
     * POST /api/finances/daily
     */
    async addDailyTransaction(tx: Omit<DailyTransaction, 'id' | 'status'>) {
      const localId = `tx-${Date.now()}`
      const newTx: DailyTransaction = {
        ...tx,
        id: localId,
        status: 'VERIFIED'
      }
      this.dailyTransactions.unshift(newTx)

      // Segera mutasikan financeSummary agar angka kartu dan grafik langsung terupdate
      if (tx.category === 'PEMASUKAN') {
        this.financeSummary.totalIncomeMonth += tx.amount
        this.financeSummary.netProfitMonth += tx.amount
        this.financeSummary.cashBalance += tx.amount
      } else if (tx.category === 'MODAL_JUALAN') {
        this.financeSummary.totalCogsMonth += tx.amount
        this.financeSummary.netProfitMonth -= tx.amount
        this.financeSummary.cashBalance -= tx.amount
      } else if (tx.category === 'OPERASIONAL') {
        this.financeSummary.totalOpexMonth += tx.amount
        this.financeSummary.netProfitMonth -= tx.amount
        this.financeSummary.cashBalance -= tx.amount
      }
      if (this.financeSummary.totalIncomeMonth > 0) {
        this.financeSummary.marginPercentage = Number(
          ((this.financeSummary.netProfitMonth / this.financeSummary.totalIncomeMonth) * 100).toFixed(1)
        )
      }

      try {
        const res = await useApi<DailyTransaction>('/finances/daily', {
          method: 'POST',
          body: {
            ...tx,
            payment_method: tx.paymentMethod,
            receipt_number: tx.receiptNumber
          }
        })
        if (res.data) {
          const idx = this.dailyTransactions.findIndex(t => t.id === localId)
          if (idx !== -1) {
            this.dailyTransactions[idx] = res.data
          }
          return res.data
        }
      } catch (err: any) {
        console.warn('Gagal simpan transaksi ke backend, tersimpan di state lokal:', err?.message)
      }
    },

    /**
     * DELETE /api/finances/daily/{id}
     */
    async deleteDailyTransaction(txId: string) {
      const existing = this.dailyTransactions.find(t => t.id === txId)
      if (existing) {
        if (existing.category === 'PEMASUKAN') {
          this.financeSummary.totalIncomeMonth -= existing.amount
          this.financeSummary.netProfitMonth -= existing.amount
          this.financeSummary.cashBalance -= existing.amount
        } else if (existing.category === 'MODAL_JUALAN') {
          this.financeSummary.totalCogsMonth -= existing.amount
          this.financeSummary.netProfitMonth += existing.amount
          this.financeSummary.cashBalance += existing.amount
        } else if (existing.category === 'OPERASIONAL') {
          this.financeSummary.totalOpexMonth -= existing.amount
          this.financeSummary.netProfitMonth += existing.amount
          this.financeSummary.cashBalance += existing.amount
        }
      }
      this.dailyTransactions = this.dailyTransactions.filter(t => t.id !== txId)
      try {
        await useApi(`/finances/daily/${txId}`, { method: 'DELETE' })
      } catch (err: any) {
        console.warn('Gagal hapus transaksi di backend:', err?.message)
      }
    },

    /**
     * POST /api/umkm/monthly-reports atau /finances/monthly
     * Menyimpan dan memperbarui rekapitulasi laporan bulanan beserta file bukti
     */
    async addMonthlyProgress(
      record: Partial<MonthlyRecord> & {
        month: string
        year: number
        omzet: number
        hpp: number
        opex: number
        rawFile?: File | null
      }
    ) {
      const netProfit = record.netProfit !== undefined ? record.netProfit : (record.omzet - record.hpp - record.opex)
      const cashBalance = record.cashBalance !== undefined ? record.cashBalance : (this.financeSummary.cashBalance + netProfit)

      const newRec: MonthlyRecord = {
        month: record.month,
        year: record.year,
        omzet: record.omzet,
        hpp: record.hpp,
        opex: record.opex,
        loss: record.loss || 0,
        netProfit,
        cashBalance,
        proofDocumentUrl: record.proofDocumentUrl || '',
        proofDocumentName: record.proofDocumentName || (record.rawFile ? record.rawFile.name : `Laporan_Kas_${record.month}_${record.year}.pdf`),
        proofDocumentSize: record.proofDocumentSize || (record.rawFile ? `${(record.rawFile.size / (1024 * 1024)).toFixed(1)} MB` : '2.0 MB'),
        uploadedAt: record.uploadedAt || new Date().toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' }),
        notes: record.notes || '',
        status: record.status || 'PENDING'
      }

      const existingIndex = this.monthlyRecords.findIndex(r => r.month.toLowerCase() === record.month.toLowerCase() && r.year === record.year)
      if (existingIndex >= 0) {
        this.monthlyRecords[existingIndex] = { ...this.monthlyRecords[existingIndex], ...newRec }
      } else {
        this.monthlyRecords.push(newRec)
      }

      // Update summary cards
      this.financeSummary.totalIncomeMonth = newRec.omzet
      this.financeSummary.totalCogsMonth = newRec.hpp
      this.financeSummary.totalOpexMonth = newRec.opex
      this.financeSummary.netProfitMonth = newRec.netProfit
      this.financeSummary.cashBalance = newRec.cashBalance
      if (newRec.omzet > 0) {
        this.financeSummary.marginPercentage = Number(((newRec.netProfit / newRec.omzet) * 100).toFixed(1))
      }

      if (typeof window !== 'undefined') {
        try {
          localStorage.setItem('umkm_monthly_records', JSON.stringify(this.monthlyRecords))
        } catch (e) {
          console.warn('Gagal menyimpan rekap bulanan ke localStorage', e)
        }
      }

      try {
        let bodyPayload: any = newRec
        if (record.rawFile instanceof File) {
          const formData = new FormData()
          formData.append('file', record.rawFile)
          formData.append('month', String(newRec.month))
          formData.append('year', String(newRec.year))
          formData.append('omzet', String(newRec.omzet))
          formData.append('hpp', String(newRec.hpp))
          formData.append('opex', String(newRec.opex))
          formData.append('loss', String(newRec.loss || 0))
          if (newRec.notes) formData.append('notes', newRec.notes)
          bodyPayload = formData
        }

        const res = await useApi<any>('/finances/monthly', {
          method: 'POST',
          body: bodyPayload
        })

        if (res.data?.proofDocumentUrl) {
          newRec.proofDocumentUrl = res.data.proofDocumentUrl
          if (res.data.id) (newRec as any).id = res.data.id
        }
      } catch (err: any) {
        console.warn('Gagal kirim laporan bulanan ke backend:', err?.message)
      }

      return newRec
    },

    /**
     * Upload berkas bukti laporan untuk bulan yang sudah ada
     */
    async uploadMonthlyReportFile(month: string, year: number, file: { name: string; size: string; dataUrl?: string; rawFile?: File }) {
      const target = this.monthlyRecords.find(r => r.month.toLowerCase() === month.toLowerCase() && r.year === year)
      const nowStr = new Date().toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' })
      if (target) {
        target.proofDocumentName = file.name
        target.proofDocumentSize = file.size
        target.proofDocumentUrl = file.dataUrl || ''
        target.uploadedAt = nowStr
        target.status = 'PENDING'
      }

      if (typeof window !== 'undefined') {
        try {
          localStorage.setItem('umkm_monthly_records', JSON.stringify(this.monthlyRecords))
        } catch (e) {
          console.warn('Gagal simpan file laporan ke localStorage', e)
        }
      }

      if (file.rawFile instanceof File && target) {
        try {
          const formData = new FormData()
          formData.append('file', file.rawFile)
          formData.append('month', String(target.month))
          formData.append('year', String(target.year))
          formData.append('omzet', String(target.omzet))
          formData.append('hpp', String(target.hpp))
          formData.append('opex', String(target.opex))

          const res = await useApi<any>('/finances/monthly', {
            method: 'POST',
            body: formData
          })
          if (res.data?.proofDocumentUrl) {
            target.proofDocumentUrl = res.data.proofDocumentUrl
          }
        } catch (e: any) {
          console.warn('Gagal upload file bukti laporan ke backend:', e?.message)
        }
      }
    },

    initMonthlyRecordsFromStorage() {
      if (typeof window !== 'undefined') {
        try {
          const authStore = useAuthStore()
          const isDemo = authStore.currentUser?.email === 'fikri@kopisenja.id'
          const storageKey = authStore.currentUser?.id ? `umkm_monthly_records_${authStore.currentUser.id}` : 'umkm_monthly_records'
          const saved = localStorage.getItem(storageKey)
          if (saved) {
            const parsed = JSON.parse(saved)
            if (Array.isArray(parsed) && parsed.length > 0) {
              if (isDemo || parsed[0]?.omzet !== 42000000) {
                this.monthlyRecords = parsed
              }
            }
          }
        } catch (e) {
          // ignore
        }
      }
    },

    /**
     * GET /api/umkm/funding-gate
     * Memuat evaluasi 4 syarat gerbang pendanaan dari backend secara riil
     */
    async fetchFundingGate() {
      try {
        const res = await useApi<any>('/umkm/funding-gate')
        if (res?.data) {
          const d = res.data.data || res.data
          this.fundingGate = d
          return d
        }
      } catch (err: any) {
        console.warn('Gagal memuat status funding gate:', err?.message)
      }
      return null
    },

    /**
     * GET /api/umkm/investor-requests
     */
    async fetchInvestorRequests() {
      try {
        const res = await useApi<any>('/umkm/investor-requests')
        if (res?.data !== undefined) {
          const list = Array.isArray(res.data) ? res.data : (res.data as any).data
          if (Array.isArray(list)) {
            this.investorRequests = list
          }
        }
      } catch (err: any) {
        console.warn('Gagal memuat permintaan investor:', err?.message)
      }
    },

    /**
     * PUT /api/umkm/investor-requests/{id}/respond
     */
    async updateInvestorRequestStatus(requestId: string, status: 'APPROVED' | 'REJECTED') {
      const req = this.investorRequests.find(r => r.id === requestId)
      if (req) {
        req.status = status
        req.reviewedAt = new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })
      }

      try {
        await useApi(`/umkm/investor-requests/${requestId}/respond`, {
          method: 'PUT',
          body: { status }
        })
      } catch (err: any) {
        console.warn('Gagal perbarui status permintaan investor di live API:', err?.message)
      }
    },

    async updateProfileBanner(bannerUrl: string) {
      this.profile.bannerUrl = bannerUrl
      if (typeof window !== 'undefined') {
        try {
          localStorage.setItem('umkm_banner_url', bannerUrl)
        } catch (e) {
          console.warn('Gagal menyimpan banner ke localStorage', e)
        }
      }
      try {
        await useApi('/umkm/profile/banner', {
          method: 'POST',
          body: { bannerUrl }
        })
      } catch (err: any) {
        console.warn('Gagal sinkron banner ke backend:', err?.message)
      }
    },

    resetProfileBanner() {
      this.profile.bannerUrl = ''
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

    async updateOwnerAvatar(avatarUrl: string) {
      this.profile.ownerAvatarUrl = avatarUrl
      if (typeof window !== 'undefined') {
        try {
          localStorage.setItem('umkm_avatar_url', avatarUrl)
        } catch (e) {
          console.warn('Gagal menyimpan avatar ke localStorage', e)
        }
      }
      try {
        await useApi('/umkm/profile/avatar', {
          method: 'POST',
          body: { avatarUrl }
        })
      } catch (err: any) {
        console.warn('Gagal sinkron avatar ke backend:', err?.message)
      }
    },

    resetOwnerAvatar() {
      this.profile.ownerAvatarUrl = ''
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

    async updateQuickProfile(name: string, description: string) {
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

      try {
        await useApi('/umkm/profile', {
          method: 'PUT',
          body: {
            name: this.profile.name,
            brand: this.profile.name,
            description: this.profile.description,
            pitch_summary: this.profile.description
          }
        })
      } catch (err: any) {
        console.warn('Gagal sinkron quick edit ke backend:', err?.message)
      }
    },

    initQuickProfileFromStorage() {
      if (typeof window !== 'undefined') {
        try {
          const auth = useAuthStore()
          const isDemo = auth.currentUser?.email?.toLowerCase() === 'fikri@kopisenja.id'
          const keySuffix = auth.currentUser?.id ? `_${auth.currentUser.id}` : ''
          const savedName = localStorage.getItem(`umkm_profile_name${keySuffix}`)
          const savedDesc = localStorage.getItem(`umkm_profile_desc${keySuffix}`)
          if (savedName) this.profile.name = savedName
          if (savedDesc) {
            if (!isDemo && savedDesc.includes('Spesialis kopi arabika')) {
              localStorage.removeItem(`umkm_profile_desc${keySuffix}`)
              localStorage.removeItem('umkm_profile_desc')
            } else {
              this.profile.pitchSummary = savedDesc
              this.profile.description = savedDesc
            }
          }
        } catch (e) {
          // ignore
        }
      }
    },

    addBranch(branch: Omit<UmkmBranch, 'id'>) {
      const newId = `branch-${Date.now()}`
      const newBranch: UmkmBranch = {
        ...branch,
        id: newId,
        shareRatio: branch.shareRatio || 0.20
      }
      this.branches.push(newBranch)
      this.profile.outletsCount = this.branches.length
      this.saveBranchesToStorage()
      return newBranch
    },

    deleteBranch(branchId: string) {
      this.branches = this.branches.filter(b => b.id !== branchId)
      this.selectedBranchIds = this.selectedBranchIds.filter(id => id !== branchId)
      this.profile.outletsCount = Math.max(1, this.branches.length)
      this.saveBranchesToStorage()
    },

    toggleBranchSelection(branchId: string) {
      const idx = this.selectedBranchIds.indexOf(branchId)
      if (idx > -1) {
        this.selectedBranchIds.splice(idx, 1)
      } else {
        this.selectedBranchIds.push(branchId)
      }
      this.saveBranchesToStorage()
    },

    clearBranchSelection() {
      this.selectedBranchIds = []
      this.saveBranchesToStorage()
    },

    saveBranchesToStorage() {
      if (typeof window !== 'undefined') {
        try {
          localStorage.setItem('umkm_branches_list', JSON.stringify(this.branches))
          localStorage.setItem('umkm_selected_branch_ids', JSON.stringify(this.selectedBranchIds))
          localStorage.setItem('umkm_outlets_count', String(this.profile.outletsCount))
        } catch (e) {
          console.warn('Gagal menyimpan branches ke storage', e)
        }
      }
    },

    initBranchesFromStorage() {
      if (typeof window !== 'undefined') {
        try {
          const savedBranches = localStorage.getItem('umkm_branches_list')
          const savedSelected = localStorage.getItem('umkm_selected_branch_ids')
          const savedOutlets = localStorage.getItem('umkm_outlets_count')
          if (savedBranches) {
            const parsed = JSON.parse(savedBranches)
            if (Array.isArray(parsed) && parsed.length > 0) {
              this.branches = parsed
            }
          }
          if (savedSelected) {
            const parsed = JSON.parse(savedSelected)
            if (Array.isArray(parsed)) {
              this.selectedBranchIds = parsed
            }
          }
          if (savedOutlets) {
            this.profile.outletsCount = Number(savedOutlets) || this.branches.length
          } else {
            this.profile.outletsCount = this.branches.length
          }
        } catch (e) {
          // ignore
        }
      }
    }
  }
})
