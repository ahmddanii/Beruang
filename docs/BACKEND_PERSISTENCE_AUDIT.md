# Audit Persistensi Database Backend — Platform Beruang
> **Tanggal Audit:** 23 Oktober 2026  
> **Status Database:** SQLite Local Engine (`server/prisma/dev.db`)  
> **Tujuan:** Mengidentifikasi seluruh fitur antarmuka yang saat ini **belum tersimpan langsung ke database** (masih terhalang autentikasi ketat, berstatus 404, atau hanya tersimpan di Pinia memory / `localStorage`).

---

## 1. Ringkasan Eksekutif & Akar Masalah (Root Causes)

Berdasarkan investigasi mendalam terhadap kasus gagal simpan pada **Profil Usaha**, terdapat **3 pola sistemik** yang menyebabkan perubahan di frontend tidak masuk ke database SQLite:

| Pola Masalah | Deskripsi Kasus | Dampak di Frontend |
| :--- | :--- | :--- |
| **1. Pemblokiran `requireAuth`** | Endpoint backend diproteksi `requireAuth` padahal controller sudah memiliki fallback ID demo. | Jika pengguna belum login dengan token JWT (misal: sesi demo UMKM/Konsultan/Investor), server menolak dengan `401 Unauthorized`. Frontend me-`catch` error secara diam-diam dan data hanya bertahan di memori browser. |
| **2. Endpoint Mutasi Hilang (404)** | Frontend mengirim request mutasi (POST/PATCH/PUT), tetapi route-nya belum didaftarkan di Express. | Request gagal 404. Contoh: toggle centang tugas rencana aksi (`PATCH /api/umkm/tasks/:id/toggle`) dan tambah tugas baru (`POST /api/umkm/tasks`). |
| **3. Store Pinia / LocalStorage Only** | Aksi di store Pinia atau komponen Vue hanya memanipulasi variabel reaktif dan `localStorage.setItem()`, tanpa panggilan `useApi()`. | Saat halaman di-refresh di perangkat lain atau setelah clear cache, data kembali ke data bawaan awal. |

---

## 2. Matriks Audit Persistensi per Modul

### 2.1 Modul UMKM (Kelola Usaha & Keuangan)

| Fitur & Halaman | Endpoint Backend Terkait | Status Database Saat Ini | Akar Masalah & Solusi yang Harus Dilakukan |
| :--- | :--- | :---: | :--- |
| **Profil Usaha & Identitas**<br>`/dashboard/profile` | `PUT /api/umkm/profile` | ✅ **SUDAH PERSISTEN** | Sudah diperbaiki: ditambahkan tombol simpan lokal dan route menggunakan `optionalAuth` dengan fallback `biz-kopisenja-01`. |
| **Upload Avatar & Sampul Toko**<br>`/dashboard/profile` | `POST /api/umkm/profile/avatar`<br>`POST /api/umkm/profile/banner` | ⚠️ **TERHALANG AUTH** | Endpoint ada, tapi memakai `requireAuth`. Ganti ke `optionalAuth` agar upload foto toko langsung mengupdate tabel `User.avatar` dan `BusinessProfile`. |
| **Produk Unggulan (Featured Products)**<br>`/dashboard/profile` | *Belum ada endpoint* (`/api/umkm/products`) | ❌ **HANYA LOCALSTORAGE** | Tersimpan di `localStorage.setItem('umkm_featured_products')`. Perlu penambahan model Prisma `FeaturedProduct` atau penyimpanan array JSON pada kolom profil. |
| **Kontak & Alamat Gerai**<br>`/dashboard/profile` | `PUT /api/umkm/profile` | ⚠️ **BELUM MASUK PAYLOAD** | WhatsApp, Instagram, dan alamat fisik masih disimpan di `localStorage.setItem('umkm_contacts')`. Perlu dimasukkan ke payload update profil toko. |
| **Catat Transaksi Kas Harian**<br>`/dashboard/progres` | `POST /api/finances/daily` | ⚠️ **TERHALANG AUTH** | Menggunakan `requireAuth`. Jika sesi demo, gagal 401 dan transaksi hanya masuk ke `financeSummary` lokal. Ganti ke `optionalAuth`. |
| **Hapus Transaksi Kas Harian**<br>`/dashboard/progres` | `DELETE /api/finances/daily/:id` | ⚠️ **TERHALANG AUTH** | Menggunakan `requireAuth`. Ganti ke `optionalAuth` agar delete menghapus row di `DailyTransaction`. |
| **Input Laporan Bulanan (Omzet/HPP)**<br>`/dashboard/progres` | `POST /api/finances/monthly` | ⚠️ **TERHALANG AUTH** | Menggunakan `requireAuth`. Ganti ke `optionalAuth` agar baris laporan bulanan tersimpan ke tabel `MonthlyReport`. |
| **Upload Rekening Koran / Bukti Kas**<br>`/dashboard/progres` | `POST /api/finances/monthly/:id/upload-proof` | ⚠️ **TERHALANG AUTH** | Menggunakan `requireAuth`. Ganti ke `optionalAuth` agar berkas PDF tersimpan di disk fisik dan path-nya tercatat di database. |
| **Centang Tugas Rencana Aksi**<br>`/dashboard/rencana-aksi` | `PATCH /api/umkm/tasks/:id/toggle` | ❌ **404 NOT FOUND** | Route `toggle` belum ada di `server/src/routes/umkm.ts` (hanya ada `PUT /tasks/:id`). Harus dibuat route `PATCH /tasks/:id/toggle`. |
| **Tambah Tugas Rencana Aksi Baru**<br>`/dashboard/rencana-aksi` | `POST /api/umkm/tasks` | ❌ **BELUM ADA DI STORE & ROUTE** | Method `addTask()` di `stores/umkm.ts` hanya melakukan `this.tasks.push()`. Harus dibuat endpoint `POST /api/umkm/tasks` dan dihubungkan ke store. |
| **Upload Bukti Aksi (Evidence)**<br>`/dashboard/rencana-aksi` | `PUT /api/umkm/tasks/:id` | ⚠️ **TERHALANG AUTH** | Menggunakan `requireAuth`. Ganti ke `optionalAuth` agar URL evidence tersimpan di kolom `ActionPlanTask.evidenceUrl`. |
| **Simpan Cek Kesehatan / Diagnosis 5 Aspek**<br>`/dashboard/penilaian` | `PUT /api/umkm/assessment` | ❌ **BELUM ADA ENDPOINT** | Backend baru memiliki `GET /api/umkm/assessment`. Perlu ditambahkan `PUT /api/umkm/assessment` agar kalkulasi skor mandiri UMKM tersimpan di tabel `Assessment`. |
| **Upload Berkas Data Room (VDR)**<br>`/dashboard/profile` | `POST /api/vdr/documents`<br>`DELETE /api/vdr/documents/:id` | ⚠️ **TERHALANG AUTH** | Menggunakan `requireAuth`. Ganti ke `optionalAuth` dengan fallback `businessId` otomatis ke profil demo. |
| **Respon Permintaan Investor (Terima/Tolak)**<br>`/dashboard/permintaan-investor` | `PUT /api/umkm/investor-requests/:id/respond` | ⚠️ **TERHALANG AUTH** | Menggunakan `requireAuth`. Ganti ke `optionalAuth` agar status `AccessRequest` terupdate (`APPROVED` / `REJECTED`). |
| **Tanda Tangan Kontrak Bimbingan**<br>`/dashboard/profile` & `/dashboard/pendanaan` | `POST /api/umkm/agreements/:id/sign` | ⚠️ **TERHALANG AUTH** | Menggunakan `requireAuth`. Ganti ke `optionalAuth` agar tanda tangan tersimpan di tabel `ConsultantAgreement`. |

---

### 2.2 Modul Konsultan (Bimbingan, Validasi, & Scoring)

| Fitur & Halaman | Endpoint Backend Terkait | Status Database Saat Ini | Akar Masalah & Solusi yang Harus Dilakukan |
| :--- | :--- | :---: | :--- |
| **Validasi Laporan Kas UMKM**<br>`/konsultan/validasi` | `POST /api/consultant/validations/:id/verify`<br>`POST /api/consultant/validations/:id/request-revision` | ⚠️ **TERHALANG AUTH** | Menggunakan `requireAuth`. Ganti ke `optionalAuth` dengan fallback konsultan `cons-prof-01` agar verifikasi status laporan bulanan langsung tersimpan ke `MonthlyReport.status = VERIFIED`. |
| **Terima / Tolak Permintaan Klien**<br>`/konsultan/request` | `POST /api/consultant/requests/:id/accept`<br>`POST /api/consultant/requests/:id/reject` | ⚠️ **TERHALANG AUTH** | Menggunakan `requireAuth`. Ganti ke `optionalAuth` agar status assignment langsung tersimpan di tabel `ConsultantAssignment`. |
| **Simpan Skor Radar 5 Aspek Klien**<br>`/konsultan/klien/[id]/penilaian` | `PUT /api/consultant/clients/:id/assessment` | ⚠️ **TERHALANG AUTH** | Menggunakan `requireAuth`. Ganti ke `optionalAuth` agar perubahan skor finansial, HPP, pemasaran, tim, dan legalitas terupdate di tabel `Assessment`. |
| **Terbitkan Sertifikat Kesiapan Modal**<br>`/konsultan/klien/[id]/sertifikasi` | `POST /api/consultant/clients/:id/certify` | ⚠️ **TERHALANG AUTH** | Menggunakan `requireAuth`. Ganti ke `optionalAuth` agar status bisnis berubah menjadi `READY_FOR_FUNDING` di tabel `BusinessProfile`. |
| **Simpan Profil Konsultan**<br>`/konsultan/profil` | `PUT /api/consultant/profile` | ❌ **STORE BELUM PANGGIL API** | Di `stores/konsultan.ts`, method `updateProfile()` hanya mengubah state Pinia lokal tanpa memanggil `PUT /api/consultant/profile`. Hubungkan store ke endpoint yang sudah tersedia. |
| **Buat & Tanda Tangan MoU Perjanjian**<br>`/konsultan/kontrak` | `POST /api/consultant/agreements`<br>`POST /api/consultant/agreements/:id/sign` | ⚠️ **TERHALANG AUTH** | Menggunakan `requireAuth`. Ganti ke `optionalAuth` agar draft kontrak dan e-signature tersimpan di `ConsultantAgreement`. |

---

### 2.3 Modul Investor (Katalog, Permintaan Akses, & Deal)

| Fitur & Halaman | Endpoint Backend Terkait | Status Database Saat Ini | Akar Masalah & Solusi yang Harus Dilakukan |
| :--- | :--- | :---: | :--- |
| **Bookmark / Watchlist Toko**<br>`/investor/watchlist` | `POST /api/investor/bookmark/:businessId`<br>`DELETE /api/investor/watchlist/:businessId` | ✅ **SUDAH PERSISTEN** | Sudah menggunakan `optionalAuth` dan tersimpan ke tabel `InvestorWatchlist`. |
| **Kirim Penawaran Modal / Permohonan VDR**<br>`/investor/umkm/[id]` | `POST /api/investor/requests` | ✅ **SUDAH PERSISTEN** | Sudah menggunakan `optionalAuth` dan tersimpan ke tabel `AccessRequest`. |
| **Simpan Profil & Preferensi Investor**<br>`/investor/pengaturan` | `PUT /api/investor/profile`<br>`PUT /api/investor/preferences` | ✅ **SUDAH PERSISTEN** | Sudah terintegrasi langsung ke tabel `InvestorProfile` dan `User`. |

---

### 2.4 Modul Pesan & Notifikasi Terpadu

| Fitur & Halaman | Endpoint Backend Terkait | Status Database Saat Ini | Akar Masalah & Solusi yang Harus Dilakukan |
| :--- | :--- | :---: | :--- |
| **Kirim Pesan Chat & Negosiasi Deal**<br>`/dashboard/pesan`, `/investor/pesan` | `POST /api/chat/threads/:id/messages` | ✅ **SUDAH PERSISTEN** | Tersimpan di tabel `ChatMessage` beserta attachment `DEAL_OFFER`. |
| **Tandai Notifikasi Terbaca / Hapus**<br>`/dashboard/notifikasi` | `PATCH /api/notifications/:id/read`<br>`DELETE /api/notifications/:id` | ✅ **SUDAH PERSISTEN** | Endpoint menggunakan `optionalAuth` dan tersimpan di tabel `Notification`. |

---

## 3. Rencana Aksi Perbaikan Cepat (Sprint Roadmap)

Untuk menuntaskan seluruh celah persistensi di atas sehingga **semua perubahan langsung tersimpan ke database**, berikut 4 langkah perbaikan konkret:

### Tahap 1: Konversi Auth Middleware ke `optionalAuth` (Prioritas Utama)
- **`server/src/routes/finances.ts`**:
  Ubah middleware pada rute `/daily`, `/daily/:id`, `/monthly`, `/monthly/:id/upload-proof`, dan `/summary` menjadi `optionalAuth`.
- **`server/src/routes/vdr.ts`**:
  Ubah middleware pada `/documents` (GET, POST, DELETE) menjadi `optionalAuth` dan pastikan fallback `businessId` otomatis ke `biz-kopisenja-01` saat unauthenticated.
- **`server/src/routes/consultant.ts`**:
  Ubah middleware pada `/validations`, `/requests`, `/clients/:id/assessment`, `/clients/:id/certify`, `/agreements`, `/profile`, dan `/preferences` menjadi `optionalAuth`.
- **`server/src/routes/umkm.ts`**:
  Ubah middleware pada `/tasks`, `/assessment`, `/investor-requests`, dan `/agreements` menjadi `optionalAuth`.

### Tahap 2: Menambahkan Endpoint Mutasi yang Hilang
- Tambahkan `PATCH /api/umkm/tasks/:id/toggle` di `server/src/routes/umkm.ts`.
- Tambahkan `POST /api/umkm/tasks` di `server/src/routes/umkm.ts`.
- Tambahkan `PUT /api/umkm/assessment` di `server/src/routes/umkm.ts`.

### Tahap 3: Hubungkan Store Pinia ke Backend API
- Perbarui `stores/konsultan.ts` pada method `updateProfile` agar memanggil `PUT /api/consultant/profile`.
- Perbarui `stores/umkm.ts` pada method `addTask` agar memanggil `POST /api/umkm/tasks`.

### Tahap 4: Pengujian Otomatis Menyeluruh (End-to-End Persistence Test)
- Buat dan jalankan skrip `scratch/test_all_persistence.js` untuk menguji mutasi data pada setiap endpoint di atas dan memverifikasi langsung query ke database SQLite `dev.db`.
