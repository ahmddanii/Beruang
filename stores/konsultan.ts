import { defineStore } from 'pinia'
import { useApi } from '~/composables/useApi'

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

export interface ClientAssessmentAspect {
  id: string
  name: string
  score: number
  maxScore: number
  targetScore: number
  notes: string
  status: 'good' | 'warning' | 'needs_work'
}

export interface ClientMilestone {
  id: string
  clientId: string
  order: number
  title: string
  description: string
  targetDate?: string
}

export interface ClientTask {
  id: string
  clientId: string
  milestoneId: string
  title: string
  description: string
  category: 'Finansial' | 'Operasional' | 'Pemasaran' | 'Legalitas' | 'Tata Kelola' | 'SDM'
  priority: 'Tinggi' | 'Sedang' | 'Rendah'
  status: 'TODO' | 'IN_PROGRESS' | 'DONE'
  completed: boolean
  dueDate: string
  consultantNote?: string
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

export interface ProgressValidationHistoryItem {
  id: string
  clientId: string
  clientName: string
  month: string
  omzet: number
  hpp: number
  opex: number
  verifiedAt: string
  consultantNotes?: string
  status: 'VERIFIED' | 'REVISED'
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

export function getDemoConsultantProfile(): ConsultantProfileData {
  return {
    name: 'Dra. Maya Suryani, M.M.',
    title: 'Konsultan Ahli Keuangan & Audit UMKM',
    email: 'maya.suryani@beruang.id',
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
  }
}

export function getEmptyConsultantProfile(): ConsultantProfileData {
  return {
    name: '',
    title: '',
    email: '',
    phone: '',
    firmName: '',
    specialization: '',
    experience: '',
    bnspLicense: '',
    city: '',
    bio: '',
    maxClients: 10,
    avatar: '/images/user-profile.png',
    documents: [] as ConsultantDocument[]
  }
}

export const useKonsultanStore = defineStore('konsultan', {
  state: () => ({
    // Profil Konsultan: Jangan pakai mock Maya Suryani jika bukan akun demo
    profile: getEmptyConsultantProfile(),

    // Daftar Permintaan Bimbingan Masuk dari UMKM
    clientRequests: [] as ClientMentorshipRequest[],

    // Daftar UMKM Klien Binaan Aktif
    clients: [] as ClientUmkm[],

    // Daftar Action Plan yang Diberikan Konsultan untuk Klien Binaan
    actionPlans: [] as ActionPlanItem[],

    // Antrean Validasi Kas
    validationsQueue: [] as CashValidationQueueItem[],

    // Riwayat Validasi Kas yang Disahkan
    validationHistory: [] as ProgressValidationHistoryItem[],

    // Peringatan Anomali
    alerts: [] as AnomalyAlert[],

    // 5 Aspek Fundamental Radar per Klien
    clientAssessments: {} as Record<string, AssessmentPillar[]>,

    // Daftar Target & Milestone
    clientMilestones: [] as ClientMilestone[],

    // Daftar Task di dalam Milestone
    clientTasks: [] as ClientTask[]
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
    initProfileForUser(user?: { email?: string; name?: string; phone?: string; businessName?: string }) {
      if (user?.email && user.email.includes('maya.suryani')) {
        this.profile = getDemoConsultantProfile()
      } else if (user) {
        this.profile = {
          ...getEmptyConsultantProfile(),
          name: user.name || '',
          email: user.email || '',
          phone: user.phone || '',
          firmName: user.businessName || ''
        }
      } else {
        this.profile = getEmptyConsultantProfile()
      }
    },

    async fetchProfile() {
      try {
        const authStore = useAuthStore()
        const isDemoMaya = Boolean(authStore.currentUser?.email?.includes('maya.suryani'))

        const res = await useApi<any>('/consultant/profile')
        if (res.data) {
          const d = res.data
          const fallback = isDemoMaya ? getDemoConsultantProfile() : getEmptyConsultantProfile()

          this.profile = {
            name: d.name || authStore.currentUser?.name || this.profile.name || (isDemoMaya ? fallback.name : ''),
            title: d.title || this.profile.title || (isDemoMaya ? fallback.title : ''),
            email: d.email || authStore.currentUser?.email || this.profile.email || (isDemoMaya ? fallback.email : ''),
            phone: d.phone || authStore.currentUser?.phone || this.profile.phone || (isDemoMaya ? fallback.phone : ''),
            firmName: d.firmName || authStore.currentUser?.businessName || this.profile.firmName || (isDemoMaya ? fallback.firmName : ''),
            specialization: d.specialization || this.profile.specialization || (isDemoMaya ? fallback.specialization : ''),
            experience: d.experience || this.profile.experience || (isDemoMaya ? fallback.experience : ''),
            bnspLicense: d.bnspLicense || this.profile.bnspLicense || (isDemoMaya ? fallback.bnspLicense : ''),
            city: d.city || this.profile.city || (isDemoMaya ? fallback.city : ''),
            bio: d.bio || this.profile.bio || (isDemoMaya ? fallback.bio : ''),
            avatar: d.avatar || authStore.currentUser?.avatar || this.profile.avatar || fallback.avatar,
            maxClients: d.maxClients || this.profile.maxClients || 10,
            documents: Array.isArray(d.documents) && d.documents.length > 0
              ? d.documents
              : (isDemoMaya ? fallback.documents : (this.profile.documents || []))
          }
        } else if (isDemoMaya) {
          this.profile = getDemoConsultantProfile()
        } else if (authStore.currentUser) {
          this.profile = {
            ...getEmptyConsultantProfile(),
            name: authStore.currentUser.name || '',
            email: authStore.currentUser.email || '',
            phone: authStore.currentUser.phone || ''
          }
        }
      } catch (err: any) {
        console.warn('Gagal memuat profil konsultan dari API:', err?.message)
      }
    },

    async uploadDocument(payload: {
      name: string
      type: 'BNSP_CERT' | 'PORTOFOLIO' | 'KTP_NPWP' | 'OTHER'
      filename: string
      fileSize?: string
      fileUrl?: string
    }) {
      const newDoc: ConsultantDocument = {
        id: `doc-${Date.now()}`,
        name: payload.name,
        type: payload.type,
        filename: payload.filename,
        fileSize: payload.fileSize || '1.5 MB',
        uploadedAt: 'Hari ini',
        status: 'VERIFIED'
      }
      if (!this.profile.documents) {
        this.profile.documents = []
      }
      this.profile.documents.push(newDoc)

      try {
        await useApi('/consultant/documents', {
          method: 'POST',
          body: newDoc
        })
      } catch (err: any) {
        console.warn('Gagal simpan dokumen konsultan ke backend:', err?.message)
      }
      return newDoc
    },

    async removeDocument(docId: string) {
      if (this.profile.documents) {
        this.profile.documents = this.profile.documents.filter(d => d.id !== docId)
      }
      try {
        await useApi(`/consultant/documents/${docId}`, {
          method: 'DELETE'
        })
      } catch (err: any) {
        console.warn('Gagal hapus dokumen konsultan di backend:', err?.message)
      }
    },

    async updateProfile(payload: Partial<ConsultantProfileData>) {
      this.profile = { ...this.profile, ...payload }
      try {
        await useApi('/consultant/profile', {
          method: 'PUT',
          body: {
            name: this.profile.name,
            title: this.profile.title,
            phone: this.profile.phone,
            firmName: this.profile.firmName,
            specialization: this.profile.specialization,
            experience: this.profile.experience,
            bnspLicense: this.profile.bnspLicense,
            city: this.profile.city,
            bio: this.profile.bio,
            maxClients: this.profile.maxClients
          }
        })
      } catch (err: any) {
        console.warn('Gagal simpan profil konsultan ke backend:', err?.message)
      }
    },

    async fetchDashboard() {
      try {
        const res = await useApi<any>('/consultant/dashboard')
        if (res.data) {
          // Sync live dashboard data
        }
      } catch (err: any) {
        console.warn('Gagal memuat dashboard konsultan live:', err?.message)
      }
    },

    async fetchClients() {
      try {
        const res = await useApi<any>('/consultant/clients')
        if (res.data) {
          const list = Array.isArray(res.data) ? res.data : (res.data as any).data
          if (Array.isArray(list)) {
            this.clients = list
          }
        }
      } catch (err: any) {
        console.warn('Gagal memuat klien konsultan live:', err?.message)
      }
    },

    async fetchValidations() {
      try {
        const res = await useApi<any>('/consultant/validations')
        if (res.data) {
          const list = Array.isArray(res.data) ? res.data : (res.data as any).data
          if (Array.isArray(list)) {
            this.validationsQueue = list
          }
        }
      } catch (err: any) {
        console.warn('Gagal memuat antrean validasi konsultan:', err?.message)
      }
    },

    async fetchAlerts() {
      try {
        const res = await useApi<any>('/consultant/alerts')
        if (res.data) {
          const list = Array.isArray(res.data) ? res.data : (res.data as any).data
          if (Array.isArray(list)) {
            this.alerts = list
          }
        }
      } catch (err: any) {
        console.warn('Gagal memuat alerts konsultan:', err?.message)
      }
    },

    async fetchRequests() {
      try {
        const res = await useApi<any>('/consultant/requests')
        if (res.data) {
          const list = Array.isArray(res.data) ? res.data : (res.data as any).data
          if (Array.isArray(list)) {
            this.clientRequests = list
          }
        }
      } catch (err: any) {
        console.warn('Gagal memuat requests konsultan:', err?.message)
      }
    },

    // 1. Terima Permintaan Bimbingan dari UMKM -> Resmi Pindah ke Klien Aktif
    async acceptRequest(requestId: string) {
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

      try {
        await useApi(`/consultant/requests/${requestId}/accept`, { method: 'POST' })
      } catch (err: any) {
        console.warn('Gagal accept request di backend:', err?.message)
      }
    },

    // 2. Tolak Permintaan Bimbingan dari UMKM
    async rejectRequest(requestId: string, reason?: string) {
      const reqIndex = this.clientRequests.findIndex(r => r.id === requestId)
      if (reqIndex === -1) return
      this.clientRequests.splice(reqIndex, 1)

      try {
        await useApi(`/consultant/requests/${requestId}/reject`, {
          method: 'POST',
          body: { reason }
        })
      } catch (err: any) {
        console.warn('Gagal reject request di backend:', err?.message)
      }
    },

    async fetchActionPlans() {
      try {
        const res = await useApi<any>('/consultant/action-plans')
        if (res.data) {
          const list = Array.isArray(res.data) ? res.data : (res.data as any).data
          if (Array.isArray(list)) {
            this.actionPlans = list
          }
        }
      } catch (err: any) {
        console.warn('Gagal memuat action plans:', err?.message)
      }
    },

    // 3. Tambah Action Plan untuk UMKM Binaan
    async addActionPlan(payload: {
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

      try {
        const res = await useApi<any>('/consultant/action-plans', {
          method: 'POST',
          body: payload
        })
        if (res?.data?.id) {
          newPlan.id = res.data.id
        }
      } catch (err: any) {
        console.warn('Gagal simpan action plan ke backend:', err?.message)
      }

      return newPlan
    },

    // 4. Update Status Action Plan
    async updateActionPlanStatus(planId: string, status: 'TODO' | 'IN_PROGRESS' | 'DONE') {
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

      try {
        await useApi(`/consultant/action-plans/${planId}`, {
          method: 'PATCH',
          body: { status }
        })
      } catch (err: any) {
        console.warn('Gagal update status action plan di backend:', err?.message)
      }
    },

    // 5. Hapus Action Plan
    async deleteActionPlan(planId: string) {
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

      try {
        await useApi(`/consultant/action-plans/${planId}`, {
          method: 'DELETE'
        })
      } catch (err: any) {
        console.warn('Gagal hapus action plan di backend:', err?.message)
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
    async approveValidation(validationId: string, notes?: string) {
      const idx = this.validationsQueue.findIndex(v => v.id === validationId)
      if (idx !== -1) {
        const item = this.validationsQueue[idx]
        const client = this.clients.find(c => c.id === item.clientId)
        if (client) {
          client.monthlyStatus = 'VERIFIED'
          client.lastAuditDate = new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })
        }

        // Simpan ke riwayat validasi
        this.validatedHistory.unshift({
          id: `hist-${Date.now()}`,
          clientId: item.clientId,
          clientName: item.clientName,
          month: item.month,
          omzet: item.omzet,
          hpp: item.hpp,
          opex: item.opex,
          verifiedAt: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' }),
          consultantNotes: notes || 'Telah diverifikasi sesuai kesesuaian bukti rekening koran & struk POS.',
          status: 'VERIFIED'
        })

        this.validationsQueue.splice(idx, 1)

        try {
          await useApi(`/consultant/validations/${validationId}/verify`, {
            method: 'POST',
            body: { notes }
          })
        } catch (err: any) {
          console.warn('Gagal memverifikasi di backend:', err?.message)
        }
      }
    },

    async rejectValidation(validationId: string, reason?: string) {
      const idx = this.validationsQueue.findIndex(v => v.id === validationId)
      if (idx !== -1) {
        const item = this.validationsQueue[idx]
        const client = this.clients.find(c => c.id === item.clientId)
        if (client) {
          client.monthlyStatus = 'PENDING'
        }

        // Simpan ke riwayat dengan status revisi
        this.validatedHistory.unshift({
          id: `hist-${Date.now()}`,
          clientId: item.clientId,
          clientName: item.clientName,
          month: item.month,
          omzet: item.omzet,
          hpp: item.hpp,
          opex: item.opex,
          verifiedAt: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' }),
          consultantNotes: reason || 'Diminta revisi pencatatan oleh konsultan pendamping.',
          status: 'REVISED'
        })

        this.validationsQueue.splice(idx, 1)

        try {
          await useApi(`/consultant/validations/${validationId}/request-revision`, {
            method: 'POST',
            body: { reason }
          })
        } catch (err: any) {
          console.warn('Gagal meminta revisi di backend:', err?.message)
        }
      }
    },

    async certifyClientReady(clientId: string) {
      const client = this.clients.find(c => c.id === clientId)
      if (client) {
        client.fundingStatus = 'READY_FOR_FUNDING'
        client.lastAuditDate = new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })
      }

      try {
        await useApi(`/consultant/clients/${clientId}/certify`, { method: 'POST' })
      } catch (err: any) {
        console.warn('Gagal sertifikasi klien di backend:', err?.message)
      }
    },

    dismissAlert(alertId: string) {
      const alert = this.alerts.find(a => a.id === alertId)
      if (alert) alert.dismissed = true
    },

    // 9. Mendapatkan 5 Aspek Fundamental Radar Klien
    getClientAssessment(clientId: string): ClientAssessmentAspect[] {
      if (this.clientAssessments[clientId]) {
        return this.clientAssessments[clientId]
      }
      const client = this.clients.find(c => c.id === clientId)
      const baseScore = client ? client.healthScore : 70
      const defaultAspects: ClientAssessmentAspect[] = [
        { id: 'fin', name: 'Finansial & Arus Kas', score: Math.min(100, Math.max(40, baseScore - 2)), maxScore: 100, targetScore: 85, status: baseScore >= 75 ? 'good' : 'warning', notes: 'Pencatatan kas dan margin keuntungan usaha.' },
        { id: 'ops', name: 'Operasional & SOP', score: Math.min(100, Math.max(40, baseScore + 4)), maxScore: 100, targetScore: 80, status: baseScore >= 75 ? 'good' : 'warning', notes: 'Standar prosedur operasional dan kartu stok harian.' },
        { id: 'leg', name: 'Legalitas & Izin', score: Math.min(100, Math.max(40, baseScore + 10)), maxScore: 100, targetScore: 90, status: baseScore >= 75 ? 'good' : 'warning', notes: 'Kelengkapan NIB, izin edar, dan izin usaha resmi.' },
        { id: 'mkt', name: 'Pasar & Pemasaran', score: Math.min(100, Math.max(40, baseScore - 8)), maxScore: 100, targetScore: 75, status: baseScore >= 75 ? 'good' : 'warning', notes: 'Daya saing produk dan saluran distribusi pemasaran.' },
        { id: 'gov', name: 'SDM & Tata Kelola', score: Math.min(100, Math.max(40, baseScore - 4)), maxScore: 100, targetScore: 80, status: baseScore >= 75 ? 'good' : 'warning', notes: 'Kerapian pembagian tugas dan pengelolaan tim kerja.' }
      ]
      this.clientAssessments[clientId] = defaultAspects
      return defaultAspects
    },

    // 10. Memperbarui 5 Aspek Fundamental Radar Klien
    async updateClientAssessment(clientId: string, aspects: ClientAssessmentAspect[]) {
      this.clientAssessments[clientId] = JSON.parse(JSON.stringify(aspects))
      const avg = Math.round(aspects.reduce((sum, a) => sum + (Number(a.score) || 0), 0) / (aspects.length || 1))
      const client = this.clients.find(c => c.id === clientId)
      if (client) {
        client.healthScore = avg
        client.status = avg >= 75 ? 'healthy' : avg >= 60 ? 'warning' : 'danger'
        client.lastAuditDate = new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })
        if (avg >= 80 && (client.tasksCompleted || 0) >= (client.totalTasks || 1)) {
          client.fundingStatus = 'READY_FOR_FUNDING'
        }
      }

      try {
        const fin = aspects.find(a => a.id === 'fin')?.score
        const ops = aspects.find(a => a.id === 'ops')?.score
        const mkt = aspects.find(a => a.id === 'mkt')?.score
        const gov = aspects.find(a => a.id === 'gov')?.score
        const leg = aspects.find(a => a.id === 'leg')?.score

        await useApi(`/consultant/clients/${clientId}/assessment`, {
          method: 'PUT',
          body: {
            financial: fin,
            operations: ops,
            marketing: mkt,
            governance: gov,
            legal: leg
          }
        })
      } catch (err: any) {
        console.warn('Gagal simpan skor asesmen ke backend:', err?.message)
      }
    },

    // 11. Mendapatkan Milestones Klien
    getClientMilestones(clientId: string): ClientMilestone[] {
      const list = this.clientMilestones.filter(m => m.clientId === clientId)
      if (list.length === 0) {
        // Otomatis buatkan milestone panduan standar untuk klien baru
        const defaultM1: ClientMilestone = {
          id: `ms-${clientId}-1`,
          clientId,
          order: 1,
          title: 'Konsultasi Perdana & Diagnosa 5 Pilar Bisnis',
          description: 'Sesi diagnosa awal, identifikasi masalah utama, dan penyusunan roadmap target bimbingan.',
          targetDate: 'Bulan 1'
        }
        const defaultM2: ClientMilestone = {
          id: `ms-${clientId}-2`,
          clientId,
          order: 2,
          title: 'Pembenahan Tata Kelola & Disiplin Pencatatan Kas',
          description: 'Standardisasi rekening usaha, penataan kartu stok, dan pencatatan kas harian konsisten.',
          targetDate: 'Bulan 2'
        }
        this.clientMilestones.push(defaultM1, defaultM2)
        return [defaultM1, defaultM2]
      }
      return [...list].sort((a, b) => a.order - b.order)
    },

    // 12. Mendapatkan Tasks Klien
    getClientTasks(clientId: string, milestoneId?: string): ClientTask[] {
      let list = this.clientTasks.filter(t => t.clientId === clientId)
      if (milestoneId) {
        list = list.filter(t => t.milestoneId === milestoneId)
      }
      return list
    },

    // 13. Tambah Milestone Baru untuk Klien
    addMilestone(payload: {
      clientId: string
      title: string
      description: string
      order?: number
      targetDate?: string
    }): ClientMilestone {
      const existing = this.clientMilestones.filter(m => m.clientId === payload.clientId)
      const nextOrder = payload.order || (existing.length + 1)
      const newMilestone: ClientMilestone = {
        id: `ms-${Date.now()}`,
        clientId: payload.clientId,
        order: nextOrder,
        title: payload.title,
        description: payload.description,
        targetDate: payload.targetDate || `Bulan ${nextOrder}`
      }
      this.clientMilestones.push(newMilestone)
      return newMilestone
    },

    // 14. Update Milestone
    updateMilestone(milestoneId: string, payload: Partial<ClientMilestone>) {
      const ms = this.clientMilestones.find(m => m.id === milestoneId)
      if (ms) {
        Object.assign(ms, payload)
      }
    },

    // 15. Hapus Milestone
    deleteMilestone(milestoneId: string) {
      const ms = this.clientMilestones.find(m => m.id === milestoneId)
      if (!ms) return
      const clientId = ms.clientId
      this.clientMilestones = this.clientMilestones.filter(m => m.id !== milestoneId)
      // Hapus juga task di dalam milestone ini
      const deletedTasks = this.clientTasks.filter(t => t.milestoneId === milestoneId)
      this.clientTasks = this.clientTasks.filter(t => t.milestoneId !== milestoneId)
      
      const client = this.clients.find(c => c.id === clientId)
      if (client) {
        client.totalTasks = Math.max(0, (client.totalTasks || 0) - deletedTasks.length)
        const completedCount = deletedTasks.filter(t => t.completed || t.status === 'DONE').length
        client.tasksCompleted = Math.max(0, (client.tasksCompleted || 0) - completedCount)
      }
    },

    // 16. Tambah Task Baru untuk Klien
    addTask(payload: {
      clientId: string
      milestoneId: string
      title: string
      description: string
      category?: 'Finansial' | 'Operasional' | 'Pemasaran' | 'Legalitas' | 'Tata Kelola' | 'SDM'
      priority?: 'Tinggi' | 'Sedang' | 'Rendah'
      dueDate?: string
      consultantNote?: string
    }): ClientTask {
      const newTask: ClientTask = {
        id: `ct-${Date.now()}`,
        clientId: payload.clientId,
        milestoneId: payload.milestoneId,
        title: payload.title,
        description: payload.description,
        category: payload.category || 'Operasional',
        priority: payload.priority || 'Tinggi',
        status: 'TODO',
        completed: false,
        dueDate: payload.dueDate || '2 Minggu ke Depan',
        consultantNote: payload.consultantNote
      }
      this.clientTasks.push(newTask)

      const client = this.clients.find(c => c.id === payload.clientId)
      if (client) {
        client.totalTasks = (client.totalTasks || 0) + 1
      }
      return newTask
    },

    // 17. Update Status Task
    updateTaskStatus(taskId: string, status: 'TODO' | 'IN_PROGRESS' | 'DONE') {
      const task = this.clientTasks.find(t => t.id === taskId)
      if (!task) return
      const prevStatus = task.status
      task.status = status
      task.completed = status === 'DONE'

      const client = this.clients.find(c => c.id === task.clientId)
      if (client) {
        if (status === 'DONE' && prevStatus !== 'DONE') {
          client.tasksCompleted = (client.tasksCompleted || 0) + 1
        } else if (prevStatus === 'DONE' && status !== 'DONE') {
          client.tasksCompleted = Math.max(0, (client.tasksCompleted || 0) - 1)
        }
      }
    },

    // 18. Hapus Task
    deleteTask(taskId: string) {
      const idx = this.clientTasks.findIndex(t => t.id === taskId)
      if (idx !== -1) {
        const task = this.clientTasks[idx]
        const client = this.clients.find(c => c.id === task.clientId)
        if (client) {
          client.totalTasks = Math.max(0, (client.totalTasks || 0) - 1)
          if (task.completed || task.status === 'DONE') {
            client.tasksCompleted = Math.max(0, (client.tasksCompleted || 0) - 1)
          }
        }
        this.clientTasks.splice(idx, 1)
      }
    }
  }
})
