# Panduan Lengkap Deploy Beruang ke Vercel (Fullstack + Supabase)

Dokumen ini memandu langkah demi langkah cara men-deploy platform **Beruang** (Nuxt 3 Frontend + Express.js Backend) ke **Vercel** menggunakan **Supabase PostgreSQL** sebagai cloud database utama.

---

## Arsitektur Deployment

Platform Beruang di-deploy sebagai **2 Project di Vercel** dari satu repositori GitHub yang sama:

1. **Project Backend (`server/`)**: Express.js REST API berjalan sebagai Vercel Serverless Function.
2. **Project Frontend (`./`)**: Nuxt 3 Fullstack SSR/SPA berjalan di Vercel Edge/Serverless.
3. **Database**: Managed Cloud PostgreSQL di **Supabase**.

---

## Bagian 1: Deploy Backend Express ke Vercel

1. Buka [Vercel Dashboard](https://vercel.com/dashboard) dan klik **Add New...** > **Project**.
2. Pilih repositori **`beruang-frontend`** (atau nama repo GitHub Anda).
3. Pada halaman konfigurasi project:
   - **Project Name**: `beruang-api` (atau sesuai keinginan)
   - **Framework Preset**: Pilih **`Other`**
   - **Root Directory**: Klik **Edit**, lalu pilih folder **`server`**
4. Buka bagian **Environment Variables**, lalu tambahkan variabel berikut:

| Key | Value (Sesuai `server/.env`) | Keterangan |
| :--- | :--- | :--- |
| `DATABASE_URL` | `postgresql://postgres.zqysbqmtqnovxwbjfyxx:c5c%2BY7ahqCu_%2BN.@aws-0-ap-southeast-1.pooler.supabase.com:6543/postgres?pgbouncer=true` | Connection pooler Supabase |
| `DIRECT_URL` | `postgresql://postgres.zqysbqmtqnovxwbjfyxx:c5c%2BY7ahqCu_%2BN.@aws-0-ap-southeast-1.pooler.supabase.com:5432/postgres` | Direct connection Prisma |
| `JWT_SECRET` | `beruang-super-secret-key-2026-b2b-umkm` | Kunci otentikasi JWT |
| `JWT_EXPIRES_IN` | `7d` | Masa aktif token |
| `FRONTEND_URL` | `*` (atau nanti isi URL frontend Anda) | CORS origin |
| `NODE_ENV` | `production` | Production mode |

5. Klik **Deploy**.
6. Setelah selesai, catat domain backend Anda (contoh: `https://beruang-api.vercel.app`).
7. Tes di browser: `https://beruang-api.vercel.app/api/health` — harus mengembalikan status `ok`.

---

## Bagian 2: Deploy Frontend Nuxt ke Vercel

1. Kembali ke [Vercel Dashboard](https://vercel.com/dashboard) dan klik **Add New...** > **Project** lagi.
2. Pilih repositori yang sama (**`beruang-frontend`**).
3. Pada konfigurasi project:
   - **Project Name**: `beruang` (atau domain yang diinginkan)
   - **Framework Preset**: Otomatis terdeteksi **`Nuxt.js`**
   - **Root Directory**: Biarkan `./` (Root)
4. Buka bagian **Environment Variables**, tambahkan:

| Key | Value | Keterangan |
| :--- | :--- | :--- |
| `NUXT_PUBLIC_API_BASE_URL` | `https://beruang-api.vercel.app/api` | Ganti dengan domain Backend Anda dari Bagian 1 |
| `NUXT_PUBLIC_GOOGLE_CLIENT_ID` | (Opsional / kosongkan jika belum ada) | Google Auth |

5. Klik **Deploy**.
6. Website Beruang sekarang aktif dan live di URL Vercel Anda (misal `https://beruang.vercel.app`)!

---

## Akun Demo Siap Pakai di Supabase

Database Supabase sudah otomatis ter-seed dengan akun demo berikut:

| Role | Email | Password |
| :--- | :--- | :--- |
| **UMKM** | `fikri@kopisenja.id` | `password123` |
| **Konsultan** | `maya.suryani@beruang.id` | `password123` |
| **Investor** | `hendro@nusantaraventures.com` | `password123` |
| **Admin** | `admin@beruang.id` | `password123` |

---

## Menghubungkan Custom Domain (misal `beruangku.id`)

1. Di Vercel project **Frontend** (`beruang`):
   - Masuk ke **Settings** > **Domains**.
   - Masukkan domain utama: `beruangku.id` dan `www.beruangku.id`.
   - Ikuti petunjuk DNS (A Record / CNAME) di penyedia domain Anda.
2. Di Vercel project **Backend** (`beruang-api`):
   - Masuk ke **Settings** > **Domains**.
   - Masukkan subdomain API: `api.beruangku.id`.
   - Update `NUXT_PUBLIC_API_BASE_URL` di Frontend menjadi `https://api.beruangku.id/api`.
