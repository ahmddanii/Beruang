# Product Requirements Document (PRD): Beruang (Ber-Uang)

**Business Development & Verified Funding Platform for Indonesian MSMEs**

---

## 1. Executive Summary

**Beruang (Ber-Uang)** adalah platform pengembangan bisnis dan pendanaan terverifikasi yang dirancang khusus untuk membenahi fundamental usaha mikro, kecil, dan menengah (UMKM) Indonesia bersama Business Consultant profesional sebelum mempertemukan mereka dengan investor kredibel.

Dengan memadukan bimbingan konsultan manusia nyata, pelacakan histori perbaikan terukur (**verified business journey**), gerbang kelayakan pendanaan (**Funding Readiness Gate**), serta akselerasi kecerdasan buatan (Claude 3.7 Sonnet), Beruang mentransformasi UMKM dari bisnis yang rentan dan belum terstruktur menjadi aset investasi yang matang, transparan, dan siap berkembang (**ready for funding**).

---

## 2. Problem Statement

### 2.1 Masalah Pelaku UMKM

- **Finansial & Operasional Tidak Rapi:** Sebagian besar pengusaha UMKM belum memisahkan keuangan pribadi dan usaha, tidak mengetahui persentase pasti Harga Pokok Penjualan (HPP), dan minim standardisasi operasional.
- **Akses Permodalan Tertutup:** Pengajuan pinjaman atau investasi sering kali ditolak mentah-mentah oleh perbankan dan investor institusi tanpa disertai arahan konstruktif mengenai apa yang harus diperbaiki.
- **Ketiadaan Pendamping Ahli:** UMKM kesulitan mengakses konsultan bisnis berpengalaman karena kendala biaya konsultasi yang mahal.

### 2.2 Masalah Business Consultant

- **Inefisiensi Manajemen Multi-Klien:** Konsultan menghabiskan 40%+ waktu kerja mereka untuk menyusun rekap data manual dari file spreadsheet yang tercecer.
- **Monitoring Tidak Real-Time:** Keterlambatan dalam mendeteksi penurunan performa atau pembengkakan biaya operasional klien di tengah bulan.
- **Minimnya Visibilitas Dampak:** Kesulitan mendemonstrasikan rekam jejak keberhasilan mentoring secara kuantitatif kepada ekosistem investor.

### 2.3 Masalah Investor

- **Tingginya Asimetri Informasi & Risiko Investasi:** Banyak proposal bisnis yang menyajikan data penjualan yang dipercantik (**vanity metrics**) tanpa audit independen.
- **Waktu Due Diligence yang Panjang & Melelahkan:** Investor harus memverifikasi ulang pembukuan manual dan kondisi lapangan dari nol.
- **Kelangkaan&#x20;*****Deal Flow*****&#x20;yang Terkurasi:** Kesulitan menemukan UMKM di luar kota-kota tier 1 yang sebenarnya memiliki unit economics sehat dan potensi pertumbuhan tinggi.

---

## 3. Solution Overview

Beruang menghadirkan ekosistem terpadu dengan 4 pilar solusi:
```scss
┌───────────────────────────────────────────────────────────────────────────────────┐
│                          BERUANG SOLUTION ARCHITECTURE                            │
├──────────────────────┬────────────────────────────────────────────────────────────┤
│ 1. Diagnostic &      │ Penilaian objektif 5 aspek bisnis (Finansial, HPP/Operasi, │
│    Radar Assessment  │ Pemasaran, SDM, Legalitas) oleh konsultan berlisensi.      │
├──────────────────────┼────────────────────────────────────────────────────────────┤
│ 2. Action Plan &     │ Rencana aksi langkah demi langkah dengan checklist task    │
│    Progress Audit    │ dan input data bulanan berkala untuk membuktikan perbaikan.│
├──────────────────────┼────────────────────────────────────────────────────────────┤
│ 3. AI Copilot        │ Peringatan anomali biaya otomatis dan auto-generated draft  │
│    Intelligence      │ laporan untuk mempercepat kerja konsultan (Claude Sonnet).  │
├──────────────────────┼────────────────────────────────────────────────────────────┤
│ 4. Verified Funding  │ Status resmi "Ready for Funding" yang membuka pintu akses   │
│    Marketplace       │ ke marketplace investor terverifikasi dengan data room aman │
└──────────────────────┴────────────────────────────────────────────────────────────┘
```

---

## 4. Success Metrics (Key Performance Indicators)

### 4.1 Acquisition Metrics

- **UMKM Terdaftar:** Target 500+ UMKM terverifikasi dalam 6 bulan pertama.
- **Consultant Onboarded:** 25+ Business Consultant tersertifikasi aktif di platform.
- **Investor Terdaftar:** 50+ Angel Investor & Micro-VC terverifikasi dengan total alokasi komitmen modal > Rp 10 Miliar.

### 4.2 Activation Metrics

- **Profile Completion Rate:** > 80% UMKM baru menyelesaikan profil bisnis dan form baseline awal dalam 48 jam.
- **First Assessment Velocity:** 100% UMKM yang ditugaskan mendapatkan Business Assessment awal dalam waktu 7 hari kerja.

### 4.3 Engagement Metrics

- **Monthly Progress Submission Rate:** > 85% UMKM menginput data progres finansial bulanan tepat waktu (setiap tanggal 25-30).
- **Action Plan Completion Rate:** Rata-rata penyelesaian task Action Plan > 75% per siklus evaluasi kuartalan.

### 4.4 Outcome Metrics (Business Impact)

- **Operational Efficiency Gain:** Rata-rata penurunan HPP sebesar 5–10% pada UMKM yang telah melalui 3 bulan siklus perbaikan.
- **Funding Readiness Conversion:** Minimal 30% UMKM binaan berhasil mencapai status "Ready for Funding".
- **Deal Match Success:** Minimal 40% UMKM dengan status "Ready" berhasil mendapatkan *term sheet* atau persetujuan pendanaan dari investor.

---

## 5. User Stories (Per Role)

### 5.1 UMKM User Stories

1. **US-UMKM-01:** *Sebagai pemilik UMKM*, saya ingin mengisi formulir onboarding profil bisnis yang terstruktur, *sehingga* konsultan dapat memahami model bisnis dan kondisi baseline keuangan saya.
2. **US-UMKM-02:** *Sebagai pemilik UMKM*, saya ingin melihat hasil Business Assessment dalam bentuk visualisasi Radar Chart, *sehingga* saya memahami dengan jelas kelemahan dan kekuatan bisnis saya.
3. **US-UMKM-03:** *Sebagai pemilik UMKM*, saya ingin memiliki daftar Action Plan interaktif dengan checklist tugas dan tanggal jatuh tempo, *sehingga* saya tahu tindakan nyata apa yang harus dilakukan setiap minggu.
4. **US-UMKM-04:** *Sebagai pemilik UMKM*, saya ingin menginput data performa bulanan (omzet, HPP, biaya operasional) dengan mudah, *sehingga* perkembangan bisnis saya tercatat secara historis.
5. **US-UMKM-05:** *Sebagai pemilik UMKM*, saya ingin mengajukan aplikasi pendanaan ketika sudah dinyatakan "Ready for Funding", *sehingga* profil bisnis saya dapat tampil di marketplace investor.
6. **US-UMKM-06:** *Sebagai pemilik UMKM*, saya ingin menerima notifikasi permintaan akses data privat dari investor dan memiliki wewenang untuk menyetujui atau menolaknya, *sehingga* data keuangan sensitif saya tetap aman.

### 5.2 Business Consultant User Stories

1. **US-CONS-01:** *Sebagai Business Consultant*, saya ingin memiliki dashboard multi-klien dengan indikator status dan skor kesehatan bisnis, *sehingga* saya dapat memprioritaskan klien yang paling membutuhkan bimbingan.
2. **US-CONS-02:** *Sebagai Business Consultant*, saya ingin mengisi instrumen penilaian 5 aspek fundamental bisnis, *sehingga* sistem menghasilkan skor komposit dan rekomendasi perbaikan.
3. **US-CONS-03:** *Sebagai Business Consultant*, saya ingin membuat dan menerbitkan Action Plan beserta target milestone yang terukur untuk klien saya, *sehingga* klien memiliki panduan kerja yang jelas.
4. **US-CONS-04:** *Sebagai Business Consultant*, saya ingin menerima AI Anomaly Alert ketika terjadi lonjakan HPP atau penurunan margin pada data bulanan klien, *sehingga* saya dapat segera melakukan intervensi sebelum masalah membesar.
5. **US-CONS-05:** *Sebagai Business Consultant*, saya ingin memvalidasi entri progres bulanan dan dokumen bukti yang diunggah klien, *sehingga* data yang terekam memiliki integritas dan terverifikasi.
6. **US-CONS-06:** *Sebagai Business Consultant*, saya ingin menetapkan status sertifikasi "Ready for Funding" beserta catatan rekomendasi resmi, *sehingga* bisnis klien yang sudah terbukti sehat dapat dipertemukan dengan investor.

### 5.3 Investor User Stories

1. **US-INV-01:** *Sebagai Investor*, saya ingin menjelajahi marketplace UMKM yang telah terkurasi dengan filter sektor, rentang pendanaan, dan efisiensi margin, *sehingga* saya dapat menemukan peluang investasi yang sesuai kriteria portofolio saya.
2. **US-INV-02:** *Sebagai Investor*, saya ingin melihat profil publik UMKM beserta riwayat transformasi grafik perbaikan (Business Journey), *sehingga* saya dapat mengevaluasi ketahanan fundamental bisnis tanpa melanggar privasi awal.
3. **US-INV-03:** *Sebagai Investor*, saya ingin membaca catatan evaluasi objektif dari Business Consultant yang mendampingi UMKM tersebut, *sehingga* saya mendapatkan perspektif profesional pihak ketiga.
4. **US-INV-04:** *Sebagai Investor*, saya ingin mengajukan permintaan akses data privat (Private Data Room Request) dengan menyertakan pesan perkenalan dan rencana tiket investasi, *sehingga* UMKM dapat mempertimbangkan pembukaan data rinci.
5. **US-INV-05:** *Sebagai Investor*, saya ingin mengakses laporan P&L lengkap, rekening koran, dan legalitas resmi setelah disetujui UMKM, *sehingga* proses due diligence dapat dilakukan secara cepat dan akurat.

---

## 6. Feature Prioritization (Release Roadmap)

### P0 - MVP (Harus Ada Sebelum Peluncuran Pertama)

- [ ]  **Autentikasi & Otorisasi:** Registrasi & login multi-role (`UMKM`, `CONSULTANT`, `INVESTOR`) dengan NextAuth.js v5.
- [x]  **Profil Bisnis UMKM:** Form onboarding lengkap (identitas, sektor, baseline omzet & HPP, lokasi, outlet).
- [ ]  **Assignment Konsultan:** Admin/Sistem menugaskan Business Consultant ke UMKM terdaftar.
- [x]  **Business Assessment Engine:** Form scoring 5 aspek fundamental dengan kalkulasi skor 0-100 dan Radar Chart.
- [x]  **Action Plan & Task Checklist:** Pembuatan rencana aksi oleh konsultan dan checklist status (`TODO`, `IN_PROGRESS`, `DONE`) oleh UMKM.
- [ ]  **Progress Tracking Bulanan:** Form input data finansial bulanan (omzet, HPP, opex, kas bersih) beserta lampiran laporan.
- [ ]  **Interactive Progress Charts:** Visualisasi grafik garis/area tren efisiensi HPP dan pertumbuhan performa via Recharts.
- [x]  **Funding Readiness Gatekeeper:** Fitur evaluasi kelayakan resmi dari konsultan untuk menerbitkan status "Ready for Funding".
- [x]  **Public Business Profile:** Tampilan profil ringkas UMKM untuk investor (metrik persentase, sektor, cerita bisnis).
- [x]  **Curated Marketplace & Filter:** Katalog pencarian UMKM bagi investor dengan filter sektor, kota, dan target dana.
- [x]  **Private Data Access Management:** Alur permintaan akses data privat (Investor Request ➔ UMKM Approve/Reject).
- [ ]  **AI Anomaly Alert Sederhana:** Deteksi otomatis lonjakan HPP > 10% berbasis Claude API dengan card slide-in.
- [ ]  **Dark & Light Mode Support:** Theming sistem lengkap dengan CSS variables dan persistensi preferensi user.
- [ ]  **Full Responsive Interface:** Tampilan responsif sempurna di layar desktop dan mobile smartphone.

### P1 - v1.1 (Tahap Pengembangan Segera Pasca-MVP)

- [ ]  **Animated Business Journey Timeline:** Visualisasi interaktif GSAP ScrollTrigger yang memetakan transformasi bisnis sebelum vs sesudah intervensi.
- [x]  **Consultant Multi-Client Master Dashboard:** Tampilan matriks komprehensif untuk memantau puluhan klien dalam satu layar.
- [ ]  **Funding Application Builder:** Formulir detail pengajuan modal, struktur Capex/Opex, dan target valuasi awal.
- [ ]  **Email Notification System:** Integrasi layanan email transaksional via Resend untuk update status dan pengajuan akses.
- [ ]  **AI Draft Assessment Generator:** Claude API otomatis menyusun draft nilai dan catatan 5 aspek untuk di-review konsultan.
- [ ]  **AI Executive Summary for Consultant:** Briefing otomatis kondisi klien sebelum sesi konsultasi dimulai.
- [ ]  **Investor Watchlist & Bookmarking:** Fitur menyimpan bisnis favorit dan menerima update jika status bisnis berubah.

### P2 - v2.0 (Roadmap Jangka Panjang)

- [ ]  **In-App Consultation Notes & Audio Transcripts:** Catatan sesi konsultasi terintegrasi dengan ringkasan notulensi AI.
- [ ]  **AI Business Journey Narrative Engine:** Generator narasi investasi otomatis berstandar venture-grade untuk profil publik.
- [x]  **One-Click Export PDF Report:** Export ringkasan Business Assessment dan laporan kinerja dalam format PDF resmi ber-watermark.
- [ ]  **Investor Portfolio Tracker:** Modul pelacakan pasca-investasi untuk memantau performa bisnis yang telah didanai.
- [x]  **Platform Admin Analytics:** Dashboard metrik makro ekonomi platform (total perputaran dana, retensi konsultan, efisiensi agregat).
- [ ]  **Progressive Web App (PWA) & Push Notifications:** Notifikasi push langsung ke perangkat mobile UMKM untuk pengingat tanggal input data.

---

## 7. Acceptance Criteria (P0 MVP Checklist)
```css
┌───────────────────────────────────────────────────────────────────────────────────┐
│                         ACCEPTANCE CRITERIA MATRIX (MVP P0)                       │
├──────────────────────────┬────────────────────────────────────────────────────────┤
│ Fitur                     │ Kriteria Kesiapan (Acceptance Criteria)               │
├──────────────────────────┼────────────────────────────────────────────────────────┤
│ Registrasi & Auth          │ [ ] User dapat mendaftar dengan role spesifik.        │
│                           │ [ ] Route dashboard terproteksi sesuai role.          │
│                           │ [ ] Password terenkripsi aman (bcrypt/argon2).        │
├──────────────────────────┼────────────────────────────────────────────────────────┤
│ Onboarding Profil Bisnis   │ [ ] UMKM wajib mengisi form profil sebelum akses menu.│
│                           │ [ ] Data baseline finansial tersimpan ke database.    │
├──────────────────────────┼────────────────────────────────────────────────────────┤
│ Business Assessment        │ [ ] Konsultan dapat menginput skor 1-100 pada 5 aspek.│
│                           │ [ ] Radar Chart otomatis merender 5 dimensi data.     │
│                           │ [ ] Skor total dihitung dengan bobot proporsional.    │
├──────────────────────────┼────────────────────────────────────────────────────────┤
│ Action Plan & Tasks        │ [ ] Konsultan dapat menambahkan milestone dan task.   │
│                           │ [ ] UMKM dapat menandai task sebagai "DONE".           │
│                           │ [ ] Progress bar persentase terupdate secara real-time.│
├──────────────────────────┼────────────────────────────────────────────────────────┤
│ Monthly Progress Input     │ [ ] Form input memvalidasi angka finansial non-negatif.│
│                           │ [ ] % HPP dan Margin dihitung otomatis oleh server.   │
│                           │ [ ] File bukti laporan terunggah via UploadThing.     │
├──────────────────────────┼────────────────────────────────────────────────────────┤
│ Funding Readiness Gate     │ [ ] Hanya konsultan yang memiliki tombol "Certify".    │
│                           │ [ ] Bisnis tanpa status "Ready" tidak tampil di market.│
├──────────────────────────┼────────────────────────────────────────────────────────┤
│ Marketplace & Filter       │ [ ] Investor dapat memfilter bisnis berdasarkan sektor.│
│                           │ [ ] Data nominal rupiah riil disembunyikan di katalog. │
├──────────────────────────┼────────────────────────────────────────────────────────┤
│ Private Access Request     │ [ ] Investor dapat mengirim request dengan pesan.     │
│                           │ [ ] UMKM menerima notifikasi permintaan di dashboard.  │
│                           │ [ ] Tombol Approve membuka data room bagi investor tsb.│
│                           │ [ ] Tombol Reject mengunci kembali data room.         │
├──────────────────────────┼────────────────────────────────────────────────────────┤
│ AI Anomaly Alert           │ [ ] Input HPP naik >10% otomatis men-trigger AIAlert. │
│                           │ [ ] Alert tampil dengan animasi slide-in pada konsultan│
│                           │ [ ] Tombol dismiss menyembunyikan alert dari feed.     │
├──────────────────────────┼────────────────────────────────────────────────────────┤
│ Theming & Responsiveness   │ [ ] Toggle tema Dark/Light berfungsi tanpa flicker.   │
│                           │ [ ] Tampilan rapi pada viewport 375px (mobile) s/d 4K. │
└──────────────────────────┴────────────────────────────────────────────────────────┘
```

---

## 8. Non-Functional Requirements (NFR)

### 8.1 Performance & Core Web Vitals

- **Largest Contentful Paint (LCP):** < 2.5 detik pada koneksi 4G standar.
- **First Input Delay (FID) / Interaction to Next Paint (INP):** < 100 milidetik.
- **Cumulative Layout Shift (CLS):** < 0.1 di seluruh halaman dashboard dan landing page.
- **Bundle Optimization:** Code-splitting dinamis untuk library chart dan animasi berat.

### 8.2 Accessibility (A11y)

- **Standard:** Memenuhi kepatuhan **WCAG 2.1 Level AA**.
- **Contrast Ratio:** Minimal rasio kontras 4.5:1 untuk teks normal pada mode terang dan mode gelap.
- **Keyboard Navigation:** Seluruh dialog modal, dropdown menu, dan form dapat diakses sepenuhnya via tombol `Tab`, `Enter`, dan `Escape`.
- **Motion Preferences:** Mendukung penuh media query `prefers-reduced-motion`.

### 8.3 Security & Data Privacy

- **Strict Role-Based Isolation:** Data room privat terisolasi di level database query (klausa `where` memverifikasi tabel `InvestorInterestRequest` berstatus `APPROVED`).
- **Enkripsi Penyimpanan:** Dokumen laporan keuangan yang diunggah ke UploadThing dilindungi dengan signed URL berbatas waktu (**time-expiring tokens**).
- **Audit Trail Logging:** Setiap pembukaan dokumen privat dicatat waktu dan identitas investornya.

### 8.4 Reliability & Uptime

- **Target Ketersediaan Sistem:** 99.5% Uptime bulanan.
- **Database Backup:** Pencadangan otomatis (**Automated Daily Snapshot**) dengan retensi 30 hari.

---

## 9. Out of Scope (Apa yang Tidak Dibangun di MVP)

1. **Payment Gateway / Escrow Transaksi Dana:** Transaksi pencairan dana investasi dilakukan secara **off-platform** melalui kesepakatan notaris resmi; Beruang fokus pada kurasi, perbaikan, dan pertemuan kesepakatan (**deal matching**).
2. **Real-Time Video Conference Internal:** Sesi konsultasi tatap muka memanfaatkan integrasi tautan eksternal (Google Meet / Zoom URL) yang disematkan pada jadwal konsultasi.
3. **Penyusunan Kontrak Hukum Otomatis (Legal Contract Generator):** Template perjanjian investasi masih ditangani oleh penasihat hukum masing-masing pihak.
4. **Mobile App Native (iOS / Android Binary):** MVP difokuskan pada Responsive Web Application & PWA.

---

## 10. Risks & Mitigation Strategies

| No Identifikasi Risiko Dampak Probabilitas Strategi Mitigasi  |                                                    |        |        |                                                                                                                                                                       |
| ------------------------------------------------------------- | -------------------------------------------------- | ------ | ------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1                                                             | **UMKM Memasukkan Data Keuangan Palsu / Fiktif**   | Tinggi | Sedang | Mewajibkan unggah dokumen bukti (rekening koran/mutasi kas) yang harus diverifikasi manual oleh konsultan sebelum status "Ready" disahkan.                            |
| 2                                                             | **Konsultan Lambat Merespon Input Klien**          | Sedang | Sedang | Menerapkan notifikasi pengingat via email/dashboard dan indikator SLA review (maksimal 3 hari kerja).                                                                 |
| 3                                                             | **Investor Melewati Platform (Disintermediation)** | Sedang | Tinggi | Mengharuskan pertukaran data awal melalui sistem; memberikan nilai tambah berkelanjutan berupa monitoring portofolio pasca-investasi di platform.                     |
| 4                                                             | **Halusinasi AI pada Analisis Keuangan**           | Tinggi | Rendah | Mengunci peran AI hanya sebagai **draft generator**; seluruh angka kalkulasi rasio dilakukan secara deterministik via kode JavaScript/TypeScript, bukan oleh LLM.     |
| 5                                                             | **Kebocoran Data Finansial Sensitif**              | Kritis | Rendah | Mengisolasi data privat di balik otorisasi multi-layer, mewajibkan persetujuan eksplisit pemilik UMKM, serta menerapkan watermark nama investor pada preview dokumen. |

---

## 11. Timeline & Release Estimation
```scss
 BULAN 1                  BULAN 2                  BULAN 3                  BULAN 4
[====== PHASE 1: MVP (P0) ======]
 • Database & NextAuth Setup
 • Assessment & Radar Chart
 • Progress Input & Charts
 • Marketplace & Access Gate
 • Launch Beta (50 UMKM)

                        [====== PHASE 2: v1.1 (P1) ======]
                         • GSAP Journey Timeline
                         • AI Draft Assessment & Summary
                         • Resend Email Notifications
                         • Consultant Multi-client Hub

                                              [====== PHASE 3: v2.0 (P2) ======]
                                               • AI Journey Narrative
                                               • PDF Report Export
                                               • Investor Portfolio Tracker
                                               • Scale Up (500+ UMKM)
```

- **Fase 1 (MVP — 6 Minggu):** Fondasi core engine, sistem penilaian 5 aspek, tracking progres bulanan, marketplace terkurasi, dan perlindungan privasi data room.
- **Fase 2 (v1.1 — 4 Minggu):** Peningkatan pengalaman visual (GSAP timeline), otomatisasi AI copilot mendalam, dan sistem notifikasi email.
- **Fase 3 (v2.0 — 8 Minggu):** Fitur analitik lanjutan, ekspor laporan institusi, dan pelacakan portofolio investasi terintegrasi.

---

*Dokumen&#x20;**`prd.md`**&#x20;selesai disusun. Dokumen ini melengkapi seluruh paket perancangan platform Beruang.*



sejauh ini untuk flowchart sudah seperti ini
