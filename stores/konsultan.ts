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
  joinedDate?: string
  monthlyFee?: number
  durationMonths?: number
  isNew?: boolean
}

export interface ClientMentorshipRequest {
  id: string
  umkmId: string
  businessName: string
  ownerName: string
  sector: string
  city: string
  revenue: number
  healthScore: number
  offeredFee: number
  durationMonths: number
  message: string
  requestedAt: string
  status: 'PENDING' | 'ACCEPTED' | 'REJECTED'
  rejectionReason?: string
  avatar?: string
}

export interface ActionPlanItem {
  id: string
  clientId: string
  clientName: string
  title: string
  description: string
  pillar: 'Keuangan' | 'Operasional' | 'Legalitas' | 'Pemasaran' | 'SDM'
  priority: 'Tinggi' | 'Sedang' | 'Rendah'
  status: 'TODO' | 'IN_PROGRESS' | 'DONE'
  targetDate: string
  assignedAt: string
  consultantNotes?: string
}

export interface ConsultantDocument {
  id: string
  name: string
  type: 'BNSP_CERT' | 'PORTOFOLIO' | 'KTP_NPWP' | 'OTHER'
  filename: string
  fileSize: string
  uploadedAt: string
  status: 'VERIFIED' | 'PENDING_REVIEW'
}

export interface ConsultantProfileData {
  name: string
  title: string
  email: string
  phone: string
  firmName: string
  specialization: string
  experience: string
  bnspLicense: string
  city: string
  bio: string
  maxClients: number
  avatar: string
  documents: ConsultantDocument[]
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
    // Profil Konsultan
    profile: {
      name: 'Dra. Maya Suryani, M.M.',
      title: 'Konsultan Ahli Keuangan & Audit UMKM',
      email: 'maya.suryani@gmail.com',
      phone: '+62 819-8765-4321',
      firmName: 'Maya Advisory Partner',
      specialization: 'Keuangan & Biaya',
      experience: '5+ Tahun',
      bnspLicense: 'BNSP-KONS-2024-8891',
      city: 'Bandung, Jawa Barat',
      bio: 'Konsultan pendamping bisnis bersertifikasi resmi BNSP dengan spesialisasi penataan arus kas, efisiensi rasio HPP, dan standarisasi kesiapan modal usaha mikro & kecil.',
      maxClients: 10,
      avatar: '/images/user-profile.png',
      documents: [
        {
          id: 'doc-01',
          name: 'Sertifikat Lisensi BNSP Konsultan Bisnis',
          type: 'BNSP_CERT',
          filename: 'Sertifikat_BNSP_Maya_Suryani_2024.pdf',
          fileSize: '2.4 MB',
          uploadedAt: '12 Jan 2026',
          status: 'VERIFIED'
        },
        {
          id: 'doc-02',
          name: 'Portofolio Pendampingan 25+ UMKM Binaan',
          type: 'PORTOFOLIO',
          filename: 'Portofolio_Pendampingan_UMKM_Maya.pdf',
          fileSize: '5.1 MB',
          uploadedAt: '15 Jan 2026',
          status: 'VERIFIED'
        },
        {
          id: 'doc-03',
          name: 'Nomor Pokok Wajib Pajak (NPWP) Konsultan',
          type: 'KTP_NPWP',
          filename: 'NPWP_Maya_Suryani.pdf',
          fileSize: '1.2 MB',
          uploadedAt: '15 Jan 2026',
          status: 'VERIFIED'
        }
      ] as ConsultantDocument[]
    } as ConsultantProfileData,

    // Daftar Permintaan Bimbingan Masuk dari UMKM
    clientRequests: [
      {
        id: 'req-01',
        umkmId: 'umkm-new-01',
        businessName: 'Dapoer Renyah Nusantara',
        ownerName: 'Siti Aminah',
        sector: 'Makanan & Camilan',
        city: 'Bandung',
        revenue: 35000000,
        healthScore: 74,
        offeredFee: 2000000,
        durationMonths: 3,
        message: 'Halo Bu Maya, kami butuh bimbingan profesional untuk memisahkan keuangan pribadi dan usaha, serta merapikan pencatatan kas agar siap diajukan ke investor modal usaha.',
        requestedAt: 'Hari ini, 09:15',
        status: 'PENDING'
      },
      {
        id: 'req-02',
        umkmId: 'umkm-new-02',
        businessName: 'Tenun Sutra Garut Elok',
        ownerName: 'Ahmad Fauzi',
        sector: 'Kriya & Tekstil',
        city: 'Garut',
        revenue: 28000000,
        healthScore: 68,
        offeredFee: 1500000,
        durationMonths: 6,
        message: 'Mohon arahan dan action plan untuk efisiensi biaya bahan baku benang tenun dan legalitas usaha NIB kami.',
        requestedAt: 'Kemarin, 16:40',
        status: 'PENDING'
      },
      {
        id: 'req-03',
        umkmId: 'umkm-new-03',
        businessName: 'Kripik Tempe Barokah',
        ownerName: 'Wahyu Hidayat',
        sector: 'Makanan Ringan',
        city: 'Malang',
        revenue: 18000000,
        healthScore: 62,
        offeredFee: 1200000,
        durationMonths: 3,
        message: 'Ingin dibimbing dari awal untuk pembukuan kas harian dan persiapan uji kelayakan pembiayaan.',
        requestedAt: '12 Okt 2026',
        status: 'PENDING'
      }
    ] as ClientMentorshipRequest[],

    // Daftar UMKM Klien Binaan Aktif
    clients: [
      {
        id: 'umkm-01',
        name: 'Kopi Senja Nusantara',
        owner: 'Fikri Setiawan',
        sector: 'Makanan & Minuman (Kopi & Resto)',
        city: 'Bandung',
        healthScore: 79,
        status: 'healthy',
        fundingStatus: 'READY_FOR_FUNDING',
        monthlyStatus: 'VERIFIED',
        lastAuditDate: '18 Sep 2026',
        fundingTarget: 250000000,
        tasksCompleted: 5,
        totalTasks: 6,
        growthPct: 15.8,
        joinedDate: '15 Jul 2026',
        monthlyFee: 2500000,
        durationMonths: 6
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
        growthPct: 8.2,
        joinedDate: '01 Agu 2026',
        monthlyFee: 1800000,
        durationMonths: 3
      },
      {
        id: 'umkm-03',
        name: 'Sambal Bu Rudy Asli',
        owner: 'Rudy Hartono',
        sector: 'Makanan & Minuman (Oleh-oleh)',
        city: 'Surabaya',
        healthScore: 88,
        status: 'healthy',
        fundingStatus: 'READY_FOR_FUNDING',
        monthlyStatus: 'VERIFIED',
        lastAuditDate: '15 Sep 2026',
        fundingTarget: 500000000,
        tasksCompleted: 8,
        totalTasks: 8,
        growthPct: 22.4,
        joinedDate: '10 Jun 2026',
        monthlyFee: 3000000,
        durationMonths: 6
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
        growthPct: -4.5,
        joinedDate: '20 Agu 2026',
        monthlyFee: 1500000,
        durationMonths: 3
      }
    ] as ClientUmkm[],

    // Daftar Action Plan yang Diberikan Konsultan untuk Klien Binaan
    actionPlans: [
      {
        id: 'plan-01',
        clientId: 'umkm-01',
        clientName: 'Kopi Senja Nusantara',
        title: 'Pisahkan Rekening Operasional & Pribadi Usaha',
        description: 'Buka rekening bank khusus untuk kas harian kedai dan gunakan QRIS toko agar pencatatan arus kas tidak tercampur uang dapur keluarga.',
        pillar: 'Keuangan',
        priority: 'Tinggi',
        status: 'DONE',
        targetDate: '30 Sep 2026',
        assignedAt: '15 Sep 2026',
        consultantNotes: 'Rekening bank Mandiri khusus usaha sudah aktif dan terintegrasi.'
      },
      {
        id: 'plan-02',
        clientId: 'umkm-01',
        clientName: 'Kopi Senja Nusantara',
        title: 'Efisiensi HPP Bahan Baku Biji Kopi',
        description: 'Lakukan perbandingan harga vendor green beans dan terapkan standar takaran espresso 18g untuk menjaga margin minimal 50%.',
        pillar: 'Operasional',
        priority: 'Tinggi',
        status: 'IN_PROGRESS',
        targetDate: '20 Okt 2026',
        assignedAt: '25 Sep 2026',
        consultantNotes: 'Sedang meninjau ulang kontrak dengan supplier petani Ciwidey.'
      },
      {
        id: 'plan-03',
        clientId: 'umkm-01',
        clientName: 'Kopi Senja Nusantara',
        title: 'Pembaruan Sertifikasi Laik Higiene Sanitasi & Halal',
        description: 'Lengkapi berkas pendaftaran sertifikasi Halal self-declare untuk menu minuman kopi susu guna menaikkan skor kesiapan investor.',
        pillar: 'Legalitas',
        priority: 'Sedang',
        status: 'TODO',
        targetDate: '15 Nov 2026',
        assignedAt: '01 Okt 2026',
        consultantNotes: 'Format formulir sudah dikirimkan via WhatsApp.'
      },
      {
        id: 'plan-04',
        clientId: 'umkm-02',
        clientName: 'Batik Lestari Heritage',
        title: 'Catat Arus Kas Harian Selama 30 Hari Penuh',
        description: 'Gunakan fitur Catatan Kas Beruang untuk merekam setiap nota penjualan kain batik harian tanpa ada yang terlewat.',
        pillar: 'Keuangan',
        priority: 'Tinggi',
        status: 'IN_PROGRESS',
        targetDate: '25 Okt 2026',
        assignedAt: '20 Sep 2026',
        consultantNotes: 'Sudah mencapai hari ke-18 pencatatan rutin.'
      },
      {
        id: 'plan-05',
        clientId: 'umkm-04',
        clientName: 'Dapur Mama Catering',
        title: 'Restrukturisasi Biaya Logistik Pengantaran',
        description: 'Beralih ke sistem rute terjadwal atau negosiasi kurir borongan agar biaya operasional kirim makanan tidak membebani laba katering.',
        pillar: 'Operasional',
        priority: 'Tinggi',
        status: 'TODO',
        targetDate: '18 Okt 2026',
        assignedAt: '23 Sep 2026',
        consultantNotes: 'Klien perlu segera memangkas biaya transportasi.'
      }
    ] as ActionPlanItem[],

    // Antrean Validasi Kas
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

    // Peringatan Anomali
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

  getters: {
    pendingRequestsCount: (state) => {
      return state.clientRequests.filter(r => r.status === 'PENDING').length
    },

    activeClientsCount: (state) => {
      return state.clients.length
    },

    readyForFundingCount: (state) => {
      return state.clients.filter(c => c.fundingStatus === 'READY_FOR_FUNDING').length
    },

    profileCompleteness: (state) => {
      let score = 0
      const p = state.profile
      if (p.name) score += 10
      if (p.title) score += 10
      if (p.phone) score += 10
      if (p.firmName) score += 10
      if (p.specialization) score += 10
      if (p.bnspLicense) score += 15
      if (p.bio && p.bio.length > 20) score += 15
      if (p.documents && p.documents.length >= 1) score += 10
      if (p.documents && p.documents.length >= 3) score += 10
      return Math.min(100, score)
    },

    getClientById: (state) => (id: string) => {
      return state.clients.find(c => c.id === id)
    },

    getClientActionPlans: (state) => (clientId: string) => {
      return state.actionPlans.filter(p => p.clientId === clientId)
    }
  },

  actions: {
    // 1. Terima Permintaan Bimbingan dari UMKM -> Resmi Pindah ke Klien Aktif
    acceptRequest(requestId: string) {
      const reqIndex = this.clientRequests.findIndex(r => r.id === requestId)
      if (reqIndex === -1) return
      const req = this.clientRequests[reqIndex]

      // Periksa apakah UMKM sudah ada di daftar binaan
      const existingClient = this.clients.find(c => c.id === req.umkmId || c.name === req.businessName)
      if (!existingClient) {
        const fee = req.offeredFee || (req.revenue >= 35000000 ? 2000000 : req.revenue >= 25000000 ? 1500000 : 1200000)
        const targetFunding = req.revenue ? Math.max(100000000, Math.round((req.revenue * 5) / 10000000) * 10000000) : 150000000
        const newClient: ClientUmkm = {
          id: req.umkmId,
          name: req.businessName,
          owner: req.ownerName,
          sector: req.sector,
          city: req.city,
          healthScore: req.healthScore || 65,
          status: (req.healthScore || 65) >= 75 ? 'healthy' : (req.healthScore || 65) >= 60 ? 'warning' : 'danger',
          fundingStatus: 'IN_REVIEW',
          monthlyStatus: 'PENDING',
          lastAuditDate: 'Baru',
          fundingTarget: targetFunding,
          tasksCompleted: 0,
          totalTasks: 3,
          growthPct: 0,
          joinedDate: 'Hari ini',
          monthlyFee: fee,
          durationMonths: req.durationMonths || 3,
          isNew: true
        }
        this.clients.unshift(newClient)

        // Buat 1 action plan selamat datang perdana
        this.actionPlans.unshift({
          id: `plan-${Date.now()}`,
          clientId: req.umkmId,
          clientName: req.businessName,
          title: 'Konsultasi Perdana & Diagnosa 5 Pilar Bisnis',
          description: 'Lakukan sesi diskusi via WhatsApp/Zoom untuk memetakan tantangan utama usaha dan menyusun target 30 hari ke depan.',
          pillar: 'Operasional',
          priority: 'Tinggi',
          status: 'TODO',
          targetDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' }),
          assignedAt: 'Hari ini',
          consultantNotes: 'Diskusikan hasil diagnosa awal dan target perbaikan.'
        })
      }

      // Hapus dari daftar permintaan masuk karena sudah resmi pindah ke klien aktif
      this.clientRequests.splice(reqIndex, 1)
    },

    // 2. Tolak Permintaan Bimbingan dari UMKM
    rejectRequest(requestId: string, reason?: string) {
      const reqIndex = this.clientRequests.findIndex(r => r.id === requestId)
      if (reqIndex === -1) return
      this.clientRequests.splice(reqIndex, 1)
    },

    // 3. Tambah Action Plan untuk UMKM Binaan
    addActionPlan(payload: {
      clientId: string
      title: string
      description: string
      pillar: 'Keuangan' | 'Operasional' | 'Legalitas' | 'Pemasaran' | 'SDM'
      priority: 'Tinggi' | 'Sedang' | 'Rendah'
      targetDate: string
      consultantNotes?: string
    }) {
      const client = this.clients.find(c => c.id === payload.clientId)
      const clientName = client ? client.name : 'UMKM Binaan'

      const newPlan: ActionPlanItem = {
        id: `plan-${Date.now()}`,
        clientId: payload.clientId,
        clientName,
        title: payload.title,
        description: payload.description,
        pillar: payload.pillar,
        priority: payload.priority,
        status: 'TODO',
        targetDate: payload.targetDate,
        assignedAt: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' }),
        consultantNotes: payload.consultantNotes
      }

      this.actionPlans.unshift(newPlan)

      // Update totalTasks pada client
      if (client) {
        client.totalTasks = (client.totalTasks || 0) + 1
      }

      return newPlan
    },

    // 4. Update Status Action Plan
    updateActionPlanStatus(planId: string, status: 'TODO' | 'IN_PROGRESS' | 'DONE') {
      const plan = this.actionPlans.find(p => p.id === planId)
      if (!plan) return

      const prevStatus = plan.status
      plan.status = status

      // Update tasksCompleted counter pada client
      const client = this.clients.find(c => c.id === plan.clientId)
      if (client) {
        if (status === 'DONE' && prevStatus !== 'DONE') {
          client.tasksCompleted = (client.tasksCompleted || 0) + 1
        } else if (prevStatus === 'DONE' && status !== 'DONE') {
          client.tasksCompleted = Math.max(0, (client.tasksCompleted || 0) - 1)
        }
      }
    },

    // 5. Hapus Action Plan
    deleteActionPlan(planId: string) {
      const idx = this.actionPlans.findIndex(p => p.id === planId)
      if (idx !== -1) {
        const plan = this.actionPlans[idx]
        const client = this.clients.find(c => c.id === plan.clientId)
        if (client) {
          client.totalTasks = Math.max(0, (client.totalTasks || 0) - 1)
          if (plan.status === 'DONE') {
            client.tasksCompleted = Math.max(0, (client.tasksCompleted || 0) - 1)
          }
        }
        this.actionPlans.splice(idx, 1)
      }
    },

    // 6. Update Profil Konsultan
    updateProfile(updatedData: Partial<ConsultantProfileData>) {
      this.profile = {
        ...this.profile,
        ...updatedData
      }
    },

    // 7. Upload Dokumen Sertifikasi/Portofolio Konsultan
    uploadDocument(doc: {
      name: string
      type: 'BNSP_CERT' | 'PORTOFOLIO' | 'KTP_NPWP' | 'OTHER'
      filename: string
      fileSize: string
    }) {
      const newDoc: ConsultantDocument = {
        id: `doc-${Date.now()}`,
        name: doc.name,
        type: doc.type,
        filename: doc.filename,
        fileSize: doc.fileSize,
        uploadedAt: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' }),
        status: 'PENDING_REVIEW'
      }
      this.profile.documents.push(newDoc)
      return newDoc
    },

    // 8. Hapus Dokumen
    removeDocument(docId: string) {
      this.profile.documents = this.profile.documents.filter(d => d.id !== docId)
    },

    // Validasi Kas Bulanan
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
