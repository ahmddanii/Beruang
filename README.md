# Beruang (Ber-Uang) — Platform Pengembangan Bisnis & Pendanaan Terverifikasi UMKM

> Platform Web B2B yang menghubungkan Pelaku UMKM Indonesia dengan Business Consultant profesional untuk membenahi 5 aspek fundamental usaha dan mencapai sertifikasi **"Ready for Funding"** sebelum terhubung ke jaringan Investor terpercaya.

---

## 1. Tech Stack & Arsitektur

- **Framework**: **Vue 3 (Composition API)** + **Nuxt 3** (Mode Hybrid: SSR untuk Landing Page & SEO, CSR/SPA untuk Dashboard)
- **Styling**: **Tailwind CSS** dengan Token Kustom (Base Beruang Blue `#0356FD`, Gold `#FED440`, Chunky Tactile Shadows)
- **Desain**: **Duolingo-Inspired Tactile Neo-Minimalism** (Chunky tactile press buttons, rounded shapes 12–24px, lively progress, maskot **Si Beru**, micro-celebrations)
- **State Management**: **Pinia** (Multi-role session & reactive mock store)
- **Visuals & Charts**: Native SVG Interactive Radar Chart (5 Aspek Fundamental) & SVG Line/Area Trend Chart (Omzet vs HPP)
- **Maskot Orisinal**: **Si Beru** (Pemandu ramah UMKM di onboarding, empty states, dan momen selebrasi kelulusan)
- **Icons**: Lucide Icons
- **Efek Selebrasi**: `canvas-confetti` saat status Ready for Funding tercapai

---

## 2. Struktur Peran & Alur Pengguna

1. **UMKM**:
   - Onboarding 4 langkah (Identitas, Sektor, Baseline Finansial, Konfirmasi).
   - Beranda Saya dengan Roadmap Path bergaya Duolingo dan skor kesehatan bisnis.
   - Hasil Penilaian Radar 5 Aspek Fundamental (Finansial, Ops, Pasar, Legal, Tim).
   - Rencana Aksi (Action Plan) dengan checklist tactile bouncy.
   - Pelaporan Finansial Bulanan (Omzet, HPP, OPEX, Kas + Bukti Rekening Koran).
   - Sertifikasi "Ready for Funding" Gate.
   - Manajemen Permintaan Akses Data Room Investor (Approve / Reject).
2. **Business Consultant**:
   - Matriks Klien Binaan dengan indikator warna status kesehatan.
   - Detail Klien & Manajemen Rencana Aksi.
   - Form Audit Skor 5 Aspek dengan pratinjau live radar chart real-time.
   - Antrian Validasi Laporan Keuangan Bulanan Klien.
   - AI Anomaly Alert Feed (Deteksi lonjakan HPP >10% & margin drop).
   - Penerbitan Sertifikat Resmi Ready for Funding.
3. **Investor**:
   - Katalog Marketplace UMKM Terkurasi (100% mematuhi aturan privasi — tidak ada bocoran rupiah riil ke publik, hanya rasio persentase!).
   - Halaman Pitching & Opini Objektif Konsultan.
   - Pengajuan Akses Data Privat & Rencana Tiket Investasi.
   - Watermarked Data Room (P&L lengkap, rekening koran terenkripsi, dynamic security watermark nama/email investor, dan audit log).
   - Simpanan Bisnis Favorit (Watchlist).
4. **Mode Simulasi Peran (Role Switcher Toolbar)**:
   - Tersemat di bagian atas aplikasi untuk memudahkan pengujian instan antar 3 peran tanpa perlu login berulang kali.

---

## 3. Cara Install & Menjalankan (Development)

1. **Instal Dependensi**:
   ```bash
   npm install
   ```

2. **Jalankan Development Server**:
   ```bash
   npm run dev
   ```
   Buka browser di alamat: `http://localhost:3000`

3. **Preview Design System & Komponen**:
   Kunjungi rute khusus: `http://localhost:3000/dev/components`

4. **Build untuk Produksi**:
   ```bash
   npm run build
   npm run preview
   ```

---

## 4. Struktur Direktori

```
├── .agents/                 # Panduan AI Agent, Skills & Design Rules
├── assets/css/main.css      # Design tokens, CSS variables, chunky button utilities
├── components/
│   ├── base/                # Internal Component Library (BButton, BCard, BRadarChart, dll)
│   ├── layout/              # AppNavbar, AppFooter, DashboardSidebar, RoleSwitcher
│   └── mascot/              # SiBeru original vector mascot
├── layouts/                 # default.vue, auth.vue, dashboard.vue
├── pages/
│   ├── index.vue            # Beranda Publik (Hero, Path Duolingo, Mockup Radar)
│   ├── untuk-umkm.vue       # Edukasi & Value Prop UMKM
│   ├── untuk-investor.vue   # Value Prop Investor & Keamanan Data Room
│   ├── untuk-konsultan.vue  # Benefit & Rekrutmen Konsultan
│   ├── tentang.vue          # Cerita & Misi Beruang
│   ├── faq.vue              # Bantuan Accordion per Peran
│   ├── kontak.vue           # Kontak & Bantuan WhatsApp
│   ├── masuk.vue            # Login Multi-Role
│   ├── daftar.vue           # Register & Pilih Peran
│   ├── onboarding.vue       # Wizard 4 Langkah Onboarding UMKM
│   ├── dev/components.vue   # Showcase Seluruh Komponen Dasar
│   ├── dashboard/           # Area Dashboard UMKM
│   ├── konsultan/           # Area Dashboard Konsultan
│   ├── investor/            # Area Marketplace & Data Room Investor
│   └── admin/               # Area Dashboard Admin Platform
├── stores/                  # Pinia Stores (auth, umkm, konsultan, investor)
├── nuxt.config.ts           # Konfigurasi Nuxt 3 & Hybrid RouteRules
└── tailwind.config.ts       # Tailwind CSS Tokens & Chunky Shadows
```
