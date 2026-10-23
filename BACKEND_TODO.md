# Laporan Audit Kesiapan Backend — Platform Beruang (Ber-Uang)
> **Tanggal Audit:** 23 Oktober 2026  
> **Status Frontend:** Siap & Terintegrasi Antarmuka (Nuxt 3 / Vue 3 / Pinia / Tailwind CSS)  
> **Target Analisis:** Evaluasi menyeluruh endpoint, layanan, skema database, dan alur kerja backend yang **belum dapat digunakan atau harus dibuat ulang**.

---

## 1. Ringkasan Eksekutif & Kondisi Arsitektur Saat Ini

Platform Beruang adalah ekosistem B2B terintegrasi untuk pendampingan UMKM, sertifikasi kesiapan modal bersama konsultan terakreditasi, dan sindikasi investasi modal kerja bersama investor. 

Secara arsitektur, terdapat **dua implementasi backend** di dalam repositori:
1. **Live Production API (Laravel 11 + PostgreSQL)** aktif di `https://beruang-api.fly.dev/api` (terhubung ke frontend via runtime config `NUXT_PUBLIC_API_BASE_URL`).
2. **Local Backend Skeleton (Express + Prisma)** di folder `server/` (saat ini masih berupa kerangka dasar dengan satu route `/api/health` dan belum memiliki controller/routing bisnis).

### Hasil Pengujian Langsung (*Live Probe Test*) ke API Fly.io:
Berdasarkan pengujian langsung terhadap 35+ rute endpoint pada backend live:
- **Sudah Aktif & Merespon Data**: Autentikasi dasar (`/api/auth/login`, `/api/auth/register`, `/api/auth/me`), Profil UMKM (`/api/umkm/profile`), Transaksi Kas Harian (`/api/finances/daily`), Rekap Laporan Bulanan (`/api/umkm/monthly-reports`), Assessment Radar (`/api/umkm/assessment`), Daftar Task UMKM (`/api/umkm/tasks`), Marketplace Publik (`/api/investor/marketplace`), dan Daftar User Admin (`/api/admin/users`).
- **Endpoint yang 404 (Belum Dibuat di Backend)**:
  - `GET /api/finances/monthly` (Frontend memanggil ini sebagai pelengkap `/umkm/monthly-reports`)
  - `GET /api/consultant/requests` (Permintaan bimbingan dari UMKM ke Konsultan)
  - `GET & POST /api/umkm/documents` & `/api/vdr/documents` (Manajemen dokumen legalitas VDR)
  - `GET & POST /api/vdr/requests` (Permintaan buka akses ruang data privat)
  - `POST /api/onboarding/consultant` & `POST /api/onboarding/investor` (Onboarding spesifik role)
  - `GET /api/admin/stats` (Agregat metrik dan telemetri ekosistem nasional)
  - `POST /api/admin/assignments` / `/api/consultant/assign` (Penugasan konsultan ke UMKM)
  - `POST /api/upload/file`, `/api/upload/avatar`, `/api/upload/banner` (Layanan Cloud File Storage)
- **Endpoint yang Masih Statis / Mengembalikan Data Kosong**:
  - `/api/consultant/validations` -> mengembalikan `[]` (antrean validasi kas konsultan belum jalan)
  - `/api/consultant/alerts` -> mengembalikan `[]` (deteksi anomali AI belum aktif)
  - `/api/investor/watchlist` -> mengembalikan `[]` (belum ada mekanisme persistensi bookmark)
  - `/api/investor/marketplace` -> hanya mengembalikan 1 data UMKM seeded statis.

---

## 2. Matriks Kesiapan Fitur (Feature Readiness Matrix)

| Modul & Fitur | Halaman Terkait | Status Frontend | Status Backend Saat Ini | Tingkat Urgensi |
| :--- | :--- | :--- | :--- | :---: |
| **Login Email & Password** | `/masuk` | ✅ Siap | ✅ Terhubung (`POST /auth/login`) | Selesai |
| **Registrasi Pengguna** | `/daftar` | ✅ Siap | ✅ Terhubung (`POST /auth/register`) | Selesai |
| **Google OAuth Asli** | `/masuk`, `/daftar` | ✅ Siap UI Google | ✅ Selesai (`POST /api/auth/google` verifikasi token, firstOrCreate, terbitkan JWT) | Selesai |
| **OTP WhatsApp Gateway** | `/verifikasi` | ✅ Siap | ✅ Selesai (`POST /api/otp/send` & `verify`, 6-digit TTL 5 mnt, rate limit 60s) | Selesai |
| **Onboarding UMKM** | `/onboarding` | ✅ Siap (Wizard) | ✅ Selesai (`POST /api/onboarding/umkm` & relasi bank/NIB/NPWP) | Selesai |
| **Onboarding Konsultan & Investor**| `/onboarding` | ✅ Siap | ✅ Selesai (`POST /api/onboarding/consultant` & `/investor`) | Selesai |
| **Buku Kas Harian (Mutasi POS)** | `/dashboard/progres` | ✅ Siap | ✅ Terhubung (`GET & POST /finances/daily`) | Selesai |
| **Kalkulasi Otomatis Saldo Kas** | `/dashboard/progres` | ✅ Siap | ✅ Selesai (`GET /finances/summary` agregator kas DB) | Selesai |
| **Upload Bukti Kas & Rekening Koran** | `/dashboard/progres` | ✅ Siap Modal & Form | ✅ Selesai (Multer storage berkas fisik PDF/Excel) | Selesai |
| **Virtual Data Room (VDR) Dokumen**| `/dashboard/profile` | ✅ Siap Dokumen List | ✅ Selesai (`GET, POST, DELETE /vdr/documents`) | Selesai |
| **Bukti Langkah Aksi (Evidence)** | `/dashboard/rencana-aksi` | ✅ Siap Upload & View | ✅ Selesai (Tersimpan di Multer & URL DB) | Selesai |
| **Permintaan Bimbingan Konsultan** | `/konsultan/request` | ✅ Siap UI Terima/Tolak | ✅ Selesai (`GET & POST /consultant/requests`) | Selesai |
| **Validasi Kas Bulanan Konsultan** | `/konsultan/validasi` | ✅ Siap Form Verifikasi | ✅ Selesai (`GET /validations` & `POST /verify`) | Selesai |
| **Input Scoring Radar 5 Aspek** | `/konsultan/klien/[id]/penilaian`| ✅ Siap Radar Chart | ✅ Selesai (`PUT /consultant/clients/:id/assessment`) | Selesai |
| **Penerbitan Sertifikat Pendanaan** | `/konsultan/klien/[id]/sertifikasi`| ✅ Siap Generator PDF | ✅ Selesai (`POST /consultant/clients/:id/certify`) | Selesai |
| **Kontrak Perjanjian Konsultan** | `/konsultan/klien/perjanjian/[id]`| ✅ Siap Draft & TTD | ✅ Selesai (Model Prisma `ConsultantAgreement`, endpoint konsultan & UMKM e-sign) | Selesai |
| **AI Anomaly Detection (Gemini)** | `/konsultan/alert` | ✅ Siap UI Alert Card | ❌ Belum ada worker pembanding rasio HPP & trigger AI | **P1 (Tinggi)** |
| **Katalog Investor Marketplace** | `/investor` | ✅ Siap Social Feed | ✅ Selesai (`GET /api/investor/marketplace` query DB & filter) | Selesai |
| **Simpan Watchlist Investor** | `/investor/watchlist` | ✅ Siap Toggle Bookmark| ✅ Selesai (`GET /investor/watchlist`, `POST /bookmark/:id`) | Selesai |
| **Pengajuan Akses Ruang Data Privat**| `/investor/umkm/[id]` | ✅ Siap Form Tiket Modal| ✅ Selesai (`POST /api/investor/requests`, approval UMKM) | Selesai |
| **Signed URL Dokumen VDR** | `/investor/data-room/[id]` | ✅ Siap Viewer | ✅ Selesai (`GET /api/investor/data-room/:id` & VDR stream) | Selesai |
| **Chat & Negosiasi Deal Room** | `/dashboard/pesan`, `/investor/pesan` | ✅ Siap UI Chat | ✅ Selesai (Persistensi Prisma `ChatThread` & `ChatMessage`, filter role, unread counter) | Selesai |
| **Penawaran Investasi (Deal Offer)** | `/dashboard/pesan` | ✅ Siap Attachment Card| ✅ Selesai (Attachment `DEAL_OFFER`, `METRIC`, `DOCUMENT`, tiket modal & bagi hasil) | Selesai |
| **Penugasan Konsultan oleh Admin** | `/admin/penugasan` | ✅ Siap Dropdown & Form | ✅ Selesai (`POST /api/admin/assignments` & riwayat penugasan) | Selesai |
| **Statistik Global Ekosistem** | `/admin` | ✅ Siap Telemetri Card | ✅ Selesai (`GET /api/admin/stats` kalkulasi agregat nasional) | Selesai |
| **Pusat Notifikasi Terpadu** | `/dashboard/notifikasi` | ✅ Siap Interactive List | ✅ Selesai (`GET /api/notifications`, `PATCH /read`, `PATCH /mark-all-read`, `DELETE /:id`) | Selesai |
| **Audit Log Keamanan Akses VDR** | `/investor/data-room/[id]` | ✅ Siap Watermark & Audit | ✅ Selesai (Prisma `VdrAuditLog`, auto-log download, endpoint log-view & audit trail) | Selesai |

---

## 3. Rincian Kebutuhan Pengembangan Backend per Modul

---

### Bagian 1: Autentikasi, Akun, & Onboarding Multi-Peran

#### 1.1 Verifikasi Google OAuth Token di Server (`POST /api/auth/google`)
- **Masalah Saat Ini**: Frontend mengirimkan Google ID Token dari Google Identity Services. Jika backend gagal memverifikasi, frontend terpaksa fallback menggunakan sesi lokal darurat.
- **Solusi yang Harus Dibuat**:
  - Install library Google Client (`google/apiclient` di Laravel atau `google-auth-library` di Node.js).
  - Verifikasi signature ID token terhadap Google Client ID (`203404374211-...`).
  - Ekstrak email, nama, dan foto profil.
  - Lakukan `firstOrCreate` pada tabel `users`.
  - Jika pengguna baru, set `role` sesuai pilihan saat pendaftaran dan terbitkan personal access token (Sanctum/JWT).

#### 1.2 Integrasi Gateway WhatsApp OTP Riil (`POST /api/otp/send` & `POST /api/otp/verify`)
- **Masalah Saat Ini**: `/api/otp/send` hanya mengembalikan response statis dan `"otp_dev": null`. Kode OTP tidak dikirimkan ke nomor WhatsApp pengguna.
- **Solusi yang Harus Dibuat**:
  - Hubungkan ke vendor WhatsApp API (misal: **Fonnte**, **Waba**, atau **Twilio WhatsApp**).
  - Generate 6 digit angka acak yang di-hash di cache/Redis dengan masa kedaluwarsa 5 menit (TTL 300 detik).
  - Terapkan rate limiter: maksimal 1 OTP per 60 detik per nomor handphone untuk mencegah spam abuse.
  - Buat endpoint `POST /api/otp/verify` dengan payload `{ phone, otp }` untuk mengubah status `phoneVerified: true` pada tabel `users`.

#### 1.3 Pemisahan Alur Onboarding per Peran Pengguna
- **Masalah Saat Ini**: Endpoint `/api/onboarding/consultant` dan `/api/onboarding/investor` bernilai **404**. Akun konsultan dan investor yang mendaftar baru tidak dapat menyimpan data kelembagaannya.
- **Endpoint yang Harus Dibuat**:
  1. `POST /api/onboarding/umkm`:
     - Payload: Nama Brand, Nama Pemilik, Sektor Usaha, Kota, Tahun Berdiri, Jumlah Outlet, Jumlah Karyawan, Target Modal, NIB, NPWP, Rekening Bank (Nama Bank, No Rekening, Atas Nama).
     - Relasi: Simpan ke tabel `business_profiles`.
  2. `POST /api/onboarding/consultant`:
     - Payload: Nama Lembaga/Firma Konsultan, Nomor Lisensi/Akreditasi BNSP, Spesialisasi (F&B, Keuangan, Pajak, Rantai Pasok), Pengalaman Kerja, Kota Praktik, Tarif Fee Pendampingan Default, Maksimal Kapasitas Klien.
     - Relasi: Simpan ke tabel `consultant_profiles`.
  3. `POST /api/onboarding/investor`:
     - Payload: Nama Entitas Modal / Sindikasi, Tipe Investor (Angel Investor, Venture Capital, Corporate), Rentang Tiket Modal (Rp 50 Jt - Rp 500 Jt), Sektor Prioritas, Minimal Target Margin Kotor.
     - Relasi: Simpan ke tabel `investor_profiles`.

---

### Bagian 2: Modul UMKM (Buku Kas, Rekapitulasi, & Arus Kas Riil)

#### 2.1 Sinkronisasi Rute Laporan Bulanan (`GET & POST /api/finances/monthly`)
- **Masalah Saat Ini**: Frontend memiliki pemanggilan ganda ke `/api/finances/monthly` dan `/api/umkm/monthly-reports`. Endpoint `/finances/monthly` mengembalikan status **404 Not Found**.
- **Solusi yang Harus Dibuat**:
  - Buat rute alias di routing backend:
    ```php
    Route::get('/finances/monthly', [MonthlyReportController::class, 'index']);
    Route::post('/finances/monthly', [MonthlyReportController::class, 'store']);
    ```

#### 2.2 Otomatisasi Perhitungan Saldo Kas Toko (Ledger Aggregator Engine)
- **Masalah Saat Ini**: Saat UMKM mencatat transaksi uang masuk/keluar melalui modal "Catat Kas Toko Baru", baris transaksi bertambah di `/api/finances/daily`, namun angka ringkasan di `/api/finances/summary` (`cashBalance`, `marginPercentage`) tidak otomatis terupdate mengikuti kalkulasi riil.
- **Logika Backend yang Harus Dibuat (Event/Observer)**:
  - Setiap terjadi mutasi pada tabel `daily_transactions` (`created`, `updated`, `deleted`):
    $$\text{Saldo Kas Akhir} = \sum \text{Pemasukan} - \sum \text{Modal Jualan (HPP)} - \sum \text{Biaya Operasional}$$
    $$\text{Margin Kotor (\%)} = \left(\frac{\text{Penjualan} - \text{HPP}}{\text{Penjualan}}\right) \times 100\%$$
  - Simpan nilai agregat ini ke tabel `financial_summaries` milik UMKM tersebut sehingga grafik pergerakan kas toko selalu sinkron.

#### 2.3 Manajemen Berkas Bukti Transaksi Kas & Rekening Koran Bulanan
- **Masalah Saat Ini**: Form upload berkas bukti laporan kas bulanan yang baru dibuat di frontend hanya menyimpan nama file dan ukuran secara lokal, belum mengunggah file biner ke server.
- **Endpoint yang Harus Dibuat**:
  - `POST /api/finances/monthly/{id}/upload-proof` (Menerima multipart file PDF/Excel max 10MB, mengunggah ke cloud bucket, dan menyimpan path ke kolom `proof_document_url`).
  - `POST /api/finances/daily/{id}/receipt` (Menerima foto struk nota kasir, kompresi otomatis ke WebP/JPEG, dan menyimpan URL publik nota).

---

### Bagian 3: Modul Konsultan (Validasi Kas, Scoring 5 Aspek, Action Plan, & Kontrak MoU)

Modul Konsultan merupakan area dengan kesenjangan integrasi terbesar karena hampir seluruh alur kerja di `stores/konsultan.ts` masih mengandalkan manipulasi memori lokal (Pinia).

#### 3.1 Alur Penerimaan Permintaan Bimbingan UMKM (`/api/consultant/requests`)
- **Masalah Saat Ini**: Route `GET /api/consultant/requests` mengembalikan **404**. Konsultan tidak dapat melihat UMKM mana saja yang mengajukan pendampingan.
- **Endpoint yang Harus Dibuat**:
  1. `GET /api/consultant/requests`: Menampilkan daftar permohonan bimbingan berstatus `PENDING` yang ditujukan ke konsultan ini.
  2. `POST /api/consultant/requests/{id}/accept`: 
     - Mengubah status permohonan menjadi `ACCEPTED`.
     - Mengisi kolom `consultant_id` pada tabel `business_profiles`.
     - Menambah counter `active_clients_count` konsultan.
     - Memicu notifikasi otomatis ke dashboard UMKM.
  3. `POST /api/consultant/requests/{id}/reject`:
     - Mengubah status menjadi `REJECTED` dengan menyertakan `rejection_reason`.

#### 3.2 Antrean Validasi Kas Bulanan Klien (`/api/consultant/validations`)
- **Masalah Saat Ini**: Endpoint `/api/consultant/validations` selalu mengembalikan array kosong `[]`, sehingga konsultan tidak bisa memverifikasi mutasi rekening klien secara nyata.
- **Logika Backend yang Harus Dibuat**:
  - Endpoint `GET /api/consultant/validations`: Melakukan query terhadap seluruh `monthly_reports` milik UMKM binaan yang memiliki status `submitted` / `pending_review`.
  - Endpoint `POST /api/consultant/validations/{id}/verify`:
    - Mengubah status laporan menjadi `verified`.
    - Menyimpan catatan audit konsultan (`consultant_notes`).
    - Memperbarui status kelayakan UMKM menuju tahap pendanaan jika sudah 3 bulan berturut-turut terverifikasi tanpa anomali.
  - Endpoint `POST /api/consultant/validations/{id}/request-revision`:
    - Mengubah status menjadi `revision_needed` dan mengirim notifikasi revisi ke UMKM.

#### 3.3 Penilaian Diagnostik 5 Aspek Fundamental (`PUT /api/consultant/clients/{id}/assessment`)
- **Masalah Saat Ini**: Halaman evaluasi konsultan (`pages/konsultan/klien/[id]/penilaian.vue`) memiliki slider penentu skor untuk 5 pilar (Finansial, Operasional, Pemasaran, Legalitas, Tim/Tata Kelola). Namun, perubahan skor ini belum bisa disimpan ke database.
- **Endpoint yang Harus Dibuat**:
  - `PUT /api/consultant/clients/{clientId}/assessment`:
    - Payload: `{ financial: 85, operations: 80, marketing: 75, legal: 90, governance: 80, notes: "..." }`
    - Backend menghitung skor komposit berbobot:
      $$\text{Skor Kesiapan} = \frac{\text{Fin} \times 0.30 + \text{Ops} \times 0.20 + \text{Mkt} \times 0.15 + \text{Leg} \times 0.20 + \text{Gov} \times 0.15}{1}$$
    - Simpan ke tabel `assessments`. Jika skor komposit $\ge 75$ dan syarat kas terpenuhi, buka akses status `READY_FOR_FUNDING`.

#### 3.4 Pembuatan Kontrak Perjanjian Bimbingan (MoU) & E-Sign Persistence
- **Masalah Saat Ini**: Halaman `pages/konsultan/klien/perjanjian/[id].vue` memiliki draft kontrak legalitas lengkap (kompensasi fee, durasi bimbingan, hak kekayaan intelektual, klausul kerahasiaan), namun tidak ada tabel backend untuk menyimpannya.
- **Kebutuhan Backend**:
  - Buat tabel `consultant_agreements`:
    - `id`, `consultant_id`, `business_id`, `monthly_fee`, `duration_months`, `effective_date`, `end_date`, `agreement_text`, `status` (`DRAFT`, `SIGNED_CONSULTANT`, `ACTIVE`, `EXPIRED`), `signed_at`.
  - Endpoint `POST /api/consultant/agreements`: Membuat draft kontrak baru.
  - Endpoint `POST /api/consultant/agreements/{id}/sign`: Pengesahan tanda tangan digital konsultan.
  - Endpoint `GET /api/umkm/agreement`: UMKM melihat dan menandatangani perjanjian yang diajukan konsultan.

---

### Bagian 4: Modul Investor & Marketplace Pendanaan

#### 4.1 Filter Query Kompleks pada Katalog Marketplace (`GET /api/investor/marketplace`)
- **Masalah Saat Ini**: Endpoint hanya mengembalikan 1 entitas statis. Fitur filter sektor (F&B, Agrikultur, Kriya, Jasa), filter kota (Bandung, Surabaya, Malang, Solo), batas minimal margin laba kotor, dan rentang tiket modal belum berjalan di database query.
- **Logika Backend yang Harus Dibuat**:
  - Backend harus melakukan query dinamis pada tabel `business_profiles` dengan kriteria:
    - Hanya bisnis yang memiliki relasi `assessment.compositeScore >= 75` dan `status = 'READY_FOR_FUNDING'`.
    - Join ke tabel `monthly_reports` untuk mengambil rata-rata margin kotor dan rasio pertumbuhan omzet tahunan (*YoY growth*).
    - Menerapkan pagination (`page`, `per_page`), sorting (`health_score_desc`, `margin_desc`, `ticket_asc`), dan search term pada nama brand atau produk.

#### 4.2 Persistensi Watchlist / Portfolio Pantau Investor
- **Masalah Saat Ini**: Fitur bookmark bintang di social feed investor (`POST /api/investor/bookmark/{id}`) belum persisten ke database. Halaman `/investor/watchlist` selalu kosong saat di-refresh.
- **Kebutuhan Backend**:
  - Buat tabel pivot `investor_watchlists`:
    - `id`, `investor_id`, `business_id`, `created_at`.
  - Endpoint `GET /api/investor/watchlist`: Menampilkan semua UMKM yang di-bookmark oleh investor yang sedang login.
  - Endpoint `POST /api/investor/watchlist/{businessId}`: Menambahkan ke watchlist.
  - Endpoint `DELETE /api/investor/watchlist/{businessId}`: Menghapus dari watchlist.

#### 4.3 Alur Pengajuan Tiket Akses Modal & Permintaan Buka VDR
- **Masalah Saat Ini**: Endpoint `POST /api/investor/requests` dan `GET /api/vdr/requests` masih **404**. Ketika investor menekan tombol "Ajukan Tiket Modal Ini" di halaman investor, pengajuan tidak masuk ke dashboard UMKM.
- **Logika Backend yang Harus Dibuat**:
  - Simpan pengajuan ke tabel `access_requests` dengan payload `{ businessId, proposedTicket, introMessage, investmentScheme }`.
  - Kirim notifikasi high-priority ke UMKM pemilik toko.
  - UMKM dapat merespon melalui endpoint `POST /api/umkm/investor-requests/{id}/respond` dengan payload `{ status: 'APPROVED' | 'REJECTED' }`.
  - Jika `APPROVED`, ubah izin akses investor pada bisnis tersebut sehingga investor dapat mengakses halaman `/investor/data-room/{id}`.

---

### Bagian 5: Virtual Data Room (VDR) & File Storage Engine

Virtual Data Room adalah fitur inti yang menjadi nilai jual utama platform Beruang bagi investor institusi dan angel investor untuk melakukan *due diligence* keuangan dan legalitas secara aman.

#### 5.1 Infrastruktur Cloud Storage (Supabase Storage / AWS S3)
- **Kondisi Saat Ini**: Backend belum terhubung ke storage engine eksternal. Semua berkas yang diunggah frontend terhenti di layer browser atau base64 string.
- **Kebutuhan Konfigurasi Storage**:
  - Siapkan 3 bucket:
    1. `public-assets`: Bersifat publik untuk logo toko, foto banner gerai, dan foto avatar profil.
    2. `financial-proofs`: Bersifat privat, hanya bisa diunduh oleh pemilik UMKM dan konsultan pendamping yang ditugaskan.
    3. `vdr-vault`: Bersifat sangat rahasia (*highly confidential*). Berisi NIB, Sertifikat Halal, Akta Notaris, dan Rekening Koran 6 Bulan.

#### 5.2 Sistem Generator Signed URL Berbatas Waktu (TTL 60 Menit)
- **Spesifikasi Keamanan Backend**:
  - Dokumen di dalam `vdr-vault` **dilarang keras** memiliki URL publik permanen.
  - Buat endpoint `GET /api/vdr/{businessId}/documents/{docId}/download`:
    1. Periksa apakah user adalah pemilik UMKM, konsultan yang mendampingi, ATAU investor yang memiliki status `access_requests.status = 'APPROVED'`.
    2. Jika sah, backend meminta temporary *Signed URL* dari Supabase/S3 dengan masa berlaku 3.600 detik (1 jam).
    3. Catat aktivitas unduhan ke tabel `vdr_audit_logs` (mencatat Siapa, Kapan, Dokumen Apa, dan Alamat IP) untuk perlindungan hukum pemilik usaha.

---

### Bagian 6: Chat & Negosiasi Deal Real-Time (WebSockets)

#### 6.1 Implementasi WebSocket Gateway (Pusher / Laravel Reverb / Socket.io)
- **Masalah Saat Ini**: Fitur chat di `/dashboard/pesan` dan `/investor/pesan` hanya bekerja menggunakan HTTP request standar (`POST /api/chat/threads/{id}/messages`). Pesan lawan bicara tidak dapat diterima secara langsung tanpa me-refresh halaman.
- **Solusi yang Harus Dibuat**:
  - Pasang **Laravel Reverb** (native Laravel WebSocket) atau gunakan layanan **Pusher Channels**.
  - Siapkan private channel: `private-chat.thread.{threadId}`.
  - Broadcast event `MessageSentEvent` setiap kali ada pesan baru masuk.
  - Frontend mendengarkan event via `laravel-echo` untuk menampilkan bubble chat secara instan, lengkap dengan indikator lawan bicara sedang mengetik (*typing indicator*).

#### 6.2 Dukungan Lampiran Khusus Negosiasi (*Deal Offer Attachments*)
- **Kebutuhan Backend**:
  - Kolom `attachment` pada tabel `chat_messages` harus mendukung format JSON terstruktur:
    - Tipe `DEAL_OFFER`: Menyimpan `{ ticketNominal: 250000000, profitSharePct: 14, tenorMonths: 24, status: 'PROPOSED' | 'ACCEPTED' | 'REJECTED' }`.
    - Tipe `DOCUMENT`: Menyimpan `{ documentId: '...', documentTitle: '...', fileUrl: '...' }`.
    - Tipe `METRIC`: Menyimpan kartu metrik snapshot omzet/margin toko yang dibagikan UMKM ke investor saat percakapan negosiasi berlangsung.

---

### Bagian 7: Notifikasi Terpadu & Event Dispatcher Otomatis

- **Masalah Saat Ini**: Notifikasi yang ada di database saat ini hanya data hasil seeding statis. Backend belum memiliki listener internal yang menembakkan notifikasi saat ada aksi riil di platform.
- **Event-Driven Notification yang Wajib Dibuat di Backend**:
  1. `DailyTransactionRecordedEvent`: Jika ada pemasukan baru, kirim notifikasi ringkasan ke UMKM.
  2. `MonthlyReportSubmittedEvent`: Kirim notifikasi ke konsultan: *"UMKM Kopi Senja Nusantara baru saja mengunggah rekap kas bulan Oktober"*.
  3. `ReportVerifiedEvent`: Kirim notifikasi ke UMKM: *"Buku kas tokomu bulan Oktober telah disahkan oleh Konsultan Dra. Maya Suryani"*.
  4. `InvestorAccessRequestedEvent`: Kirim notifikasi ke UMKM: *"Investor Nusantara Capital mengajukan minat modal Rp 250 Juta"*.
  5. `InvestorAccessApprovedEvent`: Kirim notifikasi ke investor: *"Permohonan akses ruang data Kopi Senja telah disetujui. Akses VDR aktif"*.
  6. `ConsultantAssignedEvent`: Kirim notifikasi ke konsultan dan UMKM saat admin menetapkan penugasan baru.
- **Endpoint Pendukung yang Harus Dibuat**:
  - `PATCH /api/notifications/{id}/read` (Tandai 1 notifikasi sudah dibaca).
  - `PATCH /api/notifications/mark-all-read` (Tandai semua sudah dibaca).
  - `DELETE /api/notifications/{id}` (Hapus notifikasi).

---

### Bagian 8: Portal Administrator Ekosistem (Statistik & Penugasan)

#### 8.1 Agregat Telemetri Platform (`GET /api/admin/stats` - Saat ini 404)
- **Masalah Saat Ini**: Angka statistik pada dashboard admin (`pages/admin/index.vue`) masih berupa data statis buatan (142 Usaha, 28 Konsultan, 38 Usaha Ready for Funding, Dana Modal Tersalurkan Rp 4.2 Miliar).
- **Endpoint yang Harus Dibuat**:
  - `GET /api/admin/stats`:
    - Menghitung secara dinamis dari database:
      - `total_umkm`: `count(users where role = 'UMKM')`
      - `active_consultants`: `count(users where role = 'CONSULTANT' and is_certified = true)`
      - `ready_for_funding`: `count(business_profiles where status = 'READY_FOR_FUNDING')`
      - `total_capital_deployed`: `sum(investment_deals.nominal where status = 'FUNDED')`
      - `npl_ratio`: 0.0% (Tingkat kepatuhan bagi hasil lancar)

#### 8.2 Eksekusi Penugasan Konsultan ke UMKM Baru (`POST /api/admin/assignments`)
- **Masalah Saat Ini**: Di halaman `pages/admin/penugasan.vue`, tombol "Tugaskan Konsultan Sekarang" hanya menjalankan fungsi dummy `setTimeout` selama 1 detik tanpa menyimpan relasi penugasan ke database.
- **Endpoint yang Harus Dibuat**:
  - `POST /api/admin/assignments`:
    - Payload: `{ businessId: "...", consultantId: "...", slaDays: 7, notes: "..." }`
    - Backend memperbarui kolom `consultant_id` pada `business_profiles`.
    - Mengubah status bisnis menjadi `CONSULTANT_ASSIGNED`.
    - Membuat record baru pada tabel `consultant_assignments`.
    - Memicu event notifikasi ke akun konsultan dan UMKM terkait.

---

### Bagian 9: AI Copilot & Deteksi Anomali Finansial (Google Gemini Flash)

Sesuai rancangan pada `docs/API_ENDPOINTS_GUIDE.md` Bab 1.6, platform Beruang mengadopsi model **Google Gemini 1.5 Flash / 2.0 Flash** (gratis via Google AI Studio) dengan metode *Hybrid Rule-Based Filtering*.

- **Kondisi Saat Ini**: Endpoint `/api/consultant/alerts` mengembalikan array kosong `[]`. Tidak ada proses analisis anomali saat laporan bulanan masuk.
- **Alur Backend yang Harus Dibuat**:
  1. Buat Queue Job: `DetectFinancialAnomalyJob` yang dipicu setiap kali endpoint `POST /api/umkm/monthly-reports` berhasil dieksekusi.
  2. Lakukan kalkulasi matematika lokal terlebih dahulu:
     $$\Delta \text{Rasio HPP} = \left(\frac{\text{HPP}_{\text{bulan ini}}}{\text{Omzet}_{\text{bulan ini}}}\right) - \left(\frac{\text{HPP}_{\text{bulan lalu}}}{\text{Omzet}_{\text{bulan lalu}}}\right)$$
  3. Jika $\Delta \text{Rasio HPP} > 8\%$ atau penurunan kas bersih $> 15\%$:
     - Kirim prompt terstruktur ke Google Gemini Flash API:
       *"Analisis mengapa UMKM sektor F&B mengalami lonjakan HPP sebesar X%, dan berikan 3 langkah mitigasi santun bagi konsultan pendamping tanpa kata-kata menakutkan."*
     - Parse JSON respon dari Gemini.
     - Simpan alert ke tabel `anomaly_alerts`:
       `{ business_id, type: 'HPP_SPIKE', severity: 'high', title: '...', message: '...', timestamp }`.
  4. Konsultan akan langsung melihat alert peringatan ini di halaman `pages/konsultan/alert.vue`.

---

## 4. Kebutuhan Skema Database Tambahan (Database Schema Gaps)

Untuk mendukung seluruh fitur di atas, beberapa tabel database pada PostgreSQL/MySQL perlu ditambahkan atau disempurnakan:

```sql
-- 1. Tabel Dokumen Virtual Data Room (VDR)
CREATE TABLE data_room_documents (
    id VARCHAR(36) PRIMARY KEY,
    business_id VARCHAR(36) NOT NULL REFERENCES business_profiles(id) ON DELETE CASCADE,
    title VARCHAR(150) NOT NULL,
    category VARCHAR(50) NOT NULL, -- LEGALITAS, KEUANGAN, OPERASIONAL, PERIZINAN
    file_name VARCHAR(255) NOT NULL,
    file_size VARCHAR(20) NOT NULL,
    storage_path VARCHAR(255) NOT NULL, -- Path privat di Supabase/S3
    is_confidential BOOLEAN DEFAULT TRUE,
    verified_at TIMESTAMP NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. Tabel Permintaan Akses Ruang Data Privat & Investasi
CREATE TABLE access_requests (
    id VARCHAR(36) PRIMARY KEY,
    business_id VARCHAR(36) NOT NULL REFERENCES business_profiles(id) ON DELETE CASCADE,
    investor_id VARCHAR(36) NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    proposed_ticket DECIMAL(15, 2) NOT NULL,
    investment_scheme VARCHAR(50) DEFAULT 'REVENUE_SHARE',
    intro_message TEXT,
    status VARCHAR(20) DEFAULT 'PENDING', -- PENDING, APPROVED, REJECTED
    reviewed_at TIMESTAMP NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 3. Tabel Perjanjian Kontrak Pendampingan Konsultan (MoU)
CREATE TABLE consultant_agreements (
    id VARCHAR(36) PRIMARY KEY,
    consultant_id VARCHAR(36) NOT NULL REFERENCES consultant_profiles(id) ON DELETE CASCADE,
    business_id VARCHAR(36) NOT NULL REFERENCES business_profiles(id) ON DELETE CASCADE,
    monthly_fee DECIMAL(15, 2) NOT NULL,
    duration_months INT NOT NULL DEFAULT 6,
    agreement_text TEXT NOT NULL,
    status VARCHAR(30) DEFAULT 'DRAFT', -- DRAFT, ACTIVE, COMPLETED, TERMINATED
    signed_by_consultant_at TIMESTAMP NULL,
    signed_by_umkm_at TIMESTAMP NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 4. Tabel Alert Deteksi Anomali AI
CREATE TABLE anomaly_alerts (
    id VARCHAR(36) PRIMARY KEY,
    business_id VARCHAR(36) NOT NULL REFERENCES business_profiles(id) ON DELETE CASCADE,
    type VARCHAR(30) NOT NULL, -- HPP_SPIKE, MARGIN_DROP, OPEX_ANOMALY
    severity VARCHAR(10) DEFAULT 'medium', -- low, medium, high
    title VARCHAR(150) NOT NULL,
    message TEXT NOT NULL,
    resolved BOOLEAN DEFAULT FALSE,
    resolved_at TIMESTAMP NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 5. Tabel Watchlist Investor
CREATE TABLE investor_watchlists (
    id VARCHAR(36) PRIMARY KEY,
    investor_id VARCHAR(36) NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    business_id VARCHAR(36) NOT NULL REFERENCES business_profiles(id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(investor_id, business_id)
);

-- 6. Tabel Audit Log Akses VDR
CREATE TABLE vdr_audit_logs (
    id VARCHAR(36) PRIMARY KEY,
    document_id VARCHAR(36) NOT NULL REFERENCES data_room_documents(id) ON DELETE CASCADE,
    user_id VARCHAR(36) NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    ip_address VARCHAR(45),
    action VARCHAR(50) DEFAULT 'DOWNLOAD',
    accessed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

## 5. Rencana Aksi Pengembangan Backend (Prioritized Roadmap)

### 🔴 Prioritas 0 (P0 — Wajib Selesai Sebelum Beta Testing)
*Target: Menghilangkan seluruh error 404 pada alur pengguna dan menutup fungsionalitas inti.*
1. **Perbaiki Rute Alias Finansial Bulanan**: Sambungkan `GET & POST /api/finances/monthly` ke controller laporan bulanan.
2. **Koneksi Cloud Storage (Supabase/S3)**: Implementasikan handler multipart upload untuk berkas laporan kas bulanan, nota transaksi kasir, dan avatar/banner profil.
3. **Selesaikan Endpoint Onboarding Multi-Peran**: Buat `POST /api/onboarding/consultant` dan `POST /api/onboarding/investor`.
4. **Logika Permintaan Bimbingan Konsultan**: Implementasikan `GET /api/consultant/requests`, serta aksi `accept` dan `reject` agar UMKM bisa resmi terhubung ke konsultan pendamping.
5. **Eksekusi Penugasan Konsultan di Admin**: Hubungkan tombol "Tugaskan Konsultan" di `/admin/penugasan` ke endpoint `POST /api/admin/assignments`.
6. **Manajemen Dokumen Legalitas VDR**: Buat endpoint `GET, POST, DELETE /api/umkm/documents` agar data room tidak lagi bergantung pada `localStorage`.

### 🟡 Prioritas 1 (P1 — Validasi, Penilaian, & Pengalaman Transaksional)
*Target: Mengaktifkan seluruh siklus pendampingan konsultan dan kurasi investor.*
1. **Validasi Kas Bulanan Konsultan**: Fungsikan antrean `/api/consultant/validations` agar konsultan bisa mengubah status laporan menjadi `VERIFIED`.
2. **Scoring Radar 5 Aspek**: Izinkan konsultan memperbarui skor diagnostik UMKM via `PUT /api/consultant/clients/{id}/assessment`.
3. **Penerbitan Sertifikat Kelayakan**: Endpoint `POST /api/consultant/clients/{id}/certify` untuk mengubah status UMKM menjadi `READY_FOR_FUNDING`.
4. **Katalog Investor Dinamis**: Buat query database berfilter untuk endpoint `/api/investor/marketplace` dan persistensi bookmark di `/api/investor/watchlist`.
5. **Permintaan Akses VDR oleh Investor**: Alur request tiket modal dan approval UMKM via `/api/investor/requests` dan `/api/umkm/investor-requests/{id}/respond`.
6. **Signed URL Dokumen Rahasia**: Generator link download dokumen VDR dengan masa aktif 1 jam bagi investor yang disetujui.
7. **Statistik Platform Administrator**: Buat endpoint `GET /api/admin/stats` dengan kalkulasi agregat riil dari database.

### 🟢 Prioritas 2 (P2 — Skalabilitas, Otomasi AI, & Kenyamanan Komunikasi)
*Target: Mengoptimalkan performa real-time dan keunggulan teknologi platform.*
1. **Real-Time WebSocket Chat**: Konfigurasi Laravel Reverb / Pusher agar pesan negosiasi deal flow muncul instan tanpa refresh.
2. **AI Anomaly Detection Worker**: Pasang background queue yang mengevaluasi lonjakan HPP $> 8\%$ menggunakan Google Gemini Flash dan mengisi alert di `/api/consultant/alerts`.
3. **WhatsApp OTP Gateway Production**: Integrasikan kredensial Fonnte/Twilio resmi untuk pengiriman kode verifikasi ke nomor handphone pengguna.
4. **Kontrak MoU Digital**: Tabel dan endpoint penyimpanan kontrak bimbingan konsultan dengan audit log tanda tangan digital.
5. **Event-Driven Push Notifications**: Otomatisasi pengiriman notifikasi in-app untuk setiap siklus aktivitas bisnis.
