<!--
FILE INI UNTUK APA:
File README.md ini adalah pintu masuk utama (onboarding hub) bagi developer, reviewer, 
dan juri untuk memahami, menginstal, menjalankan, dan berkontribusi pada proyek frontend 
web B2B Beruang. Berisi panduan setup cepat, struktur direktori, dan tautan ke dokumentasi lengkap.
-->

# [NAMA_PROYEK] — Platform Pengembangan Bisnis & Pendanaan Terverifikasi UMKM

> Platform Web B2B yang menghubungkan Pelaku UMKM Indonesia dengan Business Consultant profesional untuk membenahi fundamental usaha dan mencapai status kelayakan pendanaan (*Funding Readiness*) sebelum terhubung ke jaringan Investor kredibel.

---

## 1. [WAJIB] Tech Stack

- **Framework**: React 19 (SPA Architecture)
- **Build Tool**: Vite 6
- **Language**: TypeScript 5.7 (Strict Mode)
- **Styling**: Tailwind CSS v4 + Base UI (shadcn-compatible)
- **Design Philosophy**: Tactile Neo-Minimalism (Bento Cards, Floating Capsule Dock)
- **Icons & Visuals**: Lucide React + Recharts (Radar 5-Dimensi & Arus Kas) + Framer Motion

---

## 2. [WAJIB] Prerequisites

Sebelum memulai, pastikan perangkat Anda telah terpasang:
- **Node.js**: versi `^20.0.0` atau `^22.0.0` (LTS direkomendasikan)
- **Package Manager**: `npm` (versi `^10.0.0`) atau `pnpm`
- **Git**: versi `^2.30.0`

---

## 3. [WAJIB] Cara Install & Run (Development)

Ikuti langkah-langkah berikut untuk menjalankan aplikasi di komputer lokal Anda:

1. **Clone Repositori**:
   ```bash
   git clone [REPO_URL]
   cd [FOLDER_PROYEK]
   ```

2. **Instal Dependensi**:
   ```bash
   npm install
   ```

3. **Siapkan Environment Variables**:
   ```bash
   cp .env.example .env
   ```

4. **Jalankan Development Server**:
   ```bash
   npm run dev
   ```
   Buka browser di alamat: `http://localhost:5173`

---

## 4. [WAJIB] Cara Build untuk Production

Untuk mengompilasi aplikasi ke format statis (*production bundle*):

```bash
npm run build
```
Hasil build akan tersimpan di direktori `dist/` dan siap di-deploy ke platform seperti Vercel, Cloudflare Pages, atau AWS S3/CloudFront.

Untuk meninjau hasil build secara lokal:
```bash
npm run preview
```

---

## 5. [WAJIB] Struktur Direktori Proyek

```text
├── .agent/              # Konfigurasi & instruksi operasional AI Agent Antigravity
│   └── AGENT.md
├── docs/                # Dokumentasi spesifikasi lengkap produk & arsitektur
│   ├── PRD.md           # Product Requirements Document
│   ├── DESIGN.md        # Spesifikasi Design System & Token
│   ├── CONTEXT.md       # Konteks Bisnis, Glosarium & Persona
│   ├── ARCHITECTURE.md  # Arsitektur Frontend & State Management
│   └── FLOW.md          # Workflow Tim, Branching & Konvensi
├── skills/              # Panduan teknis task-specific untuk tim engineer
│   ├── create-component.md
│   ├── create-page.md
│   ├── styling.md
│   ├── api-integration.md
│   └── testing.md
├── src/
│   ├── components/      # UI primitives, charts, dan flow onboarding
│   ├── context/         # AuthContext & AppContext global state
│   ├── hooks/           # Custom React hooks reusable
│   ├── lib/             # Utility functions (cn, formatters)
│   ├── services/        # Service layer API HTTP client & mock data
│   ├── types/           # TypeScript domain types & interfaces
│   └── views/           # Halaman Auth & RoleDashboard (UMKM, Konsultan, Investor)
├── .env.example         # Template environment variables
├── .gitignore           # Konfigurasi filter Git
└── README.md            # Dokumentasi onboarding (file ini)
```

---

## 6. [WAJIB] Navigasi Dokumentasi Lengkap (`/docs/`)

Pelajari dokumentasi mendalam pada tautan berikut:
- 📋 [Product Requirements Document (docs/PRD.md)](file:///f:/Percobaan%20Lomba/INSEVENT%20FULLSTACK/App/docs/PRD.md)
- 🎨 [Design System & Tokens (docs/DESIGN.md)](file:///f:/Percobaan%20Lomba/INSEVENT%20FULLSTACK/App/docs/DESIGN.md)
- 🏢 [Konteks Domain & Glosarium (docs/CONTEXT.md)](file:///f:/Percobaan%20Lomba/INSEVENT%20FULLSTACK/App/docs/CONTEXT.md)
- 🏗️ [Arsitektur Teknis Frontend (docs/ARCHITECTURE.md)](file:///f:/Percobaan%20Lomba/INSEVENT%20FULLSTACK/App/docs/ARCHITECTURE.md)
- 🔄 [Alur Kerja Tim & Git (docs/FLOW.md)](file:///f:/Percobaan%20Lomba/INSEVENT%20FULLSTACK/App/docs/FLOW.md)

---

## 7. [WAJIB] Tim Kontributor

- **[PENGEMBANG_1_NAMA]** — `[PENGEMBANG_1_ROLE]` *(Contoh: Frontend Lead Engineer)*
- **[PENGEMBANG_2_NAMA]** — `[PENGEMBANG_2_ROLE]` *(Contoh: Product Designer / Fullstack)*
- **[PENGEMBANG_3_NAMA]** — `[PENGEMBANG_3_ROLE]` *(Contoh: Business & QA Specialist)*

---

## Cara Mengisi

Panduan pengisian nilai placeholder pada dokumen README ini:

1. **`[NAMA_PROYEK]`**:
   - *Nilai yang diisi*: Nama resmi produk.
   - *Contoh*: `Beruang (Ber-Uang)`.

2. **`[REPO_URL]` & `[FOLDER_PROYEK]`**:
   - *Nilai yang diisi*: URL git repository GitHub/GitLab dan nama folder lokal.
   - *Contoh*: `git clone https://github.com/insevent/beruang-frontend.git` -> `cd beruang-frontend`.

3. **`[PENGEMBANG_X_NAMA]` & `[PENGEMBANG_X_ROLE]`**:
   - *Nilai yang diisi*: Nama anggota tim pengembang dan perannya.
   - *Contoh*: `Muhammad Raihan — Lead Frontend Engineer`.
