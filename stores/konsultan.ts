import { defineStore } from 'pinia'

export interface ClientUmkm {
  id: string
  name: string
  owner: string
  sector: string
  city: string
  healthScore: number
  status: 'healthy' | 'warning' | 'danger'
  fundingStatus: 'DRAFT' | 'IN_REVIEW' | 'READY_FOR_FUNDING'
  monthlyStatus: 'VERIFIED' | 'PENDING' | 'OVERDUE'
  lastAuditDate: string
  fundingTarget: number
  tasksCompleted: number
  totalTasks: number
  growthPct: number
}

export interface ProgressValidationItem {
  id: string
  clientId: string
  clientName: string
  month: string
  omzet: number
  hpp: number
  opex: number
  proofDocument: string
  submittedAt: string
  notes?: string
}

export interface AnomalyAlert {
  id: string
  clientId: string
  clientName: string
  type: 'HPP_SPIKE' | 'MARGIN_DROP' | 'OPEX_ANOMALY'
  title: string
  message: string
  timestamp: string
  severity: 'high' | 'medium'
  dismissed: boolean
}

export const useKonsultanStore = defineStore('konsultan', {
  state: () => ({
    clients: [
      {
        id: 'umkm-01',
        name: 'Kopi Senja Nusantara',
        owner: 'Budi Setiawan',
        sector: 'F&B (Coffee & Beverages)',
        city: 'Bandung',
        healthScore: 79,
        status: 'healthy',
        fundingStatus: 'READY_FOR_FUNDING',
        monthlyStatus: 'VERIFIED',
        lastAuditDate: '18 Sep 2026',
        fundingTarget: 250000000,
        tasksCompleted: 5,
        totalTasks: 6,
        growthPct: 15.8
      },
      {
        id: 'umkm-02',
        name: 'Batik Lestari Heritage',
        owner: 'Siti Rahmawati',
        sector: 'Fashion & Kriya Tradisional',
        city: 'Pekalongan',
        healthScore: 71,
        status: 'warning',
        fundingStatus: 'IN_REVIEW',
        monthlyStatus: 'PENDING',
        lastAuditDate: '21 Sep 2026',
        fundingTarget: 180000000,
        tasksCompleted: 4,
        totalTasks: 7,
        growthPct: 8.2
      },
      {
        id: 'umkm-03',
        name: 'Sambal Bu Rudy Asli',
        owner: 'Rudy Hartono',
        sector: 'F&B (Oleh-oleh)',
        city: 'Surabaya',
        healthScore: 88,
        status: 'healthy',
        fundingStatus: 'READY_FOR_FUNDING',
        monthlyStatus: 'VERIFIED',
        lastAuditDate: '15 Sep 2026',
        fundingTarget: 500000000,
        tasksCompleted: 8,
        totalTasks: 8,
        growthPct: 22.4
      },
      {
        id: 'umkm-04',
        name: 'Dapur Mama Catering',
        owner: 'Dewi Anggraini',
        sector: 'Jasa Boga & Katering',
        city: 'Yogyakarta',
        healthScore: 54,
        status: 'danger',
        fundingStatus: 'DRAFT',
        monthlyStatus: 'OVERDUE',
        lastAuditDate: '02 Agu 2026',
        fundingTarget: 120000000,
        tasksCompleted: 2,
        totalTasks: 6,
        growthPct: -4.5
      }
    ] as ClientUmkm[],

    validationsQueue: [
      {
        id: 'val-01',
        clientId: 'umkm-02',
        clientName: 'Batik Lestari Heritage',
        month: 'September 2026',
        omzet: 42000000,
        hpp: 19500000,
        opex: 11000000,
        proofDocument: 'rekening_koran_mandiri_sep2026.pdf',
        submittedAt: '25 Sep 2026 14:30',
        notes: 'Pencatatan nota penjualan offline dan Tokopedia.'
      }
    ] as ProgressValidationItem[],

    alerts: [
      {
        id: 'alt-01',
        clientId: 'umkm-01',
        clientName: 'Kopi Senja Nusantara',
        type: 'HPP_SPIKE',
        title: 'Lonjakan HPP Biji Kopi (+12.4%)',
        message: 'HPP naik dari 38% ke 47.2% dari omzet di bulan September. Rekomendasi: koordinasikan penyesuaian porsi resep atau kunci harga pasokan supplier.',
        timestamp: '25 Sep 2026 09:15',
        severity: 'medium',
        dismissed: false
      },
      {
        id: 'alt-02',
        clientId: 'umkm-04',
        clientName: 'Dapur Mama Catering',
        type: 'MARGIN_DROP',
        title: 'Margin Bersih Turun Signifikan (<5%)',
        message: 'Biaya logistik katering naik 30% tanpa penyesuaian harga menu. Segera adakan pendampingan tatap muka.',
        timestamp: '23 Sep 2026 11:20',
        severity: 'high',
        dismissed: false
      }
    ] as AnomalyAlert[]
  }),

  actions: {
    approveValidation(validationId: string) {
      const idx = this.validationsQueue.findIndex(v => v.id === validationId)
      if (idx !== -1) {
        const item = this.validationsQueue[idx]
        const client = this.clients.find(c => c.id === item.clientId)
        if (client) client.monthlyStatus = 'VERIFIED'
        this.validationsQueue.splice(idx, 1)
      }
    },

    rejectValidation(validationId: string) {
      this.validationsQueue = this.validationsQueue.filter(v => v.id !== validationId)
    },

    certifyClientReady(clientId: string) {
      const client = this.clients.find(c => c.id === clientId)
      if (client) {
        client.fundingStatus = 'READY_FOR_FUNDING'
        client.lastAuditDate = new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })
      }
    },

    dismissAlert(alertId: string) {
      const alert = this.alerts.find(a => a.id === alertId)
      if (alert) alert.dismissed = true
    }
  }
})
