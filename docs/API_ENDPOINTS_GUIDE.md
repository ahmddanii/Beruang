# Panduan Spesifikasi RESTful API — Platform Beruang (Ber-Uang)
> **Versi Panduan:** 1.0.0  
> **Terakhir Diperbarui:** Oktober 2026  
> **Target Pengembang:** Backend Engineer & Frontend Engineer  
> **Basis Fitur:** Fitur Dashboard UMKM, Portal Konsultan, Social Feed Investor, Chat Deal Room, Virtual Data Room (VDR), dan Admin Matching.

---

## Daftar Isi
1. [Standar & Konvensi Arsitektur API](#1-standar--konvensi-arsitektur-api)
2. [Matriks Otorisasi Berdasarkan Role](#2-matriks-otorisasi-berdasarkan-role)
3. [Daftar Lengkap Endpoint Berdasarkan Modul](#3-daftar-lengkap-endpoint-berdasarkan-modul)
   - [Modul 1: Autentikasi & Akun Pengguna](#modul-1-autentikasi--akun-pengguna)
   - [Modul 2: Onboarding & Profil Usaha](#modul-2-onboarding--profil-usaha)
   - [Modul 3: Buku Kas Harian & Progres Finansial](#modul-3-buku-kas-harian--progres-finansial)
   - [Modul 4: Diagnosis 5 Aspek Fundamental & Radar Kesiapan](#modul-4-diagnosis-5-aspek-fundamental--radar-kesiapan)
   - [Modul 5: Rencana Aksi & Roadmap Perbaikan (Action Plan)](#modul-5-rencana-aksi--roadmap-perbaikan-action-plan)
   - [Modul 6: Gerbang Kelayakan Modal & Sertifikasi (Funding Gate)](#modul-6-gerbang-kelayakan-modal--sertifikasi-funding-gate)
   - [Modul 7: Marketplace Investor & Venture Social Feed](#modul-7-marketplace-investor--venture-social-feed)
   - [Modul 8: Virtual Data Room (VDR) & Permintaan Akses Privat](#modul-8-virtual-data-room-vdr--permintaan-akses-privat)
   - [Modul 9: Percakapan & Negosiasi Deal (Chat System)](#modul-9-percakapan--negosiasi-deal-chat-system)
   - [Modul 10: Notifikasi Platform Terpadu](#modul-10-notifikasi-platform-terpadu)
   - [Modul 11: Supervisi Konsultan & AI Anomaly Alert](#modul-11-supervisi-konsultan--ai-anomaly-alert)
   - [Modul 12: Administrasi Platform & Penugasan Konsultan](#modul-12-administrasi-platform--penugasan-konsultan)
4. [Rekomendasi Skema Database (Prisma Schema Reference)](#4-rekomendasi-skema-database-prisma-schema-reference)

---

## 1. Standar & Konvensi Arsitektur API

### 1.1 Base URL & Versi
Semua endpoint RESTful API menggunakan prefix versi:
```text
https://api.beruang.id/api/v1
```
*(Untuk pengujian lokal: `http://localhost:5000/api/v1`)*

### 1.2 Format Otentikasi
Menggunakan standar **JSON Web Token (JWT)** pada header HTTP:
```http
Authorization: Bearer <access_token>
```

### 1.3 Format Respon Standar

#### Respon Sukses (200 OK / 201 Created)
```json
{
  "success": true,
  "message": "Data berhasil diambil/diperbarui",
  "data": { ... },
  "meta": {
    "page": 1,
    "limit": 20,
    "total": 50,
    "totalPages": 3
  }
}
```

#### Respon Error (400, 401, 403, 404, 422, 500)
```json
{
  "success": false,
  "message": "Penjelasan error yang ramah pengguna",
  "errors": [
    {
      "field": "amount",
      "message": "Nominal kas harian minimal Rp 1.000"
    }
  ]
}
```

### 1.4 Kamus Istilah Baku (Panduan Copywriting Beruang)
Sesuai standar antarmuka Beruang, istilah backend dipetakan secara konsisten ke antarmuka pengguna:
| Istilah Teknis / Database | Istilah Antarmuka Ramah UMKM | Keterangan |
| :--- | :--- | :--- |
| `revenue` / `omzet` | **Uang Masuk / Penjualan** | Menghindari jargon finansial rumit |
| `cogs` / `hpp` | **Modal Jualan / Bahan Baku** | Biaya langsung produksi/jualan |
| `operational_cost` / `opex` | **Biaya Operasional** | Gaji, sewa, listrik, air, perawatan |
| `net_profit` / `laba_bersih` | **Untung Bersih / Kas Bersih** | Sisa kas riil toko |
| `audit` | **Pemeriksaan / Validasi** | Berkesan mendampingi, bukan menakuti |
| `real_time` | **Langsung / Terkini** | Bahasa Indonesia lugas |
| `funding_ticket` | **Tiket Modal Usaha** | Komitmen nominal investasi |

---

### 1.5 Arsitektur Cloud Storage (Supabase Storage)

Penyimpanan berkas gambar, nota transaksi, rekening koran, dan dokumen rahasia Virtual Data Room (VDR) menggunakan **Supabase Storage** (memanfaatkan *Free Tier*: 1 GB penyimpanan, CDN global, dan otentikasi berbasis token).

#### Struktur Bucket Supabase:
1. **`public-assets`** *(Public Read)*:
   - Path: `banners/{businessId}/banner.jpg`
   - Path: `logos/{businessId}/logo.svg`
   - Path: `avatars/{userId}/avatar.png`
   - Akses: Public CDN URL instan tanpa masa kedaluwarsa.
2. **`financial-proofs`** *(Private / Authenticated Read)*:
   - Path: `monthly/{businessId}/{year}_{month}/rekening_koran.pdf`
   - Path: `daily-tx/{businessId}/{date}/nota_{txId}.jpg`
   - Akses: Hanya dapat diunduh oleh pemilik UMKM dan Konsultan pendamping.
3. **`vdr-vault`** *(High-Security Private / Temporary Signed URL)*:
   - Path: `vdr/{businessId}/legalitas/nib_{businessId}.pdf`
   - Path: `vdr/{businessId}/keuangan/mutasi_bank_6bln.pdf`
   - Path: `vdr/{businessId}/operasional/sop_resep.pdf`
   - Akses: **Signed URL dengan TTL (Time-To-Live) 60 Menit**. Investor hanya mendapatkan URL berbatas waktu setelah permohonan akses disetujui (`accessStatus === 'APPROVED'`).

#### Kode Helper Supabase Client (`server/src/services/storageService.ts`):
```typescript
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.SUPABASE_URL || ''
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '' // Gunakan service-role key di backend
export const supabase = createClient(supabaseUrl, supabaseKey)

// 1. Upload Berkas ke Supabase
export async function uploadFileToBucket(bucket: string, path: string, fileBuffer: Buffer, contentType: string) {
  const { data, error } = await supabase.storage.from(bucket).upload(path, fileBuffer, {
    contentType,
    upsert: true
  })
  if (error) throw new Error(`Supabase Storage Upload Error: ${error.message}`)
  return data
}

// 2. Dapatkan Signed URL Sementara untuk Dokumen VDR (Aman, Expire 1 Jam)
export async function getVdrSignedUrl(filePath: string, expiresInSeconds: number = 3600) {
  const { data, error } = await supabase.storage.from('vdr-vault').createSignedUrl(filePath, expiresInSeconds)
  if (error) throw new Error(`Gagal membuat Signed URL: ${error.message}`)
  return data.signedUrl
}
```

---

### 1.6 Arsitektur AI Copilot & Deteksi Anomali Finansial (Google Gemini Flash Free Tier)

Untuk mendeteksi anomali finansial (lonjakan HPP, penurunan margin mendadak, atau deviasi kas) serta merangkai rekomendasi taktis bagi konsultan, platform Beruang mengadopsi model **Google Gemini 1.5 Flash / 2.0 Flash** via [Google AI Studio](https://aistudio.google.com/) (**100% Gratis**: kuota 15 RPM, 1.500 request/hari, latensi sub-detik).

#### Strategi Hybrid Event-Driven (Zero Cost & Hemat Token):
1. **Penyaringan Matematika Lokal (Rule-Based)**: Backend tidak membuang kuota AI untuk kalkulasi angka dasar. Saat UMKM mengirim rekap bulanan, backend membandingkan rasio terhadap bulan sebelumnya:
   - Lonjakan Modal Jualan: $\Delta \text{Rasio HPP} = \left(\frac{\text{HPP}}{\text{Omzet}}\right)_{\text{bulan ini}} - \left(\frac{\text{HPP}}{\text{Omzet}}\right)_{\text{bulan lalu}} > 8\%$
   - Penurunan Margin: $\Delta \text{Margin Bersih} < -12\%$
2. **Eksekusi AI Kondisional**: **Hanya jika** terdeteksi anomali di langkah 1, server memanggil Gemini Flash untuk mengonversi anomali angka menjadi narasi ramah dan langkah mitigasi konkret bagi konsultan.
3. **Penyimpanan Alert**: Hasil analisis AI disimpan ke tabel `AnomalyAlert` dan langsung muncul di `pages/konsultan/alert.vue`.

#### Kode Helper Deteksi Anomali AI (`server/src/services/anomalyService.ts`):
```typescript
import { GoogleGenerativeAI } from '@google/generative-ai'

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '')

export interface AnomalyDetectionResult {
  hasAnomaly: boolean
  type?: 'HPP_SPIKE' | 'MARGIN_DROP' | 'OPEX_ANOMALY'
  severity?: 'high' | 'medium'
  title?: string
  message?: string
}

export async function detectFinancialAnomaly(
  businessName: string,
  sector: string,
  current: { omzet: number; hpp: number; opex: number },
  previous?: { omzet: number; hpp: number; opex: number }
): Promise<AnomalyDetectionResult> {
  if (!previous || previous.omzet <= 0) {
    return { hasAnomaly: false } // Data bulan pertama tidak memiliki pembanding
  }

  const prevHppRatio = (previous.hpp / previous.omzet) * 100
  const curHppRatio = (current.hpp / current.omzet) * 100
  const hppDiff = curHppRatio - prevHppRatio

  // Trigger: Rasio HPP melonjak lebih dari 8% terhadap omzet
  if (hppDiff > 8) {
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' })
    const prompt = `
      Anda adalah AI Financial Analyst untuk platform pendampingan UMKM "Beruang".
      Klien: ${businessName} (Sektor: ${sector})
      Data: Rasio modal jualan (HPP) naik dari ${prevHppRatio.toFixed(1)}% menjadi ${curHppRatio.toFixed(1)}% dari penjualan bulanan (lonjakan +${hppDiff.toFixed(1)}%).
      
      Instruksi:
      1. Berikan penjelasan ringkas (maksimal 3 kalimat) dalam Bahasa Indonesia yang santun, profesional, dan solutif untuk konsultan pendamping.
      2. Jangan gunakan jargon menakutkan seperti 'kebangkrutan' atau 'fraud'. Fokus pada evaluasi efisiensi resep bahan baku atau negosiasi ulang harga pemasok.
      3. Format output wajib JSON persis:
      {
        "title": "Lonjakan Rasio Modal Jualan (+${hppDiff.toFixed(1)}%)",
        "message": "isi rekomendasi naratif di sini"
      }
    `

    const response = await model.generateContent({
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
      generationConfig: { responseMimeType: 'application/json' }
    })

    const parsed = JSON.parse(response.response.text())
    return {
      hasAnomaly: true,
      type: 'HPP_SPIKE',
      severity: hppDiff > 15 ? 'high' : 'medium',
      title: parsed.title,
      message: parsed.message
    }
  }

  return { hasAnomaly: false }
}
```

---

## 2. Matriks Otorisasi Berdasarkan Role

Platform Beruang memiliki 4 peran pengguna (*RBAC*):
1. **`UMKM`**: Pengusaha pemilik toko/usaha mikro-kecil-menengah.
2. **`CONSULTANT`**: Pendamping bisnis terverifikasi yang menilai, memvalidasi kas, dan mensertifikasi UMKM.
3. **`INVESTOR`**: Angel investor atau representasi sindikasi pendanaan yang mencari UMKM terkurasi.
4. **`ADMIN`**: Tim operasi Beruang yang mengelola akun dan memetakan penugasan konsultan.

| Modul | UMKM | CONSULTANT | INVESTOR | ADMIN |
| :--- | :---: | :---: | :---: | :---: |
| Auth & Profil Sendiri | ✅ | ✅ | ✅ | ✅ |
| Onboarding & Profil Usaha | ✅ (Milik Sendiri) | 👁️ (Klien) | 👁️ (Publik) | ✅ (Semua) |
| Catatan Kas Harian & Progres | ✅ (Kelola) | 👁️ + Validasi | 🔒 (Hanya VDR Approved) | ✅ |
| 5 Aspek Radar Assessment | 👁️ (Hasil) | ✍️ (Input/Edit) | 👁️ (Skor Ringkas) | ✅ |
| Rencana Aksi (Action Plan) | ✅ (Eksekusi) | ✍️ (Buat/Verifikasi) | 🔒 | ✅ |
| Sertifikasi "Ready for Funding" | 👁️ (Status) | ✍️ (Menerbitkan) | 👁️ (Katalog) | ✅ |
| Marketplace & Watchlist | ❌ | ❌ | ✅ | ✅ |
| Pengajuan Akses VDR | ✍️ (Terima/Tolak) | 👁️ | ✍️ (Mengajukan) | ✅ |
| Dokumen VDR Ber-watermark | ✅ (Upload) | 👁️ (Supervisi) | 👁️ (Jika Approved) | ✅ |
| Negosiasi Chat & Deal | ✅ (Dengan Inv) | 🔒 | ✅ (Dengan UMKM) | 👁️ (Audit) |
| Notifikasi | ✅ | ✅ | ✅ | ✅ |
| Penugasan Konsultan | ❌ | ❌ | ❌ | ✅ |

---

## 3. Daftar Lengkap Endpoint Berdasarkan Modul

---

### Modul 1: Autentikasi & Akun Pengguna
> **Kaitan Halaman Nuxt:**  
> - `pages/masuk.vue`  
> - `pages/daftar.vue`  
> - `pages/lupa-password.vue`  
> - `pages/profile.vue` & `pages/dashboard/profile.vue`  
> - `stores/auth.ts`

#### 1. Registrasi Akun Baru
- **Endpoint:** `POST /api/v1/auth/register`
- **Auth:** Public
- **Request Body:**
  ```json
  {
    "name": "Fikri Setiawan",
    "email": "fikri@kopisenja.id",
    "password": "PasswordAman123!",
    "role": "UMKM", // "UMKM" | "CONSULTANT" | "INVESTOR"
    "phone": "081234567890",
    "businessName": "Kopi Senja Nusantara" // Opsional untuk UMKM/Konsultan/Investor
  }
  ```
- **Response (201 Created):**
  ```json
  {
    "success": true,
    "message": "Pendaftaran berhasil. Silakan cek email untuk verifikasi.",
    "data": {
      "userId": "usr-01",
      "email": "fikri@kopisenja.id",
      "role": "UMKM"
    }
  }
  ```

#### 2. Masuk Akun (Login)
- **Endpoint:** `POST /api/v1/auth/login`
- **Auth:** Public
- **Request Body:**
  ```json
  {
    "email": "fikri@kopisenja.id",
    "password": "PasswordAman123!"
  }
  ```
- **Response (200 OK):**
  ```json
  {
    "success": true,
    "message": "Login berhasil",
    "data": {
      "token": "eyJhbGciOiJIUzI1NiIs...",
      "user": {
        "id": "usr-01",
        "name": "Fikri Setiawan",
        "email": "fikri@kopisenja.id",
        "role": "UMKM",
        "avatar": "/images/user-profile.png",
        "businessName": "Kopi Senja Nusantara",
        "phone": "081234567890",
        "verified": true
      }
    }
  }
  ```

#### 3. Dapatkan Data Sesi Pengguna Login
- **Endpoint:** `GET /api/v1/auth/me`
- **Auth:** `Bearer Token` (Semua Role)
- **Response (200 OK):** Profil lengkap pengguna saat ini.

#### 4. Keluar Akun (Logout)
- **Endpoint:** `POST /api/v1/auth/logout`
- **Auth:** `Bearer Token`

#### 5. Permintaan Lupa Password & Reset
- **Endpoint:** `POST /api/v1/auth/forgot-password` (Body: `{ "email": "..." }`)
- **Endpoint:** `POST /api/v1/auth/reset-password` (Body: `{ "token": "...", "newPassword": "..." }`)

#### 6. Perbarui Profil Pribadi & Foto Avatar
- **Endpoint:** `PUT /api/v1/users/profile`
- **Endpoint:** `POST /api/v1/users/avatar` (Multipart `form-data`, file image maks 2MB)
- **Endpoint:** `PUT /api/v1/users/security/password` (Ganti sandi lama ke baru)

---

### Modul 2: Onboarding & Profil Usaha
> **Kaitan Halaman Nuxt:**  
> - `pages/onboarding.vue` (Wizard 4 Langkah)  
> - `pages/dashboard/profil-publik.vue` & `pages/dashboard/profile.vue`  
> - `stores/umkm.ts`

#### 1. Simpan Data Formulir Onboarding UMKM (4 Langkah)
- **Endpoint:** `POST /api/v1/umkm/onboarding`
- **Auth:** `Bearer Token` (Role: `UMKM`)
- **Request Body:**
  ```json
  {
    "brandName": "Kopi Senja Nusantara",
    "ownerName": "Fikri Setiawan",
    "establishedYear": 2021,
    "legalStatus": "HALAL_READY", // "NIB_READY" | "HALAL_READY" | "IN_PROGRESS" | "NONE"
    "sector": "Kuliner & Minuman (F&B)",
    "city": "Bandung, Jawa Barat",
    "outletsCount": 3,
    "employeesCount": 14,
    "monthlyRevenueBaseline": 50000000,
    "monthlyCogsBaseline": 24000000,
    "fundingTarget": 250000000,
    "fundingScheme": "REVENUE_SHARE", // "REVENUE_SHARE" | "PERFORMANCE_LOAN" | "EQUITY"
    "pitchSummary": "Spesialis kopi susu gula aren dengan 3 outlet aktif di Bandung & margin stabil di atas 48%."
  }
  ```
- **Response (201 Created):**
  Mengembalikan objek profil bisnis baru dengan status `CONSULTANT_ASSIGNMENT_PENDING`.

#### 2. Dapatkan Detail Profil Usaha Sendiri
- **Endpoint:** `GET /api/v1/umkm/profile`
- **Auth:** `Bearer Token` (Role: `UMKM`)
- **Response (200 OK):**
  Detail data toko: nama, sektor, kota, NIB, NPWP, jumlah outlet, target modal, logo, banner, status kesiapan, nama konsultan pendamping.

#### 3. Perbarui Data Profil Usaha & Banner
- **Endpoint:** `PUT /api/v1/umkm/profile`
  - Body: `{ "name", "pitchSummary", "description", "outletsCount", "employeesCount", "fundingTarget", "nib", "npwp" }`
- **Endpoint:** `POST /api/v1/umkm/profile/banner` (Upload file banner gerai)
- **Endpoint:** `POST /api/v1/umkm/profile/logo` (Upload file logo brand toko)

#### 4. Dapatkan Tampilan Profil Publik Toko (Katalog)
- **Endpoint:** `GET /api/v1/umkm/public-profile/:businessId`
- **Auth:** Public / Bearer Token
- **Keterangan:** Mengembalikan data ringkas tanpa informasi rekening/pembukuan rahasia.

---

### Modul 3: Buku Kas Harian & Progres Finansial
> **Kaitan Halaman Nuxt:**  
> - `pages/dashboard/progres.vue` (4 Stat Bento, Drawer Catat Kas, Riwayat Mutasi, Rekap Bulanan)  
> - `stores/umkm.ts`

#### 1. Dapatkan Ringkasan Saldo & Metrik Keuangan Terkini
- **Endpoint:** `GET /api/v1/finances/summary`
- **Auth:** `Bearer Token` (Role: `UMKM`, `CONSULTANT`)
- **Response (200 OK):**
  ```json
  {
    "success": true,
    "data": {
      "cashBalance": 75500000,
      "totalIncomeMonth": 54200000,
      "totalCogsMonth": 23400000, // Modal Jualan
      "totalOpexMonth": 13150000, // Biaya Operasional
      "netProfitMonth": 17650000, // Untung Bersih
      "marginPercentage": 43.1,
      "marginStatus": "SEHAT" // "SEHAT" | "WASPADA" | "KRITIS"
    }
  }
  ```

#### 2. Dapatkan Riwayat Catatan Kas Harian (Mutasi Kasir)
- **Endpoint:** `GET /api/v1/finances/daily`
- **Auth:** `Bearer Token` (Role: `UMKM`, `CONSULTANT`)
- **Query Params:**
  - `page`: default `1`
  - `limit`: default `20`
  - `category`: `ALL` | `PEMASUKAN` | `MODAL_JUALAN` | `OPERASIONAL`
  - `startDate`: `2026-10-01`
  - `endDate`: `2026-10-31`
- **Response (200 OK):**
  ```json
  {
    "success": true,
    "data": [
      {
        "id": "tx-01",
        "date": "2026-10-15T10:00:00Z",
        "title": "Penjualan Kasir POS Shift Pagi (3 Gerai)",
        "category": "PEMASUKAN",
        "amount": 3450000,
        "paymentMethod": "QRIS", // "QRIS" | "TRANSFER" | "TUNAI"
        "status": "VERIFIED", // "VERIFIED" | "PENDING"
        "receiptNumber": "INV/20261015/POS/091",
        "notes": "Rekap harian QRIS Mandiri & BCA"
      }
    ]
  }
  ```

#### 3. Tambah Catatan Kas Harian Baru (+ Catat Kas)
- **Endpoint:** `POST /api/v1/finances/daily`
- **Auth:** `Bearer Token` (Role: `UMKM`)
- **Request Body:**
  ```json
  {
    "date": "2026-10-15",
    "title": "Beli Bahan Baku Kopi & Susu Segar",
    "category": "MODAL_JUALAN", // "PEMASUKAN" | "MODAL_JUALAN" | "OPERASIONAL"
    "amount": 1250000,
    "paymentMethod": "TRANSFER",
    "notes": "Pembelian 20 kg arabika dari supplier Lembang",
    "receiptNumber": "NOTA-SP-8821"
  }
  ```

#### 4. Hapus Catatan Kas Harian
- **Endpoint:** `DELETE /api/v1/finances/daily/:transactionId`
- **Auth:** `Bearer Token` (Role: `UMKM`)

#### 5. Dapatkan Riwayat Laporan Keuangan Bulanan
- **Endpoint:** `GET /api/v1/finances/monthly`
- **Auth:** `Bearer Token` (Role: `UMKM`, `CONSULTANT`)
- **Response (200 OK):**
  Daftar riwayat per bulan (Januari - September 2026) mencakup `omzet`, `hpp`, `opex`, `netProfit`, `cashBalance`, `status: "VERIFIED" | "PENDING" | "REJECTED"`, dan bendera anomali AI.

#### 6. Ajukan Rekapitulasi Keuangan Bulanan (+ Unggah Bukti Rekening Koran)
- **Endpoint:** `POST /api/v1/finances/monthly`
- **Auth:** `Bearer Token` (Role: `UMKM`)
- **Request Body (Multipart Form-Data):**
  - `month`: `"September"`
  - `year`: `2026`
  - `omzet`: `54200000`
  - `hpp`: `23400000`
  - `opex`: `13150000`
  - `proofDocument`: File PDF/Image rekening koran bank atau laporan mPOS.
  - `notes`: Catatan pelaporan.

#### 7. Unduh Berkas Buku Kas Resmi (PDF)
- **Endpoint:** `GET /api/v1/finances/export-pdf`
- **Auth:** `Bearer Token` (Role: `UMKM`, `CONSULTANT`, `INVESTOR_APPROVED`)
- **Response:** Streaming Binary File (`application/pdf`) dengan layout resmi kop Beruang.

---

### Modul 4: Diagnosis 5 Aspek Fundamental & Radar Kesiapan
> **Kaitan Halaman Nuxt:**  
> - `pages/dashboard/penilaian.vue`  
> - `pages/konsultan/klien/[id]/penilaian.vue`  
> - `stores/umkm.ts`

#### 1. Dapatkan Skor Diagnosis 5 Aspek (Data Radar Chart)
- **Endpoint:** `GET /api/v1/assessments/my`
- **Auth:** `Bearer Token` (Role: `UMKM`)
- **Response (200 OK):**
  ```json
  {
    "success": true,
    "data": {
      "overallHealthScore": 79,
      "grade": "Grade A (Siap Kemitraan)",
      "certifiedAt": "18 September 2026",
      "consultantName": "Dra. Maya Suryani, M.M.",
      "aspects": [
        {
          "id": "fin",
          "name": "Finansial & Arus Kas",
          "score": 78,
          "maxScore": 100,
          "targetScore": 85,
          "status": "good", // "good" | "warning" | "needs_work"
          "notes": "Margin kotor di atas 45%, disiplin pelaporan harian membaik."
        },
        {
          "id": "ops",
          "name": "Operasional & SOP",
          "score": 85,
          "maxScore": 100,
          "targetScore": 80,
          "status": "good",
          "notes": "SOP resep dan kartu stok mingguan sudah berjalan rutin."
        },
        {
          "id": "mkt",
          "name": "Pasar & Pemasaran",
          "score": 64,
          "maxScore": 100,
          "targetScore": 75,
          "status": "warning",
          "notes": "Perlu diversifikasi promosi di luar platform diskon ojek online."
        },
        {
          "id": "leg",
          "name": "Legalitas & Izin",
          "score": 92,
          "maxScore": 100,
          "targetScore": 90,
          "status": "good",
          "notes": "NIB RBA aktif, sertifikat Halal BPJPH terbit."
        },
        {
          "id": "gov",
          "name": "Tim & Tata Kelola",
          "score": 75,
          "maxScore": 100,
          "targetScore": 80,
          "status": "good",
          "notes": "Struktur Store Leader jelas dan insentif berbasis target."
        }
      ]
    }
  }
  ```

#### 2. Dapatkan Skor Diagnosis Klien (Konsultan View)
- **Endpoint:** `GET /api/v1/assessments/client/:clientId`
- **Auth:** `Bearer Token` (Role: `CONSULTANT`, `ADMIN`)

#### 3. Simpan / Perbarui Hasil Audit Skor 5 Aspek Klien
- **Endpoint:** `PUT /api/v1/assessments/client/:clientId`
- **Auth:** `Bearer Token` (Role: `CONSULTANT`)
- **Request Body:**
  ```json
  {
    "aspectScores": [
      { "aspectId": "fin", "score": 82, "notes": "Margin kian sehat setelah audit supplier." },
      { "aspectId": "ops", "score": 85, "notes": "SOP berjalan tertib." },
      { "aspectId": "mkt", "score": 70, "notes": "Mulai promosi kemitraan korporasi." },
      { "aspectId": "leg", "score": 92, "notes": "Sempurna." },
      { "aspectId": "gov", "score": 78, "notes": "Rekrutmen supervisor tuntas." }
    ]
  }
  ```

#### 4. Unduh Berkas Rapor Kesiapan Usaha (PDF)
- **Endpoint:** `GET /api/v1/assessments/report-pdf`
- **Auth:** `Bearer Token` (Role: `UMKM`, `CONSULTANT`)

---

### Modul 5: Rencana Aksi & Roadmap Perbaikan (Action Plan)
> **Kaitan Halaman Nuxt:**  
> - `pages/dashboard/rencana-aksi.vue`  
> - `stores/umkm.ts`

#### 1. Dapatkan Daftar Tahapan (Milestones) & Tugas Rencana Aksi
- **Endpoint:** `GET /api/v1/action-plans`
- **Auth:** `Bearer Token` (Role: `UMKM`, `CONSULTANT`)
- **Response (200 OK):**
  ```json
  {
    "success": true,
    "data": {
      "milestones": [
        { "id": "m1", "order": 1, "title": "Fondasi Pencatatan & Legalitas", "description": "Standardisasi rekening usaha, NIB, dan kartu stok" },
        { "id": "m2", "order": 2, "title": "Efisiensi Biaya & HPP", "description": "Negosiasi supplier bahan baku dan pengendalian efisiensi produksi" },
        { "id": "m3", "order": 3, "title": "Validasi & Sertifikasi Investor", "description": "3 bulan pelaporan bersih dan audit kesiapan pendanaan" }
      ],
      "tasks": [
        {
          "id": "t-1",
          "milestoneId": "m1",
          "title": "Pisahkan Rekening Pribadi dan Usaha",
          "description": "Buka rekening giro khusus operasional warung dan integrasikan mutasi kas.",
          "category": "Finansial",
          "completed": true,
          "dueDate": "10 Juli 2026",
          "consultantNote": "Terverifikasi per rekening koran Bank Mandiri."
        }
      ]
    }
  }
  ```

#### 2. Tambah Tugas Baru pada Rencana Aksi
- **Endpoint:** `POST /api/v1/action-plans/tasks`
- **Auth:** `Bearer Token` (Role: `CONSULTANT`, `UMKM`)
- **Request Body:**
  ```json
  {
    "milestoneId": "m2",
    "title": "Perbarui Kontrak Supplier Bahan Baku & Kemasan",
    "description": "Kunci harga bahan baku 6 bulan ke depan untuk cegah lonjakan modal produksi.",
    "category": "Finansial", // "Finansial" | "Operasional" | "Pemasaran" | "Legalitas" | "Tata Kelola"
    "dueDate": "2026-11-15",
    "priority": "Tinggi"
  }
  ```

#### 3. Tandai Status Selesai Tugas (Checklist Toggle)
- **Endpoint:** `PATCH /api/v1/action-plans/tasks/:taskId/toggle`
- **Auth:** `Bearer Token` (Role: `UMKM`, `CONSULTANT`)

#### 4. Unggah Bukti Penyelesaian Tugas (Evidence)
- **Endpoint:** `POST /api/v1/action-plans/tasks/:taskId/evidence`
- **Auth:** `Bearer Token` (Role: `UMKM`)
- **Request Body (Multipart Form-Data):** File bukti (foto SOP, foto rekening baru, dokumen kontrak) & catatan.

#### 5. Berikan Catatan Evaluasi Konsultan pada Tugas
- **Endpoint:** `PATCH /api/v1/action-plans/tasks/:taskId/feedback`
- **Auth:** `Bearer Token` (Role: `CONSULTANT`)
- **Request Body:** `{ "consultantNote": "Terverifikasi via mutasi bank..." }`

---

### Modul 6: Gerbang Kelayakan Modal & Sertifikasi (Funding Gate)
> **Kaitan Halaman Nuxt:**  
> - `pages/dashboard/pendanaan.vue` (Gate Checklist 4/4, Kalkulator Simulasi)  
> - `pages/konsultan/klien/[id]/sertifikasi.vue`  
> - `stores/umkm.ts`

#### 1. Cek Status Kelulusan 4 Syarat Gerbang Pendanaan (Funding Readiness Gate)
- **Endpoint:** `GET /api/v1/funding-gate/status`
- **Auth:** `Bearer Token` (Role: `UMKM`, `CONSULTANT`)
- **Response (200 OK):**
  ```json
  {
    "success": true,
    "data": {
      "status": "READY_FOR_FUNDING", // "DRAFT" | "IN_REVIEW" | "READY_FOR_FUNDING"
      "isAllPassed": true,
      "passedGatesCount": 4,
      "totalGates": 4,
      "gates": [
        {
          "key": "assessment_score",
          "title": "Skor Fundamental Bisnis",
          "passed": true,
          "current": 79,
          "required": 75,
          "notes": "Skor komposit telah melampaui batas ambang minimum 75"
        },
        {
          "key": "reporting_history",
          "title": "Disiplin Pencatatan Kas Bulanan",
          "passed": true,
          "current": 4,
          "required": 3,
          "notes": "Minimal 3 bulan pelaporan kas rutin terverifikasi konsultan"
        },
        {
          "key": "action_plan_completion",
          "title": "Penyelesaian Rencana Aksi",
          "passed": true,
          "current": 83,
          "required": 75,
          "notes": "Persentase penyelesaian roadmap langkah perbaikan di atas 75%"
        },
        {
          "key": "legal_compliance",
          "title": "Kepatuhan Legalitas Dasar",
          "passed": true,
          "current": 92,
          "required": 80,
          "notes": "NIB RBA dan izin edar/halal telah dinyatakan valid"
        }
      ]
    }
  }
  ```

#### 2. Terbitkan Sertifikasi "Ready for Funding" (Oleh Konsultan)
- **Endpoint:** `POST /api/v1/funding-gate/certify/:clientId`
- **Auth:** `Bearer Token` (Role: `CONSULTANT`)
- **Request Body:**
  ```json
  {
    "statementTransparency": true,
    "statementLegal": true,
    "statementRationalPlan": true,
    "recommendedFundingTicket": 250000000,
    "expectedPaybackNote": "Payback 18-24 bulan, Bagi hasil 14% p.a."
  }
  ```

#### 3. Kalkulator Simulasi Akses Modal (Perhitungan Proyeksi)
- **Endpoint:** `POST /api/v1/funding-gate/simulate`
- **Auth:** `Bearer Token` (Public / User)
- **Request Body:**
  ```json
  {
    "ticketAmount": 250000000,
    "scheme": "REVENUE_SHARE",
    "profitSharePercentage": 14,
    "tenorMonths": 24,
    "projectedMonthlyRevenue": 65000000
  }
  ```
- **Response (200 OK):**
  Mengembalikan proyeksi bagi hasil bulanan, estimasi total imbal hasil investor, dan dampak kas toko.

#### 4. Unduh Proposal Usaha Resmi & Kemitraan (PDF)
- **Endpoint:** `GET /api/v1/funding-gate/proposal-pdf`
- **Auth:** `Bearer Token` (Role: `UMKM`, `INVESTOR_APPROVED`)

---

### Modul 7: Marketplace Investor & Venture Social Feed
> **Kaitan Halaman Nuxt:**  
> - `pages/investor/index.vue` (Instagram-Style Venture Social Feed, Story Bar Sektor, Filter Tiket)  
> - `pages/investor/watchlist.vue`  
> - `stores/investor.ts`

#### 1. Dapatkan Feed Katalog UMKM Terkurasi (Marketplace Feed)
- **Endpoint:** `GET /api/v1/investor/marketplace`
- **Auth:** `Bearer Token` (Role: `INVESTOR`, `ADMIN`)
- **Query Params:**
  - `search`: Kata kunci nama usaha, kota, atau produk
  - `sector`: `ALL` | `F&B` | `FMCG` | `AGRO` | `FASHION` | `JASA`
  - `city`: `ALL` | Nama kota
  - `minMargin`: Minimal margin kotor (contoh `40`)
  - `ticketSize`: `ALL` | `UNDER_250M` | `250M_500M` | `OVER_500M`
  - `page`: default `1`, `limit`: default `10`
- **Response (200 OK):**
  ```json
  {
    "success": true,
    "data": [
      {
        "id": "umkm-01",
        "code": "BERU-KOP-01",
        "name": "Kopi Senja Nusantara",
        "sector": "F&B (Coffee & Drinks)",
        "city": "Bandung",
        "establishedYear": 2021,
        "fundingTarget": 250000000,
        "marginPercentage": 48.5,
        "growthYoY": 34.2,
        "healthScore": 79,
        "certifiedAt": "18 Sep 2026",
        "consultantName": "Dra. Maya Suryani, M.M.",
        "pitchSummary": "Spesialis kopi arabika-robusta dengan 3 gerai offline di Bandung. Margin kotor konsisten di atas 48% dengan SOP barista standar.",
        "tags": ["F&B", "Ready for Funding", "Margin >45%", "Halal"],
        "accessStatus": "APPROVED", // "NONE" | "PENDING" | "APPROVED" | "REJECTED"
        "bookmarked": true
      }
    ]
  }
  ```

#### 2. Toggle Bookmark Simpan ke Watchlist Investor
- **Endpoint:** `POST /api/v1/investor/watchlist/:businessId`
- **Auth:** `Bearer Token` (Role: `INVESTOR`)
- **Response (200 OK):** `{ "bookmarked": true }`

#### 3. Dapatkan Daftar Watchlist Pribadi Investor
- **Endpoint:** `GET /api/v1/investor/watchlist`
- **Auth:** `Bearer Token` (Role: `INVESTOR`)

---

### Modul 8: Virtual Data Room (VDR) & Permintaan Akses Privat
> **Kaitan Halaman Nuxt:**  
> - `pages/investor/data-room/[id].vue` (Watermark Otomatis AES-256, Pembagian Kategori Dokumen)  
> - `pages/investor/umkm/[id]/ajukan-akses.vue`  
> - `pages/dashboard/pendanaan.vue` (Tab Permintaan Investor)  
> - `stores/umkm.ts` & `stores/investor.ts`

#### 1. Investor Mengajukan Izin Akses Data Room Privat
- **Endpoint:** `POST /api/v1/data-room/requests`
- **Auth:** `Bearer Token` (Role: `INVESTOR`)
- **Request Body:**
  ```json
  {
    "businessId": "umkm-01",
    "proposedTicket": 250000000,
    "scheme": "REVENUE_SHARE", // "REVENUE_SHARE" | "PERFORMANCE_LOAN" | "EQUITY"
    "introMessage": "Kami dari Nusantara Angel Syndicate telah meninjau profil Kopi Senja dan tertarik menjajaki modal kerja pembukaan gerai baru.",
    "ndaAgreed": true
  }
  ```
- **Response (201 Created):**
  Mengembalikan ID permohonan dengan status `"PENDING"` dan otomatis mentrigger notifikasi prioritas tinggi ke WhatsApp & dashboard pemilik UMKM.

#### 2. UMKM Melihat Antrean Permintaan Akses Masuk
- **Endpoint:** `GET /api/v1/data-room/requests/incoming`
- **Auth:** `Bearer Token` (Role: `UMKM`)
- **Response (200 OK):**
  Daftar permohonan dari investor berisi nama investor, lembaga sindikasi, tiket yang diajukan, pesan perkenalan, dan tanggal pengajuan.

#### 3. UMKM Menyetujui atau Menolak Permintaan Investor
- **Endpoint:** `PATCH /api/v1/data-room/requests/:requestId`
- **Auth:** `Bearer Token` (Role: `UMKM`)
- **Request Body:**
  ```json
  {
    "status": "APPROVED" // "APPROVED" | "REJECTED"
  }
  ```

#### 4. Buka Berkas Virtual Data Room (VDR) Berizin
- **Endpoint:** `GET /api/v1/data-room/:businessId`
- **Auth:** `Bearer Token` (Role: `INVESTOR`, `UMKM`, `CONSULTANT`)
- **Aturan Otorisasi:**
  Jika pemanggil adalah Investor dan status akses `!= APPROVED`, server wajib me-return **`403 Forbidden`** dengan pesan `"Data Room Privat Terkunci. Silakan ajukan izin akses terlebih dahulu."`
- **Response (200 OK jika APPROVED):**
  ```json
  {
    "success": true,
    "data": {
      "businessId": "umkm-01",
      "businessName": "Kopi Senja Nusantara",
      "accessExpiry": "2026-11-20T23:59:59Z",
      "watermarkText": "RAHASIA • DILINDUNGI HUKUM BERUANG • Hendro Wicaksono (hendro@nusantaraventures.com) • AUDIT LOG: SEC-umkm-01-8921",
      "categories": [
        {
          "name": "Legalitas & Perizinan",
          "documents": [
            { "id": "doc-01", "title": "NIB Berbasis Risiko OSS", "size": "1.8 MB", "category": "Legalitas", "verified": true },
            { "id": "doc-02", "title": "Sertifikat Halal BPJPH", "size": "2.1 MB", "category": "Legalitas", "verified": true }
          ]
        },
        {
          "name": "Keuangan & Mutasi Rekening",
          "documents": [
            { "id": "doc-03", "title": "Mutasi Rekening Giro 6 Bulan", "size": "4.2 MB", "category": "Keuangan", "verified": true },
            { "id": "doc-04", "title": "Rekonsiliasi Kasir POS Harian", "size": "3.5 MB", "category": "Keuangan", "verified": true }
          ]
        },
        {
          "name": "Operasional & Kontrak",
          "documents": [
            { "id": "doc-05", "title": "SOP Barista & Resep Minuman", "size": "2.7 MB", "category": "Operasional", "verified": true },
            { "id": "doc-06", "title": "Surat Perjanjian Sewa 3 Gerai", "size": "3.1 MB", "category": "Operasional", "verified": true }
          ]
        }
      ]
    }
  }
  ```

#### 5. Streaming Dokumen VDR dengan Watermark Keamanan Dinamis
- **Endpoint:** `GET /api/v1/data-room/:businessId/documents/:docId/view`
- **Auth:** `Bearer Token` (Role: `INVESTOR_APPROVED`)
- **Keterangan:** Server membubuhkan stempel watermark dinamis transparan berisi nama & email investor pada setiap lembar dokumen PDF untuk mencegah kebocoran data.

---

### Modul 9: Percakapan & Negosiasi Deal (Chat System)
> **Kaitan Halaman Nuxt:**  
> - `pages/dashboard/pesan.vue` (Split view thread list + chat panel)  
> - `pages/investor/pesan.vue`  
> - `stores/chat.ts`

#### 1. Dapatkan Daftar Thread Obrolan Aktif
- **Endpoint:** `GET /api/v1/chat/threads`
- **Auth:** `Bearer Token` (Role: `UMKM`, `INVESTOR`)
- **Response (200 OK):**
  Daftar percakapan aktif berisi lawan bicara, pesan terakhir, badge belum dibaca (`unreadCount`), dan status tiket deal yang sedang dibahas.

#### 2. Dapatkan Riwayat Pesan dalam Thread
- **Endpoint:** `GET /api/v1/chat/threads/:threadId/messages`
- **Auth:** `Bearer Token`
- **Response (200 OK):**
  ```json
  {
    "success": true,
    "data": [
      {
        "id": "m-01",
        "senderRole": "INVESTOR",
        "senderName": "Hendro Wicaksono",
        "text": "Halo Mbak Dian, salam kenal. Kami dari Nusantara Angel Syndicate...",
        "timestamp": "09:45"
      },
      {
        "id": "m-02",
        "senderRole": "UMKM",
        "senderName": "Dian Sasmita",
        "text": "Halo Pak Hendro! Berikut kami lampirkan ringkasan proposal ekspansi gerai.",
        "timestamp": "09:58",
        "attachment": {
          "type": "METRIC", // "METRIC" | "DOCUMENT" | "DEAL_OFFER"
          "title": "Proposal Tiket Modal Kerja",
          "subtitle": "Kopi Senja Nusantara • Skema Bagi Hasil 14% p.a.",
          "value": "Rp 250.000.000"
        }
      }
    ]
  }
  ```

#### 3. Kirim Pesan Teks & Lampiran Tiket Deal
- **Endpoint:** `POST /api/v1/chat/threads/:threadId/messages`
- **Auth:** `Bearer Token`
- **Request Body:**
  ```json
  {
    "text": "Terima kasih atas diskusinya. Kami setujui draft term sheet Rp 250 Juta.",
    "attachment": {
      "type": "DEAL_OFFER",
      "title": "Draft Kesepakatan Awal",
      "subtitle": "Bagi Hasil 14% • Tenor 24 Bulan",
      "value": "Rp 250.000.000"
    }
  }
  ```

#### 4. Tandai Seluruh Pesan dalam Thread Telah Dibaca
- **Endpoint:** `PATCH /api/v1/chat/threads/:threadId/read`
- **Auth:** `Bearer Token`

#### 5. Protokol WebSocket untuk Live Chatting
- **Protocol:** `WSS`
- **URL:** `wss://api.beruang.id/ws/chat?token=<jwt_token>`
- **Events:**
  - `chat:send` (Client -> Server)
  - `chat:receive` (Server -> Client)
  - `chat:typing` & `chat:read_receipt`

---

### Modul 10: Notifikasi Platform Terpadu
> **Kaitan Halaman Nuxt:**  
> - `pages/dashboard/notifikasi.vue` (Header editorial banner, tab kategori, pill stat counter)  
> - `stores/notification.ts`

#### 1. Dapatkan Daftar Notifikasi Pengguna
- **Endpoint:** `GET /api/v1/notifications`
- **Auth:** `Bearer Token` (Semua Role)
- **Query Params:**
  - `category`: `ALL` | `KONSULTAN` | `INVESTOR` | `KESEHATAN` | `KAS` | `AKSI`
  - `isRead`: `true` | `false` | `all`
  - `search`: Kata kunci pencarian
- **Response (200 OK):**
  ```json
  {
    "success": true,
    "data": {
      "unreadCount": 3,
      "notifications": [
        {
          "id": "notif-umkm-1",
          "title": "Catatan Kas Mingguan Tervalidasi",
          "message": "Dra. Maya Suryani telah memvalidasi laporan pergerakan uang tokomu minggu ini.",
          "category": "KONSULTAN",
          "priority": "HIGH", // "HIGH" | "NORMAL"
          "isRead": false,
          "link": "/dashboard/progres",
          "actionLabel": "Lihat Catatan Kas",
          "createdAt": "2026-10-20T10:15:00Z"
        }
      ]
    }
  }
  ```

#### 2. Tandai 1 Notifikasi Dibaca
- **Endpoint:** `PATCH /api/v1/notifications/:notificationId/read`
- **Auth:** `Bearer Token`

#### 3. Tandai Semua Notifikasi Dibaca
- **Endpoint:** `PATCH /api/v1/notifications/mark-all-read`
- **Auth:** `Bearer Token`

#### 4. Hapus Notifikasi
- **Endpoint:** `DELETE /api/v1/notifications/:notificationId`
- **Auth:** `Bearer Token`

---

### Modul 11: Supervisi Konsultan & AI Anomaly Alert
> **Kaitan Halaman Nuxt:**  
> - `pages/konsultan/index.vue` (Multi-Client Status Table)  
> - `pages/konsultan/validasi.vue` (Antrean verifikasi bulanan)  
> - `pages/konsultan/alert.vue` (AI Copilot Feed Claude 3.7 Sonnet)  
> - `stores/konsultan.ts`

#### 1. Dapatkan Daftar Seluruh Klien Binaan Konsultan
- **Endpoint:** `GET /api/v1/consultant/clients`
- **Auth:** `Bearer Token` (Role: `CONSULTANT`)
- **Response (200 OK):**
  Daftar UMKM binaan aktif, skor kesehatan (0-100), status pendanaan (`DRAFT` / `IN_REVIEW` / `READY_FOR_FUNDING`), status pelaporan bulanan (`VERIFIED` / `PENDING` / `OVERDUE`), dan progres rencana aksi.

#### 2. Dapatkan Antrean Validasi Pelaporan Bulanan Klien
- **Endpoint:** `GET /api/v1/consultant/validations/queue`
- **Auth:** `Bearer Token` (Role: `CONSULTANT`)
- **Response (200 OK):**
  Daftar berkas rekap kas yang menunggu verifikasi konsultan.

#### 3. Konsultan Menyetujui atau Menolak Pelaporan Keuangan Klien
- **Endpoint:** `POST /api/v1/consultant/validations/:validationId/review`
- **Auth:** `Bearer Token` (Role: `CONSULTANT`)
- **Request Body:**
  ```json
  {
    "status": "APPROVED", // "APPROVED" | "REJECTED"
    "consultantNote": "Mutasi rekening dan rekap kas POS cocok. Status tervalidasi."
  }
  ```

#### 4. Dapatkan Peringatan Anomali Finansial dari AI (Google Gemini Flash)
- **Endpoint:** `GET /api/v1/consultant/alerts`
- **Auth:** `Bearer Token` (Role: `CONSULTANT`)
- **Response (200 OK):**
  ```json
  {
    "success": true,
    "data": [
      {
        "id": "alt-01",
        "clientId": "umkm-01",
        "clientName": "Kopi Senja Nusantara",
        "type": "HPP_SPIKE", // "HPP_SPIKE" | "MARGIN_DROP" | "OPEX_ANOMALY"
        "title": "Lonjakan Rasio Modal Jualan (+12.4%)",
        "message": "Porsi modal jualan meningkat tajam dari 38% ke 47.2% dari uang masuk di bulan September. Rekomendasi: lakukan penyesuaian kartu stok bahan baku atau tinjau kembali kesepakatan harga dengan pemasok utama.",
        "timestamp": "25 Sep 2026 09:15",
        "severity": "medium", // "high" | "medium"
        "dismissed": false
      }
    ]
  }
  ```

#### 5. Abaikan Peringatan Anomali (Dismiss)
- **Endpoint:** `PATCH /api/v1/consultant/alerts/:alertId/dismiss`
- **Auth:** `Bearer Token` (Role: `CONSULTANT`)

#### 6. AI Copilot: Generate Draft Rekomendasi Langkah Aksi (Google Gemini Flash)
- **Endpoint:** `POST /api/v1/ai/generate-action-plan`
- **Auth:** `Bearer Token` (Role: `CONSULTANT`)
- **Request Body:** `{ "clientId": "umkm-01", "weakestAspect": "mkt" }`
- **Response (200 OK):** Draft 3 tugas rencana aksi taktis rekomendasi Gemini Flash yang mematuhi standar copywriting ramah UMKM.

---

### Modul 12: Administrasi Platform & Penugasan Konsultan
> **Kaitan Halaman Nuxt:**  
> - `pages/admin/index.vue`  
> - `pages/admin/pengguna.vue` (Tabel Kelola Akun)  
> - `pages/admin/penugasan.vue` (Matching Konsultan ke UMKM Baru)

#### 1. Dapatkan Daftar Seluruh Pengguna Ekosistem
- **Endpoint:** `GET /api/v1/admin/users`
- **Auth:** `Bearer Token` (Role: `ADMIN`)
- **Query Params:**
  - `role`: `ALL` | `UMKM` | `KONSULTAN` | `INVESTOR` | `ADMIN`
  - `search`: Nama, email, atau lembaga
  - `page`: default `1`, `limit`: default `25`
- **Response (200 OK):**
  Daftar akun lengkap dengan status aktivasi, nomor telepon, dan peran.

#### 2. Perbarui Status Akun Pengguna (Aktivasi / Suspend)
- **Endpoint:** `PATCH /api/v1/admin/users/:userId/status`
- **Auth:** `Bearer Token` (Role: `ADMIN`)
- **Request Body:** `{ "status": "ACTIVE" }` // "ACTIVE" | "SUSPENDED" | "VERIFIED"

#### 3. Dapatkan Antrean UMKM yang Menunggu Penugasan Konsultan
- **Endpoint:** `GET /api/v1/admin/assignments/pending`
- **Auth:** `Bearer Token` (Role: `ADMIN`)
- **Response (200 OK):**
  Daftar UMKM yang baru menyelesaikan onboarding diagnostik beserta sektor usaha dan kota operasional.

#### 4. Tugaskan Konsultan Pendamping ke UMKM
- **Endpoint:** `POST /api/v1/admin/assignments`
- **Auth:** `Bearer Token` (Role: `ADMIN`)
- **Request Body:**
  ```json
  {
    "businessId": "umkm-09",
    "consultantId": "cons-01",
    "targetSlaDays": 7,
    "adminNotes": "Fokuskan pendampingan pada kalkulasi HPP porsi soto dan pembukuan kas harian POS."
  }
  ```
- **Response (201 Created):**
  Mengembalikan status penugasan sukses, serta menembakkan notifikasi otomatis WhatsApp ke konsultan dan pemilik UMKM.

#### 5. Metrik Dashboard Statistik Administrator
- **Endpoint:** `GET /api/v1/admin/metrics`
- **Auth:** `Bearer Token` (Role: `ADMIN`)
- **Response (200 OK):**
  Statistik agregat platform: Total UMKM terdaftar, total konsultan aktif, total investor, persentase kelulusan Funding Gate, dan total komitmen modal yang diajukan.

---

## 4. Rekomendasi Skema Database (Prisma Schema Reference)

Untuk mendukung endpoint-endpoint di atas pada backend NodeJS/Express (`server/prisma/schema.prisma`), berikut model relasi inti yang direkomendasikan:

```prisma
datasource db {
  provider = "mysql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

enum Role {
  UMKM
  CONSULTANT
  INVESTOR
  ADMIN
}

enum FundingStatus {
  DRAFT
  IN_REVIEW
  READY_FOR_FUNDING
}

enum TxCategory {
  PEMASUKAN
  MODAL_JUALAN
  OPERASIONAL
}

enum PaymentMethod {
  QRIS
  TRANSFER
  TUNAI
}

enum RequestStatus {
  PENDING
  APPROVED
  REJECTED
}

model User {
  id           String    @id @default(cuid())
  name         String
  email        String    @unique
  passwordHash String
  role         Role      @default(UMKM)
  phone        String?
  avatar       String?
  isVerified   Boolean   @default(false)
  createdAt    DateTime  @default(now())
  updatedAt    DateTime  @updatedAt

  businessProfile   BusinessProfile?
  consultantProfile ConsultantProfile?
  investorProfile   InvestorProfile?
  sentMessages      ChatMessage[]
  notifications     Notification[]
}

model ConsultantProfile {
  id                 String   @id @default(cuid())
  userId             String   @unique
  user               User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  firmName           String?
  specialization     String   @default("F&B & Ritel")
  isCertified        Boolean  @default(true)
  activeClientsCount Int      @default(0)
  createdAt          DateTime @default(now())

  businesses BusinessProfile[]
}

model InvestorProfile {
  id                String   @id @default(cuid())
  userId            String   @unique
  user              User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  firmName          String
  commitmentCapital String   @default("Rp 1.0 Miliar")
  isVerified        Boolean  @default(true)
  createdAt         DateTime @default(now())

  accessRequests AccessRequest[]
  watchlists     Watchlist[]
}

model BusinessProfile {
  id             String          @id @default(cuid())
  userId         String          @unique
  user           User            @relation(fields: [userId], references: [id], onDelete: Cascade)
  code           String          @unique // contoh: BERU-KOP-01
  brandName      String
  ownerName      String
  sector         String
  city           String
  establishedYear Int            @default(2021)
  outletsCount   Int             @default(1)
  employeesCount Int             @default(5)
  fundingTarget  Decimal         @db.Decimal(15, 2)
  fundingStatus  FundingStatus   @default(DRAFT)
  pitchSummary   String?         @db.Text
  description    String?         @db.Text
  nib            String?
  npwp           String?
  logoUrl        String?
  bannerUrl      String?
  certifiedAt    DateTime?
  consultantId   String?
  consultant     ConsultantProfile? @relation(fields: [consultantId], references: [id], onDelete: SetNull)
  createdAt      DateTime        @default(now())
  updatedAt      DateTime        @updatedAt

  assessment        Assessment?
  aspectScores      AspectScore[]
  actionPlanTasks   ActionPlanTask[]
  dailyTransactions DailyTransaction[]
  monthlyReports    MonthlyReport[]
  dataRoomDocs      DataRoomDocument[]
  accessRequests    AccessRequest[]
  chatThreads       ChatThread[]
  watchlists        Watchlist[]
}

model DailyTransaction {
  id            String        @id @default(cuid())
  businessId    String
  business      BusinessProfile @relation(fields: [businessId], references: [id], onDelete: Cascade)
  date          DateTime
  title         String
  category      TxCategory
  amount        Decimal       @db.Decimal(15, 2)
  paymentMethod PaymentMethod @default(QRIS)
  status        String        @default("VERIFIED") // VERIFIED, PENDING
  receiptNumber String?
  notes         String?
  createdAt     DateTime      @default(now())
}

model MonthlyReport {
  id              String          @id @default(cuid())
  businessId      String
  business        BusinessProfile @relation(fields: [businessId], references: [id], onDelete: Cascade)
  month           String
  year            Int
  omzet           Decimal         @db.Decimal(15, 2)
  hpp             Decimal         @db.Decimal(15, 2)
  opex            Decimal         @db.Decimal(15, 2)
  netProfit       Decimal         @db.Decimal(15, 2)
  cashBalance     Decimal         @db.Decimal(15, 2)
  proofDocumentUrl String?
  status          String          @default("PENDING") // PENDING, VERIFIED, REJECTED
  hasAnomaly      Boolean         @default(false)
  anomalyNote     String?
  submittedAt     DateTime        @default(now())
}

model Assessment {
  id             String          @id @default(cuid())
  businessId     String          @unique
  business       BusinessProfile @relation(fields: [businessId], references: [id], onDelete: Cascade)
  overallScore   Int             @default(50)
  grade          String          @default("Grade B")
  certifiedAt    DateTime?
  updatedAt      DateTime        @updatedAt
}

model AspectScore {
  id             String          @id @default(cuid())
  businessId     String
  business       BusinessProfile @relation(fields: [businessId], references: [id], onDelete: Cascade)
  aspectId       String          // fin, ops, mkt, leg, gov
  aspectName     String
  score          Int             @default(50)
  targetScore    Int             @default(80)
  status         String          @default("warning") // good, warning, needs_work
  notes          String?         @db.Text
  updatedAt      DateTime        @updatedAt
}

model ActionPlanTask {
  id             String          @id @default(cuid())
  businessId     String
  business       BusinessProfile @relation(fields: [businessId], references: [id], onDelete: Cascade)
  milestoneId    String          @default("m1")
  title          String
  description    String?         @db.Text
  category       String          @default("Finansial")
  completed      Boolean         @default(false)
  dueDate        DateTime?
  consultantNote String?         @db.Text
  createdAt      DateTime        @default(now())
  updatedAt      DateTime        @updatedAt
}

model AccessRequest {
  id             String          @id @default(cuid())
  businessId     String
  business       BusinessProfile @relation(fields: [businessId], references: [id], onDelete: Cascade)
  investorId     String
  investor       InvestorProfile @relation(fields: [investorId], references: [id], onDelete: Cascade)
  proposedTicket Decimal         @db.Decimal(15, 2)
  scheme         String          @default("REVENUE_SHARE")
  introMessage   String          @db.Text
  ndaAgreed      Boolean         @default(true)
  status         RequestStatus   @default(PENDING)
  requestedAt    DateTime        @default(now())
  reviewedAt     DateTime?
}

model DataRoomDocument {
  id             String          @id @default(cuid())
  businessId     String
  business       BusinessProfile @relation(fields: [businessId], references: [id], onDelete: Cascade)
  title          String
  category       String          // Legalitas, Keuangan, Operasional
  fileSize       String          // contoh "2.4 MB"
  fileUrl        String
  isConfidential Boolean         @default(true)
  uploadedAt     DateTime        @default(now())
}

model ChatThread {
  id             String          @id @default(cuid())
  businessId     String
  business       BusinessProfile @relation(fields: [businessId], references: [id], onDelete: Cascade)
  investorId     String
  dealStatus     String          @default("Tahap Due Diligence Kas")
  ticketDiscussed Decimal        @db.Decimal(15, 2)
  createdAt      DateTime        @default(now())
  updatedAt      DateTime        @updatedAt

  messages       ChatMessage[]
}

model ChatMessage {
  id             String          @id @default(cuid())
  threadId       String
  thread         ChatThread      @relation(fields: [threadId], references: [id], onDelete: Cascade)
  senderId       String
  sender         User            @relation(fields: [senderId], references: [id], onDelete: Cascade)
  text           String          @db.Text
  attachmentType String?         // METRIC, DOCUMENT, DEAL_OFFER
  attachmentData Json?
  createdAt      DateTime        @default(now())
}

model Notification {
  id             String          @id @default(cuid())
  userId         String
  user           User            @relation(fields: [userId], references: [id], onDelete: Cascade)
  title          String
  message        String          @db.Text
  category       String          // KONSULTAN, INVESTOR, KESEHATAN, KAS, AKSI
  priority       String          @default("NORMAL") // HIGH, NORMAL
  isRead         Boolean         @default(false)
  link           String?
  actionLabel    String?
  createdAt      DateTime        @default(now())
}

model Watchlist {
  id             String          @id @default(cuid())
  investorId     String
  investor       InvestorProfile @relation(fields: [investorId], references: [id], onDelete: Cascade)
  businessId     String
  business       BusinessProfile @relation(fields: [businessId], references: [id], onDelete: Cascade)
  createdAt      DateTime        @default(now())

  @@unique([investorId, businessId])
}
```

---

## 5. Ringkasan Header & Interceptor Frontend (Petunjuk Integrasi)

Frontend Nuxt 3 dapat mengonsumsi endpoint-endpoint ini menggunakan `ofetch` / `$fetch` atau custom composable `useApiFetch()` yang otomatis menyematkan header JWT:

```typescript
// composables/useApiFetch.ts
export const useApiFetch = <T>(request: string, opts?: any) => {
  const config = useRuntimeConfig()
  const authStore = useAuthStore()

  const customHeaders: HeadersInit = {
    'Accept': 'application/json',
    ...(authStore.token ? { Authorization: `Bearer ${authStore.token}` } : {})
  }

  return useFetch<T>(request, {
    baseURL: config.public.apiBaseUrl || 'http://localhost:5000/api/v1',
    headers: customHeaders,
    ...opts,
    onResponseError({ response }) {
      if (response.status === 401) {
        authStore.logout()
        navigateTo('/masuk')
      }
    }
  })
}
```
