import { defineStore } from 'pinia'
import { useUmkmStore } from '~/stores/umkm'

export interface BusinessJourneyStep {
  month: string
  hppPercentage: number
  marginPercentage: number
  cashDisciplineScore: number
  milestone: string
  detail: string
}

export interface ConsultantEvaluationAspect {
  aspect: string
  score: number
  status: 'OPTIMAL' | 'BAIK' | 'PERLU_PERHATIAN'
  finding: string
  recommendation: string
}

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
  consultantTitle: string
  consultantLicense: string
  consultantSummary: string
  pitchSummary: string
  tags: string[]
  accessStatus: 'NONE' | 'PENDING' | 'APPROVED' | 'REJECTED'
  bookmarked: boolean
  businessModel: string
  expansionPlan: string[]
  opexRatio: number
  journey: BusinessJourneyStep[]
  consultantEvaluations: ConsultantEvaluationAspect[]
}

export interface AccessApplication {
  umkmId: string
  ticketSize: number
  scheme: string
  durationMonths: number
  notes: string
  submittedAt: string
}

export const useInvestorStore = defineStore('investor', {
  state: () => ({
    searchQuery: '',
    selectedSector: 'ALL',
    selectedCity: 'ALL',
    minMargin: 0,
    fundingRange: 'ALL' as 'ALL' | 'UNDER_200M' | '200M_400M' | 'OVER_400M',
    accessFilter: 'ALL' as 'ALL' | 'APPROVED' | 'PENDING' | 'NONE',
    sortBy: 'RECOMMENDED' as 'RECOMMENDED' | 'MARGIN_DESC' | 'GROWTH_DESC' | 'TICKET_ASC' | 'SCORE_DESC',

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
        healthScore: 82,
        certifiedAt: '18 Sep 2026',
        consultantName: 'Dra. Maya Suryani, M.M.',
        consultantTitle: 'Konsultan Manajemen UMKM & Akuntan Berlisensi',
        consultantLicense: 'BNSP No. REG-KM-2024-8841',
        consultantSummary: 'Disiplin kas harian sangat tinggi, kartu stok opname mingguan ditaati, dan food cost stabil di bawah 50%. Sangat direkomendasikan untuk sindikasi tahap awal.',
        pitchSummary: 'Spesialis kopi arabika susu gula aren dengan 3 gerai offline di Bandung. Margin kotor konsisten di atas 48% dengan SOP barista standar.',
        businessModel: 'Gerai kopi cepat saji (compact bar) & cloud kitchen berbiaya sewa efisien dengan sistem POS terintegrasi kasir cloud.',
        expansionPlan: [
          '60% (Rp 150 Jt) — Pembukaan 2 cabang cloud kitchen di area padat Bandung Utara & Cimahi.',
          '25% (Rp 62.5 Jt) — Pengadaan mesin roastery kapasitas 5kg/batch untuk efisiensi bahan baku.',
          '15% (Rp 37.5 Jt) — Cadangan modal kerja operasional (working capital buffer).'
        ],
        opexRatio: 22.4,
        tags: ['F&B', 'Ready for Funding', 'Margin >45%', 'Halal'],
        accessStatus: 'APPROVED',
        bookmarked: true,
        journey: [
          { month: 'Baseline', hppPercentage: 58.0, marginPercentage: 42.0, cashDisciplineScore: 55, milestone: 'Pencatatan manual di buku, rekening pribadi bercampur dengan kas bisnis.', detail: 'Food cost tidak terkontrol, sering terjadi selisih stok bahan sirup & kopi.' },
          { month: 'Bulan 1', hppPercentage: 54.5, marginPercentage: 45.5, cashDisciplineScore: 72, milestone: 'Pemisahan rekening giro usaha mandiri & implementasi POS kasir.', detail: 'Seluruh penerimaan non-tunai langsung masuk ke rekening terpisah.' },
          { month: 'Bulan 2', hppPercentage: 51.5, marginPercentage: 48.5, cashDisciplineScore: 84, milestone: 'Audit recipe food-cost & pelatihan barista porsi standar.', detail: 'Pemborosan susu segar berhasil ditekan hingga 18% per gerai.' },
          { month: 'Bulan 3', hppPercentage: 49.5, marginPercentage: 50.5, cashDisciplineScore: 91, milestone: 'Kontrak pasokan langsung biji kopi dengan kelompok tani Ciwidey.', detail: 'Memotong perantara distributor, harga beli biji terkunci flat selama 12 bulan.' },
          { month: 'Bulan 5', hppPercentage: 48.5, marginPercentage: 51.5, cashDisciplineScore: 98, milestone: 'Lolos sertifikasi resmi "Ready for Funding - Grade A".', detail: '3 bulan berturut-turut laporan keuangan bersih tanpa ada anomali arus kas.' }
        ],
        consultantEvaluations: [
          { aspect: 'Finansial & Arus Kas', score: 85, status: 'OPTIMAL', finding: 'Pemisahan rekening 100% disiplin. Arus kas bersih positif 5 bulan berturut-turut.', recommendation: 'Pertahankan sistem rekonsiliasi harian via Beruang.' },
          { aspect: 'Operasional & Rantai Pasok', score: 82, status: 'OPTIMAL', finding: 'Kartu stok opname mingguan ditaati oleh ketiga Store Leader.', recommendation: 'Lakukan peremajaan alat grinder berkala.' },
          { aspect: 'Pasar & Daya Saing', score: 76, status: 'BAIK', finding: 'Repeat order pelanggan loyal mencapai 64% di area Dipatiukur & Dago.', recommendation: 'Buka channel pemesanan katering korporat.' },
          { aspect: 'Legalitas & Kepatuhan', score: 92, status: 'OPTIMAL', finding: 'NIB RBA KBLI 56303 dan Sertifikat Halal BPJPH aktif hingga 2028.', recommendation: 'Segera urus sertifikasi merek HKI kelas 43.' },
          { aspect: 'Tata Kelola & SDM', score: 78, status: 'BAIK', finding: 'Struktur tim gerai jelas dengan insentif KPI omzet harian.', recommendation: 'Susun jenjang karir supervisor area.' }
        ]
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
        consultantTitle: 'Senior SME Financial Analyst & Konsultan BNSP',
        consultantLicense: 'BNSP No. REG-KM-2023-7712',
        consultantSummary: 'Pabrikasi sambal kemasan botol dengan izin BPOM MD lengkap. Distribusi ke 120+ toko oleh-oleh se-Jawa Timur dengan rotasi piutang sehat.',
        pitchSummary: 'Pabrikasi sambal kemasan botol higienis dengan distribusi 120+ toko oleh-oleh se-Jawa Timur. Standar BPOM dan audit kas harian sangat rapi.',
        businessModel: 'Manufaktur FMCG semi-otomatis dengan jalur distribusi B2B toko retail & direct-to-consumer e-commerce.',
        expansionPlan: [
          '50% (Rp 250 Jt) — Mesin retort sealing otomatis kapasitas 3.000 botol/hari.',
          '30% (Rp 150 Jt) — Penetrasi jaringan modern trade di wilayah Jabodetabek.',
          '20% (Rp 100 Jt) — Modal pengadaan stok cabai rawit merah musim panen.'
        ],
        opexRatio: 18.6,
        tags: ['FMCG', 'Ready for Funding', 'Margin >50%', 'Ekspansi'],
        accessStatus: 'NONE',
        bookmarked: false,
        journey: [
          { month: 'Baseline', hppPercentage: 59.0, marginPercentage: 41.0, cashDisciplineScore: 68, milestone: 'Distribusi manual, pencatatan nota fisik tanpa rekonsiliasi.', detail: 'Keterlambatan penagihan toko oleh-oleh mencapai 45 hari.' },
          { month: 'Bulan 1', hppPercentage: 55.0, marginPercentage: 45.0, cashDisciplineScore: 78, milestone: 'SOP faktur digital & penertiban termin bayar konsinyasi.', detail: 'Termin bayar ditekan dari 45 hari menjadi maksimal 21 hari.' },
          { month: 'Bulan 3', hppPercentage: 51.0, marginPercentage: 49.0, cashDisciplineScore: 88, milestone: 'Kontrak suplai cabai & minyak goreng industri langsung pabrik.', detail: 'HPP bahan baku utama turun 8% dari harga grosir pasar.' },
          { month: 'Bulan 5', hppPercentage: 48.0, marginPercentage: 52.0, cashDisciplineScore: 96, milestone: 'Audit sertifikasi BPOM MD & penerbitan akreditasi Grade A.', detail: 'Fasilitas produksi memenuhi standar Good Manufacturing Practice (GMP).' }
        ],
        consultantEvaluations: [
          { aspect: 'Finansial & Arus Kas', score: 90, status: 'OPTIMAL', finding: 'Arus kas operasi surplus Rp 45 Jt/bulan, saldo kas likuid kuat.', recommendation: 'Pertahankan rasio kas cadangan minimal 3 bulan beban tetap.' },
          { aspect: 'Operasional & Rantai Pasok', score: 88, status: 'OPTIMAL', finding: 'Kapasitas produksi terutilisasi 78%, kapasitas gudang bersih memadai.', recommendation: 'Implementasikan barcode lot inventory.' },
          { aspect: 'Pasar & Daya Saing', score: 91, status: 'OPTIMAL', finding: 'Brand awareness tinggi di Jawa Timur dengan repeat purchase kuat.', recommendation: 'Perluas bundling hampers korporat hari raya.' },
          { aspect: 'Legalitas & Kepatuhan', score: 95, status: 'OPTIMAL', finding: 'BPOM MD, Halal LPPOM, dan HKI merek dagang terdaftar.', recommendation: 'Siapkan audit lanjutan sertifikasi ISO 22000.' },
          { aspect: 'Tata Kelola & SDM', score: 82, status: 'BAIK', finding: 'Manajer produksi bersertifikat higiene sanitasi pangan.', recommendation: 'Tingkatkan pelatihan K3 di ruang masak industri.' }
        ]
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
        healthScore: 78,
        certifiedAt: '10 Sep 2026',
        consultantName: 'Dra. Maya Suryani, M.M.',
        consultantTitle: 'Konsultan Manajemen UMKM & Akuntan Berlisensi',
        consultantLicense: 'BNSP No. REG-KM-2024-8841',
        consultantSummary: 'Inovasi camilan tempe sagu aneka rasa dengan izin P-IRT dan sertifikasi Halal. Memasok rutin 40+ minimarket lokal Malang.',
        pitchSummary: 'Inovasi keripik tempe sagu aneka rasa dengan izin P-IRT dan Halal. Memasok rutin modern market lokal di Malang dan Surabaya.',
        businessModel: 'Produksi pangan olahan kedelai lokal berbasis kelompok perajin Sanan Malang dengan sistem kemasan nitrogen flush.',
        expansionPlan: [
          '55% (Rp 96 Jt) — Pembelian mesin continuous sealer nitrogen & de-oiling spinner.',
          '30% (Rp 52.5 Jt) — Pengadaan stok kedelai lokal non-GMO langsung petani Jatim.',
          '15% (Rp 26.5 Jt) — Branding kemasan foil premium untuk ekspansi ritel nasional.'
        ],
        opexRatio: 24.1,
        tags: ['Agroindustri', 'Ready for Funding', 'P-IRT', 'Halal'],
        accessStatus: 'PENDING',
        bookmarked: true,
        journey: [
          { month: 'Baseline', hppPercentage: 66.0, marginPercentage: 34.0, cashDisciplineScore: 50, milestone: 'Kemasan plastik tipis cepat tengik, pencatatan kas tercampur belanja rumah.', detail: 'Masa simpan hanya 4 minggu, retur produk dari toko mencapai 12%.' },
          { month: 'Bulan 2', hppPercentage: 61.0, marginPercentage: 39.0, cashDisciplineScore: 70, milestone: 'Upgrade kemasan aluminium foil & mesin spinner minyak.', detail: 'Masa simpan naik menjadi 6 bulan, retur turun drastis di bawah 1%.' },
          { month: 'Bulan 5', hppPercentage: 59.0, marginPercentage: 41.0, cashDisciplineScore: 89, milestone: 'Lolos pendampingan Beruang dengan efisiensi margin 41%.', detail: 'Pemisahan kas berhasil 100%, sistem akuntansi Beruang berjalan lancar.' }
        ],
        consultantEvaluations: [
          { aspect: 'Finansial & Arus Kas', score: 79, status: 'BAIK', finding: 'Pencatatan kas via Beruang rapi, omzet bertumbuh 28.5% YoY.', recommendation: 'Perketat termin bayar dari toko oleh-oleh.' },
          { aspect: 'Operasional & Rantai Pasok', score: 81, status: 'BAIK', finding: 'SOP penggorengan higienis dengan minyak bermerek teratur ganti.', recommendation: 'Gunakan mesin spinner berkapasitas 15 kg.' },
          { aspect: 'Pasar & Daya Saing', score: 74, status: 'BAIK', finding: 'Rasa gurih renyah konsisten dengan 4 varian rasa terlaris.', recommendation: 'Masuk ke marketplace Tokopedia/Shopee Mall.' },
          { aspect: 'Legalitas & Kepatuhan', score: 88, status: 'BAIK', finding: 'P-IRT aktif, Sertifikat Halal terbit resmi.', recommendation: 'Naikkan izin ke BPOM MD seiring rencana ekspansi luar pulau.' },
          { aspect: 'Tata Kelola & SDM', score: 72, status: 'BAIK', finding: 'Keluarga inti terlibat aktif dengan 8 perajin lokal binaan.', recommendation: 'Dokumentasikan perjanjian kerja perajin.' }
        ]
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
        healthScore: 86,
        certifiedAt: '05 Sep 2026',
        consultantName: 'Rahmat Hidayat, M.B.A.',
        consultantTitle: 'Konsultan Ekspor & Rantai Nilai Kreatif',
        consultantLicense: 'BNSP No. REG-KM-2022-6510',
        consultantSummary: 'Produksi batik cap & tulis bahan pewarna alam ramah lingkungan dengan ekspor rutin ke galeri di Jepang dan Australia. Margin bersih sangat tebal.',
        pitchSummary: 'Produksi batik cap & tulis bahan pewarna alam ramah lingkungan dengan ekspor berkala ke Jepang dan Australia. Laporan keuangan terverifikasi.',
        businessModel: 'Atelier kriya batik premium berbasis pesanan B2B ekspor dan butik desainer dengan harga jual per lembar Rp 450rb - Rp 2.5jt.',
        expansionPlan: [
          '45% (Rp 157.5 Jt) — Pembangunan workshop pewarnaan indigo alami ramah lingkungan.',
          '35% (Rp 122.5 Jt) — Pengadaan stok kain mori primissima sutra & lilin lebah alami.',
          '20% (Rp 70 Jt) — Partisipasi pameran dagang internasional & promosi kurasi luar negeri.'
        ],
        opexRatio: 16.8,
        tags: ['Kriya Ekspor', 'Ready for Funding', 'Eco-Friendly', 'Margin >50%'],
        accessStatus: 'NONE',
        bookmarked: false,
        journey: [
          { month: 'Baseline', hppPercentage: 52.0, marginPercentage: 48.0, cashDisciplineScore: 62, milestone: 'Produksi musiman, pencatatan pengeluaran perajin tidak tersentralisasi.', detail: 'Biaya bahan pewarna kimia boros dan mencemari saluran limbah.' },
          { month: 'Bulan 2', hppPercentage: 47.0, marginPercentage: 53.0, cashDisciplineScore: 80, milestone: 'Transisi 100% ke pewarna alam indigofera & tingi.', detail: 'Harga jual produk melonjak 40% di pasar ekspor eco-fashion.' },
          { month: 'Bulan 5', hppPercentage: 44.6, marginPercentage: 55.4, cashDisciplineScore: 94, milestone: 'Sertifikasi Indikasi Geografis & Lolos Uji Tuntas Beruang.', detail: 'Pemisahan kas mata uang asing dan rupiah tersistematis rapi.' }
        ],
        consultantEvaluations: [
          { aspect: 'Finansial & Arus Kas', score: 88, status: 'OPTIMAL', finding: 'Margin kotor 55.4% sangat tinggi dengan risiko kredit macet 0%.', recommendation: 'Gunakan instrumen hedging kurs valas sederhana.' },
          { aspect: 'Operasional & Rantai Pasok', score: 85, status: 'OPTIMAL', finding: 'Kemitraan dengan 25 pembatik perempuan pedesaan Klaten.', recommendation: 'Buat sistem kontrol kelembapan gudang kain sutra.' },
          { aspect: 'Pasar & Daya Saing', score: 89, status: 'OPTIMAL', finding: 'Peminat kuat di pasar Jepang & Australia untuk kain zero-chemical.', recommendation: 'Perkuat storytelling sertifikat digital tiap lembar kain.' },
          { aspect: 'Legalitas & Kepatuhan', score: 87, status: 'OPTIMAL', finding: 'NIB, Hak Cipta motif batik terdaftar di Ditjen KI.', recommendation: 'Daftarkan sertifikasi fair-trade internasional.' },
          { aspect: 'Tata Kelola & SDM', score: 81, status: 'BAIK', finding: 'Upah pembatik di atas standar UMK Solo dengan jaminan kesehatan.', recommendation: 'Latih regenerasi pembatik muda.' }
        ]
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
        healthScore: 83,
        certifiedAt: '01 Sep 2026',
        consultantName: 'Dra. Maya Suryani, M.M.',
        consultantTitle: 'Konsultan Manajemen UMKM & Akuntan Berlisensi',
        consultantLicense: 'BNSP No. REG-KM-2024-8841',
        consultantSummary: 'Rendang kemasan retort pouch dengan daya tahan simpan 12 bulan tanpa pengawet. Tersertifikasi HACCP dan sertifikat Halal BPJPH.',
        pitchSummary: 'Rendang kemasan retort pouch dengan daya tahan simpan 12 bulan tanpa pengawet. Tersertifikasi HACCP dan sertifikat Halal BPJPH.',
        businessModel: 'Olahan daging sapi bumbu rempah otentik Minang dalam kemasan tahan panas steril untuk pasar bekal haji & oleh-oleh nusantara.',
        expansionPlan: [
          '60% (Rp 132 Jt) — Mesin retort autoclave industri kapasitas 500 pouch per siklus.',
          '25% (Rp 55 Jt) — Kontrak suplai daging sapi beku halal bersertifikat.',
          '15% (Rp 33 Jt) — Modal kerja operasional stok pesanan jamaah umrah/haji.'
        ],
        opexRatio: 20.2,
        tags: ['FMCG', 'Ready for Funding', 'HACCP', 'Retort Pouch'],
        accessStatus: 'NONE',
        bookmarked: false,
        journey: [
          { month: 'Baseline', hppPercentage: 62.0, marginPercentage: 38.0, cashDisciplineScore: 58, milestone: 'Kemasan vakum biasa mudah kembung dalam 2 minggu.', detail: 'Pencatatan kas di warung tercampur dengan kas dapur pribadi.' },
          { month: 'Bulan 2', hppPercentage: 56.0, marginPercentage: 44.0, cashDisciplineScore: 79, milestone: 'Uji lab sterilisasi retort autoclave di Balai Riset Padang.', detail: 'Daya simpan terbukti 12 bulan pada suhu ruang tanpa bahan kimia pengawet.' },
          { month: 'Bulan 5', hppPercentage: 53.8, marginPercentage: 46.2, cashDisciplineScore: 93, milestone: 'Lolos verifikasi HACCP & Akreditasi Pendanaan Beruang.', detail: 'Margin naik stabil ke 46.2% dengan efisiensi pemotongan daging standar.' }
        ],
        consultantEvaluations: [
          { aspect: 'Finansial & Arus Kas', score: 84, status: 'OPTIMAL', finding: 'Margin 46.2% stabil, rasio kas mampu mendanai 4 bulan produksi.', recommendation: 'Buat rekening giro khusus penerimaan e-commerce.' },
          { aspect: 'Operasional & Rantai Pasok', score: 86, status: 'OPTIMAL', finding: 'Dapur pengolahan terpisah dengan alur higienis searah (clean room).', recommendation: 'Pertahankan kalibrasi pengukur suhu autoclave berkala.' },
          { aspect: 'Pasar & Daya Saing', score: 82, status: 'BAIK', finding: 'Permintaan tinggi dari agen travel haji/umrah dan diaspora Minang.', recommendation: 'Luncurkan varian bumbu rendang instan kemasan sachet.' },
          { aspect: 'Legalitas & Kepatuhan', score: 90, status: 'OPTIMAL', finding: 'HACCP, Halal BPJPH, dan NIB lengkap terverifikasi.', recommendation: 'Daftarkan izin edar BPOM MD untuk ekspor Malaysia.' },
          { aspect: 'Tata Kelola & SDM', score: 76, status: 'BAIK', finding: 'Juru masak kepala memegang resep rahasia keluarga 3 generasi.', recommendation: 'Tulis manual takaran bumbu ke satuan gram presisi.' }
        ]
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
        healthScore: 84,
        certifiedAt: '28 Agu 2026',
        consultantName: 'Bambang Sudarsono, S.E.',
        consultantTitle: 'Senior SME Financial Analyst & Konsultan BNSP',
        consultantLicense: 'BNSP No. REG-KM-2023-7712',
        consultantSummary: 'Pengolahan simplisia jamu dan teh celup herbal organik dari petani lereng Merapi. Memiliki izin edar BPOM TR dan fasilitas lab higienis.',
        pitchSummary: 'Pengolahan simplisia jamu dan teh celup herbal organik dari petani lereng Merapi. Memiliki izin edar BPOM TR dan fasilitas lab higienis.',
        businessModel: 'Hulu-ke-hilir budidaya rempah temulawak & jahe merah organik lereng Merapi hingga pengemasan produk teh herbal berizin BPOM TR.',
        expansionPlan: [
          '50% (Rp 210 Jt) — Pengadaan mesin ekstraksi vakum suhu rendah untuk ekstrak cair.',
          '30% (Rp 126 Jt) — Perluasan kemitraan lahan organik 2 hektar di Sleman.',
          '20% (Rp 84 Jt) — Modal kerja uji klinis khasiat & promosi digital wellness.'
        ],
        opexRatio: 19.5,
        tags: ['Agroindustri', 'Ready for Funding', 'Organik', 'BPOM TR'],
        accessStatus: 'NONE',
        bookmarked: false,
        journey: [
          { month: 'Baseline', hppPercentage: 60.0, marginPercentage: 40.0, cashDisciplineScore: 65, milestone: 'Pengeringan sinar matahari rentan jamur saat musim hujan.', detail: 'Kadar air simplisia sering tidak memenuhi standar lab farmasi.' },
          { month: 'Bulan 2', hppPercentage: 54.0, marginPercentage: 46.0, cashDisciplineScore: 81, milestone: 'Pemasangan solar dryer dome higienis berbasis tenaga surya.', detail: 'Kadar air stabil di bawah 10%, kapasitas jemur meningkat 3 kali lipat.' },
          { month: 'Bulan 5', hppPercentage: 51.0, marginPercentage: 49.0, cashDisciplineScore: 92, milestone: 'Terbit sertifikat BPOM TR & Lolos Kurasi Beruang.', detail: 'Tiga varian teh celup resmi dipasarkan di 80 jaringan apotek modern.' }
        ],
        consultantEvaluations: [
          { aspect: 'Finansial & Arus Kas', score: 86, status: 'OPTIMAL', finding: 'Arus kas sehat, profitabilitas 49% terjaga dengan manajemen kas rapi.', recommendation: 'Pertahankan dana darurat minimal 4 bulan biaya operasional.' },
          { aspect: 'Operasional & Rantai Pasok', score: 85, status: 'OPTIMAL', finding: 'Solar dryer dome higienis bekerja optimal sepanjang tahun.', recommendation: 'Lakukan uji berkala residu pestisida tiap panen.' },
          { aspect: 'Pasar & Daya Saing', score: 84, status: 'OPTIMAL', finding: 'Tren gaya hidup sehat mendukung pertumbuhan produk teh herbal.', recommendation: 'Rambah pasar hotel berbintang dan spa resort Bali.' },
          { aspect: 'Legalitas & Kepatuhan', score: 92, status: 'OPTIMAL', finding: 'Izin BPOM TR (Obat Tradisional) dan Halal lengkap.', recommendation: 'Persiapkan dokumen untuk sertifikasi CPOTB bertahap.' },
          { aspect: 'Tata Kelola & SDM', score: 79, status: 'BAIK', finding: 'Apoteker penanggung jawab teknis (PJ) aktif mengawasi mutu.', recommendation: 'Adakan pelatihan berkala sanitasi bagi pekerja kebun.' }
        ]
      }
    ] as MarketplaceUmkm[],

    applications: [] as AccessApplication[]
  }),

  getters: {
    filteredMarketplace: (state) => {
      let list = state.marketplaceList.filter(item => {
        // Search
        const q = state.searchQuery.trim().toLowerCase()
        const matchSearch = q === '' ||
          item.name.toLowerCase().includes(q) ||
          item.sector.toLowerCase().includes(q) ||
          item.city.toLowerCase().includes(q) ||
          item.code.toLowerCase().includes(q) ||
          item.tags.some(t => t.toLowerCase().includes(q))
        
        // Sector
        const matchSector = state.selectedSector === 'ALL' || item.sector.toLowerCase().includes(state.selectedSector.toLowerCase())
        
        // City
        const matchCity = state.selectedCity === 'ALL' || item.city.toLowerCase() === state.selectedCity.toLowerCase()
        
        // Margin
        const matchMargin = item.marginPercentage >= state.minMargin

        // Funding Range
        let matchFunding = true
        if (state.fundingRange === 'UNDER_200M') {
          matchFunding = item.fundingTarget <= 200000000
        } else if (state.fundingRange === '200M_400M') {
          matchFunding = item.fundingTarget > 200000000 && item.fundingTarget <= 400000000
        } else if (state.fundingRange === 'OVER_400M') {
          matchFunding = item.fundingTarget > 400000000
        }

        // Access Filter
        const matchAccess = state.accessFilter === 'ALL' || item.accessStatus === state.accessFilter

        return matchSearch && matchSector && matchCity && matchMargin && matchFunding && matchAccess
      })

      // Sort
      if (state.sortBy === 'MARGIN_DESC') {
        list.sort((a, b) => b.marginPercentage - a.marginPercentage)
      } else if (state.sortBy === 'GROWTH_DESC') {
        list.sort((a, b) => b.growthYoY - a.growthYoY)
      } else if (state.sortBy === 'TICKET_ASC') {
        list.sort((a, b) => a.fundingTarget - b.fundingTarget)
      } else if (state.sortBy === 'SCORE_DESC') {
        list.sort((a, b) => b.healthScore - a.healthScore)
      }

      return list
    },

    watchlist: (state) => {
      return state.marketplaceList.filter(item => item.bookmarked)
    },

    sectorsList: (state) => {
      const set = new Set<string>()
      state.marketplaceList.forEach(m => set.add(m.sector))
      return Array.from(set)
    },

    citiesList: (state) => {
      const set = new Set<string>()
      state.marketplaceList.forEach(m => set.add(m.city))
      return Array.from(set)
    }
  },

  actions: {
    toggleBookmark(umkmId: string) {
      const item = this.marketplaceList.find(m => m.id === umkmId)
      if (item) item.bookmarked = !item.bookmarked
    },

    requestAccess(umkmId: string, ticketSize: number, notes: string, scheme = 'Bagi Hasil (Revenue Sharing)', durationMonths = 24) {
      const item = this.marketplaceList.find(m => m.id === umkmId)
      if (item) {
        item.accessStatus = 'PENDING'
        this.applications.push({
          umkmId,
          ticketSize,
          scheme,
          durationMonths,
          notes,
          submittedAt: new Date().toISOString()
        })

        // Cross-sync to umkmStore if target is umkm-01 (Kopi Senja)
        const umkmStore = useUmkmStore()
        if (umkmStore) {
          const existing = umkmStore.investorRequests.find(r => r.id === `req-${umkmId}`)
          if (!existing) {
            umkmStore.investorRequests.unshift({
              id: `req-${umkmId}-${Date.now()}`,
              investorId: 'inv-101',
              investorName: 'Hendro Wicaksono',
              firmName: 'Nusantara Angel Syndicate',
              requestedAt: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }),
              status: 'PENDING',
              proposedTicket: ticketSize,
              introMessage: notes
            })
          }
        }
      }
    },

    setAccessStatus(umkmId: string, status: 'NONE' | 'PENDING' | 'APPROVED' | 'REJECTED') {
      const item = this.marketplaceList.find(m => m.id === umkmId)
      if (item) {
        item.accessStatus = status
      }
    },

    resetFilters() {
      this.searchQuery = ''
      this.selectedSector = 'ALL'
      this.selectedCity = 'ALL'
      this.minMargin = 0
      this.fundingRange = 'ALL'
      this.accessFilter = 'ALL'
      this.sortBy = 'RECOMMENDED'
    }
  }
})
