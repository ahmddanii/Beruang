import { defineStore } from 'pinia'
import { generate200DailyTransactions } from '~/data/dummyTransactions'

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
      halalNumber: 'ID321100019283',
      hkiNumber: 'IPT20250918290',
      fundingStatus: 'READY_FOR_FUNDING' as 'DRAFT' | 'IN_REVIEW' | 'READY_FOR_FUNDING',
      certifiedAt: '18 September 2026',
      consultantName: 'Dra. Maya Suryani, M.M.'
    },

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
    ] as InvestorRequest[],

    dailyTransactions: generate200DailyTransactions()
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
    toggleTask(taskId: string) {
      const task = this.tasks.find(t => t.id === taskId)
      if (task) {
        task.completed = !task.completed
        if (task.steps && task.steps.length > 0) {
          task.steps.forEach(s => s.completed = task.completed)
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
        }
      }
    },

    addTask(task: Omit<ActionPlanTask, 'id' | 'completed'>) {
      const newId = `t-${Date.now()}`
      this.tasks.push({
        ...task,
        id: newId,
        completed: false
      })
    },

    addDailyTransaction(tx: Omit<DailyTransaction, 'id' | 'status'>) {
      const newTx: DailyTransaction = {
        ...tx,
        id: `tx-${Date.now()}`,
        status: 'VERIFIED'
      }
      this.dailyTransactions.unshift(newTx)
    },

    deleteDailyTransaction(txId: string) {
      this.dailyTransactions = this.dailyTransactions.filter(t => t.id !== txId)
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
