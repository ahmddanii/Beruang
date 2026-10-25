# 🐻 Beruang (Ber-Uang) — Platform B2B Kesiapan Investasi & Pendanaan Terverifikasi UMKM

[![Nuxt 3](https://img.shields.io/badge/Nuxt-3.15-00DC82?style=for-the-badge&logo=nuxt.js&logoColor=white)](https://nuxt.com/)
[![Vue 3](https://img.shields.io/badge/Vue-3.5-4FC08D?style=for-the-badge&logo=vue.js&logoColor=white)](https://vuejs.org/)
[![Express.js](https://img.shields.io/badge/Express-4.21-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Prisma ORM](https://img.shields.io/badge/Prisma-6.4-2D3748?style=for-the-badge&logo=prisma&logoColor=white)](https://www.prisma.io/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Supabase-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)](https://supabase.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

> **Beruang (Ber-Uang)** adalah ekosistem digital terintegrasi yang menjembatani kesenjangan antara pelaku UMKM di Indonesia, Konsultan Bisnis profesional bersertifikasi BNSP, dan Investor modal ventura/angel terakreditasi. Platform ini memandu UMKM membenahi 5 aspek fundamental usaha hingga tersertifikasi **"Ready for Funding"** sebelum membuka Virtual Data Room (VDR) terenkripsi kepada investor.

---

## 📑 Daftar Isi
1. [Arsitektur Sistem](#1-arsitektur-sistem)
2. [Fitur Unggulan Per Peran](#2-fitur-unggulan-per-peran)
3. [Tech Stack](#3-tech-stack)
4. [Prasyarat Sistem (Prerequisites)](#4-prasyarat-sistem-prerequisites)
5. [Tutorial Instalasi & Setup Lengkap](#5-tutorial-instalasi--setup-lengkap)
6. [Konfigurasi Environment Variables](#6-konfigurasi-environment-variables)
7. [Inisialisasi & Seeding Database](#7-inisialisasi--seeding-database)
8. [Menjalankan Aplikasi](#8-menjalankan-aplikasi)
9. [Daftar Akun Demo (Testing Credentials)](#9-daftar-akun-demo-testing-credentials)
10. [Panduan Ringkas API & Proxy](#10-panduan-ringkas-api--proxy)
11. [Struktur Direktori](#11-struktur-direktori)
12. [Pemecahan Masalah (Troubleshooting)](#12-pemecahan-masalah-troubleshooting)

---

## 1. Arsitektur Sistem

Beruang dibangun dengan pola arsitektur **Fullstack Monolith / Backend-For-Frontend (BFF)** yang menyatukan performa SSR/SPA Nuxt 3 dengan keandalan Express.js + Prisma ORM:

```
[ Klien / Browser ]
         │
         ▼  (HTTP / Port 3000)
┌────────────────────────────────────────────────────────┐
│ Nuxt 3 Client & Nitro Engine                           │
│  ├── Hybrid Rendering (SSR Publik + SPA Dashboard)     │
│  ├── Pinia State Management + Persistent Cookie Auth   │
│  └── Nitro Reverse Proxy: /api/proxy/* ────────────────┐
└────────────────────────────────────────────────────────┘│
                                                          │ (Internal Proxy)
                                                          ▼
┌────────────────────────────────────────────────────────┐
│ Express.js REST API Engine (server/ - Port 5000)       │
│  ├── Auth & JWT Verification Middleware                │
│  ├── Modul UMKM, Konsultan, Investor, & Keuangan       │
│  ├── Dynamic Aggregator (Buku Kas & Laporan Bulanan)   │
│  └── Virtual Data Room (VDR) & Audit Trail Engine      │
└───────────────────────────────────────────┬────────────┘
                                            │
                                            ▼ (Prisma Client)
┌────────────────────────────────────────────────────────┐
│ Database Layer                                         │
│  ├── Cloud: PostgreSQL di Supabase (AWS ap-southeast-1)│
│  └── Local Fallback: SQLite (server/prisma/dev.db)     │
└────────────────────────────────────────────────────────┘
```

**Keunggulan Arsitektur Ini:**
- **Zero CORS Headache:** Browser hanya berkomunikasi dengan domain Nuxt (`localhost:3000`), dan Nitro meneruskannya ke backend Express (`localhost:5000`) melalui endpoint `/api/proxy/*`.
- **Sensitifitas Privasi Finansial:** Data keuangan privat, dokumen rekening koran, dan dynamic watermarking dikelola ketat di layer server sebelum disajikan ke investor.

---

## 2. Fitur Unggulan Per Peran

### 🏪 1. Pelaku UMKM
- **Onboarding Terpandu 4 Langkah:** Pengisian profil, sektor industri, metrik baseline omzet & kas, serta verifikasi.
- **Radar 5 Aspek Fundamental:** Visualisasi interaktif SVG kekuatan bisnis pada aspek *Keuangan, Operasional, Pasar, Legalitas, & Tim*.
- **Rencana Aksi (Action Plan):** Checklist taktil interaktif dengan milestone bertahap yang disinkronkan langsung ke basis data.
- **Buku Kas & Rekap Keuangan:** Pencatatan kas harian real-time, ringkasan bulanan otomatis, rasio HPP/OPEX, dan upload bukti rekening koran.
- **Profil Usaha & Produk Unggulan:** Pengaturan kontak WhatsApp, Instagram, dan katalog produk unggulan toko.
- **Kontrol Akses Data Room:** Kelola dan tinjau persetujuan akses berkas privat dari calon investor (Approve / Reject).

### 👔 2. Konsultan Bisnis (BNSP)
- **Matriks Portofolio Klien:** Pantau progres seluruh UMKM binaan, skor radar rata-rata, dan status kesiapan pendanaan.
- **Audit & Penilaian 5 Aspek:** Formulir audit dinamis dengan preview real-time grafik radar kelayakan usaha.
- **Validasi Laporan Keuangan:** Antrean review laporan bulanan UMKM untuk diverifikasi (*Verified*) atau diminta revisi (*Request Revision*).
- **Profil Konsultan Resmi:** Publikasi lisensi BNSP, riwayat pengalaman, spesialisasi industri, dan bio profesional.

### 💼 3. Investor Terakreditasi
- **Katalog Bisnis Terkurasi:** Marketplace bisnis siap investasi dengan perlindungan privasi ketat (menampilkan rasio pertumbuhan tanpa membocorkan nominal rupiah riil ke publik).
- **Pitching Room & Catatan Konsultan:** Akses langsung ke evaluasi objektif dan rekomendasi konsultan independen.
- **Watermarked Virtual Data Room (VDR):** Pratinjau laporan laba rugi terverifikasi dan mutasi rekening dengan dynamic watermark nama/email investor serta log audit riwayat akses.
- **Pengajuan Tiket Investasi:** Formulir penawaran komitmen permodalan terstruktur untuk UMKM binaan.

### ⚡ 4. Mode Simulasi Cepat (Role Switcher)
Bagi reviewer, juri, atau penguji, aplikasi dilengkapi **Role Switcher Toolbar** di pojok kanan atas untuk berpindah peran (UMKM ↔ Konsultan ↔ Investor ↔ Admin) dalam 1 klik tanpa perlu logout/login berulang kali.

---

## 3. Tech Stack

| Kategori | Teknologi | Kegunaan |
|---|---|---|
| **Frontend Framework** | **Nuxt 3.15** + **Vue 3.5** | Arsitektur Hybrid (SSR & SPA), File-based routing |
| **Styling & Design System** | **Tailwind CSS 3.4** | GoPay Tactile Card tokens (`.card-tactile-gopay`), 3D Buttons |
| **Typography** | **Poppins** & **JetBrains Mono** | Standar tipografi B2B berwibawa & angka finansial tabular |
| **State Management** | **Pinia 2.3** | Global auth session, multi-role state, reactive caching |
| **Visualisasi & Grafik** | **Chart.js** & Native SVG | Grafik tren kas, Radar chart 5 Aspek Fundamental |
| **Backend Engine** | **Express.js 4.21** + **TypeScript** | RESTful API terstruktur di folder `server/` |
| **Database ORM** | **Prisma 6.4** | Type-safe query engine, migrasi skema, dan automated seed |
| **Basis Data** | **Supabase PostgreSQL** / SQLite | PostgreSQL cloud terkelola (Transaction Pooler port 6543) |
| **Keamanan & Auth** | **JWT & Bcrypt** | Bearer token authorization, password hashing |

---

## 4. Prasyarat Sistem (Prerequisites)

Sebelum memulai instalasi, pastikan sistem komputer Anda telah terinstal:
- **Node.js**: Versi **18.x** atau **20.x LTS** (Cek dengan perintah: `node -v`)
- **npm**: Versi **9.x** atau lebih baru (Cek dengan perintah: `npm -v`)
- **Git**: Terpasang di sistem operasi Anda

---

## 5. Tutorial Instalasi & Setup Lengkap

Ikuti langkah-langkah di bawah ini untuk menyiapkan dan menjalankan proyek di komputer lokal:

### Langkah 1: Clone Repository
```bash
git clone https://github.com/ahmddanii/Beruang-Frontend.git
cd Beruang-Frontend
```

### Langkah 2: Instal Dependensi Frontend & Server
Jalankan instalasi dependensi untuk root (Nuxt 3) dan backend (Express):

```bash
# 1. Instal dependensi antarmuka (Frontend)
npm install

# 2. Instal dependensi server backend (Express & Prisma)
npm install --prefix server
```

---

## 6. Konfigurasi Environment Variables

Aplikasi membutuhkan konfigurasi environment variable di dua lokasi: **Root** (untuk Nuxt) dan **`server/`** (untuk backend Express & Prisma).

### A. Konfigurasi Frontend (`.env`)
Salin file template `.env.example` di folder root menjadi `.env`:

```bash
# Windows PowerShell
copy .env.example .env

# Linux / macOS
cp .env.example .env
```

Pastikan isi file `.env` di direktori root mencakup:
```env
# URL dasar untuk REST API server backend
NUXT_PUBLIC_API_BASE_URL=http://localhost:3000/api/proxy

# Google OAuth 2.0 Client ID (Opsional, untuk login Google resmi)
NUXT_PUBLIC_GOOGLE_CLIENT_ID=203404374211-o5otp0js5ts6f70homtjqj5j6b6ueqm2.apps.googleusercontent.com
```

### B. Konfigurasi Backend Server (`server/.env`)
Salin template `server/.env.example` menjadi `server/.env`:

```bash
# Windows PowerShell
copy server/.env.example server/.env

# Linux / macOS
cp server/.env.example server/.env
```

Pastikan isi `server/.env` terkonfigurasi dengan benar:
```env
# Port Server Backend
PORT=5000
NODE_ENV=development

# Database Connection (Supabase PostgreSQL Cloud)
DATABASE_URL="postgresql://postgres.zqysbqmtqnovxwbjfyxx:c5c%2BY7ahqCu_%2BN.@aws-0-ap-southeast-1.pooler.supabase.com:6543/postgres?pgbouncer=true"
DIRECT_URL="postgresql://postgres.zqysbqmtqnovxwbjfyxx:c5c%2BY7ahqCu_%2BN.@aws-0-ap-southeast-1.pooler.supabase.com:5432/postgres"

# JWT Authentication Secret
JWT_SECRET="beruang-super-secret-key-2026-b2b-umkm"
JWT_EXPIRES_IN="7d"

# Frontend Origin CORS
FRONTEND_URL="http://localhost:3000"
```

> 💡 **Info Database Lokal (Offline):**  
> Jika Anda ingin menjalankan database secara offline tanpa internet, Anda dapat mengubah `provider = "sqlite"` pada `server/prisma/schema.prisma` dan menyetel `DATABASE_URL="file:./dev.db"` di `server/.env`.

---

## 7. Inisialisasi & Seeding Database

Sinkronkan skema database Prisma dan masukkan data awal (dummy demo accounts, bisnis Kopi Senja, audit report, dan transaksi) dengan script praktis dari root:

```bash
# 1. Dorong skema Prisma ke Database
npm run db:push

# 2. Jalankan Seeder data awal lengkap
npm run db:seed
```

> **Catatan:** Anda juga dapat membuka antarmuka visual basis data menggunakan Prisma Studio kapan saja dengan perintah:
> ```bash
> npm run db:studio
> ```
> Prisma Studio akan terbuka di `http://localhost:5555`.

---

## 8. Menjalankan Aplikasi

Aplikasi membutuhkan **dua proses** yang berjalan secara berdampingan: Frontend Nuxt (Port 3000) dan Backend Express (Port 5000).

Buka **dua jendela terminal**:

### Terminal 1: Backend Express Server
```bash
npm run dev:server
```
*(Server backend akan berjalan di `http://localhost:5000`)*

### Terminal 2: Frontend Nuxt 3 Client
```bash
npm run dev
```
*(Aplikasi Nuxt akan berjalan di `http://localhost:3000`)*

Setelah kedua server aktif, buka peramban Anda di:
👉 **[http://localhost:3000](http://localhost:3000)**

---

## 9. Daftar Akun Demo (Testing Credentials)

Gunakan akun-akun berikut untuk masuk dan menguji fitur dari sudut pandang masing-masing aktor:

| Peran | Nama Pengguna / Entitas | Email Akun | Password Default | Akses Halaman Utama |
|---|---|---|---|---|
| **UMKM** | Fikri Setiawan (*Kopi Senja Nusantara*) | `fikri@kopisenja.id` | `password123` | `/dashboard` |
| **Konsultan** | Dra. Maya Suryani, M.M. (*Suryani Advisory*) | `maya.suryani@beruang.id` | `password123` | `/konsultan` |
| **Investor** | Hendro Wicaksono (*Nusantara Angel Syndicate*) | `hendro@nusantaraventures.com` | `password123` | `/investor` |
| **Admin** | Super Admin Beruang Platform | `admin@beruang.id` | `password123` | `/admin` |

> 🚀 **Kemudahan Navigasi:**  
> Selain melalui form login (`/masuk`), Anda dapat berganti peran secara langsung kapan saja menggunakan bilah **"Role Switcher"** yang berada di navigasi atas aplikasi.

---

## 10. Panduan Ringkas API & Proxy

Semua pemanggilan API dari frontend menggunakan composable `useApi('/endpoint')`. Pada environment development, Nitro Proxy secara otomatis membelokkan panggilan `/api/proxy/*` menuju backend lokal `http://localhost:5000/api/*`.

Berikut adalah ringkasan modul endpoint utama yang tersedia:

| Modul | Endpoint | Method | Deskripsi |
|---|---|:---:|---|
| **Auth** | `/api/auth/login` | `POST` | Autentikasi email & password, mengembalikan token JWT |
| | `/api/auth/register` | `POST` | Registrasi akun baru (UMKM / Konsultan / Investor) |
| | `/api/auth/me` | `GET` | Mengambil profil user aktif berdasarkan token |
| **UMKM** | `/api/umkm/profile` | `GET` / `PUT` | Mengambil & memperbarui profil bisnis, medsos, dan kontak |
| | `/api/umkm/tasks` | `GET` / `POST` | Mengambil dan membuat rencana aksi (action plan) |
| | `/api/umkm/tasks/:id/toggle` | `PATCH` | Mengubah status checklist rencana aksi (selesai / belum) |
| | `/api/umkm/products` | `GET` / `POST` | Manajemen produk unggulan UMKM |
| **Keuangan** | `/api/finances/summary` | `GET` | Kalkulasi omzet, HPP, OPEX, dan kas real-time |
| | `/api/finances/daily` | `GET` / `POST` | Pencatatan & riwayat transaksi kas harian |
| | `/api/finances/monthly` | `GET` / `POST` | Laporan keuangan bulanan & lampiran mutasi |
| **Konsultan** | `/api/consultant/profile` | `GET` / `PUT` | Profil konsultan, lisensi BNSP, dan bio penugasan |
| | `/api/consultant/clients` | `GET` | Daftar portofolio UMKM binaan aktif |
| | `/api/consultant/validations` | `GET` | Antrean laporan keuangan bulanan yang perlu divalidasi |
| | `/api/consultant/validations/:id/verify` | `POST` | Memvalidasi dan menerbitkan status audit terverifikasi |
| | `/api/consultant/validations/:id/request-revision` | `POST` | Meminta perbaikan laporan dengan catatan perbaikan |
| **Investor** | `/api/investor/businesses` | `GET` | Katalog bisnis terkurasi untuk investasi |
| | `/api/investor/watchlist` | `GET` / `POST` | Daftar simpanan bisnis pantauan investor |
| **VDR** | `/api/vdr/documents/:bizId` | `GET` | Akses Virtual Data Room terproteksi & dynamic watermark |
| | `/api/vdr/request-access` | `POST` | Mengajukan permohonan akses berkas privat |

📖 *Dokumentasi spesifikasi teknis lengkap dengan contoh payload request/response dapat dibaca di: [`docs/API_ENDPOINTS_GUIDE.md`](./docs/API_ENDPOINTS_GUIDE.md).*

---

## 11. Struktur Direktori

```
beruang-frontend/
├── assets/                  # CSS tokens, GoPay tactile styles, animasi Lottie
├── components/              # Pustaka komponen antarmuka modular
│   ├── base/                # Komponen atomik (BButton, BCard, BBadge, BInput)
│   ├── dashboard/           # Komponen widget dashboard UMKM & radar visualizer
│   ├── konsultan/           # Komponen portal evaluasi & antrean validasi konsultan
│   ├── investor/            # Komponen kartu marketplace & pitching data room
│   └── layout/              # Navbar, Footer, Sidebar, dan RoleSwitcher
├── composables/             # Vue Composables (useApi, useCurrency, useAuth, dll)
├── layouts/                 # Master layouts (default, auth, dashboard)
├── pages/                   # File-based routing halaman aplikasi
│   ├── index.vue            # Beranda publik (Value proposition & animasi Si Beru)
│   ├── masuk.vue            # Halaman login multi-peran
│   ├── daftar.vue           # Halaman registrasi multi-peran
│   ├── onboarding.vue       # Wizard onboarding 4 langkah UMKM
│   ├── dashboard/           # Portal dashboard UMKM (Kas, Radar, Profil, Data Room)
│   ├── konsultan/           # Portal konsultan (Klien, Validasi, Profil, Audit)
│   ├── investor/            # Marketplace investor, detail deal room, & watchlist
│   └── admin/               # Panel admin manajemen platform
├── public/                  # Aset statis, ikon SVG, vektor Si Beru
├── server/                  # Backend REST API Engine
│   ├── api/proxy/           # Nitro Proxy ([...path].ts) untuk meneruskan request ke port 5000
│   ├── prisma/              # Prisma schema & seed script
│   └── src/                 # Express application code
│       ├── index.ts         # Server entry point & CORS configuration
│       ├── middleware/      # Auth & JWT verification middlewares
│       └── routes/          # Endpoint handlers (auth, umkm, consultant, finances, dll)
├── stores/                  # Pinia state stores (auth, umkm, konsultan, investor)
├── docs/                    # Dokumentasi arsitektur, PRD, dan panduan API
├── nuxt.config.ts           # Konfigurasi Nuxt 3 & route rules
├── tailwind.config.ts       # Konfigurasi Tailwind CSS & custom design tokens
└── package.json             # Root package scripts & dependencies
```

---

## 12. Pemecahan Masalah (Troubleshooting)

### Q: Port 3000 atau Port 5000 sudah terpakai (EADDRINUSE)?
Jika Anda melihat error port bentrok saat menjalankan `npm run dev` atau `npm run dev:server`:
```powershell
# Temukan PID proses yang memakai port 5000 atau 3000 (Windows PowerShell):
netstat -ano | findstr :5000
netstat -ano | findstr :3000

# Hentikan proses tersebut berdasarkan PID:
taskkill /F /PID <NOMOR_PID>
```

### Q: Gagal terhubung ke Database Supabase?
1. Pastikan koneksi internet Anda aktif.
2. Periksa apakah `DATABASE_URL` pada file `server/.env` telah terisi dengan connection string Supabase yang valid.
3. Bila koneksi pooler (`port 6543`) mengalami timeout karena firewall jaringan, Anda dapat beralih ke direct connection (`port 5432`) atau menggunakan database SQLite lokal (`dev.db`).

### Q: Token autentikasi tidak valid atau data tidak sinkron?
1. Buka peramban di `http://localhost:3000`.
2. Klik tombol **Role Switcher** di navigasi kanan atas dan pilih salah satu akun (misal: "UMKM - Kopi Senja"). Hal ini akan mereset cookie `beruang_token` dengan token demo yang valid dan memperbarui Pinia store secara instan.

---

## 👥 Kontribusi & Lisensi

Dikembangkan dengan standar kualitas agensi modern untuk memajukan daya saing dan kesiapan pendanaan UMKM Indonesia.  
Hak Cipta © 2026 **Tim Pengembang Beruang**. Seluruh hak cipta dilindungi.
