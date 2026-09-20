# WEB-FLOW.md — Beruang (Ber-Uang)
> Dokumen ini menggambarkan **bagaimana website Beruang harus bekerja** dari sisi teknis dan struktural.
> Fokus: halaman apa saja yang harus ada, apa yang harus tersedia di tiap halaman, dan bagaimana cara mencapainya.
> Dokumen ini adalah companion dari USER-FLOW.md — setiap user action di sana harus didukung oleh halaman/komponen di sini.

---

## PETA HALAMAN (SITEMAP)

```
beruang.id/
│
├── / (Landing Page)
├── /login
├── /register
├── /forgot-password
├── /verify-email
│
├── /onboarding/
│   ├── /umkm
│   └── /investor
│
├── /dashboard/
│   ├── /umkm/
│   │   ├── (index) — Overview
│   │   ├── /assessment
│   │   ├── /action-plan
│   │   ├── /progress
│   │   │   ├── (index) — Riwayat
│   │   │   └── /input — Form input bulanan
│   │   ├── /investor-requests
│   │   ├── /profile
│   │   └── /settings
│   │
│   ├── /consultant/
│   │   ├── (index) — Multi-client dashboard
│   │   ├── /client/[id]/
│   │   │   ├── (index) — Detail klien
│   │   │   ├── /assessment/new
│   │   │   ├── /assessment/[assessmentId]
│   │   │   ├── /action-plan/new
│   │   │   ├── /action-plan/[planId]
│   │   │   └── /progress/[bulan]
│   │   ├── /profile
│   │   └── /settings
│   │
│   └── /investor/
│       ├── (index) — Overview & watchlist
│       ├── /profile
│       └── /settings
│
├── /marketplace/
│   ├── (index) — Katalog UMKM
│   └── /[umkm-id]/
│       ├── (index) — Profil publik
│       └── /data-room — (Protected, hanya investor yg approved)
│
└── /admin/
    ├── (index) — Overview platform
    ├── /users
    ├── /assignments
    ├── /investors
    └── /analytics
```

---

## BREAKDOWN HALAMAN — DETAIL, KETENTUAN & CARA ACHIEVE

---

### 1. LANDING PAGE — `/`

**Untuk apa:**
Halaman publik pertama yang dilihat calon user. Harus menjelaskan value proposition Beruang kepada tiga audience sekaligus (UMKM, Konsultan, Investor) dan mendorong mereka untuk mendaftar.

**Yang harus ada:**

| Elemen | Ketentuan Wajib |
|---|---|
| Hero section | Headline utama platform + CTA "Daftar sebagai UMKM" dan "Saya Investor" |
| Problem statement | Visualisasi 3 masalah utama (UMKM, Konsultan, Investor) |
| Solution section | 4 pilar solusi Beruang (Diagnostic, Action Plan, AI Copilot, Marketplace) |
| How it works | Step-by-step flow dari onboarding sampai funding |
| Social proof | Statistik platform (UMKM terdaftar, konsultan aktif, dll) |
| Testimonial | (Bisa kosong/dummy di MVP) |
| Footer | Link ke login, register, tentang kami, kebijakan privasi |
| Navbar | Logo + Login + Daftar |

**Ketentuan teknis:**
- Fully responsive (mobile-first)
- LCP < 2.5 detik (optimasi gambar, lazy load)
- CLS < 0.1 (hindari layout shift dari font load)
- Dark/Light mode support dari halaman ini

**Cara achieve:**
- Next.js App Router, route `/`
- Gunakan `next/image` untuk optimasi gambar
- Font load dengan `next/font` untuk hindari FOUT
- Animasi scroll menggunakan Framer Motion (atau GSAP di v1.1) dengan `prefers-reduced-motion` fallback
- Tailwind + shadcn/ui untuk komponen

---

### 2. AUTH PAGES

#### 2.1 Halaman Register — `/register`

**Untuk apa:**
User baru membuat akun dengan role spesifik. Role yang dipilih di sini menentukan seluruh pengalaman mereka di platform.

**Yang harus ada:**

| Elemen | Ketentuan Wajib |
|---|---|
| Field: Nama lengkap | Required, min 3 karakter |
| Field: Email | Required, format email valid, unik di sistem |
| Field: Password | Required, min 8 karakter, harus ada huruf besar + angka |
| Field: Konfirmasi password | Harus match dengan password |
| Pilihan Role | Radio button atau card selector: UMKM / Konsultan / Investor |
| Checkbox: Syarat & Ketentuan | Wajib dicentang sebelum submit |
| Tombol Submit | Disable saat loading |
| Link ke Login | "Sudah punya akun? Masuk" |
| Error handling | Error inline per field, bukan alert browser |

**Ketentuan teknis:**
- Validasi dilakukan di client (zod schema) DAN server (API route)
- Password tidak pernah dikirim plain text (https wajib)
- Role tersimpan di database dan tidak bisa diubah dari UI user
- Setelah submit sukses → redirect ke halaman "Cek Email Anda"

**Cara achieve:**
- `react-hook-form` + `zod` untuk validasi form
- API route `/api/auth/register` (Next.js route handler)
- `bcrypt` atau `argon2` untuk hash password
- `Resend` untuk kirim email verifikasi
- Token verifikasi simpan di tabel `VerificationToken` dengan expiry 24 jam

---

#### 2.2 Halaman Login — `/login`

**Yang harus ada:**

| Elemen | Ketentuan Wajib |
|---|---|
| Field: Email | Required |
| Field: Password | Required, ada toggle show/hide |
| Checkbox: Ingat saya | Extend session ke 30 hari |
| Tombol Submit | Loading state saat proses |
| Link: Lupa Password | → /forgot-password |
| Link: Daftar | "Belum punya akun?" |
| Error state | Toast atau alert: "Email atau password salah" |

**Ketentuan teknis:**
- Rate limiting: 5x gagal → lockout 15 menit (simpan di Redis atau database)
- Redirect setelah login sesuai role + status onboarding (lihat USER-FLOW 1.2)
- `callbackUrl` support untuk redirect ke halaman yang dituju sebelum login

**Cara achieve:**
- NextAuth.js v5 Credentials Provider
- `middleware.ts` untuk proteksi route berdasarkan session
- Rate limiting dengan `upstash/ratelimit` atau counter di database
- Session strategy: JWT dengan `maxAge` dinamis berdasarkan "Ingat saya"

---

#### 2.3 Halaman Lupa Password — `/forgot-password`

**Yang harus ada:**
- Field email
- Tombol kirim link reset
- State sukses: "Link reset telah dikirim ke email Anda"
- Link kembali ke login

**Cara achieve:**
- Generate token reset (crypto.randomBytes), simpan di database dengan expiry 1 jam
- Kirim email via Resend dengan link `/reset-password?token=xxx`
- Halaman `/reset-password` untuk input password baru

---

### 3. ONBOARDING PAGES

#### 3.1 Onboarding UMKM — `/onboarding/umkm`

**Untuk apa:**
Form multi-step yang WAJIB diselesaikan UMKM sebelum akses dashboard penuh. Data ini menjadi baseline untuk assessment konsultan.

**Yang harus ada:**

| Step | Field Wajib |
|---|---|
| Step 1: Identitas | Nama bisnis, sektor (dropdown), deskripsi, kota/kab, tahun berdiri, jumlah karyawan |
| Step 2: Finansial | Estimasi omzet/bulan, estimasi HPP/bulan, biaya operasional/bulan, jumlah outlet |
| Step 3: Target | Range target pendanaan, rencana penggunaan dana, kendala utama (multi-select) |

**Elemen UI yang harus ada:**
- Progress indicator step (Step 1 of 3)
- Tombol "Lanjut" dan "Kembali" antar step
- Auto-save per step (user bisa tutup browser dan lanjut besok)
- Summary review sebelum submit final
- Loading state saat submit

**Ketentuan teknis:**
- Data tiap step tersimpan ke `localStorage` sebagai draft (fallback jika belum submit)
- Submit final kirim semua data ke server sekaligus
- Flag `onboardingCompleted: true` di tabel User setelah submit
- Redirect ke halaman tunggu assignment konsultan

**Cara achieve:**
- State management multi-step dengan `zustand` atau `useReducer`
- Auto-save step ke server via API PATCH tiap klik "Lanjut"
- Sektor usaha dari enum/lookup table di database (bisa ditambah Admin)

---

#### 3.2 Onboarding Investor — `/onboarding/investor`

**Yang harus ada:**
- Nama / nama firma investasi
- Tipe investor (dropdown)
- Sektor yang diminati (multi-select checkbox)
- Range tiket investasi
- Deskripsi kriteria investasi (textarea)
- Upload dokumen identitas (untuk verifikasi admin)

**Ketentuan teknis:**
- Setelah submit → status `PENDING_VERIFICATION`
- Admin review dan approve sebelum investor bisa akses marketplace
- Investor yang belum verified redirect ke halaman waiting screen

---

### 4. DASHBOARD UMKM

#### 4.1 Overview — `/dashboard/umkm`

**Untuk apa:**
Pusat kendali UMKM. Satu halaman yang memberi gambaran lengkap kondisi bisnis dan aksi yang perlu dilakukan.

**Yang harus ada:**

| Komponen | Ketentuan Wajib |
|---|---|
| Header card | Nama bisnis + Status badge (warna dinamis: abu = onboarding, kuning = in progress, hijau = ready) |
| Card: Konsultan | Nama konsultan, foto, tombol "Lihat Profil" |
| Card: Skor Assessment | Angka skor terbaru + mini radar chart + tanggal assessment |
| Card: Action Plan | % progress keseluruhan + jumlah task outstanding |
| Card: Reminder input | Tampil jika tanggal 25–30 bulan berjalan dan belum ada input bulan ini |
| Card: Notifikasi terbaru | 3 notifikasi terakhir |
| Quick action buttons | Shortcut ke assessment, action plan, input progress |

**Ketentuan teknis:**
- Data di-fetch server-side (SSR) untuk LCP yang cepat
- Card reminder input muncul conditional berdasarkan tanggal + status input bulan ini
- Empty state yang informatif jika konsultan belum ditugaskan

**Cara achieve:**
- Next.js Server Component untuk fetch data di server
- `date-fns` untuk kalkulasi kondisi reminder
- `recharts` untuk mini radar chart (ukuran kecil, responsive)
- Suspense boundary per card untuk loading state yang granular

---

#### 4.2 Assessment — `/dashboard/umkm/assessment`

**Yang harus ada:**

| Elemen | Ketentuan |
|---|---|
| Radar Chart full size | 5 dimensi, label per aspek, skor tampil di tooltip |
| Skor per aspek | List dengan progress bar 0–100 per aspek |
| Skor komposit | Angka besar di atas chart |
| Catatan konsultan | Per aspek, collapsible |
| Tab riwayat | Daftar assessment sebelumnya, bisa bandingkan |
| Empty state | Jika belum ada assessment |

**Cara achieve:**
- `recharts` RadarChart component
- Data assessment di-fetch dari `/api/umkm/assessment`
- Tab "Riwayat" menampilkan list assessment dengan tanggal, bisa klik untuk lihat detail
- Perbandingan dua assessment side-by-side menggunakan dual RadarChart

---

#### 4.3 Action Plan — `/dashboard/umkm/action-plan`

**Yang harus ada:**

| Elemen | Ketentuan |
|---|---|
| Overall progress bar | % task DONE dari total task |
| List milestone | Accordion / collapsible per milestone |
| List task per milestone | Status badge (TODO/IN_PROGRESS/DONE), due date, judul |
| Interaksi task | Klik status → update (dropdown atau toggle) |
| Catatan task | Textarea tambah catatan/komentar per task |
| Due date warning | Task yang lewat due date tampil merah |
| Empty state | Jika belum ada action plan |

**Cara achieve:**
- Optimistic update saat ganti status task (UI update duluan, server confirm)
- `useMutation` dari React Query untuk update status
- WebSocket atau polling 30 detik untuk sinkronisasi jika konsultan edit action plan
- `date-fns` untuk kalkulasi overdue

---

#### 4.4 Progress Bulanan — `/dashboard/umkm/progress`

**Halaman index (riwayat):**

| Elemen | Ketentuan |
|---|---|
| Grafik tren | Line chart: omzet, HPP, margin per bulan (Recharts) |
| Grafik % HPP | Area chart % HPP over time |
| Tabel riwayat | Per baris: bulan, omzet, HPP, margin, status validasi, aksi |
| Status per bulan | Badge: Menunggu / Tervalidasi / Perlu Revisi |
| Tombol input | CTA input bulan berjalan (conditional: hanya tampil tanggal 25–30) |

**Halaman form input — `/dashboard/umkm/progress/input`:**

| Field | Ketentuan |
|---|---|
| Bulan & tahun | Auto-fill bulan berjalan, tidak bisa ubah |
| Total omzet (Rp) | Number input, non-negatif, wajib |
| Total HPP (Rp) | Number input, non-negatif, wajib |
| Biaya operasional (Rp) | Number input, non-negatif, wajib |
| Kas bersih akhir bulan (Rp) | Number input, wajib |
| Upload dokumen | Min 1 file, format PDF/JPG/PNG, max 10MB per file |
| Catatan tambahan | Textarea, opsional |
| Preview kalkulasi | Tampil live: % HPP, gross margin, net margin saat user mengisi angka |

**Ketentuan teknis:**
- Kalkulasi % dan margin dilakukan di client untuk preview, tapi DIVERIFIKASI ulang di server saat submit
- AI tidak boleh menghitung angka — hanya JavaScript murni
- Cek anomali HPP di server: bandingkan dengan bulan sebelumnya, jika naik >10% trigger alert ke konsultan
- Upload file via UploadThing, simpan URL di database

**Cara achieve:**
- `UploadThing` untuk file upload dengan signed URL
- Server Action atau API route untuk submit + kalkulasi server-side
- Deteksi anomali di server: query progress bulan lalu, hitung selisih %, trigger alert jika >10%
- Alert tersimpan di tabel `AnomalyAlert` dan di-push ke konsultan via in-app notification

---

#### 4.5 Investor Requests — `/dashboard/umkm/investor-requests`

**Yang harus ada:**

| Elemen | Ketentuan |
|---|---|
| Tab filter | Semua / Menunggu / Disetujui / Ditolak |
| Card per request | Nama investor (publik), pesan, tiket investasi, tanggal, status |
| Tombol Approve | Hanya ada di status "Menunggu" |
| Tombol Reject | Hanya ada di status "Menunggu" |
| Tombol Revoke | Hanya ada di status "Disetujui" (cabut akses) |
| Modal konfirmasi | Setiap aksi Approve/Reject/Revoke butuh konfirmasi |
| Empty state | "Belum ada permintaan akses dari investor" |

**Ketentuan teknis:**
- Approve/Reject/Revoke selalu butuh konfirmasi modal (tidak bisa undo accidental)
- Setiap Approve tercatat di `InvestorAccessLog` dengan timestamp
- Notifikasi real-time ke investor saat status berubah

---

### 5. DASHBOARD CONSULTANT

#### 5.1 Multi-Client Overview — `/dashboard/consultant`

**Yang harus ada:**

| Elemen | Ketentuan |
|---|---|
| Header stats | Jumlah total klien / klien aktif / perlu perhatian / sudah ready |
| AI Anomaly Alert feed | Slide-in card di atas tabel jika ada alert baru. Ada tombol dismiss per alert |
| Tabel klien | Kolom: Nama Bisnis, Sektor, Kota, Skor, Status, Last Update, Aksi |
| Filter tabel | Semua / Perlu Perhatian (skor rendah / alert) / Ready for Funding |
| Sort tabel | Skor terendah, update terlama, nama A-Z |
| Search | Cari nama bisnis klien |
| Tombol aksi per row | "Lihat Detail", "Input Assessment" |

**Cara achieve:**
- Tabel menggunakan `@tanstack/react-table` untuk filter, sort, search
- Anomaly Alert di-fetch dari `AnomalyAlert` table, filter `dismissed: false`
- Dismiss alert update `dismissed: true` via PATCH API
- Alert card animasi slide-in: Framer Motion `AnimatePresence`

---

#### 5.2 Detail Klien — `/dashboard/consultant/client/[id]`

**Yang harus ada:**

| Seksi | Elemen |
|---|---|
| Header | Nama bisnis, sektor, kota, status badge, nama konsultan (self) |
| AI Executive Summary | Card ringkasan kondisi klien dari AI (P1 feature) |
| Assessment terbaru | Radar chart + skor + tombol "Buat Assessment Baru" |
| Action Plan status | % progress + jumlah task outstanding + tombol "Edit Action Plan" |
| Progress tren | Mini line chart 6 bulan terakhir (omzet, % HPP) |
| Progress pending | Alert jika ada progress yang belum divalidasi |
| Dokumen | List file yang diupload UMKM + tombol download |
| Tombol Certify | "Certify Ready for Funding" — hanya tampil jika UMKM belum ready |

---

#### 5.3 Form Assessment — `/dashboard/consultant/client/[id]/assessment/new`

**Yang harus ada:**

| Elemen | Ketentuan |
|---|---|
| 5 section aspek | Masing-masing: slider/input skor 0–100, textarea catatan, textarea rekomendasi |
| Preview radar chart | Update real-time saat skor diubah (sebelum submit) |
| Kalkulasi skor | Tampil skor komposit live dengan formula berbobot |
| Tombol Save Draft | Simpan tanpa publish ke UMKM |
| Tombol Publish | Submit final, UMKM langsung dapat notifikasi |
| Riwayat assessment | Sidebar atau tab dengan assessment sebelumnya untuk referensi |

**Cara achieve:**
- `useWatch` dari react-hook-form untuk preview radar chart real-time
- Draft tersimpan di database dengan `status: DRAFT`
- Publish update status ke `PUBLISHED` + trigger notifikasi ke UMKM

---

### 6. MARKETPLACE

#### 6.1 Katalog — `/marketplace`

**Yang harus ada:**

| Elemen | Ketentuan |
|---|---|
| Search bar | Cari nama bisnis atau sektor |
| Filter panel | Sektor (multi-select), Kota (dropdown), Range target dana (range slider), Min gross margin % |
| Sort | Terbaru, Skor tertinggi, Target dana terkecil |
| Grid card UMKM | Nama bisnis, sektor, kota, skor kesehatan %, gross margin %, badge "Ready", bulan data tervalidasi |
| Pagination | Atau infinite scroll |
| Empty state | "Tidak ada bisnis yang sesuai filter" |

**Ketentuan teknis:**
- Angka Rp TIDAK PERNAH tampil di katalog
- Hanya UMKM dengan `fundingStatus: READY` yang tampil
- Investor yang belum verified → redirect ke halaman "Akun sedang diverifikasi"
- Filter state tersimpan di URL params (sharable link)

**Cara achieve:**
- URL search params untuk filter state: `/marketplace?sektor=kuliner&kota=samarinda`
- Server Component fetch data dengan filter dari URL params
- `nuqs` library untuk sync URL params dengan state

---

#### 6.2 Profil Publik UMKM — `/marketplace/[umkm-id]`

**Yang harus ada:**

| Seksi | Elemen |
|---|---|
| Header | Nama bisnis, sektor, kota, tahun berdiri, badge "Ready for Funding" |
| Business Journey | Line chart tren % HPP dan gross margin dari awal bergabung |
| Assessment | Radar chart terbaru + skor per aspek (tanpa catatan detail konsultan) |
| Tentang bisnis | Deskripsi, jumlah karyawan, jumlah outlet |
| Verifikasi | Badge nama konsultan yang mensertifikasi + tanggal sertifikasi |
| CTA | Tombol "Ajukan Permintaan Akses Data" |

**Ketentuan teknis:**
- Halaman ini bisa dibuka oleh investor yang sudah verified SAJA
- Nomor Rp riil tidak pernah tampil di halaman publik
- Catatan konsultan yang tampil hanya versi ringkas/summary, bukan full detail

---

#### 6.3 Data Room — `/marketplace/[umkm-id]/data-room`

**Yang harus ada:**

| Elemen | Ketentuan |
|---|---|
| Akses gate | Cek di server: apakah investor ini punya `InvestorAccessRequest` dengan status `APPROVED` untuk UMKM ini? |
| Daftar dokumen | Laporan P&L, rekening koran, dokumen legalitas |
| Preview dokumen | PDF viewer inline (jika memungkinkan) |
| Tombol download | Signed URL dengan expiry 1 jam |
| Data finansial detail | Tabel history progress dengan angka Rp riil |
| Catatan konsultan | Versi lengkap |
| Audit info | Tampil di footer: "Dokumen ini diakses atas nama [nama investor]" — watermark psikologis |
| Audit log | Setiap klik download tercatat di `DataRoomAccessLog` |

**Cara achieve:**
- Server-side authorization check di setiap request ke halaman ini
- Signed URL dari UploadThing dengan TTL 1 jam (bukan URL permanen)
- Audit log: `INSERT INTO DataRoomAccessLog` setiap download event
- Watermark PDF: bisa dilakukan saat generate PDF via puppeteer (P2 feature) atau tampil sebagai overlay UI

---

### 7. SETTINGS PAGES

#### 7.1 Settings UMKM — `/dashboard/umkm/settings`

**Yang harus ada:**

| Tab | Elemen |
|---|---|
| Akun | Ubah nama, ubah email (butuh verifikasi ulang), ubah password |
| Notifikasi | Toggle: email notifikasi on/off per jenis notifikasi |
| Tampilan | Toggle Dark/Light mode, pilih bahasa (Indonesia) |
| Privasi | Lihat daftar investor yang punya akses data room + tombol cabut akses |
| Bahaya | Tombol "Nonaktifkan Akun" (butuh konfirmasi + alasan) |

---

#### 7.2 Settings Consultant — `/dashboard/consultant/settings`

**Yang harus ada:**
- Ubah profil (nama, foto, bio singkat)
- Ubah password
- Preferensi notifikasi (alert jenis apa yang ingin diterima)
- Tampilan (Dark/Light mode)

---

#### 7.3 Settings Investor — `/dashboard/investor/settings`

**Yang harus ada:**
- Ubah profil investor (nama, tipe, kriteria)
- Ubah password
- Kelola watchlist UMKM
- Preferensi notifikasi
- Tampilan (Dark/Light mode)

---

### 8. KOMPONEN GLOBAL (HARUS ADA DI SELURUH PLATFORM)

| Komponen | Ketentuan Wajib |
|---|---|
| **Navbar Dashboard** | Logo, nama user, role badge, notifikasi bell (count badge), avatar dropdown (profil, settings, logout) |
| **Notifikasi Dropdown** | List 5 notifikasi terbaru, tandai sudah dibaca, "Lihat semua" |
| **Toast / Snackbar** | Feedback aksi sukses/gagal (pakai shadcn/ui Sonner) |
| **Loading Skeleton** | Setiap card dan tabel punya skeleton saat loading (tidak boleh blank) |
| **Empty State** | Setiap list/tabel punya empty state yang informatif + CTA relevan |
| **Error Boundary** | Tampil friendly error page jika komponen crash |
| **Confirmation Modal** | Setiap aksi destruktif (delete, reject, revoke) butuh modal konfirmasi |
| **Dark/Light Toggle** | Persisten di localStorage, default ikut system preference |
| **Mobile Sidebar** | Drawer navigation untuk layar < 768px |

---

### 9. SISTEM NOTIFIKASI IN-APP

**Arsitektur:**

```
[Event terjadi di server]
      │
      ▼
[INSERT ke tabel Notification]
  - userId (penerima)
  - type (ASSESSMENT_READY | ACTION_PLAN | PROGRESS_VALIDATED | dll)
  - message
  - link (deep link ke halaman relevan)
  - read: false
  - createdAt
      │
      ▼
[Client polling setiap 30 detik]
  atau
[Server-Sent Events (SSE) untuk real-time]
      │
      ▼
[Bell icon update count badge]
[Dropdown tampil notifikasi baru]
```

**Cara achieve:**
- Tabel `Notification` di database dengan index pada `userId` + `read`
- API GET `/api/notifications?unread=true` untuk count badge
- Polling dengan React Query `refetchInterval: 30000`
- Mark as read via PATCH `/api/notifications/[id]/read`

---

### 10. AI ANOMALY ALERT — ARSITEKTUR

**Cara kerja:**

```
[UMKM submit progress bulanan]
      │
      ▼
[Server kalkulasi % HPP bulan ini vs bulan lalu]
      │
      ├─── % HPP naik ≤ 10% → Normal, tidak ada alert
      │
      └─── % HPP naik > 10%
                │
                ▼
         [Kirim ke Claude API]
           Prompt: "HPP bulan ini [X]%, bulan lalu [Y]%.
                    Naik [Z]%. Bisnis: [sektor].
                    Buat analisis singkat kemungkinan penyebab
                    dan rekomendasi tindakan untuk konsultan.
                    Max 3 bullet point."
                │
                ▼
         [Simpan response ke tabel AnomalyAlert]
           - umkmId
           - consultantId
           - bulan
           - deltaHPP (%)
           - aiAnalysis (string)
           - dismissed: false
           - createdAt
                │
                ▼
         [Konsultan dapat notifikasi in-app]
         [Alert muncul sebagai slide-in card di dashboard konsultan]
```

**Ketentuan teknis:**
- Claude API hanya dipakai untuk teks analisis, BUKAN kalkulasi angka
- Kalkulasi % HPP dan delta selalu dilakukan via JavaScript di server
- Jika Claude API gagal/timeout → alert tetap dibuat tapi tanpa AI analysis text
- Konsultan bisa dismiss alert (update `dismissed: true`)

---

### 11. ROUTE PROTECTION & ROLE-BASED ACCESS

```
middleware.ts mengecek:
│
├── Tidak ada session → redirect ke /login
│
├── Session ada, cek role:
│   ├── UMKM → hanya bisa akses /dashboard/umkm/* dan /marketplace (read-only)
│   ├── CONSULTANT → hanya bisa akses /dashboard/consultant/*
│   ├── INVESTOR → hanya bisa akses /dashboard/investor/* dan /marketplace/*
│   └── ADMIN → akses ke /admin/*
│
├── UMKM belum onboarding → redirect ke /onboarding/umkm
├── INVESTOR belum verified → redirect ke waiting screen
│
└── Akses cross-role → 403 Forbidden page
```

**Cara achieve:**
- `middleware.ts` di root Next.js dengan `auth()` dari NextAuth v5
- Cek role dari JWT session token
- Protected route pattern: cek di middleware + double-check di server component
- API routes juga harus cek role (jangan hanya andalkan middleware)

---

### 12. KEBUTUHAN TEKNIS PENDUKUNG

| Kebutuhan | Tool / Library | Alasan |
|---|---|---|
| Authentication | NextAuth.js v5 | Multi-role, JWT session, email verification |
| Database ORM | Prisma | Type-safe queries, migration management |
| Database | PostgreSQL (Supabase / Neon) | Relational, cocok untuk struktur data Beruang |
| File Upload | UploadThing | Signed URL, easy Next.js integration |
| Email | Resend | Transactional email, React Email template |
| UI Components | shadcn/ui + Tailwind CSS | Accessible, customizable, B2B look |
| Charts | Recharts | Radar, Line, Area chart support |
| Form | react-hook-form + zod | Validasi robust, TypeScript support |
| Data Fetching | TanStack Query (React Query) | Caching, background refetch, optimistic update |
| Animation | Framer Motion | Anomaly alert slide-in, page transition |
| Table | TanStack Table | Filter, sort, pagination untuk multi-client |
| URL State | nuqs | Sync filter marketplace ke URL params |
| AI | Claude API (claude-sonnet) | Anomaly analysis text, draft assessment (P1) |
| Rate Limiting | Upstash Redis | Login rate limit |
| Deployment | Vercel | Next.js optimal, edge functions |

---

*WEB-FLOW.md — Beruang Platform. Versi 1.0*
