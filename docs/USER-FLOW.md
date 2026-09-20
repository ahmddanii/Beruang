# USER-FLOW.md — Beruang (Ber-Uang)
> Dokumen ini menggambarkan **alur perjalanan user** dari setiap role yang ada di platform Beruang.
> Fokus: bagaimana user berinteraksi, apa yang mereka lakukan, dan ke mana mereka pergi setelah setiap aksi.

---

## DAFTAR ROLE

| Role | Siapa | Akses Utama |
|---|---|---|
| **UMKM** | Pemilik usaha mikro, kecil, menengah | Dashboard pribadi, progress input, marketplace status |
| **CONSULTANT** | Business Consultant berlisensi | Multi-client dashboard, assessment, action plan |
| **INVESTOR** | Angel Investor / Micro-VC | Marketplace, profil publik, data room |
| **ADMIN** | Operator platform Beruang | Manajemen user, penugasan konsultan, analytics |

---

## 1. FLOW: AUTENTIKASI (Semua Role)

### 1.1 Registrasi

```
[Landing Page]
      │
      ▼
[Klik "Daftar Sekarang"]
      │
      ▼
[Halaman Register]
      │ User mengisi:
      │ - Nama lengkap
      │ - Email
      │ - Password
      │ - Pilih Role: UMKM / CONSULTANT / INVESTOR
      │
      ▼
[Submit Form]
      │
      ├─── Validasi gagal ──▶ [Tampil error inline pada field] ──▶ [Tetap di halaman Register]
      │
      └─── Validasi sukses
                │
                ▼
         [Email verifikasi dikirim]
                │
                ▼
         [Halaman "Cek Email Anda"]
                │
                ▼
         [User klik link verifikasi di email]
                │
                ▼
         [Akun aktif → Redirect ke Onboarding sesuai role]
```

**Ketentuan wajib:**
- Role dipilih saat registrasi, tidak bisa diubah sendiri setelahnya
- Email harus unik di sistem
- Password minimal 8 karakter, harus ada huruf besar + angka
- Link verifikasi expired dalam 24 jam

**Cara achieve:**
- Gunakan NextAuth.js v5 dengan custom credentials provider
- Simpan role di tabel `User` dengan enum `UMKM | CONSULTANT | INVESTOR | ADMIN`
- Kirim email verifikasi via Resend
- Redirect post-verifikasi cek `onboardingCompleted` flag di database

---

### 1.2 Login

```
[Landing Page / Halaman manapun saat belum login]
      │
      ▼
[Halaman Login]
      │ User mengisi:
      │ - Email
      │ - Password
      │
      ▼
[Submit]
      │
      ├─── Kredensial salah ──▶ [Toast error: "Email atau password salah"] ──▶ [Tetap di Login]
      │
      ├─── Akun belum verifikasi ──▶ [Toast: "Cek email verifikasi Anda"] + [Kirim ulang link]
      │
      └─── Sukses
                │
                ├─── Role: UMKM ──▶ [Cek onboardingCompleted]
                │         ├── Belum ──▶ [/onboarding/umkm]
                │         └── Sudah ──▶ [/dashboard/umkm]
                │
                ├─── Role: CONSULTANT ──▶ [/dashboard/consultant]
                │
                ├─── Role: INVESTOR ──▶ [Cek onboardingCompleted]
                │         ├── Belum ──▶ [/onboarding/investor]
                │         └── Sudah ──▶ [/dashboard/investor]
                │
                └─── Role: ADMIN ──▶ [/admin]
```

**Ketentuan wajib:**
- Session persistent dengan JWT, expired 7 hari
- "Ingat saya" extend session ke 30 hari
- Maksimal 5x gagal login → akun terkunci 15 menit (rate limiting)
- Forgot password via email reset link (expired 1 jam)

---

## 2. FLOW: UMKM

### 2.1 Onboarding (Pertama Kali)

```
[Login pertama kali sebagai UMKM]
      │
      ▼
[/onboarding/umkm — Step 1: Identitas Bisnis]
      │ Mengisi:
      │ - Nama bisnis
      │ - Sektor usaha (dropdown: kuliner, fashion, pertanian, dll)
      │ - Deskripsi singkat bisnis
      │ - Kota / Kabupaten
      │ - Tahun berdiri
      │ - Jumlah karyawan
      │
      ▼
[Step 2: Baseline Finansial]
      │ Mengisi:
      │ - Rata-rata omzet per bulan (estimasi)
      │ - Rata-rata HPP per bulan (estimasi)
      │ - Biaya operasional per bulan (estimasi)
      │ - Jumlah outlet / titik penjualan
      │
      ▼
[Step 3: Target & Kebutuhan]
      │ Mengisi:
      │ - Target pendanaan yang dibutuhkan (range)
      │ - Rencana penggunaan dana
      │ - Kendala utama bisnis saat ini (multi-select)
      │
      ▼
[Submit Onboarding]
      │
      ▼
[Sistem notifikasi Admin → Assignment Konsultan]
      │
      ▼
[Halaman Tunggu Assignment]
      │ Tampil:
      │ - Status: "Menunggu penugasan konsultan"
      │ - Estimasi waktu: 1–3 hari kerja
      │ - Panduan apa yang akan terjadi selanjutnya
      │
      ▼
[Admin menugaskan Konsultan]
      │
      ▼
[UMKM terima notifikasi: "Konsultan Anda telah ditugaskan"]
      │
      ▼
[Redirect ke /dashboard/umkm — AKTIF]
```

**Ketentuan wajib:**
- Onboarding multi-step wajib diselesaikan sebelum akses dashboard penuh
- Progress onboarding tersimpan (bisa lanjut besok jika belum selesai)
- Data baseline finansial hanya estimasi, bukan angka pasti (dikonfirmasi konsultan nanti)

---

### 2.2 Dashboard Utama UMKM

```
[/dashboard/umkm]
      │
      ▼
[Tampil:]
  ┌─────────────────────────────────────────┐
  │ Header: Nama bisnis + Status badge       │
  │ (Onboarding / In Progress / Ready)       │
  ├─────────────────────────────────────────┤
  │ Card: Konsultan yang ditugaskan          │
  │ Card: Skor Assessment terbaru            │
  │ Card: Action Plan progress (%)           │
  │ Card: Reminder input bulanan             │
  ├─────────────────────────────────────────┤
  │ Shortcut menu:                           │
  │ - Lihat Assessment                       │
  │ - Action Plan & Task                     │
  │ - Input Progress Bulanan                 │
  │ - Profil Bisnis Saya                     │
  │ - Notifikasi                             │
  └─────────────────────────────────────────┘
```

---

### 2.3 Melihat Business Assessment

```
[Dashboard UMKM → "Lihat Assessment"]
      │
      ▼
[/dashboard/umkm/assessment]
      │
      ▼
[Tampil Assessment terbaru:]
  - Radar Chart 5 aspek (Finansial, HPP/Operasi, Pemasaran, SDM, Legalitas)
  - Skor per aspek (0–100)
  - Skor komposit keseluruhan
  - Catatan evaluasi dari konsultan per aspek
  - Tanggal assessment dibuat
      │
      ▼
[Jika ada riwayat assessment sebelumnya]
      │ → Tampil tab "Riwayat Assessment" (perbandingan antar waktu)
      │
      ▼
[Tombol: "Lihat Action Plan saya" → /dashboard/umkm/action-plan]
```

**Ketentuan wajib:**
- UMKM hanya bisa melihat, tidak bisa edit assessment
- Radar Chart render otomatis dari data skor konsultan
- Jika belum ada assessment → tampil empty state dengan keterangan "Menunggu penilaian konsultan"

---

### 2.4 Action Plan & Task Checklist

```
[/dashboard/umkm/action-plan]
      │
      ▼
[Tampil daftar Action Plan dari konsultan]
      │
      ├─── Belum ada Action Plan
      │         └── [Empty state: "Konsultan sedang menyiapkan rencana aksi Anda"]
      │
      └─── Ada Action Plan
                │
                ▼
         [List Milestone → List Task per milestone]
                │ Setiap task tampil:
                │ - Judul task
                │ - Deskripsi
                │ - Due date
                │ - Status badge: TODO / IN_PROGRESS / DONE
                │
                ▼
         [UMKM klik task → Update status]
                │
                ├── Tandai IN_PROGRESS
                ├── Tandai DONE
                │       └── [Progress bar % update otomatis]
                └── Tambah catatan/komentar pada task
                        │
                        ▼
                [Konsultan menerima notifikasi update task]
```

**Ketentuan wajib:**
- UMKM hanya bisa update status task, tidak bisa hapus atau edit konten task
- Progress bar dihitung: (jumlah task DONE / total task) × 100%
- Konsultan dapat melihat semua perubahan status secara real-time

---

### 2.5 Input Progress Bulanan

```
[Dashboard → "Input Progress Bulanan"]
      │
      ▼
[Cek apakah sudah ada input bulan ini]
      │
      ├── Sudah ada → [Tampil data yang sudah diisi + status validasi konsultan]
      │
      └── Belum ada
                │
                ▼
         [/dashboard/umkm/progress/input]
                │ Form mengisi:
                │ - Bulan & tahun (auto-fill bulan berjalan)
                │ - Total omzet bulan ini (Rp)
                │ - Total HPP bulan ini (Rp)
                │ - Biaya operasional (Rp)
                │ - Kas bersih akhir bulan (Rp)
                │ - Unggah dokumen bukti (rekening koran / laporan kas)
                │ - Catatan tambahan (opsional)
                │
                ▼
         [Submit]
                │
                ├── Sistem kalkulasi otomatis:
                │   - % HPP = HPP / Omzet × 100
                │   - Gross Margin = (Omzet - HPP) / Omzet × 100
                │   - Net Margin = (Omzet - HPP - Opex) / Omzet × 100
                │
                ├── Cek anomali: HPP naik >10% dari bulan lalu?
                │       └── Ya → [Trigger AI Anomaly Alert ke Konsultan]
                │
                └── [Status: "Menunggu validasi konsultan"]
                        │
                        ▼
                [Konsultan review & validasi]
                        │
                        ├── Approve → [Status: "Tervalidasi"] + Grafik update
                        └── Reject + catatan → [UMKM revisi]
```

**Ketentuan wajib:**
- Input bulanan dibuka tanggal 25–30 setiap bulan (enforce di UI dan server)
- File bukti wajib diunggah (minimal 1 dokumen)
- Kalkulasi % HPP dan margin dilakukan di server (bukan di client), bukan oleh AI
- Maksimal 1 submission per bulan per UMKM

---

### 2.6 Mendapatkan Status "Ready for Funding"

```
[Konsultan menilai UMKM layak]
      │
      ▼
[Konsultan klik "Certify Ready for Funding"]
      │
      ▼
[UMKM menerima notifikasi: "Selamat! Bisnis Anda dinyatakan Ready for Funding"]
      │
      ▼
[Dashboard UMKM — status badge berubah: "Ready for Funding" 🟢]
      │
      ▼
[Muncul opsi baru di dashboard:]
  - "Ajukan ke Marketplace" → UMKM konfirmasi ingin masuk marketplace
  - "Kelola Permintaan Akses Investor"
```

---

### 2.7 Mengelola Permintaan Akses Investor

```
[/dashboard/umkm/investor-requests]
      │
      ▼
[Tampil daftar permintaan masuk dari investor]
      │ Setiap card permintaan tampil:
      │ - Nama investor
      │ - Pesan perkenalan
      │ - Rencana tiket investasi (range)
      │ - Tanggal permintaan
      │
      ▼
[UMKM pilih aksi:]
      │
      ├── [Approve] → Data room terbuka untuk investor ini
      │       └── [Investor dapat akses dokumen privat]
      │       └── [Audit log tercatat: siapa, kapan]
      │
      └── [Reject] → Data room tetap terkunci
              └── [Investor mendapat notifikasi penolakan]
```

**Ketentuan wajib:**
- UMKM bisa approve multiple investor (bukan eksklusif)
- Approval bisa dicabut kapan saja (Revoke Access)
- Setiap pembukaan dokumen privat oleh investor tercatat di audit log

---

## 3. FLOW: BUSINESS CONSULTANT

### 3.1 Dashboard Multi-Client

```
[Login sebagai CONSULTANT → /dashboard/consultant]
      │
      ▼
[Tampil Master Dashboard:]
  ┌───────────────────────────────────────────────┐
  │ Header: Jumlah klien aktif / total             │
  ├───────────────────────────────────────────────┤
  │ AI Anomaly Alert feed (slide-in jika ada)      │
  ├───────────────────────────────────────────────┤
  │ Tabel / Grid semua klien UMKM:                 │
  │ Kolom: Nama Bisnis | Sektor | Skor | Status    │
  │        | Last Update | Action                  │
  ├───────────────────────────────────────────────┤
  │ Filter: Semua | Perlu Perhatian | Ready        │
  │ Sort: Skor terendah | Update terlama           │
  └───────────────────────────────────────────────┘
      │
      ▼
[Klik satu klien → /dashboard/consultant/client/[id]]
```

---

### 3.2 Halaman Detail Klien (dari sisi Konsultan)

```
[/dashboard/consultant/client/[id]]
      │
      ▼
[Tampil ringkasan klien:]
  - Profil bisnis lengkap
  - Assessment terbaru (Radar Chart)
  - Progress Action Plan (%)
  - History input bulanan (tabel + grafik tren)
  - Dokumen yang diunggah UMKM
  - AI Executive Summary (jika diaktifkan)
      │
      ▼
[Aksi yang tersedia:]
  ├── Buat / Edit Assessment ──▶ [3.3]
  ├── Buat / Edit Action Plan ──▶ [3.4]
  ├── Validasi Progress Bulanan ──▶ [3.5]
  └── Certify Ready for Funding ──▶ [3.6]
```

---

### 3.3 Melakukan Business Assessment

```
[/dashboard/consultant/client/[id]/assessment/new]
      │
      ▼
[Form Assessment 5 Aspek:]
      │
      │ Aspek 1 — FINANSIAL (bobot 30%)
      │   - Skor 0–100
      │   - Catatan evaluasi (textarea)
      │   - Rekomendasi perbaikan
      │
      │ Aspek 2 — HPP & OPERASIONAL (bobot 25%)
      │   - Skor 0–100
      │   - Catatan + rekomendasi
      │
      │ Aspek 3 — PEMASARAN (bobot 20%)
      │   - Skor 0–100
      │   - Catatan + rekomendasi
      │
      │ Aspek 4 — SDM (bobot 15%)
      │   - Skor 0–100
      │   - Catatan + rekomendasi
      │
      │ Aspek 5 — LEGALITAS (bobot 10%)
      │   - Skor 0–100
      │   - Catatan + rekomendasi
      │
      ▼
[Sistem kalkulasi skor komposit otomatis]
      │ Skor = (F×0.3) + (HPP×0.25) + (M×0.2) + (SDM×0.15) + (L×0.1)
      │
      ▼
[Preview Radar Chart sebelum submit]
      │
      ▼
[Submit Assessment]
      │
      ▼
[UMKM menerima notifikasi: "Hasil assessment baru tersedia"]
      │
      ▼
[Assessment tersimpan dengan timestamp + nama konsultan]
```

---

### 3.4 Membuat Action Plan

```
[/dashboard/consultant/client/[id]/action-plan/new]
      │
      ▼
[Konsultan membuat Milestone:]
      │ - Judul milestone
      │ - Target tanggal selesai
      │ - Deskripsi milestone
      │
      ▼
[Di dalam milestone, tambah Task:]
      │ - Judul task
      │ - Deskripsi detail
      │ - Due date
      │ - Priority: LOW / MEDIUM / HIGH
      │
      ▼
[Tambah milestone/task berikutnya (unlimited)]
      │
      ▼
[Publish Action Plan]
      │
      ▼
[UMKM menerima notifikasi: "Action Plan baru tersedia"]
```

---

### 3.5 Validasi Progress Bulanan

```
[Dashboard → notifikasi "Progress baru dari [nama UMKM]"]
      │
      ▼
[/dashboard/consultant/client/[id]/progress/[bulan]]
      │
      ▼
[Tampil data yang disubmit UMKM:]
  - Angka finansial bulan ini vs bulan lalu (perbandingan)
  - Kalkulasi % HPP, margin (sudah dihitung sistem)
  - Dokumen yang diunggah (preview + download)
  - AI Anomaly Alert (jika ada)
      │
      ▼
[Konsultan pilih aksi:]
      │
      ├── [Approve] + catatan validasi
      │       └── [Status progress → "Tervalidasi"]
      │       └── [Grafik tren UMKM update]
      │
      └── [Request Revisi] + catatan apa yang perlu diperbaiki
              └── [UMKM notifikasi untuk revisi]
```

---

### 3.6 Certify "Ready for Funding"

```
[Halaman detail klien → tombol "Certify Ready for Funding"]
      │ (Tombol hanya muncul jika skor komposit ≥ threshold tertentu)
      │
      ▼
[Modal konfirmasi:]
  - Ringkasan skor terbaru
  - Jumlah siklus progress yang sudah tervalidasi
  - Textarea: Catatan rekomendasi resmi konsultan
      │
      ▼
[Konfirmasi Submit]
      │
      ▼
[Status UMKM berubah → "Ready for Funding"]
[UMKM menerima notifikasi email + in-app]
[Profil UMKM eligible masuk marketplace investor]
```

**Ketentuan wajib:**
- Hanya CONSULTANT yang ditugaskan ke UMKM tersebut yang bisa certify
- Tidak ada batas skor minimum yang di-hardcode di MVP, judgment ada di konsultan
- Catatan rekomendasi wajib diisi sebelum submit

---

## 4. FLOW: INVESTOR

### 4.1 Onboarding Investor

```
[Login pertama → /onboarding/investor]
      │
      ▼
[Mengisi profil investor:]
  - Nama / nama firma
  - Tipe: Angel Investor / Micro-VC / Family Office
  - Sektor yang diminati (multi-select)
  - Range tiket investasi (Rp X juta – Y juta)
  - Kota domisili
  - Deskripsi singkat kriteria investasi
      │
      ▼
[Submit → Admin review & verifikasi]
      │
      ▼
[Status: "Menunggu verifikasi admin"]
[Admin approve → Akses marketplace aktif]
```

---

### 4.2 Menjelajahi Marketplace

```
[/marketplace]
      │
      ▼
[Tampil katalog UMKM dengan status "Ready for Funding":]
  ┌───────────────────────────────────────────────┐
  │ Search bar                                     │
  │ Filter: Sektor | Kota | Range dana | Margin    │
  │ Sort: Terbaru | Skor tertinggi | Dana terkecil │
  ├───────────────────────────────────────────────┤
  │ Grid card UMKM:                                │
  │ - Nama bisnis (publik)                         │
  │ - Sektor + Kota                                │
  │ - Skor kesehatan bisnis (dalam persentase)     │
  │ - % Gross Margin (bukan angka Rp riil)         │
  │ - Badge: "Ready for Funding"                   │
  │ - Jumlah bulan data tervalidasi                │
  └───────────────────────────────────────────────┘
      │
      ▼
[Klik card UMKM → Profil Publik]
```

**Ketentuan wajib:**
- Angka Rp riil (omzet, HPP) tidak ditampilkan di katalog
- Hanya UMKM dengan status "Ready for Funding" yang muncul
- Investor yang belum terverifikasi admin tidak bisa akses marketplace

---

### 4.3 Melihat Profil Publik UMKM

```
[/marketplace/[umkm-id]]
      │
      ▼
[Tampil profil publik:]
  - Nama & deskripsi bisnis
  - Sektor, kota, tahun berdiri
  - Business Journey Timeline (grafik tren % HPP & margin)
  - Radar Chart assessment terbaru
  - Catatan evaluasi konsultan (versi ringkas)
  - Jumlah siklus perbaikan yang sudah dilewati
  - Badge verifikasi konsultan
      │
      ▼
[Tombol: "Ajukan Permintaan Akses Data Privat"]
      │
      ▼
[Modal permintaan akses → 4.4]
```

---

### 4.4 Mengajukan Permintaan Akses Data Privat

```
[Modal: Permintaan Akses Data Privat]
      │ Investor mengisi:
      │ - Pesan perkenalan
      │ - Rencana tiket investasi (Rp X – Y)
      │ - Tujuan investasi
      │
      ▼
[Submit]
      │
      ▼
[UMKM menerima notifikasi permintaan]
[Status request: "Menunggu persetujuan UMKM"]
      │
      ├── UMKM Approve → [Data Room terbuka]
      │         └── [/marketplace/[umkm-id]/data-room]
      │               Akses ke:
      │               - Laporan P&L lengkap (PDF)
      │               - Rekening koran / mutasi kas
      │               - Dokumen legalitas
      │               - Catatan konsultan lengkap
      │               - History progress detail (angka Rp riil)
      │               [Setiap dokumen yang dibuka tercatat di audit log]
      │
      └── UMKM Reject → [Notifikasi penolakan ke investor]
                └── [Investor bisa ajukan permintaan lagi dengan pesan berbeda]
```

---

## 5. FLOW: ADMIN

### 5.1 Manajemen User & Assignment

```
[/admin]
      │
      ▼
[Dashboard Admin:]
  - Total UMKM terdaftar
  - UMKM belum ditugaskan konsultan
  - Total konsultan aktif
  - Total investor terverifikasi
  - UMKM dengan status "Ready for Funding"
      │
      ▼
[Tugaskan Konsultan ke UMKM:]
  - Pilih UMKM yang belum ada konsultannya
  - Pilih konsultan yang tersedia
  - Confirm assignment
  - Kedua pihak mendapat notifikasi
      │
      ▼
[Verifikasi Investor:]
  - Review profil investor baru
  - Approve / Reject
  - Investor yang diapprove bisa akses marketplace
```

---

## 6. NOTIFIKASI — RINGKASAN PER ROLE

| Event | Penerima | Channel |
|---|---|---|
| Assignment konsultan baru | UMKM + Konsultan | In-app + Email |
| Assessment baru tersedia | UMKM | In-app + Email |
| Action Plan diterbitkan | UMKM | In-app + Email |
| Progress divalidasi / ditolak | UMKM | In-app |
| Progress baru masuk | Konsultan | In-app |
| AI Anomaly Alert (HPP naik >10%) | Konsultan | In-app (slide-in) |
| Status "Ready for Funding" | UMKM | In-app + Email |
| Permintaan akses dari investor | UMKM | In-app + Email |
| UMKM approve / reject request | Investor | In-app + Email |
| Investor baru mendaftar | Admin | In-app |
| UMKM baru tanpa konsultan | Admin | In-app |

---

*USER-FLOW.md — Beruang Platform. Versi 1.0*
