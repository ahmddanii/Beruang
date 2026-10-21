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
        notes: 'Pencatatan nota penjualan offline workshop dan pesanan Tokopedia.'
      },
      {
        id: 'val-02',
        clientId: 'umkm-01',
        clientName: 'Kopi Senja Nusantara',
        month: 'September 2026',
        omzet: 73000000,
        hpp: 34500000,
        opex: 18000000,
        proofDocument: 'mutasi_bank_bca_dan_pos_moka_sep2026.pdf',
        submittedAt: '24 Sep 2026 10:15',
        notes: 'Rekap mutasi rekening operasional BCA dan struk POS Moka dari 3 outlet Bandung.'
      },
      {
        id: 'val-03',
        clientId: 'umkm-04',
        clientName: 'Dapur Mama Catering',
        month: 'Agustus 2026',
        omzet: 28000000,
        hpp: 16200000,
        opex: 10300000,
        proofDocument: 'rekap_kasir_dan_nota_pasar_agu2026.pdf',
        submittedAt: '20 Agu 2026 16:45',
        notes: 'Laporan kasir pesanan hajatan katering dan bon belanja bahan mentah pasar.'
      }
    ] as ProgressValidationItem[],

    // Riwayat Validasi Kas yang Telah Diproses
    validatedHistory: [
      {
        id: 'hist-01',
        clientId: 'umkm-03',
        clientName: 'Sambal Bu Broto',
        month: 'Agustus 2026',
        omzet: 125000000,
        hpp: 58000000,
        opex: 26000000,
        verifiedAt: '15 Sep 2026',
        consultantNotes: 'Pembukuan kas pabrik sambal sangat rapi, mutasi bank sesuai sistem POS.',
        status: 'VERIFIED'
      },
      {
        id: 'hist-02',
        clientId: 'umkm-01',
        clientName: 'Kopi Senja Nusantara',
        month: 'Agustus 2026',
        omzet: 65000000,
        hpp: 28000000,
        opex: 16500000,
        verifiedAt: '10 Sep 2026',
        consultantNotes: 'Validasi mutasi bank dan kartu stok biji kopi beres tanpa selisih.',
        status: 'VERIFIED'
      },
      {
        id: 'hist-03',
        clientId: 'umkm-02',
        clientName: 'Batik Lestari Heritage',
        month: 'Juli 2026',
        omzet: 38000000,
        hpp: 18000000,
        opex: 10500000,
        verifiedAt: '05 Agu 2026',
        consultantNotes: 'Arus kas toko batik tervalidasi siap untuk pelaporan investor.',
        status: 'VERIFIED'
      }
    ] as ProgressValidationHistoryItem[],

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
    ] as AnomalyAlert[],

    // 5 Aspek Fundamental Radar per Klien
    clientAssessments: {
      'umkm-01': [
        { id: 'fin', name: 'Finansial & Arus Kas', score: 78, maxScore: 100, targetScore: 85, status: 'good', notes: 'Margin kotor di atas 45%, rasio kas sehat 4 bulan operasional. Disiplin pelaporan kas harian rapi.' },
        { id: 'ops', name: 'Operasional & SOP', score: 85, maxScore: 100, targetScore: 80, status: 'good', notes: 'SOP resep minuman dan kartu stok mingguan sudah berjalan tertib di seluruh 3 outlet.' },
        { id: 'leg', name: 'Legalitas & Izin', score: 92, maxScore: 100, targetScore: 90, status: 'good', notes: 'NIB RBA, sertifikat Halal BPJPH aktif, izin P-IRT dan sewa tempat aman.' },
        { id: 'mkt', name: 'Pasar & Pemasaran', score: 64, maxScore: 100, targetScore: 75, status: 'warning', notes: 'Perlu perluasan kanal penjualan non-ojol dan promosi brand awareness terarah.' },
        { id: 'gov', name: 'SDM & Tata Kelola', score: 75, maxScore: 100, targetScore: 80, status: 'good', notes: 'Struktur tim gerai jelas dengan Store Leader di tiap cabang serta insentif target.' }
      ],
      'umkm-02': [
        { id: 'fin', name: 'Finansial & Arus Kas', score: 68, maxScore: 100, targetScore: 85, status: 'warning', notes: 'Pemisahan kas workshop batik dan belanja rumah tangga masih perlu penegasan.' },
        { id: 'ops', name: 'Operasional & SOP', score: 74, maxScore: 100, targetScore: 80, status: 'warning', notes: 'SOP pewarnaan malam batik alami butuh pencatatan takaran baku.' },
        { id: 'leg', name: 'Legalitas & Izin', score: 65, maxScore: 100, targetScore: 90, status: 'warning', notes: 'Pendaftaran HAKI motif orisinal Pekalongan dalam tahap pemeriksaan substantif.' },
        { id: 'mkt', name: 'Pasar & Pemasaran', score: 82, maxScore: 100, targetScore: 75, status: 'good', notes: 'Permintaan pameran kriya dan jaringan reseller luar kota sangat kuat.' },
        { id: 'gov', name: 'SDM & Tata Kelola', score: 66, maxScore: 100, targetScore: 80, status: 'warning', notes: 'Perlu program magang regenerasi perajin batik canting muda.' }
      ],
      'umkm-03': [
        { id: 'fin', name: 'Finansial & Arus Kas', score: 90, maxScore: 100, targetScore: 85, status: 'good', notes: 'Arus kas sangat stabil dengan cadangan dana lancar di atas 6 bulan.' },
        { id: 'ops', name: 'Operasional & SOP', score: 88, maxScore: 100, targetScore: 80, status: 'good', notes: 'Kapasitas produksi pabrik sambal modern, standar sanitasi higienis tinggi.' },
        { id: 'leg', name: 'Legalitas & Izin', score: 86, maxScore: 100, targetScore: 90, status: 'good', notes: 'Izin BPOM MD dan sertifikasi Halal lengkap terpasang di seluruh kemasan.' },
        { id: 'mkt', name: 'Pasar & Pemasaran', score: 92, maxScore: 100, targetScore: 75, status: 'good', notes: 'Kanal retail modern dan toko online nasional memiliki repeat order tinggi.' },
        { id: 'gov', name: 'SDM & Tata Kelola', score: 84, maxScore: 100, targetScore: 80, status: 'good', notes: 'Struktur manajemen profesional dengan sistem KPI produksi berbasis tim.' }
      ],
      'umkm-04': [
        { id: 'fin', name: 'Finansial & Arus Kas', score: 48, maxScore: 100, targetScore: 85, status: 'needs_work', notes: 'Biaya belanja bahan mentah dan transportasi logistik menekan margin bersih.' },
        { id: 'ops', name: 'Operasional & SOP', score: 56, maxScore: 100, targetScore: 80, status: 'needs_work', notes: 'SOP estimasi porsi katering butuh revisi untuk menekan sisa bahan mentah.' },
        { id: 'leg', name: 'Legalitas & Izin', score: 50, maxScore: 100, targetScore: 90, status: 'needs_work', notes: 'Sertifikasi laik higiene sanitasi jasaboga sedang dalam pemenuhan berkas.' },
        { id: 'mkt', name: 'Pasar & Pemasaran', score: 60, maxScore: 100, targetScore: 75, status: 'warning', notes: 'Perlu penetrasi paket wedding expo dan korporasi untuk menutup beban tetap.' },
        { id: 'gov', name: 'SDM & Tata Kelola', score: 56, maxScore: 100, targetScore: 80, status: 'needs_work', notes: 'Karyawan lepas harian butuh pelatihan dasar standar kebersihan saji.' }
      ]
    } as Record<string, ClientAssessmentAspect[]>,

    // Roadmap Milestone Binaan per Klien
    clientMilestones: [
      {
        id: 'ms-01-1',
        clientId: 'umkm-01',
        order: 1,
        title: 'Fondasi Pencatatan Kas & Legalitas Usaha',
        description: 'Standardisasi rekening operasional toko, izin usaha NIB berbasis risiko, dan pencatatan kas harian.',
        targetDate: 'Bulan 1'
      },
      {
        id: 'ms-01-2',
        clientId: 'umkm-01',
        order: 2,
        title: 'Efisiensi Biaya Bahan Baku & HPP',
        description: 'Negosiasi supplier biji kopi, standardisasi takaran resep, dan kontrol kartu stok mingguan.',
        targetDate: 'Bulan 2'
      },
      {
        id: 'ms-01-3',
        clientId: 'umkm-01',
        order: 3,
        title: 'Validasi Kepatuhan & Akses Modal Investor',
        description: 'Audit 3 bulan kepatuhan pembukuan kas dan penyusunan proposal investasi resmi.',
        targetDate: 'Bulan 3'
      },
      {
        id: 'ms-02-1',
        clientId: 'umkm-02',
        order: 1,
        title: 'Disiplin Arus Kas & Pemisahan Dompet Usaha',
        description: 'Pencatatan nota penjualan offline dan marketplace harian tanpa tercampur uang rumah tangga.',
        targetDate: 'Bulan 1'
      },
      {
        id: 'ms-02-2',
        clientId: 'umkm-02',
        order: 2,
        title: 'Standardisasi Mutu & Perlindungan HAKI Motif',
        description: 'Pendaftaran hak cipta motif batik tulis Pekalongan dan penguatan kontrak pengrajin lokal.',
        targetDate: 'Bulan 2'
      },
      {
        id: 'ms-03-1',
        clientId: 'umkm-03',
        order: 1,
        title: 'Standardisasi Mutu Ekspor & Audit Kesiapan Sindikasi',
        description: 'Pemeriksaan kepatuhan izin BPOM MD dan audit laporan laba bersih untuk tiket modal sindikasi.',
        targetDate: 'Bulan 1'
      },
      {
        id: 'ms-04-1',
        clientId: 'umkm-04',
        order: 1,
        title: 'Restrukturisasi Efisiensi Biaya Operasional Katering',
        description: 'Pemangkasan pemborosan bahan mentah, negosiasi kurir logistik, dan penetapan harga paket baru.',
        targetDate: 'Bulan 1'
      }
    ] as ClientMilestone[],

    // Daftar Task di dalam Milestone
    clientTasks: [
      {
        id: 'ct-01-1',
        clientId: 'umkm-01',
        milestoneId: 'ms-01-1',
        title: 'Pisahkan Rekening Operasional & Pribadi Usaha',
        description: 'Buka rekening bank khusus kas harian kedai dan integrasikan QRIS Beruang.',
        category: 'Finansial',
        priority: 'Tinggi',
        status: 'DONE',
        completed: true,
        dueDate: '10 Juli 2026',
        consultantNote: 'Terverifikasi per rekening koran Mandiri.'
      },
      {
        id: 'ct-01-2',
        clientId: 'umkm-01',
        milestoneId: 'ms-01-1',
        title: 'Lengkapi Izin Edar & NIB Berbasis Risiko',
        description: 'Pastikan KBLI kedai kopi sesuai dan sertifikat halal terbit resmi.',
        category: 'Legalitas',
        priority: 'Tinggi',
        status: 'DONE',
        completed: true,
        dueDate: '25 Juli 2026',
        consultantNote: 'NIB RBA dan sertifikat Halal BPJPH aktif.'
      },
      {
        id: 'ct-01-3',
        clientId: 'umkm-01',
        milestoneId: 'ms-01-2',
        title: 'Standardisasi Kartu Stok Biji Kopi Mingguan',
        description: 'Terapkan formulir opname bahan baku setiap Minggu malam di seluruh 3 outlet.',
        category: 'Operasional',
        priority: 'Tinggi',
        status: 'DONE',
        completed: true,
        dueDate: '15 Agustus 2026',
        consultantNote: 'Selisih stok bahan kini konsisten di bawah 2%.'
      },
      {
        id: 'ct-01-4',
        clientId: 'umkm-01',
        milestoneId: 'ms-01-2',
        title: 'Perbarui Kontrak Supplier Biji Kopi Ciwidey',
        description: 'Kunci harga bahan baku 6 bulan ke depan untuk menjaga margin minimal 50%.',
        category: 'Finansial',
        priority: 'Sedang',
        status: 'DONE',
        completed: true,
        dueDate: '30 Agustus 2026'
      },
      {
        id: 'ct-01-5',
        clientId: 'umkm-01',
        milestoneId: 'ms-01-2',
        title: 'Efisiensi Porsi Espresso 18g untuk Kontrol HPP',
        description: 'Pastikan seluruh barista menggunakan timbangan digital presisi pada setiap shot espresso.',
        category: 'Operasional',
        priority: 'Sedang',
        status: 'DONE',
        completed: true,
        dueDate: '10 September 2026',
        consultantNote: 'Rasio HPP berhasil ditekan kembali ke 44%.'
      },
      {
        id: 'ct-01-6',
        clientId: 'umkm-01',
        milestoneId: 'ms-01-3',
        title: 'Validasi Pembukuan Kas Harian Bulan September',
        description: 'Unggah rekapitulasi penjualan POS dan bukti rekening koran bulan September.',
        category: 'Finansial',
        priority: 'Tinggi',
        status: 'IN_PROGRESS',
        completed: false,
        dueDate: '05 Oktober 2026',
        consultantNote: 'Menunggu kelengkapan bukti nota pengeluaran operasional outlet 2.'
      },
      {
        id: 'ct-01-7',
        clientId: 'umkm-01',
        milestoneId: 'ms-01-3',
        title: 'Pembaruan Sertifikasi Laik Higiene Sanitasi & Halal Self-Declare',
        description: 'Lengkapi berkas pendaftaran sertifikasi Halal self-declare untuk menu minuman kopi susu.',
        category: 'Legalitas',
        priority: 'Sedang',
        status: 'TODO',
        completed: false,
        dueDate: '15 November 2026',
        consultantNote: 'Format formulir panduan audit sudah dibagikan.'
      },
      {
        id: 'ct-02-1',
        clientId: 'umkm-02',
        milestoneId: 'ms-02-1',
        title: 'Catat Arus Kas Harian Selama 30 Hari Tanpa Terputus',
        description: 'Gunakan fitur Catatan Kas Beruang untuk merekam setiap nota penjualan kain batik harian.',
        category: 'Finansial',
        priority: 'Tinggi',
        status: 'IN_PROGRESS',
        completed: false,
        dueDate: '25 Oktober 2026',
        consultantNote: 'Sudah mencapai hari ke-18 pencatatan rutin.'
      },
      {
        id: 'ct-02-2',
        clientId: 'umkm-02',
        milestoneId: 'ms-02-1',
        title: 'Integrasikan Mutasi Rekening Bank Mandiri ke Beruang',
        description: 'Sinkronisasi mutasi rekening kas usaha untuk mempermudah audit bulanan konsultan.',
        category: 'Finansial',
        priority: 'Tinggi',
        status: 'DONE',
        completed: true,
        dueDate: '15 September 2026'
      },
      {
        id: 'ct-02-3',
        clientId: 'umkm-02',
        milestoneId: 'ms-02-2',
        title: 'Dokumentasi 5 Desain Motif Batik Khas untuk HAKI',
        description: 'Siapkan foto resolusi tinggi, filosofi corak motif, dan surat pernyataan kepemilikan cipta.',
        category: 'Legalitas',
        priority: 'Sedang',
        status: 'IN_PROGRESS',
        completed: false,
        dueDate: '10 November 2026'
      },
      {
        id: 'ct-03-1',
        clientId: 'umkm-03',
        milestoneId: 'ms-03-1',
        title: 'Pemeriksaan Kalibrasi Mesin Segel Botol Sambal',
        description: 'Verifikasi hasil uji kebocoran kemasan botol sambal untuk standarisasi rantai pasok modern.',
        category: 'Operasional',
        priority: 'Tinggi',
        status: 'DONE',
        completed: true,
        dueDate: '20 September 2026'
      },
      {
        id: 'ct-03-2',
        clientId: 'umkm-03',
        milestoneId: 'ms-03-1',
        title: 'Audit Laporan Laba Bersih Q3 2026 untuk Sindikasi Investor',
        description: 'Finalisasi rekapitulasi laba kotor, opex, dan laba bersih bersama konsultan pendamping.',
        category: 'Finansial',
        priority: 'Tinggi',
        status: 'DONE',
        completed: true,
        dueDate: '30 September 2026',
        consultantNote: 'Laporan bersih tervalidasi siap dipromosikan.'
      },
      {
        id: 'ct-04-1',
        clientId: 'umkm-04',
        milestoneId: 'ms-04-1',
        title: 'Analisis Food Waste & Kontrol Porsi Bahan Mentah',
        description: 'Timbang sisa bahan mentah harian dan susun standar porsi menu katering hemat.',
        category: 'Operasional',
        priority: 'Tinggi',
        status: 'DONE',
        completed: true,
        dueDate: '20 September 2026'
      },
      {
        id: 'ct-04-2',
        clientId: 'umkm-04',
        milestoneId: 'ms-04-1',
        title: 'Negosiasi Kurir Borongan untuk Pengantaran Katering',
        description: 'Beralih ke sistem rute terjadwal atau kurir borongan untuk memangkas ongkos kirim.',
        category: 'Operasional',
        priority: 'Tinggi',
        status: 'TODO',
        completed: false,
        dueDate: '18 Oktober 2026',
        consultantNote: 'Klien perlu segera memangkas biaya transportasi.'
      },
      {
        id: 'ct-04-3',
        clientId: 'umkm-04',
        milestoneId: 'ms-04-1',
        title: 'Pemisahan Rekening Belanja Dapur dan Tabungan Pemilik',
        description: 'Buka rekening khusus giro belanja dapur basah agar tidak tercampur dana keluarga.',
        category: 'Finansial',
        priority: 'Tinggi',
        status: 'TODO',
        completed: false,
        dueDate: '25 Oktober 2026'
      }
    ] as ClientTask[]
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
          if (Array.isArray(list) && list.length > 0) {
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
          if (Array.isArray(list) && list.length > 0) {
            this.alerts = list
          }
        }
      } catch (err: any) {
        console.warn('Gagal memuat alerts konsultan:', err?.message)
      }
    },

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
    approveValidation(validationId: string, notes?: string) {
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
      }
    },

    rejectValidation(validationId: string, reason?: string) {
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
      }
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
    updateClientAssessment(clientId: string, aspects: ClientAssessmentAspect[]) {
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
