# 📋 Audit Integrasi Database & Backend: Konsultan, Investor, & Admin Platform

> **Dokumen Audit Kesiapan Data Riil (Anti-Dummy / Anti-Statis / Produksi)**  
> **Platform Beruang (Ber-Uang)** — Tata Kelola Finansial & Sertifikasi Modal UMKM  
> *Tanggal Pembaruan:* 25 Oktober 2026  
> *Cakupan Audit:* Pemetaan menyeluruh seluruh data statis, data dummy bawaan (*in-memory / mock*), dan *endpoint* backend Express/Prisma ORM yang belum terhubung untuk tiga peran non-UMKM: **Konsultan (Advisor)**, **Investor (Funder)**, dan **Admin Platform (Super Admin)**.

---

## 📌 Ringkasan Eksekutif (Executive Summary)

Platform Beruang telah memiliki arsitektur database SQLite + Prisma ORM yang matang dan dinamis pada alur **Pelaku Usaha (UMKM)** — mencakup tabel `DailyTransaction`, `MonthlyReport`, `Assessment`, `ActionPlanTask`, dan `BusinessProfile`. Namun, pada antarmuka **Konsultan**, **Investor**, dan khususnya **Admin Platform**, mayoritas modul masih beroperasi menggunakan:
1. **Array JavaScript statis (*hardcoded*) di dalam script Vue frontend** (misalnya `umkmPartnerships`, `assignmentHistory`, `submissions`, `dealFlow`, `investorsList`, `users`).
2. **Angka metrik yang ditulis permanen di dalam markup HTML template** (misalnya `142 Usaha`, `28 Mitra`, `Rp 4.200.000.000`).
3. **Penyimpanan sementara di memori server (*in-memory Map*)** yang hilang saat server Node.js di-restart.
4. **Rumus telemetri buatan (*formula scaling*)** di backend yang memanipulasi angka riil database (misal `142 + dbUmkmCount - 7`).

### Dampak Langsung di Lingkungan Produksi:
* **Akun Baru Mengalami Kebocoran Data Bawaan:** Saat pengguna mendaftar sebagai Konsultan baru atau Investor baru, mereka langsung melihat profil orang lain (Dra. Maya Suryani atau Fikri Setiawan) lengkap dengan dokumen dan portofolio dummy.
* **Aksi Admin Tidak Tersimpan ke Database:** Ketika Admin mengklik *"Sahkan Sertifikasi"*, *"Buka Akses Ruang Data"*, atau *"Tambah Akun"*, aksi tersebut hanya mengubah state variabel lokal Vue (`ref`) tanpa menjalankan query SQL/Prisma ke database backend. Begitu halaman di-refresh, perubahan hilang.

---

## 1. 🧑‍💼 AUDIT ROLE: KONSULTAN (ADVISOR / KURATOR)

### 1.1. Masalah Identitas & Inisialisasi Akun
| Masalah | Lokasi Kode | Akar Masalah | Dampak Nyata |
| :--- | :--- | :--- | :--- |
| **Fallback Otomatis ke Dra. Maya Suryani** | [`server/src/routes/consultant.ts`](file:///c:/laragon/www/Beruang/server/src/routes/consultant.ts) (L19–24) | Fungsi `resolveConsultantId()` mengambil `consultantProfile.findFirst()` jika `userId` akun baru belum memiliki profil. | Akun konsultan baru langsung mewarisi ID Dra. Maya Suryani dan melihat data klien Kopi Senja. |
| **Profil Pinia Terisi Hardcoded** | [`stores/konsultan.ts`](file:///c:/laragon/www/Beruang/stores/konsultan.ts) (L156–200) | State `profile` diinisialisasi default dengan email `maya.suryani@gmail.com`, no HP, dan lisensi BNSP. | Begitu masuk halaman Profil / Pengaturan, akun baru langsung melihat data pribadi Dra. Maya Suryani. |
| **Dokumen Lisensi Bawaan Dummy** | [`stores/konsultan.ts`](file:///c:/laragon/www/Beruang/stores/konsultan.ts) (L170–198) | Array `profile.documents` berisi 3 berkas bawaan (*Sertifikat BNSP*, *Portofolio 25+ UMKM*, *NPWP*). | Akun baru memiliki 3 berkas terverifikasi tanpa pernah mengunggah dokumen. |

### 1.2. Audit Detail Halaman Konsultan
* **A. Beranda Konsultan ([`pages/konsultan/index.vue`](file:///c:/laragon/www/Beruang/pages/konsultan/index.vue)):**
  * Empat kartu pada *"Prioritas Tindakan Hari Ini"* (L120–220) berstatus **100% HTML statis**:
    1. *Kopi Senja Nusantara: Rasio HPP Naik 68%*
    2. *Dapur Mama Catering: Skor Kesehatan 54/100*
    3. *Dapoer Renyah Nusantara: 3 Permintaan Masuk*
    4. *Batik Lestari Heritage: Laporan Kas September (Rp 42 Jt)*
  * *Status Backend:* ❌ Belum ada kalkulasi dinamis dari `MonthlyReport` atau `Assessment` milik klien konsultan yang sedang aktif.
* **B. Permintaan Bimbingan ([`pages/konsultan/klien/index.vue`](file:///c:/laragon/www/Beruang/pages/konsultan/klien/index.vue)):**
  * Endpoint `GET /api/consultant/requests` di [`consultant.ts`](file:///c:/laragon/www/Beruang/server/src/routes/consultant.ts) mengembalikan array hardcoded (*Dapoer Renyah Nusantara*, *Batik Canting*).
  * *Status Database:* ❌ Belum ada tabel `ConsultantMentorshipRequest` di Prisma.
* **C. Daftar Klien Aktif ([`pages/konsultan/klien/index.vue`](file:///c:/laragon/www/Beruang/pages/konsultan/klien/index.vue)):**
  * Di `stores/konsultan.ts`, jika API mengembalikan array kosong, frontend langsung melakukan fallback ke 4 klien dummy bawaan (*Kopi Senja*, *Batik Lestari*, *Sambal Bu Rudy*, *Dapur Mama*). Seharusnya menampilkan *empty state* yang rapi.
* **D. Roadmap Milestone & Tugas ([`pages/konsultan/rencana-aksi.vue`](file:///c:/laragon/www/Beruang/pages/konsultan/rencana-aksi.vue)):**
  * Fungsi `addMilestone()`, `deleteMilestone()`, `addTask()`, dan `updateTaskStatus()` hanya memodifikasi array Pinia di browser tanpa memanggil API backend (`useApi`).
  * *Status Database:* ❌ Belum ada model `ClientMilestone` di Prisma.
* **E. Pengaturan & Preferensi ([`pages/konsultan/pengaturan.vue`](file:///c:/laragon/www/Beruang/pages/konsultan/pengaturan.vue)):**
  * Disimpan di dalam `consultantPreferencesStore = new Map()` di memori Node.js backend. Data preferensi ter-reset jika server dimatikan.

---

## 2. 💼 AUDIT ROLE: INVESTOR (SINDASI / ANGEL INVESTOR)

### 2.1. Masalah Identitas & Inisialisasi Akun
| Masalah | Lokasi Kode | Akar Masalah | Dampak Nyata |
| :--- | :--- | :--- | :--- |
| **State Profil Bawaan Fikri Setiawan** | [`stores/investor.ts`](file:///c:/laragon/www/Beruang/stores/investor.ts) (L340–360) | State `profile` diinisialisasi hardcoded: *"Fikri Setiawan", "PT Nusantara Kapital Investama"*. | Investor baru yang login langsung melihat nama PT dan NIB milik orang lain. |
| **Backend Fallback ke Hendro Wicaksono** | [`server/src/routes/investor.ts`](file:///c:/laragon/www/Beruang/server/src/routes/investor.ts) (L98–105) | `resolveInvestorUserId()` mencari user `hendro@nusantaraventures.com` jika auth ID kosong. | Terjadi ketidaksinkronan identitas antara frontend (Fikri Setiawan) dan backend (Hendro Wicaksono). |

### 2.2. Audit Detail Halaman Investor
* **A. Marketplace Peluang UMKM ([`pages/investor/index.vue`](file:///c:/laragon/www/Beruang/pages/investor/index.vue)):**
  * Generator `build150MarketplaceUmkms()` membuat **150 UMKM palsu/sintetis secara lokal di memori browser**.
  * Pada lifecycle `onMounted()` di [`pages/investor/index.vue`](file:///c:/laragon/www/Beruang/pages/investor/index.vue) (L843–869), method `investorStore.fetchMarketplace()` **tidak pernah dipanggil**. Halaman hanya membaca `initPostsFromStorage()`. Akibatnya investor tidak pernah melihat bisnis riil di database Prisma.
  * Di [`server/src/routes/investor.ts`](file:///c:/laragon/www/Beruang/server/src/routes/investor.ts), konstanta `MARKETPLACE_METADATA` (kode `BERU-KOP-01`, margin default 48.5%, pitch summary) di-hardcode dalam kamus JavaScript, bukan kolom database.
* **B. Pengajuan Akses Ruang Data ([`pages/investor/umkm/[id]/ajukan-akses.vue`](file:///c:/laragon/www/Beruang/pages/investor/umkm/%5Bid%5D/ajukan-akses.vue)):**
  * Permohonan akses yang diajukan investor hanya disimpan di array Pinia `applications`. Belum ada action `fetchMyAccessRequests()` untuk menyinkronkan status tiket persetujuan dari tabel `AccessRequest`.
* **C. Portofolio Pantau / Watchlist ([`pages/investor/watchlist.vue`](file:///c:/laragon/www/Beruang/pages/investor/watchlist.vue)):**
  * Di `INITIAL_CURATED_UMKM`, Kopi Senja dan Keripik Tempe sudah diset `bookmarked: true` secara bawaan, sehingga akun baru langsung memiliki 2 watchlist tanpa pernah mengklik bookmark.
* **D. Dokumen Data Room di Obrolan ([`pages/investor/pesan.vue`](file:///c:/laragon/www/Beruang/pages/investor/pesan.vue)):**
  * Berkas pada modal Data Room (L617–645) berupa daftar statis dummy (`Laporan_Keuangan_2025.pdf`, `Rekening_Koran_6Bulan.pdf`). Belum mengambil relasi `DataRoomDocument` dari UMKM terkait.
* **E. Pengaturan Profil Investor ([`pages/investor/profile.vue`](file:///c:/laragon/www/Beruang/pages/investor/profile.vue)):**
  * Method `updateInvestorProfile()` hanya memodifikasi objek di memori frontend tanpa melakukan HTTP PUT ke `/api/investor/profile`.

---

## 3. 🛡️ AUDIT ROLE: ADMIN PLATFORM (SUPER ADMIN & OPERATIONS LEAD)

Modul Admin Platform merupakan area dengan kesenjangan integrasi database paling signifikan. Mayoritas dari 9 halaman admin bekerja secara terisolasi menggunakan data statis di dalam template atau array ref lokal.

### 3.1. Masalah Keamanan & Telemetri Makro
| Masalah | Lokasi Kode | Akar Masalah | Dampak Nyata |
| :--- | :--- | :--- | :--- |
| **Otorisasi Terlalu Longgar (`optionalAuth`)** | [`server/src/routes/admin.ts`](file:///c:/laragon/www/Beruang/server/src/routes/admin.ts) (L11, L61, L95, L127, L159, L308) | Seluruh endpoint admin menggunakan middleware `optionalAuth`, bukan `requireAuth` + pengecekan `req.user.role === 'ADMIN'`. | Pengguna non-admin yang mengetahui endpoint API dapat membaca data seluruh pengguna dan UMKM. |
| **Manipulasi Angka Statistik Makro** | [`server/src/routes/admin.ts`](file:///c:/laragon/www/Beruang/server/src/routes/admin.ts) (L28–46) | Angka agregasi ditambahkan konstanta buatan: `totalUmkm: 142 + dbUmkmCount - 7`, `activeConsultants: 28 + dbConsultantCount - 3`, `totalCapitalDeployed: "Rp 4.2 M"`. | Data statistik nasional tidak murni mencerminkan isi database Prisma yang sebenarnya. |

---

### 3.2. Audit Detail 9 Halaman Admin Platform

#### A. Beranda Admin ([`pages/admin/index.vue`](file:///c:/laragon/www/Beruang/pages/admin/index.vue))
* **Metrik Kartu Ringkasan (L56, L88, L120, L152):**
  * Angka **`142 Usaha`**, **`28 Mitra`**, **`38 Usaha`**, dan **`Rp 4.200.000.000`** ditulis hardcoded langsung di teks template HTML.
  * Halaman ini **sama sekali tidak memanggil endpoint `GET /api/admin/stats`** saat dimuat (`onMounted`).
* **Kemitraan UMKM Terkini (L432–460):**
  * Array `topPartnerships` berisi 3 data statis dummy (*Kopi Kenangan Senja*, *Batik Sekar Jagad*, *Sayur Hidroponik Segar*).
* **Aktivitas Ekosistem (L462–487):**
  * Array `activityList` berisi 4 riwayat palsu yang tidak membaca log audit atau notifikasi riil.
* **Grafik Donut Distribusi Kesiapan (L407):**
  * Dataset Chart.js di-hardcode dengan angka `[38, 74, 30]`. Belum membaca pengelompokan `status` dari tabel `BusinessProfile`.

#### B. Kemitraan UMKM ([`pages/admin/umkm.vue`](file:///c:/laragon/www/Beruang/pages/admin/umkm.vue))
* **Daftar Kemitraan (L537–780):**
  * Variabel `umkmPartnerships` adalah array lokal berisikan 15 objek data statis.
  * Tidak ada pemanggilan API ke backend untuk memuat kemitraan UMKM dari database relasional (`BusinessProfile` + `ConsultantProfile` + `AccessRequest`).
* **Aksi Pencabutan Izin Ruang Data (`revokeInvestorAccess`, L823–826):**
  * Hanya memfilter array di memori frontend (`umkm.investors = umkm.investors.filter(...)`). Status di tabel `AccessRequest` tidak pernah berubah menjadi `REJECTED` di database.
* **Ekspor CSV (`handleExportCsv`, L828–830):**
  * Hanya menampilkan pesan toast tanpa membuat dan mengunduh berkas `.csv` riil.

#### C. Direktori Profil Usaha UMKM ([`pages/admin/daftar-umkm.vue`](file:///c:/laragon/www/Beruang/pages/admin/daftar-umkm.vue))
* Array `umkmList` (L425–480) berisi 15 data statis UMKM.
* Kartu metrik `Total UMKM ({{ umkmList.length }})`, `NIB Terverifikasi ({{ verifiedNibCount }})`, dan `Siap Didanai ({{ readyCount }})` dihitung dari array lokal tersebut, bukan dari query `prisma.businessProfile.count()`.

#### D. Penugasan Konsultan Pendamping ([`pages/admin/penugasan.vue`](file:///c:/laragon/www/Beruang/pages/admin/penugasan.vue))
* **Riwayat Penugasan (L456–520):**
  * Menggunakan array ref lokal `assignmentHistory` berisikan 5 entitas dummy.
  * Padahal backend sudah memiliki endpoint `GET /api/admin/assignments/history`, tetapi halaman ini **tidak pernah memanggil endpoint tersebut**.
* **Eksekusi Penugasan Baru:**
  * Di halaman ini belum terdapat antarmuka modal form untuk memilih UMKM dari antrean pending dan menetapkan konsultan pendamping ke endpoint `POST /api/admin/assignments`.

#### E. Pengesahan Sertifikasi Usaha ([`pages/admin/sertifikasi.vue`](file:///c:/laragon/www/Beruang/pages/admin/sertifikasi.vue))
* **Antrean Sertifikasi (L423–480):**
  * Array `submissions` memuat 5 permohonan sertifikasi statis (*Sayur Hidroponik Segar*, *Tenun Ikat*, *Kopi Kenangan Senja*).
* **Aksi Pengesahan Sertifikasi:**
  * Tombol *"Sahkan Sertifikasi"* hanya mengubah properti `submission.status = 'Disahkan'` di memori browser.
  * *Status Backend:* ❌ **Belum ada endpoint `PUT /api/admin/certifications/:id/approve`** untuk memperbarui status `BusinessProfile.status` menjadi `READY_FOR_FUNDING` dan membuat sertifikat digital resmi di database.

#### F. Pengawasan Alur Investasi / Deals ([`pages/admin/investasi.vue`](file:///c:/laragon/www/Beruang/pages/admin/investasi.vue))
* Array `dealFlow` (L540–620) berisi 15 transaksi investasi dummy.
* Tombol *"Buka Akses"* (`grantDataRoom`) dan *"Cabut Izin"* (`revokeDataRoom`) (L448–463) hanya memanipulasi string di frontend tanpa memanggil endpoint backend yang mengubah status di tabel `AccessRequest`.

#### G. Direktori Pemodal & Investor ([`pages/admin/investor.vue`](file:///c:/laragon/www/Beruang/pages/admin/investor.vue))
* Array `investorsList` (L419–500) berisi 10 profil investor dummy (*Nusantara Impact Capital*, *Artha Ventura Syariah*, *Bina Artha Angel Syndicate*).
* Status KYC dan metrik deal aktif tidak membaca data riil dari tabel `InvestorProfile` dan `AccessRequest`.

#### H. Kelola Akun Pengguna ([`pages/admin/pengguna.vue`](file:///c:/laragon/www/Beruang/pages/admin/pengguna.vue))
* Array `users` (L494–580) berisi 10 akun pengguna dummy.
* Backend telah memiliki endpoint `GET /api/admin/users`, namun halaman ini belum memanggilnya di lifecycle `onMounted()`.
* **Form Tambah Akun (`saveNewUser`, L405):**
  * Hanya melakukan `users.value.unshift(...)` ke array lokal. Tidak ada endpoint `POST /api/admin/users` untuk menyimpan akun ke tabel `User` dengan hash password bcrypt.
* **Toggle Bekukan Akun (`toggleUserStatus`):**
  * Hanya membalikkan status string `'Aktif'` / `'Dibekukan'` di memori Vue. Tidak ada endpoint `PATCH /api/admin/users/:id/status`.

#### I. Pengaturan Parameter Platform ([`pages/admin/pengaturan.vue`](file:///c:/laragon/www/Beruang/pages/admin/pengaturan.vue))
* Nilai form `certForm` (*minCompositeScore: 75*, *minGuidanceMonths: 3*) dan `cycleForm` (*openDay: 25*, *closeDay: 30*) hanya state reaktif biasa.
* Tombol *"Simpan Perubahan"* (L282–291) hanya mengeksekusi `setTimeout(..., 600)` pura-pura menyimpan.
* *Status Database:* ❌ **Belum ada model `SystemSetting` di `schema.prisma`** untuk menyimpan konfigurasi platform global.

---

## 4. 🗄️ MODEL PRISMA YANG PERLU DITAMBAHKAN

Agar data Konsultan, Investor, dan Admin Platform 100% dinamis dan tersimpan permanen di database, berikut model dan kolom yang wajib ditambahkan ke [`server/prisma/schema.prisma`](file:///c:/laragon/www/Beruang/server/prisma/schema.prisma):

### 4.1. Kebutuhan Role Admin Platform
```prisma
// 1. Konfigurasi Parameter Sistem Global (Admin Pengaturan)
model SystemSetting {
  id                    String   @id @default("global-config")
  minCompositeScore     Int      @default(75)    // Ambang skor lulus sertifikasi
  minGuidanceMonths     Int      @default(3)     // Durasi bimbingan wajib (bulan)
  requireBankStatements Boolean  @default(true)  // Wajib mutasi bank 3 bulan
  openCycleDay          Int      @default(25)    // Tanggal buka siklus pelaporan kas
  closeCycleDay         Int      @default(30)    // Tanggal tutup siklus
  validationWindowDays  Int      @default(5)     // Batas waktu validasi konsultan (hari)
  updatedAt             DateTime @updatedAt
  updatedBy             String?  // ID Admin yang memperbarui
}

// 2. Sertifikat Kelayakan Pendanaan Resmi (Admin Sertifikasi)
model FundingCertificate {
  id               String          @id @default(cuid())
  businessId       String          @unique
  business         BusinessProfile @relation(fields: [businessId], references: [id], onDelete: Cascade)
  certificateNo    String          @unique // e.g. "CERT-BERUANG-2026-0042"
  compositeScore   Int
  financialScore   Int
  operationsScore  Int
  legalScore       Int
  approvedByAdminId String
  approvedAt       DateTime        @default(now())
  validUntil       DateTime        // Masa berlaku 12 bulan
  certificatePdfUrl String?
}

// 3. Log Audit Aktivitas Ekosistem (Admin Beranda & Keamanan)
model PlatformActivityLog {
  id         String   @id @default(cuid())
  userId     String?
  action     String   // e.g. "CERTIFICATION_APPROVED", "VDR_ACCESS_GRANTED", "CONSULTANT_ASSIGNED"
  entityType String   // "BUSINESS", "USER", "ACCESS_REQUEST"
  entityId   String
  title      String
  detail     String?
  ipAddress  String?
  createdAt  DateTime @default(now())
}
```

### 4.2. Kebutuhan Role Konsultan
```prisma
// 1. Permohonan Bimbingan Masuk
model ConsultantMentorshipRequest {
  id              String            @id @default(cuid())
  consultantId    String
  businessId      String
  status          String            @default("PENDING") // PENDING, ACCEPTED, REJECTED
  offeredFee      Float             @default(1500000)
  durationMonths  Int               @default(3)
  message         String?
  rejectionReason String?
  createdAt       DateTime          @default(now())

  consultant      ConsultantProfile @relation(fields: [consultantId], references: [id], onDelete: Cascade)
  business        BusinessProfile   @relation(fields: [businessId], references: [id], onDelete: Cascade)
}

// 2. Berkas Lisensi & Portofolio Konsultan
model ConsultantDocument {
  id           String            @id @default(cuid())
  consultantId String
  name         String
  type         String            // BNSP_CERT, PORTOFOLIO, NPWP, OTHER
  filename     String
  fileSize     String
  fileUrl      String?
  status       String            @default("VERIFIED") // PENDING, VERIFIED, REJECTED
  uploadedAt   DateTime          @default(now())

  consultant   ConsultantProfile @relation(fields: [consultantId], references: [id], onDelete: Cascade)
}

// 3. Milestone Tahapan Bimbingan
model ClientMilestone {
  id           String            @id @default(cuid())
  businessId   String
  consultantId String
  title        String
  phaseNumber  Int               @default(1)
  targetMonth  String            // e.g. "Bulan ke-1"
  status       String            @default("IN_PROGRESS") // TODO, IN_PROGRESS, COMPLETED
  createdAt    DateTime          @default(now())

  business     BusinessProfile   @relation(fields: [businessId], references: [id], onDelete: Cascade)
  consultant   ConsultantProfile @relation(fields: [consultantId], references: [id], onDelete: Cascade)
}
```

### 4.3. Kebutuhan Role Investor
* Menambahkan kolom identitas ke model `InvestorProfile`:
  * `phone`, `whatsapp`, `website`, `nibEntity`, `npwpEntity`, `kycStatus` (`VERIFIED`/`PENDING`), `minTicket` (Float), `maxTicket` (Float), `investmentScheme` (`REVENUE_SHARE`, `EQUITY`, `CONVERTIBLE`).

---

## 5. 🔌 MATRIKS ENDPOINT BACKEND YANG PERLU DIBUAT / DIPERBAIKI

Berikut adalah daftar endpoint Express yang wajib diimplementasikan di `server/src/routes/`:

| Method | Endpoint | Peran | Kegunaan | Status Saat Ini |
| :--- | :--- | :--- | :--- | :--- |
| **GET** | `/api/admin/stats` | Admin | Statistik agregasi riil makro platform | ⚠️ Ada, tapi ada formula manipulasi angka |
| **GET** | `/api/admin/partnerships` | Admin | Daftar kemitraan UMKM, konsultan, dan investor | ❌ Belum ada (frontend pakai array ref dummy) |
| **GET** | `/api/admin/certifications` | Admin | Daftar antrean & riwayat sertifikasi kelayakan | ❌ Belum ada (frontend pakai array ref dummy) |
| **PUT** | `/api/admin/certifications/:id/approve` | Admin | Sahkan sertifikasi & ubah status ke `READY_FOR_FUNDING` | ❌ Belum ada |
| **GET** | `/api/admin/deals` | Admin | Alur permohonan akses data room investor ke UMKM | ❌ Belum ada |
| **PUT** | `/api/admin/deals/:id/toggle-access` | Admin | Buka atau cabut izin akses data room investor | ❌ Belum ada |
| **GET** | `/api/admin/users` | Admin | Daftar seluruh pengguna lintas 4 peran | ✅ Sudah ada |
| **POST** | `/api/admin/users` | Admin | Buat akun pengguna baru langsung ke database | ❌ Belum ada (hanya push array Vue) |
| **PATCH**| `/api/admin/users/:id/status` | Admin | Bekukan atau aktifkan status akun pengguna | ❌ Belum ada |
| **GET** | `/api/admin/settings` | Admin | Ambil konfigurasi parameter platform | ❌ Belum ada |
| **PUT** | `/api/admin/settings` | Admin | Perbarui konfigurasi parameter platform | ❌ Belum ada |
| **GET** | `/api/consultant/requests` | Konsultan | Ambil permohonan bimbingan riil dari UMKM | ⚠️ Ada, tapi mengembalikan array hardcoded |
| **PUT** | `/api/consultant/requests/:id` | Konsultan | Terima / tolak permohonan bimbingan | ❌ Belum ada |
| **GET** | `/api/consultant/milestones` | Konsultan | Ambil daftar milestone pendampingan per klien | ❌ Belum ada |
| **POST**| `/api/consultant/milestones` | Konsultan | Tambah milestone baru untuk klien | ❌ Belum ada |
| **GET** | `/api/investor/marketplace` | Investor | Daftar UMKM riil yang siap didanai | ✅ Ada di backend, tapi belum dipanggil di Vue |
| **GET** | `/api/investor/my-requests` | Investor | Status permohonan akses data room yang diajukan | ❌ Belum ada |
| **PUT** | `/api/investor/profile` | Investor | Simpan pembaruan profil investor ke database | ❌ Belum ada action di Pinia |

---

## 6. 🚀 RENCANA KERJA PRIORITAS & TASK BACKLOG LENGKAP

Rencana implementasi dibagi menjadi **4 Fase Bertahap** dengan prioritas terukur:

### 🔴 FASE 1: Sanitasi Akun Baru & State Pinia (Mendesak)
* [ ] **Task 1.1 — Bersihkan Default State Konsultan:**
  * Di [`stores/konsultan.ts`](file:///c:/laragon/www/Beruang/stores/konsultan.ts), kosongkan default `profile` dan `documents` untuk akun non-demo. Hanya isi data Dra. Maya Suryani jika email login adalah `maya.suryani@beruang.id`.
* [ ] **Task 1.2 — Bersihkan Default State Investor:**
  * Di [`stores/investor.ts`](file:///c:/laragon/www/Beruang/stores/investor.ts), kosongkan data bawaan *Fikri Setiawan / PT Nusantara Kapital*. Hapus item default `bookmarked: true` pada watchlist awal akun baru.
* [ ] **Task 1.3 — Hapus Generator 150 UMKM Palsu:**
  * Gantikan `build150MarketplaceUmkms()` di `stores/investor.ts` dengan pemanggilan live API `useApi('/investor/marketplace')`.
* [ ] **Task 1.4 — Hubungkan Marketplace di `pages/investor/index.vue`:**
  * Tambahkan pemanggilan `await investorStore.fetchMarketplace()` pada `onMounted()` sehingga investor langsung melihat data bisnis riil dari database.

---

### 🟠 FASE 2: Integrasi Backend & Database Admin Platform
* [ ] **Task 2.1 — Bersihkan Formula Manipulasi Telemetri:**
  * Di `server/src/routes/admin.ts`, hapus penambahan angka statis `+ 142 - 7`. Hitung murni dari `prisma.businessProfile.count()`, `prisma.consultantProfile.count()`, dan agregasi `sum` dari `proposedTicket` pada transaksi yang disetujui.
* [ ] **Task 2.2 — Dinamisasi Beranda Admin (`pages/admin/index.vue`):**
  * Hapus angka teks statis di template HTML.
  * Tambahkan pemanggilan API `useApi('/admin/stats')` pada `onMounted()` dan hubungkan ke 4 kartu metrik serta grafik donut.
* [ ] **Task 2.3 — Endpoint & Integrasi Pengguna (`pages/admin/pengguna.vue`):**
  * Hubungkan tabel pengguna ke `GET /api/admin/users`.
  * Buat endpoint `POST /api/admin/users` untuk menyimpan akun baru dengan validasi email unik dan hash bcrypt.
  * Buat endpoint `PATCH /api/admin/users/:id/status` untuk membekukan atau mengaktifkan akun di database.
* [ ] **Task 2.4 — Endpoint & Integrasi Sertifikasi (`pages/admin/sertifikasi.vue`):**
  * Buat endpoint `GET /api/admin/certifications` yang membaca UMKM dengan status `ACTION_PLAN_ACTIVE` atau yang telah diverifikasi konsultan.
  * Buat endpoint `PUT /api/admin/certifications/:id/approve` yang mengubah status bisnis menjadi `READY_FOR_FUNDING` dan mencatat log audit ke tabel `PlatformActivityLog`.
* [ ] **Task 2.5 — Endpoint & Integrasi Penugasan Konsultan (`pages/admin/penugasan.vue`):**
  * Hubungkan tabel riwayat penugasan ke `GET /api/admin/assignments/history`.
  * Tampilkan antrean UMKM yang belum memiliki konsultan (`GET /api/admin/assignments/pending`) dan sediakan modal aksi penugasan ke `POST /api/admin/assignments`.
* [ ] **Task 2.6 — Endpoint & Integrasi Alur Investasi (`pages/admin/investasi.vue`):**
  * Hubungkan tabel deals ke `GET /api/admin/deals` yang membaca data tabel `AccessRequest`.
  * Hubungkan tombol *"Buka Akses"* dan *"Cabut Izin"* ke endpoint `PUT /api/admin/deals/:id/toggle-access`.
* [ ] **Task 2.7 — Model & Endpoint Pengaturan Platform (`pages/admin/pengaturan.vue`):**
  * Tambahkan model `SystemSetting` ke `schema.prisma`.
  * Buat endpoint `GET /api/admin/settings` dan `PUT /api/admin/settings`.
  * Hubungkan form ambang skor dan siklus kas agar tersimpan permanen di database.

---

### 🟡 FASE 3: Integrasi Backend & Database Konsultan
* [ ] **Task 3.1 — Model & Alur Permohonan Bimbingan:**
  * Tambahkan model `ConsultantMentorshipRequest` ke `schema.prisma`.
  * Ubah endpoint `GET /api/consultant/requests` agar membaca dari database relasional.
  * Buat endpoint `PUT /api/consultant/requests/:id` untuk menerima atau menolak bimbingan.
* [ ] **Task 3.2 — Dinamisasi Kartu Prioritas di Beranda Konsultan:**
  * Ubah 4 kartu statis di [`pages/konsultan/index.vue`](file:///c:/laragon/www/Beruang/pages/konsultan/index.vue) menjadi query agregasi: jumlah permohonan bimbingan pending, laporan kas bulan berjalan yang belum diverifikasi, dan anomali rasio HPP > 60%.
* [ ] **Task 3.3 — Model & Persistensi Milestone Bimbingan:**
  * Tambahkan model `ClientMilestone` ke `schema.prisma`.
  * Hubungkan penambahan milestone dan tugas di [`pages/konsultan/rencana-aksi.vue`](file:///c:/laragon/www/Beruang/pages/konsultan/rencana-aksi.vue) ke backend Express.
* [ ] **Task 3.4 — Persistensi Preferensi Konsultan:**
  * Ganti `new Map()` di backend konsultan dengan penyimpanan ke tabel `ConsultantProfile` (kolom `receiveNewClients`, `waNotification`).

---

### 🟢 FASE 4: Integrasi Backend & Database Investor
* [ ] **Task 4.1 — Kolom Tambahan Profil Investor:**
  * Tambahkan kolom `phone`, `whatsapp`, `website`, `nibEntity`, `npwpEntity`, `kycStatus` ke tabel `InvestorProfile`.
  * Buat action `fetchProfile()` dan `updateProfile()` di `stores/investor.ts` yang memanggil `PUT /api/investor/profile`.
* [ ] **Task 4.2 — Sinkronisasi Tiket Akses Ruang Data:**
  * Buat endpoint `GET /api/investor/my-requests` dan hubungkan ke `investorStore.fetchMyAccessRequests()` agar status tiket persetujuan tersimpan saat refresh.
* [ ] **Task 4.3 — Berkas Data Room Dinamis di Obrolan:**
  * Hubungkan modal berkas di [`pages/investor/pesan.vue`](file:///c:/laragon/www/Beruang/pages/investor/pesan.vue) dengan tabel `DataRoomDocument` milik UMKM lawan bicara.

---

## 7. 🧪 PROTOKOL PENGUJIAN AKUN BARU (TESTING CHECKLIST)

Sebelum merilis perubahan ke lingkungan live/staging, lakukan pengujian verifikasi akun baru (*clean slate test*):
1. **Pendaftaran Konsultan Baru:**
   * Daftar akun baru dengan email `konsultan.baru@gmail.com` dan role `CONSULTANT`.
   * Pastikan nama profil, berkas lisensi, dan daftar klien tampil **kosong (empty state)**, tanpa jejak Dra. Maya Suryani.
2. **Pendaftaran Investor Baru:**
   * Daftar akun baru dengan email `investor.baru@gmail.com` dan role `INVESTOR`.
   * Pastikan nama instansi, NIB, dan watchlist tampil **kosong**, tanpa jejak Fikri Setiawan / Kopi Senja.
3. **Login Akun Admin:**
   * Masuk sebagai akun admin platform.
   * Pastikan angka di dashboard beranda sama persis dengan jumlah row di database Prisma.
   * Lakukan aksi pengesahan sertifikasi dan ubah pengaturan platform, lalu refresh halaman untuk memastikan data tersimpan permanen di database.
